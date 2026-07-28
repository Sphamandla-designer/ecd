# Page 21 — DBE Registration Helper (ECD Connect)

**Figma file:** `8s2xe3EyBRhrzDFy93NbfN`
**Page node:** `139:66313` ("Page 21")
**Canvas extent:** x 0 → 3568, y 0 → ~14622. 42 top-level nodes.
**Frame standard:** all phone screens are **360 × 640** (mobile portrait, 1× design), with tall scroll variants at 360 × 750 / 942 / 952 / 1035 / 1066 / 1076.

> **Asset gap:** this environment's egress proxy returns 403 on CONNECT to `www.figma.com`, so no PNGs could be written to `design-system/assets/screens/page21/`. All screens below were rendered through `get_screenshot` with inline base64 and read visually. The "Figma node deep-link index" at the end replaces the asset index.

---

## 1. Page overview

Page 21 covers the **DBE Registration Helper** — the in-app assistant that walks an ECD (Early Childhood Development) principal through registering their preschool/programme with South Africa's **Department of Basic Education (DBE)**, and tracks their progress through the two-stage certification ladder:

| Stage | Certificate | Meaning |
|---|---|---|
| **Apply** | Bronze certificate | Programme is formally lodged with the DBE via the eCares system |
| **Comply** | Silver certificate | Venue, documents and staff meet the health/safety and operating standards |

The page bundles four related things:

1. **The Registration tab** of the Business hub (`WO7.4.0 Money dashboard - empty` frames — the frame *name* is a leftover from a duplicated money-dashboard template; the *content* is the registration-stage journey tracker). Six state variants: not-started, in-progress, completed, each with toasts.
2. **The discovery entry point** — the Community → Resources tab (`139:67111`) carries a "DBE registration helper" promo card with a **Learn more** CTA.
3. **The onboarding + questionnaire flow** (`W1.1.0 Profile setup - welcome screen`, `WO4.1.5 Child registration - step 4 … 13`, `step3` — again reused frame names; the content is a 3-step registration-helper intake survey covering current registration status, subsidy status, certificates held, and blockers/funding pain-points).
4. **Two long-form "how to register" info pages** (`WO7.5.0 General info page` — one for **Apply**, one for **Comply**), each a numbered step guide with download/link CTAs and a self-declare "I have my … certificate" button.
5. **Gating dialogs and designer annotation frames** — a "Set up your preschool!" gate, an exit-confirmation modal, and six `WO1.3.0 Profile` frames that contain only a note.

The feature's job-to-be-done: South African ECD principals find DBE registration opaque and slow. The helper explains the process in plain language, tracks which of the two certificates they hold, tells them exactly which documents and portals (eCares, Form 30) they need, gives them DBE contact routes (email + WhatsApp), and collects survey data on where they are stuck.

**Terminology warning:** many frames carry names inherited from other flows (`Money dashboard`, `Child registration`, `Profile`, `Club tab`), and several component variants are misnamed (`dialog card - error` renders as a friendly prompt; `action xl icon disabled` renders enabled). **Trust the rendered content, not the layer name** — every mismatch is called out per screen below.

---

## 2. Flow map

```
 DISCOVERY
 Community → Resources tab (139:67111)
 "DBE registration helper — Not sure where to start?"  → [Learn more]
        │
        │   (gate) if no preschool yet →  139:67268
        │          "Set up your preschool!"  [Set up preschool] / [Do this later]
        │   (gate) trial users blocked entirely  (note 139:67267)
        ▼
 HELPER INTRO  139:66449
 "What is ECD registration?"  → [Start]
        │
        ▼
 ┌─────────────────────────────────────────────────────────┐
 │  INTAKE QUESTIONNAIRE — 3 steps                         │
 │                                                         │
 │  Step 1 of 3 · "Registration information"  139:66535    │
 │    • subsidy? Yes / No / Not sure  (pink segmented)     │
 │    • registered with DBE? 5 radios                      │
 │              │ Next                                     │
 │              ▼                                          │
 │  Step 2 of 3 · select-card lists                        │
 │    139:66907 · 66921 · 67154 · 67174                    │
 │    (certificates held / documents / "Other")            │
 │    139:66461 (Next disabled) ↔ 139:66554 (Next enabled) │
 │              │ Next                                     │
 │              ▼                                          │
 │  Step 3 of 3 · "Challenges"  139:66469                  │
 │    + variants 66519 / 66485 / 66502                     │
 │    • 7 radios: biggest DBE-registration blocker         │
 │    • free-text: biggest funding issue                   │
 │              │ Save                                     │
 └──────────────┼──────────────────────────────────────────┘
                │        ▲
   X (close) ───┼────────┘  Exit modal 139:67151
   at any step  │           "Are you sure you want to exit?"
                │           [Exit] / [Continue editing]
                ▼
 BUSINESS HUB → "Registration" tab  (journey tracker)
        │
   ┌────┴──────────────┬─────────────────────┐
 [not started]    [in progress]         [completed]
 139:66683        139:66791 / 66935     139:66377 / 67019
 "Get started!"   partial ticks         "Well done, you've
 hollow circles                          completed your registration!"
 [Info] pills     [View] pills           [View] pills → [See resources]
        │                │                     │
        └────────────────┴─────────────────────┘
                         │  [Info] / [View]
            ┌────────────┴────────────┐
            ▼                         ▼
  APPLY info page 139:66744   COMPLY info page 139:66863
  Step 1 Sign up for eCares   Step 1 Check your venue
  Step 2 Gather documents     Step 2 Gather documents
  Step 3 Get Bronze cert      (1-year deadline from Bronze)
  [Register for eCares]       [Complete health & safety check]
  [Download Form 30]          [Visit the ECD Info Hub]
  [Log in to eCares]          [Download the guide]
  [I have my bronze cert] ──┐ [I have my silver cert] ──┐
                            │                           │
                            └──── self-declare ─────────┘
                                       │
                                       ▼
                        toast "Stage updated" (139:67019)
                        or  "Information added" (139:66683)
                                       │
                        [Update my stage] re-opens the picker
                        (note 139:66615: pre-select all previous
                         certificates, but never auto-select "None")

 Related / adjacent:
   139:66582  Practitioners (Staff tab)
   139:66569  W3.0 Hub page (symbol)
```

