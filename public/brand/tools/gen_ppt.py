#!/usr/bin/env python3
# ZHUBAO presentation deck: 16 editable SVG masters @1280x720
import sys; sys.path.insert(0, "/oc/zhubao-brand/tools")
from zb import *
S = "04-DOCUMENTS/powerpoint/slides"

def page(n, title=None, zh=None, dc=None):
    """common frame: grid bg, header, footer. returns (head_str, content_y)"""
    dc = dc or C['blue']
    o = bg(f"p{n}", 1280, 720) + f'<rect width="1280" height="1280" fill="{C["midnight"]}" opacity=".35"/>'
    o += f'<rect x="0" y="0" width="1280" height="5" fill="{dc}" opacity=".9"/>'
    o += f'<g transform="translate(1188,28) scale(0.4167)">{sym0()}</g>'
    o += f'<text x="1180" y="44" text-anchor="end" {INT}font-weight="800" font-size="15" letter-spacing="3" fill="{C["gray"]}">ZHUBAO · 朱宝</text>'
    if title:
        o += f'<text x="64" y="92" {INT}font-weight="900" font-size="40" fill="{C["white"]}">{title}</text>'
        o += f'<text x="64" y="126" {CJK}font-size="18" fill="{C["gray"]}">{zh or ""}</text>'
        o += f'<rect x="64" y="142" width="44" height="4" fill="{dc}"/>'
    o += f'<text x="64" y="700" {MON}font-size="13" fill="{C["gray"]}">{n:02d} / 16</text>'
    o += f'<line x1="64" y1="668" x2="1216" y2="668" stroke="{C["gray"]}" stroke-width="1" opacity=".25"/>'
    return o

def save(n, name, body):
    w(f"{S}/slide-{n:02d}-{name}.svg", svg(1280, 720, body))
    png(f"{S}/slide-{n:02d}-{name}.svg", f"09-EXPORTS/png/ppt/slide-{n:02d}-{name}.png", 1280)

# 01 cover
b = bg("c1", 1280, 720) + f'''<ellipse cx="330" cy="300" rx="520" ry="430" fill="url(#glowc1)"/>
  {sym(210, 120, 3.0)}
  {wordmark(880, 280, 1.15)}
  <text x="880" y="356" text-anchor="middle" {CJK}font-weight="700" font-size="34" fill="{C['white']}">{'{'}演示文稿标题{'}'}</text>
  <text x="880" y="400" text-anchor="middle" {CJK}font-size="19" fill="{C['body']}">{'{'}副标题 · 场合 · 日期{'}'}</text>
  <text x="880" y="520" text-anchor="middle" {INT}font-size="18" letter-spacing="1.5" fill="{C['body']}">Build Systems · Engineer Knowledge · Measure Life · Create Things</text>
  <line x1="80" y1="656" x2="1200" y2="656" stroke="{C['gray']}" stroke-width="1" opacity=".3"/>
  <text x="80" y="692" {INT}font-weight="700" font-size="14" letter-spacing="4" fill="{C['gray']}">ZHUBAO PRESENTATION IDENTITY · 16:9</text>'''
save(1, "cover", b)

