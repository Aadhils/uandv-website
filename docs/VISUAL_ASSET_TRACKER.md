# U&V v3.3 — Visual Asset Tracker

**Sprint:** 3.3 — Visual Asset Integration Manager  
**Page:** Why U&V (`/why-uandv`)  
**Last updated:** 27 July 2026  
**Manifest:** `apps/web/lib/why-uandv-visual-assets.ts`

---

## Asset Status Dashboard

### Summary

| Metric | Count |
|--------|-------|
| **Total assets** | 16 |
| **Waiting** | 16 |
| **Received** | 0 |
| **Integrated** | 0 |
| **QA Approved** | 0 |

### Status legend

| Status | Meaning |
|--------|---------|
| **Waiting** | Slot wired in code; file not yet delivered |
| **Received** | WebP delivered to correct path; not yet verified in browser |
| **Integrated** | File renders on `/why-uandv` without 404; placeholder replaced |
| **QA Approved** | Desktop + tablet + mobile review passed; signed off |

### Recommended integration order

1. Hero  
2. Journey 01 → 05  
3. Principles  
4. Workflow  
5. Industries 01 → 06  
6. Partnership  
7. Closing  

---

## Master tracker

| ID | Asset | File path (`public/`) | Status | Received | Integrated | QA Approved |
|----|-------|----------------------|--------|:--------:|:----------:|:-----------:|
| H01 | Hero | `images/why-uandv/hero.webp` | **Waiting** | — | — | — |
| J01 | Journey 01 — Discover | `images/why-uandv/journey/journey-discover.webp` | **Waiting** | — | — | — |
| J02 | Journey 02 — Strategy | `images/why-uandv/journey/journey-strategy.webp` | **Waiting** | — | — | — |
| J03 | Journey 03 — Build | `images/why-uandv/journey/journey-build.webp` | **Waiting** | — | — | — |
| J04 | Journey 04 — Launch | `images/why-uandv/journey/journey-launch.webp` | **Waiting** | — | — | — |
| J05 | Journey 05 — Grow | `images/why-uandv/journey/journey-grow.webp` | **Waiting** | — | — | — |
| P01 | Principles | `images/why-uandv/principles/principles.webp` | **Waiting** | — | — | — |
| W01 | Workflow | `images/why-uandv/workflow/workflow.webp` | **Waiting** | — | — | — |
| I01 | Industry 01 — Healthcare | `images/why-uandv/industries/industry-healthcare.webp` | **Waiting** | — | — | — |
| I02 | Industry 02 — Education | `images/why-uandv/industries/industry-education.webp` | **Waiting** | — | — | — |
| I03 | Industry 03 — Finance | `images/why-uandv/industries/industry-finance.webp` | **Waiting** | — | — | — |
| I04 | Industry 04 — Travel | `images/why-uandv/industries/industry-travel.webp` | **Waiting** | — | — | — |
| I05 | Industry 05 — Hospitality | `images/why-uandv/industries/industry-hospitality.webp` | **Waiting** | — | — | — |
| I06 | Industry 06 — Logistics | `images/why-uandv/industries/industry-logistics.webp` | **Waiting** | — | — | — |
| R01 | Partnership | `images/why-uandv/partnership.webp` | **Waiting** | — | — | — |
| C01 | Closing | `images/why-uandv/closing/closing.webp` | **Waiting** | — | — | — |

---

## Per-asset integration checklists

Use one block per asset. Mark `[x]` when complete. Advance status only when all boxes for that stage are checked.

---

### H01 — Hero

**Target:** 1600 × 1000 · 16:10 · ≤ 180 KB · `priority` load  
**Alt (manifest):** Business owner and U&V team planning together with digital business tools

| Check | Waiting | Received | Integrated | QA |
|-------|:-------:|:--------:|:----------:|:--:|
| File exists at `public/images/why-uandv/hero.webp` | ☐ | ☐ | ☐ | ☐ |
| Correct dimensions (1600 × 1000) | ☐ | ☐ | ☐ | ☐ |
| Optimized WebP (≤ 180 KB, sRGB) | ☐ | ☐ | ☐ | ☐ |
| Responsive (320 / 768 / 1280 px) | ☐ | ☐ | ☐ | ☐ |
| No layout shift (fixed hero stage) | ☐ | ☐ | ☐ | ☐ |
| Alt text in DOM matches manifest | ☐ | ☐ | ☐ | ☐ |
| Passed QA | ☐ | ☐ | ☐ | ☐ |

**Status:** Waiting → Received → Integrated → QA Approved

---

### J01 — Journey 01 (Discover)

