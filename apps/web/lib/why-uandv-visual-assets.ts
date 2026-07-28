/**
 * Why U&V v3.2 — single visual asset manifest
 * Drop final WebP files into: public/images/why-uandv/ (see docs/IMAGE_ASSET_GUIDE.md)
 */

export const WUV_VISUAL_BASE = '/images/why-uandv';

/** Hero focal point — adjust without layout changes (e.g. `center 30%`). */
export const WUV_HERO_OBJECT_POSITION = 'center center';

export const WUV_HERO_INTRINSIC_SIZE = {
  width: 1600,
  height: 1000,
} as const;

export type WhyUandVAspectRatio = '16/10' | '4/3' | '3/2' | 'auto';

export type WhyUandVVisualAsset = {
  file: string;
  alt: string;
  aspectRatio: WhyUandVAspectRatio;
  recommendedSize: string;
  objectFit?: 'contain' | 'cover';
  objectPosition?: string;
};

export const whyUandVVisualAssets = {
  hero: {
    file: 'hero.webp',
    alt: 'Business owner and U&V team planning together with digital business tools',
    aspectRatio: '16/10',
    recommendedSize: '1600 × 1000',
    objectFit: 'cover',
    objectPosition: WUV_HERO_OBJECT_POSITION,
  },
  journeyDiscover: {
    file: 'journey/discover.webp',
    alt: 'Discover — business discussion and understanding your goals',
    aspectRatio: '4/3',
    recommendedSize: '800 × 600',
    objectFit: 'contain',
  },
  journeyStrategy: {
    file: 'journey/strategy.webp',
    alt: 'Strategy — planning roadmap and priorities',
    aspectRatio: '4/3',
    recommendedSize: '800 × 600',
    objectFit: 'contain',
  },
  journeyBuild: {
    file: 'journey/build.webp',
    alt: 'Build — development workspace and product creation',
    aspectRatio: '4/3',
    recommendedSize: '800 × 600',
    objectFit: 'contain',
  },
  journeyLaunch: {
    file: 'journey/launch.webp',
    alt: 'Launch — successful deployment and go-live',
    aspectRatio: '4/3',
    recommendedSize: '800 × 600',
    objectFit: 'contain',
  },
  journeyGrow: {
    file: 'journey/grow.webp',
    alt: 'Grow — long-term support and partnership',
    aspectRatio: '4/3',
    recommendedSize: '800 × 600',
    objectFit: 'contain',
  },
  principles: {
    file: 'principles.webp',
    alt: 'Principles — trust, business-first thinking, reliability and long-term support',
    aspectRatio: '4/3',
    recommendedSize: '1200 × 900',
    objectFit: 'contain',
  },
  workflow: {
    file: 'workflow.webp',
    alt: 'How we work with you — structured delivery from listen to improve',
    aspectRatio: '16/10',
    recommendedSize: '1400 × 875',
    objectFit: 'contain',
  },
  partnership: {
    file: 'partnership.webp',
    alt: 'Long-term partnership beyond launch — support, growth and continuity',
    aspectRatio: '4/3',
    recommendedSize: '1200 × 900',
    objectFit: 'contain',
  },
  closing: {
    file: 'closing.webp',
    alt: 'Closing — calm confidence in a trusted technology partner',
    aspectRatio: '16/10',
    recommendedSize: '1920 × 1080',
    objectFit: 'cover',
    objectPosition: 'center',
  },
  industryHealthcare: {
    file: 'industries/healthcare.webp',
    alt: 'Healthcare — hospital, doctor, patient and medical dashboard',
    aspectRatio: '4/3',
    recommendedSize: '900 × 675',
    objectFit: 'contain',
  },
  industryEducation: {
    file: 'industries/education.webp',
    alt: 'Education — teacher, student and digital learning',
    aspectRatio: '4/3',
    recommendedSize: '900 × 675',
    objectFit: 'contain',
  },
  industryFinance: {
    file: 'industries/finance.webp',
    alt: 'Finance — secure payments, banking dashboard and analytics',
    aspectRatio: '4/3',
    recommendedSize: '900 × 675',
    objectFit: 'contain',
  },
  industryTravel: {
    file: 'industries/travel.webp',
    alt: 'Travel — hotel, airplane, booking and tourist journey',
    aspectRatio: '4/3',
    recommendedSize: '900 × 675',
    objectFit: 'contain',
  },
  industryHospitality: {
    file: 'industries/hospitality.webp',
    alt: 'Hospitality — hotel reception, guest and booking system',
    aspectRatio: '4/3',
    recommendedSize: '900 × 675',
    objectFit: 'contain',
  },
  industryLogistics: {
    file: 'industries/logistics.webp',
    alt: 'Logistics — truck, warehouse and tracking dashboard',
    aspectRatio: '4/3',
    recommendedSize: '900 × 675',
    objectFit: 'contain',
  },
} as const satisfies Record<string, WhyUandVVisualAsset>;

export type WhyUandVVisualAssetKey = keyof typeof whyUandVVisualAssets;

export function wuvVisualSrc(file: string) {
  return `${WUV_VISUAL_BASE}/${file}`;
}

export function wuvVisualAsset(key: WhyUandVVisualAssetKey) {
  const asset = whyUandVVisualAssets[key];
  return {
    ...asset,
    src: wuvVisualSrc(asset.file),
  };
}

/** Partner journey visuals — compact 4:3 WebP slots */
export const WUV_JOURNEY_RECOMMENDED_SIZE = '800 × 600';
export const WUV_JOURNEY_ASPECT_RATIO = '4/3' as const;
export const WUV_JOURNEY_IMAGE_SIZES = '(max-width: 1024px) 100vw, 320px';

/** Partner journey stage id → visual asset key */
export const wuvJourneyVisualKeys = {
  discover: 'journeyDiscover',
  strategy: 'journeyStrategy',
  build: 'journeyBuild',
  launch: 'journeyLaunch',
  grow: 'journeyGrow',
} as const satisfies Record<string, WhyUandVVisualAssetKey>;

/** Six featured industries with prepared visual assets */
export const wuvFeaturedIndustries = [
  { title: 'Healthcare', assetKey: 'industryHealthcare' as const },
  { title: 'Education', assetKey: 'industryEducation' as const },
  { title: 'Finance', assetKey: 'industryFinance' as const },
  { title: 'Travel', assetKey: 'industryTravel' as const },
  { title: 'Hospitality', assetKey: 'industryHospitality' as const },
  { title: 'Logistics', assetKey: 'industryLogistics' as const },
] as const;
