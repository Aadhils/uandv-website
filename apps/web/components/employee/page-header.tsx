import { SectionHeader, cn } from '@uandv/ui';
import type { ReactNode } from 'react';

import { DevDataBadge } from '@/components/shared/dev-data-badge';

type EmployeePageHeaderProps = {
  title: string;
  description: string;
  actions?: ReactNode;
  className?: string;
};

export function EmployeePageHeader({
  title,
  description,
  actions,
  className,
}: EmployeePageHeaderProps) {
  return (
    <div className={cn('space-y-3', className)}>
      <DevDataBadge label="Demo data · Employee Workspace" />
      <SectionHeader title={title} description={description} actions={actions} />
    </div>
  );
}
