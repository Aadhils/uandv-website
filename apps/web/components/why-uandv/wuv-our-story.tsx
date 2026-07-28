'use client';

import { cn } from '@uandv/ui';

import { Reveal } from '@/components/marketing/reveal';
import { uvContainer } from '@/components/marketing/marketing-design-tokens';
import { wuvOurStory } from '@/lib/why-uandv-content';

export function WuvOurStory() {
  const [lead, ...body] = wuvOurStory.paragraphs;

  return (
    <section
      id="our-story"
      aria-label="Our story"
      className="wuv-our-story scroll-mt-20 border-b border-uv-border/60 bg-gradient-to-b from-[#faf9ff] to-white"
    >
      <div className={cn(uvContainer, 'py-8 sm:py-10 lg:py-12')}>
        <Reveal variant="up-blur" className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-uv-brand sm:text-sm">
            {wuvOurStory.eyebrow}
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-uv-display)] text-2xl font-bold leading-tight text-uv-foreground sm:mt-3 sm:text-3xl">
            {wuvOurStory.title}
          </h2>
        </Reveal>

        <div className="mx-auto mt-8 max-w-2xl sm:mt-10">
          <Reveal variant="up" delayMs={40}>
            <p className="text-lg font-medium leading-relaxed text-uv-foreground sm:text-xl">
              {lead}
            </p>
          </Reveal>

          <div className="mt-6 space-y-5 border-l border-uv-brand/20 pl-5 sm:mt-8 sm:space-y-6 sm:pl-7">
            {body.map((paragraph, index) => (
              <Reveal key={index} delayMs={80 + index * 60} variant="up">
                <p className="text-base leading-[1.75] text-uv-foreground-muted sm:text-lg">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal variant="scale" delayMs={280}>
            <blockquote className="relative mt-8 rounded-uv-2xl border border-uv-brand/15 bg-white/80 px-5 py-6 shadow-uv-sm sm:mt-10 sm:px-7 sm:py-8">
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
        </div>
      </div>
    </section>
  );
}
