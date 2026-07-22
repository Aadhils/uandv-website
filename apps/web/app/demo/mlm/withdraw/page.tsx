'use client';

import { useState, type FormEvent } from 'react';

import { Button, Input } from '@uandv/ui';

import {
  DemoCard,
  DemoPageHeader,
  DemoTable,
  StatusBadge,
} from '@/components/demo/mlm/ui';
import {
  demoWallet,
  demoWithdrawRequests,
  formatInr,
} from '@/lib/demo/mlm/mock-data';
import { useMlmDemoAuth } from '@/lib/demo/mlm/auth-context';
import type { WithdrawRequest } from '@/lib/demo/mlm/types';

export default function MlmWithdrawPage() {
  const { session } = useMlmDemoAuth();
  const isAdmin = session?.role === 'admin';
  const [requests, setRequests] = useState<WithdrawRequest[]>(demoWithdrawRequests);
  const [amount, setAmount] = useState('2500');
  const [method, setMethod] = useState('UPI');
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const value = Number(amount);
    if (!Number.isFinite(value) || value <= 0) {
      setMessage('Enter a valid withdrawal amount.');
      return;
    }
    const next = {
      id: `WD-${4400 + requests.length + 1}`,
      amount: value,
      method,
      status: 'pending' as const,
      requestedAt: '2026-07-22',
      note: 'New demo request',
    };
    setRequests((current) => [next, ...current]);
    setMessage(`Withdrawal of ${formatInr(value)} submitted for review.`);
  };

  const approveFirstPending = () => {
    setRequests((current) => {
      const index = current.findIndex((item) => item.status === 'pending');
      if (index < 0) return current;
      return current.map((item, i) =>
        i === index ? { ...item, status: 'approved', note: 'Approved in admin demo' } : item,
      );
    });
    setMessage('Oldest pending withdrawal approved (demo).');
  };

  return (
    <div className="space-y-8">
      <DemoPageHeader
        title="Withdraw Request"
        description={
          isAdmin
            ? 'Approve or track member withdrawal requests from the payout queue.'
            : 'Request payouts from your available wallet balance.'
        }
        actions={
          isAdmin ? (
            <Button type="button" onClick={approveFirstPending}>
              Approve next pending
            </Button>
          ) : null
        }
      />

      {message ? (
        <p className="rounded-uv-xl border border-uv-brand/30 bg-uv-brand-muted px-4 py-3 text-sm text-uv-brand">
          {message}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <DemoCard title="Available balance">
          <p className="text-2xl font-bold text-uv-foreground">
            {formatInr(demoWallet.availableBalance)}
          </p>
        </DemoCard>
        <DemoCard title="Pending withdrawals">
          <p className="text-2xl font-bold text-uv-foreground">
            {requests.filter((item) => item.status === 'pending').length}
          </p>
        </DemoCard>
      </div>

      {!isAdmin ? (
        <DemoCard title="New withdrawal" description="Simulated request — no real transfer occurs.">
          <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-[1fr_1fr_auto]">
            <label className="text-sm font-medium text-uv-foreground">
              Amount (INR)
              <Input
                className="mt-2"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                inputMode="decimal"
              />
            </label>
            <label className="text-sm font-medium text-uv-foreground">
              Method
              <Input
                className="mt-2"
                value={method}
                onChange={(event) => setMethod(event.target.value)}
              />
            </label>
            <div className="flex items-end">
              <Button type="submit" className="w-full sm:w-auto">
                Submit request
              </Button>
            </div>
          </form>
        </DemoCard>
      ) : null}

      <DemoCard title="Request history">
        <DemoTable
          headers={['ID', 'Date', 'Method', 'Amount', 'Status', 'Note']}
          rows={requests.map((item) => [
            item.id,
            item.requestedAt,
            item.method,
            formatInr(item.amount),
            <StatusBadge key={`${item.id}-status`} status={item.status} />,
            item.note,
          ])}
        />
      </DemoCard>
    </div>
  );
}
