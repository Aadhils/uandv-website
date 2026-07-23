import { EmployeePageHeader } from '@/components/employee/page-header';
import { PlaceholderAction } from '@/components/customer/placeholder-action';
import { demoEmployeeProfile } from '@/lib/employee';

export function EmployeeProfilePage() {
  const profile = demoEmployeeProfile;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <EmployeePageHeader
        title="Profile"
        description="Employee profile linked to the shared identity system. Demo data only — not editable against a backend."
      />

      <dl className="grid gap-4 rounded-uv-xl border border-uv-border p-5 sm:grid-cols-2">
        <div>
          <dt className="text-xs uppercase tracking-wide text-uv-foreground-subtle">
            Full name
          </dt>
          <dd className="mt-1 font-medium text-uv-foreground">
            {profile.fullName}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-uv-foreground-subtle">
            Title
          </dt>
          <dd className="mt-1 font-medium text-uv-foreground">{profile.title}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-uv-foreground-subtle">
            Email
          </dt>
          <dd className="mt-1 text-uv-foreground-muted">{profile.email}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-uv-foreground-subtle">
            Phone
          </dt>
          <dd className="mt-1 text-uv-foreground-muted">{profile.phone}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-uv-foreground-subtle">
            Department
          </dt>
          <dd className="mt-1 text-uv-foreground-muted">{profile.department}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-uv-foreground-subtle">
            Timezone
          </dt>
          <dd className="mt-1 text-uv-foreground-muted">{profile.timezone}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-uv-foreground-subtle">
            Shared user ID
          </dt>
          <dd className="mt-1 font-mono text-xs text-uv-foreground-muted">
            {profile.userId}
          </dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-uv-foreground-subtle">
            Employee ID
          </dt>
          <dd className="mt-1 font-mono text-xs text-uv-foreground-muted">
            {profile.employeeId}
          </dd>
        </div>
      </dl>

      <PlaceholderAction>Edit profile</PlaceholderAction>
    </div>
  );
}
