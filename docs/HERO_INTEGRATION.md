# U&V v3.2 — Hero Asset Integration Guide

**Page:** Why U&V (`/why-uandv`)  
**Asset:** `hero.webp`  
**Status:** Ready for drop-in — no code changes required  
**Last verified:** 27 July 2026

---

## Quick start

1. Export final artwork as WebP.
2. Copy file to the exact path below.
3. Hard-refresh `http://localhost:3000/why-uandv` (or production URL).
4. Confirm placeholder surface fades out and image renders.

**No rebuild required** for static files in `public/`. A dev-server refresh is sufficient locally.

---

## 1. Exact asset path

| Item | Value |
|------|-------|
| **Filesystem** | `apps/web/public/images/why-uandv/hero.webp` |
| **Public URL** | `/images/why-uandv/hero.webp` |
| **Manifest key** | `hero` in `apps/web/lib/why-uandv-visual-assets.ts` |
| **Component** | `HeroTableVisual` → `WhyUandVVisualStage` (`preset="hero"`) |

The drop folder already exists (`.gitkeep` present). Filename must be exactly `hero.webp`.

---

## 2. Recommended resolution

| Field | Value |
|-------|-------|
| **Width × height** | **1600 × 1000 px** |
| **Aspect ratio** | **16:10** |
| **Color space** | sRGB |
| **Format** | WebP (lossy, optimized) |

Intrinsic size constant in manifest: `WUV_HERO_INTRINSIC_SIZE` = 1600 × 1000.

---

## 3. Recommended file size

| Target | Notes |
|--------|-------|
| **≤ 180 KB** | Hero is the LCP candidate — balance quality and weight |
| **Ideal range** | 120–160 KB after optimization |

---

## 4. Compression recommendation

| Setting | Recommendation |
|---------|----------------|
| **Encoder** | `cwebp -q 84 -m 6` or Squoosh / ImageOptim equivalent |
| **Quality** | WebP **82–88** — verify faces and UI at 200px and 520px display heights |
| **Metadata** | Strip EXIF |
| **Alpha** | Not required (opaque hero) |

Re-compress if Lighthouse flags LCP image weight.

---

## 5. Object-position recommendation

| Item | Value |
|------|-------|
| **Default** | `center center` |
| **Manifest constant** | `WUV_HERO_OBJECT_POSITION` in `why-uandv-visual-assets.ts` |
| **Object fit** | `cover` |
| **Applied via** | Inline `style={{ objectPosition }}` on `next/image` |

**Tuning without layout changes:** If faces or focal content are cropped after drop-in, adjust only `WUV_HERO_OBJECT_POSITION` in the manifest (e.g. `center 35%`, `center 30%`). That requires a code deploy; artwork should be composed for `center center` first.

---

## 6. Mobile safe area

| Item | Value |
|------|-------|
| **Stage height** | **200px** (default mobile) → **240px** (≥640px) |
| **Stage width** | Full column width (~100vw minus padding) |
| **Crop mode** | `object-fit: cover` — top/bottom cropped aggressively |
| **Safe zone** | Keep subjects, faces, and key UI in **center 70% width × center 80% height** |
| **Avoid** | Critical detail in top 15% or bottom 20% of the artwork |

Mobile `sizes` hint: `100vw` (below 640px breakpoint).

---

## 7. Desktop safe area

| Item | Value |
|------|-------|
| **Stage height** | **520px** (max **560px**) at ≥1024px |
| **Column width** | ~52% of hero grid (`wuv-hero-compact-visual`) |
| **Crop mode** | `object-fit: cover` |
| **Safe zone** | Center 70% × 80% — faces and collaboration scene should read clearly |
| **Desktop `sizes` hint** | `52vw` |

Hero sits in a glass-framed stage (`.wuv-visual-stage--hero`) with fixed CSS height — image fills the frame without changing layout.

---

## Technical verification (pre-drop)

All items verified against current codebase — **no changes made**.

| Check | Status | Detail |
|-------|--------|--------|
| **Next/Image configuration** | ✅ Ready | `next/image` with `fill`; local static path from `public/` |
| **Image optimizer formats** | ✅ Ready | `formats: ['image/avif', 'image/webp']` in `next.config.ts` |
| **Responsive `sizes`** | ✅ Ready | `(max-width: 640px) 100vw, (max-width: 1024px) 92vw, 52vw` |
| **Object-position support** | ✅ Ready | `WUV_HERO_OBJECT_POSITION` → inline style |
| **Priority loading (hero)** | ✅ Ready | `priority={true}`, `loading="eager"` |
| **Lazy loading (other assets)** | ✅ Ready | Journey/industry/section visuals: `priority={false}`, `loading="lazy"` |
| **Blur placeholder (`blurDataURL`)** | ⚪ N/A | Not used — **CSS placeholder surface** holds space until load (see below) |
| **WebP compatibility** | ✅ Ready | Static `.webp` served from `public/`; no import pipeline needed |
| **Mobile crop behaviour** | ✅ Ready | Fixed 200px height + `object-cover` |
| **Desktop crop behaviour** | ✅ Ready | Fixed 520px height + `object-cover` |
| **No layout shift (CLS)** | ✅ Ready | Fixed stage heights + `contain: layout` on `.wuv-visual-stage--hero` |
| **Hydration** | ✅ Ready | Client load state (`onLoad` → fade in); no SSR/client src mismatch for static path |
| **Build errors** | ✅ Pass | See verification run below |

### Placeholder behaviour (instead of blur)

Until `hero.webp` loads (or if missing), the stage shows:

- Fixed-height CSS frame (no dimension change on load)
- Soft white / UV-navy gradient surface (`.wuv-visual-stage__surface`)
- On successful load: surface fades out (`opacity 0.4s`), image fades in

This prevents CLS without a `blurDataURL`. **No additional placeholder file is required.**

### Alt text (fixed in manifest)

```
Business owner and U&V team planning together with digital business tools
```

Do not embed text in the image; hero copy remains in HTML.

---

## Post-drop checklist

- [ ] File at `apps/web/public/images/why-uandv/hero.webp`
- [ ] Network tab: `200` for `/images/why-uandv/hero.webp` (no 404)
- [ ] `data-wuv-visual="loaded"` on hero stage element
- [ ] Placeholder surface hidden; image visible
- [ ] Mobile (320px): focal content not awkwardly cropped
- [ ] Tablet (768px): stage scales to 240px height
- [ ] Desktop (1280px): stage at 520px; ~52vw image width
- [ ] No horizontal overflow
- [ ] No console errors or hydration warnings
- [ ] Lighthouse LCP ≤ 2.5s target (optional)

---

## Focal-point tuning (only if needed after visual review)

If crop is wrong after drop-in, **one manifest-only change** (no layout/CSS):

```ts
// apps/web/lib/why-uandv-visual-assets.ts
export const WUV_HERO_OBJECT_POSITION = 'center center'; // e.g. 'center 35%'
```

Redeploy after change. Prefer fixing composition in the asset first.

---

## Related docs

| Document | Purpose |
|----------|---------|
| `docs/MASTER_VISUAL_ASSETS.md` | Full 16-asset specification |
| `docs/03-image-assets.md` | Technical asset drop guide |
| `apps/web/lib/why-uandv-visual-assets.ts` | Runtime manifest |

---

*Documentation only. No layout, typography, spacing, component, or hero content changes were made.*
