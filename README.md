# 🎮 Fortnite Activity Tracker for Home Assistant

[![HACS Custom Integration](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://hacs.xyz/)
[![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2024.1+-blue.svg)](https://www.home-assistant.io/)
[![Bubble Card Compatible](https://img.shields.io/badge/Style-Bubble%20Card%203.x-cyan.svg)](https://github.com/Clooos/Bubble-Card)
[![Tests](https://img.shields.io/badge/Tests-Passing-brightgreen.svg)]()

An automated Fortnite statistics and real-time live session tracking integration for Home Assistant, featuring a custom Lovelace card styled natively for **Bubble Card 3.x** with full **Visual Editor** support.

---

## ✨ Features

- 🏆 **Live Game-by-Game Session Feed**:
  - Automatically detects when you sit down to play without any manual interaction.
  - Detects when each match finishes (via adaptive 90-second polling).
  - Displays discrete match cards: **Game #**, Mode (e.g. *Zero Build Duos*), Placement (**Victory Royale 🏆** vs Top brackets), Kills, and Rank % movement.
  - Live session duration timer and cumulative session KPIs (Matches, Wins, Kills, Session K/D, Net Rank progression).
  - Automatically archives completed sessions to history after 20 minutes of inactivity.
- 📊 **Overall Career & Season Stats**:
  - Aggregates 954 playlist dimensions into clean categories: Overall, Battle Royale (Build), Zero Build, and Reload.
  - Win Rate %, K/D Ratio, Total Victories 🏆, Matches Played, Kills, and Players Outlived.
- 🛡️ **Competitive Ranked Track Progression**:
  - Real-time progress bars for Battle Royale (e.g. *Champion I 8%*) and Reload Build (e.g. *Elite III 71%*).
  - Live session rank delta indicator (e.g. `▲ +11% this session`).
- 🎨 **Bubble Card 3.x Native Styling**:
  - Adheres strictly to the Bubble Card CSS variable chain (`--bubble-border-radius`, `--bubble-main-background-color`, `--bubble-border`, `--bubble-accent-color`).
  - Pill metric chips (`32px` radius) and Bubble-style sub-buttons (`Start/End Session`, `Refresh`, view switcher).
  - Perfectly matches Bubble Button, Pop-up, and Streamline cards on wall tablets (e.g. Fire HD 10 landscape) and mobile.
- 🛠️ **Full Visual Editor GUI**:
  - 100% UI-driven configuration in the Lovelace card editor via Home Assistant's native `<ha-form>` schema.
- ⚡ **Zero-Hassle Frontend Auto-Load**:
  - The integration automatically registers and injects the card JavaScript into Home Assistant. No manual dashboard resource entry required!
- 🔒 **Lightweight & Secure**:
  - All stats and ranks use your `api-fortnite.com` Pro API key (`x-api-key`). No ongoing Epic device token refresh or private password handling needed for stats!

---

## 📦 Installation

### Option 1: Via HACS (Recommended)

1. In Home Assistant, open **HACS** → **Integrations** → **⋮** (top right) → **Custom repositories**.
2. Enter the repository URL:
   ```text
   https://github.com/Dec64/fortnite-activity
   ```
3. Set Category to **Integration** and click **Add**.
4. Search for **Fortnite Activity Tracker** in HACS and click **Download**.
5. Restart Home Assistant.

### Option 2: Manual Installation

1. Copy the `custom_components/fortnite_activity` folder into your Home Assistant `/config/custom_components/` directory:
   ```bash
   cp -r custom_components/fortnite_activity /config/custom_components/
   ```
2. Restart Home Assistant.

> [!TIP]
> **No manual resource needed!** The integration automatically serves and registers the custom card at `/fortnite_activity_static/fortnite-activity-card.js`.

---

## ⚙️ Configuration

1. In Home Assistant, navigate to **Settings** → **Devices & Services** → **Add Integration**.
2. Search for **Fortnite Activity Tracker**.
3. Fill in the setup wizard:
   - **api-fortnite.com API Key**: Your Pro API key.
   - **Player Identifier**: Unique key, e.g. `player1`.
   - **Player Display Name**: Display name, e.g. `Player One`.
   - **Epic Games Account ID**: Your Epic Account ID.
4. Click **Submit**.

### Options Flow
Click **Configure** on the integration card to adjust:
- **Active Polling Interval**: Polling frequency during active play (default: `90` seconds).
- **Idle Polling Interval**: Polling frequency when idle (default: `1800` seconds / 30 minutes).
- **Inactivity Timeout**: Grace period before automatically closing and archiving a session (default: `20` minutes).

---

## 🖼️ Dashboard Card Setup

### Visual Editor
1. On your dashboard, click **Edit Dashboard** → **Add Card**.
2. Search for **Fortnite Activity Card**.
3. Use the visual controls to customize:
   - **Tracked Player**: `player1`, `player2`, etc.
   - **Sections**: pick any combination of Live/Last Session, Stats & Ranks, Events, Sprites, Trends and Battle Pass; drag to set the tab order. With one section the tab bar is hidden.
   - **Section opened first**: Automatic (Live Session while playing, otherwise Stats) or a fixed section.
   - **Header**: `Full`, `Slim` (name, V-Bucks, live status) or `None`.
   - **Visual Theme**: `Bubble Card` (sleek pills & theme vars), `Cyber Fortnite`, or `Minimal`.
   - **Accent Tint**: `Inherit Theme Accent`, `Victory Gold`, `Slurp Cyan`, or `Storm Purple`.
   - **Match Feed**: Toggle match feed visibility and set maximum games shown.
   - **Action buttons**: Toggle `Start/End Session` and `Refresh`.

Cards saved before 1.9 with `layout:` (`auto`, `session_only`, `career_only`, `events_only`) keep working; `sections:` takes over once set.

### YAML Examples

#### Adaptive Card (Default)
```yaml
type: custom:fortnite-activity-card
player: player1
card_style: bubble
theme_accent: auto
show_match_feed: true
show_sub_buttons: true
max_feed_matches: 10
```

#### Battle Pass only
```yaml
type: custom:fortnite-activity-card
player: player1
sections: [pass]
header: slim
show_sub_buttons: false
```

#### Full-screen family panel (one landscape page per player, swipe between them)
```yaml
# Use a dashboard view of type "panel"
type: custom:fortnite-family-panel
players: [player1, player2]
kid_mode: [player2]          # true, false, or a list of players
# columns:                # optional; default is three columns:
#   - sections: [session, stats, trends]
#     header: full
#   - sections: [pass, sprites, locker]
#   - sections: [events, shop, news, map]
```

Sections available on any card: `session`, `stats`, `events`, `sprites`, `trends`, `pass`, `locker`, `shop`, `news`, `map`.

**Wishlist alerts:** tap ♡ on any item in the Shop section (or search every cosmetic under *Wishlist*). When a wishlisted item that you don't own is in the Item Shop, `sensor.fortnite_<player>_wishlist_in_shop` counts it and a `fortnite_activity_wishlist_in_shop` event fires (once per item per shop). Use it in an automation to send a notification. Services: `fortnite_activity.wishlist_add`, `wishlist_remove`, `set_favorite`, `set_avatar`.

#### Pick and order sections
```yaml
type: custom:fortnite-activity-card
player: player1
sections: [session, stats, events]
default_section: auto
```

#### Inside a Bubble Card Room Pop-up
```yaml
type: vertical-stack
cards:
  - type: custom:bubble-card
    card_type: pop-up
    hash: "#fortnite"
    name: Gaming Tracker
    icon: mdi:controller
  - type: custom:fortnite-activity-card
    player: player1
    card_style: bubble
```

---

## 📡 Entities & Services

### Entities Created per Player
| Entity ID | Type | Description |
|-----------|------|-------------|
| `binary_sensor.fortnite_<player>_playing` | Binary Sensor | `on` during active session, `off` when idle |
| `sensor.fortnite_<player>_current_session` | Sensor | `active` or `idle` with session duration, matches, kills, and recent match feed |
| `sensor.fortnite_<player>_overall_stats` | Sensor | Career matches played with total wins, kills, K/D, win rate, and mode breakdown |
| `sensor.fortnite_<player>_rank_battle_royale` | Sensor | Current BR Rank (e.g. *Champion I*), division, progress %, and peak rank |
| `sensor.fortnite_<player>_rank_reload` | Sensor | Current Reload Rank (e.g. *Elite III*), division, and progress % |
| `sensor.fortnite_<player>_level` | Sensor | Season Battle Pass level, tier, XP, and account level |

### Services
- `fortnite_activity.start_session`: Manually trigger session start for a player (`player_id: player1`).
- `fortnite_activity.end_session`: Manually finalize and archive the active session for a player (`player_id: player1`).
- `fortnite_activity.refresh_player`: Immediately trigger an API refresh for fresh stats.

---

## 🧪 Local Testing

Run the automated test suite locally:
```bash
py -3 -m unittest discover -s tests/unit
```
All 10 tests verify API parsing, session lifecycle, match delta detection, adaptive coordinator polling, and end-to-end multi-match session simulation.
