# Colour

Colour in ECD Connect 2.0 is split into three layers:

1. **Colour roles** — the names components are allowed to reference.
2. **Tenant palettes** — the values a role resolves to for a given tenant (white-label layer).
3. **Semantic (status) colours** — platform-wide, never themed.

All values below were extracted from the source Figma files (Funda/SmartStart foundations
frame `5:10497`, alerts frame `5:10678`; ECD Planning variables).

---

## 1. Colour roles

Every role has an `on*` companion (the colour of content placed on it). Components must
reference roles, never raw hexes.

| Role | Used for |
|---|---|
| `primary` | App bar, primary buttons, FAB, links, active nav, brand surfaces |
| `primaryAccent1` | Pressed/hover state of primary, menu buttons on primary surfaces, modal scrim |
| `primaryAccent2` | Disabled buttons, subtle borders, selected-item tints |
| `secondary` | Focus rings, chips/segmented controls (active), secondary emphasis |
| `secondaryAccent1` | Secondary pressed state |
| `secondaryAccent2` | Chip/segmented resting fill, small secondary buttons |
| `tertiary` | Category/avatar chips, accents, celebratory highlights |
| `tertiaryAccent1` / `tertiaryAccent2` | Tints of tertiary for pressed states / backgrounds |
| `quaternary`, `quinary` (+ accents) | Extra category colours for hub cards, tags, charts (ECD Connect uses 5 category hues; tenants with fewer map them to existing accents) |
| `background` | Screen background behind cards/lists |
| `surface` | Cards, sheets, dialogs (white) |
| `textDark` | Headings, primary copy |
| `textMid` | Body/support copy, help text |
| `textLight` | Placeholders, disabled text, timestamps |
| `modalScrim` | Overlay behind dialogs/sheets (70 % opacity accent) |

## 2. Tenant palettes

### SmartStart (first WL tenant) — from Funda foundations

| Token | Hex | Figma style name |
|---|---|---|
| `primary` | `#583F99` | SmartStart Primary |
| `primaryAccent1` | `#9484BD` | SmartStart Primary Accent 1 |
| `primaryAccent2` | `#D7D1E6` | SmartStart Primary Accent 2 |
| `secondary` | `#00B0E0` | SmartStart Secondary |
| `secondaryAccent1` | `#66D0EC` | SmartStart Secondary Accent 1 |
| `secondaryAccent2` | `#C2ECF8` | SmartStart Secondary Accent 2 |
| `tertiary` | `#ED145B` | SmartStart Tertiary |
| `tertiaryAccent1` | `#F4729D` | SmartStart Tertiary Accent 1 |
| `tertiaryAccent2` | `#FBC7D8` | SmartStart Tertiary Accent 2 |
| `textDark` | `#1F192E` | SmartStart Text dark |
| `textMid` | `#483E63` | SmartStart Text mid |
| `textLight` | `#9B96A6` | SmartStart Text light |
| `background` | `#F3F1F9` | SmartStart UI Background |
| `modalScrim` | `#9484BD` @ 70 % | SmartStart Modal Background |

### ECD Connect (OA default) — from ECD Planning variables

| Token | Hex | Figma variable |
|---|---|---|
| `primary` | `#27385A` | Primary (navy) |
| `primaryAccent1` | `#52607B` | Primary Accent 1 |
| `primaryAccent2` | `#D3D8E1` | derived 20 % tint (Figma uses tinted navy fills) |
| `secondary` | `#FF2180` | Secondary (pink) |
| `secondaryAccent2` | `#FFD3E6` | Secondary Accent 2 |
| `tertiary` | `#83BB26` | Tertiary (green) |
| `tertiaryAccent2` | `#E6F1D4` | Tertiary Accent 2 |
| `quaternary` | `#1DBADF` | Quaternary (blue) |
| `quaternaryAccent2` | `#D2F1F9` | Quaternary Accent 2 |
| `quinary` | `#FFD525` | Quinary (yellow) |
| `quinaryAccent2` | `#FFF6D0` | Quinary Accent 2 |
| `textDark` | `#231F20` | Text Dark |
| `textMid` | `#52607B` | Primary Accent 1 doubles as mid text |
| `background` | `#F4F6F9` | screen bg observed on hub/screens |

**Hub category mapping (ECD Connect):** Classroom → secondary (pink), Business → quinary
(yellow), Community → quaternary (blue), Training/Progress → tertiary (green). Category cards
use the `*Accent2` tint as card fill with the main hue as the icon chip.

## 3. Semantic / status colours — never themed

From the Funda Alerts frame; shared verbatim by the ECD file.

| Group | Main | Dark | Background |
|---|---|---|---|
| Error | `#ED1414` | `#D20000` | `#FFEEF6` |
| Alert (warning) | `#FF5C00` | `#E43802` | `#FFEEE4` |
| Success | `#83BB26` | `#5A8F02` | `#E6F1D4` |
| Informational | `#1D67D5` | `#1752AB` | `#EBF3FF` |

Usage:
- **Main** — icons, banner fills, snackbar fills, badges, offline pill.
- **Dark** — text on light `Background` tints; input error borders use Main, error text uses Dark.
- **Background** — banner/inline-alert fills behind Dark text.

Neutrals shared across tenants: `white #FFFFFF`, `gray50 #F9FAFB` (image placeholders),
`mid #555555` (dialog body text in legacy frames — prefer `textMid`).

## 4. Accessibility rules

- `textDark` on `surface`/`background` is the default for body copy (≥ 12:1 in both tenants).
- `secondary` (`#00B0E0` SmartStart) fails AA for small text on white (≈ 2.6:1). It is
  therefore allowed only for: focus borders, large icons, chip fills with white text at
  ≥ 14sp SemiBold, and never for standalone small text. Use `primary` or `textMid` instead.
- Status meaning is never conveyed by colour alone — every status surface pairs colour with
  an icon (check-circle, exclamation, offline glyph) and a text label.
- White text is only placed on: `primary`, `secondary`/chip-active, status Main/Dark fills.
- Minimum contrast targets: 4.5:1 body text, 3:1 large text (≥ 18sp) and UI icons.
