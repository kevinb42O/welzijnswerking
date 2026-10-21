# Toegankelijkheidsaudit — 21 oktober 2026

## Oordeel

De onderzochte lokale productieversie voldoet nog niet aan WCAG 2.2 niveau AA. Er zijn **3 P1-bevindingen en 1 P2-verbeterpunt**. Geen P0-blokkade van de primaire inschrijfinformatieroute gevonden. De basis is goed: semantische HTML, native dialogen en disclosures, duidelijke focus, begrijpelijke informatie en bruikbare alternatieven voor de kaart.

Dit is een technische audit van de volledige publieke onepager met browserinteracties en broncodeonderzoek. Het is geen formele conformiteitsverklaring: er is geen praktijktest met VoiceOver/NVDA, echte spraakbediening of fysieke touchhardware uitgevoerd. De daadwerkelijk geconstateerde A/AA-problemen zijn voldoende om AA-conformiteit nu af te wijzen. Een procentuele toegankelijkheidsscore zou de ontbrekende praktijktests verhullen en wordt daarom niet gegeven.

## Scope en methode

- Versie: huidige werkboom bij Git-commit `f787d70`; de productiebuild opnieuw uitgevoerd. Geen wijzigingen aan applicatiecode, geen publicatie.
- Geteste URL: `http://127.0.0.1:4325/`, geserveerd uit de nieuwe `dist/`-build. De live website en externe bestemmingen zijn niet geaudit.
- Browsers: Playwright Chromium en WebKit, headless op macOS. WebKit is geen volledige Safari/VoiceOver-test.
- **30 axe-scans**: per browser desktop 1440 px; 320, 390 en 768 px; open mobiel menu; open FAQ; alle centra en uren open; kaart open; andere kaartselectie; fotoviewer; 200% tekst bij 320 px; menu en kaart met die tekstvergroting; WCAG-tekstafstand; forced-colors-emulatie.
- Aanvullend: viewport 320 × 256, 390 × 844 en 1280 × 900 met 200% tekst; toetsenbordbediening, focusterugkeer, kaartselectie na zoom, toegankelijkheidsboom van de h1, werking zonder JavaScript en live reduced-motion-wijziging.
- Tekstvergroting: root-font van 100% naar 200%. Reflow: een viewport van 320 CSS-px; 320 × 256 benadert de beschikbare CSS-ruimte bij 400% browserzoom op 1280 × 1024. De browserzoom zelf is niet via de browserinterface bediend.
- Tekstafstand: regelhoogte 1,5; letterafstand 0,12 em; woordafstand 0,16 em; paragraafafstand 2 em.
- Contrast hero: pixels van de echte achtergrond onder tekst bemonsterd bij 320, 390, 455, 768, 1000, 1001, 1440 en 1920 px; 64 metingen. CSS-voorgrondkleur gebruikt, geen contrast berekend op antialiasingranden.
- Norm: [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/), A en AA. De [Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md) zijn aanvullend gebruikt. De Impeccable-detector is eenmaal over `src` uitgevoerd.
- `npm run build`: 67 bestanden gecontroleerd, 0 fouten, 0 waarschuwingen; productiebuild geslaagd. Dit zegt op zichzelf niets over WCAG-conformiteit.

## Bevindingen

### A01 — P1 — Zichtbare labels ontbreken in de toegankelijke naam

**Norm:** WCAG 2.5.3 Label in Name (A). **Impact:** gebruikers van spraakbediening spreken de zichtbare tekst uit, maar die komt niet overeen met de naam waarmee het element beschikbaar is. Ook ziende schermlezergebruikers krijgen afwijkende benamingen.

Een systematisch probleem op vijftien bedieningspunten, bevestigd in beide browsers:

| Zichtbare tekst | Toegankelijke naam | Bron |
|---|---|---|
| Menu | Open de navigatie | `src/components/SiteHeader.astro:8` |
| Sluiten | Sluit de navigatie | `src/components/SiteHeader.astro:11` |
| Sluiten | Sluit foto | `src/components/PhotoViewer.astro:8` |
| Route plannen | Route naar [centrum] in Google Maps… | `src/scripts/centre-map.ts:42` |
| Info bij Stad Oostende | Openingsuren en info over [centrum]… | `src/scripts/centre-map.ts:42` |
| 1 tot en met 9 op kaartmarkers | Toon [centrum], [wijk] — zonder het nummer | `src/scripts/centre-map.ts:47` |
| [centrum] · Foto: Stad Oostende | Foto van [centrum], bron Stad Oostende… | `src/scripts/centre-finder.ts:48` |

