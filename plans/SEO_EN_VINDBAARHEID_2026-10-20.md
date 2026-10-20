# SEO en vindbaarheid — Welzijnswerking Oostende

Audit en uitvoeringsplan, 20 oktober 2026. De nulmeting hieronder blijft historisch. De technische uitvoering is gestart en de Search Console-controles zijn uitgevoerd; zie de actuele status hieronder. Bewijs van de eerste publieke controle: `qa/seo-2026-10-20/live-audit.json`.

## Uitvoeringsstatus op 20 oktober 2026

- Search Console-domeinproperty bestaat en is toegankelijk. De sitemap is na verversen **Succesvol**, laatst gelezen op 20 oktober, één ontdekte pagina. De aanvankelijke fout in de overzichtstabel was verouderde weergave; er is geen tweede sitemap ingediend.
- Homepage-inspectie: nog niet geïndexeerd / URL onbekend bij Google. Live test op 20 oktober om 13.04 uur: beschikbaar voor Google, pagina kan worden geïndexeerd. Indexeringsverzoek is geaccepteerd en aan de prioriteitscrawlwachtrij toegevoegd. Dit is nog geen bevestiging van indexering.
- Geen handmatige acties en geen beveiligingsproblemen gedetecteerd in de betreffende Search Console-rapporten.
- Lokale implementatie: doelgroepgerichte titel en beschrijving, gedeelde SEO-datamodule, dynamische deelbeeld-alt, graph met Organization/WebSite/WebPage/Event, PostalAddress, evenementstatus, bevestigd optreden, zichtbaar sfeerbeeld en `noindex` voor development-previews.
- De FAQ bevat praktische uitleg over inschrijving en prijs. Vormgevings- en tekstwijzigingen uit de bestaande werkmap blijven behouden; de nulmeting is geen instructie om oudere vormgeving terug te zetten.
- Nieuwe SEO-unitcontroles en productie-HTML-controle zijn opgenomen in de release. Bestaande browserchecks lezen nu het Event uit de graph en gebruiken de bevestigde tijden.
- De lettertype-preloads waren bij de start van deze uitvoering al teruggebracht tot Public Sans; dit is behouden.
- Publicatie van de lokale bronwijzigingen, echte Facebook/WhatsApp-previewcontrole en lokale vermeldingen blijven afzonderlijke opleverpunten. Het indexeringsverzoek is gedaan voor de huidige live website.
- Bewijs en beperkingen: `qa/seo-2026-10-20/UITVOERING.md`. Conceptteksten voor verspreiding: `plans/DEELTEKSTEN_KERSTFEEST_2026.md`.

## Doel en uitgangspunt

Alleenstaanden vanaf 50 jaar, en mensen die voor hen informatie zoeken, vinden de juiste uitnodiging, begrijpen de voorwaarden en vinden een ontmoetingscentrum om zich in te schrijven. Het resultaat is deelname; websitebezoek is een tussenstap.

De site moet drie routes ondersteunen: een gedeelde sociale link, een gerichte zoekopdracht naar het feest, en een bredere vraag naar gezelschap op kerstavond in Oostende. De zoektermen hieronder zijn hypothesen op basis van de doelgroep, geen gemeten zoekvolumes. Search Console moet later tonen welke termen echt voorkomen.

Geen positiegarantie: crawlbaarheid, indexering, vertoningen en deelname zijn afzonderlijke stappen. Een sitemap bewijst geen indexering. Een geslaagde structured-data-test bewijst geen speciale zoekweergave.

## 1. Nulmeting: wat is er al?

