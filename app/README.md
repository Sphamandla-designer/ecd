# ELP App — Android (Jetpack Compose)

Offline-first, white-label ELP app (Practitioner + Principal). Implements **Tranche 1
(Entry & Orientation)**: W1 Loading · W2 Auth (phone + OTP + PIN proposal) · W3 Profile
(scaffolded) · W4a Dashboard — against the repo [design system](../design-system/README.md).

## Build & run

Requires Android Studio (or an Android SDK) — the SDK cannot be installed in the remote
session this code was authored in, so **this project has not been compiled here**; expect
possibly a few trivial compile fixes on first import.

```bash
./gradlew :app:assembleEcdConnectDebug    # ECD Connect (OA) tenant
./gradlew :app:assembleSmartstartDebug    # SmartStart (WL) tenant
```

Two product flavors = two tenants from one codebase. Each flavor pins a `TENANT_ID`; the
matching theme JSON in `src/main/assets/themes/` is the in-binary fallback. In production
the theme refreshes from `TENANT.theme_tokens` after login and is cached, so the app always
boots fully branded with zero network.

## Architecture

```
ui/            Compose screens per spec (loading, auth, profile, dashboard) + components
navigation/    NavHost + bottom nav shell (Home · Classes · Income* · Profile) *Principal
theme/         TenantColors (role-based), Status (never themed), type scale, dimens
data/          LocalStore (DataStore, local-first writes) · SyncEngine (pending-op queue,
               drains when online) · ConnectivityObserver · AuthRepository (stub OTP)
model/         Profile, ClassRoom, PendingOp, SyncState
```

Principles enforced in code:

- **Local writes always succeed** — `SyncEngine.recordWrite()` queues; the UI never waits
  on the network. Sync state surfaces as the calm header chip + per-section pending chips.
- **Offline never forces re-login** (assumption A3): session is a long-lived local value;
  W1 routes straight to the dashboard offline; PIN (W2c proposal, A2) re-enters offline.
- **Inform, don't block**: loose phone validation (server decides), no OTP lockout,
  completeness card with exactly one next action, "needs attention" rows that link to the
  exact record.
- **Derive rather than ask**: class/child counts computed, never asked.

## Spec token mapping

| Spec role | Design-system token (in `TenantColors`) |
|---|---|
| `action` / `on-action` | `primary` / `onPrimary` |
| `action-soft` | `primaryAccent2` |
| `ink-900` / `ink-700` / `ink-500/400` | `textDark` / `textMid` / `textLight` |
| `surface-0` / `surface-50` | `surface` / `background` |
| `line` | `TenantColors.line` (primaryAccent2 @ 50%) |
| `success/warning/danger/info` | `Status.success*/alert*/error*/info*` (platform constants) |

## Deliberate stubs (swap points)

| Stub | Real thing (tranche) |
|---|---|
| `AuthRepository` fake OTP (code `00000` demos the wrong-code state) | GoLang platform auth |
| `SyncEngine.pushToPlatform` 300ms ack | Multi-tenant sync API + conflict handling |
| DataStore JSON collections | Room, when attendance/registration volumes land (W5/W6/W8) |
| `Take attendance` marks classes done locally | W6 attendance capture |
| Classes / Income tabs | W5 / W12 |
| Nudge slot default tip | Kenkai SDK (one nudge at a time, A5) |

Assumptions A1–A5 from the spec are marked with comments at the exact code sites.
