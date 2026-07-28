# Resources screens

The **Resources** feature gives practitioners and principals a curated, searchable library of
external links — activity ideas, stories, teaching tips, business/finance guides and community
services — surfaced from three different app areas (Classroom > Resources, Business > Resources,
Community > Resources) but sharing one list, one detail page, one filter/sort system and one
"like" mechanic. Because the audience is on metered mobile data, every resource carries a
**data-free** flag entered on the admin portal, and the UI either reassures the user (green
Success banner) or warns them before they burn data (orange Alert banner, or a blocking dialog in
the reduced-functionality build). All frames are 360dp wide at mdpi; content column 328dp.

**Source:** Figma file `8s2xe3EyBRhrzDFy93NbfN` (App-Screens), **Page 19** node `139:63406`.

- Page 19 canvas — https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-63406
- Extraction of record — [`design-system/extraction/page19-resources.md`](../extraction/page19-resources.md)
- Tokens of record — [`design-system/tokens/tokens.json`](../tokens/tokens.json)

> **Colour rule for this document:** every colour is named by a token from `tokens.json`
> (`role.*`, `category.*`, `status.*`, `palette.*`). No raw hexes appear below. Components must
> bind to `role.*` / `category.*` / `status.*`; `palette.*` is quoted only where the Figma source
> bound a raw palette entry and the deviation is flagged in §9.

---

## 1. Flow map

### 1.1 Screen graph

```
                       ┌────────────────────────────────────────────────┐
                       │            AREA HUBS (tabbed)                  │
                       └────────────────────────────────────────────────┘

  RES-HUB-CL  Classroom > Resources        RES-HUB-BZ  Business > Resources     RES-HUB-CM
  139:63493                                139:63519                            (not designed)
      │  4 type cards + "See all"              │  4 type cards + "See all"          │
      │                                        │                                    │
      ├─ empty ─► RES-HUB-CL-EMPTY             ├─ empty ─► RES-HUB-BZ-EMPTY         └─ same
      │           139:63631                    │           139:63657                   pattern,
      │           "Resources coming soon!"     │           "Resources coming soon!"     limited
      │                                        │                                        link set
      │                                        │
      │  (a) tap "See all classroom resources" │  (a) tap "See all business resources"
      │  (b) tap a type card (e.g. Activities) │  (b) tap a type card (e.g. Finances)
      ▼                                        ▼
 ┌───────────────────────────────┐      ┌───────────────────────────────┐
 │ RES-LIST      139:63445       │      │  (same component, area=business)
 │ "Classroom resources"         │      └───────────────────────────────┘
 │ chips: Type · Data free ·     │
 │        Liked · <active sort>  │◄──────────────┐
 └───────┬───────────────────────┘               │ apply / clear filter
         │ (b) type pre-selected                 │
         ▼                                       │
 ┌───────────────────────────────┐               │
 │ RES-LIST-TYPE 139:63734       │               │
 │ title = type, no Type chip    │               │
 │ (copy on canvas: 139:63821)   │               │
 └───────┬───────────────────────┘               │
         │ scroll / "See more resources"         │
         ▼                                       │
 ┌───────────────────────────────┐               │
 │ RES-LIST-LONG 139:63791 (10)  │               │
 │ RES-LIST-END  139:63759 (15,  │               │
 │               no footer btn)  │               │
 │ RES-LIST-ALT  139:63469 (3    │               │
 │               chips, no sort) │               │
 └───────┬───────────────────────┘               │
         │                                       │
         │  tap any filter chip ─────────────────┤
         │        ▼                              │
         │  ┌──────────────────────────────┐     │
         │  │ FLT-TYPE   139:63703         │     │
         │  │ FLT-FREE   139:63733         │─────┘
         │  │ FLT-LIKED  139:63702         │
         │  │ FLT-SORT   139:63718         │  (inline dropdown, 328 wide)
         │  └──────────────────────────────┘
         │
         │ tap a resource card
         ▼
 ┌────────────────────────────────────────────────────────────┐
 │ RES-DET  "WO6.2.6 View story"                              │
 │   RES-DET-FREE 139:63543  data free  · unliked (0 likes)   │
 │   RES-DET-PAID 139:63574  NOT data free · liked (1 like)   │
 └───────┬──────────────────────────┬──────────────┬──────────┘
         │ "See resource"           │ Like toggle  │ "Share resource"
         ▼                          ▼              ▼
   ┌───────────────┐        like count ±1     OS share sheet
   │ EXTERNAL LINK │        badge recolours   (out of scope)
   │ leaves app    │        info→success
   └───────┬───────┘
           │ user returns (Back)
           └─► back on RES-DET, like still offered


 ══════════ REDUCED-FUNCTIONALITY FALLBACK BRANCH (notes 139:63606 / 63630 / 63758) ══════════

  RES-HUB-*  ──►  RES-LIST-RED 139:63607
                  chips: Type · Data free · Sort   (no Liked)
                  cards have NO like badge
                        │ tap a card
                        ├── resource.data_free == true  ──────────────► EXTERNAL LINK
                        └── resource.data_free == false ──► RES-DLG-DATA 139:63541
                                                              ├ "Yes, go to website" ► EXTERNAL LINK
                                                              └ "No, cancel"        ► back to list
```

### 1.2 Happy path (full-functionality build)

1. User is in **Classroom** and taps the **Resources** tab → **RES-HUB-CL** (`139:63493`).
   Page title asks "What type of resource would you like to see?" over four category cards.
2. User taps **"See all classroom resources"** (footer pill) → **RES-LIST** (`139:63445`),
   scoped `area = classroom`, no type filter, default sort applied and shown as the active
   `filtered` chip ("Most liked").
3. User optionally narrows the list: taps `Type ⌄`, `Data free ⌄` or `Liked ⌄` → the matching
   dropdown (§5) opens beneath the chip; picking an option closes the menu, re-queries the list
   and adds/updates the solid `filtered` chip.
4. User taps a resource card → **RES-DET-FREE** (`139:63543`). Header carries the resource title;
   a badges row shows the **type badge** and the **like badge**; a green Success banner confirms
   "This resource is data free!".
5. User taps **"See resource"** → the OS opens the external URL; **the app is left**. On return
   (system Back), the user is still on the detail screen (comment `139:63518`).
6. User taps the **Select card** "Like this resource" → card flips to the selected treatment,
   label becomes "You liked this resource", the like badge recolours from `status.info.main`
   ("0 likes") to `status.success.main` ("1 like").
7. Back arrow returns to the list, where that card's like badge now reflects the new count.

### 1.3 Branch — filtered by type (comment `139:63512`)

1. From **RES-HUB-CL**, user taps a category card, e.g. **Activities**.
2. → **RES-LIST-TYPE** (`139:63734`): the app-bar title is **replaced by the type** ("Activities")
   with subtitle "Classroom resources"; an in-page Page Title repeats "Activities"; the **Type
   chip is removed** from the filter bar because the type is already fixed by navigation.
