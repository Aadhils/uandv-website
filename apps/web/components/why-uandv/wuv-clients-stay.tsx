'use client';

import { Icon, cn } from '@uandv/ui';

import { Reveal } from '@/components/marketing/reveal';
import { uvContainer } from '@/components/marketing/marketing-design-tokens';
import { whyClientsStay } from '@/lib/why-uandv';
import { wuvAccountability, wuvClientsStay } from '@/lib/why-uandv-content';

const yearIcons = ['Rocket', 'TrendingUp', 'Users'] as const;

const yearDescriptions = [
  whyClientsStay[0]?.description,
  whyClientsStay[2]?.description,
  whyClientsStay[3]?.description,
] as const;

export function WuvClientsStay() {
  return (
    <section
      id="clients-stay"
      aria-label="Why clients stay with U&V"
      className="wuv-clients-stay scroll-mt-20 border-b border-uv-border/60 bg-gradient-to-b from-white to-[#faf9ff]"
    >
      <div className={cn(uvContainer, 'py-8 sm:py-10 lg:py-12')}>
        <Reveal variant="up-blur" className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-uv-brand sm:text-sm">
            {wuvClientsStay.eyebrow}
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-uv-display)] text-2xl font-bold leading-tight text-uv-foreground sm:mt-3 sm:text-3xl">
            {wuvClientsStay.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-uv-foreground-muted sm:mt-4 sm:text-lg">
            {wuvClientsStay.intro}
          </p>
        </Reveal>

        <div className="mx-auto mt-8 max-w-4xl sm:mt-10">
          <div className="grid gap-4 sm:grid-cols-3">
            {wuvClientsStay.yearMarkers.map((year, index) => (
              <Reveal key={year} delayMs={index * 80} variant="up">
                <div className="wuv-clients-stay__year flex flex-col items-center rounded-uv-xl border border-uv-border/70 bg-white p-4 text-center sm:p-5">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-uv-brand-muted text-uv-brand"
                    aria-hidden
                  >
                    <Icon name={yearIcons[index] ?? 'Check'} size="sm" />
                  </span>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-uv-brand">
                    {year}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                    {yearDescriptions[index]}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-10">
            {whyClientsStay.map((item, index) => (
              <Reveal key={item.title} delayMs={index * 60} variant="fade">
                <article className="rounded-uv-xl border border-uv-border/60 bg-white/80 p-4 sm:p-5">
                  <h3 className="font-[family-name:var(--font-uv-display)] text-base font-semibold text-uv-foreground sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal variant="up" delayMs={200} className="mt-8">
            <p className="mx-auto max-w-2xl text-center text-base font-medium leading-relaxed text-uv-foreground sm:text-lg">
              {wuvClientsStay.closing}
            </p>
          </Reveal>

          <div className="mt-10 rounded-uv-2xl border border-uv-border/70 bg-white p-5 sm:p-6">
            <Reveal variant="up-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-uv-brand sm:text-sm">
                {wuvAccountability.eyebrow}
              </p>
              <h3 className="mt-2 font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground sm:text-xl">
                {wuvAccountability.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                {wuvAccountability.intro}
              </p>
            </Reveal>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 sm:gap-4">
              {wuvAccountability.commitments.map((item, index) => (
                <Reveal key={item.title} delayMs={index * 40} variant="fade">
                  <li className="flex gap-3 rounded-uv-lg border border-uv-border/50 bg-[#faf9ff]/50 p-3 sm:p-4">
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-uv-brand text-white"
                      aria-hidden
                    >
                      <Icon name="Check" size="xs" className="h-3 w-3" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-uv-foreground">{item.title}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-uv-foreground-muted sm:text-sm">
                        {item.description}
                      </p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
