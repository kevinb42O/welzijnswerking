import{chromium,expect}from'@playwright/test';import AxeBuilder from'@axe-core/playwright';import assert from'node:assert/strict';import{writeFile,mkdir}from'node:fs/promises';
const base=process.env.DEV_QA_URL||'http://127.0.0.1:4323';await mkdir('qa/redesign-fix/modules',{recursive:true});const browser=await chromium.launch();const context=await browser.newContext();const page=await context.newPage();const results=[];
try{
for(const state of ['start','full','available','invalid','missing-link','sold-out','closed','contact','menu-only','eligibility-only','only-menu-missing']){
 for(const width of state==='full'?[320,390,1440]:[390]){
  await page.setViewportSize({width,height:844});await page.goto(`${base}/dev-preview/state-${state}`);await page.evaluate(()=>document.fonts.ready);
  const note=await page.locator('.participation-note').innerText();const hero=page.locator('.hero .button');
  if(state==='available'){await expect(hero).toHaveAttribute('href','https://example.com/tickets');await expect(page.locator('.participation-note .button')).toHaveCount(1);}
  else{await expect(hero).toHaveAttribute('href','#praktisch');await expect(page.locator('.participation-note .button')).toHaveCount(0);}
  if(state==='sold-out')assert.match(note,/uitverkocht/);if(state==='closed')assert.match(note,/afgesloten/);
  if(state==='start'){assert.ok(!note.includes('aanvangsuur'));await expect(page.locator('.additional-details')).toContainText('18.00 uur');}
  if(state==='full'){assert.ok(!note.includes('bekendgemaakt'));await expect(page.locator('.additional-details>div')).toHaveCount(10);await expect(page.locator('.venue-detail')).toContainText('DEMO-zaal');}
  if(state==='only-menu-missing')assert.match(note,/het menu wordt/);
  if(state==='menu-only')assert.ok(!note.includes('het menu'));
  if(state==='eligibility-only')assert.ok(!note.includes('deelnamevoorwaarden'));
  if(state==='contact'){await expect(page.locator('a[href="mailto:demo@example.com"]')).toBeVisible();await expect(page.locator('a[href="tel:+3259000000"]')).toBeVisible();}
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();assert.equal(axe.violations.length,0,JSON.stringify(axe.violations));
  await page.locator('#praktisch').screenshot({path:`qa/redesign-fix/modules/state-${state}-${width}.png`});results.push({state,width,note,axeViolations:0,overflow:false});
 }
}
await writeFile('qa/redesign-fix/states-report.json',JSON.stringify(results,null,2));console.log('11 data states: passed.');
}finally{await browser.close();}
