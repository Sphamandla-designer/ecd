# Progress screens

The **Child Progress** feature (screen family `WO5.x`, plus the `0.3.0` Progress-tab dashboard,
`1.2.7` reporting-period setup and the `5A.6`/`WO5.4` walkthroughs) is how a practitioner records what
each child can do, turns those observations into a **caregiver report**, and shares it. A principal
first sets the year's **reporting periods**; inside each period a practitioner works through an
**age-banded observation questionnaire** (CREDI / NCF / ChildSteps depending on the child's age at the
report deadline, 20–48 items, five questions per screen, answered Yes / No / Don't know, with some
items **reverse-scored**), then chooses **4 skills to work on**, writes a "to do" plan per skill, adds
optional private notes, and creates a report that is **immutable once created**. Class- and
preschool-level roll-ups appear on the Progress tab as a completion percentage, a downloadable
**A4 Progress Summary PDF**, and "See summary" drill-downs by class, age range, developmental category
or individual child. A 12-step overlay walkthrough and an info page cover onboarding.

**Figma source**

| What | Deep link |
|---|---|
| Canvas "Page 24" (whole feature) | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-23196 |
| Progress landing page (representative) | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-30581 |
| First observations landing | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-29203 |
| Create-report warning dialog | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-25896 |
| Progress walkthrough step 2 | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-26270 |
| Progress Summary PDF (A4) | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-27134 |

All mobile frames are 360dp wide (`size.frameWidth`), content column 328dp (`size.contentWidth`),
screen margin 16dp (`space.screenMargin`). The PDF is 2480×3508 px (A4 @ 300dpi).

---

## 1. Flow map

```
 ┌──────────────────────────────┐        ┌──────────────────────────────────────────┐
 │ G0  0.3.0 Progress tab       │        │ G1  1.2.7 Edit profile - playgroups      │
 │     no reporting periods set │───────▶│     Child progress reporting periods     │  145:28478
 │  145:27751 principal         │ (principal │  145:28520 / 145:28578 (3 or 4 periods)│  145:28637
 │  145:27825 practitioner      │  only) └───────────────┬──────────────────────────┘
 └──────────────┬───────────────┘                        │ dates too close
                │                                        v
                │                              ┌───────────────────────┐
                │                              │ E1 dialog card-error  │ 145:28415
                │                              │ (use case 4)          │ 145:28730
                │                              └───────────────────────┘
                v
 ┌──────────────────────────────────────────────────────────────────────────────┐
 │ G2  0.3.0 Progress tab dashboard                                             │
 │     "Track progress" / "Continue tracking progress"                          │  145:27865 etc.
 └───┬──────────────────────────────────────────────────┬───────────────────────┘
     │ tap CTA                                          │ 100% complete (145:28014)
     v                                                  v
 ┌────────────────────┐                    ┌──────────────────────────────────────┐
 │ Q1 dialog card -   │ 145:27966          │ S1 See summary ▸ class picker        │ 145:27865
 │ question           │ 145:30537          │  ▸ S2 age range  145:27967 / 29464    │
 └────────┬───────────┘                    │     ▸ S3 Category      145:27891     │
          │                                │     ▸ S4 Individual child 145:27993  │
          v                                │  ▸ D1 Download all reports (PDF)     │
 ┌────────────────────────────────┐        └──────────────────────────────────────┘
 │ C1 WO2.2.1 Child profile       │ 145:28728 / 145:29378 / 145:29404
 │  "Progress reports" list item  │
 │  "Create progress report" btn  │
 └────────┬───────────────────────┘
          v
 ┌───────────────────────────────────────────────────────────────────────┐
 │ L1 WO5.0.0 Progress landing page                                      │
 │    empty 145:23850  ·  in progress 145:23887  ·  with reports 145:23906│
 │    over-age (>78 months) 145:30516                                    │
 └────────┬──────────────────────────────────────────────────────────────┘
          │ Start
          v
 ┌───────────────────────────────────────────────────────────────────────┐
 │ O0 WO5.1.0 First progress observations - landing   145:29203 / 30675  │
 │    age-band chip · tracker language picker · CREDI/NCF/ChildSteps info│
 └────────┬──────────────────────────────────────────────────────────────┘
          │ Start
          v
 ┌───────────────────────────────────────────────────────────────────────┐
 │ O1..On  WO5.1.1-WO5.1.4 question steps (5 questions/screen)           │
 │    145:23991 · 145:24017 · 145:24042 · 145:24067                      │
 │      └─ [Picture] ─▶ IM1 WO5.1.1a image pop-up  145:24092             │
 │      └─ [X Save & exit] ─▶ L1 (in-progress)                           │
 └────────┬──────────────────────────────────────────────────────────────┘
          v
 ┌───────────────────────────────────────────────────────────────────────┐
 │ O-S  WO5.1.5 "Choose 4 skills to work on"   145:24132                 │
 │      variants: don't-know 145:24178 · 3 items 145:24196 ·             │
 │                all-yes → step SKIPPED 145:24217 (use case 19)         │
 └────────┬──────────────────────────────────────────────────────────────┘
          v
 ┌───────────────────────────────────────────────────────────────────────┐
 │ O-P  WO5.1.6 per-skill "to do" plans   145:24606 / 24627 / 24647      │
 └────────┬──────────────────────────────────────────────────────────────┘
          v
 ┌───────────────────────────────────────────────────────────────────────┐
 │ L2 WO5.1.0 landing, COMPLETE   145:24666 (+24813, 24961, 25069,       │
 │    25150, 25229 = scenarios 1-5)                                      │
 │    ├─ Add a note ─▶ N1 WO5.1.7  145:25344                             │
 │    ├─ Change my answers ─▶ back into O1.. with saved answers          │
 │    └─ Create caregiver report                                          │
 └────────┬──────────────────────────────────────────────────────────────┘
          v
 ┌────────────────────┐   ┌────────────────────┐   ┌──────────────────────┐
 │ R1 WO5.2.7 step 1  │──▶│ R2 WO5.2.7 step 2  │──▶│ R3 WO5.2.9 step 3    │
 │ 145:25795          │   │ 145:25812          │   │ 145:25830 (+30318,   │
 └────────────────────┘   └────────────────────┘   │  30384 steps 4-5)    │
                                                    └──────────┬───────────┘
                                                    [Create report]
                                                               v
                                            ┌──────────────────────────────┐
                                            │ W1 WO5.2.10a warning dialog  │ 145:25896
                                            │ "you will not be able to edit"│
                                            └───────┬──────────────┬───────┘
                                       "Yes, create"│              │"No, edit"
                                                    v              └─▶ R3
                          ┌─────────────────────────────────────┐
                          │ SH1 WO5.2.11 Share report 145:25966 │
                          │   report ▾ · language ▾ · tips      │
                          └───────┬─────────────────────────────┘
                                  ├─▶ SH2 4.3.1 share step 1-2  145:25987 / 145:25999
                                  └─▶ V1 WO5.2.11 View completed report  145:26021

 Walkthrough:  T0 5A.6.0a language picker 145:23759 / 145:30418
                 └─▶ T2..T12  145:26270, 26420, 26343, 26496, 26799, 26697,
                              26902, 26595, 26991, 23536 (5A.6.1 step 10), 23650
 Help:        I1 WO5.4.2 Info page 145:27088
 Notifications: NT1 WO5.4.3 Hub notification 145:27122 · NT2 Notification 145:27131
 End of year: EY1 A. Progress update 145:30605  ·  TD1 5.2.8 Action - Child progress 145:29023
 Output:      PDF1 WO5.4.4 Progress summary PDF 145:27134 / 27310 / 27485 (4 pages)
```

### Happy path — observe, report, share (numbered)

1. Principal opens **G1** (1.2.7 Edit profile → *Child progress reporting periods*) and sets the year's periods. Ranges that are too close together raise **E1** (use case 4, note 145:29492). Once saved, the periods **cannot be edited** for that year (note 145:28413).
2. Practitioner opens the **Progress** tab (**G2**) and taps **"Track progress"** → **Q1** *dialog card - question* explains what happens next (note 145:27863).
3. Practitioner reaches a child via **C1 WO2.2.1 Child profile** → "Progress reports" list item, or the "Create progress report" button (notes 145:28933, 145:28935).
4. **L1 WO5.0.0 Progress landing page** shows the state for this child: empty (no observations), in progress, or with previous reports.
5. **Start** → **O0 WO5.1.0 observations landing**: the age-band chip is **auto-selected from the child's age as of the report deadline** (note 145:23942); the tracker language can be changed; an info card names the source instrument (CREDI / NCF / ChildSteps, note 145:30676).
6. **Start** → **O1…On** question screens, **5 questions per screen** (note 145:23950). Each question is answered Yes / No / Don't know. Questions with illustrations expose a **Picture** pill → **IM1** image pop-up. **✕ Save & exit** is available at every step.
7. **O-S WO5.1.5** — "Choose 4 skills to work on with Themba", listing the items answered *No* or *Don't know* (rules in use case 16, note 145:23936). This is **step 5** for the youngest bands and **step 7 or 9** for older children.
8. **O-P WO5.1.6** — for each chosen skill the practitioner writes a "to do" plan.
9. **L2 WO5.1.0 landing, complete** — success alert, the "What you are working on" section grouped by developmental category and subcategory, the "You chose 'Don't know' for these skills" list (note 145:23938), and CTAs.
10. **Create caregiver report** → **R1 → R2 → R3** (3 free-text steps, character-limited — note 145:30515).
11. **Create report** → **W1** irreversible-create warning → *Yes, create report*.
12. **SH1 WO5.2.11 Share report** — pick the report, pick the report language, read the sharing tips, share. **V1** shows the completed read-only report.
13. When every report for the period is complete, **G2** flips to the 100% state (**145:28014**) with **Download all progress reports** and **See summary**.

