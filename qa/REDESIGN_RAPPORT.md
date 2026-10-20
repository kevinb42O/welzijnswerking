# Redesign welzijnswerking.be — opleverrapport

**Datum:** 18 oktober 2026. **Uitvoering:** rechtstreeks in de bestaande Astro-codebase. Lokale implementatie en statische productiebuild; hosting/DNS niet gewijzigd.

## Interne diagnose van het afgekeurde ontwerp

1. De klassieke, cursieve serif en extreme kopgroottes bepaalden de hele identiteit.
2. Datum, locatie, prijs en CTA vormden geen samenhangend eerste scherm.
3. Bordillustratie, prijssticker en enorme slotslogan namen ruimte in zonder bezoekers verder te helpen.
4. Beige tekstvlakken herhaalden slogans in plaats van nieuwe informatie te geven.
5. Historische mijlpalen en bijbehorende persbronnen waren niet zichtbaar uitgewerkt.
6. De galerij werd volledig verborgen zolang goedgekeurde eventfoto’s ontbraken.
7. De sponsorsectie benutte de gedocumenteerde historische bijdragen niet.
8. “Schuif mee aan” suggereerde een beschikbare inschrijving; voorwaarden en uren waren niet helder gegroepeerd.
9. De screenshots bewezen geen mobiele kwaliteit.

De drie aangeleverde screenshots in `Welzijnswerking_Redesign_Codex/referentie/` zijn bekeken als afkeurreferentie. De hero-referentie is ook gekopieerd naar `qa/redesign/before-hero.jpg`. Er is geen onafhankelijke nieuwe opname van de oude site gebruikt als vóórbewijs: de vroege lokale opname was leeg tijdens de fontwissel en is verwijderd.

## Werkelijk geïmplementeerd

- **Nieuwe art direction:** Instrument Sans voor woordmerk en koppen, Source Sans 3 voor tekst/UI; lokaal geladen, uitsluitend normale sans-serif. Dennengroen `#173B34`, warm wit `#F8F6F0`, inkt `#1B2B27`, rustig bordeaux `#78333D` en een klein goudaccent.
- **Hero:** groene tekstzone naast een beeldvullende uitsnede, normale H1 van 64px op 1440px, 44px op 390px en 39px op 320px. Feitenstrip en praktische CTA staan op alle geteste breedtes boven de vouw. Geen bord, besteklogo, prijssticker of boekingssuggestie.
- **Compositie:** donkere fotografische hero, compacte lichte intro met genummerde inhoudsrij, sagegroene geschiedenis met bordeaux 2025-paneel, wit beeldarchief, contrasterend praktisch blok, typografische historische partnerlijst en compacte groene footer.
- **Geschiedenis:** jaren negentig als oorsprong van de traditie, 25ste editie in 2019 met meer dan 750 senioren en ruim 140 vrijwilligers, herstart/26ste editie 2025 met circa 650 gasten. Bronlinks en expliciet historische doelgroep.
- **Galerij:** productierijpe hoofdafbeelding met aanvullende foto’s, jaartal, credit, optionele lokale responsive varianten, object-position, lazy loading en lightbox. Bij nul goedgekeurde beelden blijft een eerlijk archiefbericht zichtbaar. Publicatie vereist ook een niet-lege credit.
- **Praktisch:** bevestigde datum, plek en bijdrage apart van aanvang, doelgroep, tickets en menu. De status over deelname is niet aanklikbaar zolang er geen bevestigde ticketflow is. Werkende routeplanner, officiële bereikbaarheidslink en datumherinnering zonder verzonnen tijd.
- **Partners:** actuele logo’s komen alleen door de bestaande expliciete verificatievoorwaarden; categorieën, sortering, schaalbaar grid en volledig zichtbare beeldverhouding. Zonder actuele lijst een compacte status. De zeven historische betrokken organisaties staan afzonderlijk, met hun feitelijke rol en bronnen. De centrale keuken is onderdeel van Stad Oostende.
- **SEO en delen:** Nederlandstalige metadata, canonical, datumgebonden Event JSON-LD zonder onbevestigde Offer/tijd/beschikbaarheid, nieuwe groene sans-serif deelkaart en sobere monogramfavicon.

## Gewijzigde bestanden

