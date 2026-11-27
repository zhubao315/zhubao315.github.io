# GEO 批次执行报告 · 全部项目

**执行日期**：2026-11-27
**工具**：`growth-master`（`collect_facts.py` + `project-plan` 模板 + `validate_output.py`）
**范围**：`projects.ts` 中此前缺少 GEO 字段的 16 个项目

## 结果

| 项目 | 补齐内容 | 关键事实来源 |
|---|---|---|
| uRead | 定义、受众、版本口径、证据链接、FAQ | README badge、本地仓库 |
| e-Life Method | 定义、受众、FAQ、证据、版本口径 | README（4 理论基石 / 4 系统方法 / 5000+ 笔记实践） |
| 2D Micro Anime Skill | 定义、受众、FAQ、证据、版本口径 | README（npx 安装、五幕流程） |
| 量化生活 | Schema 类型 | 四个站点与数据管道 |
| uVision | 定义、FAQ、状态 → archived | README 冻结归档说明（凭据形态文件待核验） |
| uRepo | 定义、FAQ、状态 → archived | README 冻结归档 + Pages 404 |
| uPrompt | 定义、FAQ、状态 → archived | README 冻结实验 + 单提交 |
| TESCREAL Guide | 定义、FAQ、证据 | README 七大流派 |
| H029 Psychology | 定义、FAQ、证据 | README（8 领域 / 24 案例，研究实验边界） |
| Dual Asset Strategy | 定义、FAQ、证据 | README（研究口径，不承诺收益） |
| Reading 2026 | 定义、FAQ、证据 | README（24 本书 / 四板块） |
| Hip Drive Running | 定义、FAQ、证据 | README（原书观点归属、静态检查门禁） |
| GDMP Master / ACTIVE Watch / uWise / Piglet Docker | Schema 类型 | 已有完整项目数据 |

**累计覆盖**：25 个项目页全部具备 `definition` / `audience` / `versionNote` / `evidenceLinks` / `faqs`（此前已完整的 9 个保持不变）。

## 状态修正

- `uVision` / `uRepo` / `uPrompt` 从 `prototype` / `experiment` 改为 `archived`，与仓库 README 的冻结说明一致。
- 所有冻结项目明确写"不安装、不部署、不纳入主页精选"，不虚构维护计划。

## 质量边界

- 搜索量、竞争度、排名一律 `UNVERIFIED`，未写入数字。
- 投资与心理类内容保留"研究记录 / 个人内容实验、不构成建议"的边界。
- 敏感仓库（uVision 凭据形态文件）不扩展推广，只保留归档说明。

## 验证

`astro check` 0 errors / 0 warnings；构建 60 页；内链 2792 条；SEO 审计通过；事实一致性 28 项通过；Playwright 76 passed。

## Evidence
- 16 个仓库的 README / GitHub 元数据：通过 `growth-master/scripts/collect_facts.py` 采集，2026-11-27
- 项目数据修正：`src/data/projects.ts`，核验于 2026-11-27
- 测试结果：本地命令输出，2026-11-27

## Unverified
- 搜索量与 AI 引用: UNVERIFIED — 需 GSC / Bing Webmaster Tools
- 真实用户反馈: UNVERIFIED — 多数仓库 Star/Issue 为 0
- uVision 凭据形态文件: UNVERIFIED — 需所有者完成核验与轮换

## Review gate
- [ ] human review
- [ ] external publish approved (default: no)
