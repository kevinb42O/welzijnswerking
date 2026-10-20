# Plan — de weg naar de negen ontmoetingscentra

Datum: 20 oktober 2026. Status: lokaal geïmplementeerd en gecontroleerd. Niet gepubliceerd. Het plan hieronder bewaart de oorspronkelijke aanpak; het uitvoeringsbewijs staat in `qa/ONTMOETINGSCENTRA_REVIEW.md`.

Latere bijsturing van de opdrachtgever: het volledige centrumoverzicht staat standaard ingeklapt om plaats te besparen. De zoekknop opent het automatisch. Alle belknoppen krijgen een telefoonicoon. Dit vervangt hieronder het oorspronkelijke voorstel om de volledige lijst meteen te tonen.

## Doel en huidige situatie

Bezoekers moeten vanuit de inschrijfuitleg meteen een ontmoetingscentrum kunnen vinden, bellen en bereiken.

De hero verwijst nu naar `#praktisch`. De inschrijfkaart in `src/components/PracticalInfo.astro` toont alleen `registrationMethod` en `ticketsInfoText`. Er staan geen centrumlinks of contactgegevens bij. `CONTENT_TODO.md` vermeldt concrete locaties en contactgegevens nog als ontbrekend, terwijl deze publiek beschikbaar zijn bij Stad Oostende.

Fabrice heeft volgens de projectgegevens inschrijving via de negen OC’s bevestigd. De startdatum, deadline en betaalwijze zijn nog onbekend. Publieke centrumgegevens kunnen al worden toegevoegd; de inschrijfperiode vraagt afzonderlijke bevestiging door de organisatie.

## Gewenste bezoekersroute

1. De knop **Hoe schrijf ik me in?** bovenaan brengt de bezoeker rechtstreeks naar de inschrijfkaart, via `#inschrijven`.
2. De kaart legt in gewone taal uit dat inschrijven via een van de negen Oostendse ontmoetingscentra verloopt.
3. Een duidelijke knop **Vind een ontmoetingscentrum** verwijst naar `#ontmoetingscentra` op dezelfde pagina.
4. Daar staan alle negen centra met wijk, adres, telefoonnummer, route en officiële informatie.
5. Wie eerst uitleg nodig heeft, kan het gekozen centrum bellen. De belactie heet **Bel [centrumnaam]** en belooft geen telefonische inschrijving.

## Voorgestelde tekst

Titel inschrijfkaart:

> Inschrijven via een ontmoetingscentrum

Toelichting:

> Je schrijft je in via een van de negen ontmoetingscentra in Oostende. Hieronder vind je hun adressen en telefoonnummers. De startdatum, uiterste inschrijfdatum en betaalwijze worden hier nog bekendgemaakt.

Primaire actie: **Vind een ontmoetingscentrum** → `#ontmoetingscentra`.

Titel centrumoverzicht:

> Welk ontmoetingscentrum ligt bij jou in de buurt?

Toelichting bij het overzicht:

> Kies hieronder een centrum. Je vindt er het adres, het telefoonnummer en een link naar de officiële openingsuren. Vragen over inschrijven voor het kerstfeest? Bel het centrum voor meer uitleg.

