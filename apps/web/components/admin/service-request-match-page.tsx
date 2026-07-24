'use client';

import Link from 'next/link';
import { useMemo, useState, useSyncExternalStore } from 'react';

import { Checkbox, Input, buttonVariants, cn } from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import {
  MatchBreakdownCard,
  PartnerComparePanel,
} from '@/components/service-requests/shared';
import { searchPartners } from '@/lib/partners';
import {
  assignPartnerToRequest,
  getServiceRequestById,
  refreshRequestMatches,
  subscribeServiceRequests,
  type PartnerMatchResult,
} from '@/lib/service-requests';

function useRequest(requestId: string) {
  return useSyncExternalStore(
    subscribeServiceRequests,
    () => getServiceRequestById(requestId) ?? null,
    () => getServiceRequestById(requestId) ?? null,
  );
}

export function AdminServiceRequestMatchPage({
  requestId,
}: {
  requestId: string;
}) {
  const request = useRequest(requestId);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const directoryHits = useMemo(() => {
    if (!request) return [];
    return searchPartners(query || request.partnerCategory.replaceAll('_', ' '))
      .filter((p) => p.verificationStatus === 'verified')
      .slice(0, 8);
  }, [query, request]);

  if (!request) {
    return (
      <div className="mx-auto max-w-3xl space-y-4">
        <h1 className="text-xl font-semibold">Request not found</h1>
        <Link href="/admin/service-requests" className={cn(buttonVariants())}>
          Back
        </Link>
      </div>
    );
  }

  const compareSource: PartnerMatchResult[] =
    selected.length > 0
      ? request.matchResults.filter((m) => selected.includes(m.partnerId))
      : request.matchResults.slice(0, 3);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length >= 3
          ? prev
          : [...prev, id],
    );
  };

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Smart Matching workspace"
        description={`${request.id} · Demo Intelligence scoring — not real AI. Compare up to 3 partners and assign.`}
        actions={
          <Link
            href={`/admin/service-requests/${request.id}`}
            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
          >
            Request detail
          </Link>
        }
      />

      {message ? (
        <p className="rounded-uv-lg border border-uv-border px-3 py-2 text-sm" role="status">
          {message}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className={cn(buttonVariants({ size: 'sm' }))}
          onClick={() => {
            refreshRequestMatches(requestId);
            setMessage('Smart Matching refreshed.');
          }}
        >
          Re-run Smart Matching
        </button>
      </div>

      <section className="grid gap-3 lg:grid-cols-3">
        {request.matchResults.slice(0, 3).map((match) => (
          <div key={match.partnerId} className="space-y-2">
            <label className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={selected.includes(match.partnerId)}
                onChange={() => toggle(match.partnerId)}
              />
              Compare
            </label>
            <MatchBreakdownCard match={match} />
            <button
              type="button"
              className={cn(buttonVariants({ size: 'sm' }), 'w-full')}
              onClick={() => {
                assignPartnerToRequest(requestId, match.partnerId, {
                  slaHours: 24,
                  expectedCompletionDate: '2026-08-20',
                  reassign: Boolean(request.assignedPartnerId),
                });
                setMessage(`Assigned ${match.companyName}.`);
              }}
            >
              Assign this partner
            </button>
          </div>
        ))}
      </section>

      <section className="space-y-3">
        <h2 className="font-semibold">Partner comparison</h2>
        <PartnerComparePanel matches={compareSource} />
      </section>

      <section className="space-y-3">
        <h2 className="font-semibold">Search other partners</h2>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search verified partners…"
        />
        <ul className="grid gap-2 sm:grid-cols-2">
          {directoryHits.map((partner) => (
            <li
              key={partner.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-uv-lg border border-uv-border px-3 py-2"
            >
              <div>
                <p className="font-medium">{partner.companyName}</p>
                <p className="text-xs text-uv-foreground-muted">
                  ★ {partner.rating.toFixed(1)} · {partner.city}
                </p>
              </div>
              <button
                type="button"
                className={cn(buttonVariants({ size: 'sm', variant: 'outline' }))}
                onClick={() => {
                  assignPartnerToRequest(requestId, partner.id, {
                    reassign: Boolean(request.assignedPartnerId),
                  });
                  setMessage(`Assigned ${partner.companyName}.`);
                }}
              >
                Assign
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
