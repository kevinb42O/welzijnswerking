import { eventInstant, formatEventDate, formatPrice } from './format.mjs';

/** Build search and sharing information from the same confirmed facts as the page.
 * @param {typeof import('../../data/inhoud_2026.json')} source
 * @param {string} pathname
 */
export function createSeo(source, pathname = '/') {
  const { event, brand } = source;
  const home = new URL('/', source.siteUrl).href;
  const canonicalUrl = new URL(pathname, home);
  canonicalUrl.search = '';
  canonicalUrl.hash = '';
  const date = formatEventDate(event.date, event.timezone).replace(/^\S+\s/, '');
  const price = formatPrice(event.priceEuro);
  const closed = event.ticketSalesStatus === 'closed' || event.ticketSalesStatus === 'sold_out';
  const registration = event.ticketSalesStatus === 'sold_out'
    ? 'Het kerstfeest is uitverkocht.'
    : closed ? 'De inschrijvingen zijn afgesloten.'
    : event.registrationChannel === 'meeting_centres'
      ? 'Inschrijven via een ontmoetingscentrum.'
      : event.registrationMethod || 'Bekijk de actuele informatie over deelname.';
  const title = `Kerstfeest ${event.year} voor alleenstaanden in Oostende | ${brand.shortName}`;
  const description = `Vier kerstavond in ${event.venueName} op ${date}. ${event.eligibilityRules || ''} ${price} per persoon. ${registration}`.replace(/\s+/g, ' ').trim();
  const socialImage = new URL(`/kerstfeest-${event.year}-social.jpg`, home).href;
  const socialImageAlt = [event.title.replace(/\s+/g, ' ').trim(), date,
    event.eventStartTime && event.endTime ? `${event.eventStartTime}–${event.endTime}` : event.eventStartTime,
    event.venueName, `${price} per persoon.`, event.eligibilityRules, brand.name,
  ].filter(Boolean).join(' ');
  const organizationId = `${home}#organisatie`;
  const websiteId = `${home}#website`;
  const webpageId = `${canonicalUrl.href}#webpagina`;
  const eventId = `${home}#kerstfeest-${event.year}`;
  const start = eventInstant(event.date, event.eventStartTime, event.timezone);
  const end = eventInstant(event.date, event.endTime, event.timezone);
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization', '@id': organizationId,
        name: brand.name, url: home,
        ...(brand.organizationContactEmail ? { email: brand.organizationContactEmail } : {}),
        ...(brand.organizationContactPhone ? { telephone: brand.organizationContactPhone } : {}),
      },
      {
        '@type': 'WebSite', '@id': websiteId,
        name: 'Welzijnswerking Oostende', url: home, inLanguage: source.lang,
        publisher: { '@id': organizationId },
      },
      {
        '@type': 'WebPage', '@id': webpageId,
        url: canonicalUrl.href, name: title, description, inLanguage: source.lang,
        isPartOf: { '@id': websiteId }, mainEntity: { '@id': eventId },
      },
      {
        '@type': 'Event', '@id': eventId,
        name: `Kerstfeest ${event.year} — Welzijnswerking Oostende`,
        description, url: home, mainEntityOfPage: { '@id': webpageId },
        startDate: start || event.date,
        ...(end ? { endDate: end } : {}),
        eventStatus: 'https://schema.org/EventScheduled',
        ...(event.performerName ? { performer: { '@type': 'Person', name: event.performerName } } : {}),
        image: [new URL('/images/editorial/hero-kaarslicht-1200.webp', home).href],
        location: {
          '@type': 'Place', name: event.venueName,
          address: { '@type': 'PostalAddress', ...event.venuePostalAddress },
        },
        organizer: { '@id': organizationId },
      },
    ],
  };
  return { title, description, canonicalUrl: canonicalUrl.href, socialImage, socialImageAlt, structuredData };
}

/** Escape HTML-sensitive characters in JSON embedded inside a script element.
 * @param {unknown} value
 */
export const serializeJsonLd = value => JSON.stringify(value).replace(/</g, '\\u003c');
