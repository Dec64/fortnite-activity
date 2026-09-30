import { LitElement, html, nothing, PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { cardStyles } from "./styles";
import { FortniteCardConfig, MatchRecord } from "./types";
import "./editor";

const CARD_VERSION = "1.0.9";

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
  description: "Fortnite player profile, live session tracker, time-windowed stats and tournaments.",
  preview: false,
  documentationURL: "https://github.com/Dec64/fortnite-activity",
});

// Name-derived entity suffixes used by pre-1.0.7 registries (entity name based)
const ENTITY_KEY_ALIASES: Record<string, string[]> = {
  current_session: ["session"],
  rank_battle_royale: ["battle_royale_rank"],
  rank_reload: ["reload_rank"],
};

const RANK_COLORS: Record<string, string> = {
  Bronze: "#CD7F32",
  Silver: "#C0C0C0",
  Gold: "#FFD700",
  Platinum: "#00E5FF",
  Diamond: "#3B82F6",
  Elite: "#A855F7",
  Champion: "#F59E0B",
  Unreal: "#EF4444",
};

const DEFAULTS: Partial<FortniteCardConfig> = {
  player: "player1",
  layout: "auto",
  card_style: "bubble",
  theme_accent: "auto",
  show_match_feed: true,
  show_sub_buttons: true,
  show_platforms: true,
  show_tournaments: true,
  max_feed_matches: 10,
};

type View = "session" | "stats" | "events";
type StatWindow = "lifetime" | "season" | "week" | "today";
type Mode = "all" | "build" | "zero_build" | "reload";

const hideBroken = (ev: Event) => {
  (ev.target as HTMLElement).hidden = true;
};

// Page-wide caches shared by every card instance
const catalogCache: { at: number; promise?: Promise<any> } = { at: 0 };
const cosmeticCache = new Map<string, Promise<any>>();

export class FortniteActivityCard extends LitElement {
  public static get styles() {
    return cardStyles;
  }

  @property({ attribute: false }) public hass?: any;
  @state() private _config: FortniteCardConfig = { type: "custom:fortnite-activity-card", ...DEFAULTS };
  @state() private _view: View | null = null; // null = automatic (layout: auto)
  @state() private _window: StatWindow = "lifetime";
  @state() private _selectedMode: Mode = "all";
  @state() private _loadingAction: string | null = null;
  @state() private _catalog: { season?: any; playlists: Record<string, any> } = { playlists: {} };
  @state() private _avatar: any = null;
  @state() private _tournaments: { region?: string; tournaments?: any[] | null; loading?: boolean; error?: string } = {};

  private _entityCache = new Map<string, string>();
  private _avatarTimer?: number;
  private _avatarQuery = "";
  private _tournamentsAt = 0;

  public setConfig(config: FortniteCardConfig): void {
    if (!config) {
      throw new Error("Invalid configuration");
    }
    this._config = { ...DEFAULTS, ...config } as FortniteCardConfig;
    this._entityCache.clear();
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement("fortnite-activity-card-editor");
  }

  public static getStubConfig(): Record<string, any> {
    return { type: "custom:fortnite-activity-card", ...DEFAULTS };
  }

  public getCardSize(): number {
    return 6;
  }

  private get _player(): string {
    return (this._config.player || "player1").toLowerCase();
  }

  // ---- data loading --------------------------------------------------------

  protected updated(changed: PropertyValues): void {
    super.updated(changed);
    if (!this.hass) return;
    if (changed.has("hass") && !changed.get("hass")) {
      this._loadCatalog();
    }
    if (changed.has("_config") || (changed.has("hass") && !changed.get("hass"))) {
      this._scheduleAvatar();
    }
  }

  private async _loadCatalog(): Promise<void> {
    // Catalogue changes daily at most; refresh at most hourly per page
    if (!catalogCache.promise || Date.now() - catalogCache.at > 3600_000) {
      catalogCache.at = Date.now();
      catalogCache.promise = this.hass
        .callWS({ type: "fortnite_activity/catalog", player_id: this._player })
        .catch(() => ({ playlists: {} }));
    }
    const result = await catalogCache.promise;
    this._catalog = { season: result?.season, playlists: result?.playlists || {} };
  }

