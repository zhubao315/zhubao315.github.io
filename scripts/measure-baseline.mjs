#!/usr/bin/env node
/**
 * measure-baseline.mjs — reproducible static baseline of the built site.
 *
 * This is NOT Lighthouse and NOT field data. It measures what is actually in
 * dist/: counts, transfer-oriented byte totals by asset class, largest files,
 * image formats and inline script weight. Run after `npm run build`.
 *
 * Usage: npm run measure:baseline
 */
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import process from 'node:process';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const OUT_DIR = path.join(ROOT, 'docs');
const generatedAt = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');

async function walk(dir) {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

const files = await walk(DIST).catch(() => []);
if (!files.length) {
  console.error('[baseline] dist/ is empty; run npm run build first.');
  process.exit(2);
}

const classes = {
  html: 0, css: 0, js: 0, image: 0, font: 0, json: 0, xml: 0, other: 0,
};
const byFile = [];
const formats = {};
const fonts = [];
for (const file of files) {
  const ext = path.extname(file).toLowerCase().slice(1) || 'none';
  const stat = await fs.stat(file);
  const bytes = stat.size;
  const rel = path.relative(DIST, file).split(path.sep).join('/');
  byFile.push({ path: rel, bytes });
  if (['png', 'jpg', 'jpeg', 'webp', 'avif', 'svg', 'gif'].includes(ext)) {
    classes.image += bytes;
    formats[ext] = (formats[ext] ?? 0) + 1;
  } else if (['woff', 'woff2', 'ttf'].includes(ext)) {
    classes.font += bytes;
    fonts.push({ path: rel, bytes });
  } else if (ext === 'html' || ext === 'htm') classes.html += bytes;
  else if (ext === 'css') classes.css += bytes;
  else if (ext === 'js' || ext === 'mjs') classes.js += bytes;
  else if (ext === 'json') classes.json += bytes;
  else if (ext === 'xml') classes.xml += bytes;
  else classes.other += bytes;
}

const htmlFiles = files.filter((file) => /\.html?$/.test(file));
let inlineScriptBytes = 0;
let htmlWithScript = 0;
for (const file of htmlFiles) {
  const html = await fs.readFile(file, 'utf8');
  const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
  if (scripts.length) htmlWithScript += 1;
  inlineScriptBytes += scripts.reduce((sum, body) => sum + Buffer.byteLength(body, 'utf8'), 0);
}

const totalBytes = Object.values(classes).reduce((sum, n) => sum + n, 0);
const report = {
  _meta: {
    generated_at: generatedAt,
    source: 'dist/ static analysis (lab, not Lighthouse, not field data)',
    commands: ['npm run build', 'npm run measure:baseline'],
  },
  files: files.length,
  html_pages: htmlFiles.length,
  total_bytes: totalBytes,
  total_kib: Number((totalBytes / 1024).toFixed(1)),
  by_class_bytes: classes,
  image_formats: formats,
  inline_script_bytes: inlineScriptBytes,
  inline_script_kib: Number((inlineScriptBytes / 1024).toFixed(1)),
  pages_with_inline_script: htmlWithScript,
  largest_files: byFile.sort((a, b) => b.bytes - a.bytes).slice(0, 12),
  largest_fonts: fonts.sort((a, b) => b.bytes - a.bytes).slice(0, 8),
};

await fs.mkdir(OUT_DIR, { recursive: true });
await fs.writeFile(path.join(OUT_DIR, 'perf-baseline.json'), `${JSON.stringify(report, null, 2)}\n`);
const human = (n) => `${(n / 1024).toFixed(1)} KiB`;
const lines = [
  '# 主站静态性能基线（实验室静态分析）',
  '',
  `- 生成时间：${generatedAt}`,
  '- 数据来源：`dist/` 构建产物静态扫描；**不是 Lighthouse，不是真实用户数据（RUM）**。',
  '- 复跑：`npm run build && npm run measure:baseline`',
  '',
  '## 总览',
  '',
  `| 指标 | 数值 |`,
  `| --- | ---: |`,
  `| 文件数 | ${report.files} |`,
  `| HTML 页面 | ${report.html_pages} |`,
  `| 总字节 | ${human(totalBytes)} |`,
  `| HTML | ${human(classes.html)} |`,
  `| CSS | ${human(classes.css)} |`,
  `| JS 文件 | ${human(classes.js)} |`,
  `| 内联脚本 | ${human(inlineScriptBytes)}（${htmlWithScript} 页） |`,
  `| 图片 | ${human(classes.image)} |`,
  `| 字体 | ${human(classes.font)} |`,
  `| JSON | ${human(classes.json)} |`,
  '',
  '## 图片格式分布',
  '',
  ...Object.entries(formats).sort((a, b) => b[1] - a[1]).map(([ext, count]) => `- ${ext}: ${count}`),
  '',
  '## 最大文件（前 12）',
  '',
  '| 文件 | 大小 |',
  '| --- | ---: |',
  ...report.largest_files.map((f) => `| \`${f.path}\` | ${human(f.bytes)} |`),
  '',
  '## 说明',
  '',
  '- `dist/brand` 中的品牌源图只影响仓库与部署体积，不被首屏引用时不产生请求。',
  '- 内联脚本统计只包含 `<script>` 标签体，不含属性中的 JSON-LD 以外的外部资源。',
  '- 本基线用于发现「体积从哪来」和追踪改动前后差异；LCP / INP / CLS 仍需浏览器实测。',
  '',
];
await fs.writeFile(path.join(OUT_DIR, 'perf-baseline.md'), lines.join('\n'));
console.log(`[baseline] ${report.files} files, ${human(totalBytes)} total, inline JS ${human(inlineScriptBytes)}; wrote docs/perf-baseline.{json,md}`);
