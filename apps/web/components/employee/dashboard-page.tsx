import Link from 'next/link';

import { Badge, StatsCard, buttonVariants, cn } from '@uandv/ui';

import { EmployeePageHeader } from '@/components/employee/page-header';
import { StatusBadge } from '@/components/customer/status-badge';
import {
  EMPLOYEE_DEMO_TODAY,
  EMPLOYEE_PIPELINE_LABELS,
  demoEmployeePerformance,
  demoEmployeeRecentActivities,
  demoEmployeeUser,
  formatDisplayDate,
  formatEmployeeDateTime,
  getEmployeeDashboardSummary,
  getOverdueEmployeeFollowUps,
  getTodaysEmployeeFollowUps,
} from '@/lib/employee';
import { getTasksForEmployee, getEmployeeProjectTaskViews } from '@/lib/projects';

export function EmployeeDashboardPage() {
  const summary = getEmployeeDashboardSummary();
  const todayQueue = getTodaysEmployeeFollowUps();
  const overdue = getOverdueEmployeeFollowUps();
  const projectTasks = getEmployeeProjectTaskViews(
    demoEmployeeUser.employeeId,
  ).filter((t) => t.status !== 'completed');

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <EmployeePageHeader
        title={`Welcome, ${demoEmployeeUser.name}`}
        description={`Your assigned work for ${formatDisplayDate(EMPLOYEE_DEMO_TODAY)}. You only see leads and customers owned by you. Demo identity · no real auth.`}
      />

      <section
        aria-label="Work summary"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <StatsCard
          label="Today’s follow-ups"
          value={String(summary.todaysFollowUps)}
          hint="Due today"
          icon="Calendar"
        />
        <StatsCard
          label="Overdue follow-ups"
          value={String(summary.overdueFollowUps)}
          hint="Needs attention"
          icon="CircleAlert"
        />
        <StatsCard
          label="Assigned leads"
          value={String(summary.assignedLeads)}
          hint="Ownership scoped"
          icon="ClipboardList"
        />
        <StatsCard
          label="Assigned customers"
          value={String(summary.assignedCustomers)}
          hint="No global directory"
          icon="Users"
        />
        <StatsCard
          label="Meetings today"
          value={String(summary.meetingsToday)}
          hint="Scheduled"
          icon="Phone"
        />
        <StatsCard
          label="Pending tasks"
          value={String(summary.pendingTasks)}
          hint="Assigned by Admin"
          icon="Check"
        />
        <StatsCard
          label="Project tasks due today"
          value={String(
            getTasksForEmployee(demoEmployeeUser.employeeId).filter(
              (t) => t.dueDate === EMPLOYEE_DEMO_TODAY && t.status !== 'completed',
            ).length,
          )}
          hint="Shared delivery model"
          icon="Briefcase"
        />
        <StatsCard
          label="Overdue project tasks"
          value={String(
            getTasksForEmployee(demoEmployeeUser.employeeId).filter(
              (t) => t.dueDate < EMPLOYEE_DEMO_TODAY && t.status !== 'completed',
            ).length,
          )}
          hint="Needs follow-up"
          icon="Clock"
        />
        <StatsCard
          label="Conversions"
          value={String(summary.conversionCount)}
          hint="Demo count"
          icon="TrendingUp"
        />
        <StatsCard
          label="Conversion rate"
          value={`${summary.conversionRatePercent}%`}
          hint="Demo summary"
          icon="Sparkles"
        />
      </section>

      <div className="grid gap-8 lg:grid-cols-2">
        <section aria-label="Today’s follow-ups" className="space-y-3">
          <h2 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
            Today’s follow-ups
          </h2>
          {todayQueue.length === 0 ? (
            <p className="text-sm text-uv-foreground-muted">
              No follow-ups scheduled for today.
            </p>
          ) : (
            <ul className="space-y-2">
              {todayQueue.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-uv-lg border border-uv-border px-3 py-2.5"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-uv-foreground-muted">
                      {item.nextFollowUpTime} · {item.interestedService}
                    </p>
                  </div>
                  <StatusBadge status={item.priority} />
                </li>
              ))}
            </ul>
          )}
        </section>

        <section aria-label="Overdue follow-ups" className="space-y-3">
          <h2 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
            Overdue follow-ups
          </h2>
          {overdue.length === 0 ? (
            <p className="text-sm text-uv-foreground-muted">
              No overdue follow-ups.
            </p>
          ) : (
            <ul className="space-y-2">
              {overdue.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-uv-lg border border-uv-border px-3 py-2.5"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-uv-foreground-muted">
                      Was due {formatDisplayDate(item.nextFollowUpDate)}
                    </p>
                  </div>
                  <Badge variant="error">Overdue</Badge>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <section aria-label="Assigned project tasks" className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
            Assigned project tasks
          </h2>
          <Link
            href="/employee/tasks"
            className="text-sm font-medium text-uv-brand underline-offset-4 hover:underline"
          >
            Open tasks
          </Link>
        </div>
        {projectTasks.length === 0 ? (
          <p className="text-sm text-uv-foreground-muted">
            No open project tasks.
          </p>
        ) : (
          <ul className="space-y-2">
            {projectTasks.slice(0, 4).map((task) => (
              <li
                key={task.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-uv-lg border border-uv-border px-3 py-2.5"
              >
                <div>
                  <p className="font-medium">{task.title}</p>
                  <p className="text-xs text-uv-foreground-muted">
                    {task.projectTitle} · due {formatDisplayDate(task.deadline)}
                    {task.requiredFollowUp ? ` · ${task.requiredFollowUp}` : ''}
                  </p>
                </div>
                <StatusBadge status={task.priority} />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-label="Conversion summary" className="space-y-3">
        <h2 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
          Conversion summary
        </h2>
        <p className="text-sm text-uv-foreground-muted">
          Follow-up completion {demoEmployeePerformance.followUpCompletionRatePercent}%
          · Customer response {demoEmployeePerformance.customerResponseRatePercent}%
          · Overdue {demoEmployeePerformance.overdueCount} · Demo values only
        </p>
      </section>

      <section aria-label="Recent activities" className="space-y-3">
        <h2 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
          Recent activities
        </h2>
        <ol className="space-y-2">
          {demoEmployeeRecentActivities.map((activity) => (
            <li
              key={activity.id}
              className="rounded-uv-lg border border-uv-border px-3 py-2.5"
            >
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={activity.kind} label={activity.title} />
                <span className="text-xs text-uv-foreground-subtle">
                  {formatEmployeeDateTime(activity.occurredAt)}
                </span>
              </div>
              <p className="mt-1 text-sm text-uv-foreground-muted">
                {activity.detail}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-label="Quick actions" className="flex flex-wrap gap-2">
        <Link
          href="/employee/follow-ups"
          className={cn(buttonVariants({ variant: 'primary', size: 'sm' }))}
        >
          Open follow-ups
        </Link>
        <Link
          href="/employee/pipeline"
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
        >
          Pipeline board
        </Link>
        <Link
          href="/employee/tasks"
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
        >
          Tasks
        </Link>
        <Link
          href="/employee/reports"
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
        >
          Daily report
        </Link>
        <Link
          href="/employee/meetings"
          className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
        >
          Meetings
        </Link>
      </section>
    </div>
  );
}
