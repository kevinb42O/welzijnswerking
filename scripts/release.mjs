import { spawnSync } from 'node:child_process';
import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';

const root = resolve(new URL('../', import.meta.url).pathname);
function run(command, args, cwd = root) {
  const result = spawnSync(command, args, { cwd, stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status || 1);
}
run('npm', ['test']);
run(process.execPath, ['scripts/generate-social-card.mjs']);
run('npm', ['run', 'build']);
function files(dir) { return readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? files(`${dir}/${entry.name}`) : [`${dir}/${entry.name}`]); }
let output = files(`${root}/dist`);
const html = readFileSync(`${root}/dist/index.html`, 'utf8');
if (!html.includes('hero-kaarslicht-') || !html.includes('Fabrice Goffin') || output.some(file => file.includes('/dev-preview/'))) throw new Error('Publicatiecontrole mislukt: hero, organisatie of ontwikkelroutes.');
// Keep unused historical/stock copies in the workspace, outside the deploy package.
const referencedImages = new Set(output.filter(file => /\.(html|css|js|svg)$/.test(file)).flatMap(file => [...readFileSync(file, 'utf8').matchAll(/\/images\/[A-Za-z0-9_./-]+\.(?:webp|avif|png|jpe?g|svg)/g)].map(match => match[0])));
for (const file of output.filter(file => file.startsWith(`${root}/dist/images/`))) {
  if (!referencedImages.has(file.slice(`${root}/dist`.length))) rmSync(file);
}
output = files(`${root}/dist`);
for (const src of referencedImages) if (!output.includes(`${root}/dist${src}`)) throw new Error(`Ontbrekend beeld: ${src}`);
const { event, brand } = JSON.parse(readFileSync(`${root}/data/inhoud_2026.json`, 'utf8'));
const missing = [];
for (const [key, label] of [['eventStartTime','Aanvang'],['eligibilityRules','Doelgroep/voorwaarden'],['drinksIncluded','Dranken']]) if (!event[key]) missing.push(label);
if (!event.ticketUrl && !event.registrationMethod) missing.push('Inschrijvingswijze');
if (!event.menuItems.length || event.menuNote) missing.push('Volledig menu');
if (!brand.organizationContactEmail && !brand.organizationContactPhone) missing.push('Organisatorcontact');
mkdirSync(`${root}/release`, { recursive: true });
const archive = `${root}/release/welzijnswerking-2026.zip`;
rmSync(archive, { force: true });
// ZIP root contains index.html: upload/extract the contents directly to the web root.
run('zip', ['-q', '-r', archive, '.'], `${root}/dist`);
const manifest = {
  builtAtUtc: new Date().toISOString(), archive: 'welzijnswerking-2026.zip',
  archiveBytes: statSync(archive).size, archiveSha256: createHash('sha256').update(readFileSync(archive)).digest('hex'),
  eventDate: event.date, ticketStatus: event.ticketSalesStatus, informationToComplete: missing,
  files: output.map(file => ({ path: file.slice(`${root}/dist/`.length), bytes: statSync(file).size, sha256: createHash('sha256').update(readFileSync(file)).digest('hex') })),
};
writeFileSync(`${root}/release/BUILD_INFO.json`, JSON.stringify(manifest, null, 2) + '\n');
console.log(`\nDeploypakket klaar: ${archive}\nNog aan te vullen: ${missing.join(', ') || 'geen kernvelden'}.\nNa inhoudswijzigingen opnieuw npm run release uitvoeren.`);
