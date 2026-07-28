# DBE registration helper screens

The **DBE registration helper** is the in-app assistant that walks a South African ECD principal
through registering their programme with the **Department of Basic Education (DBE)** — the
precondition for receiving the ECD subsidy. It explains the process in plain language, collects a
3-step intake questionnaire (current registration status, certificates held, blockers and funding
pain-points), tracks the principal's position on a **two-stage certification ladder**
(**Apply → Bronze certificate**, **Comply → Silver certificate**) on a dedicated **Registration**
tab in the Business hub, and gives step-by-step "how to register" info pages with links to the
DBE's eCares portal, Form 30, the ECD Info Hub and the DBE's email/WhatsApp help routes. The
helper is **principal-only**, requires a preschool to exist, and is **blocked for trial users**.

**Source pages:** Figma `8s2xe3EyBRhrzDFy93NbfN`, two canvases covering the same feature.

| Page | Canvas node | Character | Deep link |
|---|---|---|---|
| "Page 21" | `139:66313` | Earlier working canvas. Same screens, unsectioned; several frames rendered from geometry only, and its step-2 screens are unlabelled duplicates. | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-66313 |
| "Page 23" | `145:20658` | **Authoritative.** Organised into 7 numbered bands, every band stamped **"Approved"**. Adds the certificate semantics (Bronze/Silver/Gold/None), the *Update my stage* screen, the "Other → detail" reveal on Challenges, and the hub notification card. | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-20658 |

**Rule for readers: where the two pages disagree, Page 23 (`145:*`) wins.** Page 21 node IDs are
kept throughout so devs can still deep-link the older frames; every material difference is called
out in §2 and §7.

Page 23's seven approved bands: **1.** Initial form (`145:21495`) · **2.** Landing screen
variations (`145:21496`) · **3.** Info screens (`145:21497`) · **4.** Update my stage
(`145:21505`) · **5.** Notifications (`145:21579`) · **6.** Add to Community > Resources
(`145:21596`) · **7.** Trial user exception (`145:21597`).

> **Terminology warning carried from both extractions:** frame and variant names are inherited
> from unrelated flows — the Registration tab frames are named `WO7.4.0 Money dashboard - empty`,
> the questionnaire steps are named `WO4.1.5 Child registration - step N`, the onboarding gate
> uses `dialog card - error`, enabled link rows use `action xl icon disabled`, and the Community
> tab is named `C2.3.0 Club tab - purple`. **Trust the rendered content, never the layer name.**

All frames are **360 dp wide**; 640 dp for fixed screens, 642 / 706 / 750 / 942 / 952 / 1035 /
1066 / 1076 dp where the screen scrolls. Content column is **328 dp at x = 16**
(`size.contentWidth`, `space.screenMargin`).

---

## 1. Flow map

```
 DISCOVERY (three entry points)
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ A. Community ▸ Resources tab      p23 145:21598   p21 139:67111         │
  │    Informational card "DBE registration helper" ▸ [Learn more]          │
  │ B. Hub notification card          p23 145:21594   (p21: note only)      │
  │    "Learn about DBE registration" ▸ [Get started]                       │
  │ C. Business ▸ Registration tab banner ▸ [Start]                         │
  └───────────────────────────────┬─────────────────────────────────────────┘
                                  │
              ┌───────────────────┴────────────────────┐
              │ GATES (evaluated before the intro)     │
              │  · trial user  ──► blocked entirely    │  note 145:21748 / 139:67267
              │  · no preschool ─► DBE-D2 "Set up your │  p23 145:21755
              │                    preschool!" pop-up  │  p21 139:67268
              │                    [Set up preschool]  │
              │                    [Do this later] ────┼──► soft dismiss, back
              │  · not a principal ─► not shown        │  note 145:21587
              └───────────────────┬────────────────────┘
                                  ▼
              DBE-01 Helper intro   p23 145:20936 · p21 139:66449
              "What is ECD registration?"  ▸ [Start]
                                  │
  ┌───────────────────────────────┼─────────────────────────────────────────┐
  │ INTAKE QUESTIONNAIRE — 3 steps                                          │
  │                                                                         │
  │  DBE-02  Step 1 of 3 · "Registration information"                       │
  │     p23 145:20948 (empty) → 145:21022 (answered) → 145:21041 (Next on)  │
  │     p21 139:66461 (Next off) · 139:66535 (answered) · 139:66554 (on)    │
  │       · segmented: "Are you receiving a subsidy from the DBE?"          │
  │         Yes / No / Not sure                                             │
  │       · reveals 5 radios: "Are you registered with the DBE?"            │
  │                       │ [Next]                                          │
  │                       ▼                                                 │
  │  DBE-03  Step 2 of 3 · "Certificate information"                        │
  │     p23 145:21408 (none) → 145:21641 ("None" exclusive row)             │
  │                          → 145:21661 (selected)                         │
  │     p21 139:66907 · 139:66921 · 139:67154 · 139:67174                   │
  │       · checkboxes: ☐ Bronze ☐ Silver ☐ Gold ☐ None                     │
  │                       │ [Next]                                          │
  │                       ▼                                                 │
  │  DBE-04  Step 3 of 3 · "Challenges"                                     │
  │     p23 145:20956 (empty) → 145:21006 (option picked, Save on)          │
  │                          → 145:20972 ("Other" → detail field, Save off) │
  │                          → 145:20989 (complete, Save on)                │
  │     p21 139:66469 · 66519 · 66485 · 66502                               │
  │       · 7 radios: biggest DBE-registration blocker                      │
  │       · "Other" reveals "Please give more detail"                       │
  │       · optional long-text: biggest funding issue                       │
  │                       │ [Save]                                          │
  └───────────────────────┼─────────────────────────────────────────────────┘
        [✕] at any step ──┴──► DBE-D1 Exit modal  p23 145:21638 · p21 139:67151
                                "Are you sure you want to exit?"
                                [Exit] (discards) / [Continue editing]
                          │
                          ▼  toast "Information added"
   BUSINESS ▸ REGISTRATION TAB (journey tracker)
   ┌──────────────────┬────────────────────────┬──────────────────────────┐
   │ DBE-05 not       │ DBE-06 Bronze achieved │ DBE-07 fully registered  │
   │ started          │ (Apply done)           │                          │
   │ p23 145:21170 ᵗ  │ p23 145:21278          │ p23 145:20864            │
   │     145:21110    │     145:21422 ᵗ        │     145:21506 ᵗ          │
   │ p21 139:66683 ᵗ  │ p21 139:66791          │     145:21675 ᵗ (dates)  │
   │     139:66623    │     139:66935          │ p21 139:66377            │
   │     139:67188    │                        │     139:67019 ᵗ (dates)  │
   │ Apply ○ [Info]   │ Apply ✔ [View]         │ Apply ✔ [View]           │
   │ Comply ○ [Info]  │ Comply ○ [Info]        │ Comply ✔ [View]          │
   │ banner [Start]   │ banner [Start]         │ banner [See resources]   │
   └────────┬─────────┴───────────┬────────────┴──────────┬───────────────┘
            │  per-stage [Info] / [View]                  │
            ├─────────────────────┬───────────────────────┘
            ▼                     ▼
   DBE-08 APPLY info page   DBE-09 COMPLY info page
   p23 145:21231            p23 145:21350
   p21 139:66744            p21 139:66863
   Step 1 Sign up for eCares      Step 1 Check your venue
   Step 2 Gather documents        Step 2 Gather documents
   Step 3 Get Bronze cert         (1 year from Bronze to finish)
   [Register for eCares]          [Complete health & safety check]
   [Download Form 30]             [Visit the ECD Info Hub]
   [Log in to eCares]             [Download the guide]
   [Need help? → email / WhatsApp]  [Need help? → email / WhatsApp]
   [I have my bronze certificate]   [I have my silver certificate]
            └──────── self-declare ────────┘
                          │
                          ▼ toast "Stage updated" → back to the Registration tab

   Registration tab footer [Update my stage]
            ▼
   DBE-10 Update my stage · Step 1 of 1     p23 145:21394   (absent on p21)
   "Which certificates have you received?"  ☐ Bronze ☐ Silver ☐ Gold ☐ None
   pre-ticked with everything previously selected — but NEVER auto-tick "None"
            │ [Save] → toast "Stage updated"; stepper subtitles switch to dates
            ▼
   back to the Registration tab (DBE-06 / DBE-07)

   ᵗ = frame includes the green success toast
```

