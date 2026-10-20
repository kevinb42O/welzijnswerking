import test, { after } from 'node:test';
import { writeFileSync, unlinkSync } from 'node:fs';
import assert from 'node:assert/strict';
import { hasLocalImage, publishedPhotos, publishedSponsors, safeWebsite, ticketState } from '../src/data/publication.mjs';
const image = '/images/event/.qa-fixture.svg';
const logo = '/images/sponsors/.qa-fixture.svg';
for (const file of [image,logo]) writeFileSync(`public${file}`, '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"></svg>');
after(() => { for (const file of [image,logo]) unlinkSync(`public${file}`); });
test('foto’s vereisen expliciete toestemming, jaar, bewijs en een lokaal bestand', () => {
  const good = { src: image, year: 2025, alt: 'Testfixture', credit: 'Testcredit', permissionEvidence: 'Schriftelijk akkoord', publish: true, permissionReceived: true };
  assert.equal(publishedPhotos([good]).length, 1);
  for (const patch of [{publish:false}, {permissionReceived:false}, {permissionEvidence:''}, {year:2026}, {year:1961}, {year:2025.5}, {src:'/images/ontbreekt.webp'}, {src:'/images/sfeerbeelden/hero-kerstdiner-desktop.webp'}, {alt:''}, {credit:''}]) {
    assert.equal(publishedPhotos([{...good,...patch}]).length, 0);
  }
});
test('sponsors vereisen actuele bevestiging, verificatie en goedgekeurd bestaand logo', () => {
  const good = { logo, tier:'partner', confirmedFor2026:true, verified:true, logoUsageApproved:true, displayOrder:2 };
  assert.equal(publishedSponsors([good]).length, 1);
  for (const patch of [{confirmedFor2026:false}, {verified:false}, {logoUsageApproved:false}, {logo:'/images/ontbreekt.svg'}]) {
    assert.equal(publishedSponsors([{...good,...patch}]).length, 0);
  }
  assert.deepEqual(publishedSponsors([good,{...good,displayOrder:1}]).map(s => s.displayOrder),[1,2]);
});
test('afbeeldingspaden kunnen niet buiten de publieke beeldmap gaan', () => {
  assert.equal(hasLocalImage(image),true);
  for(const path of ['/images/../../package.json','https://example.com/logo.svg','/images/../../assets/decoratie/takje.svg']) assert.equal(hasLocalImage(path),false);
});
test('ticketstatus gebruikt alleen bij beschikbare tickets een veilige echte URL', () => {
  assert.equal(ticketState('available','https://example.com/tickets').url,'https://example.com/tickets');
  assert.equal(ticketState('available',null).url,null);
  assert.equal(ticketState('available','javascript:alert(1)').url,null);
  assert.equal(ticketState('not_confirmed','https://example.com/tickets').url,null);
  assert.match(ticketState('sold_out',null).label,/uitverkocht/);
  assert.match(ticketState('closed',null).label,/afgesloten/);
});
test('externe website-links laten geen onveilige protocollen of credentials door', () => {
  for(const url of ['javascript:alert(1)','http://example.com','https://user:pass@example.com','onzin']) assert.equal(safeWebsite(url),null);
});
