# Page 18 — Money / Financial Tracking Flow

**Figma file:** `8s2xe3EyBRhrzDFy93NbfN`
**Page node:** `139:55673` — "Page 18"
**Extracted:** 2026-07-28
**Source metadata:** full page XML parsed from `node_139_55673.xml` (92 top-level nodes)

> **Note on assets:** this environment's egress proxy blocks `www.figma.com` (403 on CONNECT), so no
> PNG files could be written to disk. All screens below were rendered inline via
> `get_screenshot(enableBase64Response: true)` and transcribed by direct visual inspection.
> The **Figma node deep-link index** at the end replaces the asset index.

---

## 1. Page overview

Page 18 holds the complete **Money** (income & expense tracking / income statements) feature of the
ECD Connect practitioner app, plus a first-run **walkthrough/tutorial** overlay series that teaches
that feature.

Two generations of the feature live on the page:

| Series | Prefix | Region (canvas y) | Description |
|---|---|---|---|
| Current design | `WO7.x` | y ≈ 0 – 17 000 | Full money dashboard, add-income, add-expense, statements, info pages |
| Legacy / stipend-era design | `4.x` | y ≈ 17 588 – 19 000 | Older "Money screen" + "Add an amount" + "Add income" screens, used as the backdrop for the walkthrough tutorial cards |
| Pop-up spec strip | — | y ≈ 19 570 – 20 500 | "Preschool fees with no children" dialog spec |

**Counts:** 92 top-level nodes = 5 × `Header` band separators + 1 extra header, 17 `comment`
frames/free-text notes, and **~60 screen frames/instances** which dedupe to **28 unique screen
designs** (many screens are drawn 2–4× to show different fill states or list lengths).

Every screen is **360 × 640 dp** nominal (Android mdpi handset); taller frames (up to 1617 dp) are
scroll-extended artboards showing the full scrolling content of a 360×640 viewport.

Canvas layout convention: screens are laid out in horizontal rows, ~420 dp apart on x
(360 dp frame + 60 dp gutter), each row prefixed at x = 699 by a 360 × 640 `comment` frame that
labels the row. Rows are separated by 10 900 × 300 `Header` band instances.

---

## 2. Flow map

Reconstructed from the comment frames (which number the flows 1–5) and the left-to-right ordering
of screens within each row.

```
                            ┌─────────────────────────────────────────┐
                            │  WO7.4.0 Money dashboard  (139:55911)   │  ← app "Business" area,
                            │  Tabs: [Money] [Resources]              │    "Money" tab
                            │  states: empty / populated / profit /   │
                            │          2-month-loss                   │
                            └──┬────────────┬───────────────┬─────────┘
                               │            │               │
       FAB "+ Add income or expense"        │        "See all statements"
                               │            │               │
                               ▼            │               ▼
   ┌───────────────────────────────────┐    │   ┌──────────────────────────────────────┐
   │ WO7.1.1 Add an amount             │    │   │ WO7.3.0 View previous statements     │
   │ (139:56313) "What would you like  │    │   │ (139:56708 / 56959 / 57009)          │
   │  to record?"                      │    │   │ year groups → month rows + Profit/   │
   │  ● Income (money in)              │    │   │ Loss summary row                     │
   │  ● Expense (money out)            │    │   └───────────────┬──────────────────────┘
   └───────┬───────────────────┬───────┘    │                   │ tap a month
           │                   │            │                   ▼
           ▼                   ▼            │   ┌──────────────────────────────────────┐
 ┌────────────────────┐ ┌──────────────────┐│   │ WO7.3.1 One month view               │
 │ WO7.1.2 Add income │ │ WO7.2.1 Add      ││   │ (139:56762; blanks 56812/56862/57080)│
 │  - type (139:56346)│ │ expense - type   ││   │ income rows + Total income (green),  │
 │ 4 category rows    │ │ (139:56388)      ││   │ expense rows + Total expenses (pink),│
 │ each with [Add +]  │ │ 7 category rows  ││   │ Balance (slate) + [Download]         │
 └────────┬───────────┘ └────────┬─────────┘│   └───────────────┬──────────────────────┘
          │                      │          │                   │ tap Download
          ▼                      ▼          │                   ▼
 ┌──────────────────────┐ ┌────────────────┐│   ┌──────────────────────────────────────┐
 │ WO7.1.3 Preschool fee│ │ WO7.2.2 Rent   ││   │ WO7.3.1a Dialog - finalise download  │
 │  (57178 → 57191)     │ │ WO7.2.3 Salary ││   │ (139:56908)  "Are you sure…"         │
 │  2-step: pick month, │ │ WO7.2.4 Utils  ││   │ [Yes, download] [No, continue edit.] │
 │  then per-child R    │ │ WO7.2.5 Learn. ││   └──────────────────────────────────────┘
 │ WO7.1.4 Donations/   │ │ WO7.2.5 Food   ││                   │ tap a line item
 │  vouchers (56361)    │ │ WO7.2.6 Annual ││                   ▼
 │ WO7.1.5 DBE subsidy  │ │ WO7.2.7 Other  ││   ┌──────────────────────────────────────┐
 │  (56373)             │ └────────┬───────┘│   │ WO7.3.2 One line item view (139:56746)│
 │ WO7.1.6 Other (55897)│          │        │   └──────────────────────────────────────┘
 └────────┬─────────────┘          │        │
          └──────────┬─────────────┘        │  help "?" icon in app bar
                     │ Save                 └──────────────┐
                     ▼                                     ▼
          back to Money dashboard        ┌──────────────────────────────────────────┐
                                         │ WO7.5.0 General info page (139:57091)    │
                                         │  "Start walkthrough" / "Start tracking"  │
                                         └──────────────┬───────────────────────────┘
                                                        │ "Learn more" on loss banner
                                                        ▼
                                         ┌──────────────────────────────────────────┐
                                         │ WO7.5.1 Making a profit info (139:57125) │
                                         └──────────────────────────────────────────┘

  Walkthrough overlay track (legacy 4.x backdrops):
   5A.6.0a language picker (58735) → WO3.2.0a start dialog (57250) → tutorial cards stepping
   through 4.2 Add an amount (58595 → 57508) → 4.3 Add income (57626 → 57718 → 57806)
   → WO7.1.4 donations (58864) → 4.1.b Money screen summary (57894 → 58148)
   → 2.1.1 Children dashboard - playgroup (58389, last card)
```

### Flow numbering from the designer's own comment frames

1. **Adding income** (row at y ≈ 517)
2. **Adding expenses** (row at y ≈ 5104)
3. **View/download previous statements** (row at y ≈ 8052)
4. **Info screen — Screen on main "Money" page** (row at y ≈ 15905)
5. **Variations of money dashboard** (row at y ≈ 13965), sub-labelled a / b / d / e

---

## 3. Screen inventory

Sizes are the Figma frame dimensions; all screens target a 360 × 640 dp viewport, so heights > 640
denote scrollable content.

### WO7.4.0 — Money dashboard

| Node ID | Screen name | Size | Variant / state | Purpose |
|---|---|---|---|---|
| `139:56216` | WO7.4.0 Money dashboard - empty | 360 × 640 | empty / never-tracked | First-run state, piggy-bank illustration |
| `139:57090` | WO7.4.0 Money dashboard - empty | 360 × 640 | dup of 56216 (row 5a) | Variation strip copy |
| `139:55909` | WO7.4.0 Money dashboard | 360 × 640 | summary (row 5b) | Instance copy |
| `139:55910` | WO7.4.0 Money dashboard | 360 × 640 | summary (info row) | Instance copy |
| `139:56521` | WO7.4.0 Money dashboard | 360 × 640 | summary (statements row) | Entry point to statements |
| `139:56615` | WO7.4.0 Money dashboard | 360 × 640 | summary, "not tracked this month" probe | See free-text note 139:56206 |
| `139:55911` | WO7.4.0 Money dashboard | 360 × 836 | **2-month profit + celebratory card** | Most complete positive variant |
| `139:56009` | WO7.4.0 Money dashboard | 360 × 836 | profit, shorter celebratory card (120 dp) | Copy-length alternative |
| `139:56107` | WO7.4.0 Money dashboard - 2 month loss | 360 × 779 | **loss / alert state** | Most complete negative variant |
| `139:57177` | WO7.4.0 Money dashboard - 2 month loss | 360 × 779 | dup (info row) | Links to WO7.5.1 |

### WO7.1.x — Add income

