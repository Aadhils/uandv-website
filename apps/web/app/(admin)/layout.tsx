import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';

import { AdminAccessDeniedPage } from '@/components/admin/admin-access-denied-page';
import { AdminShell } from '@/components/admin';
import { getAdminWorkspaceGate } from '@/lib/auth/admin-workspace-gate';

export const metadata: Metadata = {
  title: {
    default: 'Admin Workspace',
    template: '%s · Admin Workspace · U&V',
  },
  description:
    'U&V Admin Workspace — operations, lead management, and customer administration.',
  robots: { index: false, follow: false },
};

export default async function AdminGroupLayout({
  children,
}: {
  children: ReactNode;
}) {
  const gate = await getAdminWorkspaceGate();

  if (gate.kind === 'unauthenticated') {
    redirect('/login/admin?redirect_url=%2Fadmin');
  }

  if (gate.kind === 'forbidden') {
    return <AdminAccessDeniedPage user={gate.userDisplay} />;
  }

  return (
    <>
      <a
        href="#workspace-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[1300] focus:rounded-uv-lg focus:bg-uv-brand focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-uv-brand-foreground focus:shadow-uv-lg"
      >
        Skip to admin content
      </a>
      <AdminShell user={gate.userDisplay}>{children}</AdminShell>
    </>
  );
}
