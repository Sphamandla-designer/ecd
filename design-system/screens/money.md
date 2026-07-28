# Money screens

The **Money** feature (designer prefix `WO7.x`) is the income & expense tracker inside the
practitioner app's **Business** hub. It lets an ECD principal record every rand that comes in
(preschool fees, donations/vouchers, DBE subsidy, other) and every rand that goes out (rent,
utilities, salary & wages, food, learning materials, annual maintenance, other), rolls those
entries up into a **monthly income statement**, compares this month against last month, tells the
user in plain language whether the programme is making a profit or running at a loss, and lets
them **download** (and thereby freeze) any month's statement. A first-run **walkthrough** teaches
the whole feature with coach-mark overlays drawn on a legacy (`4.x`) version of the screens.

**Source page:** Figma `8s2xe3EyBRhrzDFy93NbfN` → page `139:55673` ("Page 18").

- Page canvas — https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-55673
- Dashboard (profit) — https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-55911
- Dashboard (loss) — https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-56107
- Add an amount — https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-56313
- One-month statement — https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-56762
- Extraction doc: `design-system/extraction/page18-money.md`

Every frame is **360 dp wide**; frames taller than 640 dp are scroll-extended artboards of a
360 × 640 viewport. Content column is **328 dp at x = 16** (`size.contentWidth`,
`space.screenMargin`) — there is no other content width on this page.

---

## 1. Flow map

```
                    ┌──────────────────────────────────────────────┐
                    │  MO-01  Money dashboard        (139:55911)   │   Business hub,
                    │  App bar "Business" + Tabs [Money|Resources] │   "Money" tab
                    │  states: empty · summary · profit · loss     │
                    └──┬────────────────┬─────────────────┬────────┘
                       │                │                 │
          FAB "+ Add income or expense" │       "See all statements"
                       │        app-bar "?" help          │
                       ▼                │                 ▼
        ┌──────────────────────────┐    │    ┌──────────────────────────────────┐
        │ MO-10 Add an amount      │    │    │ MO-20 View previous statements   │
        │ (139:56313)              │    │    │ (139:56708 / 56959 / 57009)      │
        │ ● Income (money in)      │    │    │ year groups → month rows +       │
        │ ● Expense (money out)    │    │    │ Profit/Loss summary row          │
        └───┬──────────────────┬───┘    │    │ footer [See more statements]     │
            │                  │        │    └───────────┬──────────────────────┘
            ▼                  ▼        │                │ tap a month
   ┌──────────────────┐ ┌─────────────┐ │                ▼
   │ MO-11 Add income │ │ MO-15 Add   │ │    ┌──────────────────────────────────┐
   │ - type (56346)   │ │ expense -   │ │    │ MO-21 One month view (139:56762) │
   │ 4 rows [Add +]   │ │ type(56388) │ │    │ income rows + Total income       │
   └───┬──────────────┘ │ 7 rows      │ │    │ expense rows + Total expenses    │
       │                └──────┬──────┘ │    │ Balance card + [Download]        │
       │                       │        │    └────┬──────────────────┬──────────┘
       │  ┌── no children ──┐  │        │         │ tap a row        │ Download
       │  ▼                 │  │        │         ▼                  ▼
       │ MO-D3 "add a child │  │        │  ┌───────────────┐  ┌───────────────────┐
       │  first" (58968/69) │  │        │  │ MO-22 One     │  │ MO-D1 Dialog      │
       │                    │  │        │  │ line item     │  │ finalise download │
       ▼                    │  ▼        │  │ (139:56746)   │  │ (139:56908)       │
 ┌──────────────────────┐   │ ┌────────────────────┐        │  │ [Yes, download]   │
 │ MO-12 Preschool fee  │   │ │ MO-16 Expense      │        │  │ [No, continue…]   │
 │  step1 57178/58725   │   │ │ detail form        │        │  └─────────┬─────────┘
 │  step2 57191/57219   │   │ │ 56408 empty        │        │            │ Yes
 │  edit  58800/58801   │   │ │ 56423 filled       │        │            ▼
 │ MO-13 Donations      │   │ │ 56438 · 56452 ·    │        │   statement LOCKED
 │  56361/58556/…/58582 │   │ │ 56466 · 56480 ·    │        │   (read-only forever)
 │ MO-14a DBE subsidy   │   │ │ 56494 · 56508      │        │
 │  (56373)             │   │ │ edit 58845 / 58831 │        │
 │ MO-14b Other (55897) │   │ └────────┬───────────┘        │
 └──────────┬───────────┘   │          │                    │
            └───────────────┴──────────┴── Save ────────────┴──► back to MO-01
                                                                 (statement updated)

  Help track (app-bar "?" on MO-01):
     MO-30 General info page (139:57091)
        ├─ [Start walkthrough] ─► MO-D4 language picker (139:58735) ─► walkthrough
        └─ [Start tracking] ────► back to MO-01
     MO-31 Making a profit info (139:57125)  ◄── [Learn more] on the loss alert (MO-01 loss)

  Walkthrough overlay track (11 coach-mark steps, legacy 4.x backdrops):
     MO-D4 language picker (58735)
       └► MO-D2 walkthrough start dialog (57250 / 57344)
            └► 1 FAB spotlight (57344) → 2 both cards (58595) → 3 income card (57508)
               → 4 income type list (57626) → 5 single type row (57718)
               → 7 Save button on form (57806) → 8 dashboard table (57894)
               → 8b "See all statements" (58148) → 11 final card (58389) → END
```

### Happy path — record an expense (numbered walkthrough)

1. User opens **Business → Money** tab → **MO-01 Money dashboard**. If nothing has ever been
   recorded they see the empty state (`139:56216`); otherwise the balance hero card, the
   two-month comparison table, an optional status banner, **[See all statements]** and the FAB.
2. Tap the extended FAB **"+ Add income or expense"** → **MO-10 Add an amount** (`139:56313`).
3. Tap the **Expense (money out)** card → **MO-15 Add expense - type** (`139:56388`).
4. Tap the **Add +** pill on a category row (e.g. *Rent*) → **MO-16 Expense detail form**
   (`139:56408`).
5. Fill **When did you pay?** (date), **How much did you pay?** (amount). Note and photo are
   optional. The footer button flips from `primary disabled with icon` to `primary with icon`
   the moment the required fields are valid (`139:56408` → `139:56423`).
6. Tap **Save** → return to **MO-01**. The month's statement, the hero balance card and the
   comparison table all recompute.

### Branch A — record income

3a. Tap **Income (money in)** on MO-10 → **MO-11 Add income - type** (`139:56346`), a 4-row list.
4a. Tap **Add +** on *Donations or vouchers* / *DBE subsidy* / *Other* → the matching income
    detail form (MO-13 / MO-14a / MO-14b). Income forms have **no photo-upload block**.
5a. Tap **Add +** on *Preschool fees* → the 2-step MO-12 flow (see Branch B).
6a. Save → back to MO-01.

### Branch B — preschool fees (2-step, per child)

1. From MO-11 tap **Preschool fees**.
   - **Gate:** if the site has **no registered children**, show dialog **MO-D3**
     ("Oops! You need to add children first!") instead of the form (note `139:58967`).
2. **Step 1 of 2 — class picker** (`139:57178`): one `Select card` per class, multi-select.
   If there is nothing to select, the list is replaced by a single `Informational` block
   (`139:58725`).
3. **Step 2 of 2 — amounts** (`139:57191`): choose the **month** these fees are for, then enter
   an amount per child. When more than one class is selected, each class gets a section title
   and a dashed divider (note `139:58863`).
4. **Save** → back to MO-01.
5. Re-opening a saved preschool-fee entry lands on the edit state (`139:58800` / `139:58801`),
   which uses a **`secondary` footer button** and — uniquely — has **no delete button**
   (note `139:58860`).

### Branch C — view & download a statement

1. From MO-01 tap **[See all statements]** → **MO-20** (`139:56708`). Months are grouped by year
   descending; each year group ends with a coloured **Profit / Loss** summary row. Footer
   **[See more statements]** pages in older years.
2. Tap a month → **MO-21 One month view** (`139:56762`).
3. Tap a category row → **MO-22 One line item view** (`139:56746`) — the individual entries that
   make up that category for that month. No footer button; back only.
