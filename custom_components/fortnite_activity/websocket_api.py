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

        @staticmethod
        def All(*args: Any, **kwargs: Any) -> Any:
            return args[0]

        @staticmethod
        def Length(*args: Any, **kwargs: Any) -> Any:
            return None

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

from .api.api_fortnite import FortniteApiError
from .const import CONF_ACCOUNT_ID, CONF_PLAYER_ID, DOMAIN
from .profile import REGION_GROUPS, parse_leaderboard
from .coordinator import FortniteDataUpdateCoordinator

_LOGGER = logging.getLogger(__name__)


def async_setup_websocket_api(hass: HomeAssistant) -> None:
    """Register WebSocket API commands."""
    if not websocket_api or not vol:
        return

    websocket_api.async_register_command(hass, ws_get_player_session)
    websocket_api.async_register_command(hass, ws_get_player_history)
    websocket_api.async_register_command(hass, ws_get_player_playlists)
    websocket_api.async_register_command(hass, ws_get_catalog)
    websocket_api.async_register_command(hass, ws_get_tournaments)
    websocket_api.async_register_command(hass, ws_find_cosmetic)
    websocket_api.async_register_command(hass, ws_get_leaderboard)


def _get_coordinator(hass: HomeAssistant, player_id: str | None = None) -> FortniteDataUpdateCoordinator | None:
    """Return the coordinator tracking player_id (or the first one if no player given)."""
    domain_data = hass.data.get(DOMAIN, {})
    for val in domain_data.values():
        if isinstance(val, FortniteDataUpdateCoordinator) and (
            player_id is None or player_id in val.session_managers
        ):
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
    coordinator = _get_coordinator(hass, msg["player_id"])
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
    coordinator = _get_coordinator(hass, msg["player_id"])
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
    coordinator = _get_coordinator(hass, msg["player_id"])
    if not coordinator:
        connection.send_error(msg["id"], "not_found", "Fortnite Family coordinator not found")
        return

    player_id = msg["player_id"]
    p_data = (coordinator.data or {}).get(player_id, {})
    playlists = p_data.get("stats", {}).get("playlists", {})

    connection.send_result(
        msg["id"],
        {
            "player_id": player_id,
            "playlists": playlists,
        },
    )


def _profile(hass: HomeAssistant, player_id: str | None):
    coordinator = _get_coordinator(hass, player_id)
    return getattr(coordinator, "profile", None) if coordinator else None


@websocket_api.websocket_command(
    {
        vol.Required("type"): "fortnite_activity/catalog",
        vol.Optional("player_id"): str,
    }
)
@websocket_api.async_response
async def ws_get_catalog(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Return the playlist catalogue (names/images) and current season, cached daily."""
    profile = _profile(hass, msg.get("player_id"))
    connection.send_result(
        msg["id"],
        {
            "season": profile.season if profile else None,
            "playlists": profile.playlists if profile else {},
        },
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "fortnite_activity/tournaments",
        vol.Optional("player_id"): str,
    }
)
@websocket_api.async_response
async def ws_get_tournaments(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Return upcoming/live tournament windows for the configured region."""
    profile = _profile(hass, msg.get("player_id"))
    connection.send_result(
        msg["id"],
        {
            "region": profile.region if profile else None,
            "default_region_group": REGION_GROUPS.get(profile.region, profile.region) if profile else None,
            "tournaments": profile.tournaments if profile else None,
        },
    )


_COSMETIC_CACHE: dict[str, dict[str, Any] | None] = {}


def _cosmetic_summary(item: dict[str, Any]) -> dict[str, Any]:
    images = item.get("images") if isinstance(item.get("images"), dict) else {}
    return {
        "id": item.get("id"),
        "name": item.get("name"),
        "rarity": item.get("rarity"),
        "icon": images.get("icon") or images.get("smallIcon") or item.get("icon"),
        "featured": images.get("largeIcon") or images.get("featured"),
    }


@websocket_api.websocket_command(
    {
        vol.Required("type"): "fortnite_activity/cosmetic",
        vol.Required("query"): vol.All(str, vol.Length(min=3, max=60)),
        vol.Optional("cosmetic_type", default="outfit"): str,
    }
)
@websocket_api.async_response
async def ws_find_cosmetic(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Resolve a cosmetic name (e.g. a skin chosen as avatar) to images; cached per query."""
    query = msg["query"].strip()
    cache_key = f"{msg['cosmetic_type']}:{query.lower()}"
    if cache_key not in _COSMETIC_CACHE:
        coordinator = _get_coordinator(hass)
        if not coordinator:
            connection.send_error(msg["id"], "not_found", "Fortnite Activity is not set up")
            return
        try:
            raw = await coordinator.api_client.search_cosmetics(query, msg["cosmetic_type"] or None)
        except FortniteApiError as err:
            connection.send_error(msg["id"], "api_error", str(err))
            return
        items = [i for i in (raw.get("data") if isinstance(raw, dict) else raw) or [] if isinstance(i, dict)]
        exact = next((i for i in items if str(i.get("name", "")).lower() == query.lower()), None)
        best = exact or (items[0] if items else None)
        _COSMETIC_CACHE[cache_key] = _cosmetic_summary(best) if best else None
    connection.send_result(msg["id"], {"query": query, "cosmetic": _COSMETIC_CACHE[cache_key]})


_LEADERBOARD_CACHE: dict[tuple[str, str, str | None], tuple[float, Any]] = {}
LEADERBOARD_CACHE_SECONDS = 60


@websocket_api.websocket_command(
    {
        vol.Required("type"): "fortnite_activity/leaderboard",
        vol.Required("event_id"): str,
        vol.Required("window_id"): str,
        vol.Optional("player_id"): str,
    }
)
@websocket_api.async_response
async def ws_get_leaderboard(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict[str, Any],
) -> None:
    """Top of a tournament window leaderboard, plus the tracked player's entry when present."""
    import time

    coordinator = _get_coordinator(hass, msg.get("player_id"))
    if not coordinator:
        connection.send_error(msg["id"], "not_found", "Fortnite Activity is not set up")
        return
    account_id = next(
        (p[CONF_ACCOUNT_ID] for p in coordinator.players_config if p[CONF_PLAYER_ID] == msg.get("player_id")),
        None,
    )
    key = (msg["event_id"], msg["window_id"], account_id)
    cached = _LEADERBOARD_CACHE.get(key)
    if cached and time.monotonic() - cached[0] < LEADERBOARD_CACHE_SECONDS:
        connection.send_result(msg["id"], cached[1])
        return
    # The account highlight can be refused upstream (403); fall back to the plain page, then the v2 route
    client = coordinator.api_client
    attempts = [
        lambda: client.get_event_leaderboard(msg["event_id"], msg["window_id"], account_id),
        lambda: client.get_event_leaderboard(msg["event_id"], msg["window_id"]),
        lambda: client.get_event_window_leaderboard(msg["event_id"], msg["window_id"]),
    ]
    raw = None
    last_error: FortniteApiError | None = None
    for attempt in attempts if account_id else attempts[1:]:
        try:
            raw = await attempt()
            break
        except FortniteApiError as err:
            last_error = err
    if raw is None:
        _LOGGER.debug("Leaderboard unavailable for %s/%s: %s", msg["event_id"], msg["window_id"], last_error)
        result = {"leaderboard": None, "unavailable": "Epic has not published this leaderboard (yet)."}
    else:
        result = {"leaderboard": parse_leaderboard(raw, account_id)}
    _LEADERBOARD_CACHE[key] = (time.monotonic(), result)
    connection.send_result(msg["id"], result)
