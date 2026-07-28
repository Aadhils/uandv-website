# U&V v3.2 — Brand Guidelines

**Status:** Frozen — reflects live marketing UI as of v3.2.

U&V presents as a **premium technology partner**: trustworthy, business-first, calm, and modern. Visual identity pairs **Ultraviolet** (innovation) with **Deep Navy** (stability).

---

## Brand positioning

| Attribute | Expression |
|-----------|------------|
| Trust | Navy typography, restrained shadows, honest copy tone |
| Partnership | Long-form narrative on Why U&V; journey/stay messaging |
| Premium | Glass surfaces, soft gradients, Syne display headings |
| Business-first | Clear CTAs, structured sections, no gimmicky motion |

---

## Logo & wordmark

- Component: `components/brand/logo.tsx`
- Header: logo + navigation + theme toggle only (**no header CTAs** on marketing pages)
- Minimum clear space: follow header padding (`site-header.tsx`)

---

## Color palette

### Primary

| Name | Hex | CSS variable | Usage |
|------|-----|--------------|-------|
| Ultraviolet (brand) | `#6d28d9` | `--uv-brand` | CTAs, eyebrows, accents, links |
| Brand hover | `#5b21b6` | `--uv-brand-hover` | Button hover states |
| Brand muted | `#ede9fe` | `--uv-brand-muted` | Icon boxes, soft fills |
| Deep Navy | `#08152f` | `--uv-foreground`, `--uv-navy` | Headlines, body on light bg |
| Navy blue | `#102a56` | `--uv-navy-blue` | Depth, secondary navy accents |
| Soft violet | `#a78bfa` | `--uv-soft-violet` | Highlights, hero accents |

### Neutrals (light theme)

| Name | Hex | Variable |
|------|-----|----------|
| Background | `#ffffff` | `--uv-background` |
| Subtle bg | `#f7f5ff` | `--uv-background-subtle` |
| Muted bg | `#efeaff` | `--uv-background-muted` |
| Border | `#e4e0f2` | `--uv-border` |
| Muted text | `#3a4660` | `--uv-foreground-muted` |

### Gradients

- **Brand CTA gradient:** `--uv-brand-gradient` — navy → violet (135deg)
- **Hero (Home):** dark navy cinematic palette (`--uv-hero-bg`, `--uv-hero-accent`)
- **Marketing atmosphere:** subtle radial UV/navy blooms in `marketing-grain`, hero backdrops

### Do not use

- Yellow / gold as primary accents on marketing pages
- Neon glows or heavy cartoon effects
- Harsh pure black (`#000`) for body text — use navy foreground tokens

---

## Typography

| Role | Family | Weight | Token |
|------|--------|--------|-------|
| Display / H1–H3 | **Syne** | Bold / Semibold | `uvHeroTitle`, `uvSectionTitle`, `uvCardTitle` |
| Body / UI | **Manrope** | Regular / Medium | `uvLead`, `uvBody` |
| Eyebrow | Manrope | Semibold, uppercase | `uvEyebrow` |
| Mono | Geist Mono | — | Code, technical labels |

### Hierarchy rules

1. One H1 per page (`MarketingHeroTitle`)
2. Section titles are H2 (`MarketingSectionTitle`)
3. Card titles are H3 (`MarketingCardTitle`)
4. Eyebrow always above section title — never below

---

## Voice & content (marketing)

- Direct, honest, business-owner focused
- Avoid vendor jargon; emphasize partnership and outcomes
- Why U&V copy is **approved and frozen** — do not rewrite without sign-off

---

## UI patterns

### Buttons

- **Primary:** Brand gradient, `h-12` on heroes (`MarketingButtonLink` default `lg`)
- **Outline:** Border `uv-border-strong`, transparent fill
- **Focus:** `uv-focus-ring` on all marketing button links
- **Hover:** Subtle lift + violet shadow (`marketing-btn-glow`)

### Cards

- Standard radius: `rounded-uv-xl` (1rem)
- Premium / hero frames: `rounded-uv-2xl` (1.25rem)
- Shadow: `shadow-uv-sm` minimum on interactive cards
- Hover border: `border-uv-brand/40`

### Sections

- Default vertical rhythm: `py-16 sm:py-24 lg:py-28`
- Dividers: `border-b border-uv-border` between sections
- Scroll offset: `scroll-mt-20` for anchored headings

### Imagery (Why U&V)

- WebP only for v3.2 section visuals
- Placeholder state: soft white + UV/navy ambient (no text labels)
- No stock SVG scenes or icon grids as substitutes

---

## Motion

| Allowed | Avoid |
|---------|-------|
| Fade, slight up-reveal, scale-in | Continuous floating loops |
| Card/button hover transitions | Aggressive parallax |
| Ken Burns on Home hero media | Distracting infinite animations |

All motion disabled when `prefers-reduced-motion: reduce`.

---

## Dark mode

- Theme toggle in site header
- CSS variables swap under `[data-theme='dark']`
- Marketing pages are primarily designed for **light theme**; verify contrast if extending dark marketing surfaces

---

## Reference pages

| Page | Role |
|------|------|
| Business Solutions | Hero layout standard |
| Why U&V | Narrative + visual asset integration |
| Home | Cinematic dark hero exception |
| Services / Solutions | Card grids and section rhythm |

Live design system preview (internal): `/design-system`

---

## Contact & legal

- Footer: `info@uandv.com`, Privacy, Terms
- Location: Tamil Nadu, India (footer copy)

---

## File reference

| Asset | Path |
|-------|------|
| CSS variables | `packages/ui/src/styles/globals.css` |
| Marketing tokens | `apps/web/components/marketing/marketing-design-tokens.ts` |
| Marketing CSS effects | `apps/web/app/globals.css` |
| Site config | `apps/web/lib/site.ts` |