4. Tap **[Download]** → **MO-D1 dialog** ("Are you sure you want to download your December
   statement? You will not be able to edit the statement after downloading.").
   - **[Yes, download]** → statement is generated and the month becomes **permanently read-only**.
   - **[No, continue editing]** → dismiss, month stays editable.

### Branch D — help & walkthrough

1. Tap the cyan **?** in the MO-01 app bar → **MO-30 General info page** (`139:57091`).
2. **[Start walkthrough]** → **MO-D4 language picker** (`139:58735`) → **MO-D2 start dialog**
   (`139:57250`) → the 11-step coach-mark track. **[Start tracking]** in the footer instead
   dismisses back to MO-01.
3. On the **loss** variant of MO-01, the alert banner's **[Learn more]** pill opens
   **MO-31 Making a profit** (`139:57125`), a 9-item ideas list with a **[Close]** footer button.

---

## 2. Screen inventory

| Code | Screen name | Figma node | Size (dp) | State / variant | Purpose |
|---|---|---|---|---|---|
| MO-01 | WO7.4.0 Money dashboard — empty | `139:56216` | 360 × 640 | empty / never tracked | First-run state, piggy-bank illustration, FAB only |
| MO-01 | WO7.4.0 Money dashboard — empty (dup) | `139:57090` | 360 × 640 | dup of `56216` (variation strip 5a) | Canvas copy |
| MO-01 | WO7.4.0 Money dashboard | `139:55909` | 360 × 640 | summary (strip 5b) | Instance copy |
| MO-01 | WO7.4.0 Money dashboard | `139:55910` | 360 × 640 | summary (info row) | Instance copy |
| MO-01 | WO7.4.0 Money dashboard | `139:56521` | 360 × 640 | summary (statements row) | Entry point to MO-20 |
| MO-01 | WO7.4.0 Money dashboard | `139:56615` | 360 × 640 | "not tracked this month" probe | See note `139:56206` |
| MO-01p | WO7.4.0 Money dashboard | `139:55911` | 360 × 836 | **2-month profit + Celebratory card** | Canonical positive variant |
| MO-01p | WO7.4.0 Money dashboard | `139:56009` | 360 × 836 | profit, 120 dp Celebratory card | Short-copy alternative |
| MO-01l | WO7.4.0 Money dashboard — 2 month loss | `139:56107` | 360 × 779 | **loss / alert state** | Canonical negative variant |
| MO-01l | WO7.4.0 Money dashboard — 2 month loss | `139:57177` | 360 × 779 | dup (info row) | Links to MO-31 |
| MO-10 | WO7.1.1 Add an amount — income or expense | `139:56313` | 360 × 640 | — | Income vs expense chooser |
| MO-10 | WO7.1.1 Add an amount (dup) | `139:56387` | 360 × 640 | dup, expense-row entry | Canvas copy |
| MO-11 | WO7.1.2 Add income - type | `139:56346` | 360 × 654 | 4-item list | Income category picker |
| MO-11 | WO7.1.2 Add income - type (dup) | `139:58951` | 360 × 654 | backdrop for MO-D3 spec | Canvas copy |
| MO-12a | WO7.1.3 Income - preschool fee | `139:57178` | 360 × 640 | **step 1 of 2** — class select cards | Choose class(es) |
| MO-12a | WO7.1.3 Income - preschool fee | `139:58725` | 360 × 640 | step 1, no-class informational | Nothing to select |
| MO-12b | WO7.1.3 Income - preschool fee | `139:57191` | 360 × 1617 | **step 2 of 2**, 2 classes, filled | Per-child amount entry |
| MO-12b | WO7.1.3 Income - preschool fee | `139:57219` | 360 × 1893 | symbol, "big class" | Long-list stress test |
| MO-12c | WO7.1.3 Income - preschool fee | `139:58800` | 360 × 1027 | edit/view of saved entry | Edit state |
| MO-12c | WO7.1.3 Income - preschool fee | `139:58801` | 360 × 1152 | edit + `Alert` banner + `secondary` footer | Edit state with warning |
| MO-13 | WO7.1.4 Income - donations/vouchers | `139:56361` | 360 × 640 | none selected | Canonical income form |
| MO-13 | WO7.1.4 Income - donations/vouchers | `139:58556` / `139:58569` / `139:58582` | 360 × 640 ea. | Item / Money / Voucher selected | Single-select states |
| MO-13 | WO7.1.4 Income - donations/vouchers | `139:58864` | 360 × 640 | walkthrough backdrop | Tutorial step |
| MO-14a | WO7.1.5 Income - subsidy | `139:56373` | 360 × 763 | — | DBE subsidy form (2 extra inputs) |
| MO-14b | WO7.1.6 Income - other | `139:55897` | 360 × 640 | — | Free-text income type |
| MO-15 | WO7.2.1 Add expense - type | `139:56388` | 360 × 898 | 7-item list | Expense category picker |
| MO-16 | WO7.2.2 Expense - rent | `139:56408` | 360 × 863 | **empty / Save disabled** | Canonical expense form |
| MO-16 | WO7.2.2 Expense - rent | `139:56423` | 360 × 863 | **filled / Save enabled** | Enabled pair |
| MO-16 | WO7.2.3 Expense - salary & wages | `139:56438` | 360 × 823 | empty | Sibling form |
| MO-16 | WO7.2.3 Expense - salary & wages | `139:58845` | 360 × 906 | edit + `secondary` delete button | Edit-existing |
| MO-16 | WO7.2.3 Expense - salary & wages | `139:58831` | 360 × 855 | edit + `Alert` + `secondary` | Edit-existing, alert |
| MO-16 | WO7.2.4 Expense - utilities | `139:56452` | 360 × 828 | 2-line page title | Sibling form |
| MO-16 | WO7.2.5 Expense - learning materials | `139:56466` | 360 × 828 | — | Sibling form |
| MO-16 | WO7.2.5 Expense - food | `139:56480` | 360 × 783 | short info block (52 dp) | Sibling form |
| MO-16 | WO7.2.6 Expense - annual maintenance & purchases | `139:56494` | 360 × 848 | 2-line page title | Sibling form |
| MO-16 | WO7.2.7 Expense - other | `139:56508` | 360 × 715 | **no info block** | Free-text expense type |
| MO-20 | WO7.3.0 View previous statements | `139:56708` | 360 × 771 | 2 year groups × 3 months | Statement index |
| MO-20 | WO7.3.0 View previous statements | `139:56959` | 360 × 1083 | 2 groups, 2nd = 9 months | Longer list |
| MO-20 | WO7.3.0 View previous statements | `139:57009` | 360 × 1354 | 3 year groups | Longest list |
| MO-21 | WO7.3.1 One month view previous statement | `139:56762` | 360 × 993 | **fully populated** | Month statement |
| MO-21 | WO7.3.1 … income blank | `139:56812` | 360 × 846 | income empty | Empty-state pair |
| MO-21 | WO7.3.1 … expenses blank | `139:56862` | 360 × 760 | expenses empty | Empty-state pair |
| MO-21 | WO7.3.1 … blank | `139:57080` | 360 × 640 | both blank, **no footer button** | Full empty state |
| MO-22 | WO7.3.2 One line item view | `139:56746` | 360 × 771 | — | Category drill-down |
| MO-30 | WO7.5.0 General info page | `139:57091` | 360 × 1250 | — | "What are income statements?" + walkthrough launcher |
| MO-31 | WO7.5.1 Making a profit info page | `139:57125` | 360 × 761 | — | 9-item ideas list |
| MO-D1 | WO7.3.1a Dialog - finalise download | `139:56908` | 360 × 640 (card 328 × 353) | modal over MO-21 | Download confirmation |
| MO-D2 | WO3.2.0a Dialog - walkthrough start | `139:57250` | 360 × 640 (card 328 × 355) | modal over MO-01 empty | Offer the walkthrough |
| MO-D2 | WO3.2.0a Dialog - walkthrough start + card 1 | `139:57344` | 360 × 640 | + FAB spotlight | Tutorial step 1 |
| MO-D3 | dialog card - overlay "add children first" | `139:58968` / `139:58969` | 328 × 378 / 328 × 307 | tall / short copy | Preschool-fee gate |
| MO-D4 | 5A.6.0a Dialog - walkthrough language picker | `139:58735` | 360 × 640 (card 328 × 299) | — | Language before walkthrough |
| MO-W1 | 4.1.a Money screen - not started (legacy) | `139:57249` | 360 × 640 | walkthrough backdrop | Tutorial start backdrop |
| MO-W2 | 4.2 Add an amount (legacy) | `139:58595` / `139:57508` | 360 × 640 | tutorial cards 2 / 3 | Coach-mark steps |
| MO-W3 | 4.3 Add income (legacy) | `139:57626` / `139:57718` / `139:57806` | 360 × 640 | tutorial cards 4 / 5 / 7 | Coach-mark steps |
| MO-W4 | 4.1.b Money screen - summary (legacy) | `139:57894` / `139:58148` | 360 × 640 | tutorial card 8 (table / button) | Coach-mark steps |
| MO-W5 | 2.1.1 Children dashboard - playgroup | `139:58389` | 360 × 640 | tutorial card 11 (final) | Walkthrough end |
| — | Frame 704 (component study) | `139:58947` | 328 × 182 | `Filled with icon` + `Alert` | Not a screen |

---

## 3. Screen specs

Shared chrome and rhythm used by every recipe below:

| Element | Component | Geometry | Colour |
|---|---|---|---|
| App bar | **App bar** — `Title with subtitle` variant | 360 × 64 at y 0 | fill `role.appBar`; back chevron, title, subtitle, trailing icon all `role.onAppBar`; the **?** help affordance is a circular `role.action` chip |
| Offline chip | **Offline pill** (`patterns/offline-first.md`) | 48 × 16 at x 156, y 80 | `status.error.main` fill, `role.onAction` label; hidden while online |
| Tabs | **Tabs** — underline style | 360 × 56 at y 64, 1 dp bottom border | bar `role.background`; active label + 3 dp underline `role.action`; inactive label `role.textMid`; border `role.line` |
| Page Title | **Page Title** | 328 × 33 (1 line) / × 58 (2 lines) at x 16 | `typescale.h2`, `role.textDark` |
| Footer | **Form Layout** footer | 360 × 72; `standard` divider at y 0, button 328 × 40 at x 16, y 16 | divider `role.line` |
| Full-width button | **Primary button** | 328 × 40, `radius.lg`, `elevation.button` | fill `role.action`, label `typescale.button` in `role.onAction`; disabled fill `role.actionDisabled` (label stays `role.onAction`) |
| Outlined button | **Secondary button** | 328 × 40, `radius.lg`, no shadow | `role.surface` fill, 2 dp `role.action` border, `role.action` label |
| FAB | **FAB**, extended | 247 × 48 at x 93, bottom − 80, `radius.xxl` | fill `role.action`, 24 dp `+` and `typescale.buttonFab` label in `role.onAction`, `elevation.button` |

**Form field rhythm:** label (`typescale.h4`, `role.textDark`) → 4 dp (`space.fieldGap`) → field.
Fields are 72 dp (value or placeholder), 92/96 dp (with a sub-label such as "Optional"), 108 dp
(label + chip row). Field pitch is **88 dp** (72 + 16) and **108 dp** for the taller variants.
All fields are `role.background` filled, `radius.sm`, no border at rest.

### MO-01 — Money dashboard (profit variant, `139:55911`, 360 × 836)

1. **App bar** (`Title with subtitle`), 360 × 64 at y 0, fill `role.appBar`. Left: 24 dp back
   chevron `role.onAppBar` at x 16. Centre: two-line stack — title **"Business"**
   (`typescale.h3`, `role.onAppBar`) over subtitle **"Monday, 30 December"** (`typescale.help`,
   `role.onAppBar`). Right: 32 dp circular **?** help button, fill `role.action`, glyph
   `role.onAction`, at x 312 → opens **MO-30**.
2. **Tabs**, 360 × 56 at y 64, fill `role.background`, 1 dp bottom border `role.line`. Two
   180 dp tabs: **"Money"** (active — label `role.action` `typescale.h4`, 3 dp underline
   `role.action`) and **"Resources"** (inactive — `role.textMid`).
   *Note:* the empty variant `139:56216` renders **three** tabs (`Staff` · `Money` · `Resources`)
   and the DBE registration screens render **four**. Build the tab strip data-driven from the
   modules the tenant/user has enabled; do not hard-code two.
3. **Offline pill** at x 156, y 80 (hidden while online).
4. **Balance hero card** — `action item large sum`, 328 × 72 at x 16, y 150, `radius.md`.
   Fill is semantic: **`status.success.main`** when the month balance ≥ 0,
   **`role.select`** when < 0. Left: 2-line label **"December balance"**
   (`typescale.bodyMedium`, `role.onAction`). Right, right-aligned: **"+ R 100.25"**
   (`typescale.h1`, `role.onAction`).
5. **Comparison table** — **Table** (`Simple striped/Mobile`), 328 × 197 at x 16, y 242,
   `radius.md`, clipped.
   - Header row 40 dp: three columns of 109.33 dp; labels `""` / `"NOV 2021"` / `"DEC 2021"` in
     `typescale.overline`, `role.textMid`; 1 dp `role.action` divider beneath the header.
   - Body rows 52 dp, zebra `role.surface` / `role.background`:
     `Income` · `Expenses` · **`Balance`** (bold, `role.textDark`).
   - Amounts `typescale.help` in `role.textDark`; the **Balance** row's values are colour-coded:
     positive `status.success.main`, negative `status.error.main`.
   - Column 2 = previous calendar month, column 3 = current calendar month.
6. **Status banner** at x 16, y 459 — one of three, or none:
   - **Profit → Celebratory card** (`Cards → Content card`, Celebratory variant), 328 × 172
     (short-copy variant 120 dp, `139:56009`), `radius.md`, fill `status.success.main`.
     48 dp star-eyed emoji circle at left (fill `palette.quinary`); bold headline
     **"Great job! You have made a profit for 2 months in a row!"** (`typescale.h4`,
     `role.onAction`); body **"You had R 400.35 left over for Nov & Dec combined."**
     (`typescale.help`, `role.onAction`); dismiss **✕** 22 dp top-right in `role.onAction`.
   - **Loss → Inline alert**, 328 dp, `radius.md`, fill `status.alert.bg`; 20 dp filled warning
     circle `status.alert.main` top-left; body `typescale.helpStrong` in `status.alert.dark`:
     *"Over the past two months, you have made less money than you have earned. This means your
     business is running at a loss."*; dismiss **✕** `role.textDark` top-right; then a
     **small primary button** **"Learn more"** (32 dp, `radius.md`, `role.action` fill,
     `typescale.buttonSmall` in `role.onAction`) → **MO-31**.
     > **Copy bug — do not ship as written.** "made less money than you have earned" should read
     > "spent more money than you have earned". Flag to the designer.
   - **Neither → no banner**; the actions block moves up by the banner height + 16 dp.
7. **Actions** — **Primary button with leading icon**, 328 × 40 at x 16 (y 651 in the profit
   variant): statement/document glyph 20 dp + **"See all statements"** → **MO-20**.
8. **FAB** — extended, 247 × 48 at x 93, y 755: `+` glyph + **"Add income or expense"** →
   **MO-10**. One FAB per screen; it stays live in every state including empty.

### MO-01 — empty state (`139:56216`, 360 × 640)

1. App bar as above (subtitle **"Monday, 7 December"**).
2. Tabs (three tabs in this frame — see the note in MO-01 step 2).
3. **Full-page empty state** (components.md §8 "Full-page states"), centred, starting at y ≈ 165:
   - ~110 dp circle in `category.activities.tint` containing the piggy-bank sticker illustration
     (see `foundations/illustration-imagery.md`).
   - Headline, centred, 2 lines: **"You don't have any income statements yet!"** —
     `typescale.h2`, `role.textDark`.
   - Sub-copy, centred, 2 lines: **"Tap "Add income or expense" to get started"** —
     `typescale.help`, `role.textMid`.
4. No hero card, no table, no banner, **no "See all statements" button**.
5. FAB **"+ Add income or expense"** stays live.

### MO-10 — Add an amount, income or expense (`139:56313`, 360 × 640)

1. **App bar**, single-line centred title **"Add an amount"**, back chevron only (no subtitle,
   no help icon).
2. **Page Title** at x 16, y ≈ 88: **"What would you like to record?"** (`typescale.h2`,
   `role.textDark`).
3. Two **action-item selection cards**, 328 dp wide, ~92 dp tall, `radius.md`, on a 108 dp pitch:
   - **Income card** — fill `status.success.bg`. Leading 48 dp circle (`radius.xxl`) filled
     `status.success.dark` with a white 22 dp inbound-arrow-into-tray icon. Title
     **"Income (money in)"** (`typescale.h4`, `role.textDark`); subtitle **"Preschool fees,
     donations, DBE subsidy & others"** (`typescale.help`, `role.textMid`, wraps to 3 lines);
     trailing 24 dp chevron-right `role.textDark`.
   - **Expense card** — fill `role.selectSubtle`. 48 dp circle filled `role.select` with a white
     outbound-arrow-from-tray icon. Title **"Expense (money out)"**; subtitle **"Rent, utilities,
     food, educational supplies & others"**; chevron-right.
4. **No footer button** — selection navigates immediately. The remaining ~300 dp is
   `role.surface`.

### MO-11 — Add income - type (`139:56346`, 360 × 654)

1. **App bar**, title **"Add income (money in)"**, back chevron. Offline pill at 156, 80.
2. **Page Title** 360 × 33 at y 79: **"Add your income"**.
3. Section label at x 16, y 142, 328 × 23: **"What type of money came in?"** (`typescale.h4`,
   `role.textDark`).
4. **Action list** (`Action with icons`), 328 × 308 at x 16, y 190 — four rows on a ~77 dp pitch
   (`size.rowTitleAction`), each separated by a **dashed** 1 dp rule in `role.line` (including a
   rule **above** the first row):

   | Title (`typescale.h4`, `role.textDark`) | Subtitle (`typescale.help`, `role.textMid`) |
   |---|---|
   | Preschool fees | Caregiver contributions |
   | Donations or vouchers | Fundraising contributions |
   | DBE subsidy | Department of Basic Education |
   | Other | Add your own income type |

   Trailing on every row: a **small primary button** **"Add +"**, ~60 × 32, `radius.md`,
   `role.action` fill, `typescale.buttonSmall` in `role.onAction`. The whole row is tappable
   (48 dp minimum target), not just the pill.
5. **Informational banner** (`Informational 3`), 328 × 120 at x 16, y 514, `radius.md`, fill
   `status.info.bg`, 20 dp ⓘ icon `status.info.main`, body `typescale.helpStrong` in
   `status.info.dark`:
   *"If you don't see the income type you want to add above, use the "Other" type to add your
   own."* then a bullet line *"• For example: business grants."*

### MO-15 — Add expense - type (`139:56388`, 360 × 898)

Identical anatomy to MO-11 with a **7-row** list (328 × 559 at x 16, y 88 inside a content frame
at y 79) and a taller info banner.

1. App bar title **"Add expense (money out)"**.
2. Page Title **"Add an expense"**.
3. Section label **"What did you pay for?"**
4. Seven dashed-separated rows, each with an **"Add +"** small primary button:

   | Title | Subtitle |
   |---|---|
   | Rent | Cost for using programme venue |
   | Utilities (electricity, water…) — truncates with `…` | Incl. airtime, data, insurance |
   | Salary & wages | For all staff, incl. your salary |
   | Food | Programme meals & snacks |
   | Learning materials | Books, toys, copying, etc. |
   | Annual maintenance & pu… — truncates | Paint for building, new gate, etc. |
   | Other | Add your own expense type |

   Long titles **truncate with an ellipsis on one line — never wrap**.
5. **Informational banner** 328 × 140 at x 16, y 663, `status.info.bg` / `status.info.main` /
   `status.info.dark`: *"If you don't see the expense type you want to add above, use the "Other"
   type to add your own."* / *"• For example: cost of training for staff, transport, or other
   items."*

### MO-16 — Expense detail form (canonical: rent `139:56408` empty / `139:56423` filled, 360 × 863)

Every expense detail screen is this template; only the app-bar title, the page title and the info
block height change.

1. **App bar**, back chevron, title **"Add rent"**. Offline pill at 156, 80.
2. **Form Layout** starts at y 78. **Page Title** 328 × 33 at x 16, y 0 of the layout: **"Rent"**.
3. **Informational banner** (`Informational 2`), 328 × 132 at x 16, y 49, `radius.md`, fill
   `status.info.bg`, ⓘ `status.info.main`, body `typescale.helpStrong` in `status.info.dark`:
   *"The cost for using your programme venue. This could be a venue you rent for the programme or
   a share of your home rental if you are running your programme from home."*
4. **Date field** — label **"When did you pay?"** (`typescale.h4`, `role.textDark`) → input
   `Filled with icon`, 328 × 72 at x 16, y 197: fill `role.background`, `radius.sm`, value
   **"Mon, 5 July 2021"** (`typescale.bodyTight`, `role.textDark`), trailing 20 dp calendar icon
   `role.textMid`. Tapping opens the platform date picker.
5. **Amount field** — label **"How much did you pay?"** → input, 328 × 72 at x 16, y 285.
   Empty state: placeholder **"e.g. R 500.00"** in `role.textLight`. Filled state
   (`139:56423`): value in `role.textDark`. Numeric keypad; **"R "** prefix rendered by the
   field, not typed.
6. **Note field** — label **"Add a description or note"** with sub-label **"Optional"**
   (`typescale.help`, `role.textMid`) → `inactive help text` input, 328 × 96 at x 16, y 373,
   placeholder **"e.g. Paid for two months"**.
7. **Photo upload** — label **"Upload a photo of invoice or receipt"** + **"Optional"** →
   **Form Photo** panel, 328 × 212 at x 16, y 485: fill `role.background`, **dashed 2 dp
   `role.line` border**, centred 56 dp circle filled `role.select` with a white camera icon,
   caption **"Tap to add"** (`typescale.help`, `role.textMid`). **Expense forms only.**
8. **Footer Form Layout**, 360 × 72 at y 713: 1 dp `role.line` divider + save button 328 × 40 at
   x 16, y 16, with a 20 dp save/disk leading glyph and label **"Save"**.
   - Required fields incomplete → **Primary button, disabled**: fill `role.actionDisabled`,
     label stays `role.onAction`.
   - Valid → **Primary button**: fill `role.action`, `elevation.button`.

**Sibling expense forms** (identical except where noted):

| Node | App bar / page title | Info block height | Notes |
|---|---|---|---|
| `139:56438` | Salary & wages | 92 dp | "For all staff, incl. your salary" |
| `139:56452` | Utilities | 72 dp | Page Title is **2 lines** (328 × 58) |
| `139:56466` | Learning materials | 92 dp | — |
| `139:56480` | Food | 52 dp | shortest info copy |
| `139:56494` | Annual maintenance & purchases | 92 dp | Page Title is **2 lines** |
| `139:56508` | Other | **none** | fields start at y 49; adds a free-text "expense type" input |

**Edit-existing variants:** `139:58845` (360 × 906) appends a **Secondary button** (delete) below
the primary in the footer; `139:58831` (360 × 855) additionally opens the form with an **Alert**
banner (328 × 112) at the top of the Form Layout.

### MO-13 — Income detail form (canonical: donations/vouchers `139:56361`, 360 × 640)

1. **App bar** title **"Add donations or vouchers"**.
2. **Page Title** **"Donations or vouchers"** at y 79 + 8.
3. **Date field** — label **"When did you get this donation/voucher?"** → `Filled with icon`
   328 × 72 at x 16, y 49 of the Form Layout, value **"Mon, 5 July 2021"** + calendar icon.
4. **Segmented single-select** (`Next buttons/Label & single-select`), 328 × 108 at x 16, y 137:
   3-line label **"Was the donation an item like groceries or toys, money, or a voucher for a
   particular shop?"** (`typescale.h4`, `role.textDark`) over three equal-width chips filling
   328 dp with 6 dp gaps, 40 dp tall, `radius.md`:
   **Item** | **Money** | **Voucher**.
   Resting chip: fill `role.selectSubtle`, label `typescale.chip` in `role.select`.
   Selected chip: fill `role.select`, label `typescale.chipActive` in `role.onSelect`,
   `elevation.sm`. Selected states are drawn in `139:58556` / `139:58569` / `139:58582`.
5. **Note field** — label **"Add a note"** + **"Optional"** → `inactive help text` 328 × 96 at
   x 16, y 261, placeholder **"e.g. Food donation from local shop"**.
6. **Footer Form Layout**, 360 × 72 at y 451: divider + **Save** button (disabled until date +
   selection are set). Roughly 150 dp of `role.surface` sits below the footer — the footer is
   **not** pinned to the viewport bottom on short forms; it follows the content.
7. **No photo-upload block on income forms.**

**MO-14a — DBE subsidy (`139:56373`, 360 × 763):** same template plus two extra inputs. Stack:
Page Title → `Informational 4` (328 × 132) → date `Filled with icon` (72) → input (92) →
input (92) → note `inactive help text` (96) → footer.

**MO-14b — Other income (`139:55897`, 360 × 640):** shortest income form. Stack: Page Title →
`inactive help text` (96, the free-text income type) → input (92, amount) → `Filled with icon`
(72, date) → label → footer with the disabled primary.
> Designer note `139:55884`: *"Other (removed a field here - the SmartStart version needs to be
> updated to match)"* — this form deliberately has one fewer field than the SmartStart build.

