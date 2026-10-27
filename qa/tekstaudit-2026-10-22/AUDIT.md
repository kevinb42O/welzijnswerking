# Diepe tekstaudit — Welzijnswerking Oostende

22 oktober 2026 · Audit van de huidige lokale website en de bijbehorende publicatieteksten.

## Oordeel

De website is begrijpelijk, maar redactioneel nog niet af. De zwakste plekken zijn de stapeling van sfeerwoorden in de hero, herhaalde geruststelling, een verhaalblok dat weinig toevoegt en een inschrijfroute die duidelijker klinkt dan de beschikbare informatie rechtvaardigt. De belangrijkste verbetering is daarom: concreter vertellen wat de bezoeker kan verwachten en eerlijker aangeven wat al bekend is over inschrijven.

Er zijn **38 bevindingen**, met verschillende ernst. Dit zijn geen 38 fouten van hetzelfde gewicht. P1 vraagt correctie of expliciete inhoudelijke afhandeling; P2 vraagt een gerichte herschrijving of inkorting; P3 is verdere verfijning of onderhoud. Stijloordelen zijn redactionele beoordelingen, geen objectief bewezen conversieproblemen.

De huidige hero en enkele warme formuleringen zijn eerder door de opdrachtgever gevraagd. Ze worden hier opnieuw kritisch beoordeeld omdat deze audit daar expliciet om vraagt. Dat betekent niet dat de eerdere keuze een onbedoelde placeholder was.

De audit past **geen publieke teksten aan**. De voorstellen hieronder zijn reviewbare concepten. Onbevestigde praktische afspraken zijn niet ingevuld.

## Bereik en bewijs

Gelezen: alle Astro-componenten en de hoofdpagina, de centrale evenementgegevens, historische bijdragers, centrumgegevens en openingsuren, scripts met dynamische meldingen, publicatiestatussen, SEO- en agendagenerator, sponsor- en fototemplates, onderzoeksteksten en de deelteksten voor sociale media en lokale agenda's. De relevante product- en ontwerpcontext is meegenomen.

De huidige route is in Chromium geladen op de bestaande lokale ontwikkelserver `http://127.0.0.1:4323/`. Vastgelegd zijn de standaardtekst, de uitgeklapte centrum- en foto-onderdelen, het mobiele menu, metadata, labels en alternatieve teksten. De ontwikkelvarianten voor uitverkocht, afgesloten, beschikbare centruminschrijving en ontbrekende ticketlink zijn afzonderlijk bekeken. Het huidige sociale deelbeeld is visueel gelezen.

Bewijsbestanden in deze map:

- `zichtbare-tekst-desktop.txt`: tekst in de standaardweergave.
- `uitgeklapte-tekst.txt`: tekst met de centra en aanvullende onderdelen geopend; de FAQ houdt door zijn exclusieve gedrag één antwoord tegelijk open.
- `tekstinventaris.json`: koppen, links, knoppen, alt-teksten en metadata uit de geladen pagina.
- `statusvarianten.json`: werkelijk gerenderde teksten in vier ontwikkelvarianten.
- `mobiel-menu.txt` en `mobiel-menu.png`: tekst en weergave van het mobiele menu.
- `hero-toegankelijke-naam.txt`: de h1 wordt door Chromium correct als één zin aangeboden. De aaneengeplakte `textContent` uit de inventaris is dus geen aangetoond toegankelijkheidsprobleem.
- `desktop.png`: overzicht van de uitgeklapte pagina; uitsluitend contextbewijs. Niet alle lui geladen foto's zijn in deze opname ingeladen.

De foto-viewercopy en foutmeldingen zijn op bronniveau beoordeeld. Een aanvullende poging om de geladen viewer-caption automatisch vast te leggen liep vast op een wachttijd; een geslaagde runtimecontrole van die caption wordt hier niet geclaimd. Externe feiten zijn niet opnieuw op internet onderzocht. De naamcorrectie hieronder berust op de bestaande onderbouwing in het projectdossier, geen nieuwe broncontrole. Er is geen productie-deployment gecontroleerd.

## 1. Inhoudelijke helderheid en vertrouwen

### 01 — Inschrijfroute is bekend, beschikbaarheid niet · P1

**Vindplaats:** `data/inhoud_2026.json:44–45`, `src/components/WelcomeSection.astro:20`, `src/components/SiteFooter.astro:11–12`, `src/data/seo.mjs:15–23`.

**Nu:** “Je schrijft je in via een van de negen ontmoetingscentra in Oostende.” In de footer: “Bekijk waar je kunt inschrijven.” Tegelijk staat de status op `not_confirmed` en ontbreken de inschrijfperiode en betaalwijze.

**Probleem:** de bezoeker leert waar de inschrijving verloopt, maar krijgt geen helder antwoord op de eerste praktische vraag: kan ik nu al inschrijven? De gebiedende of tegenwoordige formuleringen kunnen beschikbaarheid suggereren. `not_confirmed` betekent bovendien niet automatisch dat de inschrijving nog niet open is.

**Voorstel voor de huidige kennisstand:**

> Inschrijven verloopt via de negen ontmoetingscentra in Oostende. Wanneer je kunt inschrijven en hoe je betaalt, is hier nog niet bekend. Bel een centrum voor informatie over de inschrijving.

Korte status bij de actie: **“Inschrijfperiode nog niet bekend.”** Knop: **“Bekijk de ontmoetingscentra”**. Dit zegt wat de site weet zonder ten onrechte “nog niet open” te beweren. Na bevestiging moeten website, FAQ, metadata en deelteksten samen worden aangepast.

### 02 — “Inbegrepen dranken” loopt vooruit op een onbevestigd gegeven · P1

