# ECD Connect — Design System Page Extraction

**Figma file:** `8s2xe3EyBRhrzDFy93NbfN`
**Page:** `0:1` — "🎨 Design System"
**Deep-link form:** `https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=<node-id-with-dash>`
**Extraction date:** 2026-07-28
**Sources:** page XML metadata (frame/child geometry in dp), `get_design_context` (exact CSS: fills, fonts, radii, padding, shadows), `get_variable_defs` (design-token name → value), inline screenshots.

> **Asset note:** this environment's egress proxy blocks `www.figma.com` (403 on CONNECT), so no PNGs could be written to disk. All visual detail below was read from inline renders and design-context CSS. The final section is a **Figma node deep-link index** in place of an asset index.

---

## 1. Colour palette

**Frame:** `100:1102` "Colour Palette" — 360 × 1943 dp, white background, `padding: 16px`, vertical auto-layout `gap: 16px`. Each swatch group is 328 × 80 dp with a centred 264 dp label (Quicksand Medium 16 / line-height 22).

The 20 swatch groups **in canvas order**, with the label text exactly as printed in the design and the resolved hex. Note: the design file's own labels contain duplicates/typos (three rows are all labelled "Secondary/Accent 2", one green row is labelled "Tertiary/Accent 2"); the **Token** column gives the correct token name from the file's published variables/styles.

| # | Group node | Label as printed | Token (correct) | Hex | Label colour | Role |
|---|---|---|---|---|---|---|
| 1 | `100:1103` (rect `100:1104`) | Primary | Primary | `#27385A` | white | Brand navy, primary text, headings |
| 2 | `100:1106` (`100:1107`) | Primary Accent 1 | Primary Accent 1 | `#52607B` | white | Muted navy, secondary help text |
| 3 | `100:1109` (`100:1110`) | Primary Accent 2 | Primary Accent 2 | `#D4D7DE` | `#27385A` | Light navy-grey, inactive bars/dividers |
| 4 | `100:1112` (`100:1113`) | Secondary/Accent 1 | Secondary | `#FF2180` | white | Magenta — chips, selection, single-select |
| 5 | `100:1115` (`100:1116`) | Secondary/Accent 1 | Secondary Accent 1 | `#FF90BF` | white | Mid pink |
| 6 | `100:1118` (`100:1119`) | Secondary/Accent 2 | Secondary Accent 2 | `#FFD3E6` | `#FF2180` | Pale pink — chip/inactive fill |
| 7 | `100:1121` (`100:1122`) | Tertiary/Accent 2 | Tertiary | `#83BB26` | white | Green — success |
| 8 | `100:1124` (`100:1125`) | Secondary/Accent 2 | Tertiary Accent 1 | `#C1DD92` | white | Mid green |
| 9 | `100:1127` (`100:1128`) | Secondary/Accent 2 | Tertiary Accent 2 | `#E6F1D4` | `#83BB26` | Pale green — success background |
| 10 | `100:1130` (`100:1131`) | Quaternary | Quaternary | `#1DBADF` | white | Cyan — **primary action colour** (buttons, FAB, focus) |
| 11 | `100:1133` (`100:1134`) | Quaternary Accent 1 | Quaternary Accent 1 | `#8EDCEF` | white | Mid cyan — hover/loading state |
| 12 | `100:1136` (`100:1137`) | Quaternary Accent 2 | Quaternary Accent 2 | `#D2F1F9` | `#1DBADF` | Pale cyan — disabled state |
| 13 | `100:1139` (`100:1140`) | Quinary | Quinary | `#FFD525` | white | Yellow — highlight/level badge |
| 14 | `100:1142` (`100:1143`) | Quinary Accent 1 | Quinary Accent 1 | `#FFEA92` | white | Mid yellow |
| 15 | `100:1145` (`100:1146`) | Quinary Accent 2 | Quinary Accent 2 | `#FFF6D0` | `#FFD525` | Pale yellow |
| 16 | `100:1148` (`100:1149`) | Text Dark | Text Dark | `#27385A` | white | Body/heading text |
| 17 | `100:1151` (`100:1152`) | Text Mid | Text Mid | `#65727A` | white | Body copy, help text, placeholders |
| 18 | `100:1154` (`100:1155`) | Text light | Text Light | `#C9CFD2` | white | Disabled/placeholder text |
| 19 | `100:1157` (`100:1158`) | UI Background | UI Background | `#EFF6FA` | `#483E63` | App background + **input field fill** |
| 20 | `100:1160` (`100:1161`) | Modal Background | Modal Background | `rgba(39,56,90,0.7)` = `#27385A` @ 70% | `#483E63` | Scrim behind modals/dialogs |

### 1.1 Semantic / system colours

**Frame:** `100:1177` "Alerts" — 360 × 1168 dp, white, `padding: 16px`, `gap: 16px`, twelve 328 × 80 dp swatches.

| # | Group node | Label as printed | Token | Hex | Role |
|---|---|---|---|---|---|
| 1 | `100:1178` (`100:1179`) | Error Main | Error Main | `#ED1414` | Error borders, validator bar step 1 |
| 2 | `100:1181` (`100:1182`) | Error Dark | Error Dark | `#D20000` | Error text |
| 3 | `100:1184` (`100:1185`) | Error Background | Error Background | `#FFEEF6` | Error alert fill |
| 4 | `100:1187` (`100:1188`) | Alert Main | Alert Main | `#FF5C00` | Warning icon/validator bar |
| 5 | `100:1190` (`100:1191`) | Alert Dark | Alert Dark | `#E43802` | Warning text |
| 6 | `100:1193` (`100:1194`) | Alert BG | Alert BG | `#FFEEE4` | Warning alert fill |
| 7 | `100:1196` (`100:1197`) | Success Main | Success Main | `#83BB26` | Success icon, validator bar |
| 8 | `100:1199` (`100:1200`) | Success Dark | Success Dark | `#5A8F02` | Success text |
| 9 | `100:1202` (`100:1203`) | Success BG | Success BG | `#E6F1D4` | Success alert fill |
| 10 | `100:1205` (`100:1206`) | Informational Main | Info Main | `#1D67D5` | Info icon, chat-tip circle |
| 11 | `100:1208` (`100:1209`) | Informational Dark | Info Dark | `#1752AB` | Info text |
| 12 | `100:1211` (`100:1212`) | Information BG | Info BG | `#EBF3FF` | Info alert fill |

### 1.2 SmartStart / legacy palette (appears on shared components)

Several components inherit tokens from the sibling SmartStart library. Recorded verbatim from `get_variable_defs`:

| Token | Hex |
|---|---|
| SS Text Dark | `#1F192E` |
| SS Text Mid | `#483E63` |
| SS Text Light | `#635B74` |
| SS UI Light Grey | `#CAC5D8` |
| SS UI Mid Dark Grey | `#5E557A` |
| SS UI BG | `#F3F1F9` |
| SS Primary Purple / SmartStart SS Primary | `#583F99` / `#574099` |
| SmartStart Primary Accent | `#9484BD` |
| SS Secondary Blue / SmartStart Secondary | `#00B0E0` |
| SmartStart/sky blue | `#29C1EF` |
| SmartStart Tertiary | `#ED145B` |
| SS Success Main (alt) | `#399E32` |
| SS Error Main (alt) | `#E74035` |
| SS Alert Main (alt) | `#FF8A1D` |
| SS Alert Dark (alt) | `#CF6E14` |
| SS Alert BG (alt) | `#FFF0E3` |
| SS Information BG (alt) | `#D8E7FF` |
| Text Dark (alt, on Alert/List frames) | `#231F20` |
| Text Light (alt, on Cards frame) | `#9D9D9D` |
| Dark / Mid (Select frame) | `#000000` / `#555555` |
| Green Accent 1 | `#83BB26` |
| Yellow Accent 4 | `#FFD525` |

