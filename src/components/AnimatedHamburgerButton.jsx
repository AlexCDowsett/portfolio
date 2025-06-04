import React, { useState, useEffect } from "react";
import { MotionConfig, motion } from "framer-motion";

const AnimatedHamburgerButton = ({ onClick, active, setActive, containerClass }) => {
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpacity(1); // Set opacity to 1 after 0.3 seconds
        }, 300); // Delay for fade-in effect set to 0.3 seconds

        return () => clearTimeout(timer);
    }, []);

    return (
        <MotionConfig
            transition={{
                duration: 0.5,
                ease: "easeInOut",
            }}
        >
            <motion.button
                initial={false}
                animate={active ? "open" : "closed"}
                onClick={onClick}
                className={`relative h-10 w-10 ${containerClass}`}
                aria-label="Toggle menu"
                style={{ opacity }} // Keep opacity style but remove transition
            >
                <div className="relative w-full h-full">
                    <motion.span
                        variants={VARIANTS.top}
                        className="absolute h-1 w-8 bg-white"
                        style={{ 
                            y: "-400%", 
                            left: "50%", 
                            x: "-50%", 
                            top: "35%",
                            transformOrigin: "center" 
                        }}
                    />
                    <motion.span
                        variants={VARIANTS.middle}
                        className="absolute h-1 w-8 bg-white"
                        style={{ 
                            left: "50%", 
                            x: "-50%", 
                            top: "50%", 
                            y: "-400%",
                            transformOrigin: "center" 
                        }}
                    />
                    <motion.span
                        variants={VARIANTS.bottom}
                        className="absolute h-1 w-3 bg-white"
                        style={{
                            x: "-50%",
                            y: "-300%",
                            bottom: "35%",
                            left: "calc(50% + 10px)",
                            transformOrigin: "center"
                        }}
                    />
                </div>
            </motion.button>
        </MotionConfig>
    );
};

const VARIANTS = {
    top: {
        open: {
            rotate: ["0deg", "0deg", "45deg"],
            top: ["35%", "50%", "50%"],
        },
        closed: {
            rotate: ["45deg", "0deg", "0deg"],
            top: ["50%", "50%", "35%"],
        },
    },
    middle: {
        open: {
            rotate: ["0deg", "0deg", "-45deg"],
        },
        closed: {
            rotate: ["-45deg", "0deg", "0deg"],
        },
    },
    bottom: {
        open: {
            rotate: ["0deg", "0deg", "45deg"],
            bottom: ["35%", "50%", "50%"],
            left: "50%",
        },
        closed: {
            rotate: ["45deg", "0deg", "0deg"],
            bottom: ["50%", "50%", "35%"],
            left: "calc(50% + 10px)",
        },
    },
};

export default AnimatedHamburgerButton;