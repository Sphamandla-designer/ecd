# Home screen (Hub)

The app's landing screen — the four-way split into Classroom, Business, Community and Training,
plus the gamification points row. Every other feature in the product hangs off this screen.

**Figma:** [`139:66569` — "W3.0 Hub page"](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-66569) · 360 × 640

> This screen is a **component (symbol)**, not a frame — it is instanced into other flows
> wherever the hub is shown behind a dialog or notification. Build it as a reusable screen,
> not a one-off.

---

## 1. Anatomy

```
┌──────────────────────────────────────────────┐  360 × 640
│ ☰   ⬤ECD Connect      📅  🔔¹  ⬤            │  Nav header      y0    h64
├──────────────────────────────────────────────┤
│ ▒▒ navy pattern band ▒▒                      │  Graphic overlay y64   h80
│  Welcome!                                    │  Title H1        y88   h32
│                                              │
│  ╭────────────────────────────────────────╮  │
│  │ ⬤  Classroom                        ›  │  │  action xl icon  y168  h80
│  ╰────────────────────────────────────────╯  │
│  ╭────────────────────────────────────────╮  │
│  │ ⬤  Business                         ›  │  │                  y252  h80
│  ╰────────────────────────────────────────╯  │
│  ╭────────────────────────────────────────╮  │
│  │ ⬤  Community                        ›  │  │                  y336  h80
│  ╰────────────────────────────────────────╯  │
│  ╭────────────────────────────────────────╮  │
│  │ ⬤  Training                         ›  │  │                  y420  h80
│  ╰────────────────────────────────────────╯  │
│                                              │
│  ╭────────────────────────────────────────╮  │
│  │ 🙂  175 Points                       › │  │  Action Item_    y516  h80
│  │     ▓▓▓▓▓▓▓▓▓▓▓▓░░░░                   │  │  Points
│  ╰────────────────────────────────────────╯  │
└──────────────────────────────────────────────┘
```

### Measured geometry

| Element | Node | x | y | w × h |
|---|---|---|---|---|
| Nav header | `139:66571` | 0 | 0 | 360 × 64 |
| **Offline ticker** *(hidden by default)* | `139:66572` | 0 | **52** | 360 × 24 |
| Graphic overlay Small 80px | `139:66570` | 0 | 64 | 360 × 80 |
| Title "Welcome!" | `139:66573` | 16 | 88 | 312 × 32 |
| Category list wrapper | `139:66574` | 16 | 168 | 328 × 332 |
| ‣ Classroom | `139:66576` | 0 | 0 | 328 × 80 |
| ‣ Business | `139:66577` | 0 | 84 | 328 × 80 |
| ‣ Community | `139:66578` | 0 | 168 | 328 × 80 |
| ‣ Training | `139:66579` | 0 | 252 | 328 × 80 |
| Points wrapper | `139:66580` | 17 | 516 | 328 × 80 |
| ‣ Action Item_Points | `139:66581` | 0 | 0 | 328 × 80 |

**Row pitch is 84 dp** (80 dp row + 4 dp gap) — the standard `space.listGap`.

> Two quirks in the source worth knowing: the points wrapper starts at **x = 17**, not 16
> (a 1 dp drift — use 16), and rows 2 and 3 are instances of the variant named
> **`action xl icon disabled`** even though they render fully enabled. Treat all four rows as
> the same enabled component; the variant name is a leftover.

---

## 2. Build recipe

### Nav header (`139:66571`) — 360 × 64, `role.appBar`

Left → right, 16 dp side padding:

| Element | Spec |
|---|---|
| Menu button | 36 × 36, `radius.md`, fill `role.appBarMuted`, 20 dp `menu-alt-2` glyph in `role.onAppBar` |
| Logo lockup | Colour mark + white "ECD Connect" wordmark. Tenant asset `assets.logoWhite` / `logoLockupSmall` |
| *(spacer)* | pushes actions right |
| Calendar | 24 dp `Icon/Outline/calendar`, `role.onAppBar` |
| Bell + badge | 24 dp `bell`; badge = 16 dp circle, `status.error.main`, white `typescale.caption` count, offset top-right |
| Avatar | 32–36 dp circle, `role.action` fill, white user glyph — or the user's photo |

### Graphic overlay (`139:66570`) — 360 × 80, full-bleed

`Graphic overlay Small 80px` (node `100:8639`): navy field with tonal lighter-navy CI shapes.
It sits **behind** the title and continues the app bar's navy downward, so the header reads as
one 144 dp navy block. Decorative — `importantForAccessibility="no"`.

### Title

"Welcome!" — `typescale.h1` (Quicksand SemiBold 24/32) in `role.onAppBar`, at x 16, y 88.

> In production this is personalised: *"Welcome Bulelwa!"*. Budget for a long name — the text
> box is 312 dp and the string must wrap or ellipsise rather than clip.

### Category rows — `action xl icon`, 328 × 80

Each row: `radius.md`, card fill = the category **tint**, 16 dp padding, 16 dp gap.