### Branch — over-age child (>78 months)

1. From **C1** or **G2**, a child older than 78 months opens **L1 over-age variant** ([145:30516](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-30516)).
2. Screen shows only the message "Progress tracking is only available up to 6 and a half years old!" — **no actions at all**; there is no tool for this child (note 145:29430).

### Branch — before the reporting window opens

1. Today's date is **before** the start date of the next upcoming reporting period.
2. **L1** renders without the "Create caregiver report" CTA — the user can't create the report yet (note 145:23940). Observations may still be recorded.

### Branch — all reporting periods closed / end of year

1. **L1** shows the `Informational` alert "All reporting periods for the year are closed. You can keep tracking progress next year." and only the "Share a report" CTA.
2. At year end, **EY1 A. Progress update** ([145:30605](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-30605)) is shown when **all** progress reporting periods are complete (note 145:30662).

### Branch — change my answers

1. From **L2**, "Change my answers" re-enters the observation flow at step 1 with **all previously saved answers pre-filled** (note 145:23944).
2. Re-completing returns to **L2**; the "4 skills" step re-derives from the new answers.

### Branch — See summary drill-down

1. From **G2 (100% complete)** tap **👁 See summary**.
2. **S1 class picker** — shown only if the practitioner is assigned to **more than 1** class, or (principal) there is **more than 1** class at the preschool.
3. **S2 age range** — shown only if reports were created for **multiple** age groups, and only the relevant ranges are listed.
4. **S3 Category** or **S4 Individual child** (notes 145:27912, 145:28408).
5. **Download** → **PDF1 WO5.4.4 Progress summary PDF**.

### Branch — walkthrough

1. The **very first** time the user goes to any progress section — tapping the "to do" item **or** tapping through on the progress list item (note 145:23753) — **T0 5A.6.0a language picker** opens, then steps **T2…T12**.
2. "Land back on the screen the user came from" when the tour ends (note 145:26266).
3. Show **once only** — do not repeat on each child profile (note 145:23848).

---

## 2. Screen inventory

| Code | Name | Figma node | Size (dp) | State / variant | Purpose |
|---|---|---|---|---|---|
| G0 | 0.3.0 Progress tab — no reporting periods | [145:27751](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-27751) / [145:27825](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-27825) | 360×640 | principal (145:27749) / practitioner (145:27750) | Blocked state before periods exist |
| G1 | 1.2.7 Edit profile — playgroups | [145:28478](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-28478) / [145:28637](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-28637) | 360×970 / 360×1564 | principal-only | Set yearly reporting periods |
| G1-p | Child progress reporting periods | [145:28520](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-28520) / [145:28578](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-28578) | 360×1265 / 360×1426 | 3 periods (145:28711) / 4 periods (145:28712) | Date pickers per period |
| G2 | 0.3.0 Progress tab dashboard | [145:27865](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-27865) | 360×640 | not started (145:27857) / scenario 1 (145:27859) / scenario 2 (145:27861) | Class-level progress |
| G2-c | 0.3.0 dashboard — 100% complete | [145:28014](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-28014) / [145:29921](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-29921) | 360×640 | complete (145:28404) | Celebration + download + summary |
| S1 | See summary — class picker | [145:27865](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-27865) | 360×— | conditional | Pick a class |
| S2 | See summary — age range | [145:27967](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-27967) / [145:29464](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-29464) | 360×— | conditional | Pick an age band |
| S3 | See summary — Category | [145:27891](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-27891) | 360×— | note 145:27912 | Roll-up by developmental category |
| S4 | See summary — Individual child | [145:27993](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-27993) | 360×— | note 145:28408 | Roll-up per child |
| S5 | Summary — amber alert variants | [145:29433](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-29433) / [145:29464](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-29464) | 360×—1622 | >60 months (145:29491) / >78 months (145:29463) | Age-range warnings |
| C1 | WO2.2.1 Child profile — active and complete | [145:28728](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-28728) / [145:29378](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-29378) / [145:29404](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-29404) | 360×892+ | none tracked (145:28947) / some tracked (145:28948) / previous reports (145:28949) | Entry point; button rules 145:28937 |
| L1-e | WO5.0.0 Progress landing — empty | [145:23850](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-23850) | 360×640 | empty (note 145:23942) | No observations yet |
| L1-o | WO5.0.0 Progress landing — over-age | [145:30516](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-30516) | 360×640 | >78 months (145:29430) | No tool available |
| L1-p | WO5.0.0 Progress landing — in progress | [145:23887](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-23887) / [145:30563](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-30563) | 360×640 | partially complete | Resume observations |
| L1 | WO5.0.0 Progress landing — with reports | [145:23906](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-23906) / [145:30581](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-30581) | 360×640 | scenario 1 no previous (145:30534) / scenario 2 previous (145:30535) | Report list + share |
| O0 | WO5.1.0 First progress observations — landing | [145:29203](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-29203) / [145:30675](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-30675) | 360×650 | per age band (145:29208) | Tracker intro |
| O1–O4 | WO5.1.1–WO5.1.4 question steps | [145:23991](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-23991) / [145:24017](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-24017) / [145:24042](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-24042) / [145:24067](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-24067) | 360×916–976 | 5 questions/screen (145:23950) | Yes / No / Don't know |
| O-X | 4.2.3 Happy & Secure — extended steps 124–177 | [145:25439](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-25439)–[145:25789](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-25789) | 360×895–918 | older ages, max 40 questions (145:23946) | Long-tool example |
| O-S | WO5.1.5 Choose 4 skills to work on | [145:24132](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-24132) | 360×886 | default | Skill selection |
| O-S2 | …don't-know / 3 items / all-yes | [145:24178](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-24178) / [145:24196](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-24196) / [145:24217](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-24217) | 360×640–886 | step skipped when all-yes (use case 19) | Variants |
| O-P | WO5.1.6 per-skill "to do" plans | [145:24606](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-24606) / [145:24627](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-24627) / [145:24647](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-24647) | 360×749–1262 | steps 6/7 | Plan entry |
| L2 | WO5.1.0 landing, complete | [145:24666](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-24666) | 360×3421 | scenario 1 | Completion summary |
| L2-v | …scenario variants | [145:24813](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-24813) (with note) / [145:24961](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-24961) (no don't-know, 145:23951) / [145:25069](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-25069) & [145:25150](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-25150) (all-yes, 145:23952/23953) / [145:25229](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-25229) (too many don't-know) | 360×640–3482 | scenarios 1–5 | — |
| N1 | WO5.1.7 Add a note | [145:25344](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-25344) / [145:25360](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-25360) | 360×640 | empty / filled | Private notes |
| R1 | WO5.2.7 Create report step 1 | [145:25795](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-25795) | 360×640 | step 1 of 3 | Free text |
| R2 | WO5.2.7 Create report step 2 | [145:25812](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-25812) | 360×640 | step 2 of 3 | Free text + list item |
| R3 | WO5.2.9 Create report step 3 | [145:25830](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-25830) | 360×1641 | step 3 of 3 | Caregiver detail + skills recap |
| R3-v | …steps 4–5 / all-yes | [145:30318](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-30318) / [145:30384](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-30384) | 360×843–1641 | use case 21 (145:30417) | Variants |
| SH1 | WO5.2.11 Share report | [145:25966](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-25966) | 360×760 | post-create | Pick report + language, tips |
| SH2 | 4.3.1 Share steps 1–2 | [145:25987](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-25987) / [145:25999](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-25999) | 360×640 | language → recipients | Share steps |
| V1 | WO5.2.11 View completed progress report | [145:26021](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-26021) | 360×2634 | read-only | Full report |
| TD1 | 5.2.8 Action — Child progress | [145:29023](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-29023) / [145:29172](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-29172) / [145:29192](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-29192) / [145:30664](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-30664) | 360×640–2249 | to-do list | Progress action items |
| EY1 | A. Progress update (end of year) | [145:30605](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-30605) | 360×1398 | all periods complete (145:30662) | Year wrap-up |
| I1 | WO5.4.2 Info page — Tracking progress | [145:27088](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-27088) | 360×1651 | use case 35 | Help hub + walkthrough launcher |
| NT1 | WO5.4.3 Hub notification | [145:27122](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-27122) | 360×641 | priority-numbered | Home-hub card |
| NT2 | WO5.4.3 Notification | [145:27131](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-27131) | 360×640 | list entry | Notifications list |
| PDF1 | WO5.4.4 Progress summary PDF | [145:27134](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-27134) / [145:27310](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-27310) / [145:27485](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-27485) | 2480×3508 px | 4 pages | Printable summary |
| Q1 | dialog card — question | [145:27966](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-27966) / [145:30537](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-30537) | 328×402 / 328×308 | trigger 145:27863 | Track-progress explainer |
| E1 | dialog card — error | [145:28415](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-28415) / [145:28730](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-28730) | 328×402 / 328×346 | principal (145:28729) / non-principal (145:28793) | Date-range error |
| W1 | WO5.2.10a Dialog — Create report warning | [145:25896](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-25896) | 360×640 | irreversible | Confirm create |
| IM1 | WO5.1.1a Dialog — image pop-up | [145:24092](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-24092) | 360×640 | from "Picture" pill | Illustrate a skill |
| T0 | 5A.6.0a Dialog — walkthrough language picker | [145:23759](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-23759) / [145:30418](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-30418) | card 328×299 @y171 | tutorial | Pick tutorial language |
| T2–T12 | WO5.4.1 / 5A.6.1 walkthrough steps | [145:26270](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-26270), [145:26420](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-26420), [145:26343](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-26343), [145:26496](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-26496), [145:26799](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-26799), [145:26697](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-26697), [145:26902](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-26902), [145:26595](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-26595), [145:26991](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-26991), [145:23536](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-23536), [145:23650](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-23650) | 360×640 | overlay | 12-step tutorial |

