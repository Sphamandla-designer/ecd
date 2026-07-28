# Page 20 — Profile (WO1.3.0) & Practitioner Self-Assessment

**Figma file key:** `8s2xe3EyBRhrzDFy93NbfN`
**Page (canvas) node:** `139:65077` — "Page 20"
**Device frame:** 360 × 640 dp (mdpi baseline). Content gutter 16 dp → content width 328 dp.
**Extracted:** 2026-07-28

> **Asset note:** PNG exports could not be written to disk — this environment's egress proxy
> blocks `www.figma.com` (403 on CONNECT), so `curl` of the short-lived asset URLs fails.
> Every screen below was instead rendered and viewed inline at full size, and is documented in
> text. The "Figma node deep-link index" at the end replaces the asset index — open any node
> directly in Figma from those URLs.

---

## 1. Page overview

Page 20 holds two connected but distinct clusters of screens:

1. **Profile / Journey screens (`WO1.3.0 Profile`)** — the practitioner (or child/parent)
   profile screen, which is a two-tab screen (`Profile` | `Journey`). Only the **Journey** tab
   is designed on this page: a vertical timeline ("Antenatal visits" frame, reused as a generic
   journey-step stack) listing lifecycle milestones — app registration, course completion,
   self-assessment completion — each with a coloured circular status token, title, date and an
   optional trailing action button.
2. **The Practitioner self-assessment form flow (`N7.1.x`)** — a 6-step (plus alternate
   step 8/9) single-select questionnaire launched from the Journey tab's "Fill in a form"
   button, and the **SmartSpace summary (`13.4.0`)** results screen that a completed
   self-assessment resolves to when the user taps "View".

Two `Header` instances (`139:65083` at y=0, `139:65084` at y=1662, each 5205 × 300) are the
page's canvas section banners and are not app screens.

A stray, un-parented **`Logo - Stacked`** artwork frame (`139:65639`, 300 × 195, 11 vector
paths) sits at x=878, y=2357 — the SmartStart wordmark used inside step 1.

### Design-system observations
- Two visual "shells" recur: **Title with subtitle** (dark navy 64 dp app bar) and
  **Page Title** (33–58 dp on-white heading block).
- Form screens are tall, single-scroll frames (up to 2028 dp) with a **sticky bottom
  `Form Layout` bar** (360 × 72) holding a full-width 328 × 40 primary button.
- Every questionnaire question is a `Label` text + a `Frame 32x/33x` of exactly **three
  `Radio Group default` instances** (328 × 54, 4 dp gaps → 58 dp pitch, 170 dp block).
- Steps 5/8/9 swap radio groups for **`Select card`** instances (328 × 56, or 80 when the
  label wraps to two lines; 4 dp gaps).

---

## 2. Flow map

```
                    ┌──────────────────────────────────────┐
                    │ WO1.3.0 Profile — Journey tab        │
                    │ 139:65085 (with coach banner)        │
                    │ 139:65149 (without banner)           │
                    └───────────────┬──────────────────────┘
                                    │ tap "Fill in a form"          tap "View" on a
                                    │ (comment 139:65243)           completed journey step
                                    ▼                               (comment 139:65319)
              ┌──────────────────────────────────┐                          │
              │ W15.0.0 Journey — form picker    │                          │
              │ 139:65245  "Which form would     │                          │
              │            you like to fill?"    │                          │
              │ 139:65266  empty state           │                          │
              │            "No forms available   │                          │
              │             yet"                 │                          │
              └───────────────┬──────────────────┘                          │
                              │ tap "Self-assessment form"                  │
                              ▼  (comment 139:65317)                        │
   N7.1.1 step 1  139:65464  intro / "Start"                                │
        ▼                                                                   │
   N7.1.2 step 2  139:65321  6 radio questions                              │
        ▼                                                                   │
   N7.1.3 step 3  139:65362  4 radio questions                              │
        ▼                                                                   │
   N7.1.3 step 4  139:65393  6 radio questions                              │
        ▼                                                                   │
   N7.1.5 step 5  139:65434  8 select cards (Next disabled)                 │
        ▼           ├── variant  step 8  139:65490 (Next enabled)           │
        ▼           └── variant  step 9  139:65510 (Next enabled)           │
   N7.1.6 step 6  139:65454  free-text "long text input"                    │
        ▼                                                                   │
        └──────────────────────────────────────────────────────────────────►│
                                                                            ▼
                                        13.4.0 SmartSpace summary — Licence awarded
                                                        139:65530
```

The Journey tab's "View" pill on the "Self-assessment form completed" step is the entry
point to `13.4.0`; the sequence step 1 → 6 is enforced by the header's "step N of 6" counter
and the bottom-bar Next/Start button.

---

## 3. Screen inventory

