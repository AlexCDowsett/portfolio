import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from './Icon.jsx';

function CatPhoto() {
    const [request] = useState(() => `${Date.now()}-${Math.random().toString(36).slice(2)}`);
    const [loaded, setLoaded] = useState(false);
    const [failed, setFailed] = useState(false);
    return <figure className="v3-404-cat">
        <div className="v3-cat-image">
            <svg className="v3-cat-placeholder" viewBox="0 0 240 240" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label="A cat curled up for a nap" aria-hidden={!failed}>
                <path d="M71 143c-8-12-12-27-8-41l-5-29 28 12c15-6 33-5 47 3l25-10-4 28c11 12 18 27 18 43 0 26-22 44-53 44H86c-27 0-44-13-44-32 0-18 12-29 28-29 19 0 32 12 32 26 0 12-9 19-19 19" />
                <path d="M76 115c4 5 9 5 14 0m26 0c4 5 9 5 14 0m-31 12 4 4 4-4m-4 4v6m-32-8-16-3m17 10-17 3m77-10 16-3m-17 10 17 3" />
            </svg>
            {!failed && <img className={loaded ? 'is-loaded' : ''} src={`https://cataas.com/cat/cute?width=640&height=640&fit=cover&request=${request}`} alt="A random cute cat" width="640" height="640" referrerPolicy="no-referrer" onLoad={() => setLoaded(true)} onError={() => setFailed(true)} />}
        </div>
        <figcaption>Navigation assistant. Currently on a break.</figcaption>
    </figure>;
}

export function NotFound() {
    const { pathname } = useLocation();
    return <section className="v3-not-found v3-shell">
        <div className="v3-not-found-copy"><p className="v3-kicker">404 / PAGE NOT FOUND</p><h1>A small detour.</h1><p>This page has taken a catnap. Let’s get you back to the work.</p><Link className="v3-button v3-button-ink" to="/#work">Back to the work <Icon /></Link></div>
        <CatPhoto key={pathname} />
    </section>;
}
