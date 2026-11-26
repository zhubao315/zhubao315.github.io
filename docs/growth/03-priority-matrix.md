# 03 · 项目分级运营矩阵

**编制日期**：2026-11-26
**依据**：用户提供的增长方案 + GitHub API 实测 + `projects.ts` 现状
**重要说明**：下表中的关键词是**候选搜索意图方向**，不是已完成关键词研究。搜索量、竞争度、排名机会必须在接入 Search Console / Bing Webmaster Tools 后验证，当前一律视为"未验证"。

---

## 分级原则

- **不平均分配资源**：68 个公开仓库不适合逐个运营。
- **一个品牌中枢 + 8~10 个重点增长项目 + 专业长尾 + 上游研究档案**。
- 有真实问题、真实交付物、真实证据的项目才进入第一梯队。
- Fork / 上游研究不做原创包装，只做归因清晰的二次开发专题。

---

## 第一梯队：优先投入（P0）

| 项目 | GitHub 实测状态 | 主页覆盖 | 用户问题 | 候选搜索方向（未验证） | 主要转化 | 下一步 |
|---|---|---|---|---|---|---|
| uSkill | 原创，Python，最近推送 2026-11-25，`/uSkill/` 200 | 有案例页，但边界写"文档未上线"（已过期） | 如何把 SOP 变成可执行、可治理的 Agent Skill | Agent Skills、Skill 开发、SOP 转 Skill、Skill Runtime | 文档访问 / 安装 / Star | 修正边界；建英文入口；补 FAQ 与事实卡 |
| uRead | 原创，最近推送 2026-11-25，`/uRead/` 200 | 有案例页，数据快照 11-20 | 如何管理长期阅读笔记与电子书 | 个人阅读库、阅读笔记、Local-first、电子书管理 | 在线体验 / 反馈 | 建英文内容入口；补安装教程与实测证据 |
| MBTI64 | 原创，TypeScript，最近推送 2026-11-12，`/mbti64/` 200 | 有案例页；`lastVerified` 11-11 | 64 型人格与稀有度如何计算 | 64 型人格、人格稀有度、中文人格测评 | 测评启动 / 结果分享 | 明确娱乐与自我探索边界；补计算模型文章 |
| Knowledge Base Engineering | 原创，Python，最近推送 2026-11-25 | 有案例页，v1.2.0 | 如何治理上万篇 Obsidian 笔记 | Obsidian 知识库治理、知识库审计、AI 知识库 | 安装 / 方法论传播 | 把 8 模块与 OESA 写成专题文章 |
| Investment Discipline | 原创，Python，最近推送 2026-10-13 | 有案例页 | 投资者如何建立买入前检查与复盘流程 | 投资纪律清单、投资复盘、买入前检查 | 安装 / 阅读著作 | 保持"不预测不荐股"边界；补清单模板 |
| Memoir | 原创，Python，1 Star，最近推送 2026-11-25，`/memoir/` 200 | 有案例页，但描述停留在早期 MVP | 如何用 AI 记录家庭故事与人生记忆 | AI 回忆录、家庭记忆、数字传承 | 产品体验 / 关注 | 更新事实；突出隐私、数据控制与家庭资料安全 |
| Quantified Life | health/cycling/hiking 原创，running 为 Fork 深度改造；每天同步 | 有案例页；多项统计日期过期 | 如何长期保存并可视化运动健康数据 | COROS 数据、健康仪表盘、FIT/GPX、运动数据可视化 | 打开面板 / 了解实现 | 统一骑行次数；把 active-watch 写成技术案例 |
| 拙诚日课 | 原创，Python，最近推送 2026-11-25，`/zhuocheng-terminal/` 200 | **缺失**，无作品页 | 如何把旧手机改造成离线日课终端 | 离线习惯管理、日课、微习惯、静坐 | 在线演示 / APK 下载 | 先补数据项与案例页，再谈推广 |
| AI-Agent Master | 原创，Python，最近推送 2026-11-24 | **缺失** | 如何运维 AI Agent 平台与评估 GPU 资源 | AI Agent 运维、GPU 资源评估、Agent 部署 | Skill 安装 / 技术咨询 | 核验 Skill 格式与安装入口后补页 |
| GDMP Master | 原创，Python，最近推送 2026-11-24 | **缺失** | 无代码平台如何做版本化运维与备份恢复 | 无代码平台部署、运维、升级、备份恢复 | 安装 / 阅读文档 | 核验实际功能；注意仓库自述"知识包≠AI 执行" |

> 第一梯队建议控制在 8~10 个。目前实测有 10 个候选，其中 3 个（拙诚日课、AI-Agent Master、GDMP Master）主页缺位，必须先补事实源。

---

## 第二梯队：专业长尾（P1）