| Node id | Name | Size (dp) | Purpose |
|---|---|---|---|
| `139:65083` | Header | 5205 × 300 | Canvas section banner (not a screen) |
| `139:65084` | Header | 5205 × 300 | Canvas section banner (not a screen) |
| `139:65085` | WO1.3.0 Profile | 360 × 640 | Profile screen, **Journey** tab, with "Need help? Contact your coach" informational banner |
| `139:65149` | WO1.3.0 Profile | 360 × 640 | Same screen with the informational banner removed (banner-less variant) |
| `139:65212` | comment | 360 × 410 | Designer note: "All possible journey items" — the three journey-step patterns |
| `139:65243` | comment | 360 × 102 | Designer note: entry point into the form picker |
| `139:65245` | W15.0.0 Journey | 360 × 640 | "Fill in a form" picker — list of available forms |
| `139:65266` | W15.0.0 Journey | 360 × 640 | Form picker **empty state** ("No forms available yet") |
| `139:65317` | comment | 360 × 62 | Section label: "Practitioner self-assessment" |
| `139:65319` | comment | 360 × 92 | Section label: "View a completed self-assessment" |
| `139:65464` | N7.1.1 Practitioner self-assessment - step 1 | 360 × 640 | Form intro + SmartStart attribution + "Start" |
| `139:65321` | N7.1.2 Practitioner self-assessment - step 2 | 360 × 1818 | 6 single-select questions |
| `139:65362` | N7.1.3 Practitioner self-assessment - step 3 | 360 × 1335 | 4 single-select questions |
| `139:65393` | N7.1.3 Practitioner self-assessment - step 4 | 360 × 2000 | 6 single-select questions |
| `139:65434` | N7.1.5 Practitioner self-assessment - step 5 | 360 × 807 | 8 select cards; Next **disabled** |
| `139:65454` | N7.1.6 Practitioner self-assessment - step 6 | 360 × 640 | Free-text long input; Next **disabled** |
| `139:65490` | N7.1.5 Practitioner self-assessment - step 8 | 360 × 807 | 8 select cards; Next **enabled** |
| `139:65510` | N7.1.5 Practitioner self-assessment - step 9 | 360 × 791 | 8 select cards (last is `Select card default`); Next **enabled** |
| `139:65530` | 13.4.0 SmartSpace summary - Licence awarded | 360 × 2028 | Completed self-assessment results / licence outcome |
| `139:65639` | Logo - Stacked | 300 × 195 | Loose SmartStart logo artwork on canvas |

Unique *screens*: 13 (excluding headers, comments and the loose logo).

---

## 4. Per-screen anatomy

### 4.1 `139:65085` — WO1.3.0 Profile (Journey tab, with coach banner) · 360 × 640

**Layout, top to bottom**

| y | h | Node | Element |
|---|---|---|---|
| 0 | 64 | `139:65086` | `Title with subtitle` — navy (`Primary #27385A`) app bar. Back arrow at left (~16 dp inset), centred title **"Bulelwa"** in Quicksand SemiBold ~16/22 (`ECD H4`). No subtitle rendered on this instance. |
| 64 | 56 | `139:65091` | `Tabs - business` (see §5) |
| 120 | 605 | `139:65097` | `Frame 1484` — scrolling content (overflows the 640 dp viewport by 85 dp) |
| ├ 136 | 112 | `139:65098` | `Informational` card, x=16, w=328. Pale blue fill `Info BG #EBF3FF`, ~8 dp radius, 16 dp inner padding. 20 dp filled info circle icon at top-left (`Info Main #1D67D5`); bold blue two-line body **"Need help? Contact your coach or ask for a visit."**; a small solid cyan button **"See coach"** with a leading person icon (~40 dp tall, hugging width ~104 dp) sits at the card's lower-left. |
| ├ 264 | 40 | `139:65099` | `secondary with icon` — full-width 328 × 40 **outlined pill**: 1 dp cyan (`Quaternary #1DBADF`) border, transparent fill, ~20 dp radius, centred cyan label **"Fill in a form"** with a leading clipboard/document-list icon. |
| └ 320 | 389 | `139:65100` | `Frame 424` — journey timeline container |

**Journey timeline** (`Antenatal visits` `139:65102`, x=16 y=+16, 328 × 357 — the component is named for the antenatal use-case but is reused generically):

- Two vertical connector lines drawn at **x = 19.5** (i.e. the centre of the 32 dp status circle, which sits at x = 4): `Line 3` `139:65103` (y 8 → 92, 84 dp long) and `Line 6` `139:65104` (y 95 → 155, 60 dp long). They are rendered in green.
- `Steps` `139:65105` (328 × 196) holds the visible step rows:

| Step | Node | y | h | Circle icon | Text |
|---|---|---|---|---|---|
| 1 | `139:65106` | 0 | 42 | `Check` `139:65110` (20 dp, white, on green `Success Main #83BB26` 32 dp circle) | **"Registered for AppName"** (22 dp line) / **"30 July 2024"** (20 dp line, grey `Text Mid #65727A`) |
| 2 | `139:65114` | 66 | 42 | `Icon/Solid/academic-cap` `139:65118` | **"Course completed: Lorem ipsum"** / **"3 August 2024"** |
| 3 | `139:65139` | 132 | 64 | `Check` `139:65143` | **"Self-assessment form completed"** (44 dp, wraps 2 lines) / **"10 November 2024"** + trailing `small secondary` pill `139:65148` at x=277 y=16, 51 × 32, pink fill `Secondary Accent 2 #FFD3E6` with dark label **"View"** |

**Spacing derived from geometry**
- Page gutter **16 dp**; content width **328 dp**.
- Vertical rhythm inside `Frame 1484`: 16 dp top pad, then **16 dp** between the informational card and the "Fill in a form" button (144 − 128 = 16), then **16 dp** to the timeline block (200 − 184 = 16).
- Journey step pitch **66 dp** (42 dp row + **24 dp** gap).
- Status circle **32 × 32** at x = 4; text `Content` column starts at x = 56 → **20 dp** gap between circle and text.
- Trailing-action column: `Content` `139:65147` at x = 277, w = 51 → right-aligned to the 328 dp content edge.

**States / hidden variant layers on this frame**
- `Frame 1481` `139:65087` — **hidden**, x=16 y=144, 328 × 256. An alternative "action list" body: `action item icon` `139:65088` (328 × 80, y=0), `action item icon` `139:65089` (328 × 80, y=88 → **8 dp** gap), `long action icon with badge` `139:65090` (328 × 80, y=176). This is the **Profile tab's** content, hidden while the Journey tab is shown.
- `Bottom border` `139:65095` — **hidden** 360 × 1 rounded rectangle at y=56 of the tab bar.
- `with link` `139:65096` — **hidden**, x=16 y=420, 328 × 148 (a card with a link, for a variant of the journey body).
- `Celebratory` `139:65101` — **hidden**, x=16 y=16 inside `Frame 424`, 328 × 132 (celebration card shown when a milestone is newly achieved).
- Two further **hidden** journey-step rows demonstrating richer step types:
  - `139:65122` (y=136, 328 × 44): circle + title (`139:65126`) + a `Frame 429` row with a `square` checkbox `139:65128` (20 dp) and a caption, plus a `small primary trailing icon` button `139:65131` (94 × 32) in a right-hand 94 dp column at x=234.
  - `139:65132` (y=272, 328 × 44): circle + two-line text + `small primary trailing icon` `139:65138` (94 × 32).

