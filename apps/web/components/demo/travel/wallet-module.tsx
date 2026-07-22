'use client';

import { useState } from 'react';

import { Button, Input } from '@uandv/ui';

import { formatInr } from '@/lib/demo/travel/mock-data';
import { useTravelDemoStore } from '@/lib/demo/travel/store-context';

import { DemoCard, DemoPageHeader, DemoStatCard, Field } from './ui';

export function WalletModule() {
  const { wallet, addWalletCredit } = useTravelDemoStore();
  const [amount, setAmount] = useState(1000);

  return (
    <div className="space-y-6">
      <DemoPageHeader
        title="Wallet"
        description="Mock wallet balance and ledger. Credits persist in localStorage for this Product Demo only."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <DemoStatCard label="Balance" value={formatInr(wallet.balance)} hint="Demo funds · not real money" />
        <DemoStatCard
          label="Transactions"
          value={String(wallet.txns.length)}
          hint="Credits and booking debits"
        />
      </div>

      <DemoCard title="Add demo credit">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <Field label="Amount (₹)">
            <Input
              type="number"
              min={100}
              step={100}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value) || 0)}
            />
          </Field>
          <Button
            type="button"
            onClick={() => {
              if (amount > 0) addWalletCredit(amount, 'Manual demo top-up');
            }}
          >
            Credit wallet
          </Button>
        </div>
      </DemoCard>

      <DemoCard title="Ledger">
        <div className="space-y-2">
          {wallet.txns.map((txn) => (
            <div
              key={txn.id}
              className="flex items-center justify-between gap-3 rounded-uv-lg border border-uv-border px-4 py-3 text-sm"
            >
              <div>
                <p className="font-medium text-uv-foreground">{txn.label}</p>
                <p className="text-xs text-uv-foreground-muted">
                  {new Date(txn.at).toLocaleString('en-IN')}
                </p>
              </div>
              <p
                className={
                  txn.type === 'credit' ? 'font-semibold text-uv-success' : 'font-semibold text-uv-error'
                }
              >
                {txn.type === 'credit' ? '+' : '-'}
                {formatInr(txn.amount)}
              </p>
            </div>
          ))}
        </div>
      </DemoCard>
    </div>
  );
}
