/**
 * Capture docs/screenshots/brand-logo-application.jpg — the approved logo in
 * the places the site actually uses it (header, footer lockup, ABOUT mark,
 * mobile header, favicon sizes).
 *
 * Usage:
 *   npm run preview -- --port 4321   # in another shell
 *   node scripts/screenshot-brand-application.mjs
 *
 * If Playwright's bundled browser is unavailable:
 *   PLAYWRIGHT_CHROMIUM_EXECUTABLE=/path/to/chrome node scripts/screenshot-brand-application.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const baseUrl = process.env.SITE_URL ?? 'http://127.0.0.1:4321';
const launchOptions = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE
  ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE }
  : {};

const browser = await chromium.launch(launchOptions);
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

/** @type {[string, string, Buffer | null, string?, boolean?][]} caption, theme, png, html, wide */
const tiles = [];
const shot = async (label, theme, fn, wide = false) => tiles.push([label, theme, await fn(), undefined, wide]);

await page.goto(baseUrl + '/', { waitUntil: 'networkidle' });
await shot('Header 标记 · 1440', 'dark', () => page.screenshot({ clip: { x: 0, y: 0, width: 1440, height: 84 } }), true);

const footer = page.locator('.footer-brand');
await footer.scrollIntoViewIfNeeded();
await page.waitForTimeout(300);
await shot('Footer 横向组合 lockup', 'dark', () => footer.screenshot(), true);

await page.goto(baseUrl + '/about/', { waitUntil: 'networkidle' });
const mark = page.locator('.about-system-mark');
await mark.scrollIntoViewIfNeeded();
await page.waitForTimeout(300);
await shot('ABOUT · Z-Grid 标志（浅底）', 'light', () => mark.screenshot(), true);

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(baseUrl + '/', { waitUntil: 'networkidle' });
await shot('Header 标记 · 390', 'dark', () => page.screenshot({ clip: { x: 0, y: 0, width: 390, height: 72 } }));

const icon = (f, size) =>
  `<img src="data:image/png;base64,${fs.readFileSync(path.join(root, 'public', f)).toString('base64')}" width="${size}" height="${size}" style="display:inline-block;margin-right:12px">`;
tiles.push([
  'favicon 64 / 32 / 16 + app icon',
  'checker',
  null,
  `${icon('favicon-32.png', 64)}${icon('favicon-32.png', 32)}${icon('favicon-32.png', 16)}${icon('brand/zhubao-appicon-512.png', 72)}`,
]);

const bg = {
  dark: 'background:#0B1D33',
  light: 'background:#F7FAFF;color:#101828',
  checker:
    'background-color:#1a1f28;background-image:linear-gradient(45deg,#242a34 25%,transparent 25%,transparent 75%,#242a34 75%),linear-gradient(45deg,#242a34 25%,#1a1f28 25%,#1a1f28 75%,#242a34 75%);background-size:18px 18px;background-position:0 0,9px 9px',
};

const cells = tiles.map(([label, theme, buffer, html, wide]) => {
  const body = buffer
    ? `<img src="data:image/png;base64,${buffer.toString('base64')}">`
    : html;
  const span = wide ? 'grid-column:span 2;' : '';
  return `<div class="cell" style="${bg[theme]};${span}"><div class="inner">${body}</div><div class="cap">${label}</div></div>`;
});

const sheet = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><style>
  body{margin:0;font:11px/1.4 ui-monospace,monospace;background:#07111F;color:#94A3B8;padding:24px}
  h1{font-size:15px;color:#F7FAFF;letter-spacing:.2em;margin:0 0 6px}
  p.sub{margin:0 0 18px;font-size:10px}
  .grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
  .cell{border:1px solid rgba(247,250,255,.12);border-radius:6px;padding:12px}
  .cap{margin-top:10px;font-size:9.5px;letter-spacing:.04em;opacity:.85}
  .inner{display:flex;align-items:center;justify-content:center;overflow:hidden}
  .inner img{max-width:100%}
</style></head><body>
<h1>ZHUBAO · LOGO IN APPLICATION — MIDNIGHT SIGNAL V2.2</h1>
<p class="sub">标志资产切自定稿效果图（scripts/slice-logo.mjs）；此表由 scripts/screenshot-brand-application.mjs 从预览站点生成。</p>
<div class="grid">${cells.join('')}</div>
</body></html>`;

const sheetPage = await browser.newPage({ viewport: { width: 1240, height: 900 } });
await sheetPage.setContent(sheet, { waitUntil: 'networkidle' });
await sheetPage.screenshot({
  path: path.join(root, 'docs/screenshots/brand-logo-application.jpg'),
  fullPage: true,
  type: 'jpeg',
  quality: 88,
});
await browser.close();
console.log('brand-logo-application.jpg captured');