| 项目 | 最近推送 | 主页覆盖 | 候选主题 | 条件 |
|---|---|---|---|---|
| uLife OS Infra | 2026-11-25 | 缺失 | 个人 AI 操作系统、智能体记忆、上下文工程 | 先核验是否已有可安装 Skill |
| uWise | 2026-11-25 | 缺失 | 投资知识库、研究知识管理 | 仓库描述为空，必须先补 README |
| uPrompt | 2025-08-11 | 有案例页（实验状态） | Prompt 管理、提示词工程、AI 工作流 | 长期无更新，先判断是否继续投入 |
| uVision | 2026-02-12 | 有案例页（原型） | 投资知识库 | 无稳定演示，暂不推广 |
| Perfect Me | 2026-11-25 | 有案例页 | AI 创作、短片制作、角色设计 | 以作品观看为主，搜索意图偏品牌与创作流程 |
| 2D Micro Anime Skill | 2026-11-25 | 有案例页 | AI 动画生产流程、角色一致性 | 与 Perfect Me 形成内容联动 |
| Dual Asset Strategy | 2026-07-03 | 有案例页 | 双资产策略、研究框架、风险管理 | **先删除收益数字**，否则不推广 |
| Hip Drive Running | 2026-09-14 | 有案例页 | 送髋跑、跑步技术、训练方法 | 明确"训练研究记录，非医疗建议" |
| e-Life Method | 2026-06-08 | 有案例页 | 人生管理、数字生活、个人成长系统 | 已上线 `/e-life-method/` |
| active-watch | 2026-11-26 | 缺失 | 自动巡检、数据同步、品牌一致性、运维治理 | 作为技术案例，不做消费者产品包装 |

四个运动站点（HEALTH / RUNNING / CYCLING / HIKING）可作为独立子品牌专题运营，与 Quantified Life 案例页互相链接。`active-watch` 只展示工程实现，不包装成面向普通消费者的产品。

---

## 第三梯队：上游研究与归档（P2）

GitHub 账号有 **39 个 Fork**，包括 `deepseek-harness`、`gpustack`、`cube-studio`、`kubesphere`、`Flowise`、`FastChat`、`AgentTuning`、`learn-agentic-ai`、`Awesome-Nano-Banana-images`、`cherry-studio`、`ApeRAG`、`fabric`、`portainer`、`Auto-GPT`、`stable-diffusion-webui`、`substrate` 等。

运营规则：

1. 明确标注 Original / Modified / Upstream Research（现有 `sourceMeta` 已具备基础）。
2. 保留上游名称、作者与原始链接。
3. 只说明"实际改了什么、为什么改"，不包装成原创。
4. 仅为确有二次开发价值的内容做专题文章。
5. 长期未更新的纯镜像仓库只保留归档记录，不投入推广资源。

> `running` 在 GitHub 元数据中是 Fork，但页面与数据管道已深度改造为个人跑步档案；`projects.ts` 已有 `sourceNote` 说明，建议在数据结构中正式标记为 `modified`。

---

## 六个长期内容支柱（第一阶段只启动两个）

| 支柱 | 核心项目 | 第一阶段动作 |
|---|---|---|
| Agent 与 AI 工程 | uSkill、AI-Agent Master | **启动**：Skill 规范、SOP 转 Skill、安装管理、测试与版本 |
| 知识工程 | Knowledge Base Engineering、uRead | **启动**：Obsidian 治理、知识库审计、阅读系统 |
| 投资纪律 | Investment Discipline、Dual Asset Strategy | 暂缓，先修合规表述 |
| 量化生活 | Health / Running / Cycling / Hiking | 第二阶段：COROS、FIT/GPX、长期数据档案 |
| AI 产品 | MBTI64、Memoir | 第二阶段：计算模型、隐私与家庭记忆 |
| 创作与生活 | Perfect Me、拙诚日课、2D Micro Anime | 第二阶段：AI 视频、离线终端、日课实践 |

---

## 任务优先级（P0 / P1 / P2）

**P0**

- 同步代码基线，统一仓库数字与分类口径。
- 补齐 3 个第一梯队项目的主页数据。
- 修正 Memoir / uSkill / cycling / 投资收益 等过期或高风险表述。
- `robots.txt` 增加 `OAI-SearchBot` 策略。

**P1**

- 18 个项目页统一补"直接答案 / 事实卡 / FAQ / 证据链接"。
- 建设 `src/content/articles/` 与第一批 4~6 篇原创文章。
- 建立 SEO 检查脚本与 CI 门禁。
- 接入 Search Console 与 Bing Webmaster Tools 建立基准线。

**P2**

- 英文内容入口（uSkill、uRead 优先）与 hreflang。
- 结构化数据按页面类型扩展。
- 发布推广 SOP 与 `growth-master` Skill 沉淀。
