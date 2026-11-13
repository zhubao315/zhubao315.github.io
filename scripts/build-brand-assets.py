#!/usr/bin/env python3
"""Build the ZHUBAO Z-Grid logo family as native SVG + PNG derivatives.

The wordmark is converted from the self-hosted Manrope variable font into SVG
paths so the downloaded brand files do not depend on a font being installed.
Chinese lockup lines use the system CJK stack.
"""
import os
import subprocess
from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
BRAND = PUBLIC / "brand"
FONT = ROOT / "node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2"

NAVY = "#0B1D33"
PAPER = "#F7F3EA"
GOLD = "#FBBF24"


def wordmark_paths(text: str, size: float, weight: int = 800):
    font = TTFont(str(FONT))
    font = instantiateVariableFont(font, {"wght": weight})
    cmap = font.getBestCmap()
    glyph_set = font.getGlyphSet()
    upm = font["head"].unitsPerEm
    scale = size / upm
    x = 0.0
    paths = []
    tracking = -size * 0.018
    for char in text:
        glyph_name = cmap[ord(char)]
        glyph = glyph_set[glyph_name]
        pen = SVGPathPen(glyph_set)
        glyph.draw(pen)
        commands = pen.getCommands()
        if commands:
            paths.append((x, commands))
        x += glyph.width * scale + tracking
    return paths, x - tracking, scale


def wordmark_svg(text, size, weight, fill, baseline, x0, extra=""):
    paths, width, scale = wordmark_paths(text, size, weight)
    parts = []
    for x, commands in paths:
        parts.append(
            f'<path transform="translate({x0 + x:.2f} {baseline}) scale({scale:.6f} -{scale:.6f})" d="{commands}"/>'
        )
    return "".join(parts), width


def symbol_group(x, y, scale, inverse=False):
    bg = PAPER if inverse else NAVY
    fg = NAVY if inverse else PAPER
    return f'''<g transform="translate({x} {y}) scale({scale})">
  <rect width="64" height="64" rx="12" fill="{bg}"/>
  <g stroke="{fg}" stroke-width="1" opacity=".16">
    <path d="M16 0v64M32 0v64M48 0v64M0 16h64M0 32h64M0 48h64"/>
  </g>
  <path d="M15 17H49L15 47H49" fill="none" stroke="{fg}" stroke-width="7" stroke-linejoin="miter"/>
  <rect x="11" y="13" width="8" height="8" fill="{fg}"/>
  <rect x="45" y="13" width="8" height="8" fill="{GOLD}"/>
  <rect x="11" y="43" width="8" height="8" fill="{fg}"/>
  <rect x="45" y="43" width="8" height="8" fill="{fg}"/>
</g>'''


def write(name, body, width, height):
    BRAND.mkdir(parents=True, exist_ok=True)
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" '
        f'role="img" aria-label="ZHUBAO">{body}</svg>\n'
    )
    (BRAND / name).write_text(svg, encoding="utf-8")
    return BRAND / name


def png(svg_path, out_path, size, background=None):
    command = ["rsvg-convert", "-w", str(size), "-h", str(size), str(svg_path), "-o", str(out_path)]
    subprocess.run(command, check=True)
    if background:
        subprocess.run(["magick", str(out_path), "-background", background, "-alpha", "remove", "-alpha", "off", str(out_path)], check=True)


# 1. Standalone symbol
write(
    "zhubao-symbol.svg",
    symbol_group(0, 0, 1),
    64,
    64,
)

# 1b. Monochrome symbol (currentColor)
write(
    "zhubao-symbol-mono.svg",
    '''<path d="M15 17H49L15 47H49" fill="none" stroke="currentColor" stroke-width="7" stroke-linejoin="miter"/>
  <rect x="11" y="13" width="8" height="8" fill="currentColor"/>
  <rect x="45" y="13" width="8" height="8" fill="currentColor"/>
  <rect x="11" y="43" width="8" height="8" fill="currentColor"/>
  <rect x="45" y="43" width="8" height="8" fill="currentColor"/>''',
    64,
    64,
)

# 2. Horizontal lockup
mark = symbol_group(0, 0, 1)
paths, word_width = wordmark_svg("ZHUBAO", 38, 800, NAVY, 46, 84)
horizontal_width = 84 + word_width + 8
horizontal = f'''{mark}
  <g fill="{NAVY}">{paths}</g>
  <text x="85" y="62" font-family="Noto Sans CJK SC, Source Han Sans SC, PingFang SC, sans-serif" font-size="10.5" letter-spacing="2.2" fill="#5A697D">朱宝 / PERSONAL BRAND</text>'''
write("zhubao-horizontal.svg", horizontal, horizontal_width, 72)

