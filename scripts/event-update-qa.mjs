import { chromium, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const browser = await chromium.launch();
try {
  const context = await browser.newContext();
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(process.env.QA_URL || 'http://127.0.0.1:4325/');
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('.hero-hours')).toContainText('17.00 uur');
    await expect(page.locator('.participation-note')).toContainText('negen ontmoetingscentra');
    await expect(page.locator('#welkom')).toContainText('50 jaar');
    await expect(page.locator('#praktisch')).toContainText('Het menu wordt later bekendgemaakt.');
    await expect(page.locator('main')).not.toContainText(/erwtensoep|garnaalkroketten/i);
    await expect(page.locator('#praktisch')).toContainText('Patrick');
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Overflow at ${width}px`);
    const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    assert.deepEqual(axe.violations.map(violation => violation.id), []);
    if (width === 390 || width === 1440) await page.screenshot({ path: `qa/event-update-${width}.png`, fullPage: true });
    console.log(`Content, layout and accessibility OK: ${width}px`);
  }
  const structured = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent())['@graph'].find(item => item['@type'] === 'Event');
  assert.equal(structured.startDate, '2026-12-24T16:00:00.000Z');
  assert.equal(structured.endDate, '2026-12-24T20:30:00.000Z');
  const downloadPromise = page.waitForEvent('download');
  await page.locator('.calendar-download').click();
  const download = await downloadPromise;
  const calendar = await readFile(await download.path(), 'utf8');
  assert.match(calendar, /DTSTART:20261224T160000Z/);
  assert.match(calendar, /DTEND:20261224T203000Z/);
  assert.deepEqual(errors, []);
  console.log('Metadata, calendar download and browser errors OK.');
} finally { await browser.close(); }