---

### 4.2 `139:65149` — WO1.3.0 Profile (Journey tab, no coach banner) · 360 × 640

Identical to §4.1 except the `Informational` card is **removed** (not hidden — absent from the tree), so `Frame 1484` `139:65161` is **477 dp** tall instead of 605 and everything shifts up by 128 dp:

| y | h | Node | Element |
|---|---|---|---|
| 0 | 64 | `139:65150` | `Title with subtitle` — "Bulelwa" |
| 64 | 56 | `139:65155` | `Tabs - business` (Journey active) |
| 136 | 40 | `139:65162` | `secondary with icon` — "Fill in a form" |
| 192 | 389 | `139:65163` | `Frame 424` → `Antenatal visits` `139:65165`, identical 3-step timeline |

Same hidden layers as §4.1 (`Frame 1481` `139:65151`, `Bottom border` `139:65159`, `with link` `139:65160`, `Celebratory` `139:65164`, hidden step rows `139:65185` / `139:65195`). Use this as the **default / steady-state** Journey tab; §4.1 is the "coach nudge" state.

---

### 4.3 `139:65245` — W15.0.0 Journey (form picker) · 360 × 640

| y | h | Node | Element |
|---|---|---|---|
| 0 | 64 | `139:65247` | `Title with subtitle` — navy app bar, back arrow, centred title **"Fill in a form"** |
| 64 | 0 | `139:65248` | `Action with icons` — **collapsed to 0 dp**; contains five `full width` instances (`139:65249`–`139:65253`) all at h = 0. This is the action-row slot, empty in this state. |
| 80 | 33 | `139:65255` | `Page Title` — **"Which form would you like to fill?"**, navy Quicksand SemiBold ~18/24, full-bleed with 16 dp gutter |
| 139 | 100 | `139:65256` | `Children list` → `action item no icon` `139:65257`, 328 × 100, `UI Background #EFF6FA` fill, ~12 dp radius |

`action item no icon` internals:
- `Icon Circle` `139:65258` (x=16 y=16, 48 × 48) — **hidden**; would hold `Initials circle sm` `139:65259`. Because it is hidden, the text block starts at the 16 dp gutter instead of x = 80.
- `Frame 713` `139:65260` at (16, 20), 256 × 60: `Title` `139:65261` (256 × 20) **"Self-assessment form"**; `Supporting content` `139:65262` at y=20, 256 × 40 → hidden 16 dp `square` icon `139:65263` plus `Suporting text` `139:65264` **"Self-assessment created by SmartStart"** (grey `Text Mid #65727A`, 2 lines).
- `Icon/Solid/chevron-right` `139:65265` at (288, 38), 24 × 24 — vertically centred in the 100 dp card.

**Hidden:** `Simple striped/Mobile` `139:65254` (360 × 325 at y=404) — the empty-state block, hidden because a form exists.

**Spacing:** app bar 64 → page title 80 (16 dp gap); page title bottom 113 → list top 139 (**26 dp**); card padding 16 dp left/top, 20 dp to title baseline block.

---

### 4.4 `139:65266` — W15.0.0 Journey (empty state) · 360 × 640

| y | h | Node | Element |
|---|---|---|---|
| 0 | 64 | `139:65268` | `Title with subtitle` — **"Fill in a form"** |
| 64 | 0 | `139:65269` | `Action with icons` — collapsed, 5 × `full width` at h = 0 |
| 80 | 33 | `139:65276` | `Page Title` — **"No forms available yet"** |
| 153 | 304 | `139:65277` | `Simple/Mobile` empty-state block |

Empty-state internals:
- `ECD_Connect_alien` `139:65278` at (126, 48), **108 × 108** — horizontally centred (126 + 108 = 234; (360 − 108)/2 = 126 ✓). Dark navy filled circle containing the ECD Connect mascot: a green alien in a magenta/cyan flying saucer.
- `Frame 401` `139:65311` at (36, 172), 288 × 44 → `Text` `139:65312`: **"There are no forms available on AppName"**, navy, centred, 2 lines.
- **Hidden:** `Text` `139:65313` (26, 220, 308 × 20) secondary caption slot; `with text` `139:65314` (16, 260, 328 × 16); `Actions` `139:65315` (16, 220, 328 × 32) containing `small secondary leading icon` `139:65316` (194 × 32, centred at x=67) — an optional CTA under the illustration.
- **Hidden** on the layout frame: `Simple striped/Mobile` `139:65275`.

**Spacing:** 48 dp above the illustration inside the block, **16 dp** from illustration bottom (156) to text top (172).

---

### 4.5 `139:65464` — N7.1.1 Practitioner self-assessment · step 1 · 360 × 640

