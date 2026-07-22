'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useId, useMemo, useState } from 'react';

import {
  buttonVariants,
  cn,
  Icon,
  type IconName,
} from '@uandv/ui';

import { Logo } from '@/components/brand/logo';
import { trackEvent } from '@/lib/analytics';
import {
  defaultLocale,
  getMessages,
  localeLabels,
  supportedLocales,
  type JourneyId,
  type Locale,
  type PartnerTypeId,
} from '@/lib/i18n';
import { buildContactHref } from '@/lib/journey-lead';
import { siteConfig } from '@/lib/site';

type SmartWelcomeHeroProps = {
  locale?: Locale;
};

export function SmartWelcomeHero({
  locale = defaultLocale,
}: SmartWelcomeHeroProps) {
  const copy = getMessages(locale).smartWelcome;
  const panelId = useId();
  const [selectedJourneyId, setSelectedJourneyId] = useState<JourneyId | null>(
    null,
  );
  const [selectedPartnerType, setSelectedPartnerType] =
    useState<PartnerTypeId | null>(null);
  const [preferredLanguage, setPreferredLanguage] =
    useState<Locale>(locale);

  const selectedJourney = useMemo(
    () => copy.journeys.find((journey) => journey.id === selectedJourneyId),
    [copy.journeys, selectedJourneyId],
  );

  const selectJourney = useCallback(
    (journeyId: JourneyId, title: string) => {
      setSelectedJourneyId((current: JourneyId | null) => {
        const next = current === journeyId ? null : journeyId;
        if (next) {
          trackEvent('journey_card_selected', {
            journey_name: title,
            journey_id: journeyId,
          });
          trackEvent('journey_panel_opened', {
            journey_name: title,
            journey_id: journeyId,
          });
        }
        return next;
      });
      setSelectedPartnerType(null);
    },
    [],
  );

  const onCtaClick = useCallback(
    (
      cta: 'continue' | 'consultation' | 'partner',
      journeyId: JourneyId,
      journeyName: string,
    ) => {
      if (cta === 'consultation') {
        trackEvent('consultation_cta_clicked', {
          journey_name: journeyName,
          journey_id: journeyId,
          cta,
        });
      } else if (cta === 'partner') {
        trackEvent('partner_cta_clicked', {
          journey_name: journeyName,
          journey_id: journeyId,
          cta,
        });
      } else {
        trackEvent('consultation_cta_clicked', {
          journey_name: journeyName,
          journey_id: journeyId,
          cta: 'continue',
        });
      }
    },
    [],
  );

  return (
    <section
      className="relative isolate overflow-hidden bg-[#08152F] text-white"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2400&q=80"
          alt="Circuit board technology representing software, AI, and digital systems"
          fill
          priority
          sizes="100vw"
          className="marketing-hero-media object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#08152F] via-[#08152F]/90 to-[#102A56]/50"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#08152F]/95 via-[#3B1C78]/55 to-transparent"
          aria-hidden
        />
        <div className="marketing-hero-grid absolute inset-0" aria-hidden />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col px-4 pb-16 pt-28 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="marketing-animate-in">
          <Logo invert size="hero" className="text-white" />
        </div>

        <p className="marketing-animate-in marketing-animate-in-delay-1 mt-6 text-sm font-medium uppercase tracking-[0.18em] text-[#C4B5FD]">
          {copy.brandEyebrow}
        </p>

        <h1
          id="hero-heading"
          className="marketing-animate-in marketing-animate-in-delay-1 mt-3 max-w-3xl font-[family-name:var(--font-uv-display)] text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem]"
        >
          {copy.heading}
        </h1>

        <p className="marketing-animate-in marketing-animate-in-delay-2 mt-5 max-w-2xl text-base leading-relaxed text-[#EDE9FE] sm:text-lg">
          {copy.supportingText}
        </p>

        <div className="marketing-animate-in marketing-animate-in-delay-3 mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <a
            href="/contact"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'w-full justify-center sm:w-auto',
            )}
          >
            Start your project
          </a>
          <a
            href={siteConfig.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ size: 'lg', variant: 'outline' }),
              'w-full justify-center border-white/40 bg-transparent text-white hover:bg-white/10 sm:w-auto',
            )}
          >
            Chat on WhatsApp
          </a>
        </div>

        <div className="marketing-animate-in marketing-animate-in-delay-3 mt-12 sm:mt-14">
          <h2 className="font-[family-name:var(--font-uv-display)] text-xl font-semibold text-white sm:text-2xl">
            {copy.question}
          </h2>

          <div
            className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
            role="radiogroup"
            aria-label={copy.question}
          >
            {copy.journeys.map((journey) => {
              const selected = selectedJourneyId === journey.id;
              return (
                <button
                  key={journey.id}
                  id={`journey-card-${journey.id}`}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  aria-controls={panelId}
                  onClick={() => selectJourney(journey.id, journey.title)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      selectJourney(journey.id, journey.title);
                    }
                  }}
                  className={cn(
                    'group flex h-full flex-col rounded-uv-2xl border p-4 text-left transition-colors duration-200 uv-focus-ring sm:p-5',
                    selected
                      ? 'border-uv-brand bg-uv-brand/25 shadow-[0_0_0_1px_rgb(124_58_237_/_0.45)]'
                      : 'border-white/15 bg-white/5 hover:border-uv-brand/50 hover:bg-white/10',
                  )}
                >
                  <span
                    className={cn(
                      'inline-flex h-11 w-11 items-center justify-center rounded-uv-lg transition-colors',
                      selected
                        ? 'bg-uv-brand text-white'
                        : 'bg-white/10 text-[#C4B5FD] group-hover:bg-uv-brand/30 group-hover:text-white',
                    )}
                  >
                    <Icon name={journey.icon as IconName} size="md" />
                  </span>
                  <span className="mt-4 font-[family-name:var(--font-uv-display)] text-base font-semibold text-white">
                    {journey.title}
                  </span>
                  <span className="mt-2 text-sm leading-relaxed text-[#EDE9FE]/90">
                    {journey.description}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="mt-4 text-sm text-[#C4B5FD]/90">{copy.scrollHint}</p>
        </div>

        {selectedJourney ? (
          <div
            id={panelId}
            role="region"
            aria-label={`${copy.panelTitle}: ${selectedJourney.title}`}
            className="mt-6 rounded-uv-2xl border border-white/15 bg-[#08152F]/80 p-5 backdrop-blur-sm sm:mt-8 sm:p-7"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#C4B5FD]">
                  {copy.panelTitle}
                </p>
                <h3 className="mt-2 font-[family-name:var(--font-uv-display)] text-xl font-semibold text-white sm:text-2xl">
                  {selectedJourney.title}
                </h3>
              </div>
              <button
                type="button"
                className="self-start text-sm text-[#C4B5FD] underline-offset-4 hover:underline uv-focus-ring rounded-uv-md"
                onClick={() => {
                  setSelectedJourneyId(null);
                  setSelectedPartnerType(null);
                }}
              >
                Clear selection
              </button>
            </div>

            {selectedJourney.steps ? (
              <div className="mt-6">
                <p className="text-sm font-medium text-[#EDE9FE]">
                  {copy.stepsLabel}
                </p>
                <ol className="mt-4 flex flex-wrap gap-2">
                  {selectedJourney.steps.map((step, index) => (
                    <li
                      key={step.id}
                      className="inline-flex items-center gap-2 rounded-uv-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-white"
                    >
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-uv-brand/80 text-[11px] font-semibold">
                        {index + 1}
                      </span>
                      {step.label}
                      {index < selectedJourney.steps!.length - 1 ? (
                        <Icon
                          name="ChevronRight"
                          size="xs"
                          className="text-[#C4B5FD]"
                        />
                      ) : null}
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}

            {selectedJourney.partnerTypes ? (
              <div className="mt-6">
                <p className="text-sm font-medium text-[#EDE9FE]">
                  {copy.partnerPrompt}
                </p>
                <div
                  className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
                  role="radiogroup"
                  aria-label={copy.partnerPrompt}
                >
                  {selectedJourney.partnerTypes.map((partner) => {
                    const selected = selectedPartnerType === partner.id;
                    return (
                      <button
                        key={partner.id}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() =>
                          setSelectedPartnerType(
                            (current: PartnerTypeId | null) =>
                              current === partner.id ? null : partner.id,
                          )
                        }
                        className={cn(
                          'rounded-uv-xl border p-4 text-left transition-colors uv-focus-ring',
                          selected
                            ? 'border-uv-brand bg-uv-brand/25'
                            : 'border-white/15 bg-white/5 hover:border-uv-brand/40 hover:bg-white/10',
                        )}
                      >
                        <span className="block font-medium text-white">
                          {partner.label}
                        </span>
                        <span className="mt-1 block text-sm text-[#EDE9FE]/90">
                          {partner.description}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}

            <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
              <label className="block max-w-xs text-sm text-[#EDE9FE]">
                <span className="mb-1.5 block">{copy.languageHint}</span>
                <select
                  value={preferredLanguage}
                  onChange={(event) =>
                    setPreferredLanguage(event.target.value as Locale)
                  }
                  className="w-full rounded-uv-lg border border-white/20 bg-[#08152F] px-3 py-2 text-white uv-focus-ring"
                >
                  {supportedLocales.map((code) => (
                    <option key={code} value={code}>
                      {localeLabels[code]}
                      {code === 'en' ? '' : ' (Sprint 2)'}
                    </option>
                  ))}
                </select>
              </label>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                {(
                  [
                    {
                      key: 'continue' as const,
                      label: copy.ctaContinue,
                      variant: 'outline' as const,
                    },
                    {
                      key: 'consultation' as const,
                      label: copy.ctaConsultation,
                      variant: 'primary' as const,
                    },
                    {
                      key: 'partner' as const,
                      label: copy.ctaPartner,
                      variant: 'secondary' as const,
                    },
                  ] as const
                ).map((cta) => {
                  const href = buildContactHref({
                    journey: selectedJourney.id,
                    visitorType: selectedJourney.visitorType,
                    partnerType:
                      selectedJourney.id === 'partner-with-uandv'
                        ? selectedPartnerType ?? undefined
                        : undefined,
                    preferredLanguage,
                    sourcePage: '/',
                    cta: cta.key,
                    interestSlug: selectedJourney.interestSlug,
                  });

                  return (
                    <Link
                      key={cta.key}
                      href={href}
                      onClick={() =>
                        onCtaClick(
                          cta.key,
                          selectedJourney.id,
                          selectedJourney.title,
                        )
                      }
                      className={cn(
                        buttonVariants({
                          size: 'lg',
                          variant:
                            cta.variant === 'primary'
                              ? 'primary'
                              : cta.variant === 'outline'
                                ? 'outline'
                                : 'secondary',
                        }),
                        'w-full justify-center sm:w-auto',
                        cta.variant === 'outline' &&
                          'border-white/40 bg-transparent text-white hover:bg-white/10',
                        cta.variant === 'secondary' &&
                          'bg-white/10 text-white hover:bg-white/15',
                      )}
                    >
                      {cta.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
