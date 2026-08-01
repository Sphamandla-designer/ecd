# ECD Admin Platform → Figma · full-file migration

Extends `../admin-export/` from eleven screens to the whole product, in Figma file
[`k0txjCbvsb0PgtKc5aoVtW`](https://www.figma.com/design/k0txjCbvsb0PgtKc5aoVtW/Admin-panel):

| | |
|---|---|
| Pages | 20 (01 Cover … 20 Questions) |
| Screens | 35, across every module, all three role tiers and six UI states |
| Components | 15 + 18 icons |
| Variables | 105 in two collections (`1 · Primitives`, `2 · Colour`) |
| Text styles | 30 |
| Documentation | a spec block beneath every screen, annotations beside it |

Source of truth: `ECD Admin Platform (standalone).html` on branch
`claude/mobile-design-system-rmx7ni`. Nothing is a screenshot — text is text, icons are
vectors, and every flexbox container in the build is real Auto Layout in Figma.

## Pipeline

```
admin.html
   ▼  tree.js         DOM walker → hierarchical tree carrying auto-layout metadata
   ▼  capture.js      Playwright drives 35 screens × 3 role tiers × 6 sim states
   │                  → screens-admin.json  (1.1 MB)
   ▼  compact2.js     prune styleless wrappers, dedupe global tables, hoist repeated
   │                  subtrees → compact-admin.json  (292 kB → 174 kB)
   ▼  gen2.js         emits the builder + per-page batch scripts
   ▼  docrender.js    documentation blocks and colour-coded annotations
   ▼  use_figma
```

Run: `node capture.js && node compact2.js && node gen2.js`

## Renderers live in the file

Three renderers (~7 kB each) are written once and reconstructed per call, so batch
calls carry only data:

```js
figma.root.setSharedPluginData('ecdadmin', 'builder', SRC)

const AF  = Object.getPrototypeOf(async function(){}).constructor;
const run = new AF('figma', 'PAGE', 'DATA', figma.root.getSharedPluginData('ecdadmin','builder'));
return await run(figma, "06 — Dashboard", { ...screens });
```

Keys: `builder`, `docs`, `page` (renderers); `maps`, `tables`, `reuse`, `rails` (data).

## Node encoding

Fixed arity, index 0 is the kind. Children are always the last element.

| Kind | Shape |
|---|---|
| `0` frame | `[0,x,y,w,h, bg,grad,radius,strokeCol,strokeWidths,shadow,layout,opacity,clip, kids[]]` |
| `1` text  | `[1,x,y,w,h, colour, style, "chars", align]` |
| `2` svg   | `[2,x,y,w,h, svgIdx, colour, opacity]` |
| `3` image | `[3,x,y,w,h, src]` |
| `9` reuse | `[9, reuseIdx, x, y]` — a hoisted repeated subtree |

Whole cards, table rows and the navigation rail repeat across screens, so any subtree
seen twice becomes a `9` reference. 81 entries carry 40 % of the payload.

Colours resolve to bound Figma variables through the `maps` lookup; text resolves to a
named style when the build uses AUTO line height.

## Things that bit, and the fixes

- **Font family was matched against the whole CSS stack.** `font-family: Inter, Quicksand, …`
  matches `/quicksand/i`, so every Inter run was rebuilt in Quicksand. Test the first
  family only.
- **`line-height: normal` must stay AUTO.** Approximating it as `1.3 × size` drifted
  every baseline. Encoded as `-1`, mapped to `{unit:'AUTO'}`, and the text styles were
  rebuilt with AUTO to match.
- **Figma renders these faces marginally wider than the browser measured.** Fixed-width
  text nodes re-wrapped — "Send Announcement" broke over two lines. Single-line text now
  uses `textAutoResize = 'WIDTH_AND_HEIGHT'`; only genuinely wrapped runs keep a fixed
  width with `'HEIGHT'`.
- **Per-side border colours.** With `border-bottom` only, `borderTopColor` computes to
  `currentColor` — navy. Read the colour from a side that actually has width.
- **Apply `layoutMode` after appending children**, then resize. Setting it first re-flows
  an empty frame.
- **Guard malformed colour entries.** One `rgba()` in the build parses to a 1-element
  array; `paint()` returns null rather than throwing.

## Known deviations

- Four CSS-grid regions are rebuilt as absolutely positioned frames — Figma has no grid.
  Every flexbox region is real Auto Layout.
- Screens are captured at 1440 × 2600 so nothing clips, then each frame is trimmed to its
  real content height.
- The build's own prototype-controls bar and annotation toggle are excluded: harness
  chrome, not product.
- Nothing was redesigned. Where the build is inconsistent — two typographic faces for
  status pills, white on `role/action` at 2.2:1 — the inconsistency is documented in an
  annotation and on pages 03 and 19 rather than corrected.
