"""Options-flow changes must produce *new* data objects so Home Assistant persists them.

Regression: linking Epic mutated the stored player dict in place; HA compared the
"new" data with the already-mutated old data, saw no change and skipped saving, so
the link was lost on restart.
"""

from __future__ import annotations

import copy
import unittest
from unittest.mock import AsyncMock, MagicMock

from custom_components.fortnite_activity.api.api_fortnite import ApiFortniteClient

try:  # the options flow needs the real Home Assistant package
    from custom_components.fortnite_activity.config_flow import FortniteFamilyOptionsFlowHandler
except TypeError:  # stub environment: ConfigFlow base is a plain object
    FortniteFamilyOptionsFlowHandler = None


@unittest.skipIf(FortniteFamilyOptionsFlowHandler is None, "requires homeassistant package")
class TestOptionsPersistence(unittest.IsolatedAsyncioTestCase):
    async def test_unlink_does_not_mutate_stored_data(self) -> None:
        stored = {
            "api_key": "synthetic",
            "players": [{"player_id": "player1", "account_id": "a" * 32,
                         "epic_device": {"device_id": "d" * 32, "secret": "synthetic-secret"}}],
        }
        snapshot = copy.deepcopy(stored)
        flow = FortniteFamilyOptionsFlowHandler()
        flow.hass = MagicMock()
        flow.handler = "entry1"
        flow.hass.config_entries.async_get_known_entry.return_value = MagicMock(data=stored, options={})
        flow.async_create_entry = MagicMock(return_value={"type": "create_entry"})

        await flow.async_step_unlink_epic({"player_id": "player1"})

        self.assertEqual(stored, snapshot, "stored entry data must not be mutated in place")
        saved = flow.hass.config_entries.async_update_entry.call_args.kwargs["data"]
        self.assertNotIn("epic_device", saved["players"][0])
        self.assertNotEqual(saved, stored)


@unittest.skipIf(FortniteFamilyOptionsFlowHandler is None, "requires homeassistant package")
class TestAddPlayerBySignIn(unittest.IsolatedAsyncioTestCase):
    """The Epic account id comes from the sign-in; nothing is stored until it is confirmed."""

    def _flow(self, stored: dict, completed: dict):
        flow = FortniteFamilyOptionsFlowHandler()
        flow.hass = MagicMock()
        flow.handler = "entry1"
        flow.hass.config_entries.async_get_known_entry.return_value = MagicMock(data=stored, options={})
        flow.async_create_entry = MagicMock(return_value={"type": "create_entry"})
        flow.async_show_form = MagicMock(side_effect=lambda **kw: {"type": "form", **kw})
        flow.async_show_menu = MagicMock(side_effect=lambda **kw: {"type": "menu", **kw})
        flow.async_abort = MagicMock(side_effect=lambda **kw: {"type": "abort", **kw})
        client = MagicMock()
        client.oauth_start = AsyncMock(return_value={"flowId": "f1", "url": "https://www.epicgames.com/id/activate"})
        client.oauth_complete = AsyncMock(return_value=(200, completed))
        client.get_account = AsyncMock(return_value={"displayName": "Synth"})
        flow._client = MagicMock(return_value=client)
        return flow

    @staticmethod
    def _completed(account: str) -> dict:
        return {"data": {"access_token": "t", "refresh_token": "r", "account_id": account,
                         "deviceAuth": {"deviceId": "d" * 32, "secret": "synthetic-secret", "accountId": account}}}

    async def test_sign_in_supplies_account_id_and_device(self) -> None:
        stored = {"api_key": "synthetic", "players": [{"player_id": "player1", "account_id": "a" * 32}]}
        snapshot = copy.deepcopy(stored)
        flow = self._flow(stored, self._completed("b" * 32))

        menu = await flow.async_step_add_player({"player_name": "Player Two"})
        self.assertEqual(menu["type"], "menu")
        form = await flow.async_step_add_player_epic()
        self.assertEqual(form["step_id"], "add_player_epic")
        confirm = await flow.async_step_add_player_epic({})
        self.assertEqual(confirm["step_id"], "add_player_confirm")
        self.assertEqual(confirm["description_placeholders"]["epic_name"], "Synth")
        self.assertNotIn("synthetic-secret", str(confirm))
        flow.hass.config_entries.async_update_entry.assert_not_called()

        await flow.async_step_add_player_confirm({})
        self.assertEqual(stored, snapshot, "stored entry data must not be mutated in place")
        saved = flow.hass.config_entries.async_update_entry.call_args.kwargs["data"]["players"]
        self.assertEqual(saved[1], {
            "player_id": "player_two", "player_name": "Player Two", "account_id": "b" * 32,
            "epic_device": {"device_id": "d" * 32, "secret": "synthetic-secret"},
        })

    async def test_sign_in_as_already_tracked_account_saves_nothing(self) -> None:
        stored = {"api_key": "synthetic", "players": [{"player_id": "player1", "account_id": "a" * 32}]}
        flow = self._flow(stored, self._completed("a" * 32))
        await flow.async_step_add_player({"player_name": "Player Two"})
        await flow.async_step_add_player_epic()
        result = await flow.async_step_add_player_epic({})
        self.assertEqual(result, {"type": "abort", "reason": "account_already_tracked"})
        flow.hass.config_entries.async_update_entry.assert_not_called()


class TestSeasonLevelFromStats(unittest.TestCase):
    def test_social_bp_level_is_parsed(self) -> None:
        parsed = ApiFortniteClient.parse_stats({"stats": {
            "s41_social_bp_level": 150,
            "s42_social_bp_level": 322,
            "br_matchesplayed_keyboardmouse_m0_playlist_defaultsolo": 3,
        }})
        self.assertEqual(parsed["season_level"], {"season": 42, "level": 322})
        self.assertEqual(parsed["overall"]["matches"], 3)


if __name__ == "__main__":
    unittest.main()
