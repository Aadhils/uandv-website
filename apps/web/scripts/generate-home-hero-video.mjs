/**
 * Generates a lightweight looping Home hero background video.
 * Abstract U&V cinematic journey (navy / ultraviolet) — no live-action stock.
 *
 * Usage: node scripts/generate-home-hero-video.mjs
 */
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT_DIR = join(ROOT, 'public', 'videos');
const FRAME_DIR = join(ROOT, '.tmp-hero-frames');

const W = 1280;
const H = 720;
const FPS = 24;
const DURATION = 12;
const TOTAL = FPS * DURATION;

const NAVY = [8, 21, 47];
const DEEP = [16, 42, 86];
const VIOLET = [124, 58, 237];
const ULTRA = [91, 33, 182];
const GLOW = [196, 181, 253];
const MINT = [167, 139, 250];

function clamp(v, a = 0, b = 255) {
  return Math.max(a, Math.min(b, v));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function lerp3(a, b, t) {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

function smoothstep(t) {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
}

function fract(n) {
  return n - Math.floor(n);
}

function hash(n) {
  return fract(Math.sin(n * 127.1) * 43758.5453);
}

function fillBase(buf, c) {
  for (let i = 0; i < buf.length; i += 3) {
    buf[i] = c[0];
    buf[i + 1] = c[1];
    buf[i + 2] = c[2];
  }
}

function addOrb(buf, cx, cy, radius, color, intensity) {
  const rMax = Math.ceil(radius);
  const x0 = Math.max(0, Math.floor(cx - rMax));
  const x1 = Math.min(W - 1, Math.ceil(cx + rMax));
  const y0 = Math.max(0, Math.floor(cy - rMax));
  const y1 = Math.min(H - 1, Math.ceil(cy + rMax));
  const invR = 1 / Math.max(1, radius);

  for (let y = y0; y <= y1; y++) {
    const dy = y - cy;
    for (let x = x0; x <= x1; x++) {
      const dx = x - cx;
      const d = Math.sqrt(dx * dx + dy * dy) * invR;
      if (d >= 1) continue;
      const a = (1 - d) * (1 - d) * intensity;
      const i = (y * W + x) * 3;
      buf[i] = clamp(buf[i] + color[0] * a);
      buf[i + 1] = clamp(buf[i + 1] + color[1] * a);
      buf[i + 2] = clamp(buf[i + 2] + color[2] * a);
    }
  }
}

function addRing(buf, cx, cy, radius, thickness, color, intensity) {
  const rMax = Math.ceil(radius + thickness);
  const x0 = Math.max(0, Math.floor(cx - rMax));
  const x1 = Math.min(W - 1, Math.ceil(cx + rMax));
  const y0 = Math.max(0, Math.floor(cy - rMax));
  const y1 = Math.min(H - 1, Math.ceil(cy + rMax));

  for (let y = y0; y <= y1; y++) {
    const dy = y - cy;
    for (let x = x0; x <= x1; x++) {
      const dx = x - cx;
      const d = Math.abs(Math.sqrt(dx * dx + dy * dy) - radius);
      if (d > thickness) continue;
      const a = (1 - d / thickness) * intensity;
      const i = (y * W + x) * 3;
      buf[i] = clamp(buf[i] + color[0] * a);
      buf[i + 1] = clamp(buf[i + 1] + color[1] * a);
      buf[i + 2] = clamp(buf[i + 2] + color[2] * a);
    }
  }
}

function addLine(buf, x0, y0, x1, y1, color, intensity, thickness = 1.2) {
  const steps = Math.max(2, Math.ceil(Math.hypot(x1 - x0, y1 - y0)));
  for (let s = 0; s <= steps; s++) {
    const t = s / steps;
    const x = lerp(x0, x1, t);
    const y = lerp(y0, y1, t);
    addOrb(buf, x, y, thickness * 3, color, intensity * 0.35);
  }
}

function addGrid(buf, t, strength) {
  const spacing = 72;
  const offset = (t * 40) % spacing;
  for (let x = -spacing; x < W + spacing; x += spacing) {
    const xx = x + offset;
    for (let y = 0; y < H; y += 4) {
      const i = (y * W + Math.floor(xx)) * 3;
      if (xx < 0 || xx >= W) continue;
      buf[i] = clamp(buf[i] + VIOLET[0] * strength * 0.08);
      buf[i + 1] = clamp(buf[i + 1] + VIOLET[1] * strength * 0.08);
      buf[i + 2] = clamp(buf[i + 2] + VIOLET[2] * strength * 0.08);
    }
  }
  for (let y = -spacing; y < H + spacing; y += spacing) {
    const yy = y + offset * 0.6;
    for (let x = 0; x < W; x += 4) {
      if (yy < 0 || yy >= H) continue;
      const i = (Math.floor(yy) * W + x) * 3;
      buf[i] = clamp(buf[i] + ULTRA[0] * strength * 0.07);
      buf[i + 1] = clamp(buf[i + 1] + ULTRA[1] * strength * 0.07);
      buf[i + 2] = clamp(buf[i + 2] + ULTRA[2] * strength * 0.07);
    }
  }
}

function addNodes(buf, t, strength) {
  const nodes = [];
  for (let i = 0; i < 14; i++) {
    const ang = (i / 14) * Math.PI * 2 + t * 0.7;
    const rad = 140 + hash(i + 3) * 220;
    const cx = W * 0.55 + Math.cos(ang) * rad;
    const cy = H * 0.48 + Math.sin(ang) * rad * 0.72;
    nodes.push([cx, cy]);
    addOrb(buf, cx, cy, 10 + hash(i) * 8, GLOW, 0.45 * strength);
    addOrb(buf, cx, cy, 28, VIOLET, 0.12 * strength);
  }
  for (let i = 0; i < nodes.length; i++) {
    const j = (i + 3) % nodes.length;
    addLine(buf, nodes[i][0], nodes[i][1], nodes[j][0], nodes[j][1], MINT, 0.22 * strength, 1);
  }
}

function addWireframes(buf, t, strength) {
  const ox = W * 0.62;
  const oy = H * 0.42;
  for (let i = 0; i < 5; i++) {
    const w = 90 + i * 38;
    const h = 56 + i * 24;
    const pulse = 0.5 + 0.5 * Math.sin(t * Math.PI * 2 + i);
    const a = strength * (0.18 + pulse * 0.12);
    addLine(buf, ox - w / 2, oy - h / 2, ox + w / 2, oy - h / 2, GLOW, a);
    addLine(buf, ox + w / 2, oy - h / 2, ox + w / 2, oy + h / 2, GLOW, a);
    addLine(buf, ox + w / 2, oy + h / 2, ox - w / 2, oy + h / 2, GLOW, a);
    addLine(buf, ox - w / 2, oy + h / 2, ox - w / 2, oy - h / 2, GLOW, a);
  }
}

function addCodeRain(buf, t, strength) {
  for (let col = 0; col < 28; col++) {
    const x = 40 + col * 44 + hash(col) * 20;
    const speed = 40 + hash(col + 9) * 80;
    const head = ((t * speed * 8 + hash(col) * H) % (H + 120)) - 60;
    for (let k = 0; k < 10; k++) {
      const y = head - k * 14;
      if (y < 0 || y >= H || x < 0 || x >= W) continue;
      const a = strength * (1 - k / 10) * 0.35;
      const i = (Math.floor(y) * W + Math.floor(x)) * 3;
      buf[i] = clamp(buf[i] + MINT[0] * a);
      buf[i + 1] = clamp(buf[i + 1] + MINT[1] * a);
      buf[i + 2] = clamp(buf[i + 2] + MINT[2] * a);
    }
  }
}

function addNeural(buf, t, strength) {
  for (let layer = 0; layer < 4; layer++) {
    const x = W * 0.35 + layer * 140;
    for (let n = 0; n < 6; n++) {
      const y = H * 0.22 + n * 80;
      const pulse = 0.55 + 0.45 * Math.sin(t * Math.PI * 4 + layer + n);
      addOrb(buf, x, y, 14, VIOLET, 0.35 * strength * pulse);
      if (layer < 3) {
        for (let n2 = 0; n2 < 6; n2++) {
          const y2 = H * 0.22 + n2 * 80;
          if ((n + n2 + layer) % 2 === 0) {
            addLine(buf, x, y, x + 140, y2, ULTRA, 0.12 * strength * pulse, 0.9);
          }
        }
      }
    }
  }
}

function addLaunch(buf, t, strength) {
  const cx = W * 0.58;
  const cy = H * 0.55 - t * 40;
  addOrb(buf, cx, cy, 160, VIOLET, 0.35 * strength);
  addOrb(buf, cx, cy, 70, GLOW, 0.5 * strength);
  for (let i = 0; i < 6; i++) {
    const ang = -Math.PI / 2 + (i - 2.5) * 0.18;
    addLine(
      buf,
      cx,
      cy,
      cx + Math.cos(ang) * 220,
      cy + Math.sin(ang) * 220,
      MINT,
      0.2 * strength,
      1.4,
    );
  }
}

function addGrowth(buf, t, strength) {
  const cx = W * 0.6;
  const cy = H * 0.62;
  for (let i = 1; i <= 5; i++) {
    addRing(buf, cx, cy, 40 + i * 42 + t * 18, 3.5, lerp3(ULTRA, GLOW, i / 5), 0.22 * strength);
  }
  addOrb(buf, cx, cy - 80 - t * 30, 50, VIOLET, 0.28 * strength);
}

function addPartnership(buf, t, strength) {
  const left = W * 0.42 - 20 * Math.sin(t * Math.PI);
  const right = W * 0.68 + 20 * Math.sin(t * Math.PI);
  const y = H * 0.5;
  addOrb(buf, left, y, 90, ULTRA, 0.35 * strength);
  addOrb(buf, right, y, 90, VIOLET, 0.35 * strength);
  addOrb(buf, (left + right) / 2, y, 70, GLOW, 0.4 * strength);
  addRing(buf, (left + right) / 2, y, 110 + t * 10, 4, GLOW, 0.2 * strength);
}

/** Story weights across 0..1 (loop-friendly: start/end both network-heavy). */
function sceneWeights(u) {
  // Soft overlapping envelopes for continuous journey
  const peaks = [
    0.0, // network
    0.125, // ideas / conversation glow
    0.25, // design
    0.375, // development
    0.5, // AI
    0.625, // launch
    0.75, // growth
    0.875, // partnership
    1.0, // network again
  ];
  const w = new Array(8).fill(0);
  for (let i = 0; i < 8; i++) {
    const d = Math.min(Math.abs(u - peaks[i]), Math.abs(u - peaks[i] - 1), Math.abs(u - peaks[i] + 1));
    w[i] = Math.exp(-Math.pow(d * 9, 2));
  }
  // End blends into start for seamless loop
  w[0] += Math.exp(-Math.pow(Math.min(Math.abs(u - 1), u) * 9, 2)) * 0.85;
  const sum = w.reduce((a, b) => a + b, 0) || 1;
  return w.map((v) => v / sum);
}

function renderFrame(frameIndex) {
  const buf = Buffer.alloc(W * H * 3);
  const u = frameIndex / TOTAL;
  const t = u;
  const loopT = u; // 0..1

  const base = lerp3(NAVY, DEEP, 0.35 + 0.15 * Math.sin(loopT * Math.PI * 2));
  fillBase(buf, base);

  // Ambient cinematic washes
  addOrb(buf, W * 0.2, H * 0.15, 380, ULTRA, 0.18);
  addOrb(buf, W * 0.85, H * 0.75, 420, VIOLET, 0.16);
  addOrb(buf, W * 0.55, H * 0.4, 260, DEEP, 0.2);

  const w = sceneWeights(loopT);

  addGrid(buf, loopT, w[0] * 1.1 + w[3] * 0.35);
  addNodes(buf, loopT, w[0] * 1.2 + w[4] * 0.25);

  // Ideas — converging soft conversation glows
  if (w[1] > 0.02) {
    addOrb(buf, W * 0.4 + Math.sin(loopT * 6) * 20, H * 0.45, 120, GLOW, 0.28 * w[1]);
    addOrb(buf, W * 0.58 - Math.sin(loopT * 6) * 20, H * 0.48, 110, VIOLET, 0.3 * w[1]);
    addOrb(buf, W * 0.49, H * 0.4, 70, MINT, 0.22 * w[1]);
  }

  addWireframes(buf, loopT, w[2]);
  addCodeRain(buf, loopT, w[3]);
  addNeural(buf, loopT, w[4]);
  addLaunch(buf, loopT, w[5]);
  addGrowth(buf, loopT, w[6]);
  addPartnership(buf, loopT, w[7]);

  // Soft vignette for readability under overlays
  for (let y = 0; y < H; y++) {
    const vy = (y / (H - 1)) * 2 - 1;
    for (let x = 0; x < W; x++) {
      const vx = (x / (W - 1)) * 2 - 1;
      const vig = Math.pow(Math.min(1, Math.sqrt(vx * vx * 0.55 + vy * vy * 0.85)), 2.2);
      const i = (y * W + x) * 3;
      const dark = 1 - vig * 0.45;
      buf[i] = clamp(buf[i] * dark);
      buf[i + 1] = clamp(buf[i + 1] * dark);
      buf[i + 2] = clamp(buf[i + 2] * dark);
    }
  }

  return buf;
}

function writePpm(path, buf) {
  const header = Buffer.from(`P6\n${W} ${H}\n255\n`);
  writeFileSync(path, Buffer.concat([header, buf]));
}

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: 'inherit', shell: false });
    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} exited with ${code}`));
    });
  });
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  if (existsSync(FRAME_DIR)) rmSync(FRAME_DIR, { recursive: true, force: true });
  mkdirSync(FRAME_DIR, { recursive: true });

  console.log(`Rendering ${TOTAL} frames (${W}x${H} @ ${FPS}fps, ${DURATION}s)...`);
  const t0 = Date.now();
  for (let i = 0; i < TOTAL; i++) {
    const frame = renderFrame(i);
    writePpm(join(FRAME_DIR, `frame-${String(i).padStart(4, '0')}.ppm`), frame);
    if (i % 24 === 0) console.log(`  frame ${i}/${TOTAL}`);
  }
  console.log(`Frames done in ${((Date.now() - t0) / 1000).toFixed(1)}s`);

  const posterPath = join(OUT_DIR, 'home-hero-story-poster.jpg');
  const mp4Path = join(OUT_DIR, 'home-hero-story.mp4');
  const webmPath = join(OUT_DIR, 'home-hero-story.webm');
  const pattern = join(FRAME_DIR, 'frame-%04d.ppm');

  // Poster from first frame
  await run('ffmpeg', [
    '-y',
    '-i',
    join(FRAME_DIR, 'frame-0000.ppm'),
    '-frames:v',
    '1',
    '-update',
    '1',
    '-q:v',
    '4',
    posterPath,
  ]);

  // H.264 MP4 — hero-bg bitrate, faststart
  await run('ffmpeg', [
    '-y',
    '-framerate',
    String(FPS),
    '-i',
    pattern,
    '-vf',
    'scale=1280:-2,format=yuv420p',
    '-c:v',
    'libx264',
    '-profile:v',
    'main',
    '-pix_fmt',
    'yuv420p',
    '-crf',
    '28',
    '-preset',
    'medium',
    '-movflags',
    '+faststart',
    '-an',
    mp4Path,
  ]);

  // WebM VP9 for better compression where supported
  await run('ffmpeg', [
    '-y',
    '-framerate',
    String(FPS),
    '-i',
    pattern,
    '-vf',
    'scale=1280:-2,format=yuv420p',
    '-c:v',
    'libvpx-vp9',
    '-b:v',
    '0',
    '-crf',
    '34',
    '-row-mt',
    '1',
    '-an',
    webmPath,
  ]);

  rmSync(FRAME_DIR, { recursive: true, force: true });
  console.log('Wrote:');
  console.log(' ', posterPath);
  console.log(' ', mp4Path);
  console.log(' ', webmPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
