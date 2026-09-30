param(
 [ValidateSet('SelfTest','SeasonDefinition','QuestDefinition')][string]$Mode='SelfTest'
)

$ErrorActionPreference='Stop';$ProgressPreference='SilentlyContinue';$root=Split-Path $PSScriptRoot -Parent

function Get-SafeSearchShape($data){
 $paths=[Collections.Generic.HashSet[string]]::new([StringComparer]::Ordinal)
 $fields=[Collections.Generic.HashSet[string]]::new([StringComparer]::Ordinal)
 $summary=[ordered]@{root_type=$null;root_count=$null;safe_field_names=@();game_asset_path_candidates=@();visited_nodes=0;string_nodes=0;scan_limit=20000}
 if($null -eq $data){$summary.root_type='null'}elseif($data -is [Collections.IDictionary]){$summary.root_type='object'}elseif($data -is [array]){$summary.root_type='array';$summary.root_count=$data.Count}else{$summary.root_type=$data.GetType().Name}
 $queue=[Collections.Generic.Queue[object]]::new();$queue.Enqueue($data)
 while($queue.Count -gt 0 -and $summary.visited_nodes -lt $summary.scan_limit){
  $node=$queue.Dequeue();$summary.visited_nodes++
  if($node -is [Collections.IDictionary]){
   foreach($key in $node.Keys){
    if($key -match '^[A-Za-z_][A-Za-z0-9_]{0,79}$' -and $key -notmatch '(?i)token|secret|authorization|cookie|receipt|password|email|account|device' -and $fields.Count -lt 50){[void]$fields.Add([string]$key)}
    $value=$node[$key]
    if($value -is [Collections.IDictionary] -or $value -is [array]){$queue.Enqueue($value)}elseif($value -is [string]){$queue.Enqueue($value)}
   }
  }elseif($node -is [array]){foreach($value in $node){if($value -is [Collections.IDictionary] -or $value -is [array] -or $value -is [string]){$queue.Enqueue($value)}}}
  elseif($node -is [string]){
   $summary.string_nodes++
   if($node -notmatch '(?i)token|secret|authorization|cookie|receipt|password|email|account|device'){
    foreach($match in [regex]::Matches($node,'/Game/[A-Za-z0-9_./-]{1,240}')){if($paths.Count -lt 30){[void]$paths.Add($match.Value.TrimEnd('.'))}}
   }
  }
 }
 $summary.safe_field_names=@($fields|Sort-Object);$summary.game_asset_path_candidates=@($paths|Sort-Object);return $summary
}

if($Mode -eq 'SelfTest'){
 $sample=@{results=@(@{line='PrimaryAsset Path="/Game/Athena/Test/QuestDefs"';access_token='synthetic-secret'});other='synthetic-value'}
 $shape=Get-SafeSearchShape $sample;$json=ConvertTo-Json $shape -Depth 20
 if($shape.game_asset_path_candidates -notcontains '/Game/Athena/Test/QuestDefs' -or $shape.safe_field_names -contains 'access_token' -or $json.Contains('synthetic-secret') -or $json.Contains('synthetic-value')){throw 'INI search sanitizer self-test failed'}
 Write-Output 'PASS: INI-search projection retains only safe shape and game paths.';exit 0
}

$query=if($Mode -eq 'SeasonDefinition'){'AthenaSeasonItemDefinition'}else{'FortQuestItemDefinition'}
$endpoint='/v1/export/search?Query='+[uri]::EscapeDataString($query)
$report=[ordered]@{provider='FortniteAPI.com export service';method='GET';endpoint=$endpoint;requested_at_utc=[DateTime]::UtcNow.ToString('o');response_at_utc=$null;http_status=$null;response_date_utc=$null;outcome='transport_failure';shape=$null}
$client=$null;$request=$null;$response=$null;$cts=$null;$stream=$null;$memory=$null
try{
 $handler=[Net.Http.HttpClientHandler]::new();$handler.AllowAutoRedirect=$false;$client=[Net.Http.HttpClient]::new($handler)
 $request=[Net.Http.HttpRequestMessage]::new([Net.Http.HttpMethod]::Get,('https://api.fortniteapi.com'+$endpoint));$cts=[Threading.CancellationTokenSource]::new([TimeSpan]::FromSeconds(20))
 $response=$client.SendAsync($request,[Net.Http.HttpCompletionOption]::ResponseHeadersRead,$cts.Token).GetAwaiter().GetResult();$report.http_status=[int]$response.StatusCode;$report.response_at_utc=[DateTime]::UtcNow.ToString('o')
 if($response.Headers.Date){$report.response_date_utc=([DateTimeOffset]$response.Headers.Date).UtcDateTime.ToString('o')}
 $stream=$response.Content.ReadAsStreamAsync($cts.Token).GetAwaiter().GetResult();$memory=[IO.MemoryStream]::new();$buffer=[byte[]]::new(8192)
 while(($count=$stream.ReadAsync($buffer,0,$buffer.Length,$cts.Token).GetAwaiter().GetResult()) -gt 0){if($memory.Length+$count -gt 512KB){throw 'Response size limit'};$memory.Write($buffer,0,$count)}
 $raw=[Text.Encoding]::UTF8.GetString($memory.ToArray());$data=$null;try{$data=ConvertFrom-Json $raw -AsHashtable -Depth 100 -NoEnumerate}catch{}
 $report.outcome=if($report.http_status -ge 200 -and $report.http_status -lt 300){'http_success'}else{'http_error'};$report.shape=if($null -ne $data){Get-SafeSearchShape $data}else{[ordered]@{type='non_json_or_null';body_length=$raw.Length}}
}catch{$report.outcome='transport_or_processing_failure';$report.shape=[ordered]@{type='response_suppressed'}}
finally{if($memory){$memory.Dispose()};if($stream){$stream.Dispose()};if($response){$response.Dispose()};if($request){$request.Dispose()};if($cts){$cts.Dispose()};if($client){$client.Dispose()}}

$runId=[DateTime]::UtcNow.ToString('yyyyMMddTHHmmssZ');$outputDir=Join-Path $root ('evidence/sanitized/catalogue-exporter/'+$runId);[void][IO.Directory]::CreateDirectory($outputDir)
$filename='ini-search-'+$Mode.ToLowerInvariant()+'.json';$relative="evidence/sanitized/catalogue-exporter/$runId/$filename";[IO.File]::WriteAllText((Join-Path $root $relative),(ConvertTo-Json $report -Depth 30),[Text.UTF8Encoding]::new($false))
$status=if($null -eq $report.http_status){'none'}else{[string]$report.http_status};$entry="`n### Catalogue exporter INI search: $Mode — $($report.requested_at_utc)`n`n- Operation: GET ``/v1/export/search?Query=$query``; HTTP status: $status; outcome: $($report.outcome).`n- Sanitized evidence: ``$relative``.`n- Only response shape, safe field names and ``/Game/...`` path substrings were retained. No authentication or personal data was sent; raw response was not saved.`n"
[IO.File]::AppendAllText((Join-Path $root 'docs/investigation-log.md'),$entry,[Text.UTF8Encoding]::new($false));Write-Output ("Saved sanitized INI search {0}: HTTP {1}, {2}" -f $Mode,$status,$report.outcome)
