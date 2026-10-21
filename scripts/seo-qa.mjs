import assert from 'node:assert/strict';
import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import sharp from 'sharp';
import { chromium } from '@playwright/test';

const root = new URL('../', import.meta.url);
const source = JSON.parse(await readFile(new URL('data/inhoud_2026.json', root), 'utf8'));
const home = new URL('/', source.siteUrl).href;
const html = await readFile(new URL('dist/index.html', root), 'utf8');
const sitemap = await readFile(new URL('dist/sitemap.xml', root), 'utf8');
const robots = await readFile(new URL('dist/robots.txt', root), 'utf8');
assert.match(robots, /^User-agent: \*$/m);
assert.match(robots, /^Allow: \/$/m);
assert.ok(robots.includes(`Sitemap: ${home}sitemap.xml`));
assert.deepEqual([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]), [home]);
assert.ok(!(await readdir(new URL('dist/', root))).includes('dev-preview'));

// Parse the actual production HTML in a browser, with network and JavaScript disabled.
const browser = await chromium.launch();
try {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.route('**/*', route => route.abort());
  await page.setContent(html, { waitUntil: 'domcontentloaded' });
  const meta = name => page.locator(`meta[name="${name}"], meta[property="${name}"]`).getAttribute('content');
  assert.equal(await page.locator('html').getAttribute('lang'), 'nl-BE');
  assert.equal(await page.locator('h1').count(), 1);
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), home);
  assert.equal(await meta('og:url'), home);
  assert.equal(await page.locator('meta[name="robots"]').count(), 0);
  const title = await page.title();
  const description = await meta('description');
  assert.match(title, /Kerstfeest 2026 voor alleenstaanden in Oostende/);
  for (const term of ['24 december 2026', '50 jaar', '€ 5', 'ontmoetingscentrum']) assert.ok(description.includes(term), term);
  assert.equal(await meta('og:description'), description);
  assert.equal(await meta('twitter:description'), description);
  assert.equal(await meta('og:title'), title);
  assert.equal(await meta('twitter:title'), title);
  const text = await page.locator('main').textContent();
  for (const term of ['Oostende', '50 jaar', '17.00 uur', '21.30 uur', '€ 5', 'negen ontmoetingscentra']) assert.ok(text.includes(term), term);
  for (const question of ['Hoe schrijf ik me in?', 'Wat kost het kerstfeest?']) {
    assert.equal(await page.locator('#welkom summary').filter({ hasText: question }).count(), 1);
  }
  assert.equal(await page.locator('#ontmoetingscentra .centre-card a[href^="tel:"]').count(), 9);

  const data = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
  const graph = data['@graph'];
  assert.deepEqual(graph.map(node => node['@type']).sort(), ['Event', 'Organization', 'WebPage', 'WebSite']);
  const event = graph.find(node => node['@type'] === 'Event');
  assert.equal(event.startDate, '2026-12-24T16:00:00.000Z');
  assert.equal(event.endDate, '2026-12-24T20:30:00.000Z');
  assert.equal(event.eventStatus, 'https://schema.org/EventScheduled');
  assert.equal(event.location.address.addressCountry, 'BE');
  assert.equal(event.location.address.postalCode, '8400');
  assert.equal(event.location.address.streetAddress, 'Kursaal-Westhelling 12');
  assert.equal(event.offers, undefined, 'Offline registration must not invent a purchase URL');
  assert.equal(event.performer.name, source.event.performerName);
  assert.ok(text.includes(event.performer.name), 'Structured performer must be named in visible content');
  assert.ok(graph.some(node => node['@id'] === event.organizer['@id']));
  assert.equal(new URL(event.image[0]).origin, new URL(home).origin);
  await readFile(new URL(`dist${new URL(event.image[0]).pathname}`, root));
  const shareUrl = await meta('og:image');
  assert.equal(shareUrl, await meta('twitter:image'));
  const image = await sharp(await readFile(new URL(`dist${new URL(shareUrl).pathname}`, root))).metadata();
  assert.equal(image.width, 1200);
  assert.equal(image.height, 630);
  const report = { checkedAt: new Date().toISOString(), scope: 'Generated production files; no claim of live Google indexation or platform preview validation.', title, description, canonical: home, sitemapUrls: [home], graphTypes: graph.map(node => node['@type']), startDate: event.startDate, endDate: event.endDate, shareImage: { url: shareUrl, width: image.width, height: image.height }, noJavaScriptContent: true, meetingCentrePhones: 9, passed: true };
  await mkdir(new URL('qa/seo-2026-10-20/', root), { recursive: true });
  await writeFile(new URL('qa/seo-2026-10-20/build-audit.json', root), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report, null, 2));
} finally { await browser.close(); }
