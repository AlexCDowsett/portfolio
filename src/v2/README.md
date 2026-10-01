# Portfolio v2

The second portfolio is an independent page at `/v2`. The existing site remains available at `/`.

## Structure

- `PortfolioV2.jsx` — page composition and version-specific styles.
- `data/site.js` — identity, navigation, links, and capability content.
- `sections/` — page sections, each exported as a named component.
- `components/ProjectCard.jsx` — reusable project card.
- `portfolio-v2.css` — responsive styles scoped to `.portfolio-v2`.

The project grid reads from `src/constants/index.js` so project details and links stay aligned with the original portfolio. The contact form uses the existing `VITE_EMAILJS_*` environment values and keeps a direct email link available as a fallback.
