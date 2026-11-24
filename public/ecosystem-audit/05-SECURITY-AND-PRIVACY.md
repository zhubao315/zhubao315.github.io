# 05 · 安全与公开边界（P0）

审计方式：GitHub REST API 只读 + 产物 blob 本地分析 + 线上 HTTP 实测。未修改任何远端内容，未输出 Token。

## A. uRead（最高风险）

### 当前公开面

| 路径 | 文件数 | 字节 | MiB |
|---|---:|---:|---:|
| `public/notes/` | 4,589 | 89,175,061 | 85.04 |
| ├ `detail/*.json`（完整正文） | 4,585 | 65,148,161 | 62.13 |
| ├ `notes.json` | 1 | 22,432,938 | 21.39 |
| `public/audio/`（10 WAV） | 10 | 120,088,760 | 114.53 |
| `book-library/books/`（5 EPUB） | 5 | 45,052,062 | 42.96 |
| `book-library/covers/` | 5 | 6,848,216 | 6.53 |

`publishing/policy.json` 当前为 `mode: allow_all_legacy`，`allow`/`deny`/`tag_deny` 全空 → **1,599 / 1,599 篇笔记全部允许公开**；敏感扫描只报告、不过滤产物。`policy.json` 还被复制到 `dist/publishing/` 并公开可访问。

### 风险清单

1. **完整正文全量公开**：`notes.json`（22.4 MB，含 `body`）与 4,585 个 `detail/*.json` 均 HTTP 200。私库 `obsidian-vault` 的 `07-SOURCES/71-书籍` 整目录正文已暴露，且搜索引擎缓存无法保证收回。
2. **2 篇敏感命中笔记仍在线**（JS 正则实际命中 11 处，集中在 2 个 slug）：
   - `B5-科技科普__《趣味网络图解》-小白debug`（`8c9bc76d1205f278`）：内网地址 ×10
   - `B7-传记人物__史蒂夫乔布斯传__《史蒂夫·乔布斯传》-沃尔特·艾萨克森（第17-24章）`（`2302f5423011be9d`）：邮箱 ×1
   - 两者在 `notes.json` / `index.json` / `slugs.json` / `approved-baseline.json` 中均存在，详情 URL HTTP 200。
   - 注意：`B1-文学虚构__《只有男科医生知道》-@成都下水道` 是 Python `\w` 与 JS `\w` 差异造成的假阳性，不应计入。
3. **历史正文无法撤回**：`sync-notes.mjs` 从不清理 `detail/`。4,585 个文件 vs 当前 1,599 个 hash → **2,986 个孤儿正文文件（40.57 MiB）**，抽样 100 个全部 HTTP 200，全部属于当前 slug（即历史版本）。修正当前笔记不会删除旧正文。
4. **电子书缺少授权清单**：5 本 EPUB（42.96 MiB）全部进入 `/uRead/books/catalog.json`，但 README 只声明 2 本有权分发；仓库无任何 `distribution-manifest`。`朱光潜作品集(共六册).epub`（3.72 MB，id `5a6e6a83b4b2`）在 4 个同步前缀之外，来源无记录。所有书共用 `build.py` 生成的统一免责声明，不是逐书授权。
5. **114.53 MiB 孤儿音频每次部署都上传**：10 个 WAV 全部不匹配当前笔记 hash，且 `publish-approve.mjs` 把它们保留在基线中，导致 `new_audio_orphans=0`、CI 恒绿。最大单文件 36.3 MiB。
6. **私库元数据暴露**：1,599/1,599 条笔记的 `source_ref.url` 指向私库 blob URL（含 commit SHA），`source_path` 暴露私库目录；`manifest.json` 公开 `repo: zhubao315/obsidian-vault`、`note_path`。README 声称"只展示目录与 git sha"，与实际不符。
7. **门禁被结构性中和**：`auto-sync.yml` 在 legacy 模式下执行 `APPROVE=1 npm run publish:approve`，把审批差异、敏感变化、新增孤儿音频三个失败条件全部清零；`deploy.yml` 的 `publish:check --strict` 因此恒过。切换正式策略前必须先删除这段自动批准。

