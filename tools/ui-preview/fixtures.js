/* Synthetic data for the Fortnite Family page preview. Every name, id and number here is made up. */
(function () {
  const IMG = '/tools/ui-preview/img/';
  const now = Date.now(), ago = min => new Date(now - min * 60000).toISOString();
  const ids = { player1: 'Player One', player2: 'Player Two' };

  const sprite = (type, name, icon) => ({ type, name, icon: IMG + icon + '.svg' });
  const matches = [
    { match_number: 6, match_count: 1, timestamp: ago(4), playlist_id: 'nobuildbr_habanero_solo', mode_name: 'Ranked Zero Build Solo', mode_category: 'zero_build', is_victory: false, wins: 0, placement_text: 'Top 10', kills: 3, rank_track: 'Battle Royale', current_rank: 'Elite III', rank_progress_pct: 44, rank_delta_pct: 6.5, minutes: 18, score: 412, players_outlived: 88, unreal_rank: null, unreal_rank_change: null, progress: [{ type: 'quests', count: 1 }] },
    { match_number: 5, match_count: 1, timestamp: ago(26), playlist_id: 'nobuildbr_trio', mode_name: 'Zero Build Trios', mode_category: 'zero_build', is_victory: true, wins: 1, placement_text: 'Victory Royale \u{1F3C6}', kills: 6, rank_track: 'Battle Royale', current_rank: 'Elite III', rank_progress_pct: 38, rank_delta_pct: 0, minutes: 22, score: 655, players_outlived: 68, progress: [sprite('sprite_new', 'Ember Sprite', 'sprite-fire'), { type: 'quests', count: 3 }, { type: 'level_up', from: 233, to: 234 }] },
    { match_number: 3, match_count: 2, timestamp: ago(58), playlist_id: 'nobuildbr_duo', mode_name: 'Zero Build Duos', mode_category: 'zero_build', is_victory: false, wins: 0, placement_text: 'Top 25', kills: 2, rank_track: 'Battle Royale', current_rank: 'Elite III', rank_progress_pct: 38, rank_delta_pct: 0, minutes: 25, score: 300, players_outlived: 120, progress: [sprite('sprite_level', 'Tide Sprite', 'sprite-water')] },
    { match_number: 2, match_count: 1, timestamp: ago(80), playlist_id: 'blastberry_squads', mode_name: 'Reload Squads', mode_category: 'reload', is_victory: false, wins: 0, placement_text: 'Match Completed', kills: 0, rank_track: 'Reload Build', current_rank: 'Unranked', rank_progress_pct: 0, rank_delta_pct: 0, minutes: 9, score: 120, players_outlived: 21 },
    { match_number: 1, match_count: 1, timestamp: ago(95), playlist_id: 'nobuildbr_habanero_solo', mode_name: 'Ranked Zero Build Solo', mode_category: 'zero_build', is_victory: false, wins: 0, placement_text: 'Top 25', kills: 1, rank_track: 'Battle Royale', current_rank: 'Elite III', rank_progress_pct: 38, rank_delta_pct: -2.5, minutes: 14, score: 210, players_outlived: 58 },
  ];

  const sizes = (s, d, t, q) => ({ solo: s, duo: d, trio: t, squad: q });
  const sz = (matches, wins, kills) => ({ matches, wins, kills, kd: +(kills / Math.max(1, matches - wins)).toFixed(2), win_rate: +(wins / matches * 100).toFixed(1) });
  const mode = (matches, wins, kills, minutes, out) => ({ ...sz(matches, wins, kills), minutes, players_outlived: out, score: matches * 300 });
  const windowStats = (m, w, k, min, out, since) => ({
    ...sz(m, w, k), players_outlived: out, minutes: min, hours_played: +(min / 60).toFixed(1), kills_per_match: +(k / m).toFixed(2), avg_match_minutes: +(min / m).toFixed(1),
    favourite_mode: { playlist_id: 'nobuildbr_trio', name: 'Zero Build Trios', matches: Math.ceil(m / 2) },
    modes: { build: mode(Math.floor(m / 4), 1, Math.floor(k / 4), min / 4, out / 4), zero_build: mode(Math.floor(m / 2), w - 1, Math.floor(k / 2), min / 2, out / 2), reload: mode(Math.floor(m / 4), 0, Math.floor(k / 4), min / 4, out / 4) },
    team_sizes: sizes(sz(Math.floor(m / 4), 1, 9), sz(Math.floor(m / 4), 1, 15), sz(Math.floor(m / 2), w - 2, 30), undefined),
    team_sizes_by_mode: { zero_build: { solo: sz(Math.floor(m / 8), 0, 4), trio: sz(Math.floor(m / 4), w - 1, 20) }, build: { duo: sz(Math.floor(m / 4), 1, 9) } },
    inputs: { gamepad: { label: 'Controller', ...sz(m, w, k), hours_played: +(min / 60).toFixed(1), share_pct: 100 } },
    since,
  });
  const lifetime = windowStats(1240, 96, 1890, 14800, 61000);

  const families = [
    { id: 'fam-ember', name: 'Ember Sprite', rarity: 'Epic', dex: 1, icon: IMG + 'sprite-fire.svg', owned: true, owned_variants: 2, total_variants: 3, new: true, hint: 'Look near campfires.', variants: [
      { id: 'ember-base', label: 'Base', name: 'Ember Sprite', icon: IMG + 'sprite-fire.svg', owned: true, xp: 1675, count: 2 },
      { id: 'ember-gold', label: 'Gold', name: 'Gold Ember Sprite', icon: IMG + 'sprite-fire.svg', owned: true, xp: 400, count: 1, new: true },
      { id: 'ember-shadow', label: 'Shadow', name: 'Shadow Ember Sprite', icon: IMG + 'sprite-fire.svg', owned: false, drop_chance_pct: 4.5 }] },
    { id: 'fam-tide', name: 'Tide Sprite', rarity: 'Rare', dex: 2, icon: IMG + 'sprite-water.svg', owned: true, owned_variants: 1, total_variants: 2, variants: [
      { id: 'tide-base', label: 'Base', name: 'Tide Sprite', icon: IMG + 'sprite-water.svg', owned: true, xp: 5200, count: 3, mastered: true },
      { id: 'tide-gold', label: 'Gold', name: 'Gold Tide Sprite', icon: IMG + 'sprite-water.svg', owned: false, drop_chance_pct: 7 }] },
    { id: 'fam-leaf', name: 'Leaf Sprite', rarity: 'Uncommon', dex: 3, icon: IMG + 'sprite-leaf.svg', owned: false, owned_variants: 0, total_variants: 2, variants: [
      { id: 'leaf-base', label: 'Base', name: 'Leaf Sprite', icon: IMG + 'sprite-leaf.svg', owned: false, drop_chance_pct: 12 },
      { id: 'leaf-gold', label: 'Gold', name: 'Gold Leaf Sprite', icon: IMG + 'sprite-leaf.svg', owned: false, drop_chance_pct: 3 }] },
  ];
  const curve = [{ level: 1, xp: 0 }, { level: 2, xp: 500 }, { level: 3, xp: 1200 }, { level: 4, xp: 2200 }, { level: 5, xp: 3500 }, { level: 6, xp: 5000 }];

  const outfits = [
    { id: 'Character_SynthA', key: 'character_syntha', name: 'Aurora Scout', rarity: 'Epic', icon: IMG + 'outfit-a.svg', favorite: true },
    { id: 'Character_SynthB', key: 'character_synthb', name: 'Brass Knight', rarity: 'Legendary', icon: IMG + 'outfit-b.svg' },
    { id: 'Character_SynthC', key: 'character_synthc', name: 'Cobalt Runner', rarity: 'Rare', icon: IMG + 'outfit-c.svg', first_seen: ago(600) },
  ];

  function playerStates(pid, opts) {
    const st = (domain, key, state, attributes) => [domain + '.fortnite_' + pid + '_' + key, { entity_id: domain + '.fortnite_' + pid + '_' + key, state: String(state), attributes: { fortnite_player_id: pid, fortnite_entity_key: key, ...attributes } }];
    return Object.fromEntries([
      st('binary_sensor', 'playing', opts.playing ? 'on' : 'off', {}),
      st('sensor', 'overall_stats', lifetime.matches, { total_matches: lifetime.matches, total_kills: lifetime.kills, total_wins: lifetime.wins, kd_ratio: lifetime.kd, win_rate_pct: lifetime.win_rate, minutes_played: lifetime.minutes, players_outlived: lifetime.players_outlived, modes: lifetime.modes, metrics: { hours_played: lifetime.hours_played, kills_per_match: 1.52, kills_per_minute: 0.128, avg_match_minutes: lifetime.avg_match_minutes, score_per_match: 290, solo_top10_rate: 18.2, solo_top25_rate: 41, favourite_mode: lifetime.favourite_mode, last_played: { time: ago(4), playlist_id: 'nobuildbr_habanero_solo', name: 'Ranked Zero Build Solo' } }, team_sizes: lifetime.team_sizes, team_sizes_by_mode: lifetime.team_sizes_by_mode, inputs: lifetime.inputs }),
      st('sensor', 'profile', opts.display, { display_name: opts.display, season: { number: 2, days_left: 31, progress_pct: 64 }, windows: { season: windowStats(310, 30, 520, 3900, 15000, ago(60 * 24 * 40)), week: windowStats(38, 5, 67, 300, 1373, ago(60 * 24 * 7)), today: windowStats(6, 1, 12, 88, 355, ago(60 * 10)) }, window_labels: { week: 'Last 7 days' }, epic_link: 'linked', outfits: { avatar: { id: 'character_syntha', name: 'Aurora Scout', icon: IMG + 'outfit-a.svg', rarity: 'Epic' }, owned_count: 3 } }),
      st('sensor', 'current_session', opts.playing ? 'active' : 'idle', { session_id: 's-' + pid, is_active: opts.playing, start_time: ago(100), duration_minutes: 96, matches_played: 7, wins: 1, kills: 12, kd_ratio: 2, win_rate_pct: 14.3, net_rank_delta_pct: 4, last_match: matches[0], recent_matches: matches }),
      st('sensor', 'rank_battle_royale', opts.rank, { all_tracks: [
        { game_mode: 'Battle Royale', current_rank: opts.rank, progress_pct: 44 }, { game_mode: 'Reload Build', current_rank: 'Unranked', progress_pct: 0 },
        { game_mode: 'Arena Boxfights', current_rank: 'Unranked', progress_pct: 0 }, { game_mode: 'RadiantToothpick-duos-ranked', current_rank: 'Unranked', progress_pct: 0 },
        { game_mode: 'RadiantToothpick-solo-ranked', current_rank: 'Gold II', progress_pct: 20 }, { game_mode: 'Rocket Racing', current_rank: 'Unranked', progress_pct: 0 }],
        division: 9, progress_pct: 44, unreal_rank: null, highest_rank: 'Champion III', highest_division: 15, game_mode: 'Battle Royale' }),
      st('sensor', 'rank_reload', 'Unranked', { division: 0, progress_pct: 0, highest_rank: 'Unranked', game_mode: 'Reload Build' }),
      st('sensor', 'power_ranking', 46925771, { points: null, pr: null, peak_pr: null, delta_pr: null, counting_events: null }),
      st('sensor', 'level', 234, { tier: 0, xp: 0, account_level: 1200 }),
      st('sensor', 'vbucks', 1350, {}),
      st('sensor', 'sprites', 41.7, { version: '38.10', owned_variants: 3, total_variants: 7, owned_families: 2, total_families: 3, mastered_variants: 1, new_sprites: 1, new_kinds: 1, level_curve: curve, families, versions: [] }),
    ]);
  }

  window.PREVIEW = {
    players: [{ id: 'player1', name: 'Player One' }, { id: 'player2', name: 'Player Two' }],
    states: { ...playerStates('player1', { display: 'SynthPlayer1', rank: 'Elite III', playing: true }), ...playerStates('player2', { display: 'SynthPlayer2', rank: 'Bronze I', playing: false }) },
    ws(msg) {
      switch (msg.type) {
        case 'fortnite_activity/catalog': return { playlists: {}, seasons: [], season: { number: 2 } };
        case 'fortnite_activity/matches': return { matches, tracked_matches: matches.length };
        case 'fortnite_activity/outfits': return { outfits, avatar_id: 'character_syntha', catalogue: {} };
        case 'fortnite_activity/map': return { map: { name: 'Synthetic Island', image: IMG + 'map.svg', pois: [], modes: ['br'] } };
        case 'fortnite_activity/battlepass': return { battlepass: null };
        case 'fortnite_activity/shop': return { shop: null, wishlist: [], in_shop: [] };
        case 'fortnite_activity/tournaments': return { tournaments: [] };
        case 'fortnite_activity/news': return { news: [], update: null };
        case 'recorder/statistics_during_period': return {};
        default: return null;
      }
    },
    ids,
  };
})();
