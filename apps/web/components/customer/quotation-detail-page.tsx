'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { Button, Textarea, buttonVariants, cn } from '@uandv/ui';

import { CustomerPageHeader } from '@/components/customer/page-header';
import { StatusBadge } from '@/components/customer/status-badge';
import { formatInr, formatQuotationDate } from '@/lib/quotations/format';
import type { QuotationDto } from '@/lib/quotations/mapper';

export function CustomerQuotationDetailPage({
  quotation: initial,
}: {
  quotation: QuotationDto;
}) {
  const router = useRouter();
  const [quotation, setQuotation] = React.useState(initial);
  const [rejectReason, setRejectReason] = React.useState('');
  const [showReject, setShowReject] = React.useState(false);
  const [busy, setBusy] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    void fetch(`/api/me/quotations/${quotation.id}/view`, { method: 'POST' });
  }, [quotation.id]);

  const canRespond = quotation.status === 'SENT' || quotation.status === 'VIEWED';

  const accept = async () => {
    setBusy('accept');
    setError(null);
    try {
      const response = await fetch(`/api/me/quotations/${quotation.id}/accept`, {
        method: 'POST',
      });
      const result = (await response.json()) as {
        ok?: boolean;
        error?: string;
        quotation?: QuotationDto;
      };
      if (!response.ok || !result.ok || !result.quotation) {
        setError(result.error ?? 'Unable to accept quotation.');
        return;
      }
      setQuotation(result.quotation);
      setMessage('Quotation accepted. Thank you — our team will follow up shortly.');
      router.refresh();
    } catch {
      setError('Network error while accepting quotation.');
    } finally {
      setBusy(null);
    }
  };

  const reject = async () => {
    setBusy('reject');
    setError(null);
    try {
      const response = await fetch(`/api/me/quotations/${quotation.id}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: rejectReason }),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        error?: string;
        quotation?: QuotationDto;
      };
      if (!response.ok || !result.ok || !result.quotation) {
        setError(result.error ?? 'Unable to reject quotation.');
        return;
      }
      setQuotation(result.quotation);
      setMessage('Quotation rejected. Your response has been recorded.');
      setShowReject(false);
      router.refresh();
    } catch {
      setError('Network error while rejecting quotation.');
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 print:max-w-none">
      <CustomerPageHeader
        title={quotation.quotationNumber}
        description={quotation.title}
        actions={
          <div className="flex gap-2 print:hidden">
            <Link href="/dashboard/quotations" className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}>
              Back
            </Link>
            <Button size="sm" variant="outline" onClick={() => window.print()}>
              Print
            </Button>
          </div>
        }
      />

      {message ? (
        <p className="rounded-uv-lg border border-uv-success/30 bg-uv-success/5 px-4 py-3 text-sm" role="status">
          {message}
        </p>
      ) : null}
      {error ? (
        <p className="rounded-uv-lg border border-uv-error/30 bg-uv-error/5 px-4 py-3 text-sm text-uv-error" role="alert">
          {error}
        </p>
      ) : null}

      <article className="rounded-uv-2xl border border-uv-border bg-uv-card p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-uv-border pb-4">
          <div>
            <p className="text-sm text-uv-foreground-muted">Prepared for {quotation.customerName}</p>
            <p className="text-sm text-uv-foreground-muted">
              Valid until {formatQuotationDate(quotation.validityDate)}
            </p>
          </div>
          <StatusBadge status={quotation.status.toLowerCase()} />
        </div>

        {quotation.introduction ? (
          <p className="mt-6 text-sm text-uv-foreground-muted">{quotation.introduction}</p>
        ) : null}

        <div className="mt-8 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-uv-border text-left text-uv-foreground-subtle">
                <th className="py-2 pr-4">Service / item</th>
                <th className="py-2 pr-4">Qty</th>
                <th className="py-2 pr-4">Amount</th>
              </tr>
            </thead>
            <tbody>
              {quotation.items.map((item) => (
                <tr key={item.id} className="border-b border-uv-border/60">
                  <td className="py-3 pr-4">{item.description}</td>
                  <td className="py-3 pr-4">
                    {item.quantity} {item.unit}
                  </td>
                  <td className="py-3 pr-4 font-medium">{formatInr(item.lineTotal)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 ml-auto max-w-xs space-y-2 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><span>{formatInr(quotation.subtotal)}</span></div>
          {Number(quotation.discountAmount) > 0 ? (
            <div className="flex justify-between"><span>Discount</span><span>-{formatInr(quotation.discountAmount)}</span></div>
          ) : null}
          {Number(quotation.taxAmount) > 0 ? (
            <div className="flex justify-between"><span>Tax</span><span>{formatInr(quotation.taxAmount)}</span></div>
          ) : null}
          <div className="flex justify-between border-t border-uv-border pt-2 text-base font-semibold">
            <span>Total</span><span>{formatInr(quotation.grandTotal)}</span>
          </div>
        </div>

        {quotation.customerNotes ? (
          <div className="mt-8 text-sm text-uv-foreground-muted">{quotation.customerNotes}</div>
        ) : null}

        {quotation.termsAndConditions ? (
          <div className="mt-6">
            <h2 className="text-sm font-semibold">Terms & conditions</h2>
            <p className="mt-2 whitespace-pre-wrap text-sm text-uv-foreground-muted">
              {quotation.termsAndConditions}
            </p>
          </div>
        ) : null}
      </article>

      {canRespond ? (
        <section className="rounded-uv-2xl border border-uv-border bg-uv-card p-5 print:hidden">
          <h2 className="font-semibold">Your decision</h2>
          <p className="mt-2 text-sm text-uv-foreground-muted">
            Accept to proceed with U&V, or reject with a brief reason so we can adjust the proposal.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button onClick={accept} disabled={Boolean(busy)}>
              {busy === 'accept' ? 'Accepting…' : 'Accept quotation'}
            </Button>
            <Button variant="outline" onClick={() => setShowReject((v) => !v)} disabled={Boolean(busy)}>
              Reject quotation
            </Button>
          </div>
          {showReject ? (
            <div className="mt-4 space-y-3">
              <label htmlFor="reject-reason" className="block text-sm font-medium">
                Rejection reason (required)
              </label>
              <Textarea
                id="reject-reason"
                rows={4}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
              <Button variant="outline" onClick={reject} disabled={Boolean(busy) || rejectReason.trim().length < 3}>
                {busy === 'reject' ? 'Submitting…' : 'Submit rejection'}
              </Button>
            </div>
          ) : null}
        </section>
      ) : null}

      {quotation.status === 'ACCEPTED' ? (
        <p className="text-sm text-uv-foreground-muted print:hidden" role="status">
          You accepted this quotation on {quotation.acceptedAt ? formatQuotationDate(quotation.acceptedAt) : 'record'}.
        </p>
      ) : null}
      {quotation.status === 'REJECTED' ? (
        <p className="text-sm text-uv-foreground-muted print:hidden" role="status">
          You rejected this quotation. Reason: {quotation.rejectionReason ?? 'Not provided'}
        </p>
      ) : null}
    </div>
  );
}