**Target:** 800 × 600 · 4:3 · ≤ 80 KB · lazy  
**Alt:** Discover — business discussion and understanding your goals

| Check | Waiting | Received | Integrated | QA |
|-------|:-------:|:--------:|:----------:|:--:|
| File exists at `journey/journey-discover.webp` | ☐ | ☐ | ☐ | ☐ |
| Correct dimensions (800 × 600) | ☐ | ☐ | ☐ | ☐ |
| Optimized WebP | ☐ | ☐ | ☐ | ☐ |
| Responsive | ☐ | ☐ | ☐ | ☐ |
| No layout shift | ☐ | ☐ | ☐ | ☐ |
| Alt text in DOM | ☐ | ☐ | ☐ | ☐ |
| Passed QA | ☐ | ☐ | ☐ | ☐ |

**Status:** Waiting

---

### J02 — Journey 02 (Strategy)

**Target:** 800 × 600 · 4:3 · ≤ 80 KB · lazy  
**Alt:** Strategy — planning roadmap and priorities

| Check | Waiting | Received | Integrated | QA |
|-------|:-------:|:--------:|:----------:|:--:|
| File exists at `journey/journey-strategy.webp` | ☐ | ☐ | ☐ | ☐ |
| Correct dimensions | ☐ | ☐ | ☐ | ☐ |
| Optimized WebP | ☐ | ☐ | ☐ | ☐ |
| Responsive | ☐ | ☐ | ☐ | ☐ |
| No layout shift | ☐ | ☐ | ☐ | ☐ |
| Alt text in DOM | ☐ | ☐ | ☐ | ☐ |
| Passed QA | ☐ | ☐ | ☐ | ☐ |

**Status:** Waiting

---

### J03 — Journey 03 (Build)

**Target:** 800 × 600 · 4:3 · ≤ 80 KB · lazy  
**Alt:** Build — development workspace and product creation

| Check | Waiting | Received | Integrated | QA |
|-------|:-------:|:--------:|:----------:|:--:|
| File exists at `journey/journey-build.webp` | ☐ | ☐ | ☐ | ☐ |
| Correct dimensions | ☐ | ☐ | ☐ | ☐ |
| Optimized WebP | ☐ | ☐ | ☐ | ☐ |
| Responsive | ☐ | ☐ | ☐ | ☐ |
| No layout shift | ☐ | ☐ | ☐ | ☐ |
| Alt text in DOM | ☐ | ☐ | ☐ | ☐ |
| Passed QA | ☐ | ☐ | ☐ | ☐ |

**Status:** Waiting

---

### J04 — Journey 04 (Launch)

**Target:** 800 × 600 · 4:3 · ≤ 80 KB · lazy  
**Alt:** Launch — successful deployment and go-live

| Check | Waiting | Received | Integrated | QA |
|-------|:-------:|:--------:|:----------:|:--:|
| File exists at `journey/journey-launch.webp` | ☐ | ☐ | ☐ | ☐ |
| Correct dimensions | ☐ | ☐ | ☐ | ☐ |
| Optimized WebP | ☐ | ☐ | ☐ | ☐ |
| Responsive | ☐ | ☐ | ☐ | ☐ |
| No layout shift | ☐ | ☐ | ☐ | ☐ |
| Alt text in DOM | ☐ | ☐ | ☐ | ☐ |
| Passed QA | ☐ | ☐ | ☐ | ☐ |

**Status:** Waiting

---

### J05 — Journey 05 (Grow)

**Target:** 800 × 600 · 4:3 · ≤ 80 KB · lazy (emphasized card slot)  
**Alt:** Grow — long-term support and partnership

| Check | Waiting | Received | Integrated | QA |
|-------|:-------:|:--------:|:----------:|:--:|
| File exists at `journey/journey-grow.webp` | ☐ | ☐ | ☐ | ☐ |
| Correct dimensions | ☐ | ☐ | ☐ | ☐ |
| Optimized WebP | ☐ | ☐ | ☐ | ☐ |
| Responsive | ☐ | ☐ | ☐ | ☐ |
| No layout shift | ☐ | ☐ | ☐ | ☐ |
| Alt text in DOM | ☐ | ☐ | ☐ | ☐ |
| Passed QA | ☐ | ☐ | ☐ | ☐ |

**Status:** Waiting

---

### P01 — Principles

**Target:** 1200 × 900 · 4:3 · ≤ 150 KB · lazy  
**Alt:** Principles — trust, business-first thinking, reliability and long-term support

