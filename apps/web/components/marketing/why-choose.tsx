import { whyChoose } from '@/lib/content';
import { homepageWhyChooseCount } from '@/lib/homepage-featured';

import { MarketingButtonLink, MarketingPageContainer, MarketingSection } from './marketing-primitives';
import { Reveal } from './reveal';
import { SectionHeading } from './section-heading';

export function WhyChoose() {
  const reasons = whyChoose.slice(0, homepageWhyChooseCount);

  return (
    <MarketingSection id="why" tone="subtle" className="marketing-section-ambient">
      <MarketingPageContainer>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-14">
          <Reveal variant="up-blur">
            <SectionHeading
              eyebrow="Why choose U&V"
              title="A business growth partner — not just a project vendor."
              description="We coordinate strategy, branding, technology, and growth under one roof — so you have clarity, capability, and a partner who stays after launch."
            />
            <div className="mt-8">
              <MarketingButtonLink href="/why-uandv" variant="outline" size="md">
                Learn why U&V
              </MarketingButtonLink>
            </div>
          </Reveal>

          <div className="min-w-0 space-y-4">
            {reasons.map((reason, index) => (
              <Reveal key={reason.title} delayMs={index * 80} variant="scale">
                <article className="marketing-glass marketing-card-lift marketing-card-premium marketing-gradient-border rounded-uv-2xl p-5 sm:p-6">
                  <span className="font-[family-name:var(--font-uv-display)] text-sm font-semibold text-uv-brand">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-3 font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
                    {reason.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                    {reason.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </MarketingPageContainer>
    </MarketingSection>
  );
}
