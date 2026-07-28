#!/usr/bin/env python3
"""
Apply the reviewed Home design to the ELP prototype.

Source of truth: the four Home mockups supplied 2026-07-28 (attendance due,
consent imminent, consent/month start, all clear).

What changes
  1. Bottom nav drops to three fixed tabs — Home · Classes · Resources — for
     BOTH roles. Profile, Income and Staff move into the Menu drawer.
  2. Home loses the four resource-category shortcuts.
  3. Home's primary card becomes a pale-blue hero on a white sheet, with a
     larger Quicksand heading and a full-width pill CTA in Title Case.
  4. The "a few things need a look" row becomes a pink card: 48dp magenta
     icon circle, title, chevron, and a body line underneath.
  5. All-clear gains a green companion card (48dp green circle + check).
  6. --r-btn goes 15px -> 999px so EVERY primary button in the product, from
     onboarding through the app, is the same pill as the mockups. This is the
     consistency half of the brief; doing it as a token means onboarding and
     the app cannot drift apart again.

Every substitution asserts on miss, so a bundle change breaks the build loudly
instead of silently half-applying.
"""
import json
import sys

SRC = "ELP App Prototype (standalone).html"
LINE = 399

lines = open(SRC, encoding="utf-8").read().split("\n")
inner = json.loads(lines[LINE])
report = []


def sub(old, new, label, expect=1):
    global inner
    n = inner.count(old)
    if n != expect:
        raise SystemExit(f"MISS: {label!r} — found {n} occurrences, expected {expect}")
    inner = inner.replace(old, new)
    report.append((label, n))


def cut(start_marker, end_marker, new, label):
    """Replace everything from start_marker up to (not including) end_marker."""
    global inner
    a = inner.find(start_marker)
    b = inner.find(end_marker, a + 1)
    if a < 0 or b < 0:
        raise SystemExit(f"MISS: {label!r} — markers not found (a={a} b={b})")
    inner = inner[:a] + new + inner[b:]
    report.append((label, 1))


# ---------------------------------------------------------------- 1. tokens
# Pill buttons everywhere. --r-btn is used only by button surfaces.
sub("--r-btn: 15px", "--r-btn: 999px", "token: --r-btn -> pill")

# ---------------------------------------------------------------- 2. nav
# Give principals a Resources tab so slice(0,3) yields the same three tabs for
# both roles. The remaining entries stay in the array so switchTab() can still
# resolve their root routes from the drawer.
sub(
    'principal:[{name:"home",label:"Home",icon:O.home,root:"home"},'
    '{name:"classes",label:"Classes",icon:O.classes,root:"classList"},'
    '{name:"income"',
    'principal:[{name:"home",label:"Home",icon:O.home,root:"home"},'
    '{name:"classes",label:"Classes",icon:O.classes,root:"classList"},'
    '{name:"resources",label:"Resources",icon:O.resources,root:"resourcesHub"},'
    '{name:"income"',
    "nav: principal gains a Resources tab",
)
sub(
    "children:mh[s].map(u=>{const p=f===u.name;",
    "children:mh[s].slice(0,3).map(u=>{const p=f===u.name;",
    "nav: render three tabs only",
)

# ---------------------------------------------------------------- 3. drawer
# Anything that lost a tab has to keep a way in.
sub(
    '{label:"Downloads",sub:"Registers and reports to keep",icon:O.download,go:()=>c("exports")}];'
    's==="principal"&&areas.splice(2,0,{label:"Resources",sub:"Activities, health and training",'
    'icon:O.resources,go:()=>a("resources")});',
    '{label:"Downloads",sub:"Registers and reports to keep",icon:O.download,go:()=>c("exports")},'
    '{label:"Profile",sub:"Your details and settings",icon:O.profile,go:()=>c("profileHome")}];'
    's==="principal"&&areas.splice(2,0,'
    '{label:"Income",sub:"Fees, payments and expenses",icon:O.income,go:()=>c("income")},'
    '{label:"Staff",sub:"Practitioners and classes",icon:O.staff,go:()=>c("staffList")});',
    "drawer: Profile, Income and Staff stay reachable",
)

# ---------------------------------------------------------------- 4. sheet
sub(
    'className:"scr",style:{flex:1,overflow:"auto",padding:16,marginTop:-24,position:"relative",'
    'zIndex:2,background:"var(--surface-ui)",borderRadius:"var(--r-dialog) var(--r-dialog) 0 0"}',
    'className:"scr",style:{flex:1,overflow:"auto",padding:16,marginTop:-24,position:"relative",'
    'zIndex:2,background:"var(--surface-0)",borderRadius:"var(--r-dialog) var(--r-dialog) 0 0"}',
    "home: content sheet goes white",
)

