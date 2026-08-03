// Documentation-card data for every Coach App screen.
// Emits one batch per Figma page; the renderer lives in the file itself.
const fs = require('fs');

const COACH = 'Coach (SmartStart field worker), on an Android phone, often outdoors and often with no signal.';
const PERM_COACH = ['Coach role only. The admin portal creates coaches; there is no self sign-up.'];
const PERM_SCOPED = ['Coach role only.', 'Scoped to the sites in this coach’s caseload — the admin team assigns them.'];
const OFF_READ = ['Reads from the local store. Opens with no signal.'];
const OFF_WRITE = ['Writes to the local store first, then syncs. Nothing is lost if the phone goes offline mid-task.'];
const WL_TOKENS = ['Colour, logo mark and product name come from tokens. Re-brand is a value change, not a redesign.'];
const WL_COPY = ['Copy names SmartStart directly — needs tokenising before a white-label deployment.'];

const PAGE = {
  AUTH: '04 Authentication', ONB: '05 Onboarding', HOME: '06 Home', NOTIF: '06 Home',
  VIS: '07 Visits', WORK: '08 Visit Workspace', OBS: '09 Observation', DISC: '10 Coaching Discussion',
  ACT: '11 Action Plans', TASK: '11 Action Plans', SITE: '12 Sites', EX: '13 Unexpected Situations',
  OFF: '14 Offline & Sync', RES: '15 Resources', PROF: '16 Profile & Settings'
};

const D = {};

// ─────────────────────────────── 04 Authentication ───────────────────────────────
D['AUTH-01 Splash'] = {
  p: 'Cold-start screen. Restores the session, checks for queued work on the phone, and routes the coach to Home or to Login.',
  u: COACH,
  g: 'Get into the app without thinking about it.',
  en: ['App icon on the home screen.', 'Return from a killed process or a device restart.'],
  ex: ['Automatic → HOME-01 Home when the session is still valid.', 'Automatic → AUTH-02 Login when it is not.', '"Continue to sign in" → AUTH-02 Login.'],
  kb: ['Three-dot loader animates while the local store is opened.', '"Getting your day ready…" reports what is happening rather than a bare spinner.', 'A manual escape hatch is offered in case the automatic route stalls.'],
  ux: ['Brand mark is the only thing above the fold — no marketing copy on a screen nobody reads.', 'Progress copy is plain language, not a percentage.'],
  mvp: ['Session restore.', 'Route to Home or Login.', 'No blocking network call — the splash must clear offline.'],
  pm: PERM_COACH,
  st: ['Loading (shown).'],
  off: ['Fully offline. Session validity is read from the device, not the server.'],
  dp: ['Local session store.', 'Local queue count (used later by AUTH-04).'],
  oq: ['MVP Question: how long may the splash hold before we force it to Login — 3s, 5s, or never?'],
  fe: ['Warm-start skip so returning coaches never see this screen.'],
  wl: WL_TOKENS,
  an: [['ux', 'The manual "Continue to sign in" link exists because the automatic route depends on local storage that can be evicted by the OS. It is deliberate redundancy, not a spare control.'],
       ['q', 'MVP Question: no timeout is specified in the build. Engineering will pick one unless product decides.']]
};
D['AUTH-02 Login'] = {
  p: 'Cell-number and PIN sign-in for coaches the admin team has already registered.',
  u: COACH,
  g: 'Sign in on a phone that may be shared or replaced.',
  en: ['AUTH-01 Splash when no valid session exists.', 'PROF-01 Me → Log out.'],
  ex: ['"Sign In" → ONB-01 Welcome on first run, otherwise HOME-01 Home.', '"I forgot my PIN" → AUTH-03 Forgot PIN.'],
  kb: ['Cell number is the identifier — there is no email field.', '"Keep me signed in on this phone" is pre-selected.', 'Support number is printed on the screen so a locked-out coach is never stuck.'],
  ux: ['Registration is closed by design; the helper text says so up front rather than after a failed attempt.', 'Both fields are 58px tall for outdoor, one-handed use.'],
  mvp: ['Cell + PIN authentication.', 'Persistent session toggle.', 'Forgot-PIN entry point.'],
  pm: PERM_COACH,
  st: ['Resting (shown).'],
  off: ['First sign-in needs signal. Subsequent unlocks are local — see AUTH-04.'],
  dp: ['Admin portal coach register.', 'SMS gateway (for AUTH-03).'],
  oq: ['MVP Question: how many failed PIN attempts before lockout, and does lockout live on the device or the server?', 'MVP Question: is the support number the same for every deployment, or per-partner?'],
  fe: ['Biometric unlock after the first PIN entry.'],
  wl: WL_COPY,
  an: [['asm', 'Assumption: the error state for a wrong PIN is not in the build. Documented, not designed — no error styling has been invented here.'],
       ['mvp', 'MVP Requirement: sign-in must work on a phone that has never seen this coach before, since devices get swapped in the field.'],
       ['q', 'MVP Question: the "Keep me signed in" default is on. Confirm this is acceptable for a device that may be shared.']]
};
D['AUTH-03 Forgot PIN'] = {
  p: 'Requests a one-time SMS code to the cell number the admin team holds for this coach.',
  u: COACH,
  g: 'Get back in without phoning the office.',
  en: ['AUTH-02 Login → "I forgot my PIN".'],
  ex: ['Back arrow → AUTH-02 Login.', '"Send Code" → OTP entry (not in this build).'],
  kb: ['The number cannot be changed here — it must match the admin record.', 'Fallback line points at the admin team.'],
  ux: ['Reset is scoped to a number already on file, which closes an account-takeover path.'],
  mvp: ['Request an SMS one-time code.', 'Return path to Login.'],
  pm: PERM_COACH,
  st: ['Resting (shown).'],
  off: ['Requires signal. No offline path — the fallback is the admin team.'],
  dp: ['SMS gateway.', 'Admin portal coach register.'],
  oq: ['MVP Question: OTP entry, expiry and resend screens are not in the build. Are they in scope for the October MVP?'],
  fe: ['In-app reset once the coach is already signed in.'],
  wl: WL_TOKENS,
  an: [['q', 'MVP Question: the flow ends at "Send Code". The OTP entry screen does not exist in this deck — flagged, not invented.'],
       ['asm', 'Assumption: the SMS is sent to the registered number only, and the field is read-only in practice even though it renders as an input.']]
};
D['AUTH-04 Session Expired'] = {
  p: 'Re-authentication after a long absence, without discarding anything captured on the phone.',
  u: COACH,
  g: 'Unlock quickly and be reassured that nothing was lost.',
  en: ['Any screen, after the session ages out.'],
  ex: ['"Unlock" → back to the screen the coach was on.', '"Sign in as someone else" → AUTH-02 Login.'],
  kb: ['Only the PIN is asked for — the cell number is already known.', 'The footer counts the queued items still on the phone by name ("1 draft visit and 2 updates").'],
  ux: ['The reassurance line is the point of this screen. Data anxiety is the reason coaches avoid re-locking.'],
  mvp: ['PIN-only re-entry.', 'Return to the interrupted screen.', 'Queue count in the footer.'],
  pm: PERM_COACH,
  st: ['Resting (shown).'],
  off: ['Fully offline — the PIN is verified against the device.'],
  dp: ['Local session store.', 'Local outbox (for the count).'],
  oq: ['MVP Question: what is the session lifetime — hours, days, or on app kill?'],
  fe: ['Biometric unlock.'],
  wl: WL_TOKENS,
  an: [['ux', 'Switching user is a secondary link, not a button. Swapping accounts on a phone with unsynced work is deliberately made the harder path.'],
       ['q', 'MVP Question: what happens to the queue if the coach does sign in as someone else? The build does not say.']]
};

