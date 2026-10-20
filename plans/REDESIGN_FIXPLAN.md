# Redesignfix — Welzijnswerking Oostende 2026

Datum: 18 oktober 2026. Status: lokaal uitgevoerd; actuele bewijzen en beperkingen staan in `qa/redesign-fix/VISUAL_REVIEW.md`. De oorspronkelijke planningsinhoud hieronder is behouden als uitvoeringsreferentie.

## 1. Gewenst resultaat en uitgangspunt

Een herkenbare, warme kerstcampagne voor een Oostends sociaal evenement, met een overtuigende illustratie, duidelijke bezoekersinformatie en zorgvuldig ontworpen desktop- én mobiele composities. Het eerste scherm maakt meteen duidelijk: kerstfeest, Welzijnswerking Oostende, donderdag 24 december 2026, Kursaal Oostende, meergangenetentje en € 5 per persoon. De bezoeker vindt vervolgens zonder omwegen wat bekend is over deelname en bereikbaarheid.

De huidige groene, getekende richting is het vertrekpunt. De fix verandert de informatievolgorde, schaalverhoudingen, illustratieve uitvoering, mobiele opbouw en stijlarchitectuur. Alleen afstanden en kleuren aanpassen zou de vastgestelde problemen laten bestaan.

### Geldende keuzes

- De actuele vraag en eerdere expliciete koerscorrecties gaan voor op oude briefings en ontwerprapporten.
- Dennengroen, warm papier, een spaarzaam goudaccent en een originele getekende kandelaar blijven.
- Sans-seriftypografie blijft; de twee aanwezige lokale fonts worden gericht ingezet.
- De huidige Astro-onepager, statische bouw en centrale evenementdata blijven de technische basis.
- Geen video, mediabediening, tafelstockfoto's of nieuw gegenereerde fotografie toevoegen.
- De bestaande echte Kursaalfoto wordt ondersteunende locatie-informatie.
- Echte editiefoto's en actuele sponsorlogo's verschijnen zodra goedgekeurde gegevens beschikbaar zijn. De huidige variant moet zelfstandig afgewerkt ogen zonder die aanvullingen.
- Deze opdracht omvat ontwerp en lokale implementatie/controle. Publicatie, hosting en DNS vallen buiten dit plan.

### Succes vanuit de bezoeker

1. Binnen één blik de aard van het evenement, datum, plaats en prijs begrijpen.
2. Met één duidelijke actie de actuele deelname-informatie bereiken.
3. Begrijpen welke gegevens bevestigd zijn en wat later volgt.
4. De locatie en route vinden zonder eerst een geschiedenisverhaal te lezen.
5. De sociale bedoeling ervaren door concrete tekst, lokaal verhaal en warme vormgeving.
6. Alle inhoud op smartphone en met toetsenbord kunnen gebruiken.

## 2. Gecontroleerde beginsituatie

Voor dit plan zijn de huidige lokale pagina op poort 4323, de definitieve desktop- en mobiele screenshots, componenten, data, stylesheets, QA-scripts en relevante briefings bekeken.

| Bevinding | Waar zichtbaar | Ontwerpingreep |
|---|---|---|
| Titel en kandelaar staan als losse objecten naast elkaar | `EventHero.astro`, huidige hero | Eén grid, bewuste balans, vaste relatie tussen kop, beeld en feiten |
| Kaarsvoet raakt op een bestaand desktopformaat de feitenlijn | Lokale browserweergave | Illustratie in eigen gridgebied, expliciete vrije ruimte tot scheidingslijn |
| H1 bereikt 122 px; secundaire onderdelen krijgen eveneens veel nadruk | `campaign.css`, paginascroll | Kleinere, consistente schaal en begrensd aantal nadrukmomenten |
| Mobiele introductie wordt smal naast de tekening gezet | 390px-screenshot | Volle tekstbreedte; illustratie apart positioneren met eigen compacte variant |
| Intro, geschiedenis en credits herhalen kop-plus-kolommen | Volledige desktopscreenshot | Praktische informatie, locatieverhaal en credits elk een eigen structuur geven |
| Praktische informatie volgt pas na introductie, grote foto en geschiedenis | `index.astro` | Direct na hero plaatsen |
| 750+ gasten en jaartal 2025 worden als vergelijkbare grote cijfers gepresenteerd | `HistorySection.astro` | Jaar als tijdsaanduiding, bezoekersaantal als ondergeschikt historisch feit |
| Historische credits nemen veel visuele ruimte in, inclusief groot ’25 | `SponsorGrid.astro` | Compacte namen-/rollenlijst met helder jaartal |
| Stijlen uit meerdere richtingen overschrijven elkaar | `tokens.css`, `global.css`, `campaign.css` | Eén actuele definitie per token/component en logisch gegroepeerde breakpoints |
| Hero en deelbeeld hardcoden titelregels ondanks aanwezige `event.title` | `EventHero.astro`, `generate-social-card.mjs` | Eén gedeelde tekstbron en presentatie die daarvan afgeleid wordt |
| Bestaande tests zijn deels aan huidige classes, volgorde en exacte kleur gekoppeld | QA-scripts | Checks waar nodig op gedrag en semantische onderdelen richten |
| Oude rapporten beschrijven onderling verschillende richtingen | `qa/`, beeldbankdocument | Eén actuele ingang, oudere rondes herkenbaar als archief |

De bestaande technische QA-resultaten zijn historisch bewijs voor die versie. Na het redesign worden nieuwe resultaten vastgelegd; oude cijfers worden niet als nieuwe verificatie gepresenteerd.

## 3. Creatieve richting: een warme, getekende kerstuitnodiging

De pagina krijgt de helderheid van zorgvuldig ontworpen drukwerk: duidelijke hoofdtekst, één kenmerkend beeld, beperkte accenten en een kalme informatiehiërarchie. Het sociale karakter komt uit het gezelschap als onderwerp, begrijpelijke taal en het lokale verhaal. De tekening ondersteunt dat gevoel.

### Concrete vormbeslissingen

