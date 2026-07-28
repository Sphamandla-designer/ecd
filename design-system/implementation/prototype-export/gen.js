// Emit the use_figma script bodies: one setup call, then N batch calls.
const fs = require('fs');
const C = JSON.parse(fs.readFileSync('compact.json'));
const IMGS = JSON.parse(fs.readFileSync('images.json'));
const PAGE = '20:41';
const LIMIT = 17000;

const AREAS = ['Onboarding & entry', 'Home & daily states', 'Classes & children', 'Attendance',
  'Consent', 'Staff', 'Income', 'Resources', 'Profile, exports & system'];

// stable order: area order, then annotation title
const keys = C.order.slice().sort((a, b) => {
  const A = C.screens[a], B = C.screens[b];
  const ai = AREAS.indexOf(A.area), bi = AREAS.indexOf(B.area);
  if (ai !== bi) return ai - bi;
  return A.title.localeCompare(B.title) || a.localeCompare(b);
});

// ---------------- setup ----------------
const setup = `const P = await figma.getNodeByIdAsync('${PAGE}');
await figma.setCurrentPageAsync(P);
const V={},TS={};
for (const v of await figma.variables.getLocalVariablesAsync()) V[v.name]=v;
for (const s of await figma.getLocalTextStylesAsync()) TS[s.name]=s;
await Promise.all([{family:'Quicksand',style:'SemiBold'},{family:'Inter',style:'Regular'},{family:'Inter',style:'Medium'}].map(f=>figma.loadFontAsync(f)));
const PT=n=>figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',V[n]);
async function T(style,chars,cv,name){const st=TS[style];const t=figma.createText();t.fontName=st.fontName;t.characters=chars;await t.setTextStyleIdAsync(st.id);if(cv)t.fills=[PT(cv)];t.name=name;return t;}

// decode the three exported logos into real Figma images (plugin bridge, no upload endpoint)
function b64(s){
  if (figma.base64Decode) return figma.base64Decode(s);
  const K='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  s=s.replace(/=+$/,''); const out=new Uint8Array(Math.floor(s.length*3/4)); let p=0,bits=0,acc=0;
  for(let i=0;i<s.length;i++){acc=(acc<<6)|K.indexOf(s[i]);bits+=6;if(bits>=8){bits-=8;out[p++]=(acc>>bits)&255;}}
  return out.subarray(0,p);
}
const RAW = ${JSON.stringify(Object.fromEntries(Object.keys(IMGS).map(k => [k, IMGS[k].b64])))};
const IMG = {};
for (const k of Object.keys(RAW)) IMG[k] = figma.createImage(b64(RAW[k])).hash;

const anchor = P.findOne(n => n.name === 'Legend');
const startY = anchor ? anchor.y + anchor.height + 160 : 2600;

const wrap = figma.createAutoLayout('VERTICAL', { name: 'Prototype export — every screen' });
wrap.fills=[]; P.appendChild(wrap); wrap.x=0; wrap.y=startY;
wrap.itemSpacing=64; wrap.counterAxisSizingMode='AUTO'; wrap.primaryAxisSizingMode='AUTO';

const head=figma.createAutoLayout('VERTICAL',{name:'Export header',itemSpacing:8});
head.fills=[]; wrap.appendChild(head); head.layoutSizingHorizontal='FIXED'; head.resize(1100,head.height);
head.appendChild(await T('Body/Overline','FULL PROTOTYPE EXPORT','role/text-mid','Eyebrow'));
head.appendChild(await T('Heading/H1','Every screen, as it ships','role/text-dark','Title'));
const d=await T('Body/Body','All ${keys.length} screens of the ELP prototype, rebuilt from the running app\\u2019s rendered DOM \\u2014 geometry, fills, borders, shadows, icons and text read straight off the live build rather than redrawn. Every layer is native and editable: text is real text, icons are real vectors.','role/text-mid','Description');
head.appendChild(d); d.textAutoResize='HEIGHT'; d.layoutSizingHorizontal='FILL';

const SEC={};
for (const area of ${JSON.stringify(AREAS)}) {
  const sec=figma.createAutoLayout('VERTICAL',{name:'Area · '+area,itemSpacing:20});
  sec.fills=[]; wrap.appendChild(sec); sec.counterAxisSizingMode='AUTO';
  sec.appendChild(await T('Heading/H2',area,'role/text-dark','Area title'));
  const grid=figma.createAutoLayout('HORIZONTAL',{name:'Grid · '+area,itemSpacing:48});
  grid.layoutWrap='WRAP'; grid.counterAxisSpacing=64; grid.fills=[];
  sec.appendChild(grid); grid.layoutSizingHorizontal='FIXED'; grid.resize(3600,grid.height);
  grid.counterAxisAlignItems='MIN';
  SEC[area]=grid.id;
}
const TABLES = ${JSON.stringify(C.tables)};
P.setSharedPluginData('elpx','tables',JSON.stringify(TABLES));
P.setSharedPluginData('elpx','images',JSON.stringify(IMG));
P.setSharedPluginData('elpx','sections',JSON.stringify(SEC));
return { createdNodeIds:[wrap.id], images:Object.keys(IMG).length, sections:Object.keys(SEC).length, startY };`;