  private _scheduleAvatar(): void {
    const query = (this._config.avatar || "").trim();
    if (query === this._avatarQuery) return;
    this._avatarQuery = query;
    window.clearTimeout(this._avatarTimer);
    if (query.length < 3) {
      this._avatar = null;
      return;
    }
    // Debounced so typing in the editor does not search on every keystroke
    this._avatarTimer = window.setTimeout(async () => {
      const key = query.toLowerCase();
      if (!cosmeticCache.has(key)) {
        cosmeticCache.set(
          key,
          this.hass
            .callWS({ type: "fortnite_activity/cosmetic", query })
            .then((r: any) => r?.cosmetic || null)
            .catch(() => null),
        );
      }
      const cosmetic = await cosmeticCache.get(key);
      if (this._avatarQuery === query) this._avatar = cosmetic;
    }, 800);
  }

  private async _loadTournaments(force = false): Promise<void> {
    if (!this.hass || this._tournaments.loading) return;
    if (!force && Date.now() - this._tournamentsAt < 30 * 60_000 && this._tournaments.tournaments !== undefined) return;
    this._tournaments = { ...this._tournaments, loading: true, error: undefined };
    try {
      const result = await this.hass.callWS({ type: "fortnite_activity/tournaments", player_id: this._player });
      this._tournaments = { region: result?.region, tournaments: result?.tournaments ?? null };
      this._tournamentsAt = Date.now();
    } catch (err: any) {
      this._tournaments = { error: err?.message || "Could not load tournaments" };
    }
  }

  // ---- entity lookup -------------------------------------------------------

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

  // ---- actions -------------------------------------------------------------

  private async _callService(service: string, data: Record<string, any> = {}): Promise<void> {
    if (!this.hass) return;
    this._loadingAction = service;
    try {
      await this.hass.callService("fortnite_activity", service, { player_id: this._player, ...data });
      setTimeout(() => {
        this._loadingAction = null;
      }, 1500);
    } catch (err) {
      this._loadingAction = null;
      console.error(`Error calling service fortnite_activity.${service}:`, err);
    }
  }

  private _setView(view: View): void {
    this._view = view;
    if (view === "events") this._loadTournaments();
  }

  // ---- formatting ----------------------------------------------------------

  private _formatRelativeTime(isoString?: string): string {
    if (!isoString) return "";
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "";
    const diffMin = Math.max(1, Math.round((Date.now() - date.getTime()) / 60000));
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHours = Math.round(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.round(diffHours / 24)}d ago`;
  }

  private _formatDuration(minutes: number): string {
    if (!minutes || minutes <= 0) return "0m";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  }

  private _formatWhen(iso: string): string {
    const date = new Date(iso);
    const locale = this.hass?.locale?.language || undefined;
    return date.toLocaleString(locale, { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  }

  private _num(value: any, digits = 0): string {
    const n = Number(value || 0);
    return n.toLocaleString(this.hass?.locale?.language || undefined, {
      maximumFractionDigits: digits,
      minimumFractionDigits: 0,
    });
  }

  private _rankLabel(attrs: any): string {
    const name = attrs.current_rank || "Unranked";
    return attrs.unreal_rank ? `${name} #${Number(attrs.unreal_rank).toLocaleString()}` : name;
  }

  private _rankColor(name: string): string {
    const tier = Object.keys(RANK_COLORS).find((t) => (name || "").startsWith(t));
    return tier ? RANK_COLORS[tier] : "var(--secondary-text-color)";
  }

  private _playlist(playlistId?: string): any {
    return playlistId ? this._catalog.playlists[playlistId.toLowerCase()] : undefined;
  }

  // ---- render --------------------------------------------------------------

