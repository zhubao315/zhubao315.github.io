# Test Report

**Project:** ZHUBAO · Personal Digital Portfolio  
**Repository:** `zhubao315/zhubao315.github.io`  
**Verification date:** 2026-11-11 (local), 2026-11-12 (production)  
**Content snapshot:** 2026-11-11

## 1. Summary

| Check | Result |
|---|---|
| Type/diagnostics (`astro check`) | 0 errors, 0 warnings, 0 hints across 33 files |
| Production build | 32 HTML pages generated |
| Internal link check | 1,121 references across 32 HTML files, 0 broken |
| Required compatibility routes | All 14 required files present |
| Playwright suite | 32 passed, 0 failed |
| Responsive QA | No horizontal overflow at 1440 / 1280 / 768 / 390 / 375px |
| Sitemap | 23 indexable URLs; compatibility and 404 routes excluded |
| Image loading | No broken images on `/`, `/explore/`, `/about/` |
| External URL audit | 44 of 45 URLs returned 200; X.com unreachable from this environment |
| Production deployment | GitHub Actions build and deploy succeeded; 23/23 sitemap URLs return 200 |

The local verification ran against a static preview of `dist/`, so it exercises the same output that GitHub Pages receives.

## 2. Environment

| Item | Value |
|---|---|
| OS | Linux 7.0.0-38-generic (x86_64) |
| Node.js | 26.13.0 (local); 22.23.4 pinned in CI |
| npm | 11.20.0 |
| Astro | 7.4.10 |
| Playwright | 1.65.0 |
| Browser | Chromium, Desktop Chrome profile |
| Preview server | `http://127.0.0.1:4321` |

The GitHub Actions workflow uses Node 22.23.4, `npm ci`, and the same check/build/link commands. Local results were produced with the pinned dependency versions in `package-lock.json`.

## 3. Static checks

### 3.1 Astro diagnostics

Command:

```bash
npm run check
```

Result:

```text
Result (33 files):
- 0 errors
- 0 warnings
- 0 hints
```

### 3.2 Production build

Command:

```bash
npm run build
```

Result:

- 32 pages built in under one second after image-cache warm-up.
- Output written to `dist/`.
- `sitemap-index.xml` and `sitemap-0.xml` generated.
- No build warnings or missing assets.

The 32 HTML files comprise:

- 6 primary pages: `/`, `/work/`, `/think/`, `/explore/`, `/about/`, `/404.html`
- 18 project case studies under `/work/[slug]/`
- 8 compatibility/supplemental pages under `/tags/`, `/categories/`, `/archives/`, `/archives/2022/`, `/archives/2022/07/`, `/2022/07/05/`, and the two 2022 article paths

### 3.3 Internal links

Command:

```bash
npm run test:links
```

Result:

```text
Link check passed: 1121 internal references across 32 HTML files.
```

The checker verifies:

- All 14 required routes exist.
- Every root-relative `href` resolves to a file or directory index in `dist/`.
- External, mail, phone, fragment, and data links are skipped.

### 3.4 Sitemap and indexability

`sitemap-0.xml` contains 23 URLs: the six primary indexable pages and 18 project case studies, minus the 404 and supplemental routes. Specifically excluded:

- `/tags/`
- `/categories/`
- `/archives/`
- `/2022/` and both article paths
- `/404`

All compatibility pages and the 404 page carry `noindex,nofollow`. Every indexable page has a canonical URL, unique title, description, Open Graph metadata, and a single `<h1>`.

## 4. Browser tests

### 4.1 Result

Command:

```bash
npx playwright test
```

Result:

```text
32 passed (5.8s)
```

### 4.2 Coverage

| Suite | Tests | What is asserted |
|---|---|---|
| Required routes | 16 | HTTP 200; one `<h1>`; `lang="zh-CN"`; canonical URL; title and description present; no horizontal overflow; 404 is noindex |
| Responsive QA widths | 5 | 15 primary routes fit at 1440, 1280, 768, 390, and 375px |
| Homepage | 2 | Exactly six featured projects; all six names present; one cinematic treatment; two reversed compositions; no broken images on `/`, `/explore/`, `/about/` |
| Work index | 1 | 18 cards; category filter returns 2 Agent projects; reset restores 18; search for “MBTI” returns 1; `?filter=agent` sets the active filter |
| Navigation / compatibility | 8 | Mobile menu opens and closes with Escape; seven compatibility pages are noindex and contain the compatibility explanation |

The primary-route list is:

```text
/
/work/
/think/
/explore/
/about/
/work/mbti64/
/work/perfectme/
/2022/07/05/hello-world/
/2022/07/05/zhubao315/
/tags/
/categories/
/archives/
/archives/2022/
/archives/2022/07/
/2022/07/05/
```