**Reproduceren:** open bij 390 px het menu, de fotoviewer en vervolgens de kaart. Inspecteer de namen in de toegankelijkheidsboom of voer axe uit inclusief `wcag21a`. De bestaande oudere tests nemen die tag niet mee en missen daardoor dit criterium.

**Oplossing:** gebruik de zichtbare tekst als begin van de naam. Bijvoorbeeld `Menu openen`, `Sluiten — navigatie`, `Sluiten — foto`, `Route plannen naar De Boeie…`, `Info bij Stad Oostende over De Boeie…`, `1. Toon De Boeie, Centrum`. Laat de fotobron zijn naam uit de zichtbare inhoud halen en voeg de tabbladmelding als verborgen tekst toe, of neem de volledige zichtbare tekst over in `aria-label`.

**Acceptatie:** alle vijftien namen bevatten hun zichtbare tekst/nummer; ook na centrumwissel en kaartzoom. Geen `label-content-name-mismatch` in de betrokken toestanden. Suggested command: `$impeccable harden`.

### A02 — P1 — Automatische sleeanimatie langer dan vijf seconden zonder stopbediening

**Norm:** WCAG 2.2.2 Pause, Stop, Hide (A). **Bron:** `src/scripts/motion.ts:205`, `:278`, `:291`; de scene staat in `src/components/EventHero.astro:28`.

De feitenstrook komt automatisch gedurende 10 seconden binnen, samen met de slee. Daarna volgen 0,6 seconde voor het losmaken en 2,8 seconden voor het vertrek. Andere inhoud staat tegelijk op de pagina. Er is geen aangeboden knop om deze niet-essentiële beweging te pauzeren, stoppen of verbergen. In Chromium was `data-sleigh-state` ruim vijf seconden na de start nog `playing`; screenshot bewaard.

**Impact:** afleiding en problemen met rustig lezen van juist de datum, locatie en prijs; extra belasting voor bezoekers die beweging moeilijk verdragen. Ondersteuning voor `prefers-reduced-motion` werkt, maar biedt bezoekers zonder die vooraf ingestelde voorkeur geen directe stopbediening.

**Oplossing:** voeg een zichtbare, toetsenbordbedienbare stopknop toe die de strook direct op haar leesbare eindpositie zet en de decoratie opruimt. Een andere oplossing is de volledige automatische bewegingsreeks tot maximaal vijf seconden beperken. De bestaande visuele identiteit kan behouden blijven.

**Acceptatie:** bezoekers kunnen de beweging op de pagina stoppen, of de complete beweging duurt maximaal vijf seconden. Datum, prijs en locatie zijn daarna direct leesbaar. Reduced motion blijft de reeks overslaan, ook bij live voorkeurwijziging. Suggested command: `$impeccable animate`.

### A03 — P1 — De foto verdwijnt bij weinig verticale ruimte

**Norm:** WCAG 1.4.10 Reflow (AA), verlies van inhoud bij de onderzochte zoom-equivalente viewport. **Bron:** `src/styles/campaign.css:113` en `src/styles/campaign.css:134`.

**Reproduceren:** zet de viewport op 320 × 256 CSS-px en open de eerste archieffoto. In Chromium én WebKit is de fotostage **0 px hoog**. De foto is gedecodeerd en aanwezig in de DOM, maar visueel verdwenen. Sluiten, bijschrift en Vorige/Volgende blijven zichtbaar. De dialoghoogte en scrollhoogte zijn beide 232 px: er is ook geen scrollbare fotoinhoud om terug te vinden.

**Oorzaak:** de vaste viewportgebonden dialoghoogte wordt verdeeld over bediening, status en bijschrift; `minmax(0,1fr)` staat toe dat de beeldrij volledig instort. De afbeelding is absoluut gepositioneerd en bewaart geen eigen minimumruimte.