  protected render() {
    if (!this.hass) {
      return html`<ha-card><div class="empty">Loading Fortnite Activity...</div></ha-card>`;
    }

    const player = this._player;
    const sessionSensor = this._findEntity("sensor", "current_session");
    const statsSensor = this._findEntity("sensor", "overall_stats");
    const brRankSensor = this._findEntity("sensor", "rank_battle_royale");
    const reloadRankSensor = this._findEntity("sensor", "rank_reload");
    const levelSensor = this._findEntity("sensor", "level");
    const playingSensor = this._findEntity("binary_sensor", "playing");
    const profileSensor = this._findEntity("sensor", "profile");

    if (!sessionSensor && !statsSensor && !playingSensor) {
      return html`<ha-card><div class="empty">
        No Fortnite Activity entities found for player <b>${player}</b>.
        Check the card's player key matches the player ID configured in the integration.
      </div></ha-card>`;
    }

    const isPlaying = playingSensor?.state === "on" || sessionSensor?.state === "active";
    const sessionAttrs = sessionSensor?.attributes || {};
    const statsAttrs = statsSensor?.attributes || {};
    const profileAttrs = profileSensor?.attributes || {};
    // Rank name is the sensor state, not an attribute
    const brRankAttrs = { ...(brRankSensor?.attributes || {}), current_rank: brRankSensor?.state };
    const reloadRankAttrs = { ...(reloadRankSensor?.attributes || {}), current_rank: reloadRankSensor?.state };

    let view: View = this._view ?? (isPlaying ? "session" : "stats");
    if (this._config.layout === "session_only") view = "session";
    else if (this._config.layout === "career_only") view = "stats";
    if (view === "events" && this._config.show_tournaments === false) view = "stats";

    let style = "";
    const accents: Record<string, string> = { victory_gold: "#FFD700", slurp_cyan: "#00E5FF", storm_purple: "#A855F7" };
    if (accents[this._config.theme_accent || ""]) style += `--accent: ${accents[this._config.theme_accent!]};`;
    if (this._config.custom_background) {
      style += ` --card-bg: url('${this._config.custom_background}') center/cover no-repeat;`;
    }

    return html`
      <ha-card class="theme-${this._config.card_style || "bubble"}" style="${style}">
        ${this._renderHeader(player, isPlaying, sessionAttrs, statsAttrs, profileAttrs, levelSensor)}
        ${this._config.show_sub_buttons !== false ? this._renderButtons(view, isPlaying) : nothing}
        ${view === "session"
          ? this._renderSessionView(isPlaying, sessionAttrs, brRankAttrs)
          : view === "events"
            ? this._renderEventsView()
            : this._renderStatsView(statsAttrs, profileAttrs, brRankAttrs, reloadRankAttrs)}
      </ha-card>
    `;
  }

  private _renderHeader(player: string, isPlaying: boolean, sessionAttrs: any, statsAttrs: any, profileAttrs: any, levelSensor: any) {
    const displayName = profileAttrs.display_name || player.charAt(0).toUpperCase() + player.slice(1);
    const season = profileAttrs.season || this._catalog.season;
    const platforms: any[] = this._config.show_platforms !== false ? profileAttrs.platforms || [] : [];
    const lastPlayed = statsAttrs.metrics?.last_played;
    const levelAttrs = levelSensor?.attributes || {};
    const seasonLevel = Number(levelSensor?.state);
    const accountLevel = Number(levelAttrs.account_level || 0);
    const avatarImg = this._avatar?.icon;

    return html`
      <div class="card-header">
        <div class="player-identity">
          <div class="player-avatar ${avatarImg ? "has-image" : ""}">
            ${avatarImg ? html`<img src=${avatarImg} alt=${this._avatar?.name || ""} @error=${hideBroken} />` : player.slice(0, 2).toUpperCase()}
          </div>
          <div class="player-info">
            <h2>${displayName}</h2>
            <div class="player-meta">
              ${season?.number ? html`<span class="level-badge">S${season.number} · ${season.days_left}d left</span>` : nothing}
              ${!this._config.hide_season_level && seasonLevel > 0 ? html`<span class="level-badge">Lvl ${seasonLevel}</span>` : nothing}
              ${!this._config.hide_account_level && accountLevel > 0 ? html`<span>Acct ${accountLevel.toLocaleString()}</span>` : nothing}
              ${lastPlayed?.time && !isPlaying
                ? html`<span title=${lastPlayed.name || ""}>Played ${this._formatRelativeTime(lastPlayed.time)}</span>`
                : nothing}
            </div>
            ${platforms.length
              ? html`<div class="platforms">
                  ${platforms.map((p) => html`<span class="platform-chip" title=${p.name || p.label}>${p.label}${p.name ? html` · ${p.name}` : nothing}</span>`)}
                </div>`
              : nothing}
          </div>
        </div>
        <div class="status-pill ${isPlaying ? "live" : "idle"}">
          ${isPlaying
            ? html`<div class="pulse-dot"></div><span>LIVE • ${this._formatDuration(sessionAttrs.duration_minutes || 0)}</span>`
            : html`<span>IDLE</span>`}
        </div>
      </div>
    `;
  }

