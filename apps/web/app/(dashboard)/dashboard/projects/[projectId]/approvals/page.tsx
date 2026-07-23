import type { Metadata } from 'next';

import { CustomerProjectApprovalsPage } from '@/components/customer/projects';

export const metadata: Metadata = { title: 'Project Approvals' };

type PageProps = { params: Promise<{ projectId: string }> };

export default async function Route({ params }: PageProps) {
  const { projectId } = await params;
  return <CustomerProjectApprovalsPage projectId={projectId} />;
}
