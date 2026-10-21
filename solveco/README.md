# SolveCo — Responsive Homepage Redesign Concept

**Status: production candidate.** Per the client's direction this page is now written and labelled as SolveCo's homepage, intended to replace the current one at <https://www.solveco.co.za/>. The concept banner, footer disclaimer, `noindex` tag, "stock placeholder" captions and "view on solveco.co.za" cues have been removed, and links to existing SolveCo pages open in the same tab. Before it goes live, the items under **Before launch** must be resolved.

## Before launch

1. **Photography licence.** All photos are crops of the Getty Images team photo in this repository. Confirm the licence covers web use, or replace the files in `img/` (same names, same crops) with SolveCo's own photography.
2. **Enquiry form backend.** The form validates but does not send. Connect it to an email handler or CRM and remove the "Form not yet connected" notice in `index.html`.
3. **Social profile URLs.** Facebook is linked. LinkedIn and X icons point to the homepage until the real profile URLs are supplied.
4. **Email address.** `info@solveco.co.za` comes from third-party directories; confirm it is monitored.
5. **Service page URLs.** Administration System Assistance and Modelling & Valuations cards link to the homepage; point them at their dedicated pages. The featured article button links to the Expert Insights index; point it at the article.
6. **Head of Actuarial Function.** An older SolveCo page says the firm cannot provide a HAF. Confirm the current position before publishing that wording.
7. **Spanish copy.** The translation was machine-assisted by this build; have a Spanish speaker proofread `js/i18n.js`.

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
| `js/main.js` | Progressive enhancement only: EN/ES language switch, accessible mobile menu, non-submitting form validation, footer year. |
| `js/i18n.js` | Spanish dictionary keyed by `data-i18n`. English is the page source; generated from the same content table as the HTML. |
| `img/` | Hero, about and contact crops plus three face crops, all from the team photo already in this repository (see "Photography"). |
| `fonts/` | Self-hosted Plus Jakarta Sans and Inter latin subsets (both SIL Open Font License). |
| `logo.svg` | Vector re-creation of the supplied SolveCo logo (see "Logo" below). |
| `assets/` | The supplied logo screenshot (`logo-source.png`) and the layout reference (`reference.jpg`). |
| `favicon.svg`, `og-image.svg` | Favicon and Open Graph preview image derived from the logo. |
| `solveco-standalone.html` | Single-file build with CSS, scripts, fonts and images inlined (about 670 KB). Regenerate after edits. |

## Design decisions

