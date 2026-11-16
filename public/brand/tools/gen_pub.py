#!/usr/bin/env python3
import sys; sys.path.insert(0, "/oc/zhubao-brand/tools")
from zb import *

def gridbg(uid, w_, h_, s=48):
    return f'''<defs>
  <pattern id="pb{uid}" width="{s}" height="{s}" patternUnits="userSpaceOnUse">
    <rect width="{s}" height="{s}" fill="{C['midnight']}"/>
    <path d="M0 {s}V0H{s}" fill="none" stroke="{C['gray']}" stroke-width=".5" opacity=".07"/>
  </pattern>
  <radialGradient id="pg{uid}" cx="50%" cy="35%" r="65%"><stop offset="0%" stop-color="{C['blue']}" stop-opacity=".2"/><stop offset="100%" stop-color="{C['blue']}" stop-opacity="0"/></radialGradient>
</defs><rect width="{w_}" height="{h_}" fill="url(#pb{uid})"/><rect width="{w_}" height="{h_}" fill="url(#pg{uid})"/>'''

# ================= BOOK =================
# front cover 1350x1850
b = gridbg("fc", 1350, 1850) + f'''<ellipse cx="675" cy="480" rx="760" ry="620" fill="url(#pgfc)"/>
  {sym(375, 200, 6.25)}
  <text x="120" y="1080" {INT}font-weight="900" font-size="92" fill="{C['white']}">{'{'}书名{'}'}</text>
  <text x="120" y="1160" {CJK}font-weight="700" font-size="44" fill="{C['white']}">{'{'}中文主标题{'}'}</text>
  <text x="120" y="1218" {CJK}font-size="26" fill="{C['gray']}">{'{'}副标题：一句可检验的承诺{'}'}</text>
  <rect x="120" y="1268" width="88" height="8" fill="#2563EB"/>
  <text x="120" y="1430" {CJK}font-weight="700" font-size="30" fill="{C['body']}">朱宝<tspan dx="16" fill="{C['gray']}">ZHUBAO · 著</tspan></text>
  <g transform="translate(120,1660) scale(1.1)">{sym0()}</g>
  <text x="256" y="1692" {INT}font-weight="800" font-size="20" letter-spacing="3" fill="{C['white']}">ZHUBAO DIGITAL LIBRARY</text>
  <text x="256" y="1720" {CJK}font-size="16" fill="{C['gray']}">朱宝数字出版系列 · 方向标签（BUILD / THINK / MEASURE / CREATE）</text>
  <rect x="256" y="1746" width="60" height="5" fill="#FBBF24"/>'''
w("05-PUBLISHING/book-cover/zhubao-book-front-cover.svg", svg(1350, 1850, b, px=True))
png("05-PUBLISHING/book-cover/zhubao-book-front-cover.svg", "05-PUBLISHING/book-cover/zhubao-book-front-cover.png", 675)

# back cover
b = gridbg("bc", 1350, 1850) + f'''<text x="120" y="220" {INT}font-weight="900" font-size="120" fill="{C['blue']}">“</text>
  <text x="120" y="300" {CJK}font-weight="700" font-size="36" fill="{C['white']}">封底金句：这本书解决什么问题，</text>
  <text x="120" y="356" {CJK}font-weight="700" font-size="36" fill="{C['white']}">基于什么真实系统运行。</text>
  <line x1="120" y1="470" x2="1230" y2="470" stroke="{C['gray']}" stroke-width="1" opacity=".3"/>
  <text x="120" y="540" {CJK}font-size="24" fill="{C['body']}">推荐语 / 内容概要区（4–6 段，每段 ≤ 4 行）</text>
  <text x="120" y="590" {CJK}font-size="24" fill="{C['body']}">· 所有数字均来自真实记录，可溯源</text>
  <text x="120" y="640" {CJK}font-size="24" fill="{C['body']}">· 每章附可复现清单</text>
  <g transform="translate(120,1560) scale(1.0)">{sym0()}</g>
  <text x="240" y="1600" {INT}font-weight="800" font-size="22" letter-spacing="3" fill="{C['white']}">ZHUBAO · 朱宝</text>
  <text x="240" y="1634" {INT}font-size="16" fill="{C['gray']}">zhubao315.github.io</text>
  <rect x="930" y="1520" width="300" height="120" fill="{C['white']}"/>
  <g stroke="#0B1D33" stroke-width="3">{''.join(f'<line x1="{952 + i * 11}" y1="1540" x2="{952 + i * 11}" y2="1612"/>' for i in range(0, 12, 2))}{''.join(f'<line x1="{958 + i * 11}" y1="1540" x2="{958 + i * 11}" y2="1612"/>' for i in range(0, 12))}</g>
  <text x="1080" y="1676" text-anchor="middle" {CJK}font-size="18" fill="{C['gray']}">条码 / ISBN 占位（出版时替换）</text>
  <text x="1080" y="1706" text-anchor="middle" {MON}font-size="14" fill="{C['gray']}">978-X-XXXX-XXXX-X</text>'''