**Vindplaats:** `data/inhoud_2026.json:33,52`; zichtbaar via `WelcomeSection.astro:21` en `PracticalInfo.astro:12`.

**Nu:** “Informatie over de inbegrepen dranken volgt.”

**Probleem:** deze zin suggereert dat dranken inbegrepen zijn en dat alleen de keuze nog moet volgen. Het dossier bevestigt die inclusie niet.

**Voorstel:** **“Het menu en de informatie over dranken worden later bekendgemaakt.”** Als prijsinclusie expliciet moet worden benoemd: **“Of er dranken bij de prijs inbegrepen zijn, is nog niet bekend.”** Gebruik die tweede versie alleen zolang dit werkelijk de kennisstand is. Pas ook het momenteel ongebruikte `priceNote` aan, zodat de oude suggestie niet terugkomt.

### 03 — Inschrijfuitnodiging blijft staan bij uitverkocht en afgesloten · P1

**Vindplaats:** `src/components/MeetingCentres.astro:23`, `src/components/CentreMap.astro:38`.

**Nu:** “Een vraag over inschrijven? Bel gerust even.” En op de kaart: “Bel het centrum om te vragen wanneer je kunt inschrijven voor het kerstfeest.”

**Probleem:** deze teksten blijven daadwerkelijk staan in beide gesloten ontwikkelvarianten. Andere delen van de pagina melden dan wel dat het feest uitverkocht is of dat de inschrijvingen afgesloten zijn. De kaart wekt daardoor onterecht de indruk dat er alsnog een inschrijfmoment te vinden is.

**Voorstel bij gesloten inschrijving:** “Hier vind je de contactgegevens en openingsuren van de ontmoetingscentra.” Op de kaart volstaat een toelichting over afwijkende openingsuren. Alleen een wachtlijst of uitzonderingsroute noemen als die bevestigd is. De huidige live gegevens staan niet op gesloten; dit is een latente publicatiefout.

### 04 — Naam Sam wijkt af van de eigen vastgelegde onderbouwing · P1

**Vindplaats:** `src/components/StorySection.astro:8`; vergelijking met `src/data/history.ts:14` en `03_ONDERZOEK_EN_BRONNEN.md:76,142`.

**Nu:** “chef Sam Vancompenolle”. In de partnerlijst staat “Sam Vancoppenolle”. Het onderzoeksdossier verklaart het persverschil en onderbouwt **Vancoppenolle**.

**Voorstel:** uniform **“Sam Vancoppenolle”** gebruiken. Een naam is geen stijlvariant. De volledige namenlijst verder niet op goed geluk corrigeren: deze audit heeft de overige personen en hun volgorde niet extern herbevestigd.

### 05 — Een algemeen bereikbaarheidslinkje beantwoordt de toegankelijkheidsvraag niet · P1 — ontbrekende informatie

**Vindplaats:** `data/inhoud_2026.json:46–47`, `src/components/PracticalInfo.astro:13,32`.

**Nu:** “Bereikbaarheid Kursaal”; specifieke toegankelijkheid en vervoer worden wegens lege velden niet getoond.

**Probleem:** iemand die een rolstoel gebruikt of moeilijk stapt, moet kunnen bepalen of deelname haalbaar is. De tekst zegt niets over de gebruikte ingang, zaal of beschikbare hulp. Een algemene locatiepagina bevestigt geen evenementafspraken.

**Afhandeling:** vraag de feitelijke ingang, zaal, toegankelijkheidsvoorzieningen en het juiste aanspreekpunt op. Geef daarna concrete informatie. Intussen kan het externe linklabel duidelijker: **“Bereikbaarheid van het Kursaal”**. Schrijf niet “volledig toegankelijk” op basis van alleen de locatie.

### 06 — Geen rechtstreeks contact voor vragen aan de organisatie · P1 — ontbrekende informatie

**Vindplaats:** `data/inhoud_2026.json:8–9`, `src/components/WelcomeSection.astro:23`, `src/components/SiteFooter.astro:17`.

**Nu:** de contactvelden zijn leeg, waardoor de contacttekst verdwijnt.

**Probleem:** de centra zijn de enige zichtbare belroute. Voor dieetvragen, begeleiding of specifieke deelnamevoorwaarden is niet aangegeven wie het antwoord kan geven. De audit bevestigt niet dat alle centra zulke vragen afhandelen.

**Afhandeling:** één goedgekeurd organisatorcontact toevoegen en zijn functie benoemen, bijvoorbeeld **“Vragen over het kerstfeest? Mail …”**. Gebruik geen verzonnen adres en geen telefoonnummer van het Kursaal als organisatorcontact.

### 07 — Algemene openingsuren zijn nog geen inschrijfuren · P2

**Vindplaats:** `src/components/CentreHours.astro:7–17`, `src/components/MeetingCentres.astro:78–80,90`.

**Nu:** uitgebreide openingsuren, afzonderlijke loketuren en meerdere waarschuwingen dat ze kunnen verschillen.

**Probleem:** ondanks de waarschuwingen kan iemand algemene loketuren lezen als uren waarop het kerstfeest geregeld kan worden. Het dossier zegt expliciet dat dit niet bevestigd is.

**Voorstel bij de uren:** **“Dit zijn de algemene openingsuren. Bel het centrum om te vragen wanneer je kunt inschrijven voor het kerstfeest.”** Houd vervolgens één toelichting over het verschil met de loketuren. Herhaal dezelfde waarschuwing niet in elke omringende tekstlaag.

### 08 — Informatie over aankomst en bijzondere afspraken ontbreekt · P2 — inhoudelijke open punten

