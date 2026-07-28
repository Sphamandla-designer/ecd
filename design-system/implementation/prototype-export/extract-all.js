const { chromium } = require('playwright');
const fs = require('fs');
const { EXTRACT } = require('./extract.js');
const FILE = process.argv[2];

// <img> logos are blob: PNGs exported from Figma. Read them as base64 once and
// dedupe by content — figma.createImage() takes raw bytes through the plugin
// bridge, so no upload endpoint is involved.
const IMAGES = {};
async function resolveImages(page, d) {
  const imgs = d.ops.filter(o => o.t === 'm' && o.src);
  if (!imgs.length) return;
  const urls = [...new Set(imgs.map(o => o.src))];
  const map = await page.evaluate(async us => {
    const o = {};
    for (const u of us) {
      try {
        const r = await fetch(u); const bl = await r.blob();
        const b64 = await new Promise(res => { const fr = new FileReader(); fr.onload = () => res(String(fr.result).split(',')[1]); fr.readAsDataURL(bl); });
        const el = [...document.querySelectorAll('img')].find(i => (i.currentSrc || i.src) === u);
        o[u] = { b64, type: bl.type, alt: el ? el.alt : '', nw: el ? el.naturalWidth : 0, nh: el ? el.naturalHeight : 0 };
      } catch (e) { o[u] = null; }
    }
    return o;
  }, urls);
  for (const op of imgs) {
    const m = map[op.src];
    if (!m || !m.b64) { op.t = 'x'; op.v = 'IMAGE ' + op.w + '×' + op.h; delete op.src; continue; }
    let key = null;
    for (const k of Object.keys(IMAGES)) if (IMAGES[k].b64 === m.b64) { key = k; break; }
    if (!key) { key = 'img' + (Object.keys(IMAGES).length + 1); IMAGES[key] = m; }
    op.img = key; op.alt = m.alt; delete op.src;
  }
}

const ROUTES = [
  ['home'],['menu'],['notifications'],['notifSettings'],['attnAll'],
  ['classList'],['classDetail',{id:'c1'}],['addClass'],
  ['child',{id:'k1'}],['regStep1',{classId:'c1'}],['markLeft',{id:'k1'}],
  ['attendance',{classId:'c1'}],['attendanceSaved',{classId:'c1'}],['editAttendance',{classId:'c1'}],
  ['registerStatus',{classId:'c1'}],['selfRegShare',{classId:'c1'}],['selfRegStatus',{classId:'c1'}],
  ['sendConsent',{id:'k1',childId:'k1'}],['consentClass',{id:'c1',classId:'c1'}],['consentReceived',{id:'k1',childId:'k1'}],
  ['consentWithdraw',{id:'k1'}],['sentConfirm'],['deadlineWarning'],
  ['staffList'],['staffDetail',{id:'s2'}],['addStaff'],['removeStaff',{id:'s2'}],['staffRemoved'],
  ['income'],['whosPaid'],['paymentSaved'],['addExpense'],['monthSummary'],['setFees'],
  ['resourcesHub'],['resDetail',{name:'Running your preschool'}],['resDetail',{name:'Early learning activities'}],
  ['resDetail',{name:'Health and safety'}],['resDetail',{name:'Funding and subsidies'}],
  ['profileHome'],['siteDetails'],['idDoc'],
  ['exports'],['exportConfig'],['exportPreparing',{kind:'attendance',empty:false}],['exportReady'],
  ['exportQueued'],['exportFailed'],['exportEmpty'],
];

