#!/usr/bin/env python3
import sys; sys.path.insert(0, "/oc/zhubao-brand/tools")
from zb import *

# ================= SUB-BRAND BANNERS =================
PROJECTS = [
    ("uskill", "uSkill", "个人技能构建系统", "BUILD", "#38BDF8", "把技能变成可运行的系统"),
    ("knowledge-engineering", "知识库工程学", "Knowledge Engineering", "THINK", "#FBBF24", "把知识沉淀为认知资产"),
    ("investment-discipline", "投资的纪律", "Investment Discipline", "THINK", "#FBBF24", "用规则对抗波动"),
    ("quantified-life", "健康与运动", "Health & Sports", "MEASURE", "#34D399", "用数据校准身体这台系统"),
    ("mbti64", "MBTI64", "人格探索系统", "CREATE", "#FB7185", "六十四型人格的数字化探索"),
    ("perfect-me", "Perfect Me", "自我塑造实验", "CREATE", "#FB7185", "动态几何与人格生成实验"),
]
for slug, en, zh, dirc, col, tag in PROJECTS:
    en, zh, tag = en.replace("&", "&amp;"), zh.replace("&", "&amp;"), tag.replace("&", "&amp;")
    b = bg(f"sb{slug[:4]}", 1584, 396) + f'''<ellipse cx="210" cy="198" rx="360" ry="320" fill="url(#glowsb{slug[:4]})" opacity=".8"/>
  {sym(90, 98, 2.0833, C['white'])}
  <rect x="90" y="98" width="200" height="200" fill="none"/>
  <rect x="90" y="98" width="200" height="6" fill="{col}"/>
  <text x="350" y="170" {INT}font-weight="900" font-size="66" letter-spacing="3" fill="{C['white']}">{en}</text>
  <text x="350" y="226" {CJK}font-weight="700" font-size="27" fill="{col}">{zh}</text>
  <text x="350" y="280" {CJK}font-size="19" fill="{C['body']}">{tag}</text>
  <rect x="1290" y="120" width="210" height="54" rx="27" fill="none" stroke="{C['gray']}" stroke-opacity=".5" stroke-width="1.5"/>
  <g transform="translate(1310,133) scale(0.23)">{sym0()}</g>
  <text x="1344" y="154" {INT}font-weight="800" font-size="15" letter-spacing="1.6" fill="{C['white']}">A ZHUBAO PROJECT</text>
  <rect x="1290" y="196" width="105" height="40" rx="6" fill="{col}" opacity=".16" stroke="{col}" stroke-width="1.2"/>
  <text x="1342" y="222" text-anchor="middle" {INT}font-weight="800" font-size="15" letter-spacing="2" fill="{col}">{dirc}</text>
  <text x="1290" y="286" {MON}font-size="15" fill="{C['gray']}">project.github.io</text>
  {hairline(1584, 396)}'''
    w(f"06-PRODUCTS/{slug}/zhubao-{slug}-banner-1584x396.svg", svg(1584, 396, b, px=True))
    png(f"06-PRODUCTS/{slug}/zhubao-{slug}-banner-1584x396.svg", f"06-PRODUCTS/{slug}/zhubao-{slug}-banner-1584x396.png", 1584)