3. All other behaviour is identical to §1.2 from step 3 onward.

### 1.4 Branch — pagination

1. **RES-LIST** shows the first page (5 items) with a footer `secondary with icon` button
   **"See more resources"**.
2. Tapping it appends the next page → **RES-LIST-LONG** (`139:63791`, 10 items), footer still
   present.
3. When the result set is exhausted → **RES-LIST-END** (`139:63759`, 15 items) renders **without**
   the footer button. Absence of the button is the "end of results" signal.

### 1.5 Branch — empty / coming soon

1. If the area has zero published resources, the hub renders **RES-HUB-CL-EMPTY** (`139:63631`) /
   **RES-HUB-BZ-EMPTY** (`139:63657`): the type cards **and** the footer "See all" button are
   both suppressed and replaced by a `Simple/Mobile` empty block, "Resources coming soon!".
2. There is no navigation out of this state other than the tabs / back arrow.

### 1.6 Branch — not data free

1. **Full build:** the detail screen renders the orange **Alert** banner instead of the green
   Success banner → **RES-DET-PAID** (`139:63574`). "See resource" still navigates immediately;
   the banner is informational, non-blocking.
2. **Reduced build:** there is no detail screen. Tapping the list row raises
   **RES-DLG-DATA** (`139:63541`) *before* navigating. "Yes, go to website" → external link;
   "No, cancel" → dismiss, stay on the list.

### 1.7 Branch — reduced-functionality fallback (designer decision, notes `139:63606`/`63630`/`63758`)

1. Hub screens are unchanged.
2. List renders as **RES-LIST-RED** (`139:63607`): chips `Type ⌄`, `Data free ⌄`, `Sort ⌄`
   (the **Liked** chip is gone), cards carry **no like badge**.
3. Tapping a card **skips the detail screen entirely** and opens the external link, gated by
   **RES-DLG-DATA** when `data_free == false`.
4. Likes are not read, not written and not displayed anywhere in this build.

---

## 2. Screen inventory

| Code | Name | Figma node | Size (dp) | State / variant | Purpose |
|---|---|---|---|---|---|
| `RES-HUB-CL` | WO2.2.0 Children dashboard | [`139:63493`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-63493) | 360×640 | populated | Classroom > Resources hub: 4 type cards + "See all classroom resources" |
| `RES-HUB-CL-EMPTY` | WO2.2.0 Children dashboard | [`139:63631`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-63631) | 360×640 | empty / coming soon | Classroom hub with no published resources |
| `RES-HUB-BZ` | WO7.4.0 Money dashboard - empty | [`139:63519`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-63519) | 360×640 | populated | Business > Resources hub (Finances / Marketing / Safety / Other) |
| `RES-HUB-BZ-EMPTY` | WO7.4.0 Money dashboard - empty | [`139:63657`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-63657) | 360×640 | empty / coming soon | Business hub with no published resources |
| `RES-HUB-CM` | Community > Resources | *(missing — comment* [`139:63516`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-63516)*)* | 360×640 | — | Community hub. **Design accidentally deleted**; build from `RES-HUB-CL` |
| `RES-LIST` | WO6.1.4 Choose small group activity | [`139:63445`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-63445) | 360×738 | 5 items, 4 chips (incl. active sort) | Full resource list for an area |
| `RES-LIST-TYPE` | WO6.1.4 Choose small group activity | [`139:63734`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-63734) | 360×787 | type pre-filtered | List entered from a type card; Type chip removed, title = type |
| `RES-LIST-TYPE′` | WO6.1.4 (duplicate) | [`139:63821`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-63821) | 360×787 | identical copy | Same frame re-placed in the "Viewing a resource" column — **not** a new screen |
| `RES-LIST-LONG` | WO6.1.4 Choose small group activity | [`139:63791`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-63791) | 360×1317 | 10 items, footer present | Second page of results |
| `RES-LIST-END` | WO6.1.4 Choose small group activity | [`139:63759`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-63759) | 360×1791 | 15 items, **no footer** | Terminal page — no more results |
| `RES-LIST-ALT` | WO6.1.4 Choose small group activity | [`139:63469`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-63469) | 360×718 | 3 chips, no active-filter chip | List before any sort/filter has been applied |
| `RES-LIST-RED` | WO6.1.4 Choose small group activity | [`139:63607`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-63607) | 360×718 | **reduced functionality** | List with no likes; rows link straight out |
| `RES-DET-FREE` | WO6.2.6 View story | [`139:63543`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-63543) | 360×773 | data free · unliked | Resource detail, green Success banner, "0 likes" |
| `RES-DET-PAID` | WO6.2.6 View story | [`139:63574`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-63574) | 360×788 | not data free · liked | Resource detail, orange Alert banner, "1 like" |
| `RES-DLG-DATA` | dialog card - overlay | [`139:63541`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-63541) | 328×330 | modal | Data-free warning before leaving the app (reduced build) |
| `CMP-FLT-BAR` | Filters bar with Search | [`139:63691`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-63691) | 360×56 | component ref | Canonical filter bar |
| `CMP-FLT-TYPE` | filter open | [`139:63703`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-63703) | 328×294 | open, "Activities" active | "Filter by: Type" dropdown |
| `CMP-FLT-FREE` | filter open (instance) | [`139:63733`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-63733) | 328×198 | open | "Filter by: Data free" dropdown |
| `CMP-FLT-LIKED` | filter open (instance) | [`139:63702`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-63702) | 328×198 | open | "Filter by: Your liked resources" dropdown |
| `CMP-FLT-SORT` | filter open | [`139:63718`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-63718) | 328×294 | open | "Sort by:" dropdown |
| `CMP-ITEM` | action item icon | [`139:63846`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-63846) | 328×118 | component ref | Resource list row |
| `CMP-BADGE-A` | Badges — Activities | [`139:63847`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-63847) | 80×28 | type badge | Type badge, Activities |
| `CMP-BADGE-S` | Badges — Stories | [`139:63848`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-63848) | 65×28 | type badge | Type badge, Stories |
| `CMP-BADGE-T` | Badges — Teaching tips | [`139:63849`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-63849) | 107×28 | type badge | Type badge, Teaching tips |
| `CMP-BADGE-O` | Badges — Other | [`139:63850`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-63850) | 55×28 | type badge | Type badge, Other |
| — | Header (canvas banner) | `139:63492`, `139:63845` | 7012×300 | n/a | Canvas section banners, **not app screens** |

---

## 3. Screen specs (build recipes)

