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
