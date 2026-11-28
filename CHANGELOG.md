# Changelog

本文件记录主站可核实的变更。只写已经落地并通过门禁的事实，不写路线图承诺。

## 2026-11-26

### 数据与事实源
- 新增单一事实源：`schemas/portfolio-facts.schema.json`、`src/data/portfolio-facts.json`、`scripts/build-fact-registry.mjs`、`scripts/check-fact-consistency.mjs`。
- CI 增加 GitHub 数据漂移检查、`npm run test:seo`、`npm run facts:build && npm run facts:check`、`npm audit --omit=dev --audit-level=high`。
- 仓库口径统一为 GitHub API：公开 68 / 非 Fork 29 / Fork 39；不再用 `original + modified` 推导非 Fork 数。
- 运动数据按各站 README 更新：健康 1,054 天、跑步 2,044 次 / 24,660 km、骑行 5,808 次 / 45,549 km、徒步 344 次 / 2,694 km；派生合计 8,196 次 / 72,903 km 改为从 `lifeSites` 计算并附 `as_of`。
- uSkill 卡片视觉版本从硬编码 `v1.1 / BETA` 改为读取项目数据（v2.0.0）。

### 体验与可访问性
- OG 图片宽高改为参数化，项目页传入真实尺寸；移除项目页重复的 JSON-LD（每页从 5 个降为 4 个）。
- `.publications-note` 文本对比度从 3.81:1 提升到 7.39:1，字号从 0.56rem 提升到 0.76rem。
- 6 个原生 `<img>` 补齐 width/height；`color-scheme` 与深色 `theme-color` 对齐。
- 文章项目回链按项目名动态映射，不再全部指向 uSkill；THINK 页新增「全部原创文章」入口。
- 修复 3 篇文章中的 6 处相对链接断裂；`check-links.mjs` 现在会解析相对链接。
- 书稿页「相关观点」改为从文章集合实时读取标题，不再使用手写标题表（实测发现 `obsidian-governance-workflow` 的旧标题已与文章实际标题不符）；指向不存在文章的条目自动跳过。
- 案例页新增「03 / ENGINEERING DECISIONS / 技术决策与取舍」区块；uSkill、uRead、Knowledge Base Engineering、Quantified Life 四个旗舰项目已写入可追溯的决策、理由和取舍，Evidence / Boundaries 顺延为 04 / 05。

### 内容
- 补齐 `/books/` 与 4 个书稿落地页、真实书封与互引（提交 `06b8382` 及其前序提交）。
- README 与 content manifest 的数量、快照日期与 CI 说明同步到当前状态。

### 性能
- 新增 `npm run measure:baseline`，把 `dist/` 的静态构成写入 `docs/perf-baseline.{json,md}`（实验室静态分析，非 Lighthouse / RUM）。
- `npm run build` 增加 `scripts/dedupe-brand-assets.mjs`：只从 `dist/brand` 移除 SHA-256 完全相同且未被 HTML 引用的导出副本，`public/brand/` 源文件和 manifest 哈希不变。实测产物从 588 文件 / 21,837 KiB 降到 544 文件 / 18,745 KiB。

### 链接与巡检
- 新增 `npm run test:links:external` 与 `external-links.yml`（每周 + 手动，诊断性、不阻断部署）；403/429/5xx/网络超时记为警告，只有 404/410 记为断链，报告写入 `docs/link-report.json`。
- 外链巡检发现并修复 3 处真实问题：`uRepo` 的 Pages 404、`DockerTarBuilder` 的外部域名 404、404 页面 canonical 指向不存在的 `/404/`。前两者从仓库目录移除失效入口（`src/data/broken-homepages.json` 记录原因），noindex 页面不再输出 canonical / og:url。
- 最新外链巡检：194 个 URL，0 断链，16 条警告（网络超时/反爬）；内链 2572 条 0 断链。

### 实测性能（2026-11-28，实验室移动端 Lighthouse）
- 页头/页脚 Logo 从 273 KB / 250 KB 的 PNG 换成同设计的矢量 SVG（1.4 KB / 3.5 KB）。
- 首屏三种 woff2 字体加 `rel=preload`。
- 结果：Performance 76 → **98**，LCP 5.0 s → **2.5 s**，CLS 0.122 → **0**，总传输 771 KiB → **251 KiB**；Accessibility 95 / Best Practices 96 / SEO 100 不变。这是实验室数据，不是 RUM。详见 `/oc/docs/quality/lighthouse-lab.md`。
- 巡检降噪与历史：`docs/link-report.json` 现在包含 `noise_reduction`，把最近 2 次运行中出现过的断链标为「已知问题」，只把新出现的记为事件；同时追加写入 `docs/link-history.jsonl`（最多保留 200 次），CI 工件同时上传两者。

## 验证口径

每次改动后运行：`npm run build`、`npm run test:links`、`npm run test:seo`、`npm run facts:build`、`npm run facts:check`、`npm audit`、`npx playwright test`。最新一次本地结果：2572 条内链 0 断链、55 页 SEO 0 错误、28 项事实检查通过、生产依赖 0 漏洞。
