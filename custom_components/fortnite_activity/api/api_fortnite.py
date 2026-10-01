"""Async client for api-fortnite.com Pro API."""

from __future__ import annotations

import logging
import re
from typing import Any
try:
    import aiohttp
except ImportError:
    aiohttp = None  # type: ignore

from urllib.parse import quote, urlencode

from ..const import (
    ACCOUNT_ENDPOINT,
    API_BASE_URL,
    API_HEADER_KEY,
    COSMETIC_SEARCH_ENDPOINT,
    EVENTS_GLOBAL_ENDPOINT,
    LEADERBOARD_ENDPOINT,
    EXTERNAL_AUTHS_ENDPOINT,
    LEVEL_ENDPOINT,
    PLAYLISTS_ENDPOINT,
    SEASON_ENDPOINT,
    MODE_BUILD,
    MODE_OTHER,
    MODE_RELOAD,
    MODE_ZERO_BUILD,
    PLAYLIST_NAMES,
    RANKED_ENDPOINT,
    STATS_ENDPOINT,
)

_LOGGER = logging.getLogger(__name__)

# Regex pattern for parsing raw stats keys:
# e.g., br_kills_keyboardmouse_m0_playlist_nobuildbr_duo
# e.g., br_matchesplayed_gamepad_m0_playlist_defaultsolo
STAT_KEY_REGEX = re.compile(
    r"^br_(?P<stat>[a-z0-9]+)_(?P<input>[a-z]+)_m0_playlist_(?P<playlist>.+)$"
)


SEASON_LEVEL_REGEX = re.compile(r"^s(?P<season>\d+)_social_bp_level$")


class FortniteApiError(Exception):
    """Base exception for Fortnite API errors (status is the HTTP status when known)."""

    def __init__(self, message: str, status: int | None = None) -> None:
        super().__init__(message)
        self.status = status


def _safe_endpoint(endpoint: str) -> str:
    """Endpoint for messages/logs with Epic account ids masked."""
    return re.sub(r"[0-9a-fA-F]{32}", "<id>", endpoint)


class FortniteAuthError(FortniteApiError):
    """Raised when the API key is invalid or rejected (HTTP 401)."""


class FortniteNotFoundError(FortniteApiError):
    """Raised when an account or resource is not found (HTTP 404)."""


class FortniteRateLimitError(FortniteApiError):
    """Raised when API rate limits are hit (HTTP 429)."""


