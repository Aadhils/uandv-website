'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { buttonVariants, cn } from '@uandv/ui';

import {
  LIFECYCLE_STAGE_LABELS,
  SERVICE_CATEGORY_LABELS,
  type Project,
} from '@/lib/projects';

const tabs = [
  { href: '', label: 'Overview' },
  { href: 'timeline', label: 'Timeline' },
  { href: 'tasks', label: 'Tasks' },
  { href: 'employees', label: 'Employees' },
  { href: 'vendors', label: 'Vendors' },
  { href: 'documents', label: 'Documents' },
  { href: 'payments', label: 'Payments' },
  { href: 'approvals', label: 'Approvals' },
  { href: 'activity', label: 'Activity' },
  { href: 'support', label: 'Support' },
] as const;

export function AdminProjectDetailNav({
  projectId,
  project,
}: {
  projectId: string;
  project: Project;
}) {
  const pathname = usePathname();
  const base = `/admin/projects/${projectId}`;

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs text-uv-foreground-subtle">{project.id}</p>
        <h1 className="font-[family-name:var(--font-uv-display)] text-xl font-semibold text-uv-foreground sm:text-2xl">
          {project.title}
        </h1>
        <p className="mt-1 text-sm text-uv-foreground-muted">
          {SERVICE_CATEGORY_LABELS[project.serviceCategory]} ·{' '}
          {LIFECYCLE_STAGE_LABELS[project.currentStage]} ·{' '}
          {project.customerBusinessName}
        </p>
      </div>
      <nav
        aria-label="Project sections"
        className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1"
      >
        {tabs.map((tab) => {
          const href = tab.href ? `${base}/${tab.href}` : base;
          const active =
            tab.href === ''
              ? pathname === base || pathname === `${base}/overview`
              : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={tab.label}
              href={href}
              className={cn(
                buttonVariants({
                  variant: active ? 'secondary' : 'ghost',
                  size: 'sm',
                }),
                'shrink-0',
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
