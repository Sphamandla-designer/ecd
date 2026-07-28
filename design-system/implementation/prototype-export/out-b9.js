const P = await figma.getNodeByIdAsync('20:41');
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
const DATA=[{"n":"098 · Export — ready","a":"Profile, exports & system","w":376,"h":760,"o":[[0,0,0,376,760,0,0,-1,-1,0,-1,-1,-1],[0,8,8,360,744,3,1,-1,-1,-1,-1,-1,-1],[0,8,8,360,56,0,-1,-1,-1,-1,-1,-1,-1],[2,34,24,24,24,11,3,-1],[1,76,24,56,23,3,3,"Ready"],[0,152,228,72,72,22,6,-1,-1,-1,-1,-1,-1],[2,173,249,30,30,23,3,-1],[1,78,313,220,25,0,22,"Your records are ready"],[1,51,354,274,44,16,23,"Keep a copy on your phone, or send it to someone."],[0,58,420,260,48,9,5,-1,-1,2,-1,-1,-1],[1,140,435,96,18,3,4,"Save to phone"],[0,58,480,260,48,3,5,9,0,-1,-1,-1,-1],[1,169,495,39,18,9,4,"Share"],[0,58,540,260,48,3,5,-1,-1,-1,-1,-1,-1],[1,170,555,35,18,16,4,"Done"]]},{"n":"099 · Menu (drawer)","a":"Profile, exports & system","w":376,"h":760,"o":[[0,0,0,376,760,0,0,-1,-1,0,-1,-1,-1],[0,8,8,360,744,3,1,-1,-1,-1,-1,-1,-1],[0,8,8,360,56,0,-1,-1,-1,-1,-1,-1,-1],[2,34,24,24,24,11,3,-1],[1,76,24,46,23,3,3,"Menu"],[1,24,80,43,15,16,9,"AREAS"],[0,24,104,328,80,3,4,23,2,1,-1,-1,-1],[0,41,122,44,44,20,4,-1,-1,-1,-1,-1,-1],[2,52,133,22,22,12,9,-1],[1,97,123,69,20,0,6,"Calendar"],[1,97,147,195,17,16,2,"Visits, holidays and deadlines"],[2,317,135,18,18,13,16,-1],[0,24,196,328,98,3,4,23,2,1,-1,-1,-1],[0,41,223,44,44,20,4,-1,-1,-1,-1,-1,-1],[2,52,234,22,22,14,9,-1],[1,97,214,87,20,0,6,"Community"],[1,97,238,164,37,16,2,"Ask and share with other preschools"],[2,317,236,18,18,13,16,-1],[0,24,306,328,80,3,4,23,2,1,-1,-1,-1],[0,41,324,44,44,20,4,-1,-1,-1,-1,-1,-1],[2,52,335,22,22,15,9,-1],[1,97,325,85,20,0,6,"Downloads"],[1,97,349,195,17,16,2,"Registers and reports to keep"],[2,317,337,18,18,13,16,-1],[1,24,410,64,15,16,9,"SETTINGS"],[0,24,430,328,314,3,4,23,2,-1,-1,-1,-1],[1,41,447,162,20,0,10,"Edit preschool details"],[2,317,448,18,18,13,16,-1],[0,25,483,326,52,-1,-1,23,1,-1,-1,-1,-1],[1,41,500,151,20,0,10,"Notification settings"],[2,317,501,18,18,13,16,-1],[0,25,535,326,52,-1,-1,23,1,-1,-1,-1,-1],[1,41,552,75,20,0,10,"Language"],[2,317,553,18,18,13,16,-1],[0,25,587,326,52,-1,-1,23,1,-1,-1,-1,-1],[1,41,604,113,20,0,10,"Help & support"],[2,317,605,18,18,13,16,-1],[0,25,639,326,52,-1,-1,23,1,-1,-1,-1,-1],[1,41,656,130,20,0,10,"Switch preschool"],[2,317,657,18,18,13,16,-1],[0,25,691,326,52,-1,-1,23,1,-1,-1,-1,-1],[1,41,708,62,20,24,10,"Sign out"]]},{"n":"100 · Notification settings","a":"Profile, exports & system","w":376,"h":760,"o":[[0,0,0,376,760,0,0,-1,-1,0,-1,-1,-1],[0,8,8,360,744,3,1,-1,-1,-1,-1,-1,-1],[0,8,8,360,56,0,-1,-1,-1,-1,-1,-1,-1],[2,34,24,24,24,11,3,-1],[1,76,24,173,23,3,3,"Notification settings"],[1,24,101,167,20,0,6,"What to tell me about"],[0,24,130,328,90,3,4,23,2,1,-1,-1,-1],[1,41,155,82,20,0,6,"Reminders"],[1,41,177,220,17,16,2,"Attendance, payments, deadlines"],[0,283,160,52,30,9,2,-1,-1,-1,-1,-1,-1],[0,308,163,24,24,3,6,-1,-1,-1,-1,-1,-1],[0,24,228,328,90,3,4,23,2,1,-1,-1,-1],[1,41,253,90,20,0,6,"Coach visits"],[1,41,275,214,17,16,2,"When your coach records a visit"],[0,283,258,52,30,9,2,-1,-1,-1,-1,-1,-1],[0,308,261,24,24,3,6,-1,-1,-1,-1,-1,-1],[0,24,326,328,90,3,4,23,2,1,-1,-1,-1],[1,41,351,64,20,0,6,"Updates"],[1,41,373,187,17,16,2,"New features and resources"],[0,283,356,52,30,23,2,-1,-1,-1,-1,-1,-1],[0,286,359,24,24,3,6,-1,-1,-1,-1,-1,-1],[1,24,437,130,20,0,6,"How to reach me"],[0,24,466,328,90,3,4,23,2,1,-1,-1,-1],[1,41,501,77,20,0,6,"In the app"],[0,283,496,52,30,9,2,-1,-1,-1,-1,-1,-1],[0,308,499,24,24,3,6,-1,-1,-1,-1,-1,-1],[0,24,564,328,90,3,4,23,2,1,-1,-1,-1],[1,41,599,135,20,0,6,"Push notifications"],[0,283,594,52,30,9,2,-1,-1,-1,-1,-1,-1],[0,308,597,24,24,3,6,-1,-1,-1,-1,-1,-1],[0,24,662,328,90,3,4,23,2,1,-1,-1,-1],[1,41,697,79,20,0,6,"WhatsApp"],[0,283,692,52,30,9,2,-1,-1,-1,-1,-1,-1],[0,308,695,24,24,3,6,-1,-1,-1,-1,-1,-1]]},{"n":"101 · Notifications","a":"Profile, exports & system","w":376,"h":760,"o":[[0,0,0,376,760,0,0,-1,-1,0,-1,-1,-1],[0,8,8,360,744,3,1,-1,-1,-1,-1,-1,-1],[0,8,8,360,56,0,-1,-1,-1,-1,-1,-1,-1],[2,34,24,24,24,11,3,-1],[1,76,24,109,23,3,3,"Notifications"],[1,286,28,46,15,3,11,"Settings"],[1,24,101,47,20,0,6,"Today"],[0,24,130,328,130,3,4,23,2,1,-1,-1,-1],[0,37,143,40,40,20,4,-1,-1,-1,-1,-1,-1],[2,46,152,22,22,16,9,-1],[1,89,144,195,42,0,6,"It's the 1st — record who's paid"],[1,89,188,223,37,16,2,"Tap to open this month’s payment checklist."],[1,89,231,40,15,16,12,"1m ago"],[0,329,147,10,10,9,6,-1,-1,-1,-1,-1,-1],[1,24,281,75,20,0,6,"This week"],[0,24,310,328,108,3,4,23,2,1,-1,-1,-1],[0,37,323,40,40,21,4,-1,-1,-1,-1,-1,-1],[2,46,332,22,22,17,25,-1],[1,89,324,156,20,0,6,"Coach visit recorded"],[1,89,346,201,37,16,2,"Nomsa visited on Saturday, 25 July"],[1,89,389,98,15,16,12,"Saturday, 25 July"],[0,329,327,10,10,9,6,-1,-1,-1,-1,-1,-1],[1,24,439,50,20,0,6,"Earlier"],[0,24,468,328,108,3,4,23,2,1,-1,-1,-1],[0,37,481,40,40,26,4,-1,-1,-1,-1,-1,-1],[2,46,490,22,22,18,27,-1],[1,89,482,165,20,0,6,"New resources added"],[1,89,504,200,37,16,2,"Two new activity guides are in Resources."],[1,89,547,94,15,16,12,"Monday, 20 July"]]},{"n":"102 · Preschool details","a":"Profile, exports & system","w":376,"h":760,"o":[[0,0,0,376,760,0,0,-1,-1,0,-1,-1,-1],[0,8,8,360,744,3,1,-1,-1,-1,-1,-1,-1],[0,8,8,360,56,0,-1,-1,-1,-1,-1,-1,-1],[2,34,24,24,24,11,3,-1],[1,76,24,128,23,3,3,"Your preschool"],[0,24,80,328,190,3,4,23,2,1,-1,-1,-1],[0,41,81,294,47,-1,-1,23,1,-1,-1,-1,-1],[1,41,95,39,17,16,2,"Name"],[1,174,95,161,20,0,18,"Little Stars Preschool"],[0,41,128,294,47,-1,-1,23,1,-1,-1,-1,-1],[1,41,142,55,17,16,2,"Address"],[1,169,142,166,20,0,18,"12 Main Road, Soweto"],[0,41,175,294,47,-1,-1,23,1,-1,-1,-1,-1],[1,41,189,52,17,16,2,"Contact"],[1,245,189,90,20,0,18,"011 123 4567"],[0,41,222,294,47,-1,-1,23,1,-1,-1,-1,-1],[1,41,236,71,17,16,2,"Open days"],[1,176,236,159,20,0,18,"Mon Tue Wed Thu Fri"],[1,43,283,289,17,16,24,"Only the principal can change these details."]]},{"n":"103 · Profile","a":"Profile, exports & system","w":376,"h":760,"o":[[0,0,0,376,760,0,0,-1,-1,0,-1,-1,-1],[0,8,8,360,744,3,1,-1,-1,-1,-1,-1,-1],[0,8,8,360,56,0,-1,-1,-1,-1,-1,-1,-1],[2,34,24,24,24,11,3,-1],[1,76,24,56,23,3,3,"Profile"],[0,152,80,72,72,20,6,-1,-1,-1,-1,-1,-1],[1,168,99,39,34,0,16,"BM"],[1,101,161,173,25,0,17,"Bulelwa Mahlangu"],[1,74,197,228,17,16,2,"Practitioner · Little Stars Preschool"],[0,24,232,328,182,3,4,23,2,1,-1,-1,-1],[1,41,249,165,15,9,9,"COMPLETE YOUR PROFILE"],[1,41,272,171,20,0,6,"Add your ID document"],[1,41,298,289,37,16,2,"There’s no rush — most people finish this in their first month."],[0,41,349,294,48,3,5,9,0,-1,-1,-1,-1],[1,153,364,70,18,9,4,"Add it now"],[1,24,435,114,20,0,6,"Your preschool"],[0,24,464,328,82,3,4,23,2,1,-1,-1,-1],[2,37,492,22,22,25,9,-1],[1,71,483,161,20,0,6,"Little Stars Preschool"],[1,71,509,107,17,16,2,"View site details"],[2,321,494,18,18,13,16,-1],[1,24,567,102,20,0,6,"Your network"],[0,24,596,328,150,3,4,23,2,1,-1,-1,-1],[0,41,597,294,47,-1,-1,23,1,-1,-1,-1,-1],[1,41,611,31,17,16,2,"Club"],[1,208,611,127,20,0,18,"Ekurhuleni North"],[0,41,644,294,47,-1,-1,23,1,-1,-1,-1,-1],[1,41,658,43,17,16,2,"Coach"],[1,225,658,110,20,0,18,"Nomsa Zwane"],[1,41,692,284,37,16,2,"Set by your organisation — ask your coach if something looks wrong."],[0,8,663,360,89,3,-1,23,1,-1,-1,-1,-1],[2,41,672,24,24,4,16,-1],[1,36,700,34,15,16,8,"Home"],[2,131,672,24,24,6,16,-1],[1,121,700,45,15,16,8,"Classes"],[2,221,672,24,24,9,16,-1],[1,203,700,60,15,16,8,"Resources"],[0,301,670,44,28,20,2,-1,-1,-1,-1,-1,-1],[2,311,672,24,24,10,9,-1],[1,304,700,38,15,0,7,"Profile"]]}];
for (const S of DATA) await build(S);
return { createdNodeIds: made, built: made.length };