import {chromium,webkit,expect} from '@playwright/test';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
const folder='qa/hero-motion-2026-10-20';
await mkdir(folder,{recursive:true});
const report=[];
for(const [name,engine] of Object.entries({chromium,webkit})){
 const browser=await engine.launch();
 try{
  for(const width of [320,390,1440]){
   const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'no-preference',...(name==='chromium'&&width!==320?{recordVideo:{dir:folder,size:{width,height:900}}}:{})});
   const page=await context.newPage();
   const errors=[];page.on('pageerror',error=>errors.push(error.message));
   await page.addInitScript(()=>{window.heroCalls=[];const original=Element.prototype.animate;Element.prototype.animate=function(frames,options){if(this.matches('.hero-word-text'))window.heroCalls.push({word:this.textContent,frames,options,at:performance.now()});return original.call(this,frames,options);};});
   await page.goto('http://127.0.0.1:4325/');
   await expect.poll(()=>page.evaluate(()=>window.heroCalls.length)).toBeGreaterThan(0);
   const words=page.locator('.hero-word-text');
   const count=await words.count();
   assert.equal(count,6);
   await page.waitForTimeout(180);
   const moving=await words.last().evaluate(el=>({transform:getComputedStyle(el).transform,opacity:getComputedStyle(el).opacity}));
   assert.notEqual(moving.transform,'none');assert.ok(Number(moving.opacity)<1);
   if(name==='chromium')await page.screenshot({path:`${folder}/moving-${width}.png`});
   await page.waitForTimeout(1800);
   await expect.poll(()=>words.evaluateAll(elements=>elements.every(el=>!el.style.transform&&!el.style.opacity&&!el.style.willChange))).toBe(true);
   const layout=await page.locator('h1').evaluate(el=>({text:el.innerText,overflow:document.documentElement.scrollWidth>innerWidth,words:[...el.querySelectorAll('.hero-word')].map(word=>({left:word.getBoundingClientRect().left,right:word.getBoundingClientRect().right,clip:getComputedStyle(word).overflow}))}));
   assert.equal(layout.text.replace(/\s+/g,' ').trim(),'Vier kerstavond samen in het Kursaal.');assert.equal(layout.overflow,false);
   assert.ok(layout.words.every(word=>word.left>=0&&word.right<=width));
   const calls=await page.evaluate(()=>window.heroCalls);
   const transforms=calls.filter(call=>'transform'in call.frames);
   assert.equal(transforms.length,count);assert.ok(transforms.at(-1).options.delay>transforms[0].options.delay);
   assert.deepEqual(errors,[]);
   if(name==='chromium')await page.screenshot({path:`${folder}/settled-${width}.png`});
   report.push({name,width,count,moving,layout,delays:transforms.map(c=>c.options.delay),passed:true});
   const video=page.video();await context.close();if(video)await video.saveAs(`${folder}/hero-${width}.webm`);
  }
  const context=await browser.newContext({reducedMotion:'reduce'});const page=await context.newPage();await page.goto('http://127.0.0.1:4325/#home');await expect(page.locator('h1')).toBeVisible();assert.equal(await page.locator('.hero-word-text').evaluateAll(elements=>elements.some(el=>el.style.transform)),false);await context.close();
 }finally{await browser.close();}
}
await writeFile(`${folder}/results.json`,JSON.stringify(report,null,2));console.log(JSON.stringify({passed:true,cases:report.map(r=>`${r.name}-${r.width}`)}));
