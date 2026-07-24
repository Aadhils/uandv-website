import { CustomerPageHeader } from '@/components/customer/page-header';
import { RoleNotificationCenter } from '@/components/lifecycle';
import { getNotificationsForRole } from '@/lib/lifecycle';
import { DEMO_CUSTOMER_ID } from '@/lib/projects';

export function CustomerNotificationsPage() {
  const items = getNotificationsForRole('customer', {
    customerId: DEMO_CUSTOMER_ID,
  });

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <CustomerPageHeader
        title="Notification Center"
        description="Role-based alerts for your projects, approvals, and payments. Mark-as-read is local demo state only."
      />
      <RoleNotificationCenter initialItems={items} />
    </div>
  );
}
