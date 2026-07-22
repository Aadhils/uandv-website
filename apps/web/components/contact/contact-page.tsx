'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';

import {
  Button,
  Form,
  FormField,
  Icon,
  Input,
  Select,
  Text,
  Textarea,
  buttonVariants,
  cn,
} from '@uandv/ui';

import { Reveal } from '@/components/marketing/reveal';
import { SectionHeading } from '@/components/marketing/section-heading';
import { Breadcrumbs } from '@/components/services/breadcrumbs';
import { getAllServices } from '@/lib/services';
import { formatLocation, siteConfig } from '@/lib/site';

/**
 * Full contact experience (moved from the homepage section).
 * Client-side submission opens the visitor's email app (mailto).
 */
export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const services = getAllServices();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '');
    const email = String(data.get('email') ?? '');
    const phone = String(data.get('phone') ?? '');
    const company = String(data.get('company') ?? '');
    const interest = String(data.get('interest') ?? '');
    const message = String(data.get('message') ?? '');

    const subject = encodeURIComponent(
      `U&V inquiry${company ? ` — ${company}` : ''}`,
    );
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || '—'}`,
        `Company: ${company || '—'}`,
        `Interest: ${interest}`,
        '',
        message,
      ].join('\n'),
    );

    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

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

        <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-10 lg:px-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Contact' },
            ]}
          />

          <div className="mt-10 max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-uv-brand">
              Contact
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-uv-display)] text-4xl font-bold tracking-tight text-uv-foreground sm:text-5xl lg:text-[3.35rem] lg:leading-[1.1]">
              Tell us what you are building.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-uv-foreground-muted sm:text-xl">
              Share your goals and we will recommend the right next step —
              planning, product, AI, or growth.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-uv-border bg-uv-background-subtle py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-start">
            <Reveal>
              <SectionHeading
                eyebrow="Reach us"
                title="Direct channels for a faster start."
                description="Prefer email, WhatsApp, or the form — we respond during business hours with clear next steps."
              />
              <dl className="mt-10 space-y-5 text-sm sm:text-base">
                <div className="flex gap-3">
                  <Icon name="Mail" className="mt-0.5 text-uv-brand" />
                  <div>
                    <dt className="font-medium text-uv-foreground">
                      Business email
                    </dt>
                    <dd className="mt-1 space-y-1 text-uv-foreground-muted">
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="block underline-offset-4 hover:underline"
                      >
                        {siteConfig.email}
                      </a>
                      <a
                        href={`mailto:${siteConfig.emailSecondary}`}
                        className="block underline-offset-4 hover:underline"
                      >
                        {siteConfig.emailSecondary}
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Icon name="MapPin" className="mt-0.5 text-uv-brand" />
                  <div>
                    <dt className="font-medium text-uv-foreground">Location</dt>
                    <dd className="mt-1 text-uv-foreground-muted">
                      {formatLocation()}
                    </dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Icon name="Clock" className="mt-0.5 text-uv-brand" />
                  <div>
                    <dt className="font-medium text-uv-foreground">
                      Business hours
                    </dt>
                    <dd className="mt-1 text-uv-foreground-muted">
                      {siteConfig.hours}
                    </dd>
                  </div>
                </div>
              </dl>

              <div className="mt-8">
                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ size: 'md' }),
                    'w-full justify-center sm:w-auto',
                  )}
                >
                  Chat on WhatsApp
                </a>
              </div>

              <div className="mt-10 border-t border-uv-border pt-8">
                <p className="text-sm font-medium text-uv-foreground">
                  Follow U&V
                </p>
                <p className="mt-1 text-sm text-uv-foreground-muted">
                  Updates, product stories, and company news.
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {(
                    [
                      {
                        label: 'Facebook',
                        href: siteConfig.social.facebook,
                        icon: 'Facebook' as const,
                      },
                      {
                        label: 'YouTube',
                        href: siteConfig.social.youtube,
                        icon: 'Youtube' as const,
                      },
                      {
                        label: 'LinkedIn',
                        href: siteConfig.social.linkedin,
                        icon: 'Linkedin' as const,
                      },
                      {
                        label: 'X',
                        href: siteConfig.social.x,
                        icon: 'Twitter' as const,
                      },
                    ] as const
                  ).map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.label}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-uv-lg border border-uv-border bg-uv-background text-uv-foreground-muted transition-colors hover:border-uv-brand/40 hover:text-uv-brand uv-focus-ring"
                      >
                        <Icon name={item.icon} size="md" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delayMs={100}>
              <div className="rounded-uv-2xl border border-uv-border bg-uv-background p-6 sm:p-8">
                <Text
                  variant="caption"
                  className="mb-6 block text-uv-foreground-muted"
                >
                  Form status: opens your email app to message{' '}
                  <span className="font-medium text-uv-foreground">
                    {siteConfig.email}
                  </span>
                  . Server-side form backend is not connected yet.
                </Text>

                {submitted ? (
                  <div className="space-y-3 py-8 text-center">
                    <p className="font-[family-name:var(--font-uv-display)] text-2xl font-semibold text-uv-foreground">
                      Opening your email app
                    </p>
                    <p className="text-uv-foreground-muted">
                      If it did not open, email{' '}
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="text-uv-brand underline-offset-4 hover:underline"
                      >
                        {siteConfig.email}
                      </a>{' '}
                      or{' '}
                      <a
                        href={siteConfig.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-uv-brand underline-offset-4 hover:underline"
                      >
                        chat on WhatsApp
                      </a>
                      .
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-4"
                      onClick={() => setSubmitted(false)}
                    >
                      Edit message
                    </Button>
                  </div>
                ) : (
                  <Form onSubmit={onSubmit}>
                    <div className="grid gap-6 sm:grid-cols-2">
                      <FormField label="Name" required>
                        <Input name="name" autoComplete="name" required />
                      </FormField>
                      <FormField label="Email" required>
                        <Input
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                        />
                      </FormField>
                    </div>
                    <FormField label="Phone">
                      <Input
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+91…"
                      />
                    </FormField>
                    <FormField label="Company">
                      <Input name="company" autoComplete="organization" />
                    </FormField>
                    <FormField label="I need help with">
                      <Select
                        name="interest"
                        defaultValue={services[0]?.slug ?? 'website-development'}
                      >
                        {services.map((service) => (
                          <option key={service.slug} value={service.slug}>
                            {service.title}
                          </option>
                        ))}
                      </Select>
                    </FormField>
                    <FormField label="Message" required>
                      <Textarea
                        name="message"
                        required
                        placeholder="Tell us about your business and what you want to achieve."
                      />
                    </FormField>
                    <Button type="submit" size="lg" className="w-full sm:w-auto">
                      Continue in email app
                    </Button>
                  </Form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b border-uv-border bg-uv-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="Location"
              title="Based in Tamil Nadu, India."
              description="We partner with startups, SMEs, and enterprises across India and globally."
            />
          </Reveal>

          <Reveal delayMs={80}>
            <div
              className="relative mt-10 flex min-h-[280px] items-center justify-center overflow-hidden rounded-uv-2xl border border-dashed border-uv-border bg-uv-background-subtle sm:min-h-[360px]"
              role="img"
              aria-label="Google Maps placeholder for Tamil Nadu, India"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-60"
                aria-hidden
                style={{
                  backgroundImage:
                    'linear-gradient(to right, color-mix(in oklab, var(--uv-border) 70%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--uv-border) 70%, transparent) 1px, transparent 1px)',
                  backgroundSize: '32px 32px',
                }}
              />
              <div className="relative z-10 mx-auto max-w-md px-6 text-center">
                <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-uv-lg bg-uv-brand-muted text-uv-brand">
                  <Icon name="MapPin" size="md" />
                </div>
                <p className="font-[family-name:var(--font-uv-display)] text-xl font-semibold text-uv-foreground">
                  Google Maps placeholder
                </p>
                <p className="mt-2 text-sm leading-relaxed text-uv-foreground-muted">
                  {formatLocation()}. Exact map embed will be added when a
                  public office address is confirmed.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-uv-background-subtle py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-uv-2xl border border-uv-border bg-uv-background px-6 py-10 sm:px-10 sm:py-14">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-uv-brand">
                  Ready when you are
                </p>
                <h2 className="mt-3 font-[family-name:var(--font-uv-display)] text-3xl font-bold tracking-tight text-uv-foreground sm:text-4xl">
                  Start your project with U&V.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-uv-foreground-muted sm:text-lg">
                  Prefer WhatsApp? Message us directly and we will recommend a
                  clear next step.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ size: 'lg' }), 'justify-center')}
                >
                  Chat on WhatsApp
                </a>
                <Link
                  href="/services"
                  className={cn(
                    buttonVariants({ size: 'lg', variant: 'outline' }),
                    'justify-center',
                  )}
                >
                  Explore services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
