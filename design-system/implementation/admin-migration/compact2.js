// Prune + dedupe the captured trees into a compact payload the Figma builder can replay.
const fs = require('fs');
const D = JSON.parse(fs.readFileSync('screens-admin.json'));

const T = { col: [], sty: [], rd: [], sw: [], sh: [], lay: [], svg: [], g: [] };
const ix = { col: {}, sty: {}, rd: {}, sw: {}, sh: {}, lay: {}, svg: {}, g: {} };
const put = (k, v) => { if (v === null || v === undefined) return -1; const s = JSON.stringify(v); if (ix[k][s] === undefined) { ix[k][s] = T[k].length; T[k].push(v); } return ix[k][s]; };
const R = n => Math.round(n);

// ---- 1. prune ---------------------------------------------------------------
const plain = n => n.t === 'F' && !n.bg && !n.g && !n.rd && !n.sc && !n.sh && n.op === undefined && !n.clip && !n.field;
function prune(n) {
  if (n.c) {
    n.c = n.c.map(prune).filter(Boolean);
    // dissolve structureless wrappers when the parent lays children out absolutely
    if (n.abs) {
      const out = [];
      for (const k of n.c) {
        if (plain(k) && !k.lay && k.c && k.c.length) out.push(...k.c);
        else out.push(k);
      }
      n.c = out;
    }
    if (!n.c.length) delete n.c;
  }
  if (plain(n) && !n.c && !n.lay) return null;   // paints nothing, holds nothing
  return n;
}

// ---- 2. encode --------------------------------------------------------------
function enc(n, px, py) {
  const x = R(n.x - px), y = R(n.y - py), w = Math.max(1, R(n.w)), h = Math.max(1, R(n.h));
  if (n.t === 'T') {
    return [1, x, y, w, h, put('col', n.c), put('sty', [n.f, n.fw, n.fs, n.lh, n.ls || 0]), n.v,
      n.ta || (n.lines > 1 ? 'W' : 0)];
  }
  if (n.t === 'S') return [2, x, y, w, h, put('svg', n.v), put('col', n.c), n.op === undefined || n.op === null ? -1 : n.op];
  if (n.t === 'M') return [3, x, y, w, h, n.src.slice(0, 60)];
  return [0, x, y, w, h,
    put('col', n.bg), put('g', n.g), put('rd', n.rd), put('col', n.sc), put('sw', n.sw), put('sh', n.sh),
    n.lay ? put('lay', [n.lay.d, n.lay.gap, n.lay.cgap, n.lay.p[0], n.lay.p[1], n.lay.p[2], n.lay.p[3], n.lay.j, n.lay.a, n.lay.wrap]) : -1,
    n.op === undefined ? -1 : n.op, n.clip ? 1 : 0,
    (n.c || []).map(k => enc(k, n.x, n.y))];
}

const out = { tables: T, screens: {}, shells: {} };
for (const k of Object.keys(D.screens)) {
  const s = D.screens[k];
  const main = prune(s.main);
  const head = s.head ? prune(s.head) : null;
  const over = (s.over || []).map(prune).filter(Boolean);
  out.screens[k] = {
    m: s.meta, b: s.contentBottom,
    main: enc(main, main.x, main.y),
    head: head ? enc(head, head.x, head.y) : null,
    over: over.map(o => enc(o, 0, 0)),
  };
}
for (const r of Object.keys(D.shells)) {
  const a = prune(D.shells[r].aside);
  out.shells[r] = enc(a, a.x, a.y);
}

fs.writeFileSync('compact-admin.json', JSON.stringify(out));
const per = Object.keys(out.screens).map(k => [k, JSON.stringify(out.screens[k]).length]);
per.sort((a, b) => b[1] - a[1]);
console.log('tables', JSON.stringify(T).length, Object.keys(T).map(k => k + '=' + T[k].length).join(' '));
console.log('shells', Object.keys(out.shells).map(k => k + '=' + JSON.stringify(out.shells[k]).length).join(' '));
console.log('TOTAL', JSON.stringify(out).length);
console.log(per.map(p => p[0] + '=' + p[1]).join('  '));

// ---- 3. global subtree dedupe ----------------------------------------------
// Whole cards, table rows and the entire nav rail repeat across screens. Hoist any
// subtree that appears more than once into a reuse table and leave a [9,idx,x,y] ref.
(function dedupe() {
  const O = JSON.parse(fs.readFileSync('compact-admin.json'));
  const roots = [];
  for (const k of Object.keys(O.screens)) { const s = O.screens[k]; roots.push(s.main); if (s.head) roots.push(s.head); for (const o of s.over) roots.push(o); }
  for (const r of Object.keys(O.shells)) roots.push(O.shells[r]);

  const key = a => { const c = a.slice(); c[1] = 0; c[2] = 0; return JSON.stringify(c); };
  const freq = new Map();
  const visit = (a, fn) => { fn(a); if (a[0] === 0) for (const k of a[14]) visit(k, fn); };
  for (const r of roots) visit(r, a => { if (a[0] !== 0) return; const s = key(a); if (s.length < 250) return; freq.set(s, (freq.get(s) || 0) + 1); });

  const reuse = []; const rix = {};
  for (const [s, n] of freq) if (n > 1) { rix[s] = reuse.length; reuse.push(JSON.parse(s)); }

  function rewrite(a) {
    if (a[0] !== 0) return a;
    const s = key(a);
    if (rix[s] !== undefined) return [9, rix[s], a[1], a[2]];
    a[14] = a[14].map(rewrite);
    return a;
  }
  // rewrite the reuse entries themselves first (inner-most refs), then the trees
  for (let i = 0; i < reuse.length; i++) reuse[i][14] = reuse[i][14].map(k => { const s = key(k); return (k[0] === 0 && rix[s] !== undefined && rix[s] !== i) ? [9, rix[s], k[1], k[2]] : rewrite(k); });
  for (const k of Object.keys(O.screens)) {
    const s = O.screens[k];
    s.main = rewrite(s.main); if (s.head) s.head = rewrite(s.head); s.over = s.over.map(rewrite);
  }
  for (const r of Object.keys(O.shells)) O.shells[r] = rewrite(O.shells[r]);
  O.reuse = reuse;
  fs.writeFileSync('compact-admin.json', JSON.stringify(O));
  const per = Object.keys(O.screens).map(k => [k, JSON.stringify(O.screens[k]).length]).sort((a, b) => b[1] - a[1]);
  console.log('\n-- after dedupe --');
  console.log('reuse entries', reuse.length, 'bytes', JSON.stringify(reuse).length);
  console.log('TOTAL', JSON.stringify(O).length);
  console.log(per.slice(0, 12).map(p => p[0] + '=' + p[1]).join('  '));
  console.log('screens total', per.reduce((a, c) => a + c[1], 0));
})();