w("05-PUBLISHING/book-cover/zhubao-book-back-cover.svg", svg(1350, 1850, b, px=True))
png("05-PUBLISHING/book-cover/zhubao-book-back-cover.svg", "05-PUBLISHING/book-cover/zhubao-book-back-cover.png", 675)

# spine 210x1850
b = f'<rect width="210" height="1850" fill="{C["midnight"]}"/><rect y="0" width="210" height="10" fill="#2563EB"/><g transform="translate(63,80) scale(0.95)">{sym0()}</g>'
b += f'<text x="105" y="330" text-anchor="middle" writing-mode="tb" {CJK}font-weight="700" font-size="34" letter-spacing="10" fill="{C["white"]}">{'{'}书名{'}'}</text>'
b += f'<text x="105" y="1450" text-anchor="middle" writing-mode="tb" {INT}font-weight="800" font-size="24" letter-spacing="6" fill="{C["gray"]}">ZHUBAO</text><rect x="63" y="1740" width="84" height="6" fill="#2563EB"/>'
w("05-PUBLISHING/book-cover/zhubao-book-spine.svg", svg(210, 1850, b, px=True))

# hardcover 2.5D mockup
b = gridbg("hm", 1600, 1100, s=64) + f'''<ellipse cx="800" cy="480" rx="720" ry="500" fill="url(#pghm)"/>
  <g transform="translate(470,90)">
    <polygon points="0,0 560,0 560,820 0,820" fill="{C['midnight']}" stroke="{C['gray']}" stroke-opacity=".4"/>
    <polygon points="560,0 640,40 640,860 560,820" fill="{C['navy']}"/>
    <polygon points="0,820 560,820 640,860 80,860" fill="{C['navy']}" opacity=".7"/>
    <g transform="translate(60,90) scale(4.0)">{sym0()}</g>
    <text x="60" y="640" {CJK}font-weight="900" font-size="52" fill="{C['white']}">{'{'}书名{'}'}</text>
    <text x="60" y="700" {INT}font-weight="800" font-size="20" letter-spacing="2" fill="{C['gray']}">ZHUBAO · 朱宝</text>
    <rect x="60" y="740" width="60" height="6" fill="#2563EB"/>
  </g>
  <text x="1250" y="300" {CJK}font-size="20" fill="{C['gray']}">立体展示模板</text>
  <text x="1250" y="336" {INT}font-size="15" fill="{C['gray']}">cover ratio 1:1.47 · bleed 3mm</text>
  {hairline(1600, 1100, 1090)}'''
w("05-PUBLISHING/book-cover/zhubao-book-3d-mockup.svg", svg(1600, 1100, b, px=True))
png("05-PUBLISHING/book-cover/zhubao-book-3d-mockup.svg", "05-PUBLISHING/book-cover/zhubao-book-3d-mockup.png", 1200)

# interior spread 2900x1850 (2 pages)
page_bg = lambda x: f'<rect x="{x}" y="0" width="1450" height="1850" fill="#F7FAFF"/>'
left = page_bg(0) + f'''<text x="160" y="360" {INT}font-weight="900" font-size="150" fill="{C['midnight']}" opacity=".08">03</text>
  <rect x="160" y="420" width="72" height="8" fill="#FBBF24"/>
  <text x="160" y="530" {INT}font-weight="900" font-size="72" fill="{C['midnight']}">CHAPTER TITLE</text>
  <text x="160" y="600" {CJK}font-weight="700" font-size="34" fill="{C['midnight']}">{'{'}章节标题{'}'}</text>
  <text x="160" y="668" {CJK}font-size="21" fill="#475569">本章将回答：一个可检验的问题。</text>
  <line x1="160" y1="1560" x2="1290" y2="1560" stroke="#94A3B8" stroke-width="1" opacity=".4"/>
  <text x="160" y="1620" {INT}font-size="15" fill="#94A3B8">ZHUBAO · 朱宝</text><text x="1290" y="1620" text-anchor="end" {INT}font-weight="700" font-size="18" fill="#0B1D33">042</text>'''
