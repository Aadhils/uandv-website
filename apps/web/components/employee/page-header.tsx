import { Badge, SectionHeader, cn } from '@uandv/ui';
import type { ReactNode } from 'react';

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
      <Badge variant="warning">Demo data · Employee Workspace</Badge>
      <SectionHeader title={title} description={description} actions={actions} />
    </div>
  );
}
