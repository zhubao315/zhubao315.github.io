# Redesign Plan

**Project:** `zhubao315/zhubao315.github.io`  
**Production target:** https://zhubao315.github.io  
**Content snapshot:** 2026-11-11  
**Design system:** V2.0 · Z-Grid  
**Status:** V1 implemented and deployed; V2 implemented and verified locally.

## 1. The brief

Turn a generated Hexo blog with almost no recoverable content into a premium personal digital portfolio for ZHUBAO. The site must cover AI systems, product engineering, knowledge engineering, investment research, quantified life, and creative work without inventing a professional history.

The redesign has to solve three problems at once:

1. **Credibility.** Every project claim needs a public source, a status, and a boundary.
2. **Craft.** The site should feel authored, not like a template with a project grid.
3. **Continuity.** Existing URLs must keep resolving, even where the original content no longer exists.

## 2. Constraints

### Must keep

- `/about/`, `/tags/`, `/categories/`, `/archives/`
- `/2022/07/05/hello-world/`, `/2022/07/05/zhubao315/`
- A usable 404 page
- Astro + TypeScript + native CSS
- A single source of truth for project facts
- GitHub Actions deployment to GitHub Pages
- Responsive behavior at 1440, 1280, 768, 390, and 375px

### Must not do

- Invent employers, clients, roles, awards, publications, user counts, revenue, investment returns, or performance benchmarks.
- Present a Fork or upstream research repository as original work.
- Call a manuscript a published book.
- Force-push, rewrite remote history, or alter other repositories.
- Add third-party trackers or runtime scripts.
- Expose credentials in source, documentation, logs, or Git remotes.

### Non-goals

- A CMS or comment system.
- A blog engine with an authoring workflow.
- Reproducing the visual language of the old Hexo theme.
- Reconstructing the text of lost 2022 posts.

## 3. Success criteria

| Area | Criterion | Result |
|---|---|---|
| Content integrity | All public claims map to a repository, site, or metadata source | Met through `src/data/projects.ts` and `docs/content-manifest.md` |
| Six flagship projects | Homepage shows exactly six, each with a distinct treatment | Met |
| Compatibility | Every legacy URL returns 200 and explains its status | Met |
| Build | Reproducible static build from source | 32 pages built |
| Links | All internal references resolve | 1,121 references checked |
| Responsive | No horizontal overflow at five target widths | 32 Playwright tests pass |
| Performance/privacy | No third-party runtime requests | Fonts and icons are local |
| Deployment | Push to `main` builds and deploys through Pages | Workflow included; production verification recorded in `test-report.md` |

## 4. Positioning and art direction

### Positioning

> A working archive of systems, knowledge, measured life, and creative work.

The site is not a résumé and not a startup landing page. It is closer to an edited annual report: numbered sections, evidence labels, source notes, and a visible point of view.

### Visual direction

- **Warm paper** (`#F7F3EA`) as the default canvas, not pure white.
- **Deep navy** (`#0B1D33`) for evidence-heavy and cinematic sections.
- **Sky blue**, **gold**, **coral**, and **lime** as functional accents, never as generic gradients.
- **Editorial asymmetry**: 12-column compositions, intentional off-balance media, and large type that can break across lines.
- **Restrained motion**: reveal-on-scroll only; no parallax, autoplay, or decorative loaders.
- **Bilingual labeling**: Chinese is primary; English is used as an index and tonal layer.

The full specification is in `docs/design-system.md`.

## 5. Information architecture

### Primary navigation

| Page | Route | Job |
|---|---|---|
| HOME | `/` | Establish identity, show six flagship projects, connect four directions |
| WORK | `/work/` | Complete index of 18 projects and 10 upstream research samples, with filters |
| Case study | `/work/[slug]/` | Context, approach, evidence, links, boundaries, verification date |
| THINK | `/think/` | Knowledge engineering, investment discipline, AI/Agent research, manuscripts |
| EXPLORE | `/explore/` | Personality exploration, quantified life, and creative work |
| ABOUT | `/about/` | Working statement, principles, verified record, trajectory, capabilities, boundaries |

### Compatibility layer

| Route | Treatment |
|---|---|
| `/tags/` | Supplemental `noindex` page explaining the lost taxonomy |
| `/categories/` | Supplemental `noindex` page explaining the lost categories |
| `/archives/` | Supplemental `noindex` archive with links to the two preserved 2022 paths |
| `/archives/2022/` | Supplemental `noindex` year index |
| `/archives/2022/07/` | Supplemental `noindex` month index |
| `/2022/07/05/` | Supplemental date index |
| `/2022/07/05/hello-world/` | `noindex` compatibility entry; the original body was the stock Hexo starter post |
| `/2022/07/05/zhubao315/` | `noindex` compatibility entry; no authored body survived |
| `/404.html` | Designed recovery page, `noindex` |