### 1.3 Complete merged variable-definition dump

Every `name → value` pair returned by `get_variable_defs` across nodes `100:4983` (Button), `100:4387` (Cards), `100:3961` (Input), `100:1177` (Alerts), `100:7048` (Card), `100:3862` (Select), `100:7330` (Checkbox), `100:6612` (List), `100:6960` (Badge), `100:6944` (dialog), `100:7481` (Slide-overs):

**Colours**
`white`/`White` `#FFFFFF` · `Primary` `#27385A` · `Primary Accent 1` `#52607B` · `Primary Accent 2` `#D4D7DE` · `Secondary` `#FF2180` · `Secondary Accent 1` `#FF90BF` · `Secondary Accent 2` `#FFD3E6` · `Tertiary` / `Green Accent 1` / `Success Main` `#83BB26` · `Success Dark` `#5A8F02` · `Success BG` `#E6F1D4` · `Quaternary` `#1DBADF` · `Quaternary Accent 1` `#8EDCEF` · `Quaternary Accent 2` `#D2F1F9` · `Quinary` / `Yellow Accent 4` `#FFD525` · `Text Dark` `#27385A` (alt `#231F20`) · `Text Mid` `#65727A` · `Text Light` `#C9CFD2` (alt `#9D9D9D`) · `UI Background` `#EFF6FA` · `Error Main` `#ED1414` · `Error Dark` `#D20000` · `Error Background` `#FFEEF6` · `Alert Main` `#FF5C00` (alt `#FF8A1D`) · `Alert Dark` `#E43802` · `Alert BG` `#FFEEE4` · `Info Main` / `System/Information main` `#1D67D5` · `Info Dark` / `Information Dark` `#1752AB` · `Info BG` `#EBF3FF` · `SS Text Mid` `#483E63` · `SmartStart/sky blue` `#29C1EF` · `SmartStart Primary Accent` `#9484BD` · `SmartStart Tertiary` `#ED145B` · `SmartStart Secondary` / `SS Secondary Blue` `#00B0E0` · `Dark` `#000000` · `Mid` `#555555`

**Type styles** (see §2)

**Effects**
| Token | Value |
|---|---|
| `shadow/sm` | `DROP_SHADOW #0000000D, offset (0,1), blur 2, spread 0` → `0 1px 2px rgba(0,0,0,0.05)` |
| `/shadow/base` | `DROP_SHADOW #0000000F (0,1) r2` + `DROP_SHADOW #0000001A (0,1) r3` |
| `/shadow/lg` | `DROP_SHADOW #0000000D (0,4) r6 spread −2` + `DROP_SHADOW #0000001A (0,10) r15 spread −3` |
| `/ring-1/ring-black ring-opacity-5 shadow-lg` | `DROP_SHADOW #CAC5D8 (0,0) r0 spread 1` + `#0000000D (0,4) r6 −2` + `#0000001A (0,10) r15 −3` |
| `Happy and secure` | `INNER_SHADOW #D3276C (0,4) r0` + `#0000001A (0,1) r2` + `#00000029 (0,1) r3` |
| `Speaking listening` | `INNER_SHADOW #9E4D8E (0,4) r0` + same two drops |
| `Discovery problem` | `INNER_SHADOW #6974AF (0,4) r0` + same two drops |
| `Developing bodies` | `INNER_SHADOW #359AD1 (0,4) r0` + same two drops |
| Button elevation (literal, not tokenised) | `0 10px 10px −5px rgba(39,56,90,0.2)` |
| Dialog elevation (literal) | `drop-shadow(0 20px 12.5px rgba(0,0,0,0.1)) drop-shadow(0 10px 5px rgba(0,0,0,0.1))` |

---

## 2. Typography

**Frame:** `100:1163` "Text" — 360 × 256 dp, white, `padding: 16px`, `gap: 16px`.
**Two families only: Quicksand (headings, buttons, labels) and Inter (body, help, data).**

| Style name (token) | Node | Family | Weight | Size | Line-height | Colour | Usage |
|---|---|---|---|---|---|---|---|
| ECD H1 | `100:1164` | Quicksand SemiBold | 600 | 24 px | 32 px | `#27385A` | Page titles |
| EDC H2 *(sic)* | `100:1165` | Quicksand SemiBold | 600 | 20 px | `normal` (100 %) | `#27385A` | Section titles |
| ECD H3 | `100:1166` | Quicksand SemiBold | 600 | 18 px | `normal` (100 %) | `#27385A` | Card/dialog titles |
| ECD H4 | `100:1167` | Quicksand SemiBold | 600 | 16 px | `normal` (100 %) | `#27385A` | Form labels, list titles |
| ECD Body Copy / `Body Copy` | `100:1168` | Inter Regular | 400 | 16 px | 24 px | `#65727A` | Body text |
| ECD Help text / `Help text` / `Small` / `Text SM Regular` | `100:1169` | Inter Regular | 400 | 14 px | 20 px | `#65727A` | Help text, list secondary |

### 2.1 Additional Inter styles found in components

| Token | Family/Style | Weight | Size | Line-height | Letter-spacing |
|---|---|---|---|---|---|
| `Text Base Regular` | Inter Regular | 400 | 16 px | 22 px | 0 |
| `H4` (Inter variant) / `Text Base Medium` | Inter Medium | 500 | 16 px | 22 px | 0 |
| `Text SM Regular` | Inter Regular | 400 | 14 px | 20 px | 0 |
| `Text SM Medium` | Inter Medium | 500 | 14 px | 20 px | 0 |
| `Text SM Semibold` | Inter Semi Bold | 600 | 14 px | 20 px | 0 |
| `Text XS Regular` | Inter Regular | 400 | 12 px | 16 px | 0 |
| `Text XS Medium` / `text-xs/leading-4/font-medium` | Inter Medium | 500 | 12 px | 16 px | 0 |
| `text-xs/leading-4/font-semibold/tracking-wide/uppercase` | Inter Semi Bold | 600 | 12 px | 16 px | **2.5** (uppercase) |

### 2.2 Quicksand usage found in components (not in the Text frame)

| Context | Style | Size / line-height |
|---|---|---|
| Palette + Alerts swatch labels | Quicksand **Medium** 500 | 16 px / 22 px |
| Button label (full-width) | Quicksand SemiBold 600 | 14 px / 20 px |
| Button label (small) | Quicksand SemiBold 600 | 12 px / 16 px |
| Chip / button-group inactive | Quicksand **Medium** 500 | 14 px / 16 px |
| Chip / button-group selected | Quicksand SemiBold 600 | 14 px / 16 px |
| FAB label | Quicksand SemiBold 600 | 16 px / 22 px |

### 2.3 Link

**Frame:** `100:1170` "Link" — 360 × 52 dp containing one `text link` instance `100:1171` (193 × 20 dp) — inline text link, 14 px.

### 2.4 Title component

**Frame:** `100:4971` "Title" — 360 × 177 dp.
- `100:4972` **Page Title** — 360 × 53 dp: H1 (Quicksand SemiBold 24/32, `#27385A`) with 16 dp side margins.
- `100:4976` **Alert title with leading badge** — 360 × 76 dp: badge chip followed by title, two-line block.

