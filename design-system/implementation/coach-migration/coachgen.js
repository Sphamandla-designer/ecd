const fs=require('fs');
const C=JSON.parse(fs.readFileSync('coach-compact.json'));
const FILL={'#F7F9FB':'role/background','#FFFFFF':'role/surface','#EEF3F6':'role/surface-tint','#E4EBEF':'role/surface-tint','#1DBADF':'role/action','#D2F1F9':'role/action-subtle','#E7F6FB':'role/action-tint','#0B5568':'role/action-deep','#0F7690':'role/action-ink','#FF2180':'role/select','#FFD3E6':'role/select-subtle','#E2F0CD':'status/success/bg','#EAF4D8':'status/success/tint','#83BB26':'status/success/main','#CBE3A8':'status/success/line','#FDF0C8':'status/warn/bg','#FFFAEB':'status/warn/tint','#FFD525':'status/warn/main','#F0DDA6':'status/warn/line','#FFEEF4':'status/danger/bg','#FFF0F6':'status/danger/tint','#F0ECFA':'accent/coach/bg','#F7A600':'data/amber','#27385A':'role/text-dark','#D3DEE4':'role/line-soft','#C9D6DE':'role/line','#C5CFD8':'role/line-strong','#DDE7EC':'role/line-soft','#4F3A8C':'accent/coach/ink','#8F5B08':'status/warn/ink','#C1004F':'status/danger/ink'};
const TEXT={'#27385A':'role/text-dark','#4A5B6D':'role/text-strong','#42535F':'role/text-strong','#5A6B7D':'role/text-mid','#AEB8CC':'role/text-soft','#C5CFD8':'role/text-soft','#FFFFFF':'role/on-action','#0F7690':'role/action-ink','#0B5568':'role/action-deep','#3D6511':'status/success/ink','#8F5B08':'status/warn/ink','#6B4405':'status/warn/ink-deep','#5C4A00':'status/warn/ink-deepest','#C1004F':'status/danger/ink','#4F3A8C':'accent/coach/ink','#000000':'legacy/black','#FF2180':'role/select','#83BB26':'status/success/main','#FFD525':'status/warn/main','#1DBADF':'role/action','#D2F1F9':'role/action-subtle'};
const STROKE={'#C9D6DE':'role/line','#D3DEE4':'role/line-soft','#E4EBEF':'role/line-faint','#C5CFD8':'role/line-strong','#DDE7EC':'role/line-soft','#CBE3A8':'status/success/line','#F0DDA6':'status/warn/line','#1DBADF':'role/action','#FF2180':'role/select','#EEF3F6':'role/line-faint','#0F7690':'role/action-ink','#AEB8CC':'role/line-strong','#27385A':'role/text-dark','#83BB26':'status/success/main'};
const WT={400:'Regular',600:'SemiBold',700:'Bold'};
const STY={};
for(const s of C.tables.sty){const k=s[0]+s[1]+'|'+s[2];STY[k]=(s[0]==='Q'?'Quicksand':'Inter')+'/'+WT[s[1]]+' '+s[2];}
// audit: which hexes have no mapping?
const hx=c=>'#'+[c[0],c[1],c[2]].map(v=>v.toString(16).padStart(2,'0')).join('').toUpperCase();
const unmapped={fill:[],text:[],stroke:[]};
const seen={fill:new Set(),text:new Set(),stroke:new Set()};
const walk=a=>{if(a[0]===0){if(a[5]>=0)seen.fill.add(a[5]);if(a[8]>=0)seen.stroke.add(a[8]);a[14].forEach(walk);}if(a[0]===1&&a[5]>=0)seen.text.add(a[5]);};
C.screens.forEach(s=>walk(s.n));C.reuse.forEach(walk);
for(const k of ['fill','text','stroke']){const M={fill:FILL,text:TEXT,stroke:STROKE}[k];
 for(const i of seen[k]){const c=C.tables.col[i];if(c[3]!==undefined&&c[3]<1)continue;if(!M[hx(c)])unmapped[k].push(hx(c));}}
console.log('UNMAPPED fill:',[...new Set(unmapped.fill)].join(' '));
console.log('UNMAPPED text:',[...new Set(unmapped.text)].join(' '));
console.log('UNMAPPED stroke:',[...new Set(unmapped.stroke)].join(' '));
fs.writeFileSync('coach-maps.json',JSON.stringify({FILL,TEXT,STROKE,STY}));
console.log('maps bytes',JSON.stringify({FILL,TEXT,STROKE,STY}).length);
console.log('tables bytes',JSON.stringify(C.tables).length,'reuse',JSON.stringify(C.reuse).length);
