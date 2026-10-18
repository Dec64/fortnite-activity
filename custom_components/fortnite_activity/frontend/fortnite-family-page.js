/* Fortnite Family page card (type: custom:household-fortnite-page-card).
   A whole-dashboard page for a household: one tab per player plus a "Together" view, built around
   custom:fortnite-activity-card (which it embeds for tournaments, the map, shop and other data views).
   Served and auto-loaded by the integration; see docs/family-page.md for configuration.
   Plain JavaScript (no build step). */
(function installFortnitePage(env,enhance){
 const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const image=v=>/^(https?:\/\/|\/(?!\/))/.test(String(v||''))?v:'';
 const valid=s=>s&&!['unknown','unavailable',''].includes(s.state);
 const number=v=>v!==null&&v!==undefined&&v!==''&&Number.isFinite(Number(v))?Number(v):null;
 const fmt=(v,d=0)=>number(v)===null?'–':Number(v).toLocaleString('en-GB',{maximumFractionDigits:d});
 const tabs=[['session','Last session'],['stats','Stats'],['sprites','Sprites'],['events','Events'],['trends','Trends'],['pass','Pass'],['locker','Locker'],['shop','Shop'],['news','News'],['map','Map']];
 const css=`:host{display:block;container-type:inline-size;color:var(--hh-text,#eef1f6);font:15px/1.35 Figtree,sans-serif;--acc:var(--hh-acc,#bef264);--ink:var(--hh-acc-ink,#bef264);--s1:var(--hh-surface-1,#171b24);--s2:var(--hh-surface-2,#212836);--line:var(--hh-line,#2c3443);--mut:var(--hh-text-mute,#9aa3b2)}*{box-sizing:border-box}button{font:inherit;color:inherit;border:0;cursor:pointer}button:focus-visible,summary:focus-visible{outline:2px solid var(--acc);outline-offset:2px}button:disabled{cursor:default;opacity:.6}h1,h2,p{margin:0}.row{display:flex;align-items:center;gap:12px;min-width:0}.sp{margin-left:auto}.heading{min-height:39px;margin-bottom:10px}.heading h2{font:600 22px Outfit,sans-serif;display:flex;align-items:center;gap:10px}.heading h2 span{color:var(--mut)}.heading svg{width:24px;height:24px;stroke:var(--ink);fill:none;stroke-width:1.8}.players{display:flex;gap:8px}.players button{min-height:39px;padding:0 18px;border-radius:99px;background:var(--s1);font-size:14px}.on{background:var(--acc)!important;color:var(--hh-on-accent,#0d1016)!important}.cover{position:relative;overflow:hidden;border:1px solid var(--line);border-radius:24px;height:262px;color:#fff;background:#080a10}.cover>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:70% 30%}.shade{position:absolute;inset:0;background:linear-gradient(90deg,rgba(8,10,16,.92),rgba(8,10,16,.7) 46%,rgba(8,10,16,.1))}.hero-content{position:relative;padding:22px 26px;display:flex;flex-direction:column;gap:10px;height:100%;max-width:760px}.avatar{width:68px;height:68px;flex:none;border-radius:50%;border:3px solid var(--acc);object-fit:cover;background:var(--s2)}.hero-content h1{font:600 40px/1.1 Outfit,sans-serif;overflow-wrap:anywhere;margin-top:4px}.pill{display:inline-flex;align-items:center;gap:6px;min-height:26px;border-radius:99px;padding:0 10px;font-size:13px;font-weight:600;background:var(--s2)}.cover .pill{background:rgba(255,255,255,.14);color:#fff}.cover .pill.level{background:rgba(190,242,100,.14);color:#bef264}.cover .pill.live{background:#4ade80;color:#0d1016}.kpis{gap:28px;margin-top:auto}.kpi{font:600 44px/1 Outfit,sans-serif;letter-spacing:-.02em;font-variant-numeric:tabular-nums}.accent{color:var(--ink)}.cover .accent{color:#bef264}.lab{font-size:13px;color:var(--mut)}.cover .lab{color:#c0c7d2}.track{height:12px;background:var(--s2);border-radius:99px;overflow:hidden;flex:1;min-width:0}.track i{display:block;height:100%;border-radius:99px;background:var(--acc)}.cover .track{background:rgba(255,255,255,.16);margin-top:6px}.heading+.tabs{margin-top:10px}.tabs{display:flex;gap:8px;margin:12px 0;overflow-x:auto}.btn{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:0 16px;border-radius:12px;background:var(--s2);font-size:14px;font-weight:600;white-space:nowrap}.tabs .btn{flex:1;padding:0 6px;min-width:90px}.grid{display:grid;gap:12px}.stats{grid-template-columns:1.35fr 1fr}.card{border:1px solid var(--line);background:var(--s1);border-radius:18px;padding:16px}.sec{display:flex;align-items:center;gap:8px;font-weight:600;margin-bottom:10px}.sec small{margin-left:auto;font-size:13px;font-weight:400;color:var(--mut)}.mode{display:grid;grid-template-columns:60px 86px 1fr 54px 62px;gap:12px;align-items:center;border-top:1px solid var(--line);padding:7px 0;font-size:14px}.mode .lab:last-child,.mode>b:nth-last-child(2){text-align:right}.four{grid-template-columns:repeat(4,minmax(0,1fr))}.three{grid-template-columns:repeat(3,minmax(0,1fr))}.stat{padding:12px 14px;background:var(--s2);border-radius:14px;min-width:0}.num{font:600 30px/1.1 Outfit,sans-serif;font-variant-numeric:tabular-nums}.col{display:flex;flex-direction:column;gap:10px;min-width:0}.favourite{position:relative;overflow:hidden;min-height:143px;padding:0}.favourite>img{width:100%;height:143px;display:block;object-fit:cover;object-position:50% 30%}.favourite .caption{position:absolute;left:0;right:0;bottom:0;padding:12px 16px;background:rgba(13,16,22,.84);color:#fff}.caption .lab{color:#c0c7d2}.caption .btn{margin-left:auto}.stats-details{padding:0;background:none;color:var(--mut);font-size:13px}.more{margin-top:12px}.more:not([open]){display:none}.more summary{min-height:44px;cursor:pointer;padding:12px;background:var(--s1);border-radius:12px}.native-host{margin-top:12px}.sprites{grid-template-columns:1.6fr 1fr;align-items:stretch}.collection{background:color-mix(in srgb,var(--acc) 14%,var(--s1));padding:14px 18px;border-radius:24px}.ring{width:92px;height:92px;flex:none;border-radius:50%;background:conic-gradient(var(--acc) var(--pct),var(--line) 0);padding:9px}.ring>span{height:100%;display:flex;align-items:center;justify-content:center;border-radius:50%;background:var(--s1);font:600 22px Outfit,sans-serif}.collection .summary-tiles{margin-left:auto;flex:1}.collection .kpi{white-space:nowrap}.filters{display:flex;gap:8px;align-items:center;flex-wrap:wrap}.sprite-grid{grid-template-columns:repeat(4,minmax(0,1fr));max-height:390px;overflow:auto}.sprite{display:flex;flex-direction:column;align-items:flex-start;gap:4px;text-align:left;min-height:188px;padding:10px 12px}.sprite.selected{border-color:var(--acc);background:color-mix(in srgb,var(--acc) 14%,var(--s1))}.sprite img{width:96px;height:96px;max-width:100%;object-fit:contain}.sprite .art{position:relative;width:100%}.sprite .pill{position:absolute;right:0;top:0}.gold{background:#f5c84b;color:#0d1016}.dots{display:flex;align-items:center;gap:5px;width:100%;margin-top:auto}.dots i{width:10px;height:10px;border-radius:50%;background:var(--line);flex:none}.dots i.owned{background:var(--acc)}.sprite-detail{display:flex;flex-direction:column;gap:12px;height:566px;overflow:auto}.detail-head .art-button{background:none;padding:0;flex:none;width:132px;height:132px}.art-button img{width:100%;height:100%;object-fit:contain}.detail-head h1{font:600 34px/1.1 Outfit,sans-serif;margin:8px 0 4px}.xp-row{font-size:13px;color:var(--mut);margin-bottom:6px}.kinds{grid-template-columns:repeat(4,minmax(0,1fr))}.kind{padding:12px 4px;min-height:106px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:4px}.kind img{width:40px;height:40px;object-fit:contain}.kind.on .lab{color:inherit}.kind b{font-size:13px}.boon{display:flex;gap:12px;justify-content:space-between;border-top:1px solid var(--line);padding:12px 0;font-size:14px}.boon span{color:var(--mut);text-align:right}.hint{background:var(--s2);padding:12px 14px;border-radius:14px;font-size:14px}.empty{padding:16px;color:var(--mut)}.together.cover{height:232px}.together .hero-content{max-width:800px}.duo-avatars{display:flex}.duo-avatars .avatar{border-color:#4ade80}.duo-avatars .avatar+img{margin-left:-18px}.together-grid{grid-template-columns:1fr 1fr 1.1fr;margin-top:12px}.player-summary{min-height:208px}.player-summary .avatar{width:52px;height:52px}.player-summary .grid{margin-top:12px}.feed{grid-column:3;grid-row:1/span 2}.feed-row{display:flex;gap:16px;padding:12px 0;border-top:1px solid var(--line)}.feed-row .lab{margin-top:4px}.compare{display:grid;grid-template-columns:62px 1fr 64px;gap:12px;align-items:center;margin:12px 0;font-size:14px}.compare>span:last-child{text-align:right}.notice{margin-top:12px;color:var(--mut);font-size:13px}dialog{position:fixed;inset:0;margin:auto;width:min(96vw,1400px);height:94svh;max-width:96vw;max-height:94svh;background:var(--s1);color:inherit;border:1px solid var(--line);border-radius:20px;padding:16px}dialog::backdrop{background:rgba(0,0,0,.85)}dialog .viewer{height:calc(100% - 64px);display:flex;align-items:center;justify-content:center}dialog img{width:100%;height:100%;object-fit:contain}.error{color:var(--hh-bad,#f87171)}
@media(min-width:1000px){:host([ha-layout]){margin:-16px -6px 0}}@container(max-width:900px){.stats,.sprites{grid-template-columns:1fr}.sprite-grid{max-height:390px}.together-grid{grid-template-columns:1fr 1fr}.feed{grid-column:1/span 2;grid-row:auto}.collection .summary-tiles{flex:none}.heading{flex-wrap:wrap}.hero-content{max-width:100%}.sprite-detail{min-height:480px;height:auto;overflow:visible}}
@container(max-width:600px){.heading h2{font-size:20px}.players{gap:4px}.players button{padding:0 12px}.cover{height:auto;min-height:280px}.hero-content{padding:18px;gap:18px}.hero-content h1{font-size:30px}.avatar{width:52px;height:52px}.kpi{font-size:32px}.kpis{gap:18px;flex-wrap:wrap}.mode{grid-template-columns:42px 65px 1fr 46px;gap:6px}.mode .lab:last-child{display:none}.mode .lab{font-size:13px}.four{grid-template-columns:repeat(2,minmax(0,1fr))}.collection>.row{flex-wrap:wrap}.collection .summary-tiles{width:100%}.collection .kpi{font-size:36px}.sprite-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.together-grid{grid-template-columns:1fr}.feed{grid-column:auto}.together.cover{height:auto;min-height:280px}.detail-head .art-button{width:100px;height:100px}.detail-head h1{font-size:28px}.three{gap:6px}.stat{padding:12px 8px}.num{font-size:26px}.filters{gap:6px}.filters .btn{padding:0 12px}.tabs .btn{min-width:100px}.caption{flex-wrap:wrap}.caption .btn{min-height:36px}.heading .players{margin-left:0}}
`;
 class Page extends env.HTMLElement{
  constructor(){super();this.attachShadow({mode:'open'});this.shadowRoot.addEventListener('click',e=>this.tap(e));this.manual=false;this.both=false;this.section='stats';this.filter='all';this.sort='level';}
  setConfig(c){this.config=c;this.player=String(c.player||(typeof c.players?.[0]==='string'?c.players[0]:c.players?.[0]?.id)||'').toLowerCase()||null;this.native=null;this.version=(this.version||0)+1;this.sig='';this.render();}
  connectedCallback(){if(this.closest('hui-card')||this.getRootNode()?.host)this.setAttribute('ha-layout','');}
  getCardSize(){return 10;}
  getGridOptions(){return{columns:'full',rows:'auto'};}
  pids(){const l=(this.config?.players||[]).map(p=>typeof p==='string'?p:p?.id).filter(Boolean).map(x=>String(x).toLowerCase());if(l.length)return l;const s=new Set();for(const st of Object.values(this._hass?.states||{})){const id=st.attributes?.fortnite_player_id;if(id)s.add(String(id).toLowerCase());}return[...s].sort();}
  pname(id){const p=(this.config?.players||[]).find(x=>String(typeof x==='string'?x:x?.id||'').toLowerCase()===id);return(p&&typeof p==='object'&&p.name)||String(id||'').replace(/(^|[_\s-]+)(\w)/g,(m,a,b)=>(a?' ':'')+b.toUpperCase());}
  pbuttons(){const ids=this.pids();return ids.concat(ids.length>1?['together']:[]);}
  set hass(h){this._hass=h;if(!this.player)this.player=this.pids()[0]||null;const pair=this.pids().slice(0,2),both=pair.length===2&&pair.every(p=>this.playing(p));if(both&&!this.both&&!this.manual){this.player='together';this.section='stats';}if(!both)this.manual=false;this.both=both;if(this.native){this.native._now=Date.now();this.native.hass=h;}this.render();}
  entity(player,key){return Object.values(this._hass?.states||{}).find(s=>s.attributes?.fortnite_player_id===player&&s.attributes?.fortnite_entity_key===key);}
  attrs(player,key){const s=this.entity(player,key);return valid(s)?s.attributes:{};}
  playing(player){return this.entity(player,'playing')?.state==='on';}
  avatar(player){const cfg=(this.config?.players||[]).find(x=>typeof x==='object'&&String(x?.id||'').toLowerCase()===player);return image(this._hass?.states[cfg?.person||this.config?.people?.[player]||'person.'+player]?.attributes?.entity_picture);}
  portrait(player){return '<img class="avatar" src="'+esc(this.avatar(player))+'" alt="'+esc(this.pname(player))+'">';}
  tile(label,value,accent=false){return'<div class="stat"><div class="lab">'+esc(label)+'</div><div class="num'+(accent?' accent':'')+'">'+esc(value)+'</div></div>';}
  metric(label,value,accent=false){return'<div><div class="kpi'+(accent?' accent':'')+'">'+esc(value)+'</div><div class="lab">'+esc(label)+'</div></div>';}
  when(value){const d=new Date(value);return Number.isFinite(d.getTime())?d.toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short',timeZone:this._hass?.config?.time_zone||'Europe/London'}):'No session recorded';}
  hero(){const p=this.player,stats=this.attrs(p,'overall_stats'),profile=this.attrs(p,'profile'),season=profile.season||{},level=this.entity(p,'level'),last=stats.metrics?.last_played?.time;
   return'<div class="cover"><img src="'+esc(this.config.artwork.hero)+'" alt="Fortnite artwork"><div class="shade"></div><div class="hero-content"><div class="row">'+this.portrait(p)+'<div><div class="row"><span class="pill level">Level '+(valid(level)?fmt(level.state):'–')+'</span><span class="pill '+(this.playing(p)?'live':'')+'">'+(this.playing(p)?'Live · playing Fortnite':'Idle'+(last?' · played '+this.when(last):''))+'</span></div><h1>'+esc(profile.display_name||'Profile unavailable')+'</h1></div></div><div class="row kpis">'+this.metric('Win rate',fmt(stats.win_rate_pct,1)+(number(stats.win_rate_pct)===null?'':'%'),true)+this.metric('Wins',fmt(stats.total_wins))+this.metric('K/D',fmt(stats.kd_ratio,2))+this.metric('Matches',fmt(stats.total_matches))+'</div><div><div class="row lab"><span>'+esc(season.number?'Season '+season.number+' · season progress':'Season unavailable')+'</span><span class="sp">'+(number(season.days_left)===null?'':fmt(season.days_left)+' days left')+'</span></div><div class="track"><i style="width:'+Math.max(0,Math.min(100,number(season.progress_pct)||0))+'%"></i></div></div></div></div>';
  }
  stats(){const a=this.attrs(this.player,'overall_stats'),m=a.metrics||{},s=this.attrs(this.player,'current_session'),f=m.favourite_mode;
   const rows=['solo','duo','trio','squad'].map(key=>{const t=a.team_sizes?.[key]||{};return'<div class="mode"><b>'+key[0].toUpperCase()+key.slice(1)+'</b><span class="lab">'+fmt(t.matches)+' matches</span><div class="track"><i style="width:'+Math.max(0,Math.min(100,(number(t.win_rate)||0)*3))+'%"></i></div><b>'+fmt(t.win_rate,1)+(number(t.win_rate)===null?'':'%')+'</b><span class="lab">'+fmt(t.kd,2)+' K/D</span></div>';}).join('');
   return'<div class="grid stats"><section class="card"><div class="sec">By mode <small><button class="stats-details" data-more="" aria-label="More stats, ranks and session controls">Lifetime · win rate ⌄</button></small></div>'+rows+'<div class="grid four" style="margin-top:12px">'+this.tile('Kills',fmt(a.total_kills))+this.tile('Top 10 (solo)',fmt(m.solo_top10_rate,1)+(number(m.solo_top10_rate)===null?'':'%'))+this.tile('Avg match',fmt(m.avg_match_minutes)+'m')+this.tile('Hours',fmt(m.hours_played,1))+'</div></section><div class="col"><section class="card"><div class="sec">'+(this.playing(this.player)?'Current session':'Last session')+'<small>'+esc(this.when(s.start_time))+(number(s.duration_minutes)===null?'':' · '+fmt(s.duration_minutes)+' min')+'</small></div><div class="grid three">'+this.tile('Matches',fmt(s.matches_played))+this.tile('Wins',fmt(s.wins),true)+this.tile('Kills',fmt(s.kills))+'</div></section><section class="card favourite"><img src="'+esc(this.config.artwork.grid)+'" alt="Fortnite artwork"><div class="row caption"><span><b>'+esc(f?'Favourite mode · '+f.name:'Favourite mode unavailable')+'</b><div class="lab">'+(f?fmt(f.matches)+' matches':'No recorded mode data')+'</div></span><button class="btn" data-section="shop">Item shop</button></div></section></div></div><details class="more"><summary>More stats, ranks and session controls</summary><div class="native-host"></div></details>';
  }
  level(xp,curve){xp=number(xp);const sorted=[...(curve||[])].filter(c=>number(c.level)!==null&&number(c.xp)!==null).sort((a,b)=>a.level-b.level);if(xp===null||!sorted.length)return null;let i=0;for(let k=0;k<sorted.length;k++)if(xp>=sorted[k].xp)i=k;const current=sorted[i],next=sorted[i+1];return{value:current.level,next:next?.level,target:next?.xp,progress:next?Math.max(0,Math.min(100,(xp-current.xp)/(next.xp-current.xp)*100)):100};}
  sprites(){const s=this.entity(this.player,'sprites'),a=valid(s)?s.attributes:{},all=a.families||[],curve=a.level_curve;
   const families=all.filter(f=>this.filter==='collected'?f.owned:this.filter==='missing'?!f.owned:this.filter==='new'?f.new||f.new_kinds>0:true).sort((x,y)=>this.sort==='name'?String(x.name).localeCompare(String(y.name)):(this.best(y,curve)-this.best(x,curve))||((x.dex??0)-(y.dex??0)));
   let f=all.find(f=>f.id===this.selected);if(!f||!families.includes(f)){f=families[0];this.selected=f?.id;this.kind=null;}const kinds=f?.variants||[],kind=kinds.find(v=>v.id===this.kind)||kinds.find(v=>v.owned)||kinds[0],lv=kind?.owned?this.level(kind.xp,curve):null;
   const owned=fmt(a.owned_variants),total=fmt(a.total_variants),pct=valid(s)?number(s.state):null,buttons=[['all','All'],['collected','Collected'],['missing','Missing'],['new','New this season']].map(([id,label])=>'<button class="btn'+(this.filter===id?' on':'')+'" data-filter="'+id+'">'+label+'</button>').join('');
   const cards=families.map(f=>'<button class="card sprite'+(f.id===this.selected?' selected':'')+'" data-family="'+esc(f.id)+'" aria-pressed="'+(f.id===this.selected)+'"><span class="art">'+(image(f.icon)?'<img loading="lazy" src="'+esc(image(f.icon))+'" alt="">':'<span class="empty">?</span>')+(f.mastered?'<span class="pill gold">Mastered</span>':f.new?'<span class="pill accent">New</span>':'')+'</span><b>'+esc(f.name)+'</b><span class="dots">'+(f.variants||[]).map(v=>'<i class="'+(v.owned?'owned':'')+'"></i>').join('')+'<span class="lab sp">'+(f.owned?'Lv '+(this.best(f,curve)||'–'):'Not found')+'</span></span></button>').join('');
   const hd=image(kind?.icon_large)||(kind===kinds[0]?image(f?.icon_large):'')||image(kind?.icon)||image(f?.icon),art=hd?'<button class="art-button" data-image="'+esc(hd)+'" data-small="'+esc(image(kind?.icon)||image(f?.icon))+'" data-name="'+esc(kind?.name||f?.name)+'" aria-label="Enlarge '+esc(kind?.name||f?.name)+'"><img src="'+esc(hd)+'" alt="'+esc(kind?.name||f?.name)+'"></button>':'<span class="empty">Image unavailable</span>';
   const boonRows=(kind?.boons?.length?kind.boons:f?.boons||[]).map(b=>'<div class="boon"><b>'+esc(b.name||'Boon')+'</b><span>'+esc(b.description||b.text||'Description unavailable')+'</span></div>').join('');
   const detail=f?'<div class="row detail-head">'+art+'<div><div class="row"><span class="pill accent">'+(lv?'Level '+lv.value:kind?.owned?'Level unavailable':'Not collected')+'</span><span class="pill">'+fmt(f.owned_variants)+' of '+fmt(f.total_variants)+' kinds</span></div><h1>'+esc(f.name)+'</h1><div class="lab">'+esc(f.added_in?'Added in update '+f.added_in:f.description||'')+'</div></div></div><div><div class="row xp-row"><span>'+ (lv?.next?'To level '+lv.next:lv?'Maximum level':'XP unavailable')+'</span><span class="sp">'+(lv?fmt(kind.xp)+(lv.target?' of '+fmt(lv.target)+' XP':' XP'):'')+'</span></div><div class="track"><i style="width:'+(lv?.progress||0)+'%"></i></div></div><div class="sec">Kinds <small>Tap one for a closer look</small></div><div class="grid kinds">'+kinds.map(v=>{const l=v.owned?this.level(v.xp,curve):null;return'<button class="btn kind'+(v===kind?' on':'')+'" data-kind="'+esc(v.id)+'">'+(image(v.icon)?'<img loading="lazy" src="'+esc(image(v.icon))+'" alt="">':'')+'<b>'+esc(v.label||v.name)+'</b><span class="lab">'+(l?'Lv '+l.value:v.owned?'Level unavailable':'Missing')+'</span></button>';}).join('')+'</div><div class="sec">Boons <small>What it gives you</small></div><div>'+ (boonRows||'<div class="empty">No boon information available</div>')+'</div>'+(f.hint?'<div class="hint"><div class="lab">How to find this Sprite</div>'+esc(f.hint)+'</div>':''):'<div class="empty">No Sprite collection available</div>';
   return'<div class="grid sprites"><div class="col"><section class="collection"><div class="row"><div class="ring" style="--pct:'+Math.max(0,Math.min(100,pct))+'%"><span>'+(pct===null?'–':Math.round(pct)+'%')+'</span></div><div><div class="lab">'+esc(this.pname(this.player)+"’s sprite collection")+'</div><div class="kpi"><span class="accent">'+owned+'</span> of '+total+'</div></div><div class="grid three summary-tiles">'+this.tile('Families',fmt(a.owned_families)+' / '+fmt(a.total_families))+this.tile('Mastered',fmt(a.mastered_variants))+this.tile('New',fmt(a.new_sprites))+'</div></div></section><div class="filters">'+buttons+'<span class="lab sp">Sort</span><button class="btn" data-sort="">'+(this.sort==='level'?'Level':'Name')+'</button></div><div class="grid sprite-grid">'+(cards||'<p class="empty">No Sprites in this filter</p>')+'</div></div><section class="card sprite-detail">'+detail+'</section></div>';
  }
  best(f,curve){return Math.max(0,...(f.variants||[]).filter(v=>v.owned).map(v=>this.level(v.xp,curve)?.value||0));}
  together(){const players=this.pids().slice(0,2),sessions=players.map(p=>this.attrs(p,'current_session')),both=this.both;
   const hero='<div class="cover together"><img src="'+esc(this.config.artwork.hero)+'" alt="Fortnite artwork"><div class="shade"></div><div class="hero-content"><div class="row"><div class="duo-avatars">'+players.map(p=>this.portrait(p)).join('')+'</div><div><span class="pill '+(both?'live':'')+'">'+(both?'Live · both playing Fortnite':'Together · waiting for both players')+'</span><h1>'+esc(players.map(p=>this.pname(p)).join(' and '))+'</h1></div></div><div>Both players’ Fortnite activity · matches may be separate</div><div class="row kpis">'+this.metric(this.pname(players[0])+' wins',fmt(sessions[0].wins),true)+this.metric(this.pname(players[1])+' wins',fmt(sessions[1]?.wins))+this.metric('Player kills',sessions.every(s=>number(s.kills)!==null)?fmt(Number(sessions[0].kills)+Number(sessions[1].kills)):'–')+this.metric('Longest session',sessions.some(s=>number(s.duration_minutes)!==null)?fmt(Math.max(...sessions.map(s=>number(s.duration_minutes)||0)))+'m':'–')+'</div></div></div>';
   const playerCards=players.map((p,i)=>{const s=sessions[i],profile=this.attrs(p,'profile');return'<section class="card player-summary"><div class="row">'+this.portrait(p)+'<span><b>'+esc(this.pname(p))+'</b><div class="lab">'+esc(profile.display_name||'Profile unavailable')+' · Level '+(valid(this.entity(p,'level'))?fmt(this.entity(p,'level').state):'–')+'</div></span><span class="pill sp accent">'+(this.playing(p)?'Playing':'Idle')+'</span></div><div class="grid three">'+this.tile('Session kills',fmt(s.kills),true)+this.tile('Matches',fmt(s.matches_played))+this.tile('Wins',fmt(s.wins))+'</div><div class="notice">'+esc(this.when(s.start_time))+'</div></section>';}).join('');
   const feed=players.flatMap((p,i)=>(sessions[i].recent_matches||[]).map(m=>({...m,player:p}))).sort((a,b)=>new Date(b.timestamp)-new Date(a.timestamp)).slice(0,3);
   const feedCard='<section class="card feed tg-feed"><div class="sec">Recent player matches <small>Tap a game to see it</small></div><div class="tg-cols">'+players.map((p,i)=>{const name=this.pname(p),list=sessions[i].recent_matches||[];return '<div class="tg-col">'+(list.length&&this.rail?this.rail('tg-'+p,name+' · '+this.when(sessions[i].start_time),list.map(m=>this.matchTile({...m,who:name}))):'<p class="empty">'+esc(name)+' has no recorded games yet</p>')+'</div>';}).join('')+'</div><div class="row" style="margin-top:12px;flex-wrap:wrap">'+players.map(p=>'<button class="btn" data-player="'+esc(p)+'">'+esc(this.pname(p))+' stats</button>').join('')+'<button class="btn" data-sprites="'+esc(players[0])+'">Sprites found</button></div></section>';
   const kills=sessions.map(s=>number(s.kills)),matches=sessions.map(s=>number(s.matches_played)),compare=(label,v)=>'<div class="compare"><b>'+label+'</b><div class="track"><i style="width:'+(v.every(x=>x!==null)&&v[0]+v[1]>0?v[0]/(v[0]+v[1])*100:0)+'%"></i></div><span class="lab">'+fmt(v[0])+' to '+fmt(v[1])+'</span></div>';
   const duo=players.map(p=>this.attrs(p,'overall_stats').team_sizes?.duo||{});
   return hero+'<div class="grid together-grid">'+playerCards+feedCard+'<section class="card"><div class="sec">Who is ahead <small>'+esc(players.map(p=>this.pname(p)).join(' to '))+'</small></div>'+compare('Kills',kills)+compare('Matches',matches)+'</section><section class="card"><div class="sec">Duos <small>Individual lifetime stats</small></div><div class="grid three">'+this.tile(this.pname(players[0])+' matches',fmt(duo[0].matches))+this.tile(this.pname(players[0])+' win %',fmt(duo[0].win_rate,1)+(number(duo[0].win_rate)===null?'':'%'),true)+this.tile(this.pname(players[1])+' win %',fmt(duo[1]?.win_rate,1)+(number(duo[1]?.win_rate)===null?'':'%'))+'</div></section></div>';
  }
  render(){if(!this.config||!this._hass||this.shadowRoot.querySelector('dialog')?.open)return;const states=Object.values(this._hass.states).filter(s=>s.attributes?.fortnite_player_id||Object.values(this.config.people||{}).includes(s.entity_id)),sig=JSON.stringify([this.dataSig?this.dataSig():states,this.player,this.section,this.filter,this.sort,this.selected,this.kind]);if(sig===this.sig)return;const focus=this.shadowRoot.activeElement,focusData=focus?.dataset?{...focus.dataset}:null;this.sig=sig;
   const moreOpen=!!this.shadowRoot.querySelector('details')?.open,detached=this.native;const isTogether=this.player==='together',nativeView=!isTogether&&!['stats','sprites'].includes(this.section);
   this.shadowRoot.innerHTML='<style>'+css+'</style><header class="row heading"><h2><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 8h10a5 5 0 015 5v2a3 3 0 01-5 2l-1-1H8l-1 1a3 3 0 01-5-2v-2a5 5 0 015-5zM8 11v4M6 13h4M16 12h.01M18 14h.01"/></svg>Fortnite Family <span>'+esc(isTogether?'Together':this.pname(this.player))+'</span></h2><div class="players sp">'+this.pbuttons().map(p=>'<button data-player="'+esc(p)+'" class="'+(p===this.player?'on':'')+'" aria-pressed="'+(p===this.player)+'">'+esc(p==='together'?'Together':this.pname(p))+'</button>').join('')+'</div></header>'+(!isTogether&&this.section==='stats'?this.hero():'')+(!isTogether?'<nav class="tabs" aria-label="Fortnite sections">'+tabs.map(([id,label])=>'<button class="btn'+(id===this.section?' on':'')+'" data-section="'+id+'" aria-pressed="'+(id===this.section)+'">'+label+'</button>').join('')+'</nav>':'')+(isTogether?this.together():this.section==='stats'?this.stats():this.section==='sprites'?this.sprites():'<div class="native-host"></div>')+'<dialog aria-label="Sprite artwork"><div class="row"><b class="image-title"></b><button class="btn sp" data-close="">Close</button></div><div class="viewer"><img alt=""></div><p class="lab image-status" role="status"></p></dialog>';
   if(moreOpen&&this.shadowRoot.querySelector('details'))this.shadowRoot.querySelector('details').open=true;if(detached&&this.shadowRoot.querySelector('.native-host')&&(nativeView||moreOpen))this.shadowRoot.querySelector('.native-host').append(detached);else if(detached){this.native=null;this.version++;}
   if(nativeView)this.mountNative();this.shadowRoot.querySelector('details')?.addEventListener('toggle',e=>{if(e.target.open)this.mountNative(true);else{this.native?.remove();this.native=null;this.version++;}});
   if(focusData)for(const b of this.shadowRoot.querySelectorAll('button'))if(JSON.stringify({...b.dataset})===JSON.stringify(focusData)){b.focus({preventScroll:true});break;}
  }
  async mountNative(details=false){const player=this.player,section=details?'stats':this.section;if(player==='together'||this.mounting)return;const version=this.version;this.mounting=true;try{const config={type:'custom:fortnite-activity-card',...this.config.native,player,header:details?'full':'none',sections:[section],default_section:section};if(!this.native){const helpers=await env.loadCardHelpers();if(!this.isConnected||version!==this.version)return;this.native=helpers.createCardElement(config);}else this.native.setConfig(config);this.native.hass=this._hass;this.native._setView(section);this.shadowRoot.querySelector('.native-host')?.append(this.native);}catch{const host=this.shadowRoot.querySelector('.native-host');if(host)host.textContent='Fortnite section unavailable';}finally{this.mounting=false;if(version!==this.version&&(this.shadowRoot.querySelector('details')?.open||this.player!=='together'&&!['stats','sprites'].includes(this.section)))this.mountNative(!!this.shadowRoot.querySelector('details')?.open);}}
  tap(e){const b=e.target.closest('button');if(!b)return;const d=b.dataset;if('more'in d){const details=this.shadowRoot.querySelector('details');details.open=!details.open;return;}if('close'in d){this.shadowRoot.querySelector('dialog').close();return;}if(d.image){this.openImage(b);return;}
   if(d.player){this.player=d.player;this.manual=true;this.section='stats';this.selected=null;this.kind=null;this.native?.remove();this.native=null;this.version++;}
   if(d.sprites){this.player=d.sprites;this.section='sprites';this.selected=null;this.kind=null;this.native=null;this.version++;}
   if(d.section){this.section=d.section;this.version++;}if(d.filter)this.filter=d.filter;if('sort'in d)this.sort=this.sort==='level'?'name':'level';if(d.family){this.selected=d.family;this.kind=null;}if(d.kind)this.kind=d.kind;this.sig='';this.render();}
  openImage(button){const dialog=this.shadowRoot.querySelector('dialog'),img=dialog.querySelector('img'),status=dialog.querySelector('.image-status');dialog.querySelector('.image-title').textContent=button.dataset.name;img.alt=button.dataset.name;let fallback=false;img.onload=()=>{status.textContent=img.naturalWidth+' × '+img.naturalHeight+' · original catalogue image';};img.onerror=()=>{if(!fallback&&button.dataset.small&&button.dataset.small!==button.dataset.image){fallback=true;img.src=button.dataset.small;}else{status.textContent='Image unavailable';img.removeAttribute('src');}};status.textContent='Loading original image…';img.src=button.dataset.image;dialog.showModal();dialog.onclick=e=>{if(e.target===dialog)dialog.close();};dialog.addEventListener('close',()=>{this.sig='';this.render();[...this.shadowRoot.querySelectorAll('[data-image]')].find(b=>b.dataset.image===button.dataset.image)?.focus({preventScroll:true});},{once:true});}
 }
 if(!enhance&&typeof require==='function')enhance=require('./household_fortnite_views').installFortniteViews;
 if(enhance)enhance(Page,env,{esc,image,valid,number,fmt,tabs,css});
 if(!env.customElements.get('household-fortnite-page-card'))env.customElements.define('household-fortnite-page-card',Page);
})(window,(function installFortniteViews(Page, env, { esc, image, valid, number, fmt, tabs, css }) {
  const p = Page.prototype, oldMount = p.mountNative, oldRender = p.render;
  const btn = (label, key, value = "", on = false) => '<button class="btn' + (on ? " on" : "") + '" data-' + key + '="' + esc(value) + '" aria-pressed="' + on + '">' + label + "</button>";
  const art = (url, name = "", size = 96, fallback = "") => {
    const original = image(url);
    if (!original) return "";
    const allowed = ["cdn.api-fortnite.com", "cdn-live.prm.ol.epicgames.com", "raw.githubusercontent.com"];
    let src = original;
    try { if (!["localhost", "127.0.0.1"].includes(env.location?.hostname) && allowed.includes(new URL(original).hostname)) src = "/api/fortnite_activity/thumb?w=" + Math.min(720, Math.round(size * 2.4)) + "&u=" + encodeURIComponent(original); } catch {}
    return '<img loading="lazy" decoding="async" width="' + size + '" height="' + size + '" src="' + esc(src) + '" data-fallback="' + esc(image(fallback)) + '" alt="' + esc(name) + '">';
  };
  const rewardType = r => {
    if (r.type === "Currency" && /MTX|v-?bucks/i.test((r.icon || "") + (r.name || ""))) return "V-Bucks";
    return ({AthenaCharacter:"Outfit",AthenaPickaxe:"Pickaxe",AthenaGlider:"Glider",AthenaDance:/Spray/i.test(r.icon || "")?"Spray":/Emoji|Emoticon/i.test(r.icon || "")?"Emoticon":"Emote",AthenaItemWrap:"Wrap",AthenaLoadingScreen:"Loading Screen",CosmeticVariantToken:"Style",Currency:"Currency",HomebaseBannerIcon:"Banner",SparksSong:"Jam Track",SparksGuitar:"Instrument",AthenaSkyDiveContrail:"Contrail",CosmeticShoes:"Kicks",AthenaBackpack:"Back Bling",AthenaMusicPack:"Lobby Music"})[r.type] || "Cosmetic";
  };
  const rewardName = r => rewardType(r) === "V-Bucks" && r.quantity ? fmt(r.quantity) + " V-Bucks" : r.name && !/^[A-Za-z]+_[A-Za-z0-9_]+$/.test(r.name) ? r.name : rewardType(r);
  const empty = (text) => '<p class="empty" role="status">' + esc(text) + "</p>";
  const bar = (value) => '<div class="track"><i style="width:' + Math.max(0, Math.min(100, number(value) || 0)) + '%"></i></div>';
  const chunks = (items, n) => Array.from({ length: Math.ceil(items.length / n) }, (_, i) => items.slice(i * n, i * n + n));
  const spriteCurve=curve=>{const result=[];for(const row of [...curve||[]].filter(r=>number(r.level)!==null&&number(r.xp)!==null).sort((a,b)=>a.level-b.level)){if(result.length&&row.xp<result.at(-1).xp)break;result.push(row);}return result.length>=2?result:[];};
  const rarityOrder = value => { const index = ['Mythic','Legendary','Epic','Rare','Uncommon','Common'].indexOf(value); return index < 0 ? 99 : index; };
  const cosmeticKey = item => String(item?.key || item?.id || '').toLowerCase();

  const ICON = {
    target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="7"/><path d="M12 2v5M12 17v5M2 12h5M17 12h5"/></svg>',
    medal: c => '<svg class="medal" viewBox="0 0 48 48" aria-hidden="true"><path d="M14 4h8l4 14h-8zM34 4h-8l-4 14h8z" fill="#2563eb"/><circle cx="24" cy="30" r="14" fill="' + c + '"/><path d="M24 21l2.8 5.8 6.2.8-4.6 4.3 1.2 6.1-5.6-3-5.6 3 1.2-6.1-4.6-4.3 6.2-.8z" fill="#fff" opacity=".95"/></svg>',
    tick: '<span class="tick"><svg viewBox="0 0 24 24" fill="none" stroke="#0d1016" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg></span>',
    pad: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 8h10a5 5 0 015 5v2a3 3 0 01-5 2l-1-1H8l-1 1a3 3 0 01-5-2v-2a5 5 0 015-5zM8 11v4M6 13h4M16 12h.01M18 14h.01"/></svg>'
  };
  const killIcons = k => k ? '<span class="match-icons" aria-label="' + k + ' eliminations">' + ICON.target.repeat(Math.min(k, 6)) + (k > 6 ? '<b>+' + (k - 6) + '</b>' : '') + '</span>' : '';
  const teamSize = m => { const t = (m.playlist_id || '') + ' ' + (m.mode_name || ''); return /solo/i.test(t) ? 1 : /duo/i.test(t) ? 2 : /trio/i.test(t) ? 3 : /squad/i.test(t) ? 4 : null; };
  const matchTier = m => {
    if (m.is_victory) return { t: 'win', label: 'Victory Royale' };
    const out = number(m.players_outlived), size = teamSize(m);
    let place = number(m.placement);
    if (place === null && out !== null && size && !/reload|blitz|creative|juno|lego|festival|sparks|blastberry|blendhead|piperboot|ropesmile|punchberry/i.test(m.playlist_id || '')) place = Math.max(2, Math.ceil((100 - out) / size));
    if (place !== null && place <= 5) return { t: 'top', label: 'Top 5' };
    if (place !== null && place <= 10) return { t: 'top', label: 'Top 10' };
    if (place !== null && place <= 25) return { t: 'mid', label: 'Top 25' };
    return { t: 'rest', label: out !== null ? 'Outlived ' + fmt(out) : (m.placement_text && !/match completed/i.test(m.placement_text) ? m.placement_text : 'Game played') };
  };
  const cosmeticId = r => { let v = String(r?.item || r?.id || '').split(/[:/]/).pop().split('.')[0].toLowerCase(); if (!/^[a-z0-9]+_[a-z0-9_]+$/.test(v)) { const m = /^T_Soldier_(.+?)(?:\.\w+)?$/i.exec(String(r?.icon || '').split('/').pop()); v = m ? 'character_' + m[1].toLowerCase() : ''; } return v; };
  const fapi = (id, kind) => id ? 'https://fortnite-api.com/images/cosmetics/br/' + id + '/' + kind + '.png' : '';
  const sharpArt = (r, original, name, size, big = false) => { const id = cosmeticId(r), html = !id ? art(original, name, size) : art(fapi(id, big ? 'featured' : 'icon'), name, size, [big ? fapi(id, 'icon') : '', original].filter(Boolean).join('|')); const look = r?.name || name; return big && html && look ? html.replace('<img ', '<img data-lookup="' + esc(look) + '"' + (r?.type === 'AthenaCharacter' || /^T_Soldier_/i.test(String(r?.icon || '').split('/').pop()) || !r?.type && /^character_/.test(id) ? ' data-ltype="outfit"' : '') + ' ') : html; };
  const ART_KEY = 'hh-fortnite-art-v1', artLookups = new Map();
  let artStore = null;
  const lookupArt = (name, type) => {
    const key = (type || '') + '|' + String(name).toLowerCase();
    if (!artStore) { try { artStore = JSON.parse(env.localStorage?.getItem(ART_KEY) || '{}') || {}; } catch { artStore = {}; } }
    if (key in artStore) return Promise.resolve(artStore[key]);
    if (!artLookups.has(key)) artLookups.set(key, env.fetch('https://fortnite-api.com/v2/cosmetics/br/search?name=' + encodeURIComponent(name) + (type ? '&type=' + type : '')).then(r => r.ok ? r.json() : null).then(d => { const im = d?.data?.images || {}, url = im.featured || im.icon || null; artStore[key] = url; try { env.localStorage?.setItem(ART_KEY, JSON.stringify(artStore)); } catch {} return url; }).catch(() => null));
    return artLookups.get(key);
  };
  const setOutfit = s => s?.outfit || (s?.pages || []).flatMap(pg => pg.rewards || []).find(r => r.type === 'AthenaCharacter' || /^T_Soldier_/i.test(String(r?.icon || '').split('/').pop()));
  const deltaMark = (d, lowerBetter) => '<b class="delta ' + (d === 0 ? 'flat' : (lowerBetter ? d < 0 : d > 0) ? 'good' : 'bad') + '">' + (d >= 0 ? '▲' : '▼') + '</b> ' + (d >= 0 ? '+' : '');
  const setHero = s => setOutfit(s) || (s?.pages || []).flatMap(pg => pg.rewards || []).find(r => r.icon && r.icon === s?.hero) || null;
  const RELOAD_CODES = /blastberry|blendhead|piperboot|ropesmile|punchberry/;
  const modeName = (m, native) => {
    const id = String(m?.playlist_id || '').toLowerCase().replace(/^playlist_/, ''), raw = String(m?.mode_name || '');
    const cat = id && native?._playlist?.(id)?.name;
    if (cat && /\s/.test(cat)) return cat.replace(/\s+-\s+/, ' ');
    if (/\s/.test(raw)) return raw;
    const team = /solo/.test(id) ? 'Solo' : /duo/.test(id) ? 'Duos' : /trio/.test(id) ? 'Trios' : /squad/.test(id) ? 'Squads' : /octet/.test(id) ? 'Team of 8' : '', reload = RELOAD_CODES.test(id), ranked = /habanero/.test(id), zb = /nobuild/.test(id);
    if (reload || ranked) return [ranked ? 'Ranked' : '', reload ? 'Reload' : zb ? '' : 'Battle Royale', zb ? 'Zero Build' : '', team].filter(Boolean).join(' ');
    return raw || id.replace(/_/g, ' ');
  };
  const tidyType = t => String(t || '').replace(/([a-z])([A-Z])/g, '$1 $2');
  const PARACHUTE = '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M4 20C4 9 13 3 24 3s20 6 20 17c-3-2-6-2-8 0-2-2-6-2-8 0-2-2-6-2-8 0-2-2-5-2-8 0-2-2-5-2-8 0z" fill="#ef4444"/><path d="M16 20c0-9 3.5-16 8-17 4.5 1 8 8 8 17-2.5-2-5.5-2-8 0-2.5-2-5.5-2-8 0z" fill="#fff"/><path d="M5 21l17 17M43 21L26 38M16 21l7 16M32 21l-7 16" stroke="#0d1016" stroke-width="1.6" fill="none"/><circle cx="24" cy="40" r="5" fill="#bef264" stroke="#0d1016" stroke-width="2"/></svg>';
  const SEASON_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7M3 4v4h4M12 7v5l3 2"/></svg>';
  const medalColour = { win: '#b45309', top: '#15803d', mid: '#1d4ed8', rest: '#6d28d9' };
  const eventArt = e => art(e.poster || e.image || e.tile || e.background, e.name, 300) || '<span class="event-fallback" aria-hidden="true">' + ICON.pad + '<b>' + esc(e.tournament_type || 'Tournament') + '</b></span>';
  const isTopMatch = match => { const placement = number(match.placement); return placement !== null && placement >= 1 && placement <= 10; };

  // ---- Shared pieces (1.19): ranks, pager, sheet header, chips ---------------------------------
  const RANKS = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Elite', 'Champion', 'Unreal'];
  const RANK_COLOURS = { Bronze: ['#E0A06A', '#8A5429'], Silver: ['#E8EDF2', '#8C99A6'], Gold: ['#FFE27A', '#C99A12'], Platinum: ['#8FF3FF', '#1C9DB5'], Diamond: ['#9CC2FF', '#2F5FD0'], Elite: ['#D9B4FF', '#7B35C9'], Champion: ['#FFC76B', '#D9530F'], Unreal: ['#FF9BD2', '#7B2FF7'] };
  const rankTier = rank => RANKS.find(t => String(rank || '').startsWith(t)) || null;
  const rankDivision = rank => ((/\b(I{1,3})$/.exec(String(rank || '')) || [])[1] || '').length;
  const rankEmblem = (rank, size = 72) => {
    const tier = rankTier(rank);
    if (!tier) return '<svg class="emblem" width="' + size + '" height="' + size + '" viewBox="0 0 64 64" aria-hidden="true"><path d="M32 3 56 13v19c0 14-10 24-24 29C18 56 8 46 8 32V13z" fill="none" stroke="currentColor" stroke-opacity=".35" stroke-width="3" stroke-dasharray="6 5"/><text x="32" y="40" text-anchor="middle" font-size="20" font-weight="800" fill="currentColor" fill-opacity=".5">?</text></svg>';
    const [a, b] = RANK_COLOURS[tier], id = 'rk-' + tier, div = rankDivision(rank);
    return '<svg class="emblem" width="' + size + '" height="' + size + '" viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + a + '"/><stop offset="1" stop-color="' + b + '"/></linearGradient></defs><path d="M32 3 56 13v19c0 14-10 24-24 29C18 56 8 46 8 32V13z" fill="url(#' + id + ')" stroke="#fff" stroke-opacity=".6" stroke-width="2"/><path d="M32 11 48 18v14c0 9.5-6.5 17-16 21-9.5-4-16-11.5-16-21V18z" fill="#000" fill-opacity=".16"/>' + (div ? '<text x="32" y="40" text-anchor="middle" font-family="Outfit,sans-serif" font-size="' + (div === 3 ? 17 : 20) + '" font-weight="800" fill="#fff">' + 'I'.repeat(div) + '</text>' : '<path d="M32 20l3.6 7.4 8.1 1.1-5.9 5.6 1.5 8L32 38.3l-7.3 3.8 1.5-8-5.9-5.6 8.1-1.1z" fill="#fff"/>') + '</svg>';
  };
  // Ranked track names: the provider sometimes returns a codename ("Something-solo-ranked"); show only the readable part
  const trackName = mode => {
    const raw = String(mode || ''), coded = /^[A-Za-z]+-(solo|duos?|trios?|squads?)-ranked$/i.exec(raw);
    if (coded) return 'Ranked ' + ({ solo: 'Solo', duo: 'Duos', duos: 'Duos', trio: 'Trios', trios: 'Trios', squad: 'Squads', squads: 'Squads' })[coded[1].toLowerCase()];
    return raw === 'Reload Build' ? 'Reload' : raw;
  };
  const isRanked = m => /habanero/i.test(m?.playlist_id || '') || /\branked\b/i.test(m?.mode_name || '');
  const deltaChip = (d, suffix = '') => { const v = number(d); return v === null || v === 0 ? '' : '<span class="delta-chip ' + (v > 0 ? 'up' : 'down') + '">' + (v > 0 ? '▲ ' : '▼ ') + fmt(Math.abs(v), 1) + '%' + suffix + '</span>'; };
  const gameLabel = m => { const n = number(m.match_number), c = number(m.match_count) || 1; return n === null ? 'Game' : c > 1 ? 'Games ' + n + '–' + (n + c - 1) : 'Game ' + n; };
  // Fits a summary tile: 1h 36m
  const shortTime = v => { const n = Math.round(number(v) || 0), h = Math.floor(n / 60); return h ? h + 'h ' + (n % 60) + 'm' : n + 'm'; };
  const big = v => { const n = number(v); if (n === null) return '–'; const a = Math.abs(n); return a >= 1e6 ? fmt(n / 1e6, 1) + 'M' : a >= 1e4 ? fmt(n / 1e3, 1) + 'K' : fmt(n); };
  const minutesText = v => { const n = Math.round(number(v) || 0), h = Math.floor(n / 60); return h ? h + ' h ' + (n % 60) + ' min' : n + ' min'; };
  const CHEVRON = d => '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + (d < 0 ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7') + '" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const CROSS = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>';
  const TROPHY = '<svg class="medal" viewBox="0 0 48 48" aria-hidden="true"><path d="M14 6h20v10c0 8-4.5 13-10 13S14 24 14 16z" fill="#f5c84b" stroke="#7c4a03" stroke-width="2"/><path d="M14 9H7c0 7 3 11 8 11M34 9h7c0 7-3 11-8 11" fill="none" stroke="#7c4a03" stroke-width="2.4"/><path d="M20 29h8v6h-8z" fill="#d99a14"/><rect x="13" y="35" width="22" height="7" rx="2" fill="#7c4a03"/><path d="M24 11l1.8 3.7 4 .6-2.9 2.8.7 4L24 20.2l-3.6 1.9.7-4-2.9-2.8 4-.6z" fill="#fff"/></svg>';
  // One pager for games and Sprites: round arrows either side of "what this is" and "n of total"
  const pager = (key, index, total, title, wrap = false) => '<div class="pager"><button class="round" data-' + key + '="-1" aria-label="Previous"' + (index <= 0 && !wrap ? ' disabled' : '') + '>' + CHEVRON(-1) + '</button><span class="pager-label" aria-live="polite"><b>' + esc(title) + '</b><span>' + (index + 1) + ' of ' + total + '</span></span><button class="round" data-' + key + '="1" aria-label="Next"' + (index >= total - 1 && !wrap ? ' disabled' : '') + '>' + CHEVRON(1) + '</button></div>';
  const factTiles = rows => { const shown = rows.filter(([, v]) => v !== null && v !== undefined && v !== '' && v !== '–'); return shown.length ? '<div class="fact-grid">' + shown.map(([k, v]) => '<div class="fact-tile"><span class="lab">' + esc(k) + '</span><b>' + esc(v) + '</b></div>').join('') + '</div>' : ''; };
  const RARITY_COLOURS = { Mythic: '#f5c84b', Legendary: '#f08a3a', Epic: '#b45cf0', Rare: '#3f8ef0', Uncommon: '#5fbf3a', Common: '#9aa3b2' };
  const section = (title, body, note = '') => body ? '<section class="block"><h3 class="block-title">' + esc(title) + (note ? '<small>' + esc(note) + '</small>' : '') + '</h3>' + body + '</section>' : '';
  const skin = css + `
 .tabs,.kind-list{scrollbar-width:none} .sheet-grid>div{min-width:0}.kind-list{min-width:0;max-width:100%} :host{--gold:#f5c84b} .heading{margin-bottom:8px}.heading .players button{min-height:44px}.cover{height:220px}.hero-content{padding:16px 24px;gap:6px}.hero-content h1{font-size:34px}.hero-content .avatar{width:56px;height:56px}.kpi{font-size:36px}.slim{border:1px solid var(--line);border-radius:20px;background:var(--s1);padding:8px 14px;min-height:64px;gap:12px}.slim .avatar{width:44px;height:44px}.slim h1{font:600 22px Outfit,sans-serif}.hero-actions{display:flex;gap:6px;margin-left:auto;flex-wrap:wrap}.hero-actions .btn{font-size:13px;padding:0 12px}.cover .hero-actions{position:absolute;right:16px;top:16px}.tabs{margin:10px 0}.tabs .btn{flex:none;padding:0 14px;border-radius:99px;min-width:0}.seg{display:flex;gap:4px;padding:4px;border:1px solid var(--line);border-radius:16px;background:var(--s1);width:max-content;max-width:100%;overflow-x:auto}.seg .btn{background:none;min-height:44px;padding:0 12px}.seg .btn.on{background:var(--s2)!important;color:var(--ink)!important}.view{display:flex;flex-direction:column;gap:10px;min-width:0;animation:hh-enter .2s both}.view input,.view select,dialog select,dialog input{font:inherit;color:inherit;background:var(--s1);border:1px solid var(--line);border-radius:14px;min-height:44px;min-width:0;padding:0 12px}.controls{display:flex;gap:8px;align-items:center;flex-wrap:wrap}.controls input{flex:1}.summary{padding:14px;display:flex;gap:16px;align-items:center;border-radius:20px;border:1px solid var(--line);background:color-mix(in srgb,var(--acc) 12%,var(--s1))}.summary .ring{width:72px;height:72px}.summary .ring span{font-size:20px}.summary .stat{background:none;padding:0;flex:1}.summary .num{font-size:26px}.rail-wrap{display:flex;flex-direction:column;gap:8px;min-width:0}.rail-head{display:flex;align-items:center;gap:8px}.rail-head h3{margin:0;font:600 16px Outfit,sans-serif}.rail-head .btn{padding:0;width:44px}.rail{display:flex;overflow-x:auto;gap:12px;scroll-snap-type:x mandatory;overscroll-behavior-x:contain;scrollbar-width:none;min-width:0}.rail>*{flex:none;scroll-snap-align:start;min-width:0}.rail.pages>article{width:calc(100% - 34px)}.rail.pages>article:last-child{width:100%}.rail.cards>article{width:280px}.rail:focus-visible{outline:2px solid var(--acc)}.rail-dots{display:flex;gap:4px;justify-content:center;flex-wrap:wrap}.rail-dots .btn{padding:0;min-width:44px;min-height:44px;background:none;color:var(--mut)}.rail-dots .btn:before{content:'';width:8px;height:8px;background:var(--line);border-radius:99px}.rail-dots .btn.on{background:none!important;color:var(--ink)!important}.rail-dots .btn.on:before{width:24px;background:var(--acc)}.rail-dots.labelled .btn:before{display:none}.rail-dots.labelled .btn{background:var(--s2);padding:0 10px}.rail-dots.labelled .btn.on{background:var(--acc)!important;color:var(--hh-on-accent,#0d1016)!important}.family-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}.family-tile{display:flex;gap:10px;align-items:center;text-align:left;padding:10px;border:1px solid var(--line);border-radius:18px;background:var(--s1);min-height:116px;min-width:0}.family-tile>img{width:62px;height:62px;object-fit:contain;flex:none}.family-tile>span{min-width:0}.family-tile b{display:block;overflow-wrap:anywhere}.family-tile .pill{margin:3px 0;font-size:13px}.pips{display:flex;gap:5px;margin:5px 0;flex-wrap:wrap}.pip{position:relative;width:12px;height:12px;border-radius:50%;border:2px solid var(--line)}.pip.found{background:var(--acc);border-color:transparent}.pip.mastered{background:var(--gold);border-color:transparent}.pip.mastered:after{content:'★';font-size:9px;color:#0d1016;position:absolute;inset:-2px}.pip.new:before{content:'';position:absolute;right:-4px;top:-4px;width:5px;height:5px;background:var(--acc);border-radius:50%}.mastery{background:var(--s2);color:var(--mut)}.mastery.some{background:#f5c84b;color:#0d1016}.reward-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px}.reward{position:relative;border:1px solid var(--line);border-radius:16px;padding:8px;background:var(--s1);min-width:0}.reward img{width:100%;height:100px;object-fit:contain}.reward>button.item-open{width:100%;background:none;text-align:left;padding:0}.reward b{display:block;overflow-wrap:anywhere;font-size:14px}.reward .heart{position:absolute;right:8px;bottom:8px;min-width:44px;min-height:44px;background:var(--s2);border-radius:50%;font-size:22px}.reward .lab{padding-right:44px}.two-col{display:grid;grid-template-columns:1fr 2.4fr;gap:12px;min-width:0}.two-col>section{min-width:0}.set-art{width:100%;height:170px;object-fit:contain}.set-rail>article{width:92px!important}.set-rail img{width:64px;height:64px;object-fit:contain}.set-rail .btn{display:flex;flex-direction:column;padding:8px;width:100%;min-height:88px;white-space:normal}.match-tile{background:var(--s1);border:1px solid var(--line);border-radius:18px;overflow:hidden;padding:0;text-align:left;width:100%}.match-band{display:block;padding:16px;background:var(--s2);font:600 26px Outfit,sans-serif}.match-tile.win{border-color:var(--gold)}.match-tile.win .match-band{background:var(--gold);color:#0d1016}.match-tile.top .match-band{background:#4ade80;color:#0d1016}.match-body{padding:14px;display:flex;flex-direction:column;gap:10px}.match-icons{font-size:24px;overflow-wrap:anywhere}.gains{display:flex;align-items:center;flex-wrap:wrap;gap:8px}.gains img{width:36px;height:36px;object-fit:contain}.facts{display:grid;grid-template-columns:1fr 1fr;gap:8px}.fact{display:flex;justify-content:space-between;gap:8px;border-top:1px solid var(--line);padding:8px 0;overflow-wrap:anywhere}.fact span{color:var(--mut)}.view .gold-text{color:var(--hh-gold-ink,#997100)}.day{font:600 40px Outfit,sans-serif;color:var(--ink);margin-bottom:10px}.event-art{width:100%;height:100px;object-fit:cover;border-radius:12px}.event-open{background:none;text-align:left;width:100%;padding:0}.event-open h3{font:600 22px Outfit,sans-serif;margin:10px 0}.podium{display:flex;align-items:end;gap:6px;margin:16px 0}.podium>div{flex:1;background:var(--s2);padding:12px 6px;border-radius:12px;min-width:0;text-align:center;overflow-wrap:anywhere}.podium>div:first-child{padding-top:28px;border:1px solid var(--gold)}.chart{width:100%;height:150px;display:block;overflow:visible}.chart polyline{fill:none;stroke:var(--ink);stroke-width:3}.chart rect{fill:var(--acc)}.metric-card{width:100%;text-align:left;background:none;padding:0}.metric-card .num{margin:8px 0}.news-art{width:100%;height:150px;object-fit:cover;border-radius:12px}.news-open{background:none;padding:0;width:100%;text-align:left}.news-open h3{font:600 22px Outfit,sans-serif;margin:10px 0}.native-loader{display:none}.native-map{min-width:0}.toast{position:fixed;bottom:106px;left:50%;transform:translateX(-50%);padding:14px 18px;max-width:90vw;border-radius:16px;background:var(--s2);border:1px solid var(--line);z-index:10}dialog{width:min(1040px,96vw);height:auto;max-height:80svh;padding:18px;border-radius:24px;overflow:auto}dialog::backdrop{background:rgba(4,6,10,.72)}dialog[open]{animation:hh-enter .22s both}dialog .sheet-body{margin-top:12px}dialog .sheet-grid{display:grid;grid-template-columns:1fr 1.15fr;gap:16px}.stage{background:var(--s2);border-radius:20px;padding:14px;display:flex;flex-direction:column;align-items:center;gap:8px;overflow:hidden}.stage .art-button{width:230px;height:230px;max-width:100%;padding:0;background:none;transition:transform .18s}.stage .art-button.zoom{transform:scale(1.4)}.stage h2{font:600 28px Outfit,sans-serif}.kind-list{display:flex;flex-direction:column;gap:8px}.kind-row{width:100%;display:flex;align-items:center;gap:12px;background:var(--s2);border:1px solid var(--line);border-radius:16px;padding:10px;text-align:left;min-height:74px}.kind-row.selected{border-color:var(--acc)}.kind-row img{width:52px;height:52px;object-fit:contain}.kind-row>span{flex:1;min-width:0}.kind-row b{display:block}.kind-row .track{margin:5px 0}.celebration{background:color-mix(in srgb,var(--acc) 18%,var(--s1));border-radius:20px;padding:20px;text-align:center;position:relative;overflow:hidden}.celebration.win{background:#f5c84b;color:#0d1016}.celebration h2{font:600 34px Outfit,sans-serif}.confetti{position:absolute;top:0;width:8px;height:14px;background:var(--acc);animation:hh-confetti 1.4s both}.confetti:nth-child(even){background:#fff}.panels{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin:12px 0}.map-modes{justify-content:center}.map-modes .btn{min-height:56px;min-width:104px}.map-panel{padding:16px;min-width:0;background:var(--s1);border:1px solid var(--line);border-radius:18px;display:flex;flex-direction:column;gap:10px}.places-list{display:flex;flex-direction:column;gap:6px;max-height:240px;overflow:auto}.places-list .btn{justify-content:space-between;text-align:left;white-space:normal}.swatches{display:flex;gap:6px;flex-wrap:wrap}.swatch{width:52px;height:52px;border:2px solid var(--line);border-radius:50%;background:var(--c)}.swatch.selected{outline:2px solid var(--ink);outline-offset:2px}.season-history{display:flex;flex-direction:column;gap:8px}@keyframes hh-enter{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}@keyframes hh-confetti{to{transform:translateY(180px) rotate(300deg);opacity:0}}
 .tall-hero{min-height:96px;background-image:linear-gradient(90deg,var(--s1),color-mix(in srgb,var(--s1) 85%,transparent)),var(--hero);background-position:center;background-size:cover}.tall-hero .avatar{width:64px;height:64px}.tall-hero h1{font:600 18px Outfit,sans-serif}.hero-kpis{gap:24px;margin-left:18px}.hero-kpis .kpi{font-size:28px}.overview-kpis .num{font-size:22px}.overview-kpis .stat{padding:10px 12px}.team-sizes{margin-top:10px}.team-sizes .mode{grid-template-columns:64px 95px 1fr 60px 65px}.view .rail{align-items:flex-start}.view .rail-wrap{flex:1;min-height:0}.view> .rail-wrap>.rail{height:auto;flex:1}.rail.pages{max-height:410px}.view input:focus-visible,.view select:focus-visible{outline:2px solid var(--acc);outline-offset:2px}
 @container(min-width:1000px){.view{max-height:calc(100svh - 280px)}.view.tall{max-height:calc(100svh - 280px)}.rail.cards>article{width:calc((100% - 58px)/3)}.reward img{height:82px}.family-grid .family-tile{min-height:100px}.panels .card{padding:12px}.slim .hero-actions .btn{min-height:44px}}
 @container(max-width:999px){.hero-kpis{display:none}.rail.pages{max-height:none}.tall-hero{min-height:96px}.summary{flex-wrap:wrap}.summary .stat{min-width:100px}.two-col{grid-template-columns:1fr!important}.family-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.reward-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.hero-actions{position:static!important}.slim{flex-wrap:wrap}.cover{height:auto;min-height:240px}.cover .hero-actions{margin-left:0}.panels{grid-template-columns:1fr}dialog{position:fixed;inset:auto 0 0;margin:0;width:100%;max-width:100%;max-height:88svh;border-radius:24px 24px 0 0}dialog:before{content:'';display:block;margin:0 auto 12px;width:44px;height:5px;border-radius:9px;background:var(--line)}dialog .sheet-grid{grid-template-columns:minmax(0,1fr)}.kind-list{flex-direction:row;overflow-x:auto;scroll-snap-type:x mandatory}.kind-list .kind-row{flex:none;width:80%;scroll-snap-align:start}.stage .art-button{width:180px;height:180px}}
 @container(max-width:999px){.grid.four{grid-template-columns:repeat(2,minmax(0,1fr))}}@container(max-width:500px){.reward-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.summary{gap:10px}.summary .stat{min-width:90px}.slim h1{font-size:20px}.hero-actions{width:100%;margin-left:0}.rail.cards>article{width:calc(100% - 34px)}.family-tile{flex-direction:column;align-items:start;gap:4px}.facts{grid-template-columns:1fr}.heading .players{margin-left:0}.map-modes .btn{min-width:0;flex:1}}
 @media(prefers-reduced-motion:reduce){*,*:before{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
 @container(min-width:1000px){.view{height:calc(100svh - 296px);max-height:none}.view.tall{height:calc(100svh - 326px);max-height:none}.team-sizes{padding:12px}.team-sizes .mode{padding:4px 0}.overview-kpis .stat{padding:8px 12px}.family-tile{min-height:88px}.summary .hint{max-width:220px;padding:8px;margin-left:auto;font-size:13px;display:block}.summary .hint .btn{padding:0 8px;min-height:44px}.rail.pages{max-height:none}.view>.rail-wrap>.rail{min-height:0;overflow-y:hidden}.two-col{min-height:0}.map-panel{max-height:100%;padding:12px}.places-list{flex:1;min-height:60px;max-height:none}.map-panel .seg{flex:none}.map-panel .empty{font-size:13px;padding:8px}.map-modes{margin-top:auto}}
 .map-layout{min-height:0}.map-layout>.native-map{min-height:0}.map-layout>.map-panel{min-height:0}.map-layout>.map-panel>.controls:first-child{display:none}@container(min-width:1000px){.map-layout{height:100%;grid-template-rows:minmax(0,1fr)}}
 .set-rail .rail-head,.set-rail .rail-dots{display:none}.set-rail .rail-wrap{flex:none}.set-rail .rail>article{width:92px!important}.set-rail .rail{height:88px;flex:none}.set-rail .btn{font-size:0}.view>.set-rail{flex:none}.pass-layout{flex:1;min-height:0}.pass-layout .card>img{width:100%;height:105px;object-fit:contain}.pass-layout .card h2{font:600 22px Outfit,sans-serif}.pass-layout .card p{font-size:13px;margin-top:6px}.family-tile .lab{display:block}.event-open .day{font-size:32px}.event-open h3{font-size:20px;margin:8px 0}.event-open .notice{margin-top:8px}.event-open .podium{margin:10px 0}.podium>div p{font-size:13px}.metric-card .chart{height:80px}.metric-card .num{font-size:26px}.rail[data-rail="sprite-kinds"] .card>img{width:64px;height:64px;float:left;margin-right:10px;object-fit:contain}.rail[data-rail="sprite-kinds"] .card h3{margin:4px 0;font:600 18px Outfit,sans-serif}.rail[data-rail="sprite-kinds"] .card .hint{clear:both}.rail[data-rail="sprite-kinds"] .card .notice{font-size:13px;margin:8px 0}.summary .hint p{margin:3px 0}.summary .hint .btn{padding:0 6px}.summary .hint{max-width:190px}.view>.controls{flex:none}.wishlist-rail .rail{flex:none}.rail.cards{overflow-y:hidden}
 @container(min-width:1000px){.reward img{height:68px}.reward b{font-size:13px}.reward .lab{font-size:13px}.reward-grid{gap:8px}.rail[data-rail="wishlist-now"],.rail[data-rail="wishlist-wait"]{min-height:148px}.rail-wrap:has(>.rail[data-rail="wishlist-now"]),.rail-wrap:has(>.rail[data-rail="wishlist-wait"]){flex:none}.pass-layout>.card{padding:12px}.summary .num{font-size:24px}.summary .hint{min-height:72px;max-height:96px;padding:6px}.family-tile{padding:8px}.family-tile>img{width:54px;height:54px}.family-tile .pill{font-size:13px}}
 @container(min-width:1000px){.summary{padding:8px 14px}.summary .hint{padding:4px;min-height:0;max-height:none;font-size:13px}.summary .hint p{margin:2px 0}.family-tile .pill{min-height:20px;margin:2px 0}.rail[data-rail="window-matches"]>article{width:110px}.match-mini{width:100%;display:flex;flex-direction:column;gap:6px;min-height:72px;padding:10px;white-space:normal}}
 @container(min-width:1000px){.pass-layout{grid-template-rows:minmax(0,1fr)}.pass-layout>.col{min-height:0}.pass-layout .reward .lab{padding-right:0}.pass-layout .reward{padding:6px}.pass-layout .reward-grid{gap:6px}.metric-card .chart{height:60px}.metric-card .num{margin:4px 0}.rail[data-rail="metrics"] .card{padding:12px}.wide-chart .chart{height:100px}.wide-chart{padding:12px}}
 .pill.live:before{content:'';display:inline-block;width:8px;height:8px;border-radius:50%;background:currentColor;margin-right:6px;animation:hh-live 2s infinite}.view,dialog[open]{animation-timing-function:cubic-bezier(.2,.7,.2,1)}.track i{transform-origin:left}.mastered-gain>img{border:2px solid var(--gold);border-radius:50%}.just-mastered>img{animation:hh-mastery .6s both}@keyframes hh-mastery{from{opacity:0;transform:scale(.7)}to{opacity:1;transform:scale(1)}}@keyframes hh-live{50%{opacity:.3}}@media(prefers-reduced-motion:reduce){.pill.live:before{animation:none}}
 .stage .art-button{border-radius:50%;background:color-mix(in srgb,var(--acc) 12%,transparent)}dialog[open]{animation-name:hh-sheet}dialog::backdrop{animation:hh-backdrop .16s both}.celebration h2{animation:hh-medal .26s both}@keyframes hh-sheet{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}@keyframes hh-backdrop{from{opacity:0}to{opacity:1}}@keyframes hh-medal{from{opacity:0;transform:scale(.85)}to{opacity:1;transform:scale(1)}}dialog .row{flex-wrap:wrap}dialog .row>span{min-width:0;overflow-wrap:anywhere}.rail-dots.labelled{flex-wrap:nowrap;justify-content:flex-start;overflow-x:auto;max-width:100%;height:44px;flex:none;scrollbar-width:none}.rail-dots.labelled .btn{flex:none}@media(prefers-reduced-motion:reduce){dialog::backdrop{animation:none!important}}
 .view.settled{animation:none}
 dialog[open]{animation:hh-sheet .22s cubic-bezier(.2,.7,.2,1) both}@keyframes hh-sheet{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}@container(max-width:999px){dialog[open]{animation-name:hh-up}}@keyframes hh-up{from{transform:translateY(100%)}to{transform:none}}
 .celebration{padding:22px 20px}.celebration h2{display:flex;flex-direction:column;align-items:center;gap:6px;animation:none}.celebration h2 svg{width:72px!important;height:72px!important;margin:0!important}.celebration.win h2{font-size:36px}.confetti{width:9px;height:15px;border-radius:3px;animation:hh-confetti 1.6s .1s ease-out both}.confetti:nth-child(4n+1){background:#f472b6}.confetti:nth-child(4n+2){background:#fff}.confetti:nth-child(4n+3){background:#60a5fa}.confetti:nth-child(4n){background:#4ade80}@keyframes hh-confetti{from{transform:translateY(-20px) rotate(0)}to{transform:translateY(220px) rotate(320deg);opacity:0}}
 .stage{overflow:visible}.sprite-art-rail>div{align-items:center;min-height:250px}.stage .art-button{width:230px;height:auto;aspect-ratio:1;max-width:100%;transform:none;transition:width .24s cubic-bezier(.2,.7,.2,1)}.stage .art-button.zoom{transform:none;width:min(360px,100%)}.stage .art-button img{width:100%;height:100%}
 @container(max-width:999px){.stage .art-button{width:200px}.stage .art-button.zoom{width:min(330px,100%)}.sprite-art-rail>div{min-height:220px}}
 .view .rail[data-rail="matches"]{align-items:stretch}.rail[data-rail="matches"]>article{display:flex}
 .match-tile{display:flex;flex-direction:column;height:100%;min-height:214px}
 .match-band{display:flex;align-items:center;gap:10px;padding:12px 14px;min-height:72px;font:inherit;color:#0d1016}.match-band>span{min-width:0}.match-band svg{width:40px;height:40px;flex:none}.match-band b{display:block;font:600 20px/1.15 Outfit,sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.band-meta{display:block;font-size:13px;opacity:.85;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
 .match-tile.tier-win .match-band{background:linear-gradient(120deg,#f5c84b,#fb923c)}.match-tile.tier-top .match-band{background:linear-gradient(120deg,#bef264,#4ade80)}.match-tile.tier-mid .match-band{background:linear-gradient(120deg,#7dd3fc,#60a5fa)}.match-tile.tier-rest .match-band{background:linear-gradient(120deg,#c4b5fd,#a78bfa)}.match-tile.tier-win{border-color:var(--gold)}
 .match-body{flex:1}.match-body>.row{flex-wrap:wrap;gap:8px}.match-body .num{font-size:26px}.match-icons{display:inline-flex;gap:3px;align-items:center;color:var(--ink);font-size:inherit}.match-icons svg{width:22px;height:22px}.match-icons b{font-size:14px}
 .match-gains{display:flex;flex-wrap:wrap;gap:6px;align-items:center;min-height:34px;margin-top:auto}.match-gains img{width:34px;height:34px;border-radius:50%;background:var(--s2);object-fit:contain}
 .pill.g{background:rgba(245,200,75,.18);color:var(--gold)}.pill.q{background:var(--s2)}.pill .tick{width:16px;height:16px;border-radius:50%;background:#4ade80;display:inline-grid;place-items:center;flex:none}.pill .tick svg{width:11px;height:11px}
 .event-open>img{display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;object-position:50% 0;border-radius:12px;margin-bottom:8px;background:var(--s2)}.event-fallback{display:flex;align-items:center;gap:10px;aspect-ratio:16/9;margin-bottom:8px;padding:0 14px;border-radius:12px;background:linear-gradient(135deg,color-mix(in srgb,#7c3aed 45%,var(--s2)),color-mix(in srgb,#22d3ee 35%,var(--s2)));color:#fff}.event-fallback svg{width:34px;height:34px;fill:none;stroke:currentColor;stroke-width:1.8}.event-fallback b{font:600 18px Outfit,sans-serif}
 img.broken{background:var(--s2);border-radius:12px}

 .rail button:focus-visible,.rail-dots button:focus-visible,.reward button:focus-visible,.seg button:focus-visible,.tabs button:focus-visible{outline-offset:-3px}
 .reward{padding:0;overflow:hidden;display:flex;flex-direction:column}.pass-layout .reward{padding:0}.reward>button.item-open{display:flex;flex-direction:column;flex:1;padding:0 0 10px}
 .reward img{display:block;width:100%;max-width:none;height:auto;aspect-ratio:1;object-fit:cover;margin:0 0 8px;background:radial-gradient(circle at 50% 38%,color-mix(in srgb,var(--acc) 18%,var(--s2)),var(--s2) 72%)}
 .reward b{padding:0 10px}.reward .lab{display:block;padding:0 56px 0 10px}.pass-layout .reward .lab{padding:0 10px}
 .view>.two-col>.card:first-child{padding:16px;overflow:hidden}.view>.two-col>.card:first-child>img:first-of-type{display:block;width:calc(100% + 32px);max-width:none;margin:-16px -16px 12px;height:auto;aspect-ratio:4/3;object-fit:cover;object-position:50% 12%;background:radial-gradient(circle at 50% 38%,color-mix(in srgb,var(--acc) 18%,var(--s2)),var(--s2) 72%)}
 @container(min-width:1000px){.view>.two-col>.card:first-child>img:first-of-type{aspect-ratio:16/10}}
 .pill:empty{display:none}
 .rail[data-rail="news"]{align-items:stretch}.rail[data-rail="news"]>article{display:flex}.rail[data-rail="news"]>article>.card{flex:1;display:flex;padding:0;overflow:hidden}.news-open{display:flex;flex-direction:column;flex:1;padding:0 16px 16px}
 .news-open>img{display:block;width:calc(100% + 32px);max-width:none;margin:0 -16px 12px;height:auto;aspect-ratio:16/9;object-fit:cover;background:var(--s2)}.news-open h3{margin:4px 0 8px}.news-open .notice{margin-top:0;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}
 .map-panel input[readonly]{cursor:text}

 .view>.two-col>.card:first-child>img:first-of-type{max-height:min(56svh,440px)}
 .rail[data-flow] .flow-head{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin:0 0 8px;font:600 15px Outfit,sans-serif;min-height:22px}.rail[data-flow] .flow-head i{font-style:normal;color:var(--mut)}.rail[data-flow] .flow-head span+i+span{color:var(--ink)}
 .rail-dots.anchors{justify-content:flex-start}.rail-dots.anchors .btn{border-radius:99px;padding:0 14px}
 .ssum{display:grid;grid-template-columns:auto minmax(0,1fr) auto;align-items:center;gap:18px 22px;padding:14px 18px;border-radius:20px;border:1px solid var(--line);background:linear-gradient(110deg,color-mix(in srgb,var(--acc) 14%,var(--s1)),var(--s1) 75%)}
 .ssum-ring{display:flex;flex-direction:column;align-items:center;gap:4px}.ssum .ring{width:78px;height:78px;padding:8px}.ssum .ring span{font-size:19px}
 .ssum-stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px 20px;min-width:0}.ssum-stat{display:flex;flex-direction:column;gap:5px;min-width:0}.ssum-stat b{font:600 24px/1 Outfit,sans-serif;font-variant-numeric:tabular-nums;white-space:nowrap}.ssum-stat b small{font-size:15px;font-weight:500;color:var(--mut)}.ssum-stat .lab{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ssum-stat .track{height:6px;flex:none}
 .ssum-seasons{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;min-width:92px;min-height:78px;padding:8px 14px;border-radius:16px;background:var(--s2);font-weight:600;font-size:13px}.ssum-seasons svg{width:26px;height:26px;fill:none;stroke:var(--ink);stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
 @container(max-width:760px){.ssum{grid-template-columns:auto minmax(0,1fr)}.ssum-stats{grid-template-columns:repeat(2,minmax(0,1fr))}.ssum-seasons{grid-column:1/-1;flex-direction:row;min-height:44px}}
 .update-note{display:flex;align-items:center;gap:10px;padding:5px 5px 5px 12px;border-radius:99px;border:1px solid color-mix(in srgb,var(--acc) 35%,var(--line));background:color-mix(in srgb,var(--acc) 8%,var(--s1));font-size:14px;min-width:0;flex:none}.update-note .new{flex:none;padding:3px 8px;border-radius:99px;background:var(--acc);color:var(--hh-on-accent,#0d1016);font-size:11px;font-weight:800;letter-spacing:.06em}.update-note .txt{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--mut)}.update-note .txt b{color:var(--hh-text,#eef1f6)}.update-note .btn{min-height:36px;border-radius:99px;padding:0 14px}
 .line-chart{overflow:visible}.delta{font-weight:800}.delta.good{color:#4ade80}.delta.bad{color:#fb7185}.delta.flat{color:var(--mut)}
 .wide-chart .chart{height:180px}.kills-chart{overflow:visible}.kills-chart text{fill:var(--hh-text,#eef1f6);font:700 15px Figtree,sans-serif}.kills-chart text.win{fill:#f5c84b}.kills-chart .axis{stroke:var(--line);stroke-width:2}.kills-chart .avg{stroke:var(--mut);stroke-width:2;stroke-dasharray:6 6}.kills-chart .avg-l{fill:var(--mut);font-size:13px;font-weight:600}.metric-card .kills-chart text{font-size:18px}
 @container(min-width:1000px){.wide-chart .chart{height:150px}}
 .whatsnew{padding:0!important;overflow:hidden}.wn-band{position:relative;overflow:hidden;display:flex;flex-direction:column;gap:2px;padding:18px 20px 16px;color:#fff;background:linear-gradient(90deg,rgba(8,10,16,.94),rgba(8,10,16,.74) 50%,rgba(8,10,16,.18)),var(--wn-art) 70% 30%/cover no-repeat,#080a10;border-bottom:1px solid var(--line)}.wn-band .wn-kicker{color:#bef264;opacity:1}
 .wn-kicker{font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.85}.wn-ver{font:600 32px/1.05 Outfit,sans-serif}.wn-name{font-size:14px;opacity:.9}
 .wn-stats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;padding:12px}.wn-chip{display:flex;flex-direction:column;align-items:flex-start;gap:3px;min-height:68px;padding:10px 12px;border-radius:14px;background:var(--s2);text-align:left}.wn-chip b{font:600 24px/1 Outfit,sans-serif;color:var(--ink)}.wn-chip span{font-size:13px;color:var(--mut)}
 .wn-season{display:flex;flex-direction:column;gap:6px;padding:0 14px 14px}.wn-season b{color:var(--hh-text,#eef1f6)}
 @container(max-width:700px){.wn-stats{grid-template-columns:repeat(2,minmax(0,1fr))}}
 .news-event{padding:12px!important}.news-event .event-open{display:flex;flex-direction:column;gap:6px;width:100%}.news-event .event-open>img,.news-event .event-fallback{margin-bottom:4px}.news-event .day{font:600 30px/1.05 Outfit,sans-serif;color:var(--ink)}.news-event h3{font:600 20px Outfit,sans-serif;margin:0}.news-event .notice{margin:0}.pill.ok{background:#4ade80;color:#0d1016}
 
 .reward>button.item-open,.reward,.family-tile{border-radius:16px}.reward>button.item-open{border-radius:inherit}
 .event-open .pill{height:auto;min-height:28px;white-space:normal;line-height:1.3;padding:5px 12px;border-radius:14px;text-align:left;max-width:100%}.event-open .notice+.pill{margin-top:10px}.event-open .pill.entry{display:flex;width:fit-content}.event-open>.row{gap:8px;margin-bottom:6px}
 .together-grid{grid-template-columns:1fr 1fr!important}.together-grid .feed{grid-column:1/-1!important;grid-row:auto!important}
 .tg-cols{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.tg-col{min-width:0}.tg-col .rail{align-items:stretch}.tg-col .rail>article{display:flex;width:100%!important}.tg-col .rail-head h3{font:600 16px Outfit,sans-serif}
 @container(max-width:700px){.tg-cols{grid-template-columns:1fr}.together-grid{grid-template-columns:1fr!important}}
 
 .view>.two-col>.card:first-child>img.lowres{object-fit:contain!important;object-position:50% 50%!important}
  .set-rail .rail>article>.btn{padding:0;overflow:hidden;height:88px;min-height:88px;border-radius:16px}.set-rail .rail>article>.btn img{display:block;width:100%;height:100%;max-width:none;object-fit:cover;object-position:50% 12%}.set-rail .rail>article>.btn.on{outline:3px solid var(--acc);outline-offset:-3px}
  .celebration h2 svg{width:44px;height:44px;display:inline-block;vertical-align:middle;margin:-6px 8px 0 0}
 @media(prefers-reduced-motion:reduce){dialog[open],.celebration h2,.confetti{animation:none!important}.stage .art-button{transition:none}}
 /* Design pass: one set of shapes for games, ranks, sheets and the locker */
 :host{--r-lg:20px;--r-md:14px;--gap:12px;--tap:48px;--win1:#f5c84b;--win2:#fb923c;--top1:#bef264;--top2:#4ade80;--mid1:#7dd3fc;--mid2:#60a5fa;--rest1:#c4b5fd;--rest2:#a78bfa}
 .view{padding-bottom:calc(96px + env(safe-area-inset-bottom))}
 .block{margin:18px 0 0}.block-title{display:flex;align-items:baseline;gap:8px;margin:0 0 10px;font:700 19px Outfit,sans-serif}.block-title small{font:500 13px Figtree,sans-serif;color:var(--mut)}
 .round{display:inline-grid;place-items:center;width:var(--tap);height:var(--tap);flex:none;border-radius:50%;border:1px solid var(--line);background:var(--s2);color:inherit;cursor:pointer;padding:0}.round svg{width:24px;height:24px}.round:disabled{opacity:.3;cursor:default}.round:not(:disabled):active{transform:scale(.94)}.round:focus-visible,.game:focus-visible,.chip:focus-visible,.rarity-chip:focus-visible{outline:3px solid var(--acc);outline-offset:2px}
 .pager{display:flex;align-items:center;gap:10px;margin:0 0 14px}.pager-label{flex:1;min-width:0;text-align:center;display:flex;flex-direction:column}.pager-label b{font:700 17px Outfit,sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.pager-label span{font-size:13px;color:var(--mut)}
 dialog .sheet-head{position:sticky;top:-18px;z-index:3;display:flex;align-items:center;gap:12px;margin:-18px -18px 12px;padding:12px 12px 12px 20px;background:var(--s1);border-bottom:1px solid var(--line)}.sheet-head .sheet-title{flex:1;min-width:0;font:700 19px Outfit,sans-serif}.sheet-body:focus{outline:none}
 .fact-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px;margin:14px 0}.fact-tile{display:flex;flex-direction:column;gap:2px;padding:12px 14px;border-radius:var(--r-md);background:var(--s2);min-width:0}.fact-tile b{font:700 22px/1.15 Outfit,sans-serif;overflow-wrap:anywhere}.fact-tile .lab{font-size:13px}
 .delta-chip{display:inline-flex;align-items:center;gap:4px;align-self:flex-start;min-height:26px;padding:0 10px;border-radius:99px;font-weight:700;font-size:14px}.delta-chip.up{background:rgba(74,222,128,.16);color:#4ade80}.delta-chip.down{background:rgba(248,113,113,.16);color:#f87171}
 .tag{display:inline-flex;align-items:center;min-height:24px;padding:0 9px;border-radius:99px;background:rgba(13,16,22,.82);color:#fff;font:700 11px Figtree,sans-serif;letter-spacing:.06em;text-transform:uppercase;flex:none}
 /* Session story */
 .story{position:relative;overflow:hidden;border-radius:var(--r-lg);padding:18px;background:linear-gradient(135deg,color-mix(in srgb,#7c3aed 55%,var(--s1)),color-mix(in srgb,#2563eb 45%,var(--s1)));color:#fff;margin-bottom:6px}.story.won{background:linear-gradient(135deg,#b45309,#f59e0b 55%,#fb923c)}
 .story-head{display:flex;flex-direction:column;gap:4px}.story-head h2{margin:0;font:800 30px/1.1 Outfit,sans-serif}.story-head .lab{color:rgba(255,255,255,.85)}.pill.live{background:#ef4444;color:#fff;align-self:flex-start}.pill.live::before{content:"";width:8px;height:8px;border-radius:50%;background:#fff;animation:hh-blink 1.2s infinite}@keyframes hh-blink{50%{opacity:.25}}
 .story-chips{display:grid;grid-template-columns:repeat(auto-fill,minmax(104px,1fr));gap:8px;margin-top:14px}.story-chip{display:flex;flex-direction:column;gap:2px;min-width:0;color:#fff;padding:10px 12px;border-radius:var(--r-md);background:rgba(13,16,22,.28)}.story-chip .ic{font-size:20px;line-height:1;height:22px;display:flex;align-items:center}.story-chip .ic svg{width:22px;height:22px}.story-chip b{font:800 24px/1.05 Outfit,sans-serif;overflow-wrap:anywhere}.story-chip span:last-child{font-size:13px;opacity:.9}.story-chip.is-gold b{color:#fde68a}.story-chip.is-up b{color:#bbf7d0}.story-chip.is-down b{color:#fecaca}
 .session-cols{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(0,1fr);gap:18px;align-items:start}.session-cols>div>.rank-card{margin-top:18px}
 @container(max-width:860px){.session-cols{grid-template-columns:1fr;gap:0}}
 .hello{text-align:center;padding:28px 18px}.hello b{font:700 22px Outfit,sans-serif}
 /* Game tiles */
 .game-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:var(--gap)}
 .game{display:flex;flex-direction:column;text-align:left;padding:0;overflow:hidden;border-radius:var(--r-lg);border:1px solid var(--line);background:var(--s1);color:inherit;font:inherit;cursor:pointer;min-height:var(--tap)}.game:active{transform:scale(.985)}
 .game-band{display:flex;align-items:center;gap:12px;padding:12px 14px;color:#0d1016;background:linear-gradient(120deg,var(--rest1),var(--rest2))}.game.tier-win .game-band{background:linear-gradient(120deg,var(--win1),var(--win2))}.game.tier-top .game-band{background:linear-gradient(120deg,var(--top1),var(--top2))}.game.tier-mid .game-band{background:linear-gradient(120deg,var(--mid1),var(--mid2))}.game.tier-win{border-color:var(--gold);box-shadow:0 0 0 1px var(--gold),0 8px 24px rgba(245,200,75,.18)}
 .game-band>svg{width:42px;height:42px;flex:none}.game-titles{flex:1;min-width:0;display:flex;flex-direction:column}.game-titles b{font:800 21px/1.1 Outfit,sans-serif}.game-meta{font-size:13px;font-weight:600;opacity:.8;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
 .game-body{display:flex;flex-direction:column;gap:10px;padding:12px 14px 14px;flex:1}
 .game-kills{display:flex;align-items:center;flex-wrap:wrap;gap:6px}.game-kills>b{font:800 30px/1 Outfit,sans-serif}.game-kills>span{color:var(--mut);margin-right:4px}.game-kills .match-icons svg{width:20px;height:20px}
 .game-rank{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:var(--r-md);background:var(--s2)}.game-rank b{flex:1;font:700 16px Outfit,sans-serif}.game-rank .emblem{flex:none}
 .game-foot{margin-top:auto;font-size:13px;color:var(--mut)}
 .more-btn{width:100%;margin-top:12px;min-height:var(--tap)}
 /* Rank card */
 .rank-card{position:relative;overflow:hidden;margin-top:12px;background:linear-gradient(160deg,color-mix(in srgb,var(--rk1) 22%,var(--s1)),var(--s1) 70%)}
 .rank-top{display:flex;align-items:center;gap:14px}.rank-ring{flex:none;display:grid;place-items:center;width:92px;height:92px;border-radius:50%;background:conic-gradient(var(--rk1) var(--pct),color-mix(in srgb,var(--rk1) 14%,var(--s2)) 0)}.rank-ring>.emblem{width:72px;height:72px;padding:4px;border-radius:50%;background:var(--s1)}
 .rank-text{display:flex;flex-direction:column;gap:3px;min-width:0}.rank-name{font:800 26px/1.1 Outfit,sans-serif;color:color-mix(in srgb,var(--rk1) 70%,#fff)}.rank-sub{font-size:14px;color:var(--mut)}
 .rank-bar{margin:12px 0 4px}.rank-bar .track i{background:linear-gradient(90deg,var(--rk2),var(--rk1))}
 .ladder{list-style:none;display:grid;grid-template-columns:repeat(8,1fr);gap:4px;margin:14px 0 0;padding:0}.ladder li{position:relative;display:flex;flex-direction:column;align-items:center;gap:4px;min-width:0}.ladder i{display:block;width:100%;height:10px;border-radius:99px;background:color-mix(in srgb,var(--c) 22%,var(--s2))}.ladder li.past i{background:color-mix(in srgb,var(--c) 70%,var(--s2))}.ladder li.here i{background:var(--c);box-shadow:0 0 0 2px var(--s1),0 0 0 4px var(--c);height:14px;margin-top:-2px}.ladder .lab{font-size:10px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}.ladder li.here .lab{color:inherit;font-weight:800;font-size:11px}.ladder .peak{position:absolute;top:-16px;color:var(--gold);font-size:13px}
 .rank-peak{margin:8px 0 0}
 .track-list{display:grid;gap:8px;margin-top:12px}.track-row{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:var(--r-md);background:var(--s1);border:1px solid var(--line)}.track-row>span{display:flex;flex-direction:column}
 .power-card{display:flex;flex-direction:column;gap:4px;margin-top:12px}.power-card .num{font:800 30px Outfit,sans-serif}
 /* Stats */
 .filters-bar{display:flex;flex-direction:column;gap:8px}.jump{display:flex;gap:8px;margin:12px 0 0;overflow-x:auto;scrollbar-width:none}.chip{min-height:40px;padding:0 16px;border-radius:99px;border:1px solid var(--line);background:var(--s1);color:inherit;font:600 14px Figtree,sans-serif;cursor:pointer;flex:none}
 .size-row{display:grid;grid-template-columns:70px 80px minmax(0,1fr) 58px 64px;align-items:center;gap:10px;padding:10px 12px;border-radius:var(--r-md);background:var(--s1);border:1px solid var(--line);margin-bottom:8px}.size-row .track{margin:0}.size-row>b:nth-of-type(2){text-align:right}
 @container(max-width:520px){.size-row{grid-template-columns:1fr auto;row-gap:6px}.size-row .track{grid-column:1/-1;order:3}.size-row>b:nth-of-type(2){order:4;text-align:left}.size-row>span:last-child{order:5;text-align:right}}
 .fav{margin:0;color:var(--mut)}.fav b{color:inherit}
 #overview,#ranked,#games{scroll-margin-top:12px}
 /* Game sheet */
 .celebration{position:relative;overflow:hidden;border-radius:var(--r-lg);text-align:center;color:#0d1016;background:linear-gradient(135deg,var(--rest1),var(--rest2))}.celebration.tier-win{background:linear-gradient(135deg,var(--win1),var(--win2))}.celebration.tier-top{background:linear-gradient(135deg,var(--top1),var(--top2))}.celebration.tier-mid{background:linear-gradient(135deg,var(--mid1),var(--mid2))}.celebration p{margin:4px 0 0;font-weight:600}.celebration .tag{position:absolute;top:12px;right:12px}.confetti{position:absolute;top:0}
 .map-card{margin:18px 0 0;border-radius:var(--r-lg);overflow:hidden;border:1px solid var(--line);background:var(--s2)}.map-card img{display:block;width:100%;height:auto;aspect-ratio:1;max-height:420px;object-fit:cover}.map-card figcaption{display:flex;flex-direction:column;padding:10px 14px}
 .found-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:10px}.found{display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center;padding:12px;border-radius:var(--r-md);background:var(--s2)}.found img{width:72px;height:72px;object-fit:contain}.found b{font:700 15px Outfit,sans-serif}.found .btn{min-height:40px}
 .pill.accent{background:var(--acc);color:#0d1016}.pill.gold{background:var(--gold);color:#0d1016}
 .quest-row{display:flex;align-items:center;gap:10px;padding:12px 14px;border-radius:var(--r-md);background:var(--s2);margin-bottom:8px;font-weight:600}.quest-row .tick{width:24px;height:24px;border-radius:50%;background:#4ade80;display:inline-grid;place-items:center;flex:none}.quest-row .tick svg{width:15px;height:15px}.quest-row .ic{width:24px;text-align:center}
 /* Locker */
 .rarity-pill{background:color-mix(in srgb,var(--rc) 22%,var(--s2));color:color-mix(in srgb,var(--rc) 70%,#fff)}
 .rarity-chips{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0}.rarity-chip{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:0 14px;border-radius:99px;border:1px solid color-mix(in srgb,var(--rc) 45%,var(--line));background:var(--s1);color:inherit;font:600 14px Figtree,sans-serif;cursor:pointer}.rarity-chip i{width:12px;height:12px;border-radius:50%;background:var(--rc)}.rarity-chip b{padding:1px 8px;border-radius:99px;background:var(--s2);font-size:12px}.rarity-chip.on{background:color-mix(in srgb,var(--rc) 24%,var(--s1));border-color:var(--rc)}
 @media(prefers-reduced-motion:reduce){.pill.live::before{animation:none}.game:active,.round:active{transform:none}}
 `;
  p.dataSig = function() {
    const cache = this.sigCache ??= new WeakMap(), people = Object.values(this.config?.people || {});
    return Object.values(this._hass?.states || {}).filter(s => s.attributes?.fortnite_player_id || people.includes(s.entity_id)).map(s => {
      let v = cache.get(s);
      if (v === undefined) { v = people.includes(s.entity_id) ? s.entity_id + '|' + (s.attributes?.entity_picture || '') : s.entity_id + '|' + s.state + '|' + JSON.stringify(s.attributes); cache.set(s, v); }
      return v;
    }).join('\n');
  };
  p.sections = function() {
    const requested = this.config?.native?.sections;
    return requested?.length ? requested.filter((id) => tabs.some((t) => t[0] === id)) : tabs.map((t) => t[0]);
  };
  p.seg = function(items, key, current) {
    return '<div class="seg" aria-label="' + esc(key) + '">' + items.map(([id, label]) => btn(esc(label), key, id, id === current)).join("") + "</div>";
  };
  p.rail = function(id, title, items, { pages = false, labels = [] } = {}) {
    if (!items.length) return empty(title);
    return '<section class="rail-wrap" data-rail-wrap="' + id + '"><div class="rail-head"><h3>' + esc(title) + '</h3><span class="lab rail-count sp" aria-live="polite">1 of ' + items.length + "</span>" + btn("‹", "rail-prev", id) + btn("›", "rail-next", id) + '</div><div class="rail ' + (pages ? "pages" : "cards") + '" data-rail="' + id + '" tabindex="0" aria-label="' + esc(title) + '">' + items.map((x) => "<article>" + x + "</article>").join("") + '</div><div class="rail-dots' + (labels.length ? " labelled" : "") + '">' + items.map((_, i) => '<button class="btn' + (!i ? " on" : "") + '" data-rail-dot="' + id + '" data-page="' + i + '" aria-label="' + esc(labels[i] || "Page " + (i + 1)) + '" aria-current="' + !i + '">' + esc(labels[i] || "") + "</button>").join("") + "</div></section>";
  };
  p.flowRail = function(id, title, items) {
    if (!items.length) return empty(title);
    const per = (this.clientWidth >= 1000 && this.flowPer?.[id]) || (this.clientWidth && this.clientWidth < 1e3 ? 6 : 10), pages = chunks(items, per), groups = [], starts = [];
    items.forEach((it, i) => { if (!groups.length || groups[groups.length - 1] !== it.group) { groups.push(it.group); starts.push(Math.floor(i / per)); } });
    const body = pages.map((pg) => '<article><div class="flow-head">' + [...new Set(pg.map((x) => x.group))].map((g) => '<span>' + esc(g) + '</span>').join('<i aria-hidden="true">›</i>') + '</div><div class="reward-grid">' + pg.map((x) => x.html).join('') + '</div></article>').join('');
    return '<section class="rail-wrap" data-rail-wrap="' + id + '"><div class="rail-head"><h3>' + esc(title) + '</h3><span class="lab rail-count sp" aria-live="polite">1 of ' + pages.length + '</span>' + btn('‹', 'rail-prev', id) + btn('›', 'rail-next', id) + '</div><div class="rail pages" data-rail="' + id + '" data-flow="1" tabindex="0" aria-label="' + esc(title) + '">' + body + '</div><div class="rail-dots labelled anchors">' + groups.map((g, i) => '<button class="btn' + (!i ? ' on' : '') + '" data-rail-dot="' + id + '" data-page="' + starts[i] + '" aria-label="Jump to ' + esc(g) + '" aria-current="' + !i + '">' + esc(g) + '</button>').join('') + '</div></section>';
  };
  p.bindRails = function() {
    for (const rail of this.shadowRoot.querySelectorAll("[data-rail]")) {
      if(rail.dataset.bound)continue;
      rail.dataset.bound='1';
      const wrap = rail.closest("[data-rail-wrap]");
      if(rail.dataset.flow&&this.clientWidth>=1000){const grid=rail.querySelector('.reward-grid'),first=rail.children[0];if(grid&&first&&grid.children.length){const cs=env.getComputedStyle(grid),cols=cs.gridTemplateColumns.split(' ').length,gap=parseFloat(cs.rowGap)||0,h=Math.max(...[...grid.children].map(e=>e.getBoundingClientRect().height)),head=grid.getBoundingClientRect().top-first.getBoundingClientRect().top,rows=Math.max(1,Math.floor((rail.clientHeight-head+gap)/(h+gap))),cap=cols*rows,key=rail.dataset.rail+'@'+this.clientWidth;this.flowPer??={};this.flowTries??={};if(h>0&&cap>0&&cap!==this.flowPer[rail.dataset.rail]&&(this.flowTries[key]=(this.flowTries[key]||0)+1)<=3){this.flowPer[rail.dataset.rail]=cap;queueMicrotask(()=>{this.renderStamp='';this.render();});}}}
      if(rail.classList.contains('pages')&&!rail.dataset.flow&&this.clientWidth>=1000){
        let changed=false;
        const oldLabels=[...wrap.querySelectorAll('[data-page]')].map(b=>b.textContent),labels=[];
        for(const [index,article]of [...rail.children].entries()){
          const grid=article.querySelector('.reward-grid,.family-grid');
          if(!grid){labels.push(oldLabels[index]||'');continue;}
          const items=[...grid.children],columns=env.getComputedStyle(grid).gridTemplateColumns.split(' ').length,gap=parseFloat(env.getComputedStyle(grid).rowGap)||0,max=Math.max(...items.map(e=>e.getBoundingClientRect().height)),heading=grid.getBoundingClientRect().top-article.getBoundingClientRect().top,rows=Math.max(1,Math.floor((rail.clientHeight-heading+gap)/(max+gap))),amount=columns*rows;
          labels.push(oldLabels[index]||'');
          if(items.length<=amount)continue;
          changed=true;
          let previous=article;
          for(let offset=amount;offset<items.length;offset+=amount){const next=article.cloneNode(true),nextGrid=next.querySelector('.reward-grid,.family-grid');nextGrid.replaceChildren(...items.slice(offset,offset+amount));previous.after(next);previous=next;labels.push(oldLabels[index]?oldLabels[index]+' · '+(offset/amount+1):'');}
        }
        if(changed){const dots=wrap.querySelector('.rail-dots');dots.innerHTML=[...rail.children].map((_,i)=>'<button class="btn'+(!i?' on':'')+'" data-rail-dot="'+rail.dataset.rail+'" data-page="'+i+'" aria-label="'+esc(labels[i]||'Page '+(i+1))+'" aria-current="'+(!i)+'">'+esc(labels[i]||'')+'</button>').join('');}
      }
      const labelledDots = wrap.querySelector('.rail-dots.labelled');
      if (labelledDots) { labelledDots.style.justifyContent = 'flex-start'; if (labelledDots.scrollWidth <= labelledDots.clientWidth) labelledDots.style.justifyContent = 'center'; }
      let pending = false;
      const sync = () => {
        pending = false;
        const children = [...rail.children], idx2 = children.reduce((best, c, i) => Math.abs(c.offsetLeft - rail.offsetLeft - rail.scrollLeft) < Math.abs(children[best].offsetLeft - rail.offsetLeft - rail.scrollLeft) ? i : best, 0);
        wrap.querySelector(".rail-count").textContent = idx2 + 1 + " of " + children.length;
        const dotsAll = [...wrap.querySelectorAll("[data-page]")], activeDot = dotsAll.filter((b) => Number(b.dataset.page) <= idx2).pop();
        for (const b of dotsAll) { b.classList.toggle("on", b === activeDot); b.setAttribute("aria-current", String(b === activeDot)); }
        const strip = activeDot?.parentElement;
        if (strip?.classList.contains("labelled")) { const l = activeDot.offsetLeft - strip.offsetLeft, r = l + activeDot.offsetWidth; if (l < strip.scrollLeft || r > strip.scrollLeft + strip.clientWidth) strip.scrollLeft = Math.max(0, l - 16); }
        this.railPositions ??= {};
        this.railPositions[rail.dataset.rail] = idx2;
        if(rail.dataset.rail==='events')this.ensureEventPodiums(idx2);
      };
      rail.addEventListener("scroll", () => {
        if (!pending) {
          pending = true;
          (env.requestAnimationFrame || queueMicrotask)(sync);
        }
      }, { passive: true });
      rail.addEventListener("keydown", (e) => {
        if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) {
          e.preventDefault();
          const idx2 = this.railPositions?.[rail.dataset.rail] || 0;
          this.moveRail(rail.dataset.rail, e.key === "Home" ? 0 : e.key === "End" ? rail.children.length - 1 : idx2 + (e.key === "ArrowLeft" ? -1 : 1));
        }
      });
      const idx = this.railPositions?.[rail.dataset.rail] || 0;
      if (idx && rail.children[idx]) rail.scrollLeft = rail.children[idx].offsetLeft - rail.offsetLeft;
      sync();
    }
  };
  p.moveRail = function(id, index) {
    const rail = [...this.shadowRoot.querySelectorAll("[data-rail]")].find((r) => r.dataset.rail === id);
    if (!rail) return;
    const target = rail.children[Math.max(0, Math.min(rail.children.length - 1, index))];
    rail.scrollTo({ left: target.offsetLeft - rail.offsetLeft, behavior: env.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  p.status = function(state, loading, missing) {
    return state?.error ? empty(state.error) : state?.loading || !state || state.data === void 0 ? empty(loading) : state.data === null ? empty(missing) : "";
  };
  p.sessionActive=function(){return this.playing(this.player)||this.entity(this.player,"current_session")?.state==="active";};
  p.headerActions = function() {
    return '<div class="hero-actions">' + btn(this.sessionActive() ? "End session" : "Start session", "service", this.sessionActive() ? "end_session" : "start_session") + btn("Refresh", "service", "refresh_player") + "</div>";
  };
  p.heroPortrait = function() {
    const profile = this.attrs(this.player, 'profile'), outfits = this.native?._outfits?.data;
    const chosen = String(this.config.native?.avatar || '').trim() ? this.native?._avatar?.icon : Object.hasOwn(outfits || {}, 'avatar_id') ? outfits.outfits?.find(outfit => cosmeticKey(outfit) === String(outfits.avatar_id || '').toLowerCase())?.icon : profile.outfits?.avatar?.icon;
    return art(chosen || this.avatar(this.player), this.player, 64, this.avatar(this.player)).replace('<img', '<img class="avatar"');
  };
  p.hero = function() {
    const profile = this.attrs(this.player, "profile"), stats = this.attrs(this.player, "overall_stats"), v = this.entity(this.player, "vbucks"), session = this.attrs(this.player, "current_session"), tall = false;
    return '<section class="row slim' + (tall ? " tall-hero" : "") + '" style="--hero:url(' + esc(image(this.config.artwork?.hero)) + ')">' + this.heroPortrait() + "<div><h1>" + esc(profile.display_name || this.player) + '</h1><span class="lab">Level ' + fmt(valid(this.entity(this.player, "level")) ? this.entity(this.player, "level").state : null) + (this.config.native?.hide_vbucks ? "" : " · " + fmt(valid(v) ? v.state : null) + " V-Bucks") + '</span></div><span class="pill ' + (this.sessionActive() ? "live" : "") + '">' + (this.sessionActive() ? "Live · " + fmt(session.duration_minutes) + " min" : "Idle") + "</span>" + (tall ? '<div class="row hero-kpis">' + this.metric("Win rate", fmt(stats.win_rate_pct, 1) + "%", true) + this.metric("Wins", fmt(stats.total_wins)) + this.metric("K/D", fmt(stats.kd_ratio, 2)) + this.metric("Matches", fmt(stats.total_matches)) + "</div>" : "") + this.headerActions() + "</section>";
  };
  p.spriteFamilies = function() {
    const all = this.attrs(this.player, "sprites").families || [];
    return all.filter((f) => {
      const vs = f.variants || [], owned = vs.filter((v) => v.owned).length, m = vs.filter((v) => v.mastered).length;
      return this.filter === "mastered" ? m > 0 : this.filter === "unmastered" ? vs.some((v) => v.owned && !v.mastered) : this.filter === "missing" ? !owned : this.filter === "collected" ? owned > 0 : this.filter === "new" ? f.new || vs.some((v) => v.new) : true;
    }).sort((a, b) => this.spriteSort === "rarity" ? rarityOrder(a.rarity) - rarityOrder(b.rarity) || (a.dex || 0) - (b.dex || 0) : this.spriteSort === "kinds" ? (b.owned_variants || 0) / Math.max(1, b.total_variants || b.variants?.length || 1) - (a.owned_variants || 0) / Math.max(1, a.total_variants || a.variants?.length || 1) || (a.dex || 0) - (b.dex || 0) : (a.dex || 0) - (b.dex || 0));
  };
  p.level=function(xp,curve){const sorted=spriteCurve(curve);xp=number(xp);if(xp===null||!sorted.length)return null;let i=0;for(let k=0;k<sorted.length;k++)if(xp>=sorted[k].xp)i=k;const current=sorted[i],next=sorted[i+1];return{value:current.level,next:next?.level,target:next?.xp,progress:next?Math.max(0,Math.min(100,(xp-current.xp)/(next.xp-current.xp)*100)):100};};
  p.familyTile = function(f) {
    const vs = f.variants || [], m = vs.filter((v) => v.mastered).length, owned = vs.filter((v) => v.owned).length, total = f.total_variants ?? vs.length;
    return '<button class="family-tile" data-family="' + esc(f.id) + '">' + art(f.icon) + "<span><b>" + esc(f.name) + "</b>" + (owned ? '<span class="pill mastery' + (m ? " some" : "") + '">★ ' + m + "/" + total + "</span>" : '<span class="lab">Not found</span>') + (total > 0 && m === total ? '<span class="pill gold">Mastered</span>' : "") + (f.new ? '<span class="pill accent">NEW</span>' : "") + '<span class="pips">' + vs.map((v) => '<i class="pip ' + (v.mastered ? "mastered" : v.owned ? "found" : "") + (v.new ? " new" : "") + '" aria-label="' + esc((v.label || v.name) + ": " + (v.mastered ? "Mastered" : v.owned ? "Found" : "Missing")) + '"></i>').join("") + '</span><span class="lab">' + owned + " of " + total + " found · " + m + " mastered" + "</span></span></button>";
  };
  p.sprites = function() {
    const sensor = this.entity(this.player, "sprites"), a = this.attrs(this.player, "sprites"), all = a.families || [], families = this.spriteFamilies(), variants = all.flatMap((f) => f.variants || []), pct = valid(sensor) ? number(sensor.state) : null, view = this.spriteView || "collection";
    const fam = number(a.total_families), kinds = number(a.total_variants), kindsMastered = variants.filter((v) => v.mastered).length, famMastered = all.filter((f) => (f.variants || []).length && (f.variants || []).every((v) => v.mastered)).length, stat = (value, total, label) => '<div class="ssum-stat"><b>' + fmt(value) + (total ? '<small> / ' + fmt(total) + '</small>' : '') + '</b><span class="lab">' + label + '</span>' + bar(total ? (number(value) || 0) / total * 100 : 0) + '</div>';
    const summary = '<section class="ssum"><div class="ssum-ring"><div class="ring" style="--pct:' + (pct || 0) + '%"><span>' + (pct === null ? '–' : fmt(pct) + '%') + '</span></div><span class="lab">collected</span></div><div class="ssum-stats">' + stat(a.owned_families, fam, 'Sprites found') + stat(a.owned_variants, kinds, 'Kinds collected') + stat(valid(sensor) ? kindsMastered : null, kinds, 'Kinds mastered') + stat(valid(sensor) ? famMastered : null, fam, 'Sprites fully mastered') + '</div><button class="ssum-seasons" data-seasons="">' + SEASON_ICON + '<span>Seasons</span></button></section>';
    let content;
    if (view === "collection") {
      const per = this.clientWidth && this.clientWidth < 1e3 ? 4 : 8;
      content = '<div class="controls">' + this.seg([["all", "All"], ["mastered", "Mastered"], ["unmastered", "Not mastered"], ["missing", "Not found"], ["new", "New"]], "filter", this.filter) + '<label class="lab">Sort <select data-select="spriteSort"><option value="dex">Number</option><option value="rarity"' + (this.spriteSort === "rarity" ? " selected" : "") + '>Rarity</option><option value="kinds"' + (this.spriteSort === "kinds" ? " selected" : "") + ">Most kinds</option></select></label></div>" + this.rail("collection", "Collection", chunks(families, per).map((page) => '<div class="family-grid">' + page.map((f) => this.familyTile(f)).join("") + "</div>"), { pages: true });
      if (!families.length) content = empty(all.length ? "No Sprites in this filter" : "No Sprite collection available");
    } else {
      const rows = all.flatMap((f) => (f.variants || []).map((v) => ({ f, v, lv: this.level(v.xp, a.level_curve) }))).filter((x) => view === "almost" ? x.v.owned && !x.v.mastered && x.lv?.target : !x.v.owned && number(x.v.drop_chance_pct) !== null).sort((x, y) => view === "almost" ? (spriteCurve(a.level_curve).at(-1)?.xp-x.v.xp)-(spriteCurve(a.level_curve).at(-1)?.xp-y.v.xp) : y.v.drop_chance_pct - x.v.drop_chance_pct).slice(0, view === "almost" ? 5 : 6);
      content = this.rail("sprite-kinds", view === "almost" ? "Almost mastered" : "Easiest to find next", rows.map(({ f, v, lv }) => '<section class="card">' + art(v.icon, v.label, 100) + "<h3>" + esc(f.name) + " · " + esc(v.label || v.name) + '</h3><p class="lab">' + (view === "almost" ? "Level " + lv.value + " · " + fmt(spriteCurve(a.level_curve).at(-1)?.xp-v.xp) + " XP to go" : fmt(v.drop_chance_pct, 1) + "% drop chance") + "</p>" + bar(lv?.progress) + '<p class="notice">' + esc(f.hint || "") + "</p>" + btn("See Sprite", "family", f.id) + "</section>"));
    }
    const banner = a.new_sprites || a.new_kinds ? '<div class="update-note" role="status"><span class="new">NEW</span><span class="txt"><b>' + esc(a.version ? 'Update ' + a.version : 'This update') + '</b> · ' + fmt(a.new_sprites) + ' new Sprites · ' + fmt(a.new_kinds) + ' new kinds</span>' + btn(this.filter === 'new' ? 'Show all' : 'Show them ›', 'filter', this.filter === 'new' ? 'all' : 'new') + '</div>' : '';
    const switcher = this.seg([["collection", "Collection"], ["almost", "Almost mastered"], ["findnext", "Find next"]], "sprite-view", view);
    return summary + banner + (view === "collection" ? content.replace('<div class="controls">', '<div class="controls">' + switcher) : switcher + content);
  };
  p.spriteSheet = function() {
    const a = this.attrs(this.player, "sprites"), families = this.spriteFamilies(), f = (a.families || []).find((x) => x.id === this.selected);
    if (!f) return empty("No Sprite collection available");
    const vs = f.variants || [], v = vs.find((x) => x.id === this.kind) || vs.find((x) => x.owned) || vs[0] || {}, lv = v.owned ? this.level(v.xp, a.level_curve) : null, m = vs.filter((x) => x.mastered).length, hd = image(v.icon_large) || image(v.icon) || image(f.icon_large) || image(f.icon);
    this.kind=v.id;
    return pager('sprite-step', families.findIndex((x) => x.id === f.id), families.length, 'Sprite collection', true) + '<div class="sheet-grid"><div class="stage"><button class="art-button' + (this.zoom ? " zoom" : "") + '" data-zoom="" data-image="' + esc(hd) + '" aria-label="Enlarge ' + esc(v.name || f.name) + '">' + art(hd, v.name || f.name, 230, v.icon || f.icon) + "</button><h2>" + esc(f.name) + '</h2><div class="row"><span class="pill">' + esc(f.rarity || "") + '</span><span class="pill mastery' + (m ? " some" : "") + '">★ ' + m + " of " + (f.total_variants ?? vs.length) + ' mastered</span></div><span class="pill">' + (v.mastered ? "★ Mastered" : lv ? "Level " + lv.value + (lv.next ? "" : " · max") : v.owned ? "Level unavailable" : "Not found") + '</span><span class="lab">' + (v.owned ? "You have " + fmt(v.count ?? 1) : number(v.drop_chance_pct) !== null ? fmt(v.drop_chance_pct, 1) + "% drop chance" : "") + "</span>" + (v.new || f.new ? '<span class="pill accent">' + (f.new ? "New this update" : "New kind") + "</span>" : "") + '<div style="width:100%">' + bar(lv?.progress) + '<p class="notice">' + (lv?.target ? fmt(v.xp) + " of " + fmt(lv.target) + " XP · " + fmt(lv.target - v.xp) + " to next level" : lv ? fmt(v.xp) + " XP · Maximum level" : "XP unavailable") + '</p></div></div><div><h3>Kinds</h3><div class="kind-list">' + vs.map((k) => {
      const l = k.owned ? this.level(k.xp, a.level_curve) : null;
      return '<button class="kind-row' + (k.id === v.id ? " selected" : "") + '" data-kind="' + esc(k.id) + '">' + art(k.icon) + "<span><b>" + esc(k.label || k.name) + '</b><span class="lab">' + (k.mastered ? "★ Mastered" : l ? "Level " + l.value : k.owned ? "Level unavailable" : "Not found") + " · " + (k.owned ? "You have " + fmt(k.count ?? 1) : fmt(k.drop_chance_pct, 1) + "% drop chance") + "</span>" + bar(l?.progress) + '<span class="lab">' + esc((k.boons || []).map((b) => [b.name, b.description || b.text].filter(Boolean).join(": ")).join(" · ")) + "</span></span></button>";
    }).join("") + '</div><p class="notice">' + esc(f.description || "") + '</p><p class="hint">' + esc(f.hint || "") + '</p><p class="lab">' + esc(f.added_in ? "Added in update " + f.added_in : "") + "</p>" + (!v.boons?.length ? (f.boons || []).map((b) => '<p class="notice">' + esc(b.name) + ": " + esc(b.description || b.text) + "</p>").join("") : "") + "</div></div>";
  };
  // A rank as an emblem in a progress ring, the tier ladder with "you are here" and the peak, and an optional change chip
  p.rankCard = function(key, label, { delta = null, always = false } = {}) {
    const sensor = this.entity(this.player, key);
    if (!valid(sensor)) return '';
    const a = sensor.attributes || {}, rank = sensor.state, tier = rankTier(rank), peak = rankTier(a.highest_rank) ? a.highest_rank : null, pct = Math.max(0, Math.min(100, number(a.progress_pct) || 0)), unreal = number(a.unreal_rank);
    if (!tier && !always) return '';
    const [c1, c2] = RANK_COLOURS[tier] || ['#9aa3b2', '#4b5563'], here = RANKS.indexOf(tier), top = RANKS.indexOf(rankTier(peak));
    const ladder = '<ol class="ladder" aria-label="Rank ladder">' + RANKS.map((t, i) => '<li class="' + (i === here ? 'here' : i < here ? 'past' : '') + '" style="--c:' + RANK_COLOURS[t][0] + '" title="' + t + '">' + (i === top && top !== here ? '<span class="peak" aria-label="Best rank">★</span>' : '') + '<i></i><span class="lab">' + t + '</span></li>').join('') + '</ol>';
    return '<section class="card rank-card" style="--rk1:' + c1 + ';--rk2:' + c2 + ';--pct:' + pct + '%"><div class="rank-top"><div class="rank-ring" role="img" aria-label="' + esc(tier ? rank + ', ' + Math.round(pct) + '% of the way through' : 'Not ranked yet') + '">' + rankEmblem(tier ? rank : null, 68) + '</div><div class="rank-text"><span class="lab">' + esc(label) + '</span><b class="rank-name">' + esc(tier ? rank : 'Not ranked yet') + '</b><span class="rank-sub">' + (tier ? (unreal ? 'Unreal #' + fmt(unreal) : Math.round(pct) + '% of the way through ' + esc(rank)) : 'Play a ranked game to get a rank') + '</span>' + (delta !== null ? deltaChip(delta, ' tonight') : '') + '</div></div>' + (tier ? '<div class="rank-bar">' + bar(pct) + '</div>' + ladder + (peak ? '<p class="lab rank-peak">★ Best rank: ' + esc(peak) + '</p>' : '') : '') + '</section>';
  };
  p.rank = function(key, label) { return this.rankCard(key, label, { always: true }); };
  // Other ranked tracks (Arena, Rocket Racing, ...): only the ones with a rank, named in words
  p.otherTracks = function() {
    const tracks = (this.attrs(this.player, 'rank_battle_royale').all_tracks || []).filter(t => !['Battle Royale', 'Reload Build'].includes(t.game_mode) && rankTier(t.current_rank));
    return tracks.length ? '<div class="track-list">' + tracks.map(t => '<div class="track-row">' + rankEmblem(t.current_rank, 40) + '<span><b>' + esc(trackName(t.game_mode)) + '</b><span class="lab">' + esc(t.current_rank) + (number(t.progress_pct) ? ' · ' + fmt(t.progress_pct) + '%' : '') + '</span></span></div>').join('') + '</div>' : '';
  };
  p.powerCard = function() {
    const power = this.entity(this.player, 'power_ranking');
    if (!valid(power) || number(power.state) === null) return '';
    const a = power.attributes || {}, extra = [number(a.points) !== null ? fmt(a.points) + ' points' : '', number(a.peak_pr) !== null ? 'best ' + big(a.peak_pr) : ''].filter(Boolean).join(' · ');
    return '<section class="card power-card"><span class="lab">Power Ranking</span><b class="num" title="' + esc(fmt(power.state)) + '">#' + big(power.state) + '</b>' + (extra ? '<span class="lab">' + extra + '</span>' : '') + deltaChip(a.delta_pr) + '</section>';
  };
  p.stats = function() {
    const a = this.attrs(this.player, "overall_stats"), profile = this.attrs(this.player, "profile"), windows = profile.windows || {}, win = windows[this.statWindow] ? this.statWindow : "lifetime", mode = this.statMode || "all";
    const base = win === "lifetime" ? { matches: a.total_matches, kills: a.total_kills, wins: a.total_wins, kd: a.kd_ratio, win_rate: a.win_rate_pct, players_outlived: a.players_outlived, minutes: a.minutes_played, avg_match_minutes: a.metrics?.avg_match_minutes, modes: a.modes, favourite_mode: a.metrics?.favourite_mode, team_sizes: a.team_sizes, team_sizes_by_mode: a.team_sizes_by_mode, inputs: a.inputs } : windows[win] || {};
    const shown = mode === "all" ? base : base.modes?.[mode] || {}, played = number(shown.matches) || 0;
    const minutes = number(shown.minutes), avg = mode === "all" && number(base.avg_match_minutes) !== null ? number(base.avg_match_minutes) : played && minutes !== null ? minutes / played : null;
    const tiles = played ? factTiles([["Win rate", fmt(shown.win_rate, 1) + "%"], ["Victory Royales", fmt(shown.wins)], ["Eliminations", fmt(shown.kills)], ["K/D", fmt(shown.kd, 2)], ["Games", fmt(shown.matches)], ["Players outlived", number(shown.players_outlived) ? fmt(shown.players_outlived) : null], ["Time played", minutes ? minutesText(minutes) : null], ["Average game", avg ? minutesText(avg) : null]]) : '';
    const sizes = mode === "all" ? base.team_sizes : base.team_sizes_by_mode?.[mode], best = Math.max(1, ...Object.values(sizes || {}).map(t => number(t?.win_rate) || 0));
    const sizeRows = ["solo", "duo", "trio", "squad"].filter(k => number(sizes?.[k]?.matches)).map(k => { const t = sizes[k]; return '<div class="size-row"><b>' + { solo: 'Solo', duo: 'Duos', trio: 'Trios', squad: 'Squads' }[k] + '</b><span class="lab">' + fmt(t.matches) + (t.matches === 1 ? ' game' : ' games') + '</span>' + bar((number(t.win_rate) || 0) / best * 100) + '<b>' + fmt(t.win_rate, 1) + '%</b><span class="lab">K/D ' + fmt(t.kd, 2) + '</span></div>'; }).join('');
    const inputs = mode === "all" ? Object.values(base.inputs || {}).filter(i => number(i.matches)) : [];
    const inputRows = inputs.map(i => '<div class="size-row"><b>' + esc(i.label) + '</b><span class="lab">' + fmt(i.share_pct) + '% of games</span>' + bar(i.share_pct) + '<b>' + fmt(i.win_rate, 1) + '%</b><span class="lab">K/D ' + fmt(i.kd, 2) + '</span></div>').join('');
    const fav = base.favourite_mode?.name ? '<p class="fav">Favourite mode: <b>' + esc(modeName({ playlist_id: base.favourite_mode.playlist_id, mode_name: base.favourite_mode.name }, this.native || this.catalogNative) || base.favourite_mode.name) + '</b></p>' : '';
    const more = win === "lifetime" && mode === "all" ? factTiles([['Eliminations per minute', number(a.metrics?.kills_per_minute) ? fmt(a.metrics.kills_per_minute, 2) : null], ['Score per game', number(a.metrics?.score_per_match) ? fmt(a.metrics.score_per_match) : null], ['Solo top 10', number(a.metrics?.solo_top10_rate) ? fmt(a.metrics.solo_top10_rate, 1) + '%' : null], ['Solo top 25', number(a.metrics?.solo_top25_rate) ? fmt(a.metrics.solo_top25_rate, 1) + '%' : null]]) : '';
    const ranked = this.rankCard("rank_battle_royale", "Battle Royale", { always: true }) + this.rankCard("rank_reload", "Reload") + this.otherTracks() + this.powerCard();
    const listKey = win !== "lifetime" && base.since ? "window:" + win + ":" + base.since + ":" + base.matches : null;
    if (listKey) this.native?._ensureMatches?.(listKey, { since: base.since });
    const list = listKey ? this.native?._matchLists?.[listKey] : null, games = this.withLiveProgress(list?.matches || (win === "today" || win === "lifetime" ? this.matches() : [])), limit = this.gamesShown || 6;
    const gameList = list?.error ? empty(list.error) : list?.loading ? empty('Loading games…') : games.length ? '<div class="game-grid">' + games.slice(0, limit).map(m => this.matchTile(m)).join('') + '</div>' + (games.length > limit ? '<button class="btn more-btn" data-games-shown="' + (limit + 6) + '">Show more games (' + (games.length - limit) + ' left)</button>' : '') : '';
    const jump = '<nav class="jump" aria-label="Jump to">' + [['overview', 'Overview'], ['ranked', 'Ranked'], gameList ? ['games', 'Games'] : null].filter(Boolean).map(([id, l]) => '<button class="chip" data-jump="' + id + '">' + l + '</button>').join('') + '</nav>';
    return (profile.epic_link === 'relink_required' ? '<p class="notice">Epic sign-in expired. Sprites, level and Power Ranking are paused until it is linked again in Settings › Devices &amp; services › Fortnite Activity › Configure.</p>' : '') + '<div class="filters-bar">' + this.seg([["lifetime", "All time"], ...["season", "week", "today"].filter((w) => windows[w]).map((w) => [w, w === "week" ? "This week" : w === "today" ? "Today" : "Season"])], "stat-window", win) + this.seg([["all", "All modes"], ["zero_build", "Zero Build"], ["build", "Build"], ["reload", "Reload"]], "stat-mode", mode) + '</div>' + jump
      + '<div id="overview">' + (tiles ? section('Overview', tiles + fav) : empty(win === 'today' ? 'No games yet today.' : 'No games in this view yet.')) + section(mode === 'all' ? 'By team size' : 'By team size in this mode', sizeRows, 'win rate') + section('By controller', inputRows.length > 1 || (inputRows && win !== 'lifetime') ? inputRows : '', 'win rate') + section('More stats', more) + '</div>'
      + '<div id="ranked">' + section('Ranked', ranked) + '</div>'
      + (gameList ? '<div id="games">' + section('Games', gameList, win === 'lifetime' ? 'latest session' : 'newest first') + '</div>' : '');
  };
  // Sprites and quests are read a poll or two after a game ends; take them from the live session entity
  p.withLiveProgress = function(list) {
    const live = new Map((this.attrs(this.player, "current_session").recent_matches || []).map(m => [m.timestamp, m]));
    return (list || []).map(m => { const l = live.get(m.timestamp); return l && JSON.stringify(l.progress || []) !== JSON.stringify(m.progress || []) ? { ...m, progress: l.progress } : m; });
  };
  p.matches = function() {
    const s = this.attrs(this.player, "current_session"), key = s.session_id ? "session:" + s.session_id + ":" + (s.matches_played || 0) : null;
    return this.withLiveProgress(key && this.native?._matchLists?.[key]?.matches || s.recent_matches || []);
  };
  p.statsSheet = function() {
    const metrics = this.attrs(this.player, 'overall_stats').metrics || {};
    return factTiles([['Eliminations per minute', fmt(metrics.kills_per_minute, 2)], ['Score per game', fmt(metrics.score_per_match)], ['Solo top 10', number(metrics.solo_top10_rate) === null ? null : fmt(metrics.solo_top10_rate, 1) + '%'], ['Solo top 25', number(metrics.solo_top25_rate) === null ? null : fmt(metrics.solo_top25_rate, 1) + '%']]);
  };
  p.timeOfDay = function(value) {
    const d = new Date(value);
    return Number.isFinite(d.getTime()) ? d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: this._hass?.config?.time_zone || 'Europe/London' }) : '';
  };
  const tierIcon = tier => tier.t === 'win' ? TROPHY : ICON.medal(medalColour[tier.t]);
  // One game: the placement banner, then eliminations, rank change (ranked) or what was found (not ranked)
  p.matchTile = function(m) {
    const idx = this.matchSequence?.length || 0;
    this.matchSequence ??= [];
    this.matchSequence.push(m);
    const tier = matchTier(m), ranked = isRanked(m), kills = number(m.kills) || 0, events = m.progress || [], mode = modeName(m, this.native || this.catalogNative);
    const sprites = ranked ? [] : events.filter((e) => /^sprite_/.test(e.type)), quests = events.filter((e) => e.type === "quests").reduce((n, e) => n + (number(e.count) || 0), 0), level = events.find((e) => e.type === "level_up");
    const gains = sprites.slice(0, 4).map((e) => art(e.icon, e.name, 40)).join('') + (sprites.length ? '<span class="pill g">' + sprites.length + (sprites.length > 1 ? ' Sprites' : ' Sprite') + '</span>' : '') + (quests ? '<span class="pill q">' + ICON.tick + quests + (quests > 1 ? ' quests' : ' quest') + '</span>' : '') + (level ? '<span class="pill q">⬆ Level ' + fmt(level.to) + '</span>' : '');
    const rank = ranked && rankTier(m.current_rank) ? '<span class="game-rank">' + rankEmblem(m.current_rank, 34) + '<b>' + esc(m.current_rank) + '</b>' + deltaChip(m.rank_delta_pct) + '</span>' : '';
    const foot = [number(m.minutes) ? minutesText(m.minutes) : '', this.timeOfDay(m.timestamp)].filter(Boolean).join(' · ');
    return '<button class="game tier-' + tier.t + (ranked ? ' ranked' : '') + '" data-match="' + idx + '" aria-label="' + esc([tier.label, gameLabel(m), mode, kills + (kills === 1 ? ' elimination' : ' eliminations')].filter(Boolean).join(', ')) + '"><span class="game-band">' + tierIcon(tier) + '<span class="game-titles"><span class="game-meta">' + esc(gameLabel(m)) + (mode ? ' · ' + esc(mode) : '') + '</span><b>' + esc(tier.label) + '</b></span>' + (ranked ? '<span class="tag">Ranked</span>' : '') + '</span><span class="game-body">' + (kills ? '<span class="game-kills"><b>' + fmt(kills) + '</b><span>' + (kills === 1 ? 'elimination' : 'eliminations') + '</span>' + killIcons(kills) + '</span>' : '') + rank + (gains ? '<span class="match-gains">' + gains + '</span>' : '') + (foot ? '<span class="game-foot">' + esc(foot) + '</span>' : '') + '</span></button>';
  };
  p.session = function() {
    const s = this.attrs(this.player, "current_session"), matches = this.matches(), key = s.session_id ? "session:" + s.session_id + ":" + (s.matches_played || 0) : null;
    if (key && this.config.native?.show_match_feed !== false) this.native?._ensureMatches?.(key, { session_id: s.session_id });
    const events = matches.flatMap((m) => m.progress || []), sprites = events.filter((e) => /^sprite_/.test(e.type)), quests = events.filter((e) => e.type === "quests").reduce((n, e) => n + (number(e.count) || 0), 0), games = number(s.matches_played) || matches.reduce((n, m) => n + (number(m.match_count) || 1), 0), live = this.sessionActive();
    if (!games) return '<section class="card hello"><b>No games yet</b><p class="lab">' + esc(this.pname(this.player)) + '’s games show up here while Fortnite is being played.</p></section>' + this.rankCard("rank_battle_royale", "Battle Royale ranked");
    const ranked = matches.some(isRanked), wins = number(s.wins) || 0, kills = number(s.kills) || 0;
    const chip = (icon, value, label, cls = '') => '<div class="story-chip ' + cls + '">' + icon + '<b>' + value + '</b><span>' + label + '</span></div>';
    const story = '<section class="story' + (wins ? ' won' : '') + '"><div class="story-head">' + (live ? '<span class="pill live">Playing now</span>' : '<span class="lab">' + esc(this.when(s.start_time)) + '</span>') + '<h2>' + (wins ? (wins > 1 ? wins + ' Victory Royales!' : 'Victory Royale!') : live ? 'Game on!' : 'How it went') + '</h2></div><div class="story-chips">'
      + chip('<span class="ic">🎮</span>', fmt(games), games === 1 ? 'game' : 'games')
      + chip('<span class="ic">🏆</span>', fmt(wins), wins === 1 ? 'Victory Royale' : 'Victory Royales', wins ? 'is-gold' : '')
      + chip('<span class="ic">' + ICON.target + '</span>', fmt(kills), kills === 1 ? 'elimination' : 'eliminations')
      + (number(s.duration_minutes) ? chip('<span class="ic">⏱</span>', shortTime(s.duration_minutes), 'played') : '')
      + (sprites.length ? chip('<span class="ic">✨</span>', fmt(sprites.length), sprites.length === 1 ? 'Sprite' : 'Sprites') : '')
      + (quests ? chip('<span class="ic">✅</span>', fmt(quests), quests === 1 ? 'quest' : 'quests') : '')
      + (ranked && number(s.net_rank_delta_pct) ? chip('<span class="ic">' + (s.net_rank_delta_pct > 0 ? '▲' : '▼') + '</span>', fmt(Math.abs(s.net_rank_delta_pct), 1) + '%', s.net_rank_delta_pct > 0 ? 'ranked up' : 'rank down', s.net_rank_delta_pct > 0 ? 'is-up' : 'is-down') : '')
      + '</div></section>';
    const list = this.config.native?.show_match_feed === false ? '' : matches.length ? '<div class="game-grid">' + matches.map((m) => this.matchTile(m)).join('') + '</div>' : empty(this.native?._matchLists?.[key]?.error || 'Loading games…');
    const seen = new Set(), found = sprites.filter((e) => !seen.has(e.name + e.type) && seen.add(e.name + e.type));
    const collected = found.length ? '<div class="found-grid">' + found.map((e) => '<div class="found">' + art(e.icon, e.name, 72) + '<b>' + esc(e.name) + '</b><span class="pill ' + (e.type === 'sprite_mastered' ? 'gold' : e.type === 'sprite_new' ? 'accent' : '') + '">' + (e.type === 'sprite_new' ? 'New!' : e.type === 'sprite_mastered' ? '★ Mastered' : (number(e.level) ? 'Level ' + fmt(e.level) : 'Levelled up')) + '</span></div>').join('') + '</div>' : '';
    return story + '<div class="session-cols"><div>' + section('Games', list, 'newest first') + '</div><div>' + this.rankCard("rank_battle_royale", "Battle Royale ranked", { delta: ranked ? s.net_rank_delta_pct : null }) + section('Collected tonight', collected) + '</div></div>';
  };
  // The game sheet follows the live data: find the open game again by its timestamp on every update
  p.sheetGame = function() {
    const list = (this.sheetMatches || this.matches()).map(m => m), live = this.withLiveProgress(list);
    return { list: live, m: live[this.matchIndex] };
  };
  p.matchSheet = function() {
    const { list, m } = this.sheetGame();
    if (!m) return empty("Game unavailable");
    const tier = matchTier(m), ranked = isRanked(m), mode = modeName(m, this.native || this.catalogNative), events = m.progress || [], sprites = ranked ? [] : events.filter((e) => /^sprite_/.test(e.type)), quests = events.filter((e) => e.type === "quests"), level = events.find((e) => e.type === "level_up"), n = this.native;
    if (m.playlist_id && n?._loadMatchMap) { n._loadMatchMap(m.playlist_id); if (['build', 'zero_build'].includes(m.mode_category)) n._loadMap?.('br'); }
    const map = n?._matchMap?.(m), kills = number(m.kills) || 0;
    const cheer = m.is_victory ? 'You beat everyone. Amazing!' : tier.t === 'top' ? 'So close to the top. Great game!' : number(m.players_outlived) ? 'You outlived ' + fmt(m.players_outlived) + ' players. Nice going!' : 'Nice going!';
    const banner = '<div class="celebration tier-' + tier.t + (m.is_victory ? ' win' : '') + '">' + (m.is_victory ? Array.from({ length: 16 }, (_, i) => '<i class="confetti" style="left:' + i * 6 + "%;animation-delay:" + i % 4 * 0.05 + 's"></i>').join("") : "") + '<h2>' + tierIcon(tier) + esc(tier.label) + '</h2><p>' + cheer + '</p>' + (ranked ? '<span class="tag">Ranked</span>' : '') + '</div>';
    const facts = factTiles([["Mode", mode], ["Map", map?.name || null], ["Time played", number(m.minutes) ? minutesText(m.minutes) : null], ["Eliminations", fmt(kills)], ["Players outlived", number(m.players_outlived) !== null ? fmt(m.players_outlived) : null], ["Score", number(m.score) ? fmt(m.score) : null], ["Finished", this.timeOfDay(m.timestamp) || null]]);
    const rank = ranked && rankTier(m.current_rank) ? '<section class="card rank-card" style="--rk1:' + RANK_COLOURS[rankTier(m.current_rank)][0] + ';--rk2:' + RANK_COLOURS[rankTier(m.current_rank)][1] + ';--pct:' + (number(m.rank_progress_pct) || 0) + '%"><div class="rank-top"><div class="rank-ring">' + rankEmblem(m.current_rank, 60) + '</div><div class="rank-text"><span class="lab">Rank after this game</span><b class="rank-name">' + esc(m.current_rank) + '</b><span class="rank-sub">' + fmt(m.rank_progress_pct) + '% of the way through' + (number(m.unreal_rank) ? ' · Unreal #' + fmt(m.unreal_rank) : '') + '</span>' + deltaChip(m.rank_delta_pct, ' this game') + '</div></div><div class="rank-bar">' + bar(m.rank_progress_pct) + '</div></section>' : '';
    const mapCard = map?.image ? '<figure class="map-card">' + art(map.image, map.name || 'Map', 320) + '<figcaption><b>' + esc(map.name || 'Map') + '</b><span class="lab">This mode’s map</span></figcaption></figure>' : '';
    const spriteRows = sprites.map((e) => { const fam = this.spriteEventFamily(e); return '<div class="found' + this.masteryClass(e, m) + '">' + art(e.icon, e.name, 72) + '<b>' + esc(e.name) + '</b><span class="pill ' + (e.type === 'sprite_mastered' ? 'gold' : e.type === 'sprite_new' ? 'accent' : '') + '">' + (e.type === "sprite_new" ? "New Sprite!" : e.type === "sprite_mastered" ? "★ Mastered" : (number(e.level) ? "Level " + fmt(e.level) : "Levelled up")) + '</span>' + (fam ? btn("See Sprite", "family", fam.id) : '') + '</div>'; }).join('');
    const questRows = quests.map((e) => '<div class="quest-row">' + ICON.tick + '<span>' + esc(e.names?.join(", ") || fmt(e.count) + (number(e.count) === 1 ? ' quest done' : ' quests done')) + '</span></div>').join('') + (level ? '<div class="quest-row level"><span class="ic">⬆</span><span>Level up! Now level ' + fmt(level.to) + '</span></div>' : '');
    return pager('match-step', this.matchIndex, list.length, (m.who ? m.who + ' · ' : '') + gameLabel(m)) + banner + facts + rank + section('Sprites found', spriteRows ? '<div class="found-grid">' + spriteRows + '</div>' : '') + section('Quests and level', questRows) + mapCard + ((number(m.match_count) || 1) > 1 ? '<p class="notice">' + (number(m.match_count)) + ' games finished close together, so their numbers are added up here.</p>' : '');
  };
  p.spriteEventFamily = function(event) {
    return (this.attrs(this.player, 'sprites').families || []).find(family => family.id === event.family_id || family.name === event.name || (family.variants || []).some(kind => kind.icon === event.icon || kind.icon_large === event.icon || ((kind.label === 'Base' ? '' : kind.label + ' ') + family.name.replace(' Sprite', '')) === event.name));
  };
  p.masteryClass = function(event, match) {
    if (event.type !== 'sprite_mastered') return '';
    this.masteryShown ??= new Set();
    const key = this.player + ':' + match.timestamp + ':' + event.name;
    const first = !this.masteryShown.has(key);
    this.masteryShown.add(key);
    return ' mastered-gain' + (first ? ' just-mastered' : '');
  };
  p.pass = function() {
    const n = this.native, st = n?._pass, message = this.status(st, "Loading Battle Pass…", "The Battle Pass will show here soon.");
    if (message) return message;
    const bp = n._withOwnedOutfits(st.data), sets = n._passSets(bp);
    if (!sets.length) return empty("The Battle Pass will show here soon.");
    this.passSet = Math.min(this.passSet || 0, sets.length - 1);
    const set = sets[this.passSet], per = this.clientWidth && this.clientWidth < 1e3 ? 6 : 10, pages = set.pages.flatMap((pg) => chunks(pg.rewards, per).map((rw, i) => ({ ...pg, rewards: rw, label: pg.label + (i ? " · " + (i + 1) : "") })));
    return '<section class="summary">' + ' <div class="stat"><span class="lab">'+esc(this.currentSeason()?.name || ('Season ' + bp.season))+' Battle Pass</span><div class="num">'+fmt(bp.unlocked)+' unlocked</div>'+bar(bp.known ? bp.unlocked / bp.known * 100 : 0)+'</div>' + this.tile("Still locked", bp.known === void 0 ? "–" : fmt(bp.known - bp.unlocked)) + this.tile("Rewards", fmt(bp.reward_count)) + this.tile("Pages", fmt(bp.pages?.length)) + this.tile("V-Bucks", fmt(sets.reduce((sum, s) => sum + s.vbucks, 0))) + this.tile("Level", fmt(this.entity(this.player, "level")?.state)) + this.tile("Days left", fmt(this.daysLeft())) + "</section>" + '<div class="set-rail">' + this.rail("sets", "Character sets", sets.map((s, i) => btn(sharpArt(setHero(s), s.hero, s.title, 96) + esc(s.title) + (s.complete ? " ✓" : ""), "pass-set", i, i === this.passSet))) + '</div><div class="two-col pass-layout"><section class="card">' + sharpArt(setHero(set), set.hero, set.title, 300, true) + '<p class="lab">Set ' + (this.passSet + 1) + " of " + sets.length + "</p><h2>" + esc(set.title) + '</h2><p class="notice">' + esc(n._costText(set.baseCost)) + " · Bonus: " + esc(n._costText(set.bonusCost)) + " · Ⓥ " + fmt(set.vbucks) + "</p>" + bar(set.known ? set.unlocked / set.known * 100 : 0) + '<p class="notice">' + fmt(set.unlocked) + " unlocked · " + fmt(set.known - set.unlocked) + ' still locked</p><p class="lab">' + esc(set.types.map(([t, c]) => c + " " + t).join(" · ")) + '</p><div class="controls">' + btn("‹", "pass-set", (this.passSet - 1 + sets.length) % sets.length) + btn("›", "pass-set", (this.passSet + 1) % sets.length) + '</div></section><section class="col">' + this.flowRail("rewards", "Rewards", set.pages.flatMap((pg) => (pg.rewards || []).map((r) => ({ group: (pg.done ? "✓ " : "") + pg.label, html: '<section class="reward">' + sharpArt(r, r.icon, r.name, 240) + "<b>" + esc(rewardName(r)) + '</b><span class="lab">' + esc(rewardType(r)) + " · " + (r.price_row === "Included" || r.cost === 0 ? "Included" : r.cost !== void 0 ? fmt(r.cost) + " " + esc(({AthenaBattleStar:"Battle Stars",AthenaCategoryStar:"Character Stars",MtxCurrency:"V-Bucks"})[r.currency] || r.currency || "stars") : "") + " · " + (r.owned === true ? "✓ Unlocked" : r.owned === false ? "Locked" : "Ownership unknown") + "</span></section>" })))) + "</section></div>";
  };
  p.itemTile = function(item, { offer = false, locker = false, inShop = false } = {}) {
    const first = offer ? item.items?.[0] || {} : item, id = offer ? 'offer:' + (this.items?.size || 0) + ':' + cosmeticKey(first) : cosmeticKey(first), name = offer ? item.title : first.name, icon = offer ? item.image : first.icon || first.small, owned = offer ? item.owned : first.owned, wish = this.wished(first);
    this.items ??= /* @__PURE__ */ new Map();
    this.items.set(String(id), { item, first, offer, locker, inShop });
    return '<section class="reward"><button class="item-open" data-item="' + esc(id) + '">' + (offer ? art(icon, name, 240) : sharpArt(first, icon, name, 240)) + "<b>" + esc(name) + '</b><span class="lab">' + (inShop ? "In shop! · " : owned ? "✓ Owned · " : "") + (locker ? (String(first.id).toLowerCase() === String(this.attrs(this.player, "profile").outfits?.avatar?.id || "").toLowerCase() ? "Avatar · " : "") + (first.favorite ? "★ Favourite · " : "") + (first.first_seen && Date.now() - Date.parse(first.first_seen) < 14 * 864e5 ? "New · " : "") + esc(this.native?._outfitRarity?.(first) || first.rarity || "") : offer ? item.price === void 0 ? "Price varies" : "Ⓥ " + fmt(item.price) : esc(first.type || "")) + (offer && this.shopHistory(first) ? ' · ' + esc(this.shopHistory(first)) : '') + '</span></button><button class="heart" data-wish="' + esc(id) + '" aria-label="' + esc((wish ? "Remove " : "Add ") + name + (wish ? " from" : " to") + " wishlist") + '" aria-pressed="' + !!wish + '">' + (wish ? "♥" : "♡") + "</button></section>";
  };
  p.shopHistory = function(item) {
    const current = this.native?._shop?.data?.shop?.current;
    if (item.brand_new) return 'Brand new';
    if (number(item.back_after_days) > 1) return 'Back after ' + fmt(item.back_after_days) + ' days';
    if (item.intro?.chapter && current?.chapter === item.intro.chapter && current?.season === item.intro.season) return 'New this season';
    return item.intro?.chapter ? 'Released Ch' + item.intro.chapter + ' S' + item.intro.season : '';
  };
  p.wished = function(item) {
    const wishlist = this.native?._shop?.data?.wishlist;
    return Array.isArray(wishlist) ? wishlist.some(saved => cosmeticKey(saved) === cosmeticKey(item)) : !!item?.wishlisted;
  };
  p.locker = function() {
    const st = this.native?._outfits, message = this.status(st, "Loading locker…", "Your outfits will show up here soon.");
    if (message) return message;
    const all = st.data?.outfits || [], query = (this.lockerQuery || "").toLowerCase(), view = this.lockerFilter || "all", profile = this.attrs(this.player, "profile"), avatar = Object.hasOwn(st.data || {}, "avatar_id") ? all.find(o => cosmeticKey(o) === String(st.data.avatar_id || '').toLowerCase()) : profile.outfits?.avatar, list = all.filter((o) => o.name && (!query || (o.name + " " + o.set).toLowerCase().includes(query)) && (view !== "favorites" || o.favorite) && (view !== "new" || o.first_seen && Date.now() - Date.parse(o.first_seen) < 14 * 864e5) && (!this.lockerRarity || (this.native?._outfitRarity?.(o) || o.rarity) === this.lockerRarity)).sort((a, b) => this.lockerSort === "name" ? a.name.localeCompare(b.name) : rarityOrder(this.native?._outfitRarity?.(a) || a.rarity) - rarityOrder(this.native?._outfitRarity?.(b) || b.rarity) || a.name.localeCompare(b.name)), per = this.clientWidth && this.clientWidth < 1e3 ? 6 : 10;
    return '<div class="two-col"><section class="card">' + sharpArt(avatar, avatar?.icon, avatar?.name, 300, true) + '<div class="lab">Avatar' + (this.config.native?.avatar ? " · this card uses its own skin setting" : "") + "</div><h2>" + esc(avatar?.name || "No avatar yet") + "</h2>" + (avatar ? '<span class="pill rarity-pill" style="--rc:' + (RARITY_COLOURS[this.native?._outfitRarity?.(avatar) || avatar.rarity] || '#9aa3b2') + '">' + esc(this.native?._outfitRarity?.(avatar) || avatar.rarity || '') + '</span>' : '') + '<p class="notice">' + (avatar ? 'Tap an outfit to change it.' : 'Tap an outfit to make it the avatar.') + '</p>' + (avatar && Object.hasOwn(st.data || {}, "avatar_id") ? btn("Remove avatar", "clear-avatar") : '') + '</section><section class="col"><div class="controls"><input type="search" data-input="lockerQuery" value="' + esc(this.lockerQuery || "") + '" placeholder="Search outfits or sets" aria-label="Search outfits or sets">' + this.seg([["rarity", "Rarity"], ["name", "A–Z"]], "locker-sort", this.lockerSort || "rarity") + "</div>" + this.seg([["all", "All"], ["favorites", "Favourites"], ["new", "New"]], "locker-filter", view) + '<div class="rarity-chips" role="group" aria-label="Show one rarity">' + [...new Set(all.map((o) => this.native?._outfitRarity?.(o) || o.rarity).filter(Boolean))].sort((a, b) => rarityOrder(a) - rarityOrder(b)).map((r) => { const on = this.lockerRarity === r; return '<button class="rarity-chip' + (on ? ' on' : '') + '" style="--rc:' + (RARITY_COLOURS[r] || '#9aa3b2') + '" data-locker-rarity="' + (on ? '' : esc(r)) + '" aria-pressed="' + on + '"><i></i>' + esc(r) + '<b>' + all.filter((o) => (this.native?._outfitRarity?.(o) || o.rarity) === r).length + '</b></button>'; }).join('') + '</div>' + (list.length ? this.rail("outfits", "Outfits", chunks(list, per).map((page) => '<div class="reward-grid">' + page.map((o) => this.itemTile(o, { locker: true })).join("") + "</div>"), { pages: true }) : empty(all.length ? "No outfits match “" + (this.lockerQuery || "") + "”." : "Your outfits will show up here soon.")) + "</section></div>";
  };
  p.shop = function() {
    const st = this.native?._shop, message = this.status(st, "Loading the Item Shop…", "The Item Shop will show here soon.");
    if (message) return message;
    const data = st.data || {}, view = this.shopView || "today", shop = data.shop, wishlist = data.wishlist || [], ids = new Set((data.in_shop || []).map((w) => w.id)), per = this.clientWidth && this.clientWidth < 1e3 ? 6 : 10;
    let body;
    if (view === "today") {
      const q = (this.shopQuery || "").toLowerCase(), kind = this.shopKind || "all", sections = (shop?.sections || []).map((s) => ({ ...s, offers: s.offers.filter((o) => (!q || [o.title, ...(o.items || []).map((i) => i.name)].join(" ").toLowerCase().includes(q)) && (kind === "all" || (o.bundle ? "bundle" : o.items?.[0]?.type) === kind)) })).filter((s) => s.offers.length), pages = sections.flatMap((s) => chunks(s.offers, per).map((offers, i) => ({ name: s.name + (i ? " · " + (i + 1) : ""), offers })));
      body = '<div class="controls"><input type="search" data-input="shopQuery" value="' + esc(this.shopQuery || "") + '" placeholder="Search today’s shop" aria-label="Search today’s shop">' + this.seg([["all", "All"], ["outfit", "Outfits"], ["emote", "Emotes"], ["pickaxe", "Pickaxes"], ["bundle", "Bundles"]], "shop-kind", kind) + "</div>" + (pages.length ? this.flowRail("shop-sections", "Shop sections", sections.flatMap((s) => s.offers.map((o) => ({ group: s.name, html: this.itemTile(o, { offer: true }) })))) : empty(!shop ? "The Item Shop will show here soon." : q || kind !== "all" ? "Nothing in today’s shop matches." : "The Item Shop is empty right now."));
    } else if (view === "wishlist") body = wishlist.length ? this.rail("wishlist-now", "In the shop now", wishlist.filter((w) => ids.has(w.id)).map((w) => this.itemTile(w, { inShop: true }))) + this.rail("wishlist-wait", "Waiting · we will tell you", wishlist.filter((w) => !ids.has(w.id)).map((w) => this.itemTile(w))) : empty("Tap ♡ on any skin to get told when it is in the shop.");
    else body = '<div class="controls"><input type="search" data-input="searchQuery" value="' + esc(this.searchQuery || "") + '" placeholder="Type a name, e.g. Peely" aria-label="Find any skin or item">' + this.seg([["outfit", "Outfits"], ["all", "Everything"]], "search-type", this.searchType || "outfit") + btn("Search", "search") + "</div>" + (this.native?._searchLoading ? empty("Searching…") : this.native?._searchResults === null ? empty("Find any skin or item") : this.native?._searchResults?.length ? this.rail("find-results", "Find results", chunks(this.native._searchResults, per).map((page) => '<div class="reward-grid">' + page.map((o) => this.itemTile(o)).join("") + "</div>"), { pages: true }) : empty("No matches."));
    return (ids.size ? '<p class="hint">♥ ' + ids.size + " wishlist items are in the shop today!</p>" : "") + this.seg([["today", "Today"], ["wishlist", "Wishlist"], ["find", "Find"]], "shop-view", view) + body;
  };
  p.itemSheet = function() {
    const entry = this.itemInfo(this.itemId);
    if (!entry) return empty("Item unavailable");
    const { item, first, offer, locker } = entry;
    return '<div class="sheet-grid"><div class="stage">' + (offer ? art(item.image, item.title, 300) : sharpArt(first, first.icon || first.small, first.name, 300, true)) + "<h2>" + esc(offer ? item.title : first.name) + '</h2><span class="pill">' + esc(first.rarity || first.type || "") + "</span></div><div>" + (offer ? '<div class="num">' + (item.price !== void 0 ? "Ⓥ " + fmt(item.price) : "Price varies") + '</div><p class="notice">' + esc(this.shopHistory(first)) + '</p><p class="notice">' + (this.native?._bundleSeparately?.(item, this.native._shop.data?.shop) ? "Buying singly: Ⓥ " + fmt(this.native._bundleSeparately(item, this.native._shop.data.shop)) + (number(item.price) !== null ? " · Save Ⓥ " + fmt(Math.max(0, this.native._bundleSeparately(item, this.native._shop.data.shop) - item.price)) : "") : "") + "</p>" : "") + "<p>" + esc(first.description || "") + "</p>" + (locker ? '<div class="controls">' + btn("Use as avatar", "avatar", first.id) + btn(first.favorite ? "☆ Unfavourite" : "★ Favourite", "favorite", cosmeticKey(first)) + "</div>" : "") + btn(this.wished(first) ? "♥ Remove from wishlist" : "♡ Wishlist · tell me when it is in the shop", "wish", this.itemId) + "</div></div>";
  };
  p.itemInfo = function(id) {
    const entry = this.items?.get(id);
    if (!entry?.locker) return entry;
    const first = this.native?._outfits?.data?.outfits?.find(outfit => cosmeticKey(outfit) === cosmeticKey(entry.first)) || entry.first;
    return {...entry, first, item:first};
  };
  p.eventState = function(w) {
    const now = Date.now();
    return Date.parse(w.begin) > now ? "upcoming" : Date.parse(w.end) > now ? "live" : "finished";
  };
  p.entryVerdict = function(e) {
    const profile = this.attrs(this.player, "profile"), level = number(this.attrs(this.player, "level").account_level ?? profile.account_level), platform = profile.platform, region = this.config.native?.events_region || this.native?._events?.defaultRegion, minimum = number(e.min_account_level);
    if (e.invite_only) return "Invite only";
    if (minimum !== null && level !== null && level < minimum) return "Needs account level " + minimum;
    if (platform && e.platform_groups?.length && !e.platform_groups.includes(platform)) return e.platform_groups.join(" / ") + " only";
    if (region && region !== "all" && e.region_group && e.region_group !== region) return e.region_group + " region";
    if (level === null || !platform || !region || minimum === null || !e.platform_groups?.length || !e.region_group) return [minimum !== null ? "Minimum account level " + minimum : null, ...e.platform_groups || [], e.region].filter(Boolean).join(" · ") || "Entry rules unavailable";
    return "✓ You can enter";
  };
  p.withPastEvents = function(list) {
    const KEY = 'hh-fortnite-events-v1', now = Date.now();
    if (!this.eventStore) { try { this.eventStore = JSON.parse(env.localStorage?.getItem(KEY) || '{}') || {}; } catch { this.eventStore = {}; } }
    const store = this.eventStore; let changed = false;
    for (const e of list) {
      if (!e?.event_id) continue;
      const prev = store[e.event_id], windows = [...(prev?.windows || []), ...(e.windows || [])].filter((w, i, all) => w?.window_id && all.findIndex((x) => x.window_id === w.window_id) === i).sort((a, b) => Date.parse(a.begin) - Date.parse(b.begin));
      const keep = { event_id: e.event_id, key: e.key, name: e.name, mode: e.mode, team: e.team, region: e.region, region_group: e.region_group, tournament_type: e.tournament_type, platform_groups: e.platform_groups, poster: e.poster, min_account_level: e.min_account_level, invite_only: e.invite_only, description: e.description, windows };
      if (JSON.stringify(prev) !== JSON.stringify(keep)) { store[e.event_id] = keep; changed = true; }
    }
    for (const [id, e] of Object.entries(store)) { const last = Math.max(0, ...(e.windows || []).map((w) => Date.parse(w.end) || 0)); if (now - last > 30 * 864e5) { delete store[id]; changed = true; } }
    if (changed) { const ids = Object.keys(store).sort((a, b) => Math.max(0, ...store[b].windows.map((w) => Date.parse(w.end) || 0)) - Math.max(0, ...store[a].windows.map((w) => Date.parse(w.end) || 0))); for (const id of ids.slice(150)) delete store[id]; try { env.localStorage?.setItem(KEY, JSON.stringify(store)); } catch {} }
    const current = new Set(list.map((e) => e.event_id));
    return list.map((e) => store[e.event_id] ? { ...e, windows: store[e.event_id].windows } : e).concat(Object.values(store).filter((e) => !current.has(e.event_id)));
  };
  p.upgradeArt = function(root) {
    for (const img of root?.querySelectorAll?.('img[data-lookup]') || []) {
      if (img._hhArt) continue;
      img._hhArt = true;
      const check = () => {
        if (img.naturalWidth >= 600) return;
        lookupArt(img.dataset.lookup, img.dataset.ltype).then(url => {
          if (!url || !img.isConnected || img.src === url) { if (img.naturalWidth && img.naturalWidth < 400) img.classList.add('lowres'); return; }
          const pre = new env.Image();
          pre.onload = () => { if (!img.isConnected) return; img.dataset.fallback = ''; img.classList.remove('broken', 'lowres'); img.src = url; };
          pre.onerror = () => { if (img.naturalWidth && img.naturalWidth < 400) img.classList.add('lowres'); };
          pre.src = url;
        });
      };
      if (img.complete && img.naturalWidth) check(); else img.addEventListener('load', check);
    }
  };
  p.backgroundOnly = function(changed) {
    const uses = { _events: ['events', 'news'], _shop: ['shop', 'news', 'locker', 'pass', 'search'], _maps: ['map'] }, keys = [...(changed?.keys?.() || [])];
    return !this.sheetType && keys.length > 0 && keys.every(k => uses[k] && !uses[k].includes(this.section));
  };
  p.prefetch = function() {
    const n = this.native;
    if (!n || n._hhPrefetched) return;
    n._hhPrefetched = true;
    try { env.localStorage?.removeItem('hh-fortnite-events-v1'); } catch {}
    const later = f => env.requestIdleCallback ? env.requestIdleCallback(f, { timeout: 4000 }) : env.setTimeout(f, 2500);
    later(async () => {
      if (n !== this.native || this.disposed) return;
      try {
        await Promise.allSettled([n._loadEvents?.(), n._loadShop?.(), n._loadMap?.('br')]);
        const warm = url => { if (!url) return; const i = new env.Image(); i.decoding = 'async'; i.src = url; };
        warm(n._maps?.br?.data?.image);
        for (const e of this.eventList().filter(e => (e.windows || []).some(w => this.eventState(w) !== 'finished')).slice(0, 6)) warm((/src="([^"]+)"/.exec(eventArt(e)) || [])[1]?.replace(/&amp;/g, '&'));
      } catch {}
    });
  };
  p.eventList = function() {
    const n = this.native, filters = n?._currentFilters?.();
    return (n?._events?.list || []).filter((e) => !filters || n._matchesFilters(e, filters)).filter((e) => !this.eventLevel || number(e.min_account_level) !== null && e.min_account_level <= this.eventLevel);
  };
  p.podium = function(entries) {
    return entries.length ? '<div class="podium">' + entries.slice(0, 3).map((e) => "<div><b>#" + fmt(e.rank) + "</b><p>" + esc((e.names || []).join(", ")) + '</p><span class="lab">' + fmt(e.points) + " pts</span></div>").join("") + "</div>" : empty("No scores yet.");
  };
  p.events = function() {
    const ev = this.native?._events;
    if (ev?.error) return empty(ev.error);
    if (ev?.loading || !ev || ev.list === void 0) return empty("Loading tournaments…");
    if (ev.list === null) return empty("Tournaments will show here soon.");
    const view = ["coming", "live", "results"].includes(this.eventView) ? this.eventView : "coming", isLive = (e) => (e.windows || []).some((w) => this.eventState(w) === "live"), lastEnd = (e) => Math.max(0, ...(e.windows || []).filter((w) => this.eventState(w) === "finished").map((w) => Date.parse(w.end) || 0)), list = this.eventList().filter((e) => view === "coming" ? (e.windows || []).some((w) => this.eventState(w) === "upcoming") && !isLive(e) : view === "live" ? isLive(e) : !isLive(e) && lastEnd(e) > 0).sort((a, b) => view === "results" ? lastEnd(b) - lastEnd(a) : Date.parse(a.windows.find((w) => this.eventState(w) === (view === "coming" ? "upcoming" : "live"))?.begin || 0) - Date.parse(b.windows.find((w) => this.eventState(w) === (view === "coming" ? "upcoming" : "live"))?.begin || 0));
    this.eventCards = list;
    const filters = this.native?._currentFilters?.() || {};
    return this.seg([["coming", "Coming up"], ["live", "Live"], ["results", "Results"]], "event-view", view) + '<div class="controls">' + btn("Filters", "event-filters") + Object.entries(filters).flatMap(([k, values]) => (values || []).map((v) => btn(esc(v) + " ×", "remove-filter", k + "|" + v))).join("") + btn("Reset filters", "reset-filters") + '<span class="lab sp">UK time</span></div>' + (list.length ? "" : empty(view === "live" ? "Nothing is live right now. Past events are under Results." : view === "results" ? "No results in the last 30 days for these filters." : "No upcoming tournaments for these filters.")) + this.rail("events", "Tournaments", list.map((e, i) => {
      const w = (view === "results" ? e.windows.filter((w2) => this.eventState(w2) === "finished").at(-1) : e.windows.find((w2) => this.eventState(w2) === (view === "coming" ? "upcoming" : "live"))) || e.windows.at(-1), lb = this.native?._leaderboards?.[e.event_id + "|" + w?.window_id];
      if(view!=='coming')return '<section class="card"><button class="event-open" data-event="'+i+'">'+eventArt(e)+'<div class="row"><span class="pill'+(e.windows.some(w=>this.eventState(w)==='live')?' live':'')+'">'+(e.windows.some(w=>this.eventState(w)==='live')?'LIVE':'Results')+'</span><span class="lab sp">'+esc(w?new Date(w.end).toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short',timeZone:'Europe/London'}):'')+'</span></div><h3>'+esc(e.name)+'</h3><p class="lab">'+esc(e.mode)+' · '+esc(e.team)+'</p>'+this.podium(lb?.data?.entries||[])+'</button></section>';
      return '<section class="card"><button class="event-open" data-event="' + i + '">' + eventArt(e) + '<div class="day">' + esc(w ? new Date(w.begin).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "Europe/London" }) : "") + '</div><span class="pill">' + esc(tidyType(e.tournament_type)) + "</span><h3>" + esc(e.name) + '</h3><p class="lab">' + esc([e.mode, e.team, ...e.platform_groups || []].join(" · ")) + '</p><p class="notice">' + esc(w ? new Date(w.begin).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/London" }) : "") + " · " + esc(this.native?._eventTiming?.(e)?.text || "") + '</p><span class="pill entry' + (/^✓/.test(this.entryVerdict(e)) ? ' ok' : '') + '">' + esc(this.entryVerdict(e)) + "</span>" + (view === "live" ? this.podium(lb?.data?.entries || []) : "") + "</button></section>";
    }));
  };
  p.eventSheet = function() {
    const e = this.eventCards?.[this.eventIndex];
    if (!e) return empty("Event unavailable");
    const windows = e.windows || [], view = this.eventSheetView || "leaderboard", w = windows.find((x) => x.window_id === this.eventRound) || windows.find((x) => this.eventState(x) === "live") || windows.find((x) => this.eventState(x) === "finished") || windows[0], lb = this.native?._leaderboards?.[e.event_id + "|" + w?.window_id];
    let body;
    if (view === "sessions") body = windows.map((w2) => '<div class="fact"><b>' + esc(w2.label || "Round") + "</b><span>" + esc(this.eventState(w2)) + " · " + esc(new Date(w2.begin).toLocaleString("en-GB", { timeZone: "Europe/London" })) + "</span></div>").join("");
    else if (view === "about") body = '<p class="pill">' + esc(this.entryVerdict(e)) + '</p><div class="facts">' + [["Minimum account level", e.min_account_level], ["Platforms", e.platform_groups?.join(", ")], ["Region", e.region], ["Team", e.team], ["Type", e.tournament_type]].map(([k, v]) => '<div class="fact"><span>' + k + "</span><b>" + esc(v ?? "Unknown") + "</b></div>").join("") + '</div><p class="notice">' + esc(e.description || "") + "</p><p>" + esc(e.schedule_info || "") + "</p>" + (e.can_spectate ? "<p>Spectate in-game</p>" : "") + (e.tournament_type === "FNCS" ? '<a href="https://www.twitch.tv/fortnite" target="_blank" rel="noopener">Fortnite on Twitch ↗</a>' : "");
    else {
      const entries = lb?.data?.entries || [], you = lb?.data?.player || entries.find((x) => x.is_player);
      body = '<div class="controls"><select data-select="eventRound" aria-label="Round">' + windows.map((x) => '<option value="' + esc(x.window_id) + '"' + (x === w ? " selected" : "") + ">" + esc(x.label || "Round") + " · " + this.eventState(x) + "</option>").join("") + "</select>" + btn("Refresh", "leaderboard") + "</div>" + (lb?.error ? empty(lb.error) : lb?.loading ? empty("Loading leaderboard…") : this.podium(entries)) + (you ? '<section class="hint">Your place · #' + fmt(you.rank) + " · " + esc((you.names || []).join(", ")) + " · " + fmt(you.points) + " pts</section>" : "") + "<div>" + entries.map((en) => '<div class="fact"><b>#' + fmt(en.rank) + " " + (en.is_player ? "You · " : "") + esc((en.names || []).join(", ")) + "</b><span>" + fmt(en.points) + " pts · " + fmt(en.matches) + "m · " + fmt(en.wins) + "W · " + fmt(en.elims) + "E</span></div>").join("") + "</div>";
    }
    return "<h2>" + esc(e.name) + '</h2><p class="notice">' + esc(e.mode) + " · " + esc(e.team) + " · " + esc(this.entryVerdict(e)) + "</p>" + this.seg([["leaderboard", "Leaderboard"], ["sessions", "Sessions"], ["about", "About"]], "event-sheet-view", view) + body;
  };
  p.eventFiltersSheet = function() {
    const all = this.native?._events?.list || [], current = this.native?._currentFilters?.() || {}, groups = [["region", "Region", "region_group"], ["type", "Type", "tournament_type"], ["mode", "Mode", "mode"], ["team", "Team", "team"], ["platform", "Platform", "platform_groups"]];
    return groups.map(([key, label, field]) => "<h3>" + label + '</h3><div class="controls">' + [...new Set(all.flatMap((e) => Array.isArray(e[field]) ? e[field] : e[field] ? [e[field]] : []))].map((v) => btn(esc(v), "toggle-filter", key + "|" + v, current[key]?.includes(v))).join("") + "</div>").join("") + '<label>Minimum account level limit <input type="number" data-input="eventLevel" min="0" value="' + esc(this.eventLevel || "") + '"></label>' + btn("Reset filters", "reset-filters");
  };
  p.news = function() {
    const st = this.native?._news, message = this.status(st, "Loading news…", "No news right now.");
    if (message) return message;
    const data = st.data || {}, sp = this.attrs(this.player, "sprites"), shop = this.native?._shop?.data?.shop, current = shop?.current || {}, newShop = (shop?.sections || []).flatMap(s => s.offers || []).filter(o => o.items?.[0]?.brand_new || (o.items?.[0]?.intro?.chapter === current.chapter && o.items?.[0]?.intro?.season === current.season && current.chapter !== undefined)).length, next = this.eventList().find((e) => e.windows.some((w) => this.eventState(w) !== "finished"));
    this.newsItems = data.news || [];
    return '<div class="two-col"><section class="col">' + (() => { const upd = data.update || {}, days = this.daysLeft(), prog = number(this.attrs(this.player, 'profile').season?.progress_pct), chip = (value, label, section) => '<button class="wn-chip" data-section="' + section + '"><b>' + value + '</b><span>' + label + '</span></button>'; return '<section class="card whatsnew"><div class="wn-band" style="--wn-art:url(' + esc(this.config.artwork?.hero || '') + ')"><span class="wn-kicker">' + esc(upd.chapter ? 'Chapter ' + upd.chapter + ' · Season ' + upd.season : 'What’s new') + '</span><b class="wn-ver">Update ' + esc(upd.patch || sp.version || '') + '</b>' + (upd.name ? '<span class="wn-name">' + esc(upd.name) + '</span>' : '') + '</div><div class="wn-stats">' + chip(fmt(sp.new_sprites), 'new Sprites', 'sprites') + chip(fmt(sp.new_kinds), 'new kinds', 'sprites') + (shop ? chip(fmt(newShop), 'new in the shop', 'shop') : '') + chip('Map', 'see the island', 'map') + '</div>' + (days !== null ? '<div class="wn-season"><div class="row lab"><span>Season ends in <b>' + fmt(days) + ' days</b></span>' + (prog !== null ? '<span class="sp">' + fmt(prog) + '% through</span>' : '') + '</div>' + bar(prog) + '</div>' : '') + '</section>'; })() + (next ? (() => { const w = (next.windows || []).find((x) => this.eventState(x) !== 'finished') || next.windows?.[0], live = w && this.eventState(w) === 'live', verdict = this.entryVerdict(next); return '<section class="card news-event"><button class="event-open" data-section="events">' + eventArt(next) + '<div class="row"><span class="pill' + (live ? ' live' : '') + '">' + (live ? 'LIVE NOW' : 'Next tournament') + '</span><span class="pill q">' + esc(next.tournament_type || '') + '</span></div><div class="day">' + esc(w ? new Date(w.begin).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'Europe/London' }) : '') + '</div><h3>' + esc(next.name) + '</h3><p class="lab">' + esc([next.mode, next.team].filter(Boolean).join(' · ')) + '</p><p class="notice">' + esc(w ? new Date(w.begin).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/London' }) : '') + ' · ' + esc(this.native?._eventTiming?.(next)?.text || '') + '</p><div class="row"><span class="pill' + (/^✓/.test(verdict) ? ' ok' : '') + '">' + esc(verdict) + '</span><span class="lab sp">All events ›</span></div></button></section>'; })() : "") + "</section><section>" + (this.newsItems.length ? this.rail("news", "In-game news", this.newsItems.map((n, i) => '<section class="card"><button class="news-open" data-news="' + i + '">' + art(n.image || n.tile, n.title, 300) + '<span class="pill">' + esc(n.tag || "") + "</span><h3>" + esc(n.title) + '</h3><p class="notice">' + esc(n.body || "") + "</p></button></section>")) : empty("No news right now.")) + "</section></div>";
  };
  p.chart = function(rows, invert = false) {
    const vals = rows.map((r) => number(r.v ?? r.mean ?? r.state)).filter((v) => v !== null);
    if (vals.length < 2) return empty(this.trendPeriod === 'season' ? "No recorded history in this season." : "Play a few more days to see this chart.");
    const lo = Math.min(...vals), hi = Math.max(...vals), spanV = hi - lo || 1, pts = vals.map((v, i) => [10 + i / (vals.length - 1) * 580, 140 - (v - lo) / spanV * 124]), clampY = (y) => Math.max(8, Math.min(146, y)), f = (n) => n.toFixed(1);
    let d = 'M' + f(pts[0][0]) + ',' + f(pts[0][1]);
    for (let i = 0; i < pts.length - 1; i++) { const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2; d += 'C' + f(p1[0] + (p2[0] - p0[0]) / 6) + ',' + f(clampY(p1[1] + (p2[1] - p0[1]) / 6)) + ' ' + f(p2[0] - (p3[0] - p1[0]) / 6) + ',' + f(clampY(p2[1] - (p3[1] - p1[1]) / 6)) + ' ' + f(p2[0]) + ',' + f(p2[1]); }
    const uid = 'hhc' + (this.chartSeq = (this.chartSeq || 0) + 1), good = 'var(--acc)', bad = '#fb7185', top = invert ? bad : good, bottom = invert ? good : bad, last = pts.at(-1), rising = vals.at(-1) >= vals[0], endGood = invert ? !rising : rising;
    return '<svg class="chart line-chart" viewBox="0 0 600 150" role="img" aria-label="History chart, ' + (rising ? 'up' : 'down') + ' from ' + fmt(vals[0], 2) + ' to ' + fmt(vals.at(-1), 2) + '"><defs><linearGradient id="' + uid + 's" gradientUnits="userSpaceOnUse" x1="0" y1="16" x2="0" y2="140"><stop offset="0" style="stop-color:' + top + '"/><stop offset="1" style="stop-color:' + bottom + '"/></linearGradient><linearGradient id="' + uid + 'a" gradientUnits="userSpaceOnUse" x1="0" y1="16" x2="0" y2="150"><stop offset="0" style="stop-color:' + top + ';stop-opacity:.3"/><stop offset="1" style="stop-color:' + top + ';stop-opacity:0"/></linearGradient></defs><path d="' + d + 'L' + f(last[0]) + ',150L' + f(pts[0][0]) + ',150Z" fill="url(#' + uid + 'a)"/><path d="' + d + '" fill="none" stroke="url(#' + uid + 's)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="' + f(last[0]) + '" cy="' + f(last[1]) + '" r="6" style="fill:' + (endGood ? good : bad) + ';stroke:var(--s1);stroke-width:3"/></svg>';
  };
  p.trends = function() {
    const n = this.native, st = this.trendData || n?._trends || {}, metrics = [["season_kd", "Season K/D"], ["season_win_rate", "Season win rate"], ["ladder_battle_royale", "BR ranked ladder"], ["ladder_reload", "Reload ranked ladder"], ["unreal_battle_royale", "BR Unreal position"], ["unreal_reload", "Reload Unreal position"], ["sprites", "Sprite collection %"], ["level", "Season level"], ["power_ranking", "Power Ranking position"]], cards = metrics.map(([key, label]) => {
      const sensor = this.entity(this.player, key), rows = st.stats?.[sensor?.entity_id] || [];
      return { key, label, rows, sensor };
    }).filter((c) => c.sensor), focus = cards.find((c) => c.key === this.trendFocus);
    let wide = focus ? '<section class="card wide-chart"><div class="sec">'+focus.label+'</div>'+this.chart(focus.rows, /unreal|power/.test(focus.key))+'</section>' : '<section class="card wide-chart"><div class="sec">Kills per tracked game (last 30) · ★ = Victory Royale</div>'+this.killsChart()+'</section>';
    return '<div class="controls">' + this.seg([["7", "7 days"], ["30", "30 days"], ["90", "90 days"], ["season", "Season"]], "trend-period", this.trendPeriod || "30") + (this.trendPeriod === "season" ? '<select data-select="trendSeason" aria-label="Season">' + this.seasons().map((s, i) => '<option value="' + i + '"' + (String(i) === String(this.trendSeason || 0) ? " selected" : "") + ">" + esc(s.name || "Season " + s.number) + "</option>").join("") + "</select>" + (this.seasons()[Number(this.trendSeason || 0)]?.precision === "day" ? '<span class="lab">Published calendar dates · recorded history only</span>' : "") : "") + "</div>" + (st.error ? empty(st.error) : st.loading ? empty("Loading history…") : wide + this.rail("metrics", "Trends", (focus ? ['<section class="card"><button class="metric-card" data-trend-focus=""><b>Kills per tracked game</b>'+this.killsChart()+'</button></section>'] : []).concat(cards.map((c) => '<section class="card"><button class="metric-card" data-trend-focus="' + c.key + '"><b>' + c.label + '</b><div class="num">' + fmt(this.trendPeriod === "season" ? c.rows.at(-1)?.mean ?? c.rows.at(-1)?.state : valid(c.sensor) ? c.sensor.state : null, 2) + "</div>" + this.chart(c.rows, /unreal|power/.test(c.key)) + '<p class="lab">' + (c.rows.length>1 ? deltaMark(Number(c.rows.at(-1).mean??c.rows.at(-1).state)-Number(c.rows[0].mean??c.rows[0].state), /unreal|power/.test(c.key))+fmt(Number(c.rows.at(-1).mean??c.rows.at(-1).state)-Number(c.rows[0].mean??c.rows[0].state),2)+' over '+Math.max(1,Math.round((Number(c.rows.at(-1).start)-Number(c.rows[0].start))/86400000))+' days · ' : '') + (/unreal|power/.test(c.key) ? "Lower is better" : "") + "</p></button></section>"))));
  };
  p.seasons = function() {
    const catalog = this.native?._catalog;
    return catalog?.seasons?.length ? catalog.seasons : (catalog?.season ? [catalog.season] : this.attrs(this.player, "profile").season ? [this.attrs(this.player, "profile").season] : []);
  };
  p.currentSeason = function() {
    const number = this.attrs(this.player, 'profile').season?.number || this.native?._catalog?.season?.number || this.native?._pass?.data?.season;
    return this.seasons().find(season => season.number === number);
  };
  p.daysLeft = function(now = Date.now()) {
    const season = this.currentSeason();
    if (!season?.end) return number(this.attrs(this.player, 'profile').season?.days_left);
    if (season.precision === 'day') return Math.max(0, Math.round((Date.parse(season.end.slice(0,10)) - 86400000 - Date.parse(new Date(now).toISOString().slice(0,10))) / 86400000));
    return Math.max(0, Math.ceil((Date.parse(season.end) - now) / 86400000));
  };
  p.killsChart=function(){
    const matches=(this.native?._matchLists?.['trend:recent']?.matches||[]).slice().reverse();
    if(!matches.length)return empty('Play a few more days to see this chart.');
    const ks=matches.map(m=>number(m.kills)||0),max=Math.max(1,...ks),avg=ks.reduce((a,b)=>a+b,0)/ks.length,n=matches.length,W=600,base=176,top=30,slot=(W-20)/n,bw=Math.max(4,Math.min(40,slot-6)),uid='hhk'+(this.chartSeq=(this.chartSeq||0)+1),y=v=>base-v/max*(base-top);
    let s='<svg class="chart kills-chart" viewBox="0 0 '+W+' 200" role="img" aria-label="Kills per tracked game, best '+fmt(max)+', average '+fmt(avg,1)+'"><defs><linearGradient id="'+uid+'b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--acc)"/><stop offset="1" style="stop-color:var(--acc);stop-opacity:.35"/></linearGradient><linearGradient id="'+uid+'g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:#ffd76a"/><stop offset="1" style="stop-color:#f59e0b;stop-opacity:.6"/></linearGradient></defs><line class="axis" x1="10" x2="'+(W-10)+'" y1="'+base+'" y2="'+base+'"/>';
    matches.forEach((m,i)=>{const k=ks[i],x=10+i*slot+(slot-bw)/2,h=Math.max(4,base-y(k)),label=n<=16||k===max||m.is_victory;s+='<rect x="'+x.toFixed(1)+'" y="'+(base-h).toFixed(1)+'" width="'+bw.toFixed(1)+'" height="'+h.toFixed(1)+'" rx="'+Math.min(8,bw/2).toFixed(1)+'" fill="url(#'+uid+(m.is_victory?'g':'b')+')"/>'+(label?'<text x="'+(x+bw/2).toFixed(1)+'" y="'+(base-h-8).toFixed(1)+'" text-anchor="middle" class="'+(m.is_victory?'win':'')+'">'+(m.is_victory?'★ ':'')+fmt(k)+'</text>':'');});
    return s+'<line class="avg" x1="10" x2="'+(W-10)+'" y1="'+y(avg).toFixed(1)+'" y2="'+y(avg).toFixed(1)+'"/><text class="avg-l" x="'+(W-12)+'" y="'+(y(avg)-7).toFixed(1)+'" text-anchor="end">avg '+fmt(avg,1)+'</text></svg>';
  };
  p.loadTrendRange = async function() {
    const period = this.trendPeriod || "30", season = this.seasons()[Number(this.trendSeason || 0)], start = period === "season" ? season?.begin || season?.start_date || season?.start : Date.now() - Number(period) * 864e5, end = period === "season" ? season?.end_date || season?.end : Date.now();
    if (!start || !end) {
      this.trendData = { stats: {} };
      this.render();
      return;
    }
    const ids = ["season_kd", "season_win_rate", "ladder_battle_royale", "ladder_reload", "unreal_battle_royale", "unreal_reload", "sprites", "level", "power_ranking"].map((k) => this.entity(this.player, k)?.entity_id).filter(Boolean), request = this.trendRequest = (this.trendRequest || 0) + 1;
    this.trendData = { loading: true };
    this.render();
    try {
      const stats = await this._hass.callWS({ type: "recorder/statistics_during_period", start_time: new Date(start).toISOString(), end_time: new Date(Math.min(new Date(end).getTime(), Date.now())).toISOString(), statistic_ids: ids, period: period === "7" ? "hour" : "day", types: ["mean", "min", "max", "state"] });
      if (request === this.trendRequest) this.trendData = { stats };
    } catch (e) {
      if (request === this.trendRequest) this.trendData = { error: e.message || "Statistics unavailable" };
    }
    this.render();
  };
  p.render = function() {
    if (!this.config || !this._hass) return;
    if(env.document?.hidden)return;
    if (this.viewRenderer !== 'redesign') { this.renderStamp = ''; this.renderCaches = null; }
    this.viewRenderer = 'redesign';
    if (this.shadowRoot.querySelector("dialog[open]")) {
      this.pendingRender = true;
      if (this.sheetType) this.updateSheet();
      return;
    }
    const sections = this.sections();
    const stamp=JSON.stringify([this.player,this.section,this.filter,this.spriteView,this.spriteSort,this.statWindow,this.statMode,this.passSet,this.lockerQuery,this.lockerSort,this.lockerFilter,this.lockerRarity,this.gamesShown,this.shopView,this.shopQuery,this.shopKind,this.searchQuery,this.searchType,this.eventView,this.eventLevel,this.trendPeriod,this.trendSeason,this.trendFocus,this.clientWidth,this.section==='events'?this.native?._currentFilters?.():null,this.section==='events'?(this.native?._events?.list||[]).map(e=>(e.windows||[]).map(w=>this.eventState(w)[0]).join('')).join('|'):'',this.dataSig()]);
    const caches=[this.native,this.native?._pass,this.native?._outfits,this.native?._shop,this.native?._events,this.native?._trends,this.native?._matchLists,this.native?._catalog,this.native?._leaderboards,this.native?._news,this.native?._avatar,this.native?._searchResults,this.native?._searchLoading,this.native?._loadingAction,this.trendData];
    if(stamp===this.renderStamp&&this.renderCaches?.every((v,i)=>v===caches[i]))return;
    this.renderStamp=stamp;this.renderCaches=caches;
    this.matchSequence = [];
    this.items = new Map();
    if (!sections.includes(this.section) && this.player !== "together") this.section = sections[0] || "stats";
    const native = this.native, isTogether = this.player === "together", active = this.shadowRoot.activeElement, key = active?.dataset?.input, selection = active?.selectionStart;
    const navKey = this.player + '|' + this.section, sameView = this.lastNavKey === navKey, oldView = this.shadowRoot.querySelector('main.view'), viewTop = oldView?.scrollTop || 0, scrolled = [];
    if (sameView) {
      for (let n = this.parentNode; n; n = n.nodeType === 11 ? n.host : n.parentNode) if (n.nodeType === 1 && n.scrollTop > 0) scrolled.push([n, n.scrollTop]);
      if (this.offsetHeight) this.style.minHeight = this.offsetHeight + 'px';
    }
    const winY = env.scrollY;
    this.shadowRoot.innerHTML = "<style>" + skin + '</style><header class="row heading"><h2>' + ICON.pad + 'Fortnite Family <span>' + esc(isTogether ? "Together" : this.pname(this.player)) + '</span></h2><div class="players sp">' + this.pbuttons().map((id) => btn(esc(id === "together" ? "Together" : this.pname(id)), "player", id, id === this.player)).join("") + "</div></header>" + (isTogether ? this.together() : this.hero() + '<nav class="tabs" aria-label="Fortnite sections">' + sections.map((id) => btn(tabs.find((t) => t[0] === id)[1], "section", id, id === this.section)).join("") + '</nav><main class="view' + (["stats", "session"].includes(this.section) ? " tall" : "") + '">' + (this.section === "map" ? this.map() : this[this.section]?.() || empty("Fortnite section unavailable")) + "</main>") + '<div class="native-loader"></div><dialog aria-label="Fortnite details"><div class="sheet-head"><b class="sheet-title"></b><button class="round close-x" data-close="" aria-label="Close">' + CROSS + '</button></div><div class="sheet-body" tabindex="-1"></div></dialog><div class="toast" role="status" hidden></div>';
    this.upgradeArt(this.shadowRoot);
    const host = this.shadowRoot.querySelector(this.section === "map" ? ".native-map" : ".native-loader");
    if (native && host) { host.append(native); env.clearInterval?.(native._tick); }
    const strip = this.shadowRoot.querySelector('.tabs'), currentTab = strip?.querySelector('.on');
    if (strip && currentTab) strip.scrollLeft = Math.max(0, currentTab.offsetLeft - strip.offsetLeft - (strip.clientWidth - currentTab.clientWidth) / 2);
    this.bindRails();
    const newView = this.shadowRoot.querySelector('main.view');
    if (sameView) {
      newView?.classList.add('settled');
      if (newView) newView.scrollTop = viewTop;
      for (const [n, top] of scrolled) if (n.scrollTop !== top) n.scrollTop = top;
      if (env.scrollY !== winY) env.scrollTo(env.scrollX, winY);
      env.clearTimeout(this.heightTimer);
      this.heightTimer = env.setTimeout(() => { this.style.minHeight = ''; }, 900);
    }
    this.lastNavKey = navKey;
    this.animateProgress(this.shadowRoot, this.player + ":" + this.section);
    if (key) {
      const input = [...this.shadowRoot.querySelectorAll("[data-input]")].find((i) => i.dataset.input === key);
      input?.focus({ preventScroll: true });
      if (input?.type === "search") input.setSelectionRange(selection, selection);
    }
    if (this.isConnected && !isTogether) this.mountNative();
    if(this.section==='events')this.ensureEventPodiums();
  };
  p.mountNative = async function(details = false) {
    if (details) return oldMount.call(this, true);
    if (this.player === "together" || this.mounting) return;
    this.mounting = true;
    const player = this.player;
    try {
      if (!this.native) {
        const helpers = await env.loadCardHelpers();
        if (player !== this.player || !this.isConnected) return;
        const native = helpers.createCardElement({ type: 'custom:fortnite-activity-card', ...this.config.native, player, header: "none", sections: [this.section], default_section: this.section });
        this.native = native;
        this.catalogNative = native;
        native._householdSection = this.section;
        const updated = native.updated;
        if (updated) native.updated = function(changed) {
          updated.call(this, changed);
          if (this === owner.native && !owner.disposed) {
            if (owner.backgroundOnly(changed)) return;
            if (owner.sheetType) owner.updateSheet();
            else if (owner.section === "map") owner.decorateMap();
            else queueMicrotask(() => owner.render());
          }
        };
        const owner = this;
        native.hass = this._hass;
        native._setView?.(this.section);
        this.shadowRoot.querySelector(this.section === "map" ? ".native-map" : ".native-loader")?.append(native);
        env.clearInterval?.(native._tick);
        await native.updateComplete;
        this.render();
        this.prefetch();
      } else if (this.native._householdSection !== this.section || this.native._view !== this.section) {
        const filters=this.native._filters;
        this.native.setConfig({ type: 'custom:fortnite-activity-card', ...this.config.native, player, header: "none", sections: [this.section], default_section: this.section });
        this.native._filters=filters;
        this.native._householdSection = this.section;
        this.native._setView(this.section);
      }
      if (this.section === "map") this.decorateMap();
    } catch (e) {
      const host = this.shadowRoot.querySelector(".native-map");
      if (host && !this.native) host.textContent = "Fortnite section unavailable";
    } finally {
      this.mounting = false;
      if (player !== this.player && this.isConnected && this.player !== 'together') this.mountNative();
    }
  };
  p.openSheet = function(type, title, opener) {
    const dialog = this.shadowRoot.querySelector("dialog");
    this.sheetType = type;
    this.lastArtKey = null;
    this.lastSheetHtml = null;
    this.lastSheetKey = null;
    this.opener = opener;
    dialog.querySelector(".sheet-title").textContent = title;
    this.updateSheet();
    dialog.showModal();
    dialog.querySelector('.sheet-body')?.focus({ preventScroll: true });
    const artRail = dialog.querySelector('.sprite-art-rail');
    if (artRail) artRail.scrollLeft = Math.max(0, this.spriteFamilies().findIndex(f => f.id === this.selected)) * artRail.clientWidth;
    dialog.onclick = (e) => {
      if (e.target === dialog) this.closeSheet();
    };
    dialog.oncancel = e => { e.preventDefault(); this.closeSheet(); };
    dialog.onkeydown = (e) => {
      if (type === "sprite" && ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
        e.preventDefault();
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") this.stepSprite(e.key === "ArrowLeft" ? -1 : 1);
        else {
          const kinds = (this.attrs(this.player, "sprites").families || []).find((f) => f.id === this.selected)?.variants || [], i = kinds.findIndex((v) => v.id === this.kind);
          this.kind = kinds[(i + (e.key === "ArrowUp" ? -1 : 1) + kinds.length) % kinds.length]?.id;
          this.updateSheet();
        }
      }
    };
    dialog.onclose = () => {
      this.sheetType = null;
      const data = { ...this.opener?.dataset };
      this.render();
      [...this.shadowRoot.querySelectorAll("button")].find((b) => JSON.stringify({ ...b.dataset }) === JSON.stringify(data))?.focus({ preventScroll: true });
    };
  };
  p.updateSheet = function() {
    const body = this.shadowRoot.querySelector(".sheet-body");
    if (!body) return;
    const focused = body.contains(this.shadowRoot.activeElement) ? { ...this.shadowRoot.activeElement.dataset } : null;
    const nextHtml = this.sheetType === "sprite" ? this.spriteSheet() : this.sheetType === "match" ? this.matchSheet() : this.sheetType === "item" ? this.itemSheet() : this.sheetType === "event" ? this.eventSheet() : this.sheetType === "stats" ? this.statsSheet() : this.sheetType === "filters" ? this.eventFiltersSheet() : this.sheetType === "seasons" ? this.seasonsSheet() : this.sheetType === "news" ? "<div>" + art(this.newsItems[this.newsIndex]?.image || this.newsItems[this.newsIndex]?.tile, "", 300) + "<h2>" + esc(this.newsItems[this.newsIndex]?.title) + "</h2><p>" + esc(this.newsItems[this.newsIndex]?.body) + "</p></div>" : "";
    if (nextHtml === this.lastSheetHtml && body.firstChild) return;
    const sameSheet = this.lastSheetKey === this.sheetType, scroller = body.closest("dialog"), keepTop = sameSheet ? scroller?.scrollTop || 0 : 0, keepBody = sameSheet ? body.scrollTop : 0;
    this.lastSheetHtml = nextHtml; this.lastSheetKey = this.sheetType;
    body.innerHTML = nextHtml;
    if (this.sheetType === 'match') this.celebrated = true;
    this.bindRails();
    this.upgradeArt(body);
    if(this.sheetType==='sprite'){
      const stage=body.querySelector('.stage'),original=stage.querySelector('.art-button'),families=this.spriteFamilies(),current=families.findIndex(f=>f.id===this.selected),rail=env.document.createElement('div');rail.className='sprite-art-rail';rail.style.cssText='display:flex;overflow-x:auto;scroll-snap-type:x mandatory;width:100%;scrollbar-width:none';
      this.artPages??=new Map();for(const family of families){let page=family.id===this.selected?null:this.artPages.get(family.id);if(!page){page=env.document.createElement('div');page.style.cssText='flex:0 0 100%;scroll-snap-align:start;display:flex;justify-content:center';if(family.id===this.selected)page.append(original);else{page.innerHTML='<button class="art-button" data-family="'+esc(family.id)+'">'+art(family.icon_large||family.icon,family.name,230)+'</button>';this.artPages.set(family.id,page);}}rail.append(page);}
      stage.prepend(rail);rail.scrollLeft=Math.max(0,current)*rail.clientWidth;
      let settle;const land=()=>{const index=Math.round(rail.scrollLeft/rail.clientWidth);if(index!==current&&families[index]){this.selected=families[index].id;this.kind=null;this.zoom=false;this.spriteDirection=0;this.updateSheet();}};rail.addEventListener('scroll',()=>{env.clearTimeout(settle);settle=env.setTimeout(land,160);},{passive:true});
    }
    if (focused) [...body.querySelectorAll('button,input,select')].find(element => JSON.stringify({...element.dataset}) === JSON.stringify(focused))?.focus({preventScroll:true});
    const artKey = this.sheetType === 'sprite' ? this.selected + '|' + this.kind : null;
    if (artKey && artKey !== this.lastArtKey && !env.matchMedia?.('(prefers-reduced-motion: reduce)').matches) body.querySelector('.art-button img')?.animate?.([{opacity:0,transform:'translateX('+(this.spriteDirection || 0)*24+'px)'},{opacity:1,transform:'translateX(0)'}],{duration:this.spriteDirection ? 180 : 160,easing:'cubic-bezier(.2,.7,.2,1)'});
    this.animateProgress(body, this.player + ":sheet:" + this.sheetType + ":" + (artKey || ""));
    if (sameSheet) { if (scroller) scroller.scrollTop = keepTop; body.scrollTop = keepBody; }
    if (this.sheetType === "match" && !env.matchMedia?.("(prefers-reduced-motion: reduce)").matches) { const medal = body.querySelector(".celebration h2 svg"); medal?.animate?.([{transform:"scale(.3) rotate(-25deg)"},{transform:"scale(1.15) rotate(8deg)",offset:.7},{transform:"none"}],{duration:520,easing:"cubic-bezier(.2,.7,.2,1)"}); }
    this.lastArtKey = artKey;
    this.spriteDirection = 0;
  };
  p.animateProgress = function(root, key) {
    this.progressShown ??= new Set();
    if (this.progressShown.has(key)) return;
    this.progressShown.add(key);
    if (env.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    for (const element of root.querySelectorAll('.track i,.ring')) element.animate?.([{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{duration:400,easing:'cubic-bezier(.2,.7,.2,1)'});
  };
  p.closeSheet = async function() {
    const dialog = this.shadowRoot.querySelector('dialog[open]');
    if (!dialog || this.closingSheet) return;
    this.closingSheet = true;
    try {
      const fade = env.matchMedia?.('(prefers-reduced-motion: reduce)').matches ? null : dialog.animate?.([{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(16px)'}],{duration:140,fill:'forwards'});
      if (fade) await fade.finished;
      dialog.close();
      fade?.cancel();
    } finally { this.closingSheet = false; }
  };
  p.seasonsSheet = function() {
    const versions = this.attrs(this.player,"sprites").versions || [];
    return versions.length ? '<div class="season-history">'+versions.map(v=>'<section><b>'+esc(v.current?'This season':v.version)+'</b><p class="lab">'+fmt(v.owned_variants)+' of '+fmt(v.total_variants)+' kinds</p>'+bar(v.completion_pct)+'</section>').join('')+'</div>' : empty('Season history unavailable');
  };
  p.stepSprite = function(delta) {
    this.spriteDirection = delta;
    const list = this.spriteFamilies(), i = list.findIndex((f) => f.id === this.selected);
    if (!list.length) return;
    this.selected = list[(i + delta + list.length) % list.length].id;
    this.kind = null;
    this.zoom = false;
    this.updateSheet();
  };
  p.notice = function(message) {
    this.toastMessage = message;
    const toast = this.shadowRoot.querySelector(".toast");
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    env.clearTimeout?.(this.toastTimer);
    this.toastTimer = env.setTimeout?.(() => {
      toast.hidden = true;
      this.toastMessage = null;
    }, 3500);
  };
  p.perform = async function(action) {
    try {
      await action();
      if (this.sheetType) this.updateSheet();
      else this.render();
      if (this.toastMessage) this.notice(this.toastMessage);
    } catch (e) {
      this.notice(e.message || "Action unavailable");
    }
  };
  p.tap = function(e) {
    const b = e.target.closest("button");
    if (!b) return;
    const d = b.dataset;
    if (d.section && d.section !== this.section) {
      this.switchSection(d.section);
      return;
    }
    if ("close" in d) {
      this.closeSheet();
      return;
    }
    if (d.railDot) {
      this.moveRail(d.railDot, Number(d.page));
      return;
    }
    if (d.railPrev || d.railNext) {
      const id = d.railPrev || d.railNext;
      this.moveRail(id, (this.railPositions?.[id] || 0) + (d.railPrev ? -1 : 1));
      return;
    }
    if (d.service) {
      this.perform(() => this.native?._callService(d.service));
      return;
    }
    if (d.player || d.sprites) {
      this.selectPlayer(d.player || d.sprites, d.sprites ? 'sprites' : 'stats');
      return;
    }
    if (d.family) {
      this.selected = d.family;
      this.kind = null;
      this.zoom = false;
      this.openSheet("sprite", "Sprite", b);
      return;
    }
    if (d.kind) {
      this.kind = d.kind;
      this.zoom = false;
      this.updateSheet();
      return;
    }
    if ("zoom" in d) {
      this.zoom = !this.zoom;
      b.classList.toggle("zoom", this.zoom);
      if (!env.matchMedia?.("(prefers-reduced-motion: reduce)").matches) b.querySelector("img")?.animate?.([{transform:"scale(.9)"},{transform:"scale(1.06)"},{transform:"scale(1)"}],{duration:280,easing:"cubic-bezier(.2,1.4,.4,1)"});
      return;
    }
    if (d.spriteStep) {
      this.stepSprite(Number(d.spriteStep));
      return;
    }
    if (d.match !== void 0) {
      this.sheetMatches = [...this.matchSequence];
      this.matchIndex = Number(d.match);
      this.celebrated = false;
      this.openSheet("match", "Game", b);
      return;
    }
    if (d.matchStep) {
      const n = (this.sheetMatches || this.matches()).length;
      this.matchIndex = Math.max(0, Math.min(n - 1, this.matchIndex + Number(d.matchStep)));
      this.celebrated = false;
      this.updateSheet();
      return;
    }
    if (d.jump) {
      this.shadowRoot.getElementById(d.jump)?.scrollIntoView({ behavior: env.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
      return;
    }
    if (d.gamesShown) {
      this.gamesShown = Number(d.gamesShown);
      this.render();
      return;
    }
    if ("statsMore" in d) { this.openSheet("stats", "More lifetime stats", b); return; }
    if (d.item) {
      this.itemId = d.item;
      this.openSheet("item", "Item", b);
      return;
    }
    if (d.wish) {
      if (this.native?._loadingAction?.startsWith('wish:')) return;
      const first = this.items?.get(d.wish)?.first, wish = this.wished(first);
      if (first) this.perform(async () => {
        await this.native._toggleWishlist(first, !wish);
        const stored = this.wished(first);
        if (this.native._shop?.error || stored === !!wish) throw Error(this.native._shop?.error || "Wishlist change could not be confirmed. Try again.");
        this.notice(wish ? "Removed from wishlist" : "♥ We will tell you when " + first.name + " is in the shop");
      });
      return;
    }
    if (d.avatar || "clearAvatar" in d) {
      this.perform(() => this.native._setAvatar(d.avatar || null));
      return;
    }
    if (d.favorite) {
      const o = this.itemInfo(this.itemId)?.first;
      if (o) this.perform(() => this.native._setFavorite(d.favorite, !o.favorite));
      return;
    }
    if (d.event !== void 0) {
      this.eventIndex = Number(d.event);
      this.eventSheetView = "leaderboard";
      this.eventRound = null;
      this.openSheet("event", "Tournament", b);
      this.loadLeaderboard();
      return;
    }
    if (d.leaderboard !== void 0) {
      this.loadLeaderboard();
      return;
    }
    if (d.eventSheetView) {
      this.eventSheetView = d.eventSheetView;
      this.updateSheet();
      return;
    }
    if ("eventFilters" in d) {
      this.openSheet("filters", "Tournament filters", b);
      return;
    }
    if (d.toggleFilter || d.removeFilter) {
      const [key, value] = (d.toggleFilter || d.removeFilter).split("|");
      this.native._toggleFilter(key, value);
      this.sheetType ? this.updateSheet() : this.render();
      return;
    }
    if ("resetFilters" in d) {
      this.native._filters = null;
      this.eventLevel = null;
      this.sheetType ? this.updateSheet() : this.render();
      return;
    }
    if (d.news !== void 0) {
      this.newsIndex = Number(d.news);
      this.openSheet("news", "News", b);
      return;
    }
    if ("seasons" in d) {
      this.openSheet("seasons", "Every season so far", b);
      return;
    }
    if (d.search !== void 0) {
      this.search();
      return;
    }
    if (d.trendPeriod) {
      this.trendPeriod = d.trendPeriod;
      this.loadTrendRange();
      return;
    }
    if (d.mapMode) {
      (this.shadowRoot.activeElement||this.native?.shadowRoot?.activeElement)?.blur?.();
      this.mapMode = d.mapMode;
      this.native._mapTool = d.mapMode === "draw" ? "draw" : "pan";
      this.decorateMap();
      return;
    }
    if (d.mapAction) {
      this.mapAction(d.mapAction, d.value);
      return;
    }
    const fields = { section: "section", filter: "filter", spriteView: "spriteView", statWindow: "statWindow", statMode: "statMode", passSet: "passSet", lockerSort: "lockerSort", lockerFilter: "lockerFilter", lockerRarity: "lockerRarity", shopView: "shopView", shopKind: "shopKind", searchType: "searchType", eventView: "eventView", trendFocus: "trendFocus", placeType: "placeType", placeSort: "placeSort" };
    for (const [key, field] of Object.entries(fields)) if (d[key] !== void 0) {
      this[field] = key === "passSet" ? Number(d[key]) : d[key];
      this.railPositions = {};
    }
    if (d.section && this.native) this.native._setView(d.section);
    this.render();
  };
  p.switchSection = async function(section) {
    const request = this.sectionRequest = (this.sectionRequest || 0) + 1;
    const view = this.shadowRoot.querySelector('.view');
    try {
      if (!env.matchMedia?.('(prefers-reduced-motion: reduce)').matches) await view?.animate?.([{opacity:1},{opacity:0}],{duration:120})?.finished;
    } catch {}
    if (request !== this.sectionRequest || this.disposed) return;
    this.section = section;
    this.railPositions = {};
    this.native?._setView(section);
    this.render();
  };
  p.selectPlayer = function(player, section = 'stats') {
    this.shadowRoot.querySelector('dialog[open]')?.close();
    this.sheetType = null;
    this.mapObserver?.disconnect();
    this.mapObserver = null;
    this.native?.remove();
    this.native = null;
    this.player = player;
    this.manual = true;
    this.section = section;
    this.railPositions = {};
    this.trendData = null;
    this.trendRequest = (this.trendRequest || 0) + 1;
    this.selected = null;
    this.kind = null;
    this.render();
  };
  p.applySectionLink = function(section) {
    this.shadowRoot.querySelector('dialog[open]')?.close();
    this.sheetType = null;
    const player = this.config.player || this.config.native?.player || this.player;
    if (this.player !== player) this.selectPlayer(player, section);
    this.manual = true;
    this.section = section;
    this.native?._setView?.(section);
    this.render();
  };
  p.search = function() {
    if (!this.native) return;
    this.native._searchQuery = this.searchQuery || "";
    this.native._searchType = this.searchType || "outfit";
    this.perform(() => this.native._searchCosmetics());
  };
  p.loadLeaderboard = function() {
    const e = this.eventCards?.[this.eventIndex], w = e?.windows?.find((x) => x.window_id === this.eventRound) || e?.windows?.find((x) => this.eventState(x) === "live") || e?.windows?.find((x) => this.eventState(x) === "finished") || e?.windows?.[0];
    if (e && w) {
      this.eventRound = w.window_id;
      this.perform(() => this.native._loadLeaderboard(e.event_id, w.window_id));
    }
  };
  const connected = p.connectedCallback;
  p.connectedCallback = function() {
    connected.call(this);
    this.disposed = false;
    this.onHash ??= () => { const section = env.location?.hash?.replace(/^#fortnite-/, ''); if (env.location?.hash?.startsWith('#fortnite-') && this.sections().includes(section)) this.applySectionLink(section); };
    env.addEventListener?.('hashchange', this.onHash);
    this.onHash();
    this.onVisibility??=()=>{if(!env.document?.hidden){this.renderStamp='';this.render();}};
    env.document?.addEventListener('visibilitychange',this.onVisibility);
    if (env.ResizeObserver && !this.sizeObserver) {
      let width = this.clientWidth;
      this.sizeObserver = new env.ResizeObserver(() => {
        if (width === this.clientWidth) return;
        width = this.clientWidth;
        this.renderStamp = '';
        this.render();
      });
      this.sizeObserver.observe(this);
    }
    if (!this.eventsBound) {
      this.shadowRoot.addEventListener('keydown', e => { if (e.key !== 'Enter') return; if (e.target.dataset.input === 'mapQuery') this.shadowRoot.querySelector('.places-list button')?.click(); if (e.target.dataset.input === 'searchQuery') this.search(); });
      this.shadowRoot.addEventListener("error", e => { const img = e.target; if (img.tagName !== "IMG") return; const next = (img.dataset.fallback || "").split("|").filter(u => u && u !== img.getAttribute("src")); if (next.length) { img.dataset.fallback = next.slice(1).join("|"); img.src = next[0]; } else { img.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='; img.alt = ''; img.classList.add('broken'); } }, true);
      this.eventsBound = true;
      this.shadowRoot.addEventListener("input", (e) => {
        const key = e.target.dataset.input;
        if (!key) return;
        this[key] = key === "eventLevel" ? number(e.target.value) : e.target.value;
        if (key === "searchQuery") {
          env.clearTimeout(this.searchTimer);
          this.searchTimer = env.setTimeout(() => this.search(), 400);
        } else if (key === "mapQuery") this.decorateMap();
        else if (this.sheetType) this.updateSheet();
        else this.render();
      });
      this.shadowRoot.addEventListener("change", (e) => {
        const key = e.target.dataset.select;
        if (!key) return;
        this[key] = e.target.value;
        if (key === "eventRound") this.loadLeaderboard();
        else if (key === "trendSeason") this.loadTrendRange();
        else this.render();
      });
    }
    this.render();
  };
  p.disconnectedCallback = function() {
    this.disposed = true;
    env.clearTimeout?.(this.searchTimer);
    env.clearTimeout?.(this.toastTimer);
    this.mapObserver?.disconnect();
    this.sizeObserver?.disconnect();
    this.sizeObserver = null;
    env.document?.removeEventListener('visibilitychange',this.onVisibility);
    env.removeEventListener?.('hashchange', this.onHash);
    this.trendRequest = (this.trendRequest || 0) + 1;
  };
  p.ensureEventPodiums=function(index=0){if(!['live','results'].includes(this.eventView))return;for(const e of (this.eventCards||[]).slice(index,index+3)){const w=e.windows.find(w=>this.eventState(w)==='live')||e.windows.find(w=>this.eventState(w)==='finished');if(w&&!this.native._leaderboards[e.event_id+'|'+w.window_id])this.native._loadLeaderboard(e.event_id,w.window_id);}};
  p.map = function() {
    return '<div class="two-col map-layout" style="grid-template-columns:2.2fr 1fr"><section class="native-map"></section><aside class="map-panel"></aside></div><div class="controls map-modes">' + [["explore", "⌖ Explore"], ["land", "⚑ Land"], ["draw", "✎ Draw"]].map(([id, label]) => btn(label, "map-mode", id, id === (this.mapMode || "explore"))).join("") + "</div>";
  };
  p.toggleMapFull = async function() {
    const n = this.native, doc = env.document, frame = n?.shadowRoot?.querySelector('.mapx-frame');
    if (!n || !frame) return;
    if (n._mapFull) {
      if (doc.fullscreenElement || doc.webkitFullscreenElement) await (doc.exitFullscreen || doc.webkitExitFullscreen).call(doc)?.catch?.(() => {});
      if (frame.hasAttribute('popover')) { try { frame.hidePopover(); } catch {} frame.removeAttribute('popover'); }
      n._mapFull = false;
      return;
    }
    n._mapFull = true;
    let ok = false;
    try { const req = frame.requestFullscreen || frame.webkitRequestFullscreen; if (req) { await req.call(frame, { navigationUI: 'hide' }); ok = !!(doc.fullscreenElement || doc.webkitFullscreenElement); } } catch {}
    // No element full screen here (iPad / app web views): lift the map into the top layer instead
    if (!ok && frame.showPopover) { frame.setAttribute('popover', 'manual'); try { frame.showPopover(); } catch {} }
  };
  p.decorateMap = function() {
    const n = this.native, root = n?.shadowRoot, panel = this.shadowRoot.querySelector(".map-panel");
    if (this.section !== "map" || !root || !panel) return;
    if (!n._hhCover && typeof n._setMapView === "function") {
      n._hhCover = true;
      const baseSet = n._setMapView.bind(n), cover = () => { const b = n._mapBox || {}; return b.w > 0 && b.h > 0 ? Math.max(b.w, b.h) / Math.min(b.w, b.h) : 1; };
      n._setMapView = (z, x, y) => baseSet(Math.max(Number(z) || 1, cover()), x, y);
      n._resetMapView = () => n._animateMapTo ? n._animateMapTo(cover(), .5, .5) : n._setMapView(cover(), .5, .5);
      n._setMapView(n._mapZoom || 1, n._mapCenter?.x ?? .5, n._mapCenter?.y ?? .5);
    }
    const dropEl = root.querySelector(".mapx-drop");
    if (dropEl) { const chute = dropEl.querySelector("span"); if (chute && !chute.querySelector("svg")) chute.innerHTML = PARACHUTE; if (n._mapDrop !== this.lastDropKey || !dropEl.classList.contains("hh-go")) { this.lastDropKey = n._mapDrop; dropEl.classList.remove("hh-go"); void dropEl.offsetWidth; dropEl.classList.add("hh-go"); } } else this.lastDropKey = null;
    let style = root.querySelector("#household-map-style");
    if (!style) {
      style = env.document.createElement("style");
      style.id = "household-map-style";
      style.textContent = `.card-header,.card-buttons,.bubble-button-card-container,.mapx-side,.mapx-tools,.mapx-drawbar{display:none!important}ha-card{background:transparent!important;box-shadow:none!important;border:0!important;padding:0!important}.mapx{padding:0!important;display:block!important;position:relative}.mapx-meta{display:none!important}.mapx-top{position:absolute!important;left:12px;top:12px;z-index:4;width:220px;display:block!important}.mapx-current{min-height:44px!important}.mapx-current small{display:none!important}.mapx-frame{height:calc(100svh - 296px)!important;width:100%!important;aspect-ratio:auto!important;border-radius:20px}.mapx-pin.named{min-width:52px!important;min-height:52px!important}.mapx-pin.named i{width:24px!important;height:24px!important}.mapx-pin.named b{font-size:13px!important}.mapx-zoombar{top:12px!important;bottom:auto!important;right:84px!important;flex-direction:row!important}.mapx-tools{display:none!important}.mapx-pin.named{background:color-mix(in srgb,#bef264 20%,transparent)!important;border-radius:50%!important}.mapx.full .mapx-tools{display:flex!important}.household-map-modes{position:absolute;bottom:12px;left:12px;display:flex;gap:4px;z-index:8;background:var(--hh-surface-1,#171b24);padding:4px;border-radius:18px}.household-map-modes button{min-height:56px;min-width:104px;border:0;border-radius:14px;color:var(--hh-text,#eef1f6);background:var(--hh-surface-2,#212836);font:600 14px Figtree,sans-serif}.household-map-modes button.on{background:#bef264;color:#0d1016}.mapx-drop{z-index:7!important}.mapx-drop i{width:56px!important;height:56px!important;border-color:#bef264!important;animation:none!important;opacity:0}.mapx-drop.hh-go i{animation:hh-ring 1.8s ease-out .6s infinite!important}.mapx-drop.hh-go i+i{animation-delay:1.5s!important}.mapx-drop span{font-size:0!important;line-height:0;width:52px;height:52px;transform:translateY(-46px);animation:none!important;position:relative;z-index:2}.mapx-drop span svg{width:52px;height:52px;filter:drop-shadow(0 6px 6px rgba(0,0,0,.45))}.mapx-drop.hh-go span{animation:hh-fall .8s cubic-bezier(.25,1.35,.5,1) both,hh-bob 2.4s .8s ease-in-out infinite!important}.mapx-drop b{top:24px!important;z-index:1}@keyframes hh-fall{0%{transform:translateY(-200px) rotate(-14deg);opacity:0}55%{opacity:1}100%{transform:translateY(-46px) rotate(0)}}@keyframes hh-bob{0%,100%{transform:translateY(-46px) rotate(0)}50%{transform:translateY(-53px) rotate(4deg)}}@keyframes hh-ring{from{transform:scale(.35);opacity:.95}to{transform:scale(1.7);opacity:0}}@media(prefers-reduced-motion:reduce){.mapx-drop.hh-go span,.mapx-drop.hh-go i{animation:none!important}}.mapx-drop b{color:#0d1016!important;background:#bef264!important}.mapx-top{gap:8px!important}.mapx-mark{font-size:28px!important;min-width:44px;min-height:44px}.mapx-pin{pointer-events:var(--hh-place-events,auto)}@keyframes hh-drop{from{transform:translateY(-24px);opacity:0}to{transform:none;opacity:1}}@media(max-width:999px){.mapx-frame{height:380px!important}}@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}`;
      root.append(style);
    }
    if (!root.querySelector("#household-map-full")) { const full = env.document.createElement("style"); full.id = "household-map-full"; full.textContent = ".mapx-frame.fs,.mapx-frame:fullscreen,.mapx-frame:popover-open{position:fixed!important;inset:0!important;width:100vw!important;height:100vh!important;height:100dvh!important;max-width:none!important;max-height:none!important;margin:0!important;padding:0!important;border:0!important;border-radius:0!important;z-index:9999}.mapx-frame::backdrop{background:#0d2a4a}"; root.append(full); }
    { const fr = root.querySelector(".mapx-frame"); if (fr && !n._mapFull && fr.hasAttribute("popover")) { try { fr.hidePopover(); } catch {} fr.removeAttribute("popover"); } }
    n.style.setProperty("--hh-place-events", this.mapMode === "draw" ? "none" : "auto");
    const map = n._maps?.[n._mapMode]?.data, places = map ? n._mapPlaces(map) : [], selected = places.find((x) => x.key === n._mapPoi), mode = this.mapMode || "explore";
    if (mode === "land" && selected && n._mapDrop !== selected.key) n._mapDrop = selected.key;
    const colors = ["#F43F5E", "#FACC15", "#22C55E", "#38BDF8", "#A855F7", "#FFFFFF"];
    let html = '<div class="controls">' + btn("More", "map-action", "more") + "</div>";
    if (mode === "draw") {
      html += '<h2>Draw our plan</h2><div class="swatches">' + colors.map((c) => '<button class="swatch' + (n._mapColor === c ? " selected" : "") + '" style="--c:' + c + '" data-map-action="color" data-value="' + c + '" aria-label="Colour ' + c + '"></button>').join("") + '</div><div class="controls">' + [["draw", "Pen"], ["marker", "Sticker"], ["erase", "Rubber"]].map(([id, label]) => '<button class="btn' + (n._mapTool === id ? " on" : "") + '" data-map-action="tool" data-value="' + id + '">' + label + "</button>").join("") + '</div><div class="controls">' + ["★", "✕", "➜", "♥"].map((i) => '<button class="btn" data-map-action="sticker" data-value="' + i + '">' + i + "</button>").join("") + '</div><div class="controls">' + btn("Undo", "map-action", "undo") + btn("Redo", "map-action", "redo") + btn("Clear all", "map-action", "clear") + "</div>" + btn("Done", "map-mode", "land");
    } else if (mode === "land") html += '<h2>My landing spot</h2><div class="num">' + esc(selected?.name || "Tap a place") + '</div><span class="pill">' + esc(selected?.grid || "") + "</span>" + btn("Surprise me!", "map-action", "random") + btn("Draw our plan", "map-mode", "draw");
    else {
      const query = (this.mapQuery || "").toLowerCase(), list = places.filter((x) => x.type === (this.placeType || "named") && (!query || (x.name + " " + x.grid).toLowerCase().includes(query))).sort((a, b) => String(this.placeSort === "grid" ? a.grid : a.name).localeCompare(String(this.placeSort === "grid" ? b.grid : b.name)));
      html += '<input data-input="mapQuery" type="search" placeholder="Find a place or grid (e.g. D4)" aria-label="Find a place or grid" value="' + esc(this.mapQuery || "") + '">' + this.seg([["named", "Named"], ["landmark", "Landmarks"]], "place-type", this.placeType || "named") + this.seg([["name", "Name"], ["grid", "Grid"]], "place-sort", this.placeSort || "name") + '<div class="places-list">' + list.map((x) => '<button class="btn" data-map-action="place" data-value="' + esc(x.key) + '">' + esc(x.name) + ' <span class="lab">' + esc(x.grid) + "</span></button>").join("") + "</div>" + (selected ? "<h3>" + esc(selected.name) + '</h3><p class="lab">' + esc(selected.type) + " · " + esc(selected.grid) + '</p><div class="controls">' + btn("Nearby", "map-action", "nearby") + btn("Zoom to", "map-action", "zoom") + btn("Next", "map-action", "next") + btn("Land here", "map-mode", "land") + btn("Pin it", "map-action", "pin") + "</div>" : empty("Tap a place on the map or pick one above to see details."));
    }
    const focus = !!panel.querySelector("input") && panel.querySelector("input") === panel.getRootNode().activeElement, caret = panel.querySelector("input")?.selectionStart;
    const cut = html.indexOf('<input data-input="mapQuery"'), current = panel.querySelector('input[data-input="mapQuery"]'), rest = panel.querySelector('.map-rest');
    if (cut >= 0) {
      const head = html.slice(0, cut), after = html.slice(cut), end = after.indexOf('>') + 1, field = after.slice(0, end), tail = after.slice(end);
      if (current && rest && panel._head === head) { if (rest._html !== tail) { const top = rest.querySelector('.places-list')?.scrollTop || 0; rest.innerHTML = tail; rest._html = tail; const list = rest.querySelector('.places-list'); if (list) list.scrollTop = top; } }
      else { panel.innerHTML = head + (focus ? field : field.replace('<input ', '<input readonly ')) + '<div class="map-rest" style="display:contents">' + tail + '</div>'; panel._head = head; panel._html = null; panel.querySelector('.map-rest')._html = tail; }
      const input = panel.querySelector('input[data-input="mapQuery"]');
      if (input && !input._tapBound) { input._tapBound = 1; const wake = () => { if (input.readOnly) { input.readOnly = false; input.focus(); } }; input.addEventListener('click', wake); input.addEventListener('keydown', () => { input.readOnly = false; }); }
    } else if (panel._html !== html) { panel.innerHTML = html; panel._html = html; panel._head = null; }
    if(focus && !panel.contains(panel.getRootNode().activeElement)){const input=panel.querySelector("input");input?.focus({preventScroll:true});input?.setSelectionRange(caret,caret);}
    const frame=root.querySelector(".mapx-frame");
    if (frame && !frame.dataset.hhDrawPointer) {
      frame.dataset.hhDrawPointer = '1';
      let primary;
      for (const type of ['pointerdown','pointermove','pointerup','pointercancel']) frame.addEventListener(type, event => {
        if (this.mapMode !== 'draw') { primary = null; return; }
        if (event.target.closest('.mapx-ui,.mapx-pin,.mapx-mark,.household-map-modes,.household-map-more-button,.household-map-more')) return;
        if (type === 'pointerdown' && primary == null) primary = event.pointerId;
        if (primary != null && event.pointerId !== primary) { event.preventDefault(); event.stopImmediatePropagation(); return; }
        if (type === 'pointerup' || type === 'pointercancel') primary = null;
      }, {capture:true});
    }
    if(frame&&!frame.querySelector('.household-map-more-button')){const more=env.document.createElement('button');more.className='household-map-more-button';more.textContent='More';more.style.cssText='position:absolute;top:12px;right:12px;z-index:6;min-height:44px;padding:0 12px;border:0;border-radius:14px;background:var(--hh-surface-2,#212836);color:var(--hh-text,#eef1f6);font:600 14px Figtree,sans-serif';more.onpointerdown=e=>e.stopPropagation();more.onclick=e=>{e.stopPropagation();this.mapAction('more');};frame.append(more);}
    let modes=frame?.querySelector(".household-map-modes");
    if(frame&&!modes){modes=env.document.createElement("div");modes.className="household-map-modes";frame.append(modes);modes.addEventListener("pointerdown",e=>e.stopPropagation());modes.addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;e.stopPropagation();(this.shadowRoot.activeElement||n.shadowRoot?.activeElement)?.blur?.();this.mapMode=b.dataset.mode;n._mapTool=this.mapMode==="draw"?"draw":"pan";this.decorateMap();});}
    if(modes&&modes.dataset.mode!==mode){modes.dataset.mode=mode;modes.innerHTML=[["explore","⌖ Explore"],["land","⚑ Land"],["draw","✎ Draw"]].map(([id,label])=>'<button data-mode="'+id+'" class="'+(id===mode?'on':'')+'">'+label+'</button>').join("");}
    const fallback=this.shadowRoot.querySelector(".map-modes");if(fallback)fallback.style.display=frame?"none":"flex";
    if (this.observedMapRoot !== root) {
      this.mapObserver?.disconnect();
      this.mapObserver = null;
      this.observedMapRoot = root;
    }
    if (!this.mapObserver && env.MutationObserver) {
      this.mapObserver = new env.MutationObserver(() => { if (this.mapRaf) return; this.mapRaf = env.requestAnimationFrame(() => { this.mapRaf = 0; this.decorateMap(); }); });
      this.mapObserver.observe(root, { childList: true, subtree: true });
    }
    if (mode === "land") {
      for (const pin of root.querySelectorAll(".mapx-pin")) if (!pin.dataset.landBound) {
        pin.dataset.landBound = "1";
        pin.addEventListener("click", () => queueMicrotask(() => {
          if (this.mapMode === "land") n._mapDrop = n._mapPoi;
        }));
      }
    }
  };
  p.mapAction = function(action, value) {
    const n = this.native, map = n?._maps?.[n._mapMode]?.data, places = map ? n._mapPlaces(map) : [], selected = places.find((x) => x.key === n._mapPoi);
    if (!n) return;
    if (action === "tool") n._mapTool = value;
    else if (action === "color") n._mapColor = value;
    else if (action === "sticker") {
      n._mapIcon = value;
      n._mapTool = "marker";
    } else if (action === "undo") n._undoNote();
    else if (action === "redo") n._redoNote();
    else if (action === "clear") n._annotate(() => ({ marks: [], lines: [] }));
    else if (action === "random") n._randomDrop(places);
    else if (action === "place") n._focusPlace(places.find((x) => x.key === value));
    else if (action === "zoom" && selected) n._focusPlace(selected);
    else if (action === "next" && selected) {
      const same = places.filter((x) => x.name === selected.name);
      n._focusPlace(same[(same.indexOf(selected) + 1) % same.length]);
    } else if (action === "pin" && selected) n._annotate((a) => ({ ...a, marks: [...a.marks, { id: Date.now(), x: selected.left / 100, y: selected.top / 100, color: n._mapColor, icon: "📍" }] }));
    else if (action === "nearby" && selected) {
      const nearest = n._placeFacts(map, selected).nearest;
      this.notice(nearest.map((x) => x.name + " · " + x.metres + " m").join(" · "));
    } else if (action === "more") {
      const root = n.shadowRoot;
      let more = root.querySelector(".household-map-more");
      if (more) {
        more.remove();
        return;
      }
      more = env.document.createElement("div");
      more.className = "household-map-more";
      more.style.cssText = "position:absolute;top:64px;right:12px;z-index:8;display:flex;gap:8px;flex-wrap:wrap;padding:12px;background:var(--hh-surface-1,#171b24);color:var(--hh-text,#eef1f6);border-radius:16px;max-width:90%";
      for (const [label, handler] of [["Grid", () => n._mapGrid = !n._mapGrid], ["Place names: " + n._mapLabels, () => n._mapLabels = n._mapLabels === "auto" ? "all" : n._mapLabels === "all" ? "off" : "auto"], ["Landmarks", () => n._mapShowLandmarks = !n._mapShowLandmarks], ["Full screen", () => this.toggleMapFull()]]) {
        const b = env.document.createElement("button");
        b.textContent = label;
        b.style.cssText = "min-height:44px;padding:0 12px;border-radius:12px";
        b.onclick = handler;
        more.append(b);
      }
      more.onpointerdown=e=>e.stopPropagation();
      root.querySelector(".mapx-frame")?.append(more);
    }
    this.decorateMap();
  };
}));
