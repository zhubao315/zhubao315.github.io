# uSkill · 单项目 SEO / GEO 全面优化方案

**编制日期**：2026-11-26
**项目**：https://github.com/zhubao315/uSkill · 文档站 https://zhubao315.github.io/uSkill/
**方法**：先审计仓库、源码、测试、Release 与现有文档，再给方案。搜索量与排名机会一律标记为"未验证"。

---

## 第一部分：项目事实审计

### 1.1 可核验事实

| 项目 | 事实 | 证据 |
|---|---|---|
| 定位 | Agent Skills 工程平台：开放标准 + 受治理运行时 + 证据化评测 + 风险分级 | README 首屏、`docs/index.md` |
| 当前版本 | `v2.0.0` tag，2026-11-13；**GitHub Release 页尚无 v2.0.0**（仅 `v0.1.0-preview.1`、`v0.0.1`） | 本地 `git tag`、GitHub API `/releases` |
| 包版本 | `__version__ = "2.0.0"`，单一来源 `core/uskills/_version.py` | 源码实读 |
| Python | `requires-python >=3.11`（3.10 EOL），支持 3.11–3.13 矩阵 | `pyproject.toml`、CHANGELOG |
| 协议 | MIT | `LICENSE`、`pyproject.toml` |
| 测试 | 2026-11-26 本地 `pytest -q`：**301 passed in 2.92s**，全部基于 MockProvider，无需 API Key | 实测命令输出 |
| 覆盖率口径 | 审计时文档站写 261 测试 / 90.6%，与 CHANGELOG 的 91% 不一致；2026-11-26 已改为 301 项实测 + 覆盖率门禁 80% | `docs/index.md` 修正提交、CI 配置 |
| CI | `ci.yml`、`pages.yml`、`release.yml`；矩阵 + 覆盖率门禁 80% + eval 回归门禁 | 仓库文件、CHANGELOG |
| 文档站 | `/uSkill/` HTTP 200；MkDocs Material，含快速开始、CLI、架构、FAQ | 实测 + 本地文档 |
| 社区信号 | Star 0 / Fork 0 / Watcher 0 / Open Issue 0（2026-11-26 API） | GitHub API |
| Topics | `agent-skills`、`ai-agent`、`python`、`skills-framework`、`standardization` | GitHub API |
| 规划中 | 托管技能市场 / 云端面板、幂等续跑与触发精度；Workbench 3.0 本地只读 Web MVP 已实现 | `workbench/`、`docs/roadmap.md` |

### 1.2 已实现 vs 未实现（避免夸大）

**已实现且有测试证据**：双层标准（SKILL.md + uskill.yaml）、校验/导入/导出/migrate、SOP 规则式与 AI 转换、受治理运行时（timeout/retry/权限/审批/检查点/DAG 并行）、JSON Schema 输入约束与输出校验修复环、评测（基线对照、多模型矩阵、版本比较、回归门禁、LLM-as-Judge 隔离）、L0–L4 风险分级、脚本静态扫描、审计脱敏、Registry 五种检索、包校验分发、MCP 工具桥接。

**未实现 / 规划中**：托管技能市场、云端面板、幂等续跑与触发精度（V3.0）。Workbench 3.0 本地只读 Web MVP（React + FastAPI）已实现，需本机运行、不写文件。**不得把托管市场写成已实现。**

### 1.3 与主站数据的一致性（已修正）

审计发现主页 `projects.ts` 的 uSkill 数据停留在 v1.1 / Python 3.10+ / "文档未上线"，与仓库实际不符。本次已修正：版本 v2.0.0、Python 3.11+、301 项测试、文档站入口、边界说明（Release 页已补、Beta 状态、Mock 基线含义），并把 `lastVerified` 更新为 2026-11-26。

---

## 第二部分：SEO 关键词研究（候选意图，搜索量未验证）

### 2.1 关键词地图

