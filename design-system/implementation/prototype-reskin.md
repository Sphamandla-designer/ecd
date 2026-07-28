# ELP prototype — design-system re-skin

Applying the ECD Connect 2.0 design system to `ELP App Prototype (standalone).html`.

**Scope: visual layer only.** No screen, flow, component, interaction, copy or piece of logic
was changed. The commit before this one holds the prototype exactly as received, so the diff
is the whole story.

Rebuild command:

```bash
python3 design-system/implementation/apply-ds-to-prototype.py \
        "ELP App Prototype (standalone).html" out.html
```

The script asserts every substitution — a pattern that no longer matches fails the build
rather than silently skipping.

---

## Why this was a small diff

The prototype was already built against an early read of the same Figma file and is
**thoroughly tokenised**: 56 CSS custom properties, `var(--token)` used 1131 times across the
React code, and only 3 hard-coded hex values in the whole stylesheet. So the re-skin is
almost entirely a matter of re-pointing token values — which flows through every screen at
once without touching markup.

Structure of the file: a bundler wrapper whose line 400 is a JSON-encoded string containing the
real single-page app. The script decodes it, edits, and re-encodes.

> **Re-encoding gotcha:** the original escapes every `/` as `/` so that a literal
> `</script>` inside the string cannot terminate the host `<script>` element. `json.dumps`
> does not do this. Miss it and the app silently renders nothing. The script reproduces it.

---

## What changed

### 1. Tokens (`:root`)

| Token | Was | Now | Why |
|---|---|---|---|
| `--line`, `--doc-line` | `#e3e7ec` | `#d4d7de` | `role.line` = `palette.primaryAccent2` |
| `--line-soft` | `#edf1f5` | `rgba(212,215,222,.55)` | derived from the DS line instead of an off-system grey |
| `--warning` | `#f7a600` | `#ff5c00` | `status.alert.main` |
| `--warning-soft` | `#fdf3e0` | `#ffeee4` | `status.alert.bg` |
| `--warning-dark` | `#8f5b08` | `#c23002` | `status.alert.dark` hue, darkened for AA — see §4 |
| `--success-dark` | `#4a7a16` | `#487202` | `status.success.dark` hue, darkened for AA — see §4 |
| `--ink-black` | `#121212` | `#27385a` | on-system `textDark` (token was unused) |
| `--ss-purple-soft` | `#efebf8` | `#d7d1e6` | DS SmartStart `primaryAccent2` |
| `--hero` (smartstart) | `#3d2b6e` | `#583f99` | DS SmartStart `primary` |
| `--r-semi` | `12px` | `10px` | 12 is not on the DS radius scale (2/4/6/10/15/20/24) |
| `--e-card`, `--shadow-card` | `0 10px 10px -5px …` | `elevation.lg` | DS two-layer card shadow |
| `--e-dialog`, `--shadow-dialog` | `0 20px 25px -5px …` | `elevation.dialog` | DS dialog shadow |

**Added** (previously missing, now available to the whole app): `--action-hover`,
`--action-disabled`, `--pink-mid`, `--green-mid`, `--cyan-mid`, `--yellow-mid`, the four
`--domain-*` colours, and `--focus-ring`.

Already correct and left alone: navy, pink, green, cyan, yellow and their softs, `--ink-900/500/300`,
`--surface-0`, `--surface-ui`, `--scrim`, error and info triplets, `--r-input/card/btn/dialog/pill`,
`--e-btn`, both font families.

### 2. Typography

Utility classes moved onto the DS scale:

| Class | Was | Now |
|---|---|---|
| `.h1` | 600 26/32 | **600 24/32** (`typescale.h1`) |
| `.h2` | 600 22/28 | **600 20/28** (`typescale.h2`) |
| `.h3` | 600 20/26 | **600 18/24** (`typescale.h3`) |
| `.h0` | 600 30/36 | **600 28/36** (display step, onto the 4 px grid) |
| `.field-label` | 500 15/20 Inter, muted navy | **600 16/22 Quicksand, `--ink-900`** (`typescale.h4` — the DS form label) |
| `.overline` | 600 11/16, `.04em` | **600 12/16, `.025em`** (`typescale.overline`, Tailwind `tracking-wide`) |

