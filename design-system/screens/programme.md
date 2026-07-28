# Programme screens

The **Programme** feature (screen family `WO6.x`, entry point `WO2.2.0`) is where a practitioner or
principal plans the classroom day: a day-by-day "Activities" view per class built from five fixed
routine slots (Greeting time & message board, Small group activity, Free play, Large group activity,
Story & activity). A user either sets up a **themed programme** — pick a theme, pick a date range and
a classroom language, and the app auto-plans every school day in that range — or plans **manually with
no theme**, choosing a small-group activity, a large-group activity and a story + story-activity for
each day. Layered on top are a recommendation engine (theme activity of the day, plus skills-gap
recommendations), a set of planning **nudges** (start planning, plan next week, streaks, missing
skills, "what are children working on"), a "?" **info-dialog** system, and a 10-step overlay
**walkthrough**. Planning is an online-only capability, and read/write access is governed by the
principal's practitioner-permission matrix (W3).

**Figma source**

| What | Deep link |
|---|---|
| Canvas "Page 22" (whole feature) | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-5234 |
| Band 1 — Setting up a themed programme | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-6616 |
| Band 2 — No theme, manual planning | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-6617 |
| Band 3 — Planning nudges / guides | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-6618 |
| Band 4 — Viewing planned activities & past days | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-11014 |
| Band 5 — Info dialogs, walkthrough, info screens | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-6619 |

All frames are 360dp wide (`size.frameWidth`), content column 328dp (`size.contentWidth`), screen
margin 16dp (`space.screenMargin`).

---

## 1. Flow map

```
                       ┌──────────────────────────────────────────┐
                       │ P0  WO2.2.0 Children/Classroom dashboard │  145:11543
                       │     tabs: …oners | Children | PROGRAMME  │
                       └───────────────┬──────────────────────────┘
                    "Programme" tab ── or ── Classes tab ▸ class ▸ "Plan activities"  (145:11399/11600)
                                       │
                                       v
        ┌──────────────────────────────────────────────────────────────────┐
        │ P1  WO6.1.0 Programme dashboard — day view                       │  145:11401
        │     class header · month pill · day pager · theme banner ·       │  (+~20 variants)
        │     routine timeline · FAB "＋ Add new theme"                    │
        └───┬────────────┬───────────────┬──────────────┬─────────────┬────┘
            │            │               │              │             │
   [FAB]    │   [tap routine slot]       │  [month pill]│   [nudges]  │  [? icon]
            │            │               │              │             │
            v            │               v              v             v
 ┌──────────────────┐    │        ┌────────────┐  ┌───────────┐  ┌──────────────────┐
 │ P2 WO6.1.1       │    │        │ P1-month   │  │ D3..D7    │  │ P16 WO6.5.4      │
 │ Choose a theme   │    │        │ month view │  │ nudge     │  │ Programme best   │
 │ 145:6901         │    │        │ (in-place) │  │ dialogs   │  │ practices        │
 └────────┬─────────┘    │        └────────────┘  └───────────┘  │ 145:9329         │
          v              │                                       └───┬───┬───┬──┬───┘
 ┌──────────────────┐    │                                           │   │   │  │
 │ P3 WO6.1.2       │◀── D8 native Date picker 145:6669              │   │   │  └─▶ back to P1
 │ Timing           │                                                │   │   │      "Start planning
 │ 145:7103         │                                                │   │   │       my programme"
 └────────┬─────────┘                                                │   │   │
          │ Save                                                     │   │   └─▶ P19 WO6.5.7 Developing
          v                                                          │   │        children holistically
 ┌──────────────────┐                                                │   │        145:9531
 │ D1 WO6.1.2a      │  145:6973  "Great, I have set up your          │   └─────▶ P18 WO6.5.5 Learning
 │ programme set up │            Nature programme!"                  │            through play 145:9497
 └────────┬─────────┘                                                └─────────▶ P17 WO6.5.6 The daily
          │ "See programme"                                                       routine 145:9388
          └────────────────────────────▶ P1 (themed, days auto-planned)
                                       │
      ┌────────────────────────────────┴───────────────────────────────────┐
      │              ROUTINE SLOT BRANCHES (from P1)                       │
      └────────────────────────────────────────────────────────────────────┘

  A. Small group activity
     P4 WO6.1.4 / WO6.2.1 Choose small group activity   145:6671 / 145:7250
        ├─ [i] ─▶ P5 WO6.1.3 / WO6.2.2 View small group activity  145:7152 / 145:7599
        │            └─ "✔ Choose this activity" / "⟳ Change activity" ─▶ back to P1
        ├─ no results ─▶ P6 WO6.1.4 no activity found  145:7215
        └─ Save ─▶ P1 (slot filled)

  B. Large group activity
     P7 WO6.2.3 Choose large group activity  145:7686
        ├─ [i] ─▶ P8 WO6.2.4 View large group activity  145:7646
        └─ Save ─▶ P1

  C. Story & activity  (2 steps — the slot is only complete after step 2)
     P9  WO6.2.5 Choose a story        145:8131   "Step 1 of 2"
         ├─ [i] ─▶ P10 WO6.2.6 View story  145:11204
         └─ Save & next
              v
     P11 WO6.2.7 Choose a story activity  145:8276  "Step 2 of 2"
         ├─ [◀ Choose a different story] ─▶ back to P9
         ├─ [i] ─▶ P12 WO6.2.8 Story activity  145:8420
         └─ Save ─▶ P1

      ┌────────────────────────────────────────────────────────────────────┐
      │              WALKTHROUGH (first visit to Programme)                │
      └────────────────────────────────────────────────────────────────────┘
     P1 ─▶ D9 5A.6.0a language picker 145:9753
             └─▶ D10 WO6.5.1a walkthrough start 145:9818
                    ├─ "Yes" ─▶ W1..W10  145:8849, 9003, 9151, 9240, 9899,
                    │                     10050, 10192, 10343, 10619, 10870
                    │              └─ finish / skip ─▶ P1
                    └─ "No, skip" ─▶ D11 WO6.5.2 declined 145:9880 ─▶ P1
```

### Happy path — set up a themed programme (numbered)

1. User lands on **P0 WO2.2.0** (Classroom) and taps the **Programme** tab. *(Alternative entry: Classes tab → tap a class → "Plan activities" — note 145:11399/145:11600.)*
2. **P1 WO6.1.0** renders today's day view for the selected class. The day is unplanned and there is no theme banner.
3. User taps the extended FAB **"＋ Add new theme"**.
4. **P2 WO6.1.1 Choose a theme** lists all configured themes (count is dynamic — note 145:8836). User taps *Nature*.
5. **P3 WO6.1.2 Timing** opens with the start date pre-filled to the next unassigned school day (note 145:6632) and the end date pre-filled to the end of the programme (note 145:6631). User may tap either field to open **D8** the phone's native date picker (note 145:6629).
6. A green availability banner confirms "These dates are available". User picks the classroom language from the dropdown.
7. User taps **Save** → **D1 WO6.1.2a** dialog: "Great, I have set up your *Nature* programme! All your activities have been planned for 5 May to 30 May!".
8. User taps **🗓 See programme** → back to **P1**, now showing the theme banner and every school day in range auto-planned.
9. User taps any routine slot to review or change the auto-chosen activity (**P5 / P8 / P10 / P12**, button reads "⟳ Change activity" — note 145:11015).

### Branch — manual planning, no theme (WO6.2.x)

1. From **P1** with no theme, user taps **＋ Add activity** on the *Small group activity* rail.
2. **P4 WO6.2.1** (none selected) shows the filter bar (search, Theme ▾, Language ▾, Skill ▾) and the ordered activity list.
3. User taps the blue **i** on a card → **P5 WO6.2.2 View small group activity, not selected**; the footer button reads "✔ Choose this activity". Choosing returns to **P4** with that card selected, or straight to **P1**.
4. User taps **Save** → **P1**, small-group slot now filled.
5. Repeat for *Large group activity* (**P7 → P8**).
6. **＋ Add story** → **P9 Choose a story** ("Step 1 of 2") → **Save & next** → **P11 Choose a story activity** ("Step 2 of 2") → **Save** → **P1**. The day is only complete once *both* steps are done (note 145:11021).