### Happy path (numbered)

1. A principal with a preschool sees the **hub notification card** (`145:21594`) or the
   **Community ▸ Resources** promo card (`145:21598`) and taps **[Get started]** / **[Learn
   more]**.
2. **DBE-01 Helper intro** (`145:20936`) explains what registration is → **[Start]**.
3. **DBE-02 Step 1 of 3 — Registration information** (`145:20948`): answer the subsidy segmented
   control; answering it reveals the "Are you registered with the DBE?" radio group
   (`145:21022`). Once both are answered **[Next]** enables (`145:21041`).
4. **DBE-03 Step 2 of 3 — Certificate information** (`145:21408`): tick every certificate held —
   **Bronze**, **Silver**, **Gold** — or **None** (mutually exclusive). **[Next]**.
5. **DBE-04 Step 3 of 3 — Challenges** (`145:20956`): pick one blocker from 7 radios; picking
   **Other** reveals a *"Please give more detail"* field (`145:20972`) that must be filled before
   Save enables. The funding long-text is optional. **[Save]**.
6. Land on the **Business ▸ Registration** tab with the green toast **"Information added"**
   (`145:21170`). The stepper reflects the certificates declared in step 4 — not started
   (DBE-05), Bronze only (DBE-06) or both (DBE-07).
7. Tap **[Info]** (stage not achieved) or **[View]** (achieved) beside a stage → the **Apply**
   (`145:21231`) or **Comply** (`145:21350`) info page, follow the numbered steps and external
   links, then tap **[I have my bronze/silver certificate]** to self-declare.
8. Return to the tab with the toast **"Stage updated"** (`145:21422` / `145:21506`); the tick
   fills and the trailing pill flips from **Info** to **View**.
9. Later corrections go through the footer **[Update my stage]** → **DBE-10** (`145:21394`),
   pre-ticked with everything previously selected, then **[Save]** → **"Stage updated"**; the
   stepper subtitles switch from a description ("Bronze certificate") to the **award date**
   ("30 July 2024") — `145:21675` / `139:67019`.

### Branches

- **B1 — Exit mid-questionnaire.** The **✕** in the app bar on any of the three steps opens
  **DBE-D1** (`145:21638`): *"If you exit now your changes will not be saved."*
  **[Exit]** discards the whole intake; **[Continue editing]** dismisses.
- **B2 — No preschool yet.** Any entry point opens **DBE-D2** (`145:21755`) instead of the intro:
  *"Set up your preschool!"* → **[Set up preschool]** (deep-links to profile setup) or
  **[Do this later]** (soft dismiss — the gate is **non-blocking**, the user returns to where
  they were).
- **B3 — Trial user.** The helper is unavailable entirely (note `145:21748` / `139:67267`). The
  discovery cards and the Registration tab must not be shown; if reached by deep link, fall back
  to DBE-D2 / an upgrade prompt.
- **B4 — Comply before Bronze.** The Comply info page carries the constraint *"You have one year
  from your Bronze certificate to complete this stage."* — the deadline needs the Bronze date, so
  a user with no Bronze sees the page but has no countdown. See §6.4.
- **B5 — Gold certificate.** Gold appears in the certificate picker (`145:21408`, `145:21394`)
  but **has no info page and no stepper row** on either canvas. Capture it; do not render a third
  stage until design supplies one.

---

## 2. Screen inventory

`p23` = the authoritative Page 23 node (`145:*`); `p21` = the corresponding Page 21 node
(`139:*`). Deep-link base:
`https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=<id-with-dash>`

| Code | Screen name (rendered) | Figma node (p23) | Figma node (p21) | Size (dp) | State / variant | Purpose |
|---|---|---|---|---|---|---|
| DBE-00a | Community ▸ Resources tab (`C2.3.0 Club tab - purple`) | `145:21598` | `139:67111` | 360 × 640 | — | Discovery: helper promo card + 6 placeholder resource rows |
| DBE-00b | Hub notification card (`Frame 1487` / `with link`) | `145:21594` | — *(note `139:67093` only)* | 328 × 193 | — | Discovery: "Learn about DBE registration" ▸ [Get started] |
| DBE-01 | Helper intro (`W1.1.0 Profile setup - welcome screen`) | `145:20936` | `139:66449` | 360 × 640 | — | "What is ECD registration?" + Cebisa mascot + [Start] |
| DBE-02 | Step 1 of 3 — Registration information | `145:20948` | `139:66461` | 360 × 640 | unanswered, Next disabled | Subsidy question only |
| DBE-02 | Step 1 of 3 — Registration information | `145:21022` | `139:66535` | 360 × 640 | subsidy answered, DBE-status radios revealed | Full step 1 |
| DBE-02 | Step 1 of 3 — Registration information | `145:21041` | `139:66554` | 360 × 640 | complete, **Next enabled** | Enabled pair |
| DBE-03 | Step 2 of 3 — Certificate information | `145:21408` | `139:66907` / `139:66921` | 360 × 640 | 4 select cards, none ticked | Bronze / Silver / Gold / None |
| DBE-03 | Step 2 of 3 — Certificate information | `145:21641` | `139:67154` | 360 × 640 | 4th row = bespoke exclusive **"None"** checkbox | Mutually-exclusive row spec |
| DBE-03 | Step 2 of 3 — Certificate information | `145:21661` | `139:67174` | 360 × 640 | selected state (checked row is 54 dp) | Checked treatment |
| DBE-04 | Step 3 of 3 — Challenges (`step3`) | `145:20956` | `139:66469` | 360 × 952 | nothing selected, **Save disabled** | 7 radios + funding textarea |
| DBE-04 | Step 3 of 3 — Challenges | `145:21006` | `139:66519` | 360 × 942 | standard option selected, **Save enabled** | — |
| DBE-04 | Step 3 of 3 — Challenges | `145:20972` | `139:66485` | 360 × 1035 | **"Other" selected** → detail field revealed, Save disabled | Conditional field |
| DBE-04 | Step 3 of 3 — Challenges | `145:20989` | `139:66502` | 360 × 1035 | "Other" + both texts filled, **Save enabled** | — |
| DBE-05 | Registration tab — not started | `145:21170` | `139:66683` | 360 × 640 | + green toast **"Information added"** | Post-intake landing |
| DBE-05 | Registration tab — not started | `145:21110` | `139:66623` / `139:67188` | 360 × 640 | no toast, **[Update my stage]** footer | Steady state |
| DBE-06 | Registration tab — Bronze achieved | `145:21278` | `139:66791` / `139:66935` | 360 × 640 | Apply ✔ / Comply ○ | Mid-ladder state |
| DBE-06 | Registration tab — Bronze achieved | `145:21422` | — | 360 × 640 | + toast **"Stage updated"** | Returning from Apply info page |
| DBE-07 | Registration tab — completed | `145:20864` | `139:66377` | 360 × 640 | both ✔, subtitles = certificate names | Celebratory state |
| DBE-07 | Registration tab — completed | `145:21506` | — | 360 × 640 | + toast **"Stage updated"** | Post-save |
| DBE-07 | Registration tab — completed, dates | `145:21675` | `139:67019` | 360 × 640 | subtitles = **award dates**, + toast | Post "Update my stage" |
| DBE-08 | "Apply" info page (`WO7.5.0 General info page`) | `145:21231` | `139:66744` | 360 × 1066 | — | 3 steps → Bronze + [I have my bronze certificate] |
| DBE-09 | "Comply" info page (`WO7.5.0 General info page`) | `145:21350` | `139:66863` | 360 × 1076 | — | 2 steps → Silver + [I have my silver certificate] |
| DBE-10 | Update my stage — Step 1 of 1 | `145:21394` | — **(absent on Page 21)** | 360 × 640 | certificate picker, Save disabled | Re-declare certificates |
| DBE-D1 | Exit modal | `145:21638` | `139:67151` | 360 × 642 (card 328 × 307) | — | Confirm discard |
| DBE-D2 | "Set up your preschool!" pop-up (`W3.2.1 Profile - Preschool - pop-up`) | `145:21755` | `139:67268` | 360 × 640 (card 328 × 379) | — | Preschool / trial gate |
| ctx-1 | Practitioners (Staff tab) | `145:21069` | `139:66582` | 360 × 750 | context only | Shows the sibling Business tab |
| ctx-2 | Hub page (symbol) | `145:21056` | `139:66569` | 360 × 640 | component symbol | Where the notification card lands |
| — | Loose `with link` card component | — | `139:67107` | 328 × 193 | — | Same component as DBE-00b |

