# SolveCo — Responsive Homepage Redesign Concept

**Independent sales concept.** This prototype demonstrates the potential value of a homepage redesign for SolveCo, a South African actuarial and business solutions consultancy. It has **not** been commissioned, reviewed or endorsed by SolveCo and is not a replacement for the live site at <https://www.solveco.co.za/>. The page carries a visible banner and footer note saying so, and is marked `noindex, nofollow`.

## Run it

No build step and no dependencies. Serve the folder with any static server:

```
cd solveco
python3 -m http.server 8765
# open http://localhost:8765/
```

(`npx http-server solveco` works too.) Opening `index.html` directly from disk also works; a server is only needed for the self-hosted fonts to preload cleanly.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The single-page homepage concept (semantic HTML, section anchors only; no routes to pages that do not exist). |
| `css/tokens.css` | Centralised design tokens: colour, type scale, spacing, radii, layout widths, motion. |
| `css/styles.css` | Base styles, reusable components (buttons, text links, service cards, facts, form fields) and responsive rules. |
| `js/main.js` | Progressive enhancement only: accessible mobile menu, non-submitting form validation, footer year. |
| `fonts/` | Self-hosted Inter and Source Serif 4 latin subsets (both SIL Open Font License). |
| `favicon.svg`, `og-image.svg` | Text-based wordmark favicon and an Open Graph preview image for the concept. |

## Design decisions

- **Positioning.** The proposed headline "Complex insurance challenges. Clear, dependable solutions." is presented as proposed copy, not a verified SolveCo slogan. Supporting copy covers actuarial expertise, administration system support, product and business development, modelling and valuations, and data services.
- **Visitor orientation.** A strip under the hero routes three visitor types (actuarial/product expertise; administration system implementations and migrations; modelling, valuations and data) straight to the relevant service card. These are design groupings drawn from the published services, not SolveCo's official customer segments.
- **Palette.** Provisional deep navy, off-white and muted teal. The live site could not be loaded from the build environment (the domain is blocked by the network policy), so official brand colours, fonts and logo were not verifiable. The wordmark is text only; no logo was invented.
- **Typography.** Source Serif 4 for headings gives an editorial, established-practice tone; Inter for body text. Both self-hosted, no third-party requests at runtime.
- **Visual interest without stock imagery.** Two restrained inline SVG compositions (a system-of-stages diagram in the hero, a grid motif in the insight card). Both are labelled illustrative and carry no data.
- **Services.** Four service cards with example services taken from the published lists; the whole card is clickable via a single stretched link so there is one accessible name per card. External links open in a new tab with `rel="noopener"` and a visible/spoken "opens in a new tab" cue. An "Other services" panel references peer review, resource outsourcing and Head of Actuarial Function services so the four groups are not presented as the entire offering.
- **Approach.** Five principles paraphrase SolveCo's published description (understand the business first, transparent communication, project-specific resourcing, documented and transferable work, collaboration with client actuarial teams). It is explicitly labelled as a paraphrase, not a methodology or guarantee.
- **Contact.** The telephone number published on the SolveCo homepage and the official website are the functional contact routes. The form is labelled a non-submitting prototype: it validates inline, never transmits data, and never shows a false "sent" message. On a valid submission it tells the user nothing was sent and points to the real contact routes.
- **Restraint.** No testimonials, client logos, statistics, awards, dashboards, gradients or glass effects. Transitions are limited to hover/focus colour and a small arrow nudge, all disabled under `prefers-reduced-motion`.

## Factual basis

The SolveCo domain was unreachable from the build environment (proxy returns 403 for `www.solveco.co.za`; archive services are also blocked). Facts were therefore taken from search-engine extracts of the official pages listed in the brief. Everything on the page traces to one of these:

| Claim on the page | Source |
| --- | --- |
| Actuarial and business solutions provider to insurance and financial industries; operating since 2006 | solveco.co.za homepage |
| Four service groups and their example services; "Other services" list | solveco.co.za homepage |
| Focus on life assurance, pensions, health and short-term insurance | solveco.co.za About page extract |
| Working principles (understand the business first, transparent communication, resource allocation, documented/transferable work, integration with actuarial teams) | solveco.co.za homepage/About extracts and company description |
| Article "Why Insurance System Implementations Really Go Wrong", subtitle, author Mia Geringer | solveco.co.za Expert Insights tag listings |
| Mia Geringer, Managing Director and Founder | solveco.co.za/our-team/ extract |
| Telephone +27 10 900 0693 | solveco.co.za homepage extract |
| Johannesburg office | solveco.co.za About page extract |

