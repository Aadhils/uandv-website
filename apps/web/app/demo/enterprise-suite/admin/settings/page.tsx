'use client';
import { useState } from 'react';
import { Button } from '@uandv/ui';
import { DemoCard, DemoPageHeader } from '@/components/demo/enterprise-suite/ui';
import { demoSettings } from '@/lib/demo/enterprise-suite/mock-data';

function Toggle({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-uv-border py-4 last:border-b-0">
      <div><p className="font-medium">{label}</p><p className="mt-1 text-sm text-uv-foreground-muted">{description}</p></div>
      <button type="button" role="switch" aria-checked={checked} onClick={() => onChange(!checked)} className={`relative h-7 w-12 rounded-full ${checked ? 'bg-uv-brand' : 'bg-uv-border-strong'}`}>
        <span className={`absolute top-0.5 h-6 w-6 rounded-full bg-white transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
      </button>
    </div>
  );
}

export default function Page() {
  const [n, setN] = useState(demoSettings.notifications);
  const [saved, setSaved] = useState(false);
  return (
    <div className="space-y-8">
      <DemoPageHeader title="Company Settings" description="Company defaults for this Product Demo workspace." actions={<Button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 1200); }}>{saved ? 'Saved' : 'Save changes'}</Button>} />
      <DemoCard title="Company">
        <dl className="grid gap-4 sm:grid-cols-2">
          {[['Company', demoSettings.company],['Fiscal year', demoSettings.fiscalYear],['Currency', demoSettings.currency],['Timezone', demoSettings.timezone]].map(([k,v]) => (
            <div key={k}><dt className="text-xs uppercase tracking-[0.12em] text-uv-foreground-muted">{k}</dt><dd className="mt-1 font-medium">{v}</dd></div>
          ))}
        </dl>
      </DemoCard>
      <DemoCard title="Notification settings">
        <Toggle label="Deal alerts" description="CRM stage changes" checked={n.dealAlerts} onChange={(v) => setN((p) => ({ ...p, dealAlerts: v }))} />
        <Toggle label="Leave alerts" description="HR leave requests" checked={n.leaveAlerts} onChange={(v) => setN((p) => ({ ...p, leaveAlerts: v }))} />
        <Toggle label="Low stock" description="Inventory reorder alerts" checked={n.lowStock} onChange={(v) => setN((p) => ({ ...p, lowStock: v }))} />
        <Toggle label="Travel reminders" description="Departure and document reminders" checked={n.travelReminders} onChange={(v) => setN((p) => ({ ...p, travelReminders: v }))} />
        <Toggle label="Payment reminders" description="Outstanding balances" checked={n.paymentReminders} onChange={(v) => setN((p) => ({ ...p, paymentReminders: v }))} />
      </DemoCard>
    </div>
  );
}
