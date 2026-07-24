import Link from 'next/link';

import { Icon, buttonVariants, cn } from '@uandv/ui';

import { Reveal } from '@/components/marketing/reveal';
import { SectionHeading } from '@/components/marketing/section-heading';
import { Breadcrumbs } from '@/components/services/breadcrumbs';
import {
  digitalMarketingAudiences,
  digitalMarketingIntegrations,
  digitalMarketingProcess,
  digitalMarketingServices,
  digitalMarketingWhy,
} from '@/lib/digital-marketing';
import { siteConfig } from '@/lib/site';

export function DigitalMarketingSolutionsPage() {
  return (
    <div className="marketing-grain flex-1">
      <section className="relative overflow-hidden border-b border-uv-border bg-uv-background">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-uv-brand/15 blur-3xl" />
          <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-uv-brand/10 blur-3xl" />
          <div className="marketing-hero-grid absolute inset-0 opacity-50" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pb-24 sm:pt-10 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Solutions', href: '/business-consulting' },
              { label: 'Digital Marketing' },
            ]}
          />

          <div className="mt-10 grid items-end gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-uv-brand">
                Digital Growth Solution
              </p>
              <h1 className="mt-4 font-[family-name:var(--font-uv-display)] text-4xl font-bold tracking-tight text-uv-foreground sm:text-5xl lg:text-[3.2rem] lg:leading-[1.1]">
                Digital Marketing &amp; Business Growth Solutions
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-uv-foreground-muted sm:text-xl">
                U&amp;V does not just run ads. We help businesses build
                visibility, generate qualified leads, improve conversions, and
                create sustainable growth systems.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/contact"
                  className={cn(buttonVariants({ size: 'lg' }), 'justify-center')}
                >
                  Book Free Marketing Consultation
                </Link>
                <Link
                  href="/services/digital-marketing"
                  className={cn(
                    buttonVariants({ size: 'lg', variant: 'outline' }),
                    'justify-center border-uv-brand/55 bg-uv-brand/15 text-uv-brand',
                    'hover:border-uv-brand hover:bg-uv-brand/25',
                  )}
                >
                  Explore Marketing Services
                </Link>
              </div>
            </div>

            <div className="rounded-uv-2xl border border-uv-border bg-uv-background-subtle p-6 sm:p-8">
              <p className="text-sm font-medium text-uv-brand">
                Marketing connected to real business systems
              </p>
              <ul className="mt-5 space-y-4 text-sm leading-relaxed text-uv-foreground-muted">
                <li className="flex gap-3">
                  <Icon name="Check" className="mt-0.5 text-uv-brand" />
                  <span>Clear strategy before channel spend.</span>
                </li>
                <li className="flex gap-3">
                  <Icon name="Check" className="mt-0.5 text-uv-brand" />
                  <span>Lead paths that feed CRM and follow-up.</span>
                </li>
                <li className="flex gap-3">
                  <Icon name="Check" className="mt-0.5 text-uv-brand" />
                  <span>Reporting focused on decisions, not hype.</span>
                </li>
              </ul>
              <Link
                href="/business-consulting"
                className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-uv-brand"
              >
                See business solutions
                <Icon name="ArrowRight" size="sm" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-uv-border bg-uv-background-subtle py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Why U&V for Digital Marketing"
              title="Growth support that stays practical and accountable."
              description="We treat marketing as a business system — strategy, channels, conversion, and follow-up working together."
            />
          </Reveal>
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {digitalMarketingWhy.map((item, index) => (
              <Reveal key={item.title} delayMs={index * 45}>
                <article className="border-t border-uv-border pt-6">
                  <p className="text-sm font-medium text-uv-brand">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-3 font-[family-name:var(--font-uv-display)] text-xl font-semibold text-uv-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="services-included"
        className="scroll-mt-20 border-b border-uv-border bg-uv-background py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Services included"
              title="A complete digital growth toolkit under one partner."
              description="Engage for strategy alone or for coordinated delivery across channels, content, ads, and conversion systems."
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {digitalMarketingServices.map((service, index) => (
              <Reveal key={service.title} delayMs={Math.min(index * 30, 240)}>
                <article className="h-full rounded-uv-xl border border-uv-border bg-uv-background-subtle p-6">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-uv-lg bg-uv-brand-muted text-uv-brand">
                    <Icon name={service.icon} />
                  </div>
                  <h3 className="mt-4 font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-uv-foreground-muted">
                    {service.description}
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
              eyebrow="Growth process"
              title="From discovery to continuous optimization."
              description="A clear engagement model so you always know what happens next."
            />
          </Reveal>
          <ol className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {digitalMarketingProcess.map((step, index) => (
              <Reveal key={step.title} delayMs={index * 35} className="h-full">
                <li className="flex h-full min-w-0 flex-col rounded-uv-xl border border-uv-border bg-uv-background p-5">
                  <p className="font-[family-name:var(--font-uv-display)] text-2xl font-bold text-uv-brand/30">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-3 break-words font-[family-name:var(--font-uv-display)] text-base font-semibold text-uv-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 break-words text-sm leading-relaxed text-uv-foreground-muted">
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
              eyebrow="Suitable business types"
              title="Built for teams ready to grow with clarity."
              description="Whether you are launching demand for the first time or tightening an existing funnel, we match the plan to your stage."
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {digitalMarketingAudiences.map((item, index) => (
              <Reveal key={item.title} delayMs={index * 40}>
                <article className="h-full rounded-uv-xl border border-uv-border bg-uv-background-subtle p-6">
                  <h3 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-uv-foreground-muted">
                    {item.description}
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
              eyebrow="Campaign and reporting approach"
              title="Visibility that supports better decisions."
              description="We focus on clear setup, honest reporting, and iterative improvement — not guaranteed outcomes or inflated statistics."
            />
          </Reveal>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {[
              {
                title: 'Measurement first',
                body: 'Tracking, naming conventions, and campaign structure are set before scale so results can be interpreted usefully.',
              },
              {
                title: 'Decision-ready reviews',
                body: 'Reports highlight what changed, what responded, and recommended next actions your team can act on.',
              },
              {
                title: 'Continuous refinement',
                body: 'Creative, targeting, landing paths, and follow-up are improved in controlled cycles based on evidence.',
              },
            ].map((item, index) => (
              <Reveal key={item.title} delayMs={index * 40}>
                <article className="h-full rounded-uv-xl border border-uv-border bg-uv-background p-6">
                  <h3 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-uv-foreground-muted">
                    {item.body}
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
              eyebrow="Marketing + Website + CRM + AI"
              title="Growth works better when systems are connected."
              description="U&V can connect demand generation with the website, CRM, and automation layer your team already needs to operate."
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {digitalMarketingIntegrations.map((item, index) => (
              <Reveal key={item.title} delayMs={index * 40}>
                <Link
                  href={item.href}
                  className="group flex h-full flex-col rounded-uv-xl border border-uv-border bg-uv-background-subtle p-6 transition-colors hover:border-uv-brand/40 uv-focus-ring"
                >
                  <h3 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-uv-foreground-muted">
                    {item.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-uv-brand">
                    Explore
                    <Icon name="ArrowRight" size="sm" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="consultation"
        className="scroll-mt-20 bg-uv-background-subtle py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-uv-2xl border border-uv-border bg-uv-background px-6 py-10 sm:px-10 sm:py-14">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-uv-brand">
                  Consultation
                </p>
                <h2 className="mt-3 font-[family-name:var(--font-uv-display)] text-3xl font-bold tracking-tight text-uv-foreground sm:text-4xl">
                  Let&apos;s plan your next growth system.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-uv-foreground-muted sm:text-lg">
                  Share your current channels, goals, and constraints. We will
                  recommend a practical marketing path — without guaranteed
                  results language or fabricated case-study numbers.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  href="/contact"
                  className={cn(buttonVariants({ size: 'lg' }), 'justify-center')}
                >
                  Book Free Marketing Consultation
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
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
