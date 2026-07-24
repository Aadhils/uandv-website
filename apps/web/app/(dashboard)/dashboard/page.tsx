import type { Metadata } from 'next';
import { auth } from '@clerk/nextjs/server';

import { DashboardAuthGate } from '@/components/auth/dashboard-auth-gate';
import { LiveCustomerDashboardPage } from '@/components/customer/live-dashboard-page';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function DashboardPage() {
  const { userId } = await auth();

  // Do not server-redirect to /login here — that caused login↔dashboard loops when
  // the browser session was active but the server secret could not verify it.
  if (!userId) {
    return <DashboardAuthGate serverUserId={null} />;
  }

  return (
    <DashboardAuthGate serverUserId={userId}>
      <LiveCustomerDashboardPage />
    </DashboardAuthGate>
  );
}
