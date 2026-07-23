import { Badge } from '@uandv/ui';

import { AdminPageHeader } from '@/components/admin/page-header';
import { PlaceholderAction } from '@/components/customer/placeholder-action';
import { EMPLOYEE_FORBIDDEN_CAPABILITIES } from '@/lib/auth';
import {
  EMPLOYEE_PERMISSION_LABELS,
  EMPLOYEE_PERMISSION_OPTIONS,
  demoCrmEmployees,
} from '@/lib/crm';

export function AdminEmployeePermissionsPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <AdminPageHeader
        title="Employee Permissions"
        description="Control employee capabilities. Employees cannot receive global customer access, payments, reports, or admin settings."
      />

      <div className="rounded-uv-lg border border-uv-border bg-uv-background-muted/40 px-4 py-3 text-sm text-uv-foreground-muted">
        Forbidden for employees:{' '}
        {EMPLOYEE_FORBIDDEN_CAPABILITIES.map((cap) => (
          <Badge key={cap} variant="outline" className="mr-1 mt-1">
            {cap}
          </Badge>
        ))}
      </div>

      <ul className="space-y-4">
        {demoCrmEmployees.map((employee) => (
          <li
            key={employee.id}
            className="rounded-uv-xl border border-uv-border p-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-uv-foreground">
                  {employee.name}
                </p>
                <p className="text-xs text-uv-foreground-muted">
                  {employee.department} · {employee.userId}
                </p>
              </div>
              <PlaceholderAction>Save permissions</PlaceholderAction>
            </div>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {EMPLOYEE_PERMISSION_OPTIONS.map((capability) => {
                const enabled = employee.permissions.includes(capability);
                return (
                  <li
                    key={capability}
                    className="flex items-center justify-between gap-2 rounded-uv-lg border border-uv-border px-3 py-2 text-sm"
                  >
                    <span>
                      {EMPLOYEE_PERMISSION_LABELS[capability] ?? capability}
                    </span>
                    <Badge variant={enabled ? 'success' : 'secondary'}>
                      {enabled ? 'On' : 'Off'}
                    </Badge>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
