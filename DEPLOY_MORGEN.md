# Klaarzetten voor livegang — 21 oktober 2026

De hero met kaarslicht, verfijnde navigatie op mobiel en desktop, nieuwe footer met vzw-gegevens en Webaanzee-vermelding, zeven eventfoto's, de organisatiefoto met Fabrice Goffin en het deelbeeld zijn klaar. Er is niets gedeployd. De huidige versie toont eerlijk dat inschrijfinformatie nog volgt.

## 1. De informatie van morgen invullen

Alle actuele evenementgegevens staan in `data/inhoud_2026.json`. De website verwerkt ingevulde velden automatisch; onbekende waarden blijven `null` of `[]`.

| Gegeven | JSON-veld |
| --- | --- |
| Aanvang, deuren, einde | `event.eventStartTime`, `event.doorsOpenTime`, `event.endTime` |
| Zaal | `event.room` |
| Wie kan deelnemen / voorwaarden | `event.eligibilityRules` |
| Menu | `event.menuItems` — lijst van teksten |
| Aantal gangen, inbegrepen dranken | `event.courseCount`, `event.drinksIncluded` |
| Muziek / programma | `event.entertainmentDetails` |
| Toegankelijkheid, vervoer | `event.accessibilitySpecifics`, `event.transportSpecifics` |
| Ticketlink | `event.ticketUrl` — volledige officiële HTTPS-link |
| Verkoopstatus | `event.ticketSalesStatus` |
| Contact | `brand.organizationContactEmail`, `brand.organizationContactPhone` |

Zodra de verkoop open is: vul de echte ticketlink in en zet `ticketSalesStatus` op `available`. De hero en praktische informatie tonen dan **Reserveer je plaats**. `not_confirmed`, `sold_out` en `closed` blijven ondersteund. Zet niet automatisch de doelgroep of het menu van 2025 over naar 2026.

Bevestigde sponsorlogo's en records kunnen worden toegevoegd via de bestaande instructies in `README.md`. De zichtbare bedanking voor 2025 blijft historisch.

## 2. Eén nieuw deploypakket maken

Na de inhoudswijzigingen:

```sh
npm run release
npm run preview -- --port 4325
```

`release` voert de vijf inhoudstests uit, maakt het fotografische deelbeeld opnieuw, controleert TypeScript/Astro en bouwt de website. Daarna maakt het `release/welzijnswerking-2026.zip`. Het ZIP-bestand bevat `index.html` direct op het hoogste niveau. `release/BUILD_INFO.json` bevat de bestandslijst, hashes en nog lege kernvelden.

De versie van het pakket van vandaag bevat de informatie zoals die nu bekend is. **Na de aanvullingen van morgen opnieuw `npm run release` uitvoeren**, zodat website en deelbeeld dezelfde actuele informatie bevatten.

## 3. Kort controleren en uploaden

Bekijk `http://127.0.0.1:4325/` op telefoon en desktop. Controleer titel, datum, prijs, doelgroep, menu en de echte reserveerlink. Controleer de namen bij de organisatiefoto. De datumherinnering is geen reservering.

Voor bestandenhosting: upload de inhoud van `dist/` naar de publieke webroot, of pak het ZIP daar uit. Voor een statische hostingdienst is de publicatiemap `dist`. Bij Git-deployment: deelbeeld vooraf lokaal vernieuwen met `npm run release` en meeleveren; het hosting-buildcommando kan daarna `npm run build` zijn. Publiceer niet de projectmap met `assets/`, `qa/` of onderzoeksbestanden.

Na publicatie: open `https://welzijnswerking.be`, controleer HTTPS, mobiele navigatie, foto's, ticketlink en de preview van een gedeelde link. Laat `www` naar hetzelfde hoofddomein verwijzen. Hosting en DNS zijn in deze opdracht niet gewijzigd.

## Bewijs van de huidige controle

- `qa/hero-refined-desktop.png`, `qa/hero-refined-mobile.png`, `qa/footer-refined-desktop.png` en `qa/menu-refined-mobile.png`: actuele ontwerpcontrole.
- `qa/redesign-fix/browser-report.json`: responsive en interactiecontrole.
- `qa/beeldonderzoek-2026-10-20/browser-report.json`: eventfoto's en beeldselectie.
- `assets/fotos-vorige-edities/facebook-2025/manifest.json`: herkomst van de volledige reeks van 38 foto's.
