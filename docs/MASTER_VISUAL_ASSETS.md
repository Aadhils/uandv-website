# U&V v3.2 — Master Visual Asset Specification

**Page:** Why U&V (`/why-uandv`)  
**Version:** 3.2  
**Status:** Documentation only — no code, layout, component, or CSS changes  
**Last updated:** 27 July 2026

---

## Overview

This document is the **single master specification** for every WebP visual asset required on the Why U&V page. All assets drop into one folder; the existing manifest and component system resolve paths automatically when filenames match.

| Item | Value |
|------|-------|
| **Drop folder** | `apps/web/public/images/why-uandv/` |
| **Public URL base** | `/images/why-uandv/` |
| **Manifest (code)** | `apps/web/lib/why-uandv-visual-assets.ts` |
| **Component system** | `WhyUandVVisualStage` + wrappers in `wuv-cinema-art.tsx` |
| **Format** | WebP only |
| **Color space** | sRGB |
| **Total assets** | 16 |

### Global delivery rules

| Rule | Requirement |
|------|-------------|
| Filenames | Exact match — do not rename |
| Substitutes | No SVG, PNG placeholders, or generated artwork in production |
| Text in images | Avoid embedded text; section copy lives in HTML |
| Brand palette | UV violet (`#7C3AED`) and navy (`#1E3A8A`) accents; soft white backgrounds |
| Faces (hero) | Keep faces in central safe zone; avoid edge cropping |
| Until delivered | CSS placeholder stages show (soft white + UV/navy tint) |

### Global compression & quality guidance

| Asset group | Target file size | Quality (WebP) | Notes |
|-------------|------------------|----------------|-------|
| Hero | ≤ 180 KB | 82–88 | LCP candidate — balance quality vs weight |
| Journey (×5) | ≤ 80 KB each | 80–85 | Small display height; clarity over fine detail |
| Section banners (principles, workflow, partnership) | ≤ 150 KB each | 82–88 | Sticky side visuals; readable at ~45vw |
| Industries (×6) | ≤ 100 KB each | 80–86 | Compact card slots; iconographic clarity |
| Closing backdrop | ≤ 220 KB | 82–88 | Full-bleed; displayed at ~42% opacity |

Use lossy WebP with `cwebp -m 6` or equivalent optimizer. Strip EXIF. Verify visually after compression.

### Approved integration order

1. Hero  
2. Journey visuals (Discover → Strategy → Build → Launch → Grow)  
3. Principles  
4. Workflow  
5. Industries (all six)  
6. Partnership  
7. Closing  
8. Final responsive and animation review  

Do **not** mark the page complete until every asset is **Integrated** and **Approved**.

---

## Asset Specifications

---

### 1. `hero.webp`

| Field | Specification |
|-------|---------------|
| **Filename** | `hero.webp` |
| **Purpose** | Primary hero illustration — establishes trust, partnership, and business collaboration |
| **Section** | Hero (`why-uandv-page.tsx` → `HeroTableVisual`) |
| **Recommended size** | 1600 × 1000 px |
| **Aspect ratio** | 16:10 |
| **Safe crop area** | Center 70% width × 80% height — keep subjects, faces, and key UI elements inside this zone |
| **Mobile crop notes** | Mobile stage is **200px tall** (full width). `object-fit: cover` crops top/bottom aggressively. Place focal content in **vertical center**; avoid important detail in top 15% or bottom 20% on mobile |
| **Object position** | `center center` (tunable via `WUV_HERO_OBJECT_POSITION` in manifest) |
| **Alt text** | Business owner and U&V team planning together with digital business tools |
| **Animation recommendation** | Parent `Reveal` variant `scale` (delay 140ms); image fades in on load (opacity 0.4s). No parallax or motion inside the image |
| **Loading priority** | **High** — `priority={true}`, eager load; LCP candidate |
| **Compression recommendation** | ≤ 180 KB; optimize for sharp faces and UI at 52vw desktop display |
| **Quality recommendation** | WebP quality 84–88; verify at 200px, 240px, and 520px stage heights |

**Stage dimensions (CSS):** 200px mobile → 240px tablet → 520px desktop (max 560px)  
**Object fit:** `cover`  
**Sizes attribute:** `(max-width: 640px) 100vw, (max-width: 1024px) 92vw, 52vw`

---

### 2. `journey-discover.webp`