- De hero heeft één dominante kop en één illustratie; beide volgen dezelfde verticale compositie.
- De kandelaar krijgt meer vormgevoel en een consequente lijnvoering. Wazige lichtcirkels en losse versieringen verdwijnen.
- Het informatieve gedeelte wordt lichter en directer. Geen nieuwe kaartenrij met drie icoontjes.
- Geschiedenis krijgt chronologie; credits krijgen een leesbare lijst; fotografie krijgt een ondersteunend kader.
- Donkergroen wordt hoofdzakelijk gebruikt in de uitnodiging en de afsluiting. Lichte vlakken dragen leeswerk.
- De originele kandelaar blijft het enige illustratieve hoofdthema. Geen extra sterrenstelsel, golfpatroon of nieuw embleem toevoegen.

### Wat de koers bewaakt

- Geen nieuwe fontwissel als hoofdoplossing.
- Geen verdere vergroting van de titel om een lege hero te vullen.
- Geen herintroductie van verworpen bruine fotografie, video of tafelbeelden.
- Geen fictieve mensen, quotes, sponsorlogo's, menu's of evenementenbeelden.
- Geen oordeel als “premium” of “8/10” zonder concrete visuele onderbouwing.

## 4. Nieuwe informatiearchitectuur

De productievolgorde wordt:

1. **Header** — organisatie en beperkte navigatie.
2. **Uitnodiging/hero** — kerst, gezelschap, bevestigde kernfeiten en primaire actie.
3. **Praktische informatie** — deelname, wat vaststaat, ontbrekende informatie en route.
4. **Het verhaal en de plek** — korte menselijke introductie, ondersteunende Kursaalfoto en geschiedenis.
5. **Foto's van vorige edities** — alleen wanneer goedgekeurde foto's bestaan.
6. **Partners** — actuele sponsors indien aanwezig; duidelijk afzonderlijke historische bedanking.
7. **Footer** — organisator, bevestigde contactgegevens indien aanwezig, credits en terug naar boven.

De hero is de snelle samenvatting; praktisch is de volledige informatiebron. De verdere pagina voegt context toe in plaats van dezelfde gegevens steeds opnieuw uit te schrijven.

### Anchors en navigatie

- Bestaande doelen `#home`, `#inhoud`, `#praktisch`, `#verhaal`, `#edities`, `#partners` blijven bestaan.
- `#sfeerbeelden` bestaat alleen als de echte galerij zichtbaar is; links ernaartoe volgen diezelfde conditie.
- Desktop: woordmerk links; `Praktisch`, `Het kerstfeest`, `Vorige edities`, `Partners` rechts. Praktisch staat vooraan; geen extra omkaderde knop die dezelfde bestemming direct ernaast herhaalt.
- Mobiel: woordmerk en herkenbare menuknop; praktische actie staat in de hero.
- Menu-items volgen de paginalogica. `Partners` blijft passend wanneer later actuele sponsors worden toegevoegd; binnen de sectie staat het relevante editiejaar expliciet.
- Interne tekstlinks gebruiken een rustige pijl naar beneden of rechts. Externe links mogen een kleine uitgaande pijl krijgen. Pijlen dragen nooit zelfstandig de betekenis.

## 5. Grid, kleuren, typografie en ruimte

Onderstaande waarden zijn implementatiedoelen. De uiteindelijke regelafbreking en optische balans worden in de browser beoordeeld; ruimteproblemen worden eerst in de compositie opgelost.

### Grid

| Onderdeel | Desktop | Tablet | Mobiel |
|---|---|---|---|
| Contentbreedte | Maximaal 1200 px | Beschikbare breedte met 32 px zijruimte | 20–24 px zijruimte; 20 px op 320 |
| Basissysteem | 12 kolommen waar nodig | 6 kolommen waar nodig | Eén hoofdleeskolom |
| Hero | Tekst circa 7/12, illustratie circa 5/12 | Twee kolommen zolang tekst en beeld passen | Tekst volle breedte, compacte illustratie op eigen plek |
| Lopende tekst | Meestal 55–68 tekens per regel | Zelfde doel waar haalbaar | Beschikbare leesbreedte |
| Sectieafstand | Meestal 64–80 px | Meestal 48–64 px | Meestal 40–48 px |
| Interne afstand | 8, 12, 16, 24, 32, 48 px | Dezelfde reeks | Dezelfde reeks |

Geen verplichte gelijke hoogtes voor inhoudelijk verschillende blokken. Geen `min-height` per tekstsectie. De hero gebruikt inhoud en een begrensd beeldformaat; er komt geen universele `100vh`-hoogte.

### Kleuren met één definitie

| Rol | Startwaarde | Gebruik |
|---|---|---|
| Diepgroen | `#123e34` | Hero, footer, prominente tekst op papier |
| Warm papier | `#f7f4e9` | Hoofdachtergrond en lichte tekst op groen |
| Inkt | `#20372f` | Lopende tekst |
| Gedempte inkt | `#56645b` | Secundaire uitleg op lichte achtergrond |
| Goud | `#e9cb88` | Primaire actie op groen en klein vlamaccent |
| Bordeaux | `#87323b` | Spaarzame historische/copyaccenten |
| Lijnkleur | Per ondergrond één geteste waarde | Alleen functionele scheiding |

Alle daadwerkelijke tekst-/achtergrondcombinaties worden gecontroleerd. Richtwaarde: minimaal 4,5:1 voor gewone tekst en 3:1 voor grote tekst en relevante UI-onderdelen. Goud krijgt geen kleine tekst op papier.

### Typografie

- **Bricolage Grotesque** voor hoofdkop, enkele sectiekoppen en het typografische woordmerk.
- **DM Sans** voor body, navigatie, labels, knoppen, historische namen en praktische gegevens.
- Geen nieuwe fontdependency. Bestaande lokale WOFF2-bestanden en licenties blijven.
- H1: circa 64–72 px desktop, 52–60 px tablet, 38–44 px mobiel, circa 36–38 px op 320 indien nodig.
- H2: circa 34–42 px desktop, 28–32 px mobiel.
- H3 en prominente feitwaarden: 22–26 px.
- Body: 18 px, regelhoogte circa 1,6. Essentiële uitleg blijft minimaal 17 px.
- Navigatie/knoppen: 16–17 px. Ondersteunende labels: 14–15 px. Alleen niet-essentiële credits kunnen kleiner, met voldoende contrast.
- Koppen krijgen minder agressieve negatieve letterspatiëring, start rond `-.035em`; body krijgt normale letterspatiëring.
- Er komen benoemde tekststijlen in plaats van losse fontgroottes voor iedere sectie.

