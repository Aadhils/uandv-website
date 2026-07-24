import { Badge } from '@uandv/ui';

import {
  formatLifecycleDateTime,
  type LifecycleActivityItem,
} from '@/lib/lifecycle';

export type LifecycleActivityFeedProps = {
  items: LifecycleActivityItem[];
  emptyMessage?: string;
};

export function LifecycleActivityFeed({
  items,
  emptyMessage = 'No recent activity.',
}: LifecycleActivityFeedProps) {
  if (items.length === 0) {
    return <p className="text-sm text-uv-foreground-muted">{emptyMessage}</p>;
  }

  return (
    <ul className="space-y-2" aria-label="Activity feed">
      {items.map((item) => (
        <li
          key={item.id}
          className="rounded-uv-lg border border-uv-border px-3 py-2.5"
        >
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{item.kind.replaceAll('_', ' ')}</Badge>
            <span className="text-xs text-uv-foreground-subtle">
              {formatLifecycleDateTime(item.occurredAt)}
            </span>
          </div>
          <p className="mt-1 font-medium text-uv-foreground">{item.title}</p>
          <p className="text-sm text-uv-foreground-muted">{item.description}</p>
          <p className="mt-1 text-xs text-uv-foreground-subtle">
            {item.actorName}
            {item.projectTitle ? ` · ${item.projectTitle}` : ''}
          </p>
        </li>
      ))}
    </ul>
  );
}
