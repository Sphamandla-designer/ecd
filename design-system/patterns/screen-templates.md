# Screen templates

Every screen in the App-Screens file is one of **seven templates**. Learn these and you can
build a new screen that looks native to the product without inventing anything.

All templates assume the 360 dp reference frame, 16 dp margins, 328 dp content column
(see [`../foundations/layout-spacing.md`](../foundations/layout-spacing.md)).

---

## The band system

Screens stack fixed-height bands from the top. Only the content band scrolls.

| Band | Height | Optional? |
|---|---|---|
| App bar | 64 dp | No |
| Tabs | 56 dp | Yes |
| Filters bar with Search **or** Language selector | 56 / 74 dp | Yes |
| Content (`Form Layout`) | flexible, scrolls | No |
| Footer action bar | 72 dp | Yes |

> The footer is **sticky**, not part of the scroll. It is a `full width` divider followed by a
> 40 dp button with 16 dp padding above and below.

---

## Template 1 — Hub / dashboard

**Used by:** Classroom resources hub, Business resources hub, Money dashboard, Progress tab
dashboard, Children dashboard.

```
┌─ App bar ──────────────────────── 64 ─┐  title + subtitle (date), cyan "?" right
├─ Tabs ─────────────────────────── 56 ─┤  scrollable, active = cyan + underline
├───────────────────────────────────────┤
│  Page Title            H2, 16 dp margin│  "What type of resource would you like to see?"
│                                        │
│  ╭─ 80 dp category card ────────────╮  │  role.background or category tint
│  │ ◍  Activities                 ▸ │  │  48 dp icon circle in category.<x>.main
│  ╰──────────────────────────────────╯  │  4–8 dp gap
│  ╭─ 80 dp category card ────────────╮  │
│  ╰──────────────────────────────────╯  │
├─ Footer ───────────────────────── 72 ─┤
│  ──────────── divider ─────────────    │
│  [  👁  See all classroom resources  ] │  primary, 328 × 40
└───────────────────────────────────────┘
```

**Recipe**
1. App bar `Title with question mark` (`100:3714`) — title + date subtitle + cyan help chip.
2. Tabs, active tab in `role.action`.
3. `Page Title` — H2, `role.textDark`, 16 dp margins.
4. `Children list` of `long action icon with icon and alert` rows (80 dp, 4–8 dp gaps). Each
   row: 40–48 dp icon circle in `category.<x>.main` with a white glyph, H4 title, chevron.
   Card fill = `category.<x>.tint`.
5. Sticky footer: divider + full-width primary button.

**Empty state:** replace the list with the `Simple/Mobile` block — centred H2 headline,
110 dp illustration, no footer button.

---

## Template 2 — Filtered list

**Used by:** Resource lists, activity choosers, story choosers, previous statements.

```
┌─ App bar ──────────────────────── 64 ─┐  title (+ subtitle), ✕ close right
├─ Filters bar with Search ──────── 56 ─┤  role.background, hairline bottom
│  ⬤  [Type ⌄] [Data free ⌄] [Most liked]│  40 dp magenta search + scrollable chips
├───────────────────────────────────────┤
│  Page Title (optional)     H2          │
│  ╭─ 98–118 dp list card ────────────╮  │
│  │ Title                            │  │  h4
│  │ Two-line description…            │  │  help, role.textMid
│  │                    👍 15      ▸ │  │  like badge + chevron
│  ╰──────────────────────────────────╯  │  4 dp gap
├─ Footer ───────────────────────── 56 ─┤
│  [  👁  See more resources  ]          │  secondary outline
└───────────────────────────────────────┘
```

