param([ValidateSet('SelfTest','Live','Structure')][string]$Mode = 'SelfTest')

$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
$root = Split-Path $PSScriptRoot -Parent
$script:sensitive = [Collections.Generic.List[string]]::new()
$script:expectedAccountHash = 'b604f98b11585d0fcdbcf26b85d79d5160329ec21154b3b465db5ca9df81af04'

function Test-ExpectedAccount([string]$accountId) {
 if($accountId -notmatch '^[a-fA-F0-9]{32}$'){return $false}
 $digest=[Convert]::ToHexString([Security.Cryptography.SHA256]::HashData([Text.Encoding]::UTF8.GetBytes($accountId.ToLowerInvariant()))).ToLowerInvariant()
 return $digest -ceq $script:expectedAccountHash
}

function Get-MatchingValues($value,[string]$pattern) {
 $result=[Collections.Generic.List[string]]::new()
 if($value -is [Collections.IDictionary]) {
  foreach($key in $value.Keys) {
   if($key -match $pattern -and $value[$key] -is [string]){$result.Add($value[$key])}
   foreach($found in @(Get-MatchingValues $value[$key] $pattern)){$result.Add($found)}
  }
 } elseif($value -is [array]) {
  foreach($item in $value){foreach($found in @(Get-MatchingValues $item $pattern)){$result.Add($found)}}
 }
 return $result.ToArray()
}

function Test-AuthIdentity($data,[string]$expected) {
 $ids=@(Get-MatchingValues $data '(?i)^(account_?id|epic_?account_?id)$' | Sort-Object -Unique)
 return (Test-ExpectedAccount $expected) -and $ids.Count -eq 1 -and $ids[0] -ceq $expected
}

function Add-AuthSecrets($data) {
 foreach($value in @(Get-MatchingValues $data '(?i)^(access_?token|refresh_?token|device_?id|secret)$')) {
  if($value.Length -ge 4){$script:sensitive.Add($value)}
 }
}

function Assert-Safe([string]$value) {
 foreach($secret in $script:sensitive){if($secret.Length -ge 4 -and $value.Contains($secret)){throw 'Sensitive output suppressed'}}
}

function Get-SafeTimestamp($value) {
 if($value -is [DateTimeOffset]){return $value.ToUniversalTime().ToString('o')}
 if($value -is [DateTime]){return $value.ToUniversalTime().ToString('o')}
 if($value -isnot [string] -or $value.Length -gt 40 -or $value -notmatch '^20[0-9]{2}-[0-9]{2}-[0-9]{2}T'){return $null}
 $parsed=[DateTimeOffset]::MinValue
 if(-not [DateTimeOffset]::TryParse($value,[ref]$parsed)){return $null}
 return $parsed.ToUniversalTime().ToString('o')
}

function Get-FullProfile($data,[string]$profileId,[string]$accountId) {
 if($data -isnot [Collections.IDictionary] -or $data.profileChanges -isnot [array]){return $null}
 $profiles=@($data.profileChanges | Where-Object {$_ -is [Collections.IDictionary] -and $_.profile -is [Collections.IDictionary]} | ForEach-Object {$_.profile})
 if($profiles.Count -ne 1){return $null}
 $profile=$profiles[0]
 if($profile.profileId -cne $profileId -or $profile.accountId -cne $accountId){return $null}
 return $profile
}

function Get-Count($value) {
 if($value -is [array] -or $value -is [Collections.IDictionary]){return $value.Count}
 return $null
}

