# GEO（AI 搜索）实施报告

**执行日期**：2026-11-26
**目标**：让公开内容成为可靠、清晰、可被引用的事实来源，而不是为 AI 爬虫准备特殊关键词文件。

---

## 1. 实体定义

| 实体 | 定义位置 | 当前内容 |
|---|---|---|
| 作者 | `BaseLayout.astro` Person Schema、`/about/` ProfilePage | 朱宝 / ZHUBAO、Url、头像、`knowsAbout`、GitHub 与 X 链接 |
| 品牌站点 | `BaseLayout.astro` WebSite Schema | 站名、URL、语言、描述、作者 |
| 项目 | `src/data/projects.ts` 新字段 + 项目页 Schema | 一句话定义、类型、用户问题、官方网址、源码、证据、版本口径、边界 |

项目实体示例（来自真实数据，非杜撰）：

> uSkill 是一个用于定义、校验、执行和治理 AI Agent Skills 的开源工程平台，把 SOP 转换为结构化 Skill，并通过统一 Schema、CLI 与执行器形成可复用的能力资产。

## 2. 已实施的 GEO 内容结构

- **答案先行**：6 个重点项目页在首屏后增加「一句话说明」，先给结论，再讲背景、方法、证据与边界。
- **目标用户**：新增 `audience` 字段，明确"谁真正需要它"，避免泛化营销语言。
- **FAQ**：6 个项目页新增共 17 个问题，答案全部来自既有 `caseStudy` / `boundaries` / `metrics`。例如"MBTI64 是心理诊断工具吗？""这个 Skill 会删除我的笔记吗？""投资 Skill 会推荐股票吗？"
- **可点击证据**：新增 `evidenceLinks`，优先 README 与演示站；原案例页的测试数字仍是文字描述，本次未伪造新的出处。
- **版本诚实**：无已核验 Release 的项目统一写"以仓库 Release 为准"，不编造版本号。
- **边界保留**：所有项目原有 `boundaries` 继续展示；娱乐/投资/隐私三类敏感边界保持原文。

## 3. AI 爬虫策略

- `OAI-SearchBot`：显式 `Allow`，用于 ChatGPT Search 发现。
- `GPTBot`：显式 `Disallow`，训练数据授权与搜索发现分离（需你确认）。
- 未添加未经核验的爬虫名称；未使用 `llms.txt` 替代网页内容与 Sitemap。

## 4. 已验证的构建输出

| 检查 | 结果 |
|---|---|
| 含「一句话说明」区块的页面 | 6 |
| 含 FAQ 区块的页面 | 6 |
| `ProfilePage` Schema | 1（`/about/`） |
| `SoftwareApplication` Schema | 4 |
| `WebApplication` Schema | 1 |
| 项目页三级 BreadcrumbList | 18 |
| JSON-LD 可解析 | 是（SEO 审计脚本逐页校验） |

## 5. 明确未做（不要误读为已完成）

1. **未接入 Google Search Console / Bing Webmaster Tools**，因此没有 AI Overviews / AI Performance 的真实引用数据。
2. 没有声称任何页面已被 ChatGPT、Perplexity 或其他模型引用。
3. 没有建立搜索词到页面的排名对应关系；关键词方向仍是候选，未验证搜索量。
4. 没有建设文章中心；`Article` Schema 暂不添加。
5. 没有英文页面，因此没有 `hreflang`。

## 6. 下一步建议

1. 接入 GSC / Bing Webmaster Tools，建立"基准线"后再谈增长目标。
2. 用 Bing Webmaster Tools 的 AI Performance 报告观察 `Cited Pages` 与 `Grounding Queries`。
3. 先写两篇内容支柱文章（Agent Skills、知识库治理），再考虑 `Article` Schema 与英文版。
4. 定期用真实问题（例如"如何把 SOP 转成 Agent Skill"）测试能否找到官方页面，并记录结果。
