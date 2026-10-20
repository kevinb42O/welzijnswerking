> Dit verslag beschrijft een eerdere grafische versie. De actuele richting en controles staan in `CURRENT_DESIGN.md`. De screenshots direct in `final/` worden bij elke finale browsercontrole bijgewerkt.

# Creatieve eindbeoordeling — 18 oktober 2026

## Daadwerkelijk gebouwd

De bestaande Astro-repository bevat nu een lokale, statische onepager met een eigen grafische kerstidentiteit. Warm rood, papier, een zelfgetekende kandelaar en golven vervangen de groene fotosplit. Bricolage Grotesque vormt de koppen en het nieuwe typografische woordmerk; DM Sans verzorgt lopende tekst en bediening. Beide fonts worden lokaal geladen met licentie.

De pagina bestaat uit een affiche met scanbare datum/locatie/prijs, een korte uitleg van de werking, een redactionele terugblik op 2019 en 2025, een praktisch hoofdstuk met kalenderblad en een historische bedanking. Het huidige ontbreken van echte foto's en 2026-logo's levert geen lege componenten op. Er is geen fictief programma, ticketaanbod of specifieke doelgroep voor 2026 toegevoegd. Geen deployment, DNS-wijziging of wijziging van geheime gegevens uitgevoerd.

## Werkwijze en visueel bewijs

De bestaande screenshots van versie 2 en de beschikbare sfeerbeelden zijn daadwerkelijk bekeken. Drie eigen HTML-concepten zijn op 1440 en 390 px gerenderd en alle zes screenshots geopend. De gekozen affichecompositie is daarnaast met Bricolage, Manrope en DM Sans op dezelfde hero en langere uitleg getest. Vergelijking: `creative-explorations/DECISION.md`.

### Eerste volledige ontwerp — `final/round-1/`

De hero, volledige desktopscroll, eerste drie mobiele schermen en partnersectie zijn visueel geopend. Zwaktes: de maand en het jaar liepen aan elkaar; de mobiele intro was te klein; de locatienaam brak desktop onnodig; de partnerrollen namen te veel regels in; de bronlinks waren te klein.

### Verbeterloop 1 — `final/round-2/`

1. De maand en het jaartal kregen een echte woordspatie en natuurlijke mobiele regel.
2. De mobiele intro ging naar 18 px, met passende ruimte naast de illustratie.
3. Kursaal Oostende kreeg desktop voldoende breedte voor één regel.
4. Partnerrollen werden feitelijk ingekort; culinaire bijdragen werden logischer gegroepeerd.
5. De reportageacties gingen naar 16 px met comfortabele regelafstand.

De nieuwe 390/320-viewports, volledige tabletpagina en partnersectie zijn werkelijk geopend. De feiten en actie staan binnen de standaard eerste schermhoogtes. Nieuwe zwaktes: ongelijke teksthoogtes in de mobiele culinaire kolommen, kleine contextregels, onrustige verdeling van de tabletspread, een te bescheiden organisatorregel en kleine archieffolio's.

### Verbeterloop 2 — `final/round-3/`

1. Culinaire credits kregen mobiel per bijdrage een naamkolom en een beschrijvingskolom; de leegte onder korte bijdragen verdween.
2. De archiefcontext ging naar 15 px.
3. De tabletspread werd evenwichtig in twee gelijke bladbreedtes verdeeld; jaartal en motief kregen passende maten.
4. De organisatorregel in de mobiele hero werd groter.
5. Folio's kregen rustiger letterspatiëring en minder verticale afstand.

De praktische mobiele sectie, herziene credits en desktophero zijn opnieuw geopend. Daarna zijn de finale productiebeelden van volledige desktop- en mobiele pagina, 320px-hero, mobiele terugblik en desktopcredits bekeken. De pagina heeft een herkenbare illustratieve identiteit; de overige hoofdstukken blijven ook zonder fotografie afgewerkt.

### Modulecorrecties na screenshotinspectie

De werkelijk geopende galerie- en sponsortests toonden verbeterpunten die de geautomatiseerde tests niet vonden: een losse laatste foto bij bepaalde aantallen en veel lege ruimte bij vier sponsors in vier categorieën. De galerij kreeg een brede afsluiting op desktop en een op het werkelijke aantal afgestemde mobiele slotrij. Grote foto's sluiten beter aan op twee kleinere foto's met onderschriften. Vier sponsors worden in een compacte combinatie van twee bij twee categorieën gezet; grotere reeksen krijgen een aantalafhankelijk kolomritme. Nieuwe screenshots van 4 foto's op tablet, 10 op mobiel en 4 sponsors op tablet zijn geopend en beoordeeld.

De testversie met 24 logo's gebruikt staande, vierkante en brede grafische fixtures. Productie bevat geen testrecords. De standaardpagina toont uitsluitend de historische 2025-erkenning.

## Design-scorekaart

Een persoonlijke ontwerpbeoordeling, geen onafhankelijke jurybeoordeling.

