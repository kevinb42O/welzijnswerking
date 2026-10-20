import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createSeo, serializeJsonLd } from '../src/data/seo.mjs';
const source = JSON.parse(readFileSync(new URL('../data/inhoud_2026.json', import.meta.url), 'utf8'));

test('SEO never promises available tickets when registration is unknown, sold out or closed', () => {
  for (const [status, expected] of [['not_confirmed', /ontmoetingscentrum/], ['sold_out', /uitverkocht/], ['closed', /afgesloten/]]) {
    const input = structuredClone(source);
    input.event.ticketSalesStatus = status;
    const seo = createSeo(input, '/?utm_source=facebook#inschrijven');
    assert.match(seo.description, expected);
    assert.equal(seo.canonicalUrl, `${source.siteUrl}/`);
    assert.ok(!JSON.stringify(seo.structuredData).includes('InStock'));
    assert.ok(!JSON.stringify(seo.structuredData).includes('Offer'));
    assert.equal(seo.structuredData['@graph'].find(node => node['@type'] === 'Event').eventStatus, 'https://schema.org/EventScheduled');
  }
});

test('dates, prices and share alt follow confirmed content, including future editions', () => {
  const input = structuredClone(source);
  input.event.year = 2027;
  input.event.date = '2027-12-24';
  input.event.priceEuro = 7.5;
  input.event.eventStartTime = null;
  input.event.endTime = null;
  const seo = createSeo(input);
  assert.match(seo.title, /2027/);
  assert.match(seo.description, /24 december 2027/);
  assert.match(seo.description, /€ 7,5/);
  assert.match(seo.socialImageAlt, /24 december 2027/);
  assert.ok(!seo.socialImageAlt.includes('17.00'));
  const event = seo.structuredData['@graph'].find(node => node['@type'] === 'Event');
  assert.equal(event.startDate, '2027-12-24');
  assert.equal(event.endDate, undefined);
});

test('embedded structured data cannot close its script element', () => {
  const hostile = { description: '</script><script>alert("test")</script>' };
  const serialized = serializeJsonLd(hostile);
  assert.ok(!serialized.includes('<'));
  assert.deepEqual(JSON.parse(serialized), hostile);
});
