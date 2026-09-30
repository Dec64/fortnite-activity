param(
 [ValidateSet('SelfTest','Versions','Seasons')][string]$Mode='SelfTest'
)

$ErrorActionPreference='Stop'
$ProgressPreference='SilentlyContinue'
$root=Split-Path $PSScriptRoot -Parent

function Get-ValueType($value) {
 if($null -eq $value){return 'null'}
 if($value -is [Collections.IDictionary]){return 'object'}
 if($value -is [array]){return 'array'}
 if($value -is [bool]){return 'boolean'}
 if($value -is [ValueType]){return 'number'}
 return 'string'
}

function Get-BoundedShape($data,[string]$mode) {
 $versionSet=[Collections.Generic.HashSet[string]]::new([StringComparer]::Ordinal)
 $seasonSet=[Collections.Generic.HashSet[int]]::new()
 $fieldSet=[Collections.Generic.HashSet[string]]::new([StringComparer]::Ordinal)
 $summary=[ordered]@{
  root_type=(Get-ValueType $data);root_count=if($data -is [array]){$data.Count}else{$null}
  root_fields=[ordered]@{};first_array_item_type=$null;first_array_item_fields=[ordered]@{}
  json_output_type=$null;json_output_length=$null;json_strings_decoded=0
  candidate_version_strings=@();season_numbers=@();relevant_field_names=@()
  relevant_field_occurrences=0;visited_nodes=0;scan_limit=20000
 }
 $isSafeKey={param($key) $key -match '^[A-Za-z_][A-Za-z0-9_]{0,59}$' -and $key -notmatch '(?i)token|secret|authorization|cookie|receipt|key|password|email|account|device'}
 if($data -is [Collections.IDictionary]){
  foreach($key in @($data.Keys|Select-Object -First 25)){
   if(& $isSafeKey ([string]$key)){$summary.root_fields[$key]=Get-ValueType $data[$key]}
  }
  if($data.Contains('jsonOutput')){
   $summary.json_output_type=Get-ValueType $data['jsonOutput']
   if($data['jsonOutput'] -is [string]){$summary.json_output_length=$data['jsonOutput'].Length}
  }
 }
 if($data -is [array] -and $data.Count -gt 0){
  $summary.first_array_item_type=Get-ValueType $data[0]
  if($data[0] -is [Collections.IDictionary]){
   foreach($key in @($data[0].Keys|Select-Object -First 25)){
    if(& $isSafeKey ([string]$key)){$summary.first_array_item_fields[$key]=Get-ValueType $data[0][$key]}
   }
  }
 }
 $queue=[Collections.Generic.Queue[object]]::new();$queue.Enqueue($data)
 while($queue.Count -gt 0 -and $summary.visited_nodes -lt $summary.scan_limit){
  $node=$queue.Dequeue();$summary.visited_nodes++
  if($node -is [Collections.IDictionary]){
   foreach($key in $node.Keys){
    $value=$node[$key]
    if($key -match '(?i)battle.?pass|reward|quest|offer|unlock|release|page|prerequisite'){
     $summary.relevant_field_occurrences++
     if((& $isSafeKey ([string]$key)) -and $fieldSet.Count -lt 40){[void]$fieldSet.Add([string]$key)}
    }
    if($key -match '(?i)^(season|seasonNumber)$' -and $value -is [ValueType] -and $value -isnot [bool] -and [int]$value -ge 1 -and [int]$value -le 100){[void]$seasonSet.Add([int]$value)}
    if($mode -eq 'Versions' -and $key -match '(?<![0-9])([0-9]{1,3}\.[0-9]{1,3})(?![0-9])' -and $versionSet.Count -lt 20){[void]$versionSet.Add($Matches[1])}
    if($value -is [Collections.IDictionary] -or $value -is [array]){$queue.Enqueue($value)}
    elseif($value -is [string]){
     if($mode -eq 'Versions'){
      foreach($hit in [regex]::Matches($value,'(?<![0-9])([0-9]{1,3}\.[0-9]{1,3})(?![0-9])')){if($versionSet.Count -lt 20){[void]$versionSet.Add($hit.Groups[1].Value)}}
     }
     if($value.Length -le 256KB -and $value.TrimStart() -match '^[\{\[]'){
      try{$decoded=ConvertFrom-Json -InputObject $value -AsHashtable -Depth 100 -NoEnumerate;if($null -ne $decoded){$summary.json_strings_decoded++;$queue.Enqueue($decoded)}}catch{}
     }
    }
   }
  } elseif($node -is [array]){
   foreach($value in $node){
    if($value -is [Collections.IDictionary] -or $value -is [array]){$queue.Enqueue($value)}
    elseif($value -is [string]){
     if($mode -eq 'Versions'){
      foreach($hit in [regex]::Matches($value,'(?<![0-9])([0-9]{1,3}\.[0-9]{1,3})(?![0-9])')){if($versionSet.Count -lt 20){[void]$versionSet.Add($hit.Groups[1].Value)}}
     }
     if($value.Length -le 256KB -and $value.TrimStart() -match '^[\{\[]'){
      try{$decoded=ConvertFrom-Json -InputObject $value -AsHashtable -Depth 100 -NoEnumerate;if($null -ne $decoded){$summary.json_strings_decoded++;$queue.Enqueue($decoded)}}catch{}
     }
    }
   }
  }
 }
 $summary.candidate_version_strings=@($versionSet|Sort-Object)
 $summary.season_numbers=@($seasonSet|Sort-Object)
 $summary.relevant_field_names=@($fieldSet|Sort-Object)
 return $summary
}