Global constants used throughout: frame `size.frameWidth` **360dp**, gutter
`space.screenMargin` **16dp**, content column `size.contentWidth` **328dp**, app bar
`size.appBar` **64dp**, filter bar `size.filterBar` **56dp**, footer bar `size.footerBar`
**72dp**, button visual height `size.buttonHeight` **40dp** inside a `size.touchTarget` **48dp**
hit area.

---

### 3.1 `RES-HUB-CL` — Classroom > Resources hub (`139:63493`)

Build top-to-bottom on a `role.surface` page.

| # | y / h | Component | Spec |
|---|---|---|---|
| 1 | 0 / 64 | **App bar — "Title with subtitle"** (`139:63494`) | Fill `role.appBar`. 24dp (`size.iconLg`) back chevron in `role.onAppBar` at x=16. Centred title **"Classroom"** — `typescale.h3`, `role.onAppBar`. Subtitle **"Monday, 12 June"** — `typescale.help`, `role.textLight`. |
| 2 | 64 / 56 | **Tabs — principal** (`139:63495`) | Bar fill `role.background`, height `size.tabBar` 56dp. Tabs: *Attendance · Progress · Activities · **Resources***. The strip is **455dp wide inside a 360dp frame at x = −94** → horizontally scrollable, auto-scrolled so the active tab is visible. Inactive label `typescale.h4` in `role.textDark`; **active** label `typescale.h4` in `role.action` with a 2dp `role.action` underline flush to the bar's bottom edge. Optional 1dp `role.line` bottom hairline (hidden on this instance). |
| 3 | 120 / auto | **Page Title** (`139:63500`) | "What type of resource would you like to see?" — `typescale.h2`, `role.textDark`, x=16, w=328, wraps to 2 lines. 16dp above, 16dp below. |
| 4 | — / 4×80 | **Children list** of `long action icon with icon and alert` cards (`139:63501`) | 328dp wide, **80dp** tall each (`size.rowDefault`), `space.listGap` **8dp** between rows (this screen uses the 8dp variant), `radius.md` **10dp** (Figma draws 12dp — see §9). |

**Category card recipe** (repeat 4×, only the tokens change):

```
┌ 328 × 80,  radius.md,  fill = category.<key>.tint ────────────────────────┐
│  ●48        Title                                                     ›   │
│  x=16       x=80 (16dp gap)                             chevron x=288     │
└───────────────────────────────────────────────────────────────────────────┘
   ● = 48dp circle (size.iconCircle, radius.xxl) filled category.<key>.main,
       containing a 22dp (size.iconMd) solid glyph in role.onAction (white)
   Title = typescale.h4, role.textDark, vertically centred, wraps to 2 lines
   › = 24dp chevron-right (size.iconLg) in role.textDark
```

| Card | Glyph | Circle fill | Card fill |
|---|---|---|---|
| **Activities** | puzzle-piece | `category.activities.main` | `category.activities.tint` |
| **Stories** | open-book | `category.stories.main` | `category.stories.tint` |
| **Teaching tips** | light-bulb | `category.teachingTips.main` | `category.teachingTips.tint` |
| **Other** | 4-dot grid | `category.other.main` | `category.other.tint` |

| # | y / h | Component | Spec |
|---|---|---|---|
| 5 | bottom / 72 | **Footer Form Layout** (`139:63496`) | Sticky. Full-bleed 1dp `role.line` top divider, then 16dp padding all round. **`primary … with icon`** button, 328×40, `radius.xl` **20dp** (pill), fill `role.action`, `elevation.button`. Leading 20dp (`size.iconSm`) eye icon + 8dp gap + label **"See all classroom resources"** — `typescale.button`, `role.onAction`. |

---

### 3.2 `RES-HUB-CL-EMPTY` — Classroom hub, coming soon (`139:63631`)

1. App bar + Tabs — principal: identical to §3.1 rows 1–2.
2. **No Page Title, no cards, no footer bar.**
3. **`Simple/Mobile` empty state** (`139:63634`), 360×284, starts directly under the tabs:
   - Centred headline (`139:63635`) **"Resources coming soon!"** — `typescale.h2`,
     `role.textDark`, centred, max width 328.
   - 16dp gap, then the 110dp `icon_file` illustration (`139:63636`): `palette.quinary` circle
     with a `category.other.main` hanging "COMING SOON" sign. Horizontally centred.
4. The footer bar is **removed, not disabled** — the frame ends after the illustration.

---

### 3.3 `RES-HUB-BZ` / `RES-HUB-BZ-EMPTY` — Business > Resources (`139:63519` / `139:63657`)

Structurally identical to §3.1 / §3.2. Deltas only:

| Slot | Business value |
|---|---|
| App bar title / subtitle | **"Business"** / "Monday, 7 December" |
| App-bar right action | 24dp circular **"?" help bubble**, fill `role.action`, glyph `role.onAction`, at x=320 |
| Tabs component | **Tabs — business** (`139:63528`): *Staff · Money · **Resources*** — 3 equal tabs, no scrolling |
| Card 1 | **Finances** — clipboard-calculator glyph, circle `category.activities.main`, fill `category.activities.tint` |
| Card 2 | **Marketing, recruitment & communication** — megaphone, circle `category.stories.main`, fill `category.stories.tint` (label wraps to 2 lines) |
| Card 3 | **Safety, hygiene & nutrition** — shield-check, circle `category.teachingTips.main`, fill `category.teachingTips.tint` |
| Card 4 | **Other** — 4-dot grid, circle `category.other.main`, fill `category.other.tint` |
| Footer button label | **"See all business resources"** |

The `Simple striped/Mobile` table (`139:63529` / `139:63667`) present in the Layout frame is a
**hidden** layer — do not build it.

> The `category.*` token keys are named after the *Classroom* taxonomy. Business (and Community)
> reuse the **ramp positions** 1–4 in the same order. See §9 for the naming gap.

---

### 3.4 `RES-HUB-CM` — Community > Resources *(design missing)*

Not present in the file — comment `139:63516` records that the page design "was accidentally
deleted". Build it from `RES-HUB-CL` with `area = community`, the community type taxonomy from
the portal, and footer label **"See all community resources"**. Per the designer's note the
community set is expected to be a *small* set of links out, so the hub may in practice render the
empty state or go straight to `RES-LIST`. **Confirm the taxonomy with the designer before build.**

---

### 3.5 `RES-LIST` — resource list (`139:63445`)

