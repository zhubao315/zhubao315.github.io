/**
 * Recapture the documentation screenshots in docs/screenshots/.
 *
 * The Playwright suite covers behaviour; these files are the visual record
 * referenced by docs/test-report.md. Reveal animations are triggered by a
 * scroll pass first, so full-page captures do not show empty sections.
 *
 * Usage:
 *   npm run preview -- --port 4321   # in another shell
 *   node scripts/capture-screenshots.mjs
 *
 * If Playwright's bundled browser is unavailable, point it at a local build:
 *   PLAYWRIGHT_CHROMIUM_EXECUTABLE=/path/to/chrome node scripts/capture-screenshots.mjs
 */
import { chromium } from 'playwright';

const baseUrl = process.env.SITE_URL ?? 'http://127.0.0.1:4321';
const outDir = new URL('../docs/screenshots/', import.meta.url).pathname;

const launchOptions = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE
  ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE }
  : {};

/** @type {{ name: string, route: string, width: number, fullPage?: boolean, menu?: boolean }[]} */
const shots = [
  { name: 'home', route: '/', width: 1440, fullPage: true },
  { name: 'home-mobile', route: '/', width: 390, fullPage: true },
  { name: 'home-1440-above-the-fold', route: '/', width: 1440 },
  { name: 'home-768-above-the-fold', route: '/', width: 768 },
  { name: 'home-390-above-the-fold', route: '/', width: 390 },
  { name: 'home-390-menu', route: '/', width: 390, menu: true },
  { name: 'work', route: '/work/', width: 1440, fullPage: true },
  { name: 'work-mobile', route: '/work/', width: 390, fullPage: true },
  { name: 'think', route: '/think/', width: 1440, fullPage: true },
  { name: 'think-mobile', route: '/think/', width: 390, fullPage: true },
  { name: 'explore', route: '/explore/', width: 1440, fullPage: true },
  { name: 'explore-mobile', route: '/explore/', width: 390, fullPage: true },
  { name: 'about', route: '/about/', width: 1440, fullPage: true },
  { name: 'about-mobile', route: '/about/', width: 390, fullPage: true },
  { name: 'project-mbti64', route: '/work/mbti64/', width: 1440, fullPage: true },
  { name: 'project-mbti64-mobile', route: '/work/mbti64/', width: 390, fullPage: true },
  { name: 'legacy-hello-world', route: '/2022-07-05/hello-world/', width: 1440, fullPage: true },
  { name: 'legacy-mobile', route: '/2022-07-05/hello-world/', width: 390, fullPage: true },
  { name: '404', route: '/definitely-not-a-page/', width: 1440, fullPage: true },
  { name: '404-mobile', route: '/definitely-not-a-page/', width: 390, fullPage: true },
];

const widths = [1440, 1280, 768, 390, 375];
const routes = ['/', '/work/', '/think/', '/explore/', '/about/', '/work/mbti64/', '/2022-07-05/hello-world/'];

const browser = await chromium.launch(launchOptions);
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

const reveal = async () => {
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < height; y += 600) {
    await page.evaluate((value) => window.scrollTo(0, value), y);
    await page.waitForTimeout(90);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(250);
};

const overflow = async () =>
  page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);

console.log('route overflow (px) at 1440 / 1280 / 768 / 390 / 375');
for (const route of routes) {
  const results = [];
  for (const width of widths) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(baseUrl + route, { waitUntil: 'networkidle' });
    await page.waitForTimeout(250);
    results.push(await overflow());
  }
  console.log(`  ${route}  ${results.join(' / ')}`);
}

for (const shot of shots) {
  await page.setViewportSize({ width: shot.width, height: shot.width < 500 ? 844 : 1000 });
  await page.goto(baseUrl + shot.route, { waitUntil: 'networkidle' });
  await page.waitForTimeout(350);
  await reveal();
  if (shot.menu) {
    await page.locator('details.mobile-menu summary').click();
    await page.waitForTimeout(350);
  }
  await page.screenshot({
    path: `${outDir}${shot.name}.jpg`,
    fullPage: Boolean(shot.fullPage) && !shot.menu,
    type: 'jpeg',
    quality: 82,
  });
  console.log(`captured ${shot.name}.jpg`);
}

await browser.close();