function Get-AthenaSummary($profile) {
 $items=$profile.items
 if($items -isnot [Collections.IDictionary]){return [ordered]@{shape='missing_items'}}
 $counts=[ordered]@{}
 $questStates=[ordered]@{active=0;claimed=0;other=0}
 $questCounterRecords=0;$questExpiryRecords=0;$variantRecords=0
 $seasonRecords=[Collections.Generic.List[object]]::new()
 foreach($item in $items.Values) {
  if($item -isnot [Collections.IDictionary] -or $item.templateId -isnot [string]){continue}
  $category=($item.templateId -split ':',2)[0]
  if($category -notmatch '^[A-Za-z]{1,40}$'){continue}
  if(-not $counts.Contains($category)){$counts[$category]=0}
  $counts[$category]++
  $attributes=$item.attributes
  if($attributes -isnot [Collections.IDictionary]){continue}
  if($category -eq 'Quest') {
   if($attributes.quest_state -ceq 'Active'){$questStates.active++}
   elseif($attributes.quest_state -ceq 'Claimed'){$questStates.claimed++}
   else{$questStates.other++}
   if(@($attributes.Keys | Where-Object {$_ -match '^completion_'}).Count -gt 0){$questCounterRecords++}
   if(@($attributes.Keys | Where-Object {$_ -match '(?i)expir|deadline'}).Count -gt 0){$questExpiryRecords++}
  }
  if($category -match '^Athena' -and $attributes.variants -is [array] -and $attributes.variants.Count -gt 0){$variantRecords++}
  if($category -eq 'AthenaSeason') {
   $seasonNumber=$null
   if($item.templateId -match '(?i)^AthenaSeason:athenaseason([0-9]{1,3})$'){$seasonNumber=[int]$Matches[1]}
   $season=[ordered]@{season_number=$seasonNumber;purchased=if($attributes.purchased -is [bool]){$attributes.purchased}else{$null};level=if($attributes.level -is [ValueType] -and $attributes.level -isnot [bool]){$attributes.level}else{$null};claimed_offer_count=(Get-Count $attributes.purchased_offers);claimed_offer_field_present=$attributes.Contains('purchased_offers')}
   $seasonRecords.Add($season)
  }
 }
 $selected=[ordered]@{}
 foreach($category in @('Quest','ChallengeBundle','AthenaSeason','AthenaCharacter','AthenaBackpack','AthenaPickaxe','AthenaGlider','AthenaDance','AthenaItemWrap','AthenaLoadingScreen','AthenaSkyDiveContrail','AthenaMusicPack')) {
  if($counts.Contains($category)){$selected[$category]=$counts[$category]}
 }
 return [ordered]@{shape='full_profile';item_count=$items.Count;selected_category_counts=$selected;quest_states=$questStates;quest_records_with_counters=$questCounterRecords;quest_records_with_expiry_fields=$questExpiryRecords;athena_records_with_variants=$variantRecords;season_record_count=$seasonRecords.Count;season_records=$seasonRecords.ToArray()}
}

function Get-CommonCoreSummary($profile) {
 $subscriptions=$profile.stats.attributes.subscriptions
 if($subscriptions -isnot [array]){return [ordered]@{shape='no_subscriptions_array';subscription_count=$null}}
 $rows=[Collections.Generic.List[object]]::new()
 foreach($subscription in ($subscriptions | Select-Object -First 5)) {
  if($subscription -isnot [Collections.IDictionary]){continue}
  $row=[ordered]@{}
  foreach($key in @('subscriptionStartDate','subscriptionEndDate','nextRewardDate','nextRenewalRewardDate','lastStatusRefresh')){
   $row[$key]=Get-SafeTimestamp $subscription[$key]
  }
  foreach($key in @('autoRenewState','claimRewardState')) {
   $v=$subscription[$key]
   $row[$key]=if($v -is [string] -and $v -match '^[A-Za-z]{1,40}$'){$v}else{$null}
  }
  $row.isRetryingRenewal=if($subscription.isRetryingRenewal -is [bool]){$subscription.isRetryingRenewal}else{$null}
  $rows.Add($row)
 }
 return [ordered]@{shape='full_profile';subscription_count=$subscriptions.Count;subscriptions=$rows.ToArray();subscription_projection_limit=5}
}

