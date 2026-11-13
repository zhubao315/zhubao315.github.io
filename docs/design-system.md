# Design System

**Site:** ZHUBAO · Personal Brand & Digital Portfolio  
**Version:** 2.0 · Z-Grid  
**Source of truth:** `src/styles/global.css`, `src/styles/brand-v2.css`, `src/components/*.astro`, `src/layouts/BaseLayout.astro`  
**Companion documents:** `docs/brand-guidelines-v2.md`, `docs/brand-color-system.md`, `docs/brand-typography.md`, `docs/brand-asset-inventory.md`

## 1. Concept

The visual system is an **editorial technical archive** organised by a four-direction brand structure. Warm paper, deep navy, oversized statements, numbered sections, monospaced evidence labels, and deliberate asymmetry remain the foundation. V2.0 adds **Z-Grid**: one geometric mark, four direction marks, four semantic accents, and a page-level template for HOME, WORK, THINK, EXPLORE and ABOUT.

Three rules shape every page:

1. **Show the work, then the claim.** Metrics and source labels sit next to the project, not in detached marketing copy.
2. **Make hierarchy physical.** Scale, dark/light fields, and column width do the work; decoration is secondary.
3. **Keep the edges visible.** Boundaries, source notes, compatibility pages, and status labels are part of the interface.

Brand idea:

> 把想法变成系统，把知识沉淀为资产，把生活记录成可持续的实践。

Brand statement:

> Build Systems. Engineer Knowledge. Measure Life. Create Things.  
> 构建系统 · 工程知识 · 量化生活 · 创造作品

## 2. Color

The full palette, semantic mapping and contrast table live in `docs/brand-color-system.md`. The implementation is split between the legacy tokens in `global.css` and the V2 aliases in `brand-v2.css`.

### Core tokens

| Token | Value | Role |
|---|---|---|
| `--paper` | `#F7F3EA` | Default warm canvas |
| `--paper-2` | `#EFE8DA` | Alternate paper band |
| `--paper-3` | `#E7DDCC` | Borders, quiet fills, offset shadow |
| `--navy` | `#0B1D33` | Primary dark field, headings |
| `--navy-2` | `#07111E` | Deep film/footer field |
| `--navy-3` | `#122842` | Raised dark surface |
| `--ink` | `#111827` | Primary body text |
| `--muted` | `#5A697D` | Secondary text on paper |
| `--muted-light` | `#94A3B8` | Secondary text on navy |
| `--gold` | `#FBBF24` | Signal accent, links on dark |
| `--gold-deep` | `#8A6100` | Small gold text on paper |

### Direction tokens

| Direction | Token | Value | Territory |
|---|---|---|---|
| BUILD | `--build` | `#38BDF8` | AI, Agent, Skills, architecture, infrastructure |
| THINK | `--think` | `#FBBF24` | Knowledge, investment, psychology, research |
| MEASURE | `--measure` | `#63D6A3` | Health, running, cycling, hiking, data |
| CREATE | `--create` | `#F97362` | Products, personality, animation, visual work |

Legacy aliases (`--sky`, `--gold`, `--green`, `--coral`, `--lime`, `--orange`) remain for older rules. New CSS must use the direction tokens.

### Usage rules

- Accent colour is a **classifier**, not decoration. A block uses one direction accent; the four-colour system appears only in the Z-Grid map and the four-direction cards.
- Gold is used sparingly: one highlighted phrase, links on dark, or a key marker.
- Large display type may use direction accents on navy; **small text on paper always uses ink or muted**.
- Dark sections alternate with paper sections to create reading rhythm.
- Direction accents on navy pass AA for large text and labels: BUILD 7.92:1, THINK 10.16:1, MEASURE 9.43:1, CREATE 6.19:1.

### Contrast check

