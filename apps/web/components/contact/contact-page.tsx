'use client';

import Link from 'next/link';
import { useMemo, useState, type FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';

import {
  Button,
  Form,
  FormField,
  Icon,
  Input,
  Select,
  Textarea,
  buttonVariants,
  cn,
} from '@uandv/ui';

import { Reveal } from '@/components/marketing/reveal';
import { SectionHeading } from '@/components/marketing/section-heading';
import { Breadcrumbs } from '@/components/services/breadcrumbs';
import {
  defaultGuideLanguage,
  getGuideJourney,
  guideLanguageEnglishLabels,
  isGuideLanguage,
} from '@/lib/business-guide';
import { getAllServices } from '@/lib/services';
import { formatLocation, siteConfig } from '@/lib/site';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

function buildPrefillMessage(input: {
  journeyTitle?: string;
  steps?: string;
  partnerLabel?: string;
  preferredLanguage?: string;
  sourcePage?: string;
}) {
  const lines = [
    input.journeyTitle
      ? `Selected journey: ${input.journeyTitle}`
      : null,
    input.steps ? `Path: ${input.steps}` : null,
    input.partnerLabel ? `Partner type: ${input.partnerLabel}` : null,
    input.preferredLanguage
      ? `Preferred language: ${input.preferredLanguage}`
      : null,
    input.sourcePage ? `Source page: ${input.sourcePage}` : null,
    '',
    'Tell us more about your goals:',
    '',
  ].filter((line): line is string => line !== null);

  return lines.join('\n');
}

export function ContactPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const services = getAllServices();

  const leadContext = useMemo(() => {
    const journeyId = searchParams.get('journey') ?? '';
    const langParam = searchParams.get('lang');
    const preferredLanguage = isGuideLanguage(langParam)
      ? langParam
      : defaultGuideLanguage;
    const journey = journeyId
      ? getGuideJourney(preferredLanguage, journeyId)
      : undefined;
    const partnerType = searchParams.get('partnerType') ?? '';
    const partnerLabel = journey?.partnerTypes?.find(
      (item) => item.id === partnerType,
    )?.label;
    const visitorType =
      searchParams.get('visitorType') || journey?.visitorType || '';
    const sourcePage = searchParams.get('source') || '/contact';
    const interestFromQuery = searchParams.get('interest');
    const interest =
      interestFromQuery ||
      journey?.interestSlug ||
      services[0]?.slug ||
      'website-development';

    const discoveryLines = [
      searchParams.get('industry')
        ? `Business: ${searchParams.get('industry')}`
        : null,
      searchParams.get('stage')
        ? `Stage: ${searchParams.get('stage')}`
        : null,
      searchParams.get('goal') ? `Goal: ${searchParams.get('goal')}` : null,
      searchParams.get('challenge')
        ? `Challenge: ${searchParams.get('challenge')}`
        : null,
      searchParams.get('readiness')
        ? `Business readiness (initial): ${searchParams.get('readiness')}%`
        : null,
    ].filter((line): line is string => Boolean(line));

    const baseMessage = journey
      ? buildPrefillMessage({
          journeyTitle: journey.title,
          steps: journey.steps?.map((step) => step.label).join(' → '),
          partnerLabel,
          preferredLanguage: guideLanguageEnglishLabels[preferredLanguage],
          sourcePage,
        })
      : '';

    const message =
      discoveryLines.length > 0
        ? [
            'Business Discovery summary:',
            ...discoveryLines,
            '',
            baseMessage || 'Tell us more about your goals:',
          ].join('\n')
        : baseMessage;

    return {
      journeyId: journey?.id ?? journeyId,
      journeyTitle: journey?.title ?? '',
      visitorType,
      partnerType,
      partnerLabel: partnerLabel ?? '',
      preferredLanguage,
      preferredLanguageLabel: guideLanguageEnglishLabels[preferredLanguage],
      sourcePage,
      interest,
      message,
      hasJourney: Boolean(journey),
    };
  }, [searchParams, services]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus('submitting');
    setErrorMessage(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(data.get('name') ?? ''),
          email: String(data.get('email') ?? ''),
          phone: String(data.get('phone') ?? ''),
          company: String(data.get('company') ?? ''),
          interest: String(data.get('interest') ?? ''),
          message: String(data.get('message') ?? ''),
          visitorType: String(data.get('visitorType') ?? ''),
          journey: String(data.get('journey') ?? ''),
          partnerType: String(data.get('partnerType') ?? ''),
          preferredLanguage: String(data.get('preferredLanguage') ?? ''),
          sourcePage: String(data.get('sourcePage') ?? ''),
        }),
      });

      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!response.ok) {
        setStatus('error');
        setErrorMessage(
          result?.error ??
            'We could not send your enquiry right now. Please try again or contact us on WhatsApp.',
        );
        return;
      }

      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
      setErrorMessage(
        'Network error while sending your enquiry. Please check your connection and try again.',
      );
    }
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

          <div className="mt-8 max-w-3xl sm:mt-10">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-uv-brand">
              Contact
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-uv-display)] text-3xl font-bold tracking-tight text-uv-foreground sm:mt-4 sm:text-5xl lg:text-[3.35rem] lg:leading-[1.1]">
              Tell us what you are building.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-uv-foreground-muted sm:mt-6 sm:text-xl">
              Share your goals and we will recommend the right next step —
              planning, product, AI, or growth.
            </p>
            {leadContext.hasJourney ? (
              <p className="mt-4 rounded-uv-lg border border-uv-brand/20 bg-uv-brand-muted/40 px-4 py-3 text-sm text-uv-foreground sm:text-base">
                Business guide:{' '}
                <span className="font-semibold text-uv-brand">
                  {leadContext.journeyTitle}
                </span>
                {leadContext.partnerLabel
                  ? ` · ${leadContext.partnerLabel}`
                  : ''}
                {' · '}
                Follow-up language:{' '}
                <span className="font-semibold text-uv-brand">
                  {leadContext.preferredLanguageLabel}
                </span>
              </p>
            ) : null}
            <p className="mt-4 text-sm font-medium text-uv-brand sm:text-base">
              Response within 24 business hours.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-uv-border bg-uv-background-subtle py-12 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-14 xl:gap-16">
            <Reveal>
              <SectionHeading
                eyebrow="Reach us"
                title="Direct channels for a faster start."
                description="Prefer email, WhatsApp, or the form — we respond during business hours with clear next steps."
              />
              <dl className="mt-8 space-y-5 text-sm sm:mt-10 sm:space-y-6 sm:text-base">
                <div className="flex gap-3">
                  <Icon name="Mail" className="mt-0.5 text-uv-brand" />
                  <div>
                    <dt className="font-medium text-uv-foreground">
                      Business email
                    </dt>
                    <dd className="mt-1 space-y-1 text-uv-foreground-muted">
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="block break-all underline-offset-4 hover:underline"
                      >
                        {siteConfig.email}
                      </a>
                      <a
                        href={`mailto:${siteConfig.emailSecondary}`}
                        className="block break-all underline-offset-4 hover:underline"
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
                    <dd className="mt-1 text-sm text-uv-brand">
                      Response within 24 business hours.
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

              <div className="mt-8 border-t border-uv-border pt-8 sm:mt-10">
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
              <div className="rounded-uv-2xl border border-uv-border bg-uv-background p-5 sm:p-8">
                <h2 className="font-[family-name:var(--font-uv-display)] text-xl font-semibold text-uv-foreground sm:text-2xl">
                  Send a message
                </h2>
                <p className="mt-2 text-sm text-uv-foreground-muted">
                  Response within 24 business hours.
                </p>

                {status === 'success' ? (
                  <div
                    className="mt-8 space-y-4 rounded-uv-xl border border-uv-brand/25 bg-uv-brand-muted/40 px-5 py-8 text-center"
                    role="status"
                    aria-live="polite"
                  >
                    <div className="mx-auto inline-flex h-11 w-11 items-center justify-center rounded-full bg-uv-brand text-white">
                      <Icon name="Check" size="md" />
                    </div>
                    <p className="font-[family-name:var(--font-uv-display)] text-xl font-semibold text-uv-foreground sm:text-2xl">
                      Thank you! Your enquiry has been received. We&apos;ll
                      contact you soon.
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-2"
                      onClick={() => setStatus('idle')}
                    >
                      Send another message
                    </Button>
                  </div>
                ) : (
                  <Form onSubmit={onSubmit} className="mt-6 sm:mt-8">
                    <input
                      type="hidden"
                      name="visitorType"
                      value={leadContext.visitorType}
                    />
                    <input
                      type="hidden"
                      name="journey"
                      value={leadContext.journeyTitle || leadContext.journeyId}
                    />
                    <input
                      type="hidden"
                      name="partnerType"
                      value={
                        leadContext.partnerLabel || leadContext.partnerType
                      }
                    />
                    <input
                      type="hidden"
                      name="preferredLanguage"
                      value={leadContext.preferredLanguageLabel}
                    />
                    <input
                      type="hidden"
                      name="sourcePage"
                      value={leadContext.sourcePage}
                    />

                    <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                      <FormField label="Name" required>
                        <Input
                          name="name"
                          autoComplete="name"
                          required
                          disabled={status === 'submitting'}
                        />
                      </FormField>
                      <FormField label="Email" required>
                        <Input
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          disabled={status === 'submitting'}
                        />
                      </FormField>
                    </div>
                    <FormField label="Phone">
                      <Input
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+91…"
                        disabled={status === 'submitting'}
                      />
                    </FormField>
                    <FormField label="Company (Optional)">
                      <Input
                        name="company"
                        autoComplete="organization"
                        disabled={status === 'submitting'}
                      />
                    </FormField>
                    <FormField label="I need help with">
                      <Select
                        key={leadContext.interest}
                        name="interest"
                        defaultValue={leadContext.interest}
                        disabled={status === 'submitting'}
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
                        key={leadContext.message || 'empty-message'}
                        name="message"
                        required
                        rows={leadContext.hasJourney ? 8 : 5}
                        defaultValue={leadContext.message}
                        placeholder="Tell us about your business and what you want to achieve."
                        disabled={status === 'submitting'}
                      />
                    </FormField>

                    {status === 'error' && errorMessage ? (
                      <div
                        className="rounded-uv-lg border border-uv-error/30 bg-uv-error/5 px-4 py-3 text-sm text-uv-error"
                        role="alert"
                      >
                        {errorMessage}
                      </div>
                    ) : null}

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full sm:w-auto"
                      disabled={status === 'submitting'}
                    >
                      {status === 'submitting'
                        ? 'Sending…'
                        : 'Send enquiry'}
                    </Button>
                  </Form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-b border-uv-border bg-uv-background py-12 sm:py-20 lg:py-24">
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
              className="relative mt-8 flex min-h-[240px] items-center justify-center overflow-hidden rounded-uv-2xl border border-dashed border-uv-border bg-uv-background-subtle sm:mt-10 sm:min-h-[360px]"
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

      <section className="bg-uv-background-subtle py-12 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-uv-2xl border border-uv-border bg-uv-background px-5 py-8 sm:px-10 sm:py-14">
            <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-uv-brand">
                  Ready when you are
                </p>
                <h2 className="mt-3 font-[family-name:var(--font-uv-display)] text-2xl font-bold tracking-tight text-uv-foreground sm:text-4xl">
                  Start your project with U&V.
                </h2>
                <p className="mt-3 text-base leading-relaxed text-uv-foreground-muted sm:mt-4 sm:text-lg">
                  Prefer WhatsApp? Message us directly and we will recommend a
                  clear next step.
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col xl:flex-row">
                <a
                  href={siteConfig.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ size: 'lg' }),
                    'w-full justify-center sm:w-auto',
                  )}
                >
                  Chat on WhatsApp
                </a>
                <Link
                  href="/services"
                  className={cn(
                    buttonVariants({ size: 'lg', variant: 'outline' }),
                    'w-full justify-center sm:w-auto',
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