if($Mode -eq 'SelfTest'){
 $sample=@(@{version='42.10';jsonOutput='{"seasonNumber":42,"rewards":[{"offerId":"synthetic-offer"}],"access_token":"synthetic-secret"}'},@{version='43.00'})
 $shape=Get-BoundedShape $sample 'Versions';$json=ConvertTo-Json -InputObject $shape -Depth 20
 if($shape.root_count -ne 2 -or $shape.candidate_version_strings -notcontains '42.10' -or $shape.season_numbers -notcontains 42 -or $shape.relevant_field_names -notcontains 'rewards' -or $shape.json_strings_decoded -ne 1 -or $json.Contains('synthetic-secret') -or $json.Contains('synthetic-offer')){throw 'Followup projection self-test failed'}
 Write-Output 'PASS: nested public JSON projection and value suppression.';exit 0
}

$endpoint=if($Mode -eq 'Versions'){'/v1/versions'}else{'/v1/export/seasons?Version=42.10'}
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
 $stream=$response.Content.ReadAsStreamAsync($cts.Token).GetAwaiter().GetResult()
 $memory=[IO.MemoryStream]::new();$buffer=[byte[]]::new(8192)
 while(($count=$stream.ReadAsync($buffer,0,$buffer.Length,$cts.Token).GetAwaiter().GetResult()) -gt 0){
  if($memory.Length+$count -gt 512KB){throw 'Response size limit'}
  $memory.Write($buffer,0,$count)
 }
 $raw=[Text.Encoding]::UTF8.GetString($memory.ToArray())
 $data=$null;try{$data=ConvertFrom-Json -InputObject $raw -AsHashtable -Depth 100 -NoEnumerate}catch{}
 $report.outcome=if($report.http_status -ge 200 -and $report.http_status -lt 300){'http_success'}else{'http_error'}
 $report.shape=if($null -ne $data){Get-BoundedShape $data $Mode}else{[ordered]@{type='non_json_or_null';body_length=$raw.Length}}
}catch{$report.outcome='transport_or_processing_failure';$report.shape=[ordered]@{type='response_suppressed'}}
finally{
 if($memory){$memory.Dispose()};if($stream){$stream.Dispose()};if($response){$response.Dispose()};if($request){$request.Dispose()};if($cts){$cts.Dispose()};if($client){$client.Dispose()}
}
$runId=[DateTime]::UtcNow.ToString('yyyyMMddTHHmmssZ')
$outputDir=Join-Path $root ('evidence/sanitized/catalogue-exporter/'+$runId)
[void][IO.Directory]::CreateDirectory($outputDir)
[IO.File]::WriteAllText((Join-Path $outputDir ('followup-'+$Mode.ToLowerInvariant()+'.json')),(ConvertTo-Json -InputObject $report -Depth 30),[Text.UTF8Encoding]::new($false))
$status=if($null -eq $report.http_status){'none'}else{[string]$report.http_status}
$entry="`n### Catalogue exporter followup: $Mode — $($report.requested_at_utc)`n`n- Operation: GET ``$endpoint``; HTTP status: $status; outcome: $($report.outcome).`n- Sanitized evidence: ``evidence/sanitized/catalogue-exporter/$runId/followup-$($Mode.ToLowerInvariant()).json``.`n- No authentication or personal data was sent; raw response was not saved.`n"
[IO.File]::AppendAllText((Join-Path $root 'docs/investigation-log.md'),$entry,[Text.UTF8Encoding]::new($false))
Write-Output ("Saved sanitized followup {0}: HTTP {1}, {2}" -f $Mode,$status,$report.outcome)
