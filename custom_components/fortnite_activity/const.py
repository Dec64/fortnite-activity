DOMAIN = "fortnite_activity"

# Configuration keys
CONF_API_KEY = "api_key"
CONF_PLAYERS = "players"
CONF_PLAYER_ID = "player_id"
CONF_PLAYER_NAME = "player_name"
CONF_ACCOUNT_ID = "account_id"
CONF_ACTIVE_INTERVAL = "active_interval"
CONF_IDLE_INTERVAL = "idle_interval"
CONF_INACTIVITY_TIMEOUT = "inactivity_timeout"

# Defaults
DEFAULT_ACTIVE_INTERVAL = 90  # 90 seconds while playing
DEFAULT_IDLE_INTERVAL = 1800  # 30 minutes when idle
DEFAULT_INACTIVITY_TIMEOUT = 20  # 20 minutes before ending session

# API Endpoints
API_BASE_URL = "https://prod.api-fortnite.com/api"
API_HEADER_KEY = "x-api-key"
STATS_ENDPOINT = "/v2/stats/{account_id}"
RANKED_ENDPOINT = "/v1/profile/ranked?accountId={account_id}"
LEVEL_ENDPOINT = "/v1/profile/level?accountId={account_id}"

# Playlist Name Mapping
PLAYLIST_NAMES = {
    # Standard Battle Royale (Build)
    "defaultsolo": "Battle Royale Solo",
    "defaultduo": "Battle Royale Duos",
    "trios": "Battle Royale Trios",
    "defaultsquad": "Battle Royale Squads",
    # Zero Build
    "nobuildbr_solo": "Zero Build Solo",
    "nobuildbr_duo": "Zero Build Duos",
    "nobuildbr_trio": "Zero Build Trios",
    "nobuildbr_squad": "Zero Build Squads",
    # Reload / Ranked Codenames
    "ropesmileduo": "Reload Duos",
    "ropesmilesquad": "Reload Squads",
    "habanero_ropesmile_duos": "Ranked Reload Duos",
    "habanero_ropesmile_squads": "Ranked Reload Squads",
    "habanero_solo": "Ranked Battle Royale Solo",
    "habanero_duo": "Ranked Battle Royale Duos",
    "habanero_trio": "Ranked Battle Royale Trios",
    "habanero_squad": "Ranked Battle Royale Squads",
    "nobuildbr_habanero_solo": "Ranked Zero Build Solo",
    "nobuildbr_habanero_duo": "Ranked Zero Build Duos",
    "nobuildbr_habanero_trio": "Ranked Zero Build Trios",
    "nobuildbr_habanero_squad": "Ranked Zero Build Squads",
}

# Mode Categories
MODE_BUILD = "build"
MODE_ZERO_BUILD = "zero_build"
MODE_RELOAD = "reload"
MODE_OTHER = "other"

# Rank tiers and styling
RANK_TIERS = {
    "Bronze": {"color": "#CD7F32", "glow": "rgba(205, 127, 50, 0.4)"},
    "Silver": {"color": "#C0C0C0", "glow": "rgba(192, 192, 192, 0.4)"},
    "Gold": {"color": "#FFD700", "glow": "rgba(255, 215, 0, 0.5)"},
    "Platinum": {"color": "#00E5FF", "glow": "rgba(0, 229, 255, 0.5)"},
    "Diamond": {"color": "#3B82F6", "glow": "rgba(59, 130, 246, 0.6)"},
    "Elite": {"color": "#A855F7", "glow": "rgba(168, 85, 247, 0.6)"},
    "Champion": {"color": "#F59E0B", "glow": "rgba(245, 158, 11, 0.6)"},
    "Unreal": {"color": "#EF4444", "glow": "rgba(239, 68, 68, 0.7)"},
}
