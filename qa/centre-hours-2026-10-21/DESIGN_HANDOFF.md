# Ontwerpoverdracht — openingsuren van de negen centra

Datum: 21 oktober 2026. Scope: geverifieerde centrumuren toevoegen aan de bestaande centrumlijst en het geselecteerde centrum in de kaart. Dit is een inhoudelijke uitbreiding van de bestaande warme Oostendse vormgeving. `PRODUCT.md`, `DESIGN.md`, `.impeccable/design.json`, eerdere QA-overdrachten en andere bronbestanden zijn voor deze documentatietaak behouden.

## Aansluiting op product en ontwerp

De toevoeging helpt de bestaande primaire taak: een ontmoetingscentrum vinden om in te schrijven. De gebruiker hoeft voor gewone openingsuren niet eerst naar een andere website. Adres, telefoon, route en officiële informatie blijven bij elk centrum beschikbaar. De toelichting maakt duidelijk dat centrumuren, loketuren en afspraken voor inschrijving voor het kerstfeest kunnen verschillen; de telefoonactie blijft de route naar bevestiging van die laatste afspraak.

Het urenblok gebruikt de bestaande Cooper Hewitt-familie, 1rem tekst, regelhoogte 1.6, donker tekstkleur, gedempte toelichting, leesbaar linkblauw en een dunne `border`-scheidingslijn. Het introduceert geen nieuwe kleurrol, illustratie, schaduw of afzonderlijke zwevende kaart. Het sluit aan op de open centrumrijen op zacht zand en het warme kaartpaneel. De kop “Openingsuren” is een rustig Medium-label; tabulaire cijfers maken de tijden vergelijkbaar.

Een definitielijst koppelt dagen en tijden. De gewone weergave zet tijden rechts; onder 15rem beschikbare componentbreedte worden dagen en tijden onder elkaar gezet en links uitgelijnd. Die containergrens ondersteunt zowel smalle kaartkolommen als tekstvergroting. De aanvullende algemene loketuren zitten in native `details`/`summary`: een onderstreepte blauwe tekstactie met een klikvlak van minimaal 44px. De native driehoek is een lokale, lichte bediening voor dit ondergeschikte detail; het bestaande grote centrum- en kaartdisclosure behoudt zijn ronde indicator. Er wordt geen nieuw algemeen disclosurepatroon of ontwerpwereld vastgelegd.

Op mobiel blijft de bestaande volgorde kaart → geselecteerd centrum → uren → route/contact behouden. Vanaf 768px blijven kaart en detailkolom naast elkaar staan. Meer tekst maakt het kaartpaneel hoger; de kaart volgt die inhoudshoogte. De negen centrumrijen blijven zonder JavaScript gerenderd, inclusief hun uren, loketdisclosures en bronlinks.

## Bronherkomst en betekenis

`src/data/centre-hours.ts` bevat een handmatig vastgelegde momentopname met controledatum 21 oktober 2026. De bron per centrum is de officiële contact- en openingsurenpagina van Stad Oostende. `official-source-evidence.json` bewaart voor ieder van de negen centra de bron-URL, controledatum, paginatitel, weekdatum, alle zeven dagwaarden, dienstspecifieke toelichting en gepubliceerde sluitingsdagen. De vastgelegde week loopt van 19 tot en met 25 oktober 2026. Alle negen bronnen tonen daarin hetzelfde centrumrooster:

| Dagen | Centrumuren |
| --- | --- |
| Maandag, woensdag, donderdag en vrijdag | 9.30–17.00 uur |
| Dinsdag | 11.00–17.00 uur |
| Zaterdag en zondag | Gesloten |

De code deelt dit rooster omdat de negen individueel vastgelegde bronnen overeenstemmen. Het is geen aanname dat alle centra altijd hetzelfde rooster hebben. Bij toekomstig verschil moet de gegevensstructuur ruimte krijgen voor de afwijkende centrumuren.

Algemene loketuren zijn bevestigd voor De Boeie, Oud Hospitaal, Schaperye, De Blomme, De Schelpe en ’t Kasteeltje: maandag, woensdag, donderdag en vrijdag 10.00–12.00 en 14.00–16.00 uur; dinsdag 11.00–12.00 en 14.00–16.00 uur. De bronnotities voor ’t Viooltje en Ter Yde noemen alleen maaltijdloketten; De Ballon noemt maaltijd- en UiTpasloketten. Deze diensturen worden niet opgewaardeerd tot algemene loketuren. Daar toont de site “Voor loketuren: bel het centrum.” De zes bevestigde algemene loketroosters vormen evenmin bewijs voor de inschrijfuren van dit kerstfeest.

