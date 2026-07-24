import type { ReactNode } from 'react';

import { Badge, SectionHeader, cn } from '@uandv/ui';

type CustomerPageHeaderProps = {
  title: string;
  description: string;
  actions?: ReactNode;
  className?: string;
};

export function CustomerPageHeader({
  title,
  description,
  actions,
  className,
}: CustomerPageHeaderProps) {
  return (
    <div className={cn('space-y-3', className)}>
      <Badge variant="secondary">Demo data · Customer Workspace</Badge>
      <SectionHeader title={title} description={description} actions={actions} />
    </div>
  );
}
