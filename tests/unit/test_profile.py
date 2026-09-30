"""Tests for derived profile metrics and catalogue parsers.

Field names follow the sanitized evidence / OpenAPI DTOs:
SeasonEntryDto, GlobalEventDto (+ regional eventWindows), /v2/playlists items,
and v2 stats keys. Account/externalAuths are untyped upstream, so several
plausible shapes are exercised and must never raise.
"""

from __future__ import annotations

from datetime import datetime, timezone
import json
from pathlib import Path
import unittest
from unittest.mock import AsyncMock, MagicMock

from custom_components.fortnite_activity.api.api_fortnite import ApiFortniteClient, FortniteApiError
from custom_components.fortnite_activity.profile import (
    compute_metrics,
    parse_display_name,
    parse_external_auths,
    parse_playlists,
    parse_season,
    parse_tournaments,
    team_size,
    window_is_valid,
)
from custom_components.fortnite_activity.profile_coordinator import FortniteProfileCoordinator

FIXTURES_DIR = Path(__file__).resolve().parent.parent / "fixtures" / "synthetic"
NOW = datetime(2026, 9, 30, 12, 0, tzinfo=timezone.utc)


def _stats() -> dict:
    with open(FIXTURES_DIR / "stats_baseline.json", encoding="utf-8") as f:
        return json.load(f)


class TestMetrics(unittest.TestCase):
    def test_team_size(self) -> None:
        self.assertEqual(team_size("nobuildbr_duo"), "duo")
        self.assertEqual(team_size("defaultsquad"), "squad")
        self.assertEqual(team_size("ropesmilesquad"), "squad")
        self.assertEqual(team_size("trios"), "trio")
        self.assertIsNone(team_size("creative_mms_2playerstandard"))

    def test_compute_metrics_from_parsed_stats(self) -> None:
        raw = _stats()
        raw["stats"]["br_matchesplayed_gamepad_m0_playlist_defaultsolo"] = 10
        raw["stats"]["br_placetop10_gamepad_m0_playlist_defaultsolo"] = 4
        raw["stats"]["br_lastmodified_gamepad_m0_playlist_defaultsolo"] = 1790000000
        parsed = ApiFortniteClient.parse_stats(raw)
        m = compute_metrics(parsed)
        overall = parsed["overall"]
        self.assertAlmostEqual(m["kills_per_match"], round(overall["kills"] / overall["matches"], 2))
        self.assertIn("gamepad", m["inputs"])
        self.assertEqual(m["inputs"]["gamepad"]["label"], "Controller")
        self.assertEqual(m["last_played"]["playlist_id"], "defaultsolo")
        self.assertTrue(m["last_played"]["time"].startswith("2026-09-21"))
        self.assertIsNotNone(m["favourite_mode"])
        self.assertIn("solo", m["team_sizes"])

    def test_empty_stats_do_not_divide_by_zero(self) -> None:
        m = compute_metrics(ApiFortniteClient.parse_stats({"stats": {}}))
        self.assertEqual(m["kills_per_match"], 0.0)
        self.assertIsNone(m["last_played"])
        self.assertIsNone(m["favourite_mode"])


class TestWindowValidation(unittest.TestCase):
    def test_echoed_start_is_trusted(self) -> None:
        self.assertTrue(window_is_valid({"startTime": 1000}, 1000, 500, 500))
        self.assertFalse(window_is_valid({"startTime": 0}, 1000, 12, 500))

    def test_ignored_parameter_detected_without_echo(self) -> None:
        self.assertFalse(window_is_valid({}, 1000, 500, 500))
        self.assertTrue(window_is_valid({}, 1000, 12, 500))