| Node ID | Screen name | Size | Variant / state | Purpose |
|---|---|---|---|---|
| `139:56313` | WO7.1.1 Add an amount - income or expense | 360 × 640 | — | Income vs expense chooser |
| `139:56387` | WO7.1.1 Add an amount - income or expense | 360 × 640 | dup (expense row) | Same screen, expense row entry |
| `139:56346` | WO7.1.2 Add income - type | 360 × 654 | 4-item list | Income category picker |
| `139:58951` | WO7.1.2 Add income - type | 360 × 654 | dup (pop-up spec row) | Backdrop for preschool-fee dialog |
| `139:57178` | WO7.1.3 Income - preschool fee | 360 × 640 | **step 1 of 2** — class select cards | Choose class(es) |
| `139:58725` | WO7.1.3 Income - preschool fee | 360 × 640 | step 1, **informational/no-class** | Alt state |
| `139:57191` | WO7.1.3 Income - preschool fee | 360 × 1617 | **step 2 of 2**, multi-class, filled | Per-child amount entry |
| `139:57219` | WO7.1.3 Income - preschool fee | 360 × 1893 | symbol, "big class" | Long-list stress test |
| `139:58800` | WO7.1.3 Income - preschool fee | 360 × 1027 | edit/view of saved entry | With delete affordance |
| `139:58801` | WO7.1.3 Income - preschool fee | 360 × 1152 | edit, with `Alert` banner + `secondary` button | Edit-existing state |
| `139:56361` | WO7.1.4 Income - donations/vouchers | 360 × 640 | none selected | Detail form |
| `139:58556` / `139:58569` / `139:58582` | WO7.1.4 Income - donations/vouchers | 360 × 640 ea. | Item / Money / Voucher selected | Single-select states |
| `139:58864` | WO7.1.4 Income - donations/vouchers | 360 × 640 | walkthrough overlay backdrop | Tutorial step |
| `139:56373` | WO7.1.5 Income - subsidy | 360 × 763 | — | DBE subsidy form (extra fields) |
| `139:55897` | WO7.1.6 Income - other | 360 × 640 | — | Free-text income type |

### WO7.2.x — Add expense

| Node ID | Screen name | Size | Variant / state | Purpose |
|---|---|---|---|---|
| `139:56388` | WO7.2.1 Add expense - type | 360 × 898 | 7-item list | Expense category picker |
| `139:56408` | WO7.2.2 Expense - rent | 360 × 863 | **empty / Save disabled** | Rent detail form |
| `139:56423` | WO7.2.2 Expense - rent | 360 × 863 | **filled / Save enabled** | Filled-state pair |
| `139:56438` | WO7.2.3 Expense - salary & wages | 360 × 823 | empty | |
| `139:58845` | WO7.2.3 Expense - salary & wages | 360 × 906 | with extra `secondary` (delete) button | Edit-existing |
| `139:58831` | WO7.2.3 Expense - salary & wages | 360 × 855 | with `Alert` banner + `secondary` | Edit-existing, alert |
| `139:56452` | WO7.2.4 Expense - utilities | 360 × 828 | 2-line title | |
| `139:56466` | WO7.2.5 Expense - learning materials | 360 × 828 | | |
| `139:56480` | WO7.2.5 Expense - food | 360 × 783 | short info block | |
| `139:56494` | WO7.2.6 Expense - annual maintenance & purchases | 360 × 848 | 2-line title | |
| `139:56508` | WO7.2.7 Expense - other | 360 × 715 | no info block | Free-text expense type |

### WO7.3.x — Statements

| Node ID | Screen name | Size | Variant / state | Purpose |
|---|---|---|---|---|
| `139:56708` | WO7.3.0 View previous statements | 360 × 771 | 2 year groups (3 months each) | Statement index |
| `139:56959` | WO7.3.0 View previous statements | 360 × 1083 | 2 groups, 2nd expanded to 9 months | Longer list |
| `139:57009` | WO7.3.0 View previous statements | 360 × 1354 | 3 year groups | Longest list |
| `139:56762` | WO7.3.1 One month view previous statement | 360 × 993 | **fully populated** | Month statement |
| `139:56812` | WO7.3.1 … - income blank | 360 × 846 | income empty state | Empty-state pair |
| `139:56862` | WO7.3.1 … - expenses blank | 360 × 760 | expenses empty state | Empty-state pair |
| `139:57080` | WO7.3.1 … - blank | 360 × 640 | both blank | Full empty state |
| `139:56746` | WO7.3.2 One line item view | 360 × 771 | — | Drill-down to a single category |
| `139:56908` | WO7.3.1a Dialog - finalise download | 360 × 640 | modal over 56762 | Download confirmation |

### WO7.5.x — Info pages

| Node ID | Screen name | Size | Variant / state | Purpose |
|---|---|---|---|---|
| `139:57091` | WO7.5.0 General info page | 360 × 1250 | — | "What are income statements?" + walkthrough launcher |
| `139:57125` | WO7.5.1 Making a profit info page | 360 × 761 | — | 9-item ideas list |

### 4.x legacy money screens & walkthrough backdrops

| Node ID | Screen name | Size | Variant / state | Purpose |
|---|---|---|---|---|
| `139:57249` | 4.1.a Money screen - not started | 360 × 640 | empty | Legacy dashboard, tutorial start |
| `139:57894` | 4.1.b Money screen - summary of income/expenses | 360 × 640 | tutorial card 8 (highlights table) | |
| `139:58148` | 4.1.b Money screen - summary of income/expenses | 360 × 640 | tutorial card 8 (highlights button) | |
| `139:58595` | 4.2 Add an amount | 360 × 640 | tutorial card 2 (both rows) | |
| `139:57508` | 4.2 Add an amount | 360 × 640 | tutorial card 3 (income row only) | |
| `139:57626` | 4.3 Add income - not a stipend recipient | 360 × 640 | tutorial card 4 | |
| `139:57718` | 4.3 Add income - not a stipend recipient | 360 × 640 | tutorial card 5 | |
| `139:57806` | 4.3 Add income - not a stipend recipient | 360 × 640 | tutorial card 7 (form + save) | |
| `139:58389` | 2.1.1 Children dashboard - playgroup | 360 × 640 | tutorial card 11 (final) | End of walkthrough |

### Dialogs & overlays

| Node ID | Screen name | Size | Purpose |
|---|---|---|---|
| `139:56908` | WO7.3.1a Dialog - finalise download | 360 × 640 (card 328 × 353) | Confirm statement download |
| `139:57250` | WO3.2.0a Dialog - attendance walkthrough start | 360 × 640 (card 328 × 355) | Offer the walkthrough |
| `139:57344` | WO3.2.0a Dialog - attendance walkthrough start | 360 × 640 | Same + tutorial card 1 |
| `139:58735` | 5A.6.0a Dialog - walkthrough language picker | 360 × 640 (card 328 × 299) | Language before walkthrough |
| `139:58968` | dialog card - overlay | 328 × 378 | "No children yet" pop-up (tall) |
| `139:58969` | dialog card - overlay | 328 × 307 | "No children yet" pop-up (short) |

### Misc

| Node ID | Name | Size | Purpose |
|---|---|---|---|
| `139:58947` | Frame 704 | 328 × 182 | Loose component study: `Filled with icon` + `Alert` |
| `139:56211/56212/56213/56214/56215/57248/58950` | Header | 10 900 × 300 | Canvas row band separators |

---

## 4. Per-screen anatomy

Common geometry across every screen on this page:

- **Frame width** 360 dp. **Side margin** 16 dp → **content width 328 dp** (every card, button,
  form field and table is 328 dp wide at x = 16).
- **App bar** (`Title with subtitle` instance): 360 × 64 at y = 0.
- **`offline` chip** instance: 48 × 16 at x = 156, y = 80 (horizontally centred) — present on most
  screens as a connectivity indicator placeholder.
- **Tabs** (`Underline` / `Tabs`, or `Tabs - business`): 360 × 56 at y = 64, 1 dp bottom border.
  Two 180 dp tabs on the dashboard.
- **`Form Layout` footer**: 360 × 72, containing a `standard` divider at y = 0 and the primary
  button (328 × 40) at y = 16 → 16 dp above/below the button.
- **Form field vertical rhythm**: fields are 72 dp tall (or 92/96/108 with help text) and are
  spaced on an **88 dp pitch** (72 + 16 gap). Multi-line fields use 108 dp pitch.
- **FAB**: 247 × 48, pinned near x = 93, y = frame bottom − ~80.

### 4.1 WO7.4.0 Money dashboard — profit variant (`139:55911`, 360 × 836)

Top-to-bottom:

1. **App bar** (`Title with subtitle`, 360 × 64, y 0) — dark navy `#2A3B5C`-ish; white back arrow
   left, centred two-line title **"Business"** / subtitle **"Monday, 30 December"**, cyan circular
   **?** help icon top-right.
