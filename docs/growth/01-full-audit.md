# 01 · ZHUBAO Growth OS 全面审计

**审计日期**：2026-11-26
**审计对象**：`zhubao315/zhubao315.github.io`（远端 `main` = `08fcc15`，2026-11-25）、线上站点 `https://zhubao315.github.io/`、GitHub 账号 `zhubao315`
**审计依据**：GitHub REST API（`user`、`user/repos`、`git/trees`）、线上站点 HTTP 实测、远端源码 `raw.githubusercontent.com`、本地工作区快照
**方法**：先核验事实，再评估 SEO/GEO 现状；不根据仓库名称推测功能，不编造搜索量或索引数据。

---

## 0. 证据边界（必须先读）

本次审计**能够确认**的事实来自可复现的公开接口和本地文件；以下内容**无法确认**，必须在接入 Search Console / Bing Webmaster Tools 后才能填写：

- 关键词搜索量、竞争度、排名位置。
- Google / Bing 的实际索引状态、曝光、点击、CTR。
- ChatGPT Search / AI Overviews 的实际引用次数。
- 各外部平台的真实引流与转化。
- 10 个私有仓库的内容（仅同步，不在公开审计文档中展开）。

任何声称上述数据的结论都应标记为"待核验"，不得写入正式报告。

---

## 1. 执行摘要

| # | 结论 | 严重度 |
|---|---|---|
| 1 | GitHub 账号当前有 **68 个公开仓库**（39 Fork / 29 非 Fork）；使用 PAT 后可见 **78 个仓库**（含 10 个私有）。线上主页显示 **67**，本地源码快照显示 **61**。三方不一致。 | P0 |
| 2 | 本地工作区 HEAD (`0354689`) 落后远端 `main` (`08fcc15`) **8 个提交**；线上已上线 `/repositories/` 页面和 `src/data/generated/github-stats.json`，本地源码两者都没有。任何基于本地快照的改动都可能覆盖线上已有工作。 | P0 |
| 3 | 线上 `robots.txt` 仅 `User-agent: * Allow: /` + Sitemap；没有 `OAI-SearchBot` 规则，也没有独立的 `GPTBot` 训练抓取策略。 | P1 |
| 4 | Sitemap 实测 **24 个 URL**（本地构建产物 23 个，差异为 `/repositories/`）。过滤规则已排除 `/404/`、`/tags/`、`/categories/`、`/archives/`、`/2022/`，方向正确。 | P2 |
| 5 | 18 个重点项目案例页全部存在，但 68 个公开仓库中只有约 18 个有独立可索引页面；大量仓库没有搜索入口。 | P1 |
| 6 | `projects.ts` 的 18 个项目**全部标记为 `original`**，没有 `modified` 类型；策略中的"28 原创 / 12 二次开发 / 27 上游研究"与现有数据模型不一致。 | P1 |
| 7 | 策略中多个第一梯队项目（拙诚日课、AI-Agent Master、GDMP Master、uLife OS Infra、active-watch、uWise）**完全没有进入 `projects.ts`**，主页没有它们的作品入口。 | P0 |
| 8 | 已实测可访问（HTTP 200）的演示站：`/memoir/`、`/mbti64/`、`/zhuocheng-terminal/`、`/uSkill/`、`/health/`。但项目数据仍写着"未上线 / 无稳定演示"。 | P1 |
| 9 | 结构化数据只有 `Person`、`WebSite`、`BreadcrumbList`；项目页用 `CreativeWork`，没有按内容类型扩展 `SoftwareApplication`、`Article`、`ProfilePage` 等。没有伪造评分或价格，这一点应保持。 | P2 |
| 10 | 远端仓库没有 `docs/growth/`、没有文章中心、没有 SEO 自动化脚本或工作流（只有 `deploy.yml` 和新增的 `scripts/sync-github-data.mjs`）。提示词 1 的交付物目录目前为 0。 | P1 |

**总体判断**：站点不是"从零开始"，L1 技术基础可用，内容与设计资产完整。当前最大障碍不是缺页面，而是**事实源分裂、线上/本地版本错位、项目分类与策略不一致**。应先统一事实源和同步代码，再谈关键词与内容生产。

---

## 2. 线上 / 本地 / GitHub 三方对照

| 指标 | GitHub API（实测） | 线上站点（实测） | 本地源码 / 构建产物 |
|---|---|---|---|
| 公开仓库数 | 68 | 67 | 审计开始时 `site.ts` = 61；同步后已改为自动读取 `github-stats.json`（快照值 67） |
| 非 Fork / Fork | 29 / 39 | 28 / 39（快照口径） | 同步后已改为自动读取，快照值仍停留在 2026-11-24 |
| 最后核验日期 | `pushed_at` 最新 2026-11-26 | 2026-11-24 | 同步后与线上一致（2026-11-24） |
| Sitemap URL | — | 24 | 审计时 23；重建后 24，与线上一致 |
| `/repositories/` | 远端源码存在 | 已索引 | 同步后已存在 |
| 仓库统计数据源 | GitHub | `src/data/generated/github-stats.json` | 同步后已有 generated 目录 |
| 分支 HEAD | `08fcc15` | 部署自更新提交 | 审计时 `0354689`（落后 8、领先 1）；已备份本地提交并合并远端 |

**已执行的修复**：把 `/oc/site` 的本地独有提交保存到 `backup/pre-growth-sync-20261126`，合并远端 `main`（解决 `deploy.yml` 冲突，保留 Playwright 详细步骤、失败报告上传与 PR 不部署的守卫），并重新构建。现在本地落后 0、领先 2，Sitemap 24 URL，链接检查 1433 条引用通过。

