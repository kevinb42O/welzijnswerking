# CODEX — V2: VOLLEDIG HERONTWERP WELZIJNSWERKING.BE

> **DOEL:** HERBOUW DE BESTAANDE ONEPAGER. GEEN COSMETISCHE FIX EN GEEN NIEUWE GENERIEKE LANDINGSPAGE.
>
> **WEBSITE:** https://welzijnswerking.be · vzw Welzijnswerking Oostende · kerstavond 24 december 2026 · Kursaal Oostende · meergangendiner € 5.
>
> **START HIER:** Dit is een correctieopdracht op een bestaande, visueel mislukte eerste implementatie. Bekijk eerst de huidige repository en de bijgeleverde screenshots `referentie/*_FOUT.jpg` (de screenshots tonen de problemen, ze zijn géén inspiratie). Bekijk waar beschikbaar ook de huidige site in de browser. Lees `03_ONDERZOEK_EN_BRONNEN.md`, `data/inhoud_2026.json`, `data/partners_2025_onderzoek.csv`, `04_BEELDBANK_EN_RECHTEN.md` en de originele foto's/logo's als die in de repository staan. Als bestanden ontbreken, zoek ze eerst in de werkmap en vermeld het verschil in het eindrapport.

## 1. Waarom de huidige versie is afgekeurd

De opdrachtgever is webdesigner en noemt de huidige site terecht generieke "AI slop". Concreet te zien in de screenshots/screenrecording:

1. Een **gigantische dunne bordeauxkleurige serif** en veel cursieve accenten domineren de hele pagina. De stijl lijkt op een trouwuitnodiging, niet op een doordachte, eigentijdse kerstorganisatie.
2. De hero begint als een enorm typografisch leeg veld met een getekend bordje / vork / mes, gevolgd door een rechthoekige tafelfoto. Informatie wordt visueel onvoldoende geprioriteerd. De prijs hangt als een decoratieve ronde sticker boven de foto.
3. Er is te veel beige, lege oppervlakte en repetitie. Te veel grote romantische slogans, te weinig echte inhoud en nauwelijks afwisseling in ritme, kleur en fotografie.
4. **De gevraagde galerij met foto's van vorige edities ontbreekt als zichtbaar onderdeel.** De pagina gebruikt grotendeels één illustratief sfeerbeeld. Een publiekssite over een historisch evenement moet bewijs van de traditie tonen, niet alleen artificial mood photography.
5. **De sponsorsectie bestaat uit een bijna leeg vlak** met een vage belofte. Historische samenwerkingen zijn niet benut, het sponsorcomponent krijgt geen echte visuele vorm en de toekomstige 2026-logo's zijn niet voorbereid als visueel volwaardige sectie.
6. De CTA `Schuif mee aan` lijkt een bestaande inschrijving te beloven, terwijl de echte ticketflow nog onbekend is.
7. De grote laatste bordeauxkleurige slogan is weer dezelfde boodschap in een gigantisch lettertype, maar helpt de bezoeker niet verder. De footer is te ondergeschikt.
8. De opname laat alleen een **desktop-scroll** zien. Mobile is dus nog niet bewezen goed. Controleer die zelf expliciet.

**Dit zijn structurele ontwerpfouten. Repareer ze niet door hier en daar een font of padding te veranderen. Refactor de compositie, secties, fonts en contenthiërarchie substantieel.** Hergebruik code, data en assets die functioneel en betrouwbaar zijn; behoud de stack en routes. Het is een redesign van hetzelfde project, geen greenfield herstart.

## 2. De nieuwe creatieve richting: MODERN WARM HUMAN

**Ontwerp een professionele, menselijke, overtuigende kerst-eventpagina die in een sterk portfolio zou passen.** Het is een echt Oostends gemeenschapsevenement, geen luxe dinermerk, geen trouwuitnodiging, geen SaaS-dashboard en geen standaard AI-template.