**Vindplaats:** `data/inhoud_2026.json:36,38,39,41–42`; `CONTENT_TODO.md`.

**Ontbrekend:** deuren open, gebruikte ingang en zaal, afspraken over dieet/allergenen, eventuele woonplaatsvereiste en begeleiders. Niet alle onderwerpen hoeven op de homepage, maar ze kunnen wel beslissend zijn voor deelname.

**Afhandeling:** inhoudelijk bevestigen en op de relevante plek aanvullen. Het beginuur niet hernoemen tot aankomstuur. “Voor alleenstaanden vanaf 50 jaar” geeft op zichzelf geen antwoord op woonplaats, begeleiding of de praktische interpretatie van “alleenstaand”. Geen voorwaarden bij verzinnen.

## 2. Generieke, geforceerde en onnodig zachte taal

### 09 — De hero-intro is de duidelijkste generieke marketingzin · P2

**Vindplaats:** `data/inhoud_2026.json:51`.

**Nu:** “Geniet van een feestelijk diner, sfeervolle muziek en een warme avond vol nieuwe ontmoetingen.”

**Probleem:** drie sfeerclaims op rij, ingeleid door het standaardwerkwoord “Geniet”. “Vol nieuwe ontmoetingen” klinkt als een beloofde sociale uitkomst. De zin zou op bijna elk kerstfeest kunnen staan. Dit is de duidelijkste kandidaat voor wat je “cringe” of generiek kunt noemen, al is het een eerder bewust gekozen warme formulering.

**Voorkeursvoorstel:** **“Een diner en muziek op kerstavond, samen met andere alleenstaanden in het Kursaal.”**

Iets uitnodigender, nog steeds concreet: **“Kom op kerstavond mee eten in het Kursaal, met muziek van Patrick ‘Pulle’ en een verrassingsgast.”** De artiest is centraal bevestigd; zijn naam moet bij toekomstige wijzigingen uit dezelfde gegevens blijven komen. De eerste versie houdt de hero rustiger en laat programmadetails lager op de pagina.

### 10 — “Ontdek hoe je inschrijft” maakt een praktische stap onnodig promotioneel · P2

**Vindplaats:** `src/components/EventHero.astro:24`.

**Probleem:** “Ontdek” voegt hier geen betekenis toe. Het is een praktische uitleg, geen ontdekking. De knop gaat bovendien naar een tussenstap.

**Voorstel:** **“Hoe schrijf ik me in?”** als vaste actie naar de uitleg. Als hij rechtstreeks naar de centra gaat: **“Bekijk de ontmoetingscentra”**. Noem de knop pas “Schrijf je in” wanneer de bestemming de inschrijving werkelijk laat uitvoeren.

### 11 — “Je mag gerust alleen komen” klinkt licht betuttelend · P2

**Vindplaats:** `src/components/WelcomeSection.astro:12`.

**Probleem:** de geruststelling is zinvol, maar “je mag” klinkt als toestemming en “gerust” maakt de formulering zachter dan nodig. Alleenstaanden hoeven niet automatisch sociaal onzeker te zijn.

**Voorstel:** doelgroep in de introductie behouden en de sociale geruststelling bij de FAQ onderbrengen. Daar: **“Ja. Je hoeft niemand te kennen om deel te nemen.”** Een warme toon kan zonder toestemmingstaal.

### 12 — “Je schrijft je gewoon voor jezelf in” minimaliseert de drempel · P2

**Vindplaats:** `src/components/WelcomeSection.astro:19`.

**Nu:** “Ja. Je hoeft niemand te kennen of iemand mee te brengen. Je schrijft je gewoon voor jezelf in.”

**Probleem:** “gewoon” maakt iets dat voor de bezoeker lastig kan zijn schijnbaar eenvoudig. De laatste zin voegt weinig toe.

**Voorstel:** **“Ja. Je hoeft niemand te kennen of iemand mee te brengen.”** Geen ontvangst, tafelindeling of persoonlijke begeleiding beloven zolang die afspraken niet bevestigd zijn.

### 13 — “Bel gerust even” en “Even bellen?” verzachten de instructie te veel · P2

**Vindplaats:** `src/components/MeetingCentres.astro:23,90`; contactvariant in `WelcomeSection.astro:23`.

**Probleem:** “gerust”, “even”, een losse vraag en de uitleg eronder stapelen vriendelijkheid op. De bezoeker heeft vooral behoefte aan een reden om te bellen. “Even” zegt bovendien niets over wachttijd of bereikbaarheid.

**Voorstel:** **“Bel het centrum voor je langskomt”**, gevolgd door **“Vraag wanneer je kunt inschrijven en hoe je betaalt.”** Dat mag als vraagadvies; het beweert niet dat telefonische inschrijving mogelijk is. Pas het advies aan de actuele status aan.

### 14 — “Negen plekken om binnen te stappen” is gemaakt gezellig en minder precies · P2

**Vindplaats:** `src/components/CentreMap.astro:16`.

**Probleem:** het verandert een functioneel kaartonderdeel in een mini-slogan. “Binnenstappen” kan spontane beschikbaarheid suggereren terwijl juist om vooraf bellen wordt gevraagd.

**Voorstel:** **“De negen ontmoetingscentra”**, met de bestaande nuttige instructie “Kies een stip op de kaart of een centrum uit de lijst.”

### 15 — “Een ontmoetingscentrum dicht bij jou.” is warm, maar verbergt de taak · P3

**Vindplaats:** `src/components/MeetingCentres.astro:22`.

**Beoordeling:** geen slechte tekst en geen placeholder. De kop is eerder bewust gekozen. Hij zegt alleen niet waarom de bezoeker een centrum zoekt en garandeert geen werkelijke nabijheid.

