# MASTERPROMPT VOOR CODEX — WELZIJNSWERKING OOSTENDE / KERSTFEEST 2026

> **GEBRUIK:** Kopieer deze volledige prompt naar Codex in de projectmap waarin je het bijbehorende onderzoeks- en assetpakket hebt uitgepakt. **De opdracht is niet om opnieuw een plan te schrijven, maar om een fantastische, werkende website te bouwen.**
>
> **Domein:** `https://welzijnswerking.be` (niet `welzijnswerken.be`).
>
> **Periode:** ontwerp voor de aankondiging van **donderdag 24 december 2026**.

---

# 0. JOUW OPDRACHT EN ROL

Je bent een uitzonderlijk sterke **creative director, senior frontend developer, interaction designer, art director, UX-designer en accessibility engineer**. Bouw een volledig werkende, volledig responsive, prachtige **single-page** Nederlandstalige (BE) evenementenwebsite voor **vzw Welzijnswerking Oostende**: een feestelijk **meergangenkerstdiner** op **24 december 2026** in **Kursaal Oostende**, met een **deelnameprijs van € 5**. De gebruiker is een professionele webdesigner. Lever dus geen gemiddeld template en geen generiek AI-landingspagina-design, maar een afgewerkt, premium ogend concept waarvan de details kloppen.

De toon is **feestelijk, menselijk, hartverwarmend, elegant, toegankelijk, modern, eenvoudig, rijk aan sfeer maar absoluut niet kitscherig**. De sfeer voelt als een stijlvolle, persoonlijke kerstuitnodiging op warm papier: Oostende, kaarslicht, dennengroen, een zachte goudglans, bordeauxrode accenten. Menselijke verbinding staat boven verkoop.

Werk zelfstandig en direct in de repository. Inspecteer eerst wat aanwezig is. Als er nog geen bruikbaar frontendproject is, maak er één. Lees de bestanden in deze bundel en gebruik ze effectief. Maak de website, voer een build uit, herstel problemen en controleer waar mogelijk met screenshots. Vraag in deze eerste uitvoerfase geen reeks verduidelijkingen: onzekere gegevens krijgen veilige, centraal wijzigbare placeholders en worden **niet verzonnen**.

**Projectsucces:** een bezoeker van 70 jaar kan op smartphone in minder dan 10 seconden begrijpen: wat is het evenement, wanneer, waar, hoeveel kost het, voor wie is het (indien bevestigd), hoe kan men deelnemen (indien bevestigd), hoe bereikt men het Kursaal. Een jongere vrijwilliger of sponsor vindt er eveneens direct de juiste informatie. Een webdesigner is onder de indruk van de compositie, finesse, detaillering en responsiviteit.

---

# 1. VERPLICHTE INPUTBESTANDEN — LEES DEZE EERST

Ga er vanuit dat de volgende bestanden of mappen in het project staan (zo niet: rapporteer welke ontbreken):

1. `01_START_HIER.md` — hoe de researchbundel in elkaar zit.
2. `03_ONDERZOEK_EN_BRONNEN.md` — feitelijke geschiedenis, 2025 en 2019, bronnen, zekerheidsgraden.
3. `04_BEELDBANK_EN_RECHTEN.md` — de beschikbare beelden en licentiegrenzen.
4. `05_PUBLICATIE_CHECKLIST.md` — vereisten en ontbrekende gegevens.
5. `data/inhoud_2026.json` — 2026-gegevens en onbekende velden.
6. `data/sponsors_2026.template.json` — sponsorobjecten voor een uitbreidbare sectie.
7. `data/partners_2025_onderzoek.csv` — historische betrokkenen, géén goedgekeurde 2026-sponsors.
8. `assets/sfeerbeelden/*.webp`, `assets/sfeerbeelden/social-preview.jpg` — bruikbare kerstsfeer.
9. `assets/decoratie/*.svg` — subtiele originele ornamenten.
10. `assets/fotos-vorige-edities/` en `assets/sponsors/` — nog aan te vullen met goedgekeurde echte foto's en logo's.

Neem relevante assets op in de gebouwde site (bijvoorbeeld onder `public/images/`) met dezelfde naam of een helder gedocumenteerde mapping. Optimaliseer, maar neem geen ongemerkte vrijheden met auteursrechtelijk beschermde persfoto's.

### Cruciale waarheid / grenzen

**Door de opdrachtgever bevestigd voor 2026:**
- Datum: **donderdag 24 december 2026**.
- Plaats: **Kursaal Oostende**.
- Prijs: **€ 5**.
- Een feestelijk **meergangenetentje**.
- Er zullen foto's van vorige jaren en sponsorlogo's op de site verschijnen zodra die worden aangeleverd.

**HISTORISCH, dus NIET automatisch bevestigd voor 2026:**
- De specifieke doelgroep `alleenstaande 65-plussers` was 2025.
- In 2025 begon het evenement omstreeks 17 uur.
- Het 2025-evenement had vier gangen met verschillende dranken, tombola, dans, animatie, kerstman.
- Het evenement van 2025 had ongeveer 650 bezoekers en was de 26ste editie.
- De editie van 2019 trok meer dan 750 senioren en ruim 140 vrijwilligers.
- Revi Food, North, Rederij Desmit, Gastrobar Sam, Stad Oostende, het Vesaliusinstituut en Kursaal waren in 2025 op verschillende manieren betrokken.
- Ticketkanalen uit 2025 zijn niet automatisch geldig in 2026.

