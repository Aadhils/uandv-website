import Link from 'next/link';

import { Icon, buttonVariants, cn } from '@uandv/ui';

import { Reveal } from '@/components/marketing/reveal';
import { SectionHeading } from '@/components/marketing/section-heading';
import { getAllServices } from '@/lib/services';
import { siteConfig } from '@/lib/site';

import { Breadcrumbs } from './breadcrumbs';
import { ServiceInquiryForm } from './service-inquiry-form';

export function ServicesIndexPage() {
  const services = getAllServices();

  return (
    <div className="marketing-grain flex-1">
      <section className="border-b border-uv-border bg-uv-background">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Services' },
            ]}
          />
          <div className="mt-10 max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-uv-brand">
              Our services
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-uv-display)] text-4xl font-bold tracking-tight text-uv-foreground sm:text-5xl">
              Technology and growth services under one roof.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-uv-foreground-muted sm:text-xl">
              From websites and custom software to AI automation, branding, and
              startup setup — explore every U&V service in detail.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#inquiry"
                className={cn(buttonVariants({ size: 'lg' }), 'justify-center')}
              >
                Contact us
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

      <section className="border-b border-uv-border bg-uv-background py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Catalog"
              title="Fifteen services. One accountable partner."
              description="Choose a service to see features, process, technologies, and how to inquire."
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.slug} delayMs={index * 30}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col rounded-uv-xl border border-uv-border bg-uv-background-subtle p-6 transition-colors hover:border-uv-brand/40 uv-focus-ring"
                >
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-uv-lg bg-uv-brand-muted text-uv-brand transition-transform duration-300 group-hover:-translate-y-0.5">
                    <Icon name={service.icon} size="md" />
                  </div>
                  <h2 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
                    {service.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-uv-foreground-muted">
                    {service.summary}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-uv-brand">
                    View details
                    <Icon name="ArrowRight" size="sm" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="inquiry"
        className="scroll-mt-20 bg-uv-background-subtle py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <Reveal>
              <SectionHeading
                eyebrow="Inquiry"
                title="Not sure which service fits?"
                description="Tell us what you are building. We will recommend the right starting point."
              />
            </Reveal>
            <Reveal delayMs={100}>
              <ServiceInquiryForm />
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