**Mogelijke verfijning:** **“Vind een ontmoetingscentrum in Oostende”**. Als de huidige kop behouden blijft, laat de eerste zin eronder expliciet aansluiten op inschrijven. Een volledige toonwijziging is niet noodzakelijk.

### 16 — “Liever niet alleen thuis op kerstavond?” vertrekt vanuit een tekort · P2

**Vindplaats:** `plans/DEELTEKSTEN_KERSTFEEST_2026.md:19`; concept, niet zichtbaar op de hoofdpagina.

**Probleem:** de openingsvraag veronderstelt dat alleen thuis zijn iets is waaraan de lezer wil ontsnappen. Dat kan een onnodig zielige of belerende ondertoon geven.

**Voorstel:** **“Vier je kerstavond graag samen?”** Daarna de concrete datum, doelgroep, uren, prijs en actuele inschrijfinformatie. De doelgroep “alleenstaanden” als feit behouden.

### 17 — “Feestelijk meergangendiner” is correct, maar stijf bij veel herhaling · P3

**Vindplaats:** `data/inhoud_2026.json:34`, `WelcomeSection.astro:21`, `src/data/calendar.mjs:24`, deeltekst voor agenda's.

**Beoordeling:** geen cringe op zichzelf. Het lange woord voelt vooral zwaar doordat het op meerdere plekken terugkomt.

**Voorstel:** **“Diner met meerdere gangen”** in de praktische maaltijdomschrijving; in korte wervende tekst gewoon **“diner”**. Geen aantal gangen of gerechten toevoegen. Gebruik “meergangendiner” eventueel één keer als formele omschrijving.

## 3. Herhaling en tekst die weinig toevoegt

### 18 — Vier tot vijf inschrijfacties gebruiken telkens andere woorden · P2

**Vindplaats:** header, hero, `WelcomeSection.astro:20`, `PracticalInfo.astro:25–27`, footer.

**Nu:** “Hoe inschrijven?”, “Ontdek hoe je inschrijft”, “Bekijk hoe je inschrijft”, “Vind een ontmoetingscentrum”, “Bekijk waar je kunt inschrijven”.

**Probleem:** acties mogen terugkomen op een lange pagina, maar dezelfde stap krijgt steeds een andere formulering. Dat maakt de route langer en minder herkenbaar.

**Voorstel:** één label voor uitleg (**“Hoe schrijf ik me in?”**) en één voor de centrumkeuze (**“Bekijk de ontmoetingscentra”**). Een FAQ-link over inschrijven moet dezelfde stap aanwijzen. Herhaling van een belangrijke actie hoeft niet helemaal weg.

### 19 — Doelgroepinformatie verschijnt vaker dan nodig · P2

**Vindplaats:** hero, welkom, praktische detailgroep “Deelname”, historische voetnoot; daarnaast metadata en deelteksten.

**Probleem:** de hoofdvoorwaarde staat binnen de pagina op vier plekken. De afzonderlijke groep “Deelname” bevat momenteel uitsluitend dezelfde doelgroepregel.

**Voorstel:** behouden in de hero en als volwaardig antwoord bij “Voor wie?”. De praktische groep pas uitbreiden wanneer er aanvullende voorwaarden of aankomstgegevens zijn; anders inkorten of weglaten. De historische leeftijdsgrens moet alleen blijven als duidelijke editiecontext, niet als nog een actuele inschrijfuitleg. Metadata heeft een eigen functie en telt hier niet als overbodige paginaherhaling.

### 20 — De vraag over alleen komen herhaalt de intro bijna letterlijk · P2

**Vindplaats:** `WelcomeSection.astro:12,19`.

**Probleem:** “ook als je niemand kent” staat al boven de foto; direct daarnaast vraagt de FAQ “Kan ik komen als ik niemand ken?”. Het antwoord voegt nauwelijks nieuwe informatie toe.

**Voorstel:** gebruik de intro voor de doelgroep en de FAQ voor de sociale vraag. Alleen de FAQ schrappen als de geruststelling volledig en zichtbaar in de introductie blijft.

### 21 — Het verhaalblok vertelt vooral wat de pagina al heeft verteld · P2

**Vindplaats:** `src/components/StorySection.astro:5`.

**Nu:** “Welzijnswerking Oostende organiseert een kerstfeest voor alleenstaanden in het Kursaal.” Daarna de jaren negentig en de herstart in 2025.

**Probleem:** de eerste zin is op dit punt volledig bekend. De twee historische feiten staan verderop nogmaals in de tijdlijn en voetnoot. De kop belooft meer organisatieverhaal dan de inhoud levert.

**Voorstel op basis van bestaande feiten:** **“Welzijnswerking Oostende brengt sinds de jaren negentig alleenstaanden samen tijdens de kerstperiode. In 2025 keerde het feest terug naar kerstavond.”** Laat de tijdlijn vervolgens de aantallen en specifieke edities dragen. Voor een echt organisatieportret zijn nieuwe bevestigde gegevens nodig; geen missie of vrijwilligersfilosofie verzinnen.

### 22 — Het locatieblok voegt vrijwel alleen “zeedijk” toe · P2

**Vindplaats:** `src/components/StorySection.astro:6`.

**Nu:** kop “Kursaal Oostende” en zin “Het kerstfeest vindt plaats in het Kursaal Oostende, aan de Oostendse zeedijk.”

**Probleem:** locatie staat al in de bovenregel, titel, feitenstrook en praktische informatie. Het blok vult vooral ruimte naast een foto.

