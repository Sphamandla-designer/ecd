const fs = require('fs');
const D = JSON.parse(fs.readFileSync('coach-screens.json'));
const T = { col: [], sty: [], rd: [], sw: [], sh: [], lay: [], svg: [], g: [] };
const ix = { col: {}, sty: {}, rd: {}, sw: {}, sh: {}, lay: {}, svg: {}, g: {} };
const put = (k, v) => { if (v === null || v === undefined) return -1; const s = JSON.stringify(v); if (ix[k][s] === undefined) { ix[k][s] = T[k].length; T[k].push(v); } return ix[k][s]; };
const R = n => Math.round(n);
const plain = n => n.t === 'F' && !n.bg && !n.g && !n.rd && !n.sc && !n.sh && n.op === undefined && !n.clip && !n.field;
function prune(n) {
  // ONLY frames have children. A text node's `c` is its colour array — recursing
  // into it filtered out every zero channel, so black became [1].
  if (n.t === 'F' && n.c) {
    n.c = n.c.map(prune).filter(Boolean);
    if (n.abs) { const out = []; for (const k of n.c) { if (plain(k) && !k.lay && k.c && k.c.length) out.push(...k.c); else out.push(k); } n.c = out; }
    if (!n.c.length) delete n.c;
  }
  if (plain(n) && !n.c && !n.lay) return null;
  return n;
}
function enc(n, px, py) {
  const x = R(n.x - px), y = R(n.y - py), w = Math.max(1, R(n.w)), h = Math.max(1, R(n.h));
  // Alignment and wrapping are independent — a centred paragraph is 'CW'. Folding
  // them into one slot let align win, so centred wrapped copy rebuilt as one long line.
  if (n.t === 'T') { const a = (n.ta || '') + (n.lines > 1 ? 'W' : ''); return [1, x, y, w, h, put('col', n.c), put('sty', [n.f, n.fw, n.fs, n.lh, n.ls || 0]), n.v, a || 0]; }
  if (n.t === 'S') return [2, x, y, w, h, put('svg', n.v), put('col', n.c), n.op === undefined || n.op === null ? -1 : n.op];
  if (n.t === 'M') return [3, x, y, w, h, (n.src || '').slice(0, 40)];
  return [0, x, y, w, h, put('col', n.bg), put('g', n.g), put('rd', n.rd), put('col', n.sc), put('sw', n.sw), put('sh', n.sh),
    n.lay ? put('lay', [n.lay.d, n.lay.gap, n.lay.cgap, n.lay.p[0], n.lay.p[1], n.lay.p[2], n.lay.p[3], n.lay.j, n.lay.a, n.lay.wrap]) : -1,
    n.op === undefined ? -1 : n.op, n.clip ? 1 : 0, (n.c || []).map(k => enc(k, n.x, n.y))];
}
const out = { tables: T, screens: [] };
for (const s of D) {
  const t = prune(s.tree);
  out.screens.push({ code: s.code, n: enc(t, t.x, t.y) });
}
// global subtree reuse
const key = a => { const c = a.slice(); c[1] = 0; c[2] = 0; return JSON.stringify(c); };
const freq = new Map();
const visit = (a, fn) => { fn(a); if (a[0] === 0) for (const k of a[14]) visit(k, fn); };
for (const s of out.screens) visit(s.n, a => { if (a[0] !== 0) return; const k = key(a); if (k.length < 220) return; freq.set(k, (freq.get(k) || 0) + 1); });
const reuse = [], rix = {};
for (const [k, n] of freq) if (n > 1) { rix[k] = reuse.length; reuse.push(JSON.parse(k)); }
function rewrite(a) { if (a[0] !== 0) return a; const k = key(a); if (rix[k] !== undefined) return [9, rix[k], a[1], a[2]]; a[14] = a[14].map(rewrite); return a; }
for (let i = 0; i < reuse.length; i++) reuse[i][14] = reuse[i][14].map(k => { const s = key(k); return (k[0] === 0 && rix[s] !== undefined && rix[s] !== i) ? [9, rix[s], k[1], k[2]] : rewrite(k); });
for (const s of out.screens) s.n = rewrite(s.n);
out.reuse = reuse;
fs.writeFileSync('coach-compact.json', JSON.stringify(out));
console.log('tables', JSON.stringify(T).length, Object.keys(T).map(k => k + '=' + T[k].length).join(' '));
console.log('reuse', reuse.length, JSON.stringify(reuse).length);
console.log('screens', JSON.stringify(out.screens).length, 'TOTAL', JSON.stringify(out).length);
const hx = c => (!c||c.length<3)?String(c):'#'+[c[0],c[1],c[2]].map(v=>Math.max(0,Math.min(255,v)).toString(16).padStart(2,'0')).join('').toUpperCase()+(c[3]!==undefined&&c[3]<1?'@'+c[3]:'');
console.log('\nCOLOURS'); console.log(T.col.map((c,i)=>i+':'+hx(c)).join('  '));
console.log('\nSTYLES'); console.log(T.sty.map((s,i)=>i+':'+s.join('/')).join('  '));