### MO-12a — Preschool fee, step 1 of 2 (class picker, `139:57178`, 360 × 640)

1. **App bar** title **"Add preschool fees"**, subtitle = step indicator.
2. **Page Title** at y 79.
3. **Form Layout** at y 142: a 2-line question `Title` (328 × 46), then **three `Select card`
   rows**, 328 × 56 each on a **60 dp pitch** (y 62 / 122 / 182) — one per class registered at
   the site. Card fill `role.background`, `radius.md`, 16 dp checkbox at x 16 with a
   `role.action` outline, label at x 48 (`typescale.h4`, `role.textDark`). **Multi-select.**
4. **Footer:** divider + **Primary button, disabled** until at least one class is ticked.

**Alt state `139:58725`:** the class list is replaced by a single **Informational banner**
(328 × 72, `status.info.bg`) when there is nothing to select.

### MO-12b — Preschool fee, step 2 of 2 (per-child amounts, `139:57191`, 360 × 1617)

1. **App bar**: title **"Add preschool fees"**, subtitle **"step 2 of 2"**.
2. **Page Title** **"Preschool fees"**.
3. Section label **"How much did each caregiver pay?"** followed by a **dashed** 1 dp
   `role.line` rule at x 16, y 39.
4. **Month select** — `Filled with icon`, 328 × 92 at x 16, y 56: label **"Which month would you
   like to add fees for?"** over a `role.background` select showing placeholder **"Tap to choose
   month"** (`role.textLight`) with a trailing chevron-down (`role.textMid`). Followed by another
   dashed rule.
