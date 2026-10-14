import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Link, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { Contact } from './Contact.jsx';
import { furtherProjects, identity, projects } from './data.js';
import { useTypewriter } from './useTypewriter.js';
import './portfolio-v3.css';

const Globe = lazy(() => import('./Globe.jsx'));
const PortfolioScreens = lazy(() => import('./PortfolioScreens.jsx'));
const navItems = [['Experience', 'experience'], ['Skills & about', 'about'], ['Earlier projects', 'work'], ['Contact', 'contact']];
const Arrow = () => <span aria-hidden="true">↗</span>;

function Navigation({ text, typing }) {
    const [open, setOpen] = useState(false);
    const { pathname, hash } = useLocation();
    const toggle = useRef();
    useEffect(() => setOpen(false), [pathname, hash]);
    useEffect(() => {
        if (!open) return undefined;
        const close = event => {
            if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); }
        };
        window.addEventListener('keydown', close);
        return () => window.removeEventListener('keydown', close);
    }, [open]);
    return <header className="v3-header">
        <div className="v3-shell v3-header-inner">
            <Link className="v3-brand" to="/#home" aria-label="Alex Dowsett, home"><span className="v3-monogram" aria-hidden="true">ad<span>.</span></span><span className={`v3-typed ${typing ? 'is-typing' : ''}`} aria-hidden="true">{text || '\u00a0'}</span></Link>
            <button className="v3-menu-toggle" ref={toggle} type="button" aria-expanded={open} aria-controls="v3-nav" onClick={() => setOpen(value => !value)}>{open ? 'Close' : 'Menu'} <span aria-hidden="true">{open ? '−' : '+'}</span></button>
            <nav className={`v3-nav ${open ? 'is-open' : ''}`} id="v3-nav" aria-label="Main navigation">
                {navItems.map(([label, id]) => <Link key={id} to={`/#${id}`} onClick={() => setOpen(false)}>{label}</Link>)}
                <a className="v3-nav-cv" href={identity.cv} target="_blank" rel="noreferrer">View CV <Arrow /></a>
            </nav>
        </div>
    </header>;
}

function Hero() {
    return <section className="v3-hero" id="home" aria-labelledby="v3-hero-title">
        <div className="v3-shell v3-hero-inner">
            <div className="v3-hero-copy">
                <p className="v3-kicker"><span className="v3-dot" /> ALEX DOWSETT <span className="v3-kicker-divider">/</span> SOFTWARE, AUTOMATION & SYSTEMS</p>
                <h1 id="v3-hero-title">Complex problems.<br />Clear thinking.<br /><em>Working software.</em></h1>
                <p className="v3-hero-description">I build software around real needs. Working with stakeholders, I turn complex requirements into practical technical solutions — from Python automation to customer-facing systems.</p>
                <div className="v3-hero-actions"><Link className="v3-button v3-button-gold" to="/#experience">Experience & skills <span aria-hidden="true">↓</span></Link><a className="v3-quiet-link" href={identity.cv} target="_blank" rel="noreferrer">View my CV <Arrow /></a></div>
                <p className="v3-hero-current"><span /> Currently Project Engineer at <strong>Content Guru</strong></p>
                <p className="v3-hero-location">London, UK</p>
            </div>
            <Suspense fallback={<div className="v3-globe" aria-hidden="true"><div className="v3-globe-fallback" /></div>}><Globe /></Suspense>
            <div className="v3-hero-bottom"><span>SOFTWARE · AUTOMATION · TECHNICAL DELIVERY</span><Link to="/#experience">A little further down <span aria-hidden="true">↓</span></Link></div>
        </div>
        <div className="v3-proof-strip"><div className="v3-shell"><p><strong>Python & SQL</strong><span>Core engineering toolkit</span></p><p><strong>Stakeholder collaboration</strong><span>Real needs → technical solutions</span></p><p><strong>BEng · 2:1</strong><span>University of Surrey</span></p></div></div>
    </section>;
}

