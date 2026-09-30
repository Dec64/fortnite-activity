param([ValidateSet('SelfTest','ApprovedBatch','ApprovedPublicFollowup','ApprovedAuthDiagnostic','ApprovedCoverageBatch','ApprovedCoverageRetry','ApprovedPlaylistProbe','ApprovedPlaylistRetry','ApprovedProjectApiBatch','ApprovedProjectApiResume','ApprovedSpriteAndEventFollowup','ApprovedDetailCapture','ApprovedEventFinalAndAccessDiagnosis','ApprovedFinalCurrencyCapture','ApprovedParticipationAndLeaderboard','ApprovedShopFreeOffersProbe','ApprovedTrackerHistoryCompleteness','ApprovedSdkAssetBundles','ApprovedTrackerHistoryCompletionRetry','ApprovedSdkPlaylistLookup','ApprovedSdkPlaylistControl','ApprovedSdkActivePlaylists')][string]$Mode = 'SelfTest')
$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
$root = Split-Path $PSScriptRoot -Parent
$script:sensitive = [Collections.Generic.List[string]]::new()
$script:known = [Collections.Generic.HashSet[string]]::new([StringComparer]::OrdinalIgnoreCase)
$spec = Get-Content -Raw -LiteralPath (Join-Path $root 'evidence/sanitized/specifications/api-fortnite-openapi.json') | ConvertFrom-Json -AsHashtable
foreach($schema in $spec.components.schemas.Values) { if($schema.properties) { foreach($key in $schema.properties.Keys) { [void]$script:known.Add($key) } } }
foreach($key in @('data','error','errors','message','status','statusCode','code','success','result','stash','globalcash','level','xp','accountLevel','bookLevel','bookXp','tier','purchased','progress','startDate','endDate','currentSeason','season','items','entries','rewards','quests','challenges','attributes','templateId','quantity','quest_state','completion','news','battleroyalenews','motds','title','body','image','images','date','lastModified','updatedAt','expiresAt','pack','crew','current','total','count','totalCount','page','pageSize','pageCount','pagination','version','generated','offerGuid','pages','cost','currency','track','item','displayName','type','rarity','icon','prices','gameVersion','plugin','levelRewards','free','premium','unlockLevel','releaseDate','requirements','description')) { [void]$script:known.Add($key) }

function Add-SensitiveFields($value) {
 if($value -is [Collections.IDictionary]) {
  foreach($key in $value.Keys) {
   $v=$value[$key]
   if($key -match '(?i)token|secret|device.?id|account.?id|authorization|flow.?id|verification|code|url' -and $v -is [string] -and $v.Length -ge 8) { $script:sensitive.Add($v) }
   Add-SensitiveFields $v
  }
 } elseif($value -is [array]) { foreach($v in $value) { Add-SensitiveFields $v } }
}

function Get-SafeShape($value, [int]$depth=0) {
 if($null -eq $value) { return @{type='null'} }
 if($depth -gt 8) { return @{type='depth_limited'} }
 if($value -is [Collections.IDictionary]) {
  $fields=[ordered]@{}; $unknown=0
  foreach($key in $value.Keys) {
   if($key -match '(?i)token|secret|device|account.?id|authorization|cookie|header|flow.?id|verification|subscription.?id|receipt|ipaddress') { continue }
   $dynamicSafe=($key -match '^[A-Za-z][A-Za-z0-9_.:-]{0,160}$' -and $key -notmatch '(?i)token|secret|device|account.?id|authorization|cookie|header|flow.?id|verification|subscription.?id|receipt|ipaddress' -and $key -notmatch '^[a-fA-F0-9]{32}$' -and @($script:sensitive | Where-Object { $_ -ceq $key }).Count -eq 0)
   if($script:known.Contains($key) -or $dynamicSafe) {
    $outputKey=[string]$key
    if($fields.Contains($outputKey)){$unknown++;$outputKey='case_collision_'+$unknown}
    $fields[$outputKey]=Get-SafeShape $value[$key] ($depth+1)
   }
   else { $unknown++; $fields['unnamed_field_'+$unknown]=Get-SafeShape $value[$key] ($depth+1) }
  }
  return @{type='object';field_count=$value.Count;omitted_field_count=($value.Count-$fields.Count);unknown_field_count=$unknown;fields=$fields}
 }
 if($value -is [array]) {
  $sample=@(); foreach($v in ($value | Select-Object -First 3)) { $sample+=Get-SafeShape $v ($depth+1) }
  return @{type='array';count=$value.Count;sample=$sample;sample_limit=3}
 }
 if($value -is [bool]) { return @{type='boolean';value=$value} }
 if($value -is [DateTime] -or $value -is [DateTimeOffset]) { return @{type='timestamp';value=$value.ToUniversalTime().ToString('o')} }
 if($value -is [ValueType]) { return @{type='number';value=$value} }
 # String values never leave memory. Generic classifications are not verbatim text.
 $str=[string]$value
 $shape=@{type='string';length=$str.Length}
 if($str -match '(?i)\bnews\b|\bmotd\b'){$shape.news_or_motd_term_present=$true}
 if($str -match '(?i)battle\s*pass'){$shape.battlepass_term_present=$true}
 if($str -match '^\s*[\{\[]') { try { $embedded=ConvertFrom-Json -InputObject $str -AsHashtable -Depth 100 -NoEnumerate; if($embedded -is [Collections.IDictionary] -or $embedded -is [array]) { $shape.embedded_json=Get-SafeShape $embedded ($depth+1) } } catch {} }
 return $shape
}

function Get-SafeSemanticFacts($value) {
 $facts=[Collections.Generic.List[object]]::new()
 function Visit-SemanticFacts($node) {
  if($facts.Count -ge 250){return}
  if($node -is [Collections.IDictionary]) {
   foreach($key in $node.Keys) {
    $child=$node[$key]
    if($child -is [string] -and $key -match '(?i)^(rank|rankName|currentRank|highestRank|division|divisionName|rankingType|gameMode|gameId|mode|track|trackId|trackguid|trackName|season|seasonId|version)$' -and $child.Length -le 100 -and $child -match '^[A-Za-z0-9 _.:/-]+$' -and @($script:sensitive | Where-Object {$_ -ceq $child}).Count -eq 0) {
     $facts.Add([ordered]@{field=[string]$key;value=$child})
    }
    Visit-SemanticFacts $child
   }
  } elseif($node -is [array]) { foreach($child in $node){Visit-SemanticFacts $child} }
 }
 Visit-SemanticFacts $value
 return @($facts | Sort-Object { $_.field },{ $_.value } -Unique)
}

function Get-SafeRankRecords($data,[string]$probeName) {
 if($probeName -notin @('ranked','ranked_tracks','ranked_progress') -or $data -isnot [array]){return @()}
 $allowed=@('gameId','trackguid','rankingType','gameMode','seasonId','seasonBegin','seasonEnd','isCurrent','currentDivision','currentRank','highestDivision','highestRank','rankProgress','unrealRank','beginTime','endTime','divisionCount','leaderboardTrackingEventId','lastUpdated','promotionProgress')
 $rows=[Collections.Generic.List[object]]::new()
 foreach($item in ($data | Select-Object -First 200)) {
  if($item -isnot [Collections.IDictionary]){continue}
  $row=[ordered]@{}
  foreach($key in $allowed) {
   if(-not $item.Contains($key)){continue}
   $value=$item[$key]
   if($null -eq $value -or $value -is [bool] -or $value -is [ValueType] -or $value -is [DateTime] -or $value -is [DateTimeOffset]){$row[$key]=$value;continue}
   if($value -is [string] -and $value.Length -le 120 -and $value -match '^[A-Za-z0-9 _.:/-]+$' -and @($script:sensitive | Where-Object {$_ -ceq $value}).Count -eq 0){$row[$key]=$value}
  }
  $rows.Add($row)
 }
 return $rows.ToArray()
}

function Get-SafePlaylistRecords($data,[string]$probeName) {
 if($probeName -notin @('playlists','playlists_active','playlist_lookup_ropesmileduo','playlist_lookup_habanero_ropesmile_duos')){return @()}
 $rows=[Collections.Generic.List[object]]::new()
 function Visit-PlaylistRecords($node) {
  if($rows.Count -ge 250){return}
  if($node -is [Collections.IDictionary]) {
   $values=@($node.Values | Where-Object {$_ -is [string]})
   $isRelevant=@($values | Where-Object {$_ -match '(?i)(default|nobuild|zero.?build|reload|ropesmile|habanero|figment|bling|pimlico|radiant|trios)'}).Count -gt 0
   if($isRelevant) {
    $row=[ordered]@{}
    foreach($key in @('id','name','playlist_name','display_name','subName','gameType','ratingType','minPlayers','maxPlayers','maxTeamCount','maxTeamSize','showInFrontend','hidden')) {
     if(-not $node.Contains($key)){continue}
     $value=$node[$key]
     if($null -eq $value -or $value -is [bool] -or $value -is [ValueType]){$row[$key]=$value;continue}
     if($value -is [string] -and $value.Length -le 160 -and $value -match '^[A-Za-z0-9 _.:/()&''+-]+$' -and $value -notmatch '^[a-fA-F0-9]{32}$' -and @($script:sensitive | Where-Object {$_ -ceq $value}).Count -eq 0){$row[$key]=$value}
    }
    if($row.Count -gt 0){$rows.Add($row)}
   }
   foreach($child in $node.Values){Visit-PlaylistRecords $child}
  } elseif($node -is [array]) { foreach($child in $node){Visit-PlaylistRecords $child} }
 }
 Visit-PlaylistRecords $data
 return $rows.ToArray()
}

