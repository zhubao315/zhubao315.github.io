#!/usr/bin/env python3
# ZHUBAO VI generator: tokens, palette board, direction icons, patterns
import os, subprocess
B = "/oc/zhubao-brand"
C = dict(midnight="#07111F", navy="#0B1D33", blue="#2563EB", cyan="#38BDF8",
         white="#F7FAFF", gray="#94A3B8", build="#38BDF8", think="#FBBF24",
         measure="#34D399", create="#FB7185")
INK = "#0B1D33"; PAPER = "#F7FAFF"
def w(p, s):
    p = os.path.join(B, p); os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, "w", encoding="utf-8").write(s)
def png(src, dst, wp): subprocess.run(["rsvg-convert", "-w", str(wp), src, "-o", dst], check=True)
def svg(wv, hv, body, extra=""):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {wv} {hv}" {extra}>\n{body}\n</svg>'

# ---------- 1. design tokens ----------
tokens = """:root {
  /* ZHUBAO · Midnight Signal · Design Tokens v1.0.0 */
  /* ---- brand primary ---- */
  --zb-midnight: #07111F;      /* Midnight Black — 主品牌背景 */
  --zb-navy: #0B1D33;          /* Deep Navy — 次级背景/卡片 */
  --zb-blue: #2563EB;          /* Electric Blue — 技术强调/主操作 */
  --zb-cyan: #38BDF8;          /* Signal Cyan — 信息强调 */
  /* ---- neutrals ---- */
  --zb-white: #F7FAFF;         /* Arctic White — 阅读场景背景 */
  --zb-gray: #94A3B8;          /* Cool Gray — 次要文本/线条 */
  /* ---- four directions ---- */
  --zb-build: #38BDF8;         /* BUILD   构建系统 */
  --zb-think: #FBBF24;         /* THINK   工程知识 */
  --zb-measure: #34D399;       /* MEASURE 量化生活 */
  --zb-create: #FB7185;        /* CREATE  创造作品 */
  /* ---- semantic (dark theme default) ---- */
  --zb-bg: var(--zb-midnight);
  --zb-surface: var(--zb-navy);
  --zb-text: var(--zb-white);
  --zb-text-secondary: var(--zb-gray);
  --zb-border: rgba(148, 163, 184, 0.24);
  --zb-accent: var(--zb-blue);
  /* ---- typography ---- */
  --zb-font-display: "Inter", "Noto Sans CJK SC", system-ui, sans-serif;
  --zb-font-body: "Inter", "Noto Sans CJK SC", system-ui, sans-serif;
  --zb-font-serif: "Instrument Serif", Georgia, serif;
  --zb-font-mono: "JetBrains Mono", "Noto Sans Mono", ui-monospace, monospace;
  --zb-fs-display-xl: clamp(56px, 8vw, 96px);
  --zb-fs-display-l: clamp(44px, 6vw, 72px);
  --zb-fs-h1: clamp(32px, 4.5vw, 56px);
  --zb-fs-h2: clamp(26px, 3.5vw, 40px);
  --zb-fs-h3: 28px;
  --zb-fs-h4: 22px;
  --zb-fs-h5: 18px;
  --zb-fs-h6: 16px;
  --zb-fs-body-l: 20px;
  --zb-fs-body: 17px;
  --zb-fs-body-s: 15px;
  --zb-fs-caption: 13px;
  --zb-fs-label: 12px;
  --zb-fs-data: clamp(40px, 5vw, 64px);
  --zb-lh-tight: 1.1; --zb-lh-snug: 1.3; --zb-lh-body: 1.65;
  --zb-ls-display: 0.14em; --zb-ls-label: 0.08em;
  --zb-fw-display: 900; --zb-fw-heading: 700; --zb-fw-body: 400;
  /* ---- spacing (4px base) ---- */
  --zb-sp-1: 4px; --zb-sp-2: 8px; --zb-sp-3: 12px; --zb-sp-4: 16px;
  --zb-sp-6: 24px; --zb-sp-8: 32px; --zb-sp-12: 48px; --zb-sp-16: 64px;
  --zb-sp-24: 96px; --zb-sp-32: 128px;
  /* ---- radii ---- */
  --zb-r-sm: 6px; --zb-r-md: 10px; --zb-r-lg: 16px; --zb-r-xl: 24px; --zb-r-full: 999px;
  /* ---- borders ---- */
  --zb-bw-1: 1px; --zb-bw-2: 2px;
  /* ---- elevation ---- */
  --zb-shadow-sm: 0 1px 2px rgba(2, 8, 20, 0.5);
  --zb-shadow-md: 0 4px 16px rgba(2, 8, 20, 0.55);
  --zb-shadow-lg: 0 12px 40px rgba(2, 8, 20, 0.65);
  /* ---- motion ---- */
  --zb-ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --zb-ease-emph: cubic-bezier(0.34, 1.2, 0.64, 1);
  --zb-dur-1: 120ms; --zb-dur-2: 220ms; --zb-dur-3: 360ms; --zb-dur-4: 640ms;
  /* ---- layout ---- */
  --zb-grid-cols: 12; --zb-grid-gutter: 24px; --zb-container: 1200px;
}
@media (prefers-color-scheme: light) {
  :root[data-theme="auto"] {
    --zb-bg: var(--zb-white); --zb-surface: #EDF3FB; --zb-text: var(--zb-midnight);
    --zb-border: rgba(11, 29, 51, 0.16);
  }
}
"""
w("02-VI/design-tokens/zhubao-tokens.css", tokens)

