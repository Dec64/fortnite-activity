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


REGION_GROUPS = {"EU": "EU", "NAE": "NA", "NAC": "NA", "NAW": "NA", "BR": "BR", "ASIA": "ASIA", "OCE": "OCE", "ME": "ME"}
_CONSOLE_PLATFORMS = {"PS4", "PS5", "XB1", "XboxOne", "XboxOneGDK", "XSX", "Switch", "Switch2"}
_PC_PLATFORMS = {"Windows", "Mac"}
_MOBILE_PLATFORMS = {"IOS", "Android"}
_ROUND_RE = re.compile(r"Round(\d+)", re.IGNORECASE)


def classify_event(text: str) -> dict[str, str | None]:
    """Mode and team-size tags taken only from Epic's own event names/ids (None when not stated)."""
    lower = text.lower()
    if "reload" in lower:
        mode = "Reload"
    elif re.search(r"zero ?build|nobuild|(?<![a-z])zb(?![a-z])", lower):
        mode = "Zero Build"
    elif "battle royale" in lower or "(br)" in lower:
        mode = "Battle Royale"
    else:
        mode = None
    team = None
    for size, label in (("solo", "Solo"), ("duo", "Duos"), ("trio", "Trios"), ("squad", "Squads")):
        if size in lower:
            team = label
            break
    return {"mode": mode, "team": team, "ranked": "ranked" in lower}


def platform_groups(name: str, platforms: list[str]) -> list[str]:
    """Group Epic platform codes into PC / Console / Mobile (name restrictions take precedence)."""
    lower = name.lower()
    for label in ("Console", "Mobile", "PC"):
        if re.search(rf"(?<![a-z]){label.lower()}(?![a-z])", lower):
            return [label]
    codes = set(platforms or [])
    groups = []
    if codes & _PC_PLATFORMS:
        groups.append("PC")
    if codes & _CONSOLE_PLATFORMS:
        groups.append("Console")
    if codes & _MOBILE_PLATFORMS:
        groups.append("Mobile")
    return groups


def _window_label(window_id: str) -> str | None:
    if re.search(r"final", window_id, re.IGNORECASE):
        return "Final"
    match = _ROUND_RE.search(window_id)
    return f"Round {match.group(1)}" if match else None


def parse_tournaments(
    raw: Any, now: datetime, horizon_days: int = 14, recent_hours: int = 12, per_region_limit: int = 40
) -> list[dict[str, Any]]:
    """Tournaments across all regions from /v1/events/global (GlobalEventDto).

    Each regional event lists its session windows that are live, upcoming within
    horizon_days, or finished within recent_hours (so recent leaderboards stay reachable).
    """
    horizon = now.timestamp() + horizon_days * 86400
    recent = now.timestamp() - recent_hours * 3600
    events: list[dict[str, Any]] = []
    for event in raw if isinstance(raw, list) else []:
        if not isinstance(event, dict):
            continue
        name = event.get("name") or event.get("titleLine1") or event.get("shortTitle")
        regions = event.get("regions") if isinstance(event.get("regions"), dict) else {}
        for region, regionals in regions.items():
            for regional in regionals or []:
                if not isinstance(regional, dict) or not regional.get("eventId"):
                    continue
                windows = []
                for window in regional.get("eventWindows") or []:
                    if not isinstance(window, dict) or not window.get("eventWindowId"):
                        continue
                    begin = _parse_iso(window.get("beginTime"))
                    end = _parse_iso(window.get("endTime"))
                    if not begin or not end or end.timestamp() < recent or begin.timestamp() > horizon:
                        continue
                    windows.append({
                        "window_id": window["eventWindowId"],
                        "can_spectate": bool(window.get("canLiveSpectate")),
                        "label": _window_label(window["eventWindowId"]),
                        "begin": begin.isoformat(),
                        "end": end.isoformat(),
                        "is_live": begin <= now < end,
                        "finished": end <= now,
                    })
                if not windows:
                    continue
                windows.sort(key=lambda w: w["begin"])
                upcoming = [w for w in windows if not w["finished"]]
                tags_text = " ".join(str(x) for x in (name, event.get("titleLine2"), regional.get("eventId")) if x)
                platforms = regional.get("platforms") or []
                events.append({
                    "key": f"{regional['eventId']}",
                    "event_id": regional["eventId"],
                    "region": region,
                    "region_group": REGION_GROUPS.get(region, region),
                    "name": name or regional["eventId"],
                    "subtitle": event.get("titleLine2") or event.get("shortTitle"),
                    "description": event.get("detailsDescription") or event.get("description"),
                    "schedule_info": event.get("scheduleInfo"),
                    "poster": event.get("poster") or None,
                    "loading_screen": event.get("loadingScreen") or None,
                    "platform_groups": platform_groups(name or "", platforms),
                    # Epic's own classification fields (values recorded in diagnostics before any UI use)
                    "tournament_type": (regional.get("metadata") or {}).get("tournamentType"),
                    "event_group": regional.get("eventGroup"),
                    "min_account_level": (regional.get("metadata") or {}).get("minimumAccountLevel"),
                    "can_spectate": any(w.get("can_spectate") for w in windows),
                    **classify_event(tags_text),
                    "is_live": any(w["is_live"] for w in windows),
                    "finished": not upcoming,
                    "next": upcoming[0] if upcoming else windows[-1],
                    "windows": windows,
                })
    # Live first, then soonest upcoming, then most recently finished
    events.sort(key=lambda e: (0 if e["is_live"] else 1 if not e["finished"] else 2,
                               e["next"]["begin"] if not e["finished"] else "~" + e["next"]["end"]))
    # Cap per region group so busy regions (NA has three server regions) cannot crowd out others
    counts: dict[str, int] = {}
    capped = []
    for event in events:
        group = event["region_group"]
        counts[group] = counts.get(group, 0) + 1
        if counts[group] <= per_region_limit:
            capped.append(event)
    return capped


