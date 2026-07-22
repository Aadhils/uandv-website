'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button, cn } from '@uandv/ui';

import { demoPackages, formatInr } from '@/lib/demo/travel/mock-data';
import { useTravelDemoStore } from '@/lib/demo/travel/store-context';
import type { PackageCategory } from '@/lib/demo/travel/types';

import { DemoCard, DemoPageHeader, Field } from './ui';

const tabs: { id: PackageCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'domestic', label: 'Domestic' },
  { id: 'international', label: 'International' },
  { id: 'honeymoon', label: 'Honeymoon' },
  { id: 'family', label: 'Family' },
  { id: 'adventure', label: 'Adventure' },
  { id: 'pilgrimage', label: 'Pilgrimage' },
];

export function PackageExplorer() {
  const router = useRouter();
  const { startCheckout } = useTravelDemoStore();
  const [tab, setTab] = useState<(typeof tabs)[number]['id']>('all');
  const [selectedId, setSelectedId] = useState(demoPackages[0].id);
  const [travelers, setTravelers] = useState(2);
  const [depart, setDepart] = useState('2026-09-05');

  const list = useMemo(
    () => (tab === 'all' ? demoPackages : demoPackages.filter((p) => p.category === tab)),
    [tab],
  );
  const selected = demoPackages.find((p) => p.id === selectedId) ?? list[0];

  const book = () => {
    if (!selected) return;
    startCheckout({
      category: 'package',
      title: selected.name,
      subtitle: `${selected.nights}N/${selected.days}D · ${selected.destination} · ${travelers} travelers`,
      amount: selected.priceFrom * travelers,
      travelDate: depart,
      travelers,
      details: {
        packageId: selected.id,
        category: selected.category,
      },
    });
    router.push('/demo/travel/checkout');
  };

  return (
    <div className="space-y-6">
      <DemoPageHeader
        title="Package Explorer"
        description="Domestic, international, honeymoon, family, adventure, and pilgrimage tours — Product Demo · Mock Data."
      />

      <div className="flex flex-wrap gap-2">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={cn(
              'rounded-uv-full px-3.5 py-2 text-sm font-medium transition',
              tab === item.id
                ? 'uv-brand-gradient text-white'
                : 'border border-uv-border bg-uv-background text-uv-foreground-muted hover:text-uv-foreground',
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.05fr]">
        <DemoCard title="Packages" description={`${list.length} mock packages in this filter`}>
          <div className="space-y-3">
            {list.map((pkg) => (
              <button
                key={pkg.id}
                type="button"
                onClick={() => setSelectedId(pkg.id)}
                className={cn(
                  'w-full overflow-hidden rounded-uv-xl border text-left transition',
                  selectedId === pkg.id
                    ? 'border-uv-brand'
                    : 'border-uv-border hover:border-uv-brand/40',
                )}
              >
                <div className={cn('h-24 bg-gradient-to-br', pkg.imageTone)} />
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-uv-foreground">{pkg.name}</p>
                      <p className="mt-1 text-sm text-uv-foreground-muted">
                        {pkg.destination} · {pkg.nights}N/{pkg.days}D · ★ {pkg.rating}
                      </p>
                    </div>
                    <p className="font-bold text-uv-brand">from {formatInr(pkg.priceFrom)}</p>
                  </div>
                  <p className="mt-2 text-xs capitalize text-uv-foreground-muted">{pkg.category}</p>
                </div>
              </button>
            ))}
          </div>
        </DemoCard>

        {selected ? (
          <DemoCard title={selected.name} description="Itinerary, inclusions, and mock booking">
            <div className="space-y-5">
              <div className="flex flex-wrap gap-2">
                {selected.highlights.map((h) => (
                  <span
                    key={h}
                    className="rounded-uv-full bg-uv-brand-muted px-2.5 py-1 text-xs font-medium text-uv-brand"
                  >
                    {h}
                  </span>
                ))}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="mb-2 text-sm font-semibold">Inclusions</p>
                  <ul className="space-y-1 text-sm text-uv-foreground-muted">
                    {selected.inclusions.map((i) => (
                      <li key={i}>• {i}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-2 text-sm font-semibold">Exclusions</p>
                  <ul className="space-y-1 text-sm text-uv-foreground-muted">
                    {selected.exclusions.map((i) => (
                      <li key={i}>• {i}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold">Day-wise itinerary</p>
                <div className="space-y-2">
                  {selected.itinerary.map((day) => (
                    <div key={day.day} className="rounded-uv-lg border border-uv-border p-3">
                      <p className="text-sm font-medium text-uv-foreground">
                        Day {day.day} · {day.title}
                      </p>
                      <p className="mt-1 text-sm text-uv-foreground-muted">{day.summary}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Departure date">
                  <input
                    type="date"
                    className="h-11 w-full rounded-uv-lg border border-uv-border bg-uv-background px-3 text-sm"
                    value={depart}
                    onChange={(e) => setDepart(e.target.value)}
                  />
                </Field>
                <Field label="Travelers">
                  <input
                    type="number"
                    min={1}
                    max={12}
                    className="h-11 w-full rounded-uv-lg border border-uv-border bg-uv-background px-3 text-sm"
                    value={travelers}
                    onChange={(e) => setTravelers(Number(e.target.value) || 1)}
                  />
                </Field>
              </div>

              <div className="flex items-center justify-between gap-3 rounded-uv-xl bg-uv-background-subtle p-4">
                <div>
                  <p className="text-sm text-uv-foreground-muted">Estimated total (mock)</p>
                  <p className="font-[family-name:var(--font-uv-display)] text-2xl font-bold text-uv-brand">
                    {formatInr(selected.priceFrom * travelers)}
                  </p>
                </div>
                <Button type="button" onClick={book}>
                  Book package
                </Button>
              </div>
            </div>
          </DemoCard>
        ) : null}
      </div>
    </div>
  );
}
