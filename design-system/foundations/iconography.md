# Iconography

Three icon layers, each with a distinct job. All are tenant-neutral (they inherit colour
from roles); only the *illustrated* layer carries fixed brand colours.

## 1. UI icons — Heroicons (outline + solid)

The Funda foundations "Icons" frame (`5:10715`) is the **Heroicons** library (v1 naming:
`Icon/Solid/plus`, `information-circle`, `check-circle`, `arrow-circle-down`, `menu-alt-2`,
`status-offline`, `pencil`, `bell`, `save`, `logout` …) in both **outline** and **solid**
styles on a 24dp grid, plus a small set of brand/social glyphs (WhatsApp, Facebook,
Instagram, LinkedIn, YouTube).

Usage rules:
- **Solid** for: filled avatar/action chips, buttons, app bar, status pills — anything on a
  coloured fill.
- **Outline** for: list metadata, empty states, inline hints on white/tinted surfaces.
- Never mix styles within one component.
- Sizes: 24dp default; 20dp inside standard buttons/snackbars; 16dp inside small buttons;
  14dp inside the offline pill. Keep the 10–15 % internal padding of the source glyphs.
- Colour: icons take `onPrimary` (white) on coloured fills; `primary` or `textMid` on light
  surfaces; status icons use the status Main colour.

Implementation: ship as an icon font or compiled vector set (`androidx.compose.material.icons`
covers most; missing glyphs exported from Figma as SVG → VectorDrawable).

## 2. Duotone icons

A secondary set (`Duotone Icons` frame `5:13811`, ~330 glyphs) — filled glyphs with a grey
companion tone. Used for: menu/drawer items, feature tiles and larger touchpoints where the
flat Heroicon feels too utilitarian. Duotone accent inherits `primary`; the secondary tone is
40 % `textLight`.

## 3. Icon chips (containers)

Icons rarely sit naked in lists and hub cards; they sit in a **48dp circle** (`radius-2xl`):

- List/action rows: circle filled with a category colour (`tertiary` pink in SmartStart;
  category hue in ECD Connect), 22–24dp white solid icon inside.
- Hub cards: same pattern — solid colour circle on the tinted (`*Accent2`) card.
- Status rows: circle uses status Main.

This chip is the primary way categories are colour-coded across the apps.

## 4. Badges & counters

- Notification dot: 16dp `errorMain` circle, 2dp border in the surface behind it, white
  12sp Inter Medium count.
- Status badge pill: 28dp high, radius 18, 8/4dp padding, `Text SM Semibold` white on
  status/category Main (e.g. "Available now" on `successMain`).
- Offline pill: see [patterns/offline-first.md](../patterns/offline-first.md).
