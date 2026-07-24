/**
 * Lifecycle engine — derives health, progress, timeline, and activity
 * from the shared project model + lifetime business events.
 */

import {
  LIFECYCLE_STAGE_LABELS,
  PROJECT_DEMO_TODAY,
  demoProjectApprovals,
  demoProjectRisks,
  demoProjectTasks,
  demoProjects,
  getActivitiesForProject,
  getMilestonesForProject,
  getNextMilestone,
  getPaymentsForProject,
  getProjectById,
  getStagesForProject,
  type Project,
  type VisibilityScope,
} from '@/lib/projects';

import type {
  BusinessTimelineEvent,
  CustomerHappinessScore,
  LifecycleActivityItem,
  LifecycleNotification,
  ProjectHealthSnapshot,
  ServiceDeliveryProgress,
  WorkspaceRole,
} from './types';
import { ROLE_VISIBILITY } from './types';
import {
  demoBusinessTimelineEvents,
  demoCustomerHappiness,
  demoLifecycleNotifications,
} from './demo-data';

export function visibilityForRole(role: WorkspaceRole): VisibilityScope[] {
  return ROLE_VISIBILITY[role];
}

export function filterTimelineForRole(
  events: BusinessTimelineEvent[],
  role: WorkspaceRole,
  opts?: {
    customerId?: string;
    employeeId?: string;
    vendorId?: string;
  },
): BusinessTimelineEvent[] {
  const scopes = visibilityForRole(role);
  return events
    .filter((event) => {
      if (!scopes.includes(event.visibility)) return false;
      if (role === 'admin') return true;
      if (role === 'customer') {
        if (opts?.customerId && event.customerId && event.customerId !== opts.customerId) {
          return false;
        }
        return true;
      }
      if (role === 'employee') {
        if (event.employeeId && opts?.employeeId && event.employeeId !== opts.employeeId) {
          return false;
        }
        return true;
      }
      if (role === 'vendor') {
        if (event.vendorId && opts?.vendorId && event.vendorId !== opts.vendorId) {
          return false;
        }
        // Vendors also see vendor_visible project events for their assignments
        if (event.vendorId == null && opts?.vendorId) {
          // Allow general vendor_visible events without vendor lock, or project-linked
          return true;
        }
        return event.vendorId === opts?.vendorId || event.vendorId == null;
      }
      return false;
    })
    .sort((a, b) => b.occurredAt.localeCompare(a.occurredAt));
}

/** Merge lifetime business events + project activities into one timeline. */
export function buildLifetimeTimeline(): BusinessTimelineEvent[] {
  const fromLifetime = demoBusinessTimelineEvents;
  const fromProjects: BusinessTimelineEvent[] = demoProjects.flatMap(
    (project) =>
      getActivitiesForProject(project.id).map((activity) => ({
        id: `tl-${activity.id}`,
        occurredAt: activity.occurredAt,
        kind: mapActivityKind(activity.eventType),
        title: activity.title,
        description: activity.description,
        actorName: activity.actorName,
        actorRole: mapActorRole(activity.actorRole),
        visibility: activity.visibility,
        projectId: project.id,
        projectTitle: project.title,
        relatedStage: activity.relatedStage,
        customerId: project.customerId,
        employeeId: null,
        vendorId: null,
      })),
  );

  const merged = [...fromLifetime, ...fromProjects];
  const seen = new Set<string>();
  return merged
    .filter((event) => {
      if (seen.has(event.id)) return false;
      seen.add(event.id);
      return true;
    })
    .sort((a, b) => b.occurredAt.localeCompare(a.occurredAt));
}

function mapActivityKind(
  eventType: string,
): BusinessTimelineEvent['kind'] {
  if (eventType.includes('payment')) return 'payment';
  if (eventType.includes('approval')) return 'approval';
  if (eventType.includes('document')) return 'document';
  if (eventType.includes('milestone')) return 'milestone';
  if (eventType.includes('assign')) return 'assignment';
  if (eventType.includes('support')) return 'support';
  if (eventType.includes('deploy') || eventType.includes('handover'))
    return 'delivery';
  if (eventType.includes('review')) return 'review';
  return 'project';
}

function mapActorRole(
  role: string,
): BusinessTimelineEvent['actorRole'] {
  if (role === 'admin' || role === 'customer' || role === 'employee' || role === 'vendor') {
    return role;
  }
  return 'system';
}

