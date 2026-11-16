# ZHUBAO Typography Guide · 字体与排印规范

> v1.0 · 完整样本见 `zhubao-typography-specimen.svg` · CSS 见 `../design-tokens/zhubao-tokens.css`

## 1. 字族

| 用途 | 字族 | 备注 |
| --- | --- | --- |
| Display / Heading / Body | **Inter**（英文）+ **Noto Sans CJK SC / 思源黑体**（中文） | 900 Display、700 Heading、400 Body |
| 展示性标题（可选） | Instrument Serif | 仅书籍题图、艺术向封面，禁用于 UI |
| Code / 数据 | JetBrains Mono / Noto Sans Mono | 数字开启 tabular figures |

授权：Inter、Noto 均为 OFL 开源协议，可商用嵌入；Instrument Serif 为 OFL。Web 嵌入建议自托管 woff2 子集。

## 2. 字阶（桌面 / 移动）

| Token | 桌面 | 移动 | 字重/行高 |
| --- | --- | --- | --- |
| Display XL | 96 | 56–clamp | 900 / 1.1 |
| Display L | 72 | 44 | 900 / 1.1 |
| H1 | 56 | 32 | 900 / 1.1 |
| H2 | 40 | 26 | 700 / 1.25 |
| H3 | 28 | 24 | 700 / 1.3 |
| H4 | 22 | 20 | 700 / 1.35 |
| H5 | 18 | 18 | 700 / 1.4 |
| H6 | 16 | 16 | 700 / 1.4 |
| Body L | 20 | 18 | 400 / 1.65 |
| Body | 17 | 16 | 400 / 1.65 |
| Body S | 15 | 14 | 400 / 1.6 |
| Caption | 13 | 13 | 400 / 1.5 |
| Label | 12 | 12 | 700 / 1.4 · ls +0.08em |
| Data Number | 40–64 | 32–40 | 900 / 1.0 · 单位降权 |

Display 字级字距 -0.01em 起步、品牌字标 +0.2em；正文禁止加字距。

## 3. 混排与数据规则

1. 中英文/数字与中文之间加一个空格。
2. 专有名词不翻译；日期 `2026-11-16`；区间用 `–`（en dash）。
3. 指标数字右对齐、等宽；单位缩小至 0.45em、Cool Gray。
4. 大标题全大写仅限 6 个单词以内的 Label/口号；正文禁止。

## 4. 禁止

装饰性字体；正文 < 400 字重；四方向色用于大段正文；同一页面超过 3 种字级混排（不含数据）。
