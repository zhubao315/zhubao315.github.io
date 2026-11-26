#!/usr/bin/env node
/**
 * scripts/sync-github-data.mjs — Phase 2 GitHub data sync.
 * No third-party dependencies. Reads the token ONLY from process.env.GITHUB_TOKEN.
 *
 * Usage:
 *   node scripts/sync-github-data.mjs           # write src/data/generated/*.json
 *   node scripts/sync-github-data.mjs --check   # CI drift detection; exit 1 on diff
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const API = 'https://api.github.com';
const API_VERSION = '2022-11-28';
const UA = 'zhubao-ecosystem-sync/1.0 (+https://github.com/zhubao315/zhubao315.github.io)';
const OUT_DIR = path.resolve('src/data/generated');
const FILES = {
  repos: path.join(OUT_DIR, 'repositories.json'),
  stats: path.join(OUT_DIR, 'github-stats.json'),
  pages: path.join(OUT_DIR, 'pages.json'),
  overrides: path.join(OUT_DIR, 'manual-overrides.json'), // READ ONLY — never written
};
const CATEGORIES = ['BUILD', 'THINK', 'MEASURE', 'CREATE', 'UNCATEGORIZED'];
const CATEGORY_RANK = Object.fromEntries(CATEGORIES.map((c, i) => [c, i]));
const MANUAL_KEYS = ['category', 'status', 'description', 'source_type'];
const CONCURRENCY = Math.max(1, Number(process.env.SYNC_CONCURRENCY) || 6);
const ATTEMPTS = 5;
const TIMEOUT_MS = 30_000;
const DORMANT_DAYS = 365;
const LARGE_FILE_BYTES = 10 * 1024 * 1024;
const PROBE_PAGES = process.env.SYNC_PROBE_PAGES !== '0';

if (process.argv.includes('--help')) {
  console.log('Usage: node scripts/sync-github-data.mjs [--check]');
  process.exit(0);
}
const checkMode = process.argv.includes('--check');
const unknownArgs = process.argv.slice(2).filter((a) => a !== '--check' && a !== '--help');
if (unknownArgs.length) {
  console.error(`[sync] Unknown argument(s): ${unknownArgs.join(', ')}`);
  process.exit(2);
}
const token = process.env.GITHUB_TOKEN?.trim();
if (!token) {
  console.error('[sync] GITHUB_TOKEN is required (env only; never hardcode).');
  process.exit(1);
}

// Phase 0 classification map: explicit names first, keyword fallback for new repos.
const CATEGORY_BY_NAME = {
  AgentTuning: 'BUILD', ApeRAG: 'BUILD', 'Auto-GPT': 'BUILD',
  'Awesome-Nano-Banana-images': 'BUILD', ChatDev: 'BUILD', DevOpsGPT: 'BUILD',
  DockerTarBuilder: 'BUILD', FastChat: 'BUILD', Flowise: 'BUILD',
  GitHubPoster: 'BUILD', 'Open-Assistant': 'BUILD', OpenLLM: 'BUILD',
  'Python-Core-50-Courses': 'BUILD', QueryGPT: 'BUILD', 'ai-agent': 'BUILD',
  'ai-agent-master': 'BUILD', 'cherry-studio': 'BUILD', 'co-mate': 'BUILD',
  'cube-studio': 'BUILD', 'deepseek-harness': 'BUILD', docker_image_pusher: 'BUILD',
  fabric: 'BUILD', 'fabric-prompt': 'BUILD', gdmp: 'BUILD', gpustack: 'BUILD',
  kubesphere: 'BUILD', kubezoo: 'BUILD', langflow: 'BUILD', leapp: 'BUILD',
  newton: 'BUILD', open_llama: 'BUILD', openclaude: 'BUILD', orawatch: 'BUILD',
  'piglet-docker': 'BUILD', pigsty: 'BUILD', portainer: 'BUILD',
  'portainer-templates': 'BUILD', 'stable-diffusion-webui': 'BUILD',
  'stable-diffusion-webui-docker': 'BUILD', substrate: 'BUILD', uSkill: 'BUILD',
  'ulife-os-infra': 'BUILD',
  '2d-micro-anime-skill': 'CREATE',
  'hip-drive-running': 'MEASURE', mbti64: 'CREATE',
  memoir: 'CREATE', perfectme: 'CREATE', uRead: 'THINK',
  'active-watch': 'BUILD', cycling: 'MEASURE', 'grok-build': 'BUILD',
  health: 'MEASURE', hiking: 'MEASURE', running: 'MEASURE',
  'e-life-method': 'THINK', 'gdmp-master': 'BUILD', 'investment-discipline': 'THINK',
  'h029-psychology': 'THINK', 'dual-asset-strategy': 'THINK',
  'knowledge-base-engineering-skill': 'THINK', 'learn-agentic-ai': 'THINK',
  'obsidian-vault': 'THINK', 'obsidian-vault-backup': 'THINK', os: 'THINK',
  'reading-2026': 'THINK', 'tescreal-guide': 'THINK', 'tescreal-personal-os': 'THINK',
  uPrompt: 'THINK', uRepo: 'THINK', uVision: 'THINK', uWise: 'THINK',
  zhubao315: 'THINK',
  cc: 'UNCATEGORIZED', 'cc-local': 'UNCATEGORIZED', elife: 'UNCATEGORIZED',
  life: 'UNCATEGORIZED', 'zhubao315.github.io': 'BUILD',
};
const MODIFIED_NAMES = new Set([
  'DockerTarBuilder', 'Python-Core-50-Courses', 'QueryGPT', 'cube-studio',
  'deepseek-harness', 'docker_image_pusher', 'grok-build', 'leapp', 'newton',
  'openclaude', 'running', 'substrate',
]);
const EXPERIMENT_NAMES = new Set(['orawatch', 'uPrompt', 'uRepo', 'uVision', 'uWise']);
const KEYWORD_RULES = [
  ['MEASURE', ['running', 'cycling', 'hiking', 'health', 'coros', 'fit', 'sleep', 'hrv', 'active', 'sport', '跑步', '骑行', '徒步', '健康']],
  ['CREATE', ['memoir', 'perfectme', 'anime', 'mbti', 'book', 'video', 'animation', '回忆录', '动漫', '人格', '书']],
  ['THINK', ['uread', 'uwise', 'knowledge', 'invest', 'psych', 'reading', 'notes', 'obsidian', '知识', '投资', '心理', '阅读']],
  ['BUILD', ['skill', 'agent', 'uskill', 'ulife', 'infra', 'kubesphere', 'ai', 'devops', 'cli', 'mcp', 'gdmp', 'engine', 'bot', '工具']],
];

const classifyCategory = (repo) => {
  if (CATEGORY_BY_NAME[repo.name]) return CATEGORY_BY_NAME[repo.name];
  const text = [repo.name, repo.description || '', ...(repo.topics || [])].join(' ').toLowerCase();
  for (const [category, keys] of KEYWORD_RULES) {
    if (keys.some((key) => text.includes(key))) return category;
  }
  return 'UNCATEGORIZED';
};
const classifySourceType = (repo) =>
  MODIFIED_NAMES.has(repo.name) ? 'MODIFIED' : (repo.fork ? 'UPSTREAM' : 'ORIGINAL');
const classifyStatus = (repo, nowMs) => {
  if (EXPERIMENT_NAMES.has(repo.name)) return 'EXPERIMENT';
  if (repo.archived) return 'ARCHIVED';
  const pushed = Date.parse(repo.pushed_at || repo.updated_at || '');
  if (!Number.isFinite(pushed) || nowMs - pushed > DORMANT_DAYS * 86_400_000) return 'DORMANT';
  return 'ACTIVE';
};

let activeRequests = 0;
const waiters = [];
function acquireSlot() {
  if (activeRequests < CONCURRENCY) { activeRequests += 1; return Promise.resolve(); }
  return new Promise((resolve) => waiters.push(resolve));
}
function releaseSlot() {
  const next = waiters.shift();
  if (next) next();
  else activeRequests -= 1;
}
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const jitter = () => Math.floor(Math.random() * 500);

function retryDelay(attempt, retryAfterHeader, resetHeader, remainingHeader) {
  const retryAfter = Number(retryAfterHeader);
  if (Number.isFinite(retryAfter) && retryAfter > 0) return retryAfter * 1000 + jitter();
  if (Number(remainingHeader) === 0) {
    const resetMs = Number(resetHeader) * 1000;
    if (Number.isFinite(resetMs) && resetMs > 0) {
      return Math.min(10 * 60_000, Math.max(1000, resetMs - Date.now() + 1500));
    }
  }
  return Math.min(60_000, 2 ** (attempt - 1) * 1000) + jitter();
}

async function githubGet(pathname) {
  let lastError;
  for (let attempt = 1; attempt <= ATTEMPTS; attempt += 1) {
    await acquireSlot();
    let decision;
    try {
      const res = await fetch(pathname.startsWith('http') ? pathname : API + pathname, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': API_VERSION,
          'User-Agent': UA,
        },
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      if ([404, 409, 451].includes(res.status)) decision = { kind: 'null' };
      else if (res.ok) decision = { kind: 'data', value: await res.json() };
      else {
        const retryable = res.status === 429 || res.status === 403 || res.status >= 500;
        const error = new Error(`GitHub ${res.status} for ${pathname}`);
        decision = retryable
          ? { kind: 'retry', delay: retryDelay(attempt, res.headers.get('retry-after'),
              res.headers.get('x-ratelimit-reset'), res.headers.get('x-ratelimit-remaining')), error }
          : { kind: 'throw', error };
      }
    } catch (error) {
      decision = { kind: 'retry', delay: Math.min(30_000, 2 ** (attempt - 1) * 1000) + jitter(), error };
    } finally {
      releaseSlot();
    }
    if (decision.kind === 'null') return null;
    if (decision.kind === 'data') return decision.value;
    if (decision.kind === 'throw') throw decision.error;
    lastError = decision.error;
    if (attempt === ATTEMPTS) throw lastError;
    await sleep(decision.delay);
  }
  throw lastError;
}

async function optionalGet(pathname, fallback = null) {
  try { return await githubGet(pathname); }
  catch (error) { console.warn(`[sync] optional endpoint failed (${pathname}): ${error.message}`); return fallback; }
}

async function mapLimit(items, limit, fn) {
  const results = new Array(items.length);
  let cursor = 0;
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (true) {
      const index = cursor++;
      if (index >= items.length) return;
      results[index] = await fn(items[index], index);
    }
  }));
  return results;
}

async function probePage(url) {
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      signal: AbortSignal.timeout(15_000),
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ZHUBAO-link-check/1.0)' },
    });
    let body = '';
    if (res.body) {
      const reader = res.body.getReader();
      let bytes = 0;
      while (bytes < 300_000) {
        const { done, value } = await reader.read();
        if (done) break;
        body += Buffer.from(value).toString('utf8');
        bytes += value.byteLength;
      }
      await reader.cancel();
    }
    const title = body.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1].trim().slice(0, 120) || '';
    return { status: res.status, final_url: res.url || url, title };
  } catch (error) {
    return { status: 0, final_url: '', title: '', error: String(error.message || error).slice(0, 100) };
  }
}

// Never combine `type` with `affiliation` — GitHub returns 422.
async function listOwnerRepos() {
  const repos = [];
  for (let page = 1; ; page += 1) {
    const batch = await githubGet(`/user/repos?per_page=100&page=${page}&affiliation=owner&sort=updated`);
    if (!Array.isArray(batch) || batch.length === 0) break;
    repos.push(...batch);
    if (batch.length < 100) break;
  }
  return repos;
}

async function enrich(raw, nowMs) {
  const full = raw.full_name;
  const branch = encodeURIComponent(raw.default_branch || 'main');
  const [languages, tree, pagesApi, release, workflows, runs] = await Promise.all([
    optionalGet(`/repos/${full}/languages`, {}),
    optionalGet(`/repos/${full}/git/trees/${branch}?recursive=1`, null),
    optionalGet(`/repos/${full}/pages`, null),
    optionalGet(`/repos/${full}/releases/latest`, null),
    optionalGet(`/repos/${full}/actions/workflows?per_page=100`, null),
    optionalGet(`/repos/${full}/actions/runs?per_page=1`, null),
  ]);
  const blobs = Array.isArray(tree?.tree) ? tree.tree.filter((item) => item.type === 'blob') : [];
  const paths = blobs.map((item) => item.path);
  const lower = paths.map((p) => p.toLowerCase());
  const name = full.split('/').pop();
  const entry = {
    full_name: full, name,
    description: raw.description ?? null,
    homepage: raw.homepage || null,
    default_branch: raw.default_branch || 'main',
    language: raw.language ?? null,
    fork: Boolean(raw.fork),
    parent: raw.fork ? (raw.parent?.full_name ?? null) : null,
    archived: Boolean(raw.archived),
    private: Boolean(raw.private),
    license: raw.license?.spdx_id ?? null,
    topics: raw.topics || [],
    created_at: raw.created_at, updated_at: raw.updated_at, pushed_at: raw.pushed_at,
    size_kb: raw.size, stars: raw.stargazers_count, forks: raw.forks_count,
    has_pages: Boolean(raw.has_pages),
    category: classifyCategory({ name, description: raw.description, topics: raw.topics }),
    source_type: classifySourceType({ name, fork: raw.fork }),
    status: classifyStatus({ name, archived: raw.archived, pushed_at: raw.pushed_at, updated_at: raw.updated_at }, nowMs),
    languages: languages && !languages.__error ? languages : {},
    file_count: paths.length,
    has_readme: lower.some((p) => p.startsWith('readme')),
    has_license_file: lower.some((p) => p.startsWith('license') || p.startsWith('licence')),
    has_changelog: lower.some((p) => p.includes('changelog')),
    has_tests: paths.some((p) => p.startsWith('tests/') || p.startsWith('test/') || p.startsWith('src/__tests__') || p.includes('.test.') || p.includes('.spec.')),
    has_docs: paths.some((p) => p.startsWith('docs/')),
    workflow_files: paths.filter((p) => p.startsWith('.github/workflows/') && /\.(yml|yaml)$/.test(p)),
    large_files: blobs.filter((item) => (item.size || 0) > LARGE_FILE_BYTES).map((item) => ({ path: item.path, size: item.size })).slice(0, 20),
    pages_config: pagesApi && typeof pagesApi.source === 'string'
      ? { source: pagesApi.source, status: pagesApi.status ?? null, url: pagesApi.url ?? null } : null,
    latest_release: release?.tag_name ?? null,
    workflow_count: Array.isArray(workflows?.workflows) ? workflows.workflows.length : 0,
    last_run: Array.isArray(runs?.workflow_runs) && runs.workflow_runs.length
      ? { status: runs.workflow_runs[0].status ?? null, conclusion: runs.workflow_runs[0].conclusion ?? null, date: runs.workflow_runs[0].created_at ?? null } : null,
  };
  if (entry.workflow_count === 0) entry.workflow_count = entry.workflow_files.length;
  const totalBytes = Object.values(entry.languages).reduce((sum, n) => sum + (Number(n) || 0), 0);
  entry.top_languages = Object.entries(entry.languages).sort((a, b) => b[1] - a[1]).slice(0, 4)
    .map(([lang, bytes]) => ({ name: lang, pct: totalBytes ? Math.round((bytes / totalBytes) * 100) : 0 }));
  return entry;
}

async function readJson(file) {
  try { return JSON.parse(await fs.readFile(file, 'utf8')); }
  catch (error) { if (error.code === 'ENOENT') return null; throw error; }
}

function applyOverrides(entries, overrides) {
  const byRepo = overrides?.repos || overrides || {};
  const used = new Set();
  for (const entry of entries) {
    const manual = byRepo[entry.full_name] ?? byRepo[entry.name];
    if (!manual || typeof manual !== 'object') continue;
    for (const key of MANUAL_KEYS) {
      if (manual[key] !== undefined && manual[key] !== null) entry[key] = manual[key];
    }
    used.add(entry.full_name);
  }
  for (const key of Object.keys(byRepo)) {
    if (key.startsWith('_') || used.has(key)) continue;
    console.warn(`[sync] manual override for unknown repo (ignored): ${key}`);
  }
}

function buildStats(all, publicRepos, pageResults, generatedAt, lastVerified) {
  const count = (predicate) => publicRepos.filter(predicate).length;
  return {
    generated_at: generatedAt, last_verified: lastVerified,
    total_repos: all.length, public_repos: publicRepos.length, private_repos: all.length - publicRepos.length,
    original: count((r) => r.source_type === 'ORIGINAL'),
    modified: count((r) => r.source_type === 'MODIFIED'),
    upstream: count((r) => r.source_type === 'UPSTREAM'),
    non_fork_public: count((r) => !r.fork), fork_public: count((r) => r.fork),
    pages_enabled: count((r) => r.has_pages),
    pages_ok: pageResults.filter((p) => p.status === 200).length,
    pages_problem: pageResults.filter((p) => p.status !== 200).length,
    by_category: Object.fromEntries(CATEGORIES.map((c) => [c, count((r) => r.category === c)])),
    statuses: Object.fromEntries(['ACTIVE', 'DORMANT', 'EXPERIMENT', 'ARCHIVED'].map((s) => [s, count((r) => r.status === s)])),
    repoCount: publicRepos.length, nonForkCount: count((r) => !r.fork), forkCount: count((r) => r.fork), lastVerified,
  };
}

const serialize = (data) => `${JSON.stringify(data, null, 2)}\n`;
const stripVolatile = (data) => {
  if (!data || typeof data !== 'object') return data;
  const { generated_at, last_verified, checked_at, ...rest } = data;
  return rest;
};
const stableEqual = (a, b) => JSON.stringify(stripVolatile(a)) === JSON.stringify(stripVolatile(b));

async function main() {
  const started = Date.now();
  const nowIso = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
  const lastVerified = nowIso.slice(0, 10);

  const rawRepos = await listOwnerRepos();
  console.log(`[sync] fetched ${rawRepos.length} repos`);
  const enriched = await mapLimit(rawRepos, CONCURRENCY, (repo) => enrich(repo, started));
  applyOverrides(enriched, await readJson(FILES.overrides));

  const publicRepos = enriched.filter((r) => !r.private);
  publicRepos.sort((a, b) =>
    (CATEGORY_RANK[a.category] ?? 99) - (CATEGORY_RANK[b.category] ?? 99) ||
    a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));

  const pageRepos = publicRepos.filter((r) => r.has_pages);
  const pages = await mapLimit(pageRepos, 5, async (repo) => {
    const url = repo.pages_config?.url || (repo.name === 'zhubao315.github.io'
      ? 'https://zhubao315.github.io/' : `https://zhubao315.github.io/${repo.name}/`);
    const probe = PROBE_PAGES ? await probePage(url) : { status: 200, final_url: url, title: '' };
    return { repo: repo.full_name, url, status: probe.status, final_url: probe.final_url, title: probe.title,
      source: repo.pages_config?.source ?? null, pages_status: repo.pages_config?.status ?? null,
      ...(probe.error ? { error: probe.error } : {}) };
  });
  pages.sort((a, b) => a.repo.localeCompare(b.repo));

  const reposOut = publicRepos.map((r) => ({
    name: r.name, full_name: r.full_name, description: r.description, homepage: r.homepage,
    default_branch: r.default_branch, language: r.language, fork: r.fork, parent: r.parent,
    license: r.license, topics: r.topics, created_at: r.created_at, updated_at: r.updated_at,
    pushed_at: r.pushed_at, size_kb: r.size_kb, stars: r.stars, forks: r.forks,
    has_pages: r.has_pages, category: r.category, source_type: r.source_type, status: r.status,
    file_count: r.file_count, languages: r.languages, top_languages: r.top_languages,
    has_readme: r.has_readme, has_license_file: r.has_license_file, has_changelog: r.has_changelog,
    has_tests: r.has_tests, has_docs: r.has_docs, workflow_files: r.workflow_files,
    large_files: r.large_files, pages_config: r.pages_config, latest_release: r.latest_release,
    workflow_count: r.workflow_count, last_run: r.last_run,
  }));

  const [oldRepos, oldStats, oldPages] = await Promise.all([
    readJson(FILES.repos), readJson(FILES.stats), readJson(FILES.pages),
  ]);
  let stats = buildStats(enriched, publicRepos, pages, nowIso, lastVerified);
  const unchanged = stableEqual(oldRepos, reposOut) && stableEqual(oldPages, pages) && stableEqual(oldStats, stats);
  if (unchanged && oldStats?.generated_at) {
    stats = { ...stats, generated_at: oldStats.generated_at, last_verified: oldStats.last_verified, lastVerified: oldStats.lastVerified ?? oldStats.last_verified };
  }
  const outputs = [[FILES.repos, reposOut], [FILES.stats, stats], [FILES.pages, pages]];

  if (checkMode) {
    const drifted = [];
    for (const [file, data] of outputs) {
      const current = await fs.readFile(file, 'utf8').catch(() => null);
      if (current !== serialize(data)) drifted.push(path.relative(process.cwd(), file));
    }
    if (drifted.length) {
      console.error(`[sync] DRIFT: ${drifted.join(', ')}`);
      process.exit(1);
    }
    console.log('[sync] --check OK');
    return;
  }

  await fs.mkdir(OUT_DIR, { recursive: true });
  let written = 0;
  for (const [file, data] of outputs) {
    const next = serialize(data);
    const current = await fs.readFile(file, 'utf8').catch(() => null);
    if (current === next) continue;
    await fs.writeFile(file, next, 'utf8');
    written += 1;
    console.log(`[sync] wrote ${path.relative(process.cwd(), file)}`);
  }
  console.log(`[sync] done in ${((Date.now() - started) / 1000).toFixed(1)}s — ${written} file(s) changed.`);
}

main().catch((error) => { console.error('[sync] FAILED:', error instanceof Error ? error.message : error); process.exit(1); });
