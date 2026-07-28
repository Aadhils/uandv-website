# U&V v3.2 — Component Library

**Status:** Frozen documentation for reusable marketing and Why U&V components.

Path roots:

- Marketing: `apps/web/components/marketing/`
- Why U&V: `apps/web/components/why-uandv/`
- Shared UI: `packages/ui/src/components/`

---

## Marketing primitives

**File:** `marketing-primitives.tsx`

### `MarketingPageContainer`

| | |
|---|---|
| **Purpose** | Centers content within `uvContainer` |
| **Props** | `children`, `className?` |
| **Responsive** | `max-w-7xl`, `px-4 sm:px-6 lg:px-8` |

---

### `MarketingSection`

| | |
|---|---|
| **Purpose** | Standard marketing section with border, scroll offset, and padding |
| **Props** | `children`, `className?`, `id?`, `tone?` (`default` \| `subtle` \| `none`), `density?` (`default` \| `compact` \| `tight`), `as?`, `aria-label?` |
| **Usage** | Wrap every major content block on solution/service pages |
| **Responsive** | Padding scales at `sm` and `lg` breakpoints per density |

---

### `MarketingEyebrow`

| | |
|---|---|
| **Purpose** | Uppercase section label in brand color |
| **Props** | `children`, `className?`, `dark?` (hero on dark bg) |
| **Responsive** | Slightly larger tracking on `sm+` |

---

### `MarketingHeroTitle`

| | |
|---|---|
| **Purpose** | Page-level H1 |
| **Props** | `children`, `className?`, `id?`, `dark?` |
| **Responsive** | `1.875rem` → `3.25rem` on large screens |

---

### `MarketingSectionTitle`

| | |
|---|---|
| **Purpose** | Section H2 (or H3 via `as`) |
| **Props** | `children`, `className?`, `as?` (`h2` \| `h3`) |

---

### `MarketingCardTitle`

| | |
|---|---|
| **Purpose** | Card / list item heading |
| **Props** | `children`, `className?`, `as?` (`h2` \| `h3` \| `h4`) |

---

### `MarketingLead` / `MarketingBody`

| | |
|---|---|
| **Purpose** | Intro paragraph (`Lead`) and body copy (`Body`) |
| **Props** | `children`, `className?`, `dark?` (Lead only) |

---

### `MarketingCard`

| | |
|---|---|
| **Purpose** | Standard or premium card surface |
| **Props** | `children`, `className?`, `premium?` (boolean), `as?` |
| **Usage** | Prefer over inline `marketing-card-lift` strings |
| **Responsive** | `p-5 sm:p-6` |

---

### `MarketingIconBox`

| | |
|---|---|
| **Purpose** | 44×44 icon container with brand muted background |
| **Props** | `children`, `className?` |
| **Responsive** | Slight lift on parent `group-hover` |

---

### `MarketingButtonLink`

| | |
|---|---|
| **Purpose** | Primary marketing CTA as Next.js `Link` styled as button |
| **Props** | All `Link` props + `variant?` (`primary` \| `outline` \| `secondary`), `size?` (`sm` \| `md` \| `lg`, default `lg`) |
| **Usage** | Hero and in-section CTAs on all marketing pages |
| **Accessibility** | Includes `uv-focus-ring` |
| **Responsive** | Full-width on mobile when placed in `MarketingHeroActions` stack |

---

### `MarketingHeroActions`

| | |
|---|---|
| **Purpose** | CTA button row/column below hero copy |
| **Props** | `children`, `className?` |
| **Responsive** | Column on mobile, row wrap on `sm+` |

---

### `MarketingBadge` / `MarketingCtaPanel`

Standard badge chip and rounded CTA panel — use for labels and closing CTAs.

---

### `marketingStaggerDelay(index, stepMs?)`

Utility returning capped stagger delay (max 280ms) for `Reveal` grids.

---

## Page shell & hero

**File:** `marketing-page-hero.tsx`

| Component | Purpose |
|-----------|---------|
| `MarketingContentPage` | Root marketing page wrapper (grain + ambient) |
| `MarketingPageHero` | Hero `<section>` with cinematic backdrop |
| `MarketingPageHeroBackdrop` | Decorative glow/grid layers (aria-hidden) |
| `MarketingPageHeroInner` | Container with default hero padding |

**File:** `marketing-standard-hero.tsx`

| Component | Purpose |
|-----------|---------|
| `MarketingStandardHeroGrid` | BS-reference grid: copy left, illustration right |
| `MarketingStandardHeroCopy` | `max-w-3xl` copy column |
| `MarketingHeroIllustrationFrame` | Framed hero visual with standard shadow |
| `MarketingStandardHeroIllustration` | Reveal-wrapped illustration slot |

Exported classes: `marketingStandardHeroGridClass`, `marketingStandardHeroInnerClass`.

---

## `SectionHeading`

**File:** `section-heading.tsx`

| | |
|---|---|
| **Purpose** | Eyebrow + title + description block |
| **Props** | `eyebrow`, `title`, `description`, `align?` (`left` \| `center`) |