### Woordmerk

Het bestaande typografische woordmerk wordt optisch opgeschoond: rustige letterafstand, betere interlinie en een leesbare plaatsnaam. Geen extra pictogram of claim van een officieel logo. Het woordmerk is ondersteunend aan de uitnodiging en blijft op 320 px bruikbaar naast de menuknop.

## 6. Hero: complete hercompositie

### Tekstvoorstel dat als uitvoeringsbasis geldt

- Compact label: **Kerstfeest 2026 · Oostende**.
- H1: **Kerstavond. Samen aan tafel.**
- Intro: **Een feestelijk meergangenetentje en gezelschap op kerstavond, georganiseerd door Welzijnswerking Oostende.**
- Kernfeiten: **Donderdag 24 december 2026** · **Kursaal Oostende** · **€ 5 per persoon**.
- Primaire actie zolang tickets onbekend zijn: **Praktische info & deelname** → `#praktisch`.
- Als bestaande ticketlogica een geldige actuele verkooplink oplevert: **Reserveer je plaats** volgens die logica.

De kop legt nadruk op samen kerst beleven; de locatie staat direct bij de feiten. De zin belooft geen onbevestigde doelgroep, programma of algemene toegang.

Titel en intro worden beheerd vanuit de centrale inhoud. De component bepaalt de presentatie. Regelafbrekingen mogen responsive verschillen, maar de zichtbare woorden blijven gelijk aan de gegevensbron en het deelbeeld.

### Desktop

- Header circa 76–84 px hoog.
- Hero bevat een klein label, een samenhangend tekst-/beeldgebied en een compacte feiten-/actierij.
- Titel krijgt circa twee regels; intro maximaal ongeveer drie regels op de gekozen breedte.
- De kandelaar staat in een eigen gridgebied en wordt binnen het beschikbare vlak geschaald.
- Tekst en illustratie hebben een bewust gedeeld optisch midden; geen illustratie die de hele bovenruimte inneemt terwijl de tekst er los onder hangt.
- Tussen onderkant illustratie en feitenrij blijft minimaal 24 px zichtbare ruimte op de standaardformaten.
- De feiten vormen één leesbare groep; de datum wordt als datum gelezen. Geen uitvergrote losse 24 naast een veel kleinere maand.
- Knop sluit aan op de feiten en krijgt circa 48–52 px hoogte. Geen brede lege ruimte enkel om de knop rechts te kunnen zetten.
- Header plus hero: richtbudget circa 620–700 px op 1440×900. Op 1440×700 blijven kernfeiten en hoofdactie zichtbaar door ruimte/beeld te reduceren.
- De scrollhint vervalt: de primaire actie en zichtbare start van de volgende sectie geven al richting.

### Mobiel

- Titel en intro gebruiken de volle contentbreedte.
- De kandelaar krijgt een eigen compacte horizontale compositiezone; tekst wordt er niet langs in een smalle kolom geduwd.
- De compacte variant kan drie kaarsen en de verbindende armen vereenvoudigd tonen in een ondieper kader. De volledige voet en onderversiering hoeven niet in dezelfde verhoudingen mee te schalen.
- De beeldzone heeft een richtbudget van 80–110 px hoog. Ze neemt minder prioriteit dan datum en actie.
- Datum staat als één begrijpelijk geheel. Locatie en prijs mogen op een tweede feitenrij staan; op 320 px zo nodig onder elkaar.
- De primaire knop vult de leesbreedte en blijft minstens 48 px hoog.
- Header, uitnodiging, kernfeiten en actie passen bij standaardtekst op 390×667 en 320×740 in het eerste scherm. Voor 200% tekstvergroting geldt leesbaarheid boven die hoogte-eis.
- Geen `max-width:200px` op de introductietekst om decoratie te sparen.

### Heroacceptatie

De compositie moet statisch overtuigen. Titel, tekening, feiten en actie vormen op ieder referentieformaat afzonderlijk een rustige eenheid. Geen aanrakingen tussen voet, tekst, knop en lijnen; geen geplette datum; geen geïsoleerd prijssticker-effect.

## 7. Kandelaar: nieuwe vectoruitwerking

De kandelaar wordt als SVG in het project uitgewerkt. Dat maakt lijnvoering, kleur, uitsnede en responsive varianten precies bestuurbaar. Voor deze vectoropgave is geen rasterbeeldgeneratie nodig.

### Tekening

1. Eerst een sterke contour met herkenbare kaarsen, houders, armen en voet.
2. Beperkte natuurlijke asymmetrie in kaarshoogte en was; de constructie blijft overtuigend.
3. Een lijnhiërarchie met circa drie gewichten: hoofdcontour, constructiedetail en kleine arcering.
4. Een consistente relatie tussen perspectief van houders en voet. Geen willekeurige ellipse per onderdeel.
5. Arcering alleen waar die materiaal of volume laat begrijpen.
6. Vlammen krijgen een rustige, heldere vorm. De bestaande brede radiale lichtcirkels verdwijnen.
7. Losse grondstreepjes, stralen en beide losse hulsttakjes verdwijnen uit de hoofdcompositie. Een detail blijft alleen als de totale tekening er aantoonbaar sterker van wordt.
8. Crèmekleurige lijnen en een spaarzaam goudaccent blijven leesbaar op groen.

### Responsive techniek

