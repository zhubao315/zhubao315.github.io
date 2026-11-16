#!/usr/bin/env python3
# ZHUBAO typography specimen + logo usage guidelines board
import subprocess
B = "/oc/zhubao-brand"
INK = "#F7FAFF"; MUT = "#94A3B8"; ACC = "#2563EB"
def w(p, s): open(f"{B}/{p}", "w", encoding="utf-8").write(s)
def png(src, dst, wp): subprocess.run(["rsvg-convert", "-w", str(wp), src, "-o", dst], check=True)
def svg(wv, hv, body): return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {wv} {hv}">\n{body}\n</svg>'
INT = 'font-family="Inter" '; CJK = 'font-family="Noto Sans CJK SC" '; MON = 'font-family="Noto Sans Mono" '

# ---------- typography specimen ----------
rows = [
    ("Display XL", "--zb-fs-display-xl", "96 / 900 / 1.1", 72, 900, "Build Systems", "构建系统", True),
    ("Display L", "--zb-fs-display-l", "72 / 900 / 1.1", 54, 900, "Engineer Knowledge", "工程知识", True),
    ("Heading 1", "--zb-fs-h1", "56 / 900 / 1.1", 44, 900, "Measure Life", "量化生活", True),
    ("Heading 2", "--zb-fs-h2", "40 / 700 / 1.25", 34, 700, "Create Things", "创造作品", True),
    ("Heading 3", "--zb-fs-h3", "28 / 700 / 1.3", 26, 700, "Knowledge Engineering", "知识库工程学", False),
    ("Heading 4", "--zb-fs-h4", "22 / 700 / 1.35", 21, 700, "Investment Discipline", "投资的纪律", False),
    ("Heading 5", "--zb-fs-h5", "18 / 700 / 1.4", 18, 700, "Personal AI Lab", "个人数字工作室", False),
    ("Heading 6", "--zb-fs-h6", "16 / 700 / 1.4", 16, 700, "Label Section", "栏目标题", False),
    ("Body Large", "--zb-fs-body-l", "20 / 400 / 1.65", 19, 400, "Build systems that outlive trends.", "把想法构建成可以长期运行的系统。", False),
    ("Body Regular", "--zb-fs-body", "17 / 400 / 1.65", 17, 400, "Engineer knowledge into durable assets.", "把知识沉淀为可复用的认知资产。", False),
    ("Body Small", "--zb-fs-body-s", "15 / 400 / 1.6", 15, 400, "Measure life with honest data.", "用真实的数据记录和改善生活。", False),
    ("Caption", "--zb-fs-caption", "13 / 400 / 1.5", 13, 400, "Data source · personal tracking, 2026", "数据来源 · 个人记录，2026", False),
    ("Label", "--zb-fs-label", "12 / 700 / 1.4, ls 0.08em", 12, 700, "BUILD · THINK · MEASURE · CREATE", "四大方向", False),
]
b = f'<rect width="1400" height="2240" fill="#07111F"/>'
b += f'<text x="80" y="96" {INT}font-weight="900" font-size="40" letter-spacing="2" fill="{INK}">ZHUBAO TYPOGRAPHY SYSTEM</text>'
b += f'<text x="80" y="134" {CJK}font-size="18" fill="{MUT}">字体与排印体系 · Inter / Noto Sans CJK SC · 理性 · 工程感 · 高对比层级</text>'
b += f'<rect x="80" y="158" width="56" height="5" fill="{ACC}"/>'
y = 250
for name, tok, meta, fs, fw, en, zh, is_display in rows:
    ls = ' letter-spacing="6"' if is_display else (' letter-spacing="1"' if name in ("Display L", "Heading 1") else "")
    ls2 = ' letter-spacing="1.5"' if name == "Label" else ""
    wgt = fw
    b += f'''<line x1="80" y1="{y-44}" x2="1320" y2="{y-44}" stroke="{MUT}" stroke-width="1" opacity=".2"/>
  <text x="80" y="{y}" {INT}font-weight="700" font-size="14" fill="{ACC}">{name}</text>
  <text x="80" y="{y+24}" {MON}font-size="12" fill="{MUT}">{tok}</text>
  <text x="80" y="{y+44}" {INT}font-size="12" fill="{MUT}">{meta}</text>
  <text x="340" y="{y+{True: 10, False: 8}[is_display]}" {INT}font-weight="{wgt}" font-size="{fs}"{ls} fill="{INK}">{en}</text>
  <text x="340" y="{y+{True: 58, False: 34}[is_display]}" {CJK}font-weight="{min(fw,700)}" font-size="{int(fs*0.72)}"{ls2} fill="#CBD6E6">{zh}</text>'''
    dy = {True: 132, False: 96}[is_display] if fs > 30 else (84 if fs > 20 else 72)
    y += dy
