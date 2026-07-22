'use client';

import { useEffect } from 'react';
import Clarity from '@microsoft/clarity';

const CLARITY_PROJECT_ID =
  process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? 'xql9xhq2z8';

/**
 * Official Microsoft Clarity integration (@microsoft/clarity).
 * Initializes once on the client for all routes.
 */
export function MicrosoftClarity() {
  useEffect(() => {
    if (!CLARITY_PROJECT_ID) {
      return;
    }
    Clarity.init(CLARITY_PROJECT_ID);
  }, []);

  return null;
}
