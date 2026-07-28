'use client';

import { useEffect, useMemo, useState, type FormEvent } from 'react';
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
import {
  MarketingContentPage,
  MarketingPageHero,
  MarketingPageHeroInner,
} from '@/components/marketing/marketing-page-hero';
import {
  MarketingButtonLink,
  MarketingCardTitle,
  MarketingEyebrow,
  MarketingHeroActions,
  MarketingHeroTitle,
  MarketingLead,
  MarketingPageContainer,
  MarketingSection,
  MarketingSectionTitle,
} from '@/components/marketing/marketing-primitives';
import {
  MarketingStandardHeroCopy,
  MarketingStandardHeroGrid,
  MarketingStandardHeroIllustration,
  marketingStandardHeroInnerClass,
} from '@/components/marketing/marketing-standard-hero';
import { SectionHeading } from '@/components/marketing/section-heading';
import { Breadcrumbs } from '@/components/services/breadcrumbs';
import { ServiceIllustration } from '@/components/services/service-illustration';
import {
  defaultGuideLanguage,
  getGuideJourney,
  guideLanguageEnglishLabels,
  isGuideLanguage,
} from '@/lib/business-guide';
import {
  buildContactEnquiryWhatsAppUrl,
  type ContactEnquiryHandoff,
} from '@/lib/contact-whatsapp';
import {
  contactChannels,
  contactEnquirySteps,
  contactFormCopy,
  contactPositioning,
  contactSuccessCopy,
  contactTrustPoints,
} from '@/lib/contact';
import { getAllServices } from '@/lib/services';
import { formatLocation, siteConfig } from '@/lib/site';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

