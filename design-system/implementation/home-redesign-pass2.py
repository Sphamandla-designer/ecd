#!/usr/bin/env python3
"""
Second pass on the Home design — three fidelity gaps found by diffing the
rendered screen against the supplied mockups.

  1. The alert card's title wrapped onto two lines. The mockup fits it on one:
     16 padding, 40dp icon circle, 18px title. Retuned to match.
  2. The mockup puts the hamburger in a muted rounded-square tile. Added, and
     it also gives the control a visible 44dp target on the navy.
  3. The Classes tab icon is a four-square grid; every mockup shows two people.
     Swapped at the icon-registry level so the glyph is the same in the nav,
     the drawer and anywhere else it appears — that is the consistency ask.
"""
import json

SRC = "ELP App Prototype (standalone).html"
LINE = 399

lines = open(SRC, encoding="utf-8").read().split("\n")
inner = json.loads(lines[LINE])
report = []


def sub(old, new, label, expect=1):
    global inner
    n = inner.count(old)
    if n != expect:
        raise SystemExit(f"MISS: {label!r} — found {n}, expected {expect}")
    inner = inner.replace(old, new)
    report.append((label, n))


# ---- 1. alert card metrics -------------------------------------------------
sub(
    'background:"var(--pink-soft)",border:0,borderRadius:"var(--r-dialog)",padding:20,'
    'cursor:"pointer",textAlign:"left",display:"flex",flexDirection:"column",gap:12,',
    'background:"var(--pink-soft)",border:0,borderRadius:"var(--r-dialog)",padding:16,'
    'cursor:"pointer",textAlign:"left",display:"flex",flexDirection:"column",gap:8,',
    "alert card: padding 16, gap 8",
)
sub(
    't.jsx("span",{style:{width:48,height:48,flex:"none",borderRadius:"var(--r-pill)",'
    'background:"var(--pink)",color:"var(--surface-0)",display:"flex",alignItems:"center",'
    'justifyContent:"center"},children:O.warn({size:26})}),',
    't.jsx("span",{style:{width:40,height:40,flex:"none",borderRadius:"var(--r-pill)",'
    'background:"var(--pink)",color:"var(--surface-0)",display:"flex",alignItems:"center",'
    'justifyContent:"center"},children:O.warn({size:22})}),',
    "alert card: 40dp icon circle",
)
sub(
    't.jsx("span",{style:{flex:1,font:"600 20px/28px var(--font-display)",'
    'color:"var(--ink-900)"},children:"A few things need a look"}),',
    't.jsx("span",{style:{flex:1,minWidth:0,font:"600 18px/26px var(--font-display)",'
    'color:"var(--ink-900)"},children:"A few things need a look"}),',
    "alert card: 18px title on one line",
)
sub(
    't.jsx("div",{style:{paddingLeft:64,font:"400 16px/24px var(--font-body)",',
    't.jsx("div",{style:{paddingLeft:56,font:"400 16px/24px var(--font-body)",',
    "alert card: body aligns under the title",
)

# ---- 2. hamburger tile -----------------------------------------------------
sub(
    't.jsx("button",{onClick:()=>f("menu"),"aria-label":"Menu",style:{width:44,height:44,'
    'display:"flex",alignItems:"center",justifyContent:"center",background:"none",border:0,'
    'color:"var(--surface-0)",cursor:"pointer",flex:"none"},children:O.menu()})',
    't.jsx("button",{onClick:()=>f("menu"),"aria-label":"Menu",style:{width:44,height:44,'
    'display:"flex",alignItems:"center",justifyContent:"center",'
    'background:"rgba(255,255,255,.10)",borderRadius:"var(--r-card)",border:0,'
    'color:"var(--surface-0)",cursor:"pointer",flex:"none"},children:O.menu()})',
    "app bar: hamburger sits in a muted tile",
)

# ---- 3. Classes icon -------------------------------------------------------
sub(
    'classes:(s={})=>pn(t.jsxs(t.Fragment,{children:['
    't.jsx("rect",{x:"4",y:"4",width:"7",height:"7",rx:"2",stroke:"currentColor",strokeWidth:"2"}),'
    't.jsx("rect",{x:"13",y:"4",width:"7",height:"7",rx:"2",stroke:"currentColor",strokeWidth:"2"}),'
    't.jsx("rect",{x:"4",y:"13",width:"7",height:"7",rx:"2",stroke:"currentColor",strokeWidth:"2"}),'
    't.jsx("rect",{x:"13",y:"13",width:"7",height:"7",rx:"2",stroke:"currentColor",strokeWidth:"2"})]}),s.size)',
    'classes:(s={})=>pn(t.jsxs(t.Fragment,{children:['
    't.jsx("circle",{cx:"9",cy:"9",r:"3",stroke:"currentColor",strokeWidth:"2"}),'
    't.jsx("path",{d:"M3 19c0-2.8 2.7-5 6-5s6 2.2 6 5",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"}),'
    't.jsx("path",{d:"M16 7.5a2.8 2.8 0 0 1 0 5.4M18 18.5c0-1.9-.8-3.2-2-4",stroke:"currentColor",'
    'strokeWidth:"2",strokeLinecap:"round"})]}),s.size)',
    "icon: Classes becomes the people glyph",
)

lines[LINE] = json.dumps(inner).replace("/", "\\u002F")
open(SRC, "w", encoding="utf-8").write("\n".join(lines))

print(f"{'change':50s} count")
print("-" * 58)
for label, n in report:
    print(f"{label:50s} {n}")