**Nog onbekend voor 2026:** begin- en einduur, exact menu, drankformule, definitieve doelgroep en voorwaarden, exacte zaal, officiële directe ticketlink, gratis plaatsen, eventuele toegankelijkheidsvoorzieningen en vervoer, actuele sponsorlijst en organisatiecontact. Maak hiervoor nette datastructuren en een veilige publieksweergave. Zet nooit oude gegevens ongemerkt als nieuw op de site. Vul geen sponsors, personeelsnamen, citaten, testimonials, exacte menu's, foto's van echte vorige edities of ticketlinks zelf in.

**Let op het onderscheid:** vzw `Welzijnswerking Oostende` is de organisator; `Kursaal Oostende` is de locatie. Gebruik het algemene Kursaalcontact niet als eigen contactgegevens van de vzw.

---

# 2. CONCEPT, VISUELE IDENTITEIT & EMOTIE

## 2.1 Overkoepelend concept

**Werknaam: `Samen aan tafel`.**

Visuele metafoor: `een warme uitnodiging aan een mooi gedekte tafel`.

Hoofdheadline / hero:

**Kerstavond vieren we samen.**

Onderliggende gedachte: het mooiste aan kerst is het gezelschap. Voeg subtiele, menselijke elegantie toe. Geen zwaar religieuze symboliek, geen Amerikaanse kerstmanclichés, geen pushy ticketsales, geen commerciële e-commerce-uitstraling. Een beeldverhaal over verbondenheid, licht en tafelgenoten. Het resultaat moet esthetisch aansluiten bij een fraai ontworpen boutique event invitation en in beleving juist bij een warme welzijnsorganisatie passen.

## 2.2 Visuele keywords

- Stijlvolle kerstavond, warm goud licht, diep dennengroen, rustig bordeaux, gebroken wit.
- Grote redactionele fotografie, warme negatieve ruimte, fijne lijnen, sierlijke typografie.
- Licht papieren textuur op effen achtergronden (CSS/noise alleen subtiel en performant).
- Kleine goudkleurige ornamenten en een fijn takje, niet een scherm vol kerstballen.
- Verhalende composities: een groot hero-beeld, asymmetrische maar gebalanceerde secties, een artistieke fotogalerij, rustige sponsorloge.
- Per sectie max één decoratief statement: bv. een ster, een gouden lijn of één takje.
- Typografie, whitespace en contrast dragen het design. Gebruik **geen** overmatige blurs of gradient-glow graphics en maak geen standaard SaaS-dashboardlayout met twintig identieke kaarten.

## 2.3 Strikt kleurensysteem

Gebruik CSS custom properties; vertrek vanuit onderstaande palet en stel hem subtiel bij als echte beelden daarom vragen:

```css
:root {
  --pine-950: #102B25;
  --pine-900: #193E34;
  --pine-800: #234A3D;
  --pine-700: #315C4B;
  --wine-700: #822F39;
  --wine-800: #672830;
  --champagne: #D5B777;
  --gold-deep: #AB8749;
  --paper: #FAF4E9;
  --paper-muted: #F3E9D9;
  --ink: #22352F;
  --ink-soft: #526258;
  --white: #FFFFFF;
  --focus-ring: #B2623F;
}
```

Verhouding grofweg: 55% warm papier, 30% donkergroen, 10% fotografie en 5% zachte bordeaux/goudaccenten. Wit op groen moet een goed contrast hebben. Goud is meestal decoratief; plaats geen kleine goudkleurige hoofdtekst op witte achtergrond.

## 2.4 Typografie

- Hero / hoofdstuktitels: bij voorkeur `Fraunces` (expressief maar beheerst), alternatief `Cormorant Garamond` of `DM Serif Display`.
- Lopende tekst, navigatie, CTA en UI: `DM Sans` / `Manrope` / een uitstekende systeem-sans.
- Vermijd 10 verschillende lettertypes of scriptfonts.
- Hero H1 desktop: met `clamp` rond 64–104 px, afhankelijk van viewport; mobiel rond 42–58 px, nette regelafbrekingen.
- Body: **18–20 px** (zeker mobiel, gezien doelgroep 65+ historisch), ruime lijnhoogte circa 1.55–1.75.
- Kleine meta-labels mogelijk 13–14 px, maar geen essentiële info klein maken.
- Font weights rustig; geef goudaccent alleen aan enkele woorden of de datumlijn.
- Gebruik echte Unicode `€ 5`, geen onduidelijke prijsbadge of `vanaf 5€`.
- Waar mogelijk laad fonts performant, zelf gehost of goed geoptimaliseerd, met degelijke fallbacks en `font-display: swap`.

## 2.5 Fijnzinnige kerstdetails

Ontwerp zelf met CSS / meegeleverde SVG's:
- Eén minimalistische goudkleurige vierpuntster naast een sectietitel.
- Dunne, sierlijke gouden scheidingslijn met kleine kersttak, nauwelijks zichtbaar.
- Achtergronddetails die iets van kerstpapier/drukwerk oproepen.
- Een subtiel `24` of `24 DEC` als typografisch groot detail bij praktische informatie.
- Langzame fade/slide-in van secties als browser reduced motion niet aanstaat, hoogstens 150–350 ms.
- **Geen** vallende sneeuw, glitterstorm, autoplay muziek/video, kerstgroeten-popup, scrolljacking of zware Canvas/Three.js effecten.

---

# 3. INFORMATIEARCHITECTUUR — EXACT ÉÉN PAGINA

Maak één duidelijke navigatie en de volgende inhoudelijke volgorde. Geen subpagina's nodig (behalve indien privacywetgeving later een echte aparte pagina vereist).

