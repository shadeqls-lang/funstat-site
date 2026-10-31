/* Gatefold Drops kit: data, odds and shared renderers. All events, seats and prices are invented. */
window.GK=(function(){
const DAY=864e5, today=new Date(); today.setHours(0,0,0,0);
const WD=['SUN','MON','TUE','WED','THU','FRI','SAT'], MO=['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
const D=n=>{ const d=new Date(today.getTime()+n*DAY); return {wd:WD[d.getDay()],day:String(d.getDate()).padStart(2,'0'),mo:MO[d.getMonth()],d}; };
const cap=w=>w[0]+w.slice(1).toLowerCase();
const dshort=n=>{ const x=D(n); return n===0?'Tonight':n===1?'Tomorrow':`${cap(x.wd)} ${+x.day} ${cap(x.mo)}`; };
const money=v=>'£'+(Math.round(v*100)/100).toLocaleString('en-GB',{minimumFractionDigits:v%1?2:0,maximumFractionDigits:2});
const money2=v=>'£'+(Math.round(v*100)/100).toLocaleString('en-GB',{minimumFractionDigits:2,maximumFractionDigits:2});
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* poster palettes: blue, navy, violet, ice */
const PAL=[
  ['#0B1C45','#1F5EFF','#B9DAFF','#FFFFFF'],
  ['#06102A','#3B2A8F','#A78BFA','#FFFFFF'],
  ['#E3EDFC','#B9DAFF','#1F5EFF','#0A1630'],
  ['#1F5EFF','#4F9DFF','#FFFFFF','#FFFFFF'],
  ['#0A1330','#0B2A8F','#7CC4FF','#FFFFFF'],
  ['#2A1F6B','#7B6CFF','#E3EDFC','#FFFFFF']
];
const EV={
  halcyon:{t:'Halcyon Drive',p:'HALCYON',v:'Riverside Arena',off:12,time:'20:00',k:'rings',c:1},
  mira:{t:'Mira Okafor',p:'MIRA',v:'Riverside Arena',off:20,time:'19:30',k:'sun',c:3},
  hoops:{t:'Capital Hoops Finals',p:'HOOPS',v:'Docklands Arena',off:28,time:'19:45',k:'court',c:0},
  northbank:{t:'Northbank v Ashdown',p:'NORTHBANK',v:'Northbank Stadium',off:14,time:'15:00',k:'bands',c:4},
  keeper:{t:'The Lighthouse Keeper',p:'KEEPER',v:'Alder Theatre',off:16,time:'19:30',k:'beam',c:0},
  atlas:{t:'Atlas & The Tide',p:'ATLAS',v:'The Glasshouse',off:0,time:'20:30',k:'wave',c:5},
  rook:{t:'Macbeth',p:'MACBETH',v:'The Round House Yard',off:0,time:'19:00',k:'arch',c:1},
  lena:{t:'Lena Voss Quartet',p:'LENA VOSS',v:'Basement 22',off:3,time:'21:00',k:'grid',c:4},
  thames:{t:'Thames Rowing Cup',p:'THAMES',v:'Putney Embankment',off:7,time:'11:00',k:'wave',c:2},
  paper:{t:'Paper Moons',p:'MOONS',v:'Southmoor Hall',off:6,time:'14:00',k:'sun',c:2},
  kit:{t:'Open Mic Marathon',p:'OPEN MIC',v:'The Lantern Rooms',off:1,time:'20:00',k:'grid',c:3},
  lowlight:{t:'Lowlight Festival',p:'LOWLIGHT',v:'Kelvin Fields, Glasgow',off:27,time:'12:00',k:'beam',c:5},
  velvet:{t:'Velvet Static',p:'VELVET',v:'Halle 9',off:18,time:'21:00',k:'bands',c:1},
  film:{t:'Short Film Night',p:'SHORTS',v:'Picturehouse Annex',off:2,time:'19:00',k:'arch',c:0},
  slam:{t:'Poetry Slam',p:'SLAM',v:'Brick Lane Hall',off:5,time:'20:00',k:'rings',c:2},
  jam:{t:'Late Jazz Jam',p:'JAM',v:'Basement 22',off:1,time:'22:00',k:'grid',c:1},
  records:{t:'Records Fair',p:'RECORDS',v:'Old Market Hall',off:4,time:'10:00',k:'rings',c:3},
  previews:{t:'Comedy Previews',p:'PREVIEWS',v:'The Lantern Rooms',off:2,time:'19:30',k:'sun',c:5},
  u21:{t:'Northbank U21 v Hale',p:'U21',v:'Northbank Stadium',off:3,time:'19:00',k:'bands',c:4},
  showcase:{t:'New Bands Showcase',p:'SHOWCASE',v:'The Glasshouse',off:9,time:'19:30',k:'wave',c:3},
  quiz:{t:'Late Quiz Night',p:'QUIZ',v:'The Anchor',off:1,time:'20:00',k:'grid',c:2},
  swim:{t:'Night Swim',p:'NIGHT SWIM',v:'Halle Two',off:2,time:'23:00',k:'wave',c:4},
  sunday:{t:'Sunday Session',p:'SUNDAY',v:'Riverside Terrace',off:1,time:'15:00',k:'sun',c:0}
};
const RAR={
  epic:{n:'Epic',c:'#A78BFA'},
  rare:{n:'Rare',c:'#3B7BFF'},
  unc:{n:'Uncommon',c:'#38C6D9'},
  com:{n:'Common',c:'#8C9AB5'}
};
const TORDER=['epic','rare','unc','com'];
/* pool item: [event, seat, rarity, tag, value] */
const PACKS=[
 {id:'starter',n:'Starter',price:5,odds:{epic:.01,rare:.04,unc:.20,com:.75},hue:['#4F9DFF','#1F5EFF','#0B1C45'],
  pool:[['quiz','Team of four','com','',3],['records','Early entry','com','',3],['swim','Entry before midnight','com','',3.5],['jam','Entry','com','',3.5],['u21','Main stand','com','',3.5],['slam','Entry','com','',4],['film','Seat','com','',4],['showcase','Standing','com','',4],['previews','Seat','com','',4.5],['kit','General admission','com','',3.5],
   ['kit','Front table','unc','',5.5],['thames','Riverbank','unc','',5.5],['lena','Standing','unc','',6],['sunday','Terrace','unc','',6.5],['paper','Balcony','unc','',6],['showcase','Standing + drink','unc','',5.5],
   ['thames','Enclosure','rare','',10],['lena','Table for one','rare','',12],['rook','Upper circle','rare','',14],['northbank','Upper tier','rare','',16],['atlas','General admission','rare','',18],
   ['atlas','Early entry','epic','',30],['rook','Stalls','epic','',35],['mira','Upper tier','epic','',40],['halcyon','Upper tier','epic','',48],['northbank','Lower tier','epic','',60],['halcyon','Lower tier','epic','',75],['hoops','Lower bowl','epic','',95],['halcyon','Floor, first rows','epic','FRONT ROW',180]]},
 {id:'weekend',n:'Weekend',price:20,odds:{epic:.025,rare:.08,unc:.30,com:.595},hue:['#7CC4FF','#3B7BFF','#0B2A8F'],
  pool:[['lena','Standing','com','',11],['paper','Stalls','com','',13],['thames','Enclosure','com','',13],['kit','Front table','com','',11],['rook','Upper circle','com','',15],['showcase','Balcony','com','',12],['sunday','Terrace + drink','com','',14],
   ['lena','Table for one','unc','',16],['northbank','Upper tier','unc','',18],['atlas','General admission','unc','',20],['rook','Dress circle','unc','',22],['velvet','Standing','unc','',19],
   ['atlas','Early entry','rare','',30],['mira','Upper tier','rare','',38],['halcyon','Upper tier','rare','',42],['rook','Stalls','rare','',35],['keeper','Stalls','rare','',32],['northbank','Lower tier','rare','',45],
   ['halcyon','Lower tier','epic','',72],['hoops','Lower bowl','epic','',95],['mira','Front row','epic','FRONT ROW',160],['northbank','Hospitality box','epic','VIP',140],['lowlight','Weekend pass','epic','SOLD OUT',189],['halcyon','Backstage after the show','epic','MEET',320]]},
 {id:'arena',n:'Arena',price:50,odds:{epic:.03,rare:.09,unc:.28,com:.60},hue:['#A78BFA','#3B2A8F','#06102A'],
  pool:[['mira','Upper tier','com','',34],['halcyon','Upper tier','com','',38],['hoops','Upper tier','com','',32],['northbank','Lower tier','com','',36],['keeper','Stalls','com','',30],['velvet','Standing','com','',28],
   ['halcyon','Lower tier','unc','',58],['mira','Lower tier','unc','',55],['hoops','Lower tier','unc','',48],['northbank','Lower centre','unc','',52],['keeper','Front stalls','unc','',45],
   ['hoops','Lower bowl','rare','',95],['halcyon','Floor','rare','',95],['mira','Floor','rare','',90],['lowlight','Day ticket','rare','',69],
   ['mira','Front row','epic','FRONT ROW',160],['hoops','Courtside','epic','COURTSIDE',240],['northbank','Hospitality box','epic','VIP',140],['halcyon','Soundcheck pass','epic','MEET',260],['halcyon','Backstage for two','epic','PAIR',590]]},
 {id:'headliner',n:'Headliner',price:100,was:200,isNew:true,odds:{epic:.03,rare:.12,unc:.35,com:.50},hue:['#E3EDFC','#7B6CFF','#1F5EFF'],
  pool:[['halcyon','Lower tier','com','',68],['mira','Lower tier','com','',66],['hoops','Lower bowl','com','',70],['keeper','Front stalls','com','',60],['lowlight','Day ticket','com','',66],
   ['halcyon','Floor','unc','',95],['mira','Floor','unc','',90],['hoops','Lower bowl, row A','unc','',110],['lowlight','Weekend pass','unc','',120],
   ['northbank','Hospitality box','rare','VIP',140],['mira','Front row','rare','FRONT ROW',160],['lowlight','Weekend + camping','rare','',175],['halcyon','Floor, row 1','rare','FRONT ROW',190],
   ['hoops','Courtside','epic','COURTSIDE',240],['halcyon','Soundcheck pass','epic','MEET',260],['mira','Meet and greet','epic','MEET',300],['halcyon','Backstage for two','epic','PAIR',590],['lowlight','Artist area pass','epic','VIP',790]]},
 {id:'invite',n:'Invite',price:0,code:true,hue:['#1A2547','#0B1C45','#06102A'],pool:[],odds:{}}
];
PACKS.forEach(p=>{
  p.items=p.pool.map((o,i)=>({i,pack:p.id,ev:o[0],seat:o[1],r:o[2],tag:o[3],val:o[4]}));
  p.tiers={}; TORDER.forEach(t=>{ const L=p.items.filter(x=>x.r===t); if(L.length) p.tiers[t]={p:p.odds[t],min:Math.min(...L.map(x=>x.val)),max:Math.max(...L.map(x=>x.val)),avg:L.reduce((s,x)=>s+x.val,0)/L.length,n:L.length}; });
  p.ev=Object.values(p.tiers).reduce((s,t)=>s+t.p*t.avg,0);
  p.top=p.items.length?Math.max(...p.items.map(x=>x.val)):0;
});
const pack=id=>PACKS.find(p=>p.id===id);
function roll(p,rng=Math.random){ let r=rng(),a=0,tier='com'; for(const t of TORDER){ if(!p.tiers[t]) continue; a+=p.tiers[t].p; if(r<a){ tier=t; break; } } const L=p.items.filter(x=>x.r===tier); return L[Math.floor(rng()*L.length)]; }
function seeded(s){ let h=1779033703^s.length; for(let i=0;i<s.length;i++){ h=Math.imul(h^s.charCodeAt(i),3432918353); h=h<<13|h>>>19; } return ()=>{ h=Math.imul(h^h>>>16,2246822507); h=Math.imul(h^h>>>13,3266489909); return ((h^=h>>>16)>>>0)/4294967296; }; }
const SEC={'Upper tier':'214','Lower tier':'104','Floor':'FLR','Lower bowl':'L1','Courtside':'CS','Stalls':'ST','Upper circle':'UC','Dress circle':'DC','Front stalls':'ST','Front row':'FLR'};
function seatCode(it){ const r=seeded(it.pack+it.i+it.ev); const sec=SEC[it.seat]||(/table/i.test(it.seat)?'T'+(1+Math.floor(r()*12)):'GA'); const row=sec==='GA'?'–':'ABCDEFGHJK'[Math.floor(r()*10)]; const seat=sec==='GA'?'–':String(1+Math.floor(r()*30)); return {sec,row,seat}; }

/* ---------- poster art (SVG) ---------- */
function poster(id,uid){
  const e=EV[id], P=PAL[e.c], g='g'+(uid||id)+Math.floor(Math.random()*1e6);
  let sh='';
  switch(e.k){
    case 'rings': for(let r=42;r>6;r-=8) sh+=`<circle cx="50" cy="50" r="${r}" fill="none" stroke="${P[2]}" stroke-opacity="${.25+(42-r)/60}" stroke-width="2.4"/>`; break;
    case 'sun': sh=`<circle cx="50" cy="56" r="26" fill="${P[2]}"/>`+[0,1,2,3,4].map(i=>`<rect x="0" y="${58+i*7}" width="100" height="${2+i*.9}" fill="url(#${g})"/>`).join(''); break;
    case 'bands': sh=`<g transform="rotate(-24 50 50)">`+[0,1,2,3,4,5,6].map(i=>`<rect x="-40" y="${-10+i*16}" width="180" height="7" fill="${P[2]}" fill-opacity="${.18+i*.1}"/>`).join('')+`</g>`; break;
    case 'grid': for(let y=0;y<7;y++) for(let x=0;x<7;x++) sh+=`<circle cx="${8+x*14}" cy="${10+y*12}" r="${1.2+((x+y)%4)*.7}" fill="${P[2]}" fill-opacity="${.35+((x*y)%5)/8}"/>`; break;
    case 'wave': sh=[0,1,2,3].map(i=>`<path d="M-5 ${44+i*11} C 15 ${32+i*11}, 35 ${56+i*11}, 55 ${44+i*11} S 95 ${32+i*11}, 110 ${44+i*11}" fill="none" stroke="${P[2]}" stroke-width="${3-i*.5}" stroke-opacity="${.95-i*.2}"/>`).join(''); break;
    case 'beam': sh=`<polygon points="50,6 18,92 34,92" fill="${P[2]}" fill-opacity=".35"/><polygon points="50,6 44,92 60,92" fill="${P[2]}" fill-opacity=".6"/><polygon points="50,6 70,92 86,92" fill="${P[2]}" fill-opacity=".3"/><circle cx="50" cy="8" r="4" fill="${P[2]}"/>`; break;
    case 'arch': sh=[0,1,2,3].map(i=>`<path d="M${14+i*9} 96 V${50+i*4} a${36-i*9} ${36-i*9} 0 0 1 ${72-i*18} 0 V96" fill="none" stroke="${P[2]}" stroke-width="2.6" stroke-opacity="${.95-i*.18}"/>`).join(''); break;
    case 'court': sh=`<rect x="12" y="14" width="76" height="80" rx="2" fill="none" stroke="${P[2]}" stroke-width="2"/><line x1="12" y1="54" x2="88" y2="54" stroke="${P[2]}" stroke-width="2"/><circle cx="50" cy="54" r="12" fill="none" stroke="${P[2]}" stroke-width="2"/><path d="M30 14 v14 a20 20 0 0 0 40 0 v-14" fill="none" stroke="${P[2]}" stroke-width="2"/><circle cx="50" cy="54" r="4" fill="${P[2]}"/>`; break;
  }
  const w=e.p.length; const fs=w<=4?24:w<=6?19:w<=8?15:12.5;
  return `<svg viewBox="0 0 100 128" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${P[0]}"/><stop offset="1" stop-color="${P[1]}"/></linearGradient></defs><rect width="100" height="128" fill="url(#${g})"/>${sh}<text x="50" y="118" text-anchor="middle" font-family="Geist,system-ui,sans-serif" font-weight="700" font-size="${fs}" letter-spacing="-.5" fill="${P[3]}">${e.p}</text></svg>`;
}
/* small upright ticket used on tiles and in the feed */
function stubTicket(it){ const e=EV[it.ev], d=D(e.off), s=seatCode(it);
  return `<span class="gk-tk">${poster(it.ev)}<span class="gk-tk-s"><b>${d.day} ${d.mo}</b><span>${s.sec==='GA'?'GA':`${s.sec}·${s.row}${s.seat}`}</span></span></span>`; }
function tile(it,opt={}){ const e=EV[it.ev], R=RAR[it.r];
  return `<div class="gk-tile" style="--rc:${R.c}" data-pack="${it.pack}" data-i="${it.i}">
    <div class="gk-thumb"><span class="gk-badge">${R.n}</span>${it.tag?`<span class="gk-sub">${it.tag}</span>`:''}${stubTicket(it)}</div>
    <div class="gk-meta"><b title="${esc(e.t)}">${esc(e.t)}</b><span><i>${opt.sub?esc(opt.sub):`${esc(it.seat)} · ${dshort(e.off)}`}</i><strong>${money(opt.val??it.val)}</strong></span></div>${opt.foot||''}</div>`; }
function foil(p,opt={}){ const h=p.hue; return `<span class="gk-foil ${opt.cls||''}" style="--f1:${h[0]};--f2:${h[1]};--f3:${h[2]}"><i class="cr t"></i><i class="cr b"></i><span class="gk-foil-l"><em class="brand">gatefold</em><span class="q">?</span><span class="nm">${p.n} drop</span><small>One real ticket</small></span></span>`; }
function machine(p,opt={}){
  const shelf=['halcyon','mira','hoops','lowlight'].map((id,k)=>`<span class="gk-slot">${stubTicket({ev:id,pack:'s',i:k,seat:'Floor'})}</span>`).join('');
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
