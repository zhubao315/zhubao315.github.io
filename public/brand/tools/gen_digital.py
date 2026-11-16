#!/usr/bin/env python3
import sys; sys.path.insert(0, "/oc/zhubao-brand/tools")
from zb import *

def corner_nodes(x, y, s=1):
    o = ""
    for i, col in enumerate(["#38BDF8", "#FBBF24", "#34D399", "#FB7185"]):
        o += f'<rect x="{x + i * (16 * s)}" y="{y}" width="{12 * s}" height="{4 * s}" fill="{col}"/>'
    return o

def stacked_chips(x, y, s=1.0):
    o = ""
    for i, (en, cn, sub, col) in enumerate(DIRS):
        yy = y + i * 62 * s
        o += f'''<g transform="translate({x},{yy}) scale({s})">
  <rect x="0" y="0" width="16" height="16" fill="{col}"/>
  <text x="30" y="13" {INT}font-weight="800" font-size="17" letter-spacing="2.5" fill="{C['white']}">{en}</text>
  <text x="30" y="39" {CJK}font-size="14" fill="{C['gray']}">{cn} · {sub}</text></g>'''
    return o

def hairline(w_, h_, y=None):
    y = y or h_ - 6
    seg = w_ / 4
    cols = ["#38BDF8", "#FBBF24", "#34D399", "#FB7185"]
    o = ""
    for i, col in enumerate(cols):
        o += f'<rect x="{seg * i}" y="{y}" width="{seg - w_ * 0.012}" height="4" fill="{col}" opacity=".85"/>'
    return o

# ---------- 1. master avatar (square, circle-safe) ----------
b = bg("av", 1024, 1024) + f'''<circle cx="512" cy="512" r="420" fill="url(#glowav)"/>
  {sym(312, 282, 4.1667)}
  <text x="512" y="806" text-anchor="middle" {INT}font-weight="900" font-size="64" letter-spacing="14" fill="{C['white']}">ZHUBAO</text>
  <text x="518" y="860" text-anchor="middle" {CJK}font-weight="700" font-size="30" letter-spacing="10" fill="{C['gray']}">朱 宝</text>'''
w("03-DIGITAL/avatar/zhubao-avatar-master.svg", svg(1024, 1024, b, px=True))
for sz, p in [(400, "03-DIGITAL/github/zhubao-github-avatar-400.png"), (400, "03-DIGITAL/social/zhubao-x-avatar-400.png"), (200, "03-DIGITAL/avatar/zhubao-avatar-200.png")]:
    png("03-DIGITAL/avatar/zhubao-avatar-master.svg", p, sz)

# ---------- 2. GitHub profile banner 1584x396 ----------
b = bg("gh", 1584, 396) + f'''<ellipse cx="230" cy="198" rx="380" ry="320" fill="url(#glowgh)"/>
  {sym(100, 108, 2.0)}
  {wordmark(500, 200, 0.88)}
  <text x="520" y="318" text-anchor="middle" {INT}font-size="19" letter-spacing="1" fill="{C['body']}">Build Systems · Engineer Knowledge · Measure Life · Create Things</text>
  <text x="520" y="352" text-anchor="middle" {CJK}font-size="16" fill="{C['gray']}">构建系统 · 工程知识 · 量化生活 · 创造作品</text>
  {stacked_chips(1060, 112, 0.92)}
  {hairline(1584, 396)}'''
w("03-DIGITAL/github/zhubao-github-banner-1584x396.svg", svg(1584, 396, b, px=True))
png("03-DIGITAL/github/zhubao-github-banner-1584x396.svg", "03-DIGITAL/github/zhubao-github-banner-1584x396.png", 1584)

# ---------- 3. repo social preview 1280x640 ----------
b = bg("rp", 1280, 640) + f'''<ellipse cx="180" cy="320" rx="300" ry="300" fill="url(#glowrp)"/>
  {sym(96, 210, 2.25)}
  {wordmark(192, 540, 0.42)}
  <text x="420" y="232" {INT}font-weight="900" font-size="56" fill="{C['white']}">{'{'}项目名 · Project Title{'}'}</text>
  <text x="420" y="286" {CJK}font-size="21" fill="{C['body']}">一句话说明：这个仓库解决什么问题（≤ 40 字）</text>
  <g transform="translate(420,352)" {''} >
  <rect x="0" y="0" width="120" height="34" rx="6" fill="{C['navy']}" stroke="{C['blue']}" stroke-width="1.5"/>
  <text x="60" y="23" text-anchor="middle" {MON}font-size="15" fill="{C['cyan']}">BUILD</text>
  <rect x="136" y="0" width="120" height="34" rx="6" fill="{C['navy']}" stroke="#334155" stroke-width="1"/>
  <text x="196" y="23" text-anchor="middle" {MON}font-size="15" fill="{C['gray']}">zhubao315</text></g>
  <line x1="420" y1="540" x2="1184" y2="540" stroke="{C['gray']}" stroke-width="1" opacity=".3"/>
  <text x="420" y="580" {INT}font-size="16" letter-spacing="1" fill="{C['gray']}">github.com/zhubao315</text>
  {corner_nodes(1100, 566, 1.2)}'''
