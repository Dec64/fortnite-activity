# Investigation log

## 2026-09-14 — documentation inventory (completed)

**Authorization:** user's current request permits local inspection, variable presence checks, public documentation download, complete operation classification and research documents. Private probes require approval of the concrete plan. The current AGENTS.md phase overrides older handoff instructions to implement HA or install a broker/service.

**Instructions found and read:** repository `AGENTS.md`; the complete `docs/fortnite-home-assistant-agent-handoff.md` (17 sections); `.agents/CONTEXT.md`, which points to those files and repeats the older broker rule. `.gitignore` excludes `evidence/raw/`, `evidence/private/` and common credential files. No nested AGENTS.md found in the inspected project files. The current AGENTS.md phase explicitly permits a temporary research probe reading named Windows user environment variables, so that is the scoped mechanism proposed below, rather than implementing the older broker requirement. No credentials were used for HTTP in this phase.

**Evidence discovery:** `evidence/raw/api-fortnite` does not exist. No filenames or raw contents were available there; credential-content screening is therefore not applicable. Do not interpret this as having screened the attachments listed in handoff section 15. Those historical filenames are references, not locally inspected response evidence. If raw files arrive later: list names first; scan locally without printing matching text; flag potential credentials/identifiers; only inspect sanitized allowlisted projections. A negative pattern scan alone does not certify an entire profile safe to publish.

| Variable name | Process scope | Windows user scope |
| --- | --- | --- |
| API_FORTNITE_KEY | PRESENT | PRESENT |
| FORTNITE_PLAYER1_ACCOUNT_ID | PRESENT | PRESENT |
| FORTNITE_PLAYER1_DEVICE_ID | PRESENT | PRESENT |
| FORTNITE_PLAYER1_DEVICE_SECRET | PRESENT | PRESENT |

Only named-variable presence was output. No environment enumeration or protected credential-file access occurred. Presence does not establish validity or equality between scopes.

### Public documentation retrieval

| Field | Result |
| --- | --- |
| Provider / operation | api-fortnite.com; GET public OpenAPI document |
| URL | https://prod.api-fortnite.com/swagger/v1/swagger.json |
| Request shape | GET; no API key, player token or request body |
| HTTP status | 200 via local Invoke-WebRequest; the web reader could not open this URL |
| Retrieved at UTC | 2026-09-14T14:47:49.4172294Z |
| Source timestamp | Not supplied in saved metadata; retrieval time is not provider publication time |
| Saved file | evidence/sanitized/specifications/api-fortnite-openapi.json |
| Bytes | 357794 |
| SHA-256 | 6520C98609F96840017752E6B9BC0D1BFA5B32977846278EACEFFC5A504F58DC |
| Shape | OpenAPI 3.0.1, info.version v1, 138 path entries, 140 operations |
| Conclusion / confidence | Observed current public specification; high confidence in snapshot/inventory, no runtime capability verification |
| Next action | Approved bounded probes only |

The saved public spec was checked against the four configured process values before its contents were displayed; none matched. The website docs at https://api-fortnite.com/docs were read without credentials on the same date. They document x-api-key globally and OAuth requirements for Friends/private sprites. The website includes examples not found in the snapshot (such as profile/stats); do not invent or probe those routes as part of the 140-operation inventory.

### Documentation findings

- No securitySchemes, root security, or operation security declarations: do not generate a client that assumes anonymous access. The full inventory records website versus operation versus inferred authentication basis and x-plans.
- OAuth renewal request property names are accountId/deviceId/secret and refreshToken. Auth 200 responses have no defined success schema. Identity and response-field inspection must happen in memory before any private request or output.
- Quests, entitlement and BR inventory expose no typed 200 body; historical 401/404/stash-only results remain unresolved, not reconfirmed.
- The shop Battle Pass summary differs from the handoff's historical description. Only an actual response can determine whether behavior changed.
- Battle Pass catalogue schema provides pages, rewards and offerGuid but no explicit schedule/prerequisite model. Catalogue success alone would not prove all currently available rewards are claimed.
- A private current-session route is documented; this does not prove cross-platform presence works. Deferred beyond first batch.
- GET can initiate OAuth, start participation backfill, or consume replay parsing credits. POST bulk/stat lookup operations can be reads. Risk classification accounts for these distinctions.

### Artifacts and verification

- `docs/capability-matrix.md`: evidence-separated capability conclusions.
- `docs/api-fortnite-operation-inventory.md`: every method/path with authentication and mutation risk.
- `evidence/sanitized/specifications/api-fortnite-operations.json`: all 140 operations, descriptions, parameters, bodies, response schemas, plans and classification rationale.
- `tools/inventory-api-fortnite.ps1`: reproducible offline inventory generator; no network or credential access. Run from the repository with `& ./tools/inventory-api-fortnite.ps1`.
- `docs/api-fortnite-probe-plan.md`: exact request list, ceilings, stop rules and evidence rules; awaiting user approval.

Local validation checks operation coverage/uniqueness, security declarations, JSON parsing, classification completeness, reference resolution, spec hash, and named credential absence in new artifacts without printing matching values. No application tests are applicable: application code was not built. No private endpoint calls, deployments, installations, third-party-provider probes, commits or pushes were performed.

Validation result: PASS for 140 unique method/path pairs, complete auth/risk rationales, all component schema references, unchanged snapshot hash, and absence of all four configured values (both user/process scopes) from new artifacts. Risk totals: 97 READ_LOW, 5 READ_POST, 4 READ_AMPLIFIED, 1 READ_BACKGROUND_JOB, 17 PROCESSING_QUOTA, 7 AUTH_STATE, 9 MUTATION_BLOCKED. The inventory generator was rerun successfully; `git diff --check` reported no tracked-diff whitespace errors (new artifacts remain untracked).

**Unresolved blockers:** absent historical raw responses; runtime auth and private endpoint behavior; catalogue extraction and availability rules. **Status:** documentation inventory complete; proposed private probes not executed.

## 2026-09-14 — approved live batch

The user authorized api-fortnite.com Pro only, identity verification, memory-only tokens, sanitized responses, no more than two calls per disputed endpoint, per-group logging, and stopping before stats/friends/tournaments. Clarification explicitly permits exactly one device-auth POST followed by GET-only data probes; it does not establish OAuth token issuance as read-only. No refresh-token POST will be used. Public Crew current is added; sprites are omitted. The revised batch has at most 12 requests, including one justified explicit-current-season Battle Pass variation, with no retries.

The fixed-route research script `tools/probe-api-fortnite.ps1` defaults to synthetic self-tests. Its live mode requires deliberate `-Mode ApprovedBatch`; it has no arbitrary URL/header/body or secret-return interface. Synthetic checks passed for credential suppression, preserved numeric/boolean/empty-array shapes, exact identity match plus mismatch/missing/conflicting identity rejection, output secret guard, and recognized embedded HTTP-error extraction. No raw authentication or data response will be written to disk. Subsequent group entries below are written immediately after each saved sanitized result.

### Probe group: season — 2026-09-14T15:00:13.1831485Z

- Operation: GET `/api/v1/season`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260914T150012Z/season.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: authentication — 2026-09-14T15:00:14.8467490Z

- Operation: POST `/api/v1/oauth/refresh-device`; HTTP status: 400; outcome: private_auth_gate_failed.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260914T150012Z/authentication.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: crew — 2026-09-14T15:00:16.0513905Z

- Operation: GET `/api/v1/crew/current`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260914T150012Z/crew.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: cosmetics — 2026-09-14T15:00:17.2753690Z

- Operation: GET `/api/v2/cosmetics/all?page=1&pageSize=1&lang=en`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260914T150012Z/cosmetics.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: battlepass — 2026-09-14T15:00:19.5673820Z

- Operation: GET `/api/v2/battlepass`; HTTP status: 404; outcome: http_error.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260914T150012Z/battlepass.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: battlepass_seasons — 2026-09-14T15:00:20.7352598Z

- Operation: GET `/api/v2/battlepass/seasons`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260914T150012Z/battlepass_seasons.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: battlepass_shop — 2026-09-14T15:00:21.8000946Z

- Operation: GET `/api/v1/shop/battlepass?lang=en`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260914T150012Z/battlepass_shop.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### First batch interpretation and bounded public followup

