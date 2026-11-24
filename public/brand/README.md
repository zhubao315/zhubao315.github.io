> **发布说明 · 2026-11-16**：这里是 ZHUBAO CIS v1.0.0 全量资料（CI / VI / SI / 数字 / 出版 / 数据 / 空间 / 动态 / 资产治理）。
> **Logo 权威资产 = `01-LOGO/` 与 `slices/` 下的严格切图版**（直接从品牌板像素裁切，零重绘）。
> 早期重绘的矢量 Logo 已从发布目录移除，请勿使用；四站运行的是 ACTIVE 2.0 品牌系统（`zhubao315/active-watch`）。
> 来源板：`slices/SOURCE.png` · 裁切坐标与哈希：`slices/manifest.json`。

> **重复二进制说明**：`SOURCE.png`、`CONTACT-SHEET.png` 以及 `favicon-*.png` 等文件在 `01-LOGO/` 与 `slices/` 下**逐字节相同**（SHA256 一致，见 `slices/manifest.json`）。这些是同一权威切图集的两处拷贝；后续应集中去重（保留一份并由 manifest 引用），但不要删除或改动二进制文件，也不要修改 manifest 哈希。

# ZHUBAO Brand Identity System

> **MIDNIGHT SIGNAL · BRAND SYSTEM**
> One Identity. Multiple Expressions.
> 一套识别，多种表达。 · v1.0.0 · 2026-11

ZHUBAO（朱宝）个人品牌的全量 CIS 资产库：CI 理念识别 / VI 视觉识别 / SI 空间与场景识别。
母品牌提供统一语言，子项目保留独立识别。

## 品牌速览

| 项目 | 规范 |
| --- | --- |
| 品牌名称 | ZHUBAO / 朱宝 |
| 品牌符号 | Z-Grid（Z 形网格 + 四方向节点） |
| 品牌体系 | Midnight Signal |
| 品牌身份 | Builder · Researcher · Recorder |
| 品牌口号 | Build Systems. Engineer Knowledge. Measure Life. Create Things. |
| 中文口号 | 构建系统 · 工程知识 · 量化生活 · 创造作品 |

**四方向**：BUILD `#38BDF8` · THINK `#FBBF24` · MEASURE `#34D399` · CREATE `#FB7185`
**主色**：Midnight `#07111F` · Deep Navy `#0B1D33` · Electric Blue `#2563EB` · Signal Cyan `#38BDF8` · Arctic White `#F7FAFF` · Cool Gray `#94A3B8`

## Z-Grid 几何定义（唯一母版真相）

```
网格：8×8 单位（u = 12，画布 96×96）
上横条：rect(12, 8, 72×12)  #2563EB     下横条：rect(12, 76, 72×12) #2563EB
四节点：12×12  左上 #38BDF8 / 右上 #FBBF24 / 左下 #34D399 / 右下 #FB7185
白色对角线：45° 平行四边形 polygon(70,19 96,19 40,77 14,77)  #F7FAFF（视厚 ≈ 1.5u）
绘制顺序：对角线 → 横条 → 节点（节点压在所有线条之上）
```

任何衍生资产必须从 `01-LOGO/master/` 的 SVG 派生，禁止用 AI 图像模型重新生成 Logo。

## 目录导航

```
00-CI/          品牌战略 · 故事 · 语言体系 · 定位（4 份手册）
01-LOGO/        master/dark/light/monochrome/favicon + 使用规范
02-VI/          colors · typography · patterns · icons · design-tokens
03-DIGITAL/     website(OG/Hero) · github(头像/Banner/仓库卡) · social(X/帖子) · avatar · video
04-DOCUMENTS/   powerpoint(16 页可编辑母版) · reports(年报封面/分享卡)
05-PUBLISHING/  book-cover(封面/封底/书脊/立体) · book-interior(跨页) · ebook
06-PRODUCTS/    6 个子项目 Banner（uSkill · MBTI64 · 知识库工程学 · 投资的纪律 · 健康与运动 · Perfect Me）+ QL Dashboard
07-SI/          presentation(3840×2160) · office(名片/数字名片/介绍卡) · event(海报) · studio(概念规范)
08-MOTION/      Logo 构建动画（16:9 / 1:1 / 9:16，浏览器播放）+ 动效规范
09-EXPORTS/     全部 PNG 汇总（含 ppt/ 16 页）
10-DOCUMENTATION/ 使用总则 · 资产索引 · 变更日志 · 验收报告
tools/          全部生成脚本（可复现：python3 tools/gen_*.py）
```

## 使用规则（摘要，全文见 `10-DOCUMENTATION/usage-rules.md`）

1. 深底用彩色版或反白版；浅底用 midnight 单色版；禁止在复杂背景上直接放彩色版。
2. 安全距离 ≥ 1 个节点边长（1u）；数字屏图形最小 16px。
3. 四方向色只用于对应内容域，禁止装饰性平铺；禁止米白/奶油/暖纸色。
4. 子项目保留自己的 Logo 与配色，ZHUBAO 以「A ZHUBAO PROJECT」署名背书。
5. 占位符 `{'{'}…{'}'}`、`XXXX`、二维码框为**待替换占位**，禁止带占位发布；不得虚构联系方式、数据、ISBN、经历。

## 重新生成 / 扩展

```bash
python3 tools/gen_logo.py     # Logo 母版与 Favicon
python3 tools/gen_vi.py       # 色彩板 · 图标 · Pattern · Tokens
python3 tools/gen_typo.py     # 字体样本 · Logo 使用规范板
python3 tools/gen_digital.py  # GitHub / 社交 / 官网 / 视频
python3 tools/gen_cards.py    # 名片 · 数字名片 · 介绍卡
python3 tools/gen_ppt.py      # 16 页演示母版
python3 tools/gen_pub.py      # 出版 · 数据报告
python3 tools/gen_rest.py     # 子品牌 · SI · 动画
```

所有几何常量集中在 `tools/zb.py`，改一处即全局再生。
