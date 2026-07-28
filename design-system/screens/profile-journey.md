# Profile & Journey screens

The **Profile** screen (`WO1.3.0`) is a two-tab screen — *Profile* | *Journey* — that gives a
practitioner (or, reused generically, a child or parent) a single place to see who they are and
what they have achieved. Only the **Journey** tab is designed: a vertical timeline of lifecycle
milestones (app registration, Moodle course completion, self-assessment completion), each with a
coloured status token, a date and an optional trailing action. From the Journey tab a
**"Fill in a form"** button leads to a form picker and then into the **Practitioner
self-assessment** (`N7.1.x`) — a 6-step, mostly single-select questionnaire produced by SmartStart
— which resolves, once completed, to the read-only **SmartSpace summary** (`13.4.0`) reached from
the timeline's pink **View** pill. All frames are 360dp wide at mdpi; content column 328dp; the
form steps are tall single-scroll frames (up to 2028dp) with a sticky 72dp bottom bar.

**Source:** Figma file `8s2xe3EyBRhrzDFy93NbfN` (App-Screens), **Page 20** node `139:65077`.

- Page 20 canvas — https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65077
- Extraction of record — [`design-system/extraction/page20-profile.md`](../extraction/page20-profile.md)
- Tokens of record — [`design-system/tokens/tokens.json`](../tokens/tokens.json)

> **Colour rule for this document:** every colour is named by a token from `tokens.json`
> (`role.*`, `category.*`, `status.*`, `palette.*`). No raw hexes appear below. Components bind to
> `role.*` / `status.*`; `palette.*` is quoted only where the source bound a raw palette entry
> (notably the co-branded SmartStart sub-palette) and the deviation is flagged in §9.

---

## 1. Flow map

### 1.1 Screen graph

```
                        ┌──────────────────────────────────────────────┐
                        │            WO1.3.0  PROFILE                  │
                        │   Tabs:  [ Profile ]  [ Journey ● ]          │
                        └──────────────────────────────────────────────┘
                                 │                     │
             ┌───────────────────┘                     └──────────────────┐
             ▼                                                            ▼
   PRO-TAB (Profile tab)                                    PRO-JRN  (Journey tab)
   ✗ NOT DESIGNED                                    PRO-JRN-COACH 139:65085  (+ coach banner)
   hidden layer only: Frame 1481                     PRO-JRN       139:65149  (steady state)
   139:65087 / 139:65151                                   │            │
   (2 × action item icon + 1 ×                              │            │
    long action icon with badge)                            │            │
                                                            │            │
                        tap "Fill in a form"  ◄──────────────┘            │
                        (comment 139:65243)                               │
                                    │                                     │
                                    ▼                        tap [View] on a completed
                    ┌───────────────────────────────┐        journey step (comment 139:65319)
                    │ FRM-PICK   139:65245          │                     │
                    │ "Which form would you like    │                     │
                    │  to fill?"                    │                     │
                    │   └ FRM-PICK-EMPTY 139:65266  │                     │
                    │     "No forms available yet"  │                     │
                    └───────────────┬───────────────┘                     │
                                    │ tap "Self-assessment form"          │
                                    ▼ (comment 139:65317)                 │
        ┌──────────────────────────────────────────────────────────┐      │
        │              PRACTITIONER SELF-ASSESSMENT                │      │
        │                                                          │      │
        │  SA-1  139:65464   step 1 of 6 — intro + [Start]         │      │
        │    ▼                                                     │      │
        │  SA-2  139:65321   step 2 of 6 — 6 radio questions       │      │
        │    ▼                                                     │      │
        │  SA-3  139:65362   step 3 of 6 — 4 radio questions       │      │
        │    ▼                                                     │      │
        │  SA-4  139:65393   step 4 of 6 — 6 radio questions       │      │
        │    ▼                                                     │      │
        │  SA-5  139:65434   step 5 of 6 — 8 select cards          │      │
        │    │      ├─ state SA-5/none-selected  139:65434  Next ✗ │      │
        │    │      ├─ state SA-5/"None"         139:65490  Next ✓ │      │
        │    │      └─ state SA-5/2 activities   139:65510  Next ✓ │      │
        │    ▼        (139:65490 & 139:65510 are FRAME-NAMED       │      │
        │  SA-6  139:65454   "step 8"/"step 9" — see §10)          │      │
        │        step 6 of 6 — Reflections free text + [Save]      │      │
        └───────────────────────────┬──────────────────────────────┘      │
                                    │ Save                                │
                                    ▼                                     │
                     journey gains "Self-assessment form completed"       │
                                    └─────────────────────────────────────┤
                                                                          ▼
                                              ┌──────────────────────────────────────┐
                                              │ SUM  139:65530                       │
                                              │ 13.4.0 SmartSpace summary            │
                                              │ (frame-named "Licence awarded")      │
                                              │ green / cyan / peach bands +          │
                                              │ daily-activity checklist + [Close]    │
                                              └──────────────────────────────────────┘

  ✕ close (x=320, y=20) exists on SA-1…SA-6 and SUM.
    → discard-confirmation dialog is NOT designed. See §6.
```

### 1.2 Happy path

1. User opens **Profile** from the drawer/app bar → lands on the **Journey** tab
   (`PRO-JRN`, `139:65149`). The tab bar shows *Profile* (inactive) | *Journey* (active).
2. The timeline renders every milestone the user has earned, newest last, each with a status
   circle, a title and a date.
3. User taps **"Fill in a form"** (outlined cyan pill) → **`FRM-PICK`** (`139:65245`),
   "Which form would you like to fill?".
4. User taps the **"Self-assessment form"** row → **`SA-1`** (`139:65464`), the intro screen,
   header "Self-assessment / step 1 of 6", body explaining the purpose, SmartStart attribution,
   and an enabled **"Start"** button.
5. **`SA-2`** (`139:65321`) — 6 statements, each with three radio options *Sometimes / Most of the
   time / All the time*. **Next is disabled until every question on the step is answered.**
6. **`SA-3`** (`139:65362`) — 4 statements. **`SA-4`** (`139:65393`) — 6 statements. Same rule.
7. **`SA-5`** (`139:65434`) — "Which activities do you do every day?", 8 multi-select
   **Select cards** ending in **"None"**. Next is disabled until at least one card is chosen.
8. **`SA-6`** (`139:65454`) — "Reflections", one long text input. The CTA is **"Save"**, not
   "Next".
9. Saving writes the assessment and appends **"Self-assessment form completed"** to the journey
   timeline with a green check and a pink **View** pill.
10. User taps **View** → **`SUM`** (`139:65530`), the SmartSpace summary: three tonal feedback
    bands (all the time / most of the time / sometimes), the daily-activity checklist, and a
    **"Close"** button that returns to the Journey tab.

### 1.3 Branch — coach nudge banner

- **`PRO-JRN-COACH`** (`139:65085`) is `PRO-JRN` with an extra 112dp `Informational` card at the
  top: "Need help? Contact your coach or ask for a visit." + a small **"See coach"** button.
- Everything below shifts down by **128dp** (112 card + 16 gap). Use `PRO-JRN` (`139:65149`) as
  the **default/steady state**; `PRO-JRN-COACH` is the nudge state.
- Trigger for the banner is not specified in the design — see §8.7.

### 1.4 Branch — no forms available

- If the picker has no forms, render **`FRM-PICK-EMPTY`** (`139:65266`): Page Title becomes
  **"No forms available yet"** and the list is replaced by the ECD Connect alien/UFO empty block
  with the line "There are no forms available on AppName".
- There is no CTA in this state (the `Actions` slot with a `small secondary leading icon` button
  is present but **hidden**).

### 1.5 Branch — step 5 selection states

`139:65434`, `139:65490` and `139:65510` are the **same screen** (`SA-5`, header "step 5 of 6") in
three selection states:

