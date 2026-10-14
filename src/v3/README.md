# Portfolio v3

The v3 redesign is the default site at `/`. The original portfolio is at `/legacy`; its legal page is at `/legacy/legal`. V2 has been removed. Old `/v3` page URLs redirect to their corresponding current pages, preserving queries and hashes.

## Plan and rationale

1. Lead with transferable skills: Python, SQL, automation, customer requirements and technical delivery. Mention the current Project Engineer role as evidence, without positioning the site toward that job title. The previous introduction is out of date; omit unqualified claims about years of professional experience.
2. Use an editorial visual direction: ink, warm paper, restrained brass accents, large typography and generous spacing. Keep the typed brand and browser title. Retain a real WebGL Earth with a cloud layer that drifts backwards relative to the rotating surface as a quieter background element with pause, reduced-motion and unavailable-WebGL fallbacks.
3. Make professional delivery visible before personal projects. Ground Content Guru and Prolific descriptions in the supplied CV, with no invented business metrics or customer names.
4. Keep current experience and transferable skills ahead of the earlier-projects section. Label VOC research and Vivant as university projects and the booking application as school coursework. Group the VOC File Organiser with the analytics project and show confirmed dates for every project. Use two equal columns on desktop, with the first personal portfolio between Vivant and the booking system. Its 3D preview copies the original screen geometry, media and lighting, with fixed framing and no zoom controls; its links go directly to `/legacy`. Other projects retain dedicated case studies. Source their images from existing demo videos.
5. Make the next step immediate: CV in the navigation and hero, recruitment-focused contact copy and the existing EmailJS contact integration, including success/error states and a direct email fallback.
6. Scope styles and assets to v3. All page links use the canonical root routes: case studies at `/work/:slug` and legal at `/legal`. Assets and the supplied CV remain namespaced under `/v3/`.
7. Verify the production build, desktop/tablet/mobile layout, internal routes and anchors, image and CV loading, typing, globe, mobile navigation, and contact validation. Exercise delivery states with a local mock rather than sending an unsolicited test email.

## Sources

- Supplied `ALEX DOWSETT.pdf` (two pages), copied unchanged to the v3 CV download.
- User-confirmed webchat/email development responsibilities and customer adoption at Content Guru.
- Existing portfolio source and live dowsett.dev, reviewed 14 October 2026.
- Existing `public/CV.pdf`, which dates the first portfolio website to 2025.
- Public repository READMEs for voc-analyser, vivant and essenuals-booking-system.
- Project posters extracted from the existing project demo MP4s.
- Earth texture: three-globe example `earth-blue-marble.jpg`, the source used by the existing globe, saved locally to remove a runtime CDN dependency.

## Development

`npm run dev` → `/`. `npm run build` creates the production output. The existing Vercel SPA rewrite supports current case-study, legal and legacy deep links.

The contact form retains the existing `VITE_EMAILJS_*`, `VITE_CONTACT_EMAIL` and `VITE_CONTACT_NAME` environment settings. Local QA must not send a real message. GitHub pushes to the existing `main` branch trigger the connected Vercel production deployment.
