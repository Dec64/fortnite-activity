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
    identity_matches,
    parse_device_credential,
    parse_flow_start,
)
from custom_components.fortnite_activity.profile import (
    parse_power_ranking,
    parse_sprite_collection,
    parse_sprite_collection_all,
    parse_sprite_versions,
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

    def test_sprites_current_cumulative_and_versions(self) -> None:
        current = parse_sprite_collection({"data": {
            "gameVersion": "42.10", "isCurrent": True, "ownedVariants": 23, "totalVariants": 61,
            "ownedFamilies": 15, "totalFamilies": 16, "completionPercent": 37.7,
            "families": [{
                "id": "JonesySprite", "name": "Jonesy Sprite", "rarity": "Rare", "dexNumber": 27, "owned": True,
                "ownedVariants": 1, "iconUrl": "https://example.invalid/jonesy.png",
                "variants": [
                    {"id": "A", "variant": "Base", "name": "Jonesy Sprite", "owned": True, "count": 2,
                     "xp": 3550, "mastered": True, "dropChancePercent": 95},
                    {"id": "G", "variant": "Gold", "name": "Gold Jonesy Sprite", "owned": False, "count": 0,
                     "xp": None, "mastered": None, "dropChancePercent": 5},
                ],
            }],
        }})
        self.assertEqual((current["owned_variants"], current["total_variants"], current["completion_pct"]), (23, 61, 37.7))
        fam = current["families"][0]
        self.assertEqual((fam["owned_variants"], fam["total_variants"], fam["mastered"]), (1, 2, 1))
        self.assertEqual(fam["image"], "https://example.invalid/jonesy.png")
        cumulative = parse_sprite_collection_all({"data": {
            "ownedVariants": 26, "totalVariants": 179, "ownedFamilies": 18, "totalFamilies": 41,
            "completionPercent": 14.53,
            "versionSummaries": [{"gameVersion": "42.10", "isCurrent": True, "ownedVariants": 23,
                                  "totalVariants": 61, "completionPercent": 37.7}],
        }})
        self.assertEqual(cumulative["owned_variants"], 26)  # deduplicated by the provider, not a sum
        self.assertEqual(
            parse_sprite_versions({"data": [{"version": "42.00", "isCurrent": False}, {"version": "42.10", "isCurrent": True}]}),
            "42.10",
        )
        self.assertIsNone(parse_sprite_collection({"data": {"unexpected": 1}}))

    def test_power_ranking(self) -> None:
        self.assertEqual(
            parse_power_ranking({"displayName": "x", "rank": 11061894, "pointsEarned": 1025, "eventId": "e"}),
            {"rank": 11061894, "points": 1025, "event_id": "e"},
        )
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


if __name__ == "__main__":
    unittest.main()
