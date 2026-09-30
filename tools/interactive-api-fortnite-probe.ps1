param([ValidateSet('SelfTest','Interactive','InteractiveRetry','RotateDeviceAuth')][string]$Mode='SelfTest')

$ErrorActionPreference='Stop'
$ProgressPreference='SilentlyContinue'
$root=Split-Path $PSScriptRoot -Parent
$script:sensitive=[Collections.Generic.List[string]]::new()
$script:known=[Collections.Generic.HashSet[string]]::new([StringComparer]::OrdinalIgnoreCase)
$script:requestCount=0
$script:maxRequests=6
$script:client=$null
$script:accessToken=$null
$spec=Get-Content -LiteralPath (Join-Path $root 'evidence/sanitized/specifications/api-fortnite-openapi.json') -Raw|ConvertFrom-Json -AsHashtable
foreach($schema in $spec.components.schemas.Values){if($schema.properties){foreach($key in $schema.properties.Keys){[void]$script:known.Add($key)}}}
foreach($key in @('data','error','errors','message','status','statusCode','success','result','level','xp','accountLevel','bookLevel','bookXp','tier','purchased','progress','stash','globalcash','items','entries','rewards','quests','challenges','attributes','templateId','quantity','quest_state','completion','expiresAt','total','count','page','pageSize','pagination')){[void]$script:known.Add($key)}