### Branch — resume an incomplete story slot

1. User previously chose a story but exited before choosing a story activity.
2. On **P1** the *Story & activity* rail still shows **＋ Add story**.
3. Tapping it deep-links to **P11 WO6.2.7** with the previously chosen story already selected and displayed in the "Story chosen: Serapana" header (note 145:11021).

### Branch — viewing a past date (read-only)

1. User uses the **‹ Back** pager or the month view to land on a date earlier than today.
2. If the day was planned, the slots render normally but every "Change activity" / "Change activity & story" button is **disabled** (note 145:11023).
3. If the day was **not** planned, no Add buttons are rendered; an inline message replaces them (note 145:11025).

### Branch — nudge dialogs

1. On entering **P1** the client evaluates the nudge rule set (§8) in priority order and shows **at most one** dialog.
2. Priority 1 — one or more *future* days in the current week are unplanned → **D3 WO6.3.0a start-planning nudge** (145:8527).
3. Priority 2 — current week fully planned but next week has unplanned days → *plan next week* variant; its primary CTA jumps to the first unplanned day of next week (note 145:6653).
4. Streak, missing-skills, weekend/holiday and "what are children working on" variants follow (§5, §8).

### Branch — walkthrough (first visit)

1. First time the user opens the Programme section (note 145:6656) → **D9 5A.6.0a** language picker.
2. → **D10 WO6.5.1a** "Would you like a walkthrough?".
3. Yes → **W1…W10** overlay steps; No, skip → **D11 WO6.5.2** which spotlights the "?" icon so the user knows where to find it later (note 145:6620).

---

## 2. Screen inventory

| Code | Name | Figma node | Size (dp) | State / variant | Purpose |
|---|---|---|---|---|---|
| P0 | WO2.2.0 Children / Classroom dashboard | [145:11543](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-11543) | 360×640 | default | Classroom landing, tabbed; entry to Programme |
| P0-b | WO2.2.0 tall variant | [145:11553](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-11553) | 360×706 | scrolled | Longer children list |
| P0-e1 | WO2.2.0 empty — practitioner | [145:12254](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-12254) | 360×— | empty | 24 June change request |
| P0-e2 | WO2.2.0 empty — principal | [145:12266](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-12266) | 360×— | empty | 24 June change request |
| P1 | WO6.1.0 Programme dashboard — day unplanned, no theme | [145:11401](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-11401) | 360×645 | base | Day view with routine slots |
| P1-a | …day planned | [145:11602](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-11602) | 360×785 | planned | Slots filled |
| P1-b | …themed variants | [145:11690](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-11690) / [145:11741](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-11741) / [145:11790](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-11790) | 360×— | theme banner | Theme active |
| P1-c | …with alert / nudge inline | [145:11847](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-11847) | 360×912 | alert | Dashboard alert band |
| P1-d | …streak / all-planned | [145:11925](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-11925) | 360×934 | celebratory | note 145:11843 |
| P1-r | …read-only (no add/edit permission) | [145:12189](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-12189) | 360×— | permission-restricted | notes 145:12175/12178/12184/12186 |
| P2 | WO6.1.1 Choose a theme | [145:6901](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-6901) | 360×640 | list | Theme picker |
| P3 | WO6.1.2 Timing | [145:7103](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-7103) | 360×706 | empty | Dates + language |
| P3-a | …filled / enabled | [145:7119](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-7119) | 360×— | filled | Save enabled |
| P3-b | …edit mode | [145:7136](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-7136) | 360×— | edit | Editing an existing theme's dates (note 145:6633) |
| P3-c | …date-overlap error | [145:7199](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-7199) | 360×— | error | Range clashes with another programme |
| P4 | WO6.1.4 / WO6.2.1 Choose small group activity | [145:6671](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-6671) / [145:7250](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-7250) | 360×845 | none selected | Activity chooser |
| P4-s | …selected | [145:7427](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-7427) | 360×— | selected | Save enabled |
| P4-d | …activity already included this week | [145:8657](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-8657) | 360×1023 | duplicate warning | note 145:6641 |
| P5 | WO6.1.3 / WO6.2.2 View small group activity | [145:7152](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-7152) / [145:7599](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-7599) | 360×1655 / 360×1674 | selected / not selected | Activity detail |
| P5-p | …past date, read-only | [145:11074](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-11074) | 360×1627 | past-date | Buttons disabled (note 145:11023) |
| P6 | WO6.1.4 Choose small group activity — no activity found | [145:7215](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-7215) | 360×640 | empty result | Zero-result state |
| P7 | WO6.2.3 Choose large group activity | [145:7686](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-7686) | 360×926 | none selected | Chooser w/ skills-gap reason |
| P7-s | …selected | [145:7890](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-7890) | 360×— | selected | — |
| P8 | WO6.2.4 View large group activity | [145:7646](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-7646) | 360×1507 | not selected | Detail; variant 145:11164 (1516) |
| P9 | WO6.2.5 Choose a story | [145:8131](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-8131) | 360×941 | none selected | Step 1 of 2; selected 145:8203 |
| P10 | WO6.2.6 View story | [145:11204](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-11204) | 360×2400 | with question | Full story text |
| P10-n | …no question | [145:12319](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-12319) | 360×2203 | no question | note 145:12453 |
| P11 | WO6.2.7 Choose a story activity | [145:8276](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-8276) | 360×805 | step 2 of 2 | Story-activity chooser |
| P12 | WO6.2.8 Story activity | [145:8420](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-8420) | 360×1595 | not selected | Story-activity detail; 145:12278 (1507) |
| P16 | WO6.5.4 Info screen — Programme best practices | [145:9329](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-9329) | 360×830 | hub | Help hub + walkthrough launcher |
| P17 | WO6.5.6 The daily routine | [145:9388](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-9388) | 360×2913 | content | Long-form info |
| P18 | WO6.5.5 Learning through play | [145:9497](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-9497) | 360×800 | content | Info page |
| P19 | WO6.5.7 Developing children holistically | [145:9531](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-9531) | 360×1964 | content | 4 illustrated sections |
| D1 | WO6.1.2a Dialog — themed programme set up | [145:6973](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-6973) | card 328×322 @y159 | success | Post-setup confirmation |
| D2 | dialog — simple warning / info | [145:7038](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-7038) | card 328×322 @y159 | warning | Generic 1-button dialog |
| D3 | WO6.3.0a Dialog — start planning nudge | [145:8527](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-8527) | card 328×378 @y131 | nudge | Priority 1/2 planning nudge |
| D4 | WO6.1.0 Dialog — full programme planned | [145:8462](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-8462) | card 328×378 @y131 | celebratory | Current + next week planned |
| D5 | WO6.3.1 Dialog — What are children working on? | [145:8592](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-8592) | card 328×547 @y46 | summary | Post-reporting-period summary |
| D6 | WO6.5.0a–f "?" info dialogs | [145:8837](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-8837) (themes), [145:8841](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-8841) (small group), [145:8845](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-8845) (large group), [145:9636](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-9636) (greeting & message board), [145:9640](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-9640) (free play), [145:9749](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-9749) (story & activity) | card 328 w | info | Contextual "?" help |
| D8 | Date picker | [145:6669](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-6669) | 360×640 | native | OS date picker |
| D9 | 5A.6.0a Dialog — walkthrough language picker | [145:9753](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-9753) | card 328×299 @y171 | tutorial | Pick tutorial language |
| D10 | WO6.5.1a Dialog — walkthrough start | [145:9818](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-9818) | card 328×421 @y110 | tutorial | Offer walkthrough |
| D11 | WO6.5.2 Walkthrough — declined | [145:9880](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-9880) | 360×641 | overlay | Spotlights "?" icon |
| D12 | dialog card — overlay (class actions) | [145:11584](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-11584) | 328×400 | menu | 1 primary + 5 secondary |
| D13 | filter open | [145:12236](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-12236) | 328×486 | dropdown | Filter menu |
| W1–W10 | WO6.5.3 Walkthrough steps 1–10 | [145:8849](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-8849), [145:9003](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-9003), [145:9151](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-9151), [145:9240](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-9240), [145:9899](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-9899), [145:10050](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-10050), [145:10192](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-10192), [145:10343](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-10343), [145:10619](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-10619), [145:10870](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-10870) | 360×640 | overlay | Coach-mark tutorial |

