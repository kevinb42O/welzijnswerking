# Plan: Oostendse huisstijl voor de volledige kerstfeestpagina

Status: uitgevoerd op 20 oktober 2026 na bevestiging van de gebruiker. De lokale preview is beschikbaar; deze opdracht bevat geen publicatie.

## Doel en richting

De pagina van Welzijnswerking Oostende visueel laten aansluiten bij de website van Stad Oostende. De bezoeker blijft snel begrijpen voor wie het kerstfeest is, wat de praktische gegevens zijn en via welk ontmoetingscentrum inschrijven verloopt. Behoud de warme uitnodiging, de lichte basis en de leesbaarheid voor 50-plussers.

Dit plan neemt de bestaande structuur en functionaliteit als uitgangspunt. De nieuwe vraag maakt Oostends blauw en de stedelijke typografie tot voorgestelde opvolgers van de huidige antraciete acties en Public Sans. Het plan vervangt nog geen vastgelegde ontwerpbeslissingen.

## Onderzochte bronnen

Bekeken op 20 oktober 2026:

- https://www.oostende.be/ — visueel bekeken.
- https://www.oostende.be/welzijnenzorg — visueel bekeken, relevante inhoudspagina.
- https://www.oostende.be/css/skin-website.css?r=3 — kleuren en lettertypen uit de actuele stylesheet.
- Huidige Astro-componenten, tokens en DESIGN.md; bestaande desktopcapture van de navigatie vergeleken met de huidige bron. Nog geen nieuwe live capture van de lokale pagina gemaakt.

Dit is een analyse van de website, geen controle tegen een officiële huisstijlhandleiding.

## Visuele bouwstenen

De stylesheet gebruikt onder meer donkerblauw #273A7C, helderblauw #187AC9, wit #FFFFFF, lichtgrijs #F7F7F7 en grijs #696969. Cooper Hewitt komt voor in Book, Medium, Semibold en Light. Visueel herkenbaar zijn de witte basis, blauwe stevige koppen, eenvoudige rechthoekige vlakken, lijniconen en penseelstreken bij logo en zoekveld.

Voorgestelde toepassing: donkerblauw voor primaire acties en identiteit, helderblauw voor koppen en gerichte accenten, wit en lichtgrijs voor de inhoud. Behoud donkere goed leesbare lopende tekst. Controleer alle concrete tekst- en achtergrondcombinaties; de bronkleuren zijn geen bewijs van voldoende contrast. Gebruik het heldere blauw niet automatisch voor kleine tekst of witte knoptekst.

Gebruik Cooper Hewitt indien de toepasselijke fontlicentie en beschikbare bestanden dit toelaten. Behoud voldoende grote, ruim gezette lopende tekst. Beperk kapitalen tot korte labels of korte koppen. Het geschreven Oostende-logo blijft een afzonderlijk merkbeeld; maak lopende titels niet handgeschreven.

## Uitvoering per onderdeel

1. **Tokens en typografie:** pas de centrale kleurrollen en fontdefinities aan in `src/styles/tokens.css`; werk gedeelde regels bij in `global.css` en `campaign.css`. Vermijd een extra laag losse overschrijvingen.
2. **Header en mobiel menu:** behoud de eigen naam en de huidige navigatievolgorde. Maak de identiteit donkerblauw en geef de inschrijfknop een consistente blauwe behandeling. Gebruik een officieel stadslogo alleen wanneer de correcte asset en de bedoelde relatie met de organisatie vaststaan.
3. **Hero en feitenstrook:** behoud de kersttafel en de uitnodiging. Stem de verduistering subtiel op het nieuwe palet af zonder de foto volledig blauw te maken. Geef datum, locatie en prijs een heldere witte strook met blauwe accenten. Gebruik eventueel één passende penseelstreek als officiële of zorgvuldig gekozen grafische asset; zet geen belangrijke tekst op een onrustige textuur.
4. **Voor wie, praktische info en inschrijven:** voer dezelfde koppen, linkstijlen, knoppen en scheidingslijnen door. De ontmoetingscentra krijgen een rustig lichtgrijs vlak en duidelijke telefoon- en routelinks. Behoud de zichtbare route naar inschrijven.
5. **FAQ, archief, verhaal, geschiedenis en partners:** pas de volledige componentfamilie aan, inclusief open/dicht-indicatoren, bijschriften en historische vermeldingen. Gebruik eenvoudige lijniconen en consistente fotokaders. Behoud editiejaar, bron en partnerlogo's in hun eigen vorm.
6. **Footer en foto-viewer:** behoud de compacte lichte footer met blauwe links en identiteit. Houd de foto-viewer neutraal donker; trek de nieuwe stijl vooral door in typografie, bediening en focus.

## Behoud en controle

Actuele gegevens uit `data/inhoud_2026.json`, inschrijfwijze, centrumgegevens, agenda met Brusselse tijden, bronregels en verenigingsgegevens blijven behouden. Geen stedelijke zoekfunctie of O-punt-dienstverlening toevoegen aan deze evenementpagina.

Controleer desktop, tablet en mobiel op 320, 390, 768 en 1440 px; tekstvergroting op 200%; toetsenbordfocus, menu, FAQ, centrumdisclosure, fotoviewer en reduced motion. Controleer dat telefoon-, route-, kalender- en fotolinks bruikbaar blijven zonder JavaScript. Draai build en relevante bestaande controles. Leg desktop- en mobiele screenshots vast van de volledige pagina en interactieve staten.

## Volgorde en oplevering

Eerst de centrale stijl en header/hero/feitenstrook toepassen, vervolgens alle overige secties en interactieve staten in dezelfde ronde afwerken. Daarna visuele en functionele controle, en pas bij implementatie de ontwerpdocumentatie afstemmen op de uiteindelijke keuzes. Geen publicatie onderdeel van dit plan.

De bestaande componentstructuur en centrale tokens maken dit een overzichtelijke restyling. De belangrijkste uitwerking zit in typografie, een evenwichtige hero en consequent afgewerkte details op mobiel; een volledige herbouw is niet nodig.

## Uitgevoerd resultaat

De blauwe kleurrollen, Cooper Hewitt, vrijwel rechte hoeken, blauwe koppen en nieuwe link-/knopstijlen zijn over de volledige pagina toegepast. De hero behoudt warme fotografie met navy verduistering. De korte editie-/locatiecontext staat onder de uitnodiging; ook de menucontext volgt de menutitel. Eigen organisatie-identiteit en historische bronvermeldingen blijven behouden. De optionele penseelstreek en het stadslogo zijn niet toegevoegd.

Build en 11 tests slagen. Vijf schermbreedtes, open menu/FAQ/centrumlijst/viewer, no-JS, reduced motion en 200% tekst zijn gecontroleerd. Hero-contrast: 56 metingen, minimaal 6,87:1. De onafhankelijke visuele review vroeg één gerichte correctie aan de contextregels; de laatste verdict-pass scoorde deze correctie resolved en gaf disposition ship voor die fix. Zie `qa/oostende-style-2026-10-20/RESULTATEN.md`, `FINISH_REVIEW.md` en `VERDICT.md` voor bewijs en afbakening.