### 4.3 Responsive matrix

The same 15 routes were checked at each width:

| Width | Viewport height | Result |
|---|---|---|
| 1440px | 1000px | Pass |
| 1280px | 1000px | Pass |
| 768px | 1000px | Pass |
| 390px | 844px | Pass |
| 375px | 844px | Pass |

The overflow assertion allows a 1px rounding tolerance. There were no failures at any route/width pair.

### 4.4 Interaction checks

- Mobile menu: opens at 390px, exposes navigation links, closes on `Escape`.
- Work filters: category, search, reset, and query-string state all pass.
- Sticky header: background/border state is applied after scroll; no layout shift.
- Reveal animations: content becomes visible; reduced motion is handled in CSS.
- Images: all produced `<img>` elements finish with `naturalWidth > 0` on the three image-heavy pages.

## 5. External URL audit

All public URLs in `src/data/` were checked with a 25-second timeout and redirects enabled. Results:

| Group | URLs | 200 | Unreachable |
|---|---|---|---|
| GitHub profiles and repositories | 32 | 32 | 0 |
| Live project sites (`zhubao315.github.io/*`) | 12 | 12 | 0 |
| X / Twitter | 1 | 0 | 1 (connection failure from the sandbox) |
| **Total** | **45** | **44** | **1** |

The X handle `zhubao315` is taken from public GitHub profile metadata. The site does not depend on X being reachable; the link is presented as a public profile link.

No dead demo link is shown for uSkill: its documentation URL returned 404 during the audit, so only the GitHub repository is linked.

## 6. Content and claim audit

Manual checks performed against repositories and public pages:

- Six flagship projects are correctly marked featured.
- MBTI64: 120 questions, 64 types, 7 rarity tiers, 254 repository tests.
- uSkill: v1.1, four capability properties, Schema/CLI/Python API/native executor.
- Knowledge Base Engineering: v1.2.0, 8 governance modules, 25 fixture tests.
- Investment Discipline: 8 task modes, 45 structural checks, 63 unit tests, 3 smoke flows.
- Quantified Life: 1,039 health days; 2,037 runs / 24,548 km; 5,776 rides / 45,291 km; 344 hikes / 2,694 km. Combined totals (8,157 activities, 72,533 km) are explicitly labeled as derived.
- Perfect Me: 2′31″ film, three characters, original production chain; AI-assisted assets are disclosed.
- Publications: both books are labeled manuscripts; no ISBN, publisher, publication date, or sales claim is made.
- Running carries a visible source note because it has Fork metadata despite substantial personal modification. Quantified Life is not presented as a from-scratch replacement of an upstream project.
- No employer, client, revenue, user count, return, SLA, award, or publication claim appears.

## 7. Accessibility checks

Implemented and verified:

- Skip link, landmarks, one `<h1>` per page, logical heading order.
- Visible focus ring on light and dark fields.
- Keyboard-operable mobile menu with Escape close.
- `prefers-reduced-motion` support.
- Body/metadata contrast at or above 4.5:1 on light and dark fields.
- Decorative SVGs hidden from assistive technology.
- Meaningful image alt text in Chinese.
- `lang="zh-CN"` and readable page titles.

Not performed in this iteration:

- Automated axe-core or Lighthouse accessibility scoring.
- Screen-reader testing with NVDA, JAWS, or VoiceOver.
- Firefox and WebKit rendering.
- Real-device testing beyond Playwright viewport emulation.

These are listed as limitations rather than presented as passes.

## 8. Visual QA and screenshots

Screenshots are stored in `docs/screenshots/`:

| Page | Desktop | Mobile |
|---|---|---|
| Home | `home.jpg`, `home-1440-above-the-fold.jpg` | `home-mobile.jpg`, `home-390-above-the-fold.jpg` |
| Work | `work.jpg` | `work-mobile.jpg` |
| Think | `think.jpg` | `think-mobile.jpg` |
| Explore | `explore.jpg` | `explore-mobile.jpg` |
| About | `about.jpg` | `about-mobile.jpg` |
| MBTI64 case study | `project-mbti64.jpg` | `project-mbti64-mobile.jpg` |
| 404 | `404.jpg` | `404-mobile.jpg` |
| Legacy `/hello-world/` | `legacy-hello-world.jpg` | `legacy-mobile.jpg` |
| Tablet header | `home-768-above-the-fold.jpg` | — |
| Mobile menu | — | `home-390-menu.jpg` |

