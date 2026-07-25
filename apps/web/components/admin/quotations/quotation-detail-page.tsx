'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { Button, buttonVariants, cn } from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import { StatusBadge } from '@/components/customer/status-badge';
import { formatInr, formatQuotationDate } from '@/lib/quotations/format';
import type { AdminQuotationDto } from '@/lib/quotations/mapper';

export function AdminQuotationDetailPage({
  quotation: initial,
}: {
  quotation: AdminQuotationDto;
}) {
  const router = useRouter();
  const [quotation, setQuotation] = React.useState(initial);
  const [busy, setBusy] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const runAction = async (action: 'send' | 'cancel') => {
    setBusy(action);
    setError(null);
    setMessage(null);
    try {
      const response = await fetch(`/api/admin/quotations/${quotation.id}/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: action === 'cancel' ? JSON.stringify({ note: 'Cancelled by admin' }) : undefined,
      });
      const result = (await response.json()) as {
        ok?: boolean;
        error?: string;
        quotation?: AdminQuotationDto;
      };
      if (!response.ok || !result.ok || !result.quotation) {
        setError(result.error ?? `Unable to ${action} quotation.`);
        return;
      }
      setQuotation(result.quotation);
      setMessage(action === 'send' ? 'Quotation sent to customer.' : 'Quotation cancelled.');
      router.refresh();
    } catch {
      setError('Network error.');
    } finally {
      setBusy(null);
    }
  };

  const canEdit = quotation.status === 'DRAFT';
  const canSend = quotation.status === 'DRAFT';
  const canCancel = quotation.status === 'DRAFT' || quotation.status === 'SENT';

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 print:max-w-none">
      <AdminPageHeader
        badge="live"
        title={quotation.quotationNumber}
        description={quotation.title}
        actions={
          <div className="flex flex-wrap gap-2 print:hidden">
            <Link href="/admin/quotations" className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}>
              Back
            </Link>
            {canEdit ? (
              <Link
                href={`/admin/quotations/${quotation.id}/edit`}
                className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
              >
                Edit
              </Link>
            ) : null}
            {canSend ? (
              <Button size="sm" onClick={() => runAction('send')} disabled={Boolean(busy)}>
                {busy === 'send' ? 'Sending…' : 'Send to customer'}
              </Button>
            ) : null}
            {canCancel ? (
              <Button size="sm" variant="outline" onClick={() => runAction('cancel')} disabled={Boolean(busy)}>
                {busy === 'cancel' ? 'Cancelling…' : 'Cancel'}
              </Button>
            ) : null}
            <Button size="sm" variant="outline" onClick={() => window.print()}>
              Print / PDF
            </Button>
          </div>
        }
      />

      {message ? (
        <p className="rounded-uv-lg border border-uv-success/30 bg-uv-success/5 px-4 py-3 text-sm print:hidden" role="status">
          {message}
        </p>
      ) : null}
      {error ? (
        <p className="rounded-uv-lg border border-uv-error/30 bg-uv-error/5 px-4 py-3 text-sm text-uv-error print:hidden" role="alert">
          {error}
        </p>
      ) : null}

      <div className="rounded-uv-2xl border border-uv-border bg-uv-card p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-uv-border pb-6">
          <div>
            <p className="text-sm text-uv-foreground-muted">Quotation for</p>
            <h2 className="text-xl font-semibold">{quotation.customerName}</h2>
            <p className="text-sm text-uv-foreground-muted">{quotation.customerEmail}</p>
          </div>
          <StatusBadge status={quotation.status.toLowerCase()} />
        </div>

        <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="text-xs uppercase text-uv-foreground-subtle">Valid until</dt>
            <dd className="mt-1 text-sm">{formatQuotationDate(quotation.validityDate)}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase text-uv-foreground-subtle">Lead reference</dt>
            <dd className="mt-1 text-sm">{quotation.leadReference ?? '—'}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase text-uv-foreground-subtle">Service</dt>
            <dd className="mt-1 text-sm">{quotation.serviceInterest ?? '—'}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase text-uv-foreground-subtle">Grand total</dt>
            <dd className="mt-1 text-lg font-semibold">{formatInr(quotation.grandTotal)}</dd>
          </div>
        </dl>

        {quotation.introduction ? (
          <p className="mt-6 text-sm text-uv-foreground-muted">{quotation.introduction}</p>
        ) : null}

        <div className="mt-8 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-uv-border text-left text-uv-foreground-subtle">
                <th className="py-2 pr-4">Description</th>
                <th className="py-2 pr-4">Qty</th>
                <th className="py-2 pr-4">Unit</th>
                <th className="py-2 pr-4">Rate</th>
                <th className="py-2 pr-4">Line total</th>
              </tr>
            </thead>
            <tbody>
              {quotation.items.map((item) => (
                <tr key={item.id} className="border-b border-uv-border/60">
                  <td className="py-3 pr-4">{item.description}</td>
                  <td className="py-3 pr-4">{item.quantity}</td>
                  <td className="py-3 pr-4">{item.unit}</td>
                  <td className="py-3 pr-4">{formatInr(item.unitPrice)}</td>
                  <td className="py-3 pr-4 font-medium">{formatInr(item.lineTotal)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 ml-auto max-w-sm space-y-2 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><span>{formatInr(quotation.subtotal)}</span></div>
          <div className="flex justify-between"><span>Discount</span><span>-{formatInr(quotation.discountAmount)}</span></div>
          <div className="flex justify-between"><span>Tax ({quotation.taxType})</span><span>{formatInr(quotation.taxAmount)}</span></div>
          <div className="flex justify-between border-t border-uv-border pt-2 text-base font-semibold">
            <span>Grand total</span><span>{formatInr(quotation.grandTotal)}</span>
          </div>
        </div>

        {quotation.customerNotes ? (
          <div className="mt-8">
            <h3 className="font-medium">Notes</h3>
            <p className="mt-2 text-sm text-uv-foreground-muted">{quotation.customerNotes}</p>
          </div>
        ) : null}

        {quotation.termsAndConditions ? (
          <div className="mt-6">
            <h3 className="font-medium">Terms & conditions</h3>
            <p className="mt-2 whitespace-pre-wrap text-sm text-uv-foreground-muted">
              {quotation.termsAndConditions}
            </p>
          </div>
        ) : null}
      </div>

      {quotation.internalNotes ? (
        <section className="rounded-uv-2xl border border-uv-border bg-uv-card p-5 print:hidden">
          <h2 className="font-semibold">Internal notes</h2>
          <p className="mt-2 whitespace-pre-wrap text-sm text-uv-foreground-muted">
            {quotation.internalNotes}
          </p>
        </section>
      ) : null}

      {quotation.timeline?.length ? (
        <section className="rounded-uv-2xl border border-uv-border bg-uv-card p-5 print:hidden">
          <h2 className="font-semibold">Timeline</h2>
          <ol className="mt-4 space-y-3">
            {quotation.timeline.map((event) => (
              <li key={event.id} className="border-l border-uv-border pl-4 text-sm">
                <p className="font-medium capitalize">{event.action}</p>
                <p className="text-xs text-uv-foreground-subtle">
                  {formatQuotationDate(event.createdAt)}
                  {event.actorLabel ? ` · ${event.actorLabel}` : ''}
                </p>
                {event.note ? <p className="mt-1 text-uv-foreground-muted">{event.note}</p> : null}
              </li>
            ))}
          </ol>
        </section>
      ) : null}
    </div>
  );
}