## Sectie A — Transparante, elegante header

**Doel:** oriëntatie en vertrouwen.

- Links: typografisch wordmark `Welzijnswerking Oostende`, of neutraal conceptlogo als een officieel logo ontbreekt (maak niet de indruk dat dit de echte beschermde huisstijl is).
- Rechts desktop: `Het kerstfeest`, `Sfeerbeelden`, `Praktische info`, `Partners`.
- CTA in header: `Praktische info` of `Deelnemen` **alleen** als hij naar een echte, relevante sectie scrolt; maak geen valse reservatieknop.
- Mobiel: keurige compact header met echte toegankelijke nav-toggle, of 1 duidelijke info-CTA als een hamburgermenu door ruimte krap wordt. Geen overbodige navigatielaag.
- Sticky header toegestaan, maar compact, subtiel en niet ten koste van leeshoogte. Voldoende contrast over de hero; na scroll passende achtergrond.
- `skip to content`, duidelijke focus-states, semantische `header` / `nav`.

## Sectie B — Emotionele hero (`#home`)

**Dé signature van de website.**

- Gebruik `hero-kerstdiner-desktop.webp` als breed achtergrondbeeld en `hero-kerstdiner-mobile.webp` op mobile via `<picture>` of responsive CSS.
- Voeg links een diep dennengroene gradientoeverlay toe zodat de witte tekst altijd leesbaar is. Gebruik het beeld niet oververzadigd: natuurlijke goudtinten.
- Visuele compositie desktop: hero circa 80–90vh, min/max zorgvuldig afgestemd zodat datum, prijs en CTA zichtbaar blijven; foto full-bleed, tekstblok binnen max 1180–1280px container links uitgelijnd.
- Op mobile: eerst woordmerk, dan typografisch sterke titel + korte omschrijving, essentieblokken en CTA op het eerste scherm of net eronder. Foto niet zo groot dat info verborgen raakt. Mobile image-crop focust op de tafelsetting, niet op een willekeurig vingerfragment.
- Kleine eyebrow: `Kerstfeest 2026 · Oostende`.
- Grote H1: `Kerstavond vieren we samen.` met fraaie breaks die op elk scherm overeind blijven.
- Lead: `Een warme tafel, lekker eten en fijn gezelschap. Op 24 december brengt vzw Welzijnswerking Oostende mensen samen in het Kursaal.`
- Compacte essentie:
  - Kalendericoon en `Donderdag 24 december 2026`.
  - Location en `Kursaal Oostende`.
  - Opvallend `€ 5 per persoon` + `feestelijk meergangenetentje`.
- CTA primair: `Ontdek de praktische info` naar `#praktisch` zolang ticketURL ontbreekt.
- CTA secundair: `Bekijk de sfeer` naar `#sfeerbeelden` indien echte galerijfoto's bestaan; anders `Ontdek het kerstfeest` naar `#verhaal`.
- Kleine subtiele scroll-hint alleen desktop en alleen als het design wint.
- Echte alt-tekst indien betekenisvol. Indien decoratief achtergrondbeeld: screenreader niet met valse historische informatie vervuilen.
- AI-beeld mag niet worden aangeduid als `het kerstfeest van 2025`.

## Sectie C — De emotionele intro (`#verhaal`)

Ontwerp: warme crème achtergrond met veel lucht, een kleine goudkleurige ornamentlijn, links een elegant label `Samen aan tafel`, grote serif heading rechts of centraal, body split op desktop.

**Copy (mag tekstueel verfijnd worden zonder informatie te verzinnen):**

Heading: `Het mooiste aan kerst? Samenzijn.`

Tekst: `Kerstavond wordt nog warmer wanneer we die met elkaar delen. Welzijnswerking Oostende brengt al jarenlang mensen samen voor een feestelijke maaltijd, fijne gesprekken en een avond vol ontmoeting.`

Tweede alinea: `Ook in 2026 schuiven we samen aan tafel in het Kursaal van Oostende. Een bijzonder moment om te genieten van een meergangendiner en van elkaars gezelschap.`

Vermijd zinnen als `niemand hoeft alleen te zijn` als absolute garantie of `iedereen is welkom` zolang de voorwaarden onbekend zijn.

Eventueel kleine sidenote: `Een warme kersttraditie in Oostende sinds de jaren negentig.` Niet onterecht exact `sinds 1994 opgericht` claimen omdat het ondernemingsregister een andere oprichtingsdatum toont.

## Sectie D — Wat mag je verwachten? (`#verwachten`)

Doel: deelnemer voelt feestelijkheid, zonder valse programmapunten.

Layout: 3 overzichtelijke info-elementen in een rustige, asymmetrische grid. Maak het géén kaartencatalogus. 1 subtiel beeld van tafelsetting als accent.

- `Samen genieten` — `Een gezellige avond waar ontmoeting en gesprekken centraal staan.`
- `Een feestelijke maaltijd` — `Een verzorgd meergangenetentje voor € 5 per persoon.`
- `In het hart van Oostende` — `Het prachtige Kursaal vormt het decor voor deze kerstavond.`

Indien opdrachtgever programma 2026 bevestigt, laat databestand optionele elementen tonen (muziek, tombola, kerstman), maar toon ze niet als vaststaand zolang onbekend. Geen foto van soep of hert met label `menu 2026`.

## Sectie E — Mooie herinneringen / vorige edities (`#sfeerbeelden`)