| Pair | Ratio | Use |
|---|---|---|
| `#111827` on `#F7F3EA` | 16.02:1 | Body copy |
| `#0B1D33` on `#F7F3EA` | 15.32:1 | Headings |
| `#5A697D` on `#F7F3EA` | 5.05:1 | Secondary text |
| `#5A697D` on `#EFE8DA` | 4.59:1 | Secondary text on alternate band |
| `#F7F3EA` on `#0B1D33` | 15.32:1 | Body copy on dark |
| `#94A3B8` on `#0B1D33` | 6.62:1 | Secondary text on dark |
| `#FBBF24` on `#0B1D33` | 10.16:1 | Links/emphasis on dark |
| `#8A6100` on `#F7F3EA` | 5.00:1 | Small gold text on paper |

## 3. Typography

Families and full type rules live in `docs/brand-typography.md`.

| Token | Family | Role |
|---|---|---|
| `--display` | Manrope Variable | Large English headlines, numbers, logo wordmark |
| `--serif` | Instrument Serif Italic | Emphasized words, editorial contrast, pull quotes |
| `--sans` | Inter Variable | Chinese and English body copy |
| `--mono` | System monospace stack | Eyebrows, indexes, labels, metadata, code |

All fonts are self-hosted through Fontsource. There are no Google Fonts or CDN requests at runtime.

### Scale

| Context | Size | Notes |
|---|---|---|
| Home hero statement | `clamp(2.75rem, 6.15vw, 6.65rem)` | Four lines, staggered indents |
| Page hero | `clamp(3.1rem, 7.4vw, 7.4rem)` | One editorial statement per page |
| Section heading | `clamp(2.25rem, 4.3vw, 4.6rem)` | Three-column section header |
| Footer statement | `clamp(2.6rem, 5.8vw, 6.2rem)` | Closing argument |
| Project title | `clamp(2rem, 3.2vw, 3.2rem)` | Case-study hierarchy |
| Body | `16px / 1.7` | Comfortable long-form reading |
| Metadata / eyebrow | `0.46–0.66rem` | Monospace, uppercase, letter-spaced |

Headlines use `text-wrap: balance`. Large display lines use tight tracking and sub-1 leading; body text never does.

### Voice in type

- English display text is declarative and short: “Build systems. Engineer knowledge. Measure life. Create things.”
- Chinese carries the precise explanation.
- Labels read like file metadata: `SOURCE`, `STATUS`, `LAST VERIFIED`, `SNAPSHOT`.
- Italic serif is reserved for the turn in a sentence, not for entire paragraphs.

## 4. Layout

### Shell and rhythm

- Max content width: `1320px` (`--shell`).
- Gutter: `clamp(20px, 4vw, 56px)`.
- Narrow editorial width: `min(960px, 100vw - gutters)`.
- Section padding: `clamp(76px, 9vw, 136px)`.
- Tight section padding: `clamp(54px, 6vw, 88px)`.
- Default grid: 12 columns. Featured work alternates 8/4 and 4/8 media/info splits.
- Home hero split: approximately 7 : 5 statement : Z-Grid.
- Direction cards: four equal columns on desktop, 2 × 2 at 900px, single column at 640px.

### Page personalities

| Page | Personality | Lead element |
|---|---|---|
| HOME | Brand portal | Four-line statement + Z-Grid system map + six flagship projects |
| WORK | Technical archive | Masthead, provenance register, filters, evidence cards |
| THINK | Research journal | Dark masthead, field-study cover, three tracks, manuscripts |
| EXPLORE | Field notes | Field-study cover, personality product, quantified life, film |
| ABOUT | Working philosophy | Profile file, Z-Grid philosophy panel, principles, timeline, boundaries |

Shared shell and tokens; different pacing and density. Do not clone the homepage into every route.

### Breakpoints

| Width | Behavior |
|---|---|
| `≤1200px` | Tighten large compositions and metadata grids |
| `≤1000px` | Z-Grid stacks below the hero statement; philosophy panel becomes one column |
| `≤900px` | Direction cards become 2 × 2; navigation compresses |
| `≤768px` | Mobile header, single-column section headers, stacked data panels |
| `≤640px` | Full mobile spacing, single-column direction cards, stacked hero art |
| `≤480px` | Small-phone refinements, full-width actions |

The site is tested at 1440, 1280, 768, 390, and 375px.

