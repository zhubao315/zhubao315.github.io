#!/usr/bin/env python3
"""Build the ZHUBAO Z-Grid logo family as native vector SVG (backup set).

V2.2: the primary public/brand/ assets are raster slices of the approved
identity board (see scripts/slice-logo.mjs). This script keeps a hand-built
vector edition in `public/brand/vector/` for print, docs and as a scalable
fallback. Wordmark is converted from Manrope 800 to SVG paths.

Geometry (unit u = 50): two 50-high gradient bars with 45° bevelled ends, a
58-wide white diagonal beneath them connecting TR→BL, and four 52-unit square
nodes in the direction colours (BUILD TL, THINK TR, MEASURE BL, CREATE BR).
"""
from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

ROOT = Path(__file__).resolve().parent.parent
BRAND = ROOT / "public" / "brand" / "vector"
FONT = ROOT / "node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2"

CANVAS = "#07111F"
NAVY = "#0B1D33"
ARCTIC = "#F7FAFF"
BUILD = "#38BDF8"
THINK = "#FBBF24"
MEASURE = "#34D399"
CREATE = "#FB7185"
MUTED = "#667085"
MUTED_LIGHT = "#94A3B8"

MARK_W = 292
MARK_H = 244


def mark_defs(pid: str, white: bool = False) -> str:
    if white:
        return f'''<defs>
  <linearGradient id="{pid}-t" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#F7FAFF"/><stop offset="1" stop-color="#C9D6E4"/>
  </linearGradient>
  <linearGradient id="{pid}-b" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#DFE8F3"/><stop offset="1" stop-color="#B7C6DA"/>
  </linearGradient>
</defs>'''
    return f'''<defs>
  <linearGradient id="{pid}-t" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#2B73F6"/><stop offset="1" stop-color="#86BDFD"/>
  </linearGradient>
  <linearGradient id="{pid}-d" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#FFFFFF"/><stop offset="1" stop-color="#DDE9F7"/>
  </linearGradient>
  <linearGradient id="{pid}-b" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#2563EB"/><stop offset=".7" stop-color="#1E6AF7"/><stop offset="1" stop-color="#0F3A8C"/>
  </linearGradient>
  <linearGradient id="{pid}-s" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#0B3358" stop-opacity=".85"/><stop offset="1" stop-color="#0B3358" stop-opacity="0"/>
  </linearGradient>
</defs>'''


def mark_body(pid: str, white: bool = False) -> str:
    diag_fill = "#FFFFFF" if white else f"url(#{pid}-d)"
    node_fills = (ARCTIC, ARCTIC, ARCTIC, ARCTIC) if white else (BUILD, THINK, MEASURE, CREATE)
    shadow = "" if white else f'  <polygon points="233,52 276,52 276,110 192,194 91,194" fill="url(#{pid}-s)"/>\n'
    nodes = "\n".join(
        f'  <rect x="{x}" y="{y}" width="52" height="52" rx="3" fill="{c}"/>'
        for (x, y), c in zip([(1, 1), (231, 1), (1, 191), (231, 191)], node_fills)
    )
    return f'''  <polygon points="227,0 285,0 41,244 -17,244" fill="{diag_fill}"/>
{shadow}  <polygon points="0,0 182,0 232,50 0,50" fill="url(#{pid}-t)"/>
  <polygon points="120,194 238,194 238,244 70,244" fill="url(#{pid}-b)"/>
{nodes}'''


def mark_svg_content(pid: str, x: float, y: float, scale: float, white: bool = False) -> str:
    return f'{mark_defs(pid, white)}\n<g transform="translate({x} {y}) scale({scale})">\n{mark_body(pid, white)}\n</g>'


