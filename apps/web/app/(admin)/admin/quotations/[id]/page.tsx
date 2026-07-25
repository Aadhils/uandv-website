import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { AdminQuotationDetailPage } from '@/components/admin/quotations/quotation-detail-page';
import { requireAdminUser } from '@/lib/auth/require-admin';
import { getAdminQuotationById } from '@/lib/quotations/service';

export const dynamic = 'force-dynamic';

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const quotation = await getAdminQuotationById(id);
  return { title: quotation?.quotationNumber ?? 'Quotation' };
}

export default async function AdminQuotationDetailRoute({ params }: PageProps) {
  await requireAdminUser({ redirectPath: '/admin/quotations' });
  const { id } = await params;
  const quotation = await getAdminQuotationById(id);
  if (!quotation) notFound();

  return <AdminQuotationDetailPage quotation={quotation} />;
}