  private _renderButtons(view: View, isPlaying: boolean) {
    const tab = (id: View, icon: string, label: string) => html`
      <button class="bubble-sub-button ${view === id ? "active" : ""}" @click=${() => this._setView(id)}>
        <ha-icon icon=${icon}></ha-icon><span>${label}</span>
      </button>
    `;
    return html`
      <div class="sub-button-row">
        ${this._config.layout !== "career_only" ? tab("session", "mdi:lightning-bolt", isPlaying ? "Live Session" : "Last Session") : nothing}
        ${this._config.layout !== "session_only" ? tab("stats", "mdi:trophy-outline", "Stats") : nothing}
        ${this._config.show_tournaments !== false && this._config.layout === "auto" ? tab("events", "mdi:tournament", "Events") : nothing}
        ${isPlaying
          ? html`<button class="bubble-sub-button" @click=${() => this._callService("end_session")} ?disabled=${this._loadingAction === "end_session"}>
              <ha-icon icon="mdi:stop-circle-outline"></ha-icon>
              <span>${this._loadingAction === "end_session" ? "Stopping..." : "End Session"}</span>
            </button>`
          : html`<button class="bubble-sub-button" @click=${() => this._callService("start_session")} ?disabled=${this._loadingAction === "start_session"}>
              <ha-icon icon="mdi:play-circle-outline"></ha-icon>
              <span>${this._loadingAction === "start_session" ? "Starting..." : "Start Session"}</span>
            </button>`}
        <button class="bubble-sub-button" @click=${() => this._callService("refresh_player")} ?disabled=${this._loadingAction === "refresh_player"}>
          <ha-icon icon=${this._loadingAction === "refresh_player" ? "mdi:loading" : "mdi:refresh"} class=${this._loadingAction === "refresh_player" ? "spin" : ""}></ha-icon>
          <span>${this._loadingAction === "refresh_player" ? "Refreshing..." : "Refresh"}</span>
        </button>
      </div>
    `;
  }

  private _renderRank(title: string, attrs: any, subtitle: string) {
    const name = this._rankLabel(attrs);
    const progress = Number(attrs.progress_pct || 0);
    return html`
      <div class="rank-section">
        <div class="rank-header">
          <span class="rank-title">${title}</span>
          <span class="rank-name" style="color: ${this._rankColor(attrs.current_rank)}">${name}</span>
        </div>
        ${this._config.hide_rank_progress || (attrs.current_rank || "").startsWith("Unreal")
          ? nothing
          : html`<div class="progress-bar-bg">
              <div class="progress-bar-fill" style="width: ${Math.min(100, Math.max(0, progress))}%;"></div>
            </div>`}
        <div class="rank-meta">
          <span>${(attrs.current_rank || "").startsWith("Unreal") ? "Top rank" : `${progress}% to promotion`}</span>
          <span>${subtitle}</span>
        </div>
      </div>
    `;
  }