class TestParsers(unittest.TestCase):
    def test_season(self) -> None:
        season = parse_season(
            {"seasonNumber": 42, "seasonDateBegin": "2026-08-20T08:00:00.0000000Z",
             "seasonDateEnd": "2026-12-07T08:00:00.0000000Z", "exTime": 0},
            NOW,
        )
        self.assertEqual(season["number"], 42)
        self.assertEqual(season["days_left"], 67)
        self.assertGreater(season["progress_pct"], 0)
        self.assertIsNone(parse_season({}, NOW))

    def test_playlists_catalogue(self) -> None:
        cat = parse_playlists({"playlists": [
            {"playlist_name": "Playlist_DefaultSolo", "display_name": "Solo", "description": "d",
             "image": "https://example.invalid/solo.png", "hidden": False},
            {"display_name": "no id"},
        ]})
        self.assertEqual(cat["defaultsolo"]["image"], "https://example.invalid/solo.png")
        self.assertEqual(len(cat), 1)
        self.assertEqual(parse_playlists(None), {})

    def test_display_name_shapes(self) -> None:
        self.assertEqual(parse_display_name({"id": "x", "displayName": "Synth"}), "Synth")
        self.assertEqual(parse_display_name([{"displayName": "Synth"}]), "Synth")
        self.assertEqual(parse_display_name({"data": {"displayName": "Synth"}}), "Synth")
        self.assertIsNone(parse_display_name("unexpected"))

    def test_external_auth_shapes(self) -> None:
        as_dict = parse_external_auths({"psn": {"type": "psn", "externalDisplayName": "DecPSN"}})
        self.assertEqual(as_dict, [{"type": "psn", "label": "PlayStation", "name": "DecPSN"}])
        as_list = parse_external_auths([{"type": "xbl", "externalDisplayName": "DecXB"}, "junk"])
        self.assertEqual(as_list[0]["label"], "Xbox")
        self.assertEqual(parse_external_auths(None), [])

    def test_tournaments_region_filter_and_ordering(self) -> None:
        def window(wid, begin, end):
            return {"eventWindowId": wid, "beginTime": begin, "endTime": end, "round": 0, "visibility": "public"}

        raw = [{
            "id": "e1", "displayDataId": "d1", "name": "Solo Cash Cup", "titleLine1": "Solo Cash Cup",
            "poster": "https://example.invalid/p.png", "loadingScreen": None,
            "regions": {
                "EU": [{"eventId": "e1_eu", "platforms": ["Windows"], "eventWindows": [
                    window("past", "2026-09-01T18:00:00.0000000Z", "2026-09-01T21:00:00.0000000Z"),
                    window("later", "2026-10-03T18:00:00.0000000Z", "2026-10-03T21:00:00.0000000Z"),
                    window("live", "2026-09-30T11:00:00.0000000Z", "2026-09-30T14:00:00.0000000Z"),
                ]}],
                "NAE": [{"eventId": "e1_nae", "eventWindows": [
                    window("nae", "2026-10-01T00:00:00.0000000Z", "2026-10-01T03:00:00.0000000Z"),
                ]}],
            },
        }]
        result = parse_tournaments(raw, "EU", NOW)
        self.assertEqual([w["window_id"] for w in result], ["live", "later"])
        self.assertTrue(result[0]["is_live"])
        self.assertEqual(result[0]["name"], "Solo Cash Cup")
        self.assertEqual(parse_tournaments({"bad": 1}, "EU", NOW), [])


class TestProfileCoordinatorIsolation(unittest.IsolatedAsyncioTestCase):
    async def test_failures_never_raise_and_windows_hidden_when_unsupported(self) -> None:
        client = MagicMock(spec=ApiFortniteClient)
        client.get_season = AsyncMock(return_value={
            "seasonNumber": 42, "seasonDateBegin": "2026-08-20T08:00:00Z", "seasonDateEnd": "2026-12-07T08:00:00Z"})
        client.get_playlists = AsyncMock(side_effect=FortniteApiError("500"))
        client.get_events_global = AsyncMock(side_effect=ValueError("bad json"))
        client.get_account = AsyncMock(return_value={"displayName": "Synth"})
        client.get_external_auths = AsyncMock(return_value=[])
        lifetime_raw = _stats()
        # API ignores startTime: echoes 0 and returns lifetime totals
        client.get_raw_stats = AsyncMock(return_value={**lifetime_raw, "startTime": 0})
        lifetime = ApiFortniteClient.parse_stats(lifetime_raw)["overall"]["matches"]

        coordinator = FortniteProfileCoordinator(
            MagicMock(), client, [{"player_id": "player1", "account_id": "synthetic"}], "EU", lambda _pid: lifetime
        )
        data = await coordinator._async_update_data()
        self.assertEqual(data["player1"]["display_name"], "Synth")
        self.assertEqual(coordinator.season["number"], 42)
        self.assertEqual(coordinator.playlists, {})
        self.assertIsNone(coordinator.tournaments)
        self.assertEqual(set(data["player1"]["windows"]), {"today", "week", "season"})
        self.assertTrue(all(v is None for v in data["player1"]["windows"].values()))


if __name__ == "__main__":
    unittest.main()
