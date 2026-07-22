'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import {
  calcLineTotal,
  demoCoupons,
  demoMenu,
  getRestaurant,
  seedInventory,
  seedOrders,
  seedPurchaseOrders,
} from './mock-data';
import {
  RESTAURANT_DEMO_CART_KEY,
  RESTAURANT_DEMO_DELIVERY_KEY,
  RESTAURANT_DEMO_INVENTORY_KEY,
  RESTAURANT_DEMO_ORDERS_KEY,
  RESTAURANT_DEMO_POS_HOLD_KEY,
  type CartLine,
  type DeliveryPartnerState,
  type InventoryItem,
  type OrderChannel,
  type OrderStatus,
  type PaymentMethod,
  type PlatformOrder,
  type PosHold,
  type PurchaseOrder,
} from './types';

type CartState = {
  restaurantId: string | null;
  lines: CartLine[];
  couponCode: string;
  addressId: string;
};

type StoreContextValue = {
  ready: boolean;
  orders: PlatformOrder[];
  cart: CartState;
  inventory: InventoryItem[];
  purchaseOrders: PurchaseOrder[];
  deliveryState: DeliveryPartnerState;
  posHolds: PosHold[];
  menuAvailability: Record<string, boolean>;
  setCoupon: (code: string) => void;
  setAddressId: (id: string) => void;
  addToCart: (line: Omit<CartLine, 'key'>) => void;
  updateQty: (key: string, qty: number) => void;
  clearCart: () => void;
  cartTotals: {
    subtotal: number;
    discount: number;
    tax: number;
    deliveryFee: number;
    total: number;
  };
  placeCustomerOrder: (paymentMethod: PaymentMethod) => PlatformOrder | null;
  placePosOrder: (input: {
    channel: OrderChannel;
    tableId?: string;
    customerName: string;
    paymentMethod: PaymentMethod;
    discount: number;
    lines: CartLine[];
  }) => PlatformOrder;
  holdPosOrder: (hold: Omit<PosHold, 'id' | 'createdAt'>) => void;
  resumePosHold: (id: string) => PosHold | null;
  clearPosHold: (id: string) => void;
  updateOrderStatus: (id: string, status: OrderStatus, patch?: Partial<PlatformOrder>) => void;
  updateItemPrep: (orderId: string, key: string, prepStatus: PlatformOrder['items'][0]['prepStatus']) => void;
  rateOrder: (id: string, rating: number, review: string) => void;
  reorder: (id: string) => boolean;
  toggleMenuAvailability: (itemId: string) => void;
  adjustStock: (id: string, delta: number) => void;
  logWastage: (id: string, qty: number) => void;
  addPurchaseOrder: (po: Omit<PurchaseOrder, 'id' | 'createdAt'>) => void;
  setDeliveryOnline: (online: boolean) => void;
  acceptDelivery: (orderId: string) => void;
  rejectDelivery: (orderId: string) => void;
  completeDelivery: (orderId: string, otp: string) => { ok: true } | { ok: false; error: string };
};

const StoreContext = createContext<StoreContextValue | null>(null);

const defaultCart: CartState = {
  restaurantId: null,
  lines: [],
  couponCode: '',
  addressId: 'addr-1',
};

const defaultDelivery: DeliveryPartnerState = {
  online: true,
  wallet: 1850,
  earningsToday: 640,
  rating: 4.8,
  incentives: 120,
};

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function makeReference() {
  return `UV-FD-${Math.floor(1000 + Math.random() * 9000)}`;
}

