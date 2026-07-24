'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { Badge, Input, buttonVariants, cn } from '@uandv/ui';

import {
  PARTNER_CATEGORY_LABELS,
  registerPartnerDemo,
  type Partner,
  type PartnerCategory,
} from '@/lib/partners';

const CATEGORIES = Object.keys(PARTNER_CATEGORY_LABELS) as PartnerCategory[];

/**
 * Partner Registration form — Sprint 3.1.1.
 * Creates a pending partner in localStorage demo runtime.
 */
export function PartnerRegistrationPage() {
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const form = new FormData(event.currentTarget);

    const companyName = String(form.get('companyName') ?? '').trim();
    const contactPerson = String(form.get('contactPerson') ?? '').trim();
    const category = String(form.get('category') ?? '') as PartnerCategory;
    const city = String(form.get('city') ?? '').trim();
    const state = String(form.get('state') ?? '').trim();
    const summary = String(form.get('summary') ?? '').trim();
    const skillsRaw = String(form.get('skills') ?? '');
    const experienceYears = Number(form.get('experienceYears') ?? 1);
    const slaHours = Number(form.get('slaHours') ?? 24);
    const commissionType = String(
      form.get('commissionType') ?? 'percent',
    ) as Partner['commissionType'];

    if (!companyName || !contactPerson || !category || !city || !state || !summary) {
      setError('Please complete all required fields.');
      return;
    }
    if (!CATEGORIES.includes(category)) {
      setError('Select a valid partner category.');
      return;
    }

    setSubmitting(true);
    const partner = registerPartnerDemo({
      companyName,
      contactPerson,
      category,
      city,
      state,
      serviceArea: String(form.get('serviceArea') ?? 'Tamil Nadu'),
      skills: skillsRaw
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      experienceYears,
      summary,
      commissionType,
      slaHours,
    });
    setSubmitting(false);
    router.push(`/partners/${partner.id}?registered=1`);
  };

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-3xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-3">
        <Badge variant="warning">Sprint 3.1.1 · Demo registration</Badge>
        <h1 className="font-[family-name:var(--font-uv-display)] text-3xl font-semibold tracking-tight">
          Partner registration
        </h1>
        <p className="text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
          Join the U&amp;V Partner Marketplace. Submissions enter the admin
          approval queue as <strong>pending</strong>. Demo only — stored in this
          browser.
        </p>
      </header>

      <form
        onSubmit={onSubmit}
        className="space-y-5 rounded-uv-2xl border border-uv-border bg-uv-background-subtle p-5 sm:p-8"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Company name" htmlFor="companyName" required>
            <Input id="companyName" name="companyName" required autoComplete="organization" />
          </Field>
          <Field label="Contact person" htmlFor="contactPerson" required>
            <Input id="contactPerson" name="contactPerson" required autoComplete="name" />
          </Field>
        </div>

        <Field label="Category" htmlFor="category" required>
          <select
            id="category"
            name="category"
            required
            className="flex h-10 w-full rounded-uv-lg border border-uv-border bg-uv-background px-3 text-sm uv-focus-ring"
            defaultValue="website_development"
          >
            {CATEGORIES.map((id) => (
              <option key={id} value={id}>
                {PARTNER_CATEGORY_LABELS[id]}
              </option>
            ))}
          </select>
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="City" htmlFor="city" required>
            <Input id="city" name="city" required defaultValue="Chennai" />
          </Field>
          <Field label="State" htmlFor="state" required>
            <Input id="state" name="state" required defaultValue="Tamil Nadu" />
          </Field>
        </div>

        <Field label="Service area" htmlFor="serviceArea">
          <Input
            id="serviceArea"
            name="serviceArea"
            placeholder="e.g. Tamil Nadu · remote"
            defaultValue="Tamil Nadu · remote"
          />
        </Field>

        <Field label="Skills (comma-separated)" htmlFor="skills">
          <Input
            id="skills"
            name="skills"
            placeholder="Next.js, CMS, Brand"
            defaultValue="Consulting, Delivery"
          />
        </Field>

        <Field label="Summary" htmlFor="summary" required>
          <textarea
            id="summary"
            name="summary"
            required
            rows={4}
            className="w-full rounded-uv-lg border border-uv-border bg-uv-background px-3 py-2 text-sm uv-focus-ring"
            placeholder="Describe your services and strengths…"
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Experience (years)" htmlFor="experienceYears">
            <Input
              id="experienceYears"
              name="experienceYears"
              type="number"
              min={0}
              max={40}
              defaultValue={5}
            />
          </Field>
          <Field label="SLA (hours)" htmlFor="slaHours">
            <Input
              id="slaHours"
              name="slaHours"
              type="number"
              min={4}
              max={72}
              defaultValue={24}
            />
          </Field>
          <Field label="Commission type" htmlFor="commissionType">
            <select
              id="commissionType"
              name="commissionType"
              className="flex h-10 w-full rounded-uv-lg border border-uv-border bg-uv-background px-3 text-sm uv-focus-ring"
              defaultValue="percent"
            >
              <option value="fixed">Fixed</option>
              <option value="percent">Percent</option>
              <option value="hybrid">Hybrid</option>
              <option value="retainer">Retainer</option>
            </select>
          </Field>
        </div>

        {error ? (
          <p className="text-sm text-uv-error" role="alert">
            {error}
          </p>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            disabled={submitting}
            className={cn(buttonVariants({ size: 'lg' }), 'justify-center')}
          >
            {submitting ? 'Submitting…' : 'Submit for approval'}
          </button>
          <Link
            href="/partners"
            className={cn(
              buttonVariants({ size: 'lg', variant: 'outline' }),
              'justify-center',
            )}
          >
            Back to directory
          </Link>
        </div>
      </form>
    </div>
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
      <label htmlFor={htmlFor} className="text-sm font-medium text-uv-foreground">
        {label}
        {required ? <span className="text-uv-error"> *</span> : null}
      </label>
      {children}
    </div>
  );
}