Compatibility pages are excluded from `sitemap-0.xml` and from primary navigation. They preserve URL integrity without pretending the old content is recoverable.

## 6. Content model

All project facts live in `src/data/projects.ts`. Each project record contains:

- identity: `id`, `slug`, `name`, `nameZh`
- classification: `category`, `status`, `sourceType`, `featured`
- editorial copy: `tagline`, `summary`, `description`
- implementation: `tech`, `githubUrl`, optional `demoUrl` and `extraLinks`
- evidence: `metrics`, optional `caseStudy` with context, approach, evidence, boundaries
- provenance: optional `sourceNote`, `lastVerified`

`sourceType` is deliberately narrow:

| Type | Meaning |
|---|---|
| `original` | Built as an original project at the repository level |
| `modified` | Based on an upstream repository but substantially reworked; provenance remains visible |
| `research` | Fork or upstream sample used for study, not counted as an original portfolio work |

Status is one of `active`, `prototype`, `experiment`, or `archived`. No status implies adoption, revenue, or production scale.

Identity facts live in `src/data/site.ts` and are limited to public GitHub metadata and profile labels. The snapshot date is visible in the header, hero, project pages, and About page.

## 7. Page plans

### 7.1 HOME

**Goal:** answer “who is this, what have they built, and how do they work?” in one scroll.

1. **Hero.** Four-line brand statement, a short Chinese introduction, an identity row, five verified facts, a ticker, and the **Z-Grid system map** — a 2 × 2 board with a continuous Z path, four direction marks, and a central `Z` core.
2. **Selected Work 01–06.** Six flagship projects with deliberately different visual treatments:
   - MBTI64 — browser-framed product screenshot, 8/4 split
   - uSkill — dark capability diagram, reversed 4/8 composition
   - Knowledge Base Engineering — light governance board, 8/4 split
   - Investment Discipline — narrow reversed composition with a typographic banner
   - Quantified Life — three-panel data collage plus a terrain card
   - Perfect Me — full-bleed cinematic still with an overlay title
3. **Four Directions.** Dark section with four generated field images, 24px direction marks, and semantic accents BUILD / THINK / MEASURE / CREATE.
4. **Project Universe.** Six additional projects plus a repository snapshot: 61 public, 24 non-Fork, 37 Fork/upstream.
5. **Publications.** Two manuscripts, explicitly labeled as in-progress and not published.
6. **Quantified Life.** One health dashboard image and four live site entries.
7. **Now Building.** Three current focus areas, each linked to a case study.
8. **About preview.** A short statement and a route into the full profile.

### 7.2 WORK

- Page masthead: archive range, provenance categories, snapshot date.
- Hero with project count, research count, and verification date.
- A **provenance register** derived from `projects.ts`: original, modified, research, active counts.
- Category filters, text search, status selector, **source selector**, reset, and query-string support (`?filter=agent`).
- 18 project cards with real covers, designed visuals, or abstract visual studies.
- A separate upstream research section labeled “研究，不等同于原创”.
- Cards expose category, status, source type, and a direct case-study link.

### 7.3 Case study

- Project name, Chinese subtitle, tagline, category, status, source type, verification date.
- Primary links: live demo when one exists, GitHub always.
- Metrics strip scoped to the project.
- Visual or diagram.
- Context, approach, evidence, and boundaries.
- Source note where provenance needs nuance (notably Quantified Life / Running).
- Previous/next project navigation and related work.

### 7.4 THINK

A dark research-journal masthead (`ZHUBAO RESEARCH / VOL. 02`), a generated knowledge-network field study, then three research tracks — Knowledge Engineering, Investment Discipline, AI & Agent Research — followed by notes, manuscripts, and a bridge back to the work index. The page is an editorial argument, not a list of blog posts.

### 7.5 EXPLORE

A field-notes masthead and a generated longitudinal-trace cover, then three long-horizon explorations:

1. Personality: MBTI64 as a live product.
2. Quantified life: health, running, cycling, and hiking sites with snapshot metrics and a clear source note.
3. Creative work: Perfect Me, 2D Micro Anime Skill, Memoir, and uPrompt.

### 7.6 ABOUT

