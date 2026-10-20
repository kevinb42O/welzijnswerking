import {chromium} from '@playwright/test';
import {mkdir} from 'node:fs/promises';
const round=process.argv[2]||'full-review';await mkdir(`qa/redesign-fix/${round}`,{recursive:true});
const browser=await chromium.launch({headless:true});const page=await browser.newPage({reducedMotion:'reduce'});
for(const [width,height]of [[1440,900],[390,844],[320,740],[768,1024]]){
 await page.setViewportSize({width,height});await page.goto(process.env.QA_URL||'http://127.0.0.1:4323/');await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:`qa/redesign-fix/${round}/viewport-${width}.png`});await page.screenshot({path:`qa/redesign-fix/${round}/full-${width}.png`,fullPage:true});
 if([1440,390].includes(width))for(const id of ['edities','praktisch','partners'])await page.locator(`#${id}`).screenshot({path:`qa/redesign-fix/${round}/${id}-${width}.png`});
 if(width===390)for(let n=1;n<=2;n++){await page.evaluate(y=>scrollTo(0,y),n*height);await page.screenshot({path:`qa/redesign-fix/${round}/screen-${n+1}-390.png`});}
}
await browser.close();console.log(`Screenshots: qa/redesign-fix/${round}`);
