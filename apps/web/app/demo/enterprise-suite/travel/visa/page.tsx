'use client';
import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoVisas } from '@/lib/demo/enterprise-suite/mock-data';
export default function Page() {
  const data = demoVisas;
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Visa Management" description="Visa enquiries and approval tracking." />
      <DemoCard title="Visa Management" description="Interactive mock records for this Product Demo module.">
        <DemoTable headers={['ID','Customer','Country','Docs','Application','Appointment','Approval']} rows={data.map((c) => [c.id,c.customer,c.country,c.documents.join(', '),<StatusBadge key={c.id+'-a'} status={c.applicationStatus} />,<StatusBadge key={c.id+'-b'} status={c.appointmentStatus === '—' ? 'draft' : c.appointmentStatus} />,<StatusBadge key={c.id+'-c'} status={c.approvalStatus === '—' ? 'draft' : c.approvalStatus} />])} />
      </DemoCard>
    </div>
  );
}
