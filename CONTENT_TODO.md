# Nog aan te leveren — kerstfeest 2026

Bijgewerkt op 20 oktober 2026. De site gebruikt nu een rustige fotografische hero met illustratief kaarslicht, zeven geselecteerde Facebook-eventfoto’s en de organisatiefoto met Fabrice Goffin. De definitieve uren, het menu, de deelnamevoorwaarden en ticketgegevens volgen morgen. De stappen voor invullen en deployment staan in `DEPLOY_MORGEN.md`; `npm run release` maakt een bijgewerkt uploadpakket. Er is niet gedeployd.

## Nodig om bezoekers volledig te informeren

- **Uren en aankomst:** deuren open, aanvang, einde, zaal en ingang. Invullen onder `event` in `data/inhoud_2026.json`.
- **Doelgroep en voorwaarden voor 2026:** bevestigen wie kan deelnemen, eventuele begeleiders en andere afspraken. De doelgroep van 2025 wordt niet overgenomen.
- **Inschrijven:** officiële werkwijze, HTTPS-ticketlink, verkoopstart/deadline en status. Alleen na bevestiging `ticketSalesStatus: "available"` instellen. Hero en praktische reserveerknop volgen deze status automatisch.
- **Menu en dranken:** definitieve gerechten, eventueel aantal gangen, inbegrepen dranken, dieet- en allergenenafspraken.
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
