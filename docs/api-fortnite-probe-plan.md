# Proposed bounded api-fortnite.com probe plan

Status: **EXECUTED AND STOPPED — authentication blocked private data probes.** Ten requests completed; see [results](api-fortnite-probe-results.md). The one device-auth POST allowance and public Crew/shop/pass repeat allowances are consumed. Prepared 2026-09-14 against the saved OpenAPI snapshot. Approval covered only this batch, not the rest of the operation inventory.

## User-approved amendments (2026-09-14)

The user approved these read-only api-fortnite.com Pro probes, restricted investigation to this provider, added Crew, and required stopping before statistics, friends or tournaments. The user subsequently explicitly approved **one device-auth POST as an exception**, followed by GET-only data probes. Device refresh is token issuance (AUTH_STATE), not proven strictly read-only; no other POST, including refresh-token, will be called. Access token stays only in memory; returned identity must match the user-confirmed Player One ID already recorded in the handoff, and any mismatch/missing/ambiguous identity aborts private requests.

The executable batch now comprises at most 12 requests: season, device authentication, profile/level, public Crew current, quests, BR inventory, entitlement, one public cosmetics sample, default pass, pass seasons, conditional explicit-current-season pass, and shop/battlepass. Sprites and refresh-token diagnostics are omitted. Every operation is called once, except the justified default-versus-explicit-current-season Battle Pass comparison (two calls to that path). No retry or new endpoint consumes unused capacity. The original 15-request ceiling remains an outer guard. Each group saves only a sanitized projection and immediately appends its status/evidence path to the investigation log.

Original plan details below are retained for context; these amendments supersede conflicting steps and reserve usage.

## Purpose and scope

Establish provider-key and player-token controls, then resolve the four disputed areas: quest upstream 401, entitlement 404, cosmetic locker/ownership coverage, and Battle Pass catalogue/rewards. Use only `https://prod.api-fortnite.com` and Player One's own account. No direct Epic calls or alternate providers are included. No HA, card, database, service or broker implementation.

The current phase of AGENTS.md permits temporary research probes to read the four named Windows user variables at runtime. This is the proposed scoped exception to the older broker-only instructions in AGENTS.md and `.agents/CONTEXT.md`. The probe must expose named operations only, with a fixed method/path allowlist, no arbitrary URL/headers/body interface, and no get-secret operation. The research probe has not been implemented yet.

## Request budget and order

One sequential batch, at least one second between calls, 20-second request timeout, 15-minute total ceiling, 10 MiB maximum response per call. No automatic retries, redirects, pagination loops or parallel refreshes. **At most 15 HTTP requests**: 10 base requests, 2 conditional comparison requests and a 3-request diagnostic reserve. Skipped calls are not replaced by other endpoints. Timeouts consume budget; stop rather than reissue an uncertain auth operation.

KEY below means the provider key in x-api-key. PLAYER means an access token obtained and retained in memory, in x-fortnite-token. `{accountId}` is substituted only inside the probe from the named Windows user variable; never print the expanded URL or identifier.

| Step | Exact operation and request shape | Auth | Limit / purpose |
| --- | --- | --- | --- |
| 1 | GET `/api/v1/season` | KEY only | 1 base: key-only control, discover current season without guessing |
| 2 | POST `/api/v1/oauth/refresh-device`; JSON properties `accountId`, `deviceId`, `secret` | KEY; values read privately from Windows user variables | 1 base: issue fresh access token; an auth-state operation, not a pure read |
| 3 | GET `/api/v1/profile/level?accountId={accountId}` | KEY + PLAYER | 1 base: verify a documented private read with the fresh token |
| 4 | GET `/api/v2/quests/{accountId}`; no extra query/body | KEY + PLAYER (historical wrapper hypothesis; absent from formal schema) | 1 base: compare with successful control; inspect outer status and any upstream status separately |
| 5 | GET `/api/v2/fn/entitlement`; no account query/body | KEY + PLAYER | 1 base: discriminate wrapper/upstream 404 from a successful empty list |
| 6 | GET `/api/v2/fn/br-inventory/{accountId}` | KEY + PLAYER (historical wrapper hypothesis) | 1 base: determine whether cosmetic template IDs/variants exist or response is just stash/currency |
| 7 | GET `/api/v2/sprites/collection`; omit accountId and version | KEY + PLAYER | 1 base: second private read control scoped to token owner; sprites are not a general locker |
| 8 | GET `/api/v2/cosmetics/all?page=1&pageSize=1&lang=en` | KEY only | 1 base: distinguish public metadata from personal ownership; no catalogue crawl |
| 9 | GET `/api/v2/battlepass` | KEY only | 1 base: catalogue availability independent of personal claims |
| 10 | GET `/api/v2/battlepass/seasons` | KEY only | 1 base: verify archive response, including array versus historical data wrapper |
| 11 | GET `/api/v2/battlepass?season={currentSeason}` | KEY only | At most 1 conditional: only if step 1 supplied an unambiguous current season; compare explicit season selection |
| 12 | GET `/api/v1/shop/battlepass?lang=en` | KEY only | At most 1 conditional: assess current reward claim versus historical news/MOTD description |

