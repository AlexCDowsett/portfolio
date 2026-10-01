import { site } from '../data/site.js';

export function HeroSection() {
    return (
        <section className="v2-hero v2-shell" id="home" aria-labelledby="v2-hero-title">
            <div className="v2-hero-copy">
                <p className="v2-eyebrow"><span className="v2-status-dot" /> {site.role} · London, UK</p>
                <h1 id="v2-hero-title">Making ideas<br /><span>work beautifully.</span></h1>
                <p className="v2-hero-intro">
                    I’m Alex, a developer who enjoys turning complex problems into useful,
                    considered software — from interactive websites to data tools and systems projects.
                </p>
                <div className="v2-hero-actions">
                    <a className="v2-button v2-button-primary" href="#work">Explore my work <span aria-hidden="true">↓</span></a>
                    <a className="v2-text-link" href={`mailto:${site.email}`}>Let’s talk <span aria-hidden="true">↗</span></a>
                </div>
                <p className="v2-hero-footnote">Currently open to new opportunities</p>
            </div>

            <div className="v2-hero-art" aria-label="Abstract illustration of a software workspace" role="img">
                <div className="v2-orbit v2-orbit-one" />
                <div className="v2-orbit v2-orbit-two" />
                <div className="v2-art-glow" />
                <div className="v2-code-card">
                    <div className="v2-window-bar"><span /><span /><span /><small>thoughts.ts</small></div>
                    <pre><code><span className="v2-code-muted">01</span> <span className="v2-code-purple">const</span> idea = <span className="v2-code-green">"make it useful"</span>;
<span className="v2-code-muted">02</span>
<span className="v2-code-muted">03</span> <span className="v2-code-purple">function</span> <span className="v2-code-blue">build</span>(idea) {'{'}
<span className="v2-code-muted">04</span>   <span className="v2-code-purple">return</span> idea
<span className="v2-code-muted">05</span>     .thinkDeeply()
<span className="v2-code-muted">06</span>     .makeSimple();
<span className="v2-code-muted">07</span> {'}'}</code></pre>
                    <div className="v2-code-caption"><span className="v2-status-dot" /> Curiosity → craft</div>
                </div>
                <div className="v2-art-label v2-art-label-top">DESIGN WITH INTENT</div>
                <div className="v2-art-label v2-art-label-bottom">BUILT TO BE USEFUL</div>
            </div>
            <a className="v2-scroll-cue" href="#about"><span /> Scroll to explore</a>
        </section>
    );
}
