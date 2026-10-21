import { chromium, webkit, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const base = process.env.QA_URL || 'http://127.0.0.1:4325/';
const out = process.env.QA_OUT_DIR || 'qa/skill-fixes-2026-10-20';
await mkdir(out, {recursive:true});
const report = {base,viewports:[],engines:[],errors:[],badResponses:[],platformUnavailable:[]};
const tags = ['wcag2a','wcag2aa','wcag21aa','wcag22aa'];
for (const [name,engine] of [['chromium',chromium],['webkit',webkit]]) {
  console.log(`Checking ${name}…`);
  const browser=await engine.launch();
  try {
    const context=await browser.newContext();
    const page=await context.newPage();
    page.on('pageerror',e=>report.errors.push({engine:name,error:e.message}));
    page.on('response',r=>{
      if(r.status()<400)return;
      const finding={engine:name,url:r.url(),status:r.status()};
      if(new URL(r.url()).pathname==='/_vercel/insights/script.js'&&r.status()===404)report.platformUnavailable.push(finding);
      else report.badResponses.push(finding);
    });
    const sizes=name==='chromium'?[[320,568],[390,844],[455,804],[768,1024],[1000,900],[1001,900],[1440,900],[1920,1080]]:[[390,844],[1440,900]];
    for(const [width,height]of sizes) {
      await page.setViewportSize({width,height});await page.goto(base);await page.evaluate(()=>document.fonts.ready);
      await expect(page.locator('.hero-eligibility')).toBeVisible();
      await expect(page.locator('.hero-eligibility')).toContainText('Voor alleenstaanden vanaf 50 jaar.');
      assert.ok(await page.locator('.hero-eligibility').evaluate(e=>e.getBoundingClientRect().bottom<document.querySelector('.hero .button').getBoundingClientRect().top));
      await expect(page.locator('.archive-footnote')).toContainText('2026: Voor alleenstaanden vanaf 50 jaar.');
      await expect(page.locator('.archive-footnote')).not.toContainText('worden apart bekendgemaakt');
      assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
      assert.ok(await page.locator('.footer-nav a').evaluateAll(links=>links.every(a=>a.getBoundingClientRect().height>=44)));
      const axe=await new AxeBuilder({page}).withTags(tags).analyze();
      assert.deepEqual(axe.violations.map(v=>v.id),[],`${name} ${width}px`);
      report.viewports.push({engine:name,width,height,overflow:false,axeViolations:0,footerTargetsAtLeast44:true});
      if(name==='chromium'&&[390,455,1440].includes(width)) {
        await page.screenshot({path:`${out}/viewport-${width}.png`});
        // A full-page capture does not trigger offscreen lazy images. Decode
        // them first, and prevent smooth scrolling from shifting capture clips.
        const previousScrollBehavior=await page.evaluate(()=>{const previous=document.documentElement.style.scrollBehavior;document.documentElement.style.scrollBehavior='auto';return previous;});
        for(const photo of await page.locator('main img').all()) {
          if(await photo.isVisible()) {
            await photo.scrollIntoViewIfNeeded();
            await photo.evaluate(img=>img.decode());
          }
        }
        await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
        await page.screenshot({path:`${out}/full-${width}.png`,fullPage:true});
        await page.locator('.site-footer').screenshot({path:`${out}/footer-${width}.png`});
        await page.evaluate(previous=>document.documentElement.style.scrollBehavior=previous,previousScrollBehavior);
      }
    }
    await page.setViewportSize({width:390,height:844});await page.goto(base);
    await page.locator('.hero .button').click();
    await expect(page).toHaveURL(/#inschrijven$/);
    await page.getByRole('link',{name:'Vind een ontmoetingscentrum'}).click();
    await expect(page.locator('[data-centre-finder]')).toHaveClass(/centre-finder-enhanced/);
    await page.goto(base);await page.locator('.menu-toggle').focus();await page.keyboard.press('Enter');
    await expect(page.locator('.mobile-menu-close')).toBeFocused();
    await page.keyboard.press('Shift+Tab');await expect(page.locator('.mobile-nav-participate')).toBeFocused();
    await page.keyboard.press('Tab');await expect(page.locator('.mobile-menu-close')).toBeFocused();
    await page.keyboard.press('Escape');await expect(page.locator('.menu-toggle')).toBeFocused();

    // Progressive enhancement keeps the link, while ordinary activation uses one viewer.
    const trigger=page.locator('.event-photo-lead [data-photo-open]');
    const dialog=page.locator('#event-lightbox');
    const image=dialog.locator('img');
    await trigger.scrollIntoViewIfNeeded();
    const scrollBefore=await page.evaluate(()=>scrollY);
    await trigger.click();await expect(dialog).toBeVisible();
    await expect(image).toBeVisible();await expect(dialog.locator('.lightbox-close')).toBeFocused();
    assert.equal(context.pages().length,1);
    await expect(dialog.locator('figcaption')).toContainText('1 / 7');
    await page.keyboard.press('ArrowLeft');await expect(dialog.locator('figcaption')).toContainText('7 / 7');await expect(image).toBeVisible();
    await page.keyboard.press('ArrowRight');await expect(dialog.locator('figcaption')).toContainText('1 / 7');await expect(image).toBeVisible();
    await page.keyboard.press('Shift+Tab');await expect(dialog.locator('[data-photo-next]')).toBeFocused();
    await page.keyboard.press('Tab');await expect(dialog.locator('.lightbox-close')).toBeFocused();
    const axe=await new AxeBuilder({page}).withTags(tags).analyze();
    assert.deepEqual(axe.violations.map(v=>v.id),[],`${name} photo viewer`);
    if(name==='chromium')await page.screenshot({path:`${out}/viewer-390.png`});
    await page.keyboard.press('Escape');await expect(dialog).not.toBeVisible();await expect(trigger).toBeFocused();
    await expect.poll(async()=>Math.abs(await page.evaluate(()=>scrollY)-scrollBefore),{message:`${name}: restore scroll position ${scrollBefore}`}).toBeLessThan(2);
    await trigger.click();await expect(image).toBeVisible();
    await dialog.locator('[data-photo-next]').click();await expect(dialog.locator('figcaption')).toContainText('2 / 7');await expect(image).toBeVisible();
    await dialog.locator('.lightbox-close').click();await expect(trigger).toBeFocused();

    // New image-load failure must have feedback, and the next image must recover.
    const failing=page.locator('.event-photo-grid [data-photo-open]').first();
    const originalSource=await failing.getAttribute('href');
    const source=`${originalSource}?qa-image-error=1`;
    await failing.evaluate((link,href)=>link.setAttribute('href',href),source);
    await context.route(`**${source}`,route=>route.abort());
    await failing.click();await expect(dialog.locator('.photo-viewer-status')).toContainText('kan niet worden geladen');
    await dialog.locator('[data-photo-next]').click();await expect(image).toBeVisible();
    await dialog.locator('.lightbox-close').click();await expect(failing).toBeFocused();
    await context.unroute(`**${source}`);
    await page.goto(base);
    await page.setViewportSize({width:320,height:740});
    await page.evaluate(()=>{const sizes=[...document.querySelectorAll('body *:not(svg):not(svg *)')].map(e=>[e,parseFloat(getComputedStyle(e).fontSize)]);for(const[e,size]of sizes)e.style.fontSize=`${size*2}px`;});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    await trigger.click();await expect(image).toBeVisible();
    assert.equal(await dialog.evaluate(e=>e.scrollWidth>e.clientWidth),false);
    await page.keyboard.press('Escape');
    await page.goto(base);
    await page.evaluate(()=>document.documentElement.style.fontSize='200%');
    assert.ok(await page.locator('body').evaluate(e=>parseFloat(getComputedStyle(e).fontSize)>=36));
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    await page.emulateMedia({reducedMotion:'reduce'});await page.goto(base);
    await page.locator('.menu-toggle').click();assert.equal(await page.locator('.mobile-menu').evaluate(e=>getComputedStyle(e).animationName),'none');await page.keyboard.press('Escape');

    const noJs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
    const fallback=await noJs.newPage();await fallback.goto(base);
    await expect(fallback.locator('.no-js-nav')).toBeVisible();
    const calendar=fallback.locator('.calendar-download');
    const downloadPromise=fallback.waitForEvent('download');await calendar.click();const download=await downloadPromise;
    assert.equal(download.suggestedFilename(),'kerstavond-oostende-2026.ics');
    const content=await readFile(await download.path(),'utf8');
    assert.match(content,/DTSTART:20261224T160000Z/);assert.match(content,/DTEND:20261224T203000Z/);
    assert.ok(content.split('\r\n').every(line=>Buffer.byteLength(line,'utf8')<=75));
    const imageLink=fallback.locator('.event-photo-lead > a');
    await imageLink.click();await expect(fallback).toHaveURL(/2025-facebook-25-1600\.webp$/);
    await noJs.close();
    report.engines.push({engine:name,registration:true,menuKeyboard:true,viewerNavigation:true,viewerFocus:true,viewerScrollRestore:true,viewerErrorRecovery:true,text200:true,reducedMotion:true,noJsCalendar:true,noJsImageLink:true});
  } finally {await browser.close();}
}
await writeFile(`${out}/verification.json`,JSON.stringify(report,null,2));
assert.deepEqual(report.errors,[]);assert.deepEqual(report.badResponses,[]);
console.log(JSON.stringify(report,null,2));
