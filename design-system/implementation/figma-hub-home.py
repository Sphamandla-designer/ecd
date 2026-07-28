#!/usr/bin/env python3
"""
Rebuild the ELP prototype's Home screen as the Figma hub (W3.0 Hub page, 139:66569).

Adds the four category cards (Classroom / Business / Community / Training) and the
points row, laid out to the Figma geometry. The bottom nav is kept, as asked.

The scenario nudge card is retained and sits between the greeting and the category
list — the slot the Figma home spec reserves for hub notifications (note 145:23755).
Without it the Live / Attendance-due / Consent-imminent / Month-start chips would no
longer change anything on Home.

Everything else on the screen is untouched.
"""
import json, sys, pathlib

SRC = pathlib.Path(sys.argv[1])
OUT = pathlib.Path(sys.argv[2])
lines = SRC.read_text(encoding="utf-8").split("\n")
INNER = 399
inner = json.loads(lines[INNER])
report = []


def sub(old, new, label):
    global inner
    n = inner.count(old)
    if n != 1:
        raise SystemExit(f"MISS/AMBIGUOUS ({n}): {label}\n  {old[:200]}")
    inner = inner.replace(old, new)
    report.append((label, "ok"))


# ── 1. Home needs switchTab from the context ────────────────────────────
sub("function Sh(){const{db:s,role:c,offline:a,navigate:f}=ne();",
    "function Sh(){const{db:s,role:c,offline:a,navigate:f,switchTab:_st}=ne();",
    "Sh(): pull switchTab from context")


# ── 2. Hub category cards + points row ──────────────────────────────────
# 328x80 rows, 4px gaps, radius 10, 48dp icon circle, h4 label, chevron.
def card(label, tint, main, icon, go):
    return (
        't.jsxs("button",{onClick:' + go + ',style:{width:"100%",minHeight:80,display:"flex",'
        'alignItems:"center",gap:16,background:"var(' + tint + ')",border:0,'
        'borderRadius:"var(--r-card)",padding:16,cursor:"pointer",textAlign:"left",'
        'boxSizing:"border-box"},children:['
        't.jsx("span",{style:{width:48,height:48,borderRadius:"var(--r-pill)",'
        'background:"var(' + main + ')",color:"var(--surface-0)",display:"flex",'
        'alignItems:"center",justifyContent:"center",flex:"none"},children:' + icon + '({size:24})}),'
        't.jsx("span",{style:{flex:1,font:"600 16px/22px var(--font-display)",'
        'color:"var(--ink-900)"},children:"' + label + '"}),'
        't.jsx("span",{style:{color:"var(--ink-900)",display:"flex"},children:O.chevron({size:24})})'
        ']},"' + label + '")'
    )


HUB = (
    't.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:4,marginTop:16},children:['
    + card("Classroom", "--pink-soft",  "--pink",  "O.classes",   '()=>_st("classes")') + ','
    + card("Business",  "--yellow-soft","--yellow","O.income",
           '()=>{c==="principal"?_st("income"):f("exports")}') + ','
    + card("Community", "--cyan-soft",  "--cyan",  "O.staff",     '()=>f("resourcesHub")') + ','
    + card("Training",  "--green-soft", "--green", "O.plan",      '()=>_st("resources")')
    + ']}),'
    # points row — pale green, 48dp circle, value + label, progress bar, chevron
    't.jsxs("button",{onClick:()=>f("profileHome"),style:{width:"100%",minHeight:80,'
    'display:"flex",alignItems:"center",gap:16,background:"var(--green-soft)",border:0,'
    'borderRadius:"var(--r-card)",padding:16,cursor:"pointer",textAlign:"left",'
    'boxSizing:"border-box",marginTop:16},children:['
    't.jsx("span",{style:{width:48,height:48,borderRadius:"var(--r-pill)",'
    'background:"var(--green)",color:"var(--surface-0)",display:"flex",alignItems:"center",'
    'justifyContent:"center",flex:"none"},children:O.check({size:24})}),'
    't.jsxs("span",{style:{flex:1,display:"flex",flexDirection:"column",gap:6},children:['
    't.jsxs("span",{style:{display:"flex",alignItems:"baseline",gap:6},children:['
    't.jsx("span",{style:{font:"600 24px/32px var(--font-display)",color:"var(--ink-900)"},'
    'children:"175"}),'
    't.jsx("span",{style:{font:"600 16px/22px var(--font-display)",color:"var(--ink-900)"},'
    'children:"Points"})]}),'
    't.jsx("span",{style:{height:8,borderRadius:"var(--r-pill)",background:"var(--surface-0)",'
    'display:"block",overflow:"hidden"},children:t.jsx("span",{style:{display:"block",'
    'height:"100%",width:"70%",background:"var(--green)"}})})]}),'
    't.jsx("span",{style:{color:"var(--ink-900)",display:"flex"},children:O.chevron({size:24})})]})'
)

