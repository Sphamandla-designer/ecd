# Typography

Extracted from the Figma **Text** frame
[`100:1163`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=100-1163),
the **Title** frame [`100:4971`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=100-4971),
and `get_design_context` on every component frame. Machine-readable: [`../tokens/tokens.json`](../tokens/tokens.json) → `typescale.*`.

Typography is **identical in every tenant** — the white-label layer swaps colour and logo,
never the type system.

---

## 1. Two families, one rule

| Family | Weights used | Used for |
|---|---|---|
| **Quicksand** | SemiBold 600; Medium 500 (resting chips, swatch labels) | Headings, buttons, form labels, list-row titles, chips, tabs |
| **Inter** | Regular 400, Medium 500, SemiBold 600 | Body copy, help text, subtitles, data, numbers, alert titles |

> **The rule: Quicksand names things, Inter explains them.**
> A heading, a label, or anything you tap is Quicksand. Everything you read is Inter.

Both are Google Fonts with broad glyph coverage for South African languages. Quicksand's
rounded terminals carry the warm, child-centred brand tone; Inter carries the dense
information (amounts, statements, observation questions) that Quicksand handles poorly at
small sizes. Letter-spacing is **0** across the scale except `overline` and `tableHeader`.

> The Figma styles are named `tracking-wide` and `tracking-wider`, and `get_variable_defs`
> reports them as `letterSpacing: 2.5` / `5`. Those are **percentages** (Tailwind `0.025em` /
> `0.05em`), not pixels — reading them as px makes "NOV 2021" ~50 % too wide and it wraps out
> of a 109 dp table column.

---

## 2. Type scale

### 2.1 Headings — Quicksand SemiBold 600

| Token | Figma style | Size / line-height | Colour | Used for |
|---|---|---|---|---|
| `h1` | `ECD H1` | **24 / 32** | `textDark` | Page titles (`Page Title` component `100:4972`) |
| `h2` | `EDC H2` *(sic — typo in file)* | **20 / 28** | `textDark` | Section titles, in-page page-titles, empty-state headlines |
| `h3` | `ECD H3` | **18 / 24** | `textDark` | Card titles, **dialog titles**, app-bar titles, bottom-sheet titles |
| `h4` | `ECD H4` | **16 / 22** | `textDark` | Form labels, list-row titles |

> The Text frame records H2/H3/H4 line-height as `normal` (100 %), but every real usage across
> the five screen pages resolves to the values above (H2 20/28 confirmed on the Child-progress
> page). Use the numbers in this table — `normal` collapses multi-line headings.

### 2.2 Body — Inter

| Token | Figma style | Size / line-height | Weight | Colour | Used for |
|---|---|---|---|---|---|
| `body` | `ECD Body Copy` / `Body Copy` | **16 / 24** | 400 | `textMid` | Default body text, dialog body, long descriptions |
| `bodyTight` | `Text Base Regular` | 16 / 22 | 400 | `textDark` | Filled input values |
| `bodyMedium` | `Text Base Medium` / `H4` (Inter) | 16 / 22 | 500 | `textDark` | Dialog sub-heads, emphasised body, "Important" lines |
| `help` | `ECD Help text` / `Small` / `Text SM Regular` | **14 / 20** | 400 | `textMid` | Help text, list subtitles, app-bar subtitles, error messages |
| `helpMedium` | `Text SM Medium` | 14 / 20 | 500 | `textDark` | Emphasised secondary text |
| `helpStrong` | `Text SM Semibold` | 14 / 20 | 600 | status `Dark` | **Alert / banner titles** |
| `caption` | `Text XS Regular` | 12 / 16 | 400 | `textMid` | Fine print |
| `captionMedium` | `Text XS Medium` | 12 / 16 | 500 | varies | Badge labels, slide-over action captions, offline pill |
| `overline` | `text-xs/…/tracking-wide/uppercase` | 12 / 16, **letter-spacing 0.025em**, UPPERCASE | 600 | `textDark` | `LEVEL 2` badges, subcategory headers |
| `tableHeader` | `text-xs/…/tracking-wider/uppercase` | 12 / 16, **letter-spacing 0.05em**, UPPERCASE | 500 | `textDark` | Table column headers ("NOV 2021") |

