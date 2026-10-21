import {chromium,webkit} from '@playwright/test';
import {writeFile} from 'node:fs/promises';
const result=[];const out=process.env.QA_OUT_DIR || 'qa/accessibility-2026-10-21';
for(const [engine,type]of [['chromium',chromium],['webkit',webkit]]){
 const browser=await type.launch();const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});
 await page.goto('http://127.0.0.1:4325/');await page.locator('.centre-finder-enhanced').waitFor();
 await page.locator('.skip-link').focus();await page.keyboard.press('Enter');await page.keyboard.press('Tab');
 result.push({engine,skipExplicit:await page.evaluate(()=>document.activeElement?.outerHTML.slice(0,150)),h1:await page.locator('h1').ariaSnapshot()});
 await page.setViewportSize({width:390,height:844});await page.locator('[data-show-map]').click();await page.locator('.centre-map-marker').first().waitFor();
 await page.locator('.centre-map-marker').nth(3).focus();await page.keyboard.press('Space');await page.waitForTimeout(150);
 result.push({engine,spaceSelect:await page.locator('[data-map-name]').textContent()});
 await page.locator('[data-map-canvas]').focus();await page.keyboard.press('+');await page.waitForTimeout(150);await page.locator('.centre-map-marker').nth(5).focus();await page.keyboard.press('Space');await page.waitForTimeout(150);
 result.push({engine,spaceAfterZoom:await page.locator('[data-map-name]').textContent()});
 await page.locator('[data-centre-map]>summary').focus();await page.keyboard.press('Enter');await page.waitForTimeout(150);result.push({engine,mapFocusAfterWait:await page.locator('[data-show-map]').evaluate(e=>e===document.activeElement)});
 for(const [width,height]of [[320,256],[390,844],[1280,900]]){
  await page.setViewportSize({width,height});await page.goto('http://127.0.0.1:4325/');await page.locator('.centre-finder-enhanced').waitFor();
  if(width===1280)await page.evaluate(()=>document.documentElement.style.fontSize='200%');
  await page.locator('.event-photos-disclosure>summary').click();
  const small=await page.locator('a:visible,button:visible,summary:visible,select:visible').evaluateAll(es=>es.map(e=>{const r=e.getBoundingClientRect();return {text:e.textContent.trim().slice(0,80),cls:e.className,width:r.width,height:r.height}}).filter(e=>e.width<24||e.height<24));
  result.push({engine,width,height,overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),smallTargets:small});
  await page.locator('[data-photo-open]').first().click();await page.waitForFunction(()=>document.querySelector('[data-photo-viewer][open] img')?.alt.length>0);
  const v=page.locator('[data-photo-viewer][open]');await v.screenshot({path:`${out}/${engine}-viewer-${width}-${height}.png`});
  result.push({engine,viewer:[width,height],geometry:await v.evaluate(d=>({client:d.clientHeight,scroll:d.scrollHeight,controls:[...d.querySelectorAll('button')].map(b=>{const r=b.getBoundingClientRect();return {text:b.textContent,top:r.top,bottom:r.bottom}}),stageHeight:d.querySelector('.photo-viewer-stage').getBoundingClientRect().height}))});
 }
 if(engine==='chromium'){
 await page.setViewportSize({width:1440,height:900});await page.emulateMedia({reducedMotion:'no-preference'});await page.goto('http://127.0.0.1:4325/');await page.locator('.hero-facts[data-sleigh-state="playing"]').waitFor({timeout:15000});
 await page.waitForTimeout(5500);result.push({engine,animationAfter5seconds:await page.locator('.hero-facts').getAttribute('data-sleigh-state')});await page.screenshot({path:`${out}/sleigh-after-five-seconds.png`});await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(100);result.push({engine,liveReducedMotion:await page.locator('.hero-facts').getAttribute('data-sleigh-state')});
 }
 await browser.close();
}
await writeFile(`${out}/manual-checks.json`,JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
