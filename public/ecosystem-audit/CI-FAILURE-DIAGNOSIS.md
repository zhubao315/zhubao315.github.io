# CI 失败根因诊断与修复（Phase 4）

> 诊断日期：2026-11-25 · 只读诊断 + 低风险修复；未做历史重写或强推。

## 诊断表

| 仓库 | 工作流 | 失败步骤 | 错误 | 类别 | 处置 |
|---|---|---|---|---|---|
| health | Health Sync | Deploy to GitHub Pages | `Found 0 artifact(s)`（产物已上传，deploy-pages 读内部服务竞态） | 瞬时基础设施 | 重跑失败 job → ✅ success |
| cycling | COROS Sync | Deploy to GitHub Pages | 同上（wait 步骤查公开 API，deploy-pages 查内部 Twirp，后端不同） | 瞬时基础设施 | 重跑 → ✅ success |
| uWise | 每日更新 | 构建MkDocs | `The "git-revision-date-localized" plugin is not installed` | 依赖缺失 | 补 `pip install mkdocs-git-revision-date-localized-plugin` → `3b2f34f` |
| uSkill | CI | Ruff | 3× UP038（`isinstance(x,(A,B))`）+ 1× I001 导入排序 | 代码 bug | 改为 `isinstance(x, A \| B)` → `fb8c080`；随后 Mypy 报 anthropic 存根缺失 → `--ignore-missing-imports` → `e631ec7`，CI ✅ success |
| memoir | Deploy Memoir | Build | `Cannot find module './features/media/MediaGallery'` | 代码 bug | 补最小 MediaGallery 组件（读 `/api/media`，不伪造数据）→ `b752fec`，Build ✅ |
| memoir | Deploy Memoir | Deploy | 持续 `Found 0 artifact(s)` | 瞬时基础设施 + 配置冗余 | 线上实际由 legacy `gh-pages` 提供；停用多余 Actions 部署 → `b392748` |

## 修复提交

| 仓库 | Commit | 内容 |
|---|---|---|
| uSkill | `fb8c080` | Ruff UP038 / I001 |
| uSkill | `e631ec7` | Mypy 忽略 vendor-optional anthropic |
| memoir | `b752fec` | 补回 MediaGallery 组件 |
| memoir | `b392748` | 停用多余 Pages Actions 部署 |
| uWise | `3b2f34f` | 补 mkdocs 插件依赖 |
| cycling / health | 重跑失败 job | 瞬时故障恢复 |

## 结论

- **2 个真实代码 bug**（uSkill Ruff/Mypy、memoir 缺失模块）已修复并验证。
- **1 个依赖缺失**（uWise MkDocs 插件）已补齐。
- **3 个瞬时/配置冗余**（health/cycling/memoir 的 Pages artifact 竞态）通过重跑或停用多余部署解决。
- 未改动历史、未强推、未下载大文件。