function Get-AthenaStructureSummary($profile) {
 $items=$profile.items
 if($items -isnot [Collections.IDictionary]){return [ordered]@{shape='missing_items'}}
 $questCount=0;$questWithCompletion=0;$questWithDefinitionLikeField=0
 $definitionLikeFields=[ordered]@{}
 $questPatterns=[ordered]@{daily=0;weekly=0;event=0;other=0}
 $samples=[Collections.Generic.List[object]]::new()
 $sampled=[Collections.Generic.HashSet[string]]::new([StringComparer]::OrdinalIgnoreCase)
 $season42=$null
 $variantRecords=0;$variantEntries=0;$variantWithOwnedList=0;$variantWithActiveValue=0
 $ownedOptionEntries=0;$ownedOptionTotal=0;$activeInOwnedEntries=0;$activeOutsideOwnedEntries=0
 $channelCounts=[ordered]@{}
 $variantFieldCounts=[ordered]@{}
 foreach($item in $items.Values) {
  if($item -isnot [Collections.IDictionary] -or $item.templateId -isnot [string]){continue}
  $templateId=$item.templateId
  $attributes=$item.attributes
  if($attributes -isnot [Collections.IDictionary]){continue}
  if($templateId -match '^Quest:') {
   $questCount++
   $pattern=if($templateId -match '(?i)daily'){'daily'}elseif($templateId -match '(?i)weekly'){'weekly'}elseif($templateId -match '(?i)event'){'event'}else{'other'}
   $questPatterns[$pattern]++
   $counterKeys=@($attributes.Keys | Where-Object {$_ -match '^completion_'})
   if($counterKeys.Count -gt 0){$questWithCompletion++}
   $definitionKeys=@($attributes.Keys | Where-Object {$_ -notmatch '^completion_' -and $_ -match '(?i)description|display.?name|objective.?target|reward.?grant|prerequisite'})
   if($definitionKeys.Count -gt 0){
    $questWithDefinitionLikeField++
    foreach($field in $definitionKeys){if($field -match '^[A-Za-z0-9_]{1,70}$' -and $field -notmatch '(?i)token|secret|account|device|receipt' -and $definitionLikeFields.Count -lt 20){if(-not $definitionLikeFields.Contains($field)){$definitionLikeFields[$field]=0};$definitionLikeFields[$field]++}}
   }
   if(-not $sampled.Contains($pattern) -and $templateId -match '^Quest:[A-Za-z0-9_:-]{1,100}$' -and $templateId -notmatch '[a-fA-F0-9]{32}' -and $samples.Count -lt 4) {
    $safeCounterKeys=@($counterKeys | Where-Object {$_ -match '^[A-Za-z0-9_:-]{1,120}$' -and $_ -notmatch '[a-fA-F0-9]{32}'} | Select-Object -First 3)
    $samples.Add([ordered]@{identifier_pattern=$pattern;template_id=$templateId;state=if($attributes.quest_state -in @('Active','Claimed')){$attributes.quest_state}else{'other'};counter_field_names=$safeCounterKeys;expiry_field_present=(@($attributes.Keys | Where-Object {$_ -match '(?i)expir|deadline'}).Count -gt 0)})
    [void]$sampled.Add($pattern)
   }
  }
  if($templateId -match '(?i)^AthenaSeason:athenaseason42$'){$season42=$attributes}
  if($templateId -match '^Athena' -and $attributes.variants -is [array] -and $attributes.variants.Count -gt 0) {
   $variantRecords++
   foreach($variant in $attributes.variants) {
    if($variant -isnot [Collections.IDictionary]){continue}
    $variantEntries++
    foreach($field in $variant.Keys){if($field -match '^[A-Za-z_]{1,50}$' -and $field -notmatch '(?i)token|secret|account|device|receipt') {if(-not $variantFieldCounts.Contains($field)){$variantFieldCounts[$field]=0};$variantFieldCounts[$field]++}}
    if($variant.owned -is [array]){
     $variantWithOwnedList++
     $ownedOptionTotal+=$variant.owned.Count
     if($variant.owned.Count -gt 0){$ownedOptionEntries++}
     if($variant.active -is [string]){
      if(@($variant.owned | Where-Object {$_ -is [string] -and $_ -ceq $variant.active}).Count -gt 0){$activeInOwnedEntries++}else{$activeOutsideOwnedEntries++}
     }
    }
    if($null -ne $variant.active){$variantWithActiveValue++}
    if($variant.channel -is [string] -and $variant.channel -match '^[A-Za-z0-9_]{1,60}$' -and $channelCounts.Count -lt 50) {
     if(-not $channelCounts.Contains($variant.channel)){$channelCounts[$variant.channel]=0}
     $channelCounts[$variant.channel]++
    }
   }
  }
 }
 $offerSummary=[ordered]@{season42_record_present=($null -ne $season42);claimed_offer_count=$null;entry_type='unknown';entry_field_names=@();free_claimed_offers=0;premium_claimed_offers=0;unknown_access_claimed_offers=0;offers_with_loot_result=0;loot_result_entry_count=0;loot_result_entry_field_names=@();unique_offer_id_count=$null;season_attribute_rule_field_names=@()}
 if($season42 -is [Collections.IDictionary]) {
  $offers=$season42.purchased_offers
  $offerSummary.claimed_offer_count=Get-Count $offers
  if($offers -is [array] -and $offers.Count -gt 0) {
   $first=$offers[0]
   if($first -is [string]){$offerSummary.entry_type='string'}
   elseif($first -is [Collections.IDictionary]){$offerSummary.entry_type='object';$offerSummary.entry_field_names=@($first.Keys | Where-Object {$_ -match '^[A-Za-z_]{1,60}$' -and $_ -notmatch '(?i)token|secret|account|device|receipt'} | Select-Object -First 20)}
   else{$offerSummary.entry_type='other'}
   $offerIds=[Collections.Generic.HashSet[string]]::new([StringComparer]::Ordinal)
   foreach($offer in $offers){
    if($offer -isnot [Collections.IDictionary]){continue}
    if($offer.bIsFreePassReward -is [bool]){if($offer.bIsFreePassReward){$offerSummary.free_claimed_offers++}else{$offerSummary.premium_claimed_offers++}}
    else{$offerSummary.unknown_access_claimed_offers++}
    if($offer.offerId -is [string]){[void]$offerIds.Add($offer.offerId)}
    if($offer.lootResult -is [array]){
     $offerSummary.offers_with_loot_result++
     $offerSummary.loot_result_entry_count+=$offer.lootResult.Count
     if($offerSummary.loot_result_entry_field_names.Count -eq 0 -and $offer.lootResult.Count -gt 0 -and $offer.lootResult[0] -is [Collections.IDictionary]){
      $offerSummary.loot_result_entry_field_names=@($offer.lootResult[0].Keys | Where-Object {$_ -match '^[A-Za-z_]{1,60}$' -and $_ -notmatch '(?i)token|secret|account|device|receipt'} | Select-Object -First 20)
     }
    }
   }
   $offerSummary.unique_offer_id_count=$offerIds.Count
  }
  $offerSummary.season_attribute_rule_field_names=@($season42.Keys | Where-Object {$_ -match '(?i)reward|page|unlock|release|quest|offer|price|cost|premium|free' -and $_ -match '^[A-Za-z_]{1,70}$' -and $_ -notmatch '(?i)token|secret|account|device|receipt'} | Select-Object -First 25)
 }
 return [ordered]@{shape='athena_structure_summary';profile_version_shape=if($profile.version -is [string] -and $profile.version -match '^season[0-9]{1,3}_[A-Za-z0-9_]{1,30}$'){$profile.version}else{$null};quest=[ordered]@{record_count=$questCount;identifier_pattern_counts=$questPatterns;records_with_completion_fields=$questWithCompletion;records_with_definition_like_fields=$questWithDefinitionLikeField;definition_like_field_counts=$definitionLikeFields;sample_limit=4;samples=$samples.ToArray()};season42=$offerSummary;variants=[ordered]@{item_records_with_variant_entries=$variantRecords;variant_entry_count=$variantEntries;entries_with_owned_array=$variantWithOwnedList;entries_with_active_value=$variantWithActiveValue;entries_with_owned_options=$ownedOptionEntries;owned_option_count_across_channels=$ownedOptionTotal;entries_with_active_option_in_owned_array=$activeInOwnedEntries;entries_with_active_option_outside_owned_array=$activeOutsideOwnedEntries;entry_field_counts=$variantFieldCounts;channel_counts=$channelCounts}}
}