# ── Scenario card — Figma "WO5.4.3 Hub notification" (145:27122) ────────
# That frame places an Action Panel "with link" (100:7530, 328x145) directly
# above the category cards. Actionable scenarios use that panel; the all-clear
# scenario uses the DS Success alert (100:3777) since a cleared state has no CTA.
# Panel fill is role.surface, not role.background: the Figma panel sits on navy,
# here it sits on the surface-ui content area, so the DS pairing inverts.
NOTIF = (
    # --- actionable: Action Panel "with link" ---
    '!T.card.clear&&t.jsxs("div",{style:{background:"var(--surface-0)",'
    'borderRadius:"var(--r-card)",boxShadow:"var(--e-card)",padding:16,'
    'display:"flex",flexDirection:"column",boxSizing:"border-box"},children:['
    # H3 title — DS action-panel heading
    't.jsx("div",{style:{font:"600 18px/24px var(--font-display)",'
    'color:"var(--ink-900)",textWrap:"pretty"},children:T.card.sentence}),'
    # offline deferral -> DS Informational alert
    'T.deferred&&t.jsxs("div",{style:{display:"flex",gap:12,alignItems:"flex-start",'
    'background:"var(--info-bg)",borderRadius:"var(--r-card)",padding:16,marginTop:12},'
    'children:[t.jsx("span",{style:{color:"var(--info)",display:"flex",flex:"none"},'
    'children:O.cloud({size:20})}),'
    't.jsx("span",{style:{font:"600 14px/20px var(--font-body)",'
    'color:"var(--info-dark)"},children:"We\\u2019ll send this the moment '
    'you\\u2019re back online."})]}),'
    # DS primary button with leading icon
    't.jsxs("button",{className:"btn-p",style:{marginTop:16},'
    'onClick:()=>f(T.card.route.name,T.card.route.params),children:['
    't.jsx("span",{style:{display:"flex",flex:"none"},children:O.chevron({size:20})}),'
    'T.card.cta]})]}),'
    # --- cleared: same white notification panel, DS Success alert inside ---
    # The panel stays surface-0 so the notification reads as one distinct slot,
    # the way Figma 145:27122 does. A bare success-tinted card would be the same
    # #E6F1D4 as the Training and Points cards below and would blend into them.
    'T.card.clear&&t.jsx("div",{style:{background:"var(--surface-0)",'
    'borderRadius:"var(--r-card)",boxShadow:"var(--e-card)",padding:16,'
    'boxSizing:"border-box"},children:'
    't.jsxs("div",{style:{background:"var(--success-soft)",'
    'borderRadius:"var(--r-card)",padding:16,display:"flex",gap:12,'
    'alignItems:"flex-start"},children:['
    't.jsx("span",{style:{color:"var(--success)",display:"flex",flex:"none"},'
    'children:O.check({size:20})}),'
    't.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8,flex:1},children:['
    't.jsx("div",{style:{font:"600 14px/20px var(--font-body)",'
    'color:"var(--success-dark)"},children:T.card.sentence}),'
    'T.card.note&&t.jsx("div",{style:{font:"400 14px/20px var(--font-body)",'
    'color:"var(--ink-900)"},children:T.card.note})]})]})}),'
    # --- secondary "a few things need a look" row, DS list row ---
    'T.lookCount>0&&t.jsxs("button",{onClick:()=>f("attnAll"),style:{width:"100%",'
    'minHeight:56,display:"flex",alignItems:"center",gap:12,'
    'background:"var(--surface-0)",border:0,borderRadius:"var(--r-card)",'
    'padding:"12px 16px",cursor:"pointer",textAlign:"left",marginTop:8,'
    'boxSizing:"border-box"},children:['
    't.jsx("span",{style:{width:24,height:24,borderRadius:"var(--r-pill)",'
    'background:"var(--warning-soft)",color:"var(--warning-dark)",'
    'font:"600 12px/16px var(--font-body)",display:"flex",alignItems:"center",'
    'justifyContent:"center",flex:"none"},children:T.lookCount}),'
    't.jsx("span",{style:{flex:1,font:"400 14px/20px var(--font-body)",'
    'color:"var(--ink-900)"},children:"A few things need a look"}),'
    't.jsx("span",{style:{color:"var(--ink-500)",display:"flex"},'
    'children:O.chevron({size:20})})]}),'
)


