import { EmployeePageHeader } from '@/components/employee/page-header';
import { RoleNotificationCenter } from '@/components/lifecycle';
import { demoEmployeeUser } from '@/lib/employee';
import { getNotificationsForRole } from '@/lib/lifecycle';

export function EmployeeNotificationsPage() {
  const items = getNotificationsForRole('employee', {
    employeeId: demoEmployeeUser.employeeId,
  });

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <EmployeePageHeader
        title="Notifications"
        description="Role-based delivery and assignment alerts for your work. Mark-as-read is local demo state only."
      />
      <RoleNotificationCenter initialItems={items} />
    </div>
  );
}
