import {easing} from "maath";
import {useRef, useState, useEffect} from "react";
import {useFrame} from "@react-three/fiber";

const HeroCamera = ({children, isMobile}) => {
    const groupRef = useRef();
    const [initialZoom, setInitialZoom] = useState(true);
    const [hasSetInitialPosition, setHasSetInitialPosition] = useState(false);

    useEffect(() => {
        // Apply initial zoom animation for all devices
        setInitialZoom(true);
        setHasSetInitialPosition(false);
        const timer = setTimeout(() => {
            setInitialZoom(false);
        }, 2000); // Reset after 2 seconds
        return () => clearTimeout(timer);
    }, []);

    useFrame((state, delta) => {
        if (!hasSetInitialPosition) {
            // Set initial position only once
            state.camera.position.set(0, 0, 35);
            setHasSetInitialPosition(true);
        }
        
        // Always apply rotation regardless of zoom state
        easing.dampE(groupRef.current.rotation, [-state.pointer.y /3, state.pointer.x / 3, 0], 0.25, delta);
        
        if (initialZoom) {
            // Start from far away and zoom in
            easing.damp3(state.camera.position, [0, 0, 20], 0.5, delta);
        } else {
            // Normal camera behavior after zoom
            easing.damp3(state.camera.position, [0, 0, 10], 100.25, delta);
        }
    });

    return (
        <group ref={groupRef}>{children}</group>
    );
};

export default HeroCamera;
