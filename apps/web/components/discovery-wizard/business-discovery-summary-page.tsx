'use client';

import Link from 'next/link';
import { useMemo, useSyncExternalStore } from 'react';

import { buttonVariants, cn } from '@uandv/ui';

import { SectionHeading } from '@/components/marketing/section-heading';
import { getRuntimeLeadById } from '@/lib/crm';
import {
  buildWizardSummary,
  loadWizardSession,
  subscribeWizardSession,
} from '@/lib/discovery-wizard';

function useWizardSession() {
  return useSyncExternalStore(
    subscribeWizardSession,
    loadWizardSession,
    () => null,
  );
}

export function BusinessDiscoverySummaryPage() {
  const session = useWizardSession();

  const summary = useMemo(() => {
    if (!session || session.status !== 'completed') return null;
    return buildWizardSummary(session.goalId, session.answers, {
      crmLeadId: session.crmLeadId ?? null,
    });
  }, [session]);

  const lead = summary?.crmLeadId
    ? getRuntimeLeadById(summary.crmLeadId)
    : null;

  if (!summary) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Business summary"
          title="No completed consultation yet."
          description="Finish the discovery wizard to generate your business summary, recommended services, budget, timeline, and partner categories."
        />
        <Link
          href="/business-discovery"
          className={cn(buttonVariants({ size: 'lg' }), 'mt-8 inline-flex')}
        >
          Start discovery
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Business consultation summary"
        title={summary.goalTitle}
        description="A structured view of your discovery answers — services, budget, timeline, partners, and next actions."
      />

      <div className="mt-8 overflow-hidden rounded-uv-2xl bg-[#08152F] p-5 text-white sm:p-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            ['Business profile', summary.businessProfile],
            ['Main objective', summary.mainObjective],
            ['Current stage', summary.currentStage],
            ['Estimated budget', summary.estimatedBudgetLabel],
            ['Estimated timeline', summary.estimatedTimelineLabel],
            ['Next action', summary.recommendedNextAction],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-uv-xl border border-white/10 bg-white/5 p-4"
            >
              <p className="text-xs uppercase tracking-[0.14em] text-[#C4B5FD]">
                {label}
              </p>
              <p className="mt-2 break-words text-sm text-[#EDE9FE]">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="rounded-uv-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-[#C4B5FD]">
              Recommended services
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-[#EDE9FE]">
              {summary.selectedServices.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-uv-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-[#C4B5FD]">
              Recommended partner categories
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-[#EDE9FE]">
              {summary.recommendedPartnerCategories.map((item) => (
                <li key={item.id}>{item.label}</li>
              ))}
            </ul>
          </div>
        </div>

        {lead ? (
          <div className="mt-6 rounded-uv-xl border border-uv-brand/40 bg-uv-brand/15 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-[#C4B5FD]">
              CRM lead created (demo)
            </p>
            <dl className="mt-3 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
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
                <dt className="text-[#C4B5FD]">Next follow-up</dt>
                <dd className="text-white">{lead.nextFollowUp ?? '—'}</dd>
              </div>
            </dl>
          </div>
        ) : null}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/business-discovery/advisor"
            className={cn(buttonVariants({ size: 'lg' }), 'justify-center')}
          >
            Open AI Business Advisor
          </Link>
          <Link
            href="/dashboard"
            className={cn(
              buttonVariants({ size: 'lg', variant: 'outline' }),
              'justify-center border-white/40 bg-transparent text-white hover:bg-white/10',
            )}
          >
            Open Business OS Dashboard
          </Link>
          <Link
            href="/dashboard/service-requests"
            className={cn(
              buttonVariants({ size: 'lg', variant: 'outline' }),
              'justify-center border-white/40 bg-transparent text-white hover:bg-white/10',
            )}
          >
            Create service request
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
            href="/"
            className={cn(
              buttonVariants({ size: 'lg', variant: 'ghost' }),
              'justify-center text-[#C4B5FD] hover:bg-white/10 hover:text-white',
            )}
          >
            Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
