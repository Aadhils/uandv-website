import {
  ActivityFeed,
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  NotificationList,
  QuickActionCard,
  SectionHeader,
  StatsCard,
  UserProfileCard,
  type ActivityItem,
  type NotificationItem,
} from '@uandv/ui';

const placeholderStats = [
  {
    label: 'Active workspaces',
    value: '5',
    hint: 'Roles ready to mount',
    trend: 'Foundation ready',
    icon: 'Building2' as const,
  },
  {
    label: 'Open tasks',
    value: '—',
    hint: 'Connect task modules later',
    icon: 'ClipboardList' as const,
  },
  {
    label: 'Messages',
    value: '—',
    hint: 'Chat foundation coming soon',
    icon: 'MessageCircle' as const,
  },
  {
    label: 'Growth pulse',
    value: '—',
    hint: 'Metrics will connect here',
    icon: 'TrendingUp' as const,
  },
];

const quickActions = [
  {
    title: 'Customer Workspace',
    description: 'Orders, bookings, and support for end customers.',
    icon: 'Users' as const,
    badge: 'Soon',
    disabled: true,
  },
  {
    title: 'Vendor Workspace',
    description: 'Catalog, fulfillment, and vendor operations.',
    icon: 'Store' as const,
    badge: 'Soon',
    disabled: true,
  },
  {
    title: 'Partner Workspace',
    description: 'Referrals, co-sell, and shared growth tools.',
    icon: 'Handshake' as const,
    badge: 'Soon',
    disabled: true,
  },
  {
    title: 'Employee Workspace',
    description: 'Internal delivery, CRM, and team operations.',
    icon: 'Briefcase' as const,
    badge: 'Soon',
    disabled: true,
  },
  {
    title: 'Admin Workspace',
    description: 'Platform controls, users, and configuration.',
    icon: 'Settings' as const,
    badge: 'Soon',
    disabled: true,
  },
];

/** Static sample rows — UI only, not live data */
const sampleActivity: ActivityItem[] = [
  {
    id: '1',
    title: 'Universal Dashboard foundation created',
    description: 'Shared shell for all future workspace roles.',
    time: 'Just now · Sprint 3.0.1',
    icon: 'Sparkles',
  },
  {
    id: '2',
    title: 'Sidebar & top navigation scaffolded',
    description: 'Collapsible nav with placeholder destinations.',
    time: 'Foundation · UI only',
    icon: 'LayoutDashboard',
  },
  {
    id: '3',
    title: 'Reusable panels registered',
    description: 'Activity, notifications, and profile cards ready to reuse.',
    time: 'Architecture · no API',
    icon: 'Layers',
  },
];

const sampleNotifications: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Welcome to the Business Workspace',
    description: 'This is a UI foundation preview. Auth arrives in a later sprint.',
    time: 'Pinned',
    unread: true,
  },
  {
    id: 'n2',
    title: 'Role workspaces coming next',
    description: 'Customer, Vendor, Partner, Employee, and Admin will plug into this shell.',
    time: 'Roadmap',
    unread: false,
  },
];

/**
 * Static dashboard overview — professional enterprise UI foundation only.
 */
export function DashboardOverview() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:gap-10">
      {/* Welcome */}
      <section
        aria-labelledby="dashboard-welcome-heading"
        className="relative overflow-hidden rounded-uv-xl border border-uv-border bg-uv-background-subtle"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-90"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 100% 0%, color-mix(in srgb, var(--uv-brand) 18%, transparent), transparent 55%), radial-gradient(ellipse 50% 40% at 0% 100%, color-mix(in srgb, var(--uv-navy) 10%, transparent), transparent 50%)',
          }}
          aria-hidden
        />
        <div className="relative flex flex-col gap-4 px-5 py-6 sm:flex-row sm:items-end sm:justify-between sm:px-8 sm:py-8">
          <div className="max-w-2xl space-y-2">
            <Badge variant="default">Sprint 3.0.1 · Foundation</Badge>
            <h2
              id="dashboard-welcome-heading"
              className="font-[family-name:var(--font-uv-display)] text-2xl font-semibold tracking-tight text-uv-foreground sm:text-3xl"
            >
              Welcome to U&V Workspace
            </h2>
            <p className="text-sm leading-relaxed text-uv-foreground-muted sm:text-base">
              A production-ready shell for every future Customer, Vendor, Partner,
              Employee, and Admin dashboard — layout and reusable UI only. No
              authentication, database, or business logic yet.
            </p>
          </div>
          <p className="shrink-0 text-xs font-medium uppercase tracking-wide text-uv-foreground-subtle">
            UI foundation preview
          </p>
        </div>
      </section>

      {/* Stats */}
      <section aria-label="Key metrics">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {placeholderStats.map((stat) => (
            <StatsCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              hint={stat.hint}
              trend={stat.trend}
              icon={stat.icon}
            />
          ))}
        </div>
      </section>

      {/* Quick actions */}
      <section className="space-y-4" aria-label="Quick actions">
        <SectionHeader
          title="Quick actions"
          description="Entry points for role-based workspaces. Disabled until each module ships."
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {quickActions.map((action) => (
            <QuickActionCard
              key={action.title}
              title={action.title}
              description={action.description}
              icon={action.icon}
              badge={action.badge}
              disabled={action.disabled}
            />
          ))}
        </div>
      </section>

      {/* Activity + notifications + profile */}
      <section
        className="grid gap-6 lg:grid-cols-3"
        aria-label="Activity, notifications, and profile"
      >
        <Card variant="default" padding="none" className="lg:col-span-1">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Recent activity</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ActivityFeed items={sampleActivity} />
          </CardContent>
        </Card>

        <Card variant="default" padding="none" className="lg:col-span-1">
          <CardHeader className="pb-0">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-base">Notifications</CardTitle>
              <Badge variant="secondary">Placeholder</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <NotificationList items={sampleNotifications} />
          </CardContent>
        </Card>

        <UserProfileCard
          className="lg:col-span-1"
          name="Workspace Guest"
          role="Foundation preview"
          email="guest@uandv.placeholder"
          workspaceLabel="Universal Dashboard"
        />
      </section>
    </div>
  );
}