# ================= SI =================
# presentation backdrop 3840x2160 with safe-area guides
b = bg("pd", 3840, 2160, ) + f'''<ellipse cx="1920" cy="900" rx="1500" ry="1100" fill="url(#glowpd)"/>
  <polygon points="2600,200 3240,200 1640,1960 1000,1960" fill="{C['white']}" opacity=".035"/>
  <polygon points="3240,200 3360,200 1760,1960 1640,1960" fill="{C['cyan']}" opacity=".07"/>
  <rect x="192" y="108" width="3456" height="1944" fill="none" stroke="{C['gray']}" stroke-width="2" stroke-dasharray="14 10" opacity=".45"/>
  <text x="210" y="92" {CJK}font-size="22" fill="{C['gray']}" opacity=".8">安全区 SAFE AREA · 演讲者与标题请勿越过虚线</text>
  <g transform="translate(1843,1690) scale(1.6)">{sym0()}</g>
  <text x="1920" y="1912" text-anchor="middle" {INT}font-weight="900" font-size="30" letter-spacing="8" fill="{C['white']}">ZHUBAO</text>
  <text x="1920" y="1952" text-anchor="middle" {INT}font-size="15" letter-spacing="2" fill="{C['gray']}">Build Systems · Engineer Knowledge · Measure Life · Create Things</text>
  {chips(1180, 350, 1.4, gap=460)}
  {hairline(3840, 2160, 2144)}'''
w("07-SI/presentation/zhubao-presentation-backdrop-3840x2160.svg", svg(3840, 2160, b, px=True))
png("07-SI/presentation/zhubao-presentation-backdrop-3840x2160.svg", "07-SI/presentation/zhubao-presentation-backdrop-3840x2160.png", 1600)

# video-call background 1920x1080
b = bg("vc", 1920, 1080) + f'''<rect width="1920" height="1080" fill="{C['midnight']}" opacity=".35"/>
  <ellipse cx="1600" cy="250" rx="700" ry="500" fill="url(#glowvc)" opacity=".8"/>
  <polygon points="300,120 520,120 90,960 -130,960" fill="{C['white']}" opacity=".03"/>
  <g transform="translate(1700,92) scale(0.9)">{sym0()}</g>
  <text x="1700" y="212" {INT}font-weight="800" font-size="20" letter-spacing="3" fill="{C['gray']}">ZHUBAO</text>
  <text x="1700" y="240" {CJK}font-size="15" fill="{C['gray']}" opacity=".7">朱宝 · 个人品牌</text>
  {hairline(1920, 1080, 1070)}'''
w("07-SI/presentation/zhubao-video-call-background-1920x1080.svg", svg(1920, 1080, b, px=True))
png("07-SI/presentation/zhubao-video-call-background-1920x1080.svg", "07-SI/presentation/zhubao-video-call-background-1920x1080.png", 1200)

# event poster 1080x1920
b = bg("ep", 1080, 1920) + f'''<ellipse cx="540" cy="420" rx="620" ry="520" fill="url(#glowep)"/>
  {sym(340, 180, 4.1667)}
  <text x="540" y="800" text-anchor="middle" {INT}font-weight="900" font-size="72" fill="{C['white']}">{'{'}活动标题{'}'}</text>
  <text x="540" y="860" text-anchor="middle" {CJK}font-weight="700" font-size="30" fill="{C['cyan']}">{'{'}Event Title · 副标题{'}'}</text>
  <line x1="180" y1="940" x2="900" y2="940" stroke="{C['gray']}" stroke-width="1" opacity=".3"/>
  <text x="540" y="1010" text-anchor="middle" {CJK}font-size="24" fill="{C['body']}">{'{'}日期 Date · 时间 Time{'}'}</text>
  <text x="540" y="1058" text-anchor="middle" {CJK}font-size="24" fill="{C['body']}">{'{'}地点 Venue / 线上平台{'}'}</text>
  <text x="540" y="1160" text-anchor="middle" {CJK}font-size="20" fill="{C['gray']}">{'{'}演讲者：朱宝 ZHUBAO · Builder / Researcher / Recorder{'}'}</text>
  {chips(150, 1280, 1.0, gap=200)}
  <line x1="120" y1="1700" x2="960" y2="1700" stroke="{C['gray']}" stroke-width="1" opacity=".3"/>
  <text x="540" y="1760" text-anchor="middle" {MON}font-size="20" fill="{C['gray']}">zhubao315.github.io</text>
  {hairline(1080, 1920, 1908)}'''
