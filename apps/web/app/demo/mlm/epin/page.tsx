'use client';

import { useState } from 'react';

import { Button } from '@uandv/ui';

import {
  DemoCard,
  DemoPageHeader,
  DemoTable,
  StatusBadge,
} from '@/components/demo/mlm/ui';
import { demoEpins, formatInr } from '@/lib/demo/mlm/mock-data';
import { useMlmDemoAuth } from '@/lib/demo/mlm/auth-context';
import type { EpinItem } from '@/lib/demo/mlm/types';

export default function MlmEpinPage() {
  const { session } = useMlmDemoAuth();
  const isAdmin = session?.role === 'admin';
  const [pins, setPins] = useState<EpinItem[]>(demoEpins);
  const [message, setMessage] = useState<string | null>(null);

  const generatePin = () => {
    const code = `UV-EPIN-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    setPins((current) => [
      {
        id: `EP-${900 + current.length + 1}`,
        code,
        packageName: 'Starter Pack',
        status: 'unused',
        amount: 2999,
        createdAt: '2026-07-22',
      },
      ...current,
    ]);
    setMessage(`Generated e-pin ${code} (demo).`);
  };

  const useFirstUnused = () => {
    setPins((current) => {
      const index = current.findIndex((item) => item.status === 'unused');
      if (index < 0) return current;
      return current.map((item, i) =>
        i === index ? { ...item, status: 'used' } : item,
      );
    });
    setMessage('First unused e-pin marked as used (demo).');
  };

  return (
    <div className="space-y-8">
      <DemoPageHeader
        title="E-Pin"
        description={
          isAdmin
            ? 'Generate and manage activation pins for packages.'
            : 'View, use, and track e-pins allocated to your account.'
        }
        actions={
          <>
            {isAdmin ? (
              <Button type="button" onClick={generatePin}>
                Generate e-pin
              </Button>
            ) : null}
            <Button type="button" variant="outline" onClick={useFirstUnused}>
              Use unused pin
            </Button>
          </>
        }
      />

      {message ? (
        <p className="rounded-uv-xl border border-uv-brand/30 bg-uv-brand-muted px-4 py-3 text-sm text-uv-brand">
          {message}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-3">
        <DemoCard title="Unused">
          <p className="text-2xl font-bold text-uv-foreground">
            {pins.filter((item) => item.status === 'unused').length}
          </p>
        </DemoCard>
        <DemoCard title="Used">
          <p className="text-2xl font-bold text-uv-foreground">
            {pins.filter((item) => item.status === 'used').length}
          </p>
        </DemoCard>
        <DemoCard title="Transferred">
          <p className="text-2xl font-bold text-uv-foreground">
            {pins.filter((item) => item.status === 'transferred').length}
          </p>
        </DemoCard>
      </div>

      <DemoCard title="E-pin inventory">
        <DemoTable
          headers={['Code', 'Package', 'Amount', 'Status', 'Created']}
          rows={pins.map((item) => [
            <span key={`${item.id}-code`} className="font-mono text-xs sm:text-sm">
              {item.code}
            </span>,
            item.packageName,
            formatInr(item.amount),
            <StatusBadge key={`${item.id}-status`} status={item.status} />,
            item.createdAt,
          ])}
        />
      </DemoCard>
    </div>
  );
}
