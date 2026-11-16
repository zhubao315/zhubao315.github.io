# ZHUBAO 品牌资产使用总则 · Usage Rules

> v1.0 · 适用于官网、GitHub、出版、演示、周边与一切 AI 生成流程

## 0. 唯一真相源（Source of Truth）

- Logo 几何与颜色常量：`/oc/zhubao-brand/tools/zb.py` 与 `01-LOGO/master/`。
- 设计令牌：`02-VI/design-tokens/zhubao-tokens.css`。
- 任何资产不得绕开以上文件手工重画 Logo 或自造色值。

## 1. AI 生成资产前置规范

每次生成新资产必须提供三件套：
1. Z-Grid Logo 母版（SVG，不用位图喂给模型）。
2. 本仓库品牌规范摘要（README「品牌速览」+ 色彩令牌）。
3. 本次资产的专属 Prompt（含占位符声明）。

规则：涉及 Logo 一律程序化派生（脚本渲染），禁止 AI 图像模型生成 Logo；涉及大面积文字优先真实字体排版；生成后与母版并排对比验收。

## 2. 母品牌与子品牌

| 层级 | 视觉职责 |
| --- | --- |
| ZHUBAO 母品牌 | Midnight Signal 底色、Z-Grid、四方向语法、统一字体与网格 |
| 子项目 | 保留自有 Logo、命名、专属配色；接入方式 = Banner 右上「A ZHUBAO PROJECT」徽章 + 方向标签 + 页脚署名 |

禁止：把母品牌 Logo 拼进项目 Logo；为统一而抹掉项目既有识别；同一页面出现两套无关设计语言。

## 3. 占位符与真实性红线

- 占位标记：`{'{'}…{'}'}`、`XXXX`、二维码空框、`you@example.com`。带占位物料不得对外发布。
- 数据（运动、健康、财务、项目指标）必须替换为真实数据并注明来源。
- 禁止虚构：联系方式、头衔、出版物、ISBN、合作方、成绩、二维码内容。
- 示例图表必须标注「示例结构」。

## 4. 色彩纪律

主品牌 Midnight/Deep Navy；阅读场景 Arctic White；强调 Electric Blue/Signal Cyan；四方向色仅限对应内容域与小型图形元素。禁止米白/奶油/暖纸/复古暖灰；禁止渐变入 Logo；禁止方向色大面积平铺。

## 5. 更新流程

新增/修改资产 → 更新 `tools/` 生成脚本 → 全量再生 → 视觉对比 → 记入 `changelog.md` → 更新 `asset-inventory.md`（脚本：见 README）。