function Find-SpritePayload($data,[string]$probeName) {
 $queue=[Collections.Generic.Queue[object]]::new()
 $queue.Enqueue(@{node=$data;path='root';depth=0})
 $visited=0
 while($queue.Count -gt 0 -and $visited -lt 40) {
  $entry=$queue.Dequeue();$visited++
  $node=$entry.node
  if($probeName -eq 'sprites_versions') {
   if($node -is [array] -and ($node.Count -eq 0 -or $node[0] -is [string] -or ($node[0] -is [Collections.IDictionary] -and $node[0].Contains('version')))){return @{found=$true;value=$node;path=$entry.path}}
   if($node -is [Collections.IDictionary] -and $node.Contains('versions') -and $node.versions -is [array]){return @{found=$true;value=$node.versions;path=($entry.path+'.versions')}}
  } elseif($probeName -in @('sprites_catalog','sprites_collection_current')) {
   if($node -is [Collections.IDictionary] -and $node.Contains('sprites') -and ($node.Contains('gameVersion') -or $node.Contains('levelUpCurve'))){return @{found=$true;value=$node;path=$entry.path}}
  } elseif($probeName -eq 'sprites_collection_all') {
   if($node -is [Collections.IDictionary] -and $node.Contains('versions') -and ($node.Contains('versionCount') -or $node.Contains('ownedVariants'))){return @{found=$true;value=$node;path=$entry.path}}
  }
  if($entry.depth -ge 3 -or $node -isnot [Collections.IDictionary]){continue}
  foreach($key in $node.Keys) {
   if($key -match '^(?i:data|result|payload|catalog|collection|response)$' -and ($node[$key] -is [Collections.IDictionary] -or $node[$key] -is [array])){$queue.Enqueue(@{node=$node[$key];path=($entry.path+'.'+$key);depth=$entry.depth+1})}
  }
 }
 return @{found=$false;value=$null;path='unlocated'}
}

function Get-SafeSpriteProjection($data,[string]$probeName) {
 if($probeName -notin @('sprites_versions','sprites_catalog','sprites_collection_all','sprites_collection_current')){return $null}
 if($null -eq $data){return @{type='null'}}
 $located=Find-SpritePayload $data $probeName
 if(-not $located.found){return @{type='unexpected_sprite_shape';root_type=if($data -is [Collections.IDictionary]){'object'}elseif($data -is [array]){'array'}else{'other'};root_field_names=if($data -is [Collections.IDictionary]){@($data.Keys|Where-Object{$_ -match '^[A-Za-z][A-Za-z0-9_]{0,50}$' -and $_ -notmatch '(?i)token|secret|device|account|authorization|cookie|header|receipt'}|Select-Object -First 30)}else{@()}}}
 $data=$located.value
 if($probeName -eq 'sprites_versions') {
  $source=$data
  $rows=@()
  foreach($item in ($source|Select-Object -First 100)) {
   if($item -is [string] -and $item.Length -le 40 -and $item -match '^[0-9A-Za-z_.:-]+$'){$rows+=@{version=$item};continue}
   if($item -isnot [Collections.IDictionary]){continue}
   $row=[ordered]@{}
   foreach($key in @('version','generated','isCurrent','familyCount')){if($item.Contains($key)){$value=$item[$key];if($value -isnot [string] -or ($value.Length -le 40 -and $value -match '^[A-Za-z0-9_.:-]+$')){$row[$key]=$value}}}
   $rows+=$row
  }
  return [ordered]@{type='sprite_versions_summary';container_path=$located.path;version_count=$source.Count;versions=$rows}
 }
 if($data -isnot [Collections.IDictionary]){return @{type='unexpected_sprite_shape'}}
 $summary=[ordered]@{type=$(if($probeName -eq 'sprites_catalog'){'sprite_catalog_summary'}elseif($probeName -eq 'sprites_collection_current'){'sprite_collection_current_summary'}else{'all_sprite_collections_summary'});container_path=$located.path}
 foreach($key in @('gameVersion','generated','hotfixApplied','isCurrent','versionCount','familyCount','ownedVariants','totalVariants','ownedFamilies','totalFamilies','completionPercent')) {
  if($data.Contains($key)){$value=$data[$key];if($value -isnot [string] -or ($value.Length -le 40 -and $value -match '^[A-Za-z0-9_.:-]+$')){$summary[$key]=$value}}
 }
 foreach($key in @('sprites','levelUpCurve','events','spawnLists','versions')){if($data.Contains($key) -and $data[$key] -is [array]){$summary[$key+'Count']=$data[$key].Count}}
 if($data.Contains('currency') -and $data.currency -is [array]){$summary.currencyCount=$data.currency.Count}
 if($data.Contains('versions') -and $data.versions -is [array]) {
  $versionRows=@()
  foreach($item in ($data.versions|Select-Object -First 100)) {
   if($item -isnot [Collections.IDictionary]){continue}
   $row=[ordered]@{}
   foreach($key in @('gameVersion','version','generated','isCurrent','ownedVariants','totalVariants','ownedFamilies','totalFamilies','completionPercent')){if($item.Contains($key)){$value=$item[$key];if($value -isnot [string] -or ($value.Length -le 40 -and $value -match '^[A-Za-z0-9_.:-]+$')){$row[$key]=$value}}}
   if($item.Contains('sprites') -and $item.sprites -is [array]){$row.spriteFamilyCount=$item.sprites.Count}
   if($item.Contains('currency') -and $item.currency -is [array]){$row.currencyCount=$item.currency.Count}
   $versionRows+=$row
  }
  $summary.versionSummaries=$versionRows
 }
 if($probeName -eq 'sprites_collection_current' -and $data.sprites -is [array]) {
  $families=@()
  foreach($family in ($data.sprites|Select-Object -First 100)) {
   if($family -isnot [Collections.IDictionary]){continue}
   $row=[ordered]@{}
   foreach($key in @('id','name','rarity','dexNumber','owned','ownedVariants')){if($family.Contains($key)){$v=$family[$key];if($v -isnot [string] -or ($v.Length -le 100 -and $v -match '^[A-Za-z0-9 _.,:;/()&''+!?-]+$' -and @($script:sensitive|Where-Object{$_ -ceq $v}).Count -eq 0)){$row[$key]=$v}}}
   $row.variants=@()
   foreach($variant in @($family.variants|Select-Object -First 100)) {
    if($variant -isnot [Collections.IDictionary]){continue}
    $vr=[ordered]@{}
    foreach($key in @('id','variant','name','rarity','dropChancePercent','owned','count','xp','mastered')){if($variant.Contains($key)){$v=$variant[$key];if($v -isnot [string] -or ($v.Length -le 100 -and $v -match '^[A-Za-z0-9 _.,:;/()&''+!?-]+$' -and @($script:sensitive|Where-Object{$_ -ceq $v}).Count -eq 0)){$vr[$key]=$v}}}
    $row.variants+=,$vr
   }
   $families+=,$row
  }
  $summary.families=$families
 }
 return $summary
}

function Get-SafeEventDetailProjection($data,[string]$probeName) {
 if($probeName -notin @('events_scoring_solo_detail','events_cashprize_solo_detail','events_scoring_solo_final','events_cashprize_solo_final','events_cashprize_solo_final_currency') -or $data -isnot [array]){return $null}
 if($probeName -in @('events_scoring_solo_detail','events_scoring_solo_final')) {
  $rows=@()
  foreach($rule in ($data|Select-Object -First 20)) {
   if($rule -isnot [Collections.IDictionary]){continue}
   $row=[ordered]@{}
   foreach($key in @('trackedStat','matchRule')){if($rule[$key] -is [string] -and $rule[$key].Length -le 100 -and $rule[$key] -match '^[A-Za-z0-9_.:-]+$'){$row[$key]=$rule[$key]}}
   $row.tiers=@()
   foreach($tier in @($rule.rewardTiers|Select-Object -First 100)){if($tier -is [Collections.IDictionary]){$row.tiers+=,[ordered]@{keyValue=$tier.keyValue;pointsEarned=$tier.pointsEarned;multiplicative=$tier.multiplicative}}}
   $rows+=,$row
  }
  return [ordered]@{type='event_scoring_detail';ruleCount=$data.Count;rules=$rows}
 }
 $rows=@()
 foreach($prize in ($data|Select-Object -First 20)) {
  if($prize -isnot [Collections.IDictionary]){continue}
  $row=[ordered]@{}
  if($prize.scoringType -is [string] -and $prize.scoringType -match '^[A-Za-z0-9_.:-]{1,80}$'){$row.scoringType=$prize.scoringType}
  $row.ranks=@()
  foreach($rank in @($prize.ranks|Select-Object -First 100)) {
   if($rank -isnot [Collections.IDictionary]){continue}
   $rankRow=[ordered]@{threshold=$rank.threshold;payouts=@()}
   foreach($payout in @($rank.payouts|Select-Object -First 20)) {
    if($payout -isnot [Collections.IDictionary]){continue}
    $payoutRow=[ordered]@{}
    foreach($key in @('rewardType','rewardMode')){if($payout[$key] -is [string] -and $payout[$key] -match '^[A-Za-z0-9_.:-]{1,80}$'){$payoutRow[$key]=$payout[$key]}}
    if($payout.value -is [string] -and (($payout.value -match '^\$?[0-9,]+(\.[0-9]{1,2})?$' -and $payout.value.Length -le 20) -or $payout.value -in @('USD','EUR','GBP'))){$payoutRow.value=$payout.value}
    elseif($payout.value -is [string]){$payoutRow.value_shape=@{length=$payout.value.Length}}
    if($payout.quantity -is [ValueType]){$payoutRow.quantity=$payout.quantity}
    if($payout.notifiesPlayer -is [bool]){$payoutRow.notifiesPlayer=$payout.notifiesPlayer}
    $rankRow.payouts+=,$payoutRow
   }
   $row.ranks+=,$rankRow
  }
  $rows+=,$row
 }
 return [ordered]@{type='event_cashprize_detail';scoringGroupCount=$data.Count;groups=$rows}
}

function Get-SafeAccessDenialProjection($data,[string]$probeName) {
 if($probeName -notin @('friends_summary_diagnosis','events_player_session_diagnosis') -or $data -isnot [Collections.IDictionary]){return $null}
 $result=[ordered]@{type='access_denial_diagnosis';field_names=@($data.Keys|Where-Object{$_ -match '^[A-Za-z][A-Za-z0-9_]{0,60}$' -and $_ -notmatch '(?i)token|secret|device|account|authorization|cookie|header|receipt'}|Select-Object -First 30)}
 if($data.status -is [ValueType]){$result.status=$data.status}
 foreach($key in @('required','current')) {
  $values=if($data[$key] -is [array]){@($data[$key])}else{@($data[$key])}
  $plans=@($values|Where-Object{$_ -is [string] -and $_ -in @('free','pro','custom','enterprise','basic')})
  if($plans.Count -gt 0){$result[$key]=$plans}
 }
 if($data.error -is [string]) {
  $result.error_category=if($data.error -match '(?i)plan|tier|subscription|upgrade'){'plan_or_tier'}elseif($data.error -match '(?i)scope|permission|forbidden'){'scope_or_permission'}elseif($data.error -match '(?i)token|auth'){'authentication'}else{'unclassified'}
 }
 return $result
}