const KEYSUFFIX = {
  classDetail:'__c1', child:'__k1', regStep1:'__c1', markLeft:'__k1', attendance:'__c1',
  attendanceSaved:'__c1', editAttendance:'__c1', registerStatus:'__c1', selfRegShare:'__c1',
  selfRegStatus:'__c1', sendConsent:'__k1', consentClass:'__c1', consentReceived:'__k1',
  consentWithdraw:'__k1', staffDetail:'__s2', removeStaff:'__s2', coachVisit:''
};
let RES_N = 0;
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const out = {};
  const fail = [];
  const retried = [];

  // ---------- 1. routed app screens ----------
  const p = await b.newPage({ viewport: { width: 420, height: 1000 } });
  p.on('pageerror', e => fail.push('pageerror: ' + e.message.slice(0, 90)));
  await p.goto('file://' + FILE, { waitUntil: 'load' });
  await p.waitForTimeout(3500);
  for (const [name, params] of ROUTES) {
    const key = name === 'resDetail' ? 'app__resDetail__' + String(params.name).replace(/[^a-z0-9]+/gi,'-') : 'app__' + name + (KEYSUFFIX[name] || '');
    try {
      await p.evaluate(([n, pr]) => window.__elp.navigate(n, pr), [name, params || null]);
      await p.waitForTimeout(420);
      const d = await p.evaluate(EXTRACT);
      if (d) { await resolveImages(p, d); out[key] = d; } else fail.push(key + ': no root');
      await p.evaluate(() => window.__elp.switchTab('home'));
      await p.waitForTimeout(120);
    } catch (e) {
      fail.push(key + ': ' + e.message.slice(0, 80));
      try { await p.goto('file://' + FILE, { waitUntil: 'load' }); await p.waitForTimeout(3000); } catch (_) {}
    }
    if (!out[key]) {
      try {
        await p.goto('file://' + FILE, { waitUntil: 'load' }); await p.waitForTimeout(3000);
        await p.evaluate(([n, pr]) => window.__elp.navigate(n, pr), [name, params || null]);
        await p.waitForTimeout(500);
        const d2 = await p.evaluate(EXTRACT);
        if (d2) { await resolveImages(p, d2); out[key] = d2; retried.push(key); }
      } catch (_) {}
    }
  }
  // coachVisit has no stable seeded id — reach it the way a user does
  try {
    await p.goto('file://' + FILE, { waitUntil: 'load' }); await p.waitForTimeout(3000);
    await p.evaluate(() => window.__elp.navigate('menu'));
    await p.waitForTimeout(400);
    await p.locator('#root :text("Calendar")').first().click({ timeout: 2500 }).catch(() => {});
    await p.waitForTimeout(600);
    let hit = false;
    const rows = p.locator('#root div:has-text("visit")');
    const n = Math.min(await rows.count(), 12);
    for (let i = n - 1; i >= 0 && !hit; i--) {
      await rows.nth(i).click({ timeout: 1200 }).catch(() => {});
      await p.waitForTimeout(500);
      const d = await p.evaluate(EXTRACT);
      if (d && d.ops.length > 12) { await resolveImages(p, d); out['app__coachVisit'] = d; hit = true; }
    }
    if (!hit) fail.push('app__coachVisit: could not reach via calendar');
  } catch (e) { fail.push('app__coachVisit: ' + e.message.slice(0, 60)); }
  await p.close();

  // ---------- 2. home state matrix ----------
  const q = await b.newPage({ viewport: { width: 420, height: 1000 } });
  await q.goto('file://' + FILE, { waitUntil: 'load' });
  await q.waitForTimeout(3500);
  const SC = ['auto', 'attendance', 'consent', 'clear', 'month'];
  const SCLABEL = { auto: 'live', attendance: 'attendance-due', consent: 'consent-imminent', clear: 'all-clear', month: 'month-start' };
  for (const tenant of ['ecd', 'smartstart']) {
    await q.evaluate(t => { document.documentElement.dataset.tenant = t; window.dispatchEvent(new Event('elpsim')); }, tenant);
    for (const role of ['practitioner', 'principal']) {
      await q.evaluate(r => window.__elp.setRole(r), role);
      for (const off of [false, true]) {
        await q.evaluate(o => window.__elp.setOffline(o), off);
        for (const sc of SC) {
          if (tenant === 'smartstart' && (role === 'principal' || off) && sc !== 'auto') continue;
          const key = `state__${tenant}__${role}__${off ? 'offline' : 'online'}__${SCLABEL[sc]}`;
          try {
            await q.evaluate(s => { window.__elpSim = s; window.dispatchEvent(new Event('elpsim')); }, sc);
            await q.evaluate(() => window.__elp.switchTab('home'));
            await q.waitForTimeout(420);
            const d = await q.evaluate(EXTRACT);
            if (d) { await resolveImages(q, d); out[key] = d; } else fail.push(key + ': no root');
          } catch (e) { fail.push(key + ': ' + e.message.slice(0, 80)); }
        }
      }
    }
  }
  await q.close();

  // ---------- 3. onboarding flows ----------
  for (const flow of ['Full flow', 'Returning user flow', 'PIN set', 'PIN skipped', 'No session']) {
    const z = await b.newPage({ viewport: { width: 420, height: 1000 } });
    await z.goto('file://' + FILE, { waitUntil: 'load' });
    await z.waitForTimeout(3200);
    await z.locator('button:has-text("Onboarding")').first().click().catch(() => {});
    await z.waitForTimeout(700);
    await z.locator(`button:has-text("${flow}")`).first().click().catch(() => {});
    await z.waitForTimeout(700);
    const slug = flow.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    let prev = '';
    for (let i = 0; i < 14; i++) {
      const t = await z.locator('#root').innerText();
      if (t === prev) break; prev = t;
      const key = `onb__${slug}__${String(i).padStart(2, '0')}`;
      const d = await z.evaluate(EXTRACT);
      if (d) { await resolveImages(z, d); out[key] = d; } else fail.push(key + ': no root');
      const btns = z.locator('#root button');
      const n = await btns.count();
      let clicked = false;
      for (let j = n - 1; j >= 0 && !clicked; j--) {
        const el = btns.nth(j);
        const label = (await el.innerText().catch(() => '')) || '';
        if (/next|continue|send|verify|save|done|agree|accept|start|got it|skip|yes|i teach|i run|sign in|use|confirm/i.test(label)) {
          await el.click({ timeout: 1500 }).catch(() => {}); clicked = true;
        }
      }
      if (!clicked) break;
      await z.waitForTimeout(650);
    }
    await z.close();
  }

  fs.writeFileSync('screens.json', JSON.stringify(out));
  fs.writeFileSync('images.json', JSON.stringify(IMAGES));
  console.log('distinct images:', Object.keys(IMAGES).length, Object.keys(IMAGES).map(k => k + ' ' + IMAGES[k].alt + ' ' + IMAGES[k].nw + 'x' + IMAGES[k].nh + ' ' + Math.round(IMAGES[k].b64.length/1024) + 'kB').join(' | '));
  const keys = Object.keys(out);
  const bytes = keys.map(k => JSON.stringify(out[k]).length);
  console.log('screens extracted:', keys.length);
  console.log('total bytes:', JSON.stringify(out).length, 'max screen:', Math.max(...bytes), 'avg:', Math.round(bytes.reduce((a, c) => a + c, 0) / keys.length));
  console.log('total ops:', keys.reduce((a, k) => a + out[k].ops.length, 0));
  if (retried.length) console.log('recovered after reload:', retried);
  if (fail.length) console.log('FAILURES (' + fail.length + '):', fail.slice(0, 10));
  await b.close();
})();
