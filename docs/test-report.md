# Test Report

**Project:** ZHUBAO · Personal Digital Portfolio  
**Repository:** `zhubao315/zhubao315.github.io`  
**Verification date:** 2026-11-12 (local), 2026-11-12 (production)  
**Content snapshot:** 2026-11-12

## 1. Summary

| Check | Result |
|---|---|
| Type/diagnostics (`astro check`) | 0 errors, 0 warnings, 0 hints across 35 files |
| Production build | 33 HTML pages generated |
| Internal link check | 1,170 references across 33 HTML files, 0 broken |
| Required compatibility routes | All 15 required files present |
| Playwright suite | 34 passed, 0 failed |
| Responsive QA | No horizontal overflow at 1440 / 1280 / 768 / 390 / 375px |
| Sitemap | 24 indexable URLs; compatibility and 404 routes excluded |
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
Result (35 files):
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

- 33 pages built in under one second after image-cache warm-up.
- Output written to `dist/`.
- `sitemap-index.xml` and `sitemap-0.xml` generated.
- No build warnings or missing assets.

The 33 HTML files comprise:

- 6 primary pages: `/`, `/work/`, `/think/`, `/explore/`, `/about/`, `/404.html`
- 18 project case studies under `/work/[slug]/`
- 1 field report: `/think/uskill-2-audit/`
- 8 compatibility/supplemental pages under `/tags/`, `/categories/`, `/archives/`, `/archives/2022/`, `/archives/2022/07/`, `/2022/07/05/`, and the two 2022 article paths

### 3.3 Internal links

Command:

```bash
npm run test:links
```

Result:

```text
Link check passed: 1170 internal references across 33 HTML files.
```

The checker verifies:

- All 15 required routes exist.
- Every root-relative `href` resolves to a file or directory index in `dist/`.
- External, mail, phone, fragment, and data links are skipped.

### 3.4 Sitemap and indexability

`sitemap-0.xml` contains 24 URLs: the six primary indexable pages, 18 project case studies, and the uSkill audit field report, minus the 404 and supplemental routes. Specifically excluded:

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
34 passed (5.8s)
```

### 4.2 Coverage

| Suite | Tests | What is asserted |
|---|---|---|
| Required routes | 17 | HTTP 200; one `<h1>`; `lang="zh-CN"`; canonical URL; title and description present; no horizontal overflow; 404 is noindex |
| Responsive QA widths | 5 | 16 primary routes fit at 1440, 1280, 768, 390, and 375px |
| Homepage | 2 | Exactly six featured projects; all six names present; one cinematic treatment; two reversed compositions; no broken images on `/`, `/explore/`, `/about/` |
| Work index | 1 | 18 cards; category filter returns 2 Agent projects; reset restores 18; search for “MBTI” returns 1; `?filter=agent` sets the active filter |
| uSkill audit report | 1 | Report route renders the scorecard, the four P0 blockers, and the outbound report links |
| Navigation / compatibility | 8 | Mobile menu opens and closes with Escape; seven compatibility pages are noindex and contain the compatibility explanation |

The primary-route list is:

```text
/
/work/
/think/
/think/uskill-2-audit/
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

The same 16 routes were checked at each width:

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

The five external references published in the uSkill audit report (`src/data/audit.ts`) were checked separately on 2026-11-12:

| Reference | Status |
|---|---|
| `github.com/zhubao315/uSkill` | 200 |
| `agentskills.io/specification` | 200 |
| `modelcontextprotocol.io` | 200 |
| `arxiv.org/abs/2602.12670` (SkillsBench) | 200 |
| `platform.openai.com/docs/api-reference/responses` | 403 to automated requests (bot protection) |

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
| Think audit teaser | `think-audit-teaser.jpg` | — |
| uSkill audit report | `audit-report.jpg` | `audit-report-mobile.jpg` |
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
- footer and 404 composition,
- the audit report's scorecard, P0 cards, architecture diagram, and roadmap in both widths.

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

## 12. Addendum — uSkill 2.0 audit report (2026-11-12)

A new field report, `/think/uskill-2-audit/`, was added after the 2026-11-11 verification pass. It publishes the uSkill repository audit (58/100, four P0 blockers, five overlooked engineering problems, 2026 standards context, target 2.0 architecture, phased roadmap, and release gates).

### Local verification

| Check | Result |
|---|---|
| `npm run build` | 33 pages, 0 errors |
| `npm run test:links` | 1,170 internal references across 33 HTML files, 0 broken |
| `npx playwright test` | 34 passed, 0 failed |
| Required routes | 17 passed, including `/think/uskill-2-audit/` |
| Responsive QA | Report route has no horizontal overflow at 1440 / 1280 / 768 / 390 / 375px |
| Sitemap | 24 indexable URLs; the report is included |
| Open Graph | `og:image` points to `/og-uskill-audit.jpg` (1200×630, 69 KB) |

### Content integrity

- The 58/100 score is labelled a subjective engineering judgment, not an automated benchmark.
- The four P0 blockers and five overlooked problems each carry a concrete reproduction basis or code-level rationale; none are presented as measured results.
- External references were re-checked on 2026-11-12: `agentskills.io/specification`, `modelcontextprotocol.io`, and the SkillsBench paper (arXiv 2602.12670) return 200. `platform.openai.com/docs/api-reference/responses` returns 403 to automated requests from this environment (bot protection, not a dead page), so it is not counted as a verified 200.
- The uSkill case study carries an explicit boundary stating that the 2026-11-12 audit found 58/100 and that timeout/retry/interrupt handling, tool permissions, and composite scheduling remain incomplete.

### Deployment status

**Not deployed.** The report page is verified locally only. The deployed `sitemap-0.xml` still lists 23 URLs, and `/think/uskill-2-audit/` is not yet reachable on https://zhubao315.github.io. Production rows elsewhere in this report continue to describe the 2026-11-12 deployment and are unchanged.

## 13. Sign-off

Local build and test verification: **passed**.  
Production deployment and route verification: **passed** for the 2026-11-12 deploy.  
uSkill audit report: verified locally, **pending deployment**.

Launch checklist:

- [x] Push the rebuild to `main`.
- [x] Set Pages source to GitHub Actions.
- [x] Confirm the deploy workflow succeeds.
- [x] Verify production routes and update this section.
