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
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-uv-brand">
          Product Demo · Mock Data
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-uv-display)] text-2xl font-bold tracking-tight text-uv-foreground sm:text-3xl">
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
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <article className="rounded-uv-xl border border-uv-border bg-uv-background p-5 shadow-uv-sm">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-uv-brand">{label}</p>
      <p className="mt-3 font-[family-name:var(--font-uv-display)] text-2xl font-bold text-uv-foreground">
        {value}
      </p>
      <p className="mt-2 text-sm text-uv-foreground-muted">{hint}</p>
    </article>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const normalized = status.replace(/_/g, ' ');
  const tone =
    status === 'confirmed' ||
    status === 'paid' ||
    status === 'completed' ||
    status === 'settled' ||
    status === 'available'
      ? 'bg-uv-success-muted text-uv-success'
      : status === 'pending' ||
          status === 'partial' ||
          status === 'open' ||
          status === 'quoted' ||
          status === 'in_review' ||
          status === 'draft'
        ? 'bg-uv-warning-muted text-uv-warning'
        : status === 'cancelled' || status === 'refunded' || status === 'failed'
          ? 'bg-uv-error-muted text-uv-error'
          : 'bg-uv-brand-muted text-uv-brand';

  return (
    <span
      className={cn(
        'inline-flex rounded-uv-full px-2.5 py-1 text-xs font-medium capitalize',
        tone,
      )}
    >
      {normalized}
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
            <tr key={index} className="border-t border-uv-border text-uv-foreground">
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

export function BarChart({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(...data.map((row) => row.value), 1);
  return (
    <div className="flex h-56 items-end gap-3">
      {data.map((row) => (
        <div key={row.label} className="flex flex-1 flex-col items-center gap-2">
          <p className="text-xs font-medium text-uv-foreground-muted">{row.value}L</p>
          <div className="flex h-40 w-full items-end rounded-uv-lg bg-uv-background-subtle px-1.5 pb-1.5">
            <div
              className="w-full rounded-uv-md uv-brand-gradient transition-[height]"
              style={{ height: `${Math.max(8, Math.round((row.value / max) * 100))}%` }}
            />
          </div>
          <p className="text-xs font-medium text-uv-foreground">{row.label}</p>
        </div>
      ))}
    </div>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block text-sm font-medium text-uv-foreground">
      {label}
      <div className="mt-2">{children}</div>
    </label>
  );
}

export function EmptyHint({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-uv-xl border border-dashed border-uv-border bg-uv-background-subtle px-4 py-8 text-center text-sm text-uv-foreground-muted">
      {children}
    </p>
  );
}
