# Site Audit — zhubao315.github.io

**Audit date:** 2026-11-11  
**Repository:** `zhubao315/zhubao315.github.io` (`main`)  
**Production URL:** https://zhubao315.github.io  
**Scope:** the repository as received, before the Astro rebuild described in the other documents.

## 1. Executive summary

The repository was not a maintainable website source tree. It contained only the generated output of a Hexo 6.2.0 site: ten HTML files plus theme CSS, JavaScript, fonts, a 404 redirect, and a single `Tree.png` asset. There was no `package.json`, no Markdown source, no theme source, and no build configuration that could regenerate the site.

The public pages were largely empty. The only substantial article was the default Hexo starter post (`Hello World`), and the two 2022 URLs did not preserve the author's original writing. Rebuilding from the generated output would have meant inventing content, so the rebuild keeps the URLs and states the limitation explicitly.

## 2. Baseline inventory

| Item | Finding |
|---|---|
| Tracked files | 34 |
| HTML files | 10 |
| Generator | Hexo 6.2.0 (visible in generated `<meta name="generator">`) |
| Source / build config | None |
| Markdown posts | None |
| Theme source | None |
| Package manifest | None |
| JavaScript | jQuery, Pjax, Fancybox, Highlight.js, Valine, Busuanzi, Baidu analytics |
| CSS | Two theme stylesheets plus Font Awesome and Fancybox |
| Images | Theme banner, favicon, `Tree.png` |
| Deployment | Static files served directly from the repository root |

### Existing HTML routes

- `/`
- `/404.html`
- `/about/`
- `/tags/`
- `/categories/`
- `/archives/`
- `/archives/2022/`
- `/archives/2022/07/`
- `/2022/07/05/hello-world/`
- `/2022/07/05/zhubao315/`

## 3. Findings

### P0 — No maintainable source

The repository was a deployment artifact, not a source repository. Making content changes meant editing generated HTML by hand. Any redesign would be overwritten by the next Hexo generation, and no one could reproduce the current site from source.

**Decision:** introduce a real Astro project and treat the old HTML as evidence, not as a template.

### P0 — Legacy content was not recoverable

- `/about/` contained no authored biography.
- `/tags/` and `/categories/` had no meaningful taxonomy entries.
- `/archives/` had an empty archive shell.
- `/2022/07/05/zhubao315/` had no article body.
- `/2022/07/05/hello-world/` contained the stock Hexo “Welcome to Hexo” instructions, not personal writing.

**Decision:** preserve every existing URL, but label these routes as compatibility entries. Do not rewrite them as if they were recovered posts.

### P0 — The 404 experience was a client-side redirect

The old `404.html` used `<meta http-equiv="refresh" content="3;url=/">`. It provided no navigation context, no explanation, and no accessible recovery path.

**Decision:** replace it with a designed, noindex 404 page that links back to the current sections and compatibility archive.

### P1 — No credible portfolio layer

There was no project index, case study, project status, source classification, or link between the site and the public repositories. A visitor could not tell what was original work, what was a Fork, or what was still a prototype.

**Decision:** centralize project facts in `src/data/projects.ts`; distinguish Original, Modified/Fork research, and Upstream research; show status and verification dates on every case page.

### P1 — Third-party runtime dependencies and trackers

The old theme loaded comment, analytics, CDN, and visitor-count scripts. These are unnecessary for a static portfolio, add privacy and availability risk, and made the page dependent on services that may disappear.

**Decision:** ship no third-party runtime scripts. Fonts are self-hosted through Fontsource; icons are local Astro components; there is no analytics, comment system, or external widget.

### P1 — Responsive and accessibility baseline was unknown

The generated theme had no documented responsive QA, no skip link, no explicit focus treatment, and dense navigation that was not designed for 390px screens.

**Decision:** define responsive breakpoints, verify 1440/1280/768/390/375, add a skip link, preserve keyboard focus, and test the mobile menu with Playwright.

### P2 — Asset and metadata hygiene

The generated output included unused theme assets, an old favicon set, no canonical URLs, no social preview image, and no structured data.

**Decision:** generate a consistent icon set, a 1200×630 Open Graph image, canonical URLs, JSON-LD, a web manifest, and a sitemap that excludes noindex compatibility pages.

## 4. What was preserved

- The repository and its Git history.
- The domain and path structure.
- All ten legacy URLs, including the two 2022 article paths.
- Honest attribution of the old site's state.

## 5. What was deliberately not preserved

- The Hexo theme's visual language.
- The stock “Hello World” instructions as if they were personal content.
- The client-side 404 redirect.
- Valine comments, Busuanzi counts, Baidu analytics, and CDN runtime scripts.
- Empty tag, category, and archive listings presented as real archives.

## 6. Acceptance criteria for the rebuild

1. All required legacy URLs resolve with HTTP 200.
2. The new site builds from source with no manual HTML edits.
3. Six flagship projects appear on the homepage with distinct treatments.
4. Every work page states source type, status, and verification date.
5. No unverifiable employer, client, revenue, publication, or performance claim appears.
6. The site works at 1440, 1280, 768, 390, and 375px without horizontal overflow.
7. Internal links resolve in the built output.
8. Deployment is reproducible through GitHub Actions.

## 7. Residual risks

- Legacy article text cannot be restored from this repository. The compatibility pages explain this rather than guessing.
- Some external project sites can change independently of this repository; the site shows snapshot dates and links to the live sources.
- X/Twitter was not reachable from the build environment for a live HTTP check. The handle is taken from the public GitHub profile metadata (`twitter_username: zhubao315`), not invented.