---

## 3. Buttons

**Frame:** `100:4983` "Button" — 360 × 2360 dp, white, `padding: 10px 16px`, vertical auto-layout `gap: 24px`. Full-width buttons are **328 dp** wide × **40 dp** high.

### 3.1 Full-width buttons (328 × 40 dp, radius 15 px, padding `10px 17px`, gap 8 px, label Quicksand SemiBold 14/20)

| Variant | Node | Fill | Border | Label colour | Shadow |
|---|---|---|---|---|---|
| primary | `100:4984` / inner `100:4985` | `#1DBADF` | none | `#FFFFFF` | `0 10px 10px −5px rgba(39,56,90,0.2)` |
| secondary | `100:4988` / `100:4989` | `#FFFFFF` | **2 px** `#1DBADF` | `#1DBADF` | none |
| Primary Hover | `100:4992` / `100:4993` | `#8EDCEF` | none | `#FFFFFF` | same as primary |
| secondary Hover | `100:4996` / `100:4997` | transparent | 2 px `#8EDCEF` | `#8EDCEF` | none |
| primary with icon | `100:5000` / `100:4492` | `#1DBADF` | none | `#FFFFFF` | primary shadow; leading `Icon/Solid/arrow-circle-down` 20 × 20 |
| secondary with icon | `100:5001` / `100:5002` | `#FFFFFF` | 2 px `#1DBADF` | `#1DBADF` | icon 20 × 20 |
| primary disabled | `100:5005` / `100:5006` | `#D2F1F9` | none | `#FFFFFF` | **none** |
| primary disabled with icon | `100:5009` / `100:5012` | `#D2F1F9` | none | `#FFFFFF` | icon `Icon/Solid/check-circle` 20 × 20 |
| secondary disabled | `100:5015` / `100:5016` | transparent | 2 px `#D2F1F9` | `#D2F1F9` | none |
| secondary disabled with icon | `100:5019` / `100:5020` | transparent | 2 px `#D2F1F9` | `#D2F1F9` | icon 20 × 20 |
| primary loading | `100:5023` / `100:5024` | `#8EDCEF` | none | `#FFFFFF` | primary shadow; 16 × 16 `Spinner` `100:5025` |
| secondary loading | `100:5029` / `100:5030` | transparent | 2 px `#8EDCEF` | `#8EDCEF` | 16 × 16 `Spinner` `100:5032` |

### 3.2 Small buttons (height 32 dp, radius 10 px, label Quicksand SemiBold 12/16, icons 16 × 16, gap 4 px)

| Variant | Node | Size | Fill / border | Label | Padding | Shadow |
|---|---|---|---|---|---|---|
| small secondary | `100:5036` / `100:5037` | 63 × 32 | `#FFD3E6` | `#FF2180` | `8px 12px` | none |
| small secondary trailing icon | `100:5039` / `100:5040` | 77 × 32 | `#FFD3E6` | `#FF2180` | `8px` t/b, `10px` left, `8px` right | none |
| small primary trailing icon | `100:5043` / `100:5044` | 77 × 32 | `#1DBADF` | `#FFFFFF` | `8px` t/b, `10px` left, `8px` right | `0 10px 10px −5px rgba(0,0,0,0.2)` |
| small primary leading icon | `100:5047` / `100:4559` | 125 × 32 | `#1DBADF` | `#FFFFFF` | `8px` t/b, `9px` left, `11px` right | `0 10px 10px −5px rgba(39,56,90,0.2)` |
| small secondary leading icon | `100:5048` / `100:5050` | 125 × 32 | transparent, **2 px** `#FF2180` border | `#FF2180` | `8px` t/b, `9px`/`11px` | none |

Small-button icon used in examples: `Icon/Solid/plus` (16 × 16), `Pencil` (`100:929`, description "Edit").

### 3.3 Floating action button

| Variant | Node | Size | Fill | Radius | Padding | Shadow | Content |
|---|---|---|---|---|---|---|---|
| FAB | `100:5051` / `100:5052` | 153 × 48 | `#1DBADF` | 24 px | `12px` t/b, `16px` left, `20px` right, gap 8 | `0 10px 10px −5px rgba(39,56,90,0.2)` | `Plus` icon 24 × 24 + "Add a child" Quicksand SemiBold 16/22 white |
| FAB collapsed | `100:5055` / `100:5056` | 48 × 48 | `#1DBADF` | 24 px | `12px` | same | `Plus` 24 × 24 only |

### 3.4 Single-select button group

**Component set:** `100:5097` "Single select button group" — 328 × 40 dp per row, container radius 6 px, `gap: 6px`, each segment `flex:1`, radius **10 px**, padding `12px`.

| State | Node | Segment fills |
|---|---|---|
| Unselected | `100:5098` | all `#FFD3E6`, label Quicksand Medium 14/16 `#FF2180` |
| Left select | `100:5102` | segment 1 `#FF2180` (white SemiBold), rest `#FFD3E6` |
| Mid select | `100:5106` | segment 2 `#FF2180`, rest `#FFD3E6` |
| Right select | `100:5110` | segment 3 `#FF2180`, rest `#FFD3E6` |
| All selected | `100:5114` | all `#FF2180`, all labels white SemiBold |

Standalone segment component `btn group middle` `100:5158` (variants `100:5159` Unselected 109.33 × 40, `100:5161` Selected 109.33 × 40).

Wrapper patterns: `Next buttons/Label & single-select` `100:5058` (328 × 96 dp — H4 label + 14 px help text + group, `gap: 8px`) and `Next buttons/Label & single-select & image` `100:5089` (328 × 108 dp — label row with trailing "Picture" small primary button `100:5092`).

### 3.5 Chips

**Frame:** `100:5118` "Multi Select Chips" — 328 × 96 dp, two `Chips row` (`100:5119`, `100:5128`) with `gap: 8px`.

| Chip state | Node | Size | Fill | Label | Radius | Padding | Shadow |
|---|---|---|---|---|---|---|---|
| chip inactive | `100:5120` / `100:5121`, `100:5126`, `100:5127`, `100:5129` | 61 × 40 | `#FFD3E6` | Quicksand Medium 14/16 `#FF2180` | 20 px (pill) | `9px 16px` | `0 1px 2px rgba(0,0,0,0.05)` |
| chip active | `100:5123` / `100:5124`, `100:5130` | 61 × 40 | `#FF2180` | Quicksand SemiBold 14/16 `#FFFFFF` | 20 px | `9px 16px` | `0 1px 2px rgba(0,0,0,0.05)` |

Chip component set `100:5153` "chip inactive" — variants `Property 1=Default` `100:5154` (63 × 40, `#FFD3E6`) and `Property 1=Variant2` `100:5156` (63 × 40, `#FF2180`), label text "Fees".

Composite: `Date picker dd mm yyyy format/Multiple select chips` `100:5131` (328 × 192 dp) — H4 label + 14 px helper + three chip rows.

---

## 4. Inputs & forms

**Frame:** `100:3961` "Input" — 360 × 2794 dp, white, `padding: 16px`, `gap: 16px`. All field blocks are **328 dp** wide; the field itself is **48 dp** high with **radius 6 px**; label→field `gap: 4px`.

### 4.1 Text-input states

