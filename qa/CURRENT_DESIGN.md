# Actueel ontwerp — 20 oktober 2026

De hero gebruikt één doorlopende, warme foto van een kersttafel bij kaarslicht, met een centraal gezette titel in Instrument Serif en een cursieve tweede regel. De praktische gegevens staan op een lichte, aparte strook. Dit is een illustratief sfeerbeeld van Nicole Michalou / Pexels, geen editiebeeld. De bron, licentie en niet-generatieve uitsneden staan in `assets/external-originals/ASSET_MANIFEST.json`. De groene half-foto en de drukke zaalfoto zijn uit de hero verwijderd.

De navigatie heeft een lichte masthead, ingetogen onderstrepingen en een omlijnde deelnameactie op desktop. Mobiel opent een ruim typografisch menu met een duidelijke sluitknop. Escape, buiten het menu klikken, ankerlinks, vensterbreedtewissels en navigatie zonder JavaScript blijven ondersteund.

De donkergroene footer sluit af met een grote rustige typografische zin, drie kolommen op desktop en subtiele scheidingslijnen. Geen fotocredits in de footer. De maatschappelijke zetel en het ondernemingsnummer zijn gecontroleerd via de door de opdrachtgever gedeelde Companyweb-pagina. Onderaan staat een kleine link naar Webaanzee: ‘Met zorg gemaakt door Webaanzee’ / ‘Een belangeloze bijdrage.’

De hoofdpagina bevat zeven geselecteerde eigen Facebook-eventfoto's en de gevraagde aankondigingsfoto van november 2025 met onder anderen Fabrice Goffin. De beeldbank bewaart de volledige Facebook-reeks van 38 foto's. Historische foto's en aankondigingen blijven bij hun eigen editie/context; de bronverwijzingen staan bij de betreffende onderdelen.

Het deelbeeld `public/og-image.jpg` gebruikt dezelfde foto, typografie en centrale evenementinformatie. De generator werkt zonder devserver. `npm run release` voert inhoudstests uit, vernieuwt het deelbeeld, bouwt de website en maakt een ZIP met `index.html` op het hoogste niveau. Ongebruikte beeldkopieën worden uitsluitend uit de productiebuild verwijderd; bronbestanden blijven behouden.

## Actuele controle

- `qa/redesign-fix/browser-report.json`: 16 schermformaten, geen overflow, kapotte beelden, lokale HTTP-/consolefouten of axe-overtredingen; CTA en feiten in het eerste scherm. Navigatie, agenda, 200% tekst en no-JS gecontroleerd.
- `qa/redesign-fix/states-report.json`: 11 inhoudstoestanden, inclusief tickets, menu en contact.
- `qa/redesign-fix/performance-report.json`: lokale indicatieve laadtijdmeting, zonder netwerk-/CPU-vertraging.
- `qa/redesign-fix/final/viewport-1440-900.png` en `viewport-390-844.png`: actuele productiebeelden.
- `qa/hero-refined-desktop.png`, `qa/hero-refined-mobile.png`, `qa/footer-refined-desktop.png` en `qa/menu-refined-mobile.png`: ontwerpcontrole van deze verfijning.
- `release/BUILD_INFO.json`: deploymanifest en nog lege kernvelden; ZIP is op inhoud vergeleken met `dist`.

## Morgen aanvullen

De definitieve uren, doelgroep, menu/dranken, tickets en organisatorcontact volgen nog. Zie `DEPLOY_MORGEN.md` en `CONTENT_TODO.md`. Na invullen opnieuw `npm run release` uitvoeren. Hosting, DNS en live deployment zijn niet gewijzigd.

## Uitnodiging voor twijfelaars

Direct na de hero staat de sectie ‘Kom gerust alleen. We vieren samen.’ met drie zichtbare antwoorden: alleen komen, niemand kennen en de doelgroep. De hoofd- en mobiele navigatie verwijzen hiernaar via ‘Voor wie?’. De tekst gebruikt de doelgroep van vorige edities alleen als historische context zolang `eligibilityRules` voor 2026 leeg is. Na aanvulling verschijnt de actuele doelgroep automatisch. Na invulling van organisatorcontact wordt ook hier een persoonlijke contactmogelijkheid zichtbaar. Er worden geen onbevestigde toezeggingen over onthaal of zitplaatsen gedaan.

De uitnodiging en antwoorden zijn daarna herschreven in gewone spreektaal. De uitleg over een ‘vertrekpunt van de traditie’ en een ‘bestaande vriendengroep’ is verwijderd.
