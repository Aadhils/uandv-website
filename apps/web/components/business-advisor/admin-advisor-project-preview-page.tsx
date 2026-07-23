'use client';

import * as React from 'react';
import Link from 'next/link';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  EmptyState,
  StatsCard,
  buttonVariants,
  cn,
} from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import { LocalDemoButton } from '@/components/employee/local-demo-button';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  BUSINESS_CATEGORY_LABELS,
  applyReviewPatch,
  buildProjectPreview,
  formatAdvisorBudget,
  getDemoAnalysisById,
  loadReviewPatches,
  saveReviewPatch,
  subscribeReviewPatches,
  type ReviewPatch,
} from '@/lib/business-advisor';

type AdminBusinessAdvisorProjectPreviewPageProps = {
  analysisId: string;
};

export function AdminBusinessAdvisorProjectPreviewPage({
  analysisId,
}: AdminBusinessAdvisorProjectPreviewPageProps) {
  const base = getDemoAnalysisById(analysisId);
  const [message, setMessage] = React.useState<string | null>(null);

  const patches = React.useSyncExternalStore(
    subscribeReviewPatches,
    loadReviewPatches,
    (): Record<string, ReviewPatch> => ({}),
  );

  const preview = React.useMemo(() => {
    if (!base) return null;
    return buildProjectPreview(applyReviewPatch(base, patches[analysisId]));
  }, [base, patches, analysisId]);

  if (!base || !preview) {
    return (
      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        <AdminPageHeader
          title="Project conversion preview"
          description="Analysis not found."
        />
        <EmptyState
          icon="CircleAlert"
          title="Analysis not found"
          description={`Cannot preview conversion for ${analysisId}.`}
          action={
            <Link
              href="/admin/business-advisor"
              className={cn(buttonVariants({ variant: 'primary', size: 'sm' }))}
            >
              Back to list
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8">
      <AdminPageHeader
        title="Convert analysis to project"
        description="Preview only — no backend project record is created."
        actions={
          <Link
            href={`/admin/business-advisor/${analysisId}`}
            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
          >
            Back to analysis
          </Link>
        }
      />

      {message ? (
        <p
          className="rounded-uv-lg border border-uv-border bg-uv-background-muted/50 px-3 py-2 text-sm text-uv-foreground"
          role="status"
        >
          {message}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          label="Category"
          value={BUSINESS_CATEGORY_LABELS[preview.projectCategory]}
          icon="Briefcase"
        />
        <StatsCard
          label="Timeline"
          value={`${preview.estimatedTimelineWeeks} wks`}
          icon="Clock"
        />
        <StatsCard
          label="Budget"
          value={formatAdvisorBudget(preview.estimatedBudgetInr)}
          icon="Wallet"
        />
        <StatsCard
          label="Health"
          value={preview.initialProjectHealth.replace(/_/g, ' ')}
          icon="TrendingUp"
        />
      </div>

      <Card padding="none">
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2">
          <CardTitle className="text-base">{preview.projectTitle}</CardTitle>
          <StatusBadge status={preview.initialProjectHealth} />
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <p>
            <span className="text-uv-foreground-subtle">Customer: </span>
            {preview.customerName}
          </p>
          <div>
            <p className="font-medium text-uv-foreground">Suggested services</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-uv-foreground-muted">
              {preview.suggestedServices.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-medium text-uv-foreground">Milestones</p>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-uv-foreground-muted">
              {preview.milestones.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ol>
          </div>
          <div>
            <p className="font-medium text-uv-foreground">Initial tasks</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-uv-foreground-muted">
              {preview.tasks.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <p className="font-medium text-uv-foreground">Suggested employees</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-uv-foreground-muted">
                {preview.suggestedEmployees.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-medium text-uv-foreground">Suggested partners</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-uv-foreground-muted">
                {preview.suggestedPartners.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            <LocalDemoButton
              variant="primary"
              onClick={() => {
                saveReviewPatch(analysisId, { reviewStatus: 'converted' });
                setMessage(
                  'Demo conversion confirmed. No real project was created in the database.',
                );
              }}
            >
              Confirm conversion (demo)
            </LocalDemoButton>
            <Link
              href="/admin/projects/new"
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
            >
              Open create project form
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
