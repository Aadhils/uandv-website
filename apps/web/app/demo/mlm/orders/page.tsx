'use client';

import { useMemo, useState } from 'react';

import { Button } from '@uandv/ui';

import {
  DemoCard,
  DemoPageHeader,
  DemoTable,
  StatusBadge,
} from '@/components/demo/mlm/ui';
import { demoOrders, formatInr } from '@/lib/demo/mlm/mock-data';
import type { OrderItem } from '@/lib/demo/mlm/types';

export default function MlmOrdersPage() {
  const [filter, setFilter] = useState<'all' | 'active' | 'delivered' | 'cancelled'>('all');

  const rows = useMemo(() => {
    return (demoOrders as OrderItem[]).filter((order) => {
      if (filter === 'all') return true;
      if (filter === 'delivered') return order.status === 'delivered';
      if (filter === 'cancelled') return order.status === 'cancelled';
      return (
        order.status === 'placed' ||
        order.status === 'packed' ||
        order.status === 'shipped'
      );
    });
  }, [filter]);

  return (
    <div className="space-y-8">
      <DemoPageHeader
        title="Orders"
        description="Track product orders, fulfillment status, and BV-linked purchases."
      />

      <DemoCard
        title="Order history"
        description="Filter by lifecycle stage."
        action={
          <div className="flex flex-wrap gap-2">
            {(['all', 'active', 'delivered', 'cancelled'] as const).map((item) => (
              <Button
                key={item}
                type="button"
                size="sm"
                variant={filter === item ? 'primary' : 'outline'}
                onClick={() => setFilter(item)}
              >
                {item}
              </Button>
            ))}
          </div>
        }
      >
        <DemoTable
          headers={['Order', 'Date', 'Product', 'Qty', 'Total', 'Status']}
          rows={rows.map((order) => [
            order.id,
            order.date,
            order.product,
            String(order.qty),
            formatInr(order.total),
            <StatusBadge key={`${order.id}-status`} status={order.status} />,
          ])}
        />
      </DemoCard>
    </div>
  );
}
