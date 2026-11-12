# ZHUBAO · Personal Digital Portfolio

Source for **[zhubao315.github.io](https://zhubao315.github.io)** — a working archive of AI systems, product engineering, knowledge engineering, investment research, quantified life, and creative work.

The site is a static Astro build: warm editorial design, bilingual content, verified project facts, no third-party runtime scripts, and a compatibility layer for the 2022 Hexo URLs.

**Content snapshot:** 2026-11-11  
**Production:** deployed via GitHub Actions on 2026-11-12  
**Stack:** Astro 7 · TypeScript · native CSS · Playwright · GitHub Pages

## Pages

| Route | Purpose |
|---|---|
| `/` | Home: identity, six flagship projects, four directions, project index, manuscripts, quantified life, current focus |
| `/work/` | Filterable index of 18 projects plus 10 upstream research samples |
| `/work/[slug]/` | 18 case studies with status, source type, evidence, links, and boundaries |
| `/think/` | Knowledge engineering, investment discipline, AI/Agent research, manuscripts |
| `/explore/` | Personality, quantified life, and creative work |
| `/about/` | Working statement, principles, verified record, timeline, capabilities, boundaries |
| `/404.html` | Designed recovery page |

### Preserved URLs

These paths remain available as supplemental `noindex` compatibility entries. They explain what was lost instead of inventing old content:

- `/tags/`
- `/categories/`
- `/archives/`
- `/2022/07/05/`
- `/2022/07/05/hello-world/`
- `/2022/07/05/zhubao315/`

## Quick start

Requirements: Node.js **22.23.4 or newer** and npm.

```bash
npm ci
npm run dev
```

Open the local URL printed by Astro (normally `http://localhost:4321`).

### Commands

| Command | What it does |
|---|---|
| `npm run dev` | Start the Astro development server |
| `npm run check` | Run Astro/TypeScript diagnostics |
| `npm run build` | Type-check and build the static site into `dist/` |
| `npm run preview` | Preview the built site locally |
| `npm run test:links` | Validate required routes and all internal links in `dist/` |
| `npx playwright test` | Run the 28 browser tests |
| `npm run test:all` | Build, check links, then run Playwright |

The Playwright config starts a preview server on port `4321` and reuses an existing local server outside CI.

## Project structure

```text
.
├── .github/workflows/deploy.yml   # GitHub Pages build + deploy
├── docs/
│   ├── audit.md                   # Legacy repository audit
│   ├── content-manifest.md        # Project facts, sources, claim boundaries
│   ├── redesign-plan.md           # Brief, information architecture, delivery plan
│   ├── design-system.md           # Tokens, typography, components, motion
│   ├── test-report.md             # Build, link, browser, responsive, deployment results
│   └── screenshots/               # Desktop/mobile/tablet QA captures
├── public/                        # Icons, manifest, robots.txt, social image
├── scripts/check-links.mjs        # Built-output link and route checker
├── src/
│   ├── assets/                    # Brand, project covers, generated visuals
│   ├── components/                # Header, footer, project cards, legacy shell
│   ├── data/
│   │   ├── projects.ts            # Canonical project, metric, case-study data
│   │   └── site.ts                # Identity, navigation, directions, snapshot
│   ├── layouts/BaseLayout.astro   # Metadata, fonts, JSON-LD, skip link
│   ├── pages/                     # Primary, case-study, compatibility, 404
│   └── styles/                    # Tokens and page-specific native CSS
├── tests/site.spec.ts             # Routes, responsive, filters, images, menu
├── astro.config.mjs               # Static output, sitemap filter
├── playwright.config.ts
└── package.json
```

## Content model

All project facts are centralized in `src/data/projects.ts`. A project cannot appear on the site without:

- a category and status,
- a source type: `original`, `modified`, or `research`,
- a public GitHub URL,
- a verification date,
- metrics and a case study where claims need support.

Identity and repository counts live in `src/data/site.ts`. The six featured projects are selected by the `featured` flag; the homepage does not maintain a second list.

### Evidence rules

1. No employer, client, revenue, user count, return, award, or publication claim without a public source.
2. Fork and upstream research are never presented as original work.
3. The two books are labeled manuscripts; no ISBN or publisher is implied.
4. Metrics are snapshots. The source sites are the authority after 2026-11-11.
5. Derived totals are explicitly labeled as derived.
6. A demo link is shown only when it resolves.
7. Lost legacy content is preserved as a URL and explained, not rewritten.

See [`docs/content-manifest.md`](docs/content-manifest.md) for the full fact table.

## Design

The visual direction is an editorial technical archive: warm paper `#F7F3EA`, deep navy `#0B1D33`, oversized Manrope headlines, Instrument Serif italic emphasis, monospaced evidence labels, and restrained gold/sky/coral/lime accents.

- Six flagship projects, six distinct treatments.
- 12-column asymmetric layouts that collapse cleanly to one column.
- Self-hosted Inter, Manrope, and Instrument Serif.
- Local SVG icons; no icon CDN.
- One reveal pattern, disabled under `prefers-reduced-motion`.
- No analytics, comments, trackers, or third-party runtime scripts.

Full details: [`docs/design-system.md`](docs/design-system.md).

## Quality

Verified locally on 2026-11-11:

```text
astro check        0 errors, 0 warnings, 0 hints (31 files)
astro build        30 pages
link check         1,044 references across 30 HTML files, 0 broken
playwright         28 passed
responsive         1440 / 1280 / 768 / 390 / 375px, no overflow
sitemap            23 indexable URLs, noindex routes excluded
external audit     44 / 45 URLs HTTP 200 (X.com unreachable)
production         23 / 23 sitemap URLs HTTP 200, 0 broken images
```

The full matrix, limitations, and reproduction commands are in [`docs/test-report.md`](docs/test-report.md). The pre-rebuild repository audit is in [`docs/audit.md`](docs/audit.md).

## Deployment

Deployment is defined in `.github/workflows/deploy.yml`:

1. Trigger on a push to `main` or manual dispatch.
2. Check out the repository and install Node 22.23.4 with npm cache.
3. `npm ci`
4. `npm run check`
5. `npm run build`
6. `npm run test:links`
7. Upload `dist/` as a Pages artifact.
8. Deploy with `actions/deploy-pages@v4`.

**Repository setting:** Settings → Pages → Build and deployment → Source = **GitHub Actions**. This was applied and verified on 2026-11-12; the old site used a legacy branch build from the repository root, which no longer matches this source tree.

No credentials are stored in the repository or remote URL. Deployment uses the workflow's short-lived `GITHUB_TOKEN` with `pages: write` and `id-token: write` permissions.

## Legacy context

The repository originally contained only the generated output of a Hexo 6.2.0 blog: ten HTML files, theme assets, third-party scripts, and no source. The only substantial article was the stock Hexo starter post. The rebuild preserves every existing URL but does not claim to recover writing that was never present.

Read [`docs/audit.md`](docs/audit.md) for the full inventory and decisions.

## License and attribution

The site’s design, writing, and original project imagery are personal work. Third-party project names, logos, and screenshots remain the property of their respective owners and are used for identification and commentary. The public GitHub avatar is cropped and toned for use as a small identity mark.
