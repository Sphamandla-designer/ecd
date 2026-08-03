const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const { TREE } = require('./tree.js');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 2500, height: 1400 }, deviceScaleFactor: 1 });
  await p.goto('file://' + __dirname + '/coach.html');
  await p.waitForTimeout(5000);
  await p.addScriptTag({ content: 'window.__TREE = ' + TREE.toString() + ';' });
  const data = await p.evaluate(() => {
    let arts = [...document.querySelectorAll('*')].filter(e => { const r = e.getBoundingClientRect(); return Math.round(r.width) === 396 && r.height > 900; });
    arts = arts.filter(e => !arts.some(o => o !== e && o.contains(e)));
    const out = [];
    for (const w of arts) {
      const wr = w.getBoundingClientRect();
      const wx = Math.round(wr.left + scrollX), wy = Math.round(wr.top + scrollY);
      // label: nearest leaf above the wrapper matching CODE-NN
      let code = null;
      document.querySelectorAll('*').forEach(el => {
        if (code || el.children.length) return;
        const t = (el.textContent || '').trim().replace(/\s+/g, ' ');
        if (!/^[A-Z]{2,6}-\d{2}[a-z]?\b/.test(t) || t.length > 60) return;
        const r = el.getBoundingClientRect();
        const ex = Math.round(r.left + scrollX), ey = Math.round(r.top + scrollY);
        if (Math.abs(ex - wx) < 80 && ey >= wy - 90 && ey <= wy + 90) code = t;
      });
      const phone = [...w.querySelectorAll('*')].find(e => { const r = e.getBoundingClientRect(); return Math.round(r.width) === 396 && Math.round(r.height) === 812; });
      if (!phone) continue;
      out.push({ code, x: wx, y: wy, tree: window.__TREE(phone) });
    }
    return out;
  });
  data.sort((a, b2) => a.y - b2.y || a.x - b2.x);
  fs.writeFileSync('coach-screens.json', JSON.stringify(data));
  console.log('captured', data.length);
  console.log(data.map(d => (d.code || '??').padEnd(36) + JSON.stringify(d.tree).length).join('\n'));
  console.log('total bytes', JSON.stringify(data).length);
  await b.close();
})();
