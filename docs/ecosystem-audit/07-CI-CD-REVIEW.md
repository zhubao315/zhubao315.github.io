# 07 · CI/CD 评审

| 仓库 | 工作流数 | 最近结论 | 日期 |
|---|---|---|---|
| DockerTarBuilder | 3 | - | - |
| active-watch | 1 | success | 2026-11-23 |
| ai-agent-master | 1 | success | 2026-11-24 |
| cycling | 4 | failure | 2026-11-24 |
| deepseek-harness | 0 | - | - |
| docker_image_pusher | 1 | - | - |
| gdmp-master | 1 | success | 2026-11-24 |
| health | 3 | failure | 2026-11-24 |
| hiking | 4 | success | 2026-11-23 |
| investment-discipline | 1 | success | 2026-10-13 |
| knowledge-base-engineering-skill | 1 | success | 2026-10-22 |
| leapp | 0 | - | - |
| mbti64 | 3 | success | 2026-11-12 |
| memoir | 2 | success | 2026-11-18 |
| newton | 0 | - | - |
| openclaude | 0 | - | - |
| piglet-docker | 1 | success | 2026-04-21 |
| reading-2026 | 2 | success | 2026-06-08 |
| running | 5 | success | 2026-11-24 |
| substrate | 9 | success | 2026-11-01 |
| uRead | 4 | success | 2026-11-24 |
| uSkill | 3 | success | 2026-11-13 |
| uWise | 4 | failure | 2026-05-31 |
| ulife-os-infra | 1 | success | 2026-11-19 |
| zhubao315.github.io | 2 | success | 2026-11-20 |

## 共性问题

1. 多个工作流仍使用浮动 Action tag、`ubuntu-latest`、无 `timeout-minutes`（已在部分仓库修复，需全账号收敛）。
2. 测试门禁强度不一：主站 Playwright 未进入 deploy 门禁；ACTIVE 三站此前只有格式检查（已修复）。
3. 部署后缺少线上冒烟：建议对关键路由做 HTTP/内容断言。
4. 缺少统一发布元数据（版本、Commit SHA、测试报告、回滚方案）。
