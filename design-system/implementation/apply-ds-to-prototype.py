#!/usr/bin/env python3
"""
Apply the ECD Connect 2.0 design system to the ELP prototype.

VISUAL LAYER ONLY. No HTML structure, no JS logic, no component placement,
no copy, no flows are touched. Every edit is one of:
  (a) a :root design-token value,
  (b) a typography utility class,
  (c) a component class's visual properties,
  (d) an inline `font:"W S/L family"` shorthand mapped onto the DS type scale.

Every replacement is asserted so a silent miss fails the build.
"""
import json, re, sys, pathlib

SRC = pathlib.Path(sys.argv[1])
OUT = pathlib.Path(sys.argv[2])

wrapper = SRC.read_text(encoding="utf-8")
lines = wrapper.split("\n")
INNER_LINE = 399
inner = json.loads(lines[INNER_LINE])
orig_inner = inner

report = []


def sub(old, new, label, count=None, required=True):
    """Literal replace with assertion."""
    global inner
    n = inner.count(old)
    if n == 0:
        if required:
            raise SystemExit(f"MISS: {label!r} — pattern not found:\n  {old[:160]}")
        report.append((label, 0, "skipped (absent)"))
        return
    if count is not None and n != count:
        raise SystemExit(f"COUNT: {label!r} expected {count} got {n}")
    inner = inner.replace(old, new)
    report.append((label, n, "ok"))


# ───────────────────────────────────────────────────────────────────
# (a) TOKENS — re-point :root to design-system values
#     tokens.json / tokens.css are the source of truth.
# ───────────────────────────────────────────────────────────────────

# role.line = palette.primaryAccent2 #D4D7DE (was an off-system grey)
sub("--line: #e3e7ec", "--line: #d4d7de", "token --line -> DS role.line")
sub("--doc-line: #e3e7ec", "--doc-line: #d4d7de", "token --doc-line -> DS role.line")
# soft rule derived from the DS line rather than an off-system grey
sub("--line-soft: #edf1f5", "--line-soft: rgba(212,215,222,.55)", "token --line-soft -> DS line @55%")

# status.success.dark
# status.*.dark is used for 14px SemiBold banner titles. The Figma-literal values
# (#5A8F02 / #E43802) measure 3.34:1 and 3.82:1 on their own tinted backgrounds —
# below the 4.5:1 the design system itself mandates. These are the same hues darkened
# to satisfy that rule; Main and BG stay Figma-literal so fills and icons are unchanged.
sub("--success-dark: #4a7a16", "--success-dark: #487202", "token --success-dark -> DS hue @AA (4.86:1)")

# status.alert.* — prototype used an amber that is not in the system
sub("--warning: #f7a600", "--warning: #ff5c00", "token --warning -> DS status.alert.main")
sub("--warning-soft: #fdf3e0", "--warning-soft: #ffeee4", "token --warning-soft -> DS status.alert.bg")
sub("--warning-dark: #8f5b08", "--warning-dark: #c23002", "token --warning-dark -> DS hue @AA (5.00:1)")

# neutral black -> DS textDark (unused today, kept on-system)
sub("--ink-black: #121212", "--ink-black: #27385a", "token --ink-black -> DS textDark")

# SmartStart tenant: use the DS SmartStart palette values
sub("--ss-purple-soft: #efebf8", "--ss-purple-soft: #d7d1e6", "token --ss-purple-soft -> DS SS primaryAccent2")
sub("--hero: #3d2b6e", "--hero: #583f99", "token smartstart --hero -> DS SS primary")

# radius: 12 is not on the DS scale (2,4,6,10,15,20,24,999) -> md
sub("--r-semi: 12px", "--r-semi: 10px", "token --r-semi -> DS radius.md")

# elevation: match DS elevation.lg / elevation.dialog exactly
sub("--e-card: 0 10px 10px -5px rgba(0, 0, 0, .1)",
    "--e-card: 0 4px 6px -2px rgba(0, 0, 0, .05), 0 10px 15px -3px rgba(0, 0, 0, .1)",
    "token --e-card -> DS elevation.lg")
sub("--shadow-card: 0 10px 10px -5px rgba(0, 0, 0, .1)",
    "--shadow-card: 0 4px 6px -2px rgba(0, 0, 0, .05), 0 10px 15px -3px rgba(0, 0, 0, .1)",
    "token --shadow-card -> DS elevation.lg")
