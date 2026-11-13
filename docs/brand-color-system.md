# ZHUBAO · Midnight Signal 色彩系统

**Version:** 2.1 · 2026-11  
**Owner token file:** `src/styles/global.css`（`:root`）+ `src/styles/brand-v2.css`（方向别名与品牌层）

Midnight Signal 的色彩叙事：**深空是场景，冷白是阅读，电光蓝是记忆，四向色是语言。**

---

## 1. 品牌核心色

| Token | HEX | 名称 | 用途 | 关键对比 |
|---|---|---|---|---|
| `--canvas` | `#07111F` | Midnight Black | 全站画布、Header、Hero、Footer | `--paper` 于其上 17.9:1 |
| `--navy` | `#0B1D33` | Deep Navy | 品牌主色、深色面板、浅色区上的深字 | 白字 14.0:1 |
| `--navy-3` | `#13263D` | Dark Surface | 深色区卡片、数据面板 | 白字 11.9:1 |
| `--electric` | `#2563EB` | Electric Blue | 链接、hover、focus、主按钮 | 白字 5.2:1；于 canvas 2.4:1（仅作大色块/图形，不做小字） |
| `--electric-ink` | `#1D4ED8` | Electric (text) | 浅区文字级电光蓝 | `#F7FAFF` 上 ≈ 5.7:1 |
| `--electric-hi` | `#60A5FA` | Electric light | 深区 hover、图标 | 于 navy 6.0:1 |
| `--sky` | `#38BDF8` | Signal Cyan | 科技辅助、BUILD | 于 navy 8.6:1 |

## 2. 极地中性色（禁止暖底回归）

| Token | HEX | 用途 |
|---|---|---|
| `--paper` / `--surface-light` | `#F7FAFF` | 浅区阅读底；深区文字（Arctic White，偏蓝冷白） |
| `#FFFFFF` | 纯白 | 浅区卡片面（与 F7FAFF 拉开一档） |
| `--paper-2` | `#EEF2F7` | 浅区面板 / hover |
| `--paper-3` / `--line` 实色版 | `#D9E1EC` | 边框 |
| `--ink` | `#101828` | 浅区正文 |
| `--muted` | `#667085` | 浅区次级 |
| `--muted-light` | `#94A3B8` | 深区次级、mono 标签 |
| `--line` | `rgba(16,24,40,.14/.30)` | 浅区分隔 |
| `--line-dark` | `rgba(247,250,255,.16/.32)` | 深区分隔 |

**已清除（任何代码不得再出现）：** `#F7F3EA`、`#EFE8DA`、`#E7DDCC`、`#FCF9F3`、`#FFFDF8`、`#FBF8F1`、`#F1EDE5`、`#F0E5C9`、`#8A6100`、`rgba(247,243,234,*)`、`rgba(232,200,76,*)`。

## 3. 四向信号色

| 方向 | Token | HEX | 语义 |
|---|---|---|---|
| BUILD | `--build`（`--sky` 别名） | `#38BDF8` | 工程科技蓝 |
| THINK | `--think`（`--gold` 别名） | `#FBBF24` | 研究金 |
| MEASURE | `--measure`（`--green` 别名） | `#34D399` | 成长绿（V2.1 起取代 `#63D6A3`） |
| CREATE | `--create`（`--coral` 别名） | `#FB7185` | 创意珊瑚（V2.1 起取代 `#F97362`） |

规则：方向色用于标记、图标描边、规则线、标签底色、大号数字；**不用于小号正文**。四色在深空底上均 ≥ 4.5:1（`#34D399` 7.4:1、`#FB7185` 5.2:1 于 `#0B1D33`）。

## 4. 占比与节奏

| 色域 | 占比 | 场景 |
|---|---|---|
| 深空蓝黑系 | 40% | Header、Hero、系统图、重点展示、Footer |
| 极地冷白系 | 30% | 作品档案、文章、研究、数据说明 |
| 深蓝灰面板 | 20% | 深色区卡片与数据面板 |
| 电光蓝 + 四向色 | 10% | 标识、交互、分类、重点数据 |

深浅区交替出现，形成“观测 → 阅读 → 观测”的节奏；连续两个浅色大区之间必须出现深色带。

## 5. 状态语义色

| 状态 | 色 | 备注 |
|---|---|---|
| 上线/活跃 | `#34D399` | 与 MEASURE 同源 |
| 原型/进行中 | `#FBBF24` | 与 THINK 同源 |
| 归档/暂停 | `#94A3B8` | 中性 |
| 研究（来源） | `#38BDF8` | 与 BUILD 同源 |

## 6. 无障碍要点

- 小字只允许：`--ink`/`#101828` 于浅底（≥ 14:1）、`--paper`/`--muted-light` 于深底、`--electric-ink` 于浅底（5.7:1）、`#60A5FA` 于深底（6:1）。
- 焦点环：浅区 2px `--electric`；深区 2px `--electric-hi`，outline-offset 2px。
- 方向色与状态色永远伴随文字标签出现，不单靠颜色传达。
- 选中态 `::selection`：`--electric` 底 + `--paper` 字。

## 7. 迁移映射（V2.0 → V2.1）

```
#F7F3EA → #F7FAFF      #EFE8DA → #EEF2F7      #E7DDCC → #D9E1EC
#FCF9F3/#FBF8F1/#FFFDF8 → #FFFFFF              #F1EDE5 → #DFE6EE
#8A6100 (gold-deep) → #1D4ED8 (electric-ink)   #0B83B5 (sky-deep) → #1D4ED8
#63D6A3 → #34D399      #F97362 → #FB7185       #C9ED6B → #34D399   #F5A34B → #FB7185
rgba(247,243,234,α) → rgba(247,250,255,α)      rgba(11,29,51,α) → rgba(16,24,40,α)
```
