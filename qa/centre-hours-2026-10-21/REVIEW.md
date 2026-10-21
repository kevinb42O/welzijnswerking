# Openingsuren van de negen OC’s — 21 oktober 2026

De negen officiële contactpagina’s zijn rechtstreeks opgehaald en op de week van 19–25 oktober 2026 gecontroleerd. `official-source-evidence.json` bevat per centrum de URL, weekdatum, zeven dagen, toelichting op dienstverlening en gepubliceerde sluitingsdagen.

## Gevonden gegevens

Alle negen centra: maandag, woensdag, donderdag en vrijdag 9.30–17.00 uur; dinsdag 11.00–17.00 uur; zaterdag en zondag gesloten.

Zes centra publiceren algemene loketuren: De Boeie, Oud Hospitaal, Schaperye, De Blomme, De Schelpe en ’t Kasteeltje. Die zijn op maandag, woensdag, donderdag en vrijdag 10.00–12.00 en 14.00–16.00 uur; op dinsdag 11.00–12.00 en 14.00–16.00 uur.

Bij ’t Viooltje, Ter Yde en De Ballon noemt de bron alleen loketuren voor specifieke diensten (maaltijden en/of UiTpas). Die zijn niet overgenomen als algemene loketuren of als uren voor de inschrijving voor het kerstfeest. Deze centra tonen een vraag om te bellen.

Alle negen bronnen publiceren dezelfde resterende sluitingsdagen voor 2026: 1, 2 en 11 november en 25 en 26 december. Die staan bij het overzicht. De bronnen publiceren ook 1 en 2 januari 2027; deze zijn buiten de expliciet als 2026 aangeduide lijst gehouden.

## Implementatie

De gegevens staan centraal in `src/data/centre-hours.ts`. `CentreHours.astro` toont de gewone openingsuren, een native disclosure met de bevestigde loketuren of een beladvies, en een directe bronlink. Dit component staat in elke centrumrij en in het kaartdetail. Bij centrumkeuze neemt de kaart de passende server-rendered gegevens over, inclusief bron en bekend/onbekend loketschema.

De pagina vermeldt de controledatum en geeft aan dat gewone openingsuren niet automatisch de inschrijfuren voor het kerstfeest zijn. De gegevens zijn een gecontroleerde momentopname; er is geen automatische synchronisatie met Stad Oostende.

## Validatie

- `npm run build`: geen fouten, waarschuwingen of hints.
- `npm test`: 11/11 geslaagd.
- `scripts/centre-hours-qa.mjs`: alle zeven dagen van alle negen centra tegen de opgeslagen officiële bron getoetst; alle negen kaartselecties en bronkoppelingen; loketuren bij zes en geen verzonnen algemene loketuren bij drie.
- Schermbreedtes 320, 390, 768 en 1440px: geen horizontale overflow en geen axe-bevindingen in de gecontroleerde centrumsectie.
- 200% tekstvergroting en werking zonder JavaScript geslaagd.
- Bestaande centrumtest met vijf breedtes, inschrijfstaten en toetsenbordflow geslaagd.
- Productiepreview: geselecteerde uren voor centra met en zonder loketschema, openklappen van loketuren en no-JavaScript-inhoud gecontroleerd.
- Ontwerpdetector: geen bevindingen voor de gewijzigde UI.
- Onafhankelijke review van bron, gegevens en negen screenshots: **ship**, geen materiële bevindingen.

Dit is een controle van de toevoeging, geen volledige toegankelijkheidscertificering of test op fysieke toestellen. Er is geen publicatie naar productie uitgevoerd.