| State | Node | Field fill | Border | Text colour | Text inset | Notes |
|---|---|---|---|---|---|---|
| inactive (placeholder) | `100:3962` / `100:3963`, field `100:3965` | `#EFF6FA` | none | `#65727A` (Inter 16/24) | left 16 px | default resting field |
| filled | `100:3968` / `100:3969`, field `100:3972` | `#EFF6FA` | none | `#27385A` (Inter 16/22) | left 16 px | |
| Inactive with icon | `100:3975` / `100:3976`, field `100:3978` | `#EFF6FA` | none | `#65727A` | left 13 px | trailing `Icon/Solid/calendar` 20 × 20, right 13 px, v-centred |
| Filled with icon | `100:4009` / `100:4010`, field `100:4012` | `#EFF6FA` | none | `#27385A` | left 13 px | trailing calendar icon 20 × 20 |
| inactive with detail and icon | `100:4043` (328 × 96) | `#EFF6FA` | none | `#231F20` | left 13 px | label + 14 px help text + field + calendar icon |
| **focused** | `100:4044` / `100:4045`, field `100:4047` | `#FFFFFF` | **2 px `#1DBADF`** | `#27385A` | left 14 px | 1 × 24 px caret `#27385A`, gap 2 px |
| **filled error** | `100:4052` / `100:4053` (328 × 96), field `100:4056` | `#FFFFFF` | **2 px `#ED1414`** | `#D20000` | left 14 px | error message below: Inter 14/20 `#D20000` |
| inactive help text | `100:4060` / `100:4061` (328 × 96), field `100:4064` | `#EFF6FA` | none | `#65727A` | left 16 px | help text Inter 14/20 **`#52607B`** |
| filled highlighted | `100:4067` / `100:4068` (328 × 48), field `100:4069` | `#FFFFFF` | 2 px `#1DBADF` | white on `#1DBADF` selection block at left 8 px / top 10 px, pl 4 px | — | text selection highlight demo + caret |
| half width | `100:4175` / `100:4183`, field `100:4177` | `#EFF6FA` | none | `#65727A` / `#27385A` | left 13 px | field **164 dp** wide inside 328 dp block |
| half width inactive | `100:4184` (328 × 74) | `#EFF6FA` | none | `#65727A` | left 13 px | 164 dp field + suffix unit "kg" Inter 16/24 `#27385A`, gap 4 px |
| half width filled | `100:4185` | `#EFF6FA` | none | `#27385A` | left 13 px | 164 dp field + "kg" suffix |
| long text input (textarea) | `100:4186` / `100:4187` (328 × 168) | `#EFF6FA` | none | `#65727A` Inter 16/24 | padding `12px 16px` | **height 120 dp**, radius 6 px, label "Please add details", help "Optional" |

Labels are always **Quicksand SemiBold 16**, `#27385A`. Help text is **Inter Regular 14/20** `#65727A` (except the "inactive help text" variant which uses `#52607B`).

### 4.2 Password fields & strength validator

- **Password field help** `100:4193` / `100:4196` (328 × 136 dp): label "Password" + bulleted requirement list (Inter 14/20 `#65727A`, disc bullets, indent 21 px: "At least 8 characters", "At least 1 number", "At least 1 capital letter") + 48 dp field with trailing `Icon/Solid/eye` 20 × 20 at right 13 px.
- **Strength validator bar**: 4 segments, each `flex:1`, **height 4 px**, radius 2 px, `gap: 4px`, total width 328 dp; block padding-top 4 px, `gap: 4px`; caption Inter 14/20.

| Level | Segments filled | Segment colour | Caption text | Caption colour | Nodes |
|---|---|---|---|---|---|
| Error (1/4) | 1 | `#ED1414` (rest `#D4D7DE`) | "Error" | `#D20000` | `100:4073`/`100:4078`, with-help `100:4231`/`100:4238` |
| A bit weak (2/4) | 2 | `#FF5C00` (rest `#D4D7DE`) | "A bit weak" | `#E43802` | `100:4106`, with-help `100:4266` |
| Good (3/4) | 3 | `#83BB26` (rest `#D4D7DE`) | "Good" | `#5A8F02` | `100:4107`/`100:4127`, with-help `100:4301` |
| Very Strong (4/4) | 4 | `#83BB26` | "Very Strong" | `#5A8F02` | `100:4141`/`100:4168`, with-help `100:4336` |

Plain validator blocks are 328 × 108 dp; "with help" variants (label + requirement list + field + validator) are 328 × 172 dp.

### 4.3 Select

**Frame:** `100:3862` "Select" — 360 × 1184 dp.

| Item | Node | Size | Notes |
|---|---|---|---|
| Inactive | `100:3863` | 328 × 72 | label + 48 dp closed select, fill `#EFF6FA`, radius 6 px, trailing chevron |
| Form group | `100:3867` | 328 × 72 | wrapper |
| Active (open) | `100:3871` | 328 × 324 | trigger + expanded dropdown |
| Form group (open) | `100:3888` | 328 × 324 | |
| Filled | `100:3892` | 328 × 72 | value in `#27385A` |
| Dropdown Menu | `100:3896` | 328 × 248 | menu surface; shadow token `/ring-1/ring-black ring-opacity-5 shadow-lg` = ring `#CAC5D8` 1 px + `0 4px 6px −2px rgba(0,0,0,0.05)` + `0 10px 15px −3px rgba(0,0,0,0.1)` |
| inactive help text | `100:3903` | 328 × 96 | label + help + select |
| Active help text | `100:3910` | 328 × 96 | |

Tokens on this frame: `Text Dark #27385A`, `Text Mid #65727A`, `UI Background #EFF6FA`, `Primary #27385A`, `Primary Accent 1 #52607B`, `Quaternary #1DBADF`, `Quaternary Accent 1 #8EDCEF`, `Dark #000000`, `Mid #555555`, `SS Text Mid #483E63`, `White #FFFFFF`, type `ECD H4`, `ECD Help text`, `ECD Body Copy`, `Body Copy`, `H4` (Inter Medium 16/22).

### 4.4 Filter

**Frame:** `100:3920` "Filter" — 360 × 739 dp.

| Item | Node | Size |
|---|---|---|
| filter trigger | `100:3921` | 118 × 40 |
| filter trigger open | `100:3925` | 118 × 40 |
| filter open (panel) | `100:3929` | 328 × 246 |
| filtered (trigger with count) | `100:3943` | 122 × 40 |
| filter item active | `100:3947` | 328 × 48 |
| filter item | `100:3950` | 328 × 48 |
| filter item with sub active | `100:3953` | 328 × 66 |
| filter item with sub | `100:3957` | 328 × 67 |

Trigger height 40 dp; list rows 48 dp (66–67 dp with sub-label).

### 4.5 Checkbox

**Frame:** `100:7330` "Checkbox" — 360 × 764 dp.

| Item | Node | Size | Notes |
|---|---|---|---|
| Checkbox checked | `100:7331` | 328 × 20 | 20 dp box, checked fill `#1DBADF`, label Inter/Quicksand 16 |
| Checkbox option | `100:7338` | 328 × 20 | unchecked — border `#D4D7DE`, fill `#FFFFFF` |
| Checkbox List checked | `100:7344` | 328 × 200 | stacked list of checkbox rows |
| **Select card** set | `100:7352` | 328 × 274 | four variants below |
| ‣ Select card active | `100:7353` | 328 × 54 | active card, border/fill uses `#1DBADF` |
| ‣ Select card default | `100:7361` | 328 × 56 | resting card, `#EFF6FA`/`#D4D7DE` |
| ‣ Select card default icon | `100:7369` | 328 × 56 | with leading icon |
| ‣ Select card active icon | `100:7378` | 328 × 56 | |
| **Select card - date** set | `100:7387` | 328 × 154 | |
| ‣ Select card active (date) | `100:7388` | 328 × 54 | |
| ‣ Select card default (date) | `100:7398` | 328 × 56 | |