---

## 3. Screen inventory

### Real screens

| Node id | Name | Size | Purpose |
|---|---|---|---|
| `139:66683` | WO7.4.0 Money dashboard - empty | 360 × 640 | **Registration tab — not started.** Info banner + Start, both stages un-ticked, "Information added" toast |
| `139:66377` | WO7.4.0 Money dashboard - empty | 360 × 640 | **Registration tab — completed.** Celebratory banner, both stages ticked, subtitles = certificate names |
| `139:67019` | WO7.4.0 Money dashboard - empty | 360 × 640 | **Registration tab — completed with dates.** Same as above, subtitles = award dates, "Stage updated" toast |
| `139:66623` | WO7.4.0 Money dashboard - empty | 360 × 640 | Registration tab variant (no description block) |
| `139:66791` | WO7.4.0 Money dashboard - empty | 360 × 640 | Registration tab variant — in-progress |
| `139:66935` | WO7.4.0 Money dashboard - empty | 360 × 640 | Registration tab variant — in-progress |
| `139:67188` | WO7.4.0 Money dashboard - empty | 360 × 640 | Registration tab variant |
| `139:66449` | W1.1.0 Profile setup - welcome screen | 360 × 640 | **Helper intro** — "What is ECD registration?" + Start |
| `139:66461` | WO4.1.5 Child registration - step 4 | 360 × 640 | Intake step — label + single-select, Next disabled |
| `139:66535` | WO4.1.5 Child registration - step 7 | 360 × 640 | **"Registration information" (Step 1 of 3)** — subsidy segmented control + 5 DBE-status radios |
| `139:66554` | WO4.1.5 Child registration - step 9 | 360 × 640 | Intake step — label + single-select, Next **enabled** |
| `139:66907` | WO4.1.5 Child registration - step 10 | 360 × 640 | Intake step — 4 "Select card" checkboxes |
| `139:66921` | WO4.1.5 Child registration - step 11 | 360 × 640 | Intake step — 4 "Select card" checkboxes, 2-line label |
| `139:67154` | WO4.1.5 Child registration - step 12 | 360 × 640 | Intake step — 3 select cards + 1 inline "Other" checkbox row |
| `139:67174` | WO4.1.5 Child registration - step 13 | 360 × 640 | Intake step — 4 select cards |
| `139:66469` | step3 | 360 × **952** | **Challenges questionnaire** — 7 radios + long text input + Save (disabled) |
| `139:66519` | step3 | 360 × 942 | Challenges variant |
| `139:66485` | step3 | 360 × 1035 | Challenges variant (longer) |
| `139:66502` | step3 | 360 × 1035 | Challenges variant (longer) |
| `139:66744` | WO7.5.0 General info page | 360 × **1066** | **"Apply" info page** — 3 numbered steps to Bronze certificate + "I have my bronze certificate" |
| `139:66863` | WO7.5.0 General info page | 360 × **1076** | **"Comply" info page** — 2 numbered steps to Silver certificate + "I have my silver certificate" |
| `139:66582` | WO2.1.0 Practitioners | 360 × **750** | Staff tab — practitioner list + invite card |
| `139:66562` | WO1.3.0 Profile | 360 × 640 | Profile shell (contents hidden; annotation text on top) |
| `139:66569` | W3.0 Hub page | 360 × 640 | **Symbol** (component) — the hub page this feature hangs off |
| `139:67111` | C2.3.0 Club tab - purple | 360 × 640 | **Community → Resources tab** — the "DBE registration helper" promo card (discovery entry point) + 6 placeholder link rows |
| `139:67107` | Frame 1487 | 328 × 193 | Loose "with link" card component |

### Dialogs / overlays

| Node id | Name | Size | Purpose |
|---|---|---|---|
| `139:67151` | Exit modal | 360 × 642 | **"Are you sure you want to exit?"** — orange warning icon, [Exit] / [Continue editing] |
| `139:67268` | W3.2.1 Profile - Preschool - pop-up | 360 × 640 | **"Set up your preschool!"** — Cebisa mascot, [Set up preschool] / [Do this later] |

### Annotation-only frames (no UI — designer notes)

| Node id | Frame name | Note text node |
|---|---|---|
| `139:67011` | WO1.3.0 Profile | `139:67017` |
| `139:66616` | WO1.3.0 Profile | `139:66622` |
| `139:66609` | WO1.3.0 Profile | `139:66615` |
| `139:67093` | WO1.3.0 Profile | `139:67099` |
| `139:67100` | WO1.3.0 Profile | `139:67106` |
| `139:67261` | WO1.3.0 Profile | `139:67267` |

### Section headers (`Header` instance, 3568 × 300, full canvas width)

`139:67008` (y 0) · `139:67009` (y 5635) · `139:67010` (y 7034) · `139:67018` (y 9050) · `139:67092` (y 10665) · `139:67109` (y 12138) · `139:67110` (y 13536)

---

## 4. Per-screen anatomy

### 4.1 Registration tab — completed · `139:66377`

Top-to-bottom (all offsets are frame-relative, from XML geometry):

