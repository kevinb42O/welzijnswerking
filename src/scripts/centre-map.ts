import { meetingCentres } from '../data/meeting-centres';
import type { Map as LeafletMap, Marker } from 'leaflet';

export function setupCentreMap() {
  const root = document.querySelector<HTMLDetailsElement>('[data-centre-map]');
  if (!root) return;
  const canvas = root.querySelector<HTMLElement>('[data-map-canvas]')!;
  const status = root.querySelector<HTMLElement>('[data-map-status]')!;
  const choice = root.querySelector<HTMLSelectElement>('[data-map-choice]')!;
  const reset = root.querySelector<HTMLButtonElement>('[data-map-reset]')!;
  let map: LeafletMap | undefined;
  let loading = false;
  const markers: Marker[] = [];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const narrow = window.matchMedia('(max-width: 767px)');
  const bounds = meetingCentres.map(c => [c.latitude, c.longitude] as [number, number]);
  const overview = () => map?.fitBounds(bounds, { padding: [28, 28], maxZoom: 13, animate: !reduced.matches });
  const select = (id: string, pan = true) => {
    const index = meetingCentres.findIndex(c => c.id === id);
    const centre = meetingCentres[index];
    if (!centre) return;
    choice.value = centre.id;
    if (pan) root.dispatchEvent(new CustomEvent('centre-selected', { bubbles: true, detail: { id: centre.id } }));
    const setText = (name: string, value: string) => { root.querySelector<HTMLElement>(`[data-map-${name}]`)!.textContent = value; };
    setText('number', String(index + 1));
    setText('name', centre.name);
    setText('district', centre.district);
    setText('street', centre.streetAddress);
    setText('phone-text', centre.phone);
    const hours = root.querySelector<HTMLElement>('[data-map-hours]')!;
    if (hours.dataset.hoursCentre !== centre.id) {
      const source = document.querySelector<HTMLElement>(`[data-centre-hours="${centre.id}"]`);
      if (source) {
        hours.replaceChildren(...[...source.childNodes].map(node => node.cloneNode(true)));
        hours.dataset.hoursCentre = centre.id;
        hours.querySelectorAll<HTMLDetailsElement>('details').forEach(details => { details.open = false; });
      }
    }
    for (const [name, url] of [['route', centre.routeUrl], ['phone', centre.phoneHref], ['info', centre.officialUrl]]) {
      const link = root.querySelector<HTMLAnchorElement>(`[data-map-${name}]`)!;
      link.href = url;
      link.setAttribute('aria-label', name === 'phone' ? `Bel ${centre.name}: ${centre.phone}` : name === 'route' ? `Route plannen naar ${centre.name} in Google Maps (nieuw tabblad)` : `Info bij Stad Oostende over ${centre.name} (nieuw tabblad)`);
    }
    markers.forEach((marker, i) => {
      const element = marker.getElement();
      element?.classList.toggle('is-selected', i === index);
      element?.setAttribute('aria-label', `${i + 1}. Toon ${meetingCentres[i].name}, ${meetingCentres[i].district}`);
      element?.setAttribute('aria-pressed', String(i === index));
      marker.setZIndexOffset(i === index ? 1000 : 0);
      marker.closeTooltip();
    });
    if (pan && map && !map.getBounds().pad(-0.12).contains([centre.latitude, centre.longitude])) {
      map.panTo([centre.latitude, centre.longitude], { animate: !reduced.matches });
    }
  };
  choice.addEventListener('change', () => select(choice.value));
  reset.addEventListener('click', overview);
  const load = async () => {
    if (map || loading || !root.open) return;
    loading = true;
    status.hidden = false;
    status.textContent = 'De kaart wordt geladen…';
    try {
      const L = await import('leaflet');
      map = L.map(canvas, {
        scrollWheelZoom: false, dragging: !narrow.matches, touchZoom: true,
        zoomSnap: .25, zoomDelta: .5,
        zoomControl: false, minZoom: 11, maxZoom: 18,
        maxBounds: [[51.13, 2.74], [51.32, 3.08]], maxBoundsViscosity: 1,
        fadeAnimation: !reduced.matches, zoomAnimation: !reduced.matches,
      });
      L.control.zoom({ position: 'topleft', zoomInTitle: 'Inzoomen', zoomOutTitle: 'Uitzoomen' }).addTo(map);
      map.attributionControl.setPrefix(false);
      const tiles = L.tileLayer('https://geo.api.vlaanderen.be/GRB/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=grb_bsk_grijs&STYLE=&FORMAT=image/png&TILEMATRIXSET=GoogleMapsVL&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}', {
        attribution: '&copy; <a href="https://www.vlaanderen.be/digitaal-vlaanderen/onze-diensten-en-platformen/basiskaart-vlaanderen-grb" target="_blank" rel="noopener noreferrer">Digitaal Vlaanderen · GRB</a>',
        maxZoom: 19, bounds: [[50.65, 2.5], [51.55, 5.95]],
      });
      let loaded = false;
      const loadingTimeout = window.setTimeout(() => {
        if (!loaded) { status.hidden = false; status.textContent = 'De achtergrondkaart laden duurt langer dan verwacht. Je kunt alvast een centrum kiezen of een route openen.'; }
      }, 10000);
      tiles.on('tileload', () => { loaded = true; window.clearTimeout(loadingTimeout); status.hidden = true; });
      tiles.on('tileerror', () => {
        if (!loaded) { status.hidden = false; status.textContent = 'De achtergrondkaart kan niet laden. Je kunt wel een centrum kiezen en een route openen.'; }
      });
      tiles.addTo(map);
      overview();
      meetingCentres.forEach((centre, index) => {
        const marker = L.marker([centre.latitude, centre.longitude], {
          icon: L.divIcon({ className: 'centre-map-marker', html: `<span data-number="${index + 1}">${index + 1}</span>`, iconSize: [44, 48], iconAnchor: [22, 44], tooltipAnchor: [0, -42] }),
          title: `${index + 1}. ${centre.name}, ${centre.district}`, alt: centre.name,
          keyboard: true, riseOnHover: true,
        }).addTo(map!);
        marker.bindTooltip(centre.name, { direction: 'top', className: 'centre-map-tooltip' });
        marker.on('click', () => select(centre.id));
        marker.getElement()?.setAttribute('aria-label', `${index + 1}. Toon ${centre.name}, ${centre.district}`);
        markers.push(marker);
      });
      // Separate nearby pins at small scales; fine leader lines retain their exact addresses.
      const leaders = L.layerGroup().addTo(map);
      const arrangeMarkers = () => {
        if (!map) return;
        leaders.clearLayers();
        const placed: { x: number; y: number }[] = [];
        markers.forEach((marker, index) => {
          const point = map!.latLngToLayerPoint(marker.getLatLng());
          let offset = 0;
          for (const candidate of [0, -48, 48, -96, 96, -144, 144]) {
            if (placed.every(other => Math.abs(other.x - point.x) >= 42 || Math.abs(other.y - (point.y + candidate)) >= 48)) {
              offset = candidate;
              break;
            }
          }
          placed.push({ x: point.x, y: point.y + offset });
          marker.setIcon(L.divIcon({ className: 'centre-map-marker', html: `<span data-number="${index + 1}">${index + 1}</span>`, iconSize: [44, 48], iconAnchor: [22, 44 - offset], tooltipAnchor: [0, -42 + offset] }));
          if (offset) {
            L.polyline([marker.getLatLng(), map!.layerPointToLatLng(point.add([0, offset]))], { color: '#273a7c', weight: 1.5, opacity: .65, interactive: false }).addTo(leaders);
            L.circleMarker(marker.getLatLng(), { radius: 3, color: '#273a7c', weight: 1, fillOpacity: 1, interactive: false }).addTo(leaders);
          }
        });
        select(choice.value, false);
      };
      arrangeMarkers();
      map.on('zoomend', arrangeMarkers);
      select(choice.value, false);
      markers.forEach(marker => marker.getElement()?.addEventListener('keydown', event => {
        if (event.key === ' ' || event.key === 'Enter') { event.preventDefault(); marker.fire('click'); }
      }));
      reset.hidden = false;
      // A native disclosure or text zoom can change size after initial creation.
      let lastWidth = canvas.clientWidth;
      new ResizeObserver(() => {
        if (!root.open || !canvas.clientWidth) return;
        map?.invalidateSize({ pan: false });
        if (canvas.clientWidth !== lastWidth) {
          lastWidth = canvas.clientWidth;
          overview();
          arrangeMarkers();
        }
      }).observe(canvas);
      narrow.addEventListener('change', () => { if (narrow.matches) map?.dragging.disable(); else map?.dragging.enable(); });
    } catch (error) {
      if (import.meta.env.DEV) console.error('Ontmoetingscentra: kaart initialiseren mislukt.', error);
      map?.remove();
      map = undefined;
      markers.length = 0;
      status.hidden = false;
      status.textContent = 'De kaart kan niet laden. Kies een centrum uit de lijst of probeer de kaart opnieuw te openen.';
    } finally { loading = false; }
  };
  root.addEventListener('toggle', () => {
    if (!root.open) return;
    if (map) { map.invalidateSize({ pan: false }); return; }
    void load();
  });
  void load();
}
