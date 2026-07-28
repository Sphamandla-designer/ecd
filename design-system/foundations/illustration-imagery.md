# Illustration & imagery

The illustration layer is what makes the app feel warm and early-childhood-appropriate
without compromising the data-entry surfaces. Everything below is on Figma page
[`0:1`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=0-1).

Six families: **illustrated icons · emoji · graphics · animoji · CI patterns · graphic overlays.**

---

## 1. Illustrated icons — 23 spot illustrations, ~194 dp

Frame [`100:1214`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=100-1214).
Flat vector illustrations, each **193.56 × 193.57 dp** (a few differ slightly).

| Name | Node | | Name | Node |
|---|---|---|---|---|
| `ECD_Connect_blocks 1` | `100:1215` | | `ECD_Connect_djembe 1` | `100:1638` |
| `ECD_Connect_SpeechBubble` | `100:1224` | | `ECD_Connect_ball 1` | `100:1656` |
| `ECD_Connect_Child2` | `100:1225` | | `ECD_Connect_duck 1` | `100:1684` |
| `ECD_Connect_Child` | `100:1231` | | `ECD_Connect_piggybank 1` | `100:1701` |
| `ECD_Connect_Documents` | `100:1334` | | `ECD_Connect_lightbulb 1` | `100:1725` |
| `ECD_Connect_alien 1` | `100:1341` | | `ECD_Connect_crayons 1` | `100:1775` |
| `ECD_Connect_puzzle 1` | `100:1375` | | `ECD_Connect_balloons 1` | `100:1797` |
| `ECD_Connect_shakers 1` | `100:1386` | | `ECD_Connect_money 1` | `100:1821` |
| `ECD_Connect_puppet_lion 1` | `100:1425` | | `ECD_Connect_rockinghorse 1` | `100:1878` |
| `ECD_Connect_drum 1` | `100:1507` | | `ECD_Connect_thumbsup 1` | `100:1901` |
| `ECD_Connect_elephant` | `100:1532` | | `ECD_Connect_preschool 1` | `100:1911` |
| `ECD_Connect_phone` | `100:1616` | | | |

**Where they appear** — empty states (the alien on the Journey empty state, blocks on the
over-age progress state, "COMING SOON" sign on resources), celebratory dialogs (balloons),
info screens, and the 96–110 dp circular badge on dialog cards.

**Rules**
- Flat shapes, no gradients, 2–3 colours plus white; shadows only as a subtle darker tone.
- Rendered inside a solid-colour circle (96 dp on dialogs, 110 dp on empty states). The circle
  rotates through the brand hues (navy, yellow, cyan, magenta, green) chosen to **contrast the
  subject** — the circle colour carries no meaning.
- They **decorate; Heroicons act.** Never make an illustrated icon the tap target for a
  critical action.

---

## 2. Emoji — 8 illustrated characters

Frame [`100:2078`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=100-2078),
~176 dp each, nodes `100:2079` → `100:2180` (`ECD_Connect_emoji1`–`emoji8`).

Used for feedback moments: the smiley on the 100 %-complete progress dashboard, the
tearful-joy face on the report-created banner, the sad face on "no activities found", the
smiling face on "You have completed Themba's observations!".

> **Use the packaged set, never device emoji.** Device emoji render differently per OEM and
> break the visual consistency of celebratory moments.

---

## 3. Graphics — large scene illustrations

Frame [`100:2194`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=100-2194) (628 × 2301 dp):

| Graphic | Node | Size (dp) |
|---|---|---|
| `ECD_Connect_kids_boy 1` | `100:2195` | 336.5 × 355.2 |
| `ECD_Connect_kids_play 1` | `100:2291` | 494.4 × 308.0 |
| `ECD_Connect_kids_girl 1` | `100:2459` | 222.3 × 229.7 |
| `ECD_Connect_robots 1` | `100:2530` | 596 × 488 |
| `ECD_Connect_monster 1` | `100:3011` | 199.6 × 144.0 |
| `ECD_Connect_robot1 1` | `100:3126` | 265.1 × 342.5 |

Plus frame [`100:8792`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=100-8792)
(3724 × 1179 dp) — the wide character line-up sheet.

Used full-bleed on onboarding, info screens and loading/splash.

---

## 4. Animoji — the 116-character mascot set

Frame [`100:9059`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=100-9059)
(4000 × 864 dp). A component with property `Number = 1 … 116`, every variant **128 × 128 dp**
(nodes `100:9060` → `100:9405`).

These are the expressive character faces — **"Cebisa"** is the named mascot — that front every
conversational moment:

| Slot | Component | Node |
|---|---|---|
| Tutorial cards (carousel of 5) | `Tutorial card 1–5` | `100:4487`, `100:4554`, `100:4625`, `100:4689`, `100:4753` |
| Walkthrough coach-mark cards | `dialog card - tutorial` | `100:6858` |
| Onboarding intro dialog | `Dialog card - Cebisa` | `100:8729` |
| Question dialog | `dialog card - question` | `100:8965` |
| Nudge dialogs | e.g. start-planning nudge | `145:8527` |

