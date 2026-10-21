import { getCentreHours } from './centre-hours';

interface MeetingCentre {
  id: string;
  name: string;
  district: string;
  streetAddress: string;
  postalCode: string;
  city: string;
  phone: string;
  officialUrl: string;
  verifiedOn: string;
  latitude: number;
  longitude: number;
}

export const meetingCentresOverviewUrl = 'https://www.oostende.be/ontmoeten';

// General contact details from the individual Stad Oostende centre pages.
// These sources do not confirm registration dates or arrangements for the event.
const centres: MeetingCentre[] = [
  { id: 'de-boeie', latitude: 51.230526221703514, longitude: 2.9197172154873416, name: 'De Boeie', district: 'Centrum', streetAddress: 'Kerkstraat 35', phone: '059 25 91 07', officialUrl: 'https://www.oostende.be/ontmoetingscentrum-de-boeie-ldc' },
  { id: 'oud-hospitaal', latitude: 51.22452626672727, longitude: 2.912595585026947, name: 'Oud Hospitaal', district: 'Centrum', streetAddress: 'Amsterdamstraat 61', phone: '059 25 90 93', officialUrl: 'https://www.oostende.be/ontmoetingscentrum-oud-hospitaal' },
  { id: 'schaperye', latitude: 51.21487809723383, longitude: 2.936138468672287, name: 'Schaperye', district: 'Konterdam', streetAddress: 'Steenovenstraat 86', phone: '059 25 91 00', officialUrl: 'https://www.oostende.be/ontmoetingscentrum-schaperye-ldc' },
  { id: 'viooltje', latitude: 51.21271549142237, longitude: 2.880138324187501, name: '’t Viooltje', district: 'Mariakerke', streetAddress: 'Violierenlaan 3b', phone: '059 25 90 83', officialUrl: 'https://www.oostende.be/ontmoetingscentrum-viooltje' },
  { id: 'ter-yde', latitude: 51.20756124900735, longitude: 2.8631846482065813, name: 'Ter Yde', district: 'Raversijde', streetAddress: 'Duinenstraat 172', phone: '059 25 90 80', officialUrl: 'https://www.oostende.be/ontmoetingscentrum-ter-yde' },
  { id: 'de-blomme', latitude: 51.21072633881599, longitude: 2.9173420685604383, name: 'De Blomme', district: 'Stene', streetAddress: 'Chrysantenstraat 30', phone: '059 25 91 13', officialUrl: 'https://www.oostende.be/ontmoetingscentrum-de-blomme' },
  { id: 'de-ballon', latitude: 51.23451229216419, longitude: 2.9466180234227903, name: 'De Ballon', district: 'Vuurtorenwijk', streetAddress: 'Mansveldstraat 9', phone: '059 25 91 20', officialUrl: 'https://www.oostende.be/ontmoetingscentrum-de-ballon' },
  { id: 'de-schelpe', latitude: 51.21554720850705, longitude: 2.893531779287314, name: 'De Schelpe', district: 'Westerkwartier', streetAddress: 'Elisabethlaan 32', phone: '059 25 90 70', officialUrl: 'https://www.oostende.be/ontmoetingscentrum-de-schelpe-ldc' },
  { id: 'kasteeltje', latitude: 51.20233302837124, longitude: 2.9765052268247203, name: '’t Kasteeltje', district: 'Zandvoorde', streetAddress: 'Kasteelstraat 22b', phone: '059 25 91 27', officialUrl: 'https://www.oostende.be/ontmoetingscentrum-t-kasteeltje' },
].map(centre => ({ ...centre, postalCode: '8400', city: 'Oostende', verifiedOn: '2026-10-20' }));

export const meetingCentres = centres.map(centre => {
  const address = `${centre.streetAddress}, ${centre.postalCode} ${centre.city}`;
  return {
    ...centre,
    ...getCentreHours(centre.id),
    address,
    phoneHref: `tel:${centre.phone.replace(/\s/g, '')}`,
    routeUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`Ontmoetingscentrum ${centre.name}, ${address}`)}`,
  };
});