function Experience() {
    return <section className="v3-experience v3-shell v3-section" id="experience" aria-labelledby="v3-experience-title">
        <div className="v3-section-heading"><p className="v3-kicker">01 / IN PRACTICE</p><div><h2 id="v3-experience-title">From requirements<br />to working solutions.</h2><p>I work with technical and non-technical stakeholders to understand their needs, design a solution and carry it through to delivery.</p></div></div>
        <div className="v3-job">
            <div className="v3-job-meta"><p className="v3-job-company">Content Guru <span className="v3-current-badge">CURRENT</span></p><h3>Project Engineer</h3><p className="v3-mono">SEP 2025 — PRESENT</p></div>
            <div className="v3-job-details"><p className="v3-job-lead">Turning complex customer requirements into delivered technical solutions.</p><div className="v3-delivery-grid">
                <div><span className="v3-detail-symbol" aria-hidden="true">↳</span><h4>Automate the repetitive</h4><p>Python, APIs and databases to streamline provisioning workflows and reduce manual operational work.</p></div>
                <div><span className="v3-detail-symbol" aria-hidden="true">⊞</span><h4>Own the technical model</h4><p>Technical ownership of role-based access control across a multi-organisation enterprise environment.</p></div>
                <div><span className="v3-detail-symbol" aria-hidden="true">⇄</span><h4>Design dynamic solutions</h4><p>Turn stakeholder requirements into dynamic webchat and email solutions that serve a large customer base and are now the company’s main solutions for both channels.</p></div>
                <div><span className="v3-detail-symbol" aria-hidden="true">✓</span><h4>Integrate & deliver</h4><p>Coordinate integration, testing and production delivery with engineering teams.</p></div>
            </div></div>
        </div>
        <div className="v3-job v3-job-secondary"><div className="v3-job-meta"><p className="v3-job-company">Prolific</p><h3>AI Model Evaluator</h3><p className="v3-mono">OCT 2024 — AUG 2025</p></div><div className="v3-job-details"><p>Completed <strong>300+ research and AI evaluation studies</strong>, assessing generated code and images against structured criteria. Built experience in human-in-the-loop evaluation, quality assessment and giving precise, actionable feedback.</p></div></div>
    </section>;
}

function SelectedWork() {
    return <section className="v3-work v3-section" id="work" aria-labelledby="v3-work-title"><div className="v3-shell">
        <div className="v3-work-heading"><div><p className="v3-kicker">03 / EARLIER PROJECTS</p><h2 id="v3-work-title">A few earlier builds.</h2></div><p>University, school and personal projects that laid the foundations<br />for the software and systems work I do today.</p></div>
        <div className="v3-projects">{projects.map(project => <article className={`v3-project v3-project-${project.slug}`} key={project.slug}>
            <Link className="v3-project-art" to={project.href || `/work/${project.slug}`} aria-label={project.href ? `View the ${project.name}` : `Read the ${project.name} case study`}><div className="v3-art-topline"><span>{project.name}</span><span aria-hidden="true">● ● ●</span></div><div className="v3-project-image">{project.preview === 'screens' ? <Suspense fallback={<div className="v3-screens-preview" />}><PortfolioScreens /></Suspense> : <img src={project.image} alt={project.imageAlt} loading="lazy" width={1400} height={900} />}</div><div className="v3-art-caption"><span>PROJECT DEMO / {project.number}</span><span className="v3-art-arrow" aria-hidden="true">↗</span></div></Link>
            <div className="v3-project-copy"><p className="v3-kicker">{project.origin}{project.date && <span className="v3-project-date">{project.date}</span>}</p><h3><Link to={project.href || `/work/${project.slug}`}>{project.name}</Link></h3><p>{project.summary}</p><ul className="v3-tags" aria-label="Technologies">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul><Link className="v3-inline-link" to={project.href || `/work/${project.slug}`}>View project <Arrow /></Link>{project.companion && <p className="v3-companion">Includes {project.companion.name} · {project.companion.date}</p>}</div>
        </article>)}</div>
        <div className="v3-more-heading"><h3>More earlier work</h3><a className="v3-inline-link" href={identity.github} target="_blank" rel="noreferrer">All repositories <Arrow /></a></div>
        <div className="v3-further-projects">{furtherProjects.map(project => <a href={project.href} key={project.name} target="_blank" rel="noreferrer"><span><strong>{project.name}{project.date && <span className="v3-row-year">{project.date}</span>}</strong><small>{project.detail}</small></span><span className="v3-mono">{project.tech}</span><Arrow /></a>)}</div>
    </div></section>;
}

