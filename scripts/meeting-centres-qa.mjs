import { chromium, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile, readFile } from 'node:fs/promises';

const base = process.env.QA_URL || 'http://127.0.0.1:4325/';
const devBase = process.env.DEV_QA_URL || 'http://127.0.0.1:4323';
await mkdir('qa', { recursive: true });
const browser = await chromium.launch();
const report = { layouts: [], states: [], noJavaScript: false, enlargedText: false };
const errors = [];

try {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  page.on('pageerror', error => errors.push(error.message));
  for (const width of [320, 360, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(base);
    await page.evaluate(() => document.fonts.ready);
    const disclosure = page.locator('.centres-disclosure');
    const summary = disclosure.locator('summary');
    await expect(disclosure).not.toHaveAttribute('open');
    await expect(page.locator('.centre-phone').first()).toBeHidden();
    const collapsedAxe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    assert.deepEqual(collapsedAxe.violations.map(violation => violation.id), []);
    await page.locator('#ontmoetingscentra').focus();
    if (width === 390 || width === 1440) await page.screenshot({ path: `qa/meeting-centres-collapsed-${width}.png` });
    await summary.focus();
    await page.keyboard.press('Enter');
    await expect(disclosure).toHaveAttribute('open', '');
    await page.keyboard.press('Enter');
    await expect(disclosure).not.toHaveAttribute('open');
    const hero = page.locator('.hero .button');
    await expect(hero).toHaveAttribute('href', '#inschrijven');
    await hero.focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('#inschrijven')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Vind een ontmoetingscentrum' })).toBeFocused();
    if (width === 390 || width === 1440) await page.screenshot({ path: `qa/registration-${width}.png` });
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#ontmoetingscentra$/);
    await expect(disclosure).toHaveAttribute('open', '');
    await expect(page.locator('#ontmoetingscentra')).toBeFocused();
    assert.ok(await page.locator('#ontmoetingscentra').evaluate(el => Math.abs(el.getBoundingClientRect().top) < 80));
    await page.keyboard.press('Tab');
    await expect(summary).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.locator('.centre-phone').first()).toBeFocused();
    await expect(page.locator('.centre-card')).toHaveCount(9);
    await expect(page.locator('.centre-phone svg[aria-hidden="true"]')).toHaveCount(9);
    const contacts = await page.locator('.centre-card').evaluateAll(cards => cards.map(card => {
      const links = [...card.querySelectorAll('a')];
      return {
        name: card.querySelector('h3').textContent,
        address: card.querySelector('.centre-address').innerText.replace(/\n/g, ', '),
        phone: links[0].getAttribute('href'),
        route: links[1].href,
        official: links[2].href,
        targets: links.map(link => ({ width: link.getBoundingClientRect().width, height: link.getBoundingClientRect().height })),
      };
    }));
    assert.equal(new Set(contacts.map(contact => contact.name)).size, 9);
    for (const contact of contacts) {
      assert.match(contact.phone, /^tel:059\d{6}$/);
      const route = new URL(contact.route);
      assert.equal(route.origin, 'https://www.google.com');
      assert.equal(route.pathname, '/maps/dir/');
      assert.ok(route.searchParams.get('destination').endsWith(contact.address));
      assert.equal(new URL(contact.official).hostname, 'www.oostende.be');
      assert.ok(contact.targets.every(target => target.height >= 44 && target.width >= 44));
    }
    // Catch the address/phone discrepancies found on older general city pages.
    await expect(page.locator('.centre-card').filter({ has: page.getByRole('heading', { name: 'Oud Hospitaal', exact: true }) })).toContainText('Amsterdamstraat 61');
    await expect(page.locator('.centre-card').filter({ has: page.getByRole('heading', { name: 'De Ballon', exact: true }) })).toContainText('Mansveldstraat 9');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    assert.deepEqual(axe.violations.map(violation => ({ id: violation.id, nodes: violation.nodes })), []);
    if (width === 390 || width === 1440) {
      await page.locator('#ontmoetingscentra').focus();
      await page.screenshot({ path: `qa/meeting-centres-${width}.png` });
    }
    report.layouts.push({ width, centres: contacts.length, collapsedByDefault: true, keyboardToggle: true, opensFromRegistrationLink: true, phoneIcons: 9, keyboardRoute: true, touchTargets: true, axeViolations: 0, overflow: false });
  }

  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto(base);
  await page.locator('.centres-disclosure summary').click();
  await page.evaluate(() => {
    const sizes = [...document.querySelectorAll('#inschrijven, #inschrijven *, #ontmoetingscentra, #ontmoetingscentra *')].map(el => [el, parseFloat(getComputedStyle(el).fontSize)]);
    for (const [el, size] of sizes) el.style.fontSize = `${size * 2}px`;
  });
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
  report.enlargedText = true;

  await page.goto(`${base}#ontmoetingscentra`);
  await expect(page.locator('.centres-disclosure')).toHaveAttribute('open', '');
  await page.locator('.centres-disclosure summary').click();
  await expect(page.locator('.centres-disclosure')).not.toHaveAttribute('open');
  await page.getByRole('link', { name: 'Vind een ontmoetingscentrum' }).click();
  await expect(page.locator('.centres-disclosure')).toHaveAttribute('open', '');

  for (const state of ['centres', 'centres-available', 'centres-online', 'centres-sold-out', 'centres-closed']) {
    await page.goto(`${devBase}/dev-preview/state-${state}`);
    await expect(page.locator('.centre-card')).toHaveCount(9);
    const closed = state === 'centres-sold-out' || state === 'centres-closed';
    const online = state === 'centres-online';
    await expect(page.locator('#inschrijven a[href="#ontmoetingscentra"]')).toHaveCount(closed || online ? 0 : 1);
    await expect(page.locator('.hero .button')).toHaveAttribute('href', closed ? '#praktisch' : online ? 'https://example.com/tickets' : '#inschrijven');
    if (closed) {
      await expect(page.locator('#inschrijven')).toContainText(state === 'centres-sold-out' ? 'uitverkocht' : 'afgesloten');
      await expect(page.locator('#ontmoetingscentra')).not.toContainText('Vragen over inschrijven');
      await expect(page.locator('.hero .button')).not.toContainText('Hoe schrijf ik me in?');
    }
    report.states.push({ state, passed: true });
  }
  await page.goto(`${devBase}/dev-preview/state-start`);
  await expect(page.locator('#ontmoetingscentra')).toHaveCount(0);
  const noJsContext = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 360, height: 800 }, reducedMotion: 'reduce' });
  const noJsPage = await noJsContext.newPage();
  await noJsPage.goto(base);
  await expect(noJsPage.locator('.centres-disclosure')).not.toHaveAttribute('open');
  await noJsPage.locator('.hero .button').click();
  await noJsPage.getByRole('link', { name: 'Vind een ontmoetingscentrum' }).click();
  await expect(noJsPage).toHaveURL(/#ontmoetingscentra$/);
  await noJsPage.locator('.centres-disclosure summary').click();
  await expect(noJsPage.locator('.centre-phone').first()).toBeVisible();
  await expect(noJsPage.locator('.centre-card')).toHaveCount(9);
  report.noJavaScript = true;
  await noJsContext.close();
  assert.deepEqual(errors, []);
  const html = await readFile('dist/index.html', 'utf8');
  assert.ok(html.includes('id="ontmoetingscentra"'));
  assert.ok(!html.includes('DEMO ·'));
  await writeFile('qa/meeting-centres-report.json', `${JSON.stringify(report, null, 2)}\n`);
  console.log('Meeting centres: collapsed by default, keyboard toggle, automatic opening from links, 9 phone icons, 5 screen sizes, axe, 200% text, 5 registration states and no-JavaScript flow passed.');
} finally {
  await browser.close();
}
