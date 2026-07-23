'use client';

import * as React from 'react';

import { Checkbox, FormField } from '@uandv/ui';

import { EmployeePageHeader } from '@/components/employee/page-header';
import { LocalDemoButton } from '@/components/employee/local-demo-button';

export function EmployeeSettingsPage() {
  const [emailDigest, setEmailDigest] = React.useState(true);
  const [meetingReminders, setMeetingReminders] = React.useState(true);
  const [followUpAlerts, setFollowUpAlerts] = React.useState(true);
  const [saved, setSaved] = React.useState(false);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <EmployeePageHeader
        title="Settings"
        description="Employee workspace preferences. Local demo toggles only — no production permission engine."
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
              id="setting-email-digest"
              label="Daily email digest (demo)"
              checked={emailDigest}
              onChange={(event) => {
                setEmailDigest(event.target.checked);
                setSaved(false);
              }}
            />
            <Checkbox
              id="setting-meeting"
              label="Meeting reminders (demo)"
              checked={meetingReminders}
              onChange={(event) => {
                setMeetingReminders(event.target.checked);
                setSaved(false);
              }}
            />
            <Checkbox
              id="setting-followup"
              label="Follow-up due alerts (demo)"
              checked={followUpAlerts}
              onChange={(event) => {
                setFollowUpAlerts(event.target.checked);
                setSaved(false);
              }}
            />
          </div>
        </FormField>

        <LocalDemoButton
          variant="primary"
          onClick={() => setSaved(true)}
        >
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
