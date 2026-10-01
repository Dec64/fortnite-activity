"""Slow-cadence coordinator for profile, catalogue and tournament data.

Kept separate from the match-polling coordinator so a failing or slow profile
endpoint can never delay or break session tracking. Every fetch is guarded:
failures keep the previous value (or None) and are logged once per outage.
"""

from __future__ import annotations

from datetime import datetime, timedelta, timezone
import logging
from typing import Any, Awaitable, Callable

try:
    from homeassistant.core import HomeAssistant
    from homeassistant.helpers.update_coordinator import DataUpdateCoordinator
    from homeassistant.util import dt as dt_util
except ImportError:
    from .coordinator import DataUpdateCoordinator  # type: ignore[attr-defined]

    HomeAssistant = Any  # type: ignore
    dt_util = None  # type: ignore

from .api.api_fortnite import ApiFortniteClient, FortniteApiError
from .const import (
    CATALOGUE_REFRESH_HOURS,
    CONF_ACCOUNT_ID,
    CONF_EPIC_DEVICE,
    CONF_PLAYER_ID,
    CONF_PLAYER_NAME,
    DOMAIN,
    PROFILE_REFRESH_MINUTES,
    TOURNAMENT_REFRESH_HOURS,
)
from .epic_auth import EpicAuthError, EpicReauthRequired, EpicTokenManager
from .profile import (
    compute_window,
    parse_display_name,
    parse_external_auths,
    parse_playlists,
    parse_battlepass,
    parse_athena_outfits,
    mark_battlepass_owned,
    parse_common_core,
    is_outfit_record,
    outfit_summary,
    cosmetic_items,
    parse_inventory,
    parse_power_ranking,
    parse_season,
    parse_sprite_boons,
    parse_sprite_catalogue,
    parse_sprite_collection,
    parse_sprite_collection_all,
    parse_sprite_versions,
    parse_tournaments,
    sample_items,
    summarise_quests,
    window_is_valid,
)

_LOGGER = logging.getLogger(__name__)

WINDOW_LABELS = {
    "today": "Today (since local midnight)",
    "week": "Last 7 days",
    "season": "This season",
}


# The catalogue serves at most 100 items per page; outfits currently need ~50 pages
OUTFIT_INDEX_MAX_PAGES = 90


