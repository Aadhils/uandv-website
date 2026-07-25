import { Badge, SectionHeader, cn } from '@uandv/ui';
import type { ReactNode } from 'react';

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
  badge = 'demo',
}: AdminPageHeaderProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {badge === 'demo' ? (
        <Badge variant="warning">Demo data · Admin Workspace</Badge>
      ) : null}
      {badge === 'live' ? (
        <Badge variant="success">Live enquiries · Admin CRM</Badge>
      ) : null}
      <SectionHeader title={title} description={description} actions={actions} />
    </div>
  );
}
