import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const folder = 'qa/motion-polish-2026-10-20';
await mkdir(folder, { recursive: true });
const browser = await chromium.launch();
const results=[];
try {
  for(const width of [1440,390]) {
    const height=width===1440?900:844;
    const context=await browser.newContext({viewport:{width,height},reducedMotion:'no-preference',recordVideo:{dir:folder,size:{width,height}}});
    const page=await context.newPage();
    await page.addInitScript(()=>{
      window.motionProof=[];
      const original=Element.prototype.animate;
      Element.prototype.animate=function(frames,options){
        const frame=this.closest('[data-motion-frame]');
        const rect=frame?.getBoundingClientRect();
        window.motionProof.push({target:this.className,surface:this.matches('[data-motion-surface]'),frames,top:rect?.top,bottom:rect?.bottom,height:rect?.height,viewport:innerHeight,at:performance.now()});
        return original.call(this,frames,options);
      };
    });
    if(width===1440) await page.route('**/*motion*.js*',async route=>{await new Promise(resolve=>setTimeout(resolve,2100));await route.continue();});
    await page.goto(process.env.QA_URL||'http://127.0.0.1:4325/');
    await page.waitForFunction(()=>window.motionProof.some(entry=>entry.target==='hero-word-text'));
    await page.waitForTimeout(160);
    const midway=await page.locator('.hero-word-text').last().evaluate(el=>({transform:getComputedStyle(el).transform,opacity:getComputedStyle(el).opacity}));
    assert.notEqual(midway.transform,'none');
    assert.ok(Number(midway.opacity)<1);
    await page.screenshot({path:`${folder}/hero-moving-${width}.png`});
    await page.waitForTimeout(1400);
    await page.screenshot({path:`${folder}/hero-settled-${width}.png`});
    // Ordinary incremental scrolling, rather than jumping every photo into the centre.
    const distance=await page.evaluate(()=>document.documentElement.scrollHeight-innerHeight);
    for(let total=0;total<distance+200;total+=120){
      await page.mouse.wheel(0,120);
      await page.waitForTimeout(100);
    }
    await page.waitForTimeout(900);
    const events=await page.evaluate(()=>window.motionProof);
    const photoStarts=events.filter(entry=>entry.surface && 'transform' in entry.frames);
    assert.ok(photoStarts.length>=8);
    for(const entry of photoStarts){
      assert.ok(entry.top>=0 && entry.top<=entry.viewport*.82+1);
      const visible=Math.max(0,Math.min(entry.bottom,entry.viewport)-Math.max(entry.top,0));
      assert.ok(visible>=Math.min(entry.height,entry.viewport)*.3-1);
      assert.equal('clipPath' in entry.frames,false);
    }
    results.push({width,slowModuleDelay:width===1440?2100:0,midway,photoStarts});
    const video=page.video();
    await context.close();
    await video.saveAs(`${folder}/polished-scroll-${width}.webm`);
  }
  await writeFile(`${folder}/natural-scroll-results.json`,JSON.stringify(results,null,2));
  console.log(JSON.stringify({passed:true,viewports:results.map(r=>r.width),photoStarts:results.map(r=>r.photoStarts.length)}));
} finally {await browser.close();}
