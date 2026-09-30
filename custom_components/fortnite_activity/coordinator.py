"""DataUpdateCoordinator for Fortnite Family Tracker."""

from __future__ import annotations

from datetime import timedelta
import logging
from typing import Any

try:
    from homeassistant.core import HomeAssistant
    from homeassistant.helpers.update_coordinator import DataUpdateCoordinator, UpdateFailed
except ImportError:
    HomeAssistant = Any  # type: ignore

    class DataUpdateCoordinator:  # type: ignore
        def __init__(self, hass: Any, logger: Any, name: str, update_interval: Any = None) -> None:
            self.hass = hass
            self.logger = logger
            self.name = name
            self.update_interval = update_interval
            self.data: Any = None

        def __class_getitem__(cls, item: Any) -> Any:
            return cls

    class UpdateFailed(Exception):  # type: ignore
        pass

from .api.api_fortnite import ApiFortniteClient, FortniteApiError
from .const import (
    CONF_ACCOUNT_ID,
    CONF_ACTIVE_INTERVAL,
    CONF_IDLE_INTERVAL,
    CONF_INACTIVITY_TIMEOUT,
    CONF_PLAYERS,
    CONF_PLAYER_ID,
    CONF_PLAYER_NAME,
    DEFAULT_ACTIVE_INTERVAL,
    DEFAULT_IDLE_INTERVAL,
    DEFAULT_INACTIVITY_TIMEOUT,
    DOMAIN,
)
from .session_manager import FortniteSessionManager
from .storage import FortniteStorage

_LOGGER = logging.getLogger(__name__)


class FortniteDataUpdateCoordinator(DataUpdateCoordinator[dict[str, Any]]):
    """Coordinator to manage fetching Fortnite data and tracking sessions."""

    def __init__(
        self,
        hass: HomeAssistant,
        api_client: ApiFortniteClient,
        entry_data: dict[str, Any],
        entry_options: dict[str, Any],
        storage: FortniteStorage,
    ) -> None:
        """Initialize the coordinator."""
        self.api_client = api_client
        self.storage = storage

        self.active_interval = entry_options.get(CONF_ACTIVE_INTERVAL, DEFAULT_ACTIVE_INTERVAL)
        self.idle_interval = entry_options.get(CONF_IDLE_INTERVAL, DEFAULT_IDLE_INTERVAL)
        self.inactivity_timeout = entry_options.get(CONF_INACTIVITY_TIMEOUT, DEFAULT_INACTIVITY_TIMEOUT)

        self.players_config = entry_data.get(CONF_PLAYERS, [])
        self.session_managers: dict[str, FortniteSessionManager] = {}

        # Initialize session managers with loaded history
        for p in self.players_config:
            p_id = p[CONF_PLAYER_ID]
            p_name = p.get(CONF_PLAYER_NAME, p_id.capitalize())
            history = storage.get_player_history(p_id)
            self.session_managers[p_id] = FortniteSessionManager(
                player_id=p_id,
                player_name=p_name,
                inactivity_timeout_minutes=self.inactivity_timeout,
                history=history,
            )

        super().__init__(
            hass,
            _LOGGER,
            name=DOMAIN,
            update_interval=timedelta(seconds=self.idle_interval),
        )

    async def _async_update_data(self) -> dict[str, Any]:
        """Fetch stats, ranks, and level for all tracked players."""
        results: dict[str, Any] = {}
        any_active = False

        for p in self.players_config:
            p_id = p[CONF_PLAYER_ID]
            account_id = p[CONF_ACCOUNT_ID]
            manager = self.session_managers[p_id]

            try:
                raw_stats = await self.api_client.get_raw_stats(account_id)
                raw_ranked = await self.api_client.get_raw_ranked(account_id)
                try:
                    raw_level = await self.api_client.get_raw_level(account_id)
                except FortniteApiError as level_err:
                    _LOGGER.debug("Level data unavailable for %s: %s", p_id, level_err)
                    raw_level = {}

                parsed_stats = ApiFortniteClient.parse_stats(raw_stats)
                parsed_ranked = ApiFortniteClient.parse_ranked(raw_ranked)
                parsed_level = ApiFortniteClient.parse_level(raw_level)

                # Process match detection and update session
                new_matches = manager.update_and_detect_matches(parsed_stats, parsed_ranked)
                if new_matches:
                    _LOGGER.info(
                        "Detected %d new match(es) for %s in current session",
                        len(new_matches),
                        manager.player_name,
                    )
                    # Persist updated session history
                    self.storage.set_player_history(p_id, manager.history)
                    await self.storage.async_save()

                if manager.is_active:
                    any_active = True

                results[p_id] = {
                    "player_id": p_id,
                    "player_name": manager.player_name,
                    "stats": parsed_stats,
                    "ranked": parsed_ranked,
                    "level": parsed_level,
                    "session": manager.active_session,
                    "last_session": manager.get_latest_session_summary(),
                    "is_playing": manager.is_active,
                }

            except FortniteApiError as err:
                _LOGGER.error("Error fetching data for %s (%s): %s", p_id, account_id, err)
                if self.data and p_id in self.data:
                    # Keep previous data on transient errors
                    results[p_id] = self.data[p_id]
                else:
                    raise UpdateFailed(f"Failed to fetch Fortnite data for {p_id}: {err}") from err

        # Adaptive polling interval adjustment
        if any_active:
            target_interval = timedelta(seconds=self.active_interval)
            if self.update_interval != target_interval:
                _LOGGER.info("Player actively in session. Setting fast polling to %ds", self.active_interval)
                self.update_interval = target_interval
        else:
            target_interval = timedelta(seconds=self.idle_interval)
            if self.update_interval != target_interval:
                _LOGGER.info("All players idle. Setting slow polling to %ds", self.idle_interval)
                self.update_interval = target_interval

        return results

    def start_player_session(self, player_id: str) -> dict[str, Any] | None:
        """Manually trigger session start for a player."""
        if player_id not in self.session_managers or not self.data or player_id not in self.data:
            return None
        manager = self.session_managers[player_id]
        p_data = self.data[player_id]
        session = manager.start_session(p_data["stats"], p_data["ranked"])
        self.update_interval = timedelta(seconds=self.active_interval)
        return session

    def end_player_session(self, player_id: str) -> dict[str, Any] | None:
        """Manually trigger session end for a player."""
        if player_id not in self.session_managers:
            return None
        manager = self.session_managers[player_id]
        ended = manager.end_session()
        self.storage.set_player_history(player_id, manager.history)
        return ended