At 80 dp inside a bottom-sheet tutorial card, 96–100 dp inside a centred dialog card, 64 dp
in the tutorial carousel.

**A tenant may swap the mascot set** as part of its brand assets — but the *slots* above are
fixed. Never put a mascot on an error or a destructive confirmation; mascots are for
encouragement, guidance and celebration only.

---

## 5. CI patterns — brand texture

Frame [`100:3251`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=100-3251).
Built from the five brand hues (magenta, cyan, green, yellow, navy).

| Pattern | Node | Size (dp) | Description |
|---|---|---|---|
| `ECD_Connect_CI_shapes 1` | `100:3252` | 861.9 × 474.1 | Scattered rings, rounded wedges, squircles, dot-textured blobs |
| `ECD_Connect_CI_dots 1` | `100:3608` | 674.2 × 510.0 | Confetti of solid circles at mixed sizes |
| `ECD_Connect_CI_rings 1` | `100:3639` | 377.2 × 95.7 | Row of four outline rings |
| `ECD_Connect_CI_lozenges 1` | `100:3646` | 179.3 × 201.9 | Stack of four rounded lozenge bars |

---

## 6. Graphic overlays — the navy header texture

Tonal navy pattern bands derived from the CI shapes: a `#27385A` field with slightly lighter
navy shapes. **Full-bleed at 360 dp** — they deliberately break the 16 dp margin.

| Overlay | Node | Height |
|---|---|---|
| Graphic Overlay (square) | `100:7662` | **360 dp** |
| Graphic overlay Large | `100:8276` | **364 dp** |
| Graphic overlay Large 2 | `100:8367` | **244 dp** |
| Graphic overlay Medium | `100:8457` | **180 dp** |
| Graphic overlay (banner) | `100:7732` | **134 dp** |
| Graphic overlay Small | `100:8548` | **90 dp** |
| Graphic overlay Small 80px | `100:8639` | **80 dp** |

Pick the smallest overlay that covers the band you need — they are not resizable without
distorting the shape scale. Used behind hero headers, welcome banners and section tops.

**Overlays and patterns are decorative**: mark them `importantForAccessibility="no"` /
`aria-hidden`, and never let content legibility depend on them.

---

## 7. Logo & app icon

| Asset | Node | Size |
|---|---|---|
| `Logo_Colour` (master) | `100:3653` | 120 dp |
| `Logo_Colour` (export instance) | `100:9424` | 800 dp |
| `favicon` | `100:3667` | **512 × 512** |
| `icon_file` (app-icon artwork) | `100:8947` | 177.2 dp |
| Logo lock-up, small | `100:9413` / `100:9421` | 188 × 48 (48 dp mark + wordmark) |
| Logo lock-up, large | `100:9417` / `100:9425` | 271 × 64 (64 dp mark + wordmark) |

The wordmark line-height is 22 dp at both lock-up sizes. Header variants: `Logo header Dark`
(`100:7560`), `White` (`100:7567`), `Transparent` (`100:7573`) — all 360 × 64 dp.

**The logo is the primary white-label asset.** It is supplied per tenant via
`theme_tokens.assets` — see [`../patterns/white-label-theming.md`](../patterns/white-label-theming.md).

---

## 8. Photography

Real photography appears in only two places: the **photo header** on content cards
(`Card available` `100:4405`, ~180 dp) and the **activity photo header** on activity detail
screens (168 dp, full-bleed).

- Warm, natural-light, real South African ECD settings; children engaged in play.
- **Safeguarding**: photos of identifiable children require recorded consent. Prefer
  over-shoulder or hands-on-activity crops in generic UI.
- User-uploaded photos use the `Form Photo` component — 160 dp filled, 156 dp dashed-empty.
- Loading/offline placeholder: a neutral block with a duotone image icon. The `Offline` card
  (`100:7106`, 328 × 204) is the specified state for "Information not available when offline".

---

## 9. Asset delivery

- Export illustrations, emoji, graphics and animoji as **SVG → VectorDrawable** (Android) or
  optimised SVG (web). They are flat vector; never ship them as PNG except the app icon and
  favicon.
- CI patterns and graphic overlays are large; ship as a single tiling/stretching vector per
  size, not as a bitmap.
- The animoji set is 116 variants — ship only the ones actually referenced by a screen, and
  load the rest on demand. Bundling all 116 into an offline-first APK is wasteful.

> **Export gap:** the binaries themselves are not in this repo — this environment's egress
> proxy blocks `www.figma.com`, the only host serving Figma export URLs. Every asset above is
> catalogued with its node ID so the export is a mechanical step from a machine that can reach
> figma.com. See [`../extraction/00-design-system-page.md`](../extraction/00-design-system-page.md) §12.
