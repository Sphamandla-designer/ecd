const fs = require('fs');
const C = JSON.parse(fs.readFileSync('compact-admin.json'));

const BUILDER = `
const PG=figma.root.children.find(p=>p.name===PAGE);
await figma.setCurrentPageAsync(PG);
const M=JSON.parse(figma.root.getSharedPluginData('ecdadmin','maps'));
const T=JSON.parse(figma.root.getSharedPluginData('ecdadmin','tables'));
const RU=JSON.parse(figma.root.getSharedPluginData('ecdadmin','reuse'));
const V={};for(const v of await figma.variables.getLocalVariablesAsync('COLOR'))V[v.name]=v;
const TS={};for(const s of await figma.getLocalTextStylesAsync())TS[s.name]=s;
const FN={Q400:{family:'Quicksand',style:'Regular'},Q500:{family:'Quicksand',style:'Medium'},Q600:{family:'Quicksand',style:'SemiBold'},Q700:{family:'Quicksand',style:'Bold'},I400:{family:'Inter',style:'Regular'},I500:{family:'Inter',style:'Medium'},I600:{family:'Inter',style:'Semi Bold'},I700:{family:'Inter',style:'Bold'}};
await Promise.all(Object.keys(FN).map(k=>figma.loadFontAsync(FN[k])));
const hx=i=>{const c=T.col[i];return'#'+[c[0],c[1],c[2]].map(v=>v.toString(16).padStart(2,'0')).join('').toUpperCase();};
function paint(i,kind){if(i<0)return null;const c=T.col[i];if(!c||c.length<3)return null;const a=c[3]===undefined?1:c[3];const p={type:'SOLID',color:{r:c[0]/255,g:c[1]/255,b:c[2]/255}};if(a<1)p.opacity=a;const nm=M[kind][hx(i)];if(nm&&V[nm]&&a===1)return figma.variables.setBoundVariableForPaint(p,'color',V[nm]);return p;}
const AL={MIN:'MIN',MAX:'MAX',CENTER:'CENTER',SPACE_BETWEEN:'SPACE_BETWEEN',BASELINE:'BASELINE'};
function deref(n){return n[0]===9?RU[n[1]]:n;}
function firstText(n){n=deref(n);if(n[0]===1)return n[7];if(n[0]!==0)return null;for(const k of n[14]){const t=firstText(k);if(t)return t;}return null;}
function frameName(n){const t=firstText(n);const card=n[5]>=0&&n[7]>=0&&n[8]>=0;const L=n[11]>=0?T.lay[n[11]]:null;const base=card?'Card':L?(L[0]==='H'?'Row':'Stack'):'Group';return t?base+' · '+t.slice(0,26):base;}
async function build(n,parent){
 let ox=null,oy=null;
 if(n[0]===9){ox=n[2];oy=n[3];n=RU[n[1]];}
 const x=ox===null?n[1]:ox, y=oy===null?n[2]:oy;
 if(n[0]===1){
  const s=T.sty[n[6]];const t=figma.createText();t.fontName=FN[s[0]+s[1]]||FN.I400;t.characters=n[7]||' ';
  parent.appendChild(t);
  const nm=M.STY[s[0]+s[1]+'|'+s[2]];
  if(nm&&TS[nm]&&s[3]===-1){await t.setTextStyleIdAsync(TS[nm].id);}
  else{t.fontSize=s[2];t.lineHeight=s[3]>0?{unit:'PIXELS',value:s[3]}:{unit:'AUTO'};if(s[4])t.letterSpacing={unit:'PIXELS',value:s[4]};}
  const p=paint(n[5],'TEXT');if(p)t.fills=[p];
  t.name=(n[7]||'Text').slice(0,40);
  if(n[8]==='C')t.textAlignHorizontal='CENTER';else if(n[8]==='R')t.textAlignHorizontal='RIGHT';
  t.x=x;t.y=y;
  if(n[8]==='W'){t.textAutoResize='HEIGHT';try{t.resize(n[3]+2,Math.max(n[4],2));}catch(e){}}
  else{t.textAutoResize='WIDTH_AND_HEIGHT';}
  return t;
 }
 if(n[0]===2){
  let sv=T.svg[n[5]];if(n[6]>=0)sv=sv.split('currentColor').join(hx(n[6]));
  let g;try{g=figma.createNodeFromSvg(sv);}catch(e){return null;}
  parent.appendChild(g);g.name='Icon';g.x=x;g.y=y;try{g.resize(Math.max(1,n[3]),Math.max(1,n[4]));}catch(e){}
  if(n[7]>0&&n[7]<1)g.opacity=n[7];
  return g;
 }
 if(n[0]===3){const r=figma.createRectangle();parent.appendChild(r);r.name='Image';r.x=x;r.y=y;r.resize(Math.max(1,n[3]),Math.max(1,n[4]));r.fills=[{type:'SOLID',color:{r:.9,g:.91,b:.93}}];return r;}
 const f=figma.createFrame();parent.appendChild(f);
 f.x=x;f.y=y;f.resize(Math.max(1,n[3]),Math.max(1,n[4]));
 f.clipsContent=n[13]===1;
 const fills=[];const bp=paint(n[5],'FILL');if(bp)fills.push(bp);
 if(n[6]>=0){const G=T.g[n[6]];const a=G[0],b=G[1];const A=a[3]===undefined?1:a[3],B=b[3]===undefined?1:b[3];fills.push({type:'GRADIENT_LINEAR',gradientTransform:[[0,1,0],[-1,0,1]],gradientStops:[{position:0,color:{r:a[0]/255,g:a[1]/255,b:a[2]/255,a:A}},{position:1,color:{r:b[0]/255,g:b[1]/255,b:b[2]/255,a:B}}]});}
 f.fills=fills;
 if(n[7]>=0){const r=T.rd[n[7]];const mx=Math.min(n[3],n[4])/2;f.topLeftRadius=Math.min(r[0],mx);f.topRightRadius=Math.min(r[1],mx);f.bottomRightRadius=Math.min(r[2],mx);f.bottomLeftRadius=Math.min(r[3],mx);}
 if(n[8]>=0){const sp=paint(n[8],'STROKE');if(sp){f.strokes=[sp];f.strokeAlign='INSIDE';const w=n[9]>=0?T.sw[n[9]]:[1,1,1,1];f.strokeTopWeight=w[0];f.strokeRightWeight=w[1];f.strokeBottomWeight=w[2];f.strokeLeftWeight=w[3];}}
 if(n[10]>=0){const s=T.sh[n[10]];const c=s[0];f.effects=[{type:'DROP_SHADOW',color:{r:c[0]/255,g:c[1]/255,b:c[2]/255,a:c[3]===undefined?1:c[3]},offset:{x:s[1],y:s[2]},radius:s[3],spread:s[4],visible:true,blendMode:'NORMAL'}];}
 if(n[12]>0&&n[12]<1)f.opacity=n[12];
 f.name=frameName(n);
 for(const k of n[14])await build(k,f);
 if(n[11]>=0){const L=T.lay[n[11]];
  f.layoutMode=L[0]==='V'?'VERTICAL':'HORIZONTAL';
  f.primaryAxisSizingMode='FIXED';f.counterAxisSizingMode='FIXED';
  f.itemSpacing=(L[0]==='H'?(L[2]||L[1]):(L[1]||L[2]))||0;
  f.paddingTop=L[3];f.paddingRight=L[4];f.paddingBottom=L[5];f.paddingLeft=L[6];
  let pa=AL[L[7]]||'MIN';if(pa==='BASELINE')pa='MIN';f.primaryAxisAlignItems=pa;
  let ca=AL[L[8]]||'MIN';if(ca==='SPACE_BETWEEN')ca='MIN';if(ca==='BASELINE'&&L[0]!=='H')ca='MIN';f.counterAxisAlignItems=ca;
  if(L[9]){f.layoutWrap='WRAP';f.counterAxisSpacing=L[1]||0;}
  try{f.resize(Math.max(1,n[3]),Math.max(1,n[4]));}catch(e){}
 }
 return f;
}
const RAIL=JSON.parse(figma.root.getSharedPluginData('ecdadmin','rails')||'{}');
async function screen(pg,S,col,row){
 const H=Math.max(900,S.b-38+48);
 const root=figma.createFrame();pg.appendChild(root);
 root.name=S.m.n;root.x=col*1560;root.y=row;root.resize(1440,H);
 root.clipsContent=true;
 const BGV=V['role/background'];
 root.fills=[BGV?figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',BGV):{type:'SOLID',color:{r:0.933,g:0.949,b:0.965}}];
 const rid=RAIL[S.m.role];
 if(rid){const c=await figma.getNodeByIdAsync(rid);if(c){const i=c.createInstance();root.appendChild(i);i.x=0;i.y=0;try{i.resize(228,H);}catch(e){}i.name='Side navigation';}}
 const head=await build(S.head,root);if(head){head.x=228;head.y=0;head.resize(1212,52);head.name='Top bar';}
 const main=await build(S.main,root);if(main){main.x=228;main.y=52;try{main.resize(1212,H-52);}catch(e){}main.name='Main';}
 for(const o of S.over){const n=await build(o,root);if(n){n.x=0;n.y=0;try{n.resize(1440,H);}catch(e){}n.name='Overlay';}}
 return {id:root.id,h:H};
}
if(DATA.__rails){
 const out={};let rx=0;
 for(const r of ['backend','system','super']){
  const c=figma.createComponent();PG.appendChild(c);c.x=rx;c.y=1400;c.resize(228,1407);rx+=280;
  c.name='Navigation/Side rail · '+(r==='backend'?'Back-end user':r==='system'?'System admin':'Super admin');
  const RV=V['role/rail'];
  c.fills=[RV?figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',RV):{type:'SOLID',color:{r:39/255,g:56/255,b:90/255}}];c.clipsContent=true;
  const t=await build(DATA.__rails[r],c);if(t){t.x=0;t.y=0;try{t.resize(228,1407);}catch(e){}t.name='Rail';}
  c.description='Persistent side navigation for the '+r+' tier. Group headings and the item set change per tier; everything else is identical. Resize the instance vertically to match the screen.';
  out[r]=c.id;
 }
 figma.root.setSharedPluginData('ecdadmin','rails',JSON.stringify(out));
 return {rails:out};
}
const made=[];let col=0;
for(const k of Object.keys(DATA)){const r=await screen(PG,DATA[k],col,0);made.push({k:k,id:r.id,h:r.h,x:col*1560});col++;}
return {built:made.length,nodes:made};
`;

