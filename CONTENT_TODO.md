# Nog aan te leveren — kerstfeest 2026

Bijgewerkt op 20 oktober 2026. De site gebruikt nu een rustige fotografische hero met illustratief kaarslicht, zeven geselecteerde Facebook-eventfoto’s en de organisatiefoto met Fabrice Goffin. Fabrice bevestigde op 20 oktober via WhatsApp: 17.00–21.30 uur, alleenstaanden vanaf 50 jaar, € 5, inschrijving via de negen OC’s, erwtensoep en garnaalkroketten, muziek van Patrick “Pulle” met een verrassingsgast. Deze gegevens zijn verwerkt; het menu is uitdrukkelijk nog onvolledig. De stappen voor invullen en deployment staan in `DEPLOY_MORGEN.md`; `npm run release` maakt een bijgewerkt uploadpakket. Er is niet gedeployd.

## Nodig om bezoekers volledig te informeren

- **Aankomst:** deuren open, zaal en ingang. Aanvang en einde zijn bevestigd. Invullen onder `event` in `data/inhoud_2026.json`.
- **Aanvullende deelnamevoorwaarden:** eventuele woonplaatsvereisten en begeleiders. Alleenstaanden vanaf 50 jaar is bevestigd voor 2026.
- **Inschrijven:** via de negen OC’s bevestigd. Nog nodig: startdatum/deadline, concrete locaties/contactgegevens en betalingswijze. Een online ticketlink is niet vereist voor deze inschrijvingswijze. Alleen na bevestiging `ticketSalesStatus: "available"` instellen. Hero en praktische reserveerknop volgen deze status automatisch.
- **Menu en dranken:** overige gerechten, eventueel aantal gangen, inbegrepen dranken, dieet- en allergenenafspraken. Erwtensoep en garnaalkroketten zijn bevestigd.
- **Vzw-contact:** goedgekeurd e-mailadres en/of telefoonnummer bij `brand`; geen gegevens van de locatie als organisatorcontact gebruiken.
- **Evenementafspraken:** specifieke toegankelijkheid en vervoer, uitsluitend na bevestiging.

## Aanvullingen die automatisch zichtbaar kunnen worden

- **Extra foto's van eigen edities**, optioneel: de volledige reeks van 38 foto's uit 2025 is al lokaal beschikbaar en de eerste selectie staat op de site. Per foto: jaar, omschrijving, credit, toestemming, bewijsreferentie en publicatiekeuze. Webversies in `public/images/event/`; records in `images.galleryPreviousYears`. Zonder foto's blijft het bronnenarchief het volwaardige terugblikgedeelte.
- **Bevestigde sponsors voor 2026**, exacte namen, categorie, volgorde, officiële URL, originele logo's en schriftelijke toestemming. Logo's in `public/images/sponsors/`; records in `data/sponsors_2026.template.json`. Alleen met editiebevestiging, verificatie én logogoedkeuring zichtbaar. De huidige bedanking betreft uitsluitend 2025.

Bevestigd: donderdag 24 december 2026, Kursaal Oostende, Kursaal-Westhelling 12, 8400 Oostende, feestelijk meergangenetentje, € 5 per persoon, vzw Welzijnswerking Oostende.

Invulvoorbeelden en werkstappen: `README.md`. Testvarianten voor 0/1/2/3/4/10/20 beelden, 0/1/3/4/12/24/40 sponsors en elf inhoudstoestanden bestaan uitsluitend in development en ontbreken in de productiebuild.

## Drempels voor twijfelaars

De nieuwe sectie ‘Alleen komen. Samen vieren.’ beantwoordt de eerste sociale twijfels direct na de hero. Het antwoord ‘Voor wie’ gebruikt automatisch `event.eligibilityRules` zodra dat veld is ingevuld. Zolang het leeg is, blijft de doelgroep van eerdere edities duidelijk onderscheiden van 2026. Zodra organisatorcontact is ingevuld, verschijnt hier ook een persoonlijke contactmogelijkheid.

Bij de definitieve info ook navragen hoe de ontvangst van iemand die alleen aankomt verloopt, of plaatsen worden toegewezen, en welk contact bezoekers vóór hun inschrijving kunnen aanspreken. Pas na bevestiging concrete toezeggingen over begeleiding of zitplaatsen toevoegen.

## Aanvulling 20 oktober — website

Inschrijving heeft een eigen titel en toelichting zonder online ticketverkoop te suggereren. Uren staan ook bovenaan. De agenda-download gebruikt nu de bevestigde tijden met de tijdzone Europe/Brussels; metadata bevat begin- en eindtijd. De lange doorgestuurde mail aan Diane is een openstaande informatieaanvraag, geen bevestiging van de gevraagde gegevens.
