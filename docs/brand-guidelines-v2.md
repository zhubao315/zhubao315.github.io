# ZHUBAO Brand Guidelines V2.1

**Brand:** ZHUBAO / 朱宝  
**Positioning:** Personal Brand & Digital Portfolio  
**System name:** Midnight Signal / 深空信号视觉体系（承载 Z-Grid 四向系统）  
**Version:** 2.1 · 2026-11（取代 2.0 暖纸色方案，内容架构不变；V2.2 起 Logo 生产资产改为定稿效果图切图版，矢量版转入 `public/brand/vector/`）  
**Source of truth:** this document, `src/styles/global.css` tokens, `src/styles/brand-v2.css`, `public/brand/`

---

## 1. Why the system moved to Midnight Signal

V2.0（Z-Grid · 暖纸编辑风）验证了四向内容与 Z 字系统图，但米白/暖纸基底读起来像复古出版物，弱化了这个网站真正承载的东西：AI 工程、知识系统、长期数据与数字创造。V2.1 保留全部内容与信息架构，只重建视觉基底：

> **深空蓝黑为品牌主场景，极地冷白为阅读场景，电光蓝为品牌记忆点，四向信号色为分类语言。**

### Brand idea

> 把想法变成系统，把知识沉淀为资产，把生活记录成可持续的实践。

### Brand statement

> Build Systems. Engineer Knowledge. Measure Life. Create Things.  
> 构建系统 · 工程知识 · 量化生活 · 创造作品

### Identity line

> BUILDER · RESEARCHER · RECORDER

### Visual keywords

**Modern · Intelligent · Technical · Editorial · Geometric · Dynamic**

严禁回退：米白色、奶油色、暖纸色、米黄色、复古纸张质感、大面积紫色霓虹、赛博朋克、随意彩虹渐变、过度玻璃拟态、模板化 SaaS UI。

---

## 2. Colour system

### 2.1 Brand core

| Token | Value | Role |
|---|---|---|
| `--canvas` | `#07111F` Midnight Black | 全站画布：Hero、Header、Footer、重点展示区 |
| `--navy` | `#0B1D33` Deep Navy | 品牌主色、深色面板 |
| `--navy-3` | `#13263D` Dark Surface | 数据面板、深色卡片 |
| `--electric` | `#2563EB` Electric Blue | 品牌强调：链接、交互态、焦点、记忆点 |
| `--sky` | `#38BDF8` Signal Cyan | 科技辅助、BUILD 方向色 |

### 2.2 Arctic neutrals（冷白中性，绝无暖底）

| Token | Value | Role |
|---|---|---|
| `--paper` / `--surface-light` | `#F7FAFF` Arctic White | 浅色阅读区底、深底上的文字 |
| `--paper-2` | `#EEF2F7` Cool Gray | 浅区面板 |
| `--paper-3` | `#D9E1EC` Border | 冷边界 |
| `--ink` | `#101828` | 浅区正文 |
| `--muted` | `#667085` | 次级文字 |
| `--line` | `rgba(16,24,40,*)` | 浅区分隔线 |
| `--line-dark` | `rgba(247,250,255,*)` | 深区分隔线 |

### 2.3 Four direction signals

| # | Code | 中文 | Territory | Signal |
|---|---|---|---|---|
| 01 | BUILD | 构建系统 | AI、Agent、Skills、软件架构、云原生 | `#38BDF8` 工程科技蓝 |
| 02 | THINK | 工程知识 | 知识工程、投资研究、心理、阅读 | `#FBBF24` 研究金 |
| 03 | MEASURE | 量化生活 | 健康、跑步、骑行、长期个人数据 | `#34D399` 成长绿 |
| 04 | CREATE | 创造作品 | 数字产品、人格探索、原创动画、视觉实验 | `#FB7185` 创意珊瑚 |

### 2.4 Usage ratio & rules

| 色域 | 占比 | 用途 |
|---|---|---|
| 深空蓝黑系 | ~40% | Hero、导航、Footer、四方向系统图、重点展示区 |
| 极地冷白系 | ~30% | 作品档案、文章阅读、研究内容、数据说明 |
| 深蓝灰面板 | ~20% | 卡片、数据面板、辅助区（深色区内） |
| 电光蓝 + 方向色 | ~10% | 品牌标识、交互、分类标记、重点数据 |