### Annotation-only frames (no UI)

| Note | p23 | p21 |
|---|---|---|
| "Form" (section marker) | `145:21049` | — |
| "Three variations with Apply → Comply" | `145:21498` | `139:67011` (text `139:67017`) |
| "Info screens" | `145:21103` | `139:66616` (text `139:66622`) |
| "Update my stage / show ALL previously selected certificates…" | `145:21096` | `139:66609` (text `139:66615`) |
| "Add hub notification / Priority level: see in use case doc" | `145:21580` | `139:67093` (text `139:67099`) |
| "Principal only / Trigger / After user has created a preschool / End Q1, 2, 3…" | `145:21587` | `139:67100` (text `139:67106`) |
| "Trial users cannot access the registration helper" | `145:21748` | `139:67261` (text `139:67267`) |

### Where the two pages differ or duplicate

| # | Difference | Resolution |
|---|---|---|
| 1 | **Step 2 semantics.** Page 21 documents four unlabelled `Select card` screens (`139:66907`, `66921`, `67154`, `67174`) and reads the 4th row of `139:67154` as an inline **"Other"** checkbox. Page 23 labels the same screens **"Certificate information"** with options **Bronze / Silver / Gold / None**, and the bespoke 4th row is **"None"**. | **Page 23 wins.** The bespoke row is the mutually-exclusive **None** option, not "Other". |
| 2 | **Update my stage screen.** Only Page 23 has it (`145:21394`). Page 21 has the *note* (`139:66615`) and the *button* on the dashboard but no screen. | Build from `145:21394`. |
| 3 | **Hub notification card.** Only Page 23 draws it (`145:21594`). Page 21 has the annotation `139:67099` and a loose identical component (`139:67107`). | Build from `145:21594`. |
| 4 | **Challenges "Other" branch.** Only Page 23 spec's the revealed *"Please give more detail"* field and the Save-gating (`145:20972` → `145:20989`). Page 21's four `step3` variants differ only in height. | Build from Page 23. |
| 5 | **Bronze-achieved landing.** Page 23 renders it fully (`145:21278`, banner *"Good job, you have your Bronze certificate!"* on `role.actionSubtle`). Page 21's in-progress frames (`139:66791`, `139:66935`) were never rendered — geometry only. | Build from `145:21278`. |
| 6 | **Toast coverage.** Page 23 attaches "Stage updated" to three landing variants (`145:21422`, `145:21506`, `145:21675`); Page 21 attaches it only to `139:67019`. | Same toast, three contexts — see §5. |
| 7 | **Comply app-bar copy bug** — both pages render the Comply info page's app bar as **"DBE registration - Apply"**. | Confirmed defect on both canvases. Ship as **"DBE registration - Comply"**. |
| 8 | **Dashboard tab strip x-offset.** On both pages the Registration-tab frames start the tab strip at **x = −6.5**, while the Practitioners frame starts it at **x = 0**. | Drift bug. Align to **0**. |
| 9 | **Select-card pitch drift.** `139:67174` first card is 54 dp with 58/60/60 pitch; `145:21661`/`145:21668` also shows 54 dp for the checked row. | 54 dp is the **checked** row (border treatment), 56 dp unchecked. Normalise the *box* to 56 dp and apply the border inside it. |
| 10 | **Everything else** — intro, step 1, step 3 base, both info pages, exit modal, preschool gate, resources tab, practitioners context — is **duplicated 1:1** across the two canvases. | Use the Page 23 node; the Page 21 node is a redundant earlier copy. |

---

## 3. Screen specs

Shared chrome and layout constants (identical on both canvases):

| Constant | Value |
|---|---|
| Page gutter | **16 dp** (`space.screenMargin`) |
| Content width | **328 dp** (`size.contentWidth`) |
| App bar | **64 dp** (`size.appBar`) |
| Tab bar | **56 dp** (`size.tabBar`) + 1 dp bottom border |
| Language selector strip | **74 dp** (`size.languageSelector`) |
| Bottom CTA dock (`Form Layout`) | y **568**, **72 dp** high; button 328 × 40 inset 16/16 |
| Full-width button | **40 dp** (`size.buttonHeight`), `radius.lg` |
| Small button | **32 dp** (`size.buttonSmallHeight`), `radius.md` |
| Dialog card | 328 dp wide, 16 dp padding → **296 dp** content (`size.dialogContentWidth`) |
| Journey step pitch | **66 dp** (42 dp content + 24 dp gap) |
| Radio row pitch | **56 dp** (52 dp row) / **76 dp** (72 dp two-line row) — 4 dp gutter (`space.listGap`) |
| Select-card pitch | **60 dp** (56 dp row) — 4 dp gutter |
| Practitioner row pitch | **84 dp** (80 dp row) — 4 dp gutter |
| Resource-link row pitch | **62 dp** (56 dp row) — 6 dp gutter |

| Element | Component | Colour |
|---|---|---|
| App bar | **App bar** — `Title with subtitle` | fill `role.appBar`; back chevron, title (`typescale.h3`), subtitle (`typescale.help`) and trailing **✕** all `role.onAppBar`; the **?** help affordance is a circular `role.action` chip |
| Tabs | **Tabs** — `Tabs - business`, underline style | bar `role.background`; active label + 2 dp underline `role.action`; inactive `role.textMid`; border `role.line` |
| Page Title | **Page Title** | `typescale.h2`, `role.textDark`, x 16 |
| Footer | **Form Layout** | 1 dp `role.line` divider + button |
| Primary button | **Primary button** | fill `role.action`, label `typescale.button` in `role.onAction`, `elevation.button`; **disabled** fill `role.actionDisabled` with the label still `role.onAction` |
| Secondary button | **Secondary button** | `role.surface` fill, 2 dp `role.action` border, `role.action` label, no shadow |
| Small trailing pill | **Small secondary button** | fill `role.selectSubtle`, label `typescale.buttonSmall` in `role.select`, 51 × 32, `radius.md` |
| Input / row surface | — | fill `role.background`, `radius.sm` (inputs) / `radius.md` (rows) |

### DBE-00a — Community ▸ Resources tab (`145:21598` / `139:67111`, 360 × 640)

1. **App bar** 360 × 64: back chevron, two-line centre stack **"Community"** / **"20 October
   2024"**, fill `role.appBar`, contents `role.onAppBar`.
2. **Tabs** 360 × 56 at y 64: two 180 dp tabs — **Community** (inactive, `role.textMid`) and
   **Resources** (active, `role.action` label + 2 dp `role.action` underline) on
   `role.background`.
3. **Section header** at y 128, 328 dp at x 16: 48 dp `Icon circle` (`radius.xxl`) filled
   `role.select` with a white 22 dp two-person "connect" glyph at x 0/y 8, plus title
   **"Connect"** (`typescale.h2`, `role.textDark`) at x 60/y 18.
4. **Dashed hairline** 328 × 1 at x 16, y ≈ 190–197, `role.line`.
5. **Informational banner** — 328 × 160 at x 16, y 216, `radius.md`, fill `status.info.bg`;
   20 dp ⓘ icon `status.info.main` at (16, 16); title **"DBE registration helper"**
   (`typescale.h4`, `status.info.dark`); body **"Not sure where to start with DBE registration?
   The app guides you through the steps."** (`typescale.help`, `role.textMid`); then a
   **small primary button** with a ➜-in-circle glyph: **"Learn more"** → DBE-01 (via the gates).
6. **Resource link list** — 328 × 366 at x 16, y 394: six rows 328 × 56 on a **62 dp pitch**,
   fill `role.background`, `radius.md`, label at x ≈ 16 (`typescale.h4`, `role.textDark`) and a
   24 dp external-link glyph at x ≈ 300 (`role.textMid`).
   > **All six rows read "Lorem ipsum" on both canvases — placeholder content.** Do not ship;
   > the resource list copy is still to be written. The component variant is named
   > `action xl icon disabled` but the rows render **enabled** — treat them as normal link rows.

### DBE-00b — Hub notification card (`145:21594`, 328 × 193)

A single `with link` **Action panel** card injected into the hub's notification feed, fill
`role.background`, `radius.md`, 16 dp padding:

1. Heading **"Learn about DBE registration"** — `typescale.h2`, `role.textDark`.
2. Body **"DBE registration is the first step to getting the ECD subsidy. The app can guide you
   through the steps."** — `typescale.body`, `role.textMid`.
3. Full-width **Primary button** 296 × 40 with a ➜-in-circle glyph: **"Get started"** → DBE-01.

Trigger rules live in §6.6 (principal-only, after preschool creation, quarter-end re-fire).

### DBE-01 — Helper intro (`145:20936` / `139:66449`, 360 × 640)

| y | h | Element |
|---|---|---|
| 0 | 64 | **App bar** — back chevron + centred **"DBE registration helper"**, fill `role.appBar` |
| 20 | 24 | Trailing `Icon right` 24 × 24 at x 320 (`role.onAppBar`) — close/help affordance |
| 64 | 180 | `Graphic overlay Medium` — full-width hero band, fill `role.appBar`, faint large outline circles as watermark (see `foundations/illustration-imagery.md`) |
| 88 | 183 | **Dialog card - Cebisa**, 328 dp at x 16, floating over the band: fill `role.background`, `radius.md`, `elevation.base`. Centred ~100 dp circular **Cebisa** mascot (yellow `palette.quinary` circle, robot with `role.select` heart body) over the caption **"Your guide to DBE registration"** (`typescale.h4`, `role.textDark`) |
| 314 | 233 | Body block, 328 dp at x 16 — **Page Title** (33 dp): **"What is ECD registration?"** (`typescale.h2`, `role.textDark`); then `Detail` (192 dp): **"Registration means your programme is officially recognised by the Department of Basic Education (DBE). It is the first step to getting the ECD subsidy."** (`typescale.body`, `role.textMid`) followed by the emphasised line **"This app shows you the steps. You will need to submit your information to the DBE."** (`typescale.bodyMedium`, `role.textDark`) |
| 555 | 32 | `small secondary trailing icon` 105 × 32 — **hidden** in both files (a suppressed "skip"). Do not build unless design re-enables it |
| 568 | 72 | **Form Layout** footer — divider + **Primary button** 328 × 40 at (16, 16) with a ➜-in-circle glyph: **"Start"** → DBE-02 |

### DBE-02 — Step 1 of 3, "Registration information" (`145:20948` → `145:21022` → `145:21041`)

| y | h | Element |
|---|---|---|
| 0 | 64 | **App bar** — back chevron left, **"DBE registration helper"** over subtitle **"Step 1 of 3"** centred, **✕** right (`role.onAppBar`) → **DBE-D1** |
| 78 | 33 | **Page Title** — **"Registration information"** (`typescale.h2`, `role.textDark`) |
| 111 | 100 | `Form Layout` wrapper |
| 127 | 68 | **Segmented single-select**, 328 dp at x 16: label **"Are you receiving a subsidy from the DBE?"** (`typescale.h4`, `role.textDark`) over a 3-segment row filling 328 dp with ~4 dp gaps, each segment 40 dp, `radius.md` — **Yes** / **No** / **Not sure**. Resting: fill `role.selectSubtle`, label `typescale.chip` in `role.select`. Selected: fill `role.select`, label `typescale.chipActive` in `role.onSelect` |
| 227 | 320 | **Revealed on answer** (`145:21022`): question block 328 dp at x 16 — `Label` (20 dp) **"Are you registered with the DBE?"** (`typescale.h4`, `role.textDark`) then **5 radio rows** at local y 24 / 80 / 136 / 192 / 268 |
| ↳ | 52 | "Yes - fully registered" |
| ↳ | 52 | "Yes - conditionally registered" |
| ↳ | 52 | "No - I started the process of registering" |
| ↳ | **72** | "No - I have not started the process of registering" *(wraps to 2 lines)* |
| ↳ | 52 | "I'm not sure" |
| 568 | 72 | **Form Layout** footer — **Primary button** with a ➜-in-circle glyph: **"Next"**. `role.actionDisabled` until both questions are answered (`145:20948`), then `role.action` (`145:21041`) |

**Radio row spec** (used here and on DBE-04): 328 dp wide, fill `role.background`, `radius.md`,
52 dp (1 line) or 72 dp (2 lines), **4 dp gutter** → 56 / 76 dp pitch. **Radio control**
(components.md §4) 24 dp at x ≈ 16, 2 dp `role.textLight` border unselected / `role.action` ring
+ 12 dp dot selected. Label from x ≈ 56–60, `typescale.body`, `role.textMid` unselected →
`role.textDark` selected. **Whole row is the tap target** (≥ 48 dp).

A nested duplicate `Form Layout` (`145:21033` / `139:66546`) is **hidden** in both files — it is
the CTA copy kept for the scrolling variant. Ignore it.

### DBE-03 — Step 2 of 3, "Certificate information" (`145:21408` / `145:21641` / `145:21661`)

| y | h | Element |
|---|---|---|
| 0 | 64 | **App bar** — **"DBE registration helper"** / **"Step 2 of 3"**, back + **✕** |
| 78 | 33 | **Page Title** — **"Certificate information"** |
| 127 | 40 | `Label` 328 dp at x 16, **2 lines** — **"Have you received any of these certificates?"** (`typescale.h4`, `role.textDark`) |
| 183 | 240 | `Children list` 328 dp — **four `Select card` rows**, 328 × 56 at local y 4 / 64 / 124 / 184 → **60 dp pitch, 4 dp gutter** |
| — | 56 | Each row: fill `role.background`, `radius.md`; **Checkbox** 16 dp square at x 16 (2 dp `role.action` outline unchecked; `role.action` fill + white check when checked); label at x 48, `typescale.h4`, `role.textMid` → `role.textDark` when checked. Options in order: **Bronze**, **Silver**, **Gold**, **None** |
| 568 | 72 | Footer — **Primary button** **"Next"**, disabled until ≥ 1 option is ticked |

**Selected treatment** (`145:21661`): the checked row renders 54 dp in Figma because a 2 dp
`role.action` border is drawn inside the 56 dp box, with the fill tinted to `role.actionSubtle`.
**Build a fixed 56 dp box** and draw the border inside it — do not change the row height.

**"None" is a bespoke, mutually-exclusive row** (`145:21641` / `139:67154`): a hand-built 328 × 54
frame with a real 16 × 16 `Form Fields/Checkbox input` at (16, 19) and its label at x 48, plus a
hidden `Check circle` icon group for the checked state. Behaviour: ticking **None** clears
Bronze/Silver/Gold; ticking any certificate clears **None**.

### DBE-10 — Update my stage, Step 1 of 1 (`145:21394`, 360 × 640)

Structurally identical to DBE-03 with three deltas:

| y | h | Element |
|---|---|---|
| 0 | 64 | **App bar** — **"Update my stage"** / **"Step 1 of 1"**, back + **✕** |
| 78 | 33 | **Page Title** — **"Certificate information"** |
| 127 | **20** | `Label`, **1 line** — **"Which certificates have you received?"** (so the list starts **20 dp higher**, at y 163) |
| 163 | 240 | Same four `Select card` rows — **Bronze · Silver · Gold · None** |
| 568 | 72 | Footer — **Primary button** **"Save"** (not "Next"), disabled until the selection differs from nothing |

**Pre-selection rule (designer note `145:21096` / `139:66615`, verbatim):** *"Update my stage —
Show ALL previously selected certificates as selected (exception: don't auto-select "None" if that
was selected before)."* See §6.3.

### DBE-04 — Step 3 of 3, "Challenges" (`145:20956`, 360 × 952; tallest screen)

| y | h | Element |
|---|---|---|
| 0 | 64 | **App bar** — **"DBE registration helper"** / **"Step 3 of 3"**, back + **✕** |
| 78 | 33 | **Page Title** — **"Challenges"** |
| 136 | 512 | Question block 328 dp at x 16 |
| ↳ 0 | 40 | `Label`, 2 lines — **"What is the biggest challenge you face with DBE registration right now?"** (`typescale.h4`, `role.textDark`) |
| ↳ 44 | 52 | radio — "I don't know where to start" |
| ↳ 100 | 72 | radio — "The process takes too long or is too complicated" |
| ↳ 176 | 72 | radio — "I don't understand what requirements or documents I need" |
| ↳ 252 | 72 | radio — "I don't have or cannot get the right documents" |
| ↳ 328 | 52 | radio — "I cannot reach the officials who can help" |
| ↳ 384 | 72 | radio — "I don't have the infrastructure or resources to meet requirements" |
| ↳ 460 | 52 | radio — **"Other"** |
| 675–811 | 184 | **Long text input** 328 dp at x ≈ 18: label above, 3 lines — **"What is the biggest issue you are facing when it comes to funding for your ECD programme?"** (`typescale.h4`, `role.textDark`); textarea fill `role.background`, `radius.sm`, placeholder **"Add text…."** in `role.textLight` |
| 880 | 72 | Footer — **Primary button** with a save/disk glyph: **"Save"**, disabled until a radio is chosen |