**Impact:** slechtziende bezoekers die sterk inzoomen kunnen de foto niet meer bekijken. De tweedimensionale aard van een foto rechtvaardigt geen volledig verlies van het beeld.

**Oplossing:** geef de beeldruimte een bruikbare minimumhoogte en laat de dialoginhoud bij weinig hoogte verticaal scrollen; verminder zo nodig de lege statusruimte en gebruik compactere bediening. Zorg dat alle knoppen bereikbaar blijven.

**Acceptatie:** bij 320 × 256 blijft een zichtbaar beeld beschikbaar, eventueel via scrollen, naast bereikbaar bijschrift en bediening; opnieuw controleren met echte browserzoom op 400%. Bewijs: `chromium-viewer-320-256.png` en `webkit-viewer-320-256.png`. Suggested command: `$impeccable adapt`.

### A04 — P2 — Horizontale scroll bij 200% tekst op een smal scherm

**Bron:** `src/styles/campaign.css:91` (`.practical-composition`, `.participation-note`) en `src/styles/buttons.css:70` (`overflow-wrap:normal` op de inschrijfknop).

Bij 320 px breedte met de root-font op 200% groeit de documentbreedte in beide browsers naar **417 px**. De inschrijfkaart en praktische gegevens schuiven buiten de viewport. Het lange knopwoord kan onvoldoende afbreken; de impliciete gridkolom neemt de intrinsieke minimumbreedte over.

**Impact:** mensen met grote tekst moeten zijwaarts scrollen om praktische informatie te lezen. De combinatie is relevant voor deze doelgroep.

**Normduiding:** dit is een robuustheidsverbetering. Bij 320 px en normale tekst is geen horizontale scroll gevonden; bij 1280 px en 200% tekst evenmin. Horizontale scroll bij deze gecombineerde extra belasting bewijst op zichzelf geen overtreding van 1.4.4. Geen afzonderlijke bevestigde WCAG-fout geteld.

**Oplossing:** gebruik `minmax(0,1fr)` voor de smalle gridkolom, `min-width:0` op de gridkinderen en een veilige woordafbreking binnen de inschrijfknop. Herstel de oorzaak in plaats van horizontale overflow te verbergen.

**Acceptatie:** documentbreedte maximaal 320 px bij 200% tekst, alle tekst en acties volledig beschikbaar. Bewijs: `chromium-text-200.png`, `webkit-text-200.png`, `zoom-detail.png`. Suggested command: `$impeccable adapt`.

## Wat goed werkt

- Eén logisch benoemde h1; de toegankelijkheidsboom leest de afzonderlijke visuele titelregels als “Vier kerstavond samen in het Kursaal.” De samengeplakte `textContent` is hier geen schermlezerfout.
- `lang="nl-BE"`, betekenisvolle paginatitel en hoofdlandmarks. Koppen vormen een begrijpelijke hiërarchie.
- Geen ontbrekende `alt`-attributen of gebroken interne ankers gevonden. Informatieve foto's hebben inhoudelijke beschrijvingen; decoratieve iconen worden verborgen voor hulptechnologie. De inhoudelijke overeenkomst van alle alt-teksten is op broncode beoordeeld, niet via een afzonderlijke menselijke fotoreview.
- De overslaanlink werkt bij expliciete toetsenbordfocus. Chromium vervolgt bij de heroactie. De standaard Tab-instellingen van WebKit op macOS slaan sommige links over; daarom is de aanvankelijke automatische Tab-meting niet als websitefout aangemerkt.
- Menu en fotoviewer gebruiken `showModal()`: de achtergrond is inert; Tab blijft binnen het venster; Escape sluit; de focus keert terug naar de opener. Zichtbare focusstijlen zijn aanwezig.
- Kaartmarkers zijn benoemde knoppen met selectiestatus. Selecteren met Space werkt ook na kaartzoom. De native centrumselectie en adres-/telefoon-/routelijst bieden alternatieven voor kaartgebaren. De kaart sluiten brengt de focus na het native toggle-event terug naar “Toon op kaart”.
- Filtering heeft statusmeldingen en behoudt de focus bij de bediening. Openingsuren gebruiken beschrijvingslijsten; de FAQ en centrumdetails zijn native disclosures.
- Zonder JavaScript: navigatie beschikbaar, alle negen centra zichtbaar, contactgegevens uitklapbaar en zeven gewone fotolinks bruikbaar.
- Geen horizontale overflow bij de gewone 320, 390, 768 en 1440 px-tests of bij de opgelegde tekstafstanden.
- Menu, viewer en hoofdacties hebben ruime bediening. Kleine bronlinks zijn niet automatisch als WCAG-fout geteld: uitzonderingen voor lopende tekst en/of voldoende tussenruimte moeten worden toegepast. 44 × 44 px is een nuttig ontwerpdoel, maar niet de algemene AA-grens van 2.5.8.
- Reduced motion slaat de lange animatie over. Tijdens afspelen overschakelen naar reduce beëindigt de reeks daadwerkelijk (`done`). Geen audio of videospelers op de pagina.
- Geen JavaScript-runtimefouten tijdens de 30 axe-toestanden.

