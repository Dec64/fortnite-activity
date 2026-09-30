import { LitElement, html, nothing, svg, PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { cardStyles } from "./styles";
import { FortniteCardConfig, MatchRecord } from "./types";
import "./editor";

const CARD_VERSION = "1.4.0";

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

const RARITY_COLORS: Record<string, string> = {
  Common: "#9CA3AF",
  Uncommon: "#22C55E",
  Rare: "#3B82F6",
  Epic: "#A855F7",
  Legendary: "#F59E0B",
  Mythic: "#FACC15",
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

type View = "session" | "stats" | "events" | "sprites";
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
  @state() private _matchLists: Record<string, { loading?: boolean; matches?: MatchRecord[]; tracked?: number; error?: string }> = {};
  @state() private _showAllMatches: Record<string, boolean> = {};
  @state() private _expandedSprite: string | null = null;
  @state() private _spriteFilter: "all" | "missing" | "unmastered" | "complete" = "all";
  @state() private _spriteSort: "dex" | "rarity" | "progress" = "dex";

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

  /**
   * HA replaces `hass` on every state change in the house; only re-render when one of
   * this card's own entities (or anything besides hass) changed.
   */
  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.size !== 1 || !changed.has("hass")) return true;
    const oldHass = changed.get("hass") as any;
    if (!oldHass || !this._entityCache.size) return true;
    for (const entityId of this._entityCache.values()) {
      if (oldHass.states[entityId] !== this.hass.states[entityId]) return true;
    }
    return false;
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
      this._leaderboards = {
        ...this._leaderboards,
        [key]: result?.leaderboard ? { data: result.leaderboard } : { error: result?.unavailable || "Leaderboard unavailable" },
      };
    } catch (err: any) {
      this._leaderboards = { ...this._leaderboards, [key]: { error: err?.message || "Leaderboard unavailable" } };
    }
  }

  /** Fetch every tracked match for a session or time window (sensor attributes only keep 10). */
  private _ensureMatches(key: string, params: Record<string, any>): void {
    if (!this.hass || this._matchLists[key]) return;
    this._matchLists = { ...this._matchLists, [key]: { loading: true } };
    this.hass
      .callWS({ type: "fortnite_activity/matches", player_id: this._player, ...params })
      .then((r: any) => {
        this._matchLists = { ...this._matchLists, [key]: { matches: r?.matches || [], tracked: r?.tracked_matches || 0 } };
      })
      .catch((err: any) => {
        this._matchLists = { ...this._matchLists, [key]: { error: err?.message || "Could not load matches" } };
      });
  }

  /** A match counts as ranked only if rank data actually moved or it is a ranked playlist. */
  private _isRanked(m: MatchRecord): boolean {
    return Boolean(m.rank_delta_pct) || Boolean(m.unreal_rank_change) || /habanero/i.test(m.playlist_id || "");
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
    const spritesSensor = this._findEntity("sensor", "sprites");
    const powerSensor = this._findEntity("sensor", "power_ranking");
    const hasSprites = !!spritesSensor && !["unavailable", "unknown"].includes(spritesSensor.state);

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
    if (view === "sprites" && !hasSprites) view = "stats";

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
        ${this._config.show_sub_buttons !== false && layout !== "events_only" ? this._renderButtons(view, isPlaying, hasSprites) : nothing}
        ${view === "session"
          ? this._renderSessionView(isPlaying, sessionAttrs, brRankAttrs)
          : view === "events"
            ? this._renderEventsView()
            : view === "sprites"
              ? this._renderSpritesView(spritesSensor)
              : this._renderStatsView(statsAttrs, profileAttrs, brRankAttrs, reloadRankAttrs, powerSensor)}
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
    // Level needs the linked Epic account. (sNN_social_bp_level in stats is not a plain level: 32179 vs 322.)
    const seasonLevel = Number(levelSensor?.state) || 0;
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

  private _renderButtons(view: View, isPlaying: boolean, hasSprites = false) {
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
        ${hasSprites && layout === "auto" ? tab("sprites", "mdi:ghost-outline", "Sprites") : nothing}
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
    if (this._config.compact) {
      // Two label/value pairs per row keeps compact mode tidy
      const rows: Array<Array<[string, any, string?]>> = [];
      for (let i = 0; i < items.length; i += 2) rows.push(items.slice(i, i + 2));
      return html`<table class="stat-table"><tbody>
        ${rows.map((row) => html`<tr>
          ${row.map(([label, value, cls]) => html`<th>${label}</th><td class="kpi-value ${cls || ""}">${value}</td>`)}
          ${row.length < 2 ? html`<th></th><td></td>` : nothing}
        </tr>`)}
      </tbody></table>`;
    }
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
    const signed = (n: number) => (n >= 0 ? `+${n}%` : `${n}%`);
    const sessionId = sessionAttrs.session_id;
    const listKey = sessionId ? `session:${sessionId}:${sessionAttrs.matches_played || 0}` : "";
    if (listKey && this._config.show_match_feed !== false) this._ensureMatches(listKey, { session_id: sessionId });
    const full = listKey ? this._matchLists[listKey]?.matches : undefined;
    const matches: MatchRecord[] = full || sessionAttrs.recent_matches || [];
    const ranked = matches.filter((m) => this._isRanked(m));
    const unrealChange = ranked
      .filter((m) => m.rank_track === brRankAttrs.game_mode && typeof m.unreal_rank_change === "number")
      .reduce((sum, m) => sum + (m.unreal_rank_change || 0), 0);

    return html`
      ${this._renderKpis([
        ["Matches", sessionAttrs.matches_played || 0, "cyan"],
        ["Wins", `${sessionAttrs.wins || 0} 🏆`, "gold"],
        ["Kills", sessionAttrs.kills || 0],
        ["K/D", sessionAttrs.kd_ratio || 0],
        ...(ranked.length ? [["Rank Net", signed(rankDelta), rankDelta >= 0 ? "positive" : "negative"] as [string, any, string]] : []),
      ])}

      ${ranked.length
        ? this._renderRank("Battle Royale Ranked", brRankAttrs,
            `${rankDelta >= 0 ? "▲" : "▼"} ${signed(rankDelta)} this session`, unrealChange || null)
        : nothing}

      ${this._config.show_match_feed !== false
        ? html`
            <div class="match-feed-header">
              <span>Match Feed (${sessionAttrs.matches_played || matches.length} ${(sessionAttrs.matches_played || matches.length) === 1 ? "match" : "matches"})</span>
              ${isPlaying ? html`<span class="tracking-live">Tracking Live</span>` : nothing}
            </div>
            ${this._renderMatchList(listKey || "session", matches,
              html`No matches recorded in this session yet.<br />
                <small>Matches appear here once Fortnite publishes the finished game's stats.</small>`)}
          `
        : nothing}
    `;
  }

  private _renderMatchList(key: string, matches: MatchRecord[], emptyText: any) {
    const limit = this._config.max_feed_matches || 10;
    const showAll = this._showAllMatches[key];
    const shown = showAll ? matches : matches.slice(0, limit);
    return html`
      <div class="match-list">
        ${shown.length ? shown.map((m) => this._renderMatch(m)) : html`<div class="empty">${emptyText}</div>`}
        ${matches.length > limit
          ? html`<button class="mini-button show-more" @click=${() => (this._showAllMatches = { ...this._showAllMatches, [key]: !showAll })}>
              ${showAll ? "Show fewer" : `Show all ${matches.length}`}
            </button>`
          : nothing}
      </div>
    `;
  }

  private _renderMatch(m: MatchRecord) {
    const info = this._playlist(m.playlist_id);
    const art = info?.image;
    const key = `${m.timestamp}|${m.playlist_id}`;
    const expanded = this._expandedMatch === key;
    const multi = (m.match_count || 1) > 1;
    const ranked = this._isRanked(m);
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
            ${m.rank_delta_pct && this._isRanked(m)
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
                ${detail("Mode", m.mode_name)}
                ${detail("Placement", m.placement_text)}
                ${detail("Kills", m.kills)}
                ${multi ? detail("Games", m.match_count) : nothing}
                ${multi && m.wins ? detail("Victories", m.wins) : nothing}
                ${detail("Time played", m.minutes ? this._formatDuration(m.minutes) : undefined)}
                ${detail("Score", m.score ? this._num(m.score) : undefined)}
                ${detail("Players outlived", m.players_outlived ? this._num(m.players_outlived) : undefined)}
                ${ranked
                  ? html`
                      ${detail("Ranked track", m.rank_track)}
                      ${detail("Rank after", m.unreal_rank ? `${m.current_rank} #${this._num(m.unreal_rank)}` : m.current_rank)}
                      ${detail("Rank change", m.rank_delta_pct ? `${m.rank_delta_pct > 0 ? "+" : ""}${m.rank_delta_pct}%` : undefined)}
                      ${detail("Unreal places", m.unreal_rank_change ? `${m.unreal_rank_change > 0 ? "▲" : "▼"} ${this._num(Math.abs(m.unreal_rank_change))}` : undefined)}`
                  : nothing}
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

  private _renderStatsView(statsAttrs: any, profileAttrs: any, brRankAttrs: any, reloadRankAttrs: any, powerSensor?: any) {
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
      ${activeWindow !== "lifetime" && base?.since ? this._renderWindowMatches(activeWindow, windowNames[activeWindow], base) : nothing}

      ${this._renderRank("Battle Royale", brRankAttrs, `Peak: ${brRankAttrs.highest_rank || brRankAttrs.current_rank || "Unranked"}`)}
      ${this._renderRank("Reload", reloadRankAttrs, `Peak: ${reloadRankAttrs.highest_rank || reloadRankAttrs.current_rank || "Unranked"}`)}
      ${powerSensor && !["unavailable", "unknown"].includes(powerSensor.state)
        ? html`<div class="rank-section power-ranking">
            <div class="rank-header">
              <span class="rank-title"><ha-icon icon="mdi:podium"></ha-icon><span>Power Ranking</span></span>
              <span class="unreal-number">#${this._num(powerSensor.state)}</span>
            </div>
            <div class="rank-meta"><span>${this._num(powerSensor.attributes?.points)} points${powerSensor.attributes?.counting_events != null ? ` · ${powerSensor.attributes.counting_events} counting events` : ""}</span>
              <span>${powerSensor.attributes?.peak_pr != null ? `Peak PR ${this._num(powerSensor.attributes.peak_pr)}` : "Competitive (tournaments)"}${powerSensor.attributes?.delta_pr ? ` · ${powerSensor.attributes.delta_pr > 0 ? "▲" : "▼"} ${this._num(Math.abs(powerSensor.attributes.delta_pr))}` : ""}</span></div>
          </div>`
        : nothing}
      ${profileAttrs.epic_link === "relink_required"
        ? html`<div class="notice">Epic sign-in expired — Sprites, level and Power Ranking are paused.
            Re-link via Settings › Devices &amp; services › Fortnite Activity › Configure.</div>`
        : nothing}
    `;
  }

  // ---- sprites -------------------------------------------------------------

  private _renderSpritesView(sensor: any) {
    const a = sensor?.attributes || {};
    const all: any[] = a.families || [];
    const pct = Number(sensor?.state || 0);
    const ownedVariants = Number(a.owned_variants || 0);
    const rarityOrder = ["Common", "Uncommon", "Rare", "Epic", "Legendary", "Mythic"];

    const filtered = all.filter((f) => {
      if (this._spriteFilter === "missing") return f.owned_variants < f.total_variants;
      if (this._spriteFilter === "unmastered") return f.variants.some((v: any) => v.owned && !v.mastered);
      if (this._spriteFilter === "complete") return f.complete;
      return true;
    });
    const sorted = [...filtered].sort((x, y) => {
      if (this._spriteSort === "rarity") return rarityOrder.indexOf(y.rarity) - rarityOrder.indexOf(x.rarity) || (x.dex ?? 0) - (y.dex ?? 0);
      if (this._spriteSort === "progress") return y.owned_variants / y.total_variants - x.owned_variants / x.total_variants || (x.dex ?? 0) - (y.dex ?? 0);
      return (x.dex ?? 0) - (y.dex ?? 0);
    });

    // Missing variants that can drop, most likely first
    const hunt = all
      .flatMap((f) => f.variants.filter((v: any) => !v.owned && v.drop_chance_pct).map((v: any) => ({ f, v })))
      .sort((x: any, y: any) => y.v.drop_chance_pct - x.v.drop_chance_pct || rarityOrder.indexOf(x.f.rarity) - rarityOrder.indexOf(y.f.rarity))
      .slice(0, 6);

    const chip = (id: typeof this._spriteFilter, label: string) => html`
      <button class="mode-tab ${this._spriteFilter === id ? "active" : ""}" @click=${() => (this._spriteFilter = id)}>${label}</button>`;
    const sortChip = (id: typeof this._spriteSort, label: string) => html`
      <button class="mode-tab ${this._spriteSort === id ? "active" : ""}" @click=${() => (this._spriteSort = id)}>${label}</button>`;

    return html`
      <div class="rank-section sprite-summary">
        <div class="sprite-ring" style="--pct:${Math.min(100, pct)}">
          <span>${Math.round(pct)}%</span>
        </div>
        <div class="sprite-summary-main">
          <div class="rank-header">
            <span class="rank-title"><span>Sprite collection</span></span>
            <span class="muted">Game update ${a.version || "?"}</span>
          </div>
          <div class="sprite-stats">
            <span><b>${ownedVariants}</b>/${a.total_variants} variants</span>
            <span><b>${a.owned_families}</b>/${a.total_families} sprites</span>
            <span><b>${a.complete_families ?? 0}</b> full sets</span>
            <span>★ <b>${a.mastered_variants || 0}</b>/${ownedVariants} mastered</span>
          </div>
          ${a.equipped ? html`<div class="rank-meta"><span>Equipped: <b>${a.equipped.variant}</b></span></div>` : nothing}
        </div>
      </div>

      ${(a.versions || []).length > 1
        ? html`<div class="split-section">
            <div class="section-title">By game update${a.cumulative ? html` · all-time ${a.cumulative.owned_variants}/${a.cumulative.total_variants}` : nothing}</div>
            ${a.versions.map((v: any) => html`
              <div class="version-row ${v.current ? "current" : ""}">
                <span>${v.version}${v.current ? " (now)" : ""}</span>
                <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${Math.min(100, v.completion_pct)}%"></div></div>
                <span>${v.owned_variants}/${v.total_variants}</span>
              </div>`)}
          </div>`
        : nothing}

      ${hunt.length
        ? html`<div class="split-section">
            <div class="section-title">Next to hunt (highest drop chance)</div>
            <div class="hunt-row">
              ${hunt.map(({ f, v }: any) => html`
                <div class="hunt-item" style="--rarity:${RARITY_COLORS[f.rarity] || "#9CA3AF"}" title="${v.name}" @click=${() => (this._expandedSprite = f.id)}>
                  ${v.icon ? html`<img src=${v.icon} alt="" loading="lazy" @error=${hideBroken} />` : nothing}
                  <span>${v.label === "Base" ? f.name.replace(/ Sprite$/, "") : `${v.label}`}</span>
                  <small>${v.drop_chance_pct}%</small>
                </div>`)}
            </div>
          </div>`
        : nothing}

      <div class="tab-rows">
        <div class="mode-tabs">${chip("all", "All")} ${chip("missing", "Missing")} ${chip("unmastered", "To master")} ${chip("complete", "Full sets")}</div>
        <div class="mode-tabs">${sortChip("dex", "Dex")} ${sortChip("rarity", "Rarity")} ${sortChip("progress", "Progress")}</div>
      </div>

      <div class="sprite-grid">
        ${sorted.length
          ? sorted.map((f) => {
              const open = this._expandedSprite === f.id;
              return html`
                <div class="sprite-card ${f.owned ? "" : "missing"} ${open ? "open" : ""} ${f.complete ? "complete" : ""}"
                  style="--rarity:${RARITY_COLORS[f.rarity] || "#9CA3AF"}" @click=${() => (this._expandedSprite = open ? null : f.id)}>
                  ${f.icon ? html`<img src=${f.icon} alt="" loading="lazy" @error=${hideBroken} />` : html`<ha-icon icon="mdi:ghost-outline"></ha-icon>`}
                  <span class="sprite-name">${f.name.replace(/ Sprite$/, "")}</span>
                  <span class="sprite-count">${f.owned_variants}/${f.total_variants}${f.mastered ? html` · ★${f.mastered}` : nothing}</span>
                  <span class="sprite-dots">
                    ${(f.variants || []).map((v: any) => html`<i class="dot ${v.owned ? "owned" : ""} ${v.mastered ? "mastered" : ""}" title=${v.label}></i>`)}
                  </span>
                </div>
                ${open ? this._renderSpriteDetail(f) : nothing}`;
            })
          : html`<div class="empty">Nothing matches this filter.</div>`}
      </div>
    `;
  }

  private _renderSpriteDetail(f: any) {
    return html`
      <div class="sprite-detail" style="--rarity:${RARITY_COLORS[f.rarity] || "#9CA3AF"}">
        <div class="sprite-detail-head">
          ${f.icon_large || f.icon ? html`<img src=${f.icon_large || f.icon} alt="" @error=${hideBroken} />` : nothing}
          <div>
            <b>${f.name}</b> <span class="tag rarity-tag">${f.rarity || ""}</span>
            ${f.description ? html`<p class="detail-desc">${f.description}</p>` : nothing}
            ${f.hint ? html`<p class="detail-desc hint">📍 ${f.hint}</p>` : nothing}
            ${f.boons?.length
              ? html`<div class="boon-list">${f.boons.map((b: any) => html`<span class="tag" title=${b.description || ""}>${b.name}${b.chance != null ? ` · ${b.chance}%` : ""}</span>`)}</div>`
              : nothing}
          </div>
        </div>
        <div class="variant-tiles">
          ${(f.variants || []).map((v: any) => html`
            <div class="variant-tile ${v.owned ? "" : "missing"} ${v.mastered ? "mastered" : ""}" title=${v.name}>
              ${v.icon ? html`<img src=${v.icon} alt="" loading="lazy" @error=${hideBroken} />` : nothing}
              <span class="variant-name">${v.label}</span>
              <span class="variant-status">
                ${v.owned
                  ? html`${v.mastered ? "★ Mastered" : v.xp ? `${this._num(v.xp)} XP` : "Owned"}${v.count > 1 ? ` · ×${v.count}` : ""}`
                  : v.drop_chance_pct != null ? `Missing · ${v.drop_chance_pct}%` : "Missing · special"}
              </span>
            </div>`)}
        </div>
      </div>
    `;
  }

  private _renderWindowMatches(windowKey: string, windowName: string, windowStats: any) {
    // Refetch when the API total for the window changes (new games played)
    const key = `window:${windowKey}:${windowStats.since}:${windowStats.matches}`;
    this._ensureMatches(key, { since: windowStats.since });
    const list = this._matchLists[key];
    const matches = list?.matches || [];
    const tracked = list?.tracked ?? 0;
    const total = windowStats.matches || 0;
    return html`
      <div class="match-feed-header">
        <span>${windowName} matches (${tracked}${total > tracked ? ` of ${total}` : ""})</span>
        ${total > tracked ? html`<span class="muted" title="Only games the tracker saw finish are listed; the stats API has no per-match history">tracked only</span>` : nothing}
      </div>
      ${list?.loading
        ? html`<div class="empty">Loading matches…</div>`
        : this._renderMatchList(key, matches, html`No tracked matches in this window.<br />
            <small>Games are recorded while a session is being tracked.</small>`)}
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
    const inputs = Object.values<any>(statsAttrs.inputs || {}).filter((i) => i.share_pct >= 1);
    const sizes = statsAttrs.team_sizes || {};
    return html`
      <div class="secondary">
        ${this._renderKpis([
          ["Kills/Min", metrics.kills_per_minute ?? 0],
          ["Avg Match", `${metrics.avg_match_minutes ?? 0}m`],
          ["Score/Match", this._num(metrics.score_per_match)],
          ["Solo Top 10", `${metrics.solo_top10_rate ?? 0}%`],
          ["Solo Top 25", `${metrics.solo_top25_rate ?? 0}%`],
        ])}
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

  private _defaultFilters(): EventFilters {
    return {
      region: this._config.events_region || this._events.defaultRegion || "EU",
      mode: "all",
      team: "all",
      platform: "all",
    };
  }

  private _currentFilters(): EventFilters {
    return this._filters || this._defaultFilters();
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
        ${select("mode", [["all", "Mode"], ["Battle Royale", "Battle Royale"], ["Zero Build", "Zero Build"], ["Reload", "Reload"], ["Ranked", "Ranked cups"]])}
        ${select("team", [["all", "Team"], ["Solo", "Solo"], ["Duos", "Duos"], ["Trios", "Trios"], ["Squads", "Squads"]])}
        ${select("platform", [["all", "Platform"], ["PC", "PC"], ["Console", "Console"], ["Mobile", "Mobile"]])}
        ${this._filters && JSON.stringify(this._filters) !== JSON.stringify({ ...this._filters, ...this._defaultFilters() })
          ? html`<button class="filter-reset" @click=${() => (this._filters = null)} title="Clear all filters">
              <ha-icon icon="mdi:filter-remove-outline"></ha-icon><span>Reset</span>
            </button>`
          : nothing}
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
