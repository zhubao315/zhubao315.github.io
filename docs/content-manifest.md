# Content Manifest

**Snapshot date:** 2026-11-26  
**Canonical data:** `src/data/projects.ts`, `src/data/site.ts`  
**Rule:** every number below is either read from a public repository/site or explicitly marked as a derived total.

## 1. Identity and public record

| Fact | Value | Source |
|---|---|---|
| Name | 朱宝 / ZHUBAO | Public GitHub profile |
| GitHub account created | 2011-11-19 | GitHub API |
| Public repositories | 68 | GitHub API |
| Non-Fork repositories | 29 | GitHub API |
| Fork / upstream research | 39 | GitHub API |
| Location label | 北京 · UTC+8 | Personal profile label used by the site |
| Public links | `github.com/zhubao315`, `x.com/zhubao315` | GitHub profile metadata |
| Verification date | 2026-11-26 | Manual snapshot + `sync-github-data.mjs` |

No employer, client, revenue, user count, investment return, or production SLA is claimed.

## 2. Six flagship projects

| # | Project | Type | Status | Public evidence | Boundary |
|---|---|---|---|---|---|
| 01 | MBTI64 | Original product | Active | 120 questions; 64 types; 254 repository tests; 7 rarity tiers | Entertainment/self-exploration, not diagnosis |
| 02 | uSkill | Original infrastructure | Active | v1.1; Schema, CLI, Python API, native executor | AI conversion/executor marked Beta |
| 03 | Knowledge Base Engineering | Original knowledge system | Active | v1.2.0; 8 governance modules; 25 fixture tests | Tests are fixtures, not a 10k-document production benchmark |
| 04 | Investment Discipline | Original research system | Active | 8 task modes; 45 structural checks; 63 unit tests; 3 smoke flows | No stock picking, prediction, or return promise |
| 05 | Quantified Life | Original data practice | Active | 1,039 health days; 2,037 runs / 24,548 km; 5,776 rides / 45,291 km; 344 hikes / 2,694 km | Snapshots change; live sites are the source of truth |
| 06 | Perfect Me | Original creative work | Active | 2'31" film; 3 original characters; full production chain | AI-assisted assets; process documented in the repository |

### Visible metric definitions

- **MBTI64:** 120 full questions plus a 60-question short mode; 64 personality types = 16 base types × 4 states; 254 repository tests.
- **uSkill:** four capability properties; v1.1; zero deployment dependencies for the local-first core.
- **Knowledge Base Engineering:** 8 governance modules; 25 regression tests; no physical deletion by AI.
- **Investment Discipline:** 8 task routes; 45 structural checks; 63 unit tests; 3 end-to-end smoke paths.
- **Quantified Life:** combined total used on the About page is **8,157 activities** and **72,533 km**, derived by adding the four public snapshots.
- **Perfect Me:** 2 minutes 31 seconds; three characters (林一 / 一林 / 陈晓); one complete pipeline.

## 3. Remaining project index

All 18 work pages are Original at the project level unless noted. Status reflects the repository's public state at the snapshot date.

| Project | Category | Status | Evidence / note |
|---|---|---|---|
| e-Life Method | Knowledge | Active | 4 theory foundations, 4 system methods, public methodology site |
| uRead | Knowledge | Active | Reading notes, curated lists, knowledge cards |
| uVision | Investment | Prototype | Early prototype; no stable demo claimed |
| Memoir | Creative | Prototype | Early MVP; no stable demo claimed |
| 2D Micro Anime Skill | Creative | Active | Five-act script → image generation → mesh animation → audio → FFmpeg |
| uRepo | Knowledge | Experiment | Thematic report experiment |
| TESCREAL Guide | Knowledge | Active | Visual guide to the TESCREAL family of ideas |
| H029 Psychology | Knowledge | Experiment | 8 domains, 24 long-form cases |
| Dual Asset Strategy | Investment | Experiment | Dual-asset research with a 10-year backtest |
| Reading 2026 | Knowledge | Active | 2026 reading archive |
| Hip Drive Running | Quantified Life | Experiment | Running technique, training path, literature notes |
| uPrompt | Agent | Prototype | Prompt management product exploration |

