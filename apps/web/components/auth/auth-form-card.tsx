import type { ReactNode } from 'react';

import { cn } from '@uandv/ui';

type AuthFormCardProps = {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
};

export function AuthFormCard({
  title,
  description,
  children,
  footer,
  className,
}: AuthFormCardProps) {
  return (
    <div
      className={cn(
        'w-full rounded-uv-xl border border-uv-border bg-uv-card p-6 shadow-uv-sm sm:p-8',
        className,
      )}
    >
      <div className="mb-6 space-y-2">
        <h1 className="font-[family-name:var(--font-uv-display)] text-2xl font-semibold tracking-tight text-uv-foreground sm:text-3xl">
          {title}
        </h1>
        {description ? (
          <p className="text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
            {description}
          </p>
        ) : null}
      </div>

      {children}

      {footer ? (
        <div className="mt-6 border-t border-uv-border pt-5 text-sm text-uv-foreground-muted">
          {footer}
        </div>
      ) : null}
    </div>
  );
}
