'use client';

import Link from 'next/link';
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';

import { buttonVariants, cn } from '@uandv/ui';

import {
  buildDemoLeadPreview,
  buildWizardSummary,
  clampStepIndex,
  createCrmLeadFromWizard,
  estimateRemainingSeconds,
  formatRemainingTime,
  getActiveQuestions,
  getWizardFlow,
  saveWizardSession,
  trackWizardEvent,
  validateWizardStep,
  type DemoLeadPreview,
  type WizardAnswerValue,
  type WizardGoalId,
  type WizardSession,
} from '@/lib/discovery-wizard';
import { runAdvisorEngine } from '@/lib/advisor-engine';
import { useRouter } from 'next/navigation';

import {
  WizardNavButton,
  WizardQuestionField,
} from './wizard-question-field';
import {
  DemoLeadModal,
  WizardSummaryPanel,
} from './wizard-summary-panel';

type DiscoveryWizardProps = {
  session: WizardSession;
  onSessionChange: (session: WizardSession) => void;
  onChangeGoal: () => void;
  onExit: () => void;
  className?: string;
  id?: string;
};

export function DiscoveryWizard({
  session,
  onSessionChange,
  onChangeGoal,
  onExit,
  className,
  id,
}: DiscoveryWizardProps) {
  const generatedId = useId();
  const panelId = id ?? generatedId;
  const liveId = useId();
  const questionAnchorRef = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [liveMessage, setLiveMessage] = useState('');
  const [generating, setGenerating] = useState(false);
  const [analysisHref, setAnalysisHref] = useState<string | null>(null);
  const [demoLead, setDemoLead] = useState<DemoLeadPreview | null>(null);
  const [phase, setPhase] = useState<'questions' | 'summary'>(
    session.status === 'completed' ? 'summary' : 'questions',
  );

  const flow = useMemo(() => getWizardFlow(session.goalId), [session.goalId]);
  const activeQuestions = useMemo(
    () => getActiveQuestions(session.goalId, session.answers),
    [session.answers, session.goalId],
  );
  const totalSteps = activeQuestions.length;
  const stepIndex = clampStepIndex(session.stepIndex, totalSteps);
  const question = activeQuestions[stepIndex];
  const remainingSeconds = estimateRemainingSeconds(activeQuestions, stepIndex);
  const remainingLabel =
    phase === 'summary' ? 'Complete' : formatRemainingTime(remainingSeconds);
  const progressPercent =
    phase === 'summary'
      ? 100
      : totalSteps === 0
        ? 0
        : Math.round(((stepIndex + 1) / totalSteps) * 100);

  const updateSession = useCallback(
    (patch: Partial<WizardSession>) => {
      const next: WizardSession = {
        ...session,
        ...patch,
        version: 2,
        updatedAt: new Date().toISOString(),
      };
      saveWizardSession(next);
      onSessionChange(next);
    },
    [onSessionChange, session],
  );

  useEffect(() => {
    if (!questionAnchorRef.current) return;
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const frame = window.requestAnimationFrame(() => {
      questionAnchorRef.current?.scrollIntoView({
        behavior: prefersReduced ? 'auto' : 'smooth',
        block: 'start',
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [session.goalId, stepIndex, phase]);

  const setAnswer = (value: WizardAnswerValue) => {
    if (!question) return;
    setError(null);
    updateSession({
      answers: {
        ...session.answers,
        [question.id]: value,
      },
    });
  };

  const completeWizard = () => {
    let crmLeadId = session.crmLeadId ?? null;
    if (!crmLeadId) {
      const lead = createCrmLeadFromWizard(session.goalId, session.answers);
      crmLeadId = lead.id;
    }
    updateSession({
      status: 'completed',
      stepIndex: Math.max(totalSteps - 1, 0),
      crmLeadId,
    });
    setPhase('summary');
    setLiveMessage('Consultation summary ready. A demo CRM lead was created.');
    trackWizardEvent('wizard_completed', {
      goal_id: session.goalId,
      lead_id: crmLeadId ?? undefined,
    });
  };

  const goNext = () => {
    if (!question) return;
    const result = validateWizardStep(question, session.answers);
    if (!result.ok) {
      setError(result.message);
      setLiveMessage(result.message);
      return;
    }

    trackWizardEvent('step_completed', {
      goal_id: session.goalId,
      step_index: stepIndex,
      question_id: question.id,
    });

    const nextQuestions = getActiveQuestions(session.goalId, session.answers);
    if (stepIndex >= nextQuestions.length - 1) {
      completeWizard();
      return;
    }

    updateSession({ stepIndex: stepIndex + 1 });
    setLiveMessage(`Step ${stepIndex + 2} of ${nextQuestions.length}`);
  };

  const goBack = () => {
    setError(null);
    if (phase === 'summary') {
      setPhase('questions');
      updateSession({
        status: 'in_progress',
        stepIndex: Math.max(totalSteps - 1, 0),
      });
      setLiveMessage(`Back to step ${totalSteps} of ${totalSteps}`);
      return;
    }
    if (stepIndex === 0) return;
    updateSession({ stepIndex: stepIndex - 1 });
    setLiveMessage(`Step ${stepIndex} of ${totalSteps}`);
  };

  const summary = useMemo(
    () =>
      buildWizardSummary(session.goalId, session.answers, {
        crmLeadId: session.crmLeadId ?? null,
      }),
    [session.answers, session.crmLeadId, session.goalId],
  );

  const router = useRouter();

  const onGenerateAnalysis = () => {
    setGenerating(true);
    window.setTimeout(() => {
      const result = runAdvisorEngine(session.goalId, session.answers, {
        crmLeadId: session.crmLeadId ?? null,
        createCrmLead: !session.crmLeadId,
      });
      setGenerating(false);
      if (result.ok) {
        if (result.report.crmLeadId && !session.crmLeadId) {
          updateSession({ crmLeadId: result.report.crmLeadId });
        }
        setAnalysisHref('/business-discovery/advisor');
        setLiveMessage('AI Business Advisor report ready.');
        trackWizardEvent('analysis_generated', {
          goal_id: session.goalId,
          analysis_id: result.report.analysis.id,
          advisor_report_id: result.report.id,
        });
        router.push('/business-discovery/advisor');
      } else {
        setError(result.error);
        setLiveMessage(result.error);
      }
    }, 450);
  };

  const onSubmitDemoLead = () => {
    const existingId = session.crmLeadId;
    if (!existingId) {
      const lead = createCrmLeadFromWizard(session.goalId, session.answers);
      updateSession({ crmLeadId: lead.id });
    }
    const preview = buildDemoLeadPreview(session.goalId, session.answers);
    setDemoLead({
      ...preview,
      leadId: session.crmLeadId ?? preview.leadId,
    });
    setLiveMessage('Demo CRM lead preview ready.');
  };

  const onSaveLater = () => {
    saveWizardSession({ ...session, status: 'in_progress' });
    setLiveMessage(
      'Progress saved on this device (localStorage). You can continue later from this browser.',
    );
  };

  if (!question && phase === 'questions') {
    return null;
  }

  return (
    <section
      id={panelId}
      ref={questionAnchorRef}
      className={cn(
        'wizard-panel-expand w-full min-w-0 scroll-mt-24 rounded-uv-2xl border border-white/15 bg-[#08152F]/90 p-4 backdrop-blur-sm sm:p-6',
        className,
      )}
      aria-label={`${flow.title} discovery wizard`}
    >
      <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-[#C4B5FD]">
            Business consultation
          </p>
          <h3 className="mt-2 break-words font-[family-name:var(--font-uv-display)] text-xl font-semibold text-white sm:text-2xl">
            {flow.title}
          </h3>
          <p className="mt-2 max-w-2xl break-words text-sm leading-relaxed text-[#EDE9FE]/90">
            {flow.intro}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              trackWizardEvent('wizard_abandoned', { goal_id: session.goalId });
              onChangeGoal();
            }}
            className="rounded-uv-md text-sm text-[#C4B5FD] underline-offset-4 hover:underline uv-focus-ring"
          >
            Change Goal
          </button>
          <button
            type="button"
            onClick={() => {
              trackWizardEvent('wizard_abandoned', { goal_id: session.goalId });
              onExit();
            }}
            className="rounded-uv-md text-sm text-[#C4B5FD] underline-offset-4 hover:underline uv-focus-ring"
          >
            Exit
          </button>
        </div>
      </div>

      <div className="mt-5 min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-[#C4B5FD]">
          <p aria-current="step">
            {phase === 'summary'
              ? 'Consultation summary'
              : `Step ${stepIndex + 1} of ${totalSteps}`}
          </p>
          <p className="tabular-nums">
            {progressPercent}% · {remainingLabel}
          </p>
        </div>
        <div
          className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progressPercent}
          aria-label={`Discovery progress, ${remainingLabel}`}
        >
          <div
            className="h-full rounded-full bg-uv-brand transition-[width] duration-300 ease-out motion-reduce:transition-none"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div
        id={liveId}
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      >
        {liveMessage}
      </div>

      {phase === 'summary' ? (
        <div className="mt-6 space-y-4">
          <WizardSummaryPanel
            summary={summary}
            onEdit={goBack}
            onRestart={() => {
              updateSession({
                stepIndex: 0,
                answers: {},
                status: 'in_progress',
                crmLeadId: null,
              });
              setPhase('questions');
              setAnalysisHref(null);
              setLiveMessage('Wizard restarted.');
            }}
            onGenerateAnalysis={onGenerateAnalysis}
            onSubmitDemoLead={onSubmitDemoLead}
            analysisHref={analysisHref}
            generating={generating}
          />
          <Link
            href="/business-discovery/advisor"
            className={cn(
              buttonVariants({ size: 'lg', variant: 'outline' }),
              'inline-flex w-full max-w-full justify-center border-white/40 bg-transparent text-white hover:bg-white/10 sm:w-auto',
            )}
          >
            Open AI Business Advisor dashboard
          </Link>
          <Link
            href="/business-discovery/summary"
            className={cn(
              buttonVariants({ size: 'lg', variant: 'ghost' }),
              'inline-flex w-full max-w-full justify-center text-[#C4B5FD] hover:bg-white/10 hover:text-white sm:w-auto',
            )}
          >
            Open consultation summary
          </Link>
        </div>
      ) : (
        <div className="mt-6 min-w-0" key={question.id}>
          <h4
            id={`${question.id}-label`}
            className="break-words font-[family-name:var(--font-uv-display)] text-lg font-semibold text-white sm:text-xl"
          >
            {question.title}
          </h4>
          {question.helper ? (
            <p className="mt-2 break-words text-sm text-[#C4B5FD]">
              {question.helper}
            </p>
          ) : null}

          <div className="mt-4 min-w-0">
            <WizardQuestionField
              question={question}
              value={session.answers[question.id]}
              onChange={setAnswer}
              error={error}
            />
          </div>

          {error ? (
            <p
              id={`${question.id}-error`}
              role="alert"
              className="mt-3 break-words text-sm text-rose-300"
            >
              {error}
            </p>
          ) : null}

          <div className="mt-6 flex w-full min-w-0 flex-col gap-3 border-t border-white/10 pt-5 pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:flex-row sm:flex-wrap sm:items-center">
            <WizardNavButton
              variant="outline"
              onClick={goBack}
              disabled={stepIndex === 0}
            >
              Back
            </WizardNavButton>
            <WizardNavButton onClick={goNext}>
              {stepIndex >= totalSteps - 1 ? 'See Summary' : 'Next'}
            </WizardNavButton>
            <WizardNavButton variant="ghost" onClick={onSaveLater}>
              Save and Continue Later
            </WizardNavButton>
          </div>
        </div>
      )}

      {demoLead ? (
        <DemoLeadModal lead={demoLead} onClose={() => setDemoLead(null)} />
      ) : null}
    </section>
  );
}

export type { WizardGoalId };
