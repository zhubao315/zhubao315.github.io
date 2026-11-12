# Design System

**Site:** ZHUBAO · Personal Digital Portfolio  
**Version:** 1.0  
**Source of truth:** `src/styles/*.css`, `src/components/*.astro`, `src/layouts/BaseLayout.astro`

## 1. Concept

The visual system is an **editorial technical archive**: warm paper, deep navy, oversized statements, numbered sections, monospaced evidence labels, and deliberate asymmetry. It borrows the clarity of an engineering report and the pacing of a printed portfolio rather than the conventions of a SaaS landing page.

Three rules shape every page:

1. **Show the work, then the claim.** Metrics and source labels sit next to the project, not in detached marketing copy.
2. **Make hierarchy physical.** Scale, dark/light fields, and column width do the work; decoration is secondary.
3. **Keep the edges visible.** Boundaries, source notes, compatibility pages, and status labels are part of the interface.

## 2. Color

### Core tokens

| Token | Value | Role |
|---|---|---|
| `--paper` | `#F7F3EA` | Default warm canvas |
| `--paper-2` | `#EFE8DA` | Alternate paper band |
| `--paper-3` | `#E7DDCC` | Borders, quiet fills |
| `--navy` | `#0B1D33` | Primary dark field, body ink on light |
| `--navy-2` | `#07111E` | Deep film/footer field |
| `--navy-3` | `#122842` | Hover and raised dark surfaces |
| `--ink` | `#111827` | Primary text |
| `--muted` | `#5A697D` | Secondary text on paper |
| `--muted-light` | `#94A3B8` | Secondary text on navy |
| `--sky` | `#38BDF8` | Build/AI accent |
| `--sky-deep` | `#0B83B5` | Focus ring on light |
| `--gold` | `#FBBF24` | Signal accent, links on dark |
| `--gold-deep` | `#8A6100` | Link hover on paper |
| `--coral` | `#F97362` | Product/creative accent |
| `--lime` | `#C9ED6B` | Running/energy accent |
| `--green` | `#63D6A3` | Live/sync status |
| `--orange` | `#F5A34B` | Cycling accent |

### Usage rules

- Accent colors are **functional**: direction, category, live status, or a single emphasized word. They are not used as a decorative rainbow.
- Gold is used sparingly: one highlighted phrase, links on dark, or a key marker. A page should not have two competing gold focal points.
- Large display type may use gold, sky, or paper on navy; **small text always uses ink, muted, or a tested accent pair**.
- Dark sections alternate with paper sections to create reading rhythm. Consecutive dark sections are avoided unless the content is intentionally cinematic.

### Contrast check

Measured with the WCAG relative-luminance formula:

| Pair | Ratio | Use |
|---|---|---|
| `#111827` on `#F7F3EA` | 16.02:1 | Body copy |
| `#0B1D33` on `#F7F3EA` | 15.32:1 | Headings |
| `#5A697D` on `#F7F3EA` | 5.05:1 | Secondary text |
| `#5A697D` on `#EFE8DA` | 4.59:1 | Secondary text on alternate band |
| `#F7F3EA` on `#0B1D33` | 15.32:1 | Body copy on dark |
| `#94A3B8` on `#0B1D33` | 6.62:1 | Secondary text on dark |
| `#FBBF24` on `#0B1D33` | 10.16:1 | Links/emphasis on dark |
| `#8A6100` on `#F7F3EA` | 5.00:1 | Link hover on paper |

Accent colors are not used for small body text on paper because their contrast is insufficient. `--sky-deep` is used for focus outlines, where the relevant threshold is 3:1 for non-text UI.

## 3. Typography

### Families

| Token | Family | Role |
|---|---|---|
| `--display` | Manrope Variable | Large English headlines, numbers, logo wordmark |
| `--serif` | Instrument Serif Italic | Emphasized words, editorial contrast, pull quotes |
| `--sans` | Inter Variable | Chinese and English body copy |
| `--mono` | System monospace stack | Eyebrows, indexes, labels, metadata, code |

All fonts are self-hosted through Fontsource. There are no Google Fonts or CDN requests at runtime.

Chinese stacks fall back through `Noto Sans CJK SC`, `Source Han Sans SC`, `PingFang SC`, `Hiragino Sans GB`, and `Microsoft YaHei`. The serif stack falls back to `Noto Serif CJK SC` and `Songti SC`.

### Scale

| Context | Size | Notes |
|---|---|---|
| Hero statement | `clamp(3.2rem, 8vw, 8.35rem)` | Tight leading, mixed roman/italic lines |
| Page hero | `clamp(3.1rem, 7.4vw, 7.4rem)` | One editorial statement per page |
| Section heading | `clamp(2.25rem, 4.3vw, 4.6rem)` | Three-column section header |
| Footer statement | `clamp(2.6rem, 5.8vw, 6.2rem)` | Closing argument |
| Project title | `clamp(2rem, 3.2vw, 3.2rem)` | Case-study hierarchy |
| Body | `16px / 1.7` | Comfortable long-form reading |
| Metadata / eyebrow | `0.58–0.72rem` | Monospace, uppercase, letter-spaced |

