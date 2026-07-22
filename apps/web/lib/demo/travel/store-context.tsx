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

import { seedBookings, seedWalletBalance, seedWalletTxns } from './mock-data';
import {
  TRAVEL_DEMO_BOOKINGS_KEY,
  TRAVEL_DEMO_WALLET_KEY,
  type CheckoutDraft,
  type TravelBooking,
  type WalletTxn,
} from './types';

type WalletState = {
  balance: number;
  txns: WalletTxn[];
};

type StoreContextValue = {
  ready: boolean;
  bookings: TravelBooking[];
  wallet: WalletState;
  checkout: CheckoutDraft;
  offerCode: string;
  setOfferCode: (code: string) => void;
  startCheckout: (draft: NonNullable<CheckoutDraft>) => void;
  clearCheckout: () => void;
  confirmCheckout: (paymentMethod: 'card' | 'upi' | 'wallet') => TravelBooking | null;
  cancelBooking: (id: string) => void;
  addWalletCredit: (amount: number, label: string) => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

function readBookings(): TravelBooking[] {
  if (typeof window === 'undefined') return seedBookings;
  try {
    const raw = window.localStorage.getItem(TRAVEL_DEMO_BOOKINGS_KEY);
    if (!raw) return seedBookings;
    return JSON.parse(raw) as TravelBooking[];
  } catch {
    return seedBookings;
  }
}

function readWallet(): WalletState {
  if (typeof window === 'undefined') {
    return { balance: seedWalletBalance, txns: seedWalletTxns };
  }
  try {
    const raw = window.localStorage.getItem(TRAVEL_DEMO_WALLET_KEY);
    if (!raw) return { balance: seedWalletBalance, txns: seedWalletTxns };
    return JSON.parse(raw) as WalletState;
  } catch {
    return { balance: seedWalletBalance, txns: seedWalletTxns };
  }
}

function makeReference(category: string) {
  const prefix =
    category === 'flight'
      ? 'FL'
      : category === 'hotel'
        ? 'HT'
        : category === 'package'
          ? 'PK'
          : category === 'train'
            ? 'TR'
            : category === 'bus'
              ? 'BS'
              : category === 'visa'
                ? 'VS'
                : category === 'insurance'
                  ? 'IN'
                  : category === 'car'
                    ? 'CR'
                    : 'SS';
  return `UV-${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;
}

export function TravelDemoStoreProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [bookings, setBookings] = useState<TravelBooking[]>(seedBookings);
  const [wallet, setWallet] = useState<WalletState>({
    balance: seedWalletBalance,
    txns: seedWalletTxns,
  });
  const [checkout, setCheckout] = useState<CheckoutDraft>(null);
  const [offerCode, setOfferCode] = useState('');

  useEffect(() => {
    setBookings(readBookings());
    setWallet(readWallet());
    setReady(true);
  }, []);

  const persistBookings = useCallback((next: TravelBooking[]) => {
    setBookings(next);
    window.localStorage.setItem(TRAVEL_DEMO_BOOKINGS_KEY, JSON.stringify(next));
  }, []);

  const persistWallet = useCallback((next: WalletState) => {
    setWallet(next);
    window.localStorage.setItem(TRAVEL_DEMO_WALLET_KEY, JSON.stringify(next));
  }, []);

  const startCheckout = useCallback((draft: NonNullable<CheckoutDraft>) => {
    setCheckout(draft);
  }, []);

  const clearCheckout = useCallback(() => setCheckout(null), []);

  const confirmCheckout = useCallback(
    (paymentMethod: 'card' | 'upi' | 'wallet') => {
      if (!checkout) return null;

      let amount = checkout.amount;
      const code = offerCode.trim().toUpperCase();
      if (code === 'UVFLY10' && checkout.category === 'flight') {
        amount = Math.round(amount * 0.9);
      } else if (code === 'STAY15' && checkout.category === 'hotel') {
        amount = Math.round(amount * 0.85);
      } else if (code === 'PACK5K' && checkout.category === 'package' && amount >= 40000) {
        amount = Math.max(0, amount - 5000);
      } else if (code === 'VISA99' && checkout.category === 'visa') {
        amount = 99;
      }

      if (paymentMethod === 'wallet' && wallet.balance < amount) {
        return null;
      }

      const booking: TravelBooking = {
        id: `bk-${Date.now()}`,
        category: checkout.category,
        title: checkout.title,
        subtitle: checkout.subtitle,
        amount,
        status: 'confirmed',
        paymentStatus: 'paid',
        createdAt: new Date().toISOString(),
        travelDate: checkout.travelDate,
        travelers: checkout.travelers,
        reference: makeReference(checkout.category),
        details: {
          ...checkout.details,
          paymentMethod,
          offerCode: code || 'none',
        },
      };

      persistBookings([booking, ...bookings]);

      if (paymentMethod === 'wallet') {
        persistWallet({
          balance: wallet.balance - amount,
          txns: [
            {
              id: `w-${Date.now()}`,
              label: `${checkout.title} · ${booking.reference}`,
              amount,
              type: 'debit',
              at: new Date().toISOString(),
            },
            ...wallet.txns,
          ],
        });
      }

      setCheckout(null);
      return booking;
    },
    [bookings, checkout, offerCode, persistBookings, persistWallet, wallet],
  );

  const cancelBooking = useCallback(
    (id: string) => {
      const next = bookings.map((b) =>
        b.id === id
          ? {
              ...b,
              status: 'cancelled' as const,
              paymentStatus:
                b.paymentStatus === 'paid' ? ('refunded' as const) : b.paymentStatus,
            }
          : b,
      );
      persistBookings(next);
    },
    [bookings, persistBookings],
  );

  const addWalletCredit = useCallback(
    (amount: number, label: string) => {
      persistWallet({
        balance: wallet.balance + amount,
        txns: [
          {
            id: `w-${Date.now()}`,
            label,
            amount,
            type: 'credit',
            at: new Date().toISOString(),
          },
          ...wallet.txns,
        ],
      });
    },
    [persistWallet, wallet],
  );

  const value = useMemo(
    () => ({
      ready,
      bookings,
      wallet,
      checkout,
      offerCode,
      setOfferCode,
      startCheckout,
      clearCheckout,
      confirmCheckout,
      cancelBooking,
      addWalletCredit,
    }),
    [
      ready,
      bookings,
      wallet,
      checkout,
      offerCode,
      startCheckout,
      clearCheckout,
      confirmCheckout,
      cancelBooking,
      addWalletCredit,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useTravelDemoStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useTravelDemoStore must be used within TravelDemoStoreProvider');
  return ctx;
}
