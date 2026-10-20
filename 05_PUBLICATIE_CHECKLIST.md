# CHECKLIST VÓÓR LIVEGANG — welzijnswerking.be / 24 december 2026

Actuele invul- en deploystappen: `DEPLOY_MORGEN.md` (21 oktober 2026). De fotografische versie en het deploypakket zijn klaar; de inhoudelijke punten hieronder volgen nog.

## A. Inhoud eerst bevestigen bij organisatie

- [ ] Officiële naam van editie / formeel gebruik van `Kerstfeest voor Alleenstaande Senioren`.
- [ ] Doelgroep 2026: alleenstaande 65-plussers? Geografische voorwaarden? Begeleiders toegestaan?
- [ ] Exact aanvangsuur, deuren open, einduur en **juiste zaal** (Delvauxzaal was 2025).
- [ ] Aantal gangen, menuopties, allergenenbehandeling, alcohol/drank inbegrepen of niet.
- [ ] Inschrijven/tickets: voorverkoop, officiële ticketlink, telefoon, balie, deadline, beperkte plaatsen, betalingswijzen.
- [ ] Eventuele gratis deelname via welzijnspartners, procedure en voorwaarden.
- [ ] Toegankelijkheid voor rolstoelgebruikers, lift, dichtstbijzijnde ingang, assistentie.
- [ ] Eventueel georganiseerd vervoer en voorwaarden — géén 2008-regeling aannemen.
- [ ] Animatie/muziek en eventuele foto's/video's van de zaal voor 2026.
- [ ] Officieel contact-e-mailadres en telefoonnummer van de **vzw**.
- [ ] Gecontroleerde juridische footer, privacycontact, eventueel ondernemingsnummer.

## B. Sponsoroverzicht

- [ ] **Volledige lijst voor 2026** ontvangen, met officiële schrijfwijze.
- [ ] Per sponsor niveau/plaatsing bevestigd: hoofdpartner, partner, steunende partner, in natura.
- [ ] Per sponsor definitief logo in SVG (voorkeur) / PNG / WebP; toestemming om op site te publiceren.
- [ ] Per sponsor officiële bestemmingswebsite en indien relevant afgesproken volgorde.
- [ ] Geen 2025-organisaties zonder toestemming als 2026-sponsor tonen.
- [ ] Hoofdpartners krijgen consistent grotere plek zonder overdreven reclame-effect.
- [ ] Alle logo's leesbaar en toegankelijk op telefoon / desktop.

## C. Fotogalerij

- [x] Eigen Facebook-reeks van 38 foto's uit 2025 lokaal bewaard; fotografische hero en zeven geselecteerde eventbeelden verwerkt.
- [ ] Per foto fotograaf, publicatie-/portrettoestemming, credit en correct jaartal.
- [ ] Bestandsformaten geoptimaliseerd naar AVIF/WebP, grote originele scans niet rechtstreeks laden.
- [ ] Geen beelden van het 2022-ontmoetingscentrum verwarren met dit Kursaal-evenement.
- [ ] Geen AI-sfeerbeeld voorzien van het onderschrift `vorige editie`.
- [ ] Werkende optionele galerij/lightbox; toetsenbord, Escape en focus-herstel.

## D. Design & QA

- [ ] Mobiel getest op 320, 360, 390 en 430 px; geen horizontale scrollbar.
- [ ] Tablet getest op 768 en 1024 px.
- [ ] Desktop getest op 1280, 1440 en 1920 px.
- [ ] Basistekst minstens ~18 px op mobieltjes; contrast minimum WCAG AA.
- [ ] CTA/links bruikbaar met duim, toetsenbord en schermlezer.
- [ ] Voorkeur `prefers-reduced-motion` gerespecteerd.
- [ ] Rustige animatie, geen muziek, geen sneeuw-regen, geen carrousel die uit zichzelf beweegt.
- [x] Favicon, fotografisch deelbeeld 1200×630, metadata, taal, canonical en semantische H1.
- [ ] Fotocompressie, lazy loading buiten hero, geen zware third-party scripts.
- [ ] Geen kapotte knoppen: als tickets onbekend zijn, knop naar praktische info in plaats van fake checkout.
- [ ] Alle 2026-claims, prijzen en sponsors nog één keer door vzw goedgekeurd.

## E. Techniek & domein

- [ ] Repo in Git of andere versiecontrole.
- [x] Productiebuild zonder fouten; gecontroleerd deploypakket aangemaakt.
- [ ] Voldoende toegankelijkheid/performance, liefst Lighthouse >90 op mobiel als haalbaar.
- [ ] Domein `welzijnswerking.be` gekoppeld aan de gekozen hosting; DNS en SSL gecontroleerd.
- [ ] `www.welzijnswerking.be` -> hoofddomein met 301, of omgekeerd; slechts één canoniek domein.
- [ ] Eigenaarschap en gegevens van ticketprovider gecontroleerd voordat die link live komt.
- [ ] Privacyverklaring indien er persoonlijke gegevens, analytics of formulieren zijn.
- [ ] Cookiebanner uitsluitend wanneer werkelijk vereiste niet-essentiële cookies aanwezig zijn.

## F. Wat de webmaster later eenvoudig moet kunnen aanpassen

- [ ] De 2026-ticketlink wanneer de verkoop opent.
- [ ] Doelgroep, menu en uren.
- [ ] Sponsors en sponsorvolgorde.
- [ ] Foto's met correcte credits en jaartallen.
- [ ] Eventuele SOLD OUT / UITVERKOCHT-melding als officieel bevestigd.
- [ ] Overgang naar 2027 of archief na 24 december.
