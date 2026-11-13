#!/usr/bin/env python3
"""Build the ZHUBAO Z-Grid logo family (Midnight Signal edition) as native SVG + PNG derivatives.

The wordmark is converted from the self-hosted Manrope variable font into SVG
paths so the downloaded brand files do not depend on a font being installed.
Chinese lockup lines use the system CJK stack.

Midnight Signal rules (docs/brand-guidelines-v2.md §3):
- The mark is a navy chip with an Arctic White Z path.
- Standard nodes: BUILD cyan (top-left) + THINK gold (top-right) are the memory
  points; the other two stay Arctic White. The four-colour edition is reserved
  for the social avatar where the mark renders large.
- No warm colours, no gradients, no effects.
"""
import subprocess
from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
BRAND = PUBLIC / "brand"
FONT = ROOT / "node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2"

CANVAS = "#07111F"
NAVY = "#0B1D33"
SURFACE = "#13263D"
ARCTIC = "#F7FAFF"
BUILD = "#38BDF8"
THINK = "#FBBF24"
MEASURE = "#34D399"
CREATE = "#FB7185"
MUTED = "#667085"
MUTED_LIGHT = "#94A3B8"
Z_PATH = "M15 17H49L15 47H49"


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


def symbol_group(x, y, scale, nodes="standard", chip=NAVY, grid=True):
    """nodes: 'standard' (cyan + gold memory points) or 'four' (direction edition)."""
    n_build, n_think, n_measure, n_create = ARCTIC, ARCTIC, ARCTIC, ARCTIC
    if nodes == "standard":
        n_build, n_think = BUILD, THINK
    elif nodes == "four":
        n_build, n_think, n_measure, n_create = BUILD, THINK, MEASURE, CREATE
    hairline = f'''  <g stroke="{ARCTIC}" stroke-width="1" opacity=".1">
    <path d="M16 0v64M32 0v64M48 0v64M0 16h64M0 32h64M0 48h64"/>
  </g>\n''' if grid else ""
    return f'''<g transform="translate({x} {y}) scale({scale})">
  <rect width="64" height="64" rx="12" fill="{chip}"/>
{hairline}  <path d="{Z_PATH}" fill="none" stroke="{ARCTIC}" stroke-width="7" stroke-linejoin="miter"/>
  <rect x="11" y="13" width="8" height="8" fill="{n_build}"/>
  <rect x="45" y="13" width="8" height="8" fill="{n_think}"/>
  <rect x="11" y="43" width="8" height="8" fill="{n_measure}"/>
  <rect x="45" y="43" width="8" height="8" fill="{n_create}"/>
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


# 1. Standalone symbol (standard nodes)
write("zhubao-symbol.svg", symbol_group(0, 0, 1), 64, 64)

# 1b. Monochrome symbol (currentColor)
write(
    "zhubao-symbol-mono.svg",
    f'''<path d="{Z_PATH}" fill="none" stroke="currentColor" stroke-width="7" stroke-linejoin="miter"/>
  <rect x="11" y="13" width="8" height="8" fill="currentColor"/>
  <rect x="45" y="13" width="8" height="8" fill="currentColor"/>
  <rect x="11" y="43" width="8" height="8" fill="currentColor"/>
  <rect x="45" y="43" width="8" height="8" fill="currentColor"/>''',
    64,
    64,
)

# 2. Horizontal lockup — for light fields (wordmark in deep navy)
mark = symbol_group(0, 0, 1)
paths, word_width = wordmark_svg("ZHUBAO", 38, 800, NAVY, 46, 84)
horizontal_width = 84 + word_width + 8
horizontal = f'''{mark}
  <g fill="{NAVY}">{paths}</g>
  <text x="85" y="62" font-family="Noto Sans CJK SC, Source Han Sans SC, PingFang SC, sans-serif" font-size="10.5" letter-spacing="2.2" fill="{MUTED}">朱宝 / PERSONAL BRAND</text>'''
write("zhubao-horizontal.svg", horizontal, horizontal_width, 72)

# 3. Horizontal inverse — for dark fields (wordmark in arctic white)
paths_inv, _ = wordmark_svg("ZHUBAO", 38, 800, ARCTIC, 46, 84)
horizontal_inv = f'''{symbol_group(0, 0, 1, chip=SURFACE)}
  <g fill="{ARCTIC}">{paths_inv}</g>
  <text x="85" y="62" font-family="Noto Sans CJK SC, Source Han Sans SC, PingFang SC, sans-serif" font-size="10.5" letter-spacing="2.2" fill="{MUTED_LIGHT}">朱宝 / PERSONAL BRAND</text>'''
write("zhubao-horizontal-inverse.svg", horizontal_inv, horizontal_width, 72)

# 4. Stacked lockup
stack_w = max(240, word_width + 16)
stack_center = stack_w / 2
paths_stacked, _ = wordmark_svg("ZHUBAO", 34, 800, NAVY, 116, stack_center - word_width / 2)
stacked = f'''{symbol_group(stack_center - 32, 0, 1)}
  <g fill="{NAVY}">{paths_stacked}</g>
  <text x="{stack_center:.2f}" y="138" text-anchor="middle" font-family="Noto Sans CJK SC, Source Han Sans SC, PingFang SC, sans-serif" font-size="11" letter-spacing="4" fill="{MUTED}">朱宝 / PERSONAL BRAND</text>'''
write("zhubao-stacked.svg", stacked, stack_w, 152)

# 5. Stacked inverse
paths_stacked_inv, _ = wordmark_svg("ZHUBAO", 34, 800, ARCTIC, 116, stack_center - word_width / 2)
stacked_inv = f'''{symbol_group(stack_center - 32, 0, 1, chip=SURFACE)}
  <g fill="{ARCTIC}">{paths_stacked_inv}</g>
  <text x="{stack_center:.2f}" y="138" text-anchor="middle" font-family="Noto Sans CJK SC, Source Han Sans SC, PingFang SC, sans-serif" font-size="11" letter-spacing="4" fill="{MUTED_LIGHT}">朱宝 / PERSONAL BRAND</text>'''
write("zhubao-stacked-inverse.svg", stacked_inv, stack_w, 152)

# 6. Favicon / app icon: simplified, no grid, standard memory nodes
favicon = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="{NAVY}"/>
  <path d="{Z_PATH}" fill="none" stroke="{ARCTIC}" stroke-width="7" stroke-linejoin="miter"/>
  <rect x="11" y="13" width="8" height="8" fill="{BUILD}"/>
  <rect x="45" y="13" width="8" height="8" fill="{THINK}"/>
  <rect x="11" y="43" width="8" height="8" fill="{ARCTIC}"/>
  <rect x="45" y="43" width="8" height="8" fill="{ARCTIC}"/>
</svg>
'''
(PUBLIC / "favicon.svg").write_text(favicon, encoding="utf-8")

# Avatar: four-direction edition on the midnight canvas
avatar = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
  <rect width="1024" height="1024" fill="{CANVAS}"/>
  <g transform="translate(192 192) scale(10)">
    {symbol_group(0, 0, 1, nodes="four")}
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

print("Built Midnight Signal logo family + favicon/avatar PNGs")
