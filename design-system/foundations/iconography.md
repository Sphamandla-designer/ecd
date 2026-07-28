# Iconography

Extracted from the Figma **Icons** frame
[`100:5163`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=100-5163)
(1258 × 1345 dp, ~400 glyphs) plus the bespoke icon nodes on page `0:1`.

---

## 1. The library — Heroicons v1, two families

| Family | Figma name | Grid | Style |
|---|---|---|---|
| **Outline** | `Icon/Outline/<name>` | **24 × 24 dp** | Stroked |
| **Solid** | `Icon/Solid/<name>` | **20 × 20 dp** | Filled |

The two families share the same name set, so `Icon/Outline/search` and `Icon/Solid/search`
are the same glyph in two styles. **This is Heroicons v1 naming** (`menu-alt-2`,
`arrow-circle-down`, `exclamation-circle`, `chat-alt-2`, `status-offline`…), not v2 — do not
substitute a v2 set, the names diverge.

> **The size is baked into the family.** Outline icons are drawn on a 24 dp grid and Solid on
> a 20 dp grid. A Solid icon used at 24 dp will look heavier than the design intends. When you
> need a 24 dp filled glyph, scale deliberately and check it against the Figma frame.

### Glyph inset convention

Inside its frame the glyph is inset by a fixed percentage — reproduce this or icons will look
inconsistently sized:

| Family | Inset |
|---|---|
| `Icon/Outline/*` (24 dp) | `15%` |
| `Icon/Solid/*` (20 dp) | `10%` |
| `Icon/Solid/x` | `20%` |
| `Icon/Solid/eye` | `15% 2.29%` |
| `arrow-sm-*` | `25% 20%` |

### The names you will actually use most

`search` · `chevron-right` · `chevron-down` · `chevron-left` · `chevron-up` · `x` ·
`x-circle` · `check` · `check-circle` · `exclamation` · `exclamation-circle` ·
`information-circle` · `question-mark-circle` · `plus` · `plus-circle` · `pencil` ·
`pencil-alt` · `trash` · `calendar` · `clock` · `eye` · `eye-off` · `thumb-up` ·
`thumb-down` · `arrow-circle-down` · `arrow-circle-right` · `arrow-left` · `arrow-right` ·
`download` · `upload` · `document-download` · `document-text` · `save` · `share` ·
`paper-airplane` · `external-link` · `link` · `filter` · `adjustments` · `refresh` ·
`chat-alt-2` · `bell` · `user` · `users` · `user-group` · `home` · `cash` · `currency-dollar` ·
`calculator` · `receipt-tax` · `chart-bar` · `chart-pie` · `presentation-chart-bar` ·
`clipboard-list` · `clipboard-check` · `book-open` · `light-bulb` · `academic-cap` ·
`puzzle` · `sparkles` · `star` · `heart` · `emoji-happy` · `emoji-sad` · `camera` ·
`photograph` · `translate` · `globe-alt` · `menu-alt-2` · `dots-vertical` · `status-offline` ·
`status-online` · `lock-closed` · `shield-check` · `speakerphone` · `truck` · `gift`

The complete 200-name list is in
[`../extraction/00-design-system-page.md`](../extraction/00-design-system-page.md) §11.1.

Solid-only additions: `user-remove`, `icon-currency-dollar`, `md-library`, `view-grid-add`,
and two money-specific glyphs — **`Moneyin`** (`100:6239`) and **`Moneyout`** (`100:6235`),
used on the money dashboard rows.

---

## 2. Bespoke & third-party glyphs

Drawn specifically for this product, in the same frame:

| Icon | Node | Size |
|---|---|---|
| `Whatsapp` | `100:6533` | 22 dp |
| `Mom` | `100:6540` | 16 dp |
| `Baby` | `100:6544` | 16 dp |
| `man 1` | `100:6551` | 24 dp |
| `foot-print (2) 1` | `100:6558` | 24 dp |
| `puzzle (1) 1` | `100:6566` | 24 dp |
| `greeting 1` | `100:6573` | 24 dp |
| `trophy (4) 1` | `100:6580` | 20 dp |
| `piggy-bank 1` | `100:6587` | 24 dp |
| `book 1` | `100:6598` | 20 dp |
| `kindergarten 1` | `100:6601` | 20 dp |
| `crown (2) 1` | `100:6608` | 20 dp |
| `man-dancing- 1` | `100:9408` | 28 dp |
| `YouTube-icon-logo` | `100:6610` | 19 × 14 dp |
| `circle` / `Triangle` / `Square` | `100:6536` / `100:6538` / `100:6548` | 24 dp |