- Eén broncomponent met gedeelde vormen en een expliciete compacte variant.
- Breedte en hoogte volgen de juiste beeldverhouding; geen viewBox met veel ongebruikte ruimte.
- Desktopbeeld circa 340–420 px breed, afhankelijk van de uiteindelijke gridruimte.
- Mobiel krijgt een apart ondiep kader en aangepaste detaildichtheid.
- Geen per-viewport reeks willekeurige `top`, `right` en negatieve offsets.
- Eventuele SVG-ID's zijn uniek bij meer dan één instantie, ook in lokale previews of deelbeeldgeneratie.
- Decoratieve illustratie blijft verborgen voor hulptechnologie; de betekenis van de pagina staat in echte tekst.

### Beweging

Eerste implementatie is statisch. Pas na visuele acceptatie is maximaal één korte opkomst van circa 200–300 ms mogelijk. Geen getekende lijnanimatie van meerdere seconden, herhalende vlambeweging of scroll-reveal die de pagina nodig heeft om te werken. Reduced motion toont direct de eindtoestand.

## 8. Praktische informatie: onmiddellijk bruikbaar

De praktische sectie komt direct na de hero, op warm papier. Titel: **Praktisch voor je kerstavond**. Ze krijgt een informatiehiërarchie die aansluit op vragen van bezoekers.

### Desktopopbouw

- Hoofdgebied met bevestigde datum, locatie/adres en maaltijd/prijs in goed leesbare rijen.
- Een afgebakend deelnamegebied ernaast of eronder, afhankelijk van de beschikbare breedte.
- Het grote kalenderblad vervalt. De datum is een gegeven; `Zet in mijn agenda` is een herkenbare secundaire actie.
- Routeacties staan bij het adres. De bestaande echte routeplanner en officiële bereikbaarheidslink blijven.
- Inschrijfstatus is zichtbaar als tekst of als echte reserveringsactie wanneer de gegevens dit toelaten.

### Mobielopbouw

Volgorde: deelname/status → datum → locatie en route → maaltijd/prijs → extra bevestigde details → agendaherinnering. De hero heeft datum en prijs al getoond; wie op de hoofdactie drukt krijgt hier eerst antwoord over deelname.

### Ontbrekende inhoud

Zolang die ontbreekt, staat op één plaats:

**Inschrijfinformatie volgt.**

**Ook het aanvangsuur, het menu en de deelnamevoorwaarden voor 2026 worden hier bekendgemaakt.**

De bestaande ticketstatus heeft voorrang: bij `sold_out` of `closed` verschijnt de passende melding, niet opnieuw een algemene “volgt”-kop. Beschikbare gegevens verdwijnen uit de opsomming van wat nog volgt. Bij een gedeeltelijk ingevulde editie blijven formulering en enkelvoud/meervoud correct.

Geen fake knop, disabled inschrijfkaart, lege FAQ of aftelklok. De publieke status legt de bezoeker uit wat die nu kan doen zonder interne implementatietaal.

### Agenda en details

- De huidige download blijft een datumherinnering voor de hele dag en zegt dat expliciet.
- Geen onbevestigde aanvang in kalender of metadata.
- De bestaande CRLF-, bytefolding-, datum- en bestandsnaamcontrole blijft relevant.
- Aanvang, deuren, einde, zaal, menu, dranken, toegankelijkheid en vervoer verschijnen wanneer de betreffende centrale velden zijn ingevuld.
- Als de detailset groeit, wordt die verdeeld in betekenisvolle groepen; geen onleesbare lange kaart of verborgen essentiële informatie.

## 9. Verhaal, locatie en geschiedenis

Deze onderdelen worden één compacter redactioneel geheel met drie verschillende functies. Er komt geen extra sloganscherm tussen praktisch en verhaal.

### Het kerstfeest — `#verhaal`

- Kopvoorstel: **Gezelschap op kerstavond.**
- Eén korte alinea over samen eten en ontmoeting, één korte alinea over de Oostendse traditie.
- Maximaal circa 80–100 woorden voor de introductie.
- Geen herhaling van de volledige datum/prijs/adrescombinatie.
- Geen beloftes over vrijwilligers, animatie of toegang in 2026 zonder bevestiging.

### De plek

- De echte Kursaalfoto krijgt een begrensd kader binnen de contentbreedte.
- Desktop ongeveer 380–500 px breed als onderdeel van het verhaal; mobiel volle leesbreedte met een rustige uitsnede.
- Geen paginabrede foto van 490 px hoog en geen enorme tekst over het gebouw.
- Titel en toelichting buiten het beeld houden de foto rustig en de tekst betrouwbaar leesbaar.
- Credit, maker, jaar en bestaande licentieverwijzing blijven bereikbaar en leesbaar.
- Expliciet een locatiefoto uit 2025; geen beeld van het eigen feest.
- Een kleinere afgeleide webversie en passend `srcset`/`sizes` kunnen de overdracht op mobiel verminderen. Het originele onderzoeksbestand blijft behouden.

### Vorige edities — `#edities`

- Eén duidelijke tijdlijn of chronologische lijst met 2019 en 2025.
- Elk item gebruikt dezelfde semantische volgorde: jaar/datum → titel → historische feiten → bronlink.
- 2019: 25ste editie, meer dan 750 senioren, ruim 140 vrijwilligers, namiddag.
- 2025: terugkeer op kerstavond, circa 650 gasten, 26ste editie.
- De historische doelgroep krijgt een korte contextnoot en wordt niet naar 2026 doorgetrokken.
- Jaarcijfers blijven tijdsaanduidingen. Aantallen staan in leesbare tekst of een klein ondersteunend accent.
- Geen KPI-tegels, geen gigantische 750 naast een gigantische 2025 en geen decoratieve folionummers.
- Desktop kan de twee tijdlijnitems naast elkaar tonen langs één chronologisch verband; mobiel leest vanzelf van boven naar beneden.

## 10. Galerij en sponsors: kleine én grote datasets

### Foto's

De huidige publicatiefilter en lightbox blijven. Aanpassing concentreert zich op de visuele integratie en aantallen die nu beperkt getest worden.

