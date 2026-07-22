# Phase 2 — Our Services Experience

**Status:** Complete (awaiting approval)  
**App:** `apps/web`

## Delivered

- Services catalog at `/services`
- 15 dedicated SEO-optimized service pages at `/services/[slug]`
- Shared premium template: hero, overview, features, benefits, process, technologies, FAQ, CTA, inquiry form, WhatsApp/contact buttons, breadcrumbs, related services
- Custom SVG illustrations per service category
- Sitemap + JSON-LD for catalog and each service
- Landing `#services` section linked to all 15 detail pages
- Inquiry forms use mailto with explicit “backend not connected” status (no fake testimonials)

## Service slugs

1. `website-development`
2. `mobile-app-development`
3. `custom-software-development`
4. `ai-automation`
5. `erp-software`
6. `crm-software`
7. `mlm-software`
8. `taxi-booking-software`
9. `travel-tourism-software`
10. `hotel-restaurant-software`
11. `ecommerce-solutions`
12. `digital-marketing`
13. `branding-logo-design`
14. `startup-business-consulting`
15. `business-registration-support`

## Key files

- `apps/web/lib/services.ts`
- `apps/web/components/services/*`
- `apps/web/app/(marketing)/services/page.tsx`
- `apps/web/app/(marketing)/services/[slug]/page.tsx`
