export interface HoursRow {
  days: string;
  hours: string[];
}

export const centreHoursCheckedOn = '2026-10-21';
export const centreHoursCheckedOnLabel = '21 oktober 2026';

// Checked individually against all nine official contact pages on 21 October 2026.
// Evidence: qa/centre-hours-2026-10-21/official-source-evidence.json.
// These are centre/service hours, not confirmed registration hours for our event.
const regularHours: HoursRow[] = [
  { days: 'Ma, wo, do en vr', hours: ['9.30–17.00 uur'] },
  { days: 'Dinsdag', hours: ['11.00–17.00 uur'] },
  { days: 'Zaterdag en zondag', hours: ['Gesloten'] },
];
const generalDeskHours: HoursRow[] = [
  { days: 'Ma, wo, do en vr', hours: ['10.00–12.00 uur', '14.00–16.00 uur'] },
  { days: 'Dinsdag', hours: ['11.00–12.00 uur', '14.00–16.00 uur'] },
];

// A null desk schedule means the source lists only service-specific counters.
// Meal/UiTpas counters are not presented as general or event-registration hours.
const sources: Record<string, { slug: string; generalDesk: boolean }> = {
  'de-boeie': { slug: 'oc-de-boeie', generalDesk: true },
  'oud-hospitaal': { slug: 'oc-oud-hospitaal', generalDesk: true },
  schaperye: { slug: 'ontmoetingscentrum-schaperye', generalDesk: true },
  viooltje: { slug: 'oc-t-viooltje', generalDesk: false },
  'ter-yde': { slug: 'oc-ter-yde', generalDesk: false },
  'de-blomme': { slug: 'oc-de-blomme', generalDesk: true },
  'de-ballon': { slug: 'oc-de-ballon', generalDesk: false },
  'de-schelpe': { slug: 'oc-de-schelpe', generalDesk: true },
  kasteeltje: { slug: 'oc-t-kasteeltje', generalDesk: true },
};

export function getCentreHours(id: string) {
  const source = sources[id];
  if (!source) throw new Error(`Missing verified opening hours for centre: ${id}`);
  return {
    openingHours: regularHours,
    deskHours: source.generalDesk ? generalDeskHours : null,
    hoursSourceUrl: `https://www.oostende.be/${source.slug}`,
    hoursVerifiedOn: centreHoursCheckedOn,
  };
}

// Common closure dates published by each of the nine sources; restricted to 2026.
export const centreClosureDates = [
  { date: '2026-11-01', label: '1 november' },
  { date: '2026-11-02', label: '2 november' },
  { date: '2026-11-11', label: '11 november' },
  { date: '2026-12-25', label: '25 december' },
  { date: '2026-12-26', label: '26 december' },
];
