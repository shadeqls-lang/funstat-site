/* Gatefold Drops kit: event pools, odds and shared renderers.
   Events, dates and venues are real (fall 2026). Ticket values are estimates for this concept, not live prices. */
window.GK=(function(){
const DAY=864e5, today=new Date(); today.setHours(0,0,0,0);
const WD=['SUN','MON','TUE','WED','THU','FRI','SAT'], MO=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
const D=n=>{ const d=new Date(today.getTime()+n*DAY); return {wd:WD[d.getDay()],day:String(d.getDate()).padStart(2,'0'),mo:MO[d.getMonth()],d}; };
const cap=w=>w[0]+w.slice(1).toLowerCase();
const dshort=n=>{ const x=D(n); return n===0?'Tonight':n===1?'Tomorrow':`${cap(x.wd)}, ${cap(x.mo)} ${+x.day}`; };
const money=v=>'$'+(Math.round(v*100)/100).toLocaleString('en-US',{minimumFractionDigits:v%1?2:0,maximumFractionDigits:2});
const money2=v=>'$'+(Math.round(v*100)/100).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const off=iso=>Math.round((new Date(iso+'T00:00:00').getTime()-today.getTime())/DAY);

/* poster palettes: blue, navy, violet, ice */
const PAL=[
  ['#0B1C45','#1F5EFF','#B9DAFF','#FFFFFF'],
  ['#06102A','#3B2A8F','#A78BFA','#FFFFFF'],
  ['#E3EDFC','#B9DAFF','#1F5EFF','#0A1630'],
  ['#1F5EFF','#4F9DFF','#FFFFFF','#FFFFFF'],
  ['#0A1330','#0B2A8F','#7CC4FF','#FFFFFF'],
  ['#2A1F6B','#7B6CFF','#E3EDFC','#FFFFFF']
];
/* every dated event a ticket can be for */
const EV={
  ufc:{t:'UFC 334: Gane vs. Hokit',p:'UFC 334',v:'Madison Square Garden',city:'New York, NY',date:'2026-11-14',time:'PPV',k:'oct',c:1},
  f1thu:{t:'Las Vegas Grand Prix',p:'VEGAS GP',v:'Las Vegas Strip Circuit',city:'Las Vegas, NV',date:'2026-11-19',time:'Thu',k:'track',c:4},
  f1fri:{t:'Las Vegas Grand Prix',p:'VEGAS GP',v:'Las Vegas Strip Circuit',city:'Las Vegas, NV',date:'2026-11-20',time:'Fri',k:'track',c:4},
  f1sat:{t:'Las Vegas Grand Prix',p:'VEGAS GP',v:'Las Vegas Strip Circuit',city:'Las Vegas, NV',date:'2026-11-21',time:'Race',k:'track',c:5},
  f1wk:{t:'Las Vegas Grand Prix',p:'VEGAS GP',v:'Las Vegas Strip Circuit',city:'Las Vegas, NV',date:'2026-11-19',time:'3-day',k:'track',c:5},
  nfl2:{t:'Bears at Lions',p:'CHI @ DET',v:'Ford Field',city:'Detroit, MI',date:'2026-11-26',time:'1:00 ET',k:'field',c:0},
  nfl3:{t:'Eagles at Cowboys',p:'PHI @ DAL',v:'AT&T Stadium',city:'Arlington, TX',date:'2026-11-26',time:'4:30 ET',k:'field',c:4},
  nfl4:{t:'Chiefs at Bills',p:'KC @ BUF',v:'Highmark Stadium',city:'Orchard Park, NY',date:'2026-11-26',time:'8:20 ET',k:'field',c:3},
  nfl5:{t:'Packers at Bears',p:'GB @ CHI',v:'Soldier Field',city:'Chicago, IL',date:'2026-12-25',time:'1:00 ET',k:'field',c:1},
  nfl6:{t:'Bills at Broncos',p:'BUF @ DEN',v:'Empower Field at Mile High',city:'Denver, CO',date:'2026-12-25',time:'4:30 ET',k:'field',c:5},
  nfl7:{t:'Rams at Seahawks',p:'LAR @ SEA',v:'Lumen Field',city:'Seattle, WA',date:'2026-12-25',time:'8:15 ET',k:'field',c:0},
  game:{t:'Michigan at Ohio State',p:'THE GAME',v:'Ohio Stadium',city:'Columbus, OH',date:'2026-11-28',time:'TBA',k:'bands',c:0},
  iron:{t:'Auburn at Alabama',p:'IRON BOWL',v:'Bryant-Denny Stadium',city:'Tuscaloosa, AL',date:'2026-11-28',time:'TBA',k:'bands',c:1},
  rc1:{t:'Christmas Spectacular',p:'RADIO CITY',v:'Radio City Music Hall',city:'New York, NY',date:'2026-11-27',time:'Show',k:'star',c:2},
  rc2:{t:'Christmas Spectacular',p:'RADIO CITY',v:'Radio City Music Hall',city:'New York, NY',date:'2026-12-02',time:'Show',k:'star',c:3},
  rc3:{t:'Christmas Spectacular',p:'RADIO CITY',v:'Radio City Music Hall',city:'New York, NY',date:'2026-12-19',time:'Show',k:'star',c:5},
  rc4:{t:'Christmas Spectacular',p:'RADIO CITY',v:'Radio City Music Hall',city:'New York, NY',date:'2026-12-24',time:'Eve',k:'star',c:1}
};
Object.values(EV).forEach(e=>e.off=off(e.date));
const RAR={
  epic:{n:'Epic',c:'#A78BFA'},
  rare:{n:'Rare',c:'#3B7BFF'},
  unc:{n:'Uncommon',c:'#38C6D9'},
  com:{n:'Common',c:'#8C9AB5'}
};
const TORDER=['epic','rare','unc','com'];
/* one pool per event. item: [event, seat, rarity, tag, value] */
const PACKS=[
 {id:'ufc',n:'UFC 334',full:'UFC 334: Gane vs. Hokit',when:'Sat, Nov 14',where:'Madison Square Garden, New York',lede:'Heavyweight title fight at the Garden, with Harrison vs. Nunes as co-main.',price:329,odds:{epic:.004,rare:.014,unc:.072,com:.91},hue:['#A78BFA','#3B2A8F','#06102A'],
  pool:[['ufc','Upper 200s, end','com','',210],['ufc','Upper 200s, side','com','',260],['ufc','Upper 200s, row 1','com','',310],
   ['ufc','Lower 100s, corner','unc','',520],['ufc','Lower 100s, side','unc','',650],
   ['ufc','Floor, rows 15–25','rare','FLOOR',1600],['ufc','Floor, rows 5–10','rare','FLOOR',2800],
   ['ufc','Floor, rows 1–3','epic','FLOOR',4500],['ufc','Cageside, row 1','epic','CAGESIDE',8500]]},
 {id:'f1',n:'Vegas GP',full:'Formula 1 Las Vegas Grand Prix',when:'Nov 19–21',where:'Las Vegas Strip Circuit',lede:'Night race on the Strip. Single nights, three-day grandstands and hospitality.',price:249,odds:{epic:.005,rare:.025,unc:.09,com:.88},hue:['#7CC4FF','#1F5EFF','#0B1C45'],
  pool:[['f1thu','Flamingo GA · Thursday','com','',50],['f1fri','Flamingo GA · Friday','com','',125],['f1sat','Flamingo GA · race night','com','',220],
   ['f1wk','Flamingo GA · 3-day','unc','',492],['f1wk','Heineken Grandstand · 3-day','unc','',925],['f1wk','West Harmon Grandstand · 3-day','unc','',1012],
   ['f1wk','Turn 3 Grandstand · 3-day','rare','',1329],['f1wk','T-Mobile Grandstand · 3-day','rare','',1445],['f1wk','Main Grandstand · 3-day','rare','',2051],
   ['f1wk','Club Paris · 3-day','epic','HOSPITALITY',2542],['f1wk','HGV Clubhouse · 3-day','epic','HOSPITALITY',3728],['f1wk','Paddock Club Rooftop · 3-day','epic','PADDOCK',10902]]},
 {id:'nfl',n:'NFL Holidays',full:'NFL Thanksgiving & Christmas Day',when:'Nov 26 & Dec 25',where:'Six games, six stadiums',lede:'All three Thanksgiving games and all three on Christmas Day. You get one of them.',price:199,odds:{epic:.005,rare:.02,unc:.095,com:.88},hue:['#4F9DFF','#0B2A8F','#06102A'],
  pool:[['nfl2','Upper level','com','',145],['nfl3','Upper level','com','',170],['nfl4','Upper level','com','',160],['nfl5','Upper level','com','',150],['nfl6','Upper level','com','',135],['nfl7','Upper level','com','',140],
   ['nfl2','Lower level','unc','',360],['nfl3','Lower level, corner','unc','',420],['nfl4','Lower level','unc','',460],['nfl5','Lower level','unc','',380],
   ['nfl7','Club level','rare','CLUB',900],['nfl3','Club level, 40-yard line','rare','CLUB',1100],['nfl4','Club level','rare','CLUB',1250],
   ['nfl4','Lower bowl, 50-yard line','epic','50 YD',2400],['nfl5','Field pass + lower bowl','epic','FIELD PASS',2800],['nfl3','Field-level suite seat','epic','SUITE',3200]]},
 {id:'rivalry',n:'Rivalry Week',full:'College Football Rivalry Week',when:'Sat, Nov 28',where:'Columbus, OH & Tuscaloosa, AL',lede:'The Game in Columbus and the Iron Bowl in Tuscaloosa, same Saturday.',price:279,odds:{epic:.004,rare:.016,unc:.08,com:.90},hue:['#B9DAFF','#3B7BFF','#0B1C45'],
  pool:[['iron','Upper deck, end zone','com','',195],['iron','Upper deck','com','',230],['game','Upper deck, C-deck','com','',285],
   ['iron','Lower bowl, sideline','unc','',540],['game','A-deck, 20-yard line','unc','',620],
   ['iron','Club seat','rare','CLUB',1150],['game','Club seat','rare','CLUB',1350],
   ['iron','Sideline pass + lower bowl','epic','FIELD PASS',2200],['game','Field level, 50-yard line','epic','50 YD',2600]]},
 {id:'rockettes',n:'Radio City',full:'Christmas Spectacular, Radio City Rockettes',when:'Nov 27 – Dec 24',where:'Radio City Music Hall, New York',lede:'Four December shows, up to front orchestra on Christmas Eve.',price:109,odds:{epic:.006,rare:.024,unc:.09,com:.88},hue:['#E3EDFC','#7B6CFF','#1F5EFF'],
  pool:[['rc2','3rd mezzanine','com','',75],['rc1','3rd mezzanine','com','',85],['rc3','2nd mezzanine','com','',110],
   ['rc2','1st mezzanine','unc','',175],['rc1','Orchestra, rear','unc','',190],
   ['rc3','Orchestra, center','rare','',320],['rc4','Orchestra · Christmas Eve','rare','XMAS EVE',420],
   ['rc4','Front orchestra, rows A–C · Christmas Eve','epic','FRONT ROW',780],['rc3','Orchestra four-pack','epic','4 SEATS',1200]]}
];
PACKS.forEach(p=>{
  p.items=p.pool.map((o,i)=>({i,pack:p.id,ev:o[0],seat:o[1],r:o[2],tag:o[3],val:o[4]}));
  p.tiers={}; TORDER.forEach(t=>{ const L=p.items.filter(x=>x.r===t); if(L.length) p.tiers[t]={p:p.odds[t],min:Math.min(...L.map(x=>x.val)),max:Math.max(...L.map(x=>x.val)),avg:L.reduce((s,x)=>s+x.val,0)/L.length,n:L.length}; });
  p.ev=Object.values(p.tiers).reduce((s,t)=>s+t.p*t.avg,0);
  p.top=Math.max(...p.items.map(x=>x.val)); p.floor=Math.min(...p.items.map(x=>x.val));
  p.lead=p.items.find(x=>x.val===p.top).ev;
});
const pack=id=>PACKS.find(p=>p.id===id);
function roll(p,rng=Math.random){ let r=rng(),a=0,tier='com'; for(const t of TORDER){ if(!p.tiers[t]) continue; a+=p.tiers[t].p; if(r<a){ tier=t; break; } } const L=p.items.filter(x=>x.r===tier); return L[Math.floor(rng()*L.length)]; }
function seeded(s){ let h=1779033703^s.length; for(let i=0;i<s.length;i++){ h=Math.imul(h^s.charCodeAt(i),3432918353); h=h<<13|h>>>19; } return ()=>{ h=Math.imul(h^h>>>16,2246822507); h=Math.imul(h^h>>>13,3266489909); return ((h^=h>>>16)>>>0)/4294967296; }; }
function seatCode(it){ const r=seeded(it.pack+it.i+it.ev), s=it.seat.toLowerCase(), n=a=>a[Math.floor(r()*a.length)];
  if(/ga\b|general/.test(s)) return {sec:'GA',row:'–',seat:'–'};
  let sec;
  if(/cageside/.test(s)) sec='CS'; else if(/club paris|clubhouse|paddock/.test(s)) sec='HOSP'; else if(/200s/.test(s)) sec=String(201+Math.floor(r()*24)); else if(/100s/.test(s)) sec=String(101+Math.floor(r()*24)); else if(/floor/.test(s)) sec='FLR'; else if(/suite/.test(s)) sec='S'+(10+Math.floor(r()*30));
  else if(/club/.test(s)) sec='C'+(200+Math.floor(r()*40)); else if(/3rd/.test(s)) sec='3M'; else if(/upper|c-deck/.test(s)) sec=String(300+Math.floor(r()*40));
  else if(/2nd/.test(s)) sec='2M'; else if(/1st/.test(s)) sec='1M'; else if(/orchestra/.test(s)) sec='ORCH';
  else if(/grandstand|clubhouse|paddock/.test(s)) sec=it.seat.split(' ')[0].slice(0,4).toUpperCase(); else sec=String(100+Math.floor(r()*40));
  const rr=s.match(/rows? (\d+)[–-](\d+)/); if(rr) return {sec,row:String(+rr[1]+Math.floor(r()*(rr[2]-rr[1]+1))),seat:String(1+Math.floor(r()*24))};
  const row=/row 1\b|row a/.test(s)?(/row a/.test(s)?'A':'1'):/front/.test(s)?n(['A','B','C']):sec==='HOSP'?'–':n(['C','F','H','K','M','P','12','18','22']);
  return {sec,row,seat:row==='–'?'–':String(1+Math.floor(r()*28))}; }

/* ---------- poster art (SVG) ---------- */
let uid=0;
function poster(id,r){
  const e=EV[id], P=PAL[r==='epic'?5:r==='rare'?3:r==='unc'?0:e.c], g='gp'+(uid++);
  let sh='';
  switch(e.k){
    case 'oct': for(let k=0;k<4;k++){ const R=40-k*9, pts=Array.from({length:8},(_,i)=>{ const a=Math.PI/8+i*Math.PI/4; return `${(50+R*Math.cos(a)).toFixed(1)},${(52+R*Math.sin(a)).toFixed(1)}`; }).join(' '); sh+=`<polygon points="${pts}" fill="none" stroke="${P[2]}" stroke-width="${2.6-k*.4}" stroke-opacity="${.95-k*.2}"/>`; } break;
    case 'track': sh=`<path d="M8 86 C 30 86, 26 40, 50 40 S 70 70, 92 22" fill="none" stroke="${P[2]}" stroke-width="9" stroke-opacity=".25" stroke-linecap="round"/><path d="M8 86 C 30 86, 26 40, 50 40 S 70 70, 92 22" fill="none" stroke="${P[2]}" stroke-width="2.4" stroke-linecap="round"/><path d="M8 86 C 30 86, 26 40, 50 40 S 70 70, 92 22" fill="none" stroke="${P[3]}" stroke-width="1" stroke-dasharray="3 4"/>`+[0,1,2].map(i=>`<rect x="${70+i*7}" y="${8+i*0}" width="6" height="6" fill="${(i%2)?P[2]:'none'}" stroke="${P[2]}" stroke-width="1"/>`).join(''); break;
    case 'field': sh=`<rect x="14" y="10" width="72" height="86" rx="2" fill="none" stroke="${P[2]}" stroke-width="2"/>`+[1,2,3,4,5,6,7].map(i=>`<line x1="14" y1="${10+i*10.75}" x2="86" y2="${10+i*10.75}" stroke="${P[2]}" stroke-width="${i===4?2:1}" stroke-opacity="${i===4?1:.5}"/>`).join('')+`<rect x="14" y="10" width="72" height="10.75" fill="${P[2]}" fill-opacity=".25"/><rect x="14" y="85.25" width="72" height="10.75" fill="${P[2]}" fill-opacity=".25"/>`; break;
    case 'bands': sh=`<g transform="rotate(-24 50 50)">`+[0,1,2,3,4,5,6].map(i=>`<rect x="-40" y="${-10+i*16}" width="180" height="7" fill="${P[2]}" fill-opacity="${.18+i*.1}"/>`).join('')+`</g>`; break;
    case 'star': { const st=(cx,cy,R,o)=>{ const pts=Array.from({length:10},(_,i)=>{ const a=-Math.PI/2+i*Math.PI/5, r=i%2?R*.42:R; return `${(cx+r*Math.cos(a)).toFixed(1)},${(cy+r*Math.sin(a)).toFixed(1)}`; }).join(' '); return `<polygon points="${pts}" fill="${P[2]}" fill-opacity="${o}"/>`; };
      sh=st(50,50,30,1)+st(20,22,7,.6)+st(82,30,5,.5)+st(78,80,8,.45)+st(18,78,5,.4); } break;
  }
  const w=e.p.length; const fs=w<=4?24:w<=6?19:w<=8?15:w<=9?13.5:12;
  return `<svg viewBox="0 0 100 128" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${P[0]}"/><stop offset="1" stop-color="${P[1]}"/></linearGradient></defs><rect width="100" height="128" fill="url(#${g})"/>${sh}<text x="50" y="118" text-anchor="middle" font-family="Geist,system-ui,sans-serif" font-weight="700" font-size="${fs}" letter-spacing="-.5" fill="${P[3]}">${e.p}</text></svg>`;
}
/* small upright ticket used on tiles and in the feed */
function stubTicket(it){ const e=EV[it.ev], d=D(e.off), s=seatCode(it);
  return `<span class="gk-tk">${poster(it.ev,it.r)}<span class="gk-tk-s"><b>${d.mo} ${d.day}</b><span>${s.sec==='GA'?'GA':`${s.sec}·${s.row}${s.seat==='–'?'':'-'+s.seat}`}</span></span></span>`; }
function tile(it,opt={}){ const e=EV[it.ev], R=RAR[it.r];
  return `<div class="gk-tile" style="--rc:${R.c}" data-pack="${it.pack}" data-i="${it.i}">
    <div class="gk-thumb"><span class="gk-badge">${R.n}</span>${it.tag?`<span class="gk-sub">${it.tag}</span>`:''}${stubTicket(it)}</div>
    <div class="gk-meta"><b title="${esc(opt.title||it.seat)}">${esc(opt.title||it.seat)}</b><span><i title="${esc(e.t)}">${opt.sub?esc(opt.sub):`${esc(e.t)} · ${dshort(e.off)}`}</i><strong>${money(opt.val??it.val)}</strong></span></div>${opt.foot||''}</div>`; }
function foil(p,opt={}){ const h=p.hue; return `<span class="gk-foil ${opt.cls||''}" style="--f1:${h[0]};--f2:${h[1]};--f3:${h[2]}"><i class="cr t"></i><i class="cr b"></i><span class="gk-foil-l"><em class="brand">gatefold</em><span class="q">?</span><span class="nm">${p.n}</span><small>One real ticket</small></span></span>`; }
function machine(p,opt={}){
  const shelf=['ufc','f1sat','nfl3','rc4'].map((id,k)=>`<span class="gk-slot">${stubTicket({ev:id,pack:'s',i:k,seat:'Floor'})}</span>`).join('');
  return `<div class="gk-mach ${opt.cls||''}" aria-hidden="true">
    <div class="gk-sign"><b>gatefold</b><small>Ticket drop machine</small></div>
    <div class="gk-case"><i class="gk-case-bg"></i><i class="gk-rail"></i>
      <div class="gk-arm"><i class="gk-cable"></i><svg class="gk-claw" viewBox="0 0 60 40"><path d="M30 0v8M30 8 L12 18 L8 34 M30 8 L48 18 L52 34" fill="none" stroke="url(#gkch)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="30" cy="9" r="5" fill="#C9D6EE"/><defs><linearGradient id="gkch" x1="0" x2="1"><stop offset="0" stop-color="#8FA2C7"/><stop offset=".5" stop-color="#F4F8FF"/><stop offset="1" stop-color="#7486AE"/></linearGradient></defs></svg>${foil(p)}</div>
      <div class="gk-shelf">${shelf}</div><i class="gk-glass"></i></div>
    <div class="gk-base"><span>Rip &amp; reveal</span></div></div>`;
}
function oddsHTML(p){ return TORDER.filter(t=>p.tiers[t]).map(t=>{ const T=p.tiers[t]; return `<div class="gk-odd" style="--rc:${RAR[t].c}"><div><span><b>${RAR[t].n}</b><em>${money(T.min)} – ${money(T.max)}</em></span><strong>${pct(T.p)}</strong></div><i><u style="width:${Math.max(T.p*100,.6)}%"></u></i></div>`; }).join(''); }
const pct=v=>{ const x=v*100; return (x>=10?x.toFixed(0):x>=1?x.toFixed(1):x.toFixed(2)).replace(/\.0+$/,'').replace(/(\.\d)0$/,'$1')+'%'; };
const ago=m=>m<1?'now':m<60?Math.round(m)+'m':Math.round(m/60)+'h';
return {DAY,today,D,dshort,cap,money,money2,esc,EV,RAR,TORDER,PACKS,pack,roll,seeded,seatCode,poster,stubTicket,tile,foil,machine,oddsHTML,pct,ago,BUYBACK:.9};
})();