export function computeProjectHealth(project: Project): ProjectHealthSnapshot {
  const tasks = demoProjectTasks.filter((t) => t.projectId === project.id);
  const delayedTasks = tasks.filter(
    (t) => t.status !== 'completed' && t.dueDate < PROJECT_DEMO_TODAY,
  ).length;
  const openRisks = demoProjectRisks.filter(
    (r) =>
      r.projectId === project.id &&
      r.status !== 'resolved' &&
      r.status !== 'accepted',
  ).length;
  const pendingApprovals = demoProjectApprovals.filter(
    (a) => a.projectId === project.id && a.status === 'pending',
  ).length;
  const payments = getPaymentsForProject(project.id);
  const pendingPayments = Boolean(payments && payments.pendingAmountInr > 0);

  let score = 100;
  score -= delayedTasks * 8;
  score -= openRisks * 10;
  score -= pendingApprovals * 4;
  if (pendingPayments) score -= 6;
  if (project.health === 'delayed') score -= 15;
  if (project.health === 'at_risk') score -= 10;
  if (project.health === 'blocked') score -= 20;
  score = Math.max(0, Math.min(100, score));

  const factors = [
    {
      id: 'completion',
      label: 'Delivery progress',
      impact:
        project.completionPercent >= 50
          ? ('positive' as const)
          : ('neutral' as const),
      detail: `${project.completionPercent}% complete`,
    },
    {
      id: 'tasks',
      label: 'Task schedule',
      impact: delayedTasks > 0 ? ('negative' as const) : ('positive' as const),
      detail:
        delayedTasks > 0
          ? `${delayedTasks} delayed task(s)`
          : 'No delayed tasks',
    },
    {
      id: 'risks',
      label: 'Open risks',
      impact: openRisks > 0 ? ('negative' as const) : ('positive' as const),
      detail: openRisks > 0 ? `${openRisks} open risk(s)` : 'No open risks',
    },
    {
      id: 'approvals',
      label: 'Approvals',
      impact:
        pendingApprovals > 0 ? ('neutral' as const) : ('positive' as const),
      detail:
        pendingApprovals > 0
          ? `${pendingApprovals} pending`
          : 'No pending approvals',
    },
    {
      id: 'payments',
      label: 'Payments',
      impact: pendingPayments ? ('neutral' as const) : ('positive' as const),
      detail: pendingPayments ? 'Pending milestone amount' : 'On track',
    },
  ];

  return {
    projectId: project.id,
    projectTitle: project.title,
    status: project.health,
    score,
    completionPercent: project.completionPercent,
    currentStage: project.currentStage,
    openRisks,
    delayedTasks,
    pendingApprovals,
    pendingPayments,
    factors,
  };
}

export function getAllProjectHealth(): ProjectHealthSnapshot[] {
  return demoProjects.map(computeProjectHealth);
}

export function getProjectHealthById(
  projectId: string,
): ProjectHealthSnapshot | undefined {
  const project = getProjectById(projectId);
  return project ? computeProjectHealth(project) : undefined;
}

export function getServiceDeliveryProgress(
  projectId: string,
): ServiceDeliveryProgress | undefined {
  const project = getProjectById(projectId);
  if (!project) return undefined;
  const stages = getStagesForProject(projectId).map((s) => ({
    stage: s.stage,
    label: LIFECYCLE_STAGE_LABELS[s.stage],
    status: s.status,
  }));
  // Ensure stage path coverage even if stage rows incomplete
  const pathStages =
    stages.length > 0
      ? stages
      : project.stagePath.map((stage, index) => {
          const currentIdx = project.stagePath.indexOf(project.currentStage);
          let status: DeliveryStageProgressStatus = 'upcoming';
          if (index < currentIdx) status = 'completed';
          else if (index === currentIdx) status = 'active';
          return {
            stage,
            label: LIFECYCLE_STAGE_LABELS[stage],
            status,
          };
        });
  const next = getNextMilestone(projectId);
  return {
    projectId: project.id,
    projectTitle: project.title,
    completionPercent: project.completionPercent,
    currentStage: project.currentStage,
    currentStageLabel: LIFECYCLE_STAGE_LABELS[project.currentStage],
    stages: pathStages,
    nextMilestoneTitle: next?.title ?? null,
    nextMilestoneDue: next?.dueDate ?? null,
  };
}

type DeliveryStageProgressStatus = ServiceDeliveryProgress['stages'][number]['status'];

export function getActivityFeedForRole(
  role: WorkspaceRole,
  opts?: {
    customerId?: string;
    employeeId?: string;
    vendorId?: string;
    limit?: number;
  },
): LifecycleActivityItem[] {
  const events = filterTimelineForRole(buildLifetimeTimeline(), role, opts);
  const limit = opts?.limit ?? 12;
  return events.slice(0, limit).map((event) => ({
    id: event.id,
    occurredAt: event.occurredAt,
    title: event.title,
    description: event.description,
    actorName: event.actorName,
    projectId: event.projectId,
    projectTitle: event.projectTitle,
    visibility: event.visibility,
    kind: event.kind,
  }));
}

export function getNotificationsForRole(
  role: WorkspaceRole,
  opts?: {
    customerId?: string;
    employeeId?: string;
    vendorId?: string;
  },
): LifecycleNotification[] {
  return demoLifecycleNotifications
    .filter((n) => {
      if (n.role !== role) return false;
      if (role === 'customer' && opts?.customerId) {
        return !n.customerId || n.customerId === opts.customerId;
      }
      if (role === 'employee' && opts?.employeeId) {
        return !n.employeeId || n.employeeId === opts.employeeId;
      }
      if (role === 'vendor' && opts?.vendorId) {
        return !n.vendorId || n.vendorId === opts.vendorId;
      }
      return true;
    })
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getCustomerHappiness(
  customerId: string = 'cus-001',
): CustomerHappinessScore {
  return (
    demoCustomerHappiness.find((h) => h.customerId === customerId) ??
    demoCustomerHappiness[0]
  );
}

export function getMilestonesVisible(
  projectId: string,
  role: WorkspaceRole,
) {
  const milestones = getMilestonesForProject(projectId);
  if (role === 'customer') {
    return milestones.filter((m) => m.customerVisible);
  }
  return milestones;
}

export function formatLifecycleDate(isoDate: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(isoDate.includes('T') ? isoDate : `${isoDate}T12:00:00`));
}

export function formatLifecycleDateTime(iso: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(iso));
}
