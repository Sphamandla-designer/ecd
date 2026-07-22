# Layout, spacing, radius & elevation

## Reference frame & grid

- Design reference: **360 × 640 dp** (all source screens are 360 wide).
- **Screen margin: 16dp** each side → content column **328dp** at reference width.
- Single-column layout throughout; two-up half-width fields are `(content − 8) / 2 = 160dp`.
- App bar / nav header height: **64dp**. Status/offline ticker overlays add 24dp.
- Bottom sheets and slide-overs are full-width; dialogs are `content` width (328dp) centred.

## Spacing scale (4dp base)

| Token | dp | Typical use |
|---|---|---|
| `space-1` | 4 | Label→input gap, icon→text in pills/small buttons |
| `space-2` | 8 | Chip gaps, stacked text gaps, button icon gap, dialog button gap |
| `space-3` | 12 | Segmented-control padding, FAB padding, dialog inner gaps |
| `space-4` | 16 | **The workhorse**: screen margins, card padding, list-item padding, gaps between cards/sections, snackbar padding |
| `space-5` | 20 | — reserved — |
| `space-6` | 24 | Section spacing, dialog vertical padding, card bottom padding |
| `space-8` | 32 | Large section breaks, empty-state padding |

Component-internal paddings observed in Figma follow this scale with two legacy exceptions
(button horizontal padding 17dp, chip vertical 9dp) — normalise these to 16dp / 8dp when
implementing; the 1dp difference is a border-compensation artefact in Figma.

## Corner radius scale

| Token | dp | Applied to |
|---|---|---|
| `radius-sm` | 6 | Text inputs, dropdowns, segmented-group container |
| `radius-md` | 10 | List items/action rows, small buttons, snackbar, menu icon-button, filter items |
| `radius-lg` | 15 | Standard buttons, content cards, action panels |
| `radius-xl` | 20 | Dialog cards, chips (40dp-high pill) |
| `radius-2xl` | 24 | FAB, avatar/icon circles (48dp), illustration circles |
| `radius-full` | 999 | Offline pill, badges (radius 18 on 28dp pill), progress bar (10dp high) |

Rule of thumb: **the smaller and denser the element, the smaller the radius**; anything
tappable and card-like is 10–15; anything playful/branded is a full circle.

## Elevation

Shadows are soft, blue-tinted (`#27385A` at 10–20 % — note: the *shadow* colour is the ECD
navy in both tenants) and used sparingly:

| Token | Value | Used on |
|---|---|---|
| `elevation-0` | none | List rows, inputs, chips (resting), inline alerts |
| `elevation-1` | `0 1 2 rgba(0,0,0,0.05)` | Chips (subtle lift), table rows |
| `elevation-2` | `0 10 10 −5 rgba(39,56,90,0.2)` | Primary buttons, FAB, content cards |
| `elevation-3` | `0 10 10 rgba(0,0,0,0.2)` | Snackbars/toasts |
| `elevation-4` | `0 20 12.5 rgba(39,56,90,0.1)` + `0 10 5 rgba(39,56,90,0.1)` | Dialogs, slide-overs |

Backgrounds do the separation work (white `surface` cards on tinted `background`), so most
surfaces need no shadow at all.

## Component sizing quick sheet

| Element | Size |
|---|---|
| Touch target minimum | 48 × 48dp |
| Text input height | 48dp |
| Button height (standard) | 40dp visual (48dp touch), full-width by default |
| Small button height | 32dp visual |
| Chip height | 40dp |
| FAB | 48dp collapsed; extended = 48dp high with label |
| App bar | 64dp |
| Avatar sm / icon chip | 48dp (radius 24) |
| Avatar lg (profile) | 120–125dp |
| Badge pill | 28dp high (radius 18) |
| Offline pill | 24dp high (radius full) |
| Progress step circle | 48dp |
| Progress bar | 10dp high, radius full |
| Icon default | 24dp (20dp in buttons, 16dp in small buttons, 14dp in pills) |
