# Visuele consistentie — 21 oktober 2026

Methode: twee onafhankelijke beoordelingen, A: /root/visual_review, B: /root/consistency_evidence. Doel: src/pages/index.astro. Actuele desktoprender op http://127.0.0.1:4323/ bij 1280×720 bekeken. Mobiele aandachtspunten zijn uit de actuele CSS afgeleid, niet opnieuw op mobiel visueel geverifieerd.

De website heeft een professionele, herkenbare basis: warme papier- en zandtinten, één Cooper Hewitt-familie, donkerblauwe acties, rustige lijnen en echte lokale fotografie. De geruststelling voor wie niemand kent sluit goed aan bij de doelgroep. De asymmetrische fotohoeken en afwisselende composities zijn bewuste ontwerpkeuzes en verdienen behoud.

## Prioriteiten

1. **P2 — Leesbaarheid van kerninformatie.** Heroactie is 14px, vanaf 601px 15px, onder 360px 13px; gewone acties zijn 16px. Mobiele feiten krimpen tot 13px en de prijsaanvulling tot 11px. Gebruik 16px voor hoofdacties en kernfeiten en laat het blok hoger worden. Bron: src/styles/campaign.css:36, 42, 52, 73–75. Doelgroep: oudere en slechtziende bezoekers.
2. **P2 — Datum en uren groeperen.** Onder Wanneer staat alleen de datum; de uren staan verderop bij Uren en deelname. Toon beide direct samen in src/components/PracticalInfo.astro. Dit voorkomt zoeken en onthouden.
3. **P2 — Open toestand van uitklappers gelijkmaken.** FAQ-indicator wordt gevuld, centrumindicator blijft een contour. Gebruik dezelfde blauwe vulling met licht minteken. Bronnen: src/components/WelcomeSection.astro:34 en src/styles/campaign.css:143.
4. **P2 — Typografische rollen verduidelijken.** Gewone sectiekoppen eindigen op 36px, welkom op 40px, archief op 52px en een organisatie-h3 op 38px. Dat maakt het historische deel opvallend. Behoud een redactionele uitzondering, maar geef praktische informatie minstens even duidelijke prioriteit. Definieer herbruikbare rollen voor sectiekop, beeldverhaalkop, tussenkop, beschrijving en bron. Bronnen: EventArchive.astro:45, StorySection.astro:12, WelcomeSection.astro:28 en campaign.css:97.
5. **P2 — Centrumkeuze scanbaar maken.** Negen centra vormen de grootste keuzelast. Maak wijklabels duidelijker of groepeer per wijk; voeg geen zware filterinterface toe. Overweeg na de lange historische inhoud een discrete teruglink naar inschrijven. Bron: MeetingCentres.astro en SiteFooter.astro.

## Heuristische beoordeling

Voorlopige ontwerpbeoordeling, geen volledige gedragstest of toegankelijkheidscertificering.

| Heuristiek | Score | Bevinding |
|---|---:|---|
| Zichtbaarheid systeemstatus | 3/4 | Open toestand kan consequenter |
| Aansluiting bij echte wereld | 4/4 | Gewoon Nederlands en concrete gegevens |
| Controle en vrijheid | 4/4 | Links en native disclosures |
| Consistentie en standaarden | 3/4 | Knoptekst en indicatoren verschillen |
| Fouten voorkomen | 4/4 | Agenda versus inschrijving helder |
| Herkennen boven onthouden | 3/4 | Datum en uren staan apart |
| Flexibiliteit en efficiëntie | n.v.t. | Informatieve campagne |
| Esthetiek en minimalisme | 3/4 | Secundaire inhoud krijgt veel gewicht |
| Foutherstel | n.v.t. | Geen eigen invul- of reserveringsproces beoordeeld |
| Hulp en documentatie | 3/4 | FAQ en contactinformatie aanwezig |
| Totaal | 27/32 | Goed; geen P0/P1 vastgesteld |

Cognitieve belasting is laag bij oriëntatie en matig bij negen centra. De emotionele reis begint warm en geruststellend, maar eindigt na veel archiefinhoud vooral administratief. Belangrijke persona-aandachtspunten: kleine kerninformatie voor slechtziende bezoekers, gescheiden datum/uren voor nieuwe bezoekers en lang scrollen voor centrumkeuze op mobiel.

## Technisch bewijs

Detector: 31 advisories onder uitsluitend design-system-font-size; geen blocking findings. campaign.css: 25; EventArchive: 2; WelcomeSection: 2; StorySection: 1; ResearchArchive: 1. Dit zijn geen 31 bewezen ontwerpfouten: meerdere lokale maten zijn bewust beschreven in DESIGN.md, maar ontbreken in de normatieve font-ramp. ResearchArchive is alleen voor ontwikkeling; overige regels bevatten ook optionele/previewinhoud. Volledige data: detector.json.

Verse Vercel Web Interface Guidelines gelezen. Gedeelde focus, reduced motion, native details/dialogs, linkstijlen en afbeeldingsdimensies zijn aanwezig. Kleine aanvullende polish: theme-color in BaseLayout.astro:13 is blauw terwijl header en pagina warm papier zijn. Geen volledige WCAG-audit uitgevoerd.

Vervolgkeuze: eerst leesbaarheid en informatiehiërarchie, of eerst centrumkeuze en paginaritme? Omvang: drie belangrijkste verfijningen of alle vijf?