type ContactResponse = {
  ok?: boolean;
  error?: string;
  reference?: string;
};

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
  const [reference, setReference] = useState<string | null>(null);
  const [submittedEnquiry, setSubmittedEnquiry] =
    useState<ContactEnquiryHandoff | null>(null);
  const services = getAllServices();

  useEffect(() => {
    const scrollToInquiryForm = () => {
      if (window.location.hash !== '#inquiry-form') return;
      const formSection = document.getElementById('inquiry-form');
      if (!formSection) return;
      window.requestAnimationFrame(() => {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    };

    scrollToInquiryForm();
    window.addEventListener('hashchange', scrollToInquiryForm);
    return () => window.removeEventListener('hashchange', scrollToInquiryForm);
  }, []);

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

  const whatsappHandoffHref = useMemo(() => {
    if (!submittedEnquiry) return null;
    return buildContactEnquiryWhatsAppUrl(submittedEnquiry);
  }, [submittedEnquiry]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (status === 'submitting') return;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);

    setStatus('submitting');
    setErrorMessage(null);
    setReference(null);
    setSubmittedEnquiry(null);

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
          source: 'contact',
          website: String(data.get('website') ?? ''),
        }),
      });

      const result = (await response.json().catch(() => null)) as ContactResponse | null;

      if (!response.ok) {
        setStatus('error');
        setErrorMessage(
          result?.error ??
            'We could not send your enquiry right now. Please try again or contact us on WhatsApp.',
        );
        return;
      }

      const enquiryReference = result?.reference ?? '';
      setReference(enquiryReference || null);
      if (enquiryReference) {
        setSubmittedEnquiry({
          reference: enquiryReference,
          name: String(data.get('name') ?? ''),
          email: String(data.get('email') ?? ''),
          phone: String(data.get('phone') ?? ''),
          company: String(data.get('company') ?? ''),
          interest: String(data.get('interest') ?? ''),
          message: String(data.get('message') ?? ''),
        });
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
    <MarketingContentPage>
      <MarketingPageHero>
        <MarketingPageHeroInner className={marketingStandardHeroInnerClass}>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Contact' },
            ]}
          />

          <MarketingStandardHeroGrid>
            <MarketingStandardHeroCopy>
              <MarketingEyebrow>{contactPositioning.eyebrow}</MarketingEyebrow>
              <MarketingHeroTitle className="mt-3 sm:mt-4">
                {contactPositioning.headline}
              </MarketingHeroTitle>
              <MarketingLead className="mt-4 sm:mt-6">
                {contactPositioning.subheadline}
              </MarketingLead>
              <MarketingLead className="mt-4 text-base sm:text-lg">
                {contactPositioning.responseTime}
              </MarketingLead>
              {leadContext.hasJourney ? (
                <p className="mt-4 rounded-uv-lg border border-uv-brand/20 bg-uv-brand-muted/40 px-4 py-3 text-sm text-uv-foreground sm:text-base">
                  Business guide:{' '}
                  <span className="font-semibold text-uv-brand">
                    {leadContext.journeyTitle}
                  </span>
                  {leadContext.partnerLabel ? ` · ${leadContext.partnerLabel}` : ''}
                  {' · '}
                  Follow-up language:{' '}
                  <span className="font-semibold text-uv-brand">
                    {leadContext.preferredLanguageLabel}
                  </span>
                </p>
              ) : null}
              <MarketingHeroActions className="mt-6 sm:mt-8">
                <MarketingButtonLink href="#inquiry-form">
                  Send an enquiry
                </MarketingButtonLink>
                <MarketingButtonLink
                  href={siteConfig.whatsapp}
                  variant="outline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat on WhatsApp
                </MarketingButtonLink>
              </MarketingHeroActions>
            </MarketingStandardHeroCopy>

            <MarketingStandardHeroIllustration>
              <ServiceIllustration name="consulting" className="rounded-none border-0" />
            </MarketingStandardHeroIllustration>
          </MarketingStandardHeroGrid>
        </MarketingPageHeroInner>
      </MarketingPageHero>

      <MarketingSection
        id="inquiry-form"
        tone="subtle"
        className="scroll-mt-24"
      >
        <MarketingPageContainer>
          <ul className="mb-8 flex flex-wrap gap-2 sm:mb-10">
            {contactTrustPoints.map((point) => (
              <li
                key={point}
                className="rounded-uv-full border border-uv-border bg-uv-background/80 px-3 py-1.5 text-xs font-medium text-uv-foreground sm:text-sm"
              >
                {point}
              </li>
            ))}
          </ul>
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-14 xl:gap-16">
            <Reveal>
              <SectionHeading
                eyebrow="Contact details"
                title={contactChannels.heading}
                description={contactChannels.description}
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
                <MarketingSectionTitle className="text-xl sm:text-2xl">
                  {contactFormCopy.title}
                </MarketingSectionTitle>
                <p className="mt-2 text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                  {contactFormCopy.description}
                </p>

                <div className="mt-6 rounded-uv-xl border border-uv-border/80 bg-uv-background-subtle p-5 sm:mt-8 sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-uv-brand">
                    What happens next
                  </p>
                  <ol className="mt-4 space-y-4">
                    {contactEnquirySteps.map((step, index) => (
                      <li key={step.title} className="flex gap-3 sm:gap-4">
                        <span
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-uv-brand/30 bg-uv-brand-muted text-xs font-semibold text-uv-brand sm:h-9 sm:w-9 sm:text-sm"
                          aria-hidden
                        >
                          {index + 1}
                        </span>
                        <div className="min-w-0 pt-0.5">
                          <MarketingCardTitle className="text-sm sm:text-base">
                            {step.title}
                          </MarketingCardTitle>
                          <p className="mt-1 text-sm leading-relaxed text-uv-foreground-muted">
                            {step.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                {status === 'success' ? (
                  <div
                    className="mt-8 space-y-4 rounded-uv-xl border border-uv-brand/25 bg-uv-brand-muted/40 px-5 py-8 text-center sm:mt-10"
                    role="status"
                    aria-live="polite"
                  >
                    <div className="mx-auto inline-flex h-11 w-11 items-center justify-center rounded-full bg-uv-brand text-white">
                      <Icon name="Check" size="md" />
                    </div>
                    <p className="font-[family-name:var(--font-uv-display)] text-xl font-semibold text-uv-foreground sm:text-2xl">
                      {contactSuccessCopy.title}
                      {reference ? (
                        <>
                          {' '}
                          <span className="block mt-2 text-base font-medium text-uv-foreground-muted sm:text-lg">
                            Reference:{' '}
                            <span className="font-semibold text-uv-brand">
                              {reference}
                            </span>
                          </span>
                        </>
                      ) : null}
                    </p>
                    <p className="mx-auto max-w-md text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
                      {contactSuccessCopy.body}
                    </p>
                    {whatsappHandoffHref ? (
                      <a
                        href={whatsappHandoffHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          buttonVariants({ size: 'lg' }),
                          'mt-2 w-full justify-center sm:w-auto',
                        )}
                      >
                        {contactSuccessCopy.whatsappCta}
                      </a>
                    ) : null}
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-2"
                      onClick={() => {
                        setStatus('idle');
                        setReference(null);
                        setSubmittedEnquiry(null);
                      }}
                    >
                      {contactSuccessCopy.anotherMessage}
                    </Button>
                  </div>
                ) : (
                  <Form
                    onSubmit={onSubmit}
                    className="relative mt-8 sm:mt-10"
                    aria-label="Business enquiry form"
                  >
                    <p className="mb-5 text-xs text-uv-foreground-muted sm:mb-6 sm:text-sm">
                      {contactFormCopy.requiredNote}
                    </p>
                    {/* Honeypot — leave empty */}
                    <div
                      className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
                      aria-hidden
                    >
                      <label htmlFor="contact-website">Website</label>
                      <input
                        id="contact-website"
                        name="website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>
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
                          aria-required="true"
                          disabled={status === 'submitting'}
                        />
                      </FormField>
                      <FormField label="Email" required>
                        <Input
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          aria-required="true"
                          disabled={status === 'submitting'}
                        />
                      </FormField>
                    </div>
                    <FormField
                      label="Phone"
                      hint={contactFormCopy.phoneHint}
                    >
                      <Input
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+91…"
                        disabled={status === 'submitting'}
                      />
                    </FormField>
                    <FormField label="Company" hint="Optional">
                      <Input
                        name="company"
                        autoComplete="organization"
                        disabled={status === 'submitting'}
                      />
                    </FormField>
                    <FormField label="I need help with" required>
                      <Select
                        key={leadContext.interest}
                        name="interest"
                        defaultValue={leadContext.interest}
                        required
                        aria-required="true"
                        disabled={status === 'submitting'}
                      >
                        {services.map((service) => (
                          <option key={service.slug} value={service.slug}>
                            {service.title}
                          </option>
                        ))}
                      </Select>
                    </FormField>
                    <FormField
                      label="Message"
                      required
                      hint={contactFormCopy.messageHint}
                    >
                      <Textarea
                        key={leadContext.message || 'empty-message'}
                        name="message"
                        required
                        aria-required="true"
                        rows={leadContext.hasJourney ? 8 : 6}
                        defaultValue={leadContext.message}
                        placeholder="Tell us about your business and what you want to achieve."
                        disabled={status === 'submitting'}
                      />
                    </FormField>

                    {status === 'error' && errorMessage ? (
                      <div
                        className="rounded-uv-lg border border-uv-error/30 bg-uv-error/5 px-4 py-3 text-sm text-uv-error"
                        role="alert"
                        aria-live="assertive"
                      >
                        {errorMessage}
                      </div>
                    ) : null}

                    <div className="flex flex-col gap-2 pt-1">
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full sm:w-auto"
                        disabled={status === 'submitting'}
                      >
                        {status === 'submitting'
                          ? contactFormCopy.submitSending
                          : contactFormCopy.submitIdle}
                      </Button>
                      <p className="text-xs text-uv-foreground-muted sm:text-sm">
                        {contactFormCopy.submitHint}
                      </p>
                    </div>
                  </Form>
                )}
              </div>
            </Reveal>
          </div>
        </MarketingPageContainer>
      </MarketingSection>

      <MarketingSection tone="default" className="border-b-0">
        <MarketingPageContainer>
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
        </MarketingPageContainer>
      </MarketingSection>
    </MarketingContentPage>
  );
}
