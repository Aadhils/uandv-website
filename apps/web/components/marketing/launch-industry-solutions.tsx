import Link from 'next/link';

import { Icon, buttonVariants, cn } from '@uandv/ui';

import {
  industryAccentClasses,
  launchIndustrySolutions,
} from '@/lib/launch-content';

import { Reveal } from './reveal';
import { SectionHeading } from './section-heading';

export function LaunchIndustrySolutions() {
  return (
    <section
      id="industries"
      className="scroll-mt-20 border-b border-uv-border bg-gradient-to-b from-uv-background-subtle to-uv-background py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Industry solutions"
            title="Purpose-built platforms for the industries you serve."
            description="Explore solution concepts and demo experiences across verticals — each shaped for real operational needs."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-5">
          {launchIndustrySolutions.map((solution, index) => {
            const accent = industryAccentClasses[solution.accent];
            return (
              <Reveal key={solution.title} delayMs={index * 45} className="h-full">
                <article
                  className={cn(
                    'marketing-card-lift marketing-gradient-border flex h-full min-w-0 flex-col rounded-uv-2xl border p-5 backdrop-blur-sm sm:p-6',
                    accent.border,
                    accent.bg,
                  )}
                >
                  <span
                    className={cn(
                      'inline-flex h-11 w-11 items-center justify-center rounded-uv-lg shadow-sm',
                      accent.icon,
                    )}
                  >
                    <Icon name={solution.icon} size="md" />
                  </span>
                  <h3 className="mt-4 break-words font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
                    {solution.title}
                  </h3>
                  <p className="mt-2 flex-1 break-words text-sm leading-relaxed text-uv-foreground-muted">
                    {solution.description}
                  </p>
                  <Link
                    href={solution.href}
                    className={cn(
                      buttonVariants({ size: 'sm', variant: 'outline' }),
                      'mt-5 w-full justify-center bg-white/80 sm:w-auto',
                    )}
                  >
                    Explore solution
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delayMs={100}>
          <div className="mt-10 text-center">
            <Link href="/contact" className={cn(buttonVariants({ size: 'lg' }))}>
              Discuss your idea
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
