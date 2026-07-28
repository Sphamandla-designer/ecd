# Back-end contract

What the API must supply for the UI to render correctly, and the rules the design encodes that
the server is responsible for enforcing. Derived from the designer notes captured in
[`../extraction/`](../extraction/) — every rule below traces to a note ID.

> **Principle:** the client renders; the server decides. Permission gates, date windows,
> immutability and ordering rules are all enforced server-side. The client mirrors them for
> responsiveness, never as the sole check.

---

## 1. Tenant theming

`GET /tenants/{id}/theme` → a document validating against
[`../tokens/tenant-theme.schema.json`](../tokens/tenant-theme.schema.json).

| Field | Notes |
|---|---|
| `palette` | Raw brand hues. Every key referenced by `roles` must exist. |
| `roles` | Maps semantic role → palette **key** (not a hex). This is the white-label seam. |
| `scrim` | `{ base: <paletteKey>, alpha: 0.7 }` |
| `categoryMapping` | Category → palette key; the client derives the tint from `*Accent2`. |
| `assets` | Absolute or CDN-relative URLs. Must be cacheable and available offline after first sync. |

**Rules**
- Status colours, developmental-domain colours, the type scale, spacing and radii are **never**
  in the payload. If a tenant asks to change them, the answer is no.
- Ship `Cache-Control` with a long max-age plus an ETag; clients cache the theme offline and
  must render from cache on a cold, disconnected start.
- Serve the ECD Connect theme as the fallback for any tenant with no override.

---

## 2. Permissions — the matrix the UI branches on

Every screen renders differently by role. The API must return an explicit capability set, not
a role string the client interprets.

```json
{
  "role": "practitioner",
  "capabilities": {
    "programme.view":   true,
    "programme.edit":   false,
    "progress.track":   true,
    "progress.createReport": false,
    "money.edit":       true,
    "classes": ["class-uuid-1"]
  }
}
```

| Capability | UI effect when false |
|---|---|
| `programme.edit` | **Hide** the "Add a theme" FAB, the "?" help icon, all nudges/alerts, and every "Change activity" button. Do **not** grey them out. *(notes `145:12175`, `145:12178`, `145:12184`, `145:12186`)* |
| `progress.createReport` | Hide "Create progress report" on the child profile *(note `145:28937`)* |
| `classes` | Practitioners see only their assigned classes; principals see **all** classes including ones they don't teach *(note `145:11397`)* |

**Exception worth noting:** even with nudges suppressed, the *"What are children working on?"*
pop-up is still shown to permission-restricted practitioners (note `145:12178`).

**Conflict rule:** programme planning is online-only. If a conflict arises, **the principal's
plan is authoritative** (note `145:11397`).

---

## 3. Child progress

### 3.1 Age-banded assessment tools

The server selects the tool from the child's age **as at the report deadline** — not today's
date (note `145:23942`).

| Age band | Items | Instrument |
|---|---|---|
| 0–5 months | 20 | CREDI |
| 6–11 months | 20 | CREDI |
| 12–17 months | 20 | CREDI |
| 18–23 months | 20 | CREDI |
| 24–29 months | 20 | CREDI |
| 30–35 months | 20 | CREDI |
| 36–47 months | 30 | NCF |
| 48–60 months | 40 | NCF |
| 61–65 months | 48 | ChildSteps |
| 66–69 months | 40 | ChildSteps |
| 70–74 months | 42 | ChildSteps |
| 75–78 months | 38 | ChildSteps |
| **> 78 months** | — | **No tool.** Return a flag; the client shows the "only available up to 6½ years" state *(note `145:29430`)* |

*(note `145:30676`)*

**Some items are reverse-scored** (Yes = No, No = Yes). The server owns the scoring map — the
client must never infer it. The item bank lives in the linked source-of-truth spreadsheets
referenced in note `145:30676`.

**Info text differs per instrument** (CREDI / NCF / ChildSteps) and ages 36–47 and 48–60 have
different wording again (note `145:29208`). Return the info copy with the tool.

### 3.2 Pagination and flow

- **5 questions per screen** (note `145:23950`). The server should return the item list; the
  client paginates.
- Step 5 — "choose 4 skills to work on" — is populated from the items answered **No** or
  **Don't know** (note `145:23936`, use case 16). If the practitioner answered Yes to
  everything (and No to reverse-scored items), the step is **skipped entirely**
  (notes `145:23952`, `145:24217`).
- "Change my answers" re-enters the flow with **all previously saved answers pre-filled**
  (note `145:23944`).
- `Save & exit` must persist partial progress at any point.

### 3.3 Reporting periods

- Principal-only, set **yearly**, and **not editable once set** (note `145:28413`). Show
  previous selections when configuring the next year.
- Reject start/end dates that are too close together and return an error the client renders in
  a `dialog card - error` (note `145:29492`, use case 4).
- A report can only be created when today falls **inside** a current reporting window
  (note `145:23940`).
- **Once created, a report is immutable** — the client warns before creation and the server
  must enforce it (screen `WO5.2.10a`).

### 3.4 Summary access

`See summary` drill-down visibility (note `145:28406`):
- Show the class picker only if the practitioner is assigned to **more than one** class
  (principal: only if the preschool has more than one class).
- Show the age-range screen only if reports exist for **multiple** age groups, and list only
  the ranges actually present.
- Return amber alerts when any child is **over 60 months** or **over 78 months**
  (notes `145:29491`, `145:29463`).

---

## 4. Programme planning

### 4.1 Activity ordering — server-side (note `145:6627`)

