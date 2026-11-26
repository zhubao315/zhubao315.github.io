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

async function mapLimit(items, limit, fn) {
  const results = new Array(items.length);
  let cursor = 0;
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (true) {
      const index = cursor++;
      if (index >= items.length) return;
      results[index] = await fn(items[index]);
    }
  }));
  return results;
}

/**
 * External links are diagnostic, not a deploy gate: 403/429 (bot protection),
 * 5xx (server hiccup) and network failures are warnings; only 404/410 are
 * treated as definitively broken. Results are written to docs/link-report.json.
 */
async function checkExternalUrls(urls) {
  const failures = [];
  const warnings = [];
  const list = [...urls].sort();
  await mapLimit(list, 6, async (url) => {
    try {
      let response = await fetch(url, {
        method: 'HEAD',
        redirect: 'follow',
        signal: AbortSignal.timeout(10_000),
      });
      if (response.status === 405 || response.status === 501) {
        response = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(10_000) });
      }
      if (response.ok) return;
      const detail = `${url}: HTTP ${response.status}`;
      if ([404, 410].includes(response.status)) failures.push(detail);
      else if ([403, 429].includes(response.status)) warnings.push(`${detail} (bot protection / rate limit)`);
      else if (response.status >= 500) warnings.push(`${detail} (upstream server error)`);
      else warnings.push(detail);
    } catch (error) {
      warnings.push(`${url}: network error (${error instanceof Error ? error.message : String(error)})`);
    }
  });
  return { failures, warnings, checked: list.length };
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

    // Resolve relative hrefs against the current document directory instead of
    // silently skipping them; only fragments with no path are ignored above.
    let candidate = value;
    if (!value.startsWith('/')) {
      const clean = decodeURIComponent(value.split('#')[0].split('?')[0]);
      if (!clean) continue;
      const pageDir = path.posix.dirname('/' + path.relative(root, file).split(path.sep).join('/'));
      candidate = path.posix.normalize(path.posix.join(pageDir, clean));
    }

    checked += 1;
    const target = await resolveTarget(candidate);

    if (!(await isFile(target))) {
      failures.push(`${page}: missing target ${value}`);
    }
  }
}

let external = null;
if (checkExternal) {
  external = await checkExternalUrls(externalUrls);
  const docsDir = path.resolve('docs');
  await fs.mkdir(docsDir, { recursive: true });

  // Keep an append-only history so repeated failures do not look like new incidents.
  const historyPath = path.join(docsDir, 'link-history.jsonl');
  const previous = (await fs.readFile(historyPath, 'utf8').catch(() => ''))
    .split('\n')
    .filter(Boolean)
    .flatMap((line) => {
      try { return [JSON.parse(line)]; } catch { return []; }
    });
  const knownBroken = new Set();
  for (const entry of previous.slice(-2)) {
    for (const failure of entry.external_failures ?? []) knownBroken.add(failure);
  }
  const newBroken = external.failures.filter((failure) => !knownBroken.has(failure));
  const resolved = [...knownBroken].filter((failure) => !external.failures.includes(failure));

  const generatedAt = new Date().toISOString();
  const report = {
    generated_at: generatedAt,
    internal: { checked, failures },
    external: { checked: external.checked, failures: external.failures, warnings: external.warnings },
    noise_reduction: {
      window_runs: 2,
      new_failures: newBroken,
      resolved_failures: resolved,
      note: 'A broken link already seen in the last 2 runs is a known issue, not a new incident.',
    },
    note: 'Lab check. 403/429/5xx and network errors are warnings; only 404/410 are broken.',
  };
  await fs.writeFile(path.join(docsDir, 'link-report.json'), `${JSON.stringify(report, null, 2)}\n`);
  const entry = {
    generated_at: generatedAt,
    internal_failures: failures.length,
    external_checked: external.checked,
    external_failures: external.failures,
    warning_count: external.warnings.length,
    new_failures: newBroken,
    resolved_failures: resolved,
  };
  const history = [...previous, entry].slice(-200);
  await fs.writeFile(historyPath, history.map((item) => JSON.stringify(item)).join('\n') + '\n');
  console.log(`[links] report written to docs/link-report.json (${external.failures.length} broken, ${external.warnings.length} warnings).`);
  console.log(`[links] new failures since last 2 runs: ${newBroken.length}; resolved: ${resolved.length}.`);
}

if (missingRequired.length > 0) {
  console.error('Missing required compatibility routes:');
  for (const route of missingRequired) console.error(`  - ${route}`);
}

if (failures.length > 0) {
  console.error(`\nBroken internal links (${failures.length}):`);
  for (const failure of failures.slice(0, 50)) console.error(`  - ${failure}`);
  if (failures.length > 50) console.error(`  ... and ${failures.length - 50} more`);
}
if (external?.failures.length) {
  console.error(`\nBroken external links (${external.failures.length}):`);
  for (const failure of external.failures.slice(0, 50)) console.error(`  - ${failure}`);
}
if (external?.warnings.length) {
  console.warn(`\nExternal link warnings (${external.warnings.length}):`);
  for (const warning of external.warnings.slice(0, 20)) console.warn(`  - ${warning}`);
}

if (missingRequired.length > 0 || failures.length > 0 || (external?.failures.length ?? 0) > 0) {
  process.exit(1);
}

if (checkExternal) {
  console.log(`Link check passed: ${checked} internal references, ${external?.checked ?? 0} external URLs across ${htmlFiles.length} HTML files.`);
} else {
  console.log(`Link check passed: ${checked} internal references across ${htmlFiles.length} HTML files. (External links skipped; pass --external to check them.)`);
}