| 类型 | 关键词 / 搜索意图 | 目标页面 | 内容形式 | 转化目标 | 验证状态 |
|---|---|---|---|---|---|
| 品牌 | uSkill、朱宝 uSkill、uskills CLI | `/work/uskill/`、文档站首页 | 项目落地页 | 理解项目 | 未验证 |
| 核心 | Agent Skills 工程平台、Agent Skill 标准、技能治理平台 | `/work/uskill/` | 落地页 + 旗舰文章 | 文档访问 | 未验证 |
| 问题 | 如何创建 Agent Skill、SOP 转 Skill、如何校验 Skill、Skill 版本管理 | 文章中心 | 问题解决型文章 | 安装 | 未验证 |
| 场景 | Codex Skill 安装、Claude Code Skill 开发、OpenCode Skill 管理 | 文章 + 文档 quickstart | 教程 | 安装 / 体验 | 未验证 |
| 对比 | uSkill vs 原生 SKILL.md、Skill 与 MCP 的区别、uSkill vs 提示词管理 | 文章 | 方案分析 | 建立差异化认知 | 需可验证依据 |
| 长尾 | JSON Schema 约束技能输出、Skill 评测基线、技能回归门禁、审计日志脱敏、DAG 子技能调度 | 文章 + CLI 文档 | 技术深度文 | 深度使用 | 未验证 |

**排除**：不抢"AI"、"Agent"、"大模型"等宽泛词；不写无证据的性能或用户数声明；不与 uPrompt、AI-Agent Master 争抢同一核心意图（uPrompt 偏提示词管理，AI-Agent Master 偏平台运维）。

### 2.2 每个词必须记录的字段（后续补）

关键词、用户意图、目标页面、内容类型、转化目标、月搜索量、竞争度、当前排名、数据来源。前五项已填；后四项需 GSC / Bing / 实际 SERP 验证，当前一律为空，禁止编造。

---

## 第三部分：GEO 问题地图（24 个问题）

**答案状态**：✅ 现有文档可回答 / ⚠️ 部分回答 / ❌ 缺口

| # | 问题 | 状态 | 落点 |
|---|---|---|---|
| 1 | uSkill 是什么？ | ✅ | README、文档首页、主站直接答案 |
| 2 | uSkill 解决什么问题？ | ✅ | 文档 WHY 章节 |
| 3 | uSkill 适合谁用？ | ⚠️ | README 未明确列出用户类型，主站已补 `audience` |
| 4 | uSkill 是开源的吗？协议是什么？ | ✅ | LICENSE / badge |
| 5 | 当前版本是多少？ | ⚠️ | tag v2.0.0，但 Release 页缺失，易被误判 |
| 6 | 如何安装 uSkill？ | ✅ | `docs/quickstart.md` |
| 7 | 需要 API Key 吗？ | ✅ | 文档 FAQ |
| 8 | 支持哪些 Provider？ | ✅ | CHANGELOG / 文档 |
| 9 | 支持 Python 3.10 吗？ | ⚠️ | 已不支持（3.11+），旧文案仍可能残留 |
| 10 | 与普通 Prompt 有什么区别？ | ✅ | README 首屏 + 主站 FAQ |
| 11 | 与 Agent Skills 开放标准是什么关系？ | ✅ | 文档：不重新发明官方规范 |
| 12 | 双层标准 SKILL.md 与 uskill.yaml 各做什么？ | ✅ | README / `docs/schema.md` |
| 13 | 如何把 SOP 转成 Skill？ | ✅ | `uskills convert` + 案例 |
| 14 | Builder 会自动发布技能吗？ | ✅ | 文档 FAQ：不会，硬约束 |
| 15 | 运行时真的会执行 timeout/retry/审批吗？ | ✅ | CHANGELOG Sprint 3 |
| 16 | 什么是 DAG 子技能调度？ | ✅ | `docs/architecture.md` |
| 17 | 如何评测 Skill 是否有效？ | ✅ | 文档 + 主站 FAQ |
| 18 | 评测全绿说明模型效果好？ | ✅ | 文档 FAQ：不说明 |
| 19 | 什么是 L0–L4 风险分级？ | ✅ | CHANGELOG Sprint 5 |
| 20 | MCP 和 Skill 有什么区别？ | ✅ | 生态对标文档 |
| 21 | 能接入现有 CI 吗？ | ✅ | 文档 FAQ：三条命令门禁 |
| 22 | 需要数据库或服务器吗？ | ✅ | 文档 FAQ：不需要 |
| 23 | 升级 2.0 要改 1.x 技能吗？ | ✅ | 文档 FAQ：不用，向后兼容 |
| 24 | 有 Web 界面吗？ | ⚠️ | Workbench 3.0 本地只读 MVP 已实现；托管市场与云端面板规划中，**不要给承诺日期** |

