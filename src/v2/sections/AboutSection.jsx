import { capabilities, site } from '../data/site.js';

export function AboutSection() {
    return (
        <section className="v2-section v2-shell" id="about" aria-labelledby="v2-about-title">
            <div className="v2-section-heading">
                <p className="v2-eyebrow">A little about me <span className="v2-heading-rule" /></p>
                <h2 id="v2-about-title">Curious by nature.<br /><span>Practical by design.</span></h2>
            </div>
            <div className="v2-about-layout">
                <div className="v2-about-copy">
                    <p className="v2-large-copy">
                        I like making software that feels clear, thoughtful, and genuinely helpful.
                    </p>
                    <p>
                        My work ranges from expressive web interfaces to Python applications for
                        researchers and lower-level projects in C and VHDL. I enjoy understanding
                        the whole problem, then shaping a solution that is easy to use and maintain.
                    </p>
                    <a className="v2-text-link" href={`mailto:${site.email}`}>More about working together <span aria-hidden="true">↗</span></a>
                </div>
                <div className="v2-capabilities" aria-label="Areas of work">
                    {capabilities.map((item) => (
                        <article className="v2-capability" key={item.number}>
                            <span className="v2-capability-number">{item.number}</span>
                            <div><h3>{item.title}</h3><p>{item.detail}</p></div>
                            <span className="v2-capability-arrow" aria-hidden="true">↗</span>
                        </article>
                    ))}
                    <p className="v2-location"><span className="v2-location-icon" aria-hidden="true">⌖</span> {site.location} <span>· Open to remote work</span></p>
                </div>
            </div>
        </section>
    );
}
