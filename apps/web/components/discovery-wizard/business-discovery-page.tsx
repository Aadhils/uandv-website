'use client';

import Link from 'next/link';
import { useCallback, useState, useSyncExternalStore } from 'react';

import { buttonVariants, cn } from '@uandv/ui';

import { DiscoveryWizard } from '@/components/discovery-wizard';
import { SectionHeading } from '@/components/marketing/section-heading';
import {
  clearWizardSession,
  loadWizardSession,
  startWizardSession,
  subscribeWizardSession,
  trackWizardEvent,
  WIZARD_GOALS,
  type WizardGoalId,
  type WizardSession,
} from '@/lib/discovery-wizard';

function readActiveWizardSession(): WizardSession | null {
  const existing = loadWizardSession();
  if (!existing || existing.status === 'abandoned') return null;
  return existing;
}

function useWizardSessionStore() {
  return useSyncExternalStore(
    subscribeWizardSession,
    readActiveWizardSession,
    () => null,
  );
}

export function BusinessDiscoveryPage() {
  const storedSession = useWizardSessionStore();
  const [localSession, setLocalSession] = useState<WizardSession | null>(null);
  const session = localSession ?? storedSession;

  const startGoal = useCallback((goalId: WizardGoalId) => {
    trackWizardEvent('goal_selected', { goal_id: goalId });
    trackWizardEvent('wizard_started', { goal_id: goalId });
    const next = startWizardSession(goalId);
    setLocalSession(next);
  }, []);

  const clearGoal = useCallback(() => {
    clearWizardSession();
    setLocalSession(null);
  }, []);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Business discovery"
        title="Let’s clarify your next move."
        description="Choose a goal to start a short, conversational discovery. Your answers are saved on this device with localStorage so you can continue later."
      />

      {session ? (
        <div className="mt-8 overflow-hidden rounded-uv-2xl bg-[#08152F] p-1 text-white">
          <DiscoveryWizard
            session={session}
            onSessionChange={setLocalSession}
            onChangeGoal={clearGoal}
            onExit={clearGoal}
          />
        </div>
      ) : (
        <div className="mt-8 grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {WIZARD_GOALS.map((goal) => (
            <button
              key={goal.id}
              type="button"
              onClick={() => startGoal(goal.id)}
              className="min-w-0 rounded-uv-2xl border border-uv-border bg-uv-surface p-5 text-left transition-colors uv-focus-ring hover:border-uv-brand/40"
            >
              <span className="block font-[family-name:var(--font-uv-display)] text-lg font-semibold text-uv-foreground">
                {goal.title}
              </span>
              <span className="mt-2 block text-sm leading-relaxed text-uv-muted">
                {goal.description}
              </span>
            </button>
          ))}
        </div>
      )}

      <div className="mt-10">
        <Link
          href="/"
          className={cn(buttonVariants({ variant: 'outline' }), 'uv-focus-ring')}
        >
          Back to homepage
        </Link>
      </div>
    </div>
  );
}
