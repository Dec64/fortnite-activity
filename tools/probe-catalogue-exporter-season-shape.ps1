param([switch]$Live,[switch]$Nested)

$ErrorActionPreference='Stop'
$ProgressPreference='SilentlyContinue'
$root=Split-Path $PSScriptRoot -Parent

function Get-SafeType($value){
 if($null -eq $value){return 'null'}
 if($value -is [Collections.IDictionary]){return 'object'}
 if($value -is [array]){return 'array'}
 if($value -is [bool]){return 'boolean'}
 if($value -is [ValueType]){return 'number'}
 return 'string'
}

function Get-SeasonArrayShape($data){
 $output=if($data -is [Collections.IDictionary] -and $data.Contains('jsonOutput')){$data['jsonOutput']}else{$null}
 $typeCounts=[ordered]@{object=0;array=0;string=0;number=0;boolean=0;null=0}
 $fieldTypes=[ordered]@{}
 $pathSet=[Collections.Generic.HashSet[string]]::new([StringComparer]::Ordinal)
 $safeKey={param($key) $key -match '^[A-Za-z_][A-Za-z0-9_]{0,79}$' -and $key -notmatch '(?i)token|secret|authorization|cookie|receipt|password|email|account|device'}
 $scanValue={
  param($key,$value)
  $type=Get-SafeType $value
  if((& $safeKey ([string]$key))){
   if(-not $fieldTypes.Contains($key)){$fieldTypes[$key]=[Collections.Generic.HashSet[string]]::new([StringComparer]::Ordinal)}
   [void]$fieldTypes[$key].Add($type)
  }
  if($value -is [string] -and $value.Length -le 300 -and $value -match '^/?[A-Za-z0-9_.-]+(?:/[A-Za-z0-9_.-]+)+/?$' -and $value -notmatch '(?i)token|secret|auth|receipt|account|device'){
   if($pathSet.Count -lt 20){[void]$pathSet.Add($value)}
  }
 }
 if($output -is [array]){
  foreach($item in $output){
   $type=Get-SafeType $item;$typeCounts[$type]++
   if($item -is [Collections.IDictionary]){foreach($key in $item.Keys){& $scanValue $key $item[$key]}}
   elseif($item -is [string]){& $scanValue 'array_item' $item}
  }
 }
 $safeFields=[ordered]@{}
 foreach($key in $fieldTypes.Keys|Sort-Object){$safeFields[$key]=@($fieldTypes[$key]|Sort-Object)}
 return [ordered]@{
  json_output_type=Get-SafeType $output
  json_output_count=if($output -is [array]){$output.Count}else{$null}
  element_type_counts=$typeCounts
  element_field_types=$safeFields
  asset_path_candidates=@($pathSet|Sort-Object)
 }
}

function Get-NestedSeasonShape($data){
 $output=$null
 if($data -is [Collections.IDictionary] -and $data.Contains('jsonOutput')){$output=$data['jsonOutput']}
 $nestedFields=[ordered]@{};$pathSet=[Collections.Generic.HashSet[string]]::new([StringComparer]::Ordinal);$numberSet=[Collections.Generic.HashSet[int]]::new()
 $safeKey={param($key) $key -match '^[A-Za-z_][A-Za-z0-9_]{0,79}$' -and $key -notmatch '(?i)token|secret|authorization|cookie|receipt|password|email|account|device'}
 if($output -is [array]){
  foreach($item in $output){
   if($item -isnot [Collections.IDictionary]){continue}
   foreach($outerKey in @('chapter','season')){
    $nested=$item[$outerKey]
    if($nested -is [Collections.IDictionary]){
     foreach($key in $nested.Keys){
      if(& $safeKey ([string]$key)){
       $compound="$outerKey.$key";$type=Get-SafeType $nested[$key]
       if(-not $nestedFields.Contains($compound)){$nestedFields[$compound]=[Collections.Generic.HashSet[string]]::new([StringComparer]::Ordinal)}
       [void]$nestedFields[$compound].Add($type)
       if($nested[$key] -is [ValueType] -and $nested[$key] -isnot [bool] -and [int]$nested[$key] -ge 0 -and [int]$nested[$key] -le 100){[void]$numberSet.Add([int]$nested[$key])}
      }
     }
    }
   }
   foreach($value in $item.Values){
    if($value -is [string] -and $value -notmatch '(?i)token|secret|auth|receipt|account|device'){
     foreach($match in [regex]::Matches($value,'/Game/[A-Za-z0-9_./-]{1,240}')){if($pathSet.Count -lt 20){[void]$pathSet.Add($match.Value.TrimEnd('.'))}}
    }
   }
  }
 }
 $fields=[ordered]@{};foreach($key in $nestedFields.Keys|Sort-Object){$fields[$key]=@($nestedFields[$key]|Sort-Object)}
 return [ordered]@{json_output_count=if($output -is [array]){$output.Count}else{$null};nested_field_types=$fields;bounded_numeric_values=@($numberSet|Sort-Object);game_asset_path_candidates=@($pathSet|Sort-Object)}
}

