import type { Metadata } from 'next';

import { CustomerProjectDocumentsPage } from '@/components/customer/projects';

export const metadata: Metadata = { title: 'Project Documents' };

type PageProps = { params: Promise<{ projectId: string }> };

export default async function Route({ params }: PageProps) {
  const { projectId } = await params;
  return <CustomerProjectDocumentsPage projectId={projectId} />;
}