De sfeer: moderne lokale cultuurwebsite × zorgvuldig ontworpen hospitalitywebsite × warme kerst. Het resultaat mag premium aanvoelen door compositie, licht, beeldkeuze en details, maar nooit chic om het chic-zijn. Eén snelle blik moet datum, plek, prijs en menselijk doel duidelijk maken. Werk met fotografische inhoud, strakke architectuur, een beperkt kleurenpalet, voldoende maar geen buitensporige witruimte, en sterke editorial informatiehiërarchie.

### Ontwerpregels (HARD)

- **VERBODEN:** Fraunces, Cormorant Garamond, DM Serif Display, Playfair Display, Bodoni, Didone, script- en kalligrafielettertypes. **GEEN grote klassieke serifs, geen cursieve titels, geen typografische bloemschikking.**
- Kies bewust een **moderne open sans** voor vrijwel alles: **Instrument Sans** voor titels en **Source Sans 3** voor body/UI (bij niet beschikbare fonts: vergelijkbare open-source sans). Maximaal twee fontfamilies; headings in medium/semibold en expliciet normale `font-style`.
- H1 desktop normaal rond **58–72 px, maximaal 76 px**; mobiel ongeveer 38–46 px. Geen koppen op 110–140px. H2 desktop ~36–48px; mobile ~30–36px. Body 17–19px met uitstekende leesbaarheid. Geen microtekst als essentiële informatie, niet overal UPPERCASE eyebrow labels.
- Kleurtonen: **dennengroen #173B34**, **warm wit #F8F6F0**, **inkt #1B2B27**, **rustig bordeaux #78333D**, **goud #C3A36A** alleen als klein detail. Foto's mogen warmer zijn. Vermijd tien schermhoogtes beige. Gebruik duidelijk contrasterende donkere secties en fotografie.
- Geen full-screen achtergrond met drie lege zinnen. Geen getekend bord met strikje, geen prijssticker, geen cirkelornament op iedere sectie, geen gouden sterrenwolken, geen pseudo-handgetekende random decoraties, geen bloemetjes.
- Geen grote gradient-orbs, glassmorphism, overdreven box shadows, 40px rounded cards, gradients op tekst, nep-badges of massale iconen.
- De kerststemming komt uit echte warmte: beelden, feesttafel, subtiele dennentak, zachte reflecties en maximaal één terugkerend grafisch detail. Hooguit één bescheiden accentdecoratie per *twee* secties.
- **Echte inhoud boven sloganproza:** elke sectie introduceert nuttige informatie, unieke geschiedenis, locatie, fotografie, ticketinformatie of partners. Schrijf kernachtig Vlaams/Nederlands, geen lege Engelse marketingtermen, geen onoprechte emotionele clichés.

### Specifieke art direction

- Maak een helder, modern typografisch **woordmerk** `welzijnswerking` met klein `OOSTENDE` (tenzij een officieel merklogo beschikbaar is). Geen AI-verzonnen embleem of bestek-icoon als logo.
- Gebruik een ritme van donkere fotovlakken / lichte contentsecties / lichte echte galerij / contrastrijke praktische module / sponsors. Houd een consistente grid (max-width ~1200–1320px), goede uitlijning en 12/24/40/64 spacing. Niet alles in dezelfde 50/50 tekstkolommen.
- Responsive vanaf mobiel ontwerpen; op desktop benut je breedte, op mobile absolute duidelijkheid en toegankelijkheid.
- Fotografie moet menselijk en geloofwaardig zijn. AI-sfeerbeelden zijn **illustratief** en mogen nooit als werkelijke eventfoto worden gepresenteerd. Laat bestaande sfeerbeelden desnoods slechts één keer terugkomen, bij voorkeur als hero, niet drie keer dezelfde tafelsetting.
- Organisatie en toegankelijkheid eerst: geen grootdesign ten koste van de 65+-doelgroep van vroegere edities (de officiële doelgroep 2026 moet nog bevestigd worden).

## 3. Informatiehiërarchie en gewenste compositie — bouw exact deze logica

### A. Header

Links woordmerk; rechts `Het kerstfeest`, `Vorige edities`, `Praktisch`, `Partners`. Een CTA `Praktische info` mag. Compact en netjes, leesbaar op mobiel, echt werkende navigatie. Mobile nav-toggle toetsenbordtoegankelijk. Geen zware sticky bar die ruimte opslokt.