---

## 3. Screen specs

### L1 — WO5.0.0 Progress landing page · [145:30581](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-30581)

1. **App bar** 0→64 (`size.appBar`), fill `role.appBar`, `elevation.base`: 24dp back chevron
   (`size.iconLg`) `role.onAppBar`; centred title "Themba's progress" `typescale.h3` `role.onAppBar`;
   right **help chip** 32dp circle — `role.select` fill on this screen (pink variant), 20dp "?" glyph
   `role.onSelect`. *(The Progress-tab dashboard uses the `role.action` cyan variant of the same chip.)*
2. **Page Title** frame 328×36 at x16, y≈79: "Themba's reports" `typescale.h2` in `role.textDark`.
3. **Report list** — `large title with action` frame ([145:30599](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-30599)),
   rows 77dp (`size.rowTitleAction`), separated by a 1dp dashed divider `role.line`:
   - Title "Report 1 - 2024" `typescale.h4` `role.textDark`.
   - Subtitle "1 Jan to 30 Mar 2023" `typescale.help` `role.textMid`.
   - Trailing **View pill**: 32dp (`size.buttonSmallHeight`), `radius.md`, fill `role.selectSubtle`,
     leading 16dp eye glyph + label "View" `typescale.buttonSmall`, both in `role.select`.
4. **Info alert** — `Informational` instance 328×92 at x16, y476, `radius.md`, fill `status.info.bg`:
   20dp "i" glyph `status.info.main`; text `typescale.helpStrong` in `status.info.dark` —
   "All reporting periods for the year are closed. You can keep tracking progress next year."
5. **Form Layout footer** y460→640: **primary button** 328×40, `radius.lg`, fill `role.action`,
   `elevation.button`, leading 20dp share glyph, label "Share a report" `typescale.button`
   `role.onAction`.

State swaps on this screen:

- **Empty** ([145:23850](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-23850)) — no report list; centred illustration + copy + primary "Start".
- **In progress** ([145:23887](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-23887)) — progress copy + primary "Continue".
- **Over-age** — see below.

### L1-o — WO5.0.0 Progress landing, over-age · [145:30516](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-30516)

1. **App bar** as L1, "?" chip in `role.action`.
2. Centred **H2** at x16 w328: "Progress tracking is only available up to 6 and a half years old!"
   `typescale.h2` `role.textDark`, centre-aligned.
3. **Illustration badge** — circular, fill `role.appBar`, building-blocks sticker: roof
   `category.teachingTips.main`, blocks `category.activities.main` and `role.select`.
4. **Body copy** `typescale.body` `role.textMid`, centred: "This child is older than the age range
   covered by the progress tracker."
5. **No actions** — no footer button (note 145:29430).

### O0 — WO5.1.0 First progress observations landing · [145:29203](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-29203)

1. **App bar** 0→64: back chevron; title "Report 2" `typescale.h3`; subtitle "Themba Sibiya"
   `typescale.help`, both `role.onAppBar`.
2. **Page Title** x16 w328: "Report 2" `typescale.h2` `role.textDark`; below it the reporting window
   "1 January to 15 June 2024" `typescale.help` `role.textMid`.
3. **Age-band badge** — pill 28dp (`size.badgeHeight`), `radius.xxl`, fill `role.select`, label
   "0-5 months progress tracker" `typescale.captionMedium` in `role.onSelect`. **Auto-selected from
   the child's age as of the report deadline** (note 145:23942).
4. **Language row** — label "Progress tracker language:" `typescale.help` `role.textMid` +
   **dropdown pill** 32dp, `radius.xl`, fill `role.action`, label "English ⌄" `typescale.buttonSmall`
   `role.onAction`.
5. **Instrument info card** — x16 w328, `radius.md`, fill `status.info.bg`, padding 16dp: 20dp "i"
   `status.info.main` + body `typescale.help` in `status.info.dark`. Copy is **tool-specific**
   (CREDI / NCF / ChildSteps — §7.2, note 145:30676). CREDI copy: "This progress tracker has been
   adapted from the Caregiver-Reported Early Development Instruments (CREDI) developed by the Harvard
   Graduate School of Education and is aligned with South Africa's National Curriculum Framework for
   Children from Birth to Four (NCF)." Ages 36–47 and 48–60 months use different text (note 145:29208).
6. **Footer** 72dp (`size.footerBar`): primary button 328×40 "Start" with leading 20dp pencil glyph,
   fill `role.action`.

### O1…On — WO5.1.1–WO5.1.4 question steps · [145:23991](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-23991)

1. **App bar** 0→64 (steps variant): back chevron; title "Report 2" `typescale.h3`; subtitle
   "step 1 of 6" `typescale.help`; **right ✕ close** 24dp `role.onAppBar`.
2. **Page Title** x16 w328: "Tell us about Themba" `typescale.h2` `role.textDark`.
3. **Age-band badge** — pill, fill `role.select`, label in `role.onSelect` (as O0).
4. **Question groups** — exactly **5 per screen** (note 145:23950), stacked with 24dp
   (`space.6`) gaps, x16 w328:
   - Question text `typescale.body` in `role.textDark`.
   - Optional **Picture pill** floated right of the question: 32dp, `radius.xl`, fill `role.action`,
     label "Picture" `typescale.buttonSmall` `role.onAction`. Opens **IM1**.
   - **Answer segment row** — three equal pills, ~100–104dp wide × 40dp (`size.chipHeight`),
     6dp gaps, `radius.md`: resting fill `role.selectSubtle` with label `typescale.chip` in
     `role.select`; **selected** fill `role.select` with label `typescale.chipActive` in
     `role.onSelect`, `elevation.sm`. Labels: "Yes" / "No" / "Don't know". Whole pill is a 48dp
     touch target.
5. **Footer Form Layout** (y808 on the 936dp frame): **primary** 328×40 "→ Next" — **disabled**
   (fill `role.actionDisabled`, label `role.onAction`, no shadow) until all 5 questions on the screen
   are answered; 16dp gap (`space.buttonGap`); **secondary** 328×40 "✕ Save & exit", fill
   `role.surface`, 2dp `role.action` border (`size.focusRing`), label `typescale.button` in
   `role.action`, no shadow.

Sample questions (0–5 months band): "Does Themba smile when others smile at him/her?"; "Does Themba
grasp onto a small object (e.g., your finger, a spoon) when put in his/her hand?"; "Does Themba
recognise you or other family members…?"; "Does Themba show interest in new objects by trying to put
them in his/her mouth?"; "When lying on his/her stomach, can Themba hold his/her head and chest off
the ground using only his/her hands and arms for support?"

### O-S — WO5.1.5 Choose 4 skills to work on · [145:24132](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-24132)

1. **App bar**: back; "Report 2" / "step 5 of 6"; ✕ close.
2. **Page Title** block 328×108: `typescale.h2` `role.textDark` "Choose 4 skills to work on with
   Themba" + helper `typescale.help` `role.textMid` "These should be things that Themba is trying to
   do but needs support with."
