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

## Brief coverage

| Brief requirement | Where it is |
| --- | --- |
| Two audiences, Launch leads | Hero pill = Launch; Scale link under it + nav button; Launch section first, Scale owns the dark section |
| 5-second / 30-second test | Hero states who it's for and both actions; method cards + proof strip before any offer |
| Launch conversion: name, email, country → confirmation with date + add-to-calendar | Flow A (`?flow=launch&state=…`) |
| Scale conversion: units, target, city, budget band → calendar → confirmation | Flow B (`?flow=scale&state=…`) |
| Secondary: waitlist / STR scaling checklist | Footer capture (`?flow=checklist&state=…`) |
| Act at any scroll depth | CTA in nav, hero, both offer sections, grid, selector, final block; mobile sticky bar |
| Sceptical audience vs YouTube / cheap courses / masterminds | "Why not just…" section |
| Offer details (X/Y, components) + proposed better structure | Launch/Scale sections, "What you get"; board notes §8 |
| Three-brand relationship | Proof strip, founders chain, notes §2 |
| Desktop 1440 full scroll · Mobile 390 hero + one section | Board pages 01 and 02 |
| Design notes: audience, structure, 3 decisions, first test, 2-more-days, Loom outline | Board page 04 |
| Optional hero motion concept | Live in `index.html` hero (underline draws, doodles pop, figure rises; off under reduced motion) |
| Mark anything not made by you | Fonts (SIL OFL) and all photo slots are labelled; no stock or AI imagery is included |

## Honesty rules applied

- Prices appear only as **X** and **Y** (Y > X).
- The webinar date, time slots, calendar links, budget bands, founder bios and photos, testimonials, contact details and legal details are all dashed orange placeholders.
- Proof uses only the figures in the brief: 150+ corporate partners, 130+ channels and the seven cities. Confirm them before launch.
- All five photo slots are labelled fallbacks until real files are added. There are no fabricated metrics.
- The official theflex.global and base360.ai sites were not reachable from the design environment, so the colours and fonts are **proposed tokens**. They are documented in the design notes.
