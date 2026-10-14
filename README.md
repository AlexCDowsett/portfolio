# Alex Dowsett — Portfolio

A responsive React and Vite portfolio focused on software development, automation, stakeholder collaboration and technical problem-solving.

## Pages

- `/` — current portfolio (v3): experience, skills, earlier academic projects and contact form.
- `/work/voc-analysis`, `/work/vivant`, `/work/booking-system` — dated university and school case studies.
- `/legal` — privacy and terms.
- `/legacy` — the original portfolio, with its legal page at `/legacy/legal`.
- Previous `/v3` page URLs redirect to the corresponding current page, preserving queries and anchors. V2 has been removed.

The current site keeps the typed brand and browser title, a real 3D globe with a cloud layer that rotates more slowly in the globe’s direction, reduced-motion support, and the existing EmailJS contact integration. Source and assets remain under `src/v3` and `public/v3`.

## Development

```bash
npm install
npm run dev
npm run build
npm run preview
```

The existing `vercel.json` SPA rewrite supports direct navigation to case studies and legal pages.

## Contact configuration

Keep these existing settings in a local `.env` file or your deployment environment:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_CONTACT_EMAIL=alex@dowsett.dev
VITE_CONTACT_NAME=Alex
VITE_PORTFOLIO_TITLE=Alex's Portfolio
```

Without delivery configuration, the form shows a direct email fallback. Failed sends preserve the message for retry. Validation, delivery states and duplicate-submit prevention have been tested with a mocked transport; no real test email was sent.

See [design notes](src/v3/README.md) and [verification notes](src/v3/QA.md).
