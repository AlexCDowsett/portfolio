import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from "./sections/Navbar.jsx";
import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import Projects from "./sections/Projects.jsx";
import Experience from "./sections/Experience.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";
import Legal from "./pages/Legal.jsx";
import NotFound from "./pages/404.jsx";
import { ScrollProvider } from './context/ScrollContext.jsx';

const App = () => {
    const aboutRef = useRef(null);
    const experienceRef = useRef(null);
    const projectsRef = useRef(null);
    const contactRef = useRef(null);

    return (
        <Router>
            <ScrollProvider>
                <Routes>
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
            </ScrollProvider>
            <Analytics />
            <SpeedInsights />
        </Router>
    );
}

export default App;
