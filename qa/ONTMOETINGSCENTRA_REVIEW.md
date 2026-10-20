# Controle ontmoetingscentra — 20 oktober 2026

De lokale website bevat de route hero → inschrijfkaart → negen ontmoetingscentra. Het overzicht staat onder de praktische informatie en is standaard ingeklapt. Na openen toont het per centrum de wijk, het adres, telefoonnummer, belactie met telefoonicoon, Google Maps-route en officiële informatie bij Stad Oostende. De knop **Vind een ontmoetingscentrum** opent het overzicht automatisch.

## Broncontrole

Alle negen individuele officiële centrumpagina’s en het stadsoverzicht gaven HTTP 200. Op elke centrumpagina zijn zowel het gepubliceerde adres als het telefoonnummer teruggevonden. De exacte bronlinks en controledatum staan in `src/data/meeting-centres.ts`. De wijkindeling is overgenomen uit het officiële centrumoverzicht. Openingstijden worden via een link geraadpleegd.

## Browsercontrole

`node scripts/meeting-centres-qa.mjs` is geslaagd tegen de productiepreview en devserver:

- 320, 360, 390, 768 en 1440 px breed, zonder horizontale overflow.
- Standaard ingeklapt op alle vijf schermformaten; de inhoud is verborgen en de belknoppen staan dan niet in de tabvolgorde.
- Volledige toetsenbordroute via de hero en centrumknop, met focus op de bestemming en daarna op de uitklapbediening en eerste belknop. Openen en sluiten met Enter is gecontroleerd.
- Automatisch openen via de centrumknop en rechtstreeks via `#ontmoetingscentra`, ook na handmatig opnieuw sluiten.
- Alle negen belknoppen tonen een decoratief telefoonicoon; de toegankelijke linknaam bevat centrumnaam en telefoonnummer.
- Negen unieke centra, correcte `tel:`-links, routebestemmingen met volledig adres en officiële centrumlinks.
- Alle nieuwe links hebben aanraakvlakken van minimaal 44 × 44 px.
- Geen axe-overtredingen voor de gecontroleerde WCAG A/AA-regels op de vijf schermformaten.
- Geen horizontale overflow bij verdubbelde tekstgrootte in de nieuwe onderdelen op 320 px.
- Werkende bezoekersroute zonder JavaScript: de centrumknop gaat naar het overzicht en de native uitklapbediening maakt de volledige lijst zichtbaar.
- Vijf OC-toestanden: inschrijfperiode onbevestigd, offline beschikbaar, online beschikbaar, uitverkocht en afgesloten. De laatste twee tonen geen inschrijfuitnodiging; online verkoop behoudt de rechtstreekse ticketactie.
- Geen centrumoverzicht wanneer de inschrijfmethode geen ontmoetingscentra gebruikt.
- Geen browserfouten en geen demo-inhoud in de productiehomepage.

Screenshots van inschrijfkaart en overzicht op 390 en 1440 px zijn visueel nagekeken. Rapport: `qa/meeting-centres-report.json`. Screenshots: `qa/registration-390.png`, `qa/registration-1440.png`, `qa/meeting-centres-390.png`, `qa/meeting-centres-1440.png` (lokale QA-bestanden).

Ook de ingeklapte toestand is visueel gecontroleerd: `qa/meeting-centres-collapsed-390.png` en `qa/meeting-centres-collapsed-1440.png`.

Ook geslaagd: de elf bestaande inhoudstoestanden (`scripts/states-qa.mjs`), evenementinformatie en agenda-download op vier schermbreedtes (`scripts/event-update-qa.mjs`), alle zes inhoudstests en de productiebuild zonder typefouten of waarschuwingen. `npm run release` heeft het uploadpakket `release/welzijnswerking-2026.zip` vernieuwd.

## Openstaande evenementinformatie

Startdatum, uiterste inschrijfdatum, betaalwijze en eventuele specifieke inschrijfafspraken vragen nog bevestiging door de organisatie. De website meldt dit en belooft geen telefonische inschrijving. Deze uitvoering publiceert geen websitewijziging naar de hosting.
