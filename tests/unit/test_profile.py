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
    parse_leaderboard,
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

    def test_tournaments_all_regions_tags_and_ordering(self) -> None:
        def window(wid, begin, end):
            return {"eventWindowId": wid, "beginTime": begin, "endTime": end, "round": 8, "visibility": "public"}

        raw = [{
            "id": "e1", "displayDataId": "d1", "name": "Duos Ranked Cup (Zero Build)", "titleLine1": "x",
            "poster": "https://example.invalid/p.png", "loadingScreen": None,
            "regions": {
                "EU": [{"eventId": "S42_DuosRankedCup_EU", "platforms": ["Windows", "PS5", "IOS"], "eventWindows": [
                    window("S42_Cup_Event1Round1_EU", "2026-09-01T18:00:00.0000000Z", "2026-09-01T21:00:00.0000000Z"),
                    window("S42_Cup_Event3Round2_EU", "2026-10-03T18:00:00.0000000Z", "2026-10-03T21:00:00.0000000Z"),
                    window("S42_Cup_Event3Round1_EU", "2026-09-30T11:00:00.0000000Z", "2026-09-30T14:00:00.0000000Z"),
                ]}],
                "NAE": [{"eventId": "S42_DuosRankedCup_NAE", "platforms": ["PS5"], "eventWindows": [
                    window("S42_Cup_Event3Round1_NAE", "2026-10-01T00:00:00.0000000Z", "2026-10-01T03:00:00.0000000Z"),
                ]}],
            },
        }, {
            "id": "e2", "name": "Console Reload Solo Victory Cup",
            "regions": {"EU": [{"eventId": "S42_ReloadSolo_EU", "platforms": ["Windows", "PS5"], "eventWindows": [
                window("S42_Reload_Event1Round1_EU", "2026-10-02T18:00:00Z", "2026-10-02T21:00:00Z")]}]},
        }]
        events = parse_tournaments(raw, NOW)
        self.assertEqual([e["key"] for e in events], ["S42_DuosRankedCup_EU", "S42_DuosRankedCup_NAE", "S42_ReloadSolo_EU"])
        eu = events[0]
        self.assertTrue(eu["is_live"])
        self.assertEqual([w["label"] for w in eu["windows"]], ["Round 1", "Round 2"])  # month-old window dropped
        self.assertEqual((eu["mode"], eu["team"], eu["ranked"]), ("Zero Build", "Duos", True))
        self.assertEqual(eu["platform_groups"], ["PC", "Console", "Mobile"])
        self.assertEqual(events[1]["region_group"], "NA")
        reload = events[2]
        self.assertEqual((reload["mode"], reload["team"]), ("Reload", "Solo"))
        self.assertEqual(reload["platform_groups"], ["Console"])  # name restriction wins over platform codes
        self.assertEqual(parse_tournaments({"bad": 1}, NOW), [])

    def test_leaderboard(self) -> None:
        raw = {"page": 0, "totalPages": 40, "updatedTime": "2026-09-16T08:08:52Z", "entries": [
            {"rank": 1, "pointsEarned": 200, "percentile": 0, "teamId": "aaa:bbb",
             "teamAccountDisplayNames": ["One", "Two"],
             "sessionHistory": [
                 {"trackedStats": {"PLACEMENT_STAT_INDEX": 1, "TEAM_ELIMS_STAT_INDEX": 12, "VICTORY_ROYALE_STAT": 1}},
                 {"trackedStats": {"PLACEMENT_STAT_INDEX": 4, "TEAM_ELIMS_STAT_INDEX": 3}},
             ]},
            {"rank": 2, "pointsEarned": 150, "teamId": "synthetic_me", "teamAccountDisplayNames": ["Me"], "sessionHistory": []},
        ]}
        lb = parse_leaderboard(raw, "synthetic_me")
        self.assertEqual(lb["entries"][0]["elims"], 15)
        self.assertEqual(lb["entries"][0]["wins"], 1)
        self.assertEqual(lb["entries"][0]["best_placement"], 1)
        self.assertEqual(lb["player"]["rank"], 2)
        self.assertIsNone(parse_leaderboard("nope"))


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


