# Portfolio verification — 14 October 2026

- Production build passed from a temporary local checkout using the project's unchanged package-lock.json. A temporary checkout avoided slow reads from the iCloud-backed working directory; final source and assets were compared with the working copy.
- Browser layouts checked at 1440, 1024, 768, 390 and 320 pixels. Document width equalled viewport width at every size; the main heading remained within its container. Project cards, navigation and the contact form adapted at their breakpoints.
- Browser confirmed a real WebGL globe with automatic surface/cloud rotation, loaded project images, academic labels, project dates, and the section order: introduction, experience, skills/background, earlier projects, contact.
- Browser confirmed `/v3/work/voc-analysis` redirects to `/work/voc-analysis`, `/v2` shows the current 404, and legacy legal navigation stays under `/legacy`.
- DOM integration checks passed for all current case studies, legal, missing pages, cross-page navigation, section anchors, repeated anchor clicks, mobile menu toggling, Escape and focus restoration, reduced-motion title, and unavailable-WebGL fallback.
- Contact integration checks passed for required and whitespace validation, the EmailJS payload, pending state, duplicate-submit suppression, success reset, error retention and retry, email fallback, honeypot handling and missing configuration. Transport was mocked; no real email was sent.
- CV download matches the supplied PDF byte for byte.
- Dates: VOC Analytics and its companion File Organiser 2024; Vivant 2023; first portfolio 2025; booking system 2019; UART Calculator 2024; C Radio 2022. University/school/personal context is explicit. The project sequence and dates reflect the user's follow-up instructions.
- The first portfolio uses a real 3D preview with the original screen media and lighting. Framing blends halfway between the wide overview and close view, without interactive zoom. All four cards have equal previews; desktop uses two columns. All first-portfolio links open `/legacy` directly at the top.
- The blue-screen image remains on the original lower-left monitor. Its UV coordinates are normalised on a separate geometry copy so the complete image appears without changing the legacy model or other screens.
- The legacy banner is 32 pixels on desktop and 43 pixels on mobile, with a working link to the current home page. “London, UK” appears below the current-role line; the globe has no location overlay.
- Final screenshots are in `artifacts/`.
- Safari media checks: the monitor-texture hook retains an image when autoplay is rejected, waits for an actual decoded video frame before switching, restores the image after media errors, and releases video resources on unmount. Reduced motion uses populated image textures. These cases passed with mocked browser media events; a physical iPhone was not available to the agent.
- Browser checks at 320, 390, 775, 1024 and 1440 pixels confirmed equal, non-empty image areas and no horizontal overflow. Pixel comparisons confirmed that the mobile globe moves. The pause control was subsequently removed at the user’s request. Scrolling between the hero and projects releases the offscreen canvas and restores it on return.
- All visible current-page copy, case studies, contact/response text and legal copy were proofread. Fixed the hidden mobile line break joining “foundations for”, corrected legacy spelling/grammar, and replaced arrow/symbol glyphs and the legacy waving hand with SVG icons or plain text.

Production publishing uses the existing GitHub-to-Vercel integration after verification. The build retains size warnings from Three.js and the original legacy scenes; current and legacy page code are split into separate chunks. A backup of the removed v2 source and assets was retained at `/private/tmp/alex-portfolio-v2-backup.tar.gz` before removal, including in-progress files.

- The 404 uses Cataas’s random cute-cat endpoint and retains the return-to-work link if the image service fails.
