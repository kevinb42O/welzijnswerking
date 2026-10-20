import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';

// favicon.svg is the master: Public Sans 650 outlines from the site wordmark.
const source = await readFile(new URL('../public/favicon.svg', import.meta.url));
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(size => sharp(source).resize(size, size).png().toBuffer()));
for (const [index, size] of sizes.entries()) {
  await writeFile(new URL(`../public/favicon-${size}.png`, import.meta.url), images[index]);
}

// ICO contains all three sizes for browser and desktop compatibility.
const header = Buffer.alloc(6 + sizes.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
images.forEach((png, index) => {
  const entry = 6 + index * 16;
  header[entry] = sizes[index];
  header[entry + 1] = sizes[index];
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(png.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += png.length;
});
await writeFile(new URL('../public/favicon.ico', import.meta.url), Buffer.concat([header, ...images]));

// iOS applies its own corner mask.
await sharp(Buffer.from(source.toString().replace('rx="8"', 'rx="0"')))
  .resize(180, 180).png()
  .toFile(new URL('../public/apple-touch-icon.png', import.meta.url).pathname);
console.log('Generated SVG-derived PNG, ICO and Apple touch icons.');
