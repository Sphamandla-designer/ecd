# Admin Platform — Dashboard in Figma

The primary screen of the **ECD Admin Platform** rebuilt as native, editable Figma layers in
[`k0txjCbvsb0PgtKc5aoVtW`](https://www.figma.com/design/k0txjCbvsb0PgtKc5aoVtW/Admin-panel),
page `0:1` (`Admin Platform · Dashboard`).

Source of truth: `ECD Admin Platform (standalone).html` on branch
`claude/mobile-design-system-rmx7ni` (commit `5591cc9`, "Admin panel").

Not a screenshot. Text is text, icons are vectors, every fill resolves through a variable and
every text node carries a style. Geometry, colours and copy were read off the **running build's
rendered DOM** at 1440 wide, so the file shows what the browser actually paints.

## What is on the page

| Node | Size | What it is |
|---|---|---|
| `Dashboard — Back-end user` | 1440 × 1407 | The screen. One horizontal auto-layout: 228dp rail + 1212dp content column. |
| `Spec — Dashboard` | 760 × 2847 | Dev-facing spec: source, layout, colour map, type ramp, component inventory, accessibility decisions, divergences. |
| `Design system · Admin Platform` | section | The 10 components and 13 icons the screen is assembled from. |

73 instances, 182 text nodes, **zero** unstyled text, **zero** unintended hard-coded fills.

## Foundations

**`1 · Primitives`** — 39 raw colours, `scopes: []` so they never pollute a picker.
**`2 · Colour`** — 43 semantic roles, each aliasing a primitive, scoped to where it is legal
(`TEXT_FILL` / `FRAME_FILL` / `STROKE_COLOR`). Components bind to roles only.

One mode. The Admin Platform is the operator console — the tenant name in the top bar
("SmartStart · Pilot tenant") is *data*, not a theme, so there is no white-label seam here the
way there is in the mobile library.

The palette is the mobile system's, extended for desktop density:

| New for desktop | Hex | Why the mobile token would not do |
|---|---|---|
| `role/action-ink` | `#0F7690` | `#1DBADF` is 2.2:1 on white. Desktop puts action colour on 12px text constantly. |
| `role/line` … `line-hairline` | `#E3E7EC` → `#F6F8FA` | Four distinct rule weights: card border, card-header rule, table-head rule, row rule. Mobile has one. |
| `role/background` | `#EEF2F6` | Cooler than the mobile `#EFF6FA` — cards read as raised against it. |
| `status/*/ink` | `#4A7A16` `#8F5B08` `#C1004F` | Pills run at 11px, so tones are darkened past the mobile `dark` values. |
| `data/bar-*`, `data/spark` | `#1DBADF` `#F7A600` `#BFE08E` | Chart-only. Never used for UI state. |

**Type** — 31 styles. Quicksand for headings, labels and chrome; Inter for data, body and
anything numeric. Same split as the mobile app.

## Components

| Component | Variants | Properties |
|---|---|---|
| Nav item | State = Default · Active | Label, Count, Badge (bool), Icon (swap) |
| Button | Style = Primary · Secondary | Label |
| Status pill | Tone = Success · Warning · Danger × Face = Data · Label | Label |
| Attention row | Tone = Warning · Danger · Info | Count, Title, Body, Link |
| Stat card | — | Label, Value, Delta, Annotation (bool) |
| Activity row | Tone = Completed · Visit · New · Sent | Glyph, Title, Time |
| List row | — | Name, Meta, Monogram, Avatar (bool) |
| Table row | — | Coach, Visits done, Visits due, Last active |
| Count chip | — | Count |
| Annotation marker | — | — (design-time only) |
| `Icon/*` | 13 icons, 16 × 16 | Stroke bound to `role/rail-text` |

Card headers are deliberately **not** a component. The four on this screen differ in padding,
rule and trailing slot; one component with three booleans would read worse than four named
auto-layout frames.

## Accessibility decisions

- **`role/action-ink`, never `role/action`, for text.** Cyan is a fill colour only.
- **Status is a word, not a colour.** *On track* / *Falling behind* / *No visits* each survive
  greyscale.
- **Chart columns print their value.** The amber/cyan split marks below/above target; the `%`
  label is what is actually read.
- **Rail badges hide at zero** — `Badge = false`, not a badge showing `0`.
- **The bell dot carries the count**, so it is not colour alone.

## Divergences a dev must know about

- **Chart bars cap at 85dp.** W3 (71%) through W8 (82%) render identically in the build — the
  column flexes to a fixed max, so anything above ~71% looks the same. Reproduced faithfully so
  design and build agree; **fix the height scale in code, do not copy this geometry.**
- **The amber "A" chips are not product UI.** They are spec notes from the prototype harness.
  Strip before build.
- **The status pill has two typographic faces.** The build uses Inter in the table and Quicksand
  in the list rows; `Face=Data` / `Face=Label` preserves that. Unifying is a one-variant change
  if design wants it.
- **Rail wash values are raw paints.** The 8% / 9% / 12% / 20% white overlays are opacity on
  white, not palette entries.
- **Prototype chrome excluded.** The dark `PROTOTYPE CONTROLS` strip at the top of the HTML build
  is a harness, not the product, and is not in the frame.

## Rebuilding

The screen was authored directly against the Plugin API rather than dumped from paint ops (the
route used for the 103 mobile screens in `implementation/prototype-export/`). One screen at
desktop density is worth hand-composing: it yields real auto-layout and real components instead
of absolutely-positioned rectangles, which is what "editable" has to mean for a screen a designer
will actually work in.

Geometry was read with Playwright against the running build. Two things that would otherwise be
got wrong:

- **Read `borderBottomColor`, not `borderTopColor`.** With `border-bottom: 1px solid #E3E7EC` and
  no other border set, the *top* border colour computes to `currentColor` — navy. Reading the top
  side reports every hairline in the file as dark navy.
- **`resize()` resets auto-layout sizing modes to FIXED.** Sizing a component after building it
  pins it, so long labels overflow instead of hugging. Set `primaryAxisSizingMode` *after* any
  `resize()`.
