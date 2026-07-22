'use client';
import Link from 'next/link';
import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoEmployees } from '@/lib/demo/enterprise-suite/mock-data';
export default function Page() {
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Employees" description="HR roster with role assignment." />
      <DemoCard title="Employee list">
        <DemoTable
          headers={['Employee','Department','Role','Join date','Status','']}
          rows={demoEmployees.map((c) => [c.name, c.department, c.role, c.joinDate, <StatusBadge key={c.id} status={c.status} />, <Link key={c.id+'-l'} href={`/demo/enterprise-suite/hr/profile?id=${c.id}`} className="text-sm font-medium text-uv-brand underline-offset-4 hover:underline">Profile</Link>])}
        />
      </DemoCard>
    </div>
  );
}
