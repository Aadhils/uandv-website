import Link from 'next/link';

import { Icon, buttonVariants, cn } from '@uandv/ui';

import { Reveal } from '@/components/marketing/reveal';
import { SectionHeading } from '@/components/marketing/section-heading';
import { Breadcrumbs } from '@/components/services/breadcrumbs';
import {
  whyClientsStay,
  whyCorePrinciples,
  whyIndustries,
  whyTechnologies,
  whyWorkflow,
} from '@/lib/why-uandv';
import { siteConfig } from '@/lib/site';

export function WhyUandvPage() {
  return (
    <div className="marketing-grain flex-1">
      <section className="relative overflow-hidden border-b border-uv-border bg-uv-background">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-uv-brand/15 blur-3xl" />
          <div className="absolute right-0 top-24 h-96 w-96 rounded-full bg-uv-navy/10 blur-3xl" />
          <div className="marketing-hero-grid absolute inset-0 opacity-50" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pb-24 sm:pt-10 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Why U&V' },
            ]}
          />

          <div className="mt-10 grid items-end gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-uv-brand">
                U&V Enterprise Authority
              </p>
              <h1 className="mt-4 font-[family-name:var(--font-uv-display)] text-4xl font-bold tracking-tight text-uv-foreground sm:text-5xl lg:text-[3.35rem] lg:leading-[1.1]">
                Why Businesses Choose U&amp;V
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-uv-foreground-muted sm:text-xl">
                We combine technology, strategy, automation, branding, and
                long-term partnership under one roof.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#start"
                  className={cn(buttonVariants({ size: 'lg' }), 'justify-center')}
                >
                  Start Your Project
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
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            <Reveal delayMs={80}>
              <div className="rounded-uv-2xl border border-uv-border bg-uv-background-subtle p-6 sm:p-8">
                <p className="text-sm font-medium text-uv-brand">
                  Long-term technology &amp; business partner
                </p>
                <ul className="mt-5 space-y-4 text-sm leading-relaxed text-uv-foreground-muted">
                  <li className="flex gap-3">
                    <Icon name="Check" className="mt-0.5 text-uv-brand" />
                    <span>
                      Strategy and software decisions made together — not in
                      isolation.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Icon name="Check" className="mt-0.5 text-uv-brand" />
                    <span>
                      Delivery with the discipline to support, optimize, and
                      scale after launch.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Icon name="Check" className="mt-0.5 text-uv-brand" />
                    <span>
                      One accountable partner across product, AI, branding, and
                      growth systems.
                    </span>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section
        id="principles"
        className="scroll-mt-20 border-b border-uv-border bg-uv-background-subtle py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Core principles"
              title="How U&V works when the stakes are real."
              description="These principles guide every engagement — from first conversation to continuous improvement."
            />
          </Reveal>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {whyCorePrinciples.map((principle, index) => (
              <Reveal key={principle.title} delayMs={index * 40}>
                <article className="group h-full rounded-uv-2xl border border-uv-border bg-uv-background p-6 transition-colors hover:border-uv-brand/40">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-uv-lg bg-uv-brand-muted text-uv-brand transition-transform duration-300 group-hover:-translate-y-0.5">
                    <Icon name={principle.icon} />
                  </div>
                  <h3 className="mt-5 font-[family-name:var(--font-uv-display)] text-xl font-semibold text-uv-foreground">
                    {principle.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                    {principle.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="industries"
        className="scroll-mt-20 border-b border-uv-border bg-uv-background py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Industries we serve"
              title="Domain fluency across modern operating businesses."
              description="We apply product, platform, and growth thinking to industries where software must match real operational complexity."
            />
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {whyIndustries.map((industry, index) => (
              <Reveal key={industry.title} delayMs={Math.min(index * 25, 250)}>
                <div className="group flex h-full flex-col items-center rounded-uv-xl border border-uv-border bg-uv-background-subtle px-4 py-6 text-center transition-colors hover:border-uv-brand/40 hover:bg-uv-background">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-uv-lg bg-uv-brand-muted text-uv-brand transition-transform duration-300 group-hover:-translate-y-0.5">
                    <Icon name={industry.icon} size="lg" />
                  </div>
                  <p className="mt-4 font-[family-name:var(--font-uv-display)] text-sm font-semibold text-uv-foreground sm:text-base">
                    {industry.title}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="technology"
        className="scroll-mt-20 border-b border-uv-border bg-uv-background-subtle py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Technology expertise"
              title="Modern stack. Enterprise discipline."
              description="We select technologies for reliability, speed of delivery, and long-term maintainability — not trend chasing."
            />
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {whyTechnologies.map((tech, index) => (
              <Reveal key={tech.title} delayMs={Math.min(index * 25, 250)}>
                <div className="group flex h-full items-center gap-3 rounded-uv-xl border border-uv-border bg-uv-background px-4 py-4 transition-colors hover:border-uv-brand/40">
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-uv-lg bg-uv-brand-muted text-uv-brand transition-transform duration-300 group-hover:-translate-y-0.5">
                    <Icon name={tech.icon} />
                  </div>
                  <p className="font-[family-name:var(--font-uv-display)] text-sm font-semibold text-uv-foreground sm:text-base">
                    {tech.title}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="workflow"
        className="scroll-mt-20 border-b border-uv-border bg-uv-background py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Development workflow"
              title="A clear path from discovery to growth."
              description="Structured delivery with room for judgment — so quality and momentum stay aligned."
            />
          </Reveal>

          <ol className="relative mt-14 space-y-0 md:hidden">
            <div
              className="absolute bottom-2 left-[15px] top-2 w-px bg-uv-border"
              aria-hidden
            />
            {whyWorkflow.map((step, index) => (
              <li key={step.title} className="relative flex gap-5 pb-10 last:pb-0">
                <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-uv-brand/40 bg-uv-background text-xs font-semibold text-uv-brand">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <h3 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-uv-foreground-muted">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <ol className="mt-14 hidden gap-4 md:grid md:grid-cols-4">
            {whyWorkflow.map((step, index) => (
              <Reveal key={step.title} delayMs={index * 35}>
                <li className="relative h-full">
                  {index % 4 !== 3 && index !== whyWorkflow.length - 1 ? (
                    <div
                      className="pointer-events-none absolute left-[calc(100%-0.25rem)] top-6 z-0 hidden h-px w-[calc(100%-1.5rem)] bg-gradient-to-r from-uv-brand/35 to-uv-brand/10 lg:block"
                      aria-hidden
                    />
                  ) : null}
                  <article className="relative z-10 h-full rounded-uv-xl border border-uv-border bg-uv-background-subtle p-5">
                    <p className="font-[family-name:var(--font-uv-display)] text-2xl font-bold tracking-tight text-uv-brand/35">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mt-3 font-[family-name:var(--font-uv-display)] text-base font-semibold text-uv-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-uv-foreground-muted">
                      {step.description}
                    </p>
                  </article>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="stay"
        className="scroll-mt-20 border-b border-uv-border bg-uv-background-subtle py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Why clients stay with U&V"
              title="We don't disappear after delivery."
              description="We help optimize, scale, automate, and continuously improve — so your systems and business keep moving forward together."
            />
          </Reveal>
          <div className="mt-14 grid gap-4 lg:grid-cols-2">
            {whyClientsStay.map((item, index) => (
              <Reveal key={item.title} delayMs={index * 50}>
                <article className="h-full rounded-uv-2xl border border-uv-border bg-uv-background p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-uv-lg bg-uv-brand-muted text-uv-brand">
                      <Icon name="Check" />
                    </div>
                    <div>
                      <h3 className="font-[family-name:var(--font-uv-display)] text-xl font-semibold text-uv-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mx-auto mt-12 max-w-2xl text-center font-[family-name:var(--font-uv-display)] text-xl font-semibold tracking-tight text-uv-foreground sm:text-2xl">
              Software is the beginning.
              <br className="hidden sm:block" /> Partnership is the advantage.
            </p>
          </Reveal>
        </div>
      </section>

      <section
        id="start"
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
                  Let&apos;s Build Something Extraordinary Together.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-uv-foreground-muted sm:text-lg">
                  Share what you are building. We will recommend a practical next
                  step across consulting, product, AI, or growth — as a long-term
                  partner, not a one-time vendor.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  href="/#contact"
                  className={cn(buttonVariants({ size: 'lg' }), 'justify-center')}
                >
                  Start Your Project
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
