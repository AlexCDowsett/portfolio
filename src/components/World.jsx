import Globe from "react-globe.gl";
import {DoubleSide, Mesh, MeshPhongMaterial, SphereGeometry, TextureLoader} from "three";
import React, {useEffect, useRef, useState} from "react";

// New variables for ring customization
const RING_BASE_RADIUS = 30; // Controls the maximum radius of the pulsing rings
const RING_REPEAT_PERIOD = 6000; // Controls the duration of the ring pulse, higher means slower decay

const World = () => {
    const containerRef = useRef();  // Ref for the wrapper div
    const globeEl = useRef();       // Ref for the Globe component
    const [isVisible, setIsVisible] = useState(false); // Track if the globe is visible
    const [effectsApplied, setEffectsApplied] = useState(false); // Ensure effects are applied only once
    const [zoomInterval, setZoomInterval] = useState(null); // Store the zoom-out interval for cancellation
    const [hasBeenSeen, setHasBeenSeen] = useState(false); // Track if the globe has been seen before
    const [currentStep, setCurrentStep] = useState(0); // Track the current step of the animation
    const [isZoomingOut, setIsZoomingOut] = useState(false); // Track if zoom-out animation is active
    const [shouldPulse, setShouldPulse] = useState(false); // Track if rings should pulse
    const autoRotateTimeout = useRef(null); // Ref for the auto-rotate timeout
    const [dimensions, setDimensions] = useState({ width: 1500, height: 1500 });

    // Set up IntersectionObserver to trigger zoom-out animation when the globe is visible
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasBeenSeen) {
                    setIsVisible(true);
                    triggerZoomOut(); // Start the zoom-out animation when the globe is visible
                    setHasBeenSeen(true); // Mark that the globe has been seen
                }
            },
            {threshold: 0.1} // Trigger when 10% of the globe is visible
        );

        if (containerRef.current) {
            observer.observe(containerRef.current); // Observe the wrapper div instead of the globe directly
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, [hasBeenSeen]);

    // Add a resize observer to update dimensions when container size changes
    useEffect(() => {
        if (!containerRef.current) return;

        const resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                const { width } = entry.contentRect;
                // Set the globe dimensions to match container size without max limit
                setDimensions({
                    width: width,
                    height: width  // Keep aspect ratio 1:1
                });
            }
        });

        resizeObserver.observe(containerRef.current);

        return () => resizeObserver.disconnect();
    }, []);

    // Function to trigger the zoom-out and latitude transition when the globe becomes visible
    const triggerZoomOut = () => {
        if (!globeEl.current || effectsApplied) return;

        const globe = globeEl.current;

        // Disable auto-rotation before the zoom-out starts
        globe.controls().autoRotate = false;

        // Set the initial viewpoint
        let currentLat = 51.8880;  // Starting latitude
        let currentAltitude = 0.3;  // Starting altitude

        // Target latitude and altitude for the end of the animation
        const targetLat = 0;        // Move to equator (lat = 0)
        const targetAltitude = 2.2; // End altitude is 2.2

        // Animation timing
        const zoomDuration = 3000;  // 3 seconds for the zoom effect
        const zoomSteps = 60;       // 60 steps (30Hz) for smoother animation
        const intervalTime = zoomDuration / zoomSteps; // Time per step

        // Set initial opacity of clouds to 0
        let cloudOpacity = 0;

        // Start the zoom-out and latitude transition effect after a 1.5s delay
        setTimeout(() => {
            setIsZoomingOut(true); // Set the zooming out flag to true
            const newZoomInterval = setInterval(() => {
                // Gradually change the latitude and altitude
                currentLat += (targetLat - currentLat) / zoomSteps;
                currentAltitude += (targetAltitude - currentAltitude) / zoomSteps;

                // Update the globe's point of view with the new latitude and altitude
                globe.pointOfView({lat: currentLat, lng: 0.449640, altitude: currentAltitude});

                // Increase cloud opacity gradually
                cloudOpacity += 1 / zoomSteps;
                if (cloudOpacity > 1) cloudOpacity = 1; // Cap opacity at 1
                globe.scene().traverse((object) => {
                    if (object.material && object.material.opacity !== undefined) {
                        object.material.opacity = cloudOpacity;
                    }
                });

                // Increment current step
                setCurrentStep(prevStep => {
                    const newStep = prevStep + 1;

                    // Check if the zoom-out and lat change are complete
                    if (Math.abs(currentLat - targetLat) < 10.0 && Math.abs(currentAltitude - targetAltitude) < 0.1) {
                        clearInterval(newZoomInterval); // Stop the interval once both transitions are complete
                        setZoomInterval(null); // Clear the zoom interval reference

                        // Enable auto-rotation after the zoom-out is complete
                        globe.controls().autoRotate = true;
                        globe.controls().autoRotateSpeed = 0.35; // Set auto-rotation speed back to 0.35
                        setIsZoomingOut(false); // Reset the zooming out flag
                        setShouldPulse(true); // Enable pulsing rings
                    }

                    // Check for pulsing rings every 120 steps
                    else {
                        if (newStep % 120 === 1) {
                            setShouldPulse(true);
                        } else {
                            setShouldPulse(false); // Disable pulsing for other steps
                        }
                    }

                    return newStep; // Update current step
                });
            }, intervalTime);
            setZoomInterval(newZoomInterval); // Store the interval so it can be cancelled later
        }, 1500); // Start the zoom effect after a 1.5-second delay

        setEffectsApplied(true); // Mark that the zoom-out effect has been applied
    };

    // Cancel the zoom-out if the user interacts with the globe
    const cancelZoomOut = () => {
        // Allow cancellation only if at or after the 60th step
        if (currentStep >= 60 && zoomInterval) {
            clearInterval(zoomInterval);
            setZoomInterval(null);
            setIsZoomingOut(false); // Reset the zooming out flag
            setShouldPulse(true);
        }
    };

    // Function to handle when the globe is ready (after it has loaded)
    const onGlobeReady = () => {
        if (globeEl.current) {
            // Set the initial point of view immediately after the globe is ready
            globeEl.current.pointOfView({lat: 52, lng: 0.45, altitude: 0.3});

            // Ensure auto-rotation is initially disabled (will be enabled after zoom-out)
            globeEl.current.controls().autoRotate = false;
        }
    };

    // Add clouds effect
    const addClouds = () => {
        if (!globeEl.current || effectsApplied) return;

        const globe = globeEl.current;

        const CLOUDS_IMG_URL = 'assets/clouds.png';
        const CLOUDS_ALT = 0.004;
        const CLOUDS_ROTATION_SPEED = -0.006;

        new TextureLoader().load(CLOUDS_IMG_URL, (cloudsTexture) => {
            const clouds = new Mesh(
                new SphereGeometry(globe.getGlobeRadius() * (1 + CLOUDS_ALT), 75, 75),
                new MeshPhongMaterial({
                    map: cloudsTexture,
                    transparent: true,
                    opacity: 0,  // Start with opacity 0
                    side: DoubleSide,
                    depthWrite: false,
                })
            );
            globe.scene().add(clouds);
            (function rotateClouds() {
                clouds.rotation.y += CLOUDS_ROTATION_SPEED * Math.PI / 180;
                requestAnimationFrame(rotateClouds);
            })();
        });
    };

    // Handle globe interaction (cancel zoom-out)
    const handleGlobeInteraction = () => {
        // Log the current step when the globe is clicked or touched

        cancelZoomOut(); // Call cancelZoomOut when user interacts with the globe

        if (autoRotateTimeout.current) {
            clearTimeout(autoRotateTimeout.current); // Clear any existing timeout
        }
        if (globeEl.current) {
            globeEl.current.controls().autoRotate = false; // Stop auto-rotation on interaction
        }

        autoRotateTimeout.current = setTimeout(() => {
            if (globeEl.current) {
                globeEl.current.controls().autoRotate = true; // Restart auto-rotation
                globeEl.current.controls().autoRotateSpeed = 0.35; // Set auto-rotation speed
            }
        }, 1500); // 2.5 seconds delay

};


