import { LitElement, html, nothing, svg, PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { cardStyles } from "./styles";
import { FortniteCardConfig, MatchRecord } from "./types";
import "./editor";
import "./panel";

const CARD_VERSION = "1.15.0";

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
  show_tournaments: true,
  compact: false,
  max_feed_matches: 10,
};

type View = "session" | "stats" | "events" | "sprites" | "trends" | "pass" | "locker" | "shop" | "news" | "map";
const ALL_SECTIONS: View[] = ["session", "stats", "events", "sprites", "trends", "pass", "locker", "shop", "news", "map"];

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
  complete: boolean;
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
// Every filter group is multi-select; an empty list means "any"
interface EventFilters {
  region: string[];
  type: string[];
  mode: string[];
  team: string[];
  platform: string[];
}

// Fade an image in once decoded (paired with the .fi / .ld classes in the styles)
const imgLoaded = (ev: Event) => (ev.target as HTMLElement).classList.add("ld");

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
  @state() private _spriteFilter: "all" | "missing" | "unmastered" | "mastered" | "new" = "all";
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
  @state() private _lockerFilter: "all" | "favorites" | "new" = "all";
  @state() private _shop: { loading?: boolean; data?: any; error?: string } = {};
  @state() private _shopTab: "today" | "wishlist" = "today";
  @state() private _shopQuery = "";
  @state() private _shopLimit = 36;
  @state() private _shopSection = 0;
  @state() private _shopKind = "all";
  @state() private _searchQuery = "";
  @state() private _searchType = "outfit";
  @state() private _searchResults: any[] | null = null;
  @state() private _searchLoading = false;
  @state() private _news: { loading?: boolean; data?: any; error?: string } = {};
  @state() private _maps: Record<string, { loading?: boolean; data?: any; error?: string }> = {};
  @state() private _mapMode = "br";
  @state() private _mapPoi: string | null = null;
  @state() private _mapZoom = 1;
  @state() private _mapCenter = { x: 0.5, y: 0.5 };
  @state() private _mapBox = { w: 0, h: 0 };
  @state() private _mapTool: "pan" | "draw" | "marker" | "erase" = "pan";
  @state() private _mapColor = "#F43F5E";
  @state() private _mapIcon = "📍";
  @state() private _mapDrawing: { color: string; points: number[][] } | null = null;
  @state() private _notes: Record<string, { marks: any[]; lines: any[] }> = {};
  @state() private _undo: Array<{ key: string; state: { marks: any[]; lines: any[] } }> = [];
  @state() private _redo: Array<{ key: string; state: { marks: any[]; lines: any[] } }> = [];
  private _mapAnim = 0;
  private _mapRaf = 0;
  private _mapPending: { z: number; cx: number; cy: number } | null = null;
  private _mapResize?: ResizeObserver;
  private _mapObserved: HTMLElement | null = null;
  @state() private _mapFull = false;
  @state() private _mapGrid = false;
  @state() private _mapLabels: "auto" | "all" | "off" = "auto";
  @state() private _mapShowLandmarks = true;
  @state() private _mapMenu = false;
  @state() private _mapQuery = "";
  @state() private _mapSort: "name" | "grid" = "name";
  @state() private _mapDrop: string | null = null;
  @state() private _gesture: any = null;
  private _pointers = new Map<number, { x: number; y: number }>();
  @state() private _filtersOpen = false;
  private _searchTimer?: number;
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
    document.addEventListener("fullscreenchange", this._onFullscreenChange);
    document.addEventListener("keydown", this._onKeyDown);
    // Countdowns and live badges tick every 30 s
    this._tick = window.setInterval(() => {
      this._now = Date.now();
      if (Date.now() - eventsCache.at > 10 * 60_000) this._loadEvents();
    }, 30_000);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener("fullscreenchange", this._onFullscreenChange);
    document.removeEventListener("keydown", this._onKeyDown);
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
    const sheet = this.shadowRoot?.querySelector("dialog.sp-sheet") as HTMLDialogElement | null;
    if (sheet && !sheet.open) sheet.showModal();
    // A section can open without a tab click (default section / single-section card)
    if (this._renderedView === "pass") {
      this._loadPass();
      this._loadOutfits(); // owned outfits tick off each set's outfit reward
    }
    if (this._renderedView === "locker") this._loadOutfits();
    if (this._renderedView === "shop") this._loadShop();
    if (this._renderedView === "news") {
      this._loadNews();
      this._loadShop();
      // Only kick off the first load; _loadEvents itself changes state, so never call it every update
      if (this._events.list === undefined && !this._events.loading && !this._events.error) this._loadEvents();
    }
    if (this._renderedView === "map") {
      this._loadMap("br");
      this._loadMap(this._mapMode);
      this._observeMapFrame();
    }
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
    if (!this._events.list && !this._events.loading) this._events = { ...this._events, loading: true };
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
    if (view === "pass") {
      this._loadPass();
      this._loadOutfits();
    }
    if (view === "locker") this._loadOutfits();
    if (view === "shop") this._loadShop();
    if (view === "news") this._loadNews();
    if (view === "map") this._loadMap(this._mapMode);
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
    const classes = `theme-${this._config.card_style || "bubble"}${this._config.compact ? " compact" : ""}${this._config.kid_mode ? " kid" : ""}${this._mapFull ? " map-full" : ""}`;

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
                    : view === "shop"
                      ? this._renderShopView()
                      : view === "news"
                        ? this._renderNewsView()
                        : view === "map"
                          ? this._renderMapView()
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
          ${avatarImg ? html`<img @load=${imgLoaded} decoding="async" loading="lazy" class="fi" src=${avatarImg} alt=${this._avatarName(profileAttrs)} @error=${hideBroken} />` : player.slice(0, 2).toUpperCase()}
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
        </div>
        <div class="header-right">
          <div class="status-pill ${isPlaying ? "live" : "idle"}">
            ${isPlaying
              ? html`<div class="pulse-dot"></div><span>LIVE • ${this._formatDuration(sessionAttrs.duration_minutes || 0)}</span>`
              : html`<span>IDLE</span>`}
          </div>
          ${this._renderHeaderActions(isPlaying)}
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

  private async _setFavorite(outfitId: string, favorite: boolean): Promise<void> {
    try {
      await this.hass.callService("fortnite_activity", "set_favorite", { player_id: this._player, outfit_id: outfitId, favorite });
      const outfits = (this._outfits.data?.outfits || []).map((o: any) =>
        String(o.key || o.id).toLowerCase() === outfitId ? { ...o, favorite } : o,
      );
      this._outfits = { data: { ...(this._outfits.data || {}), outfits } };
    } catch (err) {
      console.error("Favourite update failed:", err);
    } finally {
      this._selectedOutfit = null;
    }
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
          ${avatarImg ? html`<img @load=${imgLoaded} decoding="async" loading="lazy" class="fi" src=${avatarImg} alt="" @error=${hideBroken} />` : player.slice(0, 2).toUpperCase()}
        </div>
        <div class="player-info">
          <div class="name-row">
            <h2>${displayName}</h2>
            ${showVbucks ? html`<span class="vbucks-chip">Ⓥ ${this._num(vbucks.state)}</span>` : nothing}
          </div>
        </div>
        <div class="header-right">
          <div class="status-pill ${isPlaying ? "live" : "idle"}">
            ${isPlaying
              ? html`<div class="pulse-dot"></div><span>LIVE • ${this._formatDuration(sessionAttrs.duration_minutes || 0)}</span>`
              : html`<span>IDLE</span>`}
          </div>
          ${this._renderHeaderActions(isPlaying)}
        </div>
      </div>
    `;
  }

  /** Start / end session and refresh: small icon buttons beside the status pill. */
  private _renderHeaderActions(isPlaying: boolean) {
    // Legacy events_only cards never showed the session/refresh actions
    const legacyEventsOnly = !this._config.sections?.length && this._config.layout === "events_only";
    if (this._config.show_sub_buttons === false || legacyEventsOnly) return nothing;
    const busy = this._loadingAction;
    return html`<div class="header-actions">
      ${isPlaying
        ? html`<button class="hdr-btn stop" title="End session" aria-label="End session" ?disabled=${busy === "end_session"} @click=${() => this._callService("end_session")}>
            <ha-icon icon="mdi:stop"></ha-icon></button>`
        : html`<button class="hdr-btn" title="Start session" aria-label="Start session" ?disabled=${busy === "start_session"} @click=${() => this._callService("start_session")}>
            <ha-icon icon="mdi:play"></ha-icon></button>`}
      <button class="hdr-btn" title="Refresh" aria-label="Refresh" ?disabled=${busy === "refresh_player"} @click=${() => this._callService("refresh_player")}>
        <ha-icon icon="mdi:refresh" class=${busy === "refresh_player" ? "spin" : ""}></ha-icon></button>
    </div>`;
  }

  private _renderButtons(view: View, isPlaying: boolean, sections: View[]) {
    const showTabs = sections.length > 1;
    if (!showTabs) return nothing;
    const liveCount = this._eventsEnabled ? this._liveEventCount() : 0;
    const inShopCount = Number(this._findEntity("sensor", "wishlist")?.state) || 0;
    const tabDefs: Record<View, [string, string, number?]> = {
      session: ["mdi:lightning-bolt", isPlaying ? "Live Session" : "Last Session"],
      stats: ["mdi:trophy-outline", "Stats"],
      events: ["mdi:tournament", "Events", liveCount],
      sprites: ["mdi:ghost-outline", "Sprites"],
      trends: ["mdi:chart-line", "Trends"],
      pass: ["mdi:ticket-confirmation-outline", "Pass"],
      locker: ["mdi:hanger", "Locker"],
      shop: ["mdi:shopping-outline", "Shop", inShopCount],
      news: ["mdi:newspaper-variant-outline", "News"],
      map: ["mdi:map-outline", "Map"],
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

  /** One thing that happened in a match: quests done, level up, sprite found / levelled / mastered. */
  private _progressChip(p: any) {
    const icon = p.icon ? html`<img @load=${imgLoaded} decoding="async" loading="lazy" class="fi" src=${p.icon} alt="" @error=${hideBroken} />` : nothing;
    switch (p.type) {
      case "quests":
        return html`<span class="pchip quest">📜 ${p.count} quest${p.count > 1 ? "s" : ""} done</span>`;
      case "level_up":
        return html`<span class="pchip level">⬆️ Level ${p.to}</span>`;
      case "sprite_new":
        return html`<span class="pchip sprite">${icon}New sprite: ${p.name}</span>`;
      case "sprite_mastered":
        return html`<span class="pchip gold">${icon}⭐ Mastered ${p.name}</span>`;
      case "sprite_level":
        return html`<span class="pchip sprite">${icon}${p.name} → Lv ${p.level}</span>`;
      default:
        return nothing;
    }
  }

  private _renderMatch(m: MatchRecord) {
    const info = this._playlist(m.playlist_id);
    const art = info?.image;
    const key = `${m.timestamp}|${m.playlist_id}`;
    const expanded = this._expandedMatch === key;
    const multi = (m.match_count || 1) > 1;
    const ranked = this._isRanked(m);
    const progress: any[] = (m as any).progress || [];
    const matchMap = expanded ? this._matchMap(m) : null;
    const detail = (label: string, value: any) =>
      value === undefined || value === null || value === "" ? nothing : html`<div class="detail"><span>${label}</span><b>${value}</b></div>`;

    return html`
      <div class="match-card ${m.is_victory ? "victory" : ""} ${expanded ? "expanded" : ""}"
        @click=${() => {
          this._expandedMatch = expanded ? null : key;
          if (!expanded) {
            this._loadMap("br");
            this._loadMatchMap(m.playlist_id);
          }
        }}>
        <div class="match-row">
          ${art ? html`<img @load=${imgLoaded} decoding="async" class="fi match-art" src=${art} alt="" loading="lazy" @error=${hideBroken} />` : nothing}
          <div class="match-left">
            <div class="match-headline">
              <span class="match-num">#${m.match_number}${(m.match_count || 1) > 1 ? ` ×${m.match_count}` : ""}</span>
              <span class="placement-badge ${m.is_victory ? "win" : ""}">${m.placement_text}</span>
            </div>
            <span class="match-mode">${m.mode_name} • ${this._formatRelativeTime(m.timestamp)}</span>
            ${progress.length ? html`<div class="progress-chips">${progress.map((p: any) => this._progressChip(p))}</div>` : nothing}
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
              ${matchMap
                ? html`<div class="match-map">
                    ${this._renderMapImage(matchMap, true)}
                    <span>🗺️ ${matchMap.name || "Battle Royale island"}</span>
                  </div>`
                : art ? html`<img @load=${imgLoaded} decoding="async" loading="lazy" class="fi detail-art" src=${art} alt="" @error=${hideBroken} />` : nothing}
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
      const unlockedCount = known.filter((r) => r.owned === true).length;
      const checkable = rewards.filter((r) => r.type !== "Currency").length;
      return {
        key,
        unlocked: unlockedCount,
        known: known.length,
        complete: known.length > 0 && known.length === checkable && unlockedCount === known.length,
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

  /**
   * Outfit rewards arrive as style tokens, which ownership matching cannot resolve. Their icon
   * (T_Soldier_<Set>_<Name>) names the outfit id (character_<set>_<name>), so an owned outfit marks
   * that reward unlocked. No match leaves it unmarked rather than locked.
   */
  private _withOwnedOutfits(bp: any): any {
    const owned = new Set<string>((this._outfits.data?.outfits || []).map((o: any) => String(o.id || "").toLowerCase()));
    if (!owned.size || bp.known == null) return bp;
    let unlocked = bp.unlocked || 0;
    let known = bp.known || 0;
    const pages = (bp.pages || []).map((pg: any) => ({
      ...pg,
      rewards: (pg.rewards || []).map((r: any) => {
        if (r.owned != null || !isOutfit(r)) return r;
        const m = /^T_Soldier_(.+?)(?:\.\w+)?$/i.exec(rewardIconFile(r));
        if (!m || !owned.has(`character_${m[1].toLowerCase()}`)) return r;
        unlocked += 1;
        known += 1;
        return { ...r, owned: true };
      }),
    }));
    return { ...bp, pages, unlocked, known };
  }

  private _renderPassView(levelSensor: any) {
    const p = this._pass;
    if (p.loading || (p.data === undefined && !p.error)) return html`<div class="empty">Loading Battle Pass…</div>`;
    if (p.error) return html`<div class="empty">${p.error}</div>`;
    if (!p.data || !p.data.pages?.length) return html`<div class="empty">The Battle Pass will show here soon.</div>`;
    const bp = this._withOwnedOutfits(p.data);
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
                <div class="bp-unlock-top">
                  <span>✓ <b>${bp.unlocked}</b> unlocked</span>
                  ${bp.known > bp.unlocked ? html`<span class="bp-locked-count">🔒 ${bp.known - bp.unlocked} still locked</span>` : nothing}
                </div>
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
            <button class="bp-thumb ${i === idx ? "active" : ""} ${s.complete ? "done" : ""}" role="tab" aria-selected=${i === idx ? "true" : "false"}
              title="${s.title}${s.known ? ` · ${s.unlocked} of ${s.known} unlocked` : ""}"
              @click=${() => this._goPassSet(i, sets.length)}>
              ${s.hero ? html`<img @load=${imgLoaded} decoding="async" loading="lazy" class="fi" src=${s.hero} alt="" @error=${hideBroken} />` : html`<ha-icon icon="mdi:account"></ha-icon>`}
              ${s.complete ? html`<span class="bp-thumb-check">✓</span>` : nothing}
            </button>`)}
        </div>

        <div class="bp-set">
          <div class="bp-hero">
            <button class="bp-nav" title="Previous set" @click=${() => this._goPassSet(idx - 1, sets.length)}><ha-icon icon="mdi:chevron-left"></ha-icon></button>
            <div class="bp-hero-img">
              ${set.hero ? html`<img @load=${imgLoaded} decoding="async" loading="lazy" class="fi" src=${set.hero} alt="" @error=${hideBroken} />` : html`<ha-icon icon="mdi:account"></ha-icon>`}
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
                    <span>${set.complete
                      ? "✓ All unlocked"
                      : set.unlocked === set.known
                        ? `✓ ${set.unlocked} unlocked`
                        : `✓ ${set.unlocked} unlocked · 🔒 ${set.known - set.unlocked} still locked`}</span>
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
                  ${r.icon ? html`<img @load=${imgLoaded} decoding="async" loading="lazy" class="fi" src=${r.icon} alt="" @error=${hideBroken} />` : html`<ha-icon icon="mdi:gift-outline"></ha-icon>`}
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
    const NEW_DAYS = 14;
    const isNew = (o: any) => !!o.first_seen && this._now - Date.parse(o.first_seen) < NEW_DAYS * 86400_000;
    const known = all.filter((o) => o.name);
    const favCount = known.filter((o) => o.favorite).length;
    const newCount = known.filter(isNew).length;
    const q = this._outfitQuery.trim().toLowerCase();
    const filtered = known
      .filter((o) => this._lockerFilter !== "favorites" || o.favorite)
      .filter((o) => this._lockerFilter !== "new" || isNew(o))
      .filter((o) => !q || String(o.name).toLowerCase().includes(q) || String(o.set || "").toLowerCase().includes(q));
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
            ${avatar?.icon ? html`<img @load=${imgLoaded} decoding="async" loading="lazy" class="fi" src=${avatar.icon} alt="" @error=${hideBroken} />` : html`<ha-icon icon="mdi:account"></ha-icon>`}
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
        <div class="mode-tabs">
          ${(["all", "favorites", "new"] as const).map((id) => html`
            <button class="mode-tab ${this._lockerFilter === id ? "active" : ""}" @click=${() => { this._lockerFilter = id; this._outfitPage = 0; }}>
              ${id === "all" ? "All" : id === "favorites" ? `★ Favourites (${favCount})` : `✨ New (${newCount})`}</button>`)}
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
                      ${o.small || o.icon ? html`<img @load=${imgLoaded} decoding="async" class="fi" src=${o.small || o.icon} alt="" loading="lazy" @error=${hideBroken} />` : html`<ha-icon icon="mdi:account"></ha-icon>`}
                      ${isAvatar ? html`<span class="bp-cost included">Avatar</span>` : nothing}
                      ${o.favorite ? html`<span class="locker-fav">★</span>` : nothing}
                      ${isNew(o) ? html`<span class="locker-new">✨ New</span>` : nothing}
                      ${selected
                        ? html`<div class="locker-actions">
                            ${!isAvatar
                              ? html`<button class="locker-use" ?disabled=${this._loadingAction === "set_avatar"}
                                  @click=${(e: Event) => { e.stopPropagation(); this._setAvatar(id); }}>
                                  ${this._loadingAction === "set_avatar" ? "Saving…" : "Use as avatar"}</button>`
                              : nothing}
                            <button class="locker-use fav" @click=${(e: Event) => { e.stopPropagation(); this._setFavorite(id, !o.favorite); }}>
                              ${o.favorite ? "☆ Unfavourite" : "★ Favourite"}</button>
                          </div>`
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

  // ---- shop + wishlist ------------------------------------------------------------

  private async _loadShop(force = false): Promise<void> {
    if (!this.hass || this._shop.loading || (!force && (this._shop.data !== undefined || this._shop.error))) return;
    this._shop = { ...this._shop, loading: true };
    try {
      this._shop = { data: await this.hass.callWS({ type: "fortnite_activity/shop", player_id: this._player }) };
    } catch (err: any) {
      this._shop = { error: err?.message || "Item Shop unavailable" };
    }
  }

  private async _toggleWishlist(item: any, add: boolean): Promise<void> {
    const id = String(item.key || item.id || "").toLowerCase();
    if (!id) return;
    this._loadingAction = `wish:${id}`;
    try {
      await this.hass.callService("fortnite_activity", add ? "wishlist_add" : "wishlist_remove", {
        player_id: this._player,
        cosmetic_id: id,
        ...(add ? Object.fromEntries(Object.entries({ name: item.name, icon: item.icon, type: item.type, rarity: item.rarity }).filter(([, v]) => typeof v === "string" && v)) : {}),
      });
      this._searchResults = (this._searchResults || []).map((r) => (String(r.key).toLowerCase() === id ? { ...r, wishlisted: add } : r));
      await this._loadShop(true);
    } catch (err) {
      console.error("Wishlist update failed:", err);
    } finally {
      this._loadingAction = null;
    }
  }

  private async _searchCosmetics(): Promise<void> {
    const query = this._searchQuery.trim();
    if (query.length < 2) {
      this._searchResults = null;
      return;
    }
    this._searchLoading = true;
    try {
      const r = await this.hass.callWS({
        type: "fortnite_activity/cosmetic_search",
        query,
        player_id: this._player,
        ...(this._searchType !== "all" ? { cosmetic_type: this._searchType } : {}),
      });
      if (this._searchQuery.trim() === query) this._searchResults = r?.results || [];
    } catch {
      this._searchResults = [];
    } finally {
      this._searchLoading = false;
    }
  }

  private _wishButton(item: any, on: boolean) {
    const id = String(item.key || item.id || "").toLowerCase();
    return html`<button class="wish-btn ${on ? "on" : ""}" title=${on ? "Remove from wishlist" : "Add to wishlist"}
      ?disabled=${this._loadingAction === `wish:${id}`}
      @click=${(e: Event) => { e.stopPropagation(); this._toggleWishlist(item, !on); }}>
      <ha-icon icon=${on ? "mdi:heart" : "mdi:heart-outline"}></ha-icon></button>`;
  }

  private _renderShopView() {
    const st = this._shop;
    if (st.loading && st.data === undefined) return html`<div class="empty">Loading the Item Shop…</div>`;
    if (st.error) return html`<div class="empty">${st.error}</div>`;
    const shop = st.data?.shop;
    const wishlist: any[] = st.data?.wishlist || [];
    const inShop: any[] = st.data?.in_shop || [];
    const tab = (id: "today" | "wishlist", label: any) => html`
      <button class="mode-tab ${this._shopTab === id ? "active" : ""}" @click=${() => (this._shopTab = id)}>${label}</button>`;
    return html`
      ${inShop.length
        ? html`<div class="shop-alert">
            <ha-icon icon="mdi:heart"></ha-icon>
            <span><b>${inShop.length === 1 ? inShop[0].name : `${inShop.length} wishlist items`}</b> ${inShop.length === 1 ? "is" : "are"} in the shop today!</span>
          </div>`
        : nothing}
      <div class="mode-tabs shop-tabs">
        ${tab("today", "Today's shop")}
        ${tab("wishlist", html`♥ Wishlist${wishlist.length ? ` (${wishlist.length})` : ""}`)}
      </div>
      ${this._shopTab === "wishlist" ? this._renderWishlist(wishlist, inShop) : this._renderShopToday(shop)}
    `;
  }

  /** Small line under a shop item: new this season, back after a gap, or the season it first came out. */
  private _shopTag(o: any, shop: any) {
    const it = o.items?.[0] || {};
    const cur = shop?.current || {};
    if (it.intro?.chapter && cur.chapter && it.intro.chapter === cur.chapter && it.intro.season === cur.season) {
      return html`<span class="shop-tag new">✨ New this season</span>`;
    }
    if (typeof it.back_after_days === "number" && it.back_after_days > 1) {
      return html`<span class="shop-tag back">↩ Back after ${it.back_after_days} days</span>`;
    }
    if (it.intro?.chapter) return html`<span class="shop-tag">From Ch${it.intro.chapter} S${it.intro.season}</span>`;
    return nothing;
  }

  private _renderShopTile(o: any, shop: any) {
    const first = o.items[0] || {};
    return html`
      <div class="shop-tile ${o.owned ? "owned" : ""} ${o.wishlisted ? "wish" : ""}" style="--rarity:${RARITY_COLORS[this._outfitRarity(first)] || "#9CA3AF"}"
        title="${o.title}${o.items.length > 1 ? ` · ${o.items.map((i: any) => i.name).join(", ")}` : ""}">
        <div class="shop-img">
          ${o.image ? html`<img @load=${imgLoaded} decoding="async" class="fi" src=${o.image} alt="" loading="lazy" @error=${hideBroken} />` : html`<ha-icon icon="mdi:shopping-outline"></ha-icon>`}
          ${o.owned ? html`<span class="bp-state unlocked" title="Owned">✓</span>` : this._wishButton(first, !!first.wishlisted)}
          ${o.bundle ? html`<span class="shop-bundle">Bundle · ${o.items.length}</span>` : nothing}
        </div>
        <span class="bp-reward-name">${o.title}</span>
        <span class="shop-price">Ⓥ ${this._num(o.price)}${o.regular_price && o.regular_price > o.price ? html` <s>${this._num(o.regular_price)}</s>` : nothing}</span>
        ${this._shopTag(o, shop)}
      </div>`;
  }

  private _renderShopToday(shop: any) {
    if (!shop) return html`<div class="empty">The Item Shop will show here soon.</div>`;
    const q = this._shopQuery.trim().toLowerCase();
    const kindOf = (o: any) => (o.bundle ? "bundle" : String(o.items[0]?.type || "other").toLowerCase());
    const kinds: Array<[string, string]> = [["all", "All"], ["outfit", "Outfits"], ["emote", "Emotes"], ["pickaxe", "Pickaxes"], ["bundle", "Bundles"]];
    const sections: any[] = shop.sections || [];
    const filtering = !!q || this._shopKind !== "all";
    const ends = shop.expiration ? Date.parse(shop.expiration) - this._now : null;
    const idx = Math.min(Math.max(0, this._shopSection), Math.max(0, sections.length - 1));
    const section = sections[idx];

    // Searching or filtering looks across every section; otherwise one section per page
    const results = filtering
      ? sections
          .map((s: any) => ({
            ...s,
            offers: s.offers.filter(
              (o: any) =>
                (this._shopKind === "all" || kindOf(o) === this._shopKind) &&
                (!q || String(o.title).toLowerCase().includes(q) || o.items.some((i: any) => String(i.name || "").toLowerCase().includes(q))),
            ),
          }))
          .filter((s: any) => s.offers.length)
      : [];
    const total = results.reduce((n: number, s: any) => n + s.offers.length, 0);
    let budget = this._shopLimit;
    const shown: any[] = [];
    for (const s of results) {
      if (budget <= 0) break;
      shown.push({ ...s, offers: s.offers.slice(0, budget) });
      budget -= s.offers.length;
    }
    const go = (i: number) => {
      this._shopSection = (i + sections.length) % sections.length;
      this.shadowRoot?.querySelector(".shop-nav")?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    };

    return html`
      <div class="shop-controls">
        <div class="mapx-search">
          <ha-icon icon="mdi:magnify"></ha-icon>
          <input type="search" placeholder="Search today's shop" .value=${this._shopQuery}
            @input=${(e: any) => { this._shopQuery = e.target.value; this._shopLimit = 36; }} />
        </div>
        ${ends && ends > 0 ? html`<span class="shop-refresh"><ha-icon icon="mdi:timer-sand"></ha-icon>New shop in ${this._formatSpan(ends)}</span>` : nothing}
      </div>
      <div class="mode-tabs shop-kinds">
        ${kinds.map(([id, label]) => html`<button class="mode-tab ${this._shopKind === id ? "active" : ""}" @click=${() => { this._shopKind = id; this._shopLimit = 36; }}>${label}</button>`)}
      </div>
      ${filtering
        ? html`
            ${shown.length
              ? shown.map((s: any) => html`
                  <div class="section-title">${s.name}</div>
                  <div class="shop-grid">${s.offers.map((o: any) => this._renderShopTile(o, shop))}</div>`)
              : html`<div class="empty">Nothing in today's shop matches.</div>`}
            ${total > this._shopLimit
              ? html`<button class="mini-button show-more" @click=${() => (this._shopLimit += 36)}>Show more (${total - this._shopLimit} left)</button>`
              : nothing}`
        : section
          ? html`
              <div class="shop-nav">
                <button class="bp-nav" title="Previous section" @click=${() => go(idx - 1)}><ha-icon icon="mdi:chevron-left"></ha-icon></button>
                <label class="mapx-select shop-section-select">
                  <ha-icon icon="mdi:shopping-outline"></ha-icon>
                  <select @change=${(e: any) => go(Number(e.target.value))}>
                    ${sections.map((s: any, i: number) => html`<option value=${i} ?selected=${i === idx}>${s.name} (${s.offers.length})</option>`)}
                  </select>
                </label>
                <button class="bp-nav" title="Next section" @click=${() => go(idx + 1)}><ha-icon icon="mdi:chevron-right"></ha-icon></button>
              </div>
              <div class="shop-section-meta">Section ${idx + 1} of ${sections.length} · ${section.offers.length} item${section.offers.length === 1 ? "" : "s"}</div>
              <div class="shop-grid">${section.offers.map((o: any) => this._renderShopTile(o, shop))}</div>
              ${sections.length > 1
                ? html`<button class="mini-button show-more" @click=${() => go(idx + 1)}>Next: ${sections[(idx + 1) % sections.length].name} ›</button>`
                : nothing}`
          : html`<div class="empty">The Item Shop is empty right now.</div>`}
    `;
  }

  private _renderWishlist(wishlist: any[], inShop: any[]) {
    const inShopIds = new Set(inShop.map((i) => i.id));
    const typeChip = (id: string, label: string) => html`
      <button class="mode-tab ${this._searchType === id ? "active" : ""}" @click=${() => { this._searchType = id; this._searchCosmetics(); }}>${label}</button>`;
    return html`
      <div class="section-title">Find any skin or item</div>
      <div class="locker-controls">
        <input class="locker-search" type="search" placeholder="Type a name, e.g. Peely" .value=${this._searchQuery}
          @input=${(e: any) => {
            this._searchQuery = e.target.value;
            window.clearTimeout(this._searchTimer);
            this._searchTimer = window.setTimeout(() => this._searchCosmetics(), 400);
          }} />
      </div>
      <div class="mode-tabs">${typeChip("outfit", "Outfits")} ${typeChip("all", "Everything")}</div>
      ${this._searchLoading ? html`<div class="empty">Searching…</div>` : nothing}
      ${this._searchResults
        ? this._searchResults.length
          ? html`<div class="bp-rewards locker-grid">
              ${this._searchResults.map((r) => html`
                <div class="bp-reward" style="--rarity:${RARITY_COLORS[this._outfitRarity(r)] || "#9CA3AF"}" title=${r.name}>
                  <div class="bp-reward-img locker-img">
                    ${r.icon ? html`<img @load=${imgLoaded} decoding="async" class="fi" src=${r.icon} alt="" loading="lazy" @error=${hideBroken} />` : html`<ha-icon icon="mdi:tshirt-crew-outline"></ha-icon>`}
                    ${r.owned ? html`<span class="bp-state unlocked" title="Owned">✓</span>` : this._wishButton(r, !!r.wishlisted)}
                  </div>
                  <span class="bp-reward-name">${r.name}</span>
                  <span class="bp-reward-type">${r.owned ? "Owned" : r.type || this._outfitRarity(r)}</span>
                </div>`)}
            </div>`
          : html`<div class="empty">No matches.</div>`
        : nothing}

      <div class="section-title">Your wishlist</div>
      ${wishlist.length
        ? html`<div class="bp-rewards locker-grid">
            ${wishlist.map((w) => html`
              <div class="bp-reward ${inShopIds.has(w.id) ? "in-shop" : ""}" style="--rarity:${RARITY_COLORS[this._outfitRarity(w)] || "#9CA3AF"}" title=${w.name || w.id}>
                <div class="bp-reward-img locker-img">
                  ${w.icon ? html`<img @load=${imgLoaded} decoding="async" class="fi" src=${w.icon} alt="" loading="lazy" @error=${hideBroken} />` : html`<ha-icon icon="mdi:tshirt-crew-outline"></ha-icon>`}
                  ${this._wishButton(w, true)}
                  ${inShopIds.has(w.id) ? html`<span class="shop-bundle in">In shop!</span>` : nothing}
                </div>
                <span class="bp-reward-name">${w.name || w.id}</span>
                <span class="bp-reward-type">${inShopIds.has(w.id) ? "Available now" : w.type || "Waiting"}</span>
              </div>`)}
          </div>`
        : html`<div class="empty">Tap ♡ on any skin to get told when it is in the shop.</div>`}
    `;
  }

  // ---- news ----------------------------------------------------------------------

  private async _loadNews(): Promise<void> {
    if (!this.hass || this._news.loading || this._news.data !== undefined || this._news.error) return;
    this._news = { loading: true };
    try {
      this._news = { data: await this.hass.callWS({ type: "fortnite_activity/news", player_id: this._player }) };
    } catch (err: any) {
      this._news = { error: err?.message || "News unavailable" };
    }
  }

  private _renderNewsView() {
    const st = this._news;
    if (st.loading || (st.data === undefined && !st.error)) return html`<div class="empty">Loading news…</div>`;
    if (st.error) return html`<div class="empty">${st.error}</div>`;
    const news: any[] = st.data?.news || [];
    const up = st.data?.update;
    const season = st.data?.season || this._catalog.season;
    const fetched = st.data?.fetched_at ? Date.parse(st.data.fetched_at) : NaN;
    return html`
      ${this._renderWhatsNew(up)}
      ${up || season
        ? html`<div class="news-update">
            <ha-icon icon="mdi:update"></ha-icon>
            <div>
              <b>${up?.chapter && up?.season ? `Chapter ${up.chapter} · Season ${up.season}` : season?.number ? `Season ${season.number}` : "Current update"}</b>
              <span>
                ${up?.patch || up?.version ? `Update ${up.patch || up.version}` : ""}${up?.release_date ? ` · out ${this._formatWhen(up.release_date)}` : ""}
                ${season?.days_left != null ? ` · season ends in ${season.days_left} days` : ""}
              </span>
            </div>
          </div>`
        : nothing}
      ${this._sectionsHas("events") ? nothing : this._renderNextEventTeaser()}
      ${news.length
        ? html`<div class="news-meta">
            <span>In-game news</span>
            ${!isNaN(fetched) ? html`<span class="muted">Updated ${this._formatRelativeTime(new Date(fetched).toISOString())}</span>` : nothing}
          </div>
          <div class="news-list">
            ${news.map((n) => html`
              <div class="news-card">
                ${n.image || n.tile ? html`<img @load=${imgLoaded} decoding="async" class="fi" src=${n.image || n.tile} alt="" loading="lazy" @error=${hideBroken} />` : nothing}
                <div class="news-body">
                  ${n.tag ? html`<span class="tag">${n.tag}</span>` : nothing}
                  <b>${n.title}</b>
                  ${n.body ? html`<p>${n.body}</p>` : nothing}
                </div>
              </div>`)}
          </div>`
        : html`<div class="empty">No news right now.</div>`}
    `;
  }

  /** "What's new in this update", from what the integration itself detected (sprites, shop, map). */
  private _renderWhatsNew(up: any) {
    const sp = this._findEntity("sensor", "sprites")?.attributes || {};
    const newFams = (sp.families || []).filter((f: any) => f.new);
    const kindNames = [...new Set((sp.families || []).flatMap((f: any) => (f.variants || []).filter((v: any) => v.new && !f.new).map((v: any) => v.label)))];
    const shop = this._shop.data?.shop;
    const cur = shop?.current || {};
    const newInShop = shop
      ? shop.sections.flatMap((s: any) => s.offers).filter((o: any) => o.items?.[0]?.intro?.chapter === cur.chapter && o.items?.[0]?.intro?.season === cur.season).length
      : 0;
    const version = sp.version || up?.patch || up?.version;
    const rows = [
      newFams.length
        ? html`<div class="wn-row" @click=${() => { this._spriteFilter = "new"; this._setView("sprites"); }}>
            <span class="wn-icons">${newFams.slice(0, 4).map((f: any) => html`<img @load=${imgLoaded} decoding="async" loading="lazy" class="fi" src=${f.icon} alt="" @error=${hideBroken} />`)}</span>
            <span><b>${newFams.length} new sprite${newFams.length > 1 ? "s" : ""}</b> · ${newFams.map((f: any) => this._spriteName(f)).join(", ")}</span>
          </div>`
        : nothing,
      sp.new_kinds
        ? html`<div class="wn-row" @click=${() => { this._spriteFilter = "new"; this._setView("sprites"); }}>
            <span class="wn-emoji">✨</span><span><b>${sp.new_kinds} new sprite kinds</b>${kindNames.length ? ` · ${kindNames.join(", ")}` : ""}</span>
          </div>`
        : nothing,
      newInShop
        ? html`<div class="wn-row" @click=${() => this._setView("shop")}><span class="wn-emoji">🛒</span><span><b>${newInShop} new item${newInShop > 1 ? "s" : ""}</b> from this season in today's shop</span></div>`
        : nothing,
      up?.patch ? html`<div class="wn-row" @click=${() => this._setView("map")}><span class="wn-emoji">🗺️</span><span>Map data for <b>update ${up.patch}</b></span></div>` : nothing,
    ].filter((r) => r !== nothing);
    if (!rows.length || !version) return nothing;
    return html`<div class="whats-new">
      <div class="wn-head"><span class="sp-release-badge">✨ NEW</span><b>What's new in update ${version}</b></div>
      ${rows}
    </div>`;
  }

  private _sectionsHas(view: View): boolean {
    return this._sections.includes(view);
  }

  /** Next live / upcoming tournament, so a News-only card still shows what is coming up. */
  private _renderNextEventTeaser() {
    const list = (this._events.list || []).filter((e) => this._matchesFilters(e, this._currentFilters()));
    const next = list.find((e) => e.windows.some((w: any) => this._windowState(w) !== "finished"));
    if (!next) return nothing;
    const timing = this._eventTiming(next);
    return html`<div class="news-update event">
      ${next.poster ? html`<img @load=${imgLoaded} decoding="async" loading="lazy" class="fi" src=${next.poster} alt="" @error=${hideBroken} />` : html`<ha-icon icon="mdi:tournament"></ha-icon>`}
      <div><b>${next.name}</b><span>${timing.text}</span></div>
    </div>`;
  }

  // ---- map -----------------------------------------------------------------------

  private async _loadMap(mode = this._mapMode): Promise<void> {
    const cur = this._maps[mode];
    if (!this.hass || cur?.loading || cur?.error || cur?.data !== undefined) return;
    this._maps = { ...this._maps, [mode]: { loading: true } };
    try {
      const r = await this.hass.callWS({ type: "fortnite_activity/map", player_id: this._player, mode });
      this._maps = { ...this._maps, [mode]: { data: r?.map ?? null } };
    } catch (err: any) {
      this._maps = { ...this._maps, [mode]: { error: err?.message || "Map unavailable" } };
    }
  }

  private async _loadMatchMap(playlistId: string): Promise<void> {
    const key = `playlist:${playlistId}`;
    if (!this.hass || this._maps[key]) return;
    this._maps = { ...this._maps, [key]: { loading: true } };
    try {
      const r = await this.hass.callWS({ type: "fortnite_activity/map", player_id: this._player, playlist_id: playlistId });
      this._maps = { ...this._maps, [key]: { data: r?.map ?? null } };
    } catch {
      this._maps = { ...this._maps, [key]: { data: null } };
    }
  }

  /** The map a match was played on: the rotating map named in its playlist, else today's main island for BR modes. */
  private _matchMap(m: MatchRecord): any {
    const own = this._maps[`playlist:${m.playlist_id}`]?.data;
    if (own) return own;
    if (m.mode_category === "build" || m.mode_category === "zero_build") return this._maps.br?.data || null;
    return null;
  }

  /**
   * POI position as % of the image. Normalise world X/Y across worldBounds, then apply the published
   * camera rotation about the centre: rotation 0 (current BR island) puts X left→right and Y top→bottom
   * (checked against the Pac-Man landmark); rotation -90 (OG, Reload maps) puts Y left→right and X
   * bottom→top (checked against the classic OG layout: Junk Junction NW, Snobby Shores W).
   */
  private _poiPos(map: any, poi: any): { left: number; top: number } | null {
    const b = map?.bounds;
    if (!b || b.maxX === b.minX || b.maxY === b.minY) return null;
    const cu = (poi.x - b.minX) / (b.maxX - b.minX) - 0.5;
    const cv = (poi.y - b.minY) / (b.maxY - b.minY) - 0.5;
    const rad = ((Number(map?.camera?.rotation) || 0) * Math.PI) / 180;
    const cos = Math.round(Math.cos(rad) * 1e6) / 1e6;
    const sin = Math.round(Math.sin(rad) * 1e6) / 1e6;
    const left = (cu * cos - cv * sin + 0.5) * 100;
    const top = (cu * sin + cv * cos + 0.5) * 100;
    if (left < 0 || left > 100 || top < 0 || top > 100) return null;
    return { left, top };
  }

  /** In-game style grid reference (A–J across, 1–10 down) for a position in %. */
  private _gridRef(pos: { left: number; top: number }): string {
    const col = "ABCDEFGHIJ"[Math.min(9, Math.max(0, Math.floor(pos.left / 10)))];
    return `${col}${Math.min(10, Math.max(1, Math.floor(pos.top / 10) + 1))}`;
  }

  private _mapModeLabel(mode: string): string {
    const loaded = this._maps[mode]?.data?.name;
    if (loaded) return loaded;
    if (mode === "br") return "Battle Royale";
    if (mode === "og") return "OG";
    if (!mode.startsWith("rotating:")) return mode;
    // Unnamed rotating maps: make the codename readable (forbiddenblastberry -> Forbidden Blastberry)
    const code = mode.split(":")[1].replace(/(forbidden|blast|berry|ranch|smile|spawn|stake)/g, " $1").replace(/\s+/g, " ").trim();
    return this._titleCase(code);
  }

  /** Fetch every map in the list (names + place counts for the picker); each is cached server-side. */
  private async _loadAllMaps(): Promise<void> {
    for (const m of this._maps.br?.data?.modes || []) await this._loadMap(m);
  }

  /** Places of a map with their position and grid reference, named first. */
  private _mapPlaces(map: any): Array<{ key: string; name: string; type: string; left: number; top: number; grid: string }> {
    return (map?.pois || [])
      .map((p: any, i: number) => {
        const pos = this._poiPos(map, p);
        return pos
          ? { key: `${p.name}#${i}`, name: this._titleCase(p.name), type: p.type === "landmark" ? "landmark" : "named", ...pos, grid: this._gridRef(pos) }
          : null;
      })
      .filter(Boolean) as any[];
  }

  private _titleCase(s: string): string {
    return String(s || "")
      .toLowerCase()
      .replace(/(^|[\s(-])([a-z])/g, (_m, a, b) => a + b.toUpperCase())
      // Lil'Loot stays capitalised; Reality's does not
      .replace(/'([a-z])([a-z]{2,})/g, (_m, a, b) => "'" + a.toUpperCase() + b);
  }

  // -- map viewer: state is the zoom and the map point at the frame centre (fractions 0..1) --

  /** Largest useful zoom: about 2× the image's native 2048 px over the frame's short side. */
  private _mapMaxZoom(): number {
    const L = Math.max(1, Math.min(this._mapBox.w, this._mapBox.h) || 400);
    return Math.min(10, Math.max(3, 4096 / L));
  }

  /** Screen geometry for the current view: map square size and its top-left offset (px). */
  private _mapGeom(z = this._mapZoom, cx = this._mapCenter.x, cy = this._mapCenter.y) {
    const w = this._mapBox.w || 400;
    const h = this._mapBox.h || 400;
    const size = Math.min(w, h) * z;
    const axis = (span: number, c: number) => (size <= span ? (span - size) / 2 : Math.min(0, Math.max(span - size, span / 2 - c * size)));
    return { w, h, size, tx: axis(w, cx), ty: axis(h, cy) };
  }

  /** Clamp a requested view and store it (centre recomputed from the clamped offset). */
  private _setMapView(z: number, cx: number, cy: number): void {
    const zoom = Math.min(this._mapMaxZoom(), Math.max(1, z));
    const g = this._mapGeom(zoom, cx, cy);
    this._mapZoom = zoom;
    this._mapCenter = { x: (g.w / 2 - g.tx) / g.size, y: (g.h / 2 - g.ty) / g.size };
  }

  /** Smoothly move to a view (ease-out over ~220 ms). */
  private _animateMapTo(z: number, cx: number, cy: number): void {
    const from = { z: this._mapZoom, x: this._mapCenter.x, y: this._mapCenter.y };
    const start = performance.now();
    const step = (t: number) => {
      const k = Math.min(1, (t - start) / 220);
      const e = 1 - Math.pow(1 - k, 3);
      this._setMapView(from.z + (z - from.z) * e, from.x + (cx - from.x) * e, from.y + (cy - from.y) * e);
      if (k < 1) this._mapAnim = requestAnimationFrame(step);
    };
    cancelAnimationFrame(this._mapAnim || 0);
    this._mapAnim = requestAnimationFrame(step);
  }

  /** Zoom by a factor, keeping the screen point (sx, sy) in px fixed. */
  private _zoomAt(factor: number, sx?: number, sy?: number, animate = false): void {
    const g = this._mapGeom();
    const px = sx ?? g.w / 2;
    const py = sy ?? g.h / 2;
    const mx = (px - g.tx) / g.size;
    const my = (py - g.ty) / g.size;
    const z2 = Math.min(this._mapMaxZoom(), Math.max(1, this._mapZoom * factor));
    const size2 = Math.min(g.w, g.h) * z2;
    // New centre so that (mx, my) stays under the pointer
    const cx = mx + (g.w / 2 - px) / size2;
    const cy = my + (g.h / 2 - py) / size2;
    if (animate) this._animateMapTo(z2, cx, cy);
    else this._setMapView(z2, cx, cy);
  }

  private _focusPlace(place: { key: string; left: number; top: number }, zoom = Math.max(this._mapZoom, 3)): void {
    this._mapPoi = place.key;
    this._animateMapTo(Math.min(this._mapMaxZoom(), zoom), place.left / 100, place.top / 100);
  }

  private _resetMapView(): void {
    this._animateMapTo(1, 0.5, 0.5);
  }

  private _mapFrameEl(): HTMLElement | null {
    return this.shadowRoot?.querySelector(".mapx-frame") as HTMLElement | null;
  }

  /** Keep the measured frame size current (drives all geometry). */
  private _observeMapFrame(): void {
    const frame = this._mapFrameEl();
    if (!frame || frame === this._mapObserved) return;
    this._mapResize?.disconnect();
    this._mapObserved = frame;
    this._mapResize = new ResizeObserver((entries) => {
      const r = entries[0].contentRect;
      if (Math.abs(r.width - this._mapBox.w) > 0.5 || Math.abs(r.height - this._mapBox.h) > 0.5) {
        this._mapBox = { w: r.width, h: r.height };
        this._setMapView(this._mapZoom, this._mapCenter.x, this._mapCenter.y);
      }
    });
    this._mapResize.observe(frame);
  }

  private _localPoint(e: { clientX: number; clientY: number }): { x: number; y: number } {
    const r = this._mapFrameEl()!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  /** Screen px -> map fraction. */
  private _toMap(p: { x: number; y: number }): { x: number; y: number } {
    const g = this._mapGeom();
    return { x: (p.x - g.tx) / g.size, y: (p.y - g.ty) / g.size };
  }

  private _onMapWheel(e: WheelEvent): void {
    if (!this._mapFrameEl()) return;
    e.preventDefault();
    const p = this._localPoint(e);
    this._zoomAt(Math.exp(-e.deltaY * 0.0015), p.x, p.y);
  }

  private _onMapPointerDown(e: PointerEvent): void {
    const frame = this._mapFrameEl();
    const target = e.target as HTMLElement;
    if (this._mapMenu) this._mapMenu = false;
    if (!frame || target.closest(".mapx-ui, .mapx-pin, .mapx-mark")) return;
    frame.setPointerCapture(e.pointerId);
    const p = this._localPoint(e);
    this._pointers.set(e.pointerId, p);
    const tool = this._pointers.size === 1 ? this._mapTool : "pan";
    if (tool === "draw") {
      const m = this._toMap(p);
      this._mapDrawing = { color: this._mapColor, points: [[m.x, m.y]] };
      return;
    }
    if (this._mapDrawing) this._mapDrawing = null; // second finger: pinch instead of drawing
    this._gesture = {
      z: this._mapZoom, cx: this._mapCenter.x, cy: this._mapCenter.y, moved: false, tool,
      start: new Map(this._pointers),
    };
  }

  private _onMapPointerMove(e: PointerEvent): void {
    if (!this._pointers.has(e.pointerId)) return;
    const p = this._localPoint(e);
    this._pointers.set(e.pointerId, p);
    if (this._mapDrawing) {
      const m = this._toMap(p);
      const last = this._mapDrawing.points[this._mapDrawing.points.length - 1];
      const g = this._mapGeom();
      if (Math.hypot((m.x - last[0]) * g.size, (m.y - last[1]) * g.size) > 3) {
        this._mapDrawing = { ...this._mapDrawing, points: [...this._mapDrawing.points, [m.x, m.y]] };
      }
      return;
    }
    const gs = this._gesture;
    if (!gs) return;
    const pts = [...this._pointers.values()];
    const starts = [...gs.start.values()];
    const g0 = this._mapGeom(gs.z, gs.cx, gs.cy);
    let z = gs.z;
    let anchorStart = starts[0];
    let anchorNow = pts[0];
    if (pts.length >= 2 && starts.length >= 2) {
      const d0 = Math.hypot(starts[0].x - starts[1].x, starts[0].y - starts[1].y) || 1;
      const d1 = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      z = gs.z * (d1 / d0);
      anchorStart = { x: (starts[0].x + starts[1].x) / 2, y: (starts[0].y + starts[1].y) / 2 };
      anchorNow = { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 };
    }
    if (Math.hypot(anchorNow.x - anchorStart.x, anchorNow.y - anchorStart.y) > 4 || z !== gs.z) gs.moved = true;
    // Map point that was under the anchor at gesture start stays under the anchor now
    const mx = (anchorStart.x - g0.tx) / g0.size;
    const my = (anchorStart.y - g0.ty) / g0.size;
    const zc = Math.min(this._mapMaxZoom(), Math.max(1, z));
    const size = Math.min(g0.w, g0.h) * zc;
    const cx = mx + (g0.w / 2 - anchorNow.x) / size;
    const cy = my + (g0.h / 2 - anchorNow.y) / size;
    // Throttle state updates to one per frame
    this._mapPending = { z: zc, cx, cy };
    if (!this._mapRaf) {
      this._mapRaf = requestAnimationFrame(() => {
        this._mapRaf = 0;
        if (this._mapPending) this._setMapView(this._mapPending.z, this._mapPending.cx, this._mapPending.cy);
      });
    }
  }

  private _onMapPointerUp(e: PointerEvent): void {
    const p = this._pointers.get(e.pointerId);
    this._pointers.delete(e.pointerId);
    if (this._mapDrawing) {
      const line = this._mapDrawing;
      this._mapDrawing = null;
      if (line.points.length > 1) this._annotate((a) => ({ ...a, lines: [...a.lines, { id: Date.now(), ...line }] }));
      return;
    }
    const gs = this._gesture;
    if (!gs) return;
    if (this._pointers.size === 0) {
      this._gesture = null;
      if (!gs.moved && p) this._onMapTap(p, gs.tool);
    } else {
      this._gesture = { z: this._mapZoom, cx: this._mapCenter.x, cy: this._mapCenter.y, moved: gs.moved, tool: "pan", start: new Map(this._pointers) };
    }
  }

  /** A tap (no drag) on the map: place a pin, erase, or clear the selection. */
  private _onMapTap(p: { x: number; y: number }, tool: string): void {
    if (tool === "marker") {
      const m = this._toMap(p);
      if (m.x < 0 || m.x > 1 || m.y < 0 || m.y > 1) return;
      this._annotate((a) => ({ ...a, marks: [...a.marks, { id: Date.now(), x: m.x, y: m.y, color: this._mapColor, icon: this._mapIcon }] }));
    } else if (tool === "erase") {
      const g = this._mapGeom();
      const near = (x: number, y: number) => Math.hypot(g.tx + x * g.size - p.x, g.ty + y * g.size - p.y);
      const a = this._annots();
      const mark = a.marks.find((m) => near(m.x, m.y) < 18);
      if (mark) return this._annotate((s) => ({ ...s, marks: s.marks.filter((m) => m.id !== mark.id) }));
      const line = a.lines.find((l) => l.points.some(([x, y]) => near(x, y) < 12));
      if (line) this._annotate((s) => ({ ...s, lines: s.lines.filter((l) => l.id !== line.id) }));
    }
  }

  private _onMapDblClick(e: MouseEvent): void {
    if ((e.target as HTMLElement).closest(".mapx-ui") || this._mapTool !== "pan") return;
    const p = this._localPoint(e);
    this._zoomAt(2, p.x, p.y, true);
  }

  // -- annotations (pins and lines), kept per player and map on this device --

  private _annotKey(): string {
    return `fortnite-map-notes:${this._player}:${this._mapMode}`;
  }

  private _annots(): { marks: any[]; lines: any[] } {
    const key = this._annotKey();
    if (!this._notes[key]) {
      let saved: any = null;
      try {
        saved = JSON.parse(localStorage.getItem(key) || "null");
      } catch {
        saved = null;
      }
      this._notes = { ...this._notes, [key]: { marks: saved?.marks || [], lines: saved?.lines || [] } };
    }
    return this._notes[key];
  }

  private _annotate(change: (a: { marks: any[]; lines: any[] }) => { marks: any[]; lines: any[] }): void {
    const key = this._annotKey();
    const before = this._annots();
    const after = change(before);
    this._undo = [...this._undo, { key, state: before }].slice(-50);
    this._redo = [];
    this._saveNotes(key, after);
  }

  private _saveNotes(key: string, state: { marks: any[]; lines: any[] }): void {
    this._notes = { ...this._notes, [key]: state };
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // Storage full or blocked: notes stay for this visit only
    }
  }

  private _undoNote(): void {
    const last = this._undo[this._undo.length - 1];
    if (!last) return;
    this._undo = this._undo.slice(0, -1);
    this._redo = [...this._redo, { key: last.key, state: this._notes[last.key] || { marks: [], lines: [] } }];
    this._saveNotes(last.key, last.state);
  }

  private _redoNote(): void {
    const next = this._redo[this._redo.length - 1];
    if (!next) return;
    this._redo = this._redo.slice(0, -1);
    this._undo = [...this._undo, { key: next.key, state: this._notes[next.key] || { marks: [], lines: [] } }];
    this._saveNotes(next.key, next.state);
  }

  private async _toggleMapFull(): Promise<void> {
    const frame = this._mapFrameEl() as any;
    const doc: any = document;
    if (this._mapFull) {
      if (doc.fullscreenElement) await doc.exitFullscreen().catch(() => undefined);
      this._mapFull = false;
      return;
    }
    this._mapFull = true;
    try {
      await frame?.requestFullscreen?.({ navigationUI: "hide" });
    } catch {
      // Not allowed (some app web views): the overlay still fills the window
    }
  }

  private _onFullscreenChange = (): void => {
    if (!document.fullscreenElement && this._mapFull) this._mapFull = false;
  };

  private _onKeyDown = (e: KeyboardEvent): void => {
    if (e.key === "Escape" && this._mapFull) this._toggleMapFull();
    if (this._renderedView === "map" && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
      e.preventDefault();
      if (e.shiftKey) this._redoNote();
      else this._undoNote();
    }
  };

  private _randomDrop(places: Array<any>): void {
    const named = places.filter((p) => p.type === "named");
    if (!named.length) return;
    let pick = named[Math.floor(Math.random() * named.length)];
    if (named.length > 1 && pick.key === this._mapDrop) pick = named[(named.indexOf(pick) + 1) % named.length];
    this._mapDrop = pick.key;
    this._focusPlace(pick, 2.5);
  }

  /** Details for a place: elevation and the nearest other places (world units are centimetres). */
  private _placeFacts(map: any, place: any) {
    const raw = (map.pois || [])[Number(String(place.key).split("#")[1])];
    if (!raw) return { elevation: null, nearest: [] as any[] };
    const all = this._mapPlaces(map);
    const nearest = all
      .filter((p) => p.key !== place.key && p.name !== place.name)
      .map((p) => {
        const o = (map.pois || [])[Number(String(p.key).split("#")[1])];
        return { ...p, metres: Math.round(Math.hypot(o.x - raw.x, o.y - raw.y) / 100) };
      })
      .sort((a, b) => a.metres - b.metres)
      .slice(0, 3);
    return { elevation: typeof raw.z === "number" ? Math.round(raw.z / 100) : null, nearest };
  }

  /** Small static map (match details): image only. */
  private _renderMapImage(map: any, compact = false) {
    return html`
      <div class="map-frame ${compact ? "compact" : ""}">
        <img @load=${imgLoaded} class="fi" src=${map.image} alt=${map.name || "Map"} loading="lazy" decoding="async" @error=${hideBroken} />
      </div>
    `;
  }

  private _renderMapPicker() {
    const modes: string[] = this._maps.br?.data?.modes || ["br"];
    const current = this._mapMode;
    const groups: Array<[string, string, string[]]> = [
      ["Battle Royale", "mdi:island", modes.filter((m) => m === "br")],
      ["OG", "mdi:gamepad-classic", modes.filter((m) => m === "og")],
      ["Reload & rotating", "mdi:autorenew", modes.filter((m) => m.startsWith("rotating:"))],
    ];
    const icon = current === "br" ? "mdi:island" : current === "og" ? "mdi:gamepad-classic" : "mdi:autorenew";
    const places = (m: string) => {
      const d = this._maps[m];
      if (d?.loading) return "loading…";
      const n = (d?.data?.pois || []).filter((p: any) => p.type !== "landmark").length;
      return d?.data ? `${n} places` : "";
    };
    return html`
      <div class="mapx-picker">
        <button class="mapx-current" aria-haspopup="listbox" aria-expanded=${this._mapMenu ? "true" : "false"}
          @click=${() => { this._mapMenu = !this._mapMenu; if (this._mapMenu) this._loadAllMaps(); }}>
          <ha-icon icon=${icon}></ha-icon>
          <span><b>${this._mapModeLabel(current)}</b><small>${modes.length > 1 ? `${modes.length} maps · tap to change` : "Map"}</small></span>
          <ha-icon icon=${this._mapMenu ? "mdi:chevron-up" : "mdi:chevron-down"}></ha-icon>
        </button>
        ${this._mapMenu
          ? html`<div class="mapx-menu" role="listbox">
              ${groups.filter(([, , list]) => list.length).map(([label, gicon, list]) => html`
                <div class="mapx-group"><ha-icon icon=${gicon}></ha-icon>${label}</div>
                ${list.map((m) => html`
                  <button class="mapx-option ${m === current ? "on" : ""}" role="option" aria-selected=${m === current ? "true" : "false"}
                    @click=${() => {
                      this._mapMode = m;
                      this._mapMenu = false;
                      this._mapPoi = null;
                      this._mapDrop = null;
                      this._setMapView(1, 0.5, 0.5);
                      this._loadMap(m);
                    }}>
                    <span>${this._mapModeLabel(m)}</span><small>${places(m)}</small>
                    ${m === current ? html`<ha-icon icon="mdi:check"></ha-icon>` : nothing}
                  </button>`)}`)}
            </div>`
          : nothing}
      </div>
    `;
  }

  private _renderPlacePickers(named: any[], landmarks: any[]) {
    const q = this._mapQuery.trim().toLowerCase();
    const match = (p: any) => !q || p.name.toLowerCase().includes(q) || p.grid.toLowerCase() === q;
    const groups = [...landmarks.filter(match).reduce((m, p) => m.set(p.name, [...(m.get(p.name) || []), p]), new Map<string, any[]>())]
      .sort((a, b) => a[0].localeCompare(b[0]));
    const namedList = named.filter(match).sort((a, b) => a.name.localeCompare(b.name));
    const sel = this._mapPoi;
    const onPick = (key: string) => {
      const p = [...named, ...landmarks].find((x) => x.key === key);
      if (p) this._focusPlace(p);
    };
    return html`
      <div class="mapx-search">
        <ha-icon icon="mdi:magnify"></ha-icon>
        <input type="search" placeholder="Find a place or grid (e.g. D4)" .value=${this._mapQuery}
          @input=${(e: any) => (this._mapQuery = e.target.value)}
          @keydown=${(e: KeyboardEvent) => {
            if (e.key === "Enter") {
              const first = [...namedList, ...groups.map((g) => g[1][0])][0];
              if (first) this._focusPlace(first);
            }
          }} />
      </div>
      <div class="mapx-selects">
        <label class="mapx-select">
          <ha-icon icon="mdi:map-marker"></ha-icon>
          <select @change=${(e: any) => { if (e.target.value) onPick(e.target.value); }}>
            <option value="" ?selected=${!named.some((p) => p.key === sel)}>Named places (${namedList.length})</option>
            ${namedList.map((p) => html`<option value=${p.key} ?selected=${p.key === sel}>${p.grid} · ${p.name}</option>`)}
          </select>
        </label>
        ${landmarks.length
          ? html`<label class="mapx-select landmark">
              <ha-icon icon="mdi:map-marker-star"></ha-icon>
              <select @change=${(e: any) => {
                const list = groups.find((g) => g[0] === e.target.value)?.[1] || [];
                const i = list.findIndex((p) => p.key === sel);
                if (list.length) {
                  if (!this._mapShowLandmarks) this._mapShowLandmarks = true;
                  this._focusPlace(list[(i + 1) % list.length]);
                }
              }}>
                <option value="" ?selected=${!landmarks.some((p) => p.key === sel)}>Landmarks (${landmarks.length})</option>
                ${groups.map(([name, list]) => html`<option value=${name} ?selected=${list.some((p) => p.key === sel)}>${list.length > 1 ? `×${list.length}` : list[0].grid} · ${name}</option>`)}
              </select>
            </label>`
          : nothing}
      </div>
    `;
  }

  private _renderPlaceInfo(map: any, places: any[], floating: boolean) {
    const selected = places.find((p) => p.key === this._mapPoi);
    if (!selected) {
      return floating ? nothing : html`<div class="mapx-hint">Tap a place on the map or pick one above to see details.</div>`;
    }
    const same = places.filter((p) => p.name === selected.name);
    const facts = this._placeFacts(map, selected);
    const isDrop = selected.key === this._mapDrop;
    return html`
      <div class="mapx-info ${floating ? "floating mapx-ui" : ""}">
        <div class="mapx-info-head">
          <span class="mapx-grid-badge">${selected.grid}</span>
          <div>
            <b>${isDrop ? "🪂 Drop here: " : ""}${selected.name}</b>
            <small>${selected.type === "landmark" ? "Landmark" : "Named place"}${same.length > 1 ? ` · ${same.indexOf(selected) + 1} of ${same.length}` : ""}</small>
          </div>
          <button class="mapx-tool" title="Close" @click=${() => { this._mapPoi = null; this._mapDrop = null; }}><ha-icon icon="mdi:close"></ha-icon></button>
        </div>
        <div class="mapx-facts">
          ${facts.elevation != null ? html`<span><ha-icon icon="mdi:image-filter-hdr"></ha-icon>${facts.elevation} m high</span>` : nothing}
          <span><ha-icon icon="mdi:grid"></ha-icon>Grid ${selected.grid}</span>
        </div>
        ${facts.nearest.length
          ? html`<div class="mapx-near">
              <small>Nearby</small>
              ${facts.nearest.map((n) => html`<button @click=${() => this._focusPlace(n)}>${n.name} <em>${n.metres} m</em></button>`)}
            </div>`
          : nothing}
        <div class="mapx-info-actions">
          <button class="mini-button" @click=${() => this._focusPlace(selected)}><ha-icon icon="mdi:crosshairs-gps"></ha-icon> Zoom to</button>
          ${same.length > 1
            ? html`<button class="mini-button" @click=${() => this._focusPlace(same[(same.indexOf(selected) + 1) % same.length])}><ha-icon icon="mdi:chevron-right"></ha-icon> Next</button>`
            : nothing}
          <button class="mini-button" @click=${() => this._annotate((a) => ({ ...a, marks: [...a.marks, { id: Date.now(), x: selected.left / 100, y: selected.top / 100, color: this._mapColor, icon: "📍" }] }))}>
            <ha-icon icon="mdi:map-marker-plus"></ha-icon> Pin it</button>
        </div>
      </div>
    `;
  }

  private _renderMapView() {
    const st = this._maps[this._mapMode] || {};
    if (st.loading || (st.data === undefined && !st.error)) return html`${this._renderMapPicker()}<div class="empty">Loading map…</div>`;
    if (st.error) return html`${this._renderMapPicker()}<div class="empty">${st.error}</div>`;
    const map = st.data;
    if (!map) return html`${this._renderMapPicker()}<div class="empty">This map will show here soon.</div>`;

    const places = this._mapPlaces(map);
    const named = places.filter((p) => p.type === "named");
    const landmarks = places.filter((p) => p.type === "landmark");
    const z = this._mapZoom;
    const g = this._mapGeom();
    const at = (fx: number, fy: number) => ({ x: g.tx + fx * g.size, y: g.ty + fy * g.size });
    const wide = this._mapFull || g.w >= 560;
    const showNamed = this._mapLabels === "all" || (this._mapLabels === "auto" && (wide || z >= 1.6));
    const showLandmarkLabels = this._mapLabels === "all" ? z >= 1.6 : this._mapLabels === "auto" && z >= 3;
    const notes = this._annots();
    const drop = places.find((p) => p.key === this._mapDrop);
    const tool = (icon: string, title: string, onClick: () => void, on = false, disabled = false) => html`
      <button class="mapx-tool ${on ? "on" : ""}" title=${title} aria-label=${title} ?disabled=${disabled} @click=${onClick}><ha-icon icon=${icon}></ha-icon></button>`;
    const labelIcon = this._mapLabels === "off" ? "mdi:label-off-outline" : this._mapLabels === "all" ? "mdi:label-multiple" : "mdi:label-outline";
    const path = (pts: number[][]) => pts.map(([x, y], i) => `${i ? "L" : "M"}${(g.tx + x * g.size).toFixed(1)} ${(g.ty + y * g.size).toFixed(1)}`).join(" ");
    const colors = ["#F43F5E", "#FACC15", "#22C55E", "#38BDF8", "#A855F7", "#FFFFFF"];
    const icons = ["📍", "⭐", "🎯", "⚠️", "🏠", "💰"];
    const drawing = this._mapTool !== "pan";

    return html`
      <div class="mapx ${this._mapFull ? "full" : ""}">
        ${this._mapFull ? nothing : html`<div class="mapx-top">
          ${this._renderMapPicker()}
          <div class="mapx-meta">
            ${map.chapter && map.season ? html`<span>Chapter ${map.chapter} · Season ${map.season}</span>` : nothing}
            ${map.patch ? html`<span>Update ${map.patch}</span>` : nothing}
            <span>${named.length} places${landmarks.length ? ` · ${landmarks.length} landmarks` : ""}</span>
          </div>
        </div>`}

        <div class="mapx-frame ${this._mapFull ? "fs" : ""} ${this._gesture ? "dragging" : ""} tool-${this._mapTool}"
          @wheel=${(e: WheelEvent) => this._onMapWheel(e)}
          @pointerdown=${(e: PointerEvent) => this._onMapPointerDown(e)}
          @pointermove=${(e: PointerEvent) => this._onMapPointerMove(e)}
          @pointerup=${(e: PointerEvent) => this._onMapPointerUp(e)}
          @pointercancel=${(e: PointerEvent) => this._onMapPointerUp(e)}
          @dblclick=${(e: MouseEvent) => this._onMapDblClick(e)}>
          <!-- The image is laid out at its real on-screen size so the browser resamples it sharply -->
          <img class="mapx-img" src=${map.image} alt=${map.name || "Map"} draggable="false" decoding="async"
            style="left:${g.tx}px;top:${g.ty}px;width:${g.size}px;height:${g.size}px" @error=${hideBroken} />

          <svg class="mapx-ink" width=${g.w} height=${g.h} viewBox="0 0 ${g.w} ${g.h}">
            ${this._mapGrid
              ? [...Array(11).keys()].map((i) => svg`
                  <line x1=${g.tx + (i * g.size) / 10} y1=${g.ty} x2=${g.tx + (i * g.size) / 10} y2=${g.ty + g.size} class="gl" />
                  <line x1=${g.tx} y1=${g.ty + (i * g.size) / 10} x2=${g.tx + g.size} y2=${g.ty + (i * g.size) / 10} class="gl" />`)
              : nothing}
            ${notes.lines.map((l) => svg`<path d=${path(l.points)} stroke=${l.color} class="ln" />`)}
            ${this._mapDrawing ? svg`<path d=${path(this._mapDrawing.points)} stroke=${this._mapDrawing.color} class="ln live" />` : nothing}
          </svg>

          ${this._mapGrid
            ? [...Array(10).keys()].map((i) => html`
                <span class="mapx-gridlabel col" style="left:${g.tx + ((i + 0.5) * g.size) / 10}px;top:${Math.max(4, g.ty + 4)}px">${"ABCDEFGHIJ"[i]}</span>
                <span class="mapx-gridlabel row" style="left:${Math.max(4, g.tx + 4)}px;top:${g.ty + ((i + 0.5) * g.size) / 10}px">${i + 1}</span>`)
            : nothing}

          ${places
            .filter((p) => p.type === "named" || this._mapShowLandmarks || p.key === this._mapPoi)
            .map((p) => {
              const s = at(p.left / 100, p.top / 100);
              if (s.x < -60 || s.y < -30 || s.x > g.w + 60 || s.y > g.h + 30) return nothing;
              const on = p.key === this._mapPoi;
              const label = on || (p.type === "named" ? showNamed : showLandmarkLabels);
              return html`
                <button class="mapx-pin ${p.type} ${on ? "on" : ""}" style="left:${s.x}px;top:${s.y}px"
                  title="${p.name} · ${p.grid}" aria-label="${p.name}, grid ${p.grid}"
                  @click=${(e: Event) => { e.stopPropagation(); this._mapPoi = on ? null : p.key; }}>
                  <i></i>${label ? html`<b>${p.name}</b>` : nothing}
                </button>`;
            })}

          ${notes.marks.map((m) => {
            const s = at(m.x, m.y);
            return html`<span class="mapx-mark" style="left:${s.x}px;top:${s.y}px;--c:${m.color}"
              @click=${(e: Event) => { if (this._mapTool === "erase") { e.stopPropagation(); this._annotate((a) => ({ ...a, marks: a.marks.filter((x) => x.id !== m.id) })); } }}>${m.icon || "📍"}</span>`;
          })}

          ${drop
            ? (() => {
                const s = at(drop.left / 100, drop.top / 100);
                return html`<div class="mapx-drop" style="left:${s.x}px;top:${s.y}px"><i></i><i></i><span>🪂</span><b>Drop here!</b></div>`;
              })()
            : nothing}

          ${this._mapFull
            ? html`<div class="mapx-ui mapx-float-top">
                ${this._renderMapPicker()}
                ${this._renderPlacePickers(named, landmarks)}
              </div>
              ${this._renderPlaceInfo(map, places, true)}`
            : nothing}

          <div class="mapx-ui mapx-tools">
            ${tool(this._mapFull ? "mdi:fullscreen-exit" : "mdi:fullscreen", this._mapFull ? "Exit full screen" : "Full screen", () => this._toggleMapFull())}
            <span class="mapx-sep"></span>
            ${tool("mdi:grid", "Grid", () => (this._mapGrid = !this._mapGrid), this._mapGrid)}
            ${tool(labelIcon, `Labels: ${this._mapLabels === "auto" ? "automatic" : this._mapLabels}`, () => {
              this._mapLabels = this._mapLabels === "auto" ? "all" : this._mapLabels === "all" ? "off" : "auto";
            }, this._mapLabels !== "auto")}
            ${landmarks.length ? tool("mdi:map-marker-star-outline", "Landmarks", () => (this._mapShowLandmarks = !this._mapShowLandmarks), this._mapShowLandmarks) : nothing}
            ${named.length ? tool("mdi:parachute-outline", "Pick a drop spot for me", () => this._randomDrop(places)) : nothing}
            <span class="mapx-sep"></span>
            ${tool("mdi:draw", "Draw & pins", () => (this._mapTool = drawing ? "pan" : "draw"), drawing)}
          </div>

          <div class="mapx-ui mapx-zoombar">
            ${tool("mdi:plus", "Zoom in", () => this._zoomAt(1.6, undefined, undefined, true), false, z >= this._mapMaxZoom() - 0.01)}
            <span class="mapx-zoomval">${z.toFixed(1)}×</span>
            ${tool("mdi:minus", "Zoom out", () => this._zoomAt(1 / 1.6, undefined, undefined, true), false, z <= 1)}
            ${tool("mdi:fit-to-screen-outline", "Whole map", () => this._resetMapView(), false, z === 1)}
          </div>

          ${drawing
            ? html`<div class="mapx-ui mapx-drawbar">
                ${tool("mdi:pencil", "Pen", () => (this._mapTool = "draw"), this._mapTool === "draw")}
                ${tool("mdi:map-marker-plus", "Pin", () => (this._mapTool = "marker"), this._mapTool === "marker")}
                ${tool("mdi:eraser", "Eraser", () => (this._mapTool = "erase"), this._mapTool === "erase")}
                <span class="mapx-sep v"></span>
                ${colors.map((c) => html`<button class="mapx-swatch ${this._mapColor === c ? "on" : ""}" style="--c:${c}" title="Colour" @click=${() => (this._mapColor = c)}></button>`)}
                ${this._mapTool === "marker"
                  ? html`<span class="mapx-sep v"></span>${icons.map((i) => html`<button class="mapx-emoji ${this._mapIcon === i ? "on" : ""}" @click=${() => (this._mapIcon = i)}>${i}</button>`)}`
                  : nothing}
                <span class="mapx-sep v"></span>
                ${tool("mdi:undo", "Undo (Ctrl+Z)", () => this._undoNote(), false, !this._undo.length)}
                ${tool("mdi:redo", "Redo (Ctrl+Shift+Z)", () => this._redoNote(), false, !this._redo.length)}
                ${tool("mdi:delete-sweep-outline", "Clear all", () => this._annotate(() => ({ marks: [], lines: [] })), false, !notes.marks.length && !notes.lines.length)}
                ${tool("mdi:check", "Done", () => (this._mapTool = "pan"))}
              </div>`
            : nothing}
        </div>

        ${this._mapFull
          ? nothing
          : html`<div class="mapx-side">
              ${this._renderPlacePickers(named, landmarks)}
              ${this._renderPlaceInfo(map, places, false)}
            </div>`}
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
      if (this._spriteFilter === "new") return f.new || f.new_kinds > 0;
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
      ${a.new_sprites || a.new_kinds
        ? html`<button class="sp-release ${this._spriteFilter === "new" ? "on" : ""}" @click=${() => (this._spriteFilter = this._spriteFilter === "new" ? "all" : "new")}>
            <span class="sp-release-badge">✨ NEW</span>
            <span><b>Update ${a.version}</b> added ${[
              a.new_sprites ? `${a.new_sprites} new sprite${a.new_sprites > 1 ? "s" : ""}` : "",
              a.new_kinds ? `${a.new_kinds} new kind${a.new_kinds > 1 ? "s" : ""}` : "",
            ].filter(Boolean).join(" and ")}</span>
            <small>${this._spriteFilter === "new" ? "Show all" : "Show them"}</small>
          </button>`
        : nothing}
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
                  ${v.icon ? html`<img @load=${imgLoaded} decoding="async" loading="lazy" class="fi" src=${v.icon} alt="" @error=${hideBroken} />` : nothing}
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
                  ${v.icon ? html`<img @load=${imgLoaded} decoding="async" loading="lazy" class="fi" src=${v.icon} alt="" @error=${hideBroken} />` : nothing}
                  <span>${v.label === "Base" ? this._spriteName(f) : `${v.label} ${this._spriteName(f)}`}</span>
                  <small>${v.drop_chance_pct}% chance</small>
                </div>`)}
            </div>
          </div>`
        : nothing}

      <div class="tab-rows">
        <div class="mode-tabs">${chip("all", "All")} ${chip("mastered", "⭐ Mastered")} ${chip("unmastered", "Not mastered")} ${chip("missing", "Not found")} ${a.new_sprites || a.new_kinds ? chip("new", "✨ New") : nothing}</div>
        <div class="mode-tabs">${sortChip("dex", "Number")} ${sortChip("rarity", "Rarity")} ${sortChip("progress", "Most kinds")}</div>
      </div>

      <div class="sp-grid">
        ${sorted.length
          ? sorted.map((f) => {
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
                <div class="sp-card ${f.owned ? "" : "missing"} ${info.mastered ? "mastered" : ""} ${f.new ? "is-new" : ""}"
                  style="--rarity:${RARITY_COLORS[f.rarity] || "#9CA3AF"}" role="button" tabindex="0"
                  @click=${() => (this._expandedSprite = f.id)}
                  @keydown=${(e: KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); this._expandedSprite = f.id; } }}>
                  <div class="sp-img">
                    ${f.icon ? html`<img @load=${imgLoaded} decoding="async" loading="lazy" class="fi" src=${f.icon} alt="" @error=${hideBroken} />` : html`<ha-icon icon="mdi:ghost-outline"></ha-icon>`}
                    ${info.mastered ? html`<span class="sp-badge star" title="Mastered">⭐</span>` : nothing}
                    ${!f.owned ? html`<span class="sp-badge lock"><ha-icon icon="mdi:lock"></ha-icon></span>` : nothing}
                    ${f.new
                      ? html`<span class="sp-badge new" title="New this update">NEW</span>`
                      : f.new_kinds
                        ? html`<span class="sp-newdot" title="${f.new_kinds} new kind${f.new_kinds > 1 ? "s" : ""} this update"></span>`
                        : nothing}
                  </div>
                  <span class="sp-name">${this._spriteName(f)}</span>
                  ${status}
                  ${have}
                  <div class="sp-kinds" title="${info.owned} of ${info.total} kinds">
                    ${(f.variants || []).map((v: any) => html`
                      <span class="sp-kind ${v.owned ? "owned" : ""} ${v.mastered ? "mastered" : ""} ${v.new && !f.new ? "new" : ""}" title="${v.label}${v.new ? " · new this update" : ""}${v.owned ? "" : " (not found yet)"}">
                        ${v.icon ? html`<img @load=${imgLoaded} decoding="async" loading="lazy" class="fi" src=${v.icon} alt="" @error=${hideBroken} />` : nothing}
                      </span>`)}
                  </div>
                  <span class="sp-kinds-text">${info.owned} of ${info.total} kinds</span>
                </div>`;
            })
          : html`<div class="empty">No sprites here yet.</div>`}
      </div>

      ${this._expandedSprite ? this._renderSpriteSheet(all, sorted) : nothing}

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

  /** Sprite details in a modal sheet (native <dialog>: top layer, Esc and backdrop close). */
  private _renderSpriteSheet(all: any[], list: any[]) {
    const order = list.some((f) => f.id === this._expandedSprite) ? list : all;
    const i = order.findIndex((f) => f.id === this._expandedSprite);
    const f = order[i];
    if (!f) return nothing;
    const go = (d: number) => (this._expandedSprite = order[(i + d + order.length) % order.length].id);
    return html`
      <dialog class="sp-sheet" style="--rarity:${RARITY_COLORS[f.rarity] || "#9CA3AF"}"
        @close=${() => (this._expandedSprite = null)}
        @click=${(e: Event) => { if (e.target === e.currentTarget) (e.currentTarget as HTMLDialogElement).close(); }}
        @keydown=${(e: KeyboardEvent) => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); }}>
        <div class="sp-sheet-body">
          <div class="sp-sheet-nav">
            <button class="bp-nav" title="Previous sprite" @click=${() => go(-1)}><ha-icon icon="mdi:chevron-left"></ha-icon></button>
            <span>${i + 1} of ${order.length}</span>
            <button class="bp-nav" title="Next sprite" @click=${() => go(1)}><ha-icon icon="mdi:chevron-right"></ha-icon></button>
            <button class="bp-nav close" title="Close" @click=${(e: Event) => ((e.currentTarget as HTMLElement).closest("dialog") as HTMLDialogElement)?.close()}><ha-icon icon="mdi:close"></ha-icon></button>
          </div>
          ${this._renderSpriteDetail(f)}
        </div>
      </dialog>`;
  }

  private _renderSpriteDetail(f: any) {
    const curve = this._spriteCurve(this._findEntity("sensor", "sprites")?.attributes || {});
    const familyBoon = f.name;
    return html`
      <div class="sprite-detail sp-detail" style="--rarity:${RARITY_COLORS[f.rarity] || "#9CA3AF"}">
        <div class="sprite-detail-head">
          ${f.icon_large || f.icon ? html`<img @load=${imgLoaded} decoding="async" loading="lazy" class="fi" src=${f.icon_large || f.icon} alt="" @error=${hideBroken} />` : nothing}
          <div>
            <b>${f.name}</b> <span class="tag rarity-tag">${f.rarity || ""}</span>
            ${f.new ? html`<span class="sp-chip new">✨ New this update</span>` : f.added_in ? html`<span class="sp-chip dim">Added in update ${f.added_in}</span>` : nothing}
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
                  ${v.icon ? html`<img @load=${imgLoaded} decoding="async" loading="lazy" class="fi" src=${v.icon} alt="" @error=${hideBroken} />` : html`<ha-icon icon="mdi:ghost-outline"></ha-icon>`}
                  ${!v.owned ? html`<span class="sp-badge lock"><ha-icon icon="mdi:lock"></ha-icon></span>` : nothing}
                </div>
                <div class="sp-kind-main">
                  <div class="sp-kind-title">
                    <b>${v.label}</b>
                    ${v.new && !f.new ? html`<span class="sp-chip new">✨ New kind</span>` : nothing}
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
          ? html`<img @load=${imgLoaded} decoding="async" loading="lazy" class="fi feature-art" src=${art} alt="" @error=${hideBroken} />`
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
    const region = this._config.events_region || this._events.defaultRegion || "EU";
    return { region: region === "all" ? [] : [region], type: [], mode: [], team: [], platform: [] };
  }

  private _currentFilters(): EventFilters {
    return this._filters || this._defaultFilters();
  }

  private _matchesFilters(e: any, f: EventFilters): boolean {
    if (f.region.length && !f.region.includes(e.region_group)) return false;
    if (f.type.length && !f.type.includes(e.tournament_type)) return false;
    if (f.mode.length && !f.mode.some((m) => (m === "Ranked" ? e.ranked : e.mode === m))) return false;
    if (f.team.length && !f.team.includes(e.team)) return false;
    if (f.platform.length && !f.platform.some((p) => (e.platform_groups || []).includes(p))) return false;
    return true;
  }

  private _toggleFilter(key: keyof EventFilters, value: string): void {
    const cur = this._currentFilters();
    const list = cur[key].includes(value) ? cur[key].filter((v) => v !== value) : [...cur[key], value];
    this._filters = { ...cur, [key]: list };
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

    const groups: Array<[keyof EventFilters, string, Array<[string, string]>]> = [
      ["region", "Region", regions.map((r) => [r, r] as [string, string])],
      ["type", "Type", [...new Set(all.map((e) => e.tournament_type).filter(Boolean))].map((t: any) => [t, TOURNAMENT_TYPES[t] || t] as [string, string])],
      ["mode", "Mode", [["Battle Royale", "Battle Royale"], ["Zero Build", "Zero Build"], ["Reload", "Reload"], ["Ranked", "Ranked"]]],
      ["team", "Team", [["Solo", "Solo"], ["Duos", "Duos"], ["Trios", "Trios"], ["Squads", "Squads"]]],
      ["platform", "Platform", [["PC", "PC"], ["Console", "Console"], ["Mobile", "Mobile"]]],
    ];
    const labelFor = (key: keyof EventFilters, value: string) => groups.find((g) => g[0] === key)?.[2].find((o) => o[0] === value)?.[1] || value;
    const active = groups.flatMap(([key]) => f[key].map((v) => [key, v] as [keyof EventFilters, string]));
    const changed = JSON.stringify(f) !== JSON.stringify(this._defaultFilters());

    return html`
      <div class="filter-bar">
        <button class="filter-toggle ${this._filtersOpen ? "open" : ""}" @click=${() => (this._filtersOpen = !this._filtersOpen)}>
          <ha-icon icon="mdi:filter-variant"></ha-icon><span>Filters</span>${active.length ? html`<b>${active.length}</b>` : nothing}
        </button>
        <div class="filter-active">
          ${active.length
            ? active.map(([key, v]) => html`<button class="fchip on" title="Remove" @click=${() => this._toggleFilter(key, v)}>${labelFor(key, v)} ✕</button>`)
            : html`<span class="muted">All tournaments</span>`}
        </div>
        ${changed
          ? html`<button class="filter-reset" @click=${() => (this._filters = null)} title="Reset filters"><ha-icon icon="mdi:filter-remove-outline"></ha-icon></button>`
          : nothing}
      </div>
      ${this._filtersOpen
        ? html`<div class="filter-panel">
            ${groups.map(([key, label, options]) => options.length
              ? html`<div class="fgroup"><span>${label}</span><div>
                  ${options.map(([value, text]) => html`<button class="fchip ${f[key].includes(value) ? "on" : ""}" @click=${() => this._toggleFilter(key, value)}>${text}</button>`)}
                </div></div>`
              : nothing)}
          </div>`
        : nothing}
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
          ${e.poster ? html`<img @load=${imgLoaded} decoding="async" class="fi event-art" src=${e.poster} alt="" loading="lazy" @error=${hideBroken} />` : nothing}
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
        ${hero ? html`<img @load=${imgLoaded} decoding="async" loading="lazy" class="fi event-hero" src=${hero} alt="" @error=${hideBroken} />` : nothing}
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