if(-not $Live){
 $sample=@{jsonOutput=@(@{season=42;assetPath='/Game/Test/Season42';reward='synthetic-reward';access_token='synthetic-secret'},'Season 42')}
 $shape=Get-SeasonArrayShape $sample;$json=ConvertTo-Json $shape -Depth 20
 if($shape.json_output_count -ne 2 -or $shape.element_type_counts.object -ne 1 -or $shape.element_type_counts.string -ne 1 -or -not $shape.element_field_types.Contains('season') -or $shape.element_field_types.Contains('access_token') -or $shape.asset_path_candidates -notcontains '/Game/Test/Season42' -or $json.Contains('synthetic-secret') -or $json.Contains('synthetic-reward')){throw 'Season shape sanitizer self-test failed'}
 $nestedSample=@{jsonOutput=@(@{chapter=@{value=7;label='private-label'};season=@{value=42;startDate='2026-01-01'};key="Asset'/Game/Test/Season42.Asset'";access_token='synthetic-secret'})}
 $nestedShape=Get-NestedSeasonShape $nestedSample;$nestedJson=ConvertTo-Json $nestedShape -Depth 20
 if($nestedShape.bounded_numeric_values -notcontains 42 -or $nestedShape.game_asset_path_candidates -notcontains '/Game/Test/Season42.Asset' -or $nestedJson.Contains('private-label') -or $nestedJson.Contains('synthetic-secret')){throw 'Nested season shape sanitizer self-test failed'}
 Write-Output 'PASS: season element-shape projection suppresses arbitrary values.';exit 0
}

$endpoint='/v1/export/seasons?Version=42.10'
$report=[ordered]@{provider='FortniteAPI.com export service';method='GET';endpoint=$endpoint;requested_at_utc=[DateTime]::UtcNow.ToString('o');response_at_utc=$null;http_status=$null;response_date_utc=$null;outcome='transport_failure';shape=$null}
$client=$null;$request=$null;$response=$null;$cts=$null;$stream=$null;$memory=$null
try{
 $handler=[Net.Http.HttpClientHandler]::new();$handler.AllowAutoRedirect=$false
 $client=[Net.Http.HttpClient]::new($handler)
 $request=[Net.Http.HttpRequestMessage]::new([Net.Http.HttpMethod]::Get,('https://api.fortniteapi.com'+$endpoint))
 $cts=[Threading.CancellationTokenSource]::new([TimeSpan]::FromSeconds(20))
 $response=$client.SendAsync($request,[Net.Http.HttpCompletionOption]::ResponseHeadersRead,$cts.Token).GetAwaiter().GetResult()
 $report.http_status=[int]$response.StatusCode;$report.response_at_utc=[DateTime]::UtcNow.ToString('o')
 if($response.Headers.Date){$report.response_date_utc=([DateTimeOffset]$response.Headers.Date).UtcDateTime.ToString('o')}
 $stream=$response.Content.ReadAsStreamAsync($cts.Token).GetAwaiter().GetResult();$memory=[IO.MemoryStream]::new();$buffer=[byte[]]::new(8192)
 while(($count=$stream.ReadAsync($buffer,0,$buffer.Length,$cts.Token).GetAwaiter().GetResult()) -gt 0){if($memory.Length+$count -gt 512KB){throw 'Response size limit'};$memory.Write($buffer,0,$count)}
 $raw=[Text.Encoding]::UTF8.GetString($memory.ToArray());$data=$null
 try{$data=ConvertFrom-Json $raw -AsHashtable -Depth 100 -NoEnumerate}catch{}
 $report.outcome=if($report.http_status -ge 200 -and $report.http_status -lt 300){'http_success'}else{'http_error'}
 $report.shape=if($null -ne $data){if($Nested){Get-NestedSeasonShape $data}else{Get-SeasonArrayShape $data}}else{[ordered]@{type='non_json_or_null';body_length=$raw.Length}}
}catch{$report.outcome='transport_or_processing_failure';$report.shape=[ordered]@{type='response_suppressed'}}
finally{if($memory){$memory.Dispose()};if($stream){$stream.Dispose()};if($response){$response.Dispose()};if($request){$request.Dispose()};if($cts){$cts.Dispose()};if($client){$client.Dispose()}}

$runId=[DateTime]::UtcNow.ToString('yyyyMMddTHHmmssZ');$outputDir=Join-Path $root ('evidence/sanitized/catalogue-exporter/'+$runId);[void][IO.Directory]::CreateDirectory($outputDir)
$filename=if($Nested){'season-nested-shape.json'}else{'season-element-shape.json'};$relative="evidence/sanitized/catalogue-exporter/$runId/$filename"
[IO.File]::WriteAllText((Join-Path $root $relative),(ConvertTo-Json $report -Depth 30),[Text.UTF8Encoding]::new($false))
$status=if($null -eq $report.http_status){'none'}else{[string]$report.http_status}
$question=if($Nested){'nested chapter/season field types, bounded numeric values, and /Game asset-path substrings only'}else{'element types, safe field names/types, and asset-path candidates only'}
$entry="`n### Catalogue exporter bounded question: season shape — $($report.requested_at_utc)`n`n- Operation: GET ``$endpoint``; HTTP status: $status; outcome: $($report.outcome).`n- Sanitized evidence: ``$relative``.`n- Question: $question. No authentication or personal data was sent; raw response was not saved.`n"
[IO.File]::AppendAllText((Join-Path $root 'docs/investigation-log.md'),$entry,[Text.UTF8Encoding]::new($false))
Write-Output ("Saved sanitized season element shape: HTTP {0}, {1}" -f $status,$report.outcome)
