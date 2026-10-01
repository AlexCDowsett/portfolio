import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Html, OrbitControls, SpotLight, useGLTF, useTexture } from '@react-three/drei';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import * as THREE from 'three';
import { ScreenLocations } from '../../constants/index.js';
import { projects } from '../data/projects.js';

// V2 project order maps to the original room's focus positions:
// VOC analyser, Vivant, UART, radio, salon, organiser, portfolio.
const projectFocusLocations = [1, 2, 3, 4, 5, 6, 0];

function fitScreenUv(geometry) {
    const fitted = geometry.clone();
    const uv = fitted.getAttribute('uv');
    if (!uv) return fitted;
    let minU = Infinity; let maxU = -Infinity; let minV = Infinity; let maxV = -Infinity;
    for (let index = 0; index < uv.count; index += 1) {
        minU = Math.min(minU, uv.getX(index)); maxU = Math.max(maxU, uv.getX(index));
        minV = Math.min(minV, uv.getY(index)); maxV = Math.max(maxV, uv.getY(index));
    }
    const width = maxU - minU; const height = maxV - minV;
    for (let index = 0; index < uv.count; index += 1) {
        uv.setXY(index, (uv.getX(index) - minU) / width, (uv.getY(index) - minV) / height);
    }
    uv.needsUpdate = true;
    return fitted;
}

function RoomModel({ selectedIndex }) {
    const { scene } = useGLTF('/models/old_computers.glb');
    const textures = useTexture(projects.map((project) => project.art));
    const focusGroup = useRef(null);
    const room = useMemo(() => {
        const copy = scene.clone(true);
        const artwork = new Map(projects.map((project, index) => [project.screen, textures[index]]));
        artwork.set('Object_213', textures[0]);
        artwork.set('Object_228', textures[6]);
        copy.traverse((object) => {
            const texture = artwork.get(object.name);
            if (texture && object.isMesh) {
                texture.colorSpace = THREE.SRGBColorSpace;
                texture.anisotropy = 8;
                texture.wrapS = THREE.ClampToEdgeWrapping;
                texture.wrapT = THREE.ClampToEdgeWrapping;
                texture.generateMipmaps = false;
                texture.minFilter = THREE.LinearFilter;
                texture.magFilter = THREE.LinearFilter;
                texture.needsUpdate = true;
                object.geometry = fitScreenUv(object.geometry);
                object.material = new THREE.MeshBasicMaterial({ map: texture, toneMapped: false, side: THREE.DoubleSide, depthTest: false, depthWrite: false });
                object.renderOrder = 999;
            }
        });
        return copy;
    }, [scene, textures]);

    useGSAP(() => {
        if (!focusGroup.current) return;
        const focusIndex = projectFocusLocations[selectedIndex];
        const focus = ScreenLocations[focusIndex];
        gsap.killTweensOf([focusGroup.current.position, focusGroup.current.rotation]);
        const timeline = gsap.timeline();
        timeline
            .to(focusGroup.current.position, {
                x: focusIndex ? '/=1.2' : '+=0',
                y: focusIndex ? '/=1.2' : '+=0',
                z: focusIndex ? '/=1.2' : '+=0',
                duration: 0.3,
                ease: 'power1.out',
            })
            .to(focusGroup.current.position, {
                x: focus.pX, y: focus.pY, z: focus.pZ, duration: 2, ease: 'power3.out',
            })
            .to(focusGroup.current.rotation, {
                x: focusIndex ? '/=1.2' : '+=0',
                y: focusIndex ? '/=1.2' : '+=0',
                z: focusIndex ? '/=1.2' : '+=0',
                duration: 0.3,
                ease: 'power1.out',
            }, '<')
            .to(focusGroup.current.rotation, {
                x: focus.rX, y: focus.rY, z: focus.rZ, duration: 2, ease: 'power3.out',
            }, '<');
    }, { dependencies: [selectedIndex] });

    return (
        <group position={[0, -2.5, -1]} rotation={[0.2, -0.1, 0]} scale={0.9}>
            <group ref={focusGroup}>
                <ambientLight intensity={0.2} />
                <directionalLight position={[5, 10, 0]} intensity={0.1} color="white" />
                <directionalLight position={[0, 10, 0]} intensity={0.1} color="white" />
                <SpotLight position={[0, 7, 1]} angle={4} penumbra={1} castShadow intensity={3} decay={0.5} distance={25} />
                <primitive object={room} />
            </group>
        </group>
    );
}

function ResponsiveCamera() {
    const { camera, size } = useThree();
    useEffect(() => {
        camera.position.set(0, 0.8, size.width < 600 ? 11.5 : 9);
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();
    }, [camera, size.width]);
    return null;
}

function LoadingRoom() {
    return <Html center><span className="v2-room-loading">Waking the old computers…</span></Html>;
}

export function ProjectRoom({ selectedIndex }) {
    return (
        <div className="v2-room-canvas" aria-label="Interactive 3D room of computers showing project screens">
            <Canvas camera={{ position: [0, 0.8, 9], fov: 48 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
                <color attach="background" args={['#e9e7dc']} />
                <ResponsiveCamera />
                <Suspense fallback={<LoadingRoom />}>
                    <RoomModel selectedIndex={selectedIndex} />
                    <OrbitControls enablePan={false} enableZoom minDistance={6} maxDistance={14} minPolarAngle={0.85} maxPolarAngle={2.1} rotateSpeed={0.55} />
                </Suspense>
            </Canvas>
            <span className="v2-room-caption" aria-hidden="true">PROJECT ROOM · DRAG TO LOOK AROUND</span>
        </div>
    );
}

useGLTF.preload('/models/old_computers.glb');
