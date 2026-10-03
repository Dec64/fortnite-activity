# Fortnite Activity Tracker — Installation, Setup & Live Testing Guide

This guide provides step-by-step instructions to install, configure, and test the **Fortnite Activity Tracker** integration and custom Lovelace card on your Home Assistant installation.

---

## 1. Prerequisites

Before installing, ensure you have:
1. **Home Assistant**: Home Assistant OS, Container, or Supervised (`2024.1.0` or newer; user environment reports HA Core `2026.9.2` on HA OS).
2. **api-fortnite.com Pro API Key**:
   - The key configured in your environment as `API_FORTNITE_KEY`.
3. **Player Account ID**:
   - The first player's Epic Account ID.
   - (Optional) Further players can be added later from **Configure** → **Add a player** by signing in with Epic; no account ID is needed.

---

## 2. Installation Methods

### Method A: Via HACS (Home Assistant Community Store)

The repository is structured with [`hacs.json`](../hacs.json) and manifest tags for custom HACS repository support:

1. In Home Assistant, open **HACS** from the sidebar.
2. Click **Integrations** (or the top right **⋮** menu) → **Custom repositories**.
3. In the dialog:
   - **Repository**: `https://github.com/Dec64/fortnite-activity`
   - **Category**: `Integration`.
4. Click **Add**.
5. Find **Fortnite Activity Tracker** in the HACS list and click **Download**.
6. **Restart Home Assistant** (Settings → System → Restart).

---

### Method B: Manual File Copy (Fastest for Local Dev)

If your Home Assistant `/config` folder is mounted via Samba, SSH, or local directory:

1. **Copy the Integration**:
   Copy the entire [`custom_components/fortnite_activity`](../custom_components/fortnite_activity) folder into your Home Assistant `/config/custom_components/` folder:
   ```bash
   # Example via SCP / Samba
   cp -r custom_components/fortnite_activity /config/custom_components/
   ```
2. **Restart Home Assistant**:
   Navigate to **Settings** → **System** → **Restart** (or run `ha core restart`).

---

## 3. Frontend Card Auto-Registration

> [!NOTE]
> **No Manual Resource Entry Needed!**
> The integration automatically registers the card at `/fortnite_activity_static/fortnite-activity-card.js` using Home Assistant's `add_extra_js_url` hook during setup.
> 
> If you prefer manual resource management:
> 1. Copy [`frontend/dist/fortnite-activity-card.js`](../frontend/dist/fortnite-activity-card.js) to `/config/www/fortnite-activity-card.js`.
> 2. Add resource `/local/fortnite-activity-card.js` (JavaScript Module) in **Settings** → **Dashboards** → **⋮** → **Resources**.

---

## 4. Configuration via Home Assistant UI

1. Open **Settings** → **Devices & Services**.
2. Click **Add Integration** (bottom right).
3. Search for **Fortnite Activity Tracker** and select it.
4. Fill in the configuration dialog:
   - **api-fortnite.com API Key**: Paste your Pro API key.
   - **Player Identifier**: `player1`
   - **Player Display Name**: `Player One`
   - **Epic Games Account ID**: Paste your Epic Account ID.
5. Click **Submit**.

Home Assistant will create the integration entry and automatically instantiate all sensors and the binary sensor for that player.

### Configuring Polling Options (Optional)
On the **Fortnite Activity Tracker** card in Devices & Services, click **Configure**:
- **Active Polling Interval**: Default `90` seconds (polling rate while playing).
- **Idle Polling Interval**: Default `1800` seconds / 30 minutes (polling rate when idle).
- **Inactivity Timeout**: Default `20` minutes (grace period before automatically ending and archiving a session).

---

## 5. Adding the Card to Your Dashboard

### Using the Visual Editor (GUI)
1. Open your dashboard (e.g. your office tablet dashboard).
2. Click **Edit Dashboard** (top right) → **Add Card**.
3. Search for **Fortnite Activity Card**.
4. The visual editor opens with options:
   - **Tracked Player Key**: `player1`
   - **Card Layout**: Select `Adaptive (Session when playing, Recap when idle)`.
   - **Visual Theme**: Select `Bubble Card (Sleek pill badges & theme vars)`.
   - **Accent Tint**: `Inherit Theme Accent` (or select `Victory Gold`, `Slurp Cyan`, `Storm Purple`).
   - **Show Match Timeline**: Toggle on/off.
   - **Show Quick Action Sub-Buttons**: Toggle on/off.
   - **Max Matches in Feed**: Slider (e.g. 10).
