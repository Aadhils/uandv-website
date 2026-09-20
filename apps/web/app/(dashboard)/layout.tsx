import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { WorkspaceShell } from '@/components/workspace';
import { getWorkspaceUserDisplay } from '@/lib/auth/workspace-user';

export const metadata: Metadata = {
  title: {
    default: 'My Business Workspace',
    template: '%s · My Business Workspace · U&V',
  },
  description:
    'Your U&V Business Workspace — business journey, conversations, recommendations, projects, assets, and support in one place.',
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
