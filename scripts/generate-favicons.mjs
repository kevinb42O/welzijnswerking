import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

// Convert the supplied logo deterministically; never redraw or recolor the mark.
const source = 'public/images/branding/welzijnswerking-oostende-kleuren.png';
const { data, info } = await sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
// The three-person mark ends at x=544; the lettering begins at x=552.
const split = 549;
let left = split, top = info.height, right = 0, bottom = 0;
for (let y = 0; y < info.height; y++) {
  for (let x = 0; x < split; x++) {
    if (data[(y * info.width + x) * 4 + 3] > 8) {
      left = Math.min(left, x); right = Math.max(right, x);
      top = Math.min(top, y); bottom = Math.max(bottom, y);
    }
  }
}
assert.ok(right < split && right > left && bottom > top);
const width = right - left + 1, height = bottom - top + 1;
const symbol = await sharp(source).extract({ left, top, width, height }).png().toBuffer();
await writeFile('public/images/branding/welzijnswerking-beeldmerk.png', symbol);

// Center the original artwork, with 5% breathing room on each side.
const size = 512, available = 464;
const markHeight = Math.round(available * height / width);
const x = (size - available) / 2, y = (size - markHeight) / 2;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><image x="${x}" y="${y}" width="${available}" height="${markHeight}" href="data:image/png;base64,${symbol.toString('base64')}"/></svg>\n`;
await writeFile('public/favicon.svg', svg);
const master = await sharp(Buffer.from(svg)).png().toBuffer();
const frames = [];
for (const pixels of [16, 32, 48]) {
  const png = await sharp(master).resize(pixels, pixels, { kernel: 'lanczos3' }).png().toBuffer();
  await writeFile(`public/favicon-${pixels}.png`, png);
  frames.push({ pixels, png });
}
// ICO directory with independent PNG images at each native tab-icon resolution.
const header = Buffer.alloc(6 + frames.length * 16);
header.writeUInt16LE(1, 2); header.writeUInt16LE(frames.length, 4);
let offset = header.length;
for (const [i, { pixels, png }] of frames.entries()) {
  const entry = 6 + i * 16;
  header[entry] = pixels; header[entry + 1] = pixels;
  header.writeUInt16LE(1, entry + 4); header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(png.length, entry + 8); header.writeUInt32LE(offset, entry + 12);
  offset += png.length;
}
await writeFile('public/favicon.ico', Buffer.concat([header, ...frames.map(frame => frame.png)]));
// Apple home-screen icons use an opaque canvas; iOS applies its own corner mask.
await sharp(master).resize(180, 180).flatten({ background: '#fdfbf7' }).png().toFile('public/apple-touch-icon.png');

// Check native dimensions, alpha, and every ICO directory offset against its PNG.
for (const { pixels } of frames) {
  const metadata = await sharp(`public/favicon-${pixels}.png`).metadata();
  assert.equal(metadata.width, pixels); assert.equal(metadata.height, pixels); assert.equal(metadata.hasAlpha, true);
}
const ico = await readFile('public/favicon.ico');
assert.equal(ico.readUInt16LE(2), 1); assert.equal(ico.readUInt16LE(4), 3);
for (let i = 0; i < 3; i++) {
  const entry = 6 + i * 16;
  const offset = ico.readUInt32LE(entry + 12), length = ico.readUInt32LE(entry + 8);
  const metadata = await sharp(ico.subarray(offset, offset + length)).metadata();
  assert.equal(metadata.width, ico[entry]); assert.equal(metadata.height, ico[entry + 1]);
}
console.log(JSON.stringify({ source, crop: { left, top, width, height }, faviconSizes: frames.map(f => f.pixels), appleTouch: 180 }, null, 2));