## Contrast en automatische meldingen: gecontroleerde interpretatie

| Gemeten hero-tekst | Laagste verhouding | Vereiste in deze weergaven | Resultaat |
|---|---:|---:|---|
| Datum/bovenregel | 5,55:1 | 4,5:1 | Voldoende |
| Eerste titelregel | 6,33:1 | 3:1 | Voldoende |
| Gouden “samen” | 4,44:1 | 3:1, grote tekst | Voldoende |
| Laatste titelregel | 6,43:1 | 3:1 | Voldoende |
| Intro | 6,85:1 | 4,5:1 | Voldoende |
| Doelgroep | 6,76:1 | 4,5:1 | Voldoende |
| Heroactie | 7,98:1 | 4,5:1 | Voldoende |

Deze metingen gelden voor de geteste breedtes en stilstaande toestand; zij zijn geen bewijs voor iedere denkbare afbeeldingspositie of animatieframe.

- Axe meldt in forced-colors drie knoppen als vrijwel wit op wit (1,03:1). De gerenderde Chromium-screenshot toont daadwerkelijk **blauwe tekst op wit**. Computed styles en de door het forced-colors-palet geschilderde kleuren lopen hier uiteen. Deze drie meldingen zijn daarom **niet als contrastfout opgenomen**. Een echte Windows High Contrast-test blijft gewenst. De plus/minvormen worden in deze emulatie minder duidelijk: de met achtergrondkleur getekende lijnen verdwijnen; een border/currentColor-uitvoering verdient controle tijdens die praktijktest.
- Axe kan de fotoachtergrond en knopgradiënten vaak niet automatisch beoordelen; “incomplete” is geen overtreding. De hero is daarom afzonderlijk pixelmatig gemeten. Voor de gewone blauwe knop geven de gedefinieerde gradiëntkleuren voldoende contrast met de lichte tekst; hover en active veranderen de helderheid slechts beperkt.
- `aria-controls` verwijst correct naar aanwezige, gesloten dialogen. De incomplete melding over hun onzichtbare ID-doel is niet als fout overgenomen.
- `#centre-results` heeft `aria-labelledby` op een generieke div. Die benoeming biedt geen betrouwbare extra landmarksemantiek; de zichtbare h3 blijft beschikbaar. Verwijder het overbodige attribuut of maak er bewust een benoemde region van. Geen afzonderlijk gebruikersblokkerend probleem geteld.
- Detector: 29 meldingen (28 adviezen over maten/kleuren/hoeken en 1 fontwaarschuwing). De hero-fontuitzondering is expliciet in DESIGN.md vastgelegd. Deze meldingen zijn geen zelfstandig bewijs voor een toegankelijkheidsfout en zijn niet bij de vier bevindingen opgeteld.

## Dekking van WCAG 2.2 A/AA

“Geen probleem gevonden” betekent uitsluitend binnen de beschreven technische controles; het is geen formele goedkeuring van elk criterium.

