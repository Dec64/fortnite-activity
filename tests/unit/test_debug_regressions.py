"""Regression tests for the 1.0.9 debug pass (synthetic data only)."""

from __future__ import annotations

import copy
import json
from pathlib import Path
import unittest
from unittest.mock import MagicMock

from custom_components.fortnite_activity.api.api_fortnite import ApiFortniteClient
from custom_components.fortnite_activity.session_manager import FortniteSessionManager
from custom_components.fortnite_activity.storage import FortniteStorage

FIXTURES_DIR = Path(__file__).resolve().parent.parent / "fixtures" / "synthetic"


def _load(name: str):
    with open(FIXTURES_DIR / name, encoding="utf-8") as f:
        return json.load(f)


def _bump(raw: dict, playlist: str, **deltas: int) -> dict:
    """Return a copy of raw stats with keyboardmouse counters for playlist incremented."""
    out = copy.deepcopy(raw)
    for stat, delta in deltas.items():
        key = f"br_{stat}_keyboardmouse_m0_playlist_{playlist}"
        out["stats"][key] = out["stats"].get(key, 0) + delta
    return out


class TestRankedParsing(unittest.TestCase):
    def test_rank_progress_and_unreal_rank(self) -> None:
        rows = _load("ranked.json")
        rows[1]["currentRank"] = "Unreal"
        rows[1]["unrealRank"] = 4321
        ranked = ApiFortniteClient.parse_ranked(rows)
        self.assertEqual(ranked["battle_royale"]["progress_pct"], 8.0)
        self.assertEqual(ranked["reload_build"]["progress_pct"], 71.0)
        self.assertEqual(ranked["reload_build"]["unreal_rank"], 4321)
        self.assertIsNone(ranked["battle_royale"]["unreal_rank"])


class TestSessionDetection(unittest.TestCase):
    def setUp(self) -> None:
        self.raw = _load("stats_baseline.json")
        self.ranked = ApiFortniteClient.parse_ranked(_load("ranked.json"))
        self.manager = FortniteSessionManager(player_id="player1", player_name="Player One")
        self.manager.start_session(ApiFortniteClient.parse_stats(self.raw), self.ranked)

    def test_duos_top12_placement_detected(self) -> None:
        after = _bump(self.raw, "defaultduo", matchesplayed=1, kills=2, placetop12=1)
        matches = self.manager.update_and_detect_matches(ApiFortniteClient.parse_stats(after), self.ranked)
        self.assertEqual(len(matches), 1)
        self.assertEqual(matches[0]["placement_text"], "Top 12")

    def test_two_matches_in_one_poll_are_counted(self) -> None:
        after = _bump(self.raw, "defaultsolo", matchesplayed=2, kills=3)
        self.manager.update_and_detect_matches(ApiFortniteClient.parse_stats(after), self.ranked)
        summary = self.manager.active_session["summary"]
        self.assertEqual(summary["matches_played"], 2)
        self.assertEqual(self.manager.active_session["matches"][0]["match_count"], 2)

    def test_rank_delta_across_tier_boundary(self) -> None:
        rows = _load("ranked.json")
        rows[0]["currentDivision"] += 1
        rows[0]["rankProgress"] = 0.02  # promoted: 8% -> next division 2% = +94
        after = _bump(self.raw, "habanero_solo", matchesplayed=1)
        matches = self.manager.update_and_detect_matches(
            ApiFortniteClient.parse_stats(after), ApiFortniteClient.parse_ranked(rows)
        )
        self.assertEqual(matches[0]["rank_delta_pct"], 94.0)
        self.assertEqual(self.manager.active_session["summary"]["net_rank_delta_pct"], 94.0)

    def test_restore_after_restart_continues_session(self) -> None:
        saved = self.manager.export_active_state()
        restored = FortniteSessionManager(player_id="player1", player_name="Player One")
        restored.restore_active_state(json.loads(json.dumps(saved)))
        self.assertTrue(restored.is_active)
        # First poll after restart only re-baselines
        self.assertEqual(restored.update_and_detect_matches(ApiFortniteClient.parse_stats(self.raw), self.ranked), [])
        after = _bump(self.raw, "defaultsolo", matchesplayed=1)
        self.assertEqual(
            len(restored.update_and_detect_matches(ApiFortniteClient.parse_stats(after), self.ranked)), 1
        )


class TestStorageMigration(unittest.IsolatedAsyncioTestCase):
    async def test_legacy_history_layout_is_migrated(self) -> None:
        storage = FortniteStorage(MagicMock())
        store = MagicMock()

        async def _load_legacy():
            return {"player1": [{"session_id": "s1"}]}

        store.async_load = _load_legacy
        storage._store = store
        await storage.async_load()
        self.assertEqual(storage.get_player_history("player1"), [{"session_id": "s1"}])
        self.assertIsNone(storage.get_active_session("player1"))


if __name__ == "__main__":
    unittest.main()
