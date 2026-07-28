# U&V v3.2 — Design System

**Status:** Frozen (documentation only — do not change production UI without explicit approval)

This document describes the approved design system for U&V public marketing pages. The single source of truth for Tailwind class tokens is:

`apps/web/components/marketing/marketing-design-tokens.ts`

---

## Principles

1. **One design language** across Home, Business Solutions, Why U&V, Services, Portfolio, Digital Marketing, MLM, FinTech, and Startup.
2. **Prefer `Marketing*` primitives** over duplicating raw class strings.
3. **No redesign** — tokens document what is live; they are not a proposal for change.
4. **Business Solutions hero** is the reference layout for standard marketing heroes (`marketing-standard-hero.tsx`).

---

## Layout

| Token | Value | Usage |
|-------|-------|--------|
| `uvContainer` | `max-w-7xl`, responsive horizontal padding | All page content widths |
| `uvSectionBase` | `scroll-mt-20 border-b border-uv-border` | Section shell |
| `uvSectionPad` | `py-16 sm:py-24 lg:py-28` | Default section vertical rhythm |
| `uvSectionCompactPad` | `py-8 sm:py-10` | Breadcrumb / compact strips |
| `uvSectionTightPad` | `py-14 sm:py-20 lg:py-24` | Why U&V cinema sections |
| `uvSection` | Base + default pad | Full section token |
| `uvSectionCompact` | Base + compact pad | Compact sections |
| `uvSectionTight` | Base + tight pad | Tighter cinema sections |

### `MarketingSection` density

`MarketingSection` accepts `density`:

| Value | Padding |
|-------|---------|
| `default` | `uvSectionPad` |
| `compact` | `uvSectionCompactPad` |
| `tight` | `uvSectionTightPad` |

`tone`: `default` | `subtle` | `none` — controls background only.

---

## Typography

| Token | Role | Font |
|-------|------|------|
| `uvEyebrow` | Section label / category | Manrope (sans), uppercase, brand color |
| `uvHeroTitle` | Page H1 | Syne (display) |
| `uvSectionTitle` | Section H2 | Syne (display) |
| `uvCardTitle` | Card / item H3 | Syne (display) |
| `uvLead` | Hero / intro paragraph | Manrope, muted |
| `uvBody` | Body copy | Manrope, muted |

### Font wiring

- **Sans / body:** Manrope → `--font-manrope` → `--font-uv-sans`
- **Display / headings:** Syne → `--font-syne` → `--font-uv-display`
- **Mono:** Geist Mono → `--font-geist-mono` → `--font-uv-mono`

Defined in `apps/web/app/layout.tsx` and `apps/web/app/globals.css`.

---

## Surfaces & cards

| Token | Radius | Shadow | Notes |
|-------|--------|--------|-------|
| `uvCard` | `rounded-uv-xl` | `shadow-uv-sm` | Standard card |
| `uvCardPremium` | `rounded-uv-2xl` | `shadow-uv-sm` + glass/premium hover | Home feature cards |
| `uvCardInteractive` | `rounded-uv-xl` | `shadow-uv-sm` | Solution / services cards (subtle bg) |
| `uvCardInteractiveSolid` | `rounded-uv-xl` | `shadow-uv-sm` | Solution cards (white bg) |
| `uvCtaPanel` | `rounded-uv-2xl` | — | CTA panels |
| `uvHeroIllustrationFrame` | `rounded-uv-2xl` | Custom violet shadow | Hero illustration frame |

Shared card behaviors (CSS in `globals.css`):

- `marketing-card-lift` — subtle hover lift
- `marketing-card-premium` — enhanced hover on premium cards
- `hover:border-uv-brand/40` — interactive border emphasis

---

## Buttons

| Token / component | Default size | Height |
|-------------------|--------------|--------|
| `MarketingButtonLink` | `lg` (primary) | `h-12` |
| `buttonVariants` `md` | — | `h-11` |
| `buttonVariants` `sm` | — | `h-9` |

