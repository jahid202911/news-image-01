// news-image-01 — entry program (v4: "THE WORLD TODAY" front page).
//
// Copies entry.png (the 1024x1024 front page for Friday 13 November 2026,
// seventeen verified stories) to the output directory the harness gives us.
// Node 22, standard library only; no network, no randomness.
//
// The image is baked into this repository as entry.png (JPEG bytes in a
// file named entry.png — the rules allow that, "told apart by its first
// bytes"). This program only moves those bytes to /output/entry.png (or
// $MAKEFUN_OUTPUT_DIR/entry.png) and proves the copy is exact.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const target = join(outDir, "entry.png");

// Read the front page and fingerprint it before we touch anything.
const bytes = readFileSync(source);
const digest = createHash("sha256").update(bytes).digest("hex");

// Make sure the output directory exists, then write the copy. The harness
// sets MAKEFUN_OUTPUT_DIR; without it we fall back to /output.
mkdirSync(outDir, { recursive: true });
writeFileSync(target, bytes);

// Re-read what we wrote and refuse to finish unless it matches exactly:
// same length, same bytes, same SHA-256 digest.
const written = readFileSync(target);
if (written.length !== bytes.length || !written.equals(bytes)) {
  throw new Error("output is not byte-identical to entry.png");
}
const writtenDigest = createHash("sha256").update(written).digest("hex");
if (writtenDigest !== digest) {
  throw new Error(`SHA-256 mismatch: wrote ${writtenDigest}, expected ${digest}`);
}

console.log(`wrote ${target} (${bytes.length} bytes, sha256 ${digest})`);
