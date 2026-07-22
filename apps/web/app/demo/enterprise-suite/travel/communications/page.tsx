'use client';
import { useState, type FormEvent } from 'react';
import { Button, Input } from '@uandv/ui';
import { DemoCard, DemoPageHeader, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoTravelComms } from '@/lib/demo/enterprise-suite/mock-data';

export default function Page() {
  const [items, setItems] = useState(demoTravelComms);
  const [body, setBody] = useState('WhatsApp reminder: documents due in 48 hours.');
  const [to, setTo] = useState('Harbor Family Demo');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setItems((prev) => [{
      id: `TC-${prev.length + 10}`,
      type: 'travel-reminder',
      channel: 'whatsapp',
      to,
      body,
      date: '2026-07-22',
    }, ...prev]);
  };

  return (
    <div className="space-y-8">
      <DemoPageHeader title="Customer Communication" description="Enquiry follow-up, quotes, confirmations, reminders, WhatsApp placeholder, and email timeline." />
      <DemoCard title="Compose WhatsApp / email placeholder">
        <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-[1fr_2fr_auto]">
          <Input value={to} onChange={(e) => setTo(e.target.value)} placeholder="To" />
          <Input value={body} onChange={(e) => setBody(e.target.value)} placeholder="Message" />
          <Button type="submit">Send (mock)</Button>
        </form>
      </DemoCard>
      <DemoCard title="Communication timeline">
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.id} className="rounded-uv-xl border border-uv-border px-4 py-4">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={item.type} />
                <StatusBadge status={item.channel} />
                <span className="text-xs text-uv-foreground-muted">{item.date}</span>
              </div>
              <p className="mt-2 font-medium">{item.to}</p>
              <p className="mt-1 text-sm text-uv-foreground-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </DemoCard>
    </div>
  );
}
