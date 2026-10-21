import { chromium, webkit, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';

const base = process.env.QA_URL || 'http://127.0.0.1:4323/';
const out = 'qa/photo-viewer-fit-2026-10-21';
await mkdir(out, { recursive: true });
const results = [];
for (const [name, engine] of [['chromium', chromium], ['webkit', webkit]]) {
  const browser = await engine.launch();
  try {
    const page = await browser.newPage({ reducedMotion: 'reduce' });
    for (const [width, height] of [[320, 568], [390, 844], [844, 390], [1280, 720], [1440, 900]]) {
      await page.setViewportSize({ width, height });
      await page.goto(base);
      const trigger = page.locator('.event-photo-lead [data-photo-open]');
      await trigger.click();
      const dialog = page.locator('#event-lightbox');
      const image = dialog.locator('.photo-viewer-stage img');
      for (let index = 0; index < 7; index++) {
        await expect(dialog.locator('figcaption')).toContainText(`${index + 1} / 7`);
        await expect(dialog.locator('.photo-viewer-stage')).toHaveAttribute('aria-busy', 'false');
        const fit = await dialog.evaluate(element => {
          const rect = node => {
            const { top, left, bottom, right, width, height } = node.getBoundingClientRect();
            return { top, left, bottom, right, width, height };
          };
          const img = element.querySelector('img');
          return {
            dialog: rect(element), stage: rect(element.querySelector('.photo-viewer-stage')),
            image: rect(img), caption: rect(element.querySelector('figcaption')),
            controls: rect(element.querySelector('.lightbox-controls')),
            objectFit: getComputedStyle(img).objectFit,
            overflow: element.scrollHeight - element.clientHeight,
          };
        });
        assert.equal(fit.objectFit, 'contain');
        assert.ok(fit.image.height > 0 && fit.image.width > 0);
        assert.ok(fit.image.top >= fit.stage.top - 1 && fit.image.bottom <= fit.stage.bottom + 1);
        assert.ok(fit.image.left >= fit.stage.left - 1 && fit.image.right <= fit.stage.right + 1);
        assert.ok(fit.image.bottom <= fit.caption.top + 1, 'Photo must not cover caption');
        assert.ok(fit.controls.bottom <= height && fit.dialog.top >= 0, 'Controls must fit screen');
        assert.ok(fit.overflow <= 1, 'Viewer must not require vertical scrolling');
        if (index < 6) await dialog.getByRole('button', { name: 'Volgende foto' }).click();
      }
      // Very tall and panoramic originals must obey the same box, irrespective of aspect ratio.
      for (const [photoWidth, photoHeight] of [[500, 3000], [3000, 500]]) {
        await image.evaluate(async (img, size) => {
          img.src = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${size[0]}" height="${size[1]}"><rect width="100%" height="100%" fill="blue"/></svg>`)}`;
          await img.decode();
        }, [photoWidth, photoHeight]);
        const fits = await image.evaluate(img => {
          const bounds = img.getBoundingClientRect();
          const stage = img.parentElement.getBoundingClientRect();
          return bounds.bottom <= stage.bottom + 1 && bounds.right <= stage.right + 1 && getComputedStyle(img).objectFit === 'contain';
        });
        assert.ok(fits, 'Extreme aspect ratios must remain contained');
      }
      await dialog.getByRole('button', { name: 'Vorige foto' }).click();
      await expect(dialog.locator('figcaption')).toContainText('6 / 7');
      if (name === 'chromium' && [390, 1280].includes(width)) {
        await page.screenshot({ path: `${out}/viewer-${width}.png` });
      }
      await page.keyboard.press('Escape');
      await expect(dialog).not.toBeVisible();
      await expect(trigger).toBeFocused();
      results.push({ engine: name, width, height, photos: 7, fullPhoto: true, visibleControls: true, extremeAspectRatios: true, focusRestore: true });
    }
    await page.close();
  } finally {
    await browser.close();
  }
}
await writeFile(`${out}/report.json`, JSON.stringify({ base, results }, null, 2));
console.log(`Passed: ${results.length} browser/viewport combinations, 70 real-photo checks plus tall/panoramic fixtures.`);