| # | y / h | Component | Spec |
|---|---|---|---|
| 1 | 0 / 64 | **App bar — Title** (`139:63446`) | Fill `role.appBar`. Back chevron 24dp `role.onAppBar` at x=16. Centred title **"Classroom resources"** — `typescale.h3`, `role.onAppBar`. **Trailing ✕ close**, 24dp `role.onAppBar`, at x=320 — dismisses the whole Resources stack back to the hub. |
| 2 | 64 / 56 | **Filters bar with Search** (`139:63447`, component `139:63691`) | Full spec in §5. Fill `role.background`, 1dp `role.line` bottom hairline. |
| 3 | 120 / auto | **Form Layout → list** (`139:63458`) | x=16, w=328, `space.listGap` **4dp** between rows. 5 × `action item icon` rows: **first 118dp** (2-line title), rest **98dp** (1-line title). 16dp top pad. |
| 4 | bottom / 72 | **Footer** (`139:63466`) | 1dp `role.line` top divider + **`secondary with icon`** button 328×40, `radius.xl` 20dp, fill `role.surface`, 1dp `role.action` border, **no shadow**. Leading 20dp eye icon + label **"See more resources"** — `typescale.button` in `role.action`. |

**`action item icon` row recipe** (component `139:63846`, 328×118 / 98):

```
┌ 328 × 98 (118 when the title wraps), radius.md (10), fill role.background ───────────┐
│ 16dp padding                                                                          │
│ Title …………………………………………………………………………………………………           typescale.h4 / role.textDark │
│ Description line 1 ……………………………………………………………………          typescale.help / role.textMid │
│ Description line 2 (clamped, ellipsis) ……………………………                                    │
│                                        [👍 12]                                    ›   │
│                                     like badge, right-aligned      24dp chevron-right │
└───────────────────────────────────────────────────────────────────────────────────────┘
```

- Title: `typescale.h4`, `role.textDark`, max 2 lines.
- Description: `typescale.help`, `role.textMid`, clamped to 2 lines.
- **Like badge**: 28dp pill (`size.badgeHeight`), `radius.xxl`, 12dp horizontal padding,
  16dp (`size.iconXs`) white thumb-up glyph + 4dp gap + count in `typescale.captionMedium`,
  `role.onAction` (white). Fill = `status.success.main` when `like_count > 0`,
  `status.info.main` when `like_count == 0`.
- Trailing chevron-right: 24dp (`size.iconLg`), `role.textDark`, right-aligned at x=288.
- Whole row is one 48dp+ touch target → opens `RES-DET`.

---

### 3.6 `RES-LIST-TYPE` — list filtered by type (`139:63734`)

Deltas from §3.5 only:

1. **App bar** becomes a *Title with subtitle*: title **"Activities"** (`typescale.h3`,
   `role.onAppBar`), subtitle **"Classroom resources"** (`typescale.help`, `role.textLight`).
   ✕ close retained.
2. **Filter bar** drops the `Type ⌄` chip. Remaining: `Data free ⌄`, `Liked ⌄`, plus the active
   `filtered` chip (e.g. "Most liked").
3. A **Page Title** (`139:63747`) **"Activities"** — `typescale.h2`, `role.textDark`, x=16,
   16dp above / 16dp below — sits between the filter bar and the list.
4. `139:63821` is a byte-identical duplicate placed in the "Viewing a resource" column; ignore.

---

### 3.7 `RES-LIST-LONG` / `RES-LIST-END` / `RES-LIST-ALT`

| Variant | Node | Delta |
|---|---|---|
| `RES-LIST-LONG` | `139:63791` | 10 rows, mixed 118dp/98dp. Demonstrates both like-badge colours in one list (a green "15" and a blue "0"). Footer **"See more resources"** present. |
| `RES-LIST-END` | `139:63759` | 15 rows. **Footer button absent** — the only signal that pagination is exhausted. Do not render a disabled button; remove it. |
| `RES-LIST-ALT` | `139:63469` | 5 × 98dp rows, filter bar carries **3 trigger chips and no active `filtered` chip** — the pristine state before any filter or explicit sort is chosen. Use this as the initial render if the product decides not to show a default sort chip. |

---

### 3.8 `RES-LIST-RED` — reduced-functionality list (`139:63607`)

Deltas from §3.5:

1. Filter chips are `Type ⌄`, `Data free ⌄`, `Sort ⌄` — **no `Liked ⌄` chip**.
2. Rows are uniform **98dp**, title + 2-line description + chevron. **No like badge is rendered
   at any count.**
3. Footer `secondary with icon` "See more resources" unchanged.
4. **Row tap does not open a detail screen** — it resolves to the external URL, interposing
   `RES-DLG-DATA` when `data_free == false`.

---

### 3.9 `RES-DET-FREE` / `RES-DET-PAID` — resource detail, WO6.2.6 (`139:63543` / `139:63574`)

One screen, two orthogonal state axes (**data-free**, **liked**). Build top-to-bottom:

| # | h | Component | Spec |
|---|---|---|---|
| 1 | 64 | **App bar — Title** | Fill `role.appBar`; back chevron 24dp `role.onAppBar` x=16; centred resource title (`typescale.h3`, `role.onAppBar`, single line, ellipsised); ✕ close 24dp `role.onAppBar` x=320. |
| 2 | 74 | **Language selector** (`139:63545`) | Height `size.languageSelector` **74dp**, fill `role.background`, 1dp `role.line` bottom divider, 16dp gutter. Left: label **"Change Language:"** — `typescale.help`, `role.textDark`. Right: **chip**, 100×40 (`size.chipHeight`), `radius.md` **10dp**, fill `role.action`, label **"English"** `typescale.chipActive` in `role.onAction` + 24dp chevron-down in `role.onAction`. Tapping opens a language menu (menu itself not designed — see §6). |
| 3 | auto | **Page Title** | Resource title repeated — `typescale.h2`, `role.textDark`, x=16, w=328. 16dp above / 8dp below. |
| 4 | 28 | **Badges row** (`139:63556`) | x=16, horizontal, 8dp gap. **(a) Type badge**: 28dp pill, `radius.xxl`, 12dp h-padding, fill `category.<type>.tint`, label `typescale.captionMedium` in `role.textDark`. **(b) Like badge**: 28dp pill, 16dp white thumb-up + count text `typescale.captionMedium` in `role.onAction`; fill `status.info.main` for "0 likes", `status.success.main` for "1 like" / any count > 0. Pluralise the word "like". |
| 5 | auto | **Short description** | `typescale.help`, `role.textMid`, x=16, w=328. 8dp below badges. |
| 6 | 52 / 72 | **Status banner** — *pick exactly one* | x=16, w=328, `radius.md` **10dp**, 16dp padding, 20dp (`size.iconSm`) leading icon + 12dp gap. **Data free (`139:63562`, `Success`, 52dp):** fill `status.success.bg`, check-circle icon `status.success.main`, text **"This resource is data free!"** in `typescale.helpStrong`, `status.success.dark`. **Not data free (`139:63592`, `Alert`, 72dp):** fill `status.alert.bg`, exclamation-circle icon `status.alert.main`, text **"This resource is not data free. Going to this link will use your data."** in `typescale.helpStrong`, `status.alert.dark`, wraps to 2 lines. |
| 7 | 40 | **Primary button — `primary with icon`** | 328×40, `radius.xl` 20dp, fill `role.action`, `elevation.button`. 20dp link/chain icon + 8dp gap + **"See resource"** in `typescale.button`, `role.onAction`. **Opens the external URL and leaves the app.** 16dp above and below. |
| 8 | auto | **Long description** (`139:65364` → `139:63564`) | x=16 (drawn 320 wide in Figma; use 328), `typescale.body`, `role.textMid`. |
| 9 | 1 | **Dashed divider** (`list`, `139:63566`) | x=16, w=328, 1dp `role.line`, **dashed**. 16dp above/below. |
| 10 | 149 | **Like block** (`139:63567`) | x=16, w=328. **(a)** Heading **"Was this link helpful?"** — `typescale.h4`, `role.textDark`. **(b)** 4dp gap, help text **"You can like it to let other ECD Heroes know."** — `typescale.help`, `role.textMid`. **(c)** 12dp gap, **Select card** 328×56, `radius.md` 10dp — see states below. |
| 11 | 1 | **Dashed divider** | as row 9. |
| 12 | 40 | **Secondary button** | 328×40, `radius.xl` 20dp, fill `role.surface`, 1dp `role.action` border, no shadow. 20dp share/paper-plane icon + **"Share resource"** in `typescale.button`, `role.action`. 16dp bottom margin. |