  private _renderSessionView(isPlaying: boolean, sessionAttrs: any, brRankAttrs: any) {
    const rankDelta = Number(sessionAttrs.net_rank_delta_pct || 0);
    const recentMatches: MatchRecord[] = sessionAttrs.recent_matches || [];
    const displayMatches = recentMatches.slice(0, this._config.max_feed_matches || 10);
    const signed = (n: number) => (n >= 0 ? `+${n}%` : `${n}%`);

    return html`
      <div class="kpi-row">
        <div class="kpi-chip"><span class="kpi-label">Matches</span><span class="kpi-value cyan">${sessionAttrs.matches_played || 0}</span></div>
        <div class="kpi-chip"><span class="kpi-label">Victories</span><span class="kpi-value gold">${sessionAttrs.wins || 0} 🏆</span></div>
        <div class="kpi-chip"><span class="kpi-label">Kills</span><span class="kpi-value">${sessionAttrs.kills || 0}</span></div>
        <div class="kpi-chip"><span class="kpi-label">Session K/D</span><span class="kpi-value">${sessionAttrs.kd_ratio || 0}</span></div>
        <div class="kpi-chip">
          <span class="kpi-label">Rank Net</span>
          <span class="kpi-value ${rankDelta >= 0 ? "positive" : "negative"}">${signed(rankDelta)}</span>
        </div>
      </div>

      ${this._renderRank("Battle Royale Ranked", brRankAttrs, `${rankDelta >= 0 ? "▲" : "▼"} ${signed(rankDelta)} this session`)}

      ${this._config.show_match_feed !== false
        ? html`
            <div class="match-feed-header">
              <span>Match Feed (${recentMatches.length} ${recentMatches.length === 1 ? "entry" : "entries"})</span>
              ${isPlaying ? html`<span class="tracking-live">Tracking Live</span>` : nothing}
            </div>
            <div class="match-list">
              ${displayMatches.length > 0
                ? displayMatches.map((m) => this._renderMatch(m))
                : html`<div class="empty">
                    No matches recorded in this session yet.<br />
                    <small>Matches appear here once Fortnite publishes the finished game's stats.</small>
                  </div>`}
            </div>
          `
        : nothing}
    `;
  }

  private _renderMatch(m: MatchRecord) {
    const art = this._playlist(m.playlist_id)?.image;
    return html`
      <div class="match-card ${m.is_victory ? "victory" : ""}">
        ${art ? html`<img class="match-art" src=${art} alt="" loading="lazy" @error=${hideBroken} />` : nothing}
        <div class="match-left">
          <div class="match-headline">
            <span class="match-num">#${m.match_number}${(m.match_count || 1) > 1 ? ` ×${m.match_count}` : ""}</span>
            <span class="placement-badge ${m.is_victory ? "win" : ""}">${m.placement_text}</span>
          </div>
          <span class="match-mode">${m.mode_name} • ${this._formatRelativeTime(m.timestamp)}</span>
        </div>
        <div class="match-right">
          <span class="kills-badge"><ha-icon icon="mdi:skull-outline" style="--mdc-icon-size: 16px;"></ha-icon>${m.kills}</span>
          ${m.rank_delta_pct
            ? html`<span class="rank-delta-badge ${m.rank_delta_pct >= 0 ? "pos" : "neg"}">
                ${m.rank_delta_pct >= 0 ? `+${m.rank_delta_pct}%` : `${m.rank_delta_pct}%`}
              </span>`
            : nothing}
        </div>
      </div>
    `;
  }

