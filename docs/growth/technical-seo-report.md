# 技术 SEO 改造报告（提示词 6）

**执行日期**：2026-11-26
**基线**：合并远端 `main` 后的工作区（统计快照已刷新为 68/29/12/27）
**原则**：保留品牌设计、路由、项目数据与全部既有功能；不伪造 Schema 字段；不声称未执行的改动。

---

## 1. 修改文件与理由

| 文件 | 修改 | 理由 |
|---|---|---|
| `src/layouts/BaseLayout.astro` | 新增 `imageAlt`、`breadcrumbs`、`schema` 三个可选 Props；新增 `twitter:site`；BreadcrumbList 支持自定义层级与页面级 JSON-LD 数组 | 统一全站元数据出口，避免各页重复实现；让面包屑反映真实层级 |
| `public/robots.txt` | 显式 `Allow: OAI-SearchBot`；独立声明 `GPTBot: Disallow /` | 搜索发现与模型训练授权分离；不做未经核验的爬虫白名单扩张 |
| `src/data/projects.ts` | 新增 `definition`、`audience`、`versionNote`、`evidenceLinks`、`faqs`、`schemaType` 可选字段；为 6 个重点项目 + 1 个 Skill 项目填写| 一个事实源同时服务项目页、SEO 元数据与 GEO 内容；不覆盖任何已有字段 |
| `src/pages/work/[slug].astro` | 三级面包屑；按 `schemaType` 输出 Schema；新增「一句话说明」「谁需要它」「常见问题」「证据链接」「版本」区块（按数据存在条件渲染） | 让项目页兼具作品集与搜索落地页作用；内容全部来自已有案例事实 |
| `src/styles/work.css` | 新增 `.direct-answer-*`、`.faq-*` 样式，`.fact-list dd` 支持长文本换行 | 新增区块沿用既有设计语言，不改视觉体系 |
| `src/pages/about.astro` | 新增真实符合的 `ProfilePage` Schema（mainEntity 为 Person） | ABOUT 页是完整个人身份资料页 |
| `scripts/audit-seo.mjs` | 新增可重复运行的技术检查脚本 | 把 SEO 检查从人工变为 CI 可用门禁 |
| `package.json` | 新增 `test:seo`，并纳入 `test:all` | 让 SEO 检查进入既有测试链 |
| `tests/repositories.spec.ts` | 期望值改为从生成的 JSON 读取 | 消除硬编码 67/28/41 导致的假失败 |

---

## 2. 元数据结果

- 33 个构建页面中，`<title>`、meta description、canonical、robots meta、og:title、twitter:card **无缺失**。
- SEO 审计脚本报告 **0 个重复标题、0 个重复描述、0 个 canonical 不匹配**。
- `twitter:site` 覆盖 33 个页面。
- 项目页 `og:image` 使用 `project.coverAlt` 作为 `og:image:alt`；无封面的项目回退到默认图。
- 装饰性品牌纹理图保留 `alt=""`（卡片本身含文字标签），审计脚本将此判定为合法，不是缺失。

## 3. Robots 与爬虫策略

```
User-agent: *            → Allow: /
User-agent: OAI-SearchBot → Allow: /
User-agent: GPTBot       → Disallow: /
Sitemap: .../sitemap-index.xml
```

**决策说明**：`OAI-SearchBot` 只影响 ChatGPT Search 的发现与引用，已放行；`GPTBot` 涉及训练数据授权，采用保守默认（不允许），与搜索发现明确分离。这是一项**可人工反转的内容授权决策**，不是 SEO 技术手段；如决定授权训练抓取，需单独修改此处并重新评估授权边界。

未添加任何其他未核验爬虫规则；未创建 `llms.txt`（它不是排名因素，本次不把它当捷径）。

## 4. Sitemap 与索引

- 构建产物 `sitemap-0.xml` 有 24 个 URL，与线上一致。
- 过滤规则保持不变：`/404/`、`/tags/`、`/categories/`、`/archives/`、`/2022/` 不进入 sitemap。
- SEO 脚本验证：sitemap 中每个 URL 都有对应构建页面且未被 `noindex`；没有把 `noindex` 页面误列入 sitemap。
- 索引状态本身（是否被 Google/Bing 收录）**未验证**，需要接入 Search Console / Bing Webmaster Tools。

## 5. 结构化数据

| 页面 | 输出 | 说明 |
|---|---|---|
| 全站 | Person、WebSite | 沿用原有，未改字段语义 |
| 非首页 | BreadcrumbList | 项目页为「首页 → 作品 → 项目名」三级，其余为两级 |
| `/about/` | ProfilePage（mainEntity = Person） | 页面真实展示完整身份档案 |
| 4 个项目页 | SoftwareApplication（uSkill、知识库工程、投资的纪律、2D 微动漫 Skill） | 真实软件/技能包；仅填可核验字段 |
| MBTI64 | WebApplication | 静态 Web 产品 |
| 其余项目页 | CreativeWork | 保持原有类型，不强行升级为软件实体 |

**明确未添加**：`Article` / `TechArticle`（尚无独立文章页，避免空壳 Schema）、`Book`（两本书仍是书稿，未确认出版状态）、`Dataset`（未公开可下载数据集）。也未添加评分、评论、价格或机构背书字段。

## 6. 内链与 GEO 内容

- 项目页新增三级面包屑和"证据链接"（README、演示站等一手来源），均与项目事实对应。
- 6 个项目页新增"一句话说明 / 谁需要它 / FAQ"，答案来自既有 `caseStudy`、`metrics`、`boundaries`，没有新增虚构数据。
- 版本口径默认写"以仓库 Release 为准"，只有 uSkill / 知识库工程在案例记录中有版本时写明，并注明 Beta 状态。

## 7. 英文内容与 hreflang

**本次不建设英文页面、不添加 hreflang**。理由：当前没有真实对应的英文落地页；用机器翻译生成空壳页并声明 hreflang 会伤害可信度。待 uSkill / uRead 的英文内容真正完成后，再按 `en` / `zh-CN` / `x-default` 配置。

## 8. 保留事项

品牌设计系统、Astro 路由、18 个案例页、兼容旧 URL、`docs/ecosystem-audit/`、GitHub Actions 部署、原有 Playwright 测试与图片资产均未删除或改写。

## 9. 风险与待办

1. `GPTBot` 策略需你确认是否保持"不允许"。
2. 站内尚未接入分析；无法验证真实索引覆盖、点击与 AI 引用。
3. 项目 `lastVerified` 多数仍为 2026-11-11，自动核验脚本已能预警，但**未自动修正事实**。
4. Lighthouse / CWV 实测未执行；页面速度无本次数据。