# ---------- 2. palette board ----------
def swatch(x, y, hexv, name, zh, sz=88, txt="#F7FAFF", sub="#94A3B8"):
    return f'''<g>
    <rect x="{x}" y="{y}" width="{sz}" height="{sz}" rx="10" fill="{hexv}" stroke="rgba(148,163,184,.35)" stroke-width="1"/>
    <text x="{x}" y="{y+sz+26}" font-family="Inter" font-weight="700" font-size="15" fill="#F7FAFF">{name}</text>
    <text x="{x}" y="{y+sz+48}" font-family="Inter" font-size="14" fill="#94A3B8">{hexv}</text>
    <text x="{x}" y="{y+sz+70}" font-family="Noto Sans CJK SC" font-size="14" fill="#94A3B8">{zh}</text>
  </g>'''
prim = [(hex(n),) for n in []]
b = f'<rect width="1680" height="920" fill="{C["midnight"]}"/>'
b += '''<text x="64" y="86" font-family="Inter" font-weight="900" font-size="34" letter-spacing="2" fill="#F7FAFF">ZHUBAO COLOR SYSTEM</text>
  <text x="64" y="122" font-family="Noto Sans CJK SC" font-size="18" fill="#94A3B8">色彩体系 · Midnight Signal</text>
  <rect x="64" y="146" width="56" height="5" fill="#2563EB"/>'''
labels = [("PRIMARY", "主品牌色", 64), ("NEUTRAL", "辅助色", 640), ("DIRECTION", "四方向识别色（节点）", 1040)]
for t, z, x in labels:
    b += f'<text x="{x}" y="230" font-family="Inter" font-weight="700" font-size="16" letter-spacing="3" fill="#94A3B8">{t} · {z}</text>'
px = [("#07111F", "Midnight", "深空蓝黑"), ("#0B1D33", "Deep Navy", "深海军蓝"), ("#2563EB", "Electric Blue", "电光蓝"), ("#38BDF8", "Signal Cyan", "信号青")]
for i, (h, n, z) in enumerate(px):
    b += swatch(64 + i * 130, 270, h, n, z, txt="#F7FAFF" if h not in ("#07111F",) else "#94A3B8")
b += f'<rect x="64" y="430" width="500" height="1.5" fill="#94A3B8" opacity=".25"/>'
for i, (h, n, z) in enumerate([("#F7FAFF", "Arctic White", "极地冷白"), ("#94A3B8", "Cool Gray", "冷灰")]):
    b += swatch(640 + i * 130, 270, h, n, z, txt="#0B1D33", sub="#475569")
dirs = [("#38BDF8", "BUILD", "构建系统"), ("#FBBF24", "THINK", "工程知识"), ("#34D399", "MEASURE", "量化生活"), ("#FB7185", "CREATE", "创造作品")]
for i, (h, n, z) in enumerate(dirs):
    b += swatch(1040 + i * 130, 270, h, n, z, txt="#0B1D33", sub="#475569")
