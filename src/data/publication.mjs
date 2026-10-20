import { existsSync } from 'node:fs';
import { resolve, sep } from 'node:path';
const publicRoot = resolve(process.cwd(), 'public');
/** @param {unknown} value */
export function safeWebsite(value) {
  if (typeof value !== 'string') return null;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password ? url.href : null;
  } catch { return null; }
}
/** @param {unknown} value */
export function hasLocalImage(value) {
  if (typeof value !== 'string' || !value.startsWith('/images/')) return false;
  if (!/\.(webp|avif|png|jpe?g|svg)$/i.test(value)) return false;
  const path = resolve(publicRoot, value.slice(1));
  return path.startsWith(`${publicRoot}${sep}images${sep}`) && existsSync(path);
}
/** @param {{publish: boolean, permissionReceived: boolean, src: string, year: number, alt: string, credit: string, permissionEvidence: string}[]} photos */
export function publishedPhotos(photos) {
  return photos.filter(photo => photo.publish === true && photo.permissionReceived === true &&
    Number.isInteger(photo.year) && photo.year >= 1990 && photo.year < 2026 &&
    photo.alt?.trim().length > 0 && photo.credit?.trim().length > 0 && photo.permissionEvidence?.trim().length > 0 &&
    photo.src.startsWith('/images/event/') && hasLocalImage(photo.src));
}
/** @param {{confirmedFor2026: boolean, logoUsageApproved: boolean, verified: boolean, logo: string, tier: string, displayOrder: number}[]} sponsors */
export function publishedSponsors(sponsors) {
  return sponsors.filter(sponsor => sponsor.confirmedFor2026 === true && sponsor.logoUsageApproved === true &&
    sponsor.verified === true && ['main', 'partner', 'support', 'in_kind'].includes(sponsor.tier) &&
    sponsor.logo.startsWith('/images/sponsors/') && hasLocalImage(sponsor.logo)).sort((a, b) => a.displayOrder - b.displayOrder);
}
/** @param {string} status @param {string | null} url */
export function ticketState(status, url) {
  if (status === 'available' && safeWebsite(url)) return { label: 'Reserveer je plaats', url: safeWebsite(url) };
  if (status === 'sold_out') return { label: 'Het kerstfeest is uitverkocht.', url: null };
  if (status === 'closed') return { label: 'De inschrijvingen zijn afgesloten.', url: null };
  return { label: 'Info over deelname volgt binnenkort.', url: null };
}