| State | Node | Cards | Next |
|---|---|---|---|
| Nothing selected | `139:65434` | all 8 resting | **disabled** |
| **"None" selected** | `139:65490` | "None" selected; the other 7 **dimmed/disabled** | enabled |
| **≥1 activity selected** | `139:65510` | selected cards get the cyan treatment; **"None" dimmed/disabled** | enabled |

"None" is **mutually exclusive** with the activity options in both directions.

### 1.6 Branch — abandoning a form

- Every self-assessment step and the summary carry a **✕ close** at (320, 20).
- The intended behaviour (discard vs. save-draft) and the confirmation dialog are **not designed**.
  See §6 and §10.

### 1.7 Branch — Profile tab

- Tapping the **Profile** tab should show `Frame 1481` (`139:65087` / `139:65151`): two
  `action item icon` rows (328×80, 8dp gap) and one `long action icon with badge` (328×80).
- This layer is **hidden in both frames** and no dedicated Profile-tab screen exists. **Do not
  build from guesswork** — see §10.

---

## 2. Screen inventory

| Code | Name | Figma node | Size (dp) | State / variant | Purpose |
|---|---|---|---|---|---|
| `PRO-JRN` | WO1.3.0 Profile | [`139:65149`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65149) | 360×640 | **default** (no banner) | Profile screen, Journey tab, steady state |
| `PRO-JRN-COACH` | WO1.3.0 Profile | [`139:65085`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65085) | 360×640 | coach nudge | Same + "Need help? Contact your coach" `Informational` card |
| `PRO-TAB` | Profile tab content | [`139:65087`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65087) *(hidden layer)* | 328×256 | **not designed** | Intended Profile-tab action list — hidden `Frame 1481` only |
| `FRM-PICK` | W15.0.0 Journey | [`139:65245`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65245) | 360×640 | populated | "Which form would you like to fill?" picker |
| `FRM-PICK-EMPTY` | W15.0.0 Journey | [`139:65266`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65266) | 360×640 | empty | "No forms available yet" |
| `SA-1` | N7.1.1 Practitioner self-assessment - step 1 | [`139:65464`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65464) | 360×640 | intro, CTA enabled | Purpose copy + SmartStart attribution + "Start" |
| `SA-2` | N7.1.2 … step 2 | [`139:65321`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65321) | 360×1818 | unanswered, Next disabled | 6 single-select statements |
| `SA-3` | N7.1.3 … step 3 | [`139:65362`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65362) | 360×1335 | unanswered, Next disabled | 4 single-select statements |
| `SA-4` | N7.1.3 … step 4 *(mis-prefixed — §10)* | [`139:65393`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65393) | 360×2000 | unanswered, Next disabled | 6 single-select statements (tallest frame) |
| `SA-5` | N7.1.5 … step 5 | [`139:65434`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65434) | 360×807 | nothing selected, Next disabled | 8 multi-select activity cards |
| `SA-5/none` | N7.1.5 … **"step 8"** *(state of SA-5 — §10)* | [`139:65490`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65490) | 360×807 | "None" selected, others dimmed, Next enabled | Exclusive-"None" state |
| `SA-5/multi` | N7.1.5 … **"step 9"** *(state of SA-5 — §10)* | [`139:65510`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65510) | 360×791 | 2 activities selected, "None" dimmed, Next enabled | Multi-select state |
| `SA-6` | N7.1.6 … step 6 | [`139:65454`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65454) | 360×640 | empty, **Save** disabled | "Reflections" long text input |
| `SUM` | 13.4.0 SmartSpace summary - Licence awarded | [`139:65530`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65530) | 360×2028 | completed | Read-only results breakdown + "Close" |
| `CMP-TABS` | Tabs - business | [`139:65091`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65091) | 360×56 | component ref | 2-tab bar, Journey active |
| `CMP-TL` | Antenatal visits (journey timeline) | [`139:65102`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65102) | 328×357 | component ref | Timeline with connectors + 3 step rows |
| — | comment "All possible journey items" | [`139:65212`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65212) | 360×410 | annotation | The 3 journey-step patterns |
| — | comment "Tap “Fill in a form”…" | [`139:65243`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65243) | 360×102 | annotation | Entry point |
| — | comment "Practitioner self-assessment" | [`139:65317`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65317) | 360×62 | annotation | Section label |
| — | comment "View a completed self-assessment" | [`139:65319`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65319) | 360×92 | annotation | Section label |
| — | Header (canvas banner) ×2 | `139:65083`, `139:65084` | 5205×300 | n/a | Canvas section banners, **not app screens** |
| — | Logo - Stacked (loose) | [`139:65639`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-65639) | 300×195 | artwork | SmartStart wordmark used in `SA-1` |

Unique app screens: **13**.

---

## 3. Screen specs (build recipes)

Global constants: frame `size.frameWidth` **360dp**, gutter `space.screenMargin` **16dp**,
content column `size.contentWidth` **328dp**, app bar `size.appBar` **64dp**, tab bar
`size.tabBar` **56dp**, footer/form bar `size.footerBar` **72dp**, button `size.buttonHeight`
**40dp** in a `size.touchTarget` **48dp** hit area.

---

### 3.1 `PRO-JRN` — Profile, Journey tab, default (`139:65149`)

| # | y / h | Component | Spec |
|---|---|---|---|
| 1 | 0 / 64 | **App bar — "Title with subtitle"** (`139:65150`) | Fill `role.appBar`. Back chevron 24dp (`size.iconLg`) in `role.onAppBar` at x=16. Centred title = the person's name, e.g. **"Bulelwa"** — `typescale.h4`, `role.onAppBar`. Subtitle slot present but **empty** on this instance; when used, `typescale.help` in `role.textLight`. |
| 2 | 64 / 56 | **Tabs — business** (`139:65155`) | §4. Two equal 180dp tabs: *Profile* (inactive) · **Journey** (active). |
| 3 | 136 / 40 | **`secondary with icon` — "Fill in a form"** (`139:65162`) | x=16, 328×40, `radius.xl` **20dp** pill, fill `role.surface`, **1dp** `role.action` border (Figma draws 1dp here, not the 2dp `size.focusRing` used elsewhere — §9), **no shadow**. Leading 20dp (`size.iconSm`) clipboard/document-list icon + 8dp gap + label **"Fill in a form"** — `typescale.button`, `role.action`. 16dp gap above (from the tab bar) and 16dp below. |
| 4 | 192 / 389 | **Journey timeline container** `Frame 424` (`139:65163`) | Holds `CMP-TL`. 16dp top pad. |

**Journey timeline (`CMP-TL`, `139:65102` / `139:65165`) — 328 wide, 357 tall**

```
 x=4                x=56                                              x=277
 ┌──┐
 │● │◄ 32dp status circle (radius.full)          Title            [ View ]
 │  │   glyph 20dp (size.iconSm) in role.onAction  typescale.h4 / role.textDark
 │┃ │◄ connector line, 2dp, x=19.5 (circle centre)  Date
 │● │                                                typescale.help / role.textMid
 │┃ │
 │● │
 └──┘
   step pitch 66dp  (42dp row + 24dp gap)   ·   circle→text gap 20dp
```

- **Connectors** (`Line 3` `139:65103`, `Line 6` `139:65104`): 2dp vertical rules at **x = 19.5**,
  drawn in `status.success.main` between *completed* steps. Length = pitch − circle diameter
  (84dp and 60dp in the source). Draw **no connector after the last step**.
- **Status circle**: 32dp, `radius.full`. Completed = fill `status.success.main` + 20dp white
  `Check` glyph in `role.onAction`. Course milestone = same 32dp circle with the
  `Icon/Solid/academic-cap` glyph. (A non-completed/pending treatment is not designed — §10.)
- **Text column** starts at x=56: title `typescale.h4` in `role.textDark` (wraps to 2 lines,
  22dp per line), date `typescale.help` in `role.textMid` (20dp line).
