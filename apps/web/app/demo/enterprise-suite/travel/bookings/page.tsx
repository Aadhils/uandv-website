'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Button, buttonVariants, cn } from '@uandv/ui';
import { DemoCard, DemoPageHeader, DemoTable, StatusBadge } from '@/components/demo/enterprise-suite/ui';
import { demoBookings, formatInr } from '@/lib/demo/enterprise-suite/mock-data';

const filters = ['all','confirmed','pending','cancelled'] as const;

export default function Page() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('all');
  const [rows, setRows] = useState(demoBookings);
  const visible = useMemo(() => (filter === 'all' ? rows : rows.filter((b) => b.bookingStatus === filter)), [filter, rows]);

  const issueVoucher = (id: string) => {
    setRows((prev) => prev.map((b) => (b.id === id ? { ...b, voucher: `VCH-${id.slice(3)}`, bookingStatus: 'confirmed' } : b)));
  };

  return (
    <div className="space-y-8">
      <DemoPageHeader title="Booking Management" description="Passenger bookings, payment status, vouchers, cancellations, and refunds." actions={<Link href="/demo/enterprise-suite/travel/bookings/new" className={cn(buttonVariants({ size: 'sm' }))}>New booking</Link>} />
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => <Button key={f} size="sm" variant={filter === f ? 'primary' : 'outline'} onClick={() => setFilter(f)}>{f}</Button>)}
      </div>
      <DemoCard title="Booking history">
        <DemoTable
          headers={['Booking','Customer','Package','Departure','Pax','Amount','Booking','Payment','Voucher','']}
          rows={visible.map((c) => [
            c.id, c.customer, c.packageName, c.departure, String(c.passengers), formatInr(c.amount),
            <StatusBadge key={c.id+'-b'} status={c.bookingStatus} />,
            <StatusBadge key={c.id+'-p'} status={c.paymentStatus} />,
            c.voucher,
            c.voucher === '—' ? <Button key={c.id+'-v'} size="sm" variant="outline" onClick={() => issueVoucher(c.id)}>Generate voucher</Button> : '—',
          ])}
        />
      </DemoCard>
    </div>
  );
}
