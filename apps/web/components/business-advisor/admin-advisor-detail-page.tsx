'use client';

import * as React from 'react';
import Link from 'next/link';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  EmptyState,
  FormField,
  Select,
  Textarea,
  buttonVariants,
  cn,
} from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import { AnalysisReport } from '@/components/business-advisor/analysis-report';
import { LocalDemoButton } from '@/components/employee/local-demo-button';
import {
  applyReviewPatch,
  getDemoAnalysisById,
  loadReviewPatches,
  saveReviewPatch,
  subscribeReviewPatches,
  type ReviewPatch,
} from '@/lib/business-advisor';

const EMPLOYEES = ['Asha Menon', 'Vikram Shah', 'Divya P.', 'Meena R.'];
const PARTNERS = [
  'Nova Legal Partners',
  'Shield Compliance Desk',
  'BrightPixel Digital',
  'LedgerLine CA',
];

type AdminBusinessAdvisorDetailPageProps = {
  analysisId: string;
};

function initialDraft(analysisId: string) {
  const base = getDemoAnalysisById(analysisId);
  if (!base) {
    return { notes: '', employee: '', partner: '' };
  }
  const patched = applyReviewPatch(base, loadReviewPatches()[analysisId]);
  return {
    notes: patched.internalNotes,
    employee: patched.assignedEmployeeName ?? '',
    partner: patched.assignedPartnerName ?? '',
  };
}

export function AdminBusinessAdvisorDetailPage({
  analysisId,
}: AdminBusinessAdvisorDetailPageProps) {
  const base = getDemoAnalysisById(analysisId);
  const [message, setMessage] = React.useState<string | null>(null);
  const [draft, setDraft] = React.useState(() => initialDraft(analysisId));

  const patches = React.useSyncExternalStore(
    subscribeReviewPatches,
    loadReviewPatches,
    (): Record<string, ReviewPatch> => ({}),
  );

  const analysis = React.useMemo(() => {
    if (!base) return null;
    return applyReviewPatch(base, patches[analysisId]);
  }, [base, patches, analysisId]);

  if (!base || !analysis) {
    return (
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <AdminPageHeader
          title="Analysis not found"
          description="This demo analysis id is not in the seed set."
        />
        <EmptyState
          icon="CircleAlert"
          title="Analysis not found"
          description={`No demo record for ${analysisId}.`}
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
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title={`Analysis ${analysis.id}`}
        description={`${analysis.customerName} · ${analysis.input.city}, ${analysis.input.state}`}
        actions={
          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin/business-advisor"
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
            >
              Back to list
            </Link>
            <Link
              href={`/admin/business-advisor/${analysis.id}/project-preview`}
              className={cn(buttonVariants({ variant: 'primary', size: 'sm' }))}
            >
              Convert to Project
            </Link>
          </div>
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

      <Card padding="none">
        <CardHeader>
          <CardTitle className="text-base">Admin review actions</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <FormField label="Assign employee" htmlFor="ba-emp">
            <Select
              id="ba-emp"
              value={draft.employee}
              onChange={(e) =>
                setDraft((prev) => ({ ...prev, employee: e.target.value }))
              }
            >
              <option value="">Unassigned</option>
              {EMPLOYEES.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </Select>
          </FormField>
          <FormField label="Assign partner" htmlFor="ba-partner">
            <Select
              id="ba-partner"
              value={draft.partner}
              onChange={(e) =>
                setDraft((prev) => ({ ...prev, partner: e.target.value }))
              }
            >
              <option value="">Unassigned</option>
              {PARTNERS.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </Select>
          </FormField>
          <FormField
            label="Internal notes"
            htmlFor="ba-notes"
            className="sm:col-span-2"
          >
            <Textarea
              id="ba-notes"
              rows={3}
              value={draft.notes}
              onChange={(e) =>
                setDraft((prev) => ({ ...prev, notes: e.target.value }))
              }
            />
          </FormField>
          <div className="flex flex-wrap gap-2 sm:col-span-2">
            <LocalDemoButton
              variant="primary"
              onClick={() => {
                saveReviewPatch(analysisId, {
                  reviewStatus: 'reviewed',
                  internalNotes: draft.notes,
                  assignedEmployeeName: draft.employee || null,
                  assignedPartnerName: draft.partner || null,
                });
                setMessage('Marked as reviewed (demo session only).');
              }}
            >
              Mark as reviewed
            </LocalDemoButton>
            <LocalDemoButton
              onClick={() => {
                saveReviewPatch(analysisId, {
                  reviewStatus: 'in_review',
                  internalNotes: draft.notes,
                  assignedEmployeeName: draft.employee || null,
                  assignedPartnerName: draft.partner || null,
                });
                setMessage('Assignments and notes saved locally.');
              }}
            >
              Save assignments
            </LocalDemoButton>
            <LocalDemoButton
              onClick={() => {
                saveReviewPatch(analysisId, { reviewStatus: 'converted' });
                setMessage(
                  'Flagged as converted — open project preview to continue.',
                );
              }}
            >
              Mark converted
            </LocalDemoButton>
          </div>
        </CardContent>
      </Card>

      <AnalysisReport analysis={analysis} showInternal />
    </div>
  );
}
