# api-fortnite.com probe results — 14–15 September 2026

**This document covers the initial twenty-three-request authentication/private-data stage.** Six authentication POSTs and seventeen GETs completed. Stored-device authentication returned 400 twice with the old credentials; a newly issued device-auth set then returned 200 with the exact expected identity and was persisted successfully. The private batch returned level 200, quests 401, BR inventory 200 and entitlement 404. Only api-fortnite.com was contacted. The later stats/ranks/sprites continuation is documented separately in [api-fortnite-stats-ranks-sprites-results.md](api-fortnite-stats-ranks-sprites-results.md).

## Evidence ledger

All times indicate UTC request start. Rows without a date are from 2026-09-14; later rows include the 2026-09-15 date. Original full timestamps, response times, response Date headers, auth category and sanitized response projections are in the linked files. The [aggregate JSON ledger](../evidence/sanitized/api-fortnite/probe-summary.json) records all 23 network requests, including the one result lost to the local capture failure. No request headers, credential values or raw bodies were saved.

| UTC | Method and endpoint | HTTP | Observed result |
| --- | --- | --- | --- |
| 15:00:13.1831485 | GET `/api/v1/season` | 200 | Four fields; seasonNumber=42, season start/end dates. Provider-key control succeeded. |
| 15:00:14.8467490 | POST `/api/v1/oauth/refresh-device` | 400 | No recognized access/refresh token; expected identity not verified. Private gate closed. |
| 15:00:16.0513905 | GET `/api/v1/crew/current` | 200 | Public object with 15 fields; cosmetic-template strings present; lastModified=2026-09-03T02:26:18.104Z. |
| 15:00:17.2753690 | GET `/api/v2/cosmetics/all?page=1&pageSize=1&lang=en` | 200 | One cosmetic metadata item; provider reports total=21926. This is not an owned-item count. |
| 15:00:19.5673820 | GET `/api/v2/battlepass` | 404 | Body status=404; recognized message that no Battle Pass has been extracted. |
| 15:00:20.7352598 | GET `/api/v2/battlepass/seasons` | 200 | Body `{status: 200, data: []}`; no archived catalogue entries in this response. |
| 15:00:21.8000946 | GET `/api/v1/shop/battlepass?lang=en` | 200 | Three root fields; initial sanitizer omitted their subtrees. No reward-catalogue conclusion from this capture. |
| 15:03:07.6932628 | GET `/api/v1/crew/current` | 200 | Second capture retains anonymous nested field structures; same lastModified and public cosmetic-content signal. |
| 15:03:09.2151099 | GET `/api/v2/battlepass?season=42` | 404 | Explicit current-season selection also fails. Exact message text was not saved; do not assume it equals the default-route message. |
| 15:03:10.3132615 | GET `/api/v1/shop/battlepass?lang=en` | 200 | News/MOTD terms, title/body/image/message structures; no offerGuid or explicit unlock/release fields detected. Not verified as a reward catalogue. |
| 2026-09-15 18:24:49.5263202 | POST `/api/v1/oauth/refresh-device` | 400 | Second and final permitted attempt. Two-field error object, embedded HTTP 400 signal, no access/refresh token, no identity, no changed device credentials; safe category remains unclassified. Private gate closed. |
| 2026-09-15 18:33:36.3311997 | GET `/api/v1/oauth/get-token` | 200 | Device-code flow started; one approved HTTPS user URL opened locally. Flow values suppressed. |
| 2026-09-15 18:34:26.6896644 | POST `/api/v1/oauth/complete` | 200 | Exactly one access token and the expected identity were present; refresh token/device credentials also present. All discarded on process exit. |
| Time/status unavailable | GET `/api/v1/profile/level?accountId={verifiedAccountId}` | Unknown | Request was sent after identity verification, but report output was rejected because its endpoint included the protected account identifier. No response conclusion is possible. |
| 2026-09-15 18:40:03.3358983 | GET `/api/v1/oauth/get-token` | 200 | Second interactive flow started; approved HTTPS URL opened locally. |
| 2026-09-15 18:40:24.6440637 | POST `/api/v1/oauth/complete` | 200 | Exact expected identity and one access token verified again. |
| 2026-09-15 18:40:25.4562297 | GET `/api/v1/profile/level?accountId={verifiedAccountId}` | 200 | Level 214, XP 66,601, account level 3,256; nested pass tier 214 and purchased=false. |
| 2026-09-15 18:40:26.0695771 | GET `/api/v2/quests/{verifiedAccountId}` | 401 | Two-field status/error response with embedded HTTP 401; no quest data. |
| 2026-09-15 18:40:26.7108652 | GET `/api/v2/fn/br-inventory/{verifiedAccountId}` | 200 | Exact shape `{stash: {globalcash: 0}}`; no cosmetic ownership or style data. |
| 2026-09-15 18:40:27.2274804 | GET `/api/v2/fn/entitlement` | 404 | Two-field status/error response with embedded HTTP 404; no entitlement data. |
| 2026-09-15 18:50:35.7619248 | GET `/api/v1/oauth/get-token` | 200 | Credential-rotation device-code flow started; values suppressed. |
| 2026-09-15 18:51:05.5033553 | POST `/api/v1/oauth/complete` | 200 | Exact expected identity, access token and one newly issued device-auth set verified in memory. |
| 2026-09-15 18:51:06.3341200 | POST `/api/v1/oauth/refresh-device` | 200 | Newly issued device auth returned the exact expected identity and an access token. The new device ID/secret were then written to Windows user scope and read-back verified. |

