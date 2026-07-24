import type { Metadata } from 'next';

import { AdminProjectPaymentsPage } from '@/components/admin/projects';

export const metadata: Metadata = { title: 'Project Payments' };

type PageProps = {
  params: Promise<{ projectId: string }>;
};

export default async function Route({ params }: PageProps) {
  const { projectId } = await params;
  return <AdminProjectPaymentsPage projectId={projectId} />;
}
