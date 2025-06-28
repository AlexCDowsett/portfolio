import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import Model from "../components/Model.jsx";
import CanvasLoader from "../components/CanvasLoader.jsx";
import { Suspense, forwardRef, useEffect, useState } from "react";
import { calculateSizes } from "../constants/index.js";
import GlitchEffect from "../components/Glitch.jsx";
import Button from "../components/Button.jsx";
import HeroCamera from "../components/HeroCamera.jsx";
import { motion } from "framer-motion";

// Environment variables
const PERSONAL_NAME = import.meta.env.VITE_PERSONAL_NAME || 'Alex';

const handEmojis = ["👋", "✋", "🤚", "🖐️", "🖖"]; // Array of hand emojis

const Hero = forwardRef((props, ref) => {
    const [isMobile, setIsMobile] = useState(false);
    const [showText, setShowText] = useState(false); // State to control text visibility
    const [showButton, setShowButton] = useState(false);
    const [emoji, setEmoji] = useState(handEmojis[0]); // State for the emoji
    const [isGlitching, setIsGlitching] = useState(true); // State to control glitching

    useEffect(() => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        const isMobileUserAgent = /android|iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
        const isMobileScreen = window.innerWidth <= 768; // Adjust the width as needed

        // Set isMobile to true if either method indicates mobile
        setIsMobile(isMobileUserAgent || isMobileScreen);
    }, []);

    useEffect(() => {
        // Timer for text
        const textTimer = setTimeout(() => {
            setShowText(true);
        }, 750);

        // Timer for button
        const buttonTimer = setTimeout(() => {
            setShowButton(true);
        }, 1250); // 750ms (text delay) + 500ms (additional delay) = 1250ms

        return () => {
            clearTimeout(textTimer);
            clearTimeout(buttonTimer);
        };
    }, []);

    useEffect(() => {
        if (showText) {
            let index = 0;

            const emojiInterval = setInterval(() => {
                if (isGlitching) {
                    setEmoji(handEmojis[index]);
                    index = (index + 1) % handEmojis.length; // Cycle through emojis
                }
            }, 100); // Change emoji every 200ms

            // Stop glitching after a certain time or condition
            const stopGlitchingTimer = setTimeout(() => {
                setIsGlitching(false); // Stop glitching after a certain duration
                setEmoji(handEmojis[0]); // Reset to the first emoji
            }, 1800); // Adjust duration as needed

            return () => {
                clearInterval(emojiInterval);
                clearTimeout(stopGlitchingTimer); // Clean up timer on unmount
            };
        }
    }, [showText, isGlitching]);

    const handleNavigation = (e) => {
        e.preventDefault();
        const href = "#about";
        
        // If we're not on the main page, first navigate to the main page with the hash
        if (window.location.pathname !== '/') {
            window.location.href = `/${href}`;
            return;
        }

        // If we're already on the main page, handle hash navigation
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
    };

    const sizes = calculateSizes(false, isMobile, false); // Adjust as needed for other sizes

    return (
        <section ref={ref} className="min-h-screen w-full flex flex-col relative bg-black-100" id="home">
            <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
                
                {/* Show the text only after 1 second */}
                {showText && (
                    <motion.div
                        className="text-gray_gradient"
                        initial={{ opacity: 0, y: -20 }} // Start off-screen and transparent
                        animate={{ opacity: 1, y: 0 }} // Fade in and move to original position
                        transition={{ duration: 0.5 }} // Duration of the animation
                    >
                        <div className="flex justify-center"> {/* Align text to the right */}
                            <span className="sm:text-3xl text-xl font-medium text-white text-center font-generalsans">
                                <GlitchEffect text={`Hi, I'm ${PERSONAL_NAME}`} textColor="#FFFFFF" bgColor="#000000" glitchInterval={100} />
                                <span className={isGlitching ? "" : "waving-hand"}>{emoji}</span>
                            </span>
                        </div>
                        <span className="hero_tag text-gray-gradient text-center block"> {/* Center the tag */}
                            An aspiring full-stack developer
                        </span>
                    </motion.div>
                )}

                <div className="w-full h-full absolute inset-0">
                    <Canvas className="w-full h-full">
                        <Suspense fallback={<CanvasLoader />}>
                            <PerspectiveCamera makeDefault position={[0, 0, 20]} />
                            <HeroCamera isMobile={isMobile}>
                                <Model
                                    scale={sizes.modelScale}
                                    position={sizes.modelPosition}
                                    isMobile={isMobile} // Pass isMobile to the Model component
                                    rotation={[-3.2, 4, 0]}
                                />
                                <ambientLight intensity={1} />
                                <directionalLight position={[10, 10, 10]} intensity={0.5} />
                            </HeroCamera>
                        </Suspense>
                    </Canvas>
                </div>

                <div className="absolute bottom-24 sm:bottom-5 left-0 right-0 z-10 c-space">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: showButton ? 1 : 0, y: showButton ? 0 : 50 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        <a href="#about" className="flex" onClick={handleNavigation}>
                            <Button 
                                name="Let's work together" 
                                isBeam 
                                containerClass="sm:w-fit w-full sm:min-w-96 flex transition-transform duration-300 ease-in-out transform hover:scale-110 relative" 
                            />
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
});

export default Hero;