### Source-type note: Quantified Life / Running

`Running` has GitHub Fork metadata, but its public page and data pipeline have been substantially rebuilt as a personal archive. The Quantified Life project page includes a visible source note; it is not presented as a from-scratch upstream replacement. The portfolio does not claim that modifying a Fork makes the upstream project original.

## 4. Upstream research archive

These ten repositories are Fork or research samples and are not counted as original portfolio works:

1. DeepSeek Harness — Agent harness / plugin execution environment
2. GPUStack — GPU cluster and inference orchestration
3. Cube Studio — cloud-native ML platform / MLOps
4. KubeSphere — Kubernetes multi-cluster platform
5. Flowise — visual LLM orchestration
6. FastChat — LLM training, serving, evaluation
7. AgentTuning — agent fine-tuning research
8. Learn Agentic AI — learning path and notes
9. Awesome Nano Banana Images — AI image examples and prompts
10. Cherry Studio — multi-model desktop client

The Work index labels this section “研究，不等同于原创” and links to the public forks.

## 5. Manuscripts

Two works are presented as manuscripts, not published books:

| Work | Subtitle | Public facts | Status |
|---|---|---|---|
| 知识库工程学 | 从收藏到可治理的知识系统 | 13 chapters, 5 appendices, companion Skill v1.2.0 | Continuously revised |
| 投资的纪律 | 从情绪交易到纪律复利 | 8 task modes, 45 checks, 63 tests | Companion Skill open source |
| AI时代，如何真正学会 | 在工具之外，重建学习的纪律 | No public manuscript carrier; related e-Life Method repo | In progress; no ISBN or release date |
| 千分之一的你 | 64 型人格与稀有度的视觉书稿 | Linked to public MBTI64 repo | Visual / review stage; no ISBN or release date |

No ISBN, publisher, print run, sales figure, award, or release date is claimed. The two additional manuscripts are listed as in progress, with links to related public projects rather than to a manuscript carrier.

## 6. Contact and brand assets

| Asset | Provenance | Treatment |
|---|---|---|
| Avatar | Public GitHub profile | Cropped, desaturated, used at small/medium sizes only |
| Project screenshots | Public project sites, captured for this rebuild | Presentational; live sites remain authoritative |
| Project covers | Public project sites / repositories | Not presented as commissioned art |
| Fonts | Fontsource packages (Inter, Manrope, Instrument Serif) | Self-hosted at build time |
| Icons | Lucide / local SVG | Local components |
| ZHUBAO logo | Authored for this site as native SVG (`scripts/build-brand-assets.py`); wordmark outlines taken from the self-hosted Manrope variable font | No bitmap embedded in SVG; single-colour variant tested at 16px |
| Brand field images | Generated locally with Qwen-Image-2.1 (`scripts/generate-brand-images.py`), abstract, no text | Decorative only, always behind a scrim; labelled `VISUAL STUDY · NOT A PRODUCT SCREENSHOT` when used as a card cover |
| OG / PWA images | Rendered locally by `scripts/generate-assets.mjs` from the brand mark and `src/data/site.ts` | Counts are the same verified snapshot shown on the site |

The portrait is explicitly labeled “PUBLIC AVATAR” on the About page; it is not presented as a commissioned portrait.

## 7. Compatibility routes and their content status