def parse_leaderboard(raw: Any, account_id: str | None = None, limit: int = 10) -> dict[str, Any] | None:
    """Parse an event-window leaderboard page (entries with sessionHistory.trackedStats)."""
    if not isinstance(raw, dict):
        return None
    entries = raw.get("entries") if isinstance(raw.get("entries"), list) else []

    def summarise(entry: dict[str, Any]) -> dict[str, Any]:
        sessions = [s for s in entry.get("sessionHistory") or [] if isinstance(s, dict)]
        stats = [s.get("trackedStats") or {} for s in sessions]
        placements = [st.get("PLACEMENT_STAT_INDEX") for st in stats if isinstance(st.get("PLACEMENT_STAT_INDEX"), int)]
        names = entry.get("teamAccountDisplayNames") or []
        return {
            "rank": entry.get("rank"),
            "points": entry.get("pointsEarned"),
            "percentile": entry.get("percentile"),
            "names": [n for n in names if isinstance(n, str)],
            "matches": len(sessions),
            "wins": sum(int(st.get("VICTORY_ROYALE_STAT") or 0) for st in stats),
            "elims": sum(int(st.get("TEAM_ELIMS_STAT_INDEX") or 0) for st in stats),
            "best_placement": min(placements) if placements else None,
            "is_player": bool(account_id and account_id in str(entry.get("teamId") or "")),
        }

    parsed = [summarise(e) for e in entries if isinstance(e, dict)]
    return {
        "page": raw.get("page"),
        "total_pages": raw.get("totalPages"),
        "updated": raw.get("updatedTime"),
        "entries": parsed[:limit],
        "player": next((e for e in parsed if e["is_player"]), None),
    }


# ---- Player-token data (sprites, power rankings) ----------------------------
# Field names follow the provider's OpenAPI DTOs (SpriteCollectionResponseDto,
# AllSpriteCollectionsResponseDto, SpritesResponseDto, SpriteImagesDto). The earlier
# sanitized evidence used its own summary labels ("families", "versionSummaries").


def _unwrap(raw: Any) -> Any:
    """api-fortnite wraps many payloads in {"data": ...}."""
    if isinstance(raw, dict) and "data" in raw and not {"sprites", "ownedVariants", "rank"} & set(raw):
        return raw["data"]
    return raw


def _images(item: dict[str, Any]) -> tuple[str | None, str | None]:
    """(icon, iconLarge) from a SpriteImagesDto."""
    images = item.get("images") if isinstance(item.get("images"), dict) else {}
    icon = images.get("icon") if isinstance(images.get("icon"), str) else None
    large = images.get("iconLarge") if isinstance(images.get("iconLarge"), str) else None
    return icon or large, large or icon


def parse_sprite_versions(raw: Any) -> str | None:
    """Current sprite game version from /v2/sprites/versions (SpriteVersionDto[])."""
    data = _unwrap(raw)
    items = data.get("versions") if isinstance(data, dict) else data
    for item in items if isinstance(items, list) else []:
        if isinstance(item, dict) and item.get("isCurrent") and item.get("version"):
            return str(item["version"])
    return None


def parse_sprite_catalogue(raw: Any) -> dict[str, Any] | None:
    """Public sprite catalogue (/v2/sprites): per-family hints/boons and the level-up curve."""
    data = _unwrap(raw)
    if not isinstance(data, dict) or not isinstance(data.get("sprites"), list):
        return None
    families = {}
    for fam in data["sprites"]:
        if not isinstance(fam, dict) or not fam.get("id"):
            continue
        icon, large = _images(fam)
        families[fam["id"]] = {
            "boons": _boon_refs(fam.get("boons")),
            "variant_boons": {
                v.get("id"): _boon_refs(v.get("boons"))
                for v in fam.get("variants") or []
                if isinstance(v, dict) and v.get("id")
            },
            "hint": fam.get("acquisitionHint"),
            "description": fam.get("description"),
            "spawn_chance_pct": fam.get("spawnChancePercent"),
            "icon": icon,
            "icon_large": large,
        }
    curve = sorted(
        (
            (int(e["level"]), float(e["xp"]))
            for e in data.get("levelUpCurve") or []
            if isinstance(e, dict) and isinstance(e.get("level"), (int, float)) and isinstance(e.get("xp"), (int, float))
        ),
    )
    # Only trust the curve if XP thresholds increase with level (cumulative thresholds)
    monotonic = all(b[1] >= a[1] for a, b in zip(curve, curve[1:]))
    raw_curve = [
        {"level": e.get("level"), "xp": e.get("xp")}
        for e in data.get("levelUpCurve") or []
        if isinstance(e, dict)
    ]
    return {
        "version": data.get("gameVersion"),
        "families": families,
        "level_curve": curve if monotonic else [],
        # As returned (order and values untouched) so the card can derive levels once the semantics are confirmed
        "level_curve_raw": raw_curve,
    }


def _boon_refs(raw: Any) -> list[dict[str, Any]]:
    """SpriteBoonRefDto[] -> [{id, chance}] (also accepts plain id strings)."""
    refs = []
    for item in raw if isinstance(raw, list) else []:
        if isinstance(item, dict) and item.get("id"):
            refs.append({"id": item["id"], "chance": item.get("chance")})
        elif isinstance(item, str):
            refs.append({"id": item, "chance": None})
    return refs


def parse_sprite_boons(raw: Any) -> dict[str, dict[str, Any]]:
    """/v2/sprites/boons (SpriteBoonDto[]) -> {id: {name, description}}."""
    data = _unwrap(raw)
    items = data.get("boons") if isinstance(data, dict) else data
    return {
        b["id"]: {"name": b.get("name"), "description": b.get("description")}
        for b in (items if isinstance(items, list) else [])
        if isinstance(b, dict) and b.get("id")
    }