function About() {
    return <section className="v3-about v3-section v3-shell" id="about" aria-labelledby="v3-about-title">
        <div className="v3-about-copy"><p className="v3-kicker">02 / SKILLS & BACKGROUND</p><h2 id="v3-about-title">Curious by nature.<br /><em>Practical by approach.</em></h2><p>I’m Alex, an engineer based near London. My background in electronic engineering gave me a way of thinking across systems; building software gave me a way to put it into practice.</p><p>I’m happiest untangling an ambiguous problem, making a repetitive process simpler, or helping someone understand what a technical solution can do for them.</p><p>I’m interested in software engineering, automation and AI — especially roles where thoughtful engineering and clear communication both matter.</p><a className="v3-inline-link" href={identity.linkedin} target="_blank" rel="noreferrer">More about my background <Arrow /></a></div>
        <div className="v3-about-toolkit"><div className="v3-education"><span className="v3-education-mark" aria-hidden="true">↗</span><p className="v3-kicker">UNIVERSITY OF SURREY · 2020–2024</p><h3>BEng Electronic Engineering<br />with Computer Systems</h3><p>2:1 Second Class Honours</p></div><h3 className="v3-toolkit-title">Skills I bring to the problem</h3><dl className="v3-toolkit"><div><dt>Core languages</dt><dd>Python, SQL, JavaScript, C, C++</dd></div><div><dt>Web & data</dt><dd>React, REST APIs, databases, data processing, machine learning</dd></div><div><dt>Cloud & systems</dt><dd>AWS, Linux, Docker, Raspberry Pi</dd></div><div><dt>People & delivery</dt><dd>Stakeholder communication, requirements analysis, solution design, integration, testing</dd></div></dl></div>
    </section>;
}

function Home() { return <><Hero /><Experience /><About /><SelectedWork /><Contact /></>; }

function CaseStudy() {
    const { slug } = useParams();
    const project = projects.find(item => item.slug === slug);
    if (!project) return <NotFound />;
    if (project.href) return <Navigate to={project.href} replace />;
    const next = projects[(projects.indexOf(project) + 1) % projects.length];
    return <>
        <section className="v3-case-hero v3-shell"><Link className="v3-back-link" to="/#work">← All earlier projects</Link><p className="v3-kicker">{project.origin}{project.date && <span className="v3-project-date">{project.date}</span>}</p><h1>{project.name}<span>{project.title}</span></h1><p className="v3-case-intro">{project.summary}</p><div className="v3-case-meta"><div><span>MY ROLE</span><p>{project.role}</p></div><div><span>BUILT WITH</span><p>{project.tags.join(' · ')}</p></div><a className="v3-button v3-button-ink" href={project.repo} target="_blank" rel="noreferrer">View repository <Arrow /></a></div></section>
        <div className={`v3-case-demo v3-case-${project.slug}`}><div className="v3-shell"><video key={project.slug} controls playsInline preload="none" poster={project.image} aria-label={`${project.name} project demonstration`}><source src={project.video} type="video/mp4" />Your browser doesn’t support this video. <a href={project.video}>Open the project demo</a>.</video><p>Original project demonstration · Use the player controls to explore.</p></div></div>
        <section className="v3-case-body v3-shell"><div className="v3-case-row"><h2>The problem</h2><p>{project.context}</p></div><div className="v3-case-row"><h2>My contribution</h2><div className="v3-contributions">{project.contribution.map(([title, detail], i) => <div key={title}><span className="v3-mono">0{i + 1}</span><div><h3>{title}</h3><p>{detail}</p></div></div>)}</div></div><div className="v3-case-row"><h2>The outcome</h2><div><p>{project.result}</p><blockquote>{project.reflection}</blockquote>{project.companion && <a className="v3-inline-link v3-companion-link" href={project.companion.repo} target="_blank" rel="noreferrer">{project.companion.name} · {project.companion.date} <Arrow /></a>}</div></div><div className="v3-case-next"><span className="v3-kicker">NEXT PROJECT</span><Link to={next.href || `/work/${next.slug}`}>{next.name} <Arrow /></Link></div></section>
        <Contact />
    </>;
}

