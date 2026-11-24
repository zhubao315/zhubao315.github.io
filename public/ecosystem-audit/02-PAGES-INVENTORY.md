# 02 · Pages 站点清单

实测方式：对每个 `has_pages=true` 的仓库请求公开 URL 并检查 HTTP 状态与 `<title>`。

| 仓库 | URL | HTTP | 标题 |
|---|---|---|---|
| zhubao315/cycling | https://zhubao315.github.io/cycling/ | 200 | ACTIVE / 骑行｜zhubao315 的骑行生涯 |
| zhubao315/dual-asset-strategy | https://zhubao315.github.io/dual-asset-strategy/ | 200 | 双资产投资策略 — 改变世界与不被世界改变的攻守之道 |
| zhubao315/e-life-method | https://zhubao315.github.io/e-life-method/ | 200 | e-Life — 自主进化人生操作系统 |
| zhubao315/h029-psychology | https://zhubao315.github.io/h029-psychology/ | 200 | 所有领域最终通向心理学 — 万学归心的认知升级 |
| zhubao315/health | https://zhubao315.github.io/health/ | 200 | ACTIVE / 健康｜zhubao315 的健康数据 |
| zhubao315/hiking | https://zhubao315.github.io/hiking/ | 200 | ACTIVE / 徒步｜zhubao315 的徒步与山野 |
| zhubao315/hip-drive-running | https://zhubao315.github.io/hip-drive-running/ | 200 | 送髋跑 — 4本书构建的跑姿技术体系 |
| zhubao315/mbti64 | https://zhubao315.github.io/mbti64/ | 200 | MBTI64 · 64 Personalities |
| zhubao315/memoir | https://zhubao315.github.io/memoir/ | 200 | Memoir — Your Life. Your Stories. Your Legacy. |
| zhubao315/perfectme | https://zhubao315.github.io/perfectme/ | 200 | 满分的我 · The Perfect Me |
| zhubao315/reading-2026 | https://zhubao315.github.io/reading-2026/ | 200 | 在奇点与道之间寻找锚点 — 2026年度阅读收获 |
| zhubao315/running | https://zhubao315.github.io/running/ | 200 | ACTIVE / 跑步｜zhubao315 的跑步生涯 |
| zhubao315/tescreal-guide | https://zhubao315.github.io/tescreal-guide/ | 200 | TESCREAL 完整指南 \| 技术哲学的七大流派 |
| zhubao315/uRead | https://zhubao315.github.io/uRead/ | 200 | uRead · 个人阅读档案与知识沉淀 |
| zhubao315/uRepo | https://zhubao315.github.io/uRepo/ | 404 |  |
| zhubao315/uSkill | https://zhubao315.github.io/uSkill/ | 200 | uSkill |
| zhubao315/uVision | https://zhubao315.github.io/uVision/ | 200 | uVision - 投资人知识库 |
| zhubao315/uWise | https://zhubao315.github.io/uWise/ | 200 | uWise 百科 |
| zhubao315/zhubao315 | https://zhubao315.github.io/zhubao315/ | 200 | 朱宝 ZHUBAO · 个人作品集 |
| zhubao315/zhubao315.github.io | https://zhubao315.github.io/ | 200 | 朱宝 ZHUBAO \| 构建系统 · 工程知识 · 量化生活 · 创造作品 |

## 发现

- 唯一异常：`uRepo` → 404，说明「启用 Pages」不等于「有可用站点」。
- `zhubao315.github.io` 是根站；其余为 `/{repo}/` 子路径站点。
- `active-watch` 的 homepage 指向 running，但它自身是运营中枢，元数据需修正。
- 需补充：OG / sitemap / robots / 404 页 / 移动端与旧品牌残留的逐站检查（Phase 3）。
