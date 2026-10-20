# Welzijnswerking Oostende — kerstfeest 2026

Lokale statische Astro-onepager, herbouwd op 18 oktober 2026 op basis van de briefing `CODEX_ULTIEME_PROMPT_WELZIJNSWERKING_2026.md`. Hosting, DNS en geheime gegevens zijn niet gewijzigd.

## Ontwikkelen

```sh
npm ci
npm run dev -- --port 4323
npm run build
npm run preview -- --port 4325
npm test
npm run release
```

`build` voert Astro/TypeScript-controle uit en schrijft uitsluitend de homepage naar `dist/`. Gebruik de door Astro afgedrukte lokale URL. De ontwikkeling gebruikt geen nieuwe UI- of animatiebibliotheek. Bricolage Grotesque en DM Sans staan lokaal in `public/fonts/`, inclusief OFL-licenties.

## Vormgeving en structuur

De redesignfix uit `plans/REDESIGN_FIXPLAN.md` is lokaal geïmplementeerd. De pagina volgt nu: uitnodiging → praktische informatie → verhaal en locatie → historische tijdlijn → eventuele editiefoto’s → partners → compacte footer. Titel en intro komen uit de centrale evenementdata; datum en prijs gebruiken gedeelde formatters, ook voor het deelbeeld.

De hero gebruikt een doorlopende illustratieve kersttafelfoto van Nicole Michalou (Pexels), met een centrale serif titel en een aparte lichte feitenstrook. De echte foto’s van de editie 2025 staan in het archief. De lichte navigatie en ruime donkergroene footer zijn opnieuw vormgegeven voor mobiel en desktop. De footer bevat de gecontroleerde vzw-gegevens en een bescheiden Webaanzee-vermelding als belangeloze bijdrage. De echte Kursaalfoto van Karelde uit 2025 ondersteunt het verhaal, met bron en CC0-licentie. Historische feiten en bijdragers blijven bij hun eigen editiejaar staan.

De stijlarchitectuur heeft drie lagen: `tokens.css` definieert fonts, kleuren en schalen; `global.css` bevat documentbasis en herbruikbare bediening; `campaign.css` groepeert actuele componenten en hun responsive regels. De menu-CSS en JS gebruiken dezelfde grens van 1001 px. Zonder JavaScript blijft zichtbare navigatie beschikbaar. Vergrote tekst kan ombreken. Het mobiele menu opent als modaal dialoogvenster met een vervaagde achtergrond, scrollvergrendeling en toetsenbordbediening. De veelgestelde vragen zijn standaard ingeklapt; bij het openen van een vraag sluit het vorige antwoord.

Links gebruiken geen diagonale pijlen. Tekstlinks zijn onderstreept en krijgen bij hover een nadrukkelijkere onderstreping; actielinks behouden een duidelijke knopvorm. Toetsenbordfocus blijft zichtbaar. Vergrootbare foto's krijgen een tekstuele aanwijzing en een zoomcursor. Dit geldt ook voor bronverwijzingen, de footer en development-previews.

Actuele bewijzen en beperkingen: `qa/CURRENT_DESIGN.md` en `qa/redesign-fix/VISUAL_REVIEW.md`. Voor-opnames staan apart in `qa/redesign-fix/before/`. Oudere QA-mappen zijn procesarchief en beschrijven eerdere versies.

## Evenementinformatie aanpassen

Bewerk `data/inhoud_2026.json` met een teksteditor. Laat nog onbekende waarden `null` en lijsten `[]`. Wijzig geen historische informatie om de huidige editie aan te vullen.

| Informatie | Veld onder `event` |
|---|---|
| Kop en intro | `title`, `intro` (zichtbare woorden voor pagina en deelbeeld) |
| Datum, locatie, prijs | `date`, `year`, `venueName`, `venueAddress`, `priceEuro` |
| Uren | `eventStartTime`, `doorsOpenTime`, `endTime` — bijvoorbeeld `18.00 uur`, uitsluitend na bevestiging |
| Zaal | `room` |
| Voor wie | `eligibilityRules` |
| Menu | `menuItems` (lijst teksten), `courseCount`, `drinksIncluded` |
| Programma, bereikbaarheid | `entertainmentDetails`, `accessibilitySpecifics`, `transportSpecifics` |
| Tickets | `ticketSalesStatus`, `ticketUrl` |

