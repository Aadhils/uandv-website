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
import { BusinessDiscovery } from '@/components/discovery/business-discovery';
import { trackEvent } from '@/lib/analytics';
import {
  defaultGuideLanguage,
  getBusinessGuide,
  guideLanguageEnglishLabels,
  guideLanguageNativeLabels,
  guideLanguages,
  type GuideLanguage,
  type JourneyId,
  type PartnerTypeId,
} from '@/lib/business-guide';
import { buildContactHref } from '@/lib/journey-lead';
import { siteConfig } from '@/lib/site';

/**
 * Homepage Business Guide — multilingual consultant experience.
 * The rest of the website stays English.
 */
export function SmartWelcomeHero() {
  const panelId = useId();
  const [guideLanguage, setGuideLanguage] = useState<GuideLanguage>(
    defaultGuideLanguage,
  );
  const [selectedJourneyId, setSelectedJourneyId] = useState<JourneyId | null>(
    null,
  );
  const [selectedPartnerType, setSelectedPartnerType] =
    useState<PartnerTypeId | null>(null);
  const [discoveryOpen, setDiscoveryOpen] = useState(false);

  const guide = useMemo(
    () => getBusinessGuide(guideLanguage),
    [guideLanguage],
  );

  const selectedJourney = useMemo(
    () => guide.journeys.find((journey) => journey.id === selectedJourneyId),
    [guide.journeys, selectedJourneyId],
  );

  const onLanguageChange = useCallback((language: GuideLanguage) => {
    setGuideLanguage(language);
    setSelectedJourneyId(null);
    setSelectedPartnerType(null);
    setDiscoveryOpen(false);
    trackEvent('guide_language_selected', {
      guide_language: language,
      journey_name: guideLanguageEnglishLabels[language],
    });
  }, []);

  const selectJourney = useCallback(
    (journeyId: JourneyId, title: string) => {
      setSelectedJourneyId((current: JourneyId | null) => {
        const next = current === journeyId ? null : journeyId;
        if (next) {
          trackEvent('journey_card_selected', {
            journey_name: title,
            journey_id: journeyId,
            guide_language: guideLanguage,
          });
          trackEvent('journey_panel_opened', {
            journey_name: title,
            journey_id: journeyId,
            guide_language: guideLanguage,
          });
          // Partner journey needs type selection first; others enter discovery.
          setDiscoveryOpen(journeyId !== 'partner-with-uandv');
        } else {
          setDiscoveryOpen(false);
        }
        return next;
      });
      setSelectedPartnerType(null);
    },
    [guideLanguage],
  );

  const onCtaClick = useCallback(
    (
      cta: 'continue' | 'consultation' | 'partner',
      journeyId: JourneyId,
      journeyName: string,
    ) => {
      const payload = {
        journey_name: journeyName,
        journey_id: journeyId,
        guide_language: guideLanguage,
        cta,
      };
      if (cta === 'partner') {
        trackEvent('partner_cta_clicked', payload);
      } else {
        trackEvent('consultation_cta_clicked', payload);
      }
    },
    [guideLanguage],
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
          quality={75}
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

        {/* Website brand layer — always English for SEO / brand consistency */}
        <p className="marketing-animate-in marketing-animate-in-delay-1 mt-6 text-sm font-medium uppercase tracking-[0.18em] text-[#C4B5FD]">
          U&V Technologies
        </p>
        <h1
          id="hero-heading"
          className="marketing-animate-in marketing-animate-in-delay-1 mt-3 max-w-3xl font-[family-name:var(--font-uv-display)] text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.25rem]"
        >
          Your Business Growth Partner
        </h1>
        <p className="marketing-animate-in marketing-animate-in-delay-2 mt-5 max-w-2xl text-base leading-relaxed text-[#EDE9FE] sm:text-lg">
          From idea and branding to software, AI, marketing, and growth —
          everything your business needs under one roof.
        </p>

        <div className="marketing-animate-in marketing-animate-in-delay-3 mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <a
            href="/signup"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'w-full justify-center sm:w-auto',
            )}
          >
            Get Started
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

        {/* Multilingual Business Guide — consultant experience */}
        <div
          className="marketing-animate-in marketing-animate-in-delay-3 mt-12 rounded-uv-2xl border border-white/15 bg-[#08152F]/75 p-5 backdrop-blur-sm sm:mt-14 sm:p-7"
          lang={guideLanguage === 'en' ? 'en' : guideLanguage}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#C4B5FD]">
                {guide.badge}
              </p>
              <p className="mt-2 font-[family-name:var(--font-uv-display)] text-lg font-semibold text-white sm:text-xl">
                {guide.languagePrompt}
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#EDE9FE]/90">
                {guide.languageHelper}
              </p>
            </div>
          </div>

          <div
            className="mt-5 flex flex-wrap gap-2"
            role="radiogroup"
            aria-label={guide.languagePrompt}
          >
            {guideLanguages.map((code) => {
              const selected = guideLanguage === code;
              return (
                <button
                  key={code}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => onLanguageChange(code)}
                  className={cn(
                    'rounded-uv-full border px-4 py-2 text-sm font-medium transition-colors uv-focus-ring',
                    selected
                      ? 'border-uv-brand bg-uv-brand text-white'
                      : 'border-white/20 bg-white/5 text-[#EDE9FE] hover:border-uv-brand/50 hover:bg-white/10',
                  )}
                >
                  <span className="block leading-tight">
                    {guideLanguageNativeLabels[code]}
                  </span>
                  <span className="block text-[11px] font-normal opacity-80">
                    {guideLanguageEnglishLabels[code]}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="mt-6 text-base leading-relaxed text-[#EDE9FE] sm:text-lg">
            {guide.greeting}
          </p>

          <h2 className="mt-8 font-[family-name:var(--font-uv-display)] text-xl font-semibold text-white sm:text-2xl">
            {guide.question}
          </h2>

          <div
            className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
            role="radiogroup"
            aria-label={guide.question}
          >
            {guide.journeys.map((journey) => {
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

          <p className="mt-4 text-sm text-[#C4B5FD]/90">{guide.scrollHint}</p>

          {selectedJourney ? (
            <div
              id={panelId}
              role="region"
              aria-label={`${guide.panelEyebrow}: ${selectedJourney.title}`}
              className="mt-6"
            >
              <div className="rounded-uv-2xl border border-white/15 bg-black/25 p-5 sm:p-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#C4B5FD]">
                      {guide.panelEyebrow}
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
                      setDiscoveryOpen(false);
                    }}
                  >
                    {guide.clearSelection}
                  </button>
                </div>

                <p className="mt-4 text-base leading-relaxed text-[#EDE9FE]">
                  {selectedJourney.consultantIntro}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#C4B5FD]">
                  {selectedJourney.reassurance}
                </p>

                {selectedJourney.steps && !discoveryOpen ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {selectedJourney.steps.map((step) => (
                      <span
                        key={step.id}
                        className="rounded-uv-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-[#EDE9FE]"
                      >
                        {step.label}
                      </span>
                    ))}
                  </div>
                ) : null}

                {selectedJourney.partnerTypes ? (
                  <div className="mt-6">
                    <p className="text-sm font-medium text-white">
                      {guide.partnerPrompt}
                    </p>
                    <div
                      className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
                      role="radiogroup"
                      aria-label={guide.partnerPrompt}
                    >
                      {selectedJourney.partnerTypes.map((partner) => {
                        const selected = selectedPartnerType === partner.id;
                        return (
                          <button
                            key={partner.id}
                            type="button"
                            role="radio"
                            aria-checked={selected}
                            onClick={() => {
                              setSelectedPartnerType(partner.id);
                              setDiscoveryOpen(true);
                            }}
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

                {!discoveryOpen &&
                selectedJourney.id !== 'partner-with-uandv' ? (
                  <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => setDiscoveryOpen(true)}
                      className={cn(
                        buttonVariants({ size: 'lg' }),
                        'w-full justify-center sm:w-auto',
                      )}
                    >
                      {guide.ctaContinue}
                    </button>
                    <Link
                      href={buildContactHref({
                        journey: selectedJourney.id,
                        visitorType: selectedJourney.visitorType,
                        guideLanguage,
                        sourcePage: '/',
                        cta: 'consultation',
                        interestSlug: selectedJourney.interestSlug,
                      })}
                      onClick={() =>
                        onCtaClick(
                          'consultation',
                          selectedJourney.id,
                          selectedJourney.title,
                        )
                      }
                      className={cn(
                        buttonVariants({ size: 'lg', variant: 'outline' }),
                        'w-full justify-center border-white/40 bg-transparent text-white hover:bg-white/10 sm:w-auto',
                      )}
                    >
                      {guide.ctaConsultation}
                    </Link>
                  </div>
                ) : null}
              </div>

              {discoveryOpen ? (
                <BusinessDiscovery
                  key={`${selectedJourney.id}-${guideLanguage}`}
                  journeyId={selectedJourney.id}
                  journeyTitle={selectedJourney.title}
                  visitorType={selectedJourney.visitorType}
                  interestSlug={selectedJourney.interestSlug}
                  guideLanguage={guideLanguage}
                  onClose={() => setDiscoveryOpen(false)}
                />
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
