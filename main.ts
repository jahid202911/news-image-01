// news-image-01 entry: "Friday 13 November 2026 — the world in one day".
//
// The program ships one image, entry.png, which sits beside this file.
// It is a newspaper front page for Friday 13 November 2026: a masthead
// over a 2x2 grid of captioned photographs that sum up the day's world
// news — tankers hit in the Strait of Hormuz (and Iran's radar claim),
// Nvidia CEO Jensen Huang resigning after 33 years, Europe winning a
// seat at the next Ukraine peace talks, and the global Microsoft 365
// outage. The image is a JPEG (302,306 bytes, 1024x1024 pixels) in a
// file named entry.png; the gate accepts PNG or JPEG by first bytes and
// the name stays entry.png either way, at most 1 MiB and 1024x1024 pixels.
//
// Node 22, standard library only. The program reads entry.png, writes it
// to <output>/entry.png, and refuses to finish unless the written file
// is byte-for-byte identical to the source (same length and same SHA-256).
// <output> is /output inside the grader; outside it, set the
// MAKEFUN_OUTPUT_DIR environment variable to a local directory instead:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const sourcePath = resolve(dirname(fileURLToPath(import.meta.url)), 'entry.png');
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const targetPath = join(outputDir, 'entry.png');

const image = readFileSync(sourcePath);
const digest = createHash('sha256').update(image).digest('hex');

if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}
writeFileSync(targetPath, image);

const written = readFileSync(targetPath);
if (written.length !== image.length || !written.equals(image)) {
  throw new Error(`entry.png copy mismatch: wrote ${written.length} bytes, source is ${image.length}`);
}
const writtenDigest = createHash('sha256').update(written).digest('hex');
if (writtenDigest !== digest) {
  throw new Error(`entry.png copy mismatch: sha256 ${writtenDigest} != ${digest}`);
}
