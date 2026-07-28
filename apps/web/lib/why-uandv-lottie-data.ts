import type { WuvAnimationId } from './why-uandv-animations';
import { wuvAnimations } from './why-uandv-animations';

export type WuvLottieData = Record<string, unknown>;

const cache = new Map<WuvAnimationId, WuvLottieData>();

export async function getWuvLottieData(id: WuvAnimationId): Promise<WuvLottieData | null> {
  const cached = cache.get(id);
  if (cached) return cached;

  const src = wuvAnimations[id].src;
  try {
    const res = await fetch(src);
    if (!res.ok) return null;
    const data = (await res.json()) as WuvLottieData;
    cache.set(id, data);
    return data;
  } catch {
    return null;
  }
}

export function prefetchWuvLottieData(id: WuvAnimationId) {
  if (!cache.has(id)) void getWuvLottieData(id);
}