function Get-SafeShopProjection($data,[string]$probeName) {
 if($probeName -ne 'shop_free_offers'){return $null}
 $source=if($data -is [Collections.IDictionary] -and $data.Contains('data') -and $data.data -is [Collections.IDictionary]){$data.data}else{$data}
 if($source -isnot [Collections.IDictionary]){return @{type='unexpected_shop_shape'}}
 $result=[ordered]@{type='shop_free_offer_summary';storefrontCount=0;entryCount=0;zeroFinalPriceCount=0;zeroOffers=@()}
 if($source.expiration -is [string] -and $source.expiration -match '^20[0-9]{2}-[0-9]{2}-[0-9]{2}T'){$result.expiration=$source.expiration}
 if($source.refreshIntervalHrs -is [ValueType]){$result.refreshIntervalHrs=$source.refreshIntervalHrs}
 if($source.storefronts -isnot [array]){return $result}
 $result.storefrontCount=$source.storefronts.Count
 foreach($storefront in ($source.storefronts|Select-Object -First 200)) {
  if($storefront -isnot [Collections.IDictionary] -or $storefront.catalogEntries -isnot [array]){continue}
  foreach($entry in ($storefront.catalogEntries|Select-Object -First 2000)) {
   if($entry -isnot [Collections.IDictionary]){continue}
   $result.entryCount++
   $zero=@($entry.prices|Where-Object{$_ -is [Collections.IDictionary] -and $_.finalPrice -is [ValueType] -and $_.finalPrice -eq 0})
   if($zero.Count -eq 0){continue}
   $result.zeroFinalPriceCount++
   if($result.zeroOffers.Count -ge 100){continue}
   $row=[ordered]@{}
   foreach($key in @('title','sectionDisplayName')){if($entry[$key] -is [string] -and $entry[$key].Length -le 120 -and $entry[$key] -match '^[A-Za-z0-9 _.,:;/()&''+!?-]+$'){$row[$key]=$entry[$key]}}
   $row.prices=@($zero|Select-Object -First 5|ForEach-Object{[ordered]@{currencyType=if($_.currencyType -is [string] -and $_.currencyType -match '^[A-Za-z0-9_]{1,30}$'){$_.currencyType}else{$null};regularPrice=$_.regularPrice;finalPrice=$_.finalPrice}})
   $row.grantCount=if($entry.itemGrants -is [array]){$entry.itemGrants.Count}else{0}
   $row.grants=@($entry.itemGrants|Select-Object -First 8|ForEach-Object{if($_ -is [Collections.IDictionary]){[ordered]@{type=if($_.cosmetic.type -is [string] -and $_.cosmetic.type -match '^[A-Za-z0-9_ ]{1,50}$'){$_.cosmetic.type}else{$null};displayName=if($_.cosmetic.displayName -is [string] -and $_.cosmetic.displayName.Length -le 100 -and $_.cosmetic.displayName -match '^[A-Za-z0-9 _.,:;/()&''+!?-]+$'){$_.cosmetic.displayName}else{$null};quantity=$_.quantity}}})
   $result.zeroOffers+=,$row
  }
 }
 return $result
}

function Get-SafeEligibilityProjection($data,[string]$probeName) {
 if($probeName -ne 'events_eligibility_solo' -or $data -isnot [Collections.IDictionary]){return $null}
 $result=[ordered]@{type='event_eligibility_summary'}
 foreach($key in @('eventId','eventWindowId')){if($data[$key] -is [string] -and $data[$key].Length -le 180 -and $data[$key] -match '^[A-Za-z0-9_:-]+$'){$result[$key]=$data[$key]}}
 if($data.isEligible -is [bool]){$result.isEligible=$data.isEligible}
 foreach($group in @('verifiedRequirements','unverifiedRequirements')) {
  if($data[$group] -isnot [array]){continue}
  $result[$group+'Count']=$data[$group].Count
  $rows=@()
  foreach($item in ($data[$group]|Select-Object -First 40)) {
   if($item -isnot [Collections.IDictionary]){continue}
   $row=[ordered]@{}
   foreach($key in @('label','type','description','met','threshold','estimatedCurrentLevel','estimatedMet')) {
    if(-not $item.Contains($key)){continue}
    $v=$item[$key]
    if($null -eq $v -or $v -is [bool] -or $v -is [ValueType]){$row[$key]=$v}
    elseif($v -is [string] -and $v.Length -le 180 -and $v -match '^[A-Za-z0-9 _.,:;/()&''+!?-]+$' -and @($script:sensitive|Where-Object{$_ -ceq $v}).Count -eq 0){$row[$key]=$v}
   }
   $rows+=$row
  }
  $result[$group]=$rows
 }
 return $result
}

function Get-SafeEventRecords($data,[string]$probeName) {
 if($probeName -notin @('events_global','events_tracker','events_player','events_player_session','events_tokens','power_rankings_player')){return @()}
 $rows=[Collections.Generic.List[object]]::new()
 function Visit-EventRecords($node) {
  if($rows.Count -ge 500){return}
  if($node -is [Collections.IDictionary]) {
   $isRecord=($node.Contains('eventId') -or $node.Contains('eventWindowId') -or ($node.Contains('id') -and ($node.Contains('regions') -or $node.Contains('shortTitle'))))
   if($isRecord) {
    $row=[ordered]@{}
    foreach($key in @('id','eventId','eventWindowId','matchedEventId','displayDataId','eventGroup','name','shortTitle','titleLine1','titleLine2','scheduleInfo','region','matchedRegion','platform','round','rank','score','bestRank','peakPr','deltaPr','countingEvents','beginTime','endTime','announcementTime','countdownBeginTime','lastUpdated','isTBD','canLiveSpectate','requireAllTokens','requireAnyTokens','isEligible')) {
     if(-not $node.Contains($key)){continue}
     $value=$node[$key]
     if($null -eq $value -or $value -is [bool] -or $value -is [ValueType] -or $value -is [DateTime] -or $value -is [DateTimeOffset]){$row[$key]=$value;continue}
     if($value -is [string] -and $value.Length -le 220 -and $value -match '^[A-Za-z0-9 _.,:;/()&''+!?-]+$' -and $value -notmatch '^[a-fA-F0-9]{32}$' -and @($script:sensitive|Where-Object{$_ -ceq $value}).Count -eq 0){$row[$key]=$value}
    }
    foreach($key in @('regions','platforms','verifiedRequirements','unverifiedRequirements')) {
     if($node.Contains($key) -and $node[$key] -is [array]){$row[$key]=@($node[$key]|Where-Object{$_ -is [string] -and $_.Length -le 100 -and $_ -match '^[A-Za-z0-9 _.:/-]+$'}|Select-Object -First 30)}
    }
    if($node.Contains('link') -and $node.link -is [string]){$row.link_present=$true}
    if($row.Count -gt 0){$rows.Add($row)}
   }
   foreach($child in $node.Values){Visit-EventRecords $child}
  } elseif($node -is [array]) {foreach($child in $node){Visit-EventRecords $child}}
 }
 Visit-EventRecords $data
 return $rows.ToArray()
}

function Get-RelationshipAndSessionFacts($data,[string]$probeName) {
 if($probeName -notmatch '^friends_' -and $probeName -notin @('events_tracker','events_player','events_player_session','events_tokens')){return @{}}
 $fieldNames=[Collections.Generic.HashSet[string]]::new([StringComparer]::OrdinalIgnoreCase)
 $safeValues=[Collections.Generic.List[object]]::new()
 function Visit-RelationshipFacts($node) {
  if($node -is [Collections.IDictionary]) {
   foreach($key in $node.Keys) {
    $child=$node[$key]
    if($key -match '(?i)(presence|online|status|state|lastSeen|platform|product|session|playlist|region|party|joinable|relationship)') {
     [void]$fieldNames.Add([string]$key)
     if($child -is [string] -and $key -notmatch '(?i)(id|name)' -and $child.Length -le 100 -and $child -match '^[A-Za-z0-9 _.:/-]+$' -and @($script:sensitive|Where-Object{$_ -ceq $child}).Count -eq 0){$safeValues.Add([ordered]@{field=[string]$key;value=$child})}
    }
    Visit-RelationshipFacts $child
   }
  } elseif($node -is [array]) {foreach($child in $node){Visit-RelationshipFacts $child}}
 }
 Visit-RelationshipFacts $data
 return [ordered]@{field_names=@($fieldNames|Sort-Object);safe_values=@($safeValues|Sort-Object {$_.field},{$_.value} -Unique|Select-Object -First 100)}
}

function Get-SafeEventAggregateProjection($data,[string]$probeName) {
 if($probeName -notin @('events_cashprizes','events_scoring')){return $null}
 $summary=[ordered]@{type='event_rule_aggregate_summary';root_type=if($data -is [Collections.IDictionary]){'object'}elseif($data -is [array]){'array'}else{'other'}}
 if($data -is [Collections.IDictionary]) {
  $summary.top_level_count=$data.Count
  $samples=@()
  foreach($key in ($data.Keys|Select-Object -First 25)) {
   $child=$data[$key];$row=[ordered]@{}
   if($key -match '^[A-Za-z0-9_.:-]{1,180}$' -and $key -notmatch '^[a-fA-F0-9]{32}$' -and @($script:sensitive|Where-Object{$_ -ceq $key}).Count -eq 0){$row.key=[string]$key}
   if($child -is [Collections.IDictionary]){$row.child_type='object';$row.field_count=$child.Count;foreach($field in @('scoringType','rewardType','rewardMode')){if($child.Contains($field)-and$child[$field]-is[string]-and$child[$field].Length-le80-and$child[$field]-match'^[A-Za-z0-9 _.:/-]+$'){$row[$field]=$child[$field]}};foreach($field in @('ranks','payouts')){if($child.Contains($field)-and$child[$field]-is[array]){$row[$field+'Count']=$child[$field].Count}}}
   elseif($child -is [array]){$row.child_type='array';$row.count=$child.Count}
   else{$row.child_type=if($null-eq$child){'null'}else{$child.GetType().Name}}
   $samples+=$row
  }
  $summary.samples=$samples
 } elseif($data -is [array]) {
  $summary.top_level_count=$data.Count
  $summary.sample=@($data|Select-Object -First 3|ForEach-Object{if($_-is[Collections.IDictionary]){[ordered]@{field_count=$_.Count;ranksCount=if($_.ranks-is[array]){$_.ranks.Count}else{$null}}}else{@{type=$_.GetType().Name}}})
 }
 return $summary
}

