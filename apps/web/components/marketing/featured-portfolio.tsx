import Link from 'next/link';

import { Icon, buttonVariants, cn } from '@uandv/ui';

import { DemoProjectBadge } from '@/components/portfolio/portfolio-card';
import {
  DEMO_PROJECT_LABEL,
  getFeaturedCaseStudies,
  hasLiveDemo,
} from '@/lib/portfolio';

import { Reveal } from './reveal';
import { SectionHeading } from './section-heading';

export function FeaturedPortfolio() {
  const showcases = getFeaturedCaseStudies(3);

  return (
    <section
      id="portfolio"
      className="scroll-mt-20 border-b border-uv-border bg-uv-background py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Portfolio"
              title="Product demonstrations and solution concepts."
              description="Clearly labeled demos and prototypes — explore the full portfolio for every concept and interactive experience."
            />
            <DemoProjectBadge />
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {showcases.map((study, index) => (
            <Reveal key={study.slug} delayMs={index * 60} className="h-full">
              <article className="marketing-glass marketing-card-lift marketing-gradient-border flex h-full min-w-0 flex-col overflow-hidden rounded-uv-2xl">
                <div className="border-b border-uv-border/80 bg-uv-background-muted/50 px-4 py-2.5">
                  <span className="text-xs font-medium text-uv-brand">
                    {hasLiveDemo(study) ? 'Interactive demo' : 'Concept'} ·{' '}
                    {DEMO_PROJECT_LABEL}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
                    {study.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-uv-foreground-muted line-clamp-3">
                    {study.summary}
                  </p>
                  <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                    <Link
                      href={`/portfolio/${study.slug}`}
                      className={cn(
                        buttonVariants({ size: 'sm', variant: 'outline' }),
                        'justify-center',
                      )}
                    >
                      View concept
                    </Link>
                    {hasLiveDemo(study) && study.liveDemoHref ? (
                      <Link
                        href={study.liveDemoHref}
                        className={cn(
                          buttonVariants({ size: 'sm' }),
                          'justify-center',
                        )}
                      >
                        Open demo
                      </Link>
                    ) : null}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={100}>
          <div className="mt-8">
            <Link
              href="/portfolio"
              className={cn(buttonVariants({ variant: 'outline', size: 'md' }))}
            >
              View full portfolio
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