Order the chooser list by these rules, in priority order:
1. The **recommended** activity/story first (if any).
2. Activities already included in the current programme sink to the **bottom**
   (small & large group only).
3. Otherwise, sort by the **least-represented subcategory (skill)** across both small- and
   large-group activities in the programme. Each activity has 2 subcategories — sort by the
   one appearing least.

### 4.2 Recommendations & nudges

| Nudge | Server condition |
|---|---|
| Already-included message | Activity already used this **Mon–Fri** week (small-group only) *(`145:6641`)* |
| Skills-gap recommendation | Not enough activities planned for a given skill in the period |
| Missing skills | ≥ 10 small+large group activities planned in the programme (or a 4-week window when no theme); list subcategories appearing **< 5 %** of the time *(`145:6649`)* |
| Start-planning, priority 1 | ≥ 1 *future* day in the current week unplanned (from Monday 00:00) *(`145:6651`)* |
| Start-planning, priority 2 | ≥ 1 day next week unplanned **and** the current week fully planned *(`145:6639`)* |
| Planning streak | X consecutive planned weeks including the current one, counting past *and* future plans *(`145:6647`)* |
| "What are children working on?" | After a reporting deadline passes, first visit only, and **only if ≥ 1 child progress report** was created in that period *(`145:6643`)* |
| Full-programme-planned | Current **and** next week fully planned → hide the button *(`145:6645`)* |
| Weekend / holiday message | Only when the user opens Programme on a weekend day; Fri 17:00 → Sun 23:59, plus public holidays *(`145:6637`, `145:6665`)* |

### 4.3 Dates

- Day pager excludes weekend days but **includes public holidays** with the relevant message
  (note `145:6665`). The server must expose a public-holiday calendar.
- End date must be after the start date (note `145:6630`); auto-fill the programme end date
  when a theme is chosen (note `145:6631`) and auto-fill the next unassigned school day
  (note `145:6632`).
- Overlapping theme date ranges are an error state (`WO6.1.2` variant `145:7199`).
- **Past days are read-only** — the server should reject edits and the client disables every
  change action (notes `145:11023`, `145:11025`).
- A story chosen without a story activity leaves the day **incomplete**; re-entering must
  resume at the incomplete step with the chosen story preselected (note `145:11021`).

---

## 5. Resources

| Field | Purpose |
|---|---|
| `type` | Activities / Stories / Teaching tips / Other → drives the badge colour and the filter |
| `isDataFree` | **Set on the portal.** When false the client shows the orange "not data free" banner, or a pre-navigation confirm dialog in the reduced-functionality build *(note `139:63542`)* |
| `likeCount` | Badge is green when > 0, blue when 0 |
| `likedByMe` | Drives the Select-card checked state |
| `languages[]` | Feeds the language selector |
| `url` | External link; the app leaves and returns to the same screen |

Liking happens **after** the user returns from the external link (note `139:63518`) — the
endpoint must accept a like at any time, not only during a session on the resource.

The `See more resources` footer button is present only when more results exist; the terminal
page omits it.

---

## 6. Money

- Statements are **uneditable once downloaded/finalised** — enforce server-side.
- **Only preschool-fee line items lack a delete action**; every other income/expense item is
  deletable (note `139:58860`).
- Preschool fees are entered **per child, grouped by class**; if multiple classes are selected,
  the response must group items by class so the client can render a title and divider per group
  (note `139:58863`).
- The dashboard hero card switches colour by outcome: profit → success, loss → select/magenta,
  neutral → slate. Return the computed total *and* the sign; do not make the client infer
  formatting from a string.
- Statements are grouped by year, then month.

---

## 7. DBE registration helper

Two-stage ladder: **Apply → Bronze certificate** and **Comply → Silver certificate**. (A Gold
tier appears in the certificate picker but has no info screen — treat as not-yet-specified.)

- The intake form is 3 steps with **conditional reveals**: choosing "Other" reveals a detail
  field; the subsidy answer reveals the registration question. Return the question graph, don't
  hard-code it client-side.
- "Update my stage" is a **self-declaration** — after it, the stepper subtitle switches from a
  description to the achievement **date**. Store and return that date.
- Trial users are gated behind a "Set up your preschool!" dialog before entering the flow.

---

## 8. Offline & sync

The app is offline-first. See [`../patterns/offline-first.md`](../patterns/offline-first.md).

- Every mutable entity needs a stable client-generatable ID (UUID) so records created offline
  survive sync without duplication.
- Return `updatedAt` and accept `If-Unmodified-Since` / version tokens for conflict detection.
- **Programme planning is online-only**; everything else must queue offline.
- Conflict resolution: principal's plan wins (note `145:11397`).
- Never make a destructive operation the only path forward when offline — the design's rule is
  warn and allow continue.

---

## 9. Localisation

- Content (activities, stories, resources, progress-tracker items, info copy) is
  **translated per record**, with the language chosen at read time via the language selector.
- When a chosen language is unavailable for an item, fall back to **English** — and the UI says
  so explicitly ("When your chosen language isn't available, activities or stories will be
  shown in English", `WO6.1.2`).
- Return the available-languages list per record so the client can populate its picker and show
  the "Available in isiZulu, English" line on story cards.

---

## 10. Media

- Resource, activity and story images: return a URL plus intrinsic dimensions so the client can
  reserve layout space (photo headers are 168–180 dp tall) and avoid reflow.
- User-uploaded photos go through the `Form Photo` component (160 dp). Accept the upload
  offline-queued.
- Serve images at 1×/2×/3× or via a resizing CDN — the audience is on low-end Android devices
  with metered data. Respect the data-free flag concept: heavy media should be avoidable.