5. **Per-class groups.** For each selected class, in order:
   - Class `Title` at x 16 (`typescale.h4`, `role.textMid`) — e.g. **"Elephants Class"** at y 181.
   - One `filled` amount input per child, 328 × 72, on an **88 dp pitch** (y 217, 305, 393, 481,
     569, 657, 745, 833 for an 8-child class). Each input is captioned above with the child's
     name (`typescale.h4`, `role.textDark`) and shows a bold **"R"** prefix and value `0`
     (`typescale.bodyTight`, `role.textDark`) on a `role.background` field.
   - A dashed `role.line` rule closes the group.
   Frame `139:57191` renders **Elephants Class** (Alexander Hamilton, Amahle Khumalo,
   Hope Mokoena, Lethabo Nkosi, Monwabisi Dasie, Palesa Ndlovu, Philip Hamilton, Themba Sibiya)
   then **Lions Class** at y 938 (Aaron Burr, Angelica Schuyler, Bulelwa Mahlangu,
   Cynthia Jacobs, Thandile Dlamini) at y 974 / 1062 / 1150 / 1238 / 1326.
6. **Footer Form Layout** at y 1545: divider + **Primary button, disabled** **"Save"**.

Designer note `139:58863`: *"If multiple classes selected, show class title & divider between
each"*. `139:57219` (360 × 1893) is the same screen with a larger class — note `139:58862`:
*"Just showing what a big class looks like"*. The screen must scroll gracefully at arbitrary
class size; do not paginate.

