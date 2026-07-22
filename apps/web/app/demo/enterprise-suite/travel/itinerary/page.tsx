'use client';
import { useState } from 'react';
import { Button, Input } from '@uandv/ui';
import { DemoCard, DemoPageHeader } from '@/components/demo/enterprise-suite/ui';
import { demoItineraryDays } from '@/lib/demo/enterprise-suite/mock-data';

export default function Page() {
  const [days, setDays] = useState(demoItineraryDays);
  const [preview, setPreview] = useState(false);

  return (
    <div className="space-y-8">
      <DemoPageHeader
        title="Itinerary Builder"
        description="Day-wise hotels, transport, activities, meal plans, and notes."
        actions={<Button type="button" variant="outline" onClick={() => setPreview((v) => !v)}>{preview ? 'Edit mode' : 'Preview itinerary'}</Button>}
      />
      {preview ? (
        <DemoCard title="Downloadable itinerary preview" description="Print-ready mock preview (browser print).">
          <div className="space-y-4 print:block">
            <h2 className="text-xl font-bold">Kerala Backwaters Escape — 5 Days</h2>
            {days.map((d) => (
              <div key={d.day} className="rounded-uv-xl border border-uv-border p-4">
                <p className="font-semibold">Day {d.day}: {d.title}</p>
                <p className="mt-2 text-sm text-uv-foreground-muted">Hotel: {d.hotel}</p>
                <p className="text-sm text-uv-foreground-muted">Transport: {d.transport}</p>
                <p className="text-sm text-uv-foreground-muted">Activities: {d.activities}</p>
                <p className="text-sm text-uv-foreground-muted">Meals: {d.meals}</p>
                <p className="text-sm text-uv-foreground-muted">Notes: {d.notes}</p>
              </div>
            ))}
            <Button type="button" onClick={() => window.print()}>Print / Save PDF</Button>
          </div>
        </DemoCard>
      ) : (
        <div className="space-y-4">
          {days.map((d, index) => (
            <DemoCard key={d.day} title={`Day ${d.day}`}>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="text-sm font-medium">Title<Input className="mt-2" value={d.title} onChange={(e) => setDays((prev) => prev.map((row, i) => i === index ? { ...row, title: e.target.value } : row))} /></label>
                <label className="text-sm font-medium">Hotel<Input className="mt-2" value={d.hotel} onChange={(e) => setDays((prev) => prev.map((row, i) => i === index ? { ...row, hotel: e.target.value } : row))} /></label>
                <label className="text-sm font-medium">Transport<Input className="mt-2" value={d.transport} onChange={(e) => setDays((prev) => prev.map((row, i) => i === index ? { ...row, transport: e.target.value } : row))} /></label>
                <label className="text-sm font-medium">Activities<Input className="mt-2" value={d.activities} onChange={(e) => setDays((prev) => prev.map((row, i) => i === index ? { ...row, activities: e.target.value } : row))} /></label>
                <label className="text-sm font-medium">Meal plans<Input className="mt-2" value={d.meals} onChange={(e) => setDays((prev) => prev.map((row, i) => i === index ? { ...row, meals: e.target.value } : row))} /></label>
                <label className="text-sm font-medium">Notes<Input className="mt-2" value={d.notes} onChange={(e) => setDays((prev) => prev.map((row, i) => i === index ? { ...row, notes: e.target.value } : row))} /></label>
              </div>
            </DemoCard>
          ))}
        </div>
      )}
    </div>
  );
}
