# ZHUBAO Presentation System Spec · 演示系统规范

## 母版（`slides/` 16 页，1280×720 SVG，文字全部可编辑）

| # | 母版 | 用途 |
| --- | --- | --- |
| 01 | cover | 封面：大图形 + 标题/副题/日期占位 |
| 02 | agenda | 目录 2×3 编号列表 |
| 03 | section | 章节页：超大镂空编号 + 方向色条（换章节时改编号与色） |
| 04 | keypoint | 单页核心观点 + 三条论据 |
| 05 | two-col | 双栏：左文右图/卡 |
| 06 | three-col | 三卡片（卡片顶条用方向色） |
| 07 | directions | 四方向 2×2 介绍卡 |
| 08 | architecture | 三层技术架构（应用/能力/数据） |
| 09 | flow | 五步流程箭头 |
| 10 | data | 折线 + 三指标卡 + 数据来源行（结构示例，须换真实数据） |
| 11 | case | 项目案例：截图 + 四指标 |
| 12 | timeline | 时间线五节点，颜色对应方向 |
| 13 | image | 大图 + 图注栏 |
| 14 | quote | 引用与参考资料 |
| 15 | summary | 三条结论 + 进度条 |
| 16 | closing | 结束页：组合标 + 渠道 |

## 版式纪律

- 页眉：标题 40px Inter 900 + 中文 18px + 44×4 色条；章节用对应方向色，其余用 Electric Blue。
- 页脚：`NN / 16` 等宽 13px；右上 24px 符号 + ZHUBAO·朱宝；668px 细分隔线。
- 正文 18–21px / 行高 1.65 / 每行 ≤ 42 字；数据数字 Inter 900 44px。
- 图表规则见 slide-10：单色主曲线 + 灰虚线对比 + 来源必填。

## 落地为 .pptx

方式 A：用 LibreOffice / Inkscape 导入 SVG 母版另存 pptx，文字保留可编辑。
方式 B：以 `zhubao-tokens.css` 数值建立 PowerPoint 主题（字体 Inter+Noto Sans CJK，颜色 6 主色 + 4 方向色）。
PNG 预览已导出至 `09-EXPORTS/png/ppt/`。