**Voorstel:** behoud de foto met een helder bijschrift en schrap de herhalende alinea. Of gebruik deze ruimte later voor werkelijk nuttige aankomstinformatie. Geen decoratieve beschrijving van het gebouw toevoegen om de ruimte alsnog te vullen.

### 23 — De organisatiepresentatie in 2025 wordt drie keer beschreven · P2

**Vindplaats:** `src/components/StorySection.astro:8`.

**Nu:** fotobijschrift “Aankondiging kerstfeest · november 2025”, kop “De organisatie in 2025” en alinea over het voorstellen van de terugkeer in november 2025.

**Probleem:** drie tekstlagen voor één mededeling, gevolgd door een lange namenlijst.

**Voorstel:** kop **“De organisatie bij de aankondiging in 2025”**, beknopt bronbijschrift en de gecontroleerde namenlijst. De losse alinea kan weg. De namenlijst is concrete informatie, geen generieke opvulling; behoud haar als identificatie gewenst is.

### 24 — De tijdlijnvoet herhaalt de geschiedenis en formuleert de doelgroep stroef · P2

**Vindplaats:** `src/components/HistorySection.astro:11`.

**Nu:** opnieuw “Het initiatief gaat terug tot de jaren negentig.” Daarna: “De editie 2025 was voor alleenstaande 65-plussers. 2026: Voor alleenstaanden vanaf 50 jaar.”

**Probleem:** herhaling van het verhaal, gevolgd door een databaseachtige samenvoeging van jaar en standaardzin.

**Voorstel:** de bron voor de oorsprong bij het betreffende verhaal plaatsen. Als de leeftijdsvergelijking relevant blijft: **“In 2025 was het feest bedoeld voor alleenstaanden vanaf 65 jaar. In 2026 kunnen alleenstaanden vanaf 50 jaar deelnemen.”** Gebruik 65-plus uitsluitend voor de historische editie.

## 4. Bedieningslabels, hulpteksten en historische bedanking

### 25 — De centrum- en kaartintro zeggen bijna hetzelfde · P2

**Vindplaats:** `MeetingCentres.astro:22–23`, `CentreMap.astro:11,16,25`.

**Nu:** dichtbij jou → in jouw buurt → “Ontdek welk ontmoetingscentrum bij jou in de buurt ligt” → negen plekken → welk centrum zoek je.

**Probleem:** na het kiezen van een wijk introduceert de kaart dezelfde zoektaak opnieuw met meerdere tekstlagen.

**Voorstel:** hoofdintro **“Kies je wijk om de contactgegevens van een centrum te bekijken.”** Kaartknop **“Bekijk de centra op de kaart”**. De tweede promotionele regel daaronder kan weg. Selectlabel **“Kies een centrum”**. Houd de concrete kaartbediening apart.

### 26 — “Terug naar wijkkeuze” beschrijft de werkelijke actie onvolledig · P2

**Vindplaats:** `src/scripts/centre-finder.ts:100`.

**Probleem:** de knop herstelt de laatst gekozen wijk; hij opent niet een nieuwe keuzepagina. De wijkkeuze zelf blijft beschikbaar.

**Voorstel:** dynamisch **“Toon alleen [wijknaam]”**, bijvoorbeeld “Toon alleen Mariakerke”. Dit maakt de uitkomst duidelijker. De andere toestand blijft “Bekijk alle 9 centra”.

### 27 — Mobiele kaartinstructie moet bij het echte gebaar passen · P2 — verificatie nodig

**Vindplaats:** `src/components/CentreMap.astro:41`, `src/scripts/centre-map.ts` bij `dragging: !narrow.matches` en `touchZoom: true`.

**Nu:** “Op je telefoon verplaats je de kaart met twee vingers.”

**Probleem:** de code schakelt slepen op smalle schermen uit en laat touch-zoom toe. Een instructie voor vrij verplaatsen met twee vingers is daarmee niet vanzelf bewezen. Deze audit bevat geen fysieke touchscreenproef; dit is een concrete verificatievraag, geen bewezen gebarenbug.

**Voorstel zolang dit niet getest is:** **“Gebruik de plus- en minknop om in of uit te zoomen. Kies een centrum voor het adres en de route.”** De uitleg over verschoven stippen alleen tonen waar nodig; “een lijntje bij een verschoven stip” vraagt veel interpretatie.

### 28 — Fotolink vermeldt de externe bestemming niet zichtbaar · P2

**Vindplaats:** `src/components/EventArchive.astro:47`.

**Nu:** “Bekijk alle 38 foto’s bij Welzijnswerking Oostende”.

**Probleem:** de link gaat naar Facebook. De bezoeker kan een intern album verwachten en komt mogelijk op een login- of toestemmingsscherm terecht.

**Voorstel:** **“Bekijk het volledige fotoalbum op Facebook”**. Het aantal 38 alleen behouden zolang de albumtelling gecontroleerd blijft. Dit advies betreft duidelijke bestemming, geen claim dat Facebook voor iedereen ontoegankelijk is.

### 29 — Foto-instructie is muisgericht · P3

**Vindplaats:** `src/components/EventArchive.astro:19`.

**Nu:** “Klik op een foto om ze te vergroten.”

**Voorstel:** **“Open een foto om ze groter te bekijken.”** Werkt voor aanraken en toetsenbord. De bestaande Vlaamse verwijzing met “ze” is niet op zichzelf fout. “Tijd om te dansen”, “Gasten aan tafel” en “Vrijwilligers in de keuken” zijn bruikbare concrete bijschriften en hoeven niet mooier gemaakt te worden.

### 30 — “Zet in mijn agenda” past niet bij de rest van de aanspreekvorm · P3