function Save-Report([string]$name,$report) {
 $json=ConvertTo-Json -InputObject $report -Depth 30
 Assert-Safe $json
 $path=Join-Path $script:outputDir ($name+'.json')
 [IO.File]::WriteAllText($path,$json,[Text.UTF8Encoding]::new($false))
 $status=if($null -eq $report.http_status){'none'}else{[string]$report.http_status}
 $entry="`n### Probe group: $name — $($report.requested_at_utc)`n`n- Operation: $($report.method) ``$($report.endpoint)``; HTTP status: $status; outcome: $($report.outcome).`n- Sanitized evidence: ``evidence/sanitized/epic-profiles/$($script:runId)/$name.json``.`n- Scope: one approved identity, read-only profile retrieval; response body and credentials stayed in memory.`n"
 Assert-Safe $entry
 [IO.File]::AppendAllText((Join-Path $root 'docs/investigation-log.md'),$entry,[Text.UTF8Encoding]::new($false))
 Write-Output ("Saved sanitized {0}: HTTP {1}, {2}" -f $name,$status,$report.outcome)
}

function Invoke-LimitedRequest([Net.Http.HttpClient]$client,[string]$method,[string]$url,[string]$apiKey,[string]$token,[string]$body) {
 $request=$null;$response=$null;$cts=$null;$stream=$null;$memory=$null
 try {
  $request=[Net.Http.HttpRequestMessage]::new([Net.Http.HttpMethod]::new($method),$url)
  if($apiKey){[void]$request.Headers.TryAddWithoutValidation('x-api-key',$apiKey)}
  if($token){[void]$request.Headers.TryAddWithoutValidation('Authorization',('Bearer '+$token))}
  $request.Content=[Net.Http.StringContent]::new($body,[Text.Encoding]::UTF8,'application/json')
  $cts=[Threading.CancellationTokenSource]::new([TimeSpan]::FromSeconds(40))
  $response=$client.SendAsync($request,[Net.Http.HttpCompletionOption]::ResponseHeadersRead,$cts.Token).GetAwaiter().GetResult()
  $status=[int]$response.StatusCode
  $serverTime=if($response.Headers.Date){([DateTimeOffset]$response.Headers.Date).UtcDateTime.ToString('o')}else{$null}
  $stream=$response.Content.ReadAsStreamAsync($cts.Token).GetAwaiter().GetResult()
  $memory=[IO.MemoryStream]::new()
  $buffer=[byte[]]::new(8192)
  while(($n=$stream.ReadAsync($buffer,0,$buffer.Length,$cts.Token).GetAwaiter().GetResult()) -gt 0){
   if($memory.Length+$n -gt 35MB){throw 'Response size limit'}
   $memory.Write($buffer,0,$n)
  }
  $raw=[Text.Encoding]::UTF8.GetString($memory.ToArray())
  $data=$null
  try{$data=ConvertFrom-Json -InputObject $raw -AsHashtable -Depth 100 -NoEnumerate}catch{}
  return @{status=$status;server_time_utc=$serverTime;data=$data;body_length=$raw.Length}
 } finally {
  if($memory){$memory.Dispose()};if($stream){$stream.Dispose()};if($response){$response.Dispose()};if($request){$request.Dispose()};if($cts){$cts.Dispose()}
 }
}

