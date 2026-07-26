import Link from 'next/link';
import type { ReactNode } from 'react';

import { Icon } from '@uandv/ui';

import { Reveal } from '@/components/marketing/reveal';
import {
  MarketingContentPage,
  MarketingPageHero,
  MarketingPageHeroInner,
} from '@/components/marketing/marketing-page-hero';
import {
  MarketingButtonLink,
  MarketingCard,
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
import { SectionHeading } from '@/components/marketing/section-heading';
import { Breadcrumbs } from '@/components/services/breadcrumbs';
import {
  digitalMarketingAudiences,
  digitalMarketingIntegrations,
  digitalMarketingProcess,
  digitalMarketingReporting,
  digitalMarketingServices,
  digitalMarketingWhy,
} from '@/lib/digital-marketing';
import { contactInquiryHref, siteConfig } from '@/lib/site';

function StoryLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-uv-brand">
      {children}
    </p>
  );
}

export function DigitalMarketingSolutionsPage() {
  return (
    <MarketingContentPage>
      <MarketingPageHero>
        <MarketingPageHeroInner>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Digital Marketing', href: '/digital-marketing' },
              { label: 'Digital Marketing' },
            ]}
          />

          <div className="mt-10 grid items-end gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="max-w-3xl">
              <MarketingEyebrow>Business growth through digital marketing</MarketingEyebrow>
              <MarketingHeroTitle className="mt-4">
                Turn attention into customers — not just ad impressions
              </MarketingHeroTitle>
              <MarketingLead className="mt-6">
                If you need more enquiries, repeat customers, and steady growth,
                U&amp;V helps you build marketing that supports your whole
                business — strategy, channels, follow-up, and improvement over
                time.
              </MarketingLead>
              <p className="mt-4 text-sm font-medium leading-relaxed text-uv-foreground-muted sm:text-base">
                Honest consultation. Sustainable systems. No guaranteed-results
                promises or inflated statistics.
              </p>
              <MarketingHeroActions>
                <MarketingButtonLink href={contactInquiryHref}>
                  Book a Free Growth Consultation
                </MarketingButtonLink>
                <MarketingButtonLink
                  href="/services/digital-marketing"
                  variant="outline"
                >
                  View service details
                </MarketingButtonLink>
              </MarketingHeroActions>
            </div>

            <Reveal delayMs={80}>
              <MarketingCard premium className="sm:p-8">
                <p className="text-sm font-medium text-uv-brand">
                  Marketing that serves your business
                </p>
                <ul className="mt-5 space-y-4 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                  <li className="flex gap-3">
                    <Icon name="Check" className="mt-0.5 shrink-0 text-uv-brand" />
                    <span>
                      Strategy before spend — so budget attracts customers, not
                      noise.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Icon name="Check" className="mt-0.5 shrink-0 text-uv-brand" />
                    <span>
                      Enquiry paths connected to follow-up, CRM, and sales
                      reality.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Icon name="Check" className="mt-0.5 shrink-0 text-uv-brand" />
                    <span>
                      Long-term growth habits — not one-off campaigns that fade.
                    </span>
                  </li>
                </ul>
                <Link
                  href="/business-solutions"
                  className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-uv-brand uv-focus-ring"
                >
                  See full business solutions
                  <Icon name="ArrowRight" size="sm" />
                </Link>
              </MarketingCard>
            </Reveal>
          </div>
        </MarketingPageHeroInner>
      </MarketingPageHero>

      <MarketingSection tone="subtle" aria-label="Why digital marketing for growth">
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="The real problem"
              title="More visibility does not always mean more customers."
              description="Most owners do not need another agency selling ads. They need clarity on who to reach, how to earn trust, and how to turn interest into enquiries — sustainably."
            />
          </Reveal>
          <div className="mt-12 grid gap-8 sm:mt-16 md:grid-cols-2">
            {digitalMarketingWhy.map((item, index) => (
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

      <MarketingSection id="services-included" tone="default" aria-label="Growth services">
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="How we help you grow"
              title="Every service starts with a business problem — and ends with an outcome."
              description="Choose the areas closest to your challenge. We coordinate delivery so channels, content, and follow-up work together — not in silos."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {digitalMarketingServices.map((service, index) => (
              <Reveal
                key={service.title}
                delayMs={Math.min(index * 30, 240)}
                className="h-full"
              >
                <article className="marketing-card-lift flex h-full min-h-[17rem] flex-col rounded-uv-xl border border-uv-border bg-uv-background-subtle p-6">
                  <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-uv-lg bg-uv-brand-muted text-uv-brand">
                    <Icon name={service.icon} />
                  </div>
                  <MarketingCardTitle className="mt-4">
                    {service.title}
                  </MarketingCardTitle>
                  <div className="mt-3 flex flex-1 flex-col gap-3">
                    <div>
                      <StoryLabel>The challenge</StoryLabel>
                      <p className="mt-1.5 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                        {service.problem}
                      </p>
                    </div>
                    <div>
                      <StoryLabel>Expected outcome</StoryLabel>
                      <p className="mt-1.5 text-sm leading-relaxed text-uv-foreground sm:text-base">
                        {service.outcome}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection tone="subtle" aria-label="Growth process">
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="How we work"
              title="A clear path from first conversation to sustainable growth."
              description="You always know what stage we are in, what happens next, and how each step helps attract and convert the right customers."
            />
          </Reveal>
          <ol className="mt-12 grid grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-5">
            {digitalMarketingProcess.map((step, index) => (
              <Reveal key={step.title} delayMs={index * 35} className="h-full">
                <li className="flex h-full min-w-0 flex-col rounded-uv-xl border border-uv-border bg-uv-background p-5 sm:p-6">
                  <p className="font-[family-name:var(--font-uv-display)] text-2xl font-bold text-uv-brand/30">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <MarketingCardTitle className="mt-3 text-base sm:text-lg">
                    {step.title}
                  </MarketingCardTitle>
                  <p className="mt-2 flex-1 break-words text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                    {step.description}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection tone="default" aria-label="Who this is for">
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Who this is for"
              title="Built for owners who want customers — not marketing busywork."
              description="Whether you are launching demand for the first time or fixing a funnel that leaks enquiries, we match the plan to your stage and capacity."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6">
            {digitalMarketingAudiences.map((item, index) => (
              <Reveal key={item.title} delayMs={index * 40} className="h-full">
                <article className="marketing-card-lift flex h-full flex-col rounded-uv-xl border border-uv-border bg-uv-background-subtle p-6">
                  <MarketingCardTitle>{item.title}</MarketingCardTitle>
                  <div className="mt-3 flex flex-1 flex-col gap-3">
                    <div>
                      <StoryLabel>The challenge</StoryLabel>
                      <p className="mt-1.5 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                        {item.problem}
                      </p>
                    </div>
                    <div>
                      <StoryLabel>How we help</StoryLabel>
                      <p className="mt-1.5 text-sm leading-relaxed text-uv-foreground sm:text-base">
                        {item.outcome}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection tone="subtle" aria-label="Reporting and improvement">
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Honest measurement"
              title="See what is working — without hype or false promises."
              description="We focus on clear setup, understandable reporting, and steady improvement. Results depend on your market, offer, and consistency — we will tell you that upfront."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:mt-16 sm:gap-6 lg:grid-cols-3">
            {digitalMarketingReporting.map((item, index) => (
              <Reveal key={item.title} delayMs={index * 40} className="h-full">
                <article className="marketing-card-lift flex h-full flex-col rounded-uv-xl border border-uv-border bg-uv-background p-6">
                  <MarketingCardTitle>{item.title}</MarketingCardTitle>
                  <div className="mt-3 flex flex-1 flex-col gap-3">
                    <div>
                      <StoryLabel>The challenge</StoryLabel>
                      <p className="mt-1.5 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                        {item.problem}
                      </p>
                    </div>
                    <div>
                      <StoryLabel>Expected outcome</StoryLabel>
                      <p className="mt-1.5 text-sm leading-relaxed text-uv-foreground sm:text-base">
                        {item.outcome}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection tone="default" aria-label="Connected growth systems">
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="One growth partner"
              title="Marketing works harder when it connects to your business systems."
              description="U&amp;V can link demand generation to your website, CRM, automation, and consulting — so growth is operational, not cosmetic."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6">
            {digitalMarketingIntegrations.map((item, index) => (
              <Reveal key={item.title} delayMs={index * 40} className="h-full">
                <Link
                  href={item.href}
                  className="marketing-card-lift group flex h-full flex-col rounded-uv-xl border border-uv-border bg-uv-background-subtle p-6 transition-colors hover:border-uv-brand/40 uv-focus-ring"
                >
                  <MarketingCardTitle>{item.title}</MarketingCardTitle>
                  <div className="mt-3 flex flex-1 flex-col gap-3">
                    <div>
                      <StoryLabel>The challenge</StoryLabel>
                      <p className="mt-1.5 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                        {item.problem}
                      </p>
                    </div>
                    <div>
                      <StoryLabel>Expected outcome</StoryLabel>
                      <p className="mt-1.5 text-sm leading-relaxed text-uv-foreground sm:text-base">
                        {item.outcome}
                      </p>
                    </div>
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-uv-brand">
                    Learn more
                    <Icon name="ArrowRight" size="sm" />
                  </span>
                </Link>
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
                  Let&apos;s talk honestly about growing your business.
                </MarketingSectionTitle>
                <p className="mt-4 text-base leading-relaxed text-uv-foreground-muted sm:text-lg">
                  Share where you are today — your customers, channels, and
                  goals. We will recommend a practical growth path, including what
                  to prioritise first and what to avoid — with no pressure and no
                  fabricated success metrics.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <MarketingButtonLink href={contactInquiryHref}>
                  Book a Free Growth Consultation
                </MarketingButtonLink>
                <MarketingButtonLink
                  href={siteConfig.whatsapp}
                  variant="outline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat on WhatsApp
                </MarketingButtonLink>
              </div>
            </div>
          </MarketingCtaPanel>
        </MarketingPageContainer>
      </MarketingSection>
    </MarketingContentPage>
  );
}