**Vindplaats:** `src/components/PracticalInfo.astro:37`.

**Probleem:** de pagina spreekt de bezoeker verder met “je” aan. Dit label schakelt over naar de stem van de bezoeker en laat het object weg.

**Voorstel:** **“Zet het kerstfeest in je agenda”**. De waarschuwing **“Deze herinnering is geen inschrijving”** is nuttig en moet blijven. Voor de hele-dagvariant: **“Deze herinnering bevat alleen de datum en is geen inschrijving.”** Gebruik ook daar “inschrijving” in plaats van “reservatie”.

### 31 — Historische partnerteksten hebben geen gelijkwaardige stijl · P2

**Vindplaats:** `src/data/history.ts:10–16`.

**Nu:** van één woord (“Aperitiefhapjes.”) via een persoonsnaam met dubbele punt tot de stroefste regel: “Steun, het hoofdgerecht uit de stedelijke centrale keuken en helpende medewerkers.” “Ticketkanalen” klinkt intern.

**Voorstel:** korte, parallelle bijdragen, met behoud van het historische jaar in de sectiekop:

| Partner | Voorgestelde omschrijving |
|---|---|
| Revi Food | Verzorgde de aperitiefhapjes. |
| Gastrobar Sam | Sam Vancoppenolle verzorgde het voorgerecht met Oostendse garnalen. |
| Restaurant North | Verzorgde de vissoep samen met Rederij Desmit. |
| Rederij Desmit | Werkte met Restaurant North mee aan de vissoep. |
| Stad Oostende | Ondersteunde het feest met medewerkers en een hoofdgerecht uit de stedelijke centrale keuken. |
| GO! Vesaliusinstituut | Leerlingen hielpen mee tijdens het feest. |
| Kursaal Oostende | Ondersteunde het feest met de locatie, communicatie en ticketverkoop. |

De laatste vervanging vereist controle: “ticketkanalen” is breder dan “ticketverkoop”. Gebruik “ticketverkoop” alleen als dat de werkelijke bijdrage juist weergeeft. Maak de rollen niet groter om de bedanking voller te laten klinken. Gezamenlijke vissoepbijdrage mag ook één keer als gedeelde toelichting worden geschreven.

### 32 — De footer gebruikt andere benamingen dan de pagina · P3

**Vindplaats:** `src/components/SiteFooter.astro:16`.

**Nu:** “Praktisch & deelname” versus “Praktische info/informatie”; “Ons verhaal” versus “Over Welzijnswerking”.

**Voorstel:** **“Praktische informatie”**, **“Over Welzijnswerking”**, **“Vorige edities”**, **“Partners van 2025”**. Dat maakt dezelfde bestemmingen herkenbaar. De footerzin “Wil je erbij zijn op kerstavond?” kan blijven; die heeft als afsluitende uitnodiging een duidelijke functie.

### 33 — Redactionele huisstijl is nog niet uniform · P3

**Vindplaats:** `EventHero.astro`, `PracticalInfo.astro`, `HistorySection.astro`, `SiteFooter.astro`, `src/data/centre-hours.ts`.

**Voorbeelden:** “17.00 – 21.30 uur” versus “17.00 uur – 21.30 uur”; koppen met en zonder eindpunt; “info” versus “informatie”; “reservatie” naast “inschrijving”; dagen deels afgekort (“Ma, wo, do en vr”), deels voluit.

**Voorstel:** één woordenlijst en notatieregel. Tijden **“17.00–21.30 uur”**; gewone sectiekoppen zonder eindpunt; **“inschrijven/inschrijving”** voor deelname; **“praktische informatie”** als vaste sectienaam. In het urenoverzicht bij voldoende ruimte dagen voluit: “Maandag, woensdag, donderdag en vrijdag”. De hero mag als bewuste uitnodigingszin zijn eindpunt behouden. Dit zijn afwerkingskeuzes, geen reden om alle correcte korte labels te vervangen.

## 5. Metadata, deelbeeld en achtergebleven tekstlagen

### 34 — Het sociale deelbeeld noemt de doelgroep niet · P1

**Vindplaats:** `public/kerstfeest-2026-social.jpg`, visueel gecontroleerd; bron `assets/social/kerstfeest-2026-master.png`.

**Nu zichtbaar in het beeld:** “Kerstavond. Samen aan tafel.”, datum en uren, Kursaal Oostende, prijs en website. **“Voor alleenstaanden vanaf 50 jaar” ontbreekt.**

**Probleem:** als het beeld los wordt doorgestuurd, lijkt het een algemeen kerstfeest voor € 5. De begeleidende webmetadata bevat de doelgroep wel, maar reist niet noodzakelijk mee met een los beeld.

**Voorstel bij een volgende expliciete beeldbewerking:** de doelgroep leesbaar opnemen. Dat is belangrijker dan nog een sfeerzin. De slogan “Samen aan tafel” is op zichzelf goed en hoeft niet weg. Het deelbeeld is eerder goedgekeurd; deze audit verandert het niet automatisch.

### 35 — De alternatieve tekst voor het deelbeeld beschrijft een andere tekst · P2

**Vindplaats:** `src/data/seo.mjs:25–28`, `scripts/generate-social-card.mjs`.

**Nu:** de alt-tekst wordt samengesteld uit de huidige webhero “Vier kerstavond samen in het Kursaal.” en evenementgegevens. Het daadwerkelijke beeld zegt “Kerstavond. Samen aan tafel.” en bevat geen doelgroep. De SVG-wrapper gebruikt wél de beeldslogan, maar geeft minder gegevens.

**Probleem:** de alt-tekst is een hergebruikte evenementenbeschrijving in plaats van een getrouwe weergave van het deelbeeld. Daardoor kunnen beeld, metadata en latere updates uiteenlopen.

