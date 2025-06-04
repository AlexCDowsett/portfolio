import {easing} from "maath";
import {useRef, useState, useEffect} from "react";
import {useFrame} from "@react-three/fiber";

const HeroCamera = ({children, isMobile}) => {
    const groupRef = useRef();
    const [initialZoom, setInitialZoom] = useState(true);
    const [hasSetInitialPosition, setHasSetInitialPosition] = useState(false);

    useEffect(() => {
        if (isMobile) {
            setInitialZoom(true);
            setHasSetInitialPosition(false);
            const timer = setTimeout(() => {
                setInitialZoom(false);
            }, 2000); // Reset after 2 seconds
            return () => clearTimeout(timer);
        }
    }, [isMobile]);

    useFrame((state, delta) => {
        if (isMobile && !hasSetInitialPosition) {
            // Set initial position only once
            state.camera.position.set(0, 0, 35);
            setHasSetInitialPosition(true);
        }
        
        if (isMobile && initialZoom) {
            // Start from far away and zoom in
            easing.damp3(state.camera.position, [0, 0, 20], 0.5, delta);
        } else if (!isMobile) {
            // Normal camera behavior for desktop
            easing.damp3(state.camera.position, [0, 0, 10], 100.25, delta);
            easing.dampE(groupRef.current.rotation, [-state.pointer.y /3, state.pointer.x / 3, 0], 0.25, delta);
        }
    });

    return (
        <group ref={groupRef}>{children}</group>
    );
};

export default HeroCamera;
