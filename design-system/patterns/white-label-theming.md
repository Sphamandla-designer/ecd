# White-label theming

One product, many tenants. **ECD Connect** is the Open-Access (OA) default; **SmartStart** is
the first white-label (WL) tenant. Tenant theming is **colour, logo and brand assets — nothing
else**.

---

## 1. The seam: roles point at palette keys

The whole white-label mechanism is one indirection:

```
component  →  role.action  →  (theme says: "quaternary")  →  palette.quaternary = #1DBADF
```

A component never names a hue. It asks for `role.action`. The tenant theme decides which of its
palette hues that role resolves to. This is why SmartStart — whose brand has no fourth hue —
can map `action` onto its **secondary blue** without a single code change:

| Role | ECD Connect | SmartStart |
|---|---|---|
| `action` | `quaternary` `#1DBADF` | `secondary` `#00B0E0` |
| `select` | `secondary` `#FF2180` | `tertiary` `#ED145B` |
| `appBar` | `primary` `#27385A` | `primary` `#583F99` |
| `background` | `uiBackground` `#EFF6FA` | `uiBackground` `#F3F1F9` |

---

## 2. What themes, what never does

| Themeable per tenant | Fixed platform-wide |
|---|---|
| `palette` — the tenant's brand hues | **Status colours** (Error / Alert / Success / Info) |
| `roles` — which hue each role resolves to | **Developmental-domain colours** (they encode curriculum meaning) |
| `scrim` base + alpha | Type families and the full type scale |
| `categoryMapping` | Spacing, radii, elevation, motion |
| Logo lockups, app icon, favicon | Component anatomy and behaviour |
| CI patterns and graphic overlays | Iconography (Heroicons v1, two families) |
| Mascot / animoji pack | Offline patterns and sync UX |
| | Screen templates and flows |

**Two hard rules:**
1. **Status colours are never themed.** Safety-critical meaning must not be re-branded — an
   error is the same red in every tenant.
2. **Developmental-domain colours are never themed.** They map to curriculum categories, not to
   a brand.

The evidence for how little varies: the SmartStart hub and the ECD Connect hub are the *same
screen* — 64 dp app bar, category cards with 48 dp icon circles, 328 dp content column —
differing only in palette, logo and pattern.

---

## 3. Token pipeline

```
tokens/tokens.json              platform tokens (type, space, radius, status, domain)
tokens/tokens.css               the same, as CSS custom properties (web)
tokens/tenant-theme.schema.json the contract the backend must satisfy
tokens/themes/<tenant>.json     palette + role mapping + assets (one per tenant)
        │
        ├── backend:  TENANT.theme_tokens  (source of truth, served per tenant)
        ├── Android:  parsed into TenantColors, exposed via LocalTenantColors
        └── Web:      emitted as a [data-tenant] CSS block
```

The client **caches the theme offline** and falls back to the in-binary ECD Connect theme when
no override exists or the cache is cold.

---

## 4. Adding a tenant

1. Write `tokens/themes/<tenant>.json` against
   [`tenant-theme.schema.json`](../tokens/tenant-theme.schema.json). Supply the `palette`, then
   point each `role` at a palette key.
2. **Check contrast** for the new `action` and `select` hues — see
   [`../foundations/colour.md §6`](../foundations/colour.md#6-accessibility). White-on-action is
   already a known weak point in the default theme; don't make it worse.
3. Supply the assets: logo (colour + white), lockups, app icon, favicon, CI patterns, the
   graphic-overlay sizes the tenant's screens use, and optionally a mascot pack.
4. Load it into `TENANT.theme_tokens`.
5. Render the tenant against the screen catalogue in [`../screens/`](../screens/) and diff
   against the Figma frames. Anything that *changed shape* rather than colour is a bug.

---

## 5. What a tenant may **not** ask for

- A different type scale, spacing rhythm or corner radius.
- Re-coloured status or domain semantics.
- A restructured screen, a moved primary action, or an extra tab.
- A brand colour applied to an alert.

If a tenant needs one of these, it is a **platform change** — make it once, for everyone,
in this design system.

---

## 6. Legacy SmartStart tokens in shared components

Several components on the Design System page still carry raw SmartStart values
(`#583F99`, `#00B0E0`, `#ED145B`, `#F3F1F9`, `#1F192E`, and alternate status values
`#399E32` / `#E74035` / `#FF8A1D`) because they were inherited from the sibling Funda library
and never re-tokenised.

**Treat any SmartStart hex found inside a component as a bug**: re-map it onto a role and log
it. The affected frames are Cards (`100:7048`), Alert (`100:3721`, the `Alert - button` variant
uses `#29C1EF`), List (`100:6612`) and Select (`100:3862`). Full list in
[`../extraction/00-design-system-page.md §1.2`](../extraction/00-design-system-page.md).

Until they are re-tokenised, those components will not theme correctly for a third tenant.
