'use client';

import * as React from 'react';

import { Checkbox, FormField } from '@uandv/ui';

import { VendorPageHeader } from '@/components/vendor/page-header';
import { LocalDemoButton } from '@/components/vendor/local-demo-button';

export function VendorSettingsPage() {
  const [deadlineAlerts, setDeadlineAlerts] = React.useState(true);
  const [paymentAlerts, setPaymentAlerts] = React.useState(true);
  const [documentAlerts, setDocumentAlerts] = React.useState(true);
  const [saved, setSaved] = React.useState(false);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <VendorPageHeader
        title="Settings"
        description="Vendor workspace preferences. Local demo toggles only — no production permission engine."
      />

      <form
        className="space-y-4 rounded-uv-xl border border-uv-border p-5"
        onSubmit={(event) => {
          event.preventDefault();
          setSaved(true);
        }}
      >
        <FormField label="Notification preferences">
          <div className="space-y-3">
            <Checkbox
              id="vendor-deadline"
              label="Deadline reminders (demo)"
              checked={deadlineAlerts}
              onChange={(event) => {
                setDeadlineAlerts(event.target.checked);
                setSaved(false);
              }}
            />
            <Checkbox
              id="vendor-payment"
              label="Payment status alerts (demo)"
              checked={paymentAlerts}
              onChange={(event) => {
                setPaymentAlerts(event.target.checked);
                setSaved(false);
              }}
            />
            <Checkbox
              id="vendor-docs"
              label="Document expiry reminders (demo)"
              checked={documentAlerts}
              onChange={(event) => {
                setDocumentAlerts(event.target.checked);
                setSaved(false);
              }}
            />
          </div>
        </FormField>

        <LocalDemoButton variant="primary" onClick={() => setSaved(true)}>
          Save preferences
        </LocalDemoButton>
        {saved ? (
          <p className="text-sm text-uv-success" role="status">
            Demo: preferences saved locally in this session.
          </p>
        ) : null}
      </form>
    </div>
  );
}