| y | h | Node | Element |
|---|---|---|---|
| 0 | 64 | `139:65470` | `Title with subtitle` — navy bar. Back arrow left; two lines centred: **"Self-assessment"** / **"step 1 of 6"** (subtitle in lighter `Primary Accent 1 #52607B`-family grey-blue, 12/16). |
| 20 | 24 | `139:65465`, `139:65473` | `Icon right` × 2, both at x=320 — the **✕ close** affordance (duplicated layer). |
| 79 | 58 | `139:65469` | `Page Title` — **"About the self assessment form"** (navy, ~18/24) with secondary line **"3 February 2024"** |
| 147.25 | 0.96 | `139:65472` | `list` — hairline **dashed** rule, x=16, w=328 |
| 170 | 96 | `139:65471` | Body copy, x=16, w=328, `Body Copy` Inter 16/24: **"This form will help you think about which parts of your programme you are doing well and if there are any areas that need to get better."** (layer name = the string verbatim) |
| 310 | 51.99 | `139:65474` | `Content` — attribution row |
| 568 | 72 | `139:65466` | `Form Layout` — bottom bar |

Attribution row `139:65474`: `Label` `139:65475` at (27.5, 16), 209 × 20 — **"This content is powered by:"**; `Logo - Stacked` `139:65478` at (252.5, 0), 80 × 52 — the purple **smart start** wordmark (`SS Primary Purple #583F99`). Hidden inside: `Level p` `139:65476` (65 × 24) and `Level 1` `139:65477` (62 × 24) — unused level badges.

Bottom bar: `standard` divider `139:65467` (328 × 0) then `primary with icon` `139:65468` at (16, 16), 328 × 40 — **enabled** solid cyan (`Quaternary #1DBADF`) pill, white label **"Start"** with a leading white arrow-in-circle icon. 16 dp padding all round → 72 dp bar.

---

### 4.6 `139:65321` — N7.1.2 step 2 · 360 × 1818 (scrolling)

Header: `Title with subtitle` `139:65322` — **"Self-assessment" / "step 2 of 6"**; ✕ close `139:65361` at (320, 20).
`Page Title` `139:65323` at y=79, 360 × 36 — **"Self-assessment"**.

`Frame 418` `139:65324` at y=131, 360 × 1631:
- `Informational 2` `139:65325` (16, 0), 328 × 72 — pale blue `Info BG #EBF3FF` card, 20 dp info icon, bold blue text **"Read each statement and think carefully about your programme."**
- `list` `139:65326` (16, 88), 328 × 1 — dashed rule
- Six question blocks, each = `Label` text + a frame of exactly **three `Radio Group default` instances** (328 × 54 at y 0 / 58 / 116 → **4 dp** gap, **58 dp** pitch, **170 dp** block). Every question offers the same three options: **"Sometimes" / "Most of the time" / "All the time"**, all unselected (empty cyan-ring radio, `Quaternary Accent 2 #D2F1F9` card fill, grey label).

| # | Label node | y | Label h | Radio frame | Question text |
|---|---|---|---|---|---|
| 1 | `139:65327` | 105 | 22 | `139:65328` @143 | "I make sure children are supervised:" |
| 2 | `139:65332` | 329 | 44 | `139:65333` @389 | "I make a fun & interesting space, with things on the wall:" |
| 3 | `139:65337` | 575 | 44 | `139:65338` @635 | "I unpack toys, books and materials and put them where children can reach them:" |
| 4 | `139:65342` | 821 | 66 | `139:65343` @903 | "I set up different interest areas with area labels (art, pretend, building, toys and games, story):" |
| 5 | `139:65347` | 1089 | 44 | `139:65348` @1149 | "I put up a daily routine that children can see:" |
| 6 | `139:65352` | 1335 | 66 | `139:65353` @1417 | "I make sure children always have the chance to plan their activities before free play, and to talk about it afterwards:" |

- `standard` `139:65357` (16, 1603), 328 × 0 — collapsed divider.

**Spacing rule (holds across steps 2–4):** label → radio block gap = **16 dp**; radio block bottom → next label top = **16 dp**; so a block's total pitch = labelHeight + 16 + 170 + 16.

`Form Layout` `139:65358` at y=1746, 360 × 72 → `primary disabled with icon` `139:65360` (16, 16), 328 × 40 — **disabled** pale-cyan pill (`Quaternary Accent 2 #D2F1F9` fill, white-ish label) reading **"Next"** with a leading arrow-circle icon. Disabled because no answers are selected.

---

### 4.7 `139:65362` — N7.1.3 step 3 · 360 × 1335

Header **"Self-assessment" / "step 3 of 6"** (`139:65363`), ✕ `139:65392`, `Page Title` `139:65364` **"Self-assessment"**.
`Frame 418` `139:65365` (y=131, h 1117): `Informational 2` `139:65366` (same "Read each statement…" copy) → dashed `list` `139:65367` @88 → **four** question blocks, all `Sometimes / Most of the time / All the time`, unselected:

| # | Label node | y | h | Radio frame | Question text |
|---|---|---|---|---|---|
| 1 | `139:65368` | 105 | 66 | `139:65369` @187 | "I speak and act warmly and respectfully to children. I give individual attention to different children and encourage them:" |
| 2 | `139:65373` | 373 | 44 | `139:65374` @433 | "I make sure that children who are upset are comforted:" |
| 3 | `139:65378` | 619 | 44 | `139:65379` @679 | "I use calm methods to keep order, and do not use harsh words or physical methods:" |
| 4 | `139:65383` | 865 | 66 | `139:65384` @947 | "I involve children in solving conflicts and listen carefully to their feelings, views and suggestions:" |

`Form Layout` `139:65389` @1263 → `primary disabled with icon` `139:65391` — **"Next"**, disabled.

---

### 4.8 `139:65393` — N7.1.3 step 4 · 360 × 2000 (tallest form step)

> Note the frame name repeats the `N7.1.3` prefix used by step 3 — a numbering slip in the source file (should be `N7.1.4`).

Header **"Self-assessment" / "step 4 of 6"** (`139:65394`), ✕ `139:65433`, `Page Title` `139:65395`.
`Frame 418` `139:65396` (y=131, h 1779): `Informational 2` `139:65397` → dashed `list` `139:65398` @88 → **six** question blocks:

