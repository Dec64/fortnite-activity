"""Config flow for Fortnite Family Tracker integration."""

from __future__ import annotations

import logging
import re
from typing import Any

try:
    import voluptuous as vol
    from homeassistant import config_entries
    from homeassistant.core import callback
    from homeassistant.data_entry_flow import FlowResult
except ImportError:
    # Graceful fallback for non-HA testing environments
    vol = None  # type: ignore
    config_entries = None  # type: ignore
    FlowResult = Any  # type: ignore

    def callback(func: Any) -> Any:
        return func

from .api.api_fortnite import ApiFortniteClient, FortniteAuthError, FortniteNotFoundError
from .const import (
    CONF_ACCOUNT_ID,
    CONF_ACTIVE_INTERVAL,
    CONF_API_KEY,
    CONF_IDLE_INTERVAL,
    CONF_INACTIVITY_TIMEOUT,
    CONF_PLAYERS,
    CONF_PLAYER_ID,
    CONF_PLAYER_NAME,
    CONF_REGION,
    DEFAULT_ACTIVE_INTERVAL,
    DEFAULT_IDLE_INTERVAL,
    DEFAULT_INACTIVITY_TIMEOUT,
    DEFAULT_REGION,
    DOMAIN,
    TOURNAMENT_REGIONS,
)

PLAYER_ID_RE = re.compile(r"^[a-z0-9_]{1,32}$")


async def _async_validate_player(api_key: str, account_id: str, session: Any = None) -> str | None:
    """Return an error key, or None when the account returns stats."""
    client = ApiFortniteClient(api_key=api_key, session=session)
    try:
        if not await client.validate_credentials(account_id):
            return "player_not_found"
    except FortniteAuthError:
        return "invalid_auth"
    except FortniteNotFoundError:
        return "player_not_found"
    except Exception:  # noqa: BLE001
        return "cannot_connect"
    finally:
        await client.close()
    return None

_LOGGER = logging.getLogger(__name__)


class FortniteFamilyConfigFlow(config_entries.ConfigFlow if config_entries else object, domain=DOMAIN):  # type: ignore[misc]
    """Handle a config flow for Fortnite Family Tracker."""

    VERSION = 1

    def __init__(self) -> None:
        """Initialize the flow."""
        self._api_key: str = ""
        self._players: list[dict[str, Any]] = []

    async def async_step_user(self, user_input: dict[str, Any] | None = None) -> FlowResult:
        """Handle the initial configuration step."""
        errors: dict[str, str] = {}

        if user_input is not None:
            api_key = user_input[CONF_API_KEY].strip()
            player_id = user_input[CONF_PLAYER_ID].strip().lower()
            player_name = user_input[CONF_PLAYER_NAME].strip()
            account_id = user_input[CONF_ACCOUNT_ID].strip()

            # Validate input through API client
            client = ApiFortniteClient(api_key=api_key)
            try:
                valid = await client.validate_credentials(account_id)
                if not valid:
                    errors["base"] = "player_not_found"
            except FortniteAuthError:
                errors["base"] = "invalid_auth"
            except FortniteNotFoundError:
                errors["base"] = "player_not_found"
            except Exception:
                errors["base"] = "cannot_connect"
            finally:
                await client.close()

            if not errors:
                # First player configuration
                self._api_key = api_key
                self._players = [
                    {
                        CONF_PLAYER_ID: player_id,
                        CONF_PLAYER_NAME: player_name,
                        CONF_ACCOUNT_ID: account_id,
                    }
                ]
                return self.async_create_entry(
                    title="Fortnite Family Tracker",
                    data={
                        CONF_API_KEY: self._api_key,
                        CONF_PLAYERS: self._players,
                    },
                    options={
                        CONF_ACTIVE_INTERVAL: DEFAULT_ACTIVE_INTERVAL,
                        CONF_IDLE_INTERVAL: DEFAULT_IDLE_INTERVAL,
                        CONF_INACTIVITY_TIMEOUT: DEFAULT_INACTIVITY_TIMEOUT,
                    },
                )

        schema = vol.Schema(
            {
                vol.Required(CONF_API_KEY): str,
                vol.Required(CONF_PLAYER_ID, default="player1"): str,
                vol.Required(CONF_PLAYER_NAME, default="Player One"): str,
                vol.Required(CONF_ACCOUNT_ID): str,
            }
        ) if vol else {}

        return self.async_show_form(
            step_id="user",
            data_schema=schema,
            errors=errors,
        )

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: Any) -> config_entries.OptionsFlow:
        """Get the options flow for this handler."""
        return FortniteFamilyOptionsFlowHandler()