// ─────────────────────────────── 05 Onboarding ───────────────────────────────
const ONB_COMMON = {
  u: COACH,
  pm: PERM_COACH,
  st: ['Resting (shown).'],
  off: ['Fully offline. No network call in the whole onboarding sequence.'],
  dp: ['Local first-run flag.'],
  wl: WL_TOKENS
};
D['ONB-01 Welcome'] = Object.assign({}, ONB_COMMON, {
  p: 'First screen after the first successful sign-in. Names the product and what it is for.',
  g: 'Understand in one screen what this app does.',
  en: ['AUTH-02 Login, first run only.'],
  ex: ['"Get Started" → ONB-02 Stay Organised.', '"Skip" → ONB-05 Permissions.'],
  kb: ['Skip is available from the first screen.', 'The three value props are named in one sentence rather than listed.'],
  ux: ['Centred layout with no step counter — this screen sits outside the 1/3–3/3 sequence that follows.'],
  mvp: ['Show once per install.', 'Skip must reach the permissions screen, not the end.'],
  oq: ['MVP Question: does onboarding re-run after an app update, or only on a fresh install?'],
  fe: ['A short animation of a visit being captured.']
});
D['ONB-02 Stay Organised'] = Object.assign({}, ONB_COMMON, {
  p: 'Value proposition 1 of 3 — planning and preparing visits.',
  g: 'Learn that the app holds the day’s schedule.',
  en: ['ONB-01 Welcome → "Get Started".'],
  ex: ['"Next" → ONB-03 Capture Sessions.', '"Back" → ONB-01 Welcome.', '"Skip" → ONB-05 Permissions.'],
  kb: ['Step indicator reads 1 / 3 with a pill for the active step.'],
  ux: ['Illustration is built from three overlapping token-coloured circles, so it re-brands with the palette.'],
  mvp: ['Three-step carousel with working Back, Next and Skip.'],
  oq: ['MVP Question: is swipe navigation expected as well as the buttons?'],
  fe: ['Localised copy (isiZulu, Sesotho) to match the resource library.']
});
D['ONB-03 Capture Sessions'] = Object.assign({}, ONB_COMMON, {
  p: 'Value proposition 2 of 3 — the five-step visit workflow.',
  g: 'Learn that a whole coaching session is captured in one guided flow.',
  en: ['ONB-02 Stay Organised → "Next".'],
  ex: ['"Next" → ONB-04 Work Offline.', '"Back" → ONB-02.', '"Skip" → ONB-05 Permissions.'],
  kb: ['Names the five steps as a promise the workspace then keeps.'],
  ux: ['Copy commits to "five simple steps", which the visit header repeats as "Step n of 5".'],
  mvp: ['Three-step carousel with working Back, Next and Skip.'],
  oq: ['MVP Question: the workspace ships with steps 1 and 5 designed. Do the middle three keep the same chrome?'],
  fe: ['Tap-through preview of the workspace.']
});
D['ONB-04 Work Offline'] = Object.assign({}, ONB_COMMON, {
  p: 'Value proposition 3 of 3 — offline capture and automatic sync.',
  g: 'Trust that work done without signal is safe.',
  en: ['ONB-03 Capture Sessions → "Next".'],
  ex: ['"Continue" → ONB-05 Permissions.', '"Back" → ONB-03.', '"Skip" → ONB-05.'],
  kb: ['Final step swaps the label from "Next" to "Continue".'],
  ux: ['Offline is presented as a feature, not a failure mode — the same framing OFF-02 uses.'],
  mvp: ['Three-step carousel with working Back, Continue and Skip.'],
  oq: ['MVP Question: is there a storage ceiling we should name here?'],
  fe: ['Show the actual free space on the device.']
});
D['ONB-05 Permissions'] = Object.assign({}, ONB_COMMON, {
  p: 'Explains each OS permission before the system dialog appears, and why it helps.',
  g: 'Decide on each permission with enough context to say yes.',
  en: ['ONB-04 Work Offline → "Continue".', '"Skip" from any onboarding step.'],
  ex: ['"Continue" → OS permission dialogs → HOME-01 Home.', '"Back" → ONB-04.'],
  kb: ['Four permissions: Location and Notifications are marked Recommended, Camera and Microphone Optional.', 'The footer states that nothing is shared with the centres being visited.', 'Each row states when the permission is used, not just what it is.'],
  ux: ['Pre-permission priming: the OS dialog is only fired after the coach has read the reason, which protects the grant rate.', 'Location is scoped in copy to "only when you start a visit" — the constraint VIS-03 relies on.'],
  mvp: ['Prime all four permissions.', 'Continue must proceed even if every permission is declined.'],
  pm: ['Coach role only.', 'OS-level grants; all four are revocable in Settings afterwards.'],
  oq: ['MVP Question: if Location is declined, does VIS-03 Confirm Arrival still allow a visit to start?'],
  fe: ['Per-permission re-prompt from PROF-02 Settings.'],
  an: [['ux', 'Recommended vs Optional is a real distinction: the two Recommended permissions gate arrival confirmation and reminders. Camera and Microphone only enrich evidence.'],
       ['q', 'MVP Question: declining Location has no designed consequence anywhere in this deck. Behaviour is undefined and needs a product decision.'],
       ['mvp', 'MVP Requirement: Continue must never be blocked by a declined permission.']]
});

// ─────────────────────────────── 06 Home ───────────────────────────────
D['HOME-01 Home'] = {
  p: 'The coach’s daily landing screen: greeting, the next visit, and the five destinations.',
  u: COACH,
  g: 'See what is next and start it in one tap.',
  en: ['AUTH-01 Splash with a valid session.', 'AUTH-02 Login.', 'Back from any top-level destination.', 'VIS-07 Visit Success → "Back to Home".'],
  ex: ['"Open First Visit" → VIS-02 Visit Details.', 'Today’s Visits → VIS-01 Visit List.', 'Sites → SITE-01 Site List.', 'Outstanding Actions → TASK-01 Task List.', 'Resources → RES-01 Resource Library.', 'Profile → PROF-01 Me.', 'Bell → NOTIF-01 Reminders.'],
  kb: ['Greeting is time-of-day aware and names the coach.', 'The TODAY card promotes the single next visit rather than the whole list.', 'Three of the five nav cards carry counts; two do not.', 'A sync status strip sits at the bottom of the scroll.'],
  ux: ['One primary action per screen: "Open First Visit" is the only filled button.', 'Each nav card is tinted differently so the destinations are told apart by colour as well as label — useful in sunlight.', 'The bell badge (2) and the Actions badge (5) count different things and are not meant to reconcile.'],
  mvp: ['Next-visit promotion.', 'Five destinations with live counts.', 'Sync status always visible.'],
  pm: PERM_SCOPED,
  st: ['Populated (shown).'],
  off: ['Renders entirely from the local store. The sync strip reports the last successful sync, not live connectivity.'],
  dp: ['Visit schedule.', 'Action register.', 'Site caseload.', 'Local outbox.'],
  oq: ['MVP Question: the empty state (no visits today) is not in this deck. What does the TODAY card show?', 'MVP Question: is the greeting localised, and to which languages?'],
  fe: ['Reorderable nav cards.', 'A week view above the TODAY card.'],
  wl: ['Nav card tints come from token pairs and re-brand cleanly. The wordmark "ECD Connect" is hard-coded in the header.'],
  an: [['ux', 'Promoting one visit instead of the list is the central decision on this screen. It assumes a coach works the day in order.'],
       ['q', 'MVP Question: no empty state exists for a day with no scheduled visits. This is the most likely first-week experience for a new coach.'],
       ['asm', 'Assumption: the bell badge counts unread reminders, and the Actions badge counts open actions across all sites. Nothing in the build confirms the first.']]
};
D['NOTIF-01 Reminders'] = {
  p: 'A flat list of time and task reminders raised by the app.',
  u: COACH,
  g: 'See what needs attention and jump to it.',
  en: ['HOME-01 Home → bell.'],
  ex: ['Back arrow → HOME-01 Home.', 'Visit reminder → VIS-02 Visit Details.', 'Overdue-actions reminder → TASK-01 Task List.'],
  kb: ['Two reminder classes: visit timing and overdue actions.', 'Each row carries a relative timestamp ("In 40 minutes", "Yesterday").'],
  ux: ['No read/unread styling in the build — every row renders identically.', 'Icon tint encodes the class: action-tinted for time, warn-tinted for overdue.'],
  mvp: ['Visit reminders 40 minutes ahead (see PROF-02).', 'Overdue-action reminders.'],
  pm: PERM_SCOPED,
  st: ['Populated (shown).'],
  off: ['Generated on the device from local data — reminders fire without signal.'],
  dp: ['Notification permission (ONB-05).', 'Visit schedule.', 'Action register.'],
  oq: ['MVP Question: is there a read state, and does the bell badge decrement when a row is opened?', 'MVP Question: what clears a reminder — opening it, or the underlying event passing?'],
  fe: ['Swipe to dismiss.', 'Grouping by day.'],
  wl: WL_TOKENS,
  an: [['q', 'MVP Question: the bell shows a badge of 2 and this list has 2 rows, but no read state is designed. The badge has no defined way to reach zero.'],
       ['asm', 'Assumption: reminders are generated locally. If they are push messages instead, the offline promise on this screen does not hold.']]
};