- Primary: `uvBtnPrimary` → `marketing-btn-glow` + brand gradient
- All `MarketingButtonLink` instances include `uv-focus-ring`
- Radius: `rounded-uv-lg` (from `@uandv/ui` Button)

---

## Color system

CSS variables live in `packages/ui/src/styles/globals.css`.

| Role | Light theme |
|------|-------------|
| Brand (Ultraviolet) | `#6d28d9` (`--uv-brand`) |
| Navy foreground | `#08152f` (`--uv-foreground`, `--uv-navy`) |
| Navy blue accent | `#102a56` (`--uv-navy-blue`) |
| Soft violet | `#a78bfa` (`--uv-soft-violet`) |
| Background | `#ffffff` |
| Subtle background | `#f7f5ff` |
| Border | `#e4e0f2` |

Dark theme overrides the same tokens under `[data-theme='dark']`.

### Hero (Home cinematic)

Separate palette in `apps/web/app/globals.css`:

- `--uv-hero-bg`, `--uv-hero-accent`, `--uv-hero-muted`, `--uv-hero-glow`

---

## Radii & shadows (UI package)

| Token | Value |
|-------|-------|
| `--radius-uv-sm` | 0.375rem |
| `--radius-uv-md` | 0.5rem |
| `--radius-uv-lg` | 0.75rem |
| `--radius-uv-xl` | 1rem |
| `--radius-uv-2xl` | 1.25rem |
| `--shadow-uv-sm` | Subtle elevation |
| `--shadow-uv-md` | Medium elevation |
| `--shadow-uv-lg` | Large elevation |

---

## Motion

- Scroll reveals: `Reveal` component + `.marketing-reveal-*` classes
- Card/button hover: 200–500ms ease transitions
- `prefers-reduced-motion: reduce` disables animations site-wide (see `globals.css`)

---

## Marketing page shell

| Component | Purpose |
|-----------|---------|
| `MarketingContentPage` | Page wrapper with grain + ambient background |
| `MarketingPageHero` | Light cinematic hero section |
| `MarketingPageHeroInner` | Hero inner container (default padding) |
| `MarketingStandardHeroGrid` | Approved copy-left / visual-right grid |
| `marketingStandardHeroInnerClass` | Compact hero viewport padding |

---

## Why U&V visual system

Separate preset-based stage system — see `02-component-library.md` and `03-image-assets.md`.

- Component: `WhyUandVVisualStage`
- Manifest: `apps/web/lib/why-uandv-visual-assets.ts`
- CSS presets: `.wuv-visual-stage--{hero|journey|section|industry|backdrop}`

---

## File reference

| File | Role |
|------|------|
| `marketing-design-tokens.ts` | Tailwind token strings |
| `marketing-primitives.tsx` | React wrappers |
| `marketing-page-hero.tsx` | Page shell + hero atmosphere |
| `marketing-standard-hero.tsx` | Standard hero grid (BS reference) |
| `packages/ui/src/styles/globals.css` | CSS variables + theme |
| `apps/web/app/globals.css` | Marketing effects, WUV/BS page CSS |

---

## Frozen marketing routes

| Route | Page component area |
|-------|---------------------|
| `/` | `components/marketing/landing-page.tsx` |
| `/business-solutions` | `components/consulting/` |
| `/why-uandv` | `components/why-uandv/` |
| `/services` | `components/services/` |
| `/portfolio` | `components/portfolio/` |
| `/solutions/digital-marketing` | `components/solutions/digital-marketing-solutions-page.tsx` |
| `/mlm` | `components/solutions/mlm-solutions-page.tsx` |
| `/fintech` | `components/fintech/fintech-solutions-page.tsx` |
| `/startup` | `components/startup/startup-page.tsx` |

**Do not modify layouts, typography, spacing, or content on these routes without a new approved sprint.**