2. **Tabs** (`Underline` 360 × 56, y 64) — pale ice-blue `#EDF4F7` bar. Two 180 dp tabs:
   **"Money"** (active, cyan `#22B2D8` label + 3 dp cyan underline) and **"Resources"** (inactive,
   navy label). 1 dp bottom border (`Bottom border` 139:55917).
3. `offline` chip (139:55918) at 156, 80.
4. **Balance hero card** (`action item large sum` 139:55919, 328 × 72 at 16, 150) — solid **green**
   `#7BB929`, 8 dp radius. Left: 2-line white label **"December balance"** (16 dp regular).
   Right: **"+ R 100.25"** large white (~24 dp).
5. **Comparison table** (`Simple striped/Mobile` 139:55920, 328 × 197 at 16, 242) — 4 declared
   `Column` frames, effectively 3 rendered columns of 109.33 dp. Header row 40 dp with a cyan 1 dp
   `Divider` under it; column headers **"" / "NOV 2021" / "DEC 2021"** (12 dp uppercase grey).
   Body rows 52 dp, zebra-striped (white / `#EDF4F7`):
   - `Income` | `R 2 000.00` | `R 1 800.00`
   - `Expenses` | `R 2 700.00` | `R 1 700.00`
   - **`Balance`** (bold navy) | `+ R 300.10` | `+ R 100.25` — both green.
6. **Celebratory card** (`Celebratory` 139:56008, 328 × 172 at 16, 459) — green `#7BB929`, 8 dp
   radius, white dismiss **✕** top-right. Yellow star-eyed emoji circle (~48 dp) at left.
   Bold white headline **"Great job! You have made a profit for 2 months in a row!"** then body
   **"You had R 400.35 left over for Nov & Dec combined."**
   (`139:56009` is the same screen with a 120 dp version of this card — shorter copy.)
7. **Actions** (139:56005, 328 × 40 at 16, 651) — full-width cyan `#22B2D8` pill button
   (`primary with icon` 139:56006) with a statement/document glyph + **"See all statements"**.
8. **FAB** (139:56007, 247 × 48 at 93, 755) — cyan extended FAB, white **+** icon,
   **"Add income or expense"**.

**States:** empty (`139:56216`), profit (`139:55911` / `139:56009`), loss (`139:56107`).

### 4.2 WO7.4.0 Money dashboard — empty (`139:56216`, 360 × 640)

1. App bar "Business" / "Monday, 7 December", back arrow, ? icon.
2. Tabs bar — **three** tabs here: `Staff`, **`Money`** (active, cyan), `Resources`.
   (The `WO7.4.0` frames above show only 2 tabs — Money / Resources.)
3. Large empty-state illustration centred at ~y 165: cyan circle (~110 dp) containing a pink
   piggy bank with gold coins.
4. Headline, navy, centred, 20 dp semi-bold, 2 lines:
   **"You don't have any income statements yet!"**
5. Sub-copy, grey, centred, 14 dp, 2 lines:
   **"Tap "Add income or expense" to get started"**
6. Large white gap (no table, no statements button).
7. FAB **"+ Add income or expense"** bottom-right (247 × 48).

### 4.3 WO7.4.0 Money dashboard — 2 month loss (`139:56107`, 360 × 779)

Identical skeleton to 4.1, with these deltas:

- **Balance hero card** is **magenta/pink** `#F5186E` instead of green, showing **"- R 100.20"**.
- Table balance row values are **red** `#E5342A`: `- R 700.00`, `- R 100.00`.
- In place of the green celebratory card sits an **alert card**: pale peach background
  `#FDEDE4`, 8 dp radius, orange filled ⚠/! circle icon top-left, dark navy **✕** top-right.
  Bold orange body text:
  **"Over the past two months, you have made less money than you have earned. This means your
  business is running at a loss."**
  Below it a small cyan pill button **"Learn more"** (→ WO7.5.1 Making a profit info page).
- Then the cyan **"See all statements"** button and the **"+ Add income or expense"** FAB.

> Copy bug worth flagging: the alert says "made less money than you have earned", which reads
> incorrectly — presumably should be "spent more money than you have earned".

### 4.4 WO7.1.1 Add an amount — income or expense (`139:56313`, 360 × 640)

1. App bar, navy, back arrow + centred single-line title **"Add an amount"** (no subtitle, no ? icon).
2. Page title, navy, 20 dp semi-bold, at 16 dp left margin, y ≈ 88:
   **"What would you like to record?"**
3. Two 328 dp selection cards, 8 dp radius, ~92 dp tall, 16 dp apart:
   - **Income card** — pale green `#E4EFD2` background. Left: 48 dp dark-green `#5D9B1E` circle
     with a white inbound-arrow-into-tray icon. Title bold navy **"Income (money in)"**;
     subtitle grey 3 lines **"Preschool fees, donations, DBE subsidy & others"**; navy
     chevron-right at the far right.
   - **Expense card** — pale pink `#FBD7E4` background. 48 dp magenta `#F5186E` circle with a
     white outbound-arrow-from-tray icon. Title **"Expense (money out)"**; subtitle
     **"Rent, utilities, food, educational supplies & others"**; chevron-right.
4. Remaining ~300 dp of the screen is empty white — no footer button (selection is immediate).

### 4.5 WO7.1.2 Add income - type (`139:56346`, 360 × 654)

1. App bar navy, back arrow, title **"Add income (money in)"**. `offline` chip at 156, 80.
2. `Page Title` instance (139:56360, 360 × 33 at y 79) — navy 20 dp **"Add your income"**.
3. `Frame 420` label (139:56351, 328 × 23 at 16, 142) — navy 16 dp
   **"What type of money came in?"**
4. `Action with icons` list (139:56353, 328 × 308 at 16, 190) — four ~77 dp rows separated by
   **dashed** 1 dp grey rules (top rule above the first row too). Each row:
   - Left column: bold navy title + grey 14 dp subtitle.
   - Right: a small cyan `Add +` pill button (~60 × 32).

   | Title | Subtitle |
   |---|---|
   | Preschool fees | Caregiver contributions |
   | Donations or vouchers | Fundraising contributions |
   | DBE subsidy | Department of Basic Education |
   | Other | Add your own income type |
5. `Informational 3` block (139:56359, 328 × 120 at 16, 514) — pale blue `#E8F1FD` card, 8 dp
   radius, blue ⓘ circle icon top-left, bold blue body:
   **"If you don't see the income type you want to add above, use the "Other" type to add your own."**
   then a bulleted line **"• For example: business grants."**

### 4.6 WO7.2.1 Add expense - type (`139:56388`, 360 × 898)

Same anatomy as 4.5 but with a **7-row** list (`Frame 415` 139:56396, 328 × 559 at 16, 88 within
`Frame 404` at y 79):

