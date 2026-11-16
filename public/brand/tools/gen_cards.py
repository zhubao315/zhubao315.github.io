#!/usr/bin/env python3
import sys; sys.path.insert(0, "/oc/zhubao-brand/tools")
from zb import *

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
    return "".join(f'<rect x="{seg * i}" y="{y}" width="{seg - w_ * 0.012}" height="4" fill="{col}" opacity=".85"/>' for i, col in enumerate(cols))

# ---------- business card 93x58 (89x54 + 2mm bleed each side) ----------
def cropmarks(w_, h_):
    o = ""
    cx0, cy0, cx1, cy1 = 2, 2, w_ - 2, h_ - 2
    for x in (cx0, cx1):
        o += f'<line x1="{x}" y1="0" x2="{x}" y2="6" stroke="#94A3B8" stroke-width=".15"/><line x1="{x}" y1="{h_-6}" x2="{x}" y2="{h_}" stroke="#94A3B8" stroke-width=".15"/>'
    for y in (cy0, cy1):
        o += f'<line x1="0" y1="{y}" x2="6" y2="{y}" stroke="#94A3B8" stroke-width=".15"/><line x1="{w_-6}" y1="{y}" x2="{w_}" y2="{y}" stroke="#94A3B8" stroke-width=".15"/>'
    o += f'<rect x="2" y="2" width="{w_-4}" height="{h_-4}" fill="none" stroke="#FB7185" stroke-width=".12" stroke-dasharray="1.2 1"/>'
    return o
front = f'''<rect x="2" y="2" width="89" height="54" fill="{C['midnight']}"/>
  <rect x="2" y="2" width="89" height="1.2" fill="{C['blue']}"/>
  <g transform="translate(9,11) scale(0.0625)">{sym0()}</g>
  <text x="9" y="37" {INT}font-weight="900" font-size="4.4" letter-spacing="1" fill="{C['white']}">ZHUBAO</text>
  <text x="47" y="37" {CJK}font-weight="700" font-size="3.1" letter-spacing=".8" fill="{C['gray']}">朱宝 · 个人品牌</text>
  <line x1="9" y1="42" x2="84" y2="42" stroke="{C['gray']}" stroke-width=".2" opacity=".5"/>
  <text x="9" y="47" {INT}font-size="2.4" letter-spacing=".2" fill="{C['gray']}">＋86 1XX-XXXX-XXXX<tspan dx="4">·</tspan><tspan dx="4">you@example.com</tspan></text>
  <text x="9" y="52" {INT}font-size="2.4" letter-spacing=".2" fill="{C['gray']}">zhubao315.github.io<tspan dx="4">·</tspan><tspan dx="4">github.com/zhubao315</tspan></text>
  <text x="9" y="24.5" {CJK}font-size="2.6" fill="{C['body']}">构建系统 · 工程知识 · 量化生活 · 创造作品</text>
  <rect x="68" y="11" width="3" height="3" fill="#38BDF8"/><rect x="72" y="11" width="3" height="3" fill="#FBBF24"/><rect x="76" y="11" width="3" height="3" fill="#34D399"/><rect x="80" y="11" width="3" height="3" fill="#FB7185"/>'''
back = f'''<rect x="2" y="2" width="89" height="54" fill="{C['midnight']}"/>
  <text x="46.5" y="15" text-anchor="middle" {INT}font-weight="800" font-size="2.4" letter-spacing=".6" fill="{C['body']}">Builder · Researcher · Recorder</text>
  <text x="46.5" y="24" text-anchor="middle" {INT}font-weight="900" font-size="3.6" letter-spacing=".3" fill="{C['white']}">Build Systems. Engineer Knowledge.</text>
  <text x="46.5" y="30.5" text-anchor="middle" {INT}font-weight="900" font-size="3.6" letter-spacing=".3" fill="{C['white']}">Measure Life. Create Things.</text>
  <line x1="30" y1="32.5" x2="63" y2="32.5" stroke="{C['gray']}" stroke-width=".2" opacity=".5"/>
  <text x="40" y="38" text-anchor="middle" {CJK}font-size="2.4" letter-spacing=".6" fill="{C['gray']}">构建系统 · 工程知识 · 量化生活 · 创造作品</text>
  <rect x="10" y="47.6" width="4.4" height="1.6" fill="#38BDF8"/><rect x="15.6" y="47.6" width="4.4" height="1.6" fill="#FBBF24"/><rect x="21.2" y="47.6" width="4.4" height="1.6" fill="#34D399"/><rect x="26.8" y="47.6" width="4.4" height="1.6" fill="#FB7185"/>
  <rect x="71" y="41" width="13" height="13" fill="none" stroke="{C['gray']}" stroke-width=".25"/>
  <g stroke="{C['gray']}" stroke-width=".3"><path d="M71 41h2.5M71 41v2.5M84 41h-2.5M84 41v2.5M71 54h2.5M71 54v-2.5M84 54h-2.5M84 54v-2.5" fill="none"/></g>'''