Seven requests completed. Device authentication returned outer HTTP 400; the expected access-token and refresh-token fields were absent and identity was not verified. This is not evidence of a returned different account: the saved projection does not distinguish missing from conflicting identity fields. Private gates remained closed; profile/level, quests, inventory and entitlement were not requested. The single authorized device-auth POST will not be repeated. Authentication-error body structure/text was over-suppressed by the initial projector, so its exact validation/upstream cause is unavailable and must not be guessed. This is a capture limitation; no response can be reconstructed after process exit.

The key-only season control returned seasonNumber=42. Crew returned HTTP 200 with lastModified=2026-09-03T02:26:18.104Z and cosmetic-template strings; this is public pack content, not personal membership. Cosmetics returned one item and provider-reported total=21926; that total is not an ownership denominator. Default Battle Pass returned HTTP 404 with a recognized no-extraction message. Seasons returned HTTP 200 with an empty data array (the runtime wrapper differs from the bare-array schema).

The first projector omitted unknown field subtrees in Crew/shop; their 200 statuses alone cannot establish full content semantics. The projector now preserves these subtrees under anonymous field labels, continues suppressing all string values, and handles embedded JSON strings without exporting them. Synthetic redaction and identity tests still pass. A bounded public followup will make exactly three GETs: second Crew current and shop/battlepass calls to preserve usable safe shapes, plus the already-approved explicit-season Battle Pass comparison using observed seasonNumber=42. The initial season-selector parser recognized season/currentSeason but missed the documented seasonNumber field; fixed locally, with no additional season call. Aggregate ceiling for these runs is ten requests; Crew/shop/pass each at most twice. No private calls, new POSTs or other areas are added.

### Probe group: crew — 2026-09-14T15:03:07.6932628Z

- Operation: GET `/api/v1/crew/current`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260914T150306Z/crew.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: battlepass_explicit_season — 2026-09-14T15:03:09.2151099Z

- Operation: GET `/api/v2/battlepass?season={currentSeason}`; HTTP status: 404; outcome: http_error.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260914T150306Z/battlepass_explicit_season.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: battlepass_shop — 2026-09-14T15:03:10.3132615Z

- Operation: GET `/api/v1/shop/battlepass?lang=en`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260914T150306Z/battlepass_shop.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Final assessment — approved areas stopped

The second Crew call returned the same public-content status and lastModified. The explicit season=42 Battle Pass comparison returned HTTP 404; its message differs from the recognized default no-extraction phrase, and no exact message is retained. The second shop/battlepass response preserves news/MOTD string classifications plus message/title/body/image structures, with no offerGuid or explicit unlock/release patterns. This is consistent with news content, not a verified pass reward catalogue (shape-based inference, medium-high confidence).

Final request count: **10 total, one POST and nine GETs**. Crew and shop/battlepass each called twice; Battle Pass called once without season and once with observed season=42; all other attempted endpoints once. Profile/level, quests, inventory and entitlement each called **zero** times because no access token/account identity was verified. No refresh-token POST, sprites, stats, friends, tournaments, direct Epic or alternative-provider calls were made. There were no redirects/retries, credentials persisted, account mutations, installations, deployments, commits or HA/dashboard/database/service work.

All four named Windows user values were nonempty, free of surrounding whitespace, and equal to their process-scope counterparts in an offline boolean-only check. This does not establish validity. The account configured for the attempt matched the identity in the handoff and user's instruction. Returned identity was not verified. Exact outer authentication status is 400; detailed failure cause remains unknown due to the initial auth-error capture limitation. No claim is made that the credentials are revoked, expired, malformed or for another account.

The [results report](api-fortnite-probe-results.md) contains the final per-area conclusions, confidence and limitations. The [aggregate request ledger](../evidence/sanitized/api-fortnite/probe-summary.json) retains exact public endpoints and original timestamps; it resolves the followup template's currentSeason parameter to the observed value 42. Original per-call sanitized reports remain unchanged. The [capability matrix](capability-matrix.md) has been updated. Scope is now stopped; another device-auth diagnostic would require a fresh explicit exception to the one-POST limit, and no such request has been executed.

## 2026-09-15 — missing-data diagnosis (documentation only)

**Authorization:** continue investigating why required data is missing and how to obtain it. No live HTTP request was made. The prior OAuth exception covered exactly one device-auth POST and was consumed, so a second diagnostic POST remains pending explicit approval.

The current provider Python SDK was compared with the local probe. Both use `https://prod.api-fortnite.com/api`, an `x-api-key` header, UTF-8 JSON, and an `accountId`/`deviceId`/`secret` body for `POST /api/v1/oauth/refresh-device`. Offline checks found the configured account and device IDs have the expected 32-hex form and the secret is 32 characters with no surrounding whitespace, quoting or control characters. No values were printed or saved. This makes request-shape drift unlikely; it does not prove the stored device auth remains valid. Because the initial response projector discarded the error subtree, revoked credentials, Epic-client mismatch, provider validation and upstream/provider failure cannot be distinguished from the retained evidence.

The provider's current SDK documentation resolves two semantic disputes. `GET /api/v2/fn/br-inventory/{accountId}` is explicitly presented as Battle Royale inventory for V-Bucks, so its historical `stash.globalcash` response is expected and cannot represent a cosmetic locker. `GET /api/v1/crew/current` is public subscription-pack information, not a player's membership. The 140-operation specification has no separate owned-cosmetics or personal Crew-membership operation. The established post-provider research leads remain read-only Epic `athena` for cosmetic ownership/styles and `common_core` for personal subscription state; neither was called.

The provider status page currently labels OAuth RefreshDevice, Quests, ProfileLevel, BR inventory, entitlement and both v2 BattlePass operations operational. This is monitoring evidence that the routes respond, not semantic proof: the live v2 catalogue still returned 404 twice and its seasons route returned an empty array. The provider must repair/populate that extraction dataset, or a later explicitly approved phase must investigate a game-asset source/alternative provider. The v2 reward schema also lacks explicit release time, unlock level, quest prerequisite and free/premium access fields, so a recovered catalogue alone may not establish current availability.

Created `docs/api-fortnite-missing-data-recovery.md` with the per-capability diagnosis, source map and bounded next probe. No request budgets changed. Proposed next live group: one newly authorized diagnostic refresh-device POST; on exact expected-identity success only, one GET each for profile/level, quests, BR inventory and entitlement. Battle Pass will not be called again in this phase because its two-call limit is exhausted.

### Probe group: authentication — 2026-09-15T18:24:49.5263202Z

- Operation: POST `/api/v1/oauth/refresh-device`; HTTP status: 400; outcome: private_auth_gate_failed.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260915T182448Z/authentication.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Final assessment — stored-device authentication exhausted

The second and final permitted `POST /api/v1/oauth/refresh-device` returned outer HTTP 400. Its sanitized two-field body contains numeric status 400 and a suppressed 86-character error string. A recognized response-text pattern reports embedded HTTP 400. No access token, refresh token, returned account identity or changed device credentials was present. The error did not match the safe categories for invalid account credentials, invalid/missing device auth, invalid/mismatched client, invalid grant, request validation, upstream 401/403 or provider 5xx. No raw string was saved.

The identity gate closed and made zero profile/level, quests, BR inventory or entitlement requests. Aggregate investigation count is now **11 requests: two POSTs and nine GETs**. Both refresh-device attempts returned 400; the endpoint's two-call limit is exhausted. No Battle Pass, statistics, friends, tournaments, direct Epic or alternative-provider request was added.

Next proposed provider-only path at that point: initiate the documented interactive device-code flow with one GET, complete it with a separately authorized authentication-state POST after user browser authorization, verify the returned account ID exactly in memory, and then call each remaining approved private GET once. If the interactive flow failed, stop private calls and retain the sanitized local evidence.

### Probe group: oauth_get_token — 2026-09-15T18:33:36.3311997Z

- Operation: GET `/api/v1/oauth/get-token`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260915T183336Z/oauth_get_token.json`.
- Confidence: observed status and sanitized shape only. No raw response, request headers, flow identifiers, tokens or credentials saved.

### Probe group: oauth_complete — 2026-09-15T18:34:26.6896644Z

- Operation: POST `/api/v1/oauth/complete`; HTTP status: 200; outcome: identity_verified.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260915T183336Z/oauth_complete.json`.
- Confidence: observed status and sanitized shape only. No raw response, request headers, flow identifiers, tokens or credentials saved.