3. **Children list** ([145:24135](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-24135)),
   x16 w328, first row y124: **Select card** instances, heights 80–152dp, 4–8dp gaps
   (`space.listGap`), `radius.md`, fill `role.background`:
   - Leading 24dp **checkbox**, `radius.sm` box, 2dp `role.action` outline; checked = fill
     `role.action` + white check (`role.onAction`).
   - Label = the skill/question text answered **No** or **Don't know** in earlier steps,
     `typescale.body` `role.textDark`.
   - Selected card: fill `role.actionSubtle`.
   - Cap selection at **4**; once 4 are checked, remaining checkboxes go to the disabled treatment
     (`role.textLight` outline, 60% opacity) until one is unchecked.
4. **Footer**: primary "→ Next" (disabled until the required count is met) + secondary "✕ Save & exit".

Variants: don't-know list ([145:24178](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-24178));
only 3 candidate items ([145:24196](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-24196))
— then require all 3; **all-yes** ([145:24217](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-24217))
— **the step is skipped entirely** (use case 19).

### O-P — WO5.1.6 per-skill "to do" plans · [145:24606](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-24606)

App bar (steps variant) → Page Title `typescale.h2` → for each chosen skill: a card x16 w328,
`radius.md`, fill `role.background`, padding 16dp — "Skill:" label `typescale.helpStrong`
`role.textMid` + the question text `typescale.body` `role.textDark`, then "To do:" label +
**long-text input** min 96dp (`size.textareaHeight` 120dp when expanded), `radius.sm`, fill
`role.surface`, 1dp `role.line` border; focused = 2dp `role.select` border. Footer: primary "→ Next"
+ secondary "✕ Save & exit".

### L2 — WO5.1.0 landing, complete · [145:24666](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-24666)

Long scroll (3421dp). Build order:

1. **App bar**: back; "Report 2" / "Themba Sibiya".
2. **Page Title** "Report 2" `typescale.h2` + period "1 June to 15 June 2024" `typescale.help`
   `role.textMid`.
3. **Success alert** — x16 w328, `radius.md`, fill `status.success.bg`: smiling-face emoji/20dp
   check `status.success.main` + "You have completed Themba's progress observations!"
   `typescale.helpStrong` in `status.success.dark`.
4. **Body copy** `typescale.body` `role.textMid`: "You can edit your observations, add a note, or
   create the progress report."
5. **Add-a-note row** — `action item icon` 80dp, `radius.md`, fill `role.background`: title
   "Write a note or observation" `typescale.h4` `role.textDark` + trailing **small button** 32dp,
   `radius.md`, fill `role.action`, "＋ Add" `typescale.buttonSmall` `role.onAction`. → **N1**.
6. **CTA pair** — primary 328×40 "Create caregiver report" (`role.action`, `elevation.button`) +
   16dp + secondary 328×40 "Hide detail" (`role.surface`, 2dp `role.action` border).
7. **Language row** — "Progress tracker language:" `typescale.help` `role.textMid` + dropdown pill
   `role.action` "English ⌄".
8. **"What you are working on with Themba"** section `typescale.h2` `role.textDark`, then one
   **category card** per developmental domain, x16 w328, `radius.md`, fill `role.surface`, **top
   border 4dp + inner shadow in the domain colour** (Progress/Notes Card pattern, frame 100:7115):

   | Card | Domain token | Header icon |
   |---|---|---|
   | Social emotional | `domain.happyAndSecure` | heart, 32dp circle |
   | Language | `domain.speakingListening` | speech bubble |
   | Cognitive | `domain.discoveryProblem` | lightbulb |
   | Physical | `domain.developingBodies` | figure |

   Inside each card, one block per subcategory: **subcategory header** `typescale.overline`
   (uppercase, e.g. FINE MOTOR, GROSS MOTOR, APPROACHES TO LEARNING, SOCIAL, COMMUNICATION: SPEAKING
   & LISTENING) in the card's domain colour; then rows of "**Skill:**" (question text) and
   "**To do:**" (plan text) — labels `typescale.helpStrong` `role.textMid`, values `typescale.body`
   `role.textDark` — each row with a trailing **Edit pill** 32dp, `radius.md`, fill
   `role.selectSubtle`, label `typescale.buttonSmall` in `role.select`.
9. **"You chose 'Don't know' for these skills"** section — same card treatment, listing every
   don't-know item with an Edit pill (note 145:23938). Omitted in the no-don't-know scenario
   (note 145:23951).
10. **Footer card** — x16 w328, `radius.md`, fill `role.appBar`, padding 16dp: copy "Keep observing
    Themba and take note of which of these things Themba can or does do!" `typescale.body`
    `role.onAppBar`; **"Change my answers"** text link `typescale.button` in `role.action` — re-enters
    the flow with **all saved answers pre-filled** (note 145:23944).

### N1 — WO5.1.7 Add a note · [145:25344](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-25344)

App bar "Add a note about Themba" → `typescale.h2` "Your notes" → body `typescale.body` `role.textMid`
"Fill in any observations or notes about Themba. These notes will not be shared with Themba's
caregiver." → **textarea** x16 w328, 120dp (`size.textareaHeight`), `radius.sm`, fill
`role.background`, placeholder "E.g. Themba is growing so well and loves to talk to other children."
`typescale.body` `role.textLight`; focused = fill `role.surface` + 2dp `role.select` border →
**Footer** 72dp: primary "Save" with 20dp save glyph, disabled (`role.actionDisabled`) until the field
is non-empty.

### R3 — WO5.2.9 Create report step 3 · [145:25830](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-25830)

1. **App bar** (steps variant): back; "Themba's June report" / "step 3 of 3"; ✕ close.
2. **Page Title** `typescale.h2` "Share more detail for the caregiver report"; prompt
   `typescale.bodyMedium` `role.textDark` "How can Themba's caregiver help Themba to learn and grow?"
3. **Textarea** x16 w328, 120dp, `radius.sm`, fill `role.background`, placeholder "E.g. Asking him
   how he is feeling every morning and asking him to name items in and around the house."
   **Character-limited** on all 3 steps (note 145:30515) — show a `typescale.caption` counter in
   `role.textMid`, switching to `status.error.dark` at the limit.
4. **Primary "Create report"** 328×40 directly below the field (mid-page, not in a footer), disabled
   until required fields pass. Opens **W1**.
5. **"Your plans for supporting Themba"** — 4 outlined cards, x16 w328, `radius.md`, fill
   `role.surface`, 1dp `role.line` border: "Skill:" (question text) + "To do:" (plan text).
6. **Bottom secondary** 328×40 "✕ Save & exit", `role.surface` + 2dp `role.action` border.

Steps 1 and 2 (**R1**, **R2**) use the same skeleton with a single long-text input; R2 adds one
`action item icon` list row.

### SH1 — WO5.2.11 Share report · [145:25966](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-25966)

1. **App bar**: back; "Share caregiver report"; ✕ close.
2. **Page Title** `typescale.h2` "Share a report".
3. **Success banner** — x16 w328, `radius.md`, fill `status.success.main`, text `role.onAction`
   (white): title "Great, you've created Themba's report!" `typescale.helpStrong` + body "You can
   share the report with caregivers or send it to yourself." `typescale.help`, tearful-joy emoji
   leading, dismiss ✕ 22dp (`size.iconMd`) trailing.
4. **Field 1** — label "Which report would you like to share?" `typescale.h4` `role.textDark` → 4dp →
   **Select** 48dp (`size.inputHeight`), `radius.sm`, fill `role.background`, value "Report 1 - 2024"
   `typescale.bodyTight`, trailing 20dp chevron.
5. **Field 2** — label "Choose report language" → Select, placeholder "Tap to choose a language"
   `role.textLight`.
6. **Tips block** — "Tips for sharing the report" `typescale.bodyMedium` `role.textDark` + bullets
   `typescale.body` `role.textMid`: "Send a voice note with a short summary of what makes Themba
   special, how Themba is growing, and the activities that Themba enjoys." / "Have a meeting with
   caregivers to explain the report and share what they can do to help Themba grow."
7. **Footer** 72dp: primary "Share report", disabled (`role.actionDisabled`) until both selects are
   filled.

### G2-c — 0.3.0 Progress tab dashboard, complete · [145:28014](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-28014)

1. **App bar** 0→64: back; "Classroom" / "Monday, 12 June"; right "?" chip fill `role.action`.
2. **Tabs** 56dp (`size.tabBar`) on `role.surface`, horizontally scrollable: "…es | Attendance |
   **Progress** | Activities | Resou…". Active label `typescale.h4` in `role.action` with 2dp
   `role.action` underline; inactive `role.textMid` over a 1dp `role.line` track.
3. **Period header** x16: `typescale.h2` "Report 1" + `typescale.help` `role.textMid`
   "1 March - 1 April 2024".
4. **Completion card** — x16 w328, `radius.md`, fill `role.background`, padding 16dp: large yellow
   smiley sticker; **"100%"** `typescale.h1` (display scale) in `role.textDark`; "Reports completed"
   `typescale.help` `role.textMid`; **progress bar** 328×10, `radius.full`, track `role.line`, fill
   `status.success.main`.
