# ECD Connect 2.0 — Mobile Design System

**White-label, offline-first design system** for the ECD Connect 2.0 platform: the ELP app
(Principal + Practitioner), the Coach app (WL only) and — where relevant — the Admin panel.

This system was reverse-engineered and consolidated from the two source Figma files:

| Source | Figma file | What it contributed |
|---|---|---|
| Funda App / SmartStart | [`PtgowNcKNzo12KErPmKPGr`](https://www.figma.com/design/PtgowNcKNzo12KErPmKPGr/Untitled) | Foundations page: colour palette, type, buttons, inputs, alerts, icons (outline/solid/duotone), illustrated icons, cards, lists, badges, avatars, progress, offline components; SmartStart tenant theme |
| Draft ECD Planning | [`7Ti9Qvr0dc1STxr6AWSxVX`](https://www.figma.com/design/7Ti9Qvr0dc1STxr6AWSxVX/Draft-ECD-Planning) | ECD Connect tenant theme (navy/pink/green/blue/yellow), hub-card category colours, loading/mascot brand moments, offline-warning patterns, OA vs WL screen variants |

and the **ECD ELP Mobile App plan** (white-label model, offline-first sync, tenant theming =
colour + type + logo per tenant, Android Compose clients, GoLang/Postgres multi-tenant backend).

## How this system is organised

```
design-system/
├── README.md                        ← you are here
├── foundations/
│   ├── colour.md                    Colour roles, tenant palettes, semantic colours
│   ├── typography.md                Font families, type scale, usage rules
│   ├── layout-spacing.md            Grid, spacing scale, radii, elevation
│   ├── iconography.md               Icon sets, sizes, container chips
│   └── illustration-imagery.md      Sticker icons, mascots, doodle patterns, photography
├── components.md                    Full component inventory with specs
├── patterns/
│   ├── white-label-theming.md       Tenant theming model (OA vs WL), what themes / what doesn't
│   └── offline-first.md             Offline UI states, sync feedback, conflict messaging
└── tokens/
    ├── tokens.json                  Machine-readable design tokens (core + semantic)
    ├── tenant-theme.schema.json     JSON Schema for TENANT.theme_tokens (backend contract)
    └── themes/
        ├── smartstart.json          SmartStart WL tenant theme
        └── ecd-connect.json         ECD Connect (OA / default) theme
```

## The one-sentence version

> One product, many tenants: every screen is built from **role-based tokens**
> (`primary`, `onPrimary`, `surface`, `textDark` …) that resolve to a **tenant theme**
> at runtime; layout, spacing, type scale, icons and component anatomy never change
> per tenant — only colour, logo and brand illustration do.

## Ground rules

1. **Never hard-code a hex.** Components reference colour *roles*; roles resolve via the
   active tenant theme (`TENANT.theme_tokens` from the backend, cached offline).
2. **Semantic colours are platform-wide.** Error/Alert/Success/Info are identical in every
   tenant so safety-critical meaning is never re-themed.
3. **Offline is a first-class state, not an error.** Every template reserves space for the
   offline ticker; destructive/blocking behaviour when offline is forbidden — warn and allow
   continue (per the plan's decision trees).
4. **360dp reference frame.** All specs are given at mdpi 360×640; use dp everywhere.
5. **Touch targets ≥ 48dp**, body text ≥ 16sp, help text ≥ 14sp — the audience includes
   low-digital-confidence users on small, low-end Android devices.

## Quick token reference

| Role | SmartStart (WL) | ECD Connect (OA) |
|---|---|---|
| `primary` | `#583F99` purple | `#27385A` navy |
| `secondary` | `#00B0E0` cyan | `#FF2180` pink |
| `tertiary` | `#ED145B` pink | `#83BB26` green |
| `background` | `#F3F1F9` lavender-grey | `#F4F6F9` cool grey |
| `textDark` | `#1F192E` | `#231F20` |
| Error / Alert / Success / Info | `#ED1414` / `#FF5C00` / `#83BB26` / `#1D67D5` | same (never themed) |

Type is **Quicksand SemiBold** (headings, buttons) + **Inter** (body, UI text) in both tenants.