// ─────────────────────────────── 07 Visits ───────────────────────────────
D['VIS-01 Visit List'] = {
  p: 'The coach’s visit schedule, filtered by Today, Upcoming, Completed and Drafts.',
  u: COACH,
  g: 'Find a visit and open it.',
  en: ['HOME-01 Home → Today’s Visits.'],
  ex: ['Back arrow → HOME-01 Home.', 'Any row or "Open" → VIS-02 Visit Details.'],
  kb: ['Four tabs; Today is selected.', 'Search filters by site or practitioner.', 'The first row is badged "Next"; the rest read "Scheduled".', 'Each row names the visit type below the divider.'],
  ux: ['Status is a badge, not a colour-only cue.', 'The row is fully tappable and also carries an explicit "Open" affordance for reachability.'],
  mvp: ['Four tabs.', 'Search.', 'Row → detail.'],
  pm: PERM_SCOPED,
  st: ['Today, populated (shown).'],
  off: OFF_READ,
  dp: ['Visit schedule.'],
  oq: ['MVP Question: the Upcoming, Completed and Drafts tabs are not drawn. Do they reuse this row, and what does a Draft row look like?', 'MVP Question: is there an empty state per tab?'],
  fe: ['Filter by site.', 'Calendar view.'],
  wl: WL_TOKENS,
  an: [['q', 'MVP Question: only the Today tab exists in the build. Three of the four tabs are undesigned — recorded here rather than invented.'],
       ['ux', 'Site initials in a tinted circle stand in for a logo. The tint is picked per site, so it reads as identity rather than status.']]
};
D['VIS-02 Visit Details'] = {
  p: 'Everything the coach needs before walking in: site summary, last visit, and the start action.',
  u: COACH,
  g: 'Prepare in thirty seconds, then start the visit.',
  en: ['HOME-01 Home → "Open First Visit".', 'VIS-01 Visit List → any row.', 'NOTIF-01 Reminders → visit reminder.'],
  ex: ['"Start Visit" → VIS-03 Confirm Arrival.', '"Call Sarah" → phone dialler.', '"Can’t make it? Move or cancel" → VIS-08 / VIS-09.', 'Back arrow → VIS-01 Visit List.'],
  kb: ['Three status chips: sequence, time, visit type.', 'Site summary shows children, practitioners and open actions.', '"From the last visit" carries the previous coach note forward.'],
  ux: ['The last-visit note is the continuity device — it is what stops each visit starting from zero.', 'Calling is a secondary outline button; starting the visit is the only filled one.'],
  mvp: ['Site summary.', 'Previous-visit note.', 'Start, call, and move/cancel paths.'],
  pm: PERM_SCOPED,
  st: ['Scheduled visit (shown).'],
  off: OFF_READ,
  dp: ['Site record.', 'Visit history.', 'Action register (open-action count).'],
  oq: ['MVP Question: how far back does "From the last visit" reach if the previous visit has no note?'],
  fe: ['Directions from the current location.', 'Read the last visit’s full report inline.'],
  wl: WL_TOKENS,
  an: [['ux', 'Three summary tiles use the same component as SITE-02, which is why "OPEN ACTIONS" wraps to two lines here but not there — the tile is narrower on this screen.'],
       ['mvp', 'MVP Requirement: the previous-visit note must be available offline, since it is read on the doorstep.']]
};
D['VIS-03 Confirm Arrival'] = {
  p: 'Arrival check: confirms location, records the start time, and reports sync state before the visit opens.',
  u: COACH,
  g: 'Start the visit and know it was recorded.',
  en: ['VIS-02 Visit Details → "Start Visit".'],
  ex: ['"I’ve Arrived — Start Visit" → WORK-01 Overview.', '"Something’s wrong — report an issue" → EX-01 Issue Selection.', 'Back arrow → VIS-02.'],
  kb: ['Three checks: location match with distance, start time, connectivity.', 'Location is stated as a distance from the registered site ("14 m away").'],
  ux: ['The checks are shown as satisfied facts, not as a form to fill in.', 'Copy promises the capture "works with no signal", which is why the third row reports connectivity rather than requiring it.'],
  mvp: ['GPS check against the registered site.', 'Automatic start-time capture.', 'Escape hatch to the exception flow.'],
  pm: ['Coach role only.', 'Location permission (ONB-05) for the first check.'],
  st: ['All checks passing (shown).'],
  off: ['Location and time are captured locally. The third row degrades to a queued state when offline.'],
  dp: ['Location permission.', 'Site GPS coordinates.'],
  oq: ['MVP Question: what is the distance tolerance, and what does the screen look like when the coach is outside it?', 'MVP Question: can a visit start with Location declined or GPS unavailable?'],
  fe: ['Manual arrival override with a reason.'],
  wl: WL_TOKENS,
  an: [['q', 'MVP Question: only the all-green state is designed. The failing-location state is the one that actually needs a decision.'],
       ['ux', 'Recording location automatically rather than asking for a check-in tap removes a step and removes the temptation to check in from the car.'],
       ['asm', 'Assumption: 14 m is illustrative sample data, not a specified tolerance.']]
};
D['VIS-07 Visit Success'] = {
  p: 'Confirmation that the visit is complete, recorded and on its way to the admin portal.',
  u: COACH,
  g: 'Know it is done, then move on.',
  en: ['WORK-05 Visit Summary → "Complete Visit".'],
  ex: ['"Start Next Visit" → VIS-01 Visit List.', '"Back to Home" → HOME-01 Home.', 'Back arrow → HOME-01 Home.'],
  kb: ['Summarises the outcome in one line: site plus number of actions agreed.', 'A success chip states that it reached the admin portal.'],
  ux: ['Two exits, both forward-facing — there is deliberately no way back into the completed visit from here.'],
  mvp: ['Completion confirmation.', 'Sync confirmation.', 'Onward path to the next visit.'],
  pm: PERM_SCOPED,
  st: ['Complete and synced (shown).'],
  off: ['When offline the record is queued; the "Synced to the admin portal" chip is the online variant. The offline variant is not in this deck.'],
  dp: ['Visit record.', 'Local outbox.'],
  oq: ['MVP Question: what does this screen say when the visit is queued rather than synced?'],
  fe: ['Share a summary with the practitioner by SMS.'],
  wl: WL_TOKENS,
  an: [['q', 'MVP Question: the synced chip is shown unconditionally in the build. Offline completion is the common case in the field and has no designed variant.'],
       ['ux', 'No route back into the finished visit. Edits go through the admin portal, which keeps the record defensible.']]
};
D['VIS-08 Cancel Visit'] = {
  p: 'Cancels a scheduled visit with a reason the admin team can act on.',
  u: COACH,
  g: 'Cancel honestly and quickly, without losing captured work.',
  en: ['VIS-02 Visit Details → "Can’t make it? Move or cancel".'],
  ex: ['"Cancel This Visit" → VIS-01 Visit List.', '"Keep the visit as it is" → VIS-02.', 'Back arrow → VIS-02.'],
  kb: ['Five reasons, single-select, plus a free-text box.', 'The lead paragraph states that captured work is kept.'],
  ux: ['The destructive action is an outline button, not a filled one — the safe choice is the visually quiet default.', 'A reason is required because the admin team reassigns on it.'],
  mvp: ['Reason capture.', 'Free-text note.', 'Notify the admin team.'],
  pm: PERM_SCOPED,
  st: ['Nothing selected (shown).'],
  off: OFF_WRITE,
  dp: ['Visit record.', 'Admin portal notification.'],
  oq: ['MVP Question: is a reason mandatory before the button enables? The button renders enabled with nothing selected.'],
  fe: ['Suggest a replacement slot at the point of cancelling.'],
  wl: WL_TOKENS,
  an: [['ux', 'Cancel and Reschedule are separate screens with the same shape. The repetition is intentional — the choice is made before the form, not inside it.'],
       ['q', 'MVP Question: the primary button is styled as available with no reason chosen. Validation behaviour is undefined.']]
};
D['VIS-09 Reschedule Visit'] = {
  p: 'Moves a scheduled visit to a new window and notifies the site.',
  u: COACH,
  g: 'Move the visit without a phone call.',
  en: ['VIS-02 Visit Details → "Can’t make it? Move or cancel".'],
  ex: ['"Move This Visit" → VIS-01 Visit List.', '"Keep the visit as it is" → VIS-02.', 'Back arrow → VIS-02.'],
  kb: ['Four relative windows rather than a date picker.', 'Copy states the principal is notified by SMS once it syncs.'],
  ux: ['Relative windows ("Later this week") are quicker on a phone and match how visits are actually planned.'],
  mvp: ['Relative rescheduling.', 'Free-text note.', 'SMS notification to the site.'],
  pm: PERM_SCOPED,
  st: ['Nothing selected (shown).'],
  off: ['Queued locally; the SMS fires when the change syncs, which the copy is careful to say.'],
  dp: ['Visit schedule.', 'SMS gateway.'],
  oq: ['MVP Question: who resolves the exact date — the coach later, or the admin team on receipt?'],
  fe: ['Exact-date picker as a secondary option.'],
  wl: WL_TOKENS,
  an: [['asm', 'Assumption: relative windows are resolved to concrete dates by the admin portal. The app never shows a resulting date.'],
       ['ux', 'The SMS is described as happening "once this syncs" rather than immediately — honest about the offline queue.']]
};

