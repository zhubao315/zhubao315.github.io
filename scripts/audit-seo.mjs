#!/usr/bin/env node
/**
 * scripts/audit-seo.mjs — repeatable technical SEO / GEO checks over the built site.
 *
 * Reads only `dist/` and `public/robots.txt`. No network calls, no dependencies.
 * Usage: npm run build && npm run test:seo
 * Exit code 1 when any ERROR is found; WARN items are reported but do not fail.
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const SITE_URL = 'https://zhubao315.github.io';
const staleDays = Number(process.env.STALE_DAYS || 180);

const errors = [];
const warnings = [];
const fail = (msg) => errors.push(msg);
const warn = (msg) => warnings.push(msg);

function listFiles(dir) {
  return fs.readdir(dir, { withFileTypes: true }).then(async (entries) => {
    const out = [];
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) out.push(...(await listFiles(full)));
      else if (entry.name.endsWith('.html')) out.push(full);
    }
    return out;
  });
}

function match(text, re) {
  const m = text.match(re);
  return m ? m[1].trim() : null;
}

const htmlFiles = await listFiles(DIST).catch(() => []);
if (!htmlFiles.length) {
  console.error('[seo] no HTML files found in dist/ — run `npm run build` first.');
  process.exit(2);
}

const seenTitles = new Map();
const seenDescriptions = new Map();
const pageRecords = [];

for (const file of htmlFiles) {
  // Search-engine ownership proof files are intentionally minimal; skip them.
  if (/^google[0-9a-f]+\.html$/i.test(path.basename(file))) continue;
  const html = await fs.readFile(file, 'utf8');
  const rel = path.relative(DIST, file).split(path.sep).join('/');
  const route = rel === 'index.html' ? '/' : '/' + rel.replace(/\/index\.html$/, '/').replace(/\.html$/, '/');
  const url = new URL(route, SITE_URL).href;

  const title = match(html, /<title>([\s\S]*?)<\/title>/i);
  const description = match(html, /<meta\s+name="description"\s+content="([^"]*)"/i);
  const canonical = match(html, /<link\s+rel="canonical"\s+href="([^"]*)"/i);
  const robots = match(html, /<meta\s+name="robots"\s+content="([^"]*)"/i);
  const ogTitle = match(html, /<meta\s+property="og:title"\s+content="([^"]*)"/i);
  const twitterCard = match(html, /<meta\s+name="twitter:card"\s+content="([^"]*)"/i);

  if (!title) fail(`${route}: missing <title>`);
  if (!description) fail(`${route}: missing meta description`);
  // noindex pages have no canonical URL (GitHub Pages serves /404.html, not /404/).
  if (/noindex/.test(robots || '')) {
    if (canonical) warn(`${route}: noindex page should not declare a canonical`);
  } else if (!canonical) fail(`${route}: missing canonical link`);
  else if (canonical !== url) fail(`${route}: canonical mismatch (${canonical})`);
  if (!robots) fail(`${route}: missing robots meta`);
  if (!ogTitle) fail(`${route}: missing og:title`);
  if (!twitterCard) fail(`${route}: missing twitter:card`);
  if (title) {
    if (seenTitles.has(title)) fail(`${route}: duplicate title with ${seenTitles.get(title)}`);
    else seenTitles.set(title, route);
  }
  if (description) {
    if (seenDescriptions.has(description)) fail(`${route}: duplicate description with ${seenDescriptions.get(description)}`);
    else seenDescriptions.set(description, route);
  }

  const jsonLd = [...html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  if (!jsonLd.length) fail(`${route}: no JSON-LD found`);
  const seenJsonLd = new Set();
  for (const [, raw] of jsonLd) {
    try {
      const parsed = JSON.parse(raw);
      if (!parsed['@context'] || !parsed['@type']) fail(`${route}: JSON-LD missing @context or @type`);
      const key = JSON.stringify(parsed);
      if (seenJsonLd.has(key)) fail(`${route}: duplicate JSON-LD block (same @type and payload)`);
      seenJsonLd.add(key);
    } catch (e) {
      fail(`${route}: invalid JSON-LD (${String(e).slice(0, 90)})`);
    }
  }

  const h1Count = (html.match(/<h1\b/gi) || []).length;
  if (h1Count !== 1) fail(`${route}: expected exactly one <h1>, found ${h1Count}`);
  const h1Index = html.search(/<h1\b/i);
  const h2Index = html.search(/<h2\b/i);
  if (h1Index >= 0 && h2Index >= 0 && h2Index < h1Index) {
    fail(`${route}: <h2> appears before <h1>`);
  }

  if (!match(html, /<meta property="og:image:width" content="([^"]*)"/i) ||
      !match(html, /<meta property="og:image:height" content="([^"]*)"/i)) {
    fail(`${route}: og:image dimensions missing`);
  }

  const images = [...html.matchAll(/<img\b([^>]*)>/gi)];
  // Empty alt is valid for decorative images; only a missing attribute is an error.
  // Built HTML may emit a bare `alt` attribute instead of `alt=""`.
  const missingAlt = images.filter(([, attrs]) => !/\balt(?:\s|=|>)/.test(attrs));
  if (missingAlt.length) fail(`${route}: ${missingAlt.length} <img> without alt attribute`);

  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length < 200) fail(`${route}: thin page (${text.length} visible characters)`);

  pageRecords.push({ route, url, robots: robots || '', title: title || '' });
}

// Sitemap checks
const sitemapPath = path.join(DIST, 'sitemap-0.xml');
const sitemapLocs = (await fs.readFile(sitemapPath, 'utf8').catch(() => ''))
  .split(/<loc>/)
  .slice(1)
  .map((chunk) => chunk.split('</loc>')[0].trim())
  .filter(Boolean);
if (!sitemapLocs.length) fail('sitemap-0.xml missing or empty');

const pageByUrl = new Map(pageRecords.map((p) => [p.url, p]));
for (const loc of sitemapLocs) {
  const page = pageByUrl.get(loc);
  if (!page) {
    fail(`sitemap URL has no matching built page: ${loc}`);
  } else if (/noindex/.test(page.robots)) {
    fail(`sitemap contains a noindex page: ${loc}`);
  }
}
for (const page of pageRecords) {
  const indexable = !/noindex/.test(page.robots);
  if (indexable && !sitemapLocs.includes(page.url)) warn(`indexable page not in sitemap: ${page.url}`);
}

// robots.txt checks
const robotsTxt = await fs.readFile(path.join(ROOT, 'public', 'robots.txt'), 'utf8').catch(() => '');
if (!/User-agent:\s*\*/i.test(robotsTxt) || !/Allow:\s*\//i.test(robotsTxt)) fail('robots.txt: missing general Allow rule');
if (!/OAI-SearchBot/i.test(robotsTxt)) fail('robots.txt: missing OAI-SearchBot policy');
if (!/GPTBot/i.test(robotsTxt)) warn('robots.txt: GPTBot policy not explicitly declared');
if (!sitemapLocs.length || !robotsTxt.includes('sitemap-index.xml')) fail('robots.txt: missing or wrong Sitemap directive');

// Stale lastVerified dates in project data
const source = await fs.readFile(path.join(ROOT, 'src', 'data', 'projects.ts'), 'utf8').catch(() => '');
const now = Date.now();
const dates = [...source.matchAll(/lastVerified:\s*'(\d{4}-\d\d-\d\d)'/g)].map((m) => m[1]);
for (const date of new Set(dates)) {
  const age = Math.floor((now - Date.parse(date)) / 86400000);
  if (age > staleDays) warn(`project lastVerified is ${age} days old: ${date}`);
}

console.log(`[seo] ${htmlFiles.length} HTML pages, ${sitemapLocs.length} sitemap URLs, ${dates.length} project verification dates`);
if (warnings.length) {
  console.log(`\nWARN (${warnings.length}):`);
  warnings.forEach((w) => console.log(`  - ${w}`));
}
if (errors.length) {
  console.log(`\nERROR (${errors.length}):`);
  errors.forEach((e) => console.log(`  - ${e}`));
  process.exit(1);
}
console.log('\n[seo] All checks passed.');
