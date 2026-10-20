import { eventInstant, formatPrice } from './format.mjs';

// One source for the downloadable file and development content variants.
export function createEventCalendar(event, stamp = new Date()) {
  const escape = value => value.replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
  const calendarStamp = value => value.replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const start = eventInstant(event.dateISO, event.startTime, event.timezone);
  const end = eventInstant(event.dateISO, event.endTime, event.timezone);
  const timedCalendar = Boolean(start && end);
  const followingDay = new Date(`${event.dateISO}T12:00:00Z`);
  followingDay.setUTCDate(followingDay.getUTCDate() + 1);
  const lines = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Welzijnswerking Oostende//Kerstavond//NL',
    'CALSCALE:GREGORIAN', 'BEGIN:VEVENT', `UID:kerst${event.year}@welzijnswerking.be`,
    `DTSTAMP:${calendarStamp(stamp.toISOString())}`,
    ...(timedCalendar
      ? [`DTSTART:${calendarStamp(start)}`, `DTEND:${calendarStamp(end)}`]
      : [`DTSTART;VALUE=DATE:${event.dateISO.replaceAll('-', '')}`, `DTEND;VALUE=DATE:${followingDay.toISOString().slice(0, 10).replaceAll('-', '')}`]),
    `SUMMARY:${escape(`Kerstavond — ${event.organizerName}`)}`,
    `LOCATION:${escape(`${event.placeName}, ${event.address}`)}`,
    `DESCRIPTION:${escape(`Feestelijk meergangendiner voor ${formatPrice(event.price)} per persoon. ${event.registrationMethod ? `${event.registrationMethod}. ` : ''}Raadpleeg welzijnswerking.be voor de laatste praktische informatie. Deze agendaherinnering is geen inschrijving.`)}`,
    'TRANSP:TRANSPARENT', 'END:VEVENT', 'END:VCALENDAR',
  ];
  // iCalendar folds at 75 UTF-8 bytes, including the continuation space.
  const calendar = lines.map(line => {
    let result = '', bytes = 0;
    for (const char of line) {
      const size = new TextEncoder().encode(char).length;
      if (bytes + size > 75) { result += '\r\n '; bytes = 1; }
      result += char;
      bytes += size;
    }
    return result;
  }).join('\r\n') + '\r\n';
  return { calendar, timedCalendar, filename: `kerstavond-oostende-${event.year}.ics` };
}