# Replace the WHOLE body of the Home scroll area with the Figma hub, so the screen
# is header -> greeting -> four category cards -> points row, exactly as 139:66569.
# The scenario nudge card and the "a few things need a look" row belong to the
# prototype's own home, not the Figma one, so they go.
SCR = ('t.jsxs("div",{className:"scr",style:{flex:1,overflow:"auto",padding:16,'
       'marginTop:-24,position:"relative",zIndex:2,background:"var(--surface-ui)",'
       'borderRadius:"var(--r-dialog) var(--r-dialog) 0 0"},children:[')
OLD_EMPTY = (
    't.jsx("div",{style:{font:"400 12px/16px var(--font-body)",color:"var(--ink-500)",'
    'textAlign:"center",margin:"32px 24px 0",textWrap:"pretty"},'
    'children:"That\\u2019s everything for now. Your classes are under Classes."})'
)
a = inner.find(SCR)
if a < 0:
    raise SystemExit("MISS: Home scroll container")
start = a + len(SCR)
e = inner.find(OLD_EMPTY, start)
if e < 0:
    raise SystemExit("MISS: end of Home body")
end = e + len(OLD_EMPTY)
inner = inner[:start] + NOTIF + HUB + inner[end:]
report.append(("Home body -> scenario card + Figma hub", "ok"))


# ── 3. Hero band: the tonal CI pattern the Figma hub sits on ────────────
# Figma layers "Graphic overlay Small 80px" (100:8639) behind the greeting. The
# real asset could not be exported (the proxy blocks figma.com), so this is the
# same motif — lighter-navy rings and blobs on the navy field — drawn in CSS.
sub('style:{background:"var(--hero)",padding:"12px 12px 40px",flex:"none",'
    'position:"relative",overflow:"hidden"}',
    'style:{background:"var(--hero)",backgroundImage:'
    '"radial-gradient(circle at 12% 78%, rgba(255,255,255,.055) 0 34px, transparent 35px),'
    'radial-gradient(circle at 63% 30%, rgba(255,255,255,.045) 0 46px, transparent 47px),'
    'radial-gradient(circle at 88% 82%, rgba(255,255,255,.05) 0 30px, transparent 31px),'
    'radial-gradient(circle at 38% 96%, rgba(255,255,255,.035) 0 26px, transparent 27px)",'
    'padding:"12px 12px 40px",flex:"none",position:"relative",overflow:"hidden"}',
    "Hero: Figma graphic-overlay motif")


# ── 3. Header: add the avatar button the Figma hub carries ──────────────
OLD_BELL_TAIL = (
    'border:"2px solid var(--hero)",boxSizing:"border-box"},children:b})]})]})]}),'
)
NEW_BELL_TAIL = (
    'border:"2px solid var(--hero)",boxSizing:"border-box"},children:b})]})]}),'
    't.jsx("button",{onClick:()=>f("profileHome"),"aria-label":"Profile",'
    'style:{width:36,height:36,borderRadius:"var(--r-pill)",background:"var(--action)",'
    'color:"var(--surface-0)",border:0,display:"flex",alignItems:"center",'
    'justifyContent:"center",cursor:"pointer",flex:"none",marginLeft:2},'
    'children:O.profile({size:20})})]}),'
)
sub(OLD_BELL_TAIL, NEW_BELL_TAIL, "Header: add Figma avatar button")

# the header component destructures only {name,date,sync} — it needs navigate too
sub("function wh({name:s,date:c,sync:a}){const{navigate:f,db:u}=ne()",
    "function wh({name:s,date:c,sync:a}){const{navigate:f,db:u}=ne()",
    "Header: navigate already available")

lines[INNER] = json.dumps(inner).replace("/", "\\u002F")
OUT.write_text("\n".join(lines), encoding="utf-8")

for label, status in report:
    print(f"  {status:<4} {label}")
print(f"\noutput: {OUT} ({OUT.stat().st_size} bytes)")