def variant_label(variant_name: str | None, family_name: str | None, code: str | None) -> str:
    """Readable variant label: 'Cheat Master Jonesy Sprite' minus 'Jonesy Sprite' -> 'Cheat Master'."""
    if code in (None, "", "Base", "A"):
        return "Base"
    name = (variant_name or "").strip()
    family = (family_name or "").strip()
    if family and name.endswith(family) and len(name) > len(family):
        return name[: -len(family)].strip()
    base = family.replace(" Sprite", "")
    words = [w for w in name.replace(" Sprite", "").split() if w not in base.split()]
    return " ".join(words) or re_split_camel(code)


def re_split_camel(code: str | None) -> str:
    return re.sub(r"(?<=[a-z])(?=[A-Z])", " ", code or "").strip()


def sprite_level(xp: Any, curve: list[tuple[int, float]]) -> int | None:
    """Derived sprite level: highest curve level whose cumulative XP threshold has been reached."""
    if not isinstance(xp, (int, float)) or not curve:
        return None
    level = None
    for lvl, threshold in curve:
        if xp >= threshold:
            level = lvl
    return level


def _parse_collection_body(
    data: dict[str, Any], catalogue: dict[str, Any] | None, boons: dict[str, dict[str, Any]] | None = None
) -> dict[str, Any]:
    cat_families = (catalogue or {}).get("families", {})
    boons = boons or {}

    def named_boons(refs: list[dict[str, Any]]) -> list[dict[str, Any]]:
        out = []
        for ref in refs:
            info = boons.get(ref["id"])
            if info and info.get("name"):
                out.append({"name": info["name"], "description": info.get("description"), "chance": ref.get("chance")})
        return out
    families = []
    for fam in data.get("sprites") or []:
        if not isinstance(fam, dict):
            continue
        variants = [v for v in fam.get("variants") or [] if isinstance(v, dict)]
        extra = cat_families.get(fam.get("id"), {})
        icon, large = _images(fam)
        parsed_variants = []
        for v in variants:
            v_icon, v_large = _images(v)
            parsed_variants.append({
                "id": v.get("id"),
                "name": v.get("name"),
                "variant": v.get("variant"),
                "label": variant_label(v.get("name"), fam.get("name"), v.get("variant")),
                "rarity": v.get("rarity"),
                "owned": bool(v.get("owned")),
                "count": v.get("count") or 0,
                "xp": v.get("xp"),
                "mastered": bool(v.get("mastered")),
                "drop_chance_pct": v.get("dropChancePercent"),
                "boons": named_boons((extra.get("variant_boons") or {}).get(v.get("id"), [])),
                "icon": v_icon or icon or extra.get("icon"),
                "icon_large": v_large if v_large and v_large != v_icon else None,
            })
        families.append({
            "id": fam.get("id"),
            "name": fam.get("name"),
            "description": fam.get("description") or extra.get("description"),
            "hint": extra.get("hint"),
            "boons": named_boons(extra.get("boons", [])),
            "spawn_chance_pct": extra.get("spawn_chance_pct"),
            "rarity": fam.get("rarity"),
            "dex": fam.get("dexNumber"),
            "owned": bool(fam.get("owned")),
            "owned_variants": sum(1 for v in parsed_variants if v["owned"]),
            "total_variants": len(parsed_variants),
            "mastered": sum(1 for v in parsed_variants if v["mastered"]),
            "complete": bool(parsed_variants) and all(v["owned"] for v in parsed_variants),
            "icon": icon or extra.get("icon"),
            "icon_large": large or extra.get("icon_large"),
            "variants": parsed_variants,
        })
    families.sort(key=lambda f: (f["dex"] is None, f["dex"] or 0, f["name"] or ""))
    tidy_variant_labels(families)
    equipped_id = data.get("equippedVariant")
    equipped = next(
        ({"family": f["name"], "variant": v["name"], "icon": v["icon"]}
         for f in families for v in f["variants"] if equipped_id and v["id"] == equipped_id),
        None,
    )
    return {
        "version": data.get("gameVersion"),
        "is_current": data.get("isCurrent"),
        "owned_variants": data.get("ownedVariants", 0),
        "total_variants": data.get("totalVariants", 0),
        "owned_families": data.get("ownedFamilies", 0),
        "total_families": data.get("totalFamilies", 0),
        "completion_pct": data.get("completionPercent", 0),
        "mastered_variants": sum(f["mastered"] for f in families),
        "complete_families": sum(1 for f in families if f["complete"]),
        "equipped": equipped,
        "currency": [
            {"item": c.get("item"), "count": c.get("count")}
            for c in data.get("currency") or []
            if isinstance(c, dict)
        ],
        "families": families,
    }


def parse_sprite_collection(
    raw: Any, catalogue: dict[str, Any] | None = None, boons: dict[str, dict[str, Any]] | None = None
) -> dict[str, Any] | None:
    """Own sprite collection for one game version (SpriteCollectionResponseDto)."""
    data = _unwrap(raw)
    if not isinstance(data, dict) or "totalVariants" not in data:
        return None
    return _parse_collection_body(data, catalogue, boons)


def parse_sprite_collection_all(raw: Any) -> dict[str, Any] | None:
    """Cumulative (deduplicated) totals across versions (AllSpriteCollectionsResponseDto)."""
    data = _unwrap(raw)
    if not isinstance(data, dict) or "totalVariants" not in data:
        return None
    return {
        "owned_variants": data.get("ownedVariants", 0),
        "total_variants": data.get("totalVariants", 0),
        "owned_families": data.get("ownedFamilies", 0),
        "total_families": data.get("totalFamilies", 0),
        "completion_pct": data.get("completionPercent", 0),
        "versions": [
            {
                "version": v.get("gameVersion"),
                "owned_variants": v.get("ownedVariants", 0),
                "total_variants": v.get("totalVariants", 0),
                "completion_pct": v.get("completionPercent", 0),
                "current": bool(v.get("isCurrent")),
            }
            for v in data.get("versions") or []
            if isinstance(v, dict)
        ],
    }