| Field | Specification |
|-------|---------------|
| **Filename** | `journey-discover.webp` |
| **Purpose** | Illustrate the Discover stage — listening and understanding business goals |
| **Section** | Partner Path — Stage 1 “We Listen First” (`#partner-path`) |
| **Recommended size** | 800 × 600 px |
| **Aspect ratio** | 4:3 |
| **Safe crop area** | Full frame — `object-fit: contain`; keep subject centered with ~8% padding from edges |
| **Mobile crop notes** | Displayed in **7.5rem (120px)** tall slot on mobile. Use simple, readable composition; avoid fine print or small icons |
| **Object position** | `center` |
| **Alt text** | Discover — business discussion and understanding your goals |
| **Animation recommendation** | Card `Reveal` variant `up` (staggered); image surface fades out on load (0.35s). No hover scale on journey cards |
| **Loading priority** | **Low** — lazy load, no priority |
| **Compression recommendation** | ≤ 80 KB |
| **Quality recommendation** | WebP quality 80–85 |

**Object fit:** `contain`  
**Sizes attribute:** `(max-width: 1024px) 100vw, 320px`

---

### 3. `journey-strategy.webp`

| Field | Specification |
|-------|---------------|
| **Filename** | `journey-strategy.webp` |
| **Purpose** | Illustrate the Strategy stage — planning roadmap and priorities |
| **Section** | Partner Path — Stage 2 “Build the Right Plan” |
| **Recommended size** | 800 × 600 px |
| **Aspect ratio** | 4:3 |
| **Safe crop area** | Center 85% — roadmap/planning motifs readable at small scale |
| **Mobile crop notes** | Same as journey-discover (7.5rem mobile height). Prefer horizontal flow left-to-right for roadmap visuals |
| **Object position** | `center` |
| **Alt text** | Strategy — planning roadmap and priorities |
| **Animation recommendation** | `Reveal` up, stagger index × 70ms (max 350ms); load fade 0.35s |
| **Loading priority** | **Low** — lazy |
| **Compression recommendation** | ≤ 80 KB |
| **Quality recommendation** | WebP quality 80–85 |

---

### 4. `journey-build.webp`

| Field | Specification |
|-------|---------------|
| **Filename** | `journey-build.webp` |
| **Purpose** | Illustrate the Build stage — development workspace and product creation |
| **Section** | Partner Path — Stage 3 “Turning Ideas Into Products” |
| **Recommended size** | 800 × 600 px |
| **Aspect ratio** | 4:3 |
| **Safe crop area** | Center 85% — screens/devices should be recognizable at thumbnail scale |
| **Mobile crop notes** | 7.5rem slot; avoid cluttered multi-screen layouts |
| **Object position** | `center` |
| **Alt text** | Build — development workspace and product creation |
| **Animation recommendation** | `Reveal` up, staggered; load fade 0.35s |
| **Loading priority** | **Low** — lazy |
| **Compression recommendation** | ≤ 80 KB |
| **Quality recommendation** | WebP quality 80–85 |

---

### 5. `journey-launch.webp`

| Field | Specification |
|-------|---------------|
| **Filename** | `journey-launch.webp` |
| **Purpose** | Illustrate the Launch stage — testing, refinement, and confident go-live |
| **Section** | Partner Path — Stage 4 “Go Live With Confidence” |
| **Recommended size** | 800 × 600 px |
| **Aspect ratio** | 4:3 |
| **Safe crop area** | Center 85% — launch/checklist/go-live symbolism clear at small size |
| **Mobile crop notes** | 7.5rem slot; single clear focal point |
| **Object position** | `center` |
| **Alt text** | Launch — successful deployment and go-live |
| **Animation recommendation** | `Reveal` up, staggered; load fade 0.35s |
| **Loading priority** | **Low** — lazy |
| **Compression recommendation** | ≤ 80 KB |
| **Quality recommendation** | WebP quality 80–85 |

---

### 6. `journey-grow.webp`

| Field | Specification |
|-------|---------------|
| **Filename** | `journey-grow.webp` |
| **Purpose** | Illustrate the Grow stage — long-term partnership and ongoing growth |
| **Section** | Partner Path — Stage 5 “Long-Term Business Partner” (emphasized card) |
| **Recommended size** | 800 × 600 px |
| **Aspect ratio** | 4:3 |
| **Safe crop area** | Center 85% — partnership/growth metaphor readable at slightly taller slot |
| **Mobile crop notes** | Uses `journey-grow` preset: **7.5rem mobile**, **10.5rem desktop** (taller than other journey stages). Slightly more vertical breathing room — still keep subject centered |
| **Object position** | `center` |
| **Alt text** | Grow — long-term support and partnership |
| **Animation recommendation** | `Reveal` up, staggered; load fade 0.35s. Emphasized card styling only — no extra image motion |
| **Loading priority** | **Low** — lazy |
| **Compression recommendation** | ≤ 80 KB |
| **Quality recommendation** | WebP quality 80–85 |

