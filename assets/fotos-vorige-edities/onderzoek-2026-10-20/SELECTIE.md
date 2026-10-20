# Vervolg: Facebook gevonden en verwerkt

Op 20 oktober 2026 is rechtstreeks via de Facebookzoekfunctie de pagina **Welzijnswerking Oostende** gevonden: https://www.facebook.com/profile.php?id=100066480021669 . Het openbare bericht van **25 december 2025** bevat **38 foto's van de kerstavond**. Alle 38 foto-IDs zijn via de zichtbare carrousel doorlopen en lokaal opgeslagen. Na foto 38 keerde de carrousel terug naar foto 1: de reeks is volledig binnengehaald.

Bronbericht: https://www.facebook.com/permalink.php?story_fbid=pfbid02mnYXrpdC19N5fsG8AepACcd7QGvm1z3ucA3NtRZPXMGPviJKsGgHrPiZ4EnR3xyRl&id=100066480021669

Bronbestanden en bronverwijzing per foto: `../facebook-2025/manifest.json`. Contactbladen: `qa/facebook-2025/contact-1.jpg` en `contact-2.jpg`. De gewone webzoekopdrachten leverden dit album niet op; rechtstreeks zoeken in Facebook wel. De eerdere conclusie dat geen openbaar album was gevonden, is hiermee achterhaald.

## Actuele website

- Groot beeld: albumfoto 25, de volle zaal in 2025.
- Zes aanvullende beelden: 17 (bediening), 7 (keuken), 34 (desserts afwerken), 31 (dans), 1 (gasten aan tafel), 37 (desserts klaarzetten).
- Alle overige albumfoto's zijn bewaard. De selectie toont verschillende aspecten van de avond en vermijdt veel herhaling van dezelfde zaalhoek.
- De aankondigingsfoto met onder anderen **Fabrice Goffin** is op uitdrukkelijk verzoek apart toegevoegd in `StorySection.astro`, met november 2025 als datumcontext en de volledige namenrij uit het KW-onderschrift. Credit EFO / KW.
- De oudere pers-/archieffoto's blijven in de beeldbank; de eigen Facebookfoto's dragen nu het zichtbare beeldverhaal. De publicatiebuild bevat zeven albumfoto's plus de gevraagde organisatiefoto. Er is niet gedeployd.

---

## Eerdere onderzoeksronde (historische registratie; bovenstaande keuze is actueel)

# Beeldselectie — bijgewerkt 20 oktober 2026

Op uitdrukkelijk verzoek van de opdrachtgever zijn de geschikte gevonden beelden in de **gewone website** verwerkt. De eerdere scheiding waarbij alle eventbeelden uitsluitend in een preview stonden, is opgeheven. In het ontwerp staan alleen een korte broncredit en het juiste editiejaar; onderzoeksnotities staan hier.

## Resultaat

**Negen unieke beelden, tien gedownloade bronbestanden.** Vier echte eventbeelden zijn geselecteerd voor de website. Er is geen compleet openbaar fotoalbum van de editie december 2025 gevonden. De gevonden foto uit die editie is wel in de pagina opgenomen.

| Beeld | Datering en bron | Gebruik |
| --- | --- | --- |
| Vrijwilligers met dienblad, gasten aan tafel op achtergrond | Editie 2025. KW, 25 december 2025. Credit JRO. | Belangrijkste foto in de nieuwe beeldsectie. |
| Zaal met gasten aan tafels en dansvloer | Editie 2019. Focus & WTV, 24 december 2019; datum bevestigd in HTML. | Archiefkaart 2019. |
| Groep vrijwilligers in witte kerstshirts | Editie 2018. KW, 25 december 2018. Credit FRO. | Archiefkaart 2018. |
| Kerstman met vrijwilligers en organisatie | Editie 2016. KW, 24 december 2016. Credit FRO. | Archiefkaart 2016. |
| Groep organisatoren buiten het Kursaal met muzikale kerstman | Aankondiging 14 november 2025. KW, credit EFO. | Beeldbank; geen decemberfoto. |
| Groep organisatoren in winkelstraat | Aankondiging 21 oktober 2019. KW, credit GLO. | Beeldbank; geen decemberfoto. |
| Twee videostills met vrijwilligers | Editie 2025. Het Nieuwsblad via Sterartiesten, 25 december 2025. | Referentie; persfoto heeft voorkeur. Eén still bevat spelerknoppen. |
| Gevel Kursaal | Aankondiging 16 november 2025. Het Nieuws Vandaag, Stefaan Reuse. Opnamedatum onbekend. | Beeldbank; geen eventfoto. |

