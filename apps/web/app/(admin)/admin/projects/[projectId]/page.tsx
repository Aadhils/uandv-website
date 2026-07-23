import type { Metadata } from 'next';

import { AdminProjectOverviewPage } from '@/components/admin/projects';
import { demoProjects } from '@/lib/projects';

export const metadata: Metadata = { title: 'Project Detail' };

type PageProps = {
  params: Promise<{ projectId: string }>;
};

export function generateStaticParams() {
  return demoProjects.map((project) => ({ projectId: project.id }));
}

export default async function AdminProjectDetailRoute({ params }: PageProps) {
  const { projectId } = await params;
  return <AdminProjectOverviewPage projectId={projectId} />;
}
