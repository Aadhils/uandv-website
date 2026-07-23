import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';

import { CustomerProjectDetailNav } from '@/components/customer/projects';
import { demoProjects, getProjectById } from '@/lib/projects';

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ projectId: string }>;
};

export function generateStaticParams() {
  return demoProjects.map((project) => ({ projectId: project.id }));
}

export default async function CustomerProjectDetailLayout({
  children,
  params,
}: LayoutProps) {
  const { projectId } = await params;
  const project = getProjectById(projectId);
  if (!project) notFound();

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <CustomerProjectDetailNav projectId={projectId} project={project} />
      {children}
    </div>
  );
}
