import { LitElement, html, nothing, svg, PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { cardStyles } from "./styles";
import { FortniteCardConfig, MatchRecord } from "./types";
import "./editor";

const CARD_VERSION = "1.1.0";

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

const RANK_COLORS: Record<string, [string, string]> = {
  Bronze: ["#E0A06A", "#8A5429"],
  Silver: ["#E8EDF2", "#8C99A6"],
  Gold: ["#FFE27A", "#C99A12"],
  Platinum: ["#8FF3FF", "#1C9DB5"],
  Diamond: ["#9CC2FF", "#2F5FD0"],
  Elite: ["#D9B4FF", "#7B35C9"],
  Champion: ["#FFC76B", "#D9530F"],
  Unreal: ["#FF9BD2", "#7B2FF7"],
};

const MODE_ICONS: Record<string, string> = {
  reload: "mdi:reload",
  zero_build: "mdi:shield-outline",
  build: "mdi:wall",
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
  compact: false,
  max_feed_matches: 10,
};

type View = "session" | "stats" | "events";
type StatWindow = "lifetime" | "season" | "week" | "today";
type Mode = "all" | "build" | "zero_build" | "reload";
interface EventFilters {
  region: string;
  mode: string;
  team: string;
  platform: string;
}

const hideBroken = (ev: Event) => {
  (ev.target as HTMLElement).hidden = true;
};

// UK date/time with 12-hour clock, e.g. "Wed 1 Oct, 7:00 pm"
const UK_TIME = (timeZone?: string) =>
  new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone,
  });

