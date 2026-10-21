import { chromium, webkit } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';
const out=process.env.QA_OUT_DIR || 'qa/accessibility-2026-10-21';
await mkdir(out,{recursive:true});
const report={url:'http://127.0.0.1:4325/',states:[],checks:[],errors:[]};
const tags=['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa'];
for(const [engine,type] of [['chromium',chromium],['webkit',webkit]]){
 const browser=await type.launch();
 const context=await browser.newContext({reducedMotion:'reduce',viewport:{width:1440,height:900}});
 const page=await context.newPage();
 page.on('pageerror',e=>report.errors.push({engine,error:e.message}));
 const scan=async state=>{
  const a=await new AxeBuilder({page}).withTags(tags).analyze();
  const layout=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,overflow:[...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return r.width>0&&s.visibility!=='hidden'&&!['absolute','fixed'].includes(s.position)&&(r.right>innerWidth+1||r.left< -1)}).slice(0,15).map(e=>({tag:e.tagName,cls:e.className,text:e.textContent?.trim().slice(0,90)}))}));
  report.states.push({engine,state,layout,violations:a.violations.map(v=>({id:v.id,impact:v.impact,help:v.help,tags:v.tags,nodes:v.nodes.map(n=>({target:n.target,html:n.html,summary:n.failureSummary}))})),incomplete:a.incomplete.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});
 };
 const fresh=async(width=1440,height=900)=>{await page.setViewportSize({width,height});await page.goto(report.url);await page.locator('.centre-finder-enhanced').waitFor();await page.evaluate(()=>document.fonts.ready);};
 await fresh();await scan('desktop');
 report.checks.push({engine,structure:await page.evaluate(()=>({title:document.title,lang:document.documentElement.lang,headings:[...document.querySelectorAll('h1,h2,h3,h4')].map(e=>({level:e.tagName,text:e.textContent})),images:[...document.images].filter(e=>!e.hasAttribute('alt')).map(e=>e.outerHTML),anchors:[...document.querySelectorAll('a[href^="#"]')].filter(e=>!document.getElementById(e.hash.slice(1))).map(e=>e.outerHTML)}))});
 await page.keyboard.press('Tab');const skip=await page.locator('.skip-link').evaluate(e=>e===document.activeElement);await page.keyboard.press('Enter');await page.keyboard.press('Tab');report.checks.push({engine,skip,afterSkip:await page.evaluate(()=>document.activeElement?.outerHTML.slice(0,250))});
 for(const width of [320,390,768]){await fresh(width);await scan(`width-${width}`);await page.screenshot({path:`${out}/${engine}-${width}.png`,fullPage:true});}
 await fresh(390,844);await page.locator('.menu-toggle').focus();await page.keyboard.press('Enter');await scan('mobile-menu');
 const menuFocus=await page.evaluate(()=>document.activeElement?.className);await page.keyboard.press('Shift+Tab');const trap=await page.evaluate(()=>document.activeElement?.className);await page.keyboard.press('Escape');report.checks.push({engine,menuFocus,menuTrapBack:trap,menuRestored:await page.locator('.menu-toggle').evaluate(e=>e===document.activeElement)});
 await page.locator('.welcome-questions summary').nth(1).focus();await page.keyboard.press('Enter');await scan('faq-open');
 await page.locator('[data-show-all]').click();for(const d of await page.locator('.centre-card details').all()){await d.evaluate(e=>e.open=true)}await scan('all-centres-all-hours');
 await page.locator('[data-show-map]').click();await page.locator('.centre-map-marker').first().waitFor();await scan('map-open');
 await page.locator('.centre-map-marker').first().focus();await page.keyboard.press('Space');
 report.checks.push({engine,mapSpace:await page.locator('[data-map-name]').textContent(),mapButtons:await page.locator('.centre-map-marker').evaluateAll(es=>es.map(e=>({role:e.getAttribute('role'),label:e.getAttribute('aria-label'),pressed:e.getAttribute('aria-pressed'),tabindex:e.getAttribute('tabindex')})))});
 await page.locator('[data-map-choice]').selectOption('kasteeltje');await scan('map-selection-kasteeltje');
 await page.locator('[data-centre-map]>summary').click();report.checks.push({engine,mapReturn:await page.locator('[data-show-map]').evaluate(e=>e===document.activeElement)});
 await fresh(390,844);const trigger=page.locator('[data-photo-open]').first();await trigger.focus();await page.keyboard.press('Enter');await page.locator('[data-photo-viewer][open] img').waitFor({state:'visible'});await scan('photo-viewer');
 await page.keyboard.press('Shift+Tab');const viewerTrap=await page.evaluate(()=>document.activeElement?.getAttribute('aria-label'));await page.keyboard.press('ArrowRight');await page.keyboard.press('Escape');report.checks.push({engine,viewerTrap,viewerReturn:await trigger.evaluate(e=>e===document.activeElement)});
 await fresh(320,900);await page.evaluate(()=>document.documentElement.style.fontSize='200%');await scan('text-200-width-320');await page.screenshot({path:`${out}/${engine}-text-200.png`,fullPage:true});
 await page.locator('.menu-toggle').click();await scan('menu-text-200');await page.keyboard.press('Escape');
 await page.locator('[data-show-map]').click();await page.locator('.centre-map-marker').first().waitFor();await scan('map-text-200');await page.screenshot({path:`${out}/${engine}-map-text-200.png`,fullPage:true});
 await fresh(320);await page.addStyleTag({content:'*{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}p{margin-bottom:2em!important}'});await scan('text-spacing');await page.screenshot({path:`${out}/${engine}-spacing.png`,fullPage:true});
 await fresh(390);await page.emulateMedia({forcedColors:'active'});await scan('forced-colors');await page.screenshot({path:`${out}/${engine}-forced-colors.png`,fullPage:true});
 const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});const fallback=await nojs.newPage();await fallback.goto(report.url);report.checks.push({engine,nojs:{centres:await fallback.locator('.centre-card:visible').count(),nav:await fallback.locator('.no-js-nav').isVisible(),photos:await fallback.locator('[data-photo-open][href]').count()}});await nojs.close();
 await browser.close();
 await writeFile(`${out}/results.json`,JSON.stringify(report,null,2));
}
console.log(JSON.stringify({states:report.states.map(s=>({engine:s.engine,state:s.state,width:s.layout.width,scrollWidth:s.layout.scrollWidth,violations:s.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))})),checks:report.checks,errors:report.errors},null,2));
