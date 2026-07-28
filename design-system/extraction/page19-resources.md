# Page 19 — Resources Screens

Figma file: `8s2xe3EyBRhrzDFy93NbfN` · Page node: `139:63406` ("Page 19")
Extracted: 2026-07-27

## Page overview

Page 19 documents the **Resources** feature across three app areas: Classroom > Resources, Business > Resources and Community > Resources, plus the resource list ("WO6.1.4 Choose small group activity" frames repurposed as "Classroom resources"), the resource detail view ("WO6.2.6 View story"), the filter/sort dropdown system, the data-usage warning dialog, and a designer-annotated "reduced functionality" fallback branch on the far right of the canvas. All screens are 360dp-wide mobile frames. Two large `Header` section banners (139:63492, 139:63845) span the canvas.

## Flow map

1. **Hub** — Classroom > Resources tab (`139:63493`, WO2.2.0): 4 resource-type cards (Activities, Stories, Teaching tips, Other) + bottom pill button "See all classroom resources". Empty state (`139:63631`): "Resources coming soon!".
2. **See all** — comment `139:63510`: user taps "See all classroom resources" → full list "Classroom resources" (`139:63445`) with search + filter chips (Type / Data free / Liked / active-sort chip).
3. **Filtered by type** — comment `139:63512`: user taps a type card, e.g. "Activities" → list (`139:63734`) where the page title is replaced with the type ("Activities", header subtitle "Classroom resources") and the Type chip is removed from the filter bar.
4. **Filter/sort** — tapping a filter chip opens an inline dropdown menu (`139:63703` Filter by: Type, `139:63733` Filter by: Data free, `139:63702` Filter by: Your liked resources, `139:63718` Sort by:). Long/filtered result variants: `139:63791` (10 items), `139:63759` (15 items, no footer button).
5. **Resource detail** — comment `139:63518`: tapping a resource opens a detail page (`139:63543` / `139:63574`, WO6.2.6). Tapping "See resource" takes the user **out of the app** to the external link; when they return they are still on this page and can **"like" the resource** if they found it useful ("Like this resource" checkbox → checked state "You liked this resource", like-count badge turns from blue `0 likes` to green `1 like`).
6. **Data-free gate** — if the resource link is *not* data free (a field entered on the portal), a warning is shown: on the detail page as an orange alert banner ("This resource is not data free. Going to this link will use your data."); in the reduced-functionality fallback as a pre-navigation dialog (`139:63541`): "This link is not data free. Do you want to continue?" (note `139:63542`).
7. **Business > Resources** (comment `139:63514`) — same hub pattern (`139:63519`) with types Finances / Marketing, recruitment & communication / Safety, hygiene & nutrition / Other; empty state `139:63657`.
8. **Community > Resources** (comment `139:63516`) — same pattern as SS & GG, a limited set of links out; the page design was accidentally deleted (see designer notes).
9. **Fallback branch** (`139:63607` + notes `139:63758`, `139:63630`, `139:63606`) — reduced functionality: no likes shown, no Liked filter (chips: Type / Data free / Sort); clicking a list item opens the resource link directly, showing the data-free dialog first when needed.

## Screen inventory