## 5. Components

### Header

- 78px sticky bar, transparent at the top, paper blur after 12px of scroll.
- Brand mark: the native-SVG Z-Grid symbol — navy tile, paper Z path, four square nodes, top-right node in gold.
- Wordmark `ZHUBAO`, Chinese `朱宝`, and a small `Z-GRID` system tag.
- Desktop: bilingual nav links with an animated gold underline.
- Right side: `BJ / UTC+8`, GitHub icon, mobile menu.
- Mobile: native `<details>` menu, full-height panel, numbered links, Escape to close.

### Section header

A three-part editorial header:

1. number and rule,
2. eyebrow + headline,
3. note and optional link.

It can invert for dark sections. This component creates most of the page rhythm and is intentionally not a centered “section title” block.

### Page masthead

A thin register above each inner-page hero:

```
● WORK ARCHIVE / 2024—2026     ORIGINAL · MODIFIED · UPSTREAM RESEARCH     SNAPSHOT 2026-11-11
```

It uses mono type, a top and bottom rule, and a gold dot. The dark variant uses `--line-dark` and `--muted-light`.

### Z-Grid system map

- A 2 × 2 board of four direction cells with a continuous Z path behind them.
- Each cell: index, direction mark, code, Chinese name, English name, arrow.
- Centre: navy `Z` core.
- Below 640px the diagonal trace is removed and the board remains 2 × 2; information is never squeezed into a single row.

### Direction cards

- Generated abstract field image as the background, with a navy scrim.
- 24 × 24 direction mark in the direction accent.
- Index/code, Chinese and English names, description, and an `EXPLORE DIRECTION` link.
- No fake screenshots; the field is decorative and marked as a visual study where relevant.

### Buttons and links

- Primary button: navy fill, paper text, 50px minimum height, monospace uppercase label.
- Light button: paper fill on dark fields.
- Ghost button: transparent with a one-pixel border.
- Text link: monospace label with a bottom rule and an arrow that shifts on hover.
- Focus: 2px outline, 4px offset; gold on dark fields, sky-deep on paper.

### Cards and project media

- Project cards always show media: a real cover, an existing designed visual, or an **abstract visual study**.
- Abstract covers use a generated field, a grid overlay, a project monogram, a category label, and the note `VISUAL STUDY · NOT A PRODUCT SCREENSHOT`.
- Hover states are restrained: slight image scale, arrow translation, border/color shifts. No card lift shadows.

### Metadata

- Status: coloured dot + Chinese label (`持续建设`, `原型阶段`, `实验探索`, `历史归档`).
- Source: `原创项目`, `二次开发`, `上游研究`.
- Snapshot: ISO date, visible on every case study and major data surface.
- Derived totals are labelled `DERIVED` and explain their inputs.
- The WORK provenance register summarises original / modified / research / active counts from `src/data/projects.ts`; it is not hand-maintained.

### Footer

Deep navy closing field with the inverse Z-Grid lockup, the statement “Ideas become systems. Systems become assets.”, the four-direction rail, section links, public links, location, snapshot date, and a compact colophon.

### Compatibility and 404

Compatibility pages use the same shell and typography but carry a visible `LEGACY URL PRESERVED` badge, an explanation, a legacy index, and links back to current sections. They are supplemental and `noindex`.

The 404 page is a designed recovery surface: large error typography, a plain-language explanation, and links to HOME, WORK, THINK, EXPLORE, ABOUT, and the legacy index.

## 6. Motion

- A single entrance pattern: `opacity 0 → 1`, `translateY(24px) → 0`, `0.8s` with a custom ease-out.
- Stagger via `--reveal-delay` in 45–120ms increments.
- Reveal is triggered once by `IntersectionObserver` and unobserved after entry.
- Header background transitions after scroll.
- Arrow translations and border/color transitions use 0.2–0.3s.
- `prefers-reduced-motion: reduce` disables smooth scrolling, animations, transitions, and reveal offsets. Sticky sidebars become static.

No scroll-jacking, parallax, video autoplay, or loading choreography.

## 7. Accessibility

