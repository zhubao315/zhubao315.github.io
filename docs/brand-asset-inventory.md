# ZHUBAO Brand Asset Inventory

**Version:** 2.1 · 2026-11 · Midnight Signal  
**Public root:** `public/`  
**Brand root:** `public/brand/`

---

## 1. Logo family

V2.2 起，**生产资产是从定稿效果图切出的位图**（`docs/brand-identity-board.png`，1536×1024），站点 Header / Footer / favicon / OG 全部使用这一套；手绘矢量版退居 `public/brand/vector/` 作为印刷与放大的备份源。同名 `.svg` 是位图的光栅包装（`<image>` 内嵌 base64 PNG），保证「引用 `.svg` 的老链接」不破。

| Asset | Path | Format | Size | Use |
|---|---|---|---|---|
| Symbol | `public/brand/zhubao-symbol.png` (+同名 .svg) | PNG RGBA | 592 × 530 | Header 标记、图标母版、头像母版 |
| Horizontal | `public/brand/zhubao-horizontal.png` (+.svg) | PNG RGBA | 984 × 224 | 网站横向 Logo（Footer lockup） |
| Stacked | `public/brand/zhubao-stacked.png` (+.svg) | PNG RGBA | 344 × 314 | 纵向组合：封面、扉页 |
| White | `public/brand/zhubao-white.png` (+.svg) | PNG RGBA | 346 × 306 | 深色背景反白版 |
| Mono | `public/brand/zhubao-mono.png` (+.svg) | PNG RGBA | 252 × 262 | 单色版（黑，浅底） |
| Mono reverse | `public/brand/zhubao-mono-reverse.png` (+.svg) | PNG RGBA | 260 × 270 | 单色反白（白，深底） |
| App icon master | `public/brand/zhubao-appicon-512.png` | PNG | 512 × 512 | 图标母版（标志 + 深蓝圆角芯片） |
| Social avatar | `public/brand/zhubao-avatar-1024.png` | PNG | 1024 × 1024 | GitHub / 社交头像 |
| Favicon | `public/favicon.svg`, `favicon.ico`, `favicon-32.png` | SVG / ICO / PNG | 16–32 | Browser |
| Apple touch | `public/apple-touch-icon.png` | PNG | 180 × 180 | iOS home screen |
| PWA | `public/icon-192.png`, `icon-512.png` | PNG | 192 / 512 | Manifest |
| Logo guide | `public/brand/brand-logo-guide.pdf` | PDF | A4 × 3 | Logo 使用规范 |

### Vector backup（`public/brand/vector/`）

| Asset | viewBox | Use |
|---|---|---|
| `zhubao-symbol.svg` | 292 × 244 | 印刷、无限放大、二次编辑 |
| `zhubao-white.svg` | 292 × 244 | 矢量反白 |
| `zhubao-mono.svg` | 292 × 244 | `currentColor` 单色剪影 |
| `zhubao-horizontal.svg` | 255 × 88 | 浅底矢量横版（Manrope 800 转 path + 朱宝） |
| `zhubao-horizontal-inverse.svg` | 255 × 88 | 深底矢量横版 |
| `zhubao-stacked.svg` | 240 × 196 | 矢量竖版 |

### Midnight Signal edition spec (V2.2)

- 切图主资产保留效果图的**渐变立体 Z**（顶条 `#2B73F6→#86BDFD`、底条 `#2563EB→#0F3A8C`、白色对角、深海军蓝阴影楔），四角节点即四向色。
- 抠底：按色彩距离生成 alpha（板底 `#020F1D` / 白磁贴 `#FAFBFC`），柔和阴影自然渐隐，无硬边残留。
- Favicon / PWA / app icon = 符号合成到 Deep Navy `#0B1D33` 圆角芯片；avatar 背景 Midnight `#07111F`（manifest `background_color` 同步）。
- OG 图（`public/og-default.png`）：深空底、青色 eyebrow、四向色面板，由 `node scripts/generate-assets.mjs` 渲染。
- 视觉核对表：`docs/screenshots/brand-logo-sheet.jpg`

Regenerate:

```bash
node scripts/slice-logo.mjs                    # 板图 → 生产资产 + 图标组（sharp，需 ensureAlpha）
/tmp/fontenv/bin/python scripts/build-brand-assets.py   # 矢量备份 → public/brand/vector/
node scripts/build-brand-guide.mjs             # brand-logo-guide.pdf
node scripts/screenshot-brand-sheet.mjs        # 核对表截图
```

⚠️ 板图是 3 通道 RGB PNG：sharp 必须先 `.ensureAlpha().raw()`，否则 alpha 会写进蓝通道（症状：金色变粉、单色版变黄）。

## 2. Generated brand fields

