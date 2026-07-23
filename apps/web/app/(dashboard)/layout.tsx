import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { WorkspaceShell } from '@/components/workspace';

export const metadata: Metadata = {
  title: 'Dashboard',
  description:
    'U&V Business Workspace foundation — shared enterprise app shell for future Customer, Vendor, Partner, Employee, and Admin workspaces.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardGroupLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <a
        href="#workspace-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[1300] focus:rounded-uv-lg focus:bg-uv-brand focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-uv-brand-foreground focus:shadow-uv-lg"
      >
        Skip to workspace content
      </a>
      <WorkspaceShell
        title="Dashboard Overview"
        subtitle="Universal Business Workspace · Foundation"
        breadcrumbs={[
          { label: 'Workspace', href: '/dashboard' },
          { label: 'Dashboard' },
        ]}
      >
        {children}
      </WorkspaceShell>
    </>
  );
}
