# 主站静态性能基线（实验室静态分析）

- 生成时间：2026-11-26T10:55:28Z
- 数据来源：`dist/` 构建产物静态扫描；**不是 Lighthouse，不是真实用户数据（RUM）**。
- 复跑：`npm run build && npm run measure:baseline`

## 总览

| 指标 | 数值 |
| --- | ---: |
| 文件数 | 544 |
| HTML 页面 | 55 |
| 总字节 | 18745.3 KiB |
| HTML | 1471.6 KiB |
| CSS | 156.2 KiB |
| JS 文件 | 0.0 KiB |
| 内联脚本 | 129.9 KiB（55 页） |
| 图片 | 15307.3 KiB |
| 字体 | 346.9 KiB |
| JSON | 123.7 KiB |

## 图片格式分布

- svg: 211
- png: 119
- webp: 83

## 最大文件（前 12）

| 文件 | 大小 |
| --- | ---: |
| `brand/01-LOGO/SOURCE.png` | 1488.4 KiB |
| `brand/slices/SOURCE.png` | 1488.4 KiB |
| `brand/brand-logo-guide.pdf` | 1127.1 KiB |
| `brand/09-EXPORTS/zhubao-brand-overview.png` | 995.6 KiB |
| `brand/zhubao-symbol.svg` | 363.3 KiB |
| `brand/01-LOGO/CONTACT-SHEET.png` | 358.6 KiB |
| `brand/slices/CONTACT-SHEET.png` | 358.6 KiB |
| `brand/zhubao-horizontal.svg` | 333.2 KiB |
| `brand/zhubao-symbol.png` | 272.3 KiB |
| `_astro/38036cf7bf29.C94UFBQQ_Zucoon.webp` | 261.3 KiB |
| `brand/09-EXPORTS/png/zhubao-typography-specimen.png` | 258.0 KiB |
| `brand/zhubao-horizontal.png` | 249.8 KiB |

## 说明

- `dist/brand` 中的品牌源图只影响仓库与部署体积，不被首屏引用时不产生请求。
- 内联脚本统计只包含 `<script>` 标签体，不含属性中的 JSON-LD 以外的外部资源。
- 本基线用于发现「体积从哪来」和追踪改动前后差异；LCP / INP / CLS 仍需浏览器实测。