| Onderdeel | Vastgesteld op live site | Betekenis / resterende taak |
|---|---|---|
| Homepage | HTTP 200, HTML aanwezig | Geen JavaScript nodig om basistekst te ontvangen |
| HTTPS | Werkt; HTTP verwijst door | Goed; HTTP zonder www maakt nu twee sprongen |
| Hoofddomein | Zonder www → 308 naar www | Consistent met canonical; 308 is een permanente redirect |
| robots.txt | HTTP 200, `Allow: /`, sitemapverwijzing | Google mag crawlen |
| sitemap.xml | HTTP 200, één URL: homepage | Passend bij één publieke HTML-pagina |
| Sitemap-index | Niet aanwezig | Niet nodig: een index is bedoeld om meerdere sitemaps te verzamelen |
| Indexeringsverbod | Geen `X-Robots-Tag` op homepage, geen robots-meta in opgehaalde HTML | Geen aangetroffen blokkade; Google-indexstatus blijft onbekend |
| Canonical | `https://www.welzijnswerking.be/` | Correct en gelijk aan sitemap / Open Graph |
| Titel | Kerstfeest 2026 in Kursaal Oostende \| Welzijnswerking Oostende | Relevant; doelgroep ontbreekt nog in titel |
| Meta description | Datum, doelgroep, uren, diner, prijs | Relevante inhoud, maar lang; inschrijfroute ontbreekt |
| Taal | `nl-BE` in bronlayout | Passend bij Nederlandstalige Belgische pagina |
| H1 | Kerstavond. Samen aan tafel. | Warm; inhoudelijke evenementomschrijving staat ernaast in gewone tekst |
| Sociale metadata | Open Graph + Twitter large image aanwezig | Titel, tekst, canonical, beeld, dimensies en alt aanwezig |
| Deelbeeld | JPEG bereikbaar met HTTP 200 | Metadata claimt 1200×630; echte platformweergave nog controleren |
| Event JSON-LD | Naam, datum, eindtijd, locatie, organisator | Basis aanwezig; adres is één tekststring; image en eventStatus ontbreken |
| Tijdzone | 16:00–20:30 UTC op 24 december | Correct voor 17.00–21.30 in België in december |
| Onbestaand pad | Echte HTTP 404 | Geen aangetroffen soft-404 op dit steekproefpad |
| Development-route | Geteste preview geeft HTTP 404 | Goed; alle preview-routes blijven uit productie |
| Inschrijfgegevens | OC-route bekend; start/einddatum en betaling onbekend | Belangrijkste praktische inhoud om nog te bevestigen |
| Performance | Historisch lokaal rapport beschikbaar | Geen actuele meting van echte mobiele bezoekers; rapport bewijst geen live Core Web Vitals |
| Search Console | Niet ingezien | Eigendom, sitemapverwerking, indexstatus en zoekprestaties onbekend |

Lokale broncontrole: `astro.config.mjs`, `src/layouts/BaseLayout.astro`, `public/robots.txt`, `public/sitemap.xml`, `src/data/event.ts`, `data/inhoud_2026.json`, hero, FAQ en praktische informatie. Er bestaan al controles voor metadata en het deelbeeld. Een oudere browsercheck verwacht nog een datum zonder tijd en moet bij uitvoering worden afgestemd op de bevestigde tijden.

## 2. Prioriteit P0 — zekerheid over indexering

Uitvoeren vóór de brede promotie, bij voorkeur 20–21 oktober.

1. Bestaande Search Console-property en bevoegde beheerder opzoeken. Indien afwezig: domeinproperty `welzijnswerking.be` verifiëren met de echte Google-DNS-token. Eerst bestaande verificatie en DNS bekijken; geen records vervangen. Dit vereist account- en eventueel DNS-toegang.
2. `https://www.welzijnswerking.be/sitemap.xml` indienen en verwerking controleren.
3. Homepage inspecteren: indexstatus, laatste crawl, ophalen toegestaan, door gebruiker opgegeven canonical en door Google gekozen canonical vastleggen.
4. Live URL-test uitvoeren en gerenderde HTML bekijken: doelgroep, datum, prijs en OC-inschrijving moeten leesbaar zijn.
5. Indien nog niet geïndexeerd: na de inhoudelijke update één indexeringsverzoek doen. Daarna fouten oplossen en normaal hercontroleren; dagelijks opnieuw indienen is geen strategie.
6. Beveiligingsproblemen en handmatige maatregelen controleren. Onverwachte oude geïndexeerde URL's inventariseren; relevante oude links individueel naar de best passende actuele bestemming verwijzen.
7. Productie-host, eventuele Vercel-previewdomeinen en deployment-URL's inventariseren. Preview beschermen via hostconfiguratie of `noindex`, productie indexeerbaar houden. Robots alleen is geen betrouwbare methode om een URL uit de index te houden.