---

## 3. Developmental-domain icons — 48 dp, fixed colours

These four are **content**, not UI chrome. They carry curriculum meaning and their colours are
never themed (see [colour.md §5.2](colour.md#52-developmental-domains--fixed-never-themed)).

| Domain | Node | Colour token |
|---|---|---|
| Social & emotional | `100:9047` | `domain.happyAndSecure` `#D3276C` |
| Cognitive *(labelled "cogntive" in the file)* | `100:9050` | `domain.discoveryProblem` `#6974AF` |
| Physical | `100:9053` | `domain.developingBodies` `#359AD1` |
| Language | `100:9056` | `domain.speakingListening` `#9E4D8E` |

They appear as: the leading mark in `Grid Lists/Card` (`100:7324`, `100:7328`), the header icon
on Progress/Notes cards, the panel headers in the A4 progress-summary PDF, and the skill icons
on activity chooser cards.

---

## 4. Size scale

| Size | Where |
|---|---|
| **16 dp** | Small-button icons, spinner, inline `Mom`/`Baby` |
| **20 dp** | Solid family default: button icons, alert icons, input trailing icons |
| **22 dp** | Glyph inside a 48 dp icon circle; dismiss ✕; WhatsApp |
| **24 dp** | Outline family default: list chevrons, app-bar actions, back arrow |
| **28 dp** | `man-dancing` |
| **38 dp** | Chat-tip circle (`100:3859`) |
| **48 dp** | Icon circles, Immediate-alert icons, dialog status icons |

---

## 5. The icon circle — the workhorse container

Icons rarely sit naked. The dominant pattern across every feature is a **48 dp circle**
(`radius.xxl` = 24) filled with a category or status colour, holding a **22–24 dp white glyph**:

```
┌─────────────┐
│   ╭─────╮   │  48 dp circle, fill = category.<x>.main
│   │  ✚  │   │  glyph 22–24 dp, role.onAction (white)
│   ╰─────╯   │
└─────────────┘
```

Used in: list rows (`action item icon`), hub cards, action panels, the money dashboard, the
bottom-sheet action buttons (magenta), and avatars-with-initials.

**This chip is the primary way categories are colour-coded across the product.** See
[colour.md §5.1](colour.md#51-content-categories-hub-cards-resource-types-badges) for the
main/tint pairings.

Smaller variants: 40 dp circle for filter-bar search (magenta) and hub-card icons; 32 dp for
the camera badge on avatars.

---

## 6. Colour rules

| Context | Icon colour |
|---|---|
| On a coloured fill (button, chip, icon circle, badge) | `role.onAction` / `role.onSelect` — white |
| On the navy app bar | white; the help "?" chip is `role.action` cyan |
| In an alert | the status `Main` colour |
| List chevrons, metadata | `role.textMid` |
| Disabled | `role.textLight` |
| Domain icons | their fixed `domain.*` colour |

Never mix Outline and Solid within a single component.

---

## 7. Implementation

- Most glyphs exist in `androidx.compose.material.icons` — but **names differ** from Heroicons.
  Prefer exporting the Figma set to VectorDrawables/SVG so names match the design 1:1 and
  designers and developers can refer to the same string.
- Ship as a single compiled vector set (Android) or SVG sprite (web). Do not use an icon font:
  it breaks at large font scales and offers no per-path colouring for domain icons.
- Icons are **decorative** when accompanied by a text label — mark them
  `contentDescription = null` so screen readers don't read them twice. Icon-only buttons
  (search, calendar, dismiss, help) **must** carry a real content description.
- Keep the frame padding. Export at the frame size (20/24 dp), not cropped to the glyph
  bounding box, or alignment drifts across every row.