| # | Label node | y | h | Radio frame | Question text |
|---|---|---|---|---|---|
| 1 | `139:65399` | 105 | 88 | `Frame 334` `139:65400` @209 | "I talk with children throughout the programme. I encourage children to talk about what they are doing and thinking, and I listen carefully to their ideas:" |
| 2 | `139:65404` | 395 | 66 | `Frame 328` `139:65405` @477 | "I help to improve children's language by telling them new words and explaining what they mean:" |
| 3 | `139:65409` | 663 | 66 | `Frame 335` `139:65410` @745 | "I let children make their own choices about what to play and I allow them to play and learn at their own level:" |
| 4 | `139:65414` | 931 | 66 | `Frame 336` `139:65415` @1013 | "I give children appropriate toys and materials to play with and support them to use them when needed:" |
| 5 | `139:65419` | 1199 | 110 | `Frame 337` `139:65420` @1325 | "I join in children's play and give support when needed. I get onto their level and share information and ask questions during play, to help children think and learn:" |
| 6 | `139:65424` | 1511 | 66 | `Frame 338` `139:65425` @1593 | "I make storytimes that are fun and full of conversation. I use questions and comments to encourage children to think:" |

`Form Layout` `139:65430` @1909 → `primary disabled with icon` `139:65432` — **"Next"**, disabled.

---

### 4.9 `139:65434` — N7.1.5 step 5 (nothing selected) · 360 × 807

Header **"Self-assessment" / "step 5 of 6"** (`139:65435`), ✕ `139:65450`, `Page Title` `139:65436` **"Self-assessment"**.

`Frame 418` `139:65437` (y=131, h 725):
- dashed `list` `139:65438` @0
- `Label` `139:65439` (16, 17), 328 × 22 — **"Which activities do you do every day?"**
- `Frame 438` `139:65440` (16, 55) → `Frame 328` `139:65441`, 328 × 524 — **eight `Select card` instances** (multi-select, square checkbox at x≈24 inside the card, `UI Background #EFF6FA` fill, ~10 dp radius, **4 dp** gaps):

| Card node | y | h | Label |
|---|---|---|---|
| `139:65442` | 0 | 56 | "Greeting time" |
| `139:65443` | 60 | 56 | "Morning ring or message board" |
| `139:65444` | 120 | **80** | "Teacher-directed small group activity" (wraps to 2 lines) |
| `139:65445` | 204 | 56 | "Free play time" |
| `139:65446` | 264 | **80** | "Large group time (songs, big group activities)" (2 lines) |
| `139:65447` | 348 | 56 | "Story time" |
| `139:65448` | 408 | 56 | "Outside time" |
| `139:65449` | 468 | 56 | "None" |

`Form Layout` `139:65451` @735 → `primary disabled with icon` `139:65453` — **"Next"**, disabled (nothing chosen).

---

### 4.10 `139:65490` — N7.1.5 step 8 · "None" selected · 360 × 807

**This is a selection *state* of step 5, not a seventh/eighth question page** — the header still reads **"step 5 of 6"**. Structure matches §4.9 exactly (`Frame 418` `139:65493`, `Frame 328` `139:65497`, cards `139:65498`–`139:65505`).

State differences:
- The last card, **"None"** (`139:65505`, y=468, h **54**), is **selected**: 1–2 dp cyan border (`Quaternary #1DBADF`), pale cyan fill (`Quaternary Accent 2 #D2F1F9`), solid cyan checkbox with a white tick, label in full navy.
- All seven other cards are rendered **dimmed/disabled** (near-white fill, greyed labels, empty pale checkboxes) — "None" is mutually exclusive with the activity options.
- Bottom button is `primary with icon` `139:65509` — **enabled** solid cyan **"Next"**.

---

### 4.11 `139:65510` — N7.1.5 step 9 · two activities selected · 360 × 791

Also a state of step 5 (header **"step 5 of 6"**). `Frame 418` `139:65513`, `Frame 438` `139:65516`, `Frame 328` `139:65517`, 328 × 520.

| Card node | y | h | Label | State |
|---|---|---|---|---|
| `139:65518` | 0 | **54** | "Greeting time" | **selected** (cyan border, filled cyan tick) |
| `139:65519` | 58 | **54** | "Morning ring or message board" | **selected** |
| `139:65520` | 116 | 80 | "Teacher-directed small group activity" | unselected |
| `139:65521` | 200 | 56 | "Free play time" | unselected |
| `139:65522` | 260 | 80 | "Large group time (songs, big group activities)" | unselected |
| `139:65523` | 344 | 56 | "Story time" | unselected |
| `139:65524` | 404 | 56 | "Outside time" | unselected |
| `139:65525` | 464 | 56 | **"None"** — component variant is `Select card default` (a different variant name from the other seven) | **dimmed / disabled**, because activities are selected |

`Form Layout` `139:65527` @719 → `primary with icon` `139:65529` — **enabled** cyan **"Next"**.

Selected cards are 54 dp (2 dp shorter than the 56 dp resting card) because the selected variant draws its border inside the bounds.

---

### 4.12 `139:65454` — N7.1.6 step 6 (Reflections) · 360 × 640

| y | h | Node | Element |
|---|---|---|---|
| 0 | 64 | `139:65455` | `Title with subtitle` — **"Self-assessment" / "step 6 of 6"** |
| 20 | 24 | `139:65463` | ✕ close, x=320 |
| 79 | 36 | `139:65456` | `Page Title` — **"Reflections"** |
| 131 | 451 | `139:65457` | `Frame 418` |
| ├ 131 | 1 | `139:65458` | dashed `list` rule, x=16 w=328 |
| └ 148 | 168 | `139:65459` | `long text input`, x=16, 328 × 168 — label **"What are some of the things you would like to do differently or get better at?"** (navy, 2 lines) above a `UI Background #EFF6FA` textarea (~8 dp radius, 16 dp inner padding) with grey placeholder **"e.g. always include recall time in my daily routine"** |
| 568 | 72 | `139:65460` | `Form Layout` → `primary disabled with icon` `139:65462`, 328 × 40 — **disabled** pale-cyan pill reading **"Save"** with a leading save/floppy icon. Note the final step's CTA is "Save", not "Next". |

