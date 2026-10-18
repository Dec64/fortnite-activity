# Fortnite Activity Tracker: installation, setup and testing

This guide covers installing the integration, adding players, putting the cards on a dashboard and checking that everything works. For a feature overview, see the [README](../README.md).

## 1. Prerequisites

- Home Assistant 2024.1 or newer.
- An api-fortnite.com **Pro** API key.
- For each player: their Epic Games account ID, or the ability to sign in to their Epic account (recommended).
- **Public Game Stats** turned on in each player's Epic account. Without it, the stats routes return HTTP 403 and the integration raises a `stats_private` repair notice.

## 2. Install

### HACS
1. Open **HACS** → **⋮** → **Custom repositories**.
2. Add `https://github.com/Dec64/fortnite-activity` with category **Integration**.
3. Find **Fortnite Activity Tracker**, click **Download**, then restart Home Assistant.

Later releases appear as updates in HACS. After updating, restart Home Assistant and hard-refresh the browser.

### Manual
Copy `custom_components/fortnite_activity` into `/config/custom_components/` and restart Home Assistant.

### Cards
The integration serves and auto-loads both card files:

- `/fortnite_activity_static/fortnite-activity-card.js` provides `fortnite-activity-card`, `fortnite-family-panel` and the visual editor.
- `/fortnite_activity_static/fortnite-family-page.js` provides `household-fortnite-page-card`.

Don't add these as dashboard resources as well. If an old copy of either card is registered as a resource (for example from `/config/www`), remove it so only the integration's version loads.

## 3. Configure

1. Go to **Settings** → **Devices & Services** → **Add Integration** → **Fortnite Activity Tracker**.
2. Enter the API key, then the first player's identifier (for example `player1`), display name and Epic account ID.

Then click **Configure** on the integration:

| Menu item | What it does |
|-----------|--------------|
| Polling, session and tournament settings | Polling while playing (90 s), polling when idle (1800 s), minutes without a match before a session ends (35), tournament region (EU) |
| Add a player | **Sign in with Epic:** open the link, sign in as that player and submit; the account ID and Epic name are read from the sign-in. Or **enter the account ID** and link Epic later |
| Remove a player | Removes the player and their entities |
| Link or re-link Epic | Adds Epic data (level, V-Bucks, Sprites, locker, Power Ranking) to an existing player, or replaces a sign-in Epic no longer accepts |
| Unlink Epic | Removes the stored Epic link for a player |

Use a private browser window for Epic sign-in if the browser is already signed in to another Epic account.

## 4. Add the cards

- **Fortnite Activity Card:** use **Add Card** → **Fortnite Activity Card**, and pick the player, sections, header, theme and accent in the visual editor.
- **Family panel:** add `type: custom:fortnite-family-panel` to a view of type **panel**.
- **Fortnite Family page:** add `type: custom:household-fortnite-page-card` to a full-width section. See [family-page.md](family-page.md) for its options.

YAML examples for each card are in the [README](../README.md#dashboard-cards).

## 5. Check it works

1. **Entities:** in **Developer Tools** → **States**, search `fortnite_player1`:
   - `sensor.fortnite_player1_overall_stats` should show lifetime matches.
   - `..._current_session` should be `idle`.
   - The `..._rank_*` sensors should show rank names.
   - `..._level` should show the season level once Epic is linked.
   - `binary_sensor.fortnite_player1_playing` should be `off`.
2. **Cards:** open each section. Tournaments, the shop and the map should load within a few seconds; the Family page loads them in the background after it opens.
3. **Live session:** play a match. Within about 2 minutes of returning to the lobby (stats reach the provider 1–3 minutes after a match), `binary_sensor.fortnite_player1_playing` turns `on`, the card shows **Live**, and a tile for **Game 1** appears with the mode, placement and eliminations. **Refresh** on the card polls immediately.
4. **Session end:** 35 minutes after the last match (or with **End session**), the session is archived and stays visible as the last session.
5. **Automated tests:** from the repository root, run:
   ```bash
   python -m pytest -q tests
   ```
   The current suite has 69 passing tests (3 are skipped when the Home Assistant package isn't installed).

## 6. Troubleshooting

| Symptom | Likely cause | What to do |
|---------|--------------|------------|
| `invalid_auth` during setup | API key wrong or not Pro | Paste the key again without spaces |
| `player_not_found` during setup | Wrong account ID | Use the 32-character Epic account ID, or add the player with Epic sign-in |
| `stats_private` repair notice | Public Game Stats is off for that account | Turn it on in the player's Epic account settings; the notice clears on the next update |
| `epic_relink` repair notice | Epic stopped accepting the saved sign-in | **Configure** → **Link or re-link Epic** |
| Sprites stay unavailable for one player | Epic refuses the provider's token exchange for that account (seen on a restricted child account) | Not fixable from Home Assistant; other data still works |
| Card missing or old after an update | Browser cache | Hard-refresh; remove any old copy of the card registered as a dashboard resource |
| A new game took more than 2 minutes to appear | The provider receives stats 1–3 minutes after a match | Press **Refresh** on the card |
