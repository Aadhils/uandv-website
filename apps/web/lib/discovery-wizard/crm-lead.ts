import type { Lead } from '@/lib/crm';
import {
  buildPriorityFromTimeline,
  pickDemoEmployee,
  saveRuntimeLead,
} from '@/lib/crm/runtime-leads';

import { getWizardGoalTitle } from './flows';
import { buildWizardSummary } from './summary';
import { trackWizardEvent } from './analytics';
import type { WizardAnswers, WizardGoalId } from './types';

/**
 * Creates a demo CRM Lead after wizard completion and stores it in localStorage.
 * Does not call a backend.
 */
export function createCrmLeadFromWizard(
  goalId: WizardGoalId,
  answers: WizardAnswers,
): Lead {
  const summary = buildWizardSummary(goalId, answers);
  const employee = pickDemoEmployee(goalId);
  const timeline =
    typeof answers.launch_timeline === 'string'
      ? answers.launch_timeline
      : undefined;
  const priority = buildPriorityFromTimeline(timeline);
  const followUp = new Date();
  followUp.setDate(followUp.getDate() + (priority === 'urgent' ? 1 : 2));

  const lead: Lead = {
    id: `LEAD-DISC-${Date.now().toString(36).toUpperCase()}`,
    name: 'Discovery Visitor',
    company:
      typeof answers.business_idea === 'string' && answers.business_idea.trim()
        ? answers.business_idea.trim().slice(0, 48)
        : summary.businessProfile.slice(0, 48) || 'Discovery lead',
    phone: '+91 90000 00000',
    email: 'discovery.visitor@demo.uandv.local',
    interestedService: summary.selectedServices[0] ?? getWizardGoalTitle(goalId),
    source: 'website',
    status: 'new',
    isHot: priority === 'urgent' || priority === 'high',
    assignedEmployee: employee.name,
    ownerEmployeeId: employee.id,
    ownerUserId: employee.userId,
    department: employee.department,
    priority,
    nextFollowUp: followUp.toISOString().slice(0, 10),
    lastContact: null,
    reminderLabel: 'Discovery wizard completed — first outreach',
    activityScore: priority === 'urgent' ? 92 : priority === 'high' ? 80 : 68,
    conversionProbability:
      priority === 'urgent' ? 74 : priority === 'high' ? 61 : 48,
  };

  saveRuntimeLead(lead);
  trackWizardEvent('demo_lead_submitted', {
    goal_id: goalId,
    lead_id: lead.id,
    auto_created: true,
  });

  return lead;
}
