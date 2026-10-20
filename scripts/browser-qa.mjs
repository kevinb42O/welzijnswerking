import { chromium, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { writeFile, mkdir, readFile } from 'node:fs/promises';
const base = process.env.QA_URL || 'http://127.0.0.1:4325/';
await mkdir('qa/redesign-fix/final', { recursive: true });
const browser = await chromium.launch({ headless: true, channel: 'chromium' });
const context = await browser.newContext({ reducedMotion: 'reduce' });
const page = await context.newPage();
const errors = [], badResponses = [];
page.on('pageerror', e => errors.push(e.message));
page.on('response', r => { if (r.status() >= 400 && r.url().startsWith(base)) badResponses.push(`${r.status()} ${r.url()}`); });
const results = [];
for (const [width, height] of [[1000,900],[1001,900],[600,800],[601,800],[767,1024],[769,1024],[1440,900],[390,844],[320,740],[360,740],[430,932],[768,1024],[1024,900],[1920,1080],[390,667],[1440,700]]) {
  await page.setViewportSize({ width, height });
  await page.goto(base);
  await page.evaluate(() => document.fonts.ready);
  for (const img of await page.locator('img').all()) {
    await img.scrollIntoViewIfNeeded();
    await img.evaluate(image => image.decode().catch(() => {}));
  }
  await page.evaluate(() => scrollTo(0,0));
  const layout = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    brokenImages: [...document.images].filter(img => !img.complete || !img.naturalWidth).map(img => img.src),
    invalidAnchors: [...document.querySelectorAll('a[href^="#"]')].filter(a => !document.getElementById(a.getAttribute('href').slice(1))).map(a => a.outerHTML),
    headings: [...document.querySelectorAll('h1,h2,h3')].map(el => ({ text:el.textContent, font:getComputedStyle(el).fontFamily, style:getComputedStyle(el).fontStyle })),
    heroFactsAboveFold: document.querySelector('.hero-facts').getBoundingClientRect().bottom <= innerHeight,
    heroCtaAboveFold: document.querySelector('.hero .button').getBoundingClientRect().bottom <= innerHeight,
    horizontalOverflow: [...document.querySelectorAll('body *')].filter(el=>{const r=el.getBoundingClientRect();const s=getComputedStyle(el);return r.width>0 && !['absolute','fixed'].includes(s.position) && (r.right>innerWidth+1 || r.left < -1);}).map(el=>({tag:el.tagName,class:el.className})).slice(0,20),
    heroHeight: document.querySelector('.hero').getBoundingClientRect().height,
  }));
  const axe = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
  results.push({ width, height, ...layout, accessibilityViolations: axe.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})) });
  if (true) {
    await page.screenshot({path:`qa/redesign-fix/final/viewport-${width}-${height}.png`});
    await page.screenshot({path:`qa/redesign-fix/final/full-${width}-${height}.png`,fullPage:true});
    for (const selector of ['#edities','#praktisch','#partners']) {
      await page.locator(selector).screenshot({path:`qa/redesign-fix/final/${selector.slice(1)}-${width}.png`});
    }
  }
}
const anchors = [];
await page.setViewportSize({width:1440,height:900});await page.goto(base);
const links = await page.locator('a[href^="#"]').evaluateAll(links=>links.map((a,i)=>({i,href:a.getAttribute('href'),text:a.textContent})).filter(a=>a.href!=='#inhoud'));
for (const link of links) {
  const node=page.locator('a[href^="#"]').nth(link.i);
  if(await node.isVisible()) {
    await node.click();
    await expect(page).toHaveURL(new RegExp(`${link.href}$`));
    const isAtTarget=await page.evaluate(href=>Math.abs(document.getElementById(href.slice(1)).getBoundingClientRect().top)<200,link.href);
    assert.ok(isAtTarget,`Anchor niet in beeld: ${link.text}`);
    anchors.push({href:link.href,text:link.text.trim(),works:true});
  }
}
await page.goto(base);await page.keyboard.press('Tab');await expect(page.locator('.skip-link')).toBeFocused();await page.keyboard.press('Enter');await expect(page).toHaveURL(/#inhoud$/);
await page.setViewportSize({width:390,height:844});
await page.goto(base);
const toggle=page.locator('.menu-toggle');
await toggle.focus();await page.keyboard.press('Enter');await expect(toggle).toHaveAttribute('aria-expanded','true');
await page.keyboard.press('Escape');await expect(toggle).toHaveAttribute('aria-expanded','false');await expect(toggle).toBeFocused();
const mobileAnchors=[];
for(const href of ['#welkom','#edities','#praktisch','#partners']) {
  await page.goto(base);await toggle.click();await page.locator(`#mobile-nav a[href="${href}"]`).click();await expect(page).toHaveURL(new RegExp(`${href}$`));await expect(toggle).toHaveAttribute('aria-expanded','false');mobileAnchors.push(href);
}
await page.goto(base);await toggle.click();await page.locator('.hero-price').click();await expect(toggle).toHaveAttribute('aria-expanded','false');
await toggle.click();await page.setViewportSize({width:1440,height:900});await expect(toggle).toHaveAttribute('aria-expanded','false');
const downloadPromise=page.waitForEvent('download');await page.getByRole('button',{name:'Zet in mijn agenda'}).click();const download=await downloadPromise;
assert.equal(download.suggestedFilename(),'kerstavond-oostende-2026.ics');
const calendar=await readFile(await download.path(),'utf8');assert.ok(calendar.startsWith('BEGIN:VCALENDAR\r\n'));assert.ok(calendar.includes('DTSTART;VALUE=DATE:20261224\r\n'));assert.ok(calendar.includes('DTEND;VALUE=DATE:20261225\r\n'));assert.ok(calendar.split('\r\n').every(line=>Buffer.byteLength(line,'utf8')<=75));
const externalLinks=await page.locator('a[href^="https:"]').evaluateAll(nodes=>[...new Set(nodes.map(a=>a.href))]);
const externalResults=[];
await Promise.all(externalLinks.map(async url => {
 try {const response=await context.request.get(url,{timeout:20000});externalResults.push({url,status:response.status(),finalUrl:response.url()});}
 catch(error){externalResults.push({url,error:error.message.split('\n')[0]});}
}));
// Check both route links open a new tab and preserve the intended destination.
for(const label of ['Plan je route','Bereikbaarheid Kursaal']) {
  const link=page.getByRole('link',{name:label,exact:true});
  const popupPromise=page.waitForEvent('popup');await link.click();const popup=await popupPromise;await popup.waitForLoadState('domcontentloaded').catch(()=>{});assert.ok(popup.url().startsWith('https://'));await popup.close();
}
// Reflow, text enlargement, and usable navigation without JavaScript.
await page.setViewportSize({width:320,height:740});await page.goto(base);
await page.evaluate(()=>{const nodes=[...document.querySelectorAll('body *:not(svg):not(svg *)')].map(el=>[el,parseFloat(getComputedStyle(el).fontSize)]);for(const [el,size]of nodes)el.style.fontSize=`${size*2}px`;});
await page.screenshot({path:'qa/redesign-fix/final/text-200-320.png',fullPage:true});
const enlargedOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
const noJsContext=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
const noJsPage=await noJsContext.newPage();await noJsPage.goto(base);
await expect(noJsPage.locator('.no-js-nav a[href="#praktisch"]')).toBeVisible();await noJsPage.locator('.no-js-nav a[href="#praktisch"]').click();await expect(noJsPage).toHaveURL(/#praktisch$/);await noJsContext.close();
await page.goto(base);await page.setViewportSize({width:390,height:844});await toggle.click();
const menuAxe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();assert.equal(menuAxe.violations.length,0);await page.keyboard.press('Escape');
await page.goto(base);
const structuredData=await page.locator('script[type="application/ld+json"]').textContent();assert.equal(JSON.parse(structuredData).startDate,'2026-12-24');assert.ok(!structuredData.includes('Offer'));assert.equal(await page.locator('.gallery-open').count(),0);assert.equal(await page.locator('.sponsor').count(),0);assert.equal(await page.locator('.historic-partner').count(),7);assert.equal(await page.locator('.demo-banner').count(),0);
const report={results,enlargedOverflow,noJsNavigation:true,menuAxeViolations:menuAxe.violations.length,errors,badResponses,interactions:{desktopAnchors:anchors,mobileAnchors,skipLink:true,menuKeyboardEscapeFocus:true,menuOutsideClick:true,menuResize:true,calendarDownload:true,routePopups:true},externalLinks:externalResults};
await writeFile('qa/redesign-fix/browser-report.json',JSON.stringify(report,null,2));
console.log(JSON.stringify({viewports:results.map(({width,height,scrollWidth,accessibilityViolations,heroFactsAboveFold,heroCtaAboveFold})=>({width,height,scrollWidth,accessibilityViolations,heroFactsAboveFold,heroCtaAboveFold})),errors,badResponses,interactions:report.interactions,externalResults},null,2));
await browser.close();
if(enlargedOverflow||results.some(r=>r.scrollWidth>r.width||r.brokenImages.length||r.invalidAnchors.length||r.accessibilityViolations.length||!r.heroCtaAboveFold||!r.heroFactsAboveFold)||errors.length||badResponses.length) process.exitCode=1;