# 3. Horizontal inverse
paths_inv, _ = wordmark_svg("ZHUBAO", 38, 800, PAPER, 46, 84)
horizontal_inv = f'''{symbol_group(0, 0, 1, inverse=True)}
  <g fill="{PAPER}">{paths_inv}</g>
  <text x="85" y="62" font-family="Noto Sans CJK SC, Source Han Sans SC, PingFang SC, sans-serif" font-size="10.5" letter-spacing="2.2" fill="#94A3B8">朱宝 / PERSONAL BRAND</text>'''
write("zhubao-horizontal-inverse.svg", horizontal_inv, horizontal_width, 72)

# 4. Stacked lockup
stack_w = max(240, word_width + 16)
stack_center = stack_w / 2
paths_stacked, _ = wordmark_svg("ZHUBAO", 34, 800, NAVY, 116, stack_center - word_width / 2)
stacked = f'''{symbol_group(stack_center - 32, 0, 1)}
  <g fill="{NAVY}">{paths_stacked}</g>
  <text x="{stack_center:.2f}" y="138" text-anchor="middle" font-family="Noto Sans CJK SC, Source Han Sans SC, PingFang SC, sans-serif" font-size="11" letter-spacing="4" fill="#5A697D">朱宝 / PERSONAL BRAND</text>'''
write("zhubao-stacked.svg", stacked, stack_w, 152)

# 5. Stacked inverse
paths_stacked_inv, _ = wordmark_svg("ZHUBAO", 34, 800, PAPER, 116, stack_center - word_width / 2)
stacked_inv = f'''{symbol_group(stack_center - 32, 0, 1, inverse=True)}
  <g fill="{PAPER}">{paths_stacked_inv}</g>
  <text x="{stack_center:.2f}" y="138" text-anchor="middle" font-family="Noto Sans CJK SC, Source Han Sans SC, PingFang SC, sans-serif" font-size="11" letter-spacing="4" fill="#94A3B8">朱宝 / PERSONAL BRAND</text>'''
write("zhubao-stacked-inverse.svg", stacked_inv, stack_w, 152)

# 6. Favicon / avatar: simplified, no grid
favicon = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="{NAVY}"/>
  <path d="M15 17H49L15 47H49" fill="none" stroke="{PAPER}" stroke-width="7" stroke-linejoin="miter"/>
  <rect x="11" y="13" width="8" height="8" fill="{PAPER}"/>
  <rect x="45" y="13" width="8" height="8" fill="{GOLD}"/>
  <rect x="11" y="43" width="8" height="8" fill="{PAPER}"/>
  <rect x="45" y="43" width="8" height="8" fill="{PAPER}"/>
</svg>
'''
(PUBLIC / "favicon.svg").write_text(favicon, encoding="utf-8")

avatar = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
  <rect width="1024" height="1024" fill="{PAPER}"/>
  <g transform="translate(192 192) scale(10)">
    <rect width="64" height="64" rx="12" fill="{NAVY}"/>
    <path d="M15 17H49L15 47H49" fill="none" stroke="{PAPER}" stroke-width="7" stroke-linejoin="miter"/>
    <rect x="11" y="13" width="8" height="8" fill="{PAPER}"/>
    <rect x="45" y="13" width="8" height="8" fill="{GOLD}"/>
    <rect x="11" y="43" width="8" height="8" fill="{PAPER}"/>
    <rect x="45" y="43" width="8" height="8" fill="{PAPER}"/>
  </g>
</svg>
'''
(BRAND / "zhubao-avatar.svg").write_text(avatar, encoding="utf-8")

# PNG derivatives
for size, name in [(32, "favicon-32.png"), (180, "apple-touch-icon.png"), (192, "icon-192.png"), (512, "icon-512.png")]:
    png(PUBLIC / "favicon.svg", PUBLIC / name, size)

png(BRAND / "zhubao-avatar.svg", BRAND / "zhubao-avatar-1024.png", 1024)
png(BRAND / "zhubao-symbol.svg", BRAND / "zhubao-symbol-512.png", 512)

# ICO container
png32 = (PUBLIC / "favicon-32.png").read_bytes()
ico = bytearray(22 + len(png32))
ico[0:4] = (0).to_bytes(2, "little") + (1).to_bytes(2, "little")
ico[4:6] = (1).to_bytes(2, "little")
ico[6] = 32
ico[7] = 32
ico[10:12] = (1).to_bytes(2, "little")
ico[12:14] = (32).to_bytes(2, "little")
ico[14:18] = len(png32).to_bytes(4, "little")
ico[18:22] = (22).to_bytes(4, "little")
ico[22:] = png32
(PUBLIC / "favicon.ico").write_bytes(bytes(ico))

print("Built Z-Grid logo family + favicon/avatar PNGs")
