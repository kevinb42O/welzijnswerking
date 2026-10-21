import { chromium, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
const browser = await chromium.launch();
const base = 'http://127.0.0.1:4323/';
const context = await browser.newContext({ viewport: { width:1440, height:1000 }, reducedMotion:'no-preference' });
const page = await context.newPage();
const errors = [];
page.on('pageerror', e => errors.push(e.message));
await page.goto(base);
await expect(page.locator('.hero-facts')).toHaveAttribute('data-sleigh-state','playing');
const before = await page.locator('.facts-sleigh svg').innerHTML();
await page.waitForTimeout(250);
assert.notEqual(await page.locator('.facts-sleigh svg').innerHTML(), before);
await expect(page.locator('.hero-facts')).toHaveAttribute('data-sleigh-state','done',{ timeout:16000 });
assert.equal(await page.locator('.hero-facts').evaluate(n=>n.style.transform),'');
await page.evaluate(()=>scrollTo(0,document.body.scrollHeight));
await page.locator('.hero-bottom').scrollIntoViewIfNeeded();
assert.ok(await page.locator('.facts-sleigh-scene').isHidden());
await page.goto(base);
await expect(page.locator('.hero-facts')).toHaveAttribute('data-sleigh-state','playing');
await page.emulateMedia({reducedMotion:'reduce'});
await expect(page.locator('.hero-facts')).toHaveAttribute('data-sleigh-state','done');
await expect.poll(()=>page.locator('.hero-facts').evaluate(n=>n.style.transform)).toBe('');
assert.ok(await page.locator('.facts-sleigh-scene').isHidden());
const layouts=[];
for (const width of [320,390,768,1001,1440,1920,2880]) {
  await page.setViewportSize({width,height:1000});
  await page.goto(base);
  await page.evaluate(()=>document.fonts.ready);
  for (const zoom of ['100%','200%']) {
    await page.evaluate(z=>document.documentElement.style.fontSize=z,zoom);
    layouts.push(await page.locator('.hero-facts').evaluate((el,zoom)=>{
      const boxes=[...el.children].map(n=>n.getBoundingClientRect());
      return {width:innerWidth,zoom,overflow:document.documentElement.scrollWidth>innerWidth,
        centerOffset:Math.abs((Math.min(...boxes.map(b=>b.left))+Math.max(...boxes.map(b=>b.right)))/2-innerWidth/2),
        textOverflow:[...el.querySelectorAll('dd')].some(n=>n.scrollWidth>n.clientWidth)};
    },zoom));
  }
  await page.evaluate(()=>document.documentElement.style.fontSize='100%');
}
const mobile=await browser.newContext({viewport:{width:390,height:700},reducedMotion:'no-preference'});
const m=await mobile.newPage();
await m.goto(base);
assert.ok(await m.locator('.facts-sleigh-scene').isHidden());
await m.locator('.hero-bottom').scrollIntoViewIfNeeded();
await expect(m.locator('.hero-facts')).toHaveAttribute('data-sleigh-state','playing');
assert.ok(await m.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
await m.setViewportSize({width:768,height:1000});
await expect(m.locator('.hero-facts')).toHaveAttribute('data-sleigh-state','done');
const noJs=await browser.newContext({javaScriptEnabled:false});
const fallback=await noJs.newPage();
await fallback.goto(base);
assert.equal(await fallback.locator('.hero-facts dd').count(),3);
assert.ok(await fallback.locator('.facts-sleigh-scene').isHidden());
const failure=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'no-preference'});
const f=await failure.newPage();
await f.route('**/animations/santa-sleigh.json',r=>r.abort());
await f.goto(base);
await expect(f.locator('.hero-facts')).toHaveAttribute('data-sleigh-state','done');
assert.equal(await f.locator('.hero-facts').evaluate(n=>n.style.transform),'');
const reduced=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
const r=await reduced.newPage();
const fetched=[];
r.on('request',q=>{if(q.url().includes('santa-sleigh.json')||q.url().includes('lottie_light'))fetched.push(q.url());});
await r.goto(base);
assert.deepEqual(fetched,[]);
const axe=await new AxeBuilder({page:r}).include('.hero-bottom').withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
const failures=layouts.filter(l=>l.overflow||l.textOverflow||l.centerOffset>1);
const report={layouts,failures,errors,violations:axe.violations.map(v=>v.id),checks:{articulatedReindeer:true,settledCenter:true,noReplay:true,liveReducedMotion:true,mobileScrollEntry:true,resizeFinishes:true,noJs:true,assetFailureFallback:true,noAssetFetchOnReducedMotion:true}};
await writeFile(new URL('sleigh-report.json',import.meta.url),JSON.stringify(report,null,2));
console.log(JSON.stringify({...report,layouts:layouts.length}));
await browser.close();
assert.deepEqual(failures,[]);
assert.deepEqual(errors,[]);
assert.deepEqual(axe.violations,[]);
