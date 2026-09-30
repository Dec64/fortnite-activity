"""Unit tests for ApiFortniteClient and parsers."""

from __future__ import annotations

import json
from pathlib import Path
import unittest

from custom_components.fortnite_activity.api.api_fortnite import ApiFortniteClient
from custom_components.fortnite_activity.const import MODE_BUILD, MODE_RELOAD, MODE_ZERO_BUILD

FIXTURES_DIR = Path(__file__).resolve().parent.parent / "fixtures" / "synthetic"


class TestApiFortniteClient(unittest.TestCase):
    """Test parsing and data transformation in ApiFortniteClient."""

    def setUp(self) -> None:
        """Load synthetic fixtures."""
        with open(FIXTURES_DIR / "stats_baseline.json", encoding="utf-8") as f:
            self.baseline_stats = json.load(f)
        with open(FIXTURES_DIR / "stats_after_win.json", encoding="utf-8") as f:
            self.after_win_stats = json.load(f)
        with open(FIXTURES_DIR / "ranked.json", encoding="utf-8") as f:
            self.ranked_raw = json.load(f)
        with open(FIXTURES_DIR / "level.json", encoding="utf-8") as f:
            self.level_raw = json.load(f)

    def test_parse_stats_baseline(self) -> None:
        """Test parsing of baseline statistics."""
        parsed = ApiFortniteClient.parse_stats(self.baseline_stats)
        overall = parsed["overall"]

        # Expected totals:
        # nobuildbr_duo: 100 matches, 400 kills, 15 wins
        # defaultsolo: 50 matches, 150 kills, 5 wins
        # ropesmileduo: 30 matches, 90 kills, 3 wins
        # Total matches = 180, kills = 640, wins = 23
        self.assertEqual(overall["matches"], 180)
        self.assertEqual(overall["kills"], 640)
        self.assertEqual(overall["wins"], 23)
        # deaths = 180 - 23 = 157; kd = 640 / 157 = 4.08
        self.assertEqual(overall["kd"], 4.08)
        # win_rate = 23 / 180 = 12.8%
        self.assertEqual(overall["win_rate"], 12.8)

        # Check mode breakdowns
        modes = parsed["modes"]
        self.assertEqual(modes[MODE_ZERO_BUILD]["matches"], 100)
        self.assertEqual(modes[MODE_ZERO_BUILD]["kills"], 400)
        self.assertEqual(modes[MODE_ZERO_BUILD]["wins"], 15)

        self.assertEqual(modes[MODE_BUILD]["matches"], 50)
        self.assertEqual(modes[MODE_BUILD]["kills"], 150)
        self.assertEqual(modes[MODE_BUILD]["wins"], 5)

        self.assertEqual(modes[MODE_RELOAD]["matches"], 30)
        self.assertEqual(modes[MODE_RELOAD]["kills"], 90)
        self.assertEqual(modes[MODE_RELOAD]["wins"], 3)

        # Check playlists
        playlists = parsed["playlists"]
        self.assertIn("nobuildbr_duo", playlists)
        self.assertEqual(playlists["nobuildbr_duo"]["name"], "Zero Build Duos")
        self.assertEqual(playlists["nobuildbr_duo"]["top5"], 35)

    def test_parse_stats_after_win(self) -> None:
        """Test parsing of stats after 1 new win and 7 kills."""
        parsed = ApiFortniteClient.parse_stats(self.after_win_stats)
        overall = parsed["overall"]

        self.assertEqual(overall["matches"], 181)
        self.assertEqual(overall["kills"], 647)
        self.assertEqual(overall["wins"], 24)

        duo = parsed["playlists"]["nobuildbr_duo"]
        self.assertEqual(duo["matches"], 101)
        self.assertEqual(duo["kills"], 407)
        self.assertEqual(duo["wins"], 16)
        self.assertEqual(duo["last_modified"], 1695001200)

    def test_parse_ranked(self) -> None:
        """Test parsing of ranked tracks."""
        ranked = ApiFortniteClient.parse_ranked(self.ranked_raw)

        br = ranked["battle_royale"]
        self.assertIsNotNone(br)
        self.assertEqual(br["game_mode"], "Battle Royale")
        self.assertEqual(br["current_rank"], "Champion I")
        self.assertEqual(br["current_division"], 9)
        self.assertEqual(br["progress_pct"], 8.0)
        self.assertEqual(br["highest_rank"], "Champion II")

        reload_track = ranked["reload_build"]
        self.assertIsNotNone(reload_track)
        self.assertEqual(reload_track["game_mode"], "Reload Build")
        self.assertEqual(reload_track["current_rank"], "Elite III")
        self.assertEqual(reload_track["progress_pct"], 71.0)

        self.assertEqual(len(ranked["current_tracks"]), 2)

    def test_parse_level(self) -> None:
        """Test parsing level response."""
        level = ApiFortniteClient.parse_level(self.level_raw)
        self.assertEqual(level["level"], 214)
        self.assertEqual(level["tier"], 214)
        self.assertEqual(level["xp"], 66601)
        self.assertEqual(level["account_level"], 3256)

    def test_playlist_resolution(self) -> None:
        """Test playlist name and mode resolution helpers."""
        self.assertEqual(ApiFortniteClient.resolve_playlist_name("nobuildbr_duo"), "Zero Build Duos")
        self.assertEqual(ApiFortniteClient.resolve_playlist_name("defaultsolo"), "Battle Royale Solo")
        self.assertEqual(ApiFortniteClient.resolve_playlist_name("ropesmileduo"), "Reload Duos")

        self.assertEqual(ApiFortniteClient.resolve_playlist_mode("nobuildbr_duo"), MODE_ZERO_BUILD)
        self.assertEqual(ApiFortniteClient.resolve_playlist_mode("defaultsolo"), MODE_BUILD)
        self.assertEqual(ApiFortniteClient.resolve_playlist_mode("ropesmileduo"), MODE_RELOAD)


if __name__ == "__main__":
    unittest.main()
