import { chromium, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
const base=process.env.QA_URL||'http://127.0.0.1:4323/';
const output='qa/centre-hours-2026-10-21';
const evidence=JSON.parse(await readFile(`${output}/official-source-evidence.json`,'utf8'));
const browser=await chromium.launch();
const report={centres:[],viewports:[],pageErrors:[]};
try {
 const context=await browser.newContext({reducedMotion:'reduce'});
 const page=await context.newPage();
 page.on('pageerror',error=>report.pageErrors.push(error.message));
 await page.goto(base+'#ontmoetingscentra');
 await page.locator('[data-show-all]').click();
 for(const record of evidence){
  assert.equal(record.weekDate,'21-10-2026 00:00:00');
  const hours=page.locator(`[data-centre-hours="${record.id}"]`);
  const card=page.locator('.centre-card').filter({has:hours});
  if(!await card.locator('.centre-detail').evaluate(el=>el.open))await card.locator('.centre-detail-toggle').click();
  await card.locator('.centre-practical > summary').click();
  await expect(hours).toBeVisible();
  await expect(hours.locator('.centre-hours-source')).toHaveCount(0);
  // Validate all seven days against the independently saved official weekly schedule.
  const rows=await hours.locator(':scope > .centre-hours-grid > div').evaluateAll(rows=>rows.map(row=>({days:row.querySelector('dt').textContent,hours:row.querySelector('dd').textContent})));
  assert.equal(rows.length,3);
  for(const sourceDay of record.weeklyHours){
   const row=sourceDay.day==='dinsdag'?rows[1]:['zaterdag','zondag'].includes(sourceDay.day)?rows[2]:rows[0];
   const fmt=t=>t.includes('.')?t:t+'.00';
   assert.equal(row.hours,sourceDay.closed?'Gesloten':`${fmt(sourceDay.from)}–${fmt(sourceDay.to)} uur`);
  }
  const hasGeneralDesk=/de lokettijden zijn/i.test(record.serviceNotes);
  await expect(hours.locator('.centre-desk-hours')).toHaveCount(hasGeneralDesk?1:0);
  if(hasGeneralDesk){
   await hours.locator('summary').click();
   await expect(hours).toContainText('10.00–12.00 uur');
   await expect(hours).toContainText('11.00–12.00 uur');
   await expect(hours).toContainText('14.00–16.00 uur');
   await hours.locator('summary').click();
  }else await expect(hours).toContainText('Voor loketuren: bel het centrum.');
  report.centres.push({id:record.id,source:record.url,allSevenDaysMatchSource:true,generalDesk:hasGeneralDesk});
 }
 await page.locator('[data-show-map]').click();
 await expect(page.locator('.centre-map-marker')).toHaveCount(9);
 for(const record of evidence){
  await page.locator('[data-map-choice]').selectOption(record.id);
  const hours=page.locator('[data-map-hours]');
  await expect(hours).toHaveAttribute('data-hours-centre',record.id);
  await expect(hours.locator('.centre-hours-source')).toHaveCount(0);
  await expect(hours.locator('.centre-desk-hours')).toHaveCount(/de lokettijden zijn/i.test(record.serviceNotes)?1:0);
 }
 await page.locator('[data-map-choice]').selectOption('de-boeie');
 for(const width of [320,390,768,1440]){
  await page.setViewportSize({width,height:1000});
  await page.evaluate(()=>document.fonts.ready);
  await expect(page.locator('.leaflet-tile-loaded').first()).toBeVisible();
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  const axe=await new AxeBuilder({page}).include('#ontmoetingscentra').withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
  assert.deepEqual(axe.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.failureSummary)})),[]);
  await page.locator('[data-centre-map]').screenshot({path:`${output}/map-${width}.png`});
  await page.locator('.centre-card').first().screenshot({path:`${output}/centre-${width}.png`});
  report.viewports.push({width,overflow:false,axeViolations:0});
 }
 await page.setViewportSize({width:390,height:900});
 await page.locator('[data-map-hours] summary').click();
 await expect(page.locator('[data-map-hours] details')).toHaveAttribute('open');
 await page.locator('[data-map-hours]').screenshot({path:`${output}/map-desk-expanded.png`});
 await page.evaluate(()=>document.documentElement.style.fontSize='200%');
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 report.enlargedText=true;
 const noJs=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:900}});
 await noJs.goto(base);
 await noJs.locator('.centre-card').first().locator('.centre-practical > summary').click();
 await expect(noJs.locator('[data-centre-hours]')).toHaveCount(9);
 await noJs.locator('[data-centre-hours="de-boeie"] summary').click();
 await expect(noJs.locator('[data-centre-hours="de-boeie"] details')).toHaveAttribute('open');
 await expect(noJs.locator('[data-centre-hours="de-boeie"]')).toContainText('10.00–12.00 uur');
 report.noJavaScript=true;
 assert.deepEqual(report.pageErrors,[]);
}finally{await browser.close();await writeFile(`${output}/report.json`,JSON.stringify(report,null,2)+'\n');}
console.log(JSON.stringify(report,null,2));