---

## 3. Screen specs

Conventions used below: **y** values are absolute from the top of the 360dp frame; **x16 w328** means
inset 16dp from both edges. Every tappable element is wrapped in a ≥48dp touch target
(`size.touchTarget`) even when its visual height is 40dp (`size.buttonHeight`).

### P1 — WO6.1.0 Programme dashboard, day view · [145:11401](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-11401)

Build top-to-bottom:

1. **App bar** (`App bar` / title+subtitle+help variant) — 0→64, full-bleed, fill `role.appBar`,
   `elevation.base`. Left 24dp back chevron (`size.iconLg`) in `role.onAppBar`. Centre stack: title
   "Activities" `typescale.h3` in `role.onAppBar`; subtitle = class name e.g. "Elephants"
   `typescale.help` in `role.onAppBar` at 80% opacity. Right: circular **help chip** 32dp, fill
   `role.action`, glyph "?" 20dp `role.onAction`. *Hide the help chip entirely for permission-restricted
   practitioners (note 145:12186).*
2. **Class header row** — y64→104, x16 w328. Left: `typescale.h1` class name "Elephants" in
   `role.textDark`, ellipsised at one line (note 145:12454). Right group, 8dp gap:
   - **Month pill** — 40dp high (`size.chipHeight`), `radius.xl`, fill `role.action`, label
     "May 2024" `typescale.chipActive` in `role.onAction`, trailing 16dp chevron-down. Tapping
     toggles the inline month view (note 145:6661).
   - **Calendar icon button** — 40dp circle, `radius.full`, fill `role.select`, 20dp calendar glyph
     in `role.onSelect`. Jumps to today (note 145:6665).
3. **Dashed divider** — 1dp (`size.hairline`), `role.line`, dashed 4/4, x16 w328.
4. **Day pager row** — 40dp high, x16 w328, three columns.
   - "‹ Back" pill: 32dp high, `radius.xl`, fill `role.selectSubtle`, label `typescale.chip` in
     `role.select`, leading 16dp chevron-left.
   - Centre: current date "Mon, 5 May 2024" `typescale.h4` in `role.textDark`.
   - "Next ›" pill: mirror of Back.
   - Back/Next **skip weekend days but include public holidays** (note 145:6665).
5. **Theme banner** — x16 w328, 40dp, `radius.md`, fill `role.background`. No theme: label
   "No theme" `typescale.help` in `role.textMid`, centred. Theme active: leading 24dp theme icon
   circle in the theme hue, label "Nature" `typescale.h4` in `role.textDark`; the whole bar is
   tappable and opens **P3 in edit mode** to change start/end dates (note 145:6633).
6. **Routine timeline** — x16 w328, vertical stack, 8dp gaps, in fixed order:
   1. *Greeting time & message board* — **fixed routine bar**: 48dp, `radius.md`, fill
      `role.appBarMuted`, label `typescale.h4` in `role.onAppBar`, right-aligned duration "10-20"
      `typescale.help` + 16dp clock glyph, both `role.onAppBar`.
   2. *Small group activity* — **planning rail**: 24dp left label column (`typescale.help`,
      `role.textMid`) + 1dp vertical divider `role.line` + slot content.
   3. *Free play* — fixed routine bar as above, duration "90".
   4. *Large group activity* — planning rail.
   5. *Story & activity* — planning rail.
   - **Empty slot control**: dashed-outline button, 56dp high, `radius.md`, 2dp dashed border
     `role.select`, transparent fill, leading 20dp plus glyph + label "＋ Add activity" /
     "＋ Add story" `typescale.button` in `role.select`.
   - **Filled slot control**: `action item icon` row, 80dp (`size.rowDefault`), `radius.md`, fill
     `role.background`; leading 48dp icon circle in `category.activities.main` (activities) or
     `category.stories.main` (story) with 22dp white glyph; title = activity name `typescale.h4`
     `role.textDark`; subtitle = skills line `typescale.help` `role.textMid`; trailing 24dp
     chevron-right `role.textMid`.
7. **FAB** — extended FAB, 187×48 (`size.fab` high), `radius.xxl`, fill `role.action`, label
   "＋ Add new theme" `typescale.buttonFab` in `role.onAction`, leading 24dp plus, `elevation.button`.
   Anchored bottom-right, 16dp from both edges (y581 on the 645 frame). **Hidden** for
   permission-restricted practitioners (note 145:12175) and when the current + next week are fully
   planned (note 145:6645).
8. **Nudge / alert band** (variants P1-c, P1-d) — inserted between (5) and (6) as an `Alert` instance,
   x16 w328, `radius.md`: Informational uses `status.info.bg` fill, 20dp icon and title in
   `status.info.main`, body `typescale.help` in `role.textMid`; Success (streak, all-planned) uses
   `status.success.bg` / `status.success.main`; weekend & holiday messages use `status.info.bg`.

**Month view (in-place expansion)** — tapping the month pill expands a 7-column calendar grid
directly under the class header, x16 w328, cell 44×44, `typescale.help`. Today's date: 2dp ring
`role.action`. Selected day: filled circle `role.select` with `role.onSelect` label. Horizontally
swipeable between months; tapping the pill again collapses it (note 145:6661).

### P0 — WO2.2.0 Children / Classroom dashboard · [145:11543](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-11543)

1. **App bar** 0→64, `role.appBar`: back chevron, title "Classroom" `typescale.h3`, subtitle
   "Monday, 5 September 2022" `typescale.help`, right "?" chip `role.action`.
2. **Tabs** — 56dp (`size.tabBar`), fill `role.surface`, horizontally scrollable underline tabs:
   "…oners | Children | **Programme** | Resources". Active label `typescale.h4` in `role.action`
   with a 2dp underline `role.action`; inactive `role.textMid` over a 1dp track `role.line`.
3. **Children list** — x17 w328, first row y136; 5 × `action item icon` rows, 80dp each, 4dp gap
   (`space.listGap`, 84dp pitch): 48dp avatar circle (photo, else initials on `role.appBarMuted`),
   `typescale.h4` name in `role.textDark`, `typescale.help` subtitle in `role.textMid`, 24dp
   chevron-right `role.textMid`.

### P2 — WO6.1.1 Choose a theme · [145:6901](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-6901)

1. **App bar** 0→64: back, title "Choose a theme", "?" chip `role.action`.
2. **Page Title** — x16 y≈102, `typescale.h2` in `role.textDark`: "Choose a theme for Elephants:".
3. **Theme list** — x16 w328, cards 72dp, 12dp gap, `radius.md`, fill `role.background`:
   48dp icon circle (`size.iconCircle`, `radius.xxl`) + 22dp white glyph + theme name
   `typescale.h4` in `role.textDark` + 24dp chevron-right `role.textMid`.
   Icon-circle hues by theme: Animals `role.select`; Nature `domain.speakingListening`; Games
   `domain.discoveryProblem`; Transport `category.activities.main`; Home & family
   `category.other.main`. Theme count is **dynamic** (note 145:8836); the shipped SmartStart themes
   pull through with the SmartStart logo (note 145:6668).

### P3 — WO6.1.2 Timing · [145:7103](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-7103)

