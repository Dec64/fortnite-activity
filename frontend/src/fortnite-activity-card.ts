import { LitElement, html, nothing } from "lit";
import { property, state, customElement } from "lit/decorators.js";
import { cardStyles } from "./styles";
import {
  CareerStatsData,
  FortniteCardConfig,
  LevelData,
  MatchRecord,
  RankTrackData,
  SessionData,
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
  preview: true,
  documentationURL: "https://github.com/Dec64/fortnite-activity",
});

@customElement("fortnite-activity-card")
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

  public static async getConfigElement() {
    return document.createElement("fortnite-activity-card-editor");
  }

  public static getStubConfig(): Record<string, any> {
    return {
      player: "player1",
      layout: "auto",
      card_style: "bubble",
      theme_accent: "auto",
      show_match_feed: true,
      show_sub_buttons: true,
      max_feed_matches: 10,
    };
  }

  private get _player(): string {
    return (this._config.player || "player1").toLowerCase();
  }

  private _getEntityState(entityId: string): any {
    return this.hass?.states[entityId];
  }

  private async _callService(service: string, data: Record<string, any> = {}): Promise<void> {
    if (!this.hass) return;
    try {
      await this.hass.callService("fortnite_activity", service, {
        player_id: this._player,
        ...data,
      });
    } catch (err) {
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

  private _formatDuration(minutes: number): string {
    if (!minutes || minutes <= 0) return "0m";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
  }

  protected render() {
    if (!this.hass) return nothing;

    const player = this._player;
    const sessionSensor = this._getEntityState(`sensor.fortnite_${player}_current_session`);
    const statsSensor = this._getEntityState(`sensor.fortnite_${player}_overall_stats`);
    const brRankSensor = this._getEntityState(`sensor.fortnite_${player}_rank_battle_royale`);
    const reloadRankSensor = this._getEntityState(`sensor.fortnite_${player}_rank_reload`);
    const levelSensor = this._getEntityState(`sensor.fortnite_${player}_level`);
    const playingSensor = this._getEntityState(`binary_sensor.fortnite_${player}_playing`);

    const isPlaying = playingSensor?.state === "on" || sessionSensor?.state === "active";

    // Extract attributes
    const sessionAttrs = sessionSensor?.attributes || {};
    const statsAttrs = statsSensor?.attributes || {};
    const brRankAttrs = brRankSensor?.attributes || {};
    const reloadRankAttrs = reloadRankSensor?.attributes || {};
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

    return html`
      <ha-card style="${accentStyle}">
        <!-- Card Header -->
        <div class="card-header">
          <div class="player-identity">
            <div class="player-avatar">${player.slice(0, 2).toUpperCase()}</div>
            <div class="player-info">
              <h2>${playerName}</h2>
              <div class="player-meta">
                <span class="level-badge">Lvl ${seasonLevel}</span>
                <span>• Account: ${accountLevel.toLocaleString()}</span>
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
                      <button class="bubble-sub-button" @click=${() => this._callService("end_session")}>
                        <ha-icon icon="mdi:stop-circle-outline"></ha-icon>
                        <span>End Session</span>
                      </button>
                    `
                  : html`
                      <button class="bubble-sub-button" @click=${() => this._callService("start_session")}>
                        <ha-icon icon="mdi:play-circle-outline"></ha-icon>
                        <span>Start Session</span>
                      </button>
                    `}

                <button class="bubble-sub-button" @click=${() => this._callService("refresh_player")}>
                  <ha-icon icon="mdi:refresh"></ha-icon>
                  <span>Refresh</span>
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

    const rankName = brRankAttrs.current_rank || "Unranked";
    const rankProgress = brRankAttrs.progress_pct || 0.0;
    const rankDiv = brRankAttrs.division || 0;

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
          <span class="kpi-value ${rankDelta >= 0 ? "positive" : "neg"}">
            ${rankDelta >= 0 ? `+${rankDelta}%` : `${rankDelta}%`}
          </span>
        </div>
      </div>

      <!-- Rank Progress Bar -->
      <div class="rank-section">
        <div class="rank-header">
          <span class="rank-title">Battle Royale Ranked</span>
          <span class="rank-name">${rankName} (Div ${rankDiv})</span>
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
                            <span class="match-num">#${m.match_number}</span>
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
    let activeStats = {
      matches: statsAttrs.total_matches || 0,
      kills: statsAttrs.total_kills || 0,
      wins: statsAttrs.total_wins || 0,
      kd: statsAttrs.kd_ratio || 0.0,
      win_rate: statsAttrs.win_rate_pct || 0.0,
    };

    if (this._selectedMode === "build" && modes.build) {
      activeStats = modes.build;
    } else if (this._selectedMode === "zero_build" && modes.zero_build) {
      activeStats = modes.zero_build;
    } else if (this._selectedMode === "reload" && modes.reload) {
      activeStats = modes.reload;
    }

    const brName = brRankAttrs.current_rank || "Unranked";
    const brProg = brRankAttrs.progress_pct || 0.0;
    const brDiv = brRankAttrs.division || 0;

    const reloadName = reloadRankAttrs.current_rank || "Unranked";
    const reloadProg = reloadRankAttrs.progress_pct || 0.0;
    const reloadDiv = reloadRankAttrs.division || 0;

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
          <span class="kpi-value">${(statsAttrs.players_outlived || 0).toLocaleString()}</span>
        </div>
      </div>

      <!-- Ranks Showcase -->
      <div class="rank-section">
        <div class="rank-header">
          <span class="rank-title">Battle Royale</span>
          <span class="rank-name">${brName} (Div ${brDiv})</span>
        </div>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" style="width: ${Math.min(100, Math.max(0, brProg))}%;"></div>
        </div>
        <div class="rank-meta">
          <span>${brProg}% to promotion</span>
          <span>Peak: ${brRankAttrs.highest_rank || brName}</span>
        </div>
      </div>

      <div class="rank-section">
        <div class="rank-header">
          <span class="rank-title">Reload Build</span>
          <span class="rank-name">${reloadName} (Div ${reloadDiv})</span>
        </div>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" style="width: ${Math.min(100, Math.max(0, reloadProg))}%;"></div>
        </div>
        <div class="rank-meta">
          <span>${reloadProg}% to promotion</span>
          <span>Peak: ${reloadRankAttrs.highest_rank || reloadName}</span>
        </div>
      </div>
    `;
  }
}
