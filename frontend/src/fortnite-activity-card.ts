import { LitElement, html, nothing, css } from "lit";
import { property, state } from "lit/decorators.js";
import { cardStyles } from "./styles";
import {
  FortniteCardConfig,
  MatchRecord,
} from "./types";
import "./editor";

// Register custom card in Home Assistant customCards list
declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
      documentationURL?: string;
    }>;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "fortnite-activity-card",
  name: "Fortnite Activity Card",
  description: "Dynamic Fortnite stats and live game-by-game session tracker with Bubble Card styling.",
  preview: false,
  documentationURL: "https://github.com/Dec64/fortnite-activity",
});

// Name-derived entity suffixes used by pre-1.0.7 registries (entity name based)
const ENTITY_KEY_ALIASES: Record<string, string[]> = {
  current_session: ["session"],
  rank_battle_royale: ["battle_royale_rank"],
  rank_reload: ["reload_rank"],
};

export class FortniteActivityCard extends LitElement {
  public static get styles() {
    return cardStyles;
  }

  @property({ attribute: false }) public hass?: any;
  @state() private _config: FortniteCardConfig = {
    type: "custom:fortnite-activity-card",
    player: "player1",
    layout: "auto",
    card_style: "bubble",
    theme_accent: "auto",
    show_match_feed: true,
    show_sub_buttons: true,
    max_feed_matches: 10,
  };

  @state() private _activeTab: "session" | "career" = "session";
  @state() private _selectedMode: "all" | "build" | "zero_build" | "reload" = "all";
  @state() private _loadingAction: string | null = null;

  public setConfig(config: FortniteCardConfig): void {
    if (!config) {
      throw new Error("Invalid configuration");
    }
    this._config = {
      player: "player1",
      layout: "auto",
      card_style: "bubble",
      theme_accent: "auto",
      show_match_feed: true,
      show_sub_buttons: true,
      max_feed_matches: 10,
      ...config,
    };
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement("fortnite-activity-card-editor");
  }

  public static getStubConfig(): Record<string, any> {
    return {
      type: "custom:fortnite-activity-card",
      player: "player1",
      layout: "auto",
      card_style: "bubble",
      theme_accent: "auto",
      show_match_feed: true,
      show_sub_buttons: true,
      max_feed_matches: 10,
    };
  }

  public getCardSize(): number {
    return 5;
  }

  private get _player(): string {
    return (this._config.player || "player1").toLowerCase();
  }

  private _entityCache = new Map<string, string>();

  /**
   * Locate an integration entity for the configured player. Entities expose
   * fortnite_player_id / fortnite_entity_key attributes (v1.0.7+); older
   * registry naming (e.g. sensor.fortnite_player1_player1_session) is matched
   * as a fallback.
   */
  private _findEntity(domain: string, key: string): any {
    const states = this.hass?.states;
    if (!states) return undefined;
    const player = this._player;
    const cacheKey = `${player}:${domain}:${key}`;
    const cached = this._entityCache.get(cacheKey);
    if (cached && states[cached]) return states[cached];

    let found: string | undefined;
    for (const [entityId, st] of Object.entries<any>(states)) {
      if (
        entityId.startsWith(`${domain}.`) &&
        st.attributes?.fortnite_player_id === player &&
        st.attributes?.fortnite_entity_key === key
      ) {
        found = entityId;
        break;
      }
    }
    if (!found) {
      const suffixes = [key, ...(ENTITY_KEY_ALIASES[key] || [])];
      const candidates = suffixes.flatMap((suffix) => [
        `${domain}.fortnite_${player}_${suffix}`,
        `${domain}.fortnite_${player}_${player}_${suffix}`,
      ]);
      found = candidates.find((id) => states[id]);
    }
    if (!found) return undefined;
    this._entityCache.set(cacheKey, found);
    return states[found];
  }

