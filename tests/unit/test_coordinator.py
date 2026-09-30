"""Unit tests for FortniteDataUpdateCoordinator."""

from __future__ import annotations

from datetime import timedelta
import json
from pathlib import Path
import unittest
from unittest.mock import AsyncMock, MagicMock

from custom_components.fortnite_activity.api.api_fortnite import ApiFortniteClient, FortniteAuthError
from custom_components.fortnite_activity.const import (
    CONF_ACCOUNT_ID,
    CONF_ACTIVE_INTERVAL,
    CONF_IDLE_INTERVAL,
    CONF_INACTIVITY_TIMEOUT,
    CONF_PLAYERS,
    CONF_PLAYER_ID,
    CONF_PLAYER_NAME,
)
from custom_components.fortnite_activity.coordinator import FortniteDataUpdateCoordinator, UpdateFailed
from custom_components.fortnite_activity.storage import FortniteStorage

FIXTURES_DIR = Path(__file__).resolve().parent.parent / "fixtures" / "synthetic"


class TestFortniteDataUpdateCoordinator(unittest.IsolatedAsyncioTestCase):
    """Test coordinator adaptive polling and data aggregation."""

    async def asyncSetUp(self) -> None:
        """Set up test fixtures and mocked client."""
        with open(FIXTURES_DIR / "stats_baseline.json", encoding="utf-8") as f:
            self.raw_baseline = json.load(f)
        with open(FIXTURES_DIR / "stats_after_win.json", encoding="utf-8") as f:
            self.raw_after_win = json.load(f)
        with open(FIXTURES_DIR / "ranked.json", encoding="utf-8") as f:
            self.raw_ranked = json.load(f)
        with open(FIXTURES_DIR / "level.json", encoding="utf-8") as f:
            self.raw_level = json.load(f)

        self.mock_client = MagicMock(spec=ApiFortniteClient)
        self.mock_client.get_raw_stats = AsyncMock(return_value=self.raw_baseline)
        self.mock_client.get_raw_ranked = AsyncMock(return_value=self.raw_ranked)
        self.mock_client.get_raw_level = AsyncMock(return_value=self.raw_level)

        self.mock_hass = MagicMock()
        self.mock_storage = MagicMock(spec=FortniteStorage)
        self.mock_storage.get_player_history.return_value = []
        self.mock_storage.get_active_session.return_value = None
        self.mock_storage.async_save = AsyncMock()

        self.entry_data = {
            CONF_PLAYERS: [
                {
                    CONF_PLAYER_ID: "player1",
                    CONF_PLAYER_NAME: "Player One",
                    CONF_ACCOUNT_ID: "test_player1_account",
                }
            ]
        }
        self.entry_options = {
            CONF_ACTIVE_INTERVAL: 90,
            CONF_IDLE_INTERVAL: 1800,
            CONF_INACTIVITY_TIMEOUT: 20,
        }

    async def test_coordinator_initial_fetch_idle(self) -> None:
        """Test initial fetch when player is idle."""
        coordinator = FortniteDataUpdateCoordinator(
            hass=self.mock_hass,
            api_client=self.mock_client,
            entry_data=self.entry_data,
            entry_options=self.entry_options,
            storage=self.mock_storage,
        )

        data = await coordinator._async_update_data()
        self.assertIn("player1", data)
        self.assertFalse(data["player1"]["is_playing"])
        self.assertEqual(data["player1"]["stats"]["overall"]["matches"], 180)
        self.assertEqual(coordinator.update_interval, timedelta(seconds=1800))

    async def test_coordinator_shifts_to_fast_polling_when_active(self) -> None:
        """Test coordinator shifts to 90s polling when a player becomes active."""
        coordinator = FortniteDataUpdateCoordinator(
            hass=self.mock_hass,
            api_client=self.mock_client,
            entry_data=self.entry_data,
            entry_options=self.entry_options,
            storage=self.mock_storage,
        )

        # First poll sets baseline
        await coordinator._async_update_data()
        self.assertEqual(coordinator.update_interval, timedelta(seconds=1800))

        # Now simulate next poll returns after-win stats (matches played incremented)
        self.mock_client.get_raw_stats = AsyncMock(return_value=self.raw_after_win)
        data = await coordinator._async_update_data()

        self.assertTrue(data["player1"]["is_playing"])
        self.assertIsNotNone(data["player1"]["session"])
        self.assertEqual(data["player1"]["session"]["summary"]["matches_played"], 1)
        self.assertEqual(coordinator.update_interval, timedelta(seconds=90))

    async def test_match_polling_never_calls_level_endpoint(self) -> None:
        """Level needs an Epic token and is fetched by the profile coordinator, not per match poll."""
        coordinator = FortniteDataUpdateCoordinator(
            hass=self.mock_hass,
            api_client=self.mock_client,
            entry_data=self.entry_data,
            entry_options=self.entry_options,
            storage=self.mock_storage,
        )
        data = await coordinator._async_update_data()
        self.assertNotIn("level", data["player1"])
        self.mock_client.get_raw_level.assert_not_called()

    async def test_coordinator_first_fetch_failure_raises_update_failed(self) -> None:
        """Test coordinator raises UpdateFailed on first fetch error without throwing TypeError on None self.data."""
        self.mock_client.get_raw_stats = AsyncMock(side_effect=FortniteAuthError("Invalid API key"))
        coordinator = FortniteDataUpdateCoordinator(
            hass=self.mock_hass,
            api_client=self.mock_client,
            entry_data=self.entry_data,
            entry_options=self.entry_options,
            storage=self.mock_storage,
        )
        self.assertIsNone(coordinator.data)

        with self.assertRaises(UpdateFailed):
            await coordinator._async_update_data()


if __name__ == "__main__":
    unittest.main()


    async def test_manual_start_and_end_update_published_data(self) -> None:
        """Manual start/end must be reflected in coordinator data, not just the manager."""
        coordinator = FortniteDataUpdateCoordinator(
            hass=self.mock_hass,
            api_client=self.mock_client,
            entry_data=self.entry_data,
            entry_options=self.entry_options,
            storage=self.mock_storage,
        )
        coordinator.data = await coordinator._async_update_data()

        self.assertIsNotNone(coordinator.start_player_session("player1"))
        self.assertTrue(coordinator.data["player1"]["is_playing"])
        self.assertIsNotNone(coordinator.data["player1"]["session"])
        self.assertEqual(coordinator.update_interval, timedelta(seconds=90))

        self.assertIsNotNone(await coordinator.async_end_player_session("player1"))
        self.assertFalse(coordinator.data["player1"]["is_playing"])
        self.assertIsNone(coordinator.data["player1"]["session"])
        self.assertIsNotNone(coordinator.data["player1"]["last_session"])
        self.assertEqual(coordinator.update_interval, timedelta(seconds=1800))
        self.mock_storage.async_save.assert_awaited()