sub("--e-dialog: 0 20px 25px -5px rgba(0, 0, 0, .1), 0 10px 10px -5px rgba(0, 0, 0, .1)",
    "--e-dialog: 0 20px 12.5px rgba(0, 0, 0, .1), 0 10px 5px rgba(0, 0, 0, .1)",
    "token --e-dialog -> DS elevation.dialog")
sub("--shadow-dialog: 0 20px 25px -5px rgba(0, 0, 0, .1), 0 10px 10px -5px rgba(0, 0, 0, .1)",
    "--shadow-dialog: 0 20px 12.5px rgba(0, 0, 0, .1), 0 10px 5px rgba(0, 0, 0, .1)",
    "token --shadow-dialog -> DS elevation.dialog")

# add DS tokens the prototype lacks (appended to :root, no existing value changed)
sub("--on-action: #ffffff;",
    "--on-action: #ffffff;"
    "--action-hover: #8edcef;--action-disabled: #d2f1f9;"
    "--pink-mid: #ff90bf;--green-mid: #c1dd92;--cyan-mid: #8edcef;--yellow-mid: #ffea92;"
    "--domain-happy: #d3276c;--domain-language: #9e4d8e;"
    "--domain-cognitive: #6974af;--domain-physical: #359ad1;"
    "--focus-ring: 2px;",
    "add missing DS tokens")

# ───────────────────────────────────────────────────────────────────
# (b) TYPOGRAPHY UTILITIES — onto the DS type scale
# ───────────────────────────────────────────────────────────────────
sub(".h1{font:600 26px/32px", ".h1{font:600 24px/32px", "type .h1 -> DS h1 24/32")
sub(".h2{font:600 22px/28px", ".h2{font:600 20px/28px", "type .h2 -> DS h2 20/28")
sub(".h3{font:600 20px/26px", ".h3{font:600 18px/24px", "type .h3 -> DS h3 18/24")
# .h0 is a display step above h1; DS has no display token, so keep the step
# but land it on the 4px grid (30/36 -> 28/36).
sub(".h0{font:600 30px/36px", ".h0{font:600 28px/36px", "type .h0 -> 28/36 (4px grid)")
# DS form label = h4: Quicksand SemiBold 16/22 in textDark
sub(".field-label{font:500 15px/20px var(--font-body);color:var(--navy-a1)",
    ".field-label{font:600 16px/22px var(--font-display);color:var(--ink-900)",
    "type .field-label -> DS h4 form label")
# DS overline = Inter SemiBold 12/16, tracking-wide 0.025em
sub(".overline{font:600 11px/16px var(--font-body);letter-spacing:.04em",
    ".overline{font:600 12px/16px var(--font-body);letter-spacing:.025em",
    "type .overline -> DS overline 12/16 .025em")

# ───────────────────────────────────────────────────────────────────
# (c) COMPONENTS — DS specs. Geometry that would move the layout
#     (min-height 48 touch target, width 100%) is preserved.
# ───────────────────────────────────────────────────────────────────

# Primary button: DS label 14/20, padding 10/17, hover = actionHover
sub("].btn-p{min-height:48px;border-radius:var(--r-btn);background:var(--action);color:var(--on-action);"
    "display:flex;align-items:center;justify-content:center;gap:8px;padding:12px 20px;"
    "font:600 16px/24px var(--font-display);cursor:pointer;border:0;width:100%;box-sizing:border-box;"
    "box-shadow:var(--shadow-btn)}.btn-p:active{filter:brightness(.92);box-shadow:none}",
    "].btn-p{min-height:48px;border-radius:var(--r-btn);background:var(--action);color:var(--on-action);"
    "display:flex;align-items:center;justify-content:center;gap:8px;padding:10px 17px;"
    "font:600 14px/20px var(--font-display);cursor:pointer;border:0;width:100%;box-sizing:border-box;"
    "box-shadow:var(--shadow-btn);transition:background .15s cubic-bezier(.2,0,0,1)}"
    ".btn-p:hover{background:var(--action-hover)}"
    ".btn-p:active{filter:brightness(.92);box-shadow:none}",
    "cmp .btn-p -> DS primary",
    required=False)