# 02 agenda
b = page(2, "AGENDA", "目录")
items = ["关于 ZHUBAO", "BUILD 构建系统", "THINK 工程知识", "MEASURE 量化生活", "CREATE 创造作品", "问答与联系方式"]
for i, it in enumerate(items):
    x = 64 + (i % 2) * 590; y = 230 + (i // 2) * 150
    b += f'''<text x="{x}" y="{y}" {INT}font-weight="900" font-size="46" fill="{C['gray']}" opacity=".45">{i + 1:02d}</text>
  <text x="{x + 90}" y="{y - 8}" {CJK}font-weight="700" font-size="26" fill="{C['white']}">{it}</text>
  <line x1="{x + 90}" y1="{y + 14}" x2="{x + 520}" y2="{y + 14}" stroke="{C['gray']}" stroke-width="1" opacity=".3"/>'''
save(2, "agenda", b)

# 03 section divider
b = bg("s3", 1280, 720) + f'''<rect x="0" y="0" width="1280" height="5" fill="#38BDF8"/>
  <text x="100" y="450" {INT}font-weight="900" font-size="300" fill="{C['navy']}" opacity=".9">02</text>
  <text x="112" y="470" {INT}font-weight="900" font-size="300" fill="none" stroke="#38BDF8" stroke-width="2">02</text>
  <text x="120" y="530" {INT}font-weight="900" font-size="64" letter-spacing="6" fill="{C['white']}">SECTION TITLE</text>
  <text x="122" y="574" {CJK}font-size="24" fill="{C['gray']}">章节标题 · 一句话说明本章解决什么问题</text>
  <rect x="120" y="610" width="80" height="5" fill="#38BDF8"/>
  <g transform="translate(1150,600) scale(0.58)">{sym0()}</g>'''
save(3, "section", b)

# 04 key point
b = page(4, "KEY POINT", "核心观点")
b += f'''<text x="64" y="300" {CJK}font-weight="900" font-size="52" fill="{C['white']}">{'{'}一句最重要的话，不超过两行{'}'}</text>
  <rect x="64" y="336" width="120" height="6" fill="{C['blue']}"/>
  <text x="64" y="430" {CJK}font-size="21" fill="{C['body']}">· 论据 1：给出可验证的事实或数据</text>
  <text x="64" y="478" {CJK}font-size="21" fill="{C['body']}">· 论据 2：给出系统的、可复现的做法</text>
  <text x="64" y="526" {CJK}font-size="21" fill="{C['body']}">· 论据 3：给出边界与反例</text>'''
save(4, "keypoint", b)

# 05 two columns
b = page(5, "TWO COLUMNS", "双栏内容")
b += f'''<line x1="640" y1="200" x2="640" y2="620" stroke="{C['gray']}" stroke-width="1" opacity=".3"/>
  <text x="64" y="230" {CJK}font-weight="700" font-size="24" fill="{C['cyan']}">左栏标题</text>
  <text x="64" y="278" {CJK}font-size="19" fill="{C['body']}">正文 18–21px，行高 1.65，段间距 16px，</text>
  <text x="64" y="314" {CJK}font-size="19" fill="{C['body']}">每段不超过五行，小标题用 H4。</text>
  <text x="672" y="230" {CJK}font-weight="700" font-size="24" fill="{C['cyan']}">右栏标题</text>
  <text x="672" y="278" {CJK}font-size="19" fill="{C['body']}">图表 / 代码 / 数据卡片放右栏，</text>
  <text x="672" y="314" {CJK}font-size="19" fill="{C['body']}">与左栏基线对齐。</text>
  <rect x="672" y="360" width="544" height="230" rx="10" fill="{C['navy']}" stroke="{C['gray']}" stroke-width="1" opacity=".9"/>
  <text x="944" y="486" text-anchor="middle" {CJK}font-size="17" fill="{C['gray']}">{'{'}图表 / 截图占位{'}'}</text>'''
save(5, "two-col", b)

# 06 three columns
b = page(6, "THREE CARDS", "三栏卡片")
for i, (t, c) in enumerate([("卡片标题 A", "#38BDF8"), ("卡片标题 B", "#FBBF24"), ("卡片标题 C", "#34D399")]):
    x = 64 + i * 392
    b += f'''<rect x="{x}" y="210" width="360" height="400" rx="12" fill="{C['navy']}" stroke="{C['gray']}" stroke-width="1" stroke-opacity=".3"/>
  <rect x="{x}" y="210" width="360" height="6" rx="3" fill="{c}"/>
  <text x="{x + 28}" y="280" {CJK}font-weight="700" font-size="24" fill="{C['white']}">{t}</text>
  <text x="{x + 28}" y="330" {CJK}font-size="17" fill="{C['body']}">描述文本，≤ 3 行，</text>
  <text x="{x + 28}" y="362" {CJK}font-size="17" fill="{C['body']}">指标或链接放底部。</text>
  <line x1="{x + 28}" y1="540" x2="{x + 332}" y2="540" stroke="{C['gray']}" stroke-width="1" opacity=".3"/>
  <text x="{x + 28}" y="578" {MON}font-size="15" fill="{c}">→ detail link</text>'''
save(6, "three-col", b)

# 07 four directions
b = page(7, "FOUR DIRECTIONS", "四大方向")
for i, (en, cn, sub, col) in enumerate(DIRS):
    x = 64 + (i % 2) * 596; y = 190 + (i // 2) * 226
    b += f'''<rect x="{x}" y="{y}" width="580" height="200" rx="12" fill="{C['navy']}" stroke="{col}" stroke-width="1.5" stroke-opacity=".55"/>
  <rect x="{x + 28}" y="{y + 30}" width="16" height="16" fill="{col}"/>
  <text x="{x + 58}" y="{y + 44}" {INT}font-weight="900" font-size="24" letter-spacing="3" fill="{C['white']}">{en}</text>
  <text x="{x + 58}" y="{y + 80}" {CJK}font-weight="700" font-size="19" fill="{col}">{cn}</text>
  <text x="{x + 28}" y="{y + 130}" {CJK}font-size="16" fill="{C['body']}">{sub} · 一句话项目说明</text>
  <text x="{x + 28}" y="{y + 164}" {MON}font-size="14" fill="{C['gray']}">0{i + 1} / ZHUBAO MASTER BRAND</text>'''
save(7, "directions", b)

# 08 architecture
b = page(8, "ARCHITECTURE", "技术架构")
layers = [("应用层 · Apps", ["uSkill", "MBTI64", "Reports"], "#38BDF8"), ("能力层 · Capabilities", ["Agent Runtime", "Knowledge Base", "Metrics"], "#2563EB"), ("数据层 · Data", ["Events", "Metrics", "Docs"], "#34D399")]
for i, (ln, boxes, col) in enumerate(layers):
    y = 210 + i * 150
    b += f'<text x="64" y="{y + 48}" {CJK}font-weight="700" font-size="18" fill="{C["gray"]}">{ln}</text><rect x="240" y="{y}" width="976" height="110" rx="10" fill="{C["navy"]}" stroke="{col}" stroke-width="1.5" stroke-opacity=".6"/>'
    for j, bx in enumerate(boxes):
        x = 272 + j * 320
        b += f'<rect x="{x}" y="{y + 24}" width="280" height="62" rx="8" fill="{C["midnight"]}" stroke="{col}" stroke-width="1" stroke-opacity=".8"/><text x="{x + 140}" y="{y + 62}" text-anchor="middle" {INT}font-weight="700" font-size="18" fill="{C["white"]}">{bx}</text>'
    if i < 2:
        b += f'<path d="M728 {y + 110}v40" stroke="{C["gray"]}" stroke-width="1.5" marker-end="none"/><path d="M722 {y + 150}h12" stroke="{C["gray"]}" stroke-width="1.5"/>'
save(8, "architecture", b)

# 09 flow
b = page(9, "PROCESS FLOW", "流程")
steps = ["输入 Input", "建模 Model", "构建 Build", "测量 Measure", "迭代 Iterate"]
for i, st in enumerate(steps):
    x = 64 + i * 232
    b += f'''<path d="M{x} {320}h196l28 40-28 40h-196l28-40z" fill="{C['navy']}" stroke="{C['blue']}" stroke-width="1.5" stroke-opacity=".7"/>
  <text x="{x + 124}" y="{368}" text-anchor="middle" {CJK}font-weight="700" font-size="16" fill="{C['white']}">{st}</text>
  <text x="{x + 124}" y="{290}" text-anchor="middle" {INT}font-weight="900" font-size="26" fill="{C['gray']}" opacity=".6">{i + 1:02d}</text>
  <text x="{x + 124}" y="{450}" text-anchor="middle" {CJK}font-size="14" fill="{C['gray']}">说明文本</text>'''
save(9, "flow", b)

# 10 data chart (structure only, labeled as template)
b = page(10, "DATA", "数据图表")
b += f'''<rect x="64" y="190" width="760" height="430" rx="10" fill="{C['navy']}"/>
  <g stroke="{C['gray']}" stroke-width="1" opacity=".18">{''.join(f'<line x1="120" y1="{y}" x2="790" y2="{y}"/>' for y in (250, 330, 410, 490, 570))}</g>
  <polyline points="120,560 230,500 340,520 450,420 560,380 670,300 780,270" fill="none" stroke="{C['cyan']}" stroke-width="3"/>
  <polyline points="120,580 230,560 340,545 450,505 560,490 670,455 780,430" fill="none" stroke="{C['gray']}" stroke-width="2" stroke-dasharray="6 5"/>
  {''.join(f'<circle cx="{x}" cy="{y}" r="4" fill="{C["cyan"]}"/>' for x, y in [(120, 560), (230, 500), (340, 520), (450, 420), (560, 380), (670, 300), (780, 270)])}
  <text x="96" y="620" {MON}font-size="12" fill="{C['gray']}">01</text><text x="760" y="620" {MON}font-size="12" fill="{C['gray']}">12</text>
  <text x="120" y="228" {CJK}font-size="14" fill="{C['gray']}">示例结构 · 使用时必须替换为真实数据</text>
  <rect x="856" y="190" width="360" height="132" rx="10" fill="{C['navy']}" stroke="{C['gray']}" stroke-opacity=".3" stroke-width="1"/>
  <text x="884" y="232" {CJK}font-size="15" fill="{C['gray']}">年度总量</text>
  <text x="884" y="292" {INT}font-weight="900" font-size="44" fill="{C['white']}">XXXX<tspan {''}font-size="18" fill="{C['gray']}"> 单位</tspan></text>
  <rect x="856" y="338" width="360" height="132" rx="10" fill="{C['navy']}" stroke="{C['gray']}" stroke-opacity=".3" stroke-width="1"/>
  <text x="884" y="380" {CJK}font-size="15" fill="{C['gray']}">趋势 / 对比</text>
  <text x="884" y="440" {INT}font-weight="900" font-size="44" fill="{C['cyan']}">±X.X<tspan font-size="18" fill="{C['gray']}"> %</tspan></text>
  <rect x="856" y="486" width="360" height="134" rx="10" fill="{C['navy']}" stroke="{C['gray']}" stroke-opacity=".3" stroke-width="1"/>
  <text x="884" y="528" {CJK}font-size="15" fill="{C['gray']}">数据来源</text>
  <text x="884" y="566" {MON}font-size="15" fill="{C['body']}">watch / watch / api</text>'''
save(10, "data", b)

# 11 project case
b = page(11, "PROJECT CASE", "项目案例")
b += f'''<text x="64" y="230" {INT}font-weight="900" font-size="34" fill="{C['white']}">{'{'}Project Name{'}'}</text>
  <text x="64" y="268" {CJK}font-size="17" fill="{C['gray']}">一句话定位 · 方向标签 · 当前状态</text>
  <rect x="64" y="300" width="540" height="320" rx="10" fill="{C['navy']}" stroke="{C['gray']}" stroke-opacity=".3" stroke-width="1"/>
  <text x="334" y="470" text-anchor="middle" {CJK}font-size="16" fill="{C['gray']}">{'{'}产品截图 / 架构图{'}'}</text>
  {(metrics := "".join(f'<rect x="{640 + (i % 2) * 292}" y="{300 + (i // 2) * 168}" width="276" height="152" rx="10" fill="{C["navy"]}" stroke="{C["gray"]}" stroke-opacity=".3" stroke-width="1"/><text x="{668 + (i % 2) * 292}" y="{344 + (i // 2) * 168}" {CJK}font-size="14" fill="{C["gray"]}">{m}</text><text x="{668 + (i % 2) * 292}" y="{404 + (i // 2) * 168}" {INT}font-weight="900" font-size="34" fill="{C["white"]}">XXXX</text>' for i, m in enumerate(["指标 A", "指标 B", "指标 C", "指标 D"])))}'''
save(11, "case", b)

# 12 timeline
b = page(12, "TIMELINE", "时间线")
b += f'<line x1="84" y1="410" x2="1216" y2="410" stroke="{C["gray"]}" stroke-width="2" opacity=".4"/>'
cols = ["#38BDF8", "#FBBF24", "#34D399", "#FB7185", "#94A3B8"]
for i in range(5):
    x = 140 + i * 236
    up = i % 2 == 0
    yy = 360 if up else 460
    b += f'''<rect x="{x - 7}" y="403" width="14" height="14" fill="{cols[i]}"/>
  <text x="{x}" y="{yy - 30}" text-anchor="middle" {INT}font-weight="900" font-size="20" fill="{C['white']}">20XX.QX</text>
  <text x="{x}" y="{yy + 2}" text-anchor="middle" {CJK}font-size="15" fill="{C['body']}">{'{'}里程碑事件{'}'}</text>
  <line x1="{x}" y1="{yy + 14 if up else 396}" x2="{x}" y2="{392 if up else yy - 18}" stroke="{C['gray']}" stroke-width="1" opacity=".5"/>'''
save(12, "timeline", b)

# 13 image
b = page(13, "IMAGE", "图片展示")
corner = '<g fill="#2563EB"><rect x="64" y="190" width="26" height="4"/><rect x="64" y="190" width="4" height="26"/><rect x="988" y="190" width="26" height="4"/><rect x="1010" y="190" width="4" height="26"/><rect x="64" y="616" width="26" height="4"/><rect x="64" y="594" width="4" height="26"/><rect x="988" y="616" width="26" height="4"/><rect x="1010" y="594" width="4" height="26"/></g>'
b += f'''<rect x="64" y="190" width="950" height="430" fill="{C['navy']}" stroke="{C['gray']}" stroke-opacity=".4" stroke-width="1.5" stroke-dasharray="10 7"/>
  <text x="539" y="412" text-anchor="middle" {CJK}font-size="18" fill="{C['gray']}">{'{'}高分辨率图片：3:1 构图，深色优先{'}'}</text>
  <line x1="1046" y1="200" x2="1046" y2="620" stroke="{C['gray']}" stroke-opacity=".3"/>
  <text x="1068" y="236" {CJK}font-weight="700" font-size="17" fill="{C['white']}">图注</text>
  <text x="1068" y="272" {CJK}font-size="14" fill="{C['gray']}">来源、时间与说明；</text>
  <text x="1068" y="298" {CJK}font-size="14" fill="{C['gray']}">不得虚构数据与场景。</text>
  {corner}'''
save(13, "image", b)

# 14 quote
b = page(14, "QUOTE &amp; REFS", "引用与参考")
b += f'''<text x="64" y="320" {INT}font-weight="900" font-size="140" fill="{C['blue']}">“</text>
  <text x="150" y="300" {CJK}font-weight="700" font-size="38" fill="{C['white']}">引用原文最多两行，</text>
  <text x="150" y="356" {CJK}font-weight="700" font-size="38" fill="{C['white']}">出处必须标注。</text>
  <text x="150" y="420" {INT}font-size="18" letter-spacing="1" fill="{C['gray']}">— {'{'}Author, Title, Year{'}'}</text>
  <line x1="64" y1="500" x2="1216" y2="500" stroke="{C['gray']}" stroke-width="1" opacity=".3"/>
  <text x="64" y="540" {CJK}font-weight="700" font-size="18" fill="{C['cyan']}">参考资料</text>
  <text x="64" y="578" {MON}font-size="15" fill="{C['gray']}">[1] {'{'}ref — 全部可访问，不虚构来源{'}'}</text>'''
save(14, "quote", b)

# 15 summary
b = page(15, "SUMMARY", "总结")
for i, t in enumerate(["结论 1：回到核心观点", "结论 2：给出下一步行动", "结论 3：留下可验证的入口"]):
    b += f'''<g transform="translate(64,{220 + i * 130})">
  <text x="0" y="46" {INT}font-weight="900" font-size="42" fill="{C['gray']}" opacity=".4">{i + 1:02d}</text>
  <text x="86" y="44" {CJK}font-weight="700" font-size="28" fill="{C['white']}">{t}</text>
  <line x1="86" y1="70" x2="1150" y2="70" stroke="{C['gray']}" stroke-width="1" opacity=".25"/></g>'''
b += f'<rect x="64" y="600" width="1152" height="8" fill="{C['blue']}" opacity=".15"/><rect x="64" y="600" width="384" height="8" fill="{C['blue']}"/>'
save(15, "summary", b)

# 16 closing
b = bg("c16", 1280, 720) + f'''<ellipse cx="640" cy="300" rx="640" ry="460" fill="url(#glowc16)"/>
  {sym(640 - 132, 130, 2.75)}
  {wordmark(640, 480, 1.0)}
  <text x="640" y="560" text-anchor="middle" {CJK}font-size="22" fill="{C['body']}">谢谢 · 欢迎交流</text>
  <text x="640" y="600" text-anchor="middle" {MON}font-size="17" fill="{C['gray']}">zhubao315.github.io · github.com/zhubao315</text>
  {hairline(1280, 720, 712)}'''
save(16, "closing", b)
print("ppt-done")
