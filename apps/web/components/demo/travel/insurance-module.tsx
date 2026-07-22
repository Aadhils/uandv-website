'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button, Input, cn } from '@uandv/ui';

import { formatInr, insurancePlans } from '@/lib/demo/travel/mock-data';
import { useTravelDemoStore } from '@/lib/demo/travel/store-context';

import { DemoCard, DemoPageHeader, Field } from './ui';

export function InsuranceModule() {
  const router = useRouter();
  const { startCheckout } = useTravelDemoStore();
  const [planId, setPlanId] = useState(insurancePlans[0].id);
  const [start, setStart] = useState('2026-08-12');
  const [travelers, setTravelers] = useState(1);

  const plan = insurancePlans.find((p) => p.id === planId)!;

  const buy = () => {
    startCheckout({
      category: 'insurance',
      title: plan.name,
      subtitle: `${travelers} traveler(s) · ${plan.cover}`,
      amount: plan.price * travelers,
      travelDate: start,
      travelers,
      details: { planId: plan.id },
    });
    router.push('/demo/travel/checkout');
  };

  return (
    <div className="space-y-6">
      <DemoPageHeader
        title="Travel Insurance"
        description="Choose a mock cover plan and continue to checkout — Product Demo · Mock Data."
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {insurancePlans.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setPlanId(item.id)}
            className={cn(
              'rounded-uv-2xl border p-5 text-left transition',
              planId === item.id
                ? 'border-uv-brand bg-uv-brand-muted/30'
                : 'border-uv-border bg-uv-background hover:border-uv-brand/40',
            )}
          >
            <p className="font-semibold text-uv-foreground">{item.name}</p>
            <p className="mt-2 text-sm text-uv-foreground-muted">{item.cover}</p>
            <p className="mt-4 text-xl font-bold text-uv-brand">{formatInr(item.price)}</p>
          </button>
        ))}
      </div>
      <DemoCard title="Policy details">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Cover start">
            <Input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
          </Field>
          <Field label="Travelers">
            <Input
              type="number"
              min={1}
              max={8}
              value={travelers}
              onChange={(e) => setTravelers(Number(e.target.value) || 1)}
            />
          </Field>
        </div>
        <p className="mt-4 text-sm text-uv-foreground-muted">
          Total premium (mock) · {formatInr(plan.price * travelers)}
        </p>
        <Button type="button" className="mt-4" onClick={buy}>
          Buy plan
        </Button>
      </DemoCard>
    </div>
  );
}