right = page_bg(1450) + f'''<text x="1610" y="180" {INT}font-size="15" letter-spacing="2" fill="#94A3B8">03 · {'{'}CHAPTER TITLE{'}'}</text>
  <line x1="1610" y1="210" x2="2740" y2="210" stroke="#94A3B8" stroke-width="1" opacity=".4"/>
  <text x="1610" y="300" {CJK}font-weight="700" font-size="30" fill="#0B1D33">一级小标题 H2</text>
  {''.join(f'<text x="1610" y="{380 + i * 46}" {CJK}font-size="19" fill="#1E293B" opacity=".85">正文示例：19px，行高 1.65，栏宽 96 字。工程写作优先给定义，再给结论，最后给证据。</text>' for i in range(3))}
  <rect x="1610" y="580" width="1130" height="430" fill="#EDF3FB" stroke="#94A3B8" stroke-opacity=".4"/>
  <text x="2175" y="805" text-anchor="middle" {CJK}font-size="19" fill="#64748B">{'{'}图表：网格对齐、单色强调、来源标注{'}'}</text>
  <text x="1610" y="1075" {INT}font-weight="700" font-size="15" fill="#64748B">FIGURE 3.1 — {'{'}图表标题{'}'}</text>
  <rect x="1610" y="1140" width="1130" height="150" fill="#0B1D33"/>
  <text x="1660" y="1205" {INT}font-weight="800" font-size="26" fill="#F7FAFF">“关键洞察放在深色强调块中，</text>
  <text x="1660" y="1246" {INT}font-weight="800" font-size="26" fill="#F7FAFF">形成印刷上的视觉锚点。”</text>
  {''.join(f'<text x="1610" y="{1380 + i * 46}" {CJK}font-size="19" fill="#1E293B" opacity=".85">继续正文。代码与数据使用等宽字体，缩进 2em 的引用块用左侧竖线标注。</text>' for i in range(3))}
  <line x1="1610" y1="1560" x2="2740" y2="1560" stroke="#94A3B8" stroke-width="1" opacity=".4"/>
  <text x="1610" y="1620" {INT}font-size="15" fill="#94A3B8">书名 · 章名</text><text x="1610" y="1620" text-anchor="start"></text><text x="2740" y="1620" text-anchor="end" {INT}font-weight="700" font-size="18" fill="#0B1D33">043</text>'''
w("05-PUBLISHING/book-interior/zhubao-editorial-spread.svg", svg(2900, 1850, left + right, px=True))
png("05-PUBLISHING/book-interior/zhubao-editorial-spread.svg", "05-PUBLISHING/book-interior/zhubao-editorial-spread.png", 1450)

# ebook cover 1600x2400
b = gridbg("eb", 1600, 2400, s=56) + f'''<ellipse cx="800" cy="620" rx="880" ry="700" fill="url(#pgeb)"/>
  {sym(440, 260, 7.5)}
  <text x="150" y="1440" {INT}font-weight="900" font-size="106" fill="{C['white']}">{'{'}书名{'}'}</text>
  <text x="150" y="1530" {CJK}font-weight="700" font-size="50" fill="{C['white']}">{'{'}中文主标题{'}'}</text>
  <text x="150" y="1600" {CJK}font-size="28" fill="{C['gray']}">{'{'}副标题{'}'}</text>
  <rect x="150" y="1660" width="96" height="8" fill="#2563EB"/>
  <text x="150" y="1860" {CJK}font-weight="700" font-size="34" fill="{C['body']}">朱宝<tspan dx="18" fill="{C['gray']}">ZHUBAO · 著</tspan></text>
  <text x="150" y="2240" {INT}font-weight="800" font-size="24" letter-spacing="3" fill="{C['gray']}">EBOOK EDITION · ZHUBAO</text>'''
