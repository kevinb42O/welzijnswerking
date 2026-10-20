# Motion polish — verificatie 20 oktober 2026

De productiebouw is geslaagd zonder fouten, waarschuwingen of hints. Alle 11 bestaande inhouds- en SEO-tests slagen.

## Timing en gedrag

Chromium en WebKit: per foto niet starten bij 2 zichtbare pixels of een top onder de 82%-startlijn; wel starten zodra voldoende beeld zichtbaar is; kaderpositie en hoogte blijven gelijk; na afloop geen transform, opacity of will-change vasthouden; geen herhaling bij terugscrollen. Getest op 320, 390, 768 en 1440 px. Een trage foto start niet meer nadat de bezoeker haar voorbijgescrold is.

De normale scrollopname op 390 en 1440 px bevat tien gestarte foto-overgangen per schermformaat. Elke start is gecontroleerd op de werkelijke kaderpositie en minimaal 30% zichtbaarheid. De desktoprun vertraagt bovendien de motionmodule met 2100 ms: de hero blijft werken.

Chromium en WebKit: de viewer behoudt zijn foto tijdens een trage wissel, houdt de beeldruimte gelijk, bewaart het laatst goede beeld bij een laadfout en herstelt bij verder bladeren. Focusherstel, live reduced motion en rotatie slagen.

Bestaande navigatiecontrole in beide browsers: menu, focus, Escape, sluiten, backdrop, scrollherstel, ankers, exclusieve FAQ, geen JavaScript, 200% tekst en axe slagen. De gerichte motionregressies voor normale en verminderde beweging slagen eveneens.

## Visuele controle

Hero-tussenstand en eindstand op mobiel en desktop bekeken, evenals het vaste fotokader tijdens de overgang. Geen snijdend masker, titelrotatie of bewegend bijschrift. De geopende lokale preview is vernieuwd en visueel gecontroleerd. De laatste CSS-opruiming verwijdert alleen vervangen menu- en FAQ-keyframes; de finale productiebuild slaagt.

Opnames: `polished-scroll-390.webm` en `polished-scroll-1440.webm`. Details staan in `verification.json`. Oudere opnames in `qa/motion-2026-10-20/` zijn geen referentie voor deze versie.

Dit betreft lokale browsers en viewportemulatie; geen claim over alle fysieke telefoons, veldprestaties of volledige WCAG-conformiteit.
