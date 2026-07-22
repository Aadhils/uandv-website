'use client';

import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/erp/ui';
import { demoPayroll, formatInr } from '@/lib/demo/erp/mock-data';

export default function Page() {
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Payroll Overview" description="Monthly payroll runs with gross, deductions, and net pay." />
      <DemoCard title="Payroll Overview" description="Interactive mock records for this module.">
        <DemoTable
          headers={['ID', 'Employee', 'Period', 'Gross', 'Deductions', 'Net', 'Status']}
          rows={demoPayroll.map((c) => [c.id, c.employee, c.period, formatInr(c.gross), formatInr(c.deductions), formatInr(c.net), <StatusBadge key={c.id} status={c.status} />])}
        />
      </DemoCard>
    </div>
  );
}