  private _renderStatsView(statsAttrs: any, profileAttrs: any, brRankAttrs: any, reloadRankAttrs: any) {
    const windows = profileAttrs.windows || {};
    const labels = profileAttrs.window_labels || {};
    const available: StatWindow[] = ["lifetime", ...(["season", "week", "today"] as StatWindow[]).filter((w) => windows[w])];
    const activeWindow: StatWindow = available.includes(this._window) ? this._window : "lifetime";
    const windowNames: Record<StatWindow, string> = { lifetime: "Lifetime", season: "Season", week: "7 Days", today: "Today" };

    const metrics = statsAttrs.metrics || {};
    const lifetime = {
      matches: statsAttrs.total_matches || 0,
      kills: statsAttrs.total_kills || 0,
      wins: statsAttrs.total_wins || 0,
      kd: statsAttrs.kd_ratio || 0,
      win_rate: statsAttrs.win_rate_pct || 0,
      players_outlived: statsAttrs.players_outlived || 0,
      hours_played: metrics.hours_played,
      kills_per_match: metrics.kills_per_match,
      avg_match_minutes: metrics.avg_match_minutes,
      favourite_mode: metrics.favourite_mode,
      modes: statsAttrs.modes || {},
    };
    const base: any = activeWindow === "lifetime" ? lifetime : windows[activeWindow];
    const modeStats = this._selectedMode !== "all" ? base.modes?.[this._selectedMode] : null;
    const shown = modeStats && modeStats.matches !== undefined ? modeStats : base;
    const hours = shown.minutes !== undefined ? Math.round((shown.minutes / 60) * 10) / 10 : base.hours_played;
    const favourite = base.favourite_mode;
    const favArt = this._playlist(favourite?.playlist_id)?.image;

    const modeTab = (id: Mode, label: string) => html`
      <button class="mode-tab ${this._selectedMode === id ? "active" : ""}" @click=${() => (this._selectedMode = id)}>${label}</button>
    `;

    return html`
      ${available.length > 1
        ? html`<div class="mode-tabs window-tabs">
            ${available.map(
              (w) => html`<button class="mode-tab ${activeWindow === w ? "active" : ""}" title=${labels[w] || ""}
                @click=${() => (this._window = w)}>${windowNames[w]}</button>`,
            )}
          </div>`
        : nothing}

      <div class="mode-tabs">
        ${modeTab("all", "Overall")} ${modeTab("zero_build", "Zero Build")} ${modeTab("build", "Build")} ${modeTab("reload", "Reload")}
      </div>

      <div class="kpi-row">
        <div class="kpi-chip"><span class="kpi-label">Win Rate</span><span class="kpi-value cyan">${shown.win_rate || 0}%</span></div>
        <div class="kpi-chip"><span class="kpi-label">K/D</span><span class="kpi-value">${shown.kd || 0}</span></div>
        <div class="kpi-chip"><span class="kpi-label">Wins</span><span class="kpi-value gold">${this._num(shown.wins)} 🏆</span></div>
        <div class="kpi-chip"><span class="kpi-label">Matches</span><span class="kpi-value">${this._num(shown.matches)}</span></div>
        <div class="kpi-chip"><span class="kpi-label">Kills</span><span class="kpi-value">${this._num(shown.kills)}</span></div>
        <div class="kpi-chip"><span class="kpi-label">Outlived</span><span class="kpi-value">${this._num(shown.players_outlived)}</span></div>
        <div class="kpi-chip"><span class="kpi-label">Kills / Match</span><span class="kpi-value">${shown.matches ? this._num(shown.kills / shown.matches, 2) : 0}</span></div>
        ${hours !== undefined ? html`<div class="kpi-chip"><span class="kpi-label">Hours</span><span class="kpi-value">${this._num(hours, 1)}</span></div>` : nothing}
      </div>

      ${activeWindow === "lifetime" && this._selectedMode === "all" ? this._renderLifetimeExtras(statsAttrs) : nothing}

      ${favourite
        ? html`<div class="feature-card" style=${favArt ? `--feature-art: url('${favArt}')` : ""}>
            <span class="feature-label">Favourite mode${activeWindow !== "lifetime" ? ` · ${windowNames[activeWindow]}` : ""}</span>
            <span class="feature-value">${this._playlist(favourite.playlist_id)?.name || favourite.name}</span>
            <span class="feature-sub">${this._num(favourite.matches)} matches</span>
          </div>`
        : nothing}

      ${this._renderRank("Battle Royale", brRankAttrs, `Peak: ${brRankAttrs.highest_rank || brRankAttrs.current_rank || "Unranked"}`)}
      ${this._renderRank("Reload", reloadRankAttrs, `Peak: ${reloadRankAttrs.highest_rank || reloadRankAttrs.current_rank || "Unranked"}`)}
    `;
  }

