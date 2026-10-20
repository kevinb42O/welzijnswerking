# Afgeronde UI-verbeteringen — 20 oktober 2026

Alle acht bevindingen uit de [oorspronkelijke audit](../skill-audit-2026-10-20/AUDIT.md) zijn verwerkt. De bestaande fotografische vormgeving en historische feiten zijn behouden.

| Punt | Aanpassing | Verificatie |
|---|---|---|
| F1 — hero-contrast | Donkere overlay met centrale kleurwaarden en voldoende marge. | Alle zes onderzochte tekstelementen slagen op zeven breedtes. De kleine tekst haalt minimaal **6,04:1**; de titel minimaal **5,69:1**. |
| F2 — actuele voorwaarden | Het archief gebruikt `event.eligibility` en verwijst naar praktisch. Ook de interne historische notitie verduidelijkt dit onderscheid. | De verouderde aankondiging is uit de gerenderde actuele situatie verdwenen; historisch 65+ en actueel 50+ blijven onderscheiden. |
| F3 — doelgroep vindbaar | “Voor alleenstaanden vanaf 50 jaar.” staat zichtbaar vóór de primaire heroactie. | Zichtbaarheid en positie gecontroleerd op zeven breedtes in Chromium en op mobiel/desktop in WebKit. |
| F4 — aanraakvlakken | Zelfstandige footerlinks zijn minimaal 44px hoog op mobiel en desktop. | Afmetingen gemeten in beide browsers; geen horizontale overflow. |
| F5 — fotovergroting | Eén gedeelde `PhotoViewer.astro` voor de actuele editiebeelden en de optionele galerij. Gewone links blijven de fallback. | Vorige/volgende, rondlopen, pijltjestoetsen, focusbegrenzing, Escape, sluiten, focusterugkeer, scrollherstel en herstel na een mislukte beeldlading gecontroleerd in Chromium en WebKit. |
| F6 — agenda zonder scripts | Eén kalendergenerator en een statisch meegebouwd `.ics`-bestand; de knop is een echte downloadlink. | Download werkt in beide browsers met JavaScript uit. Tijden zijn 17.00–21.30 uur Brussel; UTF-8-regels maximaal 75 bytes. |
| F7 — directe drukfeedback | Primaire knoppen hebben een onmiddellijke `:active`-toestand, zonder extra animatiebibliotheek. | In gedeelde CSS aanwezig; toetsenbordfocus blijft behouden. |
| F8 — gedeelde waarden | Menu, overlay, hero, footer en interactietimings gebruiken semantische tokens. | Visuele controle en vergelijking van CSS; bestaand palet behouden. |

## Controle-uitkomsten

- `npm test`: **8/8 geslaagd**, inclusief kalender met correcte tijden, escapetekens, UTF-8-regelafbreking en fallback naar een datumherinnering.
- `npm run build`: **0 fouten en 0 waarschuwingen**; homepage en `kerstavond-oostende-2026.ics` gebouwd.
- `node scripts/audit-fixes-qa.mjs`: geslaagd. Chromium op **320, 390, 768, 1000, 1001, 1440 en 1920px**; WebKit op **390 en 1440px**. Alle beginsituaties en de open beeldviewer hebben **0 axe-overtredingen**.
- Inschrijfroute en centrumoverzicht blijven werken. Menucontrole omvat Enter, Tab, Shift+Tab, Escape en focusterugkeer.
- **200% tekst op 320px**: pagina en beeldviewer blijven zonder horizontale overflow bruikbaar in beide browsers.
- Reduced motion gecontroleerd; de menuanimatie is uitgeschakeld.
- Zonder JavaScript: agenda is downloadbaar en een klik op een foto opent de afbeelding via een gewone link.
- De optionele galerij is aanvullend gecontroleerd met **0, 1 en 20 foto's**. Bij één foto verdwijnen de overbodige vorige/volgende-knoppen; bij twintig foto's werkt rondlopen en focusterugkeer.
- `node scripts/hero-contrast-qa.mjs`: alle contrastgrenzen geslaagd op zeven breedtes. CSS-voorgrondkleuren worden vergeleken met de werkelijke ondergrond achter de letters; antialiasingranden worden niet als tekstkleur gebruikt.
- `git diff --check`: geslaagd.

Het herhaald meten van het contrast leverde bij dezelfde instellingen identieke waarden op. De nulmeting en oorspronkelijke screenshots blijven in de oude auditmap staan.

## Detector en platformintegratie

De Impeccable-detector is opnieuw uitgevoerd op de broncode en de gerenderde mobiele pagina. De eerdere waarschuwing voor een lege lightboxafbeelding is verdwenen. De resterende meldingen gaan over de bestaande serif/crème-vormgeving, labels, typografische slotregels en de eerder gecontroleerde footer-neutrals. Deze zijn geen nieuw vastgestelde functionele of contrastfouten. Ze zijn daarom niet mechanisch weggewerkt ten koste van de bestaande identiteit.

Tijdens deze werkzaamheden zijn buiten deze UI-wijzigingen ook `@vercel/analytics` en `<Analytics />` toegevoegd aan het project. In de lokale Astro-preview geeft `/_vercel/insights/script.js` een **404**. Deze bevinding staat expliciet onder `platformUnavailable` in `verification.json`; overige gecontroleerde lokale routes geven geen HTTP-fouten en er zijn geen ongehanteerde JavaScript-fouten. De analyticsintegratie is hier niet gewijzigd of op de hostingomgeving geverifieerd.

## Bewijsbestanden

- [Browserresultaten](verification.json)
- [Contrastmetingen](hero-contrast.json)
- [Mobiele hero](viewport-390.png)
- [Desktopweergave](viewport-1440.png)
- [Mobiele beeldviewer](viewer-390.png)
- [Broncodedetector](detector-source.json) en [gerenderde detector](detector-rendered.json)

De controles gebruiken desktopbrowsers met ingestelde schermformaten en toetsenbord-/muisautomatisering. Ze omvatten geen fysieke telefoon, screenreader of volledige WCAG-certificering. Er is vanuit deze chat geen publicatie uitgevoerd.
