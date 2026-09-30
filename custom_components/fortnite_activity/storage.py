"""Storage helper for persisting session history."""

from __future__ import annotations

import logging
from typing import Any

try:
    from homeassistant.core import HomeAssistant
    from homeassistant.helpers.storage import Store
except ImportError:
    HomeAssistant = Any  # type: ignore
    Store = None  # type: ignore

STORAGE_VERSION = 1
STORAGE_KEY = "fortnite_activity_sessions"

_LOGGER = logging.getLogger(__name__)


class FortniteStorage:
    """Handles saving and loading session history per player."""

    def __init__(self, hass: HomeAssistant) -> None:
        """Initialize the storage helper."""
        self.hass = hass
        self._store = Store(hass, STORAGE_VERSION, STORAGE_KEY) if Store else None
        self._data: dict[str, Any] = {}

    async def async_load(self) -> dict[str, Any]:
        """Load session history from storage."""
        if not self._store:
            return {}
        try:
            data = await self._store.async_load()
            self._data = data if isinstance(data, dict) else {}
            return self._data
        except Exception as err:
            _LOGGER.warning("Could not load Fortnite session storage: %s", err)
            return {}

    async def async_save(self) -> None:
        """Save session history to storage."""
        if not self._store:
            return
        try:
            await self._store.async_save(self._data)
        except Exception as err:
            _LOGGER.warning("Could not save Fortnite session storage: %s", err)

    def get_player_history(self, player_id: str) -> list[dict[str, Any]]:
        """Get archived sessions for a player."""
        return self._data.get(player_id, [])

    def set_player_history(self, player_id: str, history: list[dict[str, Any]]) -> None:
        """Set archived sessions for a player."""
        self._data[player_id] = history
