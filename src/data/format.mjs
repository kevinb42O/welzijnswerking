export const formatEventDate = (date, timezone) => new Intl.DateTimeFormat('nl-BE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: timezone }).format(new Date(`${date}T12:00:00Z`));
export const formatPrice = value => `€ ${value.toLocaleString('nl-BE')}`;

// Convert the confirmed local event time to an instant, respecting Brussels winter/summer time.
export function eventInstant(date, time, timezone) {
  const match = /^(\d{1,2})[.:](\d{2})(?: uur)?$/.exec(time || '');
  if (!match || Number(match[1]) > 23 || Number(match[2]) > 59) return null;
  const wallTime = Date.parse(`${date}T${match[1].padStart(2, '0')}:${match[2]}:00Z`);
  if (!Number.isFinite(wallTime)) return null;
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: timezone, year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
  });
  let instant = wallTime;
  for (let i = 0; i < 2; i++) {
    const parts = Object.fromEntries(formatter.formatToParts(instant).map(part => [part.type, part.value]));
    const local = Date.parse(`${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}Z`);
    instant += wallTime - local;
  }
  return new Date(instant).toISOString();
}