1. App bar title **"Add expense (money out)"**.
2. Page title **"Add an expense"**.
3. Label **"What did you pay for?"**
4. Dashed-separated rows, each with a cyan `Add +` pill:

   | Title | Subtitle |
   |---|---|
   | Rent | Cost for using programme venue |
   | Utilities (electricity, water… (truncated with ellipsis) | Incl. airtime, data, insurance |
   | Salary & wages | For all staff, incl. your salary |
   | Food | Programme meals & snacks |
   | Learning materials | Books, toys, copying, etc. |
   | Annual maintenance & pu… (truncated) | Paint for building, new gate, etc. |
   | Other | Add your own expense type |
5. `Informational 3` (139:56406, 328 × 140 at 16, 663) — pale blue, ⓘ icon:
   **"If you don't see the expense type you want to add above, use the "Other" type to add your own."**
   **"• For example: cost of training for staff, transport, or other items."**

Row pitch here is ~77 dp (row 56–60 dp + dashed divider + padding); the list is 559 dp for 7 rows.

### 4.7 WO7.2.2 Expense - rent (`139:56408` empty / `139:56423` filled, 360 × 863)

The canonical **expense detail form**. All expense detail screens share this template.

1. App bar navy, back arrow, **"Add rent"**. `offline` chip 156, 80.
2. `Form Layout` (139:56411) starts at y 78; `Page Title` 328 × 33 at 16, 0 → navy 20 dp **"Rent"**.
3. `Informational 2` (139:56415, 328 × 132 at 16, 49) — pale blue `#E8F1FD` card with blue ⓘ icon
   and bold blue 5-line body:
   **"The cost for using your programme venue. This could be a venue you rent for the programme or
   a share of your home rental if you are running your programme from home."**
4. **Date field** — label navy 16 dp **"When did you pay?"**; `Filled with icon` input
   (139:56416, 328 × 72 at 16, 197): ice-blue `#EDF4F7` fill, navy value **"Mon, 5 July 2021"**,
   navy calendar icon on the right.
5. **Amount field** — label **"How much did you pay?"**; `inactive` input (139:56417, 328 × 72 at
   16, 285): ice-blue fill, grey placeholder **"e.g. R 500.00"**.
   In the filled variant `139:56423` this becomes a `filled` instance.
6. **Note field** — label **"Add a description or note"** with grey sub-label **"Optional"**;
   `inactive help text` input (139:56418, 328 × 96 at 16, 373), placeholder
   **"e.g. Paid for two months"**.
7. **Photo upload** — label **"Upload a photo of invoice or receipt"** + **"Optional"**;
   `Form Photo` (139:56419, 328 × 212 at 16, 485): ice-blue panel with a **dashed grey border**,
   centred 56 dp magenta `#F5186E` circle with a white camera icon, grey caption **"Tap to add"**.
8. Footer `Form Layout` (139:56420, 360 × 72 at y 713): `standard` divider, then the save button
   (328 × 40 at 16, 16).
   - **`139:56408`** uses `primary disabled with icon` — pale cyan `#C9EAF4` fill, white text
     **"Save"** with a save/floppy glyph → disabled.
   - **`139:56423`** uses `primary with icon` — solid cyan, enabled.

**Sibling expense forms** reuse this exactly, differing only in the info-block height and title:

| Node | Title / app bar | `Informational 2` height | Notes |
|---|---|---|---|
| `139:56438` Salary & wages | 1-line page title | 92 | "For all staff, incl. your salary" |
| `139:56452` Utilities | **2-line** page title (Page Title 328 × 58) | 72 | |
| `139:56466` Learning materials | 1-line | 92 | |
| `139:56480` Food | 1-line | 52 | shortest info copy |
| `139:56494` Annual maintenance & purchases | **2-line** | 92 | |
| `139:56508` Other | 1-line | **no info block** | fields start at y 49 |

### 4.8 WO7.1.4 Income - donations/vouchers (`139:56361`, 360 × 640)

The canonical **income detail form** (single-select variant).

1. App bar **"Add donations or vouchers"**.
2. `Page Title` navy 20 dp **"Donations or vouchers"** (y 79 + 8).
3. **Date field** — label **"When did you get this donation/voucher?"**; `Filled with icon`
   (139:56367, 328 × 72 at 16, 49 inside a Form Layout starting at y 79): ice-blue,
   **"Mon, 5 July 2021"**, calendar icon.
4. **Single-select group** (`Next buttons/Label & single-select` 139:56368, 328 × 108 at 16, 137):
   3-line navy label
   **"Was the donation an item like groceries or toys, money, or a voucher for a particular shop?"**
   then three pale-pink `#FBD7E4` pill chips with magenta `#F5186E` labels, evenly filling 328 dp:
   **`Item`** | **`Money`** | **`Voucher`**.
   Variants `139:58556` / `139:58569` / `139:58582` show each of the three selected in turn.
5. **Note field** — label **"Add a note"** + **"Optional"**; `inactive help text`
   (139:56369, 328 × 96 at 16, 261), placeholder **"e.g. Food donation from local shop"**.
6. Footer: divider + `primary disabled with icon` **"Save"** (pale cyan, disabled) at 16, 16 of a
   360 × 72 Form Layout at y 451.
7. ~150 dp of empty white below the footer (the form is short).

Note: no photo-upload block on income forms — that is expense-only.

### 4.9 WO7.1.5 Income - subsidy (`139:56373`, 360 × 763)

Same template as 4.8 plus one extra field:
`Page Title` → `Informational 4` (328 × 132) → `Filled with icon` date (72) →
`inactive` (92) → `inactive` (92) → `inactive help text` (96) → footer.
So: info block, date, **two** further inputs, then the optional note.

### 4.10 WO7.1.6 Income - other (`139:55897`, 360 × 640)

Shortest income form. `Form Layout` starts unusually low at y 461 (drawn as an overlay study):
`Page Title` → `inactive help text` (96) → `inactive` (92) → `Filled with icon` (72) →
`Page Title` label → footer with `primary disabled with icon`.
Comment frame `139:55883` beside it reads: *"Other (removed a field here - the SmartStart version
needs to be updated to match)"*.

### 4.11 WO7.1.3 Income - preschool fee (2-step)

**Step 1 — class picker (`139:57178`, 360 × 640)**
1. App bar **"Add preschool fees"** with subtitle (step indicator).
2. `Page Title` at y 79.
3. `Form Layout` at y 142: a 2-line `Title` text (328 × 46) then `Group 350` holding **three
   `Select card` instances**, 328 × 56 each on a 60 dp pitch (y 62 / 122 / 182) — one per class.
4. Footer: divider + `primary disabled with icon`.

**Step 1 alt (`139:58725`, 360 × 640)** — same, but the class list is replaced by a single
`Informational` block (328 × 72). Used when there is nothing to select.

**Step 2 — per-child amounts (`139:57191`, 360 × 1617)**
1. App bar navy: title **"Add preschool fees"**, subtitle **"step 2 of 2"**.
2. `Page Title` **"Preschool fees"** (navy 20 dp).
3. Section label **"How much did each caregiver pay?"** then a **dashed** 1 dp rule
   (`dashed` 139:57196 at 16, 39).
4. **Month dropdown** (`Filled with icon` 139:57197, 328 × 92 at 16, 56): label
   **"Which month would you like to add fees for?"** over an ice-blue select showing grey
   placeholder **"Tap to choose month"** with a navy chevron-down. Followed by another dashed rule.
5. **Class group 1** — grey `Title` **"Elephants Class"** at 16, 181, then **eight** `filled`
   inputs (328 × 72) on an **88 dp pitch** (y 217, 305, 393, 481, 569, 657, 745, 833). Each input
   is captioned above with the child's name and shows the ice-blue field with bold **"R"** prefix
   and value **0**:
   Alexander Hamilton, Amahle Khumalo, Hope Mokoena, Lethabo Nkosi, Monwabisi Dasie,
   Palesa Ndlovu, Philip Hamilton, Themba Sibiya.
6. Dashed rule, then **Class group 2** — `Title` **"Lions Class"** at 16, 938, then **five**
   `filled` inputs at y 974 / 1062 / 1150 / 1238 / 1326: Aaron Burr, Angelica Schuyler,
   Bulelwa Mahlangu, Cynthia Jacobs, Thandile Dlamini.
7. Footer `Form Layout` at y 1545: divider + `primary disabled with icon` **"Save"** (pale cyan).

Designer note `139:58863` sits directly above this frame: *"If multiple classes selected, show
class title & divider between each"*. `139:57219` (symbol, 360 × 1893) is the same screen with a
larger class, annotated *"Just showing what a big class looks like"* (`139:58862`).

**Edit-existing states** — `139:58800` (360 × 1027) and `139:58801` (360 × 1152). `139:58801`
opens with an `Alert` instance (328 × 112 at 16, 0 of the Form Layout), then title, dashed rule,
`Filled with icon` (92), a section `Title`, and a long run of `filled` inputs on the same 88 dp
pitch; its footer button is a **`secondary`** (outlined) rather than primary. Note `139:58860`
next to this row: *"and so on for all income & expenses... ONLY the preschool fees item does not
include a delete button."*

### 4.12 WO7.3.0 View previous statements (`139:56708`, 360 × 771)

1. App bar navy, back arrow, **2-line** centred title **"View & download previous statements"**.
   `offline` chip at 156, 80.
2. `Page Title` instance (139:56745, 360 × 58 at y 79) — navy 20 dp, 2 lines:
   **"Choose a statement to view and download"**.
3. `Form Layout` from y 157. Repeating **year group** pattern, each group = `Page Title`
   (328 × 31) + `Action with icons` list (328 × 208):
   - **Group heading** navy 16 dp: **"2022"**.
   - Three `action item with amount and icon` rows, 52 dp each, ice-blue `#EDF4F7` fill with 1 dp
     white/grey separators (`full width` dividers): **"March 2022"**, **"February 2022"**,
     **"January 2022"**, each with a navy chevron-right.
   - A closing `action item with amount` summary row, 52 dp, **magenta `#F5186E`** with white
     text: left **"Loss"**, right **"- R 200"**.
   - **Group heading "2021"**, rows **"December 2021"**, **"November 2021"**, **"October 2021"**,
     then a **green `#7BB929`** summary row: **"Profit"** / **"+ R 2 000"**.
4. Footer `Form Layout` (139:56742, 360 × 72 at y 542): divider + cyan `primary with icon`
   **"See more statements"** with a document glyph.

Group heading `Page Title` frames sit at y 0 and y 271 within the Form Layout → **271 dp group
pitch** for a 3-row group (31 heading + 16 gap + 208 list + 16 gap).

Longer variants: `139:56959` (second group expanded to a 520 dp / 9-row list) and `139:57009`
(three groups, 1509 dp of content).