**MO-12c — edit an existing preschool-fee entry (`139:58800` 360 × 1027 / `139:58801` 360 × 1152):**
`139:58801` opens with an **Alert** banner (328 × 112) at y 0 of the Form Layout, then the title,
a dashed rule, the month `Filled with icon` (92), a class `Title`, and the same 88 dp run of
amount inputs. **The footer button is a `Secondary` (outlined) button, not primary**, and — per
note `139:58860` — **preschool fees is the only line item with no delete button**.

### MO-20 — View previous statements (`139:56708`, 360 × 771)

1. **App bar**, back chevron, **2-line** centred title **"View & download previous statements"**.
   Offline pill at 156, 80.
2. **Page Title** 360 × 58 at y 79, 2 lines: **"Choose a statement to view and download"**.
3. **Form Layout** from y 157. Repeating **year group**, pitch **271 dp** for a 3-row group
   (31 heading + 16 gap + 208 list + 16 gap):
   - **Group heading** — `Page Title` 328 × 31: **"2022"** (`typescale.h4`, `role.textDark`).
   - **Action list** 328 × 208: three `action item with amount and icon` rows, **52 dp** each,
     fill `role.background`, `radius.md`, separated by 1 dp `role.line` full-width dividers.
     Row content: month name left (`typescale.h4`, `role.textDark`), 24 dp chevron-right
     (`role.textMid`) at the far right. e.g. **"March 2022"**, **"February 2022"**,
     **"January 2022"**.
   - **Group summary row** — `action item with amount`, 52 dp, closing the list. Fill is
     semantic: **`status.success.main`** with label **"Profit"** when the year total ≥ 0,
     **`role.select`** with label **"Loss"** when < 0. Label left and amount right, both
     `role.onAction` / `role.onSelect`. The 2021 group in `139:56708` shows
     **"Profit" / "+ R 2 000"**; the 2022 group shows **"Loss" / "- R 200"**.
4. **Footer Form Layout** 360 × 72 at y 542: divider + **Primary button with icon**, document
   glyph + **"See more statements"** — pages in the next year group.

Longer variants: `139:56959` (second group expanded to 9 rows / 520 dp) and `139:57009` (three
year groups, 1509 dp of content).

### MO-21 — One month view previous statement (`139:56762`, 360 × 993)

1. **App bar**: title **"View December statement"**, subtitle **"Monday, 30 December"**.
2. **Page Title** **"December 2021"** (`typescale.h2`, `role.textDark`).
3. **Income block** — `Action with icons`, 328 dp × 281: four **56 dp** `action item with amount
   and icon` rows (`size.rowCompact`), fill `role.background`, 1 dp `role.line` separators.
   Each row: category label left (`typescale.h4`, `role.textDark`), amount right-aligned before
   the chevron (`typescale.h4`, `role.textDark`), 24 dp chevron-right.

   | Preschool fees | R 202.52 |
   | DBE subsidy | R 800.42 |
   | Donations or v… (truncated) | R 200.54 |
   | Other | R 200.30 |

   Closed by an `action item with amount` **total row**, 56 dp, fill `status.success.main`,
   text `role.onAction`: **"Total income"** / **"R 1 800.11"**. A dashed 1 dp `role.line` rule
   follows.
4. **Expense block** — same anatomy, seven rows (Rent · Salary & wages · Electricity, wat… ·
   Learning mater… · Cleaning mater… · Food), closed by a total row filled `role.select` with
   `role.onSelect` text: **"Total expenses"** / **"- R 1 700.20"**.
5. **Balance card** — `action item large sum`, 328 × 64 (`size.rowSum`), `radius.md`, fill
   **`role.appBarMuted`** (the neutral slate): **"Balance"** left (`typescale.bodyMedium`,
   `role.onAppBar`), **"+ R 99.91"** right (`typescale.h1`, `role.onAppBar`).
   Unlike the dashboard hero card this one is **always neutral slate**, regardless of sign.
6. **Footer:** divider + **Primary button with icon**, download-arrow glyph + **"Download"** →
   **MO-D1**. Hidden entirely when the month has no entries at all (`139:57080`).

Long category names **truncate with an ellipsis**, they do not wrap.

**Blank variants** — swap the row list for an **Action panel** empty-state card
(`Action panel statements`), keeping the balance card:
`139:56812` income blank (panel 328 × 130) · `139:56862` expenses blank (panel 328 × 155) ·
`139:57080` both blank — exact stack: Page Title → panel (130) at y 49 → panel (155) at y 199 →
`action item large sum` (64) at y 374, **no footer button**.

### MO-22 — One line item view (`139:56746`, 360 × 771)

Drill-down from a statement category row. **App bar** → **Page Title** 360 × 53 at y 79 → a
single `Action with icons` list at x 16, y 157, 328 × 164: two 56 dp `action item with amount and
icon` rows (the individual entries) and a closing 52 dp `action item with amount` total row in
the semantic colour for the block's direction. **No footer button** — read-only drill-down.

### MO-30 — General info page (`139:57091`, 360 × 1250)

1. **App bar**: back chevron left, centred title **"Income statements"**, white **✕** top-right
   — this is a *dismissable modal page*, not a pushed screen.
