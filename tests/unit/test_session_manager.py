"""Unit tests for FortniteSessionManager and match delta engine."""

from __future__ import annotations

from datetime import datetime, timedelta, timezone
import json
from pathlib import Path
import unittest

from custom_components.fortnite_activity.api.api_fortnite import ApiFortniteClient
from custom_components.fortnite_activity.session_manager import FortniteSessionManager

FIXTURES_DIR = Path(__file__).resolve().parent.parent / "fixtures" / "synthetic"


class TestFortniteSessionManager(unittest.TestCase):
    """Test session lifecycle and match detection."""

    def setUp(self) -> None:
        """Set up test fixtures."""
        with open(FIXTURES_DIR / "stats_baseline.json", encoding="utf-8") as f:
            self.raw_baseline = json.load(f)
        with open(FIXTURES_DIR / "stats_after_win.json", encoding="utf-8") as f:
            self.raw_after_win = json.load(f)
        with open(FIXTURES_DIR / "ranked.json", encoding="utf-8") as f:
            self.raw_ranked = json.load(f)

        self.stats_baseline = ApiFortniteClient.parse_stats(self.raw_baseline)
        self.stats_after_win = ApiFortniteClient.parse_stats(self.raw_after_win)
        self.ranked = ApiFortniteClient.parse_ranked(self.raw_ranked)

    def test_start_and_detect_match(self) -> None:
        """Test starting a session and detecting a Victory Royale match."""
        manager = FortniteSessionManager(player_id="player1", player_name="Player One")
        manager.start_session(self.stats_baseline, self.ranked)

        self.assertTrue(manager.is_active)
        self.assertIsNotNone(manager.active_session)
        self.assertEqual(manager.active_session["baseline"]["matches"], 180)

        # Update ranked with +6% progression
        ranked_after = dict(self.ranked)
        ranked_after["battle_royale"] = dict(self.ranked["battle_royale"])
        ranked_after["battle_royale"]["progress_pct"] = 14.0

        matches = manager.update_and_detect_matches(self.stats_after_win, ranked_after)

        self.assertEqual(len(matches), 1)
        match = matches[0]
        self.assertEqual(match["match_number"], 1)
        self.assertEqual(match["playlist_id"], "nobuildbr_duo")
        self.assertEqual(match["mode_name"], "Zero Build Duos")
        self.assertTrue(match["is_victory"])
        self.assertEqual(match["placement_text"], "Victory Royale 🏆")
        self.assertEqual(match["kills"], 7)
        self.assertEqual(match["rank_delta_pct"], 6.0)

        # Check session summary
        summary = manager.active_session["summary"]
        self.assertEqual(summary["matches_played"], 1)
        self.assertEqual(summary["wins"], 1)
        self.assertEqual(summary["kills"], 7)
        self.assertEqual(summary["kd_ratio"], 7.0)
        self.assertEqual(summary["win_rate_pct"], 100.0)
        self.assertEqual(summary["net_rank_delta_pct"], 6.0)

    def test_inactivity_timeout_ends_session(self) -> None:
        """Test session auto-close when inactivity timeout is reached."""
        manager = FortniteSessionManager(player_id="player1", player_name="Player One", inactivity_timeout_minutes=15)
        manager.start_session(self.stats_baseline, self.ranked)

        # Simulate last activity was 20 minutes ago
        manager.last_activity_time = datetime.now(timezone.utc) - timedelta(minutes=20)

        # Feed the same stats (no changes)
        matches = manager.update_and_detect_matches(self.stats_baseline, self.ranked)
        self.assertEqual(len(matches), 0)
        self.assertFalse(manager.is_active)
        self.assertIsNone(manager.active_session)
        self.assertEqual(len(manager.history), 1)


if __name__ == "__main__":
    unittest.main()
