"""Diagnostics for Fortnite Activity Tracker (Settings > Devices & services > Download diagnostics).

Contains parsed data with identifiers redacted plus the *key structure* (names and
types, never values) of each upstream response, so field-name mismatches can be
diagnosed without exposing personal data or credentials.
"""

from __future__ import annotations

from typing import Any

try:
    from homeassistant.components.diagnostics import async_redact_data
    from homeassistant.config_entries import ConfigEntry
    from homeassistant.core import HomeAssistant
except ImportError:  # pragma: no cover - test environment
    ConfigEntry = Any  # type: ignore
    HomeAssistant = Any  # type: ignore

    def async_redact_data(data: Any, keys: set[str]) -> Any:  # type: ignore
        return data

from .const import CONF_API_KEY, CONF_EPIC_DEVICE, DOMAIN

TO_REDACT = {
    CONF_API_KEY,
    CONF_EPIC_DEVICE,
    "account_id",
    "accountId",
    "device_id",
    "secret",
    "display_name",
    "names",
    "platforms",
}


def shape_of(value: Any, depth: int = 0) -> Any:
    """Key/type skeleton of a JSON value (first list element only, no values)."""
    if depth > 6:
        return "…"
    if isinstance(value, dict):
        return {str(k): shape_of(v, depth + 1) for k, v in list(value.items())[:60]}
    if isinstance(value, list):
        return [shape_of(value[0], depth + 1)] if value else []
    return type(value).__name__


async def async_get_config_entry_diagnostics(hass: HomeAssistant, entry: ConfigEntry) -> dict[str, Any]:
    """Return redacted diagnostics for a config entry."""
    coordinator = hass.data.get(DOMAIN, {}).get(entry.entry_id)
    profile = getattr(coordinator, "profile", None)
    players = {}
    for player_id, data in ((coordinator.data or {}) if coordinator else {}).items():
        players[player_id] = {
            "is_playing": data.get("is_playing"),
            "overall": (data.get("stats") or {}).get("overall"),
            "ranked": data.get("ranked"),
            "metrics": data.get("metrics"),
            "session_matches": len(((data.get("session") or {}).get("matches")) or []),
        }
    profile_players = {}
    for player_id, data in ((profile.data or {}) if profile else {}).items():
        sprites = data.get("sprites") or {}
        current = sprites.get("current") or {}
        profile_players[player_id] = {
            "epic": data.get("epic"),
            "level": data.get("level"),
            "power_ranking": data.get("power_ranking"),
            "windows": {k: (v or {}).get("matches") if v else None for k, v in (data.get("windows") or {}).items()},
            "sprites_current": {k: v for k, v in current.items() if k != "families"},
            "sprite_families": len(current.get("families") or []),
            "sprites_with_icons": sum(1 for f in current.get("families") or [] if f.get("icon")),
            # Counts and presence only; outfit IDs are not included
            "outfits": {
                k: v for k, v in (data.get("outfits") or {}).items() if k in ("owned_count", "named_count", "shuffle", "profile_updated")
            } | {"avatar_set": bool((data.get("outfits") or {}).get("avatar"))},
            "owned_cosmetic_count": len((getattr(profile, "owned_cosmetics", {}) or {}).get(player_id) or {}),
            "battlepass_unlocks": _bp_unlock_summary(profile, player_id),
        }
    return async_redact_data(
        {
            "entry": {"options": dict(entry.options), "player_count": len(entry.data.get("players", []))},
            "players": players,
            "profile": {
                "season": getattr(profile, "season", None),
                "sprite_version": getattr(profile, "sprite_version", None),
                "sprite_curve_levels": len(((getattr(profile, "sprite_catalogue", None) or {}).get("level_curve")) or []),
                "playlist_count": len(getattr(profile, "playlists", {}) or {}),
                "tournament_count": len(getattr(profile, "tournaments", None) or []),
                "failing": sorted(getattr(profile, "_failing", set())),
                "players": profile_players,
                "response_shapes": getattr(profile, "raw_shapes", {}),
                "capabilities": getattr(profile, "capabilities", {}),
                "battlepass_summary": (
                    {k: v for k, v in (getattr(profile, "battlepass", None) or {}).items() if k != "pages"}
                    | {"page_tracks": sorted({str(p.get("track")) for p in (getattr(profile, "battlepass", None) or {}).get("pages", [])})}
                ) if getattr(profile, "battlepass", None) else None,
                "quest_debug": getattr(profile, "quest_debug", {}),
                "outfit_catalogue": getattr(profile, "outfit_index_info", {}),
                "shop_offers": ((getattr(profile, "shop", None) or {}).get("offer_count")),
                "news_posts": len(getattr(profile, "news", None) or []),
                "news_sample_titles": [n.get("title") for n in (getattr(profile, "news", None) or [])[:5]],
                "maps": {
                    k: {"name": v.get("name"), "version": v.get("version"), "pois": len(v.get("pois") or []), "modes": v.get("modes"), "bounds": v.get("bounds"), "camera": v.get("camera"), "size": [v.get("width"), v.get("height")]}
                    for k, v in (getattr(profile, "maps", {}) or {}).items()
                },
                "sprite_level_curve_raw": ((getattr(profile, "sprite_catalogue", None) or {}).get("level_curve_raw")),
                "tournament_classification": sorted({
                    f"{e.get('tournament_type')}|{e.get('event_group')}|spectate={e.get('can_spectate')}|{e.get('name')}"
                    for e in (getattr(profile, "tournaments", None) or [])
                })[:80],
            },
        },
        TO_REDACT,
    )


def _bp_unlock_summary(profile: Any, player_id: str) -> dict[str, Any] | None:
    """Per reward type: rewards, how many have an item id, unlocked / locked / unknown counts."""
    if profile is None or not hasattr(profile, "battlepass_for"):
        return None
    bp = profile.battlepass_for(player_id)
    if not bp:
        return None
    out: dict[str, dict[str, int]] = {}
    for page in bp.get("pages") or []:
        for r in page.get("rewards") or []:
            row = out.setdefault(str(r.get("type")), {"rewards": 0, "with_item": 0, "unlocked": 0, "locked": 0, "unknown": 0})
            row["rewards"] += 1
            row["with_item"] += int(bool(r.get("item")))
            status = r.get("owned")
            row["unlocked" if status is True else "locked" if status is False else "unknown"] += 1
    return {"unlocked": bp.get("unlocked"), "known": bp.get("known"), "by_type": out}