2. **Language selector strip**, 360 × 74 at y 64 (`size.languageSelector`), fill
   `role.background`: label **"Change Language:"** (`typescale.bodyMedium`, `role.textMid`) at
   x 16, plus a `filtered` dropdown chip 100 × 40 reading **"English"** with a chevron-down —
   fill `role.action`, label + chevron `role.onAction`. 1 dp `role.line` divider beneath.
3. **Walkthrough launcher card** (`Cards → Action panel`, "with link" variant), 328 × 200 at
   x 16, y ≈ 164, `radius.md`, fill `role.background`, `elevation.base`:
   - Heading 2 lines: **"How to use income statements on AppName"** (`typescale.h2`,
     `role.textDark`).
   - Body: **"Tap the button below to see how to use this part of AppName"** (`typescale.help`,
     `role.textMid`).
   - Full-width **Primary button** with a ➜-in-circle glyph: **"Start walkthrough"** → **MO-D4**.
4. **Body content** 360 × 798 from y 380, 16 dp margins:
   - 1 dp `role.line` divider at y 16.
   - Heading (2 lines): **"Manage your business like a boss!"** (`typescale.h2`,
     `role.textDark`).
   - Sub-head **"What are income statements?"** (`typescale.h4`, `role.textDark`) + body
     **"Income statements help you keep track of all the money you receive and spend."**
     (`typescale.body`, `role.textMid`).
   - Sub-head (2 lines) **"How can you create income statements on AppName?"** + two body
     paragraphs (320 × 360 total):
     *"Each time you spend money, come to the "Money" section of AppName and tap the "Add income
     or expense" button. Choose "Expenses (money out)", then choose an expense type, fill in the
     details, and take a photo of the receipt. Once you tap save, that amount will be added to
     your statement."* /
     *"Each time you get money for your programme, tap the "Add income or expense" button and
     choose "Income (money in)". Choose the income type and fill in the details. Once you tap
     save, that amount will be added to your statement."*
   - Sub-head **"What are income and expenses?"** + two `Alerts/List item` bullet rows,
     328 × 60 each on a **68 dp pitch**, bullet glyph `role.textDark`:
     • **"Income** is all the money that you receive in your business. For example: fees,
     stipends and donations."
     • **"Expenses** are all of the things you spend money on to keep your business running.
     For example: rent, food and airtime."
5. **Footer Form Layout** 360 × 72 at y 1178: divider + full-width **Primary button**
   **"Start tracking"** → dismiss to MO-01.

### MO-31 — Making a profit info page (`139:57125`, 360 × 761)

1. **App bar**: back chevron, title **"Ideas for making a profit"**, **✕** top-right.
2. Same **Language selector** strip as MO-30.
3. **Content** from y 138: 1 dp `role.line` divider, heading **"Ideas for making a profit"**
   (`typescale.h4`, `role.textDark`), then **nine `Alerts/List item` bullets**, 328 dp wide,
   40 dp (1 line) or 60 dp (2 lines) tall on a 48 dp pitch (y 30, 78, 146, 214, 262, 310, 358,
   386, 454), body `typescale.body` in `role.textMid`:
   1. Try to get more fees and contributions from caregivers.
   2. Talk to parents about the importance of early learning and convince them to make this
      investment in their children.
   3. If caregivers can't contribute money, ask them to donate food or other items, or to
      volunteer their time cleaning or cooking.
   4. Apply to get your site registered with the DBE
   5. Fundraise for discounted groceries or stationary *(sic — should be "stationery")*
   6. Ask for donations of books, toys and other classroom resources
   7. Start a vegetable garden
   8. Apply to organisations that support ECD, such as DoMore Foundation, Umncedi, Rotary etc
   9. Raise funds through a community event, such as a cake sale or a dress-up day
4. **Footer:** divider + **Primary button with icon**, ✕ glyph + **"Close"**.

Item 4 ("Apply to get your site registered with the DBE") should deep-link to the **DBE
registration helper** (`design-system/screens/dbe-registration.md`) — it is currently plain text.

### MO-W1…MO-W5 — Walkthrough coach-mark screens (legacy `4.x` backdrops)

The walkthrough does **not** introduce new screens; it composes three layers over a live screen:

1. **Scrim** — `Rectangle 1`, 360 × 640, fill `role.scrim`, dimming the whole viewport including
   the app bar.
2. **Spotlight** — a `dialog card - tutorial` cut-out (e.g. 346 × 307 at x 7, y 75) that
   re-renders the highlighted component **undimmed** inside a **4 dp `role.select` rounded
   outline**. Spotlight geometry per step:

   | Step | Node | Spotlight target | Size / position |
   |---|---|---|---|
   | 1 | `139:57344` | FAB | 266 × 67 at 94, 319 |
   | 2 | `139:58595` | both MO-10 selection cards | 346 × 218 at 7, 129 |
   | 3 | `139:57508` | Income card only | 346 × 110 at 7, 129 |
   | 4 | `139:57626` | whole income-type list | 346 × 239 at 7, 188 |
   | 5 | `139:57718` | one income-type row | 346 × 79 at 7, 266 |
   | 7 | `139:57806` | Save button on the detail form | 346 × 58 at 7, 323 |
   | 8 | `139:57894` | balance card + comparison table | 346 × 307 at 7, 75 |
   | 8b | `139:58148` | "See all statements" button | 346 × 58 at 7, 382 |
   | 11 | `139:58389` | none (finish card) | — |

3. **Tutorial card** — `Tutorial card 2`, 328 × 168 at x 16, y 457, fill `role.surface`,
   `radius.md`, `elevation.lg`: 80 dp circular robot-mascot avatar at left; body copy at right
   (`typescale.bodyMedium`, `role.textDark`); an **11-dot progress rail** along the bottom-left
   (10 dp dots on a 14 dp pitch; the active dot is a 20 × 10 pill filled `role.select`); and a
   **small primary button** **"Next"** with a ➜-in-circle glyph bottom-right. An optional
   hand/arrow pointer vector (30.8 × 39.2) links card to spotlight.

Card copy captured in the extraction: step 2 *"You can choose whether you want to add income or
expenses to your income statement"*; step 8 *"Great! Your income has now been added to the summary
income statement on the money tab"*.

---

## 4. Dialogs & popups

All money dialogs use the **Dialog (modal card)** component: `role.scrim` full-bleed scrim over
the live screen, a **328 dp `role.surface` card at x 16**, `radius.xl`, `elevation.dialog`,
16 dp horizontal padding (→ 296 dp content, `size.dialogContentWidth`), 24 dp top padding.
Buttons are **296 × 40** with a **16 dp gap** (`space.buttonGap`), primary above secondary, and
every button carries a leading glyph in a circle.

### MO-D1 — Finalise download (`139:56908`, card 328 × 353 at x 16, y 144)

- **Trigger:** **[Download]** on MO-21, for a month that has **not** yet been downloaded.
- **Backdrop:** MO-21 fully populated, covered by `role.scrim`.
- **Anatomy:**
  1. 44 dp filled circle, `status.alert.main`, white **!** glyph, centred.
  2. Headline (3 lines, centred): **"Are you sure you want to download your December
     statement?"** — `typescale.h3`, `role.textDark`.
  3. Body (2 lines, centred): **"You will not be able to edit the statement after
     downloading."** — `typescale.body`, `role.textMid`.
  4. **Primary button** 296 × 40, download-arrow glyph + **"Yes, download"** → generate the file
     **and lock the month**.
  5. **Secondary button** 296 × 40, pencil glyph + **"No, continue editing"** → dismiss.
- Bracketing comments `139:56207` *"Before income statement is downloaded. ⬇️"* and `139:56209`
  *"After statement is downloaded ⬇️"* define the two canvas rows — i.e. **downloaded is a
  persistent state of the month**, not a one-off action.

### MO-D2 — Walkthrough start (`139:57250`; with card 1 `139:57344`, card 328 × 355 at x 16, y 110)

- **Trigger:** **[Start walkthrough]** on MO-30, after the language picker; also offered on
  first entry to the Money tab (backdrop is the *empty* dashboard).
- **Anatomy:** ~108 dp circular mascot illustration (navy circle, robot with `palette.quinary`
  body, `role.select` heart) at 126, 48 → headline **"Manage your business like a boss!"**
  (`typescale.h3`, `role.textDark`) → body **"Would you like to see how to create your income
  statements?"** (`typescale.body`, `role.textMid`) → **Primary button** with ✓-in-circle glyph
  **"Yes, help me!"** → **Secondary button** with clock glyph **"No, skip"**.
- `139:57344` shows the same dialog followed immediately by tutorial card 1 and the FAB spotlight.

