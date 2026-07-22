import Link from 'next/link';

import { Icon, buttonVariants, cn } from '@uandv/ui';

import { Reveal } from '@/components/marketing/reveal';
import { SectionHeading } from '@/components/marketing/section-heading';
import { Breadcrumbs } from '@/components/services/breadcrumbs';
import {
  compensationPlans,
  mlmConsulting,
  mlmFaqs,
  mlmGrowthServices,
  mlmPartnershipTimeline,
  mlmSuccessRoadmap,
  mlmWhyUandv,
  softwareModules,
} from '@/lib/mlm-solutions';
import { siteConfig } from '@/lib/site';

export function MlmSolutionsPage() {
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
              { label: 'Solutions', href: '/solutions/mlm-software' },
              { label: 'MLM Software' },
            ]}
          />

          <div className="mt-10 grid items-end gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-uv-brand">
                Flagship industry solution
              </p>
              <h1 className="mt-4 font-[family-name:var(--font-uv-display)] text-4xl font-bold tracking-tight text-uv-foreground sm:text-5xl lg:text-[3.2rem] lg:leading-[1.1]">
                Enterprise MLM Software &amp; Business Growth Solutions
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-uv-foreground-muted sm:text-xl">
                We don&apos;t just develop MLM software. We help businesses
                design, validate, launch, optimize, and scale MLM companies with
                technology, strategy, automation, and continuous consulting.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#consultation"
                  className={cn(buttonVariants({ size: 'lg' }), 'justify-center')}
                >
                  Book Free MLM Consultation
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

            <div className="rounded-uv-2xl border border-uv-border bg-uv-background-subtle p-6 sm:p-8">
              <p className="text-sm font-medium text-uv-brand">
                Long-term MLM Business Growth Partner
              </p>
              <ul className="mt-5 space-y-4 text-sm leading-relaxed text-uv-foreground-muted">
                <li className="flex gap-3">
                  <Icon name="Check" className="mt-0.5 text-uv-brand" />
                  <span>Consult before you encode irreversible plan rules.</span>
                </li>
                <li className="flex gap-3">
                  <Icon name="Check" className="mt-0.5 text-uv-brand" />
                  <span>Build platforms members and admins can actually operate.</span>
                </li>
                <li className="flex gap-3">
                  <Icon name="Check" className="mt-0.5 text-uv-brand" />
                  <span>Stay supported through launch, optimization, and scale.</span>
                </li>
              </ul>
              <Link
                href="/business-consulting"
                className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-uv-brand"
              >
                See consulting framework
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
              eyebrow="Why U&V for MLM?"
              title="Support from first idea through global expansion."
              description="U&V is built as a long-term technology and business growth partner for network marketing companies — not a one-time template seller."
            />
          </Reveal>
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {mlmWhyUandv.map((item, index) => (
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
        id="consulting"
        className="scroll-mt-20 border-b border-uv-border bg-uv-background py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="MLM business consulting"
              title="Validate the business before you scale the software."
              description="Strong MLM platforms start with clear economics, plan logic, and operating risk — then technology encodes what already makes sense."
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {mlmConsulting.map((item, index) => (
              <Reveal key={item.title} delayMs={index * 30}>
                <article className="h-full rounded-uv-xl border border-uv-border bg-uv-background-subtle p-5">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-uv-lg bg-uv-brand-muted text-uv-brand">
                    <Icon name={item.icon} size="md" />
                  </div>
                  <h3 className="mt-4 font-[family-name:var(--font-uv-display)] text-base font-semibold text-uv-foreground">
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

      <section
        id="compensation-plans"
        className="scroll-mt-20 border-b border-uv-border bg-uv-background-subtle py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Compensation plans"
              title="Plan types we can implement and customize."
              description="Each model fits different growth strategies. We help you choose — or design — the structure your economics can sustain."
            />
          </Reveal>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {compensationPlans.map((plan, index) => (
              <Reveal key={plan.title} delayMs={index * 25}>
                <article className="flex h-full flex-col rounded-uv-xl border border-uv-border bg-uv-background p-5 transition-colors hover:border-uv-brand/35">
                  <h3 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
                    {plan.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-uv-foreground-muted">
                    <span className="font-medium text-uv-foreground">
                      Works best for:{' '}
                    </span>
                    {plan.bestFor}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-uv-border bg-uv-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-uv-brand">
                Custom compensation design
              </p>
              <h2 className="mt-4 font-[family-name:var(--font-uv-display)] text-3xl font-bold tracking-tight text-uv-foreground sm:text-4xl lg:text-5xl">
                Your Business.
                <br />
                Your Rules.
                <br />
                Your Compensation Plan.
              </h2>
            </Reveal>
            <Reveal delayMs={80}>
              <div className="space-y-5 text-base leading-relaxed text-uv-foreground-muted sm:text-lg">
                <p>
                  U&amp;V builds completely customized MLM systems when your
                  product, ranks, payout policies, or market strategy do not fit
                  a standard template.
                </p>
                <p>
                  We document the rules, validate sample trees, design admin
                  controls, and engineer the commission engine so your plan stays
                  explainable as the network grows.
                </p>
                <p>
                  Custom does not mean chaotic — it means precise, tested, and
                  operable.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section
        id="modules"
        className="scroll-mt-20 border-b border-uv-border bg-uv-background-subtle py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Software modules"
              title="Enterprise-ready building blocks for network operations."
              description="Compose the platform around member experience, payout integrity, communications, and leadership visibility."
            />
          </Reveal>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {softwareModules.map((module, index) => (
              <Reveal key={module.title} delayMs={index * 20}>
                <article className="rounded-uv-xl border border-uv-border bg-uv-background p-5">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-uv-lg bg-uv-brand-muted text-uv-brand">
                    <Icon name={module.icon} size="md" />
                  </div>
                  <h3 className="mt-4 font-[family-name:var(--font-uv-display)] text-base font-semibold text-uv-foreground">
                    {module.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-uv-foreground-muted">
                    {module.description}
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
              eyebrow="Business growth services"
              title="Technology and growth under one accountable partner."
              description="Pair the MLM platform with the brand, apps, and acquisition systems needed to launch and expand."
            />
          </Reveal>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {mlmGrowthServices.map((service, index) => (
              <Reveal key={service.title} delayMs={index * 25}>
                <Link
                  href={service.href}
                  className="group flex h-full flex-col rounded-uv-xl border border-uv-border bg-uv-background-subtle p-5 transition-colors hover:border-uv-brand/40 uv-focus-ring"
                >
                  <Icon
                    name={service.icon}
                    className="text-uv-brand transition-transform duration-300 group-hover:-translate-y-0.5"
                  />
                  <h3 className="mt-4 font-[family-name:var(--font-uv-display)] text-base font-semibold text-uv-foreground">
                    {service.title}
                  </h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-uv-border bg-uv-background-subtle py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="U&V growth partnership"
              title="A clear path from consult to scale."
              description="We stay with you through the full lifecycle — so launch is a beginning, not a handoff cliff."
            />
          </Reveal>
          <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            {mlmPartnershipTimeline.map((step, index) => (
              <Reveal key={step.title} delayMs={index * 30}>
                <li className="h-full rounded-uv-xl border border-uv-border bg-uv-background p-4">
                  <p className="font-[family-name:var(--font-uv-display)] text-2xl font-bold text-uv-brand/30">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-3 font-[family-name:var(--font-uv-display)] text-base font-semibold text-uv-foreground">
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
        id="faq"
        className="marketing-faq scroll-mt-20 border-b border-uv-border bg-uv-background py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="FAQ"
              title="Professional questions about MLM platforms and partnership."
              description="Straight answers for founders evaluating software, compensation design, and long-term support."
            />
          </Reveal>
          <div className="mx-auto mt-12 max-w-3xl divide-y divide-uv-border border-y border-uv-border">
            {mlmFaqs.map((faq, index) => (
              <Reveal key={faq.question} delayMs={Math.min(index * 20, 200)}>
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

      <section
        id="success-roadmap"
        className="scroll-mt-20 border-b border-uv-border bg-uv-background-subtle py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="U&V MLM Success Roadmap™"
              title="Your Journey with U&V"
              description="From idea to global MLM business — every stage guided by U&V."
            />
          </Reveal>

          {/* Mobile: vertical timeline */}
          <ol className="relative mt-14 space-y-0 lg:hidden">
            <div
              className="absolute bottom-2 left-[15px] top-2 w-px bg-uv-border"
              aria-hidden
            />
            {mlmSuccessRoadmap.map((stage, index) => (
              <li key={stage.step} className="relative flex gap-5 pb-10 last:pb-0">
                <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-uv-brand/40 bg-uv-background text-xs font-semibold text-uv-brand">
                  {stage.step}
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <h3 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
                    {stage.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-uv-foreground-muted">
                    {stage.description}
                  </p>
                  {index < mlmSuccessRoadmap.length - 1 ? (
                    <p className="mt-4 text-uv-brand/50" aria-hidden>
                      ↓
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>

          {/* Desktop: horizontal roadmap in two rows */}
          <div className="mt-14 hidden lg:block">
            <ol className="grid grid-cols-5 gap-x-4 gap-y-10">
              {mlmSuccessRoadmap.map((stage, index) => {
                const isRowEnd = (index + 1) % 5 === 0;
                const isLast = index === mlmSuccessRoadmap.length - 1;
                return (
                  <li key={stage.step} className="relative">
                    {!isRowEnd && !isLast ? (
                      <div
                        className="pointer-events-none absolute left-[calc(100%-0.25rem)] top-5 z-0 h-px w-[calc(100%-1.5rem)] bg-gradient-to-r from-uv-brand/35 to-uv-brand/10"
                        aria-hidden
                      />
                    ) : null}
                    <article className="relative z-10 h-full rounded-uv-xl border border-uv-border bg-uv-background p-5">
                      <p className="font-[family-name:var(--font-uv-display)] text-2xl font-bold tracking-tight text-uv-brand/35">
                        {stage.step}
                      </p>
                      <h3 className="mt-3 font-[family-name:var(--font-uv-display)] text-base font-semibold text-uv-foreground">
                        {stage.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-uv-foreground-muted">
                        {stage.description}
                      </p>
                    </article>
                    {index === 4 ? (
                      <p
                        className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 text-uv-brand/45"
                        aria-hidden
                      >
                        ↓
                      </p>
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </div>

          <Reveal>
            <p className="mx-auto mt-14 max-w-2xl text-center font-[family-name:var(--font-uv-display)] text-xl font-semibold tracking-tight text-uv-foreground sm:text-2xl">
              We don&apos;t disappear after deployment.
              <br className="hidden sm:block" /> We grow with your business.
            </p>
          </Reveal>
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
                  Final CTA
                </p>
                <h2 className="mt-3 font-[family-name:var(--font-uv-display)] text-3xl font-bold tracking-tight text-uv-foreground sm:text-4xl">
                  Let&apos;s Build Your MLM Business Together.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-uv-foreground-muted sm:text-lg">
                  Share your model, plan draft, and goals. We will recommend a
                  practical path across consulting, platform design, and growth
                  support — without fake promises.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  href="/#contact"
                  className={cn(buttonVariants({ size: 'lg' }), 'justify-center')}
                >
                  Book Consultation
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
                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ size: 'lg', variant: 'secondary' }),
                    'justify-center',
                  )}
                >
                  Message Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
