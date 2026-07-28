# ECD Connect 2.0 — Mobile Design System

The complete design system for the ECD Connect platform, extracted from the Figma file
**[App-Screens `8s2xe3EyBRhrzDFy93NbfN`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=0-1)**.

Every value in here — colour, type, spacing, radius, component geometry, screen anatomy — was
read out of that file, not inferred. Build against this and screens will match the designs.

---

## The one-minute version

> **Navy is the frame. Cyan is the action. Magenta is the selection.**
>
> 360 dp frame · 16 dp margins · **328 dp content column**.
> Quicksand names things, Inter explains them.
> Every screen is one of [seven templates](patterns/screen-templates.md).

```
role.appBar     #27385A  navy     app bars, headings, body text
role.action     #1DBADF  cyan     primary buttons, FAB, focus, active tab, links
role.select     #FF2180  magenta  chips, search button, avatars, selection
role.background #EFF6FA           screen background AND input fill
```

> ⚠️ **If you worked from the older SmartStart/Funda system:** the primary button is **cyan**,
> not navy. `background` is `#EFF6FA`, not `#F4F6F9`. `primaryAccent2` is `#D4D7DE`, not
> `#D3D8E1`. See [foundations/colour.md](foundations/colour.md).

---

## Where to start

| You are… | Read this |
|---|---|
| **Front-end dev, building a screen** | [patterns/screen-templates.md](patterns/screen-templates.md) → the relevant [screens/](screens/) doc → [components.md](components.md) |
| **Android dev, wiring it up** | [implementation/android-compose.md](implementation/android-compose.md) |
| **Web dev** | [tokens/tokens.css](tokens/tokens.css) + [components.md](components.md) |
| **Back-end dev** | [implementation/backend-contract.md](implementation/backend-contract.md) |
| **Designer** | [foundations/](foundations/) + [extraction/](extraction/) (raw Figma readout) |
| **Adding a tenant** | [patterns/white-label-theming.md](patterns/white-label-theming.md) |
| **Anyone — just want to see it** | **[preview/index.html](preview/index.html)** — open in a browser |

### Live preview

[`preview/index.html`](preview/index.html) renders the whole system from `tokens/tokens.css`:
the palette, type scale, every component state, and **mini prototypes of all seven screen
templates at 360 dp**. Nothing in it is hard-coded — the tenant switch at the top re-points the
roles and you can watch colour change while layout, type and spacing stay put. That is the
white-label mechanism working, visibly.

---

## Structure

```
design-system/
├── README.md                      ← you are here
├── components.md                  Full component library, build-precision specs
│
├── foundations/
│   ├── colour.md                  Palette, roles, status, domains, accessibility
│   ├── typography.md              Quicksand + Inter, the full type scale
│   ├── layout-spacing.md          360/16/328 grid, bands, spacing, radius, elevation
│   ├── iconography.md             Heroicons v1 (Outline 24 / Solid 20), domain icons
│   └── illustration-imagery.md    Illustrated icons, emoji, graphics, animoji, patterns
│
├── screens/                       Per-feature catalogue — flows, build recipes, rules
│   ├── money.md                   WO7.x  income & expenses, statements
│   ├── programme.md               WO6.x  themes, activities, stories, nudges
│   ├── progress.md                WO5.x  observations, caregiver reports
│   ├── resources.md               resource hubs, filters, detail, data-free gating
│   ├── profile-journey.md         profile, journey, self-assessment
│   └── dbe-registration.md        Apply→Bronze, Comply→Silver ladder
│
├── patterns/
│   ├── screen-templates.md        The 7 templates every screen reduces to
│   ├── white-label-theming.md     Tenant contract; what themes, what never does
│   └── offline-first.md           Offline states, sync feedback, data-free vs offline
│
├── implementation/
│   ├── android-compose.md         Token wiring, composables, scaffold, a11y, verification
│   └── backend-contract.md        API contract + the rules the server must enforce
│
├── tokens/
│   ├── tokens.json                Machine-readable tokens (the source of truth)
│   ├── tokens.css                 Same, as CSS custom properties
│   ├── tenant-theme.schema.json   JSON Schema for TENANT.theme_tokens
│   └── themes/
│       ├── ecd-connect.json       OA / default theme — matches the Figma designs exactly
│       └── smartstart.json        WL tenant example
│
└── extraction/                    Raw Figma readout, per page — the audit trail
    ├── 00-design-system-page.md   Page 0:1, the component library
    ├── page18-money.md            page 139:55673
    ├── page19-resources.md        page 139:63406
    ├── page20-profile.md          page 139:65077
    ├── page21.md                  page 139:66313
    ├── page-145-5234.md           "Page 22" — programme planning
    ├── page-145-20658.md          "Page 23" — DBE registration
    └── page-145-23196.md          "Page 24" — child progress
```

---

## Ground rules

1. **Never hard-code a hex.** Components reference `role.*`, `status.*`, `category.*` or
   `domain.*`. If you type `#1DBADF`, you wanted `role.action`.