### MO-D3 — "You need to add children first" (`139:58968` 328 × 378 / `139:58969` 328 × 307)

- **Trigger (note `139:58967`, verbatim):** *"IF user taps "Preschool fees" and there are no
  children at the school yet, then show the pop-up."* Backdrop is MO-11.
- **Anatomy:** 44 dp `status.alert.main` circle with white **!** → headline (2 lines)
  **"Oops! You need to add children first!"** (`typescale.h3`, `role.textDark`) → body (4 lines)
  **"You need to register children before adding fees. Tap below or go to Classroom > choose/add
  a class > See children > Add a child."** (`typescale.body`, `role.textMid`) → **Primary
  button** with +-in-circle glyph **"Add a child"** (deep-links to child registration) →
  **Secondary button** with ✕ glyph **"Close"**.
- Two heights are spec'd for the two copy lengths — the card must size to content, not to a fixed
  height.

### MO-D4 — Walkthrough language picker (`139:58735`, card 328 × 299 at x 16, y 171)

- **Trigger:** immediately before the walkthrough starts.
- **Backdrop:** plain `role.scrim` — **no app content behind it**.
- **Anatomy:** 100 dp yellow (`palette.quinary`) robot mascot circle centred → headline
  **"Which language should I use?"** (`typescale.h3`, `role.textDark`) → `Filled` select
  **296 × 48** at y 147, fill `role.background`, value **"English"** (`role.textDark`) +
  chevron-down → **Primary button** 296 × 40 with ➜-in-circle glyph **"Start"** → **Secondary
  button** 296 × 40 (drawn but clipped by the 299 dp card in the Figma render — size the card to
  content and show both).

---

## 5. States & edge cases

| State | Where | Behaviour |
|---|---|---|
| **Empty — never tracked** | MO-01 `139:56216` | Piggy-bank illustration + "You don't have any income statements yet!" + "Tap "Add income or expense" to get started". No hero card, no table, no statements button. FAB stays live. |
| **Empty — nothing tracked *this month*** | MO-01 `139:56615` | Probed by note `139:56206`: *"JusT TRYING TO GET A SENSE OF WHAT IT'LL LOOK LIKE IF SOMEONE HASN'T TRACKED ANYTHING YET FOR THE CURRENT MONTH"*. **Unresolved in the design.** Recommended: keep the hero card at `R 0.00` in `role.appBarMuted` (neutral, not green), render the comparison table with the previous month populated and the current month at `R 0.00`, suppress both status banners. **Confirm with the designer before building.** |
| **Statement empty — income only** | MO-21 `139:56812` | Income list replaced by an `Action panel statements` empty card (328 × 130); expense list and balance card render normally. |
| **Statement empty — expenses only** | MO-21 `139:56862` | Expense list replaced by an `Action panel statements` empty card (328 × 155). |
| **Statement completely empty** | MO-21 `139:57080` | Both panels, balance card at `R 0.00`, **no Download button**. Comment `139:55891`: *"Empty states — If practitioner has not logged any income and/or expenses"*. |
| **No classes at the site** | MO-12a `139:58725` | Class list replaced by a single `Informational` block; Save stays disabled. |
| **No children registered** | MO-11 → MO-D3 | Tapping *Preschool fees* opens the dialog instead of the form. |
| **Very large class** | MO-12b `139:57219` (1893 dp) | Screen scrolls; no pagination, no virtual "load more". Section title + dashed divider repeat per class. |
| **Loading** | all | Not drawn on this page. Use the system convention: primary button → `role.actionHover` fill + 16 dp spinner + label; list areas → skeleton rows at the documented row heights. |
| **Offline** | all | Offline pill (48 × 16 at x 156, y 80) on every screen. Writes go local-first and always succeed (`patterns/offline-first.md`); the save snackbar copy changes to *"Saved on your phone. Will send when you're back online."* Never block a save on connectivity. |
| **Offline + Download** | MO-21 / MO-D1 | Statement generation must work from the local cache. If the generated file cannot be persisted or shared offline, warn and allow the user to continue — **but do not lock the month until the file has actually been produced.** |
| **Validation error** | MO-16 / MO-13 | Footer button stays `role.actionDisabled`; there is no inline red-error treatment drawn on this page. If a submitted value is rejected server-side, use the standard error input treatment (2 dp `status.error.main` border, message in `status.error.dark`). |
| **Editing an existing entry** | `139:58800/58801/58831/58845` | Footer primary becomes a **Secondary** button; an **Alert** banner (328 × 112) may head the form; a delete **Secondary** button is appended — **except for preschool fees, which has no delete** (note `139:58860`). |
| **Read-only / past-date** | MO-21, MO-22 | Once a month's statement is downloaded it is **permanently read-only**: no add, no edit, no delete for any entry dated in that month. The Download button and MO-D1 must not re-appear for that month; show the statement in a downloaded/locked presentation instead. |
| **Permission-restricted** | Business hub | The Money tab lives in the Business hub next to Staff / Registration / Resources. Page 18 carries **no** permission annotation — but the sibling DBE feature is explicitly *principal-only* and blocked for trial users. **Open question for product: is Money principal-only, and is it available on trial?** Do not assume it is open to all practitioners. |
| **Long text** | MO-15, MO-21 | Category names truncate with an ellipsis on a single line; they never wrap. Amounts are never truncated. |

---

## 6. Business rules for back-end devs

### 6.1 Entities

**`MoneyEntry`** — one recorded amount.

| Field | Notes |
|---|---|
| `id` | server UUID; client generates a local id for offline queueing |
| `siteId` / `tenantId` | multi-tenant scoping |
| `direction` | `income` \| `expense` — set by MO-10, immutable after save |
| `categoryKey` | income: `preschool_fees`, `donations_vouchers`, `dbe_subsidy`, `other`; expense: `rent`, `utilities`, `salary_wages`, `food`, `learning_materials`, `annual_maintenance`, `other` |
| `customTypeName` | required **iff** `categoryKey = other`; free text (MO-14b / MO-16 "Other") |
| `occurredOn` | date the money moved (**not** the entry date). Drives which monthly statement the entry lands in |
| `amountMinor` | integer cents, ZAR. Never a float |
| `note` | optional free text |
| `photoRef` | optional; **expense entries only** — income forms have no photo block |
| `donationKind` | `item` \| `money` \| `voucher` — required for `donations_vouchers` only |
| `subsidyFields` | two extra values on the DBE-subsidy form (`139:56373`) — exact semantics not captured in Figma; **confirm with the designer** before finalising the schema |
| `createdBy`, `createdAt`, `updatedAt`, `syncState` | audit + offline queue |

**`PreschoolFeeBatch`** — the composite created by MO-12.

| Field | Notes |
|---|---|
| `periodMonth` | `YYYY-MM`, chosen explicitly on step 2 ("Which month would you like to add fees for?") — **this, not the entry date, determines the statement the fees land in** |
| `classIds[]` | the classes selected on step 1 |
| `lines[]` | `{ childId, classId, amountMinor }`, one per child in every selected class; default `0` |
| — | Rolls up into the statement as a **single `preschool_fees` line item** per month (MO-21 shows one row, MO-22 drills into it) |

**`MonthlyStatement`** — derived, never user-authored.

| Field | Notes |
|---|---|
| `siteId`, `periodMonth` | primary key |
| `incomeByCategory[]`, `expenseByCategory[]` | sums of `MoneyEntry.amountMinor` grouped by `categoryKey` |
| `totalIncomeMinor`, `totalExpenseMinor` | |
| `balanceMinor` | `totalIncome − totalExpense` |
| `downloadedAt`, `downloadedBy`, `documentRef` | null until MO-D1 is confirmed |
| `locked` | `downloadedAt != null` |

### 6.2 Calculation rules

1. `balance = totalIncome − totalExpense`, per calendar month, per site, in ZAR minor units.
   Round only at render.
2. An entry belongs to the month of `occurredOn`; preschool-fee batches belong to the month of
   `periodMonth`. Back-dating an entry into an **unlocked** month re-computes that month.
   Back-dating into a **locked** month must be rejected (see 6.4).
3. **Year summary row** (MO-20) = sum of `balanceMinor` over the months in that year that have a
   statement. Label **"Profit"** + `status.success.main` when ≥ 0, **"Loss"** + `role.select`
   when < 0.
4. **Profit streak** (Celebratory card, MO-01): shown when the **two most recent complete
   months** both have `balance > 0`. The body sums both balances:
   *"You had R 400.35 left over for Nov & Dec combined."* → `balance(prev) + balance(prevPrev)`
   using the two months named in the card.