w("05-PUBLISHING/ebook/zhubao-ebook-cover-1600x2400.svg", svg(1600, 2400, b, px=True))
png("05-PUBLISHING/ebook/zhubao-ebook-cover-1600x2400.svg", "05-PUBLISHING/ebook/zhubao-ebook-cover-1600x2400.png", 800)

# ================= QUANTIFIED LIFE / DATA REPORTS =================
QL = "#34D399"
# annual report cover 1080x1920
b = gridbg("ar", 1080, 1920) + f'''<ellipse cx="540" cy="380" rx="600" ry="480" fill="url(#pgar)"/>
  {sym(360, 120, 3.75)}
  <text x="540" y="700" text-anchor="middle" {INT}font-weight="900" font-size="70" fill="{C['white']}">YEAR IN DATA</text>
  <text x="540" y="764" text-anchor="middle" {CJK}font-weight="700" font-size="38" fill="{C['white']}">个人年度数据报告 · 20XX</text>
  <text x="540" y="812" text-anchor="middle" {INT}font-size="19" letter-spacing="2" fill="{QL}">MEASURE DOMAIN · ZHUBAO QUANTIFIED LIFE</text>
  <line x1="120" y1="900" x2="960" y2="900" stroke="{C['gray']}" stroke-width="1" opacity=".3"/>
  {''.join(f'<text x="{120 + (i % 2) * 420}" y="{990 + (i // 2) * 150}" {INT}font-weight="900" font-size="56" fill="{C["white"]}">XXXX</text><text x="{120 + (i % 2) * 420}" y="{1030 + (i // 2) * 150}" {CJK}font-size="18" fill="{C["gray"]}">{'{'}指标名 · 单位{'}'}</text>' for i in range(4))}
  <text x="120" y="1660" {CJK}font-size="17" fill="{C['gray']}">数据来源：个人记录（手表 / 平台导出），全部可溯源</text>
  {hairline(1080, 1920, 1908)}'''
w("04-DOCUMENTS/reports/zhubao-annual-report-cover.svg", svg(1080, 1920, b, px=True))
png("04-DOCUMENTS/reports/zhubao-annual-report-cover.svg", "04-DOCUMENTS/reports/zhubao-annual-report-cover.png", 540)

# dashboard 1440x900
b = f'<defs><pattern id="dbp" width="48" height="48" patternUnits="userSpaceOnUse"><rect width="48" height="48" fill="{C['midnight']}"/><rect width="1.2" height="1.2" fill="{C['blue']}"/></pattern></defs><rect width="1440" height="900" fill="url(#dbp)"/>'
b += f'''<g transform="translate(48,36) scale(0.6)">{sym0()}</g>
  <text x="122" y="62" {INT}font-weight="900" font-size="24" letter-spacing="2" fill="{C['white']}">QUANTIFIED LIFE · DASHBOARD</text>
  <text x="122" y="88" {INT}font-size="13" fill="{C['gray']}">sample structure · 使用时替换为真实数据</text>
  <text x="1392" y="60" text-anchor="end" {MON}font-size="15" fill="{C['gray']}">20XX-XX-XX ~ 20XX-XX-XX</text>'''
cards = [("总距离", "XXXX km", QL), ("训练时长", "XXX h", C['cyan']), ("平均心率", "XXX bpm", C['think']), ("爬升", "XXXX m", C['create'])]
for i, (t, v, col) in enumerate(cards):
    x = 48 + i * 338
    b += f'<rect x="{x}" y="128" width="314" height="150" rx="12" fill="{C['navy']}" stroke="{C['gray']}" stroke-opacity=".25"/>' + f'<rect x="{x}" y="128" width="4" height="150" rx="2" fill="{col}"/><text x="{x + 24}" y="168" {CJK}font-size="15" fill="{C["gray"]}">{t}</text><text x="{x + 24}" y="238" {INT}font-weight="900" font-size="42" fill="{col}">{v}</text>'