De vijfde oorspronkelijke download is een tweede uitsnede van de zaalopname uit 2019. Die is niet als extra unieke foto geteld. WebP-versies zijn evenmin als extra beelden geteld.

## Verwerking

De hoofdpagina gebruikt `EventArchive.astro` na de praktische informatie. Foto 2025 staat groot; de edities 2019, 2018 en 2016 vormen een kleinere archiefrij. Bij elk beeld staat de bronreportage. De bestaande groene hero en de aparte CC0-locatiefoto blijven behouden. Vier geselecteerde beelden worden als responsive WebP-bestanden lokaal geladen. Geen generatieve bewerking, geen vergroting van kleine bronbeelden en geen video-embed.

`/dev-preview/beeldenonderzoek` toont alle negen unieke vondsten voor interne vergelijking. `/dev-preview/fotoselectie` toont dezelfde beeldcompositie als op de hoofdpagina. De onderzoeksroutes blijven development-only; de geselecteerde WebP-bestanden zitten nu juist wél in de publicatiebuild. De oude QA-bestanden van de eerste ronde zijn vervangen door de actuele controle.

## Herkomstregistratie

`manifest.json` bevat primaire bron- en bestands-URLs, artikeldata, oorspronkelijke captions, afmetingen, SHA-256 en de gebruikte webvarianten. De opdracht om beelden te gebruiken is als publicatiebeslissing vastgelegd. Er is geen verleende hergebruiklicentie verzonnen en `permissionReceived` blijft feitelijk ongewijzigd. Er is geen contact met derden opgenomen en niets gedeployd.

## Aanvullend onderzocht

- KW: openbare zoekfunctie en primaire reportages over 2016, 2018, aankondiging 2019, aankondiging 2025 en de editie 2025. Openbare beeld-URLs zijn gedownload; beschermde API-endpoints zijn niet gebruikt om inhoud te verkrijgen.
- De Plate: records DOC2014/0003 en DOC2013/0748 beschrijven relevante foto's maar leveren publiek alleen een placeholder op. Daarom geen extra beeld binnengehaald of meegeteld.
- Welzijnswerking.be: HTTP-parkeerpagina van Easyhost, HTTPS niet bereikbaar; geen eigen fotogalerij aangetroffen.
- Gerichte zoekopdrachten voor Kursaal, Vesalius, vrijwilligers, Facebook, Instagram, lokale media en fotoalbums: geen extra verifieerbaar openbaar album van december 2025 gevonden.
- Uitgesloten: Rosa Hotel/Lege Brooddozen, De Schelpe 2022, Sing Along, kerstvariété en oudjaarsfeest. Dat zijn andere initiatieven/evenementen.

De KW-beeldlink uit de eerste ronde werkte met URL-gecodeerde komma (%2C) en normale browserheaders. De Nieuwsblad-artikelpagina bleef 403 geven; de twee stills via Sterartiesten waren openbaar bereikbaar. Er is geen login of betaalmuur omzeild.

## Primaire bronnen

- [KW: editie 2025](https://kw.be/nieuws/samenleving/wendy-van-wanten-en-zoon-clement-dienen-op-tijdens-kerstfeest-voor-alleenstaanden-amai-wat-een-knappe-jongen-hij-lijkt-sprekend-op-zijn-vader/)
- [Focus & WTV: editie 2019](https://focus-wtv.be/nieuws/kerstfeest-kursaal-voor-750-senioren-en-alleenstaanden)
- [KW: editie 2018](https://kw.be/nieuws/samenleving/meer-dan-700-alleenstaanden-vieren-kerstavond-in-kursaal-oostende/)
- [KW: editie 2016](https://kw.be/nieuws/samenleving/hartverwarmend-kerstreveillon-in-oostende/)
- [KW: aankondiging 2025](https://kw.be/nieuws/samenleving/opnieuw-kerstfeest-voor-alleenstaande-senioren-in-het-kursaal-van-oostende-veel-mensen-hadden-heimwee-naar-het-avondfeest/)
- [KW: aankondiging 2019](https://kw.be/nieuws/samenleving/kerstfeest-voor-alleenstaande-oostendenaars-vindt-voortaan-s-middags-plaats/)
- [Sterartiesten: videostills 2025](https://sterartiesten.be/video-wendy-van-wanten-en-clement-laten-gouden-hart-zien-en-helpen-als-vrijwilligers-op-een-kerstfeest-voor-alleenstaanden-in-oostende/)
- [Het Nieuws Vandaag: locatiefoto](https://www.hetnieuwsvandaag.be/nl/nieuws/regio/kerstavond-voor-alleenstaanden-vanaf-65-jaar-in-kursaal-oostende/)
