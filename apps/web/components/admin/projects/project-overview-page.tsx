import Link from 'next/link';

import { StatsCard, buttonVariants, cn } from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import { requireProject } from '@/components/admin/projects/require-project';
import { ProgressBar } from '@/components/lifecycle/progress-bar';
import { ProjectHealthPanel } from '@/components/lifecycle';
import {
  LIFECYCLE_STAGE_LABELS,
  formatProjectDate,
  formatProjectDateTime,
  formatProjectInr,
  getActivitiesForProject,
  getApprovalsForProject,
  getAssignmentsForProject,
  getNextMilestone,
  getPaymentsForProject,
  getRisksForProject,
  getTasksForProject,
} from '@/lib/projects';
import { getProjectHealthById } from '@/lib/lifecycle';

export function AdminProjectOverviewPage({
  projectId,
}: {
  projectId: string;
}) {
  const project = requireProject(projectId);
  const nextMilestone = getNextMilestone(projectId);
  const assignments = getAssignmentsForProject(projectId);
  const payments = getPaymentsForProject(projectId);
  const approvals = getApprovalsForProject(projectId).filter(
    (a) => a.status === 'pending',
  );
  const risks = getRisksForProject(projectId).filter(
    (r) => r.status !== 'resolved',
  );
  const activities = getActivitiesForProject(projectId).slice(0, 5);
  const tasks = getTasksForProject(projectId);
  const delayedTasks = tasks.filter(
    (t) => t.status !== 'completed' && t.dueDate < '2026-07-23',
  );
  const employees = assignments.filter(
    (a) =>
      a.role === 'internal_employee' ||
      a.role === 'project_owner' ||
      a.role === 'reviewer',
  );
  const vendors = assignments.filter((a) => a.role === 'vendor');
  const customerWaiting = approvals.filter((a) => a.customerActionable);
  const vendorWaiting = tasks.filter(
    (t) => t.assigneeKind === 'vendor' && t.status === 'awaiting_review',
  );
  const healthSnapshot = getProjectHealthById(projectId);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Project Overview"
        description="Delivery health, team, payments, approvals, and next actions. Shared project model · demo only."
      />

      {healthSnapshot ? <ProjectHealthPanel snapshot={healthSnapshot} /> : null}

      <section
        aria-label="Status summary"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <StatsCard
          label="Health"
          value={project.health.replaceAll('_', ' ')}
          hint={LIFECYCLE_STAGE_LABELS[project.currentStage]}
          icon="Briefcase"
        />
        <StatsCard
          label="Completion"
          value={`${project.completionPercent}%`}
          hint="Overall progress"
          icon="TrendingUp"
        />
        <StatsCard
          label="Next milestone"
          value={nextMilestone?.title ?? '—'}
          hint={
            nextMilestone ? formatProjectDate(nextMilestone.dueDate) : 'None'
          }
          icon="Calendar"
        />
        <StatsCard
          label="Pending approvals"
          value={String(approvals.length)}
          icon="Check"
        />
      </section>

      <ProgressBar
        value={project.completionPercent}
        label="Project completion"
      />

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-3 rounded-uv-xl border border-uv-border p-4">
          <h2 className="font-semibold">Customer & team</h2>
          <p className="text-sm text-uv-foreground-muted">
            {project.customerBusinessName} · {project.customerName}
          </p>
          <p className="text-sm">
            <span className="text-uv-foreground-subtle">Owner: </span>
            {project.ownerName}
          </p>
          <p className="text-sm text-uv-foreground-muted">
            Employees:{' '}
            {employees.map((e) => e.participantName).join(', ') || '—'}
          </p>
          <p className="text-sm text-uv-foreground-muted">
            Vendors: {vendors.map((v) => v.participantName).join(', ') || '—'}
          </p>
        </div>
        <div className="space-y-3 rounded-uv-xl border border-uv-border p-4">
          <h2 className="font-semibold">Budget & payments</h2>
          <p className="text-sm">
            Value {formatProjectInr(project.projectValueInr)} · Advance{' '}
            {formatProjectInr(project.advanceAmountInr)}
          </p>
          {payments ? (
            <p className="text-sm text-uv-foreground-muted">
              Paid {formatProjectInr(payments.paidAmountInr)} · Pending{' '}
              {formatProjectInr(payments.pendingAmountInr)}
            </p>
          ) : null}
          <p className="text-sm text-uv-foreground-muted">
            Open risks: {risks.length}
          </p>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="space-y-2">
          <h2 className="font-semibold">Next actions</h2>
          <ul className="space-y-2 text-sm text-uv-foreground-muted">
            <li>Customer waiting: {customerWaiting.length} approval(s)</li>
            <li>Vendor waiting: {vendorWaiting.length} review item(s)</li>
            <li>Delayed tasks: {delayedTasks.length}</li>
          </ul>
        </section>
        <section className="space-y-2">
          <h2 className="font-semibold">Recent activities</h2>
          <ul className="space-y-2">
            {activities.map((a) => (
              <li key={a.id} className="text-sm">
                <span className="font-medium">{a.title}</span>
                <span className="text-uv-foreground-muted">
                  {' '}
                  · {formatProjectDateTime(a.occurredAt)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="flex flex-wrap gap-2">
        <Link
          href={`/admin/projects/${projectId}/tasks`}
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
        >
          Tasks
        </Link>
        <Link
          href={`/admin/projects/${projectId}/approvals`}
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
        >
          Approvals
        </Link>
        <Link
          href={`/admin/projects/${projectId}/risks`}
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
        >
          Risks
        </Link>
      </div>
    </div>
  );
}