**"Other" branch** (`145:20972`, 360 × 1035): selecting **Other** turns that row into the checked
treatment (2 dp `role.action` border, `role.actionSubtle` fill, filled radio) and **inserts a new
field** above the funding textarea:

- `inactive` input 328 × 72 at x ≈ 18, y 676 — label **"Please give more detail"**, placeholder
  **"Add text…."**;
- the funding long-text moves down to y 771;
- **Save stays disabled until the detail field is non-empty** (`145:20989` shows the completed
  state with sample copy *"Example of an answer here…."* and *"Example of text typed in here"*).

Non-"Other" selection (`145:21006`, 360 × 942): no detail field, Save enabled immediately — so
the **funding textarea is optional**.

### DBE-05 / DBE-06 / DBE-07 — Business ▸ Registration tab (dashboard, 360 × 640)

Frame name is `WO7.4.0 Money dashboard - empty` on both canvases; **the content is the
registration journey tracker**, not money.

| y | h | Element |
|---|---|---|
| 0 | 64 | **App bar** — back chevron, two-line centre stack **"Business"** / **"Monday, 7 December"**, trailing circular **?** help chip filled `role.action` with a `role.onAction` glyph. Fill `role.appBar` |
| 64 | 56 | **Tabs** (`Tabs - business`) — **four** tabs: **Staff** (66 dp) · **Money** (79 dp) · **Registration** (122 dp, **active**) · **Resources** (106 dp). Active label + 2 dp underline `role.action`; inactive `role.textMid`; bar `role.background`. *Both canvases start this strip at x = −6.5; align to **0** (see §2 diff 8)* |
| 120 | 36 | **Page Title** — **"DBE registration helper"** (`typescale.h2`, `role.textDark`, left inset 16) |
| 164–168 | 132–168 | **Status banner** — 328 dp at x 16, `radius.md`. Per state, see the table below. Carries a **hidden 22 dp ✕** at x 281 → the banner **is dismissible**; build the dismiss |
| 340–356 | 197–213 | **Journey stepper** — 328 dp at x 16 (component is reused from "Antenatal visits") |
| 568–584 | 72 | Footer — **Secondary button** 328 × 40 at x 16 with a clipboard glyph: **"Update my stage"** → DBE-10. Replaced/overlaid by the toast in the toast-bearing variants |

**Journey stepper anatomy** (`145:21310` / `139:66395`): a `Steps` frame 328 × 108 holding two
`Text and image question` rows at y 0 and y **66** (**66 dp pitch** = 42 dp content + 24 dp gap).
Each row:

- **Step circle** 32 × 32 at x 4 — achieved: fill `status.success.main` with a white 20 dp check
  inset 6; pending: `status.success.bg` fill with a `status.success.main` ring, no check.
- **Connector** — 0.5 dp vertical rail at x 19.5 from y 8 to y 92 (84 dp), `status.success.main`.
- **Content** at x 56, 201 × 42 — title (22 dp line, `typescale.h4`, `role.textDark`) over
  subtitle (20 dp line, `typescale.help`, `role.textMid`).
- **Trailing pill** at x 277, 51 × 32 — **Small secondary button**, fill `role.selectSubtle`,
  label `typescale.buttonSmall` in `role.select`: **"Info"** when the stage is not achieved,
  **"View"** when it is. Both open the matching info page (DBE-08 / DBE-09).

**Two further stepper rows (`145:20907`, `145:20917`) are hidden** — the component supports up to
**4 stages**. Build it n-row data-driven; only two are used today (Gold has no stage).

State-by-state content:

| State | Node (p23 / p21) | Banner | Banner CTA | Stepper | Footer |
|---|---|---|---|---|---|
| **DBE-05 not started** | `145:21170` ᵗ / `145:21110` · `139:66683` ᵗ / `139:66623` / `139:67188` | **Informational** variant: fill `status.info.bg`, 20 dp ⓘ `status.info.main`, heading **"Get started with your registration!"** (`typescale.h4`, `status.info.dark`). No body paragraph — shorter card | **Primary button** with a ➜-in-circle glyph: **"Start"** → DBE-01 | Apply ○ *"Get a Bronze certificate"* **[Info]** · Comply ○ *"Meet the standards"* **[Info]** | `145:21110` shows **[Update my stage]**; `145:21170` / `139:66683` show the green toast **"Information added"** over the button area |
| **DBE-06 Bronze achieved** | `145:21278` · `145:21422` ᵗ · `139:66791` / `139:66935` | **Celebratory** variant on `role.actionSubtle` with a smiley mascot: heading **"Good job, you have your Bronze certificate!"**, body **"Get started with the Comply process."** | **"Start"** | Apply ✔ *"Bronze certificate"* **[View]** · Comply ○ *"Meet the standards"* **[Info]** | **[Update my stage]**; `145:21422` adds the **"Stage updated"** toast |
| **DBE-07 completed** | `145:20864` · `145:21506` ᵗ · `145:21675` ᵗ · `139:66377` · `139:67019` ᵗ | **Celebratory** variant: fill `status.success.bg`, green mascot avatar left, heading **"Well done, you've completed your registration!"** (`typescale.h4`, `status.success.dark`), body **"Explore more resources for your ECD business."** (`typescale.help`, `role.textMid`) | **Primary button** with a link glyph: **"See resources"** → Community ▸ Resources (DBE-00a) | Apply ✔ *"Bronze certificate"* **[View]** · Comply ✔ *"Silver certificate"* **[View]** — **or**, after "Update my stage", the **award dates**: *"30 July 2024"* / *"3 August 2024"* (`145:21675`, `139:67019`) | **[Update my stage]**; toast-bearing variants show **"Stage updated"** |

