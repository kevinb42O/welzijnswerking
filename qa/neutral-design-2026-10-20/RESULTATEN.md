# Lichte, rustige richting — 20 oktober 2026

De gebruiker heeft deze richting bevestigd: neutraal wit, antraciet, één helder sans-seriflettertype, een compacte doorlopende footer en een neutraal donkere foto-viewer. Het groene palet en decoratieve serif/cursieve titels zijn vervangen. De inhoud, echte foto's en bestaande inschrijfroute zijn behouden.

## Veranderingen

- Public Sans voor koppen, lopende tekst en bediening. Lokaal gehost, variabel en onder OFL-licentie. Alleen het Latin-bestand wordt op deze pagina geladen: 26.636 bytes. De vorige vier vooraf geladen fontbestanden besloegen samen 204.768 bytes.
- Witte en licht neutrale oppervlakken met antraciete tekst en acties. Een blauwe toetsenbordfocus is functioneel; de viewer en hero gebruiken lichte focus op een donkere achtergrond.
- De grote afsluitende slogan is verwijderd. De footer toont het merk, navigatie en vzw-gegevens op dezelfde lichte ondergrond als de pagina, met behoud van copyright en makercredit.
- De foto-viewer heeft een neutraal donkere ondergrond en eenvoudige bediening. Het groene vlak en de goudkleurige behandeling zijn verdwenen.
- Koppen, uitlijning, onderlinge gewichten en regellengtes zijn op elkaar afgestemd. Overbodige decoratieve sectielabels zijn verwijderd. Lettergroottes gebruiken rem, zodat vergroting van de standaardlettergrootte werkelijk doorwerkt.

## Verificatie

| Controle | Resultaat |
|---|---|
| `npm run build` | Laatste build: 49 bestanden gecontroleerd; geen fouten of waarschuwingen; homepage en agenda gebouwd |
| `npm test` | Laatste controle: 11/11 geslaagd, inclusief de inmiddels toegevoegde SEO-tests |
| Chromium | 320, 390, 455, 768, 1000, 1001, 1440 en 1920px: geen horizontale overflow, geen gevonden axe-overtredingen |
| WebKit | 390 en 1440px: dezelfde controles geslaagd |
| Tekst 200% | Geen horizontale pagina-overflow; rootlettergrootte 200% vergroot de body naar minstens 36px |
| Menu | Openen, focuslus, Escape en focusterugkeer geslaagd |
| Foto-viewer | Vorige/volgende, doorlopen einde reeks, pijltjestoetsen, focuslus, Escape, scrollherstel, foutmelding en herstel geslaagd |
| Zonder JavaScript | Agenda-download en gewone afbeeldingslinks werken |
| Reduced motion | Menu-animatie uitgeschakeld |
| Aanraakhoogte footer | Zelfstandige navigatielinks minstens 44px |
| Hero-contrast | 48 metingen over acht breedtes geslaagd; laagste gemeten verhouding circa 6,22:1 |
| Ontwerpdetector | Geen bevindingen in broncontrole of gerenderde controle op 455px |
| Gebruikersvenster | Footer en viewer ook rechtstreeks visueel gecontroleerd op 455×804px |
| `git diff --check` | Geslaagd |

De lokale Vercel Analytics-route `/_vercel/insights/script.js` geeft 404 buiten de Vercel-hosting. Dit staat afzonderlijk in `platformUnavailable`. Er zijn geen andere slechte HTTP-responses of JavaScript-paginafouten gevonden. Dit rapport certificeert geen volledige WCAG-conformiteit; automatische controles dekken niet iedere toegankelijkheidsvraag.

Een eerdere herhaling werd onderbroken doordat de lokale homepage tijdelijk een 404-pagina leverde. De route is daarna gecontroleerd en de volledige Chromium/WebKit-controle is opnieuw geslaagd op de laatste build; `verification.json` bevat die geslaagde herhaling.

## Visueel oordeel

De onafhankelijke finish reviewer geeft **`ship`** voor de bevestigde aanpassing. Typografie, neutrale oppervlakken, compacte lichte footer en donkere viewer vormen volgens de geïnspecteerde captures een samenhangend geheel. Er zijn binnen dit bereik geen noodzakelijke visuele fixes gevonden. Volledige bevindingen en de grens van het oordeel staan in `VISUAL_REVIEW.md`.

**Geen bewezen 20/20.** De eerdere 15/20 was een technische nulmeting, geen garantie van visuele excellentie. De technische controles slagen nu en de gekozen visuele richting is goedgekeurd op het onderzochte bereik. Een perfecte of uitzonderlijk onderscheidende ontwerpscore volgt daar niet uit. De lange informatieopbouw en conventionele fotografische hero blijven bewuste grenzen van deze gerichte aanpassing.

## Bewijsbestanden

- `viewport-{390,455,1440}.png`: eerste scherm.
- `footer-{390,455,1440}.png`: volledige footer.
- `footer-context-{390,455,1440}.png`: footer met omringende pagina.
- `viewer-{390,455,1440}.png`: open foto-viewer.
- `full-{390,455,1440}.png`: volledige pagina, na laden en decoderen van de lazy images.
- `verification.json`, `hero-contrast.json`, `visual-metrics.json`: machineleesbare resultaten.
- `detector-source.json`, `detector-rendered.json`: ontwerpdetector.

Herhalen tegen de productiepreview op poort 4325:

```sh
QA_OUT_DIR=qa/neutral-design-2026-10-20 node scripts/audit-fixes-qa.mjs
QA_OUT_DIR=qa/neutral-design-2026-10-20 node scripts/hero-contrast-qa.mjs
```

Deze wijziging is lokaal gebouwd en beoordeeld. Er is vanuit deze chat geen productiepublicatie uitgevoerd.
