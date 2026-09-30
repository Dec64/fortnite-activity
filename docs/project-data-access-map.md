# Fortnite Family Tracker data and API access map

Updated 2026-09-16. This is a project-scope assessment based on the api-fortnite.com Pro investigation, the current OpenAPI specification, the [Python SDK audit](api-fortnite-python-sdk-audit.md), fresh [read-only Epic profile results](epic-profile-readonly-results.md), the [bounded catalogue-source check](catalogue-source-results.md), and historical observations recorded in the handoff. It does not authorize implementation work. Detailed event observations are in [events, Friends and sprites results](api-fortnite-events-friends-sprites-results.md).

Evidence labels:

- **Observed now**: inspected in the current sanitized live investigation.
- **Local private snapshot**: a supplied raw response was screened for credentials and inspected only through a redacted structural projection. It is point-in-time evidence, not a current live check.
- **Historical**: recorded in the handoff; current behavior has not been reconfirmed and the underlying raw response may not be present.
- **Documented**: present in the current provider documentation or OpenAPI specification; runtime usefulness is not yet established.
- **Missing**: no suitable working data surface has been established.
- **Derived**: computed from stored snapshots once its required source data exists; it does not require a separate upstream endpoint.

## Coverage assessment

| Project capability | Access we have | What is still missing | Current conclusion |
| --- | --- | --- | --- |
| Player One identity and unattended authentication | **Observed now:** api-fortnite.com interactive OAuth and newly rotated device auth both returned the exact expected Epic identity. A device-auth refresh then succeeded. | Token renewal across process restarts, credential longevity, failure recovery and concurrent multi-account behavior have not been measured. | Sufficient for further bounded Player One research. Production reliability remains unverified. |
| Player Two identity and authentication | No verified Epic account ID or separate authorization is present. Existing PSN entities belong to Player One; no Nintendo-to-Epic mapping is established. | Player Two's confirmed Epic identity and a separate, consented authentication path. Later PS5/Nintendo association must be verified rather than inferred from friends or display names. | **Missing project input and private-data access.** Private Player Two features cannot be populated yet. |
| Season and account progress | **Observed now:** current season, account level, season level/tier and XP returned successfully for Player One. | The provider's `purchased` flag conflicts with historical personal profile evidence, so pass ownership cannot come from this response. | Numeric progress is usable with timestamp and source. Pass ownership is not. |
| Public cosmetic metadata | **Observed now:** the provider returned cosmetic metadata and a global catalogue total. | A complete crawl has not been performed. Global catalogue membership does not mean the cosmetic is obtainable or owned. | Suitable as an enrichment catalogue after bounded pagination validation. |
| Owned cosmetics and styles | **Observed now:** fresh read-only Epic `athena` returned 4,024 items and 475 Athena item records with 639 variant-channel entries; `active` and `owned` are distinct fields and 296 active values were outside the corresponding owned arrays. The provider BR inventory route still returned only `stash.globalcash`. | Validate item and owned-style semantics; join personal instances to public cosmetic metadata. | **Personal ledger access works through direct Epic.** Active style and owned options must not be conflated; the aggregate variant counts are not unique owned-style counts. |
| Quest progress | **Observed now:** fresh direct Epic `athena` returned 645 quest instances, 202 with counter fields and 96 with expiry/deadline fields. A bounded attribute scan found no non-counter definition-like fields; template-name patterns include Creative and Festival-like examples. The provider quest route returned 401. The initial catalogue-source check established no definition join. | Interpret instances and bundle links; filter hidden/control/stale records; join to definitions. | **Raw personal progress is available through direct Epic.** Readable BR quest progress remains blocked on definition and visibility semantics. |
| Quest names, targets and rewards | Personal profile data did not provide a complete English definition set. Exporter seasons and fixed class-name INI searches established no exact definition path or matching definitions. | Versioned English definitions, objective targets, stages, rewards, visibility, prerequisites and expiry. | **Missing verified data source.** Progress alone cannot support truthful quest cards; historical class names are not a current path. |
| Free cosmetics and deadlines | **Observed now:** current Item Shop returned 200 with 287 entries and no numeric zero-price offer in its returned price arrays. No usable shop expiration timestamp was captured. | Quest/event free rewards, their objective/eligibility rules, expiry, and personal claim state. | **The shop snapshot does not close this gap.** No currently free shop offer was observed, but quest-based free rewards remain unknown. |
| Battle Pass level and claimed rewards | **Observed now:** provider numeric tier 214 and direct Epic Season 42 record with `purchased=true`, level 200, 147 distinct claimed offers (44 free-flagged, 103 premium) and 160 loot-result entries. | Explain the separate level fields and join claims to the complete versioned catalogue. The provider `purchased=false` conflicts with the personal ledger. | Current level and a personal claim ledger are available. Total completion and unique cosmetic reward counts remain unknown. |
| Complete Battle Pass catalogue | **Observed now:** both Pro catalogue requests returned 404, the season archive was empty, and the shop pass route returned news/MOTD-shaped content. Exporter seasons is a localization index; the fixed season-class INI search supplied no game asset path. **Local private snapshot:** the season shop storefront contains five purchase/level offers, not a page-by-page reward catalogue. | Every current reward, page, price, free/premium status, release time, level or quest prerequisite, and other availability rules. An exact exporter asset path is also missing. | **No usable complete catalogue verified.** The single permitted exporter's documented discovery surfaces are exhausted. Remaining or available reward counts cannot be calculated yet. |
| Personal Crew membership | **Observed now:** fresh direct Epic `common_core` returned one subscription, with end/next reward/next renewal reward scheduled 22 September 2026 15:51:59 UTC, `AutoRenewEnabled`, no renewal retry, and source status refresh on 15 September. Provider Crew routes remain public pack content. | Future renewal/payment outcome and post-boundary state require later refresh. | **Personal state is available through direct Epic as of the profile update.** Public pack art/content is separate. |
| Statistics | **Observed now:** 954 fields, including 936 parseable BR counters across 123 playlist identifiers and keyboard/mouse, gamepad and touch groups. Recent counters updated on the probe date. The 390-record playlist catalogue explicitly maps Zero Build and standard queue names. A known by-ID lookup worked, while two stats-only `ropesmile`/`habanero` IDs each returned 500. The active list also returned 390 records without a relevant codename in the bounded extraction. | A verified standard-BR Build comparison, mappings for recent `ropesmile`/`habanero_*` candidates, ranked flag and dependable period/season semantics. | **Available and timely, with partial semantics.** Safe for raw queue snapshots; not yet safe for complete Build/Reload/ranked aggregations. |
| Ranked progress | **Observed now:** enriched ranks, track catalogue and raw progress all returned 200 with 88 rows. Seven current rows include Battle Royale, Reload Build and Arena Boxfights. | The generic `Battle Royale`/`ranked-br-combined` label does not prove a Build/ZB split. Missing current Zero Build must not be interpreted as Unranked. | **Available and directly useful** when provider labels, dates and freshness are preserved. |
| Sprite collection | **Observed now:** version 42.10 catalogue and current private collection returned 200 with 16 families, 61 variants, 23 owned, 15 owned families and seven mastered variant records. Four-version cumulative ownership returned 26/179 deduplicated variants. | Long-term rollover behavior and image delivery still need implementation-time validation. | **Provider data is available.** Versioned family/variant ownership and mastery can support the requested collection view. Do not add overlapping per-version totals. |
| Presence and Fortnite activity | **Observed now:** Friends summary/list returned 403 despite Pro documentation; second summary was permission-related. The current-session route returned 403 and explicitly requires Custom while the key is Pro. | A usable Pro source for PC/Switch activity, freshness, lobby/match/exit semantics and later PS5 mapping. | **Unavailable through the tested Pro routes.** A friendship relation or tournament schedule is not presence. |
| Session duration and per-session gains | **Derived:** snapshot differences can calculate change since a baseline once stats/rank/quest data exists. | Trustworthy presence is needed for real session boundaries. Source update delay and reset behavior must be measured. | Daily or since-last-check changes are possible without another API. Accurate session attribution remains blocked by presence. |
| Live match telemetry | No source has established current kills, remaining players, health, match placement or similar real-time data. | A safe, read-only, timely source and verified semantics. | **Missing and optional.** Post-match snapshot changes must not be presented as live telemetry. |
| Tournament listings and standings | **Observed now:** global listing returned 200 with 24 top-level entries; EU player listing returned 200 with 40 events and 165 windows. Global and window-specific scoring/prize calls returned 200, including distinct Solo Victory Cup qualifier and final rules. One completed-window leaderboard returned 200 with 100 entries on page 0 and 40 reported pages. Recent-player-matches returned empty in its short scope; the separate v2 participation-history route returned 404 of unknown cause. | Payout threshold semantics, standings pagination beyond page 0, official rules, queue/platform restrictions and event-to-broadcast association. | **Schedule, rules and a working paginated leaderboard are available from the provider.** Do not turn reward table structure into promised winnings without validating its meaning. |
| Tournament eligibility | **Observed now:** one upcoming Solo Victory Cup eligibility GET returned `isEligible=true`, two verified requirements met, and six unverified requirements. A separate 14-tournaments-in-180-days backfill completed all 4,210 windows and returned 0/14 and `eligible=false` for that criterion. | Complete current rules, age restrictions, platform/region requirements and proof that this particular event applies a participation threshold. | **Criterion-specific data is available, not confirmed event entry eligibility.** Do not conflate the completed 14-tournament test with the different event-specific token check. |
| Official English broadcasts | No dedicated broadcast discovery or stream URL operation exists in the current provider surface. Replay `broadcast` data is not an official live-video feed. | Official channel/event discovery, scheduled/live status, stable event association and playback/link metadata. | **Missing data source.** This requires later research outside the current provider-only phase. |
| Historical trends | **Derived:** levels, ranks, stats, quest counters and collection totals can be sampled over time. | Stable source dimensions, persistence, season rollover handling and reset detection. | No history API is required; trustworthy trends depend on first validating each sampled source. |