w("07-SI/event/zhubao-event-poster-1080x1920.svg", svg(1080, 1920, b, px=True))
png("07-SI/event/zhubao-event-poster-1080x1920.svg", "07-SI/event/zhubao-event-poster-1080x1920.png", 720)

# ================= MOTION: animated logo build (16:9 + 1:1) =================
STYLE = '''<style>
  .nd{opacity:0;animation:pop .5s var(--e,cubic-bezier(.2,0,0,1)) forwards}
  .bar{transform:scaleX(0);animation:grow .6s cubic-bezier(.2,0,0,1) forwards}
  .diag{opacity:0;animation:draw .7s cubic-bezier(.2,0,0,1) .9s forwards}
  .wm{opacity:0;animation:rise .7s cubic-bezier(.2,0,0,1) 1.5s forwards}
  .tg{opacity:0;animation:rise .6s ease 2.1s forwards}
  @keyframes pop{to{opacity:1}}
  @keyframes grow{to{transform:scaleX(1)}}
  @keyframes draw{to{opacity:1}}
  @keyframes rise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
</style>'''
def logo_anim(w_, h_, s, cx, cy, tg=True):
    ox, oy = cx - 48 * s, cy - 48 * s
    t = f'translate({ox},{oy}) scale({s})'
    b = bg(f"ma{int(w_)}", w_, h_)
    b += STYLE
    b += f'''<ellipse cx="{cx}" cy="{cy}" rx="{220*s}" ry="{200*s}" fill="url(#glowma{int(w_)})" opacity=".85"/>
  <g transform="{t}">
    <g class="bar" style="animation-delay:.15s;transform-origin:0px 14px"><rect x="12" y="8" width="72" height="12" fill="{C['blue']}"/></g>
    <g class="bar" style="animation-delay:.35s;transform-origin:0px 82px"><rect x="12" y="76" width="72" height="12" fill="{C['blue']}"/></g>
    <polygon class="diag" points="{DIAG}" fill="{C['white']}"/>
    <rect class="nd" style="animation-delay:.05s" x="0" y="8" width="12" height="12" fill="{C['cyan']}"/>
    <rect class="nd" style="animation-delay:.25s" x="84" y="8" width="12" height="12" fill="{C['think']}"/>
    <rect class="nd" style="animation-delay:.45s" x="0" y="76" width="12" height="12" fill="{C['measure']}"/>
    <rect class="nd" style="animation-delay:.6s" x="84" y="76" width="12" height="12" fill="{C['create']}"/>
  </g>
  <g class="wm">
    <text x="{cx}" y="{cy + 62 * s}" text-anchor="middle" {INT}font-weight="900" font-size="{int(30 * s)}" letter-spacing="{int(6 * s)}" fill="{C['white']}">ZHUBAO</text>
    <text x="{cx}" y="{cy + 62 * s + 34 * s}" text-anchor="middle" {CJK}font-weight="700" font-size="{int(14 * s)}" letter-spacing="{int(4 * s)}" fill="{C['gray']}">朱宝</text>
  </g>
  {'<g class="tg"><text x="' + str(cx) + '" y="' + str(cy + 62 * s + 78 * s) + '" text-anchor="middle" ' + INT + 'font-size="' + str(int(9 * s)) + '" letter-spacing="1.5" fill="#94A3B8">Build Systems · Engineer Knowledge · Measure Life · Create Things</text></g>' if tg else ''}'''
    return svg(w_, h_, b, px=True)
w("08-MOTION/logo-animation/zhubao-logo-animation-16x9.svg", logo_anim(1280, 720, 2.4, 640, 300))
w("08-MOTION/logo-animation/zhubao-logo-animation-1x1.svg", logo_anim(1080, 1080, 2.6, 540, 460, tg=False))
w("08-MOTION/logo-animation/zhubao-logo-animation-9x16.svg", logo_anim(720, 1280, 2.2, 360, 520, tg=False))
print("rest-done")