5. **Decorative confetti field** ([145:28015](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-28015))
   behind the card — pastel vector illustration, never carries meaning.
6. **Footer stack**: primary 328×40 "⤓ Download all progress reports" (`role.action`) + 16dp +
   secondary 328×40 "👁 See summary" (`role.surface`, 2dp `role.action` border).

Incomplete variants replace the percentage and swap the CTA to "Track progress" /
"Continue tracking progress" — both open **Q1** (note 145:27863).

### S1–S4 — See-summary drill-downs

Each level is a plain list screen: **App bar** (back + title) → optional `typescale.h2` Page Title →
`action item icon` rows 80dp (`size.rowDefault`), x16 w328, `radius.md`, fill `role.background`,
48dp icon circle + `typescale.h4` title + `typescale.help` subtitle + 24dp chevron `role.textMid`.

- **S1 class picker** — rows = classes.
- **S2 age range** — rows = the age bands actually present (note 145:27913).
- **S3 Category** — rows = the four developmental domains, each icon circle in its `domain.*` colour;
  drill-in shows subcategory counts.
- **S4 Individual child** — rows = children with avatar + name + count of skills being worked on.
- **Amber alerts** — appended at the **bottom** of the screen as an `Alert`, x16 w328, `radius.md`,
  fill `status.alert.bg`, 20dp icon `status.alert.main`, title `typescale.helpStrong` in
  `status.alert.dark`: one when any child is **over 60 months** (note 145:29491) and one when any
  child is **over 78 months** (note 145:29463).

### I1 — WO5.4.2 Info page, "Tracking progress" · [145:27088](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-27088)

1. **App bar**: back; "Tracking progress"; ✕ close.
2. **Language selector** 360×74 (`size.languageSelector`), fill `role.background`: "Change Language:"
   `typescale.help` `role.textMid` + pill 32dp fill `role.action` "English ⌄".
3. **Walkthrough card** — x16 w328×194, `radius.md`, fill `role.background`: `typescale.h4`
   "How to use the progress tracker on AppName" + body "Tap the button below to see how to use this
   part of AppName." + primary 296×40 "→ Start walkthrough" fill `role.action`.
4. **Section** "When should you track each child's progress?" `typescale.bodyMedium` in
   `status.info.dark`, bullets `typescale.body` `role.textMid`: start within 30 days of the child
   joining; observe throughout the year; create & send reports to caregivers every year.
5. **Section** "How to track progress" bullets: the tracker asks what the child is currently able to
   do; answer "yes" / "no" / "don't know"; you can "Save & exit" any time; once complete, create the
   caregiver report and download it to share.
6. **Info alert** x16 w328, `radius.md`, fill `status.info.bg`: title "Children learn and grow at
   different rates!" `typescale.helpStrong` `status.info.dark` + body "It is fine if a child can't do
   the things in the progress tracker yet." `typescale.help` `role.textMid`.
7. **Section** "What does the progress report for caregivers look like?" + explanation +
   **outline pill** 40dp, `radius.lg`, fill `role.surface`, 2dp `role.select` border, label
   "⤓ Download example report" `typescale.button` in `role.select`.
8. **Footer** 72dp: primary "→ Start tracking" fill `role.action`.

### PDF1 — WO5.4.4 Progress Summary PDF · [145:27134](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-27134)

A4 portrait, 2480×3508 px @300dpi, 4 pages (pages 2–4:
[145:27310](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-27310),
[145:27485](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-27485)).

1. **Title** "Report 1 Progress Summary" `typescale.h1` (scaled to print) in `role.textDark`, plus a
   **date pill** `radius.xxl` fill `role.action`, label "1 June - 30 Nov 2024" `role.onAction`.
2. **Meta row** `typescale.help` `role.textMid`: "Practitioner: Bulelwa Mahlangu · Class: Little Stars
   (11 children) · Age: 0 to 5 months"; below it a dashed 1dp `role.line` divider.
3. **"Number of children working on each skill:"** `typescale.h2` `role.textDark`, then a **2×2 grid
   of category panels**, each an outlined card tinted with its domain colour and headed by a coloured
   circular icon + name:

   | Panel | Domain token | Icon |
   |---|---|---|
   | Social emotional | `domain.happyAndSecure` | heart |
   | Physical | `domain.developingBodies` | figure |
   | Language | `domain.speakingListening` | speech bubble |
   | Cognitive | `domain.discoveryProblem` | lightbulb |

   Inside each panel: subcategory headers `typescale.overline` in the panel's domain colour
   (Personal & emotional, Social, Fine motor, Gross motor, Communication: speaking & listening,
   Approaches to learning, Number shape size pattern), then rows of **count + skill text**
   (e.g. "5 — Is kind to younger children…", "3 — Grasps onto a small object…").
4. **Footer band** — full-width, fill `role.appBar`, lightbulb mascot + "Help children develop
   holistically!" `typescale.h3` `role.onAppBar` + "You can print this out and stick it up in your
   classroom to remind you which activities you should focus on." `typescale.body` `role.onAppBar`
   + "Page 1 of 4" `typescale.caption`.

---

## 4. Dialogs & popups

Shared anatomy: full-frame scrim `role.scrim`; card `role.surface`, x16, w328 (`size.dialogWidth`),
`radius.xl`, padding 16dp / 24dp, `elevation.dialog`; leading content 296dp
(`size.dialogContentWidth`); stacked buttons 296×40 with 16dp gaps, primary above secondary.

| ID | Node | Card geometry | Trigger rule | Anatomy |
|---|---|---|---|---|
| **Q1** dialog card - question | [145:27966](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-27966) / [145:30537](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-30537) | 328×402 / 328×308 | Tapping **"Track progress"** or **"Continue tracking progress"** on the dashboard (note 145:27863); also tapping the "Progress reports" list item when no reporting periods are set (note 145:28411) | 100dp round illustration → Heading `typescale.h3` `role.textDark` centred → Detail `typescale.body` `role.textMid` centred → primary + secondary |
| **E1** dialog card - error | [145:28415](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-28415) / [145:28730](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-28730) | 328×402 / 328×346 | The principal picks a reporting-period **start & end date too close together**, per use case 4 (notes 145:29492, 145:28413) | 100dp round illustration or 48dp `!` in `status.error.main` → Heading → Detail in `status.error.dark` → primary + secondary. Two copies: **principal only** (145:28729) and **non-principal practitioner** (145:28793) |
| **W1** WO5.2.10a Create report warning | [145:25896](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-25896) | card over dimmed step 3 | Tapping **Create report** on R3 | Orange circular `!` 48dp (`size.iconXl`) fill `status.alert.main` → `typescale.h3` centred "Are you sure you want to create the report?" → body `typescale.body` `role.textMid` "Once you create the report, you will not be able to edit it." → **primary** 296×40 "Yes, create report" (chart glyph, `role.action`) → 16dp → **secondary** 296×40 "No, edit report" (pencil glyph, `role.surface` + 2dp `role.action` border). **Scrim tap does not dismiss** — an explicit choice is required |
| **IM1** WO5.1.1a image pop-up | [145:24092](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-24092) | full-frame overlay | Tapping the **Picture** pill on a question row | Scrim + centred image card `role.surface`, `radius.xl`, illustration of the skill + caption `typescale.help` `role.textMid` + ✕ dismiss 22dp. Scrim tap dismisses |
| **T0** 5A.6.0a walkthrough language picker | [145:23759](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-23759) / [145:30418](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-30418) | tutorial card 328×299 @ y171 | First entry to any progress section (notes 145:23753, use cases 33/34) | 100×100 round mascot → text row → **Filled select** 296×48 (language) → **primary** 296×40; secondary hidden |
| **OV1** dialog card - overlay | [145:29509](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-29509) | 328×298 | Generic overlay instance | Illustration + text + buttons |
| **TUT** dialog card - tutorial (bottom sheet) | see §5 | 328×168 | Walkthrough steps | 80×80 mascot, heading, 10-dot pager + current bar, small "Next" pill |

---

## 5. Walkthrough / coach-mark pattern

Identical mechanics to the Programme walkthrough — one overlay system, two step lists.

**Layer stack (bottom → top)**

1. **Host screen** — the real progress screen the step targets, rendered live but inert.
2. **Scrim** — `Rectangle 1`, 360×640, fill `role.scrim` (primary at 70% alpha). Absorbs all touches
   except the tutorial card's controls.
3. **Spotlight cut-out** — the target element re-drawn above the scrim at its true coordinates, with
   a 2dp `role.onAppBar` outline following the element's own radius (`radius.md` for cards/rows,
   `radius.xl` for pills, `radius.full` for icon circles) and 8dp padding. A step may spotlight a
   partial region rather than a whole component.
4. **Arrow** — 24dp pointer glyph in `category.teachingTips.main`, on the side of the spotlight facing
   the card, 8dp clear of the outline, rotated toward the target.
