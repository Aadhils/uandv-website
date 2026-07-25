import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CustomerQuotationDetailPage } from '@/components/customer/quotation-detail-page';
import { ensureDbUser } from '@/lib/auth/server-user';
import { getCustomerQuotationById } from '@/lib/quotations/service';

export const dynamic = 'force-dynamic';

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const user = await ensureDbUser();
  if (!user) return { title: 'Quotation' };
  const { id } = await params;
  const quotation = await getCustomerQuotationById(id, user);
  return { title: quotation?.quotationNumber ?? 'Quotation' };
}

export default async function CustomerQuotationDetailRoute({ params }: PageProps) {
  const user = await ensureDbUser();
  if (!user) notFound();

  const { id } = await params;
  const quotation = await getCustomerQuotationById(id, user);
  if (!quotation) notFound();

  return <CustomerQuotationDetailPage quotation={quotation} />;
}
