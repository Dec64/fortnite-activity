import { LitElement, html, nothing, svg, PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { cardStyles } from "./styles";
import { FortniteCardConfig, MatchRecord } from "./types";
import "./editor";

const CARD_VERSION = "1.11.0";

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

const CURRENCY_LABELS: Record<string, string> = {
  AthenaBattleStar: "Battle Star",
  AthenaCategoryStar: "Character Star",
  MtxCurrency: "V-Bucks",
};

const currencyLabel = (code?: string, n?: number) => {
  const label = (code && CURRENCY_LABELS[code]) || code || "";
  return n === 1 || !label ? label : `${label}s`;
};

const TOURNAMENT_TYPES: Record<string, string> = {
  FNCS: "FNCS",
  CashCup: "Cash Cup",
  RankedCup: "Ranked Cup",
  VictoryCup: "Victory Cup",
  ShopCup: "Shop Cup",
  WorkshopCup: "Test event",
};

// Trend metrics: entity key, label, formatter, whether lower values are better
const TREND_METRICS: Array<{ key: string; label: string; unit?: string; lowerBetter?: boolean; digits?: number }> = [
  { key: "season_kd", label: "Season K/D", digits: 2 },
  { key: "season_win_rate", label: "Season win rate", unit: "%", digits: 1 },
  { key: "ladder_battle_royale", label: "BR ranked ladder (division × 100 + progress)" },
  { key: "unreal_reload", label: "Reload Unreal position", lowerBetter: true },
  { key: "unreal_battle_royale", label: "BR Unreal position", lowerBetter: true },
  { key: "ladder_reload", label: "Reload ranked ladder" },
  { key: "sprites", label: "Sprite collection", unit: "%", digits: 1 },
  { key: "level", label: "Season level" },
  { key: "power_ranking", label: "Power Ranking position", lowerBetter: true },
];

const MODE_ICONS: Record<string, string> = {
  reload: "mdi:reload",
  zero_build: "mdi:shield-outline",
  build: "mdi:wall",
};

const DEFAULTS: Partial<FortniteCardConfig> = {
  player: "player1",
  header: "full",
  card_style: "bubble",
  theme_accent: "auto",
  show_match_feed: true,
  show_sub_buttons: true,
  show_platforms: true,
  show_tournaments: true,
  compact: false,
  max_feed_matches: 10,
};

type View = "session" | "stats" | "events" | "sprites" | "trends" | "pass" | "locker";
const ALL_SECTIONS: View[] = ["session", "stats", "events", "sprites", "trends", "pass", "locker"];

// Readable labels for Battle Pass reward item types (the provider's type field)
const REWARD_TYPES: Record<string, string> = {
  AthenaPickaxe: "Pickaxe",
  AthenaGlider: "Glider",
  AthenaDance: "Emote",
  AthenaItemWrap: "Wrap",
  AthenaLoadingScreen: "Loading Screen",
  CosmeticVariantToken: "Style",
  Currency: "Currency",
  HomebaseBannerIcon: "Banner",
  SparksSong: "Jam Track",
  SparksGuitar: "Instrument",
  AthenaSkyDiveContrail: "Contrail",
  CosmeticShoes: "Kicks",
  AthenaBackpack: "Back Bling",
  AthenaCharacter: "Outfit",
  AthenaMusicPack: "Lobby Music",
};

const rewardIconFile = (r: any) => String(r?.icon || "").split("/").pop() || "";
const isVbucks = (r: any) => r?.type === "Currency" && (/MTX/i.test(rewardIconFile(r)) || /v-?bucks/i.test(r?.name || ""));
const isOutfit = (r: any) => r?.type === "AthenaCharacter" || /^T_Soldier_/i.test(rewardIconFile(r));
const rewardTypeLabel = (r: any): string => {
  if (isOutfit(r)) return "Outfit";
  if (isVbucks(r)) return "V-Bucks";
  const file = rewardIconFile(r);
  if (r?.type === "AthenaDance" && /Spray/i.test(file)) return "Spray";
  if (r?.type === "AthenaDance" && /Emoji|Emoticon/i.test(file)) return "Emoticon";
  return REWARD_TYPES[r?.type] || "Cosmetic";
};
// Names that are internal asset codes (e.g. Pickaxe_BlockStack) are replaced by the type label
const rewardDisplayName = (r: any): string =>
  r?.name && !/^[A-Za-z]+_[A-Za-z0-9_]+$/.test(r.name) ? r.name : rewardTypeLabel(r);

interface PassSet {
  key: string;
  unlocked: number;
  known: number;
  title: string;
  outfit: any | null;
  hero: string | null;
  pages: Array<{ label: string; bonus: boolean; rewards: any[]; done: boolean }>;
  rewardCount: number;
  baseCost: Record<string, number>;
  bonusCost: Record<string, number>;
  vbucks: number;
  types: Array<[string, number]>;
}
type StatWindow = "lifetime" | "season" | "week" | "today";
type Mode = "all" | "build" | "zero_build" | "reload";
interface EventFilters {
  region: string;
  type: string;
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
  @state() private _view: View | null = null; // null = default section
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
  @state() private _spriteFilter: "all" | "missing" | "unmastered" | "mastered" = "all";
  @state() private _spriteSort: "dex" | "rarity" | "progress" = "dex";
  @state() private _trends: { loading?: boolean; stats?: Record<string, any[]>; at?: number; error?: string; period?: string } = {};
  @state() private _pass: { loading?: boolean; data?: any; error?: string } = {};
  @state() private _passSet = 0;
  @state() private _passPage = 0;
  @state() private _outfits: { loading?: boolean; data?: any; error?: string } = {};
  @state() private _outfitQuery = "";
  @state() private _outfitSort: "rarity" | "name" = "rarity";
  @state() private _outfitPage = 0;
  @state() private _selectedOutfit: string | null = null;
  private _renderedView: View | null = null;

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

  /**
   * Sections this card shows, in tab order. `sections` wins; otherwise derived from the
   * older `layout` / `show_tournaments` options so existing cards keep working.
   */
  private get _sections(): View[] {
    const c = this._config;
    if (Array.isArray(c.sections) && c.sections.length) {
      const picked = c.sections.filter((s): s is View => (ALL_SECTIONS as string[]).includes(s));
      if (picked.length) return [...new Set(picked)];
    }
    switch (c.layout) {
      case "session_only":
        return ["session"];
      case "career_only":
        return ["stats"];
      case "events_only":
        return ["events"];
      default:
        return ALL_SECTIONS.filter((s) => s !== "events" || c.show_tournaments !== false);
    }
  }

  private get _eventsEnabled(): boolean {
    return this._sections.includes("events");
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
    // A section can open without a tab click (default section / single-section card)
    if (this._renderedView === "pass") this._loadPass();
    if (this._renderedView === "locker") this._loadOutfits();
    if (this._renderedView === "trends") this._loadTrends();
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

  private async _loadOutfits(): Promise<void> {
    if (!this.hass || this._outfits.loading || this._outfits.error || this._outfits.data !== undefined) return;
    this._outfits = { loading: true };
    try {
      this._outfits = { data: await this.hass.callWS({ type: "fortnite_activity/outfits", player_id: this._player }) };
    } catch (err: any) {
      this._outfits = { error: err?.message || "Locker unavailable" };
    }
  }

  private async _loadPass(): Promise<void> {
    if (!this.hass || this._pass.loading || this._pass.error || this._pass.data !== undefined) return;
    this._pass = { loading: true };
    try {
      const r = await this.hass.callWS({ type: "fortnite_activity/battlepass", player_id: this._player });
      this._pass = { data: r?.battlepass ?? null };
    } catch (err: any) {
      this._pass = { error: err?.message || "Battle Pass unavailable" };
    }
  }

  /** Long-term statistics for the trend sensors (fetched when the Trends tab opens, cached 10 min). */
  private async _loadTrends(): Promise<void> {
    if (!this.hass || this._trends.loading || (this._trends.at && Date.now() - this._trends.at < 600_000)) return;
    const ids = TREND_METRICS.map((m) => this._entityId("sensor", m.key)).filter(Boolean) as string[];
    this._ensureMatches("trend:recent", { limit: 30 });
    if (!ids.length) {
      this._trends = { stats: {}, at: Date.now() };
      return;
    }
    this._trends = { ...this._trends, loading: true };
    const fetchStats = (days: number, period: string) =>
      this.hass.callWS({
        type: "recorder/statistics_during_period",
        start_time: new Date(Date.now() - days * 86400_000).toISOString(),
        statistic_ids: ids,
        period,
        types: ["mean", "min", "max", "state"],
      });
    try {
      let stats = await fetchStats(30, "day");
      let period = "day";
      // New sensors have few daily rows at first: fall back to hourly for the last week
      if (Object.values<any>(stats || {}).every((rows) => (rows || []).length < 3)) {
        stats = await fetchStats(7, "hour");
        period = "hour";
      }
      this._trends = { stats: stats || {}, at: Date.now(), period };
    } catch (err: any) {
      this._trends = { error: err?.message || "Statistics unavailable", at: Date.now() };
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
    if (view === "trends") this._loadTrends();
    if (view === "pass") this._loadPass();
    if (view === "locker") this._loadOutfits();
  }

  private _entityId(domain: string, key: string): string | undefined {
    return this._findEntity(domain, key)?.entity_id;
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

    // Sprites need the linked Epic account; drop the tab when there is no data
    const hasOutfits = !!profileSensor?.attributes?.outfits?.owned_count;
    const sections = this._sections.filter(
      (s) => this._sections.length === 1 || (s !== "sprites" || hasSprites) && (s !== "locker" || hasOutfits),
    );
    const preferred = this._config.default_section;
    const autoView: View = isPlaying && sections.includes("session") ? "session" : sections.includes("stats") ? "stats" : sections[0];
    let view: View = this._view ?? (preferred && preferred !== "auto" && sections.includes(preferred as View) ? (preferred as View) : autoView);
    if (!sections.includes(view)) view = autoView;
    this._renderedView = view;
    const headerMode = this._config.header || "full";

    let style = "";
    const accents: Record<string, string> = { victory_gold: "#FFD700", slurp_cyan: "#00E5FF", storm_purple: "#A855F7" };
    if (accents[this._config.theme_accent || ""]) style += `--accent: ${accents[this._config.theme_accent!]};`;
    if (this._config.custom_background) {
      style += ` --card-bg: url('${this._config.custom_background}') center/cover no-repeat;`;
    }
    const classes = `theme-${this._config.card_style || "bubble"}${this._config.compact ? " compact" : ""}`;

    return html`
      <ha-card class=${classes} style="${style}">
        ${headerMode === "none"
          ? nothing
          : headerMode === "slim"
            ? this._renderSlimHeader(player, isPlaying, sessionAttrs, profileAttrs)
            : this._renderHeader(player, isPlaying, sessionAttrs, statsAttrs, profileAttrs, levelSensor, brRankAttrs, reloadRankAttrs)}
        ${this._renderButtons(view, isPlaying, sections)}
        ${view === "session"
          ? this._renderSessionView(isPlaying, sessionAttrs, brRankAttrs)
          : view === "events"
            ? this._renderEventsView()
            : view === "sprites"
              ? this._renderSpritesView(spritesSensor)
              : view === "trends"
                ? this._renderTrendsView()
                : view === "pass"
                  ? this._renderPassView(levelSensor)
                  : view === "locker"
                    ? this._renderLockerView(profileAttrs)
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
    const avatarImg = this._avatarImage(profileAttrs);
    const badgeSize = this._config.compact ? 20 : 24;
    const vbucks = this._findEntity("sensor", "vbucks");
    // V-Bucks come from Epic's common_core profile (read-only), current platform + Shared
    const showVbucks = !this._config.hide_vbucks && vbucks && !isNaN(Number(vbucks.state));
    const crew = vbucks?.attributes?.crew;

    return html`
      <div class="fa-header">
        <div class="player-avatar ${avatarImg ? "has-image" : ""}">
          ${avatarImg ? html`<img src=${avatarImg} alt=${this._avatarName(profileAttrs)} @error=${hideBroken} />` : player.slice(0, 2).toUpperCase()}
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
            ${showVbucks
              ? html`<span class="vbucks-chip" title=${Object.entries(vbucks.attributes?.by_kind || {}).map(([k, v]) => `${k}: ${this._num(v)}`).join(" · ") || "V-Bucks"}>Ⓥ ${this._num(vbucks.state)}</span>`
              : nothing}
            ${crew?.active && !this._config.hide_vbucks
              ? html`<span class="crew-chip" title="Fortnite Crew${crew.end_date ? ` · renews ${this._formatWhen(crew.end_date)}` : ""}">Crew</span>`
              : nothing}
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

  /** A skin name set on the card wins; otherwise the owned outfit chosen as avatar in the Locker. */
  private _avatarImage(profileAttrs: any): string | undefined {
    if ((this._config.avatar || "").trim()) return this._avatar?.icon;
    return profileAttrs?.outfits?.avatar?.icon || undefined;
  }

  private _avatarName(profileAttrs: any): string {
    if ((this._config.avatar || "").trim()) return this._avatar?.name || "";
    return profileAttrs?.outfits?.avatar?.name || "";
  }

  private async _setAvatar(outfitId: string | null): Promise<void> {
    this._loadingAction = "set_avatar";
    try {
      await this.hass.callService("fortnite_activity", "set_avatar", { player_id: this._player, outfit_id: outfitId || "" });
      this._outfits = { data: { ...(this._outfits.data || {}), avatar_id: outfitId } };
    } catch (err) {
      console.error("Error setting Fortnite avatar:", err);
    } finally {
      this._loadingAction = null;
      this._selectedOutfit = null;
    }
  }

  /** One-line header for single-section cards: avatar, name, V-Bucks, live state. */
  private _renderSlimHeader(player: string, isPlaying: boolean, sessionAttrs: any, profileAttrs: any) {
    const displayName = profileAttrs.display_name || player.charAt(0).toUpperCase() + player.slice(1);
    const avatarImg = this._avatarImage(profileAttrs);
    const vbucks = this._findEntity("sensor", "vbucks");
    const showVbucks = !this._config.hide_vbucks && vbucks && !isNaN(Number(vbucks.state));
    return html`
      <div class="fa-header slim">
        <div class="player-avatar ${avatarImg ? "has-image" : ""}">
          ${avatarImg ? html`<img src=${avatarImg} alt="" @error=${hideBroken} />` : player.slice(0, 2).toUpperCase()}
        </div>
        <div class="player-info">
          <div class="name-row">
            <h2>${displayName}</h2>
            ${showVbucks ? html`<span class="vbucks-chip">Ⓥ ${this._num(vbucks.state)}</span>` : nothing}
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

  private _renderButtons(view: View, isPlaying: boolean, sections: View[]) {
    const showTabs = sections.length > 1;
    // Legacy events_only cards never showed the session/refresh actions
    const legacyEventsOnly = !this._config.sections?.length && this._config.layout === "events_only";
    const showActions = this._config.show_sub_buttons !== false && !legacyEventsOnly;
    if (!showTabs && !showActions) return nothing;
    const liveCount = this._eventsEnabled ? this._liveEventCount() : 0;
    const tabDefs: Record<View, [string, string, number?]> = {
      session: ["mdi:lightning-bolt", isPlaying ? "Live Session" : "Last Session"],
      stats: ["mdi:trophy-outline", "Stats"],
      events: ["mdi:tournament", "Events", liveCount],
      sprites: ["mdi:ghost-outline", "Sprites"],
      trends: ["mdi:chart-line", "Trends"],
      pass: ["mdi:ticket-confirmation-outline", "Pass"],
      locker: ["mdi:hanger", "Locker"],
    };
    const tab = (id: View, icon: string, label: string, badge = 0) => html`
      <button class="bubble-sub-button ${view === id ? "active" : ""}" @click=${() => this._setView(id)} title=${label}>
        <ha-icon icon=${icon}></ha-icon><span class="btn-label">${label}</span>
        ${badge > 0 ? html`<span class="notify-badge" title="${badge} live">${badge}</span>` : nothing}
      </button>
    `;
    return html`
      <div class="sub-button-row">
        ${showTabs ? sections.map((s) => tab(s, tabDefs[s][0], tabDefs[s][1], tabDefs[s][2] || 0)) : nothing}
        ${!showActions ? nothing : isPlaying
          ? html`<button class="bubble-sub-button" title="End Session" @click=${() => this._callService("end_session")} ?disabled=${this._loadingAction === "end_session"}>
              <ha-icon icon="mdi:stop-circle-outline"></ha-icon>
              <span class="btn-label">${this._loadingAction === "end_session" ? "Stopping..." : "End Session"}</span>
            </button>`
          : html`<button class="bubble-sub-button" title="Start Session" @click=${() => this._callService("start_session")} ?disabled=${this._loadingAction === "start_session"}>
              <ha-icon icon="mdi:play-circle-outline"></ha-icon>
              <span class="btn-label">${this._loadingAction === "start_session" ? "Starting..." : "Start Session"}</span>
            </button>`}
        ${showActions
          ? html`<button class="bubble-sub-button" title="Refresh" @click=${() => this._callService("refresh_player")} ?disabled=${this._loadingAction === "refresh_player"}>
              <ha-icon icon=${this._loadingAction === "refresh_player" ? "mdi:loading" : "mdi:refresh"} class=${this._loadingAction === "refresh_player" ? "spin" : ""}></ha-icon>
              <span class="btn-label">${this._loadingAction === "refresh_player" ? "Refreshing..." : "Refresh"}</span>
            </button>`
          : nothing}
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
      ${this._renderOtherTracks(brRankAttrs)}
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

  private _renderOtherTracks(brRankAttrs: any) {
    const tracks = (brRankAttrs.all_tracks || []).filter(
      (t: any) => !["Battle Royale", "Reload Build"].includes(t.game_mode) && t.current_rank && t.current_rank !== "Unranked",
    );
    if (!tracks.length) return nothing;
    return html`<div class="split-section">
      <div class="section-title">Other ranked tracks</div>
      ${tracks.map((t: any) => html`
        <div class="track-row">
          ${this._rankBadge(t.current_rank, 22)}
          <span class="variant-name">${t.game_mode}</span>
          <span style="color:${(RANK_COLORS[Object.keys(RANK_COLORS).find((x) => t.current_rank.startsWith(x)) || ""] || ["inherit"])[0]}">${t.current_rank}${t.unreal_rank ? ` #${this._num(t.unreal_rank)}` : ""}</span>
          <span class="muted">${t.current_rank.startsWith("Unreal") ? "" : `${t.progress_pct}%`}</span>
        </div>`)}
    </div>`;
  }

  // ---- trends --------------------------------------------------------------

  private _lineChart(rows: Array<{ t: number; v: number }>, fmt: (v: number) => string, period: string) {
    const W = 320, H = 90, P = 6;
    const vs = rows.map((r) => r.v);
    const min = Math.min(...vs), max = Math.max(...vs);
    const span = max - min || Math.abs(max) || 1;
    const t0 = rows[0].t, t1 = rows[rows.length - 1].t || t0 + 1;
    const x = (t: number) => P + ((t - t0) / (t1 - t0 || 1)) * (W - 2 * P);
    const y = (v: number) => H - P - ((v - min) / span) * (H - 2 * P);
    const d = rows.map((r, i) => `${i ? "L" : "M"}${x(r.t).toFixed(1)},${y(r.v).toFixed(1)}`).join(" ");
    const when = (t: number) => new Date(t).toLocaleString("en-GB", period === "hour" ? { day: "numeric", month: "short", hour: "numeric", hour12: true } : { day: "numeric", month: "short" });
    return html`<svg class="trend-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img">
      ${svg`<line x1="${P}" x2="${W - P}" y1="${H - P}" y2="${H - P}" class="trend-base"></line>
        <path d="${d}" class="trend-line"></path>
        ${rows.map((r) => svg`<g class="trend-pt"><circle cx="${x(r.t)}" cy="${y(r.v)}" r="7" class="trend-hit"></circle><circle cx="${x(r.t)}" cy="${y(r.v)}" r="2.5" class="trend-dot"></circle><title>${when(r.t)}: ${fmt(r.v)}</title></g>`)}`}
    </svg>`;
  }

  private _renderKillsChart() {
    const list = this._matchLists["trend:recent"];
    const matches = [...(list?.matches || [])].reverse();
    if (!matches.length) return html`<div class="empty">No tracked games yet — they appear after a tracked session.</div>`;
    const W = 320, H = 100, P = 4;
    const maxK = Math.max(4, ...matches.map((m) => m.kills || 0));
    const bw = (W - 2 * P) / matches.length;
    return html`<svg class="trend-svg" viewBox="0 0 ${W} ${H + 12}" preserveAspectRatio="none" role="img">
      ${svg`${matches.map((m, i) => {
        const h = Math.max(2, ((m.kills || 0) / maxK) * (H - 14));
        const x = P + i * bw + 1;
        return svg`<g><rect x="${x}" y="${H - h}" width="${Math.max(2, bw - 2)}" height="${h}" rx="2" class="kill-bar"></rect>
          ${m.is_victory ? svg`<text x="${x + (bw - 2) / 2}" y="${H - h - 3}" text-anchor="middle" class="win-mark">★</text>` : nothing}
          <rect x="${x - 1}" y="0" width="${bw}" height="${H}" fill="transparent"><title>${this._formatWhen(m.timestamp)} · ${m.mode_name}: ${m.kills} kills · ${m.placement_text}</title></rect></g>`;
      })}
      <line x1="${P}" x2="${W - P}" y1="${H}" y2="${H}" class="trend-base"></line>`}
    </svg>
    <div class="rank-meta"><span>Oldest → newest · ★ = Victory Royale</span><span>Max ${maxK} kills</span></div>`;
  }

  private _renderTrendsView() {
    const tr = this._trends;
    const cards = TREND_METRICS.map((m) => {
      const id = this._entityId("sensor", m.key);
      if (!id) return nothing;
      const rows = ((tr.stats || {})[id] || [])
        .map((r: any) => ({ t: typeof r.start === "number" ? r.start : Date.parse(r.start), v: r.mean ?? r.state ?? r.max }))
        .filter((r: any) => typeof r.v === "number");
      const current = this.hass.states[id];
      if (!rows.length && (!current || ["unavailable", "unknown"].includes(current.state))) return nothing;
      const fmt = (v: number) => `${this._num(v, m.digits || 0)}${m.unit || ""}`;
      const first = rows[0]?.v, last = rows[rows.length - 1]?.v;
      const change = rows.length > 1 ? last - first : null;
      const good = change == null || change === 0 ? "" : (change > 0) !== !!m.lowerBetter ? "positive" : "negative";
      return html`<div class="trend-card">
        <div class="rank-header">
          <span class="rank-title"><span>${m.label}</span></span>
          <span class="kpi-value ${good}">${current && !isNaN(Number(current.state)) ? fmt(Number(current.state)) : "—"}</span>
        </div>
        ${rows.length > 1
          ? this._lineChart(rows, fmt, tr.period || "day")
          : html`<div class="collecting">Play a few more days to see this chart.</div>`}
        <div class="rank-meta">
          <span>${rows.length > 1 ? `${change! >= 0 ? "▲" : "▼"} ${fmt(Math.abs(change!))} over ${rows.length} ${tr.period === "hour" ? "hours" : "days"}` : ""}</span>
          <span>${m.lowerBetter ? "lower is better" : ""}</span>
        </div>
      </div>`;
    });
    return html`
      <div class="section-title">Kills per tracked game (last 30)</div>
      ${this._renderKillsChart()}
      ${tr.loading && !tr.stats ? html`<div class="empty">Loading history…</div>` : nothing}
      ${tr.error ? html`<div class="empty">${tr.error}</div>` : nothing}
      <div class="trend-grid">${cards}</div>
    `;
  }

  // ---- battle pass -----------------------------------------------------------

  /** Group the flat page list into one set per character track (bonus track pages folded in). */
  private _passSets(bp: any): PassSet[] {
    const order: string[] = [];
    const byKey = new Map<string, any[]>();
    for (const pg of bp.pages || []) {
      const key = String(pg.track || "").replace(/Bonus$/, "") || "Pass";
      if (!byKey.has(key)) {
        byKey.set(key, []);
        order.push(key);
      }
      byKey.get(key)!.push(pg);
    }
    return order.map((key, i) => {
      const pgs = byKey.get(key)!;
      const rewards = pgs.flatMap((p) => p.rewards || []);
      const outfit = rewards.find(isOutfit) || null;
      const hero = outfit?.icon || rewards.find((r) => r.icon && !isVbucks(r) && r.type !== "HomebaseBannerIcon")?.icon || null;
      const baseCost: Record<string, number> = {};
      const bonusCost: Record<string, number> = {};
      const typeCounts = new Map<string, number>();
      let vbucks = 0;
      for (const p of pgs) {
        const bonus = /Bonus$/.test(p.track || "");
        for (const r of p.rewards || []) {
          if (typeof r.cost === "number" && r.cost > 0 && r.price_row !== "Included") {
            const bucket = bonus ? bonusCost : baseCost;
            bucket[r.currency || ""] = (bucket[r.currency || ""] || 0) + r.cost;
          }
          if (isVbucks(r)) vbucks += Number(r.quantity) || 0;
          const label = rewardTypeLabel(r);
          // V-Bucks are summed separately (shown as an amount, not a count)
          if (label !== "V-Bucks") typeCounts.set(label, (typeCounts.get(label) || 0) + 1);
        }
      }
      const known = rewards.filter((r) => r.owned === true || r.owned === false);
      return {
        key,
        unlocked: known.filter((r) => r.owned === true).length,
        known: known.length,
        title: outfit?.name && !/^[A-Za-z]+_[A-Za-z0-9_]+$/.test(outfit.name) ? outfit.name : `Set ${i + 1}`,
        outfit,
        hero,
        pages: pgs.map((p) => {
          const bonus = /Bonus$/.test(p.track || "");
          const rw = p.rewards || [];
          const kn = rw.filter((r: any) => r.owned === true || r.owned === false);
          const done = kn.length > 0 && kn.length === rw.filter((r: any) => r.type !== "Currency").length && kn.every((r: any) => r.owned);
          return { label: `${bonus ? "Bonus" : "Page"} ${p.page}`, bonus, rewards: rw, done };
        }),
        rewardCount: rewards.length,
        baseCost,
        bonusCost,
        vbucks,
        types: [...typeCounts.entries()].sort((a, b) => b[1] - a[1]),
      };
    });
  }

  private _costText(costs: Record<string, number>): string {
    return Object.entries(costs)
      .map(([cur, n]) => `${this._num(n)} ${currencyLabel(cur, n)}`)
      .join(" + ");
  }

  private _passCostBadge(r: any) {
    if (r.price_row === "Included" || r.cost === 0) return html`<span class="bp-cost included" title="Included with the pass">Included</span>`;
    if (typeof r.cost !== "number") return nothing;
    const character = r.currency === "AthenaCategoryStar";
    return html`<span class="bp-cost ${character ? "character" : ""}" title="${r.cost} ${currencyLabel(r.currency, r.cost)}">
      <ha-icon icon=${character ? "mdi:account-star" : "mdi:star"}></ha-icon>${r.cost}</span>`;
  }

  private _goPassSet(index: number, total: number): void {
    this._passSet = (index + total) % total;
    this._passPage = 0;
  }

  private _renderPassView(levelSensor: any) {
    const p = this._pass;
    if (p.loading || (p.data === undefined && !p.error)) return html`<div class="empty">Loading Battle Pass…</div>`;
    if (p.error) return html`<div class="empty">${p.error}</div>`;
    if (!p.data || !p.data.pages?.length) return html`<div class="empty">The Battle Pass will show here soon.</div>`;
    const bp = p.data;
    const sets = this._passSets(bp);
    const idx = Math.min(this._passSet, sets.length - 1);
    const set = sets[idx];
    const pageIdx = Math.min(this._passPage, set.pages.length - 1);
    const page = set.pages[pageIdx];
    const season = this._findEntity("sensor", "profile")?.attributes?.season || this._catalog.season;
    const level = Number(levelSensor?.state) || null;
    const totalVbucks = sets.reduce((n, s) => n + s.vbucks, 0);
    const outfits = sets.filter((s) => s.outfit).length;
    const totalBase: Record<string, number> = {};
    for (const s of sets) for (const [c, n] of Object.entries(s.baseCost)) totalBase[c] = (totalBase[c] || 0) + n;
    const plural = (t: string, n: number) => (n > 1 && !/s$/.test(t) ? `${t}s` : t);

    return html`
      <div class="bp">
        <div class="bp-summary">
          <div class="bp-summary-title">
            <ha-icon icon="mdi:ticket-confirmation-outline"></ha-icon>
            <span>Season ${bp.season} Battle Pass</span>
            ${season?.days_left != null ? html`<span class="bp-days">${season.days_left}d left</span>` : nothing}
          </div>
          ${bp.known
            ? html`<div class="bp-unlock">
                <div class="bp-unlock-top"><span>🔓 Unlocked</span><b>${bp.unlocked} / ${bp.known}</b></div>
                <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${Math.round((bp.unlocked / bp.known) * 100)}%"></div></div>
              </div>`
            : nothing}
          <div class="bp-stats">
            <div><b>${sets.length}</b><span>sets</span></div>
            <div><b>${outfits}</b><span>outfits</span></div>
            <div><b>${bp.reward_count ?? sets.reduce((n, s) => n + s.rewardCount, 0)}</b><span>rewards</span></div>
            ${totalVbucks ? html`<div class="gold"><b>${this._num(totalVbucks)}</b><span>V-Bucks</span></div>` : nothing}
            ${level ? html`<div><b>${level}</b><span>level</span></div>` : nothing}
          </div>
        </div>

        <div class="bp-strip" role="tablist">
          ${sets.map((s, i) => html`
            <button class="bp-thumb ${i === idx ? "active" : ""} ${s.known && s.unlocked === s.known ? "done" : ""}" role="tab" aria-selected=${i === idx ? "true" : "false"}
              title="${s.title}${s.known ? ` · ${s.unlocked} of ${s.known} unlocked` : ""}"
              @click=${() => this._goPassSet(i, sets.length)}>
              ${s.hero ? html`<img src=${s.hero} alt="" @error=${hideBroken} />` : html`<ha-icon icon="mdi:account"></ha-icon>`}
              ${s.known && s.unlocked === s.known ? html`<span class="bp-thumb-check">✓</span>` : nothing}
            </button>`)}
        </div>

        <div class="bp-set">
          <div class="bp-hero">
            <button class="bp-nav" title="Previous set" @click=${() => this._goPassSet(idx - 1, sets.length)}><ha-icon icon="mdi:chevron-left"></ha-icon></button>
            <div class="bp-hero-img">
              ${set.hero ? html`<img src=${set.hero} alt="" @error=${hideBroken} />` : html`<ha-icon icon="mdi:account"></ha-icon>`}
            </div>
            <div class="bp-hero-info">
              <div class="bp-hero-count">Set ${idx + 1} of ${sets.length}</div>
              <div class="bp-hero-name">${set.title}</div>
              <div class="bp-hero-meta">
                ${Object.keys(set.baseCost).length ? html`<span title="Stars for every reward on the main pages">${this._costText(set.baseCost)}</span>` : nothing}
                ${Object.keys(set.bonusCost).length ? html`<span title="Bonus pages">Bonus: ${this._costText(set.bonusCost)}</span>` : nothing}
                ${set.vbucks ? html`<span class="gold">Ⓥ ${this._num(set.vbucks)}</span>` : nothing}
              </div>
              ${set.known
                ? html`<div class="bp-set-progress">
                    <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${Math.round((set.unlocked / set.known) * 100)}%"></div></div>
                    <span>${set.unlocked === set.known ? "✓ All unlocked" : `${set.unlocked} of ${set.known} unlocked`}</span>
                  </div>`
                : nothing}
              <div class="bp-hero-types">${set.types.map(([t, n]) => `${n} ${plural(t, n)}`).join(" · ")}</div>
            </div>
            <button class="bp-nav" title="Next set" @click=${() => this._goPassSet(idx + 1, sets.length)}><ha-icon icon="mdi:chevron-right"></ha-icon></button>
          </div>

          ${set.pages.length > 1
            ? html`<div class="bp-pages">
                ${set.pages.map((pg, i) => html`
                  <button class="mini-button ${i === pageIdx ? "active" : ""} ${pg.bonus ? "bonus" : ""}" @click=${() => (this._passPage = i)}>
                    ${pg.done ? "✓ " : ""}${pg.label}<span class="bp-page-count">${pg.rewards.length}</span>
                  </button>`)}
              </div>`
            : nothing}

          <div class="bp-rewards">
            ${page.rewards.map((r: any) => html`
              <div class="bp-reward ${isVbucks(r) ? "vbucks" : ""} ${isOutfit(r) ? "outfit" : ""} ${r.owned === true ? "unlocked" : r.owned === false ? "locked" : ""}"
                title="${rewardDisplayName(r)} · ${rewardTypeLabel(r)}${r.owned === true ? " · unlocked" : r.owned === false ? " · locked" : ""}">
                <div class="bp-reward-img">
                  ${r.icon ? html`<img src=${r.icon} alt="" @error=${hideBroken} />` : html`<ha-icon icon="mdi:gift-outline"></ha-icon>`}
                  ${r.owned === true
                    ? html`<span class="bp-state unlocked">✓</span>`
                    : r.owned === false
                      ? html`<span class="bp-state locked"><ha-icon icon="mdi:lock"></ha-icon></span>`
                      : nothing}
                  ${r.owned === true ? nothing : this._passCostBadge(r)}
                </div>
                <span class="bp-reward-name">${isVbucks(r) && r.quantity ? `${this._num(r.quantity)} V-Bucks` : rewardDisplayName(r)}</span>
                <span class="bp-reward-type">${rewardTypeLabel(r)}</span>
              </div>`)}
          </div>
        </div>

        <div class="bp-note">
          ${Object.keys(totalBase).length ? html`<span>All base pages: ${this._costText(totalBase)}</span>` : nothing}

        </div>
      </div>
    `;
  }


  // ---- locker (owned outfits) -------------------------------------------------

  private _outfitRarity(o: any): string {
    const r = String(o?.rarity || "");
    return r ? r.charAt(0).toUpperCase() + r.slice(1).toLowerCase() : "";
  }

  private _renderLockerView(profileAttrs: any) {
    const info = profileAttrs.outfits || {};
    const avatar = info.avatar;
    const avatarId: string | null = avatar?.id || null;
    const cardOverride = !!(this._config.avatar || "").trim();
    const st = this._outfits;
    if (st.loading || (st.data === undefined && !st.error)) return html`<div class="empty">Loading locker…</div>`;
    if (st.error) return html`<div class="empty">${st.error}</div>`;
    const all: any[] = st.data?.outfits || [];
    if (!all.length) {
      return html`<div class="empty">Your outfits will show up here soon.</div>`;
    }
    const rarityOrder = ["Mythic", "Legendary", "Epic", "Rare", "Uncommon", "Common"];
    const known = all.filter((o) => o.name);
    const q = this._outfitQuery.trim().toLowerCase();
    const filtered = known.filter((o) => !q || String(o.name).toLowerCase().includes(q) || String(o.set || "").toLowerCase().includes(q));
    const sorted = [...filtered].sort((a, b) => {
      if (a.id?.toLowerCase() === avatarId) return -1;
      if (b.id?.toLowerCase() === avatarId) return 1;
      if (this._outfitSort === "rarity") {
        const ra = rarityOrder.indexOf(this._outfitRarity(a));
        const rb = rarityOrder.indexOf(this._outfitRarity(b));
        return (ra < 0 ? 99 : ra) - (rb < 0 ? 99 : rb) || String(a.name).localeCompare(String(b.name));
      }
      return String(a.name).localeCompare(String(b.name));
    });
    const perPage = this._config.compact ? 18 : 24;
    const pages = Math.max(1, Math.ceil(sorted.length / perPage));
    const page = Math.min(this._outfitPage, pages - 1);
    const shown = sorted.slice(page * perPage, page * perPage + perPage);
    const byRarity = new Map<string, number>();
    for (const o of known) byRarity.set(this._outfitRarity(o) || "Other", (byRarity.get(this._outfitRarity(o) || "Other") || 0) + 1);

    return html`
      <div class="locker">
        <div class="locker-hero" style="--rarity:${RARITY_COLORS[this._outfitRarity(avatar)] || "var(--accent)"}">
          <div class="locker-hero-img">
            ${avatar?.icon ? html`<img src=${avatar.icon} alt="" @error=${hideBroken} />` : html`<ha-icon icon="mdi:account"></ha-icon>`}
          </div>
          <div class="locker-hero-info">
            <div class="bp-hero-count">Avatar${cardOverride ? " · this card uses its own skin setting" : ""}</div>
            <div class="bp-hero-name">${avatar?.name || (avatarId ? "Unknown outfit" : "Not chosen")}</div>
            <div class="bp-hero-meta">
              ${avatar?.rarity ? html`<span>${this._outfitRarity(avatar)}</span>` : nothing}
              ${avatarId
                ? html`<button class="link-button" ?disabled=${this._loadingAction === "set_avatar"} @click=${() => this._setAvatar(null)}>Clear</button>`
                : html`<span class="muted">Tap an outfit below to use it</span>`}
            </div>
            <div class="bp-hero-types">
              <b>${this._num(known.length)}</b> outfits
            </div>
            <div class="locker-rarities">
              ${rarityOrder.filter((r) => byRarity.get(r)).map((r) => html`<span class="rarity-dot" style="--rarity:${RARITY_COLORS[r]}" title=${r}>${byRarity.get(r)}</span>`)}
            </div>
          </div>
        </div>

        <div class="locker-controls">
          <input class="locker-search" type="search" placeholder="Search outfits or sets" .value=${this._outfitQuery}
            @input=${(e: any) => { this._outfitQuery = e.target.value; this._outfitPage = 0; }} />
          <button class="mini-button ${this._outfitSort === "rarity" ? "active" : ""}" @click=${() => { this._outfitSort = "rarity"; this._outfitPage = 0; }}>Rarity</button>
          <button class="mini-button ${this._outfitSort === "name" ? "active" : ""}" @click=${() => { this._outfitSort = "name"; this._outfitPage = 0; }}>A–Z</button>
        </div>

        ${shown.length
          ? html`<div class="bp-rewards locker-grid">
              ${shown.map((o) => {
                const id = String(o.id || "").toLowerCase();
                const isAvatar = id === avatarId;
                const selected = this._selectedOutfit === id;
                return html`
                  <div class="bp-reward locker-tile ${isAvatar ? "equipped" : ""} ${selected ? "selected" : ""}" style="--rarity:${RARITY_COLORS[this._outfitRarity(o)] || "#9CA3AF"}"
                    title="${o.name}${o.set ? ` · ${o.set}` : ""}" role="button" tabindex="0"
                    @click=${() => (this._selectedOutfit = selected ? null : id)}>
                    <div class="bp-reward-img locker-img">
                      ${o.small || o.icon ? html`<img src=${o.small || o.icon} alt="" loading="lazy" @error=${hideBroken} />` : html`<ha-icon icon="mdi:account"></ha-icon>`}
                      ${isAvatar ? html`<span class="bp-cost included">Avatar</span>` : nothing}
                      ${selected && !isAvatar
                        ? html`<button class="locker-use" ?disabled=${this._loadingAction === "set_avatar"}
                            @click=${(e: Event) => { e.stopPropagation(); this._setAvatar(id); }}>
                            ${this._loadingAction === "set_avatar" ? "Saving…" : "Use as avatar"}</button>`
                        : nothing}
                    </div>
                    <span class="bp-reward-name">${o.name}</span>
                    <span class="bp-reward-type">${this._outfitRarity(o) || "Outfit"}</span>
                  </div>`;
              })}
            </div>`
          : html`<div class="empty">No outfits match “${this._outfitQuery}”.</div>`}

        ${pages > 1
          ? html`<div class="locker-pager">
              <button class="bp-nav" title="Previous page" ?disabled=${page === 0} @click=${() => (this._outfitPage = page - 1)}><ha-icon icon="mdi:chevron-left"></ha-icon></button>
              <span>Page ${page + 1} of ${pages} · ${sorted.length} outfits</span>
              <button class="bp-nav" title="Next page" ?disabled=${page >= pages - 1} @click=${() => (this._outfitPage = page + 1)}><ha-icon icon="mdi:chevron-right"></ha-icon></button>
            </div>`
          : nothing}
      </div>
    `;
  }

  // ---- sprites -------------------------------------------------------------

  /**
   * Levels 1..N from the public level-up curve: the leading run of rising cumulative XP thresholds
   * (observed 0/400/1000/2200/4000; 4000 = level 5 = mastery). Rows after that run have a different,
   * unconfirmed meaning and are not used.
   */
  private _spriteCurve(a: any): Array<[number, number]> {
    const rows = [...(a.level_curve || [])]
      .filter((r: any) => typeof r.level === "number" && typeof r.xp === "number")
      .sort((x: any, y: any) => x.level - y.level);
    const out: Array<[number, number]> = [];
    for (const r of rows) {
      if (out.length && r.xp < out[out.length - 1][1]) break;
      out.push([r.level, r.xp]);
    }
    return out.length >= 2 ? out : [];
  }

  private _spriteLevel(xp: any, curve: Array<[number, number]>) {
    if (typeof xp !== "number" || !curve.length) return null;
    let idx = 0;
    curve.forEach(([, t], i) => {
      if (xp >= t) idx = i;
    });
    const [level] = curve[idx];
    const max = curve[curve.length - 1];
    const next = curve[idx + 1];
    return { level, maxLevel: max[0], maxXp: max[1], next: next ? next[1] : null, toMax: Math.max(0, max[1] - xp), atMax: idx === curve.length - 1 };
  }

  /** Per-sprite summary used by the cards: kinds found, mastered kinds, copies, best current level. */
  private _spriteInfo(f: any, curve: Array<[number, number]>) {
    const variants: any[] = f.variants || [];
    const owned = variants.filter((v) => v.owned);
    const mastered = variants.filter((v) => v.mastered).length;
    let best: ReturnType<FortniteActivityCard["_spriteLevel"]> = null;
    for (const v of owned) {
      const lv = this._spriteLevel(v.xp, curve);
      if (lv && (!best || lv.level > best.level)) best = lv;
    }
    const copies = owned.reduce((n, v) => n + Math.max(1, Number(v.count) || 0), 0);
    return { owned: owned.length, total: variants.length, mastered, best, copies };
  }

  private _spriteName(f: any): string {
    return String(f.name || "").replace(/ Sprite$/, "");
  }

  private _renderSpritesView(sensor: any) {
    const a = sensor?.attributes || {};
    const curve = this._spriteCurve(a);
    const all: any[] = a.families || [];
    const pct = Number(sensor?.state || 0);
    const ownedVariants = Number(a.owned_variants || 0);
    const rarityOrder = ["Common", "Uncommon", "Rare", "Epic", "Legendary", "Mythic"];
    const masteredSprites = all.filter((f) => f.mastered > 0).length;

    const filtered = all.filter((f) => {
      if (this._spriteFilter === "missing") return !f.owned;
      if (this._spriteFilter === "unmastered") return f.owned && !f.mastered;
      if (this._spriteFilter === "mastered") return f.mastered > 0;
      return true;
    });
    const sorted = [...filtered].sort((x, y) => {
      if (this._spriteSort === "rarity") return rarityOrder.indexOf(y.rarity) - rarityOrder.indexOf(x.rarity) || (x.dex ?? 0) - (y.dex ?? 0);
      if (this._spriteSort === "progress") return y.owned_variants / y.total_variants - x.owned_variants / x.total_variants || (x.dex ?? 0) - (y.dex ?? 0);
      return (x.dex ?? 0) - (y.dex ?? 0);
    });

    // Kinds you don't have yet that can drop, easiest to find first
    const hunt = all
      .flatMap((f) => f.variants.filter((v: any) => !v.owned && v.drop_chance_pct).map((v: any) => ({ f, v })))
      .sort((x: any, y: any) => y.v.drop_chance_pct - x.v.drop_chance_pct || rarityOrder.indexOf(x.f.rarity) - rarityOrder.indexOf(y.f.rarity))
      .slice(0, 6);

    // Copies you own that are levelling up, closest to the top level first
    const toMaster = curve.length
      ? all
          .flatMap((f) => f.variants.filter((v: any) => v.owned && typeof v.xp === "number" && v.xp > 0).map((v: any) => ({ f, v, lv: this._spriteLevel(v.xp, curve)! })))
          .filter((x: any) => x.lv && !x.lv.atMax)
          .sort((x: any, y: any) => x.lv.toMax - y.lv.toMax)
          .slice(0, 5)
      : [];

    const chip = (id: typeof this._spriteFilter, label: string) => html`
      <button class="mode-tab ${this._spriteFilter === id ? "active" : ""}" @click=${() => (this._spriteFilter = id)}>${label}</button>`;
    const sortChip = (id: typeof this._spriteSort, label: string) => html`
      <button class="mode-tab ${this._spriteSort === id ? "active" : ""}" @click=${() => (this._spriteSort = id)}>${label}</button>`;

    return html`
      <div class="sp-summary">
        <div class="sprite-ring" style="--pct:${Math.min(100, pct)}"><span>${Math.round(pct)}%</span></div>
        <div class="sp-stat">
          <b>${a.owned_families ?? 0}<small>/${a.total_families ?? all.length}</small></b>
          <span>Sprites found</span>
        </div>
        <div class="sp-stat gold">
          <b>⭐ ${masteredSprites}</b>
          <span>Mastered</span>
        </div>
        <div class="sp-stat">
          <b>${ownedVariants}<small>/${a.total_variants ?? 0}</small></b>
          <span>Kinds collected</span>
        </div>
      </div>

      ${toMaster.length
        ? html`<div class="split-section">
            <div class="section-title">Almost mastered</div>
            <div class="master-list">
              ${toMaster.map(({ f, v, lv }: any) => html`
                <div class="master-row" style="--rarity:${RARITY_COLORS[f.rarity] || "#9CA3AF"}" @click=${() => (this._expandedSprite = f.id)}>
                  ${v.icon ? html`<img src=${v.icon} alt="" @error=${hideBroken} />` : nothing}
                  <span class="variant-name">${v.label === "Base" ? this._spriteName(f) : `${v.label} ${this._spriteName(f)}`}</span>
                  <span class="sp-level-pill">Level ${lv.level}</span>
                  <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${Math.min(100, (v.xp / lv.maxXp) * 100)}%"></div></div>
                  <span class="muted">${this._num(lv.toMax)} XP to go</span>
                </div>`)}
            </div>
          </div>`
        : nothing}

      ${hunt.length
        ? html`<div class="split-section">
            <div class="section-title">Easiest to find next</div>
            <div class="hunt-row">
              ${hunt.map(({ f, v }: any) => html`
                <div class="hunt-item" style="--rarity:${RARITY_COLORS[f.rarity] || "#9CA3AF"}" title="${v.name}" @click=${() => (this._expandedSprite = f.id)}>
                  ${v.icon ? html`<img src=${v.icon} alt="" @error=${hideBroken} />` : nothing}
                  <span>${v.label === "Base" ? this._spriteName(f) : `${v.label} ${this._spriteName(f)}`}</span>
                  <small>${v.drop_chance_pct}% chance</small>
                </div>`)}
            </div>
          </div>`
        : nothing}

      <div class="tab-rows">
        <div class="mode-tabs">${chip("all", "All")} ${chip("mastered", "⭐ Mastered")} ${chip("unmastered", "Not mastered")} ${chip("missing", "Not found")}</div>
        <div class="mode-tabs">${sortChip("dex", "Number")} ${sortChip("rarity", "Rarity")} ${sortChip("progress", "Most kinds")}</div>
      </div>

      <div class="sp-grid">
        ${sorted.length
          ? sorted.map((f) => {
              const open = this._expandedSprite === f.id;
              const info = this._spriteInfo(f, curve);
              const status = info.mastered
                ? html`<span class="sp-status gold">⭐ Mastered</span>`
                : f.owned
                  ? html`<span class="sp-status">Not mastered</span>`
                  : html`<span class="sp-status dim">Not found yet</span>`;
              const have = f.owned
                ? html`<span class="sp-have">Have ${info.copies}${info.best ? html` · <span class=${info.best.atMax ? "sp-max" : ""} title=${info.best.atMax ? "Top level" : ""}>Lv ${info.best.level}</span>` : nothing}</span>`
                : nothing;
              return html`
                <div class="sp-card ${f.owned ? "" : "missing"} ${info.mastered ? "mastered" : ""} ${open ? "open" : ""}"
                  style="--rarity:${RARITY_COLORS[f.rarity] || "#9CA3AF"}" role="button" tabindex="0"
                  @click=${() => (this._expandedSprite = open ? null : f.id)}>
                  <div class="sp-img">
                    ${f.icon ? html`<img src=${f.icon} alt="" @error=${hideBroken} />` : html`<ha-icon icon="mdi:ghost-outline"></ha-icon>`}
                    ${info.mastered ? html`<span class="sp-badge star" title="Mastered">⭐</span>` : nothing}
                    ${!f.owned ? html`<span class="sp-badge lock"><ha-icon icon="mdi:lock"></ha-icon></span>` : nothing}
                  </div>
                  <span class="sp-name">${this._spriteName(f)}</span>
                  ${status}
                  ${have}
                  <div class="sp-kinds" title="${info.owned} of ${info.total} kinds">
                    ${(f.variants || []).map((v: any) => html`
                      <span class="sp-kind ${v.owned ? "owned" : ""} ${v.mastered ? "mastered" : ""}" title="${v.label}${v.owned ? "" : " (not found yet)"}">
                        ${v.icon ? html`<img src=${v.icon} alt="" @error=${hideBroken} />` : nothing}
                      </span>`)}
                  </div>
                  <span class="sp-kinds-text">${info.owned} of ${info.total} kinds</span>
                </div>
                ${open ? this._renderSpriteDetail(f) : nothing}`;
            })
          : html`<div class="empty">No sprites here yet.</div>`}
      </div>

      ${(a.versions || []).length > 1
        ? html`<div class="split-section">
            <div class="section-title">Every season so far</div>
            ${a.versions.map((v: any) => html`
              <div class="version-row ${v.current ? "current" : ""}">
                <span>${v.current ? "This season" : v.version}</span>
                <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${Math.min(100, v.completion_pct)}%"></div></div>
                <span>${v.owned_variants}/${v.total_variants}</span>
              </div>`)}
          </div>`
        : nothing}
    `;
  }

  private _renderSpriteDetail(f: any) {
    const curve = this._spriteCurve(this._findEntity("sensor", "sprites")?.attributes || {});
    const familyBoon = f.name;
    return html`
      <div class="sprite-detail sp-detail" style="--rarity:${RARITY_COLORS[f.rarity] || "#9CA3AF"}">
        <div class="sprite-detail-head">
          ${f.icon_large || f.icon ? html`<img src=${f.icon_large || f.icon} alt="" @error=${hideBroken} />` : nothing}
          <div>
            <b>${f.name}</b> <span class="tag rarity-tag">${f.rarity || ""}</span>
            ${f.description ? html`<p class="detail-desc">${f.description}</p>` : nothing}
            ${f.hint ? html`<p class="detail-desc hint">📍 ${f.hint}</p>` : nothing}
          </div>
        </div>
        <div class="sp-kind-list">
          ${(f.variants || []).map((v: any) => {
            const lv = v.owned ? this._spriteLevel(v.xp, curve) : null;
            const perk = (v.boons || []).find((b: any) => b.name && b.name !== familyBoon);
            const count = Math.max(1, Number(v.count) || 0);
            return html`
              <div class="sp-kind-row ${v.owned ? "" : "missing"} ${v.mastered ? "mastered" : ""}">
                <div class="sp-kind-icon">
                  ${v.icon ? html`<img src=${v.icon} alt="" @error=${hideBroken} />` : html`<ha-icon icon="mdi:ghost-outline"></ha-icon>`}
                  ${!v.owned ? html`<span class="sp-badge lock"><ha-icon icon="mdi:lock"></ha-icon></span>` : nothing}
                </div>
                <div class="sp-kind-main">
                  <div class="sp-kind-title">
                    <b>${v.label}</b>
                    ${v.mastered ? html`<span class="sp-chip gold">⭐ Mastered</span>` : nothing}
                    ${v.owned ? html`<span class="sp-chip">You have ${count}</span>` : html`<span class="sp-chip dim">Not found yet</span>`}
                    ${lv ? html`<span class="sp-chip">Level ${lv.level}${lv.atMax ? " · max" : ""}</span>` : nothing}
                    ${!v.owned && v.drop_chance_pct != null ? html`<span class="sp-chip dim">${v.drop_chance_pct}% chance</span>` : nothing}
                  </div>
                  ${lv && !lv.atMax && lv.next
                    ? html`<div class="sp-xp">
                        <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${Math.min(100, (v.xp / lv.next) * 100)}%"></div></div>
                        <span>${this._num(v.xp)} / ${this._num(lv.next)} XP to level ${lv.level + 1}</span>
                      </div>`
                    : nothing}
                  ${perk ? html`<div class="sp-perk">✨ ${perk.description || perk.name}</div>` : nothing}
                </div>
              </div>`;
          })}
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
      type: "all",
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
    if (f.type !== "all" && e.tournament_type !== f.type) return false;
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
    if (ev.list === null) return html`<div class="empty">Tournaments will show here soon.</div>`;
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
        ${select("type", [["all", "Type"], ...[...new Set(all.map((e) => e.tournament_type).filter(Boolean))].map((t: any) => [t, TOURNAMENT_TYPES[t] || t] as [string, string])])}
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
        <span class="muted">UK time</span>
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
    const typeLabel = e.tournament_type ? TOURNAMENT_TYPES[e.tournament_type] || e.tournament_type : null;
    const tags = [e.mode, e.team, e.ranked && e.tournament_type !== "RankedCup" ? "Ranked" : null, ...(e.platform_groups || []), e.region].filter(Boolean);
    return html`
      <div class="event-card ${timing.live ? "live" : ""} ${expanded ? "expanded" : ""} ${e.tournament_type === "FNCS" ? "featured" : ""}">
        <div class="event-row" @click=${() => this._toggleEvent(e)}>
          ${e.poster ? html`<img class="event-art" src=${e.poster} alt="" loading="lazy" @error=${hideBroken} />` : nothing}
          <div class="match-left">
            <div class="match-headline">
              <span class="event-name">${e.name}</span>
              ${timing.live ? html`<span class="placement-badge win">LIVE</span>` : nothing}
            </div>
            <span class="match-mode ${timing.soon ? "soon" : ""}">${timing.text}</span>
            <div class="tag-row">
              ${typeLabel ? html`<span class="tag type-tag ${e.tournament_type === "FNCS" ? "fncs" : ""}">${typeLabel}</span>` : nothing}
              ${e.can_spectate ? html`<span class="tag spectate-tag" title="You can watch this inside Fortnite">👁 Spectate in-game</span>` : nothing}
              ${tags.map((t) => html`<span class="tag">${t}</span>`)}
            </div>
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
        ${e.min_account_level ? html`<div class="detail-line"><span>Minimum account level</span><b>${e.min_account_level}</b></div>` : nothing}
        ${e.tournament_type === "FNCS"
          ? html`<div class="detail-line"><span>Official coverage</span>
              <a href="https://www.twitch.tv/fortnite" target="_blank" rel="noopener">Fortnite on Twitch ↗</a></div>
              <div class="perk-desc">Major FNCS rounds are streamed on Fortnite's official channels.</div>`
          : nothing}

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