### 建议（不改策略、不删内容，等待所有者批准）

- [ ] 新增 `book-library/distribution-manifest.json`：逐书 `source_filename` / `sha256` / `title` / `author` / `rights_basis` / `approver` / `approved_at` / `private_source_path`；`build.py` fail-closed，未列书不得进 `dist/books`。
- [ ] CI 测试：比对 `dist/books/catalog.json` 与授权清单；断言无未引用封面（当前 `covers/6028f80dd5dc.png` 与 5 本书 id 均不匹配）。
- [ ] 生成逐笔记 `allow/deny/pending` 报告（slug、hash、规则命中、状态、URL，不含正文）；2 篇敏感笔记标记 `pending`，不自动下架。
- [ ] 产出 2,986 个孤儿 detail 文件与 10 个孤儿 WAV 的清单（大小、slug）供人工裁决；批准后再改 `sync-notes.mjs` 做原子化 `detail/` 重建。
- [ ] 决定私库 URL/path 是否脱敏为"路径 + SHA"，以及是否继续把 `publishing/policy.json` 发布到 `dist/`。
- [ ] 修正基线漂移：README 写 1,595 篇 / 2 本书、版本 0.33.1，实际为 1,599 / 5 / 0.34.5；审计文档写 8 个孤儿音频，实际 10 个。

> 误报校正：原始 `notes.json` 文本中 18 处 `1[3-9]\d{9}` 来自 40 位 hash 子串，实际 `title`/`body`/`tags` 中 **0** 篇含手机号，不应作为泄露证据。

## B. Memoir

### 已跟踪的运行时文件（必须处理）

| 路径 | 大小 | 说明 |
|---|---:|---|
| `backend/memoir.db` | 45,056 B | SQLite：users=3、entries=1、tags=1、media=0。3 个 bcrypt 哈希（`$2b$12$`）、1 个非占位邮箱域名、中文用户内容。 |
| `backend/__pycache__/main.cpython-312.pyc` | 30,863 B | 内含旧版硬编码 JWT secret 模式、构建机绝对路径 `/fs/memoir/...`、`sqlite:///./memoir.db`。 |

根因：初始提交 `0c6015948de8`（2026-01-29 07:44:39Z）先跟踪了这两个文件，`.gitignore` 在 **7 秒后**才加入 `*.db` 和 `__pycache__/`——Git ignore 对已跟踪文件无效，因此它们一直留在 HEAD。29 次提交中没有任何删除/重命名。

### 演示凭据与个人信息

- `README.md:142-150`、`docs/TEST_ACCOUNTS.md:7-11`：3 个演示账号（林一 / demo / 林晓）共用同一弱 6 位数字密码，并含家庭关系描述。
- **`gh-pages:index.html:277-280`**：同样的凭据**已在公开落地页上线**（线上实测可见）。
- `docs/TEST_ACCOUNTS.md:28-29`：内网地址 `192.168.1.8`。
- `docker-compose.yml`：默认 Postgres/MinIO 凭据（memoir / minioadmin），生产直接使用有风险。
- `.env.example`：仅开发占位 secret，无真实密钥。

### Pages 现状（好消息）

API 配置：`build_type: legacy`，source 为 `gh-pages:/`。该分支只有 6 个静态文件（index.html + 图标），**无后端、无 DB、无 pyc**。线上 `/api/health` 返回 404。后端未通过 Pages 暴露；问题只在静态落地页的凭据文本。`.github/workflows/pages.yml` 若被启用会改为部署 React SPA，默认同源 `/api` 无后端会导致登录失败。

### 安全处置建议（均需按风险流程批准）

