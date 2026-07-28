# U&V v3.2 — Performance Checklist

**Status:** Frozen marketing site — use this checklist before each production release.

Target: fast LCP, minimal CLS, accessible interactions, SEO-ready public pages.

---

## Image optimization

### Why U&V (`/why-uandv`)

- [ ] All 16 WebP files present in `public/images/why-uandv/` (see `03-image-assets.md`)
- [ ] Filenames match `why-uandv-visual-assets.ts` exactly
- [ ] **Hero only** uses `priority={true}` (`HeroTableVisual`)
- [ ] All other section images lazy-load via Next/Image default
- [ ] Correct `sizes` per section (hero 52vw desktop; industries 33vw; etc.)
- [ ] Hero `object-fit: cover`; section visuals `contain` unless specified
- [ ] No layout shift — fixed stage heights in `.wuv-visual-stage--*` CSS
- [ ] Placeholder state renders without broken-image icon before assets arrive

### General marketing

- [ ] Use `next/image` for raster photos and WebP (not raw `<img>` for large assets)
- [ ] SVG illustrations (`ServiceIllustration`) are component-based — keep bundles lean
- [ ] Home hero media uses `marketing-hero-media` with `object-cover`
- [ ] Export WebP at recommended dimensions — avoid uploading 4K originals

### Next.js Image

- [ ] Images served from `public/` or configured remote patterns in `next.config.ts`
- [ ] No unnecessary `unoptimized` flags on marketing pages

---

## Caching

### Static assets

- [ ] Files in `public/images/` receive long-cache headers from hosting (Vercel default)
- [ ] After deploying new WebP assets, verify cache bust via filename versioning if CDN stale (prefer new filename over query strings)

### Next.js

- [ ] Marketing routes pre-rendered where possible (`○` static in build output)
- [ ] `generateStaticParams` used for portfolio/service slugs

### Fonts

- [ ] Google fonts (Manrope, Syne, Geist Mono) use `display: 'swap'` (`app/layout.tsx`)
- [ ] `adjustFontFallback: true` reduces CLS during font load

---

## Lazy loading

| Area | Behavior |
|------|----------|
| Why U&V hero | **Eager** (`priority`) |
| Why U&V sections | Lazy (default) |
| `Reveal` animations | IntersectionObserver — no load until near viewport |
| Below-fold images | Default Next/Image lazy |
| Third-party scripts | GA via `@next/third-parties` (after hydration) |
| Microsoft Clarity | Client component — loads after page interactive |

Verify in Network tab: hero WebP loads first on `/why-uandv`.

---

## Accessibility

### Focus & keyboard

- [ ] All `MarketingButtonLink` have `uv-focus-ring`
- [ ] Skip link present (`Skip to main content`)
- [ ] FAQ accordions use native `<details>` with focusable summary
- [ ] No keyboard traps in marketing modals/wizards

### Motion

- [ ] `prefers-reduced-motion: reduce` disables marketing animations (`globals.css`)
- [ ] `Reveal` shows content immediately when reduced motion preferred

### Images

- [ ] Every `WhyUandVVisualStage` has meaningful `alt` from manifest
- [ ] Decorative layers use `aria-hidden`
- [ ] Probe/fallback images use `alt=""` and `aria-hidden`

### Color contrast

- [ ] Body text uses `--uv-foreground-muted` on white — verify WCAG AA on key pages
- [ ] Primary buttons: white text on brand gradient
- [ ] Hero dark mode (Home): light text on navy background

### Structure

- [ ] One H1 per marketing page
- [ ] Sections use `aria-label` where helpful (Why U&V cinema sections)
- [ ] Landmark regions: `header`, `main`, `footer`

---

## SEO readiness

### Metadata

- [ ] `metadataBase` set from `siteConfig.url` (`app/layout.tsx`)
- [ ] Per-page `title` and `description` via Next.js `metadata` exports
- [ ] Open Graph / Twitter images: `opengraph-image`, `twitter-image` routes

### Crawling

- [ ] `robots.txt` route active
- [ ] `sitemap.xml` generated
- [ ] Canonical URLs via `metadataBase`

### Structured data

- [ ] JSON-LD validation script: `pnpm --filter @uandv/web validate:schema`
- [ ] Organization / website schema where implemented

### Performance signals (lab)

Run before release:

```bash
cd apps/web
pnpm build
pnpm start
```

Then Lighthouse (mobile + desktop) on:

- `/`
- `/why-uandv`
- `/business-solutions`
- `/services`

Targets (guidance):

| Metric | Target |
|--------|--------|
| LCP | &lt; 2.5s |
| CLS | &lt; 0.1 |
| INP | &lt; 200ms |

---

## JavaScript & hydration

- [ ] Client components only where needed (`'use client'` on Reveal, visual stage, hero wizard)
- [ ] No hydration warnings in browser console on marketing pages
- [ ] No duplicate asset constants or unused imports (lint clean)

---

## Build verification

```bash
# From repo root
pnpm build
pnpm lint

# Web app only
pnpm --filter @uandv/web build
pnpm --filter @uandv/web lint
pnpm --filter @uandv/web typecheck
```

All must pass before production deploy.

---

## Monitoring (production)

- [ ] Google Analytics (`NEXT_PUBLIC_GA_MEASUREMENT_ID`) firing
- [ ] Microsoft Clarity configured if enabled
- [ ] Vercel Analytics / speed insights (if enabled on project)

---

## Related docs

- Image manifest: `03-image-assets.md`
- Components: `02-component-library.md`
- Deployment: `06-deployment-checklist.md`
