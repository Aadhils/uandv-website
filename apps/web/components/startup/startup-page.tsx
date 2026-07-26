import Link from 'next/link';
import type { ReactNode } from 'react';

import { Icon, cn } from '@uandv/ui';

import {
  MarketingContentPage,
  MarketingPageHero,
  MarketingPageHeroInner,
} from '@/components/marketing/marketing-page-hero';
import {
  MarketingButtonLink,
  MarketingCardTitle,
  MarketingCtaPanel,
  MarketingEyebrow,
  MarketingHeroActions,
  MarketingHeroTitle,
  MarketingLead,
  MarketingPageContainer,
  MarketingSection,
  MarketingSectionTitle,
} from '@/components/marketing/marketing-primitives';
import { Reveal } from '@/components/marketing/reveal';
import { SectionHeading } from '@/components/marketing/section-heading';
import { Breadcrumbs } from '@/components/services/breadcrumbs';
import { ServiceIllustration } from '@/components/services/service-illustration';
import { StartupJourney } from '@/components/startup/startup-journey';
import {
  startupFaqs,
  startupHonestPositioning,
  startupPositioning,
  startupProcess,
  startupRelatedSlugs,
  startupSupportAreas,
  startupWhyUandv,
} from '@/lib/startup';
import { getServiceBySlug } from '@/lib/services';
import { contactInquiryHref, siteConfig } from '@/lib/site';

function StoryLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-uv-brand">
      {children}
    </p>
  );
}