### Probe group: interactive OAuth and level capture failure — 2026-09-15T18:33:36Z onward

`GET /api/v1/oauth/get-token` returned HTTP 200 and opened one approved HTTPS authentication URL locally. After user authorization, `POST /api/v1/oauth/complete` returned HTTP 200 with exactly one access token and the exact expected account identity. The response also contained a refresh token and device credentials; all remained in process memory and were discarded on exit. Sanitized reports contain only presence booleans and safe structure.

The script then sent the first private request, `GET /api/v1/profile/level?accountId={verifiedAccountId}`. Its report could not be saved because the actual request endpoint embedded the verified account identifier and the output secret guard rejected it. Control flow and a synthetic reproduction confirm this was the first private request; the process stopped before quests, BR inventory or entitlement. The level response status, timestamp and body shape were lost and must not be inferred. The aggregate ledger records this request with null time/status fields and an explicit capture-failure outcome. Actual network count is **14**.

Root cause: `Send-Request` used the same actual URL for transport and reporting, while the expected identity was intentionally registered as sensitive. `Save-Report` therefore rejected the level report after the request completed. The report path now uses `{verifiedAccountId}` plus an explicit exact-identity binding while transport retains the real in-memory URL. A synthetic regression test verifies that the actual form contains the protected identity and the report form does not. No new network request was made while applying or testing the fix.

### Probe group: oauth_get_token — 2026-09-15T18:40:03.3358983Z

- Operation: GET `/api/v1/oauth/get-token`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260915T184003Z/oauth_get_token.json`.
- Confidence: observed status and sanitized shape only. No raw response, request headers, flow identifiers, tokens or credentials saved.

### Probe group: oauth_complete — 2026-09-15T18:40:24.6440637Z

- Operation: POST `/api/v1/oauth/complete`; HTTP status: 200; outcome: identity_verified.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260915T184003Z/oauth_complete.json`.
- Confidence: observed status and sanitized shape only. No raw response, request headers, flow identifiers, tokens or credentials saved.

### Probe group: level — 2026-09-15T18:40:25.4562297Z

- Operation: GET `/api/v1/profile/level?accountId={verifiedAccountId}`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260915T184003Z/level.json`.
- Confidence: observed status and sanitized shape only. No raw response, request headers, flow identifiers, tokens or credentials saved.

### Probe group: quests — 2026-09-15T18:40:26.0695771Z

- Operation: GET `/api/v2/quests/{verifiedAccountId}`; HTTP status: 401; outcome: http_error.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260915T184003Z/quests.json`.
- Confidence: observed status and sanitized shape only. No raw response, request headers, flow identifiers, tokens or credentials saved.

### Probe group: inventory — 2026-09-15T18:40:26.7108652Z

- Operation: GET `/api/v2/fn/br-inventory/{verifiedAccountId}`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260915T184003Z/inventory.json`.
- Confidence: observed status and sanitized shape only. No raw response, request headers, flow identifiers, tokens or credentials saved.

### Probe group: entitlement — 2026-09-15T18:40:27.2274804Z

- Operation: GET `/api/v2/fn/entitlement`; HTTP status: 404; outcome: http_error.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260915T184003Z/entitlement.json`.
- Confidence: observed status and sanitized shape only. No raw response, request headers, flow identifiers, tokens or credentials saved.

### Final assessment — approved private areas complete

The second interactive device-code flow returned GET 200 and completion POST 200. The completion response again contained exactly one access token and the exact expected identity. All tokens, flow values and returned device credentials remained in memory and were discarded when the process exited.

Using that same verified token, profile/level returned 200 with level 214, XP 66,601, account level 3,256 and nested pass tier 214 with `purchased=false`. The numeric values are usable observations. The ownership boolean remains unreliable because it conflicts with the historical personal `athena` season ledger and Crew evidence.

Quests returned 401 with a two-field status/error shape and an embedded HTTP 401 signal. BR inventory then returned 200 with exactly one root field and the value `stash.globalcash=0`. Entitlement returned 404 with a two-field status/error shape and embedded HTTP 404. Because level and inventory succeeded with the same token and identity, quests and entitlement are endpoint-specific provider/upstream failures rather than a general authentication or account-mismatch failure.

The BR inventory result confirms the historical response and the provider SDK's V-Bucks description. It is not cosmetic ownership evidence, and the current 140-operation surface has no owned-locker/style route. Quests supplies no data until provider repair. Entitlement supplies no data and its 404 must not be treated as absence. Battle Pass catalogue remains a separate public extraction failure: two 404s plus an empty seasons list.

Final network count for this investigation stage is **20: four POST authentication operations and sixteen GETs**. Profile/level was called twice because its first result was lost to the documented local capture failure; the corrected second call succeeded. Quests, BR inventory and entitlement were each called once in the current batch. Battle Pass and stored-device refresh remain at their two-call ceilings. No statistics, friends, tournaments, direct Epic, alternative provider, implementation, credential persistence or account mutation followed.

### Probe group: oauth_get_token — 2026-09-15T18:50:35.7619248Z

- Operation: GET `/api/v1/oauth/get-token`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260915T185035Z/oauth_get_token.json`.
- Confidence: observed status and sanitized shape only. No raw response, request headers, flow identifiers, tokens or credentials saved.

### Probe group: oauth_complete — 2026-09-15T18:51:05.5033553Z

- Operation: POST `/api/v1/oauth/complete`; HTTP status: 200; outcome: identity_verified.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260915T185035Z/oauth_complete.json`.
- Confidence: observed status and sanitized shape only. No raw response, request headers, flow identifiers, tokens or credentials saved.

### Probe group: refresh_new_device — 2026-09-15T18:51:06.3341200Z

