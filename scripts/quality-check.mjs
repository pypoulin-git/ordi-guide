#!/usr/bin/env node
/**
 * quality-check.mjs — Shop Compy quality monitoring script
 *
 * Checks: build health, article sync (count + slugs), article freshness,
 *         catalogue size, category coverage.
 *
 * Exit codes: 0 = all pass, 1 = warnings, 2 = critical failures.
 * Usage:     node scripts/quality-check.mjs
 */

import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');

// ── Helpers ──────────────────────────────────────────────────────────────────

const PASS = '\u2705';   // check mark
const WARN = '\u26A0\uFE0F';   // warning
const FAIL = '\u274C';   // cross mark

let warnings = 0;
let criticals = 0;

function pass(msg) { console.log(`  ${PASS}  ${msg}`); }
function warn(msg) { warnings++; console.log(`  ${WARN}  ${msg}`); }
function fail(msg) { criticals++; console.log(`  ${FAIL}  ${msg}`); }
function header(title) { console.log(`\n── ${title} ${'─'.repeat(Math.max(0, 58 - title.length))}`); }

/**
 * Extract slug values from articles.XX.ts via regex.
 * Works on the raw TypeScript source — no transpilation needed.
 */
function extractSlugs(filePath) {
  const src = readFileSync(filePath, 'utf-8');
  const slugs = [];
  const re = /slug:\s*'([^']+)'/g;
  let m;
  while ((m = re.exec(src)) !== null) slugs.push(m[1]);
  return slugs;
}

/**
 * Extract date values from articles.XX.ts via regex.
 */
function extractDates(filePath) {
  const src = readFileSync(filePath, 'utf-8');
  const dates = [];
  const re = /date:\s*'([^']+)'/g;
  let m;
  while ((m = re.exec(src)) !== null) dates.push(m[1]);
  return dates;
}

// ── 1. Build health ──────────────────────────────────────────────────────────

header('Build health');

try {
  execSync('npm run build', { cwd: ROOT, stdio: 'pipe', timeout: 120_000 });
  pass('Build succeeded');
} catch (e) {
  const stderr = e.stderr ? e.stderr.toString().split('\n').slice(-5).join('\n') : '';
  fail(`Build failed${stderr ? '\n' + stderr : ''}`);
}

// ── 2. Article sync (count) ──────────────────────────────────────────────────

header('Article sync');

const frFile = resolve(ROOT, 'src', 'content', 'articles.fr.ts');
const enFile = resolve(ROOT, 'src', 'content', 'articles.en.ts');

const frSlugs = extractSlugs(frFile);
const enSlugs = extractSlugs(enFile);

if (frSlugs.length === enSlugs.length) {
  pass(`Article count matches: ${frSlugs.length} FR, ${enSlugs.length} EN`);
} else {
  warn(`Article count mismatch: ${frSlugs.length} FR vs ${enSlugs.length} EN`);
}

// ── 3. Slug consistency ──────────────────────────────────────────────────────

header('Slug consistency');

const frSet = new Set(frSlugs);
const enSet = new Set(enSlugs);

const missingInEN = frSlugs.filter(s => !enSet.has(s));
const missingInFR = enSlugs.filter(s => !frSet.has(s));

if (missingInEN.length === 0 && missingInFR.length === 0) {
  pass('FR and EN slugs are identical');
} else {
  if (missingInEN.length > 0) warn(`Slugs in FR but missing in EN: ${missingInEN.join(', ')}`);
  if (missingInFR.length > 0) warn(`Slugs in EN but missing in FR: ${missingInFR.join(', ')}`);
}

// ── 4. Article freshness ─────────────────────────────────────────────────────

header('Article freshness');

const frDates = extractDates(frFile);
const now = new Date();
const sixMonthsAgo = new Date(now);
sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

const staleSlugs = [];
for (let i = 0; i < frSlugs.length; i++) {
  const d = new Date(frDates[i]);
  if (d < sixMonthsAgo) staleSlugs.push(`${frSlugs[i]} (${frDates[i]})`);
}

if (staleSlugs.length === 0) {
  pass('All articles are fresh (< 6 months old)');
} else {
  warn(`${staleSlugs.length} article(s) older than 6 months:\n        ${staleSlugs.join('\n        ')}`);
}

// ── 5. Catalogue size ────────────────────────────────────────────────────────

header('Catalogue size');

const cataloguePath = resolve(ROOT, 'data', 'catalogue.json');
const catalogue = JSON.parse(readFileSync(cataloguePath, 'utf-8'));
const products = catalogue.products || [];

if (products.length >= 10) {
  pass(`Catalogue has ${products.length} products`);
} else {
  warn(`Catalogue has only ${products.length} products (minimum recommended: 10)`);
}

// ── 6. Category coverage ────────────────────────────────────────────────────

header('Category coverage');

const ALL_CATEGORIES = [
  'laptop', 'desktop', 'apple', 'chromebook',
  'monitor', 'dock', 'peripheral', 'storage', 'accessory',
];

const categoryCounts = {};
for (const cat of ALL_CATEGORIES) categoryCounts[cat] = 0;
for (const p of products) {
  if (categoryCounts[p.category] !== undefined) categoryCounts[p.category]++;
}

const emptyCategories = ALL_CATEGORIES.filter(c => categoryCounts[c] === 0);

if (emptyCategories.length === 0) {
  pass('All categories have at least 1 product');
} else {
  warn(`${emptyCategories.length} empty categories: ${emptyCategories.join(', ')}`);
}

// Show breakdown
console.log('        Category breakdown:');
for (const cat of ALL_CATEGORIES) {
  const count = categoryCounts[cat];
  const indicator = count === 0 ? WARN : ' ';
  console.log(`         ${indicator} ${cat}: ${count}`);
}

// ── Summary ──────────────────────────────────────────────────────────────────

header('Summary');

if (criticals > 0) {
  console.log(`  ${FAIL}  ${criticals} critical failure(s), ${warnings} warning(s)\n`);
  process.exit(2);
} else if (warnings > 0) {
  console.log(`  ${WARN}  ${warnings} warning(s), 0 critical failures\n`);
  process.exit(1);
} else {
  console.log(`  ${PASS}  All checks passed\n`);
  process.exit(0);
}