First-run evidence: [authentication](../evidence/sanitized/api-fortnite/20260914T150012Z/authentication.json), [season](../evidence/sanitized/api-fortnite/20260914T150012Z/season.json), [Crew](../evidence/sanitized/api-fortnite/20260914T150012Z/crew.json), [cosmetics](../evidence/sanitized/api-fortnite/20260914T150012Z/cosmetics.json), [pass catalogue](../evidence/sanitized/api-fortnite/20260914T150012Z/battlepass.json), [pass seasons](../evidence/sanitized/api-fortnite/20260914T150012Z/battlepass_seasons.json), [shop pass](../evidence/sanitized/api-fortnite/20260914T150012Z/battlepass_shop.json).

Followup evidence: [Crew](../evidence/sanitized/api-fortnite/20260914T150306Z/crew.json), [explicit-season catalogue](../evidence/sanitized/api-fortnite/20260914T150306Z/battlepass_explicit_season.json), [shop pass](../evidence/sanitized/api-fortnite/20260914T150306Z/battlepass_shop.json).

Authentication diagnostic evidence: [second device-auth attempt](../evidence/sanitized/api-fortnite/20260915T182448Z/authentication.json).

Interactive OAuth evidence: [flow initiation](../evidence/sanitized/api-fortnite/20260915T183336Z/oauth_get_token.json) and [identity-verified completion](../evidence/sanitized/api-fortnite/20260915T183336Z/oauth_complete.json). The lost level result has no response artifact.

Corrected private-batch evidence: [flow initiation](../evidence/sanitized/api-fortnite/20260915T184003Z/oauth_get_token.json), [identity-verified completion](../evidence/sanitized/api-fortnite/20260915T184003Z/oauth_complete.json), [level](../evidence/sanitized/api-fortnite/20260915T184003Z/level.json), [quests](../evidence/sanitized/api-fortnite/20260915T184003Z/quests.json), [BR inventory](../evidence/sanitized/api-fortnite/20260915T184003Z/inventory.json), and [entitlement](../evidence/sanitized/api-fortnite/20260915T184003Z/entitlement.json).

Credential-rotation evidence: [flow completion](../evidence/sanitized/api-fortnite/20260915T185035Z/oauth_complete.json), [new-device refresh validation](../evidence/sanitized/api-fortnite/20260915T185035Z/refresh_new_device.json), and [local persistence result](../evidence/sanitized/api-fortnite/20260915T185035Z/credential_rotation.json).

## Conclusions and confidence

