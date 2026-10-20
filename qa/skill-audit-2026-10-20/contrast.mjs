import { chromium } from '@playwright/test';
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

// Sample the real background underneath text. Use the CSS foreground color,
// not the anti-aliased screenshot foreground, for WCAG contrast calculation.
// Pixel changes locate glyphs; alpha >= .8 excludes uncertain glyph edges.
const out = new URL('./', import.meta.url).pathname;
const browser = await chromium.launch();
const results = [];
const lum = rgb => rgb.map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((n,v,i)=>n+v*[.2126,.7152,.0722][i],0);
for (const width of [390,1440]) {
  const page = await browser.newPage({viewport:{width,height:900}});
  await page.goto('http://127.0.0.1:4325/');
  await page.evaluate(()=>document.fonts.ready);
  const samples = await page.evaluate(()=>['.hero-label','#hero-title > span:nth-child(1)','.hero-title-last','.hero-intro','.hero .button'].map(selector=>{
    const el=document.querySelector(selector),s=getComputedStyle(el),rects=[];
    const walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);
    while(walk.nextNode()) {
      const range=document.createRange();range.selectNodeContents(walk.currentNode);
      for(const b of range.getClientRects())rects.push({x:b.x,y:b.y,width:b.width,height:b.height});
    }
    return {selector,color:s.color,fontSize:s.fontSize,rects};
  }));
  const before=await page.screenshot({path:`${out}contrast-original-${width}.png`});
  await page.addStyleTag({content:'.hero-label,.hero-label *,#hero-title,#hero-title *,.hero-intro,.hero .button,.hero .button *{color:transparent!important;text-shadow:none!important}'});
  const background=await page.screenshot({path:`${out}contrast-background-${width}.png`});
  const bg=await sharp(background).raw().toBuffer({resolveWithObject:true});
  const fg=await sharp(before).raw().toBuffer({resolveWithObject:true});
  for(const sample of samples) {
    const rgb=sample.color.match(/[\d.]+/g).slice(0,3).map(Number);
    let min=Infinity,point=null,count=0;
    for(const r of sample.rects)for(let y=Math.max(0,Math.floor(r.y));y<Math.min(bg.info.height,Math.ceil(r.y+r.height));y++)for(let x=Math.max(0,Math.floor(r.x));x<Math.min(width,Math.ceil(r.x+r.width));x++) {
      const i=(y*width+x)*bg.info.channels;
      const back=[...bg.data.subarray(i,i+3)],front=[...fg.data.subarray(i,i+3)];
      const delta=rgb.reduce((n,c,j)=>n+(c-back[j])**2,0);if(delta<400)continue;
      const alpha=rgb.reduce((n,c,j)=>n+(front[j]-back[j])*(c-back[j]),0)/delta;
      if(alpha<.8)continue;
      const l1=lum(rgb),l2=lum(back),ratio=(Math.max(l1,l2)+.05)/(Math.min(l1,l2)+.05);
      count++;
      if(ratio<min){min=ratio;point={x,y,bg:back};}
    }
    results.push({width,selector:sample.selector,color:sample.color,fontSize:sample.fontSize,sampledGlyphPixels:count,minContrast:min,point});
  }
  await page.close();
}
await browser.close();
await writeFile(`${out}hero-contrast.json`,JSON.stringify(results,null,2));
console.log(JSON.stringify(results.map(({width,selector,minContrast})=>({width,selector,minContrast})),null,2));