// index lookups baked into the builder source
const bgIdx = C.tables.col.findIndex(c => c[0] === 238 && c[1] === 242 && c[2] === 246);
const railIdx = C.tables.col.findIndex(c => c[0] === 39 && c[1] === 56 && c[2] === 90);
const builder = BUILDER;
fs.writeFileSync('out-setup-builder.js',
  'figma.root.setSharedPluginData(\'ecdadmin\',\'builder\',' + JSON.stringify(builder) + ');\nreturn {bytes:' + builder.length + '};');

const CALL = (page, data) =>
  'const AF=Object.getPrototypeOf(async function(){}).constructor;\n' +
  'const run=new AF(\'figma\',\'PAGE\',\'DATA\',figma.root.getSharedPluginData(\'ecdadmin\',\'builder\'));\n' +
  'return await run(figma,' + JSON.stringify(page) + ',' + JSON.stringify(data) + ');';

fs.writeFileSync('out-shells.js', CALL('18 — Components', { __rails: C.shells }));

const PAGES = {};
for (const k of Object.keys(C.screens)) { const s = C.screens[k]; (PAGES[s.m.pg] = PAGES[s.m.pg] || []).push(k); }
const PAGENAME = { '06': '06 — Dashboard', '07': '07 — User Management', '08': '08 — Site Management', '09': '09 — Child Management', '10': '10 — Caregiver Management', '11': '11 — Attendance', '12': '12 — Reports', '13': '13 — Notifications', '14': '14 — Roles & Permissions', '15': '15 — Tenant Administration', '16': '16 — Settings', '17': '17 — States' };
const LIMIT = 30000;
const batches = [];
for (const pg of Object.keys(PAGES).sort()) {
  let cur = [], len = 0;
  for (const k of PAGES[pg]) {
    const j = JSON.stringify(C.screens[k]);
    if (len + j.length > LIMIT && cur.length) { batches.push({ pg, keys: cur }); cur = []; len = 0; }
    cur.push(k); len += j.length;
  }
  if (cur.length) batches.push({ pg, keys: cur });
}
batches.forEach((b, i) => {
  const data = {}; for (const k of b.keys) data[k] = C.screens[k];
  const f = 'out-scr-' + String(i + 1).padStart(2, '0') + '-p' + b.pg + '.js';
  fs.writeFileSync(f, CALL(PAGENAME[b.pg], data));
  console.log(f, b.keys.join(','), fs.statSync(f).size);
});
console.log('builder bytes', builder.length);
