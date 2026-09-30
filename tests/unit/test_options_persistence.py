"""Options-flow changes must produce *new* data objects so Home Assistant persists them.

Regression: linking Epic mutated the stored player dict in place; HA compared the
"new" data with the already-mutated old data, saw no change and skipped saving, so
the link was lost on restart.
"""

from __future__ import annotations

import copy
import unittest
from unittest.mock import MagicMock

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
