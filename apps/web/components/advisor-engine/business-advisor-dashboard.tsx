'use client';

import Link from 'next/link';
import { useCallback, useMemo, useState, useSyncExternalStore } from 'react';

import {
  buttonVariants,
  cn,
  Icon,
  type IconName,
} from '@uandv/ui';

import { SectionHeading } from '@/components/marketing/section-heading';
import { getRuntimeLeadById } from '@/lib/crm';
import {
  downloadAdvisorReport,
  loadAdvisorEngineReport,
  runAdvisorEngine,
  saveAdvisorEngineReport,
  subscribeAdvisorEngineReport,
  type AdvisorEngineReport,
} from '@/lib/advisor-engine';
import {
  createCrmLeadFromWizard,
  loadWizardSession,
  saveWizardSession,
  subscribeWizardSession,
} from '@/lib/discovery-wizard';
import { BUSINESS_CATEGORY_LABELS, BUSINESS_STAGE_LABELS } from '@/lib/business-advisor';
import { buildContactHref } from '@/lib/journey-lead';

function useAdvisorReport() {
  return useSyncExternalStore(
    subscribeAdvisorEngineReport,
    loadAdvisorEngineReport,
    () => null,
  );
}

function useWizardSession() {
  return useSyncExternalStore(
    subscribeWizardSession,
    loadWizardSession,
    () => null,
  );
}

function Panel({
  title,
  icon,
  children,
  className,
}: {
  title: string;
  icon?: IconName;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        'min-w-0 rounded-uv-2xl border border-white/12 bg-white/5 p-4 sm:p-5',
        className,
      )}
    >
      <div className="flex items-center gap-2">
        {icon ? (
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-uv-lg bg-uv-brand/25 text-[#C4B5FD]">
            <Icon name={icon} size="sm" />
          </span>
        ) : null}
        <h3 className="font-[family-name:var(--font-uv-display)] text-base font-semibold text-white sm:text-lg">
          {title}
        </h3>
      </div>
      <div className="mt-4 min-w-0">{children}</div>
    </section>
  );
}

