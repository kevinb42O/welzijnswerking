# Redesignfix — uitvoering en review

18 oktober 2026. Lokale implementatie volgens `plans/REDESIGN_FIXPLAN.md`. Geen publicatie, hosting- of DNS-wijzigingen. De bron- en buildvingerafdrukken staan in `manifest.json`.

## Voor en na

| Weergave | Voor | Uitgevoerd |
|---|---|---|
| Desktophero, 1440×900 | [Voor](before/hero-1440.png) | [Na](final/viewport-1440-900.png) |
| Mobiele hero, 390×844 | [Voor](before/hero-390.png) | [Na](final/viewport-390-844.png) |
| Volledige desktop | [Voor](before/full-1440.png) | [Na](full-review/full-1440.png) |
| Volledige mobiel | [Voor](before/full-390.png) | [Na](full-review/full-390.png) |
| Praktisch, desktop/mobiel | [Desktop voor](before/praktisch-1440.png), [mobiel voor](before/praktisch-390.png) | [Desktop na](full-review/praktisch-1440.png), [mobiel na](full-review/praktisch-390.png) |
| Geschiedenis | [Voor](before/edities-1440.png) | [Desktop](full-review/edities-1440.png), [mobiel](full-review/edities-390.png) |
| Historische erkenning | [Voor](before/partners-1440.png) | [Desktop](full-review/partners-1440.png), [mobiel](full-review/partners-390.png) |

Baseline: actuele devserver op 4323, vier schermformaten, vóór de bewerkingen. Er was geen HEAD-commit; veel projectbestanden waren untracked. Zie `before/baseline.json`. Geen reset, clean of commit uitgevoerd. Oude QA-mappen blijven procesarchief.

## Visuele acceptatie

- [x] Eén hero-grid met samenhangende kop en beeld. H1 is maximaal 72 px; op 320 px 36 px. Desktop en mobiel werkelijk geopend en bekeken.
- [x] Nieuwe statische vector met drie contourgewichten, wasdetails, consistente houders en een voet. Geen glow, hulsttakjes, losse stralen of sieranimatie. Compacte variant deelt de kaarsvormen, met ondiepere armen.
- [x] Geen onbedoelde aanraking met tekst, actie of feitenlijn. Het tekeningrapport controleert geometrische scheiding; desktop minimaal 24 px ruimte, mobiel minimaal 16 px. Visueel gecontroleerd op onder meer 1440, 1001, 768, 390 en 320 px.
- [x] Datum, plaats, prijs en actie passen op alle tien referentieformaten en zes extra breakpointformaten boven de vouw. Op 320 px mag de actie over twee tekstregels lopen; alle woorden blijven zichtbaar.
- [x] Mobiele intro leest over de volle breedte; de kandelaar heeft een eigen zone. Geen tekstkolom naast decoratie.
- [x] Praktische informatie volgt direct op de hero. Mobiel komt deelname eerst, daarna datum, adres/routes, maaltijd en agenda.
- [x] Eén statusmelding. Ticketstatussen krijgen voorrang; de opsomming van ontbrekende gegevens past zich aan. Ingevulde details zijn gegroepeerd als uren/deelname, aan tafel en tijdens je bezoek.
- [x] Kort verhaal en ondersteunende foto vormen één geheel. Tekst en credit staan buiten het beeld; de foto is maximaal 500 px breed op desktop.
- [x] Geschiedenis is een geordende tijdlijn. Jaar en editie zijn tijdsaanduidingen; bezoekersaantallen staan in lopende tekst.
- [x] Historische erkenning is een namen-/rollenlijst met zeven organisaties. Groot ’25 en uitvergrote namen zijn verwijderd. Hoogte op 1440 px: circa 457 px.
- [x] De scroll wisselt uitnodiging, informatierijen, locatieverhaal, tijdlijn en erkenning af. Footer is compact en bevat geen derde praktische samenvatting.
- [x] Zonder foto’s of actuele sponsors is er geen lege module. Kleine datasets gebruiken passende rijen; de grote galerij is na visuele review gewijzigd naar gelijkmatige rijen met gebalanceerde eindparen.
- [x] JPEG en SVG gebruiken dezelfde centrale titel, intro en feiten en dezelfde volledige kandelaar. Beide zijn geopend; de losse SVG gebruikt expliciete Arial-fallbacks. [SVG-weergave](full-review/social-svg.png), JPEG: `../../public/og-image.jpg`.
- [x] Toetsenbord, menu, skiplink, agenda en lightbox getest. Bij 200% tekst op 320 px loopt tekst om zonder horizontale overflow. Header en plaatsnaam mogen extra regels innemen. [Vergrote tekst](final/text-200-320.png), [leesbare eerste viewport](full-review/text-200-viewport.png).

Deze beoordeling beschrijft concrete layoutproblemen en herstel. Ze claimt geen smaakgoedkeuring door de opdrachtgever of volledige WCAG-certificering.

## Uitgevoerde controles

Omgeving: macOS, Node.js 24.14.0, lokale Astro-productionpreview op `http://127.0.0.1:4325/`, development op 4323, Playwright Chromium. Poort 4324 was al door een ander project bezet en is niet gebruikt voor het finale bewijs.