function Legal() {
    return <section className="v3-legal v3-shell"><Link className="v3-back-link" to="/#home">← Back to the portfolio</Link><p className="v3-kicker">THE PRACTICAL DETAILS</p><h1>Privacy & terms</h1><nav aria-label="On this page"><Link to="/legal#privacy">Privacy</Link><Link to="/legal#terms">Terms</Link></nav><article id="privacy"><h2>Privacy</h2><p>This portfolio belongs to Alex Dowsett. When you use the contact form, your name, email address and message are used to deliver your enquiry to my inbox so I can respond. You can also contact me directly at <a href={`mailto:${identity.email}`}>{identity.email}</a>.</p><p>I use the information you share to reply to your enquiry. I do not sell contact details. Email delivery and retention also depend on the providers sending and receiving the message. Please only include information you are comfortable sharing by email.</p><p>This site uses Vercel Analytics and Speed Insights for aggregate visit and performance information. For more about their data handling, see <a href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noreferrer">Vercel’s analytics privacy information</a>. This portfolio has no account sign-in or advertising profile.</p><p>For questions about information you have sent, or to request its deletion, please email me.</p></article><article id="terms"><h2>Terms</h2><p>This is a personal portfolio. Project descriptions are for general information. Some projects are coursework, research tools or prototypes, and are not offered as supported products.</p><p>Original writing and design belong to Alex Dowsett. Third-party materials belong to their respective owners. Public repositories have their own licensing terms. You are welcome to link to this site; please ask before reusing original content.</p><p>External sites and repositories are operated separately. Their content and availability are outside my control. This site and its project descriptions are provided as-is and may change.</p><p>Questions? <a href={`mailto:${identity.email}`}>Get in touch</a>.</p></article></section>;
}

function NotFound() { return <section className="v3-not-found v3-shell"><p className="v3-kicker">404 / PAGE NOT FOUND</p><h1>A small detour.</h1><p>That page isn’t here. Let’s get you back to the work.</p><Link className="v3-button v3-button-ink" to="/#home">Back to the portfolio <Arrow /></Link></section>; }

function Footer() {
    return <footer className="v3-footer"><div className="v3-shell"><Link to="/#home" className="v3-footer-brand">Alex Dowsett<span>Engineering with purpose.</span></Link><p>© {new Date().getFullYear()} Alex Dowsett</p><nav aria-label="Footer navigation"><Link to="/legal#privacy">Privacy</Link><Link to="/legal#terms">Terms</Link><Link to="/#home">Back to top ↑</Link></nav></div></footer>;
}

export default function PortfolioV3() {
    const { pathname, hash, key } = useLocation();
    const { text, typing } = useTypewriter();
    const isHome = pathname === '/';
    useEffect(() => {
        const pagePath = pathname.replace(/\/+$/, '');
        const project = projects.find(item => pagePath === `/work/${item.slug}`);
        document.title = isHome ? (text || 'Alex Dowsett') : pagePath === '/legal' ? 'Privacy & terms | Alex Dowsett' : project ? `${project.name} | Alex Dowsett` : 'Page not found | Alex Dowsett';
    }, [pathname, text, isHome]);
    useEffect(() => {
        const meta = document.querySelector('meta[name="description"]') || document.createElement('meta');
        const original = meta.getAttribute('content');
        const created = !meta.parentNode;
        meta.setAttribute('name', 'description');
        meta.setAttribute('content', 'Alex Dowsett — Software, automation and technical problem-solving. Python, SQL, systems integration and customer-facing delivery. Based near London. Explore engineering projects and get in touch.');
        if (created) document.head.appendChild(meta);
        return () => { if (created) meta.remove(); else if (original !== null) meta.setAttribute('content', original); };
    }, []);
    useEffect(() => {
        const frame = requestAnimationFrame(() => {
            if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'instant', block: 'start' });
            else window.scrollTo({ top: 0, behavior: 'instant' });
        });
        return () => cancelAnimationFrame(frame);
    }, [pathname, hash, key]);
    return <div className="portfolio-v3"><a className="v3-skip-link" href="#v3-main">Skip to content</a><Navigation text={text} typing={typing} /><main id="v3-main" tabIndex={-1}><Routes><Route index element={<Home />} /><Route path="work/:slug" element={<CaseStudy />} /><Route path="legal" element={<Legal />} /><Route path="*" element={<NotFound />} /></Routes></main><Footer /></div>;
}
