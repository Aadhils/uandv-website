'use client';

import { useMemo, useState } from 'react';

import { Button } from '@uandv/ui';

import {
  DemoCard,
  DemoPageHeader,
  DemoTable,
  StatusBadge,
} from '@/components/demo/mlm/ui';
import { demoWallet, formatInr } from '@/lib/demo/mlm/mock-data';

export default function MlmWalletPage() {
  const [filter, setFilter] = useState<'all' | 'credit' | 'debit'>('all');
  const [message, setMessage] = useState<string | null>(null);

  const rows = useMemo(() => {
    return demoWallet.transactions.filter((txn) =>
      filter === 'all' ? true : txn.type === filter,
    );
  }, [filter]);

  const requestWithdraw = () => {
    setMessage(
      'Withdrawal requested in demo mode. No real payment is processed.',
    );
  };

  return (
    <div className="space-y-8">
      <DemoPageHeader
        title="Wallet"
        description="E-wallet balances, filters, and mock withdrawal actions."
        actions={
          <Button type="button" onClick={requestWithdraw}>
            Request withdrawal
          </Button>
        }
      />

      {message ? (
        <p className="rounded-uv-xl border border-uv-brand/30 bg-uv-brand-muted px-4 py-3 text-sm text-uv-brand">
          {message}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-3">
        <DemoCard title="Available">
          <p className="text-2xl font-bold text-uv-foreground">
            {formatInr(demoWallet.availableBalance)}
          </p>
        </DemoCard>
        <DemoCard title="Pending">
          <p className="text-2xl font-bold text-uv-foreground">
            {formatInr(demoWallet.pendingBalance)}
          </p>
        </DemoCard>
        <DemoCard title="Lifetime earnings">
          <p className="text-2xl font-bold text-uv-foreground">
            {formatInr(demoWallet.lifetimeEarnings)}
          </p>
        </DemoCard>
      </div>

      <DemoCard
        title="Transactions"
        description="Filter mock ledger entries by credit or debit."
        action={
          <div className="flex flex-wrap gap-2">
            {(['all', 'credit', 'debit'] as const).map((item) => (
              <Button
                key={item}
                type="button"
                size="sm"
                variant={filter === item ? 'primary' : 'outline'}
                onClick={() => setFilter(item)}
              >
                {item}
              </Button>
            ))}
          </div>
        }
      >
        <DemoTable
          headers={['Date', 'Category', 'Reference', 'Amount', 'Status']}
          rows={rows.map((txn) => [
            txn.date,
            txn.category,
            txn.reference,
            <span
              key={`${txn.id}-amt`}
              className={
                txn.type === 'credit' ? 'font-medium text-uv-success' : 'font-medium text-uv-error'
              }
            >
              {txn.type === 'credit' ? '+' : '-'}
              {formatInr(txn.amount)}
            </span>,
            <StatusBadge key={`${txn.id}-status`} status={txn.status} />,
          ])}
        />
      </DemoCard>
    </div>
  );
}