class FortniteProfileCoordinator(DataUpdateCoordinator[dict[str, Any]]):
    """Fetches season, playlist catalogue, account info, windowed stats and tournaments."""

    def __init__(
        self,
        hass: HomeAssistant,
        api_client: ApiFortniteClient,
        players_config: list[dict[str, Any]],
        region: str,
        lifetime_matches: Callable[[str], int],
        on_relink_required: Callable[[str, str], None] | None = None,
        storage: Any = None,
    ) -> None:
        self.api_client = api_client
        self.storage = storage
        self.players_config = players_config
        self.region = region
        self._lifetime_matches = lifetime_matches

        self.season: dict[str, Any] | None = None
        self.playlists: dict[str, dict[str, Any]] = {}
        self.tournaments: list[dict[str, Any]] | None = None
        self._raw_events: Any = None
        self._fetched_at: dict[str, datetime] = {}
        self._failing: set[str] = set()
        self._players: dict[str, dict[str, Any]] = {}
        self.sprite_version: str | None = None
        self.sprite_catalogue: dict[str, Any] | None = None
        self.sprite_boons: dict[str, dict[str, Any]] = {}
        # Daily status-only checks of routes we cannot use yet (quests, Battle Pass, inventory)
        self.capabilities: dict[str, dict[str, Any]] = {}
        self.battlepass: dict[str, Any] | None = None
        # Untyped quest payload: structure + a small sample kept for diagnostics only (not shown in the UI)
        self.quest_debug: dict[str, Any] = {}
        # Key/type skeletons of the latest responses, for diagnostics (never values)
        self.raw_shapes: dict[str, Any] = {}
        # Owned outfit IDs per player (athena, user-approved) and the public outfit catalogue used to name them
        self.owned_outfits: dict[str, list[str]] = {}
        # Owned cosmetic ids -> template type (memory only), used to tick off Battle Pass rewards
        self.owned_cosmetics: dict[str, dict[str, str]] = {}
        self.outfit_index: dict[str, dict[str, Any]] = {}
        self.outfit_index_info: dict[str, Any] = {}
        self._cosmetic_lookups: dict[str, dict[str, Any] | None] = {}

        # Epic player tokens for players who linked their account (device auth)
        self.token_managers: dict[str, EpicTokenManager] = {}
        for p in players_config:
            device = p.get(CONF_EPIC_DEVICE) or {}
            if device.get("device_id") and device.get("secret"):
                pid = p[CONF_PLAYER_ID]
                self.token_managers[pid] = EpicTokenManager(
                    api_client, p[CONF_ACCOUNT_ID], device["device_id"], device["secret"],
                    on_reauth_required=(
                        (lambda pid=pid, name=p.get(CONF_PLAYER_NAME, pid): on_relink_required(pid, name))
                        if on_relink_required else None
                    ),
                )

        super().__init__(
            hass,
            _LOGGER,
            name=f"{DOMAIN}_profile",
            update_interval=timedelta(minutes=PROFILE_REFRESH_MINUTES),
        )

    # ---- helpers -------------------------------------------------------

    def _stale(self, key: str, max_age: timedelta, now: datetime) -> bool:
        fetched = self._fetched_at.get(key)
        return fetched is None or now - fetched >= max_age

    async def _guarded(self, key: str, fetch: Callable[[], Awaitable[Any]]) -> tuple[bool, Any]:
        """Run a fetch; log the first failure of an outage and return (ok, value)."""
        try:
            value = await fetch()
        except FortniteApiError as err:
            if key not in self._failing:
                _LOGGER.warning("Fortnite profile data '%s' unavailable: %s", key, err)
                self._failing.add(key)
            return False, None
        except Exception:  # noqa: BLE001 - never let profile data break the integration
            if key not in self._failing:
                _LOGGER.exception("Unexpected error fetching Fortnite profile data '%s'", key)
                self._failing.add(key)
            return False, None
        if key in self._failing:
            _LOGGER.info("Fortnite profile data '%s' available again", key)
            self._failing.discard(key)
        from .diagnostics import shape_of

        self.raw_shapes[key.split(":")[0]] = shape_of(value)
        return True, value

    @staticmethod
    def _now() -> datetime:
        return datetime.now(timezone.utc)

    @staticmethod
    def _local_midnight(now: datetime) -> datetime:
        if dt_util:
            return dt_util.start_of_local_day(dt_util.as_local(now))
        return now.astimezone().replace(hour=0, minute=0, second=0, microsecond=0)

    def _window_starts(self, now: datetime) -> dict[str, int]:
        starts = {
            "today": int(self._local_midnight(now).timestamp()),
            "week": int((now - timedelta(days=7)).timestamp()),
        }
        if self.season:
            starts["season"] = int(datetime.fromisoformat(self.season["begin"]).timestamp())
        return starts

    # ---- update --------------------------------------------------------

    async def _async_update_data(self) -> dict[str, Any]:
        now = self._now()
        catalogue_age = timedelta(hours=CATALOGUE_REFRESH_HOURS)

        if self._stale("season", catalogue_age, now) or (
            self.season and datetime.fromisoformat(self.season["end"]) <= now
        ):
            ok, raw = await self._guarded("season", self.api_client.get_season)
            if ok:
                self.season = parse_season(raw, now)
                self._fetched_at["season"] = now
        elif self.season:
            # Keep countdown fresh between catalogue refreshes
            self.season = {**self.season, "days_left": max(0, (datetime.fromisoformat(self.season["end"]) - now).days)}

        if self._stale("playlists", catalogue_age, now):
            ok, raw = await self._guarded("playlists", self.api_client.get_playlists)
            if ok:
                parsed = parse_playlists(raw)
                if parsed:
                    self.playlists = parsed
                self._fetched_at["playlists"] = now

        if self._stale("battlepass", catalogue_age, now):
            ok, raw = await self._guarded("battlepass", self.api_client.get_battlepass)
            if ok:
                self.battlepass = parse_battlepass(raw) or self.battlepass
                self._fetched_at["battlepass"] = now

        if self._stale("tournaments", timedelta(hours=TOURNAMENT_REFRESH_HOURS), now):
            ok, raw = await self._guarded("tournaments", self.api_client.get_events_global)
            if ok:
                self._raw_events = raw
                self._fetched_at["tournaments"] = now
        if self._raw_events is not None:
            self.tournaments = parse_tournaments(self._raw_events, now)

        if self.token_managers and self._stale("sprite_version", catalogue_age, now):
            ok, raw = await self._guarded("sprite_version", self.api_client.get_sprite_versions)
            if ok:
                self.sprite_version = parse_sprite_versions(raw) or self.sprite_version
                self._fetched_at["sprite_version"] = now
            ok, raw = await self._guarded("sprite_catalogue", self.api_client.get_sprite_catalogue)
            if ok:
                self.sprite_catalogue = parse_sprite_catalogue(raw) or self.sprite_catalogue
            ok, raw = await self._guarded("sprite_boons", self.api_client.get_sprite_boons)
            if ok:
                self.sprite_boons = parse_sprite_boons(raw) or self.sprite_boons

        starts = self._window_starts(now)
        for p in self.players_config:
            await self._async_update_player(p[CONF_PLAYER_ID], p[CONF_ACCOUNT_ID], now, starts)
            await self._async_update_private(p[CONF_PLAYER_ID], p[CONF_ACCOUNT_ID], now)

        return {pid: dict(info) for pid, info in self._players.items()}

    async def _async_update_player(
        self, player_id: str, account_id: str, now: datetime, starts: dict[str, int]
    ) -> None:
        info = self._players.setdefault(
            player_id, {"display_name": None, "platforms": None, "windows": {}, "window_labels": WINDOW_LABELS}
        )
        catalogue_age = timedelta(hours=CATALOGUE_REFRESH_HOURS)

        key = f"account:{player_id}"
        if self._stale(key, catalogue_age, now):
            ok, raw = await self._guarded(key, lambda: self.api_client.get_account(account_id))
            if ok:
                info["display_name"] = parse_display_name(raw)
                self._fetched_at[key] = now

        key = f"platforms:{player_id}"
        if self._stale(key, catalogue_age, now):
            ok, raw = await self._guarded(key, lambda: self.api_client.get_external_auths(account_id))
            if ok:
                info["platforms"] = parse_external_auths(raw)
                self._fetched_at[key] = now

        lifetime = self._lifetime_matches(player_id)
        windows: dict[str, Any] = {}
        for name, start in starts.items():
            key = f"window:{name}:{player_id}"
            ok, raw = await self._guarded(key, lambda s=start: self.api_client.get_raw_stats(account_id, start_time=s))
            if not ok or not isinstance(raw, dict):
                windows[name] = info["windows"].get(name)  # keep last good value
                continue
            parsed = ApiFortniteClient.parse_stats(raw)
            window = compute_window(parsed)
            if window_is_valid(raw, start, window["matches"], lifetime):
                windows[name] = {**window, "since": datetime.fromtimestamp(start, tz=timezone.utc).isoformat()}
            else:
                if key not in self._failing:
                    _LOGGER.warning("Stats API ignored startTime for the '%s' window; hiding it", name)
                    self._failing.add(key)
                windows[name] = None
        info["windows"] = windows

    async def _async_update_private(self, player_id: str, account_id: str, now: datetime) -> None:
        """Level, Power Ranking and Sprites, which need the player's own Epic token."""
        info = self._players.setdefault(player_id, {})
        manager = self.token_managers.get(player_id)
        if manager is None:
            info["epic"] = {"status": "unlinked"}
            return
        try:
            token = await manager.async_get_token()
        except EpicReauthRequired:
            info["epic"] = {"status": "relink_required"}
            info.pop("level", None)
            return
        except EpicAuthError as err:
            if f"token:{player_id}" not in self._failing:
                _LOGGER.warning("Epic token for %s unavailable: %s", player_id, err)
                self._failing.add(f"token:{player_id}")
            info.setdefault("epic", {"status": "error"})
            return
        self._failing.discard(f"token:{player_id}")
        info["epic"] = {"status": "linked"}

        key = f"capabilities:{player_id}"
        if self._stale(key, timedelta(hours=24), now):
            self.capabilities[player_id] = {
                "checked_at": now.isoformat(),
                "quests": await self.api_client.probe_status(f"/v2/quests/{account_id}", token),
                "battlepass_catalogue": await self.api_client.probe_status("/v2/battlepass"),
                "br_inventory": await self.api_client.probe_status(f"/v2/fn/br-inventory/{account_id}", token),
            }
            self._fetched_at[key] = now

        key = f"quests:{player_id}"
        if self._stale(key, timedelta(hours=6), now):
            ok, raw = await self._guarded(key, lambda: self.api_client.get_quests(account_id, token))
            if ok:
                self.quest_debug[player_id] = sample_items(raw)
                info["quests"] = summarise_quests(raw)
            self._fetched_at[key] = now

        ok, raw = await self._guarded(f"inventory:{player_id}", lambda: self.api_client.get_br_inventory(account_id, token))
        if ok:
            info["inventory"] = parse_inventory(raw)

        # Read-only Epic common_core (user-approved) for the real V-Bucks balance and Crew state.
        # Only the parsed summary is kept; the raw profile is discarded immediately.
        try:
            raw_cc = await self.api_client.epic_query_profile_common_core(account_id, token)
        except FortniteApiError as err:
            if f"common_core:{player_id}" not in self._failing:
                _LOGGER.warning("Epic common_core read for %s unavailable: %s", player_id, err)
                self._failing.add(f"common_core:{player_id}")
        else:
            self._failing.discard(f"common_core:{player_id}")
            parsed_cc = parse_common_core(raw_cc, account_id)
            if parsed_cc is None:
                _LOGGER.warning("Epic common_core response for %s failed the identity/shape check; ignored", player_id)
            else:
                info["wallet"] = parsed_cc
            raw_cc = None

        await self._async_update_outfits(player_id, account_id, token, info, now)

        ok, raw = await self._guarded(f"level:{player_id}", lambda: self.api_client.get_raw_level(account_id, token))
        if ok:
            info["level"] = ApiFortniteClient.parse_level(raw)

        ok, raw = await self._guarded(f"power:{player_id}", lambda: self.api_client.get_power_ranking(account_id, token))
        if ok:
            info["power_ranking"] = parse_power_ranking(raw)

        ok, raw = await self._guarded(
            f"sprites:{player_id}", lambda: self.api_client.get_sprite_collection(token, self.sprite_version)
        )
        if ok:
            current = parse_sprite_collection(raw, self.sprite_catalogue, self.sprite_boons)
            if current:
                info["sprites"] = {**(info.get("sprites") or {}), "current": current}

        key = f"sprites_all:{player_id}"
        if self._stale(key, timedelta(hours=6), now):
            ok, raw = await self._guarded(key, lambda: self.api_client.get_sprite_collection_all(token))
            if ok:
                cumulative = parse_sprite_collection_all(raw)
                if cumulative:
                    info["sprites"] = {**(info.get("sprites") or {}), "cumulative": cumulative}
                self._fetched_at[key] = now

    async def _async_update_outfits(
        self, player_id: str, account_id: str, token: str, info: dict[str, Any], now: datetime
    ) -> None:
        """Owned cosmetic IDs from athena (user-approved, every 6 h) and the avatar chosen from outfits."""
        outfits = dict(info.get("outfits") or {})
        key = f"athena:{player_id}"
        if self._stale(key, timedelta(hours=6), now):
            try:
                raw = await self.api_client.epic_query_profile(account_id, token, "athena")
            except FortniteApiError as err:
                if key not in self._failing:
                    _LOGGER.warning("Epic athena read for %s unavailable: %s", player_id, err)
                    self._failing.add(key)
            else:
                self._failing.discard(key)
                parsed = parse_athena_outfits(raw, account_id)
                raw = None  # only the outfit IDs are kept
                if parsed is None:
                    _LOGGER.warning("Epic athena response for %s failed the identity/shape check; ignored", player_id)
                else:
                    self.owned_outfits[player_id] = parsed["ids"]
                    self.owned_cosmetics[player_id] = parsed["cosmetics"]
                    outfits["owned_count"] = parsed["count"]
                    outfits["profile_updated"] = parsed["profile_updated"]
                self._fetched_at[key] = now

        if self.owned_outfits.get(player_id):
            await self._ensure_outfit_index(now)
            owned = self.owned_outfits[player_id]
            outfits["named_count"] = sum(1 for i in owned if i in self.outfit_index)
        outfits["avatar"] = await self._avatar_summary(player_id)
        info["outfits"] = outfits or None

    async def _ensure_outfit_index(self, now: datetime) -> None:
        """Daily: outfit names/images from the public catalogue, keyed by lower-case id."""
        if not self._stale("outfit_index", timedelta(hours=CATALOGUE_REFRESH_HOURS), now):
            return
        index: dict[str, dict[str, Any]] = {}
        pages = 0
        filtered = True
        for cosmetic_type in ("outfit", None):
            page, total_pages = 1, 1
            while page <= total_pages and pages < OUTFIT_INDEX_MAX_PAGES:
                ok, raw = await self._guarded(
                    "outfit_index", lambda pg=page, ct=cosmetic_type: self.api_client.get_cosmetics_page(pg, 1000, ct)
                )
                pages += 1
                if not ok:
                    break
                items = cosmetic_items(raw)
                body = raw.get("data") if isinstance(raw, dict) and isinstance(raw.get("data"), dict) else raw
                total_pages = int(body.get("totalPages") or 1) if isinstance(body, dict) else 1
                for item in items:
                    if is_outfit_record(item) and item.get("id"):
                        index[str(item["id"]).lower()] = outfit_summary(item)
                if not items:
                    break
                page += 1
            if index:
                break
            filtered = False  # the type filter matched nothing; retry unfiltered
        # Mark the attempt either way so a failing catalogue is retried daily, not every refresh
        self._fetched_at["outfit_index"] = now
        if index:
            self.outfit_index = index
            self.outfit_index_info = {
                "outfits": len(index), "pages": pages, "type_filter": filtered, "built": now.isoformat(),
                "capped": pages >= OUTFIT_INDEX_MAX_PAGES,
            }
        else:
            self.outfit_index_info = {"outfits": 0, "pages": pages, "type_filter": filtered, "built": now.isoformat()}

    async def _outfit(self, outfit_id: str | None) -> dict[str, Any] | None:
        """Name/image for one outfit id: catalogue index first, then a single cached lookup."""
        if not outfit_id:
            return None
        if outfit_id in self.outfit_index:
            return self.outfit_index[outfit_id]
        if outfit_id not in self._cosmetic_lookups:
            ok, raw = await self._guarded("cosmetic", lambda: self.api_client.get_cosmetic(outfit_id))
            item = None
            if ok:
                item = raw.get("data") if isinstance(raw, dict) and isinstance(raw.get("data"), dict) else raw
            self._cosmetic_lookups[outfit_id] = outfit_summary(item) if isinstance(item, dict) and item.get("name") else None
        return self._cosmetic_lookups[outfit_id]

    async def _avatar_summary(self, player_id: str) -> dict[str, Any] | None:
        outfit_id = self.storage.get_avatar(player_id) if self.storage else None
        meta = await self._outfit(outfit_id)
        if not outfit_id:
            return None
        return {"id": outfit_id, "name": (meta or {}).get("name"), "icon": (meta or {}).get("icon"), "rarity": (meta or {}).get("rarity")}

    async def async_set_avatar(self, player_id: str, outfit_id: str | None) -> dict[str, Any] | None:
        """Choose (or clear) an owned outfit as the player's avatar; persisted and pushed to entities."""
        outfit_id = (outfit_id or "").strip().lower() or None
        if outfit_id and outfit_id not in self.owned_outfits.get(player_id, []):
            raise ValueError("That outfit is not in the player's owned outfits")
        if self.storage:
            self.storage.set_avatar(player_id, outfit_id)
            await self.storage.async_save()
        info = self._players.setdefault(player_id, {})
        outfits = dict(info.get("outfits") or {})
        outfits["avatar"] = await self._avatar_summary(player_id)
        info["outfits"] = outfits
        self.async_set_updated_data({pid: dict(i) for pid, i in self._players.items()})
        return outfits["avatar"]

    def battlepass_for(self, player_id: str | None) -> dict[str, Any] | None:
        """The Battle Pass with each reward marked unlocked/locked for the player (when known)."""
        if not player_id or player_id not in self.owned_cosmetics:
            return self.battlepass
        return mark_battlepass_owned(self.battlepass, self.owned_cosmetics[player_id])

    def owned_outfit_list(self, player_id: str) -> list[dict[str, Any]]:
        """Owned outfits with catalogue metadata (unknown ids are returned with id only)."""
        return [self.outfit_index.get(i) or {"id": i, "name": None} for i in self.owned_outfits.get(player_id, [])]

    def playlist_info(self, playlist_id: str) -> dict[str, Any] | None:
        """Look up catalogue name/image for a stats playlist id."""
        return self.playlists.get(playlist_id.lower())