function Get-MatchingValues($value,[string]$pattern) {
 $result=[Collections.Generic.List[string]]::new()
 if($value -is [Collections.IDictionary]) {
  foreach($key in $value.Keys) {
   if($key -match $pattern -and $value[$key] -is [string]) { $result.Add($value[$key]) }
   foreach($found in @(Get-MatchingValues $value[$key] $pattern)) { $result.Add($found) }
  }
 } elseif($value -is [array]) { foreach($v in $value) { foreach($found in @(Get-MatchingValues $v $pattern)) { $result.Add($found) } } }
 return $result.ToArray()
}

function Test-Identity($value,$expected) {
 $ids=@(Get-MatchingValues $value '(?i)^(account_?id|epic_?account_?id)$' | Sort-Object -Unique)
 return ($ids.Count -eq 1 -and $ids[0] -ceq $expected)
}

function Assert-Safe($text) {
 foreach($value in $script:sensitive) { if($value.Length -ge 4 -and $text.Contains($value)) { throw 'Output suppressed by sensitive-value guard' } }
}

function Get-Observations($data,$raw,[string]$probeName='') {
 $r=[ordered]@{}
 $r.reported_http_error_codes=@([regex]::Matches($raw,'(?i)(?:status code does not indicate success:\s*|upstream[\s_-]*(?:status|error)?[\s":=]*)([45][0-9]{2})') | ForEach-Object { [int]$_.Groups[1].Value } | Sort-Object -Unique)
 $r.reported_http_error_basis='Recognized response-text pattern only; not an independently observed upstream HTTP exchange.'
 $r.no_battle_pass_extracted_message=($raw -match '(?i)no battle pass has been extracted yet')
 $r.news_or_motd_fields_present=($raw -match '(?i)"(?:motds?|battleroyalenews|news)"\s*:')
 $r.cosmetic_template_strings_present=($raw -match '(?i)Athena(?:Character|Backpack|Pickaxe|Glider|Dance|ItemWrap):')
 $r.quest_template_strings_present=($raw -match '(?i)Quest:')
 $r.offer_guid_field_present=($raw -match '"offerGuid"\s*:')
 $r.explicit_unlock_or_release_fields_present=($raw -match '(?i)"(?:unlockLevel|releaseDate|prerequisites|unlockRequirements)"\s*:')
 $r.semantic_facts=if($probeName -in @('ranked','ranked_tracks','ranked_progress')){@(Get-SafeSemanticFacts $data)}else{@()}
 $r.rank_records=@(Get-SafeRankRecords $data $probeName)
 $r.playlist_records=@(Get-SafePlaylistRecords $data $probeName)
 $r.event_records=@(Get-SafeEventRecords $data $probeName)
 $r.relationship_and_session_facts=Get-RelationshipAndSessionFacts $data $probeName
 $r.stats_counter_fields_present=($raw -match '(?i)"[^"\\]*(?:kills|matches|wins|minutes|score|placetop|playersoutlived)[^"\\]*"\s*:')
 $r.rank_fields_present=($raw -match '(?i)"(?:rank|rankName|division|divisionName|currentDivision|highestDivision|progress|isCurrent|trackId|gameMode)"\s*:')
 $r.sprite_collection_fields_present=($raw -match '(?i)"(?:owned|mastered|completionPercentage|equipped|starter|seasonCurrency|families|variants)"\s*:')
 return $r
}

function Get-AuthErrorCategory([string]$raw,[int]$status) {
 if($status -ge 200 -and $status -lt 300) { return 'none' }
 if($raw -match '(?i)errors\.com\.epicgames\.account\.invalid_account_credentials|invalid[_ -]?account[_ -]?credentials') { return 'invalid_account_credentials' }
 if($raw -match '(?i)device[_ -]?auth.{0,80}(?:invalid|not found|missing|revoked)|(?:invalid|not found|missing|revoked).{0,80}device[_ -]?auth') { return 'invalid_or_missing_device_auth' }
 if($raw -match '(?i)invalid[_ -]?client|client.{0,40}(?:mismatch|not allowed|unauthorized)') { return 'invalid_or_mismatched_client' }
 if($raw -match '(?i)invalid[_ -]?grant') { return 'invalid_grant' }
 if($raw -match '(?i)(?:required|missing|validation|invalid).{0,60}(?:accountId|deviceId|secret)|(?:accountId|deviceId|secret).{0,60}(?:required|missing|validation|invalid)') { return 'request_validation_failed' }
 if($raw -match '(?i)upstream[\s_-]*(?:status|error)?[\s\"'':=]*(401|403)') { return 'upstream_auth_rejected' }
 if($status -ge 500) { return 'provider_server_error' }
 return 'unclassified_error'
}

function Save-Report($name,$report) {
 $json=ConvertTo-Json -InputObject $report -Depth 60
 Assert-Safe $json
 $path=Join-Path $script:outputDir ($name+'.json')
 [IO.File]::WriteAllText($path,$json,[Text.UTF8Encoding]::new($false))
 $status=if($null -ne $report.http_status){[string]$report.http_status}else{'none'}
 $entry="`n### Probe group: $name — $($report.requested_at_utc)`n`n- Operation: $($report.method) ``$($report.endpoint)``; HTTP status: $status; outcome: $($report.outcome).`n- Sanitized evidence: ``evidence/sanitized/api-fortnite/$($script:runId)/$name.json``.`n- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.`n"
 Assert-Safe $entry
 [IO.File]::AppendAllText((Join-Path $root 'docs/investigation-log.md'),$entry,[Text.UTF8Encoding]::new($false))
 Write-Output ("Saved sanitized probe group {0}: HTTP {1}, {2}" -f $name,$status,$report.outcome)
}

function Invoke-NamedProbe([string]$name) {
 if(-not $script:routes.Contains($name)) { throw 'Operation not allowlisted' }
 if($script:seen.Contains($name) -or $script:requestCount -ge 15 -or $script:elapsed.Elapsed.TotalMinutes -ge 15) { throw 'Probe budget exceeded' }
 [void]$script:seen.Add($name); $script:requestCount++
 $route=$script:routes[$name]
 if($route.private -and (-not $script:identityVerified -or -not $script:accessToken)) { throw 'Private authentication gate closed' }
 Start-Sleep -Seconds 1
 $endpoint=$route.path
 $actualPath=$endpoint.Replace('{accountId}', $script:accountId)
 if($actualPath.Contains('{currentSeason}')) { if($null -eq $script:currentSeason){throw 'No verified season parameter'}; $actualPath=$actualPath.Replace('{currentSeason}',[string]$script:currentSeason) }
 $report=[ordered]@{provider='api-fortnite.com';method=$route.method;endpoint=$endpoint;requested_at_utc=[DateTime]::UtcNow.ToString('o');response_at_utc=$null;http_status=$null;response_date_utc=$null;auth=$(if($route.private){'provider key + player token'}elseif($name -eq 'authentication'){'provider key + device credentials'}else{'provider key only'});outcome='transport_failure';shape=$null;observations=$null}
 $request=$null;$response=$null;$cts=$null;$data=$null;$raw=$null
 try {
  $request=[Net.Http.HttpRequestMessage]::new([Net.Http.HttpMethod]::new($route.method),('https://prod.api-fortnite.com'+$actualPath))
  [void]$request.Headers.TryAddWithoutValidation('x-api-key',$script:apiKey)
  if($route.private) { [void]$request.Headers.TryAddWithoutValidation('x-fortnite-token',$script:accessToken) }
  if($name -eq 'authentication') {
   # Sole POST exception explicitly approved by user; token issuance, not a data read.
   $authBody=@{accountId=$script:accountId;deviceId=$script:deviceId;secret=$script:deviceSecret} | ConvertTo-Json -Compress
   $request.Content=[Net.Http.StringContent]::new($authBody,[Text.Encoding]::UTF8,'application/json')
  }
  $cts=[Threading.CancellationTokenSource]::new([TimeSpan]::FromSeconds(20))
  $response=$script:client.SendAsync($request,[Net.Http.HttpCompletionOption]::ResponseHeadersRead,$cts.Token).GetAwaiter().GetResult()
  $report.http_status=[int]$response.StatusCode
  $report.response_at_utc=[DateTime]::UtcNow.ToString('o')
  if($response.Headers.Date) { $report.response_date_utc=([DateTimeOffset]$response.Headers.Date).UtcDateTime.ToString('o') }
  $stream=$response.Content.ReadAsStreamAsync($cts.Token).GetAwaiter().GetResult()
  $buffer=[byte[]]::new(8192);$memory=[IO.MemoryStream]::new()
  try {
   while(($n=$stream.ReadAsync($buffer,0,$buffer.Length,$cts.Token).GetAwaiter().GetResult()) -gt 0) { if($memory.Length+$n -gt 10MB){throw 'Response size limit'}; $memory.Write($buffer,0,$n) }
   $raw=[Text.Encoding]::UTF8.GetString($memory.ToArray())
  } finally { $memory.Dispose();$stream.Dispose() }
  try { $data=ConvertFrom-Json -InputObject $raw -AsHashtable -Depth 100 -NoEnumerate } catch { $data=$null }
  Add-SensitiveFields $data
  $report.outcome=if($report.http_status -ge 200 -and $report.http_status -lt 300){'http_success'}else{'http_error'}
  if($name -eq 'authentication') {
   $tokens=@(Get-MatchingValues $data '(?i)^access_?token$' | Sort-Object -Unique)
   $script:identityVerified=Test-Identity $data $script:accountId
   $returnedDevices=@(Get-MatchingValues $data '(?i)^device_?id$')
   $returnedSecrets=@(Get-MatchingValues $data '(?i)^secret$')
   $deviceChanged=(@($returnedDevices | Where-Object {$_ -cne $script:deviceId}).Count -gt 0 -or @($returnedSecrets | Where-Object {$_ -cne $script:deviceSecret}).Count -gt 0)
   $report.shape=@{type='authentication_response_suppressed';identity_matches_expected=$script:identityVerified;access_token_present=($tokens.Count -eq 1);refresh_token_present=(@(Get-MatchingValues $data '(?i)^refresh_?token$').Count -gt 0);changed_device_credentials_detected=$deviceChanged;safe_structure=(Get-SafeShape $data)}
   $report.observations=Get-Observations $data $raw $name
   $report.observations.auth_error_category=Get-AuthErrorCategory $raw $report.http_status
   if($report.http_status -eq 200 -and $script:identityVerified -and $tokens.Count -eq 1) { $script:accessToken=$tokens[0];$script:sensitive.Add($tokens[0]) }
   else { $script:identityVerified=$false;$script:accessToken=$null;$report.outcome='private_auth_gate_failed' }
  } else {
   $spriteProjection=Get-SafeSpriteProjection $data $name
   $eventProjection=Get-SafeEventAggregateProjection $data $name
   $eligibilityProjection=Get-SafeEligibilityProjection $data $name
   $detailProjection=Get-SafeEventDetailProjection $data $name
   $denialProjection=Get-SafeAccessDenialProjection $data $name
   $shopProjection=Get-SafeShopProjection $data $name
   $report.shape=if($null -ne $spriteProjection){$spriteProjection}elseif($null -ne $eventProjection){$eventProjection}elseif($null -ne $eligibilityProjection){$eligibilityProjection}elseif($null -ne $detailProjection){$detailProjection}elseif($null -ne $denialProjection){$denialProjection}elseif($null -ne $shopProjection){$shopProjection}elseif($null -ne $data){Get-SafeShape $data}else{@{type='non_json_or_null';length=$raw.Length}}
   $report.observations=Get-Observations $data $raw $name
  }
  if($name -eq 'season' -and $report.http_status -eq 200) {
   $candidate=$data
   if($data -is [Collections.IDictionary] -and $data.Contains('data')){$candidate=$data.data}
   if($candidate -is [Collections.IDictionary]) { foreach($key in @('seasonNumber','season','currentSeason')) { if($candidate[$key] -is [ValueType] -and $candidate[$key] -isnot [bool] -and [double]$candidate[$key] -gt 0 -and [double]$candidate[$key] -lt 1000 -and [double]$candidate[$key] -eq [int]$candidate[$key]){$script:currentSeason=[int]$candidate[$key];break} } }
  }
 } catch {
  # Never print exception messages, URLs, headers, bodies or stack traces.
  $report.outcome='transport_or_processing_failure';$script:stop=$true
 } finally {
  $report.completed_at_utc=[DateTime]::UtcNow.ToString('o')
  if($response){$response.Dispose()};if($request){$request.Dispose()};if($cts){$cts.Dispose()}
  $raw=$null;$data=$null;$authBody=$null
 }
 Save-Report $name $report
 if($report.http_status -eq 429 -or ($report.http_status -ge 300 -and $report.http_status -lt 400)){$script:stop=$true}
 $script:lastStatus=$report.http_status
}

