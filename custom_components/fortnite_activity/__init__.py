"""Fortnite Family Tracker custom integration."""

from __future__ import annotations

import logging
from typing import Any

from pathlib import Path

try:
    from homeassistant.config_entries import ConfigEntry
    from homeassistant.core import HomeAssistant, ServiceCall
    from homeassistant.helpers import config_validation as cv
    from homeassistant.components.frontend import add_extra_js_url
    from homeassistant.components.http import StaticPathConfig
except ImportError:
    ConfigEntry = Any  # type: ignore
    HomeAssistant = Any  # type: ignore
    ServiceCall = Any  # type: ignore
    cv = Any  # type: ignore
    add_extra_js_url = None  # type: ignore
    StaticPathConfig = None  # type: ignore

from .api.api_fortnite import ApiFortniteClient
from .const import CONF_API_KEY, DOMAIN
from .coordinator import FortniteDataUpdateCoordinator
from .storage import FortniteStorage
from .websocket_api import async_setup_websocket_api

_LOGGER = logging.getLogger(__name__)

PLATFORMS = ["sensor", "binary_sensor"]

CARD_URL = "/fortnite_activity_static/fortnite-activity-card.js"
CARD_PATH = Path(__file__).parent / "frontend" / "fortnite-activity-card.js"


async def _async_register_frontend_card(hass: HomeAssistant) -> None:
    """Register custom card static path and auto-load into Lovelace frontend."""
    if not CARD_PATH.exists():
        return

    if hasattr(hass, "http"):
        try:
            if hasattr(hass.http, "async_register_static_paths") and StaticPathConfig:
                await hass.http.async_register_static_paths([
                    StaticPathConfig(CARD_URL, str(CARD_PATH), cache_headers=False)
                ])
            elif hasattr(hass.http, "register_static_path"):
                hass.http.register_static_path(CARD_URL, str(CARD_PATH), cache_headers=False)
        except Exception as err:
            _LOGGER.debug("Card static path registration: %s", err)

    if add_extra_js_url:
        try:
            add_extra_js_url(hass, CARD_URL)
        except Exception as err:
            _LOGGER.debug("Card extra JS URL registration: %s", err)


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up Fortnite Family Tracker from a config entry."""
    hass.data.setdefault(DOMAIN, {})

    api_key = entry.data[CONF_API_KEY]
    api_client = ApiFortniteClient(api_key=api_key)

    storage = FortniteStorage(hass)
    await storage.async_load()

    coordinator = FortniteDataUpdateCoordinator(
        hass=hass,
        api_client=api_client,
        entry_data=entry.data,
        entry_options=entry.options,
        storage=storage,
    )

    await coordinator.async_config_entry_first_refresh()

    hass.data[DOMAIN][entry.entry_id] = coordinator

    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)

    # Auto-register frontend card
    await _async_register_frontend_card(hass)

    # Register WebSocket API
    async_setup_websocket_api(hass)

    # Register Services
    async def handle_start_session(call: ServiceCall) -> None:
        """Handle start_session service."""
        player_id = call.data["player_id"].strip().lower()
        res = coordinator.start_player_session(player_id)
        if res:
            _LOGGER.info("Manually started Fortnite session for %s", player_id)
            coordinator.async_set_updated_data(coordinator.data)

    async def handle_end_session(call: ServiceCall) -> None:
        """Handle end_session service."""
        player_id = call.data["player_id"].strip().lower()
        res = coordinator.end_player_session(player_id)
        if res:
            _LOGGER.info("Manually ended Fortnite session for %s", player_id)
            coordinator.async_set_updated_data(coordinator.data)

    async def handle_refresh_player(call: ServiceCall) -> None:
        """Handle refresh_player service."""
        await coordinator.async_request_refresh()

    hass.services.async_register(DOMAIN, "start_session", handle_start_session)
    hass.services.async_register(DOMAIN, "end_session", handle_end_session)
    hass.services.async_register(DOMAIN, "refresh_player", handle_refresh_player)

    entry.async_on_unload(entry.add_update_listener(update_listener))
    return True


async def update_listener(hass: HomeAssistant, entry: ConfigEntry) -> None:
    """Handle options update."""
    await hass.config_entries.async_reload(entry.entry_id)


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    unload_ok = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if unload_ok:
        coordinator: FortniteDataUpdateCoordinator = hass.data[DOMAIN].pop(entry.entry_id)
        await coordinator.api_client.close()

    if not hass.data[DOMAIN]:
        hass.services.async_remove(DOMAIN, "start_session")
        hass.services.async_remove(DOMAIN, "end_session")
        hass.services.async_remove(DOMAIN, "refresh_player")

    return unload_ok