- Operation: POST `/api/v1/oauth/refresh-device`; HTTP status: 200; outcome: new_device_credentials_validated.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260915T185035Z/refresh_new_device.json`.
- Confidence: observed status and sanitized shape only. No raw response, request headers, flow identifiers, tokens or credentials saved.

### Local credential rotation — 2026-09-15T18:51:08.3045787Z

- Newly issued device credentials validated by refresh: True.
- Persisted to the two Windows user device-auth variables: True; write verified: True; rollback performed: False.
- Account identity matched exactly: True. No credential value or access token was saved in evidence or log output.

### Final authentication resolution

The credential-rotation group added three HTTP requests: device-flow GET 200, completion POST 200, and refresh-device POST 200 using the newly issued device credentials. The refresh response contained exactly one access token and the exact expected identity. The new device ID and secret both differed from the old values. Only those two Windows user environment variables were replaced; read-back verification passed, no rollback was needed, and the account ID remained unchanged. No access token was persisted.

This establishes that the old device-auth set caused the earlier refresh failures. Request format, provider Epic-client compatibility and the refresh-device route all work with credentials issued by the current interactive flow. The exact reason the old set became invalid remains unknown and is not operationally relevant.

Final investigation count is **23 requests: six POST authentication operations and seventeen GETs**. No quest, entitlement, inventory or Battle Pass endpoint was repeated during credential rotation.

The provider's public contact page was inspected read-only. No form was filled or submitted and no external message was sent.

## 2026-09-15 — project-wide data/API scope assessment

**Authorization:** local documentation only. No additional live probes, provider contact, alternative-provider investigation or implementation work.

The provider-support submission track and its local draft were removed at the user's direction. The investigation now treats the failed and absent provider capabilities strictly as project scope evidence.

Created `docs/project-data-access-map.md`, covering every requested project data domain and separating current observations, historical handoff evidence, documented but untested provider operations, missing sources and derived data. Updated `docs/capability-matrix.md` and `docs/api-fortnite-missing-data-recovery.md` to remove support-submission next actions.

The resulting boundary is:

- Current provider evidence is sufficient for Player One authentication, season, numeric level/tier/XP, public cosmetics and public Crew pack content.
- Stats, ranks, sprites and tournament operations are documented or historically observed but still need bounded current validation and semantic mapping.
- The provider does not currently supply verified personal locker/styles, personal Crew state, working quest data, a working complete Battle Pass catalogue, reliable presence or official broadcast discovery.
- Historical direct Epic `athena` and `common_core` data are the later leads for personal state. Quest definitions, pass catalogue/rules, presence and official broadcasts still need separate source investigations after the current provider-only scope changes.
- Player Two's verified Epic identity and separate authorization are still missing; existing Player One PSN data and unverified Nintendo associations must not be used as a substitute.

No network request was made for this assessment.

### Late-arriving private evidence screening

Three files are now present under the ignored `evidence/raw` directory: the Battle Pass seasons response, a personal `common_core` response and a shop response. This supersedes the initial inventory statement that the attachments were absent at that time.

The files were screened locally before structural inspection. None contains the configured provider key, device ID or device secret, and none contains a JWT-shaped value or named authentication field. The personal `common_core` response contains the configured account ID, so its contents were not displayed or copied. Only redacted aggregate structure was inspected.

Safe findings:

- The Battle Pass seasons response is an empty data array, matching the current sanitized provider result.
- The personal `common_core` response contains 391 items and one subscription object with 14 fields. No subscription values, identifiers, purchase history or unrelated private data were extracted.
- The shop response has 36 storefronts. Its current-season storefront has five purchase/level offers; it is not a Battle Pass reward-page catalogue.
- `evidence/raw/` is already excluded by `.gitignore` and remains private.

## 2026-09-15 — stats, ranks, sprites and playlist continuation

**Authorization:** the user approved continued api-fortnite.com exploration. This batch remained on the paid Pro provider. Data operations were GET-only. Device refresh was used only to issue short-lived player tokens, which remained in memory; returned identity matched the previously attested configured account exactly. Friends, presence, events, tournaments and alternative providers were excluded.

Eleven requests were made: two authentication POSTs and nine GETs. The project-wide investigation total is now **34 requests: eight POST authentication operations and twenty-six GETs**.

Results:

- Player stats returned 200 with 954 fields. 936 fit the BR counter-key pattern, covering 123 playlist identifiers, 13 counter types and three input groups. Recent modification timestamps reached the probe date.
- Enriched ranked, rank tracks and raw progress returned 200 with 88 rows each. Seven enriched rows are current; directly useful current rows include Battle Royale Champion I at 8%, Reload Build Elite III at 71%, and Arena Boxfights Gold III at 75%.
- The provider playlist catalogue returned 200 with 390 records. A second projection retained public identifiers and labels. Zero Build solo/duo/trio/squad mappings are explicit. Standard BR queue names are present, while recent `ropesmile`/`habanero_*` stat identifiers are absent and remain unmapped.
- The private sprite collection returned HTTP 200 twice with the exact-identity token, but both local safe projections failed after response receipt. The endpoint is reachable and authorized; current collection data was not captured. Its two-call ceiling is reached.
- No response header, token, account identifier, device-auth value or raw response body was saved.

Detailed findings are in `docs/api-fortnite-stats-ranks-sprites-results.md`. The aggregate sanitized request ledger now contains 34 entries.

### Probe group: authentication — 2026-09-15T19:10:38.0486376Z

- Operation: POST `/api/v1/oauth/refresh-device`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260915T191036Z/authentication.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: stats — 2026-09-15T19:10:40.1102221Z

- Operation: GET `/api/v2/stats/{accountId}`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260915T191036Z/stats.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: ranked — 2026-09-15T19:10:41.8011920Z

- Operation: GET `/api/v1/profile/ranked?accountId={accountId}`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260915T191036Z/ranked.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: ranked_tracks — 2026-09-15T19:10:43.2698930Z

- Operation: GET `/api/v1/profile/tracks`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260915T191036Z/ranked_tracks.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: ranked_progress — 2026-09-15T19:10:44.4691026Z

- Operation: GET `/api/v1/profile/progress?accountId={accountId}`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260915T191036Z/ranked_progress.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: sprites_collection — 2026-09-15T19:10:45.8674856Z

- Operation: GET `/api/v2/sprites/collection`; HTTP status: 200; outcome: transport_or_processing_failure.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260915T191036Z/sprites_collection.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: authentication — 2026-09-15T19:12:39.9270207Z

- Operation: POST `/api/v1/oauth/refresh-device`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260915T191238Z/authentication.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: ranked — 2026-09-15T19:12:41.9019341Z

- Operation: GET `/api/v1/profile/ranked?accountId={accountId}`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260915T191238Z/ranked.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: sprites_collection — 2026-09-15T19:12:43.3487000Z

- Operation: GET `/api/v2/sprites/collection`; HTTP status: 200; outcome: transport_or_processing_failure.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260915T191238Z/sprites_collection.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: playlists — 2026-09-15T19:14:42.9742342Z

- Operation: GET `/api/v2/playlists?lang=en`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260915T191441Z/playlists.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: playlists — 2026-09-15T19:15:27.7075026Z

- Operation: GET `/api/v2/playlists?lang=en`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260915T191526Z/playlists.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: sprites_versions — 2026-09-15T19:24:36.8909479Z

- Operation: GET `/api/v2/sprites/versions`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260915T192435Z/sprites_versions.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: sprites_catalog — 2026-09-15T19:24:38.2688712Z

- Operation: GET `/api/v2/sprites`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260915T192435Z/sprites_catalog.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: events_global — 2026-09-15T19:24:39.6042552Z

- Operation: GET `/api/v1/events/global?lang=en`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260915T192435Z/events_global.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: events_cashprizes — 2026-09-15T19:28:02.6040041Z

- Operation: GET `/api/v1/events/cashprizes`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260915T192801Z/events_cashprizes.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: events_scoring — 2026-09-15T19:28:08.7195810Z

- Operation: GET `/api/v1/events/scoring`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260915T192801Z/events_scoring.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: authentication — 2026-09-15T19:28:17.2005976Z

- Operation: POST `/api/v1/oauth/refresh-device`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260915T192801Z/authentication.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: sprites_collection_all — 2026-09-15T19:28:18.9064669Z

- Operation: GET `/api/v2/sprites/collection/all`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260915T192801Z/sprites_collection_all.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: friends_summary — 2026-09-15T19:28:21.5325677Z

- Operation: GET `/api/v1/friends/{accountId}/summary`; HTTP status: 403; outcome: http_error.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260915T192801Z/friends_summary.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: friends_list — 2026-09-15T19:28:22.9580642Z

- Operation: GET `/api/v1/friends/{accountId}/friends`; HTTP status: 403; outcome: http_error.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260915T192801Z/friends_list.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: events_tracker — 2026-09-15T19:28:24.1560567Z

- Operation: GET `/api/v1/events/tracker?accountId={accountId}&validOnly=true`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260915T192801Z/events_tracker.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: events_player — 2026-09-15T19:28:25.7428413Z

- Operation: GET `/api/v1/events/player?region=EU&accountId={accountId}`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260915T192801Z/events_player.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: events_player_session — 2026-09-15T19:28:31.1666094Z

- Operation: GET `/api/v1/events/player/{accountId}/session`; HTTP status: 403; outcome: http_error.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260915T192801Z/events_player_session.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: events_tokens — 2026-09-15T19:28:32.2402243Z

- Operation: GET `/api/v1/events/tokens?teamAccountIds={accountId}`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260915T192801Z/events_tokens.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: power_rankings_player — 2026-09-15T19:28:33.4676160Z

- Operation: GET `/api/v1/events/powerrankings/player/{accountId}`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260915T192801Z/power_rankings_player.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: sprites_versions — 2026-09-16T07:59:00.2570480Z

- Operation: GET `/api/v2/sprites/versions`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260916T075859Z/sprites_versions.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: sprites_catalog — 2026-09-16T07:59:01.8871592Z

- Operation: GET `/api/v2/sprites`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260916T075859Z/sprites_catalog.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: events_scoring_solo — 2026-09-16T07:59:03.1164852Z

- Operation: GET `/api/v1/events/scoring/S42_SoloVictoryCup_Event3Round1_EU`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260916T075859Z/events_scoring_solo.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: events_cashprize_solo — 2026-09-16T07:59:04.3251121Z

- Operation: GET `/api/v1/events/cashprize/S42_SoloVictoryCup_Event3Round1_EU`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260916T075859Z/events_cashprize_solo.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: authentication — 2026-09-16T07:59:05.4789491Z

- Operation: POST `/api/v1/oauth/refresh-device`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260916T075859Z/authentication.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: sprites_collection_all — 2026-09-16T07:59:06.9707658Z

- Operation: GET `/api/v2/sprites/collection/all`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260916T075859Z/sprites_collection_all.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: events_eligibility_solo — 2026-09-16T07:59:09.5197185Z

- Operation: GET `/api/v1/events/tracker/eligibility/{accountId}/epicgames_S42_SoloVictoryCup_EU?eventWindowId=S42_SoloVictoryCup_Event3Round1_EU`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260916T075859Z/events_eligibility_solo.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: events_scoring_solo_detail — 2026-09-16T08:00:57.5054295Z

- Operation: GET `/api/v1/events/scoring/S42_SoloVictoryCup_Event3Round1_EU`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260916T080056Z/events_scoring_solo_detail.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: events_cashprize_solo_detail — 2026-09-16T08:00:59.0507366Z

- Operation: GET `/api/v1/events/cashprize/S42_SoloVictoryCup_Event3Round1_EU`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260916T080056Z/events_cashprize_solo_detail.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: authentication — 2026-09-16T08:01:00.1883708Z

- Operation: POST `/api/v1/oauth/refresh-device`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260916T080056Z/authentication.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: sprites_collection_current — 2026-09-16T08:01:01.7138014Z

- Operation: GET `/api/v2/sprites/collection?version=42.10`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260916T080056Z/sprites_collection_current.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: events_scoring_solo_final — 2026-09-16T08:02:07.5489821Z

- Operation: GET `/api/v1/events/scoring/S42_SoloVictoryCup_Event3Round2_EU`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260916T080206Z/events_scoring_solo_final.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: events_cashprize_solo_final — 2026-09-16T08:02:09.0220568Z

- Operation: GET `/api/v1/events/cashprize/S42_SoloVictoryCup_Event3Round2_EU`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260916T080206Z/events_cashprize_solo_final.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: authentication — 2026-09-16T08:02:10.1794831Z

- Operation: POST `/api/v1/oauth/refresh-device`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260916T080206Z/authentication.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: friends_summary_diagnosis — 2026-09-16T08:02:12.2280666Z

- Operation: GET `/api/v1/friends/{accountId}/summary`; HTTP status: 403; outcome: http_error.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260916T080206Z/friends_summary_diagnosis.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: events_player_session_diagnosis — 2026-09-16T08:02:13.9985389Z

- Operation: GET `/api/v1/events/player/{accountId}/session`; HTTP status: 403; outcome: http_error.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260916T080206Z/events_player_session_diagnosis.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: events_cashprize_solo_final_currency — 2026-09-16T08:03:25.7789747Z

- Operation: GET `/api/v1/events/cashprize/S42_SoloVictoryCup_Event3Round2_EU`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260916T080324Z/events_cashprize_solo_final_currency.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### 2026-09-16 synthesis and capture incident

The 2026-09-15 `ApprovedProjectApiBatch` process saved three successful GET reports, then dispatched `GET /api/v1/events/cashprizes`. Its local process became CPU-bound while projecting the large response and was stopped. That attempt has no trustworthy response timestamp, status or artifact. The [sanitized request ledger](../evidence/sanitized/api-fortnite/probe-summary.json) records it as `capture_interrupted` with unknown status; the later bounded repeat returned 200. Do not infer an extra successful response from the interrupted attempt.

Across all investigation batches at this point, the ledger contained 66 dispatched requests: 54 GET and 12 authentication POST. All private GETs in these last batches followed a 200 device-auth response and exact account-identity match. No access token or device-auth value was saved. The first sprite summaries missed the payload nested under `data`; a bounded wrapper-aware projection fixed that local issue, and the versioned collection yielded current family/variant ownership. The event listing, per-window scoring and reward routes yielded usable schedule and rule structures. A single eligibility result marked its checked subset true while six requirements remained unverified; no definitive eligibility conclusion follows. Friends summary/list failed with 403 despite advertised Pro access, and current-session access explicitly requires Custom while the account is Pro. Full interpretation and evidence links are in [events, Friends and sprites results](api-fortnite-events-friends-sprites-results.md).

### 2026-09-16 participation and leaderboard followup

- `GET /api/v1/events/global/leaderboard` for a completed Solo Victory Cup window: 200, page 0 contained 100 entries and reported 40 pages. It includes points, rank, score, point breakdown and completed session-history shapes. `liveSessions` was empty in that page. [Sanitized evidence](../evidence/sanitized/api-fortnite/20260916T080852Z/events_leaderboard_solo_past.json).
- Exact-identity device refresh: 200; access token remained in memory. [Sanitized authentication metadata](../evidence/sanitized/api-fortnite/20260916T080852Z/authentication.json).
- `GET /api/v2/events/players/{accountId}/history`: 404; error text suppressed, cause unknown. [Sanitized evidence](../evidence/sanitized/api-fortnite/20260916T080852Z/events_history_v2.json).
- `GET /api/v1/events/player/{accountId}/matches?region=EU&platform=Windows`: 200 with zero recent tournament matches and zero tournament groups. Its documented retention is short; no lifetime-participation inference follows. [Sanitized evidence](../evidence/sanitized/api-fortnite/20260916T080852Z/events_recent_matches.json).

The [request ledger](../evidence/sanitized/api-fortnite/probe-summary.json) now has 70 dispatched requests: 57 GET and 13 authentication POST, with exact status unavailable for two earlier locally uncaptured GET responses. No new account-changing endpoint was used.

### 2026-09-16 current Item Shop free-offer check

`GET /api/v1/shop?lang=en` returned 200. The bounded sanitizer counted 36 storefronts and 287 entries; none had numeric `finalPrice=0` in their price arrays. It captured no usable global expiration timestamp. This is a current-shop observation only and does not establish the absence of free quest/event rewards, personal eligibility, claim state or deadlines. [Sanitized evidence](../evidence/sanitized/api-fortnite/20260916T081305Z/shop_free_offers.json). The [ledger](../evidence/sanitized/api-fortnite/probe-summary.json) now contains 71 dispatched requests: 58 GET and 13 authentication POST.

### Probe group: events_leaderboard_solo_past — 2026-09-16T08:08:53.5695642Z

- Operation: GET `/api/v1/events/global/leaderboard?eventId=epicgames_S42_SoloVictoryCup_EU&eventWindowId=S42_SoloVictoryCup_Event2Round2_EU&page=0`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260916T080852Z/events_leaderboard_solo_past.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: authentication — 2026-09-16T08:08:55.8238655Z

- Operation: POST `/api/v1/oauth/refresh-device`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260916T080852Z/authentication.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: events_history_v2 — 2026-09-16T08:08:57.5721024Z

- Operation: GET `/api/v2/events/players/{accountId}/history`; HTTP status: 404; outcome: http_error.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260916T080852Z/events_history_v2.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: events_recent_matches — 2026-09-16T08:08:58.7592134Z

- Operation: GET `/api/v1/events/player/{accountId}/matches?region=EU&platform=Windows`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260916T080852Z/events_recent_matches.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: shop_free_offers — 2026-09-16T08:13:06.1453389Z

- Operation: GET `/api/v1/shop?lang=en`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260916T081305Z/shop_free_offers.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: authentication — 2026-09-16T08:18:44.0836170Z

- Operation: POST `/api/v1/oauth/refresh-device`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260916T081843Z/authentication.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: events_tracker_history_completeness — 2026-09-16T08:18:46.1580596Z

- Operation: GET `/api/v1/events/tracker/eligibility?accountId={accountId}&days=180&requiredTournaments=14`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260916T081843Z/events_tracker_history_completeness.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: assets_shop_bundles — 2026-09-16T08:19:47.8951678Z

- Operation: GET `/api/v1/assets/bundles/shop`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260916T081946Z/assets_shop_bundles.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: assets_tournament_bundles — 2026-09-16T08:19:49.7908767Z

- Operation: GET `/api/v1/assets/bundles/tournaments`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260916T081946Z/assets_tournament_bundles.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: authentication — 2026-09-16T08:21:11.4586142Z

- Operation: POST `/api/v1/oauth/refresh-device`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260916T082110Z/authentication.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: events_tracker_history_completion_retry — 2026-09-16T08:21:13.4763869Z

- Operation: GET `/api/v1/events/tracker/eligibility?accountId={accountId}&days=180&requiredTournaments=14`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260916T082110Z/events_tracker_history_completion_retry.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: playlist_lookup_ropesmileduo — 2026-09-16T08:23:11.8710446Z

- Operation: GET `/api/v2/playlists/ropesmileduo?lang=en`; HTTP status: 500; outcome: http_error.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260916T082310Z/playlist_lookup_ropesmileduo.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: playlist_lookup_habanero_ropesmile_duos — 2026-09-16T08:23:13.8917809Z

- Operation: GET `/api/v2/playlists/habanero_ropesmile_duos?lang=en`; HTTP status: 500; outcome: http_error.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260916T082310Z/playlist_lookup_habanero_ropesmile_duos.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### Probe group: playlist_lookup_known_solo — 2026-09-16T08:23:52.1343534Z

- Operation: GET `/api/v2/playlists/Playlist_DefaultSolo?lang=en`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260916T082351Z/playlist_lookup_known_solo.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

### 2026-09-16 Python SDK comparison and bounded followup

Source review found that the Python SDK's bundled Swagger contains 109 paths/110 operations versus 138 paths/140 operations in the current provider specification. Thirty current routes, including the newer sprite catalogue and v2 Battle Pass, are absent from the SDK snapshot. Its `battlepass.get()` method calls the already-tested news/MOTD-shaped v1 shop route. Its quest, entitlement, BR inventory, Friends and Crew methods wrap the same routes already investigated. The only SDK route absent from the current spec is an admin debug raw Epic download, which was not called. The [SDK audit](api-fortnite-python-sdk-audit.md) records source links and the comparison method.

The SDK's 180-day participation helper identified a useful complete-history signal. The first sanitized GET returned 200 with 4,202/4,210 windows resolved, `history.complete=false`, `eligible=null`, and zero of fourteen tournaments. A second GET after the provider's backfill returned 200 with 4,210/4,210 resolved, `history.complete=true`, zero of fourteen and `eligible=false` for that specific participation criterion. This does not override the different event-specific eligibility response or establish general tournament ineligibility. Both private GETs followed successful exact-identity device authentication.

Public asset-bundle GETs returned 200, yielding 21 shop visual bundles and a 400-field tournament asset map with 49 season-42 keys. The safe projection found no quest templates, pass offer IDs or explicit unlock/release fields. Playlist by-ID lookup returned 200 for the catalogue's known `Playlist_DefaultSolo`, but 500 for two stat-only `ropesmile`/`habanero` keys. Those keys remain unmapped. The [request ledger](../evidence/sanitized/api-fortnite/probe-summary.json) now contains 80 dispatched requests: 65 GET and 15 authentication POST. Two older GET statuses remain unknown because local report capture failed; no new account-changing operation was used.

### Probe group: playlists_active — 2026-09-16T08:27:32.1435582Z

- Operation: GET `/api/v2/playlists/active?lang=en`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/api-fortnite/20260916T082731Z/playlists_active.json`.
- Confidence: observed status and sanitized shape only; interpretation follows batch review. No raw response or credentials saved.

