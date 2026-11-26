# SEO / GEO 测试报告

**执行日期**：2026-11-26
**说明**：以下均为本次实际运行结果；失败项与修复过程一并记录，不把未运行的检查写成通过。

---

## 1. 检查结果

| 命令 | 结果 |
|---|---|
| `npm run check`（astro check） | 43 个文件，**0 errors / 0 warnings / 1 hint**（既有 `scripts/sync-github-data.mjs:284` 的 `ts(2568)` 类型提示，非本次引入） |
| `npm run build` | Astro 构建成功，输出 33 个页面，`sitemap-index.xml` / `sitemap-0.xml` 已生成 |
| `npm run test:links` | **通过**：1433 条内部引用、33 个 HTML 文件，无断链 |
| `npm run test:seo`（新增） | **通过**：33 个 HTML 页面、24 个 sitemap URL、18 个项目核验日期；0 个缺失元数据、0 个重复标题/描述、0 个 canonical 错误、JSON-LD 全部可解析 |
| `npm test`（Playwright，指定本地 Chromium） | **76 passed**，0 failed（desktop + mobile 两个 project） |

Playwright 运行命令（本机浏览器构建号与 Playwright 默认版本不一致）：

```
PLAYWRIGHT_CHROMIUM_PATH=/root/.cache/ms-playwright/chromium-1255/chrome-linux64/chrome npm test
```

## 2. 过程中发现并修复的问题

1. **首次 `npm test` 失败**：`browserType.launch: Executable doesn't exist ... chromium_headless_shell-1254`。本机安装的是 1255 构建。通过配置已有的 `PLAYWRIGHT_CHROMIUM_PATH` 解决，未修改测试框架版本。
2. **`repositories.spec.ts` 6 个用例 × 2 视口失败**：测试硬编码了旧统计值（67 / 28 / 41 / 2026-11-24），而快照已刷新为 68 / 29 / 42 / 2026-11-26。已将期望值改为从 `src/data/generated/github-stats.json` 读取。
3. **剩余 2 个失败**：`by_category` 含 `UNCATEGORIZED: 0`，但页面不会为 0 分类输出卡片。测试改为忽略 0 值分类后通过。
4. **新增 SEO 脚本首次报 18 个 `<img>` 缺 alt**：实际是 Astro 将 `alt=""` 输出为裸 `alt` 属性（装饰性品牌纹理图）。判定规则修正为"存在 alt 属性即通过，空值合法"，随后通过。

## 3. 构建产物抽查

| 检查项 | 命中文件数 |
|---|---|
| `DIRECT ANSWER` 区块 | 6 |
| 常见问题区块 | 6 |
| `ProfilePage` | 1 |
| `SoftwareApplication` | 4 |
| `WebApplication` | 1 |
| `twitter:site` | 33 |
| `EVIDENCE` 侧栏 | 7 |

项目页 Schema 类型分布：4 个 `SoftwareApplication`、1 个 `WebApplication`、13 个 `CreativeWork`；18 个项目页均有 `BreadcrumbList`。

## 4. 未运行 / 未验证

- **外部链接检查**：`check-links.mjs --external` 未运行。
- **Lighthouse / Core Web Vitals**：未运行，无性能分数。
- **Search Console / Bing Webmaster Tools**：未接入，无索引、曝光、点击或 AI 引用数据。
- **真实 AI 引用测试**：未执行。
- **多语言页面**：不存在，无 hreflang 可测。

## 5. 可复现方式

```
cd /oc/site
npm run check
npm run build
npm run test:links
npm run test:seo
PLAYWRIGHT_CHROMIUM_PATH=<本机 chromium 路径> npm test
```

CI 中浏览器由 `npx playwright install --with-deps chromium` 安装，无需该环境变量。
