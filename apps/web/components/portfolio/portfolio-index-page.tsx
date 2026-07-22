import Link from 'next/link';

import { Icon, buttonVariants, cn } from '@uandv/ui';

import { Reveal } from '@/components/marketing/reveal';
import { SectionHeading } from '@/components/marketing/section-heading';
import { Breadcrumbs } from '@/components/services/breadcrumbs';
import {
  DEMO_PROJECT_LABEL,
  getFeaturedCaseStudies,
  portfolioProcess,
  portfolioTechnologies,
} from '@/lib/portfolio';
import { siteConfig } from '@/lib/site';

import { DemoProjectBadge, FeaturedProjectCard } from './portfolio-card';
import { PortfolioFilterGrid } from './portfolio-filter-grid';

export function PortfolioIndexPage() {
  const featured = getFeaturedCaseStudies(4);

  return (
    <div className="marketing-grain flex-1">
      <section className="relative overflow-hidden border-b border-uv-border bg-uv-background">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-uv-brand/15 blur-3xl" />
          <div className="absolute right-0 top-28 h-96 w-96 rounded-full bg-uv-navy/10 blur-3xl" />
          <div className="marketing-hero-grid absolute inset-0 opacity-45" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pb-24 sm:pt-10 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Portfolio' },
            ]}
          />

          <div className="mt-10 grid items-end gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="max-w-3xl">
              <DemoProjectBadge />
              <p className="mt-5 text-sm font-medium uppercase tracking-[0.18em] text-uv-brand">
                Portfolio &amp; Demo Center
              </p>
              <h1 className="mt-4 font-[family-name:var(--font-uv-display)] text-4xl font-bold tracking-tight text-uv-foreground sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
                Our Work Speaks for Itself
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-uv-foreground-muted sm:text-xl">
                Explore our software solutions, business systems and AI-powered
                products.
              </p>
              <p className="mt-4 text-sm text-uv-foreground-muted">
                Every item is a clearly marked {DEMO_PROJECT_LABEL.toLowerCase()}{' '}
                with placeholders — not a claim about a named client engagement.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#demos"
                  className={cn(buttonVariants({ size: 'lg' }), 'justify-center')}
                >
                  View Live Demo
                </a>
                <Link
                  href="/#contact"
                  className={cn(
                    buttonVariants({ size: 'lg', variant: 'outline' }),
                    'justify-center',
                  )}
                >
                  Start Your Project
                </Link>
              </div>
            </div>

            <Reveal delayMs={80}>
              <div className="rounded-uv-2xl border border-uv-border bg-uv-background-subtle p-6 sm:p-8">
                <p className="text-sm font-medium text-uv-brand">
                  Working product concepts you can explore
                </p>
                <ul className="mt-5 space-y-4 text-sm leading-relaxed text-uv-foreground-muted">
                  <li className="flex gap-3">
                    <Icon name="Check" className="mt-0.5 text-uv-brand" />
                    <span>
                      Industry demos across web, mobile, ERP, CRM, MLM, and AI.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Icon name="Check" className="mt-0.5 text-uv-brand" />
                    <span>
                      Detail pages with process, modules, and technology stacks.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <Icon name="Check" className="mt-0.5 text-uv-brand" />
                    <span>
                      Placeholders only — no fake clients, testimonials, or
                      statistics.
                    </span>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section
        id="demos"
        className="scroll-mt-20 border-b border-uv-border bg-uv-background py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Portfolio categories & demo cards"
              title="Browse demos by product lane."
              description="Filter by category. Each card includes an image placeholder, industry, technologies, Live Demo, and View Details."
            />
          </Reveal>
          <div className="mt-12">
            <PortfolioFilterGrid />
          </div>
        </div>
      </section>

      <section
        id="featured"
        className="scroll-mt-20 border-b border-uv-border bg-uv-background-subtle py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Featured projects"
              title="Large premium demos worth a closer look."
              description="Highlighted product concepts that show depth across operations, growth, and AI."
            />
          </Reveal>
          <div className="mt-14 space-y-8">
            {featured.map((study, index) => (
              <Reveal key={study.slug} delayMs={index * 60}>
                <FeaturedProjectCard study={study} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="technology"
        className="scroll-mt-20 border-b border-uv-border bg-uv-background py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Technology used"
              title="Modern stack. Enterprise discipline."
              description="Technologies we use to ship reliable product demos and production systems."
            />
          </Reveal>
          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {portfolioTechnologies.map((tech, index) => (
              <Reveal key={tech.title} delayMs={Math.min(index * 25, 220)}>
                <div className="group flex items-center gap-3 rounded-uv-xl border border-uv-border bg-uv-background-subtle px-4 py-4 transition-colors hover:border-uv-brand/40">
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
        id="process"
        className="scroll-mt-20 border-b border-uv-border bg-uv-background-subtle py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Project process"
              title="From discovery to long-term support."
              description="A clear delivery path that keeps quality and momentum aligned."
            />
          </Reveal>
          <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            {portfolioProcess.map((step, index) => (
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
                  Let&apos;s Build Your Next Success Story.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-uv-foreground-muted sm:text-lg">
                  Share your product idea or operational challenge. We will
                  recommend a practical next step — without fabricated claims.
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
