const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const { TREE } = require('./tree.js');

const ROLE = { backend: 'Back-end user', system: 'System admin', super: 'Super admin' };
const SIM = { normal: 'Normal', alert: 'High-alert', empty: 'Empty tenant', loading: 'Loading', offline: 'Offline', error: 'Error' };

// page = Figma page number, name = [Module] / [Screen] / [State]
const SCREENS = [
  // ---- 06 Dashboard
  { k: 'dash', pg: '06', n: 'Dashboard / Default', role: 'backend', mod: 'Dashboard' },
  { k: 'dash-alert', pg: '17', n: 'Dashboard / Default / High alert', role: 'backend', sim: 'alert', mod: 'Dashboard' },
  { k: 'dash-empty', pg: '17', n: 'Dashboard / Empty tenant', role: 'backend', sim: 'empty', mod: 'Dashboard' },
  { k: 'dash-loading', pg: '17', n: 'Dashboard / Loading', role: 'backend', sim: 'loading', mod: 'Dashboard' },
  { k: 'dash-offline', pg: '17', n: 'Dashboard / Offline', role: 'backend', sim: 'offline', mod: 'Dashboard' },
  { k: 'dash-error', pg: '17', n: 'Dashboard / Error', role: 'backend', sim: 'error', mod: 'Dashboard' },
  { k: 'dash-notifs', pg: '13', n: 'Notifications / Panel', role: 'backend', mod: 'Dashboard', act: [{ bell: 1 }] },
  { k: 'dash-palette', pg: '06', n: 'Dashboard / Command palette', role: 'backend', mod: 'Dashboard', act: [{ key: 'Meta+k' }] },
  // ---- 07 User management
  { k: 'users', pg: '07', n: 'Users / List', role: 'backend', mod: 'Users' },
  { k: 'users-detail', pg: '07', n: 'Users / Detail', role: 'backend', mod: 'Users', act: [{ text: 'Bulelwa Mahlangu' }] },
  { k: 'users-add', pg: '07', n: 'Users / Add User', role: 'backend', mod: 'Users', act: [{ text: '+ Add User' }] },
  { k: 'users-empty', pg: '17', n: 'Users / List / Empty tenant', role: 'backend', sim: 'empty', mod: 'Users' },
  { k: 'users-loading', pg: '17', n: 'Users / List / Loading', role: 'backend', sim: 'loading', mod: 'Users' },
  { k: 'users-error', pg: '17', n: 'Users / List / Error', role: 'backend', sim: 'error', mod: 'Users' },
  { k: 'users-offline', pg: '17', n: 'Users / List / Offline', role: 'backend', sim: 'offline', mod: 'Users' },
  { k: 'onboarding', pg: '07', n: 'Bulk Onboarding / Start', role: 'backend', mod: 'Bulk Onboarding' },
  { k: 'eoi', pg: '07', n: 'New Registrations / Pipeline', role: 'backend', mod: 'New Registrations' },
  // ---- 08 Site management
  { k: 'sites', pg: '08', n: 'Sites / List', role: 'backend', mod: 'Sites' },
  { k: 'sites-detail', pg: '08', n: 'Sites / Detail', role: 'backend', mod: 'Sites', act: [{ text: 'Little Stars Preschool' }] },
  // ---- 09 Child management
  { k: 'children', pg: '09', n: 'Children / List', role: 'backend', mod: 'Children' },
  { k: 'children-detail', pg: '09', n: 'Children / Detail', role: 'backend', mod: 'Children', act: [{ text: 'Lerato Mokoena' }] },
  // ---- 10 Caregiver management
  { k: 'submissions', pg: '10', n: 'Caregiver Registrations / Queue', role: 'backend', mod: 'Caregiver Registrations' },
  // ---- 11 Attendance
  { k: 'attendance', pg: '11', n: 'Attendance / Missing Registers', role: 'backend', mod: 'Attendance' },
  { k: 'attendance-queue', pg: '11', n: 'Attendance / Sync Queue', role: 'backend', mod: 'Attendance', act: [{ text: 'Sync Queue' }] },
  { k: 'attendance-sub', pg: '11', n: 'Attendance / Submitted', role: 'backend', mod: 'Attendance', act: [{ text: 'Submitted' }] },
  { k: 'visits', pg: '11', n: 'Coach Visits / Upcoming Queue', role: 'backend', mod: 'Coach Visits' },
  { k: 'visits-done', pg: '11', n: 'Coach Visits / Completed Visits', role: 'backend', mod: 'Coach Visits', act: [{ text: 'Completed Visits' }] },
  // ---- 12 Reports  / 13 Notifications
  { k: 'reports', pg: '12', n: 'Reports / Placeholder', role: 'backend', mod: 'Reports' },
  { k: 'comms', pg: '13', n: 'Communication / Compose', role: 'backend', mod: 'Communication' },
  { k: 'cases', pg: '13', n: 'Feedback & Cases / List', role: 'backend', mod: 'Feedback & Cases' },
  // ---- 14 Roles & permissions / 15 Tenant admin / 16 Settings
  { k: 'roles', pg: '14', n: 'Roles & Permissions / Matrix', role: 'system', mod: 'Roles & Permissions' },
  { k: 'audit', pg: '15', n: 'Audit Log / List', role: 'system', mod: 'Audit Log' },
  { k: 'tenants', pg: '15', n: 'Tenants / List', role: 'super', mod: 'Tenants' },
  { k: 'portal', pg: '15', n: 'Portal Users / List', role: 'super', mod: 'Portal Users' },
  { k: 'settings', pg: '16', n: 'Tenant Settings / Default', role: 'system', mod: 'Tenant Settings' },
];

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 2600 }, deviceScaleFactor: 1 });
  await p.goto('file://' + __dirname + '/admin.html');
  await p.waitForTimeout(4000);
  await p.addScriptTag({ content: 'window.__TREE = ' + TREE.toString() + ';' });

  const out = {}; const shells = {}; const notes = {};
  let curRole = null, curSim = null;

  async function setRole(r) { if (curRole === r) return; await p.locator('button').filter({ hasText: new RegExp('^' + ROLE[r] + '$') }).first().click(); await p.waitForTimeout(400); curRole = r; }
  async function setSim(s) { const t = SIM[s || 'normal']; if (curSim === t) return; await p.locator('button').filter({ hasText: new RegExp('^' + t + '$') }).first().click(); await p.waitForTimeout(400); curSim = t; }

  for (const sc of SCREENS) {
    try {
      await p.keyboard.press('Escape'); await p.waitForTimeout(150);
      await setRole(sc.role);
      await setSim(sc.sim);
      await p.locator('aside button').filter({ hasText: sc.mod }).first().click({ timeout: 8000 });
      await p.waitForTimeout(500);
      for (const a of (sc.act || [])) {
        if (a.text) { await p.locator('main').locator('div,button,span').filter({ hasText: new RegExp('^' + a.text.replace(/[+*?^$.[\]{}()|\\]/g, '\\$&') + '$') }).last().click({ timeout: 8000 }); }
        else if (a.bell) { await p.locator('header button').last().click({ timeout: 8000 }); }
        else if (a.key) { await p.keyboard.press(a.key); }
        await p.waitForTimeout(500);
      }
      const data = await p.evaluate(() => {
        const main = document.querySelector('main');
        let bot = 0; main.querySelectorAll('*').forEach(e => { const r = e.getBoundingClientRect(); if (r.height && r.width) bot = Math.max(bot, r.bottom); });
        const t = window.__TREE(main);
        const head = window.__TREE(document.querySelector('header'));
        const roots = [...document.querySelectorAll('*')].filter(e => getComputedStyle(e).position === 'fixed' && e.getBoundingClientRect().width > 200);
        const top = roots.filter(e => !roots.some(o => o !== e && o.contains(e)));
        const over = top.map(e => window.__TREE(e));
        return { main: t, head, mainBottom: Math.round(bot), over };
      });
      out[sc.k] = { meta: sc, main: data.main, head: data.head, over: data.over, contentBottom: data.mainBottom };
      console.log(sc.k.padEnd(20), 'bytes', JSON.stringify(data.main).length, 'bottom', data.mainBottom, 'overlays', data.over.length);
    } catch (e) {
      console.log(sc.k.padEnd(20), 'FAILED', String(e).split('\n')[0].slice(0, 120));
    }
  }

  // shells, one per tier
  for (const r of ['backend', 'system', 'super']) {
    await setRole(r); await setSim('normal');
    await p.locator('aside button').filter({ hasText: 'Dashboard' }).first().click();
    await p.waitForTimeout(400);
    shells[r] = await p.evaluate(() => ({ aside: window.__TREE(document.querySelector('aside')) }));
    console.log('shell', r, JSON.stringify(shells[r]).length);
  }

  fs.writeFileSync('screens-admin.json', JSON.stringify({ screens: out, shells }));
  console.log('TOTAL', JSON.stringify({ screens: out, shells }).length);
  await b.close();
})();
