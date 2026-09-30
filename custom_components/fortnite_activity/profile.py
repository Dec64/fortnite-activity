"""Derived player-profile metrics and parsers for catalogue/profile endpoints.

Everything here is pure (no I/O) so it can be unit tested with synthetic data.
Parsers for untyped endpoints (account, externalAuths) accept several shapes
and return None/[] rather than raising when the shape is unexpected.
"""

from __future__ import annotations

from datetime import datetime, timezone
import re
from typing import Any

from .const import MODE_OTHER

TEAM_SIZES = ("solo", "duo", "trio", "squad")
INPUT_LABELS = {"keyboardmouse": "Keyboard & Mouse", "gamepad": "Controller", "touch": "Touch"}
PLATFORM_LABELS = {
    "psn": "PlayStation",
    "xbl": "Xbox",
    "nintendo": "Nintendo",
    "steam": "Steam",
    "github": "GitHub",
    "twitch": "Twitch",
}
_TEAM_SIZE_RE = {size: re.compile(rf"{size}s?(?![a-z])") for size in TEAM_SIZES}


def _ratio(numerator: float, denominator: float, digits: int = 2) -> float:
    return round(numerator / denominator, digits) if denominator else 0.0


def _pct(numerator: float, denominator: float) -> float:
    return round(numerator / denominator * 100, 1) if denominator else 0.0


def team_size(playlist_id: str) -> str | None:
    """Infer team size from a playlist identifier (e.g. nobuildbr_duo -> duo)."""
    lower = playlist_id.lower()
    for size, pattern in _TEAM_SIZE_RE.items():
        if pattern.search(lower):
            return size
    return None


def _summary(matches: int, wins: int, kills: int) -> dict[str, Any]:
    return {
        "matches": matches,
        "wins": wins,
        "kills": kills,
        "kd": _ratio(kills, max(1, matches - wins)) if matches else 0.0,
        "win_rate": _pct(wins, matches),
    }


def _timestamp(value: int) -> datetime | None:
    """Convert a stats lastmodified value (epoch seconds, occasionally ms) to UTC."""
    if not value or value <= 0:
        return None
    if value > 10_000_000_000:  # milliseconds
        value //= 1000
    try:
        return datetime.fromtimestamp(value, tz=timezone.utc)
    except (OverflowError, OSError, ValueError):
        return None


def compute_metrics(parsed_stats: dict[str, Any]) -> dict[str, Any]:
    """Compute derived metrics from parse_stats() output."""
    overall = parsed_stats.get("overall", {})
    playlists: dict[str, dict[str, Any]] = parsed_stats.get("playlists", {})
    matches = overall.get("matches", 0)
    minutes = overall.get("minutes", 0)
    kills = overall.get("kills", 0)

    # Team-size breakdown across Battle Royale-style playlists (excludes creative/other)
    sizes = {size: {"matches": 0, "wins": 0, "kills": 0} for size in TEAM_SIZES}
    solo_matches = solo_top10 = solo_top25 = 0
    favourite: dict[str, Any] | None = None
    last_played: tuple[datetime, dict[str, Any]] | None = None

    for pid, p in playlists.items():
        ts = _timestamp(p.get("last_modified", 0))
        if ts and (last_played is None or ts > last_played[0]):
            last_played = (ts, p)
        if p.get("mode") == MODE_OTHER:
            continue
        size = team_size(pid)
        if size:
            for key in ("matches", "wins", "kills"):
                sizes[size][key] += p.get(key, 0)
        if size == "solo":
            # Only solo playlists report Top 10 / Top 25 placements
            solo_matches += p.get("matches", 0)
            solo_top10 += p.get("top10", 0)
            solo_top25 += p.get("top25", 0)
        if p.get("matches", 0) and (favourite is None or p["matches"] > favourite["matches"]):
            favourite = {"playlist_id": pid, "name": p.get("name", pid), "matches": p["matches"]}

    inputs = {}
    for key, bucket in (parsed_stats.get("inputs") or {}).items():
        inputs[key] = {
            "label": INPUT_LABELS.get(key, key.title()),
            **_summary(bucket.get("matches", 0), bucket.get("wins", 0), bucket.get("kills", 0)),
            "hours_played": round(bucket.get("minutes", 0) / 60, 1),
            "share_pct": _pct(bucket.get("matches", 0), matches),
        }

    return {
        "hours_played": round(minutes / 60, 1),
        "kills_per_match": _ratio(kills, matches),
        "kills_per_minute": _ratio(kills, minutes, 3),
        "avg_match_minutes": _ratio(minutes, matches, 1),
        "score_per_match": round(overall.get("score", 0) / matches) if matches else 0,
        "solo_top10_rate": _pct(solo_top10, solo_matches),
        "solo_top25_rate": _pct(solo_top25, solo_matches),
        "favourite_mode": favourite,
        "last_played": (
            {
                "time": last_played[0].isoformat(),
                "playlist_id": last_played[1].get("playlist_id"),
                "name": last_played[1].get("name"),
            }
            if last_played
            else None
        ),
        "team_sizes": {size: _summary(**v) for size, v in sizes.items() if v["matches"]},
        "inputs": inputs,
    }


