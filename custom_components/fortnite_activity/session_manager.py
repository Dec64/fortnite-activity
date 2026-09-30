"""Session tracking and match delta engine for Fortnite Family Tracker."""

from __future__ import annotations

from datetime import datetime, timezone
import logging
from typing import Any

from .api.api_fortnite import ApiFortniteClient
from .const import DEFAULT_INACTIVITY_TIMEOUT

_LOGGER = logging.getLogger(__name__)


class FortniteSessionManager:
    """Manages active gaming sessions, match delta detection, and session history."""

    def __init__(
        self,
        player_id: str,
        player_name: str,
        inactivity_timeout_minutes: int = DEFAULT_INACTIVITY_TIMEOUT,
        history: list[dict[str, Any]] | None = None,
    ) -> None:
        """Initialize the session manager for a player."""
        self.player_id = player_id
        self.player_name = player_name
        self.inactivity_timeout_minutes = inactivity_timeout_minutes

        self.is_active: bool = False
        self.active_session: dict[str, Any] | None = None
        self.last_activity_time: datetime | None = None
        self.previous_snapshot: dict[str, Any] | None = None
        self.history: list[dict[str, Any]] = history or []

    def start_session(self, initial_stats: dict[str, Any], initial_ranked: dict[str, Any]) -> dict[str, Any]:
        """Explicitly or automatically start a new gaming session."""
        now = datetime.now(timezone.utc)
        self.is_active = True
        self.last_activity_time = now

        # Create baseline snapshot
        overall = initial_stats.get("overall", {})
        br_rank = initial_ranked.get("battle_royale") or {}

        session_id = f"session_{int(now.timestamp())}"
        self.active_session = {
            "session_id": session_id,
            "player_id": self.player_id,
            "player_name": self.player_name,
            "start_time": now.isoformat(),
            "end_time": None,
            "duration_minutes": 0,
            "baseline": {
                "matches": overall.get("matches", 0),
                "kills": overall.get("kills", 0),
                "wins": overall.get("wins", 0),
                "score": overall.get("score", 0),
                "br_rank_progress": br_rank.get("progress_pct", 0.0),
                "br_rank_name": br_rank.get("current_rank", "Unranked"),
            },
            "summary": {
                "matches_played": 0,
                "wins": 0,
                "kills": 0,
                "kd_ratio": 0.0,
                "win_rate_pct": 0.0,
                "net_rank_delta_pct": 0.0,
            },
            "matches": [],
        }

        self.previous_snapshot = {
            "stats": initial_stats,
            "ranked": initial_ranked,
        }
        _LOGGER.info("Started Fortnite session for %s: %s", self.player_name, session_id)
        return self.active_session

    def end_session(self) -> dict[str, Any] | None:
        """End the current session and archive to history."""
        if not self.is_active or not self.active_session:
            return None

        now = datetime.now(timezone.utc)
        self.active_session["end_time"] = now.isoformat()
        start = datetime.fromisoformat(self.active_session["start_time"])
        self.active_session["duration_minutes"] = max(1, int((now - start).total_seconds() / 60))

        # Archive to history (keep newest 50 sessions)
        self.history.insert(0, dict(self.active_session))
        if len(self.history) > 50:
            self.history = self.history[:50]

        ended = dict(self.active_session)
        self.is_active = False
        self.active_session = None
        self.last_activity_time = None
        _LOGGER.info("Ended Fortnite session for %s: %s", self.player_name, ended["session_id"])
        return ended

    def update_and_detect_matches(
        self,
        current_stats: dict[str, Any],
        current_ranked: dict[str, Any],
    ) -> list[dict[str, Any]]:
        """Compare current poll against previous snapshot to detect finished matches."""
        now = datetime.now(timezone.utc)

        # If not active, check if match count has incremented to auto-start session
        if not self.is_active:
            if self.previous_snapshot:
                prev_matches = self.previous_snapshot["stats"].get("overall", {}).get("matches", 0)
                curr_matches = current_stats.get("overall", {}).get("matches", 0)
                if curr_matches > prev_matches:
                    _LOGGER.info(
                        "Match increment detected while idle for %s (%d -> %d). Auto-starting session.",
                        self.player_name,
                        prev_matches,
                        curr_matches,
                    )
                    self.start_session(self.previous_snapshot["stats"], self.previous_snapshot["ranked"])
            else:
                # First ever snapshot
                self.previous_snapshot = {"stats": current_stats, "ranked": current_ranked}
                return []

        # At this point, session is active (or was just started)
        if not self.active_session:
            self.previous_snapshot = {"stats": current_stats, "ranked": current_ranked}
            return []

        prev_stats = self.previous_snapshot["stats"]
        prev_ranked = self.previous_snapshot["ranked"]

        curr_overall = current_stats.get("overall", {})
        prev_overall = prev_stats.get("overall", {})

        total_match_delta = curr_overall.get("matches", 0) - prev_overall.get("matches", 0)
        newly_detected_matches: list[dict[str, Any]] = []

        if total_match_delta > 0:
            self.last_activity_time = now

            # Find which playlist(s) changed
            curr_playlists = current_stats.get("playlists", {})
            prev_playlists = prev_stats.get("playlists", {})

            for p_id, curr_p in curr_playlists.items():
                prev_p = prev_playlists.get(p_id, {})
                p_match_delta = curr_p.get("matches", 0) - prev_p.get("matches", 0)

                if p_match_delta > 0:
                    delta_kills = max(0, curr_p.get("kills", 0) - prev_p.get("kills", 0))
                    delta_wins = max(0, curr_p.get("wins", 0) - prev_p.get("wins", 0))
                    is_win = delta_wins > 0

                    # Detect placement bracket
                    placement_text = "Match Completed"
                    if is_win:
                        placement_text = "Victory Royale 🏆"
                    elif (curr_p.get("top3", 0) - prev_p.get("top3", 0)) > 0:
                        placement_text = "Top 3"
                    elif (curr_p.get("top5", 0) - prev_p.get("top5", 0)) > 0:
                        placement_text = "Top 5"
                    elif (curr_p.get("top10", 0) - prev_p.get("top10", 0)) > 0:
                        placement_text = "Top 10"
                    elif (curr_p.get("top25", 0) - prev_p.get("top25", 0)) > 0:
                        placement_text = "Top 25"

                    # Calculate rank progression delta if applicable
                    curr_br = current_ranked.get("battle_royale") or {}
                    prev_br = prev_ranked.get("battle_royale") or {}
                    rank_delta_pct = round(
                        curr_br.get("progress_pct", 0.0) - prev_br.get("progress_pct", 0.0), 1
                    )

                    match_number = len(self.active_session["matches"]) + 1
                    match_record = {
                        "match_number": match_number,
                        "timestamp": now.isoformat(),
                        "playlist_id": p_id,
                        "mode_name": curr_p.get("name", ApiFortniteClient.resolve_playlist_name(p_id)),
                        "mode_category": curr_p.get("mode", ApiFortniteClient.resolve_playlist_mode(p_id)),
                        "is_victory": is_win,
                        "placement_text": placement_text,
                        "kills": delta_kills,
                        "rank_track": curr_br.get("game_mode", "Battle Royale"),
                        "current_rank": curr_br.get("current_rank", "Unranked"),
                        "rank_progress_pct": curr_br.get("progress_pct", 0.0),
                        "rank_delta_pct": rank_delta_pct,
                    }

                    self.active_session["matches"].insert(0, match_record)
                    newly_detected_matches.append(match_record)

            # Update session summary KPI metrics
            baseline = self.active_session["baseline"]
            session_matches = len(self.active_session["matches"])
            session_kills = curr_overall.get("kills", 0) - baseline.get("kills", 0)
            session_wins = curr_overall.get("wins", 0) - baseline.get("wins", 0)
            deaths = max(1, session_matches - session_wins)

            curr_br = current_ranked.get("battle_royale") or {}
            net_rank_delta = round(
                curr_br.get("progress_pct", 0.0) - baseline.get("br_rank_progress", 0.0), 1
            )

            self.active_session["summary"] = {
                "matches_played": session_matches,
                "wins": session_wins,
                "kills": session_kills,
                "kd_ratio": round(session_kills / deaths, 2) if session_matches > 0 else 0.0,
                "win_rate_pct": round((session_wins / session_matches) * 100, 1) if session_matches > 0 else 0.0,
                "net_rank_delta_pct": net_rank_delta,
            }
        else:
            # Check inactivity timeout
            if self.last_activity_time:
                inactive_minutes = (now - self.last_activity_time).total_seconds() / 60
                if inactive_minutes >= self.inactivity_timeout_minutes:
                    _LOGGER.info(
                        "Inactivity timeout reached (%d min) for %s. Ending session.",
                        self.inactivity_timeout_minutes,
                        self.player_name,
                    )
                    self.end_session()

        # Update duration if still active
        if self.is_active and self.active_session:
            start = datetime.fromisoformat(self.active_session["start_time"])
            self.active_session["duration_minutes"] = max(1, int((now - start).total_seconds() / 60))

        # Update previous snapshot reference
        self.previous_snapshot = {"stats": current_stats, "ranked": current_ranked}
        return newly_detected_matches

    def get_latest_session_summary(self) -> dict[str, Any] | None:
        """Return the active session or the most recent archived session."""
        if self.is_active and self.active_session:
            return self.active_session
        if self.history:
            return self.history[0]
        return None
