import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { AdminShell } from '@/components/admin';

export const metadata: Metadata = {
  title: {
    default: 'Admin Workspace',
    template: '%s · Admin Workspace · U&V',
  },
  description:
    'U&V Admin Workspace foundation — customers, projects, payments, support, and reports. Demo UI only.',
  robots: { index: false, follow: false },
};

export default function AdminGroupLayout({
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
        Skip to admin content
      </a>
      <AdminShell>{children}</AdminShell>
    </>
  );
}
