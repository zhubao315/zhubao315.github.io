# 04 · 数据不一致与事实核验清单

**核验日期**：2026-11-26
**规则**：只记录可复现证据；无法判定谁对谁错时标记"待核验"，不擅自选边。

---

## A. 仓库统计与分类

| ID | 问题 | 证据 | 影响 | 建议修复 | 状态 |
|---|---|---|---|---|---|
| D01 | 仓库总数三套口径：GitHub 68 / 线上 67 / 本地源码 61 | `api.github.com/users/zhubao315` → `public_repos: 68`；线上首页 `<strong>67</strong>`；审计开始时本地 `site.ts` → `repoCount: 61` | 品牌可信度；所有引用该数字的页面 | 已改为读取 `github-stats.json` 并重新生成快照（68）；线上待部署 | 已修复（待部署） |
| D02 | Fork / 非 Fork 口径不一致：API 39/29，本地源码 37/24 | 同上 API；原 `site.ts` → `forkCount: 37`, `nonForkCount: 24` | ABOUT 页"SOURCE: GitHub API"声明与数字不符 | 快照已刷新为 non_fork 29 / fork 39；分类为 29 原创 / 12 二改 / 27 上游 | 已修复（待部署） |
| D03 | 两处硬编码 "61 个仓库" 绕过单一事实源 | `src/pages/index.astro:266`、`src/pages/work/index.astro:134` | 数据再次漂移 | 同步后远端已改为 `{site.repoCount}`，本地不再出现硬编码 | 已修复 |
| D04 | 分类口径"28 原创 / 12 二次开发 / 27 上游研究"与数据模型不符 | `projects.ts` 中 18 个项目的 `sourceType` 全部为 `original`，无任何 `modified` | 二次开发贡献无法被识别，上游归因不清 | 扩展 `SourceType` 为 `original \| modified \| research` 并回填 | 待修 |
| D05 | 本地工作区落后远端 8 个提交 | 审计时本地 HEAD `0354689`；远端 `main` `08fcc15` | 基于本地快照的改动会覆盖线上已有工作（如 `/repositories/`） | 已备份 `backup/pre-growth-sync-20261126` 并合并远端；冲突已解决，构建与链接检查通过 | 已修复 |
| D06 | 本地构建 23 个 sitemap URL，线上 24 个 | `dist/sitemap-0.xml` 与线上 sitemap 对比；差异为 `/repositories/` | 本地测试无法覆盖线上真实路由 | 同步后重建，现为 24 | 已修复 |

## B. 项目事实

| ID | 问题 | 证据 | 影响 | 建议修复 | 状态 |
|---|---|---|---|---|---|
| D07 | 6 个第一梯队项目未进入 `projects.ts` | `grep` 未找到 `zhuocheng-terminal`、`ai-agent-master`、`gdmp-master`、`ulife-os-infra`、`active-watch`、`uWise` | 主页没有这些项目的搜索入口和作品入口 | 补建项目数据；先核验 README 与演示后再写文案 | 待修 |
| D08 | Memoir 页面写"没有稳定在线演示"，但演示站 HTTP 200 | `projects.ts` 描述；`https://zhubao315.github.io/memoir/` → 200；仓库 `homepage` 已配置 | 低估产品成熟度，误导用户 | 改为"在线演示可用；功能状态以仓库为准" | 待修 |
| D09 | uSkill 边界写"公开文档站点未上线"，但 `/uSkill/` HTTP 200 | `projects.ts` boundaries；实测 200 | 同上 | 核验页面内容后更新边界描述 | 待修 |
| D10 | 骑行次数冲突：作品集 5,776 次 vs 仓库描述 2,600+ 次 | `projects.ts` `lifeSites.cycling.stat = '5,776'`；GitHub repo `cycling` description = "2,600+ 次骑行" | 量化生活的核心卖点数据不可信 | 以站点实际数据文件为准，统一两处 | 待核验 |
| D11 | `dual-asset-strategy` 仓库描述含"10 年回测年化 16.21%" | GitHub repo description 实测 | 与"不宣传收益率 / 不荐股"的既定边界冲突，也有合规风险 | 删除具体收益数字，改为"公开回测方法与结果，不构成投资建议" | 待修 |
| D12 | `h029-psychology` 仓库描述含"心理瓶颈占比 100%" | GitHub repo description 实测 | 强量化结论缺证据出处 | 补证据或改为定性表述 | 待核验 |
| D13 | `lastVerified` 大面积停留在 2026-11-11 | `projects.ts` 中 17 个项为 11-11，1 个为 11-20；线上首页已显示 11-24 | 页面声称"已核验"但实际过期 | 建立自动核验脚本，按仓库/README/Pages 实际状态刷新 | 待修 |
| D14 | 量化生活指标"截至 2026-11-11" | `projects.ts` metrics note；健康数据每天同步 | 统计口径与日期脱节 | 改为读取站点生成数据的时间戳 | 待修 |

## C. SEO / GEO 基础设施

| ID | 问题 | 证据 | 影响 | 建议修复 | 状态 |
|---|---|---|---|---|---|
| D15 | `robots.txt` 无 `OAI-SearchBot` 规则，无 `GPTBot` 独立策略 | 线上与本地 `public/robots.txt` 均只有 `User-agent: * Allow: /` + Sitemap | AI 搜索发现与训练授权边界不清晰 | 显式允许 `OAI-SearchBot`；单独决定是否允许 `GPTBot` | 待修 |
| D16 | 项目页 Schema 用 `CreativeWork`，未用 `SoftwareApplication` / `WebApplication` | `src/pages/work/[slug].astro` | AI 难以识别"软件实体" | 仅对真实符合的项目按 Schema 定义升级 | 待评估 |
| D17 | 面包屑只有两级（首页 → 当前页） | `BaseLayout.astro` `BreadcrumbList` | 层级语义弱 | 项目页改为 首页 → 作品 → 项目 | 待修 |
| D18 | 无文章 / FAQ 内容类型，无 `Article` / `TechArticle` Schema | 远端 tree 无 `articles`，无 `docs/growth` | 长尾搜索问题无落地页 | 建设内容中心后再加，避免空壳 Schema | 待建设 |
| D19 | 无 SEO 自动化检查（metadata / sitemap / links / schema） | 远端 `scripts/` 仅有品牌与截图脚本 + `sync-github-data.mjs`；workflows 仅 `deploy.yml` | 错误只能靠人工发现 | 新增 `audit-seo.mjs` 等检查脚本与 CI 门禁 | 待建设 |

---

## 修复优先级建议

1. **D01 / D02 / D03 / D05 / D06 已完成**：代码基线合并、硬编码移除、Sitemap 重建、统计快照刷新到 2026-11-26（68/29/12/27/39）。D01 / D02 的线上生效还需 push 触发部署，本次未执行 push。
2. **D07 → D08/D09/D10**：补项目负责人并修正过期事实，之后才写推广文案。
3. **D11/D12**：合规与可信度风险，优先于流量优化。
4. **D15**：一行配置即可完成，性价比最高。
5. **D16–D19**：等内容与事实源稳定后批量处理。
