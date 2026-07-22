# Module 1 — Landing Website

**App location:** `apps/web/app/(marketing)/`  
**Status:** Architecture only — not implemented

## Purpose

Public brand presence and conversion funnel for U&V. Optimized for SEO, performance, and clear CTAs into registration and business onboarding.

## Scope

- Marketing pages (home, about, pricing, contact, legal)
- Public marketplace/service browse (read-only)
- Public business profile pages (`/business/[slug]`)
- Analytics pixels and conversion tracking

## Out of scope

- Authenticated dashboard flows (Module 3)
- Data mutations (delegated to domain modules via API)

## Planned routes

| Route | Description |
|-------|-------------|
| `/` | Home — hero, features, CTA |
| `/about` | Company story and mission |
| `/pricing` | Subscription tiers |
| `/marketplace` | Public product catalog |
| `/services` | Public services catalog |
| `/business/[slug]` | Public business profile |
| `/contact` | Contact form |
| `/legal/terms` | Terms of service |
| `/legal/privacy` | Privacy policy |

## Dependencies

- `packages/modules/business-profiles` — public profile data
- `packages/modules/marketplace` — public product catalog
- `packages/modules/services-marketplace` — public services catalog
- `packages/modules/auth` — signup/login CTAs