`.h4`, `.body-copy`, `.help-text`, `.label`, `.micro`, `.meta` were already on-scale.

**79 inline `font:` shorthands** in the React code were mapped the same way. Weight and family
were never touched — only size/line-height pairs that were off-scale:

```
600 26/32 → 24/32     600 13/18 → 14/20     400 13/18 → 14/20
600 22/28 → 20/28     600 15/21 → 16/22     400 13/19 → 14/20
600 20/26 → 18/24     500 15/20 → 16/22     400 15/22 → 16/24
600 30/36 → 28/36     500 13/18 → 14/20     400 12/18 → 12/16
600 11/16 → 12/16                           400 12/17 → 12/16
```

### 3. Components

| Component | Change |
|---|---|
| `.btn-p` primary | Label → `typescale.button` (14/20). Padding → 10/17 (DS border-compensated). Added `:hover` → `--action-hover` and a 150 ms `easingStandard` transition. |
| `.btn-o` secondary | Was a 1.5 px grey border on transparent → now the DS **2 px `--action` border on `--surface-0`**, with hover. |
| `.btn-dis` disabled | Fill → `--action-disabled`. DS metrics. `cursor:not-allowed`. |
| `.btn-d` destructive | DS button metrics + shadow; keeps `status.error` fill (no DS destructive variant exists). |
| `input.txt` | Was white with a 1.5 px border → now the **DS filled field**: `--surface-ui` fill, no resting border. Focus **inverts** to white + 2 px `--action` ring, drawn as an *inset* shadow so nothing shifts. Placeholder → `--ink-500` (`textMid`). |

`.btn-ss` / `.btn-ss-o` (small secondary) and the banner components already matched the DS.

**Button height:** the DS specifies a 40 dp painted pill inside a 48 dp touch target. The
prototype paints the full 48. `min-height:48px` was **kept** — reducing the painted height would
move every layout the brief requires preserved, and the DS mandates the ≥48 target either way.
The DS's internal metrics (14/20 label, 10/17 padding) are applied within it.

### 4. Accessibility

Maintained and improved — the brief requires WCAG contrast be preserved, and three DS-literal
pairings would have regressed it.

| Element | Figma-literal | Shipped | Ratio |
|---|---|---|---|
| Disabled button label | white on `#D2F1F9` | `#52607B` on `#D2F1F9` | 1.19:1 → **5.33:1** |
| Alert/warning title | `#E43802` on `#FFEEE4` | `#C23002` on `#FFEEE4` | 3.82:1 → **5.00:1** |
| Success title | `#5A8F02` on `#E6F1D4` | `#487202` on `#E6F1D4` | 3.34:1 → **4.86:1** |

In all three cases the **fill, icon and hue are unchanged** — only the small bold text tone is
darkened, staying on the same hue. Banner titles are 14 px SemiBold, below WCAG's large-text
threshold (18.66 px bold), so they need 4.5:1.

This is not a departure from the design system: [`../foundations/colour.md`](../foundations/colour.md)
states a 4.5:1 minimum for body text, so the darkened tones satisfy the system's own rule while
the Figma-literal values do not. The contrast table in that file has been corrected — it
previously mis-stated these two pairings as passing.

Also added: a `:focus-visible` ring (2 px `--action`, 2 px offset) for keyboard users, and a
`prefers-reduced-motion` block that neutralises the transitions introduced above.

**Still outstanding** (inherited, unchanged): white on `--action` `#1DBADF` measures 2.2:1.
Fixing it means darkening the brand action colour across every screen and the Figma file — a
decision for the designer, not a re-skin.

---

## Verification

