import Link from 'next/link';
import type { ReactNode } from 'react';

import { cn } from '@uandv/ui';

type Column<T> = {
  key: string;
  header: string;
  className?: string;
  render: (row: T) => ReactNode;
  /** Shown in mobile card stack */
  mobileLabel?: string;
  hideOnMobile?: boolean;
};

type ResponsiveDataListProps<T> = {
  rows: T[];
  columns: Column<T>[];
  getRowId: (row: T) => string;
  mobileTitle: (row: T) => ReactNode;
  getRowHref?: (row: T) => string;
  className?: string;
  emptyMessage?: string;
};

/**
 * Desktop table + mobile stacked cards for workspace lists.
 */
export function ResponsiveDataList<T>({
  rows,
  columns,
  getRowId,
  mobileTitle,
  getRowHref,
  className,
  emptyMessage = 'No items to show.',
}: ResponsiveDataListProps<T>) {
  if (rows.length === 0) {
    return (
      <p className="rounded-uv-xl border border-dashed border-uv-border px-4 py-10 text-center text-sm text-uv-foreground-muted">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Mobile cards */}
      <ul className="grid gap-3 md:hidden" role="list">
        {rows.map((row) => {
          const href = getRowHref?.(row);
          const card = (
            <div className="rounded-uv-xl border border-uv-border bg-uv-card p-4 shadow-uv-sm">
              <div className="font-medium text-uv-foreground">{mobileTitle(row)}</div>
              <dl className="mt-3 space-y-2">
                {columns
                  .filter((column) => !column.hideOnMobile)
                  .map((column) => (
                    <div
                      key={column.key}
                      className="flex items-start justify-between gap-3 text-sm"
                    >
                      <dt className="text-uv-foreground-subtle">
                        {column.mobileLabel ?? column.header}
                      </dt>
                      <dd className="text-right text-uv-foreground">
                        {column.render(row)}
                      </dd>
                    </div>
                  ))}
              </dl>
            </div>
          );

          return (
            <li key={getRowId(row)} role="listitem">
              {href ? (
                <Link
                  href={href}
                  className="block rounded-uv-xl transition-colors hover:border-uv-brand/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-uv-brand"
                >
                  {card}
                </Link>
              ) : (
                card
              )}
            </li>
          );
        })}
      </ul>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto rounded-uv-xl border border-uv-border md:block">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-uv-border bg-uv-background-subtle">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={cn(
                    'px-4 py-3 font-medium text-uv-foreground-muted',
                    column.className,
                  )}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-uv-border bg-uv-card">
            {rows.map((row) => {
              const href = getRowHref?.(row);
              return (
                <tr
                  key={getRowId(row)}
                  className={cn(
                    'align-top',
                    href && 'cursor-pointer hover:bg-uv-background-subtle/80',
                  )}
                >
                  {columns.map((column, columnIndex) => {
                    const cell = (
                      <td
                        key={column.key}
                        className={cn('px-4 py-3 text-uv-foreground', column.className)}
                      >
                        {column.render(row)}
                      </td>
                    );

                    if (href && columnIndex === 0) {
                      return (
                        <td
                          key={column.key}
                          className={cn('px-4 py-3 text-uv-foreground', column.className)}
                        >
                          <Link
                            href={href}
                            className="block font-medium text-uv-brand hover:underline"
                          >
                            {column.render(row)}
                          </Link>
                        </td>
                      );
                    }

                    return cell;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