| Asset | Path | Prompt intent | Use |
|---|---|---|---|
| BUILD field | `src/assets/brand/field-build.png` | Navy architectural grid, sky lines, gold node | BUILD direction card |
| THINK field | `src/assets/brand/field-think.png` | Paper concentric knowledge rings, navy/gold | THINK direction card, THINK hero field study |
| MEASURE field | `src/assets/brand/field-measure.png` | Paper contour trace, mint line | MEASURE direction card, EXPLORE hero field study |
| CREATE field | `src/assets/brand/field-create.png` | Paper coral/navy geometry | CREATE direction card, creative covers |

Generated with Qwen-Image-2.1 at 1024 × 1024, 25 steps. Reproduce with:

```bash
python3 scripts/generate-brand-images.py
```

The originals live in `src/assets/brand/` and are imported by `src/data/brand.ts`, so Astro resizes and re-encodes them (WebP) at build time. They are **not** in `public/` and never ship as raw 1024px PNGs.

**V2.1 status:** the four current fields are still the warm-paper V2.0 generations. `scripts/generate-brand-images.py` now carries the midnight-base prompts; regeneration runs before the HOME page stage and the old paper fields are replaced in place. No paper field may appear on any page after the migration completes.

Rules:

- These are abstract fields, **not** product screenshots. Never label them as a UI or a demo.
- Use `alt=""` when decorative; add a caption when the image carries meaning.
- Keep text on a solid/scrim layer.
- Do not recolour a field in CSS; regenerate with the correct palette instead.

## 3. Project imagery

Existing project covers are real captures or original artwork and stay authoritative:

| Project | Asset | Note |
|---|---|---|
| MBTI64 | `src/assets/projects/mbti64.webp` | Product screenshot |
| Perfect Me | `src/assets/projects/perfectme.webp` | Original animation still |
| Quantified Life | `health.webp`, `running.webp`, `cycling.webp` | Data dashboards |
| uSkill | `src/assets/projects/uskill-logo.svg` | Logo |
| Investment Discipline | `src/assets/projects/investment-banner.svg` | Original banner |

Projects without a real cover use an **abstract visual study**: a generated field + project initials + category label. This is a deliberate placeholder, not a fake screenshot.

## 4. Icons

| System | Source | Canvas | Stroke |
|---|---|---|---|
| Direction marks | `src/components/DirectionMark.astro` | 24 × 24 | 1.5 |
| Functional icons | `@lucide/astro` | 24 × 24 | 1.5 |
| Logo glyph | `public/brand/zhubao-symbol.svg` | 64 × 64 | 7 (scaled) |

Direction marks are custom SVG and receive colour from the parent (`currentColor`). Functional icons stay Lucide; do not mix a third icon library.

## 5. Social and metadata

| Asset | Path | Size | Notes |
|---|---|---|---|
| OG default | `public/og-default.png` | 1200 × 630 | Regenerated by `scripts/generate-assets.mjs` |
| Avatar | `public/images/avatar.webp` | 48–480 | Public GitHub avatar, cropped and toned; not a formal portrait |
| Manifest | `public/site.webmanifest` | — | Theme `#0B1D33`, background `#F7F3EA` |

## 6. What is intentionally missing

- No stock photography.
- No generated “dashboard” screenshots.
- No AI-generated portrait presented as the author.
- No logo variants with gradients, 3D, or glow.
- No second icon library.
- No external font or icon CDN.

## 7. Usage checklist

- [ ] Correct lockup for the background (standard vs inverse).
- [ ] Clear space ≥ one node width.
- [ ] Symbol ≥ 16px; horizontal ≥ 120px.
- [ ] Mono test at 16px still reads as Z + four nodes.
- [ ] Generated field has `alt=""` or a real caption.
- [ ] No text baked into a generated field.
- [ ] Favicon and manifest updated together.

## 8. Tooling

| Task | Command |
|---|---|
| Slice the identity board into production logo assets + icon set | `node scripts/slice-logo.mjs` |
| Rebuild the vector logo backup family | `/tmp/fontenv/bin/python scripts/build-brand-assets.py` (needs `fonttools`, `brotli`) |
| Rebuild `brand-logo-guide.pdf` | `node scripts/build-brand-guide.mjs` |
| Recapture the brand contact sheet | `node scripts/screenshot-brand-sheet.mjs` |
| Recapture the logo-in-application sheet | `npm run preview -- --port 4321` in one shell, then `node scripts/screenshot-brand-application.mjs` |
| Regenerate the four brand fields | `python3 scripts/generate-brand-images.py` (local Qwen-Image-2.1) |
| Regenerate OG image, favicon set, manifest | `node scripts/generate-assets.mjs` |
| Recapture `docs/screenshots/` | `npm run preview -- --port 4321` in one shell, then `npm run screenshots` |
| Build and verify | `npm run build && npm run test:links && npx playwright test` |
