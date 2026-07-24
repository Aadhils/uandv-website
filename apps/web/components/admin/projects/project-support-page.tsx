import Link from 'next/link';

import { buttonVariants, cn } from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import { requireProject } from '@/components/admin/projects/require-project';
import { PlaceholderAction } from '@/components/customer/placeholder-action';

export function AdminProjectSupportPage({ projectId }: { projectId: string }) {
  const project = requireProject(projectId);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Project Support"
        description="Support linkage for this delivery project. Demo placeholders only — no live tickets or messaging."
      />
      <div className="rounded-uv-xl border border-uv-border p-5 space-y-3">
        <p className="text-sm text-uv-foreground-muted">
          Customer: {project.customerBusinessName} · Owner: {project.ownerName}
        </p>
        <p className="text-sm text-uv-foreground-muted">
          Use Admin Support for workspace-wide tickets. This view is scoped to
          the current project context.
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/support"
            className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
          >
            Open support queue
          </Link>
          <PlaceholderAction>Create project ticket</PlaceholderAction>
        </div>
      </div>
    </div>
  );
}