| Onderdeel | Score / 10 | Bewijs en resterende beperking |
|---|---:|---|
| Originaliteit/eigen signatuur | 8 | Het eigen feestlicht, woordmerk en de affichegrammatica vormen één herkenbaar teken; nog geen brede merkidentiteit buiten deze campagne. |
| Kerstsfeer zonder kitsch | 8 | Kandelaar, gedempt rood, dennengroen en papier geven kerstcontext zonder effectdecoratie. |
| Respectvolle menselijke uitstraling | 7 | De concrete geschiedenis en keukencredits tonen lokale betrokkenheid zonder betutteling; echte gezichten ontbreken. Verbetering: voeg een zorgvuldig gecureerde, goedgekeurde fotoselectie toe zodra die beschikbaar is. Tot dan blijft het bronnenarchief de eerlijke volwaardige oplossing. |
| Hiërarchie evenementfeiten | 9 | Datum, Kursaal, € 5 en infoactie vormen een afzonderlijke leesbare feitenregel; geen impliciete boekingsbelofte. |
| Typografische kwaliteit | 8 | Drie systemen vergeleken; karakter in koppen en rustige tekst, met apart afgestemde mobiele maten. Sommige zeer lange toekomstige namen zullen nog redactionele controle vragen. |
| Artistiek beeld/grafiek | 8 | De originele vectorillustratie draagt de campagne en komt in vereenvoudigde vorm terug; er wordt geen documentaire werkelijkheid gefabriceerd. |
| Geschiedenis zonder echte foto's | 8 | Twee verschillende redactionele archiefbladen met datering, aantallen, context en drie bronlinks vervangen de lege galerijmelding. |
| Historische dank en sponsorinfrastructuur | 8 | Zeven benoemde 2025-bijdragers in inhoudelijke groepen; 4/12/24 actuele testlogo's met vier niveaus gecontroleerd. Echte merkverhoudingen vragen bij aanlevering een laatste visuele controle. |
| Mobiele compositie/toegankelijkheid | 8 | Eigen mobiele affiche, leesbare secties, keyboardbediening en nul axe-overtredingen; geen formele WCAG-certificering. |
| Samenhang en afwerking | 8 | Affiche, archiefspread, kalender en credits delen kleur, letterbeeld en lijnvoering; de statische compositie heeft voldoende eigen ritme zonder animatie. |

## Technische controle

- `npm run build`: geslaagd; Astro/TypeScript 0 errors, 0 warnings, 0 hints; één productiepagina.
- `npm test`: 5 van 5 geslaagd, voor fotorechten en metadata, sponsorverificatie, lokale paden, ticketstatus en veilige URLs.
- `node scripts/browser-qa.mjs`: productiepreview op 4324; acht breedtes (320, 360, 390, 430, 768, 1024, 1440, 1920) plus kortere viewports 390×667 en 1440×700. Op alle tien formaten vallen feiten en actie binnen het eerste scherm, na een gerichte aanpassing van de tussenruimte voor korte schermen. Geen overflow, kapotte beelden, JavaScriptfouten of axe-overtredingen. Het machineleesbare resultaat staat in `final/report.json`.
- `node scripts/modules-qa.mjs`: 12 geteste combinaties, 4/10/20 beelden met 4/12/24 sponsors op 320/390/768/1440 px; geen overflow, ontbrekende beelden, consolefouten of axe-overtredingen. Rapport: `final/modules-report.json`.
- Alle elf zichtbare desktopanchors, vier mobiele menu-items, skiplink, Enter/Escape, menu buitenklik en resize gecontroleerd. Een eerste test klikte op het midden van een decoratieve illustratie onder een overlappende tekstcontainer; de buitenkliktest is gecorrigeerd naar de zichtbare prijsregel en daarna geslaagd.
- De agendadownload bevat geldige CRLF-regels, correcte datums en UTF-8-regelvouwing. De datumherinnering is geen reservering.
- Lightbox: vorige/volgende, pijltjestoetsen, cyclische navigatie, Escape, sluitknop, focusinsluiting en focusherstel geslaagd; geopende dialoog nul axe-overtredingen.
- Alle vijf unieke externe bestemmingen antwoordden HTTP 200; route- en bereikbaarheidslinks openen in een nieuw tabblad. Google Maps kan zijn toestemmingpagina tonen.
- Metadata: nl-BE, correcte canonical, eigen favicon en bijgewerkt deelbeeld, Event JSON-LD met alleen bevestigde gegevens en zonder tijd/Offer/beschikbaarheid. Alleen `dist/index.html` is een gebouwde HTML-route; geen previews of demo's in productie.
- Overdracht zonder compressie: HTML circa 16,6 kB, CSS 27,3 kB, fonts samen 78,3 kB, illustratie circa 1,8 kB. HTML en CSS samen circa 11,2 kB met gzip. Geen clientframework of animatiebibliotheek toegevoegd.

## Opleverbestanden

`final/viewport-{1440|390|320|768}.png`, `final/full-{1440|390|320|768}.png` en `final/{edities|praktisch|partners}-{1440|390|320|768}.png` tonen de echte productiebuild. Dedicated mobiele eerste-drie-schermen: `final/round-3/viewport-390.png`, `screen-2-390.png`, `screen-3-390.png`. De tussentijdse beeldrondes blijven bewaard. Gallery-, sponsor- en lightboxscreenshots staan eveneens in `final/`.

`README.md` bevat invulvoorbeelden voor uren, voorwaarden, ticketlink, foto’s en sponsors. `CONTENT_TODO.md` noemt alle ontbrekende aanleveringen. De concrete ontbrekende informatie bestaat uit uren/zaal, deelnamevoorwaarden, ticketflow, menu/dranken, organisatorcontact, eventuele specifieke toegankelijkheid/vervoer en goedgekeurde foto’s en 2026-logo’s. Het huidige ontwerp is een complete eerlijke aankondigingsvariant; een werkende inschrijving blijft afhankelijk van echte bevestigde gegevens.
