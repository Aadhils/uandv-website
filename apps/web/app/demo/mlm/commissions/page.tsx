'use client';

import { useMemo, useState } from 'react';

import { Button } from '@uandv/ui';

import {
  DemoCard,
  DemoPageHeader,
  DemoTable,
  StatusBadge,
} from '@/components/demo/mlm/ui';
import { demoCommissions, formatInr } from '@/lib/demo/mlm/mock-data';

const types = ['All', 'Binary', 'Referral', 'Matching', 'Rank bonus'] as const;

export default function MlmCommissionsPage() {
  const [type, setType] = useState<(typeof types)[number]>('All');

  const rows = useMemo(() => {
    if (type === 'All') return demoCommissions;
    return demoCommissions.filter((item) => item.type === type);
  }, [type]);

  return (
    <div className="space-y-8">
      <DemoPageHeader
        title="Commission History"
        description="Filterable ledger of commission events with paid, processing, and held states."
      />

      <DemoCard
        title="Commission ledger"
        description={`${rows.length} records in current filter`}
        action={
          <div className="flex flex-wrap gap-2">
            {types.map((item) => (
              <Button
                key={item}
                type="button"
                size="sm"
                variant={type === item ? 'primary' : 'outline'}
                onClick={() => setType(item)}
              >
                {item}
              </Button>
            ))}
          </div>
        }
      >
        <DemoTable
          headers={['Date', 'Type', 'From', 'Level', 'Amount', 'Status']}
          rows={rows.map((item) => [
            item.date,
            item.type,
            item.fromMember,
            item.level,
            formatInr(item.amount),
            <StatusBadge key={item.id} status={item.status} />,
          ])}
        />
      </DemoCard>
    </div>
  );
}
