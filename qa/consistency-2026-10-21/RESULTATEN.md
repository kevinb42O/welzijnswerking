# Uitvoering — 21 oktober 2026

Alle vijf aanbevelingen uit REVIEW.md zijn doorgevoerd. Hoofdactie en kernfeiten zijn minimaal 16px. Datum en uren staan samen. Gewone sectiekoppen, redactionele koppen en tussenkoppen gebruiken expliciete rollen; bronbijschriften delen een maat van 14px. FAQ, centrumlijst en kaart hebben dezelfde gevulde openindicator. Wijknamen zijn duidelijker en de footer biedt een compacte terugweg naar de actuele inschrijfinformatie. De bestaande kaart, nummering en contactgegevens zijn behouden. DESIGN.md is bijgewerkt.

## Verificatie

- `npm run build`: geslaagd, 0 fouten, waarschuwingen of hints.
- `npm test`: 11/11 geslaagd.
- `scripts/meeting-centres-qa.mjs`: geslaagd op 320, 360, 390, 768 en 1440px; toetsenbord, automatisch openen, aanraakvlakken, vijf inschrijfstatussen, tekstvergroting en werking zonder JavaScript.
- Gerichte controle op 320, 390, 768 en 1440px: geen horizontale overflow, kerntekst minimaal 16px, uren bij datum, juiste kleuren voor beide centrumindicatoren, werkende footerlink en geen axe-bevindingen in de geteste toestand. Zie verification.json.
- 200% tekst op 320px: geen horizontale overflow.
- Actuele desktopweergave in de browser en mobiele screenshots visueel bekeken.
- Detector: 26 advisories, uitsluitend bestaande/lokale font-size-rollen; geen blocking findings. Zie detector-after.json.
- `git diff --check`: geslaagd.

Een eerste centrumtest draaide nog tegen de eerdere build met het oude footerlabel en stopte op een ambigue linknaam. Na voltooiing van de definitieve build is de hele centrumtest opnieuw uitgevoerd en geslaagd.

Er is geen publicatie uitgevoerd. De bestaande ontwikkel- en previewservers zijn behouden.