  private _renderLifetimeExtras(statsAttrs: any) {
    const metrics = statsAttrs.metrics || {};
    const inputs = Object.values<any>(statsAttrs.inputs || {}).filter((i) => i.matches > 0);
    const sizes = statsAttrs.team_sizes || {};
    return html`
      <div class="kpi-row compact">
        <div class="kpi-chip"><span class="kpi-label">Kills / Min</span><span class="kpi-value">${metrics.kills_per_minute ?? 0}</span></div>
        <div class="kpi-chip"><span class="kpi-label">Avg Match</span><span class="kpi-value">${metrics.avg_match_minutes ?? 0}m</span></div>
        <div class="kpi-chip"><span class="kpi-label">Score / Match</span><span class="kpi-value">${this._num(metrics.score_per_match)}</span></div>
        <div class="kpi-chip"><span class="kpi-label">Solo Top 10</span><span class="kpi-value">${metrics.solo_top10_rate ?? 0}%</span></div>
        <div class="kpi-chip"><span class="kpi-label">Solo Top 25</span><span class="kpi-value">${metrics.solo_top25_rate ?? 0}%</span></div>
      </div>

      ${inputs.length > 1
        ? html`<div class="split-section">
            <div class="section-title">Input (by matches)</div>
            <div class="split-bar">
              ${inputs.map((i, idx) => html`<div class="split-seg seg-${idx}" style="width: ${i.share_pct}%" title="${i.label}: ${i.share_pct}%"></div>`)}
            </div>
            <div class="split-legend">
              ${inputs.map((i, idx) => html`<span><i class="dot seg-${idx}"></i>${i.label} ${i.share_pct}% · K/D ${i.kd}</span>`)}
            </div>
          </div>`
        : nothing}

      ${Object.keys(sizes).length
        ? html`<div class="size-table">
            ${["solo", "duo", "trio", "squad"].filter((s) => sizes[s]).map(
              (s) => html`<div class="size-row">
                <span class="size-name">${s.charAt(0).toUpperCase() + s.slice(1)}</span>
                <span>${this._num(sizes[s].matches)} m</span>
                <span>${sizes[s].win_rate}% win</span>
                <span>${sizes[s].kd} K/D</span>
              </div>`,
            )}
          </div>`
        : nothing}
    `;
  }

  private _renderEventsView() {
    const t = this._tournaments;
    if (t.loading && !t.tournaments) return html`<div class="empty">Loading tournaments…</div>`;
    if (t.error) return html`<div class="empty">${t.error}</div>`;
    if (t.tournaments === null) return html`<div class="empty">Tournament schedule is not available right now.</div>`;
    const list = t.tournaments || [];
    return html`
      <div class="match-feed-header">
        <span>Tournaments${t.region ? ` · ${t.region}` : ""}</span>
        <span class="muted">Schedule only — check eligibility in game</span>
      </div>
      <div class="match-list">
        ${list.length
          ? list.map(
              (e) => html`<div class="event-card ${e.is_live ? "live" : ""}">
                ${e.poster ? html`<img class="event-art" src=${e.poster} alt="" loading="lazy" @error=${hideBroken} />` : nothing}
                <div class="match-left">
                  <div class="match-headline">
                    <span class="event-name">${e.name}</span>
                    ${e.is_live ? html`<span class="placement-badge win">LIVE</span>` : nothing}
                  </div>
                  <span class="match-mode">${e.is_live ? `Ends ${this._formatWhen(e.end)}` : this._formatWhen(e.begin)}${e.round ? ` · Round ${Number(e.round) + 1}` : ""}</span>
                </div>
              </div>`,
            )
          : html`<div class="empty">No upcoming tournaments listed for this region.</div>`}
      </div>
    `;
  }
}

if (!customElements.get("fortnite-activity-card")) {
  customElements.define("fortnite-activity-card", FortniteActivityCard);
}

console.info(
  `%c FORTNITE-ACTIVITY-CARD %c v${CARD_VERSION} `,
  "background:#7928CA;color:#fff;font-weight:700",
  "background:#00E5FF;color:#000",
);