**Select card states (row 10c)**

| State | Fill | Border | Checkbox | Label | Trailing |
|---|---|---|---|---|---|
| **Unliked** | `role.background` | none | 24dp square, `radius.alertButton` 4dp, 2dp `role.textLight` border, empty | "Like this resource" — `typescale.body`, `role.textMid` | none |
| **Liked** | `role.actionSubtle` | 2dp `role.action` (`size.focusRing`) | 24dp square filled `role.action`, white tick `role.onAction` | "You liked this resource" — `typescale.body`, `role.textDark` | 20dp thumb-up in `role.action` at x=288 |

Checkbox inset 16dp from the card's left edge, 12dp gap to the label; whole card is the touch
target (56dp ≥ `size.touchTarget`).

**Interaction:** tapping the card toggles the like optimistically — recolour the card, swap the
label, and update the badges-row like badge (count ±1, fill `status.info.main` ⇄
`status.success.main`) in the same `motion.durationFast` (150ms) frame. Reconcile with the server
response; on failure revert and show a snackbar.

---

### 3.10 `RES-DLG-DATA` — data-free warning dialog (`139:63541`)

```
┌ scrim: role.scrim, full-screen ───────────────────────────────────────────┐
│                                                                           │
│      ┌ 328 × 330,  role.surface,  radius.xl (20),  elevation.dialog ─┐    │
│      │  16dp padding · 24dp top                                       │   │
│      │                     ◍ 48dp                                     │   │
│      │        filled exclamation-circle, status.alert.main            │   │
│      │                                                                │   │
│      │        This link is not data free.                             │   │
│      │        Do you want to continue?          typescale.h3          │   │
│      │                                          role.textDark, centred│   │
│      │                                                                │   │
│      │        Going to the website will use     typescale.body        │   │
│      │        your data.                        role.textMid, centred │   │
│      │                                                                │   │
│      │   ┌ 296 × 40  role.action  radius.xl ────────────────────┐    │   │
│      │   │  ⧉  Yes, go to website        typescale.button /      │    │   │
│      │   │                               role.onAction           │    │   │
│      │   └───────────────────────────────────────────────────────┘    │   │
│      │                    space.buttonGap = 16dp                       │   │
│      │   ┌ 296 × 40  role.surface, 1dp role.action border ───────┐    │   │
│      │   │  ✕  No, cancel                typescale.button /       │    │   │
│      │   │                               role.action             │    │   │
│      │   └───────────────────────────────────────────────────────┘    │   │
│      └────────────────────────────────────────────────────────────────┘   │
└───────────────────────────────────────────────────────────────────────────┘
```

- Card width `size.dialogWidth` **328dp**; button width `size.dialogContentWidth` **296dp**.
- Icon `size.iconXl` **48dp**, glyph white on a `status.alert.main` disc.
- Buttons stacked, primary above secondary, `space.buttonGap` 16dp.
- Enter/exit: fade + 4% scale over `motion.durationBase` 250ms, `motion.easingStandard`.
- Dismiss on scrim tap and on system Back = same as **"No, cancel"** (no navigation).

---

## 4. Component reference cards on this page

| Component | Node | Notes for the library |
|---|---|---|
| `Filters bar with Search` | `139:63691` | 360×56 — the canonical bar; §5. |
| `action item icon` | `139:63846` | 328×118 — the resource row; §3.5. |
| `Badges` (type) | `139:63847`–`139:63850` | 80/65/107/55 × 28. Widths are content-hugged, not fixed. |

---

## 5. Filters & search pattern

### 5.1 Filter bar (`CMP-FLT-BAR`, `139:63691`; instance `139:63447`)

```
 0                                                                        360
┌──────────────────────────────────────────────────────────────────────────┐
│ 20dp │ (🔍) │ 12dp │ [ Type ⌄ ] [ Data free ⌄ ] [ Liked ⌄ ] [ Most liked ]│ →scroll
│  40dp round                    ← "Dropdowsn wrap" 139:63452, inner        │
│  search button                    Filters frame is 491dp wide             │
└──────────────────────────────────────────────────────────────────────────┘
  height size.filterBar = 56dp · fill role.background · 1dp role.line bottom hairline
```

- **Search button**: 40dp circle, `radius.full`, fill `role.select`, 20dp white magnifying-glass
  glyph in `role.onSelect`. Left inset **20dp**. Wrap in a 48dp touch target. Tapping expands the
  in-header search field (pattern from `components.md` §12 — not drawn on Page 19; §6 gap).
- **Chip row**: 40dp-tall chips (`size.chipHeight`), 8dp gaps, **horizontally scrollable** — the
  inner frame measures 491dp against a 360dp viewport, so overflow scroll is mandatory, never
  wrap.
- The bar is **sticky** directly under the app bar; the list scrolls beneath it.

### 5.2 Trigger chip states

| State | Fill | Border | Label | Chevron |
|---|---|---|---|---|
| **Closed / resting** | `role.surface` | 1dp `role.line` | `typescale.chip`, `role.textDark` | 24dp chevron-down, `role.textDark` |
| **Open / focused** (`139:63704`, `139:63719`) | `role.actionSubtle` | **2dp** `role.action` (`size.focusRing`) | `typescale.chipActive`, `role.textDark` | chevron-**up**, `role.action` |
| **Applied / `filtered`** (`139:63456`) | `role.action` | none | `typescale.chipActive`, `role.onAction` | 24dp chevron-down, `role.onAction` |
| **Disabled** *(not drawn — inferred)* | `role.background` | 1dp `role.line` | `role.textLight` | `role.textLight` |