1. **P0**：通过 Git Data API 从 HEAD 树移除 `backend/memoir.db` 与 `backend/__pycache__/main.cpython-312.pyc`，保留工作区文件；强化 `.gitignore`；新增 CI 检查 `git ls-files | grep -E '\.(db|pyc)$'`。
2. **P0**：从**线上** `gh-pages:index.html` 与 README/docs 删除演示凭据并重新部署；改为指向本地设置说明。
3. **P0**：将 3 个 bcrypt 哈希与非占位邮箱视为潜在真实用户数据——重置相关实例密码、轮换历史 JWT secret 模式、修改 docker-compose 默认凭据。
4. **P1**：用 `backend/tests/conftest.py` 的临时 DB + 合成 seed 替代二进制 DB；不要提交真实哈希。
5. **单独审批任务**：如需清除历史中的 DB/pyc，使用 `git filter-repo`/BFG，涉及强推与 fork 协调，必须单独批准。

## C. Perfect Me

### 体量与暴露面

- 仓库 API size 507,999 KB；树中 blob 总和约 **625.4 MiB**；无 LFS。
- 目录：build/ 251.92 MiB、07-成片/ 115.83 MiB、05-音频/ 70.15 MiB、10-宣传网站/ 67.70 MiB。
- 扩展名：MP4 123 个 / 311.13 MiB，WAV 56 个 / 134.41 MiB，PNG 91 个 / 116.75 MiB，FLAC 6 个 / 46.72 MiB。
- Pages 为 `legacy` 且 source=`main:/`，即**整仓库发布**。已实测可直接下载：
  - `10-宣传网站/assets/film.mp4` 61,017,573 B
  - `07-成片/高一1班-朱明萱-满分的我(配音版).mp4` 61,017,573 B
  - `07-成片/高一1班-朱明萱-满分的我.mp4` 60,421,766 B
  - `build/mix.wav` 26,763,486 B、`00-文档总览.pdf` 14,148,590 B
- 站点使用 `<video preload="none">`，点击后仍直接拉取完整 58 MiB 文件；无短预览 / HLS / WebP 海报流水线。

### 身份与授权风险

- 成片文件名直接编码「班级 + 真实姓名」：`高一1班-朱明萱-…`，且 `00-文档总览.md:121` 把该命名写成规范。
- README:147-148、00-文档总览、投稿清单、落地页 HTML、build/*.py 中均硬编码同一姓名/班级；**姓名还被烧录进画面与片尾字幕**，仅改文件名不足以匿名化。
- 角色设定为 15 岁高中生；结合真实姓名与班级，属于未成年人身份关联风险。
- 无 LICENSE；README 为「© 2026 朱明萱 · 保留所有权利」；仓库内无监护人/学校/赛事授权文件；模型商用声明（`08-宣传物料/02-文案/投稿清单与合规核对.md`）未附条款或版本。

### 安全处置建议（需批准）

1. **P0**：将 `07-成片/`、`build/`、`05-音频/多轨|配音/`、`06-工程源文件/`、`04-分镜图/`、`images/` 与原始 PDF 移出 Pages 发布树（私有仓库 / LFS / 独立发布分支），只保留 `10-宣传网站/assets/` 与脱敏文档。
2. **P0**：公开路径统一使用通用文件名（`film.mp4`、`char-a.jpg`、`voice-a.mp3`），并**重渲染或遮蔽**画面与字幕中的姓名/班级。
3. **P0**：授权复核——取得学生、监护人、学校与赛事书面同意；补 LICENSE 或明确权利声明；核验 Qwen-Image / ACE-Step / Qwen3-TTS 的实际商用条款。
4. **P1**：短预览 + WebP/AVIF 海报 + 点击加载 + 字幕文件；保留制作脚本与复现能力，但发布与制作资产分离。

## C. 跨项目原则

- 公开仓库、公开 Pages、原始笔记、电子书分发权限必须使用**同一套准入清单**。
- 高风险删除、数据公开、历史重写、许可证修改必须单独出风险报告并获批准。
- 审计只产出报告与清单；未经确认不切换 `publishing/policy.json`、不删除已发布内容、不改写 Git 历史。