- 0 foto's: geen galerijsectie, lege vakken, “binnenkort”-scherm of navigatielink naar een ontbrekend doel.
- 1 foto: één volledig beeld met passend kader en onderschrift, zonder geforceerd groot leeg raster.
- 2 foto's: rustig paar; mobiel bij voorkeur onder elkaar voor zichtbare gezichten.
- 3–6 foto's: één grotere opname en aanvullend ritme wanneer de echte uitsneden dit toelaten.
- 7–20 foto's: schaalbaar grid met correcte laatste rij; geen willekeurige reuzenfoto alleen om een restitem te vullen.
- Miniaturen mogen croppen op expliciet ingestelde focus; het vergrote beeld blijft volledig zichtbaar.
- Jaar, maker en omschrijving zijn leesbaar. Geen microtekst als enige toegang tot context.
- Lightbox: vorige/volgende, Escape, zichtbare sluitknop, focusinsluiting en focusherstel behouden.

### Actuele sponsors

- Lege lijst: geen actuele sponsormuur of lege statussectie. Historische bedanking blijft zelfstandig leesbaar.
- 1–3 logo's: passende breedtes en uitlijning zonder vier lege kolommen.
- 4–12 logo's: rustig grid, categorieën alleen voor aanwezige groepen.
- 24–40 logo's: schaalbaar grid met beheerst ritme en volwaardige logohoogte.
- Brede, vierkante en staande logo's worden volledig getoond. Geen recoloring of vormvervorming.
- `confirmedFor2026`, verificatie, logotoestemming, lokaal bestand en sortering blijven voorwaarden.

### Historische bedanking

- Titel: **Met dank aan de bijdragers van 2025**.
- Groot decoratief ’25 vervalt.
- Twee functionele groepen kunnen blijven: lokale keukens en overige betrokken organisaties.
- Namen krijgen DM Sans rond 18–21 px, rollen rond 16–17 px.
- De zeven geverifieerde organisaties en hun rol blijven behouden.
- De sectie krijgt aanzienlijk minder hoogte dan de huidige ruim 800 px op desktop; richtbudget circa 360–460 px bij de huidige zeven records, afhankelijk van tekst en breedte.
- De actuele editie en historische erkenning blijven visueel en tekstueel afzonderlijk.

Demomateriaal blijft uitsluitend in expliciete developmentpreviews en krijgt daar een zichtbaar label. Er worden geen echt lijkende testfoto's of testmerken in de productievariant geplaatst.

## 11. Footer, delen en consistentie van data

### Footer

- Compacte organisatienaam en plaats, terug naar boven, bron-/beeldcredits en eventuele bevestigde contactgegevens.
- Geen vierde grote slogan en geen derde volledige praktische samenvatting.
- Afzonderlijke `mailto:`- en `tel:`-links wanneer centrale gegevens bestaan.
- Het locatiecontact wordt niet gebruikt als vzw-contact.
- Beeldcredits vermelden alleen werkelijk gebruikte beelden.

### Centrale tekstbron

- `data/inhoud_2026.json` blijft eigenaar van titel, intro en evenementfeiten; een klein aanvullend introductieveld kan nodig zijn.
- `src/data/event.ts` exposeert die gegevens zonder tweede inhoudelijke kopie.
- Hero en socialcard lezen dezelfde titel; de compositie mag per medium verschillen.
- Dag en maand worden afgeleid van datum en tijdzone. Geen hardcoded “Donderdag” of “24 december” in verschillende componenten.
- De bestaande titeldata worden daadwerkelijk gebruikt; `EventHero.astro` bevat geen eigen alternatieve titel meer.
- Alle ticketstatussen blijven via de bestaande publicatielogica lopen.

### Deelbeeld en metadata

- Nieuw deelbeeld op 1200×630 met dezelfde groene identiteit, getekende kandelaar, titel en bevestigde feiten.
- Het script gebruikt de centrale datumformattering en titel; de JPEG en SVG hebben dezelfde inhoud.
- Fontfallbacks in SVG zijn expliciet en worden visueel bekeken; een SVG met levende tekst hoeft niet pixelgelijk te zijn aan de JPEG. De JPEG is de gedeelde webpreview.
- SEO-titel, beschrijving, alttekst en theme-color passen bij de nieuwe compositie.
- Canonical, `nl-BE`, bestaande Event JSON-LD en het ontbreken van onbevestigde Offer/tijdinformatie blijven behouden.

## 12. Technische refactor zonder extra framework

### Stylesheets

- `tokens.css`: één actuele set kleuren, fonts, tekstschalen, ruimte en containerwaarden.
- `global.css`: reset, documentbasis, focus, generieke container, links en knoppen.
- `campaign.css`: de actuele componentstijlen, per component gegroepeerd met direct bijbehorende responsive regels.
- Oude illustratie-/fotohero-selectors en overschreven richtingen verdwijnen uit de actieve styles nadat de laatste referenties gecontroleerd zijn.
- Geen nieuwe “final fixes”-strook onderaan. Wijzigingen komen bij de betreffende definitie.
- Mobile-first basis; grotere schermen krijgen gerichte uitbreidingen. Een breakpoint wordt gekozen omdat inhoud ruimte nodig heeft.
- De CSS-breakpoint voor het mobiele menu en de JS-mediaquery gebruiken dezelfde grens.
- Geen content verbergen, tekst verkleinen of overflow afsnijden om een fout in de compositie weg te werken.

### Componenten en verantwoordelijkheden