2. **Status and domain colours are never themed.** Error red and the four developmental-domain
   colours mean the same thing in every tenant.
3. **328 dp is the content column.** Every card, button, alert, row and dialog is 328 wide at
   the 360 dp reference. Four documented exceptions: tables 318, dialog content 296, menu items
   288, `full width` dividers 360.
4. **Touch targets ≥ 48 dp**, body ≥ 16 sp, help ≥ 14 sp. The audience includes
   low-digital-confidence users on small, low-end Android devices.
5. **Offline is a state, not an error.** Every template reserves the offline slot; destructive
   blocking while offline is forbidden — warn and allow continue.
6. **Permission gates hide, they don't disable.** For users without rights the designs *remove*
   the action, the help icon and the nudges rather than greying them out.
7. **Odd padding numbers are deliberate.** 17 dp button padding and 14 dp focused-input inset
   are border compensation. Reproduce them exactly.

---

## Token quick reference

| | Token | Value |
|---|---|---|
| Action | `role.action` / hover / disabled | `#1DBADF` / `#8EDCEF` / `#D2F1F9` |
| Selection | `role.select` / subtle | `#FF2180` / `#FFD3E6` |
| Chrome | `role.appBar` / muted | `#27385A` / `#52607B` |
| Surfaces | `role.surface` / `background` / `line` | `#FFFFFF` / `#EFF6FA` / `#D4D7DE` |
| Text | `role.textDark` / `textMid` / `textLight` | `#27385A` / `#65727A` / `#C9CFD2` |
| Error | main / dark / bg | `#ED1414` / `#D20000` / `#FFEEF6` |
| Alert | main / dark / bg | `#FF5C00` / `#E43802` / `#FFEEE4` |
| Success | main / dark / bg | `#83BB26` / `#5A8F02` / `#E6F1D4` |
| Info | main / dark / bg | `#1D67D5` / `#1752AB` / `#EBF3FF` |

| | Size |
|---|---|
| App bar / tabs / filter bar / language bar / footer | 64 / 56 / 56 / 74 / 72 dp |
| Button (visual) / small / FAB | 40 / 32 / 48 dp |
| Input / textarea / chip | 48 / 120 / 40 dp |
| Default list row | 80 dp (+ 4 dp gap) |
| Radius: input / card / button / dialog / FAB | 6 / 10 / **15** / 20 / 24 |

Type: **Quicksand SemiBold** — H1 24/32, H2 20/28, H3 18/24, H4 16/22, button 14/20.
**Inter** — body 16/24, help 14/20, caption 12/16.

---

## Known issues carried over from the source design

Real problems in the Figma file, recorded here rather than silently "fixed":

| Issue | Where |
|---|---|
| White-on-cyan primary buttons are **2.2:1** — below WCAG AA | [colour.md §6](foundations/colour.md#6-accessibility) |
| Disabled buttons are white-on-`#D2F1F9` (1.3:1), effectively invisible | [colour.md §6](foundations/colour.md#6-accessibility) |
| Three Colour-Palette swatches are mislabelled "Secondary/Accent 2" | [colour.md §2](foundations/colour.md#2-palette-figma-names--hex) |
| The H2 text style is named `EDC H2` (typo for ECD) | [typography.md](foundations/typography.md) |
| Shared components still carry raw SmartStart hexes instead of roles | [white-label-theming.md §6](patterns/white-label-theming.md) |
| Profile has no discard-confirmation dialog on ✕ close | [screens/profile-journey.md](screens/profile-journey.md) |
| No Profile-tab content is designed (hidden layer only) | [screens/profile-journey.md](screens/profile-journey.md) |
| DBE Comply page app bar still reads "DBE registration - Apply" | [screens/dbe-registration.md](screens/dbe-registration.md) |
| Community > Resources screen was accidentally deleted in Figma | [screens/resources.md](screens/resources.md) |

---

## Asset export — outstanding

The illustration, icon and screenshot binaries are **not** in this repo. The environment used to
build the system could not reach `www.figma.com` (the egress proxy blocks it), and that is the
only host serving Figma export URLs.

Every asset is catalogued with its node ID, so exporting is mechanical from a machine with Figma
access — see [`extraction/00-design-system-page.md`](extraction/00-design-system-page.md) §11–12
for the icon and illustration inventories, and each `extraction/page*.md` for screen node lists.

---

## Provenance

| Figma page | Node | Content |
|---|---|---|
| 🎨 Design System | `0:1` | Component library, palette, type, icons, illustrations |
| Page 18 | `139:55673` | Money / income & expenses |
| Page 19 | `139:63406` | Resources |
| Page 20 | `139:65077` | Profile & journey |
| Page 21 | `139:66313` | DBE registration helper |
| Page 22 | `145:5234` | Programme planning |
| Page 23 | `145:20658` | DBE registration helper (authoritative) |
| Page 24 | `145:23196` | Child progress |

Deep-link any node:
`https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=<id-with-dash>`
