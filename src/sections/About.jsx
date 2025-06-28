import {useState, useEffect, forwardRef} from 'react';
import { motion } from "framer-motion";
import { useMediaQuery } from 'react-responsive';
import { useScroll } from '../context/ScrollContext.jsx';
import Button from '../components/Button.jsx';
import GlitchEffect from "../components/Glitch.jsx";
import World from "../components/World.jsx";
import TechStack from "../components/TechStack.jsx";
import Notification from "../components/SlideInNotifications.jsx";
import { AnimatePresence } from "framer-motion";
import { aboutContent } from '../data/aboutContent.js';

const fadeVariants = {
    leftToRight: {
        hidden: (isMobile) => ({ 
            opacity: 0, 
            x: isMobile ? 0 : -50 
        }),
        visible: { 
            opacity: 1, 
            x: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    },
    rightToLeft: {
        hidden: (isMobile) => ({ 
            opacity: 0, 
            x: isMobile ? 0 : 50 
        }),
        visible: { 
            opacity: 1, 
            x: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    },
    topToBottom: {
        hidden: (isMobile) => ({ 
            opacity: 0, 
            y: isMobile ? 50 : -50,
            x: 0
        }),
        visible: { 
            opacity: 1, 
            y: 0,
            x: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    },
    bottomToTop: {
        hidden: { 
            opacity: 0, 
            y: 50,
            x: 0
        },
        visible: { 
            opacity: 1, 
            y: 0,
            x: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    }
};

const About = forwardRef((props, ref) => {
    const { setIsAboutVisible } = useScroll();
    const [hasCopied, setHasCopied] = useState(false);
    const textToCopy = aboutContent.contact.email;
    const [isMobile, setIsMobile] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);

    // Check if we're on mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
                setIsAboutVisible(entry.isIntersecting);
            },
            { threshold: 0 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref, setIsAboutVisible]);

    const handleCopy = async (event) => {
        event.preventDefault(); // Prevent default behavior

        if (isNotificationVisible) return;

        try {
            // Attempt to use the Clipboard API
            await navigator.clipboard.writeText(textToCopy);
            setHasCopied(true);
            setNotifications((prev) => [{ id: Math.random(), text: "Email copied to clipboard!", type: "success", duration: 2000 }, ...prev]);
            setIsNotificationVisible(true);
            setTimeout(() => {
                setIsNotificationVisible(false);
                setHasCopied(false);
            }, 2500);
        } catch (err) {
            // console.error('Clipboard API failed, falling back to textarea method:', err);

            // Fallback to the temporary textarea method
            const textArea = document.createElement('textarea');
            textArea.value = textToCopy; // Set the value to copy
            document.body.appendChild(textArea); // Append to body

            textArea.select(); // Select the text
            textArea.setSelectionRange(0, 99999); // For mobile devices

            // Avoid focusing the textarea to prevent the jump
            // Only select the text and execute the copy command
            document.execCommand('copy');
            document.body.removeChild(textArea); // Remove the textarea after copying

            setHasCopied(true); // Update the copied state
            setNotifications((prev) => [{ id: Math.random(), text: "Email copied to clipboard!", type: "success", duration: 2000 }, ...prev]);
            setIsNotificationVisible(true);
            setTimeout(() => {
                setIsNotificationVisible(false);
                setHasCopied(false);
            }, 2500);
        }
    };

    // Define the removeNotif function
    const removeNotif = (id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
        setIsNotificationVisible(false);
    };

    return (
        <section ref={ref} className="about-section mx-1 md:pl-3" id="about">
            <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
                <div className="col-span-1 xl:row-span-3">
                    <motion.div 
                        className="grid-container items-center flex"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeVariants.bottomToTop}
                        custom={isMobile}
                    >
                        <img src="/assets/grid1.png" alt="grid-1" 
                            className="object-contain w-full h-full mb-5 aspect-[1/1]"/>

                        <div className="flex flex-col justify-end w-full h-full pb-3 lg:pb-5">
                            <p className="grid-headtext"><GlitchEffect text={aboutContent.introduction.title} bgColor="#100c14"
                                                                       textColor="#ffffff"/></p>
                            <p className="grid-subtext">
                                {aboutContent.introduction.description}</p>
                        </div>
                    </motion.div>
                </div>

                <div className="col-span-1 xl:row-span-3">
                    <motion.div 
                        className="grid-container items-center flex flex-col justify-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeVariants.bottomToTop}
                        custom={isMobile}
                    >
                        <div className="relative flex-grow w-full h-full mb-5 flex items-center justify-center">
                            <img src="/assets/grid3.png" alt="grid-3"
                                 className="object-cover object-center w-full h-full aspect-[1/1] max-h-[200px] sm:max-h-[300px] md:max-h-[400px] lg:max-h-[500px] "/>
                        </div>

                        <div className="flex flex-col justify-end w-full h-full pb-3 lg:pb-5">
                            <p className="grid-headtext"><GlitchEffect text={aboutContent.passion.title} bgColor="#100c14"
                                                                       textColor="#ffffff"/></p>
                            <p className="grid-subtext">
                                {aboutContent.passion.description}
                            </p>
                        </div>
                    </motion.div>
                </div>

                <div className="col-span-1 xl:row-span-4">
                    <motion.div 
                        className="grid-container overflow-hidden flex flex-col justify-center items-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeVariants.bottomToTop}
                        custom={isMobile}
                    >
                        <div className="flex w-full h-full items-center justify-center flex-grow mb-5" style={{ 
                            margin: '0 auto'
                        }}>
                            <World/>
                        </div>
                        <div className="flex flex-col justify-end w-full pb-3 lg:pb-5">
                            <p className="grid-headtext md:overflow-hidden md:whitespace-nowrap xl:whitespace-normal"><GlitchEffect
                                text={aboutContent.location.title} bgColor="#100c14"
                                textColor="#ffffff" glitchInterval={15}/></p>
                            <p className="grid-subtext pb-2">{aboutContent.location.description}</p>
                            <a href="#contact" className="block w-full justify-center">
                                <Button
                                    name="Contact Me" 
                                    isBeam 
                                    containerClass="mt-5 transition-transform duration-300 ease-in-out transform hover:scale-110 w-3/4 mx-auto"
                                />
                            </a>
                        </div>
                    </motion.div>
                </div>

                <div className="xl:col-span-2 xl:row-span-3">
                    <motion.div 
                        className="grid-container"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeVariants.bottomToTop}
                        custom={isMobile}
                    >
                        <div className="flex-grow w-full h-fit flex justify-center items-center">
                            <TechStack/>
                        </div>
                        <div className="flex flex-col justify-end w-full pb-3 lg:pb-5">
                            <p className="grid-headtext"><GlitchEffect text={aboutContent.techStack.title} bgColor="#100c14" textColor="#ffffff" glitchInterval={50}/></p>
                            <p className="grid-subtext">
                                {aboutContent.techStack.description}
                            </p>
                        </div>
                    </motion.div>
                </div>

                <div className="xl:col-span-1 xl:row-span-2 relative">
                    <motion.div 
                        className="grid-container items-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeVariants.bottomToTop}
                        custom={isMobile}
                    >
                        <img
                            src="/assets/grid4.png"
                            alt="grid-4"
                            className="lg:mx-5 lg:my-5 object-cover object-top flex-grow h-[170px]"
                        />

                        <div className="lg:pt-10 pb-5 relative">
                            <p className="grid-subtext text-center">{aboutContent.contact.title}</p>
                            <div
                                className="copy-container transition-transform duration-300 ease-in-out transform hover:scale-110"
                                onClick={handleCopy}
                                onTouchStart={handleCopy}
                                onPointerDown={handleCopy}
                                onMouseDown={handleCopy}
                                role="button"
                                tabIndex="0"
                            >
                                <img src={hasCopied ? 'assets/tick.svg' : 'assets/copy.svg'} alt="copy"
                                     className="w-6 h-6"/>
                                <p className="lg:text-2xl md:text-xl font-medium text-gray_gradient text-white">{aboutContent.contact.email}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="fixed bottom-3 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
                <AnimatePresence>
                    {notifications.map((n) => (
                        <Notification removeNotif={removeNotif} {...n} key={n.id} />
                    ))}
                </AnimatePresence>
            </div>
        </section>
    );
});

export default About;