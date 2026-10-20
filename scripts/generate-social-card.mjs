import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
// Preserve the approved ImageGen artwork on every release; never replace it with the old template.
const source = new URL('assets/social/kerstfeest-2026-master.png', root);
const jpeg = await sharp(await readFile(source))
  .resize(1200, 630, { fit: 'contain', background: '#123e34' })
  .flatten({ background: '#123e34' })
  .jpeg({ quality: 90, mozjpeg: true })
  .toBuffer();
await writeFile(new URL('public/kerstfeest-2026-social.jpg', root), jpeg);
// Keep existing asset links usable as well.
await writeFile(new URL('public/og-image.jpg', root), jpeg);
await writeFile(new URL('public/social-card.svg', root), `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="Kerstavond. Samen aan tafel. 24 december 2026 in Kursaal Oostende."><image width="1200" height="630" href="data:image/jpeg;base64,${jpeg.toString('base64')}"/></svg>`);
console.log(`Deelbeeld klaar: 1200×630 JPEG, ${Math.round(jpeg.length / 1024)} kB.`);
