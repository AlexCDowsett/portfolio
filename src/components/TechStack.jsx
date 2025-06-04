import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import './TechStack.css';  // Import the CSS file

// Updated tech stack data with your experience
const techStack = [
    {
        group: "Advanced",
        experience: "8 years",
        level: 90,
        technologies: [
            { name: "Python", imgSrc: "/assets/python.svg" },
            { name: "SQL", imgSrc: "/assets/mysql.svg" },
        ]
    },
    {
        group: "Intermediate",
        experience: "3 years",
        level: 60,
        technologies: [
            { name: "VHDL", imgSrc: "/assets/vhdl.svg" },
            { name: "C++", imgSrc: "/assets/cpp.svg" },
            { name: "C", imgSrc: "/assets/c.svg" },
            { name: "Git", imgSrc: "/assets/git.svg" },
            { name: "Docker", imgSrc: "/assets/docker.svg" },
        ]
    },
    {
        group: "Learning",
        experience: "6 months",
        level: 40,
        technologies: [
            { name: "PHP", imgSrc: "/assets/php.svg" },
            { name: "React", imgSrc: "/assets/react.svg" },
            { name: "Node.js", imgSrc: "/assets/nodejs.svg" },
            { name: "JavaScript", imgSrc: "/assets/javascript.svg" },
            { name: "Tailwind CSS", imgSrc: "/assets/tailwind.svg" },
            { name: "Vite", imgSrc: "/assets/vite.svg" },
            { name: "Next.js", imgSrc: "/assets/nextjs.svg" },
        ]
    }
];

// Bar animation variants
const barVariants = {
    hidden: { 
        scaleX: 0,
        opacity: 0
    },
    visible: (level) => ({
        scaleX: level / 100,
        opacity: 1,
        transition: {
            duration: 1.8, // Slightly longer duration to make the deceleration more noticeable
            ease: [0.25, 0.1, 0.25, 1], // Cubic bezier curve for quick start and slow end
            opacity: {
                duration: 0.4,
                ease: "easeIn"
            }
        }
    })
};