The active-playlist response contained 390 records, the same count as the earlier all-playlists response. Its bounded relevant-name projection contained no `ropesmile`, `habanero` or `figment` match, so it did not resolve the unmapped statistics keys. The [request ledger](../evidence/sanitized/api-fortnite/probe-summary.json) now contains 81 dispatched requests: 66 GET and 15 authentication POST. Two older GET statuses remain unknown due to local capture failures.

### Probe group: authentication — 2026-09-16T08:55:15.7908050Z

- Operation: POST `/api/v1/oauth/refresh-device`; HTTP status: 200; outcome: identity_verified.
- Sanitized evidence: `evidence/sanitized/epic-profiles/20260916T085515Z/authentication.json`.
- Scope: one approved identity, read-only profile retrieval; response body and credentials stayed in memory.

### Probe group: athena — 2026-09-16T08:55:17.9070223Z

- Operation: POST `/fortnite/api/game/v2/profile/{accountId}/client/QueryProfile?profileId=athena&rvn=-1`; HTTP status: 200; outcome: identity_verified_full_profile.
- Sanitized evidence: `evidence/sanitized/epic-profiles/20260916T085515Z/athena.json`.
- Scope: one approved identity, read-only profile retrieval; response body and credentials stayed in memory.

### Probe group: common_core — 2026-09-16T08:55:20.1432717Z

