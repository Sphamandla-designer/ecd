# Coach App → Figma

Rebuilds all 44 screens of the ECD Connect Coach App as native Figma layers in
[`bCC39z5eopW7gAc17yKRet`](https://www.figma.com/design/bCC39z5eopW7gAc17yKRet/Coach-App),
across 20 named pages, with a documentation card beneath every screen and a fully
wired prototype.

Same idea as `../admin-migration/` — extract a **layout tree** from the rendered
DOM, replay it into Figma — but for a 396×812 phone product rather than a 1440
desktop one. Read that README first for the sizing heuristics; they still apply.

## Pipeline

```
coach.html                       the shipped Coach App build
   │
   ▼
coachcap.js                      Playwright drives all 44 artboards, walks each
   │  (uses tree.js)             one, emits a nested layout tree per screen
   ▼  coach-screens.json  (332 kB)
coachcompact.js                  prune → dedupe into global tables → hoist
   │                             repeated subtrees into a reuse table
   ▼  coach-compact.json  (85 kB: 42 colours, 93 type steps, 44 layouts, 21 reused subtrees)
coachgen.js                      colour → role-variable and font → text-style maps,
   │                             plus an audit that must print zero unmapped
coachpages.js                    emit out-coach-04.js … out-coach-16.js
coachdocs.js                     emit out-doc-04.js … out-doc-16.js
   ▼
use_figma                        store the tables + renderers once, then run the batches
```

Run: `node coachcap.js && node coachcompact.js && node coachgen.js && node coachpages.js && node coachdocs.js`.

`coachgen.js` prints any colour with no role. **That list must be empty before you
build** — otherwise screens land with raw hexes instead of bound variables.

## What lives in the Figma file rather than in the payload

Three renderers are written once to `setSharedPluginData('coach', …)` and
reconstructed per call with the async `Function` constructor, so the 13 page
batches carry only data:

| Key | What it draws |
|---|---|
| `builder` | The screens, from the encoded layout tree |
| `docs` | The documentation card beneath each screen |
| `narr` | The narrative pages — cover, overview, flows, tokens, handoff |

`tables` and `reuse` hold the deduped colour/type/layout tables and the hoisted
subtrees. That trick removed about 78 kB of repeated builder transmission.

## Node encoding

Fixed arity, so a reader never has to branch on length.

| Kind | Shape |
|---|---|
| `0` frame | `[0,x,y,w,h,bg,grad,radius,strokeCol,strokeWidths,shadow,layout,opacity,clip,kids[]]` |
| `1` text | `[1,x,y,w,h,colour,style,chars,align]` |
| `2` svg | `[2,x,y,w,h,svg,colour,opacity]` |
| `3` image | `[3,x,y,w,h,src]` |
| `9` reuse | `[9,index,x,y]` |

## Things that bit, and the fixes

Four of these were silent — the build looked plausible and was wrong. All four
were caught by screenshotting the Figma result and comparing it to the source
render, which is the only check that actually works.

- **Font family matched against the whole CSS stack.** `font-family: Inter, Quicksand, …`
  matched `/quicksand/i`, so *every* Inter run was rebuilt in Quicksand. Test
  `fontFamily.split(',')[0]` only.
- **`prune()` walked a text node's colour array as if it were children.** Only frames
  have children; a text node's `c` is `[r,g,b,a]`. Recursing into it and calling
  `.filter(Boolean)` dropped every zero channel, so black `[0,0,0,1]` became `[1]`.
  35 text nodes were affected. Guard with `if (n.t === 'F' && n.c)`.
- **Auto layout collapsed the vertical rhythm.** The build spaces stacks with
  *margins*, which the DOM reports as position but not as gap. Replaying those
  containers as auto layout with gap 0 clustered the content at the top. A flex
  container now only becomes auto layout if its children actually sit gap-to-gap;
  otherwise it falls back to absolute.
- **Alignment and wrapping shared one slot.** `n.ta || (lines > 1 ? 'W' : 0)` let
  alignment win, so centred paragraphs rebuilt as one long line that overflowed the
  frame. They are independent — a centred paragraph is `'CW'`.
- **`line-height: normal` approximated as 1.3 × size** drifted every baseline.
  Encode it as `-1` and map to `{unit:'AUTO'}`.
- **Per-side border colours.** `getComputedStyle` returns `currentColor` for sides
  with zero width, so reading `borderTopColor` on a bottom-only border reports every
  hairline as navy. Read the colour of a side that actually has width.
- **Modern `rgb(r g b / a)` syntax** parsed to a one-element array. Split on
  whitespace as well as commas, and reject anything shorter than three channels.
- **Figma renders these faces marginally wider than the browser measured**, so
  fixed-width text re-wrapped. Single-line text uses `WIDTH_AND_HEIGHT`; only
  genuinely wrapped runs keep a fixed width with `HEIGHT`.

## Divergences carried into the file

Reproduced faithfully so design and build agree. Each is annotated on the screen
it appears on and collected on pages 18 and 20.

- **`#000000` in 35 text nodes.** There is no black in this palette. Bound to
  `legacy/black` so it can be found and fixed in one pass.
- **Three warning inks** — `#8F5B08`, `#6B4405`, `#5C4A00` — all used as amber text.
- **67 type steps** for a 44-screen phone app, including half-point neighbours.
- **`role/action` (#1DBADF) at 2.2:1 on white.** Safe as a fill, unsafe for text.
  The build follows that rule; nothing enforces it.
- **Nine missing screen codes** — VIS-04/05/06, WORK-02/03/04, ACT-01, OFF-01,
  OFF-05. Reported as gaps; nothing was invented to fill them.

## Prototype

Figma cannot link across pages, so page 19 holds a clone of all 44 screens wired
end to end: 132 connections, 12 named flow starting points, and an audit that
confirms every frame has at least one outgoing connection.