### 4.13 WO7.3.1 One month view previous statement (`139:56762`, 360 × 993)

1. App bar navy: title **"View December statement"**, subtitle **"Monday, 30 December"**.
2. `Page Title` navy 20 dp **"December 2021"**.
3. **Income block** (`Action with icons`, 328 × 281) — four 56 dp `action item with amount and
   icon` rows on ice-blue, separated by 1 dp `Vector` rules, each showing category (navy, left),
   amount (navy, right-aligned before the chevron), chevron-right:
   | Preschool fees | R 202.52 |
   | DBE subsidy | R 800.42 |
   | Donations or v… (truncated) | R 200.54 |
   | Other | R 200.30 |
   Closed by an `action item with amount` **total row**, 56 dp, **green `#7BB929`**, white text:
   **"Total income"** / **"R 1 800.11"**. A `dashed` 1 dp rule follows.
4. **Expense block** (`Action with icons`, 328 × 392) — seven 56 dp rows:
   | Rent | R 800.00 |
   | Salary & wages | R 400.00 |
   | Electricity, wat… | R 100.12 |
   | Learning mater… | R 200.45 |
   | Cleaning mater… | R 100.55 |
   | Food | R 200.60 |
   Closed by a **magenta `#F5186E`** total row: **"Total expenses"** / **"- R 1 700.20"**.
5. **Balance card** (`action item large sum`, 328 × 64) — **slate grey-blue `#5E6B87`**, 8 dp
   radius: white **"Balance"** left, large white **"+ R 99.91"** right.
6. Footer: divider + cyan `primary with icon` **"Download"** with a download-arrow glyph.

Long category names truncate with an ellipsis rather than wrapping.

**Blank variants:** `139:56812` (income blank), `139:56862` (expenses blank), `139:57080` (both
blank). The blank ones swap the row list for an **`Action panel statements`** instance
(328 × 130 for income, 328 × 155 for expenses) — an empty-state panel — while keeping the
`action item large sum` balance card. `139:57080` is exactly:
`Page Title` → `Action panel statements` (130) at y 49 → `Action panel statements` (155) at
y 199 → `action item large sum` (64) at y 374, no footer button.

Comment `139:55891` labels this group: *"Empty states — If practitioner has not logged any income
and/or expenses"*.

### 4.14 WO7.3.2 One line item view (`139:56746`, 360 × 771)

Drill-down from a statement row. App bar + `Page Title` (360 × 53 at y 79), then a single
`Action with icons` list at 16, 157 of 328 × 164: two 56 dp `action item with amount and icon`
rows and a closing 52 dp `action item with amount` total row. No footer button.

### 4.15 WO7.5.0 General info page (`139:57091`, 360 × 1250)

1. App bar navy: back arrow left, centred title **"Income statements"**, white **✕** top-right
   (dismissable modal page rather than a pushed screen).
2. **Language selector strip** (`Language selector` 139:57094, 360 × 74 at y 64) — pale ice-blue
   band: grey 16 dp label **"Change Language:"** at x 16, and a cyan `filtered` dropdown chip
   (100 × 40) reading **"English"** with a white chevron-down. 1 dp `full width` divider beneath.
3. **Walkthrough launcher card** (`Content` 139:57099 → `with link` 139:57101, 328 × 200 at 16,
   ~164) — pale ice-blue card with soft shadow, 8 dp radius:
   - Navy bold 20 dp 2-line heading **"How to use income statements on AppName"**
   - Grey body **"Tap the button below to see how to use this part of AppName"**
   - Full-width cyan pill button with white ➜-in-circle icon: **"Start walkthrough"**.
4. **Body `Content`** (139:57102, 360 × 798 from y 380) with 16 dp side margins:
   - `standard` divider at y 16.
   - Navy bold 20 dp 2-line heading (139:57105): **"Manage your business like a boss!"**
   - Navy bold 16 dp subhead (139:57107): **"What are income statements?"**
     Grey body (139:57108): **"Income statements help you keep track of all the money you receive
     and spend."**
   - Navy bold subhead (139:57109, 2 lines): **"How can you create income statements on AppName?"**
   - Grey body (139:57110, 320 × 360, two paragraphs):
     **"Each time you spend money, come to the "Money" section of AppName and tap the "Add income
     or expense" button. Choose "Expenses (money out)", then choose an expense type, fill in the
     details, and take a photo of the receipt. Once you tap save, that amount will be added to your
     statement."**
     **"Each time you get money for your programme, tap the "Add income or expense" button and
     choose "Income (money in)". Choose the income type and fill in the details. Once you tap save,
     that amount will be added to your statement."**
   - Navy bold subhead (139:57112): **"What are income and expenses?"** followed by two
     `Alerts/List item` rows (328 × 60 each, 68 dp pitch), rendered as navy bullets:
     • **"Income** is all the money that you receive in your business. For example: fees, stipends
     and donations."
     • **"Expenses** are all of the things you spend money on to keep your business running. For
     example: rent, food and airtime."
     (A `small primary leading icon` instance 139:57121, 124 × 32, is layered here.)
5. Footer `Form Layout` (139:57122, 360 × 72 at y 1178): divider + full-width cyan `primary`
   button **"Start tracking"**.

### 4.16 WO7.5.1 Making a profit info page (`139:57125`, 360 × 761)

1. App bar navy: back arrow, title **"Ideas for making a profit"**, ✕ top-right.
2. Same **Language selector** strip (cyan "English" dropdown).
3. `Content` (139:57133) from y 138: `standard` divider, then navy bold 16 dp heading
   **"Ideas for making a profit"** and **nine `Alerts/List item` bullets** (328 dp wide, 40 or
   60 dp tall depending on wrap, 48 dp pitch — y 30, 78, 146, 214, 262, 310, 358, 386, 454):
   - Try to get more fees and contributions from caregivers.
   - Talk to parents about the importance of early learning and convince them to make this
     investment in their children.
   - If caregivers can't contribute money, ask them to donate food or other items, or to volunteer
     their time cleaning or cooking.
   - Apply to get your site registered with the DBE
   - Fundraise for discounted groceries or stationary
   - Ask for donations of books, toys and other classroom resources
   - Start a vegetable garden
   - Apply to organisations that support ECD, such as DoMore Foundation, Umncedi, Rotary etc
   - Raise funds through a community event, such as a cake sale or a dress-up day
4. Footer: divider + cyan `primary with icon` button with a white **✕** glyph: **"Close"**.

Note the typo carried in the design copy: **"stationary"** (should be "stationery").

### 4.17 4.1.b Money screen — summary of income/expenses (`139:57894`, 360 × 640)

Legacy dashboard, shown as the backdrop of walkthrough card 8. Structure (`Group 354`, offset
y −64 so the app bar sits above the viewport):

1. `Tabs - business` instance (360 × 56) — three tabs **Staff** / **Money** (active, cyan with
   cyan underline) / **Resources**, on a **dimmed slate** scrim (the whole backdrop is dimmed by
   `Rectangle 1`, 360 × 640 semi-opaque `#5E6B87`).
2. `action item large sum` (328 × 72) — balance card, **slate `#5E6B87`** in this dimmed render:
   **"December balance"** / **"+ R 100.25"**.
3. `Simple striped/Mobile` table (328 × 197) — same 3-column comparison table as WO7.4.0:
   headers ` ` / **NOV 2021** / **DEC 2021**; rows `Income` `+ R 2 300.10` `+ R 1 800.00`;
   `Expenses` `- R 2 000.00` `- R 1 700.00`; **`Balance`** `+ R 300.10` `+ R 100.00` in green.
   Note the legacy table **signs the income and expense values** (`+` / `-`), which WO7.4.0 drops.
4. `Actions` → `primary with icon` **"See all statements"** (dimmed).
5. `FAB` 247 × 48.
6. **Walkthrough spotlight:** `Group 355` (346 × 307 at 7, 75) is a `dialog card - tutorial`
   cut-out that re-renders the balance card + table **undimmed** inside a 4 dp **magenta
   `#FF2180`** rounded outline — the spotlight ring.
7. **Tutorial card 2** (139:57991, 328 × 168 at 16, 457) — white card, 8 dp radius:
   80 dp circular robot mascot avatar left, navy 16 dp body right
   **"Great! Your income has now been added to the summary income statement on the money tab"**,
   a 10-dot progress indicator along the bottom left (dots 10 dp, 14 dp pitch, active dot is a
   20 × 10 magenta pill — here at position 8), and a cyan `small primary leading icon` pill
   **"Next"** (with a ➜-in-circle glyph) bottom-right.

`139:58148` is the same screen with the spotlight moved to the **"See all statements"** button
(`Group 356`, 346 × 58 at 7, 382).

