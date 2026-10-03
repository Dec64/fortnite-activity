"""Security and parsing tests for Epic player-token support (synthetic values only)."""

from __future__ import annotations

import asyncio
import unittest
from unittest.mock import AsyncMock, MagicMock

from custom_components.fortnite_activity.api.api_fortnite import (
    ApiFortniteClient,
    FortniteApiError,
    FortniteAuthError,
)
from custom_components.fortnite_activity.epic_auth import (
    EpicIdentityMismatch,
    EpicReauthRequired,
    EpicTokenManager,
    extract_account_id,
    identity_matches,
    parse_device_credential,
    parse_flow_start,
)
from custom_components.fortnite_activity.profile import (
    parse_power_ranking,
    parse_sprite_catalogue,
    parse_sprite_collection,
    parse_sprite_collection_all,
    parse_sprite_versions,
    sprite_level,
)

ACCOUNT = "a" * 32
SECRET = "synthetic-secret-never-real-0001"
DEVICE = "d" * 32


def _refresh_ok(account: str = ACCOUNT, expires: int = 7200) -> dict:
    return {"success": True, "data": {"access_token": "synthetic-token", "expires_in": expires, "account_id": account}}


class TestIdentityAndParsing(unittest.TestCase):
    def test_identity_gate(self) -> None:
        self.assertTrue(identity_matches({"data": {"accountId": ACCOUNT}}, ACCOUNT))
        self.assertFalse(identity_matches({"data": {"accountId": "b" * 32}}, ACCOUNT))
        # Two different ids anywhere in the payload is ambiguous, so it is rejected
        self.assertFalse(identity_matches({"accountId": ACCOUNT, "x": {"account_id": "b" * 32}}, ACCOUNT))
        self.assertFalse(identity_matches({}, ACCOUNT))

    def test_account_id_from_sign_in_must_be_single_and_well_formed(self) -> None:
        """Adding a player by sign-in has no expected id to compare with, so ambiguity is refused."""
        self.assertEqual(extract_account_id({"data": {"accountId": ACCOUNT, "deviceAuth": {"accountId": ACCOUNT}}}), ACCOUNT)
        self.assertIsNone(extract_account_id({"accountId": ACCOUNT, "x": {"account_id": "b" * 32}}))
        self.assertIsNone(extract_account_id({"data": {"access_token": "t"}}))
        self.assertIsNone(extract_account_id({"accountId": "not-an-epic-id"}))
        self.assertIsNone(extract_account_id({"accountId": "A" * 32}))

    def test_flow_start_requires_epic_or_provider_https_url(self) -> None:
        good = {"success": True, "data": {"flowId": "f1", "url": "https://www.epicgames.com/id/activate?userCode=X", "expiresIn": 600}}
        self.assertEqual(parse_flow_start(good), ("f1", "https://www.epicgames.com/id/activate?userCode=X"))
        self.assertIsNone(parse_flow_start({"flowId": "f1", "url": "https://epicgames.com.evil.example/steal"}))
        self.assertIsNone(parse_flow_start({"url": "https://www.epicgames.com/x"}))

    def test_device_credential(self) -> None:
        data = {"data": {"access_token": "t", "refresh_token": "r",
                         "deviceAuth": {"deviceId": DEVICE, "secret": SECRET, "accountId": ACCOUNT}}}
        self.assertEqual(parse_device_credential(data), (DEVICE, SECRET))
        self.assertIsNone(parse_device_credential({"data": {"access_token": "t"}}))

    def test_level_nested_tier_and_no_pass_ownership(self) -> None:
        level = ApiFortniteClient.parse_level(
            {"level": 214, "xp": 66601, "accountLevel": 3256, "battlePass": {"tier": 200, "xp": 1, "purchased": False}}
        )
        self.assertEqual(level, {"level": 214, "tier": 200, "xp": 66601, "account_level": 3256})
        self.assertIsNone(ApiFortniteClient.parse_level({}))

    def test_sprites_follow_openapi_dtos(self) -> None:
        """Field names from SpriteCollectionResponseDto / SpritesResponseDto (not the sanitized summary labels)."""
        catalogue = parse_sprite_catalogue({"data": {
            "gameVersion": "42.20",
            "sprites": [{"id": "JonesySprite", "acquisitionHint": "Found near camps", "description": "d",
                         "images": {"icon": "https://example.invalid/i.png", "iconLarge": "https://example.invalid/l.png"}}],
            "levelUpCurve": [{"level": 1, "xp": 0}, {"level": 2, "xp": 1000}, {"level": 3, "xp": 3000}],
        }})
        current = parse_sprite_collection({"data": {
            "gameVersion": "42.20", "isCurrent": True, "equippedVariant": "A",
            "ownedVariants": 46, "totalVariants": 101, "ownedFamilies": 20, "totalFamilies": 21, "completionPercent": 45.54,
            "currency": [{"item": "SpriteCoin", "count": 12}],
            "sprites": [{
                "id": "JonesySprite", "name": "Jonesy Sprite", "rarity": "Rare", "dexNumber": 27, "owned": True,
                "images": {"icon": "https://example.invalid/fam.png"},
                "variants": [
                    {"id": "A", "variant": "Base", "name": "Jonesy Sprite", "owned": True, "count": 2, "xp": 3550,
                     "mastered": True, "images": {"icon": "https://example.invalid/a.png"}},
                    {"id": "G", "variant": "Gold", "name": "Gold Jonesy Sprite", "owned": False, "count": 0, "xp": None,
                     "mastered": None},
                ],
            }],
        }}, catalogue)
        self.assertEqual(current["mastered_variants"], 1)
        fam = current["families"][0]
        self.assertEqual(fam["icon"], "https://example.invalid/fam.png")
        self.assertEqual(fam["hint"], "Found near camps")
        self.assertNotIn("level", fam["variants"][0])  # XP->level mapping is unverified, so not derived
        self.assertEqual([v["label"] for v in fam["variants"]], ["Base", "Gold"])
        self.assertFalse(fam["complete"])
        self.assertEqual(fam["variants"][1]["icon"], "https://example.invalid/fam.png")  # falls back to family art
        self.assertEqual(current["equipped"]["variant"], "Jonesy Sprite")
        self.assertEqual(current["currency"], [{"item": "SpriteCoin", "count": 12}])
        cumulative = parse_sprite_collection_all({"data": {
            "ownedVariants": 49, "totalVariants": 219, "ownedFamilies": 23, "totalFamilies": 46, "completionPercent": 22.37,
            "versions": [{"gameVersion": "42.20", "isCurrent": True, "ownedVariants": 46, "totalVariants": 101, "completionPercent": 45.54}],
        }})
        self.assertEqual(cumulative["owned_variants"], 49)
        self.assertEqual(cumulative["versions"][0]["version"], "42.20")
        self.assertEqual(
            parse_sprite_versions({"data": [{"version": "42.10", "isCurrent": False}, {"version": "42.20", "isCurrent": True}]}),
            "42.20",
        )
        self.assertIsNone(parse_sprite_collection({"data": {"unexpected": 1}}))
        self.assertEqual(sprite_level(500, []), None)

    def test_power_ranking(self) -> None:
        pr = parse_power_ranking({"displayName": "x", "rank": 8789409, "pointsEarned": 1600, "eventId": "e",
                                  "trackedStats": {"PR": 1600, "peakPR": 2100, "deltaPR": -50, "countingEvents": 7, "peakPerf": 3}})
        self.assertEqual((pr["rank"], pr["points"], pr["pr"], pr["peak_pr"], pr["delta_pr"], pr["counting_events"]),
                         (8789409, 1600, 1600, 2100, -50, 7))
        self.assertIsNone(parse_power_ranking({"data": []}))


