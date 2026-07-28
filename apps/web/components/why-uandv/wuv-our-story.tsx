'use client';

import { cn } from '@uandv/ui';

import { Reveal } from '@/components/marketing/reveal';
import { uvContainer } from '@/components/marketing/marketing-design-tokens';
import { wuvOurStory } from '@/lib/why-uandv-content';

export function WuvOurStory() {
  const [opening, founding, trust] = wuvOurStory.paragraphs;

  return (
    <section
      id="our-story"
      aria-label="Our story"
      className="wuv-our-story scroll-mt-20 border-b border-uv-border/60 bg-gradient-to-b from-[#faf9ff] to-white"
    >
      <div className={cn(uvContainer, 'py-8 sm:py-10 lg:py-12')}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12 lg:items-start">
          <div>
            <Reveal variant="up-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-uv-brand sm:text-sm">
                {wuvOurStory.eyebrow}
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-uv-display)] text-2xl font-bold leading-tight text-uv-foreground sm:mt-3 sm:text-3xl">
                {wuvOurStory.title}
              </h2>
            </Reveal>

            <Reveal variant="up" delayMs={60} className="mt-6 sm:mt-8">
              <p className="text-lg font-medium leading-relaxed text-uv-foreground sm:text-xl">
                {opening}
              </p>
            </Reveal>

            <Reveal variant="up" delayMs={120} className="mt-5">
              <p className="text-base leading-[1.75] text-uv-foreground-muted sm:text-lg">
                {founding}
              </p>
            </Reveal>
          </div>

          <div className="flex flex-col gap-6">
            <Reveal variant="scale" delayMs={140}>
              <blockquote className="wuv-our-story__quote relative rounded-uv-2xl border border-uv-brand/15 bg-white px-5 py-6 shadow-uv-sm sm:px-7 sm:py-8">
                <div
                  className="pointer-events-none absolute left-5 top-4 font-[family-name:var(--font-uv-display)] text-5xl leading-none text-uv-brand/20 sm:left-6"
                  aria-hidden
                >
                  &ldquo;
                </div>
                <p className="relative text-base font-medium italic leading-relaxed text-uv-foreground sm:text-lg">
                  {wuvOurStory.pullQuote}
                </p>
              </blockquote>
            </Reveal>

            <Reveal variant="up" delayMs={220}>
              <p className="border-l-2 border-uv-brand/25 pl-5 text-base leading-[1.75] text-uv-foreground-muted sm:pl-6 sm:text-lg">
                {trust}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
