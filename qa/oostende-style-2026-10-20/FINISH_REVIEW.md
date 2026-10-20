disposition: fix

Inputs/limits: code-led reference-style restyling; BRIEF.md and the approved plan supply direction and quality bar. No standalone five-block direction contract, quality-bar card or critique comp was supplied. No browser used; behavior, contrast and test execution are assessed from supplied reports, not independently rerun. DESIGN.md/PRODUCT.md/design.json synchronization is the authorized next step and is not a UI blocker.

## persistence

Pass for this review stage. PRODUCT.md exists; BRIEF.md records the approved Oostende direction and local delivery scope. No comp-led gate is applicable to this precisely specified reference-style request. All required screenshots exist and show the named viewport/section/state; full-390.png and full-1440.png start at the header and include the footer. The full-page captures were checked for continuity, and practical information, archive, story, history, partners and footer were inspected at readable scale using section captures and in-memory crops of the original full-page images. No screenshot validity failure was found.

Assessed evidence: viewport-{320,390,768,1001,1440}.png; full-{390,1440}.png; praktisch-{390,1440}.png; partners-390.png; site-footer-{390,1440}.png; menu-390.png; faq-open-390.png; centres-open-390.png; viewer-390.png; verification.json; capture-metadata.json; detector.json; contrast/hero-contrast.json; the supplied primary styles/components and PRODUCT.md. The supplied verification reports no overflow, broken visible images, invalid anchors, axe findings, browser errors or failed local requests, and records keyboard, no-JS, reduced-motion and 200% text checks. Build and content/SEO test success are parent-reported. Those reports do not constitute a comprehensive accessibility audit.

## fidelity

| Element | Assessment | Evidence |
| --- | --- | --- |
| TYPE | match | Locally hosted Cooper Hewitt Book/Medium/Semibold in tokens.css; screenshots show a consistent civic sans-serif voice across navigation, invitations, practical data, archive and footer. |
| MATERIAL | match | Warm photographic hero, real historical photography and neutral dark viewer remain visible; no fabricated physical material or replacement illustration. |
| GROUND | match | White field, #f7f7f7 support surfaces, navy #273a7c identity/actions, #187ac9 major headings and darker small-link blue are declared centrally and visible throughout the captures. |
| Full-page hierarchy | match | Existing invitation → audience/FAQ → practical/registration → centres → archive → story/history → partners → compact footer sequence remains legible. |
| Responsive composition | adaptation | At 320/390 the information and registration assistance stack; at desktop they split into readable columns. This follows the approved plan's responsive/readability requirement. No clipping is visible in the supplied states. |
| Hero emphasis | adaptation | White lettering over a navy-shaded warm photograph preserves the approved invitation treatment. The supplied measured glyph contrast remains above 6:1 at its lowest recorded sample. |
| Controls and interactive states | match | Navy registration actions, line dividers, visible open/closed indicators, focused close controls and dark viewer controls share the same palette; behavioral evidence records preserved interactions. |
| City logo / brush motif | adaptation | Omitted as explicitly permitted in BRIEF.md; own organization identity remains the sender. |
| Small labels above hero/menu headings | contradicted against craft floor | EventHero.astro:17 and SiteHeader.astro:12 render eyebrow lines above their headings. The floor explicitly bans this device. |

## ceiling

The supplied reference-style quality bar is reached in typography, palette, photography, restraint and full-page continuity, subject to the floor finding below. Additional brush decoration, a city logo, invented material or ornamental motion would not advance this confirmed direction. The first viewport makes the occasion, audience and route to registration apparent. No composition or wholesale material failure warrants rebuilding.

## material_fixes

1. F1 — Remove the eyebrow arrangement in src/components/EventHero.astro:17 (`.hero-label`, “Kerstfeest 2026 · Kursaal Oostende”) and src/components/SiteHeader.astro:12 (`.mobile-nav-label`, “Kerstavond in Oostende · 2026”). Preserve the factual event/year/location content by integrating it below the main invitation or into the facts treatment, and place any retained menu context below its heading. This is the craft-floor ban on kickers/eyebrows; do not revert the pre-existing hero copy or navigation edits. Recapture the same required files after the single fix batch for a verdict pass.

## keep

Keep the white and blue Oostende system, local Cooper Hewitt, warm photography, direct registration path, readable practical information, full historical attribution, compact footer and existing keyboard/no-JS behaviors intact while resolving F1.
