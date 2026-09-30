param(
 [ValidateSet('SelfTest','Versions','Seasons')][string]$Mode='SelfTest',
 [ValidatePattern('^[0-9]{1,3}\.[0-9]{1,3}$')][string]$Version='42.10'
)

$ErrorActionPreference='Stop'
$ProgressPreference='SilentlyContinue'
$root=Split-Path $PSScriptRoot -Parent

function Get-SafeType($value) {
 if($null -eq $value){return 'null'}
 if($value -is [Collections.IDictionary]){return 'object'}
 if($value -is [array]){return 'array'}
 if($value -is [bool]){return 'boolean'}
 if($value -is [ValueType]){return 'number'}
 return 'string'
}

function Get-SafeProjection($data,[string]$mode) {
 $rootKeys=@()
 if($data -is [Collections.IDictionary]){$rootKeys=@($data.Keys | Where-Object {$_ -match '^[A-Za-z_]{1,60}$' -and $_ -notmatch '(?i)token|secret|authorization|cookie|receipt'} | Select-Object -First 30)}
 $summary=[ordered]@{root_type=(Get-SafeType $data);root_field_names=$rootKeys;root_array_count=if($data -is [array]){$data.Count}else{$null};version_strings=@();season_numbers=@();relevant_field_names=@();relevant_field_occurrences=0;visited_nodes=0;scan_limit=20000}
 $versions=[Collections.Generic.HashSet[string]]::new([StringComparer]::Ordinal)
 $seasons=[Collections.Generic.HashSet[int]]::new()
 $fields=[Collections.Generic.HashSet[string]]::new([StringComparer]::Ordinal)
 $queue=[Collections.Generic.Queue[object]]::new();$queue.Enqueue($data)
 while($queue.Count -gt 0 -and $summary.visited_nodes -lt $summary.scan_limit) {
  $node=$queue.Dequeue();$summary.visited_nodes++
  if($node -is [Collections.IDictionary]) {
   foreach($key in $node.Keys) {
    $value=$node[$key]
    if($key -match '(?i)battle.?pass|reward|quest|offer|unlock|release|page|prerequisite') {
     $summary.relevant_field_occurrences++
     if($key -match '^[A-Za-z_]{1,70}$' -and $key -notmatch '(?i)token|secret|authorization|cookie|receipt' -and $fields.Count -lt 40){[void]$fields.Add($key)}
    }
    if($key -match '(?i)^(season|seasonNumber)$' -and $value -is [ValueType] -and $value -isnot [bool] -and [int]$value -ge 1 -and [int]$value -le 100){[void]$seasons.Add([int]$value)}
    if($value -is [Collections.IDictionary] -or $value -is [array]){$queue.Enqueue($value)}
    elseif($mode -eq 'Versions' -and $value -is [string] -and $key -match '(?i)version|name|build') {
     foreach($match in [regex]::Matches($value,'(?<![0-9])([0-9]{1,3}\.[0-9]{1,3})(?![0-9])')){if($versions.Count -lt 100){[void]$versions.Add($match.Groups[1].Value)}}
    }
   }
  } elseif($node -is [array]) {
   foreach($value in $node) {
    if($value -is [Collections.IDictionary] -or $value -is [array]){$queue.Enqueue($value)}
    elseif($mode -eq 'Versions' -and $value -is [string]){foreach($match in [regex]::Matches($value,'(?<![0-9])([0-9]{1,3}\.[0-9]{1,3})(?![0-9])')){if($versions.Count -lt 100){[void]$versions.Add($match.Groups[1].Value)}}}
   }
  }
 }
 $summary.version_strings=@($versions|Sort-Object)
 $summary.season_numbers=@($seasons|Sort-Object)
 $summary.relevant_field_names=@($fields|Sort-Object)
 return $summary
}

if($Mode -eq 'SelfTest') {
 $sample=@{data=@(@{version='42.10';seasonNumber=42;rewards=@(@{offerId='synthetic-offer'})});access_token='synthetic-secret'}
 $projection=Get-SafeProjection $sample 'Versions'
 $json=ConvertTo-Json -InputObject $projection -Depth 20
 if($projection.version_strings -notcontains '42.10' -or $projection.season_numbers -notcontains 42 -or $projection.relevant_field_names -notcontains 'rewards' -or $json.Contains('synthetic-secret')){throw 'Sanitizer self-test failed'}
 Write-Output 'PASS: bounded public response projection and secret-value omission.'
 exit 0
}

