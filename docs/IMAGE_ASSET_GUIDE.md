# U&V v3.2 — Image Asset Guide

**Sprint:** 3.2.1 — Hero Integration Infrastructure  
**Page:** Why U&V (`/why-uandv`)  
**Manifest:** `apps/web/lib/why-uandv-visual-assets.ts`  
**Last updated:** 27 July 2026

---

## Folder structure

All Why U&V WebP assets live under `apps/web/public/images/why-uandv/`.

```
public/images/why-uandv/
├── hero.webp                    ← Hero (root — drop here first)
├── partnership.webp             ← Why Clients Stay (root)
├── journey/
│   ├── journey-discover.webp
│   ├── journey-strategy.webp
│   ├── journey-build.webp
│   ├── journey-launch.webp
│   └── journey-grow.webp
├── principles/
│   └── principles.webp
├── workflow/
│   └── workflow.webp
├── industries/
│   ├── industry-healthcare.webp
│   ├── industry-education.webp
│   ├── industry-finance.webp
│   ├── industry-travel.webp
│   ├── industry-hospitality.webp
│   └── industry-logistics.webp
└── closing/
    └── closing.webp
```

**Public URL pattern:** `/images/why-uandv/{path}`  
Example: `/images/why-uandv/hero.webp`, `/images/why-uandv/journey/journey-discover.webp`

---

## Naming conventions

| Rule | Example |
|------|---------|
| Format | `.webp` only |
| Case | Lowercase, hyphen-separated |
| Hero | `hero.webp` at folder root |
| Journey | `journey/journey-{stage}.webp` where stage = discover, strategy, build, launch, grow |
| Section banners | `{folder}/{name}.webp` — e.g. `principles/principles.webp` |
| Industries | `industries/industry-{slug}.webp` |
| Partnership | `partnership.webp` at root (no subfolder) |
| Closing | `closing/closing.webp` |
| Do not rename | Filenames must match manifest exactly |

---

## Recommended resolutions

| Asset | Path | Resolution | Aspect ratio |
|-------|------|------------|--------------|
| Hero | `hero.webp` | 1600 × 1000 | 16:10 |
| Journey (×5) | `journey/*.webp` | 800 × 600 each | 4:3 |
| Principles | `principles/principles.webp` | 1200 × 900 | 4:3 |
| Workflow | `workflow/workflow.webp` | 1400 × 875 | 16:10 |
| Partnership | `partnership.webp` | 1200 × 900 | 4:3 |
| Industries (×6) | `industries/industry-*.webp` | 900 × 675 each | 4:3 |
| Closing | `closing/closing.webp` | 1920 × 1080 | 16:10 |

**Color space:** sRGB

---

## Recommended file sizes

| Group | Target size | Notes |
|-------|-------------|-------|
| Hero | ≤ 180 KB | LCP candidate |
| Journey (each) | ≤ 80 KB | Small display slots |
| Principles / Workflow / Partnership | ≤ 150 KB each | Section banners |
| Industries (each) | ≤ 100 KB | Compact card visuals |
| Closing | ≤ 220 KB | Full-bleed backdrop (~42% opacity) |

---

## Compression recommendations

| Setting | Value |
|---------|-------|
| Format | WebP lossy |
| Quality | 80–88 (hero: 84–88) |
| Encoder | `cwebp -m 6` or Squoosh / ImageOptim |
| Metadata | Strip EXIF |
| Alpha | Not required (opaque assets) |

Re-compress if Lighthouse flags image weight on hero or closing.

---

## Safe area guidelines

### Hero (`hero.webp`)

| Viewport | Stage height | Crop | Safe zone |
|----------|--------------|------|-----------|
| Mobile | 200px | `object-cover` | Center 70% × 80%; avoid top 15% / bottom 20% |
| Tablet (≥640px) | 240px | `object-cover` | Same — keep faces central |
| Desktop (≥1024px) | 520px (max 560px) | `object-cover` | Center 70% × 80% at ~52vw width |

**Object position default:** `center center` (`WUV_HERO_OBJECT_POSITION`)

### Journey (`journey/*.webp`)

- `object-fit: contain` in 7.5rem–10.5rem tall slots
- Keep subject centered with ~8% edge padding
- Simple compositions; avoid fine detail

### Section banners (principles, workflow, partnership)

- `object-fit: contain`
- Center 80% safe zone; supports adjacent card/step content

### Industries (`industries/*.webp`)