| y | h | Element | Node |
|---|---|---|---|
| 0 | 64 | `Title with subtitle` app bar — back arrow (left), **"Business"** / **"Monday, 7 December"** stacked centre, teal `?` help circle (right). Dark navy `#1F3A5F`-family fill, white text | `139:66379` |
| 64 | 56 | `Tabs - business` — 4 tabs: **Staff** (66 w), **Money** (79 w), **Registration** (122 w, active), **Resources** (106 w). Active tab is cyan with a 2 px cyan underline; inactive slate grey on a very pale blue bar | `139:66386` / `139:66388`–`66391` |
| 120 | 36 | `Page Title` — **"DBE registration helper"**, ~20 px dark navy, left inset 16 | `139:66394` |
| 168 | 132 | Celebratory banner card, 328 wide @ x 16 — pale green fill, rounded ~12. Green mascot avatar left; bold olive-green heading **"Well done, you've completed your registration!"**; body **"Explore more resources for your ECD business."**; cyan pill button **"See resources"** with link icon | `139:66396` (`Celebratory`) |
| 352 | 213 | `Frame 424` → `Antenatal visits` journey tracker (328 @ x 16, y 368 absolute) | `139:66395` / `139:66397` |
| — | — | Vertical connector `Line 3` at x 19.5, from y 8 to y 92 (0.5 px wide, olive green) linking the two step circles | `139:66398` |
| step 1 | 42 | Row: 32 × 32 green filled circle w/ white check (icon 20 × 20 inset 6) at x 4 · Content block at x 56, w 201: **"Apply"** (22 h) over **"Bronze certificate"** (20 h) · trailing `small secondary` pink pill **"View"** 51 × 32 at x 277 | `139:66400`–`66409` |
| step 2 (+66) | 42 | Same anatomy: **"Comply"** / **"Silver certificate"** + **"View"** pill | `139:66410`–`66418` |
| 568 | 72 | Bottom `Form Layout` — full-width outlined cyan button **"Update my stage"** with clipboard icon, 328 × 40 @ x 16, y 16 | — |

**Vertical rhythm:** 16 px page inset everywhere; 66 px step pitch in the journey tracker (42 content + 24 gap); 16 px between banner edge and card content.

### 4.2 Registration tab — not started · `139:66683`

Same chrome (app bar / tabs / page title) as 4.1. Differences:

- Banner is the **informational** variant: pale blue fill, blue `i` circle icon, bold blue heading **"Get started with your registration!"**, solid cyan button **"Start"** with a right-arrow-in-circle icon. Shorter than the celebratory card (no body paragraph).
- Journey circles are **outline-only** (olive stroke, pale green fill, no check) = not-yet-achieved state.
- Step subtitles are the *action* copy rather than the certificate name: **"Apply" / "Get a Bronze certificate"**, **"Comply" / "Meet the standards"**.
- Trailing pill reads **"Info"** (pink) instead of "View".
- No bottom "Update my stage" button; instead a green success **toast** pinned to the bottom: white check-in-circle, **"Information added"**, white `X` dismiss. Toast is full-bleed, ~48 h, sits over the button area.

### 4.3 Registration tab — completed with dates · `139:67019`

Identical to 4.1 except:

- Step subtitles are award dates: **"30 July 2024"** (Apply) and **"3 August 2024"** (Comply).
- Green toast at the bottom reads **"Stage updated"**.
- The "Update my stage" button is present but overlaid by the toast.

This is the post-save confirmation state of the tab.

### 4.4 Helper intro · `139:66449` (W1.1.0 Profile setup - welcome screen)

| y | h | Element | Node |
|---|---|---|---|
| 0 | 64 | `Title with subtitle` — white back arrow + centred **"DBE registration helper"** on dark navy | `139:66460` |
| 64 | 180 | `Graphic overlay Medium` — dark navy band with faint large outline circles/shapes as watermark | `139:66450` |
| 20 | 24 | `Icon right` at x 320 (close/help affordance) | `139:66451` |
| 88 | 183 | `Dialog card - Cebisa` 328 @ x 16 — near-white rounded card floating over the navy band. Centred yellow circular mascot illustration (~100 dia, "Cebisa" character: yellow robot/bug with antennae, green eyes, pink body) over caption **"Your guide to DBE registration"** in navy | `139:66455` |
| 314 | 233 | `Frame 1468` 328 @ x 16 — `Page Title` (33 h): **"What is ECD registration?"** navy ~20 px; then `Detail` text (192 h): grey paragraph **"Registration means your programme is officially recognised by the Department of Basic Education (DBE). It is the first step to getting the ECD subsidy."** followed by bold dark **"This app shows you the steps. You will need to submit your information to the DBE."** | `139:66457`, `139:66458` |
| 568 | 72 | `Form Layout` — solid cyan `primary with icon` button **"Start"** with circled right-arrow, 328 × 40 @ x 16, y 16 | `139:66452`–`66454` |

`139:66459` (`small secondary trailing icon`, 105 × 32) is hidden — a suppressed "skip"/secondary action.

### 4.5 Challenges questionnaire · `139:66469` (frame name `step3`, 360 × 952)

Scrolling form, tallest screen on the page.

| y | h | Element | Node |
|---|---|---|---|
| 0 | 64 | `Title with subtitle` — back arrow left, **"DBE registration helper"** / **"Step 3 of 3"** centred, white **X** close at right | `139:66484` |
| 78 | 33 | `Page Title` — **"Challenges"**, ~22 px navy, x 16 | `139:66473` |
| 136 | 512 | `Frame 1489` 328 @ x 16 — question block | `139:66474` |
| ↳ 0 | 40 | `Label` (2 lines, navy bold): **"What is the biggest challenge you face with DBE registration right now?"** | `139:66475` |
| ↳ 44 | 52 | radio — "I don't know where to start" | `139:66476` |
| ↳ 100 | 72 | radio — "The process takes too long or is too complicated" (2-line) | `139:66477` |
| ↳ 176 | 72 | radio — "I don't understand what requirements or documents I need" | `139:66478` |
| ↳ 252 | 72 | radio — "I don't have or cannot get the right documents" | `139:66479` |
| ↳ 328 | 52 | radio — "I cannot reach the officials who can help" | `139:66480` |
| ↳ 384 | 72 | radio — "I don't have the infrastructure or resources to meet requirements" | `139:66481` |
| ↳ 460 | 52 | radio — "Other" | `139:66482` |
| 675 | 184 | `long text input` 328 @ x 18 — label above (navy bold, 3 lines): **"What is the biggest issue you are facing when it comes to funding for your ECD programme?"**; textarea with pale blue fill, rounded, placeholder **"Add text…."** grey | `139:66483` |
| 880 | 72 | `Form Layout` — `primary disabled` button **"Save"** with a save/disk icon, 328 × 40 @ x 16, y 16. Pale cyan fill, white-ish label = disabled until a radio is picked | `139:66470`–`66472` |