---

### 4.13 `139:65530` — 13.4.0 SmartSpace summary · Licence awarded · 360 × 2028

The read-only results screen for a completed self-assessment (reached via the **"View"** pill on the Journey timeline).

Header: `Title with subtitle` `139:65531` — **"Self-assessment"** only (no step counter); ✕ close `139:65635` at (320, 20).

`Frame 1476` `139:65532` (y=79, 360 × 1862):
- `Page Title` `139:65533`, 360 × 58 — **"Self-assessment form"** with secondary line **"Bulelwa Mahlangu"**.
- `Frame 418` `139:65534` (y=74 within, 360 × 1788). All rows x=16, w=328. Dashed `list` rules separate the sections at y = 0 (`139:65535`), 119 (`139:65540`), 362 (`139:65553`), 875 (`139:65572`), 1362 (`139:65603`), 1787 (`139:65634`).

**Section A — free-text answer** (`Frame 1497` `139:65536`, y=17, 328 × 86)
- `Label` `139:65538`, 328 × 46 — **"Things you would like to do differently or get better at:"**
- `139:65539` @y=62, 328 × 24 — the recorded answer, shown grey: **"Lorem ipsum"**

**Section B — "all the time" band** (green)
- `Celebratory` `139:65541` (y=136, 328 × 106): light-green card, 16 dp padding; `ECD_Connect_emoji3 1` `139:65543` — 48 dp green smiling-face emoji; `Content` at x=64, w=225 → `139:65545` bold green **"You do these things all the time."** (44 dp, 2 lines) and `139:65546` **"Great job!"** (22 dp), 8 dp apart (52 − 44).
- Bulleted results, each = 20 dp `Icon/Solid/check-circle` (green) + `Label` at x=28, w=300:
  - `Frame 1490` `139:65547` (y=258, h 24) — "I make sure children are supervised."
  - `Frame 1491` `139:65550` (y=298, h 48) — "I make a fun & interesting space, with things on the wall."

**Section C — "most of the time" band** (cyan)
- `Celebratory` `139:65554` (y=379, 328 × 128): pale-cyan card; `ECD_Connect_emoji1 1` `139:65556` 48 dp cyan face; `139:65558` bold cyan **"You do these things most of the time."**; `139:65559` **"Keep it up! Aim for all the time!"** (44 dp, 2 lines).
- Bullets use 20 dp `Icon/Solid/arrow-circle-right` (cyan):
  - `Frame 1492` `139:65560` (y=523, h 72) — "I unpack toys, books and materials and put them where children can reach them."
  - `Frame 1493` `139:65563` (y=611, h 72) — "I set up different interest areas with area labels (art, pretend, building, toys and games, story)."
  - `Frame 1494` `139:65566` (y=699, h 48) — "I put up a daily routine that children can see."
  - `Frame 1495` `139:65569` (y=763, h 96) — "I make sure children always have the chance to plan their activities before free play, and to talk about it afterwards."

**Section D — "sometimes" band** (orange/peach)
- `Celebratory` `139:65573` (y=892, 328 × 102): peach card; `Group 1457` `139:65575` — 48 dp orange face artwork (a raw group, not an instance); `Content` x=64, w=232 → `139:65589` bold orange **"You do these things sometimes."**, `139:65590` **"Try to do these more often!"**.
- Bullets use 20 dp `Icon/Solid/exclamation-circle` (orange/red):
  - `Frame 1496` `139:65591` (y=1010, h 96) — "I speak and act warmly and respectfully to children. I give individual attention to different children and encourage them."
  - `Frame 1498` `139:65594` (y=1122, h 48) — "I make sure that children who are upset are comforted."
  - `Frame 1499` `139:65597` (y=1186, h 72) — "I use calm methods to keep order, and do not use harsh words or physical methods."
  - `Frame 1500` `139:65600` (y=1274, h 72) — "I involve children in solving conflicts and listen carefully to their feelings, views and suggestions."

**Section E — daily-activity checklist** (`Frame 1477` `139:65604`, y=1379, 328 × 352)
- `Label` `139:65606`, 328 × 40 — navy bold **"You do these activities every day - great! Keep it up!"**
- Rows of 24 dp `Check circle` (green) + label at x=32, w=296, on a **40 dp pitch**:

| Row node | y | Label |
|---|---|---|
| `Frame 446` `139:65607` | 56 | "Greeting time" |
| `Frame 448` `139:65611` | 96 | "Teacher-directed small group activity" |
| `Frame 450` `139:65615` | 136 | "Free play time" |
| `Frame 453` `139:65619` | 176 (h 40, 2 lines) | "Large group time (songs, big group activities)" |
| `Frame 455` `139:65623` | 232 | "Outside time" |
| `Frame 454` `139:65626` | 272 | "Story time" |

- `139:65629` (y=312, 328 × 40) — navy bold heading **"You don't do these activities every day - try to include them more!"**
- `Frame 447` `139:65630` (y=1747 in `Frame 418` coords, 328 × 24) — 24 dp red **`X circle`** `139:65631` + **"Morning ring or message board"**

**Bottom bar:** `Form Layout` `139:65636` (y=1956, 360 × 72) → `primary with icon` `139:65638` (16, 16), 328 × 40 — **enabled** solid cyan pill, white **"Close"** with a leading ✕ icon.