| Area | Conclusion | Confidence / next action |
| --- | --- | --- |
| Provider key | Selected key-only routes, including documented Pro cosmetic access, succeeded. | High for those requests; no account-tier introspection was performed. |
| Authentication | Old stored device auth returned 400 twice. Interactive OAuth issued a different device ID and secret; those new values returned refresh-device 200 with the exact expected identity and were persisted with read-back verification. | High: unattended provider authentication is restored. The prior credential set was invalid/stale for this service; the exact invalidation cause is unknown and no longer blocks progress. |
| Profile/level | Identity-verified GET returned 200 with level 214, XP 66,601, account level 3,256 and pass tier 214. | High for current numeric values. `purchased=false` conflicts with historical personal profile/Crew evidence and is not trustworthy as pass-ownership truth. |
| Crew | Public Crew content is available; it establishes neither personal subscription status nor personal access to pass rewards. | High for response availability; current membership remains unverified. |
| Quests | Returned HTTP 401 with the exact-identity token that immediately succeeded on level and inventory. No quest payload was returned. | High: endpoint-specific provider/upstream auth failure is reproduced; this is not a general token or identity failure. Provider repair is required for this route. |
| Locker/inventory | Returned HTTP 200 with only `stash.globalcash=0`. Provider SDK documents this route as V-Bucks inventory; public cosmetics remain global metadata. | High: api-fortnite.com has no documented cosmetic-ownership/style surface. Use `athena` ownership data only after provider-only scope is closed. |
| Entitlements | Returned HTTP 404 with the same fresh exact-identity token; level and inventory succeeded around it. | High for endpoint-specific 404; no entitlement-absence inference. Provider must clarify/fix semantics. |
| Battle Pass catalogue | Default and explicit season 42 returned HTTP 404; archive list empty. Current catalogue unavailability is observed independently of player claims. | High for this snapshot; no permanent provider-wide impossibility claim. |
| Shop Battle Pass | Preserved shape is consistent with news/MOTD content despite the current reward-oriented summary. It does not establish reward pages, offers or availability. | Medium-high shape-based inference; arbitrary string values were suppressed. |
| Remaining pass rewards | No complete catalogue or release/prerequisite denominator obtained. | Unknown; never zero/all-claimed by inference. |

## Capture limitations and validation

The initial authentication projector retained status, token-presence booleans and identity-verification outcome but discarded the error-body shape/text. A separately authorized second request retained safe structure but only a generic embedded HTTP 400 signal. Interactive OAuth later issued a different credential set, and refresh-device accepted it with HTTP 200 and the exact identity. This resolves the operational blocker and establishes that the old set—not the request shape or refresh route—caused the failure, without proving how the old set became invalid.

After interactive OAuth, the actual level URL was reused as the report endpoint. Because it contained the protected expected identity, the secret guard rejected the report after the GET had already been sent. The transport/report paths are now separated, with `{verifiedAccountId}` in evidence and a regression test for the guard. Exact response status/time/shape for that first level request are irrecoverable.

The corrected retry reproduced interactive OAuth success and saved all four private results. This makes quests 401 and entitlement 404 comparable against level 200 and inventory 200 under the same token and verified identity. It also confirms the historical BR inventory shape exactly. No endpoint was retried after this completed batch.

Initial Crew/shop captures omitted unknown subtrees. A second and final GET of each preserved those subtrees under anonymous field labels. String values remain suppressed; arrays preserve total counts but only the first three element shapes, and recursion stops after eight levels. Content flags are literal-pattern observations, not complete semantic parsers. A false flag means the exact checked pattern was not found, not proof that all equivalent fields are absent. Sanitized reports are structural evidence, not full replayable response fixtures.

The season-selector originally recognized season/currentSeason but missed the documented seasonNumber property. The fix used the already captured value 42, so no extra season request was needed. The explicit-season request was the second and final call to `/api/v2/battlepass`.

Initial offline checks confirmed all four named Windows user values were nonempty and structurally valid. The credential-rotation flow replaced only the Windows user device ID and secret after the new values passed refresh-device and exact-identity validation. Read-back succeeded; the account ID was unchanged and no access token was persisted.

Synthetic checks cover secret suppression, numeric/boolean/empty-array preservation, exact identity match and rejection of missing/mismatched/conflicting identities, endpoint-identifier suppression, private-dispatch and budget guards, and embedded HTTP-error classification. Required [investigation log](investigation-log.md) entries were appended after every probe group; the [capability matrix](capability-matrix.md) separates observed results from blocked and historical capabilities.
