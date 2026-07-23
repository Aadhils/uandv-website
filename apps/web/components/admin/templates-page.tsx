import Link from 'next/link';

import { Badge, buttonVariants, cn } from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import {
  PARTNER_CATEGORY_LABELS,
  formatPartnerInr,
  getBusinessTemplates,
  getMarketplaceServiceById,
} from '@/lib/partners';

export function AdminTemplatesPage() {
  const templates = getBusinessTemplates();

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Business Service Templates"
        description="Industry launch packs with registrations, licenses, recommended services, timeline, budget, and required partners. Demo only."
      />

      <ul className="space-y-4">
        {templates.map((template) => (
          <li
            key={template.id}
            className="rounded-uv-xl border border-uv-border p-4 sm:p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <Badge variant="outline">{template.id.replaceAll('_', ' ')}</Badge>
                <h3 className="mt-2 font-[family-name:var(--font-uv-display)] text-lg font-semibold">
                  {template.name}
                </h3>
                <p className="mt-1 text-sm text-uv-foreground-muted">
                  {template.summary}
                </p>
              </div>
              <div className="text-sm text-right">
                <p className="font-medium">
                  {template.suggestedTimelineWeeks} weeks
                </p>
                <p className="text-xs text-uv-foreground-subtle">
                  {formatPartnerInr(template.suggestedBudgetInr.min)} –{' '}
                  {formatPartnerInr(template.suggestedBudgetInr.max)}
                </p>
              </div>
            </div>

            <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-xs text-uv-foreground-subtle">
                  Required registrations
                </dt>
                <dd className="text-uv-foreground-muted">
                  {template.requiredRegistrations.join(' · ')}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-uv-foreground-subtle">
                  Required licenses
                </dt>
                <dd className="text-uv-foreground-muted">
                  {template.requiredLicenses.join(' · ')}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-uv-foreground-subtle">
                  Recommended services
                </dt>
                <dd className="flex flex-wrap gap-2">
                  {template.recommendedServiceIds.map((id) => {
                    const service = getMarketplaceServiceById(id);
                    return (
                      <Badge key={id} variant="secondary">
                        {service?.title ?? id}
                      </Badge>
                    );
                  })}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-uv-foreground-subtle">
                  Required partners
                </dt>
                <dd className="flex flex-wrap gap-2">
                  {template.requiredPartnerCategories.map((cat) => (
                    <Badge key={cat} variant="outline">
                      {PARTNER_CATEGORY_LABELS[cat]}
                    </Badge>
                  ))}
                </dd>
              </div>
            </dl>

            <div className="mt-4">
              <Link
                href="/admin/assignment"
                className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
              >
                Find partners
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