> The frame name promises a **"Licence awarded"** outcome, but no licence badge/status component is drawn on this instance — the rendered content is purely the self-assessment feedback breakdown. Treat "Licence awarded" as the variant label for the SmartSpace summary family; the licence chrome is presumably on a sibling frame outside this page.

---

## 5. Tabs pattern

Only **one** tab component appears on this page: **`Tabs - business`** (`139:65091` on `139:65085`, `139:65155` on `139:65149`). A `Tabs - principal` variant is *not* present on Page 20 — if it exists it lives on another page; flag this as a gap.

**Geometry**

```
Tabs - business            360 × 56   (139:65091 / 139:65155)
└─ Tabs                    360 × 56   (139:65092 / 139:65156)
   ├─ Tab (inactive)       180 × 54  @ x=0,   y=1     (139:65093 / 139:65157)
   └─ Tab (active)         180 × 56  @ x=180, y=0     (139:65094 / 139:65158)
└─ Bottom border           360 × 1   @ y=56   HIDDEN  (139:65095 / 139:65159)
```

- Exactly **2 tabs**, each **180 dp** wide (360 / 2 — the bar always fills the viewport, equal-width tabs, no scrolling).
- Bar height **56 dp**.
- The **inactive** tab is inset by 1 dp top and bottom (`y=1`, `h=54`) so its bottom hairline sits above the bar's baseline; the **active** tab occupies the full 56 dp and paints a ~2 dp cyan indicator across its bottom edge, overlapping where the divider would be.
- The `Bottom border` hairline (360 × 1 at y=56) is **hidden** in both instances on this page.

**Appearance** (from render)
- Bar fill: pale blue `UI Background #EFF6FA`.
- Inactive label **"Profile"**: navy `Primary #27385A`, Quicksand SemiBold ~16/22 (`ECD H4`).
- Active label **"Journey"**: cyan `Quaternary #1DBADF`, same type, with a cyan 2 dp underline spanning the tab's 180 dp.
- Both profile frames on this page show the **Journey** tab active; the Profile tab's body is the hidden `Frame 1481` action list (§4.1).

---

## 6. Dialogs & popups

**There are no modal dialogs, bottom sheets, snackbars or popovers on Page 20.** Every frame is a full screen or a canvas comment. The closest overlay-like affordances are:

| Node | Type | Status | Notes |
|---|---|---|---|
| `139:65101` / `139:65164` | `Celebratory` card, 328 × 132 | **hidden** | Inline celebration card at the top of the journey list, not a modal. Its visible siblings on the summary screen (`139:65541`, `139:65554`, `139:65573`) show the three tonal treatments: green / cyan / peach. |
| `139:65096` / `139:65160` | `with link` card, 328 × 148 | **hidden** | Inline card with a link, alternate journey body. |
| `139:65098` / `139:65325` etc. | `Informational` / `Informational 2` | visible | Inline banner, dismiss-less. |
| `139:65465`, `139:65361`, `139:65392`, `139:65433`, `139:65450`, `139:65463`, `139:65635` | `Icon right` ✕ at (320, 20) | visible | Exit affordance on every self-assessment screen — implies a confirm-discard dialog exists somewhere, but it is **not designed on this page**. |

Gap to raise with the designer: no "discard your answers?" confirmation is specified for the ✕ on the form steps.

---

## 7. Designer notes (verbatim)

Four `comment` frames appear on the canvas. Transcribed exactly as rendered.

### `139:65212` — comment, 360 × 410 (x=790, y=418)

> **All possible journey items**
>
> **1. Registered for the app**
> Registered for AppName
> 30 July 2024
>
> **2. Moodle course completed**
> Course completed: Lorem ipsum
> 3 August 2024
>
> **3. Self-assessment form completed**
> Self-assessment form completed
> 10 November 2024   [View]

Text node ids: heading `139:65213`; "Registered for the app" `139:65214`; "Moodle course completed" `139:65223`; "Self-assessment form completed" `139:65232`. Each heading is followed by a live example row (`139:65215`, `139:65224`, `139:65233`) using the same `Text and image question` / `Journey step option 1` structure as the real screen — item 1 uses a green `Check` circle, item 2 the `Icon/Solid/academic-cap` circle, item 3 a green `Check` plus the pink **View** pill (`small secondary` `139:65242`, 51 × 32).

### `139:65243` — comment, 360 × 102 (x=0, y=2080)

> Tap "Fill in a form" from journey page

(Text node `139:65244`; the file uses curly quotes: `Tap “Fill in a form” from journey page`.)

### `139:65317` — comment, 360 × 62 (x=804, y=2080)

> Practitioner self-assessment

(Text node `139:65318`.)

### `139:65319` — comment, 360 × 92 (x=3962, y=2080)

> View a completed self-assessment

(Text node `139:65320`.)

All four comments are set in black Quicksand-style bold on white, ~20–24 px, x-inset 26 dp — canvas annotations, never rendered in-app.

---

## 8. Variables found

`get_variable_defs` was run on two representative screens.

### `139:65085` — WO1.3.0 Profile

| Variable | Value |
|---|---|
| `White` | `#FFFFFF` |
| `white` | `#FFFFFF` |
| `Primary` | `#27385A` |
| `Primary Accent 1` | `#52607B` |
| `UI Background` | `#EFF6FA` |
| `Quaternary` | `#1DBADF` |
| `Info Main` | `#1D67D5` |
| `Info Dark` | `#1752AB` |
| `Info BG` | `#EBF3FF` |
| `Success Main` | `#83BB26` |
| `Secondary Accent 2` | `#FFD3E6` |
| `SmartStart/sky blue` | `#29C1EF` |
| `text-xs/leading-4/font-medium` | Inter Medium 12 / 16, weight 500, ls 0 |
| `ECD H4` | Quicksand SemiBold 16 / 22, weight 600, ls 0 |
| `ECD Primary Button Text` | Quicksand SemiBold 14 / 20, weight 600, ls 0 |
| `ECD Small button text` | Quicksand SemiBold 12 / 16, weight 600, ls 0 |
| `Help text` | Inter Regular 14 / 20, weight 400, ls 0 |