  private async _callService(service: string, data: Record<string, any> = {}): Promise<void> {
    if (!this.hass) return;
    this._loadingAction = service;
    try {
      await this.hass.callService("fortnite_activity", service, {
        player_id: this._player,
        ...data,
      });
      // Keep loading state briefly for visual feedback
      setTimeout(() => {
        this._loadingAction = null;
      }, 1500);
    } catch (err) {
      this._loadingAction = null;
      console.error(`Error calling service fortnite_activity.${service}:`, err);
    }
  }

  private _formatRelativeTime(isoString?: string): string {
    if (!isoString) return "";
    try {
      const date = new Date(isoString);
      const diffMs = Date.now() - date.getTime();
      const diffMin = Math.max(1, Math.round(diffMs / 60000));
      if (diffMin < 60) return `${diffMin}m ago`;
      const diffHours = Math.round(diffMin / 60);
      if (diffHours < 24) return `${diffHours}h ago`;
      const diffDays = Math.round(diffHours / 24);
      return `${diffDays}d ago`;
    } catch {
      return "";
    }
  }

  private _rankLabel(attrs: any): string {
    const name = attrs.current_rank || "Unranked";
    return attrs.unreal_rank ? `${name} #${Number(attrs.unreal_rank).toLocaleString()}` : name;
  }

  private _formatDuration(minutes: number): string {
    if (!minutes || minutes <= 0) return "0m";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
  }