Dit is een belangrijk onderdeel van de opdracht, zodra de echte foto's beschikbaar zijn.

Layout: echt editorial photo-gallery design, niet een banale rij van 12 vierkante thumbs. Maak galerij met 1 groter featured landscape item + 2 medium + kleinere 4:3 kaders; reken op variabele afbeeldingsverhoudingen en lage kwaliteit van sommige oudere foto's. Geen zware infinite carousel.

- Eyebrow `Door de jaren heen`.
- Titel `Herinneringen om te koesteren.`
- Intro `Een blik op de warme momenten die deelnemers en vrijwilligers in eerdere edities samen beleefden.`
- Bij elke **echte** evenementfoto een discrete jaarvermelding (bijv. `2025` / `2019`) en waar vereist fotograaf- of broncredit.
- Responsive 1 of 2 kolommen mobiel, toegankelijke tap targets, geen afgesneden gezichten, passende object positions per foto.
- Klik opent toegankelijk modal/lightbox met groot beeld, omschrijving, Escape, toetsenbordnavigatie, focus-management, geen scroll-lock-bugs. Bied desgewenst een compacte afsluitknop.
- Toon alleen records met `publish: true`, `permissionReceived: true`, geldige afbeelding en betrouwbaar `year`. Vang lege/error-states op.
- **Zolang geen originele foto's zijn aangeleverd:** laat het galerijcomponent in code staan en toon een elegante tekst `Sfeerbeelden van de vorige edities volgen binnenkort.` Gebruik GEEN AI-beeld als eerdere editie, geen stockbeelden in het echte archief, geen lege grijze vakjes alsof foto's ontbreken. De ondersteunende kerstbeelden mogen in een aparte decoratieve sectie worden gebruikt, duidelijk niet als documentatie.
- Eventueel historische mini-timeline bij de intro: `2019 · 25ste editie`, `2025 · een warme terugkeer`. Hou feitelijke teksten kort en informatief. `2025 · circa 650 deelnemers` kan, maar niet alsof het een target voor 2026 is.

## Sectie F — Praktisch, altijd direct vindbaar (`#praktisch`)

Deze sectie moet zéér bruikbaar zijn voor senioren. Plaats hem op warm papier met een sterk donker-groen infopaneel of omgekeerd.

Grote titel `Alles op een rij.` / `Praktische informatie`.

**Door opdrachtgever bevestigd:**
- `Wanneer`: `Donderdag 24 december 2026`.
- `Waar`: `Kursaal Oostende, Kursaal-Westhelling 12, 8400 Oostende`.
- `Prijs`: `€ 5 per persoon voor het meergangenetentje`.

**Door organisatie nog te bevestigen:**
- `Aanvang`: `Het exacte uur wordt binnenkort bekendgemaakt.`
- `Voor wie`: `De deelnamevoorwaarden volgen binnenkort.`
- `Tickets / inschrijven`: `Info over tickets en inschrijven volgt binnenkort.`
- `Toegankelijkheid / vervoer`: toon geen concrete toezegging zonder bevestiging. Bied desnoods de algemene `Bereikbaarheid Kursaal`-link aan met heldere vermelding `Algemene route-informatie van het Kursaal`, niet eventafspraken.

Maak `Plan je route` een echte actie, bijvoorbeeld link naar https://www.google.com/maps/search/?api=1&query=Kursaal-Westhelling+12%2C+8400+Oostende (de kaartlocatie dient gecontroleerd). Beter ook een tekstlink naar de officiële bereikbaarheidsinformatie: https://www.kursaaloostende.be/nl/praktisch/bereikbaarheid . Externe link veilig met `rel="noopener noreferrer"` en een niet-opdringerig extern-link icoon.

**Ticketing state machine:**
- `not_confirmed` → primair `Info over deelname volgt` als **tekst**, niet een lege/dode knop; CTA van hero scrolt naar dit paneel.
- `available` + `ticketUrl` → duidelijk `Tickets aanvragen` of `Reserveer je plaats`, link naar de echte officiële ticketprovider; nooit willekeurig Paylogic-link construeren.
- `sold_out` → `Uitverkocht` alleen indien expliciet bevestigd; geef contact of wachtlijst alleen als echt.
- `closed` → evenement voorbij, informatief archief.

Denk aan een duidelijk, geruststellend visueel ritme: iconen + labels + echte waarden. Alle tekst in HTML, niets essentieels alleen in afbeeldingen.

## Sectie G — Partners & sponsors (`#partners`)

**Opdrachtgever eist dat ALLE sponsors later op de pagina passen.** Bouw dit als een volwaardige schaalbare module, niet als achteraf geplakte logo's.

Titel `Samen maken we dit mogelijk.`

Intro `Dankzij de inzet en steun van onze partners, sponsors en vrijwilligers krijgt deze kerstavond vorm. Bedankt aan iedereen die meehelpt.`