Frame tokens: `White #FFFFFF`, `Quaternary #1DBADF`, `Text Dark #27385A`, `UI Background #EFF6FA`, `Primary Accent 2 #D4D7DE`, `Text Mid #65727A`, `Quaternary Accent 1 #8EDCEF`, `Quaternary Accent 2 #D2F1F9`, `Info Main #1D67D5`; type `ECD H4`, `ECD Help text`, `Text SM Medium`, `Text Base Medium`, `Body Copy`.

### 4.6 Radio

**Frame:** `100:7625` "Radio" — 360 × 304 dp; inner group `List with description/Mobile` `100:7626` (328 × 272 dp).

| Item | Node | Size |
|---|---|---|
| Radio Group default top | `100:7627` | 328 × 54 |
| Radio Group active top | `100:7635` | 328 × 54 |
| Radio Group default (with description) | `100:7643` | 328 × 76 |
| Radio Group selected (with description) | `100:7649` | 328 × 76 |
| Radio Group default bottom | `100:7655` | 328 × 54 |

Rows are 54 dp without description, 76 dp with description; grouped into a bordered list with top/middle/bottom variants.

### 4.7 checkbox-card

**Frame:** `100:9029` "checkbox-card" — 368 × 207 dp.

| Variant | Node | Size |
|---|---|---|
| `Property 1=Check with image` | `100:9030` | 328 × 70 |
| `Property 1=checked` | `100:9038` | 328 × 70 |

70 dp tall selectable card; image variant carries a leading thumbnail.

### 4.8 Form Photo

**Frame:** `100:4371` "Form Photo" — 360 × 660 dp.

| Item | Node | Size | Notes |
|---|---|---|---|
| Form Photo | `100:4372` | 328 × 232 | label + photo area |
| With dashed border/Mobile | `100:4380` | 328 × 208 | `Label` text `100:4381` (328 × 40) + `Photo filled` `100:4382` (328 × 160) |
| Photo empty | `100:4386` | 328 × 156 | dashed-border empty upload state |

Photo area height: **160 dp** filled, **156 dp** empty; label block 40 dp.

---

## 5. Alerts & feedback

**Frame:** `100:3721` "Alert" — 360 × 2063 dp, white, `padding: 16px`, `gap: 16px`.
**Common anatomy:** 328 dp wide, `padding: 16px`, **radius 10 px**, horizontal `gap: 12px`; leading status icon 20 × 20 (48 × 48 for "Immediate"); content column `gap: 8px`; title Inter **Semi Bold 14/20** in the status-dark colour; body Inter Regular 14/20 `#27385A`; bullet marker 6 × 14 px with 7 px gap.

| Variant | Node | Background | Icon | Title colour | Body colour | Size |
|---|---|---|---|---|---|---|
| Submission Error (full, 2 bullets) | `100:3722` | `#FFEEF6` | `Icon/Solid/x-circle` 20 | `#D20000` | `#27385A` | 328 × 164 |
| Submission Error (title only) | `100:3736` | `#FFEEF6` | x-circle | `#D20000` | — | 328 × 72 |
| Submission Error (1 line, no bullet) | `100:3737` | `#FFEEF6` | x-circle | `#D20000` | `#27385A` | 328 × 120 |
| Alert (amber, 2 bullets) | `100:3738` / `100:3739` | `#FFEEE4` | `Exclamation circle` 20 | `#E43802` | `#27385A` | 328 × 148 |
| Alert - button | `100:3751` | `#FFEEE4` | Exclamation circle | `#E43802` | `#27385A` | 328 × 188; embedded small primary button fill **`#29C1EF`**, radius 4 px, padding `8px 9px/11px`, label Inter Medium 12/16 white |
| Success (title + list) | `100:3764` | `#E6F1D4` | `Check circle` 20 | `#5A8F02` | `#27385A` | 328 × 80 |
| Success (title only) | `100:3777` | `#E6F1D4` | Check circle | `#5A8F02` | — | 328 × 52 |
| Informational | `100:3778` / `98:459` | `#EBF3FF` | `Information circle` 20 | `#1752AB` | — | 328 × 92 |
| Celebratory | `100:3779` / `100:3780` | `#E6F1D4` | 48 × 48 illustration `100:3784` | `#5A8F02` (Inter SemiBold 16/22) | `#27385A` Inter Medium 16/22 | 328 × 136; trailing 22 × 22 `X` dismiss; inner width 302, gap 16 |
| Accreditation | `100:3803` / `100:3806` | `#E6F1D4` | 48 × 49.2 badge illustration | `#5A8F02` Inter SemiBold 16/24 | `#1F192E` Inter Medium 16/24; meta `#483E63` 14/20 + 12/16 with 16 px status dot | 328 × 132 |
| Informational 2 (bulleted) | `100:3839` / `100:3840` | `#EBF3FF` | Information circle 20 | `#1752AB` | `#27385A` | 328 × 216 |
| Informational 4 (checklist + CTA) | `100:3858` | `#EBF3FF`, **radius 6 px** | none (24 × 24 check-circle / x-circle per row) | `#1752AB` | `#1F192E` | 328 × 192; CTA = small primary leading icon `#1DBADF`, radius 10 px, label Quicksand SemiBold 12/16; trailing 22 × 22 X |
| Chat tip | `100:3859` | transparent, radius 10 px | 38 × 38 circle fill `#1D67D5`, radius 24 px, padding 13, icon `Icon/Solid/chat-alt-2` 22 × 22 | — | `#1752AB` Inter 14/20 | 328 × 40 |
| Immediate Alert | `100:3860` | `#FFEEF6` | `Icon/Solid/exclamation` **48 × 48** | `#D20000` | — | 328 × 80 |
| Immediate Alert 2 | `100:3861` | `#FFEEF6` | exclamation 48 × 48 | `#D20000` | `#231F20` | 328 × 164 |

---

## 6. Cards

Two frames hold cards: **`100:4387` "Cards"** (360 × 3607 dp — product/dashboard cards) and **`100:7048` "Card"** (360 × 4034 dp — content/domain cards). All cards are **328 dp** wide inside a 360 dp frame (16 dp side margins).

### 6.1 Frame `100:4387` "Cards"

