"""Session tracking and match delta engine for Fortnite Family Tracker."""

from __future__ import annotations

from datetime import datetime, timezone
import logging
from typing import Any

from .api.api_fortnite import ApiFortniteClient
from .const import DEFAULT_INACTIVITY_TIMEOUT

_LOGGER = logging.getLogger(__name__)

# Placement brackets, best first. Each team size reports a different subset
# (solo: top10/top25, duos: top5/top12, squads: top3/top6).
PLACEMENT_BRACKETS = [
    ("top3", "Top 3"),
    ("top5", "Top 5"),
    ("top6", "Top 6"),
    ("top10", "Top 10"),
    ("top12", "Top 12"),
    ("top25", "Top 25"),
]


def _rank_position(track: dict[str, Any] | None) -> float:
    """Return a monotonic ladder position (division * 100 + progress %) for a rank track."""
    if not track:
        return 0.0
    return float(track.get("current_division", 0) or 0) * 100 + float(track.get("progress_pct", 0.0) or 0.0)


def _track_key_for_mode(mode_category: str) -> str:
    """Pick the ranked track whose progress a playlist affects."""
    return "reload_build" if mode_category == "reload" else "battle_royale"


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
                "br_rank_position": _rank_position(br_rank),
                "reload_rank_position": _rank_position(initial_ranked.get("reload_build")),
            },
            "summary": {
                "matches_played": 0,
                "wins": 0,
                "kills": 0,
                "kd_ratio": 0.0,
                "win_rate_pct": 0.0,
                "net_rank_delta_pct": 0.0,
                "net_reload_rank_delta_pct": 0.0,
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

        # At this point, session is active (or was just started). A session restored
        # after a restart has no snapshot yet; the current poll becomes the comparison point.
        if not self.active_session or not self.previous_snapshot:
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

                    # Best placement bracket reached since the previous poll
                    placement_text = "Match Completed"
                    if is_win:
                        placement_text = "Victory Royale \U0001F3C6"
                    else:
                        for key, label in PLACEMENT_BRACKETS:
                            if curr_p.get(key, 0) - prev_p.get(key, 0) > 0:
                                placement_text = label
                                break

                    # Rank change on the ranked track this playlist feeds
                    mode_category = curr_p.get("mode", ApiFortniteClient.resolve_playlist_mode(p_id))
                    track_key = _track_key_for_mode(mode_category)
                    curr_track = current_ranked.get(track_key) or {}
                    prev_track = prev_ranked.get(track_key) or {}
                    rank_delta_pct = round(_rank_position(curr_track) - _rank_position(prev_track), 1)

                    match_number = sum(m.get("match_count", 1) for m in self.active_session["matches"]) + 1
                    match_record = {
                        "match_number": match_number,
                        "match_count": p_match_delta,
                        "timestamp": now.isoformat(),
                        "playlist_id": p_id,
                        "mode_name": curr_p.get("name", ApiFortniteClient.resolve_playlist_name(p_id)),
                        "mode_category": mode_category,
                        "is_victory": is_win,
                        "wins": delta_wins,
                        "placement_text": placement_text,
                        "kills": delta_kills,
                        "rank_track": curr_track.get("game_mode", "Battle Royale"),
                        "current_rank": curr_track.get("current_rank", "Unranked"),
                        "rank_progress_pct": curr_track.get("progress_pct", 0.0),
                        "rank_delta_pct": rank_delta_pct,
                    }

                    self.active_session["matches"].insert(0, match_record)
                    newly_detected_matches.append(match_record)

            # Update session summary KPI metrics
            baseline = self.active_session["baseline"]
            session_matches = sum(m.get("match_count", 1) for m in self.active_session["matches"])
            session_kills = curr_overall.get("kills", 0) - baseline.get("kills", 0)
            session_wins = curr_overall.get("wins", 0) - baseline.get("wins", 0)
            deaths = max(1, session_matches - session_wins)

            net_rank_delta = round(
                _rank_position(current_ranked.get("battle_royale")) - baseline.get("br_rank_position", 0.0), 1
            )
            net_reload_delta = round(
                _rank_position(current_ranked.get("reload_build")) - baseline.get("reload_rank_position", 0.0), 1
            )

            self.active_session["summary"] = {
                "matches_played": session_matches,
                "wins": session_wins,
                "kills": session_kills,
                "kd_ratio": round(session_kills / deaths, 2) if session_matches > 0 else 0.0,
                "win_rate_pct": round((session_wins / session_matches) * 100, 1) if session_matches > 0 else 0.0,
                "net_rank_delta_pct": net_rank_delta,
                "net_reload_rank_delta_pct": net_reload_delta,
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

    def export_active_state(self) -> dict[str, Any] | None:
        """Return the active session for persistence, or None when idle."""
        if not self.is_active or not self.active_session:
            return None
        return {
            "session": self.active_session,
            "last_activity_time": self.last_activity_time.isoformat() if self.last_activity_time else None,
        }

    def restore_active_state(self, state: dict[str, Any] | None) -> None:
        """Resume an active session saved before a restart."""
        if not state or not state.get("session"):
            return
        self.active_session = state["session"]
        self.is_active = True
        last = state.get("last_activity_time") or self.active_session.get("start_time")
        self.last_activity_time = datetime.fromisoformat(last) if last else datetime.now(timezone.utc)
        # No snapshot survives a restart; the first poll re-establishes the comparison point.
        self.previous_snapshot = None
        _LOGGER.info("Restored active Fortnite session for %s", self.player_name)