// ─────────────────────────────── 08 Visit Workspace ───────────────────────────────
D['WORK-01 Overview'] = {
  p: 'Step 1 of 5. Counts the children present and records who the coach is working with today.',
  u: COACH,
  g: 'Get the attendance and the participants right before observing.',
  en: ['VIS-03 Confirm Arrival → "I’ve Arrived".'],
  ex: ['"Start Observation" → OBS-01 Select Classroom.', '"Something’s wrong — report an issue" → EX-01 Issue Selection.', 'Back arrow → VIS-02 Visit Details.'],
  kb: ['Stepper header shows "Step 1 of 5" with a progress bar at 20%.', 'Children present uses a large − / + stepper against the registered total.', 'Practitioner chips are multi-select.', 'An optional note accepts text, a photo or a voice note.'],
  ux: ['A stepper, not a keyboard — the count is adjusted with gloves on, standing up.', '"of 34 registered" gives the number context so a wrong entry is obvious.'],
  mvp: ['Attendance count.', 'Participant selection.', 'Optional note with photo or voice.'],
  pm: ['Coach role only.', 'Camera and Microphone permissions (ONB-05) for the note attachments.'],
  st: ['In progress (shown).'],
  off: OFF_WRITE,
  dp: ['Site register (registered total, practitioner list).', 'Camera and microphone permissions.'],
  oq: ['MVP Question: can the count exceed the registered total, and what happens if it does?'],
  fe: ['Per-classroom attendance rather than a site total.'],
  wl: WL_TOKENS,
  an: [['ux', 'The header is a shared component across all five workspace steps: title, step counter and progress bar. Only the fill width and label change.'],
       ['q', 'MVP Question: steps 2, 3 and 4 of the workspace (WORK-02, WORK-03, WORK-04) do not exist in this deck. Only steps 1 and 5 are designed; the middle three are covered by the Observation, Discussion and Action Plan pages instead.']]
};
D['WORK-05 Visit Summary'] = {
  p: 'Step 5 of 5. Reviews the four captured sections, takes an overall reflection, and completes the visit.',
  u: COACH,
  g: 'Check the record is right, then close the visit.',
  en: ['ACT-02 Action Plan → "Review Summary".'],
  ex: ['"Complete Visit" → VIS-07 Visit Success.', '"Save Draft & Exit" → HOME-01 Home.', '"Report an issue instead" → EX-01 Issue Selection.', 'Any "Edit" → the matching step.'],
  kb: ['Four review rows, each with a completion icon, a summary line and an Edit link.', 'Overall reflection is free text.', 'Next-visit cadence is a three-way chip select.', 'Progress bar is full.'],
  ux: ['Edit links return to the step in place rather than restarting the flow.', 'Saving a draft is offered on the last screen, because that is where a coach runs out of time.'],
  mvp: ['Four-section review.', 'Overall reflection.', 'Next-visit cadence.', 'Complete and Save-draft paths.'],
  pm: PERM_SCOPED,
  st: ['All sections complete (shown).'],
  off: ['Completing offline queues the whole visit as one unit — see OFF-02.'],
  dp: ['All four workspace steps.', 'Local outbox.'],
  oq: ['MVP Question: can a visit be completed with a section incomplete, or is Complete gated?', 'MVP Question: how long does a draft live before it expires?'],
  fe: ['Print or share the summary with the practitioner on the spot.'],
  wl: WL_TOKENS,
  an: [['mvp', 'MVP Requirement: Save Draft & Exit must survive an app kill. A half-captured visit is the most expensive thing to lose in this product.'],
       ['q', 'MVP Question: the icons on the review rows are all in a completed state. There is no designed appearance for a skipped section.']]
};

// ─────────────────────────────── 09 Observation ───────────────────────────────
const OBS_COMMON = { u: COACH, pm: PERM_SCOPED, off: OFF_WRITE, wl: WL_TOKENS, st: ['In progress (shown).'] };
D['OBS-01 Select Classroom'] = Object.assign({}, OBS_COMMON, {
  p: 'Step 2 of 5, part 1. Picks the classroom group the coach will observe.',
  g: 'Choose the group and start observing.',
  en: ['WORK-01 Overview → "Start Observation".'],
  ex: ['"Start Observing Sunflowers" → OBS-02 Observation Checklist.', 'Back arrow → WORK-01 Overview.'],
  kb: ['Single-select cards, each with age band and headcount.', 'The primary button names the selected classroom.'],
  ux: ['The button label changes with the selection, so the tap is confirmed before it happens.', 'Copy allows for observing another group afterwards, which the flow does not yet support.'],
  mvp: ['Classroom selection from the site register.'],
  dp: ['Site register (classroom list).'],
  oq: ['MVP Question: the copy promises "You can observe another one afterwards" but no return path is designed. Is multi-classroom observation in the MVP?'],
  fe: ['Observe several classrooms in one visit.'],
  an: [['q', 'MVP Question: the supporting copy makes a promise the flow does not keep. Documented as found — the copy has not been changed.']]
});
D['OBS-02 Observation Checklist'] = Object.assign({}, OBS_COMMON, {
  p: 'Step 2 of 5, part 2. Rates the learning environment on a three-point scale.',
  g: 'Record a judgement quickly and consistently.',
  en: ['OBS-01 Select Classroom → primary button.'],
  ex: ['"Continue" → OBS-03 Strengths.', 'Back arrow → OBS-01.'],
  kb: ['Three mutually exclusive options.', 'A previously agreed action is surfaced at the foot of the screen as context.'],
  ux: ['Three points, not five — a scale a coach can apply the same way twice.', 'The carried-forward action ties this observation to the last visit’s agreement.'],
  mvp: ['One rated area per screen.', 'Carried-forward action context.'],
  dp: ['Observation framework.', 'Action register.'],
  oq: ['MVP Question: the header names "Learning environment" and the progress bar sits at 40%. How many rated areas are there in total, and are the others identical to this one?'],
  fe: ['Per-area guidance notes for new coaches.'],
  an: [['asm', 'Assumption: this screen is one of several rated areas that share a layout. WORK-05 reports "4 of 4 areas answered", so four are expected; only one is drawn.']]
});
D['OBS-03 Strengths'] = Object.assign({}, OBS_COMMON, {
  p: 'Step 2 of 5, part 3. Tags what is working well in the classroom.',
  g: 'Capture strengths without typing.',
  en: ['OBS-02 Observation Checklist → "Continue".'],
  ex: ['"Continue" → OBS-04 Improvement Areas.', 'Back arrow → OBS-02.'],
  kb: ['Multi-select chips; two are selected in this state.', 'Explicitly skippable.'],
  ux: ['Chips instead of a text box — tagged strengths aggregate across sites; prose does not.', 'Selected chips invert to the select token rather than only gaining a tick.'],
  mvp: ['Multi-select strengths.', 'Skippable.'],
  dp: ['Observation framework (chip vocabulary).'],
  oq: ['MVP Question: can a coach add a strength that is not in the list?'],
  fe: ['Free-text "other" chip.', 'Site-specific chip vocabulary.'],
  an: [['ux', 'Strengths come before improvements in the flow. Coaching conversations that open on what is working go better, and the screen order enforces it.']]
});
D['OBS-04 Improvement Areas'] = Object.assign({}, OBS_COMMON, {
  p: 'Step 2 of 5, part 4. Tags what could get better.',
  g: 'Capture improvement areas that feed the discussion.',
  en: ['OBS-03 Strengths → "Continue".'],
  ex: ['"Finish Observation" → DISC-01 Discussion & Agreements.', 'Back arrow → OBS-03.'],
  kb: ['Same chip mechanic as OBS-03, different vocabulary.', 'The button label closes the section rather than reading "Continue".'],
  ux: ['Mirrors OBS-03 exactly so the pair reads as one exercise with two halves.'],
  mvp: ['Multi-select improvement areas.', 'Skippable.'],
  dp: ['Observation framework (chip vocabulary).'],
  oq: ['MVP Question: do selected improvement areas pre-populate the recommendations on DISC-01?'],
  fe: ['Suggest a resource for each selected area.'],
  an: [['asm', 'Assumption: improvement chips feed DISC-01’s recommendation list. The two vocabularies overlap but the build does not wire them.']]
});