## What api-fortnite.com can cover

The current evidence supports using api-fortnite.com for:

- Epic sign-in and device-auth token issuance for the verified player;
- current season and numeric profile progress;
- public cosmetic metadata and current public Crew pack content;
- current stats and ranks, with the mapping limits documented above;
- versioned sprite catalogue and personal variant ownership/mastery;
- tournament schedules, stage windows, scoring, payout structures and paginated standings with explicit eligibility limits.

The current evidence does not support using api-fortnite.com for:

- personal cosmetic ownership or unlocked styles;
- personal Crew membership;
- working quest progress;
- complete English quest definitions and rewards;
- a working Battle Pass reward catalogue or full availability rules;
- reliable cross-platform presence on the current Pro tier;
- official broadcast discovery;
- live in-match telemetry.

The entitlement 404 is not evidence that the account owns nothing. The BR inventory response is a V-Bucks stash shape, not a cosmetic locker. The global cosmetic total is not an ownership or obtainable-item denominator. Public Crew content is not subscription status.

## Data joins needed for the requested views

Several user-facing features require more than one source:

| Requested result | Required inputs |
| --- | --- |
| Readable quest progress | Personal quest instance/counters + matching versioned English definition + target/reward/expiry rules |
| Owned locker with styles | Personal item/style ledger + public cosmetic metadata and images |
| Battle Pass remaining and currently available rewards | Personal claim ledger + complete season catalogue + free/premium, release and prerequisite rules |
| Personal Crew view | Personal subscription state + public pack metadata |
| Mode-specific trends | Verified playlist/rank mapping + comparable timestamped snapshots |
| Session summary | Reliable presence boundaries + pre/post snapshots + delayed-update window |
| Tournament Play view | Provider event/window data + official rules + independently verified account requirements |
| Tournament Watch view | Event schedule + official English broadcast source + verified event-to-stream association |

## Practical scope boundary

A truthful first useful dataset for Player One can now include verified identity, level/tier/XP, season, public cosmetic enrichment, raw queue-level stats with explicit mapping limits, enriched current ranks, versioned sprite collection, and source-labeled tournament schedules/rules/standings. Fresh direct Epic `athena` and `common_core` reads establish personal locker records, quest counters, Season 42 ownership/claims and Crew subscription fields. Their user-facing interpretation still requires the joins and rules listed above.

The full requested family tracker remains blocked by five material gaps:

1. Player Two's verified Epic identity and separate authorization.
2. Validated joins/semantics for the now-accessible personal cosmetic styles, quest counters and pass claims, plus complete English quest definitions and reward rules.
3. A complete current Battle Pass catalogue and availability rules.
4. Reliable Switch/PC/PS5 Fortnite presence with freshness semantics.
5. Official tournament rules, confirmed entry eligibility and English broadcast discovery.

Stats, ranks, sprite ownership and event schedules/rules are verified provider capabilities, with the semantic limits above. Friends access is a documented Pro-versus-observed-403 discrepancy. The live-session route is explicitly Custom-only, so this Pro investigation has no working presence source.

No form or provider-support document is part of the current plan. No external message has been sent.
