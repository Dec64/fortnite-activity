param()
$ErrorActionPreference = 'Stop'
# Offline documentation inventory only. No network or credential access.
$root = Split-Path $PSScriptRoot -Parent
$specPath = Join-Path $root 'evidence/sanitized/specifications/api-fortnite-openapi.json'
$spec = Get-Content -Raw -LiteralPath $specPath | ConvertFrom-Json -AsHashtable
$rows = [Collections.Generic.List[object]]::new()
$explicitPrivate = @(
 '/api/v2/events/players/{accountId}/history', '/api/v2/fn/privacy/{accountId}',
 '/api/v2/fn/entitlement', '/api/v2/fn/entitlement/{accountId}', '/api/v1/profile/level',
 '/api/v2/sprites/collection', '/api/v2/sprites/collection/all', '/api/v2/sprites/collection/publish',
 '/api/v1/events/tracker', '/api/v1/events/tracker/eligibility', '/api/v1/events/player',
 '/api/v1/events/player/{accountId}/matches', '/api/v1/events/player/{accountId}/session',
 '/api/v1/events/powerrankings/player/{identifier}'
)
$optionalPrivate = @('/api/v1/events/tracker/eligibility/{identifier}/{eventId}', '/api/v1/events/powerrankings', '/api/v1/events/global/leaderboard')
$explicitPublic = @('/api/v1/profile/progress', '/api/v2/events/{eventId}/windows/{eventWindowId}/leaderboard/player', '/api/v2/events/{eventId}/windows/{eventWindowId}/players/{accountId}', '/api/v1/events/{eventId}/{eventWindowId}/player/{accountId}/matches', '/api/v1/events/powerrankings/search', '/api/v1/events/powerrankings/archive/{accountId}', '/api/v2/sprites/collection/shared/{accountIdOrName}')
$uncertainPrivate = @('/api/v2/quests/{accountId}', '/api/v2/fn/br-inventory/{accountId}', '/api/v2/fn/receipts/{accountId}', '/api/v1/events/tokens', '/api/v1/profile/leaderboard/{gameId}')
foreach ($path in $spec.paths.Keys) {
 foreach ($method in $spec.paths[$path].Keys) {
  if ($method -notin @('get','post','put','patch','delete','head','options','trace')) { continue }
  $op = $spec.paths[$path][$method]
  $auth = 'KEY; player token not documented'
  $authBasis = 'Provider docs require x-api-key globally; operation does not establish whether additional auth is needed. Do not infer anonymous access.'
  if ($path -in $explicitPrivate) { $auth = 'KEY + PLAYER (documented)'; $authBasis = 'Operation summary/description requires x-fortnite-token; use the token owner where scoped.' }
  elseif ($path -like '/api/v1/friends/*') { $auth = 'KEY + PLAYER (website documented)'; $authBasis = 'Provider docs Friends & Social section requires user OAuth token; operation omits it.' }
  elseif ($path -in $optionalPrivate) { $auth = 'KEY + optional PLAYER (documented)'; $authBasis = 'Operation describes token-free and personalized/verified results separately.' }
  elseif ($path -in $explicitPublic) { $auth = 'KEY; no PLAYER (documented)'; $authBasis = 'Operation explicitly describes no player token or provider service auth. The provider manages service credentials.' }
  elseif ($path -in $uncertainPrivate) { $auth = 'KEY + PLAYER candidate (unverified)'; $authBasis = 'Personal-data or profile route; token requirement is absent from operation schema. Quests/inventory have historical private-wrapper context in handoff.' }
  if ($path -like '/api/v1/oauth/*') {
   $auth = 'KEY + flow-specific input (documented)'
   $authBasis = switch ($path) {
    '/api/v1/oauth/get-token' { 'Starts OAuth; no player token input declared.' }
    '/api/v1/oauth/complete' { 'JSON CompleteOAuthRequest with flowId.' }
    '/api/v1/oauth/refresh-token' { 'JSON RefreshTokenRequest with refreshToken.' }
    '/api/v1/oauth/refresh-device' { 'JSON RefreshDeviceRequest with accountId, deviceId, secret.' }
    '/api/v1/oauth/revoke-device' { 'JSON RefreshDeviceRequest with accountId, deviceId, secret; permanently revokes device auth.' }
    '/api/v1/oauth/exchange-code' { 'JSON ExchangeCodeRequest; see exact body schema in snapshot.' }
    '/api/v1/oauth/link' { 'JSON LinkRequest; exchanges code and produces device auth.' }
    '/api/v1/oauth/authorize-url' { 'redirectUri query; returns authorization URL; server-side state effects unspecified.' }
   }
  }
  if ($path -like '/api/v1/custom-match/*') { $auth = 'KEY; caller ownership/custom plan; additional auth uncertain'; $authBasis = 'x-plans and caller-owned pool descriptions; registering accounts supplies device auth in body.' }
  $risk = 'READ_LOW'
  $riskBasis = 'Documented retrieval; no account mutation described. Normal server logging/cache/quota effects remain possible; runtime unverified.'
  $disposition = 'Inventory only; outside proposed first probe batch unless explicitly listed in probe plan.'
  if ($method -ne 'get') {
   $risk = 'MUTATION_BLOCKED'; $riskBasis = 'State-changing operation; prohibited for tracker research.'
   if ($path -in @('/api/v1/account/external/displayNames/bulk','/api/v1/account/external/ids/bulk','/api/v1/profile/trackprogress/bulk','/api/v1/profile/leaderboard/{gameId}','/api/v2/stats/bulk')) {
    $risk = 'READ_POST'; $riskBasis = 'Summary describes lookup, stats or leaderboard retrieval despite POST; body/authorization still require validation.'
   }
  }
  if ($path -like '/api/v1/oauth/*' -and $path -ne '/api/v1/oauth/revoke-device') { $risk='AUTH_STATE'; $riskBasis='Creates/consumes authentication flow or issues/renews tokens; not a pure read. authorize-url returns auth URL with unspecified state effects.' }
  if ($path -like '/api/v1/parsing*' -or $path -like '/api/v1/replays/*/parse*') { $risk='PROCESSING_QUOTA'; $riskBasis='Replay upload or download-and-parse processing; may consume parsing credits and persist/cache output. No gameplay mutation documented.' }
  if ($path -eq '/api/v1/events/tracker/eligibility') { $risk='READ_BACKGROUND_JOB'; $riskBasis='GET explicitly starts historical participation backfill on first request; provider work/state changes.' }
  if ($path -like '/api/v1/events/stats/*' -or $path -eq '/api/v1/events/{eventId}/{eventWindowId}/player/{accountId}/matches' -or $path -eq '/api/v2/events/{eventId}/windows/{eventWindowId}/players/{accountId}') { $risk='READ_AMPLIFIED'; $riskBasis='Provider can scan multiple/all leaderboard pages; one client request can generate substantial upstream work.' }
  if ($risk -eq 'MUTATION_BLOCKED') { $disposition='Excluded: no execution authorized or proposed.' }
  if ($path -like '/api/v1/custom-match/*' -or $path -like '/api/v1/identity/*' -or $path -like '/api/v2/fn/receipts/*' -or $path -like '/api/v2/fn/privacy/*') { $disposition='Excluded from first batch: bot/identity administration or unnecessary personal data; mutations remain prohibited.' }
  $rows.Add([pscustomobject][ordered]@{
   method=$method.ToUpper(); path=$path; operationId=$op.operationId; tags=$op.tags
   summary=$op.summary; description=$op.description; plans=$op['x-plans']
   authentication=$auth; authentication_basis=$authBasis
   formal_security=$(if($op.Contains('security')){$op.security}else{$spec.security})
   mutation_risk=$risk; mutation_risk_basis=$riskBasis; disposition=$disposition
   path_parameters=$spec.paths[$path].parameters; parameters=$op.parameters
   request_body=$op.requestBody; responses=$op.responses; deprecated=[bool]$op.deprecated
  })
 }
}
$out = Join-Path $root 'evidence/sanitized/specifications/api-fortnite-operations.json'
ConvertTo-Json -InputObject @($rows.ToArray()) -Depth 60 | Set-Content -LiteralPath $out -Encoding utf8
$lines=[Collections.Generic.List[string]]::new()
$lines.Add('# api-fortnite.com operation inventory')
$lines.Add('')
$lines.Add('Snapshot: 2026-09-14. 140 operations across 138 paths, OpenAPI 3.0.1. Documentation evidence only; no operation in this inventory has been live-tested in this phase.')
$lines.Add('')
$lines.Add('Sources: [downloaded specification](../evidence/sanitized/specifications/api-fortnite-openapi.json), [provider OpenAPI](https://prod.api-fortnite.com/swagger/v1/swagger.json), [provider authentication documentation](https://api-fortnite.com/docs). Machine-readable [full inventory](../evidence/sanitized/specifications/api-fortnite-operations.json) retains parameters, body and response schemas, plans, auth/risk rationale and operation descriptions. Resolve component references against the saved specification.')
$lines.Add('')
$lines.Add('## Authentication interpretation')
$lines.Add('')
$lines.Add('KEY = x-api-key, required globally by the website. PLAYER = x-fortnite-token, separate from the provider key. The snapshot has no securitySchemes, no root security and no operation security declarations. A 401 response alone does not identify which credential is required. No-player-token claims do not waive the provider key. Unknown additional authentication remains unknown; this inventory is not permission to try every route. Health-route exceptions, plan enforcement and actual credential scopes are unverified. x-plans is copied verbatim; missing plans mean unspecified.')
$lines.Add('')
$lines.Add('## Mutation risk interpretation')
$lines.Add('')
$lines.Add('READ_LOW: documented retrieval; READ_POST: POST documented as retrieval; READ_AMPLIFIED: potentially many upstream reads; READ_BACKGROUND_JOB: starts provider backfill; PROCESSING_QUOTA: replay processing/upload and credit consumption; AUTH_STATE: authentication flow/token state; MUTATION_BLOCKED: account/provider/share/credential changes excluded from execution. These classify documented effects, not guarantees about undocumented implementation side effects.')
$lines.Add('')
$lines.Add('| Method | Path | Plans | Authentication | Mutation risk |')
$lines.Add('| --- | --- | --- | --- | --- |')
foreach($r in $rows) { $lines.Add(('| {0} | `{1}` | {2} | {3} | {4} |' -f $r.method,$r.path,($r.plans -join ', '),$r.authentication,$r.mutation_risk)) }
$lines.Add('')
$lines.Add('## Counts')
$lines.Add('')
foreach($g in ($rows | Group-Object mutation_risk | Sort-Object Name)) { $lines.Add(('- {0}: {1}' -f $g.Name,$g.Count)) }
$lines | Set-Content -LiteralPath (Join-Path $root 'docs/api-fortnite-operation-inventory.md') -Encoding utf8
Write-Output ('Inventoried {0} operations across {1} paths.' -f $rows.Count,$spec.paths.Count)
$rows | Group-Object mutation_risk | Select-Object Name,Count
