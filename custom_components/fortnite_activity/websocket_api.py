"""WebSocket API endpoints for Fortnite Family Tracker."""

from __future__ import annotations

import logging
from typing import Any

try:
    import voluptuous as vol
    from homeassistant.components import websocket_api
    from homeassistant.core import HomeAssistant
except ImportError:
    class _MockVol:
        @staticmethod
        def Required(*args: Any, **kwargs: Any) -> Any:
            return args[0]

        @staticmethod
        def Optional(*args: Any, **kwargs: Any) -> Any:
            return args[0]

        @staticmethod
        def Schema(*args: Any, **kwargs: Any) -> Any:
            return args[0]

    vol = _MockVol()  # type: ignore
    HomeAssistant = Any  # type: ignore

    class _MockWS:
        @staticmethod
        def async_response(func: Any) -> Any:
            return func

        @staticmethod
        def websocket_command(schema: Any) -> Any:
            def decorator(func: Any) -> Any:
                return func
            return decorator

        @staticmethod
        def async_register_command(*args: Any, **kwargs: Any) -> None:
            pass

        class ActiveConnection:
            pass

    websocket_api = _MockWS()  # type: ignore

from .const import DOMAIN
from .coordinator import FortniteDataUpdateCoordinator

_LOGGER = logging.getLogger(__name__)


def async_setup_websocket_api(hass: HomeAssistant) -> None:
    """Register WebSocket API commands."""
    if not websocket_api or not vol:
        return

    websocket_api.async_register_command(hass, ws_get_player_session)
    websocket_api.async_register_command(hass, ws_get_player_history)
    websocket_api.async_register_command(hass, ws_get_player_playlists)


def _get_coordinator(hass: HomeAssistant) -> FortniteDataUpdateCoordinator | None:
    """Helper to retrieve the active coordinator."""
    domain_data = hass.data.get(DOMAIN, {})
    for val in domain_data.values():
        if isinstance(val, FortniteDataUpdateCoordinator):
            return val
    return None


@websocket_api.websocket_command(
    {
        vol.Required("type"): "fortnite_activity/session",
        vol.Required("player_id"): str,
    }
)
@websocket_api.async_response
async def ws_get_player_session(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Return active session or last session summary for a player."""
    coordinator = _get_coordinator(hass)
    if not coordinator:
        connection.send_error(msg["id"], "not_found", "Fortnite Family coordinator not found")
        return

    player_id = msg["player_id"]
    manager = coordinator.session_managers.get(player_id)
    if not manager:
        connection.send_error(msg["id"], "not_found", f"Player {player_id} not found")
        return

    session = manager.get_latest_session_summary()
    connection.send_result(
        msg["id"],
        {
            "player_id": player_id,
            "is_active": manager.is_active,
            "session": session,
        },
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "fortnite_activity/history",
        vol.Required("player_id"): str,
        vol.Optional("limit", default=10): int,
    }
)
@websocket_api.async_response
async def ws_get_player_history(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Return past session history for a player."""
    coordinator = _get_coordinator(hass)
    if not coordinator:
        connection.send_error(msg["id"], "not_found", "Fortnite Family coordinator not found")
        return

    player_id = msg["player_id"]
    limit = msg.get("limit", 10)
    manager = coordinator.session_managers.get(player_id)
    if not manager:
        connection.send_error(msg["id"], "not_found", f"Player {player_id} not found")
        return

    connection.send_result(
        msg["id"],
        {
            "player_id": player_id,
            "history": manager.history[:limit],
        },
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "fortnite_activity/playlists",
        vol.Required("player_id"): str,
    }
)
@websocket_api.async_response
async def ws_get_player_playlists(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Return detailed playlist statistics for a player."""
    coordinator = _get_coordinator(hass)
    if not coordinator:
        connection.send_error(msg["id"], "not_found", "Fortnite Family coordinator not found")
        return

    player_id = msg["player_id"]
    p_data = coordinator.data.get(player_id, {})
    playlists = p_data.get("stats", {}).get("playlists", {})

    connection.send_result(
        msg["id"],
        {
            "player_id": player_id,
            "playlists": playlists,
        },
    )
