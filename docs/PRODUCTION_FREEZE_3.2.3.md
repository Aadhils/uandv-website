# U&V v3.2 — Sprint 3.2.3 Production Freeze Report

**Freeze date:** 27 July 2026  
**Scope:** Why U&V page + production codebase freeze before visual asset integration  
**Rules observed:** No redesign, layout, typography, color, component structure, or placeholder image changes

---

## Executive Summary

The **codebase is frozen and production-ready**. All Why U&V sections render with approved layout, typography, and responsive structure. The visual component system is wired; **16 WebP assets are in Waiting status** (folders ready, files not yet delivered). CSS placeholders prevent layout shift when assets are absent.

| Gate | Result |
|------|--------|
| Why U&V sections | ✅ Production-ready |
| Asset folder structure | ✅ Ready |
| Hero priority loading | ✅ Configured |
| Non-hero lazy loading | ✅ Configured |
| Build | ✅ PASS |
| Lint | ✅ PASS |
| TypeScript | ✅ PASS |
| **Freeze status** | **✅ FROZEN — awaiting visual assets** |

---

## Why U&V Section Verification

| # | Section | Anchor / ID | Visual component | Layout | Content | Status |
|---|---------|-------------|------------------|--------|---------|--------|
| 1 | Hero | — | `HeroTableVisual` | ✅ Approved | ✅ Frozen | ✅ Ready |
| 2 | Story intro | — | None (copy only) | ✅ Approved | ✅ Frozen | ✅ Ready |
| 3 | Partner Path | `#partner-path` | `JourneyStageVisual` ×5 | ✅ Approved | ✅ Frozen | ✅ Ready |
| 4 | Principles | `#principles` | `PrinciplesBannerVisual` | ✅ Approved | ✅ Frozen | ✅ Ready |
| 5 | How We Work | `#how-we-show-up` | `WorkflowBannerVisual` | ✅ Approved | ✅ Frozen | ✅ Ready |
| 6 | Why Clients Stay | `#clients-stay` | `PartnershipVisual` | ✅ Approved | ✅ Frozen | ✅ Ready |
| 7 | Industries | `#industries` | `IndustryVisual` ×6 | ✅ Approved (compact) | ✅ Frozen | ✅ Ready |
| 8 | Closing Beat | `#closing-beat` | `ClosingTableVisual` | ✅ Approved | ✅ Frozen | ✅ Ready |
| 9 | Continue Journey | `#continue` | None (CTA copy) | ✅ Approved | ✅ Frozen | ✅ Ready |

**Accessibility:** Skip link, breadcrumbs, `aria-label` on all major regions, manifest alt text defined for all visuals.

**Missing assets behaviour:** `WhyUandVVisualStage` shows fixed-height CSS placeholder; `onError` retains placeholder if file 404s. No broken layout.

---

## Asset Path Verification

### Folder structure (exists)

```
apps/web/public/images/why-uandv/
├── .gitkeep
├── journey/.gitkeep
├── principles/.gitkeep
├── workflow/.gitkeep
├── industries/.gitkeep
└── closing/.gitkeep
```

### WebP files on disk

**0 / 16** — all assets **Waiting** for designer delivery. Folders and manifest paths are verified.

---

## Visual Asset Registry

**Status legend:** `Waiting` = slot wired, file not delivered · `Integrated` = file on disk, renders · `Approved` = visually signed off

