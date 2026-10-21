import { chromium, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { writeFile, mkdir, access } from 'node:fs/promises';
import assert from 'node:assert/strict';
const base=process.env.DEV_QA_URL||'http://127.0.0.1:4323';
await mkdir('qa/redesign-fix/modules',{recursive:true});
const browser=await chromium.launch({headless:true,channel:'chromium'});
const context=await browser.newContext({reducedMotion:'reduce'});
const page=await context.newPage();
const errors=[];page.on('pageerror',e=>errors.push(e.message));
const results=[];
try {
for(const [photos,count] of [[0,0],[1,1],[2,3],[3,4],[4,12],[10,24],[20,40]]) {
  for(const [width,height] of ((photos<=4) ? [[1440,900],[390,844],[320,740]] : [[1440,900],[390,844],[768,1024],...(count===40?[[320,740]]:[])])) {
    await page.setViewportSize({width,height});await page.goto(`${base}/dev-preview/modules-${photos}-${count}`);await page.evaluate(()=>document.fonts.ready);
    await expect(page.locator('.gallery-open')).toHaveCount(photos);await expect(page.locator('.sponsor')).toHaveCount(count);
    if(photos) await expect(page.locator('.photo-year').first()).toContainText('DEMO / GEEN ECHTE EDITIEFOTO');
    for (const image of await page.locator('.gallery-grid img,.sponsor img').all()) {await image.scrollIntoViewIfNeeded();await image.evaluate(img=>img.decode());}
    const layout=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,brokenImages:[...document.querySelectorAll('.gallery-grid img,.sponsor img')].filter(img=>!img.naturalWidth).length,demoYears:[...document.querySelectorAll('.photo-year')].some(el=>/2019|2025/.test(el.textContent))}));
    assert.equal(layout.scrollWidth,width);assert.equal(layout.brokenImages,0);assert.equal(layout.demoYears,false);
    const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']).analyze();
    results.push({photos,count,width,...layout,accessibilityViolations:axe.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))});
    if(photos) await page.locator('#sfeerbeelden').screenshot({path:`qa/redesign-fix/modules/demo-gallery-${photos}-${width}.png`});
    await page.locator('#partners').screenshot({path:`qa/redesign-fix/modules/demo-sponsors-${count}-${width}.png`});
  }
}
await page.setViewportSize({width:390,height:844});await page.goto(`${base}/dev-preview/modules-20-24`);
await page.locator('.gallery-open').first().click();await expect(page.locator('.lightbox')).toBeVisible();await expect(page.locator('.lightbox-close')).toBeFocused();
await page.keyboard.press('ArrowRight');await expect(page.locator('#lightbox-caption')).toContainText('2 / 20');await page.keyboard.press('ArrowLeft');await expect(page.locator('#lightbox-caption')).toContainText('1 / 20');await page.keyboard.press('ArrowLeft');await expect(page.locator('#lightbox-caption')).toContainText('20 / 20');
await page.keyboard.press('Shift+Tab');await expect(page.locator('#next-photo')).toBeFocused();await page.keyboard.press('Tab');await expect(page.locator('.lightbox-close')).toBeFocused();
const dialogAxe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']).analyze();assert.equal(dialogAxe.violations.length,0,JSON.stringify(dialogAxe.violations));
await page.screenshot({path:'qa/redesign-fix/modules/demo-lightbox-390.png'});
await page.keyboard.press('Escape');await expect(page.locator('.lightbox')).not.toBeVisible();await expect(page.locator('.gallery-open').first()).toBeFocused();
await page.locator('.gallery-open').nth(2).click();await page.locator('.lightbox-close').click();await expect(page.locator('.gallery-open').nth(2)).toBeFocused();
await page.locator('.gallery-open').nth(3).click();await page.getByRole('button',{name:'Volgende foto'}).click();await expect(page.locator('#lightbox-caption')).toContainText('5 / 20');await page.getByRole('button',{name:'Vorige foto'}).click();await expect(page.locator('#lightbox-caption')).toContainText('4 / 20');await page.keyboard.press('Escape');
let previewInProduction=false;try{await access('dist/dev-preview');previewInProduction=true;}catch{}
assert.equal(previewInProduction,false);
const report={results,errors,lightbox:{arrows:true,wrap:true,escape:true,focusTrap:true,focusRestore:true,closeButton:true,buttonNavigation:true,axeViolations:0},previewInProduction};await writeFile('qa/redesign-fix/modules-report.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
if(errors.length||results.some(r=>r.accessibilityViolations.length))process.exitCode=1;
}finally{await browser.close();}
