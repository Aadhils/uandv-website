'use client';

import { useState } from 'react';

import { Button } from '@uandv/ui';

import { DemoCard, DemoPageHeader, DemoTable } from '@/components/demo/mlm/ui';
import { demoProducts, formatInr } from '@/lib/demo/mlm/mock-data';

export default function MlmProductsPage() {
  const [cartNote, setCartNote] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <DemoPageHeader
        title="Products"
        description="Catalog of starter, growth, and reorder packages with BV values."
      />

      {cartNote ? (
        <p className="rounded-uv-xl border border-uv-brand/30 bg-uv-brand-muted px-4 py-3 text-sm text-uv-brand">
          {cartNote}
        </p>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {demoProducts.map((product) => (
          <DemoCard key={product.id} title={product.name} description={product.category}>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-uv-foreground-muted">SKU</dt>
                <dd className="font-medium text-uv-foreground">{product.sku}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-uv-foreground-muted">Price</dt>
                <dd className="font-medium text-uv-foreground">{formatInr(product.price)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-uv-foreground-muted">BV</dt>
                <dd className="font-medium text-uv-brand">{product.bv}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-uv-foreground-muted">Stock</dt>
                <dd className="font-medium text-uv-foreground">{product.stock}</dd>
              </div>
            </dl>
            <Button
              type="button"
              className="mt-4 w-full"
              variant={selected === product.id ? 'primary' : 'outline'}
              onClick={() => {
                setSelected(product.id);
                setCartNote(`${product.name} added to demo cart.`);
              }}
            >
              {selected === product.id ? 'In cart' : 'Add to cart'}
            </Button>
          </DemoCard>
        ))}
      </div>

      <DemoCard title="Catalog table">
        <DemoTable
          headers={['Product', 'SKU', 'Category', 'Price', 'BV', 'Stock']}
          rows={demoProducts.map((product) => [
            product.name,
            product.sku,
            product.category,
            formatInr(product.price),
            String(product.bv),
            String(product.stock),
          ])}
        />
      </DemoCard>
    </div>
  );
}
