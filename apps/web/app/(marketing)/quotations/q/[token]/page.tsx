import { notFound } from 'next/navigation';

import { PublicQuotationPage } from '@/components/quotations/public-quotation-page';
import { getPublicQuotationByToken } from '@/lib/quotations/service';

export const metadata = {
  title: 'Quotation',
  robots: { index: false, follow: false },
};

type PageProps = {
  params: Promise<{ token: string }>;
};

export default async function PublicQuotationRoute({ params }: PageProps) {
  const { token } = await params;
  const quotation = await getPublicQuotationByToken(token);
  if (!quotation) {
    notFound();
  }

  return <PublicQuotationPage quotation={quotation} token={token} />;
}
