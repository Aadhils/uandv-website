'use client';
import { useState, type FormEvent } from 'react';
import { Button, Input } from '@uandv/ui';
import { DemoCard, DemoPageHeader, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoPackages, formatInr } from '@/lib/demo/enterprise-suite/mock-data';

type Pkg = (typeof demoPackages)[number];

export default function Page() {
  const [packages, setPackages] = useState<Pkg[]>(demoPackages);
  const [name, setName] = useState('Andaman Coastal Break');
  const [category, setCategory] = useState('domestic');
  const [price, setPrice] = useState('35999');
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: Pkg = {
      id: `PKG-NEW-${packages.length + 1}`,
      name,
      category,
      days: 4,
      price: Number(price) || 0,
      seats: 16,
      availability: 'available',
      departures: ['2026-10-01'],
      inclusions: ['Hotel', 'Breakfast', 'Transfers'],
      exclusions: ['Flights'],
      itinerary: ['Arrival', 'Island hop', 'Beach day', 'Departure'],
    };
    setPackages((prev) => [next, ...prev]);
    setMessage(`Created ${next.name} at ${formatInr(next.price)} (frontend mock state only).`);
  };

  return (
    <div className="space-y-8">
      <DemoPageHeader title="Create Package" description="Add a package to local demo state — no backend." />
      {message ? <p className="rounded-uv-xl border border-uv-brand/30 bg-uv-brand-muted px-4 py-3 text-sm text-uv-brand">{message}</p> : null}
      <DemoCard title="Package form">
        <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium">Name<Input className="mt-2" value={name} onChange={(e) => setName(e.target.value)} required /></label>
          <label className="text-sm font-medium">Category<Input className="mt-2" value={category} onChange={(e) => setCategory(e.target.value)} required /></label>
          <label className="text-sm font-medium">Price (INR)<Input className="mt-2" value={price} onChange={(e) => setPrice(e.target.value)} required /></label>
          <div className="flex items-end"><Button type="submit">Save package</Button></div>
        </form>
      </DemoCard>
      <DemoCard title="Current package list (session state)">
        <ul className="space-y-2">
          {packages.slice(0, 8).map((p) => (
            <li key={p.id} className="flex items-center justify-between rounded-uv-lg border border-uv-border px-3 py-3 text-sm">
              <span>{p.name}</span>
              <StatusBadge status={p.category} />
            </li>
          ))}
        </ul>
      </DemoCard>
    </div>
  );
}
