"""Binary sensor platform for Fortnite Family Tracker."""

from __future__ import annotations

from typing import Any

try:
    from homeassistant.components.binary_sensor import BinarySensorEntity
    from homeassistant.config_entries import ConfigEntry
    from homeassistant.core import HomeAssistant
    from homeassistant.helpers.entity_platform import AddEntitiesCallback
except ImportError:
    class BinarySensorEntity:  # type: ignore
        pass
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
    """Set up Fortnite Family binary sensors based on a config entry."""
    coordinator: FortniteDataUpdateCoordinator = hass.data[DOMAIN][entry.entry_id]
    players = entry.data.get(CONF_PLAYERS, [])

    entities: list[BinarySensorEntity] = []
    for p in players:
        p_id = p[CONF_PLAYER_ID]
        p_name = p.get(CONF_PLAYER_NAME, p_id.capitalize())
        entities.append(FortnitePlayingBinarySensor(coordinator, p_id, p_name))

    async_add_entities(entities)


class FortnitePlayingBinarySensor(FortniteEntity, BinarySensorEntity):
    """Binary sensor indicating if a player is actively in a Fortnite session."""

    _attr_icon = "mdi:controller"

    def __init__(self, coordinator: FortniteDataUpdateCoordinator, player_id: str, player_name: str) -> None:
        """Initialize the binary sensor."""
        super().__init__(coordinator, player_id, player_name, "playing")
        self._attr_name = f"{player_name} Playing"

    @property
    def is_on(self) -> bool:
        """Return true if player is currently in an active session."""
        return bool(self.player_data.get("is_playing", False))

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """Return active session summary."""
        session = self.player_data.get("session")
        if not session:
            return {"active": False}
        summary = session.get("summary", {})
        return {
            "session_id": session.get("session_id"),
            "duration_minutes": session.get("duration_minutes", 0),
            "matches_in_session": summary.get("matches_played", 0),
            "wins_in_session": summary.get("wins", 0),
            "kills_in_session": summary.get("kills", 0),
        }