if($Mode -eq 'SelfTest') {
 $secret='synthetic-secret-never-export'
 $script:sensitive.Add($secret)
 $fixture=@{access_token=$secret;accountId='synthetic-owner';data=@{level=202;purchased=$false;unknownValue=$secret;items=@();message=$secret}}
 $shape=Get-SafeShape $fixture
 $text=ConvertTo-Json -InputObject $shape -Depth 50
 Assert-Safe $text
 if($shape.fields.data.fields.level.value -ne 202 -or $shape.fields.data.fields.purchased.value -ne $false -or $shape.fields.data.fields.items.count -ne 0){throw 'Shape preservation failed'}
 $caseMap=[Collections.Hashtable]::new([StringComparer]::Ordinal);$caseMap.Add('xp',1);$caseMap.Add('XP',2)
 $caseShape=Get-SafeShape $caseMap
 if($caseShape.field_count -ne 2 -or $caseShape.fields.Count -ne 2){throw 'Case-collision shape preservation failed'}
 $rankRows=@(Get-SafeRankRecords @(@{accountId=$secret;gameMode='Battle Royale';currentRank='Gold I';rankProgress=0.5}) 'ranked')
 $rankText=$rankRows|ConvertTo-Json -Depth 10
 Assert-Safe $rankText
 if($rankRows.Count -ne 1 -or $rankRows[0].gameMode -ne 'Battle Royale' -or $rankRows[0].Contains('accountId')){throw 'Safe rank record projection failed'}
 $spriteProjection=Get-SafeSpriteProjection @{gameVersion='42.20';isCurrent=$true;sprites=@(@{},@{});levelUpCurve=@(@{});events=@();spawnLists=@()} 'sprites_catalog'
 if($spriteProjection.gameVersion -ne '42.20' -or $spriteProjection.spritesCount -ne 2 -or $spriteProjection.levelUpCurveCount -ne 1){throw 'Sprite summary projection failed'}
 $wrappedSprite=Get-SafeSpriteProjection @{data=@{gameVersion='42.20';sprites=@(@{})}} 'sprites_catalog'
 if($wrappedSprite.container_path -ne 'root.data' -or $wrappedSprite.spritesCount -ne 1){throw 'Wrapped sprite projection failed'}
 $wrappedVersions=Get-SafeSpriteProjection @{data=@(@{version='42.20';familyCount=4})} 'sprites_versions'
 if($wrappedVersions.version_count -ne 1 -or $wrappedVersions.versions[0].version -ne '42.20'){throw 'Wrapped sprite versions projection failed'}
 $currentSprite=Get-SafeSpriteProjection @{data=@{gameVersion='42.20';ownedVariants=1;sprites=@(@{name='Safe Sprite';variants=@(@{name='Gold';owned=$true;count=1})})}} 'sprites_collection_current'
 if($currentSprite.families[0].variants[0].owned -ne $true){throw 'Current sprite variant projection failed'}
 $scoreDetail=Get-SafeEventDetailProjection @(@{trackedStat='PLACEMENT';matchRule='SUM';rewardTiers=@(@{keyValue=1;pointsEarned=10;multiplicative=$false})}) 'events_scoring_solo_detail'
 if($scoreDetail.rules[0].tiers[0].pointsEarned -ne 10){throw 'Scoring detail projection failed'}
 $denial=Get-SafeAccessDenialProjection @{error='Custom plan required';required=@('custom');current='pro'} 'events_player_session_diagnosis'
 if($denial.error_category -ne 'plan_or_tier' -or $denial.required[0] -ne 'custom'){throw 'Access denial projection failed'}
 $shop=Get-SafeShopProjection @{data=@{expiration='2026-09-17T00:00:00Z';storefronts=@(@{catalogEntries=@(@{title='Synthetic Free Item';prices=@(@{currencyType='MtxCurrency';regularPrice=100;finalPrice=0});itemGrants=@()})})}} 'shop_free_offers'
 if($shop.zeroFinalPriceCount -ne 1 -or $shop.zeroOffers[0].prices[0].finalPrice -ne 0){throw 'Shop free-offer projection failed'}
 $eligibility=Get-SafeEligibilityProjection @{eventId='event-safe';isEligible=$false;verifiedRequirements=@(@{token=$secret;label='Ranked';met=$false})} 'events_eligibility_solo'
 $eligibilityText=ConvertTo-Json -InputObject $eligibility -Depth 10
 Assert-Safe $eligibilityText
 if($eligibility.verifiedRequirementsCount -ne 1 -or $eligibility.verifiedRequirements[0].Contains('token')){throw 'Eligibility redaction failed'}
 $eventRows=@(Get-SafeEventRecords @(@{eventId='event-safe';eventWindowId='window-safe';shortTitle='Test Cup';accountId=$secret;regions=@('EU');beginTime=[DateTime]::UtcNow}) 'events_global')
 $eventText=$eventRows|ConvertTo-Json -Depth 10
 Assert-Safe $eventText
 if($eventRows.Count -ne 1 -or $eventRows[0].shortTitle -ne 'Test Cup' -or $eventRows[0].Contains('accountId')){throw 'Safe event projection failed'}
 $ruleProjection=Get-SafeEventAggregateProjection @{window_safe=@{scoringType='Placement';ranks=@(@{},@{})}} 'events_scoring'
 if($ruleProjection.top_level_count -ne 1 -or $ruleProjection.samples[0].ranksCount -ne 2){throw 'Event rule aggregate projection failed'}
 if(-not (Test-Identity @{account_id='synthetic-owner'} 'synthetic-owner')){throw 'Identity positive test failed'}
 if(Test-Identity @{account_id='wrong-owner'} 'synthetic-owner'){throw 'Identity mismatch test failed'}
 if(Test-Identity @{data=@{account_id='synthetic-owner';other=@{accountId='wrong-owner'}}} 'synthetic-owner'){throw 'Conflicting identities accepted'}
 if(Test-Identity @{} 'synthetic-owner'){throw 'Missing identity accepted'}
 $blocked=$false;try{Assert-Safe $secret}catch{$blocked=$true};if(-not $blocked){throw 'Secret guard failed'}
 $obs=Get-Observations @{} 'Response status code does not indicate success: 401 (Unauthorized).'
 if($obs.reported_http_error_codes[0] -ne 401){throw 'Error classification failed'}
 if((Get-AuthErrorCategory '{"errorCode":"errors.com.epicgames.account.invalid_account_credentials"}' 400) -ne 'invalid_account_credentials'){throw 'Auth error classification failed'}
 if((Get-AuthErrorCategory '{"detail":"opaque"}' 400) -ne 'unclassified_error'){throw 'Unknown auth error classification failed'}
 $script:routes=[ordered]@{level=@{method='GET';path='/api/v1/profile/level?accountId={accountId}';private=$true}}
 $script:seen=[Collections.Generic.HashSet[string]]::new();$script:requestCount=0;$script:elapsed=[Diagnostics.Stopwatch]::StartNew();$script:identityVerified=$false;$script:accessToken=$null
 $blocked=$false;try{Invoke-NamedProbe 'level'}catch{$blocked=$true};if(-not $blocked){throw 'Private dispatch gate failed'}
 $script:requestCount=15;$script:seen.Clear();$blocked=$false;try{Invoke-NamedProbe 'level'}catch{$blocked=$true};if(-not $blocked){throw 'Budget gate failed'}
 Write-Output 'PASS: synthetic redaction, empty-array/numeric/boolean preservation, identity match/mismatch/missing/conflict gates, secret guard and embedded HTTP-error extraction.'
 exit 0
}