const textVariants = {
    hidden: { 
        opacity: 0,
        x: -20
    },
    visible: { 
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

const TechStack = () => {
    const [isInView, setIsInView] = useState(false);
    const containerRef = useRef(null);
    const [hoveredIcon, setHoveredIcon] = useState(null);

    // Add back the Intersection Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                }
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

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

    // Handle mouse enter for technology icons
    const handleMouseEnter = (event, techName, techIndex) => {
        setHoveredIcon({ groupIndex: event.target.closest('.stack-item').dataset.index, techIndex });
        
        // Tooltip logic
        const tooltip = document.querySelector('.tech-tooltip');
        if (tooltip) {
            tooltip.textContent = techName;
            tooltip.style.visibility = 'visible';
            tooltip.style.opacity = '0.9';
            tooltip.style.left = `${event.pageX + 10}px`;
            tooltip.style.top = `${event.pageY - 30}px`;
        }

        // Get all icons in the same group
        const icons = event.target.parentElement.parentElement.querySelectorAll('img');
        icons.forEach((icon, index) => {
            const distance = Math.abs(index - techIndex);
            const scale = Math.max(1, 1.5 - (distance * 0.3));
            icon.style.transform = `scale(${scale})`;
            
            if (index > techIndex) {
                const extraSpace = (scale - 1) * 32;
                icon.style.marginLeft = `${extraSpace}px`;
            } else {
                icon.style.marginLeft = '0px';
            }
            
            icon.style.transition = 'all 0.3s ease';
        });
    };

    // Handle mouse leave for technology icons
    const handleMouseLeave = (event) => {
        setHoveredIcon(null);
        
        // Tooltip logic
        const tooltip = document.querySelector('.tech-tooltip');
        if (tooltip) {
            tooltip.style.visibility = 'hidden';
            tooltip.style.opacity = '0';
        }

        // Reset all icons in the group
        const icons = event.target.parentElement.parentElement.querySelectorAll('img');
        icons.forEach(icon => {
            icon.style.transform = 'scale(1)';
            icon.style.marginLeft = '0px';
        });
    };

    // Handle mouse move to update tooltip position
    const handleMouseMove = (event) => {
        const tooltip = document.querySelector('.tech-tooltip');
        if (tooltip && tooltip.style.visibility === 'visible') {
            tooltip.style.left = `${event.pageX + 10}px`;
            tooltip.style.top = `${event.pageY - 30}px`;
        }
    };

    return (
        <div ref={containerRef} className="tech-stack-container lg:ml-3" style={styles.container}>
            {techStack.map((stack, index) => (
                <div
                    key={index}
                    className="stack-item flex flex-col w-full gap-5"
                    data-index={index}
                >
                    <div className="flex flex-row w-full items-center gap-5">
                        <motion.div 
                            style={styles.textContainer}
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            variants={textVariants}
                            custom={index}
                        >
                            <motion.span 
                                style={styles.groupName}
                                variants={textVariants}
                            >
                                {stack.group}
                            </motion.span>
                            <motion.span 
                                style={styles.experience}
                                variants={textVariants}
                            >
                                {stack.experience}
                            </motion.span>
                        </motion.div>
                        <div className="progress-bar-container w-fit xl:w-[calc(100%-300px)]" style={{ ...styles.progressBarContainer }}>
                            <motion.div
                                className="progress-bar"
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                variants={barVariants}
                                custom={stack.level}
                                style={{
                                    height: "100%",
                                    background: "linear-gradient(90deg, #FF8C00 0%, #0088ff 100%)",
                                    borderRadius: "12px",
                                    originX: 0,
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex gap-2.5 lg:gap-5">
                        {stack.technologies.map((tech, techIndex) => (
                            <div 
                                key={techIndex}
                                className="mt-2 w-8 lg:w-12"
                                style={{ ...styles.iconWrapper, width: undefined }}
                                onMouseEnter={(e) => handleMouseEnter(e, tech.name, techIndex)}
                                onMouseLeave={handleMouseLeave}
                                onMouseMove={handleMouseMove}
                            >
                                <div style={styles.hitbox} />
                                <img
                                    className="w-8 h-8 lg:w-12 lg:h-12 transition-transform duration-300 ease-in-out px-0.5"
                                    src={tech.imgSrc}
                                    alt={tech.name}
                                    style={{
                                        ...styles.image,
                                        width: undefined,
                                        height: undefined,
                                        transformOrigin: 'center bottom'
                                    }}
                                />
                                <div 
                                    style={{
                                        ...styles.underline,
                                        ...(hoveredIcon && 
                                           hoveredIcon.groupIndex === index.toString() && 
                                           hoveredIcon.techIndex === techIndex 
                                           ? styles.underlineActive 
                                           : {})
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

// Updated styles
const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        gap: "25px",
        width: "100%",
        padding: "20px",
    },
    stackItem: {
        display: "flex",
        alignItems: "center",
        gap: "20px",
        width: "100%",
    },
    leftSection: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "300px",
        '@media (min-width: 1024px)': {  // This won't work directly - we'll use className instead
            width: "33%",
        }
    },
    textContainer: {
        display: "flex",
        flexDirection: "column",
    },
    groupName: {
        fontWeight: "bold",
        fontSize: "18px",
        color: "#ffffff",
    },
    experience: {
        fontSize: "14px",
        color: "#ffffff",
    },
    iconsContainer: {
        display: "flex",
        alignItems: "center",
        padding: "10px 0",
    },
    image: {
        width: "32px",
        height: "32px",
        objectFit: "contain",
        transformOrigin: "center bottom",
        position: "relative",
        '@media (min-width: 1024px)': {  // This won't work directly - we'll use className instead
            width: "48px",
            height: "48px",
        }
    },
    progressBarContainer: {
        flex: 1,
        height: "24px",
        backgroundColor: "#333333",
        borderRadius: "12px",
        overflow: "hidden",
        marginLeft: "auto",
        minWidth: "200px", // Add minimum width to ensure visibility
    },
    hitbox: {
        position: "absolute",
        top: 0,
        left: "-16px",
        right: "-16px",
        bottom: 0,
        zIndex: 1,
    },
    underline: {
        position: "absolute",
        height: "3px", // Line thickness
        backgroundColor: "lightgrey",
        bottom: "-9px", // Position under icon
        left: "50%",
        right: "50%",
        borderRadius: "10px",
        transition: "all 0.3s ease",
    },
    underlineActive: {
        left: "0",
        right: "0",
    },
    iconWrapper: {
        width: "32px",
        position: "relative",
        display: "flex",
        justifyContent: "center",
    }
};

export default TechStack;
