/**
 * DEPRECATED — not used in production UI.
 * Previously generated minimal placeholder Lottie JSON files.
 * Kept only for reference; do not wire output into the page.
 * Run: node scripts/generate-wuv-lottie.mjs
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '../public/animations/why-uandv');
mkdirSync(outDir, { recursive: true });

const BRAND = [0.486, 0.227, 0.929, 1]; // #7C3AED
const NAVY = [0.118, 0.227, 0.541, 1]; // #1E3A8A
const SKY = [0.055, 0.647, 0.914, 1]; // #0EA5E9
const GREEN = [0.133, 0.773, 0.369, 1];
const RED = [0.937, 0.267, 0.267, 1];
const GRAY = [0.796, 0.835, 0.882, 1];

function rectLayer(name, x, y, w, h, color, round = 8, anim = null) {
  return {
    ddd: 0,
    ind: 1,
    ty: 4,
    nm: name,
    sr: 1,
    ks: {
      o: { a: 0, k: 100 },
      r: { a: 0, k: 0 },
      p: anim?.p ?? { a: 0, k: [x, y, 0] },
      a: { a: 0, k: [0, 0, 0] },
      s: anim?.s ?? { a: 0, k: [100, 100, 100] },
    },
    ao: 0,
    shapes: [
      {
        ty: 'rc',
        d: 1,
        s: { a: 0, k: [w, h] },
        p: { a: 0, k: [0, 0] },
        r: { a: 0, k: round },
        nm: 'Rect',
      },
      { ty: 'fl', c: { a: 0, k: color }, o: { a: 0, k: 100 }, nm: 'Fill' },
    ],
    ip: 0,
    op: 120,
    st: 0,
    bm: 0,
  };
}

function circleLayer(name, x, y, r, color, pulse = false) {
  return {
    ddd: 0,
    ind: 1,
    ty: 4,
    nm: name,
    sr: 1,
    ks: {
      o: { a: 0, k: 100 },
      r: { a: 0, k: 0 },
      p: { a: 0, k: [x, y, 0] },
      a: { a: 0, k: [0, 0, 0] },
      s: pulse
        ? {
            a: 1,
            k: [
              { t: 0, s: [90, 90, 100] },
              { t: 60, s: [110, 110, 100] },
              { t: 120, s: [90, 90, 100] },
            ],
          }
        : { a: 0, k: [100, 100, 100] },
    },
    ao: 0,
    shapes: [
      { ty: 'el', s: { a: 0, k: [r * 2, r * 2] }, p: { a: 0, k: [0, 0] }, nm: 'Ellipse' },
      { ty: 'fl', c: { a: 0, k: color }, o: { a: 0, k: 100 }, nm: 'Fill' },
    ],
    ip: 0,
    op: 120,
    st: 0,
    bm: 0,
  };
}

function lottie(w, h, layers, op = 120) {
  return { v: '5.7.4', fr: 30, ip: 0, op, w, h, nm: 'wuv', ddd: 0, assets: [], layers };
}

function write(name, data) {
  writeFileSync(join(outDir, `${name}.json`), JSON.stringify(data));
}

// Partnership — nodes along a path with gentle pulse
write(
  'partnership',
  lottie(480, 320, [
    rectLayer('platform', 240, 260, 360, 40, [1, 1, 1, 1], 4),
    circleLayer('owner', 60, 180, 24, NAVY, true),
    circleLayer('n1', 120, 180, 18, BRAND, true),
    circleLayer('n2', 180, 180, 18, BRAND, true),
    circleLayer('n3', 240, 180, 18, SKY, true),
    circleLayer('n4', 300, 180, 18, SKY, true),
    circleLayer('n5', 360, 180, 18, NAVY, true),
    circleLayer('n6', 420, 160, 20, GREEN, true),
    rectLayer('ui', 80, 60, 140, 50, [1, 1, 1, 1]),
  ]),
);

// Broken vendor — warning pulse then green
write(
  'broken-vendor',
  lottie(480, 300, [
    rectLayer('panel', 240, 80, 300, 50, [1, 1, 1, 1]),
    circleLayer('warn', 240, 180, 30, RED, true),
    rectLayer('gap', 240, 240, 200, 8, GRAY),
  ], 90),
);

// Journey stages
const stageColors = [BRAND, NAVY, SKY, GREEN, BRAND];
['listen', 'plan', 'build', 'launch', 'grow'].forEach((name, i) => {
  write(
    name,
    lottie(400, 280, [
      rectLayer('card', 200, 140, 180, 120, [1, 1, 1, 1]),
      circleLayer('icon', 200, 120, 28, stageColors[i], true),
      rectLayer('bar1', 200, 170, 100, 8, stageColors[i]),
      rectLayer('bar2', 200, 190, 130, 6, GRAY),
    ], 90),
  );
});

// Accountability workflow
write(
  'accountability',
  lottie(520, 260, [
    rectLayer('track', 260, 130, 440, 6, GRAY, 3),
    rectLayer('step1', 80, 130, 50, 50, BRAND, 8),
    rectLayer('step2', 160, 130, 50, 50, BRAND, 8),
    rectLayer('step3', 240, 130, 50, 50, SKY, 8),
    rectLayer('step4', 320, 130, 50, 50, SKY, 8),
    rectLayer('step5', 400, 130, 50, 50, NAVY, 8),
    circleLayer('dot', 80, 130, 8, GREEN, true),
  ], 100),
);

// Industries
const industryColors = [SKY, BRAND, NAVY, BRAND, BRAND, SKY];
const industryNames = ['healthcare', 'education', 'finance', 'travel', 'hospitality', 'logistics'];
industryNames.forEach((name, i) => {
  write(
    name,
    lottie(400, 280, [
      rectLayer('scene', 200, 140, 200, 140, [1, 1, 1, 1]),
      circleLayer('icon', 200, 120, 32, industryColors[i], true),
      rectLayer('ui', 200, 180, 120, 60, [0.973, 0.98, 0.988, 1]),
    ]),
  );
});

// Principles
const principleFiles = [
  'principle-business-first',
  'principle-built-to-last',
  'principle-less-busywork',
  'principle-honest-communication',
  'principle-stay-after-launch',
  'principle-evolve',
];
principleFiles.forEach((name, i) => {
  write(
    name,
    lottie(360, 240, [
      rectLayer('base', 180, 120, 160, 100, [1, 1, 1, 1]),
      circleLayer('focus', 180, 100, 24, [BRAND, NAVY, SKY, BRAND, GREEN, NAVY][i], true),
    ]),
  );
});

console.log(`Generated ${industryNames.length + principleFiles.length + 9} animations in ${outDir}`);