w("03-DIGITAL/github/zhubao-repo-social-preview-1280x640.svg", svg(1280, 640, b, px=True))
png("03-DIGITAL/github/zhubao-repo-social-preview-1280x640.svg", "03-DIGITAL/github/zhubao-repo-social-preview-1280x640.png", 1280)

# ---------- 4. README section header 1200x160 ----------
b = bg("sh", 1200, 160) + f'''{sym(56, 36, 0.9167)}
  <text x="168" y="92" {INT}font-weight="900" font-size="34" letter-spacing="6" fill="{C['white']}">{'{'}SECTION TITLE{'}'}</text>
  <text x="168" y="128" {CJK}font-size="16" fill="{C['gray']}">栏目标题 · 可编辑文字</text>
  <line x1="700" y1="80" x2="1120" y2="80" stroke="{C['gray']}" stroke-width="1" opacity=".35"/>
  {corner_nodes(1140, 74, 1.5)}'''
w("03-DIGITAL/github/zhubao-readme-section-header-1200x160.svg", svg(1200, 160, b, px=True))
png("03-DIGITAL/github/zhubao-readme-section-header-1200x160.svg", "03-DIGITAL/github/zhubao-readme-section-header-1200x160.png", 1200)

# ---------- 5. X header 1500x500 ----------
b = bg("xh", 1500, 500) + f'''<ellipse cx="260" cy="250" rx="400" ry="360" fill="url(#glowxh)"/>
  {sym(120, 130, 2.5)}
  {wordmark(560, 250, 0.95)}
  <text x="560" y="348" text-anchor="middle" {INT}font-size="20" letter-spacing="1" fill="{C['body']}">Builder · Researcher · Recorder</text>
  <text x="560" y="386" text-anchor="middle" {CJK}font-size="17" fill="{C['gray']}">在足够深的夜色里，稳定地发出自己的信号。</text>
  {stacked_chips(1040, 150, 0.9)}
  {hairline(1500, 500)}'''
w("03-DIGITAL/social/zhubao-x-header-1500x500.svg", svg(1500, 500, b, px=True))
png("03-DIGITAL/social/zhubao-x-header-1500x500.svg", "03-DIGITAL/social/zhubao-x-header-1500x500.png", 1500)

# ---------- 6. post template 1600x900 ----------
b = f'<rect width="1600" height="900" fill="{C["midnight"]}"/><rect width="1600" height="10" fill="{C["blue"]}"/>'
for i in range(4):
    b += f'<rect x="{1600 - 56 + i * 12}" y="0" width="10" height="10" fill="{["#38BDF8", "#FBBF24", "#34D399", "#FB7185"][i]}"/>'
b += f'''<text x="150" y="210" {INT}font-weight="900" font-size="120" fill="{C['blue']}">“</text>
  <text x="150" y="330" {CJK}font-weight="700" font-size="64" fill="{C['white']}">{'{'}观点金句 · 第 1 行{'}'}</text>
  <text x="150" y="420" {CJK}font-weight="700" font-size="64" fill="{C['white']}">{'{'}观点金句 · 第 2 行{'}'}</text>
  <line x1="150" y1="700" x2="1450" y2="700" stroke="{C['gray']}" stroke-width="1" opacity=".3"/>
  {sym(150, 760, 0.8333)}
  <text x="260" y="812" {INT}font-weight="800" font-size="26" letter-spacing="3" fill="{C['white']}">ZHUBAO · 朱宝</text>
  <text x="1450" y="812" text-anchor="end" {MON}font-size="20" fill="{C['gray']}">@zhubao315</text>'''
w("03-DIGITAL/social/zhubao-post-template-1600x900.svg", svg(1600, 900, b, px=True))
png("03-DIGITAL/social/zhubao-post-template-1600x900.svg", "03-DIGITAL/social/zhubao-post-template-1600x900.png", 1600)

# ---------- 7. OG image 1200x630 ----------
b = bg("og", 1200, 630) + f'''<ellipse cx="200" cy="315" rx="330" ry="330" fill="url(#glowog)"/>
  {sym(96, 190, 2.6)}
  {wordmark(420, 320, 0.72)}
  <text x="420" y="398" {CJK}font-size="19" fill="{C['body']}">构建系统 · 工程知识 · 量化生活 · 创造作品</text>
  <text x="420" y="430" {INT}font-size="16" letter-spacing="1" fill="{C['gray']}">Build Systems. Engineer Knowledge. Measure Life. Create Things.</text>
  {chips(420, 500, 0.88, gap=190)}
  {hairline(1200, 630, 624)}'''
