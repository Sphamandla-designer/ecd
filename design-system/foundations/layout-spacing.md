# Layout, spacing, radius & elevation

All values measured from the Figma component frames on page
[`0:1`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=0-1) and
confirmed against screen geometry on all five feature pages.
Machine-readable: [`../tokens/tokens.json`](../tokens/tokens.json) → `space.*`, `radius.*`, `size.*`, `elevation.*`.

---

## 1. The two numbers that define every screen

```
┌─ 360 dp ────────────────────────────────┐   frame width (mdpi reference)
│ 16 │◄────── 328 dp ──────────────────►│ 16│   screenMargin / contentWidth
└─────────────────────────────────────────┘
```

**360 dp frame · 16 dp margin · 328 dp content.**

Every card, button, alert, list row, input, dialog and action panel in the entire file is
**328 dp wide**. If a component you are building isn't 328, either it's one of the four
documented exceptions below, or it's wrong.

| Exception | Width | Why |
|---|---|---|
| Dialog inner content & dialog buttons | **296 dp** | 328 − 2 × 16 dialog padding |
| Sidebar / menu items | **288 dp** | Inside a 365 dp drawer |
| `full width` divider | **360 dp** | Deliberately breaks the margin, edge to edge |

> Tables are **not** an exception: they are 328 dp like everything else. The Table frame on the
> Design System page is 318 dp, but that is its presentation frame — the live instance on the
> money dashboard (`139:56619`) measures 328 dp across three 109.33 dp columns.

Half-width field pairs are **164 dp** each (not 160 — measured on `100:4175`).

---

## 2. Vertical rhythm — the screen skeleton

Screens are assembled from a fixed stack of bands. Learn this and most screens build themselves:

```
┌──────────────────────────────────────┐
│ App bar                       64 dp  │  navy, always present
├──────────────────────────────────────┤
│ Tabs                          56 dp  │  optional
├──────────────────────────────────────┤
│ Filters bar with Search       56 dp  │  optional (list screens)
│   — or — Language selector    74 dp  │  optional (content screens)
├──────────────────────────────────────┤
│                                      │
│ Form Layout / scrolling content      │  16 dp margins, 328 dp column
│   Page Title                  44–64  │
│   content blocks                     │
│                                      │
├──────────────────────────────────────┤
│ Footer: divider + 40 dp button 72 dp │  optional, sticky
└──────────────────────────────────────┘
```

| Band | Height | Notes |
|---|---|---|
| App bar | **64 dp** | Navy `role.appBar`, white content, 16 dp side padding |
| Tabs | **56 dp** | Also 48 dp compact and 64 dp for logo rows |
| Filters bar with Search | **56 dp** | `role.background` fill, hairline bottom border |
| Language selector | **74 dp** | `role.background`, label + cyan dropdown chip, bottom divider |
| Footer action bar | **72 dp** | = 16 top padding + 40 dp button + 16 bottom |
| Page Title block | 44–64 dp | H1/H2 inside a 328 dp frame |

---

## 3. Spacing scale (4 dp base)

| Token | dp | Used for |
|---|---|---|
| `space.1` | **4** | Label → field, list-row gaps, icon → text in small buttons, validator segment gaps |
| `space.2` | **8** | Button icon gap, chip gaps, stacked-text gaps, some list gaps |
| `space.3` | **12** | Alert icon → content gap, FAB vertical padding, dialog leading-content gap |
| `space.4` | **16** | **The workhorse** — screen margins, card padding, alert padding, section gaps, stacked dialog buttons |
| `space.6` | **24** | Dialog vertical padding, gaps between component groups |
| `space.8` | **32** | Large section breaks, empty-state padding |

**List gaps are 4 dp by default** (the `Children list` pattern), but hub-card lists use 8 dp.
Both appear in the file; follow the screen spec.

### Measured component padding

| Component | Padding |
|---|---|
| Frame / screen | `16` all round |
| Card, alert, action panel | `16` |
| **Dialog** | `24` top/bottom, `16` left/right |
| **Full-width button** | `10` vertical, `17` horizontal |
| Small button | `8` vertical, `9–12` horizontal |
| Chip | `9` vertical, `16` horizontal |
| Textarea | `12` vertical, `16` horizontal |
| Input (text inset) | `16` left resting, `13` with icon, `14` when focused |

> The odd numbers are **border compensation, not mistakes**. A secondary button has a 2 dp
> border, so its padding is 17 dp to keep the label optically aligned with a primary button's
> 16 dp + 1. Likewise a focused input's 14 dp inset + 2 dp border = the 16 dp resting inset.
> **Reproduce them exactly** — normalising to 16 shifts text by a pixel on every state change.

---

## 4. Corner radius