| Row | Card fill | Icon circle | Glyph |
|---|---|---|---|
| Classroom | `category.stories.tint` `#FFD3E6` | `role.select` `#FF2180` | graduation cap |
| Business | `category.teachingTips.tint` `#FFF6D0` | `palette.quinary` `#FFD525` | piggy bank |
| Community | `category.activities.tint` `#D2F1F9` | `role.action` `#1DBADF` | user-group |
| Training | `category.other.tint` `#E6F1D4` | `palette.tertiary` `#83BB26` | book-open |

Inside each row: 48 dp icon circle (white 22–24 dp glyph) → label `typescale.h4` in
`role.textDark` → 24 dp `chevron-right` in `role.textMid`.

> This is the canonical demonstration of the category system, and it matches
> `categoryMapping` in [`../tokens/themes/ecd-connect.json`](../tokens/themes/ecd-connect.json):
> classroom → secondary, business → quinary, community → quaternary, training → tertiary.

### Points row — `Action Item_Points`, 328 × 80

Fill `status.success.bg` / `category.other.tint` `#E6F1D4`, `radius.md`.

| Part | Spec |
|---|---|
| Mascot | 48 dp circle, `palette.tertiary` green animoji face |
| Value | "175" — `typescale.h1` (Quicksand SemiBold 24/32), `role.textDark` |
| Unit | "Points" — `typescale.h4`, `role.textDark`, baseline-aligned after the value |
| Progress bar | full row width under the text, ~8–10 dp high, `radius.full`; track `role.line`, fill `palette.tertiary` |
| Trailing | 24 dp `chevron-right`, `role.textMid` |

---

## 3. Tokens used

Confirmed via `get_variable_defs` on `139:66569`:

```
White #FFFFFF · Primary #27385A · Primary Accent 1 #52607B
Secondary #FF2180 · Secondary Accent 2 #FFD3E6
Tertiary #83BB26 · Tertiary Accent 2 #E6F1D4
Quaternary #1DBADF · Quaternary Accent 2 #D2F1F9
Quinary #FFD525 · Quinary Accent 2 #FFF6D0
Error Main #ED1414 · Success Main #83BB26 · Success BG #E6F1D4
ECD H1 Quicksand SemiBold 24/32 · ECD H3 Quicksand SemiBold 18 · ECD H4 Quicksand SemiBold 16/22
```

> ⚠️ **Re-tokenisation bug:** this screen reports `Text Dark` as **`#231F20`** (the legacy
> SmartStart value) rather than `#27385A`. The money dashboard on the same file correctly
> reports `#27385A`. Build with `role.textDark` (`#27385A`) and log the source inconsistency —
> see [`../patterns/white-label-theming.md §6`](../patterns/white-label-theming.md).

---

## 4. States

| State | Treatment |
|---|---|
| **Default** | As drawn above |
| **Offline** | The hidden `Offline ticker` (`139:66572`, 360 × 24 at y 52) becomes visible, straddling the bottom of the app bar. **The slot is already reserved — nothing below shifts.** |
| **Notifications** | Bell badge shows the count. Hub notifications are priority-ranked and **only one may be shown at a time** (note `145:23755`); the notification card renders between the title and the category list |
| **Points hidden** | Tenants without gamification omit the points row; the category list keeps its position |
| **Long name** | "Welcome {name}!" wraps within the 312 dp box |

---

## 5. Navigation

| Tap | Goes to |
|---|---|
| Classroom | Classroom hub → tabs: Attendance / Progress / Activities / Resources |
| Business | Business hub → tabs: Staff / Money / Resources (+ Registration where DBE is enabled) |
| Community | Community hub → Resources |
| Training | Training / Journey |
| Points row | Points & rewards detail |
| Menu ☰ | Drawer — see [`../components.md §10.4`](../components.md#104-menu-items-drawer) |
| Bell | Notifications list |
| Avatar | Profile |

Related: [`resources.md`](resources.md) · [`money.md`](money.md) · [`programme.md`](programme.md) ·
[`progress.md`](progress.md) · [`profile-journey.md`](profile-journey.md) ·
[`dbe-registration.md`](dbe-registration.md)

---

## 6. Back-end needs

```jsonc
GET /home
{
  "displayName": "Bulelwa",
  "sections": [                      // order is server-controlled
    { "key": "classroom", "label": "Classroom", "enabled": true },
    { "key": "business",  "label": "Business",  "enabled": true },
    { "key": "community", "label": "Community", "enabled": true },
    { "key": "training",  "label": "Training",  "enabled": true }
  ],
  "points": { "value": 175, "target": 250, "enabled": true },
  "notifications": { "unread": 1, "top": { "id": "...", "priority": 3 } }
}
```

- Sections are **server-driven** — a tenant without Training must not receive it. Do not
  hard-code the four cards client-side.
- `points.enabled` false → omit the row entirely.
- Return at most **one** hub notification, already priority-resolved (note `145:23755`).
- The whole screen must render from cache when offline; only the badge counts need the network.

---

## Related screens extracted alongside this one

| Screen | Node | Doc |
|---|---|---|
| Money dashboard (populated) | [`139:56615`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-56615) | [money.md](money.md) |
| Classroom resources list | [`139:63445`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-63445) | [resources.md](resources.md) |

Both are reproduced pixel-for-pixel in [`../preview/index.html`](../preview/index.html).