- Page masthead framing identity, philosophy, principles, and boundaries.
- Portrait card using the public GitHub avatar with an explicit provenance note.
- Working statement and signature.
- **Z-Grid philosophy panel:** the symbol, the four-direction system, and the shared “verifiable” constraint.
- Four operating principles.
- Verified public record: 61 repositories, 1,039 health days, 8,157 derived activities, 72,533 derived kilometres, two manuscripts.
- Timeline limited to publicly supportable anchors.
- Five capability lines, with a note that tool lists are not proficiency scores.
- Boundaries: what the site deliberately does not claim.
- Public contact links only.

## 8. Engineering plan

### Stack

- Astro 7.4.10, static output, directory-format trailing slashes.
- TypeScript and Astro components.
- Native CSS split by concern: `global.css`, `brand-v2.css`, `work.css`, `editorial.css`, `about.css`, `responsive.css`.
- `@astrojs/sitemap` with noindex routes filtered.
- Self-hosted Fontsource fonts and local Lucide icons.
- Playwright for browser tests and a Node link checker for built HTML.

### Deployment

- `.github/workflows/deploy.yml` runs on `main`.
- Node 22.23.4, `npm ci`, `npm run check`, `npm run build`, `npm run test:links`.
- Uploads `dist` with `actions/upload-pages-artifact@v3`.
- Deploys with `actions/deploy-pages@v4` and the `github-pages` environment.
- Pages source must be set to **GitHub Actions**, not the legacy branch build.

## 9. Delivery sequence

### V1 — rebuild

1. Audit the generated repository and record what is verifiable.
2. Define the content manifest and claim boundaries.
3. Build the design tokens, layout, and shared components.
4. Implement primary pages and the case-study template.
5. Add compatibility routes and the 404 page.
6. Centralize project data and generate all 18 case studies.
7. Add SEO, sitemap filtering, manifest, icons, and social image.
8. Run type check, build, link check, and Playwright suite.
9. Capture desktop/mobile screenshots and audit external URLs.
10. Commit, push, configure Pages, deploy, and verify production routes.

### V2 — Z-Grid brand system

1. **Brand strategy.** Positioning, four directions, voice, visual keywords, page personalities. Deliverables in `docs/brand-*.md`.
2. **Logo.** Native-SVG Z-Grid symbol, horizontal/stacked/inverse lockups, mono mark, avatar, favicon and PWA derivatives.
3. **Icons.** 24 × 24, 1.5px direction marks; Lucide retained for functional icons.
4. **Tokens.** Direction tokens, legacy aliases, contrast checks, V2 override layer.
5. **Shared components.** Header, footer, hero system map, direction cards, page masthead, provenance register.
6. **HOME.** Four-line statement, Z-Grid map, identity/fact bars, six flagship projects, four generated direction fields.
7. **WORK.** Masthead, provenance register, source filter, abstract covers for projects without real screenshots.
8. **THINK / EXPLORE / ABOUT.** Research-journal and field-notes mastheads, generated field covers, Z-Grid philosophy panel.
9. **Social and docs.** New OG image, manifest, brand documentation, design-system update.
10. **Verification.** Build, link check, Playwright, 1440/1280/768/390/375 overflow checks, screenshot refresh.

## 10. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Legacy content cannot be recovered | Preserve URLs, label them as compatibility entries, do not reconstruct |
| Fork metadata could be mistaken for original work | Visible source type and source note; separate research section |
| Metrics drift over time | Snapshot date everywhere; live sites named as source of truth |
| Screenshots of third-party sites age | Use them as snapshots; link to live sources |
| External links rot | Link audit recorded; fix or remove dead demo links |
| Large type breaks mobile layouts | Explicit 390/375 tests and dedicated responsive rules |
| Generated brand fields could read as product UI | Marked `alt=""`, used only behind scrims, labelled `VISUAL STUDY · NOT A PRODUCT SCREENSHOT` where used as a cover |
| Direction accents fail contrast as small text on paper | Accents restricted to marks, rules, labels and large numerals; body text stays ink/muted |
| Brand layer drifts from the V1 stylesheet | V2 rules isolated in `brand-v2.css`, loaded last; legacy tokens kept as aliases |
| GitHub Pages branch/action mismatch | Workflow documented; Pages must be switched to GitHub Actions |
| Deployment credentials leak | Token kept outside the repository; remote URLs contain no credentials |

## 11. Out of scope for this iteration

- CMS integration.
- Server-side search.
- Analytics and audience measurement.
- Automated visual regression baselines.
- Firefox/WebKit browser matrix.
- New writing that is not backed by an existing public source.

These are deliberate omissions, not hidden failures.