function Add-AllStrings($value) {
 if($value -is [Collections.IDictionary]) {
  foreach($key in $value.Keys){Add-AllStrings $value[$key]}
 } elseif($value -is [array]) {
  foreach($item in $value){Add-AllStrings $item}
 } elseif($value -is [string] -and $value.Length -ge 4) {
  $script:sensitive.Add($value)
 }
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

function Test-Identity($value,[string]$expected) {
 $ids=@(Get-MatchingValues $value '(?i)^(account_?id|epic_?account_?id)$'|Sort-Object -Unique)
 return ($ids.Count -eq 1 -and $ids[0] -ceq $expected)
}

function Get-SafeShape($value,[int]$depth=0) {
 if($null -eq $value){return @{type='null'}}
 if($depth -gt 8){return @{type='depth_limited'}}
 if($value -is [Collections.IDictionary]) {
  $fields=[ordered]@{};$unknown=0
  foreach($key in $value.Keys) {
   if($key -match '(?i)token|secret|device|account.?id|authorization|cookie|header|flow.?id|verification|subscription.?id|receipt|ipaddress|url|uri|code') { continue }
   if($script:known.Contains($key)){$fields[$key]=Get-SafeShape $value[$key] ($depth+1)}
   else{$unknown++;$fields['unnamed_field_'+$unknown]=Get-SafeShape $value[$key] ($depth+1)}
  }
  return @{type='object';field_count=$value.Count;omitted_field_count=($value.Count-$fields.Count);unknown_field_count=$unknown;fields=$fields}
 }
 if($value -is [array]) {
  $sample=@();foreach($item in ($value|Select-Object -First 3)){$sample+=Get-SafeShape $item ($depth+1)}
  return @{type='array';count=$value.Count;sample=$sample;sample_limit=3}
 }
 if($value -is [bool]){return @{type='boolean';value=$value}}
 if($value -is [DateTime] -or $value -is [DateTimeOffset]){return @{type='timestamp';value=$value.ToUniversalTime().ToString('o')}}
 if($value -is [ValueType]){return @{type='number';value=$value}}
 return @{type='string';length=([string]$value).Length}
}

function Assert-Safe([string]$text) {
 foreach($value in $script:sensitive){if($value.Length -ge 4 -and $text.Contains($value)){throw 'Output suppressed by sensitive-value guard'}}
}

function Get-Observations([string]$raw) {
 return [ordered]@{
  reported_http_error_codes=@([regex]::Matches($raw,'(?i)(?:status code does not indicate success:\s*|upstream[\s_-]*(?:status|error)?[\s\":=]*)([45][0-9]{2})')|ForEach-Object{[int]$_.Groups[1].Value}|Sort-Object -Unique)
  quest_template_strings_present=($raw -match '(?i)Quest:')
  cosmetic_template_strings_present=($raw -match '(?i)Athena(?:Character|Backpack|Pickaxe|Glider|Dance|ItemWrap):')
  completion_fields_present=($raw -match '(?i)"completion_[^"]+"\s*:')
  reward_fields_present=($raw -match '(?i)"(?:reward|rewards|rewardItem|rewardQuantity)"\s*:')
  expiry_fields_present=($raw -match '(?i)"(?:expiresAt|expiry|expiration|endDate)"\s*:')
  style_fields_present=($raw -match '(?i)"(?:variants|styles|unlockedStyles|item_seen)"\s*:')
 }
}

function Update-Summary($report) {
 $path=Join-Path $root 'evidence/sanitized/api-fortnite/probe-summary.json'
 $summary=@(Get-Content -LiteralPath $path -Raw|ConvertFrom-Json -Depth 100)
 if(@($summary|Where-Object{$_.requested_at_utc -eq $report.requested_at_utc}).Count -eq 0) {
  $summary += [pscustomobject]@{method=$report.method;endpoint=$report.endpoint;requested_at_utc=$report.requested_at_utc;response_at_utc=$report.response_at_utc;http_status=$report.http_status;outcome=$report.outcome;note='Interactive OAuth/private probe; see per-call sanitized report.'}
  [IO.File]::WriteAllText($path,($summary|ConvertTo-Json -Depth 20),[Text.UTF8Encoding]::new($false))
 }
}

function Save-Report([string]$name,$report) {
 $json=$report|ConvertTo-Json -Depth 60
 Assert-Safe $json
 $path=Join-Path $script:outputDir ($name+'.json')
 [IO.File]::WriteAllText($path,$json,[Text.UTF8Encoding]::new($false))
 Update-Summary $report
 $entry="`n### Probe group: $name — $($report.requested_at_utc)`n`n- Operation: $($report.method) ``$($report.endpoint)``; HTTP status: $($report.http_status); outcome: $($report.outcome).`n- Sanitized evidence: ``evidence/sanitized/api-fortnite/$($script:runId)/$name.json``.`n- Confidence: observed status and sanitized shape only. No raw response, request headers, flow identifiers, tokens or credentials saved.`n"
 Assert-Safe $entry
 [IO.File]::AppendAllText((Join-Path $root 'docs/investigation-log.md'),$entry,[Text.UTF8Encoding]::new($false))
 Write-Output ('Saved sanitized probe group {0}: HTTP {1}, {2}' -f $name,$report.http_status,$report.outcome)
}

function Send-Request([string]$name,[string]$method,[string]$path,[string]$token=$null,[string]$body=$null,[string]$reportedEndpoint=$null) {
 if($script:requestCount -ge $script:maxRequests){throw 'Interactive probe budget exhausted'}
 $script:requestCount++
 $report=[ordered]@{provider='api-fortnite.com';method=$method;endpoint=$(if($reportedEndpoint){$reportedEndpoint}else{$path});requested_at_utc=[DateTime]::UtcNow.ToString('o');response_at_utc=$null;http_status=$null;response_date_utc=$null;auth=$(if($token){'provider key + verified player token'}else{'provider key only'});outcome='transport_failure';shape=$null;observations=$null}
 if($reportedEndpoint){$report.account_binding='Exact OAuth-verified account; identifier suppressed.'}
 $request=$null;$response=$null;$cts=$null;$raw='';$data=$null
 try {
  $request=[Net.Http.HttpRequestMessage]::new([Net.Http.HttpMethod]::new($method),('https://prod.api-fortnite.com'+$path))
  [void]$request.Headers.TryAddWithoutValidation('x-api-key',$script:apiKey)
  if($token){[void]$request.Headers.TryAddWithoutValidation('x-fortnite-token',$token)}
  if($null-ne$body){$request.Content=[Net.Http.StringContent]::new($body,[Text.Encoding]::UTF8,'application/json')}
  $cts=[Threading.CancellationTokenSource]::new([TimeSpan]::FromSeconds(25))
  $response=$script:client.SendAsync($request,[Net.Http.HttpCompletionOption]::ResponseHeadersRead,$cts.Token).GetAwaiter().GetResult()
  $report.http_status=[int]$response.StatusCode
  $report.response_at_utc=[DateTime]::UtcNow.ToString('o')
  if($response.Headers.Date){$report.response_date_utc=([DateTimeOffset]$response.Headers.Date).UtcDateTime.ToString('o')}
  $bytes=$response.Content.ReadAsByteArrayAsync($cts.Token).GetAwaiter().GetResult()
  if($bytes.Length -gt 10MB){throw 'Response size limit'}
  $raw=[Text.Encoding]::UTF8.GetString($bytes)
  try{$data=ConvertFrom-Json -InputObject $raw -AsHashtable -Depth 100 -NoEnumerate}catch{$data=$null}
  Add-AllStrings $data
  $report.outcome=if($report.http_status -ge 200 -and $report.http_status -lt 300){'http_success'}else{'http_error'}
  $report.shape=if($null-ne$data){Get-SafeShape $data}else{@{type='non_json_or_null';length=$raw.Length}}
  $report.observations=Get-Observations $raw
 } catch {
  $report.outcome='transport_or_processing_failure'
 } finally {
  $report.completed_at_utc=[DateTime]::UtcNow.ToString('o')
  if($response){$response.Dispose()};if($request){$request.Dispose()};if($cts){$cts.Dispose()}
 }
 return @{report=$report;data=$data;raw=$raw}
}

if($Mode -eq 'SelfTest') {
 $secret='synthetic-secret-never-export';$script:sensitive.Add($secret)
 $fixture=@{flowId=$secret;url='https://example.invalid/secret';data=@{accountId='expected';access_token=$secret;level=42;items=@();purchased=$false}}
 Add-AllStrings $fixture
 $shape=Get-SafeShape $fixture
 $text=$shape|ConvertTo-Json -Depth 30
 Assert-Safe $text
 if(-not(Test-Identity @{account_id='expected'} 'expected')){throw 'Identity positive test failed'}
 if(Test-Identity @{account_id='other'} 'expected'){throw 'Identity mismatch test failed'}
 if($shape.fields.data.fields.level.value -ne 42 -or $shape.fields.data.fields.items.count -ne 0){throw 'Safe shape test failed'}
 $actual='/api/v1/profile/level?accountId=expected';$template='/api/v1/profile/level?accountId={verifiedAccountId}'
 if(-not$actual.Contains('expected') -or $template.Contains('expected')){throw 'Endpoint suppression test failed'}
 Write-Output 'PASS: interactive-flow secret suppression, safe shape, identity gate and numeric/empty-array preservation.'
 exit 0
}

try {
 $script:apiKey=[Environment]::GetEnvironmentVariable('API_FORTNITE_KEY','User')
 if([string]::IsNullOrWhiteSpace($script:apiKey)){throw 'Missing API key'}
 $script:sensitive.Add($script:apiKey)
 $script:expected=[Environment]::GetEnvironmentVariable('FORTNITE_PLAYER1_ACCOUNT_ID','User')
 if([string]::IsNullOrWhiteSpace($script:expected)){throw 'Expected identity unavailable'}
 $script:sensitive.Add($script:expected)
 $evidenceRoot=Join-Path $root 'evidence/sanitized/api-fortnite'
 $rotationFiles=@(Get-ChildItem -LiteralPath $evidenceRoot -Filter 'credential_rotation.json' -File -Recurse)
 if($rotationFiles.Count -ne 1){throw 'Validated identity attestation unavailable'}
 $rotation=Get-Content -Raw -LiteralPath $rotationFiles[0].FullName | ConvertFrom-Json -AsHashtable
 if(-not $rotation.validated_by_refresh -or -not $rotation.identity_matches_expected -or -not $rotation.persisted -or -not $rotation.write_verified -or $rotation.account_id_changed){throw 'Validated identity attestation rejected'}
 if(@(Get-ChildItem -LiteralPath $evidenceRoot -Filter 'authentication.json' -File -Recurse).Count -ne 2){throw 'Stored-device diagnostic history does not match approved state'}
 if($Mode -eq 'Interactive') {
  foreach($fileName in @('oauth_get_token.json','oauth_complete.json','oauth_complete_2.json','level.json','quests.json','inventory.json','entitlement.json')){if(@(Get-ChildItem -LiteralPath $evidenceRoot -Filter $fileName -File -Recurse).Count -gt 0){throw 'Interactive/private probe already attempted'}}
 } elseif($Mode -eq 'InteractiveRetry') {
  if(@(Get-ChildItem -LiteralPath $evidenceRoot -Filter 'oauth_get_token.json' -File -Recurse).Count -ne 1 -or @(Get-ChildItem -LiteralPath $evidenceRoot -Filter 'oauth_complete.json' -File -Recurse).Count -ne 1){throw 'Interactive retry history does not match capture failure'}
  foreach($fileName in @('oauth_complete_2.json','level.json','quests.json','inventory.json','entitlement.json')){if(@(Get-ChildItem -LiteralPath $evidenceRoot -Filter $fileName -File -Recurse).Count -gt 0){throw 'Private evidence already exists'} }
 } else {
  if(@(Get-ChildItem -LiteralPath $evidenceRoot -Filter 'oauth_get_token.json' -File -Recurse).Count -ne 2 -or @(Get-ChildItem -LiteralPath $evidenceRoot -Filter 'oauth_complete.json' -File -Recurse).Count -ne 2){throw 'Credential-rotation history does not match completed private probes'}
  foreach($fileName in @('oauth_complete_2.json','refresh_new_device.json','credential_rotation.json')){if(@(Get-ChildItem -LiteralPath $evidenceRoot -Filter $fileName -File -Recurse).Count -gt 0){throw 'Credential rotation already attempted'} }
 }
 $script:runId=[DateTime]::UtcNow.ToString('yyyyMMddTHHmmssZ')
 $script:outputDir=Join-Path $evidenceRoot $script:runId
 [void][IO.Directory]::CreateDirectory($script:outputDir)
 $handler=[Net.Http.HttpClientHandler]::new();$handler.AllowAutoRedirect=$false;$handler.UseCookies=$false
 $script:client=[Net.Http.HttpClient]::new($handler);$script:client.Timeout=[TimeSpan]::FromSeconds(25)

 $flowResult=Send-Request 'oauth_get_token' 'GET' '/api/v1/oauth/get-token'
 $flowIds=@(Get-MatchingValues $flowResult.data '(?i)^flow_?id$'|Sort-Object -Unique)
 $urlValues=@(Get-MatchingValues $flowResult.data '(?i)(?:url|uri)(?:_?complete)?$'|Sort-Object -Unique)
 $safeUrls=@($urlValues|Where-Object{try{$u=[Uri]$_;$u.Scheme -eq 'https' -and ($u.Host -eq 'epicgames.com' -or $u.Host.EndsWith('.epicgames.com') -or $u.Host -eq 'api-fortnite.com' -or $u.Host.EndsWith('.api-fortnite.com'))}catch{$false}})
 $flowResult.report.shape=[ordered]@{type='oauth_device_flow_suppressed';safe_structure=Get-SafeShape $flowResult.data;flow_id_present=($flowIds.Count -eq 1);approved_https_url_present=($safeUrls.Count -eq 1);browser_opened=$false}
 if($flowResult.report.http_status -eq 200 -and $flowIds.Count -eq 1 -and $safeUrls.Count -eq 1) {
  Start-Process -FilePath $safeUrls[0]
  $flowResult.report.shape.browser_opened=$true
 }
 Save-Report 'oauth_get_token' $flowResult.report
 if(-not$flowResult.report.shape.browser_opened){throw 'Could not open a single approved OAuth URL'}
 $script:flowId=$flowIds[0];$flowResult=$null;$flowIds=$null;$urlValues=$null;$safeUrls=$null

 [void](Read-Host 'Browser authorization opened. Complete it, return to Codex, and reply done; the flow remains only in this process')
 $completeBody=@{flowId=$script:flowId}|ConvertTo-Json -Compress
 $complete=Send-Request 'oauth_complete' 'POST' '/api/v1/oauth/complete' $null $completeBody
 $tokens=@(Get-MatchingValues $complete.data '(?i)^access_?token$'|Sort-Object -Unique)
 $identityVerified=Test-Identity $complete.data $script:expected
 $complete.report.auth='provider key + in-memory flow identifier'
 $complete.report.shape=[ordered]@{type='oauth_completion_suppressed';safe_structure=Get-SafeShape $complete.data;identity_matches_expected=$identityVerified;access_token_present=($tokens.Count -eq 1);refresh_token_present=(@(Get-MatchingValues $complete.data '(?i)^refresh_?token$').Count -gt 0);device_credentials_present=(@(Get-MatchingValues $complete.data '(?i)^(device_?id|secret)$').Count -gt 0)}
 if($complete.report.http_status -eq 202){$complete.report.outcome='authorization_pending'}
 elseif($complete.report.http_status -eq 200 -and $identityVerified -and $tokens.Count -eq 1){$complete.report.outcome='identity_verified'}
 else{$complete.report.outcome='private_auth_gate_failed'}
 Save-Report 'oauth_complete' $complete.report
 if($complete.report.http_status -eq 202) {
  [void](Read-Host 'Authorization is still pending. Return to Codex; a second completion POST requires a new explicit continuation')
  $complete=Send-Request 'oauth_complete_2' 'POST' '/api/v1/oauth/complete' $null $completeBody
  $tokens=@(Get-MatchingValues $complete.data '(?i)^access_?token$'|Sort-Object -Unique)
  $identityVerified=Test-Identity $complete.data $script:expected
  $complete.report.auth='provider key + in-memory flow identifier'
  $complete.report.shape=[ordered]@{type='oauth_completion_suppressed';safe_structure=Get-SafeShape $complete.data;identity_matches_expected=$identityVerified;access_token_present=($tokens.Count -eq 1);refresh_token_present=(@(Get-MatchingValues $complete.data '(?i)^refresh_?token$').Count -gt 0);device_credentials_present=(@(Get-MatchingValues $complete.data '(?i)^(device_?id|secret)$').Count -gt 0)}
  if($complete.report.http_status -eq 200 -and $identityVerified -and $tokens.Count -eq 1){$complete.report.outcome='identity_verified'}else{$complete.report.outcome='private_auth_gate_failed'}
  Save-Report 'oauth_complete_2' $complete.report
 }
 if($complete.report.http_status -ne 200 -or -not$identityVerified -or $tokens.Count -ne 1){throw 'Interactive authentication gate closed'}
 $script:accessToken=$tokens[0];$script:sensitive.Add($script:accessToken)
 if($Mode -eq 'RotateDeviceAuth') {
  $newDeviceIds=@(Get-MatchingValues $complete.data '(?i)^device_?id$'|Sort-Object -Unique)
  $newSecrets=@(Get-MatchingValues $complete.data '(?i)^secret$'|Sort-Object -Unique)
  if($newDeviceIds.Count -ne 1 -or $newSecrets.Count -ne 1){throw 'OAuth completion did not yield one device credential set'}
  $newDeviceId=$newDeviceIds[0];$newSecret=$newSecrets[0]
  if($newDeviceId -notmatch '^[a-fA-F0-9]{32}$' -or $newSecret.Length -ne 32 -or $newSecret -match '[\x00-\x1F\x7F]' -or $newSecret -ne $newSecret.Trim()){throw 'New device credential structure rejected'}
  $refreshBody=@{accountId=$script:expected;deviceId=$newDeviceId;secret=$newSecret}|ConvertTo-Json -Compress
  $refresh=Send-Request 'refresh_new_device' 'POST' '/api/v1/oauth/refresh-device' $null $refreshBody
  $refreshTokens=@(Get-MatchingValues $refresh.data '(?i)^access_?token$'|Sort-Object -Unique)
  $refreshIdentityVerified=Test-Identity $refresh.data $script:expected
  $refresh.report.auth='provider key + newly issued in-memory device credentials'
  $refresh.report.shape=[ordered]@{type='new_device_refresh_suppressed';safe_structure=Get-SafeShape $refresh.data;identity_matches_expected=$refreshIdentityVerified;access_token_present=($refreshTokens.Count -eq 1);refresh_token_present=(@(Get-MatchingValues $refresh.data '(?i)^refresh_?token$').Count -gt 0)}
  if($refresh.report.http_status -eq 200 -and $refreshIdentityVerified -and $refreshTokens.Count -eq 1){$refresh.report.outcome='new_device_credentials_validated'}else{$refresh.report.outcome='new_device_credentials_rejected'}
  Save-Report 'refresh_new_device' $refresh.report

  $oldDeviceId=[Environment]::GetEnvironmentVariable('FORTNITE_PLAYER1_DEVICE_ID','User')
  $oldSecret=[Environment]::GetEnvironmentVariable('FORTNITE_PLAYER1_DEVICE_SECRET','User')
  foreach($value in @($oldDeviceId,$oldSecret,$newDeviceId,$newSecret)){if($value){$script:sensitive.Add($value)}}
  $persisted=$false;$writeVerified=$false;$rollbackPerformed=$false
  if($refresh.report.outcome -eq 'new_device_credentials_validated') {
   try {
    [Environment]::SetEnvironmentVariable('FORTNITE_PLAYER1_DEVICE_ID',$newDeviceId,'User')
    [Environment]::SetEnvironmentVariable('FORTNITE_PLAYER1_DEVICE_SECRET',$newSecret,'User')
    $writeVerified=([Environment]::GetEnvironmentVariable('FORTNITE_PLAYER1_DEVICE_ID','User') -ceq $newDeviceId -and [Environment]::GetEnvironmentVariable('FORTNITE_PLAYER1_DEVICE_SECRET','User') -ceq $newSecret)
    if(-not$writeVerified){throw 'Credential write verification failed'}
    $persisted=$true
   } catch {
    [Environment]::SetEnvironmentVariable('FORTNITE_PLAYER1_DEVICE_ID',$oldDeviceId,'User')
    [Environment]::SetEnvironmentVariable('FORTNITE_PLAYER1_DEVICE_SECRET',$oldSecret,'User')
    $rollbackPerformed=$true
   }
  }
  $rotation=[ordered]@{action='windows_user_device_auth_rotation';completed_at_utc=[DateTime]::UtcNow.ToString('o');validated_by_refresh=($refresh.report.outcome -eq 'new_device_credentials_validated');identity_matches_expected=$refreshIdentityVerified;device_id_changed=($newDeviceId -cne $oldDeviceId);secret_changed=($newSecret -cne $oldSecret);persisted=$persisted;write_verified=$writeVerified;rollback_performed=$rollbackPerformed;access_token_persisted=$false;account_id_changed=$false}
  $rotationJson=$rotation|ConvertTo-Json -Depth 10
  Assert-Safe $rotationJson
  [IO.File]::WriteAllText((Join-Path $script:outputDir 'credential_rotation.json'),$rotationJson,[Text.UTF8Encoding]::new($false))
  $rotationEntry="`n### Local credential rotation — $($rotation.completed_at_utc)`n`n- Newly issued device credentials validated by refresh: $($rotation.validated_by_refresh).`n- Persisted to the two Windows user device-auth variables: $($rotation.persisted); write verified: $($rotation.write_verified); rollback performed: $($rotation.rollback_performed).`n- Account identity matched exactly: $($rotation.identity_matches_expected). No credential value or access token was saved in evidence or log output.`n"
  Assert-Safe $rotationEntry
  [IO.File]::AppendAllText((Join-Path $root 'docs/investigation-log.md'),$rotationEntry,[Text.UTF8Encoding]::new($false))
  Write-Output ('Credential rotation finished: new device validation {0}; user-scope persistence {1}.' -f $(if($rotation.validated_by_refresh){'passed'}else{'failed'}),$(if($rotation.persisted){'completed'}else{'not performed'}))
  exit $(if($rotation.validated_by_refresh -and $rotation.persisted){0}else{1})
 }
 $encoded=[Uri]::EscapeDataString($script:expected)
 $routes=[ordered]@{
  level=@{actual='/api/v1/profile/level?accountId='+$encoded;report='/api/v1/profile/level?accountId={verifiedAccountId}'}
  quests=@{actual='/api/v2/quests/'+$encoded;report='/api/v2/quests/{verifiedAccountId}'}
  inventory=@{actual='/api/v2/fn/br-inventory/'+$encoded;report='/api/v2/fn/br-inventory/{verifiedAccountId}'}
  entitlement=@{actual='/api/v2/fn/entitlement';report='/api/v2/fn/entitlement'}
 }
 foreach($name in $routes.Keys){$result=Send-Request $name 'GET' $routes[$name].actual $script:accessToken $null $routes[$name].report;$result.report.auth='provider key + identity-verified player token';Save-Report $name $result.report;$result=$null}
 Write-Output ('Interactive OAuth/private probe finished: {0} request(s); identity gate passed.' -f $script:requestCount)
} catch {
 Write-Output 'Interactive flow stopped by a safety gate or processing failure. Sensitive details suppressed; inspect only sanitized reports.'
 exit 1
} finally {
 if($script:client){$script:client.Dispose()}
 $script:accessToken=$null;$script:flowId=$null;$script:apiKey=$null;$script:expected=$null;$completeBody=$null;$tokens=$null;$newDeviceId=$null;$newSecret=$null;$oldDeviceId=$null;$oldSecret=$null;$refreshBody=$null;$refreshTokens=$null
 $script:sensitive.Clear()
}
