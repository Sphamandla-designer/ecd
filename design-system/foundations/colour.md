# Colour

Every value here is extracted verbatim from the Figma **Colour Palette** frame
[`100:1102`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=100-1102)
and **Alerts** frame [`100:1177`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=100-1177),
cross-checked against `get_variable_defs` on eight component frames and on screens from
five separate feature pages. Machine-readable source: [`../tokens/tokens.json`](../tokens/tokens.json).

---

## 1. The one thing to get right

> **Navy is the frame. Cyan is the action. Magenta is the selection.**

This is the single most important sentence in the colour system, and it is the thing most
often got wrong when people port the older SmartStart/Funda palette across:

| Job | Colour | Token |
|---|---|---|
| App bars, headings, body text | Navy `#27385A` | `role.appBar`, `role.textDark` |
| **Primary buttons, FAB, focus rings, active tabs, links** | **Cyan `#1DBADF`** | `role.action` |
| Chips, single-select, search button, calendar button, avatars | Magenta `#FF2180` | `role.select` |

A navy primary button is wrong. In App-Screens the primary CTA is **always** the cyan pill.

---

## 2. Palette (Figma names → hex)

The Figma file names its brand hues by position (`Primary`, `Secondary`, `Tertiary`,
`Quaternary`, `Quinary`) rather than by job. Those names are preserved in `palette.*` so
designers and developers can talk about the same swatch, but **components must never
reference `palette.*` directly** — use `role.*`.

> ⚠️ **The swatch labels in the Figma file contain errors.** Three rows are all labelled
> "Secondary/Accent 2" and one green row is labelled "Tertiary/Accent 2". The names below
> are the corrected published variable names. Trust these, not the on-canvas labels.

| Figma token | Hex | Node | What it is actually used for |
|---|---|---|---|
| `Primary` | `#27385A` | `100:1103` | App bar, headings, body text, scrim base |
| `Primary Accent 1` | `#52607B` | `100:1106` | Routine/timeline bars, muted help text |
| `Primary Accent 2` | `#D4D7DE` | `100:1109` | Dividers, hairlines, unfilled validator segments, unchecked box border |
| `Secondary` | `#FF2180` | `100:1112` | Active chip, chosen segment, search button, calendar button, avatar fallback, "View" pill |
| `Secondary Accent 1` | `#FF90BF` | `100:1115` | Mid pink (sparingly) |
| `Secondary Accent 2` | `#FFD3E6` | `100:1118` | Resting chip fill, small-secondary button fill, day-pager pills |
| `Tertiary` | `#83BB26` | `100:1121` | Green — same value as Success Main |
| `Tertiary Accent 1` | `#C1DD92` | `100:1124` | Mid green |
| `Tertiary Accent 2` | `#E6F1D4` | `100:1127` | Pale green — same value as Success BG |
| **`Quaternary`** | **`#1DBADF`** | `100:1130` | **Primary action: buttons, FAB, focus ring, active tab, links, help "?" chip** |
| `Quaternary Accent 1` | `#8EDCEF` | `100:1133` | Button hover **and** loading fill |
| `Quaternary Accent 2` | `#D2F1F9` | `100:1136` | Disabled button fill; selected/recommended card tint |
| `Quinary` | `#FFD525` | `100:1139` | Yellow — highlights, LEVEL badges, mascot circles |
| `Quinary Accent 1` | `#FFEA92` | `100:1142` | Mid yellow |
| `Quinary Accent 2` | `#FFF6D0` | `100:1145` | Pale yellow — category card tint |
| `Text Dark` | `#27385A` | `100:1148` | Same value as Primary |
| `Text Mid` | `#65727A` | `100:1151` | Body copy, help text, placeholders, list subtitles |
| `Text Light` | `#C9CFD2` | `100:1154` | Disabled text; search placeholder on navy |
| `UI Background` | `#EFF6FA` | `100:1157` | Screen background **and** default input fill |
| `Modal Background` | `#27385A` @ 70 % | `100:1160` | Dialog/sheet scrim |
| `White` | `#FFFFFF` | — | Cards, sheets, dialogs, focused inputs |

Two aliases worth remembering: **`Text Dark` == `Primary`** and **`Tertiary` == `Success Main`**.
They are separate tokens with identical values; keep them separate so a future tenant can
diverge them.

### 2.1 `UI Background` does double duty

`#EFF6FA` is both the screen background *and* the resting fill of every input, select and
card-on-white. That is deliberate and it is why forms read as "sunken" rather than "outlined".
When a field becomes focused it flips to **white with a 2 dp cyan border** — the inversion is
the focus signal.

