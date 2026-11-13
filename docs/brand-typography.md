# ZHUBAO Brand Typography

**Version:** 2.0 · 2026-11  
**Implementation:** `src/styles/global.css`, `src/layouts/BaseLayout.astro`

---

## 1. Families

| Token | Family | Source | Role |
|---|---|---|---|
| `--display` | Manrope Variable | `@fontsource-variable/manrope` | English headlines, numbers, wordmark, direction codes |
| `--serif` | Instrument Serif Italic | `@fontsource/instrument-serif` | One emphasized phrase, pull quotes, editorial turns |
| `--sans` | Inter Variable | `@fontsource-variable/inter` | Chinese and English body copy |
| `--mono` | System monospace stack | Local OS | Eyebrows, indexes, evidence labels, metadata, code |

No Google Fonts, no icon CDN, no third-party runtime font request.

Chinese fallbacks: `Noto Sans CJK SC`, `Source Han Sans SC`, `PingFang SC`, `Hiragino Sans GB`, `Microsoft YaHei`.
Serif fallbacks: `Noto Serif CJK SC`, `Songti SC`.

## 2. Type scale

| Context | Size | Weight | Leading | Tracking |
|---|---|---|---|---|
| Hero statement | `clamp(2.9rem, 7.2vw, 7.6rem)` | 700 | 0.9 | `-0.07em` |
| Page hero | `clamp(2.8rem, 6.8vw, 6.9rem)` | 700 | 0.9 | `-0.065em` |
| Section heading | `clamp(2.1rem, 4.1vw, 4.35rem)` | 650 | 0.98 | `-0.055em` |
| Feature title | `clamp(1.9rem, 3.1vw, 3.1rem)` | 650 | 1.0 | `-0.045em` |
| Card title | `1.05–1.35rem` | 650 | 1.15 | `-0.025em` |
| Body | `16px / 1.7` | 400 | 1.7 | `0` |
| Body small | `0.78–0.9rem` | 400 | 1.75 | `0` |
| Metadata / eyebrow | `0.55–0.66rem` | 500 | 1.4 | `0.08–0.14em` |
| Footer statement | `clamp(2.5rem, 5.5vw, 6rem)` | 650 | 0.92 | `-0.06em` |

Use `text-wrap: balance` on headings. Never use tracking below `-0.08em`; it closes counters and hurts CJK legibility.

## 3. Bilingual rules

1. **Chinese is primary.** It carries the precise claim; English is the index and tonal layer.
2. English display lines are short and declarative. They may break across four lines; never let a single word break.
3. Chinese body line length: 28–38 characters on desktop, 18–26 on mobile.
4. Do not set long Chinese paragraphs in Manrope; use Inter / CJK fallback.
5. Italic serif is reserved for the turn in a sentence, not an entire paragraph.
6. Metadata is uppercase Latin + mono. Chinese labels sit in body type, not mono.

### Voice

| Do | Don't |
|---|---|
| “把想法变成系统。” | “致力于打造世界领先的……” |
| “持续建设 / 原型阶段 / 实验探索” | “行业首创 / 颠覆式创新” |
| “数据快照 2026-11-11” | “实时大数据” without a source |
| “书稿 / manuscript” | “已出版 / 畅销书” without evidence |

## 4. Numerals and data

- Large numbers use Manrope 650–700 with `font-variant-numeric: tabular-nums`.
- A number is always paired with a unit and a source/date.
- Do not use a display number for a derived total without the `DERIVED` note.
- Dates use ISO `YYYY-MM-DD` in metadata; prose may use `2026 年 11 月`.

## 5. Wordmark

The ZHUBAO wordmark is converted to SVG paths from Manrope at weight 800, tracking `-0.018em`. The Chinese lockup line uses the CJK stack at `10.5px / letter-spacing 2.2px`. Do not retype the wordmark in a different weight or add a second display face.

## 6. Accessibility

- Body text ≥ 16px; metadata may go to 10px only when it is supplementary and duplicated in visible copy.
- Contrast follows `docs/brand-color-system.md`.
- Do not use colour alone to distinguish directions; the code and Chinese name are always present.
- Respect user font scaling: avoid fixed heights on text containers; use `min-height` and padding.
