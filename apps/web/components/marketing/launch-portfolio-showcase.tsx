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

export function LaunchPortfolioShowcase() {
  const showcases = getFeaturedCaseStudies(6);

  return (
    <section
      id="portfolio"
      className="scroll-mt-20 border-b border-uv-border bg-gradient-to-b from-uv-background to-uv-background-subtle py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Platform capabilities"
              title="Solution concepts and demo experiences."
              description="Explore real U&V product demonstrations and prototypes — clearly labeled, never presented as named client work."
            />
            <DemoProjectBadge />
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {showcases.map((study, index) => (
            <Reveal key={study.slug} delayMs={index * 60} className="h-full">
              <article className="marketing-glass marketing-card-lift marketing-gradient-border flex h-full min-w-0 flex-col overflow-hidden rounded-uv-2xl">
                <div className="border-b border-uv-border/80 bg-gradient-to-r from-uv-brand-muted/50 to-transparent px-5 py-3">
                  <span className="inline-flex items-center rounded-full bg-uv-brand-muted px-2.5 py-1 text-xs font-medium text-uv-brand">
                    {hasLiveDemo(study) ? 'Interactive demo' : 'Concept'}
                  </span>
                  <span className="ml-2 text-xs text-uv-foreground-muted">
                    {DEMO_PROJECT_LABEL}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="break-words font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
                    {study.title}
                  </h3>
                  <p className="mt-2 flex-1 break-words text-sm leading-relaxed text-uv-foreground-muted">
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

        <Reveal delayMs={120}>
          <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <Link
              href="/portfolio"
              className={cn(buttonVariants({ size: 'md', variant: 'outline' }))}
            >
              <Icon name="LayoutDashboard" size="sm" className="mr-2" />
              Browse full portfolio
            </Link>
            <p className="text-sm text-uv-foreground-muted">
              All items are internal demos, prototypes, or solution concepts.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
