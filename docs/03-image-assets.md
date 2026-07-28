# U&V v3.2 — Image Assets

**Status:** Frozen — drop final WebP files only; do not rename without updating the manifest.

**Manifest source of truth:** `apps/web/lib/why-uandv-visual-assets.ts`  
**Public folder:** `apps/web/public/images/why-uandv/`  
**Base URL path:** `/images/why-uandv/`

**Component system:** `WhyUandVVisualStage` + section wrappers in `wuv-cinema-art.tsx`

Until files are added, the page shows intentional CSS placeholders (soft white, UV/navy tint). No filenames or “pending” text are shown.

---

## Delivery requirements (all assets)

| Requirement | Value |
|-------------|-------|
| Format | **WebP** |
| Color space | sRGB |
| Compression | High quality, optimized for web (target &lt; 200KB per section visual where possible) |
| Naming | Exact filenames below — do not rename |
| Faces | Hero: avoid cropping faces awkwardly; tune `WUV_HERO_OBJECT_POSITION` in manifest if needed |

---

## Hero

| Field | Value |
|-------|-------|
| **Filename** | `hero.webp` |
| **Location** | `public/images/why-uandv/hero.webp` |
| **URL** | `/images/why-uandv/hero.webp` |
| **Recommended size** | 1600 × 1000 px |
| **Aspect ratio** | 16:10 |
| **Alt text** | Business owner and U&V team planning together with digital business tools |
| **Object fit** | `cover` |
| **Object position** | `center center` (configurable via `WUV_HERO_OBJECT_POSITION`) |
| **Priority loading** | Yes (`priority={true}`) — LCP candidate |
| **Sizes attribute** | `(max-width: 640px) 100vw, (max-width: 1024px) 92vw, 52vw` |

**Usage notes:**

- Why U&V hero only (`HeroTableVisual` → `why-uandv-page.tsx`)
- Desktop layout: ~48% copy / ~52% visual
- Fixed stage heights: 200px mobile → 520px desktop (max 560px) — asset should read well at these dimensions
- Wrapped in `Reveal` variant `scale`

---

## Journey (Partner Path)

Five stage visuals for `#partner-path`. Compact preset heights: 7.5rem mobile → 10.5rem desktop (Grow stage).

### Discover

| Field | Value |
|-------|-------|
| **Filename** | `journey-discover.webp` |
| **Location** | `public/images/why-uandv/journey-discover.webp` |
| **Recommended size** | 800 × 600 px |
| **Aspect ratio** | 4:3 |
| **Alt text** | Discover — listening to understand business goals and challenges |
| **Object fit** | `contain` |
| **Usage** | Partner Path stage 1 — `JourneyStageVisual` |

### Strategy

| Field | Value |
|-------|-------|
| **Filename** | `journey-strategy.webp` |
| **Location** | `public/images/why-uandv/journey-strategy.webp` |
| **Recommended size** | 800 × 600 px |
| **Aspect ratio** | 4:3 |
| **Alt text** | Strategy — planning the right solution and roadmap |
| **Object fit** | `contain` |
| **Usage** | Partner Path stage 2 |

### Build

| Field | Value |
|-------|-------|
| **Filename** | `journey-build.webp` |
| **Location** | `public/images/why-uandv/journey-build.webp` |
| **Recommended size** | 800 × 600 px |
| **Aspect ratio** | 4:3 |
| **Alt text** | Build — designing and developing digital products |
| **Object fit** | `contain` |
| **Usage** | Partner Path stage 3 |

### Launch

| Field | Value |
|-------|-------|
| **Filename** | `journey-launch.webp` |
| **Location** | `public/images/why-uandv/journey-launch.webp` |
| **Recommended size** | 800 × 600 px |
| **Aspect ratio** | 4:3 |
| **Alt text** | Launch — testing, refining and going live with confidence |
| **Object fit** | `contain` |
| **Usage** | Partner Path stage 4 |

### Grow

| Field | Value |
|-------|-------|
| **Filename** | `journey-grow.webp` |
| **Location** | `public/images/why-uandv/journey-grow.webp` |
| **Recommended size** | 800 × 600 px |
| **Aspect ratio** | 4:3 |
| **Alt text** | Grow — long-term partnership, support and business growth |
| **Object fit** | `contain` |
| **Usage** | Partner Path stage 5 — uses `journey-grow` preset (slightly taller visual) |

**Journey sizes attribute:** `(max-width: 1024px) 100vw, 320px`  
**Lazy load:** Yes (no priority)

---

## Principles

