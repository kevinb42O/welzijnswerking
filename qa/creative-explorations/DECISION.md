# Creative explorations — 18 oktober 2026

## Audit vóór de uitvoering

Behouden: Astro, centrale JSON-inhoud, expliciete foto- en sponsorpublicatievoorwaarden, veilige ticketstatus, de toetsenbordbedienbare lightbox, agendadownload en feitelijke bronverwijzingen. De gehele werkmap was bij aanvang untracked; geen bestaande wijzigingen teruggedraaid.

Vervangen: de groene 49/51-split met AI-dinerfoto, de dubbele intro/features, drie uniforme jaartalkaarten, lege galerijmelding, uitgebreide tabel met ontbrekende velden en lege sponsorstatus.

Onbekend: tijden, voorwaarden, menu, tickets, vzw-contact, goedgekeurde evenementfoto’s en sponsors voor 2026. Geschiedenis en actuele editie blijven gescheiden. De oudere prompts zijn uitsluitend als afkeurdossier gelezen. De nieuwe opdracht uit de door de gebruiker aangewezen briefing bepaalt deze uitvoering.

## Drie uitgewerkte studies

Alle HTML-studies bevatten een hero en de eerste twee vervolgsecties. Alle zes screenshots zijn werkelijk geopend en bekeken. Ze staan buiten `public/` en zijn geen productieroutes.

| Richting | Desktop en mobiel | Beoordeling |
|---|---|---|
| A — De kerstaffiche | `concept-a-1440.png`, `concept-a-390.png` | Bricolage, rood drukwerk, papier en een originele kandelaar. Direct herkenbare kerstidentiteit; goede mobiele hiërarchie. De vervolgsecties zijn nog te eenvoudig en moeten verder worden gecomponeerd. |
| B — De Kursaalavond | `concept-b-1440.png`, `concept-b-390.png` | Manrope, nachtblauw, goud en ruimtelijke bogen. Rustig en ruimtelijk, maar de boog snijdt op mobiel door de kop. Te veel afstand tot een toegankelijke lokale kersttraditie. |
| C — Het lokale kerstverhaal | `concept-c-1440.png`, `concept-c-390.png` | DM Sans, journalistieke titel en rood datumdrukwerk. Menselijke lokale toon, maar de datumkaart verdubbelt informatie. Op mobiel neemt de intro te veel hoogte in vóór de actie. |

**Keuze: A**, met de inhoudelijke compactheid van C. De kandelaar is een eigen SVG, geen foto, merklogo of gereconstrueerde Kursaalzaal. Het golfmotief verwijst naar Oostende aan zee. Het beeld komt als vereenvoudigd teken terug in het woordmerk en de favicon. De eindpagina krijgt een archief als geopende publicatie, een rood kalenderblad en een historische erkenning in twee inhoudelijke groepen.

## Typografische vergelijking op dezelfde compositie

`type-bricolage-{1440|390}.png`, `type-manrope-{1440|390}.png` en `type-dm-{1440|390}.png` tonen exact dezelfde hero én langere praktische tekst. De drie mobiele varianten zijn naast elkaar visueel beoordeeld. Bricolage heeft het meest kenmerkende letterbeeld, vooral in de K en de ronde vormen, maar is te aanwezig voor langere uitleg. Manrope is rustiger maar minder onderscheidend; DM Sans leest het natuurlijkst als lopende tekst. Daarom Bricolage voor koppen en DM Sans voor tekst en bediening. Alleen de twee gebruikte Latijnse WOFF2-bestanden worden gepubliceerd (samen circa 76 KiB), met OFL-licenties. Manrope blijft uitsluitend in de onderzoeksmap.

## Van studie naar eindontwerp

De affiche is verder ontwikkeld: bredere, ontworpen feitenregel; zelfstandig mobiele compositie; rijk tweedelig bronnenarchief; kalenderblad met route-informatie; gegroepeerde historische credits. De eerste productieversie en twee afzonderlijke correctierondes zijn vastgelegd in `../final/round-1/`, `round-2/` en `round-3/`. Verdere modulecorrecties volgden na daadwerkelijke screenshotinspectie.
