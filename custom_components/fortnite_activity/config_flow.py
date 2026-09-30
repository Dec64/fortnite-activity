"""Config flow for Fortnite Family Tracker integration."""

from __future__ import annotations

import logging
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
    DEFAULT_ACTIVE_INTERVAL,
    DEFAULT_IDLE_INTERVAL,
    DEFAULT_INACTIVITY_TIMEOUT,
    DOMAIN,
)

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
    """Handle options for Fortnite Family Tracker."""

    async def async_step_init(self, user_input: dict[str, Any] | None = None) -> FlowResult:
        """Manage the options."""
        if user_input is not None:
            return self.async_create_entry(title="", data=user_input)

        options = self.config_entry.options if hasattr(self.config_entry, "options") else {}

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
                ): vol.All(vol.Coerce(int), vol.Range(min=5, max=60)),
            }
        ) if vol else {}

        return self.async_show_form(step_id="init", data_schema=schema)