if($Mode -eq 'SelfTest') {
 $expected='0123456789abcdef0123456789abcdef'
 $script:expectedAccountHash=[Convert]::ToHexString([Security.Cryptography.SHA256]::HashData([Text.Encoding]::UTF8.GetBytes($expected))).ToLowerInvariant()
 if(-not (Test-AuthIdentity @{accountId=$expected;access_token='synthetic-token'} $expected)){throw 'Identity positive test failed'}
 if(Test-AuthIdentity @{accountId='ffffffffffffffffffffffffffffffff';access_token='synthetic-token'} $expected){throw 'Identity mismatch accepted'}
 if(Test-AuthIdentity @{accountId=$expected;other=@{account_id='ffffffffffffffffffffffffffffffff'}} $expected){throw 'Conflicting identity accepted'}
 if(Test-AuthIdentity @{access_token='synthetic-token'} $expected){throw 'Missing identity accepted'}
 $athena=@{profileChanges=@(@{profile=@{profileId='athena';accountId=$expected;items=@{one=@{templateId='Quest:synthetic';attributes=@{quest_state='Active';completion_reward_granter_obj0=1}};two=@{templateId='AthenaSeason:athenaseason42';attributes=@{purchased=$true;level=10;purchased_offers=@(@{})}}}}})}
 $profile=Get-FullProfile $athena 'athena' $expected
 $summary=Get-AthenaSummary $profile
 if($summary.item_count -ne 2 -or $summary.quest_records_with_counters -ne 1 -or $summary.season_records[0].claimed_offer_count -ne 1){throw 'Athena projection failed'}
 $structure=Get-AthenaStructureSummary $profile
 if($structure.quest.record_count -ne 1 -or $structure.quest.records_with_definition_like_fields -ne 0 -or $structure.season42.claimed_offer_count -ne 1 -or $structure.quest.samples.Count -ne 1){throw 'Athena structure projection failed'}
 $common=@{profileChanges=@(@{profile=@{profileId='common_core';accountId=$expected;stats=@{attributes=@{subscriptions=@(@{uniqueSubscriptionId='synthetic-private-id';subscriptionEndDate='2026-09-22T15:51:59Z';autoRenewState='AutoRenewEnabled';isRetryingRenewal=$false})}}}})}
 $crew=Get-CommonCoreSummary (Get-FullProfile $common 'common_core' $expected)
 $safe=ConvertTo-Json -InputObject $crew -Depth 20
 if($crew.subscription_count -ne 1 -or $safe.Contains('synthetic-private-id') -or $crew.subscriptions[0].subscriptionEndDate -ne '2026-09-22T15:51:59.0000000+00:00'){throw 'Subscription projection failed'}
 if((Get-SafeTimestamp ([datetime]'2026-09-22T15:51:59Z')) -ne '2026-09-22T15:51:59.0000000Z'){throw 'Parsed-date projection failed'}
 $script:sensitive.Add('synthetic-token')
 $blocked=$false;try{Assert-Safe 'synthetic-token'}catch{$blocked=$true};if(-not $blocked){throw 'Sensitive output guard failed'}
 Write-Output 'PASS: exact identity and conflict gates, profile selection, quest/pass/Crew projections, identifier omission and sensitive output guard.'
 exit 0
}