b += f'''<line x1="80" y1="{y-30}" x2="1320" y2="{y-30}" stroke="{MUT}" stroke-width="1" opacity=".2"/>
  <text x="80" y="{y+8}" {INT}font-weight="700" font-size="14" fill="{ACC}">Code / Data</text>
  <text x="340" y="{y+8}" {MON}font-size="16" fill="#CBD6E6">SELECT build, think, measure, create FROM zhubao;</text>
  <text x="340" y="{y+48}" {INT}font-weight="900" font-size="46" fill="{INK}">2 468<tspan font-size="20" fill="{MUT}">.7 km</tspan></text>
  <text x="700" y="{y+48}" {CJK}font-size="15" fill="{MUT}">Data Number · tabular 数字用等宽对齐，单位缩小降权</text>
  <line x1="80" y1="{y+86}" x2="1320" y2="{y+86}" stroke="{MUT}" stroke-width="1" opacity=".2"/>
  <text x="80" y="{y+122}" {INT}font-weight="700" font-size="14" fill="{ACC}">混排规则</text>
  <text x="340" y="{y+122}" {CJK}font-size="16" fill="#CBD6E6">中英文之间留一个空格：用 Agent 重构 <tspan fill="{MUT}">|</tspan> 数字与中文之间留空格：共 12 个项目</text>
  <text x="340" y="{y+152}" {CJK}font-size="16" fill="#CBD6E6">英文专有名词保持原文：GitHub · OpenAI · Manrope，不生硬翻译</text>
  <text x="80" y="{y+210}" {INT}font-weight="700" font-size="14" fill="{ACC}">禁止</text>
  <text x="340" y="{y+210}" {CJK}font-size="16" fill="#94A3B8">装饰性字体 · 大面积全大写正文 · 正文使用细于 400 的字重 · 四方向色用于大段文字</text>'''
w("02-VI/typography/zhubao-typography-specimen.svg", svg(1400, y + 280, b))
png("02-VI/typography/zhubao-typography-specimen.svg", "09-EXPORTS/png/zhubao-typography-specimen.png", 1400)
print("typo-done")

# ---------- logo usage / guidelines board ----------
DIAG = "70,19 96,19 40,77 14,77"
def sym(x, y, s, c=None):
    return f'<g transform="translate({x},{y}) scale({s})">{_sym0(c)}</g>'
def _sym0(c=None):
    if c is None:
        return f'''<polygon points="{DIAG}" fill="#F7FAFF"/>
    <rect x="12" y="8" width="72" height="12" fill="#2563EB"/><rect x="12" y="76" width="72" height="12" fill="#2563EB"/>
    <rect x="0" y="8" width="12" height="12" fill="#38BDF8"/><rect x="84" y="8" width="12" height="12" fill="#FBBF24"/>
    <rect x="0" y="76" width="12" height="12" fill="#34D399"/><rect x="84" y="76" width="12" height="12" fill="#FB7185"/>'''
    return f'''<rect x="0" y="8" width="96" height="12" fill="{c}"/><rect x="0" y="76" width="96" height="12" fill="{c}"/>
    <polygon points="{DIAG}" fill="{c}"/>'''
def symg(x, y, s, tr="", c=None):
    return f'<g transform="translate({x},{y}){tr}"><g transform="scale({s})">{_sym0(c)}</g></g>'
