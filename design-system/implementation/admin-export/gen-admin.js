// Emit use_figma script bodies that rebuild each screen as real auto-layout.
const fs = require('fs');
const C = JSON.parse(fs.readFileSync('admin-compact.json'));
const LIMIT = 9000;

const ORDER = ['Users','Bulk Onboarding','New Registrations','Sites','Children',
  'Caregiver Registrations','Attendance','Coach Visits','Communication','Feedback & Cases','Reports'];

const HEAD = `const P = figma.currentPage;
await Promise.all([
  {family:'Quicksand',style:'Bold'},{family:'Quicksand',style:'SemiBold'},
  {family:'Quicksand',style:'Medium'},{family:'Quicksand',style:'Regular'},
  {family:'Inter',style:'Semi Bold'},{family:'Inter',style:'Regular'},{family:'Inter',style:'Bold'},
].map(f=>figma.loadFontAsync(f)));
const T = JSON.parse(P.getSharedPluginData('ecdadm','tables'));
const STY={}; for (const s of await figma.getLocalTextStylesAsync()) STY[s.name]=s;
const VAR={}; for (const v of await figma.variables.getLocalVariablesAsync('COLOR')) VAR[v.name]=v;
const FN={Quicksand:{400:'Regular',500:'Medium',600:'SemiBold',700:'Bold'},Inter:{400:'Regular',500:'Medium',600:'Semi Bold',700:'Bold'}};
function paint(i){const c=T.col[i];
  if(c[0]) return figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',VAR[c[0]]);
  return {type:'SOLID',color:{r:c[1]/255,g:c[2]/255,b:c[3]/255},opacity:c[4]};}
const AX=v=>(v==='BASELINE'?'MIN':v);
// layer names are derived, not shipped: the first text in the subtree names the frame
function firstText(n){ if(n[0]===1) return n[5]; if(n[0]===0){ for(const k of n[4]){ const t=firstText(k); if(t) return t; } } return ''; }
function label(n){ const t=(firstText(n)||'').trim().replace(/\s+/g,' '); return t?t.slice(0,36):'Group'; }

async function build(n,parent,pDir,pContentW){
  if(n[0]===1){
    const w=n[1],h=n[2],st=T.sty[n[3]],ci=n[4],chars=n[5],al=n[6]||0,grow=n[7]||0;
    const t=figma.createText();
    if(st[0]&&STY[st[0]]){t.fontName=STY[st[0]].fontName;t.characters=chars;await t.setTextStyleIdAsync(STY[st[0]].id);}
    else{t.fontName={family:st[1],style:FN[st[1]][st[2]]||'Regular'};t.characters=chars;t.fontSize=st[3];t.lineHeight={unit:'PIXELS',value:st[4]};if(st[5])t.letterSpacing={unit:'PIXELS',value:st[5]};}
    if(ci>=0)t.fills=[paint(ci)];
    t.name=(chars.trim()||'Text').slice(0,36);
    parent.appendChild(t);
    t.textAutoResize='HEIGHT';
    if(al==='C')t.textAlignHorizontal='CENTER'; else if(al==='R')t.textAlignHorizontal='RIGHT';
    // measure the run's natural width, then only pin it when the DOM box differs —
    // that keeps buttons hugging while table cells keep their grid track
    t.textAutoResize='WIDTH_AND_HEIGHT';
    const nat=t.width;
    if(grow||(pDir==='V'&&Math.abs(w-pContentW)<=1.5)){ t.textAutoResize='HEIGHT'; t.layoutSizingHorizontal='FILL'; }
    else if(Math.abs(nat-w)>2){ t.textAutoResize='HEIGHT'; t.resize(Math.max(1,w),t.height); }
    return t;
  }
  if(n[0]===2){
    const w=n[1],h=n[2];let sv=T.svg[n[3]];
    if(n[4]>=0){const c=T.col[n[4]];if(!c[0])sv=sv.split('currentColor').join('#'+[c[1],c[2],c[3]].map(v=>v.toString(16).padStart(2,'0')).join(''));}
    let v;try{v=figma.createNodeFromSvg(sv);}catch(e){return null;}
    parent.appendChild(v);v.name='icon';try{v.resize(w,h);}catch(e){}
    return v;
  }
  const w=n[1],h=n[2],L=T.lay[n[3]],kids=n[4];
  const g=(i,d)=>(n.length>i?n[i]:d);
  const bg=g(5,-1),bd=g(6,-1),rd=g(7,-1),sh=g(8,-1),op=g(9,-1),grow=g(10,0);
  const f=figma.createAutoLayout(L[0]==='H'?'HORIZONTAL':'VERTICAL',{name:label(n)});
  f.itemSpacing=L[1];
  f.paddingTop=L[2];f.paddingRight=L[3];f.paddingBottom=L[4];f.paddingLeft=L[5];
  f.primaryAxisAlignItems=AX(L[6]);f.counterAxisAlignItems=L[7]==='SPACE_BETWEEN'?'MIN':L[7];
  if(L[8]){f.layoutWrap='WRAP';f.counterAxisSpacing=L[9]||0;}
  f.fills=bg>=0?[paint(bg)]:[];
  if(bd>=0){const B=T.bd[bd];f.strokes=[paint(B[0])];f.strokeAlign='INSIDE';
    f.strokeTopWeight=B[1];f.strokeRightWeight=B[2];f.strokeBottomWeight=B[3];f.strokeLeftWeight=B[4];}
  if(rd>=0){const R=T.rd[rd];const m=Math.max(1,Math.min(w,h)/2);
    f.topLeftRadius=Math.min(R[0],m);f.topRightRadius=Math.min(R[1],m);f.bottomRightRadius=Math.min(R[2],m);f.bottomLeftRadius=Math.min(R[3],m);}
  if(sh>=0){const S=T.sh[sh];const c=T.col[S[0]];const rgb=c[0]?{r:0,g:0,b:0}:{r:c[1]/255,g:c[2]/255,b:c[3]/255};
    f.effects=[{type:'DROP_SHADOW',color:{r:rgb.r,g:rgb.g,b:rgb.b,a:c[0]?0.3:c[4]},offset:{x:S[1],y:S[2]},radius:S[3],spread:S[4],visible:true,blendMode:'NORMAL'}];}
  if(op>=0)f.opacity=op;
  parent.appendChild(f);
  const fill = grow||(pDir==='V'&&Math.abs(w-pContentW)<=1.5);
  if(fill) f.layoutSizingHorizontal='FILL';
  else { f.resize(Math.max(1,w),Math.max(1,h)); f.layoutSizingHorizontal='FIXED'; }
  f.layoutSizingVertical='HUG';
  const cw=(fill?f.width:w)-L[3]-L[5];
  let anyFill=false;
  for(const k of kids){ const c=await build(k,f,L[0],cw); if(c&&c.layoutSizingHorizontal==='FILL') anyFill=true; }
  // a box whose measured width is within a few px of its content is a chip/button:
  // let it hug, so a 1px font-metric difference cannot wrap the label
  if(!fill&&!anyFill&&!L[8]&&kids.length){
    f.layoutSizingHorizontal='HUG';
    if(Math.abs(f.width-w)>4){ f.layoutSizingHorizontal='FIXED'; f.resize(Math.max(1,w),f.height); }
  }
  if(Math.abs(f.height-h)>1.5){ f.layoutSizingVertical='FIXED'; f.resize(f.width,Math.max(1,h)); }
  return f;
}

const railComp=await figma.getNodeByIdAsync('33:402');
const barComp=await figma.getNodeByIdAsync('33:611');
const BAR_PROP=Object.keys(barComp.componentPropertyDefinitions).find(k=>k.indexOf('Page name#')===0);
const made=[];
async function screen(label, x, y){
  const D=DATA[label];
  const fr=figma.createFrame();
  fr.name=label+' — Back-end user';
  fr.layoutMode='HORIZONTAL';fr.primaryAxisSizingMode='FIXED';fr.counterAxisSizingMode='FIXED';
  fr.itemSpacing=0;fr.clipsContent=true;
  fr.fills=[figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',VAR['role/background'])];
  P.appendChild(fr);fr.x=x;fr.y=y;fr.resize(1440,800);

  const rail=railComp.createInstance();
  fr.appendChild(rail);rail.name='Side rail';
  rail.layoutSizingHorizontal='FIXED';rail.resize(228,rail.height);rail.layoutSizingVertical='FILL';
  const dash=rail.findOne(n=>n.type==='INSTANCE'&&n.name==='Dashboard');
  if(dash) dash.setProperties({State:'Default'});
  const cur=rail.findOne(n=>n.type==='INSTANCE'&&n.name===label);
  if(cur) cur.setProperties({State:'Active'});

  const col=figma.createAutoLayout('VERTICAL',{name:'Content',itemSpacing:0});
  col.fills=[];fr.appendChild(col);
  col.layoutSizingHorizontal='FILL';col.layoutSizingVertical='FILL';
  const bar=barComp.createInstance();
  col.appendChild(bar);bar.name='Top bar';
  bar.layoutSizingHorizontal='FILL';bar.layoutSizingVertical='FIXED';bar.resize(bar.width,52);
  bar.setProperties({[BAR_PROP]:label});

  const main=await build(D,col,'V',1212);
  main.name='Main';
  main.layoutSizingHorizontal='FILL';
  main.layoutSizingVertical='HUG';
  fr.resize(1440,52+main.height);
  made.push({name:fr.name,id:fr.id,h:Math.round(fr.height)});
}
`;