---

### 7. `principles.webp`

| Field | Specification |
|-------|---------------|
| **Filename** | `principles.webp` |
| **Purpose** | Section banner supporting “What We Stand Behind” — trust, reliability, long-term commitment |
| **Section** | Principles We Live By (`#principles` → `PrinciplesBannerVisual`) |
| **Recommended size** | 1200 × 900 px |
| **Aspect ratio** | 4:3 |
| **Safe crop area** | Center 80% — visual supports six principle cards; avoid competing with card text |
| **Mobile crop notes** | Full-width banner above card stack on mobile/tablet. `contain` fit — entire image visible; design for top-weighted composition |
| **Object position** | `center` |
| **Alt text** | Principles — trust, business-first thinking, reliability and long-term support |
| **Animation recommendation** | Scroll `Reveal` on section entry; image load fade via visual stage. No sticky motion on mobile |
| **Loading priority** | **Low** — lazy (below fold on most viewports) |
| **Compression recommendation** | ≤ 150 KB |
| **Quality recommendation** | WebP quality 82–88 |

**Object fit:** `contain`  
**Sizes attribute:** `(max-width: 1024px) 100vw, 45vw`  
**Layout note:** Sticky left visual beside principle cards on large screens.

---

### 8. `workflow.webp`

| Field | Specification |
|-------|---------------|
| **Filename** | `workflow.webp` |
| **Purpose** | Section banner for the eight-step delivery process — listen through improve |
| **Section** | How We Work With You (`#how-we-show-up` → `WorkflowBannerVisual`) |
| **Recommended size** | 1400 × 875 px |
| **Aspect ratio** | 16:10 |
| **Safe crop area** | Center 75% × 85% — workflow/sequence readable; horizontal flow suits 16:10 |
| **Mobile crop notes** | Full-width above step list on mobile. Wider aspect — avoid critical detail in far left/right 12% |
| **Object position** | `center` |
| **Alt text** | How we work with you — structured delivery from listen to improve |
| **Animation recommendation** | Section `Reveal`; step list has its own stagger. Image: load fade only |
| **Loading priority** | **Low** — lazy |
| **Compression recommendation** | ≤ 150 KB |
| **Quality recommendation** | WebP quality 82–88 |

**Object fit:** `contain`  
**Sizes attribute:** `(max-width: 1024px) 100vw, 45vw`

---

### 9. `industry-healthcare.webp`

| Field | Specification |
|-------|---------------|
| **Filename** | `industry-healthcare.webp` |
| **Purpose** | Healthcare industry card visual — hospital, clinical, patient-care context |
| **Section** | Industries We Understand — Healthcare card (`#industries`) |
| **Recommended size** | 900 × 675 px |
| **Aspect ratio** | 4:3 |
| **Safe crop area** | Center 90% — iconographic scene; card label “Healthcare” sits below image |
| **Mobile crop notes** | Card image height **180px mobile / 230px desktop**. `contain` fit inside rounded card. Keep subject centered; hover scales image to 103% — avoid edge-critical details |
| **Object position** | `center` |
| **Alt text** | Healthcare — hospital, doctor, patient and medical dashboard |
| **Animation recommendation** | Card hover: `scale-[1.03]` over 500ms ease-out on image only. Section `Reveal` on scroll |
| **Loading priority** | **Low** — lazy |
| **Compression recommendation** | ≤ 100 KB |
| **Quality recommendation** | WebP quality 80–86 |

**Object fit:** `contain`  
**Sizes attribute:** `(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw`

---

### 10. `industry-education.webp`

| Field | Specification |
|-------|---------------|
| **Filename** | `industry-education.webp` |
| **Purpose** | Education industry card visual — learning, teaching, digital classroom |
| **Section** | Industries — Education card |
| **Recommended size** | 900 × 675 px |
| **Aspect ratio** | 4:3 |
| **Safe crop area** | Center 90% |
| **Mobile crop notes** | 180px / 230px card slot; centered composition; hover scale safe zone |
| **Object position** | `center` |
| **Alt text** | Education — teacher, student and digital learning |
| **Animation recommendation** | Card hover scale 1.03; scroll `Reveal` |
| **Loading priority** | **Low** — lazy |
| **Compression recommendation** | ≤ 100 KB |
| **Quality recommendation** | WebP quality 80–86 |

---

### 11. `industry-finance.webp`

