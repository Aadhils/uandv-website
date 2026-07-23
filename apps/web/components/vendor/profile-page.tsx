import { VendorPageHeader } from '@/components/vendor/page-header';
import { PlaceholderAction } from '@/components/customer/placeholder-action';
import { demoVendorProfile } from '@/lib/vendor';

export function VendorProfilePage() {
  const profile = demoVendorProfile;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8">
      <VendorPageHeader
        title="Profile"
        description="Vendor profile linked to the shared identity system. Demo data only."
      />

      <dl className="grid gap-4 rounded-uv-xl border border-uv-border p-5 sm:grid-cols-2">
        <div>
          <dt className="text-xs uppercase tracking-wide text-uv-foreground-subtle">
            Display name
          </dt>
          <dd className="mt-1 font-medium">{profile.displayName}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-uv-foreground-subtle">
            Contact
          </dt>
          <dd className="mt-1 font-medium">{profile.contactName}</dd>
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
            Category
          </dt>
          <dd className="mt-1 text-uv-foreground-muted">{profile.category}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-uv-foreground-subtle">
            City
          </dt>
          <dd className="mt-1 text-uv-foreground-muted">{profile.city}</dd>
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
            Vendor ID
          </dt>
          <dd className="mt-1 font-mono text-xs text-uv-foreground-muted">
            {profile.vendorId}
          </dd>
        </div>
      </dl>

      <PlaceholderAction>Edit profile</PlaceholderAction>
    </div>
  );
}
