# Ontwerpoverdracht — optionele centrumkaart

Datum: 21 oktober 2026. Scope: een lokale uitbreiding van de bestaande inschrijfroute voor de negen ontmoetingscentra. De kaart zet de bevestigde warme Oostendse vormgeving voort. Er is geen nieuwe ontwerpwereld of wijziging van de productrichting nodig. `PRODUCT.md`, `DESIGN.md` en `.impeccable/design.json` zijn bij deze overdracht behouden.

## Aansluiting op het bestaande systeem

De doelgroep en taak uit `PRODUCT.md` blijven leidend: alleenstaanden vanaf 50 jaar en mensen die voor hen informatie zoeken, moeten een centrum kunnen vinden om in te schrijven. De kaart staat daarom als optioneel native disclosure binnen het bestaande overzicht; alle negen adres-, telefoon-, route- en informatierijen blijven eronder beschikbaar. De website introduceert geen reserveringsformulier of onbevestigde inschrijfvoorwaarden.

De uitvoering gebruikt bestaande kleurrollen: warm papier voor het kaartpaneel, zacht zand voor de omgeving, donkerblauw voor herkenning en acties, linkblauw voor tekstlinks en selectie, donkere tekst en gedempte toelichting. De grijze basiskaart houdt deze accenten herkenbaar. Cooper Hewitt blijft de enige familie voor tekst en bediening; gewone koppen blijven rechtop en in gewone schrijfwijze. De routeactie hergebruikt de globale primaire knop, telefoon en openingsuren de bestaande onderstreepte tekstlinks. De ronde disclosure-indicator en dunne scheidingslijn sluiten aan op de centrumlijst.

De panelafronding is de bestaande 16px; bediening gebruikt 10px. Het kaartvenster heeft een plaatselijke 12px afronding, passend bij het bestaande zachte beeldkader. De inhoud blijft vlak, zonder schaduw rond het gehele kaartpaneel. Vanaf 768px staan kaart en centrumgegevens naast elkaar; onder 768px volgen kaart, native keuzelijst en contactgegevens elkaar. De 768px-weergave gebruikt een smallere gegevenskolom van 260px; de brede variant 300px. Op 320px vervalt het decoratieve pinicoon naast de disclosuretitel om tekst en bediening ruimte te geven.

## Gerichte kaartuitzonderingen

- **Pinvorm en nummering:** gedraaide druppelvormen, een lichte contour en een kleine schaduw maken negen locaties op uiteenlopende kaartdetails herkenbaar. De nummers corresponderen met de gewone centrumlijst; het geselecteerde centrum krijgt tevens een grotere pin en een andere blauwe rol. Overlappende pins worden verschoven met een dunne verbindingslijn en locatiepunt. Dit is functionele kaartgeometrie, geen nieuwe algemene vormtaal voor knoppen of kaarten.
- **Kaartbediening:** zoomknoppen en tooltips hebben een lokale schaduw (`0 2px 8px rgb(30 29 27 / .16)`); pins gebruiken `0 3px 6px rgb(30 29 27 / .25)`. Deze beperkte afscheiding houdt zwevende bediening op cartografie leesbaar. De bestaande regel die gewone inhoud vlak houdt, blijft gelden buiten het kaartvenster.
- **Bronvermelding:** de Digitaal Vlaanderen/GRB-attributie gebruikt lokaal 12px tekst op warm papier. Dit is compacte kaartmetadata; het is geen nieuwe standaard voor lopende tekst of belangrijke uitleg. Essentiële adres-, contact- en routegegevens staan buiten de kaart in grotere tekst.
- **Native keuzelijst:** de kaart voegt een taakgebonden selectveld toe met bestaande font-, kleur-, rand- en radiustokens, minimaal 50px hoog. De eerdere systeemdocumentatie vermeldt dat de toenmalige pagina geen eigen velden had. Deze uitbreiding legt hier alleen het plaatselijke gebruik vast; zij definieert geen algemeen formulierensysteem.

## Gedrag en gegevens

