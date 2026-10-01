import { css } from "lit";

export const cardStyles = css`
  :host {
    display: block;
    box-sizing: border-box;
    --card-radius: var(--bubble-border-radius, var(--ha-card-border-radius, 16px));
    --card-bg: var(--bubble-main-background-color, var(--ha-card-background, var(--card-background-color, #131926)));
    --card-border: var(--bubble-border, var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--divider-color, rgba(255, 255, 255, 0.12))));
    --accent: var(--bubble-accent-color, var(--accent-color, var(--primary-color, #00E5FF)));
    --sub-btn-bg: var(--bubble-icon-background-color, rgba(255, 255, 255, 0.08));
    --pill-radius: 32px;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .spin {
    animation: spin 1s linear infinite;
  }

  ha-card {
    container-type: inline-size;
    display: block;
    background: var(--card-bg);
    border-radius: var(--card-radius);
    border: var(--card-border);
    padding: 16px;
    box-shadow: var(--ha-card-box-shadow, none);
    color: var(--primary-text-color, #ffffff);
    font-family: var(--ha-card-font-family, var(--paper-font-body1_-_font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif));
    position: relative;
    overflow: hidden;
    backdrop-filter: var(--ha-card-backdrop-filter, blur(8px));
  }

  /* Header Section */
  .fa-header {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    column-gap: 12px;
    margin: 0 0 12px;
    padding: 0;
  }

  .player-info { min-width: 0; }

  .name-row {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }

  .name-row h2 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .header-ranks { display: inline-flex; gap: 4px; flex-shrink: 0; }

  .season-bar {
    height: 3px;
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.08);
    margin: -4px 0 14px;
    overflow: hidden;
  }

  .season-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent), #7928CA);
  }

  .player-avatar {
    width: 44px;
    height: 44px;
    border-radius: var(--pill-radius);
    background: linear-gradient(135deg, var(--accent) 0%, #7928CA 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 18px;
    color: #ffffff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  .player-info h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  .player-meta {
    font-size: 12px;
    color: var(--secondary-text-color, rgba(255, 255, 255, 0.65));
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .level-badge {
    background: rgba(255, 255, 255, 0.1);
    padding: 2px 8px;
    border-radius: var(--pill-radius);
    font-weight: 600;
    color: var(--accent);
  }

  /* Status Pills */
  .status-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    border-radius: var(--pill-radius);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.4px;
    background: var(--sub-btn-bg);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .status-pill.live {
    background: rgba(0, 229, 255, 0.15);
    border-color: rgba(0, 229, 255, 0.4);
    color: var(--accent);
  }

  .status-pill.idle {
    color: var(--secondary-text-color, rgba(255, 255, 255, 0.6));
  }

  .pulse-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #00E5FF;
    box-shadow: 0 0 10px #00E5FF;
    animation: pulse 1.8s infinite;
  }

  @keyframes pulse {
    0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0, 229, 255, 0.7); }
    70% { transform: scale(1.15); box-shadow: 0 0 0 8px rgba(0, 229, 255, 0); }
    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(0, 229, 255, 0); }
  }

  /* Bubble Sub-Buttons Bar */
  .sub-button-row {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
    flex-wrap: wrap;
    padding-bottom: 4px;
  }

  .bubble-sub-button {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    height: 36px;
    padding: 0 14px;
    border-radius: var(--pill-radius);
    background: var(--sub-btn-bg);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: var(--primary-text-color, #ffffff);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    user-select: none;
    white-space: nowrap;
  }

  .bubble-sub-button:hover {
    background: rgba(255, 255, 255, 0.14);
    transform: translateY(-1px);
  }

  .bubble-sub-button.active {
    background: rgba(0, 229, 255, 0.2);
    border-color: var(--accent);
    color: var(--accent);
  }

  /* Metric KPI Chips Row */
  .kpi-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(105px, 1fr));
    gap: 10px;
    margin-bottom: 16px;
  }

  .kpi-chip {
    background: var(--sub-btn-bg);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: var(--card-radius);
    padding: 12px 14px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    transition: transform 0.2s ease;
  }

  .kpi-chip:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.1);
  }

  .kpi-label {
    font-size: 11px;
    text-transform: uppercase;
    color: var(--secondary-text-color, rgba(255, 255, 255, 0.6));
    font-weight: 600;
    margin-bottom: 4px;
  }

  .kpi-value {
    font-size: 18px;
    font-weight: 800;
    color: var(--primary-text-color, #ffffff);
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .kpi-value.gold {
    color: #FFD700;
  }

  .kpi-value.cyan {
    color: var(--accent);
  }

  .kpi-value.positive {
    color: #10B981;
  }

  .kpi-value.negative {
    color: #EF4444;
  }

  /* Rank Progression Card */
  .rank-section {
    background: var(--sub-btn-bg);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: var(--card-radius);
    padding: 14px 16px;
    margin-bottom: 16px;
  }

  .rank-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  .rank-title {
    font-size: 13px;
    font-weight: 600;
    color: var(--secondary-text-color, rgba(255, 255, 255, 0.7));
  }

  .rank-name {
    font-size: 14px;
    font-weight: 700;
    color: #FFD700;
  }

  .progress-bar-bg {
    width: 100%;
    height: 8px;
    border-radius: var(--pill-radius);
    background: rgba(255, 255, 255, 0.1);
    overflow: hidden;
    position: relative;
  }

  .progress-bar-fill {
    height: 100%;
    border-radius: var(--pill-radius);
    background: linear-gradient(90deg, var(--accent) 0%, #FFD700 100%);
    transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .rank-meta {
    display: flex;
    justify-content: space-between;
    margin-top: 6px;
    font-size: 11px;
    color: var(--secondary-text-color, rgba(255, 255, 255, 0.6));
  }

  /* Match Timeline Feed */
  .match-feed-header {
    font-size: 13px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 10px;
    color: var(--secondary-text-color, rgba(255, 255, 255, 0.75));
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .match-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 380px;
    overflow-y: auto;
    padding-right: 4px;
  }

  .match-card {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: var(--card-radius);
    padding: 10px 14px;
    transition: all 0.2s ease;
    cursor: pointer;
  }

  .match-row,
  .event-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .match-card:hover {
    background: rgba(255, 255, 255, 0.08);
  }

  .match-card.victory {
    background: rgba(255, 215, 0, 0.08);
    border-color: rgba(255, 215, 0, 0.35);
  }

  .match-left {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .match-headline {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .match-num {
    font-size: 12px;
    font-weight: 700;
    color: var(--accent);
  }

  .placement-badge {
    font-size: 12px;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: var(--pill-radius);
    background: rgba(255, 255, 255, 0.1);
  }

  .placement-badge.win {
    background: #FFD700;
    color: #000000;
  }

  .match-mode {
    font-size: 11px;
    color: var(--secondary-text-color, rgba(255, 255, 255, 0.6));
  }

  .match-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 3px;
  }

  .kills-badge {
    font-size: 13px;
    font-weight: 700;
    color: #ffffff;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .rank-delta-badge {
    font-size: 11px;
    font-weight: 600;
  }

  .rank-delta-badge.pos { color: #10B981; }
  .rank-delta-badge.neg { color: #EF4444; }

  /* Mode Filter Tabs */
  .mode-tabs {
    display: flex;
    gap: 6px;
    margin-bottom: 14px;
  }

  .mode-tab {
    padding: 4px 12px;
    border-radius: var(--pill-radius);
    font-size: 12px;
    font-weight: 600;
    background: var(--sub-btn-bg);
    border: 1px solid rgba(255, 255, 255, 0.08);
    cursor: pointer;
    color: var(--secondary-text-color, rgba(255, 255, 255, 0.7));
  }

  .mode-tab.active {
    background: rgba(0, 229, 255, 0.2);
    border-color: var(--accent);
    color: var(--accent);
  }

  /* Responsive Multi-Column for Tablets (Fire HD 10 Landscape) */
  @media (min-width: 768px) {
    .tablet-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
  }


  .empty {
    padding: 20px 12px;
    text-align: center;
    color: var(--secondary-text-color, rgba(255, 255, 255, 0.65));
  }

  .empty small { opacity: 0.7; }
  .muted { font-size: 11px; font-weight: 500; text-transform: none; opacity: 0.7; }
  .tracking-live { color: var(--accent); font-size: 11px; }

  .player-avatar.has-image {
    background: radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.25), transparent 70%),
      linear-gradient(135deg, var(--accent) 0%, #7928CA 100%);
    overflow: hidden;
  }

  [hidden] { display: none !important; }

  .player-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }

  .player-meta { flex-wrap: wrap; }

  .platforms {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 6px;
  }

  .platform-chip {
    font-size: 11px;
    padding: 2px 8px;
    border-radius: var(--pill-radius);
    background: var(--sub-btn-bg);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: var(--secondary-text-color, rgba(255, 255, 255, 0.75));
  }

  .tab-rows { display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px; }
  .tab-rows .mode-tabs { margin-bottom: 0; }
  .mode-tabs { flex-wrap: wrap; }
  .kpi-row.secondary .kpi-value { font-size: 15px; }

  .feature-card {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 16px;
    border-radius: var(--card-radius);
    border: 1px solid rgba(255, 255, 255, 0.06);
    background: var(--sub-btn-bg);
    overflow: hidden;
    min-height: 76px;
  }

  .feature-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2px;
    padding: 12px 0 12px 16px;
    min-width: 0;
  }

  /* 16:9 artwork shown whole on the right, anchored to the top so heads are never cropped */
  .feature-art {
    width: 42%;
    max-width: 180px;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    object-position: center top;
    align-self: center;
    flex-shrink: 0;
    -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 22%);
    mask-image: linear-gradient(90deg, transparent 0, #000 22%);
  }

  .feature-icon {
    --mdc-icon-size: 40px;
    align-self: center;
    margin-right: 18px;
    opacity: 0.85;
  }

  .feature-card.no-art.art-reload { background: linear-gradient(110deg, rgba(0, 0, 0, 0.2), rgba(255, 94, 58, 0.35)); }
  .feature-card.no-art.art-zero_build { background: linear-gradient(110deg, rgba(0, 0, 0, 0.2), rgba(0, 229, 255, 0.3)); }
  .feature-card.no-art.art-build { background: linear-gradient(110deg, rgba(0, 0, 0, 0.2), rgba(168, 85, 247, 0.35)); }

  .feature-label { font-size: 11px; text-transform: uppercase; font-weight: 600; opacity: 0.75; }
  .feature-value { font-size: 17px; font-weight: 800; }
  .feature-sub { font-size: 12px; opacity: 0.8; }

  .split-section { margin-bottom: 16px; }

  .section-title {
    font-size: 11px;
    text-transform: uppercase;
    font-weight: 600;
    color: var(--secondary-text-color, rgba(255, 255, 255, 0.6));
    margin-bottom: 6px;
  }

  .split-bar {
    display: flex;
    height: 8px;
    border-radius: var(--pill-radius);
    overflow: hidden;
    background: rgba(255, 255, 255, 0.1);
  }

  .seg-0 { background: var(--accent); }
  .seg-1 { background: #A855F7; }
  .seg-2 { background: #F59E0B; }

  .split-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 14px;
    margin-top: 6px;
    font-size: 11px;
    color: var(--secondary-text-color, rgba(255, 255, 255, 0.7));
  }

  .dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 5px;
  }

  .size-table {
    display: grid;
    gap: 4px;
    margin-bottom: 16px;
    font-size: 12px;
  }

  .size-row {
    display: grid;
    grid-template-columns: 1.1fr 1fr 1fr 1fr;
    gap: 6px;
    padding: 6px 10px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.04);
  }

  .size-name { font-weight: 700; }

  .match-art,
  .event-art {
    width: 56px;
    height: 36px;
    border-radius: 8px;
    object-fit: cover;
    object-position: center top;
    flex-shrink: 0;
  }

  .event-art { width: 44px; height: 44px; }

  .match-card .match-left,
  .event-card .match-left { flex: 1; min-width: 0; }

  .event-card {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: var(--card-radius);
    padding: 10px 14px;
    cursor: pointer;
  }

  .chevron { --mdc-icon-size: 18px; opacity: 0.5; flex-shrink: 0; }

  /* ---- Tier badges ---- */
  .rank-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4));
  }

  .rank-badge.unranked {
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.08);
    font-size: 12px;
    color: var(--secondary-text-color);
  }

  .rank-title { display: inline-flex; align-items: center; gap: 8px; }

  .unreal-position {
    display: flex;
    align-items: baseline;
    gap: 10px;
    margin: 2px 0;
  }

  .unreal-number {
    font-size: 22px;
    font-weight: 800;
    letter-spacing: 0.5px;
    background: linear-gradient(90deg, #FF9BD2, #A855F7);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  /* ---- Buttons: live badge ---- */
  .bubble-sub-button { position: relative; }

  .notify-badge {
    position: absolute;
    top: -5px;
    right: -5px;
    min-width: 18px;
    height: 18px;
    padding: 0 5px;
    box-sizing: border-box;
    border-radius: 9px;
    background: #EF4444;
    color: #fff;
    font-size: 11px;
    font-weight: 800;
    line-height: 18px;
    text-align: center;
    box-shadow: 0 0 0 2px var(--card-bg, #131926);
  }

  /* ---- Expanded match / event details ---- */
  .match-details,
  .event-details {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    cursor: default;
  }

  .detail-art,
  .event-hero {
    width: 100%;
    max-height: 170px;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    object-position: center top;
    border-radius: 10px;
    margin-bottom: 8px;
  }

  .detail-desc { font-size: 12px; line-height: 1.45; margin: 4px 0 8px; opacity: 0.85; }
  .detail-sub { font-weight: 700; font-size: 13px; }

  .detail-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 6px;
  }

  .detail,
  .detail-line {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    font-size: 12px;
    padding: 5px 8px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.04);
  }

  .detail span,
  .detail-line span { opacity: 0.7; }

  .detail-line { margin-bottom: 4px; }

  /* ---- Events ---- */
  .event-filters {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 6px;
    margin-bottom: 12px;
  }

  .filter-select {
    appearance: none;
    -webkit-appearance: none;
    width: 100%;
    padding: 6px 26px 6px 12px;
    border-radius: var(--pill-radius);
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: var(--sub-btn-bg) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23999'/%3E%3C/svg%3E") no-repeat right 10px center;
    color: var(--primary-text-color, #fff);
    font: inherit;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
  }

  .filter-select option { color: #000; }

  .match-list.events { max-height: 520px; }

  .tag-row { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 4px; }

  .tag {
    font-size: 10px;
    font-weight: 600;
    padding: 1px 7px;
    border-radius: var(--pill-radius);
    background: rgba(255, 255, 255, 0.07);
    color: var(--secondary-text-color, rgba(255, 255, 255, 0.75));
  }

  .match-mode.soon { color: var(--accent); }

  .window-list { display: grid; gap: 6px; margin-top: 4px; }

  .window-row {
    padding: 8px 10px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.04);
  }

  .window-row.live { box-shadow: inset 3px 0 0 #FFD700; }
  .window-row.finished { opacity: 0.8; }

  .window-main {
    display: grid;
    grid-template-columns: auto 1fr auto auto;
    align-items: center;
    gap: 8px;
    font-size: 12px;
  }

  .window-label { font-weight: 700; }
  .window-time { opacity: 0.8; }
  .window-status.live { color: #FFD700; font-weight: 700; }
  .window-status.upcoming { color: var(--accent); }

  .mini-button {
    font: inherit;
    font-size: 11px;
    font-weight: 700;
    padding: 3px 10px;
    border-radius: var(--pill-radius);
    border: 1px solid var(--accent);
    background: transparent;
    color: var(--accent);
    cursor: pointer;
  }

  .leaderboard { margin-top: 8px; display: grid; gap: 3px; }

  .lb-row {
    display: grid;
    grid-template-columns: 52px minmax(0, 1fr) auto;
    grid-template-areas: "rank names points" "rank extra extra";
    column-gap: 8px;
    padding: 4px 8px;
    border-radius: 8px;
    font-size: 12px;
    background: rgba(255, 255, 255, 0.03);
  }

  .lb-row.you { background: rgba(0, 229, 255, 0.14); border: 1px solid var(--accent); }
  .lb-rank { grid-area: rank; font-weight: 800; align-self: center; }
  .lb-names { grid-area: names; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .lb-points { grid-area: points; font-weight: 700; color: #FFD700; }
  .lb-extra { grid-area: extra; font-size: 10px; opacity: 0.65; }
  .lb-note { font-size: 11px; opacity: 0.7; padding: 4px 2px; }

  .event-card.live { border-color: rgba(255, 215, 0, 0.45); }
  .event-card.expanded,
  .match-card.expanded { background: rgba(255, 255, 255, 0.07); }
  .event-name { font-weight: 700; font-size: 13px; }

  /* ---- Theme: Cyber Fortnite (neon, high energy) ---- */
  ha-card.theme-cyber_fortnite {
    --accent: #00E5FF;
    --sub-btn-bg: rgba(121, 40, 202, 0.18);
    background: radial-gradient(120% 80% at 0% 0%, rgba(121, 40, 202, 0.55), transparent 60%),
      radial-gradient(120% 80% at 100% 100%, rgba(0, 229, 255, 0.28), transparent 60%),
      #0b0f1f;
    border: 1px solid rgba(0, 229, 255, 0.35);
    box-shadow: 0 0 24px rgba(121, 40, 202, 0.35), inset 0 0 0 1px rgba(255, 255, 255, 0.04);
    color: #ffffff;
  }

  ha-card.theme-cyber_fortnite .player-info h2 {
    font-style: italic;
    letter-spacing: 1px;
    text-shadow: 0 0 12px rgba(0, 229, 255, 0.6);
  }

  ha-card.theme-cyber_fortnite .kpi-chip,
  ha-card.theme-cyber_fortnite .rank-section,
  ha-card.theme-cyber_fortnite .match-card,
  ha-card.theme-cyber_fortnite .event-card {
    border-color: rgba(0, 229, 255, 0.18);
    clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
  }

  ha-card.theme-cyber_fortnite .kpi-value { text-shadow: 0 0 10px rgba(0, 229, 255, 0.35); }

  ha-card.theme-cyber_fortnite .progress-bar-fill {
    background: linear-gradient(90deg, #7928CA 0%, #00E5FF 60%, #FFD700 100%);
    box-shadow: 0 0 10px rgba(0, 229, 255, 0.6);
  }

  /* ---- Theme: Minimal (flat, quiet) ---- */
  ha-card.theme-minimal {
    --sub-btn-bg: transparent;
    backdrop-filter: none;
    box-shadow: none;
  }

  ha-card.theme-minimal .kpi-chip,
  ha-card.theme-minimal .rank-section,
  ha-card.theme-minimal .match-card,
  ha-card.theme-minimal .event-card,
  ha-card.theme-minimal .feature-card {
    border: none;
    border-bottom: 1px solid var(--divider-color, rgba(255, 255, 255, 0.12));
    border-radius: 0;
    padding-left: 0;
    padding-right: 0;
  }

  ha-card.theme-minimal .kpi-chip:hover,
  ha-card.theme-minimal .bubble-sub-button:hover { transform: none; }

  ha-card.theme-minimal .player-avatar { box-shadow: none; }
  ha-card.theme-minimal .kpi-value.gold,
  ha-card.theme-minimal .rank-name { color: var(--primary-text-color) !important; }
  ha-card.theme-minimal .progress-bar-fill { background: var(--accent); }

  /* ---- Compact mode: small buttons, inline stat strip ---- */
  ha-card.compact { padding: 12px; }
  ha-card.compact .fa-header { margin-bottom: 10px; }
  ha-card.compact .player-avatar { width: 34px; height: 34px; font-size: 14px; }
  ha-card.compact .player-info h2 { font-size: 15px; }
  ha-card.compact .platforms { display: none; }

  ha-card.compact .sub-button-row { gap: 6px; margin-bottom: 10px; }

  ha-card.compact .bubble-sub-button {
    height: 30px;
    padding: 0 10px;
    font-size: 12px;
    gap: 4px;
    --mdc-icon-size: 18px;
  }

  ha-card.compact .bubble-sub-button:not(.active) .btn-label { display: none; }

  ha-card.compact .kpi-row {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 6px;
    margin-bottom: 10px;
  }

  ha-card.compact .kpi-chip {
    flex-direction: row;
    align-items: baseline;
    gap: 5px;
    padding: 4px 10px;
    border-radius: var(--pill-radius);
  }

  ha-card.compact .kpi-label { margin: 0; font-size: 10px; }
  ha-card.compact .kpi-value,
  ha-card.compact .kpi-row.secondary .kpi-value { font-size: 13px; }
  ha-card.compact .rank-section { padding: 8px 12px; margin-bottom: 10px; }
  ha-card.compact .feature-card { min-height: 56px; margin-bottom: 10px; }
  ha-card.compact .feature-value { font-size: 14px; }
  ha-card.compact .size-table,
  ha-card.compact .split-section { margin-bottom: 10px; }
  ha-card.compact .match-card,
  ha-card.compact .event-card { padding: 7px 10px; }
  ha-card.compact .mode-tab { padding: 3px 10px; font-size: 11px; }
  ha-card.compact .unreal-number { font-size: 18px; }

  /* ---- Compact stats table ---- */
  .stat-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 10px;
    font-size: 12px;
    table-layout: fixed;
  }

  .stat-table tr + tr th,
  .stat-table tr + tr td { border-top: 1px solid rgba(255, 255, 255, 0.06); }

  .stat-table th {
    text-align: left;
    font-weight: 600;
    font-size: 11px;
    text-transform: uppercase;
    color: var(--secondary-text-color, rgba(255, 255, 255, 0.6));
    padding: 5px 6px 5px 0;
    width: 28%;
  }

  .stat-table td.kpi-value {
    display: table-cell;
    text-align: right;
    font-size: 13px;
    padding: 5px 12px 5px 0;
    width: 22%;
  }

  .secondary .stat-table { margin-top: -4px; }

  /* ---- Filters reset & show more ---- */
  .filter-reset {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 6px 12px;
    border-radius: var(--pill-radius);
    border: 1px solid rgba(239, 68, 68, 0.5);
    background: rgba(239, 68, 68, 0.12);
    color: #FCA5A5;
    font: inherit;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    --mdc-icon-size: 16px;
  }

  .show-more { align-self: center; margin: 4px auto 0; }

  /* ---- Sprites ---- */
  .sprite-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(92px, 1fr));
    gap: 8px;
    margin-top: 10px;
  }

  .sprite-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 8px 6px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid color-mix(in srgb, var(--rarity) 55%, transparent);
    box-shadow: inset 0 -18px 24px -18px color-mix(in srgb, var(--rarity) 60%, transparent);
    text-align: center;
  }

  .sprite-card.missing { opacity: 0.4; filter: grayscale(0.8); }
  .sprite-card img { width: 56px; height: 56px; object-fit: contain; }
  .sprite-card ha-icon { --mdc-icon-size: 40px; color: var(--rarity); }
  .sprite-name { font-size: 11px; font-weight: 700; line-height: 1.2; }
  .sprite-dots { display: flex; gap: 3px; }
  .sprite-dots .dot { width: 6px; height: 6px; margin: 0; background: rgba(255, 255, 255, 0.2); }
  .sprite-dots .dot.owned { background: var(--rarity); }
  .sprite-dots .dot.mastered { box-shadow: 0 0 0 1.5px #FFD700; }

  .power-ranking .rank-title ha-icon { --mdc-icon-size: 22px; color: #FFD700; }
  .power-ranking .unreal-number { font-size: 18px; }

  .notice {
    font-size: 12px;
    padding: 8px 12px;
    border-radius: 10px;
    background: rgba(245, 158, 11, 0.15);
    border: 1px solid rgba(245, 158, 11, 0.4);
    margin-bottom: 12px;
  }

  .sprite-summary { display: flex; gap: 12px; align-items: center; }
  .sprite-summary-main { flex: 1; min-width: 0; }
  .equipped-icon { width: 64px; height: 64px; object-fit: contain; filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.5)); }
  .currency { margin: 6px 0 4px; }
  .sprite-card { cursor: pointer; }
  .sprite-card.open { outline: 2px solid var(--rarity); }

  .sprite-detail {
    grid-column: 1 / -1;
    padding: 10px 12px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid color-mix(in srgb, var(--rarity) 45%, transparent);
  }

  .sprite-detail-head { display: flex; gap: 12px; align-items: flex-start; }
  .sprite-detail-head img { width: 72px; height: 72px; object-fit: contain; flex-shrink: 0; }
  .hint { color: var(--accent); }
  .variant-list { display: grid; gap: 4px; margin-top: 8px; }

  .variant-row {
    display: grid;
    grid-template-columns: 32px minmax(0, 1fr) auto auto auto;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    padding: 4px 6px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.04);
  }

  .variant-row img { width: 32px; height: 32px; object-fit: contain; }
  .variant-row.missing { opacity: 0.5; }
  .variant-name { font-weight: 700; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

  /* ---- Sprites v2 ---- */
  .sprite-ring {
    --size: 64px;
    width: var(--size);
    height: var(--size);
    flex-shrink: 0;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: conic-gradient(var(--accent) calc(var(--pct) * 1%), rgba(255, 255, 255, 0.1) 0);
    position: relative;
  }

  .sprite-ring::before {
    content: "";
    position: absolute;
    inset: 6px;
    border-radius: 50%;
    background: var(--card-bg, #131926);
  }

  .sprite-ring span { position: relative; font-weight: 800; font-size: 15px; }

  .sprite-stats {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 12px;
    font-size: 12px;
    color: var(--secondary-text-color, rgba(255, 255, 255, 0.75));
  }

  .sprite-stats b { color: var(--primary-text-color, #fff); }

  .version-row {
    display: grid;
    grid-template-columns: 78px 1fr 58px;
    gap: 8px;
    align-items: center;
    font-size: 11px;
    margin-top: 4px;
    opacity: 0.75;
  }

  .version-row.current { opacity: 1; font-weight: 700; }
  .version-row .progress-bar-bg { height: 6px; }
  .version-row span:last-child { text-align: right; }

  .hunt-row { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; }

  .hunt-item {
    flex: 0 0 auto;
    width: 76px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    padding: 6px 4px;
    border-radius: 10px;
    border: 1px dashed color-mix(in srgb, var(--rarity) 60%, transparent);
    background: rgba(255, 255, 255, 0.03);
    font-size: 10px;
    text-align: center;
    cursor: pointer;
  }

  .hunt-item img { width: 40px; height: 40px; object-fit: contain; filter: grayscale(0.6) brightness(0.8); }
  .hunt-item small { color: var(--accent); font-weight: 700; }
  .sprite-count { font-size: 10px; opacity: 0.8; }
  .sprite-card.complete { box-shadow: inset 0 -18px 24px -18px color-mix(in srgb, var(--rarity) 60%, transparent), 0 0 0 1px #FFD700; }

  .variant-tiles {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(84px, 1fr));
    gap: 6px;
    margin-top: 10px;
  }

  .variant-tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    padding: 6px 4px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.05);
    text-align: center;
    font-size: 11px;
  }

  .variant-tile img { width: 48px; height: 48px; object-fit: contain; }
  .variant-tile.missing { opacity: 0.45; }
  .variant-tile.missing img { filter: grayscale(1); }
  .variant-tile.mastered { box-shadow: inset 0 0 0 1px #FFD700; }
  .variant-status { font-size: 10px; opacity: 0.85; }
  .boon-list { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 4px; }
  .rarity-tag { background: color-mix(in srgb, var(--rarity) 35%, transparent); color: #fff; }
  .perk-list { margin-top: 8px; }
  .perk-desc { font-size: 11px; opacity: 0.75; margin: -2px 0 6px 8px; }

  /* ---- Sprite mastery ---- */
  .master-list { display: grid; gap: 4px; }

  .master-row {
    display: grid;
    grid-template-columns: 28px minmax(0, 1.4fr) auto minmax(50px, 1fr) auto;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    padding: 4px 8px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.04);
    border-left: 3px solid var(--rarity);
    cursor: pointer;
  }

  .master-row img { width: 28px; height: 28px; object-fit: contain; }
  .master-row .progress-bar-bg { height: 6px; }

  /* ---- Tournament badges ---- */
  .type-tag { background: rgba(0, 229, 255, 0.15); color: var(--accent); }
  .type-tag.fncs { background: linear-gradient(90deg, #7B2FF7, #F107A3); color: #fff; }
  .spectate-tag { background: rgba(16, 185, 129, 0.15); color: #6EE7B7; }
  .event-card.featured { border-color: rgba(241, 7, 163, 0.5); box-shadow: 0 0 0 1px rgba(123, 47, 247, 0.25); }
  .detail-line a { color: var(--accent); font-weight: 700; text-decoration: none; }

  /* ---- Other ranked tracks ---- */
  .track-row {
    display: grid;
    grid-template-columns: 24px minmax(0, 1fr) auto auto;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    padding: 4px 6px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.03);
    margin-bottom: 3px;
  }

  /* ---- Trends ---- */
  .trend-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 10px; margin-top: 12px; }

  .trend-card {
    padding: 10px 12px;
    border-radius: var(--card-radius);
    background: var(--sub-btn-bg);
    border: 1px solid rgba(255, 255, 255, 0.06);
  }

  .trend-card .kpi-value { font-size: 16px; }
  .trend-svg { width: 100%; height: 90px; display: block; overflow: visible; }
  .trend-line { fill: none; stroke: var(--accent); stroke-width: 2; vector-effect: non-scaling-stroke; stroke-linejoin: round; }
  .trend-dot { fill: var(--accent); }
  .trend-hit { fill: transparent; }
  .trend-pt:hover .trend-dot { r: 4; }
  .trend-base { stroke: rgba(255, 255, 255, 0.12); stroke-width: 1; vector-effect: non-scaling-stroke; }
  .kill-bar { fill: var(--accent); opacity: 0.85; }
  .win-mark { fill: #FFD700; font-size: 10px; }
  .collecting { font-size: 12px; opacity: 0.7; padding: 18px 0; text-align: center; }
  .vbucks-chip {
    padding: 2px 8px;
    border-radius: var(--pill-radius);
    background: rgba(59, 130, 246, 0.18);
    color: #93C5FD;
    font-weight: 700;
  }
  .crew-chip {
    padding: 2px 8px;
    border-radius: var(--pill-radius);
    background: linear-gradient(90deg, rgba(245, 158, 11, 0.3), rgba(168, 85, 247, 0.3));
    color: #FDE68A;
    font-weight: 700;
  }

  /* ---- Slim header (single-section cards) ---- */
  .fa-header.slim { margin-bottom: 10px; }
  .fa-header.slim .player-avatar { width: 32px; height: 32px; font-size: 13px; }
  .fa-header.slim .player-info h2 { font-size: 15px; }
  .fa-header.slim .name-row { gap: 8px; flex-wrap: nowrap; min-width: 0; }
  .fa-header.slim .name-row h2 { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .fa-header.slim .vbucks-chip { white-space: nowrap; flex-shrink: 0; }

  /* ---- Battle Pass ---- */
  .bp { display: grid; gap: 10px; container-type: inline-size; }
  .bp-summary {
    padding: 12px 14px;
    border-radius: 14px;
    background:
      linear-gradient(135deg, color-mix(in srgb, var(--accent) 22%, transparent), rgba(121, 40, 202, 0.22)),
      rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
  .bp-summary-title { display: flex; align-items: center; gap: 8px; font-weight: 800; font-size: 15px; }
  .bp-summary-title ha-icon { --mdc-icon-size: 20px; color: var(--accent); }
  .bp-days { margin-left: auto; font-size: 11px; font-weight: 700; opacity: 0.8; }
  .bp-stats { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(0, 1fr); gap: 4px; margin-top: 10px; }
  .bp-stats > div { display: flex; flex-direction: column; align-items: center; padding: 4px 2px; border-radius: 10px; background: rgba(0, 0, 0, 0.18); }
  .bp-stats b { font-size: 16px; line-height: 1.2; }
  .bp-stats span { font-size: 9px; opacity: 0.7; text-transform: uppercase; letter-spacing: 0.03em; white-space: nowrap; }
  .bp .gold, .bp .gold b { color: #FCD34D; }

  .bp-strip { display: flex; gap: 6px; overflow-x: auto; padding: 2px; scrollbar-width: thin; }
  .bp-thumb {
    flex: 0 0 auto;
    width: 44px;
    height: 44px;
    padding: 0;
    border-radius: 50%;
    border: 2px solid transparent;
    background: rgba(255, 255, 255, 0.06);
    overflow: hidden;
    cursor: pointer;
    opacity: 0.6;
    transition: opacity 0.15s, border-color 0.15s, transform 0.15s;
    color: inherit;
  }
  .bp-thumb img { width: 100%; height: 100%; object-fit: cover; object-position: top; }
  .bp-thumb:hover { opacity: 0.9; }
  .bp-thumb.active { opacity: 1; border-color: var(--accent); transform: scale(1.05); }

  .bp-set {
    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.03);
    padding: 10px;
    display: grid;
    gap: 10px;
  }
  .bp-hero { display: grid; grid-template-columns: auto 84px minmax(0, 1fr) auto; align-items: center; gap: 10px; }
  .bp-hero-img {
    width: 84px;
    height: 84px;
    border-radius: 12px;
    overflow: hidden;
    display: grid;
    place-items: center;
    background: radial-gradient(circle at 50% 30%, color-mix(in srgb, var(--accent) 45%, transparent), rgba(121, 40, 202, 0.35));
  }
  .bp-hero-img img { width: 100%; height: 100%; object-fit: cover; object-position: top; }
  .bp-hero-img ha-icon { --mdc-icon-size: 40px; opacity: 0.6; }
  .bp-hero-count { font-size: 10px; text-transform: uppercase; letter-spacing: 0.06em; opacity: 0.65; }
  .bp-hero-name { font-size: 18px; font-weight: 800; line-height: 1.2; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .bp-hero-meta { display: flex; flex-wrap: wrap; gap: 4px 10px; font-size: 12px; font-weight: 600; margin-top: 2px; }
  .bp-hero-types { font-size: 11px; opacity: 0.7; margin-top: 3px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .bp-nav {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.05);
    color: inherit;
    display: grid;
    place-items: center;
    padding: 0;
    cursor: pointer;
  }
  .bp-nav:hover { border-color: var(--accent); color: var(--accent); }
  .bp-nav ha-icon { --mdc-icon-size: 20px; }

  .bp-pages { display: flex; flex-wrap: wrap; gap: 6px; }
  .bp-pages .mini-button { display: inline-flex; align-items: center; gap: 6px; opacity: 0.75; border-color: rgba(255, 255, 255, 0.2); color: inherit; }
  .bp-pages .mini-button.bonus { border-style: dashed; }
  .bp-pages .mini-button.active { opacity: 1; border-color: var(--accent); background: color-mix(in srgb, var(--accent) 18%, transparent); color: var(--accent); }
  .bp-page-count { font-size: 10px; opacity: 0.7; }

  .bp-rewards { display: grid; grid-template-columns: repeat(auto-fill, minmax(84px, 1fr)); gap: 8px; }
  .bp-reward { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
  .bp-reward-img {
    position: relative;
    aspect-ratio: 1;
    border-radius: 10px;
    overflow: hidden;
    display: grid;
    place-items: center;
    background: linear-gradient(160deg, rgba(96, 165, 250, 0.28), rgba(30, 41, 59, 0.6));
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
  .bp-reward.outfit .bp-reward-img { background: linear-gradient(160deg, rgba(168, 85, 247, 0.45), rgba(30, 41, 59, 0.6)); border-color: rgba(168, 85, 247, 0.6); }
  .bp-reward.vbucks .bp-reward-img { background: linear-gradient(160deg, rgba(252, 211, 77, 0.35), rgba(30, 41, 59, 0.6)); border-color: rgba(252, 211, 77, 0.6); }
  .bp-reward-img img { width: 86%; height: 86%; object-fit: contain; }
  .bp-reward.outfit .bp-reward-img img { width: 100%; height: 100%; object-fit: cover; object-position: top; }
  .bp-reward-img > ha-icon { --mdc-icon-size: 34px; opacity: 0.5; }
  .bp-cost {
    position: absolute;
    top: 4px;
    right: 4px;
    display: inline-flex;
    align-items: center;
    gap: 2px;
    padding: 1px 6px 1px 4px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 800;
    background: rgba(0, 0, 0, 0.6);
    color: #FDE68A;
  }
  .bp-cost ha-icon { --mdc-icon-size: 12px; }
  .bp-cost.character { color: #C4B5FD; }
  .bp-cost.included { color: #6EE7B7; padding: 1px 6px; font-size: 10px; }
  .bp-reward-name { font-size: 12px; font-weight: 700; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .bp-reward-type { font-size: 10px; opacity: 0.65; text-transform: uppercase; letter-spacing: 0.04em; }
  .bp-note { display: flex; flex-wrap: wrap; gap: 4px 12px; font-size: 11px; opacity: 0.6; }

  ha-card.compact .bp-rewards { grid-template-columns: repeat(auto-fill, minmax(78px, 1fr)); gap: 6px; }
  ha-card.compact .bp-hero { grid-template-columns: auto 64px minmax(0, 1fr) auto; }
  ha-card.compact .bp-hero-img { width: 64px; height: 64px; }
  ha-card.compact .bp-hero-name { font-size: 16px; }
  /* Narrow cards (dashboard columns, phones): the portrait strip handles navigation */
  @container (max-width: 400px) {
    .bp-hero { grid-template-columns: 64px minmax(0, 1fr); }
    .bp-hero-img { width: 64px; height: 64px; }
    .bp-nav { display: none; }
    .bp-hero-name { font-size: 16px; }
    .bp-rewards { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; }
    .bp-stats b { font-size: 14px; }
  }

  /* ---- Locker ---- */
  .locker { display: grid; gap: 10px; container-type: inline-size; }
  .locker-hero {
    display: grid;
    grid-template-columns: 96px minmax(0, 1fr);
    gap: 12px;
    align-items: center;
    padding: 12px;
    border-radius: 14px;
    border: 1px solid color-mix(in srgb, var(--rarity) 45%, transparent);
    background: linear-gradient(135deg, color-mix(in srgb, var(--rarity) 25%, transparent), rgba(255, 255, 255, 0.03));
  }
  .locker-hero-img {
    width: 96px;
    height: 96px;
    border-radius: 12px;
    overflow: hidden;
    display: grid;
    place-items: center;
    background: radial-gradient(circle at 50% 30%, color-mix(in srgb, var(--rarity) 55%, transparent), rgba(15, 23, 42, 0.6));
  }
  .locker-hero-img img { width: 100%; height: 100%; object-fit: cover; object-position: top; }
  .locker-hero-img ha-icon { --mdc-icon-size: 44px; opacity: 0.6; }
  .locker-rarities { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 6px; }
  .rarity-dot {
    font-size: 10px;
    font-weight: 800;
    padding: 1px 7px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--rarity) 30%, transparent);
    border: 1px solid color-mix(in srgb, var(--rarity) 70%, transparent);
  }
  .locker-controls { display: flex; gap: 6px; align-items: center; }
  .locker-search {
    flex: 1;
    min-width: 0;
    font: inherit;
    font-size: 12px;
    padding: 6px 10px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    background: rgba(0, 0, 0, 0.2);
    color: inherit;
  }
  .locker-controls .mini-button { opacity: 0.75; border-color: rgba(255, 255, 255, 0.2); color: inherit; }
  .locker-controls .mini-button.active { opacity: 1; border-color: var(--accent); color: var(--accent); }
  .locker-img { background: linear-gradient(160deg, color-mix(in srgb, var(--rarity) 45%, transparent), rgba(30, 41, 59, 0.6)); border-color: color-mix(in srgb, var(--rarity) 50%, transparent); }
  .locker-img img { width: 100%; height: 100%; object-fit: cover; object-position: top; }
  .bp-reward.equipped .bp-reward-img { box-shadow: 0 0 0 2px var(--accent); }
  .locker-pager { display: flex; align-items: center; justify-content: center; gap: 10px; font-size: 12px; opacity: 0.85; }
  .locker-pager .bp-nav[disabled] { opacity: 0.3; cursor: default; }
  @container (max-width: 400px) {
    .locker-hero { grid-template-columns: 72px minmax(0, 1fr); }
    .locker-hero-img { width: 72px; height: 72px; }
    .locker-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; }
  }

  .locker-tile { cursor: pointer; }
  .locker-tile.selected .bp-reward-img { box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.6); }
  .locker-use {
    position: absolute;
    left: 4px;
    right: 4px;
    bottom: 4px;
    font: inherit;
    font-size: 10px;
    font-weight: 800;
    padding: 4px 2px;
    border-radius: 8px;
    border: none;
    background: var(--accent);
    color: #0b0f19;
    cursor: pointer;
  }
  .link-button { font: inherit; font-size: 11px; background: none; border: none; padding: 0; color: var(--accent); cursor: pointer; text-decoration: underline; }
  .muted { opacity: 0.6; }

  /* ---- Sprites (v1.11) ---- */
  .sp-summary { display: grid; grid-template-columns: auto repeat(3, minmax(0, 1fr)); gap: 8px; align-items: center; margin-bottom: 12px; }
  .sp-stat { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 8px 4px; border-radius: 12px; background: rgba(255, 255, 255, 0.05); text-align: center; }
  .sp-stat b { font-size: 20px; line-height: 1.15; }
  .sp-stat b small { font-size: 12px; opacity: 0.6; font-weight: 700; }
  .sp-stat span { font-size: 11px; opacity: 0.75; font-weight: 600; }
  .sp-stat.gold b { color: #FCD34D; }
  .sp-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(104px, 1fr)); gap: 8px; }
  .sp-grid .sp-detail { grid-column: 1 / -1; }
  .sp-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    padding: 8px 6px;
    border-radius: 14px;
    cursor: pointer;
    background: linear-gradient(170deg, color-mix(in srgb, var(--rarity) 22%, transparent), rgba(255, 255, 255, 0.03));
    border: 1px solid color-mix(in srgb, var(--rarity) 35%, transparent);
    text-align: center;
  }
  .sp-card.mastered { border-color: #FCD34D; box-shadow: 0 0 0 1px #FCD34D inset; }
  .sp-card.missing { background: rgba(255, 255, 255, 0.03); border-color: rgba(255, 255, 255, 0.08); }
  .sp-card.missing .sp-img img { filter: grayscale(1) brightness(0.5); }
  .sp-card.open { outline: 2px solid var(--accent); }
  .sp-img { position: relative; width: 64px; height: 64px; display: grid; place-items: center; }
  .sp-img img { width: 64px; height: 64px; object-fit: contain; }
  .sp-img > ha-icon { --mdc-icon-size: 44px; color: var(--rarity); }
  .sp-badge { position: absolute; display: grid; place-items: center; font-size: 11px; font-weight: 800; border-radius: 999px; }
  .sp-badge.star { top: -4px; right: -6px; font-size: 16px; }
  .sp-badge.lock { bottom: -2px; right: -4px; width: 20px; height: 20px; background: rgba(0, 0, 0, 0.7); }
  .sp-badge.lock ha-icon { --mdc-icon-size: 12px; }
  .sp-badge.count { bottom: -2px; left: -6px; padding: 1px 5px; background: rgba(0, 0, 0, 0.7); color: #fff; }
  .sp-name { font-size: 13px; font-weight: 800; line-height: 1.2; }
  .sp-status { font-size: 11px; font-weight: 800; padding: 2px 8px; border-radius: 999px; background: rgba(255, 255, 255, 0.1); white-space: nowrap; }
  .sp-have { font-size: 12px; font-weight: 700; white-space: nowrap; }
  .sp-max { color: #FCD34D; }
  .sp-status.gold { background: rgba(252, 211, 77, 0.2); color: #FCD34D; }
  .sp-status.dim { opacity: 0.65; }
  .sp-kinds { display: flex; flex-wrap: wrap; justify-content: center; gap: 3px; margin-top: 2px; }
  .sp-kind { width: 20px; height: 20px; border-radius: 50%; background: rgba(255, 255, 255, 0.08); overflow: hidden; display: grid; place-items: center; }
  .sp-kind img { width: 100%; height: 100%; object-fit: contain; filter: grayscale(1) brightness(0.45); opacity: 0.6; }
  .sp-kind.owned { background: color-mix(in srgb, var(--rarity) 40%, transparent); }
  .sp-kind.owned img { filter: none; opacity: 1; }
  .sp-kind.mastered { box-shadow: 0 0 0 2px #FCD34D; }
  .sp-kinds-text { font-size: 10px; opacity: 0.7; font-weight: 600; }
  .sp-level-pill { font-size: 11px; font-weight: 800; white-space: nowrap; }
  .sp-kind-list { display: grid; gap: 8px; margin-top: 10px; }
  .sp-kind-row { display: grid; grid-template-columns: 48px minmax(0, 1fr); gap: 10px; align-items: start; padding: 8px; border-radius: 12px; background: rgba(255, 255, 255, 0.04); }
  .sp-kind-row.mastered { box-shadow: inset 0 0 0 1px #FCD34D; }
  .sp-kind-row.missing .sp-kind-icon img { filter: grayscale(1) brightness(0.5); }
  .sp-kind-icon { position: relative; width: 48px; height: 48px; }
  .sp-kind-icon img { width: 48px; height: 48px; object-fit: contain; }
  .sp-kind-title { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 6px; }
  .sp-kind-title b { font-size: 14px; margin-right: 2px; }
  .sp-chip { font-size: 11px; font-weight: 700; padding: 1px 8px; border-radius: 999px; background: rgba(255, 255, 255, 0.1); white-space: nowrap; }
  .sp-chip.gold { background: rgba(252, 211, 77, 0.2); color: #FCD34D; }
  .sp-chip.dim { opacity: 0.65; }
  .sp-xp { display: grid; gap: 2px; margin-top: 6px; font-size: 11px; opacity: 0.85; }
  .sp-xp .progress-bar-bg { height: 6px; }
  .sp-perk { font-size: 11px; opacity: 0.8; margin-top: 4px; }
  @container (max-width: 400px) {
    .sp-summary { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .sp-summary .sprite-ring { display: none; }
    .sp-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; }
  }

  /* ---- Battle Pass unlocks ---- */
  .bp-unlock { margin-top: 10px; display: grid; gap: 4px; }
  .bp-unlock-top { display: flex; justify-content: space-between; align-items: baseline; font-weight: 800; }
  .bp-unlock-top b { font-size: 18px; color: #6EE7B7; }
  .bp-unlock-top span:first-child { color: #6EE7B7; }
  .bp-locked-count { font-size: 12px; opacity: 0.85; }
  .bp-unlock .progress-bar-bg, .bp-set-progress .progress-bar-bg { height: 8px; }
  .bp-unlock .progress-bar-fill, .bp-set-progress .progress-bar-fill { background: linear-gradient(90deg, #10B981, #6EE7B7); }
  .bp-set-progress { display: grid; gap: 3px; margin-top: 6px; font-size: 12px; font-weight: 800; color: #6EE7B7; }
  .bp-thumb { position: relative; }
  .bp-thumb.done { border-color: #10B981; opacity: 0.85; }
  .bp-thumb.done.active { border-color: var(--accent); }
  .bp-thumb-check {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #10B981;
    color: #fff;
    font-size: 10px;
    font-weight: 900;
    display: grid;
    place-items: center;
  }
  .bp-reward.unlocked .bp-reward-img { border-color: #10B981; box-shadow: inset 0 0 0 1px #10B981; }
  .bp-reward.locked .bp-reward-img img { filter: grayscale(0.9) brightness(0.55); }
  .bp-reward.locked .bp-reward-name { opacity: 0.7; }
  .bp-state {
    position: absolute;
    top: 4px;
    left: 4px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    font-size: 13px;
    font-weight: 900;
  }
  .bp-state.unlocked { background: #10B981; color: #fff; }
  .bp-state.locked { background: rgba(0, 0, 0, 0.7); }
  .bp-state.locked ha-icon { --mdc-icon-size: 13px; }

  /* ---- Match progress chips + match map ---- */
  .progress-chips { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 4px; }
  .pchip {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    font-size: 10px;
    font-weight: 800;
    padding: 1px 7px 1px 4px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.08);
    white-space: nowrap;
  }
  .pchip img { width: 16px; height: 16px; object-fit: contain; }
  .pchip.quest { background: rgba(96, 165, 250, 0.2); color: #BFDBFE; }
  .pchip.level { background: rgba(16, 185, 129, 0.2); color: #6EE7B7; }
  .pchip.sprite { background: rgba(168, 85, 247, 0.2); color: #E9D5FF; }
  .pchip.gold { background: rgba(252, 211, 77, 0.2); color: #FCD34D; }
  .match-map { display: grid; gap: 4px; margin-bottom: 8px; font-size: 12px; font-weight: 700; }

  /* ---- Map ---- */
  .map-head { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; margin: 6px 0; }
  .map-frame { position: relative; width: 100%; aspect-ratio: 1; border-radius: 14px; overflow: hidden; background: rgba(0, 0, 0, 0.3); }
  .map-frame img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .map-frame.compact { aspect-ratio: 16 / 9; }
  .map-frame.compact img { object-fit: cover; }
  .map-poi { position: absolute; transform: translate(-50%, -50%); display: flex; flex-direction: column; align-items: center; cursor: pointer; z-index: 1; }
  .map-poi i { width: 9px; height: 9px; border-radius: 50%; background: #fff; box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.6); }
  .map-poi b {
    font-size: 9px;
    font-weight: 800;
    color: #fff;
    text-shadow: 0 1px 2px #000, 0 0 3px #000;
    white-space: nowrap;
    margin-top: 1px;
    opacity: 0;
    transition: opacity 0.15s;
  }
  .map-frame:hover .map-poi b, .map-poi.on b { opacity: 1; }
  .map-poi.on { z-index: 2; }
  .map-poi.landmark i { width: 6px; height: 6px; background: rgba(255, 255, 255, 0.75); }
  .map-poi.landmark b { font-weight: 600; }
  .map-poi.on i { background: var(--accent); transform: scale(1.4); }
  .poi-list { display: flex; flex-wrap: wrap; gap: 4px; }
  .poi-chip { cursor: pointer; border: none; font: inherit; font-size: 11px; color: inherit; }
  .poi-chip.on { background: var(--accent); color: #0b0f19; }

  /* ---- News ---- */
  .news-update {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 14px;
    margin-bottom: 10px;
    background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 22%, transparent), rgba(121, 40, 202, 0.2));
  }
  .news-update ha-icon { --mdc-icon-size: 28px; color: var(--accent); }
  .news-update img { width: 48px; height: 48px; border-radius: 10px; object-fit: cover; }
  .news-update div { display: grid; gap: 2px; }
  .news-update span { font-size: 12px; opacity: 0.85; }
  .news-update.event { background: rgba(255, 255, 255, 0.05); }
  .news-list { display: grid; gap: 10px; }
  .news-card { border-radius: 14px; overflow: hidden; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); }
  .news-card img { width: 100%; aspect-ratio: 16 / 9; object-fit: cover; display: block; }
  .news-body { display: grid; gap: 4px; padding: 10px 12px; }
  .news-body b { font-size: 15px; }
  .news-body p { margin: 0; font-size: 12px; opacity: 0.85; line-height: 1.4; }
  .news-body .tag { justify-self: start; }

  /* ---- Shop ---- */
  .shop-alert {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 12px;
    margin-bottom: 8px;
    background: linear-gradient(90deg, rgba(236, 72, 153, 0.35), rgba(168, 85, 247, 0.25));
    font-size: 13px;
  }
  .shop-alert ha-icon { color: #F9A8D4; }
  .shop-tabs { margin-bottom: 8px; }
  .shop-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(104px, 1fr)); gap: 8px; margin-bottom: 6px; }
  .shop-tile { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
  .shop-img {
    position: relative;
    aspect-ratio: 1;
    border-radius: 12px;
    overflow: hidden;
    background: linear-gradient(160deg, color-mix(in srgb, var(--rarity) 50%, transparent), rgba(15, 23, 42, 0.7));
    border: 1px solid color-mix(in srgb, var(--rarity) 55%, transparent);
    display: grid;
    place-items: center;
  }
  .shop-img img { width: 100%; height: 100%; object-fit: cover; }
  .shop-img > ha-icon { --mdc-icon-size: 36px; opacity: 0.5; }
  .shop-tile.wish .shop-img { box-shadow: 0 0 0 2px #F472B6; }
  .shop-tile.owned .shop-img img { opacity: 0.75; }
  .shop-price { font-size: 12px; font-weight: 800; color: #FCD34D; }
  .shop-price s { opacity: 0.6; font-weight: 600; color: inherit; }
  .shop-bundle {
    position: absolute;
    left: 4px;
    bottom: 4px;
    font-size: 9px;
    font-weight: 800;
    padding: 1px 6px;
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.65);
  }
  .shop-bundle.in { background: #EC4899; color: #fff; }
  .wish-btn {
    position: absolute;
    top: 4px;
    right: 4px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: none;
    padding: 0;
    display: grid;
    place-items: center;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    cursor: pointer;
  }
  .wish-btn ha-icon { --mdc-icon-size: 16px; }
  .wish-btn.on { background: #EC4899; }
  .bp-reward.in-shop .bp-reward-img { box-shadow: 0 0 0 2px #EC4899; }

  /* ---- Locker extras ---- */
  .locker-fav { position: absolute; top: 4px; left: 6px; color: #FCD34D; font-size: 16px; text-shadow: 0 1px 2px #000; }
  .locker-new {
    position: absolute;
    left: 4px;
    bottom: 4px;
    font-size: 9px;
    font-weight: 800;
    padding: 1px 6px;
    border-radius: 999px;
    background: #10B981;
    color: #fff;
  }
  .locker-actions { position: absolute; left: 4px; right: 4px; bottom: 4px; display: grid; gap: 3px; }
  .locker-actions .locker-use { position: static; }
  .locker-use.fav { background: rgba(0, 0, 0, 0.75); color: #FCD34D; }

  /* ---- Tournament filters ---- */
  .filter-bar { display: flex; align-items: center; gap: 6px; margin-bottom: 8px; min-width: 0; }
  .filter-toggle {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    flex: 0 0 auto;
    font: inherit;
    font-size: 12px;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.05);
    color: inherit;
    cursor: pointer;
  }
  .filter-toggle ha-icon { --mdc-icon-size: 16px; }
  .filter-toggle b { background: var(--accent); color: #0b0f19; border-radius: 999px; padding: 0 6px; font-size: 11px; }
  .filter-toggle.open { border-color: var(--accent); }
  .filter-active { display: flex; gap: 4px; overflow-x: auto; flex: 1; min-width: 0; scrollbar-width: none; }
  .filter-panel { display: grid; gap: 6px; padding: 8px; border-radius: 12px; background: rgba(255, 255, 255, 0.04); margin-bottom: 8px; }
  .fgroup { display: grid; grid-template-columns: 64px minmax(0, 1fr); gap: 6px; align-items: start; }
  .fgroup > span { font-size: 11px; font-weight: 700; opacity: 0.7; padding-top: 3px; }
  .fgroup > div { display: flex; flex-wrap: wrap; gap: 4px; }
  .fchip {
    font: inherit;
    font-size: 11px;
    font-weight: 700;
    padding: 2px 9px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    background: transparent;
    color: inherit;
    cursor: pointer;
    white-space: nowrap;
  }
  .fchip.on { background: color-mix(in srgb, var(--accent) 25%, transparent); border-color: var(--accent); color: var(--accent); }

  /* ---- Kid mode: bigger, simpler ---- */
  ha-card.kid { font-size: 15px; }
  ha-card.kid .bubble-sub-button { height: 44px; font-size: 15px; }
  ha-card.kid .sp-grid, ha-card.kid .bp-rewards, ha-card.kid .shop-grid { grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 10px; }
  ha-card.kid .sp-img, ha-card.kid .sp-img img { width: 80px; height: 80px; }
  ha-card.kid .sp-name, ha-card.kid .bp-reward-name { font-size: 15px; }
  ha-card.kid .sp-status, ha-card.kid .sp-have, ha-card.kid .shop-price { font-size: 13px; }
  ha-card.kid .sp-kind { width: 26px; height: 26px; }
  ha-card.kid .bp-hero-name { font-size: 22px; }
  ha-card.kid .pchip { font-size: 12px; }
  ha-card.kid .muted, ha-card.kid .bp-note, ha-card.kid .version-row, ha-card.kid .detail-grid { display: none; }

  /* ---- Map (v1.15): real-size rendering, floating controls, true full screen ---- */
  ha-card.map-full { container-type: normal; }
  .mapx { display: grid; gap: 10px; container-type: inline-size; }
  .mapx-top { display: grid; gap: 6px; }
  .mapx-meta { display: flex; flex-wrap: wrap; gap: 4px 10px; font-size: 11px; opacity: 0.75; }
  .mapx-picker { position: relative; }
  .mapx-current {
    width: 100%;
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: 10px;
    padding: 8px 12px;
    border-radius: 14px;
    border: 1px solid rgba(255, 255, 255, 0.14);
    background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 18%, transparent), rgba(255, 255, 255, 0.04));
    color: inherit;
    font: inherit;
    cursor: pointer;
    text-align: left;
  }
  .mapx-current > ha-icon:first-child { --mdc-icon-size: 26px; color: var(--accent); }
  .mapx-current span { display: grid; min-width: 0; }
  .mapx-current b { font-size: 16px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .mapx-current small { font-size: 11px; opacity: 0.7; }
  .mapx-menu {
    position: absolute;
    z-index: 30;
    left: 0;
    right: 0;
    top: calc(100% + 4px);
    max-height: 360px;
    overflow-y: auto;
    padding: 6px;
    border-radius: 14px;
    background: var(--card-background-color, #1c2230);
    border: 1px solid rgba(255, 255, 255, 0.14);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
  }
  .mapx-group { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; opacity: 0.65; padding: 8px 8px 4px; }
  .mapx-group ha-icon { --mdc-icon-size: 14px; }
  .mapx-option {
    width: 100%;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto auto;
    align-items: center;
    gap: 8px;
    padding: 8px 10px;
    border: none;
    border-radius: 10px;
    background: transparent;
    color: inherit;
    font: inherit;
    font-size: 14px;
    text-align: left;
    cursor: pointer;
  }
  .mapx-option:hover { background: rgba(255, 255, 255, 0.06); }
  .mapx-option.on { background: color-mix(in srgb, var(--accent) 20%, transparent); font-weight: 800; }
  .mapx-option small { font-size: 11px; opacity: 0.65; }
  .mapx-option ha-icon { --mdc-icon-size: 18px; color: var(--accent); }

  .mapx-frame {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    border-radius: 14px;
    overflow: hidden;
    background: #0d2a4a;
    touch-action: none;
    cursor: grab;
    user-select: none;
    -webkit-user-select: none;
  }
  .mapx-frame.dragging { cursor: grabbing; }
  .mapx-frame.tool-draw, .mapx-frame.tool-marker { cursor: crosshair; }
  .mapx-frame.tool-erase { cursor: cell; }
  .mapx-frame.fs, .mapx-frame:fullscreen {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    aspect-ratio: auto;
    border-radius: 0;
    z-index: 9999;
  }
  .mapx-img { position: absolute; max-width: none; pointer-events: none; image-rendering: auto; }
  .mapx-ink { position: absolute; inset: 0; pointer-events: none; overflow: visible; }
  .mapx-ink .gl { stroke: rgba(255, 255, 255, 0.35); stroke-width: 1; }
  .mapx-ink .ln { fill: none; stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.6)); }
  .mapx-ink .ln.live { stroke-dasharray: 1 0; opacity: 0.85; }
  .mapx-gridlabel { position: absolute; transform: translate(-50%, 0); font-size: 11px; font-weight: 900; color: #fff; text-shadow: 0 1px 2px #000, 0 0 3px #000; pointer-events: none; }
  .mapx-gridlabel.row { transform: translate(0, -50%); }

  .mapx-pin {
    position: absolute;
    transform: translate(-50%, -5px);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    padding: 0;
    border: none;
    background: none;
    color: inherit;
    font: inherit;
    cursor: pointer;
    z-index: 1;
  }
  .mapx-pin i { width: 10px; height: 10px; border-radius: 50%; background: #fff; box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.7); }
  .mapx-pin.landmark i { width: 7px; height: 7px; background: #FCD34D; }
  .mapx-pin b {
    font-size: 11px;
    font-weight: 800;
    line-height: 1.25;
    padding: 1px 7px;
    border-radius: 999px;
    background: rgba(10, 15, 25, 0.85);
    color: #fff;
    white-space: nowrap;
  }
  .mapx-pin.landmark b { font-weight: 600; color: #FDE68A; font-size: 10px; }
  .mapx-pin.on { z-index: 4; }
  .mapx-pin.on i { width: 14px; height: 14px; background: var(--accent); box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.7), 0 0 12px var(--accent); }
  .mapx-pin.on b { background: #fff; color: #0b0f19; font-size: 12px; }

  .mapx-mark {
    position: absolute;
    transform: translate(-50%, -100%);
    font-size: 24px;
    line-height: 1;
    filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.7));
    z-index: 3;
  }
  .mapx-mark::after { content: ""; position: absolute; left: 50%; bottom: -3px; width: 8px; height: 8px; margin-left: -4px; border-radius: 50%; background: var(--c); box-shadow: 0 0 0 2px #fff; }
  .mapx-frame.tool-erase .mapx-mark { cursor: pointer; }

  .mapx-drop { position: absolute; transform: translate(-50%, -50%); z-index: 5; pointer-events: none; display: grid; place-items: center; }
  .mapx-drop i { position: absolute; width: 60px; height: 60px; border-radius: 50%; border: 3px solid #FACC15; animation: mapx-ring 1.6s ease-out infinite; }
  .mapx-drop i + i { animation-delay: 0.8s; }
  .mapx-drop span { font-size: 40px; transform: translateY(-34px); animation: mapx-float 1.4s ease-in-out infinite; filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.6)); }
  .mapx-drop b { position: absolute; top: 30px; font-size: 12px; font-weight: 900; padding: 2px 10px; border-radius: 999px; background: #FACC15; color: #0b0f19; white-space: nowrap; }
  @keyframes mapx-ring { from { transform: scale(0.3); opacity: 1; } to { transform: scale(1.6); opacity: 0; } }
  @keyframes mapx-float { 50% { transform: translateY(-42px); } }

  .mapx-ui { position: absolute; z-index: 10; }
  .mapx-tools, .mapx-zoombar, .mapx-drawbar {
    display: flex;
    gap: 4px;
    padding: 4px;
    border-radius: 12px;
    background: rgba(10, 15, 25, 0.78);
    backdrop-filter: blur(6px);
  }
  .mapx-tools { top: 8px; right: 8px; flex-direction: column; }
  .mapx-zoombar { right: 8px; bottom: 8px; flex-direction: column; align-items: center; }
  .mapx-zoomval { font-size: 10px; font-weight: 800; color: #fff; opacity: 0.85; }
  .mapx-drawbar { left: 50%; top: 8px; transform: translateX(-50%); flex-wrap: wrap; justify-content: center; max-width: calc(100% - 70px); align-items: center; }
  .mapx-tool {
    width: 34px;
    height: 34px;
    display: grid;
    place-items: center;
    padding: 0;
    border: none;
    border-radius: 9px;
    background: transparent;
    color: #fff;
    cursor: pointer;
  }
  .mapx-tool:hover { background: rgba(255, 255, 255, 0.12); }
  .mapx-tool.on { background: var(--accent); color: #0b0f19; }
  .mapx-tool[disabled] { opacity: 0.35; cursor: default; }
  .mapx-tool ha-icon { --mdc-icon-size: 20px; }
  .mapx-sep { height: 1px; margin: 2px 4px; background: rgba(255, 255, 255, 0.2); }
  .mapx-sep.v { width: 1px; height: 22px; margin: 0 2px; }
  .mapx-swatch { width: 22px; height: 22px; border-radius: 50%; border: 2px solid rgba(255, 255, 255, 0.4); background: var(--c); cursor: pointer; padding: 0; }
  .mapx-swatch.on { border-color: #fff; box-shadow: 0 0 0 2px var(--c); }
  .mapx-emoji { width: 30px; height: 30px; border: none; border-radius: 8px; background: transparent; font-size: 18px; cursor: pointer; padding: 0; }
  .mapx-emoji.on { background: rgba(255, 255, 255, 0.2); }

  /* Full screen: floating search + pickers top-left, place card bottom-left */
  .mapx-float-top { top: 10px; left: 10px; width: min(340px, calc(100% - 80px)); display: grid; gap: 6px; }
  .mapx-float-top .mapx-current, .mapx-float-top .mapx-search, .mapx-float-top .mapx-select { background: rgba(10, 15, 25, 0.88); backdrop-filter: blur(6px); }
  .mapx-info.floating { left: 10px; bottom: 10px; width: min(340px, calc(100% - 80px)); }

  .mapx-side { display: grid; gap: 8px; align-content: start; min-width: 0; }
  .mapx-search { display: flex; align-items: center; gap: 6px; padding: 7px 12px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.15); background: rgba(0, 0, 0, 0.2); }
  .mapx-search ha-icon { --mdc-icon-size: 18px; opacity: 0.7; }
  .mapx-search input { flex: 1; min-width: 0; border: none; background: transparent; color: inherit; font: inherit; font-size: 13px; outline: none; }
  .mapx-selects { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 6px; }
  .mapx-select { display: flex; align-items: center; gap: 6px; padding: 0 10px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.15); background: rgba(0, 0, 0, 0.2); }
  .mapx-select ha-icon { --mdc-icon-size: 18px; color: var(--accent); }
  .mapx-select.landmark ha-icon { color: #FCD34D; }
  .mapx-select select { flex: 1; min-width: 0; padding: 8px 0; border: none; background: transparent; color: inherit; font: inherit; font-size: 13px; font-weight: 700; outline: none; cursor: pointer; }
  .mapx-select option { color: #111; }
  .mapx-hint { font-size: 12px; opacity: 0.6; padding: 4px 2px; }
  .mapx-info { display: grid; gap: 8px; padding: 10px 12px; border-radius: 14px; background: rgba(10, 15, 25, 0.88); border: 1px solid rgba(255, 255, 255, 0.1); color: #fff; }
  .mapx-info-head { display: flex; align-items: center; gap: 8px; }
  .mapx-info-head > div { flex: 1; min-width: 0; display: grid; }
  .mapx-info b { font-size: 15px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .mapx-info small { font-size: 11px; opacity: 0.75; }
  .mapx-facts { display: flex; flex-wrap: wrap; gap: 6px 12px; font-size: 12px; opacity: 0.9; }
  .mapx-facts span { display: inline-flex; align-items: center; gap: 4px; }
  .mapx-facts ha-icon { --mdc-icon-size: 15px; opacity: 0.7; }
  .mapx-near { display: flex; flex-wrap: wrap; align-items: center; gap: 4px; }
  .mapx-near small { margin-right: 2px; }
  .mapx-near button { font: inherit; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 999px; border: 1px solid rgba(255, 255, 255, 0.15); background: rgba(255, 255, 255, 0.06); color: inherit; cursor: pointer; }
  .mapx-near em { font-style: normal; opacity: 0.6; margin-left: 2px; }
  .mapx-info-actions { display: flex; flex-wrap: wrap; gap: 6px; }
  .mapx-info-actions .mini-button { display: inline-flex; align-items: center; gap: 4px; color: #fff; border-color: rgba(255, 255, 255, 0.25); }
  .mapx-info-actions ha-icon { --mdc-icon-size: 14px; }
  .mapx-grid-badge {
    flex: 0 0 auto;
    min-width: 30px;
    text-align: center;
    font-size: 11px;
    font-weight: 900;
    padding: 2px 6px;
    border-radius: 7px;
    background: rgba(255, 255, 255, 0.14);
    font-variant-numeric: tabular-nums;
  }
  @container (min-width: 760px) {
    .mapx { grid-template-columns: minmax(0, 1.6fr) minmax(240px, 1fr); align-items: start; }
    .mapx-top { grid-column: 1 / -1; }
  }
  ha-card.kid .mapx-pin b { font-size: 13px; }
  ha-card.kid .mapx-tool { width: 42px; height: 42px; }

  /* ---- Sprite releases ---- */
  .sp-release {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
    padding: 10px 12px;
    border-radius: 14px;
    border: 1px solid rgba(52, 211, 153, 0.5);
    background: linear-gradient(90deg, rgba(16, 185, 129, 0.28), rgba(59, 130, 246, 0.18));
    color: inherit;
    font: inherit;
    font-size: 13px;
    text-align: left;
    cursor: pointer;
  }
  .sp-release span:nth-child(2) { flex: 1; }
  .sp-release small { font-size: 11px; font-weight: 800; opacity: 0.85; text-decoration: underline; }
  .sp-release.on { box-shadow: 0 0 0 2px #34D399 inset; }
  .sp-release-badge, .sp-badge.new {
    font-size: 10px;
    font-weight: 900;
    letter-spacing: 0.04em;
    padding: 2px 7px;
    border-radius: 999px;
    background: linear-gradient(90deg, #10B981, #3B82F6);
    color: #fff;
    white-space: nowrap;
  }
  .sp-badge.new { top: -6px; left: -10px; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4); animation: sp-new-glow 2.4s ease-in-out infinite; }
  .sp-badge.new.kind { font-size: 9px; }
  @keyframes sp-new-glow { 50% { filter: brightness(1.3); } }
  .sp-card.is-new { border-color: #34D399; }
  .sp-kind.new { box-shadow: 0 0 0 2px #34D399; position: relative; }
  .sp-kind.new::after { content: "✦"; position: absolute; top: -7px; right: -5px; font-size: 10px; color: #34D399; text-shadow: 0 0 3px #000; }
  .sp-kind { position: relative; overflow: visible; }
  .sp-kind img { border-radius: 50%; }
  .sp-chip.new { background: rgba(16, 185, 129, 0.25); color: #6EE7B7; }

  /* ---- v1.15: header actions, sprite sheet, shop pages, news, images ---- */
  .header-right { display: flex; align-items: center; gap: 6px; }
  .header-actions { display: flex; gap: 4px; }
  .hdr-btn {
    width: 32px;
    height: 32px;
    display: grid;
    place-items: center;
    padding: 0;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.16);
    background: rgba(255, 255, 255, 0.05);
    color: inherit;
    cursor: pointer;
  }
  .hdr-btn:hover { border-color: var(--accent); color: var(--accent); }
  .hdr-btn.stop { border-color: #F87171; color: #F87171; }
  .hdr-btn[disabled] { opacity: 0.5; cursor: default; }
  .hdr-btn ha-icon { --mdc-icon-size: 18px; }
  ha-card.compact .hdr-btn { width: 28px; height: 28px; }

  .sp-newdot { position: absolute; top: -2px; right: -2px; width: 10px; height: 10px; border-radius: 50%; background: #34D399; box-shadow: 0 0 0 2px var(--card-background-color, #1c2230), 0 0 8px #34D399; }
  .sp-card { transition: transform 0.15s ease, box-shadow 0.15s ease; }
  .sp-card:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3); }
  .sp-card:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
  dialog.sp-sheet {
    width: min(560px, calc(100vw - 24px));
    max-height: min(86vh, 900px);
    padding: 0;
    border: 1px solid color-mix(in srgb, var(--rarity) 50%, rgba(255, 255, 255, 0.1));
    border-radius: 20px;
    background: var(--card-background-color, #1c2230);
    color: var(--primary-text-color, #fff);
    overflow: hidden;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6);
  }
  dialog.sp-sheet[open] { animation: sheet-in 0.22s cubic-bezier(0.2, 0.8, 0.2, 1); }
  dialog.sp-sheet::backdrop { background: rgba(0, 0, 0, 0.55); backdrop-filter: blur(3px); animation: fade-in 0.2s ease; }
  @keyframes sheet-in { from { opacity: 0; transform: translateY(24px) scale(0.98); } to { opacity: 1; transform: none; } }
  @keyframes fade-in { from { opacity: 0; } }
  .sp-sheet-body { max-height: min(86vh, 900px); overflow-y: auto; padding: 12px; }
  .sp-sheet-nav { position: sticky; top: -12px; z-index: 2; display: flex; align-items: center; gap: 6px; margin: -12px -12px 8px; padding: 10px 12px; background: var(--card-background-color, #1c2230); border-bottom: 1px solid rgba(255, 255, 255, 0.08); font-size: 12px; font-weight: 700; }
  .sp-sheet-nav span { flex: 1; text-align: center; opacity: 0.75; }
  .sp-sheet-nav .close { margin-left: 4px; }
  dialog.sp-sheet .sp-detail { margin: 0; }
  @media (max-width: 600px) {
    dialog.sp-sheet { width: 100vw; max-width: 100vw; margin: auto 0 0; border-radius: 20px 20px 0 0; max-height: 88vh; }
    dialog.sp-sheet[open] { animation: sheet-up 0.25s cubic-bezier(0.2, 0.8, 0.2, 1); }
    @keyframes sheet-up { from { transform: translateY(100%); } to { transform: none; } }
  }

  .shop-controls { display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: center; gap: 8px; margin-bottom: 10px; }
  .shop-refresh { display: inline-flex; align-items: center; gap: 4px; font-size: 11px; opacity: 0.75; white-space: nowrap; }
  .shop-refresh ha-icon { --mdc-icon-size: 14px; }
  .shop-kinds { margin-bottom: 10px; }
  .shop-nav { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: 6px; margin-bottom: 4px; }
  .shop-section-select select { font-size: 14px; }
  .shop-section-meta { font-size: 11px; opacity: 0.65; margin: 2px 2px 8px; }
  .shop-price.varies { color: #FDE68A; font-size: 11px; }
  .shop-price.varies s { color: inherit; opacity: 0.7; }
  .shop-tag { font-size: 10px; font-weight: 700; opacity: 0.75; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .shop-tag.new { color: #6EE7B7; opacity: 1; }
  .shop-tag.back { color: #93C5FD; opacity: 1; }

  .whats-new { display: grid; gap: 6px; padding: 10px 12px; margin-bottom: 10px; border-radius: 14px; border: 1px solid rgba(52, 211, 153, 0.4); background: linear-gradient(135deg, rgba(16, 185, 129, 0.18), rgba(59, 130, 246, 0.12)); }
  .wn-head { display: flex; align-items: center; gap: 8px; font-size: 14px; }
  .wn-row { display: flex; align-items: center; gap: 8px; font-size: 12px; padding: 4px 6px; border-radius: 10px; cursor: pointer; }
  .wn-row:hover { background: rgba(255, 255, 255, 0.06); }
  .wn-icons { display: flex; }
  .wn-icons img { width: 28px; height: 28px; object-fit: contain; margin-right: -6px; }
  .wn-emoji { font-size: 18px; width: 28px; text-align: center; }
  .news-meta { display: flex; justify-content: space-between; align-items: baseline; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; opacity: 0.8; margin: 4px 2px 6px; }
  .news-meta .muted { text-transform: none; letter-spacing: 0; font-weight: 600; }

  /* Images: fade in once decoded, shimmer while loading, skip off-screen tile work */
  img.fi { opacity: 0; transition: opacity 0.3s ease; }
  img.fi.ld { opacity: 1; }
  :is(.shop-img, .bp-reward-img, .sp-img, .bp-hero-img, .locker-hero-img):has(> img.fi:not(.ld))::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(100deg, transparent 30%, rgba(255, 255, 255, 0.09) 50%, transparent 70%);
    background-size: 200% 100%;
    animation: shimmer 1.2s linear infinite;
    pointer-events: none;
  }
  .sp-img, .bp-hero-img, .locker-hero-img { position: relative; }
  @keyframes shimmer { from { background-position: 150% 0; } to { background-position: -50% 0; } }
  .shop-tile, .locker-grid .bp-reward { content-visibility: auto; contain-intrinsic-size: auto 170px; }
`;
