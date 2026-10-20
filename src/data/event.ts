import source from '../../data/inhoud_2026.json';
import { formatEventDate, formatPrice } from './format.mjs';
export type TicketStatus = 'not_confirmed' | 'available' | 'sold_out' | 'closed';
export const event = {
  year: source.event.year,
  dateISO: source.event.date,
  timezone: source.event.timezone,
  title: source.event.title,
  intro: source.event.intro,
  subtitle: source.event.subtitle,
  placeName: source.event.venueName,
  address: source.event.venueAddress,
  price: source.event.priceEuro,
  currency: 'EUR',
  mealDescription: source.event.meal,
  organizerName: source.brand.name,
  startTime: source.event.eventStartTime as string | null,
  endTime: source.event.endTime as string | null,
  doorsTime: source.event.doorsOpenTime as string | null,
  eligibility: source.event.eligibilityRules as string | null,
  room: source.event.room as string | null,
  courseCount: source.event.courseCount as number | null,
  includedDrinks: source.event.drinksIncluded as string | null,
  menu: source.event.menuItems as string[],
  ticketsUrl: source.event.ticketUrl as string | null,
  ticketStatus: source.event.ticketSalesStatus as TicketStatus,
  ticketsInfoText: source.event.ticketsInfoText,
  organizerContactEmail: source.brand.organizationContactEmail as string | null,
  phone: source.brand.organizationContactPhone as string | null,
  accessibilityDetails: source.event.accessibilitySpecifics as string | null,
  transportDetails: source.event.transportSpecifics as string | null,
  entertainmentDetails: source.event.entertainmentDetails as string | null,
  volunteerInfo: source.event.volunteerSignupUrl as string | null,
};
export const eventDate = formatEventDate(event.dateISO, event.timezone);
export const price = formatPrice(event.price);
export const images = source.images;
export const organization = source.brand;
export const routeUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${event.placeName}, ${event.address}`)}`;
export const accessibilityUrl = 'https://www.kursaaloostende.be/nl/praktisch/bereikbaarheid';
// Historische onderzoeksgegevens blijven gescheiden en worden niet als 2026-inhoud gerenderd.
export const historicalFacts = source.history;
