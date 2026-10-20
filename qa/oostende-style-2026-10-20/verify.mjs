import { chromium, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
const out='qa/oostende-style-2026-10-20';
const browser=await chromium.launch();
const ctx=await browser.newContext({reducedMotion:'reduce'});
const page=await ctx.newPage();
const report={layouts:[],states:[],errors:[],failedLocalRequests:[]};
page.on('pageerror',e=>report.errors.push(e.message));
page.on('response',r=>{if(r.status()>=400&&r.url().startsWith('http://127.0.0.1:4323'))report.failedLocalRequests.push(r.url());});
try{
for(const width of [320,390,768,1001,1440]){
 await page.setViewportSize({width,height:width===390?844:900});
 await page.goto('http://127.0.0.1:4323/');
 await page.evaluate(()=>document.fonts.ready);
 for(const img of await page.locator('img:visible').all()){await img.scrollIntoViewIfNeeded();await img.evaluate(i=>i.decode().catch(()=>{}));}
 await page.evaluate(()=>scrollTo(0,0));
 const layout=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,font:getComputedStyle(document.body).fontFamily,fontsLoaded:[400,500,600].every(w=>document.fonts.check(`${w} 18px "Cooper Hewitt"`)),brokenImages:[...document.images].filter(i=>i.getClientRects().length&&!i.naturalWidth).map(i=>i.src),badAnchors:[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(a.hash.slice(1))).map(a=>a.hash)}));
 assert.equal(layout.width,layout.scrollWidth,'Page overflow');assert.ok(layout.fontsLoaded);assert.deepEqual(layout.brokenImages,[]);assert.deepEqual(layout.badAnchors,[]);
 if(width===390||width===1440){const a=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();layout.axe=a.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}));assert.deepEqual(layout.axe,[]);}
 await page.screenshot({path:`${out}/viewport-${width}.png`});
 await page.screenshot({path:`${out}/full-${width}.png`,fullPage:true});
 if(width===390||width===1440){for(const s of ['#praktisch','#ontmoetingscentra','#partners','.site-footer'])await page.locator(s).screenshot({path:`${out}/${s.replace(/[.#]/g,'')}-${width}.png`});}
 report.layouts.push(layout);
}
await page.setViewportSize({width:390,height:844});await page.goto('http://127.0.0.1:4323/');
await page.locator('.menu-toggle').click();await expect(page.locator('#mobile-menu')).toBeVisible();await expect(page.locator('.mobile-menu-close')).toBeFocused();
await page.keyboard.press('Shift+Tab');await expect(page.locator('.mobile-nav-participate')).toBeFocused();
await page.keyboard.press('Tab');await expect(page.locator('.mobile-menu-close')).toBeFocused();
await page.screenshot({path:`${out}/menu-390.png`});
let axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();assert.deepEqual(axe.violations,[]);
await page.keyboard.press('Escape');await expect(page.locator('.menu-toggle')).toBeFocused();
await page.locator('.menu-toggle').click();await page.locator('.mobile-nav-participate').click();await expect(page).toHaveURL(/#inschrijven$/);
await page.getByRole('link',{name:'Vind een ontmoetingscentrum'}).click();await expect(page.locator('.centres-disclosure')).toHaveAttribute('open','');await expect(page.locator('.centre-card')).toHaveCount(9);
await page.locator('#ontmoetingscentra').screenshot({path:`${out}/centres-open-390.png`});
axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();assert.deepEqual(axe.violations,[]);
await page.locator('.welcome-questions summary').nth(0).click();await page.locator('.welcome-questions summary').nth(1).click();await expect(page.locator('.welcome-questions details[open]')).toHaveCount(1);
await page.locator('#welkom').screenshot({path:`${out}/faq-open-390.png`});
await page.locator('[data-photo-open]').first().click();const dialog=page.locator('#event-lightbox');await expect(dialog).toBeVisible();await expect(dialog.locator('.lightbox-close')).toBeFocused();
await expect(dialog.locator('.photo-viewer-stage img')).toBeVisible();
await page.keyboard.press('ArrowRight');await expect(dialog.locator('figcaption')).toContainText('2 / 7');
await page.keyboard.press('ArrowLeft');await expect(dialog.locator('figcaption')).toContainText('1 / 7');
await expect(dialog.locator('.photo-viewer-stage img')).toBeVisible();await page.screenshot({path:`${out}/viewer-390.png`});
axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();assert.deepEqual(axe.violations,[]);
await page.keyboard.press('Escape');await expect(page.locator('[data-photo-open]').first()).toBeFocused();
report.states.push('menu focus trap, Escape, focus restoration and registration anchor','nine meeting centres, disclosure and accessible open state','exclusive FAQ','viewer loading, previous/next, Escape, focus restoration and accessible dialog');
await page.setViewportSize({width:320,height:900});await page.goto('http://127.0.0.1:4323/');
await page.evaluate(()=>{const sizes=[...document.querySelectorAll('body *:not(svg):not(svg *)')].map(e=>[e,parseFloat(getComputedStyle(e).fontSize)]);for(const[e,s]of sizes)e.style.fontSize=`${s*2}px`;});
assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'200% text overflow');
await page.locator('.menu-toggle').click();assert.equal(await page.locator('#mobile-menu').evaluate(e=>e.scrollWidth>e.clientWidth),false);await expect(page.locator('#mobile-menu')).toHaveCSS('animation-name','none');
report.states.push('200% text at 320px, menu reflow, reduced motion');
const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const np=await nojs.newPage();await np.goto('http://127.0.0.1:4323/');await expect(np.locator('.no-js-nav')).toBeVisible();await np.locator('.centres-disclosure summary').click();await expect(np.locator('.centre-phone').first()).toBeVisible();assert.ok((await np.locator('[data-photo-open]').first().getAttribute('href')).endsWith('.webp'));await nojs.close();report.states.push('no-JavaScript navigation, centre contacts and direct photo links');
assert.deepEqual(report.errors,[]);assert.deepEqual(report.failedLocalRequests,[]);
await writeFile(`${out}/verification.json`,JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
}finally{await browser.close();}
