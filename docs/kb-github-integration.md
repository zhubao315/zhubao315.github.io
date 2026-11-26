# 知识库成果 ↔ GitHub 仓库 ↔ 主页 对照表

**核验日期：** 2026-11-26
**原则：** 只把有公开载体（仓库 / 站点）的成果发布到主页。知识库内部成果、投稿未上架书稿、营收预测与内网系统只做盘点，不对外宣称。
**权威来源：** GitHub API（`sync-github-data.mjs` 重生成）· 知识库 `2026年度成果物体系总览.md` §3.4/§3.5/§4.3 · 站点 `src/data/projects.ts`

## 1. S 级成果映射

| # | 知识库成果 | GitHub 仓库 | 主页位置 | 公开状态 |
|---|---|---|---|---|
| 01 | MBTI64 人格测评 | `zhubao315/mbti64` | 首页 featured · `/work/mbti64/` · 独立站 | 在线，120 题 / 64 型 / 254 测试 |
| 02 | uSkill 技能底座 | `zhubao315/uSkill` | 首页 featured · `/work/uskill/` | v2.0.0，301 项测试 |
| 03 | Knowledge Base Engineering | `zhubao315/knowledge-base-engineering-skill` | 首页 featured · `/work/knowledge-base-engineering/` | v1.2.0，8 模块 / 25 回归测试 |
| 04 | Investment Discipline | `zhubao315/investment-discipline` | 首页 featured · `/work/investment-discipline/` | 8 模式 / 45 校验 / 63 单测 |
| 05 | Quantified Life | `health` `running` `cycling` `hiking` `active-watch` | 首页 featured · `/explore/#quantified-life` · `/work/quantified-life/` | 四站点 + 运营中枢，每日同步 |
| 06 | Perfect Me 微动漫 | `perfectme` `2d-micro-anime-skill` | 首页 featured · `/work/perfectme/` | 2′31″ 成片 + 全链路 Skill |
| 07 | Z-GRID 个人门户 | `zhubao315.github.io` | 站点自身 | Astro + TS，build workflow |
| 08 | uLife OS Infra | `ulife-os-infra` `ai-agent-master` `gdmp-master` | `/work/ulife-os-infra/` 等项目页 | 身份 / 记忆 / 运维技能包 |

## 2. 书稿映射（4 部，口径：投稿 ≠ 上架）

| 书稿 | 知识库载体 | 公开载体 | 主页位置 | 措辞 |
|---|---|---|---|---|
| 知识库工程学 | `28-创作/书-知识库工程学/`（250 篇） | 配套 Skill 仓库 | 首页 publications · `/think/` | 持续迭代，13 章 + 5 附录 |
| 投资的纪律 | `28-创作/书-投资的纪律/`（106 篇） | 配套 Skill 仓库 | 同上 | 配套 Skill 已开源 |
| AI时代，如何真正学会 | `28-创作/书-AI时代，如何真正学会/`（145 篇） | 无书稿仓库；关联 `e-life-method` | 同上 | **创作中 · 无公开载体** |
| 千分之一的你 | `24-项目支持/64personalities-cn/docs/` | 关联 `mbti64` | 同上 | **视觉 / 审校阶段** |

不写出版社、ISBN、发行时间、销量；私有 `obsidian-vault` 仓库不在任何公开页面链接。

## 3. 思考层映射（本次新增）

| 文章 | 知识库原文 | 公开证据 | 主页位置 |
|---|---|---|---|
| 所有领域最终通向心理学 | `15-洞察/H-029-所有领域最终通向心理学.md` | `h029-psychology` 仓库与站点 | `/articles/all-disciplines-lead-to-psychology/` · `/think/` 元洞察区 |
| 健康、投资、心理：人生操作系统的三条主线 | `15-洞察/人生操作系统的三条主线——健康×投资×心理.md` | 四方向项目与长期数据快照 | `/articles/three-lines-of-life-os/` · 同上 |
| 复利不是公式，是四个领域共用的失败清单 | `15-洞察/复利思维的跨域应用.md` | 四站点公开快照 | `/articles/compounding-across-domains/` · 同上 |

## 4. 四方向分类修正

同步脚本原先的类别与 Z-GRID 定义不一致，已按下列规则修正并重生成 `src/data/generated/*.json`：

| 仓库 | 原分类 | 现分类 | 依据 |
|---|---|---|---|
| `uRead` | CREATE | **THINK** | 知识工程 / 阅读内化 |
| `h029-psychology` | CREATE | **THINK** | 心理学研究 |
| `dual-asset-strategy` | CREATE | **THINK** | 投资研究 |
| `active-watch` | MEASURE | **BUILD** | 四站运营中枢 / 基础设施 |
| `gdmp-master` | THINK | **BUILD** | 平台运维技能 / 基础设施 |
| `grok-build` | MEASURE | **BUILD** | Agent harness / 上游研究 |
| `hip-drive-running` | CREATE | **MEASURE** | 跑步技术与训练 |
| `zhubao315.github.io` | UNCATEGORIZED | **BUILD** | 站点基础设施 |
| `mbti64` `perfectme` `memoir` `2d-micro-anime-skill` | CREATE | CREATE（保持） | 数字产品 / 人格探索 / 原创动画 |

重生成后：BUILD 45 · THINK 14 · MEASURE 5 · CREATE 4 · 公开仓库 68（原创 29 / 二开 2 / 上游 37）。

## 5. 未纳入公开主页的知识库成果

- 3 部白皮书与 12 篇精品长文：无公开载体，按站点「无证据不宣称」纪律不列。
- 45 篇实操手册：有成品但无公开仓库，待打包后另议。
- 投研内参、AI 架构咨询、EchoLife SaaS、工作坊：框架 / MVP 阶段，无公开交付。
- 工作侧 2 个内网站点 + 9 台容器云：业务系统，不计入个人成果验收。
- 营收预测 ~45 万、投资端 −73.9 万：已在收官正本中关账不追。

## 6. 核验与告警

- `uRepo` 公开页探测返回 **404**；项目页已注明「当前线上站点未稳定发布」，分类仍为 THINK 实验项。
- 站点计数来自 `github-stats.json`，`npm run sync:github:check` 用于 CI 漂移检测。
- 数字快照随时间变化：各独立站点实时页面为最终事实源。
