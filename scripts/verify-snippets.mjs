#!/usr/bin/env node
// Honesty gate: every n/ result claimed on the site must reproduce on a real oo engine.
// Usage:  OO_BIN=/path/to/oo  node scripts/verify-snippets.mjs
// Defaults to ../nlang-tools/target/release/oo relative to this repo.
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const OO = process.env.OO_BIN || resolve(here, '../../nlang-tools/target/release/oo');

if (!existsSync(OO)) {
  console.error(`\n✗ oo engine not found at: ${OO}`);
  console.error('  Build it (cargo build --release in nlang-tools) or set OO_BIN.\n');
  process.exit(2);
}

const norm = (s) => s.replace(/;;.*$/gm, '').replace(/\s+/g, ' ').trim();

// Inline expressions and the (normalized) output they must produce.
// Keep this table in sync with the snippets rendered on the site.
const cases = [
  { expr: '25 & @int', expect: '25' },
  { expr: '{ age: 25 } & { age: @int }', expect: '{ age: 25 }' },
  { expr: '{ x: 1 } & { y: 2 }', expect: '{ x: 1 y: 2 }' },
  { expr: '1..10 & 5..20', expect: '5..10' },
  { expr: '(1 | 7) & 1..3', expect: '1' },
  { expr: '"hi" & @int', contains: '_|_' },
  { expr: '{ age: 25 } & { age: 30 }', contains: '_|_' },
];

let failed = 0;
for (const c of cases) {
  let out = '';
  try {
    out = execFileSync(OO, ['eval', c.expr], { encoding: 'utf8' });
  } catch (e) {
    out = (e.stdout || '') + (e.stderr || '');
  }
  const got = norm(out);
  const ok = c.contains ? out.includes(c.contains) : got === norm(c.expect);
  console.log(`${ok ? '✓' : '✗'}  ${c.expr}  →  ${got || '(no output)'}`);
  if (!ok) {
    failed++;
    console.log(`     expected ${c.contains ? `to contain "${c.contains}"` : `"${c.expect}"`}`);
  }
}

console.log(`\n${failed ? `✗ ${failed} snippet(s) failed` : `✓ all ${cases.length} snippets verified`} against ${OO}`);
process.exit(failed ? 1 : 0);