$client=$null
try {
 $apiKey=[Environment]::GetEnvironmentVariable('API_FORTNITE_KEY','User')
 $accountId=[Environment]::GetEnvironmentVariable('FORTNITE_PLAYER1_ACCOUNT_ID','User')
 $deviceId=[Environment]::GetEnvironmentVariable('FORTNITE_PLAYER1_DEVICE_ID','User')
 $deviceSecret=[Environment]::GetEnvironmentVariable('FORTNITE_PLAYER1_DEVICE_SECRET','User')
 foreach($value in @($apiKey,$accountId,$deviceId,$deviceSecret)){
  if([string]::IsNullOrWhiteSpace($value)){throw 'Required input missing'}
  $script:sensitive.Add($value)
 }
 if(-not (Test-ExpectedAccount $accountId)){throw 'Configured identity gate closed'}
 $script:runId=[DateTime]::UtcNow.ToString('yyyyMMddTHHmmssZ')
 $script:outputDir=Join-Path $root ('evidence/sanitized/epic-profiles/'+$script:runId)
 [void][IO.Directory]::CreateDirectory($script:outputDir)
 $handler=[Net.Http.HttpClientHandler]::new();$handler.AllowAutoRedirect=$false
 $client=[Net.Http.HttpClient]::new($handler)
 $authReport=[ordered]@{provider='api-fortnite.com';method='POST';endpoint='/api/v1/oauth/refresh-device';requested_at_utc=[DateTime]::UtcNow.ToString('o');response_at_utc=$null;http_status=$null;response_date_utc=$null;outcome='transport_failure';shape=@{type='authentication_response_suppressed'}}
 $accessToken=$null
 try {
  $authBody=@{accountId=$accountId;deviceId=$deviceId;secret=$deviceSecret}|ConvertTo-Json -Compress
  $auth=Invoke-LimitedRequest $client 'POST' 'https://prod.api-fortnite.com/api/v1/oauth/refresh-device' $apiKey $null $authBody
  $authReport.http_status=$auth.status;$authReport.response_at_utc=[DateTime]::UtcNow.ToString('o');$authReport.response_date_utc=$auth.server_time_utc
  Add-AuthSecrets $auth.data
  $tokens=@(Get-MatchingValues $auth.data '(?i)^access_?token$' | Sort-Object -Unique)
  $identityOkay=Test-AuthIdentity $auth.data $accountId
  $authReport.shape.identity_matches_expected=$identityOkay
  $authReport.shape.access_token_present=($tokens.Count -eq 1)
  $authReport.outcome=if($auth.status -eq 200 -and $identityOkay -and $tokens.Count -eq 1){'identity_verified'}else{'private_auth_gate_failed'}
  if($authReport.outcome -eq 'identity_verified'){$accessToken=$tokens[0];$script:sensitive.Add($accessToken)}
 } catch {$authReport.outcome='transport_or_processing_failure'}
 Save-Report 'authentication' $authReport
 if(-not $accessToken){throw 'Authentication gate closed'}
 $profileIds=if($Mode -eq 'Structure'){@('athena')}else{@('athena','common_core')}
 foreach($profileId in $profileIds) {
  Start-Sleep -Seconds 1
  $endpoint='/fortnite/api/game/v2/profile/{accountId}/client/QueryProfile?profileId='+$profileId+'&rvn=-1'
  $report=[ordered]@{provider='Epic Games Fortnite profile service';method='POST';endpoint=$endpoint;requested_at_utc=[DateTime]::UtcNow.ToString('o');response_at_utc=$null;http_status=$null;response_date_utc=$null;outcome='transport_failure';shape=$null}
  try {
   $url='https://fortnite-public-service-prod11.ol.epicgames.com'+$endpoint.Replace('{accountId}',$accountId)
   $response=Invoke-LimitedRequest $client 'POST' $url $null $accessToken '{}'
   $report.http_status=$response.status;$report.response_at_utc=[DateTime]::UtcNow.ToString('o');$report.response_date_utc=$response.server_time_utc
   $profile=Get-FullProfile $response.data $profileId $accountId
   $report.outcome=if($response.status -eq 200 -and $profile){'identity_verified_full_profile'}elseif($response.status -eq 200){'unexpected_profile_or_identity'}else{'http_error'}
   $report.shape=if($report.outcome -eq 'identity_verified_full_profile'){
    $facts=if($Mode -eq 'Structure'){Get-AthenaStructureSummary $profile}elseif($profileId -eq 'athena'){Get-AthenaSummary $profile}else{Get-CommonCoreSummary $profile}
    [ordered]@{profile_id=$profileId;identity_matches_expected=$true;response_profile_changes=Get-Count $response.data.profileChanges;profile_updated_at=Get-SafeTimestamp $profile.updated;facts=$facts}
   }else{[ordered]@{type='response_suppressed';body_length=$response.body_length;profile_identity_verified=$false}}
  } catch {$report.outcome='transport_or_processing_failure';$report.shape=@{type='response_suppressed'}}
  $reportName=if($Mode -eq 'Structure'){'athena_structure'}else{$profileId}
  Save-Report $reportName $report
  if($report.outcome -ne 'identity_verified_full_profile'){throw 'Profile gate closed'}
 }
 Write-Output 'Bounded profile probe complete. Only sanitized reports were saved.'
} catch {
 Write-Output 'Probe stopped safely. No further private requests were sent.'
 exit 1
} finally {
 if($client){$client.Dispose()}
 $accessToken=$null;$deviceSecret=$null;$deviceId=$null;$apiKey=$null
}
