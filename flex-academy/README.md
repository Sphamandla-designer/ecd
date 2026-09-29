# Flex Academy — landing page assessment

A premium, two-path landing page for Flex Academy: **Build the business behind the bookings.**

| File | What it is |
| --- | --- |
| `index.html` | Live, responsive landing page (1440 → 390) with working conversion flows: Launch webinar registration, Scale strategy call booking and checklist capture. |
| `board.html` | Review board that follows the Figma page structure: **01 Landing page · 02 Mobile · 03 Conversion flows · 04 Design notes**. Every frame is the live page rendered in a named state. |
| `fonts/` | Self-hosted Plus Jakarta Sans (SIL OFL). |
| `photos/` | Drop photography here — see below. Each slot switches from its labelled fallback to the image automatically. |

Open `board.html` to review, or `index.html` to click through. Both are static and need no build step. To render the board's iframes reliably, serve the folder, for example with `npx http-server flex-academy`.

## Photography slots

The layout follows the supplied reference (cut-out figure in the hero, circular images in the split sections). Image generation and stock-photo hosts were both unreachable from the design environment, so the five slots ship with labelled fallbacks. Add these files and reload:

| File | Used for | Notes |
| --- | --- | --- |
| `photos/hero-person.png` | Hero cut-out figure | Person at a laptop, transparent background, ~900×1000px, bottom-aligned |
| `photos/launch-apartment.jpg` | Launch section circle | Official The Flex apartment photo, square crop |
| `photos/scale-operator.jpg` | Scale section circle | Operator / team at work, square crop |
| `photos/raouf-yousfi.jpg` | Founders | Official portrait, square crop |
| `photos/michael-buggy.jpg` | Founders | Official portrait, square crop |

Mark any generated image as such in the design notes; never use generated imagery for the founders.

## Static states for review

Add query parameters to `index.html` to render a single state:

```
index.html?embed&flow=launch&state=entry|form|filled|error|loading|done
index.html?embed&flow=scale&state=entry|form|filled|error|calendar|slot|done
index.html?embed&flow=checklist&state=error|done&at=checklist
index.html?embed&at=launch   |   &at=scale   |   &at=checklist
```

## Honesty rules applied

- Prices appear only as **X** and **Y** (Y > X).
- The webinar date, time slots, calendar links, budget bands, founder bios and photos, testimonials, contact details and legal details are all dashed orange placeholders.
- Proof uses only the figures in the brief: 150+ corporate partners, 130+ channels and the seven cities. Confirm them before launch.
- All five photo slots are labelled fallbacks until real files are added. There are no fabricated metrics.
- The official theflex.global and base360.ai sites were not reachable from the design environment, so the colours and fonts are **proposed tokens**. They are documented in the design notes.
