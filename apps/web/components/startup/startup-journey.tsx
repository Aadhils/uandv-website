'use client';

import { Reveal } from '@/components/marketing/reveal';
import { SectionHeading } from '@/components/marketing/section-heading';
import {
  MarketingCard,
  MarketingCardTitle,
  MarketingPageContainer,
  MarketingSection,
} from '@/components/marketing/marketing-primitives';
import { startupJourneySteps } from '@/lib/startup-journey';

export function StartupJourney() {
  return (
    <MarketingSection
      id="startup-journey"
      tone="subtle"
      aria-label="Your startup journey with U&V"
    >
      <MarketingPageContainer>
        <Reveal>
          <SectionHeading
            eyebrow="Your path forward"
            title="Your Startup Journey"
            description="From idea validation to long-term growth — a practical sequence for founders, presented as clear steps on any screen size."
          />
        </Reveal>

        <ol className="mx-auto mt-12 max-w-3xl space-y-4 sm:mt-16 lg:max-w-none lg:grid lg:grid-cols-2 lg:gap-5 lg:space-y-0 xl:grid-cols-3">
          {startupJourneySteps.map((step, index) => (
            <Reveal key={step.title} delayMs={index * 35}>
              <li className="relative h-full">
                <MarketingCard className="flex h-full flex-col sm:p-6">
                  <div className="flex items-start gap-4">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-uv-border bg-uv-brand-muted text-sm font-semibold text-uv-brand"
                      aria-hidden
                    >
                      {index + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <MarketingCardTitle className="text-base sm:text-lg">
                        {step.title}
                      </MarketingCardTitle>
                      <p className="mt-2 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </MarketingCard>
                {index < startupJourneySteps.length - 1 ? (
                  <p
                    className="pointer-events-none py-2 text-center text-uv-brand/40 lg:hidden"
                    aria-hidden
                  >
                    ↓
                  </p>
                ) : null}
              </li>
            </Reveal>
          ))}
        </ol>
      </MarketingPageContainer>
    </MarketingSection>
  );
}
