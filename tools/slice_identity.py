#!/usr/bin/env python3
# Strict slice of the approved ZHUBAO identity board. No drawing, no recoloring,
# no vectorization: every asset is a direct PIL crop of the source PNG.
from PIL import Image, ImageDraw
import os, hashlib, json
SRC = "/oc/gdmp/ZHUBAO Brand Identity System.png"
im = Image.open(SRC).convert("RGBA")
OUT = "/oc/zhubao-pages/public/brand/slices"
os.makedirs(OUT, exist_ok=True)
# name, crop box (left, top, right, bottom), description
SLICES = [
    ("symbol-panel.png",      (615, 105, 770, 235), "Panel A 图形标志 · Z-Grid symbol (flat)"),
    ("symbol-hero.png",       (130, 130, 445, 410), "左侧大图 · 3D hero symbol"),
    ("horizontal-lockup.png", (935, 105, 1445, 225), "Panel B 横向组合 · symbol + ZHUBAO + 朱宝"),
    ("stacked-lockup.png",    (600, 300, 790, 450),  "Panel C 纵向组合 · symbol / ZHUBAO / 朱宝"),
    ("mono-light.png",        (893, 310, 1015, 445), "Panel D 单色 · 黑 Z + 冷白底"),
    ("mono-dark.png",         (1042, 310, 1163, 445),"Panel D 单色 · 白 Z + 黑底"),
    ("reverse-lockup.png",    (1265, 300, 1455, 450),"Panel E 反白版本 · 深底组合"),
    ("wordmark-en.png",       (1120, 112, 1445, 170),"Panel B 英文品牌字标 ZHUBAO"),
    ("wordmark-zh.png",       (1185, 172, 1370, 220),"Panel B 中文辅助字标 朱宝 + 横线"),
    ("favicon-16.png",        (564, 708, 602, 748),  "Panel F favicon 16×16 展示样块"),
    ("favicon-32.png",        (633, 696, 689, 752),  "Panel F favicon 32×32 展示样块"),
    ("favicon-64.png",        (723, 686, 797, 758),  "Panel F favicon 64×64 展示样块"),
    ("favicon-128.png",       (822, 678, 907, 766),  "Panel F favicon 128×128 展示样块"),
    ("usage-dark.png",        (940, 855, 1215, 980), "Panel I 深色背景应用示例"),
    ("usage-light.png",       (1240, 855, 1495, 980),"Panel I 冷白背景应用示例"),
]
manifest = []
for name, box, desc in SLICES:
    crop = im.crop(box)
    path = os.path.join(OUT, name)
    crop.save(path)
    digest = hashlib.sha256(open(path, "rb").read()).hexdigest()[:16]
    manifest.append(dict(file=name, box=list(box), size=list(crop.size), sha256_16=digest, description=desc))
    print(f"{name:24s} {crop.size} {desc}")
# contact sheet (for review only; itself not an asset master)
cellw, cellh = 520, 240
sheet = Image.new("RGB", (cellw * 3, cellh * 5), (7, 17, 31))
d = ImageDraw.Draw(sheet)
for i, m in enumerate(manifest):
    pic = Image.open(os.path.join(OUT, m["file"])).convert("RGBA")
    pic.thumbnail((cellw - 24, cellh - 44))
    x = (i % 3) * cellw + 12; y = (i // 3) * cellh + 28
    sheet.paste(pic, (x, y), pic)
    d.text((x, (i // 3) * cellh + 6), m["file"] + "  " + str(tuple(m["box"])), fill=(148, 163, 184))
sheet.save(os.path.join(OUT, "CONTACT-SHEET.png"))
with open(os.path.join(OUT, "manifest.json"), "w") as f:
    json.dump(dict(source="ZHUBAO Brand Identity System.png", source_size=list(im.size),
                   method="direct pixel crop (no redraw / recolor / vectorization)", slices=manifest), f, ensure_ascii=False, indent=2)
# copy into local library too
LIB = "/oc/zhubao-brand/01-LOGO/slices"
os.makedirs(LIB, exist_ok=True)
for f in os.listdir(OUT):
    open(os.path.join(LIB, f), "wb").write(open(os.path.join(OUT, f), "rb").read())
print("done", len(manifest), "slices")
