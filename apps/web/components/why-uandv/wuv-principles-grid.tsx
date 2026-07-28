'use client';

import { Icon, cn } from '@uandv/ui';

import { Reveal } from '@/components/marketing/reveal';
import { whyCorePrinciples } from '@/lib/why-uandv';
import { wuvPrinciples } from '@/lib/why-uandv-content';

import { WuvPrinciplesBanner } from './scenes/wuv-banner-visuals';
import { WuvCenteredSection } from './wuv-split-section';

const principleBanners = [
  {
    row: 0 as const,
    titles: [whyCorePrinciples[0], whyCorePrinciples[1]] as const,
    visualPosition: 'left' as const,
  },
  {
    row: 1 as const,
    titles: [whyCorePrinciples[2], whyCorePrinciples[3]] as const,
    visualPosition: 'right' as const,
  },
  {
    row: 2 as const,
    titles: [whyCorePrinciples[4], whyCorePrinciples[5]] as const,
    visualPosition: 'left' as const,
  },
] as const;

export function WuvPrinciplesGrid() {
  return (
    <WuvCenteredSection
      id="principles"
      ariaLabel="What we stand behind"
      eyebrow={wuvPrinciples.eyebrow}
      title={wuvPrinciples.title}
      intro={wuvPrinciples.intro}
      tone="default"
    >
      <div className="space-y-3">
        {principleBanners.map(({ row, titles, visualPosition }, index) => (
          <Reveal key={row} delayMs={index * 80} variant="scale">
            <article className="grid overflow-hidden rounded-uv-2xl border border-uv-border/80 bg-white shadow-uv-sm transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-uv-brand/20 hover:shadow-[0_12px_32px_rgb(124_58_237_/_0.1)] lg:grid-cols-2 lg:items-stretch">
              {visualPosition === 'left' ? (
                <>
                  <div className="min-h-[130px] border-b border-uv-border/40 lg:min-h-[150px] lg:border-b-0 lg:border-r">
                    <WuvPrinciplesBanner row={row} />
                  </div>
                  <PrincipleBannerCopy titles={titles} startIndex={row * 2} />
                </>
              ) : (
                <>
                  <PrincipleBannerCopy titles={titles} startIndex={row * 2} className="order-2 lg:order-1" />
                  <div className="order-1 min-h-[130px] border-b border-uv-border/40 lg:order-2 lg:min-h-[150px] lg:border-b-0 lg:border-l">
                    <WuvPrinciplesBanner row={row} />
                  </div>
                </>
              )}
            </article>
          </Reveal>
        ))}
      </div>
      <Reveal delayMs={120} variant="fade">
        <p className="mx-auto mt-5 max-w-2xl text-center text-sm font-medium text-uv-foreground-muted sm:mt-6 sm:text-base">
          {wuvPrinciples.outro}
        </p>
      </Reveal>
    </WuvCenteredSection>
  );
}

function PrincipleBannerCopy({
  titles,
  startIndex,
  className,
}: {
  titles: readonly [(typeof whyCorePrinciples)[number], (typeof whyCorePrinciples)[number]];
  startIndex: number;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col justify-center p-4 sm:p-5', className)}>
      {titles.map((principle, i) => (
        <div
          key={principle.title}
          className={cn(
            'wuv-principle-item group/principle transition-transform duration-500 ease-out hover:-translate-y-0.5',
            i > 0 && 'mt-3 border-t border-uv-border/50 pt-3',
          )}
          style={{ animationDelay: `${(startIndex + i) * 90}ms` }}
        >
          <div className="flex gap-3">
            <span className="wuv-principle-icon mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-uv-brand/15 bg-gradient-to-br from-[#faf9ff] to-white text-uv-brand shadow-sm transition-shadow duration-500 ease-out group-hover/principle:shadow-[0_0_20px_rgb(124_58_237_/_0.18)]">
              <Icon name={principle.icon} className="h-4 w-4" />
            </span>
            <div>
              <h3 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground sm:text-xl">
                {principle.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                {principle.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