def wordmark_group(text, size, weight, fill, baseline, x0):
    font = TTFont(str(FONT))
    font = instantiateVariableFont(font, {"wght": weight})
    cmap = font.getBestCmap()
    glyph_set = font.getGlyphSet()
    upm = font["head"].unitsPerEm
    scale = size / upm
    x = 0.0
    tracking = size * 0.06
    parts = []
    for char in text:
        pen = SVGPathPen(glyph_set)
        glyph_set[cmap[ord(char)]].draw(pen)
        commands = pen.getCommands()
        if commands:
            parts.append(
                f'<path transform="translate({x0 + x:.2f} {baseline}) scale({scale:.6f} -{scale:.6f})" fill="{fill}" d="{commands}"/>'
            )
        x += glyph_set[cmap[ord(char)]].width * scale + tracking
    return "".join(parts), x - tracking


def write(name, body, width, height):
    BRAND.mkdir(parents=True, exist_ok=True)
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" '
        f'role="img" aria-label="ZHUBAO">\n{body}\n</svg>\n'
    )
    (BRAND / name).write_text(svg, encoding="utf-8")


write("zhubao-symbol.svg", mark_svg_content("s", 0, 0, 1), MARK_W, MARK_H)
write("zhubao-white.svg", mark_svg_content("w", 0, 0, 1, white=True), MARK_W, MARK_H)
write(
    "zhubao-mono.svg",
    f'''<g fill="currentColor">
  <polygon points="227,0 285,0 41,244 -17,244"/>
  <polygon points="0,0 182,0 232,50 0,50"/>
  <polygon points="120,194 238,194 238,244 70,244"/>
  <rect x="1" y="1" width="52" height="52" rx="3"/>
  <rect x="231" y="1" width="52" height="52" rx="3"/>
  <rect x="1" y="191" width="52" height="52" rx="3"/>
  <rect x="231" y="191" width="52" height="52" rx="3"/>
</g>''',
    MARK_W,
    MARK_H,
)

mark = mark_svg_content("h", 0, 14, 60 / MARK_H)
mark_w = MARK_W * 60 / MARK_H
paths, word_width = wordmark_group("ZHUBAO", 34, 800, NAVY, 46, mark_w + 26)
horizontal_width = int(mark_w + 26 + word_width + 4)
write(
    "zhubao-horizontal.svg",
    f'''{mark}
{paths}
  <text x="{mark_w + 28:.0f}" y="72" font-family="Noto Sans CJK SC, Source Han Sans SC, PingFang SC, sans-serif" font-size="13" letter-spacing="8" fill="{MUTED}">朱宝</text>''',
    horizontal_width,
    88,
)
paths_inv, _ = wordmark_group("ZHUBAO", 34, 800, ARCTIC, 46, mark_w + 26)
write(
    "zhubao-horizontal-inverse.svg",
    f'''{mark}
{paths_inv}
  <text x="{mark_w + 28:.0f}" y="72" font-family="Noto Sans CJK SC, Source Han Sans SC, PingFang SC, sans-serif" font-size="13" letter-spacing="8" fill="{MUTED_LIGHT}">朱宝</text>''',
    horizontal_width,
    88,
)

st_scale = 72 / MARK_H
st_mark_w = MARK_W * st_scale
stack_w = max(240, int(st_mark_w + 40))
cx = stack_w / 2
_, st_word_w = wordmark_group("ZHUBAO", 30, 800, NAVY, 148, 0)
paths_stacked, _ = wordmark_group("ZHUBAO", 30, 800, NAVY, 148, cx - st_word_w / 2)
write(
    "zhubao-stacked.svg",
    f'''{mark_svg_content("k", cx - st_mark_w / 2, 4, st_scale)}
{paths_stacked}
  <text x="{cx:.0f}" y="178" text-anchor="middle" font-family="Noto Sans CJK SC, Source Han Sans SC, PingFang SC, sans-serif" font-size="12" letter-spacing="6" fill="{MUTED}">朱宝</text>''',
    stack_w,
    196,
)

print(f"Built vector logo family in {BRAND}")