| Field | Value |
|-------|-------|
| **Filename** | `principles.webp` |
| **Location** | `public/images/why-uandv/principles.webp` |
| **Recommended size** | 1200 × 900 px |
| **Aspect ratio** | 4:3 |
| **Alt text** | Principles — trust, business-first thinking, reliability and long-term support |
| **Object fit** | `contain` |
| **Usage** | `#principles` — sticky left visual beside principle cards (`PrinciplesBannerVisual`) |
| **Sizes** | `(max-width: 1024px) 100vw, 45vw` |

**Usage notes:** Supports trust, business-first thinking, reliability, honest communication, long-term support. Do not replace principle card copy.

---

## Workflow

| Field | Value |
|-------|-------|
| **Filename** | `workflow.webp` |
| **Location** | `public/images/why-uandv/workflow.webp` |
| **Recommended size** | 1400 × 875 px |
| **Aspect ratio** | 16:10 |
| **Alt text** | How we work with you — structured delivery from listen to improve |
| **Object fit** | `contain` |
| **Usage** | `#how-we-show-up` — sticky visual beside workflow steps (`WorkflowBannerVisual`) |
| **Sizes** | `(max-width: 1024px) 100vw, 45vw` |

---

## Partnership (Why Clients Stay)

| Field | Value |
|-------|-------|
| **Filename** | `partnership.webp` |
| **Location** | `public/images/why-uandv/partnership.webp` |
| **Recommended size** | 1200 × 900 px |
| **Aspect ratio** | 4:3 |
| **Alt text** | Long-term partnership beyond launch — support, growth and continuity |
| **Object fit** | `contain` |
| **Usage** | `#clients-stay` — `PartnershipVisual` (formerly clients-stay slot) |
| **Sizes** | `(max-width: 1024px) 100vw, 45vw` |

---

## Industries

Six featured industries in a 3×2 grid (`#industries`). Card visual height: **180px mobile → 230px desktop**.

| Filename | Alt text | Size | Ratio |
|----------|----------|------|-------|
| `industry-healthcare.webp` | Healthcare — hospital, doctor, patient and medical dashboard | 900 × 675 | 4:3 |
| `industry-education.webp` | Education — teacher, student and digital learning | 900 × 675 | 4:3 |
| `industry-finance.webp` | Finance — secure payments, banking dashboard and analytics | 900 × 675 | 4:3 |
| `industry-travel.webp` | Travel — hotel, airplane, booking and tourist journey | 900 × 675 | 4:3 |
| `industry-hospitality.webp` | Hospitality — hotel reception, guest and booking system | 900 × 675 | 4:3 |
| `industry-logistics.webp` | Logistics — truck, warehouse and tracking dashboard | 900 × 675 | 4:3 |

**Location (all):** `public/images/why-uandv/industry-{slug}.webp`  
**Object fit:** `contain`  
**Sizes:** `(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw`  
**Hover:** Slight image scale (`scale-[1.03]`) on card hover

**Usage notes:** Industry name shown as card label only — no description text on cards. Do not add SVG icons or substitute illustrations.

---

## Closing

| Field | Value |
|-------|-------|
| **Filename** | `closing.webp` |
| **Location** | `public/images/why-uandv/closing.webp` |
| **Recommended size** | 1920 × 1080 px |
| **Aspect ratio** | 16:10 |
| **Alt text** | Closing — calm confidence in a trusted technology partner |
| **Object fit** | `cover` |
| **Object position** | `center` |
| **Usage** | `#closing-beat` — full-bleed backdrop (`ClosingTableVisual`), opacity ~42% |
| **Sizes** | `100vw` |
| **Pointer events** | None (decorative backdrop) |

---

## Complete file checklist

Drop these **16 files** into `apps/web/public/images/why-uandv/`:

```
hero.webp
journey-discover.webp
journey-strategy.webp
journey-build.webp
journey-launch.webp
journey-grow.webp
principles.webp
workflow.webp
partnership.webp
closing.webp
industry-healthcare.webp
industry-education.webp
industry-finance.webp
industry-travel.webp
industry-hospitality.webp
industry-logistics.webp
```

---

## After adding assets

1. No code changes required if filenames match manifest.
2. Verify at `http://localhost:3000/why-uandv` (all section anchors).
3. Confirm hero LCP in Lighthouse; only `hero.webp` uses `priority`.
4. To adjust hero focal point without layout change, edit `WUV_HERO_OBJECT_POSITION` in `why-uandv-visual-assets.ts` (requires dev deploy).

---

## Other marketing pages

Home, Business Solutions, Services, Portfolio, and solution pages use inline illustrations (`ServiceIllustration`, hero layers, etc.) — not covered by this manifest. This document covers **Why U&V v3.2 WebP integration only**.