---

## 3. Roles — what components actually reference

```
role.action          #1DBADF   Primary CTA fill, FAB, focus ring, active tab, link
role.onAction        #FFFFFF   Label on any action surface
role.actionHover     #8EDCEF   Hover AND loading
role.actionDisabled  #D2F1F9   Disabled fill (label stays white — see §6)
role.actionSubtle    #D2F1F9   Selected-card tint, recommended-card fill

role.select          #FF2180   Chip active, segment chosen, search/calendar buttons, avatars
role.onSelect        #FFFFFF
role.selectSubtle    #FFD3E6   Chip resting, small-secondary fill, "View" pill

role.appBar          #27385A   App bar fill
role.onAppBar        #FFFFFF
role.appBarMuted     #52607B   Routine bars on navy

role.background      #EFF6FA   Screen bg, input fill, card-on-white
role.surface         #FFFFFF   Cards, sheets, dialogs, focused inputs
role.line            #D4D7DE   Dividers and hairlines

role.textDark        #27385A   Headings, primary copy
role.textMid         #65727A   Body, help, placeholders, subtitles
role.textLight       #C9CFD2   Disabled text
role.scrim           #27385AB3  Modal scrim (70 %)
```

**Rule: never hard-code a hex in a component.** If you find yourself typing `#1DBADF`, you
want `role.action`.

---

## 4. Status colours — platform-wide, never themed

From the Alerts frame [`100:1177`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=100-1177).
These are **identical in every tenant**. Safety-critical meaning must not be re-branded.

| Status | Main | Dark | Background |
|---|---|---|---|
| Error | `#ED1414` | `#D20000` | `#FFEEF6` |
| Alert (warning) | `#FF5C00` | `#E43802` | `#FFEEE4` |
| Success | `#83BB26` | `#5A8F02` | `#E6F1D4` |
| Informational | `#1D67D5` | `#1752AB` | `#EBF3FF` |

Usage contract:
- **Main** — the 20 dp leading icon; validator-bar segments; badge fills; the chat-tip circle.
- **Dark** — the **title text** of the alert (Inter SemiBold 14/20). Also error input borders' message text.
- **Background** — the alert card fill. Body copy inside sits in `role.textDark`, *not* the Dark tone.

That last point is easy to get wrong: inside an alert, only the **title** takes the status
Dark colour; the body stays navy.

---

## 5. Category & domain colours

### 5.1 Content categories (hub cards, resource types, badges)

Each category pairs a **Main** (icon circle, badge fill) with a **Tint** (card fill):

| Category | Main | Tint | Seen on |
|---|---|---|---|
| Activities | `#1DBADF` cyan | `#D2F1F9` | Classroom resources, Finances |
| Stories | `#FF2180` magenta | `#FFD3E6` | Stories, Marketing & communication |
| Teaching tips | `#FFD525` yellow | `#FFF6D0` | Teaching tips, Safety & hygiene |
| Other | `#83BB26` green | `#E6F1D4` | Other |

The hub card is the tint; the 40–48 dp leading circle is the main with a white glyph.

### 5.2 Developmental domains — **fixed, never themed**

These encode curriculum meaning (child progress cards, PDF summary, domain icons). They
appear as a card **top border** and as an inner-shadow token.

| Domain | Colour | Figma effect token | Icon node |
|---|---|---|---|
| Social & emotional — "Feeling happy & secure" | `#D3276C` | `Happy and secure` | `100:9047` |
| Language — "Speaking & listening" | `#9E4D8E` | `Speaking listening` | `100:9056` |
| Cognitive — "Discovery & problem solving" | `#6974AF` | `Discovery problem` | `100:9050` |
| Physical — "Developing bodies" | `#359AD1` | `Developing bodies` | `100:9053` |

These are **not** part of the brand palette and must not be substituted with brand hues.

---

## 6. Accessibility

Measured contrast against the surfaces these colours actually sit on:

| Pair | Ratio | Verdict |
|---|---|---|
| `textDark #27385A` on `surface #FFFFFF` | 11.9:1 | ✅ AAA |
| `textDark #27385A` on `background #EFF6FA` | 10.7:1 | ✅ AAA |
| `textMid #65727A` on `surface #FFFFFF` | 4.8:1 | ✅ AA body text |
| `textMid #65727A` on `background #EFF6FA` | 4.3:1 | ⚠️ AA large text only — see below |
| White on `action #1DBADF` | 2.2:1 | ❌ **fails** — see below |
| White on `select #FF2180` | 4.0:1 | ⚠️ large/bold text only |
| White on `appBar #27385A` | 11.9:1 | ✅ AAA |
| `status.error.dark` on `status.error.bg` | 5.0:1 | ✅ AA |
| `status.info.dark` on `status.info.bg` | 6.6:1 | ✅ AA |
| `status.success.dark` on `status.success.bg` | **3.3:1** | ❌ **fails** for small text — see below |
| `status.alert.dark` on `status.alert.bg` | **3.8:1** | ❌ **fails** for small text — see below |

