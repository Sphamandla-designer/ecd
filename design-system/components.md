# Component library

Every component on Figma page
[`0:1` 🎨 Design System](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=0-1),
specified to build precision. Colours are **token names** — resolve them via
[`tokens/tokens.json`](tokens/tokens.json). Sizes are dp at the 360 dp reference frame.

Deep-link any node: `https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=<id-with-dash>`

**Contents**
[1 Buttons](#1-buttons) · [2 Chips & segments](#2-chips--segmented-controls) ·
[3 Inputs & forms](#3-inputs--forms) · [4 Selection controls](#4-selection-controls) ·
[5 Alerts & feedback](#5-alerts--feedback) · [6 Cards](#6-cards) ·
[7 Lists](#7-lists) · [8 Tables & dividers](#8-tables--dividers) ·
[9 Dialogs & popups](#9-dialogs-popups--modals) · [10 Navigation](#10-navigation) ·
[11 Filters & search](#11-filters--search) · [12 Badges & avatars](#12-badges--avatars) ·
[13 Slide-overs & panels](#13-slide-overs--action-panels) · [14 Empty & offline states](#14-empty--offline-states)

---

## 1. Buttons

Frame [`100:4983`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=100-4983).

### 1.1 Full-width — 328 × 40 dp

The default CTA. **radius `15`**, padding `10px 17px`, gap `8`, label `typescale.button`
(Quicksand SemiBold 14/20), optional **20 dp** leading icon.

| Variant | Node | Fill | Border | Label | Shadow |
|---|---|---|---|---|---|
| **primary** | `100:4984` | `role.action` | — | `role.onAction` | `elevation.button` |
| **secondary** | `100:4988` | `role.surface` | 2 dp `role.action` | `role.action` | none |
| primary hover | `100:4992` | `role.actionHover` | — | `role.onAction` | `elevation.button` |
| secondary hover | `100:4996` | transparent | 2 dp `role.actionHover` | `role.actionHover` | none |
| primary with icon | `100:5000` | `role.action` | — | `role.onAction` | `elevation.button` |
| secondary with icon | `100:5001` | `role.surface` | 2 dp `role.action` | `role.action` | none |
| primary disabled | `100:5005` | `role.actionDisabled` | — | `role.onAction` | **none** |
| primary disabled + icon | `100:5009` | `role.actionDisabled` | — | `role.onAction` | none |
| secondary disabled | `100:5015` | transparent | 2 dp `role.actionDisabled` | `role.actionDisabled` | none |
| primary loading | `100:5023` | `role.actionHover` | — | `role.onAction` | `elevation.button` + 16 dp spinner |
| secondary loading | `100:5029` | transparent | 2 dp `role.actionHover` | `role.actionHover` | 16 dp spinner |

**Rules**
- Only **primary** carries a shadow. Disabled loses it entirely.
- Hover and loading share the same fill (`role.actionHover`) — loading adds a 16 dp spinner.
- Visual height is 40 dp; **wrap in a 48 dp touch target**.
- Disabled buttons are white-on-pale-cyan (1.3:1) — never the sole signal that an action is
  blocked. Always pair with helper text saying what's still needed.
- Stacked buttons in a footer or dialog: **16 dp gap**, primary above secondary.

### 1.2 Small — 32 dp high

radius `10`, label `typescale.buttonSmall` (Quicksand SemiBold 12/16), icons **16 dp**, gap `4`.

| Variant | Node | Size | Fill / border | Label |
|---|---|---|---|---|
| small secondary | `100:5036` | 63 × 32 | `role.selectSubtle` | `role.select` |
| small secondary + trailing icon | `100:5039` | 77 × 32 | `role.selectSubtle` | `role.select` |
| small primary + trailing icon | `100:5043` | 77 × 32 | `role.action` | `role.onAction` |
| small primary + leading icon | `100:5047` | 125 × 32 | `role.action` | `role.onAction` |
| small secondary outline | `100:5048` | 125 × 32 | transparent, 2 dp `role.select` | `role.select` |

> Note the asymmetry: small **primary** buttons are cyan, small **secondary** buttons are
> magenta (`role.select*`). This is intentional — small secondaries are usually inline "add"
> or "edit" affordances that live beside a magenta selection context.

Padding: `8` vertical; `12` horizontal plain, `9` leading / `11` trailing when iconned.

### 1.3 FAB

| Variant | Node | Size | Fill | Radius | Content |
|---|---|---|---|---|---|
| extended | `100:5051` | 153 × 48 | `role.action` | 24 | 24 dp plus icon + label `typescale.buttonFab` |
| collapsed | `100:5055` | 48 × 48 | `role.action` | 24 | 24 dp plus icon |

Padding extended: `12` top/bottom, `16` left, `20` right, gap `8`. Shadow `elevation.button`.
One FAB per screen, bottom-right, 16 dp margins. Real labels seen: "Add a child",
"＋ Add new theme" (187 × 48).

### 1.4 Text link

`100:1170` / `100:1171` — inline, 14 sp, `role.action`, no underline at rest.

---

## 2. Chips & segmented controls

### 2.1 Chips — 40 dp pill

Frame `100:5118`. radius `20`, padding `9px 16px`, `elevation.sm`, gap `8` between chips.

| State | Node | Fill | Label |
|---|---|---|---|
| inactive | `100:5120` | `role.selectSubtle` | `typescale.chip` (Medium 14/16), `role.select` |
| active | `100:5123` | `role.select` | `typescale.chipActive` (**SemiBold** 14/16), `role.onSelect` |

Selection changes **fill *and* weight**. Multi-select rows wrap with 8 dp gaps.

### 2.2 Single-select button group

Component set `100:5097` — 328 × 40 dp, container radius `6`, gap `6`, each segment `flex:1`
radius `10`, padding `12`.

| State | Node |
|---|---|
| Unselected (all pale) | `100:5098` |
| Left / Mid / Right selected | `100:5102` / `100:5106` / `100:5110` |
| All selected | `100:5114` |

Selected segment = `role.select` + white SemiBold; the rest `role.selectSubtle` + magenta Medium.

Wrappers: `Label & single-select` `100:5058` (328 × 96 — H4 label + 14 sp help + group, gap 8)
and `Label & single-select & image` `100:5089` (328 × 108 — adds a trailing "Picture" small
primary button `100:5092` that opens an illustrative image dialog).

> This is the **Yes / No / Don't know** control used throughout the child-progress
> observation flows.

---

## 3. Inputs & forms

Frame [`100:3961`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=100-3961).
Field **48 dp** high, **radius 6**, block width 328. Label → field gap `4`.

### 3.1 Anatomy
```
h4 label          Quicksand SemiBold 16/22, role.textDark
  ↓ 4
help text         Inter 14/20, role.textMid                (optional)
  ↓ 4
field             48 dp
  ↓ 4
error message     Inter 14/20, status.error.dark           (invalid only)
```

### 3.2 States

| State | Node | Fill | Border | Value colour | Text inset |
|---|---|---|---|---|---|
| inactive (placeholder) | `100:3962` | `role.background` | none | `role.textMid` | 16 |
| filled | `100:3968` | `role.background` | none | `role.textDark` | 16 |
| inactive + icon | `100:3975` | `role.background` | none | `role.textMid` | 13 |
| filled + icon | `100:4009` | `role.background` | none | `role.textDark` | 13 |
| **focused** | `100:4044` | `role.surface` | **2 dp `role.action`** | `role.textDark` | 14 |
| **error** | `100:4052` | `role.surface` | **2 dp `status.error.main`** | `status.error.dark` | 14 |
| with help text | `100:4060` | `role.background` | none | `role.textMid` | 16 |
| half width | `100:4175` | `role.background` | none | — | 13 |
| textarea | `100:4186` | `role.background` | none | `role.textMid` | padding `12px 16px` |

- **The focus signal is an inversion**: background flips from tinted to white and gains a 2 dp
  cyan ring. Caret is 1 × 24 dp `role.textDark`.
- Trailing icons are **20 dp**, inset 13 dp right, vertically centred (calendar, eye).
- Half-width fields are **164 dp** inside the 328 block; a unit suffix ("kg") sits 4 dp after.
- Textarea is **120 dp** high (block 168 with label).

### 3.3 Password field & strength validator

Field `100:4193` with trailing `eye` icon + a bulleted requirement list (Inter 14/20,
indent 21): "At least 8 characters" / "At least 1 number" / "At least 1 capital letter".

Validator bar: 4 segments, each `flex:1`, **4 dp high**, radius `2`, gap `4`, total 328.

| Level | Filled | Segment colour | Caption | Caption colour |
|---|---|---|---|---|
| Error | 1/4 | `status.error.main` | "Error" | `status.error.dark` |
| A bit weak | 2/4 | `status.alert.main` | "A bit weak" | `status.alert.dark` |
| Good | 3/4 | `status.success.main` | "Good" | `status.success.dark` |
| Very Strong | 4/4 | `status.success.main` | "Very Strong" | `status.success.dark` |

Unfilled segments are `role.line`. Blocks: 108 dp plain, 172 dp with help.

### 3.4 Select / dropdown

Frame `100:3862`. Closed = a 48 dp field with trailing chevron (`role.background`, radius 6).
Open = trigger + menu, block 328 × 324; menu surface `100:3896` (328 × 248) uses
`elevation.dropdown` (the 1 dp `#CAC5D8` ring + large shadow).

### 3.5 Form Photo

Frame `100:4371`. Label block 40 dp; photo area **160 dp** filled (`100:4382`), **156 dp**
empty with a dashed border (`100:4386`).

---

## 4. Selection controls

### 4.1 Checkbox — frame `100:7330`

20 dp box. Unchecked: `role.surface` fill, `role.line` border. Checked: `role.action` fill,
white check. Row is 328 wide; whole row tappable at ≥ 48 dp.

### 4.2 Select card — the dominant selection pattern

Component set `100:7352` (328 × 274). A **56 dp card** with a leading checkbox:

| Variant | Node | Height | Treatment |
|---|---|---|---|
| default | `100:7361` | 56 | `role.background` fill, `role.line` border |
| **active** | `100:7353` | 54 | `role.actionSubtle` tint, `role.action` border, checked cyan box |
| default + icon | `100:7369` | 56 | adds leading icon |
| active + icon | `100:7378` | 56 | |
| date variants | `100:7387` set | 54 / 56 | `100:7388` active, `100:7398` default |

Used for: "Choose 4 skills to work on", "Like this resource", language pickers, date pickers.

### 4.3 Radio — frame `100:7625`

Rows **54 dp** (no description) or **76 dp** (with description), grouped into a bordered list
with top / middle / bottom variants (`100:7627`, `100:7635`, `100:7643`, `100:7649`, `100:7655`).

### 4.4 checkbox-card — frame `100:9029`

**70 dp** selectable card; `100:9030` "Check with image" (leading thumbnail), `100:9038` checked.

---

## 5. Alerts & feedback

Frame [`100:3721`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=100-3721).

**Common anatomy** — 328 wide, padding `16`, **radius 10**, horizontal gap `12`; leading status
icon **20 dp** (48 dp for "Immediate"); content column gap `8`; **title `typescale.helpStrong`
(Inter SemiBold 14/20) in the status `dark` colour; body Inter 14/20 in `role.textDark`.**

> The body is navy, **not** the status colour. Only the title takes the status tone.

| Variant | Node | Background | Icon | Title colour | Size |
|---|---|---|---|---|---|
| Submission Error (2 bullets) | `100:3722` | `status.error.bg` | `x-circle` | `status.error.dark` | 328 × 164 |
| Submission Error (title only) | `100:3736` | `status.error.bg` | `x-circle` | `status.error.dark` | 328 × 72 |
| Submission Error (1 line) | `100:3737` | `status.error.bg` | `x-circle` | `status.error.dark` | 328 × 120 |
| Alert / warning | `100:3738` | `status.alert.bg` | `exclamation-circle` | `status.alert.dark` | 328 × 148 |
| Alert with button | `100:3751` | `status.alert.bg` | `exclamation-circle` | `status.alert.dark` | 328 × 188 |
| Success (title + list) | `100:3764` | `status.success.bg` | `check-circle` | `status.success.dark` | 328 × 80 |
| Success (title only) | `100:3777` | `status.success.bg` | `check-circle` | `status.success.dark` | 328 × 52 |
| **Informational** | `100:3778` | `status.info.bg` | `information-circle` | `status.info.dark` | 328 × 92 |
| Informational 2 (bulleted) | `100:3839` | `status.info.bg` | `information-circle` | `status.info.dark` | 328 × 216 |
| Informational 4 (checklist + CTA) | `100:3858` | `status.info.bg`, **radius 6** | 24 dp per row | `status.info.dark` | 328 × 192 |
| **Celebratory** | `100:3779` | `status.success.bg` | 48 dp illustration | `status.success.dark` (Inter SemiBold 16/22) | 328 × 136 |
| Accreditation | `100:3803` | `status.success.bg` | 48 dp badge illustration | `status.success.dark` | 328 × 132 |
| Chat tip | `100:3859` | transparent | 38 dp `status.info.main` circle, `chat-alt-2` 22 dp | — | 328 × 40 |
| Immediate Alert | `100:3860` | `status.error.bg` | `exclamation` **48 dp** | `status.error.dark` | 328 × 80 |
| Immediate Alert 2 | `100:3861` | `status.error.bg` | `exclamation` 48 dp | `status.error.dark` | 328 × 164 |

Celebratory and Informational-4 carry a **22 dp ✕ dismiss** at top-right. Bullet markers are
6 × 14 dp with a 7 dp gap.

---

## 6. Cards

Two frames: [`100:4387` "Cards"](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=100-4387)
(dashboard/product) and [`100:7048` "Card"](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=100-7048)
(content/domain). All **328 dp** wide.

### 6.1 Dashboard & product cards

| Card | Node | Size | Anatomy |
|---|---|---|---|
| Money statistics | `100:4388` | 328 × 136 | Navy `role.appBar` panel; month label + large total; money-in/out rows |
| Card available | `100:4405` | 328 × 368 | ~180 dp photo header + green "Available now" badge + H3 title + body |
| Card coming soon | `100:4413` | 328 × 368 | Same, orange outline "Coming soon" badge |
| action list xl + panel | `100:4430` | 328 × 333 | `role.background` panel + body + cyan link, then 3 × 68 dp rows |
| Registered children | `100:4463` | 328 × 101 | Count + "View all" pill + present/absent split |
| Attendance card | `100:4464` | 328 × 80 | Date sub-label + two large percentages |
| Attendance (expanded) | `100:4474` | 328 × 134 | |
| Single stat | `100:4475` | 328 × 80 | "February 2022 attendance 100 %" |
| Age groups | `100:4481` | 328 × 215 | 2 × 2 numeric grid with range captions |
| Note card | `100:4482` | 328 × 135 | Title + body + cyan CTA |
| **Tutorial card 1–5** | `100:4487`, `100:4554`, `100:4625`, `100:4689`, `100:4753` | 328 × 168 | Animoji (~64 dp, left) + tip copy + pill button ("Close"/"Next"/"Finish") |

### 6.2 Content & domain cards

| Card | Node | Size | Anatomy |
|---|---|---|---|
| Stat rows | `100:7050`, `100:7065`, `100:7079`, `100:7093` | 328 × 126–166 | Month + large % + supporting lines, `full width` dividers between |
| **Offline** | `100:7106` | 328 × 204 | "Information not available when offline" + illustration |
| **Progress Card** set | `100:7115` | 328 × **248** each | 4 variants by **domain top border** |
| ‣ Happy & secure | `100:7116` | | `domain.happyAndSecure` border, `LEVEL 2` badge, "To do:" list, Edit button |
| ‣ Speaking listening | `100:7132` | | `domain.speakingListening` |
| ‣ Discovery problem | `100:7148` | | `domain.discoveryProblem` |
| ‣ Developing bodies | `100:7164` | | `domain.developingBodies` |
| **Notes Card** set | `100:7180` | 328 × 190–214 | Same four domain borders |
| Activity card | `100:7233` | 328 × 226 | Title + material pills + "Choose activity" secondary button |
| Activity card selected | `100:7255` | 328 × 345 | Adds amber alert strip + filled cyan "Activity chosen" |
| Story card | `100:7280` | 328 × 202 | Title + "Story book" badge + languages + "See details" |
| Story card selected | `100:7301` | 328 × 201 | Filled cyan "Story chosen" |
| Grid Lists/Card | `100:7322`, `100:7326` | 328 × 80 | 48 dp domain icon + label |

The domain cards' top border is paired with an **inner shadow** of the same colour — see
[`foundations/colour.md §5.2`](foundations/colour.md).

---

## 7. Lists

Frame [`100:6612`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=100-6612).

### 7.1 The default row — `action item icon`, 328 × 80 dp

```
┌────────────────────────────────────────────────┐
│ ╭────╮  Title            h4, role.textDark  ▸ │  80 dp
│ │icon│  Subtitle         help, role.textMid    │
│ ╰────╯  48 dp circle              badge  24 dp │
└────────────────────────────────────────────────┘
```
Composition (`100:6649`): `Icon Circle` 48 + `Content` 192 × 40 + `Badges` 110 × 24 +
`chevron-right` 24. Radius `10`, fill `role.background` on white screens.

### 7.2 Row catalogue

| Row | Node | Height |
|---|---|---|
| `action item with amount` | `100:6705` | 56 |
| `action item large sum` | `100:6720` | 64 |
| `large title with action` | `100:6615` | 77 |
| `small title with action` | `100:6629` | 76 |
| **`action item icon`** | `100:6649` | **80** |
| `action icon with badge` | `100:6739` | 80 |
| `action item icon with alert` | `100:6764` | 80 |
| `Initials long action icon…` | `100:6788` | 80 |
| `Long action item with check` | `100:6801` | 80 |
| `action item icon one line` | `100:6809` | 80 |
| `action item no icon` | `100:6820` | 80 |
| `action xl icon` | `100:6730` | 80 |
| `long action icon` | `100:6756` | 92 |
| `long action icon with icon and alert` | `100:6777` | 92 |
| `long action icon with badge` | `100:6748` | 112 |

Rows sit in a `Children list` with a **4 dp gap** → pitch = height + 4.

---

## 8. Tables & dividers

### 8.1 Table — frame `100:4818`

"Simple striped/Mobile". Built from **vertical column frames**, not rows. Striping alternates
`role.surface` / `role.background`.

**Width follows the content column — 328 dp in real screens.** The Table frame on the Design
System page is 318 dp wide, but that is the presentation frame, not a rule: the live instance on
the money dashboard (`139:56619`) is **328 dp**, three equal columns of 109.33 dp.

| Part | Height |
|---|---|
| Header cell | **40 dp** — label `typescale.tableHeader` (Inter Medium 12/16, **letter-spacing 5**, uppercase) |
| Header divider | 1 dp, `role.action` — the cyan rule under the header is what separates it from the body |
| Body cell | **52 dp**, text inset 24 dp left / 16 dp top |

Body rows alternate `role.surface` / `role.background`. A final emphasis row (e.g. "Balance")
uses `typescale.h4` with the value coloured by outcome — `status.success.dark` for a positive
figure, `role.textDark` for zero, `status.error.dark` for negative.

DS-page instances: `100:4819` (318 × 197, cols 159/159/90) and `100:4890` (318 × 345, cols 185/116/110).

### 8.2 Divider — frame `100:4956`

| Variant | Node | Width |
|---|---|---|
| dashed | `100:4957` | 328 |
| **full width** | `100:4960` | **360** — deliberately breaks the margin |
| standard | `100:4963` | 328 |
| with text | `100:4966` | 328 × 16 |

Colour `role.line`, 1 dp.

---

## 9. Dialogs, popups & modals

All dialog cards: **328 dp wide, radius 20, `role.surface` fill, padding `24px 16px`,
vertical gap `16`, content centred, `elevation.dialog`**, over a `role.scrim` (navy @ 70 %).
Inner content and buttons are **296 dp**.

| Dialog | Node | Size | Anatomy |
|---|---|---|---|
| **Modal** | `100:6831` | 328 × 310 | 48 dp `status.error.main` circle → H3 title → "Important" (`bodyMedium`) → body → primary → secondary |
| **dialog card - overlay** | `100:6844` | 328 × 307 | 48 dp `status.alert.main` exclamation → H3 title → body → primary + secondary, both with 20 dp leading icons |
| **dialog card - tutorial** | `100:6858` | 328 × 361 | ~150 dp animoji → two-line question → primary "Yes, help me!" (check-circle) → secondary "No, skip" (clock) |
| **dialog card - celebrate** | `100:6915` | 328 × 245.55 | `role.background` fill, 96 dp navy circle + balloons → H3 title → body. **No buttons** |
| **dialog - simple warning / info page** | `100:6944` | 328 × 439 | 48 dp `status.info.main` info-circle in a 24-radius wrapper → H3 title (296 wide) → Inter Medium sub-heads + Inter body → footer **secondary** "Close" with ✕ icon |
| **Dialog card - Cebisa** | `100:8729` | 328 × 243 | `role.background` fill, 96 dp yellow circle + Cebisa → H3 → body. No buttons |
| **dialog card - question** | `100:8965` | 328 × 378 | Cebisa in yellow circle → H3 (2 lines) → body → primary + secondary |

**Rules**
- Title is **H3 (18/24) centred**; body is Inter 16/24 `role.textMid`, centred.
- Buttons are 296 × 40, stacked, **16 dp gap**, primary above secondary.
- The **status icon colour states the intent**: red = destructive/blocked, orange = warning,
  blue = information, mascot = guidance/encouragement.
- Celebrate and Cebisa variants have **no buttons** — they are dismissed by tapping the scrim
  or auto-advance. Everything else must offer an explicit way out.
- Never put a mascot on a destructive confirmation.

Feature-specific dialogs (walkthrough coach-marks, date pickers, image pop-ups, error dialogs)
are specified in the [`screens/`](screens/) docs.

---

## 10. Navigation

### 10.1 App bar / headers — frame `100:3678`, all 360 × 64 dp

Navy `role.appBar`, white content, 16 dp side padding, 24 dp back arrow left.

| Variant | Node | Right-hand element |
|---|---|---|
| title with subtitle and icons | `100:3699` | — (title H3 + subtitle `help`) |
| steps exit button top bar | `100:3707` | white ✕ ("Child registration / Step 5 of 11") |
| **Title with question mark** | `100:3714` | **cyan `role.action` circular "?" help button** |
| search bar focused filled | `100:3679` | white ✕ clear |
| search bar autofocus | `100:3689` | placeholder in `role.textLight` |

Also `Nav header` `100:6994`, and logo headers `Dark` `100:7560` / `White` `100:7567` /
`Transparent` `100:7573`.

### 10.2 Tabs

Horizontal, scrollable, **56 dp** bar (48 dp compact, 64 dp logo rows). Active tab:
`role.action` label + cyan underline; inactive: `role.textMid`. Two named sets in the file —
`Tabs - business` (Staff | Money | Resources) and `Tabs - principal` (Attendance | Progress |
Activities | Resources). Two-tab bars split 180 dp each; the active tab occupies the full 56 dp
height while inactive tabs inset to 54 dp.

> The tab strip **scrolls horizontally** (measured inner width 455 dp on a 360 dp frame). Don't
> force-fit all tabs on screen.

### 10.3 Menu button — frame `100:7408`

36 × 36 dp component set, properties `Theme` / `Expanded` / `State`
(`100:7409`, `100:7411`, `100:7413`, `100:7415`).

### 10.4 Menu items (drawer) — frame `100:7580`

288 dp wide: `Item` `100:7588` (40), `Item_Selected` `100:7600` (40), `Item_Notification`
`100:7581` (40), nested `100:7605` (**36**), `Item-Dropdown` `100:7609` /
`-DropdownExpanded` `100:7619` (40).

> Annotation `100:8791`: *"'Practitioners' shown only for principals who have 1 or more
> additional practitioner working at the programme."*

---

## 11. Filters & search

Frame `100:3920` plus the in-context bar documented on the Resources page.

### 11.1 Filters bar with Search — 360 × 56 dp

`role.background` fill, hairline bottom border, 20 dp left inset:
- **40 dp circular search button**, `role.select` (magenta) fill, white `search` glyph.
- Then a **horizontally scrollable** row of 40 dp trigger chips (measured inner width up to
  491 dp — it is meant to overflow).

### 11.2 Trigger chip states

| State | Treatment |
|---|---|
| closed | `role.surface` fill, 1 dp `role.line`, radius 8, padding 16 h, label 14 sp `role.textDark` + 24 dp chevron-down |
| open / focused | pale cyan fill, **2 dp `role.action`** border |
| **applied** (`filtered`) | solid `role.action` fill, white label + white chevron — displays the applied value ("Most liked") |

Widths are content-based (85 / 88 / 114 / 120 dp measured).

### 11.3 Dropdown menu

Opens below the trigger, **328 dp** wide, `role.surface`, radius 8, `elevation.dropdown`.

| Part | Node | Height |
|---|---|---|
| Menu header ("Filter by: **Type**") | — | **48 dp**, 16 dp padding, hairline below |
| `filter item` | `100:3950` | **48 dp** |
| `filter item active` | `100:3947` | 48 dp — `role.action` filled check + SemiBold label |
| `filter item with sub` | `100:3957` | 66–67 dp |
| panel (4 items) | `100:3929` | 246–248 dp |

Inactive rows use a slate-grey filled check with a `role.textMid` label.

---

## 12. Badges & avatars

### 12.1 Badges — frame `100:6960`, all **28 dp** high

| Badge | Node | Size | Spec |
|---|---|---|---|
| count pill | `100:6961` | 40 × 28 | `status.success.main` fill, white Inter SemiBold 12/16 ("0/5") |
| solid | `100:6963` | 110 × 28 | `status.success.main`, white label ("Available now") |
| outline | `100:6966` | 106 × 28 | white fill, `status.alert.main` border + label ("Coming soon") |
| **offline** | `100:6968` | 48 × **16** | `status.error.main` pill, white 12 sp "offline" |
| Level badges | `100:6971` set | 74–76 × 16–26 | Coloured chevron mark + `typescale.overline` label ("LEVEL 1/P/2/3") |

**Like badges** (Resources): 28 dp pill with white thumb-up + count —
`status.success.main` when > 0, `status.info.main` when 0.
**Type badges**: 28 dp pill in the category tint with a `role.textDark` label.

### 12.2 Avatars — frame `100:7417`

| Avatar | Node | Size |
|---|---|---|
| Add-photo avatar | `100:7418` | **125** (112 dp cyan circle + **32 dp magenta camera badge** top-right) |
| Avatar circle sm | `100:7468` | **48** |
| Initials circle sm | `100:7471` | 48 — `role.selectSubtle` circle, white initials |
| Avatar icon no photo | `100:7474` | **120** — magenta circle, white initials |

**Scale: 48 / 120 / 125 dp.**

---

## 13. Slide-overs & action panels

### 13.1 Slide-overs — frame `100:7481`

| Sheet | Node | Size | Anatomy |
|---|---|---|---|
| bottom sheet with action icons | `100:7483` | 360 × 157 | H3 title + 24 dp ✕; two **48 dp magenta circular** action buttons ("Gallery", "Camera") with 12 sp captions |
| bottom sheet with input | `100:7501` | 360 × 207 | Title + ✕; focused input; full-width primary "Save" |
| PWA prompt | `100:7511` | 360 × 160 | 40 dp app icon + ✕ + primary "Download" |

Full-width, top corners `radius.xl`, `elevation.dialog`.

### 13.2 Action panels — frame `100:7529`

| Panel | Node | Size | Anatomy |
|---|---|---|---|
| with link | `100:7530` | 328 × 193 | `role.background` panel, radius 10, padding 16: H3 title + body + full-width **primary** button with 20 dp leading icon |
| statements | `100:7536` | 328 × 130 | 48 dp **magenta** circular icon + bold statement + small **secondary outline** pill ("+ Add income") |

### 13.3 Title components — frame `100:4971`

`Page Title` `100:4972` (360 × 53, H1, 16 dp margins) and
`Alert title with leading badge` `100:4976` (360 × 76).

---

## 14. Empty & offline states

The recurring `Simple/Mobile` empty block (360 × 284):
```
centred H2 headline        role.textDark
  ↓
110 dp illustration        illustrated icon in a coloured circle
  ↓
body copy (optional)       role.textMid, centred
  ↓
action (optional)
```

The **Offline card** `100:7106` (328 × 204) is the specified treatment for
"Information not available when offline". Offline behaviour, sync feedback and conflict
messaging: [`patterns/offline-first.md`](patterns/offline-first.md).

---

## Component → screen index

| Component | Primary users |
|---|---|
| `action item icon` list rows | every list screen |
| Filters bar + dropdowns | Resources, activity/story choosers |
| Select card | progress observations, language pickers, likes |
| Single-select button group | progress observation answers |
| Progress / Notes cards | child progress |
| Activity / Story cards | programme planning |
| `action item large sum`, money statistics card | money |
| Tutorial card / `dialog card - tutorial` | every walkthrough |
| Action panel statements | money dashboard |

Per-screen build recipes live in [`screens/`](screens/).
