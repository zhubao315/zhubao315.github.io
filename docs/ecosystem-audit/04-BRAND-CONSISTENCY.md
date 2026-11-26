# 04 · 品牌一致性（Ecosystem Audit）

> **审计日期：** 2026-11-25 · **范围：** `zhubao315.github.io`、`active-watch`、`uRead`、`uSkill` 的远端 `main`。
> **方式：** 只读审计；取值以实际代码/CSS 为事实源，文档冲突单独标注为 drift。

## 0. 结论摘要

- **ZHUBAO 母品牌运行时事实源**：`src/styles/global.css:6-51`（Midnight Signal 冷色板）+ `src/styles/brand-v2.css:8-26`（方向别名与 Z-Grid 层）。`docs/design-system.md` 仍是 V2.0 暖纸色板，**与实现差一整个配色世代**。
- **ACTIVE 子品牌事实源**：`active-watch/brand/brand-tokens.css`，SHA-256 与四站副本完全一致（`a9976974…`），由 `brand/sync.sh` 逐字节复制分发，而非 npm 包。
- **ACTIVE 三层护栏**：`BRAND_MANIFEST.sha256`（文件哈希，实际在四站仓库根）、`brand-contract.mjs`（浏览器可测契约）、`scripts/patrol.mjs`（每日线上巡检，单 issue 上报）。
- **不存在**跨站共享组件库或 token 包；uRead / uSkill 各自持有独立调色板，属于**未声明的联邦式品牌**。
- 已确认问题：Fira Code 400/500 字节重复、旧 Z 形 Logo 二进制在 5 仓重复分发、ACTIVE 规范内部「PNG 母版 vs SVG 母版」矛盾、uRead 四层 token 定义互不一致、品牌文档版本落后一代。

## 1. 规范 Token 表

### 1.1 ZHUBAO 主品牌（运行时权威）

| Token | Value | Meaning |
|---|---|---|
| `--canvas` / `--navy-2` | `#07111f` | Midnight Black：Header/Hero/Footer |
| `--paper` / `--surface-light` | `#f7faff` | Arctic White：浅色阅读底 |
| `--paper-2` / `--paper-3` | `#eef2f7` / `#d9e1ec` | 面板 / 冷灰边框 |
| `--navy` / `--navy-3` | `#0b1d33` / `#13263d` | 深场 / raised surface |
| `--ink` / `--muted` / `--muted-light` | `#101828` / `#667085` / `#94a3b8` | 文本层级 |
| `--electric` / `--electric-ink` / `--electric-hi` | `#2563eb` / `#1d4ed8` / `#60a5fa` | 交互蓝家族 |
| `--sky` / `--gold` | `#38bdf8` / `#fbbf24` | 别名到 `--build` / `--think` |
| `--build` / `--think` / `--measure` / `--create` | `#38bdf8` / `#fbbf24` / `#34d399` / `#fb7185` | 四方向分类色 |
| `--grid-line(-dark)` | `rgba(16,24,40,.07)` / `rgba(247,250,255,.09)` | Z-Grid 网格 |
| `--brand-shadow(-dark)` | `14px 14px 0 var(--paper-3)` / `14px 14px 0 rgba(4,10,20,.55)` | 硬边投影 |
| `--serif` / `--sans` / `--display` / `--mono` | Instrument Serif / Inter Variable / Manrope Variable / SFMono | 字体栈 |
| `--shell` / `--gutter` | `1320px` / `clamp(20px,4vw,56px)` | 布局 |
| `--ease` / `--ease-out` | `cubic-bezier(.22,.72,.2,1)` / `cubic-bezier(.16,1,.3,1)` | 动效 |

### 1.2 ACTIVE 子品牌

深/浅底色、字体、网格、缓动、Logo 语言 70% 继承主站；30% 专属：四站强调色（health `#38bdf8`、running `#d9f36a`、cycling `#fbbf24`、hiking `#34d399`）、运动图标、主题注入。主题键 `zhubao315-theme`，`data-theme` 仅 `dark | light`；禁止 `ZB ACTIVE` 字标。指标语义色（sleep/hrv/rhr/stress/load）不可被站点强调色覆盖。

### 1.3 Z-Grid 规则

8×8 单位（u=12，画布 96×96）：上下横条 `rect(12,8/76,72×12)` `#2563EB`；四节点 12×12 四方向色；白色对角线 `polygon(70,19 96,19 40,77 14,77)`。绘制顺序：对角线 → 横条 → 节点。唯一母版为 `01-LOGO/` + `slices/`，禁止用 AI 图像模型重绘 Logo。四色同屏只允许 Z-Grid 图与四方向卡。

## 2. 组件清单（可复用性）

