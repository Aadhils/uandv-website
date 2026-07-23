import Link from 'next/link';

import { Icon, buttonVariants, cn } from '@uandv/ui';

import { Reveal } from '@/components/marketing/reveal';
import { SectionHeading } from '@/components/marketing/section-heading';
import {
  getRelatedServices,
  type ServiceDefinition,
} from '@/lib/services';
import { siteConfig } from '@/lib/site';

import { Breadcrumbs } from './breadcrumbs';
import { ServiceIllustration } from './service-illustration';
import { ServiceInquiryForm } from './service-inquiry-form';

export function ServicePage({ service }: { service: ServiceDefinition }) {
  const related = getRelatedServices(service);
  const inquiryId = 'inquiry';

  return (
    <div className="marketing-grain flex-1">
      <section className="border-b border-uv-border bg-uv-background">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Services', href: '/services' },
              { label: service.title },
            ]}
          />

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-uv-brand">
                Our services
              </p>
              <h1 className="mt-4 font-[family-name:var(--font-uv-display)] text-4xl font-bold tracking-tight text-uv-foreground sm:text-5xl lg:text-[3.25rem]">
                {service.title}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-uv-foreground-muted sm:text-xl">
                {service.tagline}
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-uv-foreground-muted">
                {service.summary}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/contact"
                  className={cn(buttonVariants({ size: 'lg' }), 'justify-center')}
                >
                  Contact us
                </Link>
                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ size: 'lg', variant: 'outline' }),
                    'justify-center',
                  )}
                >
                  WhatsApp
                </a>
              </div>
            </div>
            <ServiceIllustration name={service.illustration} />
          </div>
        </div>
      </section>

      <section className="border-b border-uv-border bg-uv-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
        </div>
      </section>

      <section className="border-b border-uv-border bg-uv-background-subtle py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                <article>
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-uv-lg bg-uv-brand-muted text-uv-brand">
                    <Icon name="Check" size="md" />
                  </div>
                  <h3 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                    {feature.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-uv-border bg-uv-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
        </div>
      </section>

      <section className="border-b border-uv-border bg-uv-background-subtle py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
        </div>
      </section>

      <section className="border-b border-uv-border bg-uv-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
        </div>
      </section>

      <section className="marketing-faq border-b border-uv-border bg-uv-background-subtle py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
        </div>
      </section>

      <section className="border-b border-uv-border bg-uv-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-uv-2xl border border-uv-border bg-uv-background-subtle px-6 py-10 sm:px-10 sm:py-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-uv-brand">
                  Next step
                </p>
                <h2 className="mt-3 font-[family-name:var(--font-uv-display)] text-3xl font-bold tracking-tight text-uv-foreground sm:text-4xl">
                  Ready to discuss {service.shortTitle}?
                </h2>
                <p className="mt-4 text-base text-uv-foreground-muted sm:text-lg">
                  Tell us your goals and we will recommend a practical path —
                  scoped to your stage, budget, and timeline.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className={cn(buttonVariants({ size: 'lg' }), 'justify-center')}
                >
                  Contact us
                </Link>
                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ size: 'lg', variant: 'outline' }),
                    'justify-center',
                  )}
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="border-b border-uv-border bg-uv-background-subtle py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                    className="group block rounded-uv-xl border border-uv-border bg-uv-background p-6 transition-colors hover:border-uv-brand/40 uv-focus-ring"
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
          </div>
        </section>
      ) : null}

      <section
        id={inquiryId}
        className="scroll-mt-20 bg-uv-background py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <Reveal>
              <SectionHeading
                eyebrow="Inquiry"
                title="Start a conversation about this service."
                description="Share a few details and we will respond with recommended next steps."
              />
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className={cn(
                    buttonVariants({ size: 'md', variant: 'outline' }),
                    'justify-center',
                  )}
                >
                  Email {siteConfig.email}
                </a>
                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ size: 'md' }), 'justify-center')}
                >
                  WhatsApp
                </a>
              </div>
            </Reveal>
            <Reveal delayMs={100}>
              <ServiceInquiryForm defaultServiceSlug={service.slug} />
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