| Bestand | Geplande verandering |
|---|---|
| `src/pages/index.astro` | Nieuwe inhoudsvolgorde en samenhang tussen verhaal, geschiedenis en optionele galerij |
| `src/layouts/BaseLayout.astro` | Consistente metadata, kleur en preload-keuzes controleren |
| `src/styles/tokens.css` | Definitief tokenstelsel |
| `src/styles/global.css` | Alleen actuele basis/UI; oude componentlagen verwijderen |
| `src/styles/campaign.css` | Componenten opnieuw geordend en vormgegeven |
| `src/components/SiteHeader.astro` | Compacte nav, geen dubbele praktische desktopactie, menu/labels/breakpoint behouden |
| `src/components/EventHero.astro` | Nieuwe tekst-/beeld-/feitencompositie en centrale titeldata |
| `src/components/CandleDrawing.astro` | Volledige en compacte SVG-uitwerking |
| `src/components/PracticalInfo.astro` | Nieuwe informatierijen, prominente status, compacte agenda-actie |
| `src/components/StorySection.astro` | Compact verhaal en ondersteunende locatie in één compositie |
| `src/components/HistorySection.astro` | Chronologische semantiek en kleinere schaal |
| `src/components/PhotoGallery.astro` | Passende kleine datasets en rustigere captions; lightbox behouden |
| `src/components/SponsorGrid.astro` | Compactere historische credits, schaalbaar actueel grid |
| `src/components/SiteFooter.astro` | Compacte afsluiting en feitelijke credits |
| `src/data/event.ts` | Centrale titel/intro en afgeleide datumvelden ondersteunen |
| `data/inhoud_2026.json` | Alleen afgesproken publieke tekst aanpassen; ontbrekende feiten blijven leeg |
| `src/data/publication.mjs` | Bestaande filters/ticketgedrag behouden; alleen wijzigen bij aantoonbare noodzaak |
| `src/pages/dev-preview/[mode].astro` | Gerichte kleine en grote datasets voor ontwikkelcontrole |
| `scripts/generate-social-card.mjs` | Nieuwe compositie en gedeelde titel-/datumbron |
| `scripts/creative-qa.mjs` | Nieuwe screenshotmappen, actuele secties en relevante views |
| `scripts/browser-qa.mjs` | Semantische layoutchecks, huidige navigatie en nieuwe bewijslocatie |
| `scripts/drawing-qa.mjs` | Statische tekening en compacte variant; oude 4,6sec-aanname verwijderen |
| `scripts/modules-qa.mjs` | Kleine datasets en 40 sponsors gericht toevoegen |
| `README.md`, `qa/CURRENT_DESIGN.md` | Werkelijke implementatie en nieuwe bewijsbestanden beschrijven |
| `CONTENT_TODO.md` | Alleen inhoudsafhankelijkheden bijwerken; ontbrekende informatie blijft zichtbaar als open punt |

`AtmosphereSection.astro`, `BrandMark.astro`, oude tekeningen en `editorial.ts` worden op gebruik gecontroleerd. Ongebruikte actieve code kan gericht worden opgeruimd. Onderzoeksassets en historische screenshots blijven bewaard. Geen algemene bestandsverwijdering om de map “netjes” te maken.

De werkmap bevat momenteel veel untracked projectbestanden. Geen reset, clean of brede overschrijfactie gebruiken. Voor elke bewerking wordt de actuele inhoud gebruikt.

## 13. Uitvoering met expliciete tussenresultaten

### Fase R01 — Baseline en inventaris

- Maak een aparte `qa/redesign-fix/before/` met actuele hero-, volledige pagina- en sectiescreenshots op 1440×900 en 390×844; voeg 320×740 en 768×1024 toe voor de baseline.
- Leg URL, commit indien aanwezig, lokale wijzigingsstatus en screenshotdatum vast.
- Controleer huidige imports, zichtbare assets, ankers en benodigde data.

**Gereed wanneer:** de uitgangsversie reproduceerbaar zichtbaar is en wijzigingen niet met oud procesbewijs worden verward.

### Fase R02 — Ontwerpsysteem en inhoud

- Stel tokens, tekstrangen en hoofdgrid vast.
- Werk nieuwe titel/intro en deelnameformuleringen uit in de centrale inhoud.
- Leg navigatie en sectievolgorde vast.

**Gereed wanneer:** één consistente set keuzes gebruikt kan worden zonder oude stylesheetlagen nodig te hebben.

### Fase R03 — Hero en kandelaar

- Bouw de volledige en compacte SVG-variant.
- Implementeer hero en header op de echte Astro-pagina.
- Maak hero-opnames op 1440×900, 1440×700, 390×844, 390×667 en 320×740.
- Bekijk die op normale weergave; corrigeer uitlijning, beeldgewicht en afbrekingen.

**Gereed wanneer:** de statische hero de visuele en leesbaarheidscriteria haalt. Bij falen wordt grid of illustratie opnieuw uitgewerkt vóór de rest van de pagina wordt afgewerkt.

### Fase R04 — Praktische informatie

- Verplaats de sectie en herschrijf de compositie.
- Behoud kalender, ticketstatus en routegedrag.
- Controleer lege en ingevulde gegevensvarianten in development.

**Gereed wanneer:** de heroactie leidt naar een onmiddellijk begrijpelijke deelname/statussectie en alle bevestigde informatie scanbaar is.

### Fase R05 — Redactioneel vervolg

- Bouw compact verhaal, locatie en tijdlijn.
- Verklein en optimaliseer het locatiebeeld waar dat aantoonbaar helpt.
- Ontwerp historische credits als functionele namen-/rollenlijst.
- Werk footer en optionele modules in dezelfde stijl af.

**Gereed wanneer:** de volledige scroll verschillende inhoudsstructuren heeft en de onderste helft niet opnieuw bestaat uit herhaalde kop-plus-kolommen.

### Fase R06 — CSS en bronconsistentie

- Verwijder vervangen actieve stijlen en ongebruikte componentreferenties.
- Verbind centrale titel/datum aan pagina en deelbeeld.
- Controleer menu-CSS en JS op dezelfde breakpoint.

**Gereed wanneer:** er één begrijpelijke actuele stijlarchitectuur is zonder oude “final”-patchlagen.

### Fase R07 — Gedrag en inhoudstoestanden

- Bestaande inhoudstests draaien.
- Browserchecks op de gebouwde productievariant draaien.
- Gerichte developmentgevallen voor ticketstatussen, ontbrekende en ingevulde velden, foto's en sponsors controleren.
- Alleen nieuwe tests schrijven voor gewijzigd gedrag of echte regressierisico's.

**Gereed wanneer:** de aanpassing functioneel correct is en bestaande publicatievoorwaarden blijven werken.

### Fase R08 — Visuele review en herstel