def parse_power_ranking(raw: Any) -> dict[str, Any] | None:
    """Power Ranking: rank + points, plus trackedStats (PR, peak PR, PR change, counting events)."""
    data = _unwrap(raw)
    if isinstance(data, list):
        data = data[0] if data else None
    if not isinstance(data, dict) or not isinstance(data.get("rank"), (int, float)):
        return None
    tracked = data.get("trackedStats") if isinstance(data.get("trackedStats"), dict) else {}

    def stat(*names: str) -> Any:
        lowered = {k.lower(): v for k, v in tracked.items()}
        return next((lowered[n.lower()] for n in names if n.lower() in lowered), None)

    return {
        "rank": int(data["rank"]),
        "points": data.get("pointsEarned"),
        "event_id": data.get("eventId"),
        "pr": stat("PR"),
        "peak_pr": stat("peakPR", "peakPr"),
        "delta_pr": stat("deltaPR", "deltaPr"),
        "peak_performance": stat("peakPerf"),
        "counting_events": stat("countingEvents"),
    }


def parse_battlepass(raw: Any) -> dict[str, Any] | None:
    """/v2/battlepass (BattlePassCatalog) -> season, prices and reward pages."""
    data = _unwrap(raw)
    if not isinstance(data, dict) or not isinstance(data.get("pages"), list):
        return None
    pages = []
    for page in data["pages"]:
        if not isinstance(page, dict):
            continue
        rewards = [
            {
                "name": r.get("displayName") or r.get("item"),
                "item": r.get("item") if isinstance(r.get("item"), str) else None,
                "type": r.get("type"),
                "rarity": r.get("rarity"),
                "icon": r.get("icon"),
                "quantity": r.get("quantity"),
                "cost": r.get("cost"),
                "currency": r.get("currency"),
                "price_row": r.get("priceRow"),
            }
            for r in page.get("rewards") or []
            if isinstance(r, dict)
        ]
        pages.append({"id": page.get("id"), "track": page.get("track"), "page": page.get("page"), "rewards": rewards})
    pages.sort(key=lambda pg: (str(pg.get("track") or ""), pg.get("page") or 0))
    return {
        "season": data.get("season"),
        "game_version": data.get("gameVersion"),
        "generated": data.get("generated"),
        "prices": [
            {"name": pr.get("name"), "cost": pr.get("cost"), "currency": pr.get("currency")}
            for pr in data.get("prices") or []
            if isinstance(pr, dict)
        ],
        "pages": pages,
        "reward_count": sum(len(pg["rewards"]) for pg in pages),
    }


def sample_items(raw: Any, limit: int = 3) -> Any:
    """First few items of the largest list in an untyped payload (diagnostics only)."""
    best: list[Any] = []

    def walk(value: Any, depth: int = 0) -> None:
        nonlocal best
        if depth > 5:
            return
        if isinstance(value, list):
            if len(value) > len(best):
                best = value
            for item in value[:5]:
                walk(item, depth + 1)
        elif isinstance(value, dict):
            for item in value.values():
                walk(item, depth + 1)

    walk(raw)
    return {"largest_list_length": len(best), "sample": best[:limit]}


def parse_inventory(raw: Any) -> dict[str, Any] | None:
    """Currency balances from /v2/fn/br-inventory. `globalcash` is the provider's V-Bucks balance."""
    data = _unwrap(raw)
    if not isinstance(data, dict):
        return None
    stash = data.get("stash") if isinstance(data.get("stash"), dict) else data
    balances = {k: int(v) for k, v in stash.items() if isinstance(v, (int, float)) and not isinstance(v, bool)}
    if not balances:
        return None
    return {"vbucks": balances.get("globalcash"), "balances": balances}


def summarise_quests(raw: Any) -> dict[str, Any] | None:
    """Counts by state from /v2/quests (no names/targets exist in the payload, so nothing else is derived)."""
    items: list[Any] = []

    def walk(value: Any, depth: int = 0) -> None:
        nonlocal items
        if depth > 5:
            return
        if isinstance(value, list) and value and all(isinstance(v, dict) and "templateId" in v for v in value[:5]):
            if len(value) > len(items):
                items = value
        elif isinstance(value, dict):
            for v in value.values():
                walk(v, depth + 1)
        elif isinstance(value, list):
            for v in value[:5]:
                walk(v, depth + 1)

    walk(raw)
    if not items:
        return None
    states: dict[str, int] = {}
    for q in items:
        state = str(q.get("state") or "Unknown")
        states[state] = states.get(state, 0) + 1
    return {"total": len(items), "by_state": states}


_MTX_KINDS = {
    "Currency:MtxPurchased": "purchased",
    "Currency:MtxComplimentary": "earned",
    "Currency:MtxGiveaway": "giveaway",
    "Currency:MtxPurchaseBonus": "bonus",
}


