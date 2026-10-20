import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';

// Fit only a global colour transform. Generated reference pixels are NEVER
// composited into the photograph: every output pixel comes from the original.
const directory = 'assets/fotos-vorige-edities/restored-2026-10-20';
const basis = (r,g,b) => [1,r,g,b];
function solve(a,b) {
  const m=a.map((row,i)=>[...row,b[i]]);
  for(let i=0;i<m.length;i++) {
    let p=i;
    for(let j=i+1;j<m.length;j++) if(Math.abs(m[j][i])>Math.abs(m[p][i])) p=j;
    [m[i],m[p]]=[m[p],m[i]];
    const divisor=m[i][i];
    for(let k=i;k<=m.length;k++) m[i][k]/=divisor;
    for(let j=0;j<m.length;j++) if(j!==i) {
      const f=m[j][i];
      for(let k=i;k<=m.length;k++) m[j][k]-=f*m[i][k];
    }
  }
  return m.map(row=>row.at(-1));
}
await mkdir(directory,{recursive:true});
const report=[];
for(const id of process.argv.slice(2)) {
  const source=`assets/fotos-vorige-edities/facebook-2025/2025-${id}.jpg`;
  const reference=`${directory}/2025-${id}-ai-reference.png`;
  // Strong blur removes faces and fine detail from the fitting inputs.
  const sample=async path=>sharp(path).resize(360,270,{fit:'fill'}).blur(4).removeAlpha().raw().toBuffer();
  const [s,t]=await Promise.all([sample(source),sample(reference)]);
  const a=Array.from({length:4},()=>Array(4).fill(0));
  const bs=Array.from({length:3},()=>Array(4).fill(0));
  let count=0;
  for(let i=0;i<s.length;i+=12) {
    const x=basis(s[i]/255,s[i+1]/255,s[i+2]/255);
    count++;
    for(let j=0;j<4;j++) {
      for(let k=0;k<4;k++) a[j][k]+=x[j]*x[k];
      for(let c=0;c<3;c++) bs[c][j]+=x[j]*t[i+c]/255;
    }
  }
  for(let j=0;j<4;j++) a[j][j]+=count*0.0002;
  const coefficients=bs.map(b=>solve(a,b));
  const {data,info}=await sharp(source).removeAlpha().raw().toBuffer({resolveWithObject:true});
  for(let i=0;i<data.length;i+=3) {
    const x=basis(data[i]/255,data[i+1]/255,data[i+2]/255);
    for(let c=0;c<3;c++) {
      const corrected=coefficients[c].reduce((v,k,j)=>v+k*x[j],0);
      // Keep most of the original party lighting; neutralisation is an accent.
      data[i+c]=Math.round(Math.max(0,Math.min(1,corrected*0.38+x[c+1]*0.62))*255);
    }
  }
  const master=`${directory}/2025-${id}-restored.png`;
  let photograph=await sharp(data,{raw:{width:info.width,height:info.height,channels:3}})
    .gamma(1.08).modulate({saturation:0.99}).linear(1.04,-4)
    .sharpen({sigma:0.65,m1:0.35,m2:0.8}).png().toBuffer();
  let framing={rotation:0,crop:null};
  if(id==='25') {
    // Last gallery image: align the window uprights and remove foreground floor.
    framing={rotation:-3,crop:{left:100,top:320,width:1900,height:1000}};
    photograph=await sharp(await sharp(photograph).rotate(framing.rotation).png().toBuffer())
      .extract(framing.crop).png().toBuffer();
  }
  if(id==='31') {
    framing={rotation:-1,crop:{left:40,top:40,width:2000,height:1480}};
    photograph=await sharp(await sharp(photograph).rotate(framing.rotation).png().toBuffer())
      .extract(framing.crop).png().toBuffer();
  }
  await writeFile(master,photograph);
  const output=await sharp(photograph).metadata();
  const widths=id==='25'?[640,1200,1600]:[480,960,1536];
  for(const width of widths) await sharp(master).resize(width).webp({quality:88,effort:6})
    .toFile(`public/images/event/2025-facebook-${id}-${width}.webp`);
  report.push({id,source,reference,master,width:output.width,height:output.height,coefficients,framing,
    correctionStrength:0.38,
    contentPreservation:'Original photographic pixels with restrained colour correction and sharpening. Hall and dance photographs rotated/cropped; no generated subjects or compositing.'});
}
await writeFile(`${directory}/colour-transform.json`,JSON.stringify(report,null,2)+'\n');
console.log(`Restored original pixels: ${report.map(x=>x.id).join(', ')}`);
