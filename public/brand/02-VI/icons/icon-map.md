# ZHUBAO Icon Map · 四方向图标映射

> 网格 24×24 · 线宽 1.5 · linecap/linejoin: round · 单色版与方向色版等价互换

| 方向 | 识别色 | 图形语义 | 文件 |
| --- | --- | --- | --- |
| BUILD 构建系统 | `#38BDF8` | 模块与连接：两个方模块由折线节点连接（系统组装） | `build/zhubao-icon-build-{24,24-mono,24-inverse,48}.svg` |
| THINK 工程知识 | `#FBBF24` | 知识网络：三节点两两连通（概念间建立链接） | `think/…` |
| MEASURE 量化生活 | `#34D399` | 测量趋势：坐标轴 + 折线 + 上升箭头 | `measure/…` |
| CREATE 创造作品 | `#FB7185` | 生成组合：圆与旋转 45° 方形的交叠（形态生成） | `create/…` |

## 附加资产

- 徽章（96×96 色底反白图形）：`{dir}/zhubao-badge-{dir}.svg`
- 标签胶囊：`{dir}/zhubao-label-{dir}.svg`
- 方向分隔线（四节点色）：`../icons/zhubao-divider.svg`

## 使用规则

1. 图标只表达四方向语义，禁止混用（跑步图不用 THINK 图标）。
2. 深色背景用方向色版或反白版；浅色背景用 mono（navy）版。
3. 尺寸阶梯 24 / 32 / 48；≥96 用徽章版。
4. 新图标必须沿用 24 网格、1.5 线宽、圆端点，与现有四图标同一家族。