Full-page captures were stitched from viewport segments after triggering lazy image loads and reveal animations. This avoids the known Chromium full-page capture issue where offscreen images are dropped. The fixed header is shown only in the first segment.

Visual checks covered:

- six distinct flagship treatments,
- no clipped headings or overlapping metric blocks,
- no image distortion,
- no horizontal scrollbars,
- stable two-column to one-column transitions,
- mobile menu legibility and close affordance,
- dark/light section rhythm,
- footer and 404 composition.

## 9. Reproducing the checks

```bash
npm ci
npm run check
npm run build
npm run test:links
npx playwright test
```

For a local visual review:

```bash
npm run build
npm run preview -- --port 4321
```

Then open `http://127.0.0.1:4321`.

## 10. Known limitations

1. X.com could not be reached from the audit environment. The handle remains linked because it is public GitHub profile metadata.
2. The legacy 2022 posts cannot be recovered from the repository. Compatibility pages explain this; they do not reconstruct content.
3. Project metrics and health data are point-in-time snapshots. The live sites are the source of truth after 2026-11-11.
4. The Playwright suite uses Chromium only.
5. No automated accessibility scoring or assistive-technology session was run.
6. Screenshots of third-party live sites may age independently of this repository.
7. The GitHub Pages deployment requires the repository Pages source to remain set to **GitHub Actions**. It was switched from the legacy branch build and verified on 2026-11-12.

## 11. Production verification

**Status:** deployed and verified on 2026-11-12.

### Deployment

