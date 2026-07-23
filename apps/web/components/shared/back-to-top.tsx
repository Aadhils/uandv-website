'use client';

import { useEffect, useState } from 'react';

import { Icon, cn } from '@uandv/ui';

const SHOW_AFTER_PX = 600;

type BackToTopProps = {
  className?: string;
  /**
   * Optional scroll container (e.g. `#workspace-main` for EnterpriseAppShell).
   * Defaults to the window for marketing pages.
   */
  scrollRootSelector?: string;
};

/**
 * Floating Back-to-Top control for long pages.
 * Mount once per layout/shell — do not nest multiple instances.
 */
export function BackToTop({
  className,
  scrollRootSelector,
}: BackToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const root = scrollRootSelector
      ? document.querySelector(scrollRootSelector)
      : null;
    const scrollTarget: HTMLElement | Window =
      root instanceof HTMLElement ? root : window;

    const getScrollTop = () => {
      if (root instanceof HTMLElement) return root.scrollTop;
      return window.scrollY;
    };

    const onScroll = () => {
      setVisible(getScrollTop() > SHOW_AFTER_PX);
    };

    onScroll();
    scrollTarget.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      scrollTarget.removeEventListener('scroll', onScroll);
    };
  }, [scrollRootSelector]);

  const scrollToTop = () => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const behavior: ScrollBehavior = prefersReduced ? 'auto' : 'smooth';
    const root = scrollRootSelector
      ? document.querySelector(scrollRootSelector)
      : null;

    if (root instanceof HTMLElement) {
      root.scrollTo({ top: 0, behavior });
      return;
    }
    window.scrollTo({ top: 0, behavior });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      className={cn(
        'fixed z-[60] inline-flex h-11 w-11 items-center justify-center rounded-uv-full border border-uv-border bg-uv-background/95 text-uv-brand shadow-uv-md backdrop-blur-sm transition-[opacity,transform,visibility] duration-200 uv-focus-ring',
        'hover:border-uv-brand/40 hover:bg-uv-brand-muted dark:bg-uv-background/90',
        'right-4 bottom-[max(1rem,env(safe-area-inset-bottom,0px))] sm:right-6',
        visible
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none invisible translate-y-2 opacity-0',
        className,
      )}
    >
      <Icon name="ChevronUp" size="md" />
    </button>
  );
}
