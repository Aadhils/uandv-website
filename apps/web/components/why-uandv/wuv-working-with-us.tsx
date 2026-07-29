'use client';

import { cn } from '@uandv/ui';

import { Reveal } from '@/components/marketing/reveal';
import { uvContainer } from '@/components/marketing/marketing-design-tokens';
import { wuvWorkingWithUs } from '@/lib/why-uandv-content';

import { WuvPrincipleMicroScene } from './wuv-principle-micro-scenes';
import { WuvSectionAtmosphere } from './wuv-section-atmosphere';

function PrincipleRow({
  index,
  title,
  description,
  id,
}: {
  index: number;
  title: string;
  description: string;
  id: string;
}) {
  const reversed = index % 2 === 1;

  return (
    <div
      className={cn(
        'wuv-working-with-us__row grid items-center gap-4 sm:gap-5 lg:grid-cols-2 lg:gap-8',
        reversed && 'lg:[&>*:first-child]:order-2',
      )}
    >
      <div className="wuv-working-with-us__visual flex items-center justify-center overflow-hidden rounded-uv-xl border border-uv-border/60 bg-gradient-to-br from-white to-[#faf9ff] p-3 sm:p-4">
        <WuvPrincipleMicroScene id={id as (typeof wuvWorkingWithUs.principles)[number]['id']} />
      </div>

      <div className={cn('min-w-0', reversed ? 'lg:text-right' : '')}>
        <span className="text-xs font-bold uppercase tracking-[0.14em] text-uv-brand/60">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="mt-1 font-[family-name:var(--font-uv-display)] text-xl font-bold text-uv-foreground sm:text-2xl">
          {title}
        </h3>
        <p className="mt-2 text-base leading-relaxed text-uv-foreground-muted sm:mt-3">{description}</p>
      </div>
    </div>
  );
}

export function WuvWorkingWithUs() {
  return (
    <section
      id="working-with-us"
      aria-label="What working with U&V feels like"
      className="wuv-working-with-us wuv-cinema-section relative overflow-hidden scroll-mt-20 border-b border-uv-border/40"
    >
      <WuvSectionAtmosphere tone="working" />
      <div className={cn(uvContainer, 'relative z-[1] py-6 sm:py-8 lg:py-10')}>
        <Reveal variant="up-blur" className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-uv-brand sm:text-sm">
            {wuvWorkingWithUs.eyebrow}
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-uv-display)] text-2xl font-bold leading-tight text-uv-foreground sm:mt-3 sm:text-3xl">
            {wuvWorkingWithUs.title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-uv-foreground-muted sm:mt-4 sm:text-lg">
            {wuvWorkingWithUs.intro}
          </p>
        </Reveal>

        <div className="wuv-working-with-us__manifesto relative mt-8 space-y-6 sm:mt-10 sm:space-y-8">
          <div className="wuv-working-with-us__guide hidden sm:block" aria-hidden>
            <div className="wuv-working-with-us__guide-fill" />
          </div>

          {wuvWorkingWithUs.principles.map((principle, index) => (
            <Reveal key={principle.id} variant="up" delayMs={index * 30}>
              <PrincipleRow
                index={index}
                id={principle.id}
                title={principle.title}
                description={principle.description}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
