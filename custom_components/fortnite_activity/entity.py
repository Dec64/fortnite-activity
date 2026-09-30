"""Base entity class for Fortnite Family Tracker."""

from __future__ import annotations

from typing import Any

try:
    from homeassistant.helpers.device_registry import DeviceInfo
    from homeassistant.helpers.update_coordinator import CoordinatorEntity
except ImportError:
    class CoordinatorEntity:  # type: ignore
        def __init__(self, coordinator: Any) -> None:
            self.coordinator = coordinator

        def __class_getitem__(cls, item: Any) -> Any:
            return cls

    class DeviceInfo(dict):  # type: ignore
        def __init__(self, **kwargs: Any) -> None:
            super().__init__(**kwargs)

from .const import DOMAIN
from .coordinator import FortniteDataUpdateCoordinator


class FortniteEntity(CoordinatorEntity[FortniteDataUpdateCoordinator]):
    """Base class for all Fortnite Family Tracker entities."""

    _attr_has_entity_name = True

    def __init__(
        self,
        coordinator: FortniteDataUpdateCoordinator,
        platform: str,
        player_id: str,
        player_name: str,
        key: str,
    ) -> None:
        """Initialize the base entity."""
        super().__init__(coordinator)
        self.player_id = player_id
        self.player_name = player_name
        self.entity_key = key
        self.entity_id = f"{platform}.fortnite_{player_id}_{key}"

        self._attr_unique_id = f"{DOMAIN}_{player_id}_{key}"
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, player_id)},
            name=f"Fortnite - {player_name}",
            manufacturer="Epic Games / api-fortnite.com",
            model="Player Tracker",
            entry_type=None,
        )

    @property
    def player_data(self) -> dict[str, Any]:
        """Return the current player data dictionary from coordinator."""
        if not self.coordinator.data or self.player_id not in self.coordinator.data:
            return {}
        return self.coordinator.data[self.player_id]