// ─────────────────────────────── 10 Coaching Discussion ───────────────────────────────
D['DISC-01 Discussion & Agreements'] = {
  p: 'Step 3 of 5. Captures the coaching conversation and confirms what the practitioner agreed to.',
  u: COACH,
  g: 'Record the conversation and separate what was recommended from what was agreed.',
  en: ['OBS-04 Improvement Areas → "Finish Observation".'],
  ex: ['"Continue to Action Plan" → ACT-02 Action Plan.', 'Back arrow → OBS-04.'],
  kb: ['Free-text coaching notes.', 'Recommendations agreed: a checklist of proposals.', 'Agreed together: a second, shorter list confirming what the practitioner accepted.', 'Copy instructs the coach to talk first, then capture.'],
  ux: ['Recommended and agreed are deliberately two different lists. Conflating them is how action plans end up unowned.', 'The practitioner is named in the copy on both blocks so the confirmation is about a person, not a form.'],
  mvp: ['Free-text notes.', 'Recommendation checklist.', 'Separate agreement confirmation.'],
  pm: PERM_SCOPED,
  st: ['Partly captured (shown).'],
  off: OFF_WRITE,
  dp: ['Observation output.', 'Site practitioner list.'],
  oq: ['MVP Question: where does the recommendation list come from — the observation chips, a fixed library, or the coach?', 'MVP Question: can an item be agreed without first being recommended?'],
  fe: ['Voice-note capture for the discussion, as offered on WORK-01.'],
  wl: WL_TOKENS,
  an: [['ux', 'The two-list structure is the most opinionated decision in the workspace. It is what makes the action plan on the next screen defensible.'],
       ['q', 'MVP Question: the two lists share the same first item in the build. Whether "agreed" is a filtered view of "recommended" or an independent list is undefined.']]
};

// ─────────────────────────────── 11 Action Plans ───────────────────────────────
D['ACT-02 Action Plan'] = {
  p: 'Step 4 of 5. Turns the agreements into owned, dated actions.',
  u: COACH,
  g: 'Leave with two or three actions someone owns.',
  en: ['DISC-01 Discussion & Agreements → "Continue to Action Plan".'],
  ex: ['"Review Summary" → WORK-05 Visit Summary.', 'Back arrow → DISC-01.'],
  kb: ['Each action carries owner, timeframe and priority chips.', 'Actions are removable with the ✕ control.', '"+ Add an Action" appends a row.', 'Guidance caps the ambition: "Two or three achievable actions beat a long list."'],
  ux: ['Owner, when and priority are chips rather than dropdowns — three taps instead of three pickers.', 'Priority uses the danger and warn tints, so High and Medium are distinguishable at a glance.'],
  mvp: ['Add, edit and remove actions.', 'Owner, timeframe and priority per action.'],
  pm: PERM_SCOPED,
  st: ['Two actions captured (shown).'],
  off: OFF_WRITE,
  dp: ['DISC-01 agreements.', 'Site practitioner list (owners).'],
  oq: ['MVP Question: ACT-01 does not exist in this deck. Was there meant to be an action-plan entry or template screen before this one?', 'MVP Question: is there a maximum number of actions, given the copy discourages long lists?'],
  fe: ['Action templates drawn from the resource library.'],
  wl: WL_TOKENS,
  an: [['q', 'MVP Question: the screen is numbered ACT-02 and no ACT-01 exists in the build. Reported as a gap rather than renumbered.'],
       ['ux', 'Actions are editable here and read-only afterwards on TASK-02, where only progress can change. Ownership of the wording stays with the visit.']]
};
D['TASK-01 Task List'] = {
  p: 'All outstanding actions across the coach’s whole caseload, grouped by urgency.',
  u: COACH,
  g: 'See what is overdue and chase it.',
  en: ['HOME-01 Home → Outstanding Actions.', 'NOTIF-01 Reminders → overdue reminder.'],
  ex: ['Back arrow → HOME-01 Home.', 'Any row → TASK-02 Task Detail.'],
  kb: ['Three groups: Overdue, Coming up, Recently completed.', 'Each row carries a status chip and a due-date chip.', 'A coloured dot encodes urgency independently of the chips.', 'Site and owner are named on every row.'],
  ux: ['Grouping by urgency rather than by site, because chasing is time-driven.', 'Completed items stay visible so progress is felt.'],
  mvp: ['Cross-site action list.', 'Urgency grouping.', 'Status and due-date chips.'],
  pm: PERM_SCOPED,
  st: ['Populated across all three groups (shown).'],
  off: OFF_READ,
  dp: ['Action register across the caseload.'],
  oq: ['MVP Question: how long does an action stay in "Recently completed"?', 'MVP Question: is there an empty state when nothing is outstanding? HOME-01 can show "Nothing outstanding", so the state exists in data.'],
  fe: ['Filter by site or owner.', 'Bulk status update.'],
  wl: WL_TOKENS,
  an: [['ux', 'The dot and the chip carry the same urgency twice. Redundant encoding is deliberate for a screen read in sunlight.'],
       ['asm', 'Assumption: the badge of 5 on HOME-01 counts Overdue plus Coming up (2 + 3) and excludes completed. The build does not state the rule.']]
};
D['TASK-02 Task Detail'] = {
  p: 'One action, with its origin, and the only place its progress is changed.',
  u: COACH,
  g: 'Update where an action stands.',
  en: ['TASK-01 Task List → any row.'],
  ex: ['"Save Update" → TASK-01 Task List.', 'Back arrow → TASK-01.'],
  kb: ['Header repeats site, owner and due date as chips.', 'Provenance line names the visit the action came from.', 'Four progress states, single-select, plus a free-text note.'],
  ux: ['The action text is read-only here — wording is owned by the visit that agreed it.', 'Provenance is shown so the coach can reopen the conversation with context.'],
  mvp: ['Progress update.', 'Free-text note.', 'Link back to the originating visit.'],
  pm: PERM_SCOPED,
  st: ['Not started (shown).'],
  off: OFF_WRITE,
  dp: ['Action register.', 'Visit history.'],
  oq: ['MVP Question: is the "Visit 22 July" provenance line tappable through to that visit’s record?', 'MVP Question: does marking an action Blocked notify the admin team?'],
  fe: ['Attach evidence to a completed action.'],
  wl: WL_TOKENS,
  an: [['ux', 'Making the action text read-only is what lets TASK-01 be trusted as a register. Editing lives with the visit, updating lives here.'],
       ['q', 'MVP Question: Blocked has no defined escalation. It is a status with no consequence in the current build.']]
};

