import {myProjects} from "../constants/index.js";
import {Suspense, useState, useEffect, useRef} from "react";
import {Canvas} from "@react-three/fiber";
import {Center, OrbitControls, SpotLight} from "@react-three/drei";
import CanvasLoader from "../components/CanvasLoader.jsx";
import DemoComputer from "../components/DemoComputer.jsx";
import DemoScreens from "../components/DemoScreens.jsx";
import {Leva, useControls} from "leva";
import { useScroll } from "../context/ScrollContext.jsx";
import { motion, AnimatePresence } from "framer-motion";


const projectCount = myProjects.length;



const Projects = () => {
    
    const [isVisible, setIsVisible] = useState(false);
    const projectsRef = useRef(null);
    const { setIsProjectsVisible } = useScroll();

    const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

    const currentProject = myProjects[selectedProjectIndex];

    // Create and manage tooltips when component mounts
    useEffect(() => {
        // Create tooltip element
        const tooltip = document.createElement('div');
        tooltip.style.position = 'absolute';
        tooltip.style.backgroundColor = 'black';
        tooltip.style.color = 'white';
        tooltip.style.borderRadius = '5px';
        tooltip.style.padding = '5px 10px';
        tooltip.style.opacity = '0';
        tooltip.style.transition = 'opacity 0.3s';
        tooltip.style.pointerEvents = 'none';
        tooltip.style.zIndex = '1000';
        tooltip.style.whiteSpace = 'nowrap';
        tooltip.style.fontSize = '14px';
        
        // Remove any existing tooltips
        const existingTooltips = document.querySelectorAll('.tech-tooltip');
        existingTooltips.forEach(tip => tip.remove());

        // Add class for identification
        tooltip.classList.add('tech-tooltip');
        document.body.appendChild(tooltip);

        // Cleanup on unmount
        return () => {
            tooltip.remove();
        };
    }, []);

    // Handle both mouse enter and touch start
    const handleTooltipStart = (event, techName) => {
        const tooltip = document.querySelector('.tech-tooltip');
        if (tooltip) {
            tooltip.textContent = techName;
            tooltip.style.visibility = 'visible';
            tooltip.style.opacity = '0.9';
            
            // Handle both mouse and touch events
            const x = event.pageX || event.touches?.[0]?.pageX;
            const y = event.pageY || event.touches?.[0]?.pageY;
            
            tooltip.style.left = `${x + 10}px`;
            tooltip.style.top = `${y - 30}px`;
        }
    };

    // Handle both mouse leave and touch end
    const handleTooltipEnd = () => {
        const tooltip = document.querySelector('.tech-tooltip');
        if (tooltip) {
            tooltip.style.visibility = 'hidden';
            tooltip.style.opacity = '0';
        }
    };

    // Handle both mouse move and touch move
    const handleTooltipMove = (event) => {
        const tooltip = document.querySelector('.tech-tooltip');
        if (tooltip && tooltip.style.visibility === 'visible') {
            const x = event.pageX || event.touches?.[0]?.pageX;
            const y = event.pageY || event.touches?.[0]?.pageY;
            
            tooltip.style.left = `${x + 10}px`;
            tooltip.style.top = `${y - 30}px`;
        }
    };

    const [hasNavigatedNext, setHasNavigatedNext] = useState(false);
    const [isNavigatingOut, setIsNavigatingOut] = useState(false);

    const handleNavigation = (direction) => {
        if (direction === 'next' && !hasNavigatedNext) {
            setIsNavigatingOut(true);
            setTimeout(() => {
                setHasNavigatedNext(true);
                setIsNavigatingOut(false);
            }, 1000);
        }
        setSelectedProjectIndex((prevIndex) => {
            if (direction === 'previous') {
                return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
            } else {
                return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
            }
        });
        setShowSwipeText(false);
    }

    // Add touch handling state
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [canSwipe, setCanSwipe] = useState(true);

    // Minimum swipe distance (in px)
    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        if (!canSwipe) return;
        setTouchEnd(null);
        setTouchStart(e.touches[0].clientX);
    };

    const onTouchMove = (e) => {
        if (!canSwipe) return;
        setTouchEnd(e.touches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd || !canSwipe) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe || isRightSwipe) {
            setCanSwipe(false);
            
            if (isLeftSwipe) {
                handleNavigation('next');
            } else {
                handleNavigation('previous');
            }

            setTimeout(() => {
                setCanSwipe(true);
            }, 1000);
        }
    };

    const [isSticky, setIsSticky] = useState(false);
    const [showSwipeText, setShowSwipeText] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    // Determine if the user is on mobile
    useEffect(() => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        const isMobileUserAgent = /android|iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;

        // Set isMobile to true if either method indicates mobile
        setIsMobile(isMobileUserAgent);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
                setIsProjectsVisible(entry.isIntersecting);
                setIsSticky(entry.intersectionRatio < 1);
            },
            { threshold: [0, 1] }
        );

        if (projectsRef.current) {
            observer.observe(projectsRef.current);
        }

        return () => {
            if (projectsRef.current) {
                observer.unobserve(projectsRef.current);
            }
        };
    }, [setIsProjectsVisible]);

    return (
        <section ref={projectsRef} className={`relative ${isSticky && isMobile ? 'sticky' : ''}`} id="work">
            <div className="c-space pt-20 py-4">
                <p className="head-text">My Work</p>
            </div>

            <div className={`md:relative ${isMobile ? 'sticky top-5' : 'top-0'} z-20`}>
                <div className="c-space">
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 w-full">
                        <div className="flex flex-col sm:gap-5 gap-3 relative sm:p-10 py-5 px-5 shadow-2xl shadow-black-200">
                            <div className="absolute top-0 right-0">
                                <img src={currentProject.spotlight} alt="spotlight"
                                     className="w-full h-96 object-cover rounded-xl"/>
                            </div>
                            
                            <AnimatePresence mode="wait">
                                <motion.div 
                                    key={selectedProjectIndex}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="flex flex-col gap-5"
                                >
                                    {/* Title and logo section */}
                                    <div className="sm:block flex items-start sm:gap-3 gap-2">
                                        <div className="sm:p-3 p-2 backdrop-filter backdrop-blur-3xl w-fit rounded-lg"
                                             style={currentProject.logoStyle}>
                                            <img src={currentProject.logo} alt="logo" 
                                                 className="sm:w-10 sm:h-10 w-6 h-6 shadow-sm"/>
                                        </div>
                                        <p className="text-white font-semibold animatedText sm:mt-5 mt-2
                                            text-[16px] 
                                            xs:text-[18px]
                                            sm:text-[32px]
                                            md:text-[36px]
                                            lg:text-[28px]
                                            xl:text-3xl
                                            whitespace-nowrap">
                                            {currentProject.title}
                                        </p>
                                    </div>

                                    <div className="flex flex-col sm:gap-2 gap-1 text-white-600 sm:my-3 my-2">
                                        <p className="animatedText sm:text-base text-sm h-[100px] sm:h-[80px] overflow-y-auto custom-scrollbar">
                                            {currentProject.desc}
                                        </p>
                                        <p className="animatedText sm:text-base text-sm sm:block hidden h-[150px] overflow-y-auto custom-scrollbar">
                                            {currentProject.subdesc}
                                        </p>
                                    </div>

                                    <div className="flex flex-col gap-2 md:gap-5 sm:my-5 relative z-10">
                                        <div className="flex items-center flex-wrap gap-1 sm:gap-2">
                                            {currentProject.tags.map((tag, index) => (
                                                <div 
                                                    key={index} 
                                                    className="tech-logo"
                                                    onMouseEnter={(e) => handleTooltipStart(e, tag.name)}
                                                    onMouseLeave={handleTooltipEnd}
                                                    onMouseMove={handleTooltipMove}
                                                >
                                                    <img src={tag.path} alt={tag.name}/>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Unified Live Site Link */}
                                        {currentProject.href ? (
                                            <a 
                                                className="flex items-center gap-2 cursor-pointer text-white-600 py-1 sm:py-3 sm:px-2 px-1 relative z-20 pointer-events-auto transition-transform duration-300 ease-in-out transform hover:scale-110 origin-left" 
                                                href={currentProject.href}
                                                target="_blank" 
                                                rel="noreferrer"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    window.open(currentProject.href, '_blank');
                                                }}
                                            >
                                                <p className="md:text-base text-sm">GitHub Repository</p>
                                                <img src="/assets/arrow-up.png" className="w-3 h-3" alt="arrow"/>
                                            </a>
                                        ) : (
                                            <div className="flex items-center gap-2 py-1 sm:py-3 sm:px-2 px-1">
                                                <p className="md:text-base text-sm opacity-0">GitHub Repository</p>
                                                <img src="/assets/arrow-up.png" className="w-3 h-3 opacity-0" alt="arrow"/>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                            <div className={`flex justify-between items-center mt-7 pt-15 ${isMobile ? 'hidden' : 'flex'}`}>
                                <button 
                                    className="arrow-btn flex transition-transform duration-300 ease-in-out transform hover:scale-150 relative" 
                                    onClick={() => handleNavigation('previous')}
                                >
                                    <div className="absolute inset-0 w-8 h-8 transition-transform duration-300 ease-in-out rounded-full -m-0.5 p-5 hover:border-2 border-white"></div>
                                    <img 
                                        src="/assets/left-arrow.png" 
                                        alt="left arrow" 
                                        className="w-4 h-4"
                                        style={{ objectFit: 'contain' }}
                                    />
                                </button>
                                <div className="flex items-center">
                                    <div 
                                        className={`transition-opacity duration-500 ease-in-out overflow-hidden
                                            ${isNavigatingOut || hasNavigatedNext ? 'opacity-0 max-w-0' : 'opacity-100 max-w-[200px]'}`}
                                        style={{ 
                                            transition: 'opacity 1000ms ease-in-out, max-width 500ms ease-in-out',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        <p className="text-red-300 text-lg animate-pulse text-right mr-5">
                                            Click to Navigate
                                        </p>
                                    </div>
                                    <button 
                                        className="arrow-btn flex transition-transform duration-300 ease-in-out transform hover:scale-150 relative" 
                                        onClick={() => handleNavigation('next')}
                                    >
                                        <div className={`absolute inset-0 w-8 h-8 transition-transform ease-in-out rounded-full -m-0.5 p-5
                                            ${hasNavigatedNext 
                                                ? 'hover:border-2 border-white duration-300' 
                                                : 'border-2 border-dashed border-red-300 animate-pulse duration-1000'
                                            } ${isNavigatingOut ? 'opacity-0' : 'opacity-100'}`}
                                        ></div>
                                        <img 
                                            src="/assets/right-arrow.png" 
                                            alt="right arrow" 
                                            className="w-4 h-4"
                                            style={{ objectFit: 'contain' }}
                                        />
                                    </button>
                                </div>
                            </div>




                        </div>

                        <div className="border border-black-300 bg-black-100 rounded-lg h-96 md:h-full relative"
                            onTouchStart={onTouchStart}
                            onTouchMove={onTouchMove}
                            onTouchEnd={onTouchEnd}
                            >
                                <motion.div
                                    initial={{ opacity: 1 }}
                                    animate={{ opacity: showSwipeText ? 1 : 0 }}
                                    transition={{ duration: 1 }}
                                    className={`absolute items-center justify-center left-1/2 transform -translate-x-1/2 z-30 h-30 w-30 ${isMobile ? 'flex' : 'hidden'}`}
                                    style={{ top: '30%' }}
                                >
                                    <img src="/assets/swipe.gif" alt="Swipe Gesture" className="w-32 h-auto" />
                                </motion.div>
                            <Leva/>
                            <Canvas>
                                <group>

                                <Center>

                                    <Suspense fallback={<CanvasLoader/>}>
                                        <group scale={isMobile ? 0.89 : 0.9} position={[0, -2.5, -1]} rotation={[0.2, -0.1, 0]}>

                                            <DemoScreens


                                                texture={currentProject.texture} count={selectedProjectIndex}
                                            />
                                        </group>
                                    </Suspense>
                                </Center>
                                    {/*<OrbitControls maxPolarAngle={(Math.PI / 2)+0.2} enableZoom={true}/>*/}
                                </group>
                            </Canvas>

                        </div>
                    </div>
                </div>
            </div>
            
            {/* Modified spacer div */}
            <div id="projects-end-spacer" className={`h-screen ${isMobile ? '' : 'hidden'}`}></div>
            <div id="projects-end-spacer" className={`h-screen ${isMobile ? '' : 'hidden'}`}></div>
        </section>
    )
}

export default Projects
