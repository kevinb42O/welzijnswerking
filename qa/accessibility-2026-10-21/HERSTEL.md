# Toegankelijkheidsherstel — 21 oktober 2026

Alle vier bevindingen uit `AUDIT.md` zijn verwerkt. Het auditrapport blijft de oorspronkelijke nulmeting.

| Bevinding | Definitieve oplossing | Verificatie |
|---|---|---|
| A01: zichtbare labels wijken af van toegankelijke namen | Menu-/sluitknoppen en dynamische links bevatten de zichtbare tekst; kaartmarkers bevatten hun nummer. | Geen label-content-name-mismatch in de herhaalde scans, ook met kaart, menu en viewer open. |
| A02: lange automatische beweging | De volledige automatische passage is 4,7 seconden (3,2 + 0,3 + 1,2). Er is **geen stopknop**, conform de expliciete gebruikersinstructie. | Automatische voltooiing binnen vijf seconden in Chromium en WebKit; complete resterende wachttijd na het detecteren van afspelen respectievelijk 4881 en 4835 ms, inclusief testpolling. Reduced motion beëindigt ook lopende beweging. |
| A03: verdwenen foto bij sterke zoom | Onder 481px schermhoogte houdt de viewer minimaal 8rem beeldruimte; de dialoginhoud kan verticaal scrollen. | Alle zeven foto's bruikbaar op 320×256 in beide browsers; vorige/volgende en sluiten bereikbaar, focus keert terug. |
| A04: horizontale scroll bij tekstvergroting | Krimpbare gridkolom en veilige woordafbreking op de inschrijfkaart. | 320px documentbreedte bij 320px viewport en 200% roottekst in beide browsers. |

Aanvullend: overbodige aria-labelledby op de generieke resultatencontainer verwijderd; open/dichtindicatoren in forced colors met currentColor-lijnen beschermd; bestaande axe-scans uitgebreid met `wcag21a`, zodat Label in Name niet langer wordt overgeslagen. Een verouderde SEO-test telt nu specifiek de negen centrumkaarten, zonder de extra telefoonlink in de kaart mee te tellen.

## Controles

- Productiebuild en Astro/TypeScript-controle geslaagd, zonder fouten of waarschuwingen.
- Herhaalde audit: 30 toestanden in Chromium/WebKit. Geen bevestigde axe-overtredingen in de gewone toestanden. De drie eerder visueel ontkrachte forced-colors-contrastmeldingen blijven als automatische foutpositieven herkenbaar in het ruwe resultaat; zie de oorspronkelijke audit voor de onderbouwing.
- `npm run test:a11y`: nieuwe asserties voor de automatische duur, afwezigheid van de stopknop, live reduced motion, 200% tekst en zeven foto's op 320×256, in beide browsers.
- Bestaande fotoviewertest: 10 browser/viewportcombinaties, 70 echte fotocontroles en extreme beeldverhoudingen geslaagd.
- Navigatiecontrole Chromium geslaagd: zes mobiele/tabletformaten, focus, Escape, scrollherstel, ankers, FAQ, geen JavaScript, 200% tekst en axe.
- De inhoud-/SEO-unittests en productie-SEO-controle zijn onderdeel van de laatste publicatiecontrole.

Bewijs: `after/results.json`, `after/regressions.json` en de geselecteerde PNG's. Herhalen: productiepreview starten op poort 4325, dan `npm run test:a11y`. De brede audit is herhaalbaar met `QA_OUT_DIR=qa/accessibility-2026-10-21/after node qa/accessibility-2026-10-21/audit.mjs`.

## Toegankelijkheidsvoorzieningen in de uiteindelijke website

- Nederlandse documenttaal, beschrijvende paginatitel, één h1 en een logische koppen-/landmarkstructuur.
- Overslaanlink, zichtbare toetsenbordfocus en echte links, knoppen, selecties en details-elementen.
- Mobiel menu en fotoviewer met native modaliteit, inert gemaakte achtergrond, focusbegrenzing, Escape en focusterugkeer.
- Labels voor bediening die de zichtbare tekst behouden; decoratieve iconen worden niet uitgesproken.
- Informatieve alt-teksten, fotobijschriften en beschrijvingen bij vergrote foto's.
- Foto's wisselen met knoppen of pijltjestoetsen; laad- en foutmeldingen zijn beschikbaar.
- Kaartbediening met toetsenbord en benoemde, genummerde markers met selectiestatus; selectiemenu en volledige adres-/telefoon-/routelijst als alternatief voor slepen of zoomen.
- Statusmeldingen voor wijkfiltering, fotoladen en kaartproblemen; filterbediening behoudt focus.
- Native uitklapbare FAQ en centrum-/loketuren met programmatisch herkenbare open/dichttoestand.
- Responsive layout, tekstvergroting, aangepaste tekstafstand en een scrollbare viewer bij weinig hoogte.
- Voldoende contrast in de gemeten hero en onderzochte tekst; links herkenbaar door onderstreping, bediening en selectie niet uitsluitend via kleur.
- Ruime hoofdcontrols en aanraakvlakken; kleine bronlinks vallen onder de toepasselijke uitzonderingen voor tekst/tussenruimte.
- Reduced motion, ook bij live voorkeurwijziging; korte automatische slee zonder extra bediening; reduced-transparency-variant voor de menuachtergrond.
- Forced-colors-vriendelijke open/dichtlijnen; volledige Windows High Contrast-praktijktest blijft aanvullend.
- Navigatie, alle negen centra, contactgegevens, openingsuren en fotolinks blijven zonder JavaScript beschikbaar.
- Geen automatisch geluid, tijdslimieten, bewegingssensorbediening of verplicht slepen voor de primaire informatietaak.

Dit herstel is geen formele WCAG-certificering. De eerder vermelde praktijktests met VoiceOver/NVDA, spraakbediening, fysieke touchhardware, echte browserzoom en Windows High Contrast blijven de grenzen van deze technische verificatie.
