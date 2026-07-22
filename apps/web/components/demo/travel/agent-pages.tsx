'use client';

import { useState } from 'react';

import { Button, cn } from '@uandv/ui';

import { adminCustomers, agentRequests, formatInr } from '@/lib/demo/travel/mock-data';
import { useTravelDemoStore } from '@/lib/demo/travel/store-context';

import {
  DemoCard,
  DemoPageHeader,
  DemoStatCard,
  DemoTable,
  StatusBadge,
} from './ui';

export function AgentDashboard() {
  const { bookings } = useTravelDemoStore();
  const open = agentRequests.filter((r) => r.status === 'open' || r.status === 'quoted').length;
  const commission = agentRequests.reduce((s, r) => s + r.commission, 0);

  return (
    <div className="space-y-6">
      <DemoPageHeader
        title="Travel Agent Dashboard"
        description="Booking requests, customers, commission, and payment status — Product Demo · Mock Data."
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DemoStatCard label="Open requests" value={String(open)} hint="Need agent action" />
        <DemoStatCard label="Commission pipeline" value={formatInr(commission)} hint="Estimated mock commission" />
        <DemoStatCard label="Customers" value={String(adminCustomers.length)} hint="Assigned demo accounts" />
        <DemoStatCard
          label="Platform bookings"
          value={String(bookings.length)}
          hint="Visible for coordination"
        />
      </div>
      <DemoCard title="Latest booking requests">
        <DemoTable
          headers={['ID', 'Customer', 'Type', 'Summary', 'Status', 'Commission']}
          rows={agentRequests.map((r) => [
            r.id,
            r.customer,
            r.type,
            r.summary,
            <StatusBadge key={r.id} status={r.status} />,
            formatInr(r.commission),
          ])}
        />
      </DemoCard>
    </div>
  );
}

export function AgentRequestsPage() {
  const [rows, setRows] = useState(agentRequests);

  const advance = (id: string) => {
    setRows((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const next =
          r.status === 'open' ? 'quoted' : r.status === 'quoted' ? 'in_review' : 'confirmed';
        return { ...r, status: next };
      }),
    );
  };

  return (
    <div className="space-y-6">
      <DemoPageHeader
        title="Booking Requests"
        description="Advance request status in frontend state — Product Demo · Mock Data."
      />
      <div className="space-y-3">
        {rows.map((r) => (
          <article
            key={r.id}
            className="flex flex-col gap-3 rounded-uv-xl border border-uv-border bg-uv-background p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-semibold text-uv-foreground">
                {r.id} · {r.customer}
              </p>
              <p className="text-sm text-uv-foreground-muted">
                {r.type} — {r.summary}
              </p>
              <div className="mt-2">
                <StatusBadge status={r.status} />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <p className="font-medium text-uv-brand">{formatInr(r.commission)}</p>
              <Button type="button" size="sm" onClick={() => advance(r.id)}>
                Advance status
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function AgentCustomersPage() {
  return (
    <div className="space-y-6">
      <DemoPageHeader title="Customer Management" description="Demo traveler profiles assigned to the agent." />
      <DemoCard>
        <DemoTable
          headers={['Name', 'Email', 'Bookings', 'Lifetime spend']}
          rows={adminCustomers.map((c) => [c.name, c.email, String(c.bookings), formatInr(c.spend)])}
        />
      </DemoCard>
    </div>
  );
}

export function AgentCommissionPage() {
  const total = agentRequests.reduce((s, r) => s + r.commission, 0);
  return (
    <div className="space-y-6">
      <DemoPageHeader title="Commission" description="Mock commission by request." />
      <DemoStatCard label="Pipeline total" value={formatInr(total)} hint="Not settled funds" />
      <DemoCard>
        <DemoTable
          headers={['Request', 'Customer', 'Status', 'Commission']}
          rows={agentRequests.map((r) => [
            r.id,
            r.customer,
            <StatusBadge key={r.id} status={r.status} />,
            formatInr(r.commission),
          ])}
        />
      </DemoCard>
    </div>
  );
}

export function AgentPaymentsPage() {
  const [payments, setPayments] = useState(
    agentRequests.map((r) => ({
      id: r.id,
      customer: r.customer,
      amount: r.commission,
      status: r.status === 'confirmed' ? 'settled' : 'pending',
    })),
  );

  return (
    <div className="space-y-6">
      <DemoPageHeader
        title="Payment Status"
        description="Mark agent commission settlements in local demo state."
      />
      <div className="space-y-3">
        {payments.map((p) => (
          <div
            key={p.id}
            className="flex flex-col gap-3 rounded-uv-xl border border-uv-border p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-semibold">
                {p.id} · {p.customer}
              </p>
              <div className="mt-2">
                <StatusBadge status={p.status} />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <p className="font-bold text-uv-brand">{formatInr(p.amount)}</p>
              {p.status !== 'settled' ? (
                <Button
                  type="button"
                  size="sm"
                  onClick={() =>
                    setPayments((prev) =>
                      prev.map((row) => (row.id === p.id ? { ...row, status: 'settled' } : row)),
                    )
                  }
                >
                  Mark settled
                </Button>
              ) : (
                <span className={cn('text-sm text-uv-success')}>Settled</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
