'use client';

import * as React from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  FormField,
  Input,
  Select,
} from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import { PlaceholderAction } from '@/components/customer/placeholder-action';
import { ResponsiveDataList } from '@/components/customer/responsive-data-list';
import { StatusBadge } from '@/components/customer/status-badge';
import { ProgressBar } from '@/components/lifecycle/progress-bar';
import {
  demoAdminProjects,
  formatDisplayDate,
  getMilestonesForAdminProject,
} from '@/lib/admin';

export function AdminProjectsPage() {
  const [saved, setSaved] = React.useState(false);
  const focusProject = demoAdminProjects[0];
  const milestones = focusProject
    ? getMilestonesForAdminProject(focusProject.id)
    : [];

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Project Management"
        description="Create projects, assign teams, and track milestones. Demo forms do not persist."
        actions={
          <PlaceholderAction>Create project</PlaceholderAction>
        }
      />

      <Card padding="none">
        <CardHeader>
          <CardTitle className="text-base">Create Project (placeholder)</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="grid gap-4 sm:grid-cols-2"
            onSubmit={(event) => {
              event.preventDefault();
              setSaved(true);
            }}
          >
            <FormField label="Project name" htmlFor="ap-name" required>
              <Input id="ap-name" name="name" placeholder="New project name" />
            </FormField>
            <FormField label="Customer" htmlFor="ap-customer" required>
              <Select id="ap-customer" name="customer" defaultValue="">
                <option value="" disabled>
                  Select customer
                </option>
                <option value="sunrise">Sunrise Retail Pvt Ltd</option>
                <option value="coastal">Coastal Travels</option>
                <option value="greenleaf">GreenLeaf Organics</option>
              </Select>
            </FormField>
            <FormField label="Assign team" htmlFor="ap-team">
              <Select id="ap-team" name="team" defaultValue="web">
                <option value="web">U&V Web Delivery</option>
                <option value="integrations">U&V Integrations</option>
                <option value="mobile">U&V Mobile</option>
                <option value="creative">U&V Creative</option>
              </Select>
            </FormField>
            <FormField label="Target completion" htmlFor="ap-target">
              <Input id="ap-target" name="target" type="date" />
            </FormField>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="inline-flex h-9 items-center rounded-uv-lg bg-uv-brand px-4 text-sm font-medium text-uv-brand-foreground uv-focus-ring"
              >
                Save project (demo)
              </button>
              {saved ? (
                <p className="mt-2 text-sm text-uv-foreground-muted" role="status">
                  Demo only — project was not saved to a database.
                </p>
              ) : null}
            </div>
          </form>
        </CardContent>
      </Card>

      <ResponsiveDataList
        rows={demoAdminProjects}
        getRowId={(row) => row.id}
        mobileTitle={(row) => row.name}
        columns={[
          {
            key: 'name',
            header: 'Project',
            hideOnMobile: true,
            render: (row) => (
              <div>
                <p className="font-medium">{row.name}</p>
                <p className="text-xs text-uv-foreground-muted">
                  {row.customerName}
                </p>
              </div>
            ),
          },
          {
            key: 'status',
            header: 'Status',
            render: (row) => <StatusBadge status={row.status} />,
          },
          {
            key: 'progress',
            header: 'Completion %',
            render: (row) => (
              <div className="min-w-[8rem]">
                <ProgressBar
                  value={row.progress}
                  label="Progress"
                  size="sm"
                />
              </div>
            ),
          },
          {
            key: 'team',
            header: 'Assigned team',
            mobileLabel: 'Team',
            render: (row) => row.assignedTeam,
          },
          {
            key: 'milestone',
            header: 'Current milestone',
            render: (row) => row.currentMilestone,
          },
          {
            key: 'target',
            header: 'Target',
            render: (row) => formatDisplayDate(row.targetCompletionDate),
          },
          {
            key: 'actions',
            header: 'Actions',
            render: () => (
              <div className="flex flex-wrap gap-2">
                <PlaceholderAction>Progress update</PlaceholderAction>
                <PlaceholderAction>Assign team</PlaceholderAction>
              </div>
            ),
          },
        ]}
      />

      {focusProject ? (
        <Card padding="none">
          <CardHeader>
            <CardTitle className="text-base">
              Milestones · {focusProject.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="relative space-y-0 border-l border-uv-border pl-5">
              {milestones.map((milestone) => (
                <li key={milestone.id} className="relative pb-4 last:pb-0">
                  <span
                    className="absolute -left-[1.4rem] top-1.5 h-3 w-3 rounded-full border-2 border-uv-brand bg-uv-background"
                    aria-hidden
                  />
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium">{milestone.title}</p>
                    <StatusBadge status={milestone.status} />
                  </div>
                  <p className="text-xs text-uv-foreground-subtle">
                    Due {formatDisplayDate(milestone.dueDate)}
                  </p>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
