# Quest names and details: source investigation (1 October 2026)

## What we have

With the linked Epic account, `GET /v2/quests/{accountId}` (api-fortnite.com) now returns HTTP 200 with 850 quest records. Observed fields per record: `templateId` (e.g. `Quest:quest_mapmastery_03_punchberry_q02`), `state` (e.g. `Active`), `objectives[]` (`statName`, `quantity`, `stage`), `challengeBundleId`, `expiryTime`, `itemId`, `productTags`.

There is **no** display name, description, objective target, or reward in the payload. The route is untyped in the provider's OpenAPI and the public docs do not describe quest definitions. Showing progress bars or names would require inventing targets and names, which the project rules forbid. The integration therefore shows only counts by state.

## Sources checked

| Source | Result |
| --- | --- |
| api-fortnite.com docs + OpenAPI | Only `/v2/quests/{accountId}` (progress). No definition, localization or catalogue route. Sprites and Battle Pass *are* resolved from game definitions by this provider, so the capability exists on their side. |
| FortniteAPI.io (`/v2/challenges`, `/v3/challenges`) | Historically the main source of quest names/targets/XP. Announced closure on 31 March 2026; the domain no longer resolves (checked 1 Oct 2026). |
| Fortnite-API.com | Cosmetics, shop, stats, news, playlists, map, banners, AES keys, creator codes. No quests. |
| Epic Verse / UEFN quest API | Creator-island quests defined in Verse; not Battle Royale quest definitions. |
| Game-file exporter (api.fortniteapi.com, earlier research) | Raw export needs an exact asset path; no quest path was ever established. Asset *names* are now known from `templateId`, but the directory is not, and guessing paths is out of scope. |

## Viable options

1. **Ask api-fortnite.com to add quest definitions** (recommended). They already resolve sprite and Battle Pass definitions from game files. A `/v2/quests/definitions` or name/target fields on `/v2/quests` would let the integration join on `templateId` with no new credentials. Contact: their Discord / email from the docs page.
2. **Local game-file extraction** (CUE4Parse/FModel using the provider's `/v1/aes` keys and `/v1/mappings`). Quest definitions (`FortQuestItemDefinition`) contain names, objective counts and rewards. This needs the installed game files, so it runs on the gaming PC, which AGENTS.md says to avoid. It must also be redone each update, and Epic's terms on data-mining apply. This needs an explicit decision before any work.
3. **Direct Epic `QueryProfile`** (athena) gives the same counters plus bundle links, still without definitions. It does not solve names.

Until one of these exists, quests stay as counts only.
