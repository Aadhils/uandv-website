<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:uv-design-constitution -->
# U&V Design Constitution (permanent)

**Reference:** `apps/web/components/consulting/business-consulting-page.tsx` (Business Solutions hero).

## Site header

The header stays clean. It contains **only**:

- Logo
- Navigation
- Theme toggle (when present)

**Never** place CTA buttons in the site header.

Implementation: `apps/web/components/marketing/site-header.tsx`

## Page hero (every marketing page)

Use `MarketingPageHero` + `MarketingStandardHeroGrid` from `marketing-standard-hero.tsx`.

Every page hero must include:

- Small eyebrow text
- Strong headline
- **Maximum 2–3 short paragraphs** (use `MarketingLead` for body copy)
- **Maximum two CTA buttons** (`MarketingHeroActions`)
- **One large illustration on the right** (`MarketingStandardHeroIllustration`)
- Fit within the first viewport as much as possible — avoid long introductions; do not push important content below the fold

The first screen must communicate the page purpose immediately. Move overflow copy into the first content section below the hero — do not delete it.
<!-- END:uv-design-constitution -->
