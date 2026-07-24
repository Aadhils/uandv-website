import Link from 'next/link';

import { buttonVariants, cn } from '@uandv/ui';

import { CustomerPageHeader } from '@/components/customer/page-header';

/**
 * Legacy /dashboard/requests entry — forwards to Sprint 3.2 service requests.
 */
export function CustomerRequestsPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <CustomerPageHeader
        title="Service Requests"
        description="Service requests now live in the Smart Matching workflow."
      />
      <p className="text-sm text-uv-foreground-muted">
        Create requests, review Demo Intelligence matches, and track partner
        delivery from the unified Service Requests module.
      </p>
      <Link
        href="/dashboard/service-requests"
        className={cn(buttonVariants({ size: 'lg' }), 'w-fit')}
      >
        Open Service Requests
      </Link>
    </div>
  );
}
