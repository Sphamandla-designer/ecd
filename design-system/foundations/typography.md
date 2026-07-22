# Typography

Two families, both open-source (Google Fonts), both with broad glyph coverage for South
African languages. Typography is **identical in every tenant** — the white-label layer may
swap the logo but not the type system (per the plan, tenant theming = colour, type *scale
stays fixed*, logo).

| Family | Weights used | Role |
|---|---|---|
| **Quicksand** | SemiBold 600 (headings, buttons), Medium 500 (chip resting, colour labels), Bold 700 (rare, small emphasised buttons) | Display/heading/button face — rounded, friendly, child-development-appropriate |
| **Inter** | Regular 400, Medium 500, SemiBold 600 | Body, help text, UI micro-copy, numbers/tables |

## Type scale

Extracted from the Funda "Text" foundations frame (`5:10667`) and shared Figma styles
(`ECD H1`…`ECD Small button text`, `Text XS/SM/Base`). Sizes in sp, line height in dp.

| Token | Family / weight | Size / line height | Usage |
|---|---|---|---|
| `display` | Quicksand SemiBold | 28 / 36 | Welcome banner ("Welcome Bulelwa!"), splash |
| `h1` | Quicksand SemiBold | 24 / 32 | Screen titles, card headlines |
| `h2` | Quicksand SemiBold | 20 / 28 | Section titles |
| `h3` | Quicksand SemiBold | 18 / 24 | Dialog titles, sub-sections |
| `h4` | Quicksand SemiBold | 16 / 22 | Input labels, list-item titles, card titles |
| `bodyLarge` | Inter Regular | 16 / 24 | Body copy (`ECD Body Copy`) |
| `body` | Inter Regular | 16 / 22 | Input values (`Text Base Regular`) |
| `bodySmall` | Inter Regular | 14 / 20 | Help text, list subtitles (`ECD Help text` / `Text SM Regular`) |
| `bodySmallStrong` | Inter SemiBold | 14 / 20 | Snackbar text, badge labels (`Text SM Semibold`) |
| `caption` | Inter Medium | 12 / 16 | Offline pill, notification dots, timestamps (`Text XS Medium`) |
| `button` | Quicksand SemiBold | 14 / 20 | Standard buttons (`ECD Primary Button Text`) |
| `buttonSmall` | Quicksand SemiBold | 12 / 16 | Small buttons (`ECD Small button text`) |
| `chip` | Quicksand Medium (resting) / SemiBold (active) | 14 / 16 | Chips, segmented controls |

Letter spacing is 0 across the scale.

## Colour pairing

| Text token | Default colour role |
|---|---|
| display, h1–h4 | `textDark` (white on `primary` headers) |
| bodyLarge/body | `textDark` |
| bodySmall (help) | `textMid` |
| placeholder | `textLight` |
| error message | `errorDark` |
| button label | `onPrimary` (white) / `primary` for secondary buttons |

## Rules

1. **Headings and buttons are always Quicksand SemiBold** — this is the single strongest
   brand signal after colour; do not substitute Inter.
2. **Never set body copy below 14sp**; 12sp Inter Medium is reserved for pills/captions.
3. Respect user font scaling (sp units); layouts must tolerate 1.3× text without truncation —
   prefer wrapping over ellipsis for form labels and alerts.
4. Sentence case everywhere (buttons included: "Complete your profile"). No all-caps.
5. Numbers in money/attendance tables use Inter (tabular figures where available).
6. Multilingual: copy expands up to ~35 % in isiZulu/isiXhosa — buttons and list titles must
   auto-wrap, never clip.
