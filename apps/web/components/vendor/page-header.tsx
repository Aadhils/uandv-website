import { SectionHeader, cn } from '@uandv/ui';
import type { ReactNode } from 'react';

import { DevDataBadge } from '@/components/shared/dev-data-badge';

type VendorPageHeaderProps = {
  title: string;
  description: string;
  actions?: ReactNode;
  className?: string;
};

export function VendorPageHeader({
  title,
  description,
  actions,
  className,
}: VendorPageHeaderProps) {
  return (
    <div className={cn('space-y-3', className)}>
      <DevDataBadge label="Demo data · Vendor Workspace" />
      <SectionHeader title={title} description={description} actions={actions} />
    </div>
  );
}