class ApiFortniteClient:
    """Client for interacting with the api-fortnite.com Pro service."""

    def __init__(self, api_key: str, session: aiohttp.ClientSession | None = None) -> None:
        """Initialize the client."""
        self._api_key = api_key
        self._session = session
        self._owns_session = False

    async def _get_session(self) -> aiohttp.ClientSession:
        """Get or create the aiohttp ClientSession."""
        if self._session is None or self._session.closed:
            self._session = aiohttp.ClientSession()
            self._owns_session = True
        return self._session

    async def close(self) -> None:
        """Close the session if owned."""
        if self._owns_session and self._session and not self._session.closed:
            await self._session.close()

    async def _send(
        self,
        endpoint: str,
        method: str = "GET",
        json_body: dict[str, Any] | None = None,
        token: str | None = None,
    ) -> tuple[int, Any]:
        """Send a request and return (status, parsed JSON or None). Raises only on transport errors."""
        session = await self._get_session()
        headers = {
            API_HEADER_KEY: self._api_key,
            "Accept": "application/json",
            "User-Agent": "HomeAssistant-FortniteFamilyTracker/1.0",
        }
        if token:
            headers["x-fortnite-token"] = token
        try:
            async with session.request(
                method, f"{API_BASE_URL}{endpoint}", headers=headers, json=json_body,
                timeout=aiohttp.ClientTimeout(total=20),
            ) as resp:
                try:
                    data = await resp.json(content_type=None)
                except (ValueError, aiohttp.ContentTypeError):
                    data = None
                return resp.status, data
        except (aiohttp.ClientError, TimeoutError) as err:
            raise FortniteApiError(f"Connection error to {_safe_endpoint(endpoint.split('?')[0])}: {type(err).__name__}") from None

    async def _request(
        self,
        endpoint: str,
        method: str = "GET",
        json_body: dict[str, Any] | None = None,
        token: str | None = None,
        sensitive: bool = False,
    ) -> Any:
        """Authenticated request returning JSON on HTTP 200.

        With sensitive=True (OAuth routes) errors carry only the status code, never the body.
        """
        status, data = await self._send(endpoint, method, json_body, token)
        if status == 200:
            return data
        where = _safe_endpoint(endpoint.split("?")[0] if sensitive else endpoint)
        if status == 401:
            raise FortniteAuthError(f"Unauthorized (401) on {where}.", status)
        if status == 404:
            raise FortniteNotFoundError(f"Not found (404) on {where}.", status)
        if status == 429:
            raise FortniteRateLimitError(f"Rate limited (429) on {where}.", status)
        detail = ""
        if not sensitive and isinstance(data, dict):
            detail = f": {str(data.get('error') or data.get('message') or '')[:160]}"
        raise FortniteApiError(f"API request failed with HTTP {status} on {where}{detail}", status)

    # ---- Epic device-code OAuth (responses contain credentials: never log them) ----

    async def oauth_start(self) -> Any:
        """Begin the device-code flow; returns flowId and the Epic sign-in URL."""
        return await self._request("/v1/oauth/get-token", sensitive=True)

    async def oauth_complete(self, flow_id: str) -> tuple[int, Any]:
        """Poll the flow once. 202 = user has not finished signing in; 200 = tokens + device auth."""
        status, data = await self._send("/v1/oauth/complete", "POST", {"flowId": flow_id})
        if status in (200, 202):
            return status, data
        raise FortniteApiError(f"Epic sign-in could not be completed (HTTP {status})", status)

    async def oauth_refresh_device(self, account_id: str, device_id: str, secret: str) -> Any:
        """Exchange stored device credentials for a fresh access token."""
        return await self._request(
            "/v1/oauth/refresh-device", "POST",
            {"accountId": account_id, "deviceId": device_id, "secret": secret},
            sensitive=True,
        )

    # ---- Player-token routes ----

    async def get_power_ranking(self, account_id: str, token: str) -> Any:
        return await self._request(f"/v1/events/powerrankings/player/{account_id}", token=token)

    async def get_sprite_versions(self) -> Any:
        return await self._request("/v2/sprites/versions")

    async def get_sprite_catalogue(self, version: str | None = None) -> Any:
        """Live sprite catalogue, or an archived one for a past game version (public)."""
        query = f"?{urlencode({'version': version})}" if version else ""
        return await self._request(f"/v2/sprites{query}")

    async def probe_status(self, endpoint: str, token: str | None = None) -> int | None:
        """HTTP status of a GET without reading or keeping the body (capability checks only)."""
        try:
            status, _ = await self._send(endpoint, token=token)
        except FortniteApiError:
            return None
        return status

    async def get_battlepass(self, season: int | None = None) -> Any:
        """Battle Pass catalogue (BattlePassCatalog): pages of rewards with names, rarity, icons, cost."""
        query = f"?{urlencode({'season': season})}" if season else ""
        return await self._request(f"/v2/battlepass{query}")

    # Direct Epic reads the user approved (2026-10-01). All are read-only; bodies are never logged
    # and errors carry only the status code.
    EPIC_QUERY_PROFILES = frozenset({"common_core", "athena"})

    async def _epic_read(self, method: str, url: str, token: str, what: str, timeout: int = 20) -> Any:
        session = await self._get_session()
        kwargs: dict[str, Any] = {
            "headers": {"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
            "timeout": aiohttp.ClientTimeout(total=timeout),
        }
        if method == "POST":
            kwargs["json"] = {}
        try:
            async with session.request(method, url, **kwargs) as resp:
                if resp.status != 200:
                    raise FortniteApiError(f"Epic {what} read failed (HTTP {resp.status})", resp.status)
                return await resp.json(content_type=None)
        except (aiohttp.ClientError, TimeoutError) as err:
            raise FortniteApiError(f"Epic {what} read connection error: {type(err).__name__}") from None

    async def epic_query_profile(self, account_id: str, token: str, profile_id: str) -> Any:
        """Read-only Epic QueryProfile (POST retrieves state and changes nothing) for an approved profile.

        common_core: V-Bucks/Crew. athena: only owned outfit IDs are kept by the caller.
        """
        if profile_id not in self.EPIC_QUERY_PROFILES:
            raise FortniteApiError("Epic profile not approved")
        if not re.fullmatch(r"[0-9a-f]{32}", account_id):
            raise FortniteApiError("Invalid account id for Epic profile read")
        url = (
            "https://fortnite-public-service-prod11.ol.epicgames.com/fortnite/api/game/v2/profile/"
            f"{account_id}/client/QueryProfile?profileId={profile_id}&rvn=-1"
        )
        return await self._epic_read("POST", url, token, f"{profile_id} profile", timeout=40 if profile_id == "athena" else 20)

    async def epic_query_profile_common_core(self, account_id: str, token: str) -> Any:
        return await self.epic_query_profile(account_id, token, "common_core")

    async def get_br_inventory(self, account_id: str, token: str) -> Any:
        """Battle Royale inventory; observed shape {stash: {globalcash: n}} (provider: V-Bucks)."""
        return await self._request(f"/v2/fn/br-inventory/{account_id}", token=token)

    async def get_quests(self, account_id: str, token: str) -> Any:
        """Player quests (untyped in the spec; only captured for diagnostics until its shape is known)."""
        return await self._request(f"/v2/quests/{account_id}", token=token)

    async def get_sprite_boons(self) -> Any:
        return await self._request("/v2/sprites/boons")

    async def get_sprite_collection(self, token: str, version: str | None = None) -> Any:
        query = f"?{urlencode({'version': version})}" if version else ""
        return await self._request(f"/v2/sprites/collection{query}", token=token)

    async def get_sprite_collection_all(self, token: str) -> Any:
        return await self._request("/v2/sprites/collection/all", token=token)

    async def get_raw_stats(
        self, account_id: str, start_time: int | None = None, end_time: int | None = None
    ) -> dict[str, Any]:
        """Fetch raw stats for account, optionally limited to a unix-time window."""
        endpoint = STATS_ENDPOINT.format(account_id=account_id)
        params = {k: v for k, v in (("startTime", start_time), ("endTime", end_time)) if v is not None}
        if params:
            endpoint = f"{endpoint}?{urlencode(params)}"
        return await self._request(endpoint)

    async def get_season(self) -> dict[str, Any]:
        """Fetch current season number and dates."""
        res = await self._request(SEASON_ENDPOINT)
        return res if isinstance(res, dict) else {}

    async def get_playlists(self) -> Any:
        """Fetch the playlist catalogue (names, descriptions, images)."""
        return await self._request(PLAYLISTS_ENDPOINT)

    async def get_account(self, account_id: str) -> Any:
        """Fetch public Epic account info (display name)."""
        return await self._request(ACCOUNT_ENDPOINT.format(account_id=account_id))

    async def get_external_auths(self, account_id: str) -> Any:
        """Fetch linked platform accounts."""
        return await self._request(EXTERNAL_AUTHS_ENDPOINT.format(account_id=account_id))

    async def get_events_global(self) -> Any:
        """Fetch global tournament listings with per-region windows."""
        return await self._request(EVENTS_GLOBAL_ENDPOINT)

    async def get_event_leaderboard(
        self, event_id: str, window_id: str, account_id: str | None = None, page: int = 0
    ) -> Any:
        """Fetch one page of a tournament window leaderboard (optionally highlighting an account)."""
        params = {"eventId": event_id, "eventWindowId": window_id, "page": page}
        if account_id:
            params["accountId"] = account_id
        return await self._request(f"{LEADERBOARD_ENDPOINT}?{urlencode(params)}")

    async def get_event_window_leaderboard(self, event_id: str, window_id: str, page: int = 0) -> Any:
        """Fetch a leaderboard page via the v2 per-window route (fallback for the global route)."""
        return await self._request(
            f"/v2/events/{quote(event_id, safe='')}/windows/{quote(window_id, safe='')}/leaderboard?page={int(page)}"
        )

    async def get_cosmetics_page(self, page: int, page_size: int = 1000, cosmetic_type: str | None = "outfit") -> Any:
        """One page of the public cosmetic catalogue (used to name owned outfits)."""
        params: dict[str, Any] = {"page": page, "pageSize": page_size, "lang": "en"}
        if cosmetic_type:
            params["type"] = cosmetic_type
        return await self._request(f"/v2/cosmetics/all?{urlencode(params)}")

    async def get_cosmetic(self, cosmetic_id: str) -> Any:
        """A single public cosmetic by id."""
        return await self._request(f"/v2/cosmetics/{quote(cosmetic_id, safe='')}?lang=en")

    async def get_shop(self) -> Any:
        """Today's Item Shop (public)."""
        return await self._request("/v1/shop")

    async def get_news(self, mode: str = "br") -> Any:
        """In-game news for a mode (public)."""
        return await self._request(f"/v1/news/{quote(mode, safe='')}?lang=en")

    async def get_map(self, mode: str | None = None) -> Any:
        """Map data with POIs for the current version; mode is br (default), og or rotating:<codename>."""
        query = f"?{urlencode({'mode': mode})}" if mode else ""
        return await self._request(f"/v1/map{query}")

    async def search_cosmetics(self, query: str, cosmetic_type: str | None = "outfit", page_size: int = 10) -> Any:
        """Search the public cosmetic catalogue by name."""
        params = {"q": query, "pageSize": page_size, "lang": "en"}
        if cosmetic_type:
            params["type"] = cosmetic_type
        return await self._request(f"{COSMETIC_SEARCH_ENDPOINT}?{urlencode(params)}")

    async def get_raw_ranked(self, account_id: str) -> list[dict[str, Any]]:
        """Fetch raw ranked track entries for account."""
        endpoint = RANKED_ENDPOINT.format(account_id=account_id)
        res = await self._request(endpoint)
        return res if isinstance(res, list) else []

    async def get_raw_level(self, account_id: str, token: str | None = None) -> dict[str, Any]:
        """Fetch raw level & tier data for account (needs an Epic player token)."""
        endpoint = LEVEL_ENDPOINT.format(account_id=account_id)
        res = await self._request(endpoint, token=token)
        return res if isinstance(res, dict) else {}

    async def validate_credentials(self, account_id: str) -> bool:
        """Validate API key and player account ID."""
        try:
            stats = await self.get_raw_stats(account_id)
            return isinstance(stats, dict) and "stats" in stats
        except (FortniteAuthError, FortniteNotFoundError):
            return False
        except Exception:
            return False

    @staticmethod
    def resolve_playlist_mode(playlist_id: str) -> str:
        """Categorize a playlist into build, zero_build, reload, or other."""
        lower = playlist_id.lower()
        if "nobuild" in lower:
            return MODE_ZERO_BUILD
        elif "ropesmile" in lower:
            return MODE_RELOAD
        elif any(k in lower for k in ["defaultsolo", "defaultduo", "trios", "defaultsquad", "habanero_solo", "habanero_duo", "habanero_trio", "habanero_squad"]):
            return MODE_BUILD
        return MODE_OTHER

    @staticmethod
    def resolve_playlist_name(playlist_id: str) -> str:
        """Return a user-friendly display name for a playlist."""
        clean = playlist_id.lower().replace("playlist_", "")
        if clean in PLAYLIST_NAMES:
            return PLAYLIST_NAMES[clean]
        # Auto-prettify common patterns
        clean = clean.replace("nobuildbr_", "Zero Build ").replace("default", "BR ")
        return clean.replace("_", " ").title()

    @classmethod
    def parse_stats(cls, raw: dict[str, Any]) -> dict[str, Any]:
        """Parse raw stats response into aggregated totals, modes, and playlists."""
        raw_stats = raw.get("stats", {})
        if not isinstance(raw_stats, dict):
            return {
                "overall": {
                    "matches": 0, "kills": 0, "wins": 0, "kd": 0.0,
                    "win_rate": 0.0, "minutes": 0, "score": 0,
                    "players_outlived": 0, "last_modified": 0,
                },
                "playlists": {},
                "modes": {MODE_BUILD: {}, MODE_ZERO_BUILD: {}, MODE_RELOAD: {}},
                "inputs": {},
            }

        playlists: dict[str, dict[str, Any]] = {}
        inputs: dict[str, dict[str, int]] = {}
        season_level: dict[str, int] | None = None

        for key, value in raw_stats.items():
            # e.g. s42_social_bp_level: season (Battle Pass) level, readable with the provider key alone
            bp = SEASON_LEVEL_REGEX.match(key)
            if bp and isinstance(value, (int, float)):
                season = int(bp.group("season"))
                if season_level is None or season > season_level["season"]:
                    season_level = {"season": season, "level": int(value)}
                continue
            match = STAT_KEY_REGEX.match(key)
            if not match:
                continue

            stat_name = match.group("stat")
            playlist_id = match.group("playlist").lower()
            val = int(value) if isinstance(value, (int, float)) else 0

            if stat_name in ("matchesplayed", "kills", "placetop1", "minutesplayed"):
                bucket = inputs.setdefault(
                    match.group("input"), {"matches": 0, "kills": 0, "wins": 0, "minutes": 0}
                )
                field = {"matchesplayed": "matches", "placetop1": "wins", "minutesplayed": "minutes"}.get(
                    stat_name, stat_name
                )
                bucket[field] += val

            if playlist_id not in playlists:
                playlists[playlist_id] = {
                    "playlist_id": playlist_id,
                    "name": cls.resolve_playlist_name(playlist_id),
                    "mode": cls.resolve_playlist_mode(playlist_id),
                    "matches": 0,
                    "kills": 0,
                    "wins": 0,
                    "top3": 0,
                    "top5": 0,
                    "top6": 0,
                    "top10": 0,
                    "top12": 0,
                    "top25": 0,
                    "minutes": 0,
                    "score": 0,
                    "players_outlived": 0,
                    "last_modified": 0,
                }

            p = playlists[playlist_id]
            if stat_name == "matchesplayed":
                p["matches"] += val
            elif stat_name == "kills":
                p["kills"] += val
            elif stat_name == "placetop1":
                p["wins"] += val
            elif stat_name == "placetop3":
                p["top3"] += val
            elif stat_name == "placetop5":
                p["top5"] += val
            elif stat_name == "placetop6":
                p["top6"] += val
            elif stat_name == "placetop10":
                p["top10"] += val
            elif stat_name == "placetop12":
                p["top12"] += val
            elif stat_name == "placetop25":
                p["top25"] += val
            elif stat_name == "minutesplayed":
                p["minutes"] += val
            elif stat_name == "score":
                p["score"] += val
            elif stat_name == "playersoutlived":
                p["players_outlived"] += val
            elif stat_name == "lastmodified":
                p["last_modified"] = max(p["last_modified"], val)

        # Calculate Overall Totals
        total_matches = sum(p["matches"] for p in playlists.values())
        total_kills = sum(p["kills"] for p in playlists.values())
        total_wins = sum(p["wins"] for p in playlists.values())
        total_minutes = sum(p["minutes"] for p in playlists.values())
        total_score = sum(p["score"] for p in playlists.values())
        total_outlived = sum(p["players_outlived"] for p in playlists.values())
        latest_mod = max((p["last_modified"] for p in playlists.values()), default=0)

        deaths = max(1, total_matches - total_wins)
        overall_kd = round(total_kills / deaths, 2) if total_matches > 0 else 0.0
        overall_win_rate = round((total_wins / total_matches) * 100, 1) if total_matches > 0 else 0.0

        # Mode-based aggregations
        modes: dict[str, dict[str, Any]] = {
            mode: {
                "matches": 0, "kills": 0, "wins": 0, "kd": 0.0, "win_rate": 0.0,
                "minutes": 0, "score": 0, "players_outlived": 0,
            }
            for mode in (MODE_BUILD, MODE_ZERO_BUILD, MODE_RELOAD)
        }

        for p in playlists.values():
            mode = p["mode"]
            if mode in modes:
                modes[mode]["matches"] += p["matches"]
                modes[mode]["kills"] += p["kills"]
                modes[mode]["wins"] += p["wins"]
                modes[mode]["minutes"] += p["minutes"]
                modes[mode]["score"] += p["score"]
                modes[mode]["players_outlived"] += p["players_outlived"]

        for m_data in modes.values():
            m_matches = m_data["matches"]
            m_wins = m_data["wins"]
            m_kills = m_data["kills"]
            m_deaths = max(1, m_matches - m_wins)
            m_data["kd"] = round(m_kills / m_deaths, 2) if m_matches > 0 else 0.0
            m_data["win_rate"] = round((m_wins / m_matches) * 100, 1) if m_matches > 0 else 0.0

        return {
            "overall": {
                "matches": total_matches,
                "kills": total_kills,
                "wins": total_wins,
                "kd": overall_kd,
                "win_rate": overall_win_rate,
                "minutes": total_minutes,
                "score": total_score,
                "players_outlived": total_outlived,
                "last_modified": latest_mod,
            },
            "playlists": playlists,
            "modes": modes,
            "inputs": inputs,
            "season_level": season_level,
        }

    @staticmethod
    def parse_ranked(raw: list[dict[str, Any]]) -> dict[str, Any]:
        """Parse raw ranked response into structured track objects."""
        tracks: dict[str, Any] = {
            "battle_royale": None,
            "reload_build": None,
            "current_tracks": [],
        }

        for row in raw:
            if not isinstance(row, dict):
                continue

            is_current = row.get("isCurrent", False)
            mode_name = row.get("gameMode", "")
            current_rank = row.get("currentRank", "Unranked")
            division = row.get("currentDivision", 0)
            # Live API field is rankProgress (0..1); promotionProgress kept as a fallback
            progress = row.get("rankProgress", row.get("promotionProgress"))
            progress_pct = round(progress * 100, 1) if isinstance(progress, (int, float)) else 0.0
            unreal_rank = row.get("unrealRank")

            track_info = {
                "track_id": row.get("trackguid"),
                "game_mode": mode_name,
                "ranking_type": row.get("rankingType"),
                "is_current": is_current,
                "current_rank": current_rank,
                "current_division": division,
                "progress_pct": progress_pct,
                "unreal_rank": unreal_rank if isinstance(unreal_rank, int) else None,
                "highest_rank": row.get("highestRank", current_rank),
                "highest_division": row.get("highestDivision", division),
                "season_begin": row.get("seasonBegin"),
                "season_end": row.get("seasonEnd"),
            }

            if is_current:
                tracks["current_tracks"].append(track_info)
                if mode_name == "Battle Royale" and tracks["battle_royale"] is None:
                    tracks["battle_royale"] = track_info
                elif "Reload" in mode_name and tracks["reload_build"] is None:
                    tracks["reload_build"] = track_info

        # Fallback empty track objects if unranked
        if tracks["battle_royale"] is None:
            tracks["battle_royale"] = {
                "game_mode": "Battle Royale",
                "current_rank": "Unranked",
                "current_division": 0,
                "progress_pct": 0.0,
                "highest_rank": "Unranked",
                "highest_division": 0,
            }
        if tracks["reload_build"] is None:
            tracks["reload_build"] = {
                "game_mode": "Reload Build",
                "current_rank": "Unranked",
                "current_division": 0,
                "progress_pct": 0.0,
                "highest_rank": "Unranked",
                "highest_division": 0,
            }

        return tracks

    @staticmethod
    def parse_level(raw: dict[str, Any]) -> dict[str, Any] | None:
        """Parse /v1/profile/level; None when level data is unavailable.

        Observed shape: level, xp, accountLevel at the top plus a nested object holding
        tier / xp / purchased. The provider's `purchased` flag contradicts Epic's own
        profile, so pass ownership is deliberately not exposed.
        """
        if isinstance(raw, dict) and isinstance(raw.get("data"), dict) and "level" not in raw:
            raw = raw["data"]
        if not isinstance(raw, dict) or "level" not in raw:
            return None
        nested = next((v for v in raw.values() if isinstance(v, dict) and "tier" in v), {})

        def as_int(value: Any) -> int:
            return int(value) if isinstance(value, (int, float)) else 0

        return {
            "level": as_int(raw.get("level")),
            "tier": as_int(raw.get("tier", nested.get("tier"))),
            "xp": as_int(raw.get("xp")),
            "account_level": as_int(raw.get("accountLevel")),
        }
