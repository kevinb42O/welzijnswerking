# Fotocorrectie — 20 oktober 2026

Drie zwakste zichtbare albumfoto's gecorrigeerd: 17 (bediening), 25 (zaal), 31 (dansvloer).

De ingebouwde imagegen-tool maakte per origineel een restauratievoorstel. Die voorstellen blijven uitsluitend kleurreferenties (`*-ai-reference.png`), omdat generatieve restauratie kleine details kan hertekenen. Ze worden niet op de website getoond.

De definitieve bestanden (`*-restored.png`) gebruiken een terughoudende kleurcorrectie: 38% correctie en 62% oorspronkelijke kleurinformatie, met lichte oplichting, contrast en verscherping. De warme rode feestverlichting blijft zichtbaar. Geen gegenereerde gezichten, samengestelde beeldonderdelen of nieuwe objecten. De originele JPG's blijven onaangeroerd. De resterende onscherpte wordt niet generatief ingevuld. Na feedback is de laatste galerijfoto (zaal, 25) 3° tegen de klok in gedraaid en bijgesneden tot 1900 × 1000: minder lege voorgrond en minder plafond. De dansfoto is 1° gedraaid en licht bijgesneden tot 2000 × 1480. De zaal wordt ook in de galerij in dezelfde brede verhouding getoond, zonder extra verticale uitsnede.

De negen responsive WebP-bestanden op de bestaande websitepaden zijn vervangen, inclusief de vergrote weergaven. Niet gedeployd.

Reproduceren: `node scripts/restore-event-photos.mjs 17 25 31` vanuit de projectmap. De kleurmatrices staan in `colour-transform.json`.

## Prompt voor de ingebouwde imagegen-tool

Per origineel: herstel deze exacte documentaire eventfoto; corrigeer de sterke rood/oranje kleurzweem, herstel natuurlijke huidtinten en witte tafelkleden, licht donkere middentonen op, behoud feestelijke accentverlichting, temper heldere lampen, verwijder compressieruis en verscherp voorzichtig. Behoud alle personen, identiteiten, leeftijden, gezichtsuitdrukkingen, poses, kleding, handen, voorwerpen, architectuur, tekst en compositie. Geen toevoegingen, verwijderingen, verfraaiing van gezichten of verzonnen details. Behoud de verhouding 4:3.

De uiteindelijke levering gebruikt uitsluitend de kleurinformatie uit deze voorstellen en het beeldmateriaal uit de originele foto's.
