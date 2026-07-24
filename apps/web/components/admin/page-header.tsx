import { Badge, SectionHeader, cn } from '@uandv/ui';
import type { ReactNode } from 'react';

type AdminPageHeaderProps = {
  title: string;
  description: string;
  actions?: ReactNode;
  className?: string;
};

export function AdminPageHeader({
  title,
  description,
  actions,
  className,
}: AdminPageHeaderProps) {
  return (
    <div className={cn('space-y-3', className)}>
      <Badge variant="warning">Demo data · Admin Workspace</Badge>
      <SectionHeader title={title} description={description} actions={actions} />
    </div>
  );
}