**Klaar wanneer:** sitemap is verwerkt en de URL-inspectie een geïndexeerde homepage met de bedoelde canonical toont. Als Google nog wacht: status en controledatum registreren; niet als geslaagd afvinken. Een openbare `site:`-zoekopdracht is hooguit een aanwijzing.

## 3. Prioriteit P1 — de juiste zoekvragen beantwoorden

Uitvoeren met bevestigde feiten. Geen zoekwoordenblok of extra pagina voor elke woordvariant.

| Zoekintentie / voorbeelden | Gewenst antwoord op de pagina |
|---|---|
| welzijnswerking oostende kerstfeest 2026 | Officiële organisatie en actuele editie |
| kerstfeest alleenstaanden Oostende | Voor wie, leeftijd, datum, locatie |
| kerstavond alleen Oostende / samen kerst vieren Oostende | Een warme uitnodiging, wat je kunt verwachten, alleen komen mag |
| kerstdiner senioren Oostende | Feestmaaltijd, € 5, doelgroep vanaf 50, menu volgt |
| kerstfeest Kursaal 24 december 2026 | Datum, 17.00–21.30, volledig adres |
| inschrijven kerstfeest Oostende | Negen ontmoetingscentra, contact, bevestigde inschrijftermijn |

### Concrete tekstvoorstellen

- Paginatitel: **Kerstfeest 2026 voor alleenstaanden in Oostende**. De organisatienaam kan als suffix als dat leesbaar blijft. Geen harde tekenlimiet als kwaliteitsdoel: zoekresultaten worden op beschikbare breedte weergegeven en Google kan titels aanpassen.
- Meta description: **Vier kerstavond in Kursaal Oostende op 24 december 2026. Voor alleenstaanden vanaf 50 jaar, € 5 per persoon. Inschrijven via een ontmoetingscentrum.**
- Een zichtbare, feitelijke omschrijving nabij de warme hero: **Kerstfeest 2026 voor alleenstaanden vanaf 50 jaar in Oostende**. Laat die informatie onderdeel van de zichtbare kopstructuur zijn. Behoud één duidelijke hoofdkop; bepaal bij uitvoering of dit de H1 wordt of de bestaande H1 aanvult. Geen verborgen zoekwoordtekst.
- Korte introductie: **Op 24 december 2026 organiseert Welzijnswerking Oostende een kerstfeest voor alleenstaanden vanaf 50 jaar in het Kursaal. Van 17.00 tot 21.30 uur schuif je voor € 5 mee aan voor een feestelijke maaltijd en muziek. Je schrijft je in via een van de negen Oostendse ontmoetingscentra.**

Daarna geen herhaling van dezelfde alinea in elke sectie. Gebruik natuurlijke variatie zoals kerstfeest, kerstavond en samen eten. De woorden “alleenstaand” en “eenzaam” zijn niet uitwisselbaar; de uitnodiging moet waardig blijven. Claim geen gratis diner of algemene hulpverlening.

### Informatie die deelname bepaalt

De bestaande FAQ geeft geruststelling. Voeg praktische antwoorden toe waar bezoekers die verwachten: prijs, uren en inschrijven. Elk feit blijft uit centrale data komen, ook in metadata en structured data.

Eerst bevestigen: start inschrijvingen, uiterste datum, betaalwijze, eventuele woonplaatsvoorwaarde, of iemand voor een andere persoon kan inschrijven, dieetvragen en toegankelijkheid. Onbekende zaken eerlijk onbekend laten; niet invullen met vorige editiegegevens. Vermeld bij afsluiten of uitverkocht een duidelijke status en bied geen inschrijfbelofte meer.