try {
 $script:apiKey=[Environment]::GetEnvironmentVariable('API_FORTNITE_KEY','User')
 $script:accountId=[Environment]::GetEnvironmentVariable('FORTNITE_PLAYER1_ACCOUNT_ID','User')
 $script:deviceId=[Environment]::GetEnvironmentVariable('FORTNITE_PLAYER1_DEVICE_ID','User')
 $script:deviceSecret=[Environment]::GetEnvironmentVariable('FORTNITE_PLAYER1_DEVICE_SECRET','User')
 foreach($v in @($script:apiKey,$script:accountId,$script:deviceId,$script:deviceSecret)){if([string]::IsNullOrWhiteSpace($v)){throw 'Missing input'};$script:sensitive.Add($v)}
 # The configured account was matched to the user's exact expected identity during the
 # validated credential rotation. Require that local attestation, then compare every new
 # token response exactly with the configured account without persisting the identifier.
 $rotationFiles=@(Get-ChildItem -LiteralPath (Join-Path $root 'evidence/sanitized/api-fortnite') -Filter 'credential_rotation.json' -File -Recurse)
 if($rotationFiles.Count -ne 1){throw 'Validated identity attestation unavailable'}
 $rotation=Get-Content -Raw -LiteralPath $rotationFiles[0].FullName | ConvertFrom-Json -AsHashtable
 if(-not $rotation.validated_by_refresh -or -not $rotation.identity_matches_expected -or -not $rotation.persisted -or -not $rotation.write_verified -or $rotation.account_id_changed){throw 'Validated identity attestation rejected'}
 $script:routes=[ordered]@{
  season=@{method='GET';path='/api/v1/season'}
  authentication=@{method='POST';path='/api/v1/oauth/refresh-device'}
  level=@{method='GET';path='/api/v1/profile/level?accountId={accountId}';private=$true}
  crew=@{method='GET';path='/api/v1/crew/current'}
  quests=@{method='GET';path='/api/v2/quests/{accountId}';private=$true}
  inventory=@{method='GET';path='/api/v2/fn/br-inventory/{accountId}';private=$true}
  entitlement=@{method='GET';path='/api/v2/fn/entitlement';private=$true}
  cosmetics=@{method='GET';path='/api/v2/cosmetics/all?page=1&pageSize=1&lang=en'}
  battlepass=@{method='GET';path='/api/v2/battlepass'}
  battlepass_seasons=@{method='GET';path='/api/v2/battlepass/seasons'}
  battlepass_explicit_season=@{method='GET';path='/api/v2/battlepass?season={currentSeason}'}
  battlepass_shop=@{method='GET';path='/api/v1/shop/battlepass?lang=en'}
  stats=@{method='GET';path='/api/v2/stats/{accountId}'}
  ranked=@{method='GET';path='/api/v1/profile/ranked?accountId={accountId}'}
  ranked_tracks=@{method='GET';path='/api/v1/profile/tracks'}
  ranked_progress=@{method='GET';path='/api/v1/profile/progress?accountId={accountId}'}
  sprites_collection=@{method='GET';path='/api/v2/sprites/collection';private=$true}
  playlists=@{method='GET';path='/api/v2/playlists?lang=en'}
  sprites_versions=@{method='GET';path='/api/v2/sprites/versions'}
  sprites_catalog=@{method='GET';path='/api/v2/sprites'}
  sprites_collection_all=@{method='GET';path='/api/v2/sprites/collection/all';private=$true}
  friends_summary=@{method='GET';path='/api/v1/friends/{accountId}/summary';private=$true}
  friends_list=@{method='GET';path='/api/v1/friends/{accountId}/friends';private=$true}
  events_global=@{method='GET';path='/api/v1/events/global?lang=en'}
  events_cashprizes=@{method='GET';path='/api/v1/events/cashprizes'}
  events_scoring=@{method='GET';path='/api/v1/events/scoring'}
  events_tracker=@{method='GET';path='/api/v1/events/tracker?accountId={accountId}&validOnly=true';private=$true}
  events_player=@{method='GET';path='/api/v1/events/player?region=EU&accountId={accountId}';private=$true}
  events_player_session=@{method='GET';path='/api/v1/events/player/{accountId}/session';private=$true}
  events_tokens=@{method='GET';path='/api/v1/events/tokens?teamAccountIds={accountId}';private=$true}
  power_rankings_player=@{method='GET';path='/api/v1/events/powerrankings/player/{accountId}';private=$true}
  events_eligibility_solo=@{method='GET';path='/api/v1/events/tracker/eligibility/{accountId}/epicgames_S42_SoloVictoryCup_EU?eventWindowId=S42_SoloVictoryCup_Event3Round1_EU';private=$true}
  events_scoring_solo=@{method='GET';path='/api/v1/events/scoring/S42_SoloVictoryCup_Event3Round1_EU'}
  events_cashprize_solo=@{method='GET';path='/api/v1/events/cashprize/S42_SoloVictoryCup_Event3Round1_EU'}
  sprites_collection_current=@{method='GET';path='/api/v2/sprites/collection?version=42.10';private=$true}
  events_scoring_solo_detail=@{method='GET';path='/api/v1/events/scoring/S42_SoloVictoryCup_Event3Round1_EU'}
  events_cashprize_solo_detail=@{method='GET';path='/api/v1/events/cashprize/S42_SoloVictoryCup_Event3Round1_EU'}
  events_scoring_solo_final=@{method='GET';path='/api/v1/events/scoring/S42_SoloVictoryCup_Event3Round2_EU'}
  events_cashprize_solo_final=@{method='GET';path='/api/v1/events/cashprize/S42_SoloVictoryCup_Event3Round2_EU'}
  events_cashprize_solo_final_currency=@{method='GET';path='/api/v1/events/cashprize/S42_SoloVictoryCup_Event3Round2_EU'}
  friends_summary_diagnosis=@{method='GET';path='/api/v1/friends/{accountId}/summary';private=$true}
  events_player_session_diagnosis=@{method='GET';path='/api/v1/events/player/{accountId}/session';private=$true}
  events_history_v2=@{method='GET';path='/api/v2/events/players/{accountId}/history';private=$true}
  events_recent_matches=@{method='GET';path='/api/v1/events/player/{accountId}/matches?region=EU&platform=Windows';private=$true}
  events_leaderboard_solo_past=@{method='GET';path='/api/v1/events/global/leaderboard?eventId=epicgames_S42_SoloVictoryCup_EU&eventWindowId=S42_SoloVictoryCup_Event2Round2_EU&page=0'}
  shop_free_offers=@{method='GET';path='/api/v1/shop?lang=en'}
  events_tracker_history_completeness=@{method='GET';path='/api/v1/events/tracker/eligibility?accountId={accountId}&days=180&requiredTournaments=14';private=$true}
  events_tracker_history_completion_retry=@{method='GET';path='/api/v1/events/tracker/eligibility?accountId={accountId}&days=180&requiredTournaments=14';private=$true}
  assets_shop_bundles=@{method='GET';path='/api/v1/assets/bundles/shop'}
  assets_tournament_bundles=@{method='GET';path='/api/v1/assets/bundles/tournaments'}
  playlist_lookup_ropesmileduo=@{method='GET';path='/api/v2/playlists/ropesmileduo?lang=en'}
  playlist_lookup_habanero_ropesmile_duos=@{method='GET';path='/api/v2/playlists/habanero_ropesmile_duos?lang=en'}
  playlist_lookup_known_solo=@{method='GET';path='/api/v2/playlists/Playlist_DefaultSolo?lang=en'}
  playlists_active=@{method='GET';path='/api/v2/playlists/active?lang=en'}
 }
 $script:seen=[Collections.Generic.HashSet[string]]::new();$script:requestCount=0;$script:stop=$false;$script:identityVerified=$false;$script:accessToken=$null;$script:currentSeason=$null
 $script:elapsed=[Diagnostics.Stopwatch]::StartNew()
 $script:runId=[DateTime]::UtcNow.ToString('yyyyMMddTHHmmssZ')
 $script:outputDir=Join-Path $root ('evidence/sanitized/api-fortnite/'+$script:runId)
 [void][IO.Directory]::CreateDirectory($script:outputDir)
 $handler=[Net.Http.HttpClientHandler]::new();$handler.AllowAutoRedirect=$false;$handler.UseCookies=$false
 $script:client=[Net.Http.HttpClient]::new($handler);$script:client.Timeout=[TimeSpan]::FromSeconds(20)
 if($Mode -eq 'ApprovedBatch' -and @(Get-ChildItem -LiteralPath (Join-Path $root 'evidence/sanitized/api-fortnite') -Filter 'authentication.json' -File -Recurse).Count -gt 0){throw 'Single approved authentication attempt already recorded'}
 if($Mode -eq 'ApprovedPublicFollowup') {
  # Only three GETs to finish the same approved areas; never repeat authentication.
  $priorDir=Join-Path $root 'evidence/sanitized/api-fortnite/20260914T150012Z'
  $prior=@(Get-ChildItem -LiteralPath $priorDir -Filter '*.json' -File)
  if($prior.Count -ne 7){throw 'Unexpected prior request ledger'}
  $priorSeason=Get-Content -Raw -LiteralPath (Join-Path $priorDir 'season.json') | ConvertFrom-Json -AsHashtable
  $script:currentSeason=$priorSeason.shape.fields.seasonNumber.value
  if($script:currentSeason -isnot [ValueType] -or $script:currentSeason -le 0){throw 'Missing observed season'}
  $completedFollowups=@(Get-ChildItem -LiteralPath (Join-Path $root 'evidence/sanitized/api-fortnite') -Filter 'battlepass_explicit_season.json' -File -Recurse)
  if($completedFollowups.Count -gt 0){throw 'Followup already executed'}
  foreach($fileName in @('crew.json','battlepass_shop.json')){if(@(Get-ChildItem -LiteralPath (Join-Path $root 'evidence/sanitized/api-fortnite') -Filter $fileName -File -Recurse).Count -ne 1){throw 'Public endpoint repeat budget already used'}}
  $script:requestCount=$prior.Count
  foreach($name in @('crew','battlepass_explicit_season','battlepass_shop')){if($script:stop){break};Invoke-NamedProbe $name}
  Write-Output ('Public followup finished; aggregate requests: {0}; no additional POST or private request.' -f $script:requestCount)
  exit 0
 }
 if($Mode -eq 'ApprovedAuthDiagnostic') {
  # User explicitly approved one additional device-auth POST on 2026-09-15.
  # On exact returned-account match only, make one GET in each remaining approved private area.
  $authReports=@(Get-ChildItem -LiteralPath (Join-Path $root 'evidence/sanitized/api-fortnite') -Filter 'authentication.json' -File -Recurse)
  if($authReports.Count -ne 1){throw 'Expected exactly one prior authentication attempt'}
  foreach($fileName in @('level.json','quests.json','inventory.json','entitlement.json')) {
   if(@(Get-ChildItem -LiteralPath (Join-Path $root 'evidence/sanitized/api-fortnite') -Filter $fileName -File -Recurse).Count -gt 0){throw 'Private endpoint already attempted'}
  }
  $script:requestCount=10
  Invoke-NamedProbe 'authentication'
  if($script:identityVerified -and $script:accessToken) {
   foreach($name in @('level','quests','inventory','entitlement')){if($script:stop){break};Invoke-NamedProbe $name}
  }
  Write-Output ('Approved authentication diagnostic finished: {0} request(s) in this run; private identity gate {1}.' -f ($script:requestCount-10),$(if($script:identityVerified){'passed'}else{'closed'}))
  exit 0
 }
 if($Mode -eq 'ApprovedCoverageBatch') {
  # User authorized continued provider-only read exploration on 2026-09-15.
  # Device refresh is the already-established token-issuance exception; data calls are GET-only.
  foreach($fileName in @('stats.json','ranked.json','ranked_tracks.json','ranked_progress.json','sprites_collection.json')) {
   if(@(Get-ChildItem -LiteralPath (Join-Path $root 'evidence/sanitized/api-fortnite') -Filter $fileName -File -Recurse).Count -gt 0){throw 'Coverage endpoint already attempted'}
  }
  Invoke-NamedProbe 'authentication'
  if(-not $script:identityVerified -or -not $script:accessToken){throw 'Coverage identity gate closed'}
  foreach($name in @('stats','ranked','ranked_tracks','ranked_progress','sprites_collection')){if($script:stop){break};Invoke-NamedProbe $name}
  Write-Output ('Coverage batch finished: {0} request(s); exact identity gate {1}. Token discarded on exit.' -f $script:requestCount,$(if($script:identityVerified){'passed'}else{'closed'}))
  exit 0
 }
 if($Mode -eq 'ApprovedCoverageRetry') {
  # The first sprite response was HTTP 200 but its local projection failed. Repeat that GET once
  # after a synthetic-tested collision fix. Repeat ranked once to retain associated safe labels.
  $spriteReports=@(Get-ChildItem -LiteralPath (Join-Path $root 'evidence/sanitized/api-fortnite') -Filter 'sprites_collection.json' -File -Recurse)
  $rankReports=@(Get-ChildItem -LiteralPath (Join-Path $root 'evidence/sanitized/api-fortnite') -Filter 'ranked.json' -File -Recurse)
  if($spriteReports.Count -ne 1 -or $rankReports.Count -ne 1){throw 'Coverage retry history mismatch'}
  $firstSprite=Get-Content -Raw -LiteralPath $spriteReports[0].FullName | ConvertFrom-Json -AsHashtable
  if($firstSprite.http_status -ne 200 -or $firstSprite.outcome -ne 'transport_or_processing_failure'){throw 'Sprite retry is not justified'}
  Invoke-NamedProbe 'authentication'
  if(-not $script:identityVerified -or -not $script:accessToken){throw 'Coverage retry identity gate closed'}
  Invoke-NamedProbe 'ranked'
  Invoke-NamedProbe 'sprites_collection'
  Write-Output ('Coverage retry finished: {0} request(s); exact identity gate {1}. Token discarded on exit.' -f $script:requestCount,$(if($script:identityVerified){'passed'}else{'closed'}))
  exit 0
 }
 if($Mode -eq 'ApprovedPlaylistProbe') {
  if(@(Get-ChildItem -LiteralPath (Join-Path $root 'evidence/sanitized/api-fortnite') -Filter 'playlists.json' -File -Recurse).Count -gt 0){throw 'Playlist catalogue already attempted'}
  Invoke-NamedProbe 'playlists'
  Write-Output ('Playlist mapping probe finished: {0} GET request.' -f $script:requestCount)
  exit 0
 }
 if($Mode -eq 'ApprovedPlaylistRetry') {
  $playlistReports=@(Get-ChildItem -LiteralPath (Join-Path $root 'evidence/sanitized/api-fortnite') -Filter 'playlists.json' -File -Recurse)
  if($playlistReports.Count -ne 1){throw 'Playlist retry history mismatch'}
  $firstPlaylist=Get-Content -Raw -LiteralPath $playlistReports[0].FullName | ConvertFrom-Json -AsHashtable
  if($firstPlaylist.http_status -ne 200 -or @($firstPlaylist.observations.playlist_records).Count -ne 0){throw 'Playlist projection retry is not justified'}
  Invoke-NamedProbe 'playlists'
  Write-Output ('Playlist mapping retry finished: {0} GET request.' -f $script:requestCount)
  exit 0
 }
 if($Mode -eq 'ApprovedProjectApiBatch') {
  foreach($fileName in @('sprites_versions.json','sprites_catalog.json','sprites_collection_all.json','friends_summary.json','friends_list.json','events_global.json','events_cashprizes.json','events_scoring.json','events_tracker.json','events_player.json','events_player_session.json','events_tokens.json','power_rankings_player.json')) {
   if(@(Get-ChildItem -LiteralPath (Join-Path $root 'evidence/sanitized/api-fortnite') -Filter $fileName -File -Recurse).Count -gt 0){throw 'Project API endpoint already attempted'}
  }
  foreach($name in @('sprites_versions','sprites_catalog','events_global','events_cashprizes','events_scoring')){if($script:stop){break};Invoke-NamedProbe $name}
  if($script:stop){throw 'Public project API controls stopped batch'}
  Invoke-NamedProbe 'authentication'
  if(-not $script:identityVerified -or -not $script:accessToken){throw 'Project API identity gate closed'}
  foreach($name in @('sprites_collection_all','friends_summary','friends_list','events_tracker','events_player','events_player_session','events_tokens','power_rankings_player')){if($script:stop){break};Invoke-NamedProbe $name}
  Write-Output ('Project API batch finished: {0} request(s); exact identity gate {1}. Token discarded on exit.' -f $script:requestCount,$(if($script:identityVerified){'passed'}else{'closed'}))
  exit 0
 }
 if($Mode -eq 'ApprovedProjectApiResume') {
  foreach($fileName in @('sprites_versions.json','sprites_catalog.json','events_global.json')){if(@(Get-ChildItem -LiteralPath (Join-Path $root 'evidence/sanitized/api-fortnite') -Filter $fileName -File -Recurse).Count -ne 1){throw 'Completed project API history mismatch'}}
  foreach($fileName in @('events_cashprizes.json','events_scoring.json','sprites_collection_all.json','friends_summary.json','friends_list.json','events_tracker.json','events_player.json','events_player_session.json','events_tokens.json','power_rankings_player.json')){if(@(Get-ChildItem -LiteralPath (Join-Path $root 'evidence/sanitized/api-fortnite') -Filter $fileName -File -Recurse).Count -gt 0){throw 'Project API resume endpoint already attempted'}}
  foreach($name in @('events_cashprizes','events_scoring')){if($script:stop){break};Invoke-NamedProbe $name}
  if($script:stop){throw 'Public project API resume stopped batch'}
  Invoke-NamedProbe 'authentication'
  if(-not $script:identityVerified -or -not $script:accessToken){throw 'Project API resume identity gate closed'}
  foreach($name in @('sprites_collection_all','friends_summary','friends_list','events_tracker','events_player','events_player_session','events_tokens','power_rankings_player')){if($script:stop){break};Invoke-NamedProbe $name}
  Write-Output ('Project API resume finished: {0} request(s); exact identity gate {1}. Token discarded on exit.' -f $script:requestCount,$(if($script:identityVerified){'passed'}else{'closed'}))
  exit 0
 }
 if($Mode -eq 'ApprovedSpriteAndEventFollowup') {
  foreach($name in @('sprites_versions','sprites_catalog','sprites_collection_all')) {
   $reports=@(Get-ChildItem -LiteralPath (Join-Path $root 'evidence/sanitized/api-fortnite') -Filter ($name+'.json') -File -Recurse)
   if($reports.Count -ne 1){throw 'Sprite endpoint retry history mismatch'}
   $prior=Get-Content -Raw -LiteralPath $reports[0].FullName | ConvertFrom-Json -AsHashtable
   if($prior.http_status -ne 200 -or $prior.shape.Contains('container_path')){throw 'Sprite endpoint retry is not justified'}
  }
  foreach($name in @('events_eligibility_solo','events_scoring_solo','events_cashprize_solo')){if(@(Get-ChildItem -LiteralPath (Join-Path $root 'evidence/sanitized/api-fortnite') -Filter ($name+'.json') -File -Recurse).Count -gt 0){throw 'Event followup endpoint already attempted'}}
  foreach($name in @('sprites_versions','sprites_catalog','events_scoring_solo','events_cashprize_solo')){if($script:stop){break};Invoke-NamedProbe $name}
  if($script:stop){throw 'Public followup control stopped batch'}
  Invoke-NamedProbe 'authentication'
  if(-not $script:identityVerified -or -not $script:accessToken){throw 'Followup identity gate closed'}
  foreach($name in @('sprites_collection_all','events_eligibility_solo')){if($script:stop){break};Invoke-NamedProbe $name}
  Write-Output ('Sprite and event followup finished: {0} request(s); exact identity gate {1}. Token discarded on exit.' -f $script:requestCount,$(if($script:identityVerified){'passed'}else{'closed'}))
  exit 0
 }
 if($Mode -eq 'ApprovedDetailCapture') {
  foreach($name in @('events_scoring_solo','events_cashprize_solo')){if(@(Get-ChildItem -LiteralPath (Join-Path $root 'evidence/sanitized/api-fortnite') -Filter ($name+'.json') -File -Recurse).Count -ne 1){throw 'Event detail capture history mismatch'}}
  foreach($name in @('sprites_collection_current','events_scoring_solo_detail','events_cashprize_solo_detail')){if(@(Get-ChildItem -LiteralPath (Join-Path $root 'evidence/sanitized/api-fortnite') -Filter ($name+'.json') -File -Recurse).Count -gt 0){throw 'Detail capture already attempted'}}
  foreach($name in @('events_scoring_solo_detail','events_cashprize_solo_detail')){if($script:stop){break};Invoke-NamedProbe $name}
  if($script:stop){throw 'Event detail control stopped batch'}
  Invoke-NamedProbe 'authentication'
  if(-not $script:identityVerified -or -not $script:accessToken){throw 'Detail identity gate closed'}
  Invoke-NamedProbe 'sprites_collection_current'
  Write-Output ('Detail capture finished: {0} request(s); exact identity gate {1}. Token discarded on exit.' -f $script:requestCount,$(if($script:identityVerified){'passed'}else{'closed'}))
  exit 0
 }
 if($Mode -eq 'ApprovedEventFinalAndAccessDiagnosis') {
  foreach($name in @('events_scoring_solo_final','events_cashprize_solo_final','friends_summary_diagnosis','events_player_session_diagnosis')){if(@(Get-ChildItem -LiteralPath (Join-Path $root 'evidence/sanitized/api-fortnite') -Filter ($name+'.json') -File -Recurse).Count -gt 0){throw 'Final event or access diagnosis already attempted'}}
  foreach($name in @('events_scoring_solo_final','events_cashprize_solo_final')){if($script:stop){break};Invoke-NamedProbe $name}
  if($script:stop){throw 'Final event controls stopped batch'}
  Invoke-NamedProbe 'authentication'
  if(-not $script:identityVerified -or -not $script:accessToken){throw 'Access diagnosis identity gate closed'}
  foreach($name in @('friends_summary_diagnosis','events_player_session_diagnosis')){if($script:stop){break};Invoke-NamedProbe $name}
  Write-Output ('Final event and access diagnosis finished: {0} request(s); exact identity gate {1}. Token discarded on exit.' -f $script:requestCount,$(if($script:identityVerified){'passed'}else{'closed'}))
  exit 0
 }
 if($Mode -eq 'ApprovedFinalCurrencyCapture') {
  $prior=@(Get-ChildItem -LiteralPath (Join-Path $root 'evidence/sanitized/api-fortnite') -Filter 'events_cashprize_solo_final.json' -File -Recurse)
  if($prior.Count -ne 1 -or @(Get-ChildItem -LiteralPath (Join-Path $root 'evidence/sanitized/api-fortnite') -Filter 'events_cashprize_solo_final_currency.json' -File -Recurse).Count -gt 0){throw 'Final currency capture history mismatch'}
  Invoke-NamedProbe 'events_cashprize_solo_final_currency'
  Write-Output ('Final currency capture finished: {0} public GET request.' -f $script:requestCount)
  exit 0
 }
 if($Mode -eq 'ApprovedParticipationAndLeaderboard') {
  foreach($name in @('events_history_v2','events_recent_matches','events_leaderboard_solo_past')){if(@(Get-ChildItem -LiteralPath (Join-Path $root 'evidence/sanitized/api-fortnite') -Filter ($name+'.json') -File -Recurse).Count -gt 0){throw 'Participation or leaderboard endpoint already attempted'}}
  Invoke-NamedProbe 'events_leaderboard_solo_past'
  if($script:stop){throw 'Leaderboard control stopped batch'}
  Invoke-NamedProbe 'authentication'
  if(-not $script:identityVerified -or -not $script:accessToken){throw 'Participation identity gate closed'}
  foreach($name in @('events_history_v2','events_recent_matches')){if($script:stop){break};Invoke-NamedProbe $name}
  Write-Output ('Participation and leaderboard batch finished: {0} request(s); exact identity gate {1}. Token discarded on exit.' -f $script:requestCount,$(if($script:identityVerified){'passed'}else{'closed'}))
  exit 0
 }
 if($Mode -eq 'ApprovedShopFreeOffersProbe') {
  if(@(Get-ChildItem -LiteralPath (Join-Path $root 'evidence/sanitized/api-fortnite') -Filter 'shop_free_offers.json' -File -Recurse).Count -gt 0){throw 'Shop free-offer endpoint already attempted'}
  Invoke-NamedProbe 'shop_free_offers'
  Write-Output ('Shop free-offer probe finished: {0} public GET request.' -f $script:requestCount)
  exit 0
 }
 if($Mode -eq 'ApprovedTrackerHistoryCompleteness') {
  if(@(Get-ChildItem -LiteralPath (Join-Path $root 'evidence/sanitized/api-fortnite') -Filter 'events_tracker_history_completeness.json' -File -Recurse).Count -gt 0){throw 'Tracker history-completeness route already attempted'}
  Invoke-NamedProbe 'authentication'
  if(-not $script:identityVerified -or -not $script:accessToken){throw 'Tracker history identity gate closed'}
  Invoke-NamedProbe 'events_tracker_history_completeness'
  Write-Output ('Tracker history-completeness probe finished: {0} request(s); exact identity gate {1}. Token discarded on exit.' -f $script:requestCount,$(if($script:identityVerified){'passed'}else{'closed'}))
  exit 0
 }
 if($Mode -eq 'ApprovedSdkAssetBundles') {
  foreach($name in @('assets_shop_bundles','assets_tournament_bundles')){if(@(Get-ChildItem -LiteralPath (Join-Path $root 'evidence/sanitized/api-fortnite') -Filter ($name+'.json') -File -Recurse).Count -gt 0){throw 'SDK asset bundle route already attempted'}}
  foreach($name in @('assets_shop_bundles','assets_tournament_bundles')){if($script:stop){break};Invoke-NamedProbe $name}
  Write-Output ('SDK asset bundle probe finished: {0} public GET request(s).' -f $script:requestCount)
  exit 0
 }
 if($Mode -eq 'ApprovedTrackerHistoryCompletionRetry') {
  $prior=@(Get-ChildItem -LiteralPath (Join-Path $root 'evidence/sanitized/api-fortnite') -Filter 'events_tracker_history_completeness.json' -File -Recurse)
  if($prior.Count -ne 1 -or @(Get-ChildItem -LiteralPath (Join-Path $root 'evidence/sanitized/api-fortnite') -Filter 'events_tracker_history_completion_retry.json' -File -Recurse).Count -gt 0){throw 'Tracker completion retry history mismatch'}
  $previous=Get-Content -Raw -LiteralPath $prior[0].FullName | ConvertFrom-Json -AsHashtable
  if($previous.http_status -ne 200 -or $previous.shape.fields.history.fields.complete.value -ne $false){throw 'Tracker completion retry not justified'}
  Invoke-NamedProbe 'authentication'
  if(-not $script:identityVerified -or -not $script:accessToken){throw 'Tracker completion identity gate closed'}
  Invoke-NamedProbe 'events_tracker_history_completion_retry'
  Write-Output ('Tracker history completion retry finished: {0} request(s); exact identity gate {1}. Token discarded on exit.' -f $script:requestCount,$(if($script:identityVerified){'passed'}else{'closed'}))
  exit 0
 }
 if($Mode -eq 'ApprovedSdkPlaylistLookup') {
  foreach($name in @('playlist_lookup_ropesmileduo','playlist_lookup_habanero_ropesmile_duos')){if(@(Get-ChildItem -LiteralPath (Join-Path $root 'evidence/sanitized/api-fortnite') -Filter ($name+'.json') -File -Recurse).Count -gt 0){throw 'Playlist lookup already attempted'}}
  foreach($name in @('playlist_lookup_ropesmileduo','playlist_lookup_habanero_ropesmile_duos')){if($script:stop){break};Invoke-NamedProbe $name}
  Write-Output ('SDK playlist lookup finished: {0} public GET request(s).' -f $script:requestCount)
  exit 0
 }
 if($Mode -eq 'ApprovedSdkPlaylistControl') {
  foreach($name in @('playlist_lookup_ropesmileduo','playlist_lookup_habanero_ropesmile_duos')){if(@(Get-ChildItem -LiteralPath (Join-Path $root 'evidence/sanitized/api-fortnite') -Filter ($name+'.json') -File -Recurse).Count -ne 1){throw 'Playlist lookup control history mismatch'}}
  if(@(Get-ChildItem -LiteralPath (Join-Path $root 'evidence/sanitized/api-fortnite') -Filter 'playlist_lookup_known_solo.json' -File -Recurse).Count -gt 0){throw 'Playlist lookup control already attempted'}
  Invoke-NamedProbe 'playlist_lookup_known_solo'
  Write-Output ('SDK playlist lookup control finished: {0} public GET request.' -f $script:requestCount)
  exit 0
 }
 if($Mode -eq 'ApprovedSdkActivePlaylists') {
  if(@(Get-ChildItem -LiteralPath (Join-Path $root 'evidence/sanitized/api-fortnite') -Filter 'playlists_active.json' -File -Recurse).Count -gt 0){throw 'Active playlist catalogue already attempted'}
  Invoke-NamedProbe 'playlists_active'
  Write-Output ('SDK active playlist catalogue finished: {0} public GET request.' -f $script:requestCount)
  exit 0
 }
 Invoke-NamedProbe 'season'
 if($script:stop -or $script:lastStatus -ne 200){throw 'Provider control failed'}
 Invoke-NamedProbe 'authentication'
 if($script:stop){throw 'Authentication transport stopped batch'}
 if($script:identityVerified){Invoke-NamedProbe 'level';if($script:lastStatus -ne 200){$script:identityVerified=$false}}
 if($script:stop){throw 'Stopped by control'}
 Invoke-NamedProbe 'crew'
 foreach($name in @('quests','inventory','entitlement')){if($script:stop){break};if($script:identityVerified){Invoke-NamedProbe $name}}
 foreach($name in @('cosmetics','battlepass','battlepass_seasons','battlepass_explicit_season','battlepass_shop')){if($script:stop){break};if($name -eq 'battlepass_explicit_season' -and $null -eq $script:currentSeason){continue};Invoke-NamedProbe $name}
 Write-Output ('Batch finished: {0} requests. Tokens remain in process memory only and are discarded on exit.' -f $script:requestCount)
} catch {
 Write-Output 'Batch stopped by a control or processing failure. Sensitive exception details suppressed; inspect only saved sanitized reports.'
 exit 1
} finally {
 if($script:client){$script:client.Dispose()}
 $script:accessToken=$null;$script:apiKey=$null;$script:deviceSecret=$null;$script:deviceId=$null;$script:accountId=$null
 $script:sensitive.Clear()
}