| Item | Value |
|---|---|
| Verified code commit | `bb30e05` — “Preserve the full 2022 archive path hierarchy” |
| Workflow | [Deploy site to GitHub Pages #43140271248](https://github.com/zhubao315/zhubao315.github.io/actions/runs/43140271248) |
| Trigger | Push to `main` |
| Build job | Success |
| Deploy job | Success |
| Pages build type | GitHub Actions (`workflow`) |
| Production URL | https://zhubao315.github.io |

Documentation-only commits after `bb30e05` reuse the same site output. The route, sitemap, and browser checks below were run against the deployed site after this workflow completed.

### Route checks

| Route | Status | Result |
|---|---|---|
| `/` | 200 | New homepage, one `<h1>`, canonical URL |
| `/work/` | 200 | New project index |
| `/think/` | 200 | New editorial page |
| `/explore/` | 200 | New exploration page |
| `/about/` | 200 | New profile page |
| `/work/mbti64/` | 200 | Case study |
| `/work/perfectme/` | 200 | Case study |
| `/tags/` | 200 | `noindex` compatibility page |
| `/categories/` | 200 | `noindex` compatibility page |
| `/archives/` | 200 | `noindex` compatibility page |
| `/archives/2022/` | 200 | `noindex` year index |
| `/archives/2022/07/` | 200 | `noindex` month index |
| `/2022/07/05/` | 200 | `noindex` compatibility index |
| `/2022/07/05/hello-world/` | 200 | `noindex` compatibility entry |
| `/2022/07/05/zhubao315/` | 200 | `noindex` compatibility entry |
| `/404.html` | 200 | `noindex` recovery page |

### Indexable URLs

All 23 URLs in the deployed `sitemap-0.xml` returned HTTP 200:

- `/`
- `/about/`
- `/explore/`
- `/think/`
- `/work/`
- 18 project case studies under `/work/[slug]/`

The deployed sitemap contains no `/tags/`, `/categories/`, `/archives/` (including `/archives/2022/` and `/archives/2022/07/`), `/2022/`, or `/404` entries.

### Production smoke checks

- Homepage contains exactly 6 flagship `.featured-piece` elements.
- All 10 homepage images load (`naturalWidth > 0`).
- All images on `/explore/`, `/about/`, `/work/`, and `/work/mbti64/` load.
- `/`, `/work/`, and `/about/` have no horizontal overflow at 390px.
- The mobile menu opens and is visible at 390px.
- No browser console errors were observed across the 16 route checks.
- Deployed pages use the new title, canonical URL, stylesheet, and `noindex` metadata.
- The legacy branch build is no longer the Pages source.

## 12. Sign-off (V1)

Local build and test verification: **passed**.  
Production deployment and route verification: **passed**.

Launch checklist:

- [x] Push the rebuild to `main`.
- [x] Set Pages source to GitHub Actions.
- [x] Confirm the deploy workflow succeeds.
- [x] Verify production routes and update this section.

## 13. Brand system V2.0 verification (2026-11-13)

Scope: the Z-Grid brand layer — logo family, direction icons, tokens, shared components, page-level templates, generated fields, OG image, manifest, and documentation. No project facts, URLs, or routes changed.

### 13.1 Environment

| Item | Value |
|---|---|
| OS | Linux (x86_64) |
| Node.js | 22.23.4 |
| npm | 10.9.9 |
| Astro | 7.4.10 |
| Playwright | 1.65.0 |
| Browser | Chromium (system build used via `PLAYWRIGHT_CHROMIUM_EXECUTABLE`) |
| Preview server | `http://127.0.0.1:4321` |

### 13.2 Static checks

| Command | Result |
|---|---|
| `npm run check` | 0 errors, 0 warnings, 0 hints (33 files) |
| `npm run build` | 32 page(s) built, no warnings |
| `npm run test:links` | `Link check passed: 1297 internal references across 32 HTML files.` |

The link count rose from 1,121 to 1,297 because the four-direction rails, mastheads, philosophy panel and per-card media links were added. No reference is broken.

### 13.3 Playwright suite

```text
32 passed (11.8s)
```

All V1 assertions still pass, including the homepage's six `.featured-piece` blocks (two `--reverse`, one `--perfect`), the 18 `[data-project-card]` cards, the compatibility `noindex` entries, and the Escape-to-close mobile menu.

Two assertions were **added**, not relaxed:

- status filter → 3 visible cards for `原型阶段`;
- new **source filter** → `原创项目` keeps 18 cards, `上游研究` yields 0 cards plus the empty state, and reset restores 18.

### 13.4 Responsive QA

Measured as `documentElement.scrollWidth - clientWidth` after a full scroll pass:

| Route | 1440 | 1280 | 768 | 390 | 375 |
|---|---|---|---|---|---|
| `/` | 0 | 0 | 0 | 0 | 0 |
| `/work/` | 0 | 0 | 0 | 0 | 0 |
| `/think/` | 0 | 0 | 0 | 0 | 0 |
| `/explore/` | 0 | 0 | 0 | 0 | 0 |
| `/about/` | 0 | 0 | 0 | 0 | 0 |
| `/work/mbti64/` | 0 | 0 | 0 | 0 | 0 |
| `/2022-07-05/hello-world/` | 0 | 0 | 0 | 0 | 0 |

Mobile checks confirmed separately: the Z-Grid board stays 2 × 2 (never squeezed into a row), the hero statement wraps to four lines without a broken word, the filter rail scrolls horizontally while the page does not, and both select labels stay visible at 390px.

### 13.5 Visual assets

| Asset | Status |
|---|---|
| `public/brand/*.svg` (symbol, mono, horizontal, inverse, stacked, avatar) | Native vector; wordmark converted to paths, no embedded bitmap |
| `public/favicon.svg`, `favicon.ico`, `favicon-32.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` | Regenerated from the Z-Grid mark; legible at 16px |
|  `src/assets/brand/field-*.png` (4) | Generated with Qwen-Image-2.1, 1024 × 1024, no text; imported by `src/data/brand.ts` and re-encoded by Astro (WebP, responsive widths), so raw PNGs never ship |
| `public/og-default.png` | Regenerated: new mark, four-line statement, Z-Grid direction panel |
| `public/site.webmanifest` | Regenerated with the V2 name and description |

Reproduce with `python3 scripts/generate-brand-images.py`, `/tmp/fontenv/bin/python scripts/build-brand-assets.py`, and `node scripts/generate-assets.mjs`.

### 13.6 Screenshots

`docs/screenshots/` was fully recaptured from the V2 build with the new helper:

```bash
npm run preview -- --port 4321   # separate shell
npm run screenshots
```

Twenty files cover desktop and mobile for HOME, WORK, THINK, EXPLORE, ABOUT, the MBTI64 case study, a compatibility page, the 404, plus above-the-fold crops at 1440 / 768 / 390 and the open mobile menu.

### 13.7 Known limitations (V2)

- Production deployment of V2 has not run yet; the numbers above are local preview results.
- Playwright's pinned browser build was unavailable in this environment, so a system Chromium was supplied through `PLAYWRIGHT_CHROMIUM_EXECUTABLE`. CI uses the pinned download.
- No automated axe/WCAG audit, and no physical screen-reader pass.
- Firefox and WebKit were not exercised.
- The generated brand fields are intentionally abstract; they are not product imagery and must never be presented as such.

### 13.8 Sign-off (V2)

Local build, diagnostics, link check, Playwright suite, and responsive QA for the Z-Grid brand layer: **passed**.

Remaining before production:

- [ ] Commit and push the V2 branch to `main`.
- [ ] Confirm the deploy workflow succeeds.
- [ ] Re-verify `/`, `/work/`, `/think/`, `/explore/`, `/about/`, favicon, OG image, and manifest on the live host.