De gedeelde waarschuwing noemt de gepubliceerde resterende sluitingsdagen van 2026: 1, 2 en 11 november, 25 en 26 december. De bron bevat ook sluitingen in januari 2027; die worden in deze 2026-context niet als sluitingsdagen van 2026 getoond. De bronlink per centrum heet “Bron en uitzonderingen”. Onder de centrumlijst staan de bronorganisatie, expliciete controledatum en de waarschuwing dat feestdagen en uitzonderlijke sluitingen kunnen afwijken. Het kaartdetail herhaalt de waarschuwing over afwijkingen en telefonisch navragen van inschrijfuren.

## Gedeelde uitvoering

`CentreHours.astro` rendert dezelfde gegevens voor de gewone centrumrijen en het eerste kaartdetail. `meeting-centres.ts` voegt de uren via `getCentreHours` samen met de bestaande centrumgegevens. Bij een andere kaartselectie kloont `centre-map.ts` het al gerenderde urenblok van dat centrum naar het kaartdetail, inclusief de juiste bron en het onderscheid tussen bevestigde loketuren en een beladvies. Een nieuw geselecteerd centrum begint met een gesloten loketdisclosure. Zo gebruiken lijst en kaart dezelfde gerenderde inhoud.

## Bekeken bewijs

Voor deze overdracht zijn de actuele `PRODUCT.md` en `DESIGN.md`, `centre-hours.ts`, `CentreHours.astro`, `centre-hours.css`, `MeetingCentres.astro`, `CentreMap.astro`, `centre-map.ts` en de gegevenskoppeling in `meeting-centres.ts` gelezen. Alle negen opgeslagen officiële bronresultaten en `report.json` zijn bekeken. Er is voor deze documentatietaak geen nieuwe live bronopvraging uitgevoerd.

De volgende captures in deze map zijn visueel bekeken:

| Bestand | Bewijs |
| --- | --- |
| `centre-320.png`, `centre-390.png` | Smalle centrumrij met uren, native loketactie, bron en bestaande contact-/routelinks. |
| `centre-768.png`, `centre-1440.png` | Dezelfde rustige rijopbouw op tablet- en desktopbreedte; tijden blijven overzichtelijk uitgelijnd. |
| `map-320.png`, `map-390.png` | Gestapelde kaart en gegevens met uren vóór de routeknop, bronlink en inschrijfcaveat. |
| `map-768.png`, `map-1440.png` | Kaart en langere gegevenskolom naast elkaar, met behoud van hiërarchie en negen genummerde locaties. |
| `map-desk-expanded.png` | Geopend loketdetail met twee tijdsblokken per daggroep en bronlink. |

`report.json` rapporteert voor alle negen centra dat de zeven dagwaarden overeenkomen met hun bron; de booleans voor algemene loketuren komen overeen met de zes/drie-verdeling hierboven. Op 320, 390, 768 en 1440px rapporteert het geen horizontale overflow, nul axe-bevindingen en geen paginafouten. 200% tekstvergroting en werking zonder JavaScript zijn als geslaagd vastgelegd. De hoofdtaak rapporteert aanvullend negen geslaagde kaartselecties, een build met nul diagnostische meldingen, elf bestaande tests, het bestaande centrumverloop op vijf breedtes en een lege detectoruitslag. Die controles zijn voor dit document niet opnieuw uitgevoerd. De nieuwe afrondende visuele review liep nog bij het opstellen van deze overdracht; hieruit wordt geen review-uitkomst afgeleid.

## Onderhoud en beperkingen

De uren zijn een statische momentopname, geen live koppeling met Stad Oostende en geen automatische synchronisatie. Controleer voor een latere publicatie of editie alle negen officiële pagina’s opnieuw, inclusief verschillen per centrum, loketnotities, uitzonderingen en sluitingsdagen. Werk de gegevens, zichtbare controledatum en opgeslagen bronevidence samen bij. De bestaande contactcontroledatum is een ander gegeven dan de nieuwe urencontroledatum. Het huidige gedeelde rooster mag een toekomstige afwijking niet verbergen.

Het normale weekrooster bevestigt geen bijzondere opening op kerstavond of inschrijfvenster voor het feest. Laat de telefoonactie en uitleg hierover staan zolang de organisatie dat niet afzonderlijk heeft bevestigd. Behoud de link naar de officiële uitzonderingen, ook wanneer de gewone uren op de site zelf staan.

De captures en automatische controles ondersteunen deze lokale uitbreiding; ze bewijzen geen volledige toegankelijkheidscertificering of controle op alle echte apparaten en ondersteunende technologie. Er is op basis van het bekeken bewijs geen materiële documentatieblokkade gevonden. De voornaamste onderhoudsgrens is de expliciet gedateerde, handmatig bijgehouden bronmomentopname.