| Card | Node | Size (dp) | Anatomy / specs |
|---|---|---|---|
| Money - statistics list | `100:4388` | 328 × 136 | Dark navy `#27385A` panel: month label + large "+ R 100.30" total, two rows with money-in / money-out icons and amounts (Inter 14) |
| Card available (component) | `100:4405` | 328 × 368 | Photo header (~180 dp) + green **"Available now"** badge + H3/H4 title "Manage your classroom" + Inter 16/24 body |
| Card available (instance) | `100:4412` | 328 × 368 | as above |
| Card coming soon | `100:4413` | 328 × 368 | same layout, orange **"Coming soon"** outline badge, "Boost your business!" |
| action list xl with action panel | `100:4430` | 328 × 333 | "Complete your Profile" panel `#EFF6FA` + body + cyan text-link CTA, followed by three 68 dp action rows with round cyan/green icon circles, "Coming soon" badges and chevrons |
| action list xl (frame) | `100:4456` | 328 × 161 | contains `with link` `100:4457` (328 × 170) and `action xl` `100:4458` (328 × 161) |
| ‣ action xl inner | `100:4458` | 328 × 161 | 1 px `Divider` rounded-rectangles (`100:4459`, `100:4461`) + `action xl icon` `100:4460` (328 × 80) + `action xl icon disabled` `100:4462` (328 × 80) |
| Registered children | `100:4463` | 328 × 101 | count "30 Registered children" + cyan "View all" pill; 0 Present / 0 Absent split row |
| Attendance card | `100:4464` | 328 × 80 | date sub-label + two big percentages (75 % Little Stars / 85 % Dolphins) |
| Attendance | `100:4474` | 328 × 134 | expanded attendance stats |
| Component 2 | `100:4475` | 328 × 80 | "February 2022 attendance 100 %" single-stat row (large green figure) |
| Age groups | `100:4481` | 328 × 215 | "Children per age group" 2 × 2 numeric grid (1 / 3 / 25 / 3 with range captions) |
| Note Card | `100:4482` | 328 × 135 | "Complete your Profile" note with cyan CTA |
| Tutorial card 1–5 | `100:4487`, `100:4554`, `100:4625`, `100:4689`, `100:4753` | 328 × 168 each | Yellow animoji character (left, ~64 dp) + tip copy + cyan/pink pill button ("Close", "Next", "Finish"). Card 1 shows "you can always get help by tapping the question mark at the top of the screen"; cards 2–5 "All children are automatically marked present" |

### 6.2 Frame `100:7048` "Card"

| Card | Node | Size (dp) | Anatomy / specs |
|---|---|---|---|
| Statistics list (group) | `100:7049` | 328 × 584 | Stat rows separated by `full width` dividers (`100:7064`, `100:7078`, `100:7092`, each 360 dp wide, 0 dp high hairline) |
| ‣ Stat | `100:7050` | 328 × 126 | month + big % (green `100 %`) + supporting Inter 14/20 lines |
| ‣ Stat | `100:7065` (content `100:7066` 296 × 134) | 328 × 166 | |
| ‣ Stat | `100:7079` (content `100:7080` 296 × 114) | 328 × 146 | e.g. "April attendance 56 %" (red) |
| ‣ Stat | `100:7093` (content `100:7094` 296 × 114) | 328 × 146 | e.g. "March attendance 60 %" (orange) |
| Offline | `100:7106` | 328 × 204 | "Information not available when offline" empty state with illustration |
| **Progress Card** set | `100:7115` | 328 × 1072 | 4 variants, each **328 × 248 dp**, distinguished by top-border colour |
| ‣ Top Border=1 | `100:7116` | 328 × 248 | "Feeling happy & secure" — pink top border, `LEVEL 2` badge, "Helping Themba with…", "To do:" list, `Edit` small button. Inner shadow token `Happy and secure` `#D3276C` |
| ‣ Top Border=2 | `100:7132` | 328 × 248 | `Speaking listening` `#9E4D8E` (purple/magenta top border) |
| ‣ Top Border=3 | `100:7148` | 328 × 248 | `Discovery problem` `#6974AF` (indigo) |
| ‣ Top Border=4 | `100:7164` | 328 × 248 | `Developing bodies` `#359AD1` (blue) |
| **Notes Card** set | `100:7180` | 328 × 864 | 4 variants with the same four top-border colours |
| ‣ Top Border=1 | `100:7181` | 328 × 190 | |
| ‣ Top Border=Top Border2 | `100:7194` | 328 × 214 | |
| ‣ Top Border=Top Border3 | `100:7207` | 328 × 190 | |
| ‣ Top Border=Top Border4 | `100:7220` | 328 × 190 | |
| Activity card | `100:7233` | 328 × 226 | "Toilet time" title + material pills (Duplo blocks 13+) + "Choose activity" secondary button |
| Activity card selected | `100:7255` | 328 × 345 | adds amber alert strip ("You are already doing this activity on…") + filled cyan "Activity chosen" button |
| Story card | `100:7280` | 328 × 202 | "Toilet time" + `Story book` badge + "Available in isiZulu, English" + "See details" |
| Story card selected | `100:7301` | 328 × 201 | filled cyan "Story chosen" button |
| Grid Lists/Card | `100:7322` (inner `100:7323`) | 328 × 80 | icon-link tile — 48 × 48 domain icon `100:7324` + 232 dp label "Exploring & finding out" (22 dp line) |
| Grid Lists/Card | `100:7326` (inner `100:7327`) | 328 × 80 | 48 × 48 icon `100:7328` + "Songs, rhymes & sounds" |

Card frame tokens: `SS Text Dark #1F192E`, `SS Text Mid #483E63`, `SS Text Light #635B74`, `SS UI Light Grey #CAC5D8`, `SS UI Mid Dark Grey #5E557A`, `SS UI BG #F3F1F9`, `SS Primary Purple #583F99`, `SS Secondary Blue #00B0E0`, `Success Main #399E32`, `Error Main #E74035`, `Alert Main #FF8A1D`, `Alert Dark #CF6E14`, `Alert BG #FFF0E3`, `Information BG #D8E7FF`, `Information Dark #1752AB`; effects `/shadow/base`, `/shadow/lg`, and the four domain inner-shadow tokens.

---

## 7. Lists & tables

### 7.1 List — frame `100:6612` (360 × 2102 dp)

| Group / item | Node | Size (dp) | Notes |
|---|---|---|---|
| simple with actions | `100:6613` → items `100:6614` | 328 × 231 | three `large title with action` rows `100:6615`, `100:6616`, `100:6626` — **328 × 77 dp** each |
| simple with actions (small) | `100:6627` → items `100:6628` (328 × 153) | 328 × 262 | `small title with action` `100:6629`, `100:6631` (328 × 76) separated by `dashed` divider `100:6630` (328 × 1); plus `large title with action and status and icon` `100:6638` (328 × 77) |
| Action with icons | `100:6648` | 328 × 240 | three `action item icon` rows (`100:6649`, `100:6661`, `100:6672`) **328 × 80 dp**; each = `Icon Circle` 48 × 48 + `Content` 192 × 40 + `Badges` 110 × 24 + `Icon/Solid/chevron-right` 24 × 24 + 1 px `Line 1` 328 dp; closed by two `full width` dividers `100:6683`, `100:6684` (360 dp) |
| Action with icons (amounts) | `100:6685` | 328 × 112 | `action item with amount and icon` `100:6686` (328 × 56) and `action item with amount` `100:6705` (328 × 56) separated by `full width` / `standard` hairlines (`100:6699`–`100:6704`, `100:6718`, `100:6719`) |
| action item large sum | `100:6720` | 328 × 64 | large monetary value row |
| action xl | `100:6729` | 328 × 161 | `action xl icon` `100:6730` (328 × 80) + `Divider` `100:6731` (328 × 1) + `action xl icon disabled` `100:6732` (328 × 80) |
| action icon with badge | `100:6739` | 328 × 80 | |
| long action icon with badge | `100:6748` | 328 × 112 | |
| long action icon | `100:6756` | 328 × 92 | |
| action item icon with alert | `100:6764` | 328 × 80 | |
| long action icon with icon and alert | `100:6777` | 328 × 92 | |
| Initials long action icon with icon and alert | `100:6788` | 328 × 80 | uses initials avatar instead of photo |
| Long action item with check | `100:6801` | 328 × 80 | |
| action item icon one line | `100:6809` | 328 × 80 | |
| action item no icon | `100:6820` | 328 × 80 | |

