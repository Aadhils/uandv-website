'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import { Button, Input, buttonVariants, cn } from '@uandv/ui';

import {
  cuisineCategories,
  demoAddresses,
  demoCoupons,
  demoMenu,
  demoRestaurants,
  demoReviews,
  formatInr,
  getMenuForRestaurant,
  getRestaurant,
} from '@/lib/demo/restaurant/mock-data';
import { useRestaurantDemoStore } from '@/lib/demo/restaurant/store-context';
import type { DietType, MenuItem, PaymentMethod } from '@/lib/demo/restaurant/types';

import {
  DemoCard,
  DemoPageHeader,
  DemoStatCard,
  DietPill,
  EmptyHint,
  Field,
  StatusBadge,
} from './ui';

export function CustomerHome() {
  const [query, setQuery] = useState('');
  const [cuisine, setCuisine] = useState('All');
  const [vegOnly, setVegOnly] = useState(false);

  const list = useMemo(() => {
    return demoRestaurants.filter((r) => {
      const q = query.trim().toLowerCase();
      const matchQ =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.cuisine.some((c) => c.toLowerCase().includes(q)) ||
        r.area.toLowerCase().includes(q);
      const matchC = cuisine === 'All' || r.cuisine.includes(cuisine);
      const matchV = !vegOnly || r.vegOnly;
      return matchQ && matchC && matchV;
    });
  }, [query, cuisine, vegOnly]);

  return (
    <div className="space-y-6">
      <DemoPageHeader
        title="Customer App"
        description="Browse mock restaurants, filter by cuisine, and start an interactive order — Product Demo · Mock Data."
        actions={
          <Link href="/demo/restaurant-platform/customer/cart" className={cn(buttonVariants({ size: 'sm' }))}>
            Open cart
          </Link>
        }
      />

      <DemoCard title="Search & filters">
        <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
          <Input
            placeholder="Search restaurants, cuisines, areas…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setVegOnly((v) => !v)}
            className={cn(
              'h-11 rounded-uv-lg border px-4 text-sm font-semibold',
              vegOnly
                ? 'border-emerald-600 bg-emerald-500/10 text-emerald-700'
                : 'border-uv-border text-uv-foreground-muted',
            )}
          >
            Veg only
          </button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {cuisineCategories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCuisine(c)}
              className={cn(
                'rounded-uv-full px-3 py-1.5 text-xs font-semibold',
                cuisine === c
                  ? 'uv-brand-gradient text-white'
                  : 'border border-uv-border text-uv-foreground-muted',
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </DemoCard>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((r) => (
          <Link
            key={r.id}
            href={`/demo/restaurant-platform/customer/restaurant/${r.id}`}
            className="overflow-hidden rounded-uv-2xl border border-uv-border bg-uv-background transition hover:border-uv-brand/40"
          >
            <div className={cn('h-28 bg-gradient-to-br', r.imageTone)} />
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-uv-foreground">{r.name}</p>
                  <p className="mt-1 text-sm text-uv-foreground-muted">
                    {r.cuisine.join(' · ')}
                  </p>
                </div>
                <span className="rounded-uv-lg bg-uv-brand-muted px-2 py-1 text-xs font-bold text-uv-brand">
                  ★ {r.rating}
                </span>
              </div>
              <p className="mt-3 text-xs text-uv-foreground-muted">
                {r.etaMins} mins · {formatInr(r.costForTwo)} for two · {r.area}
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {r.offers.map((o) => (
                  <span
                    key={o}
                    className="rounded-uv-full bg-uv-background-subtle px-2 py-0.5 text-[10px] font-medium text-uv-brand"
                  >
                    {o}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function CustomizeModal({
  item,
  onClose,
  onAdd,
}: {
  item: MenuItem;
  onClose: () => void;
  onAdd: (payload: {
    addOnIds: string[];
    customization: Record<string, string>;
    notes: string;
  }) => void;
}) {
  const [addOnIds, setAddOnIds] = useState<string[]>([]);
  const [customization, setCustomization] = useState<Record<string, string>>(() =>
    Object.fromEntries(item.customizations.map((c) => [c.id, c.options[0]])),
  );
  const [notes, setNotes] = useState('');

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-uv-2xl border border-uv-border bg-uv-background p-5 shadow-uv-lg">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-semibold text-uv-foreground">{item.name}</p>
            <p className="mt-1 text-sm text-uv-foreground-muted">{item.description}</p>
          </div>
          <button type="button" onClick={onClose} className="text-sm text-uv-foreground-muted">
            Close
          </button>
        </div>
        {item.customizations.map((c) => (
          <div key={c.id} className="mt-4">
            <p className="text-sm font-medium">{c.name}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {c.options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setCustomization((prev) => ({ ...prev, [c.id]: opt }))}
                  className={cn(
                    'rounded-uv-full px-3 py-1.5 text-xs font-semibold',
                    customization[c.id] === opt
                      ? 'uv-brand-gradient text-white'
                      : 'border border-uv-border',
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
        {item.addOns.length ? (
          <div className="mt-4">
            <p className="text-sm font-medium">Add-ons</p>
            <div className="mt-2 space-y-2">
              {item.addOns.map((a) => (
                <label key={a.id} className="flex items-center justify-between gap-3 text-sm">
                  <span className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={addOnIds.includes(a.id)}
                      onChange={(e) =>
                        setAddOnIds((prev) =>
                          e.target.checked
                            ? [...prev, a.id]
                            : prev.filter((id) => id !== a.id),
                        )
                      }
                    />
                    {a.name}
                  </span>
                  <span>{formatInr(a.price)}</span>
                </label>
              ))}
            </div>
          </div>
        ) : null}
        <Field label="Kitchen notes">
          <Input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Optional" />
        </Field>
        <Button
          type="button"
          className="mt-5 w-full"
          onClick={() => onAdd({ addOnIds, customization, notes })}
        >
          Add to cart · {formatInr(item.price)}
        </Button>
      </div>
    </div>
  );
}

export function RestaurantDetailPage() {
  const params = useParams<{ id: string }>();
  const { addToCart, menuAvailability } = useRestaurantDemoStore();
  const restaurant = getRestaurant(params.id);
  const [diet, setDiet] = useState<'all' | DietType>('all');
  const [category, setCategory] = useState('All');
  const [customize, setCustomize] = useState<MenuItem | null>(null);

  const menu = useMemo(() => {
    if (!restaurant) return [];
    return getMenuForRestaurant(restaurant.id).filter((m) => {
      const avail = menuAvailability[m.id] !== false;
      const dietOk = diet === 'all' || m.diet === diet;
      const catOk = category === 'All' || m.category === category;
      return avail && dietOk && catOk;
    });
  }, [restaurant, diet, category, menuAvailability]);

  const categories = useMemo(() => {
    if (!restaurant) return ['All'];
    return ['All', ...Array.from(new Set(getMenuForRestaurant(restaurant.id).map((m) => m.category)))];
  }, [restaurant]);

  const reviews = demoReviews.filter((r) => r.restaurantId === params.id);

  if (!restaurant) {
    return <EmptyHint>Restaurant not found in mock catalog.</EmptyHint>;
  }

  return (
    <div className="space-y-6">
      <DemoPageHeader
        title={restaurant.name}
        description={`${restaurant.cuisine.join(' · ')} · ★ ${restaurant.rating} (${restaurant.reviews} demo reviews) · ${restaurant.area}`}
      />

      <div className="flex flex-wrap gap-2">
        {(['all', 'veg', 'nonveg'] as const).map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => setDiet(d)}
            className={cn(
              'rounded-uv-full px-3 py-1.5 text-xs font-semibold capitalize',
              diet === d ? 'uv-brand-gradient text-white' : 'border border-uv-border',
            )}
          >
            {d === 'all' ? 'All' : d === 'veg' ? 'Veg' : 'Non-veg'}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={cn(
              'rounded-uv-lg px-3 py-2 text-sm font-medium',
              category === c ? 'bg-uv-brand-muted text-uv-brand' : 'text-uv-foreground-muted',
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-3">
        {menu.map((item) => (
          <article
            key={item.id}
            className="flex flex-col gap-3 rounded-uv-xl border border-uv-border bg-uv-background p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <DietPill diet={item.diet} />
                <p className="font-semibold text-uv-foreground">{item.name}</p>
                {item.popular ? (
                  <span className="rounded-uv-full bg-uv-warning-muted px-2 py-0.5 text-[10px] font-semibold text-uv-warning">
                    Popular
                  </span>
                ) : null}
              </div>
              <p className="mt-1 text-sm text-uv-foreground-muted">{item.description}</p>
              <p className="mt-2 font-bold text-uv-brand">{formatInr(item.price)}</p>
            </div>
            <Button type="button" size="sm" onClick={() => setCustomize(item)}>
              Customize
            </Button>
          </article>
        ))}
      </div>

      <DemoCard title="Ratings & reviews" description="Illustrative demo reviews — not real customer feedback.">
        <div className="space-y-3">
          {reviews.map((r) => (
            <div key={r.id} className="rounded-uv-xl border border-uv-border p-4">
              <p className="text-sm font-medium">
                {r.customer} · ★ {r.rating}{' '}
                <span className="text-xs text-uv-brand">(Product Demo)</span>
              </p>
              <p className="mt-1 text-sm text-uv-foreground-muted">{r.comment}</p>
            </div>
          ))}
        </div>
      </DemoCard>

      {customize ? (
        <CustomizeModal
          item={customize}
          onClose={() => setCustomize(null)}
          onAdd={({ addOnIds, customization, notes }) => {
            addToCart({
              itemId: customize.id,
              restaurantId: customize.restaurantId,
              name: customize.name,
              unitPrice: customize.price,
              qty: 1,
              diet: customize.diet,
              addOnIds,
              addOnLabels: customize.addOns
                .filter((a) => addOnIds.includes(a.id))
                .map((a) => a.name),
              customization,
              notes,
            });
            setCustomize(null);
          }}
        />
      ) : null}
    </div>
  );
}

export function CartCheckoutPage() {
  const router = useRouter();
  const {
    cart,
    cartTotals,
    updateQty,
    setCoupon,
    setAddressId,
    placeCustomerOrder,
  } = useRestaurantDemoStore();
  const [payment, setPayment] = useState<PaymentMethod>('upi');
  const [error, setError] = useState<string | null>(null);

  const restaurant = cart.restaurantId ? getRestaurant(cart.restaurantId) : null;

  const confirm = () => {
    setError(null);
    const order = placeCustomerOrder(payment);
    if (!order) {
      setError('Add items from a restaurant before checkout.');
      return;
    }
    window.location.assign(`/demo/restaurant-platform/customer/tracking/${order.id}`);
  };

  if (!cart.lines.length) {
    return (
      <div className="space-y-6">
        <DemoPageHeader title="Cart & checkout" />
        <EmptyHint>
          Cart is empty.{' '}
          <Link href="/demo/restaurant-platform/customer" className="text-uv-brand underline">
            Browse restaurants
          </Link>
        </EmptyHint>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DemoPageHeader
        title="Cart & checkout"
        description={`Ordering from ${restaurant?.name ?? 'restaurant'} — Product Demo · Mock Data.`}
      />
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <DemoCard title="Items">
          <div className="space-y-3">
            {cart.lines.map((line) => (
              <div
                key={line.key}
                className="flex items-start justify-between gap-3 rounded-uv-xl border border-uv-border p-3"
              >
                <div>
                  <p className="font-medium">{line.name}</p>
                  <p className="text-xs text-uv-foreground-muted">
                    {line.addOnLabels.join(', ') || 'No add-ons'} ·{' '}
                    {Object.values(line.customization).join(' / ') || 'Default'}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="button"
                      className="h-8 w-8 rounded-uv-lg border"
                      onClick={() => updateQty(line.key, line.qty - 1)}
                    >
                      −
                    </button>
                    <span className="text-sm font-semibold">{line.qty}</span>
                    <button
                      type="button"
                      className="h-8 w-8 rounded-uv-lg border"
                      onClick={() => updateQty(line.key, line.qty + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <p className="font-semibold text-uv-brand">
                  {formatInr(
                    (line.unitPrice +
                      (demoMenu
                        .find((m) => m.id === line.itemId)
                        ?.addOns.filter((a) => line.addOnIds.includes(a.id))
                        .reduce((s, a) => s + a.price, 0) ?? 0)) *
                      line.qty,
                  )}
                </p>
              </div>
            ))}
          </div>
        </DemoCard>

        <div className="space-y-4">
          <DemoCard title="Delivery address">
            <div className="space-y-2">
              {demoAddresses.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setAddressId(a.id)}
                  className={cn(
                    'w-full rounded-uv-xl border p-3 text-left text-sm',
                    cart.addressId === a.id
                      ? 'border-uv-brand bg-uv-brand-muted/30'
                      : 'border-uv-border',
                  )}
                >
                  <p className="font-semibold">{a.label}</p>
                  <p className="text-uv-foreground-muted">{a.line}</p>
                </button>
              ))}
            </div>
          </DemoCard>

          <DemoCard title="Coupon">
            <div className="flex flex-wrap gap-2">
              {demoCoupons.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => setCoupon(c.code)}
                  className={cn(
                    'rounded-uv-full px-3 py-1.5 text-xs font-semibold',
                    cart.couponCode === c.code
                      ? 'uv-brand-gradient text-white'
                      : 'border border-uv-border',
                  )}
                >
                  {c.code}
                </button>
              ))}
            </div>
            <Input
              className="mt-3"
              value={cart.couponCode}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Enter code"
            />
          </DemoCard>

          <DemoCard title="Payment method">
            <div className="grid grid-cols-2 gap-2">
              {(['upi', 'card', 'wallet', 'cod'] as PaymentMethod[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setPayment(m)}
                  className={cn(
                    'rounded-uv-lg border px-3 py-3 text-sm font-semibold uppercase',
                    payment === m
                      ? 'border-uv-brand bg-uv-brand-muted text-uv-brand'
                      : 'border-uv-border text-uv-foreground-muted',
                  )}
                >
                  {m === 'cod' ? 'Cash on Delivery' : m}
                </button>
              ))}
            </div>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd>{formatInr(cartTotals.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Discount</dt>
                <dd>-{formatInr(cartTotals.discount)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Tax (5%)</dt>
                <dd>{formatInr(cartTotals.tax)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Delivery</dt>
                <dd>{formatInr(cartTotals.deliveryFee)}</dd>
              </div>
              <div className="flex justify-between border-t border-uv-border pt-2 text-base font-bold">
                <dt>Total</dt>
                <dd className="text-uv-brand">{formatInr(cartTotals.total)}</dd>
              </div>
            </dl>
            {error ? (
              <p className="mt-3 rounded-uv-lg bg-uv-error-muted px-3 py-2 text-sm text-uv-error">
                {error}
              </p>
            ) : null}
            <Button type="button" className="mt-4 w-full" onClick={confirm}>
              Confirm order
            </Button>
            <button
              type="button"
              className="mt-2 text-sm text-uv-foreground-muted"
              onClick={() => router.push('/demo/restaurant-platform/customer')}
            >
              Continue browsing
            </button>
          </DemoCard>
        </div>
      </div>
    </div>
  );
}

const trackingSteps = [
  'placed',
  'accepted',
  'preparing',
  'ready',
  'assigned',
  'out_for_delivery',
  'delivered',
] as const;

export function OrderTrackingPage() {
  const params = useParams<{ id: string }>();
  const { orders, rateOrder } = useRestaurantDemoStore();
  const order = orders.find((o) => o.id === params.id);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');

  if (!order) {
    return (
      <div className="space-y-6">
        <DemoPageHeader title="Order tracking" />
        <EmptyHint>Order not found in this demo session.</EmptyHint>
      </div>
    );
  }

  const stepIndex = trackingSteps.indexOf(
    order.status === 'completed' ? 'delivered' : (order.status as (typeof trackingSteps)[number]),
  );

  return (
    <div className="space-y-6">
      <DemoPageHeader
        title="Live order tracking"
        description={`${order.reference} · mock lifecycle state only — Product Demo.`}
      />
      <DemoCard>
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={order.status} />
          <StatusBadge status={order.paymentStatus} />
          <span className="text-sm text-uv-foreground-muted">{order.restaurantName}</span>
        </div>
        <p className="mt-4 text-2xl font-bold text-uv-brand">{formatInr(order.total)}</p>
        <p className="mt-1 text-sm text-uv-foreground-muted">{order.address}</p>
        {order.otp ? (
          <p className="mt-3 rounded-uv-lg bg-uv-background-subtle px-3 py-2 text-sm">
            Delivery OTP (mock) · <span className="font-mono font-bold">{order.otp}</span>
          </p>
        ) : null}

        <ol className="mt-6 space-y-3">
          {trackingSteps.map((step, index) => (
            <li key={step} className="flex items-center gap-3 text-sm">
              <span
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold',
                  index <= stepIndex
                    ? 'uv-brand-gradient text-white'
                    : 'bg-uv-background-subtle text-uv-foreground-muted',
                )}
              >
                {index + 1}
              </span>
              <span className={cn('capitalize', index <= stepIndex ? 'font-semibold' : '')}>
                {step.replace(/_/g, ' ')}
              </span>
            </li>
          ))}
        </ol>
      </DemoCard>

      {order.status === 'delivered' || order.status === 'completed' ? (
        <DemoCard title="Rate this order" description="Demo feedback stored only in local session.">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setRating(n)}
                className={cn(
                  'h-10 w-10 rounded-uv-lg border text-sm font-bold',
                  rating >= n ? 'border-uv-brand bg-uv-brand-muted text-uv-brand' : '',
                )}
              >
                {n}
              </button>
            ))}
          </div>
          <Input
            className="mt-3"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Optional demo review"
          />
          <Button
            type="button"
            className="mt-3"
            onClick={() => rateOrder(order.id, rating, review || 'Demo rating')}
          >
            Submit rating
          </Button>
          {order.rating ? (
            <p className="mt-2 text-sm text-uv-success">
              Saved ★ {order.rating} — {order.review}
            </p>
          ) : null}
        </DemoCard>
      ) : (
        <DemoCard title="What happens next?" description="Advance this order from Manager, Kitchen, or Delivery roles.">
          <p className="text-sm text-uv-foreground-muted">
            Sign in as Restaurant Manager to accept, Kitchen to prepare, and Delivery Partner to
            complete the mock handoff.
          </p>
        </DemoCard>
      )}
    </div>
  );
}

export function OrderHistoryPage() {
  const router = useRouter();
  const { orders, reorder } = useRestaurantDemoStore();
  const mine = orders.filter(
    (o) => o.customerName === 'Demo Customer' || o.channel === 'delivery',
  );

  return (
    <div className="space-y-6">
      <DemoPageHeader
        title="Order history"
        description="Past and active mock orders with reorder — Product Demo · Mock Data."
      />
      <div className="space-y-3">
        {mine.length === 0 ? (
          <EmptyHint>No orders yet in this session.</EmptyHint>
        ) : (
          mine.map((o) => (
            <article
              key={o.id}
              className="flex flex-col gap-3 rounded-uv-xl border border-uv-border bg-uv-background p-4 lg:flex-row lg:items-center lg:justify-between"
            >
              <div>
                <p className="font-semibold">
                  {o.reference} · {o.restaurantName}
                </p>
                <p className="text-sm text-uv-foreground-muted">
                  {o.items.map((i) => i.name).join(', ')}
                </p>
                <div className="mt-2 flex gap-2">
                  <StatusBadge status={o.status} />
                  <span className="text-sm font-semibold text-uv-brand">{formatInr(o.total)}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/demo/restaurant-platform/customer/tracking/${o.id}`}
                  className={cn(buttonVariants({ size: 'sm', variant: 'outline' }))}
                >
                  Track
                </Link>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => {
                    if (reorder(o.id)) router.push('/demo/restaurant-platform/customer/cart');
                  }}
                >
                  Reorder
                </Button>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}

export function CustomerOffersPage() {
  const { setCoupon } = useRestaurantDemoStore();
  return (
    <div className="space-y-6">
      <DemoPageHeader title="Offers" description="Mock coupons applied at checkout." />
      <div className="grid gap-4 sm:grid-cols-2">
        {demoCoupons.map((c) => (
          <DemoCard key={c.code} title={c.title} description={c.description}>
            <p className="font-mono text-sm font-bold text-uv-brand">{c.code}</p>
            <Button type="button" size="sm" className="mt-3" onClick={() => setCoupon(c.code)}>
              Apply to cart
            </Button>
          </DemoCard>
        ))}
      </div>
    </div>
  );
}
