import type { Metadata } from 'next';
import Link from 'next/link';

import { buttonVariants, cn } from '@uandv/ui';

import { CustomerPageHeader } from '@/components/customer/page-header';

export const metadata: Metadata = { title: 'Admin Preview' };

/**
 * Legacy preview route — points to the Sprint 3.0.6 Admin Workspace.
 */
export default function AdminPreviewRedirectPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <CustomerPageHeader
        title="Admin Workspace is ready"
        description="The Admin Dashboard Preview has moved to the full Admin Workspace foundation."
      />
      <Link
        href="/admin"
        className={cn(buttonVariants({ size: 'md' }), 'w-fit')}
      >
        Open Admin Workspace
      </Link>
    </div>
  );
}