$endpoint=if($Mode -eq 'Versions'){'/v1/versions'}else{'/v1/export/seasons?Version='+[uri]::EscapeDataString($Version)}
$report=[ordered]@{provider='FortniteAPI.com export service';method='GET';endpoint=$endpoint;requested_at_utc=[DateTime]::UtcNow.ToString('o');response_at_utc=$null;http_status=$null;response_date_utc=$null;outcome='transport_failure';shape=$null}
$client=$null;$request=$null;$response=$null;$cts=$null;$stream=$null;$memory=$null
try {
 $handler=[Net.Http.HttpClientHandler]::new();$handler.AllowAutoRedirect=$false
 $client=[Net.Http.HttpClient]::new($handler)
 $request=[Net.Http.HttpRequestMessage]::new([Net.Http.HttpMethod]::Get,('https://api.fortniteapi.com'+$endpoint))
 $cts=[Threading.CancellationTokenSource]::new([TimeSpan]::FromSeconds(20))
 $response=$client.SendAsync($request,[Net.Http.HttpCompletionOption]::ResponseHeadersRead,$cts.Token).GetAwaiter().GetResult()
 $report.http_status=[int]$response.StatusCode
 $report.response_at_utc=[DateTime]::UtcNow.ToString('o')
 if($response.Headers.Date){$report.response_date_utc=([DateTimeOffset]$response.Headers.Date).UtcDateTime.ToString('o')}
 $stream=$response.Content.ReadAsStreamAsync($cts.Token).GetAwaiter().GetResult()
 $memory=[IO.MemoryStream]::new();$buffer=[byte[]]::new(8192)
 while(($n=$stream.ReadAsync($buffer,0,$buffer.Length,$cts.Token).GetAwaiter().GetResult()) -gt 0){
  if($memory.Length+$n -gt 512KB){throw 'Response size limit'}
  $memory.Write($buffer,0,$n)
 }
 $raw=[Text.Encoding]::UTF8.GetString($memory.ToArray())
 $data=$null
 try{$data=ConvertFrom-Json -InputObject $raw -AsHashtable -Depth 100 -NoEnumerate}catch{}
 $report.outcome=if($report.http_status -ge 200 -and $report.http_status -lt 300){'http_success'}else{'http_error'}
 $report.shape=if($null -ne $data){Get-SafeProjection $data $Mode}else{[ordered]@{type='non_json_or_null';body_length=$raw.Length}}
} catch {$report.outcome='transport_or_processing_failure';$report.shape=[ordered]@{type='response_suppressed'}}
finally {
 if($memory){$memory.Dispose()};if($stream){$stream.Dispose()};if($response){$response.Dispose()};if($request){$request.Dispose()};if($cts){$cts.Dispose()};if($client){$client.Dispose()}
}
$runId=[DateTime]::UtcNow.ToString('yyyyMMddTHHmmssZ')
$outputDir=Join-Path $root ('evidence/sanitized/catalogue-exporter/'+$runId)
[void][IO.Directory]::CreateDirectory($outputDir)
$json=ConvertTo-Json -InputObject $report -Depth 30
[IO.File]::WriteAllText((Join-Path $outputDir ($Mode.ToLowerInvariant()+'.json')),$json,[Text.UTF8Encoding]::new($false))
$status=if($null -eq $report.http_status){'none'}else{[string]$report.http_status}
$entry="`n### Catalogue exporter probe: $Mode — $($report.requested_at_utc)`n`n- Operation: GET ``$endpoint``; HTTP status: $status; outcome: $($report.outcome).`n- Sanitized evidence: ``evidence/sanitized/catalogue-exporter/$runId/$($Mode.ToLowerInvariant()).json``.`n- No authentication or personal data was sent; raw response was not saved.`n"
[IO.File]::AppendAllText((Join-Path $root 'docs/investigation-log.md'),$entry,[Text.UTF8Encoding]::new($false))
Write-Output ("Saved sanitized {0}: HTTP {1}, {2}" -f $Mode,$status,$report.outcome)
