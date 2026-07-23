import type { ReactNode } from 'react';

import { buttonVariants, cn } from '@uandv/ui';

/** Non-functional action for demo placeholders. */
export function PlaceholderAction({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      disabled
      title="Demo placeholder — not connected yet"
      className={cn(
        buttonVariants({ variant: 'outline', size: 'sm' }),
        'disabled:cursor-not-allowed',
        className,
      )}
    >
      {children}
    </button>
  );
}
