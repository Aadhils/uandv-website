import Link from 'next/link';

import { StatsCard, buttonVariants, cn } from '@uandv/ui';

import { CustomerPageHeader } from '@/components/customer/page-header';
import { ProgressBar } from '@/components/lifecycle/progress-bar';
import {
  LIFECYCLE_STAGE_LABELS,
  formatProjectDate,
  formatProjectInr,
  getApprovalsForProject,
  getCustomerVisibleUpdates,
  getCustomerVisibleDocuments,
  getMilestonesForProject,
  getNextMilestone,
  getPaymentsForProject,
  getProjectById,
} from '@/lib/projects';
import { notFound } from 'next/navigation';

export function CustomerProjectOverviewPage({
  projectId,
}: {
  projectId: string;
}) {
  const project = getProjectById(projectId);
  if (!project) notFound();

  const nextMilestone = getNextMilestone(projectId);
  const milestones = getMilestonesForProject(projectId).filter(
    (m) => m.customerVisible,
  );
  const completed = milestones.filter((m) => m.status === 'completed');
  const approvals = getApprovalsForProject(projectId).filter(
    (a) => a.customerActionable && a.status === 'pending',
  );
  const updates = getCustomerVisibleUpdates(projectId).slice(0, 3);
  const docs = getCustomerVisibleDocuments(projectId).slice(0, 3);
  const payments = getPaymentsForProject(projectId);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <CustomerPageHeader
        title="Project Overview"
        description="Customer-visible progress only. Contact U&V from Support if you need help."
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          label="Progress"
          value={`${project.completionPercent}%`}
          icon="TrendingUp"
        />
        <StatsCard
          label="Current stage"
          value={LIFECYCLE_STAGE_LABELS[project.currentStage]}
          icon="Workflow"
        />
        <StatsCard
          label="Next milestone"
          value={nextMilestone?.title ?? '—'}
          hint={
            nextMilestone ? formatProjectDate(nextMilestone.dueDate) : undefined
          }
          icon="Calendar"
        />
        <StatsCard
          label="Pending actions"
          value={String(approvals.length)}
          hint="Approvals waiting on you"
          icon="Check"
        />
      </section>

      <ProgressBar
        value={project.completionPercent}
        label="Project progress"
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="space-y-2 rounded-uv-xl border border-uv-border p-4">
          <h2 className="font-semibold">Delivery summary</h2>
          <p className="text-sm text-uv-foreground-muted">
            Completed milestones: {completed.length} / {milestones.length}
          </p>
          <p className="text-sm text-uv-foreground-muted">
            Target completion:{' '}
            {formatProjectDate(project.targetCompletionDate)}
          </p>
          <p className="text-sm text-uv-foreground-muted">
            Assigned U&V team: {project.ownerName} (Delivery)
          </p>
          {payments ? (
            <p className="text-sm text-uv-foreground-muted">
              Payments: paid {formatProjectInr(payments.paidAmountInr)} ·
              pending {formatProjectInr(payments.pendingAmountInr)}
            </p>
          ) : null}
        </section>
        <section className="space-y-2 rounded-uv-xl border border-uv-border p-4">
          <h2 className="font-semibold">Recent work updates</h2>
          <ul className="space-y-2 text-sm">
            {updates.map((u) => (
              <li key={u.id}>
                <p className="font-medium">{u.title}</p>
                <p className="text-uv-foreground-muted">{u.nextAction}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="space-y-2">
        <h2 className="font-semibold">Documents</h2>
        <ul className="space-y-1 text-sm text-uv-foreground-muted">
          {docs.map((d) => (
            <li key={d.id}>
              {d.name} · {d.version}
            </li>
          ))}
        </ul>
      </section>

      <div className="flex flex-wrap gap-2">
        <Link
          href={`/dashboard/projects/${projectId}/approvals`}
          className={cn(buttonVariants({ variant: 'primary', size: 'sm' }))}
        >
          Review approvals
        </Link>
        <Link
          href={`/dashboard/projects/${projectId}/support`}
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
        >
          Support
        </Link>
      </div>
    </div>
  );
}