- Desktop: hero, volledige scroll, praktisch, geschiedenis en credits vergelijken met baseline.
- Mobiel: eerste scherm, eerste drie scrollschermen, praktische sectie, tijdlijn en footer bekijken.
- Tableau/viewportmatrix controleren op afbrekingen, kleine credits, restruimte, illustreergewicht en onbedoelde aanrakingen.
- Gebreken met concrete screenshotverwijzing registreren en bij de betreffende component herstellen.
- Na fixes alleen getroffen weergaven en relevante regressiechecks opnieuw uitvoeren; na definitieve wijzigingen een actuele finale build en bijbehorend bewijs maken.

**Gereed wanneer:** elk visueel acceptatiepunt met een actuele weergave kan worden beoordeeld. Geslaagde axe- of buildresultaten vervangen deze beoordeling niet.

### Fase R09 — Delen en overdracht

- Socialcard genereren en openen.
- Definitieve productiebuild en bijbehorende checks uitvoeren.
- Actuele ontwerpnotitie, README en inhoudslijst bijwerken.
- Eindrapport met verschil, testresultaten, echte beperkingen en screenshots opleveren.

**Gereed wanneer:** de gebruiker de lokale wijziging concreet kan beoordelen en alle claims op de juiste versie slaan.

## 14. Verificatiematrix

### Viewports

| Viewport | Kerncontrole |
|---|---|
| 320×740 | Volledige leesbaarheid, geen geplette tekst, compacte tekening, actie zichtbaar |
| 360×740 | Kleine standaardtelefoon, natuurlijke tekstafbreking |
| 390×667 | Korte telefoon, compositie compact zonder essentiële tekst te verkleinen |
| 390×844 | Primaire mobiele compositie en eerste drie scrollschermen |
| 430×932 | Grotere telefoon, geen onverwachte loze ruimtes |
| 768×1024 | Tablet, logische overgang tussen enkel- en tweekolomsindeling |
| 1024×900 | Smalle desktop, navigatie en illustratie passen comfortabel |
| 1440×700 | Korte desktop, feiten en primaire actie binnen eerste scherm |
| 1440×900 | Primaire desktopcompositie, gehele visuele hiërarchie |
| 1920×1080 | Begrensde breedte, beheerste titel en beeldverhouding |

Rond de uiteindelijke menu-/gridbreakpoints worden ook net onder en net boven de grens screenshots of layoutchecks gemaakt. Verder 200% tekstvergroting en reflow op een equivalente contentbreedte van 320 CSS-px testen. Hoogtecriteria worden daarbij niet gebruikt om leesbaarheid te beperken.

### Interactie en toegankelijkheid

- Eén H1, logische H2/H3-structuur, correcte landmarks en `lang`.
- Alle zichtbare navigatie en anchors bereiken een werkelijk aanwezig doel.
- Menu: openen/sluiten, Enter, Escape, buitenklik, focusherstel, resize en verborgen inhoud niet focusbaar.
- Skiplink werkt en wordt bij focus zichtbaar.
- Volledige tabvolgorde, zichtbare focus en geen focus die door een overlay wordt bedekt.
- Interactieve doelen minimaal circa 44×44 px; primaire knop minimaal 48 px hoog.
- Contrast van tekst, status, links en focus controleren.
- Kalenderdownload en externe routebestemmingen blijven correct.
- Lightbox: toetsenbord, focus, sluitactie en volledig vergroot beeld.
- Reduced motion: directe statische inhoud; geen lopende sieranimaties.
- Pagina blijft leesbaar als JavaScript niet draait; als het mobiele menu daarvan afhankelijk blijft, krijgt de no-JS-weergave zichtbare bruikbare navigatie. De kernfeiten en deelname-informatie blijven altijd bereikbaar.
- Axe op relevante pagina- en dialogtoestanden, naast handmatige beoordeling.

### Gegevensvarianten

| Variant | Verwacht gedrag |
|---|---|
| Huidige lege optionele velden | Complete aankondiging met één heldere deelname/statusmelding |
| Alleen aanvang ingevuld | Aanvang zichtbaar; verdwijnt uit “volgt”-zin |
| Alle praktische velden ingevuld | Logische groepen, geen dubbele of tegenstrijdige melding |
| Tickets onbekend | Interne praktische actie, geen schijnreservatie |
| `available` met geldige HTTPS-link | Echte reserveeractie volgens huidige logica |
| `available` met ontbrekende/ongeldige link | Veilige informatieve toestand |
| `sold_out` / `closed` | Correcte status zonder ongeldige reserveeractie |
| 0/1/2/3/4/10/20 foto's | Passende kleine composities en schaalbaar grid |
| 0/1/3/4/12/24/40 sponsors | Geen lege gaten; logo's volledig en herkenbaar |
| Sponsor met niet-goedgekeurde vlag | Blijft onzichtbaar |
| Foto zonder toestemming/credit/bestand | Blijft onzichtbaar |
| Contact ontbreekt/aanwezig | Geen lege contactregel; correcte links indien aanwezig |

Niet iedere dataset krijgt iedere viewport. Volledige huidige productievariant gebruikt de gehele viewportmatrix. Modules krijgen gerichte randgevallen: kleine datasets op 320/390/1440, grote datasets op 390/768/1440 en 40 sponsors ook op 320. Dit levert betekenisvolle dekking zonder een onbeheersbare cartesiaanse testmatrix.

### Build, assets en prestaties

- `npm run build` en `npm test` moeten slagen.
- Geen lokale assetfouten, browserexceptions, gebroken anchors of horizontale overflow.
- Developmentpreviews en demorecords ontbreken in `dist/`.
- Fonts laden lokaal; geen nieuwe runtime- of UI-frameworkdependency.
- De tekening komt als inline SVG; geen zware clientscriptanimatie.
- Afbeeldingen onder de vouw lazy-loaden en hebben afmetingen/beeldverhouding om layoutverschuiving te beperken.
- Vergelijk HTML/CSS/JS/font- en beeldgewicht met de baseline. Initiële geladen hoeveelheid mag door de fix niet toenemen zonder verklaarbare inhoudelijke reden.
- Mobiele locatieafbeelding bij voorkeur rond of onder 120 kB bij voldoende visuele kwaliteit; dit is een optimalisatiedoel, geen reden om zichtbare compressieschade te accepteren.
- LCP/CLS waar meetbaar controleren op dezelfde lokale testcondities. Lokale metingen worden niet als garanties voor echte bezoekers gepresenteerd.