**Subtitle rule:** the stage subtitle is the *action* copy while pending ("Get a Bronze
certificate"), the *certificate name* once achieved ("Bronze certificate"), and the **award date**
once the stage has been recorded through **Update my stage** ("30 July 2024"). See §6.3.

**Hidden/parked on every dashboard variant** (do not build): a `Simple striped/Mobile` table
(`145:20880`, `145:21095`, `145:21294`, 360 × 325 at y 404 — leftover from the money template) and
a `Frame 416` gift-icon reward row (`145:20929`).

### DBE-08 — "Apply" info page (`145:21231` / `139:66744`, 360 × 1066)

| y | h | Element |
|---|---|---|
| 0 | 64 | **App bar** — back chevron, title **"DBE registration - Apply"**, **✕** right (dismiss, not just back). Fill `role.appBar` |
| 64 | 74 | **Language selector** strip, fill `role.background`: `Detail` text **"Change Language:"** at x 16 (142 × 24, `typescale.bodyMedium`, `role.textMid`) + a `filtered` dropdown pill 100 × 40 at x 166 reading **"English ▾"** — fill `role.action`, label + chevron `role.onAction`. 1 dp `role.line` hairline at the strip's bottom |
| 80 | 16 | `offline` badge at x 156 — **hidden** while online (`patterns/offline-first.md`) |
| 138 | 851 | `Content` block, 16 dp gutters |
| ↳ 154 | 25 | Section heading **"Apply"** — `typescale.h2`, `role.textDark` |
| ↳ 195 | 92 | **Informational banner** 328 dp at x 16, fill `status.info.bg`, 20 dp ⓘ `status.info.main`, body `typescale.helpStrong` in `status.info.dark`: **"Remember: registration is free. If anyone asks you to pay, contact the DBE."** |
| ↳ 303 | 162 | **Step 1 block** (320 dp): heading **"Step 1: Sign up for eCares"** (`typescale.h4`, `role.textDark`, 22 dp line) → body **"The eCares system allows you to begin your application process."** → body **"If you have not registered for eCares yet, click the link below to register."** (both `typescale.body`, `role.textMid`, 24 dp per line) → **small primary button** 131 × 32 **"Register for eCares"** |
| ↳ 481 | 158 | **Step 2 block**: **"Step 2: Gather and submit documents"** → **"Gather these documents:"** + bulleted list **"Certified copies of ID or passport for yourself and all staff"** / **"Fill in Form 30 for all staff members"** → **small primary button** 129 × 32 **"Download Form 30"** |
| ↳ 655 | 134 | **Step 3 block**: **"Step 3: Get your Bronze certificate"** → **"Log in to eCares and fill in all of the information about your ECD programme. Upload your documents."** → **small primary button** 113 × 32 **"Log in to eCares"** |
| ↳ 805 | 168 | **"Need help?" Informational banner** 328 dp at x 16: 20 dp `Information circle` at (16, 16), content at x 48 (264 dp). Title **"Need help?"** (`typescale.h4`, `status.info.dark`); bullet 1 **"Send an email to: banapele@dbe.gov.za"** (address emphasised, `typescale.bodyMedium`); bullet 2 **"Send "Hi" to the DBE's WhatsApp line"**; then a **small primary button** 134 × 32 with a WhatsApp glyph: **"Go to WhatsApp"**. A dismiss `X circle` exists in the file but is **hidden** |
| 994 | 72 | **Form Layout** footer — full-width **Primary button** 328 × 40 at y 1010 with a check-in-circle glyph: **"I have my bronze certificate"** → self-declare Apply, toast **"Stage updated"**, return to the Registration tab |

**Rhythm:** 16 dp gutters; step heading → body **26 dp**; body → its button ~4 dp below the last
paragraph; **~16–26 dp between step blocks**.

### DBE-09 — "Comply" info page (`145:21350` / `139:66863`, 360 × 1076)

Same template as DBE-08. Deltas:

1. **App bar copy bug on both canvases** — it renders **"DBE registration - Apply"**.
   **Ship "DBE registration - Comply".**
2. Section heading **"Comply"**.
3. Same "Remember: registration is free…" `Informational` banner.
4. **Lead line below the banner** (`typescale.body`, `role.textMid`): **"You have one year from
   your Bronze certificate to complete this stage."**
5. **Step 1: Check your venue** — *"An Environmental Health Practitioner will visit to check that
   your centre is safe and meets the health standards. Use the checklist in the app to prepare
   your venue."* → **small primary button** ~204 × 32 **"Complete health & safety check"**.
6. **Step 2: Gather and submit documents** — *"You will need to submit several documents. A
   social worker will visit to check your documents and how your programme runs. Download the
   guide or visit the ECD Info Hub to see exactly what you need to prepare."* → **two stacked
   small primary buttons** on a ~36 dp pitch: **"Visit the ECD Info Hub"** then **"Download the
   guide"**. This is the only block on either info page with two CTAs.
7. Same **"Need help?"** card (identical email + WhatsApp bullets and button).
8. Footer **Primary button**: **"I have my silver certificate"**.

Only **two** steps here versus three on Apply — the Silver path is venue + documents.

### ctx-1 — Practitioners / Staff tab (`145:21069` / `139:66582`, 360 × 750)

Context only — included on both canvases to show the sibling tab. Not part of this feature, but
it is the **reference for correct tab-strip geometry** (tabs start at x 0, widths 67 / 79 / 120 /
106).

| y | h | Element |
|---|---|---|
| 0 | 64 | App bar — **"Business"** / **"Monday, 12 June"** |
| 64 | 56 | `Tabs - business` — **Staff active** |
| 138 | 348 | Practitioner list 328 dp at x 16 — four rows at y 0 / 84 / 168 / 252 (**84 dp pitch**, 80 dp rows; last row 92 dp when the status wraps), 48 dp initials avatars, status lines colour-coded (`status.error.main` / `status.alert.main` / `status.success.main`) |
| 490 | 260 | `Form Layout` — `with link` card 328 × 172 (**"Practitioner time off"** + **"Record absence/leave"** primary) then a **Secondary button** 328 × 40 **"Add or remove practitioners"** |

---

## 4. Dialogs & popups

Both dialogs use the **Dialog (modal card)** component: full-bleed `role.scrim`, a **328 dp
`role.surface` card at x 16**, `radius.xl`, `elevation.dialog`, 16 dp padding → **296 dp** content,
buttons **296 × 40** stacked primary-above-secondary with a **16 dp gap** (`space.buttonGap`), each
with a leading glyph.

### DBE-D1 — Exit modal (`145:21638` / `139:67151`, 360 × 642; card 328 × 307 at x 16, y 167)

- **Trigger:** the **✕** in the app bar on **any** of the three questionnaire steps (DBE-02,
  DBE-03, DBE-04) — and, by the same pattern, on DBE-10 "Update my stage".
- **Scrim:** `role.scrim`, 360 × **642** — deliberately 2 dp past the 640 frame so it covers a
  scrolled page.
- **Anatomy:**
  1. ~40–44 dp filled circle, `status.alert.main`, white **!** glyph, centred.
  2. Heading, centred: **"Are you sure you want to exit?"** — `typescale.h3`, `role.textDark`.
  3. Body, centred, 2 lines: **"If you exit now your changes will not be saved."** —
     `typescale.body`, `role.textMid`.
  4. **Primary button** 296 × 40 with an exit/logout glyph: **"Exit"** — discards the intake.
  5. **Secondary button** 296 × 40 with a pencil glyph: **"Continue editing"** — dismisses.
- **Design review flag (both canvases):** the **destructive** action has primary emphasis and the
  safe action is secondary. The house pattern is the reverse. Raise with the designer before
  build; if unchanged, ship as drawn but keep the copy explicit about data loss.

### DBE-D2 — "Set up your preschool!" (`145:21755` / `139:67268`, 360 × 640; card 328 × 379 at x 16, y 131)

- **Triggers (both):** a user without a preschool, or a **trial** user, opening the registration
  helper from any entry point. Pairs with notes `145:21587` ("After user has created a preschool")
  and `145:21748` ("Trial users cannot access the registration helper").
- **Scrim:** `role.scrim`, 360 × **790** — overscans the artboard by 150 dp to cover a scrolled
  page.
- **Anatomy** (card padding 16 dp all round → 296 dp content):
  1. 100 dp circular **Cebisa** mascot avatar centred at x 98 — `palette.quinary` circle, robot
     face with `role.select` heart body and `role.action` hands.
  2. Heading at y 112 (296 × 23), centred: **"Set up your preschool!"** — `typescale.h3`,
     `role.textDark`.
  3. Detail at y 147 (296 × 72), centred, 3 lines: **"To use this section, please share some
     details about yourself and your preschool."** — `typescale.body`, `role.textMid`.
  4. **Primary button** 296 × 40 at (16, 259) with a house glyph: **"Set up preschool"** →
     profile/preschool setup.
  5. **Secondary button** 296 × 40 at (16, 315) with a clock glyph: **"Do this later"** — soft
     dismiss; the gate is **non-blocking**.
- **Internal rhythm:** illustration 100 → 12 dp → heading 23 → 12 dp → detail 72 → 16–40 dp →
  primary 40 → 16 dp → secondary 40 → 24 dp bottom padding.
- The layer is named `dialog card - error` on both canvases; it renders as a friendly onboarding
  prompt. Use the **standard dialog**, not the error variant.

### Toasts (inline, not modal frames)

**Snackbar / toast** component: full-bleed bar ~48 dp pinned to the bottom of the viewport,
**over the footer button area**, fill `status.success.main`, white 20 dp check-in-circle icon at
left, label `typescale.helpStrong` in `role.onAction`, white **✕** dismiss at right,
`elevation.lg`, auto-dismiss 4 s (persist while an offline queue is retrying).

| Toast | Trigger | Frames |
|---|---|---|
| **"Information added"** | The 3-step intake questionnaire is saved for the first time | `145:21170`, `139:66683` |
| **"Stage updated"** | Certificates changed — via **[Update my stage]** (DBE-10) **or** via a self-declare button on an info page (**[I have my bronze/silver certificate]**) | `145:21422`, `145:21506`, `145:21675`, `139:67019` |

---

## 5. States & edge cases

| State | Where | Behaviour |
|---|---|---|
| **Permission — trial user** | whole feature | **Blocked.** Note `145:21748` / `139:67267`: *"Trial users cannot access the registration helper."* Hide the Registration tab, the hub notification card and the Community promo card. A deep link must fall back to DBE-D2 / an upgrade prompt, never to a broken screen. |
| **Permission — not a principal** | whole feature | The notification trigger is annotated **"Principal only"** (`145:21587` / `139:67106`). Treat the whole helper as principal-only unless product says otherwise; practitioners should not see the Registration tab. |
| **Gate — no preschool** | any entry point | **DBE-D2** pop-up. `[Do this later]` is a soft dismiss — the user is returned to where they were, not blocked out of the app. |
| **Empty — nothing declared yet** | DBE-05 | Informational banner "Get started with your registration!", both stage circles hollow (`status.success.bg` fill, `status.success.main` ring), both trailing pills read **[Info]**, subtitles show the *action* copy. |
| **Partial — Bronze only** | DBE-06 | Apply row ticked with **[View]**, Comply row hollow with **[Info]**, banner switches to the `role.actionSubtle` "Good job…" celebratory variant. |
| **Complete** | DBE-07 | Both ticked, both **[View]**, `status.success.bg` celebratory banner, CTA changes to **[See resources]**. |
| **Banner dismissed** | DBE-05/06/07 | The banner ✕ is present but hidden in Figma (`145:20934`, `145:21307`) — **build the dismiss** and persist it per user per state so it does not reappear on every launch. Layout below reflows up by the banner height + 16 dp. |
| **Loading** | all | Not drawn. Use the system convention: primary button → `role.actionHover` fill + 16 dp spinner + label; the stepper and lists get skeleton rows at the documented heights. |
| **Offline** | all | The `offline` badge (48 × 16 at x 156, y 80) exists on the info pages, hidden while online. Questionnaire answers and stage self-declarations are **local-first writes that always succeed** and queue for sync (`patterns/offline-first.md`); the success toast copy becomes *"Saved on your phone. Will send when you're back online."* Never block on connectivity. |
| **Offline + external link** | DBE-08 / DBE-09 | eCares, Form 30, the ECD Info Hub, the guide download and the WhatsApp hand-off all leave the app and **need connectivity**. When offline, keep the buttons visible but warn on tap ("You'll need a connection to open eCares") rather than hiding them. |
| **Error** | DBE-02/03/04 | No inline error treatment is drawn — validation is expressed purely as a disabled CTA. If a server rejects a save, surface the standard input error treatment (2 dp `status.error.main` border, message in `status.error.dark`) and keep the local answers. |
| **Exit mid-form** | DBE-02/03/04 | DBE-D1 states changes **are not saved**. The intake is atomic — see §6.3. |
| **Read-only / already declared** | DBE-08 / DBE-09 | Once a certificate is held, the info page's self-declare button is redundant. **Not specified in the design.** Recommended: keep the page reachable via **[View]** but render the self-declare button as *already recorded* (disabled with a check) rather than letting the user re-fire "Stage updated". Confirm with the designer. |
| **Past-date / historic certificate** | DBE-10 | The picker captures **which** certificates are held but **not when**, yet `145:21675` / `139:67019` display award **dates**. There is no date input anywhere on either canvas — see the open question in §6.3(6). |
| **Placeholder content** | DBE-00a | Six "Lorem ipsum" resource rows on both canvases. Must be replaced with real copy before release; ship the list empty rather than shipping lorem ipsum. |
| **Long copy / localisation** | DBE-08 / DBE-09 | Both info pages carry a Language selector; every string on them is translatable and the blocks are height-flexible. Radio rows grow 52 → 72 dp when a label wraps — never truncate a question or an option. |

---

## 6. Business rules for back-end devs

### 6.1 Entities

**`RegistrationProfile`** — one per site (preschool).

| Field | Type | Notes |
|---|---|---|
| `siteId` / `tenantId` | id | primary scoping |
| `subsidyStatus` | enum | `yes` \| `no` \| `not_sure` — DBE-02 segmented control |
| `dbeRegistrationStatus` | enum | `fully_registered` \| `conditionally_registered` \| `started_process` \| `not_started` \| `not_sure` — DBE-02 radios, in the drawn order |
| `certificates` | set | subset of `{ bronze, silver, gold }`, **or** the exclusive marker `none` — DBE-03 / DBE-10 |
| `certificateAwardedOn` | map | `{ bronze?: date, silver?: date, gold?: date }` — surfaced as the stepper subtitle after "Update my stage" (see 6.3.6) |
| `biggestChallenge` | enum | one of the 7 options in DBE-04, in the drawn order; last value is `other` |
| `biggestChallengeOther` | text | required **iff** `biggestChallenge = other` |
| `fundingIssue` | text | **optional** free text (DBE-04 long-text) |
| `intakeCompletedAt` | timestamp | set when the 3-step form is first saved; drives the "Information added" toast |
| `updatedBy`, `updatedAt`, `syncState` | audit | offline queue metadata |

**Derived stage model** (never stored twice — compute from `certificates`):

| Stage | Achieved when | Stepper title / subtitle | Trailing pill | Info page |
|---|---|---|---|---|
| **Apply** | `bronze ∈ certificates` | "Apply" / pending: *"Get a Bronze certificate"* · achieved: *"Bronze certificate"* · after Update my stage: the **award date** | pending **Info**, achieved **View** | DBE-08 `145:21231` |
| **Comply** | `silver ∈ certificates` | "Comply" / pending: *"Meet the standards"* · achieved: *"Silver certificate"* · after Update my stage: the **award date** | pending **Info**, achieved **View** | DBE-09 `145:21350` |
| **(Gold)** | `gold ∈ certificates` | **no stepper row, no info page** on either canvas | — | — |

Landing state = `not_started` (no certificates) → `bronze_only` → `complete` (bronze + silver).
The stepper component supports **4 rows** (2 are hidden) — model stages as an ordered list, not
as two booleans.

### 6.2 Data each screen needs

| Screen | Payload |
|---|---|
| DBE-00a | feature-visibility flags (principal? trial? preschool exists?); the real resource-link list (currently lorem ipsum) |
| DBE-00b | same flags + notification eligibility + last-fired timestamp (see 6.6) |
| DBE-01 | localised static copy |
| DBE-02 | existing `subsidyStatus` / `dbeRegistrationStatus` when re-entering |
| DBE-03 / DBE-10 | existing `certificates` for pre-selection (see 6.3.5) |
| DBE-04 | existing `biggestChallenge`, `biggestChallengeOther`, `fundingIssue` |
| DBE-05/06/07 | derived stage list (title, subtitle, achieved flag, award date), banner variant, banner-dismissed flag, entitlement flags |
| DBE-08 / DBE-09 | localised step copy per the chosen language; live URLs for eCares register, eCares login, Form 30, ECD Info Hub, the Comply guide, the DBE WhatsApp line, and the DBE support email; whether the stage is already declared |

### 6.3 Validation, enable rules and immutability

1. **Step 1 (DBE-02)** — `Next` is disabled until **both** questions are answered. The DBE-status
   radio group is **revealed only after** the subsidy segment is chosen (`145:20948` →
   `145:21022`); do not render it up front.
2. **Step 2 (DBE-03)** — `Next` is disabled until at least one option is ticked. **"None" is
   mutually exclusive**: selecting it clears bronze/silver/gold; selecting any certificate clears
   "None". Enforce this server-side too — `certificates = {none, bronze}` is an invalid payload.
3. **Step 3 (DBE-04)** — `Save` is disabled until a challenge radio is chosen; if that radio is
   **Other**, `Save` stays disabled until the *"Please give more detail"* text is non-empty. The
   funding long-text is **always optional** (proved by `145:21006`, where Save is enabled without
   it).
4. **The intake is atomic.** DBE-D1 states *"If you exit now your changes will not be saved."* —
   do not persist per-step. Buffer all three steps client-side and POST once on `Save`; on exit,
   discard. (Keep the buffer in memory/local draft only, never in the synced store.)
5. **Update my stage pre-selection** — designer note `145:21096` / `139:66615`, verbatim:
   *"Update my stage — Show ALL previously selected certificates as selected (exception: don't
   auto-select "None" if that was selected before)."*
   So: return the full previous `certificates` set; the client ticks each one; **if the previous
   value was `none`, open the picker with nothing ticked.**