| 组件 | 仓库 | 用途 | 可复用 |
|---|---|---|---|
| 运行时 token | zhubao315.github.io | 主品牌色/字/间距/动效 | ✅ 权威 |
| `DirectionMark.astro` | 同上 | 24×24 方向图标 | ✅ |
| `ProjectMedia/ProjectCard/FeaturedProject` | 同上 | 真实封面 / 视觉研究 | ✅ 模式 |
| `brand-tokens.css` | active-watch → 四站 | ACTIVE 唯一事实源 | ✅ 复制分发 |
| `brand-contract.mjs` + 测试 | active-watch | 可注入浏览器的品牌契约 | ✅ 最值得推广 |
| `patrol.mjs` / `verify-sites.mjs` | active-watch | 线上巡检 / 多宽度校验 | ✅ 运维层 |
| `build-data-shards.mjs` / `verify-shards.mjs` | active-watch | 数据分片与构建后对账 | ✅ 数据层 |
| `MediaImage.tsx` | uRead | 防 CLS / lazy / fetchPriority / 一次回退 | ✅ 强烈推荐为跨项目图片基线 |
| `BookCover/CollectionArtwork.tsx` | uRead | 三级封面回退 | ✅ |
| `SafeMarkdown.tsx` | uRead | 不用 `dangerouslySetInnerHTML` | ✅ 模式 |

## 3. 共享 vs 本地边界

**集中共享**：token 名与值、方向色语义、Logo 几何与 SVG 母版、可自动验证的护栏（manifest/contract/patrol）、无领域语义的组件模式（图片、回退、状态四态）。
**保持本地**：各站信息架构与数据口径、子品牌配色与文案、框架实现（Astro/React/MkDocs）——共享契约和 token，不共享整套 UI。
**建议落点**：建立版本化 `zhubao315/design-tokens` 包，让 `active-watch/brand/sync.sh` 从复制脚本升级为发布步骤；uRead/uSkill 若保留独立调色板，需在各自 `design-system.md` 声明 federated exception 并给出映射表。

## 4. 已发现的不一致

1. **【高】** `docs/design-system.md` 暖纸色板（`#F7F3EA` 等）与运行时 `#f7faff` 差一代；MEASURE `#63D6A3`、CREATE `#F97362` 已被 `#34D399`、`#FB7185` 取代。
2. **【中】** 发布的 `zhubao-tokens.css` 字体、容器宽、gutter、缓动、主题触发机制均与运行时不同，复制即漂移。
3. **【中】** Logo 权威表述冲突：`public/brand/README.md` 说矢量已移除，但 `09-EXPORTS/svg/`、`vector/` 仍在；ACTIVE 2.0 vs 3.0 表述并存。
4. **【中】** ACTIVE 规范 §2.1 PNG 母版 vs §2.2 SVG 母版自相矛盾；contract 要求 `active-mark.svg`。
5. **【中】** Fira Code 400/500 字节重复（manifest 67 条仅 66 个唯一哈希）；`active-watch/brand/fonts/` 没有 Fira Code，无法从源重新分发。
6. **【中】** 旧 Z 形 Logo 二进制在 active-watch、四站、主站三处重复分发。
7. **【中】** uRead 四层 token 定义互不一致（index.css 基础 / dark 覆盖 / tokens.css / tailwind.config.js），文档声称两处一致实际四处。
8. **【中】** 跨产品主题漂移未声明：ZHUBAO `#2563EB`、uRead `#2457A6`、uSkill `#005FB8`，均缺 `A ZHUBAO PROJECT` 背书。
9. **【低】** PWA manifest 文档写 `background_color #F7F3EA`，实际 `#07111F`。
10. **【低】** `patrol.mjs` 只校验 token 与 favicon，未覆盖 fonts/组件/旧 Logo；`BRAND_MANIFEST.sha256` 不在 active-watch 而在四站根。

## 5. 复用指南

1. 先定层级：主站 ZHUBAO / 运动 ACTIVE / 其他产品显式 federated exception。
2. 只从事实源取值：主站 `global.css` + `brand-v2.css`；ACTIVE `brand-tokens.css`。组件内禁止硬编码 hex。
3. 方向色是分类器，一段内容只用一个；小字用 ink/muted；四色同屏仅 Z-Grid/方向卡。
4. Logo 从母版派生，禁止重绘；favicon 与 PWA manifest 同步。
5. 复用 `--ease`/`--ease-out`，0.2–0.3s 微交互、0.8s reveal、reduced-motion 降级。
6. 图片用 `MediaImage` 模式；验证 1440/1280/768/390/375 无横向溢出。
7. 用 `sort -u | xargs sha256sum` 生成 manifest 并对重复哈希报错（可立即发现 Fira Code 问题）。

**来源缺口**：`active-watch/brand/BRAND_MANIFEST.sha256` 与 `uSkill/design-system.md` 返回 404，已用替代来源说明。本次未修改任何仓库。
