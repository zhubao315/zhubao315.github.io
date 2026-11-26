#!/usr/bin/env node

import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = path.resolve('dist');
const requiredRoutes = [
  'index.html',
  'about/index.html',
  'tags/index.html',
  'categories/index.html',
  'archives/index.html',
  'archives/2022/index.html',
  'archives/2022/07/index.html',
  '2022/07/05/index.html',
  '2022/07/05/hello-world/index.html',
  '2022/07/05/zhubao315/index.html',
  'work/index.html',
  'think/index.html',
  'explore/index.html',
  'repositories/index.html',
  'ecosystem-audit/00-EXECUTIVE-SUMMARY.md',
  '404.html',
];

const externalProtocols = /^(?:https?:|mailto:|tel:|javascript:|data:)/i;
const httpProtocol = /^https?:\/\//i;

// External link validation is opt-in because it depends on the network and on
// third-party sites being up. Enable with `node scripts/check-links.mjs --external`
// or CHECK_EXTERNAL_LINKS=1. It is skipped by default.
const checkExternal = process.argv.includes('--external') || process.env.CHECK_EXTERNAL_LINKS === '1';

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

async function isFile(filePath) {
  try {
    const stat = await fs.stat(filePath);
    return stat.isFile();
  } catch {
    return false;
  }
}

async function resolveTarget(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split('#')[0].split('?')[0]);
  if (!cleanPath || cleanPath === '/') {
    return path.join(root, 'index.html');
  }

  const relativePath = cleanPath.replace(/^\/+/, '');
  const direct = path.join(root, relativePath);

  if (path.extname(relativePath)) {
    return direct;
  }

  const asDirectory = path.join(direct, 'index.html');
  if (await isFile(asDirectory)) {
    return asDirectory;
  }

  return `${direct}.html`;
}

async function checkExternalUrls(urls) {
  const failures = [];
  for (const url of [...urls].sort()) {
    try {
      const response = await fetch(url, {
        method: 'HEAD',
        redirect: 'follow',
        signal: AbortSignal.timeout(10_000),
      });
      if (!response.ok) {
        failures.push(`${url}: HTTP ${response.status}`);
      }
    } catch (error) {
      failures.push(`${url}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  return failures;
}

const htmlFiles = (await walk(root)).filter((file) => file.endsWith('.html'));
const failures = [];
const missingRequired = [];
const externalUrls = new Set();
let checked = 0;

for (const required of requiredRoutes) {
  if (!(await isFile(path.join(root, required)))) {
    missingRequired.push(required);
  }
}

for (const file of htmlFiles) {
  const html = await fs.readFile(file, 'utf8');
  const page = path.relative(root, file);
  const hrefs = [...html.matchAll(/\shref=(["'])(.*?)\1/gi)].map((match) => match[2]);

  for (const href of hrefs) {
    const value = href.trim();
    if (!value || value.startsWith('#')) {
      continue;
    }

    if (externalProtocols.test(value)) {
      // Only http(s) URLs are meaningful to probe; mailto/tel/javascript/data are skipped.
      if (checkExternal && httpProtocol.test(value)) {
        externalUrls.add(value);
      }
      continue;
    }

    // Relative hrefs (./about, ../x, page.html) are resolved by the browser
    // against the current document; they are intentionally not checked here.
    if (!value.startsWith('/')) {
      continue;
    }

    checked += 1;
    const target = await resolveTarget(value);

    if (!(await isFile(target))) {
      failures.push(`${page}: missing target ${value}`);
    }
  }
}

if (checkExternal) {
  failures.push(...(await checkExternalUrls(externalUrls)));
}

if (missingRequired.length > 0) {
  console.error('Missing required compatibility routes:');
  for (const route of missingRequired) console.error(`  - ${route}`);
}

if (failures.length > 0) {
  console.error(`\nBroken links (${failures.length}):`);
  for (const failure of failures.slice(0, 50)) console.error(`  - ${failure}`);
  if (failures.length > 50) console.error(`  ... and ${failures.length - 50} more`);
}

if (missingRequired.length > 0 || failures.length > 0) {
  process.exit(1);
}

if (checkExternal) {
  console.log(`Link check passed: ${checked} internal references, ${externalUrls.size} external URLs across ${htmlFiles.length} HTML files.`);
} else {
  console.log(`Link check passed: ${checked} internal references across ${htmlFiles.length} HTML files. (External links skipped; pass --external to check them.)`);
}
