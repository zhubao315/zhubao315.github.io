# Midnight Signal · 阶段 1 审计报告

**日期:** 2026-11-13  
**范围:** 全部样式层、组件内联 SVG、品牌生成脚本  
**目的:** 在切换到 Midnight Signal（深空蓝黑 + 极地冷白 + 电光蓝 + 四向信号色）之前，摸清旧暖纸色体系的全部驻留点。

## 1. 样式层规模

| 文件 | 行数 | 角色 |
|---|---|---|
| `src/styles/global.css` | 2966 | V1 Token、重置、布局、Header/Footer、首页 |
| `src/styles/responsive.css` | 2029 | 响应式规则 |
| `src/styles/about.css` | 1722 | 关于页 |
| `src/styles/brand-v2.css` | 1381 | V2 品牌层（最后加载） |
| `src/styles/work.css` | 1274 | 作品页 |
| `src/styles/editorial.css` | 963 | 阅读排版 |
| 合计 | 10335 | |

## 2. 关键结论：颜色高度 Token 化

暖纸色几乎全部集中在两个 `:root` 块（`global.css` 第 7–27 行、`brand-v2.css` 顶部）。样式表内硬编码 hex 仅约 40 处，且大多本身就是冷色（`#465166`、`#354052` 等板岩灰）。Token 引用密度：

| Token | 引用次数 | 迁移处理 |
|---|---|---|
| `--line` | 152 | 改为冷灰系 rgba |
| `--muted` | 142 | → `#667085` |
| `--line-dark` | 70 | 改为冷白系 rgba |
| `--gold` | 69 | → THINK 信号色（不变） |
| `--navy` | 61 | 品牌主色（不变） |
| `--muted-light` | 56 | 冷灰蓝（不变） |
| `--paper` 系 | 88 | 语义一分为二（见 §4） |
| `--sky/--green/--coral` | 别名 | 对齐新方向色 |

**推论：** 翻色主体是改 Token 定义 + 少量硬编码点，10335 行规则体基本不动。这是 Midnight Signal 迁移可行的根本原因。

## 3. 必须清除的暖色驻留点

| 位置 | 内容 |
|---|---|
| `global.css` `:root` | `--paper #f7f3ea`、`--paper-2 #efe8da`、`--paper-3 #e7ddcc`、`--gold-deep #8a6100` |
| `global.css` 其余 | `#fcf9f3`×5、`#fffdf8`×2、`#fbf8f1`×2、`#f1ede5`、`#f0e5c9`、`#c9a227`、`#e8c84c` |
| `brand-v2.css` | `--brand-shadow: 14px 14px 0 var(--paper-3)` 等纸色投影 |
| `rgba(247,243,234,*)` | 全站 30+ 处“纸上暗纹/分隔线” |
| `src/components/Header.astro` | 内联 SVG 徽标硬编码 `#F7F3EA` 描边与节点 |
| `src/components/Footer.astro` | 页脚徽标硬编码 `#F7F3EA` 底、`#0B1D33` 字 |
| `scripts/generate-assets.mjs` | favicon、OG 图、manifest 全部使用纸色常量 |
| `scripts/build-brand-assets.py` | `PAPER = "#F7F3EA"` 常量贯穿 Logo 家族 |
| `BaseLayout.astro` | `theme-color #0B1D33` → 改 `#07111F` |
| 场图 4 张 | `src/assets/field-*.png` 为纸底生成，需在页面改造前重出深空版 |

## 4. 新旧 Token 映射

```
--canvas        #07111F  新增 · 全站画布（深空蓝黑）
--paper      →  #F7FAFF  Arctic White（冷白：文字/亮面板）
--paper-2    →  #EEF2F7  Cool Gray（冷灰面板）
--paper-3    →  #D9E1EC  Border（冷边界）
--navy       =  #0B1D33  品牌主色（不变）
--navy-2     →  #07111F  即 canvas
--navy-3     →  #13263D  Dark Surface
--ink        →  #101828  浅区正文
--muted      →  #667085
--line       →  rgba(16,24,40,*)   浅区分隔线
--line-dark  →  rgba(247,250,255,*) 深区分隔线
--electric     #2563EB  新增 · 电光蓝（链接/交互/记忆点）
--gold-deep  →  删除 · 浅区文字级金色全部改用电光蓝
--build      =  #38BDF8
--think      =  #FBBF24
--measure    →  #34D399（原 #63D6A3）
--create     →  #FB7185（原 #F97362）
```

**语义拆分：** 旧 `--paper` 同时承担“浅底”和“深底上的浅字”。迁移后：
- 深底上的浅字/浅面板 → `--paper`（Arctic White）
- 浅区底 → 显式 `--surface-light: #F7FAFF` + 分区类，由页面改造阶段（HOME→ABOUT）逐区落位。
- 画布 → `--canvas`（`body` 背景），浅色阅读区通过 `zone-light` 显式铺冷白。深浅节奏由页面阶段负责。

## 5. 不受影响的部分

- 全部路由、内容数据（`projects.ts` / `site.ts` 事实字段）、筛选 JS、测试断言的结构性选择器
- 字体栈（Manrope / Inter / Instrument Serif / mono）
- 图标几何（24×24、1.5px 描边，Lucide 继续）
- 冷色系硬编码（板岩灰、深绿 `#0a221e` 等）可保留

## 6. 执行顺序确认

1. ✅ 阶段 1 审计（本文件）
2. 阶段 2 Token + 品牌文档翻新（清除暖色、theme-color、投影/分隔线体系）
3. 阶段 3 Logo 重绘（白/电光蓝 Z + 四向节点色、深/浅/单色套件、favicon/OG/manifest）
4. 阶段 4 起进入页面：图标 → Header/Footer → 首页 → WORK → THINK → EXPLORE → ABOUT → 移动端 → 全量测试
5. 场图深空版在首页改造前用本地 Qwen-Image-2.1 重出