| Check | Waiting | Received | Integrated | QA |
|-------|:-------:|:--------:|:----------:|:--:|
| File exists at `principles/principles.webp` | ☐ | ☐ | ☐ | ☐ |
| Correct dimensions | ☐ | ☐ | ☐ | ☐ |
| Optimized WebP | ☐ | ☐ | ☐ | ☐ |
| Responsive | ☐ | ☐ | ☐ | ☐ |
| No layout shift | ☐ | ☐ | ☐ | ☐ |
| Alt text in DOM | ☐ | ☐ | ☐ | ☐ |
| Passed QA | ☐ | ☐ | ☐ | ☐ |

**Status:** Waiting

---

### W01 — Workflow

**Target:** 1400 × 875 · 16:10 · ≤ 150 KB · lazy  
**Alt:** How we work with you — structured delivery from listen to improve

| Check | Waiting | Received | Integrated | QA |
|-------|:-------:|:--------:|:----------:|:--:|
| File exists at `workflow/workflow.webp` | ☐ | ☐ | ☐ | ☐ |
| Correct dimensions | ☐ | ☐ | ☐ | ☐ |
| Optimized WebP | ☐ | ☐ | ☐ | ☐ |
| Responsive | ☐ | ☐ | ☐ | ☐ |
| No layout shift | ☐ | ☐ | ☐ | ☐ |
| Alt text in DOM | ☐ | ☐ | ☐ | ☐ |
| Passed QA | ☐ | ☐ | ☐ | ☐ |

**Status:** Waiting

---

### I01 — Industry 01 (Healthcare)

**Target:** 900 × 675 · 4:3 · ≤ 100 KB · lazy  
**Alt:** Healthcare — hospital, doctor, patient and medical dashboard

| Check | Waiting | Received | Integrated | QA |
|-------|:-------:|:--------:|:----------:|:--:|
| File exists at `industries/industry-healthcare.webp` | ☐ | ☐ | ☐ | ☐ |
| Correct dimensions | ☐ | ☐ | ☐ | ☐ |
| Optimized WebP | ☐ | ☐ | ☐ | ☐ |
| Responsive (180px / 230px card) | ☐ | ☐ | ☐ | ☐ |
| No layout shift | ☐ | ☐ | ☐ | ☐ |
| Alt text in DOM | ☐ | ☐ | ☐ | ☐ |
| Passed QA | ☐ | ☐ | ☐ | ☐ |

**Status:** Waiting

---

### I02 — Industry 02 (Education)

**Target:** 900 × 675 · 4:3 · ≤ 100 KB · lazy  
**Alt:** Education — teacher, student and digital learning

| Check | Waiting | Received | Integrated | QA |
|-------|:-------:|:--------:|:----------:|:--:|
| File exists at `industries/industry-education.webp` | ☐ | ☐ | ☐ | ☐ |
| Correct dimensions | ☐ | ☐ | ☐ | ☐ |
| Optimized WebP | ☐ | ☐ | ☐ | ☐ |
| Responsive | ☐ | ☐ | ☐ | ☐ |
| No layout shift | ☐ | ☐ | ☐ | ☐ |
| Alt text in DOM | ☐ | ☐ | ☐ | ☐ |
| Passed QA | ☐ | ☐ | ☐ | ☐ |

**Status:** Waiting

---

### I03 — Industry 03 (Finance)

**Target:** 900 × 675 · 4:3 · ≤ 100 KB · lazy  
**Alt:** Finance — secure payments, banking dashboard and analytics

| Check | Waiting | Received | Integrated | QA |
|-------|:-------:|:--------:|:----------:|:--:|
| File exists at `industries/industry-finance.webp` | ☐ | ☐ | ☐ | ☐ |
| Correct dimensions | ☐ | ☐ | ☐ | ☐ |
| Optimized WebP | ☐ | ☐ | ☐ | ☐ |
| Responsive | ☐ | ☐ | ☐ | ☐ |
| No layout shift | ☐ | ☐ | ☐ | ☐ |
| Alt text in DOM | ☐ | ☐ | ☐ | ☐ |
| Passed QA | ☐ | ☐ | ☐ | ☐ |

**Status:** Waiting

---

### I04 — Industry 04 (Travel)

**Target:** 900 × 675 · 4:3 · ≤ 100 KB · lazy  
**Alt:** Travel — hotel, airplane, booking and tourist journey

| Check | Waiting | Received | Integrated | QA |
|-------|:-------:|:--------:|:----------:|:--:|
| File exists at `industries/industry-travel.webp` | ☐ | ☐ | ☐ | ☐ |
| Correct dimensions | ☐ | ☐ | ☐ | ☐ |
| Optimized WebP | ☐ | ☐ | ☐ | ☐ |
| Responsive | ☐ | ☐ | ☐ | ☐ |
| No layout shift | ☐ | ☐ | ☐ | ☐ |
| Alt text in DOM | ☐ | ☐ | ☐ | ☐ |
| Passed QA | ☐ | ☐ | ☐ | ☐ |

