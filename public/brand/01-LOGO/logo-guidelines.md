# ZHUBAO Logo Usage Guidelines · Logo 使用规范

> v1.0 · 与 `logo-usage-board.svg` 同步维护

## 1. 版本清单

| 场景 | 文件 |
| --- | --- |
| 彩色符号（透明底） | `master/zhubao-symbol.svg` |
| 横向组合标（浅底） | `master/zhubao-horizontal.svg` |
| 纵向组合标（浅底） | `master/zhubao-stacked.svg` |
| 反白组合标（深底透明） | `dark/zhubao-reverse.svg` |
| 深底组合标（含底） | `dark/zhubao-horizontal-dark.svg` `zhubao-stacked-dark.svg` |
| 冷白底组合标 | `light/zhubao-horizontal-light.svg` `zhubao-stacked-light.svg` |
| 单色（navy） | `monochrome/zhubao-monochrome.svg` `zhubao-symbol-monochrome.svg` |
| 纯黑 / 纯白 | `monochrome/zhubao-black.svg` `zhubao-white.svg` `zhubao-symbol-reverse-mono.svg` |
| Favicon / PWA | `favicon/`（SVG + 16/32/48/64/128/180/192/512 PNG） |

## 2. 版本选择决策

1. 深色背景（#07111F / #0B1D33 / 照片暗部）→ 彩色版或反白版。
2. 浅色背景（#F7FAFF / 白色印刷）→ **单色版**（navy）。彩色版在浅底上白色对角线不可见，禁止。
3. 单色印刷、刻蚀、烫印 → 单色版或纯黑/纯白版。
4. 复杂背景 → 加暗色底板，或改用单色版。
5. ≤ 32px 屏幕场景 → 仅用符号版，禁止使用组合标。

## 3. 安全距离与最小尺寸

- 四周留白 ≥ **1u**（1u = 节点边长 = 网格单位的 1 格，即符号宽度的 1/8）。
- 数字屏幕：符号 ≥ 16px 见方；组合标宽度 ≥ 120px。
- 印刷：符号 ≥ 6mm；组合标宽度 ≥ 36mm。

## 4. 禁止用法

1. 不得拉伸、压扁、旋转、倾斜。
2. 不得改变节点与横条颜色，不得增删节点。
3. 不得添加投影、发光、描边、纹理、渐变。
4. 不得遮挡、裁切对角线或节点。
5. 不得重新绘制 Z 结构或使用近似字体替代字标。
6. 字标 Inter 不可用时，只允许替换为同风格的几何无衬线（如 Manrope），并保持字距 0.2em。

## 5. 组合规则

- 横向组合：图形:分隔线:字标固定比例，禁止重排。
- 纵向组合：用于居中构图（海报、启动页、礼盒盖面）。
- 反白版用于深色背景；字标英文 `ZHUBAO` 字距 12/58（Inter 900），中文「朱宝」两侧横线为 Cool Gray。

## 6. 修改与审批

任何对 Logo 几何、颜色、比例的修改提案，必须先在 `tools/zb.py` 中给出新几何常量与对比渲染图，评审通过后全库再生成，禁止手改单个文件。
