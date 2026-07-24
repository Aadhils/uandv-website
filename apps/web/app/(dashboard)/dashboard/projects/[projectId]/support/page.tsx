import type { Metadata } from 'next';

import { CustomerProjectSupportPage } from '@/components/customer/projects';

export const metadata: Metadata = { title: 'Project Support' };

type PageProps = { params: Promise<{ projectId: string }> };

export default async function Route({ params }: PageProps) {
  const { projectId } = await params;
  return <CustomerProjectSupportPage projectId={projectId} />;
}