- **Trailing action column** right-aligned to the 328dp content edge (x=277, w=51):
  **`small secondary` pill** (`139:65148`), 51×32 (`size.buttonSmallHeight`), `radius.md` 10dp,
  fill `role.selectSubtle`, label **"View"** — `typescale.buttonSmall`, `role.textDark`.
  Vertically centred in the row (y offset 16 on a 64dp row).

**The three journey step patterns** (annotated in comment `139:65212`, verbatim in §9):

| Pattern | Circle | Title | Date | Trailing |
|---|---|---|---|---|
| **1 · Registered for the app** | green `Check` | "Registered for AppName" | "30 July 2024" | none |
| **2 · Moodle course completed** | `academic-cap` | "Course completed: {course title}" | "3 August 2024" | none |
| **3 · Self-assessment form completed** | green `Check` | "Self-assessment form completed" (wraps 2 lines → 44dp) | "10 November 2024" | **View** pill → `SUM` |

**Hidden layers on this frame — do not build:** `Frame 1481` `139:65151` (the Profile-tab action
list, §10), `Bottom border` `139:65159`, `with link` `139:65160` (328×148 card), `Celebratory`
`139:65164` (328×132, shown when a milestone is *newly* achieved — behaviour unspecified), and two
richer step rows `139:65185` / `139:65195` demonstrating a checkbox caption and a
`small primary trailing icon` button (94×32).

---

### 3.2 `PRO-JRN-COACH` — Journey tab with coach banner (`139:65085`)

Identical to §3.1 plus one card, with everything below shifted **+128dp**:

| # | y / h | Component | Spec |
|---|---|---|---|
| 3a | 136 / 112 | **`Informational` card** (`139:65098`) | x=16, w=328, fill `status.info.bg`, `radius.md` **10dp** (Figma draws 8 — §9), 16dp inner padding. 20dp (`size.iconSm`) filled info-circle in `status.info.main` at top-left. Body **"Need help? Contact your coach or ask for a visit."** — `typescale.helpStrong`, `status.info.dark`, 2 lines, x=48 (icon + 12dp gap). At the card's lower-left a **small primary button** ~104×32 (`size.buttonSmallHeight`), `radius.md`, fill `role.action`, leading 16dp (`size.iconXs`) person icon + label **"See coach"** — `typescale.buttonSmall`, `role.onAction`. |
| 3b | 264 / 40 | "Fill in a form" | as §3.1 row 3, 16dp below the card. |
| 4 | 320 / 389 | timeline | as §3.1 row 4. |

The content frame `Frame 1484` (`139:65097`) is **605dp tall inside a 640dp viewport** and
overflows by 85dp — the body must scroll.

---

### 3.3 `FRM-PICK` — form picker (`139:65245`)

| # | y / h | Component | Spec |
|---|---|---|---|
| 1 | 0 / 64 | **App bar — Title with subtitle** (`139:65247`) | Fill `role.appBar`, back chevron 24dp `role.onAppBar` x=16, centred title **"Fill in a form"** — `typescale.h3`, `role.onAppBar`. |
| 2 | 64 / 0 | `Action with icons` (`139:65248`) | **Collapsed to 0dp** with five 0dp `full width` children. Dead slot — do not build (§10). |
| 3 | 80 / 33 | **Page Title** (`139:65255`) | **"Which form would you like to fill?"** — `typescale.h2`, `role.textDark`, x=16, w=328. 16dp above. |
| 4 | 139 / 100 | **Children list → `action item no icon`** (`139:65256` → `139:65257`) | 328×100, fill `role.background`, `radius.md` (Figma 12 — §9). 26dp gap above. |

**`action item no icon` recipe**

```
┌ 328 × 100 · radius.md · fill role.background ──────────────────────────┐
│  16dp                                                                   │
│  Self-assessment form                    typescale.h4 / role.textDark   │
│  Self-assessment created by              typescale.help / role.textMid  │
│  SmartStart                              (2 lines, w=256)               │
│                                                          ›  x=288 y=38  │
└─────────────────────────────────────────────────────────────────────────┘
```

- The 48dp `Icon Circle` slot (`139:65258`, holding `Initials circle sm`) is **hidden**, so the
  text block starts at the 16dp gutter instead of x=80. Keep the slot in the component but render
  it only when the form carries an avatar/icon.
- Trailing 24dp chevron-right (`size.iconLg`) in `role.textDark`, vertically centred.
- Whole row is one touch target → `SA-1`.
- **Hidden:** `Simple striped/Mobile` `139:65254` (the empty block) — hidden because a form exists.

---

### 3.4 `FRM-PICK-EMPTY` — no forms (`139:65266`)

| # | y / h | Component | Spec |
|---|---|---|---|
| 1 | 0 / 64 | App bar — **"Fill in a form"** | as §3.3. |
| 2 | 64 / 0 | `Action with icons` (`139:65269`) | collapsed, ignore. |
| 3 | 80 / 33 | **Page Title** (`139:65276`) | **"No forms available yet"** — `typescale.h2`, `role.textDark`. |
| 4 | 153 / 304 | **`Simple/Mobile` empty block** (`139:65277`) | Contents below. |

- **Illustration** `ECD_Connect_alien` (`139:65278`): **108×108** at x=126 — horizontally centred.
  Navy (`role.appBar`) filled disc containing the ECD Connect mascot (green alien in a
  magenta/cyan saucer). 48dp of space above it inside the block.
- 16dp gap, then **`Text`** (`139:65312`): **"There are no forms available on AppName"** —
  `typescale.h4`, `role.textDark`, **centred**, x=36, w=288, 2 lines.
- **Hidden slots — do not build:** secondary caption `139:65313`, `with text` `139:65314`, and
  `Actions` `139:65315` containing a `small secondary leading icon` button (194×32). If product
  later wants a CTA here, that is the reserved slot.

---

### 3.5 `SA-1` — self-assessment step 1, intro (`139:65464`)

| # | y / h | Component | Spec |
|---|---|---|---|
| 1 | 0 / 64 | **App bar — Title with subtitle** (`139:65470`) | Fill `role.appBar`, back chevron 24dp `role.onAppBar` x=16. Two centred lines: **"Self-assessment"** — `typescale.h4`, `role.onAppBar`; **"step 1 of 6"** — `typescale.caption`, `role.textLight`. |
| 2 | 20 / 24 | **✕ close** (`139:65465`, duplicated as `139:65473`) | 24dp (`size.iconLg`) in `role.onAppBar` at x=320. **Two identical layers are stacked — build one** (§10). |
| 3 | 79 / 58 | **Page Title** (`139:65469`) | **"About the self assessment form"** — `typescale.h2`, `role.textDark` — with a secondary line **"3 February 2024"** — `typescale.help`, `role.textMid`. x=16, w=328. |
| 4 | 147 / 1 | **Dashed rule** `list` (`139:65472`) | x=16, w=328, 1dp `role.line`, dashed. |
| 5 | 170 / 96 | **Body copy** (`139:65471`) | x=16, w=328, `typescale.body`, `role.textMid`: "This form will help you think about which parts of your programme you are doing well and if there are any areas that need to get better." |
| 6 | 310 / 52 | **Attribution row** `Content` (`139:65474`) | Left: **"This content is powered by:"** at x=27.5, w=209 — `typescale.help`, `role.textMid`. Right: **`Logo - Stacked`** (`139:65478`) at x=252.5, 80×52 — the SmartStart wordmark in `palette` **SmartStart sub-palette** (`SS Primary Purple`; see §9 — this is co-branding artwork, not a themeable role). Hidden inside: `Level p` `139:65476`, `Level 1` `139:65477` — unused level badges, do not build. |
| 7 | 568 / 72 | **`Form Layout` bottom bar** (`139:65466`) | Sticky. `standard` divider `139:65467` (328×0 — collapsed, so **no visible rule** on this screen) + **`primary with icon`** (`139:65468`) at (16, 16), 328×40, `radius.xl` 20dp, fill `role.action`, `elevation.button`. Leading 20dp arrow-in-circle icon + **"Start"** — `typescale.button`, `role.onAction`. **Enabled.** |