**内容缺口优先级**：#3（用户类型）、#5（版本与 Release 口径）、#9（Python 版本）、#24（路线图边界）。

---

## 第四部分：SEO 页面优化方案

### 4.1 主站 `/work/uskill/`（已实施部分）

已落地：独立 Title / Description、三级面包屑、`SoftwareApplication` Schema、一句话定义、目标用户、FAQ、证据链接、版本口径、边界。

建议继续补充（P1）：

- 首屏 `h1` 下方增加"20 秒理解"三行：**是什么 / 解决什么 / 怎么开始**。
- 增加"适用场景"列表：团队 SOP 资产化、跨 Agent 技能复用、技能回归门禁、离线审计。
- 增加"快速开始"代码块（直接抄 README 的 4 条命令）。
- FAQ 增补 #5、#9、#24 三问，回答用本报告的事实。
- 内链：`/work/knowledge-base-engineering/`（同为 Skill 工程）、`/work/ai-agent-master/`（补页后）、文档站、GitHub。

### 4.2 文档站（uSkill 自身仓库）

- 首页 hero 已很完整；把"261 回归测试 / 90.6%"更新为**实际口径**（301 项测试本地实测通过；覆盖率以 CI 最新报告为准，不写死数字）。
- 增加"当前版本"事实卡：`v2.0.0` tag / 2026-11-13 / Release 页 2026-11-26 已补 / Python 3.11+ / MIT。
- 所有页面增加稳定引用地址（`https://zhubao315.github.io/uSkill/`）以便被 AI 引用。

### 4.3 GitHub 仓库

- Description 已合格，但可更聚焦用户问题。
- Topics 建议保留现有 5 个，可增加 `evaluation`、`governance`（若确为仓库主题）。
- 补 v2.0.0 的 GitHub Release（当前只有 tag，容易被判为"没有发布"）。
- README 首屏增强（见第五部分）。

---

## 第五部分：README 修改稿（建议稿，未直接覆盖原文件）

> 原文已相当完整，只改首屏与事实卡，不重写全文。以下是建议插入/替换的片段。

**在 logo 下、"uSkill — Agent Skill Engineering Platform"之后插入：**

```markdown
> **一句话**：uSkill 把 SOP、Prompt 与专家经验变成可定义、可执行、可评测、可治理的技能资产。当前版本 **v2.0.0**（tag，2026-11-13），MIT 协议，Python 3.11+。

| 事实 | 值 |
|---|---|
| 版本 | v2.0.0（`core/uskills/_version.py` 为单一来源） |
| 协议 | MIT |
| 运行门槛 | Python ≥ 3.11；无需 API Key（MockProvider） |
| 测试 | 301 项本地实测全部通过（`pytest -q`） |
| 文档 | https://zhubao315.github.io/uSkill/ |
| 当前边界 | v2.0.0 Release 页已补；Workbench 3.0 本地 MVP；托管市场与云端面板规划中 |
```

**在「这是什么」之前增加：**

```markdown
## 谁应该用它

- 需要把团队 SOP 变成可复用、可验证资产的工程师与技术负责人。
- 在 Codex / Claude Code / OpenCode 等环境中管理 Skills 的开发者。
- 希望技能输出有契约、有评测基线、有权限与审计边界的团队。

不适合：只想找一段一次性 Prompt，或需要现成 Web 管理后台的用户。
```