// Function to determine the pulsing ring radius based on the current step
const getPulsingRingMaxRadius = () => {
    if (!shouldPulse) return 0; // No pulsing if should not pulse
    const pulse = Math.sin(currentStep * 0.1) * 0.5 + 1; // Adjust based on step for pulsing effect
    return RING_BASE_RADIUS * pulse; // Use the new variable for base radius
};

const markerSvg = `<svg viewBox="-4 0 36 36">
    <path fill="currentColor" stroke="red" stroke-width="2" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
    <circle fill="black" cx="14" cy="14" r="7"></circle>
  </svg>`;

const colorInterpolator = t => `rgba(255,100,50,${Math.sqrt(1 - t)})`;


return (
    <div ref={containerRef} style={{
        width: '100%',
        aspectRatio: '1 / 1',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }}> 
        <div
            onMouseDown={handleGlobeInteraction}
            onTouchStart={handleGlobeInteraction}
            onWheel={handleGlobeInteraction}
            style={{
                pointerEvents: 'auto',
                position: 'relative',
                borderRadius: '30px',
                padding: '2px',
                background: 'linear-gradient(to bottom right, rgba(255,255,255,0.3), rgba(0,0,0,0))',
                width: '100%',
                height: '100%',
                display: 'flex',      // Add flex display
                alignItems: 'center', // Center vertically
                justifyContent: 'center' // Center horizontally
            }}
        >
            <div style={{
                position: 'relative',
                borderRadius: '28px',
                overflow: 'hidden',
                background: '#100c14',
                width: '100%',
                height: '100%'
            }}>
                <Globe
                    width={dimensions.width}
                    height={dimensions.width} // Use width for height to maintain ratio
                    backgroundColor="rgba(0, 0, 0, 0)"
                    backgroundImageOpacity={0.5}
                    showAtmosphere

                    ref={globeEl}
                    globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                    bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                    onGlobeReady={() => {
                        onGlobeReady();
                        addClouds();
                    }} // Set the initial point of view and add clouds when the globe is ready
                    ringsData={[{lat: 51.9, lng: 0.45}]} // Always show the rings
                    ringMaxRadius={getPulsingRingMaxRadius()} // Use the dynamic pulsing radius
                    ringPropagationSpeed={1}
                    ringRepeatPeriod={RING_REPEAT_PERIOD} // Use the new variable for decay period
                    ringColor={() => colorInterpolator}
                    htmlElementsData={[{lat: 51.9, lng: 0.45}]}
                    htmlElement={() => {
                        // Create the main element
                        const el = document.createElement('div');
                        el.innerHTML = markerSvg;
                        el.style.color = 'white';
                        el.style.width = '9px';
                        el.style['pointer-events'] = 'auto'; // Enable pointer events

                        // Create the tooltip element
                        const tooltip = document.createElement('div');
                        tooltip.innerText = 'London, UK'; // Change this to the desired tooltip content
                        tooltip.style.position = 'absolute';
                        tooltip.style.backgroundColor = 'black';
                        tooltip.style.color = 'white';
                        tooltip.style.borderRadius = '5px';
                        tooltip.style.padding = '3px';
                        tooltip.style.opacity = '0'; // Start hidden
                        tooltip.style.transition = 'opacity 0.3s'; // Smooth transition
                        tooltip.style.pointerEvents = 'none'; // Disable pointer events on the tooltip
                        tooltip.style.zIndex = '1000'; // Ensure tooltip is on top
                        tooltip.style.whiteSpace = 'nowrap'; // Prevent wrapping of text

                        // Remove any existing tooltips from the DOM
                        const existingTooltips = document.querySelectorAll('.tooltip'); // Select all existing tooltips
                        existingTooltips.forEach(tip => tip.remove()); // Remove each tooltip

                        // Append the new tooltip to the body
                        tooltip.classList.add('tooltip'); // Add a class to identify it
                        document.body.appendChild(tooltip); // Append tooltip to the body

                        // Track whether the tooltip is shown
                        let tooltipVisible = false;

                        // Add event listeners for hover effect
                        el.addEventListener('mouseenter', function (event) {
                            tooltipVisible = true; // Tooltip is now visible
                            tooltip.style.visibility = 'visible';
                            tooltip.style.opacity = '0.8';
                            tooltip.style.left = `${event.pageX}px`; // Position tooltip based on mouse position
                            tooltip.style.top = `${event.pageY - 30}px`; // Adjust position above the mouse
                        });

                        el.addEventListener('mouseleave', function () {
                            if (!tooltipVisible) return; // Do not hide if tooltip is still visible
                            tooltipVisible = false; // Tooltip is no longer visible
                            setTimeout(() => {
                                if (!tooltipVisible) { // Check if still not visible
                                    tooltip.style.visibility = 'hidden';
                                    tooltip.style.opacity = '0';
                                }
                            }, 100); // Delay hiding the tooltip for 100ms
                        });

                        // Handle mouse enter and leave events for the tooltip
                        tooltip.addEventListener('mouseenter', () => {
                            tooltipVisible = true; // Keep tooltip visible when hovering over it
                        });

                        tooltip.addEventListener('mouseleave', () => {
                            tooltipVisible = false; // Tooltip is no longer visible
                            tooltip.style.visibility = 'hidden'; // Hide tooltip immediately when leaving
                            tooltip.style.opacity = '0';
                        });

                        return el;
                    }}

                />
            </div>
        </div>
    </div>
);
}
;

export default World;