b += f'''<rect x="48" y="310" width="900" height="330" rx="12" fill="{C['navy']}"/>
  <g stroke="{C['gray']}" stroke-width="1" opacity=".15">{''.join(f'<line x1="96" y1="{y}" x2="912" y2="{y}"/>' for y in (380, 440, 500, 560, 600))}</g>
  <polyline points="96,600 190,560 284,580 378,500 472,470 566,430 660,460 754,400 848,380 912,360" fill="none" stroke="{QL}" stroke-width="3"/>
  <path d="M96 600 L190 560 284 580 378 500 472 470 566 430 660 460 754 400 848 380 912 360 V630 H96 Z" fill="{QL}" opacity=".10"/>
  <text x="96" y="352" {INT}font-size="13" letter-spacing="1.5" fill="{C['gray']}">WEEKLY DISTANCE · 示例曲线</text>
  <rect x="980" y="310" width="412" height="330" rx="12" fill="{C['navy']}"/>
  <text x="1008" y="352" {INT}font-size="13" letter-spacing="1.5" fill="{C['gray']}">DISTRIBUTION · 示例结构</text>
  {''.join(f'<rect x="1008" y="{390 + i * 52}" width="{[300, 220, 150, 90][i]}" height="22" rx="4" fill="{[QL, C["cyan"], C["think"], C["create"]][i]}" opacity=".8"/><text x="1018" y="{406 + i * 52}" {INT}font-size="12" font-weight="700" fill="{C["midnight"]}">XX%</text>' for i in range(4))}
  <rect x="48" y="672" width="1344" height="190" rx="12" fill="{C['navy']}"/>
  {''.join(f'<circle cx="{118 + i * 132}" cy="790" r="34" fill="none" stroke="{[QL, C["cyan"], C["think"], C["create"], C["blue"], C['gray'], QL][i]}" stroke-width="6" stroke-dasharray="{[214, 170, 150, 120, 190, 100, 150][i]} 214" transform="rotate(-90 118 790)"/><text x="{118 + i * 132}" y="856" text-anchor="middle" {CJK}font-size="12" fill="{C["gray"]}">周{["一","二","三","四","五","六","日"][i]}</text>' for i in range(7))}
  <text x="1120" y="740" {CJK}font-size="15" fill="{C['gray']}">PR / 连续记录</text><text x="1120" y="790" {INT}font-weight="900" font-size="34" fill="{C['white']}">XXXX<tspan font-size="16" fill="{C['gray']}"> 天 streak</tspan></text>'''
w("06-PRODUCTS/quantified-life/zhubao-ql-dashboard-1440x900.svg", svg(1440, 900, b, px=True))
png("06-PRODUCTS/quantified-life/zhubao-ql-dashboard-1440x900.svg", "06-PRODUCTS/quantified-life/zhubao-ql-dashboard-1440x900.png", 1440)

# social share data card 1080x1350
b = gridbg("sc", 1080, 1350) + f'''<rect width="1080" height="8" fill="{QL}"/>
  <g transform="translate(80,80) scale(1.0)">{sym0()}</g>
  <text x="210" y="118" {INT}font-weight="800" font-size="24" letter-spacing="3" fill="{C['white']}">ZHUBAO · MEASURE</text>
  <text x="80" y="320" {CJK}font-weight="900" font-size="52" fill="{C['white']}">{'{'}RUN / RIDE / HIKE · 月报{'}'}</text>
  <text x="80" y="372" {MON}font-size="20" fill="{C['gray']}">20XX-XX</text>
  {''.join(f'<rect x="80" y="{460 + i * 170}" width="920" height="140" rx="10" fill="{C['navy']}"/><text x="116" y="{512 + i * 170}" {CJK}font-size="17" fill="{C['gray']}">{m}</text><text x="116" y="{576 + i * 170}" {INT}font-weight="900" font-size="44" fill="{[QL, C["cyan"], C["think"]][i]}">XXXX<tspan font-size="18" fill="{C["gray"]}"> 单位</tspan></text>' for i, m in enumerate(["距离", "时长", "配速 / 功率"]))}
  <line x1="80" y1="1200" x2="1000" y2="1200" stroke="{C['gray']}" stroke-width="1" opacity=".3"/>
  <text x="80" y="1246" {MON}font-size="17" fill="{C['gray']}">zhubao315.github.io · 数据来自个人真实记录</text>'''
w("04-DOCUMENTS/reports/zhubao-data-share-card-1080x1350.svg", svg(1080, 1350, b, px=True))
png("04-DOCUMENTS/reports/zhubao-data-share-card-1080x1350.svg", "04-DOCUMENTS/reports/zhubao-data-share-card-1080x1350.png", 720)
print("pub-data-done")