Both versions were driven through Playwright across 10 screen states — Home, Classes,
Resources, Profile, the Attendance-due / Consent-imminent / Month-start scenarios, Onboarding,
and the SmartStart tenant. For each, DOM node count, button count, a recursive tag+class tree
signature, and full rendered text were captured and compared.

```
SCREEN              nodes b/a     btns b/a    tree b/a        TEXT IDENTICAL
home                77/77         21/21       950/950         True
Classes             91/91         18/18       1065/1065       True
Resources           93/93         17/17       1281/1281       True
Profile             121/121       18/18       1433/1433       True
Home                77/77         21/21       950/950         True
Attendance due      77/77         21/21       950/950         True
Consent imminent    77/77         21/21       950/950         True
Month start         77/77         21/21       950/950         True
Onboarding          25/25         11/11       176/176         True
SmartStart          44/44         22/22       345/345         True

ALL STRUCTURE + CONTENT IDENTICAL: True     console errors: none
```

Same screens, same flows, same navigation, same interactions, same hierarchy, same content.
Only the visual layer moved.

---

## What was deliberately *not* done

- No component moved, added, removed, renamed or merged.
- No screen split, merged or reordered; no navigation or IA change.
- No form, validation, business-logic or state-handling change.
- No copy edits.
- The `.h0` display step was kept rather than collapsed into `h1`, to preserve the existing
  hierarchy — the DS has no display token, so it was landed on the 4 px grid instead.
- Known UX issues in the prototype were left alone, per the brief.


---

## Follow-up: Home screen rebuilt as the Figma hub

Requested after the re-skin: make Home match the Figma hub, keeping the bottom nav.
Applied by `figma-hub-home.py` (same assert-on-miss approach).

**Source:** [`139:66569` "W3.0 Hub page"](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=139-66569) — spec in [`../screens/home.md`](../screens/home.md).

| Change | Detail |
|---|---|
| Home body replaced | The scroll area is now the scenario notification card, then the four category cards + points row |
| Category cards | Classroom (`category.stories`), Business (`teachingTips`), Community (`activities`), Training (`other`) — 328 × 80, radius 10, 48 dp icon circle, h4 label, chevron, **84 dp pitch** (80 + 4 gap) |
| Points row | 328 × 80 on `status.success.bg`, 48 dp circle, `h1` value + `h4` unit, progress bar, chevron |
| Header | Added the avatar button the Figma hub carries (→ Profile) |
| Hero band | Added the tonal CI-shape motif Figma layers behind the greeting (`Graphic overlay Small 80px`, `100:8639`), drawn in CSS since the asset can't be exported here |
| Bottom nav | **Kept**, as asked — the Figma frame has no bottom nav |

Measured against Figma: cards 328 × 80, radius 10 px, icon circles 48 px, pitch 84 px. Exact.

**Navigation** (verified for both roles, no console errors):

| Card | Practitioner | Principal |
|---|---|---|
| Classroom | Classes tab | Classes tab |
| Business | Downloads (`exports`) | Income tab |
| Community | Resources | Resources |
| Training | Resources | Resources |
| Points | Profile | Profile |

The prototype has no Business/Training sections, so those cards route to the nearest
existing destination. Community and Training both land in Resources for the same reason.

### The scenario card, rebuilt to Figma

Requested back after the first hub pass. Figma's **`WO5.4.3 Hub notification`**
([`145:27122`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=145-27122))
shows exactly how: an **Action Panel "with link"** (`100:7530`, 328 × 145) sits at the top of
the content frame, directly above the category cards. That is the slot the home spec reserves
for hub notifications, one at a time (designer note `145:23755`).

| Scenario state | Component | Build |
|---|---|---|
| Actionable — attendance due, consent imminent, month start | **Action Panel "with link"** | `role.surface` panel, radius 10, `elevation.lg`, padding 16 → `h3` title → full-width primary button with a leading 20 dp icon |
| Cleared — all clear | **Success alert** (`100:3777`) inside the same panel | `status.success.bg` fill, 20 dp check in `status.success.main`, `helpStrong` title in `status.success.dark`, note in `textDark` |
| Offline deferral | **Informational alert** (`100:3778`) inside the panel | `status.info.bg`, 20 dp icon, `helpStrong` title in `status.info.dark` |
| Secondary "a few things need a look" | DS list row | 56 dp, `role.surface`, count chip in `status.alert.bg`/`.dark`, chevron |