## 15. Visuele acceptatie: concreet bewijs

De finale review beantwoordt onderstaande punten met screenshots en korte observaties. Geen eigen totaalscore als vervanging voor bewijs.

- [ ] De hero vormt één compositie, met bewust verdeeld gewicht tussen kop, illustratie en informatie.
- [ ] De statische kandelaar heeft consequente contouren, details en perspectief; geen wazige glowvlekken.
- [ ] Illustratie, titel, knop en scheidingslijnen raken of overlappen nergens onbedoeld.
- [ ] De titel heeft beheerste schaal; ondersteunende inhoud concurreert niet met dezelfde grootte.
- [ ] Datum, locatie, prijs en praktische actie zijn op de afgesproken standaardformaten meteen zichtbaar.
- [ ] De introductie heeft mobiel de volle leesbreedte en natuurlijke afbrekingen.
- [ ] Praktische informatie volgt direct op de uitnodiging en geeft eerst een duidelijk antwoord over deelname.
- [ ] Locatie en geschiedenis voegen inhoud toe zonder een herhaling van het praktische blok.
- [ ] De locatieafbeelding ondersteunt het verhaal en overheerst de pagina niet.
- [ ] Historische jaren en bezoekersaantallen zijn semantisch duidelijk onderscheiden.
- [ ] Credits hebben een passende schaal; groot ’25 en overtollige witruimte zijn verdwenen.
- [ ] De volledige scroll toont verschillende structuren voor uitnodiging, informatie, verhaal en erkenning.
- [ ] De lege foto-/sponsorvariant oogt afgerond; kleine datasets veroorzaken geen gaten.
- [ ] Footer en socialcard gebruiken dezelfde identiteit en centrale gegevens.
- [ ] De pagina blijft leesbaar en bedienbaar bij vergroting en toetsenbordgebruik.

Ontwerpkwaliteit is deels een visueel oordeel. De eindrapportage zegt daarom precies welke problemen zijn opgelost en welk beeld dat aantoont. Acceptatie van de smaakrichting door de opdrachtgever wordt niet geclaimd op basis van geautomatiseerde tests.

## 16. Bewijsbestanden en oplevering

Nieuwe rondes krijgen een eigen map; bestaande screenshots worden niet als actuele resultaten overschreven.

```text
qa/redesign-fix/
  before/
  hero-review/
  full-review/
  final/
  modules/
  browser-report.json
  modules-report.json
  VISUAL_REVIEW.md
```

De finale oplevering bevat:

1. Voor/na van desktophero en mobiele hero.
2. Volledige desktop- en mobiele pagina op dezelfde referentieformaten.
3. Praktische sectie, geschiedenis en historische credits op desktop en mobiel.
4. Bewijs van kleine en grote optionele modules, uitsluitend als developmentvoorbeeld.
5. Werkelijk uitgevoerde testcommando's, resultaten en testomgeving.
6. Kort bestandsoverzicht met doel van de wijzigingen.
7. Een zichtbare lijst van eventuele resterende visuele gebreken.
8. Los daarvan de ontbrekende organisatiegegevens en foto-/sponsorassets.

`qa/CURRENT_DESIGN.md` verwijst naar het nieuwe bewijs zodra het werkelijk bestaat. Oude rapporten blijven herkenbaar als procesarchief. Er wordt nergens “klaar”, “getest” of “goedgekeurd” toegevoegd voor werk dat alleen gepland is.

## 17. Afhankelijkheden en afbakening

### Kan volledig worden uitgevoerd met het huidige project

Hero, kandelaar, compacte mobiele variant, type/grid/kleur, nieuwe informatievolgorde, praktisch blok, locatieverhaal, tijdlijn, historische credits, footer, socialcard, stylesheetrefactor en technische/visuele controle.

### Blijft afhankelijk van echte aanlevering

Uren, deelnamevoorwaarden, inschrijfmethode/link, menu/dranken, zaal/ingang, specifiek vervoer/toegankelijkheid, vzw-contact, goedgekeurde editiefoto's en actuele sponsors/logotoestemming.

Die ontbrekende inhoud verhindert het vormgeven en testen van de aankondigingsvariant niet. Ze verhindert wel een volledige reserveringsflow en documentaire fotobeleving. Dat verschil blijft expliciet in de oplevering.

### Niet nodig voor deze fix

CMS, database, Supabase, nieuw framework, animatiebibliotheek, nieuwe sitehosting, nieuwe openbare routes of aanvullende commerciële tools. Bestaande statische componenten en data zijn toereikend.

## 18. Definitie van voltooiing

De fix is uitgevoerd wanneer de nieuwe compositie in de bestaande website staat, de huidige en toekomstige gegevensvarianten passend renderen, de relevante technische checks slagen, desktop en mobiel werkelijk visueel zijn beoordeeld, het deelbeeld is bijgewerkt en het eindbewijs naar precies die versie verwijst.

Oorspronkelijke eerstvolgende uitvoeringsstap bij het opstellen van dit plan: **R01 → R02 → R03**: baseline vastleggen, ontwerpsysteem/inhoud consolideren en de hero met de nieuwe kandelaar op de echte pagina uitwerken. Daarna volgen praktisch, verhaal, modules, refactor en verificatie volgens bovenstaande afhankelijkheden.


## 19. Uitvoeringsstatus — 18 oktober 2026

R01–R09 zijn lokaal uitgevoerd: baseline, inhoud/tokens, hero/kandelaar, praktisch, redactioneel vervolg, CSS/bronconsistentie, toestandstests, visuele review/herstel en deelbeeld/overdracht. Zie `qa/redesign-fix/VISUAL_REVIEW.md` voor screenshots, werkelijk uitgevoerde controles en grenzen. De baseline bevat geen volledige byte-/LCP-/CLS-meting; daarvoor wordt geen exacte voor/na-prestatieclaim gedaan. Aanleverafhankelijkheden uit §17 blijven open. Er is niet gepubliceerd.