5. **Tutorial card** — `dialog card - tutorial`: x16 w328, **168dp**, y457 as a bottom sheet (flip to
   y88 when the spotlight is in the lower half), fill `role.surface`, `radius.xl`, padding 16dp,
   `elevation.dialog`.
   - Left: **80×80** round mascot illustration (yellow bee/bug character).
   - Right: heading `typescale.h4` in `role.textDark`, e.g. "Throughout the year, observe children &
     add your observations."
   - **Dot pager** bottom-left: **10 dots** at 10dp with 8dp gaps, inactive fill `role.line`; the
     current position is an elongated **20×10** bar, `radius.full`, fill `role.select`.
   - **"→ Next"** small pill bottom-right: **67×32**, `radius.md`, fill `role.action`, label
     `typescale.buttonSmall` `role.onAction`. Final step's label becomes "Done".
   - **"Skip"** text link left of Next, `typescale.buttonSmall` `role.textMid`.

**Behaviour rules**

- Trigger: **the very first time** the user goes to **any** progress section — tapping the "to do"
  item **or** tapping through on the progress list item (note 145:23753). **Show once only** — do not
  re-show on each child profile (note 145:23848).
- Sequence: **T0 language picker → T2…T12** (12 steps).
- On finish or skip, **land back on the screen the user came from** (note 145:26266).
- Re-launchable any time from **I1 WO5.4.2** ("→ Start walkthrough").
- Persist `walkthrough_seen.progress = true` per user.
- Scrim tap advances; tapping the spotlit element advances without performing its real action.

**Progress step list**

| Step | Node | Spotlight target / message intent |
|---|---|---|
| T0 | [145:23759](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-23759) / [145:30418](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-30418) | Language picker dialog (not a spotlight step) |
| T2 | [145:26270](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-26270) | WO5.1.0 landing — "Throughout the year, observe children & add your observations." |
| T3 | [145:26420](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-26420) | Age-band badge / tracker language |
| T4 | [145:26343](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-26343) | Question screen — the Yes / No / Don't know segments |
| T5 | [145:26496](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-26496) | "Picture" pill |
| T6 | [145:26799](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-26799) | "✕ Save & exit" — you can stop and come back |
| T7 | [145:26697](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-26697) | "Choose 4 skills to work on" step |
| T8 | [145:26902](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-26902) | Per-skill "to do" plan |
| T9 | [145:26595](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-26595) | Completion summary grouped by developmental category |
| T10 | [145:23536](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-23536) (5A.6.1 step 10) | "Create caregiver report" CTA |
| T11 | [145:26991](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-26991) | Share report / report language |
| T12 | [145:23650](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-23650) | Progress tab dashboard, "See summary" + "?" help |

---

## 6. States & edge cases

| State | Where | Treatment |
|---|---|---|
| **No reporting periods set (principal)** | G0 [145:27751](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-27751) | Message + CTA into G1 to set the year's periods (note 145:27749) |
| **No reporting periods set (practitioner)** | G0 [145:27825](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-27825) | Read-only message: the principal hasn't set the periods yet; **no CTA** (note 145:27750) |
| **Periods created, nothing tracked** | G2 | Principal: show if **no** observations have been STARTED for **any** child in the preschool. Practitioner: show if no observations have been started for any child **in their class** (note 145:27857) |
| **Some observations started** | G2 | Scenario 1 / 2 dashboards (notes 145:27859, 145:27861); CTA "Continue tracking progress" |
| **All reports complete for the period** | G2-c | Celebration card, 100%, Download all + See summary (note 145:28404) |
| **Empty — no observations for this child** | L1-e | "Start" CTA; auto-selected age range shown (note 145:23942) |
| **In progress** | L1-p | "Continue" CTA; partial answers preserved via "Save & exit" |
| **Complete — report not yet created** | L2 | Success alert + "Create caregiver report" |
| **Complete — report created** | L1 / V1 | Report list rows with "View" pills; report is **read-only forever** |
| **Before the reporting window opens** | L1 | Hide "Create caregiver report" — today's date is BEFORE the start date of the next upcoming reporting period, so the user can't create the report yet (note 145:23940) |
| **All periods closed (year end)** | L1, EY1 | `status.info.*` alert "All reporting periods for the year are closed. You can keep tracking progress next year."; EY1 shown when **all** periods are complete (note 145:30662) |
| **Over-age (>78 months)** | L1-o | No tool exists; message only, no actions (note 145:29430) |
| **Children over 60 / 78 months in a summary** | S5 | Amber `status.alert.*` alert appended at the bottom of the summary screen (notes 145:29491, 145:29463) |
| **All answers "Yes"** | O-S variant [145:24217](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-24217), L2 [145:25069](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-25069)/[145:25150](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-25150), R3 [145:30384](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-30384) | The "choose 4 skills" step is **skipped** (use case 19); the report flow uses the all-yes variant (use case 21, note 145:30417). "Yes to all" means **Yes** to every normal item **and No to the reverse-scored items** (notes 145:23952, 145:23953) |
| **No "Don't know" answers** | L2 [145:24961](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-24961) | Omit the "You chose 'Don't know' for these skills" section (note 145:23951) |
| **Too many "Don't know"** | L2 [145:25229](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-25229) | Scenario 5 — encourage further observation before reporting |
| **Fewer than 4 candidate skills** | O-S [145:24196](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-24196) | Require all available items instead of 4 |
| **Permission-restricted practitioner** | C1, L1, G2 | Practitioners may track progress and create caregiver reports **only if the principal has granted permission**, and **only for children in their own class(es)** (note 145:28931). On the child profile, only show the create button per the visibility matrix in note 145:28937. Special state: no permission to create reports + not all reports complete + all observations done (note 145:30311) |
| **Reporting periods already set** | G1 | Principal **cannot edit** once set; show all previous selections when updating for the following year (note 145:28413) |
| **Invalid period dates** | E1 | Start & end too close together → error dialog (use case 4, note 145:29492) |
| **Offline** | whole feature | Observations, skills, plans and notes are **local-first**: writes always succeed and queue (see `patterns/offline-first.md`). Show the offline ticker under the app bar and a "Saved on your phone. Will send when you're back online." informational snackbar on Save & exit. **Report creation is a commit point** — if the device is offline, allow the local commit but mark the report **Pending** (`status.alert.*` chip) and disable **Share** until it has synced, because the shared artefact must match the server copy. Downloading the summary PDF and "Download all reports" require connectivity — warn, never block navigation |
| **Notifications** | NT1 / NT2 | All progress notifications belong to feature set **W29**; each hub notification carries a **priority number** and **only one can be shown at a time** (note 145:23755) |

---

## 7. Business rules for back-end devs

### 7.1 Data the client needs

- `reporting_period` → `{ id, preschool_id, year, index, start_date, end_date, deadline_date }` — created by the **principal only**, yearly, **immutable once set** (note 145:28413).
- `child` → `{ id, name, dob, class_id, caregiver_ids[] }` — `dob` drives age-band selection.
- `progress_tool` → `{ id, age_band, instrument: CREDI|NCF|ChildSteps, item_count, info_message_key }`.
- `progress_item` → `{ id, tool_id, order, text_by_language{}, illustration_url | null, subcategory_id, reverse_scored: bool }`.
- `subcategory` → `{ id, name, category_id }`; `category` → `{ id, name, domain_token }` (§7.6).
- `observation` → `{ id, child_id, reporting_period_id, tool_id, answers[{item_id, value: yes|no|dont_know}], status: not_started|in_progress|complete }`.
- `working_on` → `{ observation_id, item_id, to_do_text }` — the chosen skills + plans (normally 4).
- `child_note` → `{ child_id, reporting_period_id, text }` — **private, never shared with the caregiver**.
- `caregiver_report` → `{ id, child_id, reporting_period_id, step1_text, step2_text, step3_text, created_at, language_code, immutable: true }`.
- `practitioner_permission` → `{ practitioner_id, class_id, can_create_progress_report }`.

### 7.2 Age-band tool selection (note 145:30676) — **preserve exactly**

The tool is **auto-selected based on the child's age as of the report deadline** (note 145:23942).

| Age band | Item count | Info message |
|---|---|---|
| 0 to 5 months | 20 items | CREDI info message |
| 6 to 11 months | 20 items | CREDI info message |
| 12 to 17 months | 20 items | CREDI info message |
| 18 to 23 months | 20 items | CREDI info message |
| 24 to 29 months | 20 items | CREDI info message |
| 30 to 35 months | 20 items | CREDI info message |
| 36 to 47 months | 30 items | NCF info message |
| 48 to 60 months | 40 items | NCF info message |
| 61 to 65 months | 48 items | ChildSteps info message |
| 66 to 69 months | 40 items | ChildSteps info message |
| 70 to 74 months | 42 items | ChildSteps info message |
| 75 to 78 months | 38 items | ChildSteps info message |

