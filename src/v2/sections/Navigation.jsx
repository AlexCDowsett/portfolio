import { useState } from 'react';
import { navigation, site } from '../data/site.js';

export function Navigation() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="v2-header">
            <a className="v2-brand" href="/v2/#home" aria-label={`${site.name}, home`}>
                <span className="v2-brand-mark">A.</span>
                <span>{site.name}</span>
            </a>
            <button
                className="v2-menu-toggle"
                type="button"
                aria-expanded={menuOpen}
                aria-controls="v2-navigation"
                onClick={() => setMenuOpen((open) => !open)}
            >
                {menuOpen ? 'Close' : 'Menu'}
            </button>
            <nav id="v2-navigation" className={`v2-nav ${menuOpen ? 'is-open' : ''}`}>
                {navigation.map((item) => (
                    <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                        {item.label}
                    </a>
                ))}
                <a className="v2-nav-cv" href={site.cv} target="_blank" rel="noreferrer">
                    View CV <span aria-hidden="true">↗</span>
                </a>
            </nav>
        </header>
    );
}
