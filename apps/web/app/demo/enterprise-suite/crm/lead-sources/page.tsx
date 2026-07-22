'use client';
import { DemoCard, DemoPageHeader, HorizontalBars } from '@/components/demo/enterprise-suite/ui';
import { demoLeadSources, demoLeads } from '@/lib/demo/enterprise-suite/mock-data';
export default function Page() {
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Lead Source Tracking" description="Where demo leads originate." />
      <DemoCard title="Source mix"><HorizontalBars data={demoLeadSources} /></DemoCard>
      <DemoCard title="Assignment by executive">
        <ul className="space-y-2">
          {[...new Set(demoLeads.map((l) => l.owner))].map((owner) => (
            <li key={owner} className="flex justify-between rounded-uv-lg border border-uv-border px-3 py-3 text-sm">
              <span>{owner}</span>
              <span className="font-medium">{demoLeads.filter((l) => l.owner === owner).length} leads</span>
            </li>
          ))}
        </ul>
      </DemoCard>
    </div>
  );
}
