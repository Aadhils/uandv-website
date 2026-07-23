import { AdminPageHeader } from '@/components/admin/page-header';
import { RoleNotificationCenter } from '@/components/lifecycle';
import { getNotificationsForRole } from '@/lib/lifecycle';

export function AdminNotificationsPage() {
  const items = getNotificationsForRole('admin');

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <AdminPageHeader
        title="Admin Notifications"
        description="Health, approvals, payments, and delivery alerts from the shared lifecycle engine. Local demo state only."
      />
      <RoleNotificationCenter initialItems={items} />
    </div>
  );
}
