import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

// Generated brand derivative; preserve the selected artwork when exporting sizes.
const source = 'assets/branding/favicon-hart-generated-v2.png';
const master = await sharp(await readFile(source)).resize(512, 512).ensureAlpha().png().toBuffer();
// SVG compatibility container embeds the same generated raster, not a vector trace.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><image width="512" height="512" href="data:image/png;base64,${master.toString('base64')}"/></svg>\n`;
await writeFile('public/favicon.svg', svg);
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
console.log(JSON.stringify({ source, faviconSizes: frames.map(f => f.pixels), appleTouch: 180 }, null, 2));