**在 README 末尾 FAQ 段落增加链接**：指向文档站完整 FAQ，避免两处内容漂移。

---

## 第六部分：网站页面文案修改稿（片段）

**首屏直接答案**

> uSkill 是一个 MIT 协议的开源 Agent Skills 工程平台（v2.0.0）：用双层标准把 SOP 变成技能，用受治理运行时执行，用评测门禁证明它没有退化。

**适用场景**

> 当你的技能还停留在 Prompt 字符串、换模型就失效、上线没有门禁时，uSkill 把定义、执行、评测、治理和分发做成同一套可 diff、可离线审计的资产。

**快速开始（与 README 一致）**

```bash
pip install -e ".[dev]"
uskills doctor
uskills validate skills/
uskills run content_pipeline --input '{"text":"示例"}' --library skills
```

**边界**

> v2.0.0 以 Git tag 为准，Release 页已于 2026-11-26 补齐；开发状态仍标记为 Beta；Workbench 3.0 是本地只读 MVP，托管市场与云端面板仍在规划中。CI 全绿只说明判分管道未退化，不等于真实模型语义质量。

---

## 第七部分：FAQ（主站用，8 条）

1. **uSkill 和普通 Prompt 有什么区别？** — Prompt 困在单次对话；uSkill 用 Schema 让技能独立于模型，可验证、版本化、重复调用。
2. **uSkill 是开源的吗？** — 是，MIT 协议，源码与测试全部公开。
3. **当前版本是多少？** — v2.0.0（tag，2026-11-13）；GitHub Release 页尚未发布该版本。
4. **支持 Python 3.10 吗？** — 不支持，需要 3.11+（3.10 已 EOL）。
5. **需要 API Key 吗？** — 不需要。MockProvider 可端到端体验校验、运行、评测与治理命令。
6. **升级 2.0 要改 1.x 技能吗？** — 不用。字段为可选增量，`SCHEMA_VERSION` 保持 1.1.0。
7. **评测全绿说明模型效果好？** — 不说明。它守护判分管道与输出契约，真实效果需自己的评测集接真实模型。
8. **有 Web 管理后台吗？** — 有本地 Workbench 3.0 只读 MVP（React + FastAPI），需在本机运行且不写文件；没有托管市场或云端面板。分发仍是带 sha256 清单的 zip 与 Git 仓库。

---

## 第八部分：Schema 建议

当前主站已输出 `SoftwareApplication`（name / description / url / author / codeRepository / sameAs / applicationCategory / keywords）。

建议后续在页面真实展示对应字段后追加：

- `softwareVersion: "2.0.0"`
- `license: "https://github.com/zhubao315/uSkill/blob/main/LICENSE"`
- `programmingLanguage: "Python"`
- `applicationCategory: "DeveloperApplication"`（已设置）

**不要添加**：`aggregateRating`、`review`、`offers.price`、用户数、下载量——页面没有真实展示这些数据。

---

## 第九部分：10 篇文章选题