| Criteria | Uitkomst en grond |
|---|---|
| 1.1.1 | Alternatieven aanwezig; broncodecontrole. Menselijke vergelijking van alle foto's met beschrijvingen blijft aanvullend nodig. |
| 1.2.1–1.2.5 | Niet van toepassing: geen audio/video met inhoud. Decoratieve Lottie valt onder beweging, zie A02. |
| 1.3.1, 1.3.2 | Geen probleem gevonden in HTML-structuur, leesvolgorde en toegankelijkheidsboom; volledige schermlezerdoorgang nog open. |
| 1.3.3 | Geen essentiële instructies uitsluitend via vorm, kleur of positie gevonden. |
| 1.3.4 | Geen oriëntatieblokkade in de code; layout blijft responsive. Fysieke rotatietest niet uitgevoerd. |
| 1.3.5 | Niet van toepassing: geen velden voor persoonsgegevens. De wijk- en centrumselectie zijn geen persoonsgegevensvelden. |
| 1.4.1 | Selectie gebruikt status, indicator en tekst, geen essentiële kleurafhankelijkheid gevonden. |
| 1.4.2 | Niet van toepassing: geen automatisch geluid. |
| 1.4.3 | Geen bevestigde contrastfout; hero gemeten, gewone tekst door axe onderzocht; forced-colors-foutpositieven apart verklaard. |
| 1.4.4 | 200% tekst getest; op desktop geen overflow. Extra smalle combinatie levert A04 op, zonder bewezen inhoudsverlies. |
| 1.4.5 | Logo als tekstafbeelding is een merkuitzondering; overige essentiële tekst is HTML. |
| 1.4.10 | **Voldoet niet: A03.** Normale paginareflow op 320 px werkt; viewer verliest de foto bij geringe hoogte. |
| 1.4.11 | Bediening/focus visueel en in CSS beoordeeld; echte high-contrast-praktijktest en kaartachtergronden bij alle zoomniveaus blijven open. |
| 1.4.12 | Geteste tekstafstanden zonder horizontale overflow; screenshots bewaard. |
| 1.4.13 | Native titels en kaarttooltips aanwezig; volledige hover-/focus-tooltiptest met hulptechnologie blijft open. Geen extra issue geconcludeerd. |
| 2.1.1, 2.1.2 | Belangrijkste interacties met toetsenbord getest; geen ongewenste trap gevonden. Menu/viewer sluiten met Escape. |
| 2.1.4 | Alleen pijltjes binnen viewer/kaart; geen globale enkelletter-sneltoetsen gevonden. |
| 2.2.1 | Geen sessie- of invultijdslimiet. |
| 2.2.2 | **Voldoet niet: A02.** |
| 2.3.1 | Geen bedoelde flitsinhoud gevonden; geen instrumentele flitsfrequentieanalyse uitgevoerd. |
| 2.4.1, 2.4.2 | Overslaanlink en paginatitel aanwezig en gecontroleerd. |
| 2.4.3 | Geteste focusvolgorde en focusterugkeer bruikbaar; platformafhankelijke Tab-instelling apart geduid. |
| 2.4.4 | Linkdoelen uit tekst/context begrijpelijk; namenprobleem apart onder 2.5.3. |
| 2.4.5 | Niet van toepassing op een enkele publieke webpagina; interne navigatie naar secties aanwezig. |
| 2.4.6, 2.4.7 | Beschrijvende koppen/labels en zichtbare focus aanwezig; zie A01 voor overeenkomst met zichtbare tekst. |
| 2.4.11 | Geen volledige focusbedekking door eigen vaste overlays gevonden in geteste interacties. De header is niet sticky. |
| 2.5.1 | Kaart heeft knoppen/selectie en lijstalternatief; fysieke multitouch niet uitgevoerd. |
| 2.5.2 | Native klikbediening; viewer sluit bij buitenklik pas na pointerup en controle van begin/eindpositie. Geen actie-op-pointerdownprobleem gevonden. |
| 2.5.3 | **Voldoet niet: A01.** |
| 2.5.4 | Niet van toepassing: geen bewegingsactivering. |
| 2.5.7 | Kaartverplaatsing heeft toetsenbordbediening; centrumkeuze en routes zijn zonder slepen bruikbaar. Fysieke gebarentest blijft open. |
| 2.5.8 | Hoofdcontrols ruim genoeg; kleine tekstlinks beoordeeld met uitzondering voor tekst/tussenruimte. Geen bevestigde overtreding gevonden. |
| 3.1.1 | `nl-BE` correct aanwezig. |
| 3.1.2 | Geen omvangrijke anderstalige passages gevonden; eigennamen behoeven geen taalwissel. |
| 3.2.1, 3.2.2 | Focus opent geen externe context; selecties werken lokaal en hebben een statusmelding. |
| 3.2.3, 3.2.4 | Eén publieke pagina; herhaalde bediening consistent, behalve de benoemingsfouten onder A01. |
| 3.2.6 | Contactinformatie staat op dezelfde pagina; geen reeks pagina's met wisselende hulpplaatsing. |
| 3.3.1–3.3.4 | Geen invoer-/betalingsformulier of onomkeerbare datamutatie. Labels van de twee selecties aanwezig. |
| 3.3.7, 3.3.8 | Niet van toepassing: geen herhaalde gegevensinvoer of authenticatie. |
| 4.1.2 | Native rollen en toestanden aanwezig; dialognamen en selectiestatus onderzocht. Generieke divbenoeming als verbeteradvies hierboven. |
| 4.1.3 | Statusregio's voor filtering, fotoladen en kaartfouten aanwezig. Daadwerkelijke aankondigingen met VoiceOver/NVDA nog niet beluisterd. |