class TestBattlePass(unittest.TestCase):
    def test_parse_battlepass_catalog_dto(self) -> None:
        from custom_components.fortnite_activity.profile import parse_battlepass, sample_items

        bp = parse_battlepass({"data": {
            "gameVersion": "42.20", "season": 42, "plugin": "x", "generated": "2026-09-30T00:00:00Z", "levelRewards": {},
            "prices": [{"name": "Battle Pass", "cost": 950, "currency": "MtxCurrency"}],
            "pages": [
                {"id": "p2", "track": "Paid", "page": 2, "rewards": [{"item": "AthenaCharacter:x", "displayName": "Skin X",
                  "type": "Outfit", "rarity": "Epic", "icon": "https://example.invalid/x.png", "quantity": 1, "cost": 8, "currency": "Stars"}]},
                {"id": "p1", "track": "Paid", "page": 1, "rewards": [{"item": "y", "displayName": "Wrap Y", "cost": 0, "priceRow": "Included"}]},
            ],
        }})
        self.assertEqual(bp["season"], 42)
        self.assertEqual([p["page"] for p in bp["pages"]], [1, 2])
        self.assertEqual(bp["pages"][1]["rewards"][0]["name"], "Skin X")
        self.assertEqual(bp["reward_count"], 2)
        self.assertIsNone(parse_battlepass({"data": {"no": "pages"}}))
        self.assertEqual(sample_items({"quests": [{"a": 1}, {"a": 2}, {"a": 3}, {"a": 4}]}, 2),
                         {"largest_list_length": 4, "sample": [{"a": 1}, {"a": 2}]})


class TestInventoryAndQuests(unittest.TestCase):
    def test_inventory_globalcash(self) -> None:
        from custom_components.fortnite_activity.profile import parse_inventory

        self.assertEqual(parse_inventory({"stash": {"globalcash": 1250}}), {"vbucks": 1250, "balances": {"globalcash": 1250}})
        self.assertEqual(parse_inventory({"data": {"stash": {"globalcash": 0}}})["vbucks"], 0)
        self.assertIsNone(parse_inventory({"stash": {}}))
        self.assertIsNone(parse_inventory("bad"))

    def test_quest_state_counts_only(self) -> None:
        from custom_components.fortnite_activity.profile import summarise_quests

        raw = {"data": {"quests": [
            {"templateId": "Quest:a", "state": "Active", "objectives": []},
            {"templateId": "Quest:b", "state": "Claimed", "objectives": []},
            {"templateId": "Quest:c", "state": "Active", "objectives": []},
        ]}}
        self.assertEqual(summarise_quests(raw), {"total": 3, "by_state": {"Active": 2, "Claimed": 1}})
        self.assertIsNone(summarise_quests({"data": []}))


class TestCommonCore(unittest.TestCase):
    ACC = "a" * 32

    def _profile(self, account: str) -> dict:
        return {"profileRevision": 1, "profileChanges": [{"changeType": "fullProfileUpdate", "profile": {
            "accountId": account, "profileId": "common_core", "updated": "2026-10-01T10:00:00Z",
            "stats": {"attributes": {"current_mtx_platform": "EpicPC", "subscriptions": [
                {"subscriptionEndDate": "2026-10-22T15:51:59Z", "nextRewardDate": "2026-10-22T15:51:59Z", "autoRenewState": "AutoRenewEnabled"}]}},
            "items": {
                "i1": {"templateId": "Currency:MtxPurchased", "quantity": 1000, "attributes": {"platform": "EpicPC"}},
                "i2": {"templateId": "Currency:MtxComplimentary", "quantity": 350, "attributes": {"platform": "Shared"}},
                "i3": {"templateId": "Currency:MtxPurchased", "quantity": 500, "attributes": {"platform": "PSN"}},
                "i4": {"templateId": "AthenaCharacter:cid_x", "quantity": 1, "attributes": {}},
            }}}]}

    def test_vbucks_current_platform_plus_shared_and_crew(self) -> None:
        from custom_components.fortnite_activity.profile import parse_common_core

        w = parse_common_core(self._profile(self.ACC), self.ACC)
        self.assertEqual(w["vbucks"], 1350)
        self.assertEqual(w["by_kind"], {"purchased": 1000, "earned": 350})
        self.assertEqual(w["other_platform_vbucks"], 500)
        self.assertEqual(w["crew"]["auto_renew"], "AutoRenewEnabled")

    def test_identity_gate(self) -> None:
        from custom_components.fortnite_activity.profile import parse_common_core

        self.assertIsNone(parse_common_core(self._profile("b" * 32), self.ACC))
        self.assertIsNone(parse_common_core({"bad": 1}, self.ACC))


