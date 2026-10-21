---
name: "Welzijnswerking Oostende"
description: "Warme Oostendse uitnodiging met Cooper Hewitt, zachte oppervlakken en echte fotografie."
colors:
  page: "#fdfbf7"
  surface: "#fdfbf7"
  surface-soft: "#f3efe7"
  brand: "#273a7c"
  accent: "#187ac9"
  link: "#2369a2"
  action-hover: "#1c2b60"
  surface-tint: "#ede3d2"
  text: "#343936"
  text-muted: "#646760"
  action: "#273a7c"
  border: "#dddcd4"
  control-border: "#7d8ba2"
  focus: "#2369a2"
  focus-on-dark: "#ffffff"
  overlay: "rgb(30 29 27 / .22)"
  overlay-clear: "rgb(30 29 27 / 0)"
  overlay-shadow: "rgb(30 29 27 / .12)"
  viewer-surface: "#181818"
  viewer-overlay: "rgb(15 15 15 / .96)"
  viewer-text: "#f5f5f3"
  viewer-border: "#858585"
  viewer-hover: "#363636"
  viewer-control: "#242424"
  hero-base: "#2b241e"
  hero-shade: "rgb(30 26 22 / .70)"
  hero-shade-edge: "rgb(30 26 22 / .80)"
  hero-label: "#f8f3eb"
  hero-copy: "#ffffff"
  action-line: "#7d8ba2"
  control-line: "#7d8ba2"