| # | 标题 | 目标人群 | 主意图 | 核心证据 | CTA |
|---|---|---|---|---|---|
| 1 | Agent Skills 是什么？与普通 Prompt 有什么区别？ | 初次接触者 | 定义 | 双层标准、Schema | 文档站 |
| 2 | 如何把一份 SOP 转成可执行的 Agent Skill？ | 技术负责人 | 操作 | `uskills convert` + 客服 SOP 示例 | 安装 |
| 3 | 如何设计可校验、可执行的 Agent Skill？ | 工程师 | 方法 | JSON Schema 约束、输出修复环 | 文档 |
| 4 | 在 Codex / Claude Code / OpenCode 中安装与管理 Skills | 开发者 | 场景 | 导入导出、migrate | 安装 |
| 5 | Skill 评测：基线对照与回归门禁怎么做？ | 工程团队 | 深度 | eval / --gate / CI | 文档 |
| 6 | 为什么 Skill 需要 L0–L4 风险分级？ | 安全与平台团队 | 深度 | 能力推导、脚本扫描、审计脱敏 | 文档 |
| 7 | MCP 与 Skill 的分工：连接 vs 方法 | 架构师 | 对比 | 生态对标文档 | 文档 |
| 8 | 无 API Key 如何跑通一条技能流水线？ | 试用者 | 操作 | MockProvider + DAG | 快速开始 |
| 9 | 从 v1.1 升级到 v2.0：向后兼容是怎么做到的？ | 存量用户 | 问题 | SCHEMA_VERSION、migrate --dry-run | 迁移文档 |
| 10 | 一个开源 Skill 项目如何做发布工程？ | 独立开发者 | 案例 | 六 Sprint、CI 门禁、tag/Release 现状 | 仓库 |

每篇必须：100 字内直接答案、真实命令与输出、版本与日期、局限说明、指向官方页面的一手链接。

---

## 第十部分：传播文案（渠道适配，不是同一篇复制）

### 中文

- **GitHub Description（建议）**：`Agent Skills 工程平台：双层标准、受治理运行时、评测门禁与风险分级。MIT / Python 3.11+ / v2.0.0`
- **知乎/公众号标题候选**：《把 SOP 变成可执行的 Agent Skill：一个开源项目的 301 项测试背后》
- **掘金标题候选**：《uSkill 2.0：用 JSON Schema 和回归门禁治理 Agent Skills》
- **V2EX 项目介绍要点**：解决的问题、6 条快速开始命令、无需 API Key、MIT、明确说"没有 Web 后台"。
- **B站脚本结构**：问题（30s）→ 双层标准（60s）→ 无 Key 跑通流水线（90s）→ 评测门禁（60s）→ 边界与路线图（30s）。

### English

- **One-liner**: `uSkill is an open-source Agent Skills engineering platform: open-standard skill packages, a governed runtime, evaluation gates and capability-derived risk levels. MIT / Python 3.11+ / v2.0.0.`
- **Dev.to / Hashnode angle**: "From SOP to governed Agent Skill: schema, runtime controls and regression gates"
- **Reddit / HN angle**: 讨论"技能作为工程资产"的方法论，不与产品广告混写；必须标注 MIT、版本、局限。
- **不投放 Product Hunt**：当前无 Web 产品、无 Release 页、无社区信号，不具备正式发布条件。

---

## 第十一部分：图片与视频素材需求

| 素材 | 规格 | 用途 |
|---|---|---|
| 项目 OG 图 | 1200×630，含 logo + 一句话定义 + 版本号 | 主站项目页、社交分享 |
| CLI 运行截图 | 1440 宽，`uskills run` 真实输出（DAG / checkpoint） | 文章、README |
| 评测报告截图 | `uskills eval --gate` 的真实 JSON/Markdown 输出 | 评测文章 |
| 风险分级截图 | `uskills risk` 输出 | 治理文章 |
| 双层标准目录树图 | SVG，SKILL.md + uskill.yaml + refs/scripts/evals | 文档与文章 |
| 60–90s 演示视频 | 录屏 + 字幕，无配音亦可 | B站 / 社交 |
| 更新海报 | 1080×1350，v2.0.0 六 Sprint 摘要 | 社交传播 |

所有截图必须来自真实运行，禁止合成假输出。

---

## 第十二部分：30 天推广排期

| 周 | 动作 | 交付物 | 不做的事 |
|---|---|---|---|
| 第 1 周 | 补 v2.0.0 Release 页；修文档站过期测试数字；README 事实卡；主站 FAQ 三问 | Release Notes、README 建议稿落地、数据修正 | 不对外发布 |
| 第 2 周 | 发布文章 1、2（定义 + SOP 转 Skill）；做 CLI / 评测截图 | 2 篇文章、4 张截图 | 不刷 Star、不批量外链 |
| 第 3 周 | 发布文章 5、7（评测门禁 + MCP 对比）；中文社区适配（掘金 / 知乎 / V2EX 择二） | 2 篇文章、2 个平台版本 | 不复制同一篇到所有平台 |
| 第 4 周 | 英文 one-liner + Dev.to 教程；B站演示视频；数据复盘 | 1 篇英文、1 条视频、复盘记录 | 不承诺路线图日期 |