export function RestaurantDemoStoreProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [orders, setOrders] = useState<PlatformOrder[]>(seedOrders);
  const [cart, setCart] = useState<CartState>(defaultCart);
  const [inventory, setInventory] = useState<InventoryItem[]>(seedInventory);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>(seedPurchaseOrders);
  const [deliveryState, setDeliveryState] = useState<DeliveryPartnerState>(defaultDelivery);
  const [posHolds, setPosHolds] = useState<PosHold[]>([]);
  const [menuAvailability, setMenuAvailability] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(demoMenu.map((m) => [m.id, m.available])),
  );

  useEffect(() => {
    setOrders(readJson(RESTAURANT_DEMO_ORDERS_KEY, seedOrders));
    setCart(readJson(RESTAURANT_DEMO_CART_KEY, defaultCart));
    setInventory(readJson(RESTAURANT_DEMO_INVENTORY_KEY, seedInventory));
    setDeliveryState(readJson(RESTAURANT_DEMO_DELIVERY_KEY, defaultDelivery));
    setPosHolds(readJson(RESTAURANT_DEMO_POS_HOLD_KEY, []));
    setReady(true);
  }, []);

  const persistOrders = useCallback((next: PlatformOrder[]) => {
    setOrders(next);
    window.localStorage.setItem(RESTAURANT_DEMO_ORDERS_KEY, JSON.stringify(next));
  }, []);

  const persistCart = useCallback((next: CartState) => {
    setCart(next);
    window.localStorage.setItem(RESTAURANT_DEMO_CART_KEY, JSON.stringify(next));
  }, []);

  const persistInventory = useCallback((next: InventoryItem[]) => {
    setInventory(next);
    window.localStorage.setItem(RESTAURANT_DEMO_INVENTORY_KEY, JSON.stringify(next));
  }, []);

  const persistDelivery = useCallback((next: DeliveryPartnerState) => {
    setDeliveryState(next);
    window.localStorage.setItem(RESTAURANT_DEMO_DELIVERY_KEY, JSON.stringify(next));
  }, []);

  const persistHolds = useCallback((next: PosHold[]) => {
    setPosHolds(next);
    window.localStorage.setItem(RESTAURANT_DEMO_POS_HOLD_KEY, JSON.stringify(next));
  }, []);

  const cartTotals = useMemo(() => {
    const subtotal = cart.lines.reduce((sum, line) => sum + calcLineTotal(line), 0);
    const coupon = demoCoupons.find((c) => c.code === cart.couponCode.toUpperCase());
    let discount = 0;
    let deliveryFee = subtotal > 0 ? 40 : 0;
    if (coupon && subtotal >= coupon.minOrder) {
      discount =
        coupon.discountType === 'flat'
          ? coupon.value
          : Math.round((subtotal * coupon.value) / 100);
      if (coupon.code === 'FREEDEL') {
        deliveryFee = 0;
        discount = Math.min(discount, 40);
      }
    }
    const taxable = Math.max(0, subtotal - discount);
    const tax = Math.round(taxable * 0.05);
    const total = taxable + tax + deliveryFee;
    return { subtotal, discount, tax, deliveryFee, total };
  }, [cart.lines, cart.couponCode]);

  const setCoupon = useCallback(
    (code: string) => persistCart({ ...cart, couponCode: code.toUpperCase() }),
    [cart, persistCart],
  );

  const setAddressId = useCallback(
    (id: string) => persistCart({ ...cart, addressId: id }),
    [cart, persistCart],
  );

  const addToCart = useCallback(
    (line: Omit<CartLine, 'key'>) => {
      if (cart.restaurantId && cart.restaurantId !== line.restaurantId && cart.lines.length) {
        // replace cart when switching restaurants
        const next: CartState = {
          ...cart,
          restaurantId: line.restaurantId,
          lines: [{ ...line, key: `c-${Date.now()}` }],
        };
        persistCart(next);
        return;
      }
      const key = `c-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      persistCart({
        ...cart,
        restaurantId: line.restaurantId,
        lines: [...cart.lines, { ...line, key }],
      });
    },
    [cart, persistCart],
  );

  const updateQty = useCallback(
    (key: string, qty: number) => {
      if (qty <= 0) {
        const lines = cart.lines.filter((l) => l.key !== key);
        persistCart({
          ...cart,
          lines,
          restaurantId: lines.length ? cart.restaurantId : null,
        });
        return;
      }
      persistCart({
        ...cart,
        lines: cart.lines.map((l) => (l.key === key ? { ...l, qty } : l)),
      });
    },
    [cart, persistCart],
  );

  const clearCart = useCallback(() => persistCart(defaultCart), [persistCart]);

  const placeCustomerOrder = useCallback(
    (paymentMethod: PaymentMethod) => {
      if (!cart.restaurantId || !cart.lines.length) return null;
      const restaurant = getRestaurant(cart.restaurantId);
      if (!restaurant) return null;
      const now = new Date().toISOString();
      const order: PlatformOrder = {
        id: `ord-${Date.now()}`,
        reference: makeReference(),
        channel: 'delivery',
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        customerName: 'Demo Customer',
        status: 'placed',
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'cod' : 'paid',
        createdAt: now,
        updatedAt: now,
        items: cart.lines.map((l) => ({ ...l, prepStatus: 'queued' })),
        subtotal: cartTotals.subtotal,
        discount: cartTotals.discount,
        tax: cartTotals.tax,
        deliveryFee: cartTotals.deliveryFee,
        total: cartTotals.total,
        address:
          cart.addressId === 'addr-2'
            ? 'Floor 4, Sample Tech Park, Central Demo Zone'
            : '12 Demo Residency, Marina Demo Zone',
        couponCode: cart.couponCode || undefined,
        otp: String(1000 + Math.floor(Math.random() * 9000)),
        priority: cartTotals.total > 800,
      };
      persistOrders([order, ...orders]);
      persistCart(defaultCart);
      return order;
    },
    [cart, cartTotals, orders, persistCart, persistOrders],
  );

  const placePosOrder = useCallback(
    (input: {
      channel: OrderChannel;
      tableId?: string;
      customerName: string;
      paymentMethod: PaymentMethod;
      discount: number;
      lines: CartLine[];
    }) => {
      const restaurantId = input.lines[0]?.restaurantId ?? 'rst-01';
      const restaurant = getRestaurant(restaurantId)!;
      const subtotal = input.lines.reduce((s, l) => s + calcLineTotal(l), 0);
      const discount = Math.min(input.discount, subtotal);
      const tax = Math.round((subtotal - discount) * 0.05);
      const now = new Date().toISOString();
      const order: PlatformOrder = {
        id: `ord-${Date.now()}`,
        reference: makeReference(),
        channel: input.channel,
        restaurantId,
        restaurantName: restaurant.name,
        customerName: input.customerName,
        status: 'accepted',
        paymentMethod: input.paymentMethod,
        paymentStatus: input.paymentMethod === 'cod' ? 'cod' : 'paid',
        createdAt: now,
        updatedAt: now,
        acceptedAt: now,
        items: input.lines.map((l) => ({ ...l, prepStatus: 'queued' })),
        subtotal,
        discount,
        tax,
        deliveryFee: input.channel === 'delivery' ? 40 : 0,
        total: subtotal - discount + tax + (input.channel === 'delivery' ? 40 : 0),
        tableId: input.tableId,
        kitchenNotes: input.channel === 'dinein' ? `Table ${input.tableId}` : undefined,
      };
      persistOrders([order, ...orders]);
      return order;
    },
    [orders, persistOrders],
  );

  const holdPosOrder = useCallback(
    (hold: Omit<PosHold, 'id' | 'createdAt'>) => {
      const next: PosHold = {
        ...hold,
        id: `hold-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      persistHolds([next, ...posHolds]);
    },
    [persistHolds, posHolds],
  );

  const resumePosHold = useCallback(
    (id: string) => posHolds.find((h) => h.id === id) ?? null,
    [posHolds],
  );

  const clearPosHold = useCallback(
    (id: string) => persistHolds(posHolds.filter((h) => h.id !== id)),
    [persistHolds, posHolds],
  );

  const updateOrderStatus = useCallback(
    (id: string, status: OrderStatus, patch: Partial<PlatformOrder> = {}) => {
      const now = new Date().toISOString();
      const timePatch: Partial<PlatformOrder> = { updatedAt: now, status };
      if (status === 'accepted') timePatch.acceptedAt = now;
      if (status === 'preparing') timePatch.preparingAt = now;
      if (status === 'ready') timePatch.readyAt = now;
      if (status === 'assigned') timePatch.assignedAt = now;
      if (status === 'out_for_delivery') timePatch.outAt = now;
      if (status === 'delivered' || status === 'completed') timePatch.deliveredAt = now;
      persistOrders(
        orders.map((o) => (o.id === id ? { ...o, ...timePatch, ...patch } : o)),
      );
    },
    [orders, persistOrders],
  );

  const updateItemPrep = useCallback(
    (orderId: string, key: string, prepStatus: PlatformOrder['items'][0]['prepStatus']) => {
      persistOrders(
        orders.map((o) => {
          if (o.id !== orderId) return o;
          const items = o.items.map((i) => (i.key === key ? { ...i, prepStatus } : i));
          const allReady = items.every((i) => i.prepStatus === 'ready');
          return {
            ...o,
            items,
            status: allReady && o.status === 'preparing' ? 'ready' : o.status,
            readyAt: allReady ? new Date().toISOString() : o.readyAt,
            updatedAt: new Date().toISOString(),
          };
        }),
      );
    },
    [orders, persistOrders],
  );

  const rateOrder = useCallback(
    (id: string, rating: number, review: string) => {
      persistOrders(
        orders.map((o) =>
          o.id === id ? { ...o, rating, review, updatedAt: new Date().toISOString() } : o,
        ),
      );
    },
    [orders, persistOrders],
  );

  const reorder = useCallback(
    (id: string) => {
      const order = orders.find((o) => o.id === id);
      if (!order) return false;
      persistCart({
        restaurantId: order.restaurantId,
        lines: order.items.map((i, idx) => ({
          ...i,
          key: `reorder-${Date.now()}-${idx}`,
        })),
        couponCode: '',
        addressId: 'addr-1',
      });
      return true;
    },
    [orders, persistCart],
  );

  const toggleMenuAvailability = useCallback((itemId: string) => {
    setMenuAvailability((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  }, []);

  const adjustStock = useCallback(
    (id: string, delta: number) => {
      persistInventory(
        inventory.map((i) =>
          i.id === id ? { ...i, stock: Math.max(0, i.stock + delta) } : i,
        ),
      );
    },
    [inventory, persistInventory],
  );

  const logWastage = useCallback(
    (id: string, qty: number) => adjustStock(id, -Math.abs(qty)),
    [adjustStock],
  );

  const addPurchaseOrder = useCallback(
    (po: Omit<PurchaseOrder, 'id' | 'createdAt'>) => {
      setPurchaseOrders((prev) => [
        {
          ...po,
          id: `po-${Date.now()}`,
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ]);
    },
    [],
  );

  const setDeliveryOnline = useCallback(
    (online: boolean) => persistDelivery({ ...deliveryState, online }),
    [deliveryState, persistDelivery],
  );

  const acceptDelivery = useCallback(
    (orderId: string) => {
      updateOrderStatus(orderId, 'assigned', {
        deliveryPartnerId: 'delivery-demo',
      });
      setTimeout(() => {
        // auto bump is handled by UI usually; keep explicit
      }, 0);
    },
    [updateOrderStatus],
  );

  const rejectDelivery = useCallback(
    (orderId: string) => {
      updateOrderStatus(orderId, 'ready', { deliveryPartnerId: null });
    },
    [updateOrderStatus],
  );

  const completeDelivery = useCallback(
    (orderId: string, otp: string) => {
      const order = orders.find((o) => o.id === orderId);
      if (!order) return { ok: false as const, error: 'Order not found.' };
      if (order.otp && order.otp !== otp) {
        return { ok: false as const, error: 'Invalid mock OTP.' };
      }
      updateOrderStatus(orderId, 'delivered', { paymentStatus: 'paid' });
      persistDelivery({
        ...deliveryState,
        earningsToday: deliveryState.earningsToday + 60,
        wallet: deliveryState.wallet + 60,
      });
      return { ok: true as const };
    },
    [deliveryState, orders, persistDelivery, updateOrderStatus],
  );

  const value = useMemo(
    () => ({
      ready,
      orders,
      cart,
      inventory,
      purchaseOrders,
      deliveryState,
      posHolds,
      menuAvailability,
      setCoupon,
      setAddressId,
      addToCart,
      updateQty,
      clearCart,
      cartTotals,
      placeCustomerOrder,
      placePosOrder,
      holdPosOrder,
      resumePosHold,
      clearPosHold,
      updateOrderStatus,
      updateItemPrep,
      rateOrder,
      reorder,
      toggleMenuAvailability,
      adjustStock,
      logWastage,
      addPurchaseOrder,
      setDeliveryOnline,
      acceptDelivery,
      rejectDelivery,
      completeDelivery,
    }),
    [
      ready,
      orders,
      cart,
      inventory,
      purchaseOrders,
      deliveryState,
      posHolds,
      menuAvailability,
      setCoupon,
      setAddressId,
      addToCart,
      updateQty,
      clearCart,
      cartTotals,
      placeCustomerOrder,
      placePosOrder,
      holdPosOrder,
      resumePosHold,
      clearPosHold,
      updateOrderStatus,
      updateItemPrep,
      rateOrder,
      reorder,
      toggleMenuAvailability,
      adjustStock,
      logWastage,
      addPurchaseOrder,
      setDeliveryOnline,
      acceptDelivery,
      rejectDelivery,
      completeDelivery,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useRestaurantDemoStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useRestaurantDemoStore must be used within RestaurantDemoStoreProvider');
  }
  return ctx;
}
