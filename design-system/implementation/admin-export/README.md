# Admin Platform → Figma

Rebuilds the eleven list/table screens of `ECD Admin Platform (standalone).html` as **native
auto-layout** in [`k0txjCbvsb0PgtKc5aoVtW`](https://www.figma.com/design/k0txjCbvsb0PgtKc5aoVtW/),
page `Admin Platform · Dashboard`.

Different from the mobile pipeline in `../prototype-export/`. That one emits **paint ops** —
flat, absolutely-positioned rectangles and text. Good enough for 103 phone screens nobody was
going to restructure. This one emits a **layout tree**: every flex/grid/block container becomes a
real Figma auto-layout frame with the direction, gap, padding and alignment it has in the browser.
Resize a frame here and it reflows the way it will in code.

## Pipeline

```
admin.html                        the shipped build (no harness patch needed —
   │                              the screens are reachable by clicking the nav)
   ▼
extract-admin.js                  Playwright drives all 12 screens, walks each <main>,
   │                              emits a nested layout tree per screen
   ▼  admin-screens.json  (280 kB)
compact-admin.js                  resolve fonts → text styles, colours → role variables,
   │                              dedupe into global tables, truncate default fields
   ▼  admin-compact.json  (36 kB, 39 colours, 35 styles, 55 layouts)
gen-admin.js                      emit out-adm-1..5.js
   ▼
use_figma                         store the tables once, then run the batches
```

Run: `node extract-admin.js && node compact-admin.js && node gen-admin.js`.

`compact-admin.js` prints any font or colour that has no token. **Both lists must be empty before
you build** — otherwise the screens land with raw hexes and unstyled text. Closing those gaps is
what turned 12 unmatched fonts and 12 unmatched colours into 14 new text styles and 23 new
variables.

## Node encoding

`kids` sits at index 4 so every optional field can be truncated off the tail.

| Kind | Shape |
|---|---|
| `0` frame | `[0, w, h, layoutIdx, kids[], bg?, border?, radius?, shadow?, opacity?, grow?]` |
| `1` text | `[1, w, h, styleIdx, colourIdx, chars, align?, grow?]` |
| `2` svg | `[2, w, h, svgIdx, colourIdx]` |

Layer names are **not** shipped — the builder names each frame after the first text in its
subtree, which is already in the payload. That alone cut the total by about a fifth.

## Sizing heuristics

The hard part is telling hug from fill from fixed, because the DOM only reports what happened.

- **Horizontal fill** when the element has `flex-grow`, or when its width matches the parent's
  content box in a vertical parent.
- **Horizontal fixed** otherwise — then, once children exist, if nothing inside is filling and the
  frame's hug width lands within 4px of the measured width, switch it to **hug**. That is what
  keeps buttons and chips from wrapping their labels over a 1px font-metric difference.
- **Vertical hug** always, then fixed only if the hugged height drifts more than 1.5px from what
  the browser painted.
- **Text** is measured at its natural width first. Matching the measured width means it is a
  single tight line → leave it hugging. Differing means it is a table cell (box wider than the
  text) or a wrapped paragraph (box narrower) → pin the width and let the height compute.

## Things that bit, and the fixes

- **Read `borderBottomColor`, not `borderTopColor`.** With `border-bottom: 1px solid #E3E7EC` and
  nothing else set, the *top* border colour computes to `currentColor` — navy. Reading the top
  side reports every hairline in the product as dark navy. This silently produced a design file
  full of heavy rules until the pixels were checked.
- **`resize()` resets auto-layout sizing modes to FIXED.** Sizing a component after building it
  pins it, so long labels overflow instead of hugging. Set `primaryAxisSizingMode` *after* any
  `resize()`.
- **`<select>` and `<input>` have no DOM children to walk.** They rendered as empty boxes. The
  extractor now emits a synthetic text child from the selected option, the value, or the
  placeholder.
- **Grid cells must keep their track width.** An early version let single-line text hug
  everywhere, which collapsed every table into one run-on column.
- **`textAutoResize` has no `'WIDTH'`.** It is `'WIDTH_AND_HEIGHT'`.
- **`query('[name=Count circle]')` returns null on names with spaces.** Use `findOne` with a
  predicate.
- **The root `<main>` is stretched by the viewport**, so its measured height is meaningless. Let
  it hug and derive the screen height from `52 + main.height`.

## Divergences carried into the file

Reproduced faithfully so design and build agree; each is flagged in the Spec panel.

- **Row actions use two weights** for the same control class — Quicksand Bold 11.5 on some
  screens, SemiBold 11.5 on others. Both are in the ramp so the file matches the build.
- **Feedback & Cases renders `#000000`** in the "From" column. There is no black in this system;
  bound to `role/text-dark` here and flagged for a CSS fix.
- **POST-MVP chips** sit on disabled export buttons. `role/disabled-bg` exists only for that
  pairing.
- **Filter dropdowns** are drawn in their resting state only — the open state is not designed.