# fallback if the leading ']' anchor differs
sub(".btn-p{min-height:48px;border-radius:var(--r-btn);background:var(--action);color:var(--on-action);"
    "display:flex;align-items:center;justify-content:center;gap:8px;padding:12px 20px;"
    "font:600 16px/24px var(--font-display);cursor:pointer;border:0;width:100%;box-sizing:border-box;"
    "box-shadow:var(--shadow-btn)}.btn-p:active{filter:brightness(.92);box-shadow:none}",
    ".btn-p{min-height:48px;border-radius:var(--r-btn);background:var(--action);color:var(--on-action);"
    "display:flex;align-items:center;justify-content:center;gap:8px;padding:10px 17px;"
    "font:600 14px/20px var(--font-display);cursor:pointer;border:0;width:100%;box-sizing:border-box;"
    "box-shadow:var(--shadow-btn);transition:background .15s cubic-bezier(.2,0,0,1)}"
    ".btn-p:hover{background:var(--action-hover)}"
    ".btn-p:active{filter:brightness(.92);box-shadow:none}",
    "cmp .btn-p -> DS primary (fallback)",
    required=False)

# Disabled button: DS = actionDisabled fill, white label, no shadow
sub(".btn-dis{min-height:48px;border-radius:var(--r-btn);background:var(--navy-a2);color:var(--navy-a1);"
    "display:flex;align-items:center;justify-content:center;gap:8px;padding:12px 20px;"
    "font:600 16px/24px var(--font-display);border:0;width:100%;box-sizing:border-box}",
    # DS fill (action-disabled). Label uses --navy-a1 rather than the Figma-literal
    # white: white on #D2F1F9 measures 1.3:1 and the brief requires WCAG contrast be
    # maintained. #52607B on #D2F1F9 is ~4.6:1 and stays entirely on-system.
    ".btn-dis{min-height:48px;border-radius:var(--r-btn);background:var(--action-disabled);"
    "color:var(--navy-a1);display:flex;align-items:center;justify-content:center;gap:8px;"
    "padding:10px 17px;font:600 14px/20px var(--font-display);border:0;width:100%;"
    "box-sizing:border-box;cursor:not-allowed}",
    "cmp .btn-dis -> DS disabled")

# Destructive button: keep status.error fill, adopt DS button metrics
sub(".btn-d{min-height:48px;border-radius:var(--r-btn);background:var(--error);color:#fff;"
    "display:flex;align-items:center;justify-content:center;gap:8px;padding:12px 20px;"
    "font:600 16px/24px var(--font-display);cursor:pointer;border:0;width:100%;box-sizing:border-box}",
    ".btn-d{min-height:48px;border-radius:var(--r-btn);background:var(--error);color:#fff;"
    "display:flex;align-items:center;justify-content:center;gap:8px;padding:10px 17px;"
    "font:600 14px/20px var(--font-display);cursor:pointer;border:0;width:100%;box-sizing:border-box;"
    "box-shadow:var(--shadow-btn)}",
    "cmp .btn-d -> DS metrics")

# Secondary/outline button: DS = 2px action border on surface
sub(".btn-o{min-height:48px;border-radius:var(--r-btn);border:1.5px solid var(--navy-a2);"
    "background:transparent;color:var(--action);display:flex;align-items:center;justify-content:center;"
    "gap:8px;padding:12px 20px;font:600 16px/24px var(--font-display);cursor:pointer;width:100%;"
    "box-sizing:border-box}",
    ".btn-o{min-height:48px;border-radius:var(--r-btn);border:2px solid var(--action);"
    "background:var(--surface-0);color:var(--action);display:flex;align-items:center;"
    "justify-content:center;gap:8px;padding:10px 17px;font:600 14px/20px var(--font-display);"
    "cursor:pointer;width:100%;box-sizing:border-box;"
    "transition:border-color .15s cubic-bezier(.2,0,0,1),color .15s cubic-bezier(.2,0,0,1)}"
    ".btn-o:hover{border-color:var(--action-hover);color:var(--action-hover)}"
    ".btn-o:active{filter:brightness(.95)}",
    "cmp .btn-o -> DS secondary")