def test_cosmetic_items_handles_wrappers():
    from custom_components.fortnite_activity.profile import cosmetic_items

    item = {"id": "CID_SYNTH_001", "name": "Synthetic Hero", "type": "outfit", "images": {"icon": "https://example.invalid/i.png"}}
    assert cosmetic_items([item]) == [item]
    assert cosmetic_items({"data": [item]}) == [item]
    assert cosmetic_items({"success": True, "data": {"page": 1, "total": 1, "data": [item]}}) == [item]
    assert cosmetic_items({"data": None}) == []
    assert cosmetic_items("nope") == []


SYNTH_ACCOUNT = "0123456789abcdef0123456789abcdef"


def _athena(account=SYNTH_ACCOUNT, profile_id="athena"):
    return {
        "profileChanges": [
            {
                "profile": {
                    "accountId": account,
                    "profileId": profile_id,
                    "updated": "2026-10-01T00:00:00Z",
                    "items": {
                        "guid-1": {"templateId": "AthenaCharacter:CID_Synth_A", "attributes": {"variants": []}},
                        "guid-2": {"templateId": "AthenaCharacter:Character_SynthB"},
                        "guid-3": {"templateId": "AthenaPickaxe:Pickaxe_Synth"},
                        "guid-4": {"templateId": "AthenaCharacter:CID_Synth_A"},
                        "guid-5": {"templateId": "Quest:quest_synth_q01"},
                        "guid-6": {"templateId": "AthenaSeason:athenaseason42"},
                        "guid-7": {"templateId": "CosmeticLocker:cosmeticlocker_athena"},
                    },
                }
            }
        ]
    }


def test_parse_athena_outfits_keeps_only_outfit_ids():
    from custom_components.fortnite_activity.profile import parse_athena_outfits

    parsed = parse_athena_outfits(_athena(), SYNTH_ACCOUNT)
    assert parsed["ids"] == ["character_synthb", "cid_synth_a"]
    assert parsed["count"] == 2
    assert parsed["cosmetics"] == {
        "cid_synth_a": "AthenaCharacter",
        "character_synthb": "AthenaCharacter",
        "pickaxe_synth": "AthenaPickaxe",
    }


def test_parse_athena_outfits_identity_gate():
    from custom_components.fortnite_activity.profile import parse_athena_outfits

    assert parse_athena_outfits(_athena(account="f" * 32), SYNTH_ACCOUNT) is None
    assert parse_athena_outfits(_athena(profile_id="common_core"), SYNTH_ACCOUNT) is None
    assert parse_athena_outfits({"profileChanges": []}, SYNTH_ACCOUNT) is None


def test_outfit_records():
    from custom_components.fortnite_activity.profile import is_outfit_record, outfit_summary

    item = {"id": "CID_Synth_A", "type": "outfit", "name": "Synth A", "rarity": "Epic", "images": {"icon": "https://example.invalid/a.png"}}
    assert is_outfit_record(item)
    assert not is_outfit_record({"id": "BID_Synth", "type": "backpack"})
    assert outfit_summary(item)["icon"] == "https://example.invalid/a.png"



