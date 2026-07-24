import { Badge } from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import { requireProject } from '@/components/admin/projects/require-project';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  LIFECYCLE_STAGE_LABELS,
  formatProjectDateTime,
  getActivitiesForProject,
} from '@/lib/projects';

export function AdminProjectTimelinePage({
  projectId,
}: {
  projectId: string;
}) {
  requireProject(projectId);
  const rows = getActivitiesForProject(projectId);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <AdminPageHeader
        title="Project Timeline"
        description="Events with actor, visibility, and related entities. Demo audit metadata only."
      />

      <ol className="relative space-y-0 border-l border-uv-border pl-5 sm:pl-6">
        {rows.map((item) => (
          <li key={item.id} className="relative pb-6 last:pb-0">
            <span
              className="absolute -left-[1.4rem] top-1.5 h-3 w-3 rounded-full border-2 border-uv-brand bg-uv-background sm:-left-[1.55rem]"
              aria-hidden
            />
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">{item.eventType}</Badge>
              <StatusBadge status={item.visibility} />
              <span className="text-xs text-uv-foreground-subtle">
                {formatProjectDateTime(item.occurredAt)}
              </span>
            </div>
            <p className="mt-2 font-semibold">{item.title}</p>
            <p className="mt-1 text-sm text-uv-foreground-muted">
              {item.description}
            </p>
            <p className="mt-1 text-xs text-uv-foreground-subtle">
              {item.actorName} ({item.actorRole})
              {item.relatedStage
                ? ` · ${LIFECYCLE_STAGE_LABELS[item.relatedStage]}`
                : ''}
            </p>
            <p className="mt-1 font-mono text-[11px] text-uv-foreground-subtle">
              {item.auditMetadata}
              {item.relatedDocumentId ? ` · doc=${item.relatedDocumentId}` : ''}
              {item.relatedApprovalId ? ` · apr=${item.relatedApprovalId}` : ''}
              {item.relatedMilestoneId
                ? ` · ms=${item.relatedMilestoneId}`
                : ''}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