### B. HERO: nieuw concept, compleet andere lay-out

**Desktop (1280+):** één sterke split-hero, circa **45–50% tekst / 50–55% beeld**. Links een donker-dennengroen vlak met beperkte tekst; rechts één prachtige brede tafel-foto / evenementfoto indien goedgekeurd. Geen afbeelding onder een gigantische titel op beige. Totaal circa 620–780px hoog op een standaard desktop; houd de belangrijkste feiten en actie zichtbaar zonder te scrollen op 1440×900.

**Mobile:** compacte donker-groene tekstzone, responsive uitsnede foto, daaronder of erin datum/plaats/prijs en primaire CTA. Bovenste ~650–800px tonen de essentie. Geen 3 schermhoogtes hero.

Exacte inhoud als vertrekpunt (verfijn subtiel indien goed):

- Boven: `KERSTFEEST 2026 · OOSTENDE` (klein, leesbaar)
- Hoofdkop: **`Samen kerst vieren in het Kursaal.`** of **`Een warme kerstavond, samen aan tafel.`** Kies er één; geen cursief woord, geen enorme headline over 4 regels.
- 1 korte regel: `Op donderdag 24 december schuiven we samen aan voor een feestelijk meergangendiner.`
- Een duidelijke **informatiestrip** met `24 DEC 2026` · `Kursaal Oostende` · `€ 5 p.p.` (mag op mobiel stapelen); de prijs is geen decoratieve sticker.
- CTA: **`Bekijk de praktische info`** → `#praktisch`. Secundair: **`Ontdek vorige edities`** → `#edities`.
- Als foto AI is: toegankelijk label / footer `Sfeerbeeld ter illustratie`.

Zorg dat teksten altijd leesbaar blijven, foto's subtiel en correct gecropt zijn en heroCTA werkt. Maak eerste indruk boeiend door compositie en fotografie, niet door oversized lettervormen.

### C. Dit is het feest — concreet en kort

Compacte sectie `Een kerstavond om te delen`. Twee korte alinea's, geen vier lege slogans. Vertel: vzw Welzijnswerking Oostende brengt al jaren mensen samen; 2026 opnieuw een meergangenmaaltijd in Kursaal aan €5. Voeg rustige fotografie toe, indien beschikbaar. Vermeld niet dat letterlijk iedereen welkom is zolang de doelgroep 2026 onbekend is.

### D. 2026 op een rij — scanbaar

Drie inhoudsblokken die niet op een generiek icon-card grid lijken:

1. **Feestelijk meergangendiner** — bevestigd; menu wordt later bekendgemaakt.
2. **In het Kursaal Oostende** — bekende locatie en correcte adresgegevens.
3. **Samen aan tafel** — warme ontmoeting, geen beloofd entertainment indien nog onbevestigd.

Werk met subtiele nummers of kleine labels, veel minder proza dan de huidige drie kolommen. Zorg dat deze sectie visueel anders is dan de intro. Als het blok niets nieuws vertelt, schrap het dan en voeg die feiten toe aan praktische info.

### E. Vorige edities — ESSENTIEEL, eindelijk zichtbaar

Maak een echte en visueel overtuigende sectie **`Een traditie met verhalen.`** met een compacte tijdlijn / drie mooie historische milestones:

- `Jaren 90` — ontstaan van de traditie in Oostende (niet stellig wettelijk oprichtingsjaar communiceren).
- `2019` — 25ste editie; meer dan 750 senioren, ruim 140 vrijwilligers. Bron staat in onderzoeksdossier.
- `2025` — herstart na onderbreking; 26ste editie en circa 650 gasten in het Kursaal. Bron staat in onderzoeksdossier.

Voeg bronlinks toe op een rustige manier: `Lees reportage 2019`, `Bekijk reportage 2025` indien de juiste URLs in dossier staan. Nooit een verkeerde foto of een willekeurig Kursaalbeeld presenteren als een historisch evenement.

