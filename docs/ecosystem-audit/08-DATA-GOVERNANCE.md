# 08 · 数据治理

## 当前问题

- 主页写死 `repoCount: 61, nonForkCount: 24, forkCount: 37, lastVerified: 2026-11-11`，与 API 当前 67/28/39 不一致。
- 同一指标散落在 Profile README、主站 `src/data/site.ts`、项目文档，无法自动对账。
- 分类、来源、状态、授权边界为人工字段，不应被同步器覆盖。

## 建议模型

动态字段：full_name, description, homepage, branch, languages, fork/parent, license, topics, pushed_at, size, stars, pages, workflows, release。
人工字段：category, source_type, status, 项目定位, 案例叙述, 授权边界, evidence, boundaries。

所有指标必须声明：数据来源、统计方法、单位、统计区间、生成时间、核验时间；发现冲突时生成报告而不是静默覆盖。
