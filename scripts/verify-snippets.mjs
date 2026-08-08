#!/usr/bin/env node
// Honesty gate — every result claimed on the site must reproduce on a real oo engine.
//
//   OO_BIN=/path/to/oo node scripts/verify-snippets.mjs
//
// Defaults to ../nlang-tools/target/release/oo relative to this repo.
//
// ── Why this is not a table ──────────────────────────────────────────────
// The first version kept a hand-maintained list of expressions parallel to the
// site copy, with a README note to "keep them in sync". It passed 7/7 while the
// site shipped `5 |> /double |> /inc  ;; → 11` with `/inc` never defined — the
// engine yields 10. The gate covered a different set of snippets than the site
// rendered, so it could be green and wrong at the same time.
//
// This version derives its cases from `src/i18n/landing.ts` itself. A snippet
// that is not covered cannot exist, because coverage is not a separate list.
//
// ── A slide is not a program ─────────────────────────────────────────────
// Blocks present several independent examples. Running one as a program is
// wrong: the demo block's third example contradicts its first, so the block as
// a whole evaluates to `_|_`. Measured 2026-08-08: each example lints clean on
// its own, while the three together raise one SPEC15 TypeConflict, because two
// adjacent expression lines read as application. So every claim is checked in
// isolation, carrying only the *bindings* that precede it, and whole-block lint
// is reported rather than obeyed.

import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(here, '..');
const OO = process.env.OO_BIN || resolve(repo, '../nlang-tools/target/release/oo');
const SOURCE = resolve(repo, 'src/i18n/landing.ts');
const RECEIPT = resolve(repo, 'src/i18n/verified.json');

if (!existsSync(OO)) {
  console.error(`\n✗ oo engine not found at: ${OO}`);
  console.error('  Build it (cargo build --release in nlang-tools) or set OO_BIN.\n');
  process.exit(2);
}

const work = mkdtempSync(join(tmpdir(), 'nlang-verify-'));
const env = { ...process.env, OO_IDENTITY: join(work, 'id'), OO_NODE_HOME: join(work, 'nh') };
const oo = (args) => {
  try {
    return execFileSync(OO, args, { encoding: 'utf8', env, cwd: work });
  } catch (e) {
    return (e.stdout || '') + (e.stderr || '');
  }
};

/** Strip `;;` comments and collapse whitespace, so layout never decides a verdict. */
const norm = (s) => s.replace(/;;.*$/gm, '').replace(/\s+/g, ' ').trim();

// ── extract every code block the site renders ────────────────────────────

const src = readFileSync(SOURCE, 'utf8');
const blocks = [...src.matchAll(/(code|demoCode):\s*`([^`]*)`/g)].map((m, i) => ({
  i,
  key: m[1],
  body: m[2],
}));

// Control: an extractor that silently finds nothing would report a perfect run.
if (blocks.length === 0) {
  console.error(`✗ found no code blocks in ${SOURCE} — the extractor is broken, not the site`);
  process.exit(2);
}

const isBinding = (line) => /^\/?[A-Za-z_][\w-]*\s*:/.test(line);
const bindingName = (line) => (line.match(/^([A-Za-z_][\w-]*)\s*:/) || [])[1];

/** Claims in one block: `expr ;; → X` on one line, or `expr` then `;; → X`. */
function claimsOf(body) {
  const lines = body.split('\n');
  const claims = [];
  const bindings = [];
  const orphans = [];
  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const inline = raw.match(/^(.*?\S)\s*;;\s*→\s*(.+?)\s*$/);
    const code = (inline ? inline[1] : raw.replace(/\s*;;.*$/, '')).trim();
    if (!code) {
      // A `;; → X` line with no expression above it is a claim we cannot check.
      if (/^\s*;;\s*→/.test(raw) && !claims.some((c) => c.line === i - 1)) {
        if (!lines[i - 1] || !lines[i - 1].replace(/\s*;;.*$/, '').trim()) orphans.push(raw.trim());
      }
      continue;
    }
    let expect = inline ? inline[2] : null;
    if (!expect) {
      const next = (lines[i + 1] || '').trim().match(/^;;\s*→\s*(.+)$/);
      if (next) expect = next[1].trim();
    }
    if (expect) claims.push({ line: i, code, expect, deps: [...bindings] });
    if (isBinding(code)) bindings.push(code);
  }
  return { claims, orphans };
}

/** Run one claim in isolation and return what the engine actually produced. */
function evaluate({ code, deps }) {
  const name = isBinding(code) ? bindingName(code) : 'check';
  const program = [...deps, isBinding(code) ? code : `check: ${code}`].join('\n') + '\n';
  const file = join(work, 'snippet.n');
  writeFileSync(file, program);
  return norm(oo(['run', file, '--observe', name]));
}

// ── self-test: prove the checker can fail ────────────────────────────────
// A gate that has never been observed to reject is not known to be a gate.
{
  const got = evaluate({ code: '2 & 3', deps: [] });
  if (got === norm('5')) {
    console.error('✗ self-test: the checker accepted a false claim (2 & 3 → 5); aborting');
    process.exit(2);
  }
}

// ── check ────────────────────────────────────────────────────────────────

let failed = 0;
let checked = 0;
const notes = [];

for (const b of blocks) {
  const { claims, orphans } = claimsOf(b.body);

  for (const o of orphans) {
    failed++;
    console.log(`✗  block ${b.i}: claim with no expression to check — ${o}`);
  }

  // Lint is a second, independent detector of the `/inc` class: a claim that
  // pipes through a morphism nobody defined. Undefined *type markers* are
  // open-world by design and are reported, not enforced.
  const lintFile = join(work, 'lint.n');
  writeFileSync(lintFile, b.body);
  const lint = oo(['lint', lintFile]);
  for (const line of lint.split('\n')) {
    if (!/use-without-def/.test(line)) continue;
    if (/type marker/.test(line)) {
      notes.push(`block ${b.i}: ${line.trim()}`);
    } else {
      failed++;
      console.log(`✗  block ${b.i}: ${line.trim()}`);
    }
  }

  for (const c of claims) {
    checked++;
    const got = evaluate(c);
    const ok = got === norm(c.expect);
    console.log(`${ok ? '✓' : '✗'}  ${c.code}  →  ${got || '(no output)'}`);
    if (!ok) {
      failed++;
      console.log(`     the site claims: ${c.expect}`);
    }
  }
}

if (checked === 0) {
  console.error('✗ no claims found — either the site stopped claiming results, or the parser did');
  process.exit(2);
}

for (const n of notes) console.log(`·  ${n}`);

const version = oo(['--version']).trim();
console.log(
  `\n${failed ? `✗ ${failed} failure(s)` : `✓ ${checked} claim(s) across ${blocks.length} block(s) verified`} against ${version}`
);

// ── receipt ──────────────────────────────────────────────────────────────
// The site's verification stamp is *derived from this file*. No gate run, no
// claim: a build without a receipt renders no verification line at all.
if (!failed) {
  writeFileSync(
    RECEIPT,
    JSON.stringify(
      { engine: version, checkedAt: new Date().toISOString(), blocks: blocks.length, claims: checked },
      null,
      2
    ) + '\n'
  );
  console.log(`  receipt → ${RECEIPT.replace(repo + '/', '')}`);
}

rmSync(work, { recursive: true, force: true });
process.exit(failed ? 1 : 0);