class TestTokenManager(unittest.IsolatedAsyncioTestCase):
    def _manager(self, client, relink=None) -> EpicTokenManager:
        return EpicTokenManager(client, ACCOUNT, DEVICE, SECRET, on_reauth_required=relink)

    async def test_concurrent_callers_share_one_refresh(self) -> None:
        client = MagicMock()

        async def slow_refresh(*_):
            await asyncio.sleep(0.01)
            return _refresh_ok()

        client.oauth_refresh_device = AsyncMock(side_effect=slow_refresh)
        manager = self._manager(client)
        tokens = await asyncio.gather(*(manager.async_get_token() for _ in range(5)))
        self.assertEqual(set(tokens), {"synthetic-token"})
        self.assertEqual(client.oauth_refresh_device.await_count, 1)

    async def test_rejected_credential_is_never_retried(self) -> None:
        client = MagicMock()
        client.oauth_refresh_device = AsyncMock(side_effect=FortniteAuthError("Unauthorized (401)", 401))
        relink = MagicMock()
        manager = self._manager(client, relink)
        with self.assertRaises(EpicReauthRequired):
            await manager.async_get_token()
        with self.assertRaises(EpicReauthRequired):
            await manager.async_get_token()
        self.assertEqual(client.oauth_refresh_device.await_count, 1)
        relink.assert_called_once()

    async def test_token_for_other_account_is_rejected(self) -> None:
        client = MagicMock()
        client.oauth_refresh_device = AsyncMock(return_value=_refresh_ok(account="b" * 32))
        manager = self._manager(client, MagicMock())
        with self.assertRaises(EpicIdentityMismatch):
            await manager.async_get_token()
        self.assertTrue(manager.invalid)

    async def test_errors_and_repr_never_contain_secrets(self) -> None:
        client = MagicMock()
        client.oauth_refresh_device = AsyncMock(side_effect=FortniteApiError(f"boom {SECRET}", 500))
        manager = self._manager(client)
        with self.assertRaises(Exception) as ctx:
            await manager.async_get_token()
        self.assertNotIn(SECRET, str(ctx.exception))
        self.assertIsNone(ctx.exception.__cause__)
        self.assertNotIn(SECRET, repr(manager))
        self.assertNotIn(DEVICE, repr(manager))


