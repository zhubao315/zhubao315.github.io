import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');
const outputDir = path.join(publicDir, 'images');
fs.mkdirSync(outputDir, { recursive: true });

const font = (packagePath) => {
  const file = path.join(root, 'node_modules', packagePath);
  return `data:font/woff2;base64,${fs.readFileSync(file).toString('base64')}`;
};

const manrope = font('@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2');
const instrument = font('@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2');

const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#0B1D33"/>
  <path d="M15 17H49L15 47H49" fill="none" stroke="#F7F3EA" stroke-width="7" stroke-linejoin="miter"/>
  <rect x="11" y="13" width="8" height="8" fill="#F7F3EA"/>
  <rect x="45" y="13" width="8" height="8" fill="#FBBF24"/>
  <rect x="11" y="43" width="8" height="8" fill="#F7F3EA"/>
  <rect x="45" y="43" width="8" height="8" fill="#F7F3EA"/>
</svg>`;

fs.writeFileSync(path.join(publicDir, 'favicon.svg'), `${iconSvg}\n`);

const iconPngs = await Promise.all([
  sharp(Buffer.from(iconSvg)).resize(32, 32).png().toBuffer(),
  sharp(Buffer.from(iconSvg)).resize(180, 180).png().toBuffer(),
  sharp(Buffer.from(iconSvg)).resize(192, 192).png().toBuffer(),
  sharp(Buffer.from(iconSvg)).resize(512, 512).png().toBuffer(),
]);
fs.writeFileSync(path.join(publicDir, 'favicon-32.png'), iconPngs[0]);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), iconPngs[1]);
fs.writeFileSync(path.join(publicDir, 'icon-192.png'), iconPngs[2]);
fs.writeFileSync(path.join(publicDir, 'icon-512.png'), iconPngs[3]);

// Wrap the 32px PNG in a single-entry ICO container for legacy clients.
const png32 = iconPngs[0];
const ico = Buffer.alloc(22 + png32.length);
ico.writeUInt16LE(0, 0);
ico.writeUInt16LE(1, 2);
ico.writeUInt16LE(1, 4);
ico.writeUInt8(32, 6);
ico.writeUInt8(32, 7);
ico.writeUInt8(0, 8);
ico.writeUInt8(0, 9);
ico.writeUInt16LE(1, 10);
ico.writeUInt16LE(32, 12);
ico.writeUInt32LE(png32.length, 14);
ico.writeUInt32LE(22, 18);
png32.copy(ico, 22);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), ico);

const manifest = {
  name: 'ZHUBAO · Personal Brand & Digital Portfolio',
  short_name: 'ZHUBAO',
  description: 'Build systems, engineer knowledge, measure life, create things — the personal brand and digital portfolio of ZHUBAO.',
  start_url: '/',
  display: 'standalone',
  background_color: '#F7F3EA',
  theme_color: '#0B1D33',
  lang: 'zh-CN',
  icons: [
    { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  ],
};
fs.writeFileSync(path.join(publicDir, 'site.webmanifest'), `${JSON.stringify(manifest, null, 2)}\n`);

const ogHtml = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
@font-face { font-family: Manrope; src: url(${manrope}) format('woff2'); font-weight: 200 800; font-display: block; }
@font-face { font-family: Instrument; src: url(${instrument}) format('woff2'); font-style: italic; font-weight: 400; font-display: block; }
* { box-sizing: border-box; margin: 0; }
html, body { width: 1200px; height: 630px; }
body {
  display: flex; flex-direction: column;
  background: #F7F3EA; color: #0B1D33;
  font-family: Manrope, 'Noto Sans CJK SC', sans-serif;
  padding: 30px 42px 26px;
  overflow: hidden;
  position: relative;
}
body::before {
  content: ''; position: fixed; inset: 0; pointer-events: none; opacity: .05;
  background-image: radial-gradient(#0B1D33 .7px, transparent .7px);
  background-size: 8px 8px;
}
body::after {
  content: ''; position: absolute; right: -90px; bottom: -120px;
  width: 420px; height: 420px; border: 1px solid rgba(11,29,51,.12);
  transform: rotate(18deg);
}
.top { display: flex; justify-content: space-between; align-items: center; padding-bottom: 14px; border-bottom: 1px solid rgba(11,29,51,.2); font: 600 11px/1.4 monospace; letter-spacing: .15em; text-transform: uppercase; }
.brand { display: flex; gap: 12px; align-items: center; }
.mark { width: 34px; height: 34px; display: block; }
.mark svg { width: 34px; height: 34px; display: block; }
.main { flex: 1; display: grid; grid-template-columns: 1fr 316px; gap: 42px; padding: 34px 0 26px; }
.eyebrow { font: 500 10px/1.4 monospace; letter-spacing: .13em; text-transform: uppercase; color: #5A697D; }
h1 { margin-top: 15px; font-size: 69px; line-height: .9; font-weight: 700; letter-spacing: -.072em; }
h1 em { font-family: Instrument, 'Noto Serif CJK SC', serif; font-weight: 400; letter-spacing: -.03em; }
.lede { max-width: 600px; margin-top: 20px; font-size: 16px; line-height: 1.65; color: #465166; }
.tags { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 18px; }
.tags span { border: 1px solid rgba(11,29,51,.22); padding: 5px 9px; font: 500 9.5px/1.4 monospace; letter-spacing: .055em; color: #5A697D; text-transform: uppercase; }
.panel { position: relative; display: flex; flex-direction: column; background: #0B1D33; color: #F7F3EA; padding: 20px; box-shadow: 12px 12px 0 #E7DDCC; z-index: 1; }
.panel-top { display: flex; justify-content: space-between; padding-bottom: 12px; border-bottom: 1px solid rgba(247,243,234,.16); font: 10px/1.4 monospace; letter-spacing: .1em; color: #94A3B8; text-transform: uppercase; }
.panel-list { margin-top: 4px; }
.panel-row { display: grid; grid-template-columns: 24px 1fr auto; gap: 9px; align-items: baseline; padding: 12px 0; border-bottom: 1px solid rgba(247,243,234,.13); }
.panel-row small { color: #94A3B8; font: 9px/1 monospace; }
.panel-row strong { font-size: 11.5px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; }
.panel-row span { display: block; margin-top: 2px; color: #94A3B8; font-size: 9px; letter-spacing: .02em; }
.panel-row i { font-style: normal; color: #FBBF24; font-family: monospace; font-size: 11px; }
.panel-foot { margin-top: auto; padding-top: 14px; border-top: 1px solid rgba(247,243,234,.16); display: flex; justify-content: space-between; color: #94A3B8; font: 8.5px/1.5 monospace; letter-spacing: .08em; }
.bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 13px; border-top: 1px solid rgba(11,29,51,.2); font: 600 10.5px/1.4 monospace; letter-spacing: .12em; text-transform: uppercase; color: #5A697D; }
.bottom strong { color: #0B1D33; font-size: 11.5px; letter-spacing: .14em; }
.status { display: flex; align-items: center; gap: 8px; }
.dot { width: 6px; height: 6px; border-radius: 50%; background: #63D6A3; box-shadow: 0 0 0 4px rgba(99,214,163,.12); }
</style>
</head>
<body>
  <div class="top">
    <div class="brand">
      <span class="mark"><svg viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#0B1D33"/><path d="M15 17H49L15 47H49" fill="none" stroke="#F7F3EA" stroke-width="7" stroke-linejoin="miter"/><rect x="11" y="13" width="8" height="8" fill="#F7F3EA"/><rect x="45" y="13" width="8" height="8" fill="#FBBF24"/><rect x="11" y="43" width="8" height="8" fill="#F7F3EA"/><rect x="45" y="43" width="8" height="8" fill="#F7F3EA"/></svg></span>
      <span>ZHUBAO / PERSONAL BRAND SYSTEM</span>
    </div>
    <span>BEIJING · 39.9°N / 116.4°E</span>
  </div>
  <div class="main">
    <div>
      <p class="eyebrow">Builder · Researcher · Recorder</p>
      <h1>Build <em>systems.</em><br>Engineer <em>knowledge.</em><br>Measure <em>life.</em><br>Create <em>things.</em></h1>
      <p class="lede">把想法变成系统，把知识沉淀为资产，把生活记录成可持续的实践。</p>
      <div class="tags"><span>AI &amp; Agent</span><span>Digital Products</span><span>Knowledge Systems</span><span>Quantified Life</span><span>Creative Work</span></div>
    </div>
    <aside class="panel">
      <div class="panel-top"><span>Z-Grid</span><span>04 / directions</span></div>
      <div class="panel-list">
        <div class="panel-row"><small>01</small><div><strong>Build</strong><span>构建系统</span></div><i>↗</i></div>
        <div class="panel-row"><small>02</small><div><strong>Think</strong><span>工程知识</span></div><i>↗</i></div>
        <div class="panel-row"><small>03</small><div><strong>Measure</strong><span>量化生活</span></div><i>↗</i></div>
        <div class="panel-row"><small>04</small><div><strong>Create</strong><span>创造作品</span></div><i>↗</i></div>
      </div>
      <div class="panel-foot"><span>BUILDING IN PUBLIC</span><span>2026 / 11</span></div>
    </aside>
  </div>
  <div class="bottom">
    <span class="status"><span class="dot"></span>KEEP BUILDING / KEEP MEASURING</span>
    <strong>ZHUBAO.GITHUB.IO</strong>
    <span>61 PUBLIC REPOS · LAST VERIFIED 2026-11-11</span>
  </div>
</body>
</html>`;

const browser = await chromium.launch(
  process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE
    ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE }
    : {},
);
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(ogHtml, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: path.join(publicDir, 'og-default.png'), type: 'png' });
await browser.close();

console.log('Generated favicon.ico, favicon.svg, PNG icons, site.webmanifest, og-default.png');
