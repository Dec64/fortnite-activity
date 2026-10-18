# Fortnite Activity Tracker for Home Assistant

[![HACS Custom Integration](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://hacs.xyz/)
[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2024.1+-blue.svg)](https://www.home-assistant.io/)

A Home Assistant integration that follows a household's Fortnite players: live play sessions game by game, stats and ranks, Battle Pass, locker, Sprites, the Item Shop, tournaments, news and the map. It ships three dashboard cards, which the integration serves and loads itself: a configurable card, a full-screen family panel, and a complete Fortnite Family page with a tab per player and a joint view.

Data comes from the [api-fortnite.com](https://api-fortnite.com) Pro API. Signing a player in with Epic adds their private data (level, Sprites, locker, V-Bucks, Power Ranking). Every Epic call is read-only: the integration never buys, changes settings, adds friends or touches cosmetics.

---

## What it does

### Live sessions
- Detects when a player starts playing by watching for new matches. Polls every 90 seconds while playing and every 30 minutes when idle.
- Records each game: mode (Reload, Ranked and Zero Build playlists get readable names), placement or Victory Royale, eliminations, players outlived, and rank movement.
- Ends and archives a session after 35 minutes without a new match. Past sessions stay browsable.

### Stats and ranks
- Lifetime, today, last-7-days and this-season stats, split into Battle Royale, Zero Build and Reload: wins, win rate, K/D, matches, kills, players outlived, time played, team-size breakdown.
- Ranked progress for Battle Royale and Reload, with ladder and Unreal leaderboard positions.
- Power Ranking, season K/D and win rate, and trend charts over time.

### Epic profile (needs Epic sign-in)
- Season level and account level, and V-Bucks per platform (balances held on another platform are reported separately).
- Sprites collection by season, with new-Sprite alerts when an update adds some.
- Locker of owned outfits with favourites and an avatar choice, plus a wishlist that alerts when an item is in today's shop.

### Game content
- **Battle Pass:** reward sets with high-resolution art, unlock progress and costs.
- **Item Shop:** sections with jump links, "back after N days" history, and wishlist hearts.
- **Tournaments:** upcoming, live and finished events across regions, with round times, entry requirements and leaderboards. Finished events are kept for 30 days, so results stay browsable after Epic drops them from its feed.
- **News** and **season calendar:** every Battle Royale season with sourced dates; see [docs/season-calendar.md](docs/season-calendar.md).
- **Map:** the current map with named places and landmarks, a grid, a random drop spot, drawing your own plan, and full screen.

---

## Requirements

- Home Assistant 2024.1 or newer.
- An **api-fortnite.com Pro** API key.
- Each player's Epic Games account ID, or an Epic sign-in for that player, which finds the ID automatically.
- **Public Game Stats** turned on in each player's Epic account settings. Without it, Epic refuses the stats, and the integration raises a repair notice until it's enabled.

---

## Installation

### HACS (recommended)
1. In HACS, open **⋮** → **Custom repositories**.
2. Add `https://github.com/Dec64/fortnite-activity` with category **Integration**.
3. Find **Fortnite Activity Tracker**, click **Download**, then restart Home Assistant.

### Manual
Copy `custom_components/fortnite_activity` into `/config/custom_components/` and restart Home Assistant.

The integration serves its cards from `/fortnite_activity_static/` and adds them to every dashboard automatically. No dashboard resources are needed. After an update, hard-refresh the browser so it loads the new card files.

---

## Configuration

1. Go to **Settings** → **Devices & Services** → **Add Integration** → **Fortnite Activity Tracker**.
2. Enter the API key and the first player's identifier, display name and Epic account ID.

Click **Configure** on the integration to:
- **Change settings:** polling while playing (default 90 s), polling when idle (default 1800 s), minutes without a match before a session ends (default 35), and the tournament region (default EU).
- **Add a player:** sign in with Epic (recommended; the account ID and Epic name are read from the sign-in), or type the account ID and link Epic later. Use a private browser window if the browser is already signed in to another Epic account.
- **Remove a player.**
- **Link, re-link or unlink an Epic account.** If Epic stops accepting a player's saved sign-in, a repair notice asks you to link again. The integration never retries this on its own.

---

## Dashboard cards

| Card | Use it for |
|------|------------|
| `custom:fortnite-activity-card` | One player, any mix of sections, with a visual editor |
| `custom:fortnite-family-panel` | A landscape panel per player, swiping between players |
| `custom:household-fortnite-page-card` | A whole Fortnite Family page: a tab per player and a joint **Together** view |

Sections available to all cards: `session`, `stats`, `events`, `sprites`, `trends`, `pass`, `locker`, `shop`, `news`, `map`.

### Fortnite Activity Card
Add it from **Add Card** → **Fortnite Activity Card** and use the visual editor, or use YAML:

```yaml
type: custom:fortnite-activity-card
player: player1
sections: [session, stats, events, pass]   # tab order; one section hides the tab bar
default_section: auto                      # live session while playing, otherwise the first section
header: full                               # full, slim or none
card_style: bubble                         # bubble, cyber_fortnite or minimal
theme_accent: auto                         # auto, victory_gold, slurp_cyan or storm_purple
show_match_feed: true
max_feed_matches: 10
kid_mode: false                            # bigger, simpler layout for young players
events_region: EU
```

Other options: `show_sub_buttons`, `compact`, `hide_vbucks`, `hide_account_level`, `hide_season_level`, `hide_rank_progress`, `custom_background`, `avatar`. Cards saved before 1.9 with `layout:` keep working.

### Family panel
Put it in a dashboard view of type **panel**:

```yaml
type: custom:fortnite-family-panel
players: [player1, player2]   # optional; defaults to every tracked player
kid_mode: [player2]           # true, false or a list of players
```

### Fortnite Family page
A complete page for a household. It has a player switcher, a hero header, tabs for every section, pop-ups for matches, Sprites, items and events, and a **Together** view. Together compares the first two players and shows each one's last-session games side by side.

```yaml
type: custom:household-fortnite-page-card
players:                      # optional; defaults to every tracked player
  - id: player1
    name: Player One
    person: person.player_one # optional, for the avatar
  - id: player2
    name: Player Two
artwork:                      # optional background art from /config/www
  hero: /local/fortnite/hero.png
  grid: /local/fortnite/grid.png
native:                       # options for the embedded Fortnite Activity Card
  sections: [session, stats, events, sprites, trends, pass, locker, shop, news, map]
  events_region: EU
  kid_mode: true
```

See [docs/family-page.md](docs/family-page.md) for every option and its current limitations.

---

## Entities

Each player gets a device with these entities. Entity IDs default to `sensor.fortnite_<player>_<key>`.

| Key | Entity | State and main attributes |
|-----|--------|---------------------------|
| `playing` | Binary sensor | `on` during a session |
| `current_session` | Session | `active` / `idle`; duration, matches, wins, kills, recent games |
| `last_played` | Last Played | Time of the latest game |
| `overall_stats` | Overall Stats | Lifetime matches; wins, kills, K/D, win rate, modes, windows |
| `season_kd`, `season_win_rate` | Season K/D, Season Win Rate | This season's figures |
| `rank_battle_royale`, `rank_reload` | Battle Royale Rank, Reload Rank | Rank name; division, progress %, peak |
| `ladder_battle_royale`, `ladder_reload` | BR Ladder, Reload Ladder | Ladder position |
| `unreal_battle_royale`, `unreal_reload` | BR / Reload Unreal Position | Unreal leaderboard position |
| `power_ranking` | Power Ranking | Rank; points, counting events, peak, change |
| `level` | Level | Season level; XP, account level (Epic sign-in) |
| `vbucks` | V-Bucks | Current-platform balance; balances by platform (Epic sign-in) |
| `sprites` | Sprites | Collection %; families, variants, seasons (Epic sign-in) |
| `profile` | Profile | Display name; season, stat windows, Epic link status, equipped outfit |
| `wishlist` | Wishlist in Shop | Number of wishlisted items in today's shop; the items |

## Services

| Service | What it does |
|---------|--------------|
| `fortnite_activity.start_session` / `end_session` | Start or end a player's session by hand |
| `fortnite_activity.refresh_player` | Fetch fresh data now |
| `fortnite_activity.set_avatar` | Choose the outfit shown as the player's avatar |
| `fortnite_activity.wishlist_add` / `wishlist_remove` | Manage a player's wishlist |
| `fortnite_activity.set_favorite` | Mark or unmark an owned outfit as a favourite |

## Events and repair notices

- `fortnite_activity_wishlist_in_shop` fires once per item per shop when a wishlisted item the player doesn't own is on sale. Use it to send a notification.
- `fortnite_activity_new_sprites` fires when a game update adds Sprites.
- Repair notices appear when a player's stats are private (`stats_private`) or their Epic link needs signing in again (`epic_relink`).

---

## Known limitations

- **Quests:** the provider's quest route fails, so quest progress isn't shown.
- **Friends and party presence:** not available on the Pro tier.
- **Sprites:** on some accounts (seen on a restricted child account) Epic refuses the token exchange the provider needs, so Sprites stay unavailable for that player. Everything else works. See the [investigation log](docs/investigation-log.md).
- **Tournament eligibility:** shown as minimum level and requirements, never as a guarantee.
- **Fortnite Family page:** times are shown in UK time and numbers in en-GB format. It looks best with the Outfit font installed as a dashboard resource.

---

## Development

```text
custom_components/fortnite_activity/   integration (Python) and the served card files
  frontend/fortnite-activity-card.js   built card bundle (do not edit; built from frontend/src)
  frontend/fortnite-family-page.js     Fortnite Family page (plain JavaScript, edited directly)
frontend/src/                          TypeScript source of the Activity Card, panel and editor
tests/unit/                            unit tests with synthetic and sanitized fixtures
docs/                                  design notes, API investigation and the investigation log
evidence/sanitized/                    sanitized API response shapes (raw evidence is never committed)
```

- **Build the card:** in `frontend/`, run `npm ci`, then `npm run build`. Copy `frontend/dist/fortnite-activity-card.js` to `custom_components/fortnite_activity/frontend/`.
- **Run the tests:** `python -m pytest -q tests`.
- **Release:** bump `version` in `manifest.json`, push to `master`, then publish a GitHub release tagged `v<version>`. HACS offers releases as updates, and the version is also the cards' cache key.

Contributor and agent rules (credentials, read-only Epic access, evidence handling) are in [AGENTS.md](AGENTS.md).