### 4.18 4.2 Add an amount (`139:58595`, 360 × 640)

Walkthrough step over the income/expense chooser:

- Backdrop = the `Add an amount` screen (dimmed navy app bar, dimmed title
  **"What would you like to record?"**).
- Spotlight `dialog card - tutorial` (346 × 218 at 7, 129) re-renders **both** selection cards
  undimmed inside a magenta outline (`Group 352` with two `action icon with badge` frames,
  328 × 92 each on a 108 dp pitch).
- Tutorial card 2 body: **"You can choose whether you want to add income or expenses to your
  income statement"** — progress dot 2 of 11, `Next` pill.
- A vector "hand/arrow" pointer (`Icon` 139:57625, 30.8 × 39.2) points from the card at the
  spotlight in the sibling `139:57508`.

`139:57508` narrows the spotlight to only the **Income** row (`dialog card - tutorial`
346 × 110 at 7, 129 with one `action icon with badge`) and advances the progress dot to 3.

### 4.19 4.3 Add income - not a stipend recipient (`139:57626` / `139:57718` / `139:57806`)

Three consecutive walkthrough steps over a legacy income-type screen:

- `139:57626` — backdrop `Frame 404` with a `Frame 420` label, an `Action with icons` list
  (328 × 231 = three 77 dp `large title with action` rows) and an `Informational 3` block
  (328 × 120). Spotlight `dialog card - tutorial` (346 × 239 at 7, 188) covers the whole list;
  progress dot 4; tutorial card includes a `small primary leading icon` **Next** pill.
- `139:57718` — spotlight narrowed to a **single** `large title with action` row
  (`Group 357`, 346 × 79 at 7, 266); progress dot 5.
- `139:57806` — backdrop is now the **detail form** (`Page Title`, `Filled with icon` 72,
  `Next buttons/Label & single-select` 108, `inactive` 72, `inactive help text` 96, then footer
  `primary disabled with icon`). Spotlight (`dialog card - tutorial` 346 × 58 at 7, 323) sits on
  the **`primary with icon` Save button**; progress dot 7.

### 4.20 2.1.1 Children dashboard - playgroup (`139:58389`, 360 × 640)

Final walkthrough step. Same dimmed money-screen backdrop as 4.17, but with **`Tutorial card 5`**
(139:58486, 328 × 168 at 16, 457) and the progress pill at the **last** position (dot 11,
`Rectangle 18051` at x 156). No spotlight cut-out — the walkthrough is finished.

---

## 5. Dialogs & pop-ups

### 5.1 WO7.3.1a Dialog — finalise download (`139:56908`, 360 × 640)

Full anatomy:

- **Backdrop:** the fully-populated one-month statement (`139:56762` content re-drawn inline —
  income block, expense block, balance card, Download button), covered by `Rectangle 1`
  (139:56957, 360 × 993) — a **semi-opaque slate `#5E6B87` scrim** at ~70 % that darkens the app
  bar and page too.
- **Card** (`dialog card - overlay` 139:56958, **328 × 353 at x 16, y 144**) — white, ~12 dp
  radius, drop shadow. Centred content, ~24 dp internal padding:
  1. **Orange filled circle icon** (~44 dp) with a white exclamation mark, centred at the top.
  2. **Headline** navy `#27385A`, Quicksand SemiBold ~20 dp, centred, 3 lines:
     **"Are you sure you want to download your December statement?"**
  3. **Body** grey `#65727A`, Inter 14–16 dp, centred, 2 lines:
     **"You will not be able to edit the statement after downloading."**
  4. **Primary action** — full-width (296 dp) cyan `#1DBADF` pill, 40 dp tall, white download-arrow
     glyph + **"Yes, download"**.
  5. **Secondary action** — full-width outlined pill, white fill, 1–2 dp cyan border, cyan pencil
     glyph + cyan label **"No, continue editing"**. 16 dp below the primary.

Two comment frames bracket this dialog on the canvas: `139:56207` *"Before income statement is
downloaded. ⬇️"* (above) and `139:56209` *"After statement is downloaded ⬇️"* (below).

### 5.2 WO3.2.0a Dialog — attendance walkthrough start (`139:57250`, 360 × 640)

- **Backdrop:** the empty money dashboard (app bar "Business" / "Monday, 7 December", tabs
  Money / Resources, FAB "+ Add income or expense"), covered by `Rectangle 1` (139:57342,
  360 × 640) — slate scrim.
- **Card** (`dialog card - tutorial` 139:57343, **328 × 355 at 16, 110**) — white, 12 dp radius:
  1. Circular **robot mascot** illustration ~108 dp (`Frame 'c'` 139:57260, 108 × 108 at 126, 48)
     — dark navy circle, orange/yellow robot with green antenna lights and a magenta heart.
  2. Navy Quicksand SemiBold ~20 dp headline, centred:
     **"Manage your business like a boss!"**
  3. Grey Inter 16 dp body, centred, 2 lines:
     **"Would you like to see how to create your income statements?"**
  4. **Primary** cyan pill 296 × 40 with a white ✓-in-circle glyph: **"Yes, help me!"**
  5. **Secondary** outlined cyan pill 296 × 40 with a cyan clock glyph: **"No, skip"**.

`139:57344` is the same dialog followed by **Tutorial card 1** (`Tutorial card 2` 139:57436,
328 × 168 at 16, 457) plus a spotlight ring on the FAB (`dialog card - tutorial` 139:57505,
266 × 67 at 94, 319) and the hand/arrow pointer vector (139:57507).

### 5.3 5A.6.0a Dialog — walkthrough language picker (`139:58735`, 360 × 640)

- **Backdrop:** plain slate `#5E6B87` (`Rectangle 1` 139:58736, 360 × 640) — no app content behind.
- **Card** (`dialog card - tutorial` 139:58737, **328 × 299 at 16, 171**) — white, 12 dp radius,
  drop shadow. `Leading content` frame 296 × 195 at 16, 24:
  1. 100 dp circular **yellow robot mascot** avatar (`Mask group` 139:58739 at 98, 0 — centred).
  2. Navy Quicksand SemiBold 20 dp centred **"Which language should I use?"** (`Text` 139:58794,
     296 × 23 at y 112).
  3. `Filled` select (139:58797, **296 × 48** at y 147) — ice-blue `#EFF6FA` field, navy value
     **"English"**, navy chevron-down right.
  4. `primary with icon` (139:58798, 296 × 40 at 16, 235) — cyan pill, white ➜-in-circle glyph,
     **"Start"**.
  5. `secondary with icon` (139:58799, 296 × 40 at 16, 291) — the second button is drawn but
     clipped by the 299 dp card height in this render.

Internal card metrics: 16 dp horizontal padding (328 − 2 × 16 = 296 content), 24 dp top padding,
16 dp gap between the two footer buttons (235 → 291 = 56 pitch for 40 dp buttons).

### 5.4 dialog card - overlay — "You need to add children first" (`139:58968` 328 × 378 /
`139:58969` 328 × 307)

Spec'd on the bottom strip of the page next to comment `139:58966`. The two instances are the
same dialog at two copy lengths.

- White card, 12 dp radius, drop shadow, 328 dp wide.
- **Orange filled circle** (~44 dp) with a white **!** centred at the top.
- Headline navy Quicksand SemiBold 20 dp, centred, 2 lines:
  **"Oops! You need to add children first!"**
- Body grey `#65727A`, centred, 4 lines:
  **"You need to register children before adding fees. Tap below or go to Classroom > choose/add a
  class > See children > Add a child."**
- **Primary** cyan pill, white **+**-in-circle glyph: **"Add a child"**.
- **Secondary** outlined cyan pill, cyan **✕** glyph, cyan label: **"Close"**.

Trigger (from `139:58967`): tapping **"Preschool fees"** on WO7.1.2 when the site has no children
registered. The backdrop for the spec is `139:58951` (a duplicate of WO7.1.2 Add income - type).

---

## 6. Patterns

**P1 — Screen chrome.** Every screen = `Title with subtitle` app bar (360 × 64, navy `#27385A`,
white back arrow at left, centred 1- or 2-line title, optional trailing cyan **?** or white **✕**)
→ optional `Tabs` (360 × 56, y 64, ice-blue `#EFF6FA`, cyan active label + underline, 1 dp bottom
border) → content at 16 dp margins → optional `Form Layout` footer (360 × 72 = `standard` divider
+ 328 × 40 button at 16 dp inset).

**P2 — 328 dp content column.** Literally every content element on this page is 328 dp wide at
x = 16. There are no other content widths.

