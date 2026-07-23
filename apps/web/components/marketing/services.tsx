import Link from 'next/link';

import { Icon, buttonVariants, cn } from '@uandv/ui';

import { getAllServices } from '@/lib/services';

import { Reveal } from './reveal';
import { SectionHeading } from './section-heading';

export function Services() {
  const services = getAllServices();

  return (
    <section
      id="services"
      className="scroll-mt-20 border-b border-uv-border bg-uv-background py-16 sm:py-24"
    >
      <div className="mx-auto w-full min-w-0 max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Our services"
            title="Everything your business needs — delivered by one team."
            description="From websites and custom software to AI, branding, and startup setup — explore every service in detail."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.slug} delayMs={index * 30}>
              <Link
                href={`/services/${service.slug}`}
                className="group block h-full uv-focus-ring rounded-uv-lg"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-uv-lg bg-uv-brand-muted text-uv-brand transition-transform duration-300 group-hover:-translate-y-0.5">
                  <Icon name={service.icon} size="md" />
                </div>
                <h3 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold tracking-tight text-uv-foreground">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-uv-foreground-muted">
                  {service.summary}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-uv-brand">
                  View service
                  <Icon name="ArrowRight" size="sm" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={100}>
          <div className="mt-12">
            <Link
              href="/services"
              className={cn(buttonVariants({ variant: 'outline', size: 'md' }))}
            >
              View all services
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
