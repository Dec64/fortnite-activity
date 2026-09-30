"""Fortnite Family Tracker custom integration."""

from __future__ import annotations

import logging
from typing import Any

from pathlib import Path

try:
    import voluptuous as vol
    from homeassistant.config_entries import ConfigEntry
    from homeassistant.core import HomeAssistant, ServiceCall
    from homeassistant.exceptions import ServiceValidationError
    from homeassistant.helpers import config_validation as cv
    from homeassistant.helpers.aiohttp_client import async_get_clientsession
    from homeassistant.components.frontend import add_extra_js_url
    from homeassistant.components.http import StaticPathConfig
except ImportError:
    vol = None  # type: ignore
    ConfigEntry = Any  # type: ignore
    HomeAssistant = Any  # type: ignore
    ServiceCall = Any  # type: ignore
    ServiceValidationError = Exception  # type: ignore
    cv = Any  # type: ignore
    async_get_clientsession = None  # type: ignore
    add_extra_js_url = None  # type: ignore
    StaticPathConfig = None  # type: ignore

from .api.api_fortnite import ApiFortniteClient
from .const import (
    CONF_API_KEY,
    CONF_INACTIVITY_TIMEOUT,
    CONF_PLAYERS,
    CONF_REGION,
    DEFAULT_INACTIVITY_TIMEOUT,
    DEFAULT_REGION,
    DOMAIN,
    LEGACY_INACTIVITY_TIMEOUT,
)
from .coordinator import FortniteDataUpdateCoordinator
from .profile_coordinator import FortniteProfileCoordinator
from .storage import FortniteStorage
from .websocket_api import async_setup_websocket_api

_LOGGER = logging.getLogger(__name__)

PLATFORMS = ["sensor", "binary_sensor"]

CARD_URL = "/fortnite_activity_static/fortnite-activity-card.js"
CARD_PATH = Path(__file__).parent / "frontend" / "fortnite-activity-card.js"

# Read manifest version for cache busting
try:
    import json
    _MANIFEST = json.loads((Path(__file__).parent / "manifest.json").read_text())
    _VERSION = _MANIFEST.get("version", "0")
except Exception:
    _VERSION = "0"


async def _async_register_frontend_card(hass: HomeAssistant) -> None:
    """Register custom card static path and auto-load into Lovelace frontend (once per run)."""
    flags = hass.data.setdefault(f"{DOMAIN}_frontend", {})
    if flags.get("registered") or not CARD_PATH.exists():
        return
    flags["registered"] = True

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
            add_extra_js_url(hass, f"{CARD_URL}?v={_VERSION}")
        except Exception as err:
            _LOGGER.debug("Card extra JS URL registration: %s", err)


def _async_raise_relink_issue(hass: HomeAssistant, player_id: str, player_name: str) -> None:
    """Ask the user to link Epic again (never retried automatically)."""
    from homeassistant.helpers import issue_registry as ir

    ir.async_create_issue(
        hass,
        DOMAIN,
        f"epic_relink_{player_id}",
        is_fixable=False,
        severity=ir.IssueSeverity.WARNING,
        translation_key="epic_relink",
        translation_placeholders={"player": player_name},
    )


def _coordinator_for_player(hass: HomeAssistant, player_id: str) -> FortniteDataUpdateCoordinator:
    """Find the coordinator tracking a player across all config entries."""
    for coordinator in hass.data.get(DOMAIN, {}).values():
        if isinstance(coordinator, FortniteDataUpdateCoordinator) and player_id in coordinator.session_managers:
            return coordinator
    raise ServiceValidationError(f"No Fortnite Activity player with id '{player_id}' is configured")


PLAYER_SCHEMA = vol.Schema({vol.Required("player_id"): cv.string}) if vol else None
OPTIONAL_PLAYER_SCHEMA = vol.Schema({vol.Optional("player_id"): cv.string}) if vol else None


async def _async_register_services(hass: HomeAssistant) -> None:
    """Register integration services once; handlers resolve the right coordinator per call."""
    if hass.services.has_service(DOMAIN, "start_session"):
        return

    async def handle_start_session(call: ServiceCall) -> None:
        player_id = call.data["player_id"].strip().lower()
        coordinator = _coordinator_for_player(hass, player_id)
        if not await coordinator.async_start_player_session(player_id):
            raise ServiceValidationError(f"Cannot start a session for '{player_id}' before its first stats update")
        _LOGGER.info("Manually started Fortnite session for %s", player_id)
        coordinator.async_set_updated_data(coordinator.data)

    async def handle_end_session(call: ServiceCall) -> None:
        player_id = call.data["player_id"].strip().lower()
        coordinator = _coordinator_for_player(hass, player_id)
        if await coordinator.async_end_player_session(player_id):
            _LOGGER.info("Manually ended Fortnite session for %s", player_id)
        else:
            _LOGGER.info("No active Fortnite session to end for %s", player_id)
        coordinator.async_set_updated_data(coordinator.data)

    async def handle_refresh_player(call: ServiceCall) -> None:
        player_id = (call.data.get("player_id") or "").strip().lower()
        if player_id:
            await _coordinator_for_player(hass, player_id).async_request_refresh()
            return
        for coordinator in hass.data.get(DOMAIN, {}).values():
            if isinstance(coordinator, FortniteDataUpdateCoordinator):
                await coordinator.async_request_refresh()

    hass.services.async_register(DOMAIN, "start_session", handle_start_session, schema=PLAYER_SCHEMA)
    hass.services.async_register(DOMAIN, "end_session", handle_end_session, schema=PLAYER_SCHEMA)
    hass.services.async_register(DOMAIN, "refresh_player", handle_refresh_player, schema=OPTIONAL_PLAYER_SCHEMA)


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up Fortnite Family Tracker from a config entry."""
    hass.data.setdefault(DOMAIN, {})

    # 1.0.9: the old 20-minute default could end sessions mid-match; move untouched entries to 35
    if entry.options.get(CONF_INACTIVITY_TIMEOUT) == LEGACY_INACTIVITY_TIMEOUT:
        hass.config_entries.async_update_entry(
            entry, options={**entry.options, CONF_INACTIVITY_TIMEOUT: DEFAULT_INACTIVITY_TIMEOUT}
        )

    api_key = entry.data[CONF_API_KEY]
    session = async_get_clientsession(hass) if async_get_clientsession else None
    api_client = ApiFortniteClient(api_key=api_key, session=session)

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

    # Profile/catalogue data refreshes on its own slow cadence and never blocks setup
    coordinator.profile = FortniteProfileCoordinator(
        hass,
        api_client=api_client,
        players_config=entry.data.get(CONF_PLAYERS, []),
        region=entry.options.get(CONF_REGION, DEFAULT_REGION),
        lifetime_matches=coordinator.lifetime_matches,
        on_relink_required=lambda pid, name: _async_raise_relink_issue(hass, pid, name),
    )
    entry.async_create_background_task(
        hass, coordinator.profile.async_refresh(), f"{DOMAIN}_profile_first_refresh"
    )

    hass.data[DOMAIN][entry.entry_id] = coordinator

    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)

    await _async_register_frontend_card(hass)
    async_setup_websocket_api(hass)
    await _async_register_services(hass)

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
