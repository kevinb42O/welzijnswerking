import {chromium} from '@playwright/test';import{writeFile,stat}from'node:fs/promises';import assert from'node:assert/strict';
const browser=await chromium.launch();const results=[];
for(const[width,height]of[[390,844],[1440,900]]){
 const context=await browser.newContext({viewport:{width,height}});const page=await context.newPage();
 await page.addInitScript(()=>{window.qaMetrics={lcp:0,cls:0};new PerformanceObserver(list=>{for(const e of list.getEntries())window.qaMetrics.lcp=e.startTime;}).observe({type:'largest-contentful-paint',buffered:true});new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.qaMetrics.cls+=e.value;}).observe({type:'layout-shift',buffered:true});});
 await page.goto(process.env.QA_URL||'http://127.0.0.1:4325/');await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(1000);
 const initial=await page.evaluate(()=>({metrics:window.qaMetrics,resources:performance.getEntriesByType('resource').map(r=>({name:new URL(r.name).pathname,type:r.initiatorType,bytes:r.decodedBodySize})),htmlBytes:performance.getEntriesByType('navigation')[0].decodedBodySize}));
 await page.locator('.venue-scene img').scrollIntoViewIfNeeded();await page.locator('.venue-scene img').evaluate(i=>i.decode());
 const image=await page.locator('.venue-scene img').evaluate(i=>new URL(i.currentSrc).pathname);const partnersHeight=await page.locator('#partners').evaluate(e=>e.getBoundingClientRect().height);
 assert.ok(initial.metrics.cls<=.1);results.push({width,height,...initial,selectedVenueImage:image,selectedVenueImageBytes:(await stat(`public${image}`)).size,partnersHeight});await context.close();
}
await browser.close();await writeFile('qa/redesign-fix/performance-report.json',JSON.stringify({conditions:'Local Chromium, cold context, no network/CPU throttling; indicative only. Baseline resource transfer/LCP/CLS not captured, so no before/after timing claim.',baselineVenueImageBytes:(await stat('public/images/editorial/kursaal-twilight-2025-wide.webp')).size,results},null,2));console.log('Local performance and asset report saved.');
