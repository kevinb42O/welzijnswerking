import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
const browser = await chromium.launch();
const base = process.env.QA_URL || 'http://127.0.0.1:4325/';
const output = 'qa/motion-2026-10-20';
await mkdir(output, { recursive: true });
const results = [];
try {
  for (const reducedMotion of ['no-preference', 'reduce']) {
    const context = await browser.newContext({ reducedMotion, viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base);
    await expect(page.locator('h1')).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    const summary = page.locator('.welcome-questions summary').first();
    await summary.click();
    await expect(page.locator('.welcome-questions details').first()).toHaveAttribute('open', '');
    // Reverse a live animation before it has settled, then check intrinsic layout.
    await summary.evaluate(element => { if (element instanceof HTMLElement) { element.click(); element.click(); element.click(); } });
    await expect(page.locator('.welcome-questions details').first()).not.toHaveAttribute('open', '');
    await summary.click();
    await page.locator('.welcome-questions summary').nth(1).click();
    await expect(page.locator('.welcome-questions details[open]')).toHaveCount(1);
    await expect.poll(() => page.locator('.welcome-questions details').nth(1).evaluate(el => el.style.height)).toBe('');
    await page.goto(base);
    await page.locator('.menu-toggle').click();
    await expect(page.locator('#mobile-menu')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('#mobile-menu')).not.toBeVisible();
    await expect(page.locator('.menu-toggle')).toBeFocused();
    await page.locator('.menu-toggle').click();
    await page.locator('.mobile-nav-participate').click();
    await expect(page).toHaveURL(/#inschrijven$/);
    await expect(page.locator('#inschrijven')).toBeFocused();
    await page.goto(`${base}#ontmoetingscentra`);
    await expect(page.locator('[data-centre-finder]')).toHaveClass(/centre-finder-enhanced/);
    await page.locator('.centre-card').first().locator('.centre-practical > summary').click();
    await expect(page.locator('.centre-practical').first()).toHaveAttribute('open', '');
    const photo = page.locator('[data-photo-open]').first();
    await photo.click();
    await expect(page.locator('#event-lightbox .photo-viewer-stage img')).toBeVisible();
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('#event-lightbox .photo-viewer-caption')).toContainText('2 /');
    await page.keyboard.press('Escape');
    await expect(page.locator('#event-lightbox')).not.toBeVisible();
    await expect(photo).toBeFocused();
    await page.goto(base);
    if (reducedMotion === 'reduce') {
      assert.equal(await page.evaluate(() => document.getAnimations().filter(a => a.playState === 'running').length), 0);
    }
    // Changing preference while an entrance runs must finish spatial movement.
    await page.locator('.menu-toggle').click();
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect.poll(() => page.locator('#mobile-menu').evaluate(el => getComputedStyle(el).opacity)).toBe('1');
    await page.keyboard.press('Escape');
    await page.emulateMedia({ reducedMotion });
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(base);
      await page.waitForTimeout(1200);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      await page.screenshot({ path: `${output}/${reducedMotion}-${width}.png`, fullPage: width === 1440 });
    }
    assert.deepEqual(errors, []);
    results.push({ reducedMotion, passed: true, viewports: [320, 390, 768, 1440] });
    await context.close();
  }
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(base);
  await expect(page.locator('h1')).toBeVisible();
  await page.locator('.welcome-questions summary').first().click();
  await expect(page.locator('.faq-answer').first()).toBeVisible();
  await page.locator('.centre-card').first().locator('.centre-practical > summary').click();
  await expect(page.locator('.centres-list')).toBeVisible();
  results.push({ javaScript: false, passed: true });
  await writeFile(`${output}/results.json`, JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results));
} finally { await browser.close(); }
