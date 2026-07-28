'use client';

import { cn } from '@uandv/ui';

import { Reveal } from '@/components/marketing/reveal';
import { wuvIndustryTaglines, wuvIndustries } from '@/lib/why-uandv-content';
import { wuvIndustryAnimationIds, type WuvIndustryAnimationId } from '@/lib/why-uandv-animations';

import { WuvPremiumIndustryBanner } from './scenes/wuv-premium-banners';
import { WuvCenteredSection } from './wuv-split-section';

const industryLabels: Record<WuvIndustryAnimationId, string> = {
  healthcare: 'Healthcare',
  education: 'Education',
  finance: 'Finance',
  travel: 'Travel',
  hospitality: 'Hospitality',
  logistics: 'Logistics',
};

export function WuvIndustryShowcase() {
  return (
    <WuvCenteredSection
      id="industries"
      ariaLabel="Industries we understand"
      eyebrow={wuvIndustries.eyebrow}
      title={wuvIndustries.title}
      intro={wuvIndustries.paragraphs[0]}
      tone="lavender"
    >
      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {wuvIndustryAnimationIds.map((id, index) => (
          <Reveal key={id} delayMs={index * 100} variant="up" className="wuv-industry-showcase-reveal">
            <article
              data-industry={id}
              className={cn(
                'wuv-industry-showcase-card group flex h-full flex-col overflow-hidden rounded-uv-2xl border border-uv-border/80 bg-white shadow-uv-sm',
              )}
            >
              <WuvPremiumIndustryBanner industry={id} />
              <div className="flex flex-1 flex-col justify-center p-3.5 sm:p-4">
                <h3 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
                  {industryLabels[id]}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                  {wuvIndustryTaglines[id]}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </WuvCenteredSection>
  );
}
