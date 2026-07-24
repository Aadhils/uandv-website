import type { Metadata } from 'next';

import { AdminServiceRequestDetailPage } from '@/components/admin/service-request-detail-page';

type PageProps = {
  params: Promise<{ requestId: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { requestId } = await params;
  return { title: `Service Request · ${requestId}` };
}

export default async function AdminServiceRequestDetailRoute({
  params,
}: PageProps) {
  const { requestId } = await params;
  return <AdminServiceRequestDetailPage requestId={requestId} />;
}
