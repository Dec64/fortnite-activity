# Season calendar

`custom_components/fortnite_activity/season_calendar.py` holds a sourced list of Battle Royale seasons
(number, display name, start day, end day, source URL). The card uses it for the "every season so far" view.

## Bounds

- `begin` is inclusive and `end` is exclusive. Both are UTC day boundaries (`precision: "day"`), not exact
  server cutover times, which Epic rarely publishes in advance.
- When the provider (api-fortnite.com) reports a season's exact timestamps, they replace the calendar row
  (`precision: "timestamp"`) and are archived in storage (`season_catalogue`) so they survive restarts.

## Conflicts

If a reported start or end differs from the calendar by more than one day, the calendar dates are kept
and the row is marked `date_conflict: true` with `reported_begin` / `reported_end`, so an unverified
provider value can never silently rewrite history.

## Sources

Each row carries its source URL. Official fortnite.com pages are used where they give dates; otherwise
Dot Esports and GGSeason season-date round-ups. Update the newest row when Epic announces the next season.
