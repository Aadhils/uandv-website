import Link from 'next/link';

import { Icon, buttonVariants, cn } from '@uandv/ui';

import { Reveal } from '@/components/marketing/reveal';
import { SectionHeading } from '@/components/marketing/section-heading';
import { Breadcrumbs } from '@/components/services/breadcrumbs';
import {
  consultingProcess,
  growthServices,
  partnershipModel,
  whyChooseConsulting,
} from '@/lib/consulting';
import { siteConfig } from '@/lib/site';

export function BusinessConsultingPage() {
  return (
    <div className="marketing-grain flex-1">
      <section className="relative overflow-hidden border-b border-uv-border bg-uv-background">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          aria-hidden
        >
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-uv-brand/10 blur-3xl" />
          <div className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-uv-brand/5 blur-3xl" />
          <div className="marketing-hero-grid absolute inset-0 opacity-40" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pb-24 sm:pt-10 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Business Consulting' },
            ]}
          />

          <div className="mt-10 max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-uv-brand">
              U&V Business Consulting Framework
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-uv-display)] text-4xl font-bold tracking-tight text-uv-foreground sm:text-5xl lg:text-[3.35rem] lg:leading-[1.1]">
              We Don&apos;t Just Build Software. We Build Businesses.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-uv-foreground-muted sm:text-xl">
              From idea to global growth, U&amp;V partners with you in
              technology, strategy, automation, and continuous innovation.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#consultation"
                className={cn(buttonVariants({ size: 'lg' }), 'justify-center')}
              >
                Book a Free Business Consultation
              </a>
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
      </section>

      <section
        id="process"
        className="scroll-mt-20 border-b border-uv-border bg-uv-background py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Our consulting process"
              title="A complete path from discovery to continuous improvement."
              description="Traditional software vendors stop at delivery. U&V stays with you through strategy, build, launch, and growth."
            />
          </Reveal>

          <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
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
                  <h3 className="mt-4 font-[family-name:var(--font-uv-display)] text-base font-semibold text-uv-foreground">
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

      <section
        id="growth-services"
        className="scroll-mt-20 border-b border-uv-border bg-uv-background-subtle py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Business growth services"
              title="Consulting that connects strategy, systems, and scale."
              description="Each engagement is scoped to your stage — from early planning to AI transformation and digital growth."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {growthServices.map((service, index) => (
              <Reveal key={service.title} delayMs={index * 40}>
                <Link
                  href={service.href}
                  className="group flex h-full flex-col rounded-uv-xl border border-uv-border bg-uv-background p-6 transition-colors hover:border-uv-brand/40 uv-focus-ring"
                >
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-uv-lg bg-uv-brand-muted text-uv-brand transition-transform duration-300 group-hover:-translate-y-0.5">
                    <Icon name={service.icon} size="md" />
                  </div>
                  <h3 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-uv-foreground-muted">
                    {service.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-uv-brand">
                    Explore related service
                    <Icon name="ArrowRight" size="sm" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="why-uandv"
        className="scroll-mt-20 border-b border-uv-border bg-uv-background py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Why clients choose U&V"
              title="A long-term partner — not a one-time software vendor."
              description="We differentiate through accountability after launch, business judgment before code, and coordinated delivery across strategy and technology."
            />
          </Reveal>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {whyChooseConsulting.map((item, index) => (
              <Reveal key={item.title} delayMs={index * 50}>
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
        id="partnership"
        className="scroll-mt-20 border-b border-uv-border bg-uv-background-subtle py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Long-term partnership model"
              title="How U&V continues supporting you after launch."
              description="Launch is a milestone, not the finish line. Our partnership model keeps strategy, product, and growth moving together."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-4">
            {partnershipModel.map((item, index) => (
              <Reveal key={item.title} delayMs={index * 45}>
                <article className="h-full rounded-uv-xl border border-uv-border bg-uv-background p-6">
                  <p className="font-[family-name:var(--font-uv-display)] text-3xl font-bold text-uv-brand/30">
                    {index + 1}
                  </p>
                  <h3 className="mt-4 font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-uv-foreground-muted">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="consultation"
        className="scroll-mt-20 bg-uv-background py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-uv-2xl border border-uv-border bg-uv-background-subtle px-6 py-10 sm:px-10 sm:py-14">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-uv-brand">
                  Free consultation
                </p>
                <h2 className="mt-3 font-[family-name:var(--font-uv-display)] text-3xl font-bold tracking-tight text-uv-foreground sm:text-4xl">
                  Book a Free Business Consultation.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-uv-foreground-muted sm:text-lg">
                  Share where your business is today and where you want to go.
                  We will recommend a practical next step across consulting,
                  product, AI, or growth — with no fabricated claims and no
                  pressure to buy what you do not need.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <Link
                  href="/#contact"
                  className={cn(buttonVariants({ size: 'lg' }), 'justify-center')}
                >
                  Book a Free Business Consultation
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
    </div>
  );
}