**Radio row spec:** 328 wide, pale blue (`#EDF4F8`-ish) rounded rect; 4 px gap between rows (56 px pitch for 52 h rows, 76 px pitch for 72 h rows); radio circle at left inset ~16, label text starts ~x 60, grey until selected.

Variants `139:66519` (942), `139:66485` (1035), `139:66502` (1035) are the same screen with different option counts / longer copy.

### 4.6 Registration information (Step 1 of 3) · `139:66535` (frame name "step 7")

**This is the first questionnaire step, not a child-registration step.** Rendered content:

| y | h | Element | Detail |
|---|---|---|---|
| 0 | 64 | `Title with subtitle` (`139:66553`) | Back arrow left, **"DBE registration helper"** / **"Step 1 of 3"** centred, white **X** right |
| 78 | 33 | `Page Title` (`139:66549`) | **"Registration information"**, navy Quicksand ~22 px |
| 111 | 100 | `Next buttons/Label & single-select` 328 × 68 @ (16, 16) (`139:66537`) | Label **"Are you receiving a subsidy from the DBE?"** over a 3-segment pill row: **Yes** / **No** / **Not sure**. Segments are pale pink `#FFD3E6` with navy text; the **selected** segment ("No") is solid hot pink `#FF2180` with white text. Segments are roughly equal thirds of 328 with ~4 px gaps |
| 227 | 320 | `Frame 1489` (`139:66539`) | `Label` (20 h) **"Are you registered with the DBE?"** then **5** radio rows at y 24 / 80 / 136 / 192 / 268 |
| ↳ | 52 | `Radio Group default` `139:66541` | "Yes - fully registered" |
| ↳ | 52 | `139:66542` | "Yes - conditionally registered" |
| ↳ | 52 | `139:66543` | "No - I started the process of registering" |
| ↳ | 72 | `139:66544` | "No - I have not started the process of registering" (2-line) |
| ↳ | 52 | `139:66545` | "I'm not sure" |
| 568 | 72 | `primary disabled` CTA (`139:66552`) | **"Next"** with circled right-arrow, pale cyan disabled fill |

**Radio row spec confirmed:** 328 wide, `UI Background` `#EFF6FA` fill, ~8 px radius, hollow grey radio at x ≈ 16, grey label from x ≈ 60. 56 px pitch (52 h + 4 px gutter).

A nested `Form Layout` at `139:66546` (y 342) is **hidden** — a duplicate CTA kept for the scrolling variant.

**Step numbering:** Step 1 of 3 = `139:66535` (Registration information) → Step 2 of 3 = the select-card screens (§4.7) → Step 3 of 3 = Challenges (§4.5).

### 4.7 Intake steps — select-card lists · `139:66907`, `139:66921`, `139:67154`, `139:67174`

Common skeleton (step 11, `139:66921`):

| y | h | Element |
|---|---|---|
| 0 | 64 | `Title with subtitle` |
| 78 | 33 | `Page Title` |
| 127 | 296 | `Frame 2142` 328 @ x 16 → `Label` (40 h, 2 lines) + `Children list` at y 56 |
| ↳ | 240 | 4 × `Select card` 328 × 56 at y 4 / 64 / 124 / 184 → **60 px pitch, 4 px gutter** |
| 568 | 72 | `primary disabled` CTA |

Differences:
- **`139:66907` (step 10):** single-line label (20 h), list starts at y 36, block height 276.
- **`139:67154` (step 12):** only 3 `Select card`s; the 4th row is a hand-built `Main` frame (`139:67164`, 328 × 54) with a 16 × 16 `Form Fields/Checkbox input` at x 16/y 17 and a `Title` text at x 48 — the inline **"Other"** row with a free-text affordance. A `Check circle` icon frame (`139:67165`) is hidden (the checked state).
- **`139:67174` (step 13):** first card is 54 h (not 56) and the list pitch is 58/60/60 — a minor alignment inconsistency worth normalising in code.

### 4.8 Intake steps — minimal · `139:66461` (step 4) and `139:66554` (step 9)

Both are 360 × 640, near-identical:

- `Title with subtitle` (0, 64) · `Page Title` (78, 33) · `Form Layout` (111, 100) containing one `Next buttons/Label & single-select` 328 × 68 @ x 16, y 16 · bottom `Form Layout` (568, 72).
- **Only difference is CTA state:** step 4 uses `primary disabled` (`139:66466`), step 9 uses `primary` enabled (`139:66560`). These two frames are the disabled/enabled pair for the same screen.

### 4.9 "Apply" info page · `139:66744` (WO7.5.0 General info page, 360 × 1066)

App bar title is **"DBE registration - Apply"** with a back arrow left and a white **X** right (dismiss, not just back).