function BulletList({ items, empty }: { items: string[]; empty: string }) {
  if (!items.length) {
    return <p className="text-sm text-[#C4B5FD]">{empty}</p>;
  }
  return (
    <ul className="space-y-2" role="list">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2 text-sm leading-relaxed text-[#EDE9FE]"
        >
          <span
            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-uv-brand"
            aria-hidden
          />
          <span className="min-w-0 break-words">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function BusinessAdvisorDashboard({
  initialReport,
}: {
  initialReport?: AdvisorEngineReport | null;
} = {}) {
  const storedReport = useAdvisorReport();
  const session = useWizardSession();
  const [report, setReport] = useState<AdvisorEngineReport | null>(
    initialReport ?? null,
  );
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [crmSaved, setCrmSaved] = useState(false);

  const active = report ?? storedReport;

  const lead = active?.crmLeadId
    ? getRuntimeLeadById(active.crmLeadId)
    : null;

  const readinessWidth = active?.readiness.score ?? 0;

  const generate = useCallback(() => {
    if (!session) {
      setMessage('Complete the discovery wizard first.');
      return;
    }
    setBusy(true);
    window.setTimeout(() => {
      const result = runAdvisorEngine(session.goalId, session.answers, {
        crmLeadId: session.crmLeadId,
        createCrmLead: !session.crmLeadId,
      });
      setBusy(false);
      if (!result.ok) {
        setMessage(result.error);
        return;
      }
      if (result.report.crmLeadId && session.crmLeadId !== result.report.crmLeadId) {
        saveWizardSession({
          ...session,
          crmLeadId: result.report.crmLeadId,
        });
      }
      setReport(result.report);
      setCrmSaved(Boolean(result.report.crmLeadId));
      setMessage('Business advisor report generated.');
    }, 500);
  }, [session]);

  const onDownload = () => {
    if (!active) return;
    downloadAdvisorReport(active, { asPdfPlaceholder: true });
    setMessage('Demo PDF placeholder downloaded (text report).');
  };

  const onSaveCrm = () => {
    if (!session) {
      setMessage('No discovery session found.');
      return;
    }
    if (active?.crmLeadId) {
      setCrmSaved(true);
      setMessage(`CRM lead already saved: ${active.crmLeadId}`);
      return;
    }
    const leadRecord = createCrmLeadFromWizard(session.goalId, session.answers);
    saveWizardSession({ ...session, crmLeadId: leadRecord.id });
    if (active) {
      const next = { ...active, crmLeadId: leadRecord.id };
      setReport(next);
      saveAdvisorEngineReport(next);
    }
    setCrmSaved(true);
    setMessage(`Demo CRM lead saved: ${leadRecord.id}`);
  };

  const priorityTone = useMemo(() => {
    if (!active) return 'text-[#C4B5FD]';
    if (active.readiness.band === 'strong' || active.readiness.band === 'ready') {
      return 'text-emerald-300';
    }
    if (active.readiness.band === 'developing') return 'text-amber-200';
    return 'text-rose-200';
  }, [active]);

  if (!active && !session) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="AI Business Advisor"
          title="Start with discovery first."
          description="The advisor engine builds readiness, roadmap, budget, and recommendations from your Business Discovery answers."
        />
        <Link
          href="/business-discovery"
          className={cn(buttonVariants({ size: 'lg' }), 'mt-8 inline-flex')}
        >
          Open Business Discovery
        </Link>
      </div>
    );
  }

  if (!active) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="AI Business Advisor"
          title="Generate your business summary."
          description="We’ll turn your discovery answers into a readiness score, roadmap, budget, timeline, registrations, services, partners, and AI recommendations."
        />
        <button
          type="button"
          onClick={generate}
          disabled={busy}
          className={cn(buttonVariants({ size: 'lg' }), 'mt-8')}
        >
          {busy ? 'Generating…' : 'Generate Business Advisor Report'}
        </button>
        {message ? (
          <p className="mt-4 text-sm text-uv-muted" role="status">
            {message}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="mx-auto w-full min-w-0 max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="flex min-w-0 flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="AI Business Advisor Engine"
          title="Business Summary Dashboard"
          description={`${active.goalTitle} · Generated ${new Date(active.createdAt).toLocaleString('en-IN')}`}
        />
        <div className="flex w-full min-w-0 flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={generate}
            disabled={busy || !session}
            className={cn(
              buttonVariants({ size: 'lg', variant: 'outline' }),
              'justify-center',
            )}
          >
            {busy ? 'Refreshing…' : 'Refresh from discovery'}
          </button>
          <button
            type="button"
            onClick={onDownload}
            className={cn(buttonVariants({ size: 'lg' }), 'justify-center')}
          >
            Download Report (Demo PDF)
          </button>
          <button
            type="button"
            onClick={onSaveCrm}
            className={cn(
              buttonVariants({ size: 'lg', variant: 'outline' }),
              'justify-center',
            )}
          >
            {crmSaved || active.crmLeadId
              ? 'CRM Lead Saved'
              : 'Save to CRM Lead'}
          </button>
        </div>
      </div>

      {message ? (
        <p className="mt-4 text-sm text-uv-muted" role="status">
          {message}
        </p>
      ) : null}

      <div className="mt-8 overflow-hidden rounded-uv-2xl bg-[#08152F] p-4 text-white sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-uv-2xl border border-uv-brand/40 bg-uv-brand/20 p-4 sm:col-span-2">
            <p className="text-xs uppercase tracking-[0.14em] text-[#C4B5FD]">
              Business readiness score
            </p>
            <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
              <p className={cn('text-4xl font-semibold tabular-nums sm:text-5xl', priorityTone)}>
                {active.readiness.score}
                <span className="text-lg text-[#C4B5FD]">/100</span>
              </p>
              <p className="max-w-xs text-sm text-[#EDE9FE]">
                {active.readiness.label}
              </p>
            </div>
            <div
              className="mt-4 h-2 overflow-hidden rounded-full bg-white/10"
              role="progressbar"
              aria-valuenow={readinessWidth}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Business readiness score"
            >
              <div
                className="h-full rounded-full bg-uv-brand transition-[width] duration-500"
                style={{ width: `${readinessWidth}%` }}
              />
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-xs text-[#C4B5FD]">Strengths</p>
                <BulletList items={active.readiness.drivers} empty="—" />
              </div>
              <div>
                <p className="text-xs text-[#C4B5FD]">Gaps</p>
                <BulletList items={active.readiness.gaps} empty="—" />
              </div>
            </div>
          </div>

          <div className="rounded-uv-2xl border border-white/12 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-[#C4B5FD]">
              Estimated budget
            </p>
            <p className="mt-3 break-words text-xl font-semibold text-white">
              {active.estimatedBudgetLabel}
            </p>
          </div>
          <div className="rounded-uv-2xl border border-white/12 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-[#C4B5FD]">
              Estimated timeline
            </p>
            <p className="mt-3 break-words text-xl font-semibold text-white">
              {active.estimatedTimelineLabel}
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Panel title="Business profile" icon="Briefcase">
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-[#C4B5FD]">Category</dt>
                <dd className="text-[#EDE9FE]">
                  {BUSINESS_CATEGORY_LABELS[active.analysis.businessCategory]}
                </dd>
              </div>
              <div>
                <dt className="text-[#C4B5FD]">Stage</dt>
                <dd className="text-[#EDE9FE]">
                  {BUSINESS_STAGE_LABELS[active.analysis.businessStage]}
                </dd>
              </div>
              <div>
                <dt className="text-[#C4B5FD]">Objective</dt>
                <dd className="break-words text-[#EDE9FE]">
                  {active.analysis.primaryObjective}
                </dd>
              </div>
            </dl>
          </Panel>

          <Panel title="Required registrations" icon="FileText">
            <BulletList
              items={active.requiredRegistrations}
              empty="No registrations flagged yet."
            />
          </Panel>

          <Panel title="Required licenses" icon="ClipboardList">
            <BulletList
              items={active.requiredLicenses}
              empty="No licenses flagged yet."
            />
          </Panel>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Panel title="Recommended U&V services" icon="Sparkles">
            <BulletList
              items={active.recommendedServices}
              empty="No services recommended yet."
            />
          </Panel>
          <Panel title="Recommended partner categories" icon="Handshake">
            <BulletList
              items={active.recommendedPartnerCategories.map((p) => p.label)}
              empty="No partner categories recommended yet."
            />
          </Panel>
        </div>

        <div className="mt-4">
          <Panel title="AI recommendations" icon="Bot">
            <ul className="space-y-3" role="list">
              {active.aiRecommendations.map((rec) => (
                <li
                  key={rec.id}
                  className="rounded-uv-xl border border-white/10 bg-black/20 p-3"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium text-white">{rec.title}</p>
                    <span className="rounded-full border border-white/15 px-2 py-0.5 text-[11px] uppercase tracking-wide text-[#C4B5FD]">
                      {rec.priority}
                    </span>
                  </div>
                  <p className="mt-1 break-words text-sm text-[#EDE9FE]/90">
                    {rec.detail}
                  </p>
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        <div className="mt-4">
          <Panel title="Business roadmap" icon="Workflow">
            <ol className="space-y-4" role="list">
              {active.roadmap.map((phase) => (
                <li
                  key={phase.phase}
                  className="rounded-uv-xl border border-white/10 bg-black/15 p-3 sm:p-4"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-medium text-white">
                      Phase {phase.phase}: {phase.label}
                    </p>
                    <p className="text-xs text-[#C4B5FD]">{phase.weeksHint}</p>
                  </div>
                  {phase.tasks.length ? (
                    <ul className="mt-3 space-y-2">
                      {phase.tasks.map((task) => (
                        <li
                          key={task.id}
                          className="text-sm text-[#EDE9FE]"
                        >
                          <span className="font-medium text-white">
                            {task.name}
                          </span>
                          <span className="text-[#C4B5FD]">
                            {' '}
                            · {task.owner} · ~{task.durationDays}d
                          </span>
                          <p className="mt-0.5 text-xs text-[#EDE9FE]/80">
                            {task.description}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-2 text-sm text-[#C4B5FD]">
                      No detailed tasks in this phase for the current inputs.
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </Panel>
        </div>

        {lead ? (
          <div className="mt-4 rounded-uv-2xl border border-uv-brand/35 bg-uv-brand/15 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-[#C4B5FD]">
              CRM lead (demo)
            </p>
            <dl className="mt-3 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <dt className="text-[#C4B5FD]">Lead ID</dt>
                <dd className="text-white">{lead.id}</dd>
              </div>
              <div>
                <dt className="text-[#C4B5FD]">Priority</dt>
                <dd className="capitalize text-white">{lead.priority}</dd>
              </div>
              <div>
                <dt className="text-[#C4B5FD]">Assigned</dt>
                <dd className="text-white">{lead.assignedEmployee}</dd>
              </div>
              <div>
                <dt className="text-[#C4B5FD]">Follow-up</dt>
                <dd className="text-white">{lead.nextFollowUp ?? '—'}</dd>
              </div>
            </dl>
          </div>
        ) : null}

        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:flex-wrap">
          <Link
            href="/dashboard"
            className={cn(buttonVariants({ size: 'lg' }), 'justify-center')}
          >
            Continue to Business OS Dashboard
          </Link>
          <Link
            href="/business-discovery"
            className={cn(
              buttonVariants({ size: 'lg', variant: 'outline' }),
              'justify-center border-white/40 bg-transparent text-white hover:bg-white/10',
            )}
          >
            Back to discovery
          </Link>
          <Link
            href="/dashboard/business-advisor/result"
            className={cn(
              buttonVariants({ size: 'lg', variant: 'outline' }),
              'justify-center border-white/40 bg-transparent text-white hover:bg-white/10',
            )}
          >
            Open requirement analysis
          </Link>
          <Link
            href={buildContactHref({
              journey: active.goalId,
              visitorType: active.goalId,
              guideLanguage: 'en',
              sourcePage: '/business-discovery/advisor',
              cta: 'consultation',
              interestSlug: active.goalId,
            })}
            className={cn(
              buttonVariants({ size: 'lg', variant: 'outline' }),
              'justify-center border-white/40 bg-transparent text-white hover:bg-white/10',
            )}
          >
            Continue to Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