- Geometry: `radius.md` **8dp in Figma → use `radius.md` (10dp)**, 16dp horizontal padding,
  4dp label→chevron gap, `elevation.sm`.
- Widths are content-hugged. Measured: `Type` 85, `Data free` 114, `Liked` 88, `Sort` 81,
  `Most liked` (applied) 120.
- **Applied chips are additive**: the trigger chip stays in the row *and* an extra solid
  `filtered` chip is appended showing the applied value. On `RES-LIST-ALT` (`139:63469`) no value
  has been applied, so only the three triggers show.
- Transition between states: `motion.durationFast` 150ms.

### 5.3 Dropdown menu anatomy

```
 anchor = the trigger chip · menu opens directly BELOW it, left-aligned to the 16dp gutter
┌ 328 wide · role.surface · radius.md · elevation.dropdown ───────────────┐
│ ┌ header 48dp ───────────────────────────────────────────────[Badge]─┐  │
│ │ 16dp  Filter by: **Type**                                          │  │
│ └────────────────────────────────────────────────────────────────────┘  │
│ ────────────────────── 1dp role.line hairline ───────────────────────── │
│ ┌ filter item 48dp ──────────────────────────────────────────────────┐  │
│ │ 16dp  ⦿24  12dp  Activities                                        │  │  ← active
│ ├────────────────────────────────────────────────────────────────────┤  │
│ │ 16dp  ⦿24  12dp  Stories                                           │  │
│ │ 16dp  ⦿24  12dp  Teaching tips                                     │  │
│ │ 16dp  ⦿24  12dp  Other                                             │  │
│ └────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
   total height = 48 (header) + 1 + N × 48 (size.filterItem) + 8dp v-padding
```

- **Header** (48dp): 16dp padding. Text is a single run — "Filter by: " in
  `typescale.help`/`role.textMid` + the facet name in `typescale.helpStrong`/`role.textDark`.
  The Sort menu's header is simply **"Sort by:"** with no bold tail.
  A **hidden `Badges` slot** exists at the header's right (`139:63710`, `139:63725`) — reserved
  for an "N selected" count; do not build unless the product asks for multi-select.
- **`filter item` rows** (`size.filterItem` **48dp** each, full-bleed):
  - Leading 24dp (`size.iconLg`) **filled circular check** at 16dp inset, 12dp gap to the label.
  - **Active** (`139:63713`): check fill `role.action`, tick `role.onAction`; label
    `typescale.helpMedium` (semibold weight) in `role.textDark`.
  - **Inactive**: check fill `role.textLight`, tick `role.surface`; label `typescale.help` in
    `role.textMid`.
  - Row press state: `role.background` fill.
- **Behaviour**: single-select per menu. Selecting a row **closes the menu immediately**,
  re-queries the list, and updates/creates the solid `filtered` chip. Selecting the already-active
  row **clears** that facet and removes its `filtered` chip.
- **Dismiss**: tap outside, tap the trigger again, or system Back. Open/close animation
  `motion.durationBase` 250ms with `motion.easingDecelerate`.
- Menus never exceed the viewport; if `N × 48 + 49` would overflow, the item list scrolls
  internally.

### 5.4 Menu option lists

| Menu | Node | Height | Header | Options (in order) |
|---|---|---|---|---|
| **Type** | `139:63703` | 328×294 | "Filter by: **Type**" | Activities · Stories · Teaching tips · Other *(Activities shown active)* |
| **Data free** | `139:63733` | 328×198 | "Filter by: **Data free**" | Data free · Not data free |
| **Liked** | `139:63702` | 328×198 | "Filter by: **Your liked resources**" | Liked · Not liked |
| **Sort** | `139:63718` | 328×294 | "Sort by:" | Most liked · Newest · Oldest · Title |

Notes:
- The **Type** option list is the *Classroom* taxonomy. Business swaps in Finances / Marketing,
  recruitment & communication / Safety, hygiene & nutrition / Other; Community uses its own set.
  **Drive the option list from the portal taxonomy, not from a hard-coded enum.**
- The Type menu is **absent** on `RES-LIST-TYPE` (type already fixed by navigation).
- The Liked menu is **absent** in the reduced build (`RES-LIST-RED`), which instead exposes the
  `Sort ⌄` trigger directly.
- Default sort is **Most liked** (it is the value rendered in the applied chip on `RES-LIST`).

---

## 6. Dialogs & popups

| Overlay | Node | Trigger rule | Dismissal |
|---|---|---|---|
| **Data-free warning dialog** (`RES-DLG-DATA`) | `139:63541`, note `139:63542` | Shown **only when the resource's `data_free` flag is false** — "a field entered on the portal" (verbatim note). In the **reduced-functionality** build it is interposed between the list-row tap and the external navigation. In the **full** build the equivalent warning is the inline orange Alert banner on `RES-DET-PAID`, and **no dialog is shown**. | "Yes, go to website" → open URL, dismiss. "No, cancel" / scrim tap / Back → dismiss with no navigation. |
| **Filter dropdown menus** | `139:63703`, `139:63733`, `139:63702`, `139:63718` | Popover, not modal — anchored to a trigger chip. §5.3. | Selection, outside tap, trigger re-tap, Back. |
| **Language menu** | *(not designed)* | Would be triggered by the "English ⌄" chip on the detail screen. | — |

**Gaps flagged here:**
- The **language menu** behind the detail screen's language chip is not designed. Build it as a
  standard `Select/dropdown` (`role.surface`, `radius.md`, `elevation.dropdown`, 48dp options,
  selected option `role.selectSubtle` + check) until the designer supplies one.
- The **expanded search field** behind the magenta search button is not designed on Page 19.
- No confirmation is specified for the app bar's **✕ close**; on a list/detail there is nothing to
  discard, so plain dismissal is safe.
- No **error / offline** state is drawn for a failed resource fetch or a failed like.

---

## 7. States & edge cases

