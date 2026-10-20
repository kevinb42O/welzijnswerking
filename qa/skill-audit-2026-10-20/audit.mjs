import { chromium, webkit } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { writeFile, mkdir, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const out = new URL('./', import.meta.url).pathname;
const base = 'http://127.0.0.1:4325/';
await mkdir(out, { recursive: true });
const report = { base, conditions: 'Fresh local production build; browser emulation; no physical-device test or user study.', viewports: [], interactions: {}, errors: [], badResponses: [] };
const built = await readFile(new URL('../../dist/index.html', import.meta.url));
const served = Buffer.from(await (await fetch(base)).arrayBuffer());
report.buildMatchesServed = createHash('sha256').update(built).digest('hex') === createHash('sha256').update(served).digest('hex');
const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();
page.on('pageerror', e => report.errors.push(e.message));
page.on('response', r => { if (r.status() >= 400) report.badResponses.push({ url:r.url(), status:r.status() }); });
await page.addInitScript(() => {
  window.auditMetrics = { lcp: 0, cls: 0 };
  new PerformanceObserver(l => { for (const e of l.getEntries()) window.auditMetrics.lcp = e.startTime; }).observe({ type:'largest-contentful-paint', buffered:true });
  new PerformanceObserver(l => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.auditMetrics.cls += e.value; }).observe({ type:'layout-shift', buffered:true });
});
const violations = results => results.violations.map(v => ({ id:v.id, impact:v.impact, help:v.help, nodes:v.nodes.map(n=>({ target:n.target, summary:n.failureSummary })) }));
for (const [width, height] of [[320,568],[390,844],[768,1024],[1000,900],[1001,900],[1440,900],[1920,1080]]) {
  await page.setViewportSize({ width, height });
  await page.goto(base);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
  const initial = await page.evaluate(() => ({
    width:innerWidth, scrollWidth:document.documentElement.scrollWidth,
    heroCtaBottom:document.querySelector('.hero .button').getBoundingClientRect().bottom,
    heroFactsBottom:document.querySelector('.hero-facts').getBoundingClientRect().bottom,
    firstEligibilityY:document.querySelector('#praktisch .additional-details').getBoundingClientRect().top,
    metrics:window.auditMetrics,
    resources:performance.getEntriesByType('resource').map(r=>({ name:new URL(r.name).pathname, type:r.initiatorType, bytes:r.decodedBodySize })),
    invalidAnchors:[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(a.hash.slice(1))).map(a=>a.outerHTML),
    headings:[...document.querySelectorAll('h1,h2,h3')].filter(e=>e.getClientRects().length).map(e=>({ tag:e.tagName, text:e.textContent.trim(), font:getComputedStyle(e).fontFamily, size:getComputedStyle(e).fontSize })),
  }));
  // Force lazy images into view before testing their decoded state.
  for (const img of await page.locator('main img').all()) { await img.scrollIntoViewIfNeeded(); await img.evaluate(e=>e.decode().catch(()=>{})); }
  await page.evaluate(() => scrollTo({ top:0, behavior:'instant' }));
  const axe = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
  const visibleControls = await page.evaluate(() => [...document.querySelectorAll('a,button,summary')].filter(e=>e.getClientRects().length).map(e=>{
    const r=e.getBoundingClientRect(),s=getComputedStyle(e);
    return { text:(e.getAttribute('aria-label')||e.textContent).trim(), tag:e.tagName, href:e.getAttribute('href'), x:r.x,y:r.y,width:r.width,height:r.height,fontSize:s.fontSize,color:s.color,bg:s.backgroundColor };
  }));
  const brokenImages = await page.locator('main img').evaluateAll(images=>images.filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.currentSrc));
  if ([390,1440].includes(width)) {
    await page.screenshot({ path:`${out}viewport-${width}.png` });
    await page.screenshot({ path:`${out}full-${width}.png`, fullPage:true });
    await page.locator('#praktisch').screenshot({ path:`${out}practical-${width}.png` });
  }
  report.viewports.push({ width,height,...initial,violations:violations(axe),incomplete:axe.incomplete.map(i=>({id:i.id,nodes:i.nodes.map(n=>n.target)})),visibleControls,brokenImages });
}

