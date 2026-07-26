import Link from 'next/link';

import { Icon } from '@uandv/ui';

import { Reveal } from '@/components/marketing/reveal';
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
import { SectionHeading } from '@/components/marketing/section-heading';
import { Breadcrumbs } from '@/components/services/breadcrumbs';
import {
  consultingProcess,
  growthServices,
  partnershipModel,
  whyChooseConsulting,
} from '@/lib/consulting';
import { contactInquiryHref, siteConfig } from '@/lib/site';

export function BusinessConsultingPage() {
  return (
    <MarketingContentPage>
      <MarketingPageHero>
        <MarketingPageHeroInner>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Business Solutions' },
            ]}
          />

          <div className="mt-10 max-w-3xl">
            <MarketingEyebrow>Your Business Growth Partner</MarketingEyebrow>
            <MarketingHeroTitle className="mt-4">
              We Don&apos;t Just Build Software. We Build Businesses.
            </MarketingHeroTitle>
            <MarketingLead className="mt-6">
              If enquiries live in WhatsApp threads, follow-ups depend on
              memory, and growth feels harder than it should — you are not
              alone. U&amp;V helps business owners move from manual processes
              to organised, scalable growth — with a partner who stays after
              launch.
            </MarketingLead>
            <p className="mt-4 text-sm font-medium leading-relaxed text-uv-foreground-muted sm:text-base">
              Trusted by startups, SMEs, and enterprises across India.
              Honest advice. Response within 24 business hours.
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

      <MarketingSection
        id="process"
        tone="default"
        aria-label="Business challenges and consulting framework"
      >
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Sound familiar?"
              title="Spreadsheets, scattered enquiries, and tools that never quite fit how you work."
              description="Most owners do not need another software pitch — they need clarity on what to fix first. We start with your reality, then guide you from manual workarounds to systems that support real growth."
            />
          </Reveal>

          <ol className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-5">
            {consultingProcess.map((step, index) => (
              <Reveal key={step.title} delayMs={index * 35}>
                <li className="group h-full rounded-uv-xl border border-uv-border bg-uv-background-subtle p-5 transition-colors hover:border-uv-brand/35">
                  <div className="flex items-center justify-between gap-3">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-uv-lg bg-uv-brand-muted text-uv-brand transition-transform duration-300 group-hover:-translate-y-0.5">
                      <Icon name={step.icon} size="md" />
                    </div>
                    <span className="font-[family-name:var(--font-uv-display)] text-2xl font-bold text-uv-brand/25">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <MarketingCardTitle className="mt-4 text-base sm:text-lg">
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

      <MarketingSection
        id="growth-services"
        tone="subtle"
        aria-label="Business growth consulting areas"
      >
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Real results for real businesses"
              title="From daily frustration to measurable growth."
              description="Each area below starts with a conversation about where you are stuck today — then we help you move toward outcomes you can see in your operations, revenue, and peace of mind."
            />
          </Reveal>

          <div className="mt-12 grid gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {growthServices.map((service, index) => (
              <Reveal key={service.title} delayMs={index * 40}>
                <article className="marketing-card-lift flex h-full flex-col rounded-uv-xl border border-uv-border bg-uv-background p-6">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-uv-lg bg-uv-brand-muted text-uv-brand">
                    <Icon name={service.icon} size="md" />
                  </div>
                  <MarketingCardTitle>{service.title}</MarketingCardTitle>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                    {service.description}
                  </p>
                  <Link
                    href={contactInquiryHref}
                    className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-uv-brand transition-colors hover:text-uv-brand/80 uv-focus-ring"
                  >
                    Book a consultation
                    <Icon name="ArrowRight" size="sm" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection
        id="why-uandv"
        tone="default"
        aria-label="Why clients choose U and V"
      >
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Why clients choose U&V"
              title="Someone in your corner — not another vendor who vanishes after launch."
              description="You deserve advice rooted in your business, not a catalogue of features. We stay accountable after go-live, think commercially before we build, and keep strategy and delivery under one roof."
            />
          </Reveal>

          <div className="mt-12 grid gap-8 sm:mt-16 md:grid-cols-2">
            {whyChooseConsulting.map((item, index) => (
              <Reveal key={item.title} delayMs={index * 50}>
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

      <MarketingSection
        id="partnership"
        tone="subtle"
        aria-label="Long-term partnership model"
      >
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="After launch"
              title="Growth does not stop when the project goes live."
              description="The businesses that win are the ones that keep improving — turning early wins into habits, then into scalable systems. That is where our long-term partnership begins."
            />
          </Reveal>

          <div className="mt-12 grid gap-5 sm:mt-16 sm:gap-6 lg:grid-cols-4">
            {partnershipModel.map((item, index) => (
              <Reveal key={item.title} delayMs={index * 45}>
                <article className="h-full rounded-uv-xl border border-uv-border bg-uv-background p-6">
                  <p className="font-[family-name:var(--font-uv-display)] text-3xl font-bold text-uv-brand/30">
                    {index + 1}
                  </p>
                  <MarketingCardTitle className="mt-4">
                    {item.title}
                  </MarketingCardTitle>
                  <p className="mt-3 text-sm leading-relaxed text-uv-foreground-muted">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection id="consultation" tone="default" className="border-b-0">
        <MarketingPageContainer>
          <MarketingCtaPanel className="sm:py-14">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <MarketingEyebrow>Free consultation</MarketingEyebrow>
                <MarketingSectionTitle className="mt-3">
                  You do not need every solution — just the right next step.
                </MarketingSectionTitle>
                <p className="mt-4 text-base leading-relaxed text-uv-foreground-muted sm:text-lg">
                  Tell us what is slowing you down today. In a no-pressure
                  conversation, we will help you see what to fix first — so you
                  can move from firefighting toward steady, scalable growth.
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
