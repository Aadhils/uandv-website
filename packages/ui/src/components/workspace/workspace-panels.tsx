import * as React from 'react';

import { cn } from '../../lib/cn';
import { Avatar } from '../avatar';
import { Badge } from '../badge';
import { Card, CardContent, CardHeader, CardTitle } from '../card';
import { Icon, type IconName } from '../icon';

export type ActivityItem = {
  id: string;
  title: string;
  description?: string;
  time: string;
  icon?: IconName;
};

export type ActivityFeedProps = {
  items?: ActivityItem[];
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
};

/**
 * Recent activity list — static-friendly for foundation sprints.
 */
export function ActivityFeed({
  items = [],
  emptyTitle = 'No recent activity',
  emptyDescription = 'Activity from workspaces will appear here.',
  className,
}: ActivityFeedProps) {
  if (items.length === 0) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center rounded-uv-xl border border-dashed border-uv-border bg-uv-background-subtle px-4 py-10 text-center',
          className,
        )}
        role="status"
      >
        <span
          className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-uv-lg bg-uv-brand-muted text-uv-brand"
          aria-hidden
        >
          <Icon name="ClipboardList" size="md" />
        </span>
        <p className="text-sm font-medium text-uv-foreground">{emptyTitle}</p>
        <p className="mt-1 max-w-xs text-xs text-uv-foreground-muted">
          {emptyDescription}
        </p>
      </div>
    );
  }

  return (
    <ul className={cn('divide-y divide-uv-border', className)} role="list">
      {items.map((item) => (
        <li key={item.id} className="flex gap-3 py-3.5 first:pt-0 last:pb-0">
          <span
            className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-uv-lg bg-uv-background-muted text-uv-brand"
            aria-hidden
          >
            <Icon name={item.icon ?? 'ClipboardList'} size="sm" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-uv-foreground">{item.title}</p>
            {item.description ? (
              <p className="mt-0.5 text-sm text-uv-foreground-muted">
                {item.description}
              </p>
            ) : null}
            <p className="mt-1 text-xs text-uv-foreground-subtle">{item.time}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export type NotificationItem = {
  id: string;
  title: string;
  description?: string;
  time: string;
  unread?: boolean;
};

export type NotificationListProps = {
  items?: NotificationItem[];
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
};

/**
 * Notification placeholder list for workspace headers and dashboard panels.
 */
export function NotificationList({
  items = [],
  emptyTitle = 'No notifications',
  emptyDescription = 'System and workspace alerts will show up here.',
  className,
}: NotificationListProps) {
  if (items.length === 0) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center rounded-uv-xl border border-dashed border-uv-border bg-uv-background-subtle px-4 py-10 text-center',
          className,
        )}
        role="status"
      >
        <span
          className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-uv-lg bg-uv-brand-muted text-uv-brand"
          aria-hidden
        >
          <Icon name="Bell" size="md" />
        </span>
        <p className="text-sm font-medium text-uv-foreground">{emptyTitle}</p>
        <p className="mt-1 max-w-xs text-xs text-uv-foreground-muted">
          {emptyDescription}
        </p>
      </div>
    );
  }

  return (
    <ul className={cn('divide-y divide-uv-border', className)} role="list">
      {items.map((item) => (
        <li key={item.id} className="flex gap-3 py-3.5 first:pt-0 last:pb-0">
          <span
            className={cn(
              'mt-1.5 h-2 w-2 shrink-0 rounded-full',
              item.unread ? 'bg-uv-brand' : 'bg-uv-border-strong',
            )}
            aria-hidden
          />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-medium text-uv-foreground">{item.title}</p>
              {item.unread ? <Badge variant="default">New</Badge> : null}
            </div>
            {item.description ? (
              <p className="mt-0.5 text-sm text-uv-foreground-muted">
                {item.description}
              </p>
            ) : null}
            <p className="mt-1 text-xs text-uv-foreground-subtle">{item.time}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export type UserProfileCardProps = {
  name: string;
  role?: string;
  email?: string;
  avatarUrl?: string;
  workspaceLabel?: string;
  className?: string;
};

/**
 * Static user profile placeholder for dashboard foundations (no auth).
 */
export function UserProfileCard({
  name,
  role,
  email,
  avatarUrl,
  workspaceLabel = 'Universal Workspace',
  className,
}: UserProfileCardProps) {
  return (
    <Card variant="default" padding="none" className={cn(className)}>
      <CardHeader className="pb-0">
        <CardTitle className="text-base">Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <div className="flex items-center gap-3">
          <Avatar size="lg" src={avatarUrl} alt={name} fallback={name} />
          <div className="min-w-0">
            <p className="truncate font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
              {name}
            </p>
            {role ? (
              <p className="truncate text-sm text-uv-foreground-muted">{role}</p>
            ) : null}
          </div>
        </div>
        <dl className="space-y-3 border-t border-uv-border pt-4 text-sm">
          {email ? (
            <div className="flex items-start gap-2">
              <Icon
                name="Mail"
                size="sm"
                className="mt-0.5 text-uv-foreground-subtle"
              />
              <div>
                <dt className="text-xs text-uv-foreground-subtle">Email</dt>
                <dd className="text-uv-foreground">{email}</dd>
              </div>
            </div>
          ) : null}
          <div className="flex items-start gap-2">
            <Icon
              name="Building2"
              size="sm"
              className="mt-0.5 text-uv-foreground-subtle"
            />
            <div>
              <dt className="text-xs text-uv-foreground-subtle">Workspace</dt>
              <dd className="text-uv-foreground">{workspaceLabel}</dd>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Icon
              name="User"
              size="sm"
              className="mt-0.5 text-uv-foreground-subtle"
            />
            <div>
              <dt className="text-xs text-uv-foreground-subtle">Status</dt>
              <dd>
                <Badge variant="secondary">Preview · no auth</Badge>
              </dd>
            </div>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
