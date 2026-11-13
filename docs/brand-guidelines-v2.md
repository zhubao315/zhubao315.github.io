# ZHUBAO Brand Guidelines V2.0

**Brand:** ZHUBAO / 朱宝  
**Positioning:** Personal Brand & Digital Portfolio  
**System name:** Z-Grid / 四向生长的数字人生系统  
**Version:** 2.0 · 2026-11  
**Source of truth:** this document, `src/styles/brand-v2.css`, `src/components/`, `public/brand/`

---

## 1. Why this system exists

The first version of the site proved the editorial direction: warm paper, deep navy, oversized type, numbered sections, evidence labels. It also exposed three limits:

1. The lightning/arrow mark read as an AI product, not a person who builds, studies, measures and creates.
2. The four directions existed as content categories but not as a reusable visual language.
3. The tagline said “Build / Engineer / Explore”, while the site also contained Measure and Create.

V2.0 resolves those limits without replacing the content architecture or the Astro stack.

### Brand idea

> 把想法变成系统，把知识沉淀为资产，把生活记录成可持续的实践。

### Brand statement

> Build Systems. Engineer Knowledge. Measure Life. Create Things.  
> 构建系统 · 工程知识 · 量化生活 · 创造作品

### Identity line

> BUILDER · RESEARCHER · RECORDER

The identity line describes a posture, not a job title. The four directions describe the work.

---

## 2. The four directions

| # | Code | Chinese | Territory | Accent |
|---|---|---|---|---|
| 01 | BUILD | 构建系统 | AI, Agent, Skills, software architecture, cloud-native infrastructure | Sky `#38BDF8` |
| 02 | THINK | 工程知识 | Knowledge engineering, investment research, psychology, reading | Gold `#FBBF24` |
| 03 | MEASURE | 量化生活 | Health, running, cycling, hiking, long-term personal data | Mint `#63D6A3` |
| 04 | CREATE | 创造作品 | Digital products, personality exploration, original animation, visual experiments | Coral `#F97362` |

Rules:

- The four directions are **one system**, not four independent brands. They always appear in the order BUILD → THINK → MEASURE → CREATE.
- Accent colour is a classifier, not decoration. A page may show all four in the system map, but a single content block uses one accent.
- Direction labels are bilingual: English code in display/mono type, Chinese name in body type.
- A direction is never used as a claim of seniority, revenue, or audience size.

---

## 3. Z-Grid logo concept

The mark is a continuous **Z path** that visits four nodes:

```
BUILD ●────────● THINK
       ╲      ╱
        ╲    ╱
         ╲  ╱
MEASURE ●──╱──● CREATE
```

- The top bar is the shared starting edge (systems).
- The diagonal is the connective work (knowledge moving between domains).
- The bottom bar is the shared output edge (life and works).
- Four square nodes mark the four directions. The top-right node is signal gold; the rest are paper on navy.
- A faint 4 × 4 grid sits behind the path. It disappears at favicon size; the Z and four nodes remain.

The mark is **not** a lightning bolt, an arrow, a letter in a generic rounded square, or four separate icons glued together.

### Lockups

| Asset | Use |
|---|---|
| `zhubao-symbol.svg` | App icon, social avatar, small brand mark |
| `zhubao-symbol-mono.svg` | Single-colour print, embossing, favicon fallback |
| `zhubao-horizontal.svg` | Header, documents, presentations on light fields |
| `zhubao-horizontal-inverse.svg` | Dark fields, footer, OG panel |
| `zhubao-stacked.svg` | Covers, title pages, merchandise |
| `zhubao-stacked-inverse.svg` | Dark covers and end cards |
| `zhubao-avatar.svg` / `-1024.png` | Social profile image |
| `favicon.svg` / `.ico` / PNG set | Browser and PWA |

### Clear space and minimum size

- Clear space: at least the width of one node (1/8 of the symbol) on every side.
- Minimum symbol size: **16 px** digital, **8 mm** print.
- Minimum horizontal lockup width: **120 px** digital, **32 mm** print.
- Do not stretch, rotate, outline, add gradients, add shadows, or place the mark on a busy photo without a solid field.

---

## 4. Visual keywords

**Editorial Architecture · Modular Geometry · Digital Craft · Measured Life**

What that means in practice:

- **Editorial:** numbered sections, rules, captions, pull quotes, asymmetric columns, generous margins.
- **Architecture:** visible grids, nodes, paths, dimensions, index numbers, technical labels.
- **Craft:** real project evidence, careful typography, restrained motion, no template filler.
- **Measured:** data snapshots, dates, source notes, boundaries, long time horizons.

