# Component inventory & specs

All specs at 360dp reference width; content column 328dp. Colour names are **roles**
(resolve per tenant). Source of truth: Funda foundations frames (`5:10540`–`5:21254`) and
ECD Planning screen variants.

---

## 1. Buttons

### Primary (default CTA)
- Full-width (328dp), min height 40dp visual / 48dp touch, `radius-lg` (15).
- Fill `primary`, label `button` (Quicksand SemiBold 14/20) in white, `elevation-2`.
- Optional 20dp leading icon, 8dp gap. Padding 16dp horizontal, 10dp vertical.
- States: **pressed/hover** `primaryAccent1`; **disabled** `primaryAccent2` fill + white
  label; **loading** `primaryAccent1` fill + 16dp spinner + label.

### Secondary (outlined)
- Same geometry; `surface` fill, 2dp `primary` border, `primary` label.
- Pressed `primaryAccent1` border/label; disabled `primaryAccent2` border/label; loading
  spinner + `primaryAccent1`.

### Small buttons
- Height 32dp, `radius-md` (10), padding 12/8dp (icon variants 9–11dp), label `buttonSmall`
  (Quicksand SemiBold 12/16), optional 16dp icon with 4dp gap.
- Small primary: `primary` fill, white label. Small secondary: `secondaryAccent2` fill with
  `secondary` label, or 2dp `primary` outline variant for "add" actions.

### FAB
- Collapsed 48dp circle (`radius-2xl`), `primary` fill, 24dp white plus icon, `elevation-2`.
- Extended: 48dp high, padding 16/20, icon + `h4` white label ("Add a child").
- One FAB max per screen, bottom-right, 16dp margins, above bottom nav if present.

### Text link
- `primary`, Quicksand SemiBold, no underline at rest; press state underline.

## 2. Chips & segmented select

- **Chip**: height 40dp, pill `radius-xl` (20), padding 16/9. Resting: `secondaryAccent2`
  fill, `secondary` label Quicksand Medium 14. Active: `secondary` fill, white label
  Quicksand SemiBold, `elevation-1`. Multi-select rows wrap with 8dp gaps.
- **Segmented single-select** ("Playgroup / Day Mother / Preschool"): 328dp row of equal
  flex buttons, 6dp gaps, each `radius-md` (10), padding 12dp; resting/active colours as chips.
- Form usage pattern: `h4` label → optional `bodySmall` helper (`textMid`) → 8dp → control.

## 3. Form inputs

Anatomy (stacked, 4dp gaps): `h4` label (`textDark`) → field → helper/error (`bodySmall`).

| State | Field treatment |
|---|---|
| Inactive/empty | `background` fill (no border), `radius-sm` (6), 48dp high; placeholder `body` in `textLight`, 16dp left padding |
| Focused | `surface` fill + 2dp `secondary` border; value `body` in `textDark`; cursor 1×24dp `textDark` |
| Filled (blurred) | `surface` fill, 1dp `primaryAccent2` border |
| Error | `surface` fill + 2dp `errorMain` border; value + message in `errorDark`; message `bodySmall` below |
| Disabled | `background` fill, `textLight` value, 60 % opacity |

Variants: with leading/trailing icon (20dp, `textMid`); half-width pairs (160dp);
**long text** (multi-line, min 96dp, same states); **password** with visibility toggle and a
4-step strength/requirements checklist (each rule row: 16dp check icon — `successMain` when
met, `textLight` dot when not — + `bodySmall`).

**Select/dropdown**: closed = input with chevron-down; open = `surface` menu (`radius-md`,
`elevation-4`), 48dp options, selected option `secondaryAccent2` fill.
**Filter**: 40dp trigger pill with chevron; open panel lists 48dp filter items, active item
`secondaryAccent2` with check.

## 4. Selection controls

- **Checkbox** 24dp, `radius-sm` 4dp box: empty 2dp `textLight` border; checked `primary`
  fill + white check. Label `body`, 12dp gap, whole row tappable (48dp).
- **Radio** 24dp circle: 2dp `textLight` border; selected `primary` ring + 12dp dot.
- **Text+image question** (observation flows): radio list where each option can carry a
  thumbnail; selected row gets `secondaryAccent2` fill.

## 5. Navigation

### App bar / nav header (64dp)
- Fill `primary` with tenant doodle pattern; contents 24dp white.
- Left: menu icon-button — 36dp square, `radius-md`, `primaryAccent1` fill, 20dp
  `menu-alt-2` icon. Then tenant **logo** (24dp high, white lockup).
- Right: actions (calendar, bell with notification dot, invoice), then 36dp avatar circle.
- Variants (`Headers 5:12115`): title+subtitle bar, steps bar with exit ✕, title with "?"
  help — all 64dp, white `h2`/`h4` text on `primary`.

### Drawer menu ("Menu Practitioners and principles")
- Full-height `surface` panel, role-scoped items: 48dp rows, duotone icon + `h4`; active row
  `secondaryAccent2` fill + `primary` icon.

### Tabs
- Underline style: labels `h4` — active `primary` with 2dp `primary` underline; inactive
  `textMid`, 1dp `primaryAccent2` track underneath the row.