| Node ID | Name | Size (dp) | Purpose |
|---|---|---|---|
| 139:63493 | WO2.2.0 Children dashboard | 360×640 | Classroom > Resources hub (4 type cards + See-all button) |
| 139:63631 | WO2.2.0 Children dashboard | 360×640 | Classroom > Resources empty state ("Resources coming soon!") |
| 139:63519 | WO7.4.0 Money dashboard - empty | 360×640 | Business > Resources hub (Finances / Marketing / Safety / Other) |
| 139:63657 | WO7.4.0 Money dashboard - empty | 360×640 | Business > Resources empty state |
| 139:63445 | WO6.1.4 Choose small group activity | 360×738 | Classroom resources full list, 5 items, all filter chips (incl. active sort chip) |
| 139:63734 | WO6.1.4 Choose small group activity | 360×787 | List filtered by type ("Activities" page title; Type chip removed) |
| 139:63791 | WO6.1.4 Choose small group activity | 360×1317 | Long filtered list (10 items) + "See more resources" |
| 139:63759 | WO6.1.4 Choose small group activity | 360×1791 | Longest list (15 items), no footer button (end of results) |
| 139:63469 | WO6.1.4 Choose small group activity | 360×718 | List variant, 3 chips (no active-filter chip), 5×98dp items |
| 139:63607 | WO6.1.4 Choose small group activity | 360×718 | Reduced-functionality list: no like badges, chips Type / Data free / Sort |
| 139:63543 | WO6.2.6 View story | 360×773 | Resource detail — data free (green Success banner), unliked (0 likes) |
| 139:63574 | WO6.2.6 View story | 360×788 | Resource detail — NOT data free (orange Alert), liked state (1 like) |
| 139:63691 | Filters bar with Search | 360×56 | Standalone filters-bar component reference |
| 139:63703 | filter open | 328×294 | Dropdown open: "Filter by: Type" (4 items, Activities active) |
| 139:63733 | filter open (instance) | 328×198 | Dropdown open: "Filter by: Data free" (2 items) |
| 139:63702 | filter open (instance) | 328×198 | Dropdown open: "Filter by: Your liked resources" (2 items) |
| 139:63718 | filter open | 328×294 | Dropdown open: "Sort by:" (Most liked / Newest / Oldest / Title) |
| 139:63541 | dialog card - overlay | 328×330 | Data-free warning dialog (with note 139:63542) |
| 139:63846 | action item icon | 328×118 | Standalone resource list-item component reference |
| 139:63847–63850 | Badges | 80/65/107/55 ×28 | Type badges: Activities / Stories / Teaching tips / Other |
| 139:63492, 139:63845 | Header | 7012×300 | Canvas section banners |

## Per-screen anatomy

### Resources hub — Classroom (139:63493, WO2.2.0)

