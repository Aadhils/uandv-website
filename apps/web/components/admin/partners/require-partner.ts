import { notFound } from 'next/navigation';

import { getPartnerById, type Partner } from '@/lib/partners';

export function requirePartner(partnerId: string): Partner {
  const partner = getPartnerById(partnerId);
  if (!partner) notFound();
  return partner;
}
