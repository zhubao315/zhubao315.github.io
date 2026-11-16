import { chromium } from 'playwright';
const url = process.argv[2];
const out = process.argv[3];
const widths = (process.argv[4] || '1440,390').split(',').map(Number);
const browser = await chromium.launch();
for (const w of widths) {
  const page = await browser.newPage({ viewport: { width: w, height: w > 500 ? 1000 : 844 }, deviceScaleFactor: 1 });
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 120)); });
  page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message.slice(0, 120)));
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 }).catch((e) => errors.push('NAV ' + e.message.slice(0, 80)));
  await page.evaluate(async () => { await document.fonts.ready; }).catch(() => {});
  await page.waitForTimeout(1200);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth).catch(() => -1);
  const file = `${out}-${w}.png`;
  await page.screenshot({ path: file, fullPage: false });
  console.log(w, 'overflow', overflow, 'errors', JSON.stringify(errors.slice(0, 4)));
  await page.close();
}
await browser.close();