class TestSpriteLabelsAndBoons(unittest.TestCase):
    def test_variant_labels_from_names(self) -> None:
        from custom_components.fortnite_activity.profile import variant_label

        self.assertEqual(variant_label("Cheat Master Jonesy Sprite", "Jonesy Sprite", "CheatMaster"), "Cheat Master")
        self.assertEqual(variant_label("Bounty Hunter Jonesy Sprite", "Jonesy Sprite", "Reaper"), "Bounty Hunter")
        # Upstream name mismatch ("Body Slam" vs family "Crash Bandicoot") still yields a readable label
        self.assertEqual(variant_label("Bounty Hunter Body Slam Sprite", "Crash Bandicoot Sprite", "Reaper"), "Bounty Hunter Body Slam")
        self.assertEqual(variant_label("Jonesy Sprite", "Jonesy Sprite", "Base"), "Base")

    def test_boons_are_named(self) -> None:
        from custom_components.fortnite_activity.profile import parse_sprite_boons

        boons = parse_sprite_boons({"data": [{"id": "B1", "name": "Quick Heal", "description": "Heals faster"}]})
        catalogue = parse_sprite_catalogue({"data": {"sprites": [
            {"id": "F", "boons": [{"id": "B1", "chance": 50}], "variants": [{"id": "F_A", "boons": [{"id": "B1", "chance": 100}]}]}
        ], "levelUpCurve": []}})
        current = parse_sprite_collection({"data": {"totalVariants": 1, "ownedVariants": 1, "sprites": [
            {"id": "F", "name": "F Sprite", "owned": True, "variants": [{"id": "F_A", "variant": "Base", "name": "F Sprite", "owned": True}]}
        ]}}, catalogue, boons)
        fam = current["families"][0]
        self.assertEqual(fam["boons"], [{"name": "Quick Heal", "description": "Heals faster", "chance": 50}])
        self.assertEqual(fam["variants"][0]["boons"][0]["chance"], 100)
        self.assertTrue(fam["complete"])
        self.assertEqual(current["complete_families"], 1)


if __name__ == "__main__":
    unittest.main()