### 2.3 Interactive — Quicksand

| Token | Size / line-height | Weight | Used for |
|---|---|---|---|
| `button` | **14 / 20** | 600 | Full-width (40 dp) button labels |
| `buttonSmall` | 12 / 16 | 600 | Small (32 dp) button labels |
| `buttonFab` | 16 / 22 | 600 | Extended FAB label |
| `chip` | 14 / 16 | **500** | Chip / segment **resting** |
| `chipActive` | 14 / 16 | **600** | Chip / segment **selected** |
| `swatchLabel` | 16 / 22 | 500 | Palette & alert swatch labels (documentation only) |

> Chips change **weight** as well as colour on selection (Medium → SemiBold). Don't skip this —
> it's what keeps selection legible for users who can't distinguish the pink fill.

---

## 3. Composition patterns

### 3.1 Form field block
```
h4 label            Quicksand SemiBold 16/22, textDark
  ↓ 4 dp
help text           Inter Regular 14/20, textMid          ← optional
  ↓ 4 dp
field               48 dp, value Inter 16/22, textDark
  ↓ 4 dp
error message       Inter Regular 14/20, status.error.dark ← only when invalid
```

### 3.2 List row
```
h4 title            Quicksand SemiBold 16/22, textDark
help subtitle       Inter Regular 14/20, textMid
```

### 3.3 Alert
```
helpStrong title    Inter SemiBold 14/20, status.<x>.dark
body                Inter Regular 14/20, textDark          ← NOT the status colour
```

### 3.4 App bar
```
h3 title            Quicksand SemiBold 18/24, white
help subtitle       Inter Regular 14/20, white @ reduced opacity
```

### 3.5 Dialog
```
h3 title            Quicksand SemiBold 18/24, textDark, CENTRED
bodyMedium lead     Inter Medium 16/22, textDark            ← optional "Important" line
body                Inter Regular 16/24, textMid, CENTRED
button              Quicksand SemiBold 14/20
```

---

## 4. Implementation rules

**Units.** Sizes are **sp** on Android (respect the user's font-scale setting) and **px/rem** on
web. Line-heights are **dp/px** — fixed, not multipliers — so rows keep their rhythm.

**Font loading.** Both families ship via `androidx.compose.ui.text.google.fonts` (already wired
in `app/build.gradle.kts`). Bundle a fallback for offline first-run: the app is offline-first
and must not render system-default type on a cold, disconnected start.

**Font scaling.** Layouts must survive 200 % font scale. The 328 dp content column and the row
heights (56/64/77/80/92/112 dp) are **minimums** — let rows grow, never clip.

**Wrapping over ellipsis.** Prefer wrapping for form labels, buttons and alerts. The one place
the designer explicitly asks for ellipsis is **long class names** (note `145:12454`) — use
`TextOverflow.Ellipsis` there only.

**Multilingual.** Copy expands up to ~35 % in isiZulu/isiXhosa. Buttons and list titles must
auto-wrap. Content is translated per-tenant and per-resource (see the language selector
pattern) — never bake copy into an image.

**Casing.** Sentence case everywhere, buttons included ("Complete your profile"). Only
`overline` and `tableHeader` are uppercase, and they carry the tracking noted above. Never uppercase a button label
or heading — it hurts legibility for low-literacy users.

**Minimum sizes.** Body ≥ 16 sp, help ≥ 14 sp. 12 sp exists only for badges and captions, never
for content the user must read to proceed.

**Numbers.** Money, percentages and counts are always Inter — even when display-sized (the
`100%` on the progress dashboard, `+ R 100.30` on the money card). Use tabular figures where
available so columns align.