Top-to-bottom on a white background, 360dp frame:
- **Title with subtitle** header (139:63494, 360×64): dark navy (Primary #27385A) bar, back arrow left, centred "Classroom" (white, Quicksand SemiBold) + subtitle "Monday, 12 June".
- **Tabs - principal** (139:63495, 56dp): Attendance | Progress | Activities | **Resources** (active tab in cyan #1DBADF with cyan underline; tab strip scrolls horizontally — instance is 455dp wide at x=-94).
- **Page Title** (139:63500): "What type of resource would you like to see?" — navy H2, Quicksand, 2 lines, 16dp margins (328 content).
- **Children list** (139:63501, 328 wide, 4 × 80dp `long action icon with icon and alert` cards, 8dp gaps):
  - **Activities** — pale-blue card bg, cyan (#1DBADF) 40dp circle with white puzzle-piece icon, navy label, navy chevron-right.
  - **Stories** — pale-pink card bg, magenta (Secondary #FF2180) circle with white open-book icon.
  - **Teaching tips** — pale-yellow card bg, yellow circle with white lightbulb icon.
  - **Other** — pale-green card bg, green (Success Main #83BB26) circle with white 4-dot grid icon.
  - Cards: 12dp corner radius, icon left (16dp inset), label next to it, chevron right.
- **Footer Form Layout** (139:63496, 72dp): full-width top divider + cyan pill button (`primary … with icon`, 328×40, radius 20): eye icon + "See all classroom resources" (white Quicksand SemiBold 14).

### Resources hub — empty state (139:63631)

Same header + tabs; content is `Simple/Mobile` empty state (139:63634, 360×284): centred navy bold text "Resources coming soon!" (139:63635) above a 110dp illustration (139:63636 `icon_file`): yellow circle with a green hanging "COMING SOON" sign. No footer button.

### Business > Resources hub (139:63519) and empty (139:63657)

Identical pattern to Classroom hub. Header: "Business / Monday, 7 December" with a cyan "?" help bubble right. Tabs - business (139:63528): Staff | Money | **Resources** (active cyan + underline). Cards: **Finances** (blue card, cyan clipboard-calculator icon), **Marketing, recruitment & communication** (pink card, magenta megaphone), **Safety, hygiene & nutrition** (yellow card, yellow shield-check), **Other** (green card, green dot-grid). Footer button "See all business resources". Empty variant (139:63657) shows the same "Resources coming soon!" block. (A hidden `Simple striped/Mobile` table 139:63529/139:63667 exists in the Layout frame.)

### Resource list (139:63445 "Classroom resources")

- **Header** (139:63446, 64dp): navy bar, back arrow, centred title "Classroom resources", white **X** close at right.
- **Filters bar with Search** (139:63447, 56dp, light UI Background #EFF6FA, bottom hairline): 
  - 40dp round **search button** (magenta/Secondary #FF2180 circle, white magnifying-glass icon), 20dp left inset.
  - Horizontally scrollable **Dropdowsn wrap** (139:63452; inner Filters frame is 491dp wide — wider than the 360 frame, confirming horizontal scroll): chips `Type ⌄` (85dp), `Data free ⌄` (114dp), `Liked ⌄` (88dp), plus active `filtered` chip "Most liked" (139:63456, 120dp, solid cyan). Chips are 40dp tall, white bg, hairline border, radius 8, navy 14sp text + chevron-down.
- **Form Layout** (139:63458): list at 16dp margins (328 content). 5 × `action item icon` cards, 4dp gaps: first card 118dp (2-line title), rest 98dp (1-line title). Card anatomy (see 139:63846): very light blue-grey bg (#EFF6FA family), radius 10, 16dp padding; navy semibold title (Inter/Quicksand mix, 16sp), grey (Text Mid #65727A) 2-line description 14sp, **like badge** pill right-aligned mid-card (thumb-up icon + count; green #83BB26 when count > 0, blue Info Main #1D67D5 when "0"), navy chevron-right far right.
- **Footer** (139:63466): white-bg outlined cyan pill button `secondary with icon` (328×40): eye icon + "See more resources" (cyan text, cyan 1dp border, radius 20).

### Resource list — filtered by type (139:63734)

Same as above except: header title "Activities" with subtitle "Classroom resources"; filter chips are `Data free ⌄`, `Liked ⌄`, active "Most liked" (no Type chip — type already chosen); an in-page **Page Title** "Activities" (139:63747, navy H2) sits above the list. 139:63821 is an identical copy placed in the "Viewing a resource" column.

### Resource list — long variants

- 139:63791: 10 cards (mix of 118dp two-line and 98dp one-line), like badges 15 (green) and 0 (blue), footer "See more resources".
- 139:63759: 15 cards, **no** footer button — terminal page of results.

### Reduced-functionality list (139:63607, fallback branch)

Chips: `Type ⌄`, `Data free ⌄`, `Sort ⌄` (no Liked). Cards are 98dp with title + 2-line description and chevron only — **no like badges**. Footer outlined "See more resources".

### Resource detail — WO6.2.6 View story (139:63543 data-free/unliked; 139:63574 not-data-free/liked)

Top-to-bottom:
- **Header** (64dp): navy bar, back arrow, resource title "Lorem ipsum dolor", X close.
- **Language selector** (139:63545, 74dp, light bg + bottom divider): label "Change Language:" (navy 14sp) + solid cyan chip "English ⌄" (100×40, white text, radius 8).
- **Page Title** "Lorem ipsum dolor" (navy H2 Quicksand, 16dp margins).
- **Badges row** (139:63556, 28dp): type badge "Lorem" (light-blue pill, Quaternary Accent 1 #8EDCEF, navy text) + like badge — unliked: blue #1D67D5 pill "👍 0 likes"; liked: green #83BB26 pill "👍 1 like" (white text, thumb-up icon).
- **"Short description"** (grey Text Mid 14sp).
- **Status banner** (328 wide, 16dp margins):
  - Data free (139:63562 `Success`, 52dp): light-green bg (Success BG #E6F1D4), green check-circle icon, green bold text "This resource is data free!" (Success Dark #5A8F02), radius 10.
  - Not data free (139:63592 `Alert`, 72dp): light-orange/peach bg, orange exclamation-circle icon, orange-red bold text "This resource is not data free. Going to this link will use your data."
- **Primary button** `primary with icon` (328×40, solid cyan #1DBADF pill): link/chain icon + "See resource" (white). Opens the external link (leaves the app).
- **Long description** (139:63564, 320 wide, grey Inter 14/20 body).
- **Dashed divider** (`list` 139:63566, 328×1).
- **Like block** (139:63567, 328×149): "Was this link helpful?" (navy H4 Quicksand) + help text "You can like it to let other ECD Heroes know." (grey) + **Select card** (328×56): unliked = light-grey card with empty checkbox + grey "Like this resource"; liked = light-cyan card with cyan border, checked cyan checkbox, navy "You liked this resource" + cyan thumb-up icon at right.
- **Dashed divider** + **secondary button** (328×40 outlined cyan pill): share/paper-plane icon + "Share resource".

### Data-free warning dialog (139:63541 `dialog card - overlay`, 328×330)

White rounded card (radius ~16) on dark scrim: centred orange (#F26B21-family) filled exclamation circle (40dp); navy centred title "This link is not data free. Do you want to continue?" (Quicksand SemiBold ~18); grey centred body "Going to the website will use your data."; solid cyan pill button "Yes, go to website" with external-link icon (white text); outlined cyan pill button "No, cancel" with X icon (cyan text). Note 139:63542 governs when it appears (see Designer notes).

## Filters & search pattern

- **Filters bar** (component ref 139:63691, 360×56): light bg #EFF6FA, hairline bottom border; 20dp left inset; 40dp magenta circular search button; then a horizontally scrollable row of 40dp-tall dropdown trigger chips (8dp-ish gaps; inner content may exceed 360dp).
- **Trigger chip (closed)**: white bg, 1dp light border (Primary Accent 2 #D4D7DE), radius 8, 16dp horizontal padding, navy 14sp label + 24dp chevron-down. Widths content-based (Type 85, Data free 114, Liked 88, Sort 81).
- **Trigger chip (open/focused)**: light-cyan fill with 2dp cyan (#1DBADF) border (see 139:63704, 139:63719).
- **Active filter chip (`filtered`)**: solid cyan #1DBADF, white text + white chevron (e.g. "Most liked", 120×40) — shows the currently applied filter/sort value in the bar.
- **Dropdown menu** (opens below trigger, 328 wide, white card, radius 8, drop shadow):
  - **Menu header, 48dp**: 16dp padding, "Filter by:" regular + value **bold** navy ("Filter by: **Type**", "Filter by: **Data free**", "Filter by: **Your liked resources**", "Sort by:"); hairline divider below (a hidden Badges slot 139:63710/63725 exists at the right of the header).
  - **Menu content**: N × 48dp `filter item` rows: 24dp leading circular check icon + 14sp label. **Active** row (139:63713): cyan (#1DBADF) filled check + navy semibold label. Inactive: slate-grey filled check + grey label.
  - Menus: Type → Activities / Stories / Teaching tips / Other (139:63703). Data free → Data free / Not data free (139:63733). Liked → Liked / Not liked (139:63702). Sort → Most liked / Newest / Oldest / Title (139:63718).

## Dialogs & popups

Only one on this page: the **data-free warning dialog** 139:63541 (anatomy above). Trigger rule (139:63542): shown **only** if the link is not data free — a field entered on the portal. In the full design the warning is instead an inline Alert banner on the detail page; the dialog belongs to the reduced-functionality fallback where list items link out directly.

## Badges usage

- **Resource-type badges** (28dp pill, 12dp horizontal padding, navy 13–14sp semibold text): Activities = light blue #8EDCEF-family (139:63847, 80×28); Stories = pink (139:63848, 65×28); Teaching tips = light yellow (139:63849, 107×28); Other = light green (139:63850, 55×28). Same hue system as the hub cards. On the detail page the type badge appears next to the like badge (139:63557).
- **Like badges** (28dp pill, white thumb-up icon + white count text): green Success Main #83BB26 when likes > 0 ("👍 15", "👍 1 like"); blue Info Main #1D67D5 when zero ("👍 0", "👍 0 likes"). Used mid-right on every list card and in the detail badges row.

## Designer notes (verbatim)

- 139:63508 (comment, x=0): "Classroom > Resources"
- 139:63510 (comment): "User taps “See all classroom resources”"
- 139:63512 (comment): "User taps one of the resource types, e.g. “Activities” Replace title with type"
- 139:63514 (comment): "Business > Resources"
- 139:63516 (comment): "Community > Resources Same as SS & GG, limited set of links out (unless we think we are going to have a much bigger set of community resources?) (I am not sure what happened to this page design, seems it was accidentally deleted, will track it down)"
- 139:63518 (comment): "Viewing a resource When users tap resource, open up new page with a bit more info; when user taps “See this resource” then they are taken out of the app to that link -- when they return to the app, they’ll still be on this page & can “like” the resource if they found it useful."
- 139:63542 (free text, above dialog): "ONLY to be shown if the link is not datafree (a field entered on the portal)"
- 139:63606 (comment): "IF we don’t implement the functionality to the left, here is an alternative (remove the ability to like resources) Show the activities, no option to “like” or show # of likes Clicking the link opens up the resource link; IF it’s not data free, then show pop-up first."
- 139:63630 (free text): "Please estimate the full functionality & if we need to pull back, we can implement this instead."
- 139:63758 (free text): "Reduced functionality in case the requirements take too long to develop. I will update the use cases if we decide to go this route."

## Variables found

From `get_variable_defs` on 139:63445 (resource list):

| Variable | Value |
|---|---|
| White | #FFFFFF |
| Primary | #27385A |
| Secondary | #FF2180 |
| Quaternary | #1DBADF |
| Primary Accent 2 | #D4D7DE |
| UI Background | #EFF6FA |
| Text Dark | #27385A |
| Text Mid | #65727A |
| Success Main | #83BB26 |
| Info Main | #1D67D5 |
| Small | Inter Regular 14/20 |
| ECD H4 | Quicksand SemiBold 16/100% |
| ECD Help text | Inter Regular 14/20 |
| Text SM Semibold | Inter Semi Bold 14/20 |
| ECD Primary Button Text | Quicksand SemiBold 14/20 |

Additional from 139:63543 (detail view): EDC H2 = Quicksand SemiBold 20/100%; ECD Body Copy / Body Copy = Inter Regular 16/24; Quaternary Accent 1 = #8EDCEF; Success Dark = #5A8F02; Success BG = #E6F1D4; Primary Accent 1 = #52607B; Info Main = #1D67D5.

## Asset index

**PNG downloads were blocked in this session**: the sandbox egress proxy returns `403 Forbidden` on CONNECT to `www.figma.com:443` (organization policy denial; confirmed via `$HTTPS_PROXY/__agentproxy/status`, `connect_rejected`), and both `get_screenshot` URLs and `download_assets` URLs are served from that host. The directory `/home/user/ecd/design-system/assets/screens/page19-resources/` was created but is empty. All frames below were nonetheless rendered and visually inspected inline (base64) and are documented above; re-run the export from a network that allows www.figma.com to materialise the files.

Intended files (node → filename):

| Node | Intended file |
|---|---|
| 139:63493 | resources-hub.png |
| 139:63631 | resources-hub-empty.png |
| 139:63519 | business-resources-hub.png |
| 139:63657 | business-resources-empty.png |
| 139:63445 | resource-list.png |
| 139:63734 | resource-list-filtered-type.png |
| 139:63791 | resource-list-long.png |
| 139:63607 | resource-list-reduced.png |
| 139:63703 | filter-open-type.png |
| 139:63733 | filter-open-data-free.png |
| 139:63702 | filter-open-liked.png |
| 139:63718 | filter-open-sort.png |
| 139:63543 | resource-detail-datafree.png |
| 139:63574 | resource-detail-liked.png |
| 139:63541 | dialog-data-free-warning.png |
| 139:63846 | action-item-icon.png |
| 139:63847–63850 | badge-activities.png / badge-stories.png / badge-teaching-tips.png / badge-other.png |
