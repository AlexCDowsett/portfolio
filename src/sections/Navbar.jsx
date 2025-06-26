import { navLinks } from "../constants/index.js";
import { useState, useEffect } from "react";
import ScrollProgress from "../components/ScrollProgress.jsx";
import AnimatedHamburgerButton from "../components/AnimatedHamburgerButton.jsx";
import TypingAnimation from "../components/TypingAnimation.jsx";
import { motion } from "framer-motion";
import { useScroll } from '../context/ScrollContext.jsx';
import { useMediaQuery } from 'react-responsive';

const NavItems = ({ toggleMenu }) => {
    const handleNavigation = (href) => {
        // If we're not on the main page, first navigate to the main page with the hash
        if (window.location.pathname !== '/') {
            // Extract the hash from the href (e.g., '#about' from '/#about')
            const hash = href.startsWith('#') ? href : '';
            // Store the hash in sessionStorage before navigation
            sessionStorage.setItem('scrollToHash', hash);
            window.location.href = `/${hash}`;
            return;
        }

        // If we're already on the main page, handle hash navigation
        if (href.startsWith('#')) {
            const element = document.querySelector(href);
            if (element) {
                const navbarHeight = document.querySelector("header").offsetHeight;
                const elementPosition = element.offsetTop - navbarHeight;
                
                // Update the URL hash without triggering a scroll
                history.pushState(null, null, href);
                
                // Smooth scroll to the element
                window.scrollTo({
                    top: elementPosition,
                    behavior: "smooth"
                });
            }
        } else {
            // For external links (like CV.pdf)
            window.location.href = href;
        }
        toggleMenu();
    };

    // Add effect to handle scroll after navigation
    useEffect(() => {
        const scrollToHash = sessionStorage.getItem('scrollToHash');
        if (scrollToHash) {
            // Clear the stored hash
            sessionStorage.removeItem('scrollToHash');
            
            // Wait for the page to be fully loaded
            setTimeout(() => {
                const element = document.querySelector(scrollToHash);
                if (element) {
                    const navbarHeight = document.querySelector("header").offsetHeight;
                    const elementPosition = element.offsetTop - navbarHeight;
                    window.scrollTo({
                        top: elementPosition,
                        behavior: "smooth"
                    });
                }
            }, 100); // Small delay to ensure the page is loaded
        }
    }, []);

    return (
        <ul className="nav-ul">
            {navLinks.map(({ id, href, name }) => (
                <li key={id} className="nav-li">
                    {name === "CV" ? (
                        <a
                            href={href}
                            className="nav-li_a"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <p className="stylish-font">{name}</p>
                        </a>
                    ) : (
                        <a
                            href={href}
                            className="nav-li_a"
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavigation(href);
                            }}
                            target="_self"
                        >
                            <p>{name}</p>
                        </a>
                    )}
                </li>
            ))}
        </ul>
    );
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isAboutVisible, isExperienceVisible, isProjectsVisible, isContactVisible } = useScroll();
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpacity(1);
        }, 300); // Delay for fade-in effect set to 0.3 seconds
        return () => clearTimeout(timer);
    }, []);

    const toggleMenu = () => setIsOpen((prevIsOpen) => !prevIsOpen);

    // Log the conditions whenever they change
    useEffect(() => {
        // console.log("Debugging visibility states:", {
        // ... existing code ...
    }, [isMobile, isOpen, isProjectsVisible, isAboutVisible, isExperienceVisible, isContactVisible]);

    return (
        <motion.header 
            className="fixed top-0 left-0 right-0 z-50 bg-black/90"
            animate={{
                height: isMobile && !isOpen && isProjectsVisible && !isAboutVisible && !isExperienceVisible && !isContactVisible ? "2rem" : "4rem", // Adjust height based on visibility
                opacity
            }}
            transition={{ 
                duration: 0.3,
                ease: "easeInOut"
            }}
            style={{ opacity }}
        >
            <ScrollProgress isSticky={true} isMobile={isMobile} />
            <div className="max-w-7xl mx-auto">
                <motion.div 
                    className="flex justify-between items-start mx-auto c-space"
                    animate={{
                        padding: isMobile && !isOpen && isProjectsVisible && !isAboutVisible && !isExperienceVisible && !isContactVisible ? "0.1rem 0.5rem" : "1rem 1.5rem",
                    }}
                    transition={{ 
                        duration: 0.3,
                        ease: "easeInOut"
                    }}
                >
                    <motion.a 
                        href="/" 
                        className="text-neutral-400 font-bold text-xl hover:text-white transition-colors whitespace-nowrap inline-flex"
                        animate={{
                            scale: isMobile && !isOpen && isProjectsVisible && !isAboutVisible && !isExperienceVisible && !isContactVisible ? 0.7 : 1
                        }}
                        transition={{ 
                            duration: 0.3,
                            ease: "easeInOut"
                        }}
                    >
                        <TypingAnimation />
                    </motion.a>
                    <motion.div
                        className="sm:hidden"
                        animate={{
                            scale: isMobile && !isOpen && isProjectsVisible && !isAboutVisible && !isExperienceVisible && !isContactVisible ? 0.75 : 1, // Animate scale from 100 to 75 and back
                            padding: isMobile && !isOpen && isProjectsVisible && !isAboutVisible && !isExperienceVisible && !isContactVisible ? "0.2rem 0.7rem" : "0.7rem 0rem",
                        }}
                        transition={{ 
                            duration: 0.3,
                            ease: "easeInOut"
                        }}
                    >
                        <AnimatedHamburgerButton
                            onClick={toggleMenu}
                            active={isOpen}
                            setActive={setIsOpen}
                            aria-label="Toggle menu"
                        />
                    </motion.div>
                    <nav className={`sm:flex hidden ${isOpen ? "hidden" : ""}`}>
                        <NavItems toggleMenu={toggleMenu} />
                    </nav>
                </motion.div>
            </div>
            <div className={`nav-sidebar ${isOpen ? "max-h-screen" : "max-h-0"}`} style={{ top: '4rem' }}>
                <nav className="p-5">
                    <NavItems toggleMenu={toggleMenu} />
                </nav>
            </div>
        </motion.header>
    );
};

export default Navbar;