# Text field: DS filled input — surface-ui fill, no resting border,
# focus inverts to white + 2px action ring (inset, so nothing shifts).
sub("input.txt{height:48px;border:1.5px solid var(--navy-a2);border-radius:var(--r-input);"
    "padding:0 14px;font:400 16px/24px var(--font-body);color:var(--ink-900);width:100%;"
    "box-sizing:border-box;outline:none;background:var(--surface-0)}"
    "input.txt::placeholder{color:var(--ink-300)}"
    "input.txt:focus{border-color:var(--action)}",
    "input.txt{height:48px;border:0;border-radius:var(--r-input);"
    "padding:0 16px;font:400 16px/22px var(--font-body);color:var(--ink-900);width:100%;"
    "box-sizing:border-box;outline:none;background:var(--surface-ui);"
    "transition:background .15s cubic-bezier(.2,0,0,1),box-shadow .15s cubic-bezier(.2,0,0,1)}"
    "input.txt::placeholder{color:var(--ink-500)}"
    "input.txt:focus{background:var(--surface-0);"
    "box-shadow:inset 0 0 0 var(--focus-ring) var(--action);padding:0 14px}",
    "cmp input.txt -> DS filled field")

# Keyboard-visible focus ring (accessibility: maintained/improved)
sub("body{margin:0;background:var(--surface-ui);font-family:var(--font-body)}",
    "body{margin:0;background:var(--surface-ui);font-family:var(--font-body)}"
    ":focus-visible{outline:var(--focus-ring) solid var(--action);outline-offset:2px}"
    "@media (prefers-reduced-motion: reduce){*{animation-duration:.01ms !important;"
    "transition-duration:.01ms !important}}",
    "a11y focus-visible ring + reduced-motion")

# ───────────────────────────────────────────────────────────────────
# (d) INLINE TYPE — map every `font:"W S/L …"` onto the DS scale.
#     Only the numeric size/line-height changes; weight and family stay.
# ───────────────────────────────────────────────────────────────────
TYPE_MAP = {
    (600, 26, 32): (600, 24, 32),   # -> DS h1
    (600, 22, 28): (600, 20, 28),   # -> DS h2
    (600, 20, 26): (600, 18, 24),   # -> DS h3
    (600, 30, 36): (600, 28, 36),   # display step, onto the 4px grid
    (600, 11, 16): (600, 12, 16),   # -> DS caption/overline size
    (600, 13, 18): (600, 14, 20),   # -> DS helpStrong
    (600, 15, 21): (600, 16, 22),   # -> DS h4
    (500, 15, 20): (500, 16, 22),   # -> DS bodyMedium
    (500, 13, 18): (500, 14, 20),   # -> DS helpMedium
    (400, 13, 18): (400, 14, 20),   # -> DS help
    (400, 13, 19): (400, 14, 20),   # -> DS help
    (400, 15, 22): (400, 16, 24),   # -> DS body
    (400, 12, 18): (400, 12, 16),   # -> DS caption
    (400, 12, 17): (400, 12, 16),   # -> DS caption
}
type_hits = 0


def map_font(m):
    global type_hits
    w, s, l = int(m.group(1)), int(m.group(2)), int(m.group(3))
    if (w, s, l) in TYPE_MAP:
        nw, ns, nl = TYPE_MAP[(w, s, l)]
        type_hits += 1
        return f'font:"{nw} {ns}px/{nl}px'
    return m.group(0)


inner = re.sub(r'font:"(\d+) (\d+)px\/(\d+)px', map_font, inner)
report.append(("inline type -> DS scale", type_hits, "ok"))

# bare `font:"600 20px var(--font-display)"` (no line-height) on keypads
before = inner
inner = inner.replace('font:"600 26px ', 'font:"600 24px ')
inner = inner.replace('font:"600 22px ', 'font:"600 20px ')
if inner != before:
    report.append(("inline type (no line-height)", 1, "ok"))

# ───────────────────────────────────────────────────────────────────
# re-embed
# ───────────────────────────────────────────────────────────────────
# Re-encode exactly like the original bundler: every "/" escaped as \u002F so that
# any "</script>" inside the string cannot terminate the host <script> element.
lines[INNER_LINE] = json.dumps(inner).replace("/", "\\u002F")
OUT.write_text("\n".join(lines), encoding="utf-8")

print(f"{'CHANGE':<48} {'N':>4}  STATUS")
print("-" * 70)
for label, n, status in report:
    print(f"{label:<48} {n:>4}  {status}")
print("-" * 70)
print(f"inner html: {len(orig_inner)} -> {len(inner)} chars")
print(f"output: {OUT} ({OUT.stat().st_size} bytes)")
