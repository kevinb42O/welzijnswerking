import type { APIRoute } from 'astro';
import { event } from '../data/event';
import { createEventCalendar } from '../data/calendar.mjs';

export function getStaticPaths() {
  return [{ params: { year: String(event.year) } }];
}

export const GET: APIRoute = () => {
  const { calendar, filename } = createEventCalendar(event);
  return new Response(calendar, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
};
