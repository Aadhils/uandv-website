import { Badge } from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import { requireProject } from '@/components/admin/projects/require-project';
import {
  LIFECYCLE_STAGE_LABELS,
  formatProjectDateTime,
  getUpdatesForProject,
} from '@/lib/projects';

export function AdminProjectUpdatesPage({ projectId }: { projectId: string }) {
  requireProject(projectId);
  const rows = getUpdatesForProject(projectId);

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <AdminPageHeader
        title="Work Update Center"
        description="Shared updates feed activity, timeline, and customer/vendor visibility. One record — not duplicated across modules."
      />
      <ul className="space-y-4">
        {rows.map((u) => (
          <li key={u.id} className="rounded-uv-xl border border-uv-border p-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">
                {LIFECYCLE_STAGE_LABELS[u.stage]}
              </Badge>
              {u.customerVisible ? (
                <Badge variant="info">Customer visible</Badge>
              ) : null}
              {u.vendorVisible ? (
                <Badge variant="secondary">Vendor visible</Badge>
              ) : null}
              {u.approvalRequired ? (
                <Badge variant="warning">Approval required</Badge>
              ) : null}
            </div>
            <p className="mt-2 font-semibold">{u.title}</p>
            <p className="mt-1 text-sm text-uv-foreground-muted">
              {u.description}
            </p>
            <p className="mt-2 text-xs text-uv-foreground-subtle">
              Impact +{u.completionImpactPercent}% · Next: {u.nextAction} ·{' '}
              {u.authorName} · {formatProjectDateTime(u.createdAt)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

