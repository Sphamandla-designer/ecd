# The Figma library

**File:** [`1b2PEGtGAWKqxN61KsVXy5`](https://www.figma.com/design/1b2PEGtGAWKqxN61KsVXy5/)

This is the design-side twin of the `design-system/` folder. Every value in it is a Figma
variable or style carrying the **real code name** as its code syntax, so what Dev Mode prints is
what you type — there is no translation step.

> **Which one wins?** The repo. Figma is the visual truth; the repo is the machine truth. If
> they disagree, fix Figma. The one exception is documented at the bottom of this file.

---

## Pages

| Page | What lives there |
|---|---|
| 📕 Cover | Version and scope |
| 📖 Getting started | Token → code mapping, Dev Mode notes, theming, naming rules |
| 🎨 Foundations · Colour | 42 live swatches with hex, CSS var and measured contrast |
| 🔤 Foundations · Typography | The font-pairing rule and a 20-row type specimen |
| 📐 Foundations · Space, Radius & Elevation | 4 dp grid, the 360/16/328 anatomy, 8 radii, 6 elevations |
| 🧩 Icon | 26 stroke icons as one variant set |
| 🧩 Button · Input & Form · Card & List row · Alert, Badge & Chip · Navigation · Overlay | The component library, one page per family |
| 📱 Screens · Editable | Four screens assembled from instances, each with a spec panel |
| ELP Prototype — Screens & Annotations | All 100 prototype screens with decisions, assumptions and proposals |

---

## Variables — 6 collections, 169 variables

Every variable is explicitly scoped (never `ALL_SCOPES`) and carries WEB + ANDROID code syntax.

| Collection | Modes | Contents |
|---|---|---|
| `1 · Primitives` | Value | Raw ECD Connect and SmartStart hues, status and domain constants. **Scoped to nothing** — Figma will not offer them in any picker. |
| `2 · Colour` | **ECD Connect · SmartStart** | `role/*`, `status/*`, `domain/*`, `category/*`. The only colour layer a component may reference. |
| `3 · Spacing` | Value | `space/*`, scoped to `GAP` |
| `4 · Radius` | Value | `radius/*`, scoped to `CORNER_RADIUS` |
| `5 · Size` | Value | `size/*`, scoped to `WIDTH_HEIGHT` (`hairline` and `focus-ring` to `STROKE_FLOAT`) |
| `6 · Typography` | Value | Font families, styles, size and line-height ramps |

**White-labelling is a mode, not a fork.** Select a frame → right panel → `2 · Colour` → choose
`ECD Connect` or `SmartStart`. Every role re-points; status, domain, spacing, radius, size and
type do not move. A new tenant is a new mode plus a new `brand/<tenant>/*` primitive group — it
is never a new component.

Status and domain variables alias the *same* primitive in both modes, which is the structural
guarantee that safety-critical meaning cannot be re-branded.

### Naming ↔ code

| Figma | Web | Android |
|---|---|---|
| `role/action` | `var(--ecd-action)` | `EcdTheme.colors.action` |
| `status/error/dark` | `var(--ecd-status-error-dark)` | `Status.errorDark` |
| `status/success/title` | `var(--ecd-status-success-title)` | `Status.successTitle` |
| `domain/happy-and-secure` | `var(--ecd-domain-happy-and-secure)` | `Domain.happyAndSecure` |
| `space/4` | `var(--ecd-space-4)` | `Space.lg` |
| `radius/lg` | `var(--ecd-radius-lg)` | `Radius.lg` |
| `size/touch-target` | `var(--ecd-touch-target)` | `Sizes.touchTarget` |

---

## Styles

Text and shadow cannot be variables in Figma, so they are styles. Each style's **description**
carries its token name — read it there.

- **20 text styles**: `Heading/H1–H4`, `Body/*` (9), `Control/*` (6), mapping 1:1 to `typescale.*`.
- **6 effect styles**: `Elevation/sm · base · lg · dropdown · button · dialog`.

---

## Components — 16 sets, 118 variants

| Component | Variants | Properties |
|---|---|---|
| Icon | 26 · `Name` | — (used via `INSTANCE_SWAP`) |
| Button | 24 · `Type × Size × State` | `Label` (TEXT), `Leading icon` (BOOLEAN), `Icon` (INSTANCE_SWAP) |
| Form field | 15 · `Type × State` | `Label` (TEXT), `Show help text` (BOOLEAN) |
| Checkbox | 6 · `Selected × State` | `Label` (TEXT) |
| Radio | 4 · `Selected × State` | `Label` (TEXT) |
| List row | 9 · `Leading × Trailing` | `Title`, `Subtitle` (TEXT), `Show subtitle` (BOOLEAN) |
| Card | 4 · `Style` | `Title`, `Body` (TEXT) |
| Category card | 4 · `Category` | — (title is data, see below) |
| Alert | 4 · `Tone` | `Show action`, `Show dismiss` (BOOLEAN) |
| Badge | 5 · `Tone` | — |
| Chip | 3 · `State` | `Label` (TEXT) |
| App bar | 3 · `Type` | `Title` (TEXT), `Show subtitle` (BOOLEAN) |
| Bottom nav | 5 · `Active` | — |
| FAB | 2 · `Size` | — |
| Dialog | 4 · `Tone` | `Show secondary action` (BOOLEAN) |
| Bottom sheet | 1 | — |

Audited: **0 hard-coded solid paints** across all 16 sets — every fill and stroke resolves to a
variable. Every set carries a written description covering anatomy, tokens, states,
accessibility and the code symbol.

### Where a TEXT property was deliberately *not* used

A Figma text property has one set-wide default, which flattens every variant to the same string.
That is right when the copy is data and wrong when the copy *is* the documentation. So:

- **Form field** — `Value` and `Help text` are plain layers. Their copy is state-specific
  (placeholder vs entered value vs error message); a shared default would collapse all five
  states into one sentence.
- **Dialog** — `Title` and `Body` are plain layers. The four tones exist to show four different
  jobs.
- **Category card** — `Title` is a plain layer holding the four **live Resources category
  names**. Home and the Resources hub read one list; a set-wide default would hide the fact that
  they must stay in sync. (This is the taxonomy bug the MVP review caught.)

---

## Accessibility decisions baked into the library

1. **48 dp hit areas are real frames.** The Large Button component is 48 dp tall with a 40 dp
   painted surface and 4 dp of transparent padding. It is not a comment in a spec.
2. **`status/*/title` exists.** Alert and banner titles are 14 px SemiBold — below the WCAG
   large-text threshold of 18.66 px bold — so they need 4.5:1, not 3:1. `status/alert/dark`
   measures 3.82:1 and `status/success/dark` 3.34:1. Both fail. `status/*/title` uses `#C23002`
   and `#487202` for those two and aliases `/dark` for error and info, so a component can bind
   `title` unconditionally and always be AA. Fills, borders and icons were not touched.
3. **State is never colour alone.** Selected chips change fill *and* weight; the active nav tab
   changes colour *and* label weight; a selected card carries a 2 dp border.
4. **The focus ring is a token.** `size/focus-ring` 2 dp in `role/action`. It is the keyboard
   focus indicator, not decoration.
5. **Two accepted exceptions**, both recorded in [foundations/colour.md](foundations/colour.md):
   white on `role/action` (2.2:1, a brand decision) and the disabled button label (1.19:1,
   exempt under WCAG 1.4.3 — and always paired with help text saying what would enable it).

---

## Known divergences

| Item | Status |
|---|---|
| The 100 screen PNGs on the annotations page | Still dashed placeholders named `IMAGE → <file>.png`. `upload_assets` is blocked by the environment's egress policy; the images are committed under `design-system/prototype-captures/`. |
| SmartStart action colour | `themes/smartstart.json` maps `action → secondary` (`#00B0E0`); the shipped prototype uses the brand purple. The JSON is treated as source of truth here and still needs a decision from the tenant owner. |

---

## Rules for contributing to the file

- Never detach an instance to change a colour. If the variant does not exist, add the variant.
- Layer names are an API. Name what a layer **is** (`Leading icon`, `Title`, `Trailing chevron`),
  never what it looks like.
- Update the repo first, then this file, then say so in the commit.
