'use client';

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
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
import { HomeHeroBackgroundVideo } from '@/components/marketing/home-hero-background-video';
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

type GoalCardAccent = {
  curiosity: string;
  actionLabel: string;
  accentA: string;
  accentB: string;
  accentGlow: string;
  iconTile: string;
  iconTileHover: string;
  arrow: string;
};

const GOAL_CARD_META: Record<WizardGoalId, GoalCardAccent> = {
  'start-new-business': {
    curiosity: 'founders',
    actionLabel: 'Start your journey',
    accentA: '#A78BFA',
    accentB: '#E879F9',
    accentGlow: 'rgb(167 139 250 / 0.38)',
    iconTile: 'bg-[#C4B5FD]/18 text-[#E9D5FF]',
    iconTileHover: 'group-hover:bg-[#C4B5FD]/30 group-hover:text-white',
    arrow: 'text-[#E9D5FF]',
  },
  'grow-existing-business': {
    curiosity: 'growing teams',
    actionLabel: 'Build your growth plan',
    accentA: '#7C3AED',
    accentB: '#22D3EE',
    accentGlow: 'rgb(34 211 238 / 0.3)',
    iconTile: 'bg-[#7C3AED]/22 text-[#A78BFA]',
    iconTileHover: 'group-hover:bg-[#7C3AED]/38 group-hover:text-[#67E8F9]',
    arrow: 'text-[#67E8F9]',
  },
  'build-software-or-app': {
    curiosity: 'digital transformation',
    actionLabel: 'Shape your solution',
    accentA: '#6366F1',
    accentB: '#3B82F6',
    accentGlow: 'rgb(59 130 246 / 0.32)',
    iconTile: 'bg-[#4338CA]/28 text-[#C7D2FE]',
    iconTileHover: 'group-hover:bg-[#4338CA]/42 group-hover:text-[#93C5FD]',
    arrow: 'text-[#93C5FD]',
  },
  'automate-with-ai': {
    curiosity: 'saving time',
    actionLabel: 'Find what to automate',
    accentA: '#8B5CF6',
    accentB: '#2DD4BF',
    accentGlow: 'rgb(45 212 191 / 0.3)',
    iconTile: 'bg-[#7C3AED]/22 text-[#DDD6FE]',
    iconTileHover: 'group-hover:bg-[#6D28D9]/38 group-hover:text-[#5EEAD4]',
    arrow: 'text-[#5EEAD4]',
  },
  'partner-with-uandv': {
    curiosity: 'collaboration',
    actionLabel: 'Explore partnership',
    accentA: '#7C3AED',
    accentB: '#FB7185',
    accentGlow: 'rgb(251 113 133 / 0.3)',
    iconTile: 'bg-[#5B21B6]/32 text-[#F5D0FE]',
    iconTileHover: 'group-hover:bg-[#5B21B6]/48 group-hover:text-[#FECDD3]',
    arrow: 'text-[#FECDD3]',
  },
};

function JourneyGoalCard({
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
  const meta = GOAL_CARD_META[goalId];

  return (
    <div
      className={cn(
        'hero-goal-card-shell relative h-full min-w-0 w-full rounded-uv-2xl',
        selected && 'is-selected',
      )}
      style={
        {
          '--hero-goal-glow': meta.accentGlow,
          '--hero-goal-a': meta.accentA,
          '--hero-goal-b': meta.accentB,
        } as CSSProperties
      }
    >
      <span className="hero-goal-card-depth" aria-hidden />
      <button
        id={`journey-card-${goalId}`}
        type="button"
        aria-pressed={selected}
        aria-expanded={selected}
        aria-controls={selected ? panelId : undefined}
        onClick={onSelect}
        className={cn(
          'hero-goal-card group relative z-[1] flex h-full min-h-11 min-w-0 w-full cursor-pointer flex-col overflow-hidden rounded-uv-2xl p-3.5 text-left sm:p-4',
          'uv-focus-ring focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4B5FD]',
          selected && 'is-selected',
        )}
      >
        <span className="hero-goal-card-edge" aria-hidden />
        <span className="hero-goal-card-sheen" aria-hidden />
        <span className="hero-goal-card-radial" aria-hidden />
        <span className="hero-goal-card-accent-line" aria-hidden />

        {selected ? (
          <span className="hero-goal-card-badge">Selected</span>
        ) : null}

        <span
          className={cn(
            'hero-goal-card-icon relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-uv-lg',
            meta.iconTile,
            meta.iconTileHover,
            selected && 'is-selected bg-uv-brand text-white',
          )}
        >
          <span className="hero-goal-card-icon-pulse" aria-hidden />
          <Icon name={icon as IconName} size="md" className="relative z-[1]" />
        </span>

        <span className="relative mt-3 break-words font-[family-name:var(--font-uv-display)] text-sm font-semibold leading-snug text-white sm:mt-3.5 sm:text-base">
          {title}
        </span>
        <span className="relative mt-1.5 flex-1 break-words text-xs leading-relaxed text-[#EDE9FE] sm:mt-2 sm:text-sm">
          {description}
        </span>

        <span className="hero-goal-card-footer relative mt-3 flex min-h-11 flex-col justify-end gap-1 sm:mt-4 sm:min-h-0">
          <span className="hero-goal-card-curiosity text-[0.65rem] font-medium uppercase tracking-[0.12em] text-[#C4B5FD]/75 sm:text-[0.7rem]">
            {meta.curiosity}
          </span>
          <span
            className={cn(
              'hero-goal-card-action inline-flex items-center gap-1 text-xs font-semibold',
              meta.arrow,
            )}
          >
            <span>{meta.actionLabel}</span>
            <span className="hero-goal-card-arrow" aria-hidden>
              →
            </span>
          </span>
        </span>
      </button>
    </div>
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

  return (
    <section
      className="relative isolate flex min-h-[min(100dvh,920px)] w-full max-w-full overflow-x-clip bg-uv-hero text-white"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 overflow-hidden">
        <HomeHeroBackgroundVideo />
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
                      <JourneyGoalCard
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
                  <JourneyGoalCard
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
