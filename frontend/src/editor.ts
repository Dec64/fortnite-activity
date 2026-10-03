import { LitElement, html, css, nothing } from "lit";
import { property, state, customElement } from "lit/decorators.js";
import { FortniteCardConfig } from "./types";

const SECTION_OPTIONS = [
  { value: "session", label: "Live / Last Session" },
  { value: "stats", label: "Stats & Ranks" },
  { value: "events", label: "Events (tournaments)" },
  { value: "sprites", label: "Sprites" },
  { value: "trends", label: "Trends" },
  { value: "pass", label: "Battle Pass" },
  { value: "locker", label: "Locker (owned outfits)" },
  { value: "shop", label: "Item Shop & wishlist" },
  { value: "news", label: "News & updates" },
  { value: "map", label: "Map" },
];

// Same mapping as the card uses for configs saved before `sections` existed
const legacySections = (c: FortniteCardConfig): string[] => {
  if (c.layout === "session_only") return ["session"];
  if (c.layout === "career_only") return ["stats"];
  if (c.layout === "events_only") return ["events"];
  return SECTION_OPTIONS.map((o) => o.value).filter((s) => s !== "events" || c.show_tournaments !== false);
};

const SCHEMA = [
  {
    name: "player",
    label: "Tracked Player Key (e.g. player1, player2)",
    selector: { text: {} },
  },
  {
    name: "avatar",
    label: "Avatar skin name (optional; overrides the avatar chosen in the Locker section)",
    selector: { text: {} },
  },
  {
    name: "sections",
    label: "Sections to show (tab order follows this list; drag to reorder)",
    selector: { select: { multiple: true, reorder: true, mode: "list", options: SECTION_OPTIONS } },
  },
  {
    name: "default_section",
    label: "Section opened first",
    selector: {
      select: {
        mode: "dropdown",
        options: [{ value: "auto", label: "Automatic (Live Session while playing, otherwise Stats)" }, ...SECTION_OPTIONS],
      },
    },
  },
  {
    name: "header",
    label: "Header",
    selector: {
      select: {
        mode: "dropdown",
        options: [
          { value: "full", label: "Full (ranks, season, levels, platforms)" },
          { value: "slim", label: "Slim (name, V-Bucks, live status)" },
          { value: "none", label: "None" },
        ],
      },
    },
  },
  {
    name: "card_style",
    label: "Visual Theme",
    selector: {
      select: {
        options: [
          { value: "bubble", label: "Bubble (follows your HA / Bubble Card theme)" },
          { value: "cyber_fortnite", label: "Cyber Fortnite (neon gradients)" },
          { value: "minimal", label: "Minimal (flat, no chrome)" },
        ],
      },
    },
  },
  {
    name: "theme_accent",
    label: "Accent Tint",
    selector: {
      select: {
        options: [
          { value: "auto", label: "Inherit Theme Accent (--bubble-accent-color)" },
          { value: "victory_gold", label: "Victory Gold (#FFD700)" },
          { value: "slurp_cyan", label: "Slurp Cyan (#00E5FF)" },
          { value: "storm_purple", label: "Storm Purple (#A855F7)" },
        ],
      },
    },
  },
  {
    name: "show_match_feed",
    label: "Show Match-by-Match Timeline",
    selector: { boolean: {} },
  },
  {
    name: "show_sub_buttons",
    label: "Show action buttons (Start/End Session, Refresh)",
    selector: { boolean: {} },
  },
  {
    name: "compact",
    label: "Compact mode (smaller buttons, inline stats)",
    selector: { boolean: {} },
  },
  {
    name: "events_region",
    label: "Default events region filter",
    selector: {
      select: {
        options: [
          { value: "EU", label: "Europe" },
          { value: "NA", label: "North America" },
          { value: "BR", label: "Brazil" },
          { value: "ASIA", label: "Asia" },
          { value: "OCE", label: "Oceania" },
          { value: "ME", label: "Middle East" },
          { value: "all", label: "All regions" },
        ],
      },
    },
  },
  {
    name: "hide_vbucks",
    label: "Hide V-Bucks balance (e.g. on a shared/family screen)",
    selector: { boolean: {} },
  },
  {
    name: "kid_mode",
    label: "Kid mode (bigger, simpler layout)",
    selector: { boolean: {} },
  },
  {
    name: "max_feed_matches",
    label: "Max Matches in Session Feed",
    selector: { number: { min: 3, max: 20, mode: "slider" } },
  },
  {
    name: "hide_account_level",
    label: "Hide Account Level (shown only once an Epic login is available)",
    selector: { boolean: {} },
  },
  {
    name: "hide_season_level",
    label: "Hide Season Level (shown only once an Epic login is available)",
    selector: { boolean: {} },
  },
  {
    name: "hide_rank_progress",
    label: "Hide Rank Progress Bars",
    selector: { boolean: {} },
  },
  {
    name: "custom_background",
    label: "Custom Background Image URL",
    selector: { text: {} },
  },
];

export class FortniteActivityCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: any;
  @state() private _config?: FortniteCardConfig;

  public setConfig(config: FortniteCardConfig): void {
    this._config = {
      header: "full",
      default_section: "auto",
      card_style: "bubble",
      theme_accent: "auto",
      show_match_feed: true,
      show_sub_buttons: true,
      show_tournaments: true,
      max_feed_matches: 10,
      ...config,
    };
    if (!Array.isArray(this._config.sections) || !this._config.sections.length) {
      this._config.sections = legacySections(this._config);
    }
  }

  private _valueChanged(ev: CustomEvent): void {
    if (!this._config || !this.hass) return;
    const target = ev.target as any;
    const value = ev.detail ? ev.detail.value : target.value;
    this._config = {
      ...this._config,
      ...value,
    };
    // `sections` replaces the legacy layout / events toggle once the card is saved from the editor
    delete (this._config as any).layout;
    delete (this._config as any).show_tournaments;

    const event = new CustomEvent("config-changed", {
      detail: { config: this._config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  protected render() {
    if (!this.hass || !this._config) {
      return nothing;
    }

    return html`
      <div class="card-config">
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${SCHEMA}
          .computeLabel=${(s: any) => s.label || s.name}
          @value-changed=${this._valueChanged}
        ></ha-form>
      </div>
    `;
  }

  static styles = css`
    .card-config {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  `;
}

if (!customElements.get("fortnite-activity-card-editor")) {
  customElements.define("fortnite-activity-card-editor", FortniteActivityCardEditor);
}
