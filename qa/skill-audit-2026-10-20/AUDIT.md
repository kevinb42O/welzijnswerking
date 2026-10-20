# UI-audit — Welzijnswerking Oostende

Datum: 20 oktober 2026. Onderzocht: de huidige lokale productiebuild op `http://127.0.0.1:4325/`. De geserveerde HTML is met SHA-256 vergeleken met de vers gebouwde `dist/index.html`: identiek. Deze audit doet geen uitspraak over een eventueel afwijkende live versie.

## Oordeel over de samenhang

**Geslaagd voor productspecifieke samenhang, met gerichte verbeterpunten.** De kersttafel, donkergroene accenten, echte editiebeelden en concrete inschrijfroute vormen een herkenbare evenementwebsite. De inhoud komt grotendeels uit centrale gegevens. De aparte behandeling van historische bijdragers en actuele sponsors is zorgvuldig.

De hoogste prioriteit is de leesbaarheid van de kleine tekst op de hero-foto. Daarna volgen duidelijkheid over de doelgroep en het verwijderen van een verouderde verwijzing naar de voorwaarden van 2026. Een volledige visuele vervanging is op basis van deze audit niet nodig.

## Indicatieve gezondheidsscore

Dit is een diagnostische score op basis van de vijf skill-dimensies, geen WCAG-certificaat of objectieve maat voor esthetische kwaliteit.

| Dimensie | Score | Bevinding |
|---|---:|---|
| Toegankelijkheid | 2/4 | Goede semantiek en toetsenbordbediening, maar kleine hero-tekst heeft plaatselijk onvoldoende contrast. |
| Prestaties | 4/4 | Statische uitvoer, kleine scripts, lokale fonts, responsive en lazy beelden; geen waargenomen layoutverschuiving in de lokale startsituaties. |
| Ontwerptokens en thema | 3/4 | Centrale palet- en fonttokens; diverse componentkleuren en timings staan nog los in CSS. Een donker thema is niet vereist door de huidige opdracht. |
| Responsive gedrag | 3/4 | Zeven breedtes en 200% tekst blijven binnen het scherm; footernavigatie blijft onder de gewenste 44px-aanraakhoogte. |
| Implementatiesamenhang | 3/4 | Samenhangend product, met verouderde tekst en enkele onderbrekingen in de gebruikerservaring. |
| **Totaal** | **15/20** | **Goed — gerichte verbetering nodig.** |

Bevindingen: **0 P0, 1 P1, 5 P2, 2 P3**. P1 vraagt aandacht vóór publicatie; P2 verbetert duidelijkheid en bediening; P3 betreft afwerking.

## Bevindingen op prioriteit

### F1 — [P1] Kleine hero-tekst heeft plaatselijk onvoldoende contrast

