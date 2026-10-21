# Eindcontrole OC-kaart — 21 oktober 2026

## Resultaat

Onafhankelijke visuele en bronreview: **ship**, geen materiële bevindingen. De review controleerde de vier kaartuitsneden (320, 390, 768 en 1440px), mobiele en desktopviewport en de fouttoestand tegen de bestaande Oostendse vormgeving en de oorspronkelijke opdracht.

## Implementatie

Optionele kaart binnen het bestaande centrumoverzicht. Leaflet wordt dynamisch geladen wanneer de bezoeker de kaart opent. Achtergrond: de officiële grijze GRB-basiskaart van Digitaal Vlaanderen. Google Maps blijft de routeplanner. Een Google-kaart met eigen markeringen vraagt configuratie die niet in dit project aanwezig is.

De negen locaties zijn gecontroleerd met de Vlaamse Geolocation API; de bronantwoorden staan in `geocoding.json`. Nummering verbindt de lijst met de kaart. Op kleine schermen krijgen nabije markeringen een verbindingslijn naar hun exacte adrespositie. Native centrumkeuze, geselecteerd adres, telefoon en officiële informatie blijven beschikbaar wanneer de achtergrondkaart faalt. Zonder JavaScript blijft de bestaande centrumlijst bruikbaar.

## Validatie

- `npm run build`: 0 fouten, 0 waarschuwingen, 0 hints.
- `npm test`: 11 geslaagde tests.
- `node scripts/centre-map-qa.mjs`: 4 schermbreedtes, geen axe-bevindingen in de gecontroleerde centrumsectie, geen horizontale overflow; centrumselectie, contact- en routekoppelingen, Enter en spatie, zoom, overzicht herstellen, heropenen, uitgesteld laden en netwerkfout gecontroleerd.
- Aanraaktest: tweevingerverplaatsing via CDP-simulatie. Ook 200% tekstvergroting en werking zonder JavaScript gecontroleerd.
- Bestaande `scripts/meeting-centres-qa.mjs`: 5 breedtes, inschrijfstaten, toetsenbordroute, tekstvergroting en werking zonder JavaScript geslaagd.
- Productiebuild gecontroleerd via de previewserver: kaartopmaak, laden van tegels, selectie en no-JavaScript-alternatief werken.
- Ontwerpdetector eenmaal uitgevoerd. Alleen adviezen over contextuele tekstmaten en kaartvormgeving; geen blokkerende bevindingen. Onnodige afwijkingen van achtergrond- en afrondingstokens vervangen door bestaande tokens.

Dit bewijst geen volledige WCAG-certificering en vervangt geen controle op fysieke telefoons. De automatische aanraaktest is een browsersimulatie. De kaartachtergrond vereist toegang tot de externe Vlaamse kaartdienst.

## Bronnen

- Vlaamse geocodering: https://geo.api.vlaanderen.be/geolocation/Help/V4
- GRB-webdiensten: https://www.vlaanderen.be/digitaal-vlaanderen/onze-diensten-en-platformen/basiskaart-vlaanderen-grb/grb-webdiensten
- GRB-basiskaart grijs: https://www.vlaanderen.be/datavindplaats/catalogus/wms-grb-basiskaart-grijs

Productie is niet gepubliceerd; dit betreft de lokale implementatie en gecontroleerde productiebuild.
