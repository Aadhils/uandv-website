'use client';

import Image from 'next/image';
import * as React from 'react';

import { Button, Textarea } from '@uandv/ui';

import { StatusBadge } from '@/components/customer/status-badge';
import { formatInr, formatQuotationDate } from '@/lib/quotations/format';
import type { QuotationDto } from '@/lib/quotations/mapper';
import { siteConfig } from '@/lib/site';

export function PublicQuotationPage({
  quotation: initial,
  token,
}: {
  quotation: QuotationDto;
  token: string;
}) {
  const [quotation, setQuotation] = React.useState(initial);
  const [rejectReason, setRejectReason] = React.useState('');
  const [showReject, setShowReject] = React.useState(false);
  const [busy, setBusy] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    void fetch(`/api/public/quotations/${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'view' }),
    });
  }, [token]);

  const canRespond = quotation.status === 'SENT' || quotation.status === 'VIEWED';

  const runAction = async (action: 'accept' | 'reject') => {
    setBusy(action);
    setError(null);
    try {
      const response = await fetch(`/api/public/quotations/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          action === 'reject'
            ? { action, reason: rejectReason }
            : { action },
        ),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        error?: string;
        quotation?: QuotationDto;
      };
      if (!response.ok || !result.ok || !result.quotation) {
        setError(result.error ?? `Unable to ${action} quotation.`);
        return;
      }
      setQuotation(result.quotation);
      setMessage(
        action === 'accept'
          ? 'Quotation accepted. Our team will follow up shortly.'
          : 'Quotation rejected. Your response has been recorded.',
      );
      setShowReject(false);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-4xl flex-col gap-8 px-4 py-10 sm:px-6">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-uv-border pb-6">
        <div className="flex items-center gap-3">
          <Image
            src="/brand/logo-mark.svg"
            alt={`${siteConfig.name} logo`}
            width={40}
            height={40}
            className="h-10 w-10"
          />
          <div>
            <p className="font-[family-name:var(--font-uv-display)] text-lg font-semibold">
              {siteConfig.legalName}
            </p>
            <p className="text-sm text-uv-foreground-muted">Secure quotation review</p>
          </div>
        </div>
        <StatusBadge status={quotation.status.toLowerCase()} />
      </header>

      <div className="space-y-2">
        <p className="text-sm text-uv-foreground-muted">{quotation.quotationNumber}</p>
        <h1 className="text-2xl font-semibold tracking-tight">{quotation.title}</h1>
        <p className="text-sm text-uv-foreground-muted">
          Prepared for {quotation.customerName} · Valid until{' '}
          {formatQuotationDate(quotation.validityDate)}
        </p>
      </div>

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

      <section className="rounded-uv-2xl border border-uv-border bg-uv-card p-6 sm:p-8">
        {quotation.introduction ? (
          <p className="mb-6 text-sm text-uv-foreground-muted">{quotation.introduction}</p>
        ) : null}

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-uv-border text-left text-uv-foreground-subtle">
                <th className="py-2 pr-4">Description</th>
                <th className="py-2 pr-4">Qty</th>
                <th className="py-2 pr-4">Rate</th>
                <th className="py-2 pr-4">Total</th>
              </tr>
            </thead>
            <tbody>
              {quotation.items.map((item) => (
                <tr key={item.id} className="border-b border-uv-border/60">
                  <td className="py-3 pr-4">{item.description}</td>
                  <td className="py-3 pr-4">
                    {parseFloat(item.quantity)} {item.unit}
                  </td>
                  <td className="py-3 pr-4">{formatInr(item.unitPrice)}</td>
                  <td className="py-3 pr-4 font-medium">{formatInr(item.lineTotal)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 ml-auto max-w-sm space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatInr(quotation.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span>-{formatInr(quotation.discountAmount)}</span>
          </div>
          <div className="flex justify-between">
            <span>
              {quotation.taxType} ({quotation.taxRate}%)
            </span>
            <span>{formatInr(quotation.taxAmount)}</span>
          </div>
          <div className="flex justify-between border-t border-uv-border pt-2 text-base font-semibold">
            <span>Grand total</span>
            <span>{formatInr(quotation.grandTotal)}</span>
          </div>
        </div>

        {quotation.termsAndConditions ? (
          <div className="mt-8">
            <h2 className="font-medium">Terms & conditions</h2>
            <p className="mt-2 whitespace-pre-wrap text-sm text-uv-foreground-muted">
              {quotation.termsAndConditions}
            </p>
          </div>
        ) : null}
      </section>

      {canRespond ? (
        <section className="rounded-uv-2xl border border-uv-border bg-uv-card p-6">
          <h2 className="font-semibold">Your decision</h2>
          <p className="mt-2 text-sm text-uv-foreground-muted">
            Accept to proceed with this quotation, or reject with a short reason.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button onClick={() => runAction('accept')} disabled={Boolean(busy)}>
              {busy === 'accept' ? 'Accepting…' : 'Accept quotation'}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowReject((value) => !value)}
              disabled={Boolean(busy)}
            >
              Reject quotation
            </Button>
          </div>
          {showReject ? (
            <div className="mt-4 space-y-3">
              <Textarea
                value={rejectReason}
                onChange={(event) => setRejectReason(event.target.value)}
                placeholder="Please share why you are rejecting this quotation."
                rows={4}
              />
              <Button
                variant="outline"
                onClick={() => runAction('reject')}
                disabled={Boolean(busy) || rejectReason.trim().length < 3}
              >
                {busy === 'reject' ? 'Submitting…' : 'Submit rejection'}
              </Button>
            </div>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