Steps 11 and 12 each count toward the 15-request ceiling. Step 12 is useful whether step 9 succeeds or fails, provided controls and safety limits allow continuation. Do not call the general shop, receipts, entitlement-grant or undocumented locker/profile routes to expand this batch.

## Authentication and diagnostic reserve

Immediately after step 2, parse the response only in memory. Successful-auth response fields are not defined in the current OpenAPI. Find an unambiguous access token and returned account identity without printing any field values. Require an exact in-memory identity match to the configured account; if missing, ambiguous or mismatched, stop all private requests. Token validity is established by the private read, not by decoding an unsigned token. Record only identity-match boolean, field-presence booleans and numeric expiry if safely available. Do not assume a fixed 7,200-second lifetime.

If a refresh token is present in step 2, the diagnostic reserve may be used once for POST `/api/v1/oauth/refresh-token`, JSON property `refreshToken`, followed by one GET profile/level control using the new token. Verify returned identity again before use. This tests immediate renewal only; no silent-renewal/rotation/restart/expiry guarantees follow. Do not persist, overwrite or print credentials. If the provider unexpectedly returns changed long-lived device credentials, record only that a change occurred and pause for an appropriate persistence decision; do not discard or overwrite configured credentials automatically.

The third reserve request can repeat **one** failing disputed endpoint only if a refreshed token and successful renewed control establish a changed auth condition. Choose quests first if affected, otherwise entitlement, otherwise inventory. A valid control plus an endpoint-specific 401/404 is not grounds for repeated device refresh. No second device refresh in this batch. If no refresh token is available, reserve capacity can be used for one extra profile/level control to test whether the original token remains accepted; do not invent another renewal flow. Never spend unused reserve on new endpoints.

## Stop conditions

- Provider-key control fails: stop the batch; classify key/plan/service failure only to the extent safe response evidence supports it. Do not proceed to device authentication.
- Device auth fails, requests interactive login, has ambiguous identity, or returns mismatch: stop private work. No get-token, complete, exchange-code, link or browser sign-in fallback.
- Initial private control fails: use at most the conditional refresh/control reserve if a valid refresh token and verified identity exist; if it still fails, stop private work. Public catalogue steps may continue if step 1 succeeded.
- 429: stop the entire batch, retain only safe Retry-After/rate-limit metadata; no waiting/retry loop. Unexpected redirect, oversized body, credential spill or uncertain account side effect: stop.
- 5xx/timeout: no blind retry; mark that capability unavailable for this sample and continue only independent reads with successful controls. An auth-operation timeout stops private work.
- Quest 401 or entitlement 404 with healthy controls: record the distinction, do not assume absent data. Never “repair” with grant, purchase, privacy or other mutation routes.

## Evidence and completion criteria

Construct each saved report from an allowlist, not from a redacted copy of an arbitrary response. Never save raw auth responses, request headers, expanded URLs, exception bodies or private payloads. Record UTC request time, provider/method/path template, redacted parameter shape, auth category, outer HTTP status, safely recognized upstream status/error category, duration, source timestamp when provided, result shape/counts, conclusion, confidence and next action. Missing upstream details remain unknown.

For unknown keys, output only a generic field count/type signature until reviewed; field names can themselves contain account/instance IDs. Replace player/item-instance/subscription identifiers consistently with synthetic labels in any representative fixture. Remove auth URLs/codes, tokens, device IDs/secrets, IP/location, friends and unrelated receipts. Scan all output against configured and newly returned sensitive values in memory before saving; suppress the output on any match. Use synthetic fixtures for probe redaction/stop-rule tests before executing live requests after approval.

- Authentication: identity matched, control succeeded, immediate refresh result if supported; longevity remains unverified.
- Quests: distinguish successful progress data, empty success, provider failure and upstream rejection; record whether authoritative English definitions/targets/rewards are actually supplied.
- Entitlement: successful typed entries versus provider/upstream 404. An error never means no entitlements.
- Locker: require actual account-owned cosmetic IDs/variants before claiming locker support. A public CosmeticDto or sprite collection is insufficient. A stash-only response establishes this route's observed limitation, not provider-wide impossibility.
- Battle Pass: record gameVersion/season/generated time, pages/reward/offer counts and completeness caveats. Inspect offerGuid join availability and explicit release/unlock/access rules; unknown denominator means remaining rewards and completion stay unknown. A 404 or empty archive indicates missing extraction in that sample, not no rewards or an account that claimed everything.

Update capability matrix and investigation log with sanitized representative evidence and exact counts. If a capability is still missing/broken, document the provider-specific failure and propose the next bounded step separately. Other operation families, long-duration auth tests and other providers remain outside this approval.
