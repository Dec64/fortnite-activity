# api-fortnite.com stats, ranks, sprites and playlist results

Completed 2026-09-15. This continuation used only the paid api-fortnite.com Pro service. It made eleven requests: two device-auth token-issuance POSTs and nine GETs. Both token responses matched the previously attested configured identity exactly, and both tokens remained in process memory only. No friends, presence, events, tournaments, alternative providers or implementation work was attempted.

## Request results

| Operation | Calls | HTTP result | Usable evidence |
| --- | ---: | --- | --- |
| `POST /api/v1/oauth/refresh-device` | 2 | 200, 200 | Exact identity gate passed; access tokens remained in memory and were discarded |
| `GET /api/v2/stats/{accountId}` | 1 | 200 | Full sanitized field-name/numeric projection captured |
| `GET /api/v1/profile/ranked?accountId={accountId}` | 2 | 200, 200 | Second projection retained associated safe rank/mode labels |
| `GET /api/v1/profile/tracks` | 1 | 200 | Structural projection captured |
| `GET /api/v1/profile/progress?accountId={accountId}` | 1 | 200 | Structural projection captured |
| `GET /api/v2/sprites/collection` | 2 | 200, 200 | Both response bodies reached the client, but both local sanitized projections failed |
| `GET /api/v2/playlists?lang=en` | 2 | 200, 200 | Second projection retained relevant public playlist/display names |

The sprite and playlist repeats were capture corrections. Their two-call ceilings are now reached.

## Statistics

The response contained 954 stat fields. Of these, 936 match the Battle Royale playlist-key form used by the provider, covering 123 distinct playlist identifiers and three input groups: keyboard/mouse, gamepad and touch.

Observed counter dimensions are:

- kills;
- matches played;
- minutes played;
- top 1, 3, 5, 6, 10, 12 and 25 placements;
- players outlived;
- score;
- last-modified timestamp.

The default request reported `startTime=0` and an effectively unbounded end time. This establishes an unbounded query window, not a guaranteed lifetime or current-season definition. The endpoint supplies no season field. Input grouping must not be treated as platform identity.

The data is live enough for snapshot tracking: the newest playlist modification was 2026-09-15T17:28:53Z, less than two hours before the probe. Standard BR and several internal `ropesmile`/`habanero_*` counters had recent timestamps.

The playlist catalogue returned 390 records and establishes these mappings:

| Stats identifier | Provider playlist/display name | Conclusion |
| --- | --- | --- |
| `defaultsolo`, `defaultduo`, `defaultsquad` | `Playlist_DefaultSolo` / Solo, `Playlist_DefaultDuo` / Duos, `Playlist_DefaultSquad` / Squads | Standard BR queues. Treat Build as a high-confidence proposed mapping until compared with known play. |
| `trios` | `playlist_trios` / Trios | Standard BR Trios; same Build caveat |
| `nobuildbr_solo`, `nobuildbr_duo`, `nobuildbr_trio`, `nobuildbr_squad` | Explicit `Zero Build - Solo/Duos/Trios/Squads` display names | Zero Build mapping observed |
| `ropesmile*`, `habanero_*`, `figment*` | No matching record in the 390-item catalogue | Unmapped; recent timestamps alone do not prove Reload or ranked status |

The current data therefore supports truthful queue-level raw counters and an explicit Zero Build mapping. It does not yet support a complete Reload mapping, a ranked/unranked split for stat counters, or a current-season-only filter.

The later [Python SDK audit](api-fortnite-python-sdk-audit.md) exercised its by-ID and active-playlist routes through the same provider. `Playlist_DefaultSolo` returned 200, while the stats-only identifiers `ropesmileduo` and `habanero_ropesmile_duos` each returned 500. The active route returned 200 with 390 records but no relevant codename in the bounded extraction. These calls did not establish a Reload mapping; do not infer a mode from the codename alone.

## Ranked progress

The enriched rank response returned 88 historical/current rows, of which seven were marked current:

| Provider game mode | Current | Highest | Progress | Current period |
| --- | --- | --- | ---: | --- |
| Arena Boxfights | Gold III | Gold III | 75% | 2026-07-16 to 2026-12-13 |
| Battle Royale | Champion I | Champion II | 8% | 2026-08-20 to 2026-12-07 |
| Reload Build | Elite III | Elite III | 71% | 2026-07-30 to 2026-11-01 |
| Three `RadiantToothpick` solo/duo/trio tracks | Unranked | Unranked | 0% | 2026-06-01 to 2026-10-01 |
| Rocket Racing | Unranked | Unranked | 0% | 2026-06-06 to 2026-11-01 |

The provider labels the current BR track only as `Battle Royale` with ranking type `ranked-br-combined`; this result alone does not prove a Build versus Zero Build split. No current `Battle Royale Zero Build` row was returned. Absence must not be converted to Unranked.

The track catalogue and raw progress endpoints each returned 88 records. They expose track IDs, ranking type, season dates, division counts, current/highest division and promotion progress. The enriched ranked endpoint is the better display source; the other two are useful for validation and future mapping.

## Sprite collection — superseded capture finding

The two unversioned own-collection calls in this batch returned HTTP 200, but their local sanitized projection failed. A later wrapper-aware projection captured the all-version collection, and an explicitly versioned `42.10` own-collection request captured all 61 variant ownership records. The current totals are 23/61 variants, 15/16 families and seven mastered variant records. See the [later sprite results](api-fortnite-events-friends-sprites-results.md) and [sanitized current collection](../evidence/sanitized/api-fortnite/20260916T080056Z/sprites_collection_current.json). The initial capture failure was local processing, not a demonstrated provider failure.

## Resulting capability boundary

- Stats are available and timely, but playlist/period semantics are only partly mapped.
- Enriched ranked progress is available and directly useful for current supported tracks.
- Standard Zero Build playlist mappings are verified; standard BR Build remains a high-confidence mapping requiring comparison, and Reload stat playlists remain unknown.
- Sprite catalogue and current variant ownership now have a successful bounded sanitized capture; version rollover behavior remains unverified.

Sanitized evidence is under `evidence/sanitized/api-fortnite/20260915T191036Z`, `20260915T191238Z`, `20260915T191441Z` and `20260915T191526Z`.
