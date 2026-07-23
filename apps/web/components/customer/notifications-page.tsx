import { CustomerPageHeader } from '@/components/customer/page-header';
import { NotificationCenter } from '@/components/lifecycle/notification-center';
import { demoNotifications } from '@/lib/customer';

export function CustomerNotificationsPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <CustomerPageHeader
        title="Notification Center"
        description="Read/unread states by category. Mark-as-read is local demo state only."
      />
      <NotificationCenter initialItems={demoNotifications} />
    </div>
  );
}