5. **Loss streak** (alert card, MO-01): shown when the **two most recent complete months** both
   have `balance < 0`. Mutually exclusive with the profit card; at most one banner at a time.
   Both banners are **dismissible** — persist the dismissal per user per streak window so the
   banner does not reappear on every launch.
6. **Comparison table** (MO-01) always shows exactly two columns: previous calendar month and
   current calendar month, with rows Income / Expenses / Balance.
7. **Currency formatting** is fixed across the feature: `R` + non-breaking space, space as the
   thousands separator, always 2 decimals — `R 1 800.11`. Signed contexts prefix `+ ` / `- `
   before the `R` (`+ R 100.25`, `- R 1 700.20`). Expense **totals** render negative; individual
   expense **line items** render unsigned (`R 800.00`) — see MO-21.
   *(The legacy `4.x` table signed every value; the current `WO7.4.0` table does not. Follow
   `WO7.4.0`.)*

### 6.3 Validation & enable rules

1. The footer **Save** is disabled (`role.actionDisabled`) until every required field is valid;
   there is no submit-then-error path drawn.
2. **Expense form** required: `occurredOn` (date), `amountMinor` (> 0). Optional: note, photo.
   `Other` additionally requires the free-text expense type.
3. **Income form** required: `occurredOn`, `amountMinor` (> 0); `donations_vouchers` also
   requires `donationKind`. `Other` additionally requires the free-text income type.
4. **Preschool fees step 1** requires ≥ 1 class selected. **Step 2** requires a `periodMonth`.
   Whether Save also requires ≥ 1 non-zero child amount is **not stated in the design** — all
   fields default to `0` and the Save button is drawn disabled. **Recommended rule: enable Save
   once a month is chosen and at least one child amount > 0; store zero-amount children as
   absent rather than as `0` rows.** Confirm with the designer.
5. Amount input: numeric only, max 2 decimals, must be > 0, reject negatives (direction is
   carried by `direction`, never by the sign of the amount).
6. `occurredOn` in the future: **not specified**. Recommended: warn-and-allow per the
   offline-first "warn, never block" principle rather than hard-reject.
7. Free-text `customTypeName`, `note`: trim, cap length (suggest 120 / 500 chars), strip control
   characters. These strings appear verbatim in statement rows and get truncated for display.

### 6.4 Immutability & permissions

1. **Downloading a statement freezes the month.** MO-D1 states it explicitly: *"You will not be
   able to edit the statement after downloading."* Once `downloadedAt` is set:
   - reject create / update / delete of any `MoneyEntry` or `PreschoolFeeBatch` whose effective
     month equals that `periodMonth`;
   - reject back-dating an entry from another month into it;
   - the client hides Add/Edit/Delete affordances for that month and does not re-offer Download.
   This must be enforced **server-side**, not only in the UI — offline clients can queue writes
   against a month that was locked on another device. On conflict, keep the local record visible
   as **"Needs attention"** (offline-first conflict rule) rather than discarding it silently.
2. `direction` and `categoryKey` are **immutable after first save** — the edit screens re-open
   the same category's form; there is no "change category" affordance.
3. **Delete:** every income and expense line item has a delete affordance (a `Secondary` button
   in the edit form) **except preschool fees** — note `139:58860`, verbatim: *"and so on for all
   income & expenses... ONLY the preschool fees item does not include a delete button."*
   The API must still support removing individual preschool-fee lines (edit a child's amount to
   zero / remove the child), but must not expose a batch-delete route to this screen.
4. **Preschool fees requires ≥ 1 registered child at the site.** The client checks before
   navigating (note `139:58967`); the API should also reject a batch with no lines.
5. **Permission gate — open question.** Page 18 carries no role annotation. The sibling DBE
   registration feature is principal-only and blocked for trial users. Confirm whether Money is
   principal-only, whether practitioners get read-only access, and whether trial tenants may use
   it. Whatever the answer, the **Business tab strip must be rendered from the user's entitled
   modules** — the Figma frames show 2, 3 and 4 tabs on different screens.
6. **Statement documents** are per-site artefacts: store `documentRef`, `downloadedBy`,
   `downloadedAt` and serve the same file on re-download rather than regenerating (the statement
   is frozen, so the file must be too).

### 6.5 Data the screens need

| Screen | Required payload |
|---|---|
| MO-01 | current month balance; previous + current month income/expense/balance; profit/loss streak flag + combined streak total + the two month names; whether any statement exists at all; banner dismissal state |
| MO-11 / MO-15 | static category list (order is fixed as drawn); child count > 0 for the preschool-fees gate |
| MO-12a | classes at the site (id, name) |
| MO-12b | children per selected class (id, display name, class name), ordered as displayed (alphabetical by first name in the Figma render); list of months available to record against |
| MO-16 / MO-13 | category metadata (title, info-block copy), plus the existing entry when editing |
| MO-20 | months with statements, grouped by year desc, month desc; per-year total; a paging cursor for **[See more statements]** |
| MO-21 | per-category income and expense sums for the month, totals, balance, `locked` flag |
| MO-22 | individual entries for one category in one month (date, amount, note) |
| MO-30 / MO-31 | localised static copy keyed by the language chosen in the Language selector |

### 6.6 Walkthrough state

1. The walkthrough is offered on first entry to the Money tab (MO-D2 over the empty dashboard)
   and is re-launchable at any time from MO-30.
2. **11 steps**, tracked by an index; the progress rail renders 11 dots. Persist
   `walkthroughCompleted` and `walkthroughLastStep` per user so it is not re-offered after
   completion or dismissal ("No, skip").
3. The language chosen in **MO-D4** applies to the walkthrough copy; it is the same selector as
   the info pages' Language selector strip. Store the choice at user level.

---

## 7. Designer notes carried forward (verbatim)

### Row / flow labels (`comment` frames)

| Node | Note |
|---|---|
| `139:55872` | **1. Adding income** |
| `139:55886` | **2. Adding expenses** |
| `139:55888` | **3. View/download previous statements** |
| `139:55874` | **4. Info screen Screen on main "Money" page** |
| `139:55876` | **5. Variations of money dashboard a. Have not started -- no income/expenses added** |
| `139:55878` | **b. summary** |
| `139:55880` | **d. Programme running at a loss for 2 months** |
| `139:55882` | **e. Programme profits for 2 months in a row** |
| `139:55884` | **Other (removed a field here - the SmartStart version needs to be updated to match)** |
| `139:55890` | **Viewing previous statements** |
| `139:55892` | **Empty states If practitioner has not logged any income and/or expenses** |
| `139:55894` | **Donations or vouchers** |
| `139:55896` | **DBE subsidy** |
| `139:56208` | **Before income statement is downloaded. ⬇️** |
| `139:56210` | **After statement is downloaded ⬇️** |
| `139:58967` | **IF user taps "Preschool fees" and there are no children at the school yet, then show the pop-up.** |

> The variation lettering skips **c.** — there is no "c." comment frame on the page.

### Free-text notes on the canvas

| Node | Note |
|---|---|
| `139:56206` | **JusT TRYING TO GET A SENSE OF WHAT IT'LL LOOK LIKE IF SOMEONE HASN'T TRACKED ANYTHING YET FOR THE CURRENT MONTH** |
| `139:58860` | **and so on for all income & expenses... ONLY the preschool fees item does not include a delete button.** |
| `139:58861` | **and so on for all income & expenses...** |
| `139:58862` | **Just showing what a big class looks like** |
| `139:58863` | **If multiple classes selected, show class title & divider between each** |

### Known copy / design defects to resolve before build

1. **MO-01 loss alert copy is wrong**: *"you have made less money than you have earned"* should
   read *"you have spent more money than you have earned"* (`139:56107`).
2. **MO-31 typo**: "stationary" should be "stationery" (`139:57125`).
3. **Tab count is inconsistent** across frames (2 / 3 / 4 tabs) — render from entitlements.
4. **"c." variation is missing** from the dashboard variation strip — confirm nothing is lost.
5. **MO-14b (Other income) has one field fewer than the SmartStart build** — a known,
   intentional divergence that still needs reconciling (`139:55884`).
6. The extraction recorded a few raw fills with no matching variable — pale-green income card,
   pale-pink expense card, dark-green icon circle, alert peach, disabled pale cyan. They map onto
   `status.success.bg`, `role.selectSubtle`, `status.success.dark`, `status.alert.bg` and
   `role.actionDisabled` respectively; **use the tokens**, and ask the designer to bind the
   Figma layers to the variables.
