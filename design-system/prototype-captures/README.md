# Prototype captures — 100 screens & states

Every screen and state in `ELP App Prototype (standalone).html`, captured at 2× from a
360 dp phone frame. These are the images referenced by the annotated Figma file:

**https://www.figma.com/design/1b2PEGtGAWKqxN61KsVXy5/**

## Why the images are here and not in Figma

They could not be uploaded from the build environment. Outbound HTTPS to Figma is blocked
by an organisation egress policy — `mcp.figma.com` and `www.figma.com` both return
**403 on CONNECT**, which the environment's proxy documentation says to report rather than
retry. Every card in the Figma file therefore carries a correctly-sized dashed placeholder
naming the exact PNG to drop in.

## Dropping them in

Each placeholder frame is named `IMAGE → <filename>.png`. In Figma, select a placeholder and
paste or drag the matching file — the frame is already at the right aspect ratio (372 × 726
or 372 × 740 at 1×), so it will fill cleanly.

## Naming

| Prefix | Meaning |
|---|---|
| `app__<route>` | A main-app route, e.g. `app__whosPaid.png` |
| `app__<route>__<param>` | A route needing a record id, e.g. `app__child__k1.png` |
| `state__<tenant>__<role>__<connection>__<scenario>` | A Home permutation |
| `onb__<flow>__<nn>` | A step in one of the five onboarding entry paths |

## Coverage

- **50** main-app routes (every `case` in the prototype router)
- **28** Home permutations — 2 tenants × 2 roles × online/offline × 5 scenarios (SmartStart sampled)
- **22** onboarding steps across 5 entry paths
- `annotations.json` holds the description, design decisions, assumptions and proposals
  written for each capture — the same content that is laid out in the Figma file.

## Reproducing

The capture harness adds a `window.__elp` hook to a throwaway copy of the prototype so every
route can be driven directly. It is never shipped — the delivered prototype has no hook.
See `figma-hub-home.py` and the scratch scripts referenced in `prototype-reskin.md`.