export function StartupPage() {
  const related = startupRelatedSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((item): item is NonNullable<ReturnType<typeof getServiceBySlug>> =>
      Boolean(item),
    );

  return (
    <MarketingContentPage>
      <MarketingPageHero>
        <MarketingPageHeroInner>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Startup' },
            ]}
          />

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-3xl">
              <MarketingEyebrow>{startupPositioning.eyebrow}</MarketingEyebrow>
              <MarketingHeroTitle className="mt-4">
                {startupPositioning.headline}
              </MarketingHeroTitle>
              <MarketingLead className="mt-6">
                {startupPositioning.subheadline}
              </MarketingLead>
              <p className="mt-4 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                {startupPositioning.heroSummary}
              </p>
              <p className="mt-4 text-sm font-medium leading-relaxed text-uv-foreground-muted sm:text-base">
                {startupPositioning.trustLine}
              </p>
              <MarketingHeroActions>
                <MarketingButtonLink href={contactInquiryHref}>
                  Book a Free Startup Consultation
                </MarketingButtonLink>
                <MarketingButtonLink
                  href={siteConfig.whatsapp}
                  variant="outline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat on WhatsApp
                </MarketingButtonLink>
              </MarketingHeroActions>
            </div>

            <Reveal delayMs={80}>
              <ServiceIllustration name="consulting" />
            </Reveal>
          </div>
        </MarketingPageHeroInner>
      </MarketingPageHero>

      <StartupJourney />

      <MarketingSection tone="default" aria-label="How U&V supports founders">
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="End-to-end support"
              title="Everything a founder needs — from clarity to growth."
              description="U&V is not only a software company. We help you validate, plan, register, brand, build, market, launch, and grow — with support matched to your stage."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {startupSupportAreas.map((area, index) => (
              <Reveal
                key={area.title}
                delayMs={Math.min(index * 30, 240)}
                className="h-full"
              >
                <article className="marketing-card-lift flex h-full min-h-[17rem] flex-col rounded-uv-xl border border-uv-border bg-uv-background-subtle p-6">
                  <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-uv-lg bg-uv-brand-muted text-uv-brand">
                    <Icon name={area.icon} />
                  </div>
                  <MarketingCardTitle className="mt-4 text-base sm:text-lg">
                    {area.title}
                  </MarketingCardTitle>
                  <div className="mt-3 flex flex-1 flex-col gap-3">
                    <div>
                      <StoryLabel>The challenge</StoryLabel>
                      <p className="mt-1.5 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                        {area.problem}
                      </p>
                    </div>
                    <div>
                      <StoryLabel>How U&V helps</StoryLabel>
                      <p className="mt-1.5 text-sm leading-relaxed text-uv-foreground sm:text-base">
                        {area.outcome}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection tone="subtle" aria-label="Why founders choose U&V">
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Why U&V"
              title="Encouraging, practical, and honest — the way founder support should be."
              description="We understand the uncertainty of building something new. Our role is to bring structure, capability, and long-term partnership — not hype."
            />
          </Reveal>
          <div className="mt-12 grid gap-8 sm:mt-16 md:grid-cols-2">
            {startupWhyUandv.map((item, index) => (
              <Reveal key={item.title} delayMs={index * 45}>
                <article className="border-t border-uv-border pt-6">
                  <p className="text-sm font-medium text-uv-brand">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <MarketingCardTitle className="mt-3">
                    {item.title}
                  </MarketingCardTitle>
                  <p className="mt-3 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection tone="default" aria-label="How we work with founders">
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="How we work"
              title="A clear path from first conversation to lasting partnership."
              description="You always know what happens next — whether we are planning, building, launching, or helping you grow."
            />
          </Reveal>
          <ol className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
            {startupProcess.map((step, index) => (
              <Reveal key={step.title} delayMs={index * 50} className="h-full">
                <li className="marketing-glass flex h-full min-w-0 flex-col rounded-uv-xl border border-uv-border p-5 sm:p-6">
                  <p className="font-[family-name:var(--font-uv-display)] text-2xl font-bold text-uv-brand/30">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <MarketingCardTitle className="mt-3 text-base sm:text-lg">
                    {step.title}
                  </MarketingCardTitle>
                  <p className="mt-2 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                    {step.description}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection tone="subtle" aria-label="Honest positioning">
        <MarketingPageContainer>
          <Reveal>
            <div className="overflow-hidden rounded-uv-2xl border border-uv-brand/25 bg-gradient-to-br from-uv-brand/10 via-uv-background to-uv-background-subtle p-6 sm:p-10">
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-uv-brand">
                Honest positioning
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-uv-display)] text-2xl font-semibold text-uv-foreground sm:text-3xl">
                Practical support based on your real needs.
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-uv-foreground-muted sm:text-lg">
                {startupHonestPositioning.statement}
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {startupHonestPositioning.points.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-uv-foreground-muted sm:text-base">
                    <Icon name="CircleAlert" className="mt-0.5 shrink-0 text-uv-brand" size="sm" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection tone="default" className="marketing-faq" aria-label="Startup FAQs">
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="FAQ"
              title="Questions founders ask before they reach out."
              description="Straight answers — so expectations stay clear from the first conversation."
            />
          </Reveal>
          <div className="mx-auto mt-12 max-w-3xl divide-y divide-uv-border border-y border-uv-border sm:mt-16">
            {startupFaqs.map((faq, index) => (
              <Reveal key={faq.question} delayMs={index * 40}>
                <details className="group py-5">
                  <summary className="flex items-start justify-between gap-4 text-left">
                    <span className="font-[family-name:var(--font-uv-display)] text-base font-semibold text-uv-foreground sm:text-lg">
                      {faq.question}
                    </span>
                    <Icon
                      name="ChevronDown"
                      size="md"
                      className="faq-chevron mt-1 shrink-0 text-uv-foreground-muted transition-transform duration-200"
                    />
                  </summary>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                    {faq.answer}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection id="consultation" tone="subtle" className="border-b-0" aria-label="Free consultation">
        <MarketingPageContainer>
          <MarketingCtaPanel className="sm:py-14">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <MarketingEyebrow>Free consultation</MarketingEyebrow>
                <MarketingSectionTitle className="mt-3">
                  Let&apos;s talk about where you are — and what comes next.
                </MarketingSectionTitle>
                <p className="mt-4 text-base leading-relaxed text-uv-foreground-muted sm:text-lg">
                  Share your idea, stage, and goals. We will help you understand
                  what to prioritise and how U&V can guide you from validation
                  through launch and long-term growth.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
                <MarketingButtonLink href={contactInquiryHref} className="justify-center">
                  Book a Free Startup Consultation
                </MarketingButtonLink>
                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'inline-flex items-center justify-center gap-2 rounded-uv-lg border border-uv-border bg-uv-background px-6 py-3 text-sm font-semibold text-uv-foreground transition-colors hover:border-uv-brand/40 uv-focus-ring',
                  )}
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </MarketingCtaPanel>
        </MarketingPageContainer>
      </MarketingSection>

      {related.length > 0 ? (
        <MarketingSection tone="default" className="border-b-0">
          <MarketingPageContainer>
            <Reveal>
              <SectionHeading
                eyebrow="Related services"
                title="Explore specific areas of startup support."
                description="Complementary services that often pair with founder consulting."
              />
            </Reveal>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 sm:mt-16">
              {related.map((item, index) => (
                <Reveal key={item.slug} delayMs={index * 50}>
                  <Link
                    href={`/services/${item.slug}`}
                    className="group block rounded-uv-xl border border-uv-border bg-uv-background p-6 shadow-uv-sm transition-colors marketing-card-lift hover:border-uv-brand/40 uv-focus-ring"
                  >
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-uv-lg bg-uv-brand-muted text-uv-brand transition-transform duration-300 group-hover:-translate-y-0.5">
                      <Icon name={item.icon} size="md" />
                    </div>
                    <MarketingCardTitle className="text-lg">
                      {item.title}
                    </MarketingCardTitle>
                    <p className="mt-2 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                      {item.summary}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-uv-brand">
                      View service
                      <Icon name="ArrowRight" size="sm" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </MarketingPageContainer>
        </MarketingSection>
      ) : null}
    </MarketingContentPage>
  );
}