def test_mark_battlepass_owned():
    from custom_components.fortnite_activity.profile import mark_battlepass_owned

    bp = {
        "season": 42,
        "pages": [
            {"track": "SynthSet", "page": 1, "rewards": [
                {"name": "Pick", "type": "AthenaPickaxe", "item": "Pickaxe_Synth"},
                {"name": "Glide", "type": "AthenaGlider", "item": "AthenaGlider:Glider_Synth"},
                {"name": "Pick 2", "type": "AthenaPickaxe", "item": "Pickaxe_Other"},
                {"name": "100 V-Bucks", "type": "Currency", "item": "Currency_MtxGiveaway"},
                {"name": "Emote", "type": "AthenaDance", "item": "EID_Synth"},
                {"name": "No id", "type": "AthenaPickaxe"},
            ]},
        ],
    }
    owned = {"pickaxe_synth": "AthenaPickaxe", "glider_synth": "AthenaGlider"}
    marked = mark_battlepass_owned(bp, owned)
    status = [r["owned"] for r in marked["pages"][0]["rewards"]]
    # pickaxe owned, glider owned, other pickaxe locked, currency unknown,
    # emote type never matched -> unknown, missing id -> unknown
    assert status == [True, True, False, None, None, None]
    assert (marked["unlocked"], marked["known"]) == (2, 3)
    assert mark_battlepass_owned(bp, None) is bp
    assert "owned" not in bp["pages"][0]["rewards"][0]  # original untouched


def test_parse_shop_and_news_and_map():
    from custom_components.fortnite_activity.profile import parse_shop, parse_news, parse_map, map_mode_for_playlist

    shop = parse_shop({"status": 200, "data": {"expiration": "2026-10-02T00:00:00Z", "storefronts": [{"name": "BR", "catalogEntries": [
        {"offerId": "o1", "title": "Synth Hero", "sectionDisplayName": "Featured", "sectionPriority": 5,
         "prices": [{"currencyType": "MtxCurrency", "regularPrice": 1500, "finalPrice": 1200}],
         "itemGrants": [{"templateId": "AthenaCharacter:Character_Synth", "cosmetic": {"name": "Synth Hero", "type": "outfit", "rarity": "epic", "images": {"icon": "https://example.invalid/s.png"}}}]},
    ]}]}})
    offer = shop["sections"][0]["offers"][0]
    assert offer["price"] == 1200 and offer["items"][0]["id"] == "character_synth"

    news = parse_news({"data": {"br": {"motds": [{"title": "Synthetic update", "body": "Hello", "image": "https://example.invalid/n.png"}, {"title": "Synthetic update"}]}}})
    assert [n["title"] for n in news] == ["Synthetic update"]

    m = parse_map({"data": {"imageUrl": "https://example.invalid/m.png", "pois": [{"name": "Synth Town", "x": 1, "y": 2}, {"x": 3}], "modes": ["br", "rotating:blastberry"]}})
    assert len(m["pois"]) == 1
    assert map_mode_for_playlist(m["modes"], "blastberrysquads") == "rotating:blastberry"
    assert map_mode_for_playlist(m["modes"], "defaultduo") is None


def test_progress_events_and_mode_relevance():
    from custom_components.fortnite_activity.profile import progress_events, events_for_mode, sprite_level

    curve = [{"level": 1, "xp": 0}, {"level": 2, "xp": 400}, {"level": 3, "xp": 1000}, {"level": 6, "xp": 50}]
    assert sprite_level(450, curve) == 2
    before = {"claimed": 10, "level": 5, "sprites": {
        "a": {"name": "Synth", "icon": None, "owned": False, "mastered": False, "level": None},
        "b": {"name": "Gold Synth", "icon": None, "owned": True, "mastered": False, "level": 2},
    }}
    after = {"claimed": 12, "level": 6, "sprites": {
        "a": {"name": "Synth", "icon": None, "owned": True, "mastered": False, "level": 1},
        "b": {"name": "Gold Synth", "icon": None, "owned": True, "mastered": False, "level": 3},
    }}
    events = progress_events(before, after)
    assert [e["type"] for e in events] == ["quests", "level_up", "sprite_new", "sprite_level"]
    assert progress_events(None, after) == []
    assert [e["type"] for e in events_for_mode(events, "reload")] == ["quests", "level_up"]
    assert events_for_mode(events, "zero_build") == events