// ─────────────────────────────── 12 Sites ───────────────────────────────
D['SITE-01 Site List'] = {
  p: 'The coach’s caseload of ECD centres.',
  u: COACH,
  g: 'Find a site and open its record.',
  en: ['HOME-01 Home → Sites.'],
  ex: ['Back arrow → HOME-01 Home.', 'Any row → SITE-02 Site Details.'],
  kb: ['Search by site or principal.', 'Each row shows principal, headcount and next visit.', 'Sites with open actions carry a warn-tinted chip.', 'Sites with no scheduled visit say so explicitly.'],
  ux: ['"No visit scheduled" is stated rather than left blank, so a gap in the schedule is visible.', 'Open-action chips make the list double as a workload view.'],
  mvp: ['Caseload list.', 'Search.', 'Next-visit and open-action summary per site.'],
  pm: PERM_SCOPED,
  st: ['Populated (shown).'],
  off: OFF_READ,
  dp: ['Site caseload.', 'Visit schedule.', 'Action register.'],
  oq: ['MVP Question: can a coach request a site be added or removed from their caseload, or is that admin-only?'],
  fe: ['Sort by next visit or by open actions.', 'Map view.'],
  wl: WL_TOKENS,
  an: [['ux', 'Six sites is the designed caseload size; the list has no pagination. Worth confirming before a partner with larger caseloads is onboarded.'],
       ['asm', 'Assumption: the caseload is fixed by the admin portal and read-only to the coach.']]
};
D['SITE-02 Site Details'] = {
  p: 'The site record: summary, practitioners, open actions, history and contact.',
  u: COACH,
  g: 'Understand a site before or between visits.',
  en: ['SITE-01 Site List → any row.'],
  ex: ['"Start Visit Here" → VIS-03 Confirm Arrival.', '"Call Sarah" → phone dialler.', 'Practitioners → SITE-03.', 'Previous visits → SITE-04.', 'Back arrow → SITE-01.'],
  kb: ['Three summary tiles: children, practitioners, open actions.', 'Four expandable sections, each summarised in one line.', 'Starting an unscheduled visit is possible from here.'],
  ux: ['Sections collapse to a summary line so the whole record fits one screen before any expansion.', '"Nothing outstanding" is shown rather than hiding the empty section.'],
  mvp: ['Site summary.', 'Expandable sections.', 'Ad-hoc visit start.', 'Call the principal.'],
  pm: PERM_SCOPED,
  st: ['Collapsed, no open actions (shown).'],
  off: OFF_READ,
  dp: ['Site register.', 'Visit history.', 'Action register.'],
  oq: ['MVP Question: does starting a visit from here create an unscheduled visit record the admin team can see?'],
  fe: ['Site notes that persist between coaches.'],
  wl: WL_TOKENS,
  an: [['ux', 'The same four-section pattern is reused for the two expanded states (SITE-03, SITE-04). Only one section is open at a time in the build.'],
       ['mvp', 'MVP Requirement: "Start Visit Here" must reach the same arrival check as a scheduled visit, so location capture is never bypassed.']]
};
D['SITE-03 Practitioners Expanded'] = {
  p: 'SITE-02 with the practitioner section open.',
  u: COACH,
  g: 'See who works at this site and their role.',
  en: ['SITE-02 Site Details → Practitioners.'],
  ex: ['Practitioners → collapse to SITE-02.', '"Start Visit Here" → VIS-03 Confirm Arrival.', 'Back arrow → SITE-01 Site List.'],
  kb: ['Three practitioners, each with a role chip.', 'The other three sections stay collapsed.'],
  ux: ['Accordion rather than a separate page — the coach keeps the site summary in view while reading the list.'],
  mvp: ['Practitioner list with roles.'],
  pm: PERM_SCOPED,
  st: ['Practitioners expanded (shown).'],
  off: OFF_READ,
  dp: ['Site register.'],
  oq: ['MVP Question: is a practitioner row tappable through to a person record?'],
  fe: ['Per-practitioner coaching history.'],
  wl: WL_TOKENS,
  an: [['asm', 'Assumption: only one section is open at a time. Two expanded states are drawn and neither shows a second section open.']]
};
D['SITE-04 Previous Visits Expanded'] = {
  p: 'A different site (Thembalethu Crèche) with the visit-history section open.',
  u: COACH,
  g: 'Read the coaching history of a site.',
  en: ['SITE-02 Site Details → Previous visits.'],
  ex: ['Previous visits → collapse.', '"Start Visit Here" → VIS-03 Confirm Arrival.', 'Back arrow → SITE-01 Site List.'],
  kb: ['Three past visits with type, outcome and date.', 'This site has two open actions, so the Open actions section reads "2 outstanding".'],
  ux: ['Each history row carries an outcome ("went well", "support plan agreed") so the list is scannable as a narrative.'],
  mvp: ['Visit history with outcomes.'],
  pm: PERM_SCOPED,
  st: ['Previous visits expanded, site with open actions (shown).'],
  off: OFF_READ,
  dp: ['Visit history.'],
  oq: ['MVP Question: how far back does the history go, and is it paginated?', 'MVP Question: is a history row tappable through to the full visit record?'],
  fe: ['Open a past visit’s full report.'],
  wl: WL_TOKENS,
  an: [['ux', 'This screen deliberately uses a second site so the open-actions and empty-actions variants of SITE-02 are both documented.']]
};

// ─────────────────────────────── 13 Unexpected Situations ───────────────────────────────
D['EX-01 Issue Selection'] = {
  p: 'A bottom sheet over the visit workspace that classifies why a visit cannot proceed as planned.',
  u: COACH,
  g: 'Report what went wrong and stop the visit cleanly.',
  en: ['VIS-03 Confirm Arrival → "Something’s wrong".', 'WORK-01 Overview → "Something’s wrong".', 'WORK-05 Visit Summary → "Report an issue instead".'],
  ex: ['Any of the eight issues → issue detail (not in this build).', 'Scrim or handle → back to the underlying screen.'],
  kb: ['Eight classified issues from site closed to emergency.', 'Rendered as a sheet over the live workspace, so the visit is not abandoned by opening it.', 'Copy states nothing captured so far is lost.'],
  ux: ['A sheet rather than a screen: the exception is framed as a detour, not an exit.', 'Emergency and Safety concern use the danger tint; everything else stays neutral.'],
  mvp: ['Eight issue classes.', 'Reachable from arrival and from inside the workspace.', 'Preserve captured work.'],
  pm: PERM_SCOPED,
  st: ['Sheet open (shown).'],
  off: OFF_WRITE,
  dp: ['Visit record.', 'Admin portal escalation.'],
  oq: ['MVP Question: what happens after an issue is chosen? No detail or confirmation screen exists in this deck.', 'MVP Question: does Emergency behave differently — an immediate call, or an escalation to the admin team?'],
  fe: ['One-tap emergency call from the sheet.'],
  wl: WL_TOKENS,
  an: [['q', 'MVP Question: the flow dead-ends at selection. Eight entry points, no designed destination — the largest single gap in the deck.'],
       ['ux', 'Presenting this over the workspace rather than replacing it is what makes "nothing is lost" credible.'],
       ['mvp', 'MVP Requirement: Emergency must work with no signal, since it is the case where signal is least likely.']]
};

