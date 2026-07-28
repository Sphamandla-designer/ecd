// Walk the rendered prototype DOM and emit a flat, ordered list of paint ops
// per screen. Ops are what Figma can rebuild losslessly: rects (fill / stroke /
// radius / shadow), positioned text runs, and inline SVG icons.
const EXTRACT = function () {
  const all = [...document.querySelectorAll('#root div')];
  const root = all.find(d => { const r = d.getBoundingClientRect(); return r.width > 330 && r.width < 400 && r.height > 550; });
  if (!root) return null;
  const R = root.getBoundingClientRect();
  const OX = R.left, OY = R.top, W = Math.round(R.width), H = Math.round(R.height);

  const colours = [];
  const cidx = {};
  function col(css) {
    if (!css) return -1;
    const m = css.match(/rgba?\(([^)]+)\)/);
    if (!m) return -1;
    const p = m[1].split(',').map(s => parseFloat(s.trim()));
    const a = p.length > 3 ? p[3] : 1;
    if (a === 0) return -1;
    const key = p[0] + ',' + p[1] + ',' + p[2] + ',' + a;
    if (cidx[key] === undefined) { cidx[key] = colours.length; colours.push([p[0], p[1], p[2], Math.round(a * 1000) / 1000]); }
    return cidx[key];
  }
  const r2 = n => Math.round(n * 10) / 10;
  const inside = (x, y, w, h) => !(x > W || y > H || x + w < 0 || y + h < 0);

  const ops = [];
  const seenSvg = new WeakSet();
  const VARC = {};

  function radii(s) {
    const g = v => Math.round(parseFloat(v) || 0);
    const a = [g(s.borderTopLeftRadius), g(s.borderTopRightRadius), g(s.borderBottomRightRadius), g(s.borderBottomLeftRadius)];
    return (a[0] || a[1] || a[2] || a[3]) ? a : 0;
  }
  function shadow(s) {
    const v = s.boxShadow;
    if (!v || v === 'none') return 0;
    // rgba(r,g,b,a) x y blur spread
    const m = v.match(/(rgba?\([^)]+\))\s+(-?[\d.]+)px\s+(-?[\d.]+)px\s+(-?[\d.]+)px(?:\s+(-?[\d.]+)px)?/);
    if (!m) return 0;
    return [col(m[1]), parseFloat(m[2]), parseFloat(m[3]), parseFloat(m[4]), parseFloat(m[5] || 0)];
  }
  // hard-edged radial gradients are decorative circles, not gradients
  function decor(st, w, h) {
    const bi = st.backgroundImage;
    if (!bi || bi.indexOf('radial-gradient') < 0) return 0;
    const re = /radial-gradient\(circle at ([\d.]+)% ([\d.]+)%, (rgba?\([^)]+\)) 0px, rgba?\([^)]+\) ([\d.]+)px/g;
    const out = []; let m;
    while ((m = re.exec(bi))) {
      out.push([r2(w * parseFloat(m[1]) / 100), r2(h * parseFloat(m[2]) / 100), r2(parseFloat(m[4])), col(m[3])]);
    }
    return out.length ? out : 0;
  }
  function grad(s) {
    const bi = s.backgroundImage;
    if (!bi || bi === 'none' || bi.indexOf('linear-gradient') < 0) return 0;
    const stops = bi.match(/rgba?\([^)]+\)/g);
    if (!stops || stops.length < 2) return 0;
    const ang = (bi.match(/(-?[\d.]+)deg/) || [])[1];
    return [col(stops[0]), col(stops[stops.length - 1]), ang === undefined ? 180 : parseFloat(ang)];
  }

  function walk(el) {
    const s = getComputedStyle(el);
    if (s.display === 'none' || s.visibility === 'hidden' || parseFloat(s.opacity) === 0) return;
    const b = el.getBoundingClientRect();
    const x = r2(b.left - OX), y = r2(b.top - OY), w = r2(b.width), h = r2(b.height);
    const tag = el.tagName.toLowerCase();

    if (tag === 'svg') {
      if (!seenSvg.has(el) && w > 0 && h > 0 && inside(x, y, w, h)) {
        seenSvg.add(el);
        let sv = el.outerHTML.replace(/\s+/g, ' ').trim();
        // inline SVG attributes keep var(--token) literal; Figma's importer cannot
        // resolve those, so bake in the value for whichever tenant is active
        sv = sv.replace(/var\(\s*(--[\w-]+)\s*(?:,[^)]*)?\)/g, function (m, nm) {
          if (VARC[nm] === undefined) VARC[nm] = getComputedStyle(document.documentElement).getPropertyValue(nm).trim();
          return VARC[nm] || 'none';
        });
        const so = { t: 's', x, y, w, h, v: sv, c: col(s.color) };
        const sop = parseFloat(s.opacity);
        if (sop < 1) so.op = Math.round(sop * 100) / 100;
        ops.push(so);
      }
      return; // never descend into an svg
    }
    if (tag === 'img') {
      if (w > 0 && h > 0 && inside(x, y, w, h)) ops.push({ t: 'm', x, y, w, h, src: (el.currentSrc || el.src || '') });
      return;
    }

    if (w > 0 && h > 0 && inside(x, y, w, h)) {
      const bg = col(s.backgroundColor);
      const gr = grad(s);
      const bw = Math.round((parseFloat(s.borderTopWidth) || 0) * 10) / 10;
      const bl = Math.round((parseFloat(s.borderLeftWidth) || 0) * 10) / 10;
      const bb = Math.round((parseFloat(s.borderBottomWidth) || 0) * 10) / 10;
      const br = Math.round((parseFloat(s.borderRightWidth) || 0) * 10) / 10;
      const bc = col(s.borderTopColor) >= 0 ? col(s.borderTopColor) : col(s.borderLeftColor);
      const sh = shadow(s);
      const dc = decor(s, w, h);
      const anyBorder = bw || bl || bb || br;
      if (bg >= 0 || gr || anyBorder || sh || dc) {
        const o = { t: 'r', x, y, w, h };
        if (bg >= 0) o.f = bg;
        if (gr) o.g = gr;
        const rr = radii(s); if (rr) o.rd = rr;
        if (anyBorder && bc >= 0) { o.sc = bc; o.sw = [bw, br, bb, bl]; }
        if (sh) o.sh = sh;
        if (dc) o.dc = dc;
        const eop = parseFloat(s.opacity);
        if (eop < 1) o.op = Math.round(eop * 100) / 100;
        ops.push(o);
      }
    }

    // text runs — measured with a Range so wrapped lines land where they render
    for (const n of el.childNodes) {
      if (n.nodeType !== 3) continue;
      const txt = n.nodeValue;
      if (!txt || !txt.trim()) continue;
      const rng = document.createRange();
      rng.selectNodeContents(n);
      const rects = [...rng.getClientRects()];
      if (!rects.length) continue;
      const fs = Math.round(parseFloat(s.fontSize) * 10) / 10;
      let lh = parseFloat(s.lineHeight); if (!isFinite(lh)) lh = fs * 1.3;
      lh = Math.round(lh * 10) / 10;
      const fam = /quicksand/i.test(s.fontFamily) ? 'Q' : 'I';
      const fw = parseInt(s.fontWeight) || 400;
      const c = col(s.color);
      const ls = Math.round((parseFloat(s.letterSpacing) || 0) * 100) / 100;
      const uc = s.textTransform === 'uppercase' ? 1 : 0;
      // merge the run's rects into one block; Figma re-wraps inside the same box
      let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
      for (const rc of rects) { x0 = Math.min(x0, rc.left); y0 = Math.min(y0, rc.top); x1 = Math.max(x1, rc.right); y1 = Math.max(y1, rc.bottom); }
      const tx = r2(x0 - OX), ty = r2(y0 - OY), tw = r2(x1 - x0), th = r2(y1 - y0);
      if (!inside(tx, ty, tw, th) || tw <= 0 || th <= 0) continue;
      let content = txt.replace(/\s+/g, ' ');
      if (uc) content = content.toUpperCase();
      const op = { t: 't', x: tx, y: ty, w: tw, h: th, v: content, fs, lh, ff: fam, fw, c };
      if (ls) op.ls = ls;
      if (s.textAlign === 'center') op.ta = 'C'; else if (s.textAlign === 'right') op.ta = 'R';
      ops.push(op);
    }

    for (const c of el.children) walk(c);
  }
  walk(root);
  return { w: W, h: H, colours, ops };
};
module.exports = { EXTRACT };