b += f'''<rect x="64" y="600" width="1552" height="1.5" fill="#94A3B8" opacity=".25"/>
  <text x="64" y="660" font-family="Noto Sans CJK SC" font-weight="700" font-size="18" fill="#F7FAFF">配色纪律</text>
  <text x="64" y="696" font-family="Noto Sans CJK SC" font-size="16" fill="#94A3B8">主品牌用深空蓝黑 · 阅读场景用极地冷白 · 技术强调用电光蓝与信号青 · 四方向各用专属识别色</text>
  <text x="64" y="728" font-family="Noto Sans CJK SC" font-size="16" fill="#94A3B8">禁止：米白 / 奶油色 / 暖纸色 · 禁止四方向色平均铺满 · 禁止将渐变作为 Logo 必要组成</text>
  <rect x="64" y="770" width="72" height="7" fill="#38BDF8"/><rect x="64" y="785" width="72" height="7" fill="#FBBF24"/><rect x="64" y="800" width="72" height="7" fill="#34D399"/><rect x="64" y="815" width="72" height="7" fill="#FB7185"/>
  <text x="160" y="782" font-family="Noto Sans CJK SC" font-size="15" fill="#94A3B8">四方向识别色仅用于对应内容域，不做装饰性平铺</text>
  <text x="160" y="812" font-family="Inter" font-size="14" fill="#94A3B8">Direction colors mark content domains, never decorative fills</text>'''
w("02-VI/colors/zhubao-palette-board.svg", svg(1680, 920, b))
png("02-VI/colors/zhubao-palette-board.svg", "09-EXPORTS/png/zhubao-palette-board.png", 1680)

# ---------- 3. direction icons (24 grid, stroke 1.5) ----------
def icon_build(c): return f'''<g fill="none" stroke="{c}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>
    <path d="M6.5 10v4.5h4.5"/><path d="M14 6.5h3.5V14"/></g>'''
def icon_think(c): return f'''<g fill="none" stroke="{c}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="5.5" cy="6" r="2.5"/><circle cx="18.5" cy="6" r="2.5"/><circle cx="12" cy="18.5" r="2.5"/>
    <path d="M7.7 7.4l3 8.5M16.3 7.4l-3 8.5M8 6h8"/></g>'''
def icon_measure(c): return f'''<g fill="none" stroke="{c}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 3v18h18"/><path d="M6 16l4-5 3.5 3L20 6"/><path d="M17 6h3v3"/></g>'''
def icon_create(c): return f'''<g fill="none" stroke="{c}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="8"/><rect x="7" y="7" width="10" height="10" transform="rotate(45 12 12)"/></g>'''
ICONS = dict(build=(icon_build, "构建系统"), think=(icon_think, "工程知识"),
             measure=(icon_measure, "量化生活"), create=(icon_create, "创造作品"))