- 深浅必须**成节奏交替**，不允许全站纯黑，也不允许全站纯白。
- 方向色是分类器，不是装饰：一个内容块只使用一个方向色；系统图可同时出现四色。
- 方向色不用于小号正文（对比度不足），只用于标记、规则线、标签、大号数字。
- 电光蓝是**唯一全站交互强调色**（hover/focus/链接），方向色不承担交互语义。
- 旧暖色 `#F7F3EA` / `#EFE8DA` / `#E7DDCC` 及其 rgba 派生已全部清除，任何新代码不得重新引入。

---

## 3. Z-Grid logo · Midnight Signal 3D bar edition

The mark is a dimensional **Z** assembled from architectural bars（2026-11 客户定稿版，矢量重绘自品牌提案板）：

```
BUILD ●▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔● THINK
       ╲  gradient bars ╲
        ╲   white diagonal╲
MEASURE ●______________● CREATE
```

- 顶部横条：电光蓝渐变 `#2B73F6 → #86BDFD`，右上端 45° 斜切。
- 底部横条：电光蓝渐变 `#2563EB → #0F3A8C`，左上端 45° 斜切。
- 白色对角笔画（`#FFFFFF → #DDE9F7`）压在两横条之下，从 **THINK 节点**（右上）连到 **MEASURE 节点**（左下），45°。
- 对角右侧带一层深海军蓝阴影楔（`#0B3358` 渐隐），构成“层叠建筑”深度；这是标志唯一允许的阴影。
- 四个角部方形节点即四个方向：BUILD `#38BDF8`（左上）、THINK `#FBBF24`（右上）、MEASURE `#34D399`（左下）、CREATE `#FB7185`（右下）。
- 单位网格：节点 52u、横条高 50u、对角宽 58u、总画布 292 × 244。
- 变体：彩色符号 / 反白版 / 单色版（黑）/ 单色反白版（白）/ 横向组合 / 纵向组合。
- 标志**不放在圆角芯片里**（favicon / PWA / app 图标除外，芯片 `#0B1D33`）。

The mark is **not** a lightning bolt, an arrow, a letter in a generic rounded square, or four separate icons glued together.

### Production assets（V2.2 切图版）

站点 Header、Footer、favicon、OG、头像一律使用**定稿效果图的切图版**（`scripts/slice-logo.mjs` 从 `docs/brand-identity-board.png` 切出，柔和阴影按色彩距离渐隐抠底）。同名 `.svg` 是位图的光栅包装，避免老链接失效；`public/brand/vector/` 保存手绘矢量版，用于印刷与无限放大。

| Asset | Use |
|---|---|
| `zhubao-symbol.png` / `.svg` | 独立图形标志：Header 标记、图标与头像母版 |
| `zhubao-horizontal.png` / `.svg` | 网站横向 Logo（含 ZHUBAO + 朱宝词标）：Footer |
| `zhubao-stacked.png` / `.svg` | 纵向组合：封面、扉页、海报 |
| `zhubao-white.png` / `.svg` | 深色背景反白版 |
| `zhubao-mono.png` / `.svg` | 单色版（黑，浅底） |
| `zhubao-mono-reverse.png` / `.svg` | 单色反白版（白，深底） |
| `zhubao-appicon-512.png` / `zhubao-avatar-1024.png` | App 图标母版 / 社交头像 |
| `favicon.svg` / `.ico` / PNG set | 浏览器与 PWA（标志 + 深蓝圆角芯片） |
| `brand-logo-guide.pdf` | Logo 使用规范（A4 三页，`/brand/brand-logo-guide.pdf`） |
| `vector/zhubao-horizontal-inverse.svg` | 深底矢量横版（演示、印刷） |

### Clear space and minimum size

- Clear space ≥ 一个节点宽（符号的 1/5.6）。
- 符号最小 **24px** 数字 / **8mm** 印刷；横版最小 **140px** / **38mm**；竖版 **80px** / **24mm**。
- 不拉伸、不旋转、不加描边渐变阴影、不放Busy 照片上（需垫实底）。

---

## 4. Layout system