# ---------------------------------------------------------------- 5. cards
TITLE_CASE = (
    'T.card.cta.replace(/(^|\\s)([a-z])(\\w*)/g,(M,p,c,r)=>'
    'p+(p&&/^(a|an|the|of|to|and|in|on|for)$/.test(c+r)?c+r:c.toUpperCase()+r))'
)

HERO = (
    '!T.card.clear&&t.jsxs("div",{style:{background:"var(--surface-ui)",'
    'borderRadius:"var(--r-dialog)",padding:24,display:"flex",flexDirection:"column",'
    'boxSizing:"border-box"},children:['
    't.jsx("div",{style:{font:"600 26px/34px var(--font-display)",color:"var(--ink-900)",'
    'textWrap:"pretty"},children:T.card.sentence}),'
    'T.deferred&&t.jsxs("div",{style:{display:"flex",gap:12,alignItems:"flex-start",'
    'background:"var(--info-bg)",borderRadius:"var(--r-card)",padding:16,marginTop:16},children:['
    't.jsx("span",{style:{color:"var(--info)",display:"flex",flex:"none"},children:O.cloud({size:20})}),'
    't.jsx("span",{style:{font:"600 14px/20px var(--font-body)",color:"var(--info-dark)"},'
    'children:"We\\u2019ll send this the moment you\\u2019re back online."})]}),'
    't.jsx("button",{className:"btn-p",style:{marginTop:24,minHeight:56,'
    'font:"600 16px/22px var(--font-display)"},'
    'onClick:()=>f(T.card.route.name,T.card.route.params),children:' + TITLE_CASE + '})]}),'
)

CLEAR = (
    'T.card.clear&&t.jsxs(t.Fragment,{children:['
    't.jsx("div",{style:{background:"var(--surface-ui)",borderRadius:"var(--r-dialog)",'
    'padding:24,boxSizing:"border-box"},children:'
    't.jsx("div",{style:{font:"600 26px/34px var(--font-display)",color:"var(--ink-900)",'
    'textWrap:"pretty"},children:T.card.sentence})}),'
    'T.card.note&&t.jsxs("div",{style:{marginTop:24,background:"var(--green-soft)",'
    'borderRadius:"var(--r-dialog)",padding:20,display:"flex",gap:16,alignItems:"center",'
    'boxSizing:"border-box"},children:['
    't.jsx("span",{style:{width:48,height:48,flex:"none",borderRadius:"var(--r-pill)",'
    'background:"var(--green)",color:"var(--surface-0)",display:"flex",alignItems:"center",'
    'justifyContent:"center"},children:O.check({size:26})}),'
    't.jsx("span",{style:{flex:1,font:"400 16px/24px var(--font-body)",color:"var(--ink-900)"},'
    'children:T.card.note+" and nothing needs attention."})]})]}),'
)

LOOK = (
    'T.lookCount>0&&t.jsxs("button",{onClick:()=>f("attnAll"),style:{marginTop:24,width:"100%",'
    'background:"var(--pink-soft)",border:0,borderRadius:"var(--r-dialog)",padding:20,'
    'cursor:"pointer",textAlign:"left",display:"flex",flexDirection:"column",gap:12,'
    'boxSizing:"border-box"},children:['
    't.jsxs("div",{style:{display:"flex",alignItems:"center",gap:16},children:['
    't.jsx("span",{style:{width:48,height:48,flex:"none",borderRadius:"var(--r-pill)",'
    'background:"var(--pink)",color:"var(--surface-0)",display:"flex",alignItems:"center",'
    'justifyContent:"center"},children:O.warn({size:26})}),'
    't.jsx("span",{style:{flex:1,font:"600 20px/28px var(--font-display)",'
    'color:"var(--ink-900)"},children:"A few things need a look"}),'
    't.jsx("span",{style:{color:"var(--ink-900)",display:"flex",flex:"none"},'
    'children:O.chevron({size:24})})]}),'
    't.jsx("div",{style:{paddingLeft:64,font:"400 16px/24px var(--font-body)",'
    'color:"var(--ink-900)"},children:((T.lookList[0]&&T.lookList[0].sentence)||"")'
    '.replace(/\\.$/,"")+"\\u2026"})]})'
)

# hero + clear card
cut(
    '!T.card.clear&&t.jsxs("div",{style:{background:"var(--surface-0)"',
    'T.lookCount>0&&t.jsxs("button"',
    HERO + CLEAR,
    "home: hero card and all-clear card",
)

# look card, and drop the four category shortcuts entirely
cut(
    'T.lookCount>0&&t.jsxs("button"',
    "function HubLauncher_(",
    LOOK + "]})]})}",
    "home: alert card in, resource shortcuts out",
)

# ---------------------------------------------------------------- write
lines[LINE] = json.dumps(inner).replace("/", "\\u002F")
open(SRC, "w", encoding="utf-8").write("\n".join(lines))

print(f"{'change':52s} count")
print("-" * 60)
for label, n in report:
    print(f"{label:52s} {n}")
print(f"\ninner length {len(inner)}")
