import { chromium, webkit, expect } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const engineName = process.env.QA_BROWSER || 'chromium';
const browser = await ({chromium, webkit})[engineName].launch();
const base = process.env.QA_URL || 'http://127.0.0.1:4325/';
const folder = `qa/motion-polish-2026-10-20/${engineName}`;
await mkdir(folder, {recursive:true});
const report = [];
const instrument = () => {
  window.motionStarts = [];
  const original = Element.prototype.animate;
  Element.prototype.animate = function(frames, options) {
    const frame = this.closest('[data-motion-frame]');
    if (this.matches('[data-motion-surface]') && frame) {
      const rect = frame.getBoundingClientRect();
      const image = this instanceof HTMLImageElement ? this : this.querySelector('img');
      window.motionStarts.push({
        frameIndex: [...document.querySelectorAll('[data-motion-frame]')].indexOf(frame), source: image?.getAttribute('src'), top: rect.top, bottom: rect.bottom,
        height: rect.height, viewport: innerHeight, decoded: image?.complete && image?.naturalWidth > 0,
        property: Object.keys(frames)[0], frames, at: performance.now(), scrollY,
        modal: document.body.matches('.modal-open,.menu-open'),
      });
    }
    return original.call(this, frames, options);
  };
};
try {
  for (const [width,height] of [[1440,900],[390,844],[320,568],[768,1024]]) {
    const context = await browser.newContext({viewport:{width,height}, reducedMotion:'no-preference'});
    const errors=[];
    context.on('page',opened=>opened.on('pageerror',error=>errors.push(error.message)));
    await context.addInitScript(instrument);
    let page = await context.newPage();
    await page.goto(base);
    await expect(page.locator('html')).toHaveAttribute('data-motion-initialized','true');
    await page.evaluate(()=>document.fonts.ready);
    await page.waitForTimeout(1500);
    assert.equal(await page.evaluate(()=>window.motionStarts.length),0,'No photo starts below fold');
    const count=await page.locator('[data-motion-frame]').count();
    assert.ok(count>=10,'Every editorial photo gets an independent frame');
    for(let index=0;index<count;index++) {
      if(index>0) {
        await page.close();
        page=await context.newPage();
        await page.goto(base);
        await expect(page.locator('html')).toHaveAttribute('data-motion-initialized','true');
        await page.evaluate(()=>document.fonts.ready);
      }
      const frame=page.locator('[data-motion-frame]').nth(index);
      const source=await frame.locator('img').getAttribute('src');
      // Place just 2px in view, then 15% of viewport: neither may consume the scene.
      for(const visible of [2,height*.15]) {
        await frame.evaluate((el,visible)=>window.scrollTo({top:scrollY+el.getBoundingClientRect().top-innerHeight+visible,behavior:'instant'}),visible);
        await page.waitForTimeout(100);
        const started=await page.evaluate(index=>window.motionStarts.filter(e=>e.frameIndex===index&&e.property==='transform').length,index);
        assert.equal(started,0,`${width}: ${source} played before its entry point`);
      }
      await frame.evaluate(el=>window.scrollTo({top:scrollY+el.getBoundingClientRect().top-innerHeight*.60,behavior:'instant'}));
      const before=await frame.boundingBox();
      await expect.poll(()=>page.evaluate(index=>window.motionStarts.filter(e=>e.frameIndex===index&&e.property==='transform').length,index), {message:`${engineName} ${width}px frame ${index} (${source}) must start at the visible entry point`}).toBe(1);
      if(index===0 && (width===1440||width===390)) {
        await page.waitForTimeout(100);
        await page.screenshot({path:`${folder}/photo-moving-${width}.png`});
      }
      await page.waitForTimeout(850);
      const after=await frame.boundingBox();
      assert.ok(Math.abs(before.y-after.y)<1 && Math.abs(before.height-after.height)<1,'Frame stays fixed while image moves');
      const styles=await frame.locator('[data-motion-surface]').evaluate(el=>({transform:el.style.transform,opacity:el.style.opacity,willChange:el.style.willChange}));
      assert.deepEqual(styles,{transform:'',opacity:'',willChange:''},'No retained animation styles');
      // Scroll back out, then return: the same photo must never replay.
      await frame.evaluate(el=>window.scrollTo({top:scrollY+el.getBoundingClientRect().top-innerHeight-20,behavior:'instant'}));
      await page.waitForTimeout(40);
      await frame.evaluate(el=>window.scrollTo({top:scrollY+el.getBoundingClientRect().top-innerHeight*.60,behavior:'instant'}));
      await page.waitForTimeout(80);
      assert.equal(await page.evaluate(index=>window.motionStarts.filter(e=>e.frameIndex===index&&e.property==='transform').length,index),1);
    }
    const starts=await page.evaluate(()=>window.motionStarts);
    for(const start of starts) {
      assert.ok(start.decoded && !start.modal,JSON.stringify(start));
      const visible=Math.max(0,Math.min(start.bottom,start.viewport)-Math.max(start.top,0));
      assert.ok(start.top<=start.viewport*.82+1 && visible>=Math.min(start.height,start.viewport)*.30-1,`Premature start: ${JSON.stringify(start)}`);
    }
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
    assert.deepEqual(errors,[]);
    await page.screenshot({path:`${folder}/settled-${width}.png`});
    report.push({width,height,frames:count,starts:starts.filter(s=>s.property==='transform'),passed:true});
    await context.close();
  }
  // Slow image + scrolling away: decoding may not trigger an animation offscreen.
  const context=await browser.newContext({viewport:{width:390,height:844}});
  const page=await context.newPage();
  await page.addInitScript(instrument);
  await page.route('**/2025-facebook-07-*.webp',async route=>{await new Promise(resolve=>setTimeout(resolve,2200));await route.continue();});
  await page.goto(base,{waitUntil:'domcontentloaded'});
  await expect(page.locator('html')).toHaveAttribute('data-motion-initialized','true');
  const first=page.locator('[data-motion-frame]').first();
  const source=await first.locator('img').getAttribute('src');
  await first.evaluate(el=>scrollTo({top:scrollY+el.getBoundingClientRect().top-innerHeight*.6,behavior:'instant'}));
  await page.waitForTimeout(100);
  await page.evaluate(()=>scrollTo({top:document.body.scrollHeight,behavior:'instant'}));
  await page.waitForTimeout(2500);
  assert.equal(await page.evaluate(source=>window.motionStarts.filter(e=>e.source===source).length,source),0,'Slow image never starts after scrolling away');
  await context.close();
  report.push({slowImageScrollAway:true,passed:true});
  await writeFile(`${folder}/results.json`,JSON.stringify(report,null,2));
  console.log(JSON.stringify({engine:engineName,passed:true,viewports:report.map(r=>r.width).filter(Boolean),slowImageScrollAway:true}));
} finally {await browser.close();}
