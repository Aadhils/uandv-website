import Link from 'next/link';

import { buttonVariants, cn } from '@uandv/ui';

import { CustomerPageHeader } from '@/components/customer/page-header';
import { getProjectById } from '@/lib/projects';
import { notFound } from 'next/navigation';

export function CustomerProjectSupportPage({
  projectId,
}: {
  projectId: string;
}) {
  const project = getProjectById(projectId);
  if (!project) notFound();

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <CustomerPageHeader
        title="Project Support"
        description={`Need help with ${project.title}? Open a support ticket from your workspace.`}
      />
      <p className="text-sm text-uv-foreground-muted">
        Your delivery contact is {project.ownerName}. Support tickets remain in
        the shared Customer Support center.
      </p>
      <Link
        href="/dashboard/support"
        className={cn(buttonVariants({ variant: 'primary', size: 'sm' }))}
      >
        Go to Support
      </Link>
    </div>
  );
}