// ─────────────────────────────── 14 Offline & Sync ───────────────────────────────
D['OFF-02 Offline Queue'] = {
  p: 'What is stored on the phone and what state each item is in.',
  u: COACH,
  g: 'Confirm nothing is stuck.',
  en: ['PROF-01 Me → Offline & sync.', 'HOME-01 Home → sync status strip.'],
  ex: ['Back arrow → the entry screen.', '"Everything Is Up To Date" → OFF-03 Sync Progress when work is pending.'],
  kb: ['A banner states overall sync state and when it last succeeded.', 'Each queued item shows what it is, which site, and a status chip.', 'A held item explains why it is held rather than showing a bare error.'],
  ux: ['The banner leads with reassurance; detail is below it for the coach who wants it.', 'Held items are amber, not red — the work is safe, it just needs a decision.'],
  mvp: ['Per-item queue visibility.', 'Manual sync trigger.', 'Explain held items.'],
  pm: PERM_COACH,
  st: ['All synced, with one held item (shown).'],
  off: ['This is the offline screen. It is fully functional with no signal.'],
  dp: ['Local outbox.'],
  oq: ['MVP Question: can a coach retry or discard a held item, or only the admin team?'],
  fe: ['Storage used and remaining.'],
  wl: WL_TOKENS,
  an: [['ux', 'Naming each queued item ("Completed visit · Sunrise Educare") rather than counting them is what makes the queue trustworthy.'],
       ['q', 'MVP Question: the banner says everything is synced while a Held item is listed below it. The two statements need reconciling.']]
};
D['OFF-03 Sync Progress'] = {
  p: 'Live upload progress, item by item.',
  u: COACH,
  g: 'Know how far along the upload is, and that leaving is safe.',
  en: ['OFF-02 Offline Queue → sync trigger.', 'Automatic when signal returns.'],
  ex: ['"Leave It Running" → the previous screen.', 'Automatic → OFF-04 Sync Success on completion.', 'Back arrow → OFF-02.'],
  kb: ['Progress ring, progress bar and an "n of 4 uploaded" count.', 'Per-item chips: Uploading, Waiting.', 'Copy states the upload continues in the background.'],
  ux: ['Three progress indicators is redundant by design — this is the screen coaches watch on a bad connection.', 'The primary button gives permission to leave, rather than trapping the coach here.'],
  mvp: ['Background upload.', 'Per-item progress.', 'Leaving must not cancel.'],
  pm: PERM_COACH,
  st: ['2 of 4 uploaded (shown).'],
  off: ['Requires signal by definition; degrades back to OFF-02 when it is lost.'],
  dp: ['Local outbox.', 'Sync service.'],
  oq: ['MVP Question: what does this screen show when the connection drops mid-upload?', 'MVP Question: is there a retry limit before an item is marked held?'],
  fe: ['Wi-Fi-only upload for large attachments.'],
  wl: WL_TOKENS,
  an: [['q', 'MVP Question: no failure state is designed for this screen. Interrupted upload is the most likely outcome in the field.'],
       ['ux', '"You can leave this screen" is the most important sentence on it. Coaches otherwise stand still waiting for a bar to fill.']]
};
D['OFF-04 Sync Success'] = {
  p: 'Confirmation that the queue is empty and everything reached the admin team.',
  u: COACH,
  g: 'Close the loop with certainty.',
  en: ['OFF-03 Sync Progress on completion.'],
  ex: ['"Done" → the screen that started the sync.', 'Back arrow → OFF-02 Offline Queue.'],
  kb: ['Same layout as OFF-03 with the ring, bar and every chip resolved.', 'Count reads 4 of 4.'],
  ux: ['Reusing OFF-03’s layout means the success state is read as the same screen finishing, not a new one appearing.'],
  mvp: ['Success confirmation.', 'Single dismissal.'],
  pm: PERM_COACH,
  st: ['Complete (shown).'],
  off: ['Terminal online state.'],
  dp: ['Local outbox.', 'Sync service.'],
  oq: ['MVP Question: does this screen auto-dismiss, and after how long?'],
  fe: ['Summary of what was uploaded.'],
  wl: WL_TOKENS,
  an: [['ux', 'OFF-03 and OFF-04 are one component in two states. Worth building it that way rather than as two screens.']]
};
D['OFF-06 Conflict Resolution'] = {
  p: 'Two devices recorded the same thing differently. The coach chooses which version stands.',
  u: COACH,
  g: 'Resolve the disagreement without losing either record.',
  en: ['OFF-02 Offline Queue → a held item.'],
  ex: ['"Keep This Version" → OFF-02 Offline Queue.', '"Let the admin team decide" → OFF-02.', 'Back arrow → OFF-02.'],
  kb: ['Both versions are shown in full with author, timestamp and source device.', 'Radio selection between them.', 'Copy states nothing is deleted either way.', 'An escalation path defers the decision entirely.'],
  ux: ['Both versions carry provenance, so the choice is made on evidence rather than on which is newer.', 'The escalation link means a coach who is unsure is never forced to guess.'],
  mvp: ['Side-by-side conflict presentation.', 'Coach resolution.', 'Escalation to the admin team.'],
  pm: PERM_SCOPED,
  st: ['Unresolved (shown).'],
  off: ['The conflict is detected during sync but resolvable offline; the resolution queues like any other write.'],
  dp: ['Sync service.', 'Local outbox.'],
  oq: ['MVP Question: OFF-01 and OFF-05 do not exist in this deck. What were they — an offline banner and a sync-failure screen?', 'MVP Question: how is the coach told a conflict has appeared? Nothing on Home or in Reminders surfaces it.'],
  fe: ['Field-level merge instead of whole-record choice.'],
  wl: WL_TOKENS,
  an: [['q', 'MVP Question: OFF-01 and OFF-05 are missing from the build. Reported as gaps; nothing has been invented to fill them.'],
       ['ux', 'Naming the other person ("Zanele Mthembu") rather than saying "another device" makes the conflict a human disagreement, which is what it usually is.'],
       ['mvp', 'MVP Requirement: neither version may be discarded on resolution. The losing record must remain recoverable by the admin team.']]
};

// ─────────────────────────────── 15 Resources ───────────────────────────────
D['RES-01 Resource Library'] = {
  p: 'Coaching guides and tools, with offline availability shown per item.',
  u: COACH,
  g: 'Find a guide and know whether it will open in the field.',
  en: ['HOME-01 Home → Resources.', 'PROF-01 Me → Resources.'],
  ex: ['Back arrow → the entry screen.', 'Any row → RES-02 Resource Detail.', '"See What Works Offline" → RES-03 Offline Resources.'],
  kb: ['Search.', 'Each row states the format and languages.', 'A chip marks each resource "On phone" or "Needs signal".'],
  ux: ['Offline availability is shown before the tap, not after — that is the whole point of the chip.', 'Language availability is named on the row because it decides usefulness at a specific site.'],
  mvp: ['Resource list.', 'Search.', 'Per-item offline status.'],
  pm: PERM_COACH,
  st: ['Populated, mixed availability (shown).'],
  off: ['The list itself is local. Items marked "Needs signal" fail to open without it.'],
  dp: ['Resource catalogue.', 'Local download store.'],
  oq: ['MVP Question: can a coach pin a resource for offline use on demand, or is the set chosen centrally?', 'MVP Question: are resources filtered by the languages a coach’s sites use?'],
  fe: ['Category filters.', 'Recently used.'],
  wl: ['The catalogue is content, not design — fully replaceable per partner. Layout carries no SmartStart-specific assumptions.'],
  an: [['ux', 'Two-state chip (On phone / Needs signal) rather than a download icon. It answers the question the coach actually has.'],
       ['q', 'MVP Question: the download trigger is undefined. PROF-02 has a "Download resources on Wi-Fi" toggle, which implies it is automatic, but RES-03 says two items are still waiting.']]
};
D['RES-02 Resource Detail'] = {
  p: 'One resource: what it is, what is inside it, and how to open or share it.',
  u: COACH,
  g: 'Decide whether this guide is the right one before opening it.',
  en: ['RES-01 Resource Library → any row.'],
  ex: ['"Open Resource" → the document viewer.', '"Share with the practitioner" → the OS share sheet.', 'Back arrow → RES-01.'],
  kb: ['Type and availability chips in the header.', '"What’s inside" lists the contents as ticked points.', 'Sharing is offered as a secondary action.'],
  ux: ['Contents are listed before opening so a coach on a slow connection does not open a four-page PDF to find out.'],
  mvp: ['Resource metadata.', 'Contents preview.', 'Open and share.'],
  pm: PERM_COACH,
  st: ['Available on phone (shown).'],
  off: ['This screen renders offline. Opening depends on the availability chip.'],
  dp: ['Resource catalogue.', 'OS share sheet.'],
  oq: ['MVP Question: what does sharing send — a file, or a link that needs signal at the other end?'],
  fe: ['Track which resources were shared with which site.'],
  wl: ['Content is partner-supplied. Nothing on this screen is SmartStart-specific.'],
  an: [['asm', 'Assumption: "Open Resource" launches an in-app viewer. No viewer screen exists in this deck.'],
       ['q', 'MVP Question: sharing to a practitioner’s phone has data-cost implications that are not addressed.']]
};
D['RES-03 Offline Resources'] = {
  p: 'What is downloaded to the phone, what it costs in storage, and what is still waiting.',
  u: COACH,
  g: 'Know what will work in the field before leaving signal.',
  en: ['RES-01 Resource Library → "See What Works Offline".'],
  ex: ['Back arrow → RES-01 Resource Library.'],
  kb: ['Banner summarises count and total storage used.', 'Each downloaded item shows page count and file size.', 'A footer explains that the remaining two download automatically on Wi-Fi.'],
  ux: ['Storage is named in MB per item, because coaches manage phone storage manually.', 'The waiting set is explained rather than actionable — the app handles it.'],
  mvp: ['Offline inventory.', 'Storage reporting.', 'Automatic Wi-Fi download.'],
  pm: PERM_COACH,
  st: ['3 ready, 2 waiting (shown).'],
  off: ['Fully offline.'],
  dp: ['Local download store.', 'PROF-02 Wi-Fi download setting.'],
  oq: ['MVP Question: can a coach force a download on mobile data when they know they are heading somewhere without signal?', 'MVP Question: is there a storage cap, and what is evicted first when it is reached?'],
  fe: ['Manual download and removal per resource.'],
  wl: ['Content is partner-supplied.'],
  an: [['ux', 'Making storage cost visible respects that these are personal phones on limited plans.'],
       ['q', 'MVP Question: there is no manual download control anywhere in the deck, but the reason to want one — a planned trip out of coverage — is the app’s core scenario.']]
};