Implementatie:
- Lees sponsors centraal uit `src/data/sponsors.ts` of `src/data/sponsors.json` (liefst afgeleid van `data/sponsors_2026.template.json`).
- Alleen officieel **voor 2026 bevestigde** sponsorrecords met goedgekeurde logo's mogen zichtbaar worden als `Sponsors 2026`.
- Een `verified`/`logoUsageApproved` gate in data. Geen logo-src die 404 kan veroorzaken.
- Attributen: `id`, `name`, `category` / `tier`, `description?`, `website?`, `logo?`, `logoAlt`, `confirmedFor2026`, `logoUsageApproved`, `displayOrder`.
- Categorieën bijvoorbeeld `Hoofdpartners`, `Partners`, `Steunende partners` en `Met dank aan` — **niet** aannemen welke historische partij een hoofdsponsor is.
- Hoofdpartners: grotere plaatsing, rustige 2–3-kolommenrij. Overige: nette auto-fit logo-grid voor 4–40 logo's. **Geen bewegende marquee**: logo's zijn vooral voor leesbaarheid, niet voor effect.
- Maak een mooie, uniforme witte of ecru badge-kaderstijl met voldoende ademruimte; contain-fit (never crop logos), natuurlijke verhoudingen, kleur bij originele logo's tenzij contractueel anders.
- Alt: `Logo van [sponsornaam]`, zichtbare tekstnaam als logo onduidelijk is.
- Elke klik leidt alleen naar vooraf geverifieerde officiële sponsorwebsite; open in nieuw tabblad alleen waar gewenst, met toegankelijke link.
- Op mobile logisch 2 kolommen (soms 1 voor lange logo's); desnoods korte naam onder logo zodat mensen hem herkennen.
- Optioneel afsluiter `Ook partner worden?` pas tonen als er een echt contactkanaal is; geen verzonnen e-mail of donatieknop.
- **Momenteel lege 2026-lijst**: toon een smaakvolle sectie met `Onze partners en sponsors voor 2026 worden binnenkort bekendgemaakt.` en geen onbetrouwbare logos.
- In code/design moet onmiddellijk duidelijk zijn hoe de opdrachtgever 25 nieuwe sponsors toevoegt, zonder markup aan te passen.

**Historisch 2025-onderzoek (niet publiceren als huidige 2026-sponsors zonder toestemming):** Revi Food, Restaurant North, Rederij Desmit, Gastrobar Sam / chef Sam Vancoppenolle, Stad Oostende / centrale keuken, GO! Vesaliusinstituut, Kursaal Oostende. Dit is geen volledige sponsorslijst. Raadpleeg `data/partners_2025_onderzoek.csv` met rollen en bronnen.

## Sectie H — Afsluitende warme uitnodiging + footer

Een donkere dennegroene afsluitsectie met een subtiel goudlijnornament, korte emotionele copy, laatste datum/prijs en juiste CTA.

Copyvoorstel:

`Een warme kerstavond begint met samenkomen.`

`We kijken ernaar uit om er samen een bijzonder moment van te maken.`

Knop `Bekijk de praktische informatie` zolang tickets onbekend zijn; later `Deelnemen` met juiste URL.

Footer:
- `vzw Welzijnswerking Oostende`.
- `Kerstfeest · 24 december 2026 · Kursaal Oostende`.
- `© 2026 vzw Welzijnswerking Oostende`.
- Alleen geverifieerde contact-/privacyvelden; geen verzonnen mail, gsm of ondernemingsinformatie.
- `Sfeerbeelden ter illustratie` of transparante credit voor gegenereerde visuals in discrete footer, zodat bezoekers de afbeeldingen niet interpreteren als documentaire weergave.
- Juridische/privacyinfo indien persoonsgegevens verwerkt worden; zonder formulier, tracking en cookies niet onnodig een cookie-popup toevoegen.
- Footer met `Terug naar boven` als toegankelijke link.

---

# 4. MOGELIJKE DESKTOP- EN MOBIELCOMPOSITIE

## 4.1 Desktop 1440 px

- Header over hero; logo links, 4 anchors en compacte CTA rechts.
- Hero breed beeld met donkere focus links en sfeervol diner rechts. Titel over max 680 px, regeleinde elegant: `Kerstavond` / `vieren we samen.`. Meta-informatie in één subtiele regel of losse lichte chips (geen opzichtig badgesysteem).
- Na hero een warme, royale `intentional white space` intro op creme.
- Een visuele `editorial split` sectie met tekstlinks en details rechts.
- Galerij: asymmetrische media met fijne randen, één grote foto en ondersteunende beelden.
- Praktische infosectie: groot donker paneel met links datum en prijs, rechts informatie-elementen; goed scanbaar.
- Sponsorgrid op paper achtergrond met heldere hiërarchie en veel rust.
- Korte footer als final invitation.

## 4.2 Mobile 390 px

- Design op **mobiel is even belangrijk als desktop** en mag niet op een ingekrompen desktop lijken.
- Hero foto passend gecropt; titel 44–54 px / 2–3 regels, geen tekst onder de statusbalk.
- Datum, locatie, prijs direct bij elkaar. Prijs € 5 mag sterker dan overige metadata.
- CTA min 48 px hoog, breed genoeg voor duim, met padding links/rechts min 20 px.
- Secties in zinvolle volgorde, royaal ritme; beeld en tekst liefst niet meer dan 1 kolom wanneer te krap.
- Horizontaal schuiven is nergens nodig, behalve indien er expliciet een door de gebruiker bestuurbare mini-galerij is; liever niet.
- Foto's op mobile 1–2 kolommen, slimme crops, mooie hoeken/afstanden. Historische jaartallen leesbaar.
- Sponsorlogo's gelijkmatig, 2 per rij, geen enorme witte lege vlaktes en geen marges die de tekst tot 200 px breed knijpen.
- Overweeg subtiel sticky onderaan CTA `Praktische info` op mobiel ná het eerste scrolldrempel, maar **alleen** als die belangrijke info niet bedekt of assistieve technologie belemmert. Een mooie statische CTA is ook prima.
- Alle essentiële informatie blijft volledig zichtbaar zonder hover, tabs, accordions of uitklapmenu's.

## 4.3 Breekpunten en controles

Controleer in elk geval breedtes **320, 360, 390, 430, 768, 1024, 1280, 1440, 1920 px**. Gebruik vloeiende `clamp()`-typografie en containers; kies breekpunten inhoudsgedreven. Geen horizontale scrollbar, geen overlopende koppen of logo's, geen onleesbare tekst op foto, geen geplette CTA. Houd viewport-height verschillen op Safari/iOS in gedachten (`svh` / `dvh` zorgvuldig gebruiken).

---

# 5. TECHNISCHE IMPLEMENTATIE — KIES EEN LICHTE, KWALITATIEVE OPLOSSING

## 5.1 Framework

**Als repo leeg is:** gebruik `Astro` + TypeScript + eenvoudige moderne CSS / CSS modules. Dit is een snelle contentgerichte onepager zonder zware client-side runtime. Optioneel `lucide` icons via een lichte aanpak. **Als er al een degelijk React/Next/Vite-project bestaat, respecteer de stack en bouw daarin verder**; migreer niet zonder reden.

Geen CMS en geen backend nodig voor de eerste versie. Sponsor-, foto- en evenementdata in één helder datamodel, zodat inhoud later gemakkelijk te wijzigen is. Voeg dependencies alleen toe als ze concreet waarde toevoegen. Geen generieke UI-template kits die de site standaard laten ogen.

## 5.2 Projectstructuur (richtlijn, pas aan bestaand project aan)

```
src/
  components/
    SiteHeader.astro
    EventHero.astro
    StorySection.astro
    ExperienceSection.astro
    PhotoGallery.astro
    PracticalInfo.astro
    SponsorGrid.astro
    FinalInvitation.astro
    SiteFooter.astro
  data/
    event.ts
    sponsors.ts
    gallery.ts
  layouts/
    BaseLayout.astro
  pages/
    index.astro
  styles/
    tokens.css
    global.css
public/
  images/
    sfeerbeelden/
    event/
    sponsors/
    decoratie/
  favicon.svg
  robots.txt
  og-image.jpg
README.md
```

**Doel:** uitbreidbaarheid zonder over-engineering. Verdeel componenten alleen waar zinvol. Eventueel FAQ-sectie alleen als echte veelgestelde vragen bekend zijn; ga er niet zelf vijf verzinnen.

## 5.3 Centraliseer alle content

Voorzie één `event.ts` met:
- `year`, `dateISO`, `timezone`, `placeName`, `address`, `price`, `currency`, `mealDescription`, `organizerName`.
- `startTime`, `endTime`, `doorsTime`, `eligibility`, `room`, `courseCount`, `includedDrinks`, `menu`, `ticketsUrl`, `ticketStatus`, `organizerContactEmail`, `phone`, `accessibilityDetails`, `transportDetails`, `volunteerInfo` — allemaal `null` / `undefined` zolang onbevestigd.
- `historicalFacts` met historische jaartallen en bronlinks, **nooit ongemerkt** gecombineerd met 2026-facts.
- UI helper om geverifieerde info te renderen of een waardige placeholder.

Sponsor-lijst voorzien met `confirmedFor2026`, `logoUsageApproved`, categorie en `displayOrder`; set leeg bij start. `gallery.ts`: echte fotoobjecten met provenance en publish gating; ook leeg bij start. Lever één README-sectie aan die precies uitlegt hoe bestanden toegevoegd worden en welke data aangepast moet worden.

## 5.4 Responsive assets en afbeeldingen

De bundel heeft de volgende bestanden:
- `assets/sfeerbeelden/hero-kerstdiner-desktop.webp` (breed; hero desktop)
- `assets/sfeerbeelden/hero-kerstdiner-mobile.webp` (verticaal; hero mobiel)
- `assets/sfeerbeelden/sfeer-zaal.webp` (algemene sfeer)
- `assets/sfeerbeelden/sfeer-tafeldecoratie.webp` (algemene sfeer)
- `assets/sfeerbeelden/social-preview.jpg` (1200×630)
- `assets/decoratie/takje.svg`, `assets/decoratie/sparkle.svg`

Gebruik deze direct. Eventuele echte foto's worden later in `assets/fotos-vorige-edities/` gezet; sponsorlogo's in `assets/sponsors/`. Voor de publieke pagina mogen ze na gecontroleerde kopie naar `public/images/`.

Afbeeldingsbeleid:
- Hero `<picture>` of art-directed CSS met responsive sources, passend `object-position`, nooit overgecomprimeerd of vervormd.
- Verklein afbeeldingen op basis van realistische displaymaten; WebP/AVIF gebruiken. Bewaar kwaliteit van gezichten bij echte foto’s.
- Hero eager/high priority waar nuttig, alle foto's daaronder lazy.
- Geef foto-elementen breedte/hoogte of `aspect-ratio` om CLS te voorkomen.
- Alt-tekst beschrijft inhoud; decoratief = `alt=""`; voer nooit foute feitelijke claims in alt in.
- Geen directe links naar pers-CDN als beeldbron, tenzij rechten geregeld.

## 5.5 Micro-interacties

Het platform moet aanvoelen als een tot in de puntjes verzorgde website. Voeg weloverwogen details toe:
- Anchors smooth scrolling met offset voor sticky header, en respect voor reduced motion.
- Zachte nav hover/focus-underline in champagne.
- Interactieve CTA hover van donker bordeaux naar iets lichtere tint of kleine arrow micro-translate (max 3px).
- Galerij lightbox prettig en toegankelijk.
- Rustig section reveal alleen indien performance / accessibility goed blijft.
- Geen scroll reveal dat content onzichtbaar laat als JavaScript faalt.

## 5.6 Performance

- Streef naar Lighthouse 90+ Performance op mobiel wanneer haalbaar; Accessibility/Best Practices/SEO zeer goed.
- Beperk client-JS, geen third-party trackers standaard.
- Lazy-load gallery, `preload` belangrijkste hero/font indien nodig.
- Voorkom meerdere font weights, te veel zware afbeeldingen of CLS.
- CSS met `prefers-reduced-motion`.
- Geen embedded Google Maps iframe; geef tekstadres en link naar route, dat is sneller en privacyvriendelijker.

## 5.7 Toegankelijkheid, specifiek voor oudere doelgroep

Dit is geen optional polish, maar kern van de opdracht:
- WCAG 2.2 AA als praktische richtlijn; streef goede keyboard- en screenreader-ervaring na.
- Semantische HTML5, één H1, logische heading-structuur, landmarks `main`, `nav`, `footer`.
- Basistekst min 18px indien haalbaar, details liever 16px+ dan te klein.
- Kleurcontrast minstens 4.5:1 voor gewone tekst. Champagnegoud slechts bij voldoende contrast.
- Voldoende kleurverschil tussen links en achtergrond, ook zonder hover.
- Focus zichtbaar; klikgebieden minimaal 44x44 px.
- Ondersteun zoom 200%/400% zonder breuk waar mogelijk.
- Geen datum in alleen tekstafbeelding; echte `<time datetime="2026-12-24">`.
- Formuleer in klare, warme taal. Begrijpelijke links (`Plan je route`, niet `Klik hier`).
- Geen automatische sliders of video/muziek.
- Indien lightbox: Escape, pijltoetsen, correct focus-return en toegankelijk close label.

## 5.8 SEO, social sharing en bestandskwaliteit

- Taal: `<html lang="nl-BE">`.
- Title: `Kerstfeest 2026 in Kursaal Oostende | Welzijnswerking Oostende`.
- Description (ongeveer 150–160 tekens): `Vier kerstavond op 24 december 2026 met Welzijnswerking Oostende in het Kursaal. Een feestelijk meergangendiner voor € 5. Praktische info op één plek.`
- Canonical: `https://welzijnswerking.be/`.
- Open Graph / Twitter Cards met lokale `social-preview.jpg`.
- Favicon SVG in dezelfde stijlvolle kerstkleuren, bv. discreet sterretje + W; vermeld dat het een conceptmerk is.
- JSON-LD `Event` mag alleen bevestigde feiten bevatten. `startDate` als ISO-datum zonder verzonnen uur; voeg geen offers, availability of ticketprovider toe zolang niet bevestigd.
- Sitemap/robots passend bij één statische pagina. Geen duplicate sites met http/www.
- Geen fake reviews, testimonials of Google ratings.
- Kwalitatieve linkteksten en deelpreview voor Facebook en WhatsApp (voor dit lokale evenement belangrijk).

## 5.9 GDPR en beheer

- Eerste versie zonder contactformulier, nieuwsbriefformulier en analytics zolang die niet gevraagd zijn. Daardoor geen onnodige verwerking van persoonsgegevens en geen misleidende cookiebanner.
- Zet geen fake e-mail/contactgegevens. Wanneer later een contactformulier nodig is, ontwerp de flow pas na akkoord over bestemming, verwerker, privacygrondslag en spambeveiliging.
- Leg in README uit hoe toekomstige 2027-editie of event-archief aangepast kan worden.
- Vergeet niet dat het domein momenteel alleen is aangekocht: hosting, DNS en SSL zijn aparte deploytaken, **voer geen DNS-mutaties uit** zonder expliciete toegang/opdracht.

---

# 6. CONCRETE COPY — STARTVERSIE VOOR 2026

Gebruik deze tekst als basis en schaaf subtiel bij voor een natuurlijke, warme Belgische stijl. Geen schreeuwerige marketeering.

**Header**
- Merk: `Welzijnswerking Oostende`
- Nav: `Het kerstfeest` · `Sfeerbeelden` · `Praktische info` · `Partners`

**Hero**
- Eyebrow: `Kerstfeest 2026 · Oostende`
- H1: `Kerstavond vieren we samen.`
- Lead: `Een warme tafel, lekker eten en fijn gezelschap. Op 24 december brengt Welzijnswerking Oostende mensen samen in het Kursaal.`
- Feiten: `Donderdag 24 december 2026` · `Kursaal Oostende` · `€ 5 voor een meergangenetentje`
- CTA: `Ontdek de praktische info`

**Verhaal**
- Eyebrow: `Een warme Oostendse traditie`
- H2: `Het mooiste aan kerst? Samenzijn.`
- Body: `Kerstavond wordt nog warmer wanneer we die met elkaar delen. Welzijnswerking Oostende brengt al jaren mensen samen voor een feestelijke maaltijd, fijne gesprekken en een avond vol ontmoeting.`
- Body: `Ook dit jaar schuiven we samen aan tafel voor een bijzondere kerstavond in het Kursaal van Oostende.`

**Ervaring**
- Eyebrow: `Samen beleven`
- H2: `Een avond om naar uit te kijken.`
- `Een feestelijke maaltijd` — `Samen genieten van een verzorgd meergangenetentje.`
- `Warm gezelschap` — `Tijd voor fijne gesprekken, ontmoeting en gezelligheid.`
- `Een bijzondere locatie` — `In het prachtige Kursaal aan zee.`

**Historie / foto**
- Eyebrow: `Door de jaren heen`
- H2: `Mooie momenten blijven bij.`
- Text: `Het kerstfeest heeft al vele warme herinneringen opgeleverd. Bekijk hier binnenkort de sfeerbeelden van eerdere edities.`
- Optioneel historische noot bij authentieke beelden: `Na een onderbreking vond het kerstfeest in 2025 opnieuw plaats in het Kursaal, met ongeveer 650 gasten.` (historisch apart houden)

**Praktische info**
- H2: `Alles wat je wilt weten.`
- `Datum: donderdag 24 december 2026`
- `Locatie: Kursaal Oostende, Kursaal-Westhelling 12, 8400 Oostende`
- `Deelname: € 5 per persoon voor een feestelijk meergangenetentje`
- `Uur: wordt binnenkort bekendgemaakt`
- `Voor wie: informatie over de deelnamevoorwaarden volgt`
- `Inschrijven: praktische informatie volgt binnenkort`
- `Bekijk de bereikbaarheid van het Kursaal` (externe officiele site)

**Sponsors**
- H2: `Samen maken we dit mogelijk.`
- Body: `Dankzij de inzet van partners, sponsors en vrijwilligers wordt deze kerstavond mogelijk gemaakt. Aan iedereen die meehelpt: dank je wel.`
- Default state als leeg: `Onze partners en sponsors voor 2026 worden binnenkort bekendgemaakt.`

**Laatste uitnodiging**
- H2: `Een warme kerstavond begint met samenkomen.`
- Body: `We kijken ernaar uit om er samen een bijzonder moment van te maken.`
- CTA: `Praktische informatie`

**Footer**
- `vzw Welzijnswerking Oostende · Kerstfeest 2026`
- `Kursaal Oostende · 24 december 2026`
- `© 2026 Welzijnswerking Oostende`
- `Illustratieve sfeerbeelden` discreet, zolang de huidige gegenereerde beelden gebruikt worden.

---

# 7. CONCRETE VERWACHTE OUTPUT EN ACCEPTATIECRITERIA

**Je moet daadwerkelijk ontwikkelen, niet uitsluitend adviseren.**

1. Zorg dat een lokaal startcommando werkt (`npm install`, `npm run dev`) en een productie-build (`npm run build`).
2. Maak alle genoemde inhoudssecties af: hero, verhaal, verwachtingen, galerij-voorbereiding, praktische info, sponsor-module, warme afsluiter, footer.
3. Gebruik werkelijk de aangeleverde moderne kerstbeelden. Niet alleen aanroepen vanuit externe URL's; kopieer de geoptimaliseerde lokale assets waar nodig.
4. Lever een hoogwaardig design op 1440px desktop én 390px smartphone, én goed tussenliggende breekpunten.
5. Sponsor- en galerijdata als centraal beheerbare bestanden. **Start lege 2026-sponsorlijst**, geen fictieve logo's.
6. Geen feitelijke fouten in de jaartallen of historisch versus huidige programma.
7. Acties moeten echt werken: alle anchors, bereikbaarheid-link, nav, lightbox indien beelden aanwezig, foutvrije CTA-state.
8. Maak geen dode knoppen of placeholder-links `href="#"`.
9. Semantiek, kleurcontrast, keyboard-focus en reduced motion verzorgd.
10. Meta tags, favicon, social preview, locale, canonical en eenvoudige SEO correct.
11. Geen persoonsgegevens verwerken of cookie-popup toevoegen zonder echte noodzaak.
12. Voeg een **ontwikkelaars-README** toe met:
    - opstarten, build en deploy;
    - sponsor toevoegen (voorbeeldrecord, logo en categorie);
    - echte vorige-editiefoto toevoegen met credit/toestemming;
    - ontbrekende 2026-data aanvullen;
    - ticketstatus wijzigen;
    - domein & hosting instellen na keuze platform;
    - lijst **ONBEVESTIGDE GEGEVENS**.
13. Voer waar mogelijk `npm run build`, lint/typecheck (indien beschikbaar), en test echte links.
14. Maak, als browser/screenshot-capabilities beschikbaar zijn, screenshots op 390 en 1440 pixels; beoordeel visueel en verbeter spacing, typografie, hero-crop en sponsorgedrag. Als screenshots niet kunnen, beschrijf eerlijk wat niet geverifieerd kon worden.
15. Geef aan het einde een beknopt eindrapport met gewijzigde bestanden, startcommando's en eventueel de nog ontbrekende content, maar niet alleen een conceptplan.

## Professionele kwaliteitslat

Een bezoeker moet het gevoel krijgen dat er een **zorgvuldig ontworpen, exclusieve maar uitnodigende kerstuitnodiging** op zijn scherm staat. Niet een onpersoonlijke template. Goede typografie, warme luxe, rust, menselijke fotografie, originele compositie, fijne animatie en werkelijk fantastische mobiele uitwerking. **Simpel** betekent overzichtelijk en moeiteloos — niet kaal, saai of onaf.

**BELANGRIJKSTE REGEL:** maak de eerste versie verrassend mooi met de feiten die er wél zijn. Gebruik de historische details en sponsoronderzoek in de code/documentatie als context, maar publiceer uitsluitend bevestigde 2026-informatie. De organisatie moet daarna in enkele minuten sponsors, fotogalerij, uur en ticketlink kunnen toevoegen zonder opnieuw een designronde te starten.

**BEGIN NU MET HET BOUWEN.**