| Controle | Resultaat | Bewijs |
|---|---|---|
| `npm run build` | 0 errors, 0 warnings, 0 hints; uitsluitend homepage gebouwd | `build.log` |
| `npm test` | 5/5 publicatie- en inhoudscontroles | `content-tests.log` |
| `node scripts/browser-qa.mjs` | 16 schermformaten; geen overflow, assetfouten, consolefouten, kapotte anchors of axe-overtredingen; feiten en actie zichtbaar | `browser-report.json` |
| Menu, anchors, agenda, routes | Enter, Escape, focusherstel, buitenklik, resize, mobiele ankers, CRLF/bytefolding/ICS-datum/bestandsnaam en routepopups geslaagd | `browser-report.json` |
| Zonder JS / tekstvergroting | Zichtbare navigatie zonder JS; 200% tekst op 320 px zonder overflow; geopend menu ook zonder axe-overtredingen | `browser-report.json` |
| `node scripts/drawing-qa.mjs` | Volledige/compacte variant, afstanden, geen overlap of lopende animaties; beide motionvoorkeuren | `drawing-report.json` |
| `node scripts/modules-qa.mjs` | 22 gerichte combinaties van dataset en viewport; 0/1/2/3/4/10/20 foto’s en 0/1/3/4/12/24/40 sponsors; geen axe-overtredingen of overflow | `modules-report.json` |
| Lightbox | Pijlen, doorlopen, Escape, focuslus, herstel en knoppen geslaagd; axe 0 | `modules-report.json`, `modules/demo-lightbox-390.png` |
| `node scripts/states-qa.mjs` | Elf gegevensvarianten, dertien weergaven inclusief volledig ingevulde versie op drie breedtes; axe 0 | `states-report.json` |
| `node scripts/performance-qa.mjs` | Lokale CLS 0 op mobiel en desktop; resource- en beeldgewichten vastgelegd | `performance-report.json` |
| `creative-qa` | Volledige pagina, secties en eerste drie mobiele schermen vastgelegd | `full-review/` |

Voorbeelden: [één foto op 320](modules/demo-gallery-1-320.png), [drie foto’s op desktop](modules/demo-gallery-3-1440.png), [twintig foto’s op desktop](modules/demo-gallery-20-1440.png), [veertig sponsors op 320](modules/demo-sponsors-40-320.png), [volledig praktisch voorbeeld](modules/state-full-390.png). Alle modulevoorbeelden zijn zichtbaar als DEMO gemarkeerd en ontbreken in productie.

## Bestanden en architectuur

`src/styles/tokens.css`, `global.css` en `campaign.css` zijn geconsolideerd tot één actuele stijlarchitectuur. `index.astro`, header, hero, praktische sectie, verhaal, geschiedenis, partners en footer volgen de nieuwe opbouw. `CandleDrawing.astro` bevat gedeelde kaarsvormen en expliciete compacte/volledige constructies, zonder SVG-ID’s.

`data/inhoud_2026.json` beheert titel en intro; `src/data/format.mjs` deelt datum-/prijsformattering tussen pagina en deelbeeld. De bestaande rechtenfilters in `publication.mjs` zijn behouden. Ongebruikte `AtmosphereSection.astro`, `BrandMark.astro` en `editorial.ts` zijn na referentiecontrole verwijderd; onderzoeksassets en historische screenshots zijn bewaard.

QA-scripts zijn aangepast op actuele semantiek, statische tekening, kleinere/grotere datasets en een nieuwe bewijslocatie. `states-qa.mjs` en `performance-qa.mjs` voegen gerichte controles toe voor de gewijzigde toestanden en prestaties.

## Grenzen en open inhoud

Er zijn na herstel geen bekende blokkerende layoutgebreken in de gecontroleerde Chromium-weergaven. Echte documentaire fotografie, de reserveringsflow en actuele sponsorpresentatie blijven afhankelijk van aanlevering; de DEMO’s zijn uitsluitend layoutbewijs. Andere browserengines en echte telefoons zijn niet afzonderlijk getest.

De oude locatiefoto woog 267.274 bytes; de nieuwe versies 40.872 en 81.398 bytes. In de lokale tests selecteerde de browser de 640px-versie. Actuele HTML, CSS en fontgewichten staan in het performancerapport. De baseline bevat screenshots maar geen volledige resource-/LCP-/CLS-meting; daarom is geen exacte vergelijking van totale initiële bytes of laadtijd beschikbaar. Lokale LCP/CLS zijn indicatief, zonder netwerk- of CPU-vertraging.

Nog nodig: aanvang/deuren/einde, zaal/ingang, doelgroep/voorwaarden, officiële inschrijfmethode en ticketlink, menu/dranken, specifieke bereikbaarheid/toegankelijkheid, vzw-contact, goedgekeurde editiefoto’s en bevestigde sponsors/logorechten. Zie `CONTENT_TODO.md`. Geen ontbrekende gegevens zijn ingevuld met aannames.
