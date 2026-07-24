import { Badge } from '@uandv/ui';

import { CustomerPageHeader } from '@/components/customer/page-header';
import {
  formatProjectDateTime,
  getCustomerVisibleActivities,
  getProjectById,
} from '@/lib/projects';
import { notFound } from 'next/navigation';

export function CustomerProjectTimelinePage({
  projectId,
}: {
  projectId: string;
}) {
  if (!getProjectById(projectId)) notFound();
  const rows = getCustomerVisibleActivities(projectId);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <CustomerPageHeader
        title="Project Timeline"
        description="Customer-visible events only."
      />
      <ol className="relative border-l border-uv-border pl-5">
        {rows.map((item) => (
          <li key={item.id} className="relative pb-6 last:pb-0">
            <span className="absolute -left-[1.4rem] top-1.5 h-3 w-3 rounded-full border-2 border-uv-brand bg-uv-background" />
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{item.eventType}</Badge>
              <span className="text-xs text-uv-foreground-subtle">
                {formatProjectDateTime(item.occurredAt)}
              </span>
            </div>
            <p className="mt-2 font-semibold">{item.title}</p>
            <p className="text-sm text-uv-foreground-muted">{item.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
