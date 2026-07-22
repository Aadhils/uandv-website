'use client';

import { useState } from 'react';

import { Button } from '@uandv/ui';

import { DemoCard, DemoPageHeader } from '@/components/demo/mlm/ui';
import { demoSettings } from '@/lib/demo/mlm/mock-data';

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
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
          checked ? 'bg-uv-brand' : 'bg-uv-border-strong'
        }`}
      >
        <span
          className={`absolute top-0.5 h-6 w-6 rounded-full bg-white transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  );
}

export default function MlmSettingsPage() {
  const [notifications, setNotifications] = useState(demoSettings.notifications);
  const [security, setSecurity] = useState(demoSettings.security);
  const [saved, setSaved] = useState(false);

  const save = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1600);
  };

  return (
    <div className="space-y-8">
      <DemoPageHeader
        title="Settings"
        description="Notification, security, and preference controls for the demo member panel."
        actions={
          <Button type="button" onClick={save}>
            {saved ? 'Saved' : 'Save changes'}
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <DemoCard title="Notifications">
          <ToggleRow
            label="Email payout alerts"
            description="Notify when commissions settle."
            checked={notifications.emailPayouts}
            onChange={(value) =>
              setNotifications((prev) => ({ ...prev, emailPayouts: value }))
            }
          />
          <ToggleRow
            label="SMS OTP"
            description="One-time codes for sensitive actions."
            checked={notifications.smsOtp}
            onChange={(value) =>
              setNotifications((prev) => ({ ...prev, smsOtp: value }))
            }
          />
          <ToggleRow
            label="WhatsApp updates"
            description="Operational updates on WhatsApp."
            checked={notifications.whatsappUpdates}
            onChange={(value) =>
              setNotifications((prev) => ({ ...prev, whatsappUpdates: value }))
            }
          />
          <ToggleRow
            label="Weekly digest"
            description="Summary of team and earnings."
            checked={notifications.weeklyDigest}
            onChange={(value) =>
              setNotifications((prev) => ({ ...prev, weeklyDigest: value }))
            }
          />
        </DemoCard>

        <DemoCard title="Security">
          <ToggleRow
            label="Two-factor authentication"
            description="Extra step at sign-in (demo toggle only)."
            checked={security.twoFactor}
            onChange={(value) =>
              setSecurity((prev) => ({ ...prev, twoFactor: value }))
            }
          />
          <ToggleRow
            label="Login alerts"
            description="Alert on new device sessions."
            checked={security.loginAlerts}
            onChange={(value) =>
              setSecurity((prev) => ({ ...prev, loginAlerts: value }))
            }
          />
        </DemoCard>
      </div>

      <DemoCard title="Preferences" description="Display defaults for this demo account.">
        <dl className="grid gap-4 sm:grid-cols-3">
          <div>
            <dt className="text-xs uppercase tracking-[0.12em] text-uv-foreground-muted">
              Language
            </dt>
            <dd className="mt-1 font-medium text-uv-foreground">
              {demoSettings.preferences.language}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.12em] text-uv-foreground-muted">
              Currency
            </dt>
            <dd className="mt-1 font-medium text-uv-foreground">
              {demoSettings.preferences.currency}
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.12em] text-uv-foreground-muted">
              Timezone
            </dt>
            <dd className="mt-1 font-medium text-uv-foreground">
              {demoSettings.preferences.timezone}
            </dd>
          </div>
        </dl>
      </DemoCard>
    </div>
  );
}
