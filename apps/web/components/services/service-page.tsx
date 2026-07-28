import Link from 'next/link';
import type { ReactNode } from 'react';

import { Icon, buttonVariants, cn } from '@uandv/ui';

import { Reveal } from '@/components/marketing/reveal';
import { SectionHeading } from '@/components/marketing/section-heading';
import {
  MarketingButtonLink,
  MarketingCard,
  MarketingEyebrow,
  MarketingHeroActions,
  MarketingHeroTitle,
  MarketingIconBox,
  MarketingLead,
  MarketingPageContainer,
  MarketingSection,
} from '@/components/marketing/marketing-primitives';
import {
  MarketingContentPage,
  MarketingPageHero,
  MarketingPageHeroInner,
} from '@/components/marketing/marketing-page-hero';
import {
  MarketingStandardHeroCopy,
  MarketingStandardHeroGrid,
  MarketingStandardHeroIllustration,
  marketingStandardHeroInnerClass,
} from '@/components/marketing/marketing-standard-hero';
import {
  getRelatedServices,
  type ServiceDefinition,
} from '@/lib/services';
import { contactInquiryHref, siteConfig } from '@/lib/site';

import { Breadcrumbs, type BreadcrumbItem } from './breadcrumbs';
import { ServiceIllustration } from './service-illustration';

export function ServicePage({
  service,
  afterHero,
  breadcrumbItems,
}: {
  service: ServiceDefinition;
  afterHero?: ReactNode;
  breadcrumbItems?: BreadcrumbItem[];
}) {
  const related = getRelatedServices(service);
  const breadcrumbs = breadcrumbItems ?? [
    { label: 'Home', href: '/' },
    { label: 'About U&V', href: '/why-uandv#solutions' },
    { label: service.title },
  ];

  return (
    <MarketingContentPage>
      <MarketingPageHero>
        <MarketingPageHeroInner className={marketingStandardHeroInnerClass}>
          <Breadcrumbs items={breadcrumbs} />

          <MarketingStandardHeroGrid>
            <MarketingStandardHeroCopy>
              <MarketingEyebrow>Our services</MarketingEyebrow>
              <MarketingHeroTitle className="mt-4">{service.title}</MarketingHeroTitle>
              <MarketingLead className="mt-5">{service.tagline}</MarketingLead>
              <MarketingLead className="mt-4 text-base sm:text-lg">{service.summary}</MarketingLead>
              <MarketingHeroActions className="mt-8">
                <MarketingButtonLink href={contactInquiryHref}>
                  Contact us
                </MarketingButtonLink>
                <MarketingButtonLink
                  href={siteConfig.whatsapp}
                  variant="outline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </MarketingButtonLink>
              </MarketingHeroActions>
            </MarketingStandardHeroCopy>

            <MarketingStandardHeroIllustration>
              <ServiceIllustration name={service.illustration} className="rounded-none border-0" />
            </MarketingStandardHeroIllustration>
          </MarketingStandardHeroGrid>
        </MarketingPageHeroInner>
      </MarketingPageHero>

      {afterHero}

      <MarketingSection tone="default">
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Overview"
              title={`What ${service.shortTitle} delivery looks like.`}
              description={service.summary}
            />
          </Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {service.overview.map((paragraph) => (
              <Reveal key={paragraph.slice(0, 24)}>
                <p className="text-base leading-relaxed text-uv-foreground-muted sm:text-lg">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection tone="subtle">
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Features"
              title="Capabilities included in this engagement."
              description="Practical building blocks we use to deliver outcomes — scoped to your stage and priorities."
            />
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {service.features.map((feature, index) => (
              <Reveal key={feature.title} delayMs={index * 40}>
                <MarketingCard>
                  <MarketingIconBox className="mb-4">
                    <Icon name="Check" size="md" />
                  </MarketingIconBox>
                  <h3 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                    {feature.description}
                  </p>
                </MarketingCard>
              </Reveal>
            ))}
          </div>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection tone="default">
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Benefits"
              title="Why businesses choose this service."
              description="Outcomes that matter after launch — clarity, speed, and systems that keep working."
            />
          </Reveal>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {service.benefits.map((benefit, index) => (
              <Reveal key={benefit.title} delayMs={index * 60}>
                <article className="border-t border-uv-border pt-6">
                  <p className="text-sm font-medium text-uv-brand">
                    0{index + 1}
                  </p>
                  <h3 className="mt-3 font-[family-name:var(--font-uv-display)] text-xl font-semibold text-uv-foreground">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                    {benefit.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection tone="subtle">
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Process"
              title="How we develop and deliver."
              description="A clear path from discovery to launch — so you always know what happens next."
            />
          </Reveal>
          <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, index) => (
              <Reveal key={step.title} delayMs={index * 50}>
                <li>
                  <p className="font-[family-name:var(--font-uv-display)] text-4xl font-bold text-uv-brand/30">
                    {index + 1}
                  </p>
                  <h3 className="mt-3 font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-uv-foreground-muted">
                    {step.description}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection tone="default">
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Technologies"
              title="Tools and platforms we use."
              description="Modern, maintainable technology chosen for reliability — not trend-chasing."
            />
          </Reveal>
          <Reveal delayMs={80}>
            <ul className="mt-10 flex flex-wrap gap-3">
              {service.technologies.map((tech) => (
                <li
                  key={tech}
                  className="rounded-uv-full border border-uv-border bg-uv-background-subtle px-4 py-2 text-sm font-medium text-uv-foreground"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </Reveal>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection
        tone="subtle"
        className={cn('marketing-faq', related.length === 0 && 'border-b-0')}
      >
        <MarketingPageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="FAQ"
              title={`Questions about ${service.shortTitle}.`}
              description="Straight answers before you inquire — so expectations stay clear."
            />
          </Reveal>
          <div className="mx-auto mt-12 max-w-3xl divide-y divide-uv-border border-y border-uv-border">
            {service.faqs.map((faq, index) => (
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

      {related.length > 0 ? (
        <MarketingSection tone="subtle" className="border-b-0">
          <MarketingPageContainer>
            <Reveal>
              <SectionHeading
                eyebrow="Related services"
                title="Continue exploring how U&V can help."
                description="Complementary services that often pair with this engagement."
              />
            </Reveal>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => (
                <Reveal key={item.slug} delayMs={index * 50}>
                  <Link
                    href={`/services/${item.slug}`}
                    className="group block rounded-uv-xl border border-uv-border bg-uv-background p-6 shadow-uv-sm transition-colors marketing-card-lift hover:border-uv-brand/40 uv-focus-ring"
                  >
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-uv-lg bg-uv-brand-muted text-uv-brand transition-transform duration-300 group-hover:-translate-y-0.5">
                      <Icon name={item.icon} size="md" />
                    </div>
                    <h3 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-uv-foreground-muted">
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
