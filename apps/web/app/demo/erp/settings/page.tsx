'use client';

import { useState } from 'react';
import { Button } from '@uandv/ui';
import { DemoCard, DemoPageHeader } from '@/components/demo/erp/ui';
import { demoSettings } from '@/lib/demo/erp/mock-data';

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-uv-border py-4 last:border-b-0">
      <div>
        <p className="font-medium text-uv-foreground">{label}</p>
        <p className="mt-1 text-sm text-uv-foreground-muted">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${checked ? 'bg-uv-brand' : 'bg-uv-border-strong'}`}
      >
        <span className={`absolute top-0.5 h-6 w-6 rounded-full bg-white transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
      </button>
    </div>
  );
}

export default function ErpSettingsPage() {
  const [notifications, setNotifications] = useState(demoSettings.notifications);
  const [saved, setSaved] = useState(false);

  return (
    <div className="space-y-8">
      <DemoPageHeader
        title="Settings"
        description="Company defaults and notification preferences for the demo workspace."
        actions={<Button type="button" onClick={() => { setSaved(true); window.setTimeout(() => setSaved(false), 1500); }}>{saved ? 'Saved' : 'Save changes'}</Button>}
      />
      <DemoCard title="Company">
        <dl className="grid gap-4 sm:grid-cols-2">
          {[
            ['Company', demoSettings.company],
            ['Fiscal year', demoSettings.fiscalYear],
            ['Currency', demoSettings.currency],
            ['Timezone', demoSettings.timezone],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs uppercase tracking-[0.12em] text-uv-foreground-muted">{label}</dt>
              <dd className="mt-1 font-medium text-uv-foreground">{value}</dd>
            </div>
          ))}
        </dl>
      </DemoCard>
      <DemoCard title="Notifications">
        <ToggleRow label="Deal alerts" description="Notify when deals move stage." checked={notifications.dealAlerts} onChange={(v) => setNotifications((p) => ({ ...p, dealAlerts: v }))} />
        <ToggleRow label="Leave alerts" description="Notify HR of leave requests." checked={notifications.leaveAlerts} onChange={(v) => setNotifications((p) => ({ ...p, leaveAlerts: v }))} />
        <ToggleRow label="Low stock" description="Alert when SKUs hit reorder level." checked={notifications.lowStock} onChange={(v) => setNotifications((p) => ({ ...p, lowStock: v }))} />
        <ToggleRow label="Invoice reminders" description="Remind for overdue invoices." checked={notifications.invoiceReminders} onChange={(v) => setNotifications((p) => ({ ...p, invoiceReminders: v }))} />
      </DemoCard>
    </div>
  );
}