**Row height system:** 56 dp (compact/amount), 64 dp (large sum), 76–77 dp (title + action), 80 dp (icon row, the default), 92 dp / 112 dp (long, two-line).
List tokens: `Text Dark #231F20`, `Text Mid #65727A`, `Text Light #9D9D9D`, `Primary #27385A`, `Primary Accent 1 #52607B`, `Primary Accent 2 #D4D7DE`, `Quaternary #1DBADF`, `Quaternary Accent 1 #8EDCEF`, `Secondary #FF2180`, `Secondary Accent 1 #FF90BF`, `Secondary Accent 2 #FFD3E6`, `Tertiary`/`Success Main #83BB26`, `Success Dark #5A8F02`, `Alert Main #FF5C00`, `UI Background #EFF6FA`, `SmartStart Primary Accent #9484BD`.

### 7.2 Table — frame `100:4818` (318 × 621 dp)

Column-based "Simple striped/Mobile" layout — the table is built from vertical column frames rather than rows.

| Table | Node | Size (dp) | Columns |
|---|---|---|---|
| Simple striped/Mobile #1 | `100:4819` → `Table` `100:4820` | 318 × 197 | `100:4821` 159 dp, `100:4845` 159 dp, `100:4866` 90 dp (overflowing at 353 dp tall) |
| Simple striped/Mobile #2 | `100:4890` → `Table` `100:4891` | 318 × 345 | `100:4892` 185 dp, `100:4916` 116 dp, `100:4936` 110 dp (each 329 dp tall) |

Table content width is **318 dp** (narrower than the 328 dp card grid). Striping alternates white / `#EFF6FA`.

### 7.3 Divider — frame `100:4956` (360 × 97 dp)

| Variant | Node | Width | Notes |
|---|---|---|---|
| dashed | `100:4957` | 328 dp × 1 px | dashed hairline |
| full width | `100:4960` | **360 dp** × 0 | edge-to-edge rule (breaks the 16 dp margin) |
| standard | `100:4963` | 328 dp × 0 | inset rule |
| with text | `100:4966` | 328 dp × 16 px | rule with centred caption |

---

## 8. Dialogs, popups & modals

All dialog cards are **328 dp wide**, **radius 20 px**, white fill, `padding: 24px 16px`, vertical auto-layout `gap: 16px`, content centred, elevation `drop-shadow(0 20px 12.5px rgba(0,0,0,0.1)) drop-shadow(0 10px 5px rgba(0,0,0,0.1))`. Behind them sits the `Modal Background` scrim `rgba(39,56,90,0.7)`.

| Dialog | Node | Size (dp) | Anatomy |
|---|---|---|---|
| **Modal** | `100:6831` | 328 × 310 | 48 dp red circular icon (`#ED1414` filled X) → **Title** (Quicksand SemiBold 18) → "Important" (Inter Medium 16/22 `#27385A`) → "Detail" (Inter Regular 16/24 `#65727A`) → full-width **primary** "Action" button (`#1DBADF`, radius 15) → full-width **secondary** "Close" (2 px `#1DBADF` border, cyan label) |
| **dialog card - overlay** | `100:6844` | 328 × 307 | 48 dp orange circular exclamation (`#FF5C00`) → title "Are you sure you" (Quicksand SemiBold 18 `#27385A`) → body "If you exit now your changes will not be saved." (Inter 16/24 `#65727A`) → primary "Save note" with 20 dp leading icon → secondary "Exit" with leading icon |
| **dialog card - tutorial** | `100:6858` | 328 × 361 | Full-colour robot illustration (~150 dp) → two-line question "Want to learn how to track attendance on ECD Connect?" (Quicksand SemiBold 18, centred) → primary "Yes, help me!" (check-circle icon) → secondary "No, skip" (clock icon) |
| **dialog card - celebrate** | `100:6915` | 328 × 245.55 | Background `#EFF6FA` (pale), 96 dp navy circle with balloons illustration → title "Children are progressing well" (Quicksand SemiBold 18 `#27385A`) → body Inter 16/24 `#65727A`. **No buttons** |
| **dialog - simple warning / info page** | `100:6944` | 328 × 439 | 48 × 48 `Modals/Illustration` wrapper (radius 24) holding `Icon/Solid/information-circle` 48 dp in `Info Main #1D67D5`; `Leading content` gap 12; `Text` block gap 16; title "Income & expenses" Quicksand SemiBold **18** centred, width 296 dp; sub-heads Inter **Medium** 16/22 `#27385A`; paragraphs Inter Regular 16/24 `#65727A`; footer full-width **secondary with icon** "Close" — white fill, 2 px `#1DBADF`, radius 15, padding `10px 17px`, `Icon/Solid/x` 20 dp, label Quicksand SemiBold 14/20 `#1DBADF` |
| **Dialog card - Cebisa** | `100:8729` | 328 × 243 | Background `#EFF6FA`, 96 dp yellow circle with the Cebisa animoji character → title "I'd like to get to know you." (Quicksand SemiBold 18) → body "Please give me more information to make ECD Connect useful for you!" Inter 16/24 `#65727A`. No buttons |
| **dialog card - question** | `100:8965` | 328 × 378 | Cebisa animoji in yellow circle → title (Quicksand SemiBold 18, 2 lines) → body Inter 16/24 `#65727A` → primary "Yes, help me!" (check-circle) → secondary "No, skip" (clock) |

---

## 9. Navigation

### 9.1 Headers — frame `100:3678` (360 × 384 dp)

All headers are **360 × 64 dp** on navy `#27385A`, white content, 16 dp side padding, back arrow 24 dp at left, optional trailing action 24 dp at right.

| Header | Node | Size | Anatomy |
|---|---|---|---|
| search bar focused filled | `100:3679` | 360 × 64 | back arrow + white typed text with caret + white 24 dp `x` clear |
| search bar autofocus | `100:3689` | 360 × 64 | dimmed back arrow + caret + "Search…" placeholder in `#C9CFD2` |
| Title with subtitle (set) | `100:3698` | 360 × 224 | three variants below |
| ‣ `Property 1=title with subtitle and icons` | `100:3699` | 360 × 64 | back arrow + centred title (Quicksand SemiBold 18 white) + subtitle (Inter 14/20, muted white) — "Classroom / Monday, 12 June" |
| ‣ `Property 1=steps exit button top bar` | `100:3707` | 360 × 64 | back arrow + "Child registration / Step 5 of 11" + trailing white `x` |
| ‣ `Property 1=Title with question mark` | `100:3714` | 360 × 64 | back arrow + title/subtitle + trailing cyan `#1DBADF` circular help "?" button (~24 dp) |

Header tokens: `Text Dark #27385A`, `ECD H3`, `Primary #27385A`, `White #FFFFFF`, `Secondary #FF2180`, `Help text`, `Quaternary #1DBADF`, `Text Light #C9CFD2`.

### 9.2 Nav header & logo headers (all 360 × 64 dp)

| Component | Node |
|---|---|
| Nav header | `100:6994` |
| Logo header Dark | `100:7560` |
| Logo header White | `100:7567` |
| Logo header Transparent | `100:7573` |

Logo lock-ups used in these headers (also standalone on the page):