def compute_window(parsed_stats: dict[str, Any]) -> dict[str, Any]:
    """Compact metrics for a time-windowed stats response."""
    overall = parsed_stats.get("overall", {})
    metrics = compute_metrics(parsed_stats)
    return {
        **_summary(overall.get("matches", 0), overall.get("wins", 0), overall.get("kills", 0)),
        "players_outlived": overall.get("players_outlived", 0),
        "hours_played": metrics["hours_played"],
        "kills_per_match": metrics["kills_per_match"],
        "avg_match_minutes": metrics["avg_match_minutes"],
        "favourite_mode": metrics["favourite_mode"],
        "modes": parsed_stats.get("modes", {}),
    }


def window_is_valid(raw: dict[str, Any], requested_start: int, window_matches: int, lifetime_matches: int) -> bool:
    """Decide whether the API actually applied a startTime filter.

    Trust an echoed startTime; otherwise reject a window whose total equals a
    non-zero lifetime total (the parameter was most likely ignored).
    """
    echoed = raw.get("startTime") if isinstance(raw, dict) else None
    if isinstance(echoed, (int, float)):
        return int(echoed) == int(requested_start)
    return not (lifetime_matches > 0 and window_matches >= lifetime_matches)


def _parse_iso(value: Any) -> datetime | None:
    if not isinstance(value, str) or not value:
        return None
    text = value.strip().replace("Z", "+00:00")
    # Trim 7-digit fractional seconds (.0000000) that fromisoformat rejects on older Pythons
    text = re.sub(r"(\.\d{6})\d+", r"\1", text)
    try:
        parsed = datetime.fromisoformat(text)
    except ValueError:
        return None
    return parsed if parsed.tzinfo else parsed.replace(tzinfo=timezone.utc)


def parse_season(raw: dict[str, Any], now: datetime) -> dict[str, Any] | None:
    """Parse /v1/season (SeasonEntryDto)."""
    begin = _parse_iso(raw.get("seasonDateBegin"))
    end = _parse_iso(raw.get("seasonDateEnd"))
    if not begin or not end:
        return None
    total = (end - begin).total_seconds()
    return {
        "number": raw.get("seasonNumber"),
        "begin": begin.isoformat(),
        "end": end.isoformat(),
        "days_left": max(0, (end - now).days),
        "progress_pct": _pct(max(0.0, (now - begin).total_seconds()), total) if total > 0 else 0.0,
    }


def normalise_playlist_id(name: str) -> str:
    """Map catalogue names (Playlist_DefaultSolo) to stats ids (defaultsolo)."""
    lower = name.lower()
    return lower[len("playlist_"):] if lower.startswith("playlist_") else lower


