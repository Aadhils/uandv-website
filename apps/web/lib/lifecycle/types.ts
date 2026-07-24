/**
 * Business Timeline & Service Lifecycle Engine — Sprint 3.2.
 * Shared across Admin, Customer, Employee, Vendor with role visibility.
 * Demo / frontend only — reuses Project model from lib/projects.
 */

import type {
  ProjectHealthStatus,
  ProjectLifecycleStage,
  VisibilityScope,
} from '@/lib/projects';

export type WorkspaceRole = 'admin' | 'customer' | 'employee' | 'vendor';

export type TimelineEventKind =
  | 'account'
  | 'enquiry'
  | 'proposal'
  | 'agreement'
  | 'payment'
  | 'project'
  | 'milestone'
  | 'approval'
  | 'document'
  | 'delivery'
  | 'support'
  | 'renewal'
  | 'assignment'
  | 'review';

export type BusinessTimelineEvent = {
  id: string;
  occurredAt: string;
  kind: TimelineEventKind;
  title: string;
  description: string;
  actorName: string;
  actorRole: WorkspaceRole | 'system';
  visibility: VisibilityScope;
  /** Optional link into shared project model */
  projectId: string | null;
  projectTitle: string | null;
  relatedStage: ProjectLifecycleStage | null;
  customerId: string | null;
  /** When set, only this employee sees the event (plus admin). */
  employeeId: string | null;
  /** When set, only this vendor sees the event (plus admin). */
  vendorId: string | null;
};

export type HealthFactor = {
  id: string;
  label: string;
  impact: 'positive' | 'neutral' | 'negative';
  detail: string;
};

export type ProjectHealthSnapshot = {
  projectId: string;
  projectTitle: string;
  status: ProjectHealthStatus;
  score: number;
  completionPercent: number;
  currentStage: ProjectLifecycleStage;
  openRisks: number;
  delayedTasks: number;
  pendingApprovals: number;
  pendingPayments: boolean;
  factors: HealthFactor[];
};

export type DeliveryStageProgress = {
  stage: ProjectLifecycleStage;
  label: string;
  status: 'upcoming' | 'active' | 'completed' | 'skipped';
};

export type ServiceDeliveryProgress = {
  projectId: string;
  projectTitle: string;
  completionPercent: number;
  currentStage: ProjectLifecycleStage;
  currentStageLabel: string;
  stages: DeliveryStageProgress[];
  nextMilestoneTitle: string | null;
  nextMilestoneDue: string | null;
};

export type HappinessDimension = {
  key: string;
  label: string;
  score: number;
};

export type CustomerHappinessScore = {
  customerId: string;
  customerName: string;
  overall: number;
  trend: 'up' | 'stable' | 'down';
  summary: string;
  dimensions: HappinessDimension[];
  drivers: string[];
  disclaimer: string;
};

export type LifecycleNotificationCategory =
  | 'project'
  | 'payment'
  | 'document'
  | 'approval'
  | 'support'
  | 'assignment'
  | 'deadline'
  | 'health';

export type LifecycleNotification = {
  id: string;
  role: WorkspaceRole;
  category: LifecycleNotificationCategory;
  title: string;
  description: string;
  createdAt: string;
  unread: boolean;
  projectId: string | null;
  href: string | null;
  /** Scope filters for employee/vendor personalization */
  employeeId: string | null;
  vendorId: string | null;
  customerId: string | null;
};

export type LifecycleActivityItem = {
  id: string;
  occurredAt: string;
  title: string;
  description: string;
  actorName: string;
  projectId: string | null;
  projectTitle: string | null;
  visibility: VisibilityScope;
  kind: TimelineEventKind;
};

export const ROLE_VISIBILITY: Record<WorkspaceRole, VisibilityScope[]> = {
  admin: ['admin_only', 'internal_team', 'customer_visible', 'vendor_visible'],
  employee: ['internal_team', 'customer_visible', 'vendor_visible'],
  customer: ['customer_visible'],
  vendor: ['vendor_visible'],
};
