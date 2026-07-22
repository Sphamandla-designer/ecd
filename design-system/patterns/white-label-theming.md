# White-label theming

One product, many tenants (plan §0: OA vs WL). SmartStart is the first WL tenant; ECD
Connect branding is the OA/default theme. Tenant theming = **colour, logo and brand assets
per tenant** — nothing else.

## What themes, what never themes

| Themeable per tenant (`theme_tokens`) | Fixed platform-wide |
|---|---|
| Colour roles (`primary`…`quinary`, accents, text tints, background, scrim) | Semantic status colours (Error/Alert/Success/Info) |
| Logo lockups (light-on-primary, dark-on-white, favicon/app icon) | Type families & scale (Quicksand + Inter) |
| Doodle pattern asset for `primary` surfaces | Spacing, radii, elevation |
| Mascot/sticker asset pack (optional; defaults provided) | Component anatomy & behaviour |
| Splash/loading copy tone (optional strings) | Iconography (Heroicons + duotone) |
| | Offline patterns & sync UX |

Evidence from the source files: the SmartStart hub and the ECD Connect hub are the *same
screen* — 64dp header (menu + logo + bell + avatar), doodle-patterned welcome banner,
stacked category cards with 48dp icon circles — differing only in palette, logo and pattern.

## Token pipeline

```
tokens/tokens.json           core + semantic tokens (platform)
tokens/themes/<tenant>.json  role → hex map + asset refs (one per tenant)
        │
        ├── backend: TENANT.theme_tokens (Postgres, tenant-scoped; source of truth)
        ├── Android (Compose): MaterialTheme wrapper fed by a TenantTheme object
        └── Admin panel (React): CSS custom properties
```

- Apps fetch `theme_tokens` at login, **cache them locally** (offline-first: the app must
  boot fully branded with no network), and refresh on sync.
- The default (OA) theme ships in the binary as fallback; a WL tenant theme overrides it
  after first login. Never flash the wrong brand: hold on the neutral splash until the
  cached theme loads.
- `theme_tokens` must validate against [`tokens/tenant-theme.schema.json`](../tokens/tenant-theme.schema.json)
  in the Admin panel/Backstage before save — bad themes are a support fire in the field.

## Rules for adding a tenant

1. Provide `primary`, `secondary`, `tertiary` (+ accent tints — generate 40 %/80 % tints if
   the brand doesn't specify), `textDark/Mid/Light`, `background`.
2. Verify contrast: white must pass 4.5:1 on `primary`; `textDark` 4.5:1 on `background`;
   if `secondary` fails on white (SmartStart cyan does), it is auto-restricted to
   fills/borders exactly like the default themes.
3. Logos: light lockup (used on `primary`) and dark lockup (used on `surface`), SVG,
   24dp-height safe area.
4. Doodle pattern: single-colour SVG tile; the app renders it at 8–12 % tonal contrast on
   `primary` — tenants supply the shape, not the colour.
5. Category hues: tenants with fewer than 5 brand colours map `quaternary`/`quinary` to
   `secondaryAccent1`/`tertiaryAccent1`.

## Compose sketch

```kotlin
@Immutable
data class TenantColors(
    val primary: Color, val primaryAccent1: Color, val primaryAccent2: Color,
    val secondary: Color, val secondaryAccent1: Color, val secondaryAccent2: Color,
    val tertiary: Color, val tertiaryAccent1: Color, val tertiaryAccent2: Color,
    val quaternary: Color, val quaternaryAccent2: Color,
    val quinary: Color, val quinaryAccent2: Color,
    val textDark: Color, val textMid: Color, val textLight: Color,
    val background: Color, val surface: Color, val modalScrim: Color,
)

val LocalTenantColors = staticCompositionLocalOf { EcdConnectDefault }

@Composable
fun EcdTheme(tenant: TenantColors, content: @Composable () -> Unit) =
    CompositionLocalProvider(LocalTenantColors provides tenant) {
        MaterialTheme(typography = EcdTypography, shapes = EcdShapes, content = content)
    }
// Status colours live in a separate, constant object: EcdStatus.error/alert/success/info.
```
