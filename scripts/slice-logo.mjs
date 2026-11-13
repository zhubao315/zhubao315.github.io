/**
 * Slice the approved ZHUBAO identity board into production brand assets.
 *
 * Source: the 1536x1024 board PNG (docs/brand-identity-board.png).
 * Output (public/brand/): PNG slices with the midnight background keyed to
 * transparency + same-named SVG wrappers (raster-embedded), the favicon/app
 * icon set (symbol composited onto the navy chip), avatar and ICO.
 *
 * The hand-built vector edition stays in public/brand/vector/ (see
 * scripts/build-brand-assets.py) and remains the source for print/docs.
 *
 * Usage: node scripts/slice-logo.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const board = path.join(root, 'docs/brand-identity-board.png');
const outDir = path.join(root, 'public/brand');
const publicDir = path.join(root, 'public');

const BG = [2, 15, 29]; // board midnight background, sampled
const WHITE_BG = [250, 251, 252];

/** @type {{ name: string, box: { left: number, top: number, width: number, height: number }, key?: 'dark'|'white' }[]} */
const regions = [
  { name: 'zhubao-symbol', box: { left: 137, top: 137, width: 296, height: 265 }, key: 'dark' },
  { name: 'zhubao-horizontal', box: { left: 939, top: 111, width: 492, height: 112 }, key: 'dark' },
  { name: 'zhubao-stacked', box: { left: 610, top: 296, width: 172, height: 157 }, key: 'dark' },
  { name: 'zhubao-white', box: { left: 1282, top: 300, width: 173, height: 153 }, key: 'dark' },
  { name: 'zhubao-mono', box: { left: 893, top: 313, width: 126, height: 131 }, key: 'mono' },
  { name: 'zhubao-mono-reverse', box: { left: 1037, top: 311, width: 130, height: 135 }, key: 'mark-white' },
];

const scaleUp = 2;

/** Key out backgrounds. alpha scales with colour distance so soft shadows fade naturally.
 *  dark        → remove midnight board background
 *  mono        → remove white tile AND midnight corners (keep black mark)
 *  mark-white  → keep only white pixels (white mark on black tile) */
async function keyOut(buffer, info, kind) {
  const { width, height, channels } = info;
  const out = Buffer.from(buffer);
  const ch = channels - 1;
  for (let i = 0; i < out.length; i += channels) {
    const dBG = Math.max(Math.abs(out[i] - BG[0]), Math.abs(out[i + 1] - BG[1]), Math.abs(out[i + 2] - BG[2]));
    const dW = Math.max(Math.abs(out[i] - WHITE_BG[0]), Math.abs(out[i + 1] - WHITE_BG[1]), Math.abs(out[i + 2] - WHITE_BG[2]));
    let a;
    // Subtraction floor kills the board's compression noise, then a soft ramp
    // keeps the mark's own drop shadow semi-transparent.
    if (kind === 'dark') a = Math.max(0, Math.min(255, ((dBG - 12) / 34) * 255));
    else if (kind === 'mono') a = Math.max(0, Math.min(255, ((dW - 14) / 46) * 255)); // black mark on white tile
    else a = Math.max(0, Math.min(255, ((170 - dW) / 110) * 255)); // mark-white: white mark on the black tile
    out[i + ch] = Math.round(a);
  }
  return { data: out, width, height, channels };
}

async function svgWrapper(pngPath, name) {
  const meta = await sharp(pngPath).metadata();
  const b64 = fs.readFileSync(pngPath).toString('base64');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${meta.width}" height="${meta.height}" viewBox="0 0 ${meta.width} ${meta.height}" role="img" aria-label="ZHUBAO"><image href="data:image/png;base64,${b64}" width="${meta.width}" height="${meta.height}"/></svg>\n`;
  fs.writeFileSync(path.join(outDir, `${name}.svg`), svg);
}

const results = [];
for (const { name, box, key } of regions) {
  let img = sharp(board).extract(box).ensureAlpha().resize(box.width * scaleUp, box.height * scaleUp, { kernel: 'lanczos3' });
  if (key) {
    const raw = await img.raw().toBuffer({ resolveWithObject: true });
    const keyed = await keyOut(raw.data, raw.info, key);
    img = sharp(keyed.data, { raw: { width: keyed.width, height: keyed.height, channels: keyed.channels } });
  }
  const pngPath = path.join(outDir, `${name}.png`);
  await img.png().toFile(pngPath);
  await svgWrapper(pngPath, name);
  results.push(name);
}

// ---- app / favicon icon set: symbol on the navy rounded chip (board style)
const symbolPath = path.join(outDir, 'zhubao-symbol.png');
const symbol = sharp(symbolPath).resize(330, null, { fit: 'inside' });
const chip = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512">
    <rect x="1" y="1" width="510" height="510" rx="104" fill="#0B1D33" stroke="#1E3A5C" stroke-width="2"/>
  </svg>`,
);
const master = await sharp(chip)
  .composite([{ input: await symbol.png().toBuffer(), gravity: 'center' }])
  .png()
  .toBuffer();
fs.writeFileSync(path.join(outDir, 'zhubao-appicon-512.png'), master);

const sizes = { 'favicon-32.png': 32, 'apple-touch-icon.png': 180, 'icon-192.png': 192, 'icon-512.png': 512 };
const pngs = {};
for (const [file, size] of Object.entries(sizes)) {
  pngs[file] = await sharp(master).resize(size, size).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, file), pngs[file]);
}

const png256 = await sharp(master).resize(256, 256).png().toBuffer();
fs.writeFileSync(
  path.join(publicDir, 'favicon.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><image href="data:image/png;base64,${png256.toString('base64')}" width="256" height="256"/></svg>\n`,
);

// ---- social avatar: mark centred on the midnight canvas
const avatarMark = await sharp(symbolPath).resize(620, null, { fit: 'inside' }).png().toBuffer();
await sharp({ create: { width: 1024, height: 1024, channels: 3, background: '#07111F' } })
  .composite([{ input: avatarMark, gravity: 'center' }])
  .png()
  .toFile(path.join(outDir, 'zhubao-avatar-1024.png'));

// ---- ICO (single 32px entry)
const png32 = pngs['favicon-32.png'];
const ico = Buffer.alloc(22 + png32.length);
ico.writeUInt16LE(0, 0);
ico.writeUInt16LE(1, 2);
ico.writeUInt16LE(1, 4);
ico.writeUInt8(32, 6);
ico.writeUInt8(32, 7);
ico.writeUInt16LE(1, 10);
ico.writeUInt16LE(32, 12);
ico.writeUInt32LE(png32.length, 14);
ico.writeUInt32LE(22, 18);
png32.copy(ico, 22);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), ico);

console.log('sliced:', results.join(', '));
console.log('icons: favicon.svg/.ico/32, apple-touch-180, icon-192/512, avatar-1024, appicon-512');