u = f'<rect width="1680" height="1260" fill="#F7FAFF"/>'
u += f'''<text x="64" y="84" {INT}font-weight="900" font-size="34" fill="#07111F">ZHUBAO LOGO USAGE</text>
  <text x="64" y="118" {CJK}font-size="17" fill="#475569">Logo 使用规范 · 安全距离 / 最小尺寸 / 背景 / 禁止用法 · 网格单位 u = 12（8×8 体系）</text>
  <rect x="64" y="138" width="56" height="5" fill="#2563EB"/>
  <text x="64" y="196" {CJK}font-weight="700" font-size="18" fill="#07111F">安全距离 Clear Space — 四周 ≥ 1u（节点边长）</text>
  <rect x="64" y="230" width="352" height="352" fill="none" stroke="#94A3B8" stroke-width="1.5" stroke-dasharray="7 6"/>
  <rect x="112" y="278" width="256" height="256" fill="#07111F" rx="8"/>
  <rect x="112" y="278" width="256" height="256" fill="none" stroke="#2563EB" stroke-width="1.5"/>
  {sym(112, 278, 2.6667, "#0B1D33")}
  <text x="72" y="266" {INT}font-size="13" fill="#2563EB">≥1u</text>
  <text x="64" y="640" {CJK}font-weight="700" font-size="18" fill="#07111F">最小尺寸 Minimum Size</text>
  <text x="64" y="670" {CJK}font-size="15" fill="#475569">数字屏幕：图形 16px / 组合标 120px 宽 · 印刷：图形 6mm / 组合标 36mm 宽</text>
  {sym(64, 724, 0.1667, "#0B1D33")} {sym(100, 708, 0.3333, "#0B1D33")} {sym(160, 692, 0.5, "#0B1D33")} {sym(256, 660, 0.8333, "#0B1D33")}
  <text x="64" y="770" {INT}font-size="13" fill="#475569">16px</text><text x="104" y="770" {INT}font-size="13" fill="#475569">32px</text><text x="172" y="770" {INT}font-size="13" fill="#475569">48px</text><text x="272" y="770" {INT}font-size="13" fill="#475569">80px</text>
  <rect x="500" y="180" width="1116" height="460" rx="16" fill="#07111F"/>
  <text x="532" y="228" {CJK}font-weight="700" font-size="18" fill="#F7FAFF">背景 Background</text>
  {sym(532, 260, 2.0)}
  <rect x="1010" y="260" width="280" height="192" rx="10" fill="#F7FAFF"/>{sym(1092, 292, 1.1667, "#0B1D33")}
  <text x="1044" y="492" {INT}font-size="14" fill="#94A3B8" text-anchor="start" >浅色背景 → 单色版</text>
  <rect x="1320" y="260" width="260" height="192" rx="10" fill="none" stroke="#94A3B8" stroke-dasharray="6 6"/>
  <text x="1350" y="330" {CJK}font-size="14" fill="#94A3B8">复杂背景 →</text><text x="1350" y="358" {CJK}font-size="14" fill="#94A3B8">加暗色底板或</text><text x="1350" y="386" {CJK}font-size="14" fill="#94A3B8">使用单色版</text>
  <text x="532" y="620" {CJK}font-size="14" fill="#94A3B8">优先：深空蓝黑 #07111F / 极地冷白上的单色版 · 次选：深海军蓝卡片 #0B1D33</text>
  <text x="500" y="720" {INT}font-weight="900" font-size="26" fill="#07111F">禁止用法 MISUSE</text>'''
m = [("拉伸变形", "translate(16,30) scale(1.6,0.8)", ""), ("旋转", "rotate(12)", ""), ("改色", "", "#94A3B8"),
     ("投影发光", "", None), ("描边", "", None), ("遮挡", "", None)]
# simpler: hand-write 6 misuse tiles
def tile(x, y, label, inner, bad=True):
    return f'''<rect x="{x}" y="{y}" width="340" height="230" rx="14" fill="#EDF3FB"/>
  {inner}
  <line x1="{x+310}" y1="{y+24}" x2="{x+324}" y2="{y+38}" stroke="#FB7185" stroke-width="4"/><line x1="{x+324}" y1="{y+24}" x2="{x+310}" y2="{y+38}" stroke="#FB7185" stroke-width="4"/>
  <text x="{x+24}" y="{y+206}" {CJK}font-weight="700" font-size="15" fill="#07111F">{label}</text>'''
u += tile(500, 760, "不得拉伸 / 压扁", f'<g transform="translate(610,835) scale(2.25,1.125)"><g>{_sym0("#0B1D33")}</g></g>')
u += tile(888, 760, "不得旋转倾斜", f'<g transform="translate(965,800) rotate(12) scale(1.6)"><g>{_sym0("#0B1D33")}</g></g>')
u += tile(1276, 760, "不得改变节点颜色", '<g transform="translate(1369,798) scale(1.6)"><polygon points="70,19 96,19 40,77 14,77" fill="#F7FAFF"/><rect x="12" y="8" width="72" height="12" fill="#64748B"/><rect x="12" y="76" width="72" height="12" fill="#64748B"/><rect x="0" y="8" width="12" height="12" fill="#64748B"/><rect x="84" y="8" width="12" height="12" fill="#64748B"/><rect x="0" y="76" width="12" height="12" fill="#64748B"/><rect x="84" y="76" width="12" height="12" fill="#64748B"/></g>')
u += tile(500, 1020, "不得添加投影或发光", f'<g transform="translate(593,1058) scale(1.6)" filter="url(#sh)"><g>{_sym0("#0B1D33")}</g></g>')
u += tile(888, 1020, "不得添加描边轮廓", '<g transform="translate(981,1058) scale(1.6)"><g>' + _sym0("#0B1D33").replace('fill="#0B1D33"', 'fill="#0B1D33" stroke="#07111F" stroke-width="3"') + "</g></g>")
u += tile(1276, 1020, "不得遮挡或裁切主体", f'{symg(1369, 1058, 1.6)}<circle cx="1500" cy="1150" r="46" fill="#FBBF24" opacity=".85"/>')
u += '<defs><filter id="sh" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="6" dy="10" stdDeviation="8" flood-color="#0B1D33" flood-opacity="0.6"/></filter></defs>'
w("01-LOGO/logo-usage-board.svg", f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1680 1260">\n{u}\n</svg>'.replace('class=""', ''))
png("01-LOGO/logo-usage-board.svg", "09-EXPORTS/png/zhubao-logo-usage-board.png", 1680)
print("usage-done")
