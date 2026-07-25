'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import {
  Button,
  Select,
  Textarea,
  buttonVariants,
  cn,
} from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import { StatusBadge } from '@/components/customer/status-badge';
import type { AdminEnquiryDetail } from '@/lib/enquiries/admin';
import { formatEnquiryDate } from '@/lib/enquiries/admin';
import {
  ENQUIRY_STATUS_BADGE,
  ENQUIRY_STATUS_LABELS,
  ENQUIRY_STATUS_VALUES,
} from '@/lib/enquiries/status';

type EnquiryDetailPageProps = {
  enquiry: AdminEnquiryDetail;
};

function toDateInputValue(iso: string | null): string {
  if (!iso) return '';
  const date = new Date(iso);
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60_000);
  return local.toISOString().slice(0, 16);
}

export function EnquiryDetailPage({ enquiry: initial }: EnquiryDetailPageProps) {
  const router = useRouter();
  const [enquiry, setEnquiry] = React.useState(initial);
  const [status, setStatus] = React.useState(initial.status);
  const [internalNotes, setInternalNotes] = React.useState(
    initial.internalNotes ?? '',
  );
  const [followUpDate, setFollowUpDate] = React.useState(
    toDateInputValue(initial.followUpDate),
  );
  const [saving, setSaving] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const onSave = async () => {
    setSaving(true);
    setMessage(null);
    setError(null);

    try {
      const response = await fetch(`/api/admin/enquiries/${enquiry.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          internalNotes,
          followUpDate: followUpDate ? new Date(followUpDate).toISOString() : null,
        }),
      });

      const result = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
        message?: string;
        enquiry?: AdminEnquiryDetail;
      } | null;

      if (!response.ok || !result?.ok || !result.enquiry) {
        setError(result?.error ?? 'Could not save lead updates.');
        return;
      }

      setEnquiry(result.enquiry);
      setStatus(result.enquiry.status);
      setInternalNotes(result.enquiry.internalNotes ?? '');
      setFollowUpDate(toDateInputValue(result.enquiry.followUpDate));
      setMessage(result.message ?? 'Lead updated.');
      router.refresh();
    } catch {
      setError('Network error while saving lead updates.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        badge="live"
        title={enquiry.reference}
        description={`${enquiry.name} · ${enquiry.serviceLabel}`}
        actions={
          <Link
            href="/admin/leads/list"
            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
          >
            Back to leads
          </Link>
        }
      />

      {message ? (
        <p
          className="rounded-uv-lg border border-uv-success/30 bg-uv-success/5 px-4 py-3 text-sm text-uv-foreground"
          role="status"
        >
          {message}
        </p>
      ) : null}
      {error ? (
        <p
          className="rounded-uv-lg border border-uv-error/30 bg-uv-error/5 px-4 py-3 text-sm text-uv-error"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="space-y-6">
          <div className="rounded-uv-2xl border border-uv-border bg-uv-card p-5 sm:p-6">
            <h2 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
              Customer Information
            </h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-uv-foreground-subtle">
                  Name
                </dt>
                <dd className="mt-1 text-sm text-uv-foreground">{enquiry.name}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-uv-foreground-subtle">
                  Email
                </dt>
                <dd className="mt-1 text-sm">
                  <a
                    href={`mailto:${enquiry.email}`}
                    className="text-uv-brand hover:underline"
                  >
                    {enquiry.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-uv-foreground-subtle">
                  Phone
                </dt>
                <dd className="mt-1 text-sm text-uv-foreground">
                  {enquiry.phone || '—'}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-uv-foreground-subtle">
                  Company
                </dt>
                <dd className="mt-1 text-sm text-uv-foreground">
                  {enquiry.company || '—'}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-uv-2xl border border-uv-border bg-uv-card p-5 sm:p-6">
            <h2 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
              Enquiry Details
            </h2>
            <dl className="mt-4 space-y-4">
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-uv-foreground-subtle">
                  Interested Service
                </dt>
                <dd className="mt-1 text-sm text-uv-foreground">
                  {enquiry.serviceLabel}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-uv-foreground-subtle">
                  Source
                </dt>
                <dd className="mt-1 text-sm text-uv-foreground">{enquiry.source}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-uv-foreground-subtle">
                  Submitted
                </dt>
                <dd className="mt-1 text-sm text-uv-foreground">
                  {formatEnquiryDate(enquiry.createdAt)}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-uv-foreground-subtle">
                  Message
                </dt>
                <dd className="mt-2 whitespace-pre-wrap rounded-uv-lg border border-uv-border bg-uv-background-subtle px-4 py-3 text-sm text-uv-foreground">
                  {enquiry.message}
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="space-y-6">
          <div className="rounded-uv-2xl border border-uv-border bg-uv-card p-5 sm:p-6">
            <h2 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
              Lead Status
            </h2>
            <div className="mt-4 space-y-4">
              <div>
                <label
                  htmlFor="lead-status-select"
                  className="mb-2 block text-sm font-medium text-uv-foreground"
                >
                  Status
                </label>
                <Select
                  id="lead-status-select"
                  value={status}
                  onChange={(event) =>
                    setStatus(event.target.value as typeof status)
                  }
                  disabled={saving}
                >
                  {ENQUIRY_STATUS_VALUES.map((value) => (
                    <option key={value} value={value}>
                      {ENQUIRY_STATUS_LABELS[value]}
                    </option>
                  ))}
                </Select>
                <div className="mt-3">
                  <StatusBadge
                    status={ENQUIRY_STATUS_BADGE[status]}
                    label={ENQUIRY_STATUS_LABELS[status]}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="lead-follow-up"
                  className="mb-2 block text-sm font-medium text-uv-foreground"
                >
                  Follow-up Date
                </label>
                <input
                  id="lead-follow-up"
                  type="datetime-local"
                  value={followUpDate}
                  onChange={(event) => setFollowUpDate(event.target.value)}
                  disabled={saving}
                  className="flex h-11 w-full rounded-uv-lg border border-uv-border bg-uv-background px-3 text-sm text-uv-foreground shadow-uv-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-uv-brand"
                />
              </div>

              <div>
                <label
                  htmlFor="lead-notes"
                  className="mb-2 block text-sm font-medium text-uv-foreground"
                >
                  Internal Notes
                </label>
                <Textarea
                  id="lead-notes"
                  rows={6}
                  value={internalNotes}
                  onChange={(event) => setInternalNotes(event.target.value)}
                  placeholder="Private notes for the sales team…"
                  disabled={saving}
                />
              </div>

              <Button type="button" onClick={onSave} disabled={saving}>
                {saving ? 'Saving…' : 'Save changes'}
              </Button>
            </div>
          </div>

          <div className="rounded-uv-2xl border border-uv-border bg-uv-card p-5 sm:p-6">
            <h2 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
              Timeline
            </h2>
            {enquiry.timeline.length === 0 ? (
              <p className="mt-4 text-sm text-uv-foreground-muted">
                No timeline events yet.
              </p>
            ) : (
              <ol className="mt-4 space-y-4">
                {enquiry.timeline.map((event) => (
                  <li
                    key={event.id}
                    className="relative border-l border-uv-border pl-4"
                  >
                    <p className="text-sm font-medium text-uv-foreground">
                      {event.title}
                    </p>
                    {event.body ? (
                      <p className="mt-1 whitespace-pre-wrap text-sm text-uv-foreground-muted">
                        {event.body}
                      </p>
                    ) : null}
                    <p className="mt-2 text-xs text-uv-foreground-subtle">
                      {formatEnquiryDate(event.createdAt)}
                      {event.actorLabel ? ` · ${event.actorLabel}` : ''}
                    </p>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