Onder de lijst: **Bekijk alle ontmoetingscentra bij Stad Oostende** → [officieel overzicht](https://www.oostende.be/ontmoeten).

## Vormgeving en gebruiksgemak

- Plaats het overzicht aansluitend onder de bestaande praktische informatie, vóór het archief. Geef het de volle containerbreedte; negen centra passen niet prettig in de smalle inschrijfkaart.
- Gebruik rustige, compacte centrumblokken met dezelfde kleuren en typografie als de huidige site. Twee kolommen op een breed scherm, één op mobiel.
- Sorteer op wijk, daarna op centrumnaam. Toon de wijk nadrukkelijk zodat ook iemand die geen OC-naam kent zijn weg vindt.
- Toon alle negen centra meteen. Een zoekveld, wijkfilter of uitklaplijst is voor deze kleine lijst niet nodig.
- Per centrum: naam, wijk, volledig adres met `8400 Oostende`, zichtbaar telefoonnummer en de acties **Bel [naam]**, **Route naar [naam]**, **Openingsuren en info**.
- Gebruik gewone links: `tel:`, een Google Maps-route op basis van centrumnaam en volledig adres, en de officiële centrumpagina. Het overzicht werkt zonder JavaScript.
- Zorg voor leesbare tekst, duidelijke toetsenbordfocus en aanraakvlakken van minimaal 44 px. Controleer de ankers met de sticky header.
- Openingstijden blijven bij Stad Oostende. Neem geen dynamische aanduiding zoals “vandaag open” over. Algemene openingsuren, lokettijden en inschrijfmomenten voor het kerstfeest kunnen verschillen.
- Een ingebedde kaart of automatische locatiebepaling is niet nodig voor deze eerste uitvoering; adres en routeknop geven al een concrete volgende stap.

## Gecontroleerde centrumgegevens

Bronnen geraadpleegd op 20 oktober 2026: het [officiële centrumoverzicht](https://www.oostende.be/ontmoeten) voor de negen centra en wijken, en onderstaande individuele contactpagina’s voor adres en telefoonnummer. Dit zijn algemene centrumgegevens; de pagina’s bevestigen geen inschrijfperiode voor dit kerstfeest.

Alle adressen liggen in **8400 Oostende**.

| Wijk | Centrum en officiële informatie | Adres | Telefoon |
| --- | --- | --- | --- |
| Centrum | [De Boeie](https://www.oostende.be/ontmoetingscentrum-de-boeie-ldc) | Kerkstraat 35 | 059 25 91 07 |
| Centrum | [Oud Hospitaal](https://www.oostende.be/ontmoetingscentrum-oud-hospitaal) | Amsterdamstraat 61 | 059 25 90 93 |
| Konterdam | [Schaperye](https://www.oostende.be/ontmoetingscentrum-schaperye-ldc) | Steenovenstraat 86 | 059 25 91 00 |
| Mariakerke | [’t Viooltje](https://www.oostende.be/ontmoetingscentrum-viooltje) | Violierenlaan 3b | 059 25 90 83 |
| Raversijde | [Ter Yde](https://www.oostende.be/ontmoetingscentrum-ter-yde) | Duinenstraat 172 | 059 25 90 80 |
| Stene | [De Blomme](https://www.oostende.be/ontmoetingscentrum-de-blomme) | Chrysantenstraat 30 | 059 25 91 13 |
| Vuurtorenwijk | [De Ballon](https://www.oostende.be/ontmoetingscentrum-de-ballon) | Mansveldstraat 9 | 059 25 91 20 |
| Westerkwartier | [De Schelpe](https://www.oostende.be/ontmoetingscentrum-de-schelpe-ldc) | Elisabethlaan 32 | 059 25 90 70 |
| Zandvoorde | [’t Kasteeltje](https://www.oostende.be/ontmoetingscentrum-t-kasteeltje) | Kasteelstraat 22b | 059 25 91 27 |

Let bij uitvoering op bronverschillen: sommige algemene stedelijke themapagina’s vermelden andere adressen of oudere telefoonnummers. Gebruik de individuele centrumcontactpagina’s hierboven als basis, met bijzondere aandacht voor Oud Hospitaal (Amsterdamstraat 61) en De Ballon (Mansveldstraat 9).

## Uitvoering in de huidige code

1. Voeg `src/data/meeting-centres.ts` toe met `id`, `name`, `district`, `streetAddress`, `postalCode`, `city`, `phone`, `officialUrl` en `verifiedOn` per centrum, plus de officiële overzichtslink. Leid de bel- en routelinks af van die gegevens.
2. Voeg `src/components/MeetingCentres.astro` toe voor het overzicht met `id="ontmoetingscentra"` en een eigen gekoppelde sectietitel.
3. Voeg het component in `src/pages/index.astro` direct na `PracticalInfo` in. Gebruik dezelfde component in relevante dev-previews om de weergave te kunnen controleren.
4. Geef de inschrijfkaart in `PracticalInfo.astro` het anker `inschrijven` en de actie naar het centrumoverzicht. Pas de kop en toelichting aan via `data/inhoud_2026.json`.
5. Richt de heroactie in `EventHero.astro` bij deze inschrijfmethode op `#inschrijven`. De bestaande rechtstreekse ticketactie blijft bruikbaar als later echte online verkoop wordt toegevoegd.
6. Voeg de benodigde overzichtsstijlen toe aan `src/styles/campaign.css`.
7. Werk bij uitvoering `CONTENT_TODO.md` en de relevante README-uitleg bij: centrumgegevens zijn ingevuld, inschrijfperiode en betaling blijven openstaande informatie.

De verwijzing naar de centra mag niet afhankelijk zijn van `ticket.url`: die is momenteel leeg omdat er geen online ticketverkoop is. Gebruik de centrumwebsite ook niet als `ticketUrl`; de bestaande code zou deze dan als “Reserveer je plaats” presenteren. Laat de huidige onbevestigde verkoopstatus staan tot de inschrijfperiode bevestigd is. Bij `sold_out` of `closed` blijft die status voorrang krijgen en mag de tekst niet aansporen om nog in te schrijven.

## Nog te bevestigen door de organisatie

- Vanaf welke datum en tot wanneer kan men inschrijven?
- Hoe betaalt men de € 5 en wanneer?
- Moet men persoonlijk langskomen of kan het ook telefonisch of via iemand anders?
- Gelden er specifieke inschrijfmomenten en moet men iets meebrengen?

Deze antwoorden zijn nodig voor de definitieve inschrijfinstructies, maar blokkeren het toevoegen van de centrumzoekhulp niet. Tot die tijd verwijst de belknop uitsluitend naar contact voor uitleg.

## Controle bij uitvoering

- Loop de route hero → inschrijfuitleg → centrum → bel-/route-/informatielink door op desktop en mobiel.
- Controleer alle negen adressen en telefoonnummers tegen de bronpagina’s en controleer alle externe links opnieuw vóór publicatie.
- Controleer mobiel op 360 px breed, toetsenbordbediening, leesvolgorde, focus en ankerposities. Controleer dat de volledige lijst ook zonder JavaScript zichtbaar is.
- Controleer de bestaande previews voor onbevestigde, beschikbare, uitverkochte en afgesloten inschrijving. Een OC-link mag nergens een beschikbare online reservatie suggereren.
- Draai `npm test` en `npm run build` na implementatie; voor dit plan zijn geen codechecks nodig.

Gereed wanneer een bezoeker vanuit de inschrijfuitleg zonder zelf te moeten zoeken een centrum kan kiezen, het adres kan lezen, kan bellen en de route of officiële openingsuren kan openen, terwijl de nog onbekende evenementafspraken duidelijk blijven.