| Field | Specification |
|-------|---------------|
| **Filename** | `industry-finance.webp` |
| **Purpose** | Finance industry card visual — secure payments, banking, analytics |
| **Section** | Industries — Finance card |
| **Recommended size** | 900 × 675 px |
| **Aspect ratio** | 4:3 |
| **Safe crop area** | Center 90% |
| **Mobile crop notes** | 180px / 230px card slot; avoid tiny chart labels |
| **Object position** | `center` |
| **Alt text** | Finance — secure payments, banking dashboard and analytics |
| **Animation recommendation** | Card hover scale 1.03; scroll `Reveal` |
| **Loading priority** | **Low** — lazy |
| **Compression recommendation** | ≤ 100 KB |
| **Quality recommendation** | WebP quality 80–86 |

---

### 12. `industry-travel.webp`

| Field | Specification |
|-------|---------------|
| **Filename** | `industry-travel.webp` |
| **Purpose** | Travel industry card visual — booking, destinations, journey |
| **Section** | Industries — Travel card |
| **Recommended size** | 900 × 675 px |
| **Aspect ratio** | 4:3 |
| **Safe crop area** | Center 90% |
| **Mobile crop notes** | 180px / 230px card slot |
| **Object position** | `center` |
| **Alt text** | Travel — hotel, airplane, booking and tourist journey |
| **Animation recommendation** | Card hover scale 1.03; scroll `Reveal` |
| **Loading priority** | **Low** — lazy |
| **Compression recommendation** | ≤ 100 KB |
| **Quality recommendation** | WebP quality 80–86 |

---

### 13. `industry-hospitality.webp`

| Field | Specification |
|-------|---------------|
| **Filename** | `industry-hospitality.webp` |
| **Purpose** | Hospitality industry card visual — hotel reception, guest experience |
| **Section** | Industries — Hospitality card |
| **Recommended size** | 900 × 675 px |
| **Aspect ratio** | 4:3 |
| **Safe crop area** | Center 90% |
| **Mobile crop notes** | 180px / 230px card slot |
| **Object position** | `center` |
| **Alt text** | Hospitality — hotel reception, guest and booking system |
| **Animation recommendation** | Card hover scale 1.03; scroll `Reveal` |
| **Loading priority** | **Low** — lazy |
| **Compression recommendation** | ≤ 100 KB |
| **Quality recommendation** | WebP quality 80–86 |

---

### 14. `industry-logistics.webp`

| Field | Specification |
|-------|---------------|
| **Filename** | `industry-logistics.webp` |
| **Purpose** | Logistics industry card visual — warehouse, transport, tracking |
| **Section** | Industries — Logistics card |
| **Recommended size** | 900 × 675 px |
| **Aspect ratio** | 4:3 |
| **Safe crop area** | Center 90% |
| **Mobile crop notes** | 180px / 230px card slot |
| **Object position** | `center` |
| **Alt text** | Logistics — truck, warehouse and tracking dashboard |
| **Animation recommendation** | Card hover scale 1.03; scroll `Reveal` |
| **Loading priority** | **Low** — lazy |
| **Compression recommendation** | ≤ 100 KB |
| **Quality recommendation** | WebP quality 80–86 |

---

### 15. `partnership.webp`

| Field | Specification |
|-------|---------------|
| **Filename** | `partnership.webp` |
| **Purpose** | Visual for client retention — long-term partnership beyond launch |
| **Section** | Why Clients Stay (`#clients-stay` → `PartnershipVisual`) |
| **Recommended size** | 1200 × 900 px |
| **Aspect ratio** | 4:3 |
| **Safe crop area** | Center 80% — supports four retention cards; calm, reassuring tone |
| **Mobile crop notes** | Full-width banner above card grid on mobile. `contain` — entire illustration visible |
| **Object position** | `center` |
| **Alt text** | Long-term partnership beyond launch — support, growth and continuity |
| **Animation recommendation** | Section `Reveal`; image load fade. No parallax |
| **Loading priority** | **Low** — lazy |
| **Compression recommendation** | ≤ 150 KB |
| **Quality recommendation** | WebP quality 82–88 |

**Object fit:** `contain`  
**Sizes attribute:** `(max-width: 1024px) 100vw, 45vw`

---

### 16. `closing.webp`

