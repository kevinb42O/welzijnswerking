import { chromium, webkit, firefox, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';

const base = process.env.QA_URL || 'http://127.0.0.1:4325/';
await mkdir('qa', { recursive: true });
const engine = process.env.QA_BROWSER || 'chromium';
const browser = await ({ chromium, webkit, firefox })[engine].launch({ headless: true, ...(engine === 'chromium' ? { channel: 'chromium' } : {}) });
const context = await browser.newContext();
const page = await context.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const toggle = page.locator('.menu-toggle');
const menu = page.getByRole('dialog', { name: 'Een warme avond. Samen aan tafel.' });
const close = page.getByRole('button', { name: 'Sluit het menu' });
const questions = page.locator('.welcome-questions details');
const summaries = questions.locator('summary');
const tags = ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'];

try {
  for (const [width, height] of [[320,568], [390,844], [430,932], [768,1024], [844,390], [1000,900]]) {
    await page.setViewportSize({ width, height });
    await page.goto(base);
    await toggle.click();
    await expect(menu).toBeVisible();
    await expect(close).toBeFocused();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await page.evaluate(() => document.fonts.ready);
    const layout = await menu.evaluate(dialog => {
      const bounds = dialog.getBoundingClientRect();
      return {
        left: bounds.left, right: bounds.right, top: bounds.top, bottom: bounds.bottom,
        overflow: dialog.scrollWidth > dialog.clientWidth,
        documentOverflow: document.documentElement.scrollWidth > innerWidth,
        blur: getComputedStyle(dialog, '::backdrop').backdropFilter,
        modal: dialog.matches(':modal'),
      };
    });
    assert.ok(layout.left >= 0 && layout.right <= width && layout.top >= 0 && layout.bottom <= height, JSON.stringify(layout));
    assert.equal(layout.overflow, false);
    assert.equal(layout.documentOverflow, false);
    assert.equal(layout.modal, true);
    // Wait until the entrance animation has reached its final blur.
    await expect.poll(() => menu.evaluate(dialog => getComputedStyle(dialog, '::backdrop').backdropFilter)).toBe('blur(14px)');
    await page.keyboard.press('Shift+Tab');
    await expect(page.locator('.mobile-nav-participate')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(close).toBeFocused();
    if (width === 390) {
      await page.screenshot({ path: `qa/mobile-menu-390-${engine}.png` });
      const axe = await new AxeBuilder({ page }).withTags(tags).analyze();
      assert.deepEqual(axe.violations, [], 'Open menu accessibility');
    }
    await page.keyboard.press('Escape');
    await expect(menu).not.toBeVisible();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toBeFocused();
    assert.equal(await page.locator('body').evaluate(body => body.classList.contains('menu-open')), false);
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base);
  await toggle.click();
  const bounds = await menu.boundingBox();
  await page.mouse.click(bounds.x + 5, bounds.y + 100);
  await expect(menu).toBeVisible(); // Panel padding is not a backdrop click.
  await page.mouse.click(5, 800);
  await expect(menu).not.toBeVisible();
  await expect(toggle).toBeFocused();
  await toggle.click();
  await close.click();
  await expect(menu).not.toBeVisible();

  // Opening and closing restores the underlying page, including a nonzero scroll position.
  await page.evaluate(() => scrollTo({ top: 20, behavior: 'instant' }));
  const scrollBefore = await page.evaluate(() => scrollY);
  // Programmatic activation avoids Playwright scrolling the trigger into view first.
  await toggle.evaluate(button => button.click());
  assert.equal(await page.locator('body').evaluate(body => getComputedStyle(body).position), 'fixed');
  await page.mouse.wheel(0, 400);
  await close.click();
  assert.equal(await page.evaluate(() => scrollY), scrollBefore);

  for (const href of ['#welkom', '#edities', '#partners', '#praktisch']) {
    await page.goto(base);
    await toggle.click();
    await page.locator(`#mobile-nav a[href="${href}"]`).click();
    await expect(menu).not.toBeVisible();
    await expect(page).toHaveURL(new RegExp(`${href}$`));
    await expect(page.locator(href)).toBeFocused();
    await expect.poll(() => page.locator(href).evaluate(target => Math.abs(target.getBoundingClientRect().top - 24))).toBeLessThan(2);
  }

  await page.goto(base);
  await toggle.click();
  await page.setViewportSize({ width: 1001, height: 900 });
  await expect(menu).not.toBeVisible();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  assert.equal(await page.locator('body').evaluate(body => body.classList.contains('menu-open')), false);
  await expect(page.locator('.desktop-nav')).toBeVisible();

  for (const width of [320, 390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(base);
    assert.equal(await page.locator('.welcome-questions details[open]').count(), 0);
    await summaries.nth(0).click();
    await expect(questions.nth(0)).toHaveAttribute('open', '');
    await summaries.nth(1).click();
    await expect(questions.nth(0)).not.toHaveAttribute('open');
    await expect(questions.nth(1)).toHaveAttribute('open', '');
    await summaries.nth(2).focus();
    await page.keyboard.press('Enter');
    await expect(questions.nth(1)).not.toHaveAttribute('open');
    await expect(questions.nth(2)).toHaveAttribute('open', '');
    await page.keyboard.press('Space');
    await expect(questions.nth(2)).not.toHaveAttribute('open');
    await summaries.nth(0).click();
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    if (width === 390 || width === 1440) await page.locator('#welkom').screenshot({ path: `qa/faq-${width}-${engine}.png` });
  }
  const axe = await new AxeBuilder({ page }).withTags(tags).analyze();
  assert.deepEqual(axe.violations, [], 'Page accessibility with expanded FAQ');

  const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const noJsPage = await noJs.newPage();
  await noJsPage.goto(base);
  await expect(noJsPage.locator('.no-js-nav')).toBeVisible();
  await noJsPage.locator('.welcome-questions summary').nth(0).click();
  await noJsPage.locator('.welcome-questions summary').nth(1).click();
  assert.equal(await noJsPage.locator('.welcome-questions details[open]').count(), 1);
  await noJs.close();

  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto(base);
  await page.evaluate(() => {
    const sizes = [...document.querySelectorAll('body *:not(svg):not(svg *)')].map(element => [element, parseFloat(getComputedStyle(element).fontSize)]);
    for (const [element, size] of sizes) element.style.fontSize = `${size * 2}px`;
  });
  await toggle.click();
  assert.equal(await menu.evaluate(dialog => dialog.scrollWidth > dialog.clientWidth), false, 'Menu reflows at 200% text size');
  await close.click();
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'Page reflows at 200% text size');

  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(base);
  await toggle.click();
  assert.equal(await menu.evaluate(dialog => getComputedStyle(dialog).animationName), 'none');
  await close.click();
  assert.deepEqual(errors, []);
  console.log(`${engine}: passed 6 mobile/tablet viewports, blur, focus trap, Escape, close button, backdrop, scroll restoration, 4 anchors, desktop resize, exclusive FAQ on mobile/desktop, no-JS, 200% text, reduced motion and axe.`);
} finally {
  await browser.close();
}
