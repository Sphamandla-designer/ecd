// Turn the per-screen paint ops into one compact payload with global dedupe
// tables, so the Figma writer carries the minimum possible bytes.
const fs = require('fs');
const screens = JSON.parse(fs.readFileSync('screens.json'));
const ann = JSON.parse(fs.readFileSync('annotations.json'));
const annBy = {}; for (const a of ann) annBy[a.key] = a;

const T = { col: [], sty: [], rad: [], sw: [], sh: [], svg: [], img: [], dec: [] };
const idx = { col: {}, sty: {}, rad: {}, sw: {}, sh: {}, svg: {}, img: {}, dec: {} };
function put(kind, val) {
  const k = JSON.stringify(val);
  if (idx[kind][k] === undefined) { idx[kind][k] = T[kind].length; T[kind].push(val); }
  return idx[kind][k];
}
const R = n => Math.round(n);

// ---- 1. merge adjacent text runs that share a style and a baseline ----
function mergeText(ops) {
  const out = [];
  for (const o of ops) {
    const p = out[out.length - 1];
    if (o.t === 't' && p && p.t === 't'
      && p.fs === o.fs && p.lh === o.lh && p.ff === o.ff && p.fw === o.fw && p.c === o.c
      && (p.ls || 0) === (o.ls || 0) && p.ta === o.ta
      && Math.abs(p.y - o.y) < 1.5 && Math.abs(p.h - o.h) < 1.5
      && o.x >= p.x - 1 && o.x - (p.x + p.w) < 6) {
      p.v += o.v;
      p.w = Math.max(p.x + p.w, o.x + o.w) - p.x;
      continue;
    }
    out.push(Object.assign({}, o));
  }
  return out;
}

// ---- 2. drop rects that repaint the same colour over the rect containing them ----
function pruneRects(ops) {
  const out = [];
  const painted = [];
  for (const o of ops) {
    if (o.t === 'r' && o.f !== undefined && !o.rd && o.sc === undefined && !o.sh && !o.g && !o.dc) {
      // only the TOPMOST rect that fully contains this one decides. Scanning past
      // a different-coloured container would drop e.g. a navy header that sits on
      // a white card that itself sits on a navy bezel.
      let covered = false;
      for (let i = painted.length - 1; i >= 0; i--) {
        const q = painted[i];
        const contains = o.x >= q.x - 0.6 && o.y >= q.y - 0.6
          && o.x + o.w <= q.x + q.w + 0.6 && o.y + o.h <= q.y + q.h + 0.6;
        if (!contains) continue;
        covered = (q.f === o.f && !q.g);
        break;
      }
      if (covered) continue;
    }
    if (o.t === 'r' && (o.f !== undefined || o.g)) painted.push(o);
    out.push(o);
  }
  return out;
}

const out = { screens: {}, tables: T, order: [] };
let dropped = 0, kept = 0;

for (const key of Object.keys(screens)) {
  const d = screens[key];
  let ops = pruneRects(mergeText(d.ops));
  dropped += d.ops.length - ops.length; kept += ops.length;
  const local = d.colours;
  const cmap = local.map(c => put('col', [R(c[0]), R(c[1]), R(c[2]), c[3]]));
  const enc = [];
  for (const o of ops) {
    const x = R(o.x), y = R(o.y), w = Math.max(1, R(o.w)), h = Math.max(1, R(o.h));
    if (o.t === 'r') {
      const f = o.f !== undefined ? cmap[o.f] : -1;
      const rd = o.rd ? put('rad', o.rd) : -1;
      const sc = o.sc !== undefined ? cmap[o.sc] : -1;
      const sw = o.sw ? put('sw', o.sw.map(v => Math.round(v * 10) / 10)) : -1;
      const sh = o.sh ? put('sh', [cmap[o.sh[0]], o.sh[1], o.sh[2], o.sh[3], o.sh[4]]) : -1;
      const g = o.g ? put('sh', ['G', cmap[o.g[0]], cmap[o.g[1]], o.g[2]]) : -1;
      const dc = o.dc ? put('dec', o.dc.map(c => [R(c[0]), R(c[1]), R(c[2]), cmap[c[3]]])) : -1;
      enc.push([0, x, y, w, h, f, rd, sc, sw, sh, g, dc, o.op === undefined ? -1 : o.op]);
    } else if (o.t === 't') {
      const st = put('sty', [o.ff, o.fw, o.fs, o.lh, o.ls || 0, o.ta || 'L']);
      enc.push([1, x, y, w, h, cmap[o.c], st, o.v]);
    } else if (o.t === 's') {
      const sv = put('svg', o.v);
      enc.push([2, x, y, w, h, sv, o.c >= 0 ? cmap[o.c] : -1, o.op === undefined ? -1 : o.op]);
    } else if (o.t === 'm' && o.img) {
      enc.push([3, x, y, w, h, put('img', o.img), o.alt || '']);
    } else if (o.t === 'x') {
      enc.push([4, x, y, w, h, o.v || 'IMAGE']);
    }
  }
  const a = annBy[key];
  out.screens[key] = { w: d.w, h: d.h, ops: enc, area: a ? a.area : guessArea(key), title: a ? a.title : guessTitle(key) };
  out.order.push(key);
}

function guessArea(key) {
  if (key.indexOf('onb__') === 0) return 'Onboarding & entry';
  if (key.indexOf('state__') === 0) return 'Home & daily states';
  return 'Profile, exports & system';
}
function guessTitle(key) {
  const m = key.match(/^onb__(.+)__(\d+)$/);
  if (m) return 'Onboarding — ' + m[1].replace(/-/g, ' ') + ' · step ' + (parseInt(m[2]) + 1);
  return key;
}

fs.writeFileSync('compact.json', JSON.stringify(out));
const bytes = JSON.stringify(out).length;
console.log('screens', out.order.length, 'ops kept', kept, 'ops pruned', dropped);
console.log('tables:', Object.keys(T).map(k => k + '=' + T[k].length).join(' '));
console.log('total bytes', bytes, '≈', Math.round(bytes / 1024) + 'kB');
const per = out.order.map(k => JSON.stringify(out.screens[k]).length);
console.log('per-screen bytes: max', Math.max(...per), 'avg', Math.round(per.reduce((a, c) => a + c) / per.length));
console.log('tables bytes', JSON.stringify(T).length);
