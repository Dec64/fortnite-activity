"""Slow-cadence coordinator for profile, catalogue and tournament data.

Kept separate from the match-polling coordinator so a failing or slow profile
endpoint can never delay or break session tracking. Every fetch is guarded:
failures keep the previous value (or None) and are logged once per outage.
"""

from __future__ import annotations

from datetime import datetime, timedelta, timezone
import logging
from typing import Any, Awaitable, Callable

try:
    from homeassistant.core import HomeAssistant
    from homeassistant.helpers.update_coordinator import DataUpdateCoordinator
    from homeassistant.util import dt as dt_util
except ImportError:
    from .coordinator import DataUpdateCoordinator  # type: ignore[attr-defined]

    HomeAssistant = Any  # type: ignore
    dt_util = None  # type: ignore

from .api.api_fortnite import ApiFortniteClient, FortniteApiError
from .const import (
    CATALOGUE_REFRESH_HOURS,
    CONF_ACCOUNT_ID,
    CONF_EPIC_DEVICE,
    CONF_PLAYER_ID,
    CONF_PLAYER_NAME,
    DOMAIN,
    PROFILE_REFRESH_MINUTES,
    TOURNAMENT_REFRESH_HOURS,
)
from .epic_auth import EpicAuthError, EpicReauthRequired, EpicTokenManager
from .profile import (
    compute_window,
    parse_display_name,
    parse_external_auths,
    parse_playlists,
    parse_power_ranking,
    parse_season,
    parse_sprite_collection,
    parse_sprite_collection_all,
    parse_sprite_versions,
    parse_tournaments,
    window_is_valid,
)

_LOGGER = logging.getLogger(__name__)

WINDOW_LABELS = {
    "today": "Today (since local midnight)",
    "week": "Last 7 days",
    "season": "This season",
}


