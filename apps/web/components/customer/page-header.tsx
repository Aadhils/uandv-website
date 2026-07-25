import type { ReactNode } from 'react';

import { SectionHeader, cn } from '@uandv/ui';

import { DevDataBadge } from '@/components/shared/dev-data-badge';

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
      <DevDataBadge label="Demo data · Customer Workspace" variant="secondary" />
      <SectionHeader title={title} description={description} actions={actions} />
    </div>
  );
}
