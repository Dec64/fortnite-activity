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
        self._data: dict[str, Any] = {
            "history": {}, "active": {}, "avatars": {}, "wishlist": {}, "favorites": {}, "first_seen": {}, "notified": [],
            "sprite_catalogues": {},
        }

    async def async_load(self) -> dict[str, Any]:
        """Load session history from storage."""
        if not self._store:
            return {}
        try:
            data = await self._store.async_load()
            data = data if isinstance(data, dict) else {}
            if "history" not in data:
                # v1.0.x layout stored {player_id: [sessions]} at the top level
                data = {"history": data, "active": {}}
            data.setdefault("active", {})
            data.setdefault("avatars", {})
            data.setdefault("wishlist", {})
            data.setdefault("favorites", {})
            data.setdefault("first_seen", {})
            data.setdefault("notified", [])
            data.setdefault("sprite_catalogues", {})
            self._data = data
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
        return self._data["history"].get(player_id, [])

    def set_player_history(self, player_id: str, history: list[dict[str, Any]]) -> None:
        """Set archived sessions for a player."""
        self._data["history"][player_id] = history

    def get_active_session(self, player_id: str) -> dict[str, Any] | None:
        """Get the persisted in-progress session for a player, if any."""
        return self._data["active"].get(player_id)

    def set_active_session(self, player_id: str, state: dict[str, Any] | None) -> None:
        """Persist (or clear) the in-progress session for a player."""
        if state:
            self._data["active"][player_id] = state
        else:
            self._data["active"].pop(player_id, None)

    def get_avatar(self, player_id: str) -> str | None:
        """Owned outfit id chosen as the player's avatar."""
        return self._data["avatars"].get(player_id)

    def set_avatar(self, player_id: str, outfit_id: str | None) -> None:
        """Set (or clear) the player's avatar outfit id (caller saves)."""
        if outfit_id:
            self._data["avatars"][player_id] = outfit_id
        else:
            self._data["avatars"].pop(player_id, None)

    # ---- wishlist / favourites / first seen ----

    def get_wishlist(self, player_id: str) -> list[dict[str, Any]]:
        return list(self._data["wishlist"].get(player_id, []))

    def set_wishlist(self, player_id: str, items: list[dict[str, Any]]) -> None:
        self._data["wishlist"][player_id] = items

    def get_favorites(self, player_id: str) -> list[str]:
        return list(self._data["favorites"].get(player_id, []))

    def set_favorites(self, player_id: str, ids: list[str]) -> None:
        self._data["favorites"][player_id] = ids

    def get_first_seen(self, player_id: str) -> dict[str, str]:
        return dict(self._data["first_seen"].get(player_id, {}))

    def set_first_seen(self, player_id: str, seen: dict[str, str]) -> None:
        self._data["first_seen"][player_id] = seen

    def was_notified(self, key: str) -> bool:
        return key in self._data["notified"]

    def mark_notified(self, key: str) -> None:
        self._data["notified"] = (self._data["notified"] + [key])[-300:]

    def get_sprite_catalogues(self) -> dict[str, dict[str, list[str]]]:
        """Family / variant ids per archived game version (public catalogue, never changes)."""
        return dict(self._data["sprite_catalogues"])

    def set_sprite_catalogue(self, version: str, ids: dict[str, list[str]]) -> None:
        self._data["sprite_catalogues"][version] = ids
