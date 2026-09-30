"""End-to-end session tracking and simulation test."""

from __future__ import annotations

import copy
from datetime import datetime, timedelta, timezone
import json
from pathlib import Path
import unittest
from unittest.mock import AsyncMock, MagicMock

from custom_components.fortnite_activity.api.api_fortnite import ApiFortniteClient
from custom_components.fortnite_activity.const import (
    CONF_ACCOUNT_ID,
    CONF_ACTIVE_INTERVAL,
    CONF_IDLE_INTERVAL,
    CONF_INACTIVITY_TIMEOUT,
    CONF_PLAYERS,
    CONF_PLAYER_ID,
    CONF_PLAYER_NAME,
)
from custom_components.fortnite_activity.coordinator import FortniteDataUpdateCoordinator
from custom_components.fortnite_activity.storage import FortniteStorage

FIXTURES_DIR = Path(__file__).resolve().parent.parent / "fixtures" / "synthetic"


class TestEndToEndSession(unittest.IsolatedAsyncioTestCase):
    """Simulate a full live gaming session with multiple matches and auto-close."""

    async def test_full_session_simulation(self) -> None:
        """Simulate baseline -> game 1 win -> game 2 top 5 -> session auto-archive."""
        with open(FIXTURES_DIR / "stats_baseline.json", encoding="utf-8") as f:
            stats_step0 = json.load(f)
        with open(FIXTURES_DIR / "ranked.json", encoding="utf-8") as f:
            ranked_step0 = json.load(f)
        with open(FIXTURES_DIR / "level.json", encoding="utf-8") as f:
            level_step0 = json.load(f)

        mock_client = MagicMock(spec=ApiFortniteClient)
        mock_storage = MagicMock(spec=FortniteStorage)
        mock_storage.get_player_history.return_value = []
        mock_storage.async_save = AsyncMock()

        coordinator = FortniteDataUpdateCoordinator(
            hass=MagicMock(),
            api_client=mock_client,
            entry_data={
                CONF_PLAYERS: [
                    {
                        CONF_PLAYER_ID: "player1",
                        CONF_PLAYER_NAME: "Player One",
                        CONF_ACCOUNT_ID: "player1_epic_id",
                    }
                ]
            },
            entry_options={
                CONF_ACTIVE_INTERVAL: 90,
                CONF_IDLE_INTERVAL: 1800,
                CONF_INACTIVITY_TIMEOUT: 15,
            },
            storage=mock_storage,
        )

        # STEP 0: Initial Poll (Player is Idle)
        mock_client.get_raw_stats = AsyncMock(return_value=stats_step0)
        mock_client.get_raw_ranked = AsyncMock(return_value=ranked_step0)
        mock_client.get_raw_level = AsyncMock(return_value=level_step0)

        data = await coordinator._async_update_data()
        self.assertFalse(data["player1"]["is_playing"])
        self.assertEqual(data["player1"]["stats"]["overall"]["matches"], 180)
        self.assertEqual(coordinator.update_interval, timedelta(seconds=1800))

        # STEP 1: Game 1 finishes (Zero Build Duos: +1 match, +7 kills, +1 win, +6% rank)
        stats_step1 = copy.deepcopy(stats_step0)
        duo_s = stats_step1["stats"]
        duo_s["br_matchesplayed_keyboardmouse_m0_playlist_nobuildbr_duo"] += 1
        duo_s["br_kills_keyboardmouse_m0_playlist_nobuildbr_duo"] += 7
        duo_s["br_placetop1_keyboardmouse_m0_playlist_nobuildbr_duo"] += 1
        duo_s["br_lastmodified_keyboardmouse_m0_playlist_nobuildbr_duo"] += 1200

        ranked_step1 = copy.deepcopy(ranked_step0)
        ranked_step1[0]["promotionProgress"] = 0.14  # +6%

        mock_client.get_raw_stats = AsyncMock(return_value=stats_step1)
        mock_client.get_raw_ranked = AsyncMock(return_value=ranked_step1)

        data = await coordinator._async_update_data()
        self.assertTrue(data["player1"]["is_playing"])
        self.assertEqual(coordinator.update_interval, timedelta(seconds=90))

        session = data["player1"]["session"]
        self.assertIsNotNone(session)
        self.assertEqual(session["summary"]["matches_played"], 1)
        self.assertEqual(session["summary"]["wins"], 1)
        self.assertEqual(session["summary"]["kills"], 7)
        self.assertEqual(session["summary"]["net_rank_delta_pct"], 6.0)

        match1 = session["matches"][0]
        self.assertEqual(match1["placement_text"], "Victory Royale 🏆")
        self.assertEqual(match1["kills"], 7)
        self.assertEqual(match1["mode_name"], "Zero Build Duos")

        # STEP 2: Game 2 finishes (Solo: +1 match, +4 kills, Top 5, +2% rank)
        stats_step2 = copy.deepcopy(stats_step1)
        solo_s = stats_step2["stats"]
        solo_s["br_matchesplayed_keyboardmouse_m0_playlist_defaultsolo"] += 1
        solo_s["br_kills_keyboardmouse_m0_playlist_defaultsolo"] += 4
        solo_s["br_placetop5_keyboardmouse_m0_playlist_defaultsolo"] = (
            solo_s.get("br_placetop5_keyboardmouse_m0_playlist_defaultsolo", 0) + 1
        )
        solo_s["br_lastmodified_keyboardmouse_m0_playlist_defaultsolo"] += 1000

        ranked_step2 = copy.deepcopy(ranked_step1)
        ranked_step2[0]["promotionProgress"] = 0.16  # +2% more

        mock_client.get_raw_stats = AsyncMock(return_value=stats_step2)
        mock_client.get_raw_ranked = AsyncMock(return_value=ranked_step2)

        data = await coordinator._async_update_data()
        session = data["player1"]["session"]
        self.assertEqual(session["summary"]["matches_played"], 2)
        self.assertEqual(session["summary"]["wins"], 1)
        self.assertEqual(session["summary"]["kills"], 11)
        # 2 matches, 1 win -> 1 death. KD = 11 / 1 = 11.0
        self.assertEqual(session["summary"]["kd_ratio"], 11.0)
        self.assertEqual(session["summary"]["win_rate_pct"], 50.0)
        self.assertEqual(session["summary"]["net_rank_delta_pct"], 8.0)

        match2 = session["matches"][0]  # newest match is first
        self.assertEqual(match2["placement_text"], "Top 5")
        self.assertEqual(match2["kills"], 4)
        self.assertEqual(match2["mode_name"], "Battle Royale Solo")

        # STEP 3: Player stops playing. Fast forward 20 minutes to trigger inactivity timeout
        manager = coordinator.session_managers["player1"]
        manager.last_activity_time = datetime.now(timezone.utc) - timedelta(minutes=20)

        # Poll with no stats change
        data = await coordinator._async_update_data()
        self.assertFalse(data["player1"]["is_playing"])
        self.assertIsNone(data["player1"]["session"])
        self.assertIsNotNone(data["player1"]["last_session"])
        self.assertEqual(data["player1"]["last_session"]["summary"]["matches_played"], 2)
        self.assertEqual(coordinator.update_interval, timedelta(seconds=1800))


if __name__ == "__main__":
    unittest.main()
