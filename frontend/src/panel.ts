/**
 * Full-screen family panel: one landscape page per player, swipe (or tap a name) to switch.
 * Each page is a row of columns, and each column is a regular fortnite-activity-card showing
 * the sections listed for it.
 */
import { LitElement, html, css, nothing, PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { trackedPlayers } from "./types";

interface PanelColumn {
  sections: string[];
  header?: "full" | "slim" | "none";
  default_section?: string;
}

interface PanelConfig {
  type: string;
  players?: string[];
  columns?: PanelColumn[];
  kid_mode?: boolean | string[];
  compact?: boolean;
  card_style?: string;
  height?: string;
}

const DEFAULT_COLUMNS: PanelColumn[] = [
  { sections: ["session", "stats", "trends"], header: "full" },
  { sections: ["pass", "sprites", "locker"], header: "none", default_section: "pass" },
  { sections: ["events", "shop", "news", "map"], header: "none", default_section: "events" },
];

export class FortniteFamilyPanel extends LitElement {
  @property({ attribute: false }) public hass?: any;
  @state() private _config: PanelConfig = { type: "custom:fortnite-family-panel" };
  @state() private _index = 0;
  private _cards: HTMLElement[] = [];

  public setConfig(config: PanelConfig): void {
    if (!config) throw new Error("Invalid configuration");
    this._config = { ...config };
    this._cards = [];
  }

  public getCardSize(): number {
    return 12;
  }

  public static getStubConfig(hass?: any): Record<string, any> {
    return { type: "custom:fortnite-family-panel", players: trackedPlayers(hass) };
  }

  private get _players(): string[] {
    const list = (this._config.players || []).map((p) => String(p).toLowerCase()).filter(Boolean);
    // No players configured: show everyone the integration tracks
    return list.length ? list : trackedPlayers(this.hass);
  }

  private _kid(player: string): boolean {
    const k = this._config.kid_mode;
    return Array.isArray(k) ? k.map((p) => String(p).toLowerCase()).includes(player) : !!k;
  }

  private _buildCards(): void {
    const columns = this._config.columns?.length ? this._config.columns : DEFAULT_COLUMNS;
    this._cards = [];
    for (const player of this._players) {
      for (const col of columns) {
        const el = document.createElement("fortnite-activity-card") as any;
        el.setConfig({
          type: "custom:fortnite-activity-card",
          player,
          sections: col.sections,
          header: col.header || "none",
          default_section: col.default_section || "auto",
          show_sub_buttons: col.sections.includes("session"),
          compact: this._config.compact ?? false,
          card_style: this._config.card_style || "bubble",
          kid_mode: this._kid(player),
        });
        el.dataset.player = player;
        this._cards.push(el);
      }
    }
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has("_config") || !this._cards.length) {
      this._buildCards();
      // Nothing to show until hass lists a tracked player; re-rendering then would loop
      if (this._cards.length) this.requestUpdate();
    }
    for (const el of this._cards) (el as any).hass = this.hass;
  }

  private _displayName(player: string): string {
    const st = Object.values<any>(this.hass?.states || {}).find(
      (s) => s.attributes?.fortnite_player_id === player && s.attributes?.fortnite_entity_key === "profile",
    );
    return st?.attributes?.display_name || player.charAt(0).toUpperCase() + player.slice(1);
  }

  private _scrollTo(i: number): void {
    const track = this.shadowRoot?.querySelector(".track") as HTMLElement | null;
    if (!track) return;
    track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" });
    this._index = i;
  }

  private _onScroll(e: Event): void {
    const track = e.target as HTMLElement;
    const i = Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
    if (i !== this._index) this._index = i;
  }

  protected render() {
    if (!this.hass) return nothing;
    const columns = (this._config.columns?.length ? this._config.columns : DEFAULT_COLUMNS).length;
    const players = this._players;
    return html`
      <div class="panel" style="--panel-height:${this._config.height || "calc(100vh - var(--header-height, 56px) - 16px)"}">
        ${players.length > 1
          ? html`<div class="nav">
              ${players.map((p, i) => html`<button class=${i === this._index ? "on" : ""} @click=${() => this._scrollTo(i)}>${this._displayName(p)}</button>`)}
            </div>`
          : nothing}
        <div class="track" @scroll=${this._onScroll}>
          ${players.map((p) => html`
            <section class="page" style="--cols:${columns}">
              ${this._cards.filter((c) => c.dataset.player === p).map((c) => html`<div class="col">${c}</div>`)}
            </section>`)}
        </div>
      </div>
    `;
  }

  static styles = css`
    :host { display: block; }
    .panel { height: var(--panel-height); display: flex; flex-direction: column; gap: 8px; }
    .nav { display: flex; justify-content: center; gap: 8px; flex: 0 0 auto; }
    .nav button {
      font: inherit;
      font-weight: 800;
      padding: 6px 18px;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      background: rgba(255, 255, 255, 0.05);
      color: var(--primary-text-color, #fff);
      cursor: pointer;
    }
    .nav button.on { background: var(--accent-color, #00e5ff); color: #0b0f19; border-color: transparent; }
    .track {
      flex: 1 1 auto;
      min-height: 0;
      display: flex;
      overflow-x: auto;
      overflow-y: hidden;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
    }
    .track::-webkit-scrollbar { display: none; }
    .page {
      flex: 0 0 100%;
      scroll-snap-align: start;
      display: grid;
      grid-template-columns: repeat(var(--cols), minmax(0, 1fr));
      gap: 12px;
      padding: 0 8px;
      box-sizing: border-box;
      min-height: 0;
    }
    .col { min-height: 0; overflow-y: auto; scrollbar-width: thin; }
    @media (orientation: portrait), (max-width: 900px) {
      .page { grid-template-columns: minmax(0, 1fr); overflow-y: auto; }
      .col { overflow: visible; }
    }
  `;
}

if (!customElements.get("fortnite-family-panel")) {
  customElements.define("fortnite-family-panel", FortniteFamilyPanel);
  (window as any).customCards = (window as any).customCards || [];
  (window as any).customCards.push({
    type: "fortnite-family-panel",
    name: "Fortnite Family Panel",
    description: "Full-screen landscape page per player; swipe between players.",
  });
}