| # | State | Where | Rendering |
|---|---|---|---|
| 1 | **Empty / coming soon** | hub | `RES-HUB-CL-EMPTY` (`139:63631`), `RES-HUB-BZ-EMPTY` (`139:63657`). "Resources coming soon!" + COMING SOON illustration. Type cards **and** footer button suppressed. Triggered when the area has 0 published resources. |
| 2 | **Empty after filtering** | list | *Not designed.* Reuse the `Simple/Mobile` empty block with copy "No resources match your filters" + a `secondary` "Clear filters" button. Keep the filter bar visible so the user can undo. **Flag to designer.** |
| 3 | **First page** | list | 5 rows + footer "See more resources" (`RES-LIST`). |
| 4 | **More pages available** | list | `RES-LIST-LONG` — footer retained after append. |
| 5 | **End of results** | list | `RES-LIST-END` — footer button **removed** entirely. |
| 6 | **Pristine (no filter/sort applied)** | list | `RES-LIST-ALT` — three trigger chips, no solid `filtered` chip. |
| 7 | **Unliked** | row + detail | Like badge fill `status.info.main`, text "0 likes". Select card: `role.background`, empty checkbox, `role.textMid` label "Like this resource". |
| 8 | **Liked** | row + detail | Like badge fill `status.success.main`, text "1 like" / "15". Select card: `role.actionSubtle` fill, 2dp `role.action` border, filled cyan checkbox with white tick, `role.textDark` label "You liked this resource", trailing thumb-up in `role.action`. |
| 9 | **Data free** | detail | Green `Success` banner (`status.success.bg` / `.main` / `.dark`), 52dp. No dialog anywhere. |
| 10 | **Not data free** | detail | Orange `Alert` banner (`status.alert.bg` / `.main` / `.dark`), 72dp, 2 lines. Non-blocking — "See resource" still navigates directly. |
| 11 | **Not data free, reduced build** | list | `RES-DLG-DATA` blocks navigation until the user confirms. |
| 12 | **Reduced-functionality build** | list | `RES-LIST-RED` — no like badges, no Liked filter, no detail screen, row taps go straight out. This is a **build-level flag**, not a per-user state. |
| 13 | **Type pre-filtered** | list | `RES-LIST-TYPE` — title = type, subtitle = area, Type chip removed, in-page Page Title added. |
| 14 | **Returning from the external link** | detail | The user lands back on the *same* detail screen with scroll position preserved and the like affordance still available (comment `139:63518`). Do **not** pop the back stack when launching the browser. |
| 15 | **Offline** | all | Per `patterns/offline-first.md`: never block. Serve cached list/detail; disable "See resource" is **forbidden** — warn and allow. Queue like toggles and replay on reconnect. |
| 16 | **Like fails / conflicts** | detail | Revert the optimistic toggle, restore the previous count and badge colour, show a snackbar. |
| 17 | **Community area** | hub | Design missing; ship the Classroom pattern with the community taxonomy, or the empty state if the link set is trivially small. |
| 18 | **Long titles** | rows | Row grows 98 → 118dp when the title wraps to 2 lines. Description always clamps to 2 lines with ellipsis. |

---

## 8. Business rules for back-end devs

### 8.1 Resource entity

| Field | Type | Notes |
|---|---|---|
| `id` | uuid | |
| `tenant_id` | uuid | Multi-tenant scoping; resources never cross tenants. |
| `area` | enum | `classroom` \| `business` \| `community`. Drives which hub/tab surfaces it. |
| `type_id` | uuid → `resource_type` | The category (Activities / Stories / … ). Drives the type badge, the hub card and the Type filter. |
| `title` | string | Row title and detail Page Title; may wrap to 2 lines. |
| `short_description` | string | Row description (clamped to 2 lines) and the detail short description. |
| `long_description` | text | Detail body only. |
| `url` | url | External destination. Opened in the system browser — **the app is left**. |
| `data_free` | bool | **Entered on the admin portal** (verbatim note `139:63542`). Drives the Success/Alert banner and the `RES-DLG-DATA` gate. Must never be null — default `false` (warn) if unknown, i.e. fail safe toward warning the user. |
| `language` | enum/locale | Resources are language-variant; see §8.6. |
| `published_at` / `created_at` | timestamp | Feeds the *Newest* / *Oldest* sorts. |
| `like_count` | int | Denormalised counter, see §8.4. |
| `liked_by_me` | bool | Per-request, per-user projection. Drives the Liked filter and both like UIs. |
| `sort_order` | int | Optional portal-controlled manual ordering. |

`resource_type` rows carry: `id`, `area`, `label`, `ramp_position` (1–4, maps to
`category.activities` / `category.stories` / `category.teachingTips` / `category.other`),
`icon_key`. **Do not hard-code the four Classroom types** — the Business list already differs and
Community's is unknown.

### 8.2 Data each screen needs

| Screen | Request | Response |
|---|---|---|
| `RES-HUB-*` | `GET /areas/{area}/resource-types` | Ordered types with `label`, `ramp_position`, `icon_key`, plus `resource_count`. **Empty array ⇒ render the "Resources coming soon!" state** and suppress the footer button. |
| `RES-LIST` | `GET /resources?area=&type_id=&data_free=&liked=&sort=&cursor=&limit=` | `items[]` (id, title, short_description, like_count, liked_by_me, type_id) + `next_cursor`. **`next_cursor == null` ⇒ client removes the "See more resources" footer** (`RES-LIST-END`). |
| `RES-DET` | `GET /resources/{id}?lang=` | Full record incl. `long_description`, `data_free`, `like_count`, `liked_by_me`, `available_languages[]`. |
| like toggle | `POST /resources/{id}/like` · `DELETE /resources/{id}/like` | Returns the authoritative `{ like_count, liked_by_me }`. |

### 8.3 Filtering, sorting and pagination

- Facets are **single-select and independent**: `type_id`, `data_free` (`true`/`false`/unset),
  `liked` (`true`/`false`/unset). Re-selecting the active option **clears** that facet.
- `sort` ∈ `most_liked` | `newest` | `oldest` | `title`. **Default `most_liked`** — the server
  should echo the effective sort so the client can render the applied `filtered` chip on first
  load.
- Free-text `q` (search button) filters `title` + `short_description`; combine with facets using
  AND.
- Pagination is cursor-based, page size 5 on first load in the design (10 and 15 in the long
  variants) — treat page size as server-controlled, client just follows `next_cursor`.
- The **Type facet must be omitted from the filter bar** when the client entered via a type card;
  the server still receives `type_id`.
- The **Liked facet must not be offered** in the reduced-functionality build.

### 8.4 Likes

- A like is a **(user_id, resource_id) unique row** — one like per user per resource, no unlike
  limit, freely toggleable.
- `like_count` is a denormalised counter maintained transactionally with the like row; it is the
  only value the list needs (the list must not N+1 into a likes table).
- The endpoints must be **idempotent**: `POST` on an existing like returns 200 with the unchanged
  count; `DELETE` on a missing like likewise. This is required because the client queues toggles
  while offline and may replay them.
- Offline replay ordering: last-write-wins per (user, resource) — collapse a queue of toggles to
  its final state before sending.
- Badge colour is derived purely from the count: `> 0` → `status.success.main`, `== 0` →
  `status.info.main`. There is **no** separate "you liked it" colour on the badge; personal state
  is shown only by the Select card.
- Likes are **cross-user visible and non-anonymous in aggregate only** — no "who liked this" list
  is designed; do not expose liker identities.
- In the reduced-functionality build the client neither reads nor writes likes; the API should
  still return `like_count` harmlessly.

### 8.5 Data-free gating

