'use client';

import * as React from 'react';
import Link from 'next/link';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox,
  FormField,
  Input,
  Select,
  Textarea,
  buttonVariants,
  cn,
} from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import { LocalDemoButton } from '@/components/employee/local-demo-button';
import { SERVICE_CATEGORY_LABELS } from '@/lib/projects';

export function AdminProjectCreatePage() {
  const [saved, setSaved] = React.useState(false);

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8">
      <AdminPageHeader
        title="Create Project"
        description="Demo project creation form. Does not persist — no backend."
        actions={
          <Link
            href="/admin/projects"
            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
          >
            Back to list
          </Link>
        }
      />

      <Card padding="none">
        <CardHeader>
          <CardTitle className="text-base">Project details</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="grid gap-4 sm:grid-cols-2"
            onSubmit={(event) => {
              event.preventDefault();
              setSaved(true);
            }}
          >
            <FormField label="Customer" htmlFor="np-customer" required>
              <Select id="np-customer" name="customer" defaultValue="">
                <option value="" disabled>
                  Select customer
                </option>
                <option value="cus-001">Sunrise Retail Pvt Ltd</option>
                <option value="cus-002">GreenLeaf Organics</option>
                <option value="cus-003">Coastal Dental</option>
              </Select>
            </FormField>
            <FormField label="Service category" htmlFor="np-service" required>
              <Select id="np-service" name="service" defaultValue="website_app_development">
                {Object.entries(SERVICE_CATEGORY_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Select>
            </FormField>
            <FormField
              label="Project title"
              htmlFor="np-title"
              required
              className="sm:col-span-2"
            >
              <Input id="np-title" name="title" placeholder="Project title" />
            </FormField>
            <FormField
              label="Description"
              htmlFor="np-desc"
              className="sm:col-span-2"
            >
              <Textarea id="np-desc" name="description" rows={3} />
            </FormField>
            <FormField label="Project owner" htmlFor="np-owner">
              <Select id="np-owner" name="owner" defaultValue="emp-001">
                <option value="emp-001">Divya P.</option>
                <option value="emp-002">Meena R.</option>
                <option value="emp-003">Arun Kumar</option>
              </Select>
            </FormField>
            <FormField label="Priority" htmlFor="np-priority">
              <Select id="np-priority" name="priority" defaultValue="medium">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </Select>
            </FormField>
            <FormField label="Assigned employee(s)" htmlFor="np-employees">
              <Select id="np-employees" name="employees" defaultValue="emp-001">
                <option value="emp-001">Divya P.</option>
                <option value="emp-002">Meena R.</option>
                <option value="emp-003">Arun Kumar</option>
              </Select>
            </FormField>
            <FormField label="Assigned vendor(s)" htmlFor="np-vendors">
              <Select id="np-vendors" name="vendors" defaultValue="none">
                <option value="none">None</option>
                <option value="ven-001">Karthik Design Studio</option>
              </Select>
            </FormField>
            <FormField label="Start date" htmlFor="np-start">
              <Input id="np-start" name="start" type="date" />
            </FormField>
            <FormField label="Target completion" htmlFor="np-target">
              <Input id="np-target" name="target" type="date" />
            </FormField>
            <FormField label="Project value (INR)" htmlFor="np-value">
              <Input id="np-value" name="value" type="number" placeholder="0" />
            </FormField>
            <FormField label="Advance amount (INR)" htmlFor="np-advance">
              <Input
                id="np-advance"
                name="advance"
                type="number"
                placeholder="0"
              />
            </FormField>
            <FormField
              label="Payment milestone placeholders"
              htmlFor="np-milestones"
              className="sm:col-span-2"
              hint="Demo text only — no tax engine"
            >
              <Textarea
                id="np-milestones"
                name="milestones"
                rows={2}
                placeholder="Advance / Milestone 2 / Final"
              />
            </FormField>
            <FormField
              label="Required documents"
              htmlFor="np-docs"
              className="sm:col-span-2"
            >
              <Textarea
                id="np-docs"
                name="docs"
                rows={2}
                placeholder="Requirement, Agreement, Deliverable…"
              />
            </FormField>
            <div className="space-y-3 sm:col-span-2">
              <Checkbox
                id="np-customer-vis"
                name="customerVisibility"
                label="Enable customer-visible progress & updates"
                defaultChecked
              />
              <Checkbox
                id="np-vendor-ctx"
                name="vendorContext"
                label="Permit limited vendor project context"
              />
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
              <LocalDemoButton
                variant="primary"
                onClick={() => setSaved(true)}
              >
                Create project
              </LocalDemoButton>
              {saved ? (
                <p className="text-sm text-uv-success" role="status">
                  Demo: project create recorded locally (not saved).
                </p>
              ) : null}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