| Lock-up | Node | Size (dp) | Content |
|---|---|---|---|
| Group 339 → Frame 320 | `100:9413` / `100:9414` | 188 × 48 | 48 × 48 rounded logo mark `100:9415` + "ECDConnect" wordmark `100:9416` (135 × 22) |
| Frame 321 | `100:9421` | 188 × 48 | mark `100:9422` 48 dp + wordmark `100:9423` |
| Group 340 → Frame 320 | `100:9417` / `100:9418` | 271 × 64 | 64 × 64 mark `100:9419` + wordmark `100:9420` (202 × 22) |
| Frame 322 | `100:9425` | 271 × 64 | mark `100:9426` 64 dp + wordmark `100:9427` |

Wordmark line height is 22 dp in both sizes; the mark is a rounded-rectangle white logo (`ECD_Connect_logo_small_white 2`).

### 9.3 Navbars / Menu button — frame `100:7408` (144 × 151 dp)

Component set with `Theme` / `Expanded` / `State` properties, every variant **36 × 36 dp**:

| Variant | Node |
|---|---|
| Theme=Default, Expanded=True, State=Default | `100:7409` |
| Theme=Default, Expanded=True, State=Hover | `100:7411` |
| Theme=Default, Expanded=False, State=Hover | `100:7413` |
| Theme=Default, Expanded=False, State=Default | `100:7415` |

### 9.4 Menu items — frame `100:7580` (365 × 638 dp)

Sidebar navigation items, all **288 dp** wide:

| Item | Node | Height |
|---|---|---|
| Sidebar Navigation/Item_Notification | `100:7581` | 40 dp |
| Sidebar Navigation/Item | `100:7588` | 40 dp |
| Sidebar Navigation/Item_Selected | `100:7600` | 40 dp |
| Nested items | `100:7605` | **36 dp** |
| Sidebar Navigation/Item-Dropdown | `100:7609` | 40 dp |
| Sidebar Navigation/Item-DropdownExpanded | `100:7619` | 40 dp |

Adjacent annotation text `100:8791` (304 × 109 dp): *"Relevant to SmartStart & ECD UI 'Practitioners' shown only for principals who have 1 or more additional practitioner working at the programme."*

### 9.5 Tabs

| Frame | Node | Size (dp) |
|---|---|---|
| Group 339 (tab/logo row, 48 dp) | `100:9413` | 188 × 48 |
| Frame 321 | `100:9421` | 188 × 48 |
| Group 340 (64 dp) | `100:9417` | 271 × 64 |
| Frame 322 | `100:9425` | 271 × 64 |
| Group 341 (tab area container) | `100:7044` | 798 × 200 |

Two tab-bar heights are in play: **48 dp** (compact) and **64 dp** (standard).

### 9.6 Slide-overs — frame `100:7481` (360 × 1150 dp)

| Item | Node | Size (dp) | Anatomy |
|---|---|---|---|
| Slider-overs (group) | `100:7482` | 360 × 750 | |
| ‣ bottom sheet with action icons | `100:7483` | 360 × 157 | Title "Profile Photo" (Quicksand SemiBold 18 `#27385A`) + 24 dp `x` at right; two 48 dp magenta `#FF2180` circular action buttons ("Gallery" photo icon, "Camera") with 12 px captions |
| ‣ bottom sheet with input | `100:7501` | 360 × 207 | "Change your name" + `x`; focused text input (white, 2 px `#1DBADF`, radius 6, 48 dp) with selected text; full-width primary "Save" button with leading icon |
| PWA | `100:7511` | 360 × 160 | "Add ECD Connect to your phone's home screen" row with 40 dp app icon + `x` + full-width primary "Download" button |
| Rectangle 36 (scrim/plate) | `100:7528` | 360 × 345 | grey backdrop plate |

Slide-over tokens: `Text Dark #27385A`, `ECD H3`, `Primary #27385A`, `White #FFFFFF`, `Secondary #FF2180`, `Help text`, `Quaternary #1DBADF`, `Text Light #C9CFD2`.

### 9.7 Action Panel — frame `100:7529` (360 × 371 dp)

| Panel | Node | Size (dp) | Anatomy |
|---|---|---|---|
| with link | `100:7530` | 328 × 193 | `#EFF6FA` panel, radius ~10 px, padding 16: H3/H4 title "Complete your Profile" (Quicksand SemiBold `#27385A`) + Inter 16/24 `#65727A` body + full-width **primary** button "Complete your profile" with leading 20 dp arrow-circle-right icon |
| Action panel statements | `100:7536` | 328 × 130 | `#EFF6FA` panel: 48 dp magenta `#FF2180` circular icon (documents) + bold statement "You haven't added any income for December!" + small **secondary outline** pill "+ Add income" (2 px `#FF2180`, magenta label, radius 10) |

---

## 10. Badges & avatars

### 10.1 Badge — frame `100:6960` (360 × 388 dp)

| Badge | Node | Size (dp) | Spec |
|---|---|---|---|
| Badges (count pill) | `100:6961` | 40 × 28 | green `#83BB26` pill, radius ≈14, white Inter SemiBold 12/16 — "0/5" |
| Badges set | `100:6962` | 150 × 133 | three variants below |
| ‣ `Property 1=solid` | `100:6963` | 110 × 28 | solid green `#83BB26` pill, white label "Available now" |
| ‣ `Property 1=outline` | `100:6966` | 106 × 28 | white fill, orange `#FF5C00` border + orange label "Coming soon" |
| ‣ `Property 1=offline` | `100:6968` | 48 × 16 | small red `#ED1414` pill, white 12 px label "offline" |
| Component 1 (level badges) | `100:6971` | 116 × 163 | four variants; label style `text-xs/leading-4/font-semibold/tracking-wide/uppercase` (Inter SemiBold 12/16, letter-spacing 2.5, uppercase) `#27385A` |
| ‣ `Property 1=Level Badge 1` | `100:6972` | 74 × 16 | magenta `#FF2180`/`#ED145B` chevron mark + "LEVEL 1" |
| ‣ `Property 1=Level Badge P` | `100:6978` | 74 × 16 | yellow `#FFD525` mark + "LEVEL P" |
| ‣ `Property 1=Level Badge 2` | `100:6982` | 76 × 17 | cyan `#00B0E0` mark + "LEVEL 2" |
| ‣ `Property 1=Level Badge 3` | `100:6988` | 76 × 26 | multi-colour stacked mark (yellow/cyan/magenta) + "LEVEL 3" |

Badge tokens: `Green Accent 1`/`Success Main #83BB26`, `Alert Main #FF5C00`, `Error Main #ED1414`, `Yellow Accent 4 #FFD525`, `SmartStart Tertiary #ED145B`, `SmartStart Secondary #00B0E0`, `Text Dark #27385A`, `White #FFFFFF`, `Text SM Semibold`, `Text XS Medium`.

### 10.2 Avatars — frame `100:7417` (360 × 626 dp)

| Avatar | Node | Size (dp) | Spec |
|---|---|---|---|
| Add photo avatar | `100:7418` | 125 × 125 | ~112 dp cyan `#1DBADF` circle with illustrated adult portrait + **magenta `#FF2180` 32 dp camera badge** at top-right |
| Add photo avatar2 | `100:7432` | 125 × 125 | same, cheetah/child illustration |
| Avatar Circle sm | `100:7468` | 48 × 48 | circular photo |
| Initials circle sm | `100:7471` | 48 × 48 | pale pink `#FFD3E6`-family circle with white initials ("WW") |
| Avatar icon no photo | `100:7474` | 120 × 120 | large pink circle with white initials ("NB") |
| Initials circle sm Kid | `100:7477` | 48 × 48 | child photo variant |

**Avatar size scale: 48 dp (sm) / 120 dp / 125 dp (with camera badge).**

