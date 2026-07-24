'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { buttonVariants, cn, Icon } from '@uandv/ui';

import { trackEvent } from '@/lib/analytics';
import type { GuideLanguage, JourneyId } from '@/lib/business-guide';
import {
  buildBusinessSummary,
  buildRoadmapText,
  discoveryQuestions,
  formatProgressLabel,
  formatTimelineDays,
  getDiscoveryCopy,
  optionLabel,
  TOTAL_DISCOVERY_STEPS,
  type DiscoveryAnswers,
  type DiscoveryQuestionId,
} from '@/lib/discovery';
import { buildContactHref } from '@/lib/journey-lead';
import { siteConfig } from '@/lib/site';

type DiscoveryPhase = 'bridge' | 'questions' | 'summary';

type BusinessDiscoveryProps = {
  journeyId: JourneyId;
  journeyTitle: string;
  visitorType: string;
  interestSlug: string;
  guideLanguage: GuideLanguage;
  partnerType?: string;
  onClose: () => void;
};

const REASSURANCE_MS = 750;

export function BusinessDiscovery({
  journeyId,
  journeyTitle,
  visitorType,
  interestSlug,
  guideLanguage,
  onClose,
}: BusinessDiscoveryProps) {
  const copy = useMemo(
    () => getDiscoveryCopy(guideLanguage),
    [guideLanguage],
  );

  const [phase, setPhase] = useState<DiscoveryPhase>('bridge');
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<DiscoveryAnswers>({});
  const [transitionKey, setTransitionKey] = useState(0);
  const [reassurance, setReassurance] = useState<string | null>(null);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const question = discoveryQuestions[stepIndex];
  const progressPercent =
    phase === 'summary'
      ? 100
      : phase === 'bridge'
        ? 0
        : Math.round(((stepIndex + 1) / TOTAL_DISCOVERY_STEPS) * 100);

  const progressText = useMemo(() => {
    if (phase === 'bridge') return copy.progressBeginLabel;
    if (phase === 'summary') return copy.progressCompleteLabel;
    return formatProgressLabel(
      copy.progressConversationLabel,
      stepIndex + 1,
      TOTAL_DISCOVERY_STEPS,
    );
  }, [copy, phase, stepIndex]);

  useEffect(() => {
    trackEvent('discovery_started', {
      journey_id: journeyId,
      journey_name: journeyTitle,
      guide_language: guideLanguage,
    });
  }, [guideLanguage, journeyId, journeyTitle]);

  useEffect(() => {
    return () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    };
  }, []);

  const summary = useMemo(() => {
    if (phase !== 'summary') return null;
    return buildBusinessSummary({
      answers,
      journeyId,
      journeyTitle,
      copy,
    });
  }, [answers, copy, journeyId, journeyTitle, phase]);

  const goToStep = useCallback((index: number) => {
    setStepIndex(index);
    setTransitionKey((value) => value + 1);
  }, []);

  const pickReassurance = useCallback(
    (step: number) => {
      const messages = copy.reassuranceMessages;
      if (!messages.length) return null;
      return messages[step % messages.length] ?? messages[0];
    },
    [copy.reassuranceMessages],
  );

  const answerQuestion = useCallback(
    (questionId: DiscoveryQuestionId, optionId: string) => {
      if (reassurance) return;

      const nextAnswers = {
        ...answers,
        [questionId]: optionId,
      } as DiscoveryAnswers;
      setAnswers(nextAnswers);

      trackEvent('question_answered', {
        journey_id: journeyId,
        journey_name: journeyTitle,
        question_id: questionId,
        answer_id: optionId,
        step: stepIndex + 1,
      });

      const message = pickReassurance(stepIndex);
      setReassurance(message);

      if (advanceTimer.current) clearTimeout(advanceTimer.current);
      advanceTimer.current = setTimeout(() => {
        setReassurance(null);
        if (stepIndex >= TOTAL_DISCOVERY_STEPS - 1) {
          setPhase('summary');
          setTransitionKey((value) => value + 1);
          trackEvent('summary_generated', {
            journey_id: journeyId,
            journey_name: journeyTitle,
            industry: nextAnswers.industry,
            stage: nextAnswers.stage,
          });
          return;
        }
        goToStep(stepIndex + 1);
      }, REASSURANCE_MS);
    },
    [
      answers,
      goToStep,
      journeyId,
      journeyTitle,
      pickReassurance,
      reassurance,
      stepIndex,
    ],
  );

  const skipBudget = useCallback(() => {
    answerQuestion('budget', 'not-sure');
  }, [answerQuestion]);

  const downloadRoadmap = useCallback(() => {
    if (!summary) return;
    trackEvent('roadmap_download_clicked', {
      journey_id: journeyId,
      journey_name: journeyTitle,
    });
    const text = buildRoadmapText(summary, copy);
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'uv-growth-roadmap.txt';
    anchor.click();
    URL.revokeObjectURL(url);
  }, [copy, journeyId, journeyTitle, summary]);

  const emailReport = useCallback(() => {
    if (!summary) return;
    const body = encodeURIComponent(buildRoadmapText(summary, copy));
    const subject = encodeURIComponent(
      `U&V Growth Roadmap — ${summary.businessLabel}`,
    );
    window.location.assign(`mailto:?subject=${subject}&body=${body}`);
  }, [copy, summary]);

  const whatsappHref = useMemo(() => {
    if (!summary) return siteConfig.whatsapp;
    const text = encodeURIComponent(
      [
        'Hi U&V — I shared my business story with you.',
        '',
        buildRoadmapText(summary, copy),
      ].join('\n'),
    );
    const base = siteConfig.whatsapp.includes('?')
      ? `${siteConfig.whatsapp}&text=${text}`
      : `${siteConfig.whatsapp}?text=${text}`;
    return base;
  }, [copy, summary]);

  const consultationHref = buildContactHref({
    journey: journeyId,
    visitorType,
    guideLanguage,
    sourcePage: '/#business-discovery',
    cta: 'consultation',
    interestSlug,
    discovery: summary
      ? {
          industry: summary.businessLabel,
          stage: summary.stageLabel,
          goal: summary.goalLabel,
          challenge: summary.challengeLabel,
          readiness: String(summary.readinessPercent),
        }
      : undefined,
  });

  return (
    <div
      className="mt-6 w-full min-w-0 max-w-full rounded-uv-2xl border border-white/12 bg-black/25 p-4 shadow-[0_18px_50px_rgb(0_0_0_/_0.2)] sm:p-7"
      aria-live="polite"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium tracking-[0.08em] text-[#DDD6FE]">
            {copy.sectionBadge}
          </p>
          <p className="mt-1 text-sm text-[#EDE9FE]/90">{journeyTitle}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-uv-md text-sm text-[#C4B5FD] underline-offset-4 hover:underline uv-focus-ring"
        >
          {copy.restartLabel}
        </button>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between gap-3 text-sm text-[#EDE9FE]">
          <span>{progressText}</span>
          <span className="tabular-nums text-[#C4B5FD]">
            {`${progressPercent}%`}
          </span>
        </div>
        <div
          className="mt-2 h-2 overflow-hidden rounded-full bg-white/10"
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-uv-brand/90 transition-[width] duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div key={`${phase}-${transitionKey}`} className="discovery-fade mt-6">
        {phase === 'bridge' ? (
          <div>
            <h3 className="font-[family-name:var(--font-uv-display)] text-xl font-semibold text-white sm:text-2xl">
              {copy.bridgeTitle}
            </h3>
            <p className="mt-4 max-w-2xl whitespace-pre-line text-base leading-relaxed text-[#EDE9FE]">
              {copy.bridgeBody}
            </p>
            <p className="mt-4 text-sm text-[#C4B5FD]">
              {copy.changeAnswerHint}
            </p>
            <button
              type="button"
              onClick={() => {
                setPhase('questions');
                setStepIndex(0);
                setTransitionKey((value) => value + 1);
              }}
              className={cn(
                buttonVariants({ size: 'lg' }),
                'mt-6 w-full justify-center sm:w-auto',
              )}
            >
              {copy.startCta}
            </button>
          </div>
        ) : null}

        {phase === 'questions' && question ? (
          <div>
            <h3 className="font-[family-name:var(--font-uv-display)] text-xl font-semibold text-white sm:text-2xl">
              {copy.questions[question.id].prompt}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#C4B5FD]">
              {copy.questions[question.id].helper}
            </p>

            {reassurance ? (
              <p
                className="mt-4 text-sm font-medium text-[#DDD6FE] transition-opacity duration-300"
                role="status"
              >
                {reassurance}
              </p>
            ) : null}

            <div
              className="mt-5 grid gap-3 sm:grid-cols-2"
              role="listbox"
              aria-label={copy.questions[question.id].prompt}
            >
              {question.options.map((option) => {
                const selected =
                  answers[question.id] ===
                  (option.id as DiscoveryAnswers[DiscoveryQuestionId]);
                const group = question.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    disabled={Boolean(reassurance)}
                    onClick={() => answerQuestion(question.id, option.id)}
                    className={cn(
                      'rounded-uv-xl border px-4 py-3.5 text-left text-sm font-medium shadow-sm transition-all duration-200 uv-focus-ring sm:text-base',
                      selected
                        ? 'border-uv-brand/70 bg-uv-brand/25 text-white'
                        : 'border-white/12 bg-white/5 text-[#EDE9FE] hover:-translate-y-0.5 hover:border-uv-brand/35 hover:bg-white/10',
                      reassurance && 'opacity-70',
                    )}
                  >
                    {optionLabel(copy, group, option.id)}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {stepIndex > 0 && !reassurance ? (
                <button
                  type="button"
                  onClick={() => goToStep(stepIndex - 1)}
                  className="inline-flex items-center gap-1 rounded-uv-md text-sm text-[#C4B5FD] underline-offset-4 hover:underline uv-focus-ring"
                >
                  <Icon name="ChevronLeft" size="sm" />
                  {copy.backLabel}
                </button>
              ) : null}
              {question.optional && !reassurance ? (
                <button
                  type="button"
                  onClick={skipBudget}
                  className={cn(
                    buttonVariants({ size: 'md', variant: 'outline' }),
                    'border-white/25 bg-transparent text-white hover:bg-white/10',
                  )}
                >
                  {copy.skipBudgetLabel}
                </button>
              ) : null}
            </div>
          </div>
        ) : null}

        {phase === 'summary' && summary ? (
          <div>
            <p className="text-sm font-medium tracking-[0.08em] text-[#DDD6FE]">
              {copy.summaryEyebrow}
            </p>
            <h3 className="mt-2 font-[family-name:var(--font-uv-display)] text-xl font-semibold text-white sm:text-2xl">
              {copy.summaryTitle}
            </h3>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {(
                [
                  [copy.labelYourBusiness, summary.businessLabel],
                  [copy.labelCurrentStage, summary.stageLabel],
                  [copy.labelMainGoal, summary.goalLabel],
                  [copy.labelBiggestChallenge, summary.challengeLabel],
                  [copy.labelPreferredStart, summary.timelineLabel],
                  [copy.labelBudget, summary.budgetLabel],
                ] as const
              ).map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-uv-xl border border-white/10 bg-white/5 p-4"
                >
                  <p className="text-xs font-medium tracking-[0.1em] text-[#C4B5FD]">
                    {label}
                  </p>
                  <p className="mt-2 font-medium text-white">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-uv-xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs font-medium tracking-[0.1em] text-[#C4B5FD]">
                {copy.labelRecommendedServices}
              </p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {summary.services.map((service) => (
                  <li
                    key={service.id}
                    className="inline-flex items-center gap-2 text-sm text-[#EDE9FE]"
                  >
                    <Icon name="Check" size="sm" className="text-uv-brand" />
                    {service.labelKey}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-uv-xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-medium tracking-[0.1em] text-[#C4B5FD]">
                  {copy.labelEstimatedTimeline}
                </p>
                <p className="mt-2 font-[family-name:var(--font-uv-display)] text-2xl font-semibold text-white">
                  {formatTimelineDays(
                    copy.timelineDays,
                    summary.estimatedTimelineDays,
                  )}
                </p>
              </div>
              <div className="rounded-uv-xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-medium tracking-[0.1em] text-[#C4B5FD]">
                  {copy.labelBusinessReadiness}
                </p>
                <p className="mt-2 font-[family-name:var(--font-uv-display)] text-2xl font-semibold text-white">
                  {summary.readinessPercent}%
                </p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-uv-brand/90 transition-[width] duration-700"
                    style={{ width: `${summary.readinessPercent}%` }}
                  />
                </div>
              </div>
            </div>

            <p className="mt-5 rounded-uv-xl border border-uv-brand/25 bg-uv-brand/10 px-4 py-3 text-sm leading-relaxed text-[#EDE9FE]">
              {copy.disclaimer}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={downloadRoadmap}
                className={cn(
                  buttonVariants({ size: 'lg', variant: 'outline' }),
                  'w-full justify-center border-white/30 bg-transparent text-white hover:bg-white/10',
                )}
              >
                {copy.ctaDownloadRoadmap}
              </button>
              <Link
                href={consultationHref}
                onClick={() =>
                  trackEvent('consultation_clicked', {
                    journey_id: journeyId,
                    journey_name: journeyTitle,
                    source: 'discovery_summary',
                  })
                }
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'w-full justify-center',
                )}
              >
                {copy.ctaBookSession}
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent('whatsapp_clicked', {
                    journey_id: journeyId,
                    journey_name: journeyTitle,
                    source: 'discovery_summary',
                  })
                }
                className={cn(
                  buttonVariants({ size: 'lg', variant: 'secondary' }),
                  'w-full justify-center bg-white/10 text-white hover:bg-white/15',
                )}
              >
                {copy.ctaWhatsApp}
              </a>
              <button
                type="button"
                onClick={emailReport}
                className={cn(
                  buttonVariants({ size: 'lg', variant: 'outline' }),
                  'w-full justify-center border-white/30 bg-transparent text-white hover:bg-white/10',
                )}
              >
                {copy.ctaEmailReport}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
