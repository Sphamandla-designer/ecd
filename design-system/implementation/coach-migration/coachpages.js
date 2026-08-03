const fs=require('fs');
const C=JSON.parse(fs.readFileSync('coach-compact.json'));
const TITLE={'ONB-01':'Welcome','ONB-02':'Stay Organised','ONB-03':'Capture Sessions','ONB-04':'Work Offline','ONB-05':'Permissions',
'AUTH-01':'Splash','AUTH-02':'Login','AUTH-03':'Forgot PIN','AUTH-04':'Session Expired',
'HOME-01':'Home','NOTIF-01':'Reminders',
'VIS-01':'Visit List','VIS-02':'Visit Details','VIS-03':'Confirm Arrival','VIS-07':'Visit Success','VIS-08':'Cancel Visit','VIS-09':'Reschedule Visit',
'WORK-01':'Overview','WORK-05':'Visit Summary',
'OBS-01':'Select Classroom','OBS-02':'Observation Checklist','OBS-03':'Strengths','OBS-04':'Improvement Areas',
'DISC-01':'Discussion & Agreements',
'ACT-02':'Action Plan','TASK-01':'Task List','TASK-02':'Task Detail',
'SITE-01':'Site List','SITE-02':'Site Details','SITE-03':'Practitioners Expanded','SITE-04':'Previous Visits Expanded',
'EX-01':'Issue Selection',
'OFF-02':'Offline Queue','OFF-03':'Sync Progress','OFF-04':'Sync Success','OFF-06':'Conflict Resolution',
'RES-01':'Resource Library','RES-02':'Resource Detail','RES-03':'Offline Resources',
'PROF-01':'Me','PROF-01b':'Profile','PROF-02':'Settings','PROF-03':'Help & Support','PROF-04':'About'};
const PAGE={AUTH:'04 Authentication',ONB:'05 Onboarding',HOME:'06 Home',NOTIF:'06 Home',VIS:'07 Visits',WORK:'08 Visit Workspace',
OBS:'09 Observation',DISC:'10 Coaching Discussion',ACT:'11 Action Plans',TASK:'11 Action Plans',SITE:'12 Sites',
EX:'13 Unexpected Situations',OFF:'14 Offline & Sync',RES:'15 Resources',PROF:'16 Profile & Settings'};
// explicit left-to-right journey order per page
const ORDER=['AUTH-01','AUTH-02','AUTH-03','AUTH-04','ONB-01','ONB-02','ONB-03','ONB-04','ONB-05','HOME-01','NOTIF-01',
'VIS-01','VIS-02','VIS-03','VIS-07','VIS-08','VIS-09','WORK-01','WORK-05','OBS-01','OBS-02','OBS-03','OBS-04','DISC-01',
'ACT-02','TASK-01','TASK-02','SITE-01','SITE-02','SITE-03','SITE-04','EX-01','OFF-02','OFF-03','OFF-04','OFF-06',
'RES-01','RES-02','RES-03','PROF-01','PROF-01b','PROF-02','PROF-03','PROF-04'];
const byCode={};
for(const s of C.screens){const code=(s.code||'').split(' ')[0];byCode[code]=s;}
const missing=ORDER.filter(c=>!byCode[c]);
if(missing.length)throw new Error('missing '+missing.join(','));
const pages={};
for(const code of ORDER){
  const pg=PAGE[code.replace(/-\d+[a-z]?$/,'')];
  (pages[pg]=pages[pg]||[]).push(code);
}
const files=[];
for(const [pg,codes] of Object.entries(pages)){
  const screens=codes.map((c,i)=>({name:c+' '+TITLE[c],x:i*596,y:0,n:byCode[c].n}));
  const body='const AF=Object.getPrototypeOf(async function(){}).constructor;\n'+
   "const run=new AF('figma','PAGE','DATA',figma.root.getSharedPluginData('coach','builder'));\n"+
   'return await run(figma,'+JSON.stringify(pg)+',{screens:'+JSON.stringify(screens)+'});';
  const f='out-coach-'+pg.slice(0,2)+'.js';
  fs.writeFileSync(f,body);
  files.push([f,pg,codes.length,fs.statSync(f).size]);
}
console.log(files.map(f=>f.join('  ')).join('\n'));
console.log('total',files.reduce((a,f)=>a+f[3],0));