def parse_common_core(raw: Any, expected_account_id: str) -> dict[str, Any] | None:
    """V-Bucks and Crew state from a common_core QueryProfile response.

    Returns None unless the profile belongs to the expected account (identity gate).
    V-Bucks: Currency:Mtx* items for the current MTX platform plus "Shared" (as the game displays).
    """
    if not isinstance(raw, dict):
        return None
    changes = raw.get("profileChanges") or []
    profile = next((c.get("profile") for c in changes if isinstance(c, dict) and isinstance(c.get("profile"), dict)), None)
    if not profile or profile.get("accountId") != expected_account_id or profile.get("profileId") != "common_core":
        return None
    attrs = ((profile.get("stats") or {}).get("attributes")) or {}
    platform = attrs.get("current_mtx_platform")
    by_kind: dict[str, int] = {}
    total = 0
    other_platforms = 0
    for item in (profile.get("items") or {}).values():
        if not isinstance(item, dict):
            continue
        template = str(item.get("templateId") or "")
        if not template.startswith("Currency:Mtx"):
            continue
        qty = item.get("quantity")
        if not isinstance(qty, (int, float)):
            continue
        item_platform = (item.get("attributes") or {}).get("platform")
        if platform and item_platform not in (platform, "Shared"):
            other_platforms += int(qty)
            continue
        kind = _MTX_KINDS.get(template, "other")
        by_kind[kind] = by_kind.get(kind, 0) + int(qty)
        total += int(qty)

    crew = None
    subs = attrs.get("subscriptions")
    if isinstance(subs, list) and subs:
        sub = next((x for x in subs if isinstance(x, dict)), None)
        if sub:
            crew = {
                "active": sub.get("subscriptionEndDate") is not None,
                "end_date": sub.get("subscriptionEndDate"),
                "next_reward_date": sub.get("nextRewardDate") or sub.get("nextRewardGrantDate"),
                "auto_renew": sub.get("autoRenewState"),
            }
    return {
        "vbucks": total,
        "by_kind": by_kind,
        "mtx_platform": platform,
        "other_platform_vbucks": other_platforms or None,
        "crew": crew,
        "profile_updated": profile.get("updated"),
    }


def cosmetic_items(raw: Any) -> list[dict[str, Any]]:
    """Cosmetic records from a search response, whatever wrapper the provider used.

    Observed/possible shapes: a list, {data: [...]}, or a wrapped paginated result {data: {data: [...]}}.
    """
    value = raw
    for _ in range(3):
        if isinstance(value, list):
            return [i for i in value if isinstance(i, dict)]
        if not isinstance(value, dict):
            return []
        nxt = next((value[k] for k in ("data", "items", "results", "cosmetics") if k in value), None)
        if nxt is None:
            return []
        value = nxt
    return []


def _template_suffix(template: str) -> str | None:
    """'AthenaCharacter:CID_028_Athena_Commando_F' -> 'cid_028_athena_commando_f'."""
    if ":" not in template:
        return None
    suffix = template.split(":", 1)[1].strip().lower()
    return suffix or None


# Cosmetic item template types kept from athena (user-approved: cosmetic IDs only, no quests/stats)
_COSMETIC_TEMPLATE = re.compile(
    r"^(?:Athena(?!Season|RewardGraph|RewardEvent)\w+|Cosmetic(?!Locker)\w+|Sparks\w+|Juno\w+|Vehicle\w+|HomebaseBannerIcon)$"
)


def parse_athena_outfits(raw: Any, expected_account_id: str) -> dict[str, Any] | None:
    """Owned cosmetic IDs from an athena QueryProfile response (user-approved: cosmetic IDs only).

    `ids` are the owned outfits; `cosmetics` maps every owned cosmetic id (lower-case, without the
    type prefix) to its template type. Returns None unless the profile belongs to the expected
    account (identity gate). Nothing else from the profile (quests, stats, variants) is kept.
    """
    if not isinstance(raw, dict):
        return None
    changes = raw.get("profileChanges") or []
    profile = next((c.get("profile") for c in changes if isinstance(c, dict) and isinstance(c.get("profile"), dict)), None)
    if not profile or profile.get("accountId") != expected_account_id or profile.get("profileId") != "athena":
        return None
    ids: set[str] = set()
    cosmetics: dict[str, str] = {}
    for item in (profile.get("items") or {}).values():
        if not isinstance(item, dict):
            continue
        template = str(item.get("templateId") or "")
        kind = template.split(":", 1)[0]
        suffix = _template_suffix(template)
        if not suffix or not _COSMETIC_TEMPLATE.match(kind):
            continue
        cosmetics[suffix] = kind
        if kind == "AthenaCharacter":
            ids.add(suffix)
    return {
        "ids": sorted(ids),
        "count": len(ids),
        "cosmetics": cosmetics,
        "profile_updated": profile.get("updated"),
    }


def mark_battlepass_owned(bp: dict[str, Any] | None, owned: dict[str, str] | None) -> dict[str, Any] | None:
    """Copy of the Battle Pass with `owned` (True/False/None) on each reward plus unlock totals.

    A reward is matched by its item id against the player's owned cosmetic ids. Rewards without an
    item id, currency rewards, and reward types where nothing in the whole pass matched are left
    as None (unknown) rather than shown as locked.
    """
    if not bp or owned is None:
        return bp
    owned_ids = set(owned)

    def reward_id(r: dict[str, Any]) -> str | None:
        item = r.get("item")
        if not isinstance(item, str) or not item:
            return None
        return (item.split(":", 1)[1] if ":" in item else item).strip().lower() or None

    matched_types: set[str] = set()
    for page in bp.get("pages") or []:
        for r in page.get("rewards") or []:
            rid = reward_id(r)
            if rid and rid in owned_ids:
                matched_types.add(str(r.get("type")))

    unlocked = known = 0
    pages = []
    for page in bp.get("pages") or []:
        rewards = []
        for r in page.get("rewards") or []:
            rid = reward_id(r)
            status: bool | None
            if not rid or r.get("type") == "Currency" or str(r.get("type")) not in matched_types:
                status = None
            else:
                status = rid in owned_ids
            if status is not None:
                known += 1
                unlocked += int(status)
            rewards.append({**r, "owned": status})
        pages.append({**page, "rewards": rewards})
    return {**bp, "pages": pages, "unlocked": unlocked, "known": known}


_OUTFIT_TYPES = {"outfit", "athenacharacter", "character"}


def is_outfit_record(item: dict[str, Any]) -> bool:
    item_type = item.get("type")
    if isinstance(item_type, dict):  # some catalogues use {value, displayValue}
        item_type = item_type.get("value")
    return str(item_type or "").lower() in _OUTFIT_TYPES or str(item.get("id") or "").lower().startswith(("cid_", "character_"))


