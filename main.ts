// The Day in One Image — news-image-20261124 entry (Node 22, standard library only).
//
// This entry is a single picture: entry.png, which sits next to this file. The
// picture is a broadsheet front page summing up the world news of Tuesday
// 24 November 2026. It was drawn as one HTML document (design.html, kept in
// this repository as the design source) and rendered to a PNG of exactly
// 1024 by 1024 pixels with headless Chromium. This program does nothing
// creative: it hands the finished picture in by copying it byte-for-byte to
// the output directory as entry.png.
//
// Before the copy it sanity-checks the shipped picture — it must exist, must
// not be empty, must begin with the eight-byte PNG signature, and its IHDR
// chunk must declare exactly 1024 by 1024 pixels, the size this competition
// requires, and it must end with a valid IEND chunk, so a truncated copy is
// caught. If any of that fails, the program says so plainly and exits
// non-zero instead of submitting a broken file.
//
// The grader runs it with no network and a writable /output. Locally,
// MAKEFUN_OUTPUT_DIR stands in for /output:
//
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Because the copy is byte-for-byte, every run produces identical output.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function die(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const entryPath = new URL('./entry.png', import.meta.url);

if (!existsSync(entryPath)) {
  die(`entry.png is missing next to main.ts (${entryPath.pathname})`);
}
const png = readFileSync(entryPath);
if (png.length === 0) die('entry.png is empty');
if (!png.subarray(0, PNG_SIGNATURE.length).equals(PNG_SIGNATURE)) {
  die('entry.png does not start with the PNG signature — the shipped image is damaged');
}
// A PNG's first chunk is always IHDR: 4-byte length, "IHDR", then width and
// height as big-endian 32-bit numbers at offsets 16 and 20. The competition
// caps the image at 1024 by 1024, and this entry is drawn at exactly that.
if (png.length < 24 || png.subarray(12, 16).toString('ascii') !== 'IHDR') {
  die('entry.png has no IHDR chunk — the shipped image is damaged');
}
const width = png.readUInt32BE(16);
const height = png.readUInt32BE(20);
if (width !== 1024 || height !== 1024) {
  die(`entry.png is ${width}x${height}, not the required 1024x1024`);
}
// A well-formed PNG ends with a 12-byte IEND chunk: zero length, the
// letters "IEND", and the fixed CRC 0xAE426082. A file that was truncated
// mid-write would still pass the signature and IHDR checks above, so this
// last check catches a copy that lost its tail.
const IEND_LENGTH = 12;
if (png.length < IEND_LENGTH) die('entry.png is too short to hold an IEND chunk');
const tail = png.subarray(png.length - IEND_LENGTH);
if (tail.readUInt32BE(0) !== 0 || tail.subarray(4, 8).toString('ascii') !== 'IEND' || tail.readUInt32BE(8) !== 0xae426082) {
  die('entry.png does not end with a valid IEND chunk — the shipped image is truncated or damaged');
}

mkdirSync(outDir, { recursive: true });
const destination = join(outDir, 'entry.png');
writeFileSync(destination, png);

console.log(`wrote ${destination} (${png.length} bytes)`);