**Bouw de daadwerkelijke galerij NU al als volwaardige, productieklaar gemaakte sectie**: een grote hoofdafbeelding + 4–8 variabele foto's, editorial grid, jaartal en fotocredit, mobiel 1–2 kolommen, lightbox met escape, arrow keys, sluitknop en correcte focus. Lees goedgekeurde foto's uit centrale data (`year`, `src`, `alt`, `credit`, `permissionReceived`, `publish`). Geen 404's. Kopieer originele foto's uit de bestaande repo als beschikbaar, maar controleer provenance en toestemming.

Als er nog steeds **GEEN** goedgekeurde authentieke foto's zijn:
- De actieve publieke galerij toont geen stock- of AI-foto's als historische waarheid.
- Laat de historische tijdlijn en perslinks **wel zichtbaar** zodat dit deel inhoudelijk waardevol en visueel compleet is.
- Maak optioneel een **development-only galerijpreview** met overduidelijke `DEMO / GEEN ECHTE EDITIEFOTO` overlay voor visuele controle. Die mag nooit op productie actief zijn en mag niet met historische jaartallen gepresenteerd worden.
- In het eindrapport: `BLOKKADE: nog X originele goedgekeurde eventfoto's nodig voor definitieve galerij.` Verberg ontbrekende inhoud niet stilzwijgend.

### F. Praktisch — functioneel het belangrijkste

Bouw een duidelijke, goed toegankelijke donkere-groene of warm-witte sectie `Goed om te weten` die direct vindbaar is en de feiten volledig bevat:

- **Wanneer:** donderdag 24 december 2026.
- **Waar:** Kursaal Oostende, Kursaal-Westhelling 12, 8400 Oostende.
- **Bijdrage:** € 5 per persoon voor het feestelijke meergangendiner.
- **Aanvang:** nog te bevestigen — maak geen uur op basis van 2025.
- **Voor wie:** deelnamevoorwaarden 2026 nog te bevestigen — 2025 was specifiek voor alleenstaande senioren 65+, maar projecteer dat niet zomaar op de huidige editie.
- **Deelnemen / tickets:** nog te bevestigen. Geen `Reserveer nu`/`Schuif mee aan` alsof tickets te koop zijn.
- **Bereikbaarheid:** werkende link naar routeplanner en officiële bereikbaarheidsinfo van het Kursaal.

Als er een echte ticket-URL in eventdata staat, mag je een duidelijke reserveringsknop activeren; anders `Info over deelname volgt binnenkort` als niet-klikbare status. Scheid feiten van nog ontbrekende informatie visueel. Geen FAQ waarvan alle antwoorden “volgt binnenkort” zijn. Neem alleen FAQ op als er echt minimaal 3 relevante, beantwoorde vragen zijn.

### G. Partners en sponsors — HERBOUW, geen leeg wit vlak

Dit moet een volwaardige, waardige, aanpasbare component zijn. Bouw twee **strikt gescheiden** categorieën:

**1. `Partners en sponsors 2026`** (actuele editie)
- Uit `sponsors_2026`-data met optionele sponsorcategorie/rang, sortering, link, logo, alt en `confirmed2026 + logoUsageApproved` verificatie.
- Ontwerp voor 4–40 officiële sponsorlogo's: responsive grid, respecteert aspect ratio, geen afsnijden of colorfilter, grote sponsors mogen groter indien contractueel afgesproken, mobile 2 kolommen waar passend.
- Een incomplete sponsorlijst mag niet als volledig gepresenteerd worden.
- Als lijst leeg is: een **compacte** duidelijke statusregel, géén lege sectie van halve schermhoogte en géén gefingeerde logo's. Maak een demo-grid alleen in lokale development-preview indien nodig en markeer elk item als demo.

