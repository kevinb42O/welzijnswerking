---
target: rate mijn website op 100
total_score: 31
max_score: 36
na_heuristics: 7
p0_count: 0
p1_count: 1
target_identity: "file:/Users/kevin/PROJECTS/Welzijnswerking_2026/src/pages/index.astro"
target_fingerprint: "sha256:20b228e062d452f8a2523b5b03726b240cfef5cd32d9681e5548d0c2633cb655"
target_path: /Users/kevin/PROJECTS/Welzijnswerking_2026/src/pages/index.astro
timestamp: 2026-10-21T07-28-46Z
slug: src-pages-index-astro
---
Method: dual-agent (A: /root/design_review · B: /root/technical_review)

# Websitebeoordeling — 21 oktober 2026

**80/100.** Een verzorgde, warme en geloofwaardige evenementenwebsite. Onafhankelijk visueel oordeel: 83/100; de synthese weegt ook de geobserveerde problemen met foto-viewer en kaart mee. Deze holistische score is geen automatische omzetting van de heuristiekentabel.

Beoordeeld: huidige lokale homepage src/pages/index.astro op http://127.0.0.1:4323/. Desktop visueel en interactief bekeken bij 1280×720; aanvullende mobiele screenshots door ouderagent. Geen volledige mobiele, axe-, zoom- of screenreadertest.

## Eigen karakter en sterke punten

De Oostendse blauwe identiteit, warme ondergrond, echte deelnemersfoto's en gewone taal passen bij de organisatie. De kaarslichtfoto is algemener, maar de rest geeft de pagina een lokaal en menselijk karakter.

- Doelgroep en hoofdactie zijn direct herkenbaar, met rustige typografie en consistente bediening.
- “Je mag gerust alleen komen, ook als je niemand kent” neemt een relevante sociale drempel weg.
- Prijs, uren, route-, bel- en agendakoppelingen ondersteunen de praktische taak. Historische foto's krijgen hun jaartal.

## Prioriteiten

1. **P2 — Foto-viewer begrenzen.** Bij 1280×720 werd de afbeelding circa 865px hoog in een beeldvak van 410px. Zij schildert over de zone voor bijschrift en navigatie. Begrens de beeldbox werkelijk tot het beschikbare vak en controleer volledige foto plus bediening. Bron: src/styles/motion.css, src/styles/campaign.css, src/components/PhotoViewer.astro. Passend: $impeccable harden.
2. **P1 — Huidige inschrijfstatus duidelijk maken.** Startdatum, deadline en betaalwijze worden nog bekendgemaakt. Daardoor blijft onzeker wat iemand vandaag kan doen. Zet de bevestigde stand apart bij de inschrijfactie en benoem een bruikbare vervolgstap; verzin geen ontbrekende gegevens. Bron: data/inhoud_2026.json, src/components/PracticalInfo.astro. Passend: $impeccable clarify.
3. **P2 — Kaartfout onderzoeken.** Openen en heropenen leverde lokaal een laadfout zonder markers op. Keuzelijst en centrumgegevens werken wel. Onderzoek initialisatie en controleer daarna de productieversie; productie-impact is nog onbekend. Bron: src/scripts/centre-map.ts. Passend: $impeccable harden.
4. **P2 — Centrumkeuze compacter maken.** Negen uitgebreide blokken vragen veel vergelijking. Zet wijken als korte springlinks boven de lijst en houd wijk, centrum en belactie voorop. Schrap dubbele uur-/doelgroeprijen uit de praktische sectie. Bron: src/components/MeetingCentres.astro, src/components/PracticalInfo.astro. Passend: $impeccable distill.

## Heuristieken

| Heuristiek | Score /4 |
|---|---:|
| Zichtbaarheid van status | 3 |
| Aansluiting bij gewone taal en werkelijkheid | 4 |
| Controle en vrijheid | 3 |
| Consistentie | 4 |
| Fouten voorkomen | 3 |
| Herkennen boven onthouden | 3 |
| Flexibiliteit/versnellers | n.v.t.; beperkte informatiesite |
| Esthetiek en eenvoud | 3 |
| Foutherstel | 2 |
| Hulp | 3 |
| **Totaal** | **31/36** |

Cognitieve belasting is overwegend laag, met extra vergelijking bij negen centra. Emotioneel werkt de route van uitnodiging naar geruststelling; de onzekere inschrijfstatus verzwakt het actiemoment. Voor een eerste bezoeker is die status het grootste vraagteken. Voor een oudere bezoeker kunnen lange centrumlijsten extra zoekwerk opleveren. Voor een fotobezoeker verhindert de viewerfout de bedoelde rustige kijkervaring.

De broncodedetector gaf 26 adviezen: 25 lettergrootte-afwijkingen en één radiusafwijking. Een deel betreft gedocumenteerde uitzonderingen, overschreven CSS of dev-previewcode; dit zijn geen 26 bewezen gebruiksproblemen. Klein punt: de kaart-infolink herhaalt in zijn toegankelijke naam “bij Stad Oostende”.

Vervolgvragen: eerst foto/kaart herstellen, of inschrijfroute verduidelijken? Alleen deze prioriteiten aanpakken, of ook paginalengte en herhaling?
