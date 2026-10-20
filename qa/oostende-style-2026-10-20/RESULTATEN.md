# Oostendse restyling — verificatie

De volledige publieke pagina gebruikt lokaal gehoste Cooper Hewitt, Oostends donkerblauw en helderblauw, witte en lichtgrijze vlakken en eenvoudige hoekvormen. Header, mobiel menu, hero, feitenstrook, praktische informatie, inschrijfhulp, centrumlijst, FAQ, archief, verhaal, geschiedenis, partners en footer zijn samen gecontroleerd. De fotoviewer behoudt zijn neutraal donkere ondergrond.

## Uitgevoerde controles

- `npm run build`: 50 Astro-bronbestanden gecontroleerd; geen errors, warnings of hints. Statische build geslaagd.
- `npm test`: alle 11 bestaande content- en SEO-tests geslaagd.
- `verify.mjs`: 320, 390, 768, 1001 en 1440 px; geen horizontale pagina-overloop, gebroken zichtbare beelden of ongeldige interne ankers. Alle drie fontgewichten laden.
- Axe op 390 en 1440 px en op open menu, centrumlijst en viewer: geen bevindingen in de gecontroleerde regels.
- Menu: focus trap, Escape, focusherstel en inschrijfanker. FAQ: exclusief openen. Centrumlijst: inschrijfroute en negen centra.
- Viewer: laden, vorige/volgende, pijltjestoetsen, Escape en focusherstel.
- Tekst op 200% bij 320 px, menu-reflow en reduced motion: geslaagd.
- Zonder JavaScript: gewone navigatie, centrumgegevens en directe fotolinks bruikbaar.
- `hero-contrast.mjs`: 56 metingen op 8 breedtes; laagste gemeten contrast op de echte foto 6,87:1. Alle gecontroleerde hero-tekst voldoet aan de gebruikte minimumdrempels.

De JSON-rapporten en screenshots in deze map zijn het bewijs. Automatische controles zijn geen volledige toegankelijkheidscertificering.

## Detector

`detector.json` bevat uitsluitend afwijkingen ten opzichte van de oude ontwerpdocumentatie: Cooper Hewitt, de nieuwe overlaykleur en bestaande kleine typografische varianten. De documentatie wordt binnen deze geautoriseerde restyling bijgewerkt. Geen tweede detectorronde uitgevoerd.

## Afbakening

Alleen lokale implementatie en preview. Niet gepubliceerd. Reeds aanwezige wijzigingen aan inhoud, hero-copy en navigatie in de gedeelde werkmap zijn behouden.

## Visuele review en gerichte correctie

De onafhankelijke finish-review bevestigt de referentiestijl en vraagt één gerichte correctie: editie-/locatiecontext onder de uitnodiging en menucontext onder de menutitel. Die informatie is behouden en verplaatst; geen nieuwe inhoud toegevoegd. Na deze correctie zijn dezelfde screenshots, gedragschecks, build en hero-contrastmetingen opnieuw gemaakt.

De verdict-pass in `VERDICT.md` scoort de ene gevraagde correctie als resolved en geeft disposition ship voor die fix. De oorspronkelijke review en dit gerichte verdict vormen samen het visuele reviewbewijs; het verdict is geen nieuwe volledige audit.