---

### 3.6 `SA-2` / `SA-3` / `SA-4` — radio question steps (`139:65321`, `139:65362`, `139:65393`)

One template, three instances. The only differences are the step counter, the number of question
blocks and therefore the frame height.

| # | y / h | Component | Spec |
|---|---|---|---|
| 1 | 0 / 64 | **App bar — Title with subtitle** | **"Self-assessment"** / **"step N of 6"**. Tokens as §3.5 row 1. |
| 2 | 20 / 24 | **✕ close** | `139:65361` / `139:65392` / `139:65433`, x=320, 24dp `role.onAppBar`. |
| 3 | 79 / 36 | **Page Title** | **"Self-assessment"** — `typescale.h2`, `role.textDark`. |
| 4 | 131 / — | **`Frame 418` scroll body** | Contents below. All rows x=16, w=328. |
| 4a | +0 / 72 | **`Informational 2` banner** | Fill `status.info.bg`, `radius.md`, 16dp padding, 20dp info-circle in `status.info.main`, text **"Read each statement and think carefully about your programme."** — `typescale.helpStrong`, `status.info.dark`. |
| 4b | +88 / 1 | **Dashed rule** `list` | 1dp `role.line`, dashed. |
| 4c | +105 … | **Question blocks** | See recipe below. |
| 5 | bottom / 72 | **`Form Layout` bottom bar** | Sticky. **`primary disabled with icon`** 328×40, `radius.xl`, fill `role.actionDisabled`, label **"Next"** in `role.onAction` (white — see the a11y note in `foundations/colour.md`), leading 20dp arrow-circle icon, **no shadow**. Becomes `primary with icon` (fill `role.action`, `elevation.button`) once the step is complete. |

**Question block recipe**

```
Label ……………………………………………………………………………  typescale.h4 / role.textDark, x=16 w=328
        ↕ 16dp
┌ Radio Group default · 328 × 54 ──────────────────────┐
│  ○  Sometimes                                        │   fill role.actionSubtle
├──────────────── 4dp (space.listGap) ─────────────────┤   radius.md
│  ○  Most of the time                                 │   radio 24dp, 2dp role.action ring
├──────────────────────────────────────────────────────┤   label typescale.body / role.textMid
│  ○  All the time                                     │
└──────────────────────────────────────────────────────┘
        ↕ 16dp  → next Label
   pitch 58dp per option · block height 170dp
   block total pitch = labelHeight + 16 + 170 + 16
```

- **Exactly three options per question**, always the same wording and order:
  **Sometimes · Most of the time · All the time**. This ordering is load-bearing for scoring
  (§8.4) — the *worst* answer is first.
- Resting option: fill `role.actionSubtle`, empty radio (24dp circle, 2dp `role.action` ring),
  label `typescale.body` in `role.textMid`.
- **Selected** option (not drawn on Page 20 — infer from the DS): fill `role.actionSubtle` with a
  2dp `role.action` border, radio ring `role.action` + 12dp `role.action` dot, label
  `role.textDark`. **Flag for designer confirmation.**
- Row height 54dp; wrap in a 48dp+ touch target (already satisfied).
- Single-select per question, no "clear" affordance.

**Instance data**

| Screen | Node | Height | Questions | Question text (labels) |
|---|---|---|---|---|
| `SA-2` | `139:65321` | 1818 | **6** | 1 "I make sure children are supervised:" · 2 "I make a fun & interesting space, with things on the wall:" · 3 "I unpack toys, books and materials and put them where children can reach them:" · 4 "I set up different interest areas with area labels (art, pretend, building, toys and games, story):" · 5 "I put up a daily routine that children can see:" · 6 "I make sure children always have the chance to plan their activities before free play, and to talk about it afterwards:" |
| `SA-3` | `139:65362` | 1335 | **4** | 1 "I speak and act warmly and respectfully to children. I give individual attention to different children and encourage them:" · 2 "I make sure that children who are upset are comforted:" · 3 "I use calm methods to keep order, and do not use harsh words or physical methods:" · 4 "I involve children in solving conflicts and listen carefully to their feelings, views and suggestions:" |
| `SA-4` | `139:65393` | 2000 | **6** | 1 "I talk with children throughout the programme. I encourage children to talk about what they are doing and thinking, and I listen carefully to their ideas:" · 2 "I help to improve children's language by telling them new words and explaining what they mean:" · 3 "I let children make their own choices about what to play and I allow them to play and learn at their own level:" · 4 "I give children appropriate toys and materials to play with and support them to use them when needed:" · 5 "I join in children's play and give support when needed. I get onto their level and share information and ask questions during play, to help children think and learn:" · 6 "I make storytimes that are fun and full of conversation. I use questions and comments to encourage children to think:" |

The three steps map to three curriculum themes: **environment & routine** (SA-2), **warm &
respectful relationships** (SA-3), **language, play & learning support** (SA-4).

---

### 3.7 `SA-5` — activity multi-select (`139:65434`, states `139:65490` / `139:65510`)

| # | y / h | Component | Spec |
|---|---|---|---|
| 1 | 0 / 64 | **App bar** | **"Self-assessment"** / **"step 5 of 6"** — *including on `139:65490` and `139:65510`* (§10). |
| 2 | 20 / 24 | **✕ close** | `139:65450`, x=320. |
| 3 | 79 / 36 | **Page Title** | **"Self-assessment"** — `typescale.h2`, `role.textDark`. |
| 4 | 131 / 725 | **`Frame 418`** | Dashed `list` rule at +0; then the label and the card stack. |
| 4a | +17 / 22 | **Label** (`139:65439`) | **"Which activities do you do every day?"** — `typescale.h4`, `role.textDark`, x=16, w=328. |
| 4b | +55 / 524 | **Card stack** `Frame 328` (`139:65441`) | 8 × **Select card**, 328 wide, `space.listGap` **4dp** gaps. |
| 5 | 735 / 72 | **`Form Layout`** | `primary disabled with icon` **"Next"** → becomes enabled `primary with icon` as soon as ≥1 card is selected. |

**Select card geometry & states**

```
┌ 328 × 56 (80 when the label wraps to 2 lines; 54 when SELECTED — the selected ─┐
│           variant draws its 2dp border inside the bounds)                       │
│   ☐ 24dp      Greeting time                                                     │
│   x≈24        x≈60, typescale.body                                              │
└─────────────────────────────────────────────────────────────────────────────────┘
```

| State | Fill | Border | Checkbox | Label |
|---|---|---|---|---|
| **Resting** | `role.background` | none | 24dp square, `radius.alertButton` 4dp, 2dp `role.textLight`, empty | `typescale.body`, `role.textDark` |
| **Selected** | `role.actionSubtle` | 2dp `role.action` (`size.focusRing`), inset | filled `role.action`, white tick `role.onAction` | `typescale.body`, `role.textDark` |
| **Dimmed / disabled** | `role.surface` (near-white) | none | pale, empty | `typescale.body`, `role.textLight` |

Card radius `radius.md` **10dp**. Whole card is the touch target.

**Option list (order is fixed):**

| # | Node (`SA-5`) | Height | Label |
|---|---|---|---|
| 1 | `139:65442` | 56 | Greeting time |
| 2 | `139:65443` | 56 | Morning ring or message board |
| 3 | `139:65444` | **80** | Teacher-directed small group activity *(2 lines)* |
| 4 | `139:65445` | 56 | Free play time |
| 5 | `139:65446` | **80** | Large group time (songs, big group activities) *(2 lines)* |
| 6 | `139:65447` | 56 | Story time |
| 7 | `139:65448` | 56 | Outside time |
| 8 | `139:65449` | 56 | **None** |

**Selection logic (the "None" rule)**