  protected render() {
    if (!this.hass) {
      return html`<ha-card><div style="padding: 16px; text-align: center; color: var(--secondary-text-color);">Loading Fortnite Activity...</div></ha-card>`;
    }

    const player = this._player;
    const sessionSensor = this._findEntity("sensor", "current_session");
    const statsSensor = this._findEntity("sensor", "overall_stats");
    const brRankSensor = this._findEntity("sensor", "rank_battle_royale");
    const reloadRankSensor = this._findEntity("sensor", "rank_reload");
    const levelSensor = this._findEntity("sensor", "level");
    const playingSensor = this._findEntity("binary_sensor", "playing");

    if (!sessionSensor && !statsSensor && !playingSensor) {
      return html`<ha-card><div style="padding: 16px; color: var(--secondary-text-color);">
        No Fortnite Activity entities found for player <b>${player}</b>.
        Check the card's player key matches the player ID configured in the integration.
      </div></ha-card>`;
    }

    const isPlaying = playingSensor?.state === "on" || sessionSensor?.state === "active";

    // Extract attributes
    const sessionAttrs = sessionSensor?.attributes || {};
    const statsAttrs = statsSensor?.attributes || {};
    // Rank name is the sensor state, not an attribute
    const brRankAttrs = { ...(brRankSensor?.attributes || {}), current_rank: brRankSensor?.state };
    const reloadRankAttrs = { ...(reloadRankSensor?.attributes || {}), current_rank: reloadRankSensor?.state };
    const levelAttrs = levelSensor?.attributes || {};

    const playerName = player.charAt(0).toUpperCase() + player.slice(1);
    const seasonLevel = levelSensor?.state || levelAttrs.level || 0;
    const accountLevel = levelAttrs.account_level || 0;

    // Accent style overrides
    let accentStyle = "";
    if (this._config.theme_accent === "victory_gold") {
      accentStyle = "--accent: #FFD700;";
    } else if (this._config.theme_accent === "slurp_cyan") {
      accentStyle = "--accent: #00E5FF;";
    } else if (this._config.theme_accent === "storm_purple") {
      accentStyle = "--accent: #A855F7;";
    }

    // Determine current view mode: auto/adaptive vs fixed
    let activeView = this._activeTab;
    if (this._config.layout === "session_only") {
      activeView = "session";
    } else if (this._config.layout === "career_only") {
      activeView = "career";
    }

    if (this._config.custom_background) {
      accentStyle += ` --card-bg: url('${this._config.custom_background}') center/cover no-repeat;`;
    }

    return html`
      <ha-card style="${accentStyle}">
        <!-- Card Header -->
        <div class="card-header">
          <div class="player-identity">
            <div class="player-avatar">${player.slice(0, 2).toUpperCase()}</div>
            <div class="player-info">
              <h2>${playerName}</h2>
              <div class="player-meta">
                ${!this._config.hide_season_level && Number(seasonLevel) > 0 ? html`<span class="level-badge">Lvl ${seasonLevel}</span>` : ""}
                ${!this._config.hide_account_level && Number(accountLevel) > 0 ? html`<span>• Account: ${accountLevel.toLocaleString()}</span>` : ""}
                ${(this._config.hide_season_level || Number(seasonLevel) === 0) && (this._config.hide_account_level || Number(accountLevel) === 0) ? html`<span>Fortnite Player</span>` : ""}
              </div>
            </div>
          </div>

          <!-- Status Indicator Pill -->
          <div class="status-pill ${isPlaying ? "live" : "idle"}">
            ${isPlaying
              ? html`<div class="pulse-dot"></div>
                  <span>LIVE • ${this._formatDuration(sessionAttrs.duration_minutes || 0)}</span>`
              : html`<span>IDLE</span>`}
          </div>
        </div>

        <!-- Bubble Sub-Buttons Bar -->
        ${this._config.show_sub_buttons !== false
          ? html`
              <div class="sub-button-row">
                <button
                  class="bubble-sub-button ${activeView === "session" ? "active" : ""}"
                  @click=${() => (this._activeTab = "session")}
                >
                  <ha-icon icon="mdi:lightning-bolt"></ha-icon>
                  <span>${isPlaying ? "Live Session" : "Last Session"}</span>
                </button>

                <button
                  class="bubble-sub-button ${activeView === "career" ? "active" : ""}"
                  @click=${() => (this._activeTab = "career")}
                >
                  <ha-icon icon="mdi:trophy-outline"></ha-icon>
                  <span>Career Stats</span>
                </button>

                ${isPlaying
                  ? html`
                      <button class="bubble-sub-button" @click=${() => this._callService("end_session")} ?disabled=${this._loadingAction === "end_session"}>
                        <ha-icon icon="mdi:stop-circle-outline"></ha-icon>
                        <span>${this._loadingAction === "end_session" ? "Stopping..." : "End Session"}</span>
                      </button>
                    `
                  : html`
                      <button class="bubble-sub-button" @click=${() => this._callService("start_session")} ?disabled=${this._loadingAction === "start_session"}>
                        <ha-icon icon="mdi:play-circle-outline"></ha-icon>
                        <span>${this._loadingAction === "start_session" ? "Starting..." : "Start Session"}</span>
                      </button>
                    `}

                <button class="bubble-sub-button" @click=${() => this._callService("refresh_player")} ?disabled=${this._loadingAction === "refresh_player"}>
                  <ha-icon icon=${this._loadingAction === "refresh_player" ? "mdi:loading" : "mdi:refresh"} class=${this._loadingAction === "refresh_player" ? "spin" : ""}></ha-icon>
                  <span>${this._loadingAction === "refresh_player" ? "Refreshing..." : "Refresh"}</span>
                </button>
              </div>
            `
          : nothing}

        <!-- Main Body: Session View vs Career View -->
        ${activeView === "session"
          ? this._renderSessionView(isPlaying, sessionAttrs, brRankAttrs)
          : this._renderCareerView(statsAttrs, brRankAttrs, reloadRankAttrs)}
      </ha-card>
    `;
  }

