# Page 20 — Profile (WO1.3.0) & Practitioner Self-Assessment

**Figma file key:** `8s2xe3EyBRhrzDFy93NbfN`
**Page (canvas) node:** `139:65077` — "Page 20"
**Device frame:** 360 × 640 dp (mdpi baseline). Content gutter 16 dp → content width 328 dp.
**Extracted:** 2026-07-28

> **Asset note:** PNG exports could not be written to disk — this environment's egress proxy
> blocks `www.figma.com` (403 on CONNECT), so `curl` of the short-lived asset URLs fails.
> Every screen below was instead rendered and viewed inline at full size, and is documented in
> text. The "Figma node deep-link index" at the end replaces the asset index — open any node
> directly in Figma from those URLs.

---

## 1. Page overview

Page 20 holds two connected but distinct clusters of screens:

1. **Profile / Journey screens (`WO1.3.0 Profile`)** — the practitioner (or child/parent)
   profile screen, which is a two-tab screen (`Profile` | `Journey`). Only the **Journey** tab
   is designed on this page: a vertical timeline ("Antenatal visits" frame, reused as a generic
   journey-step stack) listing lifecycle milestones — app registration, course completion,
   self-assessment completion — each with a coloured circular status token, title, date and an
   optional trailing action button.
2. **The Practitioner self-assessment form flow (`N7.1.x`)** — a 6-step (plus alternate
   step 8/9) single-select questionnaire launched from the Journey tab's "Fill in a form"
   button, and the **SmartSpace summary (`13.4.0`)** results screen that a completed
   self-assessment resolves to when the user taps "View".

Two `Header` instances (`139:65083` at y=0, `139:65084` at y=1662, each 5205 × 300) are the
page's canvas section banners and are not app screens.

A stray, un-parented **`Logo - Stacked`** artwork frame (`139:65639`, 300 × 195, 11 vector
paths) sits at x=878, y=2357 — the SmartStart wordmark used inside step 1.

### Design-system observations
- Two visual "shells" recur: **Title with subtitle** (dark navy 64 dp app bar) and
  **Page Title** (33–58 dp on-white heading block).
- Form screens are tall, single-scroll frames (up to 2028 dp) with a **sticky bottom
  `Form Layout` bar** (360 × 72) holding a full-width 328 × 40 primary button.
- Every questionnaire question is a `Label` text + a `Frame 32x/33x` of exactly **three
  `Radio Group default` instances** (328 × 54, 4 dp gaps → 58 dp pitch, 170 dp block).
- Steps 5/8/9 swap radio groups for **`Select card`** instances (328 × 56, or 80 when the
  label wraps to two lines; 4 dp gaps).

---

## 2. Flow map

```
                    ┌──────────────────────────────────────┐
                    │ WO1.3.0 Profile — Journey tab        │
                    │ 139:65085 (with coach banner)        │
                    │ 139:65149 (without banner)           │
                    └───────────────┬──────────────────────┘
                                    │ tap "Fill in a form"          tap "View" on a
                                    │ (comment 139:65243)           completed journey step
                                    ▼                               (comment 139:65319)
              ┌──────────────────────────────────┐                          │
              │ W15.0.0 Journey — form picker    │                          │
              │ 139:65245  "Which form would     │                          │
              │            you like to fill?"    │                          │
              │ 139:65266  empty state           │                          │
              │            "No forms available   │                          │
              │             yet"                 │                          │
              └───────────────┬──────────────────┘                          │
                              │ tap "Self-assessment form"                  │
                              ▼  (comment 139:65317)                        │
   N7.1.1 step 1  139:65464  intro / "Start"                                │
        ▼                                                                   │
   N7.1.2 step 2  139:65321  6 radio questions                              │
        ▼                                                                   │
   N7.1.3 step 3  139:65362  4 radio questions                              │
        ▼                                                                   │
   N7.1.3 step 4  139:65393  6 radio questions                              │
        ▼                                                                   │
   N7.1.5 step 5  139:65434  8 select cards (Next disabled)                 │
        ▼           ├── variant  step 8  139:65490 (Next enabled)           │
        ▼           └── variant  step 9  139:65510 (Next enabled)           │
   N7.1.6 step 6  139:65454  free-text "long text input"                    │
        ▼                                                                   │
        └──────────────────────────────────────────────────────────────────►│
                                                                            ▼
                                        13.4.0 SmartSpace summary — Licence awarded
                                                        139:65530
```

The Journey tab's "View" pill on the "Self-assessment form completed" step is the entry
point to `13.4.0`; the sequence step 1 → 6 is enforced by the header's "step N of 6" counter
and the bottom-bar Next/Start button.

---

## 3. Screen inventory

| Node id | Name | Size (dp) | Purpose |
|---|---|---|---|
| `139:65083` | Header | 5205 × 300 | Canvas section banner (not a screen) |
| `139:65084` | Header | 5205 × 300 | Canvas section banner (not a screen) |
| `139:65085` | WO1.3.0 Profile | 360 × 640 | Profile screen, **Journey** tab, with "Need help? Contact your coach" informational banner |
| `139:65149` | WO1.3.0 Profile | 360 × 640 | Same screen with the informational banner removed (banner-less variant) |
| `139:65212` | comment | 360 × 410 | Designer note: "All possible journey items" — the three journey-step patterns |
| `139:65243` | comment | 360 × 102 | Designer note: entry point into the form picker |
| `139:65245` | W15.0.0 Journey | 360 × 640 | "Fill in a form" picker — list of available forms |
| `139:65266` | W15.0.0 Journey | 360 × 640 | Form picker **empty state** ("No forms available yet") |
| `139:65317` | comment | 360 × 62 | Section label: "Practitioner self-assessment" |
| `139:65319` | comment | 360 × 92 | Section label: "View a completed self-assessment" |
| `139:65464` | N7.1.1 Practitioner self-assessment - step 1 | 360 × 640 | Form intro + SmartStart attribution + "Start" |
| `139:65321` | N7.1.2 Practitioner self-assessment - step 2 | 360 × 1818 | 6 single-select questions |
| `139:65362` | N7.1.3 Practitioner self-assessment - step 3 | 360 × 1335 | 4 single-select questions |
| `139:65393` | N7.1.3 Practitioner self-assessment - step 4 | 360 × 2000 | 6 single-select questions |
| `139:65434` | N7.1.5 Practitioner self-assessment - step 5 | 360 × 807 | 8 select cards; Next **disabled** |
| `139:65454` | N7.1.6 Practitioner self-assessment - step 6 | 360 × 640 | Free-text long input; Next **disabled** |
| `139:65490` | N7.1.5 Practitioner self-assessment - step 8 | 360 × 807 | 8 select cards; Next **enabled** |
| `139:65510` | N7.1.5 Practitioner self-assessment - step 9 | 360 × 791 | 8 select cards (last is `Select card default`); Next **enabled** |
| `139:65530` | 13.4.0 SmartSpace summary - Licence awarded | 360 × 2028 | Completed self-assessment results / licence outcome |
| `139:65639` | Logo - Stacked | 300 × 195 | Loose SmartStart logo artwork on canvas |

Unique *screens*: 13 (excluding headers, comments and the loose logo).
