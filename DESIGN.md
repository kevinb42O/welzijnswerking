---
name: "Welzijnswerking Oostende"
description: "Licht, rustig en leesbaar; neutrale oppervlakken en één sans-seriflettertype."
colors:
  page: "#fafaf9"
  surface: "#ffffff"
  surface-soft: "#f0f0ed"
  text: "#242424"
  text-muted: "#5e5e5a"
  action: "#292929"
  border: "#d5d5d0"
  control-border: "#969691"
  focus: "#245cb2"
  focus-on-dark: "#ffffff"
  overlay: "rgb(22 22 22 / .28)"
  overlay-clear: "rgb(22 22 22 / 0)"
  overlay-shadow: "rgb(22 22 22 / .12)"
  viewer-surface: "#181818"
  viewer-overlay: "rgb(15 15 15 / .96)"
  viewer-text: "#f5f5f3"
  viewer-border: "#505050"
  viewer-hover: "#303030"
  hero-base: "#302b26"
  hero-shade: "rgb(27 25 22 / .70)"
  hero-shade-edge: "rgb(27 25 22 / .76)"
  hero-label: "#f3f3ee"
  hero-copy: "#fffef8"
  action-line: "#a8a8a2"
  control-line: "#bdbdb7"
typography:
  display:
    fontFamily: "Public Sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "clamp(2.25rem, 9vw, 3.375rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-.025em"
  display-wide:
    fontFamily: "Public Sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "clamp(3.375rem, 5.5vw, 4.5rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-.025em"
  headline:
    fontFamily: "Public Sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "clamp(1.75rem,2.8vw,2.25rem)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-.02em"
  welcome-headline:
    fontFamily: "Public Sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "clamp(1.875rem, 3.2vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-.02em"
  title:
    fontFamily: "Public Sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "1.375rem"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-.02em"
  body:
    fontFamily: "Public Sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  body-compact:
    fontFamily: "Public Sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Public Sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: ".875rem"
    fontWeight: 400
    lineHeight: 1.6
  button:
    fontFamily: "Public Sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "1rem"
    fontWeight: 550
    lineHeight: 1.6
rounded:
  control: "6px"
  panel: "8px"
  menu: "22px"
  circle: "50%"
spacing:
  "4": "4px"
  "8": "8px"
  "12": "12px"
  "16": "16px"
  "20": "20px"
  "24": "24px"
  "28": "28px"
  "32": "32px"
  "36": "36px"
  "40": "40px"
  "48": "48px"
  "64": "64px"
  "72": "72px"
components:
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "{colors.page}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "12px 18px"
  button-inverse:
    backgroundColor: "{colors.page}"
    textColor: "{colors.action}"
    rounded: "{rounded.control}"
    padding: "12px 22px"
  participation-note:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.text}"
    rounded: "{rounded.panel}"
    padding: "24px"
  viewer:
    backgroundColor: "{colors.viewer-surface}"
    textColor: "{colors.viewer-text}"
    rounded: "{rounded.panel}"
    padding: "16px"
  viewer-control:
    backgroundColor: "transparent"
    textColor: "{colors.viewer-text}"
    rounded: "{rounded.control}"
    padding: "8px 16px"
  viewer-control-hover:
    backgroundColor: "{colors.viewer-hover}"
    textColor: "{colors.viewer-text}"
  mobile-menu:
    backgroundColor: "{colors.page}"
    textColor: "{colors.text}"
    rounded: "{rounded.menu}"
    padding: "24px"
  faq-indicator-open:
    backgroundColor: "{colors.action}"
    textColor: "{colors.page}"
    rounded: "{rounded.circle}"
    size: "30px"
  footer:
    backgroundColor: "{colors.page}"
    textColor: "{colors.text}"
    padding: "36px 0 20px"
---

# Design System: Welzijnswerking Oostende

## Overview

**Creative North Star: "Licht, rustig en leesbaar"**

De bevestigde richting is licht en rustig: neutraal wit, antraciet en één helder sans-seriflettertype. Leesbaarheid en duidelijke bediening dragen het vertrouwen, met ruimte voor fotografie en gewone Nederlandse taal. “Licht, rustig en leesbaar” is hier een beschrijvende samenvatting van die bevestigde richting, geen apart gekozen metafoor.

De pagina gebruikt rustige lichte vlakken, dunne scheidingslijnen en compacte functionele onderdelen. Het fotografische hero-oppervlak en de neutraal donkere foto-viewer zijn gerichte uitzonderingen op de lichte basis. De footer sluit compact aan op dezelfde paginaondergrond. Groen als oppervlak en decoratieve serif- of cursieve titels zijn expliciet afgewezen.

**Key Characteristics:**
- Eén lokaal gehoste Public Sans-familie voor koppen, tekst en bediening.
- Lichte neutrale vlakken, antraciete acties en dunne grijze scheidingen.
- Leesbare tekst, zichtbare focus en ruime aanraakvlakken.
- Een compacte doorlopende footer en een neutraal donkere foto-viewer.

Dit document beschrijft de geïmplementeerde gerichte verfijning van 20 oktober 2026. De bron is `src/styles/tokens.css`, `global.css`, `campaign.css` en de gebruikte Astro-componenten in `src/pages/index.astro`. `PRODUCT.md` en `plans/VISUELE_RICHTING_2026-10-20.md` leggen de bevestigde richting vast. De frontmatter bevat de normatieve waarden; de onderstaande tekst beschrijft hun toepassing. De sidecar bevat daarnaast gesynthetiseerde OKLCH-kleurstroken voor het paneel; deze zijn geen extra paletwaarden voor de website.

## Colors

Een ingetogen neutraal palet houdt informatie helder en laat kleur hoofdzakelijk uit de foto's komen.

### Primary

- **Antraciete actie** (`action`): primaire knoppen, interactief accent en geselecteerde FAQ-bediening.
- **Functioneel focusblauw** (`focus`): de zichtbare toetsenbordfocus op lichte ondergrond; geen decoratieve accentkleur.

### Neutral

- **Licht pagina-wit** (`page`) en **zuiver oppervlak-wit** (`surface`): de pagina, header en footer tegenover de witte verhaal- en geschiedenisvlakken.
- **Zacht neutraal grijs** (`surface-soft`): deelnamekaart, centrumlijst en historische erkenning.
- **Donker antraciet** (`text`) en **gedempt grijs** (`text-muted`): hoofdtekst tegenover toelichting en metadata.
- **Rustige scheidingslijn** (`border`): horizontale inhoudsscheidingen. `control-border`, `control-line` en `action-line` geven specifieke controls en de desktopactie hun contour.
- **Neutraal donker** (`viewer-surface`, `viewer-overlay`) en **licht viewer-wit** (`viewer-text`): foto-viewer en achterliggende verduistering. `viewer-border` en `viewer-hover` houden de bediening herkenbaar.
- **Doorzichtig donker** (`overlay`, `overlay-clear`, `overlay-shadow`): achtergrond, animatiestart en diffuse schaduw van het mobiele menu.
- **Warm fotografisch donker** (`hero-base`, `hero-shade`, `hero-shade-edge`): uitsluitend het bestaande fotografische hero-oppervlak. `hero-label` en `hero-copy` verzorgen de lichte tekst daarop.
- **Witte focus op donker** (`focus-on-dark`): focus op hero en viewer; het mobiele menu gebruikt de huidige tekstkleur voor zijn focusrand.

**The Neutral Surface Rule.** Gebruik de lichte neutrale oppervlakrollen voor de pagina en antraciet voor acties; de blauwe focuskleur dient de bediening.

## Typography

**Display Font:** Public Sans, met de systeem-sans-stack uit de frontmatter als fallback.  
**Body Font:** dezelfde Public Sans-familie, lokaal gehost als variabel WOFF2-lettertype.

**Character:** helder en direct, zonder decoratieve lettertypewisseling. Koppen zijn rechtop, doorgaans halfvet en licht aangespatieerd naar binnen; lopende tekst blijft normaal van gewicht.

### Hierarchy

- **Display**: de hero gebruikt `display` op mobiel en `display-wide` vanaf het eerste brede breakpoint; vanaf het grote desktopbreakpoint is de kop vast op de bovengrens van die schaal. De bron gebruikt hier eigen waarden in plaats van het ongebruikte algemene `--h1`-token.
- **Headline**: sectiekoppen gebruiken `headline`; de welkomstkop heeft de afzonderlijk vastgelegde `welcome-headline`-variant.
- **Title**: gewone tussenkoppen gebruiken `title`. Praktische rijen en fotobijschriften hebben kleinere, contextgebonden varianten; centrumnamen hebben een grotere lokale variant.
- **Body**: standaardtekst gebruikt `body`; inleiding en FAQ-antwoorden gebruiken `body-compact`. Verhaaltekst en tijdlijnparagrafen zijn waar ingesteld begrensd tot (65ch).
- **Label**: de `label`-rol beschrijft kleine gewone tekst zoals bronregels en bijschriften, niet een decoratieve bovenkop. Footer- en juridische metadata hebben compactere contextvarianten.
- **Button**: het normale actiegewicht is vastgelegd in `button`; de lichte heroactie gebruikt een rustiger lokaal gewicht.

Koppen gebruiken gebalanceerde regels; paragrafen krijgen `text-wrap: pretty` waar ondersteund. Behoud de volledige tekst bij zoom en smalle vensters.

**The One Family Rule.** Gebruik Public Sans voor koppen, lopende tekst en bediening; maak hiërarchie met grootte, gewicht en ruimte.

## Layout

De gecentreerde inhoudsbreedte heeft een maximum van (1200px). De zijmarges zijn (20px) op mobiel, (32px) vanaf (601px) en (48px) vanaf (1100px). De sectieruimte volgt dezelfde grenzen: (48px), (64px), (72px). De spacing-waarden in de frontmatter zijn herhaalde bouwstenen uit de implementatie, geen verplichte universele rastereenheid.

Inhoud stapelt op smalle schermen. Vanaf (768px) ontstaan twee kolommen voor onder meer praktische informatie, verhaal, centrumlijst en archiefintroducties. Het eventfotoarchief gaat dan van twee naar drie kolommen; de optionele galerij heeft daarnaast aantalsafhankelijke rijen vanaf (601px). De desktopnavigatie verschijnt vanaf (1001px), met een bijbehorende JavaScript-grens. Houd beide gelijk bij wijzigingen.

De footer gebruikt eerst twee inhoudskolommen, met de identiteit erboven, en vanaf (768px) drie kolommen. Onder (360px) stapelt de inhoud opnieuw. De footer blijft onderdeel van het lichte paginavlak, met een bovenlijn en een kleine juridische afsluiting.

## Elevation & Depth

De gewone inhoud is vlak: scheidingslijnen en lichte oppervlakverschillen maken groepen herkenbaar. De fotografie draagt de visuele diepte in de hero. Alleen het mobiele navigatievenster heeft een expliciete diffuse schaduw; de foto-viewer gebruikt een donkere achtergrond zonder decoratieve schaduw.

### Shadow Vocabulary

- **Mobiel navigatievenster**: (`box-shadow: 0 32px 100px var(--overlay-shadow)`). De backdrop gebruikt daarnaast (`backdrop-filter: blur(14px)`). Deze overlaybehandeling hoort bij het modale menu.

Menu- en detailovergangen gebruiken de bestaande korte duurwaarden en reveal-curve in de sidecar. De globale reduced-motion-regel verwijdert animaties en transitions en schakelt vloeiend scrollen uit.

**The Quiet Depth Rule.** Houd gewone inhoud vlak; reserveer de diffuse schaduw en achtergrondvervaging voor het mobiele navigatievenster.

## Shapes

Controls hebben een kleine hoekafronding (`control`), deelnamekaart en viewer een iets ruimere (`panel`), en het mobiele menu een uitgesprokener (`menu`). De FAQ- en centrumindicatoren zijn cirkels (`circle`) met een uit CSS-lijnen opgebouwd plus/minteken. Fotokaders blijven eenvoudig en rechthoekig; fotoarchieven gebruiken voornamelijk een liggende verhouding. Randen zijn dun en functioneel, zonder sierkaders.

## Components

### Buttons

Rustige, duidelijk herkenbare acties. De primaire actie gebruikt antraciet met lichte tekst en de `button-primary`-tokens; minimale hoogte (50px). De hero gebruikt de lichte `button-inverse`-variant. Hover verhoogt de helderheid licht en onderstreept de tekst; active verlaagt de helderheid. Zichtbare focus is een omlijning van (3px) met een afstand van (5px), wit op hero en viewer.

### Text links

Een onderstreept label met een bruikbaar aanraakvlak van minimaal (44px) hoog. Hover verdikt de onderstreping. Telefoon-, route- en informatieacties blijven tekstlinks; hun betekenis komt uit het label.

### Cards / Containers

De deelnamekaart is het zachte neutrale vlak met dunne rand, `panel`-afronding en de padding uit `participation-note`. Centrumgegevens zijn open rijen met een bovenlijn, geen afzonderlijke zwevende kaarten. Voer geen algemene schaduwkaart in op basis van de menu-overlay.

### Disclosures

De FAQ gebruikt native `details`/`summary`, gescheiden door lijnen en met een ronde indicator. De indicator vult antraciet wanneer open; de verticale lijn draait weg. De centrumlijst heeft een eigen groter disclosure met dezelfde lijnentaal. De samenvattingen bieden ruime volledige klikvlakken; de inhoud blijft leesbaar zonder JavaScript. Het exclusieve FAQ-gedrag is ook voor oudere browsers aangevuld.

### Navigation

De header is licht, met het compacte tweeregelige woordmerk. Desktoplinks krijgen bij hover een fijne lijn; de praktische actie heeft een omlijnd vlak dat bij hover donker vult. Op mobiel opent een native dialog met grote tekstlinks, een zichtbare sluitactie en behoud van toetsenbordfocus en scrollpositie. Zonder JavaScript blijft een gewone navigatielijst beschikbaar.

### Photo viewer

Een native dialog op `viewer-surface`, met een bijna dekkende neutraal donkere backdrop en lichte tekst. Bedieningsknoppen hebben de `viewer-control`-vorm, een dunne rand, hover/active-vulling en witte focus. De afbeelding gebruikt `object-fit: contain`; caption, laadstatus en foutmelding krijgen eigen ruimte. Vorige/volgende, pijltjestoetsen, Escape, focusherstel en scrollherstel horen bij het component. Onderliggende fotolinks blijven bruikbaar zonder JavaScript.

### Footer

Een compacte lichte afsluiting met hetzelfde woordmerk, een terug-naar-bovenlink, navigatie en verenigingsgegevens. Een dunne lijn scheidt de juridische onderrand. De bron heeft gerichte mobiele en desktopspacing; de frontmatter beschrijft de mobiele basis. De afsluiting introduceert geen extra grote slogan of contrasterend merkvlak.

Er zijn geen eigen invoervelden of chips op de publieke pagina; dit document schrijft daarvoor geen verzonnen varianten voor. De sidecar toont representatieve HTML/CSS-uitsneden van bestaande componenten; frameworkgedrag en foto-assets worden daarmee niet nagebouwd.

## Do's and Don'ts

### Do:
- **Do** gebruik de bestaande lichte oppervlakrollen en antraciete acties.
- **Do** houd tekstlinks herkenbaar door onderstreping en geef alle bediening zichtbare toetsenbordfocus.
- **Do** behoud de leesbare tekstgroottes, regelafstand en responsieve ruimte; controleer ook tekstvergroting.
- **Do** houd de footer compact, met dezelfde ondergrond als de pagina en leesbare navigatie- en verenigingsgegevens.
- **Do** geef archiefbeelden een zichtbaar editiejaar, bron en beschrijving; behoud hun beeldverhouding in de viewer.
- **Do** respecteer reduced motion en behoud bruikbare links en inhoud zonder JavaScript.

### Don't:
- **Don't** herstel groene oppervlakvlakken of decoratieve serif- en cursieve titels.
- **Don't** verander de foto-viewer in een gekleurd decoratief kader; gebruik de neutraal donkere rollen.
- **Don't** gebruik focusblauw als decoratief merkaccent.
- **Don't** maak van de kleine bestaande tekstlabels boven titels een nieuw herbruikbaar kickerpatroon.
- **Don't** leid een perfecte esthetische score of volledige toegankelijkheidscertificering af uit deze documentatie of automatische checks.

Niet gecanoniseerd: de bestaande kleine labels boven de hero- en menutitel en de retorische labels in de feitenstrook zijn overgeërfde pagina-inhoud; ze vormen geen nieuw voorschrift voor decoratieve kickers. Dit document verandert geen UI en bevestigt geen esthetische 20/20-score. Screenshotbewijs onder `qa/neutral-design-2026-10-20/` onderbouwt de gerichte verfijning; enkele tekstregels kunnen na die captures zijn bijgewerkt, dus de huidige bron blijft leidend.
