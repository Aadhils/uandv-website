import { CustomerPageHeader } from '@/components/customer/page-header';
import { AdminDashboardPreview } from '@/components/lifecycle/admin-dashboard-preview';
import { demoAdminMetrics, demoAdminQueue } from '@/lib/customer';

export function CustomerAdminPreviewPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8">
      <CustomerPageHeader
        title="Admin Dashboard Preview"
        description="Future Admin Workspace UI foundation. No elevated auth, APIs, or live ops."
      />
      <AdminDashboardPreview
        metrics={demoAdminMetrics}
        queue={demoAdminQueue}
      />
    </div>
  );
}
