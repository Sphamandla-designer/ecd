# Offline-first UI patterns

**Offline is the normal case**, not an error: write local → queue → auto-retry → platform
reconciles. The governing rule is *warn and allow continue — do not block*.

Components referenced here live on Figma page
[`0:1`](https://www.figma.com/design/8s2xe3EyBRhrzDFy93NbfN/App-Screens?node-id=0-1).

---

## Principles

1. **Local writes always succeed.** Forms save to the local store instantly; sync is a
   background concern, surfaced honestly but quietly.
2. **Warn, never block.** Age outside range, missing fields, no connectivity → inform and allow
   continue; records save as *incomplete with a visible flag*.
3. **Connectivity is ambient state**, not a dialog. It lives in a small persistent indicator and
   the user keeps working.
4. **Reserve the slot.** Every screen template reserves space for the offline indicator so the
   layout never jumps when connectivity changes.

---

## Components

### Offline badge — `100:6968`

**48 × 16 dp** pill, `status.error.main` fill, white 12 sp label "offline". This is the badge
the design system ships; it is small enough to sit inline on a card or attached to the app bar.
It also appears on info dialogs to mark content that is stale (`WO6.5.0a` shows the badge at
48 × 16).

### Offline ticker

Full-width strip in `status.error.main` directly under the 64 dp app bar, with the badge centred
on it. Persistent while disconnected on every screen. On reconnect it is replaced for ~2 s by a
`status.success.main` "Back online — syncing" strip, then removed.

> Reserve this band in the scaffold (see
> [`screen-templates.md`](screen-templates.md)) so its appearance never shifts content.

### Offline card — `100:7106`

**328 × 204 dp.** The specified treatment for a surface that genuinely cannot render from
cache: illustration + "Information not available when offline". Use inside a screen, in place
of the block that needs the network — not as a whole-screen takeover.

### Sync status on records

Every queued entity shows one of three states, using the standard 28 dp badge:

| State | Treatment | Copy |
|---|---|---|
| **Pending** | `status.alert.bg` fill, `status.alert.dark` text, clock icon | "Saved on phone" |
| **Synced** | `status.success.main` check; drop the badge after 24 h | — |
| **Needs attention** | `status.error.main` | Conflict or rejection; the row opens a resolution screen |

### Offline confirmation

On submit while offline, the success banner switches from green to informational blue
(`status.info.*`): *"Saved on your phone. Will send when you're back online."*

### Full-page offline warning

Only when a screen genuinely cannot function — e.g. first-time login OTP, or programme
planning, which is **online-only** by design. Use the empty-state block: illustrated icon,
H2 "You're offline", body explanation, primary retry button, and a link to "what still works
offline".

---

## Flow rules

- **Login.** An authenticated session survives offline indefinitely. Only first-time login/OTP
  requires connectivity.
- **Theme & config.** Cached at login so a white-label tenant's brand renders with zero
  network. The in-binary ECD Connect theme is the fallback.
- **Child registration.** Minimal required fields; missing info saves as incomplete and flags
  the profile.
- **Attendance.** Select class → capture → "Saved locally" → auto-sync marker.
- **Money.** Income/expense entry queues offline. Statement download requires connectivity —
  and once downloaded the month is locked.
- **Progress observations.** Fully offline; `Save & exit` persists partial progress at any
  point. Report creation is irreversible, so require connectivity to create — or queue it with
  an explicit "will be created when online" state, never a silent local-only report.
- **Programme planning.** **Online-only** by design. If a conflict occurs, the **principal's
  plan is authoritative**.
- **Resources.** List and detail render from cache. The external link needs connectivity; the
  data-free warning is separate from the offline state and both can apply at once.
- **Conflicts.** The platform is the source of truth, but a conflicting local record stays
  visible as "Needs attention" until reconciled — **never silently discarded**.

---

## Data-free vs offline

These are different states and must not be conflated:

| | Offline | Not data free |
|---|---|---|
| Meaning | No connectivity | Link will consume the user's mobile data |
| Signal | Red badge / ticker | Orange `Alert` banner or pre-navigation dialog |
| Source | Device connectivity | `isDataFree` flag set on the portal |
| User choice | Keep working, sync later | Continue and spend data, or cancel |

A resource can be cached (viewable offline) *and* not data free (its external link costs data).

---

## Copy tone

Plain, reassuring, never technical: *"Saved on your phone"*, *"Will send later"*,
*"You're offline — you can keep working"*. No "sync failed", no error codes at the surface;
codes go to the support log.

---

## Implementation notes

- Every mutable entity needs a **client-generatable UUID** so offline-created records survive
  sync without duplication.
- Announce connectivity changes to screen readers with a polite live region — don't let the
  ticker appear silently.
- Never make a destructive operation the only path forward while offline.
- See [`../implementation/backend-contract.md §8`](../implementation/backend-contract.md) for
  the sync and conflict contract.