Avoid: neon cyberpunk, purple gradient SaaS, glassmorphism, floating 3D blobs, stock “AI brain” imagery, fake dashboards, fake user counts.

---

## 5. Layout system

| Token | Value | Use |
|---|---|---|
| Shell | `1320px` | Maximum content width |
| Gutter | `clamp(20px, 4vw, 56px)` | Page edge |
| Grid | 12 columns | Desktop composition |
| Hero split | 7 : 5 | Statement : Z-Grid |
| Feature split | 8 : 4 / 4 : 8 | Alternating project media |
| Section padding | `clamp(76px, 9vw, 136px)` | Default rhythm |
| Tight padding | `clamp(54px, 6vw, 88px)` | Dense indexes |
| Rule | `1px` | Section and table separators |
| Radius | `0` default; `2px` for controls; `12px` only for the app icon | Geometry stays architectural |

Breakpoints: `1200 / 1000 / 900 / 768 / 640 / 480px`. Test at 1440, 1280, 768, 390, 375.

### Page personalities

| Page | Personality | Lead element |
|---|---|---|
| HOME | Brand portal | Z-Grid system map + six flagship projects |
| WORK | Technical archive | Index rail, filters, evidence cards, provenance |
| THINK | Research journal | Masthead, tracks, methodology, manuscripts |
| EXPLORE | Field notes | Generated fields, life data, film, lab |
| ABOUT | Working philosophy | Portrait file, principles, timeline, boundaries |

Shared shell and tokens; different pacing and density. Do not clone the homepage into every route.

---

## 6. Components

- **Header:** 78px; symbol + wordmark; bilingual nav; active gold rule; GitHub/X; `BJ / UTC+8`; native `<details>` mobile menu with Escape.
- **Section header:** index + rule, eyebrow + headline, note + optional link. Dark variant for navy fields.
- **Buttons:** navy fill / paper text; light variant on dark; ghost with 1px rule. Minimum height 50px.
- **Text link:** mono label, bottom rule, arrow translates on hover.
- **Status label:** dot + Chinese label; colour is semantic, not decorative.
- **Project card:** media (real cover or abstract visual study), index, category, status, source, summary, stack, case link.
- **Direction card:** generated field image, direction mark, code, Chinese name, description, link.
- **Data snapshot:** value + unit + source + date. A number without a source is not displayed.
- **Footer:** inverse lockup, statement, four direction links, index, connect, colophon.

---

## 7. Motion

- One entrance pattern: `opacity 0 → 1`, `translateY(24px) → 0`, `0.8s` custom ease-out.
- Stagger in 45–120ms increments via `--reveal-delay`.
- Hover: 0.2–0.35s; arrows translate 2–4px; images scale ≤ 1.03.
- No parallax, scroll-jacking, autoplay video, or loading choreography.
- `prefers-reduced-motion: reduce` disables all of the above.

---

## 8. Responsive principles

- Mobile is a **re-composition**, not a shrink.
- Z-Grid becomes a 2 × 2 direction grid below 768px; the diagonal diagram is not squeezed.
- Hero statement keeps 4 lines but reduces to `clamp(2.7rem, 11vw, 4.2rem)`.
- Work index becomes single-column cards; filters scroll horizontally without page overflow.
- Tables become stacked rows that keep name, source and status.
- Touch targets ≥ 44px. No hover-only information.
- No fixed full-screen background images or heavy blur on mobile.

---

## 9. Application checklist

Before shipping a page:

- [ ] One `<h1>`, one clear page statement.
- [ ] Four directions use the correct order, colour and icon.
- [ ] Every number has a source and a snapshot date.
- [ ] Original / modified / research is visible where relevant.
- [ ] Logo uses the new Z-Grid asset, not the old lightning mark.
- [ ] Focus states, reduced motion and mobile menu still work.
- [ ] Build, link check and Playwright pass.
- [ ] Screenshots at 1440 and 390 updated.

---

## 10. Governance

- Brand tokens live in `src/styles/global.css`; V2 component rules live in `src/styles/brand-v2.css`.
- Generated fields live in `public/brand/` and are documented in `docs/brand-asset-inventory.md`.
- A new accent colour requires a semantic role, a contrast check, and an update to this document.
- A new logo variant requires a native SVG source and a mono test at 16px.
