/**
 * Capture docs/screenshots/brand-logo-sheet.jpg — the brand asset contact sheet.
 *
 * Shows the sliced production assets (public/brand/*.png) on both the midnight
 * and arctic backgrounds, plus the hand-built vector family (public/brand/vector)
 * and the derived icon set.
 *
 * Usage: PLAYWRIGHT_CHROMIUM_EXECUTABLE=... node scripts/screenshot-brand-sheet.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const brand = (f) => path.join(root, 'public/brand', f);
const pub = (f) => path.join(root, 'public', f);

const png = (f) => `<img src="data:image/png;base64,${fs.readFileSync(brand(f)).toString('base64')}">`;
const vec = (f) => `<img src="data:image/svg+xml;base64,${fs.readFileSync(brand('vector/' + f)).toString('base64')}">`;
const icon = (f, size) =>
  `<img src="data:image/png;base64,${fs.readFileSync(pub(f)).toString('base64')}" width="${size}" height="${size}" style="display:inline-block;margin-right:10px">`;

const cells = [
  ['symbol · 切图主资产（深底）', png('zhubao-symbol.png'), 'checker'],
  ['symbol · 切图主资产（浅底）', png('zhubao-symbol.png'), 'light'],
  ['horizontal · 横向组合（切图）', png('zhubao-horizontal.png'), 'checker'],
  ['stacked · 纵向组合（切图）', png('zhubao-stacked.png'), 'checker'],
  ['white · 反白版（深底专用）', png('zhubao-white.png'), 'dark'],
  ['mono · 单色版（黑，浅底）', png('zhubao-mono.png'), 'light'],
  ['mono-reverse · 单色反白（白，深底）', png('zhubao-mono-reverse.png'), 'dark'],
  ['app icon 512（PWA / 桌面）', png('zhubao-appicon-512.png'), 'checker'],
  ['avatar 1024（社交头像）', png('zhubao-avatar-1024.png'), 'dark'],
  ['favicon 64 / 32 / 16', `${icon('favicon-32.png', 64)}${icon('favicon-32.png', 32)}${icon('favicon-32.png', 16)}`, 'dark'],
  ['vector · 矢量备份（symbol / white / mono）', `${vec('zhubao-symbol.svg')}${vec('zhubao-white.svg')}`, 'checker'],
  ['vector · 矢量备份（horizontal / stacked）', vec('zhubao-horizontal.svg'), 'light'],
];

const bg = {
  dark: 'background:#0B1D33',
  light: 'background:#F7FAFF;color:#101828',
  checker:
    'background-color:#1a1f28;background-image:linear-gradient(45deg,#242a34 25%,transparent 25%,transparent 75%,#242a34 75%),linear-gradient(45deg,#242a34 25%,#1a1f28 25%,#1a1f28 75%,#242a34 75%);background-size:18px 18px;background-position:0 0,9px 9px',
};

const html = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><style>
  body{margin:0;font:11px/1.4 ui-monospace,monospace;background:#07111F;color:#94A3B8;padding:24px}
  h1{font-size:15px;color:#F7FAFF;letter-spacing:.2em;margin:0 0 6px}
  p.sub{margin:0 0 18px;font-size:10px}
  .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
  .cell{border:1px solid rgba(247,250,255,.12);padding:12px;border-radius:6px}
  .cap{margin-top:10px;font-size:9.5px;letter-spacing:.04em;opacity:.85}
  .inner{display:flex;align-items:center;justify-content:center;min-height:170px;gap:10px}
  .inner img{max-height:170px;max-width:100%}
</style></head><body>
<h1>ZHUBAO · Z-GRID BRAND ASSETS — MIDNIGHT SIGNAL V2.2</h1>
<p class="sub">生产资产切自 docs/brand-identity-board.png（scripts/slice-logo.mjs）；public/brand/vector/ 为矢量备份。</p>
<div class="grid">${cells
  .map(([cap, body, theme]) => `<div class="cell" style="${bg[theme]}"><div class="inner">${body}</div><div class="cap">${cap}</div></div>`)
  .join('')}</div>
</body></html>`;

const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE || undefined,
});
const page = await browser.newPage({ viewport: { width: 1240, height: 900 } });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.screenshot({ path: path.join(root, 'docs/screenshots/brand-logo-sheet.jpg'), fullPage: true, type: 'jpeg', quality: 88 });
await browser.close();
console.log('brand-logo-sheet.jpg captured');