## Unresolved questions (need confirming against the live site)

1. **Brand assets.** Official logo, colours and fonts could not be inspected. The navy/teal palette and text wordmark are provisional.
2. **Article URL.** The featured article's own URL could not be verified, so the "Read the expert insight" button links to the Expert Insights index page. Replace with the article URL once confirmed.
3. **Service page URLs.** Only the Product & Business Development and Data Cleaning Services page URLs were verifiable. The Administration System Assistance and Modelling & Valuations cards currently link to the SolveCo homepage. Swap in the dedicated page URLs.
4. **Head of Actuarial Function.** The homepage lists it under Other services, but an older "Statutory Work" page states SolveCo does not employ a statutory actuary and cannot provide a HAF. Confirm the current position before publishing this wording.
5. **Contact details.** The phone number appears on the official homepage but the extract was dated. No official email address was verifiable (`info@solveco.co.za` appears only in third-party directories), so none is shown. The contact page URL on the current WordPress site is unknown; links go to the homepage.
6. **Offices.** Older material mentions a Windhoek branch. Not included pending confirmation.
7. **Article summary.** The article body could not be read; the introduction reflects the focus stated in the brief (business understanding, requirements, specifications, testing) and the article's published subtitle only.

## Verification

Checked with headless Chromium (Playwright 1.56) against a local static server.

| Check | 1440 | 1024 | 768 | 390 | 320 |
| --- | --- | --- | --- | --- | --- |
| Horizontal overflow (`scrollWidth` vs `clientWidth`) | none | none | none | none | none |
| Elements extending past the viewport | none | none | none | none | none |
| Console errors / warnings / failed requests | none | none | none | none | none |
| Smallest rendered text | 12px (wordmark descriptor; hidden below 480px) | 12px | 12px | 13px | 13px |
| Interactive targets under 24×24 | none | none | none | none | none |
| H1 and hero CTAs visible without scrolling (900px tall) | yes | yes | yes | yes | yes |

Interaction checks at 390px: menu toggle visible; menu hidden by default; opens on click and on Enter; `aria-expanded` updates; Escape closes and returns focus to the toggle; Tab from the toggle lands on the first link and focus is trapped within the open menu; choosing a link closes the menu and scrolls to the section. All in-page anchors resolve to existing ids. All external links point only to `www.solveco.co.za` and carry `target="_blank" rel="noopener"`. Form: empty submit shows field errors and focuses the first invalid field; invalid email is flagged; a valid submission shows the non-submission notice. One `h1`, logical `h2`/`h3` order. Fonts load. Computed text contrast was checked for every visible text node against its effective background: no pair below WCAG AA thresholds (4.5:1 normal, 3:1 large). Reduced-motion preference disables smooth scroll and transitions.

Fixed during verification: the mobile menu panel was clipped (the header's `backdrop-filter` made it the containing block for a fixed panel); the nav CTA inherited the nav link colour on navy, giving 1.05:1 contrast; the wordmark descriptor was 11px.

**Not performed / unverified:** no HTML validator or automated accessibility engine (axe) was available offline; screen-reader testing (NVDA/VoiceOver) and real-device testing were not possible; the live site could not be loaded, so visual comparison and brand-asset checks are outstanding. WCAG 2.2 AA conformance is therefore a target, not a claim. No build, lint or type-check scripts exist because the project is dependency-free.

## Differences from the current website (based on extracts of the current site)

1. A single proposition and supporting sentence above the fold, rather than a list-first service menu.
2. Visitor-type orientation that routes insurers, system-implementation teams and modelling/data buyers to the right service in one click.
3. Four service groups with example services and a clear "other services" reference, each linking out to the existing official page.
4. The working approach given its own section, paraphrased from the current site's scattered description.
5. The existing Expert Insights article promoted as a featured editorial piece with a single call to action.
6. A credibility section built only from verified facts (since 2006, industries, leadership, office) with a link to the team page, instead of unverifiable claims.
7. A closing contact section with a primary call to action and an accessible, clearly labelled prototype enquiry form.
8. Fully responsive layout from 320px to 1440px with an accessible mobile menu, visible focus states, centralised design tokens and self-hosted fonts.
