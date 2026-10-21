import { chromium, webkit, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

const base = process.env.QA_URL || 'http://127.0.0.1:4325/';
const dev = process.env.DEV_QA_URL || 'http://127.0.0.1:4323';
const out = process.env.QA_OUT_DIR || 'qa/centre-finder-2026-10-21';
await mkdir(out, { recursive: true });
const report = { base, layouts: [], states: [], noJavaScript: [], errors: [] };
const districts = ['Centrum', 'Konterdam', 'Mariakerke', 'Raversijde', 'Stene', 'Vuurtorenwijk', 'Westerkwartier', 'Zandvoorde'];
const tags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
for (const [name, engine] of [['chromium', chromium], ['webkit', webkit]]) {
  const browser = await engine.launch();
  try {
    const context = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await context.newPage();
    page.on('pageerror', error => report.errors.push(`${name}: ${error.message}`));
    const widths = name === 'chromium' ? [320, 390, 767, 768, 1001, 1440] : [390, 768, 1440];
    for (const width of widths) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(base);
      const root = page.locator('[data-centre-finder]');
      await expect(root).toHaveClass(/centre-finder-enhanced/);
      await root.scrollIntoViewIfNeeded();
      await expect(root.locator('.centre-card:visible')).toHaveCount(2);
      await expect(root.locator('[data-results-title]')).toHaveText('In Centrum');
      const chooser = root.locator(width >= 768 ? '[data-district="Centrum"]' : '[data-district-select]');
      await expect(chooser).toBeVisible();
      await chooser.focus();
      await page.keyboard.press('Tab');
      if (width < 768) await expect(root.locator('.centre-detail-toggle').first()).toBeFocused();
      for (const district of districts) {
        if (width >= 768) await root.locator(`[data-district="${district}"]`).click();
        else await root.locator('[data-district-select]').selectOption(district);
        await expect(root.locator('[data-results-title]')).toHaveText(`In ${district}`);
        await expect(root.locator('.centre-card:visible')).toHaveCount(district === 'Centrum' ? 2 : 1);
        await expect(root.locator('.centre-card:visible .centre-detail').first()).toHaveAttribute('open', '');
        const visibleDistricts = await root.locator('.centre-card:visible').evaluateAll(cards => cards.map(card => card.dataset.centreDistrict));
        assert.ok(visibleDistricts.every(value => value === district));
        await expect(root.locator('[data-district-select]')).toHaveValue(district);
        await expect(root.locator(`[data-district="${district}"]`)).toHaveAttribute('aria-pressed', 'true');
      }
      await root.locator('[data-show-all]').focus();
      await page.keyboard.press('Enter');
      await expect(root.locator('.centre-card:visible')).toHaveCount(9);
      await expect(root.locator('[data-show-all]')).toBeFocused();
      await expect(root.locator('[data-centre-district="Zandvoorde"] .centre-summary-district')).toBeVisible();
      const contacts = await root.locator('.centre-card').evaluateAll(cards => cards.map(card => ({
        address: card.querySelector('.centre-address').textContent,
        phone: card.querySelector('.centre-phone').getAttribute('href'),
        route: card.querySelector('.centre-actions .text-link').href,
        official: card.querySelector('.centre-official').href,
      })));
      for (const contact of contacts) {
        assert.match(contact.phone, /^tel:059\d{6}$/);
        assert.ok(new URL(contact.route).searchParams.get('destination').endsWith(contact.address));
        assert.equal(new URL(contact.official).hostname, 'www.oostende.be');
      }
      await root.locator('[data-show-all]').click();
      await expect(root.locator('[data-results-title]')).toHaveText('In Zandvoorde');
      await expect(root.locator('.centre-card:visible')).toHaveCount(1);
      if(width >= 768) await root.locator('[data-district="Centrum"]').click();
      else await root.locator('[data-district-select]').selectOption('Centrum');
      await expect(root.locator('.centre-card:visible')).toHaveCount(2);
      const first = root.locator('.centre-card:visible').first();
      const second = root.locator('.centre-card:visible').nth(1);
      await second.locator('.centre-detail-toggle').focus();
      await page.keyboard.press('Enter');
      await expect(second.locator('.centre-detail')).toHaveAttribute('open', '');
      await first.locator('.centre-practical > summary').focus();
      await page.keyboard.press('Enter');
      await expect(first.locator('[data-centre-hours="de-boeie"]')).toBeVisible();
      await expect(first.locator('.centre-closures')).toContainText('26 december');
      await first.locator('.centre-desk-hours > summary').click();
      await expect(first.locator('.centre-desk-hours')).toHaveAttribute('open', '');
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      const axe = await new AxeBuilder({ page }).include('#ontmoetingscentra').withTags(tags).analyze();
      assert.deepEqual(axe.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })), []);
      const targets = await root.locator('button:visible, a:visible, summary:visible, select:visible').evaluateAll(elements => elements.map(element => element.getBoundingClientRect().height));
      assert.ok(targets.every(height => height >= 44), `44px touch heights ${width}: ${targets}`);
      // Return to the compact state for screenshots.
      await root.locator('[data-show-all]').click();
      await root.locator('[data-show-all]').click();
      await root.evaluate(element => element.scrollIntoView({ block: 'start', behavior: 'instant' }));
      if (name === 'chromium' && [390, 1440].includes(width)) await page.screenshot({ path: `${out}/finder-${width}.png` });
      report.layouts.push({ engine: name, width, allDistricts: true, allContacts: true, keyboard: true, axeViolations: 0, overflow: false });
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${base}#ontmoetingscentra`);
    const root = page.locator('[data-centre-finder]');
    await expect(root.locator('[data-results-title]')).toHaveText('In Centrum');
    await root.locator('[data-show-map]').click();
    await expect(root.locator('[data-centre-map]')).toHaveAttribute('open', '');
    await expect(root.locator('[data-centre-map] > summary')).toBeFocused();
    await expect(root.locator('.centre-map-marker')).toHaveCount(9, { timeout: 15000 });
    await root.locator('[data-map-choice]').selectOption('kasteeltje');
    await expect(root.locator('[data-map-name]')).toHaveText('’t Kasteeltje');
    await expect(root.locator('[data-map-hours]')).toHaveAttribute('data-hours-centre', 'kasteeltje');
    await root.locator('[data-centre-map] > summary').click();
    await expect(root.locator('[data-show-map]')).toBeFocused();
    await expect(root.locator('.centre-finder-map')).toBeHidden();
    await root.locator('[data-district-select]').selectOption('Mariakerke');
    await root.locator('[data-show-map]').click();
    await expect(root.locator('[data-map-name]')).toHaveText('’t Viooltje');
    await page.goto(base);
    await page.setViewportSize({ width: 320, height: 900 });
    await page.locator('[data-show-all]').click();
    await page.locator('.centre-detail-toggle').nth(8).click();
    await page.locator('.centre-card').nth(8).locator('.centre-practical > summary').click();
    await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, '200% text overflow');
    const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    const fallback = await noJs.newPage();
    await fallback.goto(`${base}#ontmoetingscentra`);
    await expect(fallback.locator('.centre-card:visible')).toHaveCount(9);
    await expect(fallback.locator('[data-district-picker]')).toBeHidden();
    await fallback.locator('.centre-detail-toggle').nth(8).click();
    await expect(fallback.locator('.centre-card').nth(8).locator('.centre-phone')).toBeVisible();
    await fallback.locator('.centre-card').nth(8).locator('.centre-practical > summary').click();
    await expect(fallback.locator('[data-centre-hours="kasteeltje"]')).toBeVisible();
    report.noJavaScript.push({ engine: name, nineCentres: true, nativeDetails: true, contactLinks: true });
    await noJs.close();
    if (name === 'chromium') {
      for (const state of ['centres', 'centres-available', 'centres-online', 'centres-sold-out', 'centres-closed']) {
        await page.goto(`${dev}/dev-preview/state-${state}`);
        await expect(page.locator('.centre-card')).toHaveCount(9);
        const closed = ['centres-sold-out', 'centres-closed'].includes(state);
        const online = state === 'centres-online';
        await expect(page.locator('#inschrijven a[href="#ontmoetingscentra"]')).toHaveCount(closed || online ? 0 : 1);
        if (closed) await expect(page.locator('.centre-visit-note')).not.toContainText('inschrijven');
        report.states.push({ state, passed: true });
      }
    }
    await context.close();
  } finally { await browser.close(); }
}
assert.deepEqual(report.errors, []);
await writeFile(`${out}/report.json`, JSON.stringify(report, null, 2));
console.log('Centre finder passed: district filtering, all 9 contacts, keyboard, map markers, opening hours, 200% text, no JavaScript and registration states in Chromium/WebKit.');
