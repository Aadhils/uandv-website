import { Badge, SectionHeader, cn } from '@uandv/ui';
import type { ReactNode } from 'react';

import { DevDataBadge } from '@/components/shared/dev-data-badge';

type AdminPageHeaderProps = {
  title: string;
  description: string;
  actions?: ReactNode;
  className?: string;
  /** demo = yellow demo badge; live = production data badge; none = hide badge */
  badge?: 'demo' | 'live' | 'none';
};

export function AdminPageHeader({
  title,
  description,
  actions,
  className,
  badge = 'none',
}: AdminPageHeaderProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {badge === 'demo' ? (
        <DevDataBadge label="Demo data · Admin Workspace" />
      ) : null}
      {badge === 'live' ? (
        <Badge variant="success">Live enquiries · Admin CRM</Badge>
      ) : null}
      <SectionHeader title={title} description={description} actions={actions} />
    </div>
  );
}
