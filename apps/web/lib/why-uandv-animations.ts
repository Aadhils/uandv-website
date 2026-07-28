/** Why U&V — local animation manifest (production-safe paths) */

export type WuvAnimationId =
  | 'partnership'
  | 'broken-vendor'
  | 'listen'
  | 'plan'
  | 'build'
  | 'launch'
  | 'grow'
  | 'accountability'
  | 'healthcare'
  | 'education'
  | 'finance'
  | 'travel'
  | 'hospitality'
  | 'logistics'
  | 'principle-business-first'
  | 'principle-built-to-last'
  | 'principle-less-busywork'
  | 'principle-honest-communication'
  | 'principle-stay-after-launch'
  | 'principle-evolve';

export type WuvAnimationMeta = {
  id: WuvAnimationId;
  src: string;
  label: string;
  width: number;
  height: number;
  loop?: boolean;
};

const base = '/animations/why-uandv';

export const wuvAnimations: Record<WuvAnimationId, WuvAnimationMeta> = {
  partnership: {
    id: 'partnership',
    src: `${base}/partnership.json`,
    label: 'U&V partnership journey from problem to growth',
    width: 480,
    height: 320,
    loop: true,
  },
  'broken-vendor': {
    id: 'broken-vendor',
    src: `${base}/broken-vendor.json`,
    label: 'Broken vendor experience transforming into accountable partnership',
    width: 480,
    height: 300,
    loop: false,
  },
  listen: {
    id: 'listen',
    src: `${base}/listen.json`,
    label: 'Listen stage — understanding your business first',
    width: 400,
    height: 280,
    loop: false,
  },
  plan: {
    id: 'plan',
    src: `${base}/plan.json`,
    label: 'Plan stage — shaping the right roadmap',
    width: 400,
    height: 280,
    loop: false,
  },
  build: {
    id: 'build',
    src: `${base}/build.json`,
    label: 'Build stage — turning ideas into products',
    width: 400,
    height: 280,
    loop: false,
  },
  launch: {
    id: 'launch',
    src: `${base}/launch.json`,
    label: 'Launch stage — going live with confidence',
    width: 400,
    height: 280,
    loop: false,
  },
  grow: {
    id: 'grow',
    src: `${base}/grow.json`,
    label: 'Grow stage — long-term partnership',
    width: 400,
    height: 280,
    loop: false,
  },
  accountability: {
    id: 'accountability',
    src: `${base}/accountability.json`,
    label: 'Delivery accountability workflow',
    width: 520,
    height: 260,
    loop: false,
  },
  healthcare: {
    id: 'healthcare',
    src: `${base}/healthcare.json`,
    label: 'Healthcare — secure medical workflows',
    width: 400,
    height: 280,
    loop: true,
  },
  education: {
    id: 'education',
    src: `${base}/education.json`,
    label: 'Education — learning and administration',
    width: 400,
    height: 280,
    loop: true,
  },
  finance: {
    id: 'finance',
    src: `${base}/finance.json`,
    label: 'Finance — controlled processes and records',
    width: 400,
    height: 280,
    loop: true,
  },
  travel: {
    id: 'travel',
    src: `${base}/travel.json`,
    label: 'Travel — bookings and coordination',
    width: 400,
    height: 280,
    loop: true,
  },
  hospitality: {
    id: 'hospitality',
    src: `${base}/hospitality.json`,
    label: 'Hospitality — reservations and operations',
    width: 400,
    height: 280,
    loop: true,
  },
  logistics: {
    id: 'logistics',
    src: `${base}/logistics.json`,
    label: 'Logistics — tracking and delivery',
    width: 400,
    height: 280,
    loop: true,
  },
  'principle-business-first': {
    id: 'principle-business-first',
    src: `${base}/principle-business-first.json`,
    label: 'Business goals come before tools',
    width: 360,
    height: 240,
    loop: true,
  },
  'principle-built-to-last': {
    id: 'principle-built-to-last',
    src: `${base}/principle-built-to-last.json`,
    label: 'Built to last — stable systems',
    width: 360,
    height: 240,
    loop: true,
  },
  'principle-less-busywork': {
    id: 'principle-less-busywork',
    src: `${base}/principle-less-busywork.json`,
    label: 'Less busywork through automation',
    width: 360,
    height: 240,
    loop: true,
  },
  'principle-honest-communication': {
    id: 'principle-honest-communication',
    src: `${base}/principle-honest-communication.json`,
    label: 'Honest, visible communication',
    width: 360,
    height: 240,
    loop: true,
  },
  'principle-stay-after-launch': {
    id: 'principle-stay-after-launch',
    src: `${base}/principle-stay-after-launch.json`,
    label: 'Support remains after launch',
    width: 360,
    height: 240,
    loop: true,
  },
  'principle-evolve': {
    id: 'principle-evolve',
    src: `${base}/principle-evolve.json`,
    label: 'Systems evolve with your business',
    width: 360,
    height: 240,
    loop: true,
  },
};

export const wuvJourneyAnimationIds = ['listen', 'plan', 'build', 'launch', 'grow'] as const;

export const wuvIndustryAnimationIds = [
  'healthcare',
  'education',
  'finance',
  'travel',
  'hospitality',
  'logistics',
] as const;

export type WuvIndustryAnimationId = (typeof wuvIndustryAnimationIds)[number];