### `139:65434` — N7.1.5 step 5

| Variable | Value |
|---|---|
| `Primary` | `#27385A` |
| `White` / `white` | `#FFFFFF` |
| `UI Background` | `#EFF6FA` |
| `Text Mid` | `#65727A` |
| `Quaternary Accent 1` | `#8EDCEF` |
| `Quaternary Accent 2` | `#D2F1F9` |
| `SS Primary Purple` | `#583F99` |
| `SmartStart Primary Accent` | `#9484BD` |
| `SmartStart Primary Accent 2` | `#D7D1E6` |
| `SmartStart Text dark` | `#1F192E` |
| `Body Copy` | Inter Regular 16 / 24, weight 400, ls 0 |
| `Small` | Inter Regular 14 / 20, weight 400, ls 0 |
| `ECD H4` | Quicksand SemiBold 16 / 22, weight 600, ls 0 |
| `ECD Primary Button Text` | Quicksand SemiBold 14 / 20, weight 600, ls 0 |

**Union / takeaways**
- Two type families: **Quicksand** (SemiBold) for headings and button labels; **Inter** (Regular/Medium) for body, help and small text.
- Brand ramp: navy `Primary #27385A` → cyan `Quaternary #1DBADF` (+ accents `#8EDCEF`, `#D2F1F9`) → surface `UI Background #EFF6FA`.
- Semantic: `Success Main #83BB26` (journey ticks, "all the time" band), `Info Main #1D67D5` / `Info BG #EBF3FF` (informational banners), `Secondary Accent 2 #FFD3E6` (the pink "View" pill).
- A separate **SmartStart** sub-palette (`SS Primary Purple #583F99`, accents `#9484BD` / `#D7D1E6`, `SmartStart Text dark #1F192E`, `SmartStart/sky blue #29C1EF`) is scoped to the co-branded self-assessment content.
- The duplicate `White` / `white` entries indicate two overlapping colour collections; worth consolidating.

---

## 9. Figma node deep-link index

Base: `https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=`

| Node id | What it shows | URL |
|---|---|---|
| `139:65077` | Page 20 canvas (all of the below) | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65077 |
| `139:65085` | WO1.3.0 Profile — Journey tab with "Need help? Contact your coach" banner | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65085 |
| `139:65149` | WO1.3.0 Profile — Journey tab, default (no banner) | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65149 |
| `139:65091` | `Tabs - business` instance (Profile / Journey) | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65091 |
| `139:65102` | `Antenatal visits` journey timeline (3 steps + connectors) | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65102 |
| `139:65087` | Hidden Profile-tab action list (`Frame 1481`) | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65087 |
| `139:65212` | Comment: "All possible journey items" — the 3 step patterns | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65212 |
| `139:65243` | Comment: Tap "Fill in a form" from journey page | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65243 |
| `139:65245` | W15.0.0 Journey — form picker, "Which form would you like to fill?" | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65245 |
| `139:65266` | W15.0.0 Journey — empty state with alien/UFO mascot | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65266 |
| `139:65317` | Comment: "Practitioner self-assessment" | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65317 |
| `139:65464` | N7.1.1 step 1 — intro, SmartStart attribution, "Start" | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65464 |
| `139:65321` | N7.1.2 step 2 — 6 radio questions, Next disabled | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65321 |
| `139:65362` | N7.1.3 step 3 — 4 radio questions | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65362 |
| `139:65393` | N7.1.3 step 4 — 6 radio questions (2000 dp tall) | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65393 |
| `139:65434` | N7.1.5 step 5 — 8 select cards, none chosen, Next disabled | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65434 |
| `139:65490` | N7.1.5 "step 8" — step-5 state with "None" selected, others dimmed | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65490 |
| `139:65510` | N7.1.5 "step 9" — step-5 state with 2 activities selected, "None" dimmed | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65510 |
| `139:65454` | N7.1.6 step 6 — "Reflections" long text input, "Save" disabled | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65454 |
| `139:65319` | Comment: "View a completed self-assessment" | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65319 |
| `139:65530` | 13.4.0 SmartSpace summary — Licence awarded (results breakdown) | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65530 |
| `139:65541` | Green "all the time" `Celebratory` card | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65541 |
| `139:65554` | Cyan "most of the time" `Celebratory` card | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65554 |
| `139:65573` | Peach "sometimes" `Celebratory` card | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65573 |
| `139:65639` | Loose `Logo - Stacked` SmartStart artwork on canvas | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65639 |

---

## 10. Gaps & follow-ups

1. **No PNG assets on disk** — proxy blocks `www.figma.com`; re-run the export from an unrestricted environment if the repo needs image assets under `design-system/assets/screens/page20-profile/`.
2. **`Tabs - principal` not present on this page** — only `Tabs - business` is used. Locate the principal variant elsewhere before codifying the tabs component.
3. **The Profile tab itself is never shown** — its content (`Frame 1481`, three action items) exists only as a hidden layer; no dedicated Profile-tab frame is designed here.
4. **Frame naming slips**: step 4 is prefixed `N7.1.3` (duplicating step 3); "step 8" and "step 9" are selection states of step 5 and still read "step 5 of 6" in their headers.
5. **"Licence awarded"** appears only in the frame name of `139:65530`; no licence UI is drawn.
6. **No discard-confirmation dialog** for the ✕ close on any form step.
7. `Action with icons` (`139:65248`, `139:65269`) collapses to 0 dp with five 0 dp `full width` children on both W15.0.0 frames — dead slot, or a component that needs content to expand.
