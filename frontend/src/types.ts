/**
 * TypeScript types for Fortnite Family Lovelace Card.
 */

export interface FortniteCardConfig {
  type: string;
  player?: string;
  layout?: "auto" | "session_only" | "career_only";
  card_style?: "bubble" | "cyber_fortnite" | "minimal";
  theme_accent?: "auto" | "victory_gold" | "slurp_cyan" | "storm_purple";
  show_match_feed?: boolean;
  show_sub_buttons?: boolean;
  max_feed_matches?: number;
  hide_account_level?: boolean;
  hide_season_level?: boolean;
  hide_rank_progress?: boolean;
  custom_background?: string;
  avatar?: string;
  show_platforms?: boolean;
  show_tournaments?: boolean;
}

export interface MatchRecord {
  match_number: number;
  match_count?: number;
  timestamp: string;
  playlist_id: string;
  mode_name: string;
  mode_category: string;
  is_victory: boolean;
  placement_text: string;
  kills: number;
  rank_track?: string;
  current_rank?: string;
  rank_progress_pct?: number;
  rank_delta_pct?: number;
}

export interface SessionSummary {
  matches_played: number;
  wins: number;
  kills: number;
  kd_ratio: number;
  win_rate_pct: number;
  net_rank_delta_pct: number;
}

export interface SessionData {
  session_id: string;
  start_time: string;
  end_time?: string | null;
  duration_minutes: number;
  summary: SessionSummary;
  matches: MatchRecord[];
}

export interface RankTrackData {
  game_mode: string;
  current_rank: string;
  current_division: number;
  progress_pct: number;
  highest_rank?: string;
  highest_division?: number;
  season_end?: string;
}

export interface CareerStatsData {
  total_matches: number;
  total_kills: number;
  total_wins: number;
  kd_ratio: number;
  win_rate_pct: number;
  minutes_played: number;
  score: number;
  players_outlived: number;
  modes?: {
    build?: ModeAggregate;
    zero_build?: ModeAggregate;
    reload?: ModeAggregate;
  };
}

export interface ModeAggregate {
  matches: number;
  kills: number;
  wins: number;
  kd: number;
  win_rate: number;
}

export interface LevelData {
  level: number;
  tier: number;
  xp: number;
  account_level: number;
}
