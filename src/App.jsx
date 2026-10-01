import React, { lazy, Suspense, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { ScrollProvider } from './context/ScrollContext.jsx';

// Keep each version's page code in its own chunk. Visiting /v2 does not load the
// legacy 3D scene and its dependencies.
const Navbar = lazy(() => import('./sections/Navbar.jsx'));
const Hero = lazy(() => import('./sections/Hero.jsx'));
const About = lazy(() => import('./sections/About.jsx'));
const Projects = lazy(() => import('./sections/Projects.jsx'));
const Contact = lazy(() => import('./sections/Contact.jsx'));
const Footer = lazy(() => import('./sections/Footer.jsx'));
const Legal = lazy(() => import('./pages/Legal.jsx'));
const NotFound = lazy(() => import('./pages/404.jsx'));
const PortfolioV2 = lazy(() => import('./v2/PortfolioV2.jsx'));

const App = () => {
    const aboutRef = useRef(null);
    const experienceRef = useRef(null);
    const projectsRef = useRef(null);
    const contactRef = useRef(null);

    return (
        <Router>
            <ScrollProvider>
                <Suspense fallback={<div className="min-h-screen bg-black-100" aria-live="polite" />}>
                <Routes>
                    <Route path="/v2/*" element={<PortfolioV2 />} />
                    <Route path="/" element={
                        <main className="max-w-8xl mx-auto">
                            <Navbar />
                            <Hero />
                            <About ref={aboutRef} />
                            <Projects ref={projectsRef} />
                            {/* <Experience ref={experienceRef} /> */}
                            <Contact ref={contactRef}/>
                            <Footer />
                        </main>
                    } />
                    <Route path="/legal" element={<Legal />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                </Suspense>
            </ScrollProvider>
            <Analytics />
            <SpeedInsights />
        </Router>
    );
}

export default App;
