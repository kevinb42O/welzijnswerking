import { chromium, webkit, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

const base = process.env.QA_URL || 'http://127.0.0.1:4325/';
const out = process.env.QA_OUT_DIR || 'qa/accessibility-2026-10-21/after';
await mkdir(out, { recursive: true });
const results = [];
for (const [engine, type] of [['chromium', chromium], ['webkit', webkit]]) {
  const browser = await type.launch();
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base);
    const strip = page.locator('.hero-facts');
    assert.equal(await page.locator('[data-stop-facts-motion]').count(), 0);
    await expect(strip).toHaveAttribute('data-sleigh-state', 'playing', { timeout: 15000 });
    const started = Date.now();
    await expect(strip).toHaveAttribute('data-sleigh-state', 'done', { timeout: 5000 });
    const remainingMotionMs = Date.now() - started;
    assert.ok(remainingMotionMs < 5000, 'Automatic motion must finish within five seconds');
    assert.equal(await strip.evaluate(element => getComputedStyle(element).transform), 'none');
    await expect(page.locator('.facts-sleigh-scene')).toBeHidden();
    await page.screenshot({ path: `${out}/${engine}-animation-finished.png` });

    await page.reload();
    await expect(strip).toHaveAttribute('data-sleigh-state', 'playing', { timeout: 15000 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect(strip).toHaveAttribute('data-sleigh-state', 'done');
    await page.reload();
    await expect(page.locator('.facts-sleigh-scene')).toBeHidden();

    await page.setViewportSize({ width: 320, height: 900 });
    await page.evaluate(() => document.documentElement.style.fontSize = '200%');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth), 320, '200% text must reflow');
    await page.locator('#inschrijven').screenshot({ path: `${out}/${engine}-registration-200.png` });

    await page.setViewportSize({ width: 320, height: 256 });
    await page.goto(base);
    const trigger = page.locator('[data-photo-open]').first();
    await trigger.click();
    const dialog = page.locator('[data-photo-viewer][open]');
    for (let index = 0; index < 7; index++) {
      await expect(dialog.locator('figcaption')).toContainText(`${index + 1} / 7`);
      const stage = dialog.locator('.photo-viewer-stage');
      assert.ok((await stage.boundingBox()).height >= 128, 'Photo must retain visible height');
      await stage.scrollIntoViewIfNeeded();
      await expect(stage.locator('img')).toBeVisible();
      await dialog.getByRole('button', { name: 'Volgende foto', exact: true }).click();
    }
    await dialog.screenshot({ path: `${out}/${engine}-viewer-scroll.png` });
    const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
    assert.deepEqual(axe.violations, []);
    await dialog.getByRole('button', { name: 'Sluiten — foto', exact: true }).click();
    await expect(trigger).toBeFocused();
    assert.deepEqual(errors, []);
    results.push({ engine, noStopButton: true, automaticMotionUnderFiveSeconds: true, remainingMotionMs, liveReducedMotion: true, reflow320Text200: true, sevenPhotosAt320x256: true, viewerAxeViolations: 0, errors });
  } finally { await browser.close(); }
}
await writeFile(`${out}/regressions.json`, JSON.stringify(results, null, 2));
console.log(JSON.stringify(results, null, 2));