def parse_playlists(raw: Any) -> dict[str, dict[str, Any]]:
    """Parse /v2/playlists into {stats_playlist_id: {name, description, image}}."""
    items = raw
    if isinstance(raw, dict):
        items = raw.get("playlists") or raw.get("data") or []
    catalogue: dict[str, dict[str, Any]] = {}
    for item in items if isinstance(items, list) else []:
        if not isinstance(item, dict) or not item.get("playlist_name"):
            continue
        catalogue[normalise_playlist_id(item["playlist_name"])] = {
            "name": item.get("display_name"),
            "description": item.get("description"),
            "image": item.get("image") or None,
        }
    return catalogue


def parse_display_name(raw: Any) -> str | None:
    """Parse /v1/account/{id} (untyped): accept an object or a one-item list."""
    if isinstance(raw, list):
        raw = raw[0] if raw else None
    if isinstance(raw, dict):
        for key in ("displayName", "display_name", "epicDisplayName"):
            if isinstance(raw.get(key), str) and raw[key]:
                return raw[key]
        data = raw.get("data")
        if isinstance(data, (dict, list)):
            return parse_display_name(data)
    return None


def parse_external_auths(raw: Any) -> list[dict[str, str]]:
    """Parse /v1/account/{id}/externalAuths (untyped): list or dict keyed by type."""
    if isinstance(raw, dict) and isinstance(raw.get("externalAuths"), (dict, list)):
        raw = raw["externalAuths"]
    elif isinstance(raw, dict) and isinstance(raw.get("data"), (dict, list)):
        raw = raw["data"]
    entries: list[tuple[str | None, Any]] = []
    if isinstance(raw, dict):
        entries = list(raw.items())
    elif isinstance(raw, list):
        entries = [(None, item) for item in raw]

    platforms = []
    for key, item in entries:
        if not isinstance(item, dict):
            continue
        auth_type = str(item.get("type") or item.get("externalAuthType") or key or "").lower()
        if not auth_type:
            continue
        name = item.get("externalDisplayName") or item.get("displayName")
        if not name:
            ids = item.get("authIds")
            if isinstance(ids, list) and ids and isinstance(ids[0], dict):
                name = ids[0].get("id") if auth_type == "nintendo" else None
        platforms.append({
            "type": auth_type,
            "label": PLATFORM_LABELS.get(auth_type, auth_type.title()),
            "name": name if isinstance(name, str) else None,
        })
    return platforms


def parse_tournaments(raw: Any, region: str, now: datetime, limit: int = 12) -> list[dict[str, Any]]:
    """Upcoming/live tournament windows for one region from /v1/events/global (GlobalEventDto)."""
    windows: list[dict[str, Any]] = []
    seen: set[str] = set()
    for event in raw if isinstance(raw, list) else []:
        if not isinstance(event, dict):
            continue
        regions = event.get("regions") if isinstance(event.get("regions"), dict) else {}
        for regional in regions.get(region) or []:
            if not isinstance(regional, dict):
                continue
            for window in regional.get("eventWindows") or []:
                if not isinstance(window, dict):
                    continue
                begin = _parse_iso(window.get("beginTime"))
                end = _parse_iso(window.get("endTime"))
                window_id = window.get("eventWindowId")
                if not begin or not end or end <= now or not window_id or window_id in seen:
                    continue
                seen.add(window_id)
                windows.append({
                    "window_id": window_id,
                    "event_id": regional.get("eventId"),
                    "name": event.get("name") or event.get("titleLine1") or event.get("shortTitle") or window_id,
                    "subtitle": event.get("titleLine2") or event.get("shortTitle"),
                    "description": event.get("detailsDescription") or event.get("description"),
                    "poster": event.get("poster") or None,
                    "loading_screen": event.get("loadingScreen") or None,
                    "round": window.get("round"),
                    "begin": begin.isoformat(),
                    "end": end.isoformat(),
                    "is_live": begin <= now < end,
                    "platforms": regional.get("platforms") or [],
                })
    windows.sort(key=lambda w: w["begin"])
    return windows[:limit]