def outfit_summary(item: dict[str, Any]) -> dict[str, Any]:
    images = item.get("images") if isinstance(item.get("images"), dict) else {}
    rarity = item.get("rarity")
    if isinstance(rarity, dict):
        rarity = rarity.get("displayValue") or rarity.get("value")
    return {
        "id": item.get("id"),
        "name": item.get("name"),
        "rarity": rarity,
        "set": item.get("set") if isinstance(item.get("set"), str) else None,
        "icon": images.get("icon") or images.get("smallIcon") or item.get("icon"),
        "small": images.get("smallIcon") or images.get("icon") or item.get("icon"),
        "intro": _intro(item.get("introduction")),
    }


def _intro(value: Any) -> dict[str, Any] | None:
    """{chapter, season} from a cosmetic's introduction block, when present."""
    if not isinstance(value, dict) or not value.get("chapter"):
        return None
    return {"chapter": value.get("chapter"), "season": value.get("season")}


# ---- shop / news / map ------------------------------------------------------------


def _suffix_lower(template: Any) -> str | None:
    if not isinstance(template, str) or not template:
        return None
    return (template.split(":", 1)[1] if ":" in template else template).strip().lower() or None


def parse_shop(raw: Any) -> dict[str, Any] | None:
    """Today's Item Shop (ShopResponseDto) -> sections of offers with their cosmetic items."""
    data = _unwrap(raw)
    if not isinstance(data, dict) or not isinstance(data.get("storefronts"), list):
        return None
    sections: dict[str, dict[str, Any]] = {}
    for front in data["storefronts"]:
        for entry in (front or {}).get("catalogEntries") or []:
            if not isinstance(entry, dict):
                continue
            prices = [p for p in entry.get("prices") or [] if isinstance(p, dict)]
            price = next((p for p in prices if p.get("currencyType") == "MtxCurrency"), prices[0] if prices else {})
            items = []
            for grant in entry.get("itemGrants") or []:
                if not isinstance(grant, dict):
                    continue
                cos = grant.get("cosmetic") if isinstance(grant.get("cosmetic"), dict) else {}
                images = cos.get("images") if isinstance(cos.get("images"), dict) else {}
                rarity = cos.get("rarity")
                if isinstance(rarity, dict):
                    rarity = rarity.get("displayValue") or rarity.get("value")
                item_type = cos.get("type")
                if isinstance(item_type, dict):
                    item_type = item_type.get("displayValue") or item_type.get("value")
                intro = cos.get("introduction") if isinstance(cos.get("introduction"), dict) else {}
                items.append({
                    "id": _suffix_lower(grant.get("templateId")),
                    "intro": {"chapter": intro.get("chapter"), "season": intro.get("season")} if intro.get("chapter") else None,
                    "name": cos.get("name"),
                    "type": item_type,
                    "rarity": rarity,
                    "icon": images.get("icon") or images.get("smallIcon") or cos.get("icon"),
                })
            items = [i for i in items if i["id"]]
            if not items:
                continue
            bundle = entry.get("bundle") if isinstance(entry.get("bundle"), dict) else None
            name = entry.get("sectionDisplayName") or "Item Shop"
            section = sections.setdefault(name, {"name": name, "priority": entry.get("sectionPriority") or 0, "offers": []})
            section["offers"].append({
                "id": entry.get("offerId"),
                "title": (bundle or {}).get("name") or entry.get("title") or items[0]["name"],
                "price": (bundle or {}).get("finalPrice") or price.get("finalPrice"),
                "regular_price": (bundle or {}).get("regularPrice") or price.get("regularPrice"),
                "image": entry.get("offerVisual") or items[0]["icon"],
                "bundle": bool(bundle),
                "items": items,
                "sort": entry.get("sortPriority") or 0,
            })
    ordered = sorted(sections.values(), key=lambda s: -(s["priority"] or 0))
    for s in ordered:
        s["offers"].sort(key=lambda o: -(o["sort"] or 0))
    return {
        "expiration": data.get("expiration"),
        "sections": ordered,
        "offer_count": sum(len(s["offers"]) for s in ordered),
    }


def news_fetched_at(raw: Any) -> str | None:
    """Newest `fetchedAt` stamp anywhere in a news payload (when the provider last read Epic)."""
    stamps: list[str] = []

    def walk(value: Any, depth: int = 0) -> None:
        if depth > 4:
            return
        if isinstance(value, dict):
            if isinstance(value.get("fetchedAt"), str):
                stamps.append(value["fetchedAt"])
            for v in value.values():
                walk(v, depth + 1)
        elif isinstance(value, list):
            for v in value[:10]:
                walk(v, depth + 1)

    walk(raw)
    return max(stamps) if stamps else None


def parse_news(raw: Any) -> list[dict[str, Any]] | None:
    """In-game news posts from an untyped payload: every list of titled posts, merged (all modes)."""
    best: list[dict[str, Any]] = []

    def walk(value: Any, depth: int = 0) -> None:
        if depth > 6:
            return
        if isinstance(value, list):
            posts = [v for v in value if isinstance(v, dict) and (v.get("title") or v.get("tabTitle"))]
            if posts:
                best.extend(posts)
            for v in value[:10]:
                walk(v, depth + 1)
        elif isinstance(value, dict):
            for v in value.values():
                walk(v, depth + 1)

    walk(raw)
    if not best:
        return None
    out = []
    seen: set[str] = set()
    for post in best:
        title = str(post.get("title") or post.get("tabTitle") or "").strip()
        if not title or title in seen:
            continue
        seen.add(title)
        image = post.get("image") or post.get("tileImage") or post.get("newsImage") or post.get("imageUrl")
        if isinstance(image, dict):
            image = image.get("url")
        out.append({
            "title": title,
            "body": str(post.get("body") or post.get("description") or "").strip() or None,
            "image": image if isinstance(image, str) else None,
            "tile": post.get("tileImage") if isinstance(post.get("tileImage"), str) else None,
            "tag": post.get("tabTitle") if post.get("tabTitle") and post.get("tabTitle") != title else None,
            "date": post.get("date") or post.get("publishedAt") or post.get("startDate"),
            "priority": post.get("sortingPriority") or 0,
        })
    out.sort(key=lambda p: -(p["priority"] or 0))
    return out


