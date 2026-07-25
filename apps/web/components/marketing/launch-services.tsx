import Link from 'next/link';

import { Icon, buttonVariants, cn } from '@uandv/ui';

import { launchPrimaryServices } from '@/lib/launch-content';

import { Reveal } from './reveal';
import { SectionHeading } from './section-heading';

export function LaunchServices() {
  return (
    <section
      id="services"
      className="scroll-mt-20 border-b border-uv-border bg-uv-background py-16 sm:py-24"
    >
      <div className="mx-auto w-full min-w-0 max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Services"
            title="Technology, branding, and growth — delivered with clarity."
            description="Explore the core capabilities U&V provides for businesses at every stage."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-5">
          {launchPrimaryServices.map((service, index) => (
            <Reveal key={`${service.slug}-${service.title}`} delayMs={index * 40}>
              <Link
                href={`/services/${service.slug}`}
                className="group marketing-glass marketing-card-lift marketing-gradient-border flex h-full min-w-0 flex-col rounded-uv-2xl p-5 uv-focus-ring sm:p-6"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-uv-lg bg-gradient-to-br from-uv-brand-muted to-white text-uv-brand shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5">
                  <Icon name={service.icon} size="md" />
                </span>
                <h3 className="mt-4 break-words font-[family-name:var(--font-uv-display)] text-base font-semibold text-uv-foreground sm:text-lg">
                  {service.title}
                </h3>
                <p className="mt-2 flex-1 break-words text-sm leading-relaxed text-uv-foreground-muted">
                  {service.benefit}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-uv-brand">
                  Learn more
                  <Icon name="ArrowRight" size="sm" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={120}>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/services"
              className={cn(buttonVariants({ variant: 'outline', size: 'md' }))}
            >
              View all services
            </Link>
            <Link href="/contact" className={cn(buttonVariants({ size: 'md' }))}>
              Discuss your project
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