| y | h | Element | Node |
|---|---|---|---|
| 64 | 74 | `Language selector` bar on `UI Background` `#EFF6FA` — label **"Change Language:"** at x 16 + a solid cyan `#1DBADF` dropdown pill reading **"English"** with a chevron, 100 × 40 at x 166; 1 px divider at y 56 | `139:66746`–`66750` |
| 80 | 16 | `offline` badge at x 156 — **hidden** | `139:66745` |
| 138 | 851 | `Content` | `139:66751` |
| ↳ 16 | 25 | Section heading **"Apply"**, navy Quicksand ~22 px | `139:66753` |
| ↳ 57 | 92 | `Informational` card — blue `i` icon, bold blue copy: **"Remember: registration is free. If anyone asks you to pay, contact the DBE."** | `139:66754` |
| ↳ 165 | 162 | **"Step 1: Sign up for eCares"** · "The eCares system allows you to begin your application process." · "If you have not registered for eCares yet, click the link below to register." · small cyan pill button **"Register for eCares"** 131 × 32 | `139:66756`–`66760` |
| ↳ 343 | 158 | **"Step 2: Gather and submit documents"** · "Gather these documents:" followed by a **bulleted list**: "Certified copies of ID or passport for yourself and all staff" / "Fill in Form 30 for all staff members" · button **"Download Form 30"** 129 × 32 | `139:66762`–`66765` |
| ↳ 517 | 134 | **"Step 3: Get your Bronze certificate"** · "Log in to eCares and fill in all of the information about your ECD programme. Upload your documents." · button **"Log in to eCares"** 113 × 32 | `139:66767`–`66770` |
| ↳ 667 | 168 | Trailing `Informational` card — `Information circle` 20 × 20 at (16, 16), content at x 48 (264 w). Title **"Need help?"**; bullet 1: "Send an email to: **banapele@dbe.gov.za**" (address bolded); bullet 2: "Send "Hi" to the DBE's WhatsApp line"; then a cyan pill button **"Go to WhatsApp"** with a WhatsApp glyph | `139:66771`–`66784` |
| ~1010 | 40 | Bottom full-width solid cyan CTA **"I have my bronze certificate"** with a check-in-circle icon — the self-declare action that advances the Apply stage | — |

**Rhythm:** 16 px gutters; ~16 px between a step's last line and its CTA; **~16 px between step blocks** (165+162=327 → next at 343). Step heading 22 px line box, body 24 px per line (`ECD Body Copy`).

### 4.10 "Comply" info page · `139:66863` (360 × 1076)

Same template as 4.9. **Note:** the app bar still reads **"DBE registration - Apply"** — a copy bug; it should read "Comply". Same `Change Language: English` bar and the same "Remember: registration is free…" informational card.

| Element | Content |
|---|---|
| Section heading (`139:66872`) | **"Comply"** |
| Lead line (`139:66874`) | "You have one year from your Bronze certificate to complete this stage." — grey body, sits *below* the informational card |
| Step 1 (`139:66876`/`66877`) | **"Step 1: Check your venue"** — "An Environmental Health Practitioner will visit to check that your centre is safe and meets the health standards. Use the checklist in the app to prepare your venue." · button **"Complete health & safety check"** (~204 × 32) |
| Step 2 (`139:66881`/`66882`) | **"Step 2: Gather and submit documents"** — "You will need to submit several documents. A social worker will visit to check your documents and how your programme runs. Download the guide or visit the ECD Info Hub to see exactly what you need to prepare." · **two stacked** buttons: **"Visit the ECD Info Hub"** then **"Download the guide"** (~36 px pitch) |
| Trailing card (`139:66892`/`66896`/`66900`) | **"Need help?"** — identical email + WhatsApp bullets and "Go to WhatsApp" button as the Apply page |
| Bottom CTA | Full-width solid cyan **"I have my silver certificate"** with check-in-circle icon |

Only **two** steps here vs three on the Apply page — the Silver path is venue + documents. Step 2 is the only block on either page with two CTAs stacked vertically.

### 4.11 Practitioners (Staff tab) · `139:66582` (360 × 750)

| y | h | Element |
|---|---|---|
| 0 | 64 | `Layout` → `Title with subtitle` (`139:66601`); a collapsed `Action with icons` frame (`139:66602`, h 0) holds 5 zero-height `full width` dividers |
| 64 | 56 | `Tabs - business` — 4 tabs at x 0 / 67 / 146 / 266 (widths 67 / 79 / 120 / 106) — **Staff active** here vs Registration active on the dashboard frames |
| 138 | 348 | `Children` list 328 @ x 16 — 4 × `Initials long action icon with icon and alert` (80, 80, 80, 92 h) at y 0 / 84 / 168 / 252 → **84 px pitch, 4 px gutter** |
| 490 | 260 | `Form Layout` — `with link` card 328 × 172 @ y 16, then `secondary with icon` button 328 × 40 @ y 204 |

Note the tab x-offsets differ from the dashboard frames (`139:66388` starts at **-6.5**, here at **0**) — the dashboard tab strip is nudged left by 6.5 px. Likely a drift bug; align to 0.

### 4.12 Community → Resources tab · `139:67111` (frame name "C2.3.0 Club tab - purple")

**This is the entry point that advertises the registration helper**, not a locked club screen. Rendered content:

| y | h | Element | Detail |
|---|---|---|---|
| 0 | 64 | `Title with subtitle` (`139:67129`) | Back arrow left, **"Community"** / **"20 October 2024"** centred on navy `#27385A` |
| 64 | 56 | `Underline` tabs (`139:67130`) | **2** tabs, 180 px each: **Community** (inactive, slate) and **Resources** (active, cyan `#1DBADF` label + 2 px cyan underline) on `UI Background` |
| 128 | 56 | `Frame 1451` (`139:67135`) | 48 × 48 hot-pink `#FF2180` `Icon circle sm` (two-person "connect" glyph, white) at x 0/y 8; `Title` **"Connect"** navy ~22 px at x 60/y 18 |
| ~190 | 1 | `list` rule (`139:67142`) | **Dashed** horizontal divider, 328 @ x 16 |
| 216 | 160 | `Informational` card (`139:67143`) | Pale blue `#EFF6FA`, blue `i` icon at (16,16). Bold blue title **"DBE registration helper"**; grey body **"Not sure where to start with DBE registration? The app guides you through the steps."**; solid cyan pill button **"Learn more"** with circled right-arrow |
| 394 | 366 | `Frame 1` (`139:67144`) | **6 × `action xl icon disabled`** 328 × 56 at y 0 / 62 / 124 / 186 / 248 / 310 → **62 px pitch, 6 px gutter**. Each row is a pale `#EFF6FA` rounded rect with placeholder label **"Lorem ipsum"** (navy, left, x ≈ 16) and a navy external-link/open-in-new icon at the right (x ≈ 300) |

The six "Lorem ipsum" rows are **unfilled placeholder content** for the resource list — copy is still to be written. The component variant is named `disabled`, but they render as normal enabled link rows; the naming is misleading.

