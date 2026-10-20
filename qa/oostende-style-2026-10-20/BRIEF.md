# Oostendse restyling — bevestigde opdracht

De gebruiker vroeg de volledige kerstfeestpagina aan te laten sluiten bij de website van Stad Oostende, bekeek het concrete plan en bevestigde met “doe maar”. Het plan staat in plans/OOSTENDSE_HUISSTIJL_2026-10-20.md.

## Richting en kwaliteit

Witte basis, donkerblauw #273a7c voor identiteit en acties, helderblauw #187ac9 voor grote koppen, donkerder linkblauw #2369a2 voor kleine links. Lokale Cooper Hewitt Book, Medium en Semibold vervangen Public Sans. Eenvoudige vrijwel rechte hoeken en dunne scheidingen sluiten aan bij Oostende. De fotografische uitnodiging blijft warm met subtiel navy verloop; de viewer blijft neutraal donker. Geen stadslogo toegevoegd omdat de eigen organisatienaam hier de afzender blijft. De optionele penseelstreek is niet nodig voor deze rustige toepassing.

## Opbouw en gedrag

De bestaande volgorde blijft: navigatie, uitnodiging met feiten, doelgroep/FAQ, praktische informatie en inschrijfhulp, negen ontmoetingscentra, fotoarchief, verhaal, geschiedenis, partners en compacte footer. De volledige pagina en alle interactieve staten delen de stijl. Inhoud en functionaliteit behouden; de gewijzigde hero-copy in de gedeelde werkmap bestond tijdens deze uitvoering al en is niet door deze restyling geschreven.

## Implementatie en grenzen

Code-led uitvoering van een expliciet gekozen referentiestijl; geen gegenereerde comp. Bron: www.oostende.be, /welzijnenzorg en /css/skin-website.css?r=3. Goedgekeurde lichte rust en leesbaarheid blijven gelden. Groen en decoratieve serif zijn eerder afgewezen. Levering lokaal, geen publicatie. Fontlicentie en bronnen in public/fonts/FONT_SOURCES.md en LICENSE-cooper-hewitt.txt.

## Verificatie

verification.json toont 320, 390, 768, 1001 en 1440 px zonder horizontale overflow, gebroken zichtbare afbeeldingen of ongeldige ankers. Axe op desktop, mobiel, open menu, open centrumlijst en viewer: geen bevindingen. Menu-focus, Escape, exclusieve FAQ, fotonavigatie/focusherstel, no-JS en 200% tekst gecontroleerd. npm build en de 11 bestaande content/SEO-tests slagen. Hero-contrast wordt apart op de werkelijke foto gemeten.

## Documentatie

DESIGN.md, PRODUCT.md en .impeccable/design.json beschrijven nog de oude neutrale stijl en moeten in deze geautoriseerde ronde met het uiteindelijke resultaat worden gesynchroniseerd. Detector: alleen verouderde documentatie en bestaande kleine typografische varianten; zie detector.json. Geen andere detectorcategorieën.