**2. `Met dank aan de partners van 2025`** (historisch, informatief)
- Maak een aparte mooie lijst / rustige typografische logomuur **zonder nieuwe 2026 sponsorclaim**.
- Gebruik gedocumenteerde namen uit `data/partners_2025_onderzoek.csv` en vat hun historische bijdrage bondig samen: Stad Oostende / centrale keuken, Revi Food, Restaurant North, Rederij Desmit, Gastrobar Sam / chef Sam Vancoppenolle, GO! Vesaliusinstituut en Kursaal Oostende. Controleer de bronteksten en toon slechts geverifieerde rollen. De centrale keuken is deel van de Stad, geen apart bedrijf. Niet elk betrokken bedrijf was financieel sponsor.
- **Geen ongeautoriseerde merklogo's**; namen in professioneel ontworpen typografische lijst mogen, mits correcte feitelijke formulering. Indien echte goedgekeurde logo's in assets beschikbaar zijn, kunnen ze gebruikt worden.
- Een korte disclaimer `Betrokken bij de editie 2025; de sponsors van 2026 worden afzonderlijk bekendgemaakt.` is nodig.

### H. Footer

Kleine, stijlvolle footer met officiële naam vzw Welzijnswerking Oostende, eventdatum, link naar praktische info, eventuele geverifieerde organisatorcontactgegevens en terug-naar-boven. Toon nooit contact van Kursaal alsof het de vzw is. Eén mooie, afgeronde afsluiting, **NIET** nog een enorm typografisch bordeaux sloganscherm.

## 4. Content en feitelijke regels

**Direct bevestigd door opdrachtgever voor 2026:** donderdag 24-12-2026, Kursaal Oostende, feestelijk meergangenetentje, € 5 per persoon. Domein welzijnswerking.be. Gebruik `vzw Welzijnswerking Oostende` als correcte organisatienaam.

**Historisch 2025:** alleenstaande 65-plussers, circa 650 gasten, vier gangen / amusement volgens historische bron, beginnend omstreeks 17u. Dit zijn GEEN toezeggingen voor 2026.

**Historisch 2019:** 25ste editie met meer dan 750 senioren en ruim 140 vrijwilligers; gebruik uitsluitend in geschiedenis.

**Onbekend 2026:** exact begin- en einduur, menu, dranken, deelnamevoorwaarden, inschrijfmethode/ticketlinks, vervoer, huidige vrijwilligers, definitieve sponsors en hun rangorde/logo's, contactgegevens, authentieke goedgekeurde foto's. Verzin ze niet, en claim niet dat de site klaar voor publicatie is voordat ze voor zover nodig geleverd zijn.

SEO title, og-image, structured event data moeten uitsluitend bevestigde 2026-feiten bevatten. Geen `Offer`/`availability`- of tijdstipclaims zonder bevestiging.

## 5. Coding/integratie — werk ECHT in huidige repository

- Inspecteer package.json / bestaande stack / componenten en wijzig alleen wat nodig is. Houd één snelle onepager, geen nieuwe extra apps of onnodige dependencies.
- Gebruik `event`-, `gallery`- en `sponsors`-data als bron van waarheid, liefst type-safe met expliciete verificatiestatus. De organisatie moet later via één bestand tijden, menu, tickets, galerij en sponsors kunnen invullen.
- Behartig een leesbare componentstructuur en voorkom dubbele content. Maak minstens Hero, History, PhotoGallery, Practical, Sponsors, Footer goed gescheiden.
- Afbeeldingen met WebP/AVIF (where available), responsive `srcset`, correcte `alt`, lazy-load buiten hero. Vermijd hetzelfde illustratieve beeld vijf keer te gebruiken.
- Toegankelijkheid WCAG 2.2 AA als doel: contrast, keyboard, focus, echte labels, minstens 44px touch targets, semantiek, geen essentiële info uitsluitend in een tooltip, geen bewegende elementen die `prefers-reduced-motion` negeren. Website moet ook voor oudere bezoekers makkelijk te gebruiken zijn.
- Zeer korte animaties uitsluitend als ze bijdragen (150–250 ms). Geen sneeuw, tilt, scrolljacking, parallax, confetti, carousels die vanzelf schuiven.
- Geen horizontale scroll. Geen gaten van honderden pixels tussen twee regels informatie, en geen tekstblokken met één zin die een halve schermhoogte innemen.
- Houd `lang="nl-BE"`, canonical `https://welzijnswerking.be/`, meta description, correcte `<time>`.
- Gebruik spellingconsequent `Kursaal` en `Oostende`, niet `Cursaal`.
- Maak een kort `CONTENT_TODO.md` met ontbrekende goedkeuringen: 2026-sponsorlijst + logo's, 6–10 echte foto's + rechten, uren, doelgroep, tickets, menu, vzw-contact; dit is onmisbaar voor echte afwerking.

