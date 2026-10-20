# SEO-uitvoering — 20 oktober 2026

## Google Search Console

Gecontroleerd in de door de gebruiker geopende domeinproperty `welzijnswerking.be`.

- Sitemap `https://www.welzijnswerking.be/sitemap.xml`: na verversen **Succesvol**, verzonden en laatst gelezen op 20 oktober 2026, één ontdekte pagina. Geen nieuwe of dubbele sitemap ingediend. Bewijs: `google-sitemap-succesvol.png`.
- Eerste URL-inspectie homepage: URL niet geïndexeerd / onbekend bij Google. Geen eerdere crawlgegevens beschikbaar.
- Live test op 20 oktober om 13.04 uur Belgische tijd: **URL is beschikbaar voor Google** / **Pagina kan worden geïndexeerd**. Dit is bereikbaarheid, nog geen indexering.
- **Indexering aangevraagd**: Google bevestigt toevoeging aan de prioriteitscrawlwachtrij. Bewijs: `google-indexering-aangevraagd.png`. Aanvraag geldt voor de huidige live URL; geen herhaalde aanvraag gedaan.
- Handmatige acties: **Geen problemen gedetecteerd**.
- Beveiligingsproblemen: **Geen problemen gedetecteerd**.
- Event op de bestaande live versie: één geldig item, vier optionele meldingen (image, eventStatus, performer, offers).

## Nieuwe code

Gegenereerde productie-HTML ingevoerd in Google's Rich Results Test in codemodus. Resultaat: **één geldig evenement**, geen kritieke fouten, één resterende niet-kritieke melding: `offers` ontbreekt. Geen online ticketaanbod toegevoegd: de bevestigde inschrijfroute is offline via ontmoetingscentra.

- Testresultaat: https://search.google.com/test/rich-results/result?id=Ide8A44SITbEFhYYAEMAyg
- Screenshot: `google-rich-results-code.png`.
- De codevalidatie bewijst geen live publicatie, indexering of specifieke zoekweergave in België.

De metadata, deelbeeld-alt, Organization/WebSite/WebPage/Event, locatieadres en performer komen uit centrale inhoud. Development-previews hebben `noindex, nofollow` en worden niet naar productie gebouwd. Titel, beschrijving en Event JSON-LD worden getest op de werkelijk gegenereerde HTML. De release voert die SEO-controle automatisch uit.

## Validatie

- `npm run release`: content- en SEO-unitcontroles, Astro/TypeScript en productiebuild, productie-SEO-controle en deploypakket.
- `node scripts/event-update-qa.mjs`: inhoud, geen horizontale overflow en axe-controle op 320/390/768/1440 px; bevestigde kalenderdownload en geen JavaScript-fouten.
- `node scripts/social-card-qa.mjs`: canonical, OG/Twitter, bereikbaar JPEG, werkelijk 1200×630 en circa 142 kB.
- Productie-inhoud zonder JavaScript: doelgroep, tijden, prijs, inschrijfroute en negen OC-telefoonlinks aanwezig.
- Development-preview op 4323: `noindex, nofollow` aanwezig.
- Impeccable-detector op de aangepaste layout/FAQ: geen meldingen.
- Eén indicatieve lokale mobiele performancemeting: LCP 928 ms, CLS 0; 390×844, 150 ms toegevoegde latency, 1,6 Mbps download en 4× CPU-vertraging. Eén run, geen Lighthouse-score, geen veldmeting en geen INP-resultaat. Details: `mobile-performance.json`.

Tijdens uitvoering veranderde de bestaande werkmap ook door andere vormgevings- en tekstwerkzaamheden. Hun actuele tekst is behouden. Eerdere opnames van de welkomstsectie zijn procesbewijs; de definitieve versie krijgt een nieuwe controle vóór publicatie.

## Publicatie en resterende taken

De gebruiker heeft expliciet gevraagd alle huidige wijzigingen te pushen. De volledige website is gepubliceerd via `2401ddade11f0de1538834b1ebb3b1025987a440` op `main`. Vercel-deployment `5SVPjKW8AqF5NqbxEc4f6J1ivnGL` is **Ready**, **Production / Current**, gekoppeld aan `www.welzijnswerking.be`. Publicatietijd volgens Vercel: 20 oktober 2026, 13.13.03 uur, build 22 seconden. Bewijs: `vercel-production-ready.png`.

De live controles van titel, graph, adres, performer, robots, sitemap, ICS en 404-routes slagen (`live-after-deploy.json`). De live browserchecks slagen op 320/390/768/1440 px met axe, kalenderdownload en zonder paginafouten. Het JPEG en de deelmetadata slagen ook live. `live-home-390.png` en `live-welcome-390.png` tonen de gepubliceerde versie.

Na de aanvraag bevestigt Search Console tijdens dezelfde sessie **URL is geïndexeerd door Google**. Laatste indexcrawl: 20 oktober 2026 om 13.09.20 uur, Googlebot smartphone. Crawl en indexering toegestaan, ophalen geslaagd, opgegeven canonical `https://www.welzijnswerking.be/`, Google selecteert de gecontroleerde URL. Bewijs: `google-homepage-geindexeerd.png`. Deze crawl gebeurde vóór de nieuwe productiepublicatie; de indexering van de nieuwe titel/beschrijving is daarmee niet bewezen. Het vindbaarheidsonderdeel van dit inspectierapport meldt nog een tijdelijke sitemapverwerkingsfout; de afzonderlijke sitemapoverzichtstabel toont na verversen Succesvol en één pagina.

Een nieuwe live test na publicatie, 13.14 uur (event gecrawld 13.14.44), bevestigt beschikbaarheid en één geldig evenement met uitsluitend het optionele ontbrekende `offers`. Bewijs: `google-live-event-na-publicatie.png`. Geen tweede indexeringsverzoek ingediend.

Vercel Web Analytics is geactiveerd op **Web Analytics on Hobby / Included in your plan**. Geen upgrade aangeschaft. Het echte dashboard toont vervolgens drie bezoekers en drie paginaweergaven; eigen controles kunnen daarin voorkomen en dit zijn geen bewezen organische bezoeken. Bewijs: `vercel-analytics-enabled.png` en `vercel-analytics-first-data.png`. Het publieke metingscript wordt herschreven naar `/066b2a2e591781f5/script.js` en geeft 200; de dashboardontvangst is het bewijs voor werkende verwerking. Custom events zijn volgens het dashboard niet inbegrepen en zijn niet toegevoegd.

HTTP-controles met Facebook-, Twitter- en Googlebot-user-agent geven 200 en bevatten het deelbeeld. Dit bewijst geen platformcache of echte app-preview. Details: `crawler-access.json`.

Nog apart uit te voeren: de volgende indexcrawl de nieuwe metadata laten verwerken; echte sociale app-preview controleren; bevestigde inschrijftermijnen en betaling aanvullen; lokale evenementvermeldingen plaatsen. Conceptteksten zijn voorbereid in `plans/DEELTEKSTEN_KERSTFEEST_2026.md`. Er zijn geen berichten aan derden verzonden, geen evenementenrecords gepubliceerd en geen periodieke automations ingesteld.