**仍需注意**：`github-stats.json` 是 2026-11-24 的快照（67 个公开仓库），而 GitHub API 当前为 68。需要重新运行 `scripts/sync-github-data.mjs` 生成最新快照；不能用旧快照冒充今日事实。

---

## 3. L1 · 技术可发现性审计

| 检查项 | 现状 | 评价 |
|---|---|---|
| 静态 HTML | Astro 7 静态输出，主要内容在构建产物中 | 通过 |
| Sitemap | `@astrojs/sitemap` 3.7.4，过滤 noindex 路径；线上 24 URL | 通过；需确认 `/repositories/` 是否应常驻索引 |
| Robots | `Allow: /` + Sitemap，允许通用爬虫 | 通过；AI 爬虫策略缺失 |
| Canonical | `BaseLayout` 统一输出 `new URL(Astro.url.pathname, site.url).href` | 通过；各页无重复覆盖 |
| Title / Description | 每页可传入；主页用 `site.title/description`；项目页用 `name + summary + tagline` | 基本通过；缺少按搜索意图精细化的独立标题 |
| Open Graph | `og:type/title/description/url/image` + 1200×630 默认图 | 通过；项目级 OG 图未逐一核验 |
| Twitter Card | `summary_large_image`、creator、title、description、image | 通过；缺 `twitter:site` |
| JSON-LD | Person / WebSite / BreadcrumbList；项目页 CreativeWork | 合规但覆盖不足 |
| hreflang | 未设置 | 当前只有中文站，合理；建英文页时必须补 |
| 内部链接 | 首页 → work / think / explore / about；项目页有面包屑 | 通过；缺专题文章内链层 |
| 图片 Alt | 项目封面有 `coverAlt` | 部分通过；需全站扫描 |
| 移动端 | 历史测试记录覆盖 1440/1280/768/390/375 | 历史记录，**未在本次重新运行** |
| 404 / noindex | 404 页 noindex，不在 sitemap | 通过 |
| 页面速度 | 历史记录无数据 | 未核验；需 Lighthouse / CWV 实测 |

---

## 4. 内容与 GEO 基线

- **内容类型**：项目卡片、18 个案例研究、THINK 页面、EXPLORE、ABOUT、仓库索引。没有独立文章页，没有 FAQ 内容模型，没有可被引用的一手教程。
- **直接答案**：项目页有 `summary` / `tagline`，但没有"一句话直接回答用户问题"的固定区块。
- **实体定义**：`Person` 有 `knowsAbout`；项目有 `description` / `codeRepository` / `sameAs`；缺统一的"项目实体卡"（版本、协议、支持对象、最后核验来源）。
- **证据链**：案例页含 `context / approach / evidence / boundaries / lastVerified`，这是很好的基础；问题是大量证据仍是文字描述，缺可点击的原始出处链接。
- **GEO 风险**：没有 `llms.txt`（可选，非排名因素）；`OAI-SearchBot` 未显式允许；AI 引用监测未接入。

---

## 5. 分级发现

### P0（先处理，否则后续改动有风险）

1. **代码基线错位**：本地落后 8 个提交且线上已包含本地没有的功能。先同步，再修改。
2. **仓库数量三套口径**：68 / 67 / 61；Fork 口径 39 / 24。统一为自动读取 `github-stats.json`，不再硬编码。
3. **重点项目负责人缺位**：6 个策略中的第一梯队项目在主页数据里不存在。

### P1（第一阶段完成后处理）

4. `robots.txt` 增加 `OAI-SearchBot` 显式允许，单独声明 `GPTBot` 策略。
5. 18 个项目页扩展为"作品集 + 搜索落地页"双用途，补直接答案 / FAQ / 事实卡。
6. 把 `sourceType` 从二值扩展为 `original | modified | research`，并回填 Running 等二次开发项目。
7. 修正过期事实：memoir、uSkill 演示状态；cycling 次数；投资类收益表述。
8. 建立 `docs/growth/` 与文章中心目录，先把本审计的四份文档落地。

### P2（持续优化）

9. 结构化数据按页面类型扩展，严格只填页面可见字段。
10. 全站 Alt / 断链 / Metadata / Sitemap 自动化检查脚本。
11. 接入 Search Console、Bing Webmaster Tools（含 AI Performance）后建立基准线。

---

## 6. 本次已验证 / 未验证清单

**已验证**

- GitHub 用户：`public_repos=68`，PAT 可见总数 78（10 私有），39 Fork。
- 远端 `main` 最新提交 `08fcc15`（2026-11-25），本地落后 8 提交。
- 线上 sitemap 24 个 URL；本地构建 23 个。
- 线上首页展示 67、核验日期 2026-11-24。
- `/`、`/robots.txt`、`/sitemap-index.xml`、`/memoir/`、`/mbti64/`、`/zhuocheng-terminal/`、`/uSkill/`、`/health/` 均 HTTP 200。
- 本地 `projects.ts` 共 18 个项目 + 10 个研究项目 + 4 个运动站点；`sourceType` 全部为 `original`。
- 远端无 `docs/growth/`、无文章目录、无 SEO 工作流。

**未验证（需后续补）**

- 搜索量、排名、索引覆盖率、CTR、AI 引用。
- 全部 24 个 sitemap URL 的 HTTP 状态与重复内容检测。
- Lighthouse / CWV 实测。
- 10 个私有仓库内容。
- 所有演示站点的移动端与功能可用性。

---

## 7. 下一步

1. 完成 78 个仓库的完整同步（进行中），得到全量本地事实源。
2. 将 `/oc/site` 合并到远端 `main`，保留本地独有提交。
3. 阅读 `02-project-inventory.md` 与 `04-data-inconsistencies.md`，逐条修正事实。
4. 按 `03-priority-matrix.md` 确定第一批优化项目。
5. 再进入提示词 6（主页技术改造），不要在事实统一前改页面。