const TAIL = `for (const s of PLAN) await screen(s[0], s[1], s[2]);
return { createdNodeIds: made.map(m=>m.id), built: made };`;

// lay the screens out in a row under the design-system section
const Y = 2900, GAP = 120;
let x = 0;
const plan = {};
for (const k of ORDER) { plan[k] = [k, x, Y]; x += 1440 + GAP; }

const batches = []; let cur = [], curLen = 0;
for (const k of ORDER) {
  const s = JSON.stringify(C.screens[k]);
  if (curLen + s.length > LIMIT && cur.length) { batches.push(cur); cur = []; curLen = 0; }
  cur.push(k); curLen += s.length;
}
if (cur.length) batches.push(cur);

batches.forEach((b, i) => {
  const data = {}; for (const k of b) data[k] = C.screens[k];
  const code = HEAD + 'const DATA=' + JSON.stringify(data) + ';\n'
    + 'const PLAN=' + JSON.stringify(b.map(k => plan[k])) + ';\n' + TAIL;
  fs.writeFileSync(`out-adm-${i + 1}.js`, code);
});
console.log('batches', batches.length);
batches.forEach((b, i) => console.log(` ${i + 1}: ${b.join(', ')} → ${fs.statSync(`out-adm-${i + 1}.js`).size}B`));
