'use client';

import Image from 'next/image';
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';

import {
  buttonVariants,
  cn,
  Icon,
  type IconName,
} from '@uandv/ui';

import { Logo } from '@/components/brand/logo';
import { DiscoveryWizard } from '@/components/discovery-wizard';
import { HeroCinematicLayers } from '@/components/marketing/hero-cinematic-layers';
import { trackEvent } from '@/lib/analytics';
import {
  clearWizardSession,
  loadWizardSession,
  startWizardSession,
  subscribeWizardSession,
  trackWizardEvent,
  type WizardGoalId,
  type WizardSession,
  WIZARD_GOALS,
} from '@/lib/discovery-wizard';
import {
  defaultGuideLanguage,
  getBusinessGuide,
} from '@/lib/business-guide';
import { contactInquiryHref } from '@/lib/site';

function subscribeDesktopGuide(onStoreChange: () => void) {
  const media = window.matchMedia('(min-width: 1024px)');
  media.addEventListener('change', onStoreChange);
  return () => media.removeEventListener('change', onStoreChange);
}

function getDesktopGuideSnapshot() {
  return window.matchMedia('(min-width: 1024px)').matches;
}

function useIsDesktopGuide() {
  return useSyncExternalStore(
    subscribeDesktopGuide,
    getDesktopGuideSnapshot,
    () => false,
  );
}

function readActiveWizardSession(): WizardSession | null {
  const existing = loadWizardSession();
  if (!existing || existing.status === 'abandoned') return null;
  return existing;
}

function useWizardSessionStore() {
  return useSyncExternalStore(
    subscribeWizardSession,
    readActiveWizardSession,
    () => null,
  );
}

