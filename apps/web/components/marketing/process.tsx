import { processSteps } from '@/lib/content';

import { MarketingButtonLink, MarketingPageContainer, MarketingSection } from './marketing-primitives';
import { Reveal } from './reveal';
import { SectionHeading } from './section-heading';

export function Process() {
  return (
    <MarketingSection id="process" tone="subtle" className="marketing-section-ambient border-b-0">
      <MarketingPageContainer>
        <Reveal variant="up-blur">
          <SectionHeading
            eyebrow="Our process"
            title="A clear path from idea to growth."
            description="You always know what happens next — whether we are planning, building, launching, or supporting your business long term."
          />
        </Reveal>

        <ol className="mt-12 grid list-none gap-4 sm:mt-16 sm:grid-cols-2 xl:grid-cols-4">
          {processSteps.map((step, index) => (
            <Reveal key={step.title} delayMs={index * 70} variant="up" className="h-full">
              <li className="marketing-glass marketing-card-lift marketing-card-premium marketing-gradient-border flex h-full min-w-0 flex-col rounded-uv-2xl p-5 sm:p-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-uv-lg border border-uv-brand/30 bg-uv-brand-muted font-[family-name:var(--font-uv-display)] text-sm font-semibold text-uv-brand">
                  {index + 1}
                </span>
                <h3 className="mt-4 font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                  {step.description}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal delayMs={120} variant="fade">
          <div className="mt-8">
            <MarketingButtonLink href="/business-solutions" variant="outline" size="md">
              See how we work with businesses
            </MarketingButtonLink>
          </div>
        </Reveal>
      </MarketingPageContainer>
    </MarketingSection>
  );
}
