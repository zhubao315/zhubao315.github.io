#!/usr/bin/env node
/**
 * check-fact-consistency.mjs — CI guard for the single-source-of-truth rules.
 * Reads only the built site (dist/) and source text. Never rewrites files.
 *
 * Usage: npm run facts:check   (after npm run build)
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const registry = JSON.parse(await fs.readFile(path.join(ROOT, 'src/data/generated/fact-registry.json'), 'utf8'));
const failures = [];
const checks = [];

const fmt = (value) => Number(value).toLocaleString('en-US');
const expect = (name, condition, detail) => {
  checks.push({ name, ok: Boolean(condition), detail });
  if (!condition) failures.push(`${name}: ${detail}`);
};

async function text(file) {
  return fs.readFile(path.join(ROOT, file), 'utf8');
}

async function walk(dir) {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

const htmlFiles = await walk(DIST).catch(() => []);
if (!htmlFiles.length) {
  console.error('[facts] no dist/ HTML; run npm run build first.');
  process.exit(2);
}
const readDist = async (route) => {
  const file = path.join(DIST, route, 'index.html');
  return fs.readFile(file, 'utf8').catch(() => '');
};
const [home, about] = await Promise.all([readDist(''), readDist('about')]);

// 1. Rendered values must match the registry.
expect('home.non_fork', home.includes(`${fmt(registry.facts.non_fork_public.value)} 个非 Fork`), '首页非 Fork 数须等于 registry');
expect('about.non_fork', about.includes(`${fmt(registry.facts.non_fork_public.value)} 个非 Fork`), '关于页非 Fork 数须等于 registry');
expect('about.total_sessions', about.includes(fmt(registry.derived.total_sessions.value)), '关于页运动合计须等于派生值');
expect('about.total_km', about.includes(fmt(registry.derived.total_km.value)), '关于页里程合计须等于派生值');
expect('home.uskill_version', home.includes(registry.facts.uskill_version.value), '首页须展示 registry 中的 uSkill 版本');
expect('about.as_of', about.includes(registry._meta.last_verified), '派生数字须带核验日期');

// 2. Stale snapshots must not reappear on the main pages.
const stale = ['31 个非 Fork', '8,157', '72,533', '3,315', '1,039', 'v1.1 / BETA', '数据快照 2026-11-11'];
for (const page of [home, about]) {
  for (const token of stale) {
    expect(`stale[${token}]`, !page.includes(token), `页面中不应出现旧快照 ${token}`);
  }
}

// 3. Source-level guards: no second derivation of non-Fork, no hardcoded totals.
const siteTs = await text('src/data/site.ts');
expect('site.ts.fork_source', /nonForkCount:\s*githubStats\.non_fork_public/.test(siteTs), '必须用 githubStats.non_fork_public');
expect('site.ts.no_recompute', !/nonForkCount:\s*githubStats\.original\s*\+\s*githubStats\.modified/.test(siteTs), '不得用 original+modified 推导');
const aboutAstro = await text('src/pages/about.astro');
expect('about.astro.no_hardcoded_totals', !/const totalActivities\s*=\s*\d+\s*\+/.test(aboutAstro), '运动合计不得手写常量');
expect('about.astro.derived_from_lifeSites', /lifeSites\.filter/.test(aboutAstro) && /reduce/.test(aboutAstro), '运动合计必须从 lifeSites 派生');
const media = await text('src/components/ProjectMedia.astro');
expect('ProjectMedia.no_hardcoded_version', !/v1\.1 \/ BETA/.test(media), '视觉稿不得硬编码版本号');

// 4. SEO structural guards.
const workPages = htmlFiles.filter((file) => file.includes(`${path.sep}work${path.sep}`) && file.endsWith('index.html') && !file.endsWith(`${path.sep}work${path.sep}index.html`));
const badJsonLd = [];
let ogOk = true;
for (const file of workPages) {
  const html = await fs.readFile(file, 'utf8');
  const count = (html.match(/application\/ld\+json/g) ?? []).length;
  if (count !== 4) badJsonLd.push(`${path.relative(DIST, file)}=${count}`);
  const width = html.match(/og:image:width" content="(\d+)"/)?.[1];
  const ogImage = html.match(/property="og:image" content="([^"]+)"/)?.[1] ?? '';
  if (width === '1200' && ogImage.includes('/_astro/')) ogOk = false;
}
const jsonLdOk = workPages.length > 0 && badJsonLd.length === 0;
expect('work.jsonld_count', jsonLdOk, `${workPages.length} 个项目页每页应恰有 4 个 JSON-LD${badJsonLd.length ? `; 异常: ${badJsonLd.slice(0, 12).join(', ')}` : ''}`);
expect('work.og_dimensions', ogOk, '项目页 OG 宽度不得恒为 1200（应传入真实尺寸）');

expect('registry.no_conflicts', registry.conflicts.length === 0, `fact-registry 有 ${registry.conflicts.length} 项冲突`);

for (const check of checks) {
  console.log(`${check.ok ? 'PASS' : 'FAIL'}  ${check.name}${check.ok ? '' : ' — ' + check.detail}`);
}
if (failures.length) {
  console.error(`[facts] ${failures.length} check(s) failed.`);
  process.exit(1);
}
console.log(`[facts] ${checks.length} checks passed.`);