> Please NOTE that some questions are **reverse-scored (Yes = No, No = Yes)**.
> See all questions here: https://docs.google.com/spreadsheets/d/1tgZShCW8GDQmS8vbEVTARdV0ikngdnCeL8N37b2JmkI/edit#gid=780630994
> 5+ tools: https://docs.google.com/spreadsheets/d/1TELA3a2PvLVd31khGDFWBlDLaag7BJ_dSfFKvtLcur0/edit?gid=679672980#gid=679672980

Additional rules:

- **Over 78 months** → there is **no progress tool for the child**; show the over-age screen instead (note 145:29430).
- Ages **36–47** and **48–60** months carry **different landing-screen text** (note 145:29208).
- Max questions in any single tool is **40** per note 145:23946 (the 61–65 month ChildSteps tool is listed at 48 items in note 145:30676 — the item-count table above is authoritative; flag the discrepancy with the content team before build).
- **5 questions per screen** (note 145:23950) → number of question screens = `ceil(item_count / 5)`.

### 7.3 Reverse-scored items

- Every `progress_item` carries a `reverse_scored` flag.
- For a reverse-scored item, an answer of **"No" scores as a positive** and **"Yes" scores as a negative** (note 145:30676).
- Therefore the "child can do everything" condition is: **"Yes" to all normal items AND "No" to the reverse-scored items** (notes 145:23952, 145:23953). That condition drives the all-yes scenario variants and the skipped skill-selection step.
- The **candidate pool** for "Choose 4 skills to work on" is the set of items whose **effective score is negative** (i.e. "No" on a normal item, "Yes" on a reverse-scored item) **plus** all "Don't know" answers. Rules for exactly which items to show are in **use case 16** (note 145:23936).

### 7.4 Observation flow rules

1. Questions are presented **5 per screen**; "Next" unlocks only when all 5 on that screen are answered.
2. **"Save & exit"** is available on every step; partial answers persist and the child's landing page moves to the in-progress state.
3. The skill-selection step is **step 5** for the short tools and **step 7 or 9 for older children** (note 145:23936) — derive the step index from `ceil(item_count / 5) + 1`.
4. Select **exactly 4** skills; if fewer than 4 candidates exist, require **all** of them (variant 145:24196).
5. If the child could do everything, **skip the skill-selection step entirely** (use case 19, variant 145:24217) and use the all-yes report variant (use case 21, note 145:30417).
6. After the plans are entered, the completion summary must show the skills being worked on **within the context of developmental categories & subcategories**, and must show **all "Don't know" items** so the practitioner keeps them in mind when observing in future (note 145:23938).
7. **"Change my answers"** re-enters the flow with **all previously saved answers pre-filled** (note 145:23944). Re-deriving the candidate pool and the chosen-skill set after a change is a backend responsibility.
8. Questions with illustrations expose a **Picture** control (WO5.1.1a image pop-up).

### 7.5 Reporting-period gating

| Rule | Detail |
|---|---|
| Who creates periods | **Principal only**, via the Edit-profile form (note 145:28413) |
| Cadence | **Must be updated yearly** |
| Editability | The principal **cannot edit** the periods once they are set; when updating for the new year, **show all previous selections** (note 145:28413) |
| Validation | Start & end dates that are **too close together** raise the error dialog per **use case 4** (note 145:29492) |
| Count | 3 or 4 periods per year are both supported (variants 145:28711, 145:28712) |
| No periods yet | Progress tab and child-profile progress entry points are blocked with role-specific messaging (notes 145:27749, 145:27750, 145:28409, 145:28411) |
| Report creation window | A caregiver report can only be created when **today's date is within a current reporting window**. Before the next period starts, the report cannot be created yet (note 145:23940) |
| Observation window | Observations may be recorded throughout the year; the info page states practitioners should start **within 30 days of a child joining** and observe throughout the year |

### 7.6 Developmental-domain colour mapping — **preserve exactly**

Domain colours are **FIXED**: they encode curriculum meaning and are **never themed**
(`tokens.json → domain`). They apply to the Progress/Notes Card top border + inner shadow
(frame 100:7115), category icon circles, subcategory headers and the PDF panels.

| Developmental category (UI label) | Curriculum name | Token | Value | Typical icon |
|---|---|---|---|---|
| Social emotional | Feeling happy & secure | `domain.happyAndSecure` | `#D3276C` | heart |
| Language | Speaking & listening | `domain.speakingListening` | `#9E4D8E` | speech bubble |
| Cognitive | Discovery & problem solving | `domain.discoveryProblem` | `#6974AF` | lightbulb |
| Physical | Developing bodies | `domain.developingBodies` | `#359AD1` | figure |

Subcategory → category mapping observed in the designs:

| Subcategory | Category / token |
|---|---|
| Personal & emotional | Social emotional — `domain.happyAndSecure` |
| Social | Social emotional — `domain.happyAndSecure` |
| Communication: speaking & listening | Language — `domain.speakingListening` |
| Approaches to learning | Cognitive — `domain.discoveryProblem` |
| Number shape size pattern | Cognitive — `domain.discoveryProblem` |
| Fine motor | Physical — `domain.developingBodies` |
| Gross motor | Physical — `domain.developingBodies` |

> **Implementation note:** the rendered Figma frames show the *Physical* icon in green and the
> *Cognitive* icon in indigo. `tokens.json` is authoritative: `domain.developingBodies` = `#359AD1`
> (blue) for Physical and `domain.discoveryProblem` = `#6974AF` (indigo) for Cognitive. Build against
> the tokens and raise the green Physical icon with the design team as a swatch-vs-token discrepancy.

### 7.7 Report creation & immutability

1. The caregiver report is a **3-step form** (R1, R2, R3). **All 3 steps are character-limited** (note 145:30515) — the backend must publish the limits and enforce them.
2. Step 3 recaps the chosen skills and their "to do" plans (read-only within the form).
3. Tapping **Create report** raises **W1**: "Once you create the report, you will not be able to edit it."
4. On confirmation the report is **written immutable**: `caregiver_report` rows are append-only per `(child_id, reporting_period_id)`. Corrections require a new report in a later period.
5. Observations, chosen skills, plans and notes **remain editable** while the period is open — only the report freezes.
6. **Private notes are never included** in the caregiver report or in any shared artefact.
7. After creation the user lands on **SH1 Share report**: pick the report, pick the report **language**, then share (SH2). The share language is independent of the tracker language.

### 7.8 Permission matrix (note 145:28931, 145:28937)

| Capability | Principal | Practitioner **with** permission | Practitioner **without** permission |
|---|---|---|---|
| Set reporting periods | ✔ (only role that can) | ✗ | ✗ |
| Track progress (observations) | **All children in the preschool** | Children in **their own class(es)** | Children in their own class(es) — view only |
| Create caregiver report | **All children in the preschool** | Their own class(es) only | ✗ |
| "Create progress report" button on child profile | shown per window rules | shown per window rules | **hidden** |
| See summary — class picker | shown only if the preschool has **>1 class** | shown only if assigned to **>1 class** | as applicable |
| Download all reports / summary PDF | ✔ | ✔ | view only |

**Child-profile button visibility (note 145:28937)** — only show the "Create progress report" button IF the practitioner has permission to create progress reports, **and**:

- show it if **progress observations are not complete AND today's date is within a current reporting window**; **or**
- show it if **all observations are complete but the report is not created AND today's date is within a current reporting window**;
- **do not show any button if neither scenario applies**.

Other entry rules: from the child profile, tapping **"Create progress report"** goes to the **current**
progress report (note 145:28933); tapping the **"Progress reports"** list item (the one with the View
button) goes to the child's **progress summary** screen (note 145:28935).

### 7.9 "See summary" gating (note 145:28406)