Organisatiecontact ontbreekt nog. Zodra een geschikt publiek nummer of e-mailadres bevestigd is, tonen. Voorlopig zijn de bestaande OC-contacten de praktische route; het verenigingsadres is geen ticketbalie.

**Klaar wanneer:** een bezoeker zonder scrollen door het archief begrijpt voor wie het is en waar inschrijving gebeurt; alle belangrijke feiten staan in gewone HTML; metadata en zichtbare inhoud spreken elkaar niet tegen.

## 4. Prioriteit P1 — technische SEO vervolledigen

### Metadata en structured data

Werk `BaseLayout.astro` bij en verplaats gedeelde SEO-logica zo nodig naar een kleine datamodule. Alle absolute URLs komen uit dezelfde site-URL; bij toekomstige extra pagina's moet canonical per route werken in plaats van overal naar `/` wijzen.

- Event uitbreiden met stabiele `@id` voor editie 2026 en bevestigd `eventStatus: EventScheduled`.
- Adres als `PostalAddress`: straat `Kursaal-Westhelling 12`, plaats `Oostende`, postcode `8400`, land `BE`. Organisatieadres afzonderlijk houden.
- Een representatief, zichtbaar en publiek bereikbaar evenementbeeld toevoegen. Echte 2025-foto alleen met heldere editiecontext; voorkeur voor een passend sfeerbeeld dat ook op de pagina zichtbaar is. Het gegenereerde sociale beeld niet voorstellen als echte evenementfoto.
- Organisator als eigen `Organization` met stabiele `@id`; naam en URL, en alleen bevestigde publieke contactgegevens en officiële sociale profielen. Geen geraden `sameAs`, logo of openingsuren.
- Een compacte `WebSite`-entiteit voor sitenaam is mogelijk. Geen zoekfunctie-markup zonder werkende zoekfunctie.
- Geen verzonnen online ticketaanbod. Bij deze offline OC-inschrijving voorlopig geen `offers.url` toevoegen die online aankoop suggereert. Pas bij een passende bevestigde ticketroute Offer-markup beoordelen; prijs en beschikbaarheid moeten dan overeenkomen met de pagina. `not_confirmed` is geen `InStock`.
- Annulering/verplaatsing van het evenement onderscheiden van gesloten of uitverkochte inschrijvingen. Bij annulering de eventstatus aanpassen en uitleg zichtbaar tonen; niet de hele pagina verwijderen.

