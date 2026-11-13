# ZHUBAO Brand Color System

**Version:** 2.0 · 2026-11  
**Implementation:** `src/styles/global.css` (`:root`) and `src/styles/brand-v2.css`

---

## 1. Core palette

| Token | Value | Role | Never use it for |
|---|---|---|---|
| `--navy` | `#0B1D33` | Primary dark field, headings, brand mark | Long body copy on paper |
| `--navy-2` | `#07111E` | Cinematic / footer field | Small labels without contrast check |
| `--navy-3` | `#122842` | Raised dark surface, hover | Page background |
| `--paper` | `#F7F3EA` | Default canvas | Text on navy (use `--paper` only at large sizes? No: it passes AA) |
| `--paper-2` | `#EFE8DA` | Alternate band | Body text |
| `--paper-3` | `#E7DDCC` | Rules, quiet fills, offset shadows | Text |
| `--ink` | `#111827` | Primary body text | Dark backgrounds |
| `--muted` | `#5A697D` | Secondary text on paper | Large display headlines |
| `--muted-light` | `#94A3B8` | Secondary text on navy | Body copy on paper |
| `--gold` | `#FBBF24` | Signal accent, links on dark | Small body text on paper |
| `--gold-deep` | `#8A6100` | Link hover / small gold text on paper | Fills |

## 2. Direction palette

| Direction | Token | Value | Field treatment |
|---|---|---|---|
| BUILD | `--build` | `#38BDF8` | Navy field + sky lines |
| THINK | `--think` | `#FBBF24` | Paper field + navy/gold network |
| MEASURE | `--measure` | `#63D6A3` | Paper field + mint trace |
| CREATE | `--create` | `#F97362` | Paper field + coral geometry |

Legacy aliases remain for compatibility: `--sky`, `--gold`, `--green`, `--coral`, `--lime`, `--orange`.

### Semantic mapping

| Content | Direction |
|---|---|
| AI & Agent, infrastructure | BUILD |
| Knowledge, investment, research | THINK |
| Health, running, cycling, hiking | MEASURE |
| Product, personality, animation, visual | CREATE |

A project category maps to one direction. Do not assign a second accent “for variety”.

## 3. Neutrals and lines

| Token | Value | Use |
|---|---|---|
| `--line` | `rgba(11,29,51,.14)` | Default rule on paper |
| `--line-strong` | `rgba(11,29,51,.30)` | Emphasized rule |
| `--line-dark` | `rgba(247,243,234,.16)` | Rule on navy |
| `--line-dark-strong` | `rgba(247,243,234,.32)` | Emphasized rule on navy |
| `--paper-2` | `#EFE8DA` | Alternate section band |
| `--paper-3` | `#E7DDCC` | Offset shadow, quiet fill |

## 4. Status colours

| Status | Dot | Text |
|---|---|---|
| 持续建设 / Active | `#63D6A3` | `--ink` or `--paper` |
| 原型阶段 / Prototype | `#FBBF24` | `--ink` or `--paper` |
| 实验探索 / Experiment | `#38BDF8` | `--ink` or `--paper` |
| 历史归档 / Archived | `#94A3B8` | `--muted` |

Status dots are 6–7px. They are not used as the only signal: the text label is always present.

## 5. Contrast

Measured with the WCAG relative-luminance formula:

| Pair | Ratio | Verdict |
|---|---|---|
| `#111827` on `#F7F3EA` | 16.02:1 | AAA body |
| `#0B1D33` on `#F7F3EA` | 15.32:1 | AAA headings |
| `#5A697D` on `#F7F3EA` | 5.05:1 | AA body |
| `#5A697D` on `#EFE8DA` | 4.59:1 | AA body |
| `#F7F3EA` on `#0B1D33` | 15.32:1 | AAA body |
| `#94A3B8` on `#0B1D33` | 6.62:1 | AA body |
| `#FBBF24` on `#0B1D33` | 10.16:1 | AAA links |
| `#8A6100` on `#F7F3EA` | 5.00:1 | AA small links |
| `#38BDF8` on `#0B1D33` | 7.92:1 | AA large/labels |
| `#63D6A3` on `#0B1D33` | 9.43:1 | AA large/labels |
| `#F97362` on `#0B1D33` | 6.19:1 | AA large/labels |

Rules:

- Small body text on paper uses `--ink` or `--muted`; never `--gold`, `--build`, `--measure` or `--create`.
- On navy, `--paper`, `--muted-light` and `--gold` are safe. Direction accents are for marks, rules, labels and large numbers.
- Focus ring: `--sky-deep` on paper, `--gold` on navy. 2px, 4px offset.

## 6. Data visualisation

| Role | Colour |
|---|---|
| Primary series | `--navy` |
| Secondary series | `--muted` |
| Highlight / current | `--gold` |
| Health / recovery | `--measure` |
| Movement / running | `--build` |
| Creative / annotation | `--create` |
| Missing data | `--paper-3` with a diagonal hatch, never zero |

Data rules:

1. Missing is missing. Do not fill gaps with zero or interpolate silently.
2. One chart, one accent. The rest is navy/muted.
3. Label the unit, the period, the source and the snapshot date.
4. Avoid red/green as the only encoding; pair with shape or label.

## 7. Generated field images

The four `src/assets/brand/field-*.png` images are abstract colour fields, not screenshots:

- They use the palette above with no text.
- They are decorative: `alt=""`, `aria-hidden` where appropriate.
- Overlay text always sits on a solid or scrim layer, never directly on a busy area.
- A field image never replaces a real project screenshot or implies a product UI.

## 8. CSS usage

```css
/* Direction-aware block */
[data-accent='build'] { --accent: var(--build); }
[data-accent='think'] { --accent: var(--think); }
[data-accent='measure'] { --accent: var(--measure); }
[data-accent='create'] { --accent: var(--create); }

/* On navy, tint only the mark and rule */
.direction-card { --accent: var(--build); }
.direction-card .mark { color: var(--accent); }
```

Do not introduce a new hex value in a page stylesheet. Add a token here first.