- `lang="zh-CN"` on every page.
- One `<h1>` per page.
- Skip link to `#main`.
- Visible `:focus-visible` treatment on all interactive elements.
- Native `<details>` mobile menu with Escape handling.
- Decorative SVG marked `aria-hidden`; meaningful images have Chinese alt text.
- Landmark structure: header, nav, main, footer.
- Canonical URLs and unique titles/descriptions on every indexable page.
- Compatibility and 404 pages are `noindex`.
- No third-party scripts, trackers, or comment widgets.
- Reduced-motion support at the stylesheet level.
- Colour pairs used for body and metadata text meet WCAG AA; accent colours are reserved for large or decorative use.
- `.sr-only` is defined in `brand-v2.css` for search labels and other visually hidden text.

Not yet covered: a full automated axe/WCAG audit, screen-reader testing on physical devices, and Firefox/WebKit rendering checks.

## 8. Content rules encoded in the UI

1. A project page always shows **status**, **source type**, and **last verified**.
2. A metric without a source is not displayed.
3. A Fork is never labelled Original.
4. A manuscript is never labelled Published.
5. A demo link is shown only when the URL resolves.
6. Lost legacy content is explained, not reconstructed.
7. External links open in a new tab with `rel="noreferrer"`.
8. The public avatar is identified as a GitHub avatar, cropped and toned, not a formal portrait.
9. “Now building” is current focus, not a roadmap promise.
10. Derived totals say they are derived.

## 9. File map

| File | Responsibility |
|---|---|
| `src/data/site.ts` | Identity, nav, four directions, principles |
| `src/data/brand.ts` | Generated brand fields + category→field mapping |
| `src/data/projects.ts` | Single source of truth for project facts |
| `src/styles/global.css` | V1 tokens, resets, shared layout, header/footer, homepage, featured work |
| `src/styles/brand-v2.css` | V2 brand layer: direction tokens, Z-Grid hero, direction cards, abstract covers, mastheads, WORK register, THINK/EXPLORE hero art, ABOUT philosophy panel, responsive V2 rules |
| `src/styles/work.css` | Work index, filters, project cards, case-study template |
| `src/styles/editorial.css` | Think and Explore editorial layouts |
| `src/styles/about.css` | About profile, record, timeline, capabilities, boundaries |
| `src/styles/responsive.css` | Breakpoint and reduced-motion overrides |
| `src/layouts/BaseLayout.astro` | Metadata, fonts, global scripts, skip link, JSON-LD |
| `src/components/Header.astro` | Desktop/mobile navigation, Z-Grid mark, scroll state |
| `src/components/Footer.astro` | Inverse lockup, four-direction rail, closing metadata |
| `src/components/DirectionMark.astro` | 24 × 24 custom direction icons |
| `src/components/FeaturedProject.astro` | Alternating flagship project composition |
| `src/components/ProjectMedia.astro` | Cover images, designed visuals, abstract visual studies |
| `src/components/ProjectCard.astro` | Work-index card |
| `src/components/SectionHeader.astro` | Editorial section header |
| `src/components/LegacyPage.astro` | Compatibility page shell |

## 10. Change protocol

When adding or changing a project:

1. Update `src/data/projects.ts` first.
2. Verify all URLs and metrics against a public source.
3. Set or update `lastVerified`.
4. Add a source note if the project derives from upstream work.
5. Run `npm run build`, `npm run test:links`, and `npx playwright test`.
6. Update `docs/content-manifest.md` and the affected screenshots.

When changing a token or type scale:

1. Check the contrast pairs in `docs/brand-color-system.md`.
2. Verify 1440, 1280, 768, 390, and 375px.
3. Rebuild and recapture screenshots.
4. Do not introduce a second display family or an unlabelled accent colour.

When changing a logo or icon:

1. Edit the native SVG source; never embed a bitmap in an SVG.
2. Regenerate derivatives with `scripts/build-brand-assets.py` and `scripts/generate-assets.mjs`.
3. Test the mono mark at 16px and the favicon at 32px.
4. Update `docs/brand-asset-inventory.md`.
