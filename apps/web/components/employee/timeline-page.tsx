import { Badge } from '@uandv/ui';

import { EmployeePageHeader } from '@/components/employee/page-header';
import {
  BusinessTimeline,
  LifecycleActivityFeed,
  ProjectHealthPanel,
} from '@/components/lifecycle';
import {
  buildLifetimeTimeline,
  filterTimelineForRole,
  getActivityFeedForRole,
  getProjectHealthById,
} from '@/lib/lifecycle';
import { demoEmployeeUser } from '@/lib/employee';
import { getTasksForEmployee, getProjectById } from '@/lib/projects';

export function EmployeeTimelinePage() {
  const events = filterTimelineForRole(buildLifetimeTimeline(), 'employee', {
    employeeId: demoEmployeeUser.employeeId,
  });
  const activity = getActivityFeedForRole('employee', {
    employeeId: demoEmployeeUser.employeeId,
    limit: 8,
  });
  const projectIds = [
    ...new Set(
      getTasksForEmployee(demoEmployeeUser.employeeId).map((t) => t.projectId),
    ),
  ];
  const health = projectIds
    .map((id) => getProjectHealthById(id))
    .filter((h): h is NonNullable<typeof h> => Boolean(h));

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <EmployeePageHeader
        title="Delivery Timeline"
        description="Internal and customer-visible events for your assigned work. Admin-only entries are hidden. Demo only."
      />
      <Badge variant="warning" className="w-fit">
        Sprint 3.2 · Employee visibility
      </Badge>

      {health.length > 0 ? (
        <section aria-labelledby="emp-health-heading" className="space-y-3">
          <h2
            id="emp-health-heading"
            className="font-[family-name:var(--font-uv-display)] text-lg font-semibold"
          >
            Assigned project health
          </h2>
          <div className="grid gap-4 lg:grid-cols-2">
            {health.map((snapshot) => (
              <ProjectHealthPanel
                key={snapshot.projectId}
                snapshot={snapshot}
                compact
              />
            ))}
          </div>
          <ul className="text-xs text-uv-foreground-subtle">
            {projectIds.map((id) => {
              const project = getProjectById(id);
              return (
                <li key={id}>
                  {project?.title ?? id} · customer context limited to assigned
                  work
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="space-y-3">
          <h2 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold">
            Timeline
          </h2>
          <BusinessTimeline events={events} showVisibility />
        </section>
        <section className="space-y-3">
          <h2 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold">
            Activity feed
          </h2>
          <LifecycleActivityFeed items={activity} />
        </section>
      </div>
    </div>
  );
}
