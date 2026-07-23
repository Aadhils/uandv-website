import Link from 'next/link';

import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  buttonVariants,
  cn,
} from '@uandv/ui';

import {
  formatDisplayDate,
  type CustomerNotification,
} from '@/lib/customer';

type RecentNotificationsSectionProps = {
  notifications: CustomerNotification[];
};

export function RecentNotificationsSection({
  notifications,
}: RecentNotificationsSectionProps) {
  return (
    <section aria-labelledby="recent-notifications-heading">
      <Card padding="none">
        <CardHeader className="pb-0">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle id="recent-notifications-heading" className="text-base">
              Recent Notifications
            </CardTitle>
            <Link
              href="/dashboard/notifications"
              className="text-sm font-medium text-uv-brand underline-offset-4 hover:underline"
            >
              Open center
            </Link>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <ul className="divide-y divide-uv-border" role="list">
            {notifications.map((item) => (
              <li key={item.id} className="flex gap-3 py-3 first:pt-0 last:pb-0">
                <span
                  className={cn(
                    'mt-1.5 h-2 w-2 shrink-0 rounded-full',
                    item.unread ? 'bg-uv-brand' : 'bg-uv-border-strong',
                  )}
                  aria-hidden
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium text-uv-foreground">
                      {item.title}
                    </p>
                    {item.unread ? <Badge variant="default">New</Badge> : null}
                  </div>
                  <p className="mt-0.5 text-sm text-uv-foreground-muted">
                    {item.description}
                  </p>
                  <p className="mt-1 text-xs text-uv-foreground-subtle">
                    {formatDisplayDate(item.createdAt)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <Link
            href="/dashboard/notifications"
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'sm' }),
              'mt-2',
            )}
          >
            View all notifications
          </Link>
        </CardContent>
      </Card>
    </section>
  );
}
