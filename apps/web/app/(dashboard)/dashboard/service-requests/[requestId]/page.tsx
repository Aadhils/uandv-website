import type { Metadata } from 'next';

import { CustomerServiceRequestDetailPage } from '@/components/customer/service-request-detail-page';

type PageProps = {
  params: Promise<{ requestId: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { requestId } = await params;
  return { title: `Service Request · ${requestId}` };
}

export default async function CustomerServiceRequestDetailRoute({
  params,
}: PageProps) {
  const { requestId } = await params;
  return <CustomerServiceRequestDetailPage requestId={requestId} />;
}
