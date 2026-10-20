import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
// References with unconfirmed reuse rights: development only, never emitted in production.
const files = ['2018-kw-vrijwilligers.jpg', '2016-kw-kerstman.jpg', '2019-kw-aankondiging.jpg', '2025-kw-organisatie-aankondiging.jpg', '2025-kw-vrijwilligers.jpg', '2019-focus-origineel.jpg', '2025-vrijwilligers-videostill.jpg', '2025-vrijwilligers-videostill-2.png', '2025-aankondiging-stefaan-reuse.jpg'];
export function getStaticPaths() {
  return import.meta.env.DEV ? files.map(file => ({ params: { file } })) : [];
}
/** @type {import('astro').APIRoute} */
export const GET = ({ params }) => {
  if (!import.meta.env.DEV || !params.file || !files.includes(params.file)) return new Response(null, { status: 404 });
  const bytes = readFileSync(resolve('assets/fotos-vorige-edities/onderzoek-2026-10-20', params.file));
  return new Response(new Uint8Array(bytes), { headers: { 'Content-Type': params.file.endsWith('.png') ? 'image/png' : 'image/jpeg', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' } });
};
