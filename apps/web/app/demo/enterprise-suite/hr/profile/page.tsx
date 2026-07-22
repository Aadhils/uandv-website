'use client';
import { useSearchParams } from 'next/navigation';
import { DemoCard, DemoPageHeader, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoEmployees, formatInr } from '@/lib/demo/enterprise-suite/mock-data';
export default function Page() {
  const params = useSearchParams();
  const id = params.get('id') ?? 'EMP-01';
  const emp = demoEmployees.find((e) => e.id === id) ?? demoEmployees[0];
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Employee Profile" description="Role assignment and employment details for the selected demo employee." />
      <DemoCard title={emp.name}>
        <dl className="grid gap-4 sm:grid-cols-2">
          {[['ID', emp.id],['Email', emp.email],['Department', emp.department],['Role assignment', emp.role],['Join date', emp.joinDate],['Salary', formatInr(emp.salary)],['Status', emp.status]].map(([k,v]) => (
            <div key={k}><dt className="text-xs uppercase tracking-[0.12em] text-uv-foreground-muted">{k}</dt><dd className="mt-1 font-medium">{k === 'Status' ? <StatusBadge status={String(v)} /> : v}</dd></div>
          ))}
        </dl>
      </DemoCard>
    </div>
  );
}
