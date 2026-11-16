#!/usr/bin/env python3
# ZHUBAO shared brand geometry & rendering helpers
import os, subprocess
B = "/oc/zhubao-brand"
C = dict(midnight="#07111F", navy="#0B1D33", blue="#2563EB", cyan="#38BDF8",
         white="#F7FAFF", gray="#94A3B8", body="#CBD6E6", think="#FBBF24",
         measure="#34D399", create="#FB7185")
DIAG = "70,19 96,19 40,77 14,77"
INT = 'font-family="Inter" '; CJK = 'font-family="Noto Sans CJK SC" '; MON = 'font-family="Noto Sans Mono" '

def w(p, s):
    p = os.path.join(B, p); os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, "w", encoding="utf-8").write(s)
def png(src, dst, wp):
    dst = os.path.join(B, dst) if not dst.startswith("/") else dst
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    subprocess.run(["rsvg-convert", "-w", str(wp), os.path.join(B, src) if not src.startswith("/") else src, "-o", dst], check=True)
def svg(wv, hv, body, px=False):
    d = f' width="{wv}" height="{hv}"' if px else ""
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {wv} {hv}"{d}>\n{body}\n</svg>'
def sym0(c=None):
    """symbol in native 96x96 coords"""
    if c is None:
        return f'''<polygon points="{DIAG}" fill="{C['white']}"/>
  <rect x="12" y="8" width="72" height="12" fill="{C['blue']}"/><rect x="12" y="76" width="72" height="12" fill="{C['blue']}"/>
  <rect x="0" y="8" width="12" height="12" fill="{C['cyan']}"/><rect x="84" y="8" width="12" height="12" fill="{C['think']}"/>
  <rect x="0" y="76" width="12" height="12" fill="{C['measure']}"/><rect x="84" y="76" width="12" height="12" fill="{C['create']}"/>'''
    return f'<rect x="0" y="8" width="96" height="12" fill="{c}"/><rect x="0" y="76" width="96" height="12" fill="{c}"/><polygon points="{DIAG}" fill="{c}"/>'
def sym(x, y, s, c=None):
    return f'<g transform="translate({x},{y}) scale({s})">{sym0(c)}</g>'

def defs(uid):
    """reusable defs: grid pattern + glows; uid namespaces ids. returns (defs_str, pattern_rect_fn)"""
    d = f'''<defs>
  <pattern id="g{uid}" width="48" height="48" patternUnits="userSpaceOnUse">
    <rect width="48" height="48" fill="{C['midnight']}"/>
    <rect x="0" y="0" width="1.5" height="1.5" fill="{C['blue']}"/>
    <path d="M0 48V0H48" fill="none" stroke="{C['gray']}" stroke-width=".6" opacity=".1"/>
  </pattern>
  <radialGradient id="glow{uid}" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="{C['blue']}" stop-opacity=".28"/><stop offset="100%" stop-color="{C['blue']}" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="glowc{uid}" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="{C['cyan']}" stop-opacity=".18"/><stop offset="100%" stop-color="{C['cyan']}" stop-opacity="0"/>
  </radialGradient>
</defs>'''
    return d
def bg(uid, w_, h_, extra=""):
    return f'{defs(uid)}<rect width="{w_}" height="{h_}" fill="url(#g{uid})"/>{extra}'

def wordmark(x, y, s, tc=None, dc=None, align="start"):
    """ZHUBAO + rule + 朱宝 block; anchor x,y = center; s scales 96-unit design (font base 58)"""
    tc = tc or C['white']; dc = dc or C['gray']
    return f'''<g transform="translate({x},{y}) scale({s})" text-anchor="middle">
  <text x="0" y="0" {INT}font-weight="900" font-size="58" letter-spacing="12" fill="{tc}">ZHUBAO</text>
  <line x1="-122" y1="26" x2="-44" y2="26" stroke="{dc}" stroke-width="2"/>
  <text x="0" y="35" {CJK}font-weight="700" font-size="27" letter-spacing="7" fill="{dc}">朱宝</text>
  <line x1="44" y1="26" x2="122" y2="26" stroke="{dc}" stroke-width="2"/></g>'''

def corner_nodes(x, y, s=1):
    o = ""
    for i, col in enumerate(["#38BDF8", "#FBBF24", "#34D399", "#FB7185"]):
        o += f'<rect x="{x + i * (16 * s)}" y="{y}" width="{12 * s}" height="{4 * s}" fill="{col}"/>'
    return o

DIRS = [("BUILD", "构建系统", "AI · Agent · Skills", "#38BDF8"),
        ("THINK", "工程知识", "知识工程 · 投资研究", "#FBBF24"),
        ("MEASURE", "量化生活", "健康 · 跑步 · 骑行", "#34D399"),
        ("CREATE", "创造作品", "数字产品 · 视觉创作", "#FB7185")]

def hairline(w_, h_, y=None):
    y = y or h_ - 6
    seg = w_ / 4
    cols = ["#38BDF8", "#FBBF24", "#34D399", "#FB7185"]
    return "".join(f'<rect x="{seg * i}" y="{y}" width="{seg - w_ * 0.012}" height="4" fill="{col}" opacity=".85"/>' for i, col in enumerate(cols))

def stacked_chips(x, y, s=1.0):
    o = ""
    for i, (en, cn, sub, col) in enumerate(DIRS):
        yy = y + i * 62 * s
        o += f'''<g transform="translate({x},{yy}) scale({s})">
  <rect x="0" y="0" width="16" height="16" fill="{col}"/>
  <text x="30" y="13" {INT}font-weight="800" font-size="17" letter-spacing="2.5" fill="{C['white']}">{en}</text>
  <text x="30" y="39" {CJK}font-size="14" fill="{C['gray']}">{cn} · {sub}</text></g>'''
    return o

def chips(x, y, s=1.0, gap=236, zh=True):
    out = ""
    for i, (en, cn, sub, col) in enumerate(DIRS):
        cx = x + i * gap * s
        out += f'''<g transform="translate({cx},{y}) scale({s})">
  <rect x="0" y="0" width="14" height="14" fill="{col}"/>
  <text x="26" y="12" {INT}font-weight="800" font-size="16" letter-spacing="2" fill="{C['white']}">{en}</text>
  <text x="26" y="38" {CJK}font-size="14" fill="{C['gray']}">{cn}</text></g>'''
    return out
