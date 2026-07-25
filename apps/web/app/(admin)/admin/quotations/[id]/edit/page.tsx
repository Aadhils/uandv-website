import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { QuotationEditor } from '@/components/admin/quotations/quotation-editor';
import { requireAdminUser } from '@/lib/auth/require-admin';
import { getAdminQuotationById } from '@/lib/quotations/service';

export const metadata: Metadata = { title: 'Edit quotation' };
export const dynamic = 'force-dynamic';

type PageProps = { params: Promise<{ id: string }> };

export default async function AdminEditQuotationRoute({ params }: PageProps) {
  await requireAdminUser({ redirectPath: '/admin/quotations' });
  const { id } = await params;
  const quotation = await getAdminQuotationById(id);
  if (!quotation) notFound();
  if (quotation.status !== 'DRAFT') notFound();

  return <QuotationEditor mode="edit" quotationId={id} initial={quotation} />;
}