**This screen is the primary discovery surface for the feature:** the "Learn more" button is the hand-off into the helper intro (`139:66449`).

Hidden decoration: `139:67112` (`b`), `139:67125` (`Supporting content` + `User` icon + text), `139:67128` (`Badges` 110 × 24), `139:67140` (`Label`).

---

## 5. Dialogs & popups

### 5.1 Exit modal · `139:67151` (360 × 642)

```
frame  Exit modal                        360 × 642
 ├ rounded-rectangle "Rectangle 1"       360 × 642 @ (0,0)   ← full-bleed scrim
 └ instance "dialog card - overlay"      328 × 307 @ (16,167)
```

**Rendered content, top-to-bottom inside the white card:**

1. **Orange/amber filled circle with a white exclamation mark**, ~40 dia, horizontally centred (warning glyph).
2. Heading, navy `#27385A` Quicksand ~18 px, centred: **"Are you sure you want to exit?"**
3. Body, grey `Text Mid` `#65727A` Inter 16/24, centred, 2 lines: **"If you exit now your changes will not be saved."**
4. Primary button — solid cyan `#1DBADF`, full card width (296), 40 h, white label **"Exit"** with a left-pointing exit/logout arrow icon.
5. Secondary button — white fill, cyan 1 px border, cyan label **"Continue editing"** with a pencil icon, 296 × 40, ~14 px below the primary.

Notes:
- Scrim is `Modal Background` `#27385A` at reduced opacity, rendering as a desaturated slate `#6B7392`; it covers the whole viewport (and 2 px past the 640 frame height).
- Card is white, ~12 px radius, with a soft drop shadow; horizontally centred by the standard 16 px gutter, vertically at y 167 — optically centred for a 307 h card in a 640 h viewport (167 top / 166 bottom).
- **Destructive action is the primary (cyan) button and the safe action is secondary** — worth flagging in review; the usual pattern would reverse this emphasis.
- Reached from the **X** in the app bar of the questionnaire steps (`139:66469`, `139:66535` and siblings).

### 5.2 Preschool report popup · `139:67268` (W3.2.1 Profile - Preschool - pop-up, 360 × 640)

```
frame  W3.2.1 Profile - Preschool - pop-up      360 × 640
 └ frame  WO5.0.0a Previous report- dialog      360 × 640
    ├ instance "offline"                        48 × 16  @ (156,80)   [hidden]
    ├ rounded-rectangle "Rectangle 1"           360 × 790 @ (0,0)     ← scrim, overscans 150 px
    └ frame "dialog card - error"               328 × 379 @ (16,131)
       ├ frame "Leading content"                296 × 219 @ (16,24)
       │  ├ frame "Mask group"                  100 × 100 @ (98,0)    ← centred circular illustration
       │  │  ├ ellipse "Ellipse 125"            100 × 100
       │  │  └ frame "Group 328"                138.46 × 180 @ (76.27,-5)
       │  │     ├ rounded-rectangle "Rectangle 18050"  138.46 × 176.04
       │  │     ├ frame "Group 327" → "Frame"   110.77 × 141.43
       │  │     └ ellipse "Ellipse 123"         106.81 × 106.81
       │  ├ frame "Text" → "Group 324"          296 × 23  @ (0,112)
       │  │  └ text "Heading"                   296 × 23              (139:67331)
       │  └ text "Detail"                       296 × 72  @ (0,147)   (139:67332)
       ├ instance "primary with icon"           296 × 40  @ (16,259)
       └ instance "secondary with icon"         296 × 40  @ (16,315)
```

**Rendered content — this is the "set up your preschool" gate, not a report dialog:**

1. **Circular yellow `#FFD525` avatar**, 100 dia, centred — the **Cebisa** mascot (same character as the helper intro `139:66449`): yellow robot/bug face, green antennae, white eyes, red smile, hot-pink `#FF2180` heart-shaped body, cyan hands.
2. Heading (`139:67331`), navy `#27385A` Quicksand ~18 px, centred: **"Set up your preschool!"**
3. Detail (`139:67332`), grey `#65727A` Inter 16/24, centred, 3 lines: **"To use this section, please share some details about yourself and your preschool."**
4. Primary button — solid cyan `#1DBADF`, 296 × 40, white label **"Set up preschool"** with a house icon.
5. Secondary button — white fill, cyan border, cyan label **"Do this later"** with a clock icon, 296 × 40.

Notes:
- **Card padding:** 16 px all round (content 296 = 328 − 2×16).
- **Internal rhythm:** illustration 100 h → 12 px gap → heading 23 h → 12 px gap → detail 72 h → 16 px gap → primary button 40 h → 16 px gap → secondary button 40 h → 24 px bottom padding.
- The layer name says `dialog card - **error**`, but it renders as a friendly onboarding prompt — the variant name is inherited and misleading.
- The scrim (790 h) deliberately overscans the 640 frame so it covers a scrolled page.
- **Ties to the designer notes:** this is the blocker shown before a principal can use the registration helper, and it pairs with the "Principal only … After user has created a preschool" trigger note (`139:67106`) and the trial-user gate (`139:67267`). "Do this later" is a soft dismiss, so the gate is non-blocking.

### 5.3 Toasts (inline, not separate frames)

Rendered inside `139:66683` and `139:67019`: a full-bleed green bar (~48 h) pinned to the bottom of the viewport, white check-in-circle icon at left, bold white label, white `X` at right.
- **"Information added"** — after saving questionnaire answers (`139:66683`)
- **"Stage updated"** — after changing certification stage (`139:67019`)

---

## 6. Designer notes (verbatim)

Each note lives as the *layer name* of a text node inside an otherwise-hidden `WO1.3.0 Profile` frame. Transcribed exactly, including original punctuation and curly quotes.

