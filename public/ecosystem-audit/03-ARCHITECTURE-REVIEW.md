# 03 · 架构评审

## 建议的五层结构（保留现有选型，不强制统一技术栈）

| 层 | 内容 | 现状 |
|---|---|---|
| L1 品牌门户 | zhubao315.github.io（Astro） | 已有 Z-Grid 与 6 个旗舰项目 |
| L2 业务方向 | BUILD / THINK / MEASURE / CREATE | 已存在，保留 |
| L3 产品项目 | uRead / MBTI64 / Memoir / uSkill / ACTIVE 等 | 独立技术栈，保持独立 |
| L4 共享基建 | 品牌规范、Skills、数据规范、CI/CD、巡检 | ACTIVE 已有集中治理雏形 |
| L5 数据与源 | GitHub 仓库、笔记、数据库、素材、文档 | 分散，需目录化 |

## 技术栈并存原则

Astro（主站）、Next.js 静态导出（MBTI64）、React/Vite + Hugo/OINK（uRead）、Python 数据管道（ACTIVE）、FastAPI（Memoir）可以并存。应共享的是：设计规范、元数据、质量门禁、发布流程，而不是框架。

## 重点架构建议

1. 主站新增 `/repositories/` 目录，不把 67 个仓库塞进首页。
2. ACTIVE 的 `active-watch` 作为运动四站的品牌/配额/巡检单一事实源，继续强化，不推倒重来。
3. uRead 的 Hugo 文档与应用共用 Pages 产物，继续保持。
4. Skills 类仓库形成统一 Catalog + Validator，但不合并为一个 Monorepo。
