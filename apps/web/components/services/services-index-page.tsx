import Link from 'next/link';
import type { ReactNode } from 'react';

import { Icon } from '@uandv/ui';

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
import { serviceIndexCards } from '@/lib/service-index-cards';
import { getAllServices } from '@/lib/services';
import { contactInquiryHref, siteConfig } from '@/lib/site';

import { Breadcrumbs } from './breadcrumbs';

function ServiceCardLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-uv-brand">
      {children}
    </p>
  );
}

export function ServicesIndexPage() {
  const services = getAllServices();

  return (
    <MarketingContentPage>
      <MarketingPageHero>
        <MarketingPageHeroInner>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Services' },
            ]}
          />
          <div className="mt-10 max-w-3xl">
            <MarketingEyebrow>Find the right service</MarketingEyebrow>
            <MarketingHeroTitle className="mt-4">
              Which U&amp;V service fits your business right now?
            </MarketingHeroTitle>
            <MarketingLead className="mt-6">
              Start with the challenge you face today — each service below
              explains the problem it solves, the outcome you can expect, and
              how to take the next step.
            </MarketingLead>
            <p className="mt-4 text-sm font-medium leading-relaxed text-uv-foreground-muted sm:text-base">
              Not sure where to begin? Book a free consultation and we will
              point you to the right starting point.
            </p>
            <MarketingHeroActions>
              <MarketingButtonLink href={contactInquiryHref}>
                Book a Free Consultation
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
        </MarketingPageHeroInner>
      </MarketingPageHero>

      <MarketingSection tone="default" aria-label="Service catalog">
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Choose your starting point"
              title="Every service solves a real business problem."
              description="Select the area closest to your challenge. Open a service to see how we deliver it — features, process, and how to enquire."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {services.map((service, index) => {
              const card = serviceIndexCards[service.slug];
              const problem =
                card?.problem ??
                'You need a clearer path from today’s challenge to a working solution.';
              const outcome =
                card?.outcome ?? service.summary;

              return (
                <Reveal key={service.slug} delayMs={index * 30} className="h-full">
                  <article className="marketing-card-lift flex h-full min-h-[22rem] flex-col rounded-uv-xl border border-uv-border bg-uv-background-subtle p-6 shadow-uv-sm transition-colors hover:border-uv-brand/40">
                    <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-uv-lg bg-uv-brand-muted text-uv-brand">
                      <Icon name={service.icon} size="md" />
                    </div>
                    <MarketingCardTitle className="mt-4">
                      {service.title}
                    </MarketingCardTitle>
                    <div className="mt-4 flex flex-1 flex-col gap-3">
                      <div>
                        <ServiceCardLabel>The challenge</ServiceCardLabel>
                        <p className="mt-1.5 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                          {problem}
                        </p>
                      </div>
                      <div>
                        <ServiceCardLabel>The outcome</ServiceCardLabel>
                        <p className="mt-1.5 text-sm leading-relaxed text-uv-foreground sm:text-base">
                          {outcome}
                        </p>
                      </div>
                    </div>
                    <div className="mt-auto flex flex-col gap-2 border-t border-uv-border/80 pt-5">
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-uv-brand transition-colors hover:text-uv-brand/80 uv-focus-ring"
                      >
                        See how this helps your business
                        <Icon name="ArrowRight" size="sm" />
                      </Link>
                      <Link
                        href={contactInquiryHref}
                        className="text-sm font-medium text-uv-foreground-muted transition-colors hover:text-uv-brand uv-focus-ring"
                      >
                        Or book a free consultation
                      </Link>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection tone="subtle" className="border-b-0" aria-label="Consultation">
        <MarketingPageContainer>
          <MarketingCtaPanel className="sm:py-14">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <MarketingEyebrow>Not sure which service?</MarketingEyebrow>
                <MarketingSectionTitle className="mt-3">
                  We will help you choose the right starting point.
                </MarketingSectionTitle>
                <p className="mt-4 text-base leading-relaxed text-uv-foreground-muted sm:text-lg">
                  Tell us what is slowing your business down today. In a free,
                  no-pressure conversation, we will recommend the service — or
                  combination — that makes the most sense for your stage and
                  budget.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <MarketingButtonLink href={contactInquiryHref}>
                  Book a Free Consultation
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
