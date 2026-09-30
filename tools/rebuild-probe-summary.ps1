$ErrorActionPreference = 'Stop'
$root = Split-Path $PSScriptRoot -Parent
$base = Join-Path $root 'evidence/sanitized/api-fortnite'
$summaryPath = Join-Path $base 'probe-summary.json'
$prior = @(Get-Content -Raw -LiteralPath $summaryPath | ConvertFrom-Json -AsHashtable)

function Read-Run([string]$runId) {
 $dir = Join-Path $base $runId
 foreach ($file in @(Get-ChildItem -LiteralPath $dir -Filter '*.json' -File | Sort-Object Name)) {
  $report = Get-Content -Raw -LiteralPath $file.FullName | ConvertFrom-Json -AsHashtable
  [ordered]@{
   method = $report.method
   endpoint = $report.endpoint
   requested_at_utc = $report.requested_at_utc
   response_at_utc = $report.response_at_utc
   http_status = $report.http_status
   outcome = $report.outcome
   note = $null
  }
 }
}

if ($prior.Count -eq 81) {
 if (@($prior | Where-Object { $_.outcome -eq 'capture_interrupted' }).Count -ne 1) { throw 'Existing 81-entry ledger failed incident check' }
 Write-Output 'Sanitized probe ledger already contains 81 dispatched requests.'
 exit 0
}
if ($prior.Count -eq 80) {
 $latest = @(Read-Run '20260916T082731Z' | Sort-Object requested_at_utc)
 $combined = @($prior) + $latest
 if ($combined.Count -ne 81) { throw 'Unexpected active playlist request count' }
 [IO.File]::WriteAllText($summaryPath, (ConvertTo-Json -InputObject $combined -Depth 10), [Text.UTF8Encoding]::new($false))
 Write-Output 'Extended sanitized probe ledger to 81 dispatched requests.'
 exit 0
}
if ($prior.Count -eq 77) {
 $latest = @()
 foreach($run in @('20260916T082310Z','20260916T082351Z','20260916T082731Z')){$latest += @(Read-Run $run | Sort-Object requested_at_utc)}
 $combined = @($prior) + $latest
 if ($combined.Count -ne 81) { throw 'Unexpected SDK playlist request count' }
 [IO.File]::WriteAllText($summaryPath, (ConvertTo-Json -InputObject $combined -Depth 10), [Text.UTF8Encoding]::new($false))
 Write-Output 'Extended sanitized probe ledger to 81 dispatched requests.'
 exit 0
}
if ($prior.Count -eq 71) {
 $latest = @()
 foreach($run in @('20260916T081843Z','20260916T081946Z','20260916T082110Z','20260916T082310Z','20260916T082351Z','20260916T082731Z')){$latest += @(Read-Run $run | Sort-Object requested_at_utc)}
 $combined = @($prior) + $latest
 if ($combined.Count -ne 81) { throw 'Unexpected SDK followup request count' }
 [IO.File]::WriteAllText($summaryPath, (ConvertTo-Json -InputObject $combined -Depth 10), [Text.UTF8Encoding]::new($false))
 Write-Output 'Extended sanitized probe ledger to 81 dispatched requests.'
 exit 0
}
if ($prior.Count -eq 70) {
 $latest = @()
 foreach($run in @('20260916T081305Z','20260916T081843Z','20260916T081946Z','20260916T082110Z','20260916T082310Z','20260916T082351Z','20260916T082731Z')){$latest += @(Read-Run $run | Sort-Object requested_at_utc)}
 $combined = @($prior) + $latest
 if ($combined.Count -ne 81) { throw 'Unexpected latest request count' }
 [IO.File]::WriteAllText($summaryPath, (ConvertTo-Json -InputObject $combined -Depth 10), [Text.UTF8Encoding]::new($false))
 Write-Output 'Extended sanitized probe ledger to 81 dispatched requests.'
 exit 0
}
if ($prior.Count -eq 66) {
 $latest = @()
 foreach($run in @('20260916T080852Z','20260916T081305Z','20260916T081843Z','20260916T081946Z','20260916T082110Z','20260916T082310Z','20260916T082351Z','20260916T082731Z')){$latest += @(Read-Run $run | Sort-Object requested_at_utc)}
 $combined = @($prior) + $latest
 if ($combined.Count -ne 81) { throw 'Unexpected latest request count' }
 [IO.File]::WriteAllText($summaryPath, (ConvertTo-Json -InputObject $combined -Depth 10), [Text.UTF8Encoding]::new($false))
 Write-Output 'Extended sanitized probe ledger to 81 dispatched requests.'
 exit 0
}
if ($prior.Count -ne 34) { throw 'Expected original 34-entry sanitized ledger' }

$first = @(Read-Run '20260915T192435Z' | Sort-Object requested_at_utc)
$interrupted = [ordered]@{
 method = 'GET'
 endpoint = '/api/v1/events/cashprizes'
 requested_at_utc = $null
 response_at_utc = $null
 http_status = $null
 outcome = 'capture_interrupted'
 note = 'Dispatched after events_global in run 20260915T192435Z. The local process was stopped while CPU-bound in sanitization; exact response status and timestamps were not retained. No response artifact exists.'
}
$later = @(
 '20260915T192801Z',
 '20260916T075859Z',
 '20260916T080056Z',
 '20260916T080206Z',
 '20260916T080324Z',
 '20260916T080852Z',
 '20260916T081305Z',
 '20260916T081843Z',
 '20260916T081946Z',
 '20260916T082110Z',
 '20260916T082310Z',
 '20260916T082351Z',
 '20260916T082731Z'
)
$additional = @()
foreach ($run in $later) { $additional += @(Read-Run $run | Sort-Object requested_at_utc) }
$combined = @($prior) + $first + @($interrupted) + $additional
if ($combined.Count -ne 81) { throw 'Unexpected request count in rebuilt ledger' }
$json = ConvertTo-Json -InputObject $combined -Depth 10
[IO.File]::WriteAllText($summaryPath, $json, [Text.UTF8Encoding]::new($false))
Write-Output 'Rebuilt sanitized probe ledger: 81 dispatched requests, including one uncaptured response.'
