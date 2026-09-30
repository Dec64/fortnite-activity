"""Async client for api-fortnite.com Pro API."""

from __future__ import annotations

import logging
import re
from typing import Any
try:
    import aiohttp
except ImportError:
    aiohttp = None  # type: ignore

from ..const import (
    API_BASE_URL,
    API_HEADER_KEY,
    LEVEL_ENDPOINT,
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


class FortniteApiError(Exception):
    """Base exception for Fortnite API errors."""


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

    async def _request(self, endpoint: str) -> Any:
        """Make an authenticated GET request."""
        session = await self._get_session()
        url = f"{API_BASE_URL}{endpoint}"
        headers = {
            API_HEADER_KEY: self._api_key,
            "Accept": "application/json",
            "User-Agent": "HomeAssistant-FortniteFamilyTracker/1.0",
        }

        try:
            async with session.get(url, headers=headers, timeout=aiohttp.ClientTimeout(total=20)) as resp:
                if resp.status == 200:
                    return await resp.json()
                elif resp.status == 401:
                    raise FortniteAuthError(f"Unauthorized (401) on {endpoint}. Verify API key.")
                elif resp.status == 404:
                    raise FortniteNotFoundError(f"Not found (404) on {endpoint}.")
                elif resp.status == 429:
                    raise FortniteRateLimitError(f"Rate limited (429) on {endpoint}.")
                else:
                    text = await resp.text()
                    raise FortniteApiError(f"API request failed with HTTP {resp.status}: {text[:200]}")
        except aiohttp.ClientError as err:
            raise FortniteApiError(f"Connection error to {endpoint}: {err}") from err

    async def get_raw_stats(self, account_id: str) -> dict[str, Any]:
        """Fetch raw stats dictionary for account."""
        endpoint = STATS_ENDPOINT.format(account_id=account_id)
        return await self._request(endpoint)

    async def get_raw_ranked(self, account_id: str) -> list[dict[str, Any]]:
        """Fetch raw ranked track entries for account."""
        endpoint = RANKED_ENDPOINT.format(account_id=account_id)
        res = await self._request(endpoint)
        return res if isinstance(res, list) else []

    async def get_raw_level(self, account_id: str) -> dict[str, Any]:
        """Fetch raw level & tier data for account.

        Requires an Epic player token; with a provider key alone this raises
        FortniteAuthError, which the coordinator uses to stop polling it.
        """
        endpoint = LEVEL_ENDPOINT.format(account_id=account_id)
        res = await self._request(endpoint)
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
            }

        playlists: dict[str, dict[str, Any]] = {}

        for key, value in raw_stats.items():
            match = STAT_KEY_REGEX.match(key)
            if not match:
                continue

            stat_name = match.group("stat")
            playlist_id = match.group("playlist").lower()
            val = int(value) if isinstance(value, (int, float)) else 0

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
        """Parse raw level response; None when level data is unavailable."""
        if not raw or "level" not in raw:
            return None
        return {
            "level": int(raw.get("level", 0)),
            "tier": int(raw.get("tier", 0)),
            "xp": int(raw.get("xp", 0)),
            "account_level": int(raw.get("accountLevel", 0)),
        }