- Operation: POST `/fortnite/api/game/v2/profile/{accountId}/client/QueryProfile?profileId=common_core&rvn=-1`; HTTP status: 200; outcome: identity_verified_full_profile.
- Sanitized evidence: `evidence/sanitized/epic-profiles/20260916T085515Z/common_core.json`.
- Scope: one approved identity, read-only profile retrieval; response body and credentials stayed in memory.

### Probe group: authentication — 2026-09-16T08:56:03.3833637Z

- Operation: POST `/api/v1/oauth/refresh-device`; HTTP status: 200; outcome: identity_verified.
- Sanitized evidence: `evidence/sanitized/epic-profiles/20260916T085603Z/authentication.json`.
- Scope: one approved identity, read-only profile retrieval; response body and credentials stayed in memory.

### Probe group: athena — 2026-09-16T08:56:05.2628536Z

- Operation: POST `/fortnite/api/game/v2/profile/{accountId}/client/QueryProfile?profileId=athena&rvn=-1`; HTTP status: 200; outcome: identity_verified_full_profile.
- Sanitized evidence: `evidence/sanitized/epic-profiles/20260916T085603Z/athena.json`.
- Scope: one approved identity, read-only profile retrieval; response body and credentials stayed in memory.

### Probe group: common_core — 2026-09-16T08:56:07.2473427Z

- Operation: POST `/fortnite/api/game/v2/profile/{accountId}/client/QueryProfile?profileId=common_core&rvn=-1`; HTTP status: 200; outcome: identity_verified_full_profile.
- Sanitized evidence: `evidence/sanitized/epic-profiles/20260916T085603Z/common_core.json`.
- Scope: one approved identity, read-only profile retrieval; response body and credentials stayed in memory.

### 2026-09-16 direct Epic profile synthesis

The user removed the broker requirement for this investigation. A fixed-operation local probe passed synthetic identity/redaction tests, then made two bounded passes: one provider device-auth POST and one read-only Epic `QueryProfile` POST each for `athena` and `common_core` per pass. All six requests returned HTTP 200, and every authentication/profile response passed the exact-account identity gate. The second pass corrected a sanitizer-only date-type issue in the first report; no full profile, token or device credential was written.

The confirmed `athena` profile was updated 15 September 21:58:43 UTC and contained 4,024 items. Its 645 Quest instances included 493 Active and 152 Claimed, with 202 records carrying completion-counter fields and 96 expiry/deadline fields. Those counts do not identify currently playable quests or objective targets. Season 42 reported `purchased=true`, level 200 and 147 claimed offers, confirming a personal claim ledger but not the total or currently available reward denominator. The profile contained 475 Athena item records with variants arrays; owned style semantics still need validation. The confirmed `common_core` profile was updated 15 September 19:57:09 UTC and returned one subscription record with end/next reward/next renewal reward on 22 September 15:51:59 UTC, auto-renew enabled and no renewal retry as of its status refresh. Future payment remains unverified. See the [sanitized results](epic-profile-readonly-results.md).

### Probe group: authentication — 2026-09-16T16:52:19.5121048Z

- Operation: POST `/api/v1/oauth/refresh-device`; HTTP status: 200; outcome: identity_verified.
- Sanitized evidence: `evidence/sanitized/epic-profiles/20260916T165219Z/authentication.json`.
- Scope: one approved identity, read-only profile retrieval; response body and credentials stayed in memory.

### Probe group: athena_structure — 2026-09-16T16:52:21.3225873Z

