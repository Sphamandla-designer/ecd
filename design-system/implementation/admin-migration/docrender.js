// Documentation renderer, stored once in the Figma file and invoked per page.
// Signature: (figma, PAGE, DATA) where DATA = { docs: { "<frame name>": {...} } }
const DOCRENDER = `
const PG=figma.root.children.find(p=>p.name===PAGE);
await figma.setCurrentPageAsync(PG);
const V={};for(const v of await figma.variables.getLocalVariablesAsync('COLOR'))V[v.name]=v;
const TS={};for(const s of await figma.getLocalTextStylesAsync())TS[s.name]=s;
await Promise.all([{family:'Quicksand',style:'SemiBold'},{family:'Quicksand',style:'Bold'},{family:'Quicksand',style:'Medium'},{family:'Quicksand',style:'Regular'},{family:'Inter',style:'Regular'},{family:'Inter',style:'Semi Bold'},{family:'Inter',style:'Bold'}].map(f=>figma.loadFontAsync(f)));
const P=n=>V[n]?figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',V[n]):{type:'SOLID',color:{r:0,g:0,b:0}};
async function T(style,chars,cv,name,w){
 const t=figma.createText();t.fontName=TS[style].fontName;t.characters=chars===''?' ':chars;
 await t.setTextStyleIdAsync(TS[style].id);t.fills=[P(cv)];t.name=name||chars.slice(0,32);
 if(w){t.textAutoResize='HEIGHT';t.resize(w,t.height);}else{t.textAutoResize='WIDTH_AND_HEIGHT';}
 return t;
}
function col(dir,props){const f=figma.createAutoLayout(dir,props);f.fills=[];return f;}

// one documentation section: heading + body lines
async function section(parent,w,title,lines){
 if(!lines||!lines.length)return null;
 const s=col('VERTICAL',{name:'Doc · '+title,itemSpacing:6});
 parent.appendChild(s);s.layoutSizingHorizontal='FILL';s.layoutSizingVertical='HUG';
 const h=await T('Display/Rail group',title,'role/text-soft','Heading');
 s.appendChild(h);
 for(const ln of lines){
  const row=col('HORIZONTAL',{name:'Line',itemSpacing:8});
  s.appendChild(row);row.layoutSizingHorizontal='FILL';row.layoutSizingVertical='HUG';
  row.counterAxisAlignItems='MIN';
  if(ln[0]==='•'){
   const b=await T('Body/Body','—','role/text-soft','Bullet');row.appendChild(b);
   const t=await T('Body/Body',ln.slice(1).trim(),'role/text-dark','Text',w-24);row.appendChild(t);t.layoutSizingHorizontal='FILL';
  }else{
   const t=await T('Body/Body',ln,'role/text-dark','Text',w);row.appendChild(t);t.layoutSizingHorizontal='FILL';
  }
 }
 return s;
}

const TONE={ux:['status/info/bg','status/info/ink','role/line','🟦','UX DECISION'],
 mvp:['status/success/bg','status/success/ink','status/success/line','🟩','MVP REQUIREMENT'],
 asm:['annotation/bg','annotation/ink','annotation/line','🟨','ASSUMPTION'],
 fut:['status/warn/bg','status/warn/ink','status/warn/line','🟧','FUTURE ENHANCEMENT'],
 q:['status/danger/bg','status/danger/ink','status/danger/line','🟥','OPEN QUESTION']};

async function annotation(parent,kind,text){
 const t=TONE[kind]||TONE.ux;
 const c=col('VERTICAL',{name:'Annotation · '+t[4],itemSpacing:6});
 c.paddingTop=14;c.paddingBottom=14;c.paddingLeft=14;c.paddingRight=14;
 c.cornerRadius=10;c.fills=[P(t[0])];c.strokes=[P(t[2])];c.strokeWeight=1;c.strokeAlign='INSIDE';
 parent.appendChild(c);c.layoutSizingHorizontal='FILL';c.layoutSizingVertical='HUG';
 c.appendChild(await T('Display/Rail group',t[3]+'  '+t[4],'role/text-mid','Kind'));
 const b=await T('Body/Body',text,'role/text-dark','Note',292);
 c.appendChild(b);b.layoutSizingHorizontal='FILL';
 return c;
}

const made=[];
const frames=PG.children.filter(n=>n.type==='FRAME');
for(const key of Object.keys(DATA.docs)){
 const D=DATA.docs[key];
 const f=frames.find(n=>n.name===key);
 if(!f)continue;

 // ---- documentation block, directly beneath the screen ----
 const doc=col('VERTICAL',{name:'Documentation · '+key,itemSpacing:24});
 PG.appendChild(doc);
 doc.paddingTop=32;doc.paddingBottom=32;doc.paddingLeft=32;doc.paddingRight=32;
 doc.cornerRadius=10;doc.fills=[P('role/surface')];doc.strokes=[P('role/line')];doc.strokeWeight=1;doc.strokeAlign='INSIDE';
 doc.x=f.x;doc.y=f.y+f.height+56;
 doc.layoutSizingHorizontal='FIXED';doc.resize(1440,doc.height);
 doc.counterAxisSizingMode='FIXED';

 const head=col('VERTICAL',{name:'Doc header',itemSpacing:4});
 doc.appendChild(head);head.layoutSizingHorizontal='FILL';head.layoutSizingVertical='HUG';
 head.appendChild(await T('Display/Rail group','DOCUMENTATION','role/action-ink','Eyebrow'));
 head.appendChild(await T('Display/Card title',key,'role/text-dark','Screen name'));

 const cols=col('HORIZONTAL',{name:'Columns',itemSpacing:40});
 doc.appendChild(cols);cols.layoutSizingHorizontal='FILL';cols.layoutSizingVertical='HUG';
 cols.counterAxisAlignItems='MIN';
 const L=col('VERTICAL',{name:'Column A',itemSpacing:20});
 const R=col('VERTICAL',{name:'Column B',itemSpacing:20});
 cols.appendChild(L);cols.appendChild(R);
 L.layoutSizingHorizontal='FILL';L.layoutSizingVertical='HUG';
 R.layoutSizingHorizontal='FILL';R.layoutSizingVertical='HUG';
 const W=648;
 await section(L,W,'SCREEN PURPOSE',[D.p]);
 await section(L,W,'PRIMARY USER',[D.u]);
 await section(L,W,'USER GOAL',[D.g]);
 await section(L,W,'ENTRY POINTS',D.en);
 await section(L,W,'EXIT POINTS',D.ex);
 await section(L,W,'KEY BEHAVIOURS',D.kb);
 await section(L,W,'UX DESIGN DECISIONS',D.ux);
 await section(R,W,'MVP REQUIREMENTS',D.mvp);
 await section(R,W,'PERMISSIONS',D.pm);
 await section(R,W,'STATES COVERED',D.st);
 await section(R,W,'DEPENDENCIES',D.dp);
 await section(R,W,'OPEN QUESTIONS',D.oq);
 await section(R,W,'FUTURE ENHANCEMENTS',D.fe);
 await section(R,W,'WHITE LABEL READINESS',D.wl);
 await section(R,W,'OPEN ACCESS READINESS',D.oa);
 made.push(doc.id);

 // ---- annotations, outside the interface, to the right of the screen ----
 if(D.an&&D.an.length){
  const rail=col('VERTICAL',{name:'Annotations · '+key,itemSpacing:12});
  PG.appendChild(rail);
  rail.x=f.x+f.width+48;rail.y=f.y;
  rail.layoutSizingHorizontal='FIXED';rail.resize(320,rail.height);
  rail.counterAxisSizingMode='FIXED';
  rail.appendChild(await T('Display/Rail group','NOTES · '+key,'role/text-soft','Rail title'));
  for(const a of D.an)await annotation(rail,a[0],a[1]);
  made.push(rail.id);
 }
}
return {documented:made.length,ids:made};
`;
module.exports = { DOCRENDER };