- `data_free` is a **portal-entered boolean on the resource**, not derived from the URL.
- Full build: `true` → green Success banner; `false` → orange Alert banner. Navigation is never
  blocked.
- Reduced build: `false` → blocking dialog before navigation; `true` → navigate immediately.
- The flag must be present in the **list** payload too, so the reduced build can decide whether
  to raise the dialog without a detail fetch.
- If the tenant/network is on a zero-rated bundle the flag still governs the copy — do not
  suppress it client-side.

### 8.6 Language

- The detail screen exposes **"Change Language:"** with a current-language chip. The API must
  return `available_languages[]` for the resource and accept `?lang=`.
- If only one language exists, the selector should still render but be non-interactive (design
  does not specify — flag).
- Language selection is per-resource, not a global app setting change.

### 8.7 Permissions and roles

- **Practitioner** and **Principal** both see Classroom and Community resources. **Business >
  Resources** is tied to the Business area, which in the ELP model is Principal-scoped — gate the
  Business tab by role, not the resource records themselves.
- **Coach** (WL app) sees the resources of the sites they support, read-only; likes should still
  be permitted (a coach is an "ECD Hero" for the purposes of the like copy) — **confirm with
  product**.
- Publishing, typing, tagging, URL and `data_free` entry are **portal-only** (admin/tenant-admin);
  no mobile client ever writes a resource record.
- All queries are tenant-scoped; a resource is visible only within its `tenant_id` unless the
  portal marks it as a platform-wide (OA) resource.

### 8.8 Offline

- List and detail payloads are cached (per `patterns/offline-first.md`). Like toggles queue.
- External-link navigation while offline: allow it — the browser shows its own error. Do **not**
  pre-empt with a blocking dialog; the only blocking dialog in this feature is the data-free one.

---

## 9. Designer notes carried forward

Verbatim from the Page 19 canvas. These are constraints, not commentary.

> **`139:63508`** — "Classroom > Resources"

> **`139:63510`** — "User taps “See all classroom resources”"

> **`139:63512`** — "User taps one of the resource types, e.g. “Activities” Replace title with type"

> **`139:63514`** — "Business > Resources"

> **`139:63516`** — "Community > Resources Same as SS & GG, limited set of links out (unless we
> think we are going to have a much bigger set of community resources?) (I am not sure what
> happened to this page design, seems it was accidentally deleted, will track it down)"

> **`139:63518`** — "Viewing a resource When users tap resource, open up new page with a bit more
> info; when user taps “See this resource” then they are taken out of the app to that link -- when
> they return to the app, they’ll still be on this page & can “like” the resource if they found it
> useful."

> **`139:63542`** (free text, above the dialog) — "ONLY to be shown if the link is not datafree (a
> field entered on the portal)"

> **`139:63606`** — "IF we don’t implement the functionality to the left, here is an alternative
> (remove the ability to like resources) Show the activities, no option to “like” or show # of
> likes Clicking the link opens up the resource link; IF it’s not data free, then show pop-up
> first."

> **`139:63630`** (free text) — "Please estimate the full functionality & if we need to pull back,
> we can implement this instead."

> **`139:63758`** (free text) — "Reduced functionality in case the requirements take too long to
> develop. I will update the use cases if we decide to go this route."

### 9.1 The reduced-functionality fallback decision — what it binds

The fallback is an **explicit, pre-authorised de-scope**, not a design alternative to be chosen on
taste. Engineering must **estimate the full build first** (`139:63630`); if the estimate is too
large, ship `RES-LIST-RED` + `RES-DLG-DATA` and the designer will rewrite the use cases
(`139:63758`). Practical consequences:

1. Keep the like feature behind a single build/remote flag so the fallback is a configuration, not
   a fork.
2. In the fallback, the **detail screen disappears entirely** — the list row is the only
   affordance and it links straight out. Do not ship a detail screen without likes.
3. The data-free warning **moves** from an inline banner to a blocking dialog in the fallback.
   Both must exist in the codebase.

### 9.2 Flagged design bugs and gaps

| # | Issue | Impact |
|---|---|---|
| 1 | **Community > Resources design is missing** — "accidentally deleted" (`139:63516`). | No hub/taxonomy for the community area. Build from Classroom; get the taxonomy confirmed. |
| 2 | The list frames are still named **"WO6.1.4 Choose small group activity"** and the detail **"WO6.2.6 View story"** — leftovers from the activity-picker flow. | Frame names must not be used as screen identifiers; use the codes in §2. |
| 3 | Hub frames are named **"WO2.2.0 Children dashboard"** and **"WO7.4.0 Money dashboard - empty"** — the Business hub's name says "empty" although it is the populated variant. | Same as above. |
| 4 | **`139:63821` duplicates `139:63734`** on the canvas. | One screen, not two. |
| 5 | Dropdown-wrap layer is misspelled **"Dropdowsn wrap"** (`139:63452`). | Cosmetic; rename in Figma. |
| 6 | **Corner radii deviate from the token scale**: hub cards drawn at 12dp, list rows and chips at 8dp, dropdowns at 8dp. | Snap to `radius.md` (10dp) everywhere and have the designer confirm; do not introduce 8dp/12dp tokens. |
| 7 | The detail-screen **type badge is drawn in `palette.quaternaryAccent1`**, one step darker than `category.activities.tint`. | Bind badges to `category.<type>.tint` for consistency with the hub cards; raise the discrepancy. |
| 8 | The **`category.*` token keys are Classroom-specific** (activities/stories/teachingTips/other) but the same ramp is reused for Business and Community types. | Either rename to `category.ramp1…4` or add area-specific aliases. Do not fork the palette. |
| 9 | Hidden **`Badges` slot in every dropdown header** (`139:63710`, `139:63725`). | Reserved for multi-select counts; multi-select is **not** specified. Don't build it. |
| 10 | Hidden `Simple striped/Mobile` tables on the Business hub (`139:63529`, `139:63667`). | Dead layers — ignore. |
| 11 | No **empty-after-filter**, **error**, **offline** or **loading** states are drawn for the list. | Specified as inferred defaults in §7; needs designer sign-off. |
| 12 | The **language menu** and the **expanded search field** are not drawn. | See §6. |
| 13 | Hub uses **8dp** list gaps, the resource list uses **4dp** (`space.listGap`). | Both are legitimate per `tokens.json`; document per-screen rather than "fixing" one. |
| 14 | On `RES-LIST` the **subtitle-less app bar** is a plain Title, but `RES-LIST-TYPE` uses Title-with-subtitle. | Use one app-bar component with an optional subtitle slot. |
| 15 | **No PNG assets on disk** — `design-system/assets/screens/page19-resources/` is empty because the extraction environment's proxy blocked `www.figma.com`. | Re-run the export from an unrestricted network. Deep-links in §2 are the interim reference. |
