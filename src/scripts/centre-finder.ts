import centrePhotos from '../data/centre-photos.json';

export function setupCentreFinder() {
  const root = document.querySelector<HTMLElement>('[data-centre-finder]');
  if (!root) return;
  const picker = root.querySelector<HTMLElement>('[data-district-picker]')!;
  const select = root.querySelector<HTMLSelectElement>('[data-district-select]')!;
  const buttons = [...root.querySelectorAll<HTMLButtonElement>('[data-district]')];
  const cards = [...root.querySelectorAll<HTMLElement>('[data-centre-district]')];
  const title = root.querySelector<HTMLElement>('[data-results-title]')!;
  const count = root.querySelector<HTMLElement>('[data-results-count]')!;
  const status = root.querySelector<HTMLElement>('[data-results-status]')!;
  const all = root.querySelector<HTMLButtonElement>('[data-show-all]')!;
  const showMap = root.querySelector<HTMLButtonElement>('[data-show-map]')!;
  const map = root.querySelector<HTMLDetailsElement>('[data-centre-map]')!;

  const photo = root.querySelector<HTMLElement>('[data-centre-photo]')!;
  const photoImage = photo.querySelector<HTMLImageElement>('[data-centre-photo-image]')!;
  const photoSource = photo.querySelector<HTMLAnchorElement>('[data-centre-photo-source]')!;
  const defaultPhoto = { src: photoImage.getAttribute('src')!, alt: photoImage.alt };
  const mobileSlot = root.querySelector<HTMLElement>('[data-centre-photo-slot]')!;
  const photoHeading = root.querySelector<HTMLElement>('.centres-heading')!;
  const widePhoto = window.matchMedia('(min-width: 1001px)');
  const placePhoto = () => (widePhoto.matches ? photoHeading : mobileSlot).append(photo);
  placePhoto();
  widePhoto.addEventListener('change', placePhoto);
  let photoRequest = 0;
  let selectedPhoto: string | null = null;
  const showPhoto = async (id: string | null) => {
    const token = ++photoRequest;
    selectedPhoto = id;
    photo.setAttribute('aria-busy', 'true');
    const entry = id ? centrePhotos[id as keyof typeof centrePhotos] : undefined;
    const target = entry || defaultPhoto;
    try {
      const incoming = new Image();
      incoming.src = target.src;
      await incoming.decode();
      if (token !== photoRequest) return;
      photoImage.hidden = false;
      photoImage.src = target.src;
      photoImage.alt = target.alt;
      photo.dataset.selectedCentre = entry ? id! : '';
      photoSource.hidden = !entry;
      if (entry) {
        photoSource.href = entry.sourceUrl;
        photoSource.textContent = `${entry.name} · Foto: ${entry.credit}`;
        photoSource.setAttribute('aria-label', `Foto van ${entry.name}, bron ${entry.credit} (nieuw tabblad)`);
      } else {
        photoSource.removeAttribute('href');
        photoSource.textContent = '';
      }
    } catch {
      // A missing centre photo must never leave a broken or mismatched image.
      if (token === photoRequest) {
        if (entry) void showPhoto(null);
        else { photoImage.hidden = true; photoSource.hidden = true; }
      }
    } finally {
      if (token === photoRequest) photo.setAttribute('aria-busy', 'false');
    }
  };
  cards.forEach(card => {
    const details = card.querySelector<HTMLDetailsElement>('.centre-detail')!;
    details.querySelector<HTMLElement>(':scope > summary')!.addEventListener('click', () => {
      if (!details.open) void showPhoto(card.dataset.centreId!);
      else if (selectedPhoto === card.dataset.centreId) void showPhoto(null);
    });
  });
  root.addEventListener('centre-selected', event => {
    const id = (event as CustomEvent<{ id: string }>).detail.id;
    if (id in centrePhotos) void showPhoto(id);
  });

  let lastDistrict = buttons[0].dataset.district!;
  const choose = (district: string, announce = true) => {
    const visible = cards.filter(card => district === 'all' || card.dataset.centreDistrict === district);
    if (!visible.length) return;
    select.value = district;
    if (district !== 'all') lastDistrict = district;
    root.dataset.centreView = district === 'all' ? 'all' : 'district';
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.district === district)));
    cards.forEach(card => {
      card.hidden = !visible.includes(card);
      // A district starts with its first centre expanded; the others stay compact.
      card.querySelector<HTMLDetailsElement>('.centre-detail')!.open = card === visible[0];
      card.querySelectorAll<HTMLDetailsElement>('.centre-practical, .centre-desk-hours').forEach(details => { details.open = false; });
    });
    const heading = district === 'all' ? 'Alle ontmoetingscentra' : `In ${district}`;
    title.textContent = heading;
    const quantity = `${visible.length} ${visible.length === 1 ? 'ontmoetingscentrum' : 'ontmoetingscentra'}`;
    count.textContent = district === 'all' ? `${quantity} in Oostende` : quantity;
    if (announce) {
      status.textContent = `${heading}: ${quantity}.`;
      void showPhoto(district === 'all' ? null : visible[0].dataset.centreId!);
    }
    all.textContent = district === 'all' ? 'Terug naar wijkkeuze' : 'Bekijk alle 9 centra';
    all.dataset.showingAll = String(district === 'all');
  };
  buttons.forEach(button => button.addEventListener('click', () => choose(button.dataset.district!)));
  select.addEventListener('change', () => choose(select.value));
  all.addEventListener('click', () => choose(all.dataset.showingAll === 'true' ? lastDistrict : 'all'));
  const mapContainer = root.querySelector<HTMLElement>('.centre-finder-map')!;
  map.addEventListener('toggle', () => {
    showMap.setAttribute('aria-expanded', String(map.open));
    if (!map.open) {
      showMap.focus({ preventScroll: true });
      mapContainer.hidden = true;
    }
  });
  showMap.addEventListener('click', () => {
    const firstVisible = cards.find(card => !card.hidden);
    const centreId = firstVisible?.querySelector<HTMLElement>('[data-centre-hours]')?.dataset.centreHours;
    const mapChoice = map.querySelector<HTMLSelectElement>('[data-map-choice]');
    if (centreId && mapChoice) {
      mapChoice.value = centreId;
      mapChoice.dispatchEvent(new Event('change'));
    }
    mapContainer.hidden = false;
    map.open = true;
    showMap.setAttribute('aria-expanded', 'true');
    const summary = map.querySelector<HTMLElement>('summary')!;
    summary.focus({ preventScroll: true });
    summary.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
  });
  // Filtering never hides the focused element, and focus stays with the user's control.
  root.classList.add('centre-finder-enhanced');
  choose(buttons[0].dataset.district!, false);
  picker.hidden = all.hidden = showMap.hidden = false;
  mapContainer.hidden = !map.open;
}