  /**
   * Renders Live/Recent Session View
   */
  private _renderSessionView(isPlaying: boolean, sessionAttrs: any, brRankAttrs: any) {
    const matchesPlayed = sessionAttrs.matches_played || 0;
    const wins = sessionAttrs.wins || 0;
    const kills = sessionAttrs.kills || 0;
    const kd = sessionAttrs.kd_ratio || 0.0;
    const rankDelta = sessionAttrs.net_rank_delta_pct || 0.0;

    const rankName = this._rankLabel(brRankAttrs);
    const rankProgress = brRankAttrs.progress_pct || 0.0;

    const recentMatches: MatchRecord[] = sessionAttrs.recent_matches || [];
    const maxMatches = this._config.max_feed_matches || 10;
    const displayMatches = recentMatches.slice(0, maxMatches);

    return html`
      <!-- Session Metric KPI Chips Row -->
      <div class="kpi-row">
        <div class="kpi-chip">
          <span class="kpi-label">Matches</span>
          <span class="kpi-value cyan">${matchesPlayed}</span>
        </div>
        <div class="kpi-chip">
          <span class="kpi-label">Victories</span>
          <span class="kpi-value gold">${wins} 🏆</span>
        </div>
        <div class="kpi-chip">
          <span class="kpi-label">Kills</span>
          <span class="kpi-value">${kills}</span>
        </div>
        <div class="kpi-chip">
          <span class="kpi-label">Session K/D</span>
          <span class="kpi-value">${kd}</span>
        </div>
        <div class="kpi-chip">
          <span class="kpi-label">Rank Net</span>
          <span class="kpi-value ${rankDelta >= 0 ? "positive" : "negative"}">
            ${rankDelta >= 0 ? `+${rankDelta}%` : `${rankDelta}%`}
          </span>
        </div>
      </div>

      <!-- Rank Progress Bar -->
      <div class="rank-section">
        <div class="rank-header">
          <span class="rank-title">Battle Royale Ranked</span>
          <span class="rank-name">${rankName}</span>
        </div>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" style="width: ${Math.min(100, Math.max(0, rankProgress))}%;"></div>
        </div>
        <div class="rank-meta">
          <span>${rankProgress}% to next rank</span>
          <span style="color: ${rankDelta >= 0 ? "#10B981" : "#EF4444"}">
            ${rankDelta >= 0 ? `▲ +${rankDelta}% this session` : `▼ ${rankDelta}% this session`}
          </span>
        </div>
      </div>

      <!-- Match-by-Match Timeline Feed -->
      ${this._config.show_match_feed !== false
        ? html`
            <div class="match-feed-header">
              <span>Match Feed (${recentMatches.length} games)</span>
              ${isPlaying ? html`<span style="color: var(--accent); font-size: 11px;">Tracking Live</span>` : nothing}
            </div>

            <div class="match-list">
              ${displayMatches.length > 0
                ? displayMatches.map(
                    (m) => html`
                      <div class="match-card ${m.is_victory ? "victory" : ""}">
                        <div class="match-left">
                          <div class="match-headline">
                            <span class="match-num">#${m.match_number}${(m.match_count || 1) > 1 ? ` ×${m.match_count}` : ""}</span>
                            <span class="placement-badge ${m.is_victory ? "win" : ""}">
                              ${m.placement_text}
                            </span>
                          </div>
                          <span class="match-mode">${m.mode_name} • ${this._formatRelativeTime(m.timestamp)}</span>
                        </div>
                        <div class="match-right">
                          <span class="kills-badge">
                            <ha-icon icon="mdi:skull-outline" style="--mdc-icon-size: 16px;"></ha-icon>
                            ${m.kills}
                          </span>
                          ${m.rank_delta_pct !== undefined
                            ? html`
                                <span class="rank-delta-badge ${m.rank_delta_pct >= 0 ? "pos" : "neg"}">
                                  ${m.rank_delta_pct >= 0 ? `+${m.rank_delta_pct}%` : `${m.rank_delta_pct}%`}
                                </span>
                              `
                            : nothing}
                        </div>
                      </div>
                    `
                  )
                : html`
                    <div style="text-align: center; padding: 24px; color: var(--secondary-text-color);">
                      No matches recorded in this session yet.<br />
                      <small style="opacity: 0.7;">Matches will appear here as soon as you finish a game.</small>
                    </div>
                  `}
            </div>
          `
        : nothing}
    `;
  }

