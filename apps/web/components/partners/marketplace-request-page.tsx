'use client';

import Link from 'next/link';

import { Badge, buttonVariants, cn } from '@uandv/ui';

import { CreateServiceRequestForm } from '@/components/service-requests/create-request-form';
import {
  formatPartnerInr,
  getPartnerById,
  type MarketplaceService,
  type PartnerCategory,
} from '@/lib/partners';

const CATEGORY_MAP: Record<string, PartnerCategory> = {
  Compliance: 'company_registration',
  Brand: 'graphic_design',
  Digital: 'digital_marketing',
  Technology: 'website_development',
  Operations: 'business_consultant',
};

const SUBCATEGORY_MAP: Record<string, PartnerCategory> = {
  GST: 'gst_consultant',
  'Company formation': 'company_registration',
  Trademark: 'trademark_consultant',
  Website: 'website_development',
  SEO: 'seo',
  Branding: 'graphic_design',
};

export function MarketplaceServiceRequestPage({
  service,
}: {
  service: MarketplaceService;
}) {
  const partnerCategory =
    SUBCATEGORY_MAP[service.subCategory] ??
    CATEGORY_MAP[service.category] ??
    'business_consultant';

  return (
    <div className="mx-auto flex w-full min-w-0 max-w-3xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-3">
        <Badge variant="warning">Sprint 3.2 · Request this service</Badge>
        <h1 className="font-[family-name:var(--font-uv-display)] text-3xl font-semibold">
          {service.title}
        </h1>
        <p className="text-sm text-uv-foreground-muted">{service.description}</p>
        <p className="text-sm">
          Prefill estimate {formatPartnerInr(service.estimatedPriceInr)} · ~
          {service.estimatedDurationDays} days
        </p>
        <div className="flex flex-wrap gap-2">
          {service.suggestedPartnerIds.map((id) => {
            const partner = getPartnerById(id);
            return (
              <Link
                key={id}
                href={`/partners/${id}`}
                className={cn(buttonVariants({ size: 'sm', variant: 'outline' }))}
              >
                {partner?.companyName ?? id}
              </Link>
            );
          })}
        </div>
      </header>

      <CreateServiceRequestForm
        defaults={{
          source: 'marketplace',
          businessCategory: service.category,
          partnerCategory,
          requestedService: service.title,
          requiredDocuments: service.requiredDocuments,
          marketplaceServiceId: service.id,
          estimatedPriceInr: service.estimatedPriceInr,
          estimatedDurationDays: service.estimatedDurationDays,
          budgetMinInr: Math.round(service.estimatedPriceInr * 0.7),
          budgetMaxInr: Math.round(service.estimatedPriceInr * 1.2),
          timelineDays: service.estimatedDurationDays,
          city: 'Chennai',
          state: 'Tamil Nadu',
        }}
      />

      <Link href="/marketplace" className={cn(buttonVariants({ variant: 'ghost' }))}>
        Back to marketplace
      </Link>
    </div>
  );
}