- Operation: POST `/fortnite/api/game/v2/profile/{accountId}/client/QueryProfile?profileId=athena&rvn=-1`; HTTP status: 200; outcome: identity_verified_full_profile.
- Sanitized evidence: `evidence/sanitized/epic-profiles/20260916T165219Z/athena_structure.json`.
- Scope: one approved identity, read-only profile retrieval; response body and credentials stayed in memory.

### Probe group: authentication — 2026-09-16T16:53:35.7295253Z

- Operation: POST `/api/v1/oauth/refresh-device`; HTTP status: 200; outcome: identity_verified.
- Sanitized evidence: `evidence/sanitized/epic-profiles/20260916T165335Z/authentication.json`.
- Scope: one approved identity, read-only profile retrieval; response body and credentials stayed in memory.

### Probe group: athena_structure — 2026-09-16T16:53:37.5348626Z

- Operation: POST `/fortnite/api/game/v2/profile/{accountId}/client/QueryProfile?profileId=athena&rvn=-1`; HTTP status: 200; outcome: identity_verified_full_profile.
- Sanitized evidence: `evidence/sanitized/epic-profiles/20260916T165335Z/athena_structure.json`.
- Scope: one approved identity, read-only profile retrieval; response body and credentials stayed in memory.

### 2026-09-16 quest, pass and style structure synthesis

The two fixed-scope `athena` followups each used one successful identity-verified device refresh and one HTTP 200 read-only `QueryProfile`; the source profile update timestamp was unchanged. The first projected the bounded structure. The second checked free/premium flags, loot-result shapes and variant-owned arrays. No full profile was saved. A projection heuristic initially flagged four `reward_granter` field names as definition-like; all four begin `completion_` and are quest counter keys. The latest sanitized evidence records the correction, and the synthetic test now excludes counters from that classification.

Personal quest template names include Creative and Festival-like samples, so substring-based `daily`/`weekly` counts are not playable BR quest counts. No non-counter English title, target or reward definition field was found by this bounded attribute-name scan. Season 42's 147 distinct claimed offers split into 44 free-flagged and 103 premium, with 160 loot-result entries; this remains a claims ledger, not a complete reward catalogue or unique-cosmetic count. Across 639 variant-channel entries, all had separate `active` and `owned` fields; 296 active values were not listed in the corresponding owned array. Active style cannot be assumed owned from that field alone. The [profile results](epic-profile-readonly-results.md) state the remaining joins and limits. The saved provider specification exposes no untested quest-definition or complete pass-catalogue route in the permitted scope.

### 2026-09-16 public specification recheck

The current api-fortnite.com Swagger JSON returned HTTP 200. It still has 138 paths, with zero paths added or removed relative to the saved snapshot. The relevant path set remains the two asset-bundle routes, `/api/v1/shop/battlepass`, `/api/v2/battlepass`, `/api/v2/battlepass/seasons`, and `/api/v2/quests/{accountId}`. This path comparison does not establish that every schema or response changed by zero. It establishes that no new documented quest-definition or Battle Pass catalogue route appeared since the saved inventory. No private endpoint was called for this check.

### Catalogue exporter probe: Versions — 2026-09-16T18:41:34.0936025Z

- Operation: GET `/v1/versions`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/catalogue-exporter/20260916T184134Z/versions.json`.
- No authentication or personal data was sent; raw response was not saved.

### Catalogue exporter probe: Seasons — 2026-09-16T18:41:56.8460000Z

- Operation: GET `/v1/export/seasons?Version=42.10`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/catalogue-exporter/20260916T184157Z/seasons.json`.
- No authentication or personal data was sent; raw response was not saved.

### 2026-09-16 bounded catalogue-source synthesis

Official Epic public documentation inspected in this phase covered aggregate Fortnite Data API island metrics and a consumer Battle Pass page, neither of which supplied the complete, machine-readable personal quest-definition/pass-offer join needed here. The single assessed exporter, FortniteAPI.com, documents a beta game-file export surface, not a ready-made quest or pass endpoint. Its two initial unauthenticated GETs returned HTTP 200, but the saved safe projections captured only a two-element version array without labels and a generic seasons wrapper (`hash`, `entries`, `bytes`, `jsonOutput`) without season, quest, offer or reward fields. The projection did not inspect encoded `jsonOutput` string content, so the result is inconclusive about actual catalogue content. No personal token was sent, no raw response was saved, and the two-request limit is exhausted. No profile-to-catalogue join was established. See [catalogue-source results](catalogue-source-results.md).

### Catalogue exporter followup: Versions — 2026-09-16T18:47:24.0920056Z

- Operation: GET `/v1/versions`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/catalogue-exporter/20260916T184724Z/followup-versions.json`.
- No authentication or personal data was sent; raw response was not saved.

### Catalogue exporter followup: Seasons — 2026-09-16T18:47:33.1122054Z

- Operation: GET `/v1/export/seasons?Version=42.10`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/catalogue-exporter/20260916T184733Z/followup-seasons.json`.
- No authentication or personal data was sent; raw response was not saved.

### 2026-09-16 catalogue representation follow-up synthesis

The two separately authorized public follow-up GETs returned HTTP 200. The refined `versions` projection found two candidate strings, 42.00 and 42.10, in two version objects. The refined `seasons?Version=42.10` projection established that `jsonOutput` is an array, not an encoded JSON string. It traversed 128 nodes and found no numeric season field or quest/pass/offer/reward field names. No raw response, personal token or account data was saved or sent. This does not prove the exporter lacks definitions at other asset paths, but no personal quest or pass-offer join can be made from these summaries. Both follow-up calls are complete; see [catalogue-source results](catalogue-source-results.md).

### Catalogue exporter bounded question: season element shape — 2026-09-19T08:50:38.1249055Z

- Operation: GET `/v1/export/seasons?Version=42.10`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/catalogue-exporter/20260919T085038Z/season-element-shape.json`.
- Question: element types, safe field names/types, and asset-path candidates only. No authentication or personal data was sent; raw response was not saved.

### Catalogue exporter bounded question: season shape — 2026-09-19T08:52:01.0597311Z

- Operation: GET `/v1/export/seasons?Version=42.10`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/catalogue-exporter/20260919T085201Z/season-nested-shape.json`.
- Question: nested chapter/season field types, bounded numeric values, and /Game asset-path substrings only. No authentication or personal data was sent; raw response was not saved.

### 2026-09-19 season element-shape synthesis

The two-call bounded question is complete. Both public unauthenticated GETs returned HTTP 200. The 42.10 `jsonOutput` array has 42 object entries whose top-level fields are `chapter`, `season`, `displayType`, `key`, and `text`. The nested chapter and season objects contain localization strings and identifiers only: `key`, `localizedString`, `namespace`, and `sourceString`. The safe projections found no numeric season value and no `/Game/...` asset path. This establishes that the tested seasons operation is a localization index rather than the required quest-definition or Battle Pass reward catalogue. Because raw export requires an exact path and none was established, no guessed `/v1/export?Path=...` call was made. Personal joins remain unverified. See [catalogue-source results](catalogue-source-results.md).

### Catalogue exporter INI search: SeasonDefinition — 2026-09-20T14:27:21.0497089Z