// Page-wide caches shared by every card instance
const catalogCache: { at: number; promise?: Promise<any> } = { at: 0 };
const eventsCache: { at: number; promise?: Promise<any> } = { at: 0 };
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
  @state() private _events: { list?: any[] | null; defaultRegion?: string; loading?: boolean; error?: string } = {};
  @state() private _filters: EventFilters | null = null;
  @state() private _expandedEvent: string | null = null;
  @state() private _expandedMatch: string | null = null;
  @state() private _leaderboards: Record<string, { loading?: boolean; data?: any; error?: string }> = {};
  @state() private _now = Date.now();

  private _entityCache = new Map<string, string>();
  private _avatarTimer?: number;
  private _avatarQuery = "";
  private _tick?: number;

  public setConfig(config: FortniteCardConfig): void {
    if (!config) {
      throw new Error("Invalid configuration");
    }
    this._config = { ...DEFAULTS, ...config } as FortniteCardConfig;
    this._entityCache.clear();
    this._filters = null; // re-derive from events_region
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement("fortnite-activity-card-editor");
  }

  public static getStubConfig(): Record<string, any> {
    return { type: "custom:fortnite-activity-card", ...DEFAULTS };
  }

  public getCardSize(): number {
    return this._config.compact ? 4 : 6;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    // Countdowns and live badges tick every 30 s
    this._tick = window.setInterval(() => {
      this._now = Date.now();
      if (Date.now() - eventsCache.at > 10 * 60_000) this._loadEvents();
    }, 30_000);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    window.clearInterval(this._tick);
  }

  private get _player(): string {
    return (this._config.player || "player1").toLowerCase();
  }

  private get _eventsEnabled(): boolean {
    return this._config.show_tournaments !== false || this._config.layout === "events_only";
  }

  // ---- data loading --------------------------------------------------------

  protected updated(changed: PropertyValues): void {
    super.updated(changed);
    if (!this.hass) return;
    const firstHass = changed.has("hass") && !changed.get("hass");
    if (firstHass) {
      this._loadCatalog();
      if (this._eventsEnabled) this._loadEvents();
    }
    if (changed.has("_config") || firstHass) {
      this._scheduleAvatar();
    }
  }

  private async _loadCatalog(): Promise<void> {
    if (!catalogCache.promise || Date.now() - catalogCache.at > 3600_000) {
      catalogCache.at = Date.now();
      catalogCache.promise = this.hass
        .callWS({ type: "fortnite_activity/catalog", player_id: this._player })
        .catch(() => ({ playlists: {} }));
    }
    const result = await catalogCache.promise;
    this._catalog = { season: result?.season, playlists: result?.playlists || {} };
  }

  private async _loadEvents(force = false): Promise<void> {
    if (!this.hass) return;
    if (force || !eventsCache.promise || Date.now() - eventsCache.at > 10 * 60_000) {
      eventsCache.at = Date.now();
      eventsCache.promise = this.hass.callWS({ type: "fortnite_activity/tournaments", player_id: this._player });
    }
    if (!this._events.list) this._events = { ...this._events, loading: true };
    try {
      const result = await eventsCache.promise;
      this._events = { list: result?.tournaments ?? null, defaultRegion: result?.default_region_group };
    } catch (err: any) {
      eventsCache.promise = undefined;
      this._events = { error: err?.message || "Could not load tournaments" };
    }
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

  private async _loadLeaderboard(eventId: string, windowId: string): Promise<void> {
    const key = `${eventId}|${windowId}`;
    if (this._leaderboards[key]?.loading) return;
    this._leaderboards = { ...this._leaderboards, [key]: { ...this._leaderboards[key], loading: true, error: undefined } };
    try {
      const result = await this.hass.callWS({
        type: "fortnite_activity/leaderboard",
        event_id: eventId,
        window_id: windowId,
        player_id: this._player,
      });
      this._leaderboards = { ...this._leaderboards, [key]: { data: result?.leaderboard } };
    } catch (err: any) {
      this._leaderboards = { ...this._leaderboards, [key]: { error: err?.message || "Leaderboard unavailable" } };
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
      if (service === "refresh_player" && this._eventsEnabled) this._loadEvents(true);
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
    if (view === "events") this._loadEvents();
  }

  private _toggleEvent(ev: any): void {
    if (this._expandedEvent === ev.key) {
      this._expandedEvent = null;
      return;
    }
    this._expandedEvent = ev.key;
    // Auto-load the leaderboard of the live (or most recent finished) session
    const target = ev.windows.find((w: any) => this._windowState(w) === "live")
      || [...ev.windows].reverse().find((w: any) => this._windowState(w) === "finished");
    if (target && !this._leaderboards[`${ev.event_id}|${target.window_id}`]) {
      this._loadLeaderboard(ev.event_id, target.window_id);
    }
  }

  // ---- formatting ----------------------------------------------------------

  private _formatRelativeTime(isoString?: string): string {
    if (!isoString) return "";
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "";
    const diffMin = Math.max(1, Math.round((this._now - date.getTime()) / 60000));
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHours = Math.round(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.round(diffHours / 24)}d ago`;
  }

  private _formatDuration(minutes: number): string {
    if (!minutes || minutes <= 0) return "0m";
    const h = Math.floor(minutes / 60);
    const m = Math.round(minutes % 60);
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  }

  private _formatSpan(ms: number): string {
    const totalMin = Math.max(0, Math.round(ms / 60000));
    const d = Math.floor(totalMin / 1440);
    const h = Math.floor((totalMin % 1440) / 60);
    const m = totalMin % 60;
    if (d > 0) return `${d}d ${h}h`;
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
  }

  private _formatWhen(iso: string): string {
    try {
      return UK_TIME(this.hass?.config?.time_zone).format(new Date(iso)).replace(/\b(am|pm)\b/i, (x) => x.toLowerCase());
    } catch {
      return UK_TIME().format(new Date(iso));
    }
  }

  private _num(value: any, digits = 0): string {
    const n = Number(value || 0);
    return n.toLocaleString("en-GB", { maximumFractionDigits: digits, minimumFractionDigits: 0 });
  }

  private _playlist(playlistId?: string): any {
    return playlistId ? this._catalog.playlists[playlistId.toLowerCase()] : undefined;
  }

  private _windowState(w: any): "live" | "upcoming" | "finished" {
    const begin = Date.parse(w.begin);
    const end = Date.parse(w.end);
    if (this._now >= end) return "finished";
    if (this._now >= begin) return "live";
    return "upcoming";
  }

  // ---- rank badges ---------------------------------------------------------

  /** Self-drawn tier badge (the API exposes no rank artwork): shield in tier colours with division. */
  private _rankBadge(rankName: string | undefined, size = 30) {
    const name = rankName || "Unranked";
    const tier = Object.keys(RANK_COLORS).find((t) => name.startsWith(t));
    if (!tier) {
      return html`<span class="rank-badge unranked" style="width:${size}px;height:${size}px">–</span>`;
    }
    const [light, dark] = RANK_COLORS[tier];
    const division = (name.match(/\b(I{1,3})$/) || [])[1] || "";
    const id = `g-${tier}-${size}`;
    const isUnreal = tier === "Unreal";
    return html`<span class="rank-badge" title=${name} style="width:${size}px;height:${size}px">
      ${svg`<svg viewBox="0 0 40 44" width=${size} height=${size} aria-hidden="true">
        <defs><linearGradient id=${id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color=${light}></stop><stop offset="1" stop-color=${dark}></stop>
        </linearGradient></defs>
        ${isUnreal
          ? svg`<path d="M20 2 L37 12 L37 30 L20 42 L3 30 L3 12 Z" fill="url(#${id})" stroke="rgba(255,255,255,0.8)" stroke-width="1.5"></path>
                <path d="M11 17 L15 24 L20 13 L25 24 L29 17 L27 30 L13 30 Z" fill="rgba(255,255,255,0.92)"></path>`
          : svg`<path d="M20 2 L36 8 L36 22 C36 32 28 39 20 42 C12 39 4 32 4 22 L4 8 Z" fill="url(#${id})" stroke="rgba(255,255,255,0.75)" stroke-width="1.5"></path>
                <path d="M20 9 L29 13 L29 22 C29 28 25 32 20 34 C15 32 11 28 11 22 L11 13 Z" fill="rgba(0,0,0,0.18)"></path>
                <text x="20" y="27" text-anchor="middle" font-size="11" font-weight="800" fill="#fff" font-family="sans-serif">${division}</text>`}
      </svg>`}
    </span>`;
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

    const layout = this._config.layout || "auto";
    let view: View = this._view ?? (isPlaying ? "session" : "stats");
    if (layout === "session_only") view = "session";
    else if (layout === "career_only") view = "stats";
    else if (layout === "events_only") view = "events";
    if (view === "events" && !this._eventsEnabled) view = "stats";

    let style = "";
    const accents: Record<string, string> = { victory_gold: "#FFD700", slurp_cyan: "#00E5FF", storm_purple: "#A855F7" };
    if (accents[this._config.theme_accent || ""]) style += `--accent: ${accents[this._config.theme_accent!]};`;
    if (this._config.custom_background) {
      style += ` --card-bg: url('${this._config.custom_background}') center/cover no-repeat;`;
    }
    const classes = `theme-${this._config.card_style || "bubble"}${this._config.compact ? " compact" : ""}`;

    return html`
      <ha-card class=${classes} style="${style}">
        ${this._renderHeader(player, isPlaying, sessionAttrs, statsAttrs, profileAttrs, levelSensor, brRankAttrs, reloadRankAttrs)}
        ${this._config.show_sub_buttons !== false && layout !== "events_only" ? this._renderButtons(view, isPlaying) : nothing}
        ${view === "session"
          ? this._renderSessionView(isPlaying, sessionAttrs, brRankAttrs)
          : view === "events"
            ? this._renderEventsView()
            : this._renderStatsView(statsAttrs, profileAttrs, brRankAttrs, reloadRankAttrs)}
      </ha-card>
    `;
  }

  private _renderHeader(
    player: string, isPlaying: boolean, sessionAttrs: any, statsAttrs: any, profileAttrs: any,
    levelSensor: any, brRankAttrs: any, reloadRankAttrs: any,
  ) {
    const displayName = profileAttrs.display_name || player.charAt(0).toUpperCase() + player.slice(1);
    const season = profileAttrs.season || this._catalog.season;
    const platforms: any[] = this._config.show_platforms !== false ? profileAttrs.platforms || [] : [];
    const lastPlayed = statsAttrs.metrics?.last_played;
    const levelAttrs = levelSensor?.attributes || {};
    const seasonLevel = Number(levelSensor?.state);
    const accountLevel = Number(levelAttrs.account_level || 0);
    const avatarImg = this._avatar?.icon;
    const badgeSize = this._config.compact ? 20 : 24;

    return html`
      <div class="fa-header">
        <div class="player-avatar ${avatarImg ? "has-image" : ""}">
          ${avatarImg ? html`<img src=${avatarImg} alt=${this._avatar?.name || ""} @error=${hideBroken} />` : player.slice(0, 2).toUpperCase()}
        </div>
        <div class="player-info">
          <div class="name-row">
            <h2>${displayName}</h2>
            <span class="header-ranks">
              ${brRankAttrs.current_rank && brRankAttrs.current_rank !== "Unranked" ? this._rankBadge(brRankAttrs.current_rank, badgeSize) : nothing}
              ${reloadRankAttrs.current_rank && reloadRankAttrs.current_rank !== "Unranked" ? this._rankBadge(reloadRankAttrs.current_rank, badgeSize) : nothing}
            </span>
          </div>
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
        <div class="status-pill ${isPlaying ? "live" : "idle"}">
          ${isPlaying
            ? html`<div class="pulse-dot"></div><span>LIVE • ${this._formatDuration(sessionAttrs.duration_minutes || 0)}</span>`
            : html`<span>IDLE</span>`}
        </div>
      </div>
      ${season?.progress_pct !== undefined && !this._config.compact
        ? html`<div class="season-bar" title="Season ${season.number}: ${season.progress_pct}% complete">
            <div class="season-bar-fill" style="width:${Math.min(100, season.progress_pct)}%"></div>
          </div>`
        : nothing}
    `;
  }

  private _liveEventCount(): number {
    const filters = this._currentFilters();
    return (this._events.list || []).filter(
      (e) => this._matchesFilters(e, filters) && e.windows.some((w: any) => this._windowState(w) === "live"),
    ).length;
  }

  private _renderButtons(view: View, isPlaying: boolean) {
    const layout = this._config.layout || "auto";
    const liveCount = this._eventsEnabled ? this._liveEventCount() : 0;
    const tab = (id: View, icon: string, label: string, badge = 0) => html`
      <button class="bubble-sub-button ${view === id ? "active" : ""}" @click=${() => this._setView(id)} title=${label}>
        <ha-icon icon=${icon}></ha-icon><span class="btn-label">${label}</span>
        ${badge > 0 ? html`<span class="notify-badge" title="${badge} live">${badge}</span>` : nothing}
      </button>
    `;
    return html`
      <div class="sub-button-row">
        ${layout !== "career_only" ? tab("session", "mdi:lightning-bolt", isPlaying ? "Live Session" : "Last Session") : nothing}
        ${layout !== "session_only" ? tab("stats", "mdi:trophy-outline", "Stats") : nothing}
        ${this._eventsEnabled && layout === "auto" ? tab("events", "mdi:tournament", "Events", liveCount) : nothing}
        ${isPlaying
          ? html`<button class="bubble-sub-button" title="End Session" @click=${() => this._callService("end_session")} ?disabled=${this._loadingAction === "end_session"}>
              <ha-icon icon="mdi:stop-circle-outline"></ha-icon>
              <span class="btn-label">${this._loadingAction === "end_session" ? "Stopping..." : "End Session"}</span>
            </button>`
          : html`<button class="bubble-sub-button" title="Start Session" @click=${() => this._callService("start_session")} ?disabled=${this._loadingAction === "start_session"}>
              <ha-icon icon="mdi:play-circle-outline"></ha-icon>
              <span class="btn-label">${this._loadingAction === "start_session" ? "Starting..." : "Start Session"}</span>
            </button>`}
        <button class="bubble-sub-button" title="Refresh" @click=${() => this._callService("refresh_player")} ?disabled=${this._loadingAction === "refresh_player"}>
          <ha-icon icon=${this._loadingAction === "refresh_player" ? "mdi:loading" : "mdi:refresh"} class=${this._loadingAction === "refresh_player" ? "spin" : ""}></ha-icon>
          <span class="btn-label">${this._loadingAction === "refresh_player" ? "Refreshing..." : "Refresh"}</span>
        </button>
      </div>
    `;
  }

  private _renderKpis(items: Array<[string, any, string?]>) {
    return html`<div class="kpi-row">
      ${items.map(([label, value, cls]) => html`<div class="kpi-chip"><span class="kpi-label">${label}</span><span class="kpi-value ${cls || ""}">${value}</span></div>`)}
    </div>`;
  }

  private _renderRank(title: string, attrs: any, subtitle: string, unrealChange?: number | null) {
    const name = attrs.current_rank || "Unranked";
    const progress = Number(attrs.progress_pct || 0);
    const isUnreal = name.startsWith("Unreal");
    return html`
      <div class="rank-section">
        <div class="rank-header">
          <span class="rank-title">${this._rankBadge(name, this._config.compact ? 26 : 34)}<span>${title}</span></span>
          <span class="rank-name" style="color: ${(RANK_COLORS[Object.keys(RANK_COLORS).find((t) => name.startsWith(t)) || ""] || ["var(--secondary-text-color)"])[0]}">${name}</span>
        </div>
        ${isUnreal
          ? html`<div class="unreal-position">
              <span class="unreal-number">${attrs.unreal_rank ? `#${this._num(attrs.unreal_rank)}` : "Unreal"}</span>
              ${unrealChange
                ? html`<span class="rank-delta-badge ${unrealChange > 0 ? "pos" : "neg"}">${unrealChange > 0 ? "▲" : "▼"} ${this._num(Math.abs(unrealChange))} places</span>`
                : nothing}
            </div>`
          : this._config.hide_rank_progress
            ? nothing
            : html`<div class="progress-bar-bg">
                <div class="progress-bar-fill" style="width: ${Math.min(100, Math.max(0, progress))}%;"></div>
              </div>`}
        <div class="rank-meta">
          <span>${isUnreal ? "Unreal leaderboard position" : `${progress}% to promotion`}</span>
          <span>${subtitle}</span>
        </div>
      </div>
    `;
  }

  // ---- session -------------------------------------------------------------

  private _renderSessionView(isPlaying: boolean, sessionAttrs: any, brRankAttrs: any) {
    const rankDelta = Number(sessionAttrs.net_rank_delta_pct || 0);
    const recentMatches: MatchRecord[] = sessionAttrs.recent_matches || [];
    const displayMatches = recentMatches.slice(0, this._config.max_feed_matches || 10);
    const signed = (n: number) => (n >= 0 ? `+${n}%` : `${n}%`);
    const unrealChange = recentMatches
      .filter((m) => m.rank_track === brRankAttrs.game_mode && typeof m.unreal_rank_change === "number")
      .reduce((sum, m) => sum + (m.unreal_rank_change || 0), 0);

    return html`
      ${this._renderKpis([
        ["Matches", sessionAttrs.matches_played || 0, "cyan"],
        ["Wins", `${sessionAttrs.wins || 0} 🏆`, "gold"],
        ["Kills", sessionAttrs.kills || 0],
        ["K/D", sessionAttrs.kd_ratio || 0],
        ["Rank Net", signed(rankDelta), rankDelta >= 0 ? "positive" : "negative"],
      ])}

      ${this._renderRank("Battle Royale Ranked", brRankAttrs,
        `${rankDelta >= 0 ? "▲" : "▼"} ${signed(rankDelta)} this session`, unrealChange || null)}

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
    const info = this._playlist(m.playlist_id);
    const art = info?.image;
    const key = `${m.timestamp}|${m.playlist_id}`;
    const expanded = this._expandedMatch === key;
    const detail = (label: string, value: any) =>
      value === undefined || value === null || value === "" ? nothing : html`<div class="detail"><span>${label}</span><b>${value}</b></div>`;

    return html`
      <div class="match-card ${m.is_victory ? "victory" : ""} ${expanded ? "expanded" : ""}"
        @click=${() => (this._expandedMatch = expanded ? null : key)}>
        <div class="match-row">
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
          <ha-icon class="chevron" icon=${expanded ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
        </div>
        ${expanded
          ? html`<div class="match-details" @click=${(e: Event) => e.stopPropagation()}>
              ${art ? html`<img class="detail-art" src=${art} alt="" @error=${hideBroken} />` : nothing}
              ${info?.description ? html`<p class="detail-desc">${info.description}</p>` : nothing}
              <div class="detail-grid">
                ${detail("Finished", this._formatWhen(m.timestamp))}
                ${detail("Placement", m.placement_text)}
                ${detail("Kills", m.kills)}
                ${detail("Wins", m.wins)}
                ${detail("Time played", m.minutes ? this._formatDuration(m.minutes) : undefined)}
                ${detail("Score", m.score ? this._num(m.score) : undefined)}
                ${detail("Players outlived", m.players_outlived ? this._num(m.players_outlived) : undefined)}
                ${detail("Rank track", m.rank_track)}
                ${detail("Rank after", m.unreal_rank ? `${m.current_rank} #${this._num(m.unreal_rank)}` : m.current_rank)}
                ${detail("Rank change", m.rank_delta_pct ? `${m.rank_delta_pct > 0 ? "+" : ""}${m.rank_delta_pct}%` : undefined)}
                ${detail("Unreal places", m.unreal_rank_change ? `${m.unreal_rank_change > 0 ? "▲" : "▼"} ${this._num(Math.abs(m.unreal_rank_change))}` : undefined)}
                ${detail("Games in poll", (m.match_count || 1) > 1 ? m.match_count : undefined)}
              </div>
              ${(m.match_count || 1) > 1
                ? html`<small class="muted">Several games finished between polls; totals are combined.</small>`
                : nothing}
            </div>`
          : nothing}
      </div>
    `;
  }

  // ---- stats ---------------------------------------------------------------

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
      favourite_mode: metrics.favourite_mode,
      modes: statsAttrs.modes || {},
    };
    const base: any = activeWindow === "lifetime" ? lifetime : windows[activeWindow];
    const modeStats = this._selectedMode !== "all" ? base.modes?.[this._selectedMode] : null;
    const shown = modeStats && modeStats.matches !== undefined ? modeStats : base;
    const hours = shown.minutes !== undefined ? Math.round((shown.minutes / 60) * 10) / 10 : base.hours_played;
    const favourite = base.favourite_mode;

    const modeTab = (id: Mode, label: string) => html`
      <button class="mode-tab ${this._selectedMode === id ? "active" : ""}" @click=${() => (this._selectedMode = id)}>${label}</button>
    `;

    return html`
      <div class="tab-rows">
        ${available.length > 1
          ? html`<div class="mode-tabs">
              ${available.map(
                (w) => html`<button class="mode-tab ${activeWindow === w ? "active" : ""}" title=${labels[w] || ""}
                  @click=${() => (this._window = w)}>${windowNames[w]}</button>`,
              )}
            </div>`
          : nothing}
        <div class="mode-tabs">
          ${modeTab("all", "Overall")} ${modeTab("zero_build", "Zero Build")} ${modeTab("build", "Build")} ${modeTab("reload", "Reload")}
        </div>
      </div>

      ${this._renderKpis([
        ["Win Rate", `${shown.win_rate || 0}%`, "cyan"],
        ["K/D", shown.kd || 0],
        ["Wins", html`${this._num(shown.wins)} 🏆`, "gold"],
        ["Matches", this._num(shown.matches)],
        ["Kills", this._num(shown.kills)],
        ["Outlived", this._num(shown.players_outlived)],
        ["Kills/Match", shown.matches ? this._num(shown.kills / shown.matches, 2) : 0],
        ...(hours !== undefined ? [["Hours", this._num(hours, 1)] as [string, any]] : []),
      ])}

      ${activeWindow === "lifetime" && this._selectedMode === "all" ? this._renderLifetimeExtras(statsAttrs) : nothing}
      ${favourite ? this._renderFavourite(favourite, activeWindow !== "lifetime" ? windowNames[activeWindow] : "") : nothing}

      ${this._renderRank("Battle Royale", brRankAttrs, `Peak: ${brRankAttrs.highest_rank || brRankAttrs.current_rank || "Unranked"}`)}
      ${this._renderRank("Reload", reloadRankAttrs, `Peak: ${reloadRankAttrs.highest_rank || reloadRankAttrs.current_rank || "Unranked"}`)}
    `;
  }

  private _renderFavourite(favourite: any, windowLabel: string) {
    const info = this._playlist(favourite.playlist_id);
    const art = info?.image;
    const category = /ropesmile|reload/i.test(favourite.playlist_id + favourite.name)
      ? "reload"
      : /nobuild|zero build/i.test(favourite.playlist_id + favourite.name)
        ? "zero_build"
        : "build";
    return html`
      <div class="feature-card ${art ? "" : `no-art art-${category}`}">
        <div class="feature-text">
          <span class="feature-label">Favourite mode${windowLabel ? ` · ${windowLabel}` : ""}</span>
          <span class="feature-value">${info?.name || favourite.name}</span>
          <span class="feature-sub">${this._num(favourite.matches)} matches</span>
        </div>
        ${art
          ? html`<img class="feature-art" src=${art} alt="" @error=${hideBroken} />`
          : html`<ha-icon class="feature-icon" icon=${MODE_ICONS[category]}></ha-icon>`}
      </div>
    `;
  }

  private _renderLifetimeExtras(statsAttrs: any) {
    const metrics = statsAttrs.metrics || {};
    const inputs = Object.values<any>(statsAttrs.inputs || {}).filter((i) => i.matches > 0);
    const sizes = statsAttrs.team_sizes || {};
    return html`
      <div class="kpi-row secondary">
        ${[
          ["Kills/Min", metrics.kills_per_minute ?? 0],
          ["Avg Match", `${metrics.avg_match_minutes ?? 0}m`],
          ["Score/Match", this._num(metrics.score_per_match)],
          ["Solo Top 10", `${metrics.solo_top10_rate ?? 0}%`],
          ["Solo Top 25", `${metrics.solo_top25_rate ?? 0}%`],
        ].map(([l, v]) => html`<div class="kpi-chip"><span class="kpi-label">${l}</span><span class="kpi-value">${v}</span></div>`)}
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

  // ---- events --------------------------------------------------------------

  private _currentFilters(): EventFilters {
    return this._filters || {
      region: this._config.events_region || this._events.defaultRegion || "EU",
      mode: "all",
      team: "all",
      platform: "all",
    };
  }

  private _matchesFilters(e: any, f: EventFilters): boolean {
    if (f.region !== "all" && e.region_group !== f.region) return false;
    if (f.mode === "Ranked" ? !e.ranked : f.mode !== "all" && e.mode !== f.mode) return false;
    if (f.team !== "all" && e.team !== f.team) return false;
    if (f.platform !== "all" && !(e.platform_groups || []).includes(f.platform)) return false;
    return true;
  }

  private _setFilter(key: keyof EventFilters, value: string): void {
    this._filters = { ...this._currentFilters(), [key]: value };
  }

  private _renderEventsView() {
    const ev = this._events;
    if (ev.loading && !ev.list) return html`<div class="empty">Loading tournaments…</div>`;
    if (ev.error) return html`<div class="empty">${ev.error}</div>`;
    if (ev.list === null) return html`<div class="empty">Tournament schedule is not available right now.</div>`;
    const all = ev.list || [];
    const f = this._currentFilters();
    const regions = [...new Set(all.map((e) => e.region_group))].sort();
    const list = all
      .filter((e) => this._matchesFilters(e, f))
      .filter((e) => e.windows.some((w: any) => this._windowState(w) !== "finished") || this._expandedEvent === e.key);

    const select = (key: keyof EventFilters, options: Array<[string, string]>) => html`
      <select class="filter-select" .value=${f[key]} @change=${(e: Event) => this._setFilter(key, (e.target as HTMLSelectElement).value)}>
        ${options.map(([value, label]) => html`<option value=${value} ?selected=${f[key] === value}>${label}</option>`)}
      </select>
    `;

    return html`
      <div class="event-filters">
        ${select("region", [["all", "All regions"], ...regions.map((r) => [r, r] as [string, string])])}
        ${select("mode", [["all", "All modes"], ["Battle Royale", "Battle Royale"], ["Zero Build", "Zero Build"], ["Reload", "Reload"], ["Ranked", "Ranked cups"]])}
        ${select("team", [["all", "Any team"], ["Solo", "Solo"], ["Duos", "Duos"], ["Trios", "Trios"], ["Squads", "Squads"]])}
        ${select("platform", [["all", "Any platform"], ["PC", "PC"], ["Console", "Console"], ["Mobile", "Mobile"]])}
      </div>
      <div class="match-feed-header">
        <span>Tournaments (${list.length})</span>
        <span class="muted">UK time · schedule only</span>
      </div>
      <div class="match-list events">
        ${list.length ? list.map((e) => this._renderEvent(e)) : html`<div class="empty">No tournaments match these filters.</div>`}
      </div>
    `;
  }

  private _eventTiming(e: any): { text: string; live: boolean; soon: boolean } {
    const live = e.windows.find((w: any) => this._windowState(w) === "live");
    if (live) {
      return { text: `Live now · ends in ${this._formatSpan(Date.parse(live.end) - this._now)}`, live: true, soon: false };
    }
    const next = e.windows.find((w: any) => this._windowState(w) === "upcoming");
    if (!next) return { text: "Finished", live: false, soon: false };
    const until = Date.parse(next.begin) - this._now;
    const soon = until < 7 * 86400_000;
    return {
      text: `${this._formatWhen(next.begin)}${next.label ? ` · ${next.label}` : ""}${soon ? ` · in ${this._formatSpan(until)}` : ""}`,
      live: false,
      soon,
    };
  }

  private _renderEvent(e: any) {
    const timing = this._eventTiming(e);
    const expanded = this._expandedEvent === e.key;
    const tags = [e.mode, e.team, e.ranked ? "Ranked" : null, ...(e.platform_groups || []), e.region].filter(Boolean);
    return html`
      <div class="event-card ${timing.live ? "live" : ""} ${expanded ? "expanded" : ""}">
        <div class="event-row" @click=${() => this._toggleEvent(e)}>
          ${e.poster ? html`<img class="event-art" src=${e.poster} alt="" loading="lazy" @error=${hideBroken} />` : nothing}
          <div class="match-left">
            <div class="match-headline">
              <span class="event-name">${e.name}</span>
              ${timing.live ? html`<span class="placement-badge win">LIVE</span>` : nothing}
            </div>
            <span class="match-mode ${timing.soon ? "soon" : ""}">${timing.text}</span>
            <div class="tag-row">${tags.map((t) => html`<span class="tag">${t}</span>`)}</div>
          </div>
          <ha-icon class="chevron" icon=${expanded ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
        </div>
        ${expanded ? this._renderEventDetails(e) : nothing}
      </div>
    `;
  }

  private _renderEventDetails(e: any) {
    const hero = e.loading_screen || e.poster;
    return html`
      <div class="event-details">
        ${hero ? html`<img class="event-hero" src=${hero} alt="" @error=${hideBroken} />` : nothing}
        ${e.subtitle && e.subtitle !== e.name ? html`<div class="detail-sub">${e.subtitle}</div>` : nothing}
        ${e.description ? html`<p class="detail-desc">${e.description}</p>` : nothing}
        ${e.schedule_info ? html`<p class="detail-desc muted">${e.schedule_info}</p>` : nothing}
        ${e.platform_groups?.length ? html`<div class="detail-line"><span>Platforms</span><b>${e.platform_groups.join(", ")}</b></div>` : nothing}
        <div class="detail-line"><span>Region</span><b>${e.region}</b></div>

        <div class="section-title">Sessions</div>
        <div class="window-list">
          ${e.windows.map((w: any) => {
            const st = this._windowState(w);
            const lbKey = `${e.event_id}|${w.window_id}`;
            const lb = this._leaderboards[lbKey];
            const until = Date.parse(w.begin) - this._now;
            return html`
              <div class="window-row ${st}">
                <div class="window-main">
                  <span class="window-label">${w.label || "Session"}</span>
                  <span class="window-time">${this._formatWhen(w.begin)} – ${this._formatWhen(w.end).split(", ").pop()}</span>
                  <span class="window-status ${st}">
                    ${st === "live" ? `Live · ${this._formatSpan(Date.parse(w.end) - this._now)} left`
                      : st === "finished" ? "Finished"
                      : until < 7 * 86400_000 ? `in ${this._formatSpan(until)}` : "Upcoming"}
                  </span>
                  ${st !== "upcoming"
                    ? html`<button class="mini-button" @click=${() => this._loadLeaderboard(e.event_id, w.window_id)}>
                        ${lb?.loading ? "Loading…" : lb?.data ? "Refresh" : "Leaderboard"}
                      </button>`
                    : nothing}
                </div>
                ${lb ? this._renderLeaderboard(lb) : nothing}
              </div>
            `;
          })}
        </div>
      </div>
    `;
  }

  private _renderLeaderboard(lb: { loading?: boolean; data?: any; error?: string }) {
    if (lb.error) return html`<div class="lb-note">${lb.error}</div>`;
    if (!lb.data) return lb.loading ? html`<div class="lb-note">Loading leaderboard…</div>` : nothing;
    const data = lb.data;
    const row = (en: any, you = false) => html`
      <div class="lb-row ${you ? "you" : ""}">
        <span class="lb-rank">#${this._num(en.rank)}</span>
        <span class="lb-names">${you ? "You · " : ""}${(en.names || []).join(", ") || "—"}</span>
        <span class="lb-points">${this._num(en.points)} pts</span>
        <span class="lb-extra">${en.matches}m · ${en.wins}W · ${en.elims}E</span>
      </div>
    `;
    return html`
      <div class="leaderboard">
        ${data.player && !data.entries.some((x: any) => x.is_player) ? row(data.player, true) : nothing}
        ${data.entries.length ? data.entries.map((en: any) => row(en, en.is_player)) : html`<div class="lb-note">No scores yet.</div>`}
        ${data.updated ? html`<div class="lb-note">Updated ${this._formatRelativeTime(data.updated)}${data.total_pages ? ` · ${data.total_pages} pages` : ""}</div>` : nothing}
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