## Herstelvolgorde en aanvullende verificatie

1. **P1 — `$impeccable harden`:** toegankelijke namen gelijk laten beginnen met de zichtbare tekst; bestaande axe-tests uitbreiden met `wcag21a`.
2. **P1 — `$impeccable animate`:** stopbediening voor de slee of complete bewegingsreeks maximaal vijf seconden.
3. **P1 — `$impeccable adapt`:** fotostage beschermen tegen instorten en dialog laten scrollen bij weinig hoogte.
4. **P2 — `$impeccable adapt`:** praktische informatie zonder horizontale scroll bij de gecombineerde 320 px / 200%-tekstbelasting.
5. **`$impeccable polish`:** afsluitende controle van focus, afbreking en alle gewijzigde toestanden; daarna de toegankelijkheidsaudit herhalen.

Voordat een formele conformiteitsclaim wordt gedaan: de hele inschrijfinformatieroute met VoiceOver/Safari en NVDA/Firefox of Chrome doorlopen; de zichtbare labels met spraakbediening activeren; echte 200%/400% browserzoom, Windows High Contrast en mobiele kaartgebaren controleren. Controleer daarbij ook dat live-regio's begrijpelijk aankondigen zonder onnodig hele blokken te herhalen. Deze praktijktests zijn open verificatiepunten, geen veronderstelde extra fouten.

De herstelcommando's kunnen afzonderlijk, samen of in een gekozen volgorde uitgevoerd worden. De audit heeft alleen rapportage en bewijs toegevoegd.

## Bewijs en herhaalbaarheid

- `audit.mjs`: de 30 browser-/axe-scans; `results.json`: volledige ruwe resultaten en incomplete checks; `run.log`: compacte uitvoer.
- `manual-checks.mjs`, `manual-checks.json`: aanvullende geometrie, toetsenbordtests en motion-bewijs. De eerste verkennende uitvoering liep vast omdat een geladen foto met 0 px hoogte terecht niet als zichtbaar gold; de definitieve uitvoering meet dit expliciet en voltooit.
- `contrast/hero-contrast.json` en screenshots: alle 64 contrastmetingen; herhaalbaar met `QA_OUT_DIR=qa/accessibility-2026-10-21/contrast node scripts/hero-contrast-qa.mjs`.
- `detector.json`: volledig detectorresultaat, niet verward met WCAG-bevindingen.
- PNG's in deze map: gewone viewports, tekstvergroting, tekstafstand, forced colors, fotoviewer en automatische beweging na vijf seconden.

Herhaal vanaf de projectroot met de actuele productiepreview op poort 4325: `node qa/accessibility-2026-10-21/audit.mjs` en `node qa/accessibility-2026-10-21/manual-checks.mjs`.