- Card heights: 180px mobile / 230px desktop
- Center 90%; hover scales to 103% — avoid edge-critical detail

### Closing (`closing/closing.webp`)

- `object-fit: cover` at full width; surface at 42% opacity
- Keep busy detail out of center 50% (copy overlay)

---

## Image placeholders (no layout shift)

Until WebP files are delivered, `WhyUandVVisualStage` shows **CSS placeholders**:

- Fixed stage heights per preset (hero, journey, industry, etc.)
- `contain: layout` on hero/journey stages
- Soft white + UV/navy gradient surface (`.wuv-visual-stage__surface`)
- On load: surface fades out, image fades in (0.35–0.4s)

**No `blurDataURL` required.** Dropping a correctly named file replaces the placeholder automatically — no code changes.

---

## Loading behaviour

| Asset | Priority | Loading |
|-------|----------|---------|
| `hero.webp` | **Yes** (`priority={true}`) | Eager — LCP candidate |
| All other visuals | No | Lazy (`loading="lazy"`) |

### Responsive `sizes` (Next/Image)

| Visual | `sizes` attribute |
|--------|-------------------|
| Hero | `(max-width: 640px) 100vw, (max-width: 1024px) 92vw, 52vw` |
| Journey | `(max-width: 1024px) 100vw, 320px` |
| Section banners | `(max-width: 1024px) 100vw, 45vw` |
| Industries | `(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw` |
| Closing | `100vw` |

---

## Next/Image configuration

Verified in `apps/web/next.config.ts`:

```ts
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 60 * 60 * 24 * 30,
}
```

Static files in `public/` are served directly at `/images/...` — no import or remote pattern needed for Why U&V assets.

---

## Path verification map

| Manifest key | File path | Public URL |
|--------------|-----------|------------|
| `hero` | `hero.webp` | `/images/why-uandv/hero.webp` |
| `journeyDiscover` | `journey/journey-discover.webp` | `/images/why-uandv/journey/journey-discover.webp` |
| `journeyStrategy` | `journey/journey-strategy.webp` | `/images/why-uandv/journey/journey-strategy.webp` |
| `journeyBuild` | `journey/journey-build.webp` | `/images/why-uandv/journey/journey-build.webp` |
| `journeyLaunch` | `journey/journey-launch.webp` | `/images/why-uandv/journey/journey-launch.webp` |
| `journeyGrow` | `journey/journey-grow.webp` | `/images/why-uandv/journey/journey-grow.webp` |
| `principles` | `principles/principles.webp` | `/images/why-uandv/principles/principles.webp` |
| `workflow` | `workflow/workflow.webp` | `/images/why-uandv/workflow/workflow.webp` |
| `partnership` | `partnership.webp` | `/images/why-uandv/partnership.webp` |
| `closing` | `closing/closing.webp` | `/images/why-uandv/closing/closing.webp` |
| `industryHealthcare` | `industries/industry-healthcare.webp` | `/images/why-uandv/industries/industry-healthcare.webp` |
| `industryEducation` | `industries/industry-education.webp` | `/images/why-uandv/industries/industry-education.webp` |
| `industryFinance` | `industries/industry-finance.webp` | `/images/why-uandv/industries/industry-finance.webp` |
| `industryTravel` | `industries/industry-travel.webp` | `/images/why-uandv/industries/industry-travel.webp` |
| `industryHospitality` | `industries/industry-hospitality.webp` | `/images/why-uandv/industries/industry-hospitality.webp` |
| `industryLogistics` | `industries/industry-logistics.webp` | `/images/why-uandv/industries/industry-logistics.webp` |

---

## Integration order

1. `hero.webp` (root)
2. `journey/*.webp` (×5)
3. `principles/principles.webp`
4. `workflow/workflow.webp`
5. `industries/*.webp` (×6)
6. `partnership.webp` (root)
7. `closing/closing.webp`
8. Final responsive + animation review

---

## Drop-in checklist (hero first)

- [ ] Copy `hero.webp` to `apps/web/public/images/why-uandv/hero.webp`
- [ ] Hard-refresh `/why-uandv`
- [ ] Network: `200` for `/images/why-uandv/hero.webp`
- [ ] Placeholder surface fades; image visible
- [ ] No CLS at 320px / 768px / 1280px
- [ ] No console or hydration errors

See also: `docs/HERO_INTEGRATION.md`, `docs/MASTER_VISUAL_ASSETS.md`

---

*Infrastructure sprint — no layout, typography, spacing, color, animation, or component changes.*
