# Fortnite Family page

`custom:household-fortnite-page-card` is a whole dashboard page for a household of Fortnite players. The integration serves it from `/fortnite_activity_static/fortnite-family-page.js` and loads it on every dashboard, so no resource needs adding.

The page is plain JavaScript, with no build step: [`custom_components/fortnite_activity/frontend/fortnite-family-page.js`](../custom_components/fortnite_activity/frontend/fortnite-family-page.js). It embeds a hidden `custom:fortnite-activity-card` for the data views (tournaments, shop, map, Battle Pass, locker, news and trends), so both cards always come from the same integration version.

## Configuration

```yaml
type: custom:household-fortnite-page-card
player: player1               # optional: player shown first (default: the first player)
players:                      # optional: default is every player the integration tracks
  - id: player1               # the integration's player identifier
    name: Player One          # optional: shown on buttons and headings (default: the identifier, title-cased)
    person: person.player_one # optional: person entity whose picture is the avatar
  - player2                   # a plain identifier also works
artwork:                      # optional images from /config/www
  hero: /local/fortnite/hero.png   # header and news-banner background
  grid: /local/fortnite/grid.png   # artwork tile on the stats page
native:                       # options passed to the embedded Fortnite Activity Card
  sections: [session, stats, events, sprites, trends, pass, locker, shop, news, map]
  events_region: EU
  kid_mode: true
  hide_vbucks: false
  hide_account_level: true
```

`people: {player1: person.player_one}` (the older form) is still read when a player has no `person`. Without either, the avatar comes from `person.<player id>` when that entity exists.

## What each tab shows

| Tab | Content |
|-----|---------|
| Last session | Every game of the latest session as a coloured tile (Victory Royale, Top 5/10/25 or players outlived), kills, quests and level gained. Tap a tile for the full game. |
| Stats | Lifetime, today, last-7-days and season figures by mode and team size, plus ranks and Power Ranking. |
| Sprites | Collection progress, families and variants, season history, and new Sprites from the latest update. |
| Events | Coming up, Live and Results views, with filters (region, type, mode, team, platform, minimum level), posters, entry requirements and leaderboards. Results cover the last 30 days. |
| Trends | Charts per period and season, with coloured up/down changes. |
| Pass | Reward sets with high-resolution art (looked up by name when the item ID is unknown), progress and costs; continuous paging with jump links per section. |
| Locker | Owned outfits, favourites and avatar choice. |
| Shop | Today's shop with jump links per section, wishlist hearts and "back after N days" history. |
| News | The latest update, the next tournament and the news feed. |
| Map | The map filling the space, with Explore (search places and grid squares), Land (pick or randomise a drop spot) and Draw (plan a route) modes, plus full screen. |
| Together | The first two players side by side: wins, joint stats, and each player's last-session games in two columns. Each game opens its own pop-up. |

Tournament, shop and map data load in the background shortly after the page opens, so those tabs open with their data ready.

## Limitations

- Times are shown in UK time (Europe/London) and numbers in en-GB format, whatever Home Assistant's settings are.
- The design uses the Outfit and Figtree fonts when they are installed as dashboard resources; otherwise the browser's sans-serif font is used.
- Together compares only the first two players.
- Full-screen map: where the browser refuses element full screen (iPad, some app web views), the map is lifted over the page instead.

## History

The page began as a household dashboard card loaded from `/config/www`, with fixes applied at load time on top of the original file. Seven rounds of fixes (12–18 October 2026) covered:

- pop-up animations, sprite pop-ups and scroll position
- match tile heights, colours and icons
- full-box high-resolution art
- map zoom, keyboard and full screen
- trends charts
- continuous pass and shop paging
- news banners
- event posters, filters, past results and requirement pills
- Reload and Ranked playlist names
- the Together view
- background loading
- removing hard-coded player names

From 1.18.0 the fixed file itself is the source, and the integration ships it.