w("07-SI/office/zhubao-businesscard-front-print.svg", f'<svg xmlns="http://www.w3.org/2000/svg" width="93mm" height="58mm" viewBox="0 0 93 58">\n{front}\n{cropmarks(93, 58)}\n</svg>')
w("07-SI/office/zhubao-businesscard-back-print.svg", f'<svg xmlns="http://www.w3.org/2000/svg" width="93mm" height="58mm" viewBox="0 0 93 58">\n{back}\n{cropmarks(93, 58)}\n</svg>')
# screen previews (no crop marks)
w("07-SI/office/zhubao-businesscard-front.svg", f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 89 54" width="802" height="486">\n<g transform="translate(-2,-2)">{front}</g>\n</svg>')
w("07-SI/office/zhubao-businesscard-back.svg", f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 89 54" width="802" height="486">\n<g transform="translate(-2,-2)">{back}</g>\n</svg>')
png("07-SI/office/zhubao-businesscard-front.svg", "09-EXPORTS/png/zhubao-businesscard-front.png", 802)
png("07-SI/office/zhubao-businesscard-back.svg", "09-EXPORTS/png/zhubao-businesscard-back.png", 802)

# ---------- digital card 900x500 ----------
b = bg("dc", 900, 500) + f'''<ellipse cx="150" cy="250" rx="360" ry="330" fill="url(#glowdc)"/>
  {sym(80, 140, 2.2)}
  {wordmark(196, 440, 0.42)}
  <text x="380" y="150" {INT}font-weight="900" font-size="46" letter-spacing="6" fill="{C['white']}">朱宝 · ZHUBAO</text>
  <text x="380" y="190" {INT}font-size="17" letter-spacing="2" fill="{C['cyan']}">Builder · Researcher · Recorder</text>
  <line x1="380" y1="220" x2="830" y2="220" stroke="{C['gray']}" stroke-width="1" opacity=".35"/>
  <text x="380" y="262" {MON}font-size="18" fill="{C['body']}">＋86 1XX-XXXX-XXXX</text>
  <text x="380" y="300" {MON}font-size="18" fill="{C['body']}">you@example.com</text>
  <text x="380" y="338" {MON}font-size="18" fill="{C['cyan']}">zhubao315.github.io</text>
  <text x="380" y="376" {MON}font-size="18" fill="{C['body']}">github.com/zhubao315</text>
  <rect x="700" y="252" width="130" height="130" fill="none" stroke="{C['gray']}" stroke-width="2"/>
  <g stroke="{C['cyan']}" stroke-width="3"><path d="M700 252h18M700 252v18M830 252h-18M830 252v18M700 382h18M700 382v-18M830 382h-18M830 382v-18" fill="none"/></g>
  <text x="765" y="408" text-anchor="middle" {CJK}font-size="14" fill="{C['gray']}">二维码区域（放真实链接）</text>
  <rect x="380" y="440" width="26" height="6" fill="#38BDF8"/><rect x="412" y="440" width="26" height="6" fill="#FBBF24"/><rect x="444" y="440" width="26" height="6" fill="#34D399"/><rect x="476" y="440" width="26" height="6" fill="#FB7185"/>
  <text x="520" y="447" {INT}font-size="14" fill="{C['gray']}">Scan · 交换数字名片</text>'''
w("07-SI/office/zhubao-digital-card-900x500.svg", svg(900, 500, b, px=True))
png("07-SI/office/zhubao-digital-card-900x500.svg", "07-SI/office/zhubao-digital-card-900x500.png", 900)

# ---------- personal intro card 1080x1350 ----------
b = bg("ic", 1080, 1350) + f'''<ellipse cx="540" cy="300" rx="520" ry="420" fill="url(#glowic)"/>
  {sym(432, 120, 2.25)}
  {wordmark(540, 500, 0.85)}
  <text x="540" y="600" text-anchor="middle" {INT}font-weight="800" font-size="24" letter-spacing="3" fill="{C['cyan']}">Builder · Researcher · Recorder</text>
  <line x1="140" y1="660" x2="940" y2="660" stroke="{C['gray']}" stroke-width="1" opacity=".3"/>
  <text x="140" y="730" {CJK}font-weight="700" font-size="30" fill="{C['white']}">工程师，长期实践者。</text>
  <text x="140" y="790" {CJK}font-size="24" fill="{C['body']}">做 AI 工程与系统设计，写知识工程与投资研究，</text>
  <text x="140" y="836" {CJK}font-size="24" fill="{C['body']}">跑步骑行徒步，并记录一切可量化的生活数据。</text>
  <text x="140" y="882" {CJK}font-size="24" fill="{C['body']}">相信复利，公开过程，作品说话。</text>
  {stacked_chips(140, 950, 1.0)}
  <line x1="140" y1="1210" x2="940" y2="1210" stroke="{C['gray']}" stroke-width="1" opacity=".3"/>
  <text x="140" y="1252" {MON}font-size="20" fill="{C['gray']}">zhubao315.github.io · github.com/zhubao315</text>
  {hairline(1080, 1350, 1340)}'''
w("07-SI/office/zhubao-intro-card-1080x1350.svg", svg(1080, 1350, b, px=True))
png("07-SI/office/zhubao-intro-card-1080x1350.svg", "07-SI/office/zhubao-intro-card-1080x1350.png", 1080)
print("cards-done")
