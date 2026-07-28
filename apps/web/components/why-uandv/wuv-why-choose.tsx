'use client';

import { Icon, cn, type IconName } from '@uandv/ui';

import { Reveal } from '@/components/marketing/reveal';
import { uvContainer } from '@/components/marketing/marketing-design-tokens';
import { whyCorePrinciples } from '@/lib/why-uandv';
import { wuvWhyChoose } from '@/lib/why-uandv-content';

const pillarIcons: IconName[] = ['Eye', 'ClipboardList', 'Handshake', 'HeartPulse'];

export function WuvWhyChoose() {
  return (
    <section
      id="why-choose"
      aria-label="Why businesses choose U&V"
      className="wuv-why-choose scroll-mt-20 border-b border-uv-border/60 bg-white"
    >
      <div className={cn(uvContainer, 'py-8 sm:py-10 lg:py-12')}>
        <Reveal variant="up-blur" className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-uv-brand sm:text-sm">
            {wuvWhyChoose.eyebrow}
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-uv-display)] text-2xl font-bold leading-tight text-uv-foreground sm:mt-3 sm:text-3xl">
            {wuvWhyChoose.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-uv-foreground-muted sm:mt-4 sm:text-lg">
            {wuvWhyChoose.intro}
          </p>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-10 lg:gap-5">
          {wuvWhyChoose.pillars.map((pillar, index) => (
            <Reveal key={pillar.id} delayMs={index * 70} variant="up">
              <article className="wuv-why-choose__pillar flex h-full gap-4 rounded-uv-xl border border-uv-border/70 bg-gradient-to-br from-white to-[#faf9ff] p-4 sm:p-5">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-uv-brand/15 bg-white text-uv-brand shadow-sm"
                  aria-hidden
                >
                  <Icon name={pillarIcons[index] ?? 'Check'} size="sm" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-[family-name:var(--font-uv-display)] text-base font-semibold text-uv-foreground sm:text-lg">
                    {pillar.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                    {pillar.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 lg:mt-12">
          <Reveal variant="up-blur" className="mx-auto max-w-2xl text-center">
            <p className="text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
              {wuvWhyChoose.principlesIntro}
            </p>
          </Reveal>

          <div className="mt-6 space-y-0 divide-y divide-uv-border/60 rounded-uv-2xl border border-uv-border/70 bg-white">
            {whyCorePrinciples.map((principle, index) => (
              <Reveal key={principle.title} delayMs={index * 50} variant="fade">
                <div className="flex gap-4 px-4 py-4 sm:gap-5 sm:px-6 sm:py-5">
                  <span
                    className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-uv-brand-muted text-uv-brand"
                    aria-hidden
                  >
                    <Icon name={principle.icon} size="sm" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-[family-name:var(--font-uv-display)] text-base font-semibold text-uv-foreground sm:text-lg">
                      {principle.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delayMs={120} variant="fade">
            <p className="mx-auto mt-5 max-w-xl text-center text-sm font-medium text-uv-foreground-muted sm:mt-6 sm:text-base">
              {wuvWhyChoose.principlesOutro}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