### Two known failures inherited from the design

**1. White label on the cyan primary button (2.2:1).** This is how every primary button is
drawn in Figma and it does not meet WCAG AA for text. The button remains legible in practice
because the label is 14 sp SemiBold on a large filled target, but it is a real accessibility
debt. Options, in order of preference:
- Darken the button fill to ~`#0E7C96` when a high-contrast/accessibility preference is on.
- Keep the design as-is for visual parity and record the exception.

**Do not** silently change the default — it would break visual parity with every screen in the
file. Raise it with the designer; the token indirection (`role.action`) means the fix is a
one-line theme change when a decision is made.

**3. Success and Alert banner titles fail AA at 14 sp.** Alert titles are Inter SemiBold
14 sp — below WCAG's large-text threshold (18.66 px bold), so they need 4.5:1. On their own
tinted backgrounds, `success.dark` measures **3.3:1** and `alert.dark` **3.8:1**. `error.dark`
(5.0:1) and `info.dark` (6.6:1) are fine.

Fix: keep `Main` and `BG` Figma-literal so fills and icons are untouched, and darken the
**title tone only**, staying on the same hue:

| Role | Figma-literal `dark` | Accessible `title` tone | Ratio |
|---|---|---|---|
| Success title | `#5A8F02` (3.3:1) | `#487202` | 4.7:1 |
| Alert title | `#E43802` (3.8:1) | `#C23002` | 4.6:1 |

**Resolved.** These are now first-class tokens rather than a prototype-only patch:
`status.<tone>.title` in `tokens.json`, `--ecd-status-<tone>-title` in `tokens.css`, and
`status/<tone>/title` in the Figma library (file `1b2PEGtGAWKqxN61KsVXy5`, collection
`2 · Colour`). For `error` and `info` the token aliases `dark`, which already passes, so
components can bind `title` unconditionally and always be AA. `Main` and `BG` stay
Figma-literal — only the small bold text tone moved. `title` is text-only: never a fill,
border or icon.

**2. Disabled primary buttons are white-on-`#D2F1F9` (1.3:1).** Effectively invisible text.
Disabled buttons must therefore **never be the only indication** that an action is unavailable —
always pair with helper text explaining what is still required (the Figma screens do this:
e.g. "Save" stays disabled until all fields are answered).

### Standing rules

- Status is **never** conveyed by colour alone — every status surface pairs colour with an
  icon *and* a text label.
- `textMid` on `background` is borderline; use it for help text at 14 sp but prefer `textDark`
  for anything the user must read to proceed.
- Minimum touch target 48 dp regardless of the visual size of the coloured element.
- Body text ≥ 16 sp, help text ≥ 14 sp — the audience includes low-digital-confidence users on
  small, low-end Android devices.

---

## 7. White-labelling: what may change

| Layer | Themed per tenant? |
|---|---|
| `palette.*` brand hues → `role.*` | ✅ Yes — this is the white-label layer |
| `status.*` | ❌ Never |
| `domain.*` | ❌ Never |
| `category.*` | ⚠️ Follows the tenant's brand hues, but the *pairing* (main + tint) is fixed |
| Type scale, spacing, radii, component anatomy | ❌ Never |

See [`../patterns/white-label-theming.md`](../patterns/white-label-theming.md) for the tenant
contract and [`../tokens/themes/`](../tokens/themes/) for the shipped themes.

### 7.1 Legacy SmartStart palette

Several shared components still carry tokens from the sibling SmartStart library
(`SS Primary Purple #583F99`, `SS Secondary Blue #00B0E0`, `SmartStart Tertiary #ED145B`,
`SS UI BG #F3F1F9`, `SS Text Dark #1F192E`, alternate status values `#399E32` / `#E74035` /
`#FF8A1D`). These are **not** part of the ECD Connect system — they appear only where a
component was inherited and not yet re-tokenised. Treat any SmartStart hex found in a
component as a **bug to re-map** onto the roles above, and log it. The full list is in
[`../extraction/00-design-system-page.md`](../extraction/00-design-system-page.md) §1.2.
