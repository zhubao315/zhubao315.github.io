# Content Manifest

**Snapshot date:** 2026-11-28  
**Canonical data:** `src/data/projects.ts`, `src/data/site.ts`, `src/data/generated/fact-registry.json`  
**Rule:** every number below is either read from a public repository/site or explicitly marked as a derived total.

## 1. Identity and public record

| Fact | Value | Source |
|---|---|---|
| Name | 朱宝 / ZHUBAO | Public GitHub profile |
| GitHub account created | 2011-11-19 | GitHub API |
| Public repositories | 68 | GitHub API (2026-11-27) |
| Non-Fork repositories | 29 | GitHub API |
| Fork / upstream research | 39 | GitHub API |
| Content classification | 29 original / 2 modified / 37 upstream | `github-stats.json`, evidence-based overrides |
| Location label | 北京 · UTC+8 | Personal profile label used by the site |
| Public links | `github.com/zhubao315`, `x.com/zhubao315` | GitHub profile metadata |
| Verification date | 2026-11-27 | Manual snapshot + `sync-github-data.mjs` |

No employer, client, revenue, user count, investment return, or production SLA is claimed.

## 2. Six flagship projects

| # | Project | Type | Status | Public evidence | Boundary |
|---|---|---|---|---|---|
| 01 | MBTI64 | Original product | Active | 120 questions; 64 types; 254 repository tests; 7 rarity tiers | Entertainment/self-exploration, not diagnosis |
| 02 | uSkill | Original infrastructure | Active | v2.0.0 tag (2026-11-13); 301 local tests passed; dual-layer standard; governed runtime | Release notes written; dev status still Beta; Flask-free local runtime |
| 03 | Knowledge Base Engineering | Original knowledge system | Active | v1.2.0; 8 governance modules; 25 fixture tests | Tests are fixtures, not a 10k-document production benchmark |
| 04 | Investment Discipline | Original research system | Active | 8 task modes; 45 structural checks; 63 unit tests; 3 smoke flows | No stock picking, prediction, or return promise |
| 05 | Quantified Life | Modified data practice | Active | 1,054 health days; 2,044 runs / 24,660 km; 5,808 rides / 45,549 km; 344 hikes / 2,694 km | Running is a heavily modified Fork; snapshots change; live sites are authority |
| 06 | Perfect Me | Original creative work | Active | 2'31" film; 3 original characters; full production chain | AI-assisted assets; process documented in the repository |

### Visible metric definitions

- **MBTI64:** 120 full questions plus a 60-question short mode; 64 personality types = 16 base types × 4 states; 254 repository tests.
- **uSkill:** four capability properties; v2.0.0 (`core/uskills/_version.py`); 301 tests passed locally on 2026-11-26; MIT.
- **Knowledge Base Engineering:** 8 governance modules; 25 regression tests; no physical deletion by AI.
- **Investment Discipline:** 8 task routes; 45 structural checks; 63 unit tests; 3 end-to-end smoke paths.
- **Quantified Life:** combined total on the About page is **8,196 activities** and **72,903 km**, derived from the four public snapshots and labeled as derived with `as_of`.
- **Perfect Me:** 2 minutes 31 seconds; three characters (林一 / 一林 / 陈晓); one complete pipeline.

## 3. Remaining project index

24 work pages total (6 flagship + 18 below). Original at project level unless noted; `Quantified Life` is the one `modified` project. Status reflects the repository's public state at the snapshot date. The deleted `uVision` repository is not listed.

| Project | Category | Status | Evidence / note |
|---|---|---|---|
| e-Life Method | Knowledge | Active | 4 theory foundations, 4 system methods, public methodology site |
| uRead | Knowledge | Active | Reading notes, curated lists, knowledge cards; local-first IndexedDB |
| Memoir | Creative | Active | v1.0.0; six product centers; privacy / family permission boundaries |
| 2D Micro Anime Skill | Creative | Active | Five-act script → image generation → mesh animation → audio → FFmpeg |
| uRepo | Knowledge | Archived | Frozen thematic report repository; Pages 404 |
| TESCREAL Guide | Knowledge | Active | Visual guide to the TESCREAL family of ideas |
| H029 Psychology | Knowledge | Experiment | 8 domains, 24 long-form cases; research experiment, not professional advice |
| Dual Asset Strategy | Investment | Experiment | Dual-asset research; no return promise |
| Reading 2026 | Knowledge | Active | 2026 reading archive |
| Hip Drive Running | Quantified Life | Experiment | Running technique, training path, literature notes |
| uPrompt | Agent | Archived | Frozen single-commit prompt experiment; direction absorbed by uSkill |
| 拙诚日课 | Creative | Active | Offline 2.1 information screen; 999 quotes; 30 micro-habits; APK with SHA-256 |
| AI-Agent Master | Agent | Active | Platform operations Skill; 8 audit reports; 16 references; 10 runbooks |
| GDMP Master | Infrastructure | Active | Versioned ops knowledge package; explicitly no AI Skill runtime |
| uLife OS Infra | Agent | Active | Personal Agent OS Skill; identity contract, four-layer memory, cold-start budget |
| ACTIVE Watch | Infrastructure | Active | Four-site patrol, shared COROS quota ledger, brand single source of truth |
| uWise | Knowledge | Active | MkDocs domain encyclopedia; Area → Project → Task framework |
| Piglet Docker | Infrastructure | Experiment | Self-hosted AI coding sandbox image; no public demo |

### Source-type note: Quantified Life / Running

`Running` has GitHub Fork metadata, but its public page and data pipeline have been substantially rebuilt as a personal archive. The Quantified Life project page includes a visible source note; it is not presented as a from-scratch upstream replacement. The portfolio does not claim that modifying a Fork makes the upstream project original.

## 4. Upstream research archive

38 repositories are listed as `UPSTREAM` in `repositories.json` (31 of them are public Forks). `docker_image_pusher` and `running` are the only two classified `MODIFIED` because local commits by the owner provide evidence. Representative samples: DeepSeek Harness, GPUStack, Cube Studio, KubeSphere, Flowise, FastChat, AgentTuning, Learn Agentic AI, Cherry Studio, Auto-GPT. These are attributed to upstream authors; no upstream feature is presented as original work. The full, generated list lives at `/repositories/`.
