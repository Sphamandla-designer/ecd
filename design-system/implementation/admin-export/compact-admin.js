// Fold the per-screen trees into global tables so each Figma call carries only
// its own structure. Also reports fonts and colours the library does not cover.
const fs = require('fs');
const S = JSON.parse(fs.readFileSync('admin-screens.json'));

// ---- the library we already published --------------------------------------
const STYLES = [
  ['Display/Stat value','Quicksand',700,24],['Display/Page title','Quicksand',600,22],
  ['Display/Card title','Quicksand',600,14.5],['Display/Product name','Quicksand',700,14],
  ['Display/Count L','Quicksand',700,13],['Display/Title M','Quicksand',600,13],
  ['Display/Title S','Quicksand',600,12.5],['Display/Nav','Quicksand',500,12.5],
  ['Display/Button','Quicksand',700,12.5],['Display/Link','Quicksand',600,12],
  ['Display/Search','Quicksand',400,12],['Display/Body S','Quicksand',400,11.5],
  ['Display/Monogram','Quicksand',700,11],['Display/Pill','Quicksand',600,11],
  ['Display/Meta','Quicksand',400,11],['Display/Count','Quicksand',700,10],
  ['Display/Rail group','Quicksand',600,10],['Display/Keycap','Quicksand',400,10],
  ['Display/Annotation','Quicksand',700,9],
  ['Body/Label','Inter',600,12.5],['Body/Body','Inter',400,12.5],
  ['Body/User name','Inter',600,12],['Body/Stat label','Inter',600,11.5],
  ['Body/Delta','Inter',700,11.5],['Body/Hint','Inter',400,11.5],
  ['Body/Pill','Inter',600,11],['Body/Count','Inter',700,11],['Body/Timestamp','Inter',400,11],
  ['Body/Column header','Inter',700,10.5],['Body/Value label','Inter',600,10.5],
  ['Body/Caption','Inter',400,10.5],['Body/Axis','Inter',400,10],
  ['Display/Stat value M','Quicksand',700,22],['Display/Glyph L','Quicksand',400,20],
  ['Display/Stat value S','Quicksand',700,19],['Display/Card title L','Quicksand',600,15],
  ['Display/Glyph','Quicksand',400,15],['Display/Section title','Quicksand',600,14],
  ['Display/Nav M','Quicksand',500,13],['Display/Body M','Quicksand',400,12.5],
  ['Display/Tab','Quicksand',700,12],['Display/Row action','Quicksand',700,11.5],
  ['Display/Row action · light','Quicksand',600,11.5],
  ['Body/Label L','Inter',600,13],['Body/Cell','Inter',400,12],['Body/Monogram S','Inter',600,10],
  ['Body/Field value','Inter',400,13],
];
const VARS = {
  '#EEF2F6':'role/background','#FFFFFF':'role/surface','#E3E7EC':'role/line','#EDF1F5':'role/line-soft',
  '#F2F5F8':'role/line-faint','#F6F8FA':'role/line-hairline','#27385A':'role/text-dark','#65727A':'role/text-mid',
  '#9AA5AD':'role/text-soft','#1DBADF':'role/action','#0F7690':'role/action-ink','#D2F1F9':'role/action-subtle',
  '#FF2180':'role/select','#8E9CB5':'role/rail-muted','#C6CEDE':'role/rail-text','#7688A5':'role/rail-label',
  '#52607B':'role/rail-avatar','#EFF6FA':'role/chip','#DBE6EE':'role/chip-line','#9FABC2':'role/rail-placeholder',
  '#4A7A16':'status/success/ink','#E6F1D4':'status/success/bg','#CFE3A8':'status/success/line',
  '#8F5B08':'status/warn/ink','#FDF3E0':'status/warn/bg','#F3DDB0':'status/warn/line',
  '#C1004F':'status/danger/ink','#FFEEF6':'status/danger/bg','#F4C8DD':'status/danger/line',
  '#1752AB':'status/info/ink','#EBF3FF':'status/info/bg','#ED1414':'status/notify',
  '#583F99':'accent/purple/ink','#EFEBF8':'accent/purple/bg',
  '#F7A600':'data/bar-below-target','#BFE08E':'data/spark','#FFF6D0':'annotation/bg','#ECD98A':'annotation/line',
  '#CFE7F2':'role/tab-line','#A8DFEF':'role/action-line','#B9D8E6':'role/dropzone-line',
  '#C4DBF7':'status/info/line','#D8CFEF':'accent/purple/line','#C9CFD2':'role/control-line',
  '#F4F7F9':'role/disabled-bg','#FBFCFE':'role/table-head','#EFF2F5':'status/neutral/bg',
  '#DDE3E8':'status/neutral/line','#D4D7DE':'role/line-strong','#000000':'role/text-dark',
};
const hexOf = c => '#' + [c[0], c[1], c[2]].map(v => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase();

const T = { col: [], sty: [], lay: [], svg: [], bd: [], rd: [], sh: [] };
const ix = { col: {}, sty: {}, lay: {}, svg: {}, bd: {}, rd: {}, sh: {} };
const put = (k, v) => { const j = JSON.stringify(v); if (ix[k][j] === undefined) { ix[k][j] = T[k].length; T[k].push(v); } return ix[k][j]; };

const missFont = {}, missCol = {};
function styleFor(fo) {
  const hit = STYLES.find(s => s[1] === fo.f && s[2] === fo.w && Math.abs(s[3] - fo.s) < 0.26);
  if (hit) return put('sty', [hit[0]]);
  const key = fo.f + '|' + fo.w + '|' + fo.s;
  missFont[key] = (missFont[key] || 0) + 1;
  return put('sty', [null, fo.f, fo.w, fo.s, fo.lh || Math.round(fo.s * 1.3), fo.ls]);
}
function colFor(c) {
  if (!c) return -1;
  const hex = hexOf(c);
  const name = c[3] === 1 ? VARS[hex] : null;
  if (!name && c[3] === 1) missCol[hex] = (missCol[hex] || 0) + 1;
  return put('col', name ? [name] : [null, Math.round(c[0]), Math.round(c[1]), Math.round(c[2]), c[3]]);
}

const R = n => Math.round(n);
function firstText(n) {
  if (n.k === 't') return n.v;
  for (const c of (n.c || [])) { const t = firstText(c); if (t) return t; }
  return '';
}
function nameOf(n) {
  const t = firstText(n).trim().replace(/\s+/g, ' ');
  if (t) return t.slice(0, 28);
  return n.nm === 'button' ? 'Button' : n.nm === 'table' ? 'Table' : 'Group';
}
function enc(n, parent) {
  if (n.k === 't') {
    const t = [1, R(n.w), R(n.h), styleFor(n.fo), colFor(n.c), n.v, n.fo.a === 'L' ? 0 : n.fo.a, n.grow ? 1 : 0];
    while (t.length > 6 && !t[t.length - 1]) t.pop();
    return t;
  }
  if (n.k === 's') return [2, R(n.w), R(n.h), put('svg', n.v), colFor(n.c)];
  const l = n.l;
  const li = put('lay', [l.d, l.g, l.p[0], l.p[1], l.p[2], l.p[3], l.j, l.a, l.wrap ? 1 : 0, l.rg || 0]);
  // kids ride at index 4 so every optional field can be truncated off the tail
  const tail = [
    n.bg ? colFor(n.bg) : -1,
    n.bd ? put('bd', [colFor(n.bd.c), n.bd.w[0], n.bd.w[1], n.bd.w[2], n.bd.w[3]]) : -1,
    n.rd ? put('rd', n.rd) : -1,
    n.sh ? put('sh', [colFor(n.sh[0]), n.sh[1], n.sh[2], n.sh[3], n.sh[4]]) : -1,
    n.op === undefined ? -1 : n.op,
    n.grow ? 1 : 0,
  ];
  while (tail.length && (tail[tail.length - 1] === -1 || tail[tail.length - 1] === 0)) tail.pop();
  return [0, R(n.w), R(n.h), li, (n.c || []).map(c => enc(c, n))].concat(tail);
}

const out = { screens: {}, tables: T };
for (const k of Object.keys(S)) {
  if (k === 'Dashboard') continue;      // already hand-composed
  out.screens[k] = enc(S[k], null);
}
fs.writeFileSync('admin-compact.json', JSON.stringify(out));
const per = Object.keys(out.screens).map(k => k + '=' + Math.round(JSON.stringify(out.screens[k]).length / 1024) + 'kB');
console.log(per.join('  '));
console.log('tables', Math.round(JSON.stringify(T).length / 1024) + 'kB',
  Object.keys(T).map(k => k + '=' + T[k].length).join(' '));
console.log('\nfonts with no style:', JSON.stringify(missFont, null, 1));
console.log('colours with no variable:', JSON.stringify(missCol, null, 1));