- Multi-select across options 1–7.
- Selecting **"None"** (`139:65505` in state `139:65490`) **deselects and dims all others**; the
  seven activity cards render in the dimmed/disabled treatment and are not tappable.
- Selecting **any activity** (`139:65518`, `139:65519` in state `139:65510`) **deselects and dims
  "None"**.
- Tapping a dimmed card must **release the exclusivity** (i.e. tapping "None" while activities are
  chosen clears them and selects "None") — *the design does not draw this transition; confirm
  with the designer* (§10).
- **Next enables when ≥1 card is selected**, including when the only selection is "None".

---

### 3.8 `SA-6` — Reflections (`139:65454`)

| # | y / h | Component | Spec |
|---|---|---|---|
| 1 | 0 / 64 | **App bar** | **"Self-assessment"** / **"step 6 of 6"**. |
| 2 | 20 / 24 | **✕ close** (`139:65463`) | x=320. |
| 3 | 79 / 36 | **Page Title** (`139:65456`) | **"Reflections"** — `typescale.h2`, `role.textDark`. |
| 4 | 131 / 1 | **Dashed rule** (`139:65458`) | x=16, w=328, 1dp `role.line`. |
| 5 | 148 / 168 | **`long text input`** (`139:65459`) | x=16, w=328. Label **"What are some of the things you would like to do differently or get better at?"** — `typescale.h4`, `role.textDark`, 2 lines. `space.fieldGap` 4dp, then the textarea: fill `role.background`, `radius.sm` **6dp** (Figma draws 8 — §9), 16dp inner padding, min height per `size.textareaHeight` **120dp**, placeholder **"e.g. always include recall time in my daily routine"** — `typescale.body`, `role.textLight`. Focused state: fill `role.surface` + 2dp `role.select` border (per `components.md` §3). |
| 6 | 568 / 72 | **`Form Layout`** (`139:65460`) | **`primary disabled with icon`** (`139:65462`), 328×40, fill `role.actionDisabled`, leading 20dp save/floppy icon, label **"Save"** — `typescale.button`, `role.onAction`. **The final step's CTA is "Save", not "Next".** |

**Enablement:** drawn disabled with an empty field. Whether the reflection is *mandatory* is not
stated — see §8.5 and §10.

---

### 3.9 `SUM` — 13.4.0 SmartSpace summary (`139:65530`)

Read-only. 360×2028, single scroll, sticky bottom bar. All rows x=16, w=328. Sections are
separated by **dashed `list` rules** (1dp `role.line`) at the section boundaries
(`139:65535`, `139:65540`, `139:65553`, `139:65572`, `139:65603`, `139:65634`).

| # | y / h | Element | Spec |
|---|---|---|---|
| 1 | 0 / 64 | **App bar** (`139:65531`) | **"Self-assessment"** only — **no step counter**. `typescale.h4`, `role.onAppBar` on `role.appBar`. |
| 2 | 20 / 24 | **✕ close** (`139:65635`) | x=320, 24dp `role.onAppBar`. |
| 3 | 79 / 58 | **Page Title** (`139:65533`) | **"Self-assessment form"** — `typescale.h2`, `role.textDark` — with secondary line = the practitioner's full name, e.g. **"Bulelwa Mahlangu"** — `typescale.help`, `role.textMid`. |
| 4 | +17 / 86 | **Section A — free-text answer** (`139:65536`) | Label **"Things you would like to do differently or get better at:"** — `typescale.h4`, `role.textDark`, 328×46. Then the recorded answer at +62, 328×24 — `typescale.body`, `role.textMid`. |
| 5 | +136 / 106 | **Section B — "all the time" band** | See band recipe. Tone **green**. |
| 6 | +379 / 128 | **Section C — "most of the time" band** | Tone **cyan**. |
| 7 | +892 / 102 | **Section D — "sometimes" band** | Tone **peach / alert**. |
| 8 | +1379 / 352 | **Section E — daily-activity checklist** | See below. |
| 9 | 1956 / 72 | **`Form Layout`** (`139:65636`) | **`primary with icon`** (`139:65638`) 328×40, `radius.xl`, fill `role.action`, `elevation.button`, leading 20dp ✕ icon, label **"Close"** — `typescale.button`, `role.onAction`. **Enabled.** Returns to the Journey tab. |

**Band recipe** (`Celebratory` card + bulleted results)

```
┌ Celebratory card · 328 × 102–128 · radius.md · fill = <band>.bg ─────────┐
│  16dp                                                                     │
│   ☺ 48dp emoji        Headline (bold, <band>.dark)     typescale.h4       │
│   x=16                Encouragement line               typescale.help      │
│                       x=64, w=225–232                  <band>.dark         │
└───────────────────────────────────────────────────────────────────────────┘
    ↓ then one bullet row per matching statement:
    ◉20dp  Statement text …………………………………  x=28, w=300
    icon (size.iconSm)                       typescale.help / role.textMid
```

| Band | Card node | Fill | Headline / sub | Emoji | Bullet icon |
|---|---|---|---|---|---|
| **All the time** (B) | `139:65541` | `status.success.bg` | **"You do these things all the time."** / "Great job!" — `status.success.dark` | `ECD_Connect_emoji3` 48dp, green | `Icon/Solid/check-circle` in `status.success.main` |
| **Most of the time** (C) | `139:65554` | `role.actionSubtle` | **"You do these things most of the time."** / "Keep it up! Aim for all the time!" — `role.action` | `ECD_Connect_emoji1` 48dp, cyan | `Icon/Solid/arrow-circle-right` in `role.action` |
| **Sometimes** (D) | `139:65573` | `status.alert.bg` | **"You do these things sometimes."** / "Try to do these more often!" — `status.alert.dark` | `Group 1457` 48dp orange face *(a raw group, not an instance — §10)* | `Icon/Solid/exclamation-circle` in `status.alert.main` |

Bullet rows in the source: band B → `139:65547`, `139:65550`; band C → `139:65560`, `139:65563`,
`139:65566`, `139:65569`; band D → `139:65591`, `139:65594`, `139:65597`, `139:65600`. Row height
is content-driven (24 / 48 / 72 / 96dp = 1–4 lines at 24dp per line), 16dp between rows.

**Section E — daily-activity checklist** (`Frame 1477`, `139:65604`)

- Positive heading (`139:65606`), 328×40 — **"You do these activities every day - great! Keep it
  up!"** — `typescale.h4`, `role.textDark`.
- Rows on a **40dp pitch**: 24dp (`size.iconLg`) `Check circle` in `status.success.main` at x=0,
  label at x=32, w=296 — `typescale.help`, `role.textMid`. Source rows: Greeting time
  (`139:65607`), Teacher-directed small group activity (`139:65611`), Free play time
  (`139:65615`), Large group time (songs, big group activities) (`139:65619`, 2 lines → 40dp),
  Outside time (`139:65623`), Story time (`139:65626`).
- Negative heading (`139:65629`), 328×40 — **"You don't do these activities every day - try to
  include them more!"** — `typescale.h4`, `role.textDark`.
- Negative rows: 24dp **`X circle`** in `status.error.main` + label. Source row: Morning ring or
  message board (`139:65630` / `139:65631`).
- Either heading + its list must be **omitted entirely** when its set is empty (not rendered with
  a "none" placeholder) — the design shows no empty treatment.

---

## 4. Tabs pattern

Only **`Tabs - business`** appears on Page 20 (`139:65091` on `PRO-JRN-COACH`, `139:65155` on
`PRO-JRN`). **No `Tabs - principal` variant exists on this page** — see §10.

```
Tabs - business                 360 × 56   (size.tabBar)
└─ Tabs                         360 × 56
   ├─ Tab (inactive) "Profile"  180 × 54  @ x=0,   y=1
   └─ Tab (active)   "Journey"  180 × 56  @ x=180, y=0
└─ Bottom border                360 × 1   @ y=56   HIDDEN on both instances
```