5. Click **Save**.

### YAML Configuration (Bubble Card Integration)

#### Standalone Card in a Section or View
```yaml
type: custom:fortnite-activity-card
player: player1
layout: auto
card_style: bubble
theme_accent: auto
show_match_feed: true
show_sub_buttons: true
max_feed_matches: 10
```

#### Inside a Bubble Card Pop-up (e.g. Room Pop-up / Gaming View)
```yaml
type: vertical-stack
cards:
  - type: custom:bubble-card
    card_type: pop-up
    hash: "#fortnite-activity"
    name: Fortnite Tracker
    icon: mdi:controller
  - type: custom:fortnite-activity-card
    player: player1
    layout: auto
    card_style: bubble
    theme_accent: auto
```

---

## 6. Live Testing & Verification Checklist

Follow this checklist to verify that everything works as expected:

### Step 1: Baseline Entity Verification
Go to **Developer Tools** → **States** in Home Assistant and search for `fortnite_player1`:
- `sensor.fortnite_player1_overall_stats`: State should show total matches (e.g. `415`), with attributes for kills, wins, K/D, win rate, and modes breakdown.
- `sensor.fortnite_player1_current_session`: State should be `idle`.
- `sensor.fortnite_player1_rank_battle_royale`: State should show your rank (e.g. `Champion I`), with `progress_pct` (e.g. `8.0`).
- `sensor.fortnite_player1_rank_reload`: State should show your reload rank (e.g. `Elite III`), with `progress_pct` (`71.0`).
- `sensor.fortnite_player1_level`: State should show season level (e.g. `214`).
- `binary_sensor.fortnite_player1_playing`: State should be `off`.

### Step 2: Visual Card Check
Inspect your dashboard card:
- Check that the header shows your initial avatar `DE`, your name, and level badge (`Lvl 214`).
- Status pill should show `IDLE`.
- Sub-buttons bar should render Bubble Card pill buttons: `Last Session`, `Career Stats`, `Start Session`, `Refresh`.
- Click `Career Stats` tab: Verify that the mode switcher (`All`, `Zero Build`, `Battle Royale`, `Reload`) works and updates the KPI chips.
- Verify that the rank progression bars display your rank and percentage correctly.

### Step 3: Live Gaming Session Test
1. Launch Fortnite on your PC and play a match (Solo, Duos, or Zero Build).
2. When the match ends and you return to the lobby or exit:
   - Within 90–120 seconds, `api-fortnite.com` updates stats.
   - The integration detects the match increment!
   - `binary_sensor.fortnite_player1_playing` turns `on`.
   - The card status pill switches to pulsing cyan `● LIVE • 15m`.
   - A new **Game 1** card appears in the Match Feed:
     - Shows mode name (e.g. *Zero Build Duos*).
     - Shows placement: **Victory Royale 🏆** (if you won!) or your Top bracket.
     - Shows kills badge with skull icon and exact kills from that game.
     - Shows rank delta (e.g. `+5%`).
   - Session KPI chips update (Matches: 1, Kills: X, KD: Y).

### Step 4: Sub-Button Action Testing
- Click the **Refresh** sub-button on the card: verify in HA logs that `coordinator.async_request_refresh()` was called.
- Click **End Session**: verify that the session transitions from `LIVE` to `IDLE` and the recap summary is preserved.
- Click **Start Session**: verify that a fresh session baseline is established.

### Step 5: Automated Test Suite Verification
Run the 10 automated unit tests locally:
```bash
py -3 -m unittest discover -s tests/unit
```
Expected output:
```text
..........
----------------------------------------------------------------------
Ran 10 tests in 0.051s

OK
```

---

## 7. Troubleshooting

| Symptom | Cause | Solution |
|---------|-------|----------|
| `invalid_auth` on setup | Incorrect `api-fortnite.com` key | Check `API_FORTNITE_KEY` in your environment and paste without extra spaces. |
| `player_not_found` on setup | Account ID does not exist in API | Verify your Epic Games Account ID (32-character hex ID). |
| Custom card not showing up | Browser cache | Hard-refresh your browser (`Ctrl+F5` or clear cache). If needed, add `/local/fortnite-activity-card.js` manually to Lovelace Resources. |
| Card colors don't match theme | Theme variable override | Set `theme_accent: auto` in the card editor to inherit your dashboard theme accent. |
| Match update took >2 minutes | Upstream flush delay | Fortnite backend flushes stats 1–3 minutes after match exit. You can click the **Refresh** button on the card to force an immediate poll. |