6. **Award dates — open question.** `145:21675` / `139:67019` show stage subtitles as dates
   ("30 July 2024", "3 August 2024") after a stage update, but **no screen on either canvas
   captures a date**. Options: (a) stamp `certificateAwardedOn[cert] = now()` the first time a
   certificate is declared and never overwrite it; (b) add a date input to DBE-10. **(a) matches
   the drawn flow — recommend it, but confirm with the designer.** Once set, the date must be
   **immutable**: un-ticking and re-ticking a certificate must not reset it.
7. **Self-declaration is the only source of stage truth.** The app never verifies with the DBE —
   `[I have my bronze certificate]` / `[I have my silver certificate]` and DBE-10 write the same
   field. Both fire the **"Stage updated"** toast. Model the write idempotently: declaring a
   certificate already held is a no-op that still returns success.
8. **Nothing is hard-immutable** in this feature — a principal may correct their answers at any
   time via **[Update my stage]**. Keep an **audit trail** of certificate changes (who, when,
   from → to) so the award dates and any downstream subsidy reporting can be defended.
9. Free text (`biggestChallengeOther`, `fundingIssue`): trim, cap length (suggest 500 chars),
   strip control characters. These are **survey data** — expect them to be exported for analysis.
10. Re-running the intake (if product allows it) must **not** clear an existing `certificates`
    set silently; treat step 2 as pre-populated from the current profile.

