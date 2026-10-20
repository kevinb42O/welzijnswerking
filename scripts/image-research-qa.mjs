import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { writeFileSync, mkdirSync, readdirSync, readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
const out = 'qa/beeldonderzoek-2026-10-20';
mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const results = [];
try {
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('http://127.0.0.1:4323/dev-preview/fotoselectie', { waitUntil: 'networkidle' });
    await page.locator('.event-archive').scrollIntoViewIfNeeded();
    await page.evaluate(() => Promise.all([...document.images].map(image => image.decode().catch(() => {}))));
    const result = {
      width,
      overflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
      brokenImages: await page.evaluate(() => [...document.images].filter(image => !image.complete || !image.naturalWidth).map(image => image.src)),
      axe: (await new AxeBuilder({ page }).analyze()).violations.map(v => ({ id: v.id, impact: v.impact })),
    };
    assert.equal(result.overflow, false); assert.deepEqual(result.brokenImages, []); assert.deepEqual(result.axe, []);
    await page.locator('.event-archive').screenshot({ path: `${out}/selectie-${width}.png` });
    results.push(result);
  }
  await page.goto('http://127.0.0.1:4323/dev-preview/beeldenonderzoek', { waitUntil: 'networkidle' });
  await page.evaluate(() => Promise.all([...document.images].map(image => image.decode().catch(() => {}))));
  assert.equal(await page.locator('.research-archive img').count(), 9);
  assert.equal(await page.evaluate(() => [...document.images].filter(image => !image.complete || !image.naturalWidth).length), 0);
  const denied = await context.request.get('http://127.0.0.1:4323/dev-preview/research-image/not-allowed.jpg');
  assert.equal(denied.status(), 404);
  await page.goto('http://127.0.0.1:4323/', { waitUntil: 'networkidle' });
  assert.equal(await page.locator('img[src*="research-image"]').count(), 0);
  assert.equal(await page.locator('.archive-reportages a').count(), 2);
  assert.equal(await page.locator('.event-archive img').count(), 7);
  assert.equal(await page.getByText('Individuele maker niet vermeld.').count(), 0);
  assert.equal(await page.locator('.research-status').count(), 0);
  assert.equal(await page.locator('#organisatie img').count(), 1);
  assert.match(await page.locator('#organisatie').innerText(), /Fabrice Goffin/);
  function files(dir) { return readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? files(`${dir}/${entry.name}`) : [`${dir}/${entry.name}`]); }
  const built = files('dist');
  assert.equal(built.some(file => file.includes('dev-preview') || file.includes('research-image')), false);
  const manifest = JSON.parse(readFileSync('assets/fotos-vorige-edities/onderzoek-2026-10-20/manifest.json', 'utf8'));
  const pendingHashes = new Set(manifest.assets.map(item => item.sha256));
  assert.equal(built.some(file => pendingHashes.has(createHash('sha256').update(readFileSync(file)).digest('hex'))), false);
  assert.equal(readFileSync('dist/index.html','utf8').includes('/dev-preview/research-image/'), false);
  assert.deepEqual(errors, []);
  const report = { results, researchImages: 9, homepageResearchImages: 0, homepageEventPhotos: 7, pressLinks: 2, unknownImageStatus: 404, productionHasResearchRoutes: false, productionHasResearchImageHashes: false, errors };
  writeFileSync(`${out}/browser-report.json`, JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report, null, 2));
} finally { await browser.close(); }
