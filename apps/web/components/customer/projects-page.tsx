import Link from 'next/link';

import { buttonVariants, cn } from '@uandv/ui';

import { CustomerPageHeader } from '@/components/customer/page-header';
import { ProjectLifecycleCard } from '@/components/lifecycle/project-lifecycle-card';
import {
  demoProjects,
  getMilestonesForProject,
} from '@/lib/customer';

export function CustomerProjectsPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <CustomerPageHeader
        title="My Projects"
        description="Project lifecycle cards with progress bars and milestone timelines. Demo data only."
      />

      <div className="grid gap-6">
        {demoProjects.map((project) => (
          <ProjectLifecycleCard
            key={project.id}
            project={project}
            milestones={getMilestonesForProject(project.id)}
          />
        ))}
      </div>

      <p className="text-sm text-uv-foreground-muted">
        Need something new?{' '}
        <Link
          href="/dashboard/requests"
          className={cn(
            buttonVariants({ variant: 'link', size: 'sm' }),
            'px-0',
          )}
        >
          Create a service request
        </Link>
      </p>
    </div>
  );
}
