# 06 · 性能与仓库体积治理报告（Phase 5）

> 审计与清理日期：2026-11-25 · 原则：只删严格未引用文件；不改写 Git 历史、不强推。
> 说明：Git 仓库体积由 HEAD 树 + 历史对象共同决定。**删除 HEAD 文件只减小发布包，不会减小 `.git` 历史体积**。

## 1. 大仓库体积构成

| 仓库 | API size | HEAD 树 | 差距 | 主因 |
|---|---:|---:|---:|---|
| mbti64 | 707 MiB | 257 MiB | ~450 MiB | Git 历史：`gh-pages` 曾推 378 MiB（458 PNG），`main` 曾含 337 MiB `assets-hifi/`；4,521 个不可达历史 blob 共 ~925 MiB（未压缩） |
| perfectme | 508 MiB | 625 MiB（blob 总和） | — | 25 个 >2 MiB 媒体全部被引用；`build/` 中间产物 ~171 MiB、成片 116 MiB、音频 134 MiB |
| running | 372 MiB | 62 MiB | ~310 MiB | Git 历史中数据/场景文件累积；HEAD 大文件全部被引用 |
| uRead | 330 MiB | ~283 MiB | — | 已清理孤儿音频/正文（见 §2） |
| cycling | 153 MiB | ~150 MiB | 小 | 数据文件 `data.db` / `activities.json` / parquet 均被引用 |

## 2. 本次实际清理（uRead）

严格未引用判定：文件 hash 不在 `public/notes/notes.json` 的 `content_hash` 集合中；抽样 30 个孤儿正文，0 个被代码引用。

| 类别 | 清理前 | 清理后 | 释放（HEAD/发布包） |
|---|---:|---:|---:|
| `public/audio/*.wav` | 10（114.53 MiB，全部孤儿） | 0 | 114.53 MiB |
| `public/notes/detail/*.json` | 4,589（62.19 MiB） | 1,599（与 1,599 篇笔记一一对应） | 40.64 MiB |
| **合计** | | | **155.17 MiB** |

提交：`629f82a5`。部署后验证：孤儿 detail/wav 均 404，当前笔记 detail 200，站点与 books 正常。

## 3. 未清理项（有充分理由）

| 仓库 | 文件 | 理由 |
|---|---|---|
| perfectme | 2×58 MiB 成片、41 MiB build/visual.mp4、多份 WAV | 全部被 `build/*.py` / 落地页引用；成片是发布作品本身；涉及未成年人姓名，需隐私授权后再处理，不在"未引用"范畴 |
| perfectme | `images/qwen21_*`（5 张，~9.6 MiB） | 源艺术创作素材，无直接引用但属 AMBIGUOUS，保留 |
| mbti64 | `docs/试做图/NEO_INTJ-A-O_1024.png`（2.78 MiB） | 与 `.gitignore`/README"不入库"策略矛盾，但属生成测试图，AMBIGUOUS；未自动删 |
| mbti64 | 2 张人格星图 PNG | 曾被故意从历史恢复到仓库，属有意归档，保留 |
| cycling / running | `data.db` / `activities.json` / `data.parquet` / scenes | 前端与同步流水线的唯一事实源，被代码/工作流引用 |
| uRead | 5 本 EPUB（42.96 MiB） | 合法发布内容，授权待裁定但不在"未引用"范畴 |

## 4. 重复 blob（未删除）

- mbti64：16 组重复（~12.6 MiB），如 `public/assets/book-visual/scenes/plate-10.png` ↔ `书-千分之一的你/插图/图10.png`；两者角色不同（Web 产物 vs 书稿母版），删除需改构建代码。
- cycling / running：`fira-code-400.woff2` 与 `fira-code-500.woff2` 字节相同（品牌层已记录）。
- perfectme：成片 ↔ 站点副本、BGM ↔ build 输入，均有不同消费者。

## 5. 历史体积治理（需单独批准）

真正缩小 mbti64/running 的 `.git` 需要 `git-filter-repo`/BFG 重写历史 + 强推 + 所有 fork/协作者协调。这会改变所有 commit SHA。**本次未执行**。若批准，建议步骤：备份 → 识别历史大 blob → filter-repo → 验证所有分支 → 协调强推 → 观察 7 天。

## 6. 结论

- 本次安全释放 **155 MiB 发布包体积**，未触碰历史。
- 所有 >2 MiB 的未引用大文件均已清理；其余均有代码/构建/发布引用或属需人工决定的归档/隐私资产。
- 仓库历史体积（mbti64 450 MiB 差距）需独立的高风险治理流程。
