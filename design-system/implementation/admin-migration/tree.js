// Walk a rendered subtree and emit a HIERARCHICAL description that maps 1:1 onto
// Figma frames — auto-layout where the DOM uses flex, absolute where it doesn't.
const TREE = function (rootSel) {
  const root = typeof rootSel === 'string' ? document.querySelector(rootSel) : rootSel;
  if (!root) return null;
  const RB = root.getBoundingClientRect();
  const OX = RB.left, OY = RB.top;
  const R = n => Math.round(n * 10) / 10;

  const cs = new Map();
  const S = el => { let v = cs.get(el); if (!v) { v = getComputedStyle(el); cs.set(el, v); } return v; };

  function colour(css) {
    if (!css) return null;
    const m = css.match(/rgba?\(([^)]+)\)/); if (!m) return null;
    const p = m[1].split(',').map(s => parseFloat(s.trim()));
    const a = p.length > 3 ? p[3] : 1;
    if (a === 0) return null;
    return [Math.round(p[0]), Math.round(p[1]), Math.round(p[2]), Math.round(a * 1000) / 1000];
  }
  function radii(s) {
    const g = v => Math.round(parseFloat(v) || 0);
    const a = [g(s.borderTopLeftRadius), g(s.borderTopRightRadius), g(s.borderBottomRightRadius), g(s.borderBottomLeftRadius)];
    return (a[0] || a[1] || a[2] || a[3]) ? a : null;
  }
  function shadow(s) {
    const v = s.boxShadow;
    if (!v || v === 'none') return null;
    const m = v.match(/(rgba?\([^)]+\))\s+(-?[\d.]+)px\s+(-?[\d.]+)px\s+(-?[\d.]+)px(?:\s+(-?[\d.]+)px)?/);
    if (!m) return null;
    return [colour(m[1]), parseFloat(m[2]), parseFloat(m[3]), parseFloat(m[4]), parseFloat(m[5] || 0)];
  }
  function grad(s) {
    const bi = s.backgroundImage;
    if (!bi || bi === 'none' || bi.indexOf('linear-gradient') < 0) return null;
    const stops = bi.match(/rgba?\([^)]+\)/g);
    if (!stops || stops.length < 2) return null;
    const ang = (bi.match(/(-?[\d.]+)deg/) || [])[1];
    return [colour(stops[0]), colour(stops[stops.length - 1]), ang === undefined ? 180 : parseFloat(ang)];
  }
  const ALIGN = { 'flex-start': 'MIN', 'start': 'MIN', 'flex-end': 'MAX', 'end': 'MAX', 'center': 'CENTER', 'space-between': 'SPACE_BETWEEN', 'baseline': 'BASELINE', 'stretch': 'MIN', 'normal': 'MIN' };

  function textRuns(el, s) {
    const out = [];
    for (const n of el.childNodes) {
      if (n.nodeType !== 3) continue;
      const raw = n.nodeValue;
      if (!raw || !raw.trim()) continue;
      const rng = document.createRange(); rng.selectNodeContents(n);
      const rects = [...rng.getClientRects()];
      if (!rects.length) continue;
      let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
      for (const rc of rects) { x0 = Math.min(x0, rc.left); y0 = Math.min(y0, rc.top); x1 = Math.max(x1, rc.right); y1 = Math.max(y1, rc.bottom); }
      const fs = Math.round(parseFloat(s.fontSize) * 10) / 10;
      // 'normal' must stay AUTO in Figma — approximating it drifts every baseline
      const lh = s.lineHeight === 'normal' ? -1 : Math.round(parseFloat(s.lineHeight) * 10) / 10;
      let v = raw.replace(/\s+/g, ' ');
      if (s.textTransform === 'uppercase') v = v.toUpperCase();
      out.push({
        t: 'T', x: R(x0 - OX), y: R(y0 - OY), w: R(x1 - x0), h: R(y1 - y0),
        f: /quicksand/i.test(s.fontFamily.split(',')[0]) ? 'Q' : 'I',
        fw: parseInt(s.fontWeight) || 400, fs, lh,
        ls: Math.round((parseFloat(s.letterSpacing) || 0) * 100) / 100,
        c: colour(s.color), v,
        ta: s.textAlign === 'center' ? 'C' : s.textAlign === 'right' ? 'R' : null,
        lines: rects.length,
      });
    }
    return out;
  }

  const VARC = {};
  function node(el) {
    const s = S(el);
    if (s.display === 'none' || s.visibility === 'hidden' || parseFloat(s.opacity) === 0) return null;
    const b = el.getBoundingClientRect();
    if (b.width <= 0 || b.height <= 0) return null;
    const tag = el.tagName.toLowerCase();
    const base = { x: R(b.left - OX), y: R(b.top - OY), w: R(b.width), h: R(b.height) };

    if (tag === 'svg') {
      let sv = el.outerHTML.replace(/\s+/g, ' ').trim();
      sv = sv.replace(/var\(\s*(--[\w-]+)\s*(?:,[^)]*)?\)/g, (m, nm) => {
        if (VARC[nm] === undefined) VARC[nm] = getComputedStyle(document.documentElement).getPropertyValue(nm).trim();
        return VARC[nm] || 'none';
      });
      return Object.assign(base, { t: 'S', v: sv, c: colour(s.color), op: parseFloat(s.opacity) < 1 ? Math.round(parseFloat(s.opacity) * 100) / 100 : null });
    }
    if (tag === 'img') return Object.assign(base, { t: 'M', src: el.currentSrc || el.src || '' });
    if (tag === 'input' || tag === 'textarea') {
      // render the field's own box; its value/placeholder becomes a text child
      const val = el.value || el.placeholder || '';
      base.field = true;
      if (val) base.fieldText = val;
    }

    const o = Object.assign(base, { t: 'F', tag });
    const bg = colour(s.backgroundColor); if (bg) o.bg = bg;
    const g = grad(s); if (g) o.g = g;
    const rd = radii(s); if (rd) o.rd = rd;
    const bwT = Math.round((parseFloat(s.borderTopWidth) || 0) * 10) / 10;
    const bwR = Math.round((parseFloat(s.borderRightWidth) || 0) * 10) / 10;
    const bwB = Math.round((parseFloat(s.borderBottomWidth) || 0) * 10) / 10;
    const bwL = Math.round((parseFloat(s.borderLeftWidth) || 0) * 10) / 10;
    if (bwT || bwR || bwB || bwL) {
      const pick = bwT ? s.borderTopColor : bwR ? s.borderRightColor : bwB ? s.borderBottomColor : s.borderLeftColor;
      const bc = colour(pick);
      if (bc) { o.sc = bc; o.sw = [bwT, bwR, bwB, bwL]; }
    }
    const sh = shadow(s); if (sh) o.sh = sh;
    const op = parseFloat(s.opacity); if (op < 1) o.op = Math.round(op * 100) / 100;
    if (s.overflow === 'hidden' || s.overflowX === 'hidden' || s.overflowY === 'hidden') o.clip = 1;

    const runs = textRuns(el, s);
    const kids = [];
    for (const c of el.children) { const k = node(c); if (k) kids.push(k); }

    const isFlex = s.display === 'flex' || s.display === 'inline-flex';
    if (isFlex && !(runs.length && kids.length)) {
      o.lay = {
        d: s.flexDirection.indexOf('column') === 0 ? 'V' : 'H',
        gap: Math.round((parseFloat(s.rowGap) || parseFloat(s.gap) || 0) * 10) / 10,
        cgap: Math.round((parseFloat(s.columnGap) || 0) * 10) / 10,
        p: [parseFloat(s.paddingTop) || 0, parseFloat(s.paddingRight) || 0, parseFloat(s.paddingBottom) || 0, parseFloat(s.paddingLeft) || 0].map(v => Math.round(v * 10) / 10),
        j: ALIGN[s.justifyContent] || 'MIN',
        a: ALIGN[s.alignItems] || 'MIN',
        wrap: s.flexWrap === 'wrap' ? 1 : 0,
      };
      o.c = runs.concat(kids);
      // in-flow order: text-only flex containers put the run first, which matches the DOM
      if (runs.length && kids.length === 0) o.c = runs;
    } else {
      o.c = runs.concat(kids);
      o.abs = 1;
    }
    if (!o.c.length) delete o.c;
    return o;
  }

  // ---- collapse: a styleless single-child wrapper adds a Figma frame for nothing
  function collapse(n) {
    if (!n.c) return n;
    n.c = n.c.map(collapse);
    if (n.t !== 'F') return n;
    if (n.c.length === 1) {
      const k = n.c[0];
      const plain = !n.bg && !n.g && !n.rd && !n.sc && !n.sh && n.op === undefined && !n.clip && !n.field;
      const flush = k.t !== 'T' && Math.abs(k.x - n.x) < 0.6 && Math.abs(k.y - n.y) < 0.6 && Math.abs(k.w - n.w) < 0.6 && Math.abs(k.h - n.h) < 0.6;
      if (plain && flush) return k;
    }
    return n;
  }
  return collapse(node(root));
};
module.exports = { TREE };