**Voorstel voor het huidige beeld:** **“Uitnodiging van Welzijnswerking Oostende: ‘Kerstavond. Samen aan tafel.’ 24 december 2026, 17.00–21.30 uur, Kursaal Oostende. € 5 per persoon. welzijnswerking.be.”** Na een beeldwijziging ook deze tekst bijwerken. De doelgroep hoort daarnaast in de gewone beschrijving te blijven.

### 36 — De agenda mist de doelgroep en houdt geen rekening met gesloten inschrijving · P2

**Vindplaats:** `src/data/calendar.mjs:22–24`.

**Nu:** “Feestelijk meergangendiner voor € 5 per persoon. Inschrijven via een ontmoetingscentrum. Raadpleeg welzijnswerking.be voor de laatste praktische informatie. Deze agendaherinnering is geen inschrijving.”

**Probleem:** na downloaden staat de agenda los van de website. De belangrijkste deelnamevoorwaarde ontbreekt. De inschrijfzin blijft bovendien ongewijzigd wanneer de status later sluit.

**Voorstel:** **“Kerstfeest voor alleenstaanden vanaf 50 jaar in Kursaal Oostende. Diner met meerdere gangen, € 5 per persoon. Bekijk welzijnswerking.be voor de actuele inschrijfinformatie. Deze agendaherinnering is geen inschrijving.”** Laat de huidige voorwaarde uit de centrale gegevens komen. Bij gesloten inschrijving die status expliciet noemen in een nieuw gedownload bestand. Een eerder opgeslagen agenda-item wordt hierdoor niet automatisch bijgewerkt.

### 37 — “Volgt binnenkort” is een onbepaalde status, geen afdoende instructie · P2 — latente tekst

**Vindplaats:** `src/data/publication.mjs:37`; `src/components/PracticalInfo.astro:28`; `data/inhoud_2026.json:70`.

**Nu:** “Info over deelname volgt binnenkort.” Daarnaast de automatisch samengestelde zin “Ook het aanvangsuur, het menu en de deelnamevoorwaarden worden voor 2026 hier bekendgemaakt.” In de gegevens staat nog “Echte sfeerbeelden van vorige edities volgen binnenkort.”

**Probleem:** “binnenkort” belooft snelheid zonder datum. De grote opsomming leest als een invulsjabloon. In de gesloten ontwikkelvarianten verschijnt die opsomming zelfs onder het bericht dat inschrijven niet meer kan. De fotozin is inmiddels inhoudelijk achterhaald, want er zijn al echte foto's op de hoofdpagina.

**Voorstel:** schrijf per toestand wat concreet ontbreekt en welke actie beschikbaar is. Bijvoorbeeld **“De inschrijfinformatie is nog niet bekend.”** Alleen een contactactie toevoegen als er een werkelijk passend contact beschikbaar is. Menugegevens horen bij het menu, geen algemene opsomming onder een gesloten inschrijfkaart. De fotozin verwijderen of archiveren zolang hij ongebruikt is.

Belangrijk onderscheid: de fotozin wordt momenteel niet gerenderd; hij is een achtergebleven gegevensplaceholder, geen zichtbare live belofte. De fallback in `ticketState` is evenmin de huidige heroactie: die wordt daar door andere logica vervangen.

### 38 — Er bestaat een tweede laag oude of tijdelijke publicatietekst · P3 — onderhoud

**Vindplaats:** `src/components/PhotoGallery.astro:11`; `src/components/ResearchArchive.astro`; `data/inhoud_2026.json:20,33,57,62,70`; `data/sponsors_2026.template.json`; `CONTENT_TODO.md`; `plans/DEELTEKSTEN_KERSTFEEST_2026.md`.

**Concrete voorbeelden:**

- De optionele galerij zegt onder “Foto’s van vorige edities” nog eens “Foto’s van vorige edities, met het jaar en de fotograaf bij elk beeld.” Dat klinkt als een beschrijving van de websitefunctie. Momenteel is de reeks leeg en verschijnt dit blok niet. Als het actief wordt, vervang door **“Bekijk de foto's van eerdere kerstfeesten.”** of laat de extra zin weg.
- Het onderzoeksarchief zegt “De website gebruikt vier geselecteerde eventbeelden” en noemt beelden uit 2016 en 2018 “Opgenomen in de website”. Dat beschrijft de huidige homepage niet. Het archief is development-only; actualiseer de status of label het als een historische onderzoeksselectie.
- `subtitle`, `priceNote`, `history.story`, `historyNote` en `galleryCaptionWhenEmpty` worden momenteel niet als zulke velden in de hoofdpagina gebruikt. Sommige herhalen inhoud die elders hardgecodeerd staat. `historyNote` bevat zelfs de interne verwijzing `event.eligibilityRules`; dat is onderhoudstekst, geen publieke copy.
- Het sponsortemplate bevat “Exacte handelsnaam”, een voorbeelddomein en schemawaarden. Deze zijn opzettelijke invulvoorbeelden. `confirmedSponsors` is leeg; ze zijn geen aangetroffen publieke sponsors.
- `CONTENT_TODO.md` noemt nog de oude sectietitel “Alleen komen. Samen vieren.” en een standaard ingeklapte centrumlijst. De huidige pagina gebruikt een doelgroepkop en directe wijkkeuze. Gebruik die oude beschrijving niet als tekstspecificatie.
- De deelteksten hebben een interne waarschuwing vóór gebruik, maar de kopieerbare berichten zelf formuleren de inschrijfroute al in de tegenwoordige tijd. Bij verspreiding moet dezelfde statusnuance als in bevinding 01 in het bericht staan; een redactienoot wordt meestal niet meegestuurd.

