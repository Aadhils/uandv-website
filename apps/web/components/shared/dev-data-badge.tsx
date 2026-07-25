import { Badge } from '@uandv/ui';

import { showDevUILabels } from '@/lib/env/dev-ui';

type DevDataBadgeProps = {
  label: string;
  variant?: 'warning' | 'secondary';
};

/** Visible only during local development — hidden in production. */
export function DevDataBadge({
  label,
  variant = 'warning',
}: DevDataBadgeProps) {
  if (!showDevUILabels()) {
    return null;
  }

  return <Badge variant={variant}>{label}</Badge>;
}