- **Positioning.** The proposed headline "Complex insurance challenges. Clear, dependable solutions." is presented as proposed copy, not a verified SolveCo slogan. Supporting copy covers actuarial expertise, administration system support, product and business development, modelling and valuations, and data services.
- **Visitor orientation.** A strip under the hero routes three visitor types (actuarial/product expertise; administration system implementations and migrations; modelling, valuations and data) straight to the relevant service card. These are design groupings drawn from the published services, not SolveCo's official customer segments.
- **Palette: white, red and black.** Per the client's direction and the logo. Near-black (`#0d0f12` to `#1d2126`) carries the top bar, header, hero overlay, audience band, service-card panels, projects, contact and footer; white sections alternate with a light grey; the logo red (`#e34d4e`) is the accent for buttons, chips, markers and the headline underline. One documented departure: filled buttons, red text on white and badges that carry text use a slightly darker red (`#cf3b3c`) because the logo red on white is 3.9:1, below the 4.5:1 text threshold. Red on charcoal uses a lighter tint (`#f07476`) for hover text for the same reason.
- **Logo.** The supplied file is a 221×60 screenshot on a charcoal background, too small to use directly and unusable on light surfaces. `logo.svg` re-creates it as vectors (bold "solve", light outlined red "co", "ACTUARIAL SERVICES" above, red triangle). Replace it with the official vector logo when available; letterforms are an approximation in Plus Jakarta Sans.
- **Layout from the reference, widened.** Content now runs to a 1440px container with a full-bleed photographic hero, so wide screens are filled rather than centred. The about block mirrors the reference exactly: rounded photo left, pill tag and heading right, icon-labelled "What we do" row, dark pill bar with a button, the second icon row under the photo, then a four-column stats row with red top bars. Stats hold only facts from the official site (since 2006, nine systems verified, four service areas, four sectors). Star ratings, avatars-with-counter and invented figures were not carried over.
- **Expanded sections.** Top bar with phone, email, location, social icons and the EN/ES switch; navigation Home · Services · Projects · About · Contact; a Projects section describing the engagement types on SolveCo's site without client names; a contact section with details, social links, photo and the prototype form; a four-column footer.
- **About bar and card CTAs (latest revision).** The "Led by..." line under About is a plain horizontal row with a red marker, a divider and a "Meet the team" button, replacing the black pill bar. Service and project cards end in an "Explore more" call to action instead of "View on solveco.co.za".
- **Language switch.** UK and Spanish flags with EN/ES abbreviations. Spanish is a full translation of every string (189 keys plus form messages), applied client-side, remembered in localStorage, and reflected in the `lang` attribute. The featured article title stays in English because the article is published in English.
- **Photography.** No image generation was available (the connected image service needs a paid plan) and every stock-photo host is blocked by this environment's network policy. All photographs are crops of the Getty Images team photo already uploaded to this repository, captioned as stock placeholders. Getty imagery is licence-controlled: confirm the licence or replace these before showing the concept outside the team.
- **Typography.** Plus Jakarta Sans for headings, buttons and labels (close to the reference's geometric sans); Inter for body text. Both self-hosted, no third-party requests at runtime.
- **Visual interest without stock imagery.** Inline SVG and CSS compositions only: layered "work in progress" cards in the hero, a before/after records panel in the about section, line illustrations on the service cards and a grid motif on the insight card. All are labelled illustrative and carry no data.
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

1. **Brand assets.** Colours come from the supplied logo screenshot; the official vector logo, brand fonts and any secondary colours are still needed. `logo.svg` is a re-creation and should be swapped for the original.
2. **Article URL.** The featured article's own URL could not be verified, so the "Read the expert insight" button links to the Expert Insights index page. Replace with the article URL once confirmed.
3. **Service page URLs.** Only the Product & Business Development and Data Cleaning Services page URLs were verifiable. The Administration System Assistance and Modelling & Valuations cards currently link to the SolveCo homepage. Swap in the dedicated page URLs.
4. **Head of Actuarial Function.** The homepage lists it under Other services, but an older "Statutory Work" page states SolveCo does not employ a statutory actuary and cannot provide a HAF. Confirm the current position before publishing this wording.
5. **Contact details.** The phone number appears on the official homepage but the extract was dated. `info@solveco.co.za` appears only in third-party directories (Crunchbase, Facebook), not in an extract of the official site; it is shown because the client asked for an email address, and must be confirmed. The careers email reuses it.
6. **Social media.** The Facebook page (facebook.com/solvecoconsult) was found in search results. No LinkedIn or X profile URL was verified, so those two icons currently link to solveco.co.za and say so in their accessible names. Replace with the real profile URLs.
7. **Projects.** Not a page on the official site; a single-page section built from published service descriptions, with no client names or results.
8. **Offices.** Older material mentions a Windhoek branch. Not included pending confirmation.
9. **Article summary.** The article body could not be read; the introduction reflects the focus stated in the brief (business understanding, requirements, specifications, testing) and the article's published subtitle only.

## Verification

Checked with headless Chromium (Playwright 1.56) against a local static server, in the current (black, red, white; expanded) version.

| Check | 1440 | 1024 | 768 | 390 | 320 |
| --- | --- | --- | --- | --- | --- |
| Horizontal overflow (`scrollWidth` vs `clientWidth`) | none | none | none | none | none |
| Elements extending past the viewport | none | none | none | none | none |
| Console errors / warnings / failed requests | none | none | none | none | none |
| Smallest rendered text (excluding the vector logo) | 12px (service tags on charcoal) | 12px | 12px | 12px | 12px |
| Interactive targets under 24×24 | none | none | none | none | none |
| H1 and hero CTAs visible without scrolling (900px tall) | yes | yes | yes | yes | H1 yes, CTAs just below the fold |

Language switch: clicking ES translates the headline, navigation and every keyed string (zero untranslated keys), sets `lang="es"`, survives a reload, and the form's validation messages follow the language; EN restores the original text. Interaction checks at 390px: menu toggle visible; menu hidden by default; opens on click and on Enter; `aria-expanded` updates; Escape closes and returns focus to the toggle; Tab from the toggle lands on the first link and focus is trapped within the open menu; choosing a link closes the menu and scrolls to the section. All in-page anchors resolve to existing ids. All external links point only to `www.solveco.co.za` and carry `target="_blank" rel="noopener"`. Form: empty submit shows field errors and focuses the first invalid field; invalid email is flagged; a valid submission shows the non-submission notice. One `h1`, logical `h2`/`h3` order. Fonts load. Text contrast was checked for every visible text node against its effective solid background, and manually for text over the hero gradient and translucent chips: no pair below WCAG AA thresholds (4.5:1 normal, 3:1 large). Reduced-motion preference disables smooth scroll and transitions.

Fixed during verification (this version): the white hero panel's heading and link inherited the dark-section white text; the top-bar location icon was unsized. Earlier versions: the mobile menu panel was clipped (the header's `backdrop-filter` made it the containing block for a fixed panel); the nav CTA inherited the nav link colour, giving 1.05:1 contrast; the first redesign pass split the hero background dark/light through the copy, which was replaced with a fully dark hero and an overlapping band; red elements carrying text were moved to the darker red for contrast.

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