| # | Asset Name | File Path (under `public/`) | Public URL | Status |
|---|------------|----------------------------|------------|--------|
| 1 | Hero | `images/why-uandv/hero.webp` | `/images/why-uandv/hero.webp` | **Waiting** |
| 2 | Journey — Discover | `images/why-uandv/journey/journey-discover.webp` | `/images/why-uandv/journey/journey-discover.webp` | **Waiting** |
| 3 | Journey — Strategy | `images/why-uandv/journey/journey-strategy.webp` | `/images/why-uandv/journey/journey-strategy.webp` | **Waiting** |
| 4 | Journey — Build | `images/why-uandv/journey/journey-build.webp` | `/images/why-uandv/journey/journey-build.webp` | **Waiting** |
| 5 | Journey — Launch | `images/why-uandv/journey/journey-launch.webp` | `/images/why-uandv/journey/journey-launch.webp` | **Waiting** |
| 6 | Journey — Grow | `images/why-uandv/journey/journey-grow.webp` | `/images/why-uandv/journey/journey-grow.webp` | **Waiting** |
| 7 | Principles | `images/why-uandv/principles/principles.webp` | `/images/why-uandv/principles/principles.webp` | **Waiting** |
| 8 | Workflow | `images/why-uandv/workflow/workflow.webp` | `/images/why-uandv/workflow/workflow.webp` | **Waiting** |
| 9 | Industry — Healthcare | `images/why-uandv/industries/industry-healthcare.webp` | `/images/why-uandv/industries/industry-healthcare.webp` | **Waiting** |
| 10 | Industry — Education | `images/why-uandv/industries/industry-education.webp` | `/images/why-uandv/industries/industry-education.webp` | **Waiting** |
| 11 | Industry — Finance | `images/why-uandv/industries/industry-finance.webp` | `/images/why-uandv/industries/industry-finance.webp` | **Waiting** |
| 12 | Industry — Travel | `images/why-uandv/industries/industry-travel.webp` | `/images/why-uandv/industries/industry-travel.webp` | **Waiting** |
| 13 | Industry — Hospitality | `images/why-uandv/industries/industry-hospitality.webp` | `/images/why-uandv/industries/industry-hospitality.webp` | **Waiting** |
| 14 | Industry — Logistics | `images/why-uandv/industries/industry-logistics.webp` | `/images/why-uandv/industries/industry-logistics.webp` | **Waiting** |
| 15 | Partnership | `images/why-uandv/partnership.webp` | `/images/why-uandv/partnership.webp` | **Waiting** |
| 16 | Closing | `images/why-uandv/closing/closing.webp` | `/images/why-uandv/closing/closing.webp` | **Waiting** |

### Registry summary

| Status | Count |
|--------|-------|
| Waiting | 16 |
| Integrated | 0 |
| Approved | 0 |

**Manifest source:** `apps/web/lib/why-uandv-visual-assets.ts`

---

## Image Loading Verification

### Hero — priority ✅

`HeroTableVisual` (`wuv-cinema-art.tsx`):

- `priority` (implicit `true`)
- `loading`: eager (via `priority ? 'eager' : 'lazy'` in `WhyUandVVisualStage`)
- `object-fit: cover`
- LCP candidate

### All other visuals — lazy ✅

| Component | `priority` | `loading` |
|-----------|------------|-----------|
| `JourneyStageVisual` | `false` | `"lazy"` (explicit) |
| `PrinciplesBannerVisual` | default `false` | lazy |
| `WorkflowBannerVisual` | default `false` | lazy |
| `PartnershipVisual` | default `false` | lazy |
| `IndustryVisual` | default `false` | lazy |
| `ClosingTableVisual` | default `false` | lazy |

---

## Build Verification (final)

| Command | Package | Result |
|---------|---------|--------|
| `pnpm build` | `@uandv/web` | ✅ **PASS** |
| `pnpm lint` | `@uandv/web` | ✅ **PASS** |
| `pnpm exec tsc --noEmit` | `@uandv/web` | ✅ **PASS** |

`/why-uandv` builds as static (○) — no build errors.

---

## Freeze Declaration

| Item | Frozen |
|------|--------|
| Why U&V layout | ✅ |
| Why U&V typography | ✅ |
| Why U&V spacing / colors | ✅ |
| Why U&V component structure | ✅ |
| Visual asset manifest paths | ✅ |
| Image loading behaviour | ✅ |

**Not frozen (pending delivery):** Final WebP artwork — integrate per `docs/IMAGE_ASSET_GUIDE.md` integration order starting with `hero.webp`.

---

## Next step after freeze

1. Deliver `hero.webp` → `public/images/why-uandv/hero.webp`
2. Mark registry row **Integrated** → visual review → **Approved**
3. Continue integration order (journey → principles → workflow → industries → partnership → closing)
4. Page complete only when all 16 rows are **Approved**

---

*Sprint 3.2.3 — audit and freeze only. No UI changes made.*
