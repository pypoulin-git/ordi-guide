/**
 * check-links.mjs — Verify all product URLs in catalogue.json
 *
 * Usage: node scripts/check-links.mjs
 *
 * - Sends HEAD requests to each product URL
 * - Concurrency limit of 5 to avoid hammering servers
 * - 5s timeout per request
 * - Exit code 1 if any broken links, 0 if all OK
 */

import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CATALOGUE_PATH = resolve(__dirname, '..', 'data', 'catalogue.json');

const CONCURRENCY = 5;
const TIMEOUT_MS = 5000;
const OK_STATUSES = new Set([200, 201, 301, 302, 303, 307, 308]);

async function checkUrl(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      redirect: 'follow',
      headers: {
        'User-Agent': 'ShopCompy-LinkChecker/1.0',
      },
    });
    clearTimeout(timer);
    return { status: res.status, ok: OK_STATUSES.has(res.status), error: null };
  } catch (err) {
    clearTimeout(timer);
    const message = err.name === 'AbortError' ? 'Timeout (5s)' : err.message;
    return { status: null, ok: false, error: message };
  }
}

async function runWithConcurrency(items, fn, limit) {
  const results = new Array(items.length);
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const i = index++;
      results[i] = await fn(items[i], i);
    }
  }

  const workers = Array.from({ length: Math.min(limit, items.length) }, () => worker());
  await Promise.all(workers);
  return results;
}

async function main() {
  const raw = await readFile(CATALOGUE_PATH, 'utf-8');
  const catalogue = JSON.parse(raw);
  const products = catalogue.products;

  if (!products || products.length === 0) {
    console.log('No products found in catalogue.json');
    process.exit(0);
  }

  console.log(`Checking ${products.length} product links (concurrency: ${CONCURRENCY})...\n`);

  const broken = [];
  let okCount = 0;

  const results = await runWithConcurrency(
    products,
    async (product, i) => {
      const result = await checkUrl(product.url);
      const statusStr = result.status ?? 'ERR';
      const icon = result.ok ? '\x1b[32m OK \x1b[0m' : '\x1b[31mFAIL\x1b[0m';
      console.log(`  [${String(i + 1).padStart(3)}/${products.length}] ${icon} ${statusStr} ${product.name}`);
      return { product, result };
    },
    CONCURRENCY,
  );

  for (const { product, result } of results) {
    if (result.ok) {
      okCount++;
    } else {
      broken.push({ product, result });
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`Total:  ${products.length}`);
  console.log(`OK:     \x1b[32m${okCount}\x1b[0m`);
  console.log(`Broken: \x1b[${broken.length ? '31' : '32'}m${broken.length}\x1b[0m`);

  if (broken.length > 0) {
    console.log('\n--- Broken links ---\n');
    for (const { product, result } of broken) {
      const reason = result.error ?? `HTTP ${result.status}`;
      console.log(`  ${product.name}`);
      console.log(`    ID:     ${product.id}`);
      console.log(`    Source: ${product.source}`);
      console.log(`    URL:    ${product.url}`);
      console.log(`    Reason: ${reason}`);
      console.log('');
    }
    process.exit(1);
  } else {
    console.log('\nAll links are valid.');
    process.exit(0);
  }
}

main().catch((err) => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
