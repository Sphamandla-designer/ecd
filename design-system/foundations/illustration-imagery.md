# Illustration & imagery

The illustration layer is what makes the apps feel warm and early-childhood-appropriate
without compromising the utility of the data-entry surfaces. Four families:

## 1. Sticker icons (illustrated circles)

Source: `Illustrated_icons_2` (`5:17396`) — flat vector illustrations inside solid-colour
circles. Subjects: toys (blocks, balloons, rocking horse, maracas, drum, rubber duck),
animals (lion, elephant, penguin), money (piggy bank, cash, folder), achievement (trophy,
thumbs-up, lightbulb) and app states (no-internet globe).

Rules:
- Circle backgrounds rotate through the **brand category hues** (navy, yellow, pink, blue,
  green) — pick the circle colour to contrast the subject, not to encode meaning.
- Inside the circle: flat shapes, no gradients, 2–3 colours + white, subtle darker-tone
  shadows only.
- Used at 48–96dp in: empty states, celebratory dialogs, onboarding steps, tutorial cards,
  points/rewards moments.
- Never use sticker icons as tap targets for critical actions (they decorate, Heroicons act).

## 2. Mascots ("the robots")

Source: `Robots` (`5:19204`) and ECD loading screens. Friendly robot characters (green robot
with heart panel, orange junior robot) on brand-colour circles.

- Appear in: loading/splash ("Waking up the robots"), points & gamification
  (points card mascot), celebratory and tutorial dialogs (e.g. "dialog card - Cebisa").
- WL tenants may swap the mascot set as part of brand assets; the *slots* (loading screen,
  points card, celebration dialog) are fixed.

## 3. Doodle pattern (brand texture)

Both tenants texture their `primary` surfaces with a **tonal doodle pattern** at low
contrast (~8–12 % lighter than the fill): ECD Connect uses organic shapes/rings/triangles;
SmartStart uses line-drawn flowers/stars. Applied to: app-bar/hero headers, splash screen,
welcome banners. Content must never depend on the pattern (it is decorative, `importantForAccessibility=no`).

Tenant theming: the pattern asset is part of `theme_tokens.assets` (see
[white-label-theming](../patterns/white-label-theming.md)).

## 4. Photography

- Real classroom/child photography appears only in content cards (200dp image header on
  `radius-lg` cards) and the info centre.
- Warm, natural-light, real South African ECD settings; children shown engaged in play.
- **Safeguarding**: photos of identifiable children require recorded consent (aligns with the
  plan's child-protection screens); prefer over-shoulder/hands-on-activity crops in generic UI.
- Placeholder while loading/offline: `gray50` block with duotone image icon.

## 5. Emoji set

A packaged emoji sheet (`5:19043`) supports progress/feedback moments (rating faces on
observation flows). Use the packaged set — not device emoji — for visual consistency.
