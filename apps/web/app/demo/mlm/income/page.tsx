'use client';

import { DemoCard, DemoPageHeader, DemoTable } from '@/components/demo/mlm/ui';
import { IncomeBars } from '@/components/demo/mlm/trees';
import { demoIncomeReport, formatInr } from '@/lib/demo/mlm/mock-data';

export default function MlmIncomePage() {
  const totals = demoIncomeReport.reduce(
    (acc, row) => ({
      binary: acc.binary + row.binary,
      referral: acc.referral + row.referral,
      matching: acc.matching + row.matching,
      rankBonus: acc.rankBonus + row.rankBonus,
      total: acc.total + row.total,
    }),
    { binary: 0, referral: 0, matching: 0, rankBonus: 0, total: 0 },
  );

  return (
    <div className="space-y-8">
      <DemoPageHeader
        title="Income Report"
        description="Monthly income breakdown across binary, referral, matching, and rank bonuses."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {(
          [
            ['Binary', totals.binary],
            ['Referral', totals.referral],
            ['Matching', totals.matching],
            ['Rank bonus', totals.rankBonus],
            ['Total', totals.total],
          ] as const
        ).map(([label, value]) => (
          <DemoCard key={label} title={label}>
            <p className="text-xl font-bold text-uv-foreground">{formatInr(value)}</p>
          </DemoCard>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <DemoCard title="Monthly totals" description="Interactive bar view of mock monthly income.">
          <IncomeBars rows={demoIncomeReport} />
        </DemoCard>
        <DemoCard title="Detailed report">
          <DemoTable
            headers={['Period', 'Binary', 'Referral', 'Matching', 'Rank', 'Total']}
            rows={demoIncomeReport.map((row) => [
              row.period,
              formatInr(row.binary),
              formatInr(row.referral),
              formatInr(row.matching),
              formatInr(row.rankBonus),
              <strong key={row.id}>{formatInr(row.total)}</strong>,
            ])}
          />
        </DemoCard>
      </div>
    </div>
  );
}
