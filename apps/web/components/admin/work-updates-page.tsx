'use client';

import * as React from 'react';

import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  FormField,
  Input,
  Textarea,
} from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import { PlaceholderAction } from '@/components/customer/placeholder-action';
import {
  demoAdminWorkUpdates,
  formatDisplayDate,
} from '@/lib/admin';

export function AdminWorkUpdatesPage() {
  const [created, setCreated] = React.useState(false);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Work Update Center"
        description="Create updates and push them to the customer dashboard, timeline, and notifications. Demo only."
      />

      <Card padding="none">
        <CardHeader>
          <CardTitle className="text-base">Create Update</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              setCreated(true);
            }}
          >
            <FormField label="Title" htmlFor="wu-title" required>
              <Input id="wu-title" name="title" placeholder="Update title" />
            </FormField>
            <FormField label="Body" htmlFor="wu-body" required>
              <Textarea
                id="wu-body"
                name="body"
                placeholder="What should the customer see?"
              />
            </FormField>
            <fieldset className="space-y-2">
              <legend className="uv-label">Publish options (demo)</legend>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="push" defaultChecked className="uv-focus-ring" />
                Push update to Customer Dashboard
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="timeline" defaultChecked className="uv-focus-ring" />
                Create timeline entry
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="notification" defaultChecked className="uv-focus-ring" />
                Create notification entry
              </label>
            </fieldset>
            <button
              type="submit"
              className="inline-flex h-9 items-center rounded-uv-lg bg-uv-brand px-4 text-sm font-medium text-uv-brand-foreground uv-focus-ring"
            >
              Publish update (demo)
            </button>
            {created ? (
              <p className="text-sm text-uv-foreground-muted" role="status">
                Demo only — no update was pushed to a live customer dashboard.
              </p>
            ) : null}
          </form>
        </CardContent>
      </Card>

      <ul className="space-y-3" role="list">
        {demoAdminWorkUpdates.map((update) => (
          <li
            key={update.id}
            className="rounded-uv-xl border border-uv-border bg-uv-card p-4 shadow-uv-sm sm:p-5"
          >
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{update.projectName}</Badge>
              {update.pushedToCustomer ? (
                <Badge variant="success">Pushed to customer</Badge>
              ) : (
                <Badge variant="secondary">Internal only</Badge>
              )}
              {update.timelineEntry ? (
                <Badge variant="info">Timeline</Badge>
              ) : null}
              {update.notificationEntry ? (
                <Badge variant="default">Notification</Badge>
              ) : null}
            </div>
            <h3 className="mt-2 font-semibold text-uv-foreground">
              {update.title}
            </h3>
            <p className="mt-1 text-sm text-uv-foreground-muted">{update.body}</p>
            <p className="mt-2 text-xs text-uv-foreground-subtle">
              {update.author} · {formatDisplayDate(update.createdAt)} ·{' '}
              {update.customerName}
            </p>
            <div className="mt-3">
              <PlaceholderAction>Push again</PlaceholderAction>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
