import type { ReactNode } from 'react';

import {
  AdminProjectDetailNav,
  requireProject,
} from '@/components/admin/projects';
import { demoProjects } from '@/lib/projects';

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ projectId: string }>;
};

export function generateStaticParams() {
  return demoProjects.map((project) => ({ projectId: project.id }));
}

export default async function AdminProjectDetailLayout({
  children,
  params,
}: LayoutProps) {
  const { projectId } = await params;
  const project = requireProject(projectId);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <AdminProjectDetailNav projectId={projectId} project={project} />
      {children}
    </div>
  );
}
