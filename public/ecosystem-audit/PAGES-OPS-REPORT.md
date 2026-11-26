# Pages 运营巡检报告（Phase 3）

**巡检时间**：2026-11-25 · **范围**：20 个启用 Pages 的仓库 · **方式**：HTTP GET + HTML 解析（只读），浏览器 UA，20s 超时。

## 汇总

| 指标 | 结果 |
|---|---|
| HTTP 200 | 19 / 20 |
| HTTP 404 | 1 / 20 — `uRepo`（GitHub 默认 404 页） |
| 重定向 | 0 |
| `<title>` | 19/19 存在 |
| viewport meta | 19/19 存在 |
| meta description | 12/19（缺 7） |
| canonical | 10/19（缺 9） |
| og:image | 8/19（缺 11） |
| theme-color / color-scheme | 7/19（缺 12） |
| 外部 CDN 引用 | 7/19（11 条；主要是 fonts.googleapis.com；tescreal-guide 另有 unpkg.com/aos@2.3.1） |
| 共享 ZHUBAO 导航标记 | 仅 2 个站点服务端渲染；3 个 ACTIVE SPA 仅在元数据中出现品牌 |
| 断链资源 | 0（约 500 个同域链接 HEAD 检查全部 200） |
| 超大文件直链 | 0 |
| 可见个人敏感信息 | 0 确认（mbti64 的疑似手机号来自 chunk hash / SVG 坐标浮点，误报） |

## 逐站结果

| 仓库 | HTTP | 标题 | Desc | Can | OG | VP | CS | CDN | 旧文案 | 导航 | 断链 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| running | 200 | ACTIVE / 跑步 | — | ✓ | ✓ | ✓ | ✓ | 0 | — | ACTIVE¹ | 0 |
| uRead | 200 | uRead · 个人阅读档案 | ✓ | ✓ | ✓ | ✓ | ✓ | 0 | — | — | 0 |
| health | 200 | ACTIVE / 健康 | ✓ | ✓ | ✓ | ✓ | ✓ | 0 | — | site-header² | 0 |
| memoir | 200 | Memoir — Your Life… | ✓ | — | — | ✓ | — | 0 | — | — | 0 |
| zhubao315.github.io | 200 | 朱宝 ZHUBAO \| 构建系统… | ✓ | ✓ | ✓ | ✓ | ✓ | 0 | uRead 0.33 / 2026-11-11 | ZHUBAO² | 0 |
| zhubao315 | 200 | 朱宝 ZHUBAO · 个人作品集 | ✓ | ✓ | ✓ | ✓ | — | 0 | 2026-11-11 | ZHUBAO | 0 |
| cycling | 200 | ACTIVE / 骑行 | — | ✓ | ✓ | ✓ | ✓ | 0 | — | ACTIVE¹ | 0 |
| mbti64 | 200 | MBTI64 · 64 Personalities | ✓ | ✓ | ✓ | ✓ | ✓ | 0 | — | — | 0 |
| hiking | 200 | ACTIVE / 徒步 | — | ✓ | ✓ | ✓ | ✓ | 0 | — | ACTIVE¹ | 0 |
| perfectme | 200 | 满分的我 · The Perfect Me | — | — | — | ✓ | — | 0 | — | — | 0 |
| hip-drive-running | 200 | 送髋跑 | ✓ | — | — | ✓ | — | 1 | — | — | 0 |
| h029-psychology | 200 | 所有领域最终通向心理学 | — | — | — | ✓ | — | 1 | — | — | 0 |
| dual-asset-strategy | 200 | 双资产投资策略 | — | — | — | ✓ | — | 1 | — | — | 0 |
| reading-2026 | 200 | 在奇点与道之间寻找锚点 | ✓ | — | — | ✓ | — | 0 | — | — | 0 |
| e-life-method | 200 | e-Life — 自主进化人生操作系统 | ✓ | — | — | ✓ | — | 1 | — | — | 0 |
| tescreal-guide | 200 | TESCREAL 完整指南 | ✓ | — | — | ✓ | — | 3 | — | — | 0 |
| **uRepo** | **404** | Page not found · GitHub Pages | — | — | — | — | — | — | — | — | — |
| uSkill | 200 | uSkill | ✓ | ✓ | — | ✓ | — | 1 | — | — | 0 |
| uWise | 200 | uWise 百科 | ✓ | ✓ | — | ✓ | — | 1 | — | — | 0 |
| uVision | 200 | uVision - 投资人知识库 | — | — | — | ✓ | — | 0 | — | — | 0 |

¹ ACTIVE 品牌仅出现在 SPA 的 `<title>` / OG 元数据中，HTML 无服务端 `<header>`。
² 真实共享布局：`<header class="site-header">` + `<nav>`（根站另有 `<footer>`）。

## 优先级问题

1. **P0 — uRepo 404**：GitHub 默认错误页，无实际内容。需决定：恢复发布，或从 Pages 索引/导航中移除。
2. **P1 — 社交分享缺失**：11/19 无 `og:image`、9/19 无 canonical、7/19 无 description。链接预览空白或错误。
3. **P1 — 品牌导航不一致**：`uread-site-nav` 在 0/20 站点出现；仅 2 站服务端渲染共享 header。
4. **P2 — 第三方依赖**：7 站引入 Google Fonts；tescreal-guide 使用未锁定的 `unpkg.com/aos@2.3.1`。
5. **P2 — 过期文案**：根站曾显示 `uRead 0.33.1` 与 `2026-11-11`；本项目已在 Phase 3 修正主页文案为 0.34.5 / 1599 篇 / 1807 条。`zhubao315` 作品集页仍显示 `2026-11-11`。
6. **P3 — 未品牌化站点群**：memoir / perfectme / uSkill / uWise / uVision / tescreal-guide / h029-psychology / dual-asset-strategy / hip-drive-running / e-life-method / reading-2026 未进入共享设计/SEO 体系。

## 建议

- uRepo：若不再维护，关闭 Pages 或从索引移除；若需保留，补最小 `index.html` 说明归档状态。
- SEO 基线：把 description / canonical / og:image / theme-color 写进共享 layout，再逐站 roll out；优先 memoir、perfectme、uVision 与四篇文章站。
- 共享导航：定义一份服务端渲染的 header/footer partial（含 `site-header`、`uread-site-nav`、`ZHUBAO`），SPA 的 `index.html` shell 也包含。
- 自托管字体：把 Noto Sans SC / Serif SC / Inter / JetBrains Mono 等 woff2 落地；vendor 并锁定 aos@2.3.1。
- 过期文案：统一改为审计日期，或明确标注为历史快照。
- 无需处理：同域资源 0 断链、无超大直链、无确认的敏感信息。