typography:
  display:
    fontFamily: "Cooper Hewitt, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "clamp(1.5rem, 6vw, 1.875rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-.015em"
  display-wide:
    fontFamily: "Cooper Hewitt, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "2.25rem"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-.015em"
  invitation:
    fontFamily: "Cooper Hewitt, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "clamp(2rem, 9.7vw, 3.5rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-.015em"
  invitation-wide:
    fontFamily: "Cooper Hewitt, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "clamp(4rem, 5.8vw, 5rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-.015em"
  headline:
    fontFamily: "Cooper Hewitt, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "clamp(1.75rem,2.8vw,2.25rem)"
    fontWeight: 600
    lineHeight: 1.18
    letterSpacing: "-.02em"
  welcome-headline:
    fontFamily: "Cooper Hewitt, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "clamp(1.875rem, 3.2vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-.02em"
  title:
    fontFamily: "Cooper Hewitt, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "1.375rem"
    fontWeight: 500
    lineHeight: 1.18
    letterSpacing: "-.015em"
  body:
    fontFamily: "Cooper Hewitt, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.7
  body-compact:
    fontFamily: "Cooper Hewitt, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Cooper Hewitt, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: ".875rem"
    fontWeight: 400
    lineHeight: 1.6
  button:
    fontFamily: "Cooper Hewitt, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.7
rounded:
  control: "10px"
  panel: "16px"
  menu: "20px"
  photo: "12px"
  welcome-photo: "12px 32px 12px 12px"
  archive-lead: "32px 12px 12px 12px"
  archive-lead-wide: "48px 12px 12px 12px"
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
  button-primary-hover:
    backgroundColor: "{colors.action-hover}"
    textColor: "{colors.page}"
  button-inverse:
    backgroundColor: "{colors.page}"
    textColor: "{colors.action}"
    rounded: "{rounded.control}"
    padding: "12px 22px"
  participation-note:
    backgroundColor: "{colors.surface-tint}"
    textColor: "{colors.text}"
    rounded: "{rounded.panel}"
    padding: "28px"
  viewer:
    backgroundColor: "{colors.viewer-surface}"
    textColor: "{colors.viewer-text}"
    rounded: "{rounded.panel}"
    padding: "16px"
  viewer-control:
    backgroundColor: "{colors.viewer-control}"
    textColor: "{colors.viewer-text}"
    rounded: "{rounded.control}"
    padding: "8px 16px"
  viewer-control-hover:
    backgroundColor: "{colors.viewer-hover}"
    textColor: "{colors.viewer-text}"
  mobile-menu:
    backgroundColor: "{colors.page}"
    textColor: "{colors.brand}"
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

De gebruiker heeft de Oostendse huisstijl op 20 oktober 2026 verfijnd naar een warmere, organischere uitnodiging: warme lichte oppervlakken, koppen in gewone schrijfwijze en echte mensen vroeg in de pagina. Donkerblauw blijft herkenbaar in identiteit, acties en alle hoofdsectiekoppen; tekstlinks behouden hun eigen leesbare blauw. Cooper Hewitt verbindt alle tekstrollen. “Licht, rustig en leesbaar” blijft de beschrijvende samenvatting van deze bevestigde richting.

Zachte hoeken, dunne scheidingslijnen en afwisselende fotocomposities geven de inhoud een natuurlijker ritme. De fotografische hero en de neutraal donkere foto-viewer zijn gerichte uitzonderingen op de lichte basis. De footer sluit compact aan op dezelfde paginaondergrond. Groen als oppervlak en decoratieve serif- of cursieve titels blijven expliciet afgewezen.

**Key Characteristics:**
- Eén lokaal gehoste Cooper Hewitt-familie voor koppen, tekst en bediening.
- Warme lichte vlakken, donkerblauwe sectiekoppen, gerichte blauwe accenten en dunne scheidingen.
- Leesbare tekst, zachte hoeken, zichtbare focus en ruime aanraakvlakken.
- Een compacte doorlopende footer en een neutraal donkere foto-viewer.

Dit document beschrijft de goedgekeurde organische verfijning van de Oostendse wereld op 20 oktober 2026. Bronnen zijn `src/styles/{tokens,global,campaign,motion}.css` en de gebruikte Astro-componenten; richting en review staan in `qa/organic-2026-10-20/`. De frontmatter bevat de normatieve waarden; de sidecar vult componentuitsneden, motion en metadata aan. Fontbronnen en licentie staan in `public/fonts/FONT_SOURCES.md`. Het eigen woordmerk blijft de afzender; er is geen stadslogo of penseelstreek toegevoegd.

## Colors

De sidecar bevat afgeleide OKLCH-kleurstroken voor de ontwerpweergave. Deze zijn uitsluitend presentatiehulpen; de frontmatter en CSS-tokens blijven de paletbron.

Warme papier- en zandtinten verzachten de bevestigde Oostendse blauwrollen.

### Primary

- **Oostends donkerblauw** (`brand`, `action`): identiteit, primaire knoppen, navigatie, alle hoofdsectiekoppen en geopende FAQ-indicator. `action-hover` verdiept de primaire actie bij hover.
- **Helder Oostends blauw** (`accent`): behouden accenttoken; geen algemene kleur voor sectiekoppen; die gebruiken donkerblauw.
- **Leesbaar linkblauw** (`link`, `focus`): kleine tekstlinks en toetsenbordfocus op licht. Dit donkerdere blauw bewaart de leesbaarheid van kleine tekst.

### Neutral

- **Warm papier** (`page`): pagina, header, footer en welkom. **Warm papier** (`surface`, alias van `page`): verhaal, geschiedenis en eventfotoarchief.
- **Zacht zand** (`surface-soft`): centrumlijst en historische erkenning. **Warme inschrijftint** (`surface-tint`): deelnamekaart. De feitenstrook gebruikt `surface-soft`.
- **Donkere hoofdtekst** (`text`) en **gedempt grijs** (`text-muted`): lopende tekst tegenover toelichting en metadata.
- **Rustige scheidingslijn** (`border`): horizontale inhoudsscheidingen. `control-border`, `control-line` en `action-line` geven bediening een herkenbare contour.
- **Neutraal donker** (`viewer-surface`, `viewer-overlay`) en **licht viewer-wit** (`viewer-text`): foto-viewer en backdrop. `viewer-border` en `viewer-hover` maken bediening herkenbaar.
- **Transparant navy** (`overlay`, `overlay-clear`, `overlay-shadow`): backdrop, animatiestart en diffuse schaduw van het mobiele menu.
- **Warm fotografisch donker** (`hero-base`, `hero-shade`, `hero-shade-edge`): verduistering over de warme hero-foto. `hero-label` en `hero-copy` verzorgen de lichte tekst daarop.
- **Witte focus op donker** (`focus-on-dark`): hero en viewer; het warme lichte mobiele menu gebruikt focusblauw.

**The Oostende Blue Rule.** Gebruik donkerblauw voor identiteit, acties en hoofdsectiekoppen; gebruik linkblauw voor kleine links en donkere tekst voor tussenkoppen. Houd de pagina warm en licht en de foto-viewer neutraal donker.

## Typography

**Display Font:** Cooper Hewitt, met de systeem-sans-stack uit de frontmatter als fallback.
**Body Font:** dezelfde Cooper Hewitt-familie, lokaal gehost als drie statische WOFF2-bestanden: Book (400), Medium (500) en Semibold (600). Book en Semibold worden vooraf geladen; Medium laadt wanneer nodig. Gewone primaire acties gebruiken Medium (500). De mobiele menuactie en footer gebruiken eveneens het beschikbare Medium (500).

**Character:** helder en direct, zonder decoratieve lettertypewisseling. Hoofdsectiekoppen zijn rechtop, Semibold (600), donkerblauw en in gewone schrijfwijze met lichte negatieve tracking. Tussenkoppen blijven donker en doorgaans Medium (500). Lopende tekst gebruikt Book.

### Hierarchy

- **Display en invitation**: “Kerstavond.” gebruikt de kleinere displayrol; “Kom erbij.” en “Schuif mee aan.” krijgen de grotere invitationrol op twee regels. Vanaf 601px zijn de tussenstappen respectievelijk 2rem en `clamp(3.5rem, 7.5vw, 4.5rem)`; vanaf 1001px gelden display-wide en invitation-wide. Beide blijven Cooper Hewitt, rechtop en Medium (500).
- **Hero-fotografie**: de verfijning van 20 oktober 2026 laat op mobiel boven de tekst circa 140–200px foto vrij. Een verticaal warm donker verloop beschermt de witte tekst eronder. De event-/locatiecontext staat onder de h1. Vanaf 1001px loopt de verduistering van links naar rechts af, zodat kaarslicht en glazen rechts helder blijven. De lichte feitenstrook en bestaande inhoud blijven behouden.
- **Headline**: sectiekoppen gebruiken `headline`; de welkomstkop heeft de afzonderlijk vastgelegde `welcome-headline`-variant. H2-koppen binnen secties zijn donkerblauw, sentence-case, Semibold (600), met regelhoogte (1.18) en tracking (-.02em). Welkom gebruikt donkerblauw en regelhoogte (1.15); het eventarchief deelt de redactionele koprol met welkom (`clamp(1.875rem,3.2vw,2.5rem)`, regelhoogte 1.15).
- **Title**: gewone tussenkoppen gebruiken `title`. Praktische rijen en fotobijschriften hebben kleinere, contextgebonden varianten; centrumnamen hebben een grotere lokale variant.
- **Body**: standaardtekst gebruikt `body` (18px/1.7); de welkomstinleiding houdt die maat en FAQ-antwoorden gebruiken `body-compact` (17px/1.7). Verhaaltekst en tijdlijnparagrafen zijn waar ingesteld begrensd tot (65ch).
- **Label**: de `label`-rol beschrijft kleine gewone tekst zoals bronregels en bijschriften, niet een decoratieve bovenkop. Footer- en juridische metadata hebben compactere contextvarianten.
- **Button**: het normale actiegewicht is vastgelegd in `button`; de lichte heroactie deelt dezelfde 16px en Medium (500) met de andere primaire acties.

Koppen gebruiken gebalanceerde regels; paragrafen krijgen `text-wrap: pretty` waar ondersteund. Behoud de volledige tekst bij zoom en smalle vensters.

**The One Family Rule.** Gebruik Cooper Hewitt voor koppen, lopende tekst en bediening; maak hiërarchie met grootte, gewicht en ruimte.

## Layout

De gecentreerde inhoudsbreedte heeft een maximum van (1200px). De zijmarges zijn (20px) op mobiel, (32px) vanaf (601px) en (48px) vanaf (1100px). De sectieruimte volgt dezelfde grenzen: (48px), (64px), (72px). De spacing-waarden in de frontmatter zijn herhaalde bouwstenen uit de implementatie, geen verplichte universele rastereenheid.

Inhoud stapelt op smalle schermen. Vanaf (768px) ontstaan twee kolommen voor onder meer praktische informatie, welkom, verhaal en centrumlijst. Het eventfotoarchief gebruikt vanaf (768px) een twaalfkolomsraster met achtereenvolgens paren van (7/5), (5/7) en (6/6) kolommen. De tweede foto staat (72px) lager en krijgt een (4:5)-kader; de vierde gebruikt (3:2), de zesde staat (48px) lager. Op mobiel zijn de eerste en vierde vervolgfoto breed over beide kolommen. Vanaf (1001px) staat de dansfoto naast de introductie in een (.85fr/1.4fr)-verdeling met (72px) tussenruimte. De optionele galerij behoudt aantalsafhankelijke rijen vanaf (601px). De desktopnavigatie verschijnt vanaf (1001px), met een bijbehorende JavaScript-grens. Houd beide gelijk bij wijzigingen.

De aanvullende praktische gegevens staan onder de hoofdgegevens in een gecentreerd blok van maximaal (960px), met één bovenlijn. De agendalink en bijbehorende toelichting staan gecentreerd tussen de hoofdgegevens en dit detailblok, met (32px) ruimte erboven en (32px) eronder, (40px) eronder vanaf (768px). Vanaf (768px) staan uren en doelgroep links, menu en bezoekinformatie rechts met (64px) kolomruimte. De menutoelichting is een gewone paragraaf. Detailgroepen hebben geen afzonderlijke rijlijnen; onder (20rem) groepsbreedte, ook bij tekstvergroting, staan labels boven hun waarden.

De footer gebruikt eerst twee inhoudskolommen, met de identiteit erboven, en vanaf (768px) drie kolommen. Onder (360px) stapelt de inhoud opnieuw. De footer begint met een compacte teruglink naar de actuele inschrijfinformatie en gebruikt het lichte zandvlak (`surface-soft`), met een bovenlijn en een kleine juridische afsluiting.

## Elevation & Depth

De gewone inhoud is vlak: scheidingslijnen en lichte oppervlakverschillen maken groepen herkenbaar. De fotografie draagt de visuele diepte in de hero. Alleen het mobiele navigatievenster heeft een expliciete diffuse schaduw; de foto-viewer gebruikt een donkere achtergrond zonder decoratieve schaduw.

### Shadow Vocabulary

- **Mobiel navigatievenster**: (`box-shadow: 0 32px 100px var(--overlay-shadow)`). De backdrop gebruikt daarnaast (`backdrop-filter: blur(6px)`). Deze overlaybehandeling hoort bij het modale menu.

De onepager heeft een korte fotografische introductie: de hero-foto komt tot rust en de titelregels bewegen met een klein ritme naar hun positie. De grote archieffoto heeft één bescheiden binnenkomst. De overige inhoud blijft direct zichtbaar. Motion voor JavaScript (`motion/mini`) verzorgt de gedeelde overgangen zonder React-integratie. Menu en foto-viewer openen en sluiten vloeiend; FAQ en centrumlijst animeren hun gemeten hoogte. Knoppen en fotolinks geven beperkte hover- en drukfeedback. Reduced motion slaat de ruimtelijke beweging over, ook bij een live voorkeurwijziging. Native dialogs, toetsenbordfocus, ankers en de werking zonder JavaScript blijven de basis. Specificatie en verificatie staan in `plans/MOTION_2026-10-20.md`. De globale reduced-motion-regel verwijdert animaties en transitions en schakelt vloeiend scrollen uit. De CSS schakelt de oudere menu-keyframes en FAQ-paragraafanimatie uit voor de gedeelde Motion-aansturing. Hover op fijne pointers vergroot foto’s tot (1.025), verplaatst pijlen (3px) en drukfeedback schaalt controls tot (.98); reduced motion verwijdert transforms. Reduced transparency verwijdert de menublur en maakt de backdrop dekkender.

**The Quiet Depth Rule.** Houd gewone inhoud vlak; reserveer de diffuse schaduw en achtergrondvervaging voor het mobiele navigatievenster.

## Shapes

Controls gebruiken zachte hoeken (`control`: 10px), deelnamekaart en viewer ruimere hoeken (`panel`: 16px), en het mobiele menu 20px (`menu`). De FAQ- en centrumindicatoren zijn cirkels (`circle`) met een uit CSS-lijnen opgebouwd plus/minteken. Storyfoto’s volgen de panelafronding. De welkomstfoto heeft (12px 32px 12px 12px); archiefkaders (12px), de dansfoto (32px 12px 12px 12px) en vanaf (1001px) (48px 12px 12px 12px). Deze gerichte foto-uitzonderingen vormen geen algemene controlradius. Archiefbeelden wisselen liggende en portretverhoudingen af. Randen zijn dun en functioneel, zonder sierkaders.

## Components

### Buttons

Rustige, duidelijk herkenbare acties. De primaire actie gebruikt donkerblauw met lichte tekst en de `button-primary`-tokens; minimale hoogte (50px). De hero gebruikt de lichte `button-inverse`-variant. Hover gebruikt `action-hover` en onderstreept de tekst; de lichte heroactie gebruikt `surface-soft`. Active verlaagt de helderheid. Zichtbare focus is een omlijning van (3px) met een afstand van (5px), wit op hero en viewer.

### Text links

Een onderstreept label in `link` met een bruikbaar aanraakvlak van minimaal (44px) hoog. Hover verdikt de onderstreping en gebruikt `action`. Telefoon-, route- en informatieacties blijven tekstlinks; hun betekenis komt uit het label.

### Cards / Containers

De deelnamekaart is het warme getinte vlak zonder rand, `panel`-afronding en de padding uit `participation-note`. Centrumgegevens zijn open rijen met een bovenlijn, geen afzonderlijke zwevende kaarten. Voer geen algemene schaduwkaart in op basis van de menu-overlay.

### Disclosures

De FAQ gebruikt native `details`/`summary`, gescheiden door lijnen en met een ronde indicator. De indicator vult donkerblauw wanneer open; de verticale lijn draait weg. De centrumlijst heeft een eigen groter disclosure met dezelfde lijnentaal. De samenvattingen bieden ruime volledige klikvlakken; de inhoud blijft leesbaar zonder JavaScript. Het exclusieve FAQ-gedrag is ook voor oudere browsers aangevuld.

### Navigation

De header volgt de warme paginaondergrond, zonder bovenlijn, met het compacte tweeregelige eigen woordmerk. Desktoplinks zijn 1rem groot en krijgen bij hover een fijne lijn. De volgorde is Voor wie?, Praktische info, Vorige edities en Hoe inschrijven?. De inschrijfactie verwijst naar #inschrijven en gebruikt de donkerblauwe button-primary-vorm met 10px afronding, minimaal 50px hoogte en 12px 22px binnenruimte. Partners blijven bereikbaar via de footer. Het mobiele menu volgt dezelfde volgorde met een afzonderlijke donkerblauwe inschrijfknop; de trigger heet Menu en heeft een dunne rand. Op mobiel opent een native dialog met grote tekstlinks, een zichtbare sluitactie en behoud van toetsenbordfocus en scrollpositie. De titel “Navigatie” leidt; de eventcontext staat eronder. Zonder JavaScript blijft een gewone navigatielijst beschikbaar.

### Fotografie

De foto van drie lachende mensen aan de bar (`2025-facebook-05`) staat vroeg onder de doelgroeptekst, met zichtbaar editiejaar 2025 en bronlink. De eerdere keukenfoto is na feedback vervangen door dit uitnodigende beeld. Het eventarchief begint met dansende gasten (`31`) en behoudt alle zeven oorspronkelijke beelden in de viewer: 31, 07, 01, 34, 17, 37 en 25. De zes vervolgbeelden staan standaard ingeklapt achter “Toon meer foto’s (6)”, als native disclosure dat ook zonder JavaScript werkt. Open verandert de knop in “Toon minder foto’s”. Uitgeklapt volgen ze de compositie uit Layout; zichtbare historische context en bron blijven bij de beelden horen. De viewer toont het volledige beeld met `object-fit: contain`.

### Photo viewer

Een native dialog op `viewer-surface`, met een bijna dekkende neutraal donkere backdrop en lichte tekst. Bedieningsknoppen hebben de `viewer-control`-vorm, een dunne rand, hover/active-vulling en witte focus. De afbeelding gebruikt `object-fit: contain`; caption, laadstatus en foutmelding krijgen eigen ruimte. Vorige/volgende, pijltjestoetsen, Escape, focusherstel en scrollherstel horen bij het component. Onderliggende fotolinks blijven bruikbaar zonder JavaScript.

### Footer

Een compacte lichte afsluiting met hetzelfde woordmerk, een terug-naar-bovenlink, navigatie en verenigingsgegevens. Een dunne lijn scheidt de juridische onderrand. De bron heeft gerichte mobiele en desktopspacing; de frontmatter beschrijft de mobiele basis. De afsluiting introduceert geen extra grote slogan of contrasterend merkvlak.

Er zijn geen eigen invoervelden of chips op de publieke pagina; dit document schrijft daarvoor geen verzonnen varianten voor. De sidecar toont representatieve HTML/CSS-uitsneden van bestaande componenten; frameworkgedrag en foto-assets worden daarmee niet nagebouwd.

## Do's and Don'ts

### Do:
- **Do** gebruik de warme oppervlakrollen, donkerblauwe sectiekoppen in Semibold, donkere tussenkoppen en donkerblauwe acties.
- **Do** houd tekstlinks herkenbaar door onderstreping en geef alle bediening zichtbare toetsenbordfocus.
- **Do** behoud de leesbare tekstgroottes, regelafstand en responsieve ruimte; controleer ook tekstvergroting.
- **Do** houd de footer compact, met dezelfde ondergrond als de pagina en leesbare navigatie- en verenigingsgegevens.
- **Do** geef archiefbeelden een zichtbaar editiejaar, bron en beschrijving; behoud hun beeldverhouding in de viewer.
- **Do** respecteer reduced motion en behoud bruikbare links en inhoud zonder JavaScript.

### Don't:
- **Don't** herstel groene oppervlakvlakken of decoratieve serif- en cursieve titels.
- **Don't** verander de foto-viewer in een gekleurd decoratief kader; gebruik de neutraal donkere rollen.
- **Don't** plaats decoratieve kickers boven koppen; de hero-context volgt de h1 en de menucontext volgt de h2.
- **Don't** leid een perfecte esthetische score of volledige toegankelijkheidscertificering af uit deze documentatie of automatische checks.

Bewijs staat onder `qa/organic-2026-10-20/`: vijf viewports (320, 390, 768, 1001 en 1440px), interactiestaten, no-JS, 200% tekst en reduced motion. `RESULTATEN.md` rapporteert een geslaagde build, 11 bestaande tests en geen axe-bevindingen in de geteste staten. De 56 hero-contrastmetingen hebben een minimum van 6,397:1. `FINISH_REVIEW.md` geeft disposition ship zonder materiële fixes; detectoradviezen over typografie en hoeken betroffen de vorige documentatie. Dit is aangeleverd bewijs, geen hier herhaalde controle of volledige toegankelijkheidscertificering.


## Motion — 20 oktober 2026

De hero-titel komt woord voor woord uit afzonderlijke tekstmaskers omhoog, met 85 ms onderling ritme en zonder rotatie. Woordkaders volgen de natuurlijke regelafbreking; de circa 1,65 seconden lange openingssequentie blijft zo herkenbaar op desktop en mobiel. De hero-foto beweegt pas na decoderen. Elke inhoudsfoto heeft een stilstaand `data-motion-frame`; alleen haar binnenste beeld beweegt, vanaf een startlijn op 82% schermhoogte én minimaal 30% zichtbaar beeld. De positie wordt na laden opnieuw beoordeeld. Kaders en bijschriften blijven stilstaan, terugscrollen herhaalt niets, hover verandert helderheid in plaats van met de entreetransform te concurreren. Opstarten neemt reeds zichtbare beelden niet weg. Reduced motion, toetsenbordfocus, rotatie en scrollvergrendeling hebben expliciete afhandelingspaden. De viewer houdt zijn huidige foto vast terwijl de volgende decodeert; beeldruimte en statusregel hebben een stabiele hoogte. De specificatie en verificatie staan in `plans/MOTION_2026-10-20.md`.


## Kleurverfijning — 20 oktober 2026

Na de kleuraudit heeft de gebruiker de verfijning goedgekeurd. Drie lichte rollen vormen de basis: papier (`page` en alias `surface`), zacht zand (`surface-soft`, feitenstrook, centra en footer) en een duidelijker warme inschrijftint (`surface-tint`, uitsluitend de deelnamekaart). De gewone inhoud wisselt niet meer tussen wit en papier.

Essentiële doelgroeptekst en FAQ-antwoorden gebruiken `text`; bijschriften en metadata behouden `text-muted`. De blauwe welkomstkop blijft behouden. Gewone contactlinks gebruiken `link`; historische tijdlijnjaren gebruiken `text`.

De hero gebruikt een warmer bruin-neutraal verloop met 70–80% dekking in het tekstgebied en een lichtere bovenkant op mobiel. Het mobiele menu gebruikt een neutrale scrim van 22% en 6px blur. Reduced transparency behoudt een dekkender neutrale backdrop zonder blur. De viewer behoudt neutraal donker, met permanente controlvulling `#242424`, rand `#858585` en hover `#363636`.

Nieuwe contrastmetingen en detectorresultaat staan in `qa/color-refinement-2026-10-20/`. De vroegere organic-captures documenteren de vorige kleurwaarden.


## Consistentieverfijning — 21 oktober 2026

De hoofdactie in de hero gebruikt dezelfde 16px als andere primaire acties, op alle schermbreedtes. Mobiele datum, uren, locatie, prijs en prijsaanvulling zijn minimaal 16px. Onder 360px stapelt de feitenstrook op één kolom, zodat de tekst niet hoeft te krimpen. Datum en uren staan ook samen onder Wanneer in de praktische informatie. De aanvullende detailgegevens blijven beschikbaar.

`--h2` blijft de gewone sectiekop (28–36px), `--heading-editorial` is de bewuste redactionele variant voor welkom en het fotoarchief (30–40px), en `--h3` is de tussenkop van 22px, ook bij de organisatie. De partnerkop volgt voortaan de gewone sectiekop. `--type-action` (16px), `--type-caption` (14px) en `--type-photo-title` (16px) maken de rollen van bediening, bronvermelding en fotobeschrijving expliciet. Deze waarden vervangen de oudere lokale maten hierboven: de archiefkop groeit niet meer tot 52px, de organisatiekop niet meer tot 38px en de heroactie krimpt niet meer tot 13–15px. Bronbijschriften bij welkom, archief, locatie en organisatie delen de captionrol.

FAQ, centrumlijst en de toegevoegde kaart gebruiken dezelfde donkerblauwe openindicator met een licht minteken. De centrumlijst heeft duidelijkere blauwe wijknamen van 16px; de nummering en koppeling met de kaart blijven behouden. De footer begint met een compacte terugweg naar de actuele inschrijfinformatie, met passende tekst bij afgesloten of uitverkochte inschrijving. De browserkleur volgt het warme papier. Lokale gewichten van 550 zijn vervangen door beschikbaar Medium (500).


## Compacte wijkkeuze — 21 oktober 2026

De goedgekeurde ontwerpafbeelding is uitgewerkt als een direct zichtbare wijkkeuze; dit vervangt het eerdere buitenste centrumdisclosure en het standaard tweekolomsoverzicht van negen uitgebreide centra. Vanaf 768px staan acht wijkknoppen met aantallen links en de bijbehorende centra rechts (320px/overige ruimte, met 64px tussenruimte vanaf 1100px). Onder 768px kiest de bezoeker zijn wijk in een native select. De eerste wijk is Centrum; het eerste centrum is open en overige centra zijn compacte native details. Geselecteerde wijkknoppen gebruiken donkerblauw met lichte tekst, aantal en vinkje.

Adres, belknop en route zijn direct zichtbaar bij een geopend centrum. Openingsuren, bestaande loketuren, waarschuwing en sluitingsdagen zitten onder “Openingsuren en praktische info”. “Bekijk alle 9 centra” toont alle centra en biedt een terugweg naar de wijkkeuze. “Toon op kaart” opent de bestaande kaart bij de huidige centrumselectie. De kaart staat initieel verborgen na verbetering met JavaScript, zodat zij geen tweede keuzeonderdeel toevoegt; sluiten brengt focus terug. Zonder JavaScript blijven alle centra en de native kaarttoelichting beschikbaar. Gegevens komen uit dezelfde centrale bronnen; filterwijzigingen krijgen een korte live-aankondiging zonder focusverplaatsing. Warme oppervlakken, Cooper Hewitt, bestaande focuskleuren en minimaal 44px bediening blijven behouden. Gerichte verificatie: `scripts/meeting-centres-qa.mjs`, bewijs in `qa/centre-finder-2026-10-21/`.


## Warmere centrumkeuze — 21 oktober 2026

Na gebruikersfeedback dat de eerste wijkkeuze te kaal en zakelijk aanvoelde, is het onderdeel verfijnd binnen de bestaande Oostendse wereld. De achtergrond sluit aan op warm papier. De wijkknoppen staan los van elkaar, zonder tabelranden; de gekozen wijk krijgt een zandkleurig vlak met blauwe tekst en vinkje. Aantallen worden voluit als “1 centrum” en “2 centra” getoond. Het geopende centrum heeft een zacht zandvlak met 16px hoeken; gesloten centra blijven open rijen. Chevronbediening vervangt de zware ronde plus/minindicator op het hoofdniveau; de praktische uitklaprij behoudt een rustig plus/minteken.

De blauwe uitnodigende kop luidt “Een ontmoetingscentrum dicht bij jou.”, de belknop benoemt alleen het centrum; het telefoonnummer staat apart onder het adres, en “Even bellen voor je langskomt?” leidt de praktische waarschuwing in. Vanaf 1001px ondersteunt de door de gebruiker aangeleverde gebouwfoto (`/images/ontmoetingscentra/centrum-in-het-groen.webp`, 680×453) de introductie zonder uitsnede. Er wordt geen specifiek centrum, jaartal of fotograaf aan gekoppeld. Het aangeleverde origineel blijft bewaard onder `assets/ontmoetingscentra/`. Op smallere schermen blijft het beeld achterwege om de wijkkeuze direct bereikbaar te houden. Geen nieuwe feiten of inschrijfvoorwaarden zijn toegevoegd.

“Bekijk alle 9 centra” onthoudt de laatst gekozen wijk om ernaar terug te kunnen keren. In het volledige overzicht verschijnt de wijk naast het adres weer. Gerichte screenshots en browserresultaten staan in `qa/centre-finder-warm-2026-10-21/`. De detector gaf voor deze verfijning geen adviezen.


## Herkenningsfoto per ontmoetingscentrum — 21 oktober 2026

De gebruiker heeft gevraagd de sectiefoto te laten volgen op de centrumkeuze. De negen herkenningsfoto's komen rechtstreeks van de centrumkaarten op de officiële overzichtspagina van Stad Oostende; koppeling en beeldbank staan in `assets/ontmoetingscentra/stad-oostende/`. De lokale afbeeldingspaden, feitelijke alt-teksten en bronlinks staan in `src/data/centre-photos.json`.

Bij de eerste weergave blijft de aangeleverde gebouwfoto zichtbaar, ook al is het eerste centrum voor het gemak open. Een expliciete wijkkeuze toont de foto van het eerste centrum; het openen van een ander centrum of selecteren op de kaart werkt de foto en bronvermelding bij. Sluiten van het actieve centrum of overschakelen naar het volledige overzicht herstelt het standaardbeeld. Nieuwe foto's worden eerst gedecodeerd. Een volgnummer voorkomt dat een oudere laadactie een recentere keuze overschrijft; laadfouten vallen terug op het standaardbeeld. Afbeeldingen behouden hun volledige verhouding via object-fit:contain en een vaste beeldruimte.

Vanaf 1001px staat dezelfde foto in de introductie; op kleinere schermen verplaatst het ene figure-element naar de centrumresultaten, zodat de wijkkeuze eerst bereikbaar blijft en de foto nabij de gegevens staat. Breakpointwissels behouden de gekozen foto. Bij een specifieke foto staat de centrumnaam met bronlink naar Stad Oostende. Zonder JavaScript blijft het aangeleverde standaardbeeld beschikbaar op desktop en blijven alle centrumgegevens leesbaar. Controle: `scripts/centre-photos-qa.mjs`, bewijs in `qa/centre-photos-2026-10-21/`.


## Donkerblauwe sectietitels — 21 oktober 2026

Op verzoek van de gebruiker volgen alle hoofdsectietitels de sectiekoppen van Stad Oostende: Cooper Hewitt Semibold (600) in donkerblauw `#273a7c`. De gedeelde tokens `--section-heading-color` en `--section-heading-weight` sturen de h2-rol binnen secties en de lokale gewichtsvarianten van welkom en de centrumkeuze aan. De bestaande schalen (28–36px en de redactionele 30–40px), gewone schrijfwijze, regelafstanden en tussenruimte blijven behouden. Tussenkoppen, lopende tekst en de witte hero behouden hun bestaande behandeling. Dit vervangt de eerdere keuze voor donkere sectiekoppen in Medium.

## Horizontaal woordmerk in de header — 21 oktober 2026

Op verzoek van de gebruiker staat “Welzijnswerking” met hoofdletter in de navigatie op één regel, zonder eindpunt, met “Oostende” kleiner eronder en links uitgelijnd. Beide regels gebruiken het bestaande donkerblauw en Cooper Hewitt; de naam gebruikt Semibold en de plaatsnaam Medium met .06em letterafstand. De naam schaalt op mobiel van 20 tot 26px en gebruikt vanaf 1001px 32px; de plaatsnaam gebruikt 13px en op desktop 14px. Tussen de regels staat 3px ruimte. Deze aangescherpte versie volgt de gebruikersfeedback op de eerste horizontale uitvoering. Dit vervangt uitsluitend de tweeregelige woordmerkvorm in de header; footer en mobiele dialoog behouden hun bestaande vorm. Build en Astro-controle slagen; de header is visueel gecontroleerd op 320, 390, 1001 en 1440px zonder horizontale overflow of overlap. Screenshots staan in `qa/wordmark-2026-10-21/`. De detector geeft alleen adviserende meldingen over lokale lettergroottes in het bestaande stylesheet.

## Goedgekeurd beeldwoordmerk met sierstreep — 21 oktober 2026

De gebruiker heeft het gegenereerde donkerblauwe beeldwoordmerk met licht hellende letters en de asymmetrische sierstreep expliciet goedgekeurd en gevraagd het toe te passen. Dit vervangt de eerdere tekstwoordmerken in header, mobiele menudialoog en footer. De goedgekeurde bron staat in `assets/branding/welzijnswerking-signature-concept-v4.png`; de transparante PNG voor de website staat, met transparante buitenruimte bijgesneden, in `public/images/branding/welzijnswerking-oostende.png` (1847×339). Het beeld behoudt zijn volledige verhouding, met beschrijvende alt-tekst en expliciete afmetingen. Na gebruikersfeedback op de te dominante toepassing is de headerbreedte teruggebracht tot 150px op mobiel/tablet en 180px op desktop; footer 180px en menudialoog maximaal 170px. Het woordmerk blijft een bescheiden afzender in de volledige paginacompositie. De menuknop blijft op smalle schermen op één regel. Dit is een gerichte merkuitzondering; Cooper Hewitt en bestaande tekst- en kleurrollen blijven gelden voor de overige interface. Build en Astro-controle slagen; visuele controles op 320, 390, 768, 1001 en 1440px, footer en geopende menudialoog staan in `qa/branding-2026-10-21/`.


## Hero volgens aangeleverd voorbeeld — 21 oktober 2026

De gebruiker vraagt de hero-tekst exact volgens de aangeleverde afbeelding. Deze gerichte uitzondering vervangt voor de hero de eerdere uitsluitend rechte Cooper Hewitt-titel en context onder de titel. De drie regels luiden “Vier kerstavond”, “samen” en “in het Kursaal.”, met Georgia Regular, een cursieve gouden tweede regel en een schaal van 40 tot 140px. Bovenaan staat de gouden contextregel met een korte horizontale lijn. Public Sans uit de bestaande lokale fontbestanden verzorgt uitsluitend de hero-context, toelichting, doelgroep en actie. De overige pagina behoudt Cooper Hewitt en de bestaande Oostendse vormgeving.

Het hero-goud is #f3ca76, de actietekst #17375e en de hoverkleur #ffda90. De doelgroep krijgt een eenvoudig personenicoon; de gouden inschrijfknop een pijl naar rechts en 16–30px hoeken volgens het voorbeeld. De foto en de functionele feitenstrook blijven behouden. De drie titelregels passen op 320, 390, 768, 1164 en 1440px zonder horizontale overflow; reduced motion blijft werken via de bestaande woordmaskers. Screenshots en contrastmetingen staan in `qa/hero-reference-2026-10-21/`.


## Aangeleverd kleurenlogo — 21 oktober 2026

Op verzoek van de gebruiker vervangt de aangeleverde transparante PNG met drie gekleurde personen en “Welzijnswerking Oostende” het vorige beeldwoordmerk in navigatie, mobiele navigatiedialoog en footer. Het originele bestand wordt ongewijzigd geleverd als `public/images/branding/welzijnswerking-oostende-kleuren.png` (2172×724). De header gebruikt maximaal 190px op mobiel en 220px op desktop; op smalle schermen kan het logo verkleinen naast de menuknop. De footer gebruikt maximaal 220px en de menudialoog 190px. Beeldverhouding en transparantie blijven behouden.


## Correctie heroschaal — 21 oktober 2026

De gebruiker heeft de uitvergrote hero expliciet afgewezen. De hero gebruikt opnieuw de oorspronkelijke container, responsive fotopositie en verduistering, boven-/onderruimte (174/36px mobiel, 200/48px tablet, 76/72px desktop), titelschaal (32–56px mobiel, 56–72px tablet, 64–80px desktop), toelichting (17px), doelgroep (16px) en actie (16px, minimaal 50px hoog, 10px hoeken). De drie serifregels en gouden cursieve nadruk blijven behouden. Dit vervangt de hierboven beschreven schaal tot 140px en de vergrote knop en begeleidende tekst.


## Favicon met origineel beeldmerk — 21 oktober 2026

De favicon gebruikt op verzoek van de gebruiker alleen de drie gekleurde personen uit het huidige logo, zonder tekst. `scripts/generate-favicons.mjs` snijdt het beeldmerk deterministisch uit de originele PNG (x=55, y=136, 491×428), centreert het met circa 5% marge in een vierkant en genereert transparante PNG's op 16, 32 en 48px, een ICO met deze drie resoluties, en een SVG-container met de oorspronkelijke rasteruitsnede. Het Apple-touch-icoon is 180px met de warme papierachtergrond. Alle headverwijzingen gebruiken `v=beeldmerk-20261021` voor cacheverversing. Bestandsafmetingen, ICO-frames en HTTP-verwijzingen zijn gecontroleerd; visuele vergelijking op lichte en donkere achtergronden staat in `qa/favicon-2026-10-21/preview.png`.
