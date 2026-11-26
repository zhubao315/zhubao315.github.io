# Phase 4 · CI/CD 门禁推广计划

> **基准**：2026-11-25 · **状态**：审计完成，实施中。
> **原则**：不把所有项目改造成一个框架；按项目类型建立不同的最小门禁，先修真实失败，再补空白。

## 1. 当前门禁地图

| 类型 | 仓库 | 现状 |
|---|---|---|
| Astro 作品集 | zhubao315.github.io | ✅ 类型检查 + 构建 + 链接 + Playwright（Phase 2 已加） |
| Next.js 产品 | mbti64 | ✅ CI + Pages Build Check，均 success |
| React/Vite 产品 | uRead | ✅ 4 工作流，230 单测 + E2E，success |
| 运动数据四站 | running / hiking / cycling / health | ⚠️ 已加固但 health / cycling 最新失败（诊断中） |
| Python/Skills | uSkill / knowledge-base-engineering-skill / investment-discipline / ulife-os-infra / ai-agent-master / gdmp-master | ⚠️ uSkill CI 失败，其余 success |
| 静态内容站 | memoir / perfectme / reading-2026 / uWise / uVision / h029-psychology / dual-asset-strategy / e-life-method / hip-drive-running / tescreal-guide | 部分有 Pages 工作流，多数无质量门禁 |
| Profile README | zhubao315 | ❌ 无工作流 |
| 无工作流原创 | 15 个（详见下表） | ❌ 空白 |

## 2. 无工作流的原创/二次开发仓库（15）

| 仓库 | 方向 | 状态 | 建议模板 |
|---|---|---|---|
| 2d-micro-anime-skill | CREATE | ACTIVE | skills-python |
| dual-asset-strategy | CREATE | ACTIVE | static-site |
| e-life-method | THINK | ACTIVE | static-site |
| grok-build | MEASURE | ACTIVE | （fork 研究，跳过或仅 meta-guard） |
| h029-psychology | CREATE | ACTIVE | static-site |
| hip-drive-running | CREATE | ACTIVE | static-site |
| perfectme | CREATE | ACTIVE | static-site（⚠️ 大媒体，禁止下载 >50MB 资产） |
| tescreal-guide | THINK | ACTIVE | static-site |
| uPrompt | THINK | EXPERIMENT | skills-python 或跳过 |
| uRepo | THINK | EXPERIMENT | 建议关闭 Pages（404），不加 CI |
| uVision | THINK | EXPERIMENT | static-site（有 tests） |
| zhubao315 | THINK | ACTIVE | profile-readme |
| Python-Core-50-Courses / QueryGPT / cube-studio | BUILD | DORMANT | 仅 meta-guard，不做强制门禁 |

## 3. 实施原则

1. **先修失败，再补空白**：health / cycling / uWise / uSkill / memoir 的真实失败优先。
2. **按类型给门禁**，不强制统一框架：
   - 静态站：构建/链接/移动端 smoke/SEO 基础
   - Skills/Python：语法/schema/版本一致性/测试（可选文件用功能检测，不用 `|| true`）
   - Profile README：链接与统计一致性
   - 全仓：元数据与仓库卫生（description/topics/license/db/pyc/大文件）
3. **高风险项目特殊处理**：perfectme 的 58 MiB 视频不入 CI 下载；memoir 后端独立部署，Pages 只做落地页。
4. **最小学步**：每类模板只加必要步骤；所有 job 带 `timeout-minutes`、最最小权限、`ubuntu-24.04`。
5. **可验证**：每个模板落地后用 API 触发一次并读日志确认。

## 4. 交付物

- `PHASE4-CI-GATE-PLAN.md`（本文）
- `CI-TEMPLATES.md`（4 类可直接粘贴的工作流模板）
- `CI-FAILURE-DIAGNOSIS.md`（失败工作流根因与最小修复）
- 实际落地：按优先级选择仓库添加/修复工作流

## 5. 验收标准

| 编号 | 标准 |
|---|---|
| G01 | 每个 ACTIVE 原创仓库有至少一条门禁工作流 |
| G02 | 失败工作流有明确根因，不盲目重跑 |
| G03 | 所有新工作流有 timeout + 最小 permissions + 固定 runner |
| G04 | 静态站与 Skills 使用不同门禁逻辑 |
| G05 | 大媒体/敏感数据项目不被 CI 误伤 |
| G06 | 每个改动都有直播日志验证 |
