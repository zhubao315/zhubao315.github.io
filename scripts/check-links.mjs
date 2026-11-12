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
  '404.html',
];

const externalProtocols = /^(?:https?:|mailto:|tel:|javascript:|data:)/i;

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

const htmlFiles = (await walk(root)).filter((file) => file.endsWith('.html'));
const failures = [];
const missingRequired = [];
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
    if (!value || value.startsWith('#') || externalProtocols.test(value)) {
      continue;
    }

    if (!value.startsWith('/')) {
      failures.push(`${page}: relative link not supported by the checker: ${value}`);
      continue;
    }

    checked += 1;
    const target = await resolveTarget(value);

    if (!(await isFile(target))) {
      failures.push(`${page}: missing target ${value}`);
    }
  }
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

if (missingRequired.length > 0 || failures.length > 0) {
  process.exit(1);
}

console.log(`Link check passed: ${checked} internal references across ${htmlFiles.length} HTML files.`);
