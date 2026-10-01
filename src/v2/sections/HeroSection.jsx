import { site } from '../data/site.js';

export function HeroSection() {
    return (
        <section className="v2-hero v2-shell" id="home" aria-labelledby="v2-hero-title">
            <div className="v2-hero-copy">
                <p className="v2-eyebrow"><span className="v2-status-dot" /> {site.role} · near London</p>
                <h1 id="v2-hero-title">Software for<br /><span>everyday problems.</span></h1>
                <p className="v2-hero-intro">
                    I’m Alex. I like figuring out how things work, then making software that helps —
                    from a clearer way to explore sensor data to a doorbell built around a Raspberry Pi.
                </p>
                <div className="v2-hero-actions">
                    <a className="v2-button v2-button-primary" href="#work">Explore my work <span aria-hidden="true">↓</span></a>
                    <a className="v2-text-link" href={`mailto:${site.email}`}>Let’s talk <span aria-hidden="true">↗</span></a>
                </div>
                <p className="v2-hero-footnote">Currently open to new opportunities</p>
            </div>

            <div className="v2-hero-art" aria-label="A short note about listening, prototyping, and testing with real data" role="img">
                <div className="v2-orbit v2-orbit-one" />
                <div className="v2-orbit v2-orbit-two" />
                <div className="v2-art-glow" />
                <div className="v2-code-card">
                    <div className="v2-window-bar"><span /><span /><span /><small>field-notes.ts</small></div>
                    <pre><code>{[
                        ['01', <><span className="v2-code-purple">const</span> fieldNotes = [</>],
                        ['02', <>&nbsp;&nbsp;<span className="v2-code-green">'listen first'</span>,</>],
                        ['03', <>&nbsp;&nbsp;<span className="v2-code-green">'make a small version'</span>,</>],
                        ['04', <>&nbsp;&nbsp;<span className="v2-code-green">'try it with real data'</span>,</>],
                        ['05', <>&nbsp;&nbsp;<span className="v2-code-green">'leave it clearer'</span>,</>],
                        ['06', <>];</>],
                        ['07', <>&nbsp;</>],
                        ['08', <><span className="v2-code-blue">build</span>(fieldNotes);</>],
                    ].map(([line, content]) => <span className="v2-code-line" key={line}><span className="v2-code-muted">{line}</span> {content}</span>)}</code></pre>
                    <div className="v2-code-caption"><span className="v2-status-dot" /> Notes from the workbench</div>
                </div>
                <div className="v2-art-label v2-art-label-top">DESIGN WITH INTENT</div>
                <div className="v2-art-label v2-art-label-bottom">BUILT TO BE USEFUL</div>
            </div>
            <a className="v2-scroll-cue" href="#about"><span /> Scroll to explore</a>
        </section>
    );
}