### 6.4 The Comply deadline

The Comply info page states: **"You have one year from your Bronze certificate to complete this
stage."**

- Deadline = `certificateAwardedOn.bronze + 1 year`. It can only be computed once a Bronze date
  exists (see 6.3.6) — another reason to stamp the date on first declaration.
- No countdown, warning banner or expiry state is drawn on either canvas. **Open question for
  product:** what happens at T−30 days and at expiry? Recommend surfacing it as an
  `status.alert` banner on the Registration tab, but do not invent it without design.

### 6.5 External integrations

| Action | Screen | Requirement |
|---|---|---|
| **Register for eCares** | DBE-08 step 1 | external URL, opens out of app |
| **Download Form 30** | DBE-08 step 2 | file download; needs a stable hosted URL and an offline-friendly failure message |
| **Log in to eCares** | DBE-08 step 3 | external URL |
| **Complete health & safety check** | DBE-09 step 1 | *"Use the checklist in the app"* — this is an **in-app deep link** to the venue health & safety checklist feature, not an external link. Confirm the target route. |
| **Visit the ECD Info Hub** | DBE-09 step 2 | external URL |
| **Download the guide** | DBE-09 step 2 | file download |
| **Go to WhatsApp** | both info pages | `wa.me` deep link to the DBE line; fall back to a copyable number when WhatsApp is not installed |
| **Email** | both info pages | `banapele@dbe.gov.za` — render as a `mailto:` link; the address is emphasised in the copy |

All seven targets must be **configurable server-side** (they are government URLs and will change);
do not hard-code them in the client.

### 6.6 Notification / trigger rules

From designer notes `145:21580` + `145:21587` (= `139:67099` + `139:67106`):

1. The **hub notification card** (`145:21594`) is injected into the existing hub notification
   feed and **competes for slot priority defined outside Figma** — *"Priority level: see in use
   case doc"*. Back-end must accept a priority value from that doc.
2. **Audience: principals only.**
3. **Precondition: the user has created a preschool.**
4. **Schedule: end of Q1, Q2 and Q3 — 31 March, 30 June, 31 October.**
   > Two things to raise: (a) *31 October* is not a calendar quarter end (Q3 ends 30 September) —
   > this looks deliberate (South African school terms) but **confirm**; (b) there is **no Q4
   > trigger** — confirm that is intentional.
5. Suppress the card once registration is **complete** (both certificates held) — not stated in
   the design, but re-nagging a fully-registered principal every quarter is clearly wrong.
   **Confirm with product.**
6. Track `lastFiredAt` per user so a re-fire does not duplicate the card within one quarter.

### 6.7 Entitlement gates (summary)

| Gate | Rule | UI |
|---|---|---|
| Trial tenant/user | **No access at all** | hide every entry point; deep link → DBE-D2 / upgrade |
| Not a principal | No access (per the notification note) — **confirm scope** | hide the Registration tab |
| No preschool created | Access deferred | **DBE-D2** pop-up, soft-dismissable |
| All gates pass | Full access | DBE-01 → intake → Registration tab |

---

## 7. Designer notes carried forward (verbatim)

Every note lives as the layer name of a text node inside an otherwise-empty `WO1.3.0 Profile`
frame. Transcribed exactly, including original punctuation and curly quotes.

| Note (verbatim) | p23 node | p21 frame / text node |
|---|---|---|
| **Form** | `145:21049` | — |
| **Three variations with Apply → Comply** | `145:21498` | `139:67011` / `139:67017` |
| **Info screens** | `145:21103` | `139:66616` / `139:66622` |
| **Update my stage Show ALL previously selected certificates as selected (exception: don't auto-select "None" if that was selected before)** | `145:21096` | `139:66609` / `139:66615` |
| **Add hub notification Priority level: see in use case doc** | `145:21580` | `139:67093` / `139:67099` |
| **Principal only Trigger (see use cases for full info) After user has created a preschool End Q1, 2, 3: 31 March 30 June 31 October** | `145:21587` | `139:67100` / `139:67106` |
| **Trial users cannot access the registration helper** | `145:21748` | `139:67261` / `139:67267` |

### In-screen copy used as layer names (Page 21 transcription, unchanged on Page 23)

| Node | Text |
|---|---|
| `139:66756` | Step 1: Sign up for eCares |
| `139:66757` | The eCares system allows you to begin your application process. |
| `139:66758` | If you have not registered for eCares yet, click the link below to register. |
| `139:66762` | Step 2: Gather and submit documents |
| `139:66763` | Gather these documents: Certified copies of ID or passport for yourself and all staff / Fill in Form 30 for all staff members |
| `139:66767` | Step 3: Get your Bronze certificate |
| `139:66768` | Log in to eCares and fill in all of the information about your ECD programme. Upload your documents. |
| `139:66872` | Comply |
| `139:66874` | You have one year from your Bronze certificate to complete this stage. |
| `139:66876` | Step 1: Check your venue |
| `139:66877` | An Environmental Health Practitioner will visit to check that your centre is safe and meets the health standards. Use the checklist in the app to prepare your venue. |
| `139:66881` | Step 2: Gather and submit documents |
| `139:66882` | You will need to submit several documents. A social worker will visit to check your documents and how your programme runs. Download the guide or visit the ECD Info Hub to see exactly what you need to prepare. |

### Known defects to resolve before build

| # | Issue | Nodes |
|---|---|---|
| 1 | **Comply info page app bar reads "DBE registration - Apply"** — should read "Comply" | `145:21350`, `139:66863` |
| 2 | **Exit modal gives the destructive action primary emphasis** — "Exit" is the solid primary, "Continue editing" is secondary | `145:21638`, `139:67151` |
| 3 | **Resource list copy is placeholder** — six rows read "Lorem ipsum" | `145:21631`, `139:67144` |
| 4 | **Dashboard tab strip offset by −6.5 dp** vs the Practitioners screen | `145:21287` / `139:66388` vs `145:21080` / `139:66595` |
| 5 | **Select-card height drift** — checked rows render 54 dp against the 56 dp standard | `145:21661`, `145:21668`, `139:67174`, `139:67181`–`67184` |
| 6 | **Misleading layer/variant names throughout** — registration screens named `Money dashboard`, questionnaire steps named `Child registration`, an onboarding prompt using `dialog card - error`, enabled rows using `action xl icon disabled`, a Community tab named `Club tab - purple`, the journey stepper named `Antenatal visits` | many |
| 7 | **Two competing step-numbering schemes** — layer names say `step 4/7/9/10–13`, the rendered UI says "Step 1/2/3 of 3". Page 23's band structure is the reliable map | `145:20948`/`21022`/`21041`/`21408`/`21641`/`21661`; `139:66461`/`66535`/`66554`/`66907`/`66921`/`67154`/`67174` |
| 8 | **Gold certificate has no info page and no stepper row**, yet is selectable | `145:21394`, `145:21408` |
| 9 | **Award dates are displayed but never captured** by any input | `145:21675`, `139:67019` |
| 10 | **No Q4 notification trigger**, and "31 October" is not a calendar quarter end | `145:21587`, `139:67106` |