**P3 — Form layout.** `Page Title` (navy 20 dp Quicksand SemiBold) → optional
`Informational N` block (pale blue `#EBF3FF`, ⓘ icon, bold blue copy) → labelled inputs. Inputs
are `Filled with icon` (72 dp, has a value + trailing icon), `filled` (72 dp, value),
`inactive` (72 dp, placeholder), `inactive help text` (96 dp, placeholder + sub-label like
"Optional"), `Next buttons/Label & single-select` (108 dp, label + chip row). Field pitch is
88 dp (72 + 16) or 108 dp for the taller variants. Expense forms end with `Form Photo`
(328 × 212, dashed border, magenta camera circle, "Tap to add"). Footer button is
`primary disabled with icon` (pale cyan `#C9EAF4`) until required fields are filled, then
`primary with icon` (solid cyan `#1DBADF`).

**P4 — Category list item.** Used for both income and expense type pickers
(`Action with icons` + rows): bold navy title, grey subtitle, **dashed** 1 dp separator above and
between rows, and a small cyan **`Add +`** pill on the right. Long titles truncate with "…".

**P5 — Summary comparison table** (`Simple striped/Mobile`). 328 × 197, 3 rendered columns of
109.33 dp, a 40 dp header row with 12 dp uppercase letter-spaced grey labels and a cyan 1 dp
divider, then 52 dp zebra rows (white / `#EFF6FA`). Last row `Balance` is bold and colour-coded:
green `#83BB26` positive, red/magenta negative.

**P6 — Statement rows** (`action item with amount and icon`). 52 dp in list screens, 56 dp in
month views. Ice-blue `#EFF6FA` fill, navy label left, navy amount right, navy chevron-right,
1 dp separators. Each block terminates in an `action item with amount` **coloured summary row** of
the same height: green `#83BB26` for income/profit totals, magenta `#FF2180` for expense/loss
totals. Group-level balances use `action item large sum` on **slate `#52607B`** with a larger
number.

**P7 — Hero sum card** (`action item large sum`, 328 × 72 / × 64). Label left over two lines,
large amount right. Semantic fill: green = profit, magenta = loss, slate = neutral balance.

**P8 — Status banners.** Positive → `Celebratory` (green card, emoji circle, white ✕ dismiss).
Negative → alert card (peach `#FDEDE4`, orange ! circle, bold orange copy, navy ✕, small cyan
"Learn more" pill). Informational → `Informational N` (pale blue `#EBF3FF`, blue ⓘ,
bold blue copy, optional bullets). Errors/edit context → `Alert` (328 × 112).

**P9 — Info page.** App bar with ✕ → `Language selector` strip (360 × 74, "Change Language:" +
cyan `filtered` dropdown, 1 dp divider) → optional `with link` launcher card → `Content` frames of
alternating navy bold subheads and grey body text at 16 dp margins → `Alerts/List item` bullets
(328 dp, 40/60 dp tall, 48 or 68 dp pitch) → footer with a single full-width cyan button.

**P10 — Dialogs.** Slate `#52607B` scrim over the live screen → white 328 dp card at x 16
(`dialog card - overlay` for confirmations, `dialog card - tutorial` for the walkthrough) →
optional 44 dp orange **!** circle or 100–108 dp mascot avatar → navy Quicksand headline →
grey body → 296 dp cyan primary pill → 296 dp outlined cyan secondary pill (16 dp gap). Every
button carries a leading glyph in a circle.

**P11 — Walkthrough / coach-mark.** Dimming `Rectangle 1` (360 × 640) + a `dialog card - tutorial`
"cut-out" that re-renders the highlighted component undimmed inside a magenta `#FF2180` ring +
a `Tutorial card 2` (328 × 168 at 16, 457) holding an 80 dp mascot, navy body copy, an 11-dot
progress rail (10 dp dots on a 14 dp pitch, active = 20 × 10 magenta pill) and a cyan **Next**
pill. Optional hand/arrow pointer vector (30.8 × 39.2) between card and spotlight.

**P12 — Empty states.** Centred illustration in a cyan circle (~110 dp) → navy 20 dp headline →
grey 14 dp instruction referencing the action button by name → the action button/FAB stays live.
List-level empties use an `Action panel statements` instance instead (328 × 130 income,
328 × 155 expenses).

**P13 — Money colour semantics.**

| Meaning | Colour | Token |
|---|---|---|
| Income / profit / positive balance | green `#83BB26` | `Tertiary` |
| Expense / loss / negative amount | magenta `#FF2180` | `Secondary` |
| Neutral balance / scrim / muted | slate `#52607B` | `Primary Accent 1` |
| Actions, tabs, links, FAB | cyan `#1DBADF` | `Quaternary` |
| Chrome, headings, body-dark | navy `#27385A` | `Primary` / `Text Dark` |
| Field & row fill | ice-blue `#EFF6FA` | `UI Background` |
| Info blocks | pale blue `#EBF3FF` / blue `#1D67D5` | `Info BG` / `Info Main` |

---

## 7. Designer notes — verbatim transcription

Every `comment` frame is a 360 × 640 canvas note holding one text node; the note text is the layer
name. Free-text nodes sit loose on the canvas. All transcribed exactly as written, including
capitalisation and typos.

### Comment frames (row labels)

| Text node | Frame | Position | Text (verbatim) |
|---|---|---|---|
| `139:55872` | `139:55871` | 699, 517 | **1. Adding income** |
| `139:55886` | `139:55885` | 699, 5104 | **2. Adding expenses** |
| `139:55888` | `139:55887` | 699, 8052 | **3. View/download previous statements** |
| `139:55874` | `139:55873` | 699, 15905 | **4. Info screen Screen on main "Money" page** |
| `139:55876` | `139:55875` | 699, 13965 | **5. Variations of money dashboard a. Have not started -- no income/expenses added** |
| `139:55878` | `139:55877` | 1539, 13965 | **b. summary** |
| `139:55880` | `139:55879` | 2379, 13965 | **d. Programme running at a loss for 2 months** |
| `139:55882` | `139:55881` | 3219, 13967 | **e. Programme profits for 2 months in a row** |
| `139:55884` | `139:55883` | 4864, 517 | **Other (removed a field here - the SmartStart version needs to be updated to match)** |
| `139:55890` | `139:55889` | 1539, 8052 | **Viewing previous statements** |
| `139:55892` | `139:55891` | 3219, 8050 | **Empty states If practitioner has not logged any income and/or expenses** |
| `139:55894` | `139:55893` | 3184, 517 | **Donations or vouchers** |
| `139:55896` | `139:55895` | 4024, 517 | **DBE subsidy** |
| `139:56208` | `139:56207` | 2799, 8901 | **Before income statement is downloaded. ⬇️** |
| `139:56210` | `139:56209` | 2799, 10797 | **After statement is downloaded ⬇️** |
| `139:58967` | `139:58966` | 699, 19997 | **IF user taps "Preschool fees" and there are no children at the school yet, then show the pop-up.** |

> Note: variation labels jump from **b** to **d** — there is no "c." comment frame on the page.

### Free-text notes on the canvas

| Node | Position | Size | Text (verbatim) |
|---|---|---|---|
| `139:56206` | 4899, 7922 | 331 × 68 | **JusT TRYING TO GET A SENSE OF WHAT IT'LL LOOK LIKE IF SOMEONE HASN'T TRACKED ANYTHING YET FOR THE CURRENT MONTH** |
| `139:58860` | 3600, 10335 | 236 × 143 | **and so on for all income & expenses... ONLY the preschool fees item does not include a delete button.** |
| `139:58861` | 3600, 11972 | 236 × 47 | **and so on for all income & expenses...** |
| `139:58862` | 2764, 2257 | 350 × 51 | **Just showing what a big class looks like** |
| `139:58863` | 2764, 428 | 350 × 51 | **If multiple classes selected, show class title & divider between each** |

### Implications for implementation

- Statements become **read-only after download** (dialog `139:56908` + comments `139:56207` /
  `139:56209`).
- **Preschool-fee line items are the only ones without a delete button** (`139:58860`).
- Preschool-fee entry must **group children by class with a title and divider per class** when
  multiple classes are selected (`139:58863`) and must scroll gracefully for large classes
  (`139:58862`, `139:57219` at 1893 dp).
- Tapping **Preschool fees** with zero registered children must open the "add children first"
  pop-up rather than the form (`139:58967`).
- The "Other" income form intentionally has **one fewer field** than the SmartStart build
  (`139:55884`) — a known divergence to reconcile.

---

## 8. Variables found

`get_variable_defs` was run on two representative screens.

### `139:55911` — WO7.4.0 Money dashboard (profit variant)

