import type { Metadata } from 'next';

import { CustomerProjectOverviewPage } from '@/components/customer/projects';
import { demoProjects } from '@/lib/projects';

export const metadata: Metadata = { title: 'Project Detail' };

type PageProps = {
  params: Promise<{ projectId: string }>;
};

export function generateStaticParams() {
  return demoProjects.map((project) => ({ projectId: project.id }));
}

export default async function CustomerProjectDetailRoute({ params }: PageProps) {
  const { projectId } = await params;
  return <CustomerProjectOverviewPage projectId={projectId} />;
}
