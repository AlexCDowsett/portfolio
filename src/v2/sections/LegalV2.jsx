import { site } from '../data/site.js';

export function LegalV2() {
    return (
        <section className="v2-legal-page v2-shell" aria-labelledby="v2-legal-title">
            <p className="v2-eyebrow">A few practical details <span className="v2-heading-rule" /></p>
            <h1 id="v2-legal-title">Privacy &amp; terms</h1>
            <p className="v2-legal-updated">Last updated: 1 October 2026</p>
            <nav className="v2-legal-toc" aria-label="On this page">
                <a href="#privacy">Privacy</a><a href="#terms">Terms</a>
            </nav>

            <article id="privacy" className="v2-legal-section">
                <h2>Privacy</h2>
                <p>This portfolio belongs to Alex Dowsett. If you use the contact form, the details you enter (your name, email address and message) are sent through EmailJS so I can receive and reply to your enquiry. You can also email me directly at <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
                <p>Please only include information you are comfortable sharing in an email. I use it to respond to you and keep the conversation moving. I do not sell contact details. Email delivery and retention are also subject to the providers involved in sending and receiving that message.</p>
                <p>The site uses Vercel Analytics and Speed Insights to understand visits and page performance. Those services process technical usage information to provide aggregate site metrics under Vercel’s policies. This portfolio has no account sign-in or advertising profile.</p>
                <p>For a question about information you have sent me, write to <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
            </article>

            <article id="terms" className="v2-legal-section">
                <h2>Terms</h2>
                <p>This site is a personal portfolio. Project descriptions are provided for general information; some projects are experiments, coursework or research tools and are not offered as supported products.</p>
                <p>Unless a project says otherwise, the writing, design and original artwork on this site belong to Alex Dowsett. Project names, tools and third-party materials belong to their respective owners. You may link to this site and its public repositories; please ask before reusing original portfolio content or artwork.</p>
                <p>External links lead to services and repositories operated by other people. Their availability, content and terms are outside my control. The site and its project descriptions are provided as-is and may change over time.</p>
                <p>Questions about these terms? <a href={`mailto:${site.email}`}>Get in touch</a>.</p>
            </article>
        </section>
    );
}
