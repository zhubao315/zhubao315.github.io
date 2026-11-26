#!/usr/bin/env node
/**
 * build-fact-registry.mjs — validate the manual fact registry, reconcile it with
 * GitHub-generated stats, recompute derived values and emit a read-only artifact.
 *
 * Usage: npm run facts:build
 * No third-party dependencies. Exits 1 when schema validation or reconciliation fails.
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import process from 'node:process';

const ROOT = process.cwd();
const SCHEMA = path.join(ROOT, 'schemas/portfolio-facts.schema.json');
const FACTS = path.join(ROOT, 'src/data/portfolio-facts.json');
const STATS = path.join(ROOT, 'src/data/generated/github-stats.json');
const OUT = path.join(ROOT, 'src/data/generated/fact-registry.json');
const REPORT = path.join(ROOT, 'docs/fact-registry-report.md');

const readJson = async (file) => JSON.parse(await fs.readFile(file, 'utf8'));
const sha256 = (value) => createHash('sha256').update(value).digest('hex').slice(0, 12);

function validate(instance, schema, at = '$') {
  const errors = [];
  const types = schema.type ? (Array.isArray(schema.type) ? schema.type : [schema.type]) : null;
  if (types) {
    const actual = Array.isArray(instance)
      ? 'array'
      : instance === null
        ? 'null'
        : typeof instance;
    if (!types.includes(actual)) errors.push(`${at}: expected ${types.join('|')}, got ${actual}`);
  }
  if ('const' in schema && instance !== schema.const) errors.push(`${at}: expected const ${JSON.stringify(schema.const)}`);
  if (schema.enum && !schema.enum.includes(instance)) errors.push(`${at}: not in enum`);
  if (typeof instance === 'string' && schema.pattern && !new RegExp(schema.pattern).test(instance)) {
    errors.push(`${at}: does not match ${schema.pattern}`);
  }
  if (instance && typeof instance === 'object' && !Array.isArray(instance)) {
    for (const key of schema.required ?? []) {
      if (!(key in instance)) errors.push(`${at}.${key}: required`);
    }
    for (const [key, value] of Object.entries(instance)) {
      const sub = schema.properties?.[key];
      if (sub) errors.push(...validate(value, sub, `${at}.${key}`));
      else if (schema.additionalProperties === false) errors.push(`${at}.${key}: additional property not allowed`);
      else if (typeof schema.additionalProperties === 'object') {
        errors.push(...validate(value, schema.additionalProperties, `${at}.${key}`));
      }
    }
  }
  if (Array.isArray(instance) && schema.items) {
    instance.forEach((item, index) => errors.push(...validate(item, schema.items, `${at}[${index}]`)));
  }
  return errors;
}

const API_KEYS = ['public_repos', 'non_fork_public', 'fork_public', 'original', 'modified', 'upstream'];
const DERIVED = {
  total_sessions: ['running_sessions', 'cycling_sessions', 'hiking_sessions'],
  total_km: ['running_km', 'cycling_km', 'hiking_km'],
};

async function main() {
  const [schema, registry, stats] = await Promise.all([readJson(SCHEMA), readJson(FACTS), readJson(STATS)]);
  const errors = validate(registry, schema);
  if (errors.length) {
    console.error('[facts] schema errors:\n' + errors.map((e) => '  - ' + e).join('\n'));
    process.exit(1);
  }

  const conflicts = [];
  for (const key of API_KEYS) {
    if (stats[key] === undefined) {
      conflicts.push(`${key}: github-stats.json 缺少字段`);
      continue;
    }
    if (registry.facts[key]?.value !== stats[key]) {
      conflicts.push(`${key}: manual=${registry.facts[key]?.value} vs github_api=${stats[key]}`);
    }
  }
  for (const [target, parts] of Object.entries(DERIVED)) {
    const sum = parts.reduce((total, key) => total + (Number(registry.facts[key]?.value) || 0), 0);
    if (sum !== Number(registry.facts[target]?.value)) {
      conflicts.push(`${target}: stored=${registry.facts[target]?.value} vs derived=${sum} (${parts.join(' + ')})`);
    }
  }

  const generatedAt = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
  const [factsRaw, statsRaw] = await Promise.all([fs.readFile(FACTS, 'utf8'), fs.readFile(STATS, 'utf8')]);
  const artifact = {
    _meta: {
      generated_at: generatedAt,
      source_hashes: { 'portfolio-facts.json': sha256(factsRaw), 'github-stats.json': sha256(statsRaw) },
      last_verified: registry._meta.last_verified,
    },
    facts: registry.facts,
    derived: Object.fromEntries(
      Object.entries(DERIVED).map(([key, parts]) => [
        key,
        {
          value: parts.reduce((total, part) => total + Number(registry.facts[part].value), 0),
          parts,
          as_of: registry.facts[key].as_of,
        },
      ]),
    ),
    conflicts,
  };

  await fs.mkdir(path.dirname(OUT), { recursive: true });
  await fs.writeFile(OUT, `${JSON.stringify(artifact, null, 2)}\n`);
  const lines = [
    '# Fact Registry Report',
    '',
    `- Generated: ${generatedAt}`,
    `- Last verified: ${registry._meta.last_verified}`,
    `- Schema: \`schemas/portfolio-facts.schema.json\` (valid)`,
    `- Facts: ${Object.keys(registry.facts).length} (${Object.values(registry.facts).filter((f) => f.source === 'derived').length} derived)`,
    `- Conflicts: ${conflicts.length}`,
    ...conflicts.map((c) => `  - ${c}`),
    '',
    '## Derived values',
    ...Object.entries(artifact.derived).map(
      ([key, entry]) => `- ${key} = ${entry.value} (${entry.parts.join(' + ')}), as of ${entry.as_of}`,
    ),
    '',
    '## Rules',
    '',
    '- API facts must equal `src/data/generated/github-stats.json`; never recompute non-Fork from `original + modified`.',
    '- Derived facts must carry `derived_from` and `as_of`.',
    '- Every displayed snapshot must carry a verification date; manual edits require evidence.',
    '',
  ];
  await fs.mkdir(path.dirname(REPORT), { recursive: true });
  await fs.writeFile(REPORT, lines.join('\n'));

  if (conflicts.length) {
    console.error('[facts] conflicts:\n' + conflicts.map((c) => '  - ' + c).join('\n'));
    process.exit(1);
  }
  console.log(`[facts] OK — ${Object.keys(registry.facts).length} facts, 0 conflicts; wrote ${path.relative(ROOT, OUT)}`);
}

main().catch((error) => {
  console.error('[facts] FAILED:', error instanceof Error ? error.message : error);
  process.exit(1);
});