function JourneyCardButton({
  goalId,
  title,
  description,
  icon,
  selected,
  panelId,
  onSelect,
}: {
  goalId: WizardGoalId;
  title: string;
  description: string;
  icon: string;
  selected: boolean;
  panelId: string;
  onSelect: () => void;
}) {
  return (
    <button
      id={`journey-card-${goalId}`}
      type="button"
      aria-pressed={selected}
      aria-expanded={selected}
      aria-controls={selected ? panelId : undefined}
      onClick={onSelect}
      className={cn(
        'group marketing-card-lift marketing-card-premium flex h-full min-w-0 w-full flex-col rounded-uv-2xl border p-4 text-left transition-all duration-300 uv-focus-ring sm:p-5',
        selected
          ? 'border-uv-brand bg-uv-brand/25 shadow-[0_12px_40px_rgb(124_58_237_/_0.25)] ring-1 ring-uv-brand/40'
          : 'border-white/15 bg-white/5 hover:border-uv-brand/50 hover:bg-white/10 hover:shadow-[0_8px_24px_rgb(0_0_0_/_0.2)]',
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
        <Icon name={icon as IconName} size="md" />
      </span>
      <span className="mt-4 break-words font-[family-name:var(--font-uv-display)] text-base font-semibold text-white">
        {title}
      </span>
      <span className="mt-2 break-words text-sm leading-relaxed text-[#EDE9FE]/90">
        {description}
      </span>
    </button>
  );
}

/**
 * Homepage Business Guide — goal cards launch a focused discovery wizard.
 * Wizard opens only after an explicit card click or Resume — never on load.
 */
export function SmartWelcomeHero() {
  const panelId = useId();
  const isDesktop = useIsDesktopGuide();
  const guide = useMemo(() => getBusinessGuide(defaultGuideLanguage), []);
  const wizardAnchorRef = useRef<HTMLDivElement | null>(null);

  const storedSession = useWizardSessionStore();
  /** Active session only after the user explicitly starts or resumes. */
  const [activeSession, setActiveSession] = useState<WizardSession | null>(
    null,
  );

  const selectedGoalId = activeSession?.goalId ?? null;
  const showResume =
    Boolean(storedSession) &&
    !activeSession &&
    storedSession?.status !== 'abandoned';

  const selectGoal = useCallback(
    (goalId: WizardGoalId, title: string) => {
      if (activeSession?.goalId === goalId) {
        return;
      }

      trackEvent('journey_card_selected', {
        journey_name: title,
        journey_id: goalId,
        guide_language: defaultGuideLanguage,
      });
      trackWizardEvent('goal_selected', { goal_id: goalId });
      trackWizardEvent('wizard_started', { goal_id: goalId });

      const next = startWizardSession(goalId);
      setActiveSession(next);
    },
    [activeSession],
  );

  const resumeSession = useCallback(() => {
    const existing = loadWizardSession();
    if (!existing || existing.status === 'abandoned') return;
    trackWizardEvent('wizard_resumed', { goal_id: existing.goalId });
    setActiveSession(existing);
  }, []);

  const clearGoal = useCallback(() => {
    clearWizardSession();
    setActiveSession(null);
  }, []);

  const onSessionChange = useCallback((next: WizardSession) => {
    setActiveSession(next);
  }, []);

  useEffect(() => {
    if (!activeSession?.goalId || !wizardAnchorRef.current) return;

    const node = wizardAnchorRef.current;
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const frame = window.requestAnimationFrame(() => {
      node.scrollIntoView({
        behavior: prefersReduced ? 'auto' : 'smooth',
        block: 'start',
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [activeSession?.goalId, isDesktop]);

  const wizard = activeSession ? (
    <div ref={wizardAnchorRef} className="w-full min-w-0 scroll-mt-24">
      <DiscoveryWizard
        id={panelId}
        session={activeSession}
        onSessionChange={onSessionChange}
        onChangeGoal={clearGoal}
        onExit={clearGoal}
      />
    </div>
  ) : null;

  const goals =
    guide.journeys.length > 0
      ? guide.journeys.map((journey) => ({
          id: journey.id,
          title: journey.title,
          description: journey.description,
          icon: journey.icon,
        }))
      : WIZARD_GOALS;

  const resumeLabel =
    Boolean(storedSession) && storedSession?.status !== 'abandoned'
      ? 'Continue My Business Journey'
      : 'Start with U&V';

  const resumeControl = showResume ? (
    <div className="mt-5 flex w-full min-w-0 justify-start">
      <button
        type="button"
        onClick={resumeSession}
        className={cn(
          buttonVariants({ size: 'sm', variant: 'outline' }),
          'max-w-full border-white/25 bg-white/5 text-white hover:bg-white/10',
        )}
      >
        {resumeLabel}
      </button>
    </div>
  ) : null;

  const heroVideoUrl = process.env.NEXT_PUBLIC_HERO_VIDEO_URL;

  return (
    <section
      className="relative isolate flex min-h-[min(100dvh,920px)] w-full max-w-full overflow-x-clip bg-uv-hero text-white"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 overflow-hidden">
        {heroVideoUrl ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=75"
            className="marketing-hero-media absolute inset-0 h-full w-full object-cover object-center"
            aria-hidden
          >
            <source src={heroVideoUrl} type="video/mp4" />
          </video>
        ) : (
          <Image
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=75"
            alt="Circuit board technology representing software, AI, and digital systems"
            fill
            priority
            quality={70}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1400px"
            className="marketing-hero-media object-cover object-center"
          />
        )}
        <div
          className="absolute inset-0 bg-gradient-to-t from-uv-hero via-uv-hero/90 to-uv-navy-blue/50"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-uv-hero/95 via-[#3B1C78]/55 to-transparent"
          aria-hidden
        />
        <HeroCinematicLayers />
        <div className="marketing-hero-grid absolute inset-0" aria-hidden />
        <div
          className="marketing-orb marketing-pulse-glow -left-20 top-16 h-64 w-64 bg-[#7c3aed]/35"
          aria-hidden
        />
        <div
          className="marketing-orb marketing-float-delayed right-0 top-1/4 h-72 w-72 bg-[#102A56]/45"
          aria-hidden
        />
      </div>

      <div className="relative mx-auto flex w-full min-w-0 max-w-7xl flex-col justify-center px-4 pb-14 pt-24 sm:px-6 sm:pb-20 sm:pt-28 lg:px-8 lg:pb-24 lg:pt-32">
        <div className="marketing-animate-in min-w-0">
          <Logo invert size="hero" className="max-w-full text-white" />
        </div>

        <p className="marketing-animate-in marketing-animate-in-delay-1 mt-6 max-w-full break-words text-sm font-medium uppercase tracking-[0.16em] text-uv-hero-accent sm:tracking-[0.18em]">
          U&V Technologies
        </p>
        <h1
          id="hero-heading"
          className="marketing-animate-in marketing-animate-in-delay-1 mt-4 max-w-4xl break-words font-[family-name:var(--font-uv-display)] text-[1.875rem] font-bold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.35rem]"
        >
          Your Business Growth Partner
        </h1>
        <p className="marketing-animate-in marketing-animate-in-delay-2 mt-5 max-w-2xl break-words text-base leading-relaxed text-uv-hero-muted sm:mt-6 sm:text-lg md:text-xl">
          More than a software company — U&amp;V is your long-term business
          growth partner. From idea and branding to software, AI, marketing,
          and scale, everything your business needs under one roof.
        </p>
        <p className="marketing-animate-in marketing-animate-in-delay-2 mt-4 max-w-2xl text-sm font-medium leading-relaxed text-[#C4B5FD] sm:text-base">
          Technology · Business · Growth · Trust
        </p>

        <div className="marketing-animate-in marketing-animate-in-delay-3 mt-8 flex w-full min-w-0 flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <a
            href={contactInquiryHref}
            className={cn(
              buttonVariants({ size: 'lg' }),
              'marketing-btn-glow w-full max-w-full justify-center sm:w-auto',
            )}
          >
            Book a Free Consultation
          </a>
        </div>

        <div className="marketing-animate-in marketing-animate-in-delay-3 mt-10 w-full min-w-0 max-w-full rounded-uv-2xl border border-white/15 marketing-glass-dark marketing-gradient-border p-4 sm:mt-12 sm:p-7">
          <div className="min-w-0">
            <p className="text-sm font-medium uppercase tracking-[0.14em] text-[#C4B5FD] sm:tracking-[0.16em]">
              {guide.badge}
            </p>
            <p className="mt-6 break-words text-base leading-relaxed text-[#EDE9FE] sm:text-lg">
              {guide.greeting}
            </p>
            <h2 className="mt-8 break-words font-[family-name:var(--font-uv-display)] text-xl font-semibold text-white sm:text-2xl">
              {guide.question}
            </h2>
          </div>

          {!isDesktop ? (
            <>
              {resumeControl}
              <div
                className="mt-5 flex w-full min-w-0 flex-col gap-3"
                role="group"
                aria-label={guide.question}
              >
                {goals.map((goal) => {
                  const selected = selectedGoalId === goal.id;
                  return (
                    <div
                      key={goal.id}
                      className="flex min-w-0 flex-col gap-3"
                    >
                      <JourneyCardButton
                        goalId={goal.id}
                        title={goal.title}
                        description={goal.description}
                        icon={goal.icon}
                        selected={selected}
                        panelId={panelId}
                        onSelect={() => selectGoal(goal.id, goal.title)}
                      />
                      {selected ? wizard : null}
                    </div>
                  );
                })}
              </div>
              <p className="mt-4 break-words text-sm text-[#C4B5FD]/90">
                {guide.scrollHint}
              </p>
            </>
          ) : (
            <>
              {resumeControl}
              <div
                className="mt-5 grid w-full min-w-0 grid-cols-5 gap-3"
                role="group"
                aria-label={guide.question}
              >
                {goals.map((goal) => (
                  <JourneyCardButton
                    key={goal.id}
                    goalId={goal.id}
                    title={goal.title}
                    description={goal.description}
                    icon={goal.icon}
                    selected={selectedGoalId === goal.id}
                    panelId={panelId}
                    onSelect={() => selectGoal(goal.id, goal.title)}
                  />
                ))}
              </div>
              <p className="mt-4 break-words text-sm text-[#C4B5FD]/90">
                {guide.scrollHint}
              </p>
              {wizard ? <div className="mt-6 max-w-4xl">{wizard}</div> : null}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