- Exactly **2 tabs, each 180dp** — the bar always fills the 360dp viewport, equal width, **no
  scrolling** (contrast with the Resources hub's scrolling `Tabs - principal`).
- Bar fill `role.background`.
- **Inactive** label `typescale.h4` in `role.textDark`. *(Note: `components.md` §5 specifies
  `textMid` for inactive tabs; the Page 20 instances render navy. Reconcile — §9.)*
- **Active** label `typescale.h4` in `role.action`, with a **2dp `role.action` underline** across
  the full 180dp, painted on the tab's bottom edge.
- The inactive tab is inset 1dp top and bottom (y=1, h=54) so its hairline sits above the bar
  baseline; the active tab occupies the full 56dp and overlaps where the divider would be.
- The 1dp `role.line` `Bottom border` is **hidden** on both instances on this page; enable it when
  the tab bar sits directly on a white surface.
- Both frames show **Journey** active. Tab state must be preserved across navigation to the form
  picker and back.

---

## 5. Component reference notes

| Component | Node | Notes for the library |
|---|---|---|
| `Antenatal visits` (journey timeline) | `139:65102` | **Mis-named** — it is the generic journey/timeline component, named for the antenatal use-case. Rename to `Journey timeline` in the library. |
| `Radio Group default` | inside `139:65328` etc. | 328×54, 4dp gaps, 58dp pitch, 170dp per 3-option block. |
| `Select card` / `Select card default` | `139:65442`–`139:65449`, `139:65525` | Two variant names in use for what renders as the same card — §10. |
| `Informational` / `Informational 2` | `139:65098`, `139:65325` | Same banner, two component names. `Informational` carries an embedded button, `Informational 2` does not. |
| `Celebratory` | `139:65541`, `139:65554`, `139:65573`, hidden `139:65101` | One component, three tonal treatments (success / action / alert). |
| `Form Layout` | `139:65466`, `139:65358`, … | 360×72 sticky bar: collapsed divider + 328×40 button at 16dp inset. |
| `Logo - Stacked` | `139:65478`, loose `139:65639` | SmartStart co-branding artwork. **Not themeable** — it is a third party's mark. |

---

## 6. Dialogs & popups

**There are no modal dialogs, bottom sheets, snackbars or popovers designed on Page 20.** Every
frame is a full screen or a canvas comment. The nearest overlay-like affordances are all *inline*:

| Node | Type | Status | Notes |
|---|---|---|---|
| `139:65101` / `139:65164` | `Celebratory` card 328×132 | **hidden** | Inline celebration at the top of the journey list, shown when a milestone is newly achieved. Not a modal. Its visible siblings on `SUM` (`139:65541`, `139:65554`, `139:65573`) show the three tonal treatments. |
| `139:65096` / `139:65160` | `with link` card 328×148 | **hidden** | Inline card with a link — an alternate journey body. |
| `139:65098` / `139:65325` / `139:65366` / `139:65397` | `Informational` / `Informational 2` | visible | Inline, non-dismissible banners. |
| `139:65465`, `139:65361`, `139:65392`, `139:65433`, `139:65450`, `139:65463`, `139:65635` | `Icon right` ✕ at (320, 20) | visible | The exit affordance on every self-assessment screen and on the summary. |

### 6.1 Gap — the missing discard confirmation ⚠

Every self-assessment step (`SA-1` … `SA-6`) carries a **✕ close** in the app bar, and the
questionnaire is a multi-step form that can hold up to **16 answered questions, 8 activity
selections and a free-text reflection**. **No "Discard your answers?" confirmation dialog is
designed anywhere on Page 20.** As it stands, a mis-tap at (320, 20) silently destroys the whole
session.

**Raise this with the designer.** Until it is designed, do **not** ship a bare ✕. The interim
specification (built from the DS dialog component, `components.md` §8) is:

```
┌ 328 · role.surface · radius.xl (20) · elevation.dialog · on role.scrim ──┐
│           ◍ 48dp exclamation-circle, status.alert.main                    │
│           Discard your answers?              typescale.h3 / role.textDark │
│           Your answers on this form will     typescale.body / role.textMid│
│           not be saved.                                                    │
│    ┌ 296 × 40 · role.action ──────────────────┐  "Yes, discard"           │
│    ├ space.buttonGap 16dp ────────────────────┤                            │
│    └ 296 × 40 · role.surface + 1dp role.action┘  "No, keep filling it in"  │
└───────────────────────────────────────────────────────────────────────────┘
```

Trigger: ✕ tap **or** system Back on `SA-2`…`SA-6` **when at least one answer has been entered**.
On `SA-1` (nothing entered) close immediately with no dialog. The alternative product decision —
auto-saving a draft and closing silently — is equally unspecified; see §8.5.

Other overlays not designed: the **language/locale** control (absent here), any **submission
error** state, and any **offline** state for `Save`.

---

## 7. States & edge cases

| # | State | Where | Rendering |
|---|---|---|---|
| 1 | **Journey — steady state** | `PRO-JRN` `139:65149` | Tabs + "Fill in a form" + timeline. **Default.** |
| 2 | **Journey — coach nudge** | `PRO-JRN-COACH` `139:65085` | Adds the 112dp `Informational` "Need help? Contact your coach" card; everything below shifts +128dp; body scrolls (605dp content in a 640dp frame). |
| 3 | **Journey — newly achieved milestone** | hidden `Celebratory` `139:65101`/`139:65164` | A 328×132 celebration card at the top of `Frame 424`. **Trigger and dismissal are unspecified** — flag. |
| 4 | **Journey — empty** | — | **Not designed.** Every user has at least "Registered for AppName", so a truly empty timeline should be impossible; if it happens, show the registration step only. |
| 5 | **Journey step — completed** | timeline | Green `status.success.main` circle + white check (or `academic-cap` for courses), green connector above. |
| 6 | **Journey step — pending / in progress** | — | **Not designed.** No grey/outline circle variant exists. Use `role.line` circle + `role.textLight` glyph and a `role.line` connector, pending designer confirmation. |
| 7 | **Journey step — has a result to view** | timeline | Trailing 51×32 `small secondary` **View** pill in `role.selectSubtle` → `SUM`. Only the self-assessment step carries it in the source. |
| 8 | **Form picker — populated** | `FRM-PICK` `139:65245` | One `action item no icon` row per available form. |
| 9 | **Form picker — empty** | `FRM-PICK-EMPTY` `139:65266` | "No forms available yet" + alien/UFO block + "There are no forms available on AppName". No CTA. |
| 10 | **Self-assessment — step incomplete** | `SA-2`…`SA-5` | Bottom CTA is `primary disabled with icon`: fill `role.actionDisabled`, white label, no shadow, not tappable. |
| 11 | **Self-assessment — step complete** | `SA-2`…`SA-5` | CTA becomes `primary with icon`: fill `role.action`, `elevation.button`. |
| 12 | **Step 5 — nothing chosen** | `139:65434` | All 8 cards resting, Next disabled. |
| 13 | **Step 5 — "None" chosen** | `139:65490` | "None" selected (cyan border + filled tick, 54dp because the border is drawn inside); other 7 **dimmed**; Next enabled. |
| 14 | **Step 5 — activities chosen** | `139:65510` | Chosen cards 54dp with cyan border and filled tick; **"None" dimmed**; Next enabled. |
| 15 | **Step 6 — empty reflection** | `139:65454` | **Save disabled**. Whether the field is truly mandatory is unconfirmed (§8.5). |
| 16 | **In-progress vs complete assessment** | journey + picker | An **in-progress** assessment has no timeline entry and no summary; a **complete** one adds "Self-assessment form completed" + date + **View**. There is **no "Continue where you left off" affordance designed** — the picker shows the same row either way. Flag. |
| 17 | **Summary — a band is empty** | `SUM` | Omit the whole band (card + bullets) and its dashed rule. No empty treatment is designed. |
| 18 | **Summary — checklist halves** | `SUM` §E | Omit the positive or negative heading + list when its set is empty. |
| 19 | **Summary — licence outcome** | `SUM` | The frame is named "Licence awarded" but **no licence badge or status chrome is drawn** (§10). Render the feedback breakdown only. |
| 20 | **Abandoning a form** | `SA-*` | ✕ with **no confirmation designed** (§6.1). |
| 21 | **Offline** | all | Per `patterns/offline-first.md`: allow the whole assessment offline, persist a local draft after every step, queue the final `Save`, and show the timeline from cache. Never block. |
| 22 | **Save fails** | `SA-6` | Not designed. Keep the draft, re-enable Save, show a snackbar; do not navigate. |
| 23 | **Profile tab selected** | `PRO-TAB` | **Not designed** — hidden layer only (§10). Do not ship the Profile tab until it is designed, or ship the tab bar with Journey only. |

---

## 8. Business rules for back-end devs

### 8.1 Profile screen

- The app bar title is the **subject's given name** (`Bulelwa`); the summary screen uses the
  **full name** (`Bulelwa Mahlangu`). Return both (`given_name`, `full_name`).
- The screen is generic: the same component serves a **practitioner**, and (per the page overview)
  potentially a **child** or **parent** profile. Scope the payload by `subject_type` +
  `subject_id`, not by "the logged-in user".
- The **Profile** tab's data contract is undefined because the tab is not designed — the hidden
  layer implies three action rows (two `action item icon`, one `long action icon with badge`),
  i.e. roughly *personal details*, *settings/account*, and one badge-bearing item. **Do not
  design the API around this guess.**

### 8.2 Journey timeline

Each journey entry:

| Field | Type | Notes |
|---|---|---|
| `id` | uuid | |
| `subject_id` | uuid | Whose journey this is. |
| `kind` | enum | `registration` \| `course_completed` \| `self_assessment_completed` — the three patterns in comment `139:65212`. Extensible; unknown kinds must render with the default check circle. |
| `title` | string | Rendered verbatim, e.g. "Registered for AppName", "Course completed: {course}". `AppName` is a **tenant token** — substitute the tenant's app name. |
| `occurred_at` | date | Rendered as "30 July 2024" (day month year, no ordinal). |
| `status` | enum | `complete` (green check) — the only status designed. |
| `icon_key` | string | `check` \| `academic-cap` \| … |
| `action` | object? | `{ label: "View", target_type: "self_assessment_summary", target_id }` — drives the pink `View` pill. Only present when there is something to view. |

Ordering is **chronological ascending** (registration first). Connectors are drawn *between*
consecutive entries; the client draws none after the last.

`course_completed` entries originate from **Moodle** (verbatim: "Moodle course completed") — the
backend must ingest completion events from the LMS and project them onto the journey.

### 8.3 Form picker

- `GET /subjects/{id}/forms` → `items[] { form_id, title, subtitle, icon?, status }`.
  - `title` = "Self-assessment form"; `subtitle` = "Self-assessment created by SmartStart"
    (**attribution is data, not a hard-coded string** — a tenant may have other form authors).
  - Empty array ⇒ `FRM-PICK-EMPTY`.
- `status` should distinguish `available` / `in_progress` / `completed` so a future "Continue"
  affordance can be added — **the current design does not render it** (§7 row 16).
- The `Icon Circle` slot is hidden but present: if a form supplies an icon/initials, render it and
  shift the text block to x=80.

### 8.4 Self-assessment definition, answers and scoring

**Definition** (versioned, server-driven — do **not** hard-code the questions in the client):

```
assessment_form
  id, version, title "Self-assessment", author "SmartStart", steps[]
steps[]
  index (1..6), kind: intro | radio_group | multi_select | free_text,
  page_title, banner_text?, questions[]
questions[]
  id, prompt, options[]  (radio: 3 fixed options; multi_select: 8 cards)
options[]
  id, label, value, score, exclusive (bool)
```

- The **radio scale is fixed at three points** and must be scored ordinally:
  `sometimes = 1`, `most_of_the_time = 2`, `all_the_time = 3`. The rendering order in the UI is
  worst → best; do not reorder.
- Step 5's **"None"** option carries `exclusive = true`; the client enforces mutual exclusion, the
  server must validate it (reject a submission containing `none` plus any activity).
- **Version the form.** A summary must be rendered against the version the practitioner answered,
  not the current one.

**Submission**

```
POST /self-assessments            { form_id, form_version, subject_id }      → draft id
PATCH /self-assessments/{id}      { step_index, answers[] }                  → per-step autosave
POST /self-assessments/{id}/submit{ }                                        → completes, emits journey entry
GET  /self-assessments/{id}                                                  → summary projection
```

- Per-step `PATCH` is what makes offline drafting and "step N of 6" resumable.
- `submit` is the event that **creates the `self_assessment_completed` journey entry** with
  `occurred_at = now` and an `action` pointing at the summary.
- Submissions are **immutable** once submitted; a re-assessment creates a new record and a new
  journey entry.

**Summary projection** (`SUM`) — the server groups the 16 radio answers by their chosen value:

| Band | Answers with value | UI |
|---|---|---|
| A — free text | step 6 reflection | Section A, verbatim |
| B — "all the time" | `all_the_time` | green `Celebratory` + check-circle bullets |
| C — "most of the time" | `most_of_the_time` | cyan `Celebratory` + arrow-circle-right bullets |
| D — "sometimes" | `sometimes` | peach `Celebratory` + exclamation-circle bullets |
| E — activities | step 5 selections | chosen → green check rows; **unchosen → red X rows** |

- Bullet text is the **statement without its trailing colon and rendered as a sentence**
  ("I make sure children are supervised." vs. the form's "I make sure children are supervised:").
  Return both `prompt` and `statement` so the client never has to transform strings.
- Section E's negative list is the **complement** of the selected activities against the full
  8-item list, **excluding "None"**.
- A band with zero members is omitted entirely (client), so the server may simply return empty
  arrays.
- No numeric total, percentage or pass/fail is displayed anywhere. **Do not surface a score in the
  mobile UI** — if the platform computes one, keep it server-side (see the licence note below).

**Licence** — the frame is named "13.4.0 SmartSpace summary - Licence awarded" but **no licence
chrome is drawn**. Do not build a licence badge from the frame name; get the licence rules and UI
from the designer before implementing. If a licence decision is computed from the assessment,
expose it as a separate field (`licence_status`) that the client currently ignores.

### 8.5 Step gating (client rules the API must support)

| Step | Gate on the bottom CTA | CTA label |
|---|---|---|
| `SA-1` intro | none — always enabled | **Start** |
| `SA-2` | **all 6** questions answered | Next |
| `SA-3` | **all 4** questions answered | Next |
| `SA-4` | **all 6** questions answered | Next |
| `SA-5` | **≥ 1** card selected (including "None") | Next |
| `SA-6` | drawn disabled with an empty field ⇒ **reflection appears mandatory** | **Save** |

- The header **"step N of 6"** is the authoritative progress indicator; there is no back-step
  affordance other than the system Back gesture, and **no designed behaviour for it**. Assume
  system Back returns to the previous step with answers retained.
- The design shows **no partial-completion warning** — the CTA is simply disabled. Do not add an
  inline error unless the designer supplies one.
- **Confirm with product** whether the step-6 reflection is truly required; if it is optional, the
  Save button must render enabled from the outset and the disabled state in `139:65454` is merely
  the empty-form snapshot.

### 8.6 Permissions and roles

- **Practitioner** — owns their profile, fills the self-assessment, views their own summary.
- **Principal** — sees their own journey; whether a principal may view a practitioner's
  self-assessment summary is **not specified**. Default to *no* until product confirms.
- **Coach** (WL app) — the coach nudge banner ("Contact your coach", "See coach") implies a
  practitioner→coach link exists. A coach almost certainly needs read access to a supported
  practitioner's journey and summary; treat as a distinct scope
  (`self_assessment:read:supported`), **confirm before building**.
- Nobody may edit a submitted assessment. The portal/admin may deprecate a form version.
- The summary is **personal, low-stakes reflective data** — do not expose it to peers, and do not
  aggregate it into any public leaderboard.

### 8.7 The coach banner

- Rendering `PRO-JRN-COACH` vs `PRO-JRN` is a **server-driven flag** (`show_coach_nudge`) — the
  design gives no trigger. Sensible inputs: the subject has an assigned coach **and** (no visit in
  N days **or** onboarding incomplete). **Confirm the rule with product.**
- The "See coach" button's destination is not designed — presumably the coach's contact/profile
  screen.

### 8.8 Offline

- The full assessment must be completable offline: cache the form definition, persist each step's
  answers locally, queue `submit`.
- The journey timeline and the summary render from cache.
- `submit` must be **idempotent by draft id** so an offline replay cannot create two journey
  entries.

---

## 9. Designer notes carried forward

Verbatim from the four `comment` frames on the Page 20 canvas. All are black Quicksand-style bold
on white at ~20–24px, x-inset 26dp — canvas annotations, never rendered in-app.

### `139:65212` — "All possible journey items" (360×410)

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

Each heading is followed by a **live example row** using the same `Text and image question` /
`Journey step option 1` structure as the real screen: item 1 a green `Check` circle, item 2 the
`Icon/Solid/academic-cap` circle, item 3 a green `Check` plus the pink **View** pill
(`small secondary` `139:65242`, 51×32). Text node ids: heading `139:65213`; "Registered for the
app" `139:65214`; "Moodle course completed" `139:65223`; "Self-assessment form completed"
`139:65232`.

**Binding consequence:** these three are *the* journey item types. Anything else needs new design.

### `139:65243` — entry point (360×102)

> Tap “Fill in a form” from journey page

(Text node `139:65244`; curly quotes as in the file.)

### `139:65317` — section label (360×62)

> Practitioner self-assessment

### `139:65319` — section label (360×92)

> View a completed self-assessment

### 9.1 Other constraints carried from the source

- **The self-assessment content is SmartStart's**, surfaced under "This content is powered by:"
  with the SmartStart stacked wordmark (`139:65478`). The SmartStart sub-palette
  (`SS Primary Purple`, `SmartStart Primary Accent`, `SmartStart Primary Accent 2`,
  `SmartStart Text dark`, `SmartStart/sky blue`) is **scoped to co-branded content and must not be
  themed away by a tenant**. It is intentionally absent from `role.*` in `tokens.json`.
- **The journey timeline component is named `Antenatal visits`** — it is reused generically.
  Do not infer an antenatal feature from the name.
- The `Bottom border` hairline under the tab bar is **hidden** on both Profile frames — the tab
  bar sits on `role.background` and needs no rule.
- The tab bar's **inactive label renders navy (`role.textDark`)** here, contradicting
  `components.md` §5 which specifies `textMid`. Reconcile in the library, don't fork.
- The **"Fill in a form" secondary button is drawn with a 1dp border**, while the DS specifies 2dp
  (`size.focusRing`) for secondary buttons. Pick one and apply it everywhere.
- Several radii deviate from the token scale: `Informational` card 8dp, `action item no icon`
  12dp, textarea 8dp. **Snap to `radius.md` (10dp) / `radius.sm` (6dp)**; do not introduce new
  radius tokens.

---

## 10. Known gaps in the source design

These are defects and omissions in the Figma source. They are recorded here so implementation does
not silently invent behaviour.

1. **"Step 8" and "step 9" are not steps — they are selection states of step 5.**
   `139:65490` ("N7.1.5 Practitioner self-assessment - step 8") and `139:65510` ("… - step 9") are
   frame-named as if they were additional questionnaire pages, but both have the **identical
   structure to `139:65434`** and both headers still read **"step 5 of 6"**. `139:65490` is the
   *"None" selected, others dimmed* state; `139:65510` is the *two activities selected, "None"
   dimmed* state. **Build ONE screen (`SA-5`) with three selection states.** Do not create
   step 8 or step 9 routes.

2. **Step 4 is mis-prefixed.** `139:65393` is named **"N7.1.3 Practitioner self-assessment -
   step 4"**, duplicating the `N7.1.3` prefix already used by step 3 (`139:65362`). It should be
   `N7.1.4`. The in-screen header correctly reads "step 4 of 6". Numbering slip in the source
   file — use the screen codes in §2, never the frame names, as identifiers.

3. **No Profile-tab content is designed.** The Profile tab is present in the tab bar on both
   frames, but its body exists **only as a hidden layer** (`Frame 1481`, `139:65087` /
   `139:65151`: two `action item icon` rows at 328×80 with an 8dp gap, plus one
   `long action icon with badge` at 328×80). There is no dedicated Profile-tab frame, no copy, no
   destinations. **The Profile tab cannot be built from this page.**

4. **No `Tabs - principal` variant exists on this page.** Only `Tabs - business` (`139:65091`,
   `139:65155`) is used, in a 2-tab configuration. The `Tabs - principal` variant referenced
   elsewhere in the system (e.g. the Resources hub's scrolling 4-tab strip) is **not present on
   Page 20**; locate it on another page before codifying the tabs component.

5. **No discard-confirmation dialog** for the ✕ close on any form step, despite the ✕ appearing on
   all six steps and the summary. See §6.1 — this is the highest-risk gap on the page.

6. **"Licence awarded" is only a frame name.** `139:65530` promises a licence outcome but draws
   none — no badge, no status component, no licence copy. Treat "Licence awarded" as a variant
   label for the SmartSpace summary family and assume the licence chrome lives on a sibling frame
   outside this page.

7. **`Action with icons` is a dead slot.** On both `W15.0.0` frames (`139:65248`, `139:65269`) it
   collapses to 0dp with five 0dp `full width` children. Either a component that needs content to
   expand, or dead structure. Do not build it.

8. **Duplicated ✕ layer on `SA-1`.** `139:65465` and `139:65473` are two identical `Icon right`
   instances at (320, 20). Build one.

9. **No selected state is drawn for the radio options.** Every radio on `SA-2`, `SA-3` and `SA-4`
   is unselected, so the selected treatment must be inferred from `components.md` §4. Get it
   confirmed.

10. **No pending/incomplete journey-step treatment.** Only the green completed circle (and the
    `academic-cap` variant) is drawn. A future/locked milestone has no design.

11. **Hidden layers with unspecified triggers**: `Celebratory` (`139:65101` / `139:65164`) and
    `with link` (`139:65096` / `139:65160`) on the Journey tab, plus two richer journey step rows
    (`139:65122` / `139:65132` and their siblings on `139:65149`) demonstrating a checkbox caption
    and a `small primary trailing icon` button. All are hidden with no note explaining when they
    appear.

12. **Two component names for one card**: seven of the step-5 cards are `Select card` while the
    eighth ("None", `139:65525`) is `Select card default`. Consolidate to one component with
    variants.

13. **`Group 1457` (`139:65575`) is a raw vector group, not a component instance** — the orange
    "sometimes" face on the summary, whereas the green and cyan faces are proper
    `ECD_Connect_emoji*` instances. Componentise it.

14. **Duplicate `White` / `white` variables** in the source collections indicate two overlapping
    colour collections; `tokens.json` resolves this to `palette.white` — do not reintroduce both.

15. **No PNG assets on disk.** `design-system/assets/screens/page20-profile/` is empty: the
    extraction environment's egress proxy blocked `www.figma.com`. Re-run the export from an
    unrestricted network. The deep-links in §2 are the interim reference.

16. **No resume affordance for an in-progress assessment.** The picker row looks the same whether
    the form has never been started, is half-filled, or is complete (§7 row 16, §8.3).
