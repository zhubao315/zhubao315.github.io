#!/usr/bin/env python3
# ZHUBAO Logo Master Generator — Z-Grid geometry from 8x8 grid
# unit=12, canvas 96, node 1x1u(12), bar 1x1u(12), diagonal ~1.5u @45deg
import os, subprocess
B = "/oc/zhubao-brand"
C = dict(midnight="#07111F", navy="#0B1D33", blue="#2563EB", cyan="#38BDF8",
         white="#F7FAFF", gray="#94A3B8", build="#38BDF8", think="#FBBF24",
         measure="#34D399", create="#FB7185")
DIAG = "70,19 96,19 40,77 14,77"  # 45deg diagonal, ~1.5u thick, flush to top-right/bottom-left

def symbol(color=None):
    """color=None -> full color; else all shapes in that color."""
    if color is None:
        return f'''<polygon points="{DIAG}" fill="{C['white']}"/>
  <rect x="12" y="8" width="72" height="12" fill="{C['blue']}"/>
  <rect x="12" y="76" width="72" height="12" fill="{C['blue']}"/>
  <rect x="0" y="8" width="12" height="12" fill="{C['build']}"/>
  <rect x="84" y="8" width="12" height="12" fill="{C['think']}"/>
  <rect x="0" y="76" width="12" height="12" fill="{C['measure']}"/>
  <rect x="84" y="76" width="12" height="12" fill="{C['create']}"/>'''
    s = f'''<rect x="0" y="8" width="96" height="12" fill="{color}"/>
  <rect x="0" y="76" width="96" height="12" fill="{color}"/>
  <polygon points="{DIAG}" fill="{color}"/>'''
    return s

def svg(w, h, body):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" role="img" aria-label="ZHUBAO">
  <title>ZHUBAO · Z-Grid</title>
  {body}
</svg>'''

def wordmark_h(tc, dc=C['gray']):
    # horizontal lockup inner block, symbol already placed at 32,32
    return f'''<text x="376" y="86" text-anchor="middle" font-family="Inter" font-weight="900" font-size="58" letter-spacing="12" fill="{tc}">ZHUBAO</text>
  <line x1="254" y1="112" x2="332" y2="112" stroke="{dc}" stroke-width="2"/>
  <text x="376" y="121" text-anchor="middle" font-family="Noto Sans CJK SC" font-weight="700" font-size="27" letter-spacing="7" fill="{dc}">朱宝</text>
  <line x1="420" y1="112" x2="498" y2="112" stroke="{dc}" stroke-width="2"/>'''

def lockup_h(bg=None, tc=None, dc=None, sym=None):
    tc = tc or C['midnight']; dc = dc or C['gray']
    body = f'''<rect width="576" height="160" fill="{bg}"/>''' if bg else ""
    body += f'''
  <g transform="translate(24,24) scale(1.16667)">{symbol(sym)}</g>
  <line x1="184" y1="46" x2="184" y2="114" stroke="{dc}" stroke-width="2" opacity="0.55"/>
  {wordmark_h(tc, dc)}'''
    return svg(576, 160, body)

def lockup_v(bg=None, tc=None, dc=None, sym=None):
    tc = tc or C['midnight']; dc = dc or C['gray']
    body = f'''<rect width="320" height="268" fill="{bg}"/>''' if bg else ""
    body += f'''
  <g transform="translate(112,28)">{symbol(sym)}</g>
  <text x="160" y="188" text-anchor="middle" font-family="Inter" font-weight="900" font-size="42" letter-spacing="9" fill="{tc}">ZHUBAO</text>
  <line x1="46" y1="221" x2="118" y2="221" stroke="{dc}" stroke-width="2"/>
  <text x="160" y="230" text-anchor="middle" font-family="Noto Sans CJK SC" font-weight="700" font-size="24" letter-spacing="6" fill="{dc}">朱宝</text>
  <line x1="202" y1="221" x2="274" y2="221" stroke="{dc}" stroke-width="2"/>'''
    return svg(320, 268, body)

def favicon(sz, bg=C['navy']):
    # rounded tile, symbol inset 14%
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="22" fill="{bg}"/>
  <g transform="translate(14,14) scale(0.72)">{symbol()}</g>
</svg>'''