**Why the cleared state is nested rather than bare.** A standalone success alert is
`#E6F1D4` — the same tint as the Training and Points cards directly below it, so it blended
into them. Keeping every state inside the one white panel preserves Figma's arrangement, where
the notification is a single distinct slot above the tinted category rows.

**Panel fill is `role.surface`, not `role.background`.** The DS defines the Action Panel as a
`role.background` panel because in Figma it sits on navy. Here it sits on the `surface-ui`
content area, so the pairing inverts to stay legible — same component, correct contrast.

The one icon that could not be matched: Figma's button uses a filled circled-arrow
(`Icon/Solid/arrow-circle-right`). The prototype ships a 15-glyph icon set without it, and the
DS rule is not to invent components, so the nearest existing glyph (chevron) is used.

Verified: all five scenarios × both roles produce distinct card content, the offline deferral
renders, and there are no console errors.

### Scope

Only Home changed. Verified across the same 10 screen states — Classes, Resources, Profile,
Onboarding and the SmartStart tenant are byte-identical to the re-skinned build; the three
scenario rows differ only because they *are* Home.


---

## Follow-up: MVP review fixes

Three fixes from the prototype review note. Nothing outside Home and the resource
taxonomy was touched.

**1. Points widget removed.** The points value, label and progress bar are gone from Home,
along with the row that carried them. Gamification is out of MVP scope and cuts against the
adult-professional aesthetic.

**2. Training tile removed.** The shortcut and its route are gone. Confirmed by search that
`Training` now appears nowhere in the bundle, and no route opens a training or course surface.
(The "Business skills short course" and "First aid certification course" entries are resource
*items* inside Resources, not a training surface.)

**3. Resource taxonomy reconciled.** The Home shortcuts now use the Resources section's own
category list verbatim, in its order, taken from the `Kh` component:

| Home shortcut | Opens |
|---|---|
| Running your preschool | that category |
| Early learning activities | that category |
| Health and safety | that category |
| Funding and subsidies | that category |

Each navigates `resDetail{name}` — exactly the call the Resources hub itself makes, so both
entry points land on the same screen. One taxonomy, used in both places.

### A pre-existing crash had to be repaired to make fix 3 work

`resDetail` had **no case in the router**. It fell through to `default:`, which renders `Rh` —
a component defined nowhere in the bundle. Tapping any category *inside Resources* threw
`ReferenceError: Rh is not defined` and white-screened the app. This reproduces in the
original file as received, commit `062b279`; it is not a regression from any of this work.

The acceptance criterion "tapping one opens that category" cannot hold against a destination
that crashes, so two minimal repairs were made:

- **`Rh` defined** as a placeholder screen, so any unimplemented route degrades to a titled
  "not part of the prototype yet" card instead of taking the whole app down.
- **`resDetail` wired** to a category screen built from helpers the bundle already ships
  (`$d` for categories, `Ud` for a category's resources) and the existing header component.
  It lists that category's resources with title, blurb and the data-free line, using
  `status.success.dark` / `status.alert.dark`. Items are static — the main app has no
  resource-detail route, so nothing implies a tap that does not exist.

This also fixes the Resources tab, which had the same dead end.

### Verification

```
Points widget absent : PASS      Running your preschool    -> opens that category
Training tile absent : PASS      Early learning activities -> opens that category
Today card present   : PASS      Health and safety         -> opens that category
look line present    : PASS      Funding and subsidies     -> opens that category
console errors: none
```

Classes, Resources, Profile, Onboarding and the SmartStart tenant are byte-identical across
the 10-screen crawl. All four scenario states and both roles still drive the Today card.
