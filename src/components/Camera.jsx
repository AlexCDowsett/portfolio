// Camera.jsx
import React, { useRef, useState, useEffect } from "react";
import { PerspectiveCamera, useFrame } from "@react-three/fiber"; // Correctly import useFrame from fiber

const Camera = ({ targetFov }) => {
    const cameraRef = useRef();
    const [currentFov, setCurrentFov] = useState(targetFov); // Track current FOV

    useEffect(() => {
        setCurrentFov(75); // Set the initial FOV (zoomed out)
        const timer = setTimeout(() => {
            setCurrentFov(35); // Target FOV (zoomed in)
        }, 100); // Delay to start the animation
        return () => clearTimeout(timer); // Cleanup timer on component unmount
    }, []);

    useFrame(() => {
        if (cameraRef.current) {
            // Smooth transition of FOV
            cameraRef.current.fov += (currentFov - cameraRef.current.fov) * 0.05; // Smooth transition
            cameraRef.current.updateProjectionMatrix(); // Update the projection matrix
        }
    });

    return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 20]} fov={currentFov} />;
};

export default Camera;
