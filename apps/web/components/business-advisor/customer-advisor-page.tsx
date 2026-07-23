'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  EmptyState,
  FormField,
  Input,
  Select,
  Textarea,
  buttonVariants,
  cn,
} from '@uandv/ui';

import { CustomerPageHeader } from '@/components/customer/page-header';
import { LocalDemoButton } from '@/components/employee/local-demo-button';
import {
  DEMO_FORM_EXAMPLES,
  analyzeBusinessRequirement,
  emptyAdvisorInput,
  saveLatestAnalysis,
  type BusinessAdvisorInput,
  type BusinessStage,
} from '@/lib/business-advisor';

const STAGES: Array<{ value: BusinessStage | ''; label: string }> = [
  { value: '', label: 'Select stage' },
  { value: 'idea', label: 'Idea' },
  { value: 'planning', label: 'Planning' },
  { value: 'pre_launch', label: 'Pre-launch' },
  { value: 'launching', label: 'Launching' },
  { value: 'operating', label: 'Operating' },
  { value: 'scaling', label: 'Scaling' },
  { value: 'struggling', label: 'Struggling' },
  { value: 'unknown', label: 'Unknown' },
];

type FieldErrors = Partial<Record<keyof BusinessAdvisorInput, string>>;

export function CustomerBusinessAdvisorPage() {
  const router = useRouter();
  const [form, setForm] = React.useState<BusinessAdvisorInput>(emptyAdvisorInput);
  const [fieldErrors, setFieldErrors] = React.useState<FieldErrors>({});
  const [formError, setFormError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [demoIndex, setDemoIndex] = React.useState(0);

  const update = <K extends keyof BusinessAdvisorInput>(
    key: K,
    value: BusinessAdvisorInput[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
    setFormError(null);
    setSuccess(false);
  };

  const onClear = () => {
    setForm(emptyAdvisorInput());
    setFieldErrors({});
    setFormError(null);
    setSuccess(false);
  };

  const onLoadDemo = () => {
    const example = DEMO_FORM_EXAMPLES[demoIndex % DEMO_FORM_EXAMPLES.length]!;
    setForm({ ...example });
    setDemoIndex((i) => i + 1);
    setFieldErrors({});
    setFormError(null);
    setSuccess(false);
  };

  const onAnalyze = () => {
    setLoading(true);
    setFormError(null);
    setSuccess(false);

    window.setTimeout(() => {
      const result = analyzeBusinessRequirement(form, {
        id: `ba-live-${Date.now()}`,
        customerId: 'cus-001',
        customerName: 'Priya Sharma',
      });

      if (!result.ok) {
        setFieldErrors(result.fieldErrors);
        setFormError(result.error);
        setLoading(false);
        return;
      }

      saveLatestAnalysis(result.analysis);
      setSuccess(true);
      setLoading(false);
      router.push('/dashboard/business-advisor/result');
    }, 650);
  };

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8">
      <CustomerPageHeader
        title="Business Advisor"
        description="Describe your business goal. U&V runs a deterministic requirement analysis — no external AI."
      />

      {loading ? (
        <EmptyState
          icon="Sparkles"
          title="Analyzing your requirement…"
          description="Matching intent, category rules, registrations, and opportunity signals."
        />
      ) : null}

      {!loading && success ? (
        <p
          className="rounded-uv-lg border border-uv-border bg-uv-background-muted/50 px-3 py-2 text-sm text-uv-foreground"
          role="status"
        >
          Analysis ready — opening your structured report.
        </p>
      ) : null}

      {!loading && formError ? (
        <p
          className="rounded-uv-lg border border-uv-error/30 bg-uv-error/5 px-3 py-2 text-sm text-uv-foreground"
          role="alert"
        >
          {formError}
        </p>
      ) : null}

      {!loading ? (
      <Card padding="none">
        <CardHeader>
          <CardTitle className="text-base">Business goal input</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="grid gap-4 sm:grid-cols-2"
            onSubmit={(event) => {
              event.preventDefault();
              onAnalyze();
            }}
          >
            <FormField
              label="Business goal"
              htmlFor="ba-goal"
              required
              className="sm:col-span-2"
              error={fieldErrors.businessGoal}
            >
              <Textarea
                id="ba-goal"
                rows={3}
                value={form.businessGoal}
                onChange={(e) => update('businessGoal', e.target.value)}
                placeholder="e.g. I want to start a restaurant"
                aria-invalid={Boolean(fieldErrors.businessGoal)}
              />
            </FormField>

            <FormField label="Business type" htmlFor="ba-type">
              <Input
                id="ba-type"
                value={form.businessType}
                onChange={(e) => update('businessType', e.target.value)}
                placeholder="Restaurant, SaaS, retail…"
              />
            </FormField>

            <FormField label="Current business stage" htmlFor="ba-stage">
              <Select
                id="ba-stage"
                value={form.currentStage}
                onChange={(e) =>
                  update('currentStage', e.target.value as BusinessStage | '')
                }
              >
                {STAGES.map((stage) => (
                  <option key={stage.label} value={stage.value}>
                    {stage.label}
                  </option>
                ))}
              </Select>
            </FormField>

            <FormField
              label="City"
              htmlFor="ba-city"
              required
              error={fieldErrors.city}
            >
              <Input
                id="ba-city"
                value={form.city}
                onChange={(e) => update('city', e.target.value)}
                aria-invalid={Boolean(fieldErrors.city)}
              />
            </FormField>

            <FormField
              label="State"
              htmlFor="ba-state"
              required
              error={fieldErrors.state}
            >
              <Input
                id="ba-state"
                value={form.state}
                onChange={(e) => update('state', e.target.value)}
                aria-invalid={Boolean(fieldErrors.state)}
              />
            </FormField>

            <FormField
              label="Estimated budget (INR)"
              htmlFor="ba-budget"
              error={fieldErrors.estimatedBudgetInr}
            >
              <Input
                id="ba-budget"
                type="number"
                min={0}
                value={form.estimatedBudgetInr ?? ''}
                onChange={(e) => {
                  const raw = e.target.value;
                  update(
                    'estimatedBudgetInr',
                    raw === '' ? null : Number(raw),
                  );
                }}
              />
            </FormField>

            <FormField label="Desired launch timeline" htmlFor="ba-timeline">
              <Input
                id="ba-timeline"
                value={form.desiredLaunchTimeline}
                onChange={(e) => update('desiredLaunchTimeline', e.target.value)}
                placeholder="e.g. 3 months"
              />
            </FormField>

            <FormField
              label="Existing registrations"
              htmlFor="ba-regs"
              className="sm:col-span-2"
            >
              <Input
                id="ba-regs"
                value={form.existingRegistrations}
                onChange={(e) => update('existingRegistrations', e.target.value)}
                placeholder="GST, FSSAI, Company — or None"
              />
            </FormField>

            <FormField
              label="Existing digital assets"
              htmlFor="ba-assets"
              className="sm:col-span-2"
            >
              <Input
                id="ba-assets"
                value={form.existingDigitalAssets}
                onChange={(e) => update('existingDigitalAssets', e.target.value)}
                placeholder="Website, Instagram, none…"
              />
            </FormField>

            <FormField label="Preferred language" htmlFor="ba-lang">
              <Input
                id="ba-lang"
                value={form.preferredLanguage}
                onChange={(e) => update('preferredLanguage', e.target.value)}
              />
            </FormField>

            <FormField
              label="Additional notes"
              htmlFor="ba-notes"
              className="sm:col-span-2"
            >
              <Textarea
                id="ba-notes"
                rows={3}
                value={form.additionalNotes}
                onChange={(e) => update('additionalNotes', e.target.value)}
                placeholder="Constraints, must-haves, or open questions"
              />
            </FormField>

            <div className="flex flex-wrap gap-2 sm:col-span-2">
              <button
                type="submit"
                className={cn(buttonVariants({ variant: 'primary', size: 'sm' }))}
              >
                Analyze Requirement
              </button>
              <LocalDemoButton onClick={onClear}>Clear Form</LocalDemoButton>
              <LocalDemoButton onClick={onLoadDemo}>
                Load Demo Example
              </LocalDemoButton>
            </div>
          </form>
        </CardContent>
      </Card>
      ) : null}

      <p className="text-xs text-uv-foreground-subtle">
        Demo engine only — rule-based matching across restaurant, travel, school,
        hospital, retail, manufacturing, construction, IT, MLM, startup, real
        estate, e-commerce, professional services, growth, funding, and generic
        requests.
      </p>
    </div>
  );
}
