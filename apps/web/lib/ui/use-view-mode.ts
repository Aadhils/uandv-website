'use client';

import { useCallback, useSyncExternalStore } from 'react';

export type ViewMode = 'grid' | 'list';

const EVENT_PREFIX = 'uandv-view-mode:';

function storageKey(pageKey: string) {
  return `uandv-view-mode:${pageKey}`;
}

function eventName(pageKey: string) {
  return `${EVENT_PREFIX}${pageKey}`;
}

function readViewMode(pageKey: string, fallback: ViewMode): ViewMode {
  try {
    const raw = window.localStorage.getItem(storageKey(pageKey));
    if (raw === 'grid' || raw === 'list') return raw;

    // Legacy portfolio key from Sprint polish pass
    if (pageKey === 'portfolio') {
      const legacy = window.localStorage.getItem('uandv-portfolio-view');
      if (legacy === 'grid' || legacy === 'list') return legacy;
    }
  } catch {
    // private mode / blocked storage
  }
  return fallback;
}

function subscribeViewMode(pageKey: string, onStoreChange: () => void) {
  const key = storageKey(pageKey);
  const custom = eventName(pageKey);

  const onStorage = (event: StorageEvent) => {
    if (event.key === key || event.key === null) onStoreChange();
    if (pageKey === 'portfolio' && event.key === 'uandv-portfolio-view') {
      onStoreChange();
    }
  };
  const onCustom = () => onStoreChange();

  window.addEventListener('storage', onStorage);
  window.addEventListener(custom, onCustom);
  return () => {
    window.removeEventListener('storage', onStorage);
    window.removeEventListener(custom, onCustom);
  };
}

/**
 * Persist Grid/List preference per page. SSR/hydration always uses `defaultView`.
 */
export function useViewMode(
  pageKey: string,
  defaultView: ViewMode = 'grid',
): [ViewMode, (next: ViewMode) => void] {
  const view = useSyncExternalStore(
    (onStoreChange) => subscribeViewMode(pageKey, onStoreChange),
    () => readViewMode(pageKey, defaultView),
    () => defaultView,
  );

  const setView = useCallback(
    (next: ViewMode) => {
      try {
        window.localStorage.setItem(storageKey(pageKey), next);
        if (pageKey === 'portfolio') {
          window.localStorage.setItem('uandv-portfolio-view', next);
        }
      } catch {
        // ignore
      }
      window.dispatchEvent(new Event(eventName(pageKey)));
    },
    [pageKey],
  );

  return [view, setView];
}

/** Shared layout classes for collection views */
export const viewModeLayoutClass = {
  grid: 'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3',
  gridDense: 'grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3',
  list: 'flex min-w-0 flex-col gap-4',
} as const;
