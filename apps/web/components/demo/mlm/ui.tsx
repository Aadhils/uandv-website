import { cn } from '@uandv/ui';
import type { ReactNode } from 'react';

export function DemoPageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-[family-name:var(--font-uv-display)] text-2xl font-bold tracking-tight text-uv-foreground sm:text-3xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}

export function DemoCard({
  children,
  className,
  title,
  description,
  action,
}: {
  children?: ReactNode;
  className?: string;
  title?: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <section
      className={cn(
        'rounded-uv-2xl border border-uv-border bg-uv-background p-5 shadow-uv-sm sm:p-6',
        className,
      )}
    >
      {title || description || action ? (
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            {title ? (
              <h2 className="font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="mt-1 text-sm text-uv-foreground-muted">{description}</p>
            ) : null}
          </div>
          {action}
        </div>
      ) : null}
      {children}
    </section>
  );
}

export function DemoStatCard({
  label,
  value,
  hint,
  trend,
}: {
  label: string;
  value: string;
  hint: string;
  trend: string;
}) {
  return (
    <article className="rounded-uv-xl border border-uv-border bg-uv-background p-5 shadow-uv-sm">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-uv-brand">
        {label}
      </p>
      <p className="mt-3 font-[family-name:var(--font-uv-display)] text-2xl font-bold text-uv-foreground">
        {value}
      </p>
      <p className="mt-2 text-sm text-uv-foreground-muted">{hint}</p>
      <p className="mt-3 text-xs font-medium text-uv-accent">{trend}</p>
    </article>
  );
}

export function StatusBadge({
  status,
}: {
  status: string;
}) {
  const tone =
    status === 'active' ||
    status === 'completed' ||
    status === 'paid' ||
    status === 'success' ||
    status === 'verified' ||
    status === 'delivered' ||
    status === 'approved' ||
    status === 'unused'
      ? 'bg-uv-success-muted text-uv-success'
      : status === 'pending' ||
          status === 'processing' ||
          status === 'placed' ||
          status === 'packed' ||
          status === 'shipped' ||
          status === 'used'
        ? 'bg-uv-warning-muted text-uv-warning'
        : status === 'failed' ||
            status === 'inactive' ||
            status === 'held' ||
            status === 'rejected' ||
            status === 'cancelled' ||
            status === 'missing'
          ? 'bg-uv-error-muted text-uv-error'
          : 'bg-uv-brand-muted text-uv-brand';

  return (
    <span
      className={cn(
        'inline-flex rounded-uv-full px-2.5 py-1 text-xs font-medium capitalize',
        tone,
      )}
    >
      {status}
    </span>
  );
}

export function DemoTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="overflow-x-auto rounded-uv-xl border border-uv-border">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-uv-background-subtle text-uv-foreground-muted">
          <tr>
            {headers.map((header) => (
              <th key={header} className="whitespace-nowrap px-4 py-3 font-medium">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              className="border-t border-uv-border text-uv-foreground"
            >
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="whitespace-nowrap px-4 py-3 align-middle">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-uv-xl border border-dashed border-uv-border bg-uv-background-subtle px-4 py-10 text-center text-sm text-uv-foreground-muted">
      {message}
    </div>
  );
}