| Frame | Text node | Note (verbatim) |
|---|---|---|
| `139:67011` | `139:67017` | **Three variations with Apply → Comply** |
| `139:66616` | `139:66622` | **Info screens** |
| `139:66609` | `139:66615` | **Update my stage Show ALL previously selected certificates as selected (exception: don’t auto-select “None” if that was selected before)** |
| `139:67093` | `139:67099` | **Add hub notification Priority level: see in use case doc** |
| `139:67100` | `139:67106` | **Principal only Trigger (see use cases for full info) After user has created a preschool End Q1, 2, 3: 31 March 30 June 31 October** |
| `139:67261` | `139:67267` | **Trial users cannot access the registration helper** |

Also note-bearing (content text used as layer name, from the info pages):

| Node | Text |
|---|---|
| `139:66756` | Step 1: Sign up for eCares |
| `139:66757` | The eCares system allows you to begin your application process. |
| `139:66758` | If you have not registered for eCares yet, click the link below to register. |
| `139:66762` | Step 2: Gather and submit documents |
| `139:66763` | Gather these documents: Certified copies of ID or passport for yourself and all staff Fill in Form 30 for all staff members |
| `139:66767` | Step 3: Get your Bronze certificate |
| `139:66768` | Log in to eCares and fill in all of the information about your ECD programme. Upload your documents. |
| `139:66872` | Comply |
| `139:66874` | You have one year from your Bronze certificate to complete this stage. |
| `139:66876` | Step 1: Check your venue |
| `139:66877` | An Environmental Health Practitioner will visit to check that your centre is safe and meets the health standards. Use the checklist in the app to prepare your venue. |
| `139:66881` | Step 2: Gather and submit documents |
| `139:66882` | You will need to submit several documents. A social worker will visit to check your documents and how your programme runs. Download the guide or visit the ECD Info Hub to see exactly what you need to prepare. |

**Implications for build:**
1. Stage editing must **pre-select every previously chosen certificate**, but must *not* re-select "None" automatically (`139:66615`).
2. The quarterly-report trigger is **principal-only**, fires after preschool creation, at quarter ends **31 March / 30 June / 31 October** (`139:67106`).
3. The helper must be **gated for trial users** (`139:67267`) — matches the all-disabled `C2.3.0 Club tab` state (`139:67111`).
4. A hub notification is required; priority level is specified externally in the use-case doc (`139:67099`).

---

## 7. Variables

Retrieved via `get_variable_defs` on two representative nodes.

### 7.1 `139:66377` — Registration tab (completed)

**Colour**

| Token | Value | Used for |
|---|---|---|
| `Primary` | `#27385A` | App bar fill, headings |
| `Text Dark` | `#27385A` | Page titles, step titles |
| `Primary Accent 1` | `#52607B` | Muted navy |
| `Primary Accent 2` | `#D4D7DE` | Light grey border/divider |
| `Quaternary` | `#1DBADF` | **Cyan primary action** — Start, See resources, active tab, "Update my stage" outline |
| `SmartStart/sky blue` | `#29C1EF` | Brighter cyan accent |
| `Tertiary` | `#83BB26` | **Leaf green** — journey circles, connector line |
| `Success Main` | `#83BB26` | Toast fill, tick circles |
| `Success Dark` | `#5A8F02` | Celebratory heading text |
| `Success BG` | `#E6F1D4` | Celebratory banner surface |
| `UI Background` | `#EFF6FA` | Tab bar, input surfaces, informational cards |
| `Secondary Accent 2` | `#FFD3E6` | **Pale pink** View / Info pills |
| `Quinary` | `#FFD525` | Yellow (mascot / highlight) |
| `White` / `white` | `#FFFFFF` | Page background, on-dark text |
| `Text Light` | `#C9CFD2` | Disabled / low-emphasis text |
| `SmartStart Text dark` | `#1F192E` | Near-black text |

**Typography** — two families: **Quicksand** (SemiBold) for headings & buttons, **Inter** for body & help text.

| Token | Font |
|---|---|
| `ECD H4` | Quicksand SemiBold 16 / 22 |
| `ECD Primary Button Text` | Quicksand SemiBold 14 / 20 |
| `ECD Small button text` | Quicksand SemiBold 12 / 16 |
| `Small` | Inter Regular 14 / 20 |
| `Help text` | Inter Regular 14 / 20 |
| `text-xs/leading-4/font-medium` | Inter Medium 12 / 16 |

### 7.2 `139:67268` — Preschool set-up dialog

| Token | Value | Used for |
|---|---|---|
| `Modal Background` | `#27385A` | Scrim base (rendered at reduced opacity → slate `#6B7392`) |
| `Text Dark` | `#27385A` | Dialog heading |
| `Text Mid` | `#65727A` | Dialog body copy |
| `Quaternary` | `#1DBADF` | Primary button fill + secondary button outline/label |
| `Secondary` | `#FF2180` | Hot pink (mascot body, icon circles) |
| `Quinary` | `#FFD525` | Yellow mascot circle |
| `White` / `CoolGray/White` | `#FFFFFF` | Card surface, button label |
| `CoolGray/700` | `#4A5568` | Neutral text |
| `ECD Body Copy` | Inter Regular 16 / 24 | Dialog detail paragraph |
| `ECD Primary Button Text` | Quicksand SemiBold 14 / 20 | Both dialog buttons |

### 7.3 Layout constants (from geometry)

| Constant | Value |
|---|---|
| Page gutter | **16 px** |
| Content width | **328 px** (360 − 2×16) |
| App bar height | **64 px** |
| Tab bar height | **56 px** (+1 px bottom border, usually hidden) |
| Full-width button | **40 px** high |
| Small button | **32 px** high |
| Dialog card padding | **16 px** |
| Journey step pitch | **66 px** (42 content + 24 gap) |
| Radio row pitch | **56 px** (52 h) / **76 px** (72 h) — 4 px gutter |
| Select card pitch | **60 px** (56 h) — 4 px gutter |
| Practitioner row pitch | **84 px** (80 h) — 4 px gutter |
| Disabled action row pitch | **62 px** (56 h) — 6 px gutter |
| Bottom CTA dock | y **568**, 72 h (button inset 16, 16) |