class FortniteProfileCoordinator(DataUpdateCoordinator[dict[str, Any]]):
    """Fetches season, playlist catalogue, account info, windowed stats and tournaments."""

    def __init__(
        self,
        hass: HomeAssistant,
        api_client: ApiFortniteClient,
        players_config: list[dict[str, Any]],
        region: str,
        lifetime_matches: Callable[[str], int],
        on_relink_required: Callable[[str, str], None] | None = None,
    ) -> None:
        self.api_client = api_client
        self.players_config = players_config
        self.region = region
        self._lifetime_matches = lifetime_matches

        self.season: dict[str, Any] | None = None
        self.playlists: dict[str, dict[str, Any]] = {}
        self.tournaments: list[dict[str, Any]] | None = None
        self._raw_events: Any = None
        self._fetched_at: dict[str, datetime] = {}
        self._failing: set[str] = set()
        self._players: dict[str, dict[str, Any]] = {}
        self.sprite_version: str | None = None

        # Epic player tokens for players who linked their account (device auth)
        self.token_managers: dict[str, EpicTokenManager] = {}
        for p in players_config:
            device = p.get(CONF_EPIC_DEVICE) or {}
            if device.get("device_id") and device.get("secret"):
                pid = p[CONF_PLAYER_ID]
                self.token_managers[pid] = EpicTokenManager(
                    api_client, p[CONF_ACCOUNT_ID], device["device_id"], device["secret"],
                    on_reauth_required=(
                        (lambda pid=pid, name=p.get(CONF_PLAYER_NAME, pid): on_relink_required(pid, name))
                        if on_relink_required else None
                    ),
                )

        super().__init__(
            hass,
            _LOGGER,
            name=f"{DOMAIN}_profile",
            update_interval=timedelta(minutes=PROFILE_REFRESH_MINUTES),
        )

    # ---- helpers -------------------------------------------------------

    def _stale(self, key: str, max_age: timedelta, now: datetime) -> bool:
        fetched = self._fetched_at.get(key)
        return fetched is None or now - fetched >= max_age

    async def _guarded(self, key: str, fetch: Callable[[], Awaitable[Any]]) -> tuple[bool, Any]:
        """Run a fetch; log the first failure of an outage and return (ok, value)."""
        try:
            value = await fetch()
        except FortniteApiError as err:
            if key not in self._failing:
                _LOGGER.warning("Fortnite profile data '%s' unavailable: %s", key, err)
                self._failing.add(key)
            return False, None
        except Exception:  # noqa: BLE001 - never let profile data break the integration
            if key not in self._failing:
                _LOGGER.exception("Unexpected error fetching Fortnite profile data '%s'", key)
                self._failing.add(key)
            return False, None
        if key in self._failing:
            _LOGGER.info("Fortnite profile data '%s' available again", key)
            self._failing.discard(key)
        return True, value

    @staticmethod
    def _now() -> datetime:
        return datetime.now(timezone.utc)

    @staticmethod
    def _local_midnight(now: datetime) -> datetime:
        if dt_util:
            return dt_util.start_of_local_day(dt_util.as_local(now))
        return now.astimezone().replace(hour=0, minute=0, second=0, microsecond=0)

    def _window_starts(self, now: datetime) -> dict[str, int]:
        starts = {
            "today": int(self._local_midnight(now).timestamp()),
            "week": int((now - timedelta(days=7)).timestamp()),
        }
        if self.season:
            starts["season"] = int(datetime.fromisoformat(self.season["begin"]).timestamp())
        return starts

    # ---- update --------------------------------------------------------

    async def _async_update_data(self) -> dict[str, Any]:
        now = self._now()
        catalogue_age = timedelta(hours=CATALOGUE_REFRESH_HOURS)

        if self._stale("season", catalogue_age, now) or (
            self.season and datetime.fromisoformat(self.season["end"]) <= now
        ):
            ok, raw = await self._guarded("season", self.api_client.get_season)
            if ok:
                self.season = parse_season(raw, now)
                self._fetched_at["season"] = now
        elif self.season:
            # Keep countdown fresh between catalogue refreshes
            self.season = {**self.season, "days_left": max(0, (datetime.fromisoformat(self.season["end"]) - now).days)}

        if self._stale("playlists", catalogue_age, now):
            ok, raw = await self._guarded("playlists", self.api_client.get_playlists)
            if ok:
                parsed = parse_playlists(raw)
                if parsed:
                    self.playlists = parsed
                self._fetched_at["playlists"] = now

        if self._stale("tournaments", timedelta(hours=TOURNAMENT_REFRESH_HOURS), now):
            ok, raw = await self._guarded("tournaments", self.api_client.get_events_global)
            if ok:
                self._raw_events = raw
                self._fetched_at["tournaments"] = now
        if self._raw_events is not None:
            self.tournaments = parse_tournaments(self._raw_events, now)

        if self.token_managers and self._stale("sprite_version", catalogue_age, now):
            ok, raw = await self._guarded("sprite_version", self.api_client.get_sprite_versions)
            if ok:
                self.sprite_version = parse_sprite_versions(raw) or self.sprite_version
                self._fetched_at["sprite_version"] = now

        starts = self._window_starts(now)
        for p in self.players_config:
            await self._async_update_player(p[CONF_PLAYER_ID], p[CONF_ACCOUNT_ID], now, starts)
            await self._async_update_private(p[CONF_PLAYER_ID], p[CONF_ACCOUNT_ID], now)

        return {pid: dict(info) for pid, info in self._players.items()}

    async def _async_update_player(
        self, player_id: str, account_id: str, now: datetime, starts: dict[str, int]
    ) -> None:
        info = self._players.setdefault(
            player_id, {"display_name": None, "platforms": None, "windows": {}, "window_labels": WINDOW_LABELS}
        )
        catalogue_age = timedelta(hours=CATALOGUE_REFRESH_HOURS)

        key = f"account:{player_id}"
        if self._stale(key, catalogue_age, now):
            ok, raw = await self._guarded(key, lambda: self.api_client.get_account(account_id))
            if ok:
                info["display_name"] = parse_display_name(raw)
                self._fetched_at[key] = now

        key = f"platforms:{player_id}"
        if self._stale(key, catalogue_age, now):
            ok, raw = await self._guarded(key, lambda: self.api_client.get_external_auths(account_id))
            if ok:
                info["platforms"] = parse_external_auths(raw)
                self._fetched_at[key] = now

        lifetime = self._lifetime_matches(player_id)
        windows: dict[str, Any] = {}
        for name, start in starts.items():
            key = f"window:{name}:{player_id}"
            ok, raw = await self._guarded(key, lambda s=start: self.api_client.get_raw_stats(account_id, start_time=s))
            if not ok or not isinstance(raw, dict):
                windows[name] = info["windows"].get(name)  # keep last good value
                continue
            parsed = ApiFortniteClient.parse_stats(raw)
            window = compute_window(parsed)
            if window_is_valid(raw, start, window["matches"], lifetime):
                windows[name] = {**window, "since": datetime.fromtimestamp(start, tz=timezone.utc).isoformat()}
            else:
                if key not in self._failing:
                    _LOGGER.warning("Stats API ignored startTime for the '%s' window; hiding it", name)
                    self._failing.add(key)
                windows[name] = None
        info["windows"] = windows

    async def _async_update_private(self, player_id: str, account_id: str, now: datetime) -> None:
        """Level, Power Ranking and Sprites, which need the player's own Epic token."""
        info = self._players.setdefault(player_id, {})
        manager = self.token_managers.get(player_id)
        if manager is None:
            info["epic"] = {"status": "unlinked"}
            return
        try:
            token = await manager.async_get_token()
        except EpicReauthRequired:
            info["epic"] = {"status": "relink_required"}
            info.pop("level", None)
            return
        except EpicAuthError as err:
            if f"token:{player_id}" not in self._failing:
                _LOGGER.warning("Epic token for %s unavailable: %s", player_id, err)
                self._failing.add(f"token:{player_id}")
            info.setdefault("epic", {"status": "error"})
            return
        self._failing.discard(f"token:{player_id}")
        info["epic"] = {"status": "linked"}

        ok, raw = await self._guarded(f"level:{player_id}", lambda: self.api_client.get_raw_level(account_id, token))
        if ok:
            info["level"] = ApiFortniteClient.parse_level(raw)

        ok, raw = await self._guarded(f"power:{player_id}", lambda: self.api_client.get_power_ranking(account_id, token))
        if ok:
            info["power_ranking"] = parse_power_ranking(raw)

        ok, raw = await self._guarded(
            f"sprites:{player_id}", lambda: self.api_client.get_sprite_collection(token, self.sprite_version)
        )
        if ok:
            current = parse_sprite_collection(raw)
            if current:
                info["sprites"] = {**(info.get("sprites") or {}), "current": current}

        key = f"sprites_all:{player_id}"
        if self._stale(key, timedelta(hours=6), now):
            ok, raw = await self._guarded(key, lambda: self.api_client.get_sprite_collection_all(token))
            if ok:
                cumulative = parse_sprite_collection_all(raw)
                if cumulative:
                    info["sprites"] = {**(info.get("sprites") or {}), "cumulative": cumulative}
                self._fetched_at[key] = now

    def playlist_info(self, playlist_id: str) -> dict[str, Any] | None:
        """Look up catalogue name/image for a stats playlist id."""
        return self.playlists.get(playlist_id.lower())