| Token | Value | Use |
|---|---|---|
| Shell | `1320px` | 最大内容宽 |
| Gutter | `clamp(20px, 4vw, 56px)` | 页边 |
| Grid | 12 columns | 桌面构成 |
| Hero split | 7 : 5 | 宣言 : Z-Grid 系统图 |
| Feature split | 8 : 4 / 4 : 8 | 交替项目媒体 |
| Section padding | `clamp(76px, 9vw, 136px)` | 默认节奏 |
| Rule | `1px` | 分隔线 |
| Radius | `0` default; `2px` controls; `12px` app icon only | 几何保持建筑感 |

Breakpoints: `1200 / 1000 / 900 / 768 / 640 / 480px`。验证宽度：1920 / 1440 / 1280 / 1024 / 768 / 430 / 390 / 375。

### Zone rhythm（V2.1 新增）

| Zone | 背景 | 文字 |
|---|---|---|
| Header / Footer | `--canvas` + blur | `--paper` |
| Hero、四方向系统图 | `--canvas` / `--navy` 渐变 | `--paper` |
| 作品档案、阅读、研究、数据说明 | `--surface-light` | `--ink` |
| 深色区内的卡片/面板 | `--navy-3` | `--paper` / `--muted-light` |

---

## 5. Typography

- 标题：Manrope（display）+ Instrument Serif（引文、宣言、编辑感大标题）。
- 正文：Inter。
- 代码、索引、状态、日期：Monospace。
- 字号阶梯与 V2.0 一致（见 `docs/brand-typography.md`）。

---

## 6. Components

- **Header:** 78px，`--canvas` 86% + blur；符号 + 词标 + `Z-GRID` 标签；双语导航；active 用 BUILD 青色规则线；GitHub/X；`BJ / UTC+8`；原生 `<details>` 移动菜单含 Escape。
- **Section header:** index + rule，eyebrow + headline，note + link；深/浅两版。
- **Buttons:** 电光蓝实底 / Arctic 文字为主按钮；深底用反白按钮；ghost 1px。最小高 50px。
- **Project card:** 浅区白面板（`#FFFFFF` + `--paper-3` 边界）；深区 navy-3 面板。真实封面或抽象视觉研究（标 `VISUAL STUDY · NOT A PRODUCT SCREENSHOT`）。
- **Direction card:** 深空场图 + 方向信号色。
- **Data snapshot:** value + unit + source + date。没有来源的数字不上页。
- **Footer:** `--canvas`，inverse lockup，四向链接，colophon。

---

## 7. Motion

- 入场：`opacity 0→1` + `translateY(24px)→0`，0.8s ease-out；45–120ms stagger。
- Hover 0.2–0.35s；箭头位移 2–4px；图片缩放 ≤ 1.03。
- 允许新增：节点信号色的微弱呼吸/连线描画（仅在 Hero 系统图，尊重 reduced-motion）。
- 禁止：视差、滚动劫持、自动播放视频、加载编排。`prefers-reduced-motion` 全部关闭。

---

## 8. Responsive principles

- 移动端是**重新编排**，不是缩放。
- Z-Grid 在 <768px 变 2×2 方向网格；Hero 宣言保持 4 行。
- 作品单列；筛选轨横向滚动而页面不溢出。
- 触控目标 ≥ 44px；无 hover-only 信息；移动端不加固定全屏背景与重模糊。

---

## 9. Application checklist

- [ ] 页面无任何暖色（米白/奶油/暖纸）出现。
- [ ] 深浅分区节奏正确，纯黑/纯白不铺满全站。
- [ ] 四向色顺序、色值、图标正确。
- [ ] 数字有来源与快照日期；original / modified / research 可见。
- [ ] Logo 使用 Midnight edition 资产。
- [ ] Focus、reduced-motion、移动菜单可用。
- [ ] Build、link check、Playwright 全绿；1440 与 390 截图更新。

---

## 10. Governance

- 品牌 Token 在 `src/styles/global.css :root`；品牌层规则在 `src/styles/brand-v2.css`。
- 场图深空版在 `src/assets/brand/`，来源与提示词见 `docs/brand-asset-inventory.md`。
- 新增强调色必须先定义语义角色 + 对比度检查 + 更新本文档。
- 新 Logo 变体必须原生 SVG + 16px 单色测试。
- 旧暖色仅允许出现在历史文档（V2.0 记录）中，代码内一律禁止。
