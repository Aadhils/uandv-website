'use client';

import Link from 'next/link';

import { buttonVariants, cn } from '@uandv/ui';

import { formatAdvisorBudget } from '@/lib/business-advisor';
import type { DemoLeadPreview, WizardSummary } from '@/lib/discovery-wizard';
import { buildContactHref } from '@/lib/journey-lead';

import { WizardNavButton } from './wizard-question-field';

type WizardSummaryPanelProps = {
  summary: WizardSummary;
  onEdit: () => void;
  onRestart: () => void;
  onGenerateAnalysis: () => void;
  onSubmitDemoLead: () => void;
  analysisHref?: string | null;
  generating?: boolean;
};

function SummaryBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0 rounded-uv-xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#C4B5FD]">
        {title}
      </p>
      <div className="mt-2 break-words text-sm leading-relaxed text-[#EDE9FE]">
        {children}
      </div>
    </div>
  );
}

export function WizardSummaryPanel({
  summary,
  onEdit,
  onRestart,
  onGenerateAnalysis,
  onSubmitDemoLead,
  analysisHref,
  generating,
}: WizardSummaryPanelProps) {
  return (
    <div className="flex w-full min-w-0 flex-col gap-5">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.14em] text-[#C4B5FD]">
          Discovery summary
        </p>
        <h3 className="mt-2 break-words font-[family-name:var(--font-uv-display)] text-xl font-semibold text-white sm:text-2xl">
          {summary.goalTitle}
        </h3>
        <p className="mt-2 break-words text-sm text-[#EDE9FE]/90">
          Here’s a clear picture of what you shared — and what we recommend next.
        </p>
      </div>

      <div className="grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
        <SummaryBlock title="Business profile">{summary.businessProfile}</SummaryBlock>
        <SummaryBlock title="Main objective">{summary.mainObjective}</SummaryBlock>
        <SummaryBlock title="Current stage">{summary.currentStage}</SummaryBlock>
        <SummaryBlock title="Estimated budget">
          {summary.estimatedBudgetLabel}
          <span className="mt-1 block text-xs text-[#C4B5FD]">
            Selected range: {summary.budgetRange}
          </span>
        </SummaryBlock>
        <SummaryBlock title="Estimated timeline">
          {summary.estimatedTimelineLabel}
          <span className="mt-1 block text-xs text-[#C4B5FD]">
            Target: {summary.timeline}
          </span>
        </SummaryBlock>
        <SummaryBlock title="Recommended next action">
          {summary.recommendedNextAction}
        </SummaryBlock>
      </div>

      <SummaryBlock title="Recommended services">
        <ul className="list-disc space-y-1 pl-4">
          {summary.selectedServices.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </SummaryBlock>

      <SummaryBlock title="Recommended partner categories">
        <ul className="list-disc space-y-1 pl-4">
          {summary.recommendedPartnerCategories.map((item) => (
            <li key={item.id}>{item.label}</li>
          ))}
        </ul>
      </SummaryBlock>

      <SummaryBlock title="Key requirements">
        <ul className="list-disc space-y-1 pl-4">
          {summary.keyRequirements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </SummaryBlock>

      {summary.crmLeadId ? (
        <SummaryBlock title="CRM lead (demo)">
          Lead <span className="font-medium text-white">{summary.crmLeadId}</span>{' '}
          was created automatically in local demo storage.
        </SummaryBlock>
      ) : null}

      <div className="grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
        <SummaryBlock title="Risk indicators">
          <ul className="list-disc space-y-1 pl-4">
            {summary.riskIndicators.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </SummaryBlock>
        <SummaryBlock title="Missing information">
          <ul className="list-disc space-y-1 pl-4">
            {summary.missingInformation.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </SummaryBlock>
      </div>

      <div className="flex w-full min-w-0 flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:flex-wrap">
        <WizardNavButton onClick={onEdit} variant="outline">
          Edit Answers
        </WizardNavButton>
        <WizardNavButton onClick={onRestart} variant="ghost">
          Restart
        </WizardNavButton>
        <WizardNavButton onClick={onGenerateAnalysis} disabled={generating}>
          {generating ? 'Generating…' : 'Open AI Business Advisor'}
        </WizardNavButton>
        <Link
          href={buildContactHref({
            journey: summary.goalId,
            visitorType: summary.goalId,
            guideLanguage: 'en',
            sourcePage: '/',
            cta: 'consultation',
            interestSlug: summary.goalId,
          })}
          className={cn(
            buttonVariants({ size: 'lg', variant: 'outline' }),
            'w-full max-w-full justify-center border-white/40 bg-transparent text-white hover:bg-white/10 sm:w-auto',
          )}
        >
          Continue to Consultation
        </Link>
        <WizardNavButton onClick={onSubmitDemoLead} variant="outline">
          Submit as Demo Lead
        </WizardNavButton>
      </div>

      {analysisHref ? (
        <p className="break-words text-sm text-[#C4B5FD]" role="status">
          Advisor report ready.{' '}
          <Link href={analysisHref} className="underline underline-offset-4 uv-focus-ring">
            View Business Summary Dashboard
          </Link>
        </p>
      ) : null}
    </div>
  );
}

type DemoLeadModalProps = {
  lead: DemoLeadPreview;
  onClose: () => void;
};

export function DemoLeadModal({ lead, onClose }: DemoLeadModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-lead-title"
    >
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-uv-2xl border border-white/15 bg-[#0B1B3A] p-5 text-white shadow-xl sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#C4B5FD]">
              Demo lead preview
            </p>
            <h3
              id="demo-lead-title"
              className="mt-2 font-[family-name:var(--font-uv-display)] text-xl font-semibold"
            >
              Lead created (demo only)
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-uv-md text-sm text-[#C4B5FD] underline-offset-4 hover:underline uv-focus-ring"
          >
            Close
          </button>
        </div>

        <dl className="mt-5 space-y-3 text-sm">
          {[
            ['Lead ID', lead.leadId],
            ['Customer', lead.customerName],
            ['Goal', lead.goal],
            ['Category', lead.businessCategory],
            ['Contact status', lead.contactStatus],
            ['Priority', lead.leadPriority],
            ['Suggested employee', lead.suggestedEmployee],
            ['Suggested partner', lead.suggestedPartner],
            ['Estimated value', formatAdvisorBudget(lead.estimatedValueInr)],
            ['Next follow-up', lead.nextFollowUpDate],
          ].map(([label, value]) => (
            <div key={label} className="grid grid-cols-1 gap-1 border-b border-white/10 pb-3 sm:grid-cols-[8rem_1fr]">
              <dt className="text-[#C4B5FD]">{label}</dt>
              <dd className="break-words text-[#EDE9FE]">{value}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-4 text-xs leading-relaxed text-[#C4B5FD]/90">
          This is a local demo preview only. No CRM record was created.
        </p>

        <div className="mt-5">
          <WizardNavButton onClick={onClose}>Done</WizardNavButton>
        </div>
      </div>
    </div>
  );
}
