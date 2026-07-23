'use client';

import { useRouter } from 'next/navigation';
import * as React from 'react';

import { Input, buttonVariants, cn } from '@uandv/ui';

import {
  PARTNER_CATEGORY_LABELS,
  type PartnerCategory,
} from '@/lib/partners';
import {
  createServiceRequest,
  type ServiceRequestPriority,
  type ServiceRequestSource,
} from '@/lib/service-requests';

const CATEGORIES = Object.keys(PARTNER_CATEGORY_LABELS) as PartnerCategory[];

export type CreateRequestDefaults = {
  businessCategory?: string;
  partnerCategory?: PartnerCategory;
  requestedService?: string;
  city?: string;
  state?: string;
  budgetMinInr?: number;
  budgetMaxInr?: number;
  timelineDays?: number;
  requiredDocuments?: string[];
  marketplaceServiceId?: string | null;
  estimatedPriceInr?: number | null;
  estimatedDurationDays?: number | null;
  source?: ServiceRequestSource;
  detailBasePath?: string;
};

export function CreateServiceRequestForm({
  defaults,
}: {
  defaults?: CreateRequestDefaults;
} = {}) {
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);
  const detailBase = defaults?.detailBasePath ?? '/dashboard/service-requests';

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const form = new FormData(event.currentTarget);
    const partnerCategory = String(form.get('partnerCategory') ?? '') as PartnerCategory;
    const requestedService = String(form.get('requestedService') ?? '').trim();
    const city = String(form.get('city') ?? '').trim();
    const state = String(form.get('state') ?? '').trim();
    if (!requestedService || !partnerCategory || !city || !state) {
      setError('Please complete the required fields.');
      return;
    }

    setBusy(true);
    const request = createServiceRequest({
      businessCategory: String(form.get('businessCategory') ?? 'General'),
      partnerCategory,
      requestedService,
      city,
      state,
      budgetMinInr: Number(form.get('budgetMinInr') ?? 5000),
      budgetMaxInr: Number(form.get('budgetMaxInr') ?? 25000),
      timelineDays: Number(form.get('timelineDays') ?? 30),
      requiredDocuments: String(form.get('requiredDocuments') ?? '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      priority: String(form.get('priority') ?? 'medium') as ServiceRequestPriority,
      source: defaults?.source ?? 'dashboard',
      marketplaceServiceId: defaults?.marketplaceServiceId ?? null,
      estimatedPriceInr: defaults?.estimatedPriceInr ?? null,
      estimatedDurationDays: defaults?.estimatedDurationDays ?? null,
    });
    setBusy(false);
    router.push(`${detailBase}/${request.id}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 rounded-uv-2xl border border-uv-border bg-uv-background-subtle p-4 sm:p-6"
    >
      <p className="text-xs text-uv-foreground-subtle">
        Smart Matching runs after submit (Demo Intelligence — not real AI).
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Business category" htmlFor="businessCategory">
          <Input
            id="businessCategory"
            name="businessCategory"
            defaultValue={defaults?.businessCategory ?? 'Retail'}
          />
        </Field>
        <Field label="Partner category" htmlFor="partnerCategory" required>
          <select
            id="partnerCategory"
            name="partnerCategory"
            required
            defaultValue={defaults?.partnerCategory ?? 'website_development'}
            className="flex h-10 w-full rounded-uv-lg border border-uv-border bg-uv-background px-3 text-sm uv-focus-ring"
          >
            {CATEGORIES.map((id) => (
              <option key={id} value={id}>
                {PARTNER_CATEGORY_LABELS[id]}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Requested service" htmlFor="requestedService" required>
        <Input
          id="requestedService"
          name="requestedService"
          required
          defaultValue={defaults?.requestedService ?? ''}
        />
      </Field>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="City" htmlFor="city" required>
          <Input id="city" name="city" required defaultValue={defaults?.city ?? 'Chennai'} />
        </Field>
        <Field label="State" htmlFor="state" required>
          <Input
            id="state"
            name="state"
            required
            defaultValue={defaults?.state ?? 'Tamil Nadu'}
          />
        </Field>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <Field label="Budget min (INR)" htmlFor="budgetMinInr">
          <Input
            id="budgetMinInr"
            name="budgetMinInr"
            type="number"
            defaultValue={defaults?.budgetMinInr ?? 10000}
          />
        </Field>
        <Field label="Budget max (INR)" htmlFor="budgetMaxInr">
          <Input
            id="budgetMaxInr"
            name="budgetMaxInr"
            type="number"
            defaultValue={defaults?.budgetMaxInr ?? 50000}
          />
        </Field>
        <Field label="Timeline (days)" htmlFor="timelineDays">
          <Input
            id="timelineDays"
            name="timelineDays"
            type="number"
            defaultValue={defaults?.timelineDays ?? 30}
          />
        </Field>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Priority" htmlFor="priority">
          <select
            id="priority"
            name="priority"
            defaultValue="medium"
            className="flex h-10 w-full rounded-uv-lg border border-uv-border bg-uv-background px-3 text-sm uv-focus-ring"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </Field>
        <Field label="Required documents (comma-separated)" htmlFor="requiredDocuments">
          <Input
            id="requiredDocuments"
            name="requiredDocuments"
            defaultValue={(defaults?.requiredDocuments ?? ['PAN', 'Aadhaar']).join(', ')}
          />
        </Field>
      </div>

      {error ? (
        <p className="text-sm text-uv-error" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={busy}
        className={cn(buttonVariants({ size: 'lg' }), 'w-full sm:w-auto')}
      >
        {busy ? 'Creating…' : 'Create request & run Smart Matching'}
      </button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
        {required ? <span className="text-uv-error"> *</span> : null}
      </label>
      {children}
    </div>
  );
}
