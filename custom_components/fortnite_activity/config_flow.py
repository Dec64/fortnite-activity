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

from .api.api_fortnite import ApiFortniteClient, FortniteApiError, FortniteAuthError, FortniteNotFoundError
from .const import (
    CONF_ACCOUNT_ID,
    CONF_ACTIVE_INTERVAL,
    CONF_API_KEY,
    CONF_IDLE_INTERVAL,
    CONF_INACTIVITY_TIMEOUT,
    CONF_PLAYERS,
    CONF_PLAYER_ID,
    CONF_EPIC_DEVICE,
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


def _slugify(name: str) -> str:
    """Player identifier derived from a display name."""
    return re.sub(r"[^a-z0-9]+", "_", name.lower()).strip("_")[:32]


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
                vol.Required(CONF_PLAYER_ID): str,
                vol.Required(CONF_PLAYER_NAME): str,
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
        menu = ["settings", "add_player", "remove_player", "link_epic"]
        if any(p.get(CONF_EPIC_DEVICE) for p in self.config_entry.data.get(CONF_PLAYERS, [])):
            menu.append("unlink_epic")
        return self.async_show_menu(step_id="init", menu_options=menu)

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
        """Name the new player, then choose how to find their Epic account."""
        errors: dict[str, str] = {}
        players = self.config_entry.data.get(CONF_PLAYERS, [])

        if user_input is not None:
            player_name = user_input[CONF_PLAYER_NAME].strip()
            player_id = (user_input.get(CONF_PLAYER_ID) or "").strip().lower() or _slugify(player_name)
            if not PLAYER_ID_RE.match(player_id):
                errors[CONF_PLAYER_ID] = "invalid_player_id"
            elif any(p[CONF_PLAYER_ID] == player_id for p in players):
                errors[CONF_PLAYER_ID] = "already_configured"
            else:
                self._new_player = {CONF_PLAYER_ID: player_id, CONF_PLAYER_NAME: player_name or player_id.capitalize()}
                self._link_flow = None
                self._pending = None
                return await self.async_step_add_player_method()

        schema = vol.Schema(
            {
                vol.Required(CONF_PLAYER_NAME): str,
                vol.Optional(CONF_PLAYER_ID): str,
            }
        )
        return self.async_show_form(step_id="add_player", data_schema=schema, errors=errors)

    async def async_step_add_player_method(self, user_input: dict[str, Any] | None = None) -> FlowResult:
        """Choose between signing in with Epic and typing the account ID."""
        return self.async_show_menu(step_id="add_player_method", menu_options=["add_player_epic", "add_player_manual"])

    def _save_new_player(self, account_id: str, epic_device: dict[str, str] | None = None) -> FlowResult:
        # Copy each player dict: mutating the stored dicts makes HA see "no change" and skip saving
        players = [dict(p) for p in self.config_entry.data.get(CONF_PLAYERS, [])]
        player = {**self._new_player, CONF_ACCOUNT_ID: account_id}
        if epic_device:
            player[CONF_EPIC_DEVICE] = epic_device
        players.append(player)
        self.hass.config_entries.async_update_entry(
            self.config_entry, data={**self.config_entry.data, CONF_PLAYERS: players}
        )
        # Returning unchanged options triggers the reload that creates the new entities
        return self.async_create_entry(title="", data=dict(self.config_entry.options))

    async def async_step_add_player_manual(self, user_input: dict[str, Any] | None = None) -> FlowResult:
        """Add the player from a typed Epic account ID (validated with one stats request)."""
        errors: dict[str, str] = {}
        if user_input is not None:
            account_id = user_input[CONF_ACCOUNT_ID].strip()
            if any(p[CONF_ACCOUNT_ID] == account_id for p in self.config_entry.data.get(CONF_PLAYERS, [])):
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
                return self._save_new_player(account_id)

        return self.async_show_form(
            step_id="add_player_manual",
            data_schema=vol.Schema({vol.Required(CONF_ACCOUNT_ID): str}),
            errors=errors,
            description_placeholders={"player": self._new_player[CONF_PLAYER_NAME]},
        )

    async def async_step_add_player_epic(self, user_input: dict[str, Any] | None = None) -> FlowResult:
        """Sign the new player in to Epic; the account ID comes from the sign-in itself."""
        from .epic_auth import extract_account_id, parse_device_credential
        from .profile import parse_display_name

        flow, errors, data = await self._async_signin_step(user_input)
        if data is not None:
            self._link_flow = None
            account_id = extract_account_id(data)
            credential = parse_device_credential(data)
            if not account_id or not credential:
                return self.async_abort(reason="link_no_account")
            if any(p[CONF_ACCOUNT_ID] == account_id for p in self.config_entry.data.get(CONF_PLAYERS, [])):
                # Usually the browser was still signed in as an already-tracked player: keep nothing
                return self.async_abort(reason="account_already_tracked")
            try:
                display_name = parse_display_name(await self._client().get_account(account_id))
            except FortniteApiError:
                display_name = None
            self._pending = (account_id, {"device_id": credential[0], "secret": credential[1]}, display_name)
            return await self.async_step_add_player_confirm()
        if not flow:
            return self.async_abort(reason="link_unavailable")
        return self.async_show_form(
            step_id="add_player_epic",
            data_schema=vol.Schema({}),
            errors=errors,
            description_placeholders={"url": flow[1], "player": self._new_player[CONF_PLAYER_NAME]},
        )

    async def async_step_add_player_confirm(self, user_input: dict[str, Any] | None = None) -> FlowResult:
        """Show which Epic account signed in before anything is stored."""
        account_id, epic_device, display_name = self._pending
        if user_input is not None:
            self._pending = None
            return self._save_new_player(account_id, epic_device)
        return self.async_show_form(
            step_id="add_player_confirm",
            data_schema=vol.Schema({}),
            description_placeholders={
                "player": self._new_player[CONF_PLAYER_NAME],
                "epic_name": display_name or "unknown display name",
                "account_tail": account_id[-4:],
            },
        )

    async def async_step_remove_player(self, user_input: dict[str, Any] | None = None) -> FlowResult:
        """Stop tracking a player (at least one must remain)."""
        # Copy each player dict: mutating the stored dicts makes HA see "no change" and skip saving
        players = [dict(p) for p in self.config_entry.data.get(CONF_PLAYERS, [])]
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

    # ---- Epic account link (device-code OAuth via api-fortnite.com) ----

    def _client(self) -> ApiFortniteClient:
        from homeassistant.helpers.aiohttp_client import async_get_clientsession

        return ApiFortniteClient(self.config_entry.data[CONF_API_KEY], async_get_clientsession(self.hass))

    async def async_step_link_epic(self, user_input: dict[str, Any] | None = None) -> FlowResult:
        """Pick which tracked player is signing in to Epic."""
        players = self.config_entry.data.get(CONF_PLAYERS, [])
        if user_input is not None or len(players) == 1:
            self._link_player = (user_input or {}).get(CONF_PLAYER_ID) or players[0][CONF_PLAYER_ID]
            self._link_flow = None
            return await self.async_step_link_epic_signin()
        schema = vol.Schema(
            {vol.Required(CONF_PLAYER_ID): vol.In({p[CONF_PLAYER_ID]: p.get(CONF_PLAYER_NAME, p[CONF_PLAYER_ID]) for p in players})}
        )
        return self.async_show_form(step_id="link_epic", data_schema=schema)

    async def _async_signin_step(
        self, user_input: dict[str, Any] | None
    ) -> tuple[tuple[str, str, float] | None, dict[str, str], Any]:
        """Device-code sign-in shared by link and add-player: (flow, errors, completed response or None).

        The flow is completed once per Submit (no background polling); flow is None when no
        sign-in link could be obtained.
        """
        import time

        from .epic_auth import parse_flow_start

        errors: dict[str, str] = {}
        client = self._client()
        flow = getattr(self, "_link_flow", None)
        if flow and time.monotonic() - flow[2] > 570:  # device-code flows last ~600 s
            flow = None
            errors["base"] = "link_expired"

        if user_input is not None and flow and not errors:
            try:
                status, data = await client.oauth_complete(flow[0])
            except FortniteApiError:
                status, data = None, None
                errors["base"] = "link_failed"
            if status == 202:
                errors["base"] = "link_pending"
            elif status == 200:
                return flow, errors, data

        if not flow:
            try:
                started = parse_flow_start(await client.oauth_start())
            except FortniteApiError:
                started = None
            if started:
                flow = (started[0], started[1], time.monotonic())
            self._link_flow = flow
        return flow, errors, None

    async def async_step_link_epic_signin(self, user_input: dict[str, Any] | None = None) -> FlowResult:
        """Show the Epic sign-in link; on submit, complete the flow once (no background polling)."""
        from homeassistant.helpers import issue_registry as ir

        from .epic_auth import identity_matches, parse_device_credential

        # Copy each player dict: mutating the stored dicts makes HA see "no change" and skip saving
        players = [dict(p) for p in self.config_entry.data.get(CONF_PLAYERS, [])]
        player = next(p for p in players if p[CONF_PLAYER_ID] == self._link_player)

        flow, errors, data = await self._async_signin_step(user_input)
        if data is not None:
            credential = parse_device_credential(data)
            if not identity_matches(data, player[CONF_ACCOUNT_ID]):
                # Signed in to a different Epic account: keep nothing
                self._link_flow = None
                return self.async_abort(reason="identity_mismatch")
            if not credential:
                errors["base"] = "link_failed"
            else:
                device_id, secret = credential
                for p in players:
                    if p[CONF_PLAYER_ID] == player[CONF_PLAYER_ID]:
                        p[CONF_EPIC_DEVICE] = {"device_id": device_id, "secret": secret}
                self._link_flow = None
                self.hass.config_entries.async_update_entry(
                    self.config_entry, data={**self.config_entry.data, CONF_PLAYERS: players}
                )
                ir.async_delete_issue(self.hass, DOMAIN, f"epic_relink_{player[CONF_PLAYER_ID]}")
                return self.async_create_entry(title="", data=dict(self.config_entry.options))

        if not flow:
            return self.async_abort(reason="link_unavailable")
        return self.async_show_form(
            step_id="link_epic_signin",
            data_schema=vol.Schema({}),
            errors=errors,
            description_placeholders={"url": flow[1], "player": player.get(CONF_PLAYER_NAME, player[CONF_PLAYER_ID])},
        )

    async def async_step_unlink_epic(self, user_input: dict[str, Any] | None = None) -> FlowResult:
        """Forget a stored Epic device credential locally (it is not revoked at Epic)."""
        # Copy each player dict: mutating the stored dicts makes HA see "no change" and skip saving
        players = [dict(p) for p in self.config_entry.data.get(CONF_PLAYERS, [])]
        linked = {p[CONF_PLAYER_ID]: p.get(CONF_PLAYER_NAME, p[CONF_PLAYER_ID]) for p in players if p.get(CONF_EPIC_DEVICE)}
        if user_input is not None:
            for p in players:
                if p[CONF_PLAYER_ID] == user_input[CONF_PLAYER_ID]:
                    p.pop(CONF_EPIC_DEVICE, None)
            self.hass.config_entries.async_update_entry(
                self.config_entry, data={**self.config_entry.data, CONF_PLAYERS: players}
            )
            return self.async_create_entry(title="", data=dict(self.config_entry.options))
        return self.async_show_form(
            step_id="unlink_epic", data_schema=vol.Schema({vol.Required(CONF_PLAYER_ID): vol.In(linked)})
        )
