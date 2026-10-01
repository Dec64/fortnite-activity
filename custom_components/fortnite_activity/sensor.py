"""Sensor platform for Fortnite Family Tracker."""

from __future__ import annotations

from typing import Any

from datetime import datetime

try:
    from homeassistant.components.sensor import SensorDeviceClass, SensorEntity, SensorStateClass
    from homeassistant.config_entries import ConfigEntry
    from homeassistant.core import HomeAssistant
    from homeassistant.helpers.entity_platform import AddEntitiesCallback
except ImportError:
    class SensorEntity:  # type: ignore
        pass

    class SensorDeviceClass:  # type: ignore
        TIMESTAMP = "timestamp"

    class SensorStateClass:  # type: ignore
        MEASUREMENT = "measurement"
        TOTAL_INCREASING = "total_increasing"
    ConfigEntry = Any  # type: ignore
    HomeAssistant = Any  # type: ignore
    AddEntitiesCallback = Any  # type: ignore

from .const import CONF_PLAYERS, CONF_PLAYER_ID, CONF_PLAYER_NAME, DOMAIN
from .coordinator import FortniteDataUpdateCoordinator
from .entity import FortniteEntity


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up Fortnite Family sensors based on a config entry."""
    coordinator: FortniteDataUpdateCoordinator = hass.data[DOMAIN][entry.entry_id]
    players = entry.data.get(CONF_PLAYERS, [])

    entities: list[SensorEntity] = []
    for p in players:
        p_id = p[CONF_PLAYER_ID]
        p_name = p.get(CONF_PLAYER_NAME, p_id.capitalize())

        entities.extend(
            [
                FortniteOverallStatsSensor(coordinator, p_id, p_name),
                FortniteCurrentSessionSensor(coordinator, p_id, p_name),
                FortniteRankBattleRoyaleSensor(coordinator, p_id, p_name),
                FortniteRankReloadSensor(coordinator, p_id, p_name),
                FortniteLevelSensor(coordinator.profile, p_id, p_name),
                FortniteSpritesSensor(coordinator.profile, p_id, p_name),
                FortnitePowerRankingSensor(coordinator.profile, p_id, p_name),
                FortniteLadderSensor(coordinator, p_id, p_name, "battle_royale", "BR Ladder", "ladder_battle_royale"),
                FortniteLadderSensor(coordinator, p_id, p_name, "reload_build", "Reload Ladder", "ladder_reload"),
                FortniteUnrealPositionSensor(coordinator, p_id, p_name, "battle_royale", "BR Unreal Position", "unreal_battle_royale"),
                FortniteUnrealPositionSensor(coordinator, p_id, p_name, "reload_build", "Reload Unreal Position", "unreal_reload"),
                FortniteVBucksSensor(coordinator.profile, p_id, p_name),
                FortniteSeasonStatSensor(coordinator.profile, p_id, p_name, "kd", "Season K/D", "season_kd", None),
                FortniteSeasonStatSensor(coordinator.profile, p_id, p_name, "win_rate", "Season Win Rate", "season_win_rate", "%"),
                FortniteLastPlayedSensor(coordinator, p_id, p_name),
                FortniteProfileSensor(coordinator.profile, p_id, p_name),
            ]
        )

    async_add_entities(entities)


class FortniteOverallStatsSensor(FortniteEntity, SensorEntity):
    """Sensor displaying overall matches and career statistics."""

    _attr_icon = "mdi:trophy-outline"
    _attr_state_class = SensorStateClass.TOTAL_INCREASING
    # Nested breakdowns change every poll; keep them out of the recorder database
    _unrecorded_attributes = frozenset({"modes", "team_sizes", "inputs", "metrics"})

    def __init__(self, coordinator: FortniteDataUpdateCoordinator, player_id: str, player_name: str) -> None:
        """Initialize the sensor."""
        super().__init__(coordinator, "sensor", player_id, player_name, "overall_stats")
        self._attr_name = "Overall Stats"

    @property
    def native_value(self) -> int | None:
        """Return total career matches played."""
        stats = self.player_data.get("stats", {})
        return stats.get("overall", {}).get("matches")

    @property
    def _extra_attributes(self) -> dict[str, Any]:
        """Return career statistics breakdown."""
        stats = self.player_data.get("stats", {})
        metrics = self.player_data.get("metrics") or {}
        overall = stats.get("overall", {})
        return {
            "total_matches": overall.get("matches", 0),
            "total_kills": overall.get("kills", 0),
            "total_wins": overall.get("wins", 0),
            "kd_ratio": overall.get("kd", 0.0),
            "win_rate_pct": overall.get("win_rate", 0.0),
            "minutes_played": overall.get("minutes", 0),
            "score": overall.get("score", 0),
            "players_outlived": overall.get("players_outlived", 0),
            # Raw sNN_social_bp_level value; its encoding is unverified (observed 32179 while level was 322)
            "season_level_raw": stats.get("season_level"),
            "modes": stats.get("modes", {}),
            "metrics": {k: v for k, v in metrics.items() if k not in ("team_sizes", "inputs")},
            "team_sizes": metrics.get("team_sizes", {}),
            "inputs": metrics.get("inputs", {}),
        }


class FortniteCurrentSessionSensor(FortniteEntity, SensorEntity):
    """Sensor displaying active or latest session information."""

    _attr_icon = "mdi:gamepad-variant"

    def __init__(self, coordinator: FortniteDataUpdateCoordinator, player_id: str, player_name: str) -> None:
        """Initialize the sensor."""
        super().__init__(coordinator, "sensor", player_id, player_name, "current_session")
        self._attr_name = "Session"

    @property
    def native_value(self) -> str:
        """Return active or idle."""
        return "active" if self.player_data.get("is_playing", False) else "idle"

    @property
    def _extra_attributes(self) -> dict[str, Any]:
        """Return detailed session KPIs and recent match feed."""
        session = self.player_data.get("session") or self.player_data.get("last_session")
        if not session:
            return {"status": "no_session_recorded"}

        summary = session.get("summary", {})
        matches = session.get("matches", [])
        last_match = matches[0] if matches else None

        return {
            "session_id": session.get("session_id"),
            "is_active": self.player_data.get("is_playing", False),
            "start_time": session.get("start_time"),
            "end_time": session.get("end_time"),
            "duration_minutes": session.get("duration_minutes", 0),
            "matches_played": summary.get("matches_played", 0),
            "wins": summary.get("wins", 0),
            "kills": summary.get("kills", 0),
            "kd_ratio": summary.get("kd_ratio", 0.0),
            "win_rate_pct": summary.get("win_rate_pct", 0.0),
            "net_rank_delta_pct": summary.get("net_rank_delta_pct", 0.0),
            "last_match": last_match,
            "recent_matches": matches[:10],
        }


class FortniteRankBattleRoyaleSensor(FortniteEntity, SensorEntity):
    """Sensor for Battle Royale ranked track."""

    _attr_icon = "mdi:shield-star"

    _unrecorded_attributes = frozenset({"all_tracks"})

    def __init__(self, coordinator: FortniteDataUpdateCoordinator, player_id: str, player_name: str) -> None:
        """Initialize the sensor."""
        super().__init__(coordinator, "sensor", player_id, player_name, "rank_battle_royale")
        self._attr_name = "Battle Royale Rank"

    @property
    def native_value(self) -> str:
        """Return current rank name."""
        ranked = self.player_data.get("ranked", {})
        br = ranked.get("battle_royale") or {}
        return br.get("current_rank", "Unranked")

    @property
    def _extra_attributes(self) -> dict[str, Any]:
        """Return division and progress percentage."""
        ranked = self.player_data.get("ranked", {})
        br = ranked.get("battle_royale") or {}
        return {
            # Every current ranked track (Arena Boxfights, Rocket Racing, ...), as returned
            "all_tracks": [
                {
                    "game_mode": t.get("game_mode"),
                    "current_rank": t.get("current_rank"),
                    "progress_pct": t.get("progress_pct"),
                    "unreal_rank": t.get("unreal_rank"),
                    "highest_rank": t.get("highest_rank"),
                    "season_end": t.get("season_end"),
                }
                for t in ranked.get("current_tracks") or []
            ],
            "division": br.get("current_division", 0),
            "progress_pct": br.get("progress_pct", 0.0),
            "unreal_rank": br.get("unreal_rank"),
            "highest_rank": br.get("highest_rank", "Unranked"),
            "highest_division": br.get("highest_division", 0),
            "game_mode": br.get("game_mode", "Battle Royale"),
            "season_end": br.get("season_end"),
        }


class FortniteRankReloadSensor(FortniteEntity, SensorEntity):
    """Sensor for Reload Build ranked track."""

    _attr_icon = "mdi:reload"

    def __init__(self, coordinator: FortniteDataUpdateCoordinator, player_id: str, player_name: str) -> None:
        """Initialize the sensor."""
        super().__init__(coordinator, "sensor", player_id, player_name, "rank_reload")
        self._attr_name = "Reload Rank"

    @property
    def native_value(self) -> str:
        """Return current rank name."""
        ranked = self.player_data.get("ranked", {})
        reload_track = ranked.get("reload_build") or {}
        return reload_track.get("current_rank", "Unranked")

    @property
    def _extra_attributes(self) -> dict[str, Any]:
        """Return division and progress percentage."""
        ranked = self.player_data.get("ranked", {})
        reload_track = ranked.get("reload_build") or {}
        return {
            "division": reload_track.get("current_division", 0),
            "progress_pct": reload_track.get("progress_pct", 0.0),
            "unreal_rank": reload_track.get("unreal_rank"),
            "highest_rank": reload_track.get("highest_rank", "Unranked"),
            "highest_division": reload_track.get("highest_division", 0),
            "game_mode": reload_track.get("game_mode", "Reload Build"),
            "season_end": reload_track.get("season_end"),
        }


class FortniteLevelSensor(FortniteEntity, SensorEntity):
    """Sensor for Season Level and Battle Pass tier."""

    _attr_icon = "mdi:star-circle"
    _attr_state_class = SensorStateClass.MEASUREMENT

    def __init__(self, coordinator: Any, player_id: str, player_name: str) -> None:
        """Initialize the sensor (profile coordinator: needs the player's linked Epic account)."""
        super().__init__(coordinator, "sensor", player_id, player_name, "level")
        self._attr_name = "Level"

    @property
    def available(self) -> bool:
        """Level needs an Epic player token; unavailable when the API withholds it."""
        return super().available and bool(self.player_data.get("level"))

    @property
    def native_value(self) -> int | None:
        """Return season level."""
        level = self.player_data.get("level") or {}
        return level.get("level")

    @property
    def _extra_attributes(self) -> dict[str, Any]:
        """Return tier, XP, and account level."""
        level = self.player_data.get("level") or {}
        return {
            "tier": level.get("tier", 0),
            "xp": level.get("xp", 0),
            "account_level": level.get("account_level", 0),
        }


class FortniteLastPlayedSensor(FortniteEntity, SensorEntity):
    """When the player last finished a match (from stats lastmodified), for automations."""

    _attr_icon = "mdi:clock-check-outline"
    _attr_device_class = SensorDeviceClass.TIMESTAMP

    def __init__(self, coordinator: FortniteDataUpdateCoordinator, player_id: str, player_name: str) -> None:
        """Initialize the sensor."""
        super().__init__(coordinator, "sensor", player_id, player_name, "last_played")
        self._attr_name = "Last Played"

    @property
    def _last(self) -> dict[str, Any]:
        return (self.player_data.get("metrics") or {}).get("last_played") or {}

    @property
    def native_value(self) -> datetime | None:
        """Return the last match timestamp."""
        value = self._last.get("time")
        return datetime.fromisoformat(value) if value else None

    @property
    def _extra_attributes(self) -> dict[str, Any]:
        return {"playlist_id": self._last.get("playlist_id"), "mode_name": self._last.get("name")}


class FortniteProfileSensor(FortniteEntity, SensorEntity):
    """Epic display name, linked platforms, season and time-windowed stats."""

    _attr_icon = "mdi:account-star"
    _unrecorded_attributes = frozenset({"windows", "window_labels", "season", "platforms"})

    def __init__(self, coordinator: Any, player_id: str, player_name: str) -> None:
        """Initialize the sensor."""
        super().__init__(coordinator, "sensor", player_id, player_name, "profile")
        self._attr_name = "Profile"
        self._fallback_name = player_name

    @property
    def native_value(self) -> str:
        """Return the Epic display name (or configured name until it is known)."""
        return self.player_data.get("display_name") or self._fallback_name

    @property
    def _extra_attributes(self) -> dict[str, Any]:
        return {
            "display_name": self.player_data.get("display_name"),
            "platforms": self.player_data.get("platforms"),
            "season": self.coordinator.season,
            "windows": self.player_data.get("windows") or {},
            "window_labels": self.player_data.get("window_labels") or {},
            "epic_link": (self.player_data.get("epic") or {}).get("status", "unlinked"),
            "capabilities": (self.coordinator.capabilities or {}).get(self.player_id),
            # State counts only: the quests payload has no names, targets or rewards
            "quests": self.player_data.get("quests"),
            # Equipped outfit (Epic Locker) and owned-outfit count (Epic athena); the list is served over websocket
            "outfits": self.player_data.get("outfits"),
        }


class FortniteSpritesSensor(FortniteEntity, SensorEntity):
    """Current-season Sprite collection completion (needs a linked Epic account)."""

    _attr_icon = "mdi:ghost-outline"
    _attr_state_class = SensorStateClass.MEASUREMENT
    _attr_native_unit_of_measurement = "%"
    _unrecorded_attributes = frozenset({"families", "cumulative", "versions"})

    def __init__(self, coordinator: Any, player_id: str, player_name: str) -> None:
        """Initialize the sensor."""
        super().__init__(coordinator, "sensor", player_id, player_name, "sprites")
        self._attr_name = "Sprites"

    @property
    def _sprites(self) -> dict[str, Any]:
        return self.player_data.get("sprites") or {}

    @property
    def available(self) -> bool:
        return super().available and bool(self._sprites.get("current"))

    @property
    def native_value(self) -> float | None:
        current = self._sprites.get("current") or {}
        return current.get("completion_pct")

    @property
    def _extra_attributes(self) -> dict[str, Any]:
        current = self._sprites.get("current") or {}
        cumulative = self._sprites.get("cumulative") or {}
        return {
            "version": current.get("version"),
            "owned_variants": current.get("owned_variants"),
            "total_variants": current.get("total_variants"),
            "owned_families": current.get("owned_families"),
            "total_families": current.get("total_families"),
            "mastered_variants": current.get("mastered_variants"),
            "complete_families": current.get("complete_families"),
            "level_curve": ((self.coordinator.sprite_catalogue or {}).get("level_curve_raw")) or [],
            "equipped": current.get("equipped"),
            "currency": current.get("currency", []),
            "families": current.get("families", []),
            # Deduplicated across versions by the provider; never a sum of per-version totals
            "cumulative": {k: v for k, v in cumulative.items() if k != "versions"} or None,
            "versions": cumulative.get("versions", []),
        }


class FortnitePowerRankingSensor(FortniteEntity, SensorEntity):
    """Competitive Power Ranking position as returned by the provider (needs a linked Epic account)."""

    _attr_icon = "mdi:podium"
    _attr_state_class = SensorStateClass.MEASUREMENT

    def __init__(self, coordinator: Any, player_id: str, player_name: str) -> None:
        """Initialize the sensor."""
        super().__init__(coordinator, "sensor", player_id, player_name, "power_ranking")
        self._attr_name = "Power Ranking"

    @property
    def available(self) -> bool:
        return super().available and bool(self.player_data.get("power_ranking"))

    @property
    def native_value(self) -> int | None:
        return (self.player_data.get("power_ranking") or {}).get("rank")

    @property
    def _extra_attributes(self) -> dict[str, Any]:
        ranking = self.player_data.get("power_ranking") or {}
        return {
            "points": ranking.get("points"),
            "pr": ranking.get("pr"),
            "peak_pr": ranking.get("peak_pr"),
            "delta_pr": ranking.get("delta_pr"),
            "peak_performance": ranking.get("peak_performance"),
            "counting_events": ranking.get("counting_events"),
            "event_id": ranking.get("event_id"),
        }


class FortniteLadderSensor(FortniteEntity, SensorEntity):
    """Ranked ladder position as one number (division x 100 + progress %), for trend charts."""

    _attr_icon = "mdi:stairs-up"
    _attr_state_class = SensorStateClass.MEASUREMENT

    def __init__(self, coordinator: Any, player_id: str, player_name: str, track: str, name: str, key: str) -> None:
        super().__init__(coordinator, "sensor", player_id, player_name, key)
        self._attr_name = name
        self._track = track

    @property
    def _data(self) -> dict[str, Any]:
        return (self.player_data.get("ranked") or {}).get(self._track) or {}

    @property
    def native_value(self) -> float | None:
        t = self._data
        if not t or t.get("current_rank") in (None, "Unranked"):
            return None
        return round(float(t.get("current_division", 0)) * 100 + float(t.get("progress_pct", 0.0)), 1)

    @property
    def _extra_attributes(self) -> dict[str, Any]:
        return {"rank": self._data.get("current_rank"), "progress_pct": self._data.get("progress_pct")}


class FortniteUnrealPositionSensor(FortniteEntity, SensorEntity):
    """Unreal leaderboard placement (lower is better); unavailable when not Unreal, so statistics get no zeros."""

    _attr_icon = "mdi:crown"
    _attr_state_class = SensorStateClass.MEASUREMENT

    def __init__(self, coordinator: Any, player_id: str, player_name: str, track: str, name: str, key: str) -> None:
        super().__init__(coordinator, "sensor", player_id, player_name, key)
        self._attr_name = name
        self._track = track

    @property
    def _position(self) -> int | None:
        value = ((self.player_data.get("ranked") or {}).get(self._track) or {}).get("unreal_rank")
        return value if isinstance(value, int) and value > 0 else None

    @property
    def available(self) -> bool:
        return super().available and self._position is not None

    @property
    def native_value(self) -> int | None:
        return self._position


class FortniteSeasonStatSensor(FortniteEntity, SensorEntity):
    """Season-window K/D or win rate (from the stats API startTime window), for trend charts."""

    _attr_icon = "mdi:chart-line"
    _attr_state_class = SensorStateClass.MEASUREMENT

    def __init__(self, coordinator: Any, player_id: str, player_name: str, field: str, name: str, key: str, unit: str | None) -> None:
        super().__init__(coordinator, "sensor", player_id, player_name, key)
        self._attr_name = name
        self._field = field
        self._attr_native_unit_of_measurement = unit

    @property
    def _season(self) -> dict[str, Any] | None:
        return (self.player_data.get("windows") or {}).get("season")

    @property
    def available(self) -> bool:
        return super().available and bool(self._season)

    @property
    def native_value(self) -> float | None:
        return (self._season or {}).get(self._field)


class FortniteVBucksSensor(FortniteEntity, SensorEntity):
    """V-Bucks balance reported by the provider's inventory route (needs a linked Epic account)."""

    _attr_icon = "mdi:hand-coin"
    _attr_state_class = SensorStateClass.MEASUREMENT
    _attr_native_unit_of_measurement = "V-Bucks"

    def __init__(self, coordinator: Any, player_id: str, player_name: str) -> None:
        super().__init__(coordinator, "sensor", player_id, player_name, "vbucks")
        self._attr_name = "V-Bucks"

    @property
    def _wallet(self) -> dict[str, Any]:
        return self.player_data.get("wallet") or {}

    @property
    def available(self) -> bool:
        return super().available and isinstance(self._wallet.get("vbucks"), int)

    @property
    def native_value(self) -> int | None:
        return self._wallet.get("vbucks")

    @property
    def _extra_attributes(self) -> dict[str, Any]:
        inventory = self.player_data.get("inventory") or {}
        return {
            "source": "Epic common_core (read-only QueryProfile)",
            "by_kind": self._wallet.get("by_kind"),
            "mtx_platform": self._wallet.get("mtx_platform"),
            "other_platform_vbucks": self._wallet.get("other_platform_vbucks"),
            "crew": self._wallet.get("crew"),
            "profile_updated": self._wallet.get("profile_updated"),
            # Provider stash value kept for comparison only (unverified as V-Bucks)
            "provider_globalcash": (inventory.get("balances") or {}).get("globalcash"),
        }