Deze optionele velden worden automatisch zichtbaar zodra ze zijn ingevuld. De resterende onbekende uren, menu en doelgroep worden in één noot samengevat. Voor contact gebruik je `brand.organizationContactEmail` en `brand.organizationContactPhone`; de footer toont ze alleen na invulling. `title` bevat de gewenste titelregels, gescheiden met `\n`.

### Tickets activeren

Voor online verkoop: zet uitsluitend na bevestiging `ticketSalesStatus` op `available` en vul `ticketUrl` met de echte HTTPS-URL. Dan verandert de primaire heroactie automatisch in **Reserveer je plaats** en verschijnt dezelfde actie bij de praktische informatie. Zonder geldige ticketlink verwijst de hero bij een ingevulde inschrijfmethode naar `#inschrijven`, anders naar `#praktisch`. `sold_out` en `closed` tonen de juiste status en krijgen voorrang op de inschrijfuitnodiging. Voor een toekomstige verkoopstart blijft de status `not_confirmed` tot de verkoop daadwerkelijk open is; er is geen automatische planning.

### Inschrijven via de ontmoetingscentra

De bevestigde inschrijfmethode gebruikt `event.registrationChannel: "meeting_centres"`, de titel `registrationMethod` en de toelichting `ticketsInfoText`. De knop **Hoe schrijf ik me in?** gaat rechtstreeks naar de inschrijfkaart. Het centrumoverzicht staat standaard ingeklapt om plaats te besparen. **Vind een ontmoetingscentrum** opent het overzicht en brengt de bezoeker ernaartoe, direct na de praktische informatie. Per centrum staan wijk, adres, telefoonnummer, een belknop met telefoonicoon, route en officiële openingsuren. De lijst staat volledig in de HTML; zonder JavaScript opent de bezoeker het overzicht zelf met **Bekijk de negen ontmoetingscentra**. Rechtstreeks openen van `#ontmoetingscentra` klapt de lijst met JavaScript ook open.

De contactgegevens staan in `src/data/meeting-centres.ts`, met bronlink en controledatum per centrum (20 oktober 2026). Gebruik bij wijzigingen de individuele officiële centrumpagina’s: sommige algemene stadspagina’s bevatten afwijkende gegevens. Openingstijden worden niet gekopieerd; de site verwijst naar de actuele informatie van Stad Oostende. De belknoppen bieden contact voor uitleg en beloven geen telefonische inschrijving.

Startdatum, uiterste inschrijfdatum en betaalwijze moeten nog door de organisatie worden bevestigd. Werk dan de toelichting bij en pas de status aan. Voor inschrijving via een OC is geen online ticketlink nodig. Vul een centrumwebsite nooit als `ticketUrl` in. Bij `sold_out` of `closed` verdwijnen de inschrijfuitnodiging en de zoekknop uit de kaart; de centrumlijst blijft beschikbaar voor algemene contactinformatie.

Controle: `node scripts/meeting-centres-qa.mjs` tegen de productiepreview (4325) en devserver (4323). Dit controleert vijf schermbreedtes, de toetsenbordroute, bel-/routelinks, aanraakvlakken, axe, 200% tekst, vijf OC-inschrijfstatussen en de werking zonder JavaScript. Bewijs: `qa/meeting-centres-report.json` en `qa/ONTMOETINGSCENTRA_REVIEW.md`.

De agenda-knop downloadt een datumherinnering voor de hele dag, zonder reservering. Ook na bevestiging van tijden blijft dit bewust een datumherinnering; de zichtbare uren staan bij de praktische informatie.

## Foto's toevoegen

Bewaar het origineel in `assets/fotos-vorige-edities/` en de geoptimaliseerde webversie in `public/images/event/`. Voeg aan `images.galleryPreviousYears` een record toe:

