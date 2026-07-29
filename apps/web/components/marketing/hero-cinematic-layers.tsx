'use client';

/**
 * Cinematic hero atmosphere — CSS-only motion, no extra libraries.
 * Background video is handled by HomeHeroBackgroundVideo in the parent.
 */
export function HeroCinematicLayers() {
  return (
    <>
      <div className="marketing-hero-gradient-shift absolute inset-0" aria-hidden />
      <div className="marketing-hero-light-sweep absolute inset-0 overflow-hidden" aria-hidden>
        <div className="marketing-hero-light-beam" />
      </div>
      <div className="marketing-hero-particles absolute inset-0" aria-hidden>
        {Array.from({ length: 12 }, (_, index) => (
          <span key={index} className="marketing-particle" />
        ))}
      </div>
      <div
        className="marketing-hero-vignette pointer-events-none absolute inset-0"
        aria-hidden
      />
    </>
  );
}
