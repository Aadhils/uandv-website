import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { WorkspaceShell } from '@/components/workspace';
import { getWorkspaceUserDisplay } from '@/lib/auth/workspace-user';

export const metadata: Metadata = {
  title: {
    default: 'Customer Workspace',
    template: '%s · Customer Workspace · U&V',
  },
  description:
    'U&V Customer Workspace — projects, requests, agreements, payments, documents, and support foundation.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardGroupLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getWorkspaceUserDisplay();

  return (
    <>
      <a
        href="#workspace-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[1300] focus:rounded-uv-lg focus:bg-uv-brand focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-uv-brand-foreground focus:shadow-uv-lg"
      >
        Skip to workspace content
      </a>
      <WorkspaceShell user={user}>{children}</WorkspaceShell>
    </>
  );
}
