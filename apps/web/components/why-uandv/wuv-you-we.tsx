'use client';

import { Icon, cn } from '@uandv/ui';

import { Reveal } from '@/components/marketing/reveal';
import { uvContainer } from '@/components/marketing/marketing-design-tokens';
import { wuvYouWe } from '@/lib/why-uandv-content';

import { WuvYouWeArt } from './scenes/wuv-you-we-art';
import { WuvSectionAtmosphere } from './wuv-section-atmosphere';

export function WuvYouWe() {
  return (
    <section
      id="you-and-we"
      aria-label="You and we"
      className="wuv-you-we wuv-cinema-section relative overflow-hidden scroll-mt-20 border-b border-uv-border/40"
    >
      <WuvSectionAtmosphere tone="you-we" />
      <div className={cn(uvContainer, 'relative z-[1] py-8 sm:py-10 lg:py-12')}>
        <Reveal variant="up-blur" className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-uv-brand sm:text-sm">
            {wuvYouWe.eyebrow}
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-uv-display)] text-2xl font-bold leading-tight text-uv-foreground sm:mt-3 sm:text-3xl">
            {wuvYouWe.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-uv-foreground-muted sm:mt-4 sm:text-lg">
            {wuvYouWe.intro}
          </p>
        </Reveal>

        <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-10 lg:items-center">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-1">
            <Reveal variant="up" delayMs={60}>
              <div className="wuv-you-we__panel rounded-uv-xl border border-[#1E3A8A]/15 bg-gradient-to-br from-[#f0f4ff] to-white p-5 sm:p-6">
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[#1E3A8A] sm:text-base">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1E3A8A]/10">
                    <Icon name="User" size="sm" />
                  </span>
                  {wuvYouWe.youTitle}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {wuvYouWe.youItems.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-uv-foreground sm:text-base">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#1E3A8A]" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal variant="up" delayMs={120}>
              <div className="wuv-you-we__panel rounded-uv-xl border border-uv-brand/20 bg-gradient-to-br from-[#faf8ff] to-white p-5 sm:p-6">
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-uv-brand sm:text-base">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-uv-brand/10">
                    <Icon name="Users" size="sm" />
                  </span>
                  {wuvYouWe.weTitle}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {wuvYouWe.weItems.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-uv-foreground sm:text-base">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-uv-brand" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal variant="fade" delayMs={180} className="sm:col-span-2 lg:col-span-1">
              <p className="text-center font-[family-name:var(--font-uv-display)] text-xl font-bold text-uv-brand sm:text-2xl">
                {wuvYouWe.equation}
              </p>
            </Reveal>
          </div>

          <Reveal variant="scale" delayMs={80} className="min-w-0">
            <WuvYouWeArt className="min-h-[220px] sm:min-h-[260px]" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
