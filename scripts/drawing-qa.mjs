import{chromium,expect}from'@playwright/test';import{mkdir,writeFile}from'node:fs/promises';import assert from'node:assert/strict';
await mkdir('qa/redesign-fix/hero-review',{recursive:true});const browser=await chromium.launch();const results=[];
for(const reducedMotion of ['no-preference','reduce']){
 const page=await browser.newPage({reducedMotion});
 for(const[width,height]of[[1440,900],[1440,700],[390,844],[390,667],[320,740],[768,1024]]){
  await page.setViewportSize({width,height});await page.goto(process.env.QA_URL||'http://127.0.0.1:4323');await page.evaluate(()=>document.fonts.ready);
  await expect(page.locator(width<=600?'.candle-compact':'.candle-full')).toBeVisible();await expect(page.locator('video,.motion-toggle,.hero-photograph,.atmosphere-interlude')).toHaveCount(0);
  const state=await page.evaluate(()=>{const art=[...document.querySelectorAll('.candle-drawing')].find(e=>e.getBoundingClientRect().height>0).getBoundingClientRect();const line=document.querySelector('.hero-bottom').getBoundingClientRect();const copy=document.querySelector('.hero-copy').getBoundingClientRect();return{runningAnimations:document.getAnimations().filter(a=>a.playState==='running').length,drawingToFactsGap:line.top-art.bottom,copyOverlap:art.left<copy.right&&art.right>copy.left&&art.top<copy.bottom&&art.bottom>copy.top};});
  assert.equal(state.runningAnimations,0);assert.equal(state.copyOverlap,false);assert.ok(state.drawingToFactsGap>=16);if(reducedMotion==='no-preference')await page.screenshot({path:`qa/redesign-fix/hero-review/hero-${width}-${height}.png`});results.push({width,height,reducedMotion,...state});
 }await page.close();
}await writeFile('qa/redesign-fix/drawing-report.json',JSON.stringify(results,null,2));await browser.close();console.log('Static drawing / compact variant / spacing: passed.');
