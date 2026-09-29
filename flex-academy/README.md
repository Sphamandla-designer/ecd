# Flex Academy — landing page assessment

A premium, two-path landing page for Flex Academy: **Build the business behind the bookings.**

| File | What it is |
| --- | --- |
| `index.html` | Live, responsive landing page (1440 → 390) with working conversion flows: Launch webinar registration, Scale strategy call booking and checklist capture. |
| `board.html` | Review board that follows the Figma page structure: **01 Landing page · 02 Mobile · 03 Conversion flows · 04 Design notes**. Every frame is the live page rendered in a named state. |
| `fonts/` | Self-hosted Plus Jakarta Sans and Instrument Serif Italic (SIL OFL). |

Open `board.html` to review, or `index.html` to click through. Both are static and need no build step. To render the board's iframes reliably, serve the folder, for example with `npx http-server flex-academy`.

## Static states for review

Add query parameters to `index.html` to render a single state:

```
index.html?embed&flow=launch&state=entry|form|filled|error|loading|done
index.html?embed&flow=scale&state=entry|form|filled|error|calendar|slot|done
index.html?embed&flow=checklist&state=error|done&at=checklist
index.html?embed&at=paths&tab=scale        (mobile path switcher)
```

## Honesty rules applied

- Prices appear only as **X** and **Y** (Y > X).
- The webinar date, time slots, calendar links, budget bands, founder bios and photos, testimonials, contact details and legal details are all dashed orange placeholders.
- Proof uses only the figures in the brief: 150+ corporate partners, 130+ channels and the seven cities. Confirm them before launch.
- The hospitality image and the Base360 UI card are labelled illustrative placeholders. There is no stock or AI imagery, and there are no fabricated metrics.
- The official theflex.global and base360.ai sites were not reachable from the design environment, so the colours and fonts are **proposed tokens**. They are documented in the design notes.