  /**
   * Renders Career Stats View
   */
  private _renderCareerView(statsAttrs: any, brRankAttrs: any, reloadRankAttrs: any) {
    const modes = statsAttrs.modes || {};
    let activeStats: Record<string, any> = {
      matches: statsAttrs.total_matches || 0,
      kills: statsAttrs.total_kills || 0,
      wins: statsAttrs.total_wins || 0,
      kd: statsAttrs.kd_ratio || 0.0,
      win_rate: statsAttrs.win_rate_pct || 0.0,
      players_outlived: statsAttrs.players_outlived || 0,
    };

    if (this._selectedMode === "build" && modes.build) {
      activeStats = modes.build;
    } else if (this._selectedMode === "zero_build" && modes.zero_build) {
      activeStats = modes.zero_build;
    } else if (this._selectedMode === "reload" && modes.reload) {
      activeStats = modes.reload;
    }

    const brName = this._rankLabel(brRankAttrs);
    const brProg = brRankAttrs.progress_pct || 0.0;

    const reloadName = this._rankLabel(reloadRankAttrs);
    const reloadProg = reloadRankAttrs.progress_pct || 0.0;

    return html`
      <!-- Mode Tabs Switcher -->
      <div class="mode-tabs">
        <button
          class="mode-tab ${this._selectedMode === "all" ? "active" : ""}"
          @click=${() => (this._selectedMode = "all")}
        >
          Overall
        </button>
        <button
          class="mode-tab ${this._selectedMode === "zero_build" ? "active" : ""}"
          @click=${() => (this._selectedMode = "zero_build")}
        >
          Zero Build
        </button>
        <button
          class="mode-tab ${this._selectedMode === "build" ? "active" : ""}"
          @click=${() => (this._selectedMode = "build")}
        >
          Battle Royale
        </button>
        <button
          class="mode-tab ${this._selectedMode === "reload" ? "active" : ""}"
          @click=${() => (this._selectedMode = "reload")}
        >
          Reload
        </button>
      </div>

      <!-- Career Stats Grid -->
      <div class="kpi-row">
        <div class="kpi-chip">
          <span class="kpi-label">Win Rate</span>
          <span class="kpi-value cyan">${activeStats.win_rate}%</span>
        </div>
        <div class="kpi-chip">
          <span class="kpi-label">K/D Ratio</span>
          <span class="kpi-value">${activeStats.kd}</span>
        </div>
        <div class="kpi-chip">
          <span class="kpi-label">Total Wins</span>
          <span class="kpi-value gold">${activeStats.wins} 🏆</span>
        </div>
        <div class="kpi-chip">
          <span class="kpi-label">Matches</span>
          <span class="kpi-value">${activeStats.matches}</span>
        </div>
        <div class="kpi-chip">
          <span class="kpi-label">Kills</span>
          <span class="kpi-value">${activeStats.kills}</span>
        </div>
        <div class="kpi-chip">
          <span class="kpi-label">Outlived</span>
          <span class="kpi-value">${(activeStats.players_outlived ?? statsAttrs.players_outlived ?? 0).toLocaleString()}</span>
        </div>
      </div>

      <!-- Ranks Showcase -->
      <div class="rank-section">
        <div class="rank-header">
          <span class="rank-title">Battle Royale</span>
          <span class="rank-name">${brName}</span>
        </div>
        ${!this._config.hide_rank_progress ? html`
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: ${Math.min(100, Math.max(0, brProg))}%;"></div>
          </div>
        ` : ""}
        <div class="rank-meta">
          <span>${brProg}% to promotion</span>
          <span>Peak: ${brRankAttrs.highest_rank || brName}</span>
        </div>
      </div>

      <div class="rank-section">
        <div class="rank-header">
          <span class="rank-title">Reload Build</span>
          <span class="rank-name">${reloadName}</span>
        </div>
        ${!this._config.hide_rank_progress ? html`
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: ${Math.min(100, Math.max(0, reloadProg))}%;"></div>
          </div>
        ` : ""}
        <div class="rank-meta">
          <span>${reloadProg}% to promotion</span>
          <span>Peak: ${reloadRankAttrs.highest_rank || reloadName}</span>
        </div>
      </div>
    `;
  }
}

if (!customElements.get("fortnite-activity-card")) {
  customElements.define("fortnite-activity-card", FortniteActivityCard);
}

console.info("%c FORTNITE-ACTIVITY-CARD %c v1.0.9 ", "background:#7928CA;color:#fff;font-weight:700", "background:#00E5FF;color:#000");