| Field | Specification |
|-------|---------------|
| **Filename** | `closing.webp` |
| **Purpose** | Full-bleed atmospheric backdrop for the closing beat — calm confidence |
| **Section** | Closing Beat (`#closing-beat` → `ClosingTableVisual`) |
| **Recommended size** | 1920 × 1080 px |
| **Aspect ratio** | 16:10 (deliver 16:9 acceptable; displayed with `cover`) |
| **Safe crop area** | Center 60% — text overlays center; keep busy detail away from central 50% where copy sits |
| **Mobile crop notes** | Full viewport width backdrop. `cover` crops edges on narrow screens — avoid critical elements in left/right 20%. Surface opacity **42%** — image should read well when faded |
| **Object position** | `center` |
| **Alt text** | Closing — calm confidence in a trusted technology partner |
| **Animation recommendation** | Decorative backdrop only (`pointer-events: none`). No motion. Copy uses section `Reveal` |
| **Loading priority** | **Low** — lazy (near page bottom) |
| **Compression recommendation** | ≤ 220 KB |
| **Quality recommendation** | WebP quality 82–88; verify legibility of white copy over faded image |

**Object fit:** `cover`  
**Sizes attribute:** `100vw`  
**Note:** Serves as decorative backdrop; ensure sufficient contrast for overlaid text.

---

## Master Checklist

**Legend**

| Column | Meaning |
|--------|---------|
| **Ready** | Component slot wired; manifest entry exists; page accepts this filename |
| **Waiting** | Final WebP file not yet delivered to `public/images/why-uandv/` |
| **Integrated** | File on disk; renders in browser without 404 |
| **Approved** | Visually reviewed desktop + tablet + mobile; signed off |

**System status:** All 16 slots **Ready**. All 16 files **Waiting**. None **Integrated** or **Approved** as of this document.

| # | Filename | Section | Ready | Waiting | Integrated | Approved |
|---|----------|---------|:-----:|:-------:|:----------:|:--------:|
| 1 | `hero.webp` | Hero | ✅ | ⏳ | — | — |
| 2 | `journey-discover.webp` | Partner Path — Discover | ✅ | ⏳ | — | — |
| 3 | `journey-strategy.webp` | Partner Path — Strategy | ✅ | ⏳ | — | — |
| 4 | `journey-build.webp` | Partner Path — Build | ✅ | ⏳ | — | — |
| 5 | `journey-launch.webp` | Partner Path — Launch | ✅ | ⏳ | — | — |
| 6 | `journey-grow.webp` | Partner Path — Grow | ✅ | ⏳ | — | — |
| 7 | `principles.webp` | Principles We Live By | ✅ | ⏳ | — | — |
| 8 | `workflow.webp` | How We Work With You | ✅ | ⏳ | — | — |
| 9 | `industry-healthcare.webp` | Industries — Healthcare | ✅ | ⏳ | — | — |
| 10 | `industry-education.webp` | Industries — Education | ✅ | ⏳ | — | — |
| 11 | `industry-finance.webp` | Industries — Finance | ✅ | ⏳ | — | — |
| 12 | `industry-travel.webp` | Industries — Travel | ✅ | ⏳ | — | — |
| 13 | `industry-hospitality.webp` | Industries — Hospitality | ✅ | ⏳ | — | — |
| 14 | `industry-logistics.webp` | Industries — Logistics | ✅ | ⏳ | — | — |
| 15 | `partnership.webp` | Why Clients Stay | ✅ | ⏳ | — | — |
| 16 | `closing.webp` | Closing Beat | ✅ | ⏳ | — | — |

### Summary counts

| Status | Count |
|--------|-------|
| Ready (slot wired) | 16 / 16 |
| Waiting (file delivery) | 16 / 16 |
| Integrated | 0 / 16 |
| Approved | 0 / 16 |

---

## Post-delivery verification (per asset)

When each file is added, verify:

1. No 404 in Network tab for `/images/why-uandv/{filename}`
2. Placeholder surface fades out (`data-wuv-visual="loaded"`)
3. Alt text present in DOM (except decorative preload pass — final image uses manifest alt)
4. No horizontal overflow or CLS at 320px, 768px, 1280px
5. Update checklist: mark **Integrated**, then **Approved** after visual review

### Page-complete criteria

- [ ] All 16 files in `public/images/why-uandv/`
- [ ] All checklist rows marked **Integrated**
- [ ] All checklist rows marked **Approved**
- [ ] Desktop, tablet, mobile review complete
- [ ] Animation review complete (Reveal, journey fade, industry hover, hero scale)
- [ ] Hero LCP checked in Lighthouse

---

## Related documentation

| Document | Purpose |
|----------|---------|
| `docs/03-image-assets.md` | Technical drop guide and file list |
| `docs/FINAL_PRODUCTION_REPORT.md` | Production audit (marketing freeze) |
| `apps/web/lib/why-uandv-visual-assets.ts` | Runtime manifest (do not change filenames without updating both) |

---

*Documentation only. No code, layout, component, or CSS modifications were made for this specification.*
