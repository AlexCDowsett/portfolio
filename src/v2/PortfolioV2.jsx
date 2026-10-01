import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AboutSection } from './sections/AboutSection.jsx';
import { ContactSection } from './sections/ContactSection.jsx';
import { Footer } from './sections/Footer.jsx';
import { HeroSection } from './sections/HeroSection.jsx';
import { Navigation } from './sections/Navigation.jsx';
import { ProjectsSection } from './sections/ProjectsSection.jsx';
import { LegalV2 } from './sections/LegalV2.jsx';
import './portfolio-v2.css';

/** Independent second version of the portfolio, served at /v2. */
export default function PortfolioV2() {
    const { pathname } = useLocation();
    const isLegalPage = pathname.endsWith('/legal');

    useEffect(() => {
        document.title = isLegalPage ? 'Privacy & terms | Alex Dowsett' : 'Alex Dowsett | Software developer';
    }, [isLegalPage]);

    return (
        <div className="portfolio-v2">
            <Navigation />
            <main>
                {isLegalPage ? (
                    <LegalV2 />
                ) : (
                    <>
                        <HeroSection />
                        <AboutSection />
                        <ProjectsSection />
                        <ContactSection />
                    </>
                )}
            </main>
            <Footer />
        </div>
    );
}