## 6. NIET KLAAR ZONDER DESKTOP + MOBIEL BEWIJS

Je bent niet klaar zodra `npm run build` slaagt. Voer een concrete visuele QA-ronde uit:

1. Start project, maak screenshots van **minstens** 1440×900, 390×844, 320×740 en 768×1024; indien een browser/tool ontbreekt, meld dit en claim de test niet.
2. Bekijk screenshots echt. Controleer of boven de vouw datum/prijs/Kursaal plus werkende praktische CTA duidelijk zijn. Hero op desktop mag niet beginnen met de oude enorme bordeaux-serif en bordillustratie.
3. Controleer lange en kleine schermen: geen headings buiten beeld, geen geplette body, geen overdreven lege vlakken, geen horizontaal scrollen, geen ongewenste afsnijdingen van gezichten, niet te kleine sponsorlogo's.
4. Klik/test ieder nav-item, CTA, externe route-link, mobiele nav-toggle en eventuele fotolightbox. Geen CTA die op een niet-bestaande boekingsflow lijkt.
5. Inspecteer sponsor- en fotodata: zet tijdelijk 4 en 20 test-sponsors en 6 galerijfoto-objecten in **development-preview** en controleer responsieve grids; verwijder dit demomateriaal uit de productievariant. Let op licenties en nepbeelden.
6. Voer build/lint/typecheck uit voor zover beschikbaar en los fouten op.
7. Lever een duidelijk eindrapport met: gewijzigde bestanden; designkeuzes; welke content feitelijk gepubliceerd wordt; welke zaken nog ontbreken; exacte testresultaten per viewport; paden naar screenshots; openstaande blokkades. Voeg vóór/na-screenshots toe wanneer mogelijk.

### Visuele kwaliteitslat / acceptatiecriteria

- [ ] **100% sans-serif** voor koppen (geen cursieve editorial-serif slop).
- [ ] Datum, locatie, € 5 en praktische CTA in de eerste schermhoogte op desktop en goed vindbaar op mobile.
- [ ] Minstens 4 duidelijk verschillende compositorische momenten, niet één beige canvas met steeds dezelfde serif.
- [ ] Zichtbare **inhoudelijke** geschiedenis 2019/2025, inclusief de juiste historische context.
- [ ] Productieklaar foto- en sponsorcomponent én eerlijk zichtbaar wat er nog ontbreekt.
- [ ] Historische partners van 2025 getoond als **historisch**, niet als bevestigde 2026-sponsors.
- [ ] Geen herhaalde loze slotzin van een volledig scherm hoog.
- [ ] Werkende links/anchors en responsive QA uitgevoerd of expliciet als niet uitgevoerd gemeld.
- [ ] De eerste indruk is modern, menselijk, strak en feestelijk-zonder-kitsch.

## 7. Jouw concrete opdracht nu

**Stop met uitleggen hoe je dit zou kunnen doen en HERBOUW de site daadwerkelijk.**

Werk in deze volgorde:
1. Inspecteer bestanden en bestaande componenten / huidige renders.
2. Schrijf een ultrakorte interne diagnose (max 10 punten), met de screenshotproblemen hierboven.
3. Implementeer een werkelijk nieuwe visuele hiërarchie en componenten.
4. Vul alle bevestigde feiten + historische edities + verantwoord gelabelde historische partners in.
5. Bereid galerij en sponsors volledig voor op echte assets, met development-only demonstratie indien nodig.
6. Controleer build en meerdere viewport-screenshots; voer een eigen visuele correctieronde uit.
7. Meld beknopt wat je hebt gedaan en welke concrete foto's/sponsorlogo's/info nog ontbreken.

**Geen generieke voorstelpagina, geen wireframe, geen moodboard, geen gehaast resultaat. Dit is een revisieopdracht met een duidelijke kwaliteitscontrole.**
