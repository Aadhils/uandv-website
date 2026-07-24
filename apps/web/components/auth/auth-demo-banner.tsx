import { Badge } from '@uandv/ui';

import { AUTH_DEMO_NOTICE } from '@/lib/auth';

/** Clearly labels demo auth surfaces as non-production. */
export function AuthDemoBanner({ className }: { className?: string }) {
  return (
    <div
      className={className}
      role="status"
      aria-live="polite"
    >
      <Badge variant="warning" className="mb-2">
        Demo preview
      </Badge>
      <p className="text-xs leading-relaxed text-uv-foreground-muted sm:text-sm">
        {AUTH_DEMO_NOTICE}
      </p>
    </div>
  );
}