w("03-DIGITAL/website/zhubao-og-image-1200x630.svg", svg(1200, 630, b, px=True))
png("03-DIGITAL/website/zhubao-og-image-1200x630.svg", "03-DIGITAL/website/zhubao-og-image-1200x630.png", 1200)

# ---------- 8. website hero background 2560x1440 ----------
b = f'''<defs>
  <pattern id="hg" width="96" height="96" patternUnits="userSpaceOnUse">
    <rect width="96" height="96" fill="{C['midnight']}"/>
    <rect x="0" y="0" width="2" height="2" fill="{C['blue']}"/>
    <path d="M0 96V0H96" fill="none" stroke="{C['gray']}" stroke-width=".8" opacity=".08"/>
  </pattern>
  <radialGradient id="hg1" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="{C['blue']}" stop-opacity=".22"/><stop offset="100%" stop-color="{C['blue']}" stop-opacity="0"/></radialGradient>
  <linearGradient id="hg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="{C['midnight']}" stop-opacity="0"/><stop offset="100%" stop-color="{C['midnight']}" stop-opacity=".92"/></linearGradient>
</defs>
<rect width="2560" height="1440" fill="url(#hg)"/>
<ellipse cx="2000" cy="380" rx="1100" ry="900" fill="url(#hg1)"/>
<polygon points="2010,250 2410,250 1770,1190 1370,1190" fill="{C['white']}" opacity=".045"/>
<polygon points="2410,250 2490,250 1850,1190 1770,1190" fill="{C['cyan']}" opacity=".10"/>
<rect y="1040" width="2560" height="400" fill="url(#hg2)"/>'''
w("03-DIGITAL/website/zhubao-hero-background-2560x1440.svg", svg(2560, 1440, b, px=True))
png("03-DIGITAL/website/zhubao-hero-background-2560x1440.svg", "03-DIGITAL/website/zhubao-hero-background-2560x1440.png", 2560)

# ---------- 9. video assets ----------
b = bg("vt", 1280, 720) + f'''<ellipse cx="1280" cy="0" rx="700" ry="520" fill="url(#glowvt)"/>
  <text x="96" y="420" {INT}font-weight="900" font-size="72" fill="{C['white']}">{'{'}视频标题 Video Title{'}'}</text>
  <text x="96" y="480" {CJK}font-size="24" fill="{C['body']}">副标题 · 章节编号 01</text>
  {sym(96, 570, 1.0)}
  <text x="216" y="632" {INT}font-weight="800" font-size="22" letter-spacing="2" fill="{C['white']}">ZHUBAO · 朱宝</text>
  {hairline(1280, 720, 714)}'''
w("03-DIGITAL/video/zhubao-video-thumb-1280x720.svg", svg(1280, 720, b, px=True))
png("03-DIGITAL/video/zhubao-video-thumb-1280x720.svg", "03-DIGITAL/video/zhubao-video-thumb-1280x720.png", 1280)
b = bg("ve", 1920, 1080) + f'''<ellipse cx="960" cy="480" rx="760" ry="560" fill="url(#glowve)"/>
  {sym(960 - 144, 260, 3.0)}
  {wordmark(960, 660, 1.0)}
  <text x="960" y="740" text-anchor="middle" {INT}font-size="22" letter-spacing="2" fill="{C['body']}">Build Systems. Engineer Knowledge. Measure Life. Create Things.</text>
  <text x="960" y="782" text-anchor="middle" {CJK}font-size="18" fill="{C['gray']}">感谢观看 · zhubao315.github.io</text>
  {hairline(1920, 1080, 1072)}'''
w("03-DIGITAL/video/zhubao-video-endcard-1920x1080.svg", svg(1920, 1080, b, px=True))
png("03-DIGITAL/video/zhubao-video-endcard-1920x1080.svg", "03-DIGITAL/video/zhubao-video-endcard-1920x1080.png", 1920)
b = f'<g opacity=".85">{sym(0, 8, 1.0)}<text x="120" y="52" {INT}font-weight="800" font-size="30" letter-spacing="4" fill="{C["white"]}">ZHUBAO</text><text x="120" y="80" {CJK}font-weight="700" font-size="18" letter-spacing="6" fill="{C["gray"]}">朱宝</text></g>'
w("03-DIGITAL/video/zhubao-watermark-lockup.svg", svg(340, 96, b))
png("03-DIGITAL/video/zhubao-watermark-lockup.svg", "03-DIGITAL/video/zhubao-watermark-lockup.png", 340)
print("digital-done")