def parse_map(raw: Any) -> dict[str, Any] | None:
    """MapDataDto -> image, bounds and named POIs."""
    data = _unwrap(raw)
    if not isinstance(data, dict) or not data.get("imageUrl"):
        return None
    bounds = data.get("worldBounds") if isinstance(data.get("worldBounds"), dict) else None
    pois = []
    for poi in data.get("pois") or []:
        if not isinstance(poi, dict) or not poi.get("name"):
            continue
        if not isinstance(poi.get("x"), (int, float)) or not isinstance(poi.get("y"), (int, float)):
            continue
        pois.append({
            "name": poi["name"], "type": poi.get("type"), "x": poi["x"], "y": poi["y"],
            "z": poi.get("z") if isinstance(poi.get("z"), (int, float)) else None,
        })
    modes = [m for m in data.get("modes") or [] if isinstance(m, str)]
    return {
        "version": data.get("version"),
        "patch": data.get("patch"),
        "chapter": data.get("chapter"),
        "season": data.get("season"),
        "release_date": data.get("releaseDate"),
        "mode": data.get("mode"),
        "island": data.get("island"),
        "name": data.get("displayName"),
        "image": data["imageUrl"],
        "width": data.get("imageWidth"),
        "height": data.get("imageHeight"),
        "bounds": bounds,
        "camera": data.get("camera") if isinstance(data.get("camera"), dict) else None,
        "pois": pois,
        "modes": modes,
    }


def map_mode_for_playlist(modes: list[str], playlist_id: str | None) -> str | None:
    """Map mode whose codename appears in the stats playlist key (e.g. rotating:blastberry for a Reload key)."""
    key = str(playlist_id or "").lower()
    if not key:
        return None
    for mode in modes or []:
        code = mode.split(":", 1)[1].lower() if ":" in mode else ""
        if code and code in key:
            return mode
    return None


def sprite_level_from_rows(xp: Any, curve: list[dict[str, Any]] | None) -> int | None:
    """Level for a sprite's XP from raw curve rows ({level, xp}), using their leading rising run."""
    if not isinstance(xp, (int, float)) or not curve:
        return None
    rows = sorted((r for r in curve if isinstance(r.get("level"), int) and isinstance(r.get("xp"), (int, float))), key=lambda r: r["level"])
    run: list[tuple[int, float]] = []
    for r in rows:
        if run and r["xp"] < run[-1][1]:
            break
        run.append((r["level"], r["xp"]))
    if len(run) < 2:
        return None
    level = run[0][0]
    for lvl, threshold in run:
        if xp >= threshold:
            level = lvl
    return level


def progress_snapshot(info: dict[str, Any], curve: list[dict[str, Any]] | None) -> dict[str, Any]:
    """What changes when a match is played: claimed quests, level, sprite kinds owned/mastered/level."""
    quests = info.get("quests") or {}
    level = info.get("level") or {}
    sprites: dict[str, dict[str, Any]] = {}
    for family in ((info.get("sprites") or {}).get("current") or {}).get("families") or []:
        for v in family.get("variants") or []:
            if not v.get("id"):
                continue
            label = v.get("label")
            name = family.get("name", "").replace(" Sprite", "")
            sprites[v["id"]] = {
                "name": name if label in (None, "Base") else f"{label} {name}",
                "icon": v.get("icon"),
                "owned": bool(v.get("owned")),
                "mastered": bool(v.get("mastered")),
                "level": sprite_level_from_rows(v.get("xp"), curve) if v.get("owned") else None,
            }
    return {
        "claimed": (quests.get("by_state") or {}).get("Claimed") if quests else None,
        "level": level.get("level") if level else None,
        "sprites": sprites,
    }


def progress_events(before: dict[str, Any] | None, after: dict[str, Any]) -> list[dict[str, Any]]:
    """Differences between two progress snapshots, as card-friendly events."""
    if not before:
        return []
    events: list[dict[str, Any]] = []
    if isinstance(before.get("claimed"), int) and isinstance(after.get("claimed"), int) and after["claimed"] > before["claimed"]:
        events.append({"type": "quests", "count": after["claimed"] - before["claimed"]})
    if isinstance(before.get("level"), int) and isinstance(after.get("level"), int) and after["level"] > before["level"]:
        events.append({"type": "level_up", "from": before["level"], "to": after["level"]})
    old = before.get("sprites") or {}
    for vid, now in (after.get("sprites") or {}).items():
        prev = old.get(vid)
        if prev is None:
            continue
        base = {"name": now["name"], "icon": now["icon"]}
        if now["owned"] and not prev["owned"]:
            events.append({"type": "sprite_new", **base})
        if now["mastered"] and not prev["mastered"]:
            events.append({"type": "sprite_mastered", **base})
        elif now["owned"] and prev["owned"] and isinstance(now["level"], int) and isinstance(prev["level"], int) and now["level"] > prev["level"]:
            events.append({"type": "sprite_level", "level": now["level"], **base})
    return events


# Sprites belong to the main Battle Royale island; Reload and other modes have none
SPRITE_EVENT_TYPES = {"sprite_new", "sprite_mastered", "sprite_level"}


def events_for_mode(events: list[dict[str, Any]], mode_category: str | None) -> list[dict[str, Any]]:
    if mode_category in ("build", "zero_build"):
        return events
    return [e for e in events if e.get("type") not in SPRITE_EVENT_TYPES]


# ---- sprite releases: live season tracking and "new" badges ----------------------


def version_key(version: Any) -> tuple[int, ...]:
    """'42.30' -> (42, 30) for ordering game versions."""
    parts = []
    for piece in str(version or "").split("."):
        digits = "".join(ch for ch in piece if ch.isdigit())
        parts.append(int(digits) if digits else 0)
    return tuple(parts)