每周固定：检查 Search Console / Bing（若已接入）、GitHub Issues、文档站断链；有真实功能更新才做发布活动。

---

## 第十三部分：KPI 监测方案

**基准线（2026-11-26，实测）**：Star 0 / Fork 0 / Watcher 0 / Open Issue 0；搜索数据未接入；主站项目页已上线但无访问数据。

| 维度 | 指标 | 数据来源 | 注意 |
|---|---|---|---|
| 搜索 | Impressions / Clicks / CTR / Queries | GSC（待接入） | 曝光增长 ≠ 排名提升 |
| 索引 | Indexed URLs | GSC / Bing | 关注 `/work/uskill/` 与文档站 |
| AI 搜索 | Cited Pages / Grounding Queries | Bing AI Performance（待接入） | 引用次数 ≠ AI 推荐排名 |
| GitHub | Stars / Forks / Watchers / Issues / Release 访问 | GitHub Insights | Star ≠ 实际用户 |
| 转化 | 文档访问、安装命令复制、演示运行、评测命令使用 | 自有事件（待建设） | 不采集个人敏感数据 |
| 内容 | 文章数、旧文刷新率、内链点击 | 本地记录 / 分析 | 质量优先于数量 |

**统一事件命名**：`view_project`、`click_docs`、`copy_install_command`、`open_demo`、`run_mock_demo`、`submit_feedback`。

**目标设定**：第一个月只建立基准线；之后按实际数据设定增长目标，不预设"涨 10 倍"这类无依据数字。

---

## 第十四部分：P0 / P1 / P2 任务表

| 优先级 | 任务 | 状态 |
|---|---|---|
| P0 | 修正主站 uSkill 过期事实（v2.0.0 / Python 3.11+ / 301 测试 / 文档已上线 / 边界） | **已完成** |
| P0 | 补 GitHub Release（v2.0.0） | **已完成**（2026-11-26） |
| P0 | 文档站测试数字从 261 改为实际口径 | **已完成**（301 项实测） |
| P1 | README 事实卡 + "谁应该用它" | 建议稿已完成，待人工审核落地 |
| P1 | 主站 FAQ 补版本/Python/路线图三问 | 待执行 |
| P1 | 文章 1、2、5、7 | 待创作 |
| P1 | 截图与 OG 素材 | 待制作 |
| P2 | 英文教程与 Dev.to | 待执行 |
| P2 | B站演示视频 | 待执行 |
| P2 | 接入 GSC / Bing AI Performance，建立基准 | 待外部配置 |
| P2 | 托管技能市场 / 云端面板 | 规划中，不给日期（本地 MVP 已实现） |

---

## 交付边界声明

- 本次只提出 README 与文案**修改稿**，未直接覆盖 uSkill 仓库 README；未执行任何外部平台发布。
- 所有数字均来自本地实测、GitHub API 或仓库文件；搜索量与排名未验证，未编造。
- 未声称任何 AI 引用、用户增长或转化效果。

## Evidence
- 仓库与站点事实: GitHub REST API、线上页面实测、本地构建产物，核验于 2026-11-26
- 项目实现与测试: 对应仓库 README / 源码 / 测试输出，见文中各处引用

## Unverified
- 搜索量、排名、CTR、AI 引用次数: UNVERIFIED — 需接入 Google Search Console / Bing Webmaster Tools
- 真实转化与用户反馈: UNVERIFIED — 需自有事件与社区反馈记录

## Review gate
- [ ] human review
- [ ] external publish approved (default: no)