**Status:** Waiting

---

### I05 — Industry 05 (Hospitality)

**Target:** 900 × 675 · 4:3 · ≤ 100 KB · lazy  
**Alt:** Hospitality — hotel reception, guest and booking system

| Check | Waiting | Received | Integrated | QA |
|-------|:-------:|:--------:|:----------:|:--:|
| File exists at `industries/industry-hospitality.webp` | ☐ | ☐ | ☐ | ☐ |
| Correct dimensions | ☐ | ☐ | ☐ | ☐ |
| Optimized WebP | ☐ | ☐ | ☐ | ☐ |
| Responsive | ☐ | ☐ | ☐ | ☐ |
| No layout shift | ☐ | ☐ | ☐ | ☐ |
| Alt text in DOM | ☐ | ☐ | ☐ | ☐ |
| Passed QA | ☐ | ☐ | ☐ | ☐ |

**Status:** Waiting

---

### I06 — Industry 06 (Logistics)

**Target:** 900 × 675 · 4:3 · ≤ 100 KB · lazy  
**Alt:** Logistics — truck, warehouse and tracking dashboard

| Check | Waiting | Received | Integrated | QA |
|-------|:-------:|:--------:|:----------:|:--:|
| File exists at `industries/industry-logistics.webp` | ☐ | ☐ | ☐ | ☐ |
| Correct dimensions | ☐ | ☐ | ☐ | ☐ |
| Optimized WebP | ☐ | ☐ | ☐ | ☐ |
| Responsive | ☐ | ☐ | ☐ | ☐ |
| No layout shift | ☐ | ☐ | ☐ | ☐ |
| Alt text in DOM | ☐ | ☐ | ☐ | ☐ |
| Passed QA | ☐ | ☐ | ☐ | ☐ |

**Status:** Waiting

---

### R01 — Partnership

**Target:** 1200 × 900 · 4:3 · ≤ 150 KB · lazy  
**Alt:** Long-term partnership beyond launch — support, growth and continuity

| Check | Waiting | Received | Integrated | QA |
|-------|:-------:|:--------:|:----------:|:--:|
| File exists at `images/why-uandv/partnership.webp` | ☐ | ☐ | ☐ | ☐ |
| Correct dimensions | ☐ | ☐ | ☐ | ☐ |
| Optimized WebP | ☐ | ☐ | ☐ | ☐ |
| Responsive | ☐ | ☐ | ☐ | ☐ |
| No layout shift | ☐ | ☐ | ☐ | ☐ |
| Alt text in DOM | ☐ | ☐ | ☐ | ☐ |
| Passed QA | ☐ | ☐ | ☐ | ☐ |

**Status:** Waiting

---

### C01 — Closing

**Target:** 1920 × 1080 · 16:10 · ≤ 220 KB · lazy · cover backdrop  
**Alt:** Closing — calm confidence in a trusted technology partner

| Check | Waiting | Received | Integrated | QA |
|-------|:-------:|:--------:|:----------:|:--:|
| File exists at `closing/closing.webp` | ☐ | ☐ | ☐ | ☐ |
| Correct dimensions | ☐ | ☐ | ☐ | ☐ |
| Optimized WebP | ☐ | ☐ | ☐ | ☐ |
| Responsive | ☐ | ☐ | ☐ | ☐ |
| No layout shift | ☐ | ☐ | ☐ | ☐ |
| Alt text in DOM | ☐ | ☐ | ☐ | ☐ |
| Passed QA (text contrast over backdrop) | ☐ | ☐ | ☐ | ☐ |

**Status:** Waiting

---

## How to update this tracker

1. **Received** — Drop WebP at path; verify file on disk; check dimensions and file size.
2. **Integrated** — Hard-refresh `/why-uandv`; confirm `200` in Network tab; placeholder surface hidden; image visible.
3. **QA Approved** — Review at 320px, 768px, 1280px; confirm no CLS, correct crop, alt in DOM; mark Passed QA.

No code changes required when filenames match the manifest.

---

## Related documentation

| Document | Purpose |
|----------|---------|
| `docs/IMAGE_ASSET_GUIDE.md` | Folder structure, compression, safe areas |
| `docs/MASTER_VISUAL_ASSETS.md` | Full per-asset specifications |
| `docs/HERO_INTEGRATION.md` | Hero drop-in guide |
| `docs/PRODUCTION_FREEZE_3.2.3.md` | Pre-integration freeze record |

---

*Sprint 3.3 — documentation only. No UI, layout, or component changes.*