def parse_sprite_version_list(raw: Any) -> list[dict[str, Any]]:
    """/v2/sprites/versions (SpriteVersionDto[]) -> versions oldest first."""
    data = _unwrap(raw)
    items = data.get("versions") if isinstance(data, dict) else data
    out = [
        {
            "version": str(v["version"]),
            "current": bool(v.get("isCurrent")),
            "families": v.get("familyCount"),
            "generated": v.get("generated"),
        }
        for v in (items if isinstance(items, list) else [])
        if isinstance(v, dict) and v.get("version")
    ]
    return sorted(out, key=lambda v: version_key(v["version"]))


def catalogue_ids(raw: Any) -> dict[str, list[str]] | None:
    """Family and variant ids in a sprite catalogue (live or archived)."""
    data = _unwrap(raw)
    if not isinstance(data, dict) or not isinstance(data.get("sprites"), list):
        return None
    families: list[str] = []
    variants: list[str] = []
    for fam in data["sprites"]:
        if not isinstance(fam, dict) or not fam.get("id"):
            continue
        families.append(fam["id"])
        variants.extend(v["id"] for v in fam.get("variants") or [] if isinstance(v, dict) and v.get("id"))
    return {"families": families, "variants": variants}


def build_sprite_intro(per_version: dict[str, dict[str, list[str]]]) -> dict[str, dict[str, str]]:
    """Earliest game version each family / variant appears in, from the scanned catalogues."""
    families: dict[str, str] = {}
    variants: dict[str, str] = {}
    for version in sorted(per_version, key=version_key):
        ids = per_version[version]
        for fid in ids.get("families", []):
            families.setdefault(fid, version)
        for vid in ids.get("variants", []):
            variants.setdefault(vid, version)
    return {"families": families, "variants": variants}


def annotate_new_sprites(current: dict[str, Any] | None, intro: dict[str, dict[str, str]] | None, first_version: str | None) -> dict[str, Any] | None:
    """Mark sprites and kinds introduced in the collection's own game version.

    A family introduced this update is `new`; an older family that gained kinds this update lists
    them as `new_kinds`. Nothing is marked when this version is the earliest one scanned (no
    earlier catalogue to compare with).
    """
    if not current or not intro:
        return current
    version = current.get("version")
    if not version or (first_version and version_key(version) <= version_key(first_version)):
        return current
    fam_intro = intro.get("families") or {}
    var_intro = intro.get("variants") or {}
    families = []
    new_families = new_kinds = 0
    for fam in current.get("families") or []:
        variants = []
        fam_new = fam_intro.get(fam.get("id")) == version
        kinds = 0
        for v in fam.get("variants") or []:
            v_new = var_intro.get(v.get("id")) == version
            kinds += int(v_new and not fam_new)
            variants.append({**v, "new": v_new, "added_in": var_intro.get(v.get("id"))})
        new_families += int(fam_new)
        new_kinds += kinds
        families.append({**fam, "variants": variants, "new": fam_new, "new_kinds": kinds, "added_in": fam_intro.get(fam.get("id"))})
    return {**current, "families": families, "new_families": new_families, "new_kinds": new_kinds}


def _norm_label(label: str) -> str:
    return "".join(ch for ch in str(label or "").lower() if ch.isalnum())


def tidy_variant_labels(families: list[dict[str, Any]]) -> None:
    """Make kind names consistent across sprites.

    The same kind is named differently in places ("Cheatmaster" vs "Cheat Master"), and some names
    carry the sprite's own name ("Trick or Treat Bushranger"). Use the most common spelling of each
    kind, and trim a label to a known kind it starts with.
    """
    counts: dict[str, dict[str, int]] = {}
    for fam in families:
        for v in fam.get("variants") or []:
            label = v.get("label") or ""
            counts.setdefault(_norm_label(label), {})
            counts[_norm_label(label)][label] = counts[_norm_label(label)].get(label, 0) + 1
    # Preferred display form: most used, then the one with spaces (readable)
    preferred = {
        key: sorted(forms.items(), key=lambda kv: (-kv[1], -kv[0].count(" "), kv[0]))[0][0]
        for key, forms in counts.items() if key
    }
    popularity = {key: sum(forms.values()) for key, forms in counts.items()}
    known = sorted((k for k in preferred if popularity[k] >= 3), key=len, reverse=True)
    for fam in families:
        for v in fam.get("variants") or []:
            key = _norm_label(v.get("label"))
            if not key or v.get("label") == "Base":
                continue
            if popularity.get(key, 0) < 3:
                # A rare spelling that begins with a common kind name: trim to that kind
                prefix = next((k for k in known if key.startswith(k) and len(key) > len(k)), None)
                if prefix:
                    v["label"] = preferred[prefix]
                    continue
            v["label"] = preferred.get(key, v.get("label"))


def shop_history_update(seen: dict[str, dict[str, str]], item_ids: list[str], day: str) -> dict[str, int | None]:
    """Record today's shop items; return days since each was last in the shop (None = no earlier record).

    `seen` maps item id -> {"first": day, "last": day} and is updated in place. Days are ISO dates.
    """
    from datetime import date

    out: dict[str, int | None] = {}
    today = date.fromisoformat(day)
    for item_id in item_ids:
        rec = seen.get(item_id)
        gap = None
        if rec and rec.get("last") and rec["last"] != day:
            gap = (today - date.fromisoformat(rec["last"])).days
        elif rec and rec.get("prev_gap") is not None and rec.get("last") == day:
            gap = rec["prev_gap"]
        out[item_id] = gap
        if not rec:
            seen[item_id] = {"first": day, "last": day, "prev_gap": None}
        elif rec.get("last") != day:
            seen[item_id] = {"first": rec.get("first", day), "last": day, "prev_gap": gap}
    return out