1. **App bar** 0→64: back, title "Choose dates and language", subtitle "Theme: Nature".
2. **Form Layout** container y79, w360, inner x16 w328.
   - **Page Title** 36dp: "Set up your theme for Elephants" `typescale.h2` `role.textDark`.
   - **Theme chip row** y+52, 32dp: 24dp theme icon circle + "Nature" `typescale.chipActive`.
   - **Field 1** (92dp block, 108dp pitch): label "When would you like to start this programme?"
     `typescale.h4` `role.textDark` → 4dp (`space.fieldGap`) → filled input 48dp
     (`size.inputHeight`), `radius.sm`, fill `role.background`, value "Mon, 5 May 2024"
     `typescale.bodyTight` `role.textDark`, trailing 20dp calendar glyph `role.textMid`. Tapping
     opens **D8** native date picker (note 145:6629). Pre-filled with the next unassigned school day
     (note 145:6632).
   - **Field 2**: identical, "Fri, 30 May 2024". Only dates **after** field 1 are selectable
     (note 145:6630); auto-filled to the end of the programme when a theme is chosen (note 145:6631).
   - **Availability banner** y316, 52dp, `radius.md`: success = fill `status.success.bg`, 20dp check
     icon + "These dates are available" `typescale.helpStrong` in `status.success.dark`. Overlap
     error (P3-c) = fill `status.error.bg`, 20dp alert icon, message in `status.error.dark`, and the
     offending date input switches to the error state (2dp `status.error.main` border).
   - **Language section** y384, 156dp: label "What is your preferred classroom language?"
     `typescale.h4`; help text "You can change languages while you plan. When your chosen language
     isn't available, activities or stories will be shown in English." `typescale.help`
     `role.textMid`; **Select** 48dp, `radius.sm`, fill `role.background`, placeholder "Tap to
     choose language" `typescale.body` `role.textLight`, trailing 20dp chevron-down. Open menu uses
     `role.surface` + `elevation.dropdown`, 48dp options (`size.filterItem`), selected option filled
     `role.selectSubtle`.
3. **Footer bar** y634, 72dp (`size.footerBar`): 1dp divider `role.line` → **primary button**
   328×40, `radius.lg`, leading 20dp save glyph, label "Save" `typescale.button`. Disabled state:
   fill `role.actionDisabled`, label stays `role.onAction`, no shadow. Enabled: fill `role.action`,
   `elevation.button`.

### P4 / P7 — Choose small / large group activity · [145:6671](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-6671) · [145:7686](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-7686)

1. **App bar** 0→64: back, title = slot name ("Small group activity" / "Large group activity"),
   subtitle = the date being planned ("Friday, 9 September 2022"), right "?" chip.
2. **Filter bar** y64, 56dp (`size.filterBar`), full-bleed fill `role.background`, horizontally
   scrollable, 8dp gaps, 16dp leading inset:
   - **Search button** 40dp circle, fill `role.select`, 20dp magnifier `role.onSelect`.
   - **Filter chips** 40dp, `radius.xl`, `elevation.sm`: resting = fill `role.selectSubtle`, label
     `typescale.chip` in `role.select`; **active** = fill `role.action`, label `typescale.chipActive`
     in `role.onAction`. Chips: "Nature ▾" (theme — unfilled when no theme), "English ▾" (language),
     "Skill ▾". Each opens **D13 filter open** (328×486: 40dp trigger + 440dp menu with a 48dp
     header), `role.surface`, `elevation.dropdown`, 48dp rows, active row `role.selectSubtle` + check.
3. **Page Title** y≈135, x16: "Choose a large group activity" `typescale.h2` `role.textDark`.
4. **Recommended card** (first, only when a recommendation exists) — x16 w328, `radius.md`, fill
   `role.actionSubtle`, 1dp border `role.action`:
   - "Recommended" badge pill top-right: 28dp (`size.badgeHeight`), `radius.xxl`, fill
     `role.appBar`, label `typescale.captionMedium` in `role.onAppBar`.
   - Leading 24dp **radio** (`role.textLight` 2dp ring; selected = `role.action` ring + 12dp dot).
   - Two 32dp skill icon circles in the relevant `domain.*` hue.
   - Activity name `typescale.h4` `role.textDark`; materials preview `typescale.help` `role.textMid`.
   - Trailing blue **i** circle 24dp, fill `status.info.main`, glyph `role.onAction`.
   - Footer strip inside the card: "This is the theme activity for the day!" `typescale.help` in
     `status.info.dark` on a `status.info.bg` band, `radius.md` bottom corners.
   - **Skills-gap reason strip** (P7): "Recommended because you do not have enough **walking &
     moving** activities planned for 5 - 30 July." `typescale.help` in `status.info.dark` on
     `status.info.bg`.
5. **Standard activity cards** — 3–4 × x16 w328, 92–112dp (`size.rowLong`/`size.rowLonger`),
   12dp gap, `radius.md`, fill `role.background`: radio + two 32dp domain skill circles + name
   `typescale.h4` + materials `typescale.help` `role.textMid` + trailing "i" circle
   `status.info.main`. Selected card: fill `role.actionSubtle` + 2dp `role.action` border.
6. **"See more activities"** — secondary button 328×40, `radius.lg`, fill `role.surface`, 2dp border
   `role.action`, label `typescale.button` in `role.action`, leading 20dp eye glyph. No shadow.
7. **Dashed divider** 1dp `role.line`.
8. **Footer** 72dp: primary button 328×40 "Save" (small group / large group) or "→ Next".
   Disabled until a radio is selected: fill `role.actionDisabled`.
9. **Duplicate-activity message** (P4-d, small group only): inline `Alert` x16 w328, `radius.md`,
   fill `status.alert.bg`, 20dp icon `status.alert.main`, title `typescale.helpStrong` in
   `status.alert.dark` — the activity is already included in the current week (note 145:6641). It is
   a warning, not a block.

### P6 — WO6.1.4 no activity found · [145:7215](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-7215)

App bar + filter bar exactly as P4, then a centred empty state: 106dp round sad-face illustration
(sticker set, `role.select` line art on `role.selectSubtle`), 24dp gap, `typescale.h2` `role.textDark`
"Sorry, no activities found!", 8dp gap, `typescale.body` `role.textMid` centred "Please choose
different themes, skills, and/ or languages and try again." No footer button — the user changes the
filters above.

### P5 / P8 — View small / large group activity · [145:7152](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-7152) · [145:7646](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-7646)