await page.setViewportSize({ width:390,height:844 });
await page.goto(base);
await page.locator('.hero .button').click();
await page.waitForTimeout(700);
report.interactions.heroRegistration = await page.evaluate(()=>({hash:location.hash,registrationTop:document.querySelector('#inschrijven').getBoundingClientRect().top,activeElement:document.activeElement.outerHTML.slice(0,300)}));
await page.getByRole('link',{name:'Vind een ontmoetingscentrum'}).click();
await page.waitForTimeout(700);
report.interactions.centres = await page.evaluate(()=>({hash:location.hash,open:document.querySelector('.centres-disclosure').open,scrollWidth:document.documentElement.scrollWidth}));
report.interactions.expandedCentresAxe = violations(await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze());
await page.locator('#ontmoetingscentra').screenshot({path:`${out}centres-390.png`});
await page.goto(base);
await page.locator('.menu-toggle').focus();
await page.keyboard.press('Enter');
await page.waitForTimeout(500);
report.interactions.menu = await page.locator('.mobile-menu').evaluate(e=>({open:e.open,modal:e.matches(':modal'),focused:document.activeElement.outerHTML,scrollWidth:e.scrollWidth,clientWidth:e.clientWidth}));
await page.screenshot({path:`${out}menu-390.png`});
report.interactions.menuAxe = violations(await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze());
await page.keyboard.press('Shift+Tab');
report.interactions.menuTrapBackwards = await page.locator('.mobile-nav-participate').evaluate(e=>e===document.activeElement);
await page.keyboard.press('Tab');
report.interactions.menuTrapForwards = await page.locator('.mobile-menu-close').evaluate(e=>e===document.activeElement);
await page.keyboard.press('Escape');
report.interactions.menuEscapeFocus = await page.locator('.menu-toggle').evaluate(e=>e===document.activeElement);
await page.locator('.menu-toggle').click();
await page.locator('#mobile-nav a[href="#praktisch"]').click();
await page.waitForTimeout(700);
report.interactions.menuAnchor = await page.evaluate(()=>({hash:location.hash,active:document.activeElement.id,bodyFixed:getComputedStyle(document.body).position==='fixed',dialogOpen:document.querySelector('.mobile-menu').open}));
await page.goto(base);
await page.locator('.welcome-questions summary').nth(0).click();
await page.locator('.welcome-questions summary').nth(1).click();
report.interactions.faqOpenCount = await page.locator('.welcome-questions details[open]').count();
const downloadPromise = page.waitForEvent('download');
await page.getByRole('button',{name:'Zet in mijn agenda'}).click();
const download = await downloadPromise;
report.interactions.calendar = { name:download.suggestedFilename(), content:await readFile(await download.path(),'utf8') };

// Text-only enlargement reproduces the existing project's QA approach.
await page.setViewportSize({width:320,height:740});
await page.goto(base);
await page.evaluate(()=>{ const nodes=[...document.querySelectorAll('body *:not(svg):not(svg *)')].map(e=>[e,parseFloat(getComputedStyle(e).fontSize)]); for(const[e,size]of nodes)e.style.fontSize=`${size*2}px`; });
report.interactions.enlargedText = await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,scrollWidth:document.documentElement.scrollWidth}));
await page.screenshot({path:`${out}text-200-320.png`,fullPage:true});
await page.locator('.menu-toggle').click();
report.interactions.enlargedMenu = await page.locator('.mobile-menu').evaluate(e=>({overflow:e.scrollWidth>e.clientWidth,scrollWidth:e.scrollWidth,clientWidth:e.clientWidth}));
await page.keyboard.press('Escape');
await page.emulateMedia({reducedMotion:'reduce'});
await page.goto(base);
await page.locator('.menu-toggle').click();
report.interactions.reducedMotion = await page.locator('.mobile-menu').evaluate(e=>({animation:getComputedStyle(e).animationName,scrollBehavior:getComputedStyle(document.documentElement).scrollBehavior}));
await page.keyboard.press('Escape');
const noJs = await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
const np = await noJs.newPage(); await np.goto(base);
report.interactions.noJs = {navigationVisible:await np.locator('.no-js-nav').isVisible(),calendarVisible:await np.locator('.calendar-download').isVisible()};
await np.locator('.centres-disclosure summary').click();
report.interactions.noJs.centresOpen = await np.locator('.centres-disclosure').evaluate(e=>e.open);
await noJs.close();
await browser.close();

try {
  const wb=await webkit.launch(); const wp=await wb.newPage({viewport:{width:390,height:844}});
  await wp.goto(base); await wp.evaluate(()=>document.fonts.ready);
  await wp.locator('.menu-toggle').click(); await wp.waitForTimeout(500);
  report.webkit={overflow:await wp.evaluate(()=>document.documentElement.scrollWidth>innerWidth),menuOpen:await wp.locator('.mobile-menu').evaluate(e=>e.open)};
  await wp.keyboard.press('Escape'); report.webkit.escapeClosed=await wp.locator('.mobile-menu').evaluate(e=>!e.open);
  await wp.screenshot({path:`${out}webkit-390.png`}); await wb.close();
} catch(e) { report.webkit={error:e.message}; }
await writeFile(`${out}browser-report.json`,JSON.stringify(report,null,2));
console.log(JSON.stringify({buildMatchesServed:report.buildMatchesServed,viewports:report.viewports.map(v=>({width:v.width,overflow:v.scrollWidth>v.width,violations:v.violations,brokenImages:v.brokenImages,smallTargets:v.visibleControls.filter(c=>c.height<44||c.width<44).length,metrics:v.metrics})),interactions:report.interactions,webkit:report.webkit,errors:report.errors,badResponses:report.badResponses},null,2));