| Route | Current purpose | Indexing |
|---|---|---|
| `/about/` | New About page | Indexable |
| `/tags/` | Compatibility entry explaining the lost tag archive | noindex |
| `/categories/` | Compatibility entry explaining the lost category archive | noindex |
| `/archives/` | Compatibility entry explaining the lost archive | noindex |
| `/2022/07/05/` | Date index for the two legacy posts | noindex |
| `/2022/07/05/hello-world/` | Explains that the source was the Hexo starter post | noindex |
| `/2022/07/05/zhubao315/` | Explains that no article body survives | noindex |
| `/404.html` | Designed not-found page | noindex |

## 8. Claims intentionally absent

- No “leading,” “world-class,” or “production-grade” language without evidence.
- No fabricated employer, client list, title, or years of experience.
- No invented publication details.
- No invented user numbers, revenue, traffic, conversion, or investment performance.
- No claim that a Fork is original work.
- No claim that a fixture test proves production scale.
- No claim that inaccessible legacy writing was recovered.


## 9. Meta insights and knowledge-base integration (2026-11-26)

Three cross-domain essays were published from the personal knowledge base into `src/content/articles/` and surfaced on `/think/`:

| Article | Origin | Evidence used | Boundary stated |
|---|---|---|---|
| 所有领域最终通向心理学 | H-029 meta-hypothesis | 8 domains / 24 cases; 100% psychological bottleneck; 4.6/5 average weight | Classification study, not a controlled experiment |
| 健康、投资、心理：人生操作系统的三条主线 | Cross-domain synthesis note | Three-layer model + six documented connections | Interpretive framework, not medical or investment advice |
| 复利不是公式，是四个领域共用的失败清单 | Cross-domain compounding note | Public Quantified Life snapshots (1,039 days; 2,037 runs / 24,548 km; 5,776 rides; 344 hikes) | Snapshots change; live sites are the source of truth |

Repository classification was aligned with the four public directions in `scripts/sync-github-data.mjs`: `uRead`, `h029-psychology`, `dual-asset-strategy`, `tescreal-guide` and related research are THINK; `active-watch`, `gdmp-master`, `grok-build` and `zhubao315.github.io` are BUILD; `hip-drive-running` is MEASURE; `mbti64`, `perfectme`, `memoir` and `2d-micro-anime-skill` remain CREATE. Regenerated counts: BUILD 45 / THINK 14 / MEASURE 5 / CREATE 4.

One public page probe returned 404 (`uRepo`); the project page already states that this site is not stably published. The private `obsidian-vault` repository is not linked from any public page. See `docs/kb-github-integration.md` for the full crosswalk.

## 10. Book landing pages and cross-site references (2026-11-26)

Four self-authored manuscripts now have dedicated landing pages at `/books/<slug>/`, linked from the navigation, homepage publications, Think page, related work pages and relevant articles. Each page carries: core thesis extracted from its public uRead note, reader ID, note slug, companion repository, related projects/articles and explicit boundaries (no ISBN, publisher or release date).

| Book | Direction | Reader ID | uRead note slug |
|---|---|---|---|
| 知识库工程学 | THINK | 38036cf7bf29 | B5-科技科普__《知识库工程学》-朱宝 |
| 投资的纪律 | THINK | a2e2ed0dd1d8 | B6-投资理财__《投资的纪律》-朱宝 |
| AI时代，如何真正学会 | THINK | dd24f66b8e72 | B3-认知成长__《AI时代，如何真正学会》-朱宝 |
| 千分之一的你 | CREATE | df4c81f86b08 | B3-认知成长__《千分之一的你》-朱宝 |

Direction rule: all four are THINK (engineering knowledge) by primary function; 千分之一的你 carries CREATE as a secondary direction because it is a personality-exploration work. No book is classified as BUILD or MEASURE.

Cross-site links are reciprocal: uRead note pages link back to these landing pages (`src/data/ownBooks.ts`), and uRead book detail pages link to both the landing page and the reader (`scripts/books-index.mjs`). The uRead distribution manifest remains `DRAFT_AWAITING_OWNER_APPROVAL`; this change adds links only and does not alter distribution policy or the approval baseline.
