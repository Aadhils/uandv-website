import { Badge, SectionHeader, cn } from '@uandv/ui';
import type { ReactNode } from 'react';

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
      <Badge variant="warning">Demo data · Vendor Workspace</Badge>
      <SectionHeader title={title} description={description} actions={actions} />
    </div>
  );
}