fs.writeFileSync('out-setup.js', setup);

// ---------------- batches ----------------
const HEAD = `const P = await figma.getNodeByIdAsync('${PAGE}');
await figma.setCurrentPageAsync(P);
const T=JSON.parse(P.getSharedPluginData('elpx','tables'));
const IMG=JSON.parse(P.getSharedPluginData('elpx','images'));
const SEC=JSON.parse(P.getSharedPluginData('elpx','sections'));
const FN={I400:{family:'Inter',style:'Regular'},I500:{family:'Inter',style:'Medium'},I600:{family:'Inter',style:'Semi Bold'},I700:{family:'Inter',style:'Bold'},Q600:{family:'Quicksand',style:'SemiBold'}};
await Promise.all(Object.keys(FN).map(k=>figma.loadFontAsync(FN[k])));
const pt=i=>{const c=T.col[i];return{type:'SOLID',color:{r:c[0]/255,g:c[1]/255,b:c[2]/255},opacity:c[3]};};
const hex=i=>{const c=T.col[i];return'#'+[c[0],c[1],c[2]].map(v=>Math.max(0,Math.min(255,v)).toString(16).padStart(2,'0')).join('');};
const cache={};
async function grid(area){ if(!cache[area]) cache[area]=await figma.getNodeByIdAsync(SEC[area]); return cache[area]; }
const made=[];
async function build(S){
  const g=await grid(S.a);
  const f=figma.createFrame();
  f.name=S.n; f.clipsContent=true;
  f.fills=[{type:'SOLID',color:{r:1,g:1,b:1}}];
  g.appendChild(f);
  f.layoutSizingHorizontal='FIXED'; f.layoutSizingVertical='FIXED'; f.resize(S.w,S.h);
  for(const o of S.o){
    const k=o[0], x=o[1], y=o[2], w=o[3], h=o[4];
    if(k===0){
      const n=figma.createFrame(); n.name='shape'; n.clipsContent=o[11]>=0;
      f.appendChild(n); n.x=x; n.y=y; n.resize(w,h);
      const fl=[];
      if(o[5]>=0) fl.push(pt(o[5]));
      if(o[10]>=0){const G=T.sh[o[10]];const a=T.col[G[1]];const b=G[2]==null?[a[0],a[1],a[2],0]:T.col[G[2]];
        fl.push({type:'GRADIENT_LINEAR',gradientTransform:[[0,1,0],[-1,0,1]],gradientStops:[{position:0,color:{r:a[0]/255,g:a[1]/255,b:a[2]/255,a:a[3]}},{position:1,color:{r:b[0]/255,g:b[1]/255,b:b[2]/255,a:b[3]}}]});}
      n.fills=fl;
      if(o[6]>=0){const r=T.rad[o[6]];n.topLeftRadius=Math.min(r[0],w/2,h/2);n.topRightRadius=Math.min(r[1],w/2,h/2);n.bottomRightRadius=Math.min(r[2],w/2,h/2);n.bottomLeftRadius=Math.min(r[3],w/2,h/2);}
      if(o[7]>=0){n.strokes=[pt(o[7])];n.strokeAlign='INSIDE';const s=o[8]>=0?T.sw[o[8]]:[1,1,1,1];
        n.strokeTopWeight=s[0];n.strokeRightWeight=s[1];n.strokeBottomWeight=s[2];n.strokeLeftWeight=s[3];}
      if(o[9]>=0){const s=T.sh[o[9]];const c=T.col[s[0]];
        n.effects=[{type:'DROP_SHADOW',color:{r:c[0]/255,g:c[1]/255,b:c[2]/255,a:c[3]},offset:{x:s[1],y:s[2]},radius:s[3],spread:s[4],visible:true,blendMode:'NORMAL'}];}
      if(o[11]>=0){for(const c of T.dec[o[11]]){const e=figma.createEllipse();n.appendChild(e);e.name='decor';e.x=c[0]-c[2];e.y=c[1]-c[2];e.resize(c[2]*2,c[2]*2);e.fills=[pt(c[3])];}}
      if(o[12]>=0) n.opacity=o[12];
    } else if(k===1){
      const s=T.sty[o[6]]; const t=figma.createText();
      t.fontName=FN[s[0]+s[1]]||FN.I400;
      t.characters=o[7];
      t.fontSize=s[2]; t.lineHeight={unit:'PIXELS',value:s[3]};
      if(s[4]) t.letterSpacing={unit:'PIXELS',value:s[4]};
      t.fills=[pt(o[5])]; t.textAutoResize='NONE';
      f.appendChild(t); t.x=x; t.y=y; t.resize(w+2,Math.max(h,s[3]));
      if(s[5]==='C') t.textAlignHorizontal='CENTER'; else if(s[5]==='R') t.textAlignHorizontal='RIGHT';
      t.name=o[7].slice(0,42);
    } else if(k===2){
      let sv=T.svg[o[5]];
      if(o[6]>=0) sv=sv.split('currentColor').join(hex(o[6]));
      let n; try{ n=figma.createNodeFromSvg(sv); }catch(e){ continue; }
      f.appendChild(n); n.name='icon'; n.x=x; n.y=y; try{ n.resize(w,h); }catch(e){}
      if(o[7]>=0) n.opacity=o[7];
    } else if(k===3){
      const n=figma.createRectangle(); f.appendChild(n); n.x=x; n.y=y; n.resize(w,h);
      n.fills=[{type:'IMAGE',scaleMode:'FIT',imageHash:IMG[T.img[o[5]]]}];
      n.name=o[6]||'image';
    }
  }
  made.push(f.id);
}
`;
const TAIL = `for (const S of DATA) await build(S);
return { createdNodeIds: made, built: made.length };`;

let batches = [], cur = [], curLen = 0;
for (const k of keys) {
  const S = C.screens[k];
  const idx = keys.indexOf(k) + 1;
  const obj = { n: String(idx).padStart(3, '0') + ' · ' + S.title, a: S.area, w: S.w, h: S.h, o: S.ops };
  const s = JSON.stringify(obj);
  if (curLen + s.length > LIMIT && cur.length) { batches.push(cur); cur = []; curLen = 0; }
  cur.push(s); curLen += s.length + 1;
}
if (cur.length) batches.push(cur);

batches.forEach((b, i) => {
  const code = HEAD + 'const DATA=[' + b.join(',') + '];\n' + TAIL;
  fs.writeFileSync(`out-b${i + 1}.js`, code);
});
console.log('setup bytes', setup.length);
console.log('batches', batches.length, batches.map((b, i) => `b${i + 1}=${b.length} screens / ${fs.statSync(`out-b${i + 1}.js`).size}B`).join('  '));
