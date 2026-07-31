// Walk each admin screen's <main> and emit a nested, layout-aware tree that maps
// 1:1 onto Figma auto-layout. Not paint ops — real containers, real text.
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');

const WALK = function () {
  const R = n => Math.round(n * 10) / 10;
  const col = css => {
    if (!css) return null;
    const m = css.match(/rgba?\(([^)]+)\)/); if (!m) return null;
    const p = m[1].split(',').map(s => parseFloat(s.trim()));
    const a = p.length > 3 ? p[3] : 1;
    if (a === 0) return null;
    return [p[0], p[1], p[2], Math.round(a * 1000) / 1000];
  };
  const ALIGN = { 'flex-start': 'MIN', 'start': 'MIN', 'center': 'CENTER', 'flex-end': 'MAX', 'end': 'MAX', 'space-between': 'SPACE_BETWEEN', 'baseline': 'BASELINE', 'stretch': 'MIN', 'normal': 'MIN' };

  function radii(s) {
    const g = v => Math.round(parseFloat(v) || 0);
    const a = [g(s.borderTopLeftRadius), g(s.borderTopRightRadius), g(s.borderBottomRightRadius), g(s.borderBottomLeftRadius)];
    return (a[0] || a[1] || a[2] || a[3]) ? a : null;
  }
  function shadow(s) {
    if (!s.boxShadow || s.boxShadow === 'none') return null;
    const m = s.boxShadow.match(/(rgba?\([^)]+\))\s+(-?[\d.]+)px\s+(-?[\d.]+)px\s+(-?[\d.]+)px(?:\s+(-?[\d.]+)px)?/);
    if (!m) return null;
    return [col(m[1]), parseFloat(m[2]), parseFloat(m[3]), parseFloat(m[4]), parseFloat(m[5] || 0)];
  }
  function borders(s) {
    const w = ['Top', 'Right', 'Bottom', 'Left'].map(k => Math.round((parseFloat(s['border' + k + 'Width']) || 0) * 10) / 10);
    if (!w.some(v => v > 0)) return null;
    const i = w.findIndex(v => v > 0);
    const c = col(s['border' + ['Top', 'Right', 'Bottom', 'Left'][i] + 'Color']);
    if (!c) return null;
    return { w, c };
  }
  function fontOf(s) {
    return {
      f: s.fontFamily.split(',')[0].replace(/["']/g, ''),
      w: parseInt(s.fontWeight) || 400,
      s: Math.round(parseFloat(s.fontSize) * 10) / 10,
      lh: /px/.test(s.lineHeight) ? Math.round(parseFloat(s.lineHeight) * 10) / 10 : null,
      ls: Math.round((parseFloat(s.letterSpacing) || 0) * 100) / 100,
      uc: s.textTransform === 'uppercase',
      a: s.textAlign === 'center' ? 'C' : s.textAlign === 'right' ? 'R' : 'L',
    };
  }

  function build(el) {
    const s = getComputedStyle(el);
    if (s.display === 'none' || s.visibility === 'hidden') return null;
    const r = el.getBoundingClientRect();
    if (r.width < 0.5 || r.height < 0.5) return null;
    const tag = el.tagName.toLowerCase();

    if (tag === 'svg') {
      let sv = el.outerHTML.replace(/\s+/g, ' ').trim();
      sv = sv.replace(/var\(\s*(--[\w-]+)\s*(?:,[^)]*)?\)/g, (m, nm) => getComputedStyle(document.documentElement).getPropertyValue(nm).trim() || 'none');
      return { k: 's', w: R(r.width), h: R(r.height), v: sv, c: col(s.color) };
    }

    // ---- children in document order: elements recursed, text runs emitted -----
    const kids = [];
    // form controls render their value/placeholder with no DOM child to walk
    if (tag === 'select' || tag === 'input' || tag === 'textarea') {
      let v = '';
      if (tag === 'select') { const o = el.options[el.selectedIndex]; v = o ? o.text : ''; }
      else v = el.value || el.placeholder || '';
      if (v.trim()) {
        const fo = fontOf(s);
        const pl = parseFloat(s.paddingLeft) || 0, pr = parseFloat(s.paddingRight) || 0;
        kids.push({ k: 't', v: fo.uc ? v.toUpperCase() : v,
          x: R(r.left + pl), y: R(r.top), w: R(Math.max(1, r.width - pl - pr)),
          h: R(fo.lh || fo.s * 1.3), fo, c: col(s.color) });
      }
    }
    for (const n of el.childNodes) {
      if (n.nodeType === 3) {
        const t = n.nodeValue;
        if (!t || !t.trim()) continue;
        const rng = document.createRange(); rng.selectNodeContents(n);
        const rects = [...rng.getClientRects()];
        if (!rects.length) continue;
        let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
        for (const rc of rects) { x0 = Math.min(x0, rc.left); y0 = Math.min(y0, rc.top); x1 = Math.max(x1, rc.right); y1 = Math.max(y1, rc.bottom); }
        let v = t.replace(/\s+/g, ' ');
        const fo = fontOf(s);
        if (fo.uc) v = v.toUpperCase();
        kids.push({ k: 't', v, x: R(x0), y: R(y0), w: R(x1 - x0), h: R(y1 - y0), fo, c: col(s.color) });
      } else if (n.nodeType === 1) {
        const c = build(n); if (c) { c.x = R(n.getBoundingClientRect().left); c.y = R(n.getBoundingClientRect().top); kids.push(c); }
      }
    }

    const bg = col(s.backgroundColor);
    const bd = borders(s);
    const rd = radii(s);
    const sh = shadow(s);
    const op = parseFloat(s.opacity);

    // a lone text run in a box with no decoration is just text
    if (kids.length === 1 && kids[0].k === 't' && !bg && !bd && !rd && !sh) {
      const t = kids[0];
      t.w = R(r.width); t.h = R(r.height);
      t.x = R(r.left); t.y = R(r.top);
      t.grow = parseFloat(s.flexGrow) || 0;
      t.nm = (el.getAttribute('data-name') || '');
      return t;
    }

    // ---- layout ------------------------------------------------------------
    const disp = s.display;
    let dir = 'V', gap = 0, wrap = false, cols = 0;
    if (disp === 'flex' || disp === 'inline-flex') {
      dir = /row/.test(s.flexDirection) ? 'H' : 'V';
      const g = dir === 'H' ? s.columnGap : s.rowGap;
      gap = g === 'normal' ? 0 : (parseFloat(g) || 0);
      wrap = s.flexWrap === 'wrap';
    } else if (disp === 'grid' || disp === 'inline-grid') {
      cols = (s.gridTemplateColumns || '').trim().split(/\s+/).filter(Boolean).length || 1;
      dir = 'H';
      gap = parseFloat(s.columnGap) || 0;
      wrap = kids.length > cols;
    } else {
      // block: infer the rhythm from where the children actually landed
      dir = 'V';
      const ys = kids.filter(c => c.y !== undefined).map(c => ({ t: c.y, b: c.y + c.h }));
      const gaps = [];
      for (let i = 1; i < ys.length; i++) gaps.push(Math.round((ys[i].t - ys[i - 1].b) * 10) / 10);
      if (gaps.length) {
        const tally = {}; for (const g of gaps) tally[g] = (tally[g] || 0) + 1;
        gap = parseFloat(Object.keys(tally).sort((a, b) => tally[b] - tally[a])[0]) || 0;
        if (gap < 0) gap = 0;
      }
    }

    const node = {
      k: 'f', w: R(r.width), h: R(r.height),
      l: { d: dir, g: gap, wrap: wrap || undefined, cols: cols || undefined,
           p: [R(parseFloat(s.paddingTop) || 0), R(parseFloat(s.paddingRight) || 0), R(parseFloat(s.paddingBottom) || 0), R(parseFloat(s.paddingLeft) || 0)],
           j: ALIGN[s.justifyContent] || 'MIN', a: ALIGN[s.alignItems] || 'MIN',
           rg: (disp === 'grid' || disp === 'flex') ? (parseFloat(s.rowGap) || 0) : 0 },
      c: kids,
    };
    if (bg) node.bg = bg;
    if (bd) node.bd = bd;
    if (rd) node.rd = rd;
    if (sh) node.sh = sh;
    if (op < 1) node.op = Math.round(op * 100) / 100;
    node.grow = parseFloat(s.flexGrow) || 0;
    node.stretch = s.alignSelf === 'stretch' || (s.alignSelf === 'auto');
    node.nm = tag;
    return node;
  }

  const main = document.querySelector('main');
  const t = build(main);
  return t;
};

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 1700 } });
  await p.goto('file://' + __dirname + '/admin.html');
  await p.waitForTimeout(3500);
  const NAV = ['Dashboard','Users','Bulk Onboarding','New Registrations','Sites','Children','Caregiver Registrations','Attendance','Coach Visits','Communication','Feedback & Cases','Reports'];
  const out = {};
  for (const label of NAV) {
    await p.evaluate(l => { const t=[...document.querySelectorAll('nav button')].find(b=>b.textContent.trim().replace(/\s+/g,' ').indexOf(l)===0); if(t)t.click(); }, label);
    await p.waitForTimeout(800);
    out[label] = await p.evaluate(WALK);
  }
  fs.writeFileSync('admin-screens.json', JSON.stringify(out));
  const sizes = Object.keys(out).map(k => k + '=' + Math.round(JSON.stringify(out[k]).length / 1024) + 'kB');
  console.log(sizes.join('  '));
  console.log('total', Math.round(fs.statSync('admin-screens.json').size / 1024) + 'kB');
  await b.close();
})();