- **Locatie:** [EventHero.astro:19](../../src/components/EventHero.astro#L19), [campaign.css:24](../../src/styles/campaign.css#L24); ook het label op [EventHero.astro:17](../../src/components/EventHero.astro#L17).
- **Categorie:** Toegankelijkheid.
- **Bewijs:** de nominale CSS-voorgrondkleur is vergeleken met de werkelijk gerenderde foto plus overlay achter de letters. De intro haalt minimaal **3,954:1 op 390px** en **3,986:1 op 1440px**. Het kleine label haalt op 390px plaatselijk **4,471:1**. De meting is herhaald met identieke resultaten.
- **Gevolg:** op lichte delen van de foto is de tekst minder leesbaar, vooral voor bezoekers met verminderd contrastzicht.
- **Norm:** [WCAG 2.2, 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html): normale tekst minimaal 4,5:1. De grote cursieve titel haalt in deze steekproef net boven 3:1 en is daarom niet als overtreding aangemerkt.
- **Aanpak:** geef het tekstgebied een voldoende donkere, stabiele ondergrond of pas de overlay en beeldpositie gericht aan; controleer opnieuw op meerdere uitsneden. Richt op enige marge boven de grens.
- **Voorgesteld:** `$impeccable harden`, daarna `$impeccable audit`.
- **Bewijsbestanden:** `hero-contrast.json`, `contrast-original-390.png`, `contrast-background-390.png` en de overeenkomstige desktopbeelden. Reproduceerbaar met `node qa/skill-audit-2026-10-20/contrast.mjs`.

Axe rapporteerde voor de tekst op deze beeldachtergrond een **onvolledige beoordeling**, geen bewezen contrastpass. Deze aanvullende meting is daarom apart uitgevoerd. De meting gebruikt CSS-voorgrondkleuren; de lichtere anti-aliasingpixels van de letters worden niet als tekstkleur gebruikt.

### F2 — [P2] Het archief suggereert dat de voorwaarden voor 2026 nog onbekend zijn

- **Locatie:** [HistorySection.astro:11](../../src/components/HistorySection.astro#L11).
- **Categorie:** Implementatiesamenhang / inhoud.
- **Bewijs:** er staat: “De editie 2025 was voor alleenstaande 65-plussers. De voorwaarden voor 2026 worden apart bekendgemaakt.” De actuele evenementdata en praktische sectie vermelden al “Voor alleenstaanden vanaf 50 jaar.”
- **Gevolg:** een bezoeker kan na het lezen van het archief opnieuw twijfelen of de actuele voorwaarden al vaststaan. Het jaartal 2025 zelf is correct historisch gelabeld; het probleem is de verouderde vervolgzinsnede over 2026.
- **Aanpak:** behoud het historische feit, maar verwijs voor 2026 naar de actuele deelnamevoorwaarden en gebruik daarvoor de centrale data.
- **Norm:** duidelijkheid en consistente productinformatie; geen specifieke WCAG-overtreding vastgesteld.
- **Voorgesteld:** `$impeccable clarify`.

### F3 — [P2] De doelgroep is niet zichtbaar bij de eerste inschrijfbeslissing

- **Locatie:** [EventHero.astro:19](../../src/components/EventHero.astro#L19), [WelcomeSection.astro:14](../../src/components/WelcomeSection.astro#L14), [PracticalInfo.astro:44](../../src/components/PracticalInfo.astro#L44).
- **Categorie:** Informatiehiërarchie / implementatiesamenhang.
- **Bewijs:** de hero noemt datum, uur, locatie en prijs, maar geen leeftijds- of deelnamevoorwaarden. De FAQ “Is dit feest voor mij?” is standaard dicht. De eerste `additional-details`-groep met de zichtbare doelgroep begint op mobiel pas rond **y=2227px**; de eigenlijke doelgroepregel ligt nog verder. De inschrijfkaart staat ervoor.
- **Gevolg:** mensen zien een uitnodiging om in te schrijven voordat ze zonder extra actie kunnen vaststellen of het feest voor hen bedoeld is.
- **Aanpak:** toon “Voor alleenstaanden vanaf 50 jaar” ook compact bij de hero of bovenaan de inschrijfkaart. Behoud de uitgebreidere uitleg bij praktisch.
- **Norm:** vindbaarheid en taakgerichte hiërarchie; geen technische toegankelijkheidsfout.
- **Voorgesteld:** `$impeccable clarify` en `$impeccable layout`.

### F4 — [P2] De footernavigatie heeft kleine aanraakvlakken

- **Locatie:** [campaign.css:50](../../src/styles/campaign.css#L50), desktopvariant op [campaign.css:52](../../src/styles/campaign.css#L52).
- **Categorie:** Responsive / bediening.
- **Bewijs:** de vier footerlinks zijn **36px hoog op mobiel** en **32px op desktop**. Hun hoogte is ook in de browser gemeten. Diverse inline bronlinks zijn nog kleiner; die zijn niet automatisch als aparte overtredingen geteld.
- **Gevolg:** de links vragen meer precisie dan nodig, met name op een touchscreen en voor bezoekers met minder fijne motoriek.
- **Aanpak:** maak zelfstandige navigatielinks minimaal 44px hoog zonder de typografie onnodig te vergroten.
- **Norm:** 44px is hier de gewenste gebruikskwaliteit. Dit is **geen bewezen WCAG 2.5.8-overtreding**: dat AA-criterium heeft een 24px-minimum en uitzonderingen, onder meer voor inline links. Zie [W3C Target Size Minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).
- **Voorgesteld:** `$impeccable adapt`.

### F5 — [P2] Fotovergroting opent een los WebP-bestand in een nieuw tabblad

- **Locatie:** [EventArchive.astro:16](../../src/components/EventArchive.astro#L16) en regel 17.
- **Categorie:** Interactie / implementatiesamenhang.
- **Bewijs:** de zeven actuele editiebeelden linken rechtstreeks naar een beeldbestand met `target="_blank"`. De reeds aanwezige lightbox in `PhotoGallery.astro` is niet aangesloten op deze reeks; de optionele galerij heeft momenteel geen records.
- **Gevolg:** vergroting verlaat de samenhang van de site. De bezoeker krijgt geen geïntegreerde vorige/volgende-bediening en moet het nieuwe tabblad weer sluiten.
- **Aanpak:** bied één toetsenbordbedienbare beeldviewer met zichtbare sluitknop, bijschrift en focusterugkeer. Behoud de afbeeldingslink als fallback wanneer JavaScript ontbreekt.
- **Norm:** continuïteit, controle en voorspelbaarheid uit Apple Design; geen zelfstandige WCAG-overtreding vastgesteld.
- **Voorgesteld:** `$impeccable harden`.

### F6 — [P2] De agenda-knop is zonder JavaScript zichtbaar maar doet niets

- **Locatie:** [PracticalInfo.astro:46](../../src/components/PracticalInfo.astro#L46), handler vanaf regel 52.
- **Categorie:** Functionele robuustheid.
- **Bewijs:** de knop blijft zichtbaar in een browsercontext met JavaScript uitgeschakeld. De download wordt uitsluitend door de JavaScript-clickhandler gemaakt. De rest van de belangrijke navigatie en de centrumlijst hebben wel een bruikbare fallback.
- **Gevolg:** bij uitgeschakelde of niet geladen scripts lijkt deze actie beschikbaar, maar kan de bezoeker de herinnering niet downloaden.
- **Aanpak:** genereer een lokaal `.ics`-bestand tijdens de build en gebruik een echte downloadlink, of toon de knop pas nadat de handler beschikbaar is. De huidige agenda-inhoud en Brusselse tijden zijn correct.
- **Norm:** progressive enhancement; geen algemene eis dat iedere website zonder JavaScript moet werken.
- **Voorgesteld:** `$impeccable harden`.

### F7 — [P3] De primaire knoppen missen een bewuste druktoestand

- **Locatie:** [global.css:1](../../src/styles/global.css#L1) en [campaign.css:24](../../src/styles/campaign.css#L24).
- **Categorie:** Interactie-afwerking.
- **Bewijs:** `.button` heeft een hoverbehandeling, maar geen eigen `:active`-toestand. Tikken krijgt daardoor geen doelbewust ontworpen onmiddellijke feedback vóór navigatie.
- **Gevolg:** de interface voelt minder direct dan de Apple-gerichte ontwerpprincipes beogen. De actie zelf functioneert.
- **Aanpak:** voeg een bescheiden onmiddellijke verandering in oppervlak of contrast toe; laat de actie op loslaten plaatsvinden en behoud een duidelijke toetsenbordfocus. Een extra animatiebibliotheek is hiervoor niet nodig.
- **Voorgesteld:** `$impeccable polish`.

### F8 — [P3] Een deel van de visuele waarden staat buiten het tokensysteem

- **Locatie:** [campaign.css:3](../../src/styles/campaign.css#L3), regels 5, 10, 17 en 50; centrale tokens in `tokens.css`.
- **Categorie:** Thema / onderhoudbaarheid.
- **Bewijs:** menu-inkt, backdropkleuren, footer-neutrals en meerdere animatietimings worden rechtstreeks in component-CSS ingesteld, terwijl het hoofdpalet wel tokens heeft.
- **Gevolg:** gerichte contrast- of stijlcorrecties kunnen later uiteen gaan lopen tussen menu, pagina en footer.
- **Aanpak:** geef herhaalde functionele waarden semantische tokens, bijvoorbeeld voor overlay, tekst op donker en korte interactietiming. Behoud bewust gekozen verschillen tussen oppervlakken.
- **Voorgesteld:** `$impeccable polish`.

## Automatische detectie versus oordeel

De detector is uitgevoerd op `src/` en op de gerenderde mobiele pagina. Het gerenderde resultaat staat in `detector-rendered.json`.

- **Lege lightbox-afbeelding in broncode:** geen actief kapot beeld op de homepage. De optionele galerij is niet gerenderd; de lightboxcode vult `src` vóór openen. Niet meegeteld als fout op deze pagina.
- **“Overused font” bij Instrument Serif:** een heuristische waarschuwing, geen functioneel defect. Er is een bewuste bestaande identiteit; een fontwissel volgt niet uit deze audit.
- **Cursieve serif, crème achtergrond en klein label boven een kop:** herkenbare stijlpatronen, maar niet automatisch fout. Ze sluiten aan op het warme evenement. De eventuele keuze voor een strakkere Apple-achtige uitstraling vraagt een ontwerpbesluit, geen mechanische vervanging.
- **Vijf meldingen “gray-on-color” in de footer:** de werkelijke kleurcombinaties zijn circa **8,22:1** en **7,20:1**. Deze meldingen zijn geen contrastfouten en zijn niet als defect meegeteld.
- **Zes adviserende meldingen over korte slotregels/onevenwichtige kop:** mogelijke typografische afwerking. Geen taakblokkade; meegenomen als aandachtspunt bij de afsluitende polish, niet als zes afzonderlijke fouten.

## Positieve bevindingen en uitgevoerde controle

- `npm run build`: 41 Astro-bestanden gecontroleerd, geen fouten of waarschuwingen; één statische pagina gebouwd.
- `npm test`: alle zes inhoudstests geslaagd.
- Chromium op 320, 390, 768, 1000, 1001, 1440 en 1920px: geen horizontale documentoverflow, kapotte beelden of ongeldige interne ankers.
- Geen JavaScript-fouten en geen lokale HTTP-antwoorden vanaf 400 in de uitgevoerde browserroute.
- Axe met WCAG A/AA-tags: nul gerapporteerde overtredingen op de zeven beginsituaties, het open menu en de geopende centrumlijst. De onvolledige contrastbeoordeling van beeldachtergronden is apart onderzocht, zie F1.
- Hoofdactie verwijst naar inschrijven; centrumactie opent de details en brengt de bezoeker naar het juiste onderdeel.
- Mobiel menu: native modal, focus in het menu, Tab/Shift+Tab, Escape, focusterugkeer en navigatie naar een onderdeel gecontroleerd.
- FAQ: er blijft maximaal één antwoord open.
- Agenda bevat `DTSTART:20261224T160000Z` en `DTEND:20261224T203000Z`, dus 17.00–21.30 uur in Brussel op deze datum.
- 200% tekst op 320px, inclusief geopend menu: geen horizontale overflow. Dit is de tekstverdubbelingsmethode van de bestaande project-QA, geen volledige test van alle OS-tekstinstellingen.
- Reduced motion: menuanimatie uit, direct scrollgedrag; de statische eindtoestand en feedback blijven begrijpelijk.
- Zonder JavaScript: navigatie zichtbaar en centrumlijst te openen. Uitzondering: agenda-knop, zie F6.
- WebKit op 390px: geen documentoverflow; menu opent en sluit met Escape.
- Lokale startmetingen: CLS 0, LCP ongeveer 44–148ms. Dezelfde browsercontext is hergebruikt en caching kan optreden. **Geen claim over echte mobiele laadtijden**, trage verbindingen of een prestatiewinst tegenover een vorige versie.

## Apple-gerichte ontwerpbeoordeling

Het huidige ontwerp is warm en redactioneel. Een overeenkomst met apple.com is geen zelfstandig kwaliteitsdoel voor deze sociale uitnodiging. De nuttigste Apple-principes zijn hier: onmiddellijk begrijpen voor wie het is, duidelijke leesbaarheid, directe feedback en de context behouden bij fotovergroting.

De winst zit daarom eerst in F1–F5. Meer glas, blur of beweging toevoegen is niet onderbouwd door deze audit. De bestaande menubackdrop gebruikt al blur; zonder metingen op fysieke apparaten wordt daar geen claim over soepelheid of frameverlies aan verbonden.

## Aanbevolen volgorde

1. **[P1] `$impeccable harden`** — hero-contrast oplossen en opnieuw meten.
2. **[P2] `$impeccable clarify`** — actuele voorwaarden consistent maken en doelgroep vóór de inschrijfbeslissing tonen.
3. **[P2] `$impeccable adapt`** — aanraakvlakken van zelfstandige navigatielinks vergroten.
4. **[P2] `$impeccable harden`** — beeldviewer en agenda-fallback afronden.
5. **[P3] `$impeccable polish`** — terugkerende visuele waarden centraliseren, drukfeedback en laatste typografische details.

Deze stappen kunnen afzonderlijk, samen of in een andere volgorde worden uitgevoerd. Herhaal `$impeccable audit` na de verbeteringen om de score en bewijsstukken te actualiseren.

## Bewijs en grenzen

`browser-report.json` bevat meetgegevens en interactieresultaten. `audit.mjs` en `contrast.mjs` maken de controles reproduceerbaar. Screenshots van mobiel, desktop, het menu, de praktische sectie en 200% tekst staan in dezelfde map.

Geen fysieke iPhone/Android, screenreader, volledige gebruikerstest, externe-linkbeschikbaarheid of live deployment onderzocht. De uitgevoerde touchgerelateerde bediening gebruikt browserautomatisering; er zijn geen custom sleep-/swipe-gebaren op deze pagina getest. De bevindingen zijn geen volledige WCAG-conformiteitsverklaring.

Er zijn uitsluitend auditbestanden toegevoegd. De productcode en evenementdata zijn tijdens deze audit niet aangepast.