| Token | dp | Applied to |
|---|---|---|
| `radius.xs` | **2** | Password-validator segments |
| `radius.alertButton` | **4** | Small button embedded inside an alert |
| `radius.sm` | **6** | Inputs, selects, segment-group container, `Informational 4` alert |
| `radius.md` | **10** | Alerts, cards, list rows, small buttons, individual segments, filter items |
| `radius.lg` | **15** | **Full-width buttons** — note 15, not 16 |
| `radius.xl` | **20** | Dialog cards, chips/pills |
| `radius.xxl` | **24** | FAB, 48 dp icon circles, badge pills |
| `radius.full` | 999 | Progress bars, fully-round pills |

Rule of thumb: **the smaller and denser the element, the smaller the radius.** Anything
tappable and card-like is 10–15; anything playful or branded is a full circle.

---

## 5. Elevation

| Token | Value | Used on |
|---|---|---|
| *(none)* | — | List rows, inputs, inline alerts, cards on tinted background, **secondary buttons**, **disabled buttons** |
| `elevation.sm` | `0 1 2 rgba(0,0,0,0.05)` | Chips |
| `elevation.base` | `0 1 2 #0000000F` + `0 1 3 #0000001A` | Subtle card lift |
| `elevation.lg` | `0 4 6 −2 #0000000D` + `0 10 15 −3 #0000001A` | Raised cards |
| `elevation.dropdown` | `#CAC5D8` 1 dp ring + `elevation.lg` | **Select & filter dropdown menus** |
| `elevation.button` | `0 10 10 −5 rgba(39,56,90,0.2)` | **Primary buttons and FAB only** |
| `elevation.dialog` | `0 20 12.5 rgba(0,0,0,0.1)` + `0 10 5 rgba(0,0,0,0.1)` | Dialog cards, slide-overs |

Two rules that are easy to miss:
1. **Only primary buttons carry a shadow.** Secondary, disabled and loading-secondary buttons
   have none. The shadow is part of what signals "this is the main action".
2. The dropdown shadow includes a **1 dp `#CAC5D8` ring** (a spread shadow, not a border) —
   this is what separates an open menu from the content behind it.

Background does most of the separation work: white `role.surface` cards on tinted
`role.background`. Most surfaces need no shadow at all.

---

## 6. Size quick-reference

| Element | Size |
|---|---|
| **Touch target minimum** | **48 × 48 dp** — non-negotiable |
| Full-width button | 328 × **40 dp** visual, radius 15 → wrap in 48 dp touch target |
| Small button | **32 dp** high, radius 10 |
| FAB collapsed / extended | **48 × 48** / 48 dp high (e.g. 153 × 48, 187 × 48) |
| Input / select (closed) | **48 dp** high, radius 6 |
| Textarea | **120 dp** high |
| Form photo | **160 dp** filled, **156 dp** empty (dashed) |
| Chip / filter trigger | **40 dp** high, radius 20 |
| Filter menu item | **48 dp** (66–67 dp with sub-label) |
| Dropdown menu | 328 wide, 248 dp tall (4 × 48 + 48 header + padding) |
| Badge | **28 dp** high; offline badge 48 × **16** |
| Avatar | **48** (sm) / **120** (lg) / **125** (with 32 dp camera badge) |
| Icon circle | **48 dp**, glyph 22–24 dp |
| Divider | **1 dp** |
| Validator segment | 4 dp high, radius 2 |
| Focus ring / secondary border | **2 dp** |
| Dialog | 328 wide, radius 20, content 296 |

### List row heights

| Height | Row type |
|---|---|
| **56 dp** | Compact / amount rows |
| **64 dp** | Large-sum row |
| **76–77 dp** | Title + action row |
| **80 dp** | **The default** — 48 dp icon circle + 2 lines + chevron |
| **92 dp** | Long (two-line description) |
| **112–118 dp** | Longest (two-line title + description + badge) |

Rows sit in a `Children list` with a 4 dp gap, so the **pitch** is height + 4
(e.g. 80 dp rows repeat every 84 dp; 98 dp rows every 102 dp).

---

## 7. Responsive behaviour

The file only specifies 360 dp. These are the system's rules for everything else:

- **< 360 dp** (e.g. 320 dp devices): keep the 16 dp margin, let the content column shrink.
  Never shrink the margin — it's the only thing keeping text off the screen edge.
- **> 360 dp** (most modern phones): let the content column grow with the margin fixed at
  16 dp. Do **not** centre a fixed 328 dp column on a 412 dp phone — the designs are meant to
  fill the width.
- **Tablets / ≥ 600 dp**: cap the content column at **600 dp** and centre it. Dialogs stay
  328 dp and centred regardless of screen size.
- **Landscape**: content scrolls; the footer action bar stays sticky at the bottom.
- **Horizontal scroll** is used deliberately in two places — the tab strip and the filter-chip
  row (measured inner widths of 455 dp and 491 dp exceed the 360 dp frame). Everywhere else,
  horizontal scrolling is a bug.
