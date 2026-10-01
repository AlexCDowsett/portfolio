import { AboutSection } from './sections/AboutSection.jsx';
import { ContactSection } from './sections/ContactSection.jsx';
import { Footer } from './sections/Footer.jsx';
import { HeroSection } from './sections/HeroSection.jsx';
import { Navigation } from './sections/Navigation.jsx';
import { ProjectsSection } from './sections/ProjectsSection.jsx';
import './portfolio-v2.css';

/** Independent second version of the portfolio, served at /v2. */
export default function PortfolioV2() {
    return (
        <div className="portfolio-v2">
            <Navigation />
            <main>
                <HeroSection />
                <AboutSection />
                <ProjectsSection />
                <ContactSection />
            </main>
            <Footer />
        </div>
    );
}
