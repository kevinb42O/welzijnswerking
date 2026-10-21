import { chromium, webkit, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
const base = process.env.QA_URL || 'http://127.0.0.1:4325/';
const out = 'qa/centre-photos-2026-10-21';
const photos = JSON.parse(await readFile('src/data/centre-photos.json', 'utf8'));
const fallback = '/images/ontmoetingscentra/centrum-in-het-groen.webp';
await mkdir(out, { recursive: true });
const report = { layouts: [], errors: [] };
assert.equal(Object.keys(photos).length, 9);
for (const [engineName, engine] of [['chromium', chromium], ['webkit', webkit]]) {
 const browser = await engine.launch();
 try {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  page.on('pageerror', error => report.errors.push(error.message));
  const photo = page.locator('[data-centre-photo]');
  const image = page.locator('[data-centre-photo-image]');
  const credit = page.locator('[data-centre-photo-source]');
  for (const width of [390, 1440]) {
   await page.setViewportSize({ width, height: 1000 });
   await page.goto(base);
   await expect(page.locator('[data-centre-finder]')).toHaveClass(/centre-finder-enhanced/);
   await expect(image).toHaveAttribute('src', fallback);
   await expect(photo).toBeVisible();
   await expect(credit).toBeHidden();
   await expect(photo.locator('..')).toHaveClass(width < 1001 ? 'centre-photo-mobile-slot' : 'centres-heading');
   await page.locator('[data-show-all]').click();
   for (const [id, entry] of Object.entries(photos)) {
    const card = page.locator(`[data-centre-id="${id}"]`);
    const summary = card.locator('.centre-detail-toggle');
    if (await card.locator('.centre-detail').evaluate(el => el.open)) await summary.click();
    await summary.focus();
    await page.keyboard.press('Enter');
    await expect(photo).toHaveAttribute('data-selected-centre', id);
    await expect(image).toHaveAttribute('src', entry.src);
    await expect(image).toHaveAttribute('alt', entry.alt);
    await expect(credit).toContainText(entry.name);
    await expect(credit).toHaveAttribute('href', entry.sourceUrl);
    assert.ok(await image.evaluate(img => img.complete && img.naturalWidth > 0));
    assert.equal(await image.evaluate(img => getComputedStyle(img).objectFit), 'contain');
   }
   await page.locator('[data-centre-id="kasteeltje"] .centre-detail-toggle').click();
   await expect(image).toHaveAttribute('src', fallback);
   await expect(credit).toBeHidden();
   if (width >= 1001) await page.locator('[data-district="Stene"]').click();
   else await page.locator('[data-district-select]').selectOption('Stene');
   await expect(photo).toHaveAttribute('data-selected-centre', 'de-blomme');
   assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
   const axe = await new AxeBuilder({ page }).include('#ontmoetingscentra').withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']).analyze();
   assert.deepEqual(axe.violations.map(v => ({ id: v.id, targets: v.nodes.map(n => n.target) })), []);
   await page.mouse.move(0,0);
   if (engineName === 'chromium') await page.locator('[data-centre-finder]').screenshot({ path: `${out}/selected-${width}.png` });
   report.layouts.push({ engine: engineName, width, photos: 9, initialFallback: true, keyboardSelection: true, attribution: true, axeViolations: 0 });
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(photo).toHaveCount(1);
  await expect(photo.locator('..')).toHaveClass('centre-photo-mobile-slot');
  await expect(photo).toHaveAttribute('data-selected-centre', 'de-blomme');
  await page.locator('[data-show-map]').click();
  await expect(page.locator('.centre-map-marker')).toHaveCount(9);
  await page.locator('[data-map-choice]').selectOption('kasteeltje');
  await expect(photo).toHaveAttribute('data-selected-centre', 'kasteeltje');
  await page.getByRole('button', { name: 'Toon De Boeie, Centrum', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(photo).toHaveAttribute('data-selected-centre', 'de-boeie');
  // A late image response must not overwrite a newer selection.
  await page.route('**/schaperye.webp', async route => { await new Promise(resolve => setTimeout(resolve, 300)); await route.continue(); });
  await page.goto(base);
  await page.locator('[data-district-select]').selectOption('Konterdam');
  await page.locator('[data-district-select]').selectOption('Stene');
  await expect(photo).toHaveAttribute('data-selected-centre', 'de-blomme');
  await page.waitForTimeout(400);
  await expect(photo).toHaveAttribute('data-selected-centre', 'de-blomme');
  await page.route('**/de-ballon.webp', route => route.abort());
  await page.locator('[data-district-select]').selectOption('Vuurtorenwijk');
  await expect(image).toHaveAttribute('src', fallback);
  await expect(credit).toBeHidden();
  const noJs = await browser.newPage({ javaScriptEnabled: false, viewport: { width:1440, height:900 } });
  await noJs.goto(base);
  await expect(noJs.locator('[data-centre-photo-image]')).toHaveAttribute('src', fallback);
  await expect(noJs.locator('.centre-card')).toHaveCount(9);
  await noJs.close();
 } finally { await browser.close(); }
}
assert.deepEqual(report.errors, []);
report.rapidSelection = report.failedImageFallback = report.mapSelection = report.responsiveMove = report.noJavaScriptFallback = true;
await writeFile(`${out}/report.json`, JSON.stringify(report,null,2)+'\n');
console.log('Centre photos passed: 9 verified photos, initial fallback, caption/alt, keyboard, mobile/desktop, map, rapid selection, load failure and no-JS.');
