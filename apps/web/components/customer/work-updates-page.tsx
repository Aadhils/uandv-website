import { CustomerPageHeader } from '@/components/customer/page-header';
import { WorkUpdateFeed } from '@/components/lifecycle/work-update-feed';
import { getWorkUpdatesForProject } from '@/lib/customer';

export function CustomerWorkUpdatesPage() {
  const updates = getWorkUpdatesForProject();

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <CustomerPageHeader
        title="Work Updates"
        description="Chronological delivery feed from U&V project teams. Static demo posts only."
      />
      <WorkUpdateFeed updates={updates} />
    </div>
  );
}
