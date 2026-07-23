import type { Metadata } from 'next';

import { PartnerRegistrationPage } from '@/components/partners';

export const metadata: Metadata = {
  title: 'Partner Registration',
  description:
    'Register for the U&V Partner Marketplace. Demo submissions enter the admin approval queue.',
};

export default function PartnerRegisterRoute() {
  return <PartnerRegistrationPage />;
}
