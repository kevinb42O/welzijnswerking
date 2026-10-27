import { chromium, webkit } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
const folder = 'qa/hero-split-2026-10-27';
const url = process.env.QA_URL || 'http://127.0.0.1:4323';
await mkdir(folder, { recursive: true });
const results = [];
for (const [engine, launcher] of Object.entries({ chromium, webkit })) {
  const browser = await launcher.launch();
  try {
    for (const width of [320, 390, 768, 1001, 1440, 2048]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(url);
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(150);
      assert.equal(await page.locator('#praktisch').evaluate(el => el.compareDocumentPosition(document.querySelector('#welkom')) & Node.DOCUMENT_POSITION_FOLLOWING), 4);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      const active = await page.locator('[data-hero-transition]').getAttribute('data-split-active');
      assert.equal(active === 'true', width >= 1001);
      if (active) {
        const { top, travel } = await page.locator('[data-hero-transition]').evaluate(el => ({ top: el.getBoundingClientRect().top + scrollY, travel: parseFloat(el.style.getPropertyValue('--split-travel')) }));
        for (const [name, progress] of [['start', 0], ['middle', .5], ['open', 1]]) {
          await page.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), top + travel * progress);
          await page.waitForTimeout(100);
          const state = await page.locator('.hero-transition-stage').evaluate(el => ({ top: el.getBoundingClientRect().top, left: getComputedStyle(el.querySelector('.hero-inner')).transform, right: getComputedStyle(el.querySelector('.hero-photo')).transform, hidden: getComputedStyle(el.querySelector('.hero')).visibility }));
          assert.ok(Math.abs(state.top) < 2, `${engine}/${width}/${name}: sticky stage`);
          if (progress === .5) { assert.ok(translationX(state.left) < 0); assert.ok(translationX(state.right) > 0); }
          if (progress === 1) assert.equal(state.hidden, 'hidden');
          if (engine === 'chromium' && width === 1440) await page.screenshot({ path: `${folder}/${name}.png` });
        }
        await page.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), top);
        await page.waitForTimeout(100);
        assert.equal(await page.locator('.hero').evaluate(el => el.inert), false);
        await page.locator('.hero .button').click();
        await page.waitForTimeout(100);
        assert.equal(await page.locator('.hero').evaluate(el => getComputedStyle(el).visibility), 'hidden');
        assert.ok(await page.locator('#inschrijven').evaluate(el => Math.abs(el.getBoundingClientRect().top - 24) < 2));
        await page.goto(`${url}/#praktisch`);
        await page.waitForTimeout(200);
        assert.equal(await page.locator('.hero').evaluate(el => getComputedStyle(el).visibility), 'hidden');
        await page.emulateMedia({ reducedMotion: 'reduce' });
        await page.waitForTimeout(100);
        assert.equal(await page.locator('[data-hero-transition]').getAttribute('data-split-active'), null);
      }
      assert.deepEqual(errors, []);
      results.push({ engine, width, passed: true });
      await page.close();
    }
    const page = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
    await page.goto(url);
    assert.equal(await page.locator('[data-hero-transition]').getAttribute('data-split-active'), null);
    assert.ok(await page.locator('#praktisch').evaluate(el => el.getBoundingClientRect().height > 0));
    await page.close();
  } finally { await browser.close(); }
}
await writeFile(`${folder}/results.json`, JSON.stringify(results, null, 2));
console.log(JSON.stringify({ passed: true, cases: results.length, noJavaScript: true, anchors: true, reducedMotion: true }));
function translationX(value) { return Number(value.match(/matrix(?:3d)?\((.+)\)/)?.[1].split(',')[value.startsWith('matrix3d') ? 12 : 4] || 0); }
