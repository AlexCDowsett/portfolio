import { site } from '../data/site.js';

export function Footer() {
    return (
        <footer className="v2-footer v2-shell">
            <a className="v2-brand" href="/v2#home"><span className="v2-brand-mark">A.</span><span>{site.name}</span></a>
            <p>Thoughtfully made near London. © {new Date().getFullYear()} {site.name}.</p>
            <div className="v2-social-links">
                <a href="/v2/legal#privacy">Privacy<span aria-hidden="true">↗</span></a>
                <a href="/v2/legal#terms">Terms<span aria-hidden="true">↗</span></a>
                {site.links.map((link) => <a href={link.href} key={link.label} target="_blank" rel="noreferrer">{link.label}<span aria-hidden="true">↗</span></a>)}
            </div>
        </footer>
    );
}
