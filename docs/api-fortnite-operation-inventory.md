# api-fortnite.com operation inventory

Snapshot: 2026-09-14. 140 operations across 138 paths, OpenAPI 3.0.1. Documentation evidence only; no operation in this inventory has been live-tested in this phase.

Sources: [downloaded specification](../evidence/sanitized/specifications/api-fortnite-openapi.json), [provider OpenAPI](https://prod.api-fortnite.com/swagger/v1/swagger.json), [provider authentication documentation](https://api-fortnite.com/docs). Machine-readable [full inventory](../evidence/sanitized/specifications/api-fortnite-operations.json) retains parameters, body and response schemas, plans, auth/risk rationale and operation descriptions. Resolve component references against the saved specification.

## Authentication interpretation

KEY = x-api-key, required globally by the website. PLAYER = x-fortnite-token, separate from the provider key. The snapshot has no securitySchemes, no root security and no operation security declarations. A 401 response alone does not identify which credential is required. No-player-token claims do not waive the provider key. Unknown additional authentication remains unknown; this inventory is not permission to try every route. Health-route exceptions, plan enforcement and actual credential scopes are unverified. x-plans is copied verbatim; missing plans mean unspecified.

## Mutation risk interpretation

READ_LOW: documented retrieval; READ_POST: POST documented as retrieval; READ_AMPLIFIED: potentially many upstream reads; READ_BACKGROUND_JOB: starts provider backfill; PROCESSING_QUOTA: replay processing/upload and credit consumption; AUTH_STATE: authentication flow/token state; MUTATION_BLOCKED: account/provider/share/credential changes excluded from execution. These classify documented effects, not guarantees about undocumented implementation side effects.

| Method | Path | Plans | Authentication | Mutation risk |
| --- | --- | --- | --- | --- |
| GET | `/api/v1/account/{accountId}` | free, pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v1/account/bulk` | free, pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v1/account/displayName/{displayName}` | free, pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v1/account/external/{externalAuthType}/displayName/{displayName}` | free, pro, custom | KEY; player token not documented | READ_LOW |
| POST | `/api/v1/account/external/displayNames/bulk` | free, pro, custom | KEY; player token not documented | READ_POST |
| POST | `/api/v1/account/external/ids/bulk` | free, pro, custom | KEY; player token not documented | READ_POST |
| GET | `/api/v1/account/{accountId}/externalAuths` | free, pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v1/account/{accountId}/externalAuths/{authType}` | free, pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v1/account/displaynames` | free, pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v1/account/sdk` | free, pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v1/aes/history` |  | KEY; player token not documented | READ_LOW |
| GET | `/api/v1/aes` |  | KEY; player token not documented | READ_LOW |
| GET | `/api/v1/mappings` |  | KEY; player token not documented | READ_LOW |
| GET | `/api/v1/assets/bundles/tournaments` | pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v1/assets/bundles/shop` | pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v2/battlepass` | pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v2/battlepass/seasons` | pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v1/season` | free, pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v2/cosmetics/all` | pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v2/cosmetics/search` | pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v2/cosmetics/new` | pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v2/cosmetics/{id}` | pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v1/crew/current` | pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v1/crew/history` | pro, custom | KEY; player token not documented | READ_LOW |
| POST | `/api/v1/custom-match/initiate` | custom | KEY; caller ownership/custom plan; additional auth uncertain | MUTATION_BLOCKED |
| GET | `/api/v1/custom-match/status/{playerId}` | custom | KEY; caller ownership/custom plan; additional auth uncertain | READ_LOW |
| GET | `/api/v1/custom-match/bots` | custom | KEY; caller ownership/custom plan; additional auth uncertain | READ_LOW |
| POST | `/api/v1/custom-match/accounts` | custom | KEY; caller ownership/custom plan; additional auth uncertain | MUTATION_BLOCKED |
| DELETE | `/api/v1/custom-match/accounts/{id}` | custom | KEY; caller ownership/custom plan; additional auth uncertain | MUTATION_BLOCKED |
| GET | `/api/v2/events/{eventId}/windows/{eventWindowId}/leaderboard` | pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v2/events/players/{accountId}/history` | pro, custom | KEY + PLAYER (documented) | READ_LOW |
| GET | `/api/v2/events/{eventId}/windows/{eventWindowId}/leaderboard/player` | pro, custom | KEY; no PLAYER (documented) | READ_LOW |
| GET | `/api/v2/events/{eventId}/windows/{eventWindowId}/players/{accountId}` | pro, custom | KEY; no PLAYER (documented) | READ_AMPLIFIED |
| GET | `/api/v2/fn/br-inventory/{accountId}` | pro, custom | KEY + PLAYER candidate (unverified) | READ_LOW |
| GET | `/api/v2/fn/keychain` | pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v2/fn/receipts/{accountId}` | pro, custom | KEY + PLAYER candidate (unverified) | READ_LOW |
| GET | `/api/v2/fn/enabled-features` | pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v2/fn/version/{platform}` | pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v2/fn/privacy/{accountId}` | pro, custom | KEY + PLAYER (documented) | READ_LOW |
| POST | `/api/v2/fn/privacy/{accountId}` | pro, custom | KEY + PLAYER (documented) | MUTATION_BLOCKED |
| GET | `/api/v2/fn/entitlement` | pro, custom | KEY + PLAYER (documented) | READ_LOW |
| POST | `/api/v2/fn/entitlement/{accountId}` | pro, custom | KEY + PLAYER (documented) | MUTATION_BLOCKED |
| GET | `/api/v1/friends/{accountId}/summary` | pro, custom | KEY + PLAYER (website documented) | READ_LOW |
| GET | `/api/v1/friends/{accountId}/friends` | pro, custom | KEY + PLAYER (website documented) | READ_LOW |
| GET | `/api/v1/friends/{accountId}/incoming` | pro, custom | KEY + PLAYER (website documented) | READ_LOW |
| GET | `/api/v1/friends/{accountId}/outgoing` | pro, custom | KEY + PLAYER (website documented) | READ_LOW |
| GET | `/api/v1/friends/{accountId}/friends/{friendId}/mutual` | pro, custom | KEY + PLAYER (website documented) | READ_LOW |
| GET | `/api/v1/friends/{accountId}/blocklist` | pro, custom | KEY + PLAYER (website documented) | READ_LOW |
| GET | `/api/v1/friends/{accountId}/friends/{friendId}` | pro, custom | KEY + PLAYER (website documented) | READ_LOW |
| GET | `/api/v1/friends/{accountId}/suggested` | pro, custom | KEY + PLAYER (website documented) | READ_LOW |
| POST | `/api/v1/identity/link` | custom | KEY; player token not documented | MUTATION_BLOCKED |
| GET | `/api/v1/identity/{discordId}` | custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v1/map` | pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v1/map/image` | pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v1/map/history` | pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v1/news` | pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v1/news/br` | pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v1/news/stw` | pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v1/news/creative` | pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v1/oauth/get-token` | pro, custom | KEY + flow-specific input (documented) | AUTH_STATE |
| POST | `/api/v1/oauth/complete` | pro, custom | KEY + flow-specific input (documented) | AUTH_STATE |
| POST | `/api/v1/oauth/refresh-token` | pro, custom | KEY + flow-specific input (documented) | AUTH_STATE |
| POST | `/api/v1/oauth/exchange-code` | pro, custom | KEY + flow-specific input (documented) | AUTH_STATE |
| POST | `/api/v1/oauth/refresh-device` | pro, custom | KEY + flow-specific input (documented) | AUTH_STATE |
| POST | `/api/v1/oauth/revoke-device` | pro, custom | KEY + flow-specific input (documented) | MUTATION_BLOCKED |
| GET | `/api/v1/oauth/authorize-url` | pro, custom | KEY + flow-specific input (documented) | AUTH_STATE |
| POST | `/api/v1/oauth/link` | pro, custom | KEY + flow-specific input (documented) | AUTH_STATE |
| GET | `/health` |  | KEY; player token not documented | READ_LOW |
| GET | `/health/version` |  | KEY; player token not documented | READ_LOW |
| POST | `/api/v1/parsing` | pro, custom | KEY; player token not documented | PROCESSING_QUOTA |
| POST | `/api/v1/parsing/stats` | free, pro, custom | KEY; player token not documented | PROCESSING_QUOTA |
| POST | `/api/v1/parsing/map` | pro, custom | KEY; player token not documented | PROCESSING_QUOTA |
| POST | `/api/v1/parsing/loot` | pro, custom | KEY; player token not documented | PROCESSING_QUOTA |
| POST | `/api/v1/parsing/timeline` | pro, custom | KEY; player token not documented | PROCESSING_QUOTA |
| POST | `/api/v1/parsing/zones` | pro, custom | KEY; player token not documented | PROCESSING_QUOTA |
| POST | `/api/v1/parsing/lobby` | pro, custom | KEY; player token not documented | PROCESSING_QUOTA |
| POST | `/api/v1/parsing/broadcast` | pro, custom | KEY; player token not documented | PROCESSING_QUOTA |
| GET | `/api/v2/playlists` | pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v2/playlists/active` | pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v2/playlists/{playlistId}` | pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v1/profile/progress` | pro, custom | KEY; no PLAYER (documented) | READ_LOW |
| GET | `/api/v1/profile/level` | pro, custom | KEY + PLAYER (documented) | READ_LOW |
| GET | `/api/v1/profile/ranked` | pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v1/profile/tracks` | pro, custom | KEY; player token not documented | READ_LOW |
| POST | `/api/v1/profile/trackprogress/bulk` | pro, custom | KEY; player token not documented | READ_POST |
| POST | `/api/v1/profile/leaderboard/{gameId}` | pro, custom | KEY + PLAYER candidate (unverified) | READ_POST |
| GET | `/api/v2/quests/{accountId}` | pro, custom | KEY + PLAYER candidate (unverified) | READ_LOW |
| GET | `/api/v1/replays/{matchId}` | free, pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v1/replays/{matchId}/metadata` | pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v1/replays/{matchId}/parse` | pro, custom | KEY; player token not documented | PROCESSING_QUOTA |
| GET | `/api/v1/replays/{matchId}/parse/stats` | pro, custom | KEY; player token not documented | PROCESSING_QUOTA |
| GET | `/api/v1/replays/{matchId}/parse/map` | pro, custom | KEY; player token not documented | PROCESSING_QUOTA |
| GET | `/api/v1/replays/{matchId}/parse/loot` | pro, custom | KEY; player token not documented | PROCESSING_QUOTA |
| GET | `/api/v1/replays/{matchId}/parse/lobby` | pro, custom | KEY; player token not documented | PROCESSING_QUOTA |
| GET | `/api/v1/replays/{matchId}/parse/zones` | pro, custom | KEY; player token not documented | PROCESSING_QUOTA |
| GET | `/api/v1/replays/{matchId}/parse/timeline` | pro, custom | KEY; player token not documented | PROCESSING_QUOTA |
| GET | `/api/v1/replays/{matchId}/parse/tracks` | pro, custom | KEY; player token not documented | PROCESSING_QUOTA |
| GET | `/api/v1/replays/{matchId}/parse/broadcast` | pro, custom | KEY; player token not documented | PROCESSING_QUOTA |
| GET | `/api/v1/shop` | free, pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v1/shop/battlepass` | free, pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v2/sprites` | pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v2/sprites/all` | pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v2/sprites/versions` | pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v2/sprites/boons` | pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v2/sprites/collection` | pro, custom | KEY + PLAYER (documented) | READ_LOW |
| GET | `/api/v2/sprites/collection/all` | pro, custom | KEY + PLAYER (documented) | READ_LOW |
| POST | `/api/v2/sprites/collection/publish` | pro, custom | KEY + PLAYER (documented) | MUTATION_BLOCKED |
| DELETE | `/api/v2/sprites/collection/publish` | pro, custom | KEY + PLAYER (documented) | MUTATION_BLOCKED |
| GET | `/api/v2/sprites/collection/shared/{accountIdOrName}` | pro, custom | KEY; no PLAYER (documented) | READ_LOW |
| GET | `/api/v2/sprites/{id}` | pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v2/stats/{accountId}` | free, pro, custom | KEY; player token not documented | READ_LOW |
| POST | `/api/v2/stats/bulk` | pro, custom | KEY; player token not documented | READ_POST |
| GET | `/api/v2/stats/leaderboard/{stat}` | pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v1/events/tracker` | pro, custom | KEY + PLAYER (documented) | READ_LOW |
| GET | `/api/v1/events/tracker/eligibility/{identifier}/{eventId}` | pro, custom | KEY + optional PLAYER (documented) | READ_LOW |
| GET | `/api/v1/events/tracker/eligibility` | pro, custom | KEY + PLAYER (documented) | READ_BACKGROUND_JOB |
| GET | `/api/v1/events/tokens` | pro, custom | KEY + PLAYER candidate (unverified) | READ_LOW |
| GET | `/api/v1/events/player` | pro, custom | KEY + PLAYER (documented) | READ_LOW |
| GET | `/api/v1/events/sessions` | pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v1/events/player/{accountId}/matches` | pro, custom | KEY + PLAYER (documented) | READ_LOW |
| GET | `/api/v1/events/player/{accountId}/session` | custom | KEY + PLAYER (documented) | READ_LOW |
| GET | `/api/v1/events/{eventId}/{eventWindowId}/player/{accountId}/matches` | pro, custom | KEY; no PLAYER (documented) | READ_AMPLIFIED |
| GET | `/api/v1/events/global` | pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v1/events/global/history` | pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v1/events/cashprizes` | pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v1/events/cashprize/{eventWindowId}` | pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v1/events/scoring` | pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v1/events/scoring/{eventWindowId}` | pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v1/events/stats/{eventId}/{eventWindowId}/{statKey}` | pro, custom | KEY; player token not documented | READ_AMPLIFIED |
| GET | `/api/v1/events/stats/{eventId}/{eventWindowId}/{statKey}/{teamIdentifier}` | pro, custom | KEY; player token not documented | READ_AMPLIFIED |
| GET | `/api/v1/events/powerrankings` | pro, custom | KEY + optional PLAYER (documented) | READ_LOW |
| GET | `/api/v1/events/powerrankings/search` | pro, custom | KEY; no PLAYER (documented) | READ_LOW |
| GET | `/api/v1/events/powerrankings/player/{identifier}` | pro, custom | KEY + PLAYER (documented) | READ_LOW |
| GET | `/api/v1/events/powerrankings/archive/{accountId}` | pro, custom | KEY; no PLAYER (documented) | READ_LOW |
| GET | `/api/v1/events/global/leaderboard` | pro, custom | KEY + optional PLAYER (documented) | READ_LOW |
| GET | `/api/v2/weapons` | pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v2/weapons/{id}` | pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v2/weapons/lootpool` | pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v2/weapons/patches` | pro, custom | KEY; player token not documented | READ_LOW |
| GET | `/api/v2/weapons/rarity` | pro, custom | KEY; player token not documented | READ_LOW |

## Counts

- AUTH_STATE: 7
- MUTATION_BLOCKED: 9
- PROCESSING_QUOTA: 17
- READ_AMPLIFIED: 4
- READ_BACKGROUND_JOB: 1
- READ_LOW: 97
- READ_POST: 5