- **Practitioner:** ONLY show the class-picker screen if the practitioner is assigned to **more than 1 class**.
- **Principal:** ONLY show the class-picker screen if there is **more than 1 class** at the preschool.
- **Both:** ONLY show the age-range screen if reports were created for **multiple age groups**; AND only show the **relevant** age ranges (e.g. if the preschool only has children 0 to 23 months, don't show ranges for children 2 years and older) (also note 145:27913).
- Then the user chooses **Category** (note 145:27912) or **Individual child** (note 145:28408).
- Summary drill-downs append an amber alert when any child in scope is **over 60 months** (note 145:29491) or **over 78 months** (note 145:29463).

### 7.10 Roll-ups, exports & notifications

- **Completion %** on the Progress tab = created reports ÷ children in scope (class for practitioners, preschool for principals) for the current reporting period. 100% flips the dashboard to the celebration state (note 145:28404).
- **Progress Summary PDF** (4 pages, A4) reports "Number of children working on each skill", grouped by category and subcategory, scoped by class + age range, with the practitioner, class name, child count and age band in the meta row (note 145:23757 "Download summary -- PDF").
- **Notifications**: all progress notifications live in feature set **W29**; each hub notification has a **priority number** and **only one can be shown at a time** (note 145:23755). Practitioners — including principals who teach their own classes — see the notification for their own class (note 145:23849).
- **End of year**: when all reporting periods for the year are complete, show the A. Progress update screen (note 145:30662); the child landing page shows "All reporting periods for the year are closed."

---

## 8. Designer notes carried forward (verbatim)

**Comment frames**

- `145:23753` — "The very first time user goes to any progress section (ie, taps on the “to do” item OR taps through on the progress list item)"
- `145:23755` — "Progress summary ALL notifications are in feature set W29 - each hub notification has a priority # (only one can be shown at a time)"
- `145:23757` — "Download summary -- PDF"
- `145:23936` — "Step 5 (step 7 or 9 for older children): Rules for which items to show are in use case 16."
- `145:23938` — "Once this is complete, show the things the practitioner is working on with Themba within the context of developmental categories & subcategories and show all “Don’t know” items so the practitioner keeps this in mind when observing Themba in future."
- `145:23940` — "Timing: today’s date is BEFORE the start date for the next upcoming reporting period - user can’t create the report yet"
- `145:23942` — "View when no observations have been added yet for that reporting period. Please have a look here -- https://docs.google.com/spreadsheets/d/1tgZShCW8GDQmS8vbEVTARdV0ikngdnCeL8N37b2JmkI/edit#gid=780630994 NOTE THAT SOME ITEMS ARE REVERSE-SCORED Auto-select the age range based on child’s age as of the report deadline"
- `145:23944` — "Change my answers -> goes back into the progress tracking flow, all previously saved answers should be filled in within the flow"
- `145:23946` — "EXAMPLE WHERE MORE STEPS REQUIRED See the full set here: https://docs.google.com/spreadsheets/d/1tgZShCW8GDQmS8vbEVTARdV0ikngdnCeL8N37b2JmkI/edit#gid=780630994 Max of 40 questions"
- `145:23948` — "Add a note"
- `145:25789` — "Create progress report"
- `145:25791` — "View a previous report From child profile"
- `145:25793` — "Share a report button from “Themba’s progress” screen"
- `145:26266` — "Land back on the screen the user came from."
- `145:26268` — "Info screen for “Progress” tab and for individual child progress screen."
- `145:27857` — "Progress periods created, but no progress has been tracked yet. Principal - show this if no progress observations have been STARTED for any children in the preschool Practitioner - show this if no progress observations have been STARTED for any of the children in their class."
- `145:27859` — "Once 1 or more observations started Scenario 1"
- `145:27861` — "Once 1 or more observations started Scenario 2"
- `145:27863` — "Tapping any of these buttons: Track progress Continue tracking progress On the previous screens opens the pop-up"
- `145:28404` — "Once all reports are complete for the current reporting period"
- `145:28406` — "“See summary” button Practitioner: ONLY show classes if practitioner is assigned to more than 1 class Principal: ONLY show classes if there is more than 1 class at the preschool Both: ONLY show age range screen if there were reports created for multiple age groups; AND only show the relevant age ranges (e.g. if only 0 to 23 month children in the preschool, don’t show children 2 years and older, etc.)"
- `145:28409` — "Progress tab if NO progress reporting periods have been created for the year yet."
- `145:28411` — "Child profile view if no progress reporting periods chosen yet. TAPPING “PROGRESS REPORTS” LIST ITEM brings up pop-up."
- `145:28413` — "PRINCIPAL ONLY Form to edit the reporting periods Must be updated yearly BUT principal cannot edit once these are set. Show all previous selections when updating for the current year."
- `145:28931` — "Principals can track progress create the caregiver report for ALL children in the preschool Practitioners can track progress create caregiver report ONLY if the principal has granted them permission for children in their own class(es) only"
- `145:28933` — "From child profile, tapping “Create progress report” goes to the current progress report"
- `145:28935` — "Tapping “Progress reports” list item with view button goes to the child’s progress summary screen"
- `145:28937` — "On the child profile, only show this button IF the practitioner has permission to create progress reports: | Show this button if progress observations not complete AND today’s date is within a current reporting window: | Show this button if all observations are complete, but report is not created AND today’s date is within a current reporting window | Do not show any button if neither of the above scenarios apply"
- `145:29209` — "EXAMPLE WHERE MORE STEPS REQUIRED"
- `145:29430` — "IF child is over 78 months, we do not have a progress tool for the child, show the following instead."
- `145:29492` — "Errors to show IF the user chooses a start & end date too close together as defined in use case 4"
- `145:30311` — "User does not have permission to create reports + all reports are NOT complete yet + user has completed all observations for children"
- `145:30662` — "At the end of the year, when all progress reporting periods are complete, show this screen"
- `145:30676` — "Age-based tools: 0 to 5 months (20 items) - CREDI info message | 6 to 11 months (20 items) - CREDI info message | 12 to 17 months (20 items) - CREDI info message | 18 to 23 months (20 items) - CREDI info message | 24 to 29 months (20 items) - CREDI info message | 30 to 35 months (20 items) - CREDI info message | 36 to 47 months (30 items) - NCF info message | 48 to 60 months (40 items) - NCF info message | 61 to 65 months (48 items) - ChildSteps info message | 66 to 69 months (40 items) - ChildSteps info message | 70 to 74 months (42 items) - ChildSteps info message | 75 to 78 months (38 items) - ChildSteps info message | Please NOTE that some questions are reverse-scored (Yes = No, No = Yes) See all questions here: https://docs.google.com/spreadsheets/d/1tgZShCW8GDQmS8vbEVTARdV0ikngdnCeL8N37b2JmkI/edit#gid=780630994 | 5+ tools: https://docs.google.com/spreadsheets/d/1TELA3a2PvLVd31khGDFWBlDLaag7BJ_dSfFKvtLcur0/edit?gid=679672980#gid=679672980"

**Free-text annotations**

- `145:23848` — "First time user taps either of these on a child profile (NOTE: only show once, don’t keep showing on each child profile)"
- `145:23849` — "Practitioner (incl. principals who teach their own classes) viewing notification for their own class"
- `145:23950` — "5 questions per screen"
- `145:23951` — "If practitioner did not choose “Don’t know” for any of the questions."
- `145:23952` — "If practitioner responded “Yes” to all; and “No” to the reverse-scored items."
- `145:23953` — "If practitioner responded “Yes” to all; and “No” to the reverse-scored items & did not choose “Don’t know” for any of the questions."
- `145:27749` — "Principal only Principal has not set the reporting periods for the current year yet."
- `145:27750` — "Practitioner (non-principal) only Principal has not set the reporting periods yet."
- `145:27912` — "User chooses “Category”" · `145:28408` — "User chooses “Individual child”"
- `145:27913` — "Only show relevant age groups (ie age groups included in the preschool OR practitioner’s class(es))"
- `145:28711` — "3 selected in the previous screen" · `145:28712` — "4 selected"
- `145:28729` — "Principal only" · `145:28793` — "Non-principal practitioner"
- `145:28947` — "No progress observations tracked for child yet" · `145:28948` — "Some progress observations tracked for child" · `145:28949` — "Previous reports created for child"
- `145:29204` — "Use case 16" · `145:29205`/`145:29206` — "SCENARIO 1" · `145:29207` — "Use case 20" · `145:29208` — "For ages 36-47 and 48-60 months has different text"
- `145:29463` — "IF there are any children who are over 78 months old, then show the amber alert at the bottom of the screen"
- `145:29491` — "IF there are any children who are over 60 months old, then show the amber alert at the bottom of the screen"
- `145:29510` — "USE CASE 11" · `145:29512` — "USE CASE 15" · `145:29513` — "USE CASE 12 scenarios" · `145:29514` — "USE CASE 14" · `145:29540` — "USE CASE 13"
- `145:29515`–`145:29520` — "Scenario 1" / "Scenario 2" / "Scenario 3 (a)" / "Scenario 3 (b)" / "Scenario 4" / "Scenario 4" · `145:30562` — "scenario 5"
- `145:29576`–`145:29584` — "Use case 17 / SCENARIO 2 / Use case 18 / SCENARIO 3 / Use case 19 / SCENARIO 4 / use case 20, SCENARIO 1 / SCENARIO 3 / Use case 22"
- `145:29633`–`145:29638` — "Use case 22 / Use case 23 / Use case 24 / Use case 25 / Use case 26 / Use case 27" · `145:29814`–`145:29818` — "SCENARIO 1..5"
- `145:30313`–`145:30316` — "Use case 28 / Use case 29 / Scenario 1 / Scenario 2" · `145:30488`–`145:30495` — "Use case 30..36" · `145:30602` — "Use case 9a"
- `145:30417` — "IF the child could do everything (ie, use case 21 applies)"
- `145:30515` — "character limit for all 3 steps"
- `145:30534` — "Scenario 1 - child has no previous reports" · `145:30535` — "Scenario 2 - child has previous reports"
