# Prototype → Figma export

Rebuilds all 103 screens of `ELP App Prototype (standalone).html` as **native, editable
Figma layers** on page `20:41` of file
[`1b2PEGtGAWKqxN61KsVXy5`](https://www.figma.com/design/1b2PEGtGAWKqxN61KsVXy5/).

Not screenshots. Every layer is real: text is text, icons are vectors, shadows are effects,
the logos are real images. Geometry and styling are read off the **running app's rendered
DOM**, so what lands in Figma is what the browser actually paints.

## Why this route

`upload_assets` (the normal image path) is blocked by the environment's network policy —
`mcp.figma.com` returns 403 to CONNECT — and the html.to.design plugin was not connected.
Rebuilding from the DOM turned out better than either: it produces editable layers rather
than flat PNGs, and the logos still make it in because `figma.createImage()` takes raw bytes
through the plugin bridge rather than the blocked upload endpoint.

## Pipeline

```
capture.html                 the prototype with a 41-char hook exposing window.__elp
   │  (regenerate: see "Rebuilding the harness" below)
   ▼
extract-all.js  +  extract.js        Playwright drives all 103 screens, walks the DOM,
   │                                 emits a flat ordered list of paint ops per screen
   ▼  screens.json
compact.js                           global dedupe tables + prune + merge → compact.json
   ▼  compact.json  (150 kB, 3439 ops, 35 colours, 36 text styles, 35 icons)
gen.js                               emits out-setup-*.js and out-b1..9.js
   ▼
use_figma                            run setup once, then each batch in order
```

### Running it

1. **Rebuild the harness.** The shipped prototype has no automation hook. Patch one in:
   ```js
   // in ELP App Prototype (standalone).html, single occurrence:
   'return se.nudgeDismissed=L,t.jsx(Jd.Provider'
   // becomes
   'return se.nudgeDismissed=L,(typeof window<\\"u\\"&&(window.__elp=se)),t.jsx(Jd.Provider'
   ```
   Write the result to `capture.html`. **Never ship this file** — it is a test harness.
2. `node extract-all.js /abs/path/to/capture.html` → `screens.json`, `images.json`
3. `node compact.js` → `compact.json`
4. `node gen.js` → `out-setup-a.js`, `out-setup-b.js`, `out-b1..9.js`
5. Run through `use_figma` in order: `setup-b` (stores logo bytes) → `setup-a` (creates
   images, grids, tables) → `b1` … `b9`.

## Op encoding

Screens are lists of ops; index 0 is the op kind.

| Kind | Shape | Becomes |
|---|---|---|
| `0` rect | `[0,x,y,w,h, fill, radius, strokeCol, strokeWidths, shadow, gradient, decor, opacity]` | FRAME |
| `1` text | `[1,x,y,w,h, colour, style, "string"]` | TEXT |
| `2` svg | `[2,x,y,w,h, svgIndex, colour, opacity]` | vector tree via `createNodeFromSvg` |
| `3` image | `[3,x,y,w,h, imgIndex, altText]` | RECTANGLE with image fill |

All non-inline values are indices into the dedupe tables in `compact.json` (`col`, `sty`,
`rad`, `sw`, `sh`, `svg`, `img`, `dec`), which are stashed on the Figma page via
`setSharedPluginData` so the batch calls stay small.

## Things that bit, and the fixes

Each of these was a real bug caught by comparing the Figma render against a Playwright
screenshot of the same screen. Left here so nobody re-derives them.

- **Route params were wrong in the original capture run.** The router takes `id`, not
  `classId` / `childId` / `staffId`. Nine screens (class detail, child profile, staff
  detail, mark-left, remove-staff, withdraw-consent …) rendered as an empty phone shell —
  in the shipped PNGs too. Fixed; `classDetail` went from 2 ops to 58.
- **`figma.createImage()` hashes are garbage-collected** if no node uses them in the same
  `use_figma` call. Creating images in a setup call and referencing the hashes later gives
  silently-empty fills. The images are now anchored to a visible node at creation.
- **Occlusion pruning must respect paint order.** Dropping a rect because an earlier rect
  of the same colour contains it deleted the navy app-bar band, which sits on a white card,
  which sits on the navy phone bezel. Only the *topmost* containing rect may veto.
- **Background colour and gradient must layer**, not replace. The navy header carries both.
- **Hard-edged `radial-gradient`s are circles, not gradients.** The header decoration is
  `radial-gradient(circle at 12% 78%, white 34px, transparent 35px)` ×4. Parsed into real
  ellipses inside a clipping frame.
- **Inline SVG keeps `var(--token)` literal** — computed style resolves it everywhere else.
  Baked per tenant at extraction, so ECD and SmartStart icons differ correctly.
- **`createNodeFromSvg` ignores inline `opacity`.** Element opacity is captured separately.
- **Figma's SVG path parser rejects commas** in cubic commands. Space-separated only.
- **Invisible instances report no children**, so style them before hiding them.

## Known deviations

- The prototype clips its own scroll area, so each frame shows what is visible at
  376×760 — the same fold the screenshots captured.
- `app__resDetail__Funding-and-subsidies` is genuinely near-empty: that category has no
  items in the seeded data.
- The onboarding walker is click-driven, so step counts can drift by one between runs.
  103 screens is the current yield against 100 in `annotations.json`.

---

## Build status

60 of 103 screens are on the Figma page. The remaining four batches are generated
and committed in this folder — each is a complete, self-contained `use_figma`
script; run them in any order.

| Batch | Screens | Covers | Status |
|---|---|---|---|
| `out-b1.js` | 001–016 | Onboarding | **built** |
| `out-b2.js` | 017–029 | Onboarding, first Home states | **built** |
| `out-b3.js` | 030–037 | Home state matrix | **built** |
| `out-b4.js` | 038–045 | Home state matrix | **built** |
| `out-b5.js` | 046–053 | Home state matrix | pending |
| `out-b6.js` | 054–065 | Home states, Classes & children, Attendance | pending |
| `out-b7.js` | 066–080 | Attendance, Consent, Staff, Income | **built** |
| `out-b8.js` | 081–097 | Income, Resources, Profile & exports | pending |
| `out-b9.js` | 098–103 | Exports, Profile | pending |

The page already holds the lookup tables and the three logo images
(`setSharedPluginData` keys `elpx/tables`, `elpx/images`, `elpx/sections`,
`elpx/raw`), so the pending batches need no setup — paste the file contents into
`use_figma` against file `1b2PEGtGAWKqxN61KsVXy5` and they will land in the right
area grid.

Built so far: 2,630 layers — 727 text nodes, 549 vectors, 34 image fills.
