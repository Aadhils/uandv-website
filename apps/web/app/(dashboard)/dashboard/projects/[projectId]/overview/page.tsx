import type { Metadata } from 'next';

import { CustomerProjectOverviewPage } from '@/components/customer/projects';

export const metadata: Metadata = { title: 'Project Overview' };

type PageProps = { params: Promise<{ projectId: string }> };

export default async function Route({ params }: PageProps) {
  const { projectId } = await params;
  return <CustomerProjectOverviewPage projectId={projectId} />;
}