class FortniteFamilyOptionsFlowHandler(config_entries.OptionsFlow if config_entries else object):  # type: ignore[misc]
    """Options: polling settings, tournament region, and adding/removing players."""

    async def async_step_init(self, user_input: dict[str, Any] | None = None) -> FlowResult:
        """Show the options menu."""
        return self.async_show_menu(step_id="init", menu_options=["settings", "add_player", "remove_player"])

    async def async_step_settings(self, user_input: dict[str, Any] | None = None) -> FlowResult:
        """Polling intervals, session timeout and tournament region."""
        if user_input is not None:
            return self.async_create_entry(title="", data={**self.config_entry.options, **user_input})

        options = self.config_entry.options
        schema = vol.Schema(
            {
                vol.Optional(
                    CONF_ACTIVE_INTERVAL,
                    default=options.get(CONF_ACTIVE_INTERVAL, DEFAULT_ACTIVE_INTERVAL),
                ): vol.All(vol.Coerce(int), vol.Range(min=60, max=600)),
                vol.Optional(
                    CONF_IDLE_INTERVAL,
                    default=options.get(CONF_IDLE_INTERVAL, DEFAULT_IDLE_INTERVAL),
                ): vol.All(vol.Coerce(int), vol.Range(min=300, max=3600)),
                vol.Optional(
                    CONF_INACTIVITY_TIMEOUT,
                    default=options.get(CONF_INACTIVITY_TIMEOUT, DEFAULT_INACTIVITY_TIMEOUT),
                ): vol.All(vol.Coerce(int), vol.Range(min=5, max=90)),
                vol.Optional(
                    CONF_REGION,
                    default=options.get(CONF_REGION, DEFAULT_REGION),
                ): vol.In(TOURNAMENT_REGIONS),
            }
        )
        return self.async_show_form(step_id="settings", data_schema=schema)

    async def async_step_add_player(self, user_input: dict[str, Any] | None = None) -> FlowResult:
        """Add another tracked player (validated with one stats request)."""
        errors: dict[str, str] = {}
        players = list(self.config_entry.data.get(CONF_PLAYERS, []))

        if user_input is not None:
            player_id = user_input[CONF_PLAYER_ID].strip().lower()
            account_id = user_input[CONF_ACCOUNT_ID].strip()
            if not PLAYER_ID_RE.match(player_id):
                errors[CONF_PLAYER_ID] = "invalid_player_id"
            elif any(p[CONF_PLAYER_ID] == player_id for p in players):
                errors[CONF_PLAYER_ID] = "already_configured"
            elif any(p[CONF_ACCOUNT_ID] == account_id for p in players):
                errors[CONF_ACCOUNT_ID] = "already_configured"
            else:
                session = None
                try:
                    from homeassistant.helpers.aiohttp_client import async_get_clientsession

                    session = async_get_clientsession(self.hass)
                except ImportError:
                    pass
                error = await _async_validate_player(self.config_entry.data[CONF_API_KEY], account_id, session)
                if error:
                    errors["base"] = error

            if not errors:
                players.append({
                    CONF_PLAYER_ID: player_id,
                    CONF_PLAYER_NAME: user_input[CONF_PLAYER_NAME].strip() or player_id.capitalize(),
                    CONF_ACCOUNT_ID: account_id,
                })
                self.hass.config_entries.async_update_entry(
                    self.config_entry, data={**self.config_entry.data, CONF_PLAYERS: players}
                )
                # Returning unchanged options triggers the reload that creates the new entities
                return self.async_create_entry(title="", data=dict(self.config_entry.options))

        schema = vol.Schema(
            {
                vol.Required(CONF_PLAYER_ID): str,
                vol.Required(CONF_PLAYER_NAME): str,
                vol.Required(CONF_ACCOUNT_ID): str,
            }
        )
        return self.async_show_form(step_id="add_player", data_schema=schema, errors=errors)

    async def async_step_remove_player(self, user_input: dict[str, Any] | None = None) -> FlowResult:
        """Stop tracking a player (at least one must remain)."""
        players = list(self.config_entry.data.get(CONF_PLAYERS, []))
        if len(players) <= 1:
            return self.async_abort(reason="last_player")

        if user_input is not None:
            remaining = [p for p in players if p[CONF_PLAYER_ID] != user_input[CONF_PLAYER_ID]]
            self.hass.config_entries.async_update_entry(
                self.config_entry, data={**self.config_entry.data, CONF_PLAYERS: remaining}
            )
            return self.async_create_entry(title="", data=dict(self.config_entry.options))

        schema = vol.Schema(
            {vol.Required(CONF_PLAYER_ID): vol.In({p[CONF_PLAYER_ID]: p.get(CONF_PLAYER_NAME, p[CONF_PLAYER_ID]) for p in players})}
        )
        return self.async_show_form(step_id="remove_player", data_schema=schema)
