# Offline-first UI patterns

The plan is explicit: **offline is the normal case** (plan §7 — write local → queue →
auto-retry → platform reconciles; "warn and allow continue — do not block"). These patterns
come straight from the source files (`Offline` symbol `5:21254`, offline pill/ticker
`5:13059`/`5:13062`, `Offline warning - full page`, snackbar variants).

## Principles

1. **Local writes always succeed.** Forms save to the local store instantly; sync is a
   background concern surfaced honestly but quietly.
2. **Warn, never block.** Age-outside-range, missing fields, no connectivity → inform and
   allow continue; records save as *incomplete with visible flag*.
3. **Connectivity is ambient state**, not an error dialog. It lives in a persistent, small
   indicator — the user keeps working.

## Components

### Offline pill
24dp pill, `errorMain` fill, `radius-full`, 6/4dp padding: 14dp `status-offline` icon +
"Offline" `caption` white. Appears attached to the app bar, centred.

### Offline ticker
Full-width 3dp `errorMain` strip under the 64dp app bar with the pill centred on it.
Persistent while disconnected on every screen; replaced for 2s by a green
"Back online — syncing" strip on reconnect.

### Sync status on records
Every queued entity (visit, attendance, registration) shows one of three chips:
- **Pending** — `caption` on `alertBg`, alert Dark text, clock icon ("Saved on phone")
- **Synced** — `successMain` check, no chip needed after 24h
- **Needs attention** — `errorMain`, conflict or validation rejection; row opens resolution

### Offline snackbar
On submit while offline: success-green snackbar copy changes to informational blue:
"Saved on your phone. Will send when you're back online."

### Full-page offline warning
Used only when a screen genuinely cannot render from cache (rare — e.g. first login OTP):
sticker icon (globe-with-slash), `h2` "You're offline", `bodyLarge` explanation, retry
primary button, and "what still works offline" help link.

## Flow rules (from plan decision trees)

- **Login**: an authenticated session must survive offline indefinitely; only first-time
  login/OTP requires connectivity.
- **Child registration**: minimal fields; missing info ⇒ save incomplete + flag on the
  profile ("registration incomplete" state exists in Figma `4.1.7`).
- **Attendance**: select class → capture → "Saved locally" confirmation → auto-sync marker.
- **Coach visit**: whole single-form visit works offline incl. GPS capture; submit queues.
- **Conflicts**: platform is source of truth; on conflict the local record is kept visible
  with "Needs attention" until reconciled — never silently discarded.
- **Theme/logo/config**: cached at login so a WL tenant's brand renders with zero network.

## Copy tone

Plain, reassuring, never technical: "Saved on your phone", "Will send later",
"You're offline — you can keep working". No "sync failed", no error codes at the surface
level (codes go to the support log).