| Variable | Value |
|---|---|
| `White` | `#FFFFFF` |
| `Primary` | `#27385A` |
| `Text Dark` | `#27385A` |
| `Primary Accent 1` | `#52607B` |
| `Primary Accent 2` | `#D4D7DE` |
| `Secondary` | `#FF2180` |
| `Tertiary` | `#83BB26` |
| `Quaternary` | `#1DBADF` |
| `UI Background` | `#EFF6FA` |
| `ECD H1` | Quicksand SemiBold 24 / 32, weight 600, ls 0 |
| `ECD H4` | Quicksand SemiBold 16 / 100, weight 600, ls 0 |
| `H4` | Inter Medium 16 / 22, weight 500, ls 0 |
| `Small` | Inter Regular 14 / 20, weight 400, ls 0 |
| `ECD Help text` | Inter Regular 14 / 20, weight 400, ls 0 |
| `text-xs/leading-4/font-medium/tracking-wider/uppercase` | Inter Medium 12 / 16, weight 500, **ls 5** (table column headers) |
| `/shadow/base` | drop-shadow `#0000000F` 0 1 2 0 + drop-shadow `#0000001A` 0 1 3 0 |

### `139:56346` — WO7.1.2 Add income - type

| Variable | Value |
|---|---|
| `White` | `#FFFFFF` |
| `Primary` | `#27385A` |
| `Text Dark` | `#27385A` |
| `Text Mid` | `#65727A` |
| `Primary Accent 1` | `#52607B` |
| `Quaternary` | `#1DBADF` |
| `Info Main` | `#1D67D5` |
| `Info Dark` | `#1752AB` |
| `Info BG` | `#EBF3FF` |
| `EDC H2` *(sic — typo for "ECD H2" in the library)* | Quicksand SemiBold 20 / 100, weight 600 |
| `ECD H3` | Quicksand SemiBold 18 / 100, weight 600 |
| `ECD H4` | Quicksand SemiBold 16 / 100, weight 600 |
| `ECD Help text` | Inter Regular 14 / 20, weight 400 |

**Type system:** headings use **Quicksand SemiBold** (`ECD H1` 24, `EDC H2` 20, `ECD H3` 18,
`ECD H4` 16); body/help text uses **Inter** (`H4` Medium 16/22, `Small` & `ECD Help text`
Regular 14/20, table headers Medium 12/16 with 5 letter-spacing, uppercase).

Colours observed in screenshots that do **not** appear as variables on these two nodes (so they
are either raw fills or come from other library collections): the pale-green income card
`#E4EFD2`, pale-pink expense card `#FBD7E4`, dark-green icon circle `#5D9B1E`, alert peach
`#FDEDE4` with its orange icon/text, and the disabled-button pale cyan `#C9EAF4`.

**Gap:** the variable-defs call on the two dialog nodes was not run (Figma seat tool-call limit);
`Info Dark`, `Primary Accent 2` and the alert-orange token were not resolvable from these two
nodes alone.

---

## 9. Figma node deep-link index

Base: `https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=`

| Node ID | What it shows | Deep link |
|---|---|---|
| `139:55673` | Page 18 (whole canvas) | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-55673 |
| `139:55911` | Money dashboard — 2-month profit, celebratory card ✅viewed | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-55911 |
| `139:56009` | Money dashboard — profit, short celebratory card | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-56009 |
| `139:56216` | Money dashboard — empty / piggy bank ✅viewed | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-56216 |
| `139:56107` | Money dashboard — 2-month loss + alert ✅viewed | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-56107 |
| `139:56615` | Money dashboard — "nothing tracked this month" probe | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-56615 |
| `139:56313` | Add an amount — income vs expense chooser ✅viewed | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-56313 |
| `139:56346` | Add income - type (4 categories) ✅viewed | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-56346 |
| `139:57178` | Income - preschool fee, step 1 (class picker) | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-57178 |
| `139:57191` | Income - preschool fee, step 2 of 2, 2 classes ✅viewed | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-57191 |
| `139:57219` | Income - preschool fee, "big class" symbol | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-57219 |
| `139:58801` | Income - preschool fee, edit state with Alert | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-58801 |
| `139:56361` | Income - donations/vouchers ✅viewed | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-56361 |
| `139:58556` | Donations/vouchers — "Item" selected | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-58556 |
| `139:58569` | Donations/vouchers — "Money" selected | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-58569 |
| `139:58582` | Donations/vouchers — "Voucher" selected | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-58582 |
| `139:56373` | Income - DBE subsidy | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-56373 |
| `139:55897` | Income - other | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-55897 |
| `139:56388` | Add expense - type (7 categories) ✅viewed | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-56388 |
| `139:56408` | Expense - rent, empty / Save disabled ✅viewed | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-56408 |
| `139:56423` | Expense - rent, filled / Save enabled | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-56423 |
| `139:56438` | Expense - salary & wages | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-56438 |
| `139:56452` | Expense - utilities | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-56452 |
| `139:56466` | Expense - learning materials | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-56466 |
| `139:56480` | Expense - food | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-56480 |
| `139:56494` | Expense - annual maintenance & purchases | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-56494 |
| `139:56508` | Expense - other | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-56508 |
| `139:58845` | Expense - salary & wages, edit with delete | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-58845 |
| `139:56708` | View previous statements — 2 year groups ✅viewed | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-56708 |
| `139:56959` | View previous statements — long group | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-56959 |
| `139:57009` | View previous statements — 3 year groups | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-57009 |
| `139:56762` | One month view — fully populated ✅viewed | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-56762 |
| `139:56812` | One month view — income blank | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-56812 |
| `139:56862` | One month view — expenses blank | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-56862 |
| `139:57080` | One month view — both blank | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-57080 |
| `139:56746` | One line item view | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-56746 |
| `139:56908` | Dialog — finalise download ✅viewed | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-56908 |
| `139:57091` | General info page ✅viewed | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-57091 |
| `139:57125` | Making a profit info page ✅viewed | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-57125 |
| `139:57249` | 4.1.a Money screen - not started (legacy) | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-57249 |
| `139:57894` | 4.1.b Money screen summary + tutorial card 8 ✅viewed | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-57894 |
| `139:58148` | 4.1.b Money screen summary + spotlight on button | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-58148 |
| `139:58595` | 4.2 Add an amount + tutorial card 2 ✅viewed | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-58595 |
| `139:57508` | 4.2 Add an amount + tutorial card 3 | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-57508 |
| `139:57626` | 4.3 Add income + tutorial card 4 | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-57626 |
| `139:57718` | 4.3 Add income + tutorial card 5 | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-57718 |
| `139:57806` | 4.3 Add income form + tutorial card 7 | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-57806 |
| `139:58864` | Donations/vouchers + walkthrough overlay | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-58864 |
| `139:58389` | 2.1.1 Children dashboard - playgroup (last card) | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-58389 |
| `139:57250` | Dialog — attendance walkthrough start ✅viewed | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-57250 |
| `139:57344` | Walkthrough start + tutorial card 1 + FAB spotlight | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-57344 |
| `139:58735` | Dialog — walkthrough language picker ✅viewed | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-58735 |
| `139:58968` | dialog card - overlay — "add children first" (tall) ✅viewed | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-58968 |
| `139:58969` | dialog card - overlay — "add children first" (short) | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-58969 |
| `139:58951` | Add income - type (backdrop for the pop-up spec) | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-58951 |
| `139:58947` | Frame 704 — loose `Filled with icon` + `Alert` study | https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-58947 |

✅viewed = rendered and transcribed first-hand for this document (19 screens).

---

## 10. Gaps & caveats

- **No PNG assets on disk.** The egress proxy returns `403` on `CONNECT www.figma.com:443`, so
  `curl` of the short-lived screenshot URLs is impossible in this environment. Section 9 gives
  deep links instead.
- Screens **not** rendered first-hand (documented from XML geometry + component names only):
  `139:56009`, `139:56615`, `139:56423`, `139:56438/56452/56466/56480/56494/56508`,
  `139:56373`, `139:55897`, `139:57178`, `139:58725`, `139:57219`, `139:58800`, `139:58801`,
  `139:58831`, `139:58845`, `139:56959`, `139:57009`, `139:56812`, `139:56862`, `139:57080`,
  `139:56746`, `139:57249`, `139:57344`, `139:57508`, `139:57626`, `139:57718`, `139:57806`,
  `139:58148`, `139:58389`, `139:58864`, `139:58969`.
- Text content in the XML is only available as **layer names**; generic layers named `Text`,
  `Title` and `Label` (most table cells and page titles) carry no copy in the metadata, so their
  strings were read from the rendered screenshots where available and are otherwise unknown.
- `get_variable_defs` was run on 2 nodes only (Figma Professional-seat tool-call limit was hit
  mid-extraction and the run was resumed after reset).
- The `Header` instances (10 900 × 300) are canvas furniture, not app UI.
- The variation lettering in the comment frames skips **c.**