---

## 8. Figma node deep-link index

Base: `https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=`

| Node id | What it shows | Link |
|---|---|---|
| `139:66313` | Page 21 (whole canvas) | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-66313 |
| `139:66683` | Registration tab — not started, "Get started" banner, "Information added" toast | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-66683 |
| `139:66377` | Registration tab — completed, celebratory banner, Bronze/Silver labels | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-66377 |
| `139:67019` | Registration tab — completed with award dates, "Stage updated" toast | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-67019 |
| `139:66623` | Registration tab variant | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-66623 |
| `139:66791` | Registration tab variant — in progress | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-66791 |
| `139:66935` | Registration tab variant — in progress | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-66935 |
| `139:67188` | Registration tab variant | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-67188 |
| `139:66449` | Helper intro — "What is ECD registration?" + Cebisa mascot | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-66449 |
| `139:66461` | Intake step 4 — single-select, Next disabled | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-66461 |
| `139:66535` | **Step 1 of 3 "Registration information"** — subsidy segmented control + 5 DBE-status radios | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-66535 |
| `139:66554` | Intake step 9 — single-select, Next enabled | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-66554 |
| `139:66907` | Intake step 10 — 4 select cards | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-66907 |
| `139:66921` | Intake step 11 — 4 select cards, 2-line label | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-66921 |
| `139:67154` | Intake step 12 — 3 cards + inline "Other" checkbox row | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-67154 |
| `139:67174` | Intake step 13 — 4 select cards | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-67174 |
| `139:66469` | Challenges questionnaire (Step 3 of 3) — 7 radios + funding textarea + Save | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-66469 |
| `139:66519` | Challenges variant (942 h) | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-66519 |
| `139:66485` | Challenges variant (1035 h) | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-66485 |
| `139:66502` | Challenges variant (1035 h) | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-66502 |
| `139:66744` | "Apply" info page — eCares sign-up, Form 30, Bronze cert, DBE help contacts | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-66744 |
| `139:66863` | "Comply" info page — venue health check, documents, Silver cert | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-66863 |
| `139:66582` | Practitioners / Staff tab | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-66582 |
| `139:66569` | W3.0 Hub page (component symbol) | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-66569 |
| `139:67111` | Community → Resources tab — "DBE registration helper" promo card (discovery entry) | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-67111 |
| `139:67151` | Exit modal — "Are you sure you want to exit?" | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-67151 |
| `139:67268` | "Set up your preschool!" gate — Cebisa mascot dialog | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-67268 |
| `139:67107` | Loose "with link" card component (328 × 193) | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-67107 |
| `139:67011` | Note: "Three variations with Apply → Comply" | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-67011 |
| `139:66616` | Note: "Info screens" | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-66616 |
| `139:66609` | Note: "Update my stage / show all previously selected certificates" | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-66609 |
| `139:67093` | Note: "Add hub notification" | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-67093 |
| `139:67100` | Note: "Principal only / quarter-end triggers" | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-67100 |
| `139:67261` | Note: "Trial users cannot access the registration helper" | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-67261 |

---

## 9. Issues found (worth raising with the designer)

| # | Issue | Node(s) |
|---|---|---|
| 1 | **Comply info page app bar reads "DBE registration - Apply"** — should say "Comply" | `139:66863` |
| 2 | **Exit modal gives the destructive action primary emphasis** — "Exit" is the solid cyan button, "Continue editing" is secondary | `139:67151` |
| 3 | **Resource list copy is placeholder** — six rows all read "Lorem ipsum" | `139:67144` |
| 4 | **Dashboard tab strip is offset by −6.5 px** vs the Practitioners screen (tabs start at x −6.5 instead of 0) | `139:66388` vs `139:66595` |
| 5 | **Select-card pitch is inconsistent** on step 13 — first card 54 h with 58/60/60 pitch vs the 56 h / 60 px standard | `139:67181`–`67184` |
| 6 | **Misleading layer/variant names throughout** — registration screens named `Money dashboard`, questionnaire steps named `Child registration`, an onboarding prompt using `dialog card - error`, enabled rows using `action xl icon disabled`, a Community tab named `Club tab - purple` | many |
| 7 | Frame names use two different step-numbering schemes (`step 4/7/9/10–13` in layer names vs "Step 1/2/3 of 3" in the rendered UI) — hard to map without opening each frame | `139:66461`, `139:66535`, `139:66554`, `139:66907`, `139:66921`, `139:67154`, `139:67174` |

## 10. Extraction gaps

| Gap | Reason | How to close |
|---|---|---|
| No PNGs on disk | Egress proxy returns **403 on CONNECT to `www.figma.com`**, so `curl` of Figma asset URLs always fails | Run extraction where figma.com is allow-listed, or capture from the Figma desktop app. Screens were instead rendered inline (base64) and transcribed — see §4/§5 |
| 11 of 27 screens rendered visually | Figma MCP seat tool-call limit (30 s back-off + retries used) | Rendered: `139:66377`, `139:66449`, `139:66469`, `139:66535`, `139:66683`, `139:66744`, `139:66863`, `139:67019`, `139:67111`, `139:67151`, `139:67268`. Still to render: `139:66461`, `139:66554`, `139:66582`, `139:66623`, `139:66791`, `139:66907`, `139:66921`, `139:66935`, `139:67154`, `139:67174`, `139:67188`, and the `step3` variants `139:66485`/`66502`/`66519` |
| Un-rendered screens are described from **geometry only** | Follows from the above | Their layout tables are accurate (from XML); their *copy* is unverified |
| Component internals (`dialog card - overlay`, `Select card`, `Informational`, `Title with subtitle`, `Next buttons/Label & single-select`) not expanded | They are library instances; metadata stops at the instance boundary | `get_design_context` / `get_metadata` on the component master nodes |
| Variables pulled from 2 nodes only | Per task scope | Run `get_variable_defs` on `139:66744` (info page) and `139:67111` (resources tab) for any additional tokens |