**Recipe**
1. App bar with ✕ close (this template is usually entered as a modal-ish sub-flow).
2. `Filters bar with Search` — see [components §11](../components.md#11-filters--search).
   The chip row scrolls horizontally; applied filters become solid cyan chips.
3. List of `action item icon` rows. First row is often 118 dp (two-line title), rest 98 dp.
4. Footer: **secondary** outline "See more" when more results exist; **omit the footer
   entirely** on the terminal page of results.

**Selection variant:** when the list is a chooser, rows gain a leading radio or checkbox and
the footer button becomes a disabled-until-valid primary ("Save", "Next").

**Empty state:** centred illustration + H2 ("Sorry, no activities found!") + guidance body.

---

## Template 3 — Form / wizard step

**Used by:** Add income/expense, Timing, Create report steps, DBE intake, self-assessment.

```
┌─ App bar ──────────────────────── 64 ─┐  "Report 2 / step 1 of 6", ✕ close
├───────────────────────────────────────┤
│  Page Title                H2          │
│  helper text               help        │
│                                        │
│  Label                     h4          │  ── field block, 88 dp pitch
│  help text                 help        │
│  ╭─ 48 dp field ────────────────────╮  │  role.background, radius 6
│  ╰──────────────────────────────────╯  │
│                                        │
│  Label                     h4          │
│  ╭─ 48 dp field ────────────────────╮  │
│  ╰──────────────────────────────────╯  │
│                                        │
│  ╭─ Alert (conditional) ────────────╮  │  e.g. "These dates are available"
│  ╰──────────────────────────────────╯  │
├─ Footer ───────────────────────── 72 ─┤
│  ──────────── divider ─────────────    │
│  [  💾  Save  ]                        │  primary, DISABLED until valid
│  [  ✕  Save & exit  ]                  │  secondary (multi-step only)
└───────────────────────────────────────┘
```

**Recipe**
1. App bar `steps exit button top bar` (`100:3707`) when it's a wizard — title + "step N of M"
   + ✕.
2. Field blocks at **88 dp pitch** (label + field + 4 dp gaps). Two-field rows use 164 dp
   half-width fields.
3. Conditional alerts appear inline between fields, never as toasts.
4. Footer: primary **disabled until the step is valid**, plus a secondary "Save & exit" on
   multi-step flows.

**Rules**
- Never block progress silently — a disabled primary must be accompanied by visible helper
  text or an inline alert saying what's missing (disabled buttons fail contrast; see
  [colour §6](../foundations/colour.md#6-accessibility)).
- A ✕ close on a dirty form must raise the `dialog card - overlay` discard confirmation.

---

## Template 4 — Detail / content view

**Used by:** Resource detail, activity detail, story view, statement line item, info screens.

```
┌─ App bar ──────────────────────── 64 ─┐  content title, ✕ close
├─ Language selector ────────────── 74 ─┤  "Change Language:" + cyan chip
├───────────────────────────────────────┤
│  [ photo header, 168 dp ]              │  optional, full-bleed
│  Page Title                H2          │
│  [badge] [👍 1 like]       28 dp       │
│  Short description         help        │
│  ╭─ status banner ──────────────────╮  │  Success / Alert — data-free gate
│  ╰──────────────────────────────────╯  │
│  [  🔗  See resource  ]                │  primary
│  Long body copy            body        │
│  ────────── dashed divider ─────────   │
│  Section label             h4          │
│  ╭─ Select card, 56 dp ─────────────╮  │  "Like this resource"
│  ╰──────────────────────────────────╯  │
│  ────────── dashed divider ─────────   │
│  [  ✈  Share resource  ]               │  secondary
└───────────────────────────────────────┘
```

**Recipe**
- Sections are separated by **dashed dividers** (`100:4957`), not whitespace alone.
- The language selector band is standard on any translated content.
- Status banners sit above the primary action so the user reads the warning before acting.

---

## Template 5 — Long-form info screen

**Used by:** "Programme best practices", "Tracking progress", money info pages, DBE info pages.

```
App bar → Language selector (74) →
  hero card (role.background, 194 dp: H2 + primary "Start walkthrough") →
  action list (3 × 80 dp rows) →
  bold section heading + bullet list →
  Informational alert (328 × 92–132) →
  logo block →
  footer primary CTA
```

These screens are tall (800–2900 dp) and scroll. They always end with a **forward action**
("Start planning my programme", "Start tracking") — never a dead end.

---

## Template 6 — Dialog over a screen

**Used by:** every confirmation, nudge, info popup and celebration.

```
┌───────────────────────────────────────┐
│ ░░░ scrim: role.scrim (navy @ 70 %) ░░│
│  ╭─ 328 dp, radius 20, padding 24/16 ╮│
│  │            ╭────╮                  ││  48 dp status icon
│  │            │ ⚠  │                  ││  or 96 dp mascot circle
│  │            ╰────╯                  ││
│  │   Title (H3, centred)              ││
│  │   Body (body, centred, textMid)    ││
│  │   [    Primary action    ]  296×40 ││
│  │   [   Secondary action   ]  296×40 ││  16 dp gap
│  ╰────────────────────────────────────╯│
└───────────────────────────────────────┘
```

Pick the variant by intent — see [components §9](../components.md#9-dialogs-popups--modals):

| Intent | Icon | Component |
|---|---|---|
| Destructive / blocked | 48 dp red circle | `Modal` `100:6831` |
| Warning / unsaved changes | 48 dp orange circle | `dialog card - overlay` `100:6844` |
| Information | 48 dp blue info circle | `dialog - simple warning/info` `100:6944` |
| Guidance / onboarding | mascot | `dialog card - tutorial` `100:6858`, `question` `100:8965` |
| Celebration | illustration, **no buttons** | `dialog card - celebrate` `100:6915` |

---

## Template 7 — Walkthrough / coach-mark overlay

**Used by:** programme, progress, attendance and money walkthroughs.

```
┌───────────────────────────────────────┐
│  [ the real screen, rendered behind ]  │
│ ░░░ scrim ░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
│        ╭─ spotlight cut-out ─╮         │  white-outlined pill around the target
│        ╰──────────────────────╯        │
│                  ↓ yellow arrow        │
│  ╭─ tutorial card, 328 × 168 ────────╮ │
│  │ ◕  "Tap here to add a theme!"     │ │  80 dp mascot + message
│  │ ●●○○○○○○○○            [ Next → ] │ │  dot pager + 32 dp pill
│  ╰────────────────────────────────────╯│
└───────────────────────────────────────┘
```

**Anatomy**
- Scrim over the **live screen**, not a screenshot — the user must see real context.
- Spotlight: a cloned copy of the target element drawn above the scrim, with a white outline.
- Optional yellow arrow pointing at the target.
- Tutorial card at the bottom: 328 × 168, 80 dp mascot left, message right.
- **Dot pager**: one dot per step, the current step drawn as an elongated 20 × 10 bar.
- Small `Next →` pill (67 × 32) bottom-right.

**Rules**
- Always entered via a language picker dialog first (`5A.6.0a`), then an offer dialog
  ("Want to learn how to…?") with **"Yes, help me!" / "No, skip"**.
- Declining shows the `WO6.5.2` state highlighting the "?" icon so the user knows how to
  return.
- Disable interaction with the underlying screen during the walkthrough (designer note
  `145:6622` asks to disable the "i" affordance at that stage).
- Never launch a walkthrough for a user without permission to perform the actions it teaches
  (notes `145:12175`, `145:12186`).

---

## Cross-cutting rules

**One primary action per screen.** If two actions compete, the second is a secondary outline
button or a small pill.

**Disabled is the default for wizard footers.** Enable only when the step is valid.

**Dividers carry meaning.** `full width` (360 dp) separates *bands*; `standard`/`dashed`
(328 dp) separates *sections inside* the content column.

**Reserve the offline slot.** Every template must tolerate the offline ticker appearing
without the layout jumping — see [`offline-first.md`](offline-first.md).

**Permission gates hide, not disable.** For practitioners without add/edit rights the designer
specifies *removing* the Add button, the "?" icon and the nudges entirely — not greying them
out (notes `145:12175`, `145:12178`, `145:12184`).

**Past dates are read-only.** Viewing a past day disables every change action and shows an
explanatory message instead (note `145:11023`, `145:11025`).