### Welcome banner (hub)
- `primary` fill continuing from app bar, doodle pattern, `display` white
  "Welcome {name}!", 16dp padding, 24dp bottom.

## 6. Lists & action rows

The core list unit ("long action icon", `5:12530`): 328dp wide, `radius-md` (10),
`background` fill (on white screens) or `surface` (on tinted screens), padding 16dp,
16dp gap.

- Leading: 48dp colour circle (category hue) with 22dp white solid icon, or avatar/initials.
- Body: `h4` title (`textDark`) + `bodySmall` subtitle (`textMid`).
- Trailing options: 24dp `chevron-right` (`textMid`), count **badge**, alert icon
  (`alertMain`), check (`successMain`), or amount (`h4`).
- Heights: 64–96dp depending on lines; min touch 48dp.
- "Action list XL": stacked rows inside one card with 1dp `primaryAccent2` dividers.
- **Divider**: 1dp `primaryAccent2` at 50 %, full-bleed inside cards, inset 16dp in lists.

## 7. Cards

- **Hub/category card**: 328dp, `radius-lg`, fill = category `*Accent2` tint, padding 16dp;
  48dp category-colour circle icon + `h2` title + chevron. (ECD hub: pink Classroom, yellow
  Business, blue Community, green Training.)
- **Content card** (`Card available`): `radius-lg`, `elevation-2`, `background`/`surface`
  fill; 200dp image header (or illustration band), then 16/24dp padded body: status badge
  pill → `h1` title → `bodyLarge` copy (`textMid`). "Coming soon" variant: greyscale image +
  `textLight` badge.
- **Tutorial card**: 328×168, `radius-lg`, illustration left/top + `h4` + `bodySmall` + small
  button; used in carousels of 5.
- **Task/points card**: `radius-lg`, mascot + `display`-size number + `bodySmall` label +
  10dp progress bar (`tertiary`/`successMain` fill on `primaryAccent2` track).
- **Stats/money card**: title row + Inter figures; profit `successDark`, loss `errorDark`.
- **Action panel**: `radius-lg` card with `h4`, `bodySmall` and trailing link/button
  ("with link", "statements").

## 8. Feedback

### Inline alert / banner
- 328dp, `radius-md`, fill = status **Background** tint; 20dp status-Main icon, `h4` title
  in status Dark, `bodySmall` body in `textMid`, optional inline link.
- Variants: Informational (blue), Success (green), Submission error (red, lists offending
  fields), Celebratory (illustration + `tertiary` accents), Error highlight on a specific
  form section.

### Snackbar / toast
- 328dp, `radius-md`, fill = status Main (success green default), `elevation-3`, padding
  16dp; 20dp white icon + `bodySmallStrong` white text + optional ✕. Bottom of screen,
  16dp margin, auto-dismiss 4s (persist while offline queue is retrying).

### Dialog (modal card)
- 328dp `surface` card, `radius-xl` (20), padding 16/24, `elevation-4`, centred on
  `modalScrim` (70 % `primaryAccent1`).
- Anatomy: 48dp icon or illustration (status-coloured or sticker/mascot) → `h3` title
  centred → `bodyLarge` copy centred (`textMid`) → 16dp → stacked full-width buttons
  (primary above secondary, 16dp gap).
- Variants: warning/exit-confirm, error, tutorial (mascot + steps), celebratory.

### Slide-over / bottom sheet
- Full-width `surface`, top corners `radius-xl`, `elevation-4`, drag handle, max ~85 %
  viewport, scrollable body; used for schedules, pickers, long forms.

### Full-page states
- **Offline warning page** and empty states: 96dp sticker icon → `h2` → `bodyLarge`
  (`textMid`) → primary button. Centered, 32dp padding.

## 9. Progress & gamification

- **Progress tracker (stepper)**: 48dp step circles — active: `primary` fill white number;
  inactive: `primaryAccent2` outline `textLight`; complete: `successMain` fill white check;
  connected by 2dp lines (`primaryAccent2`; `successMain` when passed). Title `caption` under
  each step.
- **Progress bar**: 328×10dp, `radius-full`; track `primaryAccent2` / fill `successMain` or
  category hue.
- **Points list item**: `radius-md` row with points value chip; numbered variant for steps.
- **Leaderboard row**: 80dp, avatar + name + points, top-3 highlighted with `quinary`
  (yellow) accents.
- **Ratings**: star rows / face scales in green–orange–red (`successMain`/`alertMain`/
  `errorMain`) for observation scoring.

## 10. Avatars

- Sizes: 36dp (app bar), 48dp (lists), 120–125dp (profile).
- Photo circle; fallback = initials on `primaryAccent1` (adults) or category hue (children);
  icon fallback for no-photo. "Add photo" variant: dashed 2dp `primaryAccent2` border +
  camera icon + `caption` label.

## 11. Tables

- Mobile "simple striped": header row `h4` on `background`; body rows `bodySmall`, zebra
  `background`/`surface`, 40dp rows, `radius-md` clipped container. Used for statements,
  attendance summaries.

## 12. Search

- Search bar in header: 40dp field, `radius-md`, `surface` fill at 15 % white on `primary`,
  white text/placeholder; autofocus variant expands to full width with cancel.