def w(p, s):
    p = os.path.join(B, p); os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, "w", encoding="utf-8").write(s); print(p)
    return p

M = lambda name, s: w(f"01-LOGO/master/{name}.svg", s)
files = []
# masters (transparent)
files.append(M("zhubao-symbol", svg(96, 96, symbol())))
files.append(M("zhubao-horizontal", lockup_h()))
files.append(M("zhubao-stacked", lockup_v()))
# reverse (white text on transparent, for dark backgrounds)
files.append(w("01-LOGO/dark/zhubao-reverse.svg", lockup_h(tc=C['white'], dc=C['gray'])))
files.append(w("01-LOGO/dark/zhubao-horizontal-dark.svg", lockup_h(bg=C['midnight'], tc=C['white'])))
files.append(w("01-LOGO/dark/zhubao-stacked-dark.svg", lockup_v(bg=C['midnight'], tc=C['white'])))
# light (on arctic)
files.append(w("01-LOGO/light/zhubao-horizontal-light.svg", lockup_h(bg=C['white'])))
files.append(w("01-LOGO/light/zhubao-stacked-light.svg", lockup_v(bg=C['white'])))
# monochrome
files.append(w("01-LOGO/monochrome/zhubao-monochrome.svg", lockup_h(tc=C['navy'], dc=C['navy'], sym=C['navy'])))
files.append(w("01-LOGO/monochrome/zhubao-symbol-monochrome.svg", svg(96, 96, symbol(C['navy']))))
files.append(w("01-LOGO/monochrome/zhubao-black.svg", svg(96, 96, symbol("#000000"))))
files.append(w("01-LOGO/monochrome/zhubao-white.svg", svg(96, 96, symbol("#FFFFFF"))))
files.append(w("01-LOGO/monochrome/zhubao-symbol-reverse-mono.svg", svg(96, 96, symbol(C['white']))))
# favicon svg
files.append(w("01-LOGO/favicon/zhubao-favicon.svg", favicon(100)))
files.append(w("01-LOGO/favicon/zhubao-favicon-light.svg", favicon(100, bg=C['white'])))
# PNG exports (rendered via rsvg-convert)
def png(src, dst, wpx):
    subprocess.run(["rsvg-convert", "-w", str(wpx), src, "-o", dst], check=True)
tmp_h = w("/tmp/_h.svg", lockup_h(bg=C['midnight'], tc=C['white']))
tmp_v = w("/tmp/_v.svg", lockup_v(bg=C['midnight'], tc=C['white']))
os.makedirs(f"{B}/09-EXPORTS/png", exist_ok=True)
png(tmp_h, f"{B}/09-EXPORTS/png/zhubao-horizontal.png", 1152)
png(tmp_v, f"{B}/09-EXPORTS/png/zhubao-stacked.png", 640)
png(f"{B}/01-LOGO/master/zhubao-symbol.svg", f"{B}/09-EXPORTS/png/zhubao-symbol.png", 480)
fav = f"{B}/01-LOGO/favicon/zhubao-favicon.svg"
for sz in (16, 32, 48, 64, 128, 180, 192, 512):
    png(fav, f"{B}/01-LOGO/favicon/zhubao-favicon-{sz}.png", sz)
    png(fav, f"{B}/09-EXPORTS/png/zhubao-favicon-{sz}.png", sz)
png(fav, f"{B}/01-LOGO/favicon/apple-touch-icon.png", 180)
png(fav, f"{B}/01-LOGO/favicon/pwa-icon-512.png", 512)
print("done")