for d, (fn, _) in ICONS.items():
    w(f"02-VI/icons/{d}/zhubao-icon-{d}-24.svg", svg(24, 24, fn(C[d]), 'width="24" height="24"'))
    w(f"02-VI/icons/{d}/zhubao-icon-{d}-24-mono.svg", svg(24, 24, fn(INK), 'width="24" height="24"'))
    w(f"02-VI/icons/{d}/zhubao-icon-{d}-24-inverse.svg", svg(24, 24, fn(C['white']), 'width="24" height="24"'))
    w(f"02-VI/icons/{d}/zhubao-icon-{d}-48.svg", f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">{fn(C[d])}</svg>')
    png(f"02-VI/icons/{d}/zhubao-icon-{d}-24.svg", f"09-EXPORTS/png/zhubao-icon-{d}-48.png", 48)
    # badge
    badge = f'''<rect width="96" height="96" rx="22" fill="{C[d]}"/><g transform="translate(24,24) scale(2)">{fn(("#0B1D33"))}</g>'''
    w(f"02-VI/icons/{d}/zhubao-badge-{d}.svg", svg(96, 96, badge))
    png(f"02-VI/icons/{d}/zhubao-badge-{d}.svg", f"09-EXPORTS/png/zhubao-badge-{d}.png", 96)
    # label chip
    zh = {"build": "构建系统", "think": "工程知识", "measure": "量化生活", "create": "创造作品"}[d]
    en = {"build": "BUILD", "think": "THINK", "measure": "MEASURE", "create": "CREATE"}[d]
    chip = f'''<rect width="200" height="48" rx="24" fill="none" stroke="{C[d]}" stroke-width="2"/>
  <circle cx="28" cy="24" r="6" fill="{C[d]}"/>
  <text x="46" y="30" font-family="Inter" font-weight="800" font-size="17" letter-spacing="2" fill="{C['white']}">{en}</text>
  <text x="120" y="30" font-family="Noto Sans CJK SC" font-size="14" fill="{C['gray']}">{zh}</text>'''
    w(f"02-VI/icons/{d}/zhubao-label-{d}.svg", svg(200, 48, f'<rect width="200" height="48" rx="24" fill="{C["navy"]}"/>' + chip))
# divider with 4 nodes
div = f'''<path d="M0 8h1140" stroke="{C['gray']}" stroke-width="1.5" opacity=".4"/>
  <rect x="1150" y="2" width="12" height="12" fill="{C['build']}"/><rect x="1170" y="2" width="12" height="12" fill="{C['think']}"/>
  <rect x="1190" y="2" width="12" height="12" fill="{C['measure']}"/><rect x="1210" y="2" width="12" height="12" fill="{C['create']}"/>'''
w("02-VI/icons/zhubao-divider.svg", svg(1224, 16, div))

# ---------- 4. patterns (tileable) ----------
# 8x8 grid 96px tile
g = f'''<rect width="96" height="96" fill="{C['midnight']}"/>'''
for i in range(9):
    op = 0.28 if i in (0,) else 0.12
    g += f'<line x1="{i*12}" y1="0" x2="{i*12}" y2="96" stroke="{C["gray"]}" stroke-width="0.5" opacity="{op}"/><line x1="0" y1="{i*12}" x2="96" y2="{i*12}" stroke="{C["gray"]}" stroke-width="0.5" opacity="{op}"/>'
g += '<rect x="0" y="0" width="2.4" height="2.4" fill="#2563EB"/><rect x="93.6" y="0" width="2.4" height="2.4" fill="#2563EB"/><rect x="0" y="93.6" width="2.4" height="2.4" fill="#2563EB"/><rect x="93.6" y="93.6" width="2.4" height="2.4" fill="#2563EB"/>'
w("02-VI/patterns/zhubao-pattern-grid8-dark.svg", svg(96, 96, g))
gl = g.replace(C['midnight'], C['white']).replace('"#2563EB"', '"#2563EB"')
w("02-VI/patterns/zhubao-pattern-grid8-light.svg", svg(96, 96, gl))
# Z zigzag path tile (96x96, tiles horizontally)
zz = f'<path d="M0 72h60L20 24h60" fill="none" stroke="#2563EB" stroke-width="5" stroke-linecap="square"/>'
w("02-VI/patterns/zhubao-pattern-zpath-dark.svg", svg(96, 96, f'<rect width="96" height="96" fill="{C["midnight"]}"/>{zz}'))
w("02-VI/patterns/zhubao-pattern-zpath-light.svg", svg(96, 96, f'<rect width="96" height="96" fill="{C["white"]}"/>{zz}'))
w("02-VI/patterns/zhubao-pattern-zpath-transparent.svg", svg(96, 96, zz))
# 45 degree lines tile
dg = f'<path d="M-12 12 L12 -12 M0 96 L96 0 M84 108 L108 84" stroke="#38BDF8" stroke-width="1" opacity=".35"/>'
w("02-VI/patterns/zhubao-pattern-diag-dark.svg", svg(96, 96, f'<rect width="96" height="96" fill="{C["midnight"]}"/>{dg}'))
w("02-VI/patterns/zhubao-pattern-diag-light.svg", svg(96, 96, f'<rect width="96" height="96" fill="{C["white"]}"/>{dg.replace("#38BDF8", "#2563EB")}'))
# node-link tile
nl = '''<circle cx="20" cy="24" r="3.5" fill="#38BDF8"/><circle cx="76" cy="20" r="3.5" fill="#FBBF24"/>
  <circle cx="28" cy="76" r="3.5" fill="#34D399"/><circle cx="72" cy="68" r="3.5" fill="#FB7185"/>
  <path d="M20 24h4.5v40H28M76 20v4.5H32V76M72 68h-8v-8H24" stroke="#94A3B8" stroke-width="1" opacity=".4" fill="none"/>'''
w("02-VI/patterns/zhubao-pattern-nodes-dark.svg", svg(96, 96, f'<rect width="96" height="96" fill="{C["navy"]}"/>{nl}'))
w("02-VI/patterns/zhubao-pattern-nodes-light.svg", svg(96, 96, f'<rect width="96" height="96" fill="{C["white"]}"/>{nl}'))
print("vi-done")