Headlines use `text-wrap: balance`. Large display lines use tight tracking and sub-1 leading; body text never does.

### Voice in type

- English display text is declarative and short: “Build systems. Engineer knowledge. Explore life.”
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
- Default grid: 12 columns. Featured work alternates 8/4 and 4/8 media/info splits; the investment feature narrows the media further.

### Breakpoints

| Width | Behavior |
|---|---|
| `≤1200px` | Tighten large compositions and metadata grids |
| `≤1000px` | Reduce multi-column density; stack selected panels |
| `≤900px` | Featured work stacks; navigation begins to compress |
| `≤768px` | Mobile header, single-column section headers, stacked data panels |
| `≤640px` | Full mobile spacing and type adjustments |
| `≤480px` | Small-phone refinements, full-width actions |

The site is tested at 1440, 1280, 768, 390, and 375px.

## 5. Components

### Header

- 78px sticky bar, transparent at the top, paper blur after 12px of scroll.
- Brand mark: navy square with a white lightning/arrow glyph and a gold dot.
- Desktop: bilingual nav links with an animated gold underline.
- Right side: `BJ / UTC+8`, GitHub icon, mobile menu.
- Mobile: native `<details>` menu, full-height panel, numbered links, Escape to close.

### Section header

A three-part editorial header:

1. number and rule,
2. eyebrow + headline,
3. note and optional link.

It can invert for dark sections. This component creates most of the page rhythm and is intentionally not a centered “section title” block.

### Buttons and links

- Primary button: navy fill, paper text, 50px minimum height, monospace uppercase label.
- Light button: paper fill on dark fields.
- Ghost button: transparent with a one-pixel border.
- Text link: monospace label with a bottom rule and an arrow that shifts on hover.
- Focus: 2px outline, 4px offset; gold on dark fields, sky-deep on paper.

### Cards and project media

- Project cards use the cover image or a generated visual, a category label, a status dot, a summary, metrics, and a case-study link.
- Generated visual types:
  - browser frame for live products,
  - dark capability diagram for uSkill,
  - governance board for Knowledge Base Engineering,
  - typographic banner for Investment Discipline,
  - multi-panel data collage for Quantified Life,
  - cinematic overlay for Perfect Me.
- Hover states are restrained: slight image scale, arrow translation, border/color shifts. No card lift shadows.

### Metadata

- Status: colored dot + Chinese label (`持续建设`, `原型阶段`, `实验探索`, `历史归档`).
- Source: `原创项目`, `二次开发`, `上游研究`.
- Snapshot: ISO date, visible on every case study and major data surface.
- Derived totals are labeled `DERIVED` and explain their inputs.

### Footer

Deep navy closing field with a large “Ideas become systems. Systems become assets.” statement, section links, public links, location, snapshot date, and a compact colophon. It repeats the site’s core navigation without becoming a second sitemap.

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
- Color pairs used for body and metadata text meet WCAG AA; accent colors are reserved for large or decorative use.

Not yet covered: a full automated axe/WCAG audit, screen-reader testing on physical devices, and Firefox/WebKit rendering checks.

## 8. Content rules encoded in the UI

1. A project page always shows **status**, **source type**, and **last verified**.
2. A metric without a source is not displayed.
3. A Fork is never labeled Original.
4. A manuscript is never labeled Published.
5. A demo link is shown only when the URL resolves.
6. Lost legacy content is explained, not reconstructed.
7. External links open in a new tab with `rel="noreferrer"`.
8. The public avatar is identified as a GitHub avatar, cropped and toned, not a formal portrait.
9. “Now building” is current focus, not a roadmap promise.
10. Derived totals say they are derived.

## 9. File map

| File | Responsibility |
|---|---|
| `src/styles/global.css` | Tokens, resets, shared layout, header/footer, homepage, featured work |
| `src/styles/work.css` | Work index, filters, project cards, case-study template |
| `src/styles/editorial.css` | Think and Explore editorial layouts |
| `src/styles/about.css` | About profile, record, timeline, capabilities, boundaries |
| `src/styles/responsive.css` | Breakpoint and reduced-motion overrides |
| `src/layouts/BaseLayout.astro` | Metadata, fonts, global scripts, skip link, JSON-LD |
| `src/components/Header.astro` | Desktop/mobile navigation and scroll state |
| `src/components/FeaturedProject.astro` | Alternating flagship project composition |
| `src/components/ProjectMedia.astro` | Cover images and generated project visuals |
| `src/components/ProjectCard.astro` | Work-index card |
| `src/components/SectionHeader.astro` | Editorial section header |
| `src/components/Footer.astro` | Closing field and site metadata |
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

1. Check the contrast pairs above.
2. Verify 1440, 1280, 768, 390, and 375px.
3. Rebuild and recapture screenshots.
4. Do not introduce a second display family or an unlabelled accent color.