```json
{
  "src": "/images/event/2025-01.webp",
  "year": 2025,
  "alt": "Een feitelijke omschrijving van deze echte editiefoto.",
  "credit": "Fotograaf: bevestigde naam",
  "permissionReceived": true,
  "permissionEvidence": "Interne referentie naar schriftelijk akkoord",
  "publish": true,
  "objectPosition": "50% 40%"
}
```

Dit is een invulvoorbeeld. Er moet een echt bestand bestaan; toestemming, bewijs, credit en omschrijving zijn verplicht. Alleen vorige editiejaartallen worden toegelaten. Bewijsreferenties komen niet in publieke HTML. Optionele `variants` zijn een lijst van `{ "src": "/images/event/2025-01-800.webp", "width": 800 }` voor responsive versies. De galerij bevat wisselende beeldformaten, jaartallen, beschrijving, credit en een toetsenbordbedienbaar lichtvenster. De bronreportages blijven als context bestaan. Zonder goedgekeurde foto's verschijnt geen leeg galerijonderdeel.

## Sponsorlogo's toevoegen

Origineel in `assets/sponsors/`; geoptimaliseerd bestand in `public/images/sponsors/`. Voeg aan `confirmedSponsors` in `data/sponsors_2026.template.json` toe:

```json
{
  "id": "officiele-naam",
  "name": "Officiële naam",
  "tier": "partner",
  "website": "https://officiele-website.be/",
  "logo": "/images/sponsors/officiele-naam.svg",
  "logoAlt": "Logo van Officiële naam",
  "confirmedFor2026": true,
  "verified": true,
  "logoUsageApproved": true,
  "displayOrder": 10
}
```

Alle verificatievelden en een bestaand lokaal logo zijn vereist. Categorieën: `main`, `partner`, `support`, `in_kind`; volgorde via `displayOrder`. Verhoudingen en kleuren blijven intact. De actuele sectie verschijnt pas als er goedgekeurde records zijn. Historische bijdragers in `src/data/history.ts` blijven apart als 2025-erkenning staan; dit is geen sponsorbewijs voor 2026.

## Browser- en modulecontrole

Start zowel de devserver op 4323 als de productiepreview op 4325, en voer uit:

```sh
node scripts/browser-qa.mjs
node scripts/navigation-qa.mjs
node scripts/modules-qa.mjs
node scripts/drawing-qa.mjs
```

De gerichte `navigation-qa` controleert het mobiele menu en de FAQ, inclusief focus, achtergrondblur, scrollherstel, zes schermformaten en axe. Gebruik `QA_BROWSER=webkit` of `QA_BROWSER=firefox` voor dezelfde controles in die browser.

Installeer zo nodig de bij Playwright passende Chromium-browser. Alternatieve servers: `QA_URL` (standaard productiepreview op 4325) en `DEV_QA_URL` (development op 4323). Controleer de server-URL: andere projecten kunnen de gebruikelijke poorten al bezetten.

Productiecontrole omvat de tien referentieformaten plus zes formaten rond de breakpoints, anchors, menu, focus, 200% tekst op 320 px, navigatie zonder JavaScript, agendadownload, routes, metadata, assets en axe. Modulecontrole omvat 0/1/2/3/4/10/20 foto’s en 0/1/3/4/12/24/40 sponsors op gerichte schermformaten, inclusief lightbox. Bijvoorbeeld `/dev-preview/modules-2-3`. Alle beelden en logo’s zijn herkenbare grafische testfixtures; deze routes ontbreken in de productiebuild.

Aanvullende controles:

```sh
node scripts/states-qa.mjs
node scripts/performance-qa.mjs
QA_URL=http://127.0.0.1:4325/ node scripts/creative-qa.mjs full-review
```

`states-qa` controleert elf ontwikkeltoestanden voor tickets, praktische velden en contact. `drawing-qa` controleert de statische volledige/compacte kandelaar, afstanden en reduced motion. `performance-qa` registreert lokale LCP/CLS en assetgewichten; dit zijn indicatieve metingen zonder netwerk- of CPU-vertraging. Rapporten staan onder `qa/redesign-fix/`.

