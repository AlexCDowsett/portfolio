import React, { useEffect, useState, useRef } from "react";

const TypingAnimation = () => {
    const [opacity, setOpacity] = useState(0);
    const typedRef = useRef(null);
    const cursorRef = useRef(null);

    // Timing constants (in milliseconds)
    const FADE_IN_DELAY = 200;
    const ANIMATION_START_DELAY = 1300;
    const TYPE_SPEED = 150;
    const BACKSPACE_SPEED = 100;
    const PAUSE_BEFORE_BACKSPACE = 1000;
    const CURSOR_BLINK_RATE = 500;
    const SECOND_STRING_TYPE_SPEED = 150;

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpacity(1);
        }, FADE_IN_DELAY);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Create cursor element
        cursorRef.current = document.createElement('span');
        cursorRef.current.className = 'typed-cursor';
        cursorRef.current.innerHTML = '|';
        cursorRef.current.style.opacity = '1'; // Explicitly set initial opacity
        typedRef.current.after(cursorRef.current);

        // Animation sequence
        const animationTimeout = setTimeout(() => {
            animateTyping();
        }, ANIMATION_START_DELAY);

        // Store all intervals and timeouts for proper cleanup
        const intervals = [];
        const timeouts = [];

        // Custom animation function
        const animateTyping = () => {
            const firstString = "dowsett.dev";
            const secondString = "Alex's Portfolio";
            let currentText = "";
            
            // Type the first string
            let charIndex = 0;
            const typeFirstString = setInterval(() => {
                if (charIndex < firstString.length) {
                    currentText += firstString[charIndex];
                    typedRef.current.innerHTML = currentText;
                    document.title = currentText || "|";
                    charIndex++;
                } else {
                    clearInterval(typeFirstString);
                    
                    // Pause before backspacing
                    const pauseTimeout = setTimeout(() => {
                        // Make cursor blink a few times before hiding
                        let blinkCount = 0;
                        const cursorBlink = () => {
                            if (cursorRef.current) {
                                // Toggle opacity between 0 and 1
                                cursorRef.current.style.opacity = 
                                    cursorRef.current.style.opacity === '1' ? '0' : '1';
                                
                                blinkCount++;
                                
                                if (blinkCount >= 6) { // 3 complete blinks
                                    // Stop blinking and hide cursor
                                    cursorRef.current.style.opacity = '0';
                                    
                                    // Start backspacing
                                    startBackspacing();
                                }
                            }
                        };
                        
                        // Blink cursor
                        const blinkInterval = setInterval(cursorBlink, CURSOR_BLINK_RATE);
                        intervals.push(blinkInterval);
                        
                        // Function to start backspacing
                        const startBackspacing = () => {
                            clearInterval(blinkInterval);
                            
                            // Backspace the first string
                            const backspaceFirstString = setInterval(() => {
                                if (currentText.length > 0) {
                                    currentText = currentText.slice(0, -1);
                                    typedRef.current.innerHTML = currentText;
                                    document.title = currentText || "|";
                                } else {
                                    clearInterval(backspaceFirstString);
                                    
                                    // Show cursor again before typing second string
                                    if (cursorRef.current) {
                                        cursorRef.current.style.opacity = '1';
                                    }
                                    
                                    // Type the second string
                                    currentText = "";
                                    charIndex = 0;
                                    const typeSecondString = setInterval(() => {
                                        if (charIndex < secondString.length) {
                                            currentText += secondString[charIndex];
                                            typedRef.current.innerHTML = currentText;
                                            document.title = currentText || "|";
                                            charIndex++;
                                        } else {
                                            cursorRef.current.style.opacity = '0';
                                            clearInterval(typeSecondString);
                                            document.title = currentText
                                            // Final state is "Alex's Portfolio"
                                        }
                                    }, SECOND_STRING_TYPE_SPEED);
                                    intervals.push(typeSecondString);
                                }
                            }, BACKSPACE_SPEED);
                            intervals.push(backspaceFirstString);
                        };
                    }, PAUSE_BEFORE_BACKSPACE);
                    timeouts.push(pauseTimeout);
                }
            }, TYPE_SPEED);
            intervals.push(typeFirstString);
        };

        return () => {
            // Clear all intervals and timeouts
            intervals.forEach(interval => clearInterval(interval));
            timeouts.forEach(timeout => clearTimeout(timeout));
            clearTimeout(animationTimeout);
            
            // Properly remove cursor before unmounting
            if (cursorRef.current) {
                cursorRef.current.style.opacity = '0'; 
                cursorRef.current.remove();
                cursorRef.current = null;
            }
        };
    }, []);

    return (
        <h1 id="typed" ref={typedRef} style={{ opacity }}>
        </h1>
    );
};

export default TypingAnimation;
