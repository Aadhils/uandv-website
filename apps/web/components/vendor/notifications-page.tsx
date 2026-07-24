import { VendorPageHeader } from '@/components/vendor/page-header';
import { RoleNotificationCenter } from '@/components/lifecycle';
import { getNotificationsForRole } from '@/lib/lifecycle';
import { demoVendorUser } from '@/lib/vendor';

export function VendorNotificationsPage() {
  const items = getNotificationsForRole('vendor', {
    vendorId: demoVendorUser.vendorId,
  });

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <VendorPageHeader
        title="Notifications"
        description="Role-based work order, deadline, and revision alerts. Mark-as-read is local demo state only."
      />
      <RoleNotificationCenter initialItems={items} />
    </div>
  );
}