// ─────────────────────────────── 16 Profile & Settings ───────────────────────────────
D['PROF-01 Me'] = {
  p: 'The account hub: identity plus seven destinations.',
  u: COACH,
  g: 'Reach settings, sync, help and sign-out.',
  en: ['HOME-01 Home → Profile.', 'HOME-01 Home → avatar.'],
  ex: ['Offline & sync → OFF-02.', 'Resources → RES-01.', 'My profile → PROF-01b.', 'Settings → PROF-02.', 'Help & support → PROF-03.', 'About → PROF-04.', 'Log out → AUTH-02 Login.', 'Back arrow → HOME-01 Home.'],
  kb: ['Identity card shows name, role and area.', 'Seven rows in a single list.', 'Build version is printed at the foot.'],
  ux: ['Offline & sync sits at the top of the list, above profile — it is the row coaches use most.', 'Log out is styled like every other row rather than as a destructive action.'],
  mvp: ['Seven destinations.', 'Identity display.', 'Version string.'],
  pm: PERM_COACH,
  st: ['Resting (shown).'],
  off: ['Fully offline. Log out while work is queued has no designed warning.'],
  dp: ['Coach record.', 'Local outbox.'],
  oq: ['MVP Question: is the coach warned before logging out with unsynced work on the phone?'],
  fe: ['Language switcher.'],
  wl: WL_TOKENS,
  an: [['q', 'MVP Question: logging out with a queue is the clearest data-loss path in the product and carries no confirmation in this build.'],
       ['ux', 'Resources appears both here and on Home. The duplication is deliberate — two mental models, one destination.']]
};
D['PROF-01b Profile'] = {
  p: 'The coach’s own record, read-only.',
  u: COACH,
  g: 'Check what the admin team holds, and know how to change it.',
  en: ['PROF-01 Me → My profile.'],
  ex: ['Back arrow → PROF-01 Me.'],
  kb: ['Name, role, verified cell number, area and caseload size.', 'A closing card states that changes are made by the admin team.'],
  ux: ['Read-only is stated once, at the end, rather than repeated as a disabled state on every field.'],
  mvp: ['Display the coach record.', 'Explain how to change it.'],
  pm: PERM_COACH,
  st: ['Read-only (shown).'],
  off: OFF_READ,
  dp: ['Coach record.'],
  oq: ['MVP Question: is there a request-a-change path, or must the coach phone the admin team?'],
  fe: ['In-app change request.'],
  wl: WL_COPY,
  an: [['ux', 'Nothing renders as a disabled input. Read-only content is presented as content, which reads better than a form nobody can use.'],
       ['asm', 'Assumption: "Verified cell number" means verified at registration by the admin team, not by an in-app check.']]
};
D['PROF-02 Settings'] = {
  p: 'Three device-level preferences.',
  u: COACH,
  g: 'Adjust reminders, downloads and text size.',
  en: ['PROF-01 Me → Settings.'],
  ex: ['Back arrow → PROF-01 Me.'],
  kb: ['Visit reminders on — 40 minutes before, matching NOTIF-01.', 'Download resources on Wi-Fi, on.', 'Larger text, off.', 'Each toggle carries a one-line explanation.'],
  ux: ['Every toggle explains its consequence rather than naming a feature.', '"Larger text" exists for outdoor readability, which is the same reason the app uses 58px inputs.'],
  mvp: ['Three toggles, persisted on the device.'],
  pm: ['Coach role only.', 'Reminders depend on the Notifications permission from ONB-05.'],
  st: ['Two on, one off (shown).'],
  off: ['Fully offline; preferences are device-local.'],
  dp: ['Notification permission.', 'Local download store.'],
  oq: ['MVP Question: is the 40-minute reminder lead time configurable, or fixed?', 'MVP Question: does "Larger text" follow the OS text-size setting instead of being an in-app switch?'],
  fe: ['Language selection.', 'Data-saver mode.'],
  wl: WL_TOKENS,
  an: [['q', 'MVP Question: an in-app text-size switch and the OS accessibility setting can disagree. Which wins is undefined.'],
       ['ux', 'Reminders and Wi-Fi downloads default on; larger text defaults off. The two defaults that cost nothing are on, the one that changes layout is not.']]
};
D['PROF-03 Help & Support'] = {
  p: 'Three ways to get help, ordered by how much signal they need.',
  u: COACH,
  g: 'Get unstuck.',
  en: ['PROF-01 Me → Help & support.'],
  ex: ['"Report a Problem" → problem report form.', 'Call row → phone dialler.', '"How visits work" → walkthrough.', 'Back arrow → PROF-01 Me.'],
  kb: ['Problem reporting explicitly works offline.', 'Support line with its operating hours.', 'A walkthrough of the five visit steps.'],
  ux: ['Offline capability is stated on the first row, because a coach who cannot sync is exactly the coach who needs to report a problem.', 'Support hours are printed so a call outside them is not wasted.'],
  mvp: ['Offline problem reporting.', 'Support phone number.', 'Visit walkthrough.'],
  pm: PERM_COACH,
  st: ['Resting (shown).'],
  off: ['The screen and problem reporting are offline-capable; the report queues like any other write.'],
  dp: ['Local outbox.', 'Support desk.'],
  oq: ['MVP Question: neither the problem-report form nor the walkthrough exists in this deck. Are they MVP scope?', 'MVP Question: is the support number per-partner or global?'],
  fe: ['Attach a screenshot to a problem report.'],
  wl: WL_COPY,
  an: [['q', 'MVP Question: three destinations, none of them designed. Flagged rather than filled in.'],
       ['mvp', 'MVP Requirement: problem reporting must queue offline. It is the only escalation route a coach has with no signal.']]
};
D['PROF-04 About'] = {
  p: 'Version, provider, terms and a statement of what is stored on the phone.',
  u: COACH,
  g: 'Check the build and understand what is held locally.',
  en: ['PROF-01 Me → About.'],
  ex: ['Terms row → the terms document.', 'Back arrow → PROF-01 Me.'],
  kb: ['Version 2.0, October MVP build.', 'Provider named as SmartStart.', 'Terms row shows the acceptance date and an Accepted chip.', 'A plain-language statement of local data.'],
  ux: ['The local-data statement is written for the coach, not for a lawyer — it names visits, actions and guides.'],
  mvp: ['Version string.', 'Terms with acceptance date.', 'Local-data disclosure.'],
  pm: PERM_COACH,
  st: ['Terms accepted (shown).'],
  off: OFF_READ,
  dp: ['Terms document.', 'Local store.'],
  oq: ['MVP Question: what happens when terms are re-issued — is there a re-acceptance flow?'],
  fe: ['Open-source licences.', 'Diagnostics export for support.'],
  wl: ['Provider name, terms and the version string are all hard-coded to SmartStart. This is the screen that most needs tokenising for a white-label build.'],
  an: [['ux', 'Naming the provider explicitly is right for a single-tenant MVP and is the first thing to change for a second partner.'],
       ['q', 'MVP Question: no re-acceptance flow exists for updated terms.']]
};

// ─────────────────────────────── emit ───────────────────────────────
const pages = {};
for (const key of Object.keys(D)) {
  const code = key.split(' ')[0];
  const pg = PAGE[code.replace(/-\d+[a-z]?$/, '')];
  if (!pg) throw new Error('no page for ' + key);
  (pages[pg] = pages[pg] || {})[key] = D[key];
}
let total = 0;
for (const [pg, docs] of Object.entries(pages)) {
  const body = 'const AF=Object.getPrototypeOf(async function(){}).constructor;\n' +
    "const run=new AF('figma','PAGE','DATA',figma.root.getSharedPluginData('coach','docs'));\n" +
    'return await run(figma,' + JSON.stringify(pg) + ',{docs:' + JSON.stringify(docs) + '});';
  const f = 'out-doc-' + pg.slice(0, 2) + '.js';
  fs.writeFileSync(f, body);
  total += body.length;
  console.log(f, pg, Object.keys(docs).length, body.length);
}
console.log('screens documented', Object.keys(D).length, 'total', total);