Google noemt België/Nederlands momenteel niet in de beschikbaarheidslijst voor zijn specifieke Event-zoekervaring. Event-markup helpt de informatie structureren, maar is hier geen belofte van een evenementenblok. Technische validatie en regionale beschikbaarheid zijn verschillende zaken. Bron: [Google Event-documentatie](https://developers.google.com/search/docs/appearance/structured-data/event).

### Sitemap en crawlbaarheid

De huidige kleine XML-sitemap behouden. Geen sitemap-index, extra plugin of robots-meta `index,follow` nodig om de basis te laten werken. Voorlopig zijn er geen extra openbare HTML-pagina's om toe te voegen; sectie-ankers zijn geen zelfstandige pagina's.

Bij uitbreiden alleen canonieke, indexeerbare pagina's met status 200 opnemen. Geen tracking-URLs, development-routes of elke fotovariant. `lastmod` alleen toevoegen als een echte inhoudelijke wijzigingsdatum betrouwbaar beschikbaar is; niet elke build automatisch op vandaag zetten. `priority` en `changefreq` leveren bij Google geen voordeel. Bron: [Google sitemaprichtlijnen](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

Optioneel HTTP zonder www in één sprong naar HTTPS met www brengen, als de hosting dit eenvoudig ondersteunt. Geen reden om de goed werkende domeinkeuze te veranderen.

### Mobiele snelheid

Meet de live homepage met PageSpeed Insights op mobiel en voer een test uit op een trage mobiele verbinding. Noteer testdatum, tool, labcondities en eventueel beschikbare velddata. Bij weinig verkeer kan CrUX ontbreken; dat is geen fout.

Onderzoek eerst de vier font-preloads in `BaseLayout.astro`: ze verwijzen nog naar de oudere lettertypes terwijl `PRODUCT.md` één sans-seriffamilie voorschrijft. Alleen daadwerkelijk gebruikte kritieke fonts vooraf laden; overige overbodige preloads verwijderen na controle van de actuele styling. Dit is een concrete broncodebevinding, nog geen gemeten prestatiewinst.

Behoud responsive hero, eager/high priority voor het hoofdbeeld, lazy loading voor archieffoto's en vaste afbeeldingsmaten. Richtwaarden voor echte gebruikers: LCP ≤ 2,5 s, INP ≤ 200 ms en CLS ≤ 0,1 op het 75e percentiel. Richtwaarden zijn geen rankinggarantie. Bron: [Core Web Vitals](https://web.dev/articles/vitals).

## 5. Prioriteit P1 — delen via sociale media

De bestaande OG-basis behouden. Wel de kortere doelgroepgerichte beschrijving gebruiken en de harde 2026-tekst in `socialImageAlt` aan de centrale evenementdata koppelen. Bij prijs- of uurwijziging moeten HTML, agenda, alt en beeld gelijk blijven.

Vóór de grote deelronde:

1. URL via Facebook Sharing Debugger ophalen en de preview bekijken; eventueel opnieuw laten ophalen na wijziging.
2. Dezelfde link werkelijk delen in een eigen testgesprek op WhatsApp en Messenger. Dit controleert beeldsnede, leesbaarheid en klikgedrag in de appbrowser. Geen berichten aan anderen versturen zonder opdracht.
3. Controleer dat 50+, datum en inschrijfroute in begeleidende tekst staan, ook als het platform geen preview toont. Essentiële informatie niet uitsluitend in de afbeelding zetten.
4. Goedgekeurd beeld behouden; pas het alleen aan als de feiten of daadwerkelijke leesbaarheid dit vereisen. Bij gewijzigd beeld eventueel een nieuwe bestandsnaam gebruiken om caches te onderscheiden; oude beeld-URLs bereikbaar houden.
5. Facebookbericht vastzetten, website in het officiële profiel plaatsen en bij wijzigingen dezelfde bronlink blijven gebruiken. Voor Instagram ook de profiel-link gebruiken; niet aannemen dat een URL in een gewone caption aanklikbaar is.

Voorstel begeleidende tekst:

> Kerstavond samen vieren in Oostende? Op 24 december organiseert Welzijnswerking Oostende een kerstfeest in het Kursaal voor alleenstaanden vanaf 50 jaar. Van 17.00 tot 21.30 uur, € 5 per persoon. Inschrijven verloopt via een van de negen ontmoetingscentra. Alle actuele informatie: https://www.welzijnswerking.be/

Eventueel tweede zin voor doorverwijzers: “Ken je iemand voor wie dit een fijne avond kan zijn? Bezorg hen gerust de uitnodiging.”

Gebruik bij campagnes optioneel herkenbare UTM-parameters, bijvoorbeeld `?utm_source=facebook&utm_medium=social&utm_campaign=kerstfeest_2026`. Canonical en `og:url` blijven zonder parameters. Geen namen, leeftijden of andere deelnemersinformatie in de URL. Controleer eerst of het gebruikte dashboard campagnegegevens werkelijk toont; parameters toevoegen alleen meet niets. Bron voor de deelmetadata: [Open Graph](https://ogp.me/).

## 6. Prioriteit P1/P2 — lokale verspreiding

Sociale verspreiding en lokale vermeldingen ondersteunen zowel direct bezoek als herkenbaarheid. Dit zijn voorgestelde kanalen; er zijn geen publicaties aangevraagd en er is geen publicatiegarantie.

| Prioriteit | Kanaal | Concrete actie na bevestiging inschrijfdetails |
|---|---|---|
| P1 | Negen ontmoetingscentra | Dezelfde actuele tekst en website-URL aan hun communicatiemedewerkers bezorgen; website/nieuwsbrief/affiche waar passend |
| P1 | Stad Oostende en Kursaal | Relevante evenement- of nieuwspagina aanvragen met rechtstreekse link naar de officiële uitnodiging |
| P1 | UiTdatabank | Eerst zoeken of een editie-2026-record bestaat; dat bijwerken of één correct evenement invoeren |
| P2 | Lokale pers en verenigingen | Informatief bericht met datum, doelgroep, prijs en inschrijfroute; vragen naar link bij digitale berichtgeving |
| P2 | Zorg- en welzijnscontacten | Geschikte lokale doorverwijzers een bruikbare uitnodiging bieden; zij bereiken ook mensen die zelf weinig online zoeken |

UiTdatabank is relevant omdat de gegevens doorstromen naar UiTinVlaanderen en andere agenda's. Geen tweede record voor hetzelfde feest maken. Controleer doelgroepvoorwaarden, datum/uur, prijs en bronlink in elke externe vermelding. Bron: [UiTdatabank](https://www.uitdatabank.be/).

Werk met één korte bronfiche: officiële naam, doelgroep, datum/tijdzone, locatie, prijs, inschrijfstatus, deadline zodra bekend, website en geschikt organisatorcontact. Wijzigingen eerst op de website, daarna in de externe records. De negen OC's niet als eigen filialen markeren. Google Business Profile alleen later beoordelen als de organisatie daar werkelijk voor in aanmerking komt; geen profiel van de evenementlocatie claimen.

## 7. Meten wat helpt

Vanaf de eerste inhoudelijke release wekelijks een kort overzicht, vaker alleen bij fouten of belangrijke wijzigingen. Geen automatische monitor is met dit plan ingesteld.

- Search Console: indexstatus, vertoningen, klikken, zoektermen, CTR en land/apparaat waar beschikbaar. Splits merkzoekvragen en algemene kerstvragen. Gemiddelde positie voorzichtig interpreteren; kleine aantallen zijn wisselvallig.
- Vercel Analytics: controleren of productiebezoeken echt binnenkomen en welke verwijzers zichtbaar zijn. WhatsApp en andere apps kunnen als direct/onbekend verschijnen.
- Optionele anonieme interactiemeting: inschrijfroute, OC-overzicht en telefoonklik, zonder telefoonnummers of persoonsgegevens als meetwaarden. Alleen toevoegen als de rapportage een beslissing ondersteunt.
- Offline: OC's kunnen vrijwillig op geaggregeerd niveau noteren hoe mensen het feest vonden. Geen nieuwe verplichting voor deelnemers.
- Een klik op “bel” bewijst geen gesprek; een geopend centrumoverzicht bewijst geen inschrijving. Deelnemersaantallen komen uit de echte inschrijfadministratie.

Leg op de eerste meetdag een nulmeting vast. Stel verkeersdoelen pas op basis van bereik, inschrijfcapaciteit en eerste gegevens. Nu een bezoekersaantal of ranking beloven zou ongegrond zijn.

## 8. Planning en verantwoordelijkheid

| Moment | Werk | Verantwoordelijkheid / afhankelijkheid |
|---|---|---|
| 20–21 oktober | Search Console, indexering, bevestigen praktische hiaten | Accountbeheerder + organisatie |
| Eerstvolgende codewijziging | Metadata, zichtbare context, structured data, preloadcontrole, SEO-QA | Websitebeheer |
| Vóór brede sociale campagne | Live controles, deelpreviews, bronfiche | Websitebeheer + communicatie |
| Daarna binnen een week | OC-kanalen, Stad/Kursaal, UiT-record | Organisatie / communicatie met publicatierechten |
| Wekelijks tot inschrijfsluiting | Index- en verkeerssignalen, fouten, actualiteit | Websitebeheer + organisatie |
| Bij inschrijfstart/sluiting of uitverkocht | Website en alle verspreide records synchroniseren | Organisatie bevestigt; beheer verwerkt |
| Na 24 december 2026 | Afgelopen-status, inschrijfuitnodiging weghalen, eventuele terugblik | Websitebeheer + organisatie |
| Bij volgende bevestigde editie | Jaarovergang en blijvend archief | Websitebeheer |

Dit zijn werkafspraken voor uitvoering, geen ingestelde herinneringen of reeds gedane publicaties.

## 9. URL-beleid na kerst

Voor deze campagne de bestaande gedeelde homepage behouden. Geen identieke kopie op `/kerstfeest-2026/` toevoegen uitsluitend voor SEO.

Bij de jaarovergang: editie 2026 naar een zelfstandige historische pagina met eigen canonical en duidelijke afgelopen-datum overbrengen, homepage als actuele ingang gebruiken en naar de terugblik linken. Voor een volgende bevestigde editie een blijvende eigen evenement-URL kiezen, bijvoorbeeld `/kerstfeest-2027/`, zodat die pagina per evenement kan blijven bestaan. De homepage wordt dan de algemene ingang met een samenvatting en link. Event-markup hoort op de eigenlijke evenementpagina. Geen dubbele volledige pagina's.

Oude 2026-informatie niet stilzwijgend wijzigen naar 2027. Geen nieuwe datum of prijs voorspellen voordat die bevestigd is. Historische pagina blijft waardevol als feitelijke terugblik; alleen verwijderen bij een concrete inhoudelijke reden.

## 10. Oplevercontrole bij uitvoering

- [ ] `npm run build` slaagt; gegenereerde HTML bevat de bevestigde gegevens.
- [ ] Bestaande content-/metadata-tests actualiseren waar ze oude feiten verwachten; daarna gerichte tests uitvoeren.
- [ ] SEO-check toevoegen die werkelijk gegenereerde output controleert: canonical, robots/sitemapconsistentie, één hoofdkop, JSON-LD, tijdzone, verboden preview-output en bestaand deelbeeld.
- [ ] Eventstatus en ticketstatus niet verwarren; ontbrekende gegevens leiden niet tot verzonnen eigenschappen.
- [ ] Structured data controleren met Schema Markup Validator en Google's Rich Results Test; waarschuwingen inhoudelijk beoordelen.
- [ ] Na publicatie HTTP-status, canonical, metadata, sitemap en robots opnieuw live controleren; ook als Googlebot/sociale crawler geen blokkade ondervindt.
- [ ] Mobiele PageSpeed-test en een echte appbrowsercontrole vastleggen.
- [ ] Facebook/WhatsApp-preview daadwerkelijk bekijken.
- [ ] Search Console inspectie en sitemapresultaat vastleggen, inclusief nog openstaande Google-verwerking.
- [ ] Organisator, beheerder, datum en extern record per distributiekanaal noteren, zodat updates uitvoerbaar blijven.

## 11. Bewust geen prioriteit

Geen meta-keywords, gekochte links, losse pagina's voor identieke zoekwoorden of willekeurige blogartikelen. Geen meertaligheid zonder echte vertaling en onderhoudscapaciteit; nu volstaat Nederlands zonder hreflang-configuratie. Geen `llms.txt` of sitemap-index als voorwaarde voor Google-vindbaarheid.

FAQ-antwoorden zijn waardevol voor mensen en voor duidelijke pagina-inhoud. Er wordt geen FAQ-rich-resultproject gepland: Google meldt in zijn actuele documentatie-updates dat deze zoekweergave is beëindigd. Bron: [Google documentatie-updates](https://developers.google.com/search/updates).

## Bronnen en bewijsgrenzen

Officiële richtlijnen zijn op 20 oktober 2026 geraadpleegd. De openbare audit geeft geen toegang tot Search Console, DNS-beheer, sociale accounts, inschrijfadministratie of echte bezoekersmetingen.

- [Google SEO-basis](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google Search Console starten](https://developers.google.com/search/docs/monitor-debug/search-console-start)
- [Google URL-inspectie](https://support.google.com/webmasters/answer/9012289)
- [Google page experience](https://developers.google.com/search/docs/appearance/page-experience)

De inzetverdeling is: eerst indexering en deelname-informatie, daarna relevante lokale verspreiding en sociale klikervaring, vervolgens optimaliseren op werkelijke gegevens.
