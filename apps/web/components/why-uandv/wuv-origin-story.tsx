'use client';

import { cn } from '@uandv/ui';

import { Reveal } from '@/components/marketing/reveal';
import { uvContainer } from '@/components/marketing/marketing-design-tokens';
import { wuvOriginStory } from '@/lib/why-uandv-content';

import { WuvCompareBanner } from './scenes/wuv-banner-visuals';
import { WuvSectionAtmosphere } from './wuv-section-atmosphere';

export function WuvOriginStory() {
  const [problem, solution, measure] = wuvOriginStory.paragraphs;

  return (
    <section
      id="why-we-exist"
      aria-label="Why U&V exists"
      className="wuv-origin-story wuv-cinema-section relative overflow-hidden scroll-mt-20 border-b border-uv-border/40"
    >
      <WuvSectionAtmosphere tone="origin" />
      <div className={cn(uvContainer, 'relative z-[1] py-8 sm:py-10 lg:py-12')}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12 lg:items-center">
          <div>
            <Reveal variant="up-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-uv-brand sm:text-sm">
                {wuvOriginStory.eyebrow}
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-uv-display)] text-2xl font-bold leading-tight text-uv-foreground sm:mt-3 sm:text-3xl lg:text-4xl">
                {wuvOriginStory.title}
              </h2>
            </Reveal>

            <Reveal variant="up" delayMs={60} className="mt-6 sm:mt-8">
              <p className="text-lg font-medium leading-relaxed text-uv-foreground sm:text-xl">
                {problem}
              </p>
            </Reveal>

            <Reveal variant="up" delayMs={120} className="mt-5">
              <p className="text-base leading-[1.75] text-uv-foreground-muted sm:text-lg">
                {solution}
              </p>
            </Reveal>

            <Reveal variant="up" delayMs={180} className="mt-5">
              <p className="border-l-2 border-uv-brand/25 pl-5 text-base leading-[1.75] text-uv-foreground-muted sm:pl-6 sm:text-lg">
                {measure}
              </p>
            </Reveal>
          </div>

          <Reveal variant="scale" delayMs={100} className="min-w-0">
            <blockquote className="wuv-origin-story__quote relative mb-6 rounded-uv-2xl border border-uv-brand/15 bg-white px-5 py-6 shadow-uv-sm sm:px-7 sm:py-8">
              <div
                className="pointer-events-none absolute left-5 top-4 font-[family-name:var(--font-uv-display)] text-5xl leading-none text-uv-brand/20 sm:left-6"
                aria-hidden
              >
                &ldquo;
              </div>
              <p className="relative text-base font-medium italic leading-relaxed text-uv-foreground sm:text-lg">
                {wuvOriginStory.pullQuote}
              </p>
            </blockquote>
            <WuvCompareBanner className="min-h-[200px] sm:min-h-[240px]" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
