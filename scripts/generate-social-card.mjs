import { chromium } from '@playwright/test';
import { readFile, writeFile } from 'node:fs/promises';
import { formatEventDate, formatPrice } from '../src/data/format.mjs';
const root = new URL('../', import.meta.url);
const { event, brand } = JSON.parse(await readFile(new URL('data/inhoud_2026.json', root), 'utf8'));
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const dataUrl = async (path, type) => `data:${type};base64,${(await readFile(new URL(path, root))).toString('base64')}`;
const [serif, italic, body, photo] = await Promise.all([
  dataUrl('public/fonts/instrument-serif-regular.ttf', 'font/ttf'),
  dataUrl('public/fonts/instrument-serif-italic.ttf', 'font/ttf'),
  dataUrl('public/fonts/dm-sans-latin-wght-normal.woff2', 'font/woff2'),
  dataUrl('public/images/editorial/hero-kaarslicht-1800.webp', 'image/webp'),
]);
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(`<!doctype html><html lang="nl-BE"><meta charset="utf-8"><style>
  @font-face{font-family:Instrument;src:url('${serif}')}@font-face{font-family:Instrument;src:url('${italic}');font-style:italic}@font-face{font-family:DM;src:url('${body}')}*{box-sizing:border-box}body{margin:0;background:#f7f4e9;color:#f7f4e9;font-family:DM,Arial,sans-serif}main{position:relative;isolation:isolate;height:535px;text-align:center;padding:32px 48px}img{position:absolute;inset:0;width:1200px;height:535px;object-fit:cover;object-position:center 47%;z-index:-2}.shade{position:absolute;inset:0;z-index:-1;background:linear-gradient(#201d17a6,#201d1780 45%,#201d17b3)}header{font-size:13px;letter-spacing:.5px}.label{font-size:11px;letter-spacing:1.5px;text-transform:uppercase;margin:30px 0 22px}h1{font:400 104px/.94 Instrument,Georgia,serif;letter-spacing:-2.5px;margin:0}h1 span{display:block}h1 span:last-child{font-style:italic}p{font-size:17px;line-height:1.6;max-width:520px;margin:24px auto 0}.facts{height:95px;padding:24px 48px;display:flex;justify-content:space-between;align-items:center;font-size:17px;color:#123e34}.date:first-letter{text-transform:uppercase}
  </style><main><img src="${photo}" alt="" /><div class="shade"></div><header>${escape(brand.name)}</header><div class="label">Kerstfeest ${escape(event.year)} · Kursaal Oostende</div><h1>${event.title.split('\n').map(line=>`<span>${escape(line)}</span>`).join('')}</h1><p>${escape(event.intro)}</p></main><div class="facts"><span class="date">${escape(formatEventDate(event.date,event.timezone))}</span><span>${escape(event.venueName)}</span><span>${escape(formatPrice(event.priceEuro))} per persoon</span></div></html>`);
  await page.evaluate(() => document.fonts.ready);
  await page.locator('img').evaluate(image => image.decode());
  const jpeg = await page.screenshot({ path: new URL('public/og-image.jpg', root).pathname, type: 'jpeg', quality: 90 });
  await writeFile(new URL('public/social-card.svg', root), `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="${escape(event.title.replace(/\n/g,' '))}"><image width="1200" height="630" href="data:image/jpeg;base64,${jpeg.toString('base64')}"/></svg>`);
  console.log('Deelbeeld bijgewerkt: 1200×630, kaarslicht en centrale evenementgegevens.');
} finally { await browser.close(); }
