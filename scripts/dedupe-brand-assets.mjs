#!/usr/bin/env node
/**
 * dedupe-brand-assets.mjs — remove byte-identical brand binaries from dist/ only.
 *
 * The source of truth in public/brand/ is deliberately left untouched: it keeps
 * the original export directories and manifest hashes. This step only avoids
 * shipping the same bytes twice in the Pages artifact.
 *
 * Safety rules:
 *  1. A file is removed only when another file has the identical SHA-256.
 *  2. Only known duplicate export directories are candidates for removal.
 *  3. A candidate is skipped when any built HTML references its URL.
 *  4. If hashes differ, nothing is removed for that group.
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import process from 'node:process';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const BRAND = path.join(DIST, 'brand');
const REMOVABLE_DIRS = ['09-EXPORTS/png/', '01-LOGO/'];

async function walk(dir) {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

const brandFiles = await walk(BRAND).catch(() => []);
if (!brandFiles.length) {
  console.log('[dedupe] no dist/brand files; nothing to do.');
  process.exit(0);
}

const htmlFiles = (await walk(DIST)).filter((file) => /\.html?$/.test(file));
const htmlText = await Promise.all(htmlFiles.map((file) => fs.readFile(file, 'utf8')));
const allHtml = htmlText.join('\n');

const isRemovable = (rel) => REMOVABLE_DIRS.some((prefix) => rel.startsWith(`brand/${prefix}`));
const keeperByHash = new Map();
const candidates = [];
for (const file of brandFiles) {
  const rel = path.relative(DIST, file).split(path.sep).join('/');
  const data = await fs.readFile(file);
  const digest = createHash('sha256').update(data).digest('hex');
  if (isRemovable(rel)) candidates.push({ file, rel, digest });
  else if (!keeperByHash.has(digest)) keeperByHash.set(digest, rel);
}

const removals = [];
let saved = 0;
for (const { file, rel, digest } of candidates) {
  const keeper = keeperByHash.get(digest);
  if (!keeper) continue;
  if (allHtml.includes(keeper) || allHtml.includes(rel)) {
    console.log(`[dedupe] skip ${rel}: referenced by built HTML`);
    continue;
  }
  const stat = await fs.stat(file);
  await fs.unlink(file);
  removals.push(`${rel} == ${keeper}`);
  saved += stat.size;
}

if (removals.length) {
  console.log(`[dedupe] removed ${removals.length} duplicate file(s), saved ${(saved / 1024).toFixed(1)} KiB in dist/`);
  for (const item of removals) console.log(`  - ${item}`);
} else {
  console.log('[dedupe] no byte-identical duplicates found in dist/brand.');
}