`node scripts/generate-social-card.mjs` maakt zonder draaiende server het fotografische deelbeeld op 1200×630, met lokaal ingebedde fonts en dezelfde hero-foto. De zelfstandige SVG bevat de gerenderde kaart. Na wijziging van datum/prijs/titel/intro dit script uitvoeren vóór een nieuwe build. De JPEG is de webpreview; een losse SVG kan door fontfallback anders afbreken.

Geen tracking of externe fonts. Canonical, sitemap en Event JSON-LD verwijzen naar `https://welzijnswerking.be/`. Structured data bevat geen onbevestigde tijd, aanbod of ticketbeschikbaarheid. Axe-resultaten zijn geen volledige WCAG-certificering.

## Beeldonderzoek van 20 oktober 2026

De openbare Facebookpagina van Welzijnswerking Oostende bevat een fotobericht van 25 december 2025 met 38 foto's van de kerstavond. De volledige reeks staat lokaal in `assets/fotos-vorige-edities/facebook-2025/`, met foto-URLs, dimensies, hashes en selectiekeuze in `manifest.json`. `EventArchive.astro` gebruikt zeven geselecteerde beelden als responsive WebP. De gevraagde foto van de organisatie met Fabrice Goffin staat apart in `StorySection.astro`, expliciet als aankondiging van november 2025 en met namen uit de KW-bron. Er is niets gedeployd.

De eerdere negen unieke pers-/archiefbeelden blijven bewaard onder `assets/fotos-vorige-edities/onderzoek-2026-10-20/`. Het verslag daar beschrijft de actuele selectie en het eerdere onderzoek. `/dev-preview/beeldenonderzoek` toont die eerdere persselectie; de hoofdpagina gebruikt nu de echte Facebook-reeks. `node scripts/image-research-qa.mjs` controleert de responsive weergave, beelden, toegankelijkheid en productiebuild.

## Deployment

Volg `DEPLOY_MORGEN.md` om de informatie van 21 oktober in te vullen. `npm run release` vernieuwt deelbeeld en productiebuild, controleert inhoud en types, verwijdert ongebruikte beeldkopieën uitsluitend uit `dist/` en maakt `release/welzijnswerking-2026.zip`. Bronbeelden blijven in de beeldbank.

### Bevestigde aanvulling van 20 oktober 2026

Fabrice bevestigde via WhatsApp: 17.00–21.30 uur, alleenstaanden vanaf 50 jaar, € 5, inschrijving via de negen ontmoetingscentra, muziek van Patrick “Pulle” met een verrassingsgast. De opdrachtgever verduidelijkte daarna dat de gerechten nog niet bekend zijn. `menuItems` blijft leeg; `event.menuNote` meldt dat het menu later wordt bekendgemaakt. `event.registrationMethod` is de titel van de inschrijfuitleg; `ticketsInfoText` bevat de praktische toelichting. Dit maakt geen online ticketverkoop actief.

De agenda-download gebruikt bevestigde begin- en eindtijd in Europe/Brussels; bij ontbrekende tijden blijft het een datumherinnering. Beide zijn geen inschrijving. Deze actuele werking vervangt de eerdere beschrijving van de agenda als uitsluitend een herinnering voor de hele dag.

### Deelbeeld en publiek domein

Het publieke adres is `https://www.welzijnswerking.be/`. Canonical, Open Graph, Twitter Cards, sitemap en robots verwijzen hiernaar. Het goedgekeurde ImageGen-deelbeeld staat in `assets/social/kerstfeest-2026-master.png`; de prompt en herkomst staan ernaast in `IMAGEGEN_PROMPT.md`. Het is een illustratieve kersttafel, geen evenementfoto. `scripts/generate-social-card.mjs` exporteert dit beeld naar `public/kerstfeest-2026-social.jpg` (1200×630) en vernieuwt de oudere bestandsnamen voor bestaande links. Een release bewaart dus het goedgekeurde ontwerp. Controle: `node scripts/social-card-qa.mjs`, of met `QA_URL=https://www.welzijnswerking.be/` tegen de live versie. Sociale platformen kunnen een eerder opgehaalde linkpreview tijdelijk bewaren.
