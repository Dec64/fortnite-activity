# Bounded catalogue-source results

Investigated 16 September 2026. This is API research only. No Home Assistant component was built, and no personal token or account data was sent to a catalogue service.

## First-party public sources

The inspected [Fortnite Data API documentation](https://dev.epicgames.com/documentation/fortnite/using-fortnite-data-api-in-fortnite) describes aggregate island metrics, not a personal Battle Royale quest-definition or Battle Pass offer catalogue. The inspected [official Battle Pass page](https://www.fortnite.com/battle-pass) explains current pass presentation and featured rewards, but it does not expose the complete machine-readable offer IDs, page ordering and unlock rules needed to reconcile personal claims. This is a bounded finding about those inspected sources, not proof that no Epic catalogue exists elsewhere.

## Single exporter assessment

The [FortniteAPI.com Swagger UI](https://api.fortniteapi.com/docs/index.html) describes a beta, unofficial game-file exporter. Its visible surface includes `GET /v1/versions`, `GET /v1/export/seasons`, and a raw asset export requiring a `Path`. It does not advertise a ready-made quest-definition or Battle Pass reward endpoint. The search route says it currently searches INI files; the parsed export route describes cosmetics. Its beta and game-file provenance call for version and field-level validation before using it for player-facing facts.

The two authorized initial unauthenticated requests were:

| Request | UTC timestamp | Exact HTTP status | Sanitized result | Limit |
| --- | --- | --- | --- | --- |
| `GET /v1/versions` | 2026-09-16T18:41:34.0936025Z | 200 | Root array of two; [safe summary](../evidence/sanitized/catalogue-exporter/20260916T184134Z/versions.json) | The projection captured no version labels. It does not prove version 42.10 appears in the exporter's list. |
| `GET /v1/export/seasons?Version=42.10` | 2026-09-16T18:41:56.8460000Z | 200 | Root object with `hash`, `entries`, `bytes`, `jsonOutput`; [safe summary](../evidence/sanitized/catalogue-exporter/20260916T184157Z/seasons.json) | The bounded projection captured no season number or quest/pass/reward/offer fields. It cannot verify which season was returned, whether `jsonOutput` contains useful data, or whether the requested version was honored. |

Both responses were parsed only in memory and reduced to sanitized structural summaries. No raw body was retained. The initial seasons summary visited 128 nested object/array nodes and found zero relevant field names. The subsequent follow-up established that `jsonOutput` is an array, so the earlier encoded-string hypothesis was incorrect. The scan traversed nested arrays/objects, but did not preserve their item field shapes or non-version string values. Absence from the projection is therefore **not** proof of absence from every exporter asset.

### Authorized follow-up: response representation

The user authorized the next bounded check. The follow-up probe again used only public, unauthenticated GETs with a 512 KiB response cap and saved sanitized shapes:

| Request | UTC timestamp | Exact HTTP status | Observed safe shape |
| --- | --- | --- | --- |
| `GET /v1/versions` | 2026-09-16T18:47:24.0920056Z | 200 | Two objects; first has `version`, `archives`, and `meta` objects. The bounded value scan found candidate version strings `42.00` and `42.10`; [evidence](../evidence/sanitized/catalogue-exporter/20260916T184724Z/followup-versions.json). |
| `GET /v1/export/seasons?Version=42.10` | 2026-09-16T18:47:33.1122054Z | 200 | Root fields `hash` (string), `entries` and `bytes` (numbers), and `jsonOutput` (array). The bounded traversal visited 128 nodes and found no numeric season field or quest/pass/offer/reward field names; [evidence](../evidence/sanitized/catalogue-exporter/20260916T184733Z/followup-seasons.json). |

The version candidates make 42.10 a plausible supported build; the summary does not establish the exporter's canonical active version or that the requested version was honored in the seasons response. The array's element shapes and human-readable content were not retained. A seasons index is not by itself a reward-definition catalogue.

## Join decision

No representative quest or claimed Battle Pass offer can yet be joined to an English definition. The personal `athena` evidence still provides quest instances, counters and a Season 42 claim ledger; it does not provide readable quest targets, a complete pass denominator, reward-page ordering or availability rules. Both the initial and follow-up two-call bounds are exhausted. Do not infer missing reward counts or quest targets from these HTTP 200 responses.

At that stage, a later catalogue check needed a safer projection of `jsonOutput` element types and bounded field names, plus exact asset paths from public documentation before any per-object export. Only then could a small sample test compare stable IDs for three distinct quests and three pass offers. The element-shape part was subsequently authorized and completed below.

### Authorized element-shape check — 19 September 2026

A new bounded question inspected only the safe structure inside the 42.10 seasons array. Two public GETs were made after synthetic sanitizer tests:

| Request purpose | UTC timestamp | Exact HTTP status | Observed safe shape |
| --- | --- | --- | --- |
| Top-level array elements | 2026-09-19T08:50:38.1249055Z | 200 | `jsonOutput` contains exactly 42 objects. Their fields are `chapter` (object), `season` (object), `displayType` (string), `key` (string), and `text` (string). No direct asset-path candidate was found; [evidence](../evidence/sanitized/catalogue-exporter/20260919T085038Z/season-element-shape.json). |
| Nested `chapter` and `season` objects | 2026-09-19T08:52:01.0597311Z | 200 | Both objects contain only `key`, `localizedString`, `namespace`, and `sourceString` string fields. No bounded numeric season value or `/Game/...` asset-path substring was found; [evidence](../evidence/sanitized/catalogue-exporter/20260919T085201Z/season-nested-shape.json). |

This establishes that `/v1/export/seasons` is a 42-entry season/chapter localization index in this response, not a Battle Pass reward catalogue or asset-path discovery result. It still does not prove that the exporter lacks relevant assets elsewhere. Its raw `/v1/export` operation requires an exact `Path`, and the inspected documentation supplies no quest or Battle Pass path. Making a raw export call now would require guessing, so no such call was made.

The exporter branch is blocked on a documented or independently observed exact asset path. Until one exists, further repetitions of the seasons request add no useful evidence. The personal quest counters and pass claims remain available, while readable quest definitions and the complete pass catalogue remain missing.

### Public documentation and INI-search check — 20 September 2026

The current [exporter Swagger](https://api.fortniteapi.com/docs/index.html) was downloaded to [the public specification snapshot](../evidence/sanitized/specifications/fortniteapi-export-openapi.json). It confirms:

- `GET /v1/export` requires a `Path`; the specification provides no example or directory catalogue.
- `GET /v1/export/search` requires a `Query`, searches only loaded INI files, does not support version selection and defaults to the latest version.
- `GET /v1/export/seasons` accepts only an optional `Version`.

Bounded web research found no current official Epic quest/pass asset path. Epic's public Fortnite documentation describes creator/UEFN assets and quests, not the internal Battle Royale definition catalogue. An old public class dump identifies `FortQuestItemDefinition` and `AthenaSeasonItemDefinition` and indicates that these classes historically contain fields relevant to objectives, rewards and season configuration. It does not give a current asset path and is **unverified** for version 42.10.

Two fixed unauthenticated INI searches then tested only those class names:

| Query | UTC timestamp | Exact HTTP status | Sanitized result |
| --- | --- | --- | --- |
| `AthenaSeasonItemDefinition` | 2026-09-20T14:27:21.0497089Z | 200 | Wrapper fields `hash`, `entries`, `bytes`, `jsonOutput`; 51 string nodes visited; no `/Game/...` path found. [Evidence](../evidence/sanitized/catalogue-exporter/20260920T142722Z/ini-search-seasondefinition.json). |
| `FortQuestItemDefinition` | 2026-09-20T14:27:33.7777259Z | 200 | Same wrapper shape; 180 string nodes visited; no `/Game/...` path found. [Evidence](../evidence/sanitized/catalogue-exporter/20260920T142734Z/ini-search-questdefinition.json). |

The searches prove that matching INI material was returned in some structured form; string-node counts are not counts of assets or definitions. The safe projection found no usable game asset path. The two-query bound is exhausted. Because `/v1/export` requires a path and no exact current path has been established, no raw object export was attempted.

The catalogue investigation has now exhausted the documented discovery surfaces of this single exporter without establishing a quest/pass join. Further progress requires a newly observed exact path or an explicitly authorized expansion to a different source. Neither should be inferred from the partial `BattlePassS42_SeasonPass` name in shop metadata.