- Operation: GET `/v1/export/search?Query=AthenaSeasonItemDefinition`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/catalogue-exporter/20260920T142722Z/ini-search-seasondefinition.json`.
- Only response shape, safe field names and `/Game/...` path substrings were retained. No authentication or personal data was sent; raw response was not saved.

### Catalogue exporter INI search: QuestDefinition — 2026-09-20T14:27:33.7777259Z

- Operation: GET `/v1/export/search?Query=FortQuestItemDefinition`; HTTP status: 200; outcome: http_success.
- Sanitized evidence: `evidence/sanitized/catalogue-exporter/20260920T142734Z/ini-search-questdefinition.json`.
- Only response shape, safe field names and `/Game/...` path substrings were retained. No authentication or personal data was sent; raw response was not saved.

### 2026-09-20 exporter path-discovery synthesis

The current exporter OpenAPI confirms that raw object export requires an exact `Path`, provides no example, and that its search operation indexes only INI files and has no version parameter. Public documentation/source research found historical class names but no current version-42.10 asset path. The two fixed latest-version INI searches for `AthenaSeasonItemDefinition` and `FortQuestItemDefinition` returned HTTP 200. Their sanitized projections traversed 51 and 180 string nodes respectively, but found no `/Game/...` path substring. These counts do not represent definitions. No raw export call was made because doing so would require guessing. The documented discovery surfaces of the single permitted exporter are exhausted without a personal quest or pass-offer join. See [catalogue-source results](catalogue-source-results.md).

### 2026-09-30 Home Assistant Integration & Lovelace Card Phase Implementation

Following the user's `/plan` request and interactive alignment interview, designed and implemented:
1. Custom Home Assistant Integration (`custom_components/fortnite_family`):
   - Pro API client for `api-fortnite.com` (`v2/stats`, `v1/profile/ranked`, `v1/profile/level`) using only `API_FORTNITE_KEY`.
   - Adaptive `FortniteDataUpdateCoordinator` shifting between 90s active session polling and 1800s idle polling.
   - Session tracking engine (`FortniteSessionManager`) with baseline snapshotting, automatic match delta detection (Victory Royale vs placement brackets, kill delta, rank net %), and inactivity timeout archival.
   - Entity platforms: overall stats sensor, current session sensor, rank sensors (Battle Royale & Reload Build), level sensor, playing binary sensor.
   - Authenticated WebSocket API (`fortnite_family/session`, `fortnite_family/history`, `fortnite_family/playlists`) and services (`start_session`, `end_session`, `refresh_player`).
2. Custom Lovelace Card (`custom:fortnite-family-card`):
   - Built with LitElement and TypeScript in `frontend/`, bundled to `dist/fortnite-family-card.js` (40.2kb).
   - Full Visual Editor GUI (`editor.ts`) implementing `<ha-form>` schema for complete Lovelace UI configuration.
   - Implements Bubble Card 3.x styling guidelines: `--bubble-border-radius`, `--bubble-main-background-color`, `--bubble-border`, `--bubble-accent-color`, pill sub-buttons (`32px` radius), and responsive grid for Fire HD 10 landscape tablet.
3. Automated Test Suite:
   - 12 unit tests in `tests/unit/` covering parsing, session lifecycle, match delta detection, adaptive coordinator polling, level failure resilience, initial update failure safety, and end-to-end multi-match session simulation. All tests passed.

### 2026-09-30 v1.0.1 Bugfix Release

- **Diagnosis**: Live Home Assistant deployment logged two errors:
  1. `FortniteAuthError: Unauthorized (401) on /v1/profile/level`: On `api-fortnite.com`, the `profile/level` endpoint requires an interactive/OAuth Epic player token (`x-fortnite-token`), which is not present in pure Pro API key mode (`x-api-key`).
  2. `TypeError: argument of type 'NoneType' is not a container or iterable`: Occurred at `coordinator.py:137` because on initial coordinator refresh before data is cached, `self.data` is `None` in Home Assistant core.
- **Resolution**:
  - In `api/api_fortnite.py`: `get_raw_level` now catches `FortniteApiError` (including 401) and returns `{}` so level unavailability does not disrupt stats or ranked updates.
  - In `coordinator.py`: wrapped level fetch in defensive try-except and guarded `self.data` with `if self.data and p_id in self.data:` to prevent `TypeError`.
  - In `frontend/src/fortnite-activity-card.ts`: card header adapts gracefully when level is unavailable (shows player subtitle instead of 0).
  - Version bumped to `1.0.1`, released on GitHub tag `v1.0.1`.



### 2026-09-30 v1.0.7 Card Bugfix Release

- **Diagnosis** (observed on live HA 1.0.6 install):
  1. Card never re-rendered after first paint (Career Stats / Start / End did nothing; visual editor blank). The TS target ES2022 emitted native class fields which shadowed Lit's reactive accessors.
  2. All stats blank: card looked up `sensor.fortnite_<player>_current_session` etc., but `has_entity_name` + device name produced `sensor.fortnite_player1_player1_session`, `..._battle_royale_rank`, `..._reload_rank`.
  3. Manual `start_session`/`end_session` changed the session manager but republished stale `coordinator.data`, so entities did not change; `end_session` did not persist history.
  4. Card read rank name from a non-existent `current_rank` attribute (it is the sensor state).
- **Resolution**: `useDefineForClassFields: false`; entities expose `fortnite_player_id` / `fortnite_entity_key` attributes and the card resolves by them with a legacy-name fallback; coordinator syncs session state into its data and saves history on end; rank read from state; misleading "Div N" label removed; integer `promotionProgress` accepted.
- **Known limitation (unchanged)**: season/account level stays 0 in API-key-only mode (level endpoint requires an Epic player token).

### 2026-09-30 v1.0.9 debug pass (committed, not yet released)

- **Ranked progress always 0**: parser read `promotionProgress`; the live field (sanitized evidence `20260915T191238Z/ranked.json`) is `rankProgress`. Synthetic fixtures had used the invented name, masking the bug. Fixtures corrected; `unrealRank` now surfaced.
- **Options flow crashed on HA 2026.9** (`AttributeError: property 'config_entry' ... has no setter`, observed in HA log): handler no longer assigns `config_entry`.
- **Session engine**: duos/squads placements (`placetop6`/`placetop12`) were dropped; multiple matches in one poll produced one record; rank deltas always used the BR track and broke across tier changes (now `division*100 + progress`, per mode's track); sessions ended by inactivity were not saved; active sessions were lost on restart (now persisted, legacy storage migrated).
- **Polling**: level endpoint (needs Epic player token) was called and rejected every poll; now backs off 24 h and the level sensor is unavailable rather than 0. One player's API failure no longer fails all players. HA shared aiohttp session used.
- **Services**: voluptuous schemas, per-player coordinator lookup, `refresh_player` honours `player_id`, validation errors surfaced.
- **Card**: players outlived now per-mode (per-playlist data was always available); Unreal placement shown; `×N` for batched matches.
- **Probe note**: a bounded probe using the `API_FORTNITE_KEY` user environment variable returned 401 on every endpoint (including key-only ones that succeed from HA), so that variable no longer holds the key HA uses. No retries were made. Windowed (`startTime`) stats remain unverified live.

### 2026-09-30 v1.0.9 profile expansion (bundled with the debug pass)

- **New key-only data** (slow profile coordinator; failures isolated from match polling): `/v1/season`, `/v2/playlists` (names/images), `/v1/account/{id}`, `/v1/account/{id}/externalAuths`, `/v1/events/global`, `/v2/cosmetics/search` (card avatar), and `/v2/stats/{id}?startTime=` for Today / last 7 days / season.
- **Unverified at release time**: the `startTime` filter (guarded: window hidden unless the response echoes `startTime` or totals differ from lifetime) and the untyped account/externalAuths shapes (parsers accept object/list/dict and fall back to None/[]). Confirm from live entity attributes after deploy.
- **Derived metrics** (no extra API calls): kills/match, kills/min, avg match minutes, score/match, hours, solo-only Top 10/25 rates, team-size and input-method breakdowns (input method is not platform), favourite mode (excludes creative/other), last played from `lastmodified`.
- Tournament view is schedule-only and makes no eligibility claims.

### 2026-09-30 v1.1.0 events, leaderboards and card polish

- **Observed live (v1.0.9)**: `startTime` windows are honoured (season 649 vs lifetime 20,270 matches); `/v1/account/{id}` display name works; `/v1/account/{id}/externalAuths` returns HTTP 403 from Epic upstream with the provider key (platforms hidden); playlist catalogue has 389 entries (387 with images) but **no Reload or ranked (`ropesmile*`/`habanero*`) entries**, so those modes have no artwork; `events/global` window `round` is not a round number (a "Round1" window reported 8), so labels now come from the window id.
- **New**: tournaments for all regions tagged with mode / team size / platform group derived only from Epic's event names and platform codes (untagged when not stated); `/v1/events/global/leaderboard` (key-only, observed 200 in sanitized evidence) with the tracked account highlighted — the highlight response shape is unverified, so the player row is matched by `teamId` and hidden if absent.
- **Match records** now carry per-poll minutes, score, players outlived and Unreal placement change.
- **Rank badges** are self-drawn SVG tier shields: the API exposes no ranked artwork.
- **Header offset** was HA's `ha-card` styling of slotted `.card-header` (extra 16px padding); the card now uses its own class.