| Onderdeel | Bestanden |
|---|---|
| Fonts/dependencies | `package.json`, `package-lock.json` — twee fontpakketten vervangen; Astro behouden |
| Styling | `src/styles/tokens.css`, `src/styles/global.css` — volledig nieuwe visuele en responsive architectuur |
| Pagina/layout | `src/pages/index.astro`, `src/layouts/BaseLayout.astro` |
| Header en hero | `src/components/SiteHeader.astro`, `src/components/EventHero.astro` |
| Inhoud/geschiedenis | `src/components/StorySection.astro`, nieuw `src/components/HistorySection.astro`, nieuw `src/data/history.ts` |
| Galerij | `src/components/PhotoGallery.astro`, `src/data/gallery.ts`, `src/data/publication.mjs` |
| Praktisch/partners/footer | `src/components/PracticalInfo.astro`, `src/components/SponsorGrid.astro`, `src/components/SiteFooter.astro` |
| Oude afsluiting | `src/components/FinalInvitation.astro` verwijderd |
| Centrale inhoud | `data/inhoud_2026.json` — nieuwe titel/subtitel, geen onbevestigde velden ingevuld |
| Deelassets | `public/favicon.svg`, `public/social-card.svg`, `public/og-image.jpg`, `scripts/generate-social-card.mjs` |
| Development-preview | nieuw `src/pages/dev-preview/[mode].astro` — alleen development; geen productieroute |
| QA | `scripts/browser-qa.mjs`, `scripts/modules-qa.mjs`, `scripts/content.test.mjs`, `qa/redesign/*` |
| Documentatie | `README.md`, nieuw `CONTENT_TODO.md`, `qa/REDESIGN_RAPPORT.md`, `qa/RESULTATEN.md` |

De werkmap was bij aanvang geheel untracked in Git. Er zijn geen bestaande gebruikerswijzigingen teruggedraaid en er is geen commit of deployment aangemaakt.

## Inhoud en broncontrole

De volgende 2026-feiten staan in de publieke variant: donderdag 24 december 2026, Kursaal Oostende, Kursaal-Westhelling 12, 8400 Oostende, feestelijk meergangendiner, € 5 per persoon en vzw Welzijnswerking Oostende. Geen aanvangsuur, vast aantal gangen, drankformule, entertainment, doelgroep of ticketbeschikbaarheid wordt uit 2025 overgenomen.

De historische bijdragen zijn gecontroleerd tegen `03_ONDERZOEK_EN_BRONNEN.md`, `data/partners_2025_onderzoek.csv` en de bronnen. De inhoud van de KW-doorplaatsing is rechtstreeks gelezen: aperitiefhapjes Revi Food; vissoep Restaurant North met Rederij Desmit; garnalenvoorgerecht chef Sam Vancoppenolle/Gastrobar Sam; hoofdgerecht stedelijke centrale keuken. Melinda FM bevestigt de leerlingen en keukenmedewerkers. De locatie/communicatie van Kursaal blijft een historische rol, geen financiële sponsorclaim.

Bronnen op de website:

- [Focus & WTV, editie 2019](https://focus-wtv.be/nieuws/kerstfeest-kursaal-voor-750-senioren-en-alleenstaanden)
- [Melinda FM, 26 december 2025](https://melindafm.be/regionaal-nieuws-vrijdag-26-december-2025/)
- [KW via Nieuwskoppen, herstart en culinaire bijdragen](https://www.nieuwskoppen.be/2025/11/14/opnieuw-kerstfeest-voor-alleenstaande-senioren-in-het-kursaal-van-oostende-veel-mensen-hadden-heimwee-naar-het-avondfeest/)
- [Historische evenementaankondiging 2025](https://allevents.in/ostend/kerstfeest-voor-alleenstaande-senioren/200029283951130)
- [Officiële bereikbaarheid Kursaal](https://www.kursaaloostende.be/nl/praktisch/bereikbaarheid)

Er zijn geen originele goedgekeurde eventfoto’s of officiële sponsorlogo’s gevonden in de werkmap. De daarvoor bedoelde mappen bevatten alleen de aanleverinstructies of zijn leeg. Er zijn geen persbeelden gescrapet en geen sponsors of foto’s verzonnen. Het hero-beeld is zichtbaar als AI-sfeerbeeld gelabeld.

## Visuele correctieronde

De eerste en definitieve viewport- en sectiescreenshots zijn daadwerkelijk geopend en beoordeeld. Gecorrigeerd:

1. De laatste kolom van de hero-feitenstrip was te smal op mobiel/tablet; “Per persoon” blijft nu netjes op één regel.
2. Het galerijgrid is op desktop naar drie kolommen aangepast zodat zes beelden een samenhangende compositie vormen, zonder een losse zesde kaart onder een vrijwel lege rij.
3. Op mobiel vult een laatste even genummerde foto de hele rij.
4. De verborgen skiplink gebruikt clipping zodat hij ook bij lange element-screenshots geen onbedoeld zichtbaar artefact oplevert; bij toetsenbordfocus verschijnt hij volledig.
5. Een ontbrekende woordspatie bij het mobiele praktische kopje is gecorrigeerd.
6. De development-preview gebruikt aparte routes voor vier en twintig items, omdat queryparameters bij prerendering niet als inhoudsbron beschikbaar zijn.

## Definitieve browserresultaten

Getest met Playwright en lokaal Chromium op de daadwerkelijke statische build, naast development-modulecontrole. De vier vereiste formaten hebben zowel een viewport-opname als een volledige pagina-opname.

| Viewport | Datum/plaats/prijs + CTA eerste scherm | Horizontale overflow | Kapotte beelden | Axe-overtredingen | Screenshot volledige pagina |
|---|---|---|---|---|---|
| 1440 × 900 | Ja | Geen | 0 | 0 | `qa/redesign/full-1440.png` |
| 390 × 844 | Ja | Geen | 0 | 0 | `qa/redesign/full-390.png` |
| 320 × 740 | Ja | Geen | 0 | 0 | `qa/redesign/full-320.png` |
| 768 × 1024 | Ja | Geen | 0 | 0 | `qa/redesign/full-768.png` |
| 1024 × 900 | Ja | Geen | 0 | 0 | Geautomatiseerde layoutcontrole |
| 1920 × 1080 | Ja | Geen | 0 | 0 | Geautomatiseerde layoutcontrole |

Per verplicht formaat bestaan ook `viewport-{breedte}.png`, `edities-{breedte}.png`, `praktisch-{breedte}.png` en `partners-{breedte}.png`. Machineleesbare resultaten: `qa/redesign/report.json`.

Alle elf zichtbare desktop-anchors, de vier mobiele navigatie-items, header- en hero-CTA, terug-naar-boven en footer-CTA zijn aangeklikt. Het mobiele menu is getest met Enter, Escape, focusherstel, klik buiten het menu, selectie van elk item en resize. De skiplink en gedownloade iCalendar-datumherinnering werken. De twee routelinks openen de juiste externe bestemmingen. Alle zes unieke externe links antwoordden HTTP 200; Google Maps kan eerst zijn toestemmingspagina tonen.

Geen JavaScriptfouten, ontbrekende interne anchors of foutresponses voor lokale productieassets. Alle geteste koppen gebruiken normale Instrument Sans. Axe is uitgevoerd voor WCAG 2 A/AA, 2.1 AA en 2.2 AA; dit is geen volledige menselijke toegankelijkheidscertificering.

## Uitbreidingscontrole galerij en sponsors

- Routes in development: `/dev-preview/modules-4` en `/dev-preview/modules-20`.
- Zes duidelijk gelabelde **DEMO / GEEN ECHTE EDITIEFOTO**-objecten, zonder historische jaartallen, met de bestaande illustratieve sfeerbeelden als uitsluitend lokale layoutfixtures.
- Vier en twintig duidelijk als demo gemarkeerde testlogo’s in brede, vierkante en staande beeldverhoudingen. Geen merklogo’s of echte sponsorclaims.
- Alle acht combinaties (vier viewports × twee aantallen) hebben nul overflow, kapotte beelden of axe-overtredingen.
- Lightbox: pijltoetsen, cyclisch vorige/volgende, zichtbare navigatieknoppen, sluitknop, Escape, focusinsluiting en focusherstel geslaagd. Ook het geopende dialoogvenster heeft nul axe-overtredingen.
- Productiebuild bevat geen development-previewroute en geen demogalerij of demosponsors in de homepage.
- Beelden: `qa/redesign/demo-gallery-{4|20}-{breedte}.png`, `demo-sponsors-{4|20}-{breedte}.png`, `demo-lightbox-390.png`. Resultaten: `qa/redesign/modules-report.json`.

## Build en inhoudstests

- `npm run build`: geslaagd, Astro/TypeScript **0 errors, 0 warnings, 0 hints**; uitsluitend de homepage gebouwd.
- `npm test`: **5/5 geslaagd** — fotorechten/credits/jaartallen/lokale paden, sponsorverificatie, padbeveiliging, ticketstatussen en veilige externe URL’s.
- `node scripts/browser-qa.mjs`: geslaagd.
- `node scripts/modules-qa.mjs`: geslaagd.
- Geen afzonderlijk lintscript aanwezig. Geen nieuwe framework- of UI-dependencies toegevoegd; alleen de twee fonts vervangen.

## Openstaande inhoudsblokkades

**BLOKKADE: nog 6–10 originele goedgekeurde eventfoto’s nodig voor definitieve galerij.** De productievariant toont daarom nog geen echte fotoreeks, wel de zichtbare tijdlijn, reportages en het archiefbericht.

Ook de definitieve 2026-sponsorlijst en logorechten, uren, doelgroep, inschrijfwijze/ticketlink, menu/dranken en vzw-contact ontbreken. Aanvullend zaal/ingang, eventueel vervoer en specifieke toegankelijkheidsafspraken bevestigen. Concrete invulplaatsen en publicatievoorwaarden staan in `CONTENT_TODO.md` en `README.md`.

Het redesign en de componenten zijn geïmplementeerd en getest. De volledige inhoudelijke publicatieafwerking blijft afhankelijk van die echte aanleveringen.
