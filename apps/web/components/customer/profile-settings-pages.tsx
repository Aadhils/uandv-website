'use client';

import * as React from 'react';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox,
  FormField,
  Input,
  Select,
} from '@uandv/ui';

import { CustomerPageHeader } from '@/components/customer/page-header';
import { demoCustomerProfile } from '@/lib/customer';

export function CustomerProfilePage() {
  const profile = demoCustomerProfile;
  const [saved, setSaved] = React.useState(false);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <CustomerPageHeader
        title="Profile"
        description="Personal and business details. Save is a demo placeholder — nothing is persisted."
      />

      <Card padding="none">
        <CardHeader>
          <CardTitle className="text-base">Personal details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <FormField label="Full name" htmlFor="profile-name">
            <Input id="profile-name" defaultValue={profile.fullName} />
          </FormField>
          <FormField label="Email" htmlFor="profile-email">
            <Input id="profile-email" type="email" defaultValue={profile.email} />
          </FormField>
          <FormField label="Mobile" htmlFor="profile-mobile" className="sm:col-span-2">
            <Input id="profile-mobile" defaultValue={profile.mobile} />
          </FormField>
        </CardContent>
      </Card>

      <Card padding="none">
        <CardHeader>
          <CardTitle className="text-base">Business details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <FormField label="Business name" htmlFor="profile-business">
            <Input id="profile-business" defaultValue={profile.businessName} />
          </FormField>
          <FormField label="Business type" htmlFor="profile-type">
            <Input id="profile-type" defaultValue={profile.businessType} />
          </FormField>
          <FormField label="GSTIN" htmlFor="profile-gstin" hint="Placeholder only">
            <Input id="profile-gstin" defaultValue={profile.gstinPlaceholder} />
          </FormField>
          <FormField label="City" htmlFor="profile-city">
            <Input id="profile-city" defaultValue={profile.city} />
          </FormField>
          <FormField label="State" htmlFor="profile-state" className="sm:col-span-2">
            <Input id="profile-state" defaultValue={profile.state} />
          </FormField>
        </CardContent>
      </Card>

      <Button
        type="button"
        onClick={() => setSaved(true)}
      >
        Save profile (demo)
      </Button>
      {saved ? (
        <p className="text-sm text-uv-foreground-muted" role="status">
          Demo only — profile changes were not saved to a database.
        </p>
      ) : null}
    </div>
  );
}

export function CustomerSettingsPage() {
  const profile = demoCustomerProfile;
  const [saved, setSaved] = React.useState(false);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <CustomerPageHeader
        title="Settings"
        description="Communication preferences, language, and security placeholders."
      />

      <Card padding="none">
        <CardHeader>
          <CardTitle className="text-base">Communication preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Checkbox
            id="pref-email"
            defaultChecked={profile.emailUpdates}
            label="Email updates"
          />
          <Checkbox
            id="pref-sms"
            defaultChecked={profile.smsUpdates}
            label="SMS updates"
          />
          <Checkbox
            id="pref-wa"
            defaultChecked={profile.whatsappUpdates}
            label="WhatsApp updates"
          />
        </CardContent>
      </Card>

      <Card padding="none">
        <CardHeader>
          <CardTitle className="text-base">Language preference</CardTitle>
        </CardHeader>
        <CardContent>
          <FormField label="Preferred language" htmlFor="settings-language">
            <Select id="settings-language" defaultValue={profile.preferredLanguage}>
              <option value="English">English</option>
              <option value="Tamil">Tamil</option>
              <option value="Hindi">Hindi</option>
              <option value="Malayalam">Malayalam</option>
            </Select>
          </FormField>
        </CardContent>
      </Card>

      <Card padding="none">
        <CardHeader>
          <CardTitle className="text-base">Security settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-uv-foreground-muted">
          <p>Password change — placeholder (no auth backend).</p>
          <p>Two-factor authentication — coming in a later sprint.</p>
          <p>Session management — not production-secure yet.</p>
        </CardContent>
      </Card>

      <Card padding="none">
        <CardHeader>
          <CardTitle className="text-base">Connected devices</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="rounded-uv-lg border border-uv-border px-3 py-3">
            <p className="font-medium text-uv-foreground">Chrome · Windows</p>
            <p className="text-uv-foreground-muted">
              Demo device · Current session placeholder
            </p>
          </div>
          <div className="rounded-uv-lg border border-uv-border px-3 py-3">
            <p className="font-medium text-uv-foreground">Safari · iPhone</p>
            <p className="text-uv-foreground-muted">
              Demo device · Last active 2 days ago (static)
            </p>
          </div>
        </CardContent>
      </Card>

      <Button type="button" onClick={() => setSaved(true)}>
        Save settings (demo)
      </Button>
      {saved ? (
        <p className="text-sm text-uv-foreground-muted" role="status">
          Demo only — settings were not persisted.
        </p>
      ) : null}
    </div>
  );
}