**Afhandeling:** houd publiceerbare gegevens, redactionele notities en testvoorbeelden herkenbaar gescheiden. Haal achterhaalde invulteksten uit actieve gegevensvelden; behoud nuttige ontwikkelfixtures als fixtures. Dit is een beperkte tekstbevinding, geen volledige documentatie-audit en geen opdracht om het historische projectdossier te herschrijven.

## Wat expliciet géén probleem is

- **“Vier kerstavond samen in het Kursaal.”** is een bruikbare, concrete hoofdtitel. “Samen” is hier de kern van het evenement, geen verboden cliché. De actuele drie regels zijn eerder expliciet gevraagd.
- **“Voor alleenstaanden vanaf 50 jaar.”** is helder en essentieel. “Senioren” als actuele hoofdbenaming zou de grens van 50 minder duidelijk maken; gebruik het vooral in de historische context waar het past.
- **“Voor wie?”, “Wanneer”, “Waar”, “Bel De Boeie”, “Sluiten”, “Vorige foto”** zijn goede eenvoudige functionele teksten. Hun eenvoud is een kwaliteit. Ze hoeven geen creatieve vervanging.
- **“Kerstavond 2025 in beeld”** en **“Met dank aan onze partners van 2025”** zijn specifiek. Het jaartal voorkomt dat historische beelden of partners als 2026 worden gelezen.
- De fotoviewer heeft al een bruikbare foutmelding: **“Deze foto kan niet worden geladen. Kies een andere foto of sluit het venster.”** De kaart heeft laad- en foutmeldingen met alternatieven. Geen grappige of overdreven warme fouten toevoegen.
- Er zijn **geen zichtbare lorem-ipsumteksten of demo-sponsors op de huidige hoofdpagina** aangetroffen. De vele DEMO-strings in de bron horen bij expliciete ontwikkelroutes en zijn niet automatisch publicatielekken.
- “Het menu wordt later bekendgemaakt” is op zichzelf een eerlijke tijdelijke mededeling. Het probleem is de onduidelijke drankenclaim en herhaling, niet het bestaan van nog onbevestigde gegevens.

## Voorgestelde tekstlijn voor de belangrijkste route

Deze concepten horen samen. Ze vormen geen definitief goedgekeurde nieuwe copy en vullen geen ontbrekende organisatorische afspraken in.

| Plek | Voorgestelde tekst |
|---|---|
| Hero | Vier kerstavond samen in het Kursaal. |
| Hero-intro | Een diner en muziek op kerstavond, samen met andere alleenstaanden in het Kursaal. |
| Doelgroep | Voor alleenstaanden vanaf 50 jaar. |
| Heroactie naar uitleg | Hoe schrijf ik me in? |
| Welkom | Voor wie is het kerstfeest? |
| Welkomtekst | Het kerstfeest is voor alleenstaanden vanaf 50 jaar. |
| Sociale FAQ | Kan ik komen als ik niemand ken? — Ja. Je hoeft niemand te kennen of iemand mee te brengen. |
| Inschrijfkop | Inschrijven via een ontmoetingscentrum |
| Inschrijfstatus, huidige kennisstand | Inschrijfperiode nog niet bekend. |
| Inschrijftekst | Inschrijven verloopt via de negen ontmoetingscentra in Oostende. Wanneer je kunt inschrijven en hoe je betaalt, is hier nog niet bekend. Bel een centrum voor informatie over de inschrijving. |
| Actie naar centra | Bekijk de ontmoetingscentra |
| Centrumintro | Kies je wijk om de contactgegevens van een centrum te bekijken. |
| Bezoekadvies | Bel het centrum voor je langskomt. Vraag wanneer je kunt inschrijven en hoe je betaalt. |
| Maaltijd | Diner met meerdere gangen · € 5 per persoon |
| Menutoelichting | Het menu en de informatie over dranken worden later bekendgemaakt. |
| Programma | Muziek van Patrick “Pulle” en een verrassingsgast. |
| Agendaactie | Zet het kerstfeest in je agenda |
| Albumactie | Bekijk het volledige fotoalbum op Facebook |

Gebruik niet overal tegelijk het statuszinnetje én de volledige uitleg. Eén korte status en één inhoudelijke uitleg op de hoofdplek zijn voldoende; elders verwijzen naar die plek.

## Volgorde van uitvoering

1. **Eerst helderheid en juistheid:** inschrijfstatus en gesloten varianten, drankenformulering, persoonsnaam en doelgroep in zelfstandige publicaties. Toegankelijkheidsinformatie en organisatorcontact inhoudelijk afhandelen.
2. **Daarna de toon:** hero-intro, “ontdek”, “je mag gerust”, “gewoon”, “even bellen” en de negatieve opening in de doorstuurtekst herschrijven.
3. **Daarna schrappen:** dubbel verhaal, herhaalde locatie, drievoudige organisatie-aankondiging en onnodige herhaling van doelgroep en centrumwaarschuwingen.
4. **Tot slot gelijktrekken:** knoppen, footerlabels, tijdnotatie, agendatekst, sociale alt-tekst en ongebruikte tekstvelden. Na implementatie op mobiel en desktop controleren dat de nieuwe teksten volledig leesbaar blijven en alle toestanden inhoudelijk kloppen.

De beste eindtoon voor dit evenement is gewoon, warm en concreet. De echte avond, mensen en foto's leveren de warmte; de tekst hoeft die niet voortdurend met “sfeervol”, “warme avond” en “nieuwe ontmoetingen” uit te leggen.