---

## `Reveal`

**File:** `reveal.tsx` (client component)

| | |
|---|---|
| **Purpose** | Intersection-observer scroll reveal |
| **Props** | `children`, `className?`, `delayMs?` (default 0), `variant?` (`fade` \| `up` \| `scale` \| `blur` \| `up-blur`), `immediate?` |
| **Responsive** | No layout change; opacity/transform only |
| **Accessibility** | Respects `prefers-reduced-motion` — shows immediately |

---

## Site chrome

| Component | File | Purpose |
|-----------|------|---------|
| `SiteHeader` | `site-header.tsx` | Logo + nav + theme toggle (no header CTAs) |
| `SiteFooter` | `site-footer.tsx` | Footer links and contact |
| `Breadcrumbs` | `components/services/breadcrumbs.tsx` | Breadcrumb trail |

---

## Why U&V — visual stage

### `WhyUandVVisualStage`

**File:** `why-uandv-visual-stage.tsx` (client)

| Prop | Type | Default | Purpose |
|------|------|---------|---------|
| `src` | `string` | required | Image URL |
| `alt` | `string` | required | Accessible description |
| `aspectRatio` | `16/10` \| `4/3` \| `3/2` \| `auto` | `4/3` | Aspect class (skipped for fixed presets) |
| `priority` | `boolean` | `false` | Next/Image LCP priority |
| `objectFit` | `contain` \| `cover` | `contain` | Image fit |
| `objectPosition` | `string` | `center` | CSS object-position |
| `preset` | see below | `section` | Layout preset |
| `sizes` | `string` | responsive default | Next/Image sizes |
| `className` | `string` | — | Wrapper classes |
| `imageClassName` | `string` | — | Image classes |

**Presets:** `hero`, `journey`, `journey-grow`, `section`, `industry`, `backdrop`

**Behavior:**

- Probes image load via hidden `Image`; on success shows visible image
- On failure keeps intentional CSS placeholder (no filename, no broken icon)
- Hero uses fixed heights (200px → 520px desktop) to prevent CLS

---

### Section visual wrappers

**File:** `wuv-cinema-art.tsx`

| Export | Asset key | Preset | Notes |
|--------|-----------|--------|-------|
| `HeroTableVisual` | `hero` | `hero` | `priority`, `object-fit: cover` |
| `PrinciplesBannerVisual` | `principles` | `section` | |
| `WorkflowBannerVisual` | `workflow` | `section` | |
| `PartnershipVisual` | `partnership` | `section` | Why Clients Stay |
| `ClosingTableVisual` | `closing` | `backdrop` | Absolute fill |
| `JourneyStageVisual` | dynamic | `journey` / `journey-grow` | Partner Path stages |
| `IndustryVisual` | dynamic | `industry` | Industry cards |

---

### `WuvPartnerPathSection`

**File:** `wuv-partner-path.tsx`

Five-stage partner journey with `JourneyStageVisual` per stage. Grow stage uses `journey-grow` preset.

---

### `WuvIndustriesGallery`

**File:** `wuv-industries-gallery.tsx`

3×2 grid of six industry cards using `IndustryVisual` + `wuvFeaturedIndustries` manifest.

---

### `WuvCinemaActs` / `WhyUandvPage`

Orchestrate full Why U&V page sections. Content from `lib/why-uandv-content.ts`.

---

## `@uandv/ui` primitives

Used across marketing and app shells:

| Component | Key props | Marketing usage |
|-----------|-----------|-----------------|
| `Button` | `variant`, `size`, `fullWidth`, `isLoading` | Forms, demos |
| `buttonVariants` | CVA variants | Portfolio card actions |
| `Card` | `variant`, `padding` | Dashboard / admin |
| `Icon` | `name`, `size` | Inline icons |
| `cn` | — | Class merging |

Button sizes: `sm` (h-9), `md` (h-11), `lg` (h-12). Radius: `rounded-uv-lg`.

---

## Portfolio

| Component | File | Purpose |
|-----------|------|---------|
| `PortfolioCard` | `portfolio-card.tsx` | Case study grid card |
| `DemoImagePlaceholder` | same | Illustration slot when no photo |

---

## Design tokens (import reference)

```ts
import {
  uvContainer,
  uvCard,
  uvCardInteractive,
  uvCardInteractiveSolid,
  uvHeroIllustrationFrame,
  // ...
} from '@/components/marketing/marketing-design-tokens';
```

```ts
import {
  MarketingSection,
  MarketingButtonLink,
  // ...
} from '@/components/marketing/marketing-primitives';
```

---

## Responsive conventions

| Breakpoint | Typical behavior |
|------------|------------------|
| Default | Single column, compact padding |
| `sm` (640px) | 2-column grids begin |
| `lg` (1024px) | Hero side-by-side, 3-column grids, sticky visuals |
| `xl` | Wider hero gaps |

All marketing containers share `max-w-7xl` — do not introduce alternate max-widths without design approval.