`CentreMap.astro`, `centre-map.css` en `centre-map.ts` verzorgen de kaart. Leaflet wordt dynamisch geïmporteerd wanneer de gebruiker het kaartdisclosure opent. De officiële grijze GRB-WMTS-laag komt van Digitaal Vlaanderen (`grb_bsk_grijs`, `GoogleMapsVL`). De negen coördinaten in `meeting-centres.ts` corresponderen met de officiële adresresultaten die in `geocoding.json` zijn vastgelegd. Dit zijn adresposities, geen afzonderlijk gecontroleerde toegangen of toegankelijkheidsroutes. De bestaande `verifiedOn`-datum in de centrumgegevens betreft de contactgegevens; dit kaartbewijs is op 21 oktober vastgelegd.

De native selector biedt dezelfde selectie als de pins; het detailpaneel toont naam, wijk, adres, telefoon, officiële informatie en een Google Maps-route. Selectie wordt ook via een live-regio aangekondigd. Markerbediening ondersteunt toetsenbordfocus; de zoomknoppen bieden 44px aanraakvlakken. Scrollwielzoom staat uit. Op smalle schermen staat gewoon slepen uit zodat de pagina kan blijven scrollen; de uitleg beschrijft kaartverplaatsing met twee vingers. Reduced motion schakelt de aangevraagde kaartanimatie uit. De resetactie brengt alle centra weer in beeld.

Bij een ontbrekende basiskaart blijft een tekstuele melding zichtbaar en blijven de selector en routes bruikbaar. Een fout bij het laden van de kaartbibliotheek heeft een eigen melding en heropenen kan opnieuw laden. Zonder JavaScript verwijst het kaartdisclosure naar de volledige gewone lijst; die behoudt alle adressen en links.

## Gecontroleerd bewijs

Voor deze overdracht zijn `PRODUCT.md`, `DESIGN.md`, de documentatiereferentie van Impeccable, de vijf genoemde kaart-/centrumbronnen, relevante globale stijlen en tokens, `geocoding.json` en `report.json` gelezen. De volgende captures zijn visueel bekeken:

| Capture | Waargenomen opbouw |
| --- | --- |
| `map-320.png` | Smalle gestapelde variant; negen zichtbare genummerde pins, verbindingslijnen, volle routeknop en afbrekende uitleg. |
| `map-390.png` | Gestapelde kaart en gegevens; selector en contactlinks blijven herkenbaar en ruim. |
| `map-768.png` | Twee kolommen, resetactie boven het kaartvenster, gegevenspaneel naast de kaart. |
| `map-1440.png` | Ruim kaartvenster met negen locaties, rustige gegevenskolom en gedeelde bovenbalk. |

`report.json` rapporteert op 320, 390, 768 en 1440px telkens negen markers, uitgesteld laden, toetsenbordselectie, selectie, reset en heropenen als geslaagd, geen horizontale overflow en nul axe-bevindingen. Het verslag rapporteert ook geslaagde kaartfoutafhandeling, gesimuleerde touchverplaatsing, 200% tekstvergroting en werking zonder JavaScript; de foutenlijst is leeg. De hoofdtaak rapporteert daarnaast een geslaagde build, elf bestaande tests en het bestaande centrumverloop op vijf breedtes. Deze controles zijn voor deze documentatie niet opnieuw uitgevoerd.

## Reikwijdte en beperkingen

De bekeken captures ondersteunen de visuele aansluiting op de bestaande warme, leesbare stijl. De gerapporteerde automatische checks en touchsimulatie zijn geen volledige toegankelijkheidscertificering of controle op fysieke telefoons en alle ondersteunende technologie. Beschikbaarheid en cartografische inhoud blijven afhankelijk van de externe tegeldienst; routeberekening gebeurt extern bij Google Maps. Openingstijden en lokettijden blijven bij Stad Oostende te controleren en de kaart bevestigt geen evenementgebonden inschrijfafspraken.

Er is geen materiële documentatieblokkade voor deze lokale uitbreiding aangetroffen. De afwijkingen in pinvorm, lokale schaduw, compacte bronvermelding en het nieuwe selectveld zijn hierboven expliciet afgebakend. Deze overdracht verandert geen algemene tokens, bestaande documentatie of andere paginaonderdelen en omvat geen audit van ongerelateerde QA-mappen.