1. **App bar** 0→64: back, title = activity name ("Tall tree"), subtitle = slot ("Small group
   activity").
2. **Language selector** y64, 74dp (`size.languageSelector`), full-bleed fill `role.background`:
   label "Change Language:" `typescale.help` `role.textMid` + pill 32dp `radius.xl` fill
   `role.action`, label "English ▾" `typescale.buttonSmall` `role.onAction`.
3. **Photo header** y138, 360×168, full-bleed image, no radius.
4. **Section** y321, x16 w328:
   - **Page Title** = activity name `typescale.h2` `role.textDark`.
   - **Primary CTA (repeat of the footer)** 328×40, `radius.lg`, fill `role.action`, label
     `typescale.button` `role.onAction`, `elevation.button`. Label is state-dependent:
     "✔ Choose this activity" when not yet selected; "⟳ Change activity" when this is the currently
     planned activity (note 145:11015).
   - **Dashed divider** 1dp `role.line`.
   - **"Skills" label** `typescale.h4` `role.textDark`.
   - **Skills card** 328×144, `radius.md`, 1dp border `role.appBar`, fill `role.surface`; two rows,
     each: 32dp icon circle in the matching `domain.*` hue + skill name `typescale.body`
     `role.textDark`. (e.g. "Social" → `domain.happyAndSecure`; "Personal & emotional" →
     `domain.happyAndSecure`; motor skills → `domain.developingBodies`; language →
     `domain.speakingListening`; cognitive → `domain.discoveryProblem`.)
5. **Content block** y639, ~444dp, x16 w328: "What do I need?" `typescale.h4` + bullet list
   `typescale.body` `role.textDark`; "What do I do?" `typescale.h4` + numbered steps 1–6.
6. **Notes panel** y1097, x16 w328, ~476dp, `radius.md`, fill `role.background`, padding 16dp:
   "Notes" `typescale.h4`; "How can I extend learning?" `typescale.bodyMedium`; Level 1 / 2 / 3
   badges (28dp pill, `radius.xxl`, fill `category.teachingTips.main`, label `typescale.overline` in
   `role.textDark`) each followed by question prompts `typescale.body` `role.textMid`.
7. **Footer** 72dp: repeat of the state-dependent primary CTA. **Disabled** (fill
   `role.actionDisabled`, no shadow) when the date being viewed is in the past (note 145:11023).
   **Hidden entirely** for permission-restricted practitioners (note 145:12184).

### P9 — WO6.2.5 Choose a story · [145:8131](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-8131)

1. **App bar**: back, "Story & activity", subtitle "Monday, 5 September 2024", "?" chip.
2. **Filter bar** 56dp as P4: search circle `role.select`, chips "Theme ▾", "English ▾" (active =
   `role.action`).
3. **Page Title** `typescale.h2` "Choose a story" + step indicator "Step 1 of 2" `typescale.help`
   `role.textMid` on the same row, right-aligned.
4. **Story cards** — x16 w328, 140–160dp, 12dp gap, `radius.md`, fill `role.background`:
   24dp radio; story title `typescale.h4` `role.textDark`; languages line `typescale.help`
   `role.textMid`; **type tag pill** 28dp `radius.xxl` fill `category.activities.tint`, label
   `typescale.captionMedium` in `role.textDark` — one of "Story book" / "Read aloud" / "Other";
   trailing "i" circle `status.info.main`. Cards in the mock: *Serapana*; *The sky is falling down!*;
   *Walking together*; *Make or choose your own story*.
5. **Secondary button** "👁 See more stories" 328×40, `radius.lg`, 2dp `role.action` border.
6. **Dashed divider** → **Footer** 72dp: primary "Save & next", disabled until a radio is selected.

### P10 — WO6.2.6 View story · [145:11204](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-11204)

App bar (story title / "Story") → language selector 74dp → full story text: repeated blocks of
`typescale.body` `role.textDark` paragraphs at x16 w328 with 16dp `space.sectionGap` between them and
optional inline illustrations (full-bleed 360dp wide). A closing **question block** renders as a card
`radius.md` fill `status.info.bg` with `typescale.bodyMedium` in `status.info.dark`. The **no-question
variant** ([145:12319](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-12319))
simply omits that card (note 145:12453). Footer 72dp: primary "✔ Choose this story" /
"⟳ Change story".

### P11 — WO6.2.7 Choose a story activity · [145:8276](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-8276)

1. **App bar**: back, "Story & activity", subtitle "Friday, 9 September 2024".
2. **Chosen-story header** x16 w328: "Story chosen: Serapana" `typescale.h2` `role.textDark`; below,
   full-width primary button 328×40 "◀ Choose a different story" fill `role.action`.
3. **Dashed divider** 1dp `role.line`.
4. **Page Title** "Choose a story activity" `typescale.h2` + "Step 2 of 2" `typescale.help`
   `role.textMid`.
5. **Option cards** — 5 × x16 w328, 80–100dp, 12dp gap, `radius.md`, fill `role.background`: radio +
   title `typescale.h4` + subtitle `typescale.help` `role.textMid` + "i" circle `status.info.main`.
   Options: Story sharing; Story cards; Learn new words; Puppet story; Share story and learn new word.
6. **Footer** 72dp: primary "Save", disabled until selection.

### P12 — WO6.2.8 Story activity · [145:8420](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-8420)

1. App bar "Story sharing" / "Story activity"; language selector y64, 74dp.
2. **Section** y153, x16 w328: Page Title "Story sharing" `typescale.h2` → primary button
   "✔ Choose this activity" 328×40 `role.action` → dashed divider → "Story chosen" label
   `typescale.h4` → **chosen-story card** 328×116, `radius.md`, fill `role.background`: "Serapana"
   `typescale.h4`, languages `typescale.help` `role.textMid`, "Story book" tag pill
   `category.activities.tint`, "i" circle `status.info.main`.
3. **Content block** y443, ~862dp: "What do I need?" bullets; "What do I do?" with bold sub-heads
   `typescale.bodyMedium` — "Before the story", "During the story, encourage children to participate
   by:" (11 bullets — eye contact, voice changes, BOOM!, pace, actions, sounds, questions), "After
   the story".
4. **Tips card** y1320, x16 w328, 188dp, `radius.md`, fill `status.info.bg`: "Tips"
   `typescale.helpStrong` in `status.info.dark` + paragraph `typescale.body` `role.textMid`
   ("Stories are everywhere! …").
5. **Footer** 72dp: primary "✔ Choose this activity" (or "⟳ Change activity" when already planned).

### P16 — WO6.5.4 Programme best practices · [145:9329](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-9329)

1. **App bar** 0→64: back, "Programme best practices".
2. **Language selector** 74dp (`size.languageSelector`), fill `role.background`.
3. **Hero card** y138→324, x16 w328, `radius.md`, fill `role.background`, padding 16dp:
   `typescale.h2` `role.textDark` "How can I plan my activities on AppName?" → primary button
   328−32 wide × 40dp "→ Start walkthrough", fill `role.action`, `elevation.button`.
4. **Action list** y338: 3 rows × 80dp (`size.rowDefault`) + 4dp gap (`space.listGap`), each
   `action item icon`: x16 w328, `radius.md`, fill `role.background`, 48dp icon circle, title
   `typescale.h4` `role.textDark`, trailing chevron `role.textMid` — "The daily routine" (P17),
   "Developing children holistically" (P19), "Learning through play" (P18).
5. **Info banner** y610, 320×132, `radius.md`, fill `status.info.bg`: 20dp "i" `status.info.main`;
   bold text `typescale.helpStrong` in `status.info.dark` "You can use the results from your progress
   reports to help children learn!"; embedded **small button** 32dp (`size.buttonSmallHeight`),
   `radius.alertButton`, fill `role.action`, label "📊 Get class progress summary"
   `typescale.buttonSmall` `role.onAction`; dismiss "✕" 22dp (`size.iconMd`) top-right in
   `status.info.main`.
6. **Footer** 72dp: primary "→ Start planning my programme".

### P17 / P18 / P19 — Info content screens

Shared skeleton: **App bar** (64) → **Language selector** (74, `role.background`) → repeating content
sections at x16 w328 — Page Title `typescale.h2` `role.textDark`, body `typescale.body` `role.textMid`,
illustrated `Simple/Mobile` blocks 146dp, 32dp arrow-down separators, text groups 161dp, 1dp
`role.line` dividers between sections → tenant logo block → **Footer** 72dp primary button.
**P17 (The daily routine, 2913dp)** additionally carries an `Informational` alert 328×112,
`radius.md`, fill `status.info.bg`, mid-content. **P19 (Developing children holistically, 1964dp)**
has four illustrated sections, one per developmental domain; use the domain hue for each section's
icon circle: `domain.happyAndSecure`, `domain.speakingListening`, `domain.discoveryProblem`,
`domain.developingBodies`.

---

## 4. Dialogs & popups

All dialogs share the **dialog card** anatomy: full-frame scrim `role.scrim`; white card
`role.surface`, x16, w328 (`size.dialogWidth`), `radius.xl`, padding 16dp horizontal / 24dp vertical,
`elevation.dialog`. Leading content (illustration + centred text) is 296dp wide
(`size.dialogContentWidth`); buttons are 296×40 with 16dp gaps (`space.buttonGap`). Primary above
secondary. Dismissal by scrim tap is **allowed** for info dialogs and **blocked** for warnings that
require an explicit choice.

| ID | Node | Card geometry | Trigger rule | Anatomy |
|---|---|---|---|---|
| D1 | [145:6973](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-6973) | 328×322 @ y159 | Immediately after **Save** succeeds on P3 | Mascot circle 96dp (fill `category.teachingTips.main`) → title `typescale.h3` `role.textDark` centred "Great, I have set up your Nature programme!" → body `typescale.body` `role.textMid` "All your activities have been planned for 5 May to 30 May!" → **1 primary** 296×40 "🗓 See programme" fill `role.action` |
| D2 | [145:7038](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-7038) | 328×322 @ y159 | Generic warning / info over the dashboard | Same skeleton as D1; status icon 48dp (`size.iconXl`) in `status.alert.main` for warnings, `status.info.main` for info; 1 primary |
| D3 | [145:8527](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-8527) | 328×378 @ y131 | On entering P1 when nudge priority 1 or 2 fires (§8) | Mascot → title `typescale.h3` "Hello Bulelwa! Start planning your classroom activities!" → body "Choose a theme or create your own programme for this week." → **primary** 296×40 @y258 "Choose a theme" (`role.action`) → 16dp → **secondary** 296×40 @y314 "✎ Create my own programme" (`role.surface`, 2dp `role.action` border, label `role.action`) |
| D4 | [145:8462](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-8462) | 328×378 @ y131 | Current week **and** next week fully planned (note 145:6645/145:11843) | Same 2-button skeleton as D3, celebratory copy; the "Add new theme" FAB is suppressed behind it |
| D5 | [145:8592](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-8592) | 328×547 @ y46 | First visit to P1 **after** a progress reporting deadline passes, and only if ≥1 child progress report was created in that period (note 145:6643) | Taller card: mascot → title "What are children working on?" → the **top 2** developmental areas rendered as rows with a 32dp `domain.*` icon circle + area name `typescale.h4` + count `typescale.help` → primary + secondary |
| D6 | [145:8837](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-8837) themes · [145:9636](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-9636) greeting & message board · [145:9640](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-9640) free play · [145:8841](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-8841) small group · [145:8845](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-8845) large group · [145:9749](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-9749) story & activity | 328 w overlay card (free-play variant frame 934dp) | Tapping the "?" chip in the app bar, or the "?" on a routine-slot label (note 145:6654) | Scrolling info overlay: title `typescale.h3` → body `typescale.body` `role.textMid` → optional illustration. The themes variant carries a 48×16 **offline badge** (`size.offlineBadge`, `radius.full`, fill `status.error.main`, label `typescale.caption` `role.onAction`). Dismiss by scrim tap or "✕" |
| D8 | [145:6669](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-6669) | native, 360×640 | Tapping either date input on P3 | Use the **phone's native date picker** (note 145:6629). End-date picker is constrained to dates strictly after the chosen start date (note 145:6630) |
| D9 | [145:9753](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-9753) | tutorial card 328×299 @ y171 | Immediately before D10 on first Programme visit | 100dp round mascot → text row → **Filled select** 296×48 (language) → **primary** 296×40; secondary hidden |
| D10 | [145:9818](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-9818) | tutorial card 328×421 @ y110 | First time the user opens the Programme section (note 145:6656) | Mascot → title → body → **primary** ("Yes, show me") + **secondary** ("No, skip") + an extra footer secondary 328×40 |
| D11 | [145:9880](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-9880) | full overlay 360×641 | Any time the user says "No, skip" to a walkthrough (note 145:6620) | Scrim + square spotlight around the app-bar "?" chip + tutorial card 1 ("You can start the walkthrough any time from here") |
| D12 | [145:11584](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-11584) | 328×400 | Tapping a class row's overflow / long-press on Classes tab | 1 primary + 5 secondary buttons, each 40dp with 48dp pitch; one action is "Plan activities" (note 145:11399) |
| D13 | [145:12236](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-12236) | 328×486 | Tapping a filter chip on P4/P7/P9/P11 | 40dp trigger + 440dp menu with a 48dp header row; `role.surface`, `elevation.dropdown`, 48dp options, active option `role.selectSubtle` + check |

---

## 5. Walkthrough / coach-mark pattern

A single overlay system, reused verbatim by both Programme and Progress. It renders **above** the live
screen — the underlying screen is real, not a screenshot, but all of its hit targets are inert while
the overlay is up.

**Layer stack (bottom → top)**

1. **Host screen** — the real P1 (or whichever screen the step targets), rendered normally.
2. **Scrim** — `Rectangle 1`, full-frame 360×640, fill `role.scrim` (primary at 70% alpha). Absorbs
   all touches except the tutorial card's own controls.
3. **Spotlight cut-out** — the target element is re-drawn on top of the scrim at its real coordinates
   (Figma implements this as a clone of the component, e.g. FAB clone
   [145:9001](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-9001) at
   y329), wrapped in a 2dp `role.onAppBar` outline that follows the element's own radius
   (`radius.xxl` for the FAB, `radius.md` for cards/rows, `radius.full` for icon circles), with 8dp
   padding. A step may spotlight a *partial* region — e.g. just the skills block, "What do I need?"
   and a few "What do I do?" steps (note 145:6621).
4. **Arrow** — 24dp yellow pointer glyph
   ([145:9002](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-9002)) in
   `category.teachingTips.main`, placed on the side of the spotlight facing the tutorial card, 8dp
   clear of the outline, rotated to point at the target.
5. **Tutorial card** — `dialog card - tutorial`: x16 w328 (`size.contentWidth`), 168dp high, y457 when
   the target is in the upper half (flip to y88 when the target is in the lower half), fill
   `role.surface`, `radius.xl`, padding 16dp, `elevation.dialog`.
   - Left: 80×80 round mascot illustration.
   - Right: message `typescale.h4` in `role.textDark` (e.g. "Tap here to add a theme!").
   - **Dot pager** bottom-left: 10dp dots, 8dp gap, inactive fill `role.line`, current position is an
     elongated 20×10 bar `radius.full` fill `role.select`.
   - **"→ Next"** small pill bottom-right: 67×32 (`size.buttonSmallHeight`), `radius.md`, fill
     `role.action`, label `typescale.buttonSmall` `role.onAction`. Final step's label becomes "Done".
   - **"Skip"** text link left of Next, `typescale.buttonSmall` in `role.textMid`.

**Behaviour rules**

- Trigger: the first time the user enters the Programme section (note 145:6656). Sequence is
  **D9 language picker → D10 offer → W1…W10**.
- Declining at D10 → **D11 WO6.5.2**: scrim + square spotlight on the app-bar "?" chip, so the user
  learns where to restart it (note 145:6620). It can also be re-launched any time from P16.
- While the walkthrough is running, the blue "i" info circles are **disabled** — tapping them does
  nothing (note 145:6622).
- Tapping the scrim advances to the next step; tapping the spotlit element also advances (it does not
  perform the real action).
- Progress is persisted per user per feature; completing or skipping sets `walkthrough_seen.programme
  = true` so it never auto-launches again.
- **Never launch the walkthrough for a practitioner without add/edit permission**, and do not render
  the "?" entry point for them (notes 145:12175, 145:12186).

**Programme step list (W1–W10)** — target per step:

| Step | Node | Spotlight target | Message intent |
|---|---|---|---|
| W1 | [145:8849](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-8849) | "＋ Add new theme" FAB | "Tap here to add a theme!" |
| W2 | [145:9003](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-9003) | Month pill + calendar button | Move between months / jump to today |
| W3 | [145:9151](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-9151) | Day pager (Back / Next) | Move between school days |
| W4 | [145:9240](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-9240) | Fixed routine bars | The parts of the day that are always the same |
| W5 | [145:9899](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-9899) | Small-group "＋ Add activity" | Where you choose the small-group activity |
| W6 | [145:10050](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-10050) | Activity chooser list (5B.5.3 step 6) | How the list is ordered / recommended card |
| W7 | [145:10192](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-10192) | Skill icons on a card | What the two skill icons mean |
| W8 | [145:10343](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-10343) | Blue "i" info circle | Tap to read the full activity (disabled during the tour) |
| W9 | [145:10619](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-10619) | Activity detail — skills / what I need / what I do (partial spotlight, note 145:6621) | How to read an activity |
| W10 | [145:10870](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-10870) | Story & activity rail + "?" chip | Two-step story flow, and where help lives |

---

## 6. States & edge cases

| State | Where | Treatment |
|---|---|---|
| **Empty — no classes / no children** | P0 | 24 June change-request empty states: practitioner [145:12254](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-12254), principal [145:12266](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-12266). Sticker icon → `typescale.h2` → `typescale.body` `role.textMid` → primary CTA (principal only). |
| **Empty — day unplanned, no theme** | P1 | All three planning rails show dashed "＋ Add activity"/"＋ Add story"; theme banner reads "No theme"; FAB visible. |
| **In progress — day partly planned** | P1 | Filled slots render as `action item icon` rows; remaining slots keep their dashed Add buttons. A day with a story but no story activity is **not complete** (note 145:11021). |
| **In progress — story chosen, activity not** | P1 → P11 | "＋ Add story" deep-links to P11 with the story pre-selected. |
| **Complete — day fully planned** | P1-a | All five slots filled; no dashed buttons. |
| **Complete — week + next week fully planned** | P1-d / D4 | Celebratory alert band + D4 dialog; **hide the "Add new theme" button** (note 145:6645, 145:11843). |
| **Zero results in a chooser** | P6 | Sad-face empty state; filters remain editable. |
| **Duplicate activity in the current week** | P4-d | Inline `status.alert.*` warning; still selectable (small group only — note 145:6641). |
| **Over-range / invalid date entry** | P3-c | Overlap error banner `status.error.bg` + input error border; Save stays disabled. |
| **Past date — planned** | P5-p, P8, P10, P12 | Screen renders read-only; every "Change activity" / "Change activity & story" button **disabled** (note 145:11023). |
| **Past date — unplanned** | P1 | No Add buttons; show an inline message instead (note 145:11025). |
| **Weekend / public holiday** | P1 | Weekend message only shows when the user actually opens Programme on a weekend day (note 145:6665). Non-school-day window = **17:00 Friday → 23:59 Sunday**, plus public holidays (note 145:6637). Day pager skips weekends but *includes* public holidays with the relevant message. |
| **Permission-restricted practitioner** (no add/edit right, W3) | P1-r and all detail screens | Hide the "Add a theme" FAB and all dashed Add buttons; hide the "?" chip; never launch the walkthrough (notes 145:12175, 145:12186). Hide the "Change activity" button on **all** activity types and stories (note 145:12184). Suppress **all** nudges/alerts — **except** the "What are children working on?" pop-up, which still shows (note 145:12178). |
| **Practitioner not assigned to the class** | P0 / P1 | Class not listed at all. Principals see every class and every plan (note 145:11397). |
| **Offline** | whole feature | Planning is **online-only** (note 145:11397). Show the offline ticker under the app bar (`patterns/offline-first.md`); the day view renders from cache read-only; Add/Change controls are disabled with the copy "You need to be online to plan activities." Never block navigation. On conflict, the **principal's plan wins** (note 145:11397). |
| **Long class name** | P1 header, P0 rows | Ellipsise to one line (note 145:12454). |
| **Story with no closing question** | P10-n | Omit the question card (note 145:12453). |

---

## 7. Business rules for back-end devs

### 7.1 Data the client needs

- `class` → `{ id, name, preschool_id, assigned_practitioner_ids[] }`
- `programme` → `{ id, class_id, theme_id | null, start_date, end_date, language_code, created_by }`
- `day_plan` → `{ id, class_id, date, programme_id | null, small_group_activity_id, large_group_activity_id, story_id, story_activity_id, status }` where `status ∈ {unplanned, partial, complete}`
- `theme` → `{ id, name, icon, colour_key, source_tenant }` — the list is **dynamic**; render as many as exist (note 145:8836). SmartStart themes pull through to ECD Connect **with the SmartStart logo** (note 145:6668).
- `activity` → `{ id, type: small_group|large_group|story_activity, name, materials, photo_url, subcategories[2], theme_ids[], language_codes[], steps[], notes{level1,level2,level3} }`
- `story` → `{ id, title, language_codes[], story_type: story_book|read_aloud|other, body, question | null }`
- `public_holiday` calendar per country/region.
- `practitioner_permission` → `{ practitioner_id, class_id, can_add_edit_programme, can_create_progress_report }` (W3).

### 7.2 Theme set-up & date rules

1. A programme is `(class_id, theme_id, start_date, end_date, language_code)`.
2. **Start date** defaults to the *next unassigned date* — the first school day for which the class has no theme (note 145:6632).
3. **End date** defaults to the end of the programme when a theme is chosen (note 145:6631), and only dates **strictly after** the chosen start date are selectable (note 145:6630).
4. Date ranges for a class **must not overlap** another programme for the same class → return an overlap error which the client renders as P3-c.
5. Tapping the all-day "Nature" banner reopens the range for editing (note 145:6633).
6. On Save, the backend **auto-plans every school day in the range** (weekends excluded, public holidays included per note 145:6665) by running the activity-ordering rules (§7.3) and picking the top-ranked item for each of small group, large group, story and story activity.
7. Auto-planned days remain fully editable — the user can change any of the theme activities (note 145:6625).
8. **Language fallback**: if the chosen classroom language has no translation for an activity or story, serve the **English** record (surface copy already warns the user on P3).

### 7.3 Activity-ordering rules (note 145:6627) — applies to small group, large group, story and story activity

Order the candidate list by these rules, **in priority order**:

1. The **recommended** activity/story (if one is relevant) appears at the **top** of the screen.
2. **[small & large group only]** All activities that have already been included in the **current programme** (e.g. the *Nature* programme) go to the **bottom** of the list.
3. Activities whose **subcategories (skills) appear the least number of times** in the programme — counted **across both small and large group activities** — appear at the top. Each activity has **2** subcategories associated; take into account **the subcategory which appears the least number of times**.

### 7.4 Recommendation logic

- **Themed programme**: the recommendation is the *theme activity for the day*; the card carries the strip "This is the theme activity for the day!".
- **No theme**: the recommendation is skills-gap driven — surface the subcategory with the lowest coverage in the current planning window and explain it: "Recommended because you do not have enough **{subcategory}** activities planned for {start} - {end}."
- Exactly **one** recommended card per chooser screen; if no recommendation applies, render the list without it.

### 7.5 Duplicate-activity rule (note 145:6641)

- **Small group activities ONLY.** If the selected activity is already included anywhere in the **current week being planned** (Monday → Friday of that week, e.g. Mon 5 Sep – Fri 9 Sep), show the duplicate message. It is advisory: the user may still save.

### 7.6 Nudge / alert rules — evaluate on every entry to P1, show at most one

| Priority | Nudge | Condition |
|---|---|---|
| 1 | **Start planning (this week)** — D3 | One or more **future** days in the current week (week starting Monday 00:00) are not planned (note 145:6651) |
| 2 | **Plan next week** — D3 variant | The current week is **fully planned** AND one or more days next week are not planned (note 145:6639). Its CTA jumps to the **first unplanned day of next week** (note 145:6653) |
| 3 | **Full programme planned** — D4 | Current week **and** next week fully planned → show the celebratory dialog and **hide the "Add a theme" button** (notes 145:6645, 145:11843) |
| 4 | **Planning streak** | User has planned **X consecutive weeks including the current week**, looking at both past and future plans. Example: 2 previous weeks + current week + next week = 4 weeks in a row (note 145:6647) |
| 5 | **Missing skills** | ONLY when **≥10 small + large group activities** have been planned so far within the current programme (if a theme was chosen). If no theme was chosen, look at the period for which the practitioner has "No theme", **limited to a 4-week period**. List the subcategories that appear **less than 5% of the time** in that period (note 145:6649) |
| 6 | **Non-school day message** | User opens Programme between **17:00 Friday and 23:59 Sunday**, or on a **public holiday** (note 145:6637). Weekend messages show **only** when the user actually arrives on a weekend day (note 145:6665) |
| — | **What are children working on?** — D5 | Show the **first time** the user visits this page **after each reporting deadline has passed**, and **ONLY** if at least **1 child progress report was created during that reporting period**. Content = the **top 2** areas children are working on (note 145:6643). This nudge is the **one exception** that still shows to permission-restricted practitioners (note 145:12178) |

### 7.7 Day-completion & immutability

- A day is `complete` only when small group, large group, **story AND story activity** are all set. Choosing a story without a story activity leaves the day incomplete; "Add story" must resume at the incomplete step with the chosen story pre-selected (note 145:11021).
- **Past days are immutable.** For any date < today: all change/edit affordances are disabled (note 145:11023), and unplanned past days can never be planned — show a message instead (note 145:11025).
- Programme date ranges become **read-only for elapsed days**; the future tail of a range stays editable.

### 7.8 Permission matrix (W3 — principal management of practitioner permissions)

| Capability | Principal | Practitioner **with** add/edit permission | Practitioner **without** permission |
|---|---|---|---|
| See classes | **All** classes at the preschool (incl. ones they don't teach) | Only classes they are assigned to | Only classes they are assigned to |
| See plans | All plans for all classes | Plans for their assigned classes | Plans for their assigned classes |
| Add / edit a plan | Any class | Their assigned classes only | ✗ |
| "Add a theme" FAB / Add buttons | shown | shown | **hidden** (note 145:12175) |
| "Change activity" buttons (all activity types + stories) | shown | shown | **hidden** (note 145:12184) |
| "?" help chip & walkthrough | shown | shown | **hidden / never launched** (notes 145:12175, 145:12186) |
| Nudges & alerts | shown | shown | **suppressed**, except "What are children working on?" (note 145:12178) |

**Conflict rule:** planning is **online-only** functionality. If conflicting plans do arise, the
**principal's plan is taken as truth** (note 145:11397).

### 7.9 Navigation & calendar rules

- Entry points to a class's programme: the **Programme tab** on P0, or **Classes tab → class → "Plan activities"** (notes 145:11399, 145:11600).
- Month pill: tap opens the month view, swipe moves between months, **today's date and the selected day are both highlighted**, tapping the pill again closes it (note 145:6661).
- Left/right arrows flip between **months**; the calendar icon returns to **today**; on the day view "Back"/"Next" flip between **days**, **excluding weekend days but including public holidays** with the relevant message (note 145:6665).

### 7.10 Walkthrough & help gating

- Walkthrough auto-launches the **first time** the user goes to the Programme section (note 145:6656); persist a per-user flag.
- During the walkthrough the "i" controls are inert (note 145:6622).
- Declining stores the same flag and shows D11 once (note 145:6620).

---

## 8. Designer notes carried forward (verbatim)

**Comment frames**

- `145:6623` — "Setting up a themed programme"
- `145:6625` — "2. Viewing & editing activities User can change any of the theme activities."
- `145:6627` — "3. Activity order for small group, large group, story & story activity Use these rules to order the activities (listed here in order of priority): Recommended activity/story (if relevant) appears at the top of the screen All activities that have already been included in the current programme (in this case, Nature) should be at the bottom of the list [small & large group only] Activities with subcategories (ie skills) which appear the least number of times in the programme, across both small & large group activities should appear at the top. Since each activity has 2 subcategories associated, take into account the subcategory which appears the least number of times."
- `145:6634` — "2. No theme"
- `145:6637` — "3. Planning nudges/guides Planning on non-school days (ie, between 5pm Friday & 23:59 Sunday; as well as public holidays)"
- `145:6639` — "Encouraging users to choose a theme (or create their own programme) when the next week is not planned. Priority 2 scenario: 1 or more days next week are not planned the current week is fully planned"
- `145:6641` — "Message if the user has already included an activity (small group activities ONLY) in the current week (Monday to Friday of the week being planned - e.g in this case, Monday 5 Sep to Friday 9 Sep)"
- `145:6643` — "After progress reporting period is done, show a summary of which areas children are working on (top 2) Should be shown the first time the user visits this page, after each reporting deadline has passed ONLY show if at least 1 child progress report was created during that reporting period"
- `145:6645` — "User has planned all days in the current week and the next week don't show button"
- `145:6647` — "User is on a planning streak Show when user has planned X consecutive weeks, including the current week (looking into past & future plans) E.g. scenario: user planned 2 previous weeks + the current week + the next week = 4 weeks in a row"
- `145:6649` — "Missing skills - ONLY show when user has at least 10 small & large group activities have been planned so far within the current programme (if a theme was chosen); if no theme chosen, look at the period for which the practitioner has "No theme" -- limit this to a 4 week period Which subcategories to show in the list: Any which appear less than 5% of the time in the 4 week period outlined above"
- `145:6651` — "Encouraging users to choose a theme (or create their own programme) when the current week is not planned. Priority 1 scenario: 1 or more *future* days in the current week (starting Monday at 00:00) are not planned"
- `145:6654` — "Info dialogs (tapping question marks)"
- `145:6656` — "2. Walkthrough Comes up the first time the user goes to the Programme section."
- `145:6658` — "3. Main page info screen"
- `145:6661` — "Tapping the month item opens up month view can swipe to go to the next highlight today's date & the selected date (day being viewed) tapping the month item again closes the month view."
- `145:6663` — "For practitioners who have not been given permission to add/edit activities (see W3 principal management of practitioner permissions)"
- `145:6665` — "Icons: Left & right arrows - flip between months NOTE: only show weekend messages when the user comes to programme on a weekend day. Calendar icon - go to today's date On the day view, "Back" and "Next" flip between days; exclude weekend days but include public holidays with the relevant message"
- `145:11015` — "Viewing planned small group & large group activities Show any time the user is viewing the currently selected small or large group activity. Only change: button becomes "Change activity" button."
- `145:11017` — "Viewing story & story activity"
- `145:11019` — "If user taps the "i" icon on the previous screen ->"
- `145:11021` — "If the user chooses a story but NOT a story activity and then saves & leaves the planning process. The day is not complete -- tapping "Add story" takes the user to the incomplete step in the process (with the chosen story already selected)"
- `145:11023` — "If the user is viewing an activity for a past date -- user cannot edit. In this example - today is Monday, 12 September & the user is viewing their planned Friday, 9 September Disable all change activity or change activity & story buttons."
- `145:11025` — "Viewing days in the past - unplanned days Since the user can't edit past days; show a message instead."
- `145:11397` — "Principal view: show all classes and all plans Practitioner view: only show classes the practitioner is assigned to Big differences from SS: split programmes by class display all plans to the principal (incl. classes they are not assigned to) allow principal to add or edit a plan for any class (note that planning is online-only functionality; if we need to deal with conflicts, principal's plans should be taken as truth) practitioner can see any plans for the classes they are assigned to but they can only edit or add plans IF the principal has given them permission (see W3)"
- `145:11399` — "Alternative way to get to this functionality From "Classes" tab, tap "Plan activities""
- `145:11843` — "When user has activities planned for all days, for all classes shown for the current or upcoming week (detail in use cases)"
- `145:12175` — "For practitioners who have not been given permission to add/edit activities (see W3 principal management of practitioner permissions) DO NOT show the "Add a theme" button DO NOT show the question mark icon, DO NOT launch walkthrough"
- `145:12178` — "For practitioners who have not been given permission to add/edit activities (see W3 principal management of practitioner permissions) DO NOT SHOW any of the nudges/alerts here. Exception: do show the "What are children working on?" pop-up"
- `145:12180` — "Change request 24 June empty state - practitioner"
- `145:12182` — "Change request 24 June empty state - principal"
- `145:12184` — "For practitioners who have not been given permission to add/edit activities (see W3 principal management of practitioner permissions) For ALL activity types + stories, hide the "Change activity" button when viewing activities"
- `145:12186` — "For practitioners who have not been given permission to add/edit activities (see W3 principal management of practitioner permissions) DO NOT show the question mark icon, DO NOT launch waklthrough" [sic]

**Free-floating notes**

- `145:6620` — "Any time the user says "No, skip" to a walkthrough."
- `145:6621` — "This can highlight a smaller part of the screen (e.g. the skills, "what do I need" and a few "What do I do" steps)"
- `145:6622` — "Disable the "i" so tapping it doesn't do anything at this stage, possible?"
- `145:6629` — "Use the phone's native date picker, possible?"
- `145:6630` — "Only allow the user to choose dates after the date chosen above (details in use cases)"
- `145:6631` — "Automatically fill an end date for the end of the programme (if a theme is chosen)"
- `145:6632` — "Automatically fill the next unassigned date (ie first school day for which there's no theme)"
- `145:6633` — "When tapping the all-day event "Nature" - allow user to edit start & end dates"
- `145:6636` — "Plan for Tues goes to -->"
- `145:6653` — ""Plan next week" goes to the first unplanned day in next week."
- `145:6660` — "Same dialog for both of the screens above"
- `145:6668` — "These are made up themes - for now all the SmartStart themes should just pull through to ECD Connect, with the SmartStart logo."
- `145:8836` — "The number of themes (6 in this case) should be dynamic, based on the number of themes that have been set up"
- `145:9634` — "Greeting time & message board"
- `145:9635` — "Free play"
- `145:11600` — "NOTE that user can also access the individual class view by on the "Classes" tab, when they tap an individual class and then tap "Plan activities""
- `145:12453` — "This is what it should look like when there is no question"
- `145:12454` — "Ellipse long class names"